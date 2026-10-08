// @ts-check
/**
 * Phase 1 lock for 2002–2005. Reads the register. Does not click the pages.
 * The visitor walk is phase 6.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2002-2005.json");

test("2002-2005 phase 1 register matches disk and the census", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "2002-2005", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("2002-2005");
  expect(doc.census.savePages).toBe(2319);
  expect(doc.rows).toHaveLength(2319);
  expect(doc.census.destFolders).toBe(2066);
  expect(doc.census.leftover2x).toBe(286);
  expect(doc.census.trailRows).toBe(78);
  expect(doc.census.officialStops).toBe(38);
  expect(doc.census.html).toBe(2455);
  const official = doc.rows.filter((row) => row.role === "official");
  expect(official).toHaveLength(38);
  expect(new Set(official.map((row) => row.whenKey)).size).toBe(38);
  const officialKeys = new Set(official.map((row) => row.whenKey));
  expect(officialKeys.has("itt02-stumble")).toBe(true);
  expect(officialKeys.has("itt03-photobucket")).toBe(true);
  expect(officialKeys.has("itt04-thefacebook-networks")).toBe(true);
  expect(officialKeys.has("itt05-yt-uploads")).toBe(true);
  const byYear = {};
  for (const row of doc.rows) {
    byYear[row.year] = (byYear[row.year] || 0) + 1;
  }
  expect(byYear["2002"]).toBe(273);
  expect(byYear["2003"]).toBe(223);
  expect(byYear["2004"]).toBe(902);
  expect(byYear["2005"]).toBe(921);
  const official2004 = official.filter((row) => row.year === "2004");
  expect(official2004).toHaveLength(8);
  const lx = new Set(
    doc.rows.filter((row) => row.leftover2x).map((row) => row.year + "/" + row.dest)
  );
  expect(lx.size).toBe(286);
});
