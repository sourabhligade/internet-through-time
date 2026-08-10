// @ts-check
const { test, expect } = require("@playwright/test");
const { waitKey } = require("./helpers");

test.describe("2014 trail REAL", () => {
  test("?trail=2014-start writes night state", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.removeItem("itt-first-night");
      localStorage.removeItem("itt-passport");
    });
    await page.goto("/years/2014/?trail=2014-start&room=pages%2Fabout.html");
    await page.locator("#skip-connect").click({ timeout: 5000 }).catch(() => {});
    const night = await waitKey(page, "itt-first-night");
    expect(night).toMatch(/2014-start/);
  });

  test("guided home has About + WhatsApp", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    await expect(page.locator('#ott-guided-2014 a[href="about.html"]').first()).toBeVisible();
    await expect(page.locator('#ott-guided-2014 a[href*="whatsapp"]').first()).toBeVisible();
  });
});
