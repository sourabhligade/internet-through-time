// @ts-check
/**
 * Leftover-3× unique dest links. n=3 on years that already have a legal three.
 * leftover-3× unique dest-true catalogs stay empty.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const matrix = require("./leftover-3x-unique-links.matrix.json");
const leftover3x = require("./leftover-3x-unique.matrix.json");

const ROOT = path.join(__dirname, "..");
const WAREHOUSE = new Set(["123-reg", "a21-inc", "123reg"]);
const LO4X_2012 = new Set(["chrome", "twitter", "soundcloud"]);
const LO4X_2010 = new Set(["netflix", "tumblr", "wave"]);
const LO2X_2010 = new Set([
  "angry",
  "flipboard",
  "cityville",
  "kinect",
  "minecraft",
  "hulu",
  "googlebuzz",
  "path",
  "ibooks",
  "chromewebstore",
  "google",
  "android",
]);
const WANT = {
  "2008": 3,
  "2009": 3,
  "2010": 3,
  "2012": 3,
  "2013": 3,
  "2020": 3,
  "2021": 3,
  "2022": 3,
};
const BLOCK = /<!-- ITT-3X-UNIQUE-LINKS:(\d{4}):start -->([\s\S]*?)<!-- ITT-3X-UNIQUE-LINKS:\d{4}:end -->/;
const HREF = /href="([^"]+)"/g;

function destSlug(href) {
  const m = String(href || "").match(/(?:sites\/|\.\.\/)([^/.]+)(?:\/|\.html|$)/);
  return m ? m[1] : "";
}

function railSlugs(html) {
  const m = String(html || "").match(BLOCK);
  if (!m) return [];
  const slugs = [];
  let h;
  const re = new RegExp(HREF.source, "g");
  while ((h = re.exec(m[2]))) {
    const s = destSlug(h[1]);
    if (s) slugs.push(s);
  }
  return slugs;
}

function walkYearHtml(year) {
  const dir = path.join(ROOT, "years", String(year));
  /** @type {string[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    const ents = fs.readdirSync(cur, { withFileTypes: true });
    let i;
    for (i = 0; i < ents.length; i++) {
      const full = path.join(cur, ents[i].name);
      if (ents[i].isDirectory()) stack.push(full);
      else if (/\.html?$/i.test(ents[i].name)) out.push(full);
    }
  }
  return out;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function completeLeftoverDest(page, href, suffix, star, year) {
  await page.goto(href);
  await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), [
    `itt${String(year).slice(2)}-${suffix}`,
    star,
  ]);
  await page.reload();
  await revealLeftoverRails(page);
  const lo = page
    .locator(`[data-lo-panel][data-itt-dest-true="1"]:has([data-lo-save][data-lo-key="${suffix}"])`)
    .first();
  await lo.locator("[data-lo-save]").waitFor({ timeout: 15000 });
  await lo.locator("[data-lo-trap]").first().click({ force: true });
  const key = `itt${String(year).slice(2)}-${suffix}`;
  expect(await getKey(page, key)).toBeFalsy();
  expect(await getKey(page, star)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  let i;
  for (i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  await lo.locator('[data-lo-pick="keep"]').click({ force: true });
  await lo.locator("[data-lo-field]").fill("leftover dest leftover");
  await lo.locator("[data-lo-save]").click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.leftover).toBe(true);
  expect(String(blob.year)).toBe(String(year));
  expect(await getKey(page, star), key + " wrote star").toBeFalsy();
}

test.describe("leftover-3× unique dest links", () => {
  test("catalog: one dest slug once · dests have index.html · no 123-reg · 2017 absent", () => {
    const years = matrix.map((r) => r.year);
    expect(years).not.toContain("2017");
    expect(years).not.toContain("1994");
    for (const row of matrix) {
      expect(new Set(row.dests).size, row.year + " unique dests").toBe(row.dests.length);
      expect(row.n).toBe(row.dests.length);
      expect(row.n, row.year).toBe(WANT[row.year]);
      expect(row.keep.length, row.year + " KEEP leftover-3× unique dests").toBeGreaterThan(0);
      for (const slug of row.keep) {
        expect(row.dests, row.year + " KEEP " + slug).toContain(slug);
      }
      for (const slug of row.dests) {
        expect(WAREHOUSE.has(slug), row.year + " " + slug + " warehouse").toBe(false);
        if (row.year === "2012") expect(LO4X_2012.has(slug), "2012 leftover-4× unique dest " + slug).toBe(false);
        if (row.year === "2010") {
          expect(LO4X_2010.has(slug), "2010 leftover-4× unique dest " + slug).toBe(false);
          expect(LO2X_2010.has(slug), "2010 leftover-2× unique dest " + slug).toBe(false);
        }
        const idx = path.join(ROOT, "years", row.year, "sites", slug, "index.html");
        expect(fs.existsSync(idx), idx).toBe(true);
      }
    }
  });

  test("leftover-3× unique dest-true dests stay empty", () => {
    const byYear = {};
    for (const row of leftover3x) {
      byYear[row.year] = (byYear[row.year] || 0) + 1;
    }
    expect(byYear["2021"]).toBeUndefined();
    expect(byYear["2017"]).toBeUndefined();
    expect(Object.values(byYear).reduce((a, b) => a + b, 0)).toBe(0);
  });

  test("live leftover dest leftover-3× unique dest links: no dups · official dest 0 · no 123-reg · no pop-more", () => {
    let railPages = 0;
    let dupPages = 0;
    let officialWith3x = 0;
    let warehouseHref = 0;
    let popMore = 0;
    let startWith3x = 0;
    for (const row of matrix) {
      const files = walkYearHtml(row.year);
      let i;
      for (i = 0; i < files.length; i++) {
        const html = fs.readFileSync(files[i], "utf8");
        const official = html.includes("data-official-key");
        const has3x = html.includes("data-itt-3x-unique-links") || html.includes("ITT-3X-UNIQUE-LINKS");
        if (official && has3x) officialWith3x += 1;
        if (files[i].includes("/pages/") && has3x) startWith3x += 1;
        if (!has3x) continue;
        railPages += 1;
        const slugs = railSlugs(html);
        if (new Set(slugs).size !== slugs.length) dupPages += 1;
        const m = html.match(/<p[^>]*data-itt-3x-unique-links[^>]*>/);
        if (m && /itt-pop-more/.test(m[0])) popMore += 1;
        let j;
        for (j = 0; j < slugs.length; j++) {
          if (WAREHOUSE.has(slugs[j])) warehouseHref += 1;
        }
      }
    }
    expect(dupPages, "leftover dest leftover-3× unique dest duplicate dest slugs").toBe(0);
    expect(officialWith3x, "official dest leftover-3× unique dest links first paint").toBe(0);
    expect(startWith3x, "Starting Point leftover-3× unique dest links first paint").toBe(0);
    expect(warehouseHref, "123-reg in leftover-3× unique dest hrefs").toBe(0);
    expect(popMore, "leftover-3× unique dest links tagged itt-pop-more").toBe(0);
    expect(railPages, "leftover dest leftover-3× unique dest-link host pages").toBe(183);
  });

  test("2007 leftover dest leftover-3× unique dest wiki · official dest leftover-3× unique dest links 0", async ({
    page,
  }) => {
    await page.goto("/years/2007/sites/wiki/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await expect(page.locator("[data-itt-lo3x]")).toHaveCount(0);
    await page.goto("/years/2007/sites/iphone/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
  });

  test("2010 leftover dest leftover-3× unique dest netflix · Instagram leftover-3× unique dest links 0", async ({
    page,
  }) => {
    await page.goto("/years/2010/sites/netflix/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await expect(page.locator("[data-itt-lo3x]")).toHaveCount(1);
    await expect(page.locator('[data-itt-lo3x] [data-pop-go][data-pop-key="pop4-netflix"]')).toHaveCount(1);
    await page.goto("/years/2010/sites/instagram/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
  });

  test("leftover-3× unique dest links on the other live years", async ({ page }) => {
    const rows = [
      { year: "2008", self: "addicting", other: "armorgames", host: "cuil", official: "facebook", suffix: "ag-dp", star: "itt08-apps" },
      { year: "2012", self: "drawsomething", other: "googledrive", host: "tinder", official: "pinterest", suffix: "draw-lx", star: "itt12-ig-android" },
      { year: "2013", self: "kahoot", other: "giphy", host: "canva13", official: "tumblr", suffix: "kahoot-lx", star: "itt13-vine-posts" },
      { year: "2020", self: "amazon", other: "clubhouse", host: "google", official: "zoom", suffix: "amazon-lx", star: "itt20-zoom" },
      { year: "2021", self: "amazon", other: "coinbaseipo", host: "nft", official: "signal", suffix: "amazon-lx", star: "itt21-att" },
      { year: "2022", self: "amazon", other: "dalle2", host: "temu", official: "wordle", suffix: "amazon-lx", star: "itt22-chatgpt" },
    ];
    for (const row of rows) {
      await page.goto("/years/" + row.year + "/sites/" + row.self + "/index.html");
      await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(2);
      await expect(page.locator('[data-itt-3x-unique-links] a[href="../' + row.self + '/index.html"]')).toHaveCount(0);
      await expect(page.locator('[data-itt-3x-unique-links] a[href="../' + row.other + '/index.html"]')).toHaveCount(1);
      await page.goto("/years/" + row.year + "/sites/" + row.host + "/index.html");
      await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(3);
      await page.goto("/years/" + row.year + "/sites/" + row.official + "/index.html");
      await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
      await page.goto("/years/" + row.year + "/pages/home.html");
      await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
      await completeLeftoverDest(
        page,
        "/years/" + row.year + "/sites/" + row.self + "/index.html",
        row.suffix,
        row.star,
        row.year
      );
    }
    await page.goto("/years/2007/sites/maps/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
  });

  test("2009 leftover dest leftover-3× unique dest links gowalla · wolfram hosts 3 · official dest 0", async ({
    page,
  }) => {
    await page.goto("/years/2009/sites/gowalla/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(1);
    await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(2);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../stumbleupon/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../wordpress/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../gowalla/index.html"]')).toHaveCount(0);
    await page.locator('[data-itt-3x-unique-links] a[href="../stumbleupon/index.html"]').click();
    await expect(page).toHaveURL(/\/years\/2009\/sites\/stumbleupon\/index\.html$/);
    await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(2);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../gowalla/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../stumbleupon/index.html"]')).toHaveCount(0);
    await page.goto("/years/2009/sites/wolfram/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(1);
    await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(3);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../gowalla/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../stumbleupon/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../wordpress/index.html"]')).toHaveCount(1);
    await page.goto("/years/2009/sites/chrome/index.html");
    await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(3);
    await page.goto("/years/2009/sites/facebook/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2009/pages/home.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2009/sites/friendfeed/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2009/sites/minecraft/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2009/sites/kindle/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await completeLeftoverDest(
      page,
      "/years/2009/sites/gowalla/index.html",
      "gowalla-lx",
      "itt09-like",
      "2009"
    );
  });

  test("2010 leftover dest leftover-3× unique dest links formspring · flipboard hosts 3 · official dest 0", async ({
    page,
  }) => {
    await page.goto("/years/2010/sites/formspring/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(1);
    await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(2);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../groupon/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../reddit/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../formspring/index.html"]')).toHaveCount(0);
    await page.goto("/years/2010/sites/flipboard/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(1);
    await expect(page.locator("[data-itt-3x-unique-links] a")).toHaveCount(3);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../formspring/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../groupon/index.html"]')).toHaveCount(1);
    await expect(page.locator('[data-itt-3x-unique-links] a[href="../reddit/index.html"]')).toHaveCount(1);
    await page.goto("/years/2010/sites/instagram/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2010/sites/tumblr/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
    await page.goto("/years/2010/sites/wave/index.html");
    await expect(page.locator("[data-itt-3x-unique-links]")).toHaveCount(0);
  });

  test("2007 leftover dest leftover-3× unique dest-true leftover dest I/O never writes star", async ({
    page,
  }) => {
    await page.goto("/years/2007/sites/wiki/index.html");
    await revealLeftoverRails(page);
    await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), [
      "itt07-pop-wiki",
      "itt07-iphone",
    ]);
    await page.reload();
    await revealLeftoverRails(page);
    await expect(page.locator("[data-itt-lo3x]")).toHaveCount(0);
    expect(await getKey(page, "itt07-pop-wiki")).toBeFalsy();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  });

});
