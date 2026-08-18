// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2016 official trail dests exist", () => {
  const stops = [
    "sites/instagram/stories.html",
    "sites/pokemongo/index.html",
    "sites/facebook/reactions.html",
    "sites/whatsapp/e2e.html",
    "sites/iphone/index.html",
    "sites/vine/goodbye.html",
    "sites/snapchat/spectacles.html",
    "sites/musically/index.html",
    "sites/windows10/end.html",
    "sites/playable/game.html",
  ];
  for (const href of stops) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2016/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }

  test("map lists official ten hrefs", async ({ page }) => {
    await page.goto("/years/2016/pages/map.html");
    await expect(page.locator("ol[data-itt-ten-flows] > li")).toHaveCount(10);
    await expect(page.locator("[data-itt-ten-flows] a[href*='instagram/stories']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='pokemongo']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='playable/game']").first()).toBeVisible();
    await expect(page.locator('a[href*="reddit"]').first()).toBeVisible();
    await expect(page.locator('a[href*="netflix"]').first()).toBeVisible();
    await expect(page.locator('a[href*="youtube"]').first()).toBeVisible();
  });
});
