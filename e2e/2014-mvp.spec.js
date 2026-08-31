// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2014 mvp", () => {
  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2014"]').click();
    await expect(page.locator(".year-label")).toContainText(/2014/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2014/pages/about.html");
    await expect(page.locator("body")).toContainText("968,882,453");
    await expect(page.locator("body")).toContainText("861,379,152");
    await expect(page.locator("body")).toContainText("January");
    await expect(page.locator("body")).toContainText("Watch");
  });

  test("shell is IE residual, not Chrome habit", async ({ page }) => {
    await page.goto("/years/2014/");
    await expect(page).toHaveTitle(/Internet Explorer residual/);
    await expect(page.locator("body")).not.toContainText("Chrome habit — 2014");
    await expect(page.locator(".year-label")).toContainText(/Internet Explorer 9/);
  });
});
