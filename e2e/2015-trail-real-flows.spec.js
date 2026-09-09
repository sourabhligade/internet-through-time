// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/periscope/index.html",
  "sites/googlephotos/index.html",
  "sites/windows10/index.html",
  "sites/applemusic/index.html",
  "sites/edge/index.html",
  "sites/apple/watch.html",
  "sites/snapchat/discover.html",
  "sites/discord/index.html",
  "sites/letsencrypt/index.html",
  "sites/playable/game.html"
];

test.describe("2015 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2015/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
