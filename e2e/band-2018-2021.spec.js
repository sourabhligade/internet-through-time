// @ts-check
/**
 * Phase 6 band check for 2018–2021. 2018 and 2019 stay absent. Walks every
 * register row. Off dest-true.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2018-2021.json");
const YEAR_TIMEOUT = {
  "2020": 8 * 60 * 1000,
  "2021": 8 * 60 * 1000,
};

const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));

test.describe("2018-2021 phase 6 band check", () => {
  test("register still matches the census and 2018-2019 stay absent", () => {
    expect(doc.census.savePages).toBe(40);
    expect(doc.rows).toHaveLength(40);
    expect(fs.existsSync(path.join(ROOT, "years/2018"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "years/2019"))).toBe(false);
  });

  for (const year of ["2020", "2021"]) {
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
});
