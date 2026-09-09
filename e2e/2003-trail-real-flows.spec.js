// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/photobucket/index.html",
  "sites/itunes/index.html",
  "sites/wordpress/dashboard.html",
  "sites/linkedin/invite.html",
  "sites/myspace/index.html",
  "sites/friendster/friends.html",
  "sites/adsense/index.html",
  "sites/bloglines/index.html",
  "sites/blogger/edit.html",
  "sites/playable/game.html"
];

test.describe("2003 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2003/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
