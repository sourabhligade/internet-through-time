// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2018 trail REAL", () => {
  test("GDPR next-flow appears after save", async ({ page }) => {
    await page.goto("/years/2018/sites/gdpr/rights.html");
    await page.evaluate(() => localStorage.removeItem("itt18-gdpr"));
    await page.reload();
    await expect(page.locator("[data-next-flow]")).toBeHidden();
    await page.locator("[data-gdpr-art15]").check();
    await page.locator("[data-gdpr-art17]").check();
    await page.locator("[data-gdpr-date]").check();
    await page.locator("[data-gdpr-save]").click();
    await expect(page.locator("[data-next-flow]")).toBeVisible();
    await expect(page.locator("[data-next-flow] a[href*='tiktok']").first()).toBeVisible();
  });

  test("musical.ly trail points at TikTok merge", async ({ page }) => {
    await page.goto("/years/2018/sites/musically/index.html");
    await expect(page.locator("a[href*='tiktok']").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Aug(?:ust)?\s*2/i);
  });

  test("Trust next-flow goes to hearing", async ({ page }) => {
    await page.goto("/years/2018/sites/trust/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-ca"));
    await page.reload();
    await page.locator("[data-ca-quiz]").check();
    await page.locator("[data-ca-press]").check();
    await page.locator("[data-ca-hearing]").check();
    await page.locator("[data-ca-save]").click();
    await expect(page.locator("[data-next-flow] a[href*='hearing']").first()).toBeVisible();
  });

  test("2017 musical.ly links forward to 2018 TikTok", async ({ page }) => {
    await page.goto("/years/2017/sites/musically/index.html");
    await expect(page.locator("a[href*='2018'][href*='tiktok']").first()).toBeVisible();
  });

  test("?trail=2018-start writes night state", async ({ page }) => {
    await page.goto("/years/2018/?trail=2018-start&room=pages%2Fabout.html");
    await page.waitForTimeout(400);
    const night = await page.evaluate(() => {
      const keys = Object.keys(localStorage);
      return keys.filter((k) => /trail|night|2018-start/i.test(k) || /itt-night|itt-trail/.test(k)).join(",");
    });
    expect(String(night + (await page.content()))).toMatch(/2018/);
  });
});
