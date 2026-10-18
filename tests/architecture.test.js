import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import postcss from "postcss";
import { responses } from "../site/assets/js/fixtures.js";
import { tools } from "../site/assets/js/tools.js";

const read = (file) => readFileSync(file, "utf8");
const layers = ["reset", "tokens", "semantic", "base", "layout", "components"];
test("every maintained source folder has local instructions", () => {
  const excluded = new Set(["site/public", "site/resources"]);
  function visit(dir) {
    if (excluded.has(dir)) return;
    assert.ok(
      existsSync(path.join(dir, "AGENTS.md")),
      `Missing folder direction: ${dir}`,
    );
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory() && !entry.name.startsWith("."))
        visit(path.join(dir, entry.name));
    }
  }
  for (const root of ["blueprints", "mocks", "specs", "site", "tests"])
    visit(root);
});
test("frozen reference exactly matches the approved mock", () => {
  assert.equal(
    read("specs/REFERENCE_UI.html"),
    read("mocks/polished-sidebar.html"),
  );
});
test("layer filenames match their layers; main owns ordering; no raw presentation colors", () => {
  const main = read("site/assets/css/main.css");
  assert.match(
    main,
    /@layer reset, tokens, semantic, base, layout, components;/,
  );
  for (const layer of layers) {
    const css = postcss.parse(read(`site/assets/css/${layer}.css`));
    css.walkRules((rule) => {
      let parent = rule.parent;
      while (parent && !(parent.type === "atrule" && parent.name === "layer"))
        parent = parent.parent;
      assert.equal(parent?.params, layer);
    });
    css.walkDecls((d) => {
      if (layer !== "tokens")
        assert.doesNotMatch(d.value, /#[\da-f]{3,8}\b/i, `${layer}: ${d.prop}`);
    });
    css.walkAtRules("layer", (a) => assert.equal(a.params, layer));
  }
});
test("semantic tokens isolate palette values and every variable resolves", () => {
  const defined = new Set(),
    referenced = new Set();
  for (const layer of layers) {
    const css = postcss.parse(read(`site/assets/css/${layer}.css`));
    css.walkDecls((d) => {
      if (d.prop.startsWith("--")) defined.add(d.prop);
      for (const match of d.value.matchAll(/var\((--[a-z0-9-]+)/gi))
        referenced.add(match[1]);
      if (!["tokens", "semantic"].includes(layer))
        assert.doesNotMatch(
          d.value,
          /var\(--color-/,
          "Use a semantic alias, not a palette primitive",
        );
    });
    if (layer === "semantic")
      css.walkRules((r) =>
        assert.match(r.selector, /^:root(?:\[data-theme="light"\])?$/),
      );
  }
  for (const variable of referenced)
    assert.ok(defined.has(variable), `Undefined token: ${variable}`);
});
test("motion is opacity-only and within the approved timing range", () => {
  const css = postcss.parse(read("site/assets/css/components.css"));
  css.walkAtRules("keyframes", (frames) =>
    frames.walkDecls((d) => assert.equal(d.prop, "opacity")),
  );
  const tokens = postcss.parse(read("site/assets/css/tokens.css"));
  tokens.walkDecls((d) => {
    if (d.prop.startsWith("--duration-")) {
      const duration = parseFloat(d.value);
      assert.ok(duration >= 200 && duration <= 500);
    }
  });
});
test("no static homepage collision or inline CSS and JS in layouts", () => {
  assert.equal(existsSync("site/static/index.html"), false);
  for (const file of [
    "site/layouts/baseof.html",
    "site/layouts/home.html",
    "site/layouts/partials/head.html",
    "site/layouts/partials/studio/workspace.html",
  ])
    assert.doesNotMatch(read(file), /<style\b|style=|<script>/);
});
test("tools and fixtures are coherent and noncanonical", () => {
  assert.deepEqual(Object.keys(tools), Object.keys(responses));
  for (const d of Object.values(responses)) {
    const ids = new Set([d.id, ...d.entities.map((e) => e.id)]);
    assert.equal(ids.size, d.entities.length + 1);
    assert.ok(d.id.startsWith("demo."));
    for (const e of d.entities)
      for (const key of [
        "id",
        "name",
        "type",
        "kind",
        "slogan",
        "intent",
        "essence",
      ])
        assert.ok(e[key]);
    for (const [a, p, b] of d.triples) {
      assert.ok(ids.has(a));
      assert.ok(ids.has(b));
      assert.ok(p);
    }
  }
});
