// @ts-check
const { test, expect } = require("@playwright/test");
const { densifyDoor } = require("./year-pack-io");

test.describe("2011 densify", () => {
  test("guided 6 · chip · leftover 2× not first paint", async ({ page }) => {
    await densifyDoor(page, "2011", /googleplus/);
  });
  test("about loads", async ({ page }) => {
    await page.goto("/years/2011/pages/about.html");
    await expect(page.locator("body")).toContainText("Google+");
    await expect(page.locator("body")).toContainText("Vine");
  });

  test("leftover dest loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/chromebook/index.html");
    expect(res && res.ok()).toBeTruthy();
  });

});
