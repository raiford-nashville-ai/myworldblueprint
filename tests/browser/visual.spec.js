import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

// Compare against the immutable HTML directly, not a regenerated baseline.
// Zero differing pixels, including anti-aliasing, at DPR 1 in the same browser.
for (const width of [375, 768, 1100, 1440, 1920]) {
  for (const theme of ["dark", "light"]) {
    test(`${width}px ${theme}: exact reference pixels through all views`, async ({
      browser,
    }, info) => {
      // Shared context gives both pages the same SVG texture decoder/cache and font environment.
      const context = await browser.newContext({
        viewport: { width, height: 960 },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      const pages = await Promise.all([context.newPage(), context.newPage()]);
      for (const page of pages)
        await page.addInitScript(
          (value) => localStorage.setItem("blueprint-mock-theme", value),
          theme,
        );
      await Promise.all(
        pages.map((p, i) => p.goto(i ? "/" : "/reference.html")),
      );
      for (const p of pages) {
        if (width > 600)
          await expect(p.locator('[data-tool="world"]')).toBeVisible();
        else await expect(p.locator('[data-tool="world"]')).toBeHidden();
        await p.evaluate(() => document.fonts.ready);
      }
      const compare = async (name) => {
        for (const p of pages) {
          await p.mouse.move(width - 2, 2);
          await p.evaluate(async () => {
            document.activeElement?.blur();
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
          });
        }
        const shots = await Promise.all(
          pages.map((p) =>
            p.screenshot({ fullPage: true, animations: "disabled" }),
          ),
        );
        const [a, b] = shots.map((s) => PNG.sync.read(s));
        expect(
          { width: b.width, height: b.height },
          `${name}: image dimensions`,
        ).toEqual({ width: a.width, height: a.height });
        const diff = new PNG({ width: a.width, height: a.height });
        const pixels = pixelmatch(
          a.data,
          b.data,
          diff.data,
          a.width,
          a.height,
          { threshold: 0, includeAA: true },
        );
        if (pixels) {
          await info.attach(`${name}-reference`, {
            body: shots[0],
            contentType: "image/png",
          });
          await info.attach(`${name}-actual`, {
            body: shots[1],
            contentType: "image/png",
          });
          await info.attach(`${name}-diff`, {
            body: PNG.sync.write(diff),
            contentType: "image/png",
          });
        }
        expect(pixels, `${name}: differing pixels`).toBe(0);
        await info.attach(`${name}-actual`, {
          body: shots[1],
          contentType: "image/png",
        });
      };
      const both = (action) => Promise.all(pages.map(action));
      try {
        await compare("world-intention");
        await both((p) => p.locator("#world-tips summary").click());
        await compare("writing-tips");
        await both((p) =>
          p
            .locator("#intention")
            .fill("A harbor where the tide returns lost memories."),
        );
        await both((p) => p.locator("#generate").click());
        await both((p) =>
          expect(p.locator("main")).toHaveClass("blueprint-mode"),
        );
        await both((p) => p.evaluate(() => window.scrollTo(0, 0)));
        await compare("world-blueprint");
        await both((p) => p.locator(".entity-card summary").first().click());
        await compare("entity-details");
        await both((p) => p.locator("#expand-intention").click());
        await both((p) =>
          expect(p.locator("main")).not.toHaveClass("blueprint-mode"),
        );
        await compare("expanded-intention");
        if (width <= 600) {
          await both((p) => p.locator("#menu").click());
          await compare("mobile-tool-rack");
        }
        await both((p) => p.locator('[data-tool="character"]').click());
        await compare("character-intention");
        await both((p) =>
          p
            .locator("#intention")
            .fill("An archivist who collects forgotten stories."),
        );
        await both((p) => p.locator("#generate").click());
        await both((p) =>
          expect(p.locator("#blueprint-name")).toHaveText("The Story Keeper"),
        );
        await both((p) => p.evaluate(() => window.scrollTo(0, 0)));
        await compare("character-blueprint");
      } finally {
        await context.close();
      }
    });
  }
}
