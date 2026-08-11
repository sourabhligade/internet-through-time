// @ts-check
/**
 * 2013 — flow-map sites + home links + dirbar trails exist.
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

const FLOW_SITES = [
  "pages/home.html",
  "pages/about.html",
  "pages/map.html",
  "sites/vine/record.html",
  "sites/vine/index.html",
  "sites/instagram/video.html",
  "sites/snapchat/story.html",
  "sites/iphone/ios7.html",
  "sites/iphone/touchid.html",
  "sites/chrome/index.html",
  "sites/snowden/index.html",
  "sites/healthcare/index.html",
  "sites/ipad/air.html",
  "sites/ps4/index.html",
  "sites/xboxone/index.html",
  "sites/whatsapp/index.html",
  "sites/playable/game.html",
  "sites/playable/loop.html",
  "sites/telegram/index.html",
  "sites/medium/index.html",
];

const HOME_HREFS = [
  "about.html",
  "map.html",
  "../sites/vine/record.html",
  "../sites/vine/index.html",
  "../sites/instagram/video.html",
  "../sites/snapchat/story.html",
  "../sites/iphone/ios7.html",
  "../sites/iphone/touchid.html",
  "../sites/chrome/index.html",
  "../sites/snowden/index.html",
  "../sites/healthcare/index.html",
  "../sites/ps4/index.html",
  "../sites/xboxone/index.html",
  "../sites/playable/game.html",
  "../sites/playable/loop.html",
  "../sites/telegram/index.html",
  "../sites/medium/index.html",
  "../sites/whatsapp/index.html",
];

test.describe("2013 flow-map + home links exist", () => {
  for (const rel of FLOW_SITES) {
    test(`flow-map ${rel}`, async ({ page }) => {
      const res = await page.goto(`/years/2013/${rel}`);
      expect(res && res.ok(), rel).toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("data-itt-year", "2013");
      await expect(page.locator("body")).not.toBeEmpty();
    });
  }

  for (const href of HOME_HREFS) {
    test(`home link ${href}`, async ({ page }) => {
      const res = await page.goto(`/years/2013/pages/${href}`);
      expect(res && res.ok(), href).toBeTruthy();
    });
  }

  test("map renders 2013 branches", async ({ page }) => {
    await page.goto("/years/2013/pages/map.html");
    const tree = page.locator("[data-itt-flow-map]");
    await expect(tree).toBeVisible();
    await expect(tree).toContainText(/Vine/i, { timeout: 10000 });
    await expect(tree).toContainText(/Stories|Snap/i);
    await expect(tree.locator("a[href*='vine']").first()).toBeVisible();
  });
});

test.describe("2013 dirbar + iframe trails", () => {
  test("iframe Vine → Stories → iOS 7", async ({ page }) => {
    await enterYear(page, "2013");
    await goInFrame(page, "sites/vine/record.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Vine|6/i);
    await goInFrame(page, "sites/snapchat/story.html");
    await expect(contentFrame(page).locator("body")).toContainText(/Story|24/i);
    await goInFrame(page, "sites/iphone/ios7.html");
    await expect(contentFrame(page).locator("body")).toContainText(/iOS 7|flat/i);
  });
});

test.describe("2013 leftover clone voice", () => {
  test("Twitter clone room is gone (lean 2013)", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/twitter/index.html");
    expect(res && res.status()).toBe(404);
    await page.goto("/years/2013/pages/home.html");
    await expect(page.locator("body")).toContainText(/This year is lean/i);
  });
});
