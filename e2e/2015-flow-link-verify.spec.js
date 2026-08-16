// @ts-check
/**
 * 2015 — every flow-map site + home link + dirbar/iframe trails.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const FLOW_SITES = [
  "pages/home.html",
  "pages/about.html",
  "pages/map.html",
  "pages/whats-new.html",
  "sites/apple/watch.html",
  "sites/windows10/index.html",
  "sites/edge/index.html",
  "sites/chrome/index.html",
  "sites/whatsapp/index.html",
  "sites/whatsapp/web.html",
  "sites/periscope/index.html",
  "sites/meerkat/index.html",
  "sites/fblive/index.html",
  "sites/applemusic/index.html",
  "sites/googlephotos/index.html",
  "sites/ios9/blockers.html",
  "sites/discord/index.html",
  "sites/discord/channel.html",
  "sites/echo/index.html",
  "sites/letsencrypt/index.html",
  "sites/swift/index.html",
  "sites/snapchat/discover.html",
  "sites/reactnative/index.html",
  "sites/privacy/ashleymadison.html",
  "sites/messenger/index.html",
  "sites/oculus/cv1.html",
  "sites/peach/index.html",
  "sites/iphone/6s.html",
  "sites/playable/game.html",
  "sites/playable/index.html",
  "sites/youtube/red.html",
  "sites/facebook/instant.html",
  "sites/twitter/moments.html",
  "sites/fcc/index.html",
  "sites/amp/index.html",
];

const HOME_HREFS = [
  "about.html",
  "map.html",
  "whats-new.html",
  "../sites/apple/watch.html",
  "../sites/windows10/index.html",
  "../sites/edge/index.html",
  "../sites/periscope/index.html",
  "../sites/applemusic/index.html",
  "../sites/googlephotos/index.html",
  "../sites/ios9/blockers.html",
  "../sites/chrome/index.html",
  "../sites/meerkat/index.html",
  "../sites/fblive/index.html",
  "../sites/snapchat/discover.html",
  "../sites/discord/index.html",
  "../sites/discord/channel.html",
  "../sites/letsencrypt/index.html",
  "../sites/echo/index.html",
  "../sites/swift/index.html",
  "../sites/messenger/index.html",
  "../sites/oculus/cv1.html",
  "../sites/peach/index.html",
  "../sites/iphone/6s.html",
  "../sites/reactnative/index.html",
  "../sites/privacy/ashleymadison.html",
  "../sites/whatsapp/index.html",
  "../sites/whatsapp/web.html",
  "../sites/snapchat/story.html",
  "../sites/playable/index.html",
  "../sites/playable/game.html",
  "../sites/youtube/red.html",
  "../sites/facebook/instant.html",
  "../sites/twitter/moments.html",
  "../sites/fcc/index.html",
  "../sites/amp/index.html",
];

test.describe("2015 flow-map + home links exist", () => {
  for (const rel of FLOW_SITES) {
    test(`flow-map ${rel}`, async ({ page }) => {
      const res = await page.goto(`/years/2015/${rel}`);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2015");
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  for (const href of HOME_HREFS) {
    test(`home link ${href}`, async ({ page }) => {
      const res = await page.goto(`/years/2015/pages/${href}`);
      expect(res && res.ok(), href).toBeTruthy();
    });
  }

  test("map renders 2015 branches", async ({ page }) => {
    await page.goto("/years/2015/pages/map.html");
    const tree = page.locator("[data-itt-flow-map]");
    await expect(tree).toBeVisible();
    await expect(tree).toContainText(/Watch/i, { timeout: 10000 });
    await expect(tree).toContainText(/Win10|Windows 10|free/i);
    await expect(tree).toContainText(/Periscope/i);
    await expect(tree.locator("a[href*='watch']").first()).toBeVisible();
    await expect(tree.locator("a[href*='periscope']").first()).toBeVisible();
  });
});

test.describe("2015 dirbar + iframe trails", () => {
  test("dirbar buttons open P0 rooms", async ({ page }) => {
    await enterYear(page, "2015");
    const targets = [
      ["Watch", /Apple Watch|April 24|\$349/i],
      ["Win10", /free upgrade|July 29|Jul 29/i],
      ["Edge", /Microsoft Edge|EdgeHTML|Chromium/i],
      ["Periscope", /Go LIVE|Periscope/i],
      ["Music", /Apple Music|Beats 1|\$9\.99/i],
      ["Photos", /Google Photos|unlimited/i],
      ["Chrome", /Chrome/i],
    ];
    for (const [label, re] of targets) {
      await page.locator("#dirbar .dir-btn", { hasText: label }).first().click();
      await expect(contentFrame(page).locator("body")).toContainText(re, { timeout: 15000 });
    }
  });

  test("iframe guided Watch → Win10 → Periscope", async ({ page }) => {
    await enterYear(page, "2015");
    await goInFrame(page, "sites/apple/watch.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Apple Watch/i);
    await goInFrame(page, "sites/windows10/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/July 29|free upgrade/i);
    await goInFrame(page, "sites/periscope/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Go LIVE/i);
  });
});

test.describe("2015 leftover + ban literacy pages", () => {
  test("Ashley Madison copy refuses dump data", async ({ page }) => {
    await page.goto("/years/2015/sites/privacy/ashleymadison.html");
    await expect(page.locator("body")).toContainText(/does not reproduce|no dump|will not reproduce/i);
    await expect(page.locator("body")).not.toContainText(/@gmail\.com|password dump list/i);
  });

  test("React Native is F8 2015 iOS first", async ({ page }) => {
    await page.goto("/years/2015/sites/reactnative/index.html");
    await expect(page.locator("body")).toContainText(/F8/i);
    await expect(page.locator("body")).toContainText(/iOS first/i);
  });

  test("About 2015 bans Stories as a 2015 product", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    const body = (await page.locator("body").innerText()) || "";
    expect(body).toMatch(/Stories/i);
    expect(body).not.toMatch(/Your story|Add to story|Stories tray/i);
  });

  test("Discord is seed not one-thing", async ({ page }) => {
    await page.goto("/years/2015/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2015"]')).toHaveAttribute("href", /watch/);
    await expect(page.locator('[data-ott-one-thing="2015"]')).not.toHaveAttribute("href", /discord/);
  });

  test("WhatsApp Web is Jan 21 + not default E2E", async ({ page }) => {
    await page.goto("/years/2015/sites/whatsapp/web.html");
    await expect(page.locator("body")).toContainText(/21 January 2015|January 21|Jan 21/i);
    await expect(page.locator("body")).toContainText(/E2E is 2016|default E2E/i);
  });
});
