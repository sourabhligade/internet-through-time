// @ts-check
/**
 * Phase 1 lock for 2022–2025. 2023–2025 stay absent. Does not click.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

const ROOT = path.join(__dirname, "..");
const REGISTER = path.join(ROOT, "e2e/registers/band-2022-2025.json");

test("2022-2025 phase 1 register matches disk and keeps 2023-2025 absent", () => {
  execFileSync("python3", ["scripts/gen_band_register.py", "2022-2025", "--check"], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const doc = JSON.parse(fs.readFileSync(REGISTER, "utf8"));
  expect(doc.band).toBe("2022-2025");
  expect(doc.census.savePages).toBe(29);
  expect(doc.rows).toHaveLength(29);
  expect(doc.census.officialStops).toBe(10);
  expect(doc.census.byYear["2023"].html).toBe(0);
  expect(doc.census.byYear["2024"].html).toBe(0);
  expect(doc.census.byYear["2025"].html).toBe(0);
  expect(fs.existsSync(path.join(ROOT, "years/2023"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "years/2024"))).toBe(false);
  expect(fs.existsSync(path.join(ROOT, "years/2025"))).toBe(false);
  const officialKeys = new Set(doc.rows.filter((row) => row.role === "official").map((row) => row.whenKey));
  expect(officialKeys.has("itt22-chatgpt")).toBe(true);
});
