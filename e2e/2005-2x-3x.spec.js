// @ts-check
/**
 * 2005 leftover-2× 3× · dest-true leftover dests.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const YEAR = "2005";
const STAR = "itt05-yt-uploads";
const OFFICIAL = [
  "itt05-yt-uploads",
  "itt05-maps",
  "itt05-pandora",
  "itt05-hm",
  "itt05-digg",
  "itt05-reddit",
  "itt05-flickr",
  "itt05-pod",
  "itt05-tc",
  "itt05-game-heli"
];

/** @type { dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[] */
const FLOWS = [
  {dest:"lastfm",href:"/years/2005/sites/lastfm/index.html",k1:"itt05-lastfm-lx",k2:"itt05-lastfm-rlx",verb1:'Scrobble',verb2:'Join',next2:'googleearth'},
  {dest:"googleearth",href:"/years/2005/sites/googleearth/index.html",k1:"itt05-googleearth",k2:"itt05-googleearth-d2",verb1:'Fly',verb2:'Tilt',next2:'reader'},
  {dest:"reader",href:"/years/2005/sites/reader/index.html",k1:"itt05-reader-lx",k2:"itt05-reader-lx-d2",verb1:'Subscribe feed',verb2:'Star',next2:'yelp'},
  {dest:"yelp",href:"/years/2005/sites/yelp/index.html",k1:"itt05-yelp-lx",k2:"itt05-yelp",verb1:'Write review',verb2:'Write another',next2:'odeo'},
  {dest:"odeo",href:"/years/2005/sites/odeo/index.html",k1:"itt05-odeo-lx",k2:"itt05-odeo-lx-d2",verb1:'Subscribe',verb2:'Create',next2:'secondlife'},
  {dest:"mashable",href:"/years/2005/sites/mashable/index.html",k1:"itt05-mash-lx",k2:"itt05-mash-lx-d2",verb1:'Open this post',verb2:'Open next post',next2:'xbox360'},
  {dest:"xbox360",href:"/years/2005/sites/xbox360/index.html",k1:"itt05-x360-lx",k2:"itt05-x360-lx-d2",verb1:'Launch-day leftover',verb2:'Line leftover',next2:'programmableweb'},
  {dest:"programmableweb",href:"/years/2005/sites/programmableweb/index.html",k1:"itt05-pw-lx",k2:"itt05-pw-lx-d2",verb1:'List an API',verb2:'Open a mashup',next2:'linkedin'},
  {dest:"linkedin",href:"/years/2005/sites/linkedin/index.html",k1:"itt05-li-lx",k2:"itt05-linkedin-rlx",verb1:'Open profile',verb2:'Send invite',next2:'invite'},
  {dest:"wordpress",href:"/years/2005/sites/wordpress/index.html",k1:"itt05-wp-lx",k2:"itt05-wordpress-rlx",verb1:'Publish',verb2:'Publish another',next2:'livejournal'},
  {dest:"livejournal",href:"/years/2005/sites/livejournal/index.html",k1:"itt05-lj-lx",k2:"itt05-lj",verb1:'Title then Post',verb2:'Friend leftover',next2:'orkut'},
  {dest:"orkut",href:"/years/2005/sites/orkut/index.html",k1:"itt05-ork-lx",k2:"itt05-orkut",verb1:'Add / scrap',verb2:'Add another',next2:'technorati'},
  {dest:"technorati",href:"/years/2005/sites/technorati/index.html",k1:"itt05-techno-lx",k2:"itt05-technorati-rlx",verb1:'Open cosmos',verb2:'Search another URL',next2:'netflix'},
  {dest:"netflix",href:"/years/2005/sites/netflix/index.html",k1:"itt05-nflix-dvd",k2:"itt05-netflix-rlx",verb1:'Queue a DVD',verb2:'Queue another',next2:'mapquest'},
  {dest:"mapquest",href:"/years/2005/sites/mapquest/index.html",k1:"itt05-mq-print",k2:"itt05-mq-print-d2",verb1:'Print directions',verb2:'Second trip',next2:'wayback'},
  {dest:"wayback",href:"/years/2005/sites/wayback/index.html",k1:"itt05-wayback-lx",k2:"itt05-wayback-rlx",verb1:'Fetch a date',verb2:'Fetch another',next2:'geocities'},
  {dest:"geocities",href:"/years/2005/sites/geocities/index.html",k1:"itt05-geo-lx",k2:"itt05-geocities-rlx",verb1:'Claim homestead',verb2:'Webring leftover',next2:'slashdot'},
  {dest:"slashdot",href:"/years/2005/sites/slashdot/index.html",k1:"itt05-slash-lx",k2:"itt05-slashdot-rlx",verb1:'Comment',verb2:'Comment another',next2:'movabletype'},
  {dest:"movabletype",href:"/years/2005/sites/movabletype/index.html",k1:"itt05-mt-lx",k2:"itt05-movabletyp-rlx",verb1:'Publish',verb2:'Publish another',next2:'home'},
  {dest:"googlenews",href:"/years/2005/sites/googlenews/index.html",k1:"itt05-gnews-lx",k2:"itt05-googlenews-rlx",verb1:'Open a cluster',verb2:'Open another',next2:'metafilter'},
  {dest:"metafilter",href:"/years/2005/sites/metafilter/index.html",k1:"itt05-mefi-lx",k2:"itt05-metafilter-rlx",verb1:'Open this post',verb2:'Open next',next2:'memeorandum'},
  {dest:"memeorandum",href:"/years/2005/sites/memeorandum/index.html",k1:"itt05-memo-lx",k2:"itt05-memo-lx-d2",verb1:'Open this post',verb2:'Open next',next2:'tinypic'},
  {dest:"tinypic",href:"/years/2005/sites/tinypic/index.html",k1:"itt05-tp-lx",k2:"itt05-tp-lx-d2",verb1:'Upload',verb2:'Get URL',next2:'tagged'},
  {dest:"tagged",href:"/years/2005/sites/tagged/index.html",k1:"itt05-tg-lx",k2:"itt05-tagged",verb1:'Add',verb2:'Add another',next2:'piczo'},
  {dest:"piczo",href:"/years/2005/sites/piczo/index.html",k1:"itt05-pz-lx",k2:"itt05-piczo",verb1:'Homestead',verb2:'Homestead another',next2:'steam'},
  {dest:"steam",href:"/years/2005/sites/steam/index.html",k1:"itt05-steam-lx",k2:"itt05-steam-rlx",verb1:'Launch leftover',verb2:'Library leftover',next2:'wow'},
  {dest:"wow",href:"/years/2005/sites/wow/index.html",k1:"itt05-wow-rlx",k2:"itt05-wow-rlx-d2",verb1:'Create leftover',verb2:'Quest leftover',next2:'paypal'},
  {dest:"paypal",href:"/years/2005/sites/paypal/index.html",k1:"itt05-paypal-lx",k2:"itt05-paypal-rlx",verb1:'Send leftover',verb2:'Send another',next2:'wired'},
  {dest:"wired",href:"/years/2005/sites/wired/index.html",k1:"itt05-wired-lx",k2:"itt05-wired-rlx",verb1:'Open this post',verb2:'Open next',next2:'home'}
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
  const suffix = key.replace(/^itt05-/, "");
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


test.describe("2005 leftover-2× 3× dest-true", () => {
  test("home strips list leftover-2× unique dests dest-disjoint from leftover-3× matrix", async ({ page }) => {
    const res = await page.goto("/years/2005/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const reserved = new Set(["youtube", "maps", "pandora", "housingmaps", "digg", "reddit", "flickr", "itunes", "techcrunch", "playable", "milliondollar", "clubpenguin", "kayak", "myspace", "wikipedia", "yahoo", "dailymotion", "googlevideo", "earth", "firefox", "gmail", "vimeo", "google", "amazon", "msn", "aol", "skype", "delicious"]);
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided leftover-3× / official").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " duplicate board").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await revealLeftoverRails(page);
    await expect(page.locator("[data-itt-2x-unique='2005']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2005']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2005']")).toBeVisible();
    const guided = page.locator(".ott-guided ol li, #ott-guided-2005 ol li, [id^='ott-guided'] ol li");
    const n = await guided.count();
    if (n) expect(n).toBe(6);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next + complete`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt05-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt05-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
