// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2017 official trail dests exist", () => {
  const stops = [
    "sites/iphone/x.html",
    "sites/fortnite/index.html",
    "sites/twitter/280.html",
    "sites/teams/index.html",
    "sites/vine/gone.html",
    "sites/switch/index.html",
    "sites/wannacry/index.html",
    "sites/musically/index.html",
    "sites/equifax/index.html",
    "sites/playable/game.html",
  ];
  for (const href of stops) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2017/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }

  test("map lists official ten hrefs", async ({ page }) => {
    await page.goto("/years/2017/pages/map.html");
    await expect(page.locator("ol[data-itt-ten-flows] > li")).toHaveCount(10);
    await expect(page.locator("[data-itt-ten-flows] a[href*='iphone/x']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='fortnite']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='playable/game']").first()).toBeVisible();
    await expect(page.locator('a[href*="reddit"]').first()).toBeVisible();
    await expect(page.locator('a[href*="amazon"]').first()).toBeVisible();
  });
});
