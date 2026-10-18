import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const theme of ["dark", "light"]) {
  test(`${theme}: automated WCAG A/AA checks in intention and Blueprint View`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(
      (value) => localStorage.setItem("blueprint-mock-theme", value),
      theme,
    );
    await page.goto("/");
    const audit = async () => {
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
    };
    await audit();
    await page
      .locator("#intention")
      .fill("A world where memories return with the tide.");
    await page.locator("#generate").click();
    await expect(page.locator("#blueprint-name")).toBeVisible();
    await audit();
  });
}
