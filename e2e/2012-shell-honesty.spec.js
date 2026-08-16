// @ts-check
/**
 * 2012 shell honesty — Win7 residual / IE9, not XP.
 * Do not call killOverlays (overlay honesty).
 */
const { test, expect } = require("@playwright/test");

test.describe("2012 shell honesty (visitor-facing)", () => {
  test("Start banner + shutdown + Open Location are IE9 / Windows 7", async ({ page }) => {
    await page.goto("/years/2012/index.html");
    await expect(page.locator(".start-banner-text")).toContainText(/Windows\s*7/i);
    await expect(page.locator(".start-banner-text")).not.toContainText(/XP/);
    await expect(page.locator(".itt-shell-honesty")).toContainText(/IE7 continuity/);
    const html = await page.content();
    expect(html).toMatch(/Shut down Windows 7 immersion/);
    expect(html).not.toMatch(/Shut down Windows XP/);
    expect(html).toMatch(/Open Location in Internet Explorer 9/);
  });

  test("body class is os-win7", async ({ page }) => {
    await page.goto("/years/2012/index.html");
    const cls = await page.locator("body").getAttribute("class");
    expect(cls || "").toMatch(/os-win7/);
  });
});
