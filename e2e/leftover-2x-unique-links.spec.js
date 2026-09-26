// @ts-check
/**
 * Leftover-2× unique dest links: one dest slug once. Official dest leftover-2× first paint 0.
 * Dests already on disk (index.html). Dest-true leftover dest I/O unchanged.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");
const matrix = require("./leftover-2x-unique-links.matrix.json");
const leftover3x = require("./leftover-3x-unique.matrix.json");

const ROOT = path.join(__dirname, "..");
const WAREHOUSE = new Set(["123-reg", "a21-inc", "123reg"]);
const BLOCK = /<!-- ITT-2X-LINKS:(\d{4}):start -->([\s\S]*?)<!-- ITT-2X-LINKS:\d{4}:end -->/;
const HREF = /href="([^"]+)"/g;

function destSlug(href) {
  const m = String(href || "").match(/(?:sites\/|\.\.\/)([^/.]+)(?:\/|\.html|$)/);
  return m ? m[1] : "";
}

function trailMaps() {
  const text = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const official = {};
  const leftover = {};
  const yearRe = /"(\d{4})"\s*:\s*\[/g;
  const positions = [];
  let m;
  while ((m = yearRe.exec(text))) positions.push({ year: m[1], start: m.index });
  let i;
  for (i = 0; i < positions.length; i++) {
    const y = positions[i].year;
    const chunk = text.slice(positions[i].start, i + 1 < positions.length ? positions[i + 1].start : text.length);
    official[y] = new Set();
    leftover[y] = new Set();
    const stopRe = /"n":\s*(\d+),\s*"name":\s*"[^"]+",\s*"href":\s*"sites\/([^/]+)\//g;
    let s;
    while ((s = stopRe.exec(chunk))) {
      const n = Number(s[1]);
      if (n <= 10) official[y].add(s[2]);
      else leftover[y].add(s[2]);
    }
  }
  return { official, leftover };
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

test.describe("leftover-2× unique dest links", () => {
  test("catalog: one dest slug once · dests have index.html · no 123-reg", () => {
    for (const row of matrix) {
      expect(new Set(row.dests).size, row.year + " unique dests").toBe(row.dests.length);
      expect(row.n).toBe(row.dests.length);
      const reactDoor = new Set(["2017", "2019", "2020", "2021"]);
      for (const slug of row.dests) {
        expect(WAREHOUSE.has(slug), row.year + " " + slug + " warehouse").toBe(false);
        if (reactDoor.has(String(row.year))) {
          const src = fs.readFileSync(path.join(ROOT, "react", "src", "year" + row.year + ".js"), "utf8");
          expect(src.includes('"' + slug) || src.includes(slug + "-lx") || src.includes(slug), row.year + " " + slug).toBe(true);
          continue;
        }
        const idx = path.join(ROOT, "years", row.year, "sites", slug, "index.html");
        expect(fs.existsSync(idx), idx).toBe(true);
      }
    }
  });

  test("leftover-3× unique dests stay empty", () => {
    const byYear = {};
    for (const row of leftover3x) {
      byYear[row.year] = (byYear[row.year] || 0) + 1;
    }
    expect(byYear["2018"]).toBeUndefined();
    expect(byYear["2021"]).toBeUndefined();
    expect(Object.values(byYear).reduce((a, b) => a + b, 0)).toBe(0);
  });

  test("live leftover dest leftover-2× rails: no duplicate dest slugs · official dest leftover-2× 0", () => {
    let railPages = 0;
    let dupPages = 0;
    let officialWith2x = 0;
    let warehouseHref = 0;
    for (const row of matrix) {
      const files = walkYearHtml(row.year);
      let i;
      for (i = 0; i < files.length; i++) {
        const html = fs.readFileSync(files[i], "utf8");
        const official = html.includes("data-official-key");
        const has2x = html.includes("data-itt-2x-links") || html.includes("ITT-2X-LINKS");
        if (official && has2x) officialWith2x += 1;
        if (!has2x) continue;
        railPages += 1;
        const slugs = railSlugs(html);
        if (new Set(slugs).size !== slugs.length) dupPages += 1;
        let j;
        for (j = 0; j < slugs.length; j++) {
          if (WAREHOUSE.has(slugs[j])) warehouseHref += 1;
        }
      }
    }
    expect(dupPages, "leftover dest leftover-2× duplicate dest slugs").toBe(0);
    expect(officialWith2x, "official dest leftover-2× first paint").toBe(0);
    expect(warehouseHref, "123-reg in leftover-2× unique dest hrefs").toBe(0);
    expect(railPages).toBeGreaterThan(100);
  });

  test("catalog unique dest counts match matrix", () => {
    const byYear = Object.fromEntries(matrix.map((r) => [r.year, r.n]));
    expect(byYear["1995"]).toBe(117);
    expect(byYear["1999"]).toBe(138);
    expect(byYear["2000"]).toBeGreaterThanOrEqual(70);
    expect(byYear["2007"]).toBe(5);
    expect(byYear["2011"]).toBe(20);
    expect(byYear["2013"]).toBe(25);
    expect(byYear["2018"]).toBeUndefined();
    expect(byYear["2022"]).toBe(0);
  });

  test("leftover-2× unique dest links dest-disjoint leftover-3× unique dest links", () => {
    const lo3 = require("./leftover-3x-unique-links.matrix.json");
    const by3 = Object.fromEntries(lo3.map((r) => [r.year, new Set(r.dests)]));
    for (const row of matrix) {
      const other = by3[row.year];
      if (!other) continue;
      const both = row.dests.filter((slug) => other.has(slug));
      expect(both, row.year + " leftover-2× unique dest links ∩ leftover-3× unique dest links").toEqual([]);
    }
  });

  test("leftover-2× unique dest links dest-disjoint official dests · leftover trail n=11+ · leftover-4× unique dests · leftover-3× unique dest-true dests", () => {
    const trails = trailMaps();
    const lo4 = new Set(
      require("./leftover-4x-unique.matrix.json").map((r) => r.year + ":" + r.id)
    );
    const lo3d = {};
    leftover3x.forEach((row) => {
      lo3d[row.year] = lo3d[row.year] || new Set();
      const slug = destSlug(row.href || "") || row.id;
      if (slug) lo3d[row.year].add(slug);
    });
    for (const row of matrix) {
      const off = trails.official[row.year] || new Set();
      const lo = trails.leftover[row.year] || new Set();
      expect(
        row.dests.filter((slug) => off.has(slug)),
        row.year + " leftover-2× unique dest links ∩ official dests"
      ).toEqual([]);
      expect(
        row.dests.filter((slug) => lo.has(slug)),
        row.year + " leftover-2× unique dest links ∩ leftover trail n=11+"
      ).toEqual([]);
      expect(
        row.dests.filter((slug) => lo4.has(row.year + ":" + slug)),
        row.year + " leftover-2× unique dest links ∩ leftover-4× unique dests"
      ).toEqual([]);
      const true3 = lo3d[row.year];
      if (true3) {
        expect(
          row.dests.filter((slug) => true3.has(slug)),
          row.year + " leftover-2× unique dest links ∩ leftover-3× unique dest-true dests"
        ).toEqual([]);
      }
    }
  });

  test("leftover-3× unique dest-true dest HTML leftover-2× unique dest link rail 0", () => {
    let hosts = 0;
    leftover3x.forEach((row) => {
      const href = String(row.href || "").replace(/^\//, "").split("?")[0];
      if (!href) return;
      const file = path.join(ROOT, href);
      if (!fs.existsSync(file)) return;
      const html = fs.readFileSync(file, "utf8");
      if (html.includes("ITT-2X-LINKS") || html.includes("data-itt-2x-links")) hosts += 1;
    });
    expect(hosts, "leftover-3× unique dest-true dest leftover-2× unique dest links").toBe(0);
  });

  test("2000 KEEP original unique dests · no duplicate dest slugs", async ({ page }) => {
    await page.goto("/years/2000/sites/zombo/index.html");
    const hrefs = await page.locator("[data-itt-2x-links] a[href*='sites/'], [data-itt-2x-links] a[href*='../']").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("lycos");
    expect(slugs).not.toContain("123-reg");
    const cls = await page.locator("[data-itt-2x-links]").first().getAttribute("class");
    expect(cls || "").not.toMatch(/itt-pop-more/);
    hrefs.forEach((h) => {
      const slug = destSlug(h);
      expect(fs.existsSync(path.join(ROOT, "years", "2000", "sites", slug, "index.html")), slug).toBe(true);
    });
    const lycos = await page.goto("/years/2000/sites/lycos/index.html");
    expect(lycos && lycos.ok()).toBeTruthy();
  });

  test("1999 leftover-2× unique dests 138 · official dest leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/1999/sites/craigslist/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBe(137);
    expect(slugs).toContain("espn");
    expect(slugs).toContain("healtheon");
    expect(slugs).not.toContain("craigslist");
    expect(slugs).not.toContain("aim");
    hrefs.forEach((h) => {
      const slug = destSlug(h);
      expect(fs.existsSync(path.join(ROOT, "years", "1999", "sites", slug, "index.html")), slug).toBe(true);
    });

    await page.goto("/years/1999/sites/aim/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("1995 leftover-2× unique dests 117 · official dest leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/1995/sites/classmates/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBe(116);
    expect(slugs).toContain("webex");
    expect(slugs).toContain("yachtworld");
    expect(slugs).not.toContain("classmates");
    expect(slugs).not.toContain("amazon");
    expect(slugs).not.toContain("apple");
    hrefs.forEach((h) => {
      const slug = destSlug(h);
      expect(fs.existsSync(path.join(ROOT, "years", "1995", "sites", slug, "index.html")), slug).toBe(true);
    });

    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
    await expect(page.locator("[data-official-key]")).toHaveCount(1);
  });

  test("2007 leftover dest KEEP rail · official dest leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/2007/sites/hackernews/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("safari3");

    await page.goto("/years/2007/sites/iphone/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("2011 leftover-2× unique dests 20 · official dest leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/2011/sites/snapchat/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBe(19);
    expect(slugs).toContain("codecademy");
    expect(slugs).toContain("ios5");
    expect(slugs).not.toContain("snapchat");
    expect(slugs).not.toContain("googleplus");
    hrefs.forEach((h) => {
      const slug = destSlug(h);
      expect(fs.existsSync(path.join(ROOT, "years", "2011", "sites", slug, "index.html")), slug).toBe(true);
    });

    await page.goto("/years/2011/sites/googleplus/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("2022 leftover dest KEEP · ChatGPT leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/2022/sites/temu/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
    await page.goto("/years/2022/sites/chatgpt/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("1995 amazon · 2010 instagram official dest leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
    await page.goto("/years/2010/sites/instagram/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("2022 Starting Point leftover-2× unique dest rail 0", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("2007 leftover dest KEEP dest-true leftover dest I/O never writes star", async ({ page }) => {
    await completeLeftoverDest(
      page,
      "/years/2007/sites/hackernews/index.html",
      "hackernews-lx",
      "itt07-iphone",
      "2007"
    );
  });

  test("2022 leftover dest KEEP dest-true leftover dest I/O never writes star", async ({ page }) => {
    await completeLeftoverDest(
      page,
      "/years/2022/sites/temu/index.html",
      "temu-lx",
      "itt22-chatgpt",
      "2022"
    );
  });
});
