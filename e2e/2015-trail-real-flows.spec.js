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

const LEFTOVER = [
  "itt15-googlephotos",
  "itt15-snap-discover",
  "itt15-le",
  "itt15-discord",
  "itt15-ethereum",
  "itt15-news",
  "itt15-instantarticles",
  "itt15-androidpay",
  "itt15-ipadpro",
  "itt15-dx12",
];

test.describe("2015 official trail dests exist", () => {
  test("every React stop loads", async ({ page }) => {
    for (const key of STOPS) {
      await page.goto(`/app/index.html#/year/2015?stop=${key}`);
      await expect(page.locator(`article.stop#${key}`)).toBeVisible({ timeout: 20000 });
    }
  });

  test("every leftover React stop loads", async ({ page }) => {
    for (const key of LEFTOVER) {
      await page.goto(`/app/index.html#/year/2015?stop=${key}`);
      await expect(page.locator(`article.stop#${key}`)).toBeVisible({ timeout: 20000 });
      await expect(page.locator(`article.stop#${key} .kicker`)).toContainText("Leftover");
    }
  });
});
