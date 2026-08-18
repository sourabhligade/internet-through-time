// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const spec = require("../scripts/popular-3x-sites.json");

const ROOT = path.join(__dirname, "..");

test.describe("3× popular websites — every on-disk year", () => {
  for (const year of Object.keys(spec)) {
    const sites = spec[year];
    test(`${year} three popular leftover rooms load + empty never writes`, async ({ page, request }) => {
      test.skip(!fs.existsSync(path.join(ROOT, "years", year, "index.html")), year + " not on disk");
      expect(sites.length, year).toBe(3);
      const prefix = "itt" + String(year).slice(2);
      for (const s of sites) {
        const path = `/years/${year}/sites/${s.id}/index.html`;
        const res = await request.get(path);
        expect(res.status(), path).toBe(200);
        const key = `${prefix}-pop-${s.id}`;
        await page.goto(path);
        await page.evaluate((k) => localStorage.removeItem(k), key);
        await page.reload();
        await page.locator("[data-pop-go]").click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key), key).toBeFalsy();
        const picks = page.locator("[data-pop-pick]");
        if ((await picks.count()) > 0) await picks.first().click();
        const reqs = page.locator("[data-pop-req]");
        const n = await reqs.count();
        for (let i = 0; i < n; i++) await reqs.nth(i).check();
        await page.fill("[data-pop-field]", "museum residual");
        await page.locator("[data-pop-go]").click();
        await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), key)).toMatch(/museum residual/);
      }
    });
  }
});
