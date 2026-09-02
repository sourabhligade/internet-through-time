// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2022 mvp", () => {
  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2022"]').click();
    await expect(page.locator(".year-label")).toContainText(/2022/);
    await expect(page.locator("#content")).toBeVisible();
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText("1,167,715,133");
    await expect(page.locator("body")).toContainText("Plus");
    await expect(page.locator("body")).toContainText("GPT-4");
  });
});
