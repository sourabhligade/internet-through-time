// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2014 shell honesty", () => {
  test("not Win10 as January shell class", async ({ page }) => {
    await enterYear(page, "2014");
    const cls = (await page.locator("body").getAttribute("class")) || "";
    expect(cls).toMatch(/os-win7|win7/i);
    expect(cls).not.toMatch(/os-win10/);
  });

  test("connect overlay is 2014 thesis", async ({ page }) => {
    await page.goto("/years/2014/");
    await expect(page.locator("#connect-overlay")).toContainText(/WhatsApp|Heartbleed|iPhone 6|1B/i);
  });

  test("About bans Watch retail and Win10 free upgrade", async ({ page }) => {
    await page.goto("/years/2014/pages/about.html");
    await expect(page.locator("body")).toContainText(/Watch/i);
    await expect(page.locator("body")).toContainText(/Windows/i);
  });

  test("Win7 / IE8 clone rooms are gone (lean 2014)", async ({ page }) => {
    const w7 = await page.goto("/years/2014/sites/windows7/index.html");
    expect(w7 && w7.status()).toBe(404);
    const ie8 = await page.goto("/years/2014/sites/ie8/index.html");
    expect(ie8 && ie8.status()).toBe(404);
    await page.goto("/years/2014/pages/home.html");
    await expect(page.locator("body")).toContainText(/This year is lean/i);
    await expect(page.locator("body")).not.toContainText("Mass PC year 2013");
  });

  test("iOS 7 clone is gone · iOS 8 year-true remains", async ({ page }) => {
    const ios7 = await page.goto("/years/2014/sites/iphone/ios7.html");
    expect(ios7 && ios7.status()).toBe(404);
    await page.goto("/years/2014/sites/iphone/ios8.html");
    await expect(page.locator("body")).toContainText(/iOS 8/i);
  });
});
