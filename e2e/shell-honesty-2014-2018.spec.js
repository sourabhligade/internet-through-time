// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

const YEARS = ["2014", "2015", "2016", "2017", "2018"];

test.describe("Shell honesty 2014–2018 (clone scrub)", () => {
  for (const y of YEARS) {
    test(`${y} exit-bar is year-true (not 2013 clone)`, async ({ page }) => {
      await enterYear(page, y);
      const label = page.locator(".year-label");
      await expect(label).toBeVisible();
      await expect(label).toContainText(y);
      await expect(label).not.toContainText("2013 · Windows 7");
      /* Prefs home URL stays year-true (location bar rewrites after navigate) */
      const prefHome = page.locator("#pref-home");
      if (await prefHome.count()) {
        await expect(prefHome).toHaveValue(new RegExp(`web${y}`));
      }
    });
  }
});
