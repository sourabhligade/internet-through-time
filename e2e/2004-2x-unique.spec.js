// @ts-check
/**
 * 2004 leftover-2× · 10 unique dest-true flows.
 * Dest folders unused vs official 10 and leftover-3× first/second/third.
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const STAR = "itt04-thefacebook-networks";
const OFFICIAL = [
  "itt04-thefacebook-networks",
  "itt04-gmail",
  "itt04-fx",
  "itt04-flickr",
  "itt04-delicious",
  "itt04-digg",
  "itt04-fb-friends",
  "itt04-fb-profile",
  "itt04-fb-invite",
  "itt04-web20",
];

const FORBIDDEN_HOME = new Set([
  "facebook", "gmail", "firefox", "flickr", "delicious", "digg", "web20conference",
  "myspace", "wikipedia", "yahoo", "skype", "livejournal", "friendster", "cnn", "bbc", "imdb",
  "amazon", "ebay", "orkut", "craigslist", "wow", "linkedin", "wordpress", "itunes", "bloglines",
  "adsense", "google", "msn",
]);

/** @type {{ dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[]} */
const FLOWS = [
  { dest: "yelp", href: "/years/2004/sites/yelp/index.html", k1: "itt04-yelp-lx", k2: "itt04-yelp", verb1: "Ask leftover", verb2: "Invite leftover", next2: "basecamp" },
  { dest: "basecamp", href: "/years/2004/sites/basecamp/index.html", k1: "itt04-bc-lx", k2: "itt04-bc-lx-d2", verb1: "Create leftover", verb2: "Post leftover", next2: "worldofwarcraft" },
  { dest: "worldofwarcraft", href: "/years/2004/sites/worldofwarcraft/index.html", k1: "itt04-wow", k2: "itt04-wow-lx", verb1: "Create leftover", verb2: "Enter leftover", next2: "feedburner" },
  { dest: "feedburner", href: "/years/2004/sites/feedburner/index.html", k1: "itt04-fburn-lx", k2: "itt04-fburn", verb1: "Burn leftover", verb2: "Subscribe leftover", next2: "blogger" },
  { dest: "blogger", href: "/years/2004/sites/blogger/index.html", k1: "itt04-blogger-rlx", k2: "itt04-blogger-rlx-d2", verb1: "Publish leftover", verb2: "Post leftover", next2: "netflix" },
  { dest: "netflix", href: "/years/2004/sites/netflix/index.html", k1: "itt04-netflix-rlx", k2: "itt04-netflix-rlx-d2", verb1: "Queue leftover", verb2: "Envelope leftover", next2: "steam" },
  { dest: "steam", href: "/years/2004/sites/steam/index.html", k1: "itt04-steam-rlx", k2: "itt04-steam-rlx-d2", verb1: "Install leftover", verb2: "Play leftover", next2: "piczo" },
  { dest: "piczo", href: "/years/2004/sites/piczo/index.html", k1: "itt04-pz-lx", k2: "itt04-piczo", verb1: "Build leftover", verb2: "Decorate leftover", next2: "tagged" },
  { dest: "tagged", href: "/years/2004/sites/tagged/index.html", k1: "itt04-tg-lx", k2: "itt04-tagged", verb1: "Tag leftover", verb2: "Add leftover", next2: "paypal" },
  { dest: "paypal", href: "/years/2004/sites/paypal/index.html", k1: "itt04-paypal-rlx", k2: "itt04-paypal-rlx-d2", verb1: "Send leftover", verb2: "Pay leftover", next2: "home" },
];

function destsFrom(html, attr) {
  const re = new RegExp(attr + '="2004"[\\s\\S]{0,8000}?</p>', "i");
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
  const suffix = key.replace(/^itt04-/, "");
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
  expect(String(blob.year), key + " year").toBe("2004");
  expect(await getKey(page, STAR), key + " wrote star").toBeFalsy();
  for (const off of OFFICIAL) {
    if (off === key) continue;
    expect(await getKey(page, off), key + " wrote " + off).toBeFalsy();
  }
}

test.describe("2004 leftover-2× unique dest-true", () => {
  test("ten dests are unused vs official 10 and leftover-3× home", async ({ page }) => {
    const res = await page.goto("/years/2004/pages/home.html");
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
    const unique = page.locator("[data-itt-2x-unique='2004']");
    await expect(unique).toBeVisible();
    await unique.locator('a[href*="/yelp/"]').click();
    await expect(page).toHaveURL(/\/sites\/yelp\//);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next`, async ({ page }) => {
      await page.goto(fl.href);
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt04-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt04-/, "")}"])`).first();
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
  }
});
