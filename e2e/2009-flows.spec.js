// @ts-check
const { test, expect } = require("@playwright/test");
const { everyOfficialDest } = require("./year-pack-io");

const DESTS = [
    { href: "sites/facebook/index.html", key: "itt09-like", fill: "Like" },
    { href: "sites/farmville/index.html", key: "itt09-farm", fill: "farm leftover" },
    { href: "sites/bing/index.html", key: "itt09-bing", fill: "bing leftover" },
    { href: "sites/iphone/index.html", key: "itt09-iphone", fill: "3gs leftover" },
    { href: "sites/appstore/index.html", key: "itt09-apps", fill: "app leftover" },
    { href: "sites/twitter/index.html", key: "itt09-tweets", fill: "tweet leftover" },
    { href: "sites/foursquare/index.html", key: "itt09-4sq", fill: "check leftover" },
    { href: "sites/kickstarter/index.html", key: "itt09-kickstarter", fill: "kick leftover" },
    { href: "sites/windows7/index.html", key: "itt09-win7", fill: "win7 leftover" },
    { href: "sites/playable/game.html", key: "itt09-game-plot", fill: "plot leftover" }
];

test.describe("2009 flows", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    await everyOfficialDest(page, "2009", DESTS);
  });
});
