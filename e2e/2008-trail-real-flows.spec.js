// @ts-check
const { test, expect } = require("@playwright/test");
const { trailDestsLoad } = require("./year-pack-io");

const HREFS = [
    "sites/appstore/index.html",
    "sites/chrome/index.html",
    "sites/android/index.html",
    "sites/hulu/index.html",
    "sites/github/issue.html",
    "sites/facebook/index.html",
    "sites/twitter/index.html",
    "sites/youtube/index.html",
    "sites/dropbox/index.html",
    "sites/iphone/index.html"
];

test.describe("2008 official trail dests exist", () => {
  test("official dests load", async ({ page }) => {
    await trailDestsLoad(page, "2008", HREFS);
  });
});
