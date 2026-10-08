// @ts-check
/**
 * Phase 1 lock for 2010–2013. Reads the register. Does not click the pages.
 * The visitor walk is phase 6.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2010-2013.json");

test("2010-2013 phase 1 register matches disk and the census", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "2010-2013", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("2010-2013");
  expect(doc.census.savePages).toBe(182);
  expect(doc.rows).toHaveLength(182);
  expect(doc.census.destFolders).toBe(150);
  expect(doc.census.leftover2x).toBe(51);
  expect(doc.census.trailRows).toBe(39);
  expect(doc.census.officialStops).toBe(39);
  expect(doc.census.html).toBe(222);
  const officialKeys = new Set(doc.rows.filter((row) => row.role === "official").map((row) => row.whenKey));
  expect(officialKeys.has("itt10-ig-posts")).toBe(true);
  expect(officialKeys.has("itt12-facebook")).toBe(true);
  expect(officialKeys.has("itt12-fb-ipo")).toBe(true);
  expect(officialKeys.has("itt13-vine-posts")).toBe(true);
  const official2013 = doc.rows.filter((row) => row.year === "2013" && row.role === "official");
  expect(official2013).toHaveLength(9);
});
