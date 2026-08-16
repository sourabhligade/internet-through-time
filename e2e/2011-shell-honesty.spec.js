// @ts-check
/**
 * 2011 shell honesty — Win7 / IE9, not XP + 2007 chrome as the year story.
 * Do not call killOverlays (overlay honesty).
 */
const { test, expect } = require("@playwright/test");

test.describe("2011 shell honesty (visitor-facing)", () => {
  test("Start banner + shutdown + Open Location are IE9 / Windows 7", async ({ page }) => {
    await page.goto("/years/2011/index.html");
    await expect(page.locator(".start-banner-text")).toContainText(/Windows\s*7/i);
    await expect(page.locator(".start-banner-text")).not.toContainText(/XP/);
    await expect(page.locator(".itt-shell-honesty")).toContainText(/IE7 continuity/);
    const html = await page.content();
    expect(html).toMatch(/Shut down Windows 7 immersion/);
    expect(html).not.toMatch(/Shut down Windows XP/);
    expect(html).toMatch(/Open Location in Internet Explorer 9/);
    await expect(page.locator('[aria-label="Internet Explorer 9"]')).toHaveCount(1);
  });

  test("body class is os-win7 browser-ie9", async ({ page }) => {
    await page.goto("/years/2011/index.html");
    const cls = await page.locator("body").getAttribute("class");
    expect(cls || "").toMatch(/os-win7/);
    expect(cls || "").toMatch(/browser-ie9/);
  });

  test("Path room no longer leaks itt15- CSS classes", async ({ page }) => {
    const html = await (await page.request.get("/years/2011/sites/path/index.html")).text();
    expect(html).not.toMatch(/itt15-/);
    expect(html).toMatch(/itt11-/);
  });
});
