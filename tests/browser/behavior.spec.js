import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function ready(page) {
  await expect(page.locator(".studio")).not.toHaveAttribute("inert", "");
}
async function switchTool(page, key) {
  await page.locator(`[data-tool="${key}"]`).click();
  await expect(page.locator(`[data-tool="${key}"]`)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await ready(page);
}

test("production assets, draft preservation, safe input, fixture export, no runtime requests", async ({
  page,
}) => {
  const errors = [],
    failures = [],
    requests = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) failures.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator('[data-tool="world"]')).toBeVisible();
  const assets = await page
    .locator("link[rel=stylesheet],script[src]")
    .evaluateAll((nodes) =>
      nodes.map((n) => ({ url: n.href || n.src, integrity: n.integrity })),
    );
  expect(assets).toHaveLength(2);
  for (const asset of assets) {
    expect(asset.url).toMatch(/\.[a-f0-9]{96}\.(css|js)$/);
    expect(asset.integrity).toMatch(/^sha384-/);
  }
  page.on("request", (r) => requests.push(r.url()));
  const intention =
    '<img src=x onerror="window.injected=true"> A world of memory.';
  await page.locator("#intention").fill(intention);
  await page.locator("#direction-tone").selectOption("Quiet & mysterious");
  await page.locator("#direction-essentials").fill("An honest lighthouse");
  await switchTool(page, "character");
  await page.locator("#intention").fill("A careful listener.");
  await switchTool(page, "world");
  await expect(page.locator("#intention")).toHaveValue(intention);
  await expect(page.locator("#direction-tone")).toHaveValue(
    "Quiet & mysterious",
  );
  await expect(page.locator("#direction-essentials")).toHaveValue(
    "An honest lighthouse",
  );
  await page.locator("#generate").click();
  await expect(page.locator("main")).toHaveClass("blueprint-mode");
  await ready(page);
  await expect(page.locator("#intention")).toBeEditable();
  await expect(page.locator("#blueprint-name")).toBeFocused();
  await expect(page.locator("#brief-intention")).toHaveText(intention);
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#export-blueprint").click();
  const download = await downloadPromise;
  const response = JSON.parse(await readFile(await download.path(), "utf8"));
  expect(response.submittedBrief.intention).toBe(intention);
  expect(response.submittedBrief.direction["Feeling & tone"]).toBe(
    "Quiet & mysterious",
  );
  expect(response.blueprint.name).toBe("Tideglass");
  expect(response.provenance).toContain("noncanonical");
  await page.locator("#intention").fill("A revised intention.");
  await expect(page.locator("#status")).toContainText("previous brief");
  await page.locator("#expand-intention").click();
  await expect(page.locator("main")).not.toHaveClass("blueprint-mode");
  await ready(page);
  await expect(page.locator("#intention")).toBeFocused();
  expect(requests).toEqual([]);
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});

test("folder instructions are not public pages or downloads", async ({
  request,
}) => {
  for (const url of [
    "/AGENTS.md",
    "/agents/index.html",
    "/css/AGENTS.md",
    "/js/AGENTS.md",
  ]) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(404);
  }
});

test("theme persists; blocked storage still works", async ({ page }) => {
  await page.goto("/");
  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await ready(page);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await ready(page);
});

test("generation cancels on edits and tool changes; whitespace is rejected", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#intention").fill("   ");
  await page.locator("#generate").click();
  await expect(page.locator("#status")).toHaveText("Start with a few words.");
  await page.locator("#intention").fill("First request");
  await page.locator("#generate").click();
  await page.locator("#intention").fill("Changed request");
  await page.waitForTimeout(750);
  await expect(page.locator("#result")).toBeHidden();
  await expect(page.locator("#generate")).toBeEnabled();
  await page.locator("#generate").click();
  await switchTool(page, "character");
  await page.waitForTimeout(750);
  await expect(page.locator("#result")).toBeHidden();
  await expect(page.locator("#title")).toHaveText(
    "Who do you want to discover?",
  );
});

test("mobile navigation, keyboard access, and no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await expect(page.locator(".skip")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.locator("#menu")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#menu")).toHaveAttribute("aria-expanded", "true");
  await switchTool(page, "character");
  await expect(page.locator("#menu")).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#menu")).toBeFocused();
  await page.locator("#intention").fill("A story keeper");
  await page.locator("#generate").click();
  await expect(page.locator("#blueprint-name")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("fallback dissolve uses two 200ms opacity phases and always restores input", async ({
  page,
}) => {
  await page.addInitScript(() => {
    document.startViewTransition = undefined;
    window.motionLog = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      window.motionLog.push({ frames, options });
      return animate.call(this, frames, options);
    };
  });
  await page.goto("/");
  await page.locator("#intention").fill("A little world");
  await page.locator("#generate").click();
  await expect(page.locator("#blueprint-name")).toBeVisible();
  await ready(page);
  const log = await page.evaluate(() => window.motionLog);
  expect(log).toHaveLength(2);
  for (const entry of log) {
    expect(entry.options.duration).toBe(200);
    for (const frame of entry.frames)
      expect(Object.keys(frame)).toEqual(["opacity"]);
  }
  await expect(page.locator("#intention")).toBeEditable();
});

test("reduced motion skips animated transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    window.transitionCalls = 0;
    document.startViewTransition = () => {
      window.transitionCalls++;
      throw new Error("Should not animate");
    };
  });
  await page.goto("/");
  await page.locator("#theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => window.transitionCalls)).toBe(0);
});
