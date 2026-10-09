// @ts-check
const { test, expect } = require("@playwright/test");
const { everyOfficialDest } = require("./year-pack-io");

const DESTS = [
    { href: "sites/att/index.html", key: "itt21-att", fill: "ask leftover" },
    { href: "sites/signal/index.html", key: "itt21-signal", fill: "signal leftover" },
    { href: "sites/copilot/index.html", key: "itt21-copilot", fill: "copilot leftover" },
    { href: "sites/meta/index.html", key: "itt21-meta", fill: "meta leftover" },
    { href: "sites/windows11/index.html", key: "itt21-win11", fill: "win11 leftover" },
    { href: "sites/flash/index.html", key: "itt21-flash-brick", fill: "flash leftover" },
    { href: "sites/chrome/index.html", key: "itt21-chrome", fill: "chrome leftover" },
    { href: "sites/windows10/index.html", key: "itt21-win10", fill: "win10 leftover" },
    { href: "sites/facebook/index.html", key: "itt21-pop-facebook", fill: "fb leftover" },
    { href: "sites/playable/game.html", key: "itt21-game-five", fill: "five leftover" }
];

test.describe("2021 flows", () => {
  test("every official dest trap never writes and complete writes", async ({ page }) => {
    await everyOfficialDest(page, "2021", DESTS);
  });
});
