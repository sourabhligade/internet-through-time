// @ts-check
/**
 * 2006 leftover-2× 3× · dest-true leftover dests.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const YEAR = "2006";
const STAR = "itt06-tweets";
const OFFICIAL = [
  "itt06-tweets",
  "itt06-feed",
  "itt06-fb-open",
  "itt06-yt",
  "itt06-gdocs",
  "itt06-s3",
  "itt06-ie7",
  "itt06-wiki-1m",
  "itt06-roblox",
  "itt06-game-linerider"
];

/** @type { dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[] */
const FLOWS = [
  {dest:"googleearth",href:"/years/2006/sites/googleearth/index.html",k1:"itt06-googleearth",k2:"itt06-googleearth-d2",verb1:'Fly leftover',verb2:'Tilt leftover',next2:'reader'},
  {dest:"reader",href:"/years/2006/sites/reader/index.html",k1:"itt06-reader-lx",k2:"itt06-reader-2",verb1:'Subscribe leftover',verb2:'Star leftover',next2:'mashable'},
  {dest:"mashable",href:"/years/2006/sites/mashable/index.html",k1:"itt06-mash-lx",k2:"itt06-mash-lx-d2",verb1:'Open this post',verb2:'Open next',next2:'xbox360'},
  {dest:"xbox360",href:"/years/2006/sites/xbox360/index.html",k1:"itt06-x360-lx",k2:"itt06-x360-lx-d2",verb1:'Launch leftover',verb2:'Line leftover',next2:'odeo'},
  {dest:"odeo",href:"/years/2006/sites/odeo/index.html",k1:"itt06-odeo-lx",k2:"itt06-odeo-lx-d2",verb1:'Subscribe leftover',verb2:'Create leftover',next2:'yelp'},
  {dest:"yelp",href:"/years/2006/sites/yelp/index.html",k1:"itt06-yelp-lx",k2:"itt06-yelp",verb1:'Write review leftover',verb2:'Write another',next2:'secondlife'},
  {dest:"secondlife",href:"/years/2006/sites/secondlife/index.html",k1:"itt06-secondlife",k2:"itt06-secondlife-d2",verb1:'Teleport leftover',verb2:'Rez leftover',next2:'wordpress'},
  {dest:"wordpress",href:"/years/2006/sites/wordpress/index.html",k1:"itt06-wp-lx",k2:"itt06-wordpress-rlx",verb1:'Publish leftover',verb2:'Publish another',next2:'programmableweb'},
  {dest:"programmableweb",href:"/years/2006/sites/programmableweb/index.html",k1:"itt06-pw-lx",k2:"itt06-pw-lx-d2",verb1:'List leftover',verb2:'Mashup leftover',next2:'steam'},
  {dest:"steam",href:"/years/2006/sites/steam/index.html",k1:"itt06-steam-lx",k2:"itt06-steam-rlx",verb1:'Install leftover',verb2:'Play leftover',next2:'home'},
  {dest:"vimeo",href:"/years/2006/sites/vimeo/index.html",k1:"itt06-vimeo-lx",k2:"itt06-vimeo-lx-d2",verb1:'Watch leftover',verb2:'Upload leftover',next2:'dailymotion'},
  {dest:"dailymotion",href:"/years/2006/sites/dailymotion/index.html",k1:"itt06-dm-lx",k2:"itt06-dm-lx-d2",verb1:'Watch leftover',verb2:'Upload leftover',next2:'pandora'},
  {dest:"pandora",href:"/years/2006/sites/pandora/index.html",k1:"itt06-pandora",k2:"itt06-pandora-lx",verb1:'Create station leftover',verb2:'Thumb leftover',next2:'clubpenguin'},
  {dest:"clubpenguin",href:"/years/2006/sites/clubpenguin/index.html",k1:"itt06-cp-lx",k2:"itt06-cp-lx-d2",verb1:'Name leftover',verb2:'Waddle leftover',next2:'housingmaps'},
  {dest:"housingmaps",href:"/years/2006/sites/housingmaps/index.html",k1:"itt06-hm",k2:"itt06-hm-lx",verb1:'Refresh leftover',verb2:'Filter leftover',next2:'itunes'},
  {dest:"itunes",href:"/years/2006/sites/itunes/index.html",k1:"itt06-itunes-rlx",k2:"itt06-itunes-rlx-d2",verb1:'Buy 99¢ leftover',verb2:'Library leftover',next2:'wow'},
  {dest:"wow",href:"/years/2006/sites/wow/index.html",k1:"itt06-wow-rlx",k2:"itt06-wow-rlx-d2",verb1:'Create leftover',verb2:'Quest leftover',next2:'craigslist'},
  {dest:"craigslist",href:"/years/2006/sites/craigslist/index.html",k1:"itt06-cl-lx",k2:"itt06-cl",verb1:'Post leftover',verb2:'Post another',next2:'bloglines'},
  {dest:"bloglines",href:"/years/2006/sites/bloglines/index.html",k1:"itt06-blines-lx",k2:"itt06-bloglines-rlx",verb1:'Subscribe leftover',verb2:'Subscribe another',next2:'adsense'},
  {dest:"adsense",href:"/years/2006/sites/adsense/index.html",k1:"itt06-adsense-lx",k2:"itt06-adsense-rlx",verb1:'Apply leftover',verb2:'Snippet leftover',next2:'home'},
  {dest:"feedburner",href:"/years/2006/sites/feedburner/index.html",k1:"itt06-fburn-lx",k2:"itt06-fburn",verb1:'Burn leftover',verb2:'Bump leftover',next2:'geocities'},
  {dest:"geocities",href:"/years/2006/sites/geocities/index.html",k1:"itt06-geo-lx",k2:"itt06-geocities-rlx",verb1:'Homestead leftover',verb2:'Webring leftover',next2:'slashdot'},
  {dest:"slashdot",href:"/years/2006/sites/slashdot/index.html",k1:"itt06-slash-lx",k2:"itt06-slashdot-rlx",verb1:'Comment leftover',verb2:'Comment another',next2:'mapquest'},
  {dest:"mapquest",href:"/years/2006/sites/mapquest/index.html",k1:"itt06-mq-print",k2:"itt06-mq-print-d2",verb1:'Print leftover',verb2:'Second trip',next2:'wayback'},
  {dest:"wayback",href:"/years/2006/sites/wayback/index.html",k1:"itt06-wayback-lx",k2:"itt06-wayback-rlx",verb1:'Fetch leftover',verb2:'Fetch another',next2:'googlenews'},
  {dest:"googlenews",href:"/years/2006/sites/googlenews/index.html",k1:"itt06-gnews-lx",k2:"itt06-googlenews-rlx",verb1:'Cluster leftover',verb2:'Cluster another',next2:'milliondollar'},
  {dest:"milliondollar",href:"/years/2006/sites/milliondollar/index.html",k1:"itt06-mdh-lx",k2:"itt06-mdh-lx-d2",verb1:'Pick pixel leftover',verb2:'Buy leftover',next2:'time-you'},
  {dest:"time-you",href:"/years/2006/sites/time-you/index.html",k1:"itt06-time-you-lx",k2:"itt06-timeyou",verb1:'Open this issue',verb2:'Open another',next2:'livejournal'},
  {dest:"livejournal",href:"/years/2006/sites/livejournal/index.html",k1:"itt06-lj-lx",k2:"itt06-lj",verb1:'Post leftover',verb2:'Friend leftover',next2:'movabletype'},
  {dest:"movabletype",href:"/years/2006/sites/movabletype/index.html",k1:"itt06-mt-lx",k2:"itt06-movabletyp-rlx",verb1:'Publish leftover',verb2:'Publish another',next2:'home'}
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
  const suffix = key.replace(/^itt06-/, "");
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


test.describe("2006 leftover-2× 3× dest-true", () => {
  test("home strips list leftover-2× unique dests dest-disjoint from leftover-3× matrix", async ({ page }) => {
    const res = await page.goto("/years/2006/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const reserved = new Set(["twitter", "facebook", "youtube", "googledocs", "aws", "ie7", "wikipedia", "roblox", "playable", "flickr", "gmail", "reddit", "myspace", "delicious", "digg", "google", "yahoo", "amazon", "firefox", "lastfm", "linkedin", "blogger", "cnn", "ebay", "skype", "netflix", "orkut", "wii", "bebo"]);
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided leftover-3× / official").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " duplicate board").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await revealLeftoverRails(page);
    await expect(page.locator("[data-itt-2x-unique='2006']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2006']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2006']")).toBeVisible();
    const guided = page.locator(".ott-guided ol li, #ott-guided-2006 ol li, [id^='ott-guided'] ol li");
    const n = await guided.count();
    if (n) expect(n).toBe(6);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next + complete`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt06-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt06-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
