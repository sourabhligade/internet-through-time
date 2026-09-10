// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2007 mvp", () => {
  test("hub card opens 2007 shell", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2007"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2007");
    await expect(page.locator("#content")).toBeVisible();
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2007/pages/about.html");
    await expect(page.locator("body")).toContainText("121,892,559");
    await expect(page.locator("body")).toContainText("106,875,138");
    await expect(page.locator("body")).toContainText("App Store");
  });
});
