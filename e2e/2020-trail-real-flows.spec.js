// @ts-check
const { test, expect } = require("@playwright/test");

const DESTS = [
  "sites/zoom/meeting.html",
  "sites/discord/index.html",
  "sites/teams/index.html",
  "sites/playable/game.html",
];

test.describe("2020 official trail dests exist", () => {
  for (const dest of DESTS) {
    test(dest + " loads", async ({ page }) => {
      const res = await page.goto("/years/2020/" + dest);
      expect(res && res.ok()).toBeTruthy();
    });
  }
});
