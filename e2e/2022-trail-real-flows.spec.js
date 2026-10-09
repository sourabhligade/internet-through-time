// @ts-check
const { test, expect } = require("@playwright/test");
const { trailDestsLoad } = require("./year-pack-io");

const HREFS = [
    "sites/chatgpt/index.html",
    "sites/wordle/index.html",
    "sites/twitter/index.html",
    "sites/bereal/index.html",
    "sites/iphone/14.html",
    "sites/ftx/index.html",
    "sites/mastodon/index.html",
    "sites/tiktok/index.html",
    "sites/windows11/index.html",
    "sites/playable/game.html"
];

test.describe("2022 official trail dests exist", () => {
  test("official dests load", async ({ page }) => {
    await trailDestsLoad(page, "2022", HREFS);
  });
});
