// @ts-check
/**
 * 3× discoverable links — every playable year on disk (1994–2018).
 * Early years: lobby directory [data-itt-3x-links]. Lean 2010–2018: leftover pop3x row.
 * Guided <ol> stays 6. Star chip stays.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
for (let y = 1994; y <= 2019; y++) YEARS.push(String(y));

function yearOnDisk(year) {
  return fs.existsSync(path.join(ROOT, "years", year, "index.html"));
}

test.describe("3× links every implemented year", () => {
  for (const year of YEARS) {
    test(`${year} home 3× directory · guided 6 · star · sample hrefs 200`, async ({ page }) => {
      test.skip(!yearOnDisk(year), year + " not on disk");
      await page.goto(`/years/${year}/pages/home.html`);
      await expect(page.locator(`#ott-guided-${year} ol li`)).toHaveCount(6);
      await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toHaveCount(1);
      const dir = page.locator("[data-itt-3x-links]");
      const pop = page.locator(`[data-itt-pop3x="${year}"]`);
      const hasDir = (await dir.count()) > 0;
      const box = hasDir ? dir : pop;
      await expect(box).toBeVisible();
      const hrefs = await box.locator("a[href]").evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "").filter(Boolean)
      );
      expect(hrefs.length, `${year} 3× dests`).toBeGreaterThanOrEqual(hasDir ? 12 : 3);
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

