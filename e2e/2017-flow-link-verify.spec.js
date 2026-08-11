// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const FLOW_SITES = [
  "pages/home.html",
  "pages/about.html",
  "pages/map.html",
  "pages/whats-new.html",
  "sites/iphone/x.html",
  "sites/fortnite/index.html",
  "sites/twitter/280.html",
  "sites/wannacry/index.html",
  "sites/vine/gone.html",
  "sites/teams/index.html",
  "sites/equifax/index.html",
  "sites/playable/game.html",
  "sites/musically/index.html",
  "sites/switch/index.html",
  "sites/yahoo-3b/index.html",
  "sites/netneutrality/index.html",
  "sites/bitcoin/index.html",
  "sites/snapchat/redesign.html",
  "sites/discord/nitro.html",
  "sites/facebook/2b.html",
  "sites/windows10/index.html",
  "sites/chrome/index.html",
  "sites/snapchat/ipo.html",
  "sites/youtube/tv.html",
  "sites/echo/show.html",
  "sites/notpetya/index.html",
  "sites/flash/eol.html",
  "sites/ios11/index.html",
  "sites/pixel/2.html",
  "sites/krack/index.html",
  "sites/netflix/index.html",
];

test.describe("2017 flow-map + home links exist", () => {
  for (const rel of FLOW_SITES) {
    test(`flow-map ${rel}`, async ({ page }) => {
      const res = await page.goto(`/years/2017/${rel}`);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2017");
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  test("home P0 chips resolve", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    await expect(page.locator("#ott-guided-2017 ol li")).toHaveCount(6);
    const hrefs = [
      "../sites/iphone/x.html",
      "../sites/fortnite/index.html",
      "../sites/twitter/280.html",
      "../sites/wannacry/index.html",
      "../sites/vine/gone.html",
    ];
    for (const h of hrefs) {
      await expect(page.locator(`a[href="${h}"]`).first(), h).toBeVisible();
      const res = await page.goto(`/years/2017/pages/${h}`);
      expect(res && res.ok(), h).toBeTruthy();
      await page.goto("/years/2017/pages/home.html");
    }
  });

  test("iframe Face ID then Fortnite", async ({ page }) => {
    await enterYear(page, "2017");
    await goInFrame(page, "sites/iphone/x.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Face ID/i, { timeout: 15000 });
    await goInFrame(page, "sites/fortnite/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Sep(?:tember)?\s*26/i);
  });
});
