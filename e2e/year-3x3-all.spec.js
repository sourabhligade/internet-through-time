// @ts-check
/**
 * Third leftover 3× writer on every ship year (2025 boarded).
 * Empty / no pick / no tick never writes. Complete writes ittYY-pop3-<id>.
 */
const { test, expect } = require("@playwright/test");

const TRIOS = require("../scripts/popular-3x3-sites.json");

const YEARS = Object.keys(TRIOS).sort();
const WIPED = new Set(["2014", "2018", "2020", "2021", "2022", "2023", "2024", "2025"]);

test.describe("every third leftover 3× writer", () => {
  for (const year of YEARS) {
    if (WIPED.has(year)) continue;
    for (const row of TRIOS[year]) {
      const key = `itt${year.slice(2)}-pop3-${row.id}`;
      test(`${year} ${row.id} empty/no-pick/no-tick never write · complete writes ${key}`, async ({ page }) => {
        await page.goto(`/years/${year}/sites/${row.id}/index.html`);
        await page.evaluate((k) => localStorage.removeItem(k), key);
        await page.reload();
        const go = page.locator(`[data-pop-go][data-pop-key='pop3-${row.id}']`).first();
        await expect(go).toBeVisible();
        const panel = page.locator("[data-pop-panel]").filter({ has: go }).first();

        await go.click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key), "empty go").toBeFalsy();

        await panel.locator("[data-pop-pick]").first().click();
        await go.click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key), "pick only").toBeFalsy();

        const reqs = panel.locator("[data-pop-req]");
        const n = await reqs.count();
        for (let i = 0; i < n; i++) await reqs.nth(i).check();
        const field = panel.locator("[data-pop-field]").last();
        await field.fill("");
        await go.click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key), "empty field after ticks").toBeFalsy();

        let ph = (await field.getAttribute("placeholder")) || row.ph || "museum";
        if (ph.length < 2) ph = ph + "s";
        await field.fill(ph);
        await go.click();
        const saved = await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key)).toBeTruthy();
        void saved;
        const raw = await page.evaluate((k) => localStorage.getItem(k), key);
        expect(raw && raw.indexOf(year) !== -1, raw).toBeTruthy();

        const next = page.locator(`[data-next-when-key="${key}"] a`).first();
        await expect(next).toBeVisible();
        const href = await next.getAttribute("href");
        expect(href).toBeTruthy();
        const res = await page.goto(new URL(href, page.url()).pathname);
        expect(res && res.ok(), href).toBeTruthy();
      });
    }
  }
});
