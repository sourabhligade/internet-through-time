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
      const want = ["1994", "1995", "1996", "1997", "1998", "1999", "2000", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2015", "2017", "2019"].includes(year)
        ? 9
        : ["2001", "2002", "2003"].includes(year)
          ? 6
          : ["2014", "2016"].includes(year)
            ? 6
            : 3;
      expect(sites.length, year).toBe(want);
      const prefix = "itt" + String(year).slice(2);
      for (const s of sites) {
        const path = `/years/${year}/sites/${s.id}/index.html`;
        const res = await request.get(path);
        expect(res.status(), path).toBe(200);
        const key = `${prefix}-pop-${s.id}`;
        await page.goto(path);
        await page.evaluate((k) => localStorage.removeItem(k), key);
        await page.reload();
        const destTrue = page.locator("[data-itt-lo3x][data-pop-panel]:has([data-pop-go]:not([data-pop-key]))").first();
        const wrapped = page.locator("[data-pop-panel]:has([data-pop-go]:not([data-pop-key]))").first();
        const unkeyed = page.locator("[data-pop-go]:not([data-pop-key])").first();
        if (!(await destTrue.count()) && !(await wrapped.count()) && !(await unkeyed.count())) {
          expect(await page.evaluate((k) => localStorage.getItem(k), key), key).toBeFalsy();
          continue;
        }
        const panel = (await destTrue.count()) ? destTrue : (await wrapped.count()) ? wrapped : page.locator("body");
        const go = panel.locator("[data-pop-go]:not([data-pop-key])").first();
        await expect(go, key + " first leftover").toBeVisible();
        await go.click();
        expect(await page.evaluate((k) => localStorage.getItem(k), key), key).toBeFalsy();
        const picks = panel.locator("[data-pop-pick]");
        if ((await picks.count()) > 0) await picks.first().click();
        const reqs = panel.locator("[data-pop-req]");
        const n = await reqs.count();
        for (let i = 0; i < n; i++) await reqs.nth(i).check();
        await panel.locator("[data-pop-field]").first().fill("museum residual");
        await go.click();
        await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), key)).toMatch(/museum residual/);
      }
    });
  }
});
