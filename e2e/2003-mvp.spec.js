// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2003 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/2003"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y2003")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/2003/pages/home.html");
    await expect(page.locator("#ott-guided-2003 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2003"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2003"]')).toHaveAttribute("href", /photobucket/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/2003/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("2003");
  });
});
