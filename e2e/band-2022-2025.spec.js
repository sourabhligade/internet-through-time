// @ts-check
/**
 * Phase 6 band check for 2022–2025. 2023–2025 stay absent. Walks every
 * register row. Off dest-true.
 */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");
const { walkOne } = require("../scripts/build_passes.js");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2022-2025.json");

const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));

test.describe("2022-2025 phase 6 band check", () => {
  test("register still matches the census and 2023-2025 stay absent", () => {
    expect(doc.census.savePages).toBe(29);
    expect(doc.rows).toHaveLength(29);
    expect(fs.existsSync(path.join(ROOT, "years/2023"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "years/2024"))).toBe(false);
    expect(fs.existsSync(path.join(ROOT, "years/2025"))).toBe(false);
  });

  test("walk 2022 (" + doc.rows.filter((row) => row.year === "2022").length + " save pages)", async ({ browser }) => {
    test.setTimeout(8 * 60 * 1000);
    const rows = doc.rows.filter((row) => row.year === "2022");
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
});
