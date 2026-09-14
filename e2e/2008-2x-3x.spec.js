// @ts-check
/**
 * 2008 leftover-2× 3× · dest-true leftover dests.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const YEAR = "2008";
const STAR = "itt08-github";
const OFFICIAL = [
  "itt08-github",
  "itt08-apps",
  "itt08-chrome",
  "itt08-android",
  "itt08-hulu",
  "itt08-facebook",
  "itt08-tweets",
  "itt08-yt",
  "itt08-dropbox",
  "itt08-iphone3g"
];

/** @type { dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[] */
const FLOWS = [
  {dest:"spotifyeu",href:"/years/2008/sites/spotifyeu/index.html",k1:"itt08-spotifyeu-rlx",k2:"itt08-spotifyeu-rlx-d2",verb1:'Play leftover',verb2:'Playlist leftover',next2:'tweetdeck'},
  {dest:"tweetdeck",href:"/years/2008/sites/tweetdeck/index.html",k1:"itt08-tdeck-dp",k2:"itt08-tdeck-dp-d2",verb1:'Column leftover',verb2:'Column another',next2:'failwhale'},
  {dest:"failwhale",href:"/years/2008/sites/failwhale/index.html",k1:"itt08-whale-dp",k2:"itt08-whale-dp-d2",verb1:'See leftover',verb2:'Refresh leftover',next2:'heroku'},
  {dest:"heroku",href:"/years/2008/sites/heroku/index.html",k1:"itt08-heroku-dp",k2:"itt08-heroku-dp-d2",verb1:'Push leftover',verb2:'Push another',next2:'mint'},
  {dest:"mint",href:"/years/2008/sites/mint/index.html",k1:"itt08-mint-dp",k2:"itt08-mint-dp-d2",verb1:'Connect leftover',verb2:'Budget leftover',next2:'tripadvisor'},
  {dest:"tripadvisor",href:"/years/2008/sites/tripadvisor/index.html",k1:"itt08-ta-dp",k2:"itt08-ta-dp-d2",verb1:'Review leftover',verb2:'Review another',next2:'wikileaks'},
  {dest:"wikileaks",href:"/years/2008/sites/wikileaks/index.html",k1:"itt08-wl-dp",k2:"itt08-wl-dp-d2",verb1:'Open this leak',verb2:'Open another',next2:'identica'},
  {dest:"identica",href:"/years/2008/sites/identica/index.html",k1:"itt08-identica-dp",k2:"itt08-identica-dp-d2",verb1:'Update leftover',verb2:'Update another',next2:'cuil'},
  {dest:"cuil",href:"/years/2008/sites/cuil/index.html",k1:"itt08-cuil-dp",k2:"itt08-cuil-dp-d2",verb1:'Search leftover',verb2:'Query leftover',next2:'gtaiv'},
  {dest:"gtaiv",href:"/years/2008/sites/gtaiv/index.html",k1:"itt08-gtaiv-dp",k2:"itt08-gtaiv-dp-d2",verb1:'Load leftover',verb2:'Play leftover',next2:'home'},
  {dest:"ning",href:"/years/2008/sites/ning/index.html",k1:"itt08-ning-dp",k2:"itt08-ning-dp-d2",verb1:'Create leftover',verb2:'Create another',next2:'plurk'},
  {dest:"plurk",href:"/years/2008/sites/plurk/index.html",k1:"itt08-plurk-dp",k2:"itt08-plurk-dp-d2",verb1:'Plurk leftover',verb2:'Plurk another',next2:'seesmic'},
  {dest:"seesmic",href:"/years/2008/sites/seesmic/index.html",k1:"itt08-see-dp",k2:"itt08-see-dp-d2",verb1:'Post leftover',verb2:'Post another',next2:'scribd'},
  {dest:"scribd",href:"/years/2008/sites/scribd/index.html",k1:"itt08-scribd-dp",k2:"itt08-scribd-dp-d2",verb1:'Read leftover',verb2:'Read another',next2:'recaptcha'},
  {dest:"recaptcha",href:"/years/2008/sites/recaptcha/index.html",k1:"itt08-recap-dp",k2:"itt08-recap-dp-d2",verb1:'Solve leftover',verb2:'Solve another',next2:'kongregate'},
  {dest:"kongregate",href:"/years/2008/sites/kongregate/index.html",k1:"itt08-kong-dp",k2:"itt08-kong-dp-d2",verb1:'Play leftover',verb2:'Play another',next2:'miniclip'},
  {dest:"miniclip",href:"/years/2008/sites/miniclip/index.html",k1:"itt08-mini-dp",k2:"itt08-mini-dp-d2",verb1:'Play leftover',verb2:'Play another',next2:'newgrounds'},
  {dest:"newgrounds",href:"/years/2008/sites/newgrounds/index.html",k1:"itt08-ng-dp",k2:"itt08-ng-dp-d2",verb1:'Play leftover',verb2:'Vote leftover',next2:'piratebay'},
  {dest:"piratebay",href:"/years/2008/sites/piratebay/index.html",k1:"itt08-tpb-dp",k2:"itt08-tpb-dp-d2",verb1:'Search leftover',verb2:'Search another',next2:'collegehumor'},
  {dest:"collegehumor",href:"/years/2008/sites/collegehumor/index.html",k1:"itt08-ch-dp",k2:"itt08-ch-dp-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'home'},
  {dest:"huffpo",href:"/years/2008/sites/huffpo/index.html",k1:"itt08-huff-dp",k2:"itt08-huff-dp-d2",verb1:'Open this post',verb2:'Open another',next2:'ars'},
  {dest:"ars",href:"/years/2008/sites/ars/index.html",k1:"itt08-ars-dp",k2:"itt08-ars-dp-d2",verb1:'Open this post',verb2:'Open another',next2:'engadget'},
  {dest:"engadget",href:"/years/2008/sites/engadget/index.html",k1:"itt08-eng-dp",k2:"itt08-eng-dp-d2",verb1:'Open this post',verb2:'Open another',next2:'groupon'},
  {dest:"groupon",href:"/years/2008/sites/groupon/index.html",k1:"itt08-groupon-lx",k2:"itt08-gp-lx",verb1:'Deal leftover',verb2:'Deal another',next2:'mafiawars'},
  {dest:"mafiawars",href:"/years/2008/sites/mafiawars/index.html",k1:"itt08-mafia-dp",k2:"itt08-mafia-dp-d2",verb1:'Job leftover',verb2:'Job another',next2:'html5'},
  {dest:"html5",href:"/years/2008/sites/html5/index.html",k1:"itt08-html5-dp",k2:"itt08-html5-dp-d2",verb1:'Demo leftover',verb2:'Demo another',next2:'mobileme'},
  {dest:"mobileme",href:"/years/2008/sites/mobileme/index.html",k1:"itt08-mme-dp",k2:"itt08-mme-dp-d2",verb1:'Sync leftover',verb2:'Sync another',next2:'ie8'},
  {dest:"ie8",href:"/years/2008/sites/ie8/index.html",k1:"itt08-ie8-dp",k2:"itt08-ie8-dp-d2",verb1:'Download leftover',verb2:'Tab leftover',next2:'failblog'},
  {dest:"failblog",href:"/years/2008/sites/failblog/index.html",k1:"itt08-fail-dp",k2:"itt08-fail-dp-d2",verb1:'Open this post',verb2:'Open another',next2:'yelp'},
  {dest:"yelp",href:"/years/2008/sites/yelp/index.html",k1:"itt08-yelp-dp",k2:"itt08-yelp-dp-d2",verb1:'Review leftover',verb2:'Review another',next2:'home'}
];

function destsFrom(html, attr) {
  const re = new RegExp(attr + '="' + YEAR + '"[\\s\\S]{0,12000}?</p>', "i");
  const block = html.match(re);
  if (!block) return [];
  const ids = [];
  const hrefRe = /sites\/([^/]+)\//g;
  let m;
  while ((m = hrefRe.exec(block[0]))) {
    if (!ids.includes(m[1])) ids.push(m[1]);
  }
  return ids;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLo(page, href, key) {
  const suffix = key.replace(/^itt08-/, "");
  await page.goto(href);
  await page.evaluate((ks) => {
    ks.forEach((k) => localStorage.removeItem(k));
  }, [key, STAR].concat(OFFICIAL));
  await page.reload();
  await revealLeftoverRails(page);
  const lo = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 15000 });
  await lo.locator("[data-lo-trap]").first().click({ force: true });
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, key), key + " ticks only").toBeFalsy();
  await lo.locator('[data-lo-pick="keep"]').click({ force: true });
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, key), key + " empty field").toBeFalsy();
  await lo.locator("[data-lo-field]").fill("museum leftover");
  await lo.locator("[data-lo-save]").click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key + " real").toBe(true);
  expect(blob.leftover, key + " leftover").toBe(true);
  expect(String(blob.year), key + " year").toBe(YEAR);
  expect(await getKey(page, STAR), key + " wrote star").toBeFalsy();
  for (const off of OFFICIAL) {
    if (off === key) continue;
    expect(await getKey(page, off), key + " wrote " + off).toBeFalsy();
  }
}


test.describe("2008 leftover-2× 3× dest-true", () => {
  test("home strips list leftover-2× unique dests dest-disjoint from leftover-3× matrix", async ({ page }) => {
    const res = await page.goto("/years/2008/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const reserved = new Set(["github", "appstore", "chrome", "android", "hulu", "facebook", "twitter", "youtube", "dropbox", "iphone", "stackoverflow", "posterous", "grooveshark", "wikipedia", "gmail", "reddit", "flickr", "myspace", "netflix", "tumblr", "lastfm", "evernote", "friendfeed", "bitly", "etsy", "duckduckgo", "xkcd", "stumbleupon"]);
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided leftover-3× / official").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " duplicate board").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await revealLeftoverRails(page);
    await expect(page.locator("[data-itt-2x-unique='2008']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2008']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2008']")).toBeVisible();
    const guided = page.locator(".ott-guided ol li, #ott-guided-2008 ol li, [id^='ott-guided'] ol li");
    const n = await guided.count();
    if (n) expect(n).toBe(6);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next + complete`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt08-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt08-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
