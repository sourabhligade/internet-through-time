// @ts-check
/**
 * CUT-3X-2010-2015 — leftover 3× dest-minutes, E2E, not mock.
 * Live years 2010 / 2011 / 2012 / 2014: 9 doors each.
 * 2013 stays boarded. Stars / guided 6 / official gold stay put.
 * 2015 leftover 3× already ships in 2015-2020-3x-cut.spec.js.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

/** @type {Record<string, { star: string, gold: string[], wantMore: RegExp[], doors: { dest: string, go: string, key: string, next: string }[] }>} */
const LIVE = {
  2010: {
    star: "itt10-ig-posts",
    gold: ["itt10-ig-posts", "itt10-iphone4", "itt10-ipad", "itt10-fb-og"],
    wantMore: [/groupondeal/, /quorawait/, /instant/],
    doors: [
      { dest: "/years/2010/sites/netflix/index.html", go: "[data-pop-go][data-pop-id='netflix']", key: "itt10-pop-netflix", next: "tumblr/index.html" },
      { dest: "/years/2010/sites/tumblr/index.html", go: "[data-pop-go][data-pop-id='tumblr']", key: "itt10-pop-tumblr", next: "formspring/index.html" },
      { dest: "/years/2010/sites/formspring/index.html", go: "[data-pop-go][data-pop-id='formspring']", key: "itt10-pop-formspring", next: "groupondeal/index.html" },
      { dest: "/years/2010/sites/groupondeal/index.html", go: "[data-pop-go][data-pop-id='groupondeal']", key: "itt10-pop-groupondeal", next: "quorawait/index.html" },
      { dest: "/years/2010/sites/quorawait/index.html", go: "[data-pop-go][data-pop-id='quorawait']", key: "itt10-pop-quorawait", next: "instant/index.html" },
      { dest: "/years/2010/sites/instant/index.html", go: "[data-pop-go][data-pop-id='instant']", key: "itt10-pop-instant", next: "chrome/index.html" },
      { dest: "/years/2010/sites/chrome/index.html", go: "[data-pop-go][data-pop-key='pop3-chrome']", key: "itt10-pop3-chrome", next: "wave/index.html" },
      { dest: "/years/2010/sites/wave/index.html", go: "[data-pop-go][data-pop-key='pop3-wave']", key: "itt10-pop3-wave", next: "android/index.html" },
      { dest: "/years/2010/sites/android/index.html", go: "[data-pop-go][data-pop-key='pop3-android']", key: "itt10-pop3-android", next: "instagram/index.html" },
    ],
  },
  2011: {
    star: "itt11-gplus",
    gold: ["itt11-gplus", "itt11-airbnb", "itt11-qwikster", "itt11-ipad2", "itt11-tweets"],
    wantMore: [/kindlefire/, /minecraft/, /twitch/],
    doors: [
      { dest: "/years/2011/sites/icloud/index.html", go: "[data-pop-go][data-pop-id='icloud']", key: "itt11-pop-icloud", next: "pinterest/index.html" },
      { dest: "/years/2011/sites/pinterest/index.html", go: "[data-pop-go][data-pop-id='pinterest']", key: "itt11-pop-pinterest", next: "linkedin/index.html" },
      { dest: "/years/2011/sites/linkedin/index.html", go: "[data-pop-go][data-pop-id='linkedin']", key: "itt11-pop-linkedin", next: "kindlefire/index.html" },
      { dest: "/years/2011/sites/kindlefire/index.html", go: "[data-pop-go][data-pop-id='kindlefire']", key: "itt11-pop-kindlefire", next: "minecraft/index.html" },
      { dest: "/years/2011/sites/minecraft/index.html", go: "[data-pop-go][data-pop-id='minecraft']", key: "itt11-pop-minecraft", next: "twitch/index.html" },
      { dest: "/years/2011/sites/twitch/index.html", go: "[data-pop-go][data-pop-id='twitch']", key: "itt11-pop-twitch", next: "youtube/index.html" },
      { dest: "/years/2011/sites/youtube/index.html", go: "[data-pop-go][data-pop-key='pop3-youtube']", key: "itt11-pop3-youtube", next: "hulu/index.html" },
      { dest: "/years/2011/sites/reddit/index.html", go: "[data-pop-go][data-pop-key='pop3-reddit']", key: "itt11-pop3-reddit", next: "twitter/index.html" },
      { dest: "/years/2011/sites/twitter/index.html", go: "[data-pop-go][data-pop-key='pop3-twitter']", key: "itt11-pop3-twitter", next: "youtube/index.html" },
    ],
  },
  2012: {
    star: "itt12-ig-android",
    gold: ["itt12-ig-android", "itt12-facebook", "itt12-maps", "itt12-sopa", "itt12-pop-medium"],
    wantMore: [/uber/, /buzzfeed/, /youtube/],
    doors: [
      { dest: "/years/2012/sites/drawsomething/index.html", go: "[data-pop-go][data-pop-id='drawsomething']", key: "itt12-pop-drawsomething", next: "googledrive/index.html" },
      { dest: "/years/2012/sites/googledrive/index.html", go: "[data-pop-go][data-pop-id='googledrive']", key: "itt12-pop-googledrive", next: "snapchat/index.html" },
      { dest: "/years/2012/sites/snapchat/index.html", go: "[data-pop-go][data-pop-id='snapchat']", key: "itt12-pop-snapchat", next: "uber/index.html" },
      { dest: "/years/2012/sites/uber/index.html", go: "[data-pop-go][data-pop-id='uber']", key: "itt12-pop-uber", next: "buzzfeed/index.html" },
      { dest: "/years/2012/sites/buzzfeed/index.html", go: "[data-pop-go][data-pop-id='buzzfeed']", key: "itt12-pop-buzzfeed", next: "youtube/index.html" },
      { dest: "/years/2012/sites/youtube/index.html", go: "[data-pop-go][data-pop-id='youtube']", key: "itt12-pop-youtube", next: "reddit/index.html" },
      { dest: "/years/2012/sites/reddit/index.html", go: "[data-pop-go][data-pop-key='pop3-reddit']", key: "itt12-pop3-reddit", next: "surface/index.html" },
      { dest: "/years/2012/sites/surface/index.html", go: "[data-pop-go][data-pop-key='pop3-surface']", key: "itt12-pop3-surface", next: "windows8/index.html" },
      { dest: "/years/2012/sites/windows8/index.html", go: "[data-pop-go][data-pop-key='pop3-windows8']", key: "itt12-pop3-windows8", next: "instagram/android.html" },
    ],
  },
  2014: {
    star: "itt14-wa-install",
    gold: ["itt14-wa-install", "itt14-heartbleed", "itt14-icebucket", "itt14-slack"],
    wantMore: [/oculus/, /serial/, /ello/],
    doors: [
      { dest: "/years/2014/sites/snapchat/index.html", go: "[data-pop-go][data-pop-id='snapchat']", key: "itt14-pop-snapchat", next: "instagram/index.html" },
      { dest: "/years/2014/sites/instagram/index.html", go: "[data-pop-go][data-pop-id='instagram']", key: "itt14-pop-instagram", next: "uber/index.html" },
      { dest: "/years/2014/sites/uber/index.html", go: "[data-pop-go][data-pop-id='uber']", key: "itt14-pop-uber", next: "oculus/index.html" },
      { dest: "/years/2014/sites/oculus/index.html", go: "[data-pop-go][data-pop-id='oculus']", key: "itt14-pop-oculus", next: "serial/index.html" },
      { dest: "/years/2014/sites/serial/index.html", go: "[data-pop-go][data-pop-id='serial']", key: "itt14-pop-serial", next: "ello/index.html" },
      { dest: "/years/2014/sites/ello/index.html", go: "[data-pop-go][data-pop-id='ello']", key: "itt14-pop-ello", next: "youtube/index.html" },
      { dest: "/years/2014/sites/youtube/index.html", go: "[data-pop-go][data-pop-key='pop3-youtube']", key: "itt14-pop3-youtube", next: "wikipedia/index.html" },
      { dest: "/years/2014/sites/wikipedia/index.html", go: "[data-pop-go][data-pop-key='pop3-wikipedia']", key: "itt14-pop3-wikipedia", next: "facebook/index.html" },
      { dest: "/years/2014/sites/facebook/index.html", go: "[data-pop-go][data-pop-key='pop3-facebook']", key: "itt14-pop3-facebook", next: "whatsapp/index.html" },
    ],
  },
};

function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {{ dest: string, go: string, key: string, next: string }} door
 * @param {string[]} gold
 */
async function walkDoor(page, door, gold) {
  await page.goto(door.dest);
  await page.evaluate((k) => localStorage.removeItem(k), door.key);
  for (const g of gold) await page.evaluate((k) => localStorage.removeItem(k), g);
  const y = door.key.slice(3, 5);
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) - 1).padStart(2, "0"));
  await page.evaluate((p) => localStorage.removeItem("itt" + p + "-x"), String(Number(y) + 1).padStart(2, "0"));
  await page.reload();
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
  const panel = page
    .locator(`${door.go}`)
    .first()
    .locator("xpath=ancestor::*[@data-pop-panel='1' or contains(@class,'itt-pop3') or contains(@class,'itt-pop3x-flow')][1]");
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
  for (const g of gold) {
    expect(await getKey(page, g), door.key + " must not write " + g).toBeFalsy();
  }
  const next = page.locator(`[data-next-when-key="${door.key}"] a`).first();
  await expect(next).toBeVisible();
  const href = (await next.getAttribute("href")) || "";
  expect(href).toContain(door.next);
}

test.describe("CUT-3X-2010-2015 boarded stay empty", () => {
  test("2013 is a live lean door", () => {
    expect(fs.existsSync(path.join(ROOT, "years", "2013", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2013", "sites", "vine", "record.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2013", "sites", "healthcare"))).toBe(false);
  });

  test("dest folder counts stay locked", () => {
    const want = { 2010: 44, 2011: 98, 2012: 45, 2014: 21 };
    for (const [y, n] of Object.entries(want)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const folders = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
      expect(folders.length, y + " dest folders").toBe(n);
    }
  });
});

for (const [year, spec] of Object.entries(LIVE)) {
  test.describe(`${year} leftover 3× nine doors`, () => {
    test(`home strips are 3+3+3 unique and not the star`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const first = page.locator(`[data-itt-pop3x="${year}"]`).first().locator('a[href*="sites/"]');
      const more = page.locator(`[data-itt-pop-more="${year}"]`).first().locator('a[href*="sites/"]');
      const third = page.locator(`[data-itt-pop-3x3="${year}"]`).first().locator('a[href*="sites/"]');
      const STRIP = {
        2010: { first: 9, more: 9, third: 9 },
        2011: { first: 18, more: 18, third: 18 },
        2012: { first: 9, more: 9, third: 9 },
        2014: { first: 6, more: 3, third: 9 },
      };
      const want = STRIP[year];
      await expect(first).toHaveCount(want.first);
      await expect(more).toHaveCount(want.more);
      await expect(third).toHaveCount(want.third);
      const all = [
        ...(await first.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
        ...(await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
        ...(await third.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))),
      ];
      const keys = all.map((h) => (String(h).match(/sites\/[^?#]+/) || [h])[0]);
      expect(new Set(keys).size).toBe(want.first + want.more + want.third);
      const star = (await page.locator(`[data-ott-one-thing="${year}"]`).getAttribute("href")) || "";
      const starK = (star.match(/sites\/[^?#]+/) || [star])[0];
      expect(keys).not.toContain(starK);
      const moreJoined = (await more.evaluateAll((as) => as.map((a) => a.getAttribute("href") || ""))).join(" ");
      for (const re of spec.wantMore) expect(moreJoined).toMatch(re);
      for (const h of all) {
        const dest = h.replace(/^\.\.\//, `/years/${year}/`);
        const res = await page.goto(dest);
        expect(res && res.ok(), dest).toBeTruthy();
      }
    });

    test(`map lists all 9 leftover 3× hrefs`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/map.html`);
      for (const door of spec.doors) {
        const slug = door.dest.replace(`/years/${year}/sites/`, "");
        await expect(page.locator(`a[href*="${slug}"]`).first()).toBeVisible();
      }
    });

    for (const door of spec.doors) {
      test(`${door.key} trap/empty never write · complete writes · gold empty`, async ({ page }) => {
        await walkDoor(page, door, spec.gold);
      });
    }
  });
}

const ABOUT = {
  2010: { print: ["206,956,723"] },
  2011: { print: ["346,004,403"] },
  2012: { print: ["697,089,489"] },
  2014: { print: ["968,882,453"] },
};

const STAR_WALK = {
  2010: {
    path: "/years/2010/sites/instagram/index.html",
    key: "itt10-ig-posts",
    empty: async (page) => {
      await page.locator("[data-ig-share]").click();
    },
    complete: async (page) => {
      await page.locator("[data-ig-filter='X-Pro II']").click();
      await page.locator("[data-ig-photo='dinner']").click();
      await page.fill("[data-ig-caption]", "Dinner.");
      await page.locator("[data-ig-share]").click();
    },
  },
  2011: {
    path: "/years/2011/sites/googleplus/index.html",
    key: "itt11-gplus",
    empty: async (page) => {
      await page.locator("[data-gp11-hangout]").click();
    },
    complete: async (page) => {
      await page.fill("[data-gp11-circle]", "Friends");
      await page.locator("[data-gp11-person='ada']").click();
      await page.locator("[data-gp11-person='al']").click();
      await page.locator("[data-gp11-hangout]").click();
    },
  },
  2012: {
    path: "/years/2012/sites/instagram/android.html",
    key: "itt12-ig-android",
    empty: async (page) => {
      await page.locator("[data-ig12-share]").click();
    },
    complete: async (page) => {
      await page.locator("[data-ig12-photo='dinner']").click();
      await page.locator("[data-ig12-filter='X-Pro II']").click();
      await page.fill("[data-ig12-caption]", "Android leftover");
      await page.locator("[data-ig12-share]").click();
    },
  },
  2014: {
    path: "/years/2014/sites/whatsapp/index.html",
    key: "itt14-wa-install",
    empty: async (page) => {
      await page.locator("[data-wa14-install]").click();
    },
    complete: async (page) => {
      await page.locator("[data-wa14-deal='16b']").click();
      await page.locator("[data-wa14-deal='rsu']").click();
      await page.locator("[data-wa14-install]").click();
    },
  },
};

test.describe("CUT-3X-2010-2015 visitor machine · About · star", () => {
  for (const [year, about] of Object.entries(ABOUT)) {
    test(`${year} About prints ILS and does not write gold`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/about.html`);
      for (const s of about.print) await expect(page.locator("body")).toContainText(s);
      expect(await getKey(page, LIVE[year].star)).toBeFalsy();
    });
  }

  for (const [year, star] of Object.entries(STAR_WALK)) {
    test(`${year} star empty never writes · complete writes ${star.key}`, async ({ page }) => {
      await page.goto(star.path);
      await page.evaluate((k) => localStorage.removeItem(k), star.key);
      await page.reload();
      await star.empty(page);
      expect(await getKey(page, star.key)).toBeFalsy();
      await star.complete(page);
      await expect.poll(() => getKey(page, star.key), { timeout: 8000 }).toBeTruthy();
    });
  }
});
