// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2018 official trail dests exist", () => {
  const stops = [
    "sites/gdpr/index.html",
    "sites/tiktok/fyp.html",
    "sites/trust/index.html",
    "sites/instagram/igtv.html",
    "sites/chrome/not-secure.html",
    "sites/homepod/index.html",
    "sites/spectre/index.html",
    "sites/fortnite/switch.html",
    "sites/github/microsoft.html",
    "sites/playable/game.html",
  ];
  for (const href of stops) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2018/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }

  test("map lists official ten hrefs", async ({ page }) => {
    await page.goto("/years/2018/pages/map.html");
    await expect(page.locator("ol[data-itt-ten-flows] > li")).toHaveCount(10);
    await expect(page.locator("[data-itt-ten-flows] a[href*='gdpr']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='tiktok']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='playable/game']").first()).toBeVisible();
    await expect(page.locator('a[href*="reddit"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wikipedia"]').first()).toBeVisible();
  });
});
