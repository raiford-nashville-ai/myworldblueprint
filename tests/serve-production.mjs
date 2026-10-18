import { createServer } from "node:http";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { homedir, tmpdir } from "node:os";
import path from "node:path";

// Test the actual minified/fingerprinted production build, never the Hugo dev server.
const port = Number(process.env.TEST_PORT || 1412);
const pinned = path.join(
  homedir(),
  ".cache/myworldblueprint/hugo-0.168.0/hugo",
);
const hugo = process.env.HUGO_BIN || (existsSync(pinned) ? pinned : "hugo");
const version = spawnSync(hugo, ["version"], { encoding: "utf8" });
if (
  !version.stdout?.includes("v0.168.0") ||
  !version.stdout.includes("+extended")
) {
  throw new Error(
    "Tests require Hugo Extended v0.168.0. Set HUGO_BIN to its executable.",
  );
}
const output = mkdtempSync(path.join(tmpdir(), "myworld-production-"));
const build = spawnSync(
  hugo,
  [
    "--source",
    "site",
    "--destination",
    output,
    "--environment",
    "production",
    "--baseURL",
    `http://127.0.0.1:${port}/`,
    "--panicOnWarning",
  ],
  { stdio: "inherit" },
);
if (build.status !== 0) {
  rmSync(output, { recursive: true, force: true });
  process.exit(1);
}
// Fail before serving if folder guidance leaks into public output or becomes a page.
function publishedFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? publishedFiles(file) : [file];
  });
}
const files = publishedFiles(output);
if (
  files.some((file) => path.basename(file).toLowerCase() === "agents.md") ||
  files
    .filter((file) => file.endsWith(".html"))
    .some((file) => file !== path.join(output, "index.html"))
) {
  rmSync(output, { recursive: true, force: true });
  throw new Error(
    "Internal guidance or unexpected pages leaked into the production build.",
  );
}
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};
const server = createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
  } catch {
    res.writeHead(400).end();
    return;
  }
  const file =
    pathname === "/reference.html"
      ? path.resolve("specs/REFERENCE_UI.html")
      : path.resolve(
          output,
          "." + (pathname === "/" ? "/index.html" : pathname),
        );
  if (pathname !== "/reference.html" && !file.startsWith(output + path.sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = readFileSync(file);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  } catch {
    res.writeHead(404).end();
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Production + frozen reference: http://127.0.0.1:${port}`),
);
function cleanup() {
  server.close();
  rmSync(output, { recursive: true, force: true });
  process.exit(0);
}
process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);
