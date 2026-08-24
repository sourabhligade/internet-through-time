// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame } = require("./helpers");

test.describe("2018 MVP", () => {
  test("shell names Chrome habit, not Internet Explorer", async ({ page }) => {
    await page.goto("/years/2018/");
    await expect(page).toHaveTitle(/Chrome habit/);
    await expect(page.locator("#task-ie")).toHaveText(/Chrome habit/);
    await expect(page.locator("#window-title")).toContainText(/Chrome habit/);
  });
  test("shell boots and home chip is GDPR Manage", async ({ page }) => {
    await enterYear(page, "2018");
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2018"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2018"]')).toHaveAttribute("href", /gdpr/);
    await expect(frame.locator("#ott-guided-2018 ol > li")).toHaveCount(6);
  });

  test("about dual-cite and bans", async ({ page }) => {
    await page.goto("/years/2018/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("−8%");
    await expect(page.locator("body")).toContainText(/ITU/i);
    await expect(page.locator("body")).toContainText(/GDPR/i);
    await expect(page.locator("body")).toContainText(/Reels/i);
  });
});
