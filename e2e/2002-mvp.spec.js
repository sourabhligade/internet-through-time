// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2002 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/2002"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y2002")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/2002/pages/home.html");
    await expect(page.locator("#ott-guided-2002 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2002"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2002"]')).toHaveAttribute("href", /stumbleupon/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/2002/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("2002");
  });
});
