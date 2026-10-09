// @ts-check
const { test, expect } = require("@playwright/test");

const STOPS = [
  "itt15-periscope",
  "itt15-music",
  "itt15-win10",
  "itt15-reddit",
  "itt15-watch",
  "itt15-edge",
  "itt15-meerkat",
  "itt15-slack",
  "itt15-youtube",
  "itt15-game-liverush",
];

test.describe("2015 official trail dests exist", () => {
  test("every React stop loads", async ({ page }) => {
    for (const key of STOPS) {
      await page.goto(`/app/index.html#/year/2015?stop=${key}`);
      await expect(page.locator(`article.stop#${key}`)).toBeVisible({ timeout: 20000 });
    }
  });
});
