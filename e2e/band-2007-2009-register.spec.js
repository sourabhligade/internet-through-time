// @ts-check
/**
 * Phase 1 lock for 2007–2009. Reads the register. Does not click the pages.
 * The visitor walk is phase 6.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2007-2009.json");

test("2007-2009 phase 1 register matches disk and the census", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "2007-2009", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("2007-2009");
  expect(doc.census.savePages).toBe(288);
  expect(doc.rows).toHaveLength(288);
  expect(doc.census.destFolders).toBe(224);
  expect(doc.census.leftover2x).toBe(97);
  expect(doc.census.trailRows).toBe(30);
  expect(doc.census.officialStops).toBe(30);
  expect(doc.census.html).toBe(341);
  const officialKeys = new Set(doc.rows.filter((row) => row.role === "official").map((row) => row.whenKey));
  expect(officialKeys.has("itt07-iphone")).toBe(true);
  expect(officialKeys.has("itt08-apps")).toBe(true);
  expect(officialKeys.has("itt09-like")).toBe(true);
});
