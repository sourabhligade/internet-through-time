// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/google/lucky.html",
  "sites/google/index.html",
  "sites/yahoo/index.html",
  "sites/amazon/music.html",
  "sites/ebay/index.html",
  "sites/cdnow/index.html",
  "sites/hotmail/index.html",
  "sites/mozilla/index.html",
  "sites/slashdot/index.html",
  "sites/dmoz/index.html"
];

test.describe("1998 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/1998/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
