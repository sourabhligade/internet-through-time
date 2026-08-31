// @ts-check
/**
 * 2008–2013 exit-bar year-labels are year-true (not 2004 thesis / 2007 clone).
 */
const { test, expect } = require("@playwright/test");

const { enterYear, killOverlays } = require("./helpers");

const YEARS = [
  { year: "2008", re: /2008/, not: /2004 thesis|^2007 ·/ },
  { year: "2010", re: /2010/, not: /2004 thesis|^2007 ·/ },
];

test.describe("shell honesty 2008–2013", () => {
  for (const row of YEARS) {
    test(`${row.year} year-label is year-true`, async ({ page }) => {
      await enterYear(page, row.year);
      await killOverlays(page);
      const label = ((await page.locator(".year-label").first().textContent()) || "").trim();
      expect(label).toMatch(row.re);
      expect(label).not.toMatch(/2004 thesis/i);
      expect(label).not.toMatch(/^2007 ·/);
    });
  }
});
