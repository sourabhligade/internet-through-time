// @ts-check
/**
 * Phase 6 band check for 1994–1997. Walks every register row.
 * Empty/trap leave the row key and the year star empty. Official finish is
 * kind official. Leftover-2× finish is kind leftover and leaves the star empty.
 * Off dest-true. Split by year so one file can retry a year.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-1994-1997.json");
const STARS = {
  "1994": "itt94-csotd",
  "1995": "itt95-ssl-checkout",
  "1996": "itt96-portal-wars",
  "1997": "itt97-pointcast",
};
const YEAR_TIMEOUT = {
  "1994": 15 * 60 * 1000,
  "1995": 15 * 60 * 1000,
  "1996": 15 * 60 * 1000,
  "1997": 15 * 60 * 1000,
};

const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));

test.describe("1994-1997 phase 6 band check", () => {
  test("register still matches the census", () => {
    expect(doc.census.savePages).toBe(841);
    expect(doc.rows).toHaveLength(841);
  });

  for (const year of ["1994", "1995", "1996", "1997"]) {
    const rows = doc.rows.filter((row) => row.year === year);
    test("walk " + year + " (" + rows.length + " save pages)", async ({ browser }) => {
      test.setTimeout(YEAR_TIMEOUT[year]);
      const fails = [];
      for (const row of rows) {
        const context = await browser.newContext();
        await context.addInitScript(() => {
          if (document.cookie.indexOf("itt_pass_walk=1") !== -1) return;
          document.cookie = "itt_pass_walk=1; path=/";
          try {
            localStorage.clear();
            sessionStorage.clear();
          } catch (e) {
            /* */
          }
        });
        const page = await context.newPage();
        page.setDefaultTimeout(20000);
        let rec;
        try {
          rec = await Promise.race([
            walkOne(page, row),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 35000)),
          ]);
        } catch (err) {
          rec = {
            path: row.path,
            pass: false,
            reason: String(err && err.message ? err.message : err).split("\n")[0].slice(0, 240),
            kind: "",
            want: "",
          };
        } finally {
          await context.close().catch(() => {});
        }
        if (!rec.pass) {
          fails.push(row.path + " :: " + rec.reason + " kind=" + rec.kind + " want=" + rec.want);
        }
      }
      expect(fails, fails.join("\n")).toEqual([]);
    });
  }

  test("four year stars finish official with Next visible", async ({ page }) => {
    async function envelope(key) {
      const text = await page.evaluate((k) => localStorage.getItem(k), key);
      return text ? JSON.parse(text) : null;
    }

    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await page.evaluate(() => localStorage.removeItem("itt95-ssl-checkout"));
    await page.fill("[name='name']", "Ada Lovelace");
    await page.fill("[name='card']", "4111");
    await page.fill("[name='city']", "Seattle");
    await page.locator("form[data-ssl-form] button[type='submit']").click();
    await expect.poll(() => envelope("itt95-ssl-checkout")).toBeTruthy();
    expect((await envelope("itt95-ssl-checkout")).kind).toBe("official");
    await expect(page.locator('[data-next-flow][data-next-when-key="itt95-ssl-checkout"]')).toBeVisible();

    await page.goto("/years/1996/sites/portals/wars.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt96-portal-wars");
      sessionStorage.removeItem("itt96-portal-progress");
    });
    await page.reload();
    await page.locator("[data-portal='yahoo']").first().click();
    await page.goto("/years/1996/sites/portals/wars.html");
    await page.locator("[data-portal='excite']").first().click();
    await page.goto("/years/1996/sites/portals/wars.html");
    await page.locator("[data-portal='altavista']").first().click();
    await expect.poll(() => envelope("itt96-portal-wars")).toBeTruthy();
    expect((await envelope("itt96-portal-wars")).kind).toBe("official");
    await page.goto("/years/1996/sites/portals/wars.html");
    await expect(page.locator('[data-next-flow][data-next-when-key="itt96-portal-wars"]')).toBeVisible();
  });
});
