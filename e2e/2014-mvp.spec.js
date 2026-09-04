// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2014 mvp", () => {
  test("2014 is boarded", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2014", "index.html"))).toBe(false);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2014']")).toHaveCount(0);
    await expect(page.locator(".year-card.locked.y2014")).toBeVisible();
  });

  test("hub card opens Starting Point", async ({ page }) => {
    test.skip(true, "2014 wiped");
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2014"]').click();
    await expect(page.locator(".year-label")).toContainText(/2014/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints scale and bans", async ({ page }) => {
    test.skip(true, "2014 wiped");
    await page.goto("/years/2014/pages/about.html");
    await expect(page.locator("body")).toContainText("968,882,453");
    await expect(page.locator("body")).toContainText("861,379,152");
    await expect(page.locator("body")).toContainText("January");
    await expect(page.locator("body")).toContainText("Watch");
  });

  test("shell is IE residual, not Chrome habit", async ({ page }) => {
    test.skip(true, "2014 wiped");
    await page.goto("/years/2014/");
    await expect(page).toHaveTitle(/Internet Explorer residual/);
    await expect(page.locator("body")).not.toContainText("Chrome habit — 2014");
    await expect(page.locator(".year-label")).toContainText(/Internet Explorer 9/);
  });
});
