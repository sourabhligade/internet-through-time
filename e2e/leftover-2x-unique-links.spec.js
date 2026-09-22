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
      for (const slug of row.dests) {
        expect(WAREHOUSE.has(slug), row.year + " " + slug + " warehouse").toBe(false);
        const idx = path.join(ROOT, "years", row.year, "sites", slug, "index.html");
        expect(fs.existsSync(idx), idx).toBe(true);
      }
    }
  });

  test("leftover-3× unique dests stay 2018=3 · 2021=5", () => {
    const byYear = {};
    for (const row of leftover3x) {
      byYear[row.year] = (byYear[row.year] || 0) + 1;
    }
    expect(byYear["2018"]).toBe(3);
    expect(byYear["2021"]).toBe(5);
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
    expect(byYear["2000"]).toBeGreaterThanOrEqual(80);
    expect(byYear["2007"]).toBe(33);
    expect(byYear["2013"]).toBe(47);
    expect(byYear["2018"]).toBe(20);
    expect(byYear["2022"]).toBe(24);
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

  test("2007 leftover dest KEEP rail · official dest leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/2007/sites/hackernews/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain("friendfeed");

    await page.goto("/years/2007/sites/iphone/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
  });

  test("2018 leftover dest KEEP · GDPR leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/2018/sites/gplusgone/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).not.toContain("instagram");
    await page.goto("/years/2018/sites/gdpr/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(0);
    await expect(page.locator("[data-official-key], html[data-official-key]")).toHaveCount(1);
  });

  test("2022 leftover dest KEEP · ChatGPT leftover-2× first paint 0", async ({ page }) => {
    await page.goto("/years/2022/sites/temu/index.html");
    await expect(page.locator("[data-itt-2x-links]")).toHaveCount(1);
    const hrefs = await page.locator("[data-itt-2x-links] a").evaluateAll((as) =>
      as.map((a) => a.getAttribute("href") || "")
    );
    const slugs = hrefs.map(destSlug).filter(Boolean);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).not.toContain("iphone");
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

  test("2018 leftover dest KEEP dest-true leftover dest I/O never writes star", async ({ page }) => {
    await completeLeftoverDest(
      page,
      "/years/2018/sites/gplusgone/index.html",
      "gplusgone-lx",
      "itt18-gdpr",
      "2018"
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
