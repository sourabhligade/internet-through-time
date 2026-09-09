// @ts-check
/**
 * Leftover-3× ×3 for 2021 / 2022 — dest-true · not mock.
 * 2018 and 2020 are live lean doors (first + third only). 2019 already dest-true leftover-3×.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const ROWS = require("./2018-2022-leftover-3x.matrix.json");
const ROOT = path.join(__dirname, "..");
function destOnDisk(href) {
  return fs.existsSync(path.join(ROOT, String(href || "").replace(/^\//, "")));
}

const WANT = {
  2018: { first: 3, more: 0, third: 3 },
  2020: { first: 3, more: 0, third: 3 },
  2021: { first: 9, more: 9, third: 9 },
  2022: { first: 9, more: 9, third: 9 },
};

const YEARS = Object.keys(WANT);

function neighborKeys(year) {
  const y = Number(year);
  return [`itt${String(y - 1).slice(2)}-`, `itt${String(y + 1).slice(2)}-`];
}

function goSel(row) {
  if (row.kind === "third") return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop3-${row.id}']`;
  if (row.kind === "second") return `[data-itt-lo3x] [data-pop-go][data-pop-key='pop2-${row.id}']`;
  return `[data-itt-lo3x] [data-pop-go]:not([data-pop-key])`;
}

function panelSel(row) {
  if (row.kind === "third") return `[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop3-${row.id}'])`;
  if (row.kind === "second") return `[data-itt-lo3x][data-pop-panel]:has([data-pop-key='pop2-${row.id}'])`;
  return `[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))`;
}

async function openDoor(page, row) {
  const res = await page.goto(row.href);
  expect(res && res.ok(), row.href).toBeTruthy();
  const panel = page.locator(panelSel(row)).first();
  await expect(panel, row.id + " dest-true leftover-3× panel " + row.kind).toBeVisible();
  await expect(panel).toContainText(String(row.year));
  await expect(panel.locator("[data-itt-year-copy]")).toContainText(String(row.year));
  return panel;
}

test.describe("2021–2022 leftover-3× ×3 home strips", () => {
  for (const year of YEARS) {
    test(`${year} leftover-3× strips are 3× famous doors`, async ({ page }) => {
      const fs = require("fs");
      const path = require("path");
      test.skip(
        !fs.existsSync(path.join(__dirname, "..", "years", year, "pages", "home.html")),
        year + " boarded"
      );
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const want = WANT[year];
      await expect(page.locator(`[data-itt-pop3x="${year}"]`).first().locator('a[href*="sites/"]')).toHaveCount(
        want.first
      );
      await expect(page.locator(`[data-itt-pop-more="${year}"]`).first().locator('a[href*="sites/"]')).toHaveCount(
        want.more
      );
      await expect(page.locator(`[data-itt-pop-3x3="${year}"]`).first().locator('a[href*="sites/"]')).toHaveCount(
        want.third
      );
    });
  }
});

for (const row of ROWS) {
  test.describe(`${row.year} leftover-3× ${row.kind} ${row.id}`, () => {
    test.beforeEach(() => {
      test.skip(!destOnDisk(row.href), row.year + " boarded");
    });
    test(`HTTP 200 · year-true copy · dest-true verb`, async ({ page }) => {
      const panel = await openDoor(page, row);
      await expect(panel).toContainText(row.verb.split(" ")[0]);
      const field = panel.locator("[data-pop-field]");
      await expect(field).toHaveAttribute("placeholder", row.ph);
    });

    test(`M1 empty never writes ${row.key}`, async ({ page }) => {
      await page.goto(row.href);
      await page.evaluate((k) => localStorage.removeItem(k), row.key);
      await page.reload();
      const go = page.locator(goSel(row)).first();
      await expect(go).toBeVisible();
      await go.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();
    });

    test(`M2 trap never writes ${row.key}`, async ({ page }) => {
      await page.goto(row.href);
      await page.evaluate((k) => localStorage.removeItem(k), row.key);
      await page.reload();
      const panel = page.locator(panelSel(row)).first();
      const go = page.locator(goSel(row)).first();
      await panel.locator('[data-pop-pick="trap"]').click();
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-field]").fill(row.ph);
      await go.click();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.key), "trap wrote").toBeFalsy();
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star)).toBeFalsy();
    });

    if (row.miss) {
      test(`M2 miss hop ${row.miss} never writes ${row.key}`, async ({ page }) => {
        await page.goto(row.href);
        await page.evaluate((k) => localStorage.removeItem(k), row.key);
        await page.reload();
        const miss = page.locator("[data-itt-lo3x] a[data-itt-lo3x-miss]").first();
        await expect(miss).toBeVisible();
        const href = await miss.getAttribute("href");
        const dest = new URL(href || row.miss, page.url()).pathname;
        const res = await page.goto(dest);
        expect(res && res.ok(), dest).toBeTruthy();
        expect(await page.evaluate((k) => localStorage.getItem(k), row.key)).toBeFalsy();
      });
    }

    test(`M3 complete writes dest-true leftover · never gold`, async ({ page }) => {
      await page.goto(row.href);
      await page.evaluate((k) => {
        localStorage.removeItem(k.key);
        localStorage.removeItem(k.star);
        Object.keys(localStorage)
          .filter((x) => k.nb.some((p) => x.startsWith(p)))
          .forEach((x) => localStorage.removeItem(x));
      }, { key: row.key, star: row.star, nb: neighborKeys(row.year) });
      await page.reload();
      const panel = page.locator(panelSel(row)).first();
      const go = page.locator(goSel(row)).first();
      await expect(go).toBeVisible();
      await panel.locator('[data-pop-pick="keep"]').click();
      await panel.locator("[data-pop-req]").nth(0).check();
      await panel.locator("[data-pop-req]").nth(1).check();
      await panel.locator("[data-pop-field]").fill(row.ph);
      await go.click();
      await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), row.key)).toBeTruthy();
      const payload = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "null"), row.key);
      expect(payload.real, row.key).toBe(true);
      expect(payload.leftover, row.key).toBe(true);
      expect(payload.multiStep, row.key).toBe(true);
      expect(String(payload.year), row.key).toBe(String(row.year));
      expect(await page.evaluate((k) => localStorage.getItem(k), row.star), "gold").toBeFalsy();
      const leaked = await page.evaluate((nb) => Object.keys(localStorage).filter((k) => nb.some((p) => k.startsWith(p))), neighborKeys(row.year));
      expect(leaked, "neighbor year").toEqual([]);
      const next = page.locator(`[data-next-when-key="${row.key}"] a`).first();
      await expect(next).toBeVisible();
      const nh = await next.getAttribute("href");
      const nres = await page.goto(new URL(nh || "", page.url()).pathname);
      expect(nres && nres.ok(), nh).toBeTruthy();
    });
  });
}
