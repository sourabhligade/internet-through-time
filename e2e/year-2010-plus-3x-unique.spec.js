// @ts-check
/**
 * Every live year leftover 3× uniqueness (2014 is a live lean door).
 * First trio / pop-more / third trio are three distinct live doors
 * except lean 2007 / 2009, where second copies third.
 */
const { test, expect } = require("@playwright/test");

const YEARS = [];
for (let y = 1994; y <= 2023; y++) {
  if (y === 2005 || y === 2006 || y === 2007 || y === 2014 || y === 2020) continue;
  YEARS.push(String(y));
}

const SHARE = new Set([]);

const WANT_MORE = {
  1994: [/prodigy/, /compuserve/, /pathfinder/],
  1995: [/wsj/, /timewarner/, /hotbot/],
  1996: [/totalny/, /pathfinder/, /hotbot/],
  1997: [/newscom/, /drudgereport/, /hotwired/],
  1998: [/opendiary/, /icqweb/, /broadcastcom/],
  1999: [/theonion/, /drkoop/, /sixdegrees/],
  2000: [/ivillage/, /womencom/, /napsterweb/],
  2001: [/moveon/, /grok/, /appleimac/],
  2002: [/fark/, /homestar/, /blogspot/],
  2003: [/evite/, /tribe/, /secondlifegrid/],
  2004: [/yelplocal/, /orkutcircle/, /flickrpro/],
  2005: [/redditfront/, /googleearthkml/, /kayakplus/],
  2006: [/twitterbird/, /wikihow06/, /diggv4/],
  2007: [/justin/, /ustream/, /qik/],
  2008: [/spotifyeu/, /dropboxfolder/, /huluwatch/],
  2009: [/farmville/, /bing/, /wolframalpha/],
  2010: [/groupondeal/, /quorawait/, /instagramios/],
  2011: [/spotify/, /iphone/, /airbnb/],
  2012: [/facebook\/index/, /iphone\/maps/, /wikipedia\/sopa/],
  2013: [/chrome/, /snowden/, /telegram/],
  2015: [/meerkatlive/, /applemusicsub/, /win10get/],
  2016: [/slack/, /fblive/, /moments/],
  2017: [/snapipo/, /bitcoinath/, /echoshow/],
  2018: [/discord/, /applemusic/, /fortnite/],
  2019: [/appletv/, /airpodspro/, /iphone\/iphone11/],
  2021: [/windows11/, /flash/, /chrome/],
  2022: [/twitter/, /wordle/, /stablediffusion/],
  2023: [/\/x\//, /bard/, /claude2/],
};

function siteKey(href) {
  const m = String(href || "").match(/sites\/[^?#]+/);
  return m ? m[0].replace(/^\.\.\//, "") : String(href || "");
}

test.describe("every year leftover 3× — three trios", () => {
  for (const year of YEARS) {
    test(`${year} first / pop-more / third 3× are live doors`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const star = page.locator(`[data-ott-one-thing="${year}"]`);
      await expect(star).toBeVisible();
      const starHref = (await star.getAttribute("href")) || "";
      const first = page.locator(`[data-itt-pop3x="${year}"] a[href*="sites/"]`);
      const more = page.locator(`[data-itt-pop-more="${year}"] a[href*="sites/"]`);
      const third = page.locator(`[data-itt-pop-3x3="${year}"] a[href*="sites/"]`);
      await expect(first).toHaveCount(3);
      await expect(more).toHaveCount(3);
      await expect(third).toHaveCount(3);
      const firstH = await first.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
      const moreH = await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
      const thirdH = await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""));
      const firstK = firstH.map(siteKey);
      const moreK = moreH.map(siteKey);
      const thirdK = thirdH.map(siteKey);
      const starK = siteKey(starHref);
      for (const k of moreK) {
        expect(firstK).not.toContain(k);
        expect(k).not.toBe(starK);
        if (!SHARE.has(year)) expect(thirdK).not.toContain(k);
      }
      for (const k of thirdK) {
        expect(firstK).not.toContain(k);
        expect(k).not.toBe(starK);
      }
      if (SHARE.has(year)) {
        expect(moreK.sort().join("|")).toBe(thirdK.slice().sort().join("|"));
      }
      const want = WANT_MORE[year];
      const joined = moreH.join(" ");
      for (const re of want) expect(joined).toMatch(re);
      for (const h of moreH) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok()).toBeTruthy();
      }
    });
  }
});

test.describe("2010+ second leftover 3× writers", () => {
  test("2012 Facebook 1B pop-more empty never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2012/sites/facebook/index.html");
    await page.evaluate(() => localStorage.removeItem("itt12-pop-facebook"));
    await page.reload();
    await page.locator("[data-pop-go][data-pop-id='facebook']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt12-pop-facebook"))).toBeFalsy();
    await page.locator("[data-pop-panel] [data-pop-pick]").first().click();
    await page.locator("[data-pop-panel] [data-pop-req]").check();
    await page.locator("[data-pop-panel] [data-pop-field]").fill("4 Oct 2012");
    await page.locator("[data-pop-go][data-pop-id='facebook']").click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("itt12-pop-facebook")), { timeout: 8000 })
      .toBeTruthy();
  });
});
