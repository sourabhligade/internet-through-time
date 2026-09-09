// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/pointcast/index.html",
  "sites/icq/index.html",
  "sites/ebay/item-laptop.html",
  "sites/hotmail/index.html",
  "sites/slashdot/story.html",
  "sites/drudge/index.html",
  "sites/hotbot/index.html",
  "sites/aim/index.html",
  "sites/apple/think-different.html",
  "sites/microsoft/index.html"
];

test.describe("1997 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/1997/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
