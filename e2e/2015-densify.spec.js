// @ts-check
const { test, expect } = require("@playwright/test");

async function clearKey(page, key) {
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

test.describe("2015 densify — gold leftover", () => {
  test("Watch shows titled replay after live; heart does not clear star", async ({ page }) => {
    await page.goto("/years/2015/sites/periscope/index.html");
    await clearKey(page, "itt15-periscope");
    await clearKey(page, "itt15-peri-watch");
    await page.reload();
    await page.fill("[data-peri-title]", "museum rooftop");
    await page.locator("[data-peri-live]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-periscope"))).toMatch(/museum rooftop/);
    await expect(page.locator("[data-peri-live-well]")).toBeVisible();
    await page.goto("/years/2015/sites/periscope/watch.html");
    await expect(page.locator("[data-peri-replay-title]")).toContainText("museum rooftop");
    await page.locator("[data-peri-heart-well]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt15-peri-watch"))).toMatch(/hearts/);
    expect(await page.evaluate(() => localStorage.getItem("itt15-periscope"))).toMatch(/museum rooftop/);
    await expect(page.locator('a[href="index.html"]').first()).toBeVisible();
  });

  test("Photos library search beach shows a hit", async ({ page }) => {
    await page.goto("/years/2015/sites/googlephotos/library.html");
    await page.locator("[data-gp-hint=\"beach\"]").click();
    await expect(page.locator("[data-gp-hits]")).toContainText(/beach/i);
    await page.fill("[data-gp-search]", "");
    await page.locator("[data-gp-search-go]").click();
    await expect(page.locator("[data-gp-hits]")).toContainText(/Empty search never writes/i);
  });

  test("Photos crumb points at Periscope", async ({ page }) => {
    await page.goto("/years/2015/sites/googlephotos/index.html");
    await expect(page.locator('a[href*="periscope"]').first()).toBeVisible();
  });

  test("Win10 page says GWX / Get Windows 10 / not Chromium", async ({ page }) => {
    await page.goto("/years/2015/sites/windows10/index.html");
    await expect(page.locator("body")).toContainText(/Get Windows 10|GWX/i);
    await page.goto("/years/2015/sites/windows10/upgrade.html");
    await expect(page.locator("body")).toContainText(/not Chromium|EdgeHTML|Spartan/i);
    await expect(page.locator("body")).toContainText(/Start menu/i);
  });

  test("Beats 1 three desks", async ({ page }) => {
    await page.goto("/years/2015/sites/applemusic/beats1.html");
    await expect(page.locator("[data-beats-desk]")).toHaveCount(3);
    await page.locator('[data-beats-desk="LA"]').click();
    await expect(page.locator("[data-beats-status]")).toContainText(/On air|LA/i);
  });

  test("shell is still os-win7", async ({ page }) => {
    await page.goto("/years/2015/");
    await expect(page.locator("body")).toHaveClass(/os-win7/);
  });
});
