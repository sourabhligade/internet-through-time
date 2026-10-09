// @ts-check
const { test, expect } = require("@playwright/test");
const { trailDestsLoad } = require("./year-pack-io");

const HREFS = [
    "sites/zoom/meeting.html",
    "sites/houseparty/index.html",
    "sites/discord/index.html",
    "sites/teams/index.html",
    "sites/classroom/index.html",
    "sites/netflix/index.html",
    "sites/tiktok/index.html",
    "sites/amongus/index.html",
    "sites/animalcrossing/index.html",
    "sites/playable/game.html"
];

test.describe("2020 official trail dests exist", () => {
  test("official dests load", async ({ page }) => {
    await trailDestsLoad(page, "2020", HREFS);
  });
});
