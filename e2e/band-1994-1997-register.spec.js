// @ts-check
/**
 * Phase 1 lock for 1994–1997. Reads the register. Does not click the pages.
 * The visitor walk is phase 6.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-1994-1997.json");

test("1994-1997 phase 1 register matches disk and the census", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "1994-1997", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("1994-1997");
  expect(doc.census.savePages).toBe(841);
  expect(doc.rows).toHaveLength(841);
  expect(doc.census.destFolders).toBe(630);
  expect(doc.census.leftover2x).toBe(310);
  expect(doc.census.trailRows).toBe(80);
  expect(doc.census.officialStops).toBe(40);
  expect(doc.census.html).toBe(1247);
  const official = doc.rows.filter((row) => row.role === "official");
  expect(official).toHaveLength(40);
  expect(new Set(official.map((row) => row.whenKey)).size).toBe(40);
  const lx = new Set(
    doc.rows.filter((row) => row.leftover2x).map((row) => row.year + "/" + row.dest)
  );
  expect(lx.size).toBe(310);
});
