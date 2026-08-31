// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2011 official trail dests exist", () => {
  test("sites/googleplus/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/googleplus/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/spotify/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/spotify/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/iphone/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/iphone/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/facebook/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/facebook/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/ipad/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/ipad/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/airbnb/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/airbnb/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/instagram/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/instagram/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/twitter/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/twitter/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/qwikster/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/qwikster/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/playable/game.html loads", async ({ page }) => {
    const res = await page.goto("/years/2011/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
  });
});
