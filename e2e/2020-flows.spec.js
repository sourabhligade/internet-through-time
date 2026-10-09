// @ts-check
const { test, expect } = require("@playwright/test");
const { everyOfficialDest } = require("./year-pack-io");

const DESTS = [
    { href: "sites/zoom/meeting.html", key: "itt20-zoom", fill: "brb leftover" },
    { href: "sites/houseparty/index.html", key: "itt20-houseparty", fill: "party leftover" },
    { href: "sites/discord/index.html", key: "itt20-discord", fill: "discord leftover" },
    { href: "sites/teams/index.html", key: "itt20-teams", fill: "teams leftover" },
    { href: "sites/classroom/index.html", key: "itt20-classroom", fill: "class leftover" },
    { href: "sites/netflix/index.html", key: "itt20-netflix", fill: "netflix leftover" },
    { href: "sites/tiktok/index.html", key: "itt20-tiktok", fill: "tiktok leftover" },
    { href: "sites/amongus/index.html", key: "itt20-amongus", fill: "among leftover" },
    { href: "sites/animalcrossing/index.html", key: "itt20-acnh", fill: "island leftover" },
    { href: "sites/playable/game.html", key: "itt20-game-leave", fill: "leave leftover" }
];

test.describe("2020 flows", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    await everyOfficialDest(page, "2020", DESTS);
  });
});
