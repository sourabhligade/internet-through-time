// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2013 official trail dests exist", () => {
  test("sites/vine/record.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/vine/record.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/instagram/video.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/instagram/video.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/snapchat/story.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/snapchat/story.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/iphone/ios7.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/iphone/ios7.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/iphone/touchid.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/iphone/touchid.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/snowden/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/snowden/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/telegram/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/telegram/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/tumblr/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/tumblr/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/windows81/index.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/windows81/index.html");
    expect(res && res.ok()).toBeTruthy();
  });
  test("sites/playable/game.html loads", async ({ page }) => {
    const res = await page.goto("/years/2013/sites/playable/game.html");
    expect(res && res.ok()).toBeTruthy();
  });
});
