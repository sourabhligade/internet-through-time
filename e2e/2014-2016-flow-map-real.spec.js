// @ts-check
/**
 * Every flow-map room 2014–2017: 200, no "(mock)", and if a Save exists
 * incomplete never writes ittYY.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

function flowHrefs(year) {
  const src = fs.readFileSync(path.join(__dirname, "../js/config/flow-maps.js"), "utf8");
  const start = src.indexOf(`ITT.flowMaps["${year}"]`);
  const next = src.indexOf("ITT.flowMaps[", start + 10);
  const block = src.slice(start, next === -1 ? undefined : next);
  const hrefs = [...block.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(hrefs)];
}

for (const year of ["2014", "2015", "2016", "2017", "2018", "2019"]) {
  const hrefs = flowHrefs(year);
  test.describe(`${year} flow-map rooms are live + not mock`, () => {
    for (const href of hrefs) {
      test(`${href} 200 · no (mock)`, async ({ page }) => {
        const res = await page.goto(`/years/${year}/${href}`);
        expect(res && res.status(), href).toBe(200);
        const body = (await page.locator("body").innerText()).toLowerCase();
        expect(body, href).not.toMatch(/\(mock\)/);
        expect(body, href).not.toMatch(/not wired|coming soon/);
        const save = page.locator("[data-itt-real-save]").first();
        if ((await save.count()) === 0) return;
        const prefix = "itt" + year.slice(2) + "-";
        const suffix = (await save.getAttribute("data-storage-key")) || "";
        if (suffix) {
          await page.evaluate((k) => localStorage.removeItem(k), prefix + suffix);
        }
        await save.click({ force: true });
        await page.waitForTimeout(80);
        if (suffix) {
          expect(await page.evaluate((k) => localStorage.getItem(k), prefix + suffix), href).toBeFalsy();
        }
        const boxes = page.locator("[data-req]");
        const n = await boxes.count();
        for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
        const field = await save.getAttribute("data-require-field");
        if (field) {
          const el = page.locator(field).first();
          if (await el.count()) await el.fill("museum real");
        }
        await save.click({ force: true });
        if (suffix) {
          await expect
            .poll(async () => page.evaluate((k) => localStorage.getItem(k), prefix + suffix), {
              message: href + " REAL save",
            })
            .toBeTruthy();
        }
      });
    }
  });
}
