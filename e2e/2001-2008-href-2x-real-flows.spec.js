// @ts-check
/**
 * 2001–2008 href-2× leftover walks — dests already on disk.
 * Year-true leftover-official machines only (needPick / minPick≥2).
 * Trap / empty / ticks-only / wrong pick never write.
 * Complete leftover writes leftover key, not the star.
 * 2001–2003 leftover-18 dest freeze. No dest invention.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

/** @typedef {{ href: string, suffix: string, needPick: string, minPick: number, field: boolean, placeholder: string }} LoDest */

const YEARS = [
  {
    year: "2001",
    star: "itt01-wiki",
    gold: "/years/2001/sites/wikipedia/edit.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2001/sites/yahoo/index.html", suffix: "yahoo", needPick: "news", minPick: 0, field: false, placeholder: "" },
      { href: "/years/2001/sites/amazon/index.html", suffix: "amz", needPick: "book", minPick: 0, field: true, placeholder: "leftover book" },
      { href: "/years/2001/sites/google/index.html", suffix: "google", needPick: "q", minPick: 0, field: true, placeholder: "leftover query" },
    ]),
  },
  {
    year: "2002",
    star: "itt02-stumble",
    gold: "/years/2002/sites/stumbleupon/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2002/sites/yahoo/index.html", suffix: "yahoo", needPick: "news", minPick: 0, field: false, placeholder: "" },
      { href: "/years/2002/sites/amazon/index.html", suffix: "amz", needPick: "book", minPick: 0, field: true, placeholder: "leftover book" },
      { href: "/years/2002/sites/stumbleupon/more.html", suffix: "su-lx", needPick: "tb", minPick: 0, field: true, placeholder: "toolbar leftover" },
    ]),
  },
  {
    year: "2003",
    star: "itt03-photobucket",
    gold: "/years/2003/sites/photobucket/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2003/sites/yahoo/index.html", suffix: "yahoo", needPick: "news", minPick: 0, field: false, placeholder: "" },
      { href: "/years/2003/sites/photobucket/album.html", suffix: "pb-lx", needPick: "alb", minPick: 0, field: true, placeholder: "vacation leftover" },
      { href: "/years/2003/sites/skype/index.html", suffix: "skype", needPick: "call", minPick: 0, field: true, placeholder: "leftover name" },
    ]),
  },
  {
    year: "2004",
    star: "itt04-thefacebook-networks",
    gold: "/years/2004/sites/facebook/networks.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2004/sites/facebook/friends.html", suffix: "fb-friends", needPick: "add", minPick: 0, field: true, placeholder: "leftover name" },
      { href: "/years/2004/sites/gmail/index.html", suffix: "gmail", needPick: "invite", minPick: 0, field: true, placeholder: "wait@museum" },
      { href: "/years/2004/sites/flickr/index.html", suffix: "flickr", needPick: "photo", minPick: 0, field: true, placeholder: "leftover photo" },
    ]),
  },
  {
    year: "2005",
    star: "itt05-yt-uploads",
    gold: "/years/2005/sites/youtube/upload.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2005/sites/facebook/friends.html", suffix: "fb-friends", needPick: "add", minPick: 0, field: true, placeholder: "leftover name" },
      { href: "/years/2005/sites/gmail/index.html", suffix: "gmail", needPick: "invite", minPick: 0, field: true, placeholder: "wait@museum" },
      { href: "/years/2005/sites/delicious/index.html", suffix: "delicious", needPick: "tag", minPick: 0, field: true, placeholder: "leftover" },
    ]),
  },
  {
    year: "2006",
    star: "itt06-tweets",
    gold: "/years/2006/sites/twitter/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2006/sites/twitter/index.html", suffix: "t140", needPick: "go", minPick: 0, field: true, placeholder: "leftover" },
      { href: "/years/2006/sites/youtube/index.html", suffix: "yt", needPick: "watch", minPick: 0, field: true, placeholder: "leftover yt" },
      { href: "/years/2006/sites/facebook/feed.html", suffix: "facebook-feed", needPick: "go", minPick: 0, field: true, placeholder: "leftover" },
    ]),
  },
  {
    year: "2007",
    star: "itt07-iphone",
    gold: "/years/2007/sites/iphone/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2007/sites/facebook/index.html", suffix: "facebook-c", needPick: "", minPick: 2, field: false, placeholder: "" },
      { href: "/years/2007/sites/gmail/more.html", suffix: "gmail-2", needPick: "", minPick: 2, field: false, placeholder: "" },
      { href: "/years/2007/sites/youtube/more.html", suffix: "youtube-2", needPick: "", minPick: 2, field: false, placeholder: "" },
    ]),
  },
  {
    year: "2008",
    star: "itt08-github",
    gold: "/years/2008/sites/github/issue.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2008/sites/facebook/index.html", suffix: "facebook", needPick: "feed", minPick: 0, field: false, placeholder: "" },
      { href: "/years/2008/sites/youtube/index.html", suffix: "yt", needPick: "watch", minPick: 0, field: false, placeholder: "" },
      { href: "/years/2008/sites/twitter/index.html", suffix: "tweets", needPick: "140", minPick: 0, field: true, placeholder: "leftover tweet" },
    ]),
  },
];

const DEST_HTML_FREEZE = {
  2001: { dests: 29, html: 101 },
  2002: { dests: 26, html: 84 },
  2003: { dests: 23, html: 93 },
  2004: { dests: 90, html: 319 },
  2005: { dests: 117, html: 362 },
  2006: { dests: 126, html: 385 },
  2007: { dests: 55, html: 139 },
  2008: { dests: 105, html: 353 },
};

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * Leftover-official full contract on one dest already on disk.
 * @param {import("@playwright/test").Page} page
 * @param {LoDest} dest
 * @param {string} year
 * @param {string} star
 */
async function completeLeftover(page, dest, year, star) {
  const key = "itt" + year.slice(2) + "-" + dest.suffix;
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${dest.suffix}"])`).first();
  await page.goto(dest.href);
  await lo.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction(
    (suf) => {
      const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
      return !!(b && b.getAttribute("data-lo-bound") === "1");
    },
    dest.suffix,
    { timeout: 20000 }
  );
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.evaluate((k) => localStorage.removeItem(k), star);

  if ((await lo.locator("[data-lo-trap]").count()) > 0) {
    await lo.locator("[data-lo-trap]").first().click();
    expect(await getKey(page, key), key + " trap").toBeFalsy();
  }

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, key), key + " 0 ticks").toBeFalsy();

  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  expect(nReq, key + " leftover reqs").toBeGreaterThanOrEqual(2);
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();

  await lo.locator("[data-lo-save]").first().click();
  expect(await getKey(page, key), key + " ticks only").toBeFalsy();

  if (dest.needPick) {
    const picks = lo.locator("[data-lo-pick]");
    const nPick = await picks.count();
    for (let i = 0; i < nPick; i++) {
      const id = await picks.nth(i).getAttribute("data-lo-pick");
      if (id && id !== dest.needPick) {
        await picks.nth(i).click();
        await lo.locator("[data-lo-save]").first().click();
        expect(await getKey(page, key), key + " wrong pick").toBeFalsy();
        break;
      }
    }
    await lo.locator(`[data-lo-pick="${dest.needPick}"]`).first().click();
  } else if (dest.minPick) {
    const picks = lo.locator("[data-lo-pick]");
    const n = await picks.count();
    expect(n, key + " min picks present").toBeGreaterThanOrEqual(dest.minPick);
    for (let i = 0; i < dest.minPick; i++) await picks.nth(i).click();
  }

  if (dest.field) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, key), key + " empty field").toBeFalsy();
    const ph = dest.placeholder || "museum leftover";
    await lo.locator("[data-lo-field]").first().fill(ph.length >= 2 ? ph : ph + "xx");
  }

  if ((await lo.locator("[data-lo-wait]").count()) > 0) {
    await lo.locator("[data-lo-save]").first().click();
    expect(await getKey(page, key), key + " skip wait").toBeFalsy();
    await lo.locator("[data-lo-wait]").first().click();
    await page.waitForTimeout(1000);
  }

  await lo.locator("[data-lo-save]").first().click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const rec = JSON.parse((await getKey(page, key)) || "{}");
  expect(rec.real, key + " real").toBeTruthy();
  expect(rec.leftover, key + " leftover").toBeTruthy();
  expect(String(rec.year), key + " year").toBe(year);
  expect(rec.multiStep, key + " multi").toBeTruthy();
  expect(await getKey(page, star), star + " leftover must not write gold").toBeFalsy();
}

/**
 * After leftover, follow a 2× leftover hop to another dest on disk.
 * @param {import("@playwright/test").Page} page
 * @param {string} year
 * @param {string} fromHref
 */
async function hopLeftover2x(page, year, fromHref) {
  const strip = page.locator("[data-itt-2x-links]").first();
  await expect(strip, fromHref + " 2× leftover strip").toBeVisible();
  const hrefs = await strip.locator("a[href^='../']").evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute("href")).filter(Boolean))]
  );
  const here = fromHref.replace(/\/years\/\d{4}\/sites\//, "").split("/")[0];
  const destHops = hrefs.filter((h) => {
    const m = h.match(/^\.\.\/([^./][^/]*)\/[^/]+\.html$/);
    if (!m) return false;
    const slug = m[1];
    return slug !== here && slug !== "playable" && slug !== "pages";
  });
  expect(destHops.length, fromHref + " leftover dest hops").toBeGreaterThan(0);
  const nextRel =
    destHops.find((h) =>
      /\/(yahoo|amazon|google|wikipedia|facebook|youtube|gmail|flickr|reddit|twitter|skype|delicious|stumbleupon|photobucket)\//.test(
        h
      )
    ) || destHops[0];
  const abs = new URL(nextRel, page.url()).pathname;
  const res = await page.request.get(abs);
  expect(res.status(), abs).toBe(200);
  const file = path.join(ROOT, abs.replace(/^\//, ""));
  expect(fs.existsSync(file), abs + " on disk").toBeTruthy();
  const html = fs.readFileSync(file, "utf8");
  expect(html.includes("data-lo-save"), abs + " leftover machine").toBeTruthy();
  await expect(strip.locator(`a[href="${nextRel}"]`).first()).toBeVisible();
  await page.goto(abs);
  await expect(page).not.toHaveURL(/404/);
  expect(page.url()).toContain("/years/" + year + "/sites/");
  await expect(page.locator("[data-lo-save]").first()).toBeVisible({ timeout: 15000 });
}

test.describe("2001–2008 href-2× gold hops are leftover dests on disk", () => {
  for (const y of YEARS) {
    test(`${y.year} gold 2× hops 200 + leftover machine`, async ({ page }) => {
      await page.goto(y.gold);
      const hrefs = await page
        .locator("[data-itt-2x-links] a[href*='../'], [data-itt-3x-also] a[href*='../']")
        .evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")).filter(Boolean))]);
      expect(hrefs.length, y.year + " hop count").toBeGreaterThan(3);
      const sample = hrefs
        .filter((h) =>
          /\/(yahoo|amazon|google|wikipedia|facebook|youtube|gmail|flickr|reddit|twitter|skype|delicious|stumbleupon|photobucket)\//.test(
            h
          )
        )
        .slice(0, 6);
      const walk = sample.length ? sample : hrefs.slice(0, 5);
      for (const h of walk) {
        const abs = new URL(h, page.url()).pathname;
        const res = await page.request.get(abs);
        expect(res.status(), abs).toBe(200);
        const file = path.join(ROOT, abs.replace(/^\//, ""));
        expect(fs.existsSync(file), abs + " on disk").toBeTruthy();
        const html = fs.readFileSync(file, "utf8");
        expect(html.includes("data-lo-save"), abs + " leftover machine").toBeTruthy();
      }
    });
  }
});

test.describe("2001–2008 leftover dests are real full leftover-official flows", () => {
  for (const y of YEARS) {
    for (const dest of y.leftover) {
      const file = path.join(ROOT, dest.href.replace(/^\//, ""));
      test(`${y.year} ${dest.href} trap empty wrong · leftover · not star · 2× hop`, async ({ page }) => {
        expect(fs.existsSync(file), dest.href + " missing").toBeTruthy();
        const html = fs.readFileSync(file, "utf8");
        expect(html.includes('data-lo-key="' + dest.suffix + '"'), dest.href + " " + dest.suffix).toBeTruthy();
        await completeLeftover(page, dest, y.year, y.star);
        await hopLeftover2x(page, y.year, dest.href);
      });
    }
  }
});

test.describe("2001–2008 dest / leftover-18 freeze", () => {
  test("dest folder and HTML counts stay frozen", () => {
    for (const [y, n] of Object.entries(DEST_HTML_FREEZE)) {
      const dir = path.join(ROOT, "years", y, "sites");
      const dests = fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
      const htmls = [];
      const stack = [path.join(ROOT, "years", y)];
      while (stack.length) {
        const cur = stack.pop();
        for (const name of fs.readdirSync(cur)) {
          const full = path.join(cur, name);
          const st = fs.statSync(full);
          if (st.isDirectory()) stack.push(full);
          else if (name.endsWith(".html")) htmls.push(full);
        }
      }
      expect(dests.length, y + " dests").toBe(n.dests);
      expect(htmls.length, y + " html").toBe(n.html);
    }
  });
});
