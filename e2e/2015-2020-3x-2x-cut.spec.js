// @ts-check
/**
 * CUT-3X-2X-2015-2020 — dest-farm leftover-3× extra dests are dest-farm leftover-3× dest-farm.
 * Leftover-3× unique dest-true dests ship in leftover-3x-unique.spec.js and 2015-2020-3x-cut.spec.js.
 * This pack: leftover 4× = 0 · dest folder counts · dest-farm leftover-3× extra dests dest-disjoint leftover dest leftover-3× unique dest-true dests.
 * Do not dest-farm leftover dest leftover-3× dest-farm extra dests as leftover-3× unique dest-true dests.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { ROWS } = require("./leftover-3x-unique-doors");

const ROOT = path.join(__dirname, "..");

function destFolders(year) {
  const dir = path.join(ROOT, "years", year, "sites");
  return fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
}

test.describe("CUT-3X-2X-2015-2020 dest-farm leftover-3× extra dests stay dest-farm leftover-3× dest-farm", () => {
  test("2018 and 2020 are live lean doors", () => {
    expect(fs.existsSync(path.join(ROOT, "years", "2018", "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, "years", "2020", "index.html"))).toBe(true);
  });

  test("leftover 4× stays 0 on 2016 / 2017 / 2019 dests", () => {
    for (const y of ["2016", "2017", "2019"]) {
      const dir = path.join(ROOT, "years", y, "sites");
      const hits = [];
      function walk(d) {
        for (const name of fs.readdirSync(d)) {
          const p = path.join(d, name);
          if (fs.statSync(p).isDirectory()) walk(p);
          else if (name.endsWith(".html")) {
            const t = fs.readFileSync(p, "utf8");
            if (t.includes("data-4x-panel") || t.includes("data-4x-go")) hits.push(p);
          }
        }
      }
      walk(dir);
      expect(hits, y + " leftover 4×").toEqual([]);
    }
  });

  test("dest folders stay dest-lock-reverted disk counts", () => {
    const want = { 2015: 213, 2016: 96, 2017: 222, 2019: 170 };
    for (const [y, n] of Object.entries(want)) {
      expect(destFolders(y).length, y + " dest folders").toBe(n);
    }
  });

  test("dest-farm leftover-3× extra dests dest-disjoint leftover dest leftover-3× unique dest-true dests", () => {
    const extra = {
      2015: ["facebook", "hbonow", "slack", "waweb", "agario", "adblock", "ytgaming", "instant"],
      2016: ["linkedinms", "jio", "houseparty"],
      2017: ["hqtrivia", "pubgnote", "facebook2b", "youtubetv", "notpetya", "nnrepeal", "yahoo3b", "iphone8", "pixel2"],
    };
    for (const [year, dests] of Object.entries(extra)) {
      const unique = new Set(ROWS.filter((r) => r.year === year).map((r) => r.id));
      const folders = new Set(destFolders(year));
      for (const id of dests) {
        expect(unique.has(id), year + " " + id + " must not be leftover-3× unique dest-true dest").toBe(false);
        expect(folders.has(id), year + " " + id + " dest folder").toBe(true);
      }
    }
  });
});
