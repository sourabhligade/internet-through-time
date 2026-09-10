// @ts-check
/**
 * CUT-3X-2X-2005-2010 — leftover 3× second pack, E2E, not mock.
 * Live years: 2005 / 2006 / 2007 / 2008 / 2009 / 2010.
 * Doors 10–18. Today’s leftover 3× / leftover 999 stay.
 * Lean 2006 / 2007 / 2009 stay at 6 leftover-3× (no invented pop-more).
 * Stars / guided 6 / official gold stay put.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const YEAR_WRONG_2009 = [
  "discord",
  "zoom",
  "teams",
  "notion",
  "figma",
  "slack",
  "twitch",
  "whatsapp",
  "icloud",
  "instagram",
  "edge",
  "tiktok",
  "fortnite",
];

/** @type {Record<string, {
 *   star: string,
 *   starHref: string,
 *   gold: string[],
 *   want2x: number,
 *   official: string[],
 *   ils: string[],
 *   doors: { dest: string, go: string, key: string, next: string, nextKey: string, weather: RegExp, lx: string[], never: string[] }[]
 * }>} */
const LIVE = {
  2005: {
    star: "itt05-yt-uploads",
    starHref: "youtube",
    gold: ["itt05-yt-uploads", "itt05-maps", "itt05-pandora", "itt05-digg", "itt05-reddit", "itt05-flickr"],
    want2x: 9,
    official: ["youtube", "maps", "pandora", "housingmaps", "digg", "reddit", "flickr", "itunes", "techcrunch", "playable"],
    ils: ["64,780,617"],
    doors: [
      { dest: "/years/2005/sites/facebook/index.html", go: "[data-pop-go][data-pop-id='facebook']", key: "itt05-pop-facebook", next: "lastfm/index.html", nextKey: "itt05-pop-lastfm", weather: /Sep 2005 high school|Thefacebook college leftover/i, lx: ["itt05-fb-hs", "itt05-fb-rename"], never: ["itt05-yt-uploads"] },
      { dest: "/years/2005/sites/lastfm/index.html", go: "[data-pop-go][data-pop-id='lastfm']", key: "itt05-pop-lastfm", next: "reader/index.html", nextKey: "itt05-pop-reader", weather: /9 Aug 2005 Audioscrobbler|2003 seed leftover/i, lx: ["itt05-lastfm-lx"], never: ["itt05-yt-uploads"] },
      { dest: "/years/2005/sites/reader/index.html", go: "[data-pop-go][data-pop-id='reader']", key: "itt05-pop-reader", next: "analytics/index.html", nextKey: "itt05-pop-analytics", weather: /7 Oct 2005 Google Reader/i, lx: ["itt05-reader-lx"], never: ["itt05-yt-uploads"] },
      { dest: "/years/2005/sites/analytics/index.html", go: "[data-pop-go][data-pop-id='analytics']", key: "itt05-pop-analytics", next: "googleearth/index.html", nextKey: "itt05-pop-googleearth", weather: /14 Nov 2005 Google Analytics/i, lx: ["itt05-ga-lx"], never: ["itt05-yt-uploads"] },
      { dest: "/years/2005/sites/googleearth/index.html", go: "[data-pop-go][data-pop-id='googleearth']", key: "itt05-pop-googleearth", next: "secondlife/index.html", nextKey: "itt05-pop-secondlife", weather: /28 Jun 2005 Google Earth/i, lx: ["itt05-googleearth"], never: ["itt05-yt-uploads", "itt05-maps"] },
      { dest: "/years/2005/sites/secondlife/index.html", go: "[data-pop-go][data-pop-id='secondlife']", key: "itt05-pop-secondlife", next: "yelp/index.html", nextKey: "itt05-pop-yelp", weather: /2005 Second Life leftover/i, lx: ["itt05-secondlife"], never: ["itt05-yt-uploads"] },
      { dest: "/years/2005/sites/yelp/index.html", go: "[data-pop-go][data-pop-id='yelp']", key: "itt05-pop-yelp", next: "odeo/index.html", nextKey: "itt05-pop3-odeo", weather: /Yelp leftover 2005/i, lx: ["itt05-yelp-lx"], never: ["itt05-yt-uploads"] },
      { dest: "/years/2005/sites/odeo/index.html", go: "[data-pop-go][data-pop-id='pop3-odeo']", key: "itt05-pop3-odeo", next: "linkedin/index.html", nextKey: "itt05-pop3-linkedin", weather: /Odeo 2005 podcast leftover/i, lx: ["itt05-odeo-lx"], never: ["itt05-yt-uploads", "itt06-tweets"] },
      { dest: "/years/2005/sites/linkedin/index.html", go: "[data-pop-go][data-pop-id='pop3-linkedin']", key: "itt05-pop3-linkedin", next: "pages/home.html", nextKey: "", weather: /LinkedIn leftover 2005/i, lx: ["itt05-li-lx"], never: ["itt05-yt-uploads"] },
    ],
  },
  2006: {
    star: "itt06-tweets",
    starHref: "twitter",
    gold: ["itt06-tweets", "itt06-feed", "itt06-fb-open", "itt06-yt", "itt06-gdocs", "itt06-ie7"],
    want2x: 9,
    official: ["twitter", "facebook", "youtube", "googledocs", "aws", "ie7", "wikipedia", "roblox", "playable"],
    ils: ["85,507,314"],
    doors: [
      { dest: "/years/2006/sites/wii/index.html", go: "[data-pop-go][data-pop-id='wii']", key: "itt06-pop-wii", next: "time-you/index.html", nextKey: "itt06-pop-time-you", weather: /Wii North America 19 Nov 2006/i, lx: ["itt06-wii"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/time-you/index.html", go: "[data-pop-go][data-pop-id='time-you']", key: "itt06-pop-time-you", next: "skype/index.html", nextKey: "itt06-pop-skype", weather: /Time Person of the Year 2006 is You/i, lx: ["itt06-time-you"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/skype/index.html", go: "[data-pop-go][data-pop-id='skype']", key: "itt06-pop-skype", next: "lastfm/index.html", nextKey: "itt06-pop-lastfm", weather: /Skype leftover 2006 calls/i, lx: ["itt06-skype-lx"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/lastfm/index.html", go: "[data-pop-go][data-pop-id='lastfm']", key: "itt06-pop-lastfm", next: "secondlife/index.html", nextKey: "itt06-pop-secondlife", weather: /Last\.fm leftover 2006 scrobble/i, lx: ["itt06-lastfm-lx"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/secondlife/index.html", go: "[data-pop-go][data-pop-id='secondlife']", key: "itt06-pop-secondlife", next: "blogger/index.html", nextKey: "itt06-pop-blogger", weather: /Second Life leftover 2006 habit/i, lx: ["itt06-secondlife"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/blogger/index.html", go: "[data-pop-go][data-pop-id='blogger']", key: "itt06-pop-blogger", next: "wordpress/index.html", nextKey: "itt06-pop3-wordpress", weather: /Blogger leftover 2006/i, lx: ["itt06-blogger-lx"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/wordpress/index.html", go: "[data-pop-go][data-pop-id='pop3-wordpress']", key: "itt06-pop3-wordpress", next: "adsense/index.html", nextKey: "itt06-pop3-adsense", weather: /WordPress leftover 2006/i, lx: ["itt06-wp-lx"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/adsense/index.html", go: "[data-pop-go][data-pop-id='pop3-adsense']", key: "itt06-pop3-adsense", next: "flickr/index.html", nextKey: "itt06-pop3-flickr", weather: /AdSense leftover 2006/i, lx: ["itt06-adsense-lx"], never: ["itt06-tweets"] },
      { dest: "/years/2006/sites/flickr/index.html", go: "[data-pop-go][data-pop-id='pop3-flickr']", key: "itt06-pop3-flickr", next: "pages/home.html", nextKey: "", weather: /Flickr leftover 2006 after Yahoo/i, lx: ["itt06-flickr-lx"], never: ["itt06-tweets"] },
    ],
  },
  2007: {
    star: "itt07-iphone",
    starHref: "iphone",
    gold: ["itt07-iphone", "itt07-streetview", "itt07-gmail", "itt07-tumblr", "itt07-ie6"],
    want2x: 9,
    official: ["iphone", "streetview", "gmail", "fbplat", "twitter", "youtube", "tumblr", "kindle", "ie6", "playable"],
    ils: ["121,892,559"],
    doors: [
      { dest: "/years/2007/sites/iptouch/index.html", go: "[data-pop-go][data-pop-id='iptouch']", key: "itt07-pop-iptouch", next: "apltv/index.html", nextKey: "itt07-pop-apltv", weather: /5 Sep 2007 Apple unveils iPod touch/i, lx: ["itt07-iptouch-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/apltv/index.html", go: "[data-pop-go][data-pop-id='apltv']", key: "itt07-pop-apltv", next: "huluann/index.html", nextKey: "itt07-pop-huluann", weather: /Apple TV 2007 leftover set-top/i, lx: ["itt07-apltv-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/huluann/index.html", go: "[data-pop-go][data-pop-id='huluann']", key: "itt07-pop-huluann", next: "gears/index.html", nextKey: "itt07-pop-gears", weather: /Hulu announced 2007/i, lx: ["itt07-huluann-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/gears/index.html", go: "[data-pop-go][data-pop-id='gears']", key: "itt07-pop-gears", next: "halo3/index.html", nextKey: "itt07-pop-halo3", weather: /Google Gears 2007 offline web/i, lx: ["itt07-gears-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/halo3/index.html", go: "[data-pop-go][data-pop-id='halo3']", key: "itt07-pop-halo3", next: "stumble/index.html", nextKey: "itt07-pop-stumble", weather: /Halo 3 25 Sep 2007 leftover/i, lx: ["itt07-halo3-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/stumble/index.html", go: "[data-pop-go][data-pop-id='stumble']", key: "itt07-pop-stumble", next: "ipann/index.html", nextKey: "itt07-pop3-ipann", weather: /StumbleUpon leftover 2007/i, lx: ["itt07-stumble-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/ipann/index.html", go: "[data-pop-go][data-pop-id='pop3-ipann']", key: "itt07-pop3-ipann", next: "vista/index.html", nextKey: "itt07-pop3-vista", weather: /9 Jan 2007 iPhone announce leftover/i, lx: ["itt07-ipann-dp"], never: ["itt07-iphone"] },
      { dest: "/years/2007/sites/vista/index.html", go: "[data-pop-go][data-pop-id='pop3-vista']", key: "itt07-pop3-vista", next: "gim/index.html", nextKey: "itt07-pop3-gim", weather: /Vista leftover 2007/i, lx: ["itt07-vista-dp"], never: ["itt07-iphone", "itt07-ie6"] },
      { dest: "/years/2007/sites/gim/index.html", go: "[data-pop-go][data-pop-id='pop3-gim']", key: "itt07-pop3-gim", next: "pages/home.html", nextKey: "", weather: /Gmail IMAP leftover 2007/i, lx: ["itt07-gim-dp"], never: ["itt07-iphone", "itt07-gmail"] },
    ],
  },
  2008: {
    star: "itt08-github",
    starHref: "github",
    gold: ["itt08-github", "itt08-apps", "itt08-chrome", "itt08-hulu", "itt08-tweets", "itt08-dropbox"],
    want2x: 9,
    official: ["github", "appstore", "chrome", "android", "hulu", "facebook", "twitter", "youtube", "dropbox", "iphone"],
    ils: ["172,338,726"],
    doors: [
      { dest: "/years/2008/sites/airbnb/index.html", go: "[data-pop-go][data-pop-id='airbnb']", key: "itt08-pop-airbnb", next: "bitcoin/index.html", nextKey: "itt08-pop-bitcoin", weather: /Airbnb 2008 leftover/i, lx: ["itt08-ab-lx", "itt08-abnb"], never: ["itt08-github"] },
      { dest: "/years/2008/sites/bitcoin/index.html", go: "[data-pop-go][data-pop-id='bitcoin']", key: "itt08-pop-bitcoin", next: "duckduckgo/index.html", nextKey: "itt08-pop-duckduckgo", weather: /31 Oct 2008 Bitcoin P2P e-cash paper/i, lx: ["itt08-btc-paper"], never: ["itt08-github"] },
      { dest: "/years/2008/sites/duckduckgo/index.html", go: "[data-pop-go][data-pop-id='duckduckgo']", key: "itt08-pop-duckduckgo", next: "groupon/index.html", nextKey: "itt08-pop-groupon", weather: /DuckDuckGo 2008 leftover search/i, lx: ["itt08-ddg-dp"], never: ["itt08-github"] },
      { dest: "/years/2008/sites/groupon/index.html", go: "[data-pop-go][data-pop-id='groupon']", key: "itt08-pop-groupon", next: "tweetdeck/index.html", nextKey: "itt08-pop-tweetdeck", weather: /Groupon 2008 leftover/i, lx: ["itt08-gp-lx"], never: ["itt08-github"] },
      { dest: "/years/2008/sites/tweetdeck/index.html", go: "[data-pop-go][data-pop-id='tweetdeck']", key: "itt08-pop-tweetdeck", next: "failwhale/index.html", nextKey: "itt08-pop-failwhale", weather: /TweetDeck 2008 leftover desktop/i, lx: ["itt08-tdeck-dp"], never: ["itt08-github", "itt08-tweets"] },
      { dest: "/years/2008/sites/failwhale/index.html", go: "[data-pop-go][data-pop-id='failwhale']", key: "itt08-pop-failwhale", next: "cuil/index.html", nextKey: "itt08-pop3-cuil", weather: /Fail Whale leftover 2008/i, lx: ["itt08-whale-dp"], never: ["itt08-github", "itt08-tweets"] },
      { dest: "/years/2008/sites/cuil/index.html", go: "[data-pop-go][data-pop-id='pop3-cuil']", key: "itt08-pop3-cuil", next: "bitly/index.html", nextKey: "itt08-pop3-bitly", weather: /Cuil 28 Jul 2008 leftover/i, lx: ["itt08-cuil-dp"], never: ["itt08-github"] },
      { dest: "/years/2008/sites/bitly/index.html", go: "[data-pop-go][data-pop-id='pop3-bitly']", key: "itt08-pop3-bitly", next: "spotify/index.html", nextKey: "itt08-pop3-spotify", weather: /bit\.ly 2008 leftover short links/i, lx: ["itt08-bitly-dp"], never: ["itt08-github"] },
      { dest: "/years/2008/sites/spotify/index.html", go: "[data-pop-go][data-pop-id='pop3-spotify']", key: "itt08-pop3-spotify", next: "pages/home.html", nextKey: "", weather: /Spotify Europe 2008 leftover/i, lx: ["itt08-sp-lx", "itt08-spot-eu"], never: ["itt08-github", "itt08-chrome"] },
    ],
  },
  2009: {
    star: "itt09-like",
    starHref: "facebook",
    gold: ["itt09-like", "itt09-farm", "itt09-bing", "itt09-iphone", "itt09-kickstarter", "itt09-win7"],
    want2x: 9,
    official: ["facebook", "farmville", "bing", "iphone", "appstore", "twitter", "foursquare", "kickstarter", "windows7", "playable"],
    ils: ["238,027,855"],
    doors: [
      { dest: "/years/2009/sites/wolfram/index.html", go: "[data-pop-go][data-pop-id='wolfram']", key: "itt09-pop-wolfram", next: "angry/index.html", nextKey: "itt09-pop-angry", weather: /18 May 2009 Wolfram/i, lx: ["itt09-wolfram"], never: ["itt09-like"] },
      { dest: "/years/2009/sites/angry/index.html", go: "[data-pop-go][data-pop-id='angry']", key: "itt09-pop-angry", next: "gvoice/index.html", nextKey: "itt09-pop-gvoice", weather: /9 Dec 2009 Angry Birds iOS leftover/i, lx: ["itt09-angry"], never: ["itt09-like", "itt09-game-plot"] },
      { dest: "/years/2009/sites/gvoice/index.html", go: "[data-pop-go][data-pop-id='gvoice']", key: "itt09-pop-gvoice", next: "palmpre/index.html", nextKey: "itt09-pop-palmpre", weather: /Google Voice leftover 2009/i, lx: ["itt09-gvoice"], never: ["itt09-like"] },
      { dest: "/years/2009/sites/palmpre/index.html", go: "[data-pop-go][data-pop-id='palmpre']", key: "itt09-pop-palmpre", next: "friendfeed/index.html", nextKey: "itt09-pop-friendfeed", weather: /Palm Pre 2009 leftover/i, lx: ["itt09-pre"], never: ["itt09-like", "itt09-iphone"] },
      { dest: "/years/2009/sites/friendfeed/index.html", go: "[data-pop-go][data-pop-id='friendfeed']", key: "itt09-pop-friendfeed", next: "minecraft/index.html", nextKey: "itt09-pop-minecraft", weather: /FriendFeed leftover 2009/i, lx: ["itt09-ffeed"], never: ["itt09-like"] },
      { dest: "/years/2009/sites/minecraft/index.html", go: "[data-pop-go][data-pop-id='minecraft']", key: "itt09-pop-minecraft", next: "bitcoin/index.html", nextKey: "itt09-pop3-bitcoin", weather: /Minecraft 17 May 2009 public leftover/i, lx: ["itt09-mc"], never: ["itt09-like"] },
      { dest: "/years/2009/sites/bitcoin/index.html", go: "[data-pop-go][data-pop-id='pop3-bitcoin']", key: "itt09-pop3-bitcoin", next: "ubercab/index.html", nextKey: "itt09-pop3-ubercab", weather: /3 Jan 2009 Bitcoin genesis leftover/i, lx: ["itt09-btc"], never: ["itt09-like"] },
      { dest: "/years/2009/sites/ubercab/index.html", go: "[data-pop-go][data-pop-id='pop3-ubercab']", key: "itt09-pop3-ubercab", next: "kindle/index.html", nextKey: "itt09-pop3-kindle", weather: /UberCab founded 2009 leftover/i, lx: ["itt09-uber"], never: ["itt09-like"] },
      { dest: "/years/2009/sites/kindle/index.html", go: "[data-pop-go][data-pop-id='pop3-kindle']", key: "itt09-pop3-kindle", next: "pages/home.html", nextKey: "", weather: /Kindle leftover 2009/i, lx: ["itt09-kindle"], never: ["itt09-like"] },
    ],
  },
  2010: {
    star: "itt10-ig-posts",
    starHref: "instagram",
    gold: ["itt10-ig-posts", "itt10-ig", "itt10-iphone4", "itt10-ipad", "itt10-fb-og", "itt10-imgur"],
    want2x: 9,
    official: ["instagram", "iphone", "ipad", "facebook", "farmville", "imgur", "foursquare", "twitter", "youtube", "playable"],
    ils: ["206,956,723"],
    doors: [
      { dest: "/years/2010/sites/uber/index.html", go: "[data-pop-go][data-pop-id='uber']", key: "itt10-pop-uber", next: "wikileaks/index.html", nextKey: "itt10-pop-wikileaks", weather: /UberCab SF 2010/i, lx: ["itt10-uber", "itt10-uber-sf"], never: ["itt10-ig-posts", "itt10-ig"] },
      { dest: "/years/2010/sites/wikileaks/index.html", go: "[data-pop-go][data-pop-id='wikileaks']", key: "itt10-pop-wikileaks", next: "facetime/index.html", nextKey: "itt10-pop-facetime", weather: /28 Nov 2010 Cablegate/i, lx: ["itt10-wikileaks", "itt10-wl"], never: ["itt10-ig-posts"] },
      { dest: "/years/2010/sites/facetime/index.html", go: "[data-pop-go][data-pop-id='facetime']", key: "itt10-pop-facetime", next: "windowsphone/index.html", nextKey: "itt10-pop-windowsphone", weather: /FaceTime leftover with iPhone 4|Wi-Fi only 2010/i, lx: ["itt10-ft-lx", "itt10-facetime"], never: ["itt10-ig-posts", "itt10-iphone4"] },
      { dest: "/years/2010/sites/windowsphone/index.html", go: "[data-pop-go][data-pop-id='windowsphone']", key: "itt10-pop-windowsphone", next: "ie9/index.html", nextKey: "itt10-pop-ie9", weather: /Windows Phone 7 leftover|Nov 2010/i, lx: ["itt10-windowsphone", "itt10-windowspho-rlx"], never: ["itt10-ig-posts", "itt10-iphone4"] },
      { dest: "/years/2010/sites/ie9/index.html", go: "[data-pop-go][data-pop-id='ie9']", key: "itt10-pop-ie9", next: "digg/index.html", nextKey: "itt10-pop-digg", weather: /Internet Explorer 9 preview leftover 2010/i, lx: ["itt10-ie-lx", "itt10-ie9"], never: ["itt10-ig-posts"] },
      { dest: "/years/2010/sites/digg/index.html", go: "[data-pop-go][data-pop-id='digg']", key: "itt10-pop-digg", next: "browserchoice/index.html", nextKey: "itt10-pop3-browserchoice", weather: /Digg v4 leftover 25 Aug 2010/i, lx: ["itt10-digg-v4", "itt10-digg"], never: ["itt10-ig-posts"] },
      { dest: "/years/2010/sites/browserchoice/index.html", go: "[data-pop-go][data-pop-id='pop3-browserchoice']", key: "itt10-pop3-browserchoice", next: "kickstarter/index.html", nextKey: "itt10-pop3-kickstarter", weather: /BrowserChoice\.eu 2010 leftover ballot/i, lx: ["itt10-ballot", "itt10-browserchoice"], never: ["itt10-ig-posts"] },
      { dest: "/years/2010/sites/kickstarter/index.html", go: "[data-pop-go][data-pop-id='pop3-kickstarter']", key: "itt10-pop3-kickstarter", next: "reddit/index.html", nextKey: "itt10-pop3-reddit", weather: /Kickstarter leftover 2010 habit/i, lx: ["itt10-kickstarter", "itt10-ks-lx"], never: ["itt10-ig-posts"] },
      { dest: "/years/2010/sites/reddit/index.html", go: "[data-pop-go][data-pop-id='pop3-reddit']", key: "itt10-pop3-reddit", next: "pages/home.html", nextKey: "", weather: /Reddit leftover 2010 habit/i, lx: ["itt10-rd-lx", "itt10-reddit"], never: ["itt10-ig-posts"] },
    ],
  },
};

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

function siteKey(href) {
  const m = String(href || "").match(/sites\/([^/?#]+)/);
  return m ? m[1] : String(href || "");
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ dest: string, go: string, key: string, next: string, nextKey: string, weather: RegExp, lx: string[], never: string[] }} door
 * @param {string[]} gold
 */
async function walkDoor(page, door, gold) {
  await page.goto(door.dest);
  await revealLeftoverRails(page);
  await page.evaluate((k) => localStorage.removeItem(k), door.key);
  const extra = [...new Set([...(gold || []), ...(door.never || []), ...(door.lx || [])])];
  for (const g of extra) await page.evaluate((k) => localStorage.removeItem(k), g);
  if (door.nextKey) await page.evaluate((k) => localStorage.removeItem(k), door.nextKey);
  const y = door.key.slice(3, 5);
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) - 1).padStart(2, "0"));
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) + 1).padStart(2, "0"));
  await page.reload();
  await revealLeftoverRails(page);

  await expect(page.locator(".itt-pop3x-flow[data-pop-panel='1']").first()).toContainText(door.weather);

  const go = page.locator(door.go).first();
  await expect(go).toBeVisible({ timeout: 15000 });
  await page.waitForFunction(
    (sel) => {
      const b = document.querySelector(sel);
      return !!(b && b.getAttribute("data-pop-bound") === "1");
    },
    door.go,
    { timeout: 15000 }
  );
  const panel = page.locator(`${door.go}`).first().locator("xpath=ancestor::*[@data-pop-panel='1' or contains(@class,'itt-pop3') or contains(@class,'itt-pop3x-flow')][1]");
  const scope = (await panel.count()) ? panel : page;

  await go.click();
  expect(await getKey(page, door.key), door.key + " empty/no-pick").toBeFalsy();

  const trap = scope.locator("[data-pop-pick='trap'], [data-pop-trap='1']").first();
  if (await trap.count()) {
    await trap.click();
    await go.click();
    expect(await getKey(page, door.key), door.key + " trap").toBeFalsy();
  }

  const keep = scope.locator("[data-pop-pick]:not([data-pop-trap='1']):not([data-pop-pick='trap'])").first();
  if (await keep.count()) await keep.click();
  const reqs = scope.locator("[data-pop-req]");
  const nReq = await reqs.count();
  if (nReq) {
    await go.click();
    expect(await getKey(page, door.key), door.key + " 0 ticks").toBeFalsy();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  }
  const field = scope.locator("[data-pop-field]").first();
  if (await field.count()) {
    await field.fill("");
    await go.click();
    expect(await getKey(page, door.key), door.key + " empty field").toBeFalsy();
    const ph = (await field.getAttribute("placeholder")) || "museum leftover";
    await field.fill(ph);
  }
  await go.click();
  await expect.poll(() => getKey(page, door.key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, door.key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.multiStep).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(String(2000 + Number(door.key.slice(3, 5))));
  for (const g of extra) {
    if (g === door.key) continue;
    expect(await getKey(page, g), door.key + " must not write " + g).toBeFalsy();
  }
  const next = page.locator(`[data-next-when-key="${door.key}"] a`).first();
  await expect(next).toBeVisible();
  const href = (await next.getAttribute("href")) || "";
  expect(href).toContain(door.next);
  if (door.nextKey) {
    expect(await getKey(page, door.nextKey), door.key + " Next must not write " + door.nextKey).toBeFalsy();
  }
  const [res] = await Promise.all([
    page.waitForResponse((r) => r.request().resourceType() === "document" && r.url().includes(door.next.split("/").pop() || door.next)),
    next.click(),
  ]);
  expect(res.ok(), "Next HTTP 200 " + res.url()).toBeTruthy();
  expect(page.url()).toContain(door.next.replace(/^\.\.\//, "").replace("../../", ""));
  if (door.nextKey) {
    expect(await getKey(page, door.nextKey), "landing Next dest must not write " + door.nextKey).toBeFalsy();
  }
}

const FIRST_PACK_MISSING = {
  2005: [
    { dest: "/years/2005/sites/youtube/watch.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt05-pop-youtube", next: "wikipedia/index.html", nextKey: "itt05-pop-wikipedia", weather: /YouTube leftover 2005 watch/i, lx: [], never: ["itt05-yt-uploads"] },
    { dest: "/years/2005/sites/wikipedia/index.html", go: "[data-pop-go][data-pop-id='wikipedia']", key: "itt05-pop-wikipedia", next: "myspace/index.html", nextKey: "itt05-pop-myspace", weather: /Wikipedia leftover 2005/i, lx: [], never: ["itt05-yt-uploads"] },
    { dest: "/years/2005/sites/earth/index.html", go: "[data-pop-go][data-pop-id='earth']", key: "itt05-pop-earth", next: "mashable/index.html", nextKey: "itt05-pop-mashable", weather: /Google Earth leftover 2005 leftover 999/i, lx: [], never: ["itt05-yt-uploads", "itt05-maps"] },
  ],
  2006: [
    { dest: "/years/2006/sites/youtube/index.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt06-pop-youtube", next: "facebook/index.html", nextKey: "itt06-pop-facebook", weather: /YouTube leftover 2006 leftover 3×/i, lx: [], never: ["itt06-tweets", "itt06-yt"] },
    { dest: "/years/2006/sites/facebook/index.html", go: "[data-pop-go][data-pop-id='facebook']", key: "itt06-pop-facebook", next: "wikipedia/index.html", nextKey: "itt06-pop-wikipedia", weather: /Facebook leftover 2006 leftover 3×/i, lx: [], never: ["itt06-tweets", "itt06-feed", "itt06-fb-open"] },
  ],
};

test.describe("leftover 3× first-pack dest machines that were missing", () => {
  for (const [year, doors] of Object.entries(FIRST_PACK_MISSING)) {
    const gold = LIVE[year].gold;
    for (const door of doors) {
      test(`${door.key} leftover 3× dest machine writes leftover-only · Next 200`, async ({ page }) => {
        await walkDoor(page, door, gold);
      });
    }
  }

  test("leftover-2× dest-wrong Maps leftover is gone on KEEP dests", async ({ page }) => {
    await page.goto("/years/2005/sites/lastfm/index.html");
  await revealLeftoverRails(page);
    const labels = await page.locator("[data-lo-save]").allTextContents();
    expect(labels.join(" ")).not.toMatch(/Maps leftover/);
    expect(labels.join(" ")).toMatch(/Scrobble leftover/);
  });
});

test.describe("CUT-3X-2X-2005-2010 dest folders stay frozen", () => {
  test("dest folders stay 117 / 126 / 55 / 199 / 68 / 44", () => {
    const want = { 2005: 117, 2006: 126, 2007: 55, 2008: 199, 2009: 68, 2010: 44 };
    for (const [y, n] of Object.entries(want)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const got = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory()).length;
      expect(got, y + " dest folders").toBe(n);
    }
  });

  test("no new dest folder on KEEP doors", () => {
    for (const [year, spec] of Object.entries(LIVE)) {
      for (const door of spec.doors) {
        const destPath = path.join(ROOT, door.dest.replace(/^\//, ""));
        expect(fs.existsSync(destPath), destPath).toBe(true);
      }
    }
  });
});

for (const [year, spec] of Object.entries(LIVE)) {
  test.describe(`${year} leftover 3× 2× doors`, () => {
    test(`home strips 4–6 are unique leftover dests and not the star`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
  await revealLeftoverRails(page);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const a = page.locator(`[data-itt-pop-2x-a="${year}"]`).first().locator('a[href*="sites/"]');
      const b = page.locator(`[data-itt-pop-2x-b="${year}"]`).first().locator('a[href*="sites/"]');
      const c = page.locator(`[data-itt-pop-2x-c="${year}"]`).first().locator('a[href*="sites/"]');
      await expect(a).toHaveCount(3);
      await expect(b).toHaveCount(3);
      await expect(c).toHaveCount(3);

      const todayH = await page.evaluate((y) => {
        const hrefs = [];
        document.querySelectorAll(`[data-itt-pop3x="${y}"], [data-itt-pop-more="${y}"], [data-itt-pop-3x3="${y}"], [data-itt-pop-l5="${y}"], [data-itt-pop-l6="${y}"], [data-itt-pop-l7="${y}"], [data-itt-pop-l8="${y}"], [data-itt-cut-3x-trios="${y}"]`).forEach((block) => {
          block.querySelectorAll('a[href*="sites/"]').forEach((el) => hrefs.push(el.getAttribute("href") || ""));
        });
        return hrefs;
      }, year);
      const twoXH = [
        ...(await a.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await b.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await c.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
      ];
      const todayK = [...new Set(todayH.map(siteKey))];
      const twoXK = twoXH.map(siteKey);
      expect(new Set(twoXK).size).toBe(spec.want2x);
      const star = (await page.locator(`[data-ott-one-thing="${year}"]`).getAttribute("href")) || "";
      expect(twoXK.join(" ")).not.toContain(spec.starHref);
      expect(twoXK).not.toContain(siteKey(star));
      for (const k of twoXK) expect(todayK, "2× overlaps today’s leftover 3× " + k).not.toContain(k);
      const ab = [
        ...(await a.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
        ...(await b.evaluateAll((as) => as.map((el) => el.getAttribute("href") || ""))),
      ];
      const abJoined = ab.join(" ");
      for (const off of spec.official) {
        const re = new RegExp("/" + off.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/");
        expect(abJoined, "4th/5th never official gold " + off).not.toMatch(re);
      }
      if (year === "2009") {
        const joined = twoXH.join(" ");
        for (const bad of YEAR_WRONG_2009) {
          expect(joined, "year-wrong 2009 dest " + bad).not.toMatch(new RegExp("/" + bad + "/"));
        }
      }
      if (year === "2005") expect(twoXH.join(" ")).toMatch(/facebook/);
      if (year === "2006") expect(twoXH.join(" ")).toMatch(/wii/);
      if (year === "2007") expect(twoXH.join(" ")).toMatch(/iptouch/);
      if (year === "2008") expect(twoXH.join(" ")).toMatch(/airbnb/);
      if (year === "2009") expect(twoXH.join(" ")).toMatch(/wolfram/);
      if (year === "2010") expect(twoXH.join(" ")).toMatch(/uber/);

      // lean years must not grow a fake pop-more nine
      if (year === "2006" || year === "2007" || year === "2009") {
        await expect(page.locator(`[data-itt-pop-more="${year}"]`)).toHaveCount(0);
      }

      for (const h of twoXH) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
  await revealLeftoverRails(page);
        expect(res && res.ok(), dest).toBeTruthy();
        await expect(page.locator(".itt-pop3x-flow[data-pop-panel='1']").first()).toBeVisible();
      }
    });

    test(`map lists all leftover 3× 2× hrefs`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/map.html`);
  await revealLeftoverRails(page);
      for (const door of spec.doors) {
        const slug = door.dest.replace(`/years/${year}/sites/`, "");
        await expect(page.locator(`a[href*="${slug}"]`).first()).toBeVisible();
      }
    });

    test(`About still prints ILS and no invented June 2019 cell`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/about.html`);
  await revealLeftoverRails(page);
      const body = await page.locator("body").innerText();
      for (const print of spec.ils) expect(body).toContain(print);
      expect(body).not.toMatch(/June 2019 websites/i);
    });

    for (const door of spec.doors) {
      test(`${door.key} trap/empty never write · complete writes · gold empty · Next 200`, async ({ page }) => {
        await walkDoor(page, door, spec.gold);
      });
    }
  });
}
