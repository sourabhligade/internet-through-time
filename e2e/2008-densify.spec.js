// @ts-check
const { test, expect } = require("@playwright/test");
const { densifyDoor } = require("./year-pack-io");

test.describe("2008 densify", () => {
  test("guided 6 · chip · leftover 2× not first paint", async ({ page }) => {
    await densifyDoor(page, "2008", /appstore/);
  });
  test("about loads", async ({ page }) => {
    await page.goto("/years/2008/pages/about.html");
    await expect(page.locator("body")).toContainText("172,338,726");
    await expect(page.locator("body")).toContainText("iPhone 3GS");
  });

  test("leftover dest loads", async ({ page }) => {
    const res = await page.goto("/years/2008/sites/cuil/index.html");
    expect(res && res.ok()).toBeTruthy();
  });

});
