// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/stumbleupon/index.html",
  "sites/isp/index.html",
  "sites/kazaa/index.html",
  "sites/wired/index.html",
  "sites/phoenix/index.html",
  "sites/mozilla/index.html",
  "sites/ipod/index.html",
  "sites/friendster/index.html",
  "sites/movabletype/trackback.html",
  "sites/playable/game.html"
];

test.describe("2002 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2002/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
