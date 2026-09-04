// @ts-check
/**
 * 1994–2000 + 2009 href-2× leftover walks — dests already on disk.
 * Year-true leftover-official machines only (needPick / minPick≥2).
 * Trap / empty / ticks-only / wrong pick never write.
 * Complete leftover writes leftover key, not the star.
 * Dest / HTML freeze. No dest invention.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");

/** @typedef {{ href: string, suffix: string, needPick: string, minPick: number, field: boolean, placeholder: string }} LoDest */

const YEARS = [
  {
    year: "1994",
    star: "itt94-csotd",
    gold: "/years/1994/sites/csotd/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/1994/sites/yahoo/index.html", suffix: "yahoo-wander", needPick: "browse", minPick: 0, field: false, placeholder: "" },
      { href: "/years/1994/sites/cern/index.html", suffix: "cern", needPick: "path", minPick: 0, field: true, placeholder: "info.cern" },
      { href: "/years/1994/sites/lycos/index.html", suffix: "lycos", needPick: "cat", minPick: 0, field: true, placeholder: "leftover query" },
    ]),
  },
  {
    year: "1995",
    star: "itt95-ssl-checkout",
    gold: "/years/1995/sites/amazon/ssl-checkout.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/1995/sites/amazon/index.html", suffix: "amazon", needPick: "book", minPick: 0, field: true, placeholder: "a leftover book" },
      { href: "/years/1995/sites/altavista/index.html", suffix: "av", needPick: "q", minPick: 0, field: true, placeholder: "leftover query" },
      { href: "/years/1995/sites/geocities/homestead.html", suffix: "homestead", needPick: "west", minPick: 0, field: true, placeholder: "leftover neighborhood" },
    ]),
  },
  {
    year: "1996",
    star: "itt96-portal-wars",
    gold: "/years/1996/sites/portals/wars.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/1996/sites/hotmail/index.html", suffix: "hotmail-user", needPick: "compose", minPick: 0, field: true, placeholder: "leftover note" },
      { href: "/years/1996/sites/amazon/index.html", suffix: "amazon", needPick: "book", minPick: 0, field: true, placeholder: "a leftover book" },
      { href: "/years/1996/sites/spacejam/index.html", suffix: "jam", needPick: "planet", minPick: 0, field: false, placeholder: "" },
    ]),
  },
  {
    year: "1997",
    star: "itt97-pointcast",
    gold: "/years/1997/sites/pointcast/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/1997/sites/ebay/item-laptop.html", suffix: "ebay", needPick: "bid", minPick: 0, field: true, placeholder: "12.00" },
      { href: "/years/1997/sites/hotmail/index.html", suffix: "hotmail", needPick: "compose", minPick: 0, field: true, placeholder: "leftover note" },
      { href: "/years/1997/sites/icq/index.html", suffix: "icq-buddy", needPick: "uin", minPick: 0, field: true, placeholder: "leftoveruin" },
    ]),
  },
  {
    year: "1998",
    star: "itt98-lucky",
    gold: "/years/1998/sites/google/lucky.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/1998/sites/google/index.html", suffix: "google", needPick: "search", minPick: 0, field: true, placeholder: "museum leftover" },
      { href: "/years/1998/sites/ebay/index.html", suffix: "ebay", needPick: "bid", minPick: 0, field: true, placeholder: "leftover item" },
      { href: "/years/1998/sites/hotmail/index.html", suffix: "hotmail", needPick: "compose", minPick: 0, field: true, placeholder: "leftover note" },
    ]),
  },
  {
    year: "1999",
    star: "itt99-aim",
    gold: "/years/1999/sites/aim/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/1999/sites/google/index.html", suffix: "google", needPick: "q", minPick: 0, field: true, placeholder: "leftover query" },
      { href: "/years/1999/sites/amazon/index.html", suffix: "amazon", needPick: "book", minPick: 0, field: true, placeholder: "leftover book" },
      { href: "/years/1999/sites/napster/search.html", suffix: "napster", needPick: "q", minPick: 0, field: true, placeholder: "leftover track" },
    ]),
  },
  {
    year: "2000",
    star: "itt00-mapquest",
    gold: "/years/2000/sites/mapquest/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2000/sites/google/index.html", suffix: "google", needPick: "q", minPick: 0, field: true, placeholder: "leftover query" },
      { href: "/years/2000/sites/amazon/index.html", suffix: "amazon", needPick: "book", minPick: 0, field: true, placeholder: "leftover book" },
      { href: "/years/2000/sites/napster/search.html", suffix: "napster", needPick: "q", minPick: 0, field: true, placeholder: "leftover track" },
    ]),
  },
  {
    year: "2009",
    star: "itt09-like",
    gold: "/years/2009/sites/facebook/index.html",
    leftover: /** @type {LoDest[]} */ ([
      { href: "/years/2009/sites/youtube/index.html", suffix: "yt", needPick: "", minPick: 2, field: false, placeholder: "" },
      { href: "/years/2009/sites/wikipedia/index.html", suffix: "wiki", needPick: "", minPick: 2, field: false, placeholder: "" },
      { href: "/years/2009/sites/chrome/index.html", suffix: "chrome", needPick: "", minPick: 2, field: false, placeholder: "" },
    ]),
  },
];

const DEST_HTML_FREEZE = {
  1994: { dests: 53, html: 277 },
  1995: { dests: 51, html: 247 },
  1996: { dests: 52, html: 199 },
  1997: { dests: 56, html: 183 },
  1998: { dests: 52, html: 202 },
  1999: { dests: 48, html: 219 },
  2000: { dests: 54, html: 209 },
  2009: { dests: 68, html: 139 },
};

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
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
 * @param {import("@playwright/test").Page} page
 * @param {string} year
 * @param {string} fromHref
 */
async function hopLeftover2x(page, year, fromHref) {
  const strip = page.locator("[data-itt-2x-links]").first();
  await expect(strip, fromHref + " 2× leftover strip").toBeVisible();
  const hrefs = await strip.locator("a[href*='../']").evaluateAll((as) =>
    [...new Set(as.map((a) => a.getAttribute("href")).filter(Boolean))]
  );
  const here = fromHref.replace(/\/years\/\d{4}\/sites\//, "").split("/")[0];
  const destHops = hrefs.filter((h) => {
    const m = h.match(/(?:\.\.\/)+([^./][^/]*)\/[^/]+\.html$/);
    if (!m) return false;
    const slug = m[1];
    return slug !== here && slug !== "playable" && slug !== "pages";
  });
  expect(destHops.length, fromHref + " leftover dest hops").toBeGreaterThan(0);
  const nextRel =
    destHops.find((h) =>
      /\/(yahoo|amazon|google|cern|lycos|altavista|geocities|hotmail|ebay|icq|napster|youtube|wikipedia|chrome|facebook|spacejam)\//.test(
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

test.describe("1994–2000 + 2009 href-2× gold hops are leftover dests on disk", () => {
  for (const y of YEARS) {
    test(`${y.year} gold 2× hops 200 + leftover machine`, async ({ page }) => {
      await page.goto(y.gold);
      const hrefs = await page
        .locator("[data-itt-2x-links] a[href*='../']")
        .evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")).filter(Boolean))]);
      expect(hrefs.length, y.year + " hop count").toBeGreaterThan(3);
      const sample = hrefs
        .filter((h) =>
          /\/(yahoo|amazon|google|cern|lycos|altavista|geocities|hotmail|ebay|icq|napster|youtube|wikipedia|chrome|facebook)\//.test(
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

test.describe("1994–2000 + 2009 leftover dests are real full leftover-official flows", () => {
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

test.describe("1994–2000 + 2009 dest / HTML freeze", () => {
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
