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

  test("Win7 residual is 2014 voice not Mass PC year 2013", async ({ page }) => {
    await page.goto("/years/2014/sites/windows7/index.html");
    await expect(page.locator("body")).toContainText(/residual 2014|Mass residual 2014/i);
    await expect(page.locator("body")).not.toContainText("Mass PC year 2013");
    await expect(page.locator("body")).toContainText("About 2014");
  });

  test("IE8 room is 2009 archive not 2014 XP shell", async ({ page }) => {
    await page.goto("/years/2014/sites/ie8/index.html");
    await expect(page.locator("body")).toContainText(/archive residual|2014 residual/i);
    await expect(page.locator("body")).not.toContainText("Windows XP + IE 9");
    await expect(page.locator("body")).toContainText(/IE 11|Chrome|Technical Preview/i);
  });

  test("iOS 7 is 2013 residual under iOS 8", async ({ page }) => {
    await page.goto("/years/2014/sites/iphone/ios7.html");
    await expect(page.locator("body")).toContainText(/2013 residual|Residual · Sep 2013/i);
    await expect(page.locator("body")).toContainText(/iOS 8/i);
  });
});
