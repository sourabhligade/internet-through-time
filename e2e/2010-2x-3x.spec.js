// @ts-check
/**
 * 2010 leftover-2× 3× · dest-true leftover dests.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const YEAR = "2010";
const STAR = "itt10-ig-posts";
const OFFICIAL = [
  "itt10-ig-posts",
  "itt10-iphone4",
  "itt10-ipad",
  "itt10-fb-og",
  "itt10-farm",
  "itt10-imgur",
  "itt10-4sq",
  "itt10-tweets",
  "itt10-yt",
  "itt10-game-slingnest"
];

/** @type { dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[] */
const FLOWS = [
  {dest:"chatroulette",href:"/years/2010/sites/chatroulette/index.html",k1:"itt10-chatroulette-lx",k2:"itt10-chatroulette-d2",verb1:'Next leftover',verb2:'Next another',next2:'instant'},
  {dest:"instant",href:"/years/2010/sites/instant/index.html",k1:"itt10-instant",k2:"itt10-in-lx",verb1:'Type Instant leftover',verb2:'Type another',next2:'browserchoice'},
  {dest:"browserchoice",href:"/years/2010/sites/browserchoice/index.html",k1:"itt10-browserchoice",k2:"itt10-ballot",verb1:'Pick leftover',verb2:'Pick another',next2:'facetime'},
  {dest:"facetime",href:"/years/2010/sites/facetime/index.html",k1:"itt10-facetime",k2:"itt10-ft-lx",verb1:'Call leftover',verb2:'Call another',next2:'grooveshark'},
  {dest:"grooveshark",href:"/years/2010/sites/grooveshark/index.html",k1:"itt10-grooveshark-lx",k2:"itt10-grooveshark-d2",verb1:'Play leftover',verb2:'Play another',next2:'hulu'},
  {dest:"hulu",href:"/years/2010/sites/hulu/index.html",k1:"itt10-hulu-lx",k2:"itt10-hulu-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'vevo'},
  {dest:"vevo",href:"/years/2010/sites/vevo/index.html",k1:"itt10-vevo-lx",k2:"itt10-vevo-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'uber'},
  {dest:"uber",href:"/years/2010/sites/uber/index.html",k1:"itt10-uber",k2:"itt10-uber-sf",verb1:'Request leftover',verb2:'Request another',next2:'omegle'},
  {dest:"omegle",href:"/years/2010/sites/omegle/index.html",k1:"itt10-omegle-lx",k2:"itt10-omegle-d2",verb1:'Next leftover',verb2:'Next another',next2:'stumbleupon'},
  {dest:"stumbleupon",href:"/years/2010/sites/stumbleupon/index.html",k1:"itt10-stumbleupon-lx",k2:"itt10-stumbleupon-d2",verb1:'Stumble leftover',verb2:'Stumble another',next2:'home'},
  {dest:"delicious",href:"/years/2010/sites/delicious/index.html",k1:"itt10-delicious-lx",k2:"itt10-delicious-d2",verb1:'Tag leftover',verb2:'Tag another',next2:'myspace'},
  {dest:"myspace",href:"/years/2010/sites/myspace/index.html",k1:"itt10-myspace-lx",k2:"itt10-myspace-d2",verb1:'Top 8 leftover',verb2:'Comment leftover',next2:'pandora'},
  {dest:"pandora",href:"/years/2010/sites/pandora/index.html",k1:"itt10-pandora-lx",k2:"itt10-pandora-d2",verb1:'Station leftover',verb2:'Thumb leftover',next2:'newgrounds'},
  {dest:"newgrounds",href:"/years/2010/sites/newgrounds/index.html",k1:"itt10-newgrounds-lx",k2:"itt10-newgrounds-d2",verb1:'Play leftover',verb2:'Vote leftover',next2:'megavideo'},
  {dest:"megavideo",href:"/years/2010/sites/megavideo/index.html",k1:"itt10-megavideo-lx",k2:"itt10-megavideo-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'limewire'},
  {dest:"limewire",href:"/years/2010/sites/limewire/index.html",k1:"itt10-limewire-lx",k2:"itt10-limewire-d2",verb1:'Search leftover',verb2:'Search another',next2:'groupondeal'},
  {dest:"groupondeal",href:"/years/2010/sites/groupondeal/index.html",k1:"itt10-groupondeal",k2:"itt10-gp-lx",verb1:'Deal leftover',verb2:'Deal another',next2:'quorawait'},
  {dest:"quorawait",href:"/years/2010/sites/quorawait/index.html",k1:"itt10-quorawait",k2:"itt10-qu-lx",verb1:'Ask leftover',verb2:'Follow leftover',next2:'pinbeta'},
  {dest:"pinbeta",href:"/years/2010/sites/pinbeta/index.html",k1:"itt10-pinbeta",k2:"itt10-pinbeta-rlx",verb1:'Pin leftover',verb2:'Board leftover',next2:'windowsphone'},
  {dest:"windowsphone",href:"/years/2010/sites/windowsphone/index.html",k1:"itt10-windowsphone",k2:"itt10-windowspho-rlx",verb1:'Browse leftover',verb2:'Browse another',next2:'home'},
  {dest:"ask",href:"/years/2010/sites/ask/index.html",k1:"itt10-ask",k2:"itt10-trail-q",verb1:'Query leftover',verb2:'Query another',next2:'ie9'},
  {dest:"ie9",href:"/years/2010/sites/ie9/index.html",k1:"itt10-ie9",k2:"itt10-ie-lx",verb1:'Download leftover',verb2:'Tab leftover',next2:'flickrbox'},
  {dest:"flickrbox",href:"/years/2010/sites/flickrbox/index.html",k1:"itt10-flickrbox",k2:"itt10-flickrbox-rlx",verb1:'Upload leftover',verb2:'Upload another',next2:'foursqnote'},
  {dest:"foursqnote",href:"/years/2010/sites/foursqnote/index.html",k1:"itt10-foursqnote",k2:"itt10-foursqnote-rlx",verb1:'Check in leftover',verb2:'Check in another',next2:'gmailtab'},
  {dest:"gmailtab",href:"/years/2010/sites/gmailtab/index.html",k1:"itt10-gmailtab",k2:"itt10-gm-lx",verb1:'Inbox leftover',verb2:'Inbox another',next2:'path'},
  {dest:"path",href:"/years/2010/sites/path/index.html",k1:"itt10-path-lx",k2:"itt10-path-d2",verb1:'Add leftover',verb2:'Add another',next2:'getglue'},
  {dest:"getglue",href:"/years/2010/sites/getglue/index.html",k1:"itt10-getglue-lx",k2:"itt10-getglue-d2",verb1:'Check-in leftover',verb2:'Check-in another',next2:'kinect'},
  {dest:"kinect",href:"/years/2010/sites/kinect/index.html",k1:"itt10-kinect-lx",k2:"itt10-kinect-d2",verb1:'Wave leftover',verb2:'Honesty leftover',next2:'colorapp'},
  {dest:"colorapp",href:"/years/2010/sites/colorapp/index.html",k1:"itt10-colorapp-lx",k2:"itt10-colorapp-d2",verb1:'Share leftover',verb2:'Share another',next2:'wp7'},
  {dest:"wp7",href:"/years/2010/sites/wp7/index.html",k1:"itt10-wp7-lx",k2:"itt10-wp7-d2",verb1:'Browse leftover',verb2:'Browse another',next2:'home'}
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
  const suffix = key.replace(/^itt10-/, "");
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


test.describe("2010 leftover-2× 3× dest-true", () => {
  test("home strips list leftover-2× unique dests dest-disjoint from leftover-3× matrix", async ({ page }) => {
    const res = await page.goto("/years/2010/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const reserved = new Set(["instagram", "iphone", "ipad", "facebook", "farmville", "imgur", "foursquare", "twitter", "youtube", "playable", "netflix", "tumblr", "formspring", "chrome", "wave", "android", "reddit", "google", "groupon", "quora", "pinterest", "dropbox", "digg", "angrybirds", "wikileaks", "spotifyeu", "yahoo", "hulustream", "kickstarter"]);
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided leftover-3× / official").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " duplicate board").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await expect(page.locator("[data-itt-2x-unique='2010']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2010']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2010']")).toBeVisible();
    const guided = page.locator(".ott-guided ol li, #ott-guided-2010 ol li, [id^='ott-guided'] ol li");
    const n = await guided.count();
    if (n) expect(n).toBe(6);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next + complete`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt10-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt10-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
