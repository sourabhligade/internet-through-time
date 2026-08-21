// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2007 flows", () => {
  test("iPhone App Store trap + empty never write; Safari writes itt07-iphone", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-iphone"));
    await page.reload();
    await page.locator("[data-ip07-appstore]").click();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    await page.locator("[data-ip07-safari]").click();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
    await page.locator("[data-ip07-req]").nth(0).check();
    await page.locator("[data-ip07-req]").nth(1).check();
    await page.locator('[data-ip07-cap="8"]').click();
    await page.locator("[data-ip07-safari]").click();
    await expect.poll(() => getKey(page, "itt07-iphone")).toMatch(/safari|499|599|real/i);
  });

  test("Gmail invite never writes; open signup writes itt07-gmail", async ({ page }) => {
    await page.goto("/years/2007/sites/gmail/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-gmail"));
    await page.reload();
    await page.locator("[data-gm07-invite]").click();
    expect(await getKey(page, "itt07-gmail")).toBeFalsy();
    await page.locator("[data-gm07-req]").nth(0).check();
    await page.locator("[data-gm07-req]").nth(1).check();
    await page.fill("[data-gm07-handle]", "museum");
    await page.locator("[data-gm07-open]").click();
    await expect.poll(() => getKey(page, "itt07-gmail")).toBeTruthy();
  });

  test("Street View 0–1 city never writes", async ({ page }) => {
    await page.goto("/years/2007/sites/maps/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-streetview"));
    await page.reload();
    await page.locator("[data-sv07-req]").nth(0).check();
    await page.locator("[data-sv07-req]").nth(1).check();
    await page.locator('[data-sv07-city="sf"]').click();
    await page.locator("[data-sv07-go]").click();
    expect(await getKey(page, "itt07-streetview")).toBeFalsy();
    await page.locator('[data-sv07-city="nyc"]').click();
    await page.locator("[data-sv07-go]").click();
    await expect.poll(() => getKey(page, "itt07-streetview")).toBeTruthy();
  });
});
