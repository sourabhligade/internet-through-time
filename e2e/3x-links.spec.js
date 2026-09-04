// @ts-check
/**
 * 3× discoverable links — every playable year on disk.
 * Early years: lobby directory [data-itt-3x-links]. Lean leftover years: leftover pop3x row.
 * Guided <ol> stays 6. Star chip stays.
 */
const { test, expect } = require("@playwright/test");
const { openAlsoYear } = require("./helpers");

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
for (let y = 1994; y <= 2024; y++) YEARS.push(String(y));

function yearOnDisk(year) {
  return fs.existsSync(path.join(ROOT, "years", year, "index.html"));
}

test.describe("3× links every implemented year", () => {
  for (const year of YEARS) {
    test(`${year} home 3× directory · guided 6 · star · sample hrefs 200`, async ({ page }) => {
      test.skip(!yearOnDisk(year), year + " not on disk");
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol li`)).toHaveCount(6);
      await expect(page.locator("[data-ott-one-thing]").first()).toBeVisible();
      await openAlsoYear(page, year);
      const box = page.locator(
        "[data-itt-3x-links]:visible, [data-itt-pop3x]:visible, [data-itt-cut-3x-trios]:visible"
      ).first();
      await expect(box).toBeVisible();
      const hrefs = await box.locator("a[href]").evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "").filter(Boolean)
      );
      const minHrefs = (await box.getAttribute("data-itt-3x-links")) !== null ? 12 : 3;
      expect(hrefs.length, `${year} 3× dests`).toBeGreaterThanOrEqual(minHrefs);
      const samples = hrefs.filter((_, i) => i === 0 || i === Math.floor(hrefs.length / 2) || i === hrefs.length - 1);
      for (const href of samples) {
        const url = new URL(href, `http://x/years/${year}/pages/home.html`).pathname;
        const res = await page.goto(url);
        expect(res && res.ok(), url).toBeTruthy();
        await expect(page.locator("html")).toHaveAttribute("data-itt-year", year);
      }
    });
  }
});

