// @ts-check
const { test, expect } = require("@playwright/test");
test.describe("2009 mvp", () => {
  test("hub has no 2009 card · year shell is boarded room", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a.year-card[href*="years/2009"]')).toHaveCount(0);
    await expect(page.locator(".year-card.y2009")).toHaveCount(0);
    await page.goto("/years/2009/");
    await expect(page.locator("body")).toContainText(/boarded/i);
    await expect(page.locator("body")).toContainText(/Like/i);
    await expect(page.locator("body")).toContainText(/GeoCities/i);
    await expect(page.locator('a[href*="index.html"]').first()).toBeVisible();
    await expect(page.locator("#dirbar")).toHaveCount(0);
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2009/pages/about.html");
    await expect(page.locator("body")).toContainText("238,027,855");
  });
});
