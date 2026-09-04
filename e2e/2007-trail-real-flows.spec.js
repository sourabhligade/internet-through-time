// @ts-check
const { test, expect } = require("@playwright/test");

const DESTS = [
  "sites/iphone/index.html",
  "sites/facebook/index.html",
  "sites/gmail/index.html",
  "sites/playable/game.html",
];

test.describe("2007 official trail dests exist", () => {
  for (const dest of DESTS) {
    test(dest + " loads", async ({ page }) => {
      const res = await page.goto("/years/2007/" + dest);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
