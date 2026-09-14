// @ts-check
/**
 * 2007 leftover-2× 3× · dest-true leftover dests.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const YEAR = "2007";
const STAR = "itt07-iphone";
const OFFICIAL = [
  "itt07-iphone",
  "itt07-streetview",
  "itt07-gmail",
  "itt07-fbplat",
  "itt07-twitter",
  "itt07-youtube",
  "itt07-tumblr",
  "itt07-kindle",
  "itt07-ie6",
  "itt07-game-safariq"
];

/** @type { dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[] */
const FLOWS = [
  {dest:"lastfm",href:"/years/2007/sites/lastfm/index.html",k1:"itt07-lastfm-dp",k2:"itt07-lastfm-d2",verb1:'Scrobble leftover',verb2:'Join leftover',next2:'wordpress'},
  {dest:"wordpress",href:"/years/2007/sites/wordpress/index.html",k1:"itt07-wordpress-dp",k2:"itt07-wordpress-d2",verb1:'Publish leftover',verb2:'Publish another',next2:'yahoo'},
  {dest:"yahoo",href:"/years/2007/sites/yahoo/index.html",k1:"itt07-yahoo-dp",k2:"itt07-yahoo-d2",verb1:'Directory leftover',verb2:'Directory another',next2:'pownce'},
  {dest:"pownce",href:"/years/2007/sites/pownce/index.html",k1:"itt07-pownce-dp",k2:"itt07-pownce-d2",verb1:'Post leftover',verb2:'Post another',next2:'jaiku'},
  {dest:"jaiku",href:"/years/2007/sites/jaiku/index.html",k1:"itt07-jaiku-dp",k2:"itt07-jaiku-d2",verb1:'Update leftover',verb2:'Update another',next2:'justintv'},
  {dest:"justintv",href:"/years/2007/sites/justintv/index.html",k1:"itt07-justintv-dp",k2:"itt07-justintv-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'nfx'},
  {dest:"nfx",href:"/years/2007/sites/nfx/index.html",k1:"itt07-nfx-dp",k2:"itt07-nfx-dp-d2",verb1:'Queue leftover',verb2:'Envelope leftover',next2:'sl'},
  {dest:"sl",href:"/years/2007/sites/sl/index.html",k1:"itt07-sl-dp",k2:"itt07-sl-dp-d2",verb1:'Teleport leftover',verb2:'Enter leftover',next2:'pp'},
  {dest:"pp",href:"/years/2007/sites/pp/index.html",k1:"itt07-pp-dp",k2:"itt07-pp-dp-d2",verb1:'Pay leftover',verb2:'Send leftover',next2:'saf3'},
  {dest:"saf3",href:"/years/2007/sites/saf3/index.html",k1:"itt07-saf3-dp",k2:"itt07-saf3-dp-d2",verb1:'Browse leftover',verb2:'Tab leftover',next2:'home'},
  {dest:"iptouch",href:"/years/2007/sites/iptouch/index.html",k1:"itt07-iptouch-dp",k2:"itt07-iptouch-dp-d2",verb1:'Browse leftover',verb2:'Browse another',next2:'apltv'},
  {dest:"apltv",href:"/years/2007/sites/apltv/index.html",k1:"itt07-apltv-dp",k2:"itt07-apltv-dp-d2",verb1:'Play leftover',verb2:'Play another',next2:'opensocial'},
  {dest:"opensocial",href:"/years/2007/sites/opensocial/index.html",k1:"itt07-opensocial-dp",k2:"itt07-opensocial-d2",verb1:'Apply leftover',verb2:'Apply another',next2:'disqus'},
  {dest:"disqus",href:"/years/2007/sites/disqus/index.html",k1:"itt07-disqus-dp",k2:"itt07-disqus-d2",verb1:'Comment leftover',verb2:'Comment another',next2:'meebo'},
  {dest:"meebo",href:"/years/2007/sites/meebo/index.html",k1:"itt07-meebo-dp",k2:"itt07-meebo-d2",verb1:'Sign on leftover',verb2:'Chat leftover',next2:'leopard'},
  {dest:"leopard",href:"/years/2007/sites/leopard/index.html",k1:"itt07-leopard-dp",k2:"itt07-leopard-d2",verb1:'Upgrade leftover',verb2:'Feature leftover',next2:'imeem'},
  {dest:"imeem",href:"/years/2007/sites/imeem/index.html",k1:"itt07-imeem-dp",k2:"itt07-imeem-d2",verb1:'Play leftover',verb2:'Play another',next2:'ie7'},
  {dest:"ie7",href:"/years/2007/sites/ie7/index.html",k1:"itt07-ie7-dp",k2:"itt07-ie7-dp-d2",verb1:'Download leftover',verb2:'Tab leftover',next2:'silverlight'},
  {dest:"silverlight",href:"/years/2007/sites/silverlight/index.html",k1:"itt07-silverlight-dp",k2:"itt07-silverlight-d2",verb1:'Install leftover',verb2:'Play leftover',next2:'gears'},
  {dest:"gears",href:"/years/2007/sites/gears/index.html",k1:"itt07-gears-dp",k2:"itt07-gears-dp-d2",verb1:'Install leftover',verb2:'Offline leftover',next2:'home'},
  {dest:"knol",href:"/years/2007/sites/knol/index.html",k1:"itt07-knol-dp",k2:"itt07-knol-d2",verb1:'Publish leftover',verb2:'Publish another',next2:'mahalo'},
  {dest:"mahalo",href:"/years/2007/sites/mahalo/index.html",k1:"itt07-mahalo-dp",k2:"itt07-mahalo-d2",verb1:'Search leftover',verb2:'Search another',next2:'halo3'},
  {dest:"halo3",href:"/years/2007/sites/halo3/index.html",k1:"itt07-halo3-dp",k2:"itt07-halo3-dp-d2",verb1:'Launch leftover',verb2:'Match leftover',next2:'funnyordie'},
  {dest:"funnyordie",href:"/years/2007/sites/funnyordie/index.html",k1:"itt07-funnyordie-dp",k2:"itt07-funnyordie-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'ustream'},
  {dest:"ustream",href:"/years/2007/sites/ustream/index.html",k1:"itt07-ustream-dp",k2:"itt07-ustream-d2",verb1:'Watch leftover',verb2:'Go live leftover',next2:'vimeo'},
  {dest:"vimeo",href:"/years/2007/sites/vimeo/index.html",k1:"itt07-vimeo-dp",k2:"itt07-vimeo-d2",verb1:'Watch leftover',verb2:'Upload leftover',next2:'skype'},
  {dest:"skype",href:"/years/2007/sites/skype/index.html",k1:"itt07-skype-dp",k2:"itt07-skype-d2",verb1:'Call leftover',verb2:'Call another',next2:'delicious'},
  {dest:"delicious",href:"/years/2007/sites/delicious/index.html",k1:"itt07-delicious-dp",k2:"itt07-delicious-d2",verb1:'Tag leftover',verb2:'Tag another',next2:'facebook'},
  {dest:"facebook",href:"/years/2007/sites/facebook/index.html",k1:"itt07-facebook-c",k2:"itt07-facebook-c-d2",verb1:'Feed leftover',verb2:'Poke leftover',next2:'li'},
  {dest:"li",href:"/years/2007/sites/li/index.html",k1:"itt07-li-dp",k2:"itt07-li-dp-d2",verb1:'Invite leftover',verb2:'Invite another',next2:'home'}
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
  const suffix = key.replace(/^itt07-/, "");
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


test.describe("2007 leftover-2× 3× dest-true", () => {
  test("home strips list leftover-2× unique dests dest-disjoint from leftover-3× matrix", async ({ page }) => {
    const res = await page.goto("/years/2007/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const reserved = new Set(["iphone", "streetview", "gmail", "fbplat", "twitter", "youtube", "tumblr", "kindle", "ie6", "playable", "wiki", "myspace", "maps", "ebay", "stumble", "wow", "flickr", "reddit", "digg", "google", "blogger", "cnn", "orkut", "itunes", "steam", "wii", "ff2", "nyt", "xbox"]);
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided leftover-3× / official").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " duplicate board").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await expect(page.locator("[data-itt-2x-unique='2007']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2007']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2007']")).toBeVisible();
    const guided = page.locator(".ott-guided ol li, #ott-guided-2007 ol li, [id^='ott-guided'] ol li");
    const n = await guided.count();
    if (n) expect(n).toBe(6);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next + complete`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.href + " http").toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt07-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt07-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
