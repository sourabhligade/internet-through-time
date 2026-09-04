// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2019 official trail dests exist", () => {
  const stops = [
    "sites/disneyplus/home.html",
    "sites/tiktok/index.html",
    "sites/arcade/index.html",
    "sites/appletv/index.html",
    "sites/stadia/index.html",
    "sites/iphone/iphone11.html",
    "sites/airpodspro/index.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/playable/game.html",
  ];
  for (const href of stops) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2019/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }

  test("map lists official ten hrefs", async ({ page }) => {
    await page.goto("/years/2019/pages/map.html");
    await expect(page.locator("ol[data-itt-ten-flows] > li")).toHaveCount(10);
    await expect(page.locator("[data-itt-ten-flows] a[href*='disneyplus']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='tiktok']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='playable/game']").first()).toBeVisible();
    await expect(page.locator('a[href*="youtube"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wikipedia"]').first()).toBeVisible();
  });
});
