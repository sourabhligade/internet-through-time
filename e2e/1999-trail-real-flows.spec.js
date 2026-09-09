// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/aim/index.html",
  "sites/napster/search.html",
  "sites/google/index.html",
  "sites/blogger/edit.html",
  "sites/y2k/index.html",
  "sites/sourceforge/index.html",
  "sites/paypal/send.html",
  "sites/amazon/index.html",
  "sites/ebay/item-laptop.html",
  "sites/askjeeves/index.html"
];

test.describe("1999 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/1999/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
