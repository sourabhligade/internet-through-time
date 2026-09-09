// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/twitter/index.html",
  "sites/facebook/feed.html",
  "sites/facebook/open.html",
  "sites/youtube/index.html",
  "sites/googledocs/index.html",
  "sites/aws/index.html",
  "sites/ie7/index.html",
  "sites/wikipedia/millionth.html",
  "sites/roblox/index.html",
  "sites/playable/linerider.html"
];

test.describe("2006 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2006/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
