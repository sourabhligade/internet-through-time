// @ts-check
const { test, expect } = require("@playwright/test");
const { densifyDoor } = require("./year-pack-io");

test.describe("2009 densify", () => {
  test("guided 6 · chip · leftover 2× not first paint", async ({ page }) => {
    await densifyDoor(page, "2009", /facebook/);
  });
  test("about loads", async ({ page }) => {
    await page.goto("/years/2009/pages/about.html");
    await expect(page.locator("body")).toContainText("238,027,855");
    await expect(page.locator("body")).toContainText("iPad");
  });

  test("leftover dest loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/whatsapp/index.html");
    expect(res && res.ok()).toBeTruthy();
  });

});
