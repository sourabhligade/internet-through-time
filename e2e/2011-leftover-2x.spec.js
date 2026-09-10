// @ts-check
/**
 * 2011 leftover 2× on first-board dests — two leftover writers.
 * Leftover complete never writes itt11-gplus.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const DESTS = [
  "aol", "apple", "ask", "bing", "color", "craigslist", "ebay", "espn", "evernote",
  "flickr", "foursquare", "gowalla", "groupon", "huffpost", "hulu", "imgur",
  "kickstarter", "livingsocial", "megaupload", "msn", "pandora", "quora", "reader",
  "tumblr", "vimeo", "yahoo", "yelp",
];

test("2011 first-board dests have leftover 2× writers", async ({ page }) => {
  for (const slug of DESTS) {
    await page.goto(`/years/2011/sites/${slug}/index.html`);
    const n = await page.locator("[data-lo-save]").count();
    expect(n, slug + " leftover 2×").toBeGreaterThanOrEqual(2);
  }
});

test("2011 leftover 2× complete never writes gold", async ({ page }) => {
  for (const slug of ["yahoo", "aol", "groupon", "flickr", "yelp"]) {
    await page.goto(`/years/2011/sites/${slug}/index.html`);
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt11-gplus");
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await revealLeftoverRails(page);
    const save = page.locator("[data-lo-save]").first();
    await expect(save).toBeVisible();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt11-gplus"))).toBeFalsy();
    const picks = page.locator("[data-lo-pick]");
    const pn = await picks.count();
    for (let i = 0; i < Math.min(pn, 2); i++) await picks.nth(i).click();
    const reqs = page.locator("[data-lo-req]");
    const rn = await reqs.count();
    for (let i = 0; i < rn; i++) await reqs.nth(i).check();
    await save.click();
    expect(await page.evaluate(() => localStorage.getItem("itt11-gplus")), slug).toBeFalsy();
  }
});
