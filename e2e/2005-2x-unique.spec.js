// @ts-check
/**
 * 2005 leftover-2× · 10 unique dest-true flows.
 * Dest folders unused vs official 10 and leftover-3× first/second/third.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

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
  "itt05-game-heli",
];

const FORBIDDEN_HOME = new Set([
  "youtube", "maps", "pandora", "housingmaps", "digg", "reddit", "flickr", "itunes", "techcrunch", "playable",
  "milliondollar", "clubpenguin", "kayak", "myspace", "wikipedia", "yahoo", "dailymotion", "googlevideo", "earth",
  "facebook", "craigslist", "cnn", "feedburner", "basecamp", "excite", "daypop", "bowienet", "friendster",
  "firefox", "gmail", "vimeo", "google", "amazon", "msn", "aol", "skype", "delicious", "adsense", "ebay", "bbc",
  "flickrpro", "bloglines", "encarta", "blogdex", "altavista", "gaia",
  "ajax", "analytics", "blogger", "ask", "apple", "dmoz", "askjeeves", "folklore", "android", "gamespot",
]);

/** @type {{ dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[]} */
const FLOWS = [
  { dest: "lastfm", href: "/years/2005/sites/lastfm/index.html", k1: "itt05-lastfm-lx", k2: "itt05-lastfm-rlx", verb1: "Scrobble", verb2: "Join", next2: "googleearth" },
  { dest: "googleearth", href: "/years/2005/sites/googleearth/index.html", k1: "itt05-googleearth", k2: "itt05-googleearth-d2", verb1: "Fly", verb2: "Tilt", next2: "reader" },
  { dest: "reader", href: "/years/2005/sites/reader/index.html", k1: "itt05-reader-lx", k2: "itt05-reader-lx-d2", verb1: "Subscribe feed", verb2: "Star", next2: "yelp" },
  { dest: "yelp", href: "/years/2005/sites/yelp/index.html", k1: "itt05-yelp-lx", k2: "itt05-yelp", verb1: "Write review", verb2: "Write another", next2: "odeo" },
  { dest: "odeo", href: "/years/2005/sites/odeo/index.html", k1: "itt05-odeo-lx", k2: "itt05-odeo-lx-d2", verb1: "Subscribe", verb2: "Create", next2: "secondlife" },
  { dest: "secondlife", href: "/years/2005/sites/secondlife/index.html", k1: "itt05-secondlife", k2: "itt05-secondlife-d2", verb1: "Teleport", verb2: "Rez", next2: "mashable" },
  { dest: "mashable", href: "/years/2005/sites/mashable/index.html", k1: "itt05-mash-lx", k2: "itt05-mash-lx-d2", verb1: "Open this post", verb2: "Open next post", next2: "xbox360" },
  { dest: "xbox360", href: "/years/2005/sites/xbox360/index.html", k1: "itt05-x360-lx", k2: "itt05-x360-lx-d2", verb1: "Launch-day leftover", verb2: "Line leftover", next2: "programmableweb" },
  { dest: "programmableweb", href: "/years/2005/sites/programmableweb/index.html", k1: "itt05-pw-lx", k2: "itt05-pw-lx-d2", verb1: "List an API", verb2: "Open a mashup", next2: "linkedin" },
  { dest: "linkedin", href: "/years/2005/sites/linkedin/index.html", k1: "itt05-li-lx", k2: "itt05-linkedin-rlx", verb1: "Open profile", verb2: "Send invite", next2: "invite" },
];

function destsFrom(html, attr) {
  const re = new RegExp(attr + '="2005"[\\s\\S]{0,8000}?</p>', "i");
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
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
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
  expect(String(blob.year), key + " year").toBe("2005");
  expect(await getKey(page, STAR), key + " wrote star").toBeFalsy();
  for (const off of OFFICIAL) {
    if (off === key) continue;
    expect(await getKey(page, off), key + " wrote " + off).toBeFalsy();
  }
}

test.describe("2005 leftover-2× unique dest-true", () => {
  test("ten dests are unused vs official 10 and leftover-3× home", async ({ page }) => {
    const res = await page.goto("/years/2005/pages/home.html");
    expect(res && res.ok()).toBeTruthy();
    const html = await page.content();
    const first = destsFrom(html, "data-itt-pop3x");
    const more = destsFrom(html, "data-itt-pop-more");
    const third = destsFrom(html, "data-itt-pop-3x3");
    const reserved = new Set([...first, ...more, ...third, ...FORBIDDEN_HOME]);
    for (const fl of FLOWS) {
      expect(reserved.has(fl.dest), fl.dest + " collided").toBeFalsy();
    }
    expect(new Set(FLOWS.map((f) => f.dest)).size).toBe(10);
    await revealLeftoverRails(page);
    const unique = page.locator("[data-itt-2x-unique='2005']");
    await expect(unique).toBeVisible();
    await unique.locator('a[href*="/lastfm/"]').click();
    await expect(page).toHaveURL(/\/sites\/lastfm\//);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next`, async ({ page }) => {
      await page.goto(fl.href);
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt05-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt05-/, "")}"])`).first();
      await expect(p1).toContainText(fl.verb1);
      await expect(p2).toContainText(fl.verb2);
      await expect(p1).toHaveAttribute("data-itt-dest-true", "1");
      await expect(p2).toHaveAttribute("data-itt-dest-true", "1");
      const next = p2.locator("[data-next-flow] a");
      await expect(next).toHaveAttribute("href", new RegExp(fl.next2));
    });

    test(`${fl.k1} empty/trap never write then complete`, async ({ page }) => {
      await completeLo(page, fl.href, fl.k1);
    });

    test(`${fl.k2} empty/trap never write then complete`, async ({ page }) => {
      await completeLo(page, fl.href, fl.k2);
    });
  }

  test("linkedin profile + invite leftover-2× dest-true", async ({ page }) => {
    await completeLo(page, "/years/2005/sites/linkedin/profile.html", "itt05-linkedin-profile");
    await completeLo(page, "/years/2005/sites/linkedin/invite.html", "itt05-linkedin-invite");
  });
});
