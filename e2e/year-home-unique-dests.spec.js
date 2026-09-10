// @ts-check
/**
 * Year Starting Point leftover warehouse: one dest slug once.
 * Gold chip + guided 6 may repeat the star dest. Leftover-3× packs stay 9/9/9.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

const YEARS = [];
for (let y = 1994; y <= 2022; y++) YEARS.push(String(y));

function destSlug(href) {
  const m = String(href || "").match(/sites\/([^/]+)\//);
  return m ? m[1].toLowerCase() : "";
}

test.describe("year home leftover warehouse · unique dests", () => {
  for (const year of YEARS) {
    test(`${year} warehouse lists each dest once (prefer index)`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await revealLeftoverRails(page);
      const box = page.locator("[data-itt-3x-links]").first();
      if (!(await box.count())) {
        test.skip(true, year + " lean — leftover-3× row, no warehouse");
        return;
      }
      const hrefs = await box.locator('a[href*="sites/"]').evaluateAll((els) =>
        els.map((a) => a.getAttribute("href") || "")
      );
      const slugs = hrefs.map(destSlug).filter(Boolean);
      expect(slugs, year + " dest slugs").toEqual([...new Set(slugs)]);
      for (const href of hrefs) {
        expect(href, year + " leftover dest " + href).not.toMatch(/\/(about|more)\.html$/i);
      }
    });
  }
});
