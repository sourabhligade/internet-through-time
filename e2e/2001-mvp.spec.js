// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2001 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/2001"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y2001")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/2001/pages/home.html");
    await expect(page.locator("#ott-guided-2001 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2001"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2001"]')).toHaveAttribute("href", /wikipedia/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/2001/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("2001");
  });
});
