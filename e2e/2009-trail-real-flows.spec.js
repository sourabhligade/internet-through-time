// @ts-check
const { test, expect } = require("@playwright/test");
const { trailDestsLoad } = require("./year-pack-io");

const HREFS = [
    "sites/facebook/index.html",
    "sites/farmville/index.html",
    "sites/bing/index.html",
    "sites/iphone/index.html",
    "sites/appstore/index.html",
    "sites/twitter/index.html",
    "sites/foursquare/index.html",
    "sites/kickstarter/index.html",
    "sites/windows7/index.html",
    "sites/playable/game.html"
];

test.describe("2009 official trail dests exist", () => {
  test("official dests load", async ({ page }) => {
    await trailDestsLoad(page, "2009", HREFS);
  });
});
