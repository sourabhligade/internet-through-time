// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

test.describe("2007 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2007/pages/about.html");
    await expect(page.locator("body")).toContainText("121,892,559");
    await expect(page.locator("body")).toContainText("App Store");
    await expect(page.locator("body")).toContainText("Chrome");
  });

  test("guided stays exactly 6 + chip is iPhone Safari", async ({ page }) => {
    await page.goto("/years/2007/pages/home.html");
    await expect(page.locator("#ott-guided-2007 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2007"]')).toHaveAttribute("href", /iphone/);
  });

  test("star App Store trap never writes; Safari after ticks writes", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-iphone"));
    await page.reload();
    await page.locator("[data-ip07-store]").click();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    await page.locator("[data-ip07-safari]").click();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    await page.locator("[data-ip07-req]").nth(0).check();
    await page.locator("[data-ip07-req]").nth(1).check();
    await page.locator('[data-ip07-cap][value="4"]').check();
    await page.locator("[data-ip07-safari]").click();
    await expect.poll(() => getKey(page, "itt07-iphone")).toBeTruthy();
  });
});
