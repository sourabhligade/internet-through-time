const { test, expect } = require("@playwright/test");

test.describe("1999 Google", () => {
  test("home has search + feeling lucky", async ({ page }) => {
    await page.goto("/years/1999/sites/google/index.html");
    await page.waitForTimeout(500);
    await expect(page.locator('form[data-google-search]')).toBeVisible();
    await expect(page.locator('input[name="btnI"], [data-google-lucky]').first()).toBeVisible();
  });

  test("search results render catalog", async ({ page }) => {
    await page.goto("/years/1999/sites/google/search.html?q=napster");
    await page.waitForTimeout(900);
    await expect(page.locator("[data-google-results]")).toContainText(/Napster|yahoo|Amazon|Search/i);
  });
});
