// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2020 mvp", () => {
  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2020"]').click();
    await expect(page.locator(".year-label")).toContainText(/2020/);
    await expect(page.locator("#content")).toBeVisible();
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText("1,295,973,827");
    await expect(page.locator("body")).toContainText("300 million");
    await expect(page.locator("body")).toContainText("ChatGPT");
  });
});
