// @ts-check
const { test, expect } = require("@playwright/test");
const { everyOfficialDest } = require("./year-pack-io");

const DESTS = [
    { href: "sites/youtube/upload.html", key: "itt05-yt-uploads", fill: "elephant residual" },
    { href: "sites/maps/index.html", key: "itt05-maps", fill: "maps leftover" },
    { href: "sites/pandora/index.html", key: "itt05-pandora", fill: "pandora leftover" },
    { href: "sites/housingmaps/index.html", key: "itt05-hm", fill: "housing leftover" },
    { href: "sites/digg/index.html", key: "itt05-digg", fill: "digg leftover" },
    { href: "sites/reddit/index.html", key: "itt05-reddit", fill: "reddit leftover" },
    { href: "sites/flickr/index.html", key: "itt05-flickr", fill: "flickr leftover" },
    { href: "sites/itunes/podcasts.html", key: "itt05-pod", fill: "pod leftover" },
    { href: "sites/techcrunch/index.html", key: "itt05-tc", fill: "tc leftover" },
    { href: "sites/playable/game.html", key: "itt05-game-heli", fill: "heli leftover" }
];

test.describe("2005 flows", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    await everyOfficialDest(page, "2005", DESTS);
  });
});
