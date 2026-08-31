// @ts-check
/** 1994 mvp alias — W7 pack shape (wraps existing smoke + CSotD). */
const { test, expect } = require("@playwright/test");


test("1994 About prints Gray 10,022 and June 2,738", async ({ page }) => {
  await page.goto("/years/1994/pages/about.html");
  await expect(page.locator("body")).toContainText("10,022");
  await expect(page.locator("body")).toContainText("2,738");
});

test("1994 shell + CSotD room 200", async ({ page }) => {
  const home = await page.goto("/years/1994/pages/home.html");
  expect(home && home.ok()).toBeTruthy();
  await expect(page.locator('[data-ott-one-thing="1994"]')).toBeVisible();
  const csotd = await page.goto("/years/1994/sites/csotd/index.html");
  expect(csotd && csotd.ok()).toBeTruthy();
});
