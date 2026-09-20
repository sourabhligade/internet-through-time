// @ts-check
/**
 * FLOW-CHECK-DIAGRAM.md §4 — every playable year.
 * Links first, then dest-true I/O. Dest-folder count is not a pass.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { destOnDisk } = require("./helpers");
const UNIQUE = require("./leftover-3x-unique.matrix.json");
const LEAN = require("./lean-double-leftover.matrix.json");

const ROOT = path.join(__dirname, "..");
const SHIP = [];
for (let y = 1994; y <= 2022; y++) {
  if (y === 2009) continue;
  SHIP.push(String(y));
}

const LO3X_STOP = {
  2007: 9,
  2010: 9,
  2011: 9,
  2012: 9,
  2013: 9,
  2014: 9,
  2015: 9,
  2016: 9,
  2018: 3,
  2019: 9,
  2020: 9,
  2021: 5,
  2022: 9,
};

function officialTen(year) {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const yearRe = /"(\d{4})":\s*\[/g;
  /** @type {{ year: string, at: number }[]} */
  const starts = [];
  let m;
  while ((m = yearRe.exec(src))) starts.push({ year: m[1], at: m.index + m[0].length });
  /** @type {{ n: number, href: string, whenKey: string }[]} */
  const rows = [];
  for (let i = 0; i < starts.length; i++) {
    if (starts[i].year !== year) continue;
    const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
    const block = src.slice(starts[i].at, end);
    const rowRe =
      /\{[^}]*"n":\s*(\d+)[^}]*"href":\s*"([^"]*)"[^}]*"whenKey":\s*"([^"]*)"/g;
    let r;
    while ((r = rowRe.exec(block))) {
      const n = parseInt(r[1], 10);
      if (n >= 1 && n <= 10) rows.push({ n, href: r[2], whenKey: r[3] });
    }
  }
  return rows;
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("FLOW-CHECK pipeline · every playable year", () => {
  test("1 hub 28 cards · no 2009 · no 2023+", async ({ page }) => {
    expect(SHIP).toHaveLength(28);
    await page.goto("/");
    await expect(page.locator("body")).toContainText(/28 years open/i);
    for (const y of SHIP) {
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`).first()).toBeVisible();
    }
    await expect(page.locator("a.year-card.available[href*='years/2009']")).toHaveCount(0);
    await expect(page.locator("a.year-card.available[href*='years/2023']")).toHaveCount(0);
  });

  test("5 leftover-3× unique dest-true dests dest-disjoint official 10 · stops", () => {
    const byYear = {};
    for (const row of UNIQUE) {
      byYear[row.year] = byYear[row.year] || [];
      byYear[row.year].push(row);
    }
    expect(byYear["2017"] || []).toHaveLength(0);
    for (const [year, want] of Object.entries(LO3X_STOP)) {
      const rows = byYear[year] || [];
      expect(rows, year + " leftover-3× unique count").toHaveLength(want);
      const official = new Set(officialTen(year).map((r) => r.href.split("/")[1]));
      for (const row of rows) {
        expect(official.has(row.id), year + " " + row.id + " dest-disjoint").toBe(false);
        expect(destOnDisk(row.href), row.href).toBe(true);
      }
    }
  });

  for (const y of SHIP) {
    test(`2–4 ${y} Starting Point guided 6 · official 10 files dest-true · leftover-2× = 0`, async ({
      page,
    }) => {
      await page.goto("/years/" + y + "/pages/home.html");
      await expect(page.locator("#ott-guided-" + y + " ol > li")).toHaveCount(6);
      await expect(page.locator('[data-ott-one-thing="' + y + '"]')).toBeVisible();
      const ten = officialTen(y);
      expect(ten, y + " official 10").toHaveLength(10);
      for (const row of ten) {
        const href = path.join(ROOT, "years", y, row.href);
        expect(fs.existsSync(href), href).toBe(true);
        const html = fs.readFileSync(href, "utf8");
        expect(html.indexOf("data-lo-panel"), y + " " + row.href + " leftover-2×").toBe(-1);
        expect(html, y + " " + row.href + " dest-true need").toMatch(/data-official-need/);
      }
    });
  }
});

test.describe("FLOW-CHECK pipeline · leftover dest I/O sample", () => {
  const samples = [];
  const byYear = {};
  for (const row of UNIQUE) {
    byYear[row.year] = byYear[row.year] || [];
    byYear[row.year].push(row);
  }
  for (const year of Object.keys(LO3X_STOP)) {
    const rows = byYear[year] || [];
    if (rows[0]) samples.push(rows[0]);
  }
  const leanByYear = {};
  for (const row of LEAN) {
    leanByYear[row.year] = leanByYear[row.year] || [];
    leanByYear[row.year].push(row);
  }
  for (const year of ["2007", "2010", "2018", "2022"]) {
    const rows = leanByYear[year] || [];
    if (rows[0]) samples.push({ ...rows[0], lean: true });
  }

  for (const row of samples) {
    test(`${row.year} ${row.id} leftover empty never writes · complete writes leftover never star`, async ({
      page,
    }) => {
      await page.goto(row.href);
      await page.evaluate((ks) => {
        ks.forEach((k) => localStorage.removeItem(k));
      }, [row.key, row.star]);
      await page.reload();
      if (row.lean) {
        const panel = page.locator("[data-lo-panel][data-itt-dest-true]").first();
        await expect(panel).toBeVisible();
        await panel.locator("[data-lo-save]").first().click();
        expect(await getKey(page, row.key)).toBeFalsy();
        await panel.locator('[data-lo-pick="keep"]').first().click();
        const reqs = panel.locator("[data-lo-req]");
        const n = await reqs.count();
        for (let i = 0; i < n; i++) await reqs.nth(i).check();
        await panel.locator("[data-lo-field]").first().fill(row.id + " leftover");
        await panel.locator("[data-lo-save]").first().click();
        await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
        expect(await getKey(page, row.star)).toBeFalsy();
        return;
      }
      const go =
        row.kind === "third"
          ? page.locator(`[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-${row.id}']`).first()
          : row.kind === "second"
            ? page.locator(`[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-${row.id}']`).first()
            : page.locator(`[data-itt-lo3x] [data-pop-go][data-pop-id='${row.id}']:not([data-pop-key])`).first();
      await expect(go).toBeVisible();
      const panel = go.locator("xpath=ancestor::*[@data-itt-lo3x][1]");
      await go.click();
      expect(await getKey(page, row.key)).toBeFalsy();
      await panel.locator('[data-pop-pick="keep"]').click();
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-field]").fill(row.id + " leftover");
      await go.click();
      await expect.poll(() => getKey(page, row.key), { timeout: 8000 }).toBeTruthy();
      expect(await getKey(page, row.star)).toBeFalsy();
    });
  }
});
