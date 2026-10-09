// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2015 densify", () => {
  test("React door · Periscope chip · leftover list folded", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015");
    await expect(page.locator(".door")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("body")).toContainText("Periscope");
    await expect(page.locator("body")).toContainText("Apple Music");
    await expect(page.locator("section.also-year")).toHaveCount(0);
  });
});
