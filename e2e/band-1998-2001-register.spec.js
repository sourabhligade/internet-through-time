// @ts-check
/**
 * Phase 1 lock for 1998–2001. Reads the register. Does not click the pages.
 * The visitor walk is phase 6.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-1998-2001.json");

const LEFTOVER_2000_N21_40 = [
  "itt00-ig",
  "itt00-sothebys",
  "itt00-farmclub",
  "itt00-emoneymail",
  "itt00-libertad-digital",
  "itt00-globo",
  "itt00-scour",
  "itt00-launch",
  "itt00-ukrainska-pravda",
  "itt00-paybox",
  "itt00-site59",
  "itt00-cahoot",
  "itt00-eluxury",
  "itt00-ucsc-genome",
  "itt00-bigbrother",
  "itt00-emusic",
  "itt00-seganet",
  "itt00-foldingathome",
  "itt00-idealista",
  "itt00-voteswap2000",
];

test("1998-2001 phase 1 register matches disk and the census", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "1998-2001", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("1998-2001");
  expect(doc.census.savePages).toBe(1539);
  expect(doc.rows).toHaveLength(1539);
  expect(doc.census.destFolders).toBe(1340);
  expect(doc.census.leftover2x).toBe(277);
  expect(doc.census.trailRows).toBe(100);
  expect(doc.census.officialStops).toBe(40);
  expect(doc.census.html).toBe(1793);
  const official = doc.rows.filter((row) => row.role === "official");
  expect(official).toHaveLength(40);
  expect(new Set(official.map((row) => row.whenKey)).size).toBe(40);
  const officialKeys = new Set(official.map((row) => row.whenKey));
  expect(officialKeys.has("itt98-lucky")).toBe(true);
  expect(officialKeys.has("itt99-aim")).toBe(true);
  expect(officialKeys.has("itt00-mapquest")).toBe(true);
  expect(officialKeys.has("itt01-wiki")).toBe(true);
  const lx = new Set(
    doc.rows.filter((row) => row.leftover2x).map((row) => row.year + "/" + row.dest)
  );
  expect(lx.size).toBe(277);
  for (const key of LEFTOVER_2000_N21_40) {
    const rows = doc.rows.filter((row) => row.whenKey === key);
    expect(rows.length, key).toBeGreaterThan(0);
    expect(officialKeys.has(key), key + " must stay leftover").toBe(false);
    for (const row of rows) {
      expect(row.role, key).toBe("leftover-trail");
      expect(row.n, key).toBeGreaterThan(10);
    }
  }
});
