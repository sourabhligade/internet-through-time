// @ts-check
const { test, expect } = require("@playwright/test");
const { trailDestsLoad } = require("./year-pack-io");

const HREFS = [
    "sites/att/index.html",
    "sites/signal/index.html",
    "sites/copilot/index.html",
    "sites/meta/index.html",
    "sites/windows11/index.html",
    "sites/flash/index.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/facebook/index.html",
    "sites/playable/game.html"
];

test.describe("2021 official trail dests exist", () => {
  test("official dests load", async ({ page }) => {
    await trailDestsLoad(page, "2021", HREFS);
  });
});
