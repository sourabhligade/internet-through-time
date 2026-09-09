// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/portals/wars.html",
  "sites/hotmail/index.html",
  "sites/spacejam/index.html",
  "sites/yahoo/my.html",
  "sites/geocities/index.html",
  "sites/amazon/index.html",
  "sites/auctionweb/index.html",
  "sites/excite/index.html",
  "sites/altavista/index.html",
  "sites/playable/game.html"
];

test.describe("1996 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/1996/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
