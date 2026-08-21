// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2007 mvp", () => {
  test("hub card opens XP / IE7 Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2007"]').click();
    await expect(page.locator(".year-label")).toContainText(/2007/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints June scale and bans", async ({ page }) => {
    await page.goto("/years/2007/pages/about.html");
    await expect(page.locator("body")).toContainText("121,892,559");
    await expect(page.locator("body")).toContainText(/App Store/i);
    await expect(page.locator("body")).toContainText(/Chrome/i);
  });
});
