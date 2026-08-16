// @ts-check
/** 1994 mvp alias — W7 pack shape (wraps existing smoke + CSotD). */
const { test, expect } = require("@playwright/test");

test("1994 shell + CSotD room 200", async ({ page }) => {
  const home = await page.goto("/years/1994/pages/home.html");
  expect(home && home.ok()).toBeTruthy();
  await expect(page.locator('[data-ott-one-thing="1994"]')).toBeVisible();
  const csotd = await page.goto("/years/1994/sites/csotd/index.html");
  expect(csotd && csotd.ok()).toBeTruthy();
});
