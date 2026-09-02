// @ts-check
const { test, expect } = require("@playwright/test");

const DESTS = [
  "sites/chatgpt/index.html",
  "sites/twitter/index.html",
  "sites/wordle/index.html",
  "sites/playable/game.html",
];

test.describe("2022 official trail dests exist", () => {
  for (const dest of DESTS) {
    test(dest + " loads", async ({ page }) => {
      const res = await page.goto("/years/2022/" + dest);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
