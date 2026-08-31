// @ts-check
/**
 * 1998 I'm Feeling Lucky — empty blocked · writes itt98-lucky · in-year jump
 */
const { test, expect } = require("@playwright/test");


test.describe("1998 I'm Feeling Lucky real jump", () => {
  test("empty query does not write; yahoo jumps in-year", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await page.evaluate(() => localStorage.removeItem("itt98-lucky"));
    await page.reload();
    await page.waitForTimeout(500);

    await page.locator("[data-google-lucky]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt98-lucky"))).toBeNull();

    await page.fill("#ott-field", "yahoo");
    await page.locator("[data-google-lucky]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt98-lucky")))
      .toMatch(/yahoo/);

    await page.waitForURL(/yahoo/i, { timeout: 15000 });
    await expect(page.locator("body")).toContainText(/Yahoo/i);
    expect(page.url()).not.toMatch(/google\.com/);
  });

  test("lucky costume matches sparse Google home chrome", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await expect(page.locator('img[alt="Google!"]')).toBeVisible();
    await expect(page.locator("[data-google-lucky]")).toBeVisible();
    await expect(page.locator("body")).toContainText(/Copyright/i);
    await expect(page.locator("body")).toContainText(/1998/i);
  });
});
