// @ts-check
const { test, expect } = require("@playwright/test");

const TRAIL = [
  "sites/whatsapp/index.html",
  "sites/whatsapp/chat.html",
  "sites/heartbleed/index.html",
  "sites/icebucket/index.html",
  "sites/iphone/index.html",
  "sites/iphone/pay.html",
  "sites/material/index.html",
  "sites/slack/index.html",
  "sites/twitch/index.html",
  "sites/playable/game.html",
];

test.describe("2014 official trail dests exist", () => {
  for (const href of TRAIL) {
    test(href + " loads", async ({ page }) => {
      const res = await page.goto("/years/2014/" + href);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
