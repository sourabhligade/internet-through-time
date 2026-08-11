// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2017 shell honesty", () => {
  test("connect overlay is 2017 thesis", async ({ page }) => {
    await page.goto("/years/2017/");
    await expect(page.locator("#connect-overlay")).toContainText(/Face ID|Fortnite|280|1\.77B/i);
  });

  test("About bans TikTok GDPR Reels", async ({ page }) => {
    await page.goto("/years/2017/pages/about.html");
    await expect(page.locator("body")).toContainText(/TikTok/i);
    await expect(page.locator("body")).toContainText(/GDPR/i);
    await expect(page.locator("body")).toContainText(/Reels/i);
  });

  test("connect overlay is not leftover 2016", async ({ page }) => {
    await page.goto("/years/2017/");
    const overlay = page.locator("#connect-overlay");
    await expect(overlay).toBeVisible();
    await expect(overlay).not.toContainText(/Instagram Stories Aug 2|1\.05B hostnames/i);
  });

  test("window location / title stay 2017 after enter", async ({ page }) => {
    await enterYear(page, "2017");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2017/);
    expect(title).not.toMatch(/2016 Starting Point/);
  });

  test("Vine is actually gone", async ({ page }) => {
    await page.goto("/years/2017/sites/vine/gone.html");
    await expect(page.locator("body")).toContainText(/Jan(?:uary)?\s*17/i);
    await expect(page.locator("body")).toContainText(/2016 only/i);
  });

  test("iPhone X is Face ID not XS", async ({ page }) => {
    await page.goto("/years/2017/sites/iphone/x.html");
    await expect(page.locator("body")).toContainText(/Face ID/i);
    await expect(page.locator("body")).toContainText(/not XS/i);
  });

  test("musical.ly says not TikTok", async ({ page }) => {
    await page.goto("/years/2017/sites/musically/index.html");
    await expect(page.locator("body")).toContainText(/not TikTok/i);
  });

  test("Yahoo 3B is 2017 news", async ({ page }) => {
    await page.goto("/years/2017/sites/yahoo-3b/index.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*3/i);
    await expect(page.locator("body")).toContainText(/3 billion/i);
  });
});
