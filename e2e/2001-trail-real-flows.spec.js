// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/wikipedia/edit.html",
  "sites/archive/index.html",
  "sites/itunes/index.html",
  "sites/apple/ipod.html",
  "sites/napster/index.html",
  "sites/movabletype/index.html",
  "sites/google/index.html",
  "sites/yahoo/index.html",
  "sites/amazon/index.html",
  "sites/playable/game.html"
];

test.describe("2001 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2001/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
