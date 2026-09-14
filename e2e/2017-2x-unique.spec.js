// @ts-check
/**
 * 2017 leftover-2× · 10 unique dest-true flows.
 * New dest folders (disk unused were official-about only).
 * Empty / trap / 0 ticks never write. Leftover keys never write the star.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

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
  "itt17-game-stormcircle",
];

const FORBIDDEN_HOME = new Set([
  "iphone", "fortnite", "twitter", "teams", "vine", "switch", "wannacry", "musically", "equifax", "playable",
  "snapipo", "bitcoinath", "echoshow", "reddit", "youtube", "hqtrivia", "notpetya", "yahoo3b", "discord17",
  "airpods17", "cmebtc", "fnstw", "ios11ar", "musically17", "pubgnote", "zoom17", "greyball", "jigsaw",
  "amazon", "android8", "bitmoji", "cloudbleed", "creditfrz", "flashend", "pixel2", "signal17", "telegram17",
  "applepark", "coreml", "homepodann", "iphone8", "nnrepeal", "watch3", "united", "kaspersky",
  "xboxonex", "slack17", "pixelbook", "bch", "facebook2b", "ios11", "krack", "odyssey", "vault7",
  "youtubetv", "teslasolar",
]);

/** @type {{ dest: string, href: string, k1: string, k2: string, verb1: string, verb2: string, next2: string }[]} */
const FLOWS = [
  { dest: "whatsapp", href: "/years/2017/sites/whatsapp/index.html", k1: "itt17-whatsapp-lx", k2: "itt17-whatsapp-d2", verb1: "Post a Status", verb2: "Watch a Status", next2: "snapmap" },
  { dest: "snapmap", href: "/years/2017/sites/snapmap/index.html", k1: "itt17-snapmap-lx", k2: "itt17-snapmap-d2", verb1: "Pinch to Map", verb2: "Ghost Mode leftover", next2: "googlelens" },
  { dest: "googlelens", href: "/years/2017/sites/googlelens/index.html", k1: "itt17-googlelens-lx", k2: "itt17-googlelens-d2", verb1: "Point at a thing", verb2: "Connect Wi-Fi leftover", next2: "botw" },
  { dest: "botw", href: "/years/2017/sites/botw/index.html", k1: "itt17-botw-lx", k2: "itt17-botw-d2", verb1: "Climb a tower", verb2: "Cook leftover", next2: "facebookwatch" },
  { dest: "facebookwatch", href: "/years/2017/sites/facebookwatch/index.html", k1: "itt17-facebookwatch-lx", k2: "itt17-facebookwatch-d2", verb1: "Open Watch", verb2: "Add to Watchlist", next2: "destiny2" },
  { dest: "destiny2", href: "/years/2017/sites/destiny2/index.html", k1: "itt17-destiny2-lx", k2: "itt17-destiny2-d2", verb1: "Launch leftover", verb2: "Fireteam leftover", next2: "cuphead" },
  { dest: "cuphead", href: "/years/2017/sites/cuphead/index.html", k1: "itt17-cuphead-lx", k2: "itt17-cuphead-d2", verb1: "Fight a boss", verb2: "Co-op leftover", next2: "snesclassic" },
  { dest: "snesclassic", href: "/years/2017/sites/snesclassic/index.html", k1: "itt17-snesclassic-lx", k2: "itt17-snesclassic-d2", verb1: "Pick a cart", verb2: "Two-player leftover", next2: "model3" },
  { dest: "model3", href: "/years/2017/sites/model3/index.html", k1: "itt17-model3-lx", k2: "itt17-model3-d2", verb1: "Take delivery", verb2: "Configure leftover", next2: "netflix" },
  { dest: "netflix", href: "/years/2017/sites/netflix/index.html", k1: "itt17-netflix-lx", k2: "itt17-netflix-d2", verb1: "Play Part 2", verb2: "My List leftover", next2: "home.html" },
];

function destsFrom(html, attr) {
  const re = new RegExp(attr + '="2017"[\\s\\S]{0,8000}?</p>', "i");
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
  const suffix = key.replace(/^itt17-/, "");
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
  expect(String(blob.year), key + " year").toBe("2017");
  expect(await getKey(page, STAR), key + " wrote star").toBeFalsy();
  for (const off of OFFICIAL) {
    if (off === key) continue;
    expect(await getKey(page, off), key + " wrote " + off).toBeFalsy();
  }
}

test.describe("2017 leftover-2× unique dest-true", () => {
  test("ten dests are unused vs official 10 and leftover-3× home", async ({ page }) => {
    const res = await page.goto("/years/2017/pages/home.html");
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
    const lo3 = first.join(" ") + " " + more.join(" ") + " " + third.join(" ");
    for (const fl of FLOWS) {
      expect(lo3.includes(fl.dest), fl.dest + " on leftover-3×").toBeFalsy();
    }
    await revealLeftoverRails(page);
    const unique = page.locator("[data-itt-2x-unique='2017']");
    await expect(unique).toBeVisible();
    for (const fl of FLOWS) {
      await expect(unique.locator(`a[href*="/${fl.dest}/"]`)).toHaveCount(1);
    }
    await unique.locator('a[href*="/whatsapp/"]').click();
    await expect(page).toHaveURL(/\/sites\/whatsapp\//);
  });

  for (const fl of FLOWS) {
    test(`${fl.dest} leftover-2× dest-true verbs + Next`, async ({ page }) => {
      await page.goto(fl.href);
      await revealLeftoverRails(page);
      const p1 = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${fl.k1.replace(/^itt17-/, "")}"])`).first();
      const p2 = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${fl.k2.replace(/^itt17-/, "")}"])`).first();
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

  test("leftover-4× stays 0 on these dests", async ({ page }) => {
    for (const fl of FLOWS) {
      const res = await page.goto(fl.href);
      expect(res && res.ok(), fl.dest).toBeTruthy();
      await expect(page.locator("[data-4x-panel]")).toHaveCount(0);
      await expect(page.locator("[data-4x-go]")).toHaveCount(0);
    }
  });
});
