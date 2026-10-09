// @ts-check
const { test, expect } = require("@playwright/test");
const { trailDestsLoad } = require("./year-pack-io");

const HREFS = [
    "sites/googleplus/index.html",
    "sites/spotify/index.html",
    "sites/iphone/index.html",
    "sites/facebook/index.html",
    "sites/ipad/index.html",
    "sites/airbnb/index.html",
    "sites/instagram/index.html",
    "sites/twitter/index.html",
    "sites/qwikster/index.html",
    "sites/playable/game.html"
];

test.describe("2011 official trail dests exist", () => {
  test("official dests load", async ({ page }) => {
    await trailDestsLoad(page, "2011", HREFS);
  });
});
