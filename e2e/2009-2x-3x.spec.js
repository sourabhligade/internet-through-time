// @ts-check
/**
 * 2009 leftover-2× 3× · dest-true leftover dests.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
test.skip(true, "2009 boarded — dest packs are not a visitor door");

const YEAR = "2009";
const STAR = "itt09-like";
const OFFICIAL = [
  "itt09-like",
  "itt09-farm",
  "itt09-bing",
  "itt09-iphone",
  "itt09-apps",
  "itt09-tweets",
  "itt09-4sq",
  "itt09-kickstarter",
  "itt09-win7",
  "itt09-game-plot"
];

/** @type { dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[] */
const FLOWS = [
  {dest:"wolfram",href:"/years/2009/sites/wolfram/index.html",k1:"itt09-wolfram",k2:"itt09-wolfram-d2",verb1:'Query leftover',verb2:'Query another',next2:'gvoice'},
  {dest:"gvoice",href:"/years/2009/sites/gvoice/index.html",k1:"itt09-gvoice",k2:"itt09-gvoice-d2",verb1:'Number leftover',verb2:'SMS leftover',next2:'palmpre'},
  {dest:"palmpre",href:"/years/2009/sites/palmpre/index.html",k1:"itt09-pre",k2:"itt09-pre-d2",verb1:'WebOS leftover',verb2:'Synergy leftover',next2:'angry'},
  {dest:"angry",href:"/years/2009/sites/angry/index.html",k1:"itt09-angry",k2:"itt09-angry-d2",verb1:'Sling leftover',verb2:'Sling another',next2:'bitcoin'},
  {dest:"bitcoin",href:"/years/2009/sites/bitcoin/index.html",k1:"itt09-btc",k2:"itt09-btc-d2",verb1:'Genesis leftover',verb2:'Honesty leftover',next2:'ubercab'},
  {dest:"ubercab",href:"/years/2009/sites/ubercab/index.html",k1:"itt09-uber",k2:"itt09-uber-d2",verb1:'Request leftover',verb2:'Request another',next2:'whatsapp'},
  {dest:"whatsapp",href:"/years/2009/sites/whatsapp/index.html",k1:"itt09-wa",k2:"itt09-wa-d2",verb1:'Chat leftover',verb2:'Chat another',next2:'roblox'},
  {dest:"roblox",href:"/years/2009/sites/roblox/index.html",k1:"itt09-c30",k2:"itt09-c30-d2",verb1:'Play leftover',verb2:'Play another',next2:'safari'},
  {dest:"safari",href:"/years/2009/sites/safari/index.html",k1:"itt09-c36",k2:"itt09-c36-d2",verb1:'Browse leftover',verb2:'Browse another',next2:'wiki'},
  {dest:"wiki",href:"/years/2009/sites/wiki/edit.html",k1:"itt09-c2",k2:"itt09-c2-d2",verb1:'Edit leftover',verb2:'Edit another',next2:'home'},
  {dest:"amz",href:"/years/2009/sites/amz/index.html",k1:"itt09-c3",k2:"itt09-c3-d2",verb1:'Buy leftover',verb2:'Cart leftover',next2:'nfx'},
  {dest:"nfx",href:"/years/2009/sites/nfx/c.html",k1:"itt09-c5",k2:"itt09-c5-d2",verb1:'Queue leftover',verb2:'Queue another',next2:'pp'},
  {dest:"pp",href:"/years/2009/sites/pp/index.html",k1:"itt09-c13",k2:"itt09-c13-d2",verb1:'Send leftover',verb2:'Send another',next2:'ps'},
  {dest:"ps",href:"/years/2009/sites/ps/index.html",k1:"itt09-c25",k2:"itt09-c25-d2",verb1:'Launch leftover',verb2:'Launch another',next2:'xbox'},
  {dest:"xbox",href:"/years/2009/sites/xbox/index.html",k1:"itt09-c26",k2:"itt09-c26-d2",verb1:'Launch leftover',verb2:'Launch another',next2:'li'},
  {dest:"li",href:"/years/2009/sites/li/index.html",k1:"itt09-c21",k2:"itt09-c21-d2",verb1:'Invite leftover',verb2:'Invite another',next2:'ie8'},
  {dest:"ie8",href:"/years/2009/sites/ie8/index.html",k1:"itt09-ie8",k2:"itt09-ie8-d2",verb1:'Download leftover',verb2:'Tab leftover',next2:'spotify'},
  {dest:"spotify",href:"/years/2009/sites/spotify/index.html",k1:"itt09-c6",k2:"itt09-c6-d2",verb1:'Play leftover',verb2:'Playlist leftover',next2:'gowalla'},
  {dest:"gowalla",href:"/years/2009/sites/gowalla/index.html",k1:"itt09-gowalla-lx",k2:"itt09-gowalla-d2",verb1:'Check in leftover',verb2:'Check in another',next2:'nintendo'},
  {dest:"nintendo",href:"/years/2009/sites/nintendo/index.html",k1:"itt09-c27",k2:"itt09-c27-d2",verb1:'Play leftover',verb2:'Play another',next2:'home'},
  {dest:"wordpress",href:"/years/2009/sites/wordpress/index.html",k1:"itt09-wordpress-lx",k2:"itt09-wordpress-d2",verb1:'Publish leftover',verb2:'Publish another',next2:'ff'},
  {dest:"ff",href:"/years/2009/sites/ff/index.html",k1:"itt09-c37",k2:"itt09-c37-d2",verb1:'Firefox leftover',verb2:'Tab leftover',next2:'stumbleupon'},
  {dest:"stumbleupon",href:"/years/2009/sites/stumbleupon/index.html",k1:"itt09-stumbleupon-lx",k2:"itt09-stumbleupon-d2",verb1:'Stumble leftover',verb2:'Stumble another',next2:'mint'},
  {dest:"mint",href:"/years/2009/sites/mint/index.html",k1:"itt09-mint-lx",k2:"itt09-mint-d2",verb1:'Connect leftover',verb2:'Budget leftover',next2:'etsy'},
  {dest:"etsy",href:"/years/2009/sites/etsy/index.html",k1:"itt09-etsy-lx",k2:"itt09-etsy-d2",verb1:'Favorite leftover',verb2:'Favorite another',next2:'opentable'},
  {dest:"opentable",href:"/years/2009/sites/opentable/index.html",k1:"itt09-opentable-lx",k2:"itt09-opentable-d2",verb1:'Book leftover',verb2:'Book another',next2:'kiva'},
  {dest:"kiva",href:"/years/2009/sites/kiva/index.html",k1:"itt09-kiva-lx",k2:"itt09-kiva-d2",verb1:'Lend leftover',verb2:'Lend another',next2:'couchsurfing'},
  {dest:"couchsurfing",href:"/years/2009/sites/couchsurfing/index.html",k1:"itt09-couchsurfing-lx",k2:"itt09-couchsurfing-d2",verb1:'Request leftover',verb2:'Request another',next2:'hootsuite'},
  {dest:"hootsuite",href:"/years/2009/sites/hootsuite/index.html",k1:"itt09-hootsuite-lx",k2:"itt09-hootsuite-d2",verb1:'Queue leftover',verb2:'Queue another',next2:'typekit'},
  {dest:"typekit",href:"/years/2009/sites/typekit/index.html",k1:"itt09-typekit-lx",k2:"itt09-typekit-d2",verb1:'Apply leftover',verb2:'Apply another',next2:'home'}
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
  const suffix = key.replace(/^itt09-/, "");
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


test.describe("2009 leftover-2× 3× dest-true", () => {
  test("home strips list leftover-2× unique dests dest-disjoint from leftover-3× matrix", async ({ page }) => {
    const res = await page.goto("/years/2009/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const reserved = new Set(["facebook", "farmville", "bing", "iphone", "appstore", "twitter", "foursquare", "kickstarter", "windows7", "playable", "omegle", "chatroulette", "wikipedia", "android", "kindle", "reddit", "youtube", "myspace", "wave", "chrome", "gmail", "google", "hulu", "maps", "netflix", "steam", "github", "friendfeed", "minecraft"]);
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided leftover-3× / official").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " duplicate board").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await expect(page.locator("[data-itt-2x-unique='2009']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2009']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2009']")).toBeVisible();
    const guided = page.locator(".ott-guided ol li, #ott-guided-2009 ol li, [id^='ott-guided'] ol li");
    const n = await guided.count();
    if (n) expect(n).toBe(6);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next + complete`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt09-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt09-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
