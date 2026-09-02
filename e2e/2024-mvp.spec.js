// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2024 mvp", () => {
  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2024"]').click();
    await expect(page.locator(".year-label")).toContainText(/2024/);
    await expect(page.locator("#content")).toBeVisible();
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2024/pages/about.html");
    await expect(page.locator("body")).toContainText("1,079,154,539");
    await expect(page.locator("body")).toContainText("5.5 billion");
    await expect(page.locator("body")).toContainText("2025");
  });
});
