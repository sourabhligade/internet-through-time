// @ts-check
/**
 * 2016 — every flow-map site + home link + dirbar/iframe trails.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const FLOW_SITES = [
  "pages/home.html",
  "pages/about.html",
  "pages/map.html",
  "pages/whats-new.html",
  "sites/instagram/stories.html",
  "sites/instagram/watch.html",
  "sites/instagram/index.html",
  "sites/pogo/index.html",
  "sites/pogo/map.html",
  "sites/facebook/reactions.html",
  "sites/facebook/post.html",
  "sites/whatsapp/e2e.html",
  "sites/whatsapp/chat.html",
  "sites/iphone/7.html",
  "sites/iphone/dongle.html",
  "sites/airpods/index.html",
  "sites/vine/goodbye.html",
  "sites/vine/loop.html",
  "sites/windows10/index.html",
  "sites/chrome/index.html",
  "sites/playable/game.html",
  "sites/playable/index.html",
  "sites/messenger/bots.html",
  "sites/oculus/cv1.html",
  "sites/linkedin/deal.html",
  "sites/allo/index.html",
  "sites/musically/index.html",
  "sites/instagram/live.html",
  "sites/amp/serp.html",
  "sites/facebook/live.html",
  "sites/dyn/index.html",
  "sites/pixel/index.html",
  "sites/home/index.html",
  "sites/snapchat/spectacles.html",
  "sites/apple/letter.html",
  "sites/freebasics/index.html",
  "sites/facebook/marketplace.html",
  "sites/duo/index.html",
  "sites/teams/index.html",
  "sites/alphago/index.html",
  "sites/letsencrypt/index.html",
  "sites/yahoo-breach/index.html",
  "sites/workplace/index.html",
  "sites/iphone/ios10.html",
  "sites/android/nougat.html",
  "sites/note7/index.html",
  "sites/mariorun/index.html",
];

const HOME_HREFS = [
  "about.html",
  "map.html",
  "whats-new.html",
  "../sites/instagram/stories.html",
  "../sites/instagram/watch.html",
  "../sites/instagram/index.html",
  "../sites/pogo/index.html",
  "../sites/pogo/map.html",
  "../sites/facebook/index.html",
  "../sites/facebook/reactions.html",
  "../sites/facebook/post.html",
  "../sites/whatsapp/index.html",
  "../sites/whatsapp/e2e.html",
  "../sites/whatsapp/chat.html",
  "../sites/vine/index.html",
  "../sites/vine/goodbye.html",
  "../sites/vine/loop.html",
  "../sites/airpods/index.html",
  "../sites/iphone/7.html",
  "../sites/iphone/dongle.html",
  "../sites/windows10/index.html",
  "../sites/chrome/index.html",
  "../sites/playable/game.html",
  "../sites/playable/index.html",
  "../sites/messenger/bots.html",
  "../sites/oculus/cv1.html",
  "../sites/linkedin/deal.html",
  "../sites/allo/index.html",
  "../sites/musically/index.html",
  "../sites/instagram/live.html",
  "../sites/amp/serp.html",
  "../sites/facebook/live.html",
  "../sites/dyn/index.html",
  "../sites/pixel/index.html",
  "../sites/home/index.html",
  "../sites/snapchat/spectacles.html",
  "../sites/apple/letter.html",
  "../sites/freebasics/index.html",
  "../sites/facebook/marketplace.html",
  "../sites/duo/index.html",
  "../sites/teams/index.html",
  "../sites/alphago/index.html",
  "../sites/letsencrypt/index.html",
  "../sites/yahoo-breach/index.html",
  "../sites/workplace/index.html",
  "../sites/iphone/ios10.html",
  "../sites/android/nougat.html",
  "../sites/note7/index.html",
  "../sites/mariorun/index.html",
  "../sites/apple/watch.html",
  "../sites/snapchat/story.html",
  "../sites/googlephotos/index.html",
  "../sites/periscope/index.html",
  "../sites/discord/index.html",
  "../sites/edge/index.html",
];

test.describe("2016 flow-map + home links exist", () => {
  for (const rel of FLOW_SITES) {
    test(`flow-map ${rel}`, async ({ page }) => {
      const res = await page.goto(`/years/2016/${rel}`);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2016");
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  for (const href of HOME_HREFS) {
    test(`home link ${href}`, async ({ page }) => {
      const res = await page.goto(`/years/2016/pages/${href}`);
      expect(res && res.ok(), href).toBeTruthy();
    });
  }

  test("map renders 2016 branches", async ({ page }) => {
    await page.goto("/years/2016/pages/map.html");
    const tree = page.locator("[data-itt-flow-map]");
    await expect(tree).toBeVisible();
    await expect(tree).toContainText(/Stories/i, { timeout: 10000 });
    await expect(tree).toContainText(/Pokémon|Pokemon|PoGO|Street/i);
    await expect(tree.locator("a[href*='stories']").first()).toBeVisible();
    await expect(tree.locator("a[href*='e2e']").first()).toBeVisible();
    await expect(tree).toContainText(/Live|AMP|Dyn|Pixel|Spectacles/i);
    await expect(tree.locator("a[href*='live']").first()).toBeVisible();
    await expect(tree.locator("a[href*='amp']").first()).toBeVisible();
    await expect(tree.locator("a[href*='dyn']").first()).toBeVisible();
  });
});

test.describe("2016 dirbar + iframe trails", () => {
  test("dirbar buttons open P0 rooms", async ({ page }) => {
    await enterYear(page, "2016");
    const targets = [
      ["Stories", /Instagram Stories|August 2|24 hours/i],
      ["PoGO", /Pokémon|Pokemon|Jul(?:y)?\s*6|silhouette/i],
      ["Reactions", /Reaction|Feb(?:ruary)?\s*24/i],
      ["WA E2E", /end-to-end|Apr(?:il)?\s*5|WhatsApp/i],
      ["Vine", /Oct(?:ober)?\s*27|Vine/i],
      ["Chrome", /Chrome/i],
    ];
    for (const [label, re] of targets) {
      await page.locator("#dirbar .dir-btn", { hasText: label }).first().click();
      await expect(contentFrame(page).locator("body")).toContainText(re, { timeout: 15000 });
    }
  });

  test("iframe guided Stories → PoGO → Reactions", async ({ page }) => {
    await enterYear(page, "2016");
    await goInFrame(page, "sites/instagram/stories.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Instagram Stories/i);
    await goInFrame(page, "sites/pogo/index.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Jul(?:y)?\s*6/i);
    await goInFrame(page, "sites/facebook/reactions.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Reaction/i);
  });
});
