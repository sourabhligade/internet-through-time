// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("1999 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/1999"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y1999")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/1999/pages/home.html");
    await expect(page.locator("#ott-guided-1999 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="1999"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="1999"]')).toHaveAttribute("href", /aim/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/1999/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("1999");
  });
});
