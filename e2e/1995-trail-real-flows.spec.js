// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/amazon/ssl-checkout.html",
  "sites/amazon/index.html",
  "sites/auctionweb/item-laser.html",
  "sites/geocities/homestead.html",
  "sites/yahoo/index.html",
  "sites/altavista/index.html",
  "sites/cnn/index.html",
  "sites/microsoft/index.html",
  "sites/netscape/index.html",
  "sites/classmates/index.html"
];

test.describe("1995 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/1995/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
