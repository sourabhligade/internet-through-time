// @ts-check
const { test, expect } = require("@playwright/test");

const DESTS = [
  "sites/chatgpt/4o.html",
  "sites/claude35/index.html",
  "sites/sora/index.html",
  "sites/playable/game.html",
];

test.describe("2024 official trail dests exist", () => {
  for (const dest of DESTS) {
    test(dest + " loads", async ({ page }) => {
      const res = await page.goto("/years/2024/" + dest);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
