// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2023 mvp", () => {
  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2023"]').click();
    await expect(page.locator(".year-label")).toContainText(/2023/);
    await expect(page.locator("#content")).toBeVisible();
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2023/pages/about.html");
    await expect(page.locator("body")).toContainText("1,132,268,801");
    await expect(page.locator("body")).toContainText("5.4 billion");
    await expect(page.locator("body")).toContainText("Sora");
  });
});
