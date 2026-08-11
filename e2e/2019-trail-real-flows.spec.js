// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2019 start trail", () => {
  test("2019-start trail boots shell", async ({ page }) => {
    await enterYear(page, "2019");
    await page.goto("/years/2019/?trail=2019-start");
    await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2019");
  });
});
