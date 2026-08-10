// @ts-check
/** Continuity archive chips on late-year clone rooms. */
const { test, expect } = require("@playwright/test");

const SAMPLES = [
  "/years/2008/sites/amazon/index.html",
  "/years/2010/sites/yahoo/index.html",
  "/years/2012/sites/amazon/index.html",
  "/years/2013/sites/yahoo/index.html",
];

test.describe("continuity forest chips", () => {
  for (const path of SAMPLES) {
    test(`${path} labels archive`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("body")).toContainText(/Continuity archive/i);
    });
  }
});
