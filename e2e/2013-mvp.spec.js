// @ts-check
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

test.skip(!fs.existsSync(path.join(__dirname, "..", "years", "2013", "index.html")), "2013 wiped");

test.describe("2013 mvp", () => {
  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2013"]').click();
    await expect(page.locator(".year-label")).toContainText(/2013/);
    await expect(page.locator("#content")).toBeVisible();
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2013/pages/about.html");
    await expect(page.locator("body")).toContainText("672,985,183");
  });
});
