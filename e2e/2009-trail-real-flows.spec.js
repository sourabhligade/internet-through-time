// @ts-check
const { test, expect } = require("@playwright/test");
test.describe("2009 official trail dests exist", () => {
  test("sites/facebook/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/facebook/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/farmville/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/farmville/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/bing/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/bing/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/iphone/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/iphone/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/appstore/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/appstore/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/twitter/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/twitter/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/foursquare/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/foursquare/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/kickstarter/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/kickstarter/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/windows7/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/windows7/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/playable/game.html loads", async ({ page }) => {
    const res = await page.goto("/years/2009/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
  });
});
