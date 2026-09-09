// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("1996 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/1996"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y1996")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/1996/pages/home.html");
    await expect(page.locator("#ott-guided-1996 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="1996"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="1996"]')).toHaveAttribute("href", /portals/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/1996/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("1996");
  });
});
