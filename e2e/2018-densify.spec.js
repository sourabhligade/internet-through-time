// @ts-check
const { test, expect } = require("@playwright/test");


test.describe("2018 densify", () => {
  test("manage replay has no Accept All writer", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/manage.html");
    await expect(page.locator("[data-gdpr-accept-all]")).toHaveCount(0);
    await expect(page.locator("[data-gdpr-save]")).toHaveCount(0);
  });

  test("guided list stays 6", async ({ page }) => {
    await page.goto("/years/2018/pages/home.html");
    await expect(page.locator("#ott-guided-2018 ol > li")).toHaveCount(6);
  });
});
