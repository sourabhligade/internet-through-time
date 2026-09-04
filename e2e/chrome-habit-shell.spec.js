// @ts-check
const { test, expect } = require("@playwright/test");


const YEARS = ["2016", "2017", "2019"];

test.describe("Chrome habit shell labels", () => {
  for (const year of YEARS) {
    test(`${year} shell names Chrome habit, not Internet Explorer`, async ({ page }) => {
      await page.goto(`/years/${year}/`);
      await expect(page).toHaveTitle(/Chrome habit/);
      await expect(page.locator("#task-ie")).toHaveText(/Chrome habit/);
      await expect(page.locator("#window-title")).toContainText(/Chrome habit/);
    });
  }
});
