// @ts-check
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const YEAR = "2017";
const STAR = "itt17-faceid";
const OFFICIAL = [
  "itt17-faceid",
  "itt17-fortnite",
  "itt17-twitter-280",
  "itt17-teams",
  "itt17-vine-gone",
  "itt17-switch",
  "itt17-wannacry",
  "itt17-musically",
  "itt17-equifax",
  "itt17-game-stormcircle"
];
const RESERVED = new Set(["iphone", "fortnite", "twitter", "teams", "vine", "switch", "wannacry", "musically", "equifax", "playable", "amazon", "android8", "bitcoinath", "bitmoji", "cloudbleed", "creditfrz", "discord17", "echoshow", "flashend", "hqtrivia", "notpetya", "pixel2", "pixelbook", "reddit", "signal17", "slack17", "snapipo", "telegram17", "xboxonex", "yahoo3b", "youtube"]);
const FLOWS = [
  {dest:"whatsapp",href:"/years/2017/sites/whatsapp/index.html",k1:"itt17-whatsapp-lx",k2:"itt17-whatsapp-d2",verb1:'Post a Status',verb2:'Watch a Status',next2:'snapmap'},
  {dest:"snapmap",href:"/years/2017/sites/snapmap/index.html",k1:"itt17-snapmap-lx",k2:"itt17-snapmap-d2",verb1:'Pinch to Map',verb2:'Ghost Mode leftover',next2:'googlelens'},
  {dest:"googlelens",href:"/years/2017/sites/googlelens/index.html",k1:"itt17-googlelens-lx",k2:"itt17-googlelens-d2",verb1:'Point at a thing',verb2:'Connect Wi-Fi leftover',next2:'botw'},
  {dest:"botw",href:"/years/2017/sites/botw/index.html",k1:"itt17-botw-lx",k2:"itt17-botw-d2",verb1:'Climb a tower',verb2:'Cook leftover',next2:'facebookwatch'},
  {dest:"facebookwatch",href:"/years/2017/sites/facebookwatch/index.html",k1:"itt17-facebookwatch-lx",k2:"itt17-facebookwatch-d2",verb1:'Open Watch',verb2:'Add to Watchlist',next2:'destiny2'},
  {dest:"destiny2",href:"/years/2017/sites/destiny2/index.html",k1:"itt17-destiny2-lx",k2:"itt17-destiny2-d2",verb1:'Launch leftover',verb2:'Fireteam leftover',next2:'cuphead'},
  {dest:"cuphead",href:"/years/2017/sites/cuphead/index.html",k1:"itt17-cuphead-lx",k2:"itt17-cuphead-d2",verb1:'Fight a boss',verb2:'Co-op leftover',next2:'snesclassic'},
  {dest:"snesclassic",href:"/years/2017/sites/snesclassic/index.html",k1:"itt17-snesclassic-lx",k2:"itt17-snesclassic-d2",verb1:'Pick a cart',verb2:'Two-player leftover',next2:'model3'},
  {dest:"model3",href:"/years/2017/sites/model3/index.html",k1:"itt17-model3-lx",k2:"itt17-model3-d2",verb1:'Take delivery',verb2:'Configure leftover',next2:'netflix'},
  {dest:"netflix",href:"/years/2017/sites/netflix/index.html",k1:"itt17-netflix-lx",k2:"itt17-netflix-d2",verb1:'Play Part 2',verb2:'My List leftover',next2:'home'},
  {dest:"airpods17",href:"/years/2017/sites/airpods17/index.html",k1:"itt17-ap17-dp",k2:"itt17-ap17-dp-d2",verb1:'Pair leftover',verb2:'Pair another',next2:'ios11'},
  {dest:"ios11",href:"/years/2017/sites/ios11/index.html",k1:"itt17-ios11-dp",k2:"itt17-ios11-dp-d2",verb1:'Upgrade leftover',verb2:'Upgrade another',next2:'ios11ar'},
  {dest:"ios11ar",href:"/years/2017/sites/ios11ar/index.html",k1:"itt17-ar-6x",k2:"itt17-ar-6x-d2",verb1:'Point leftover',verb2:'Point another',next2:'iphone8'},
  {dest:"iphone8",href:"/years/2017/sites/iphone8/index.html",k1:"itt17-iphone8-dp",k2:"itt17-iphone8-dp-d2",verb1:'Buy leftover',verb2:'Buy another',next2:'youtubetv'},
  {dest:"youtubetv",href:"/years/2017/sites/youtubetv/index.html",k1:"itt17-ytv-6x",k2:"itt17-youtubetv-d2",verb1:'Watch live leftover',verb2:'Watch another leftover',next2:'pubgnote'},
  {dest:"pubgnote",href:"/years/2017/sites/pubgnote/index.html",k1:"itt17-pubgnote-rlx",k2:"itt17-pubgnote-rlx-d2",verb1:'Drop leftover',verb2:'Drop another',next2:'watch3'},
  {dest:"watch3",href:"/years/2017/sites/watch3/index.html",k1:"itt17-watch3-dp",k2:"itt17-watch3-d2",verb1:'Pair leftover',verb2:'Pair another',next2:'homepodann'},
  {dest:"homepodann",href:"/years/2017/sites/homepodann/index.html",k1:"itt17-hpodann-dp",k2:"itt17-hpodann-dp-d2",verb1:'Announce leftover',verb2:'Announce another',next2:'applepark'},
  {dest:"applepark",href:"/years/2017/sites/applepark/index.html",k1:"itt17-park-dp",k2:"itt17-park-dp-d2",verb1:'Visit leftover',verb2:'Visit another',next2:'coreml'},
  {dest:"coreml",href:"/years/2017/sites/coreml/index.html",k1:"itt17-coreml-dp",k2:"itt17-coreml-dp-d2",verb1:'Demo leftover',verb2:'Demo another',next2:'home'},
  {dest:"zoom17",href:"/years/2017/sites/zoom17/index.html",k1:"itt17-zoom17-dp",k2:"itt17-zoom17-d2",verb1:'Join leftover',verb2:'Join another',next2:'musically17'},
  {dest:"musically17",href:"/years/2017/sites/musically17/index.html",k1:"itt17-musically1-rlx",k2:"itt17-musically1-rlx-d2",verb1:'Post leftover',verb2:'Post another',next2:'fnstw'},
  {dest:"fnstw",href:"/years/2017/sites/fnstw/index.html",k1:"itt17-stw-dp",k2:"itt17-stw-dp-d2",verb1:'Launch leftover',verb2:'Build leftover',next2:'vault7'},
  {dest:"vault7",href:"/years/2017/sites/vault7/index.html",k1:"itt17-vault7-dp",k2:"itt17-vault7-dp-d2",verb1:'Open this dump',verb2:'Open another',next2:'odyssey'},
  {dest:"odyssey",href:"/years/2017/sites/odyssey/index.html",k1:"itt17-odyssey-dp",k2:"itt17-odyssey-dp-d2",verb1:'Jump leftover',verb2:'Capture leftover',next2:'instagram'},
  {dest:"instagram",href:"/years/2017/sites/instagram/index.html",k1:"itt17-instagram-lx",k2:"itt17-instagram-d2",verb1:'Post leftover',verb2:'Like leftover',next2:'spotify'},
  {dest:"spotify",href:"/years/2017/sites/spotify/index.html",k1:"itt17-spotify-lx",k2:"itt17-spotify-d2",verb1:'Play leftover',verb2:'Playlist leftover',next2:'nintendo'},
  {dest:"nintendo",href:"/years/2017/sites/nintendo/index.html",k1:"itt17-nintendo-lx",k2:"itt17-nintendo-d2",verb1:'Play leftover',verb2:'Play another',next2:'twitch'},
  {dest:"twitch",href:"/years/2017/sites/twitch/index.html",k1:"itt17-twitch-lx",k2:"itt17-twitch-d2",verb1:'Watch leftover',verb2:'Watch another',next2:'jigsaw'},
  {dest:"jigsaw",href:"/years/2017/sites/jigsaw/index.html",k1:"itt17-jigsaw-lx",k2:"itt17-jigsaw-d2",verb1:'Puzzle leftover',verb2:'Puzzle another',next2:'home'}
];
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function completeLo(page, href, key) {
  const suffix = key.replace(/^itt17-/, "");
  await page.goto(href);
  await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), [key, STAR].concat(OFFICIAL));
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
  expect(blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(YEAR);
  expect(await getKey(page, STAR), key + " wrote star").toBeFalsy();
  for (const off of OFFICIAL) {
    if (off !== key) expect(await getKey(page, off), key + " wrote " + off).toBeFalsy();
  }
}
test.describe("2017 leftover-2× 3× dest-true", () => {
  test("home strips dest-disjoint", async ({ page }) => {
    const res = await page.goto("/years/2017/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const seen = new Set();
    for (const fl of FLOWS) {
      expect(RESERVED.has(fl.dest), fl.dest + " reserved").toBeFalsy();
      expect(seen.has(fl.dest), fl.dest + " dup").toBeFalsy();
      seen.add(fl.dest);
    }
    expect(seen.size).toBe(FLOWS.length);
    await expect(page.locator("[data-itt-2x-unique='2017']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-b='2017']")).toBeVisible();
    await expect(page.locator("[data-itt-2x-unique-c='2017']")).toBeVisible();
  });
  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true`, async ({ page }) => {
      const res = await page.goto(fl.href);
      expect(res && res.ok()).toBeTruthy();
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt17-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt17-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      await expect(p2.locator("[data-next-flow] a")).toHaveAttribute("href", new RegExp(fl.next2));
      await completeLo(page, fl.href, fl.k1);
      await completeLo(page, fl.href, fl.k2);
    });
  }
});
