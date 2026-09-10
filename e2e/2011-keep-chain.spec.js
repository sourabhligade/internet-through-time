// @ts-check
/**
 * Option 1 dest-minute: extra-27 KEEP leftover-3× first chain.
 * yahoo → … → huffpost → spotify. Empty/trap never write. Leftover never writes itt11-gplus.
 */
const { test, expect } = require("@playwright/test");

const CHAIN = [
  "yahoo",
  "bing",
  "msn",
  "aol",
  "ebay",
  "craigslist",
  "apple",
  "ask",
  "espn",
  "tumblr",
  "flickr",
  "yelp",
  "groupon",
  "livingsocial",
  "gowalla",
  "color",
  "reader",
  "megaupload",
  "hulu",
  "pandora",
  "foursquare",
  "quora",
  "kickstarter",
  "evernote",
  "imgur",
  "vimeo",
  "huffpost",
];

const EXIT = "spotify";
const STAR = "itt11-gplus";

function href(id) {
  return `/years/2011/sites/${id}/index.html`;
}

async function completeFirst(page, id) {
  const key = `itt11-pop-${id}`;
  const panel = page.locator(`[data-itt-lo3x][data-pop-panel]:has([data-pop-go][data-pop-id='${id}']:not([data-pop-key]))`).first();
  await expect(panel, id + " leftover-3× first").toBeVisible();
  await panel.locator('[data-pop-pick="keep"]').click();
  await panel.locator("[data-pop-req]").nth(0).check();
  await panel.locator("[data-pop-req]").nth(1).check();
  const field = panel.locator("[data-pop-field]");
  const ph = (await field.getAttribute("placeholder")) || id;
  await field.fill(ph);
  await panel.locator("[data-pop-go]").first().click();
  await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key)).toBeTruthy();
  expect(await page.evaluate((k) => localStorage.getItem(k), STAR), "gold").toBeFalsy();
  return key;
}

test.describe("2011 extra-27 KEEP leftover-3× chain", () => {
  test("empty / trap never write on yahoo (chain start)", async ({ page }) => {
    await page.goto(href("yahoo"));
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt11-"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    const panel = page.locator("[data-itt-lo3x][data-pop-panel]:has([data-pop-go][data-pop-id='yahoo']:not([data-pop-key]))").first();
    await panel.locator("[data-pop-go]").first().click();
    expect(await page.evaluate(() => localStorage.getItem("itt11-pop-yahoo"))).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
    await panel.locator('[data-pop-pick="trap"]').click();
    await panel.locator("[data-pop-req]").nth(0).check();
    await panel.locator("[data-pop-req]").nth(1).check();
    await panel.locator("[data-pop-field]").fill("Yahoo Mail");
    await panel.locator("[data-pop-go]").first().click();
    expect(await page.evaluate(() => localStorage.getItem("itt11-pop-yahoo"))).toBeFalsy();
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
  });

  test("yahoo → … → huffpost → spotify · leftover only · gold empty · Next 200", async ({ page }) => {
    await page.goto(href(CHAIN[0]));
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("itt11-"))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();

    for (let i = 0; i < CHAIN.length; i++) {
      const id = CHAIN[i];
      const wantNext = i + 1 < CHAIN.length ? CHAIN[i + 1] : EXIT;
      const res = await page.goto(href(id));
      expect(res && res.ok(), id + " HTTP").toBeTruthy();
      const key = await completeFirst(page, id);
      const next = page.locator(`[data-next-when-key="${key}"] a`).first();
      await expect(next, id + " Next").toBeVisible();
      const nh = await next.getAttribute("href");
      expect(nh || "", id + " Next dest").toContain(wantNext);
      const nres = await page.goto(new URL(nh || "", page.url()).pathname);
      expect(nres && nres.ok(), id + " → " + wantNext).toBeTruthy();
    }
    expect(page.url()).toContain("/sites/spotify/");
    expect(await page.evaluate((k) => localStorage.getItem(k), STAR)).toBeFalsy();
  });
});
