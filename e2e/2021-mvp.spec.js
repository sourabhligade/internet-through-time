// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2021 mvp", () => {
  test("hub card is live", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(`a.year-card.available[href*="years/2021"]`)).toBeVisible();
    await expect(page.locator(".year-card.locked.y2021")).toHaveCount(0);
  });

  test("Starting Point guided 6 + star", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2021"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2021"]')).toHaveAttribute("href", /att/);
  });

  test("about page loads", async ({ page }) => {
    const res = await page.goto("/years/2021/pages/about.html");
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator("body")).toContainText("2021");
  });
});
