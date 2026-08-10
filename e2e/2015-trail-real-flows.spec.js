// @ts-check
const { test, expect } = require("@playwright/test");
const { waitKey } = require("./helpers");

test.describe("2015 trail REAL", () => {
  test("?trail=2015-start writes night state", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
    });
    await page.goto("/years/2015/?trail=2015-start&room=pages%2Fabout.html");
    await page.locator("#skip-connect").click({ timeout: 5000 }).catch(() => {});
    const night = await waitKey(page, "itt-first-night");
    expect(night).toMatch(/2015-start/);
  });
});
