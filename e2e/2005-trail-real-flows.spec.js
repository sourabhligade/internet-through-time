// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/youtube/upload.html",
  "sites/maps/index.html",
  "sites/pandora/index.html",
  "sites/housingmaps/index.html",
  "sites/digg/index.html",
  "sites/reddit/index.html",
  "sites/flickr/index.html",
  "sites/itunes/podcasts.html",
  "sites/techcrunch/index.html",
  "sites/playable/game.html"
];

test.describe("2005 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2005/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
