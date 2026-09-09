// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe("2019 flows", () => {
  test("2019 is live", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2019", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2019']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2019")).toHaveCount(0);
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2019/pages/home.html");
    await expect(page.locator("#ott-guided-2019 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2019"]')).toBeVisible();
  });

  test("Disney+ trial / empty never writes; Continue writes", async ({ page }) => {
    await page.goto("/years/2019/sites/disneyplus/home.html");
    await page.evaluate(() => localStorage.removeItem("itt19-disneyplus"));
    await page.reload();
    await page.locator("[data-dplus-continue]").click();
    expect(await getKey(page, "itt19-disneyplus")).toBeFalsy();
    await page.locator("[data-dplus-req]").nth(0).check();
    await page.locator("[data-dplus-req]").nth(1).check();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-add]").nth(0).click();
    await page.locator("[data-dplus-add]").nth(1).click();
    await page.locator('[data-dplus-profile="kids"]').click();
    await page.locator('[data-dplus-profile="adult"]').click();
    await page.locator("[data-dplus-continue]").click();
    await expect.poll(() => getKey(page, "itt19-disneyplus")).toBeTruthy();
  });

  test("TikTok empty never writes; honesty + caption writes", async ({ page }) => {
    await page.goto("/years/2019/sites/tiktok/index.html");
    await page.evaluate(() => localStorage.removeItem("itt19-tiktok"));
    await page.reload();
    await page.locator("[data-tt-post]").click();
    expect(await getKey(page, "itt19-tiktok")).toBeFalsy();
    await page.locator("[data-tt-req]").nth(0).check();
    await page.locator("[data-tt-req]").nth(1).check();
    await page.fill("[data-tt-caption]", "museum leftover");
    await page.locator("[data-tt-post]").click();
    await expect.poll(() => getKey(page, "itt19-tiktok")).toBeTruthy();
  });
});
