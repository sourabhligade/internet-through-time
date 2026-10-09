// @ts-check
const { test, expect } = require("@playwright/test");
const { everyOfficialDest } = require("./year-pack-io");

const DESTS = [
    { href: "sites/appstore/index.html", key: "itt08-apps", fill: "Koi Pond" },
    { href: "sites/chrome/index.html", key: "itt08-chrome", fill: "chrome leftover" },
    { href: "sites/android/index.html", key: "itt08-android", fill: "g1 leftover" },
    { href: "sites/hulu/index.html", key: "itt08-hulu", fill: "hulu leftover" },
    { href: "sites/github/issue.html", key: "itt08-github", fill: "issue leftover" },
    { href: "sites/facebook/index.html", key: "itt08-facebook", fill: "login leftover" },
    { href: "sites/twitter/index.html", key: "itt08-tweets", fill: "update leftover" },
    { href: "sites/youtube/index.html", key: "itt08-yt", fill: "search leftover" },
    { href: "sites/dropbox/index.html", key: "itt08-dropbox", fill: "put leftover" },
    { href: "sites/iphone/index.html", key: "itt08-iphone3g", fill: "3g leftover" }
];

test.describe("2008 flows", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    await everyOfficialDest(page, "2008", DESTS);
  });
});
