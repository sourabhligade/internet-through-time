// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test.describe("2018 mvp", () => {
  test("2018 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2018", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2018']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2018")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2018"]').click();
    await expect(page.locator(".year-label")).toContainText(/2018/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints June ILS and bans", async ({ page }) => {
    await page.goto("/years/2018/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("Accept All");
    await expect(page.locator("body")).toContainText("Reels");
  });

  test("shell is Chrome habit 2018", async ({ page }) => {
    await page.goto("/years/2018/");
    await expect(page).toHaveTitle(/Chrome habit/);
  });
});
