// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2017 densify", () => {
  test("Animoji has no Face ID official writer", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/animoji.html");
    await expect(page.locator("[data-faceid-unlock]")).toHaveCount(0);
    await expect(page.locator("[data-animoji-need], [data-animoji-ready]")).toHaveCount(2);
  });

  test("guided list stays 6", async ({ page }) => {
    await page.goto("/years/2017/pages/home.html");
    await expect(page.locator("#ott-guided-2017 ol > li")).toHaveCount(6);
  });
});
