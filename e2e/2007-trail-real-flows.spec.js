// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

const STOPS = [
  "sites/iphone/index.html",
  "sites/gmail/index.html",
  "sites/maps/index.html",
  "sites/facebook/index.html",
  "sites/twitter/index.html",
  "sites/youtube/index.html",
  "sites/myspace/index.html",
  "sites/digg/index.html",
  "sites/vista/index.html",
  "sites/playable/game.html",
];

test.describe("2007 official trail dests exist", () => {
  for (const href of STOPS) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2007/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }

  test("iPhone complete reveals Gmail next", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-iphone"));
    await page.reload();
    await page.locator("[data-ip07-req]").nth(0).check();
    await page.locator("[data-ip07-req]").nth(1).check();
    await page.locator('[data-ip07-cap="4"]').click();
    await page.locator("[data-ip07-safari]").click();
    await expect.poll(() => getKey(page, "itt07-iphone")).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="gmail"]')).toBeVisible();
  });

  test("Platform Beacon never writes; two apps write and reveal Twitter", async ({ page }) => {
    await page.goto("/years/2007/sites/facebook/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-fb-platform"));
    await page.reload();
    await page.locator("[data-fb07-beacon]").click();
    expect(await getKey(page, "itt07-fb-platform")).toBeFalsy();
    await page.locator("[data-fb07-req]").nth(0).check();
    await page.locator("[data-fb07-req]").nth(1).check();
    await page.locator('[data-fb07-app="poke"]').click();
    await page.locator('[data-fb07-app="quiz"]').click();
    await page.locator("[data-fb07-add]").click();
    await expect.poll(() => getKey(page, "itt07-fb-platform")).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="twitter"]')).toBeVisible();
  });
});
