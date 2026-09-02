// @ts-check
const { test, expect } = require("@playwright/test");

const DESTS = [
  "sites/plus/index.html",
  "sites/bard/index.html",
  "sites/bingchat/index.html",
  "sites/playable/game.html",
];

test.describe("2023 official trail dests exist", () => {
  for (const dest of DESTS) {
    test(dest + " loads", async ({ page }) => {
      const res = await page.goto("/years/2023/" + dest);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
