// @ts-check
/**
 * Every live year leftover 3× uniqueness (2014 is a live lean door).
 * First trio / pop-more / third trio are three distinct live doors
 * except lean 2007 / 2009, where second copies third.
 */
const { test, expect } = require("@playwright/test");


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
const NO_SECOND = new Set(["2013", "2018", "2020"]);

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
      const firstStrip = page.locator(`[data-itt-pop3x="${year}"]`).first();
      const moreStrip = page.locator(`[data-itt-pop-more="${year}"]`).first();
      const thirdStrip = page.locator(`[data-itt-pop-3x3="${year}"]`).first();
      const first = firstStrip.locator('a[href*="sites/"]');
      const more = moreStrip.locator('a[href*="sites/"]');
      const third = thirdStrip.locator('a[href*="sites/"]');
      const want9 = [
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
        "2004",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2015",
        "2017",
        "2019",
      ].includes(year);
      const want6 = ["2001", "2002"].includes(year);
      const firstN = year === "2011" ? 18 : want9 ? 9 : year === "2016" || year === "2014" ? 6 : want6 || year === "2003" ? 6 : 3;
      const moreN = NO_SECOND.has(year)
        ? 0
        : year === "2011"
          ? 18
          : want9
            ? 9
            : year === "2016" || year === "2014"
              ? 3
              : want6
                ? 6
                : year === "2003"
                  ? 5
                  : 3;
      const thirdN = year === "2011" ? 18 : want9 ? 9 : year === "2016" || year === "2014" ? 9 : want6 || year === "2003" ? 6 : 3;
      await expect(first).toHaveCount(firstN);
      if (NO_SECOND.has(year)) {
        await expect(moreStrip).toHaveCount(0);
      } else {
        await expect(more).toHaveCount(moreN);
      }
      await expect(third).toHaveCount(thirdN);
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
      if (want) {
        for (const re of want) expect(joined).toMatch(re);
      }
      for (const h of moreH) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok()).toBeTruthy();
      }
    });
  }
});

test.describe("2010+ second leftover 3× writers", () => {
  test("2010 Instant pop-more empty never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2010/sites/instant/index.html");
    await page.evaluate(() => localStorage.removeItem("itt10-pop-instant"));
    await page.reload();
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
