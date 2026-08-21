// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2020 official trail dests exist", () => {
  const stops = [
    "sites/zoom/meeting.html",
    "sites/reels/index.html",
    "sites/openai/index.html",
    "sites/flash/index.html",
    "sites/tiktok/index.html",
    "sites/markets/wti.html",
    "sites/edge/index.html",
    "sites/ccpa/index.html",
    "sites/chrome/index.html",
    "sites/playable/game.html",
  ];
  for (const href of stops) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2020/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }

  test("map lists official ten hrefs", async ({ page }) => {
    await page.goto("/years/2020/pages/map.html");
    await expect(page.locator("ol[data-itt-ten-flows] > li")).toHaveCount(10);
    await expect(page.locator("[data-itt-ten-flows] a[href*='zoom']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='reels']").first()).toBeVisible();
    await expect(page.locator("[data-itt-ten-flows] a[href*='playable/game']").first()).toBeVisible();
    await expect(page.locator('a[href*="youtube"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wikipedia"]').first()).toBeVisible();
  });

  test("Next stays hidden until Zoom writes", async ({ page }) => {
    await page.goto("/years/2020/sites/zoom/meeting.html");
    await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
    await page.reload();
    await expect(page.locator("[data-next-flow]")).toBeHidden();
    await page.locator("[data-zoom-req]").nth(0).check();
    await page.locator("[data-zoom-req]").nth(1).check();
    await page.locator("[data-zoom-mute]").click();
    await page.fill("[data-zoom-field]", "can you see my screen");
    await page.locator("[data-zoom-send]").click();
    await page.locator("[data-zoom-leave]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
  });
});
