// @ts-check
const { test, expect } = require("@playwright/test");
const { everyOfficialDest } = require("./year-pack-io");

const DESTS = [
    { href: "sites/googleplus/index.html", key: "itt11-gplus", fill: "Friends" },
    { href: "sites/spotify/index.html", key: "itt11-spotify", fill: "spotify leftover" },
    { href: "sites/iphone/index.html", key: "itt11-siri", fill: "siri leftover" },
    { href: "sites/facebook/index.html", key: "itt11-timeline", fill: "timeline leftover" },
    { href: "sites/ipad/index.html", key: "itt11-ipad2", fill: "ipad leftover" },
    { href: "sites/airbnb/index.html", key: "itt11-airbnb", fill: "airbnb leftover" },
    { href: "sites/instagram/index.html", key: "itt11-ig", fill: "ig leftover" },
    { href: "sites/twitter/index.html", key: "itt11-tweets", fill: "tweet leftover" },
    { href: "sites/qwikster/index.html", key: "itt11-qwikster", fill: "qwik leftover" },
    { href: "sites/playable/game.html", key: "itt11-game-letterswap", fill: "swap leftover" }
];

test.describe("2011 flows", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    await everyOfficialDest(page, "2011", DESTS);
  });
});
