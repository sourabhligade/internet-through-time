// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2016 densify", () => {
  test("archive has no second Stories writer", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/archive.html");
    await expect(page.locator("[data-ig-story-add]")).toHaveCount(0);
    await expect(page.locator("[data-ig-story-card]")).toBeVisible();
  });

  test("guided list stays 6", async ({ page }) => {
    await page.goto("/years/2016/pages/home.html");
    await expect(page.locator("#ott-guided-2016 ol > li")).toHaveCount(6);
  });
});
