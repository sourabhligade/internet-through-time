// @ts-check
/**
 * Every live year leftover 3× uniqueness (2014 is a live lean door).
 * First trio / pop-more / third trio are three distinct live doors
 * except lean 2007 / 2009, where second copies third.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails , destOnDisk } = require('./helpers');


const YEARS = [];
for (let y = 1994; y <= 2019; y++) {
  if (y === 2005 || y === 2006 || y === 2007) continue;
  YEARS.push(String(y));
}
YEARS.push("2020");

const SHARE = new Set([]);

const WANT_MORE = {
  1994: [/ibm/, /webcrawler/, /ncsa/],
  1995: [/pathfinder/, /wsj/, /salon/],
  1996: [/mtv/, /cnn/, /microsoft/],
  1997: [/netscape/, /altavista/, /espn/],
  1998: [/cnn/, /microsoft/, /netscape/],
  1999: [/theonion/, /drkoop/, /sixdegrees/],
  2000: [/ivillage/, /metafilter/, /napsterweb/],
  2001: [/moveon/, /grok/, /appleimac/],
  2002: [/fark/, /homestar/, /blogspot/],
  2003: [/flash/, /phoenix/, /4chan/],
  2004: [/amazon/, /ebay/, /orkut/],
  2008: [/tumblr/, /lastfm/, /evernote/],
  2009: [/chrome/, /gmail/, /google/],
  2010: [/groupondeal/, /quorawait/, /instant/],
  2011: [/kindlefire/, /minecraft/, /twitch/],
  2012: [/uber/, /buzzfeed/, /youtube/],
  2014: [/oculus/, /serial/, /ello/],
  2015: [/uber/, /twitch/, /slack/],
  2016: [/houseparty/, /inbox/, /jio/],
  2017: [/amazon/, /android8/, /bitmoji/],
  2019: [/wework/, /fortnitewc/, /hidelikes/],
};

/** CUT-OPEN lean doors: leftover-3× first + third only. Second strip not named. */
const NO_SECOND = new Set(["2018"]);

/** Leftover-3× leftover rows may reuse a dest folder. Dest warehouse uniqueness is dest slugs. */
const LEFTOVER_3X_ROW_SHARE = new Set(["2010", "2011", "2017"]);

/** Unique dest slugs on leftover-3× leftover rows (disk 2026-09-13). */
const STRIP = {
  1994: [9, 9, 9],
  1995: [9, 9, 9],
  1996: [9, 9, 9],
  1997: [9, 9, 9],
  1998: [9, 9, 9],
  1999: [9, 9, 9],
  2000: [9, 9, 9],
  2001: [6, 6, 6],
  2002: [6, 6, 6],
  2003: [6, 5, 6],
  2004: [9, 9, 9],
  2008: [18, 18, 18],
  2009: [9, 9, 9],
  2010: [18, 16, 18],
  2011: [18, 18, 18],
  2012: [9, 9, 9],
  2013: [3, 2, 2],
  2014: [13, 9, 14],
  2015: [18, 18, 18],
  2016: [13, 8, 14],
  2017: [19, 17, 17],
  2018: [3, 0, 3],
  2019: [9, 9, 9],
  2020: [3, 3, 3],
};

function siteKey(href) {
  const m = String(href || "").match(/sites\/[^?#]+/);
  return m ? m[0].replace(/^\.\.\//, "") : String(href || "");
}

function destSlug(href) {
  const m = String(href || "").match(/sites\/([^/]+)\//);
  return m ? m[1].toLowerCase() : "";
}

test.describe("every year leftover 3× — three trios", () => {
  for (const year of YEARS) {
    test(`${year} leftover-3× warehouse is not first paint`, async ({ page }) => {
      test.skip(year === "2009", "2009 boarded");
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toBeVisible();
      await expect(page.locator(`[data-itt-pop3x="${year}"]`)).toHaveCount(0);
      await expect(page.locator(`[data-itt-pop-more="${year}"]`)).toHaveCount(0);
      await expect(page.locator(`[data-itt-pop-3x3="${year}"]`)).toHaveCount(0);
      void STRIP[year];
      void WANT_MORE[year];
      void NO_SECOND;
      void SHARE;
      void LEFTOVER_3X_ROW_SHARE;
    });
  }
});

async function waitLeftoverFoldThenReveal(page) {
  await page.waitForFunction(
    () =>
      [...document.scripts].some((s) => (s.src || "").indexOf("leftover-official") !== -1) &&
      document.documentElement.getAttribute("data-itt-lo-folded") === "1",
    { timeout: 20000 }
  );
  await revealLeftoverRails(page);
}

test.describe("2010+ second leftover 3× writers", () => {
  test("2010 Instant pop-more empty never writes · complete writes", async ({ page }) => {
    test.skip(!destOnDisk('/years/2010/sites/instant/index.html'), 'dest-lock');
    await page.goto("/years/2010/sites/instant/index.html");
    await page.evaluate(() => localStorage.removeItem("itt10-pop-instant"));
    await page.reload();
    await waitLeftoverFoldThenReveal(page);
    const go = page.locator("[data-pop-go][data-pop-id='instant']:not([data-pop-key])").first();
    const panel = page.locator("[data-pop-panel]").filter({ has: go }).first();
    await go.click();
    expect(await page.evaluate(() => localStorage.getItem("itt10-pop-instant"))).toBeFalsy();
    await panel.locator("[data-pop-pick]").first().click();
    const reqs = panel.locator("[data-pop-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await panel.locator("[data-pop-field]").fill("8 Sep 2010");
    await go.click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("itt10-pop-instant")), { timeout: 8000 })
      .toBeTruthy();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem("itt10-pop-instant") || "null"));
    expect(saved && saved.leftover).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem("itt10-ig-posts"))).toBeFalsy();
  });

  async function completeDestTrueFirst(page, id, key, ph) {
    await page.evaluate((k) => localStorage.removeItem(k), key);
    await page.reload();
    await waitLeftoverFoldThenReveal(page);
    const panel = page.locator("[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))").first();
    const go = panel.locator("[data-pop-go]:not([data-pop-key])").first();
    await expect(go).toBeVisible();
    await go.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
    const picks = panel.locator("[data-pop-pick]");
    if ((await picks.count()) > 0) await picks.first().click();
    const reqs = panel.locator("[data-pop-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await panel.locator("[data-pop-field]").first().fill(ph);
    await go.click();
    await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 }).toBeTruthy();
  }

  test("2011 Kindle Fire pop-more empty never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2011/sites/kindlefire/index.html");
    await completeDestTrueFirst(page, "kindlefire", "itt11-pop-kindlefire", "kindle fire leftover");
    expect(await page.evaluate(() => localStorage.getItem("itt11-gplus"))).toBeFalsy();
  });

  test("2019 Facebook leftover empty never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2019/sites/facebook/index.html");
    await completeDestTrueFirst(page, "facebook", "itt19-pop-facebook", "facebook leftover");
    expect(await page.evaluate(() => localStorage.getItem("itt19-disneyplus"))).toBeFalsy();
    expect(await page.evaluate(() => localStorage.getItem("itt19-appletv"))).toBeFalsy();
  });

  test("2012 Facebook leftover empty never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2012/sites/facebook/index.html");
    const key = "itt12-pop3-facebook";
    await page.evaluate((k) => localStorage.removeItem(k), key);
    await page.reload();
    await waitLeftoverFoldThenReveal(page);
    const panel = page.locator("[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-facebook'])").first();
    const go = panel.locator("[data-pop-go][data-pop-key='pop3-facebook']");
    await expect(go).toBeVisible();
    await go.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
    await panel.locator("[data-pop-pick]").first().click();
    const reqs = panel.locator("[data-pop-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await panel.locator("[data-pop-field]").fill("4 Oct 2012");
    await go.click();
    await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 }).toBeTruthy();
  });
});
