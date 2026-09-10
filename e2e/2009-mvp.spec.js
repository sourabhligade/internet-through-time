// @ts-check
const { test, expect } = require("@playwright/test");
const { expectYearBoarded } = require("./helpers");

test.describe("2009 mvp", () => {
  test("hub has no 2009 card · year shell bounces to hub", async ({ page }) => {
    await expectYearBoarded(page, "2009");
  });
  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2009/pages/about.html");
    await expect(page.locator("body")).toContainText("238,027,855");
  });
});
