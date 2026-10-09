// @ts-check
/**
 * Phase 1 lock for 2014–2017. 2015 is the React door (no years/2015 tree).
 * 2017 stays absent. Leftover-2× dests with no save hook stay on disk;
 * this register does not dest-farm them. Does not click.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2014-2017.json");

test("2014-2017 phase 1 register matches disk and keeps 2015/2017 trees absent", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "2014-2017", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("2014-2017");
  expect(doc.census.savePages).toBe(18);
  expect(doc.rows).toHaveLength(18);
  expect(doc.census.officialStops).toBe(9);
  expect(doc.census.leftover2x).toBe(16);
  expect(doc.census.byYear["2015"].html).toBe(0);
  expect(doc.census.byYear["2017"].html).toBe(0);
  expect(fs.existsSync(path.join(ROOT, "years/2015"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "years/2017"))).toBe(false);
  const officialKeys = new Set(doc.rows.filter((row) => row.role === "official").map((row) => row.whenKey));
  expect(officialKeys.has("itt14-wa-install")).toBe(true);
  expect(officialKeys.has("itt15-periscope")).toBe(false);
  const nosave = [
    "facebook",
    "instagram",
    "musically14",
    "snapchat",
    "truecrypt",
    "twitter",
    "uber",
    "wikipedia",
    "youtube",
  ];
  for (const dest of nosave) {
    expect(fs.existsSync(path.join(ROOT, "years/2014/sites", dest))).toBe(true);
    expect(doc.rows.some((row) => row.year === "2014" && row.dest === dest)).toBe(false);
  }
});
