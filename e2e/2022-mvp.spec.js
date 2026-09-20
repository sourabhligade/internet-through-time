// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test.describe("2022 mvp", () => {
  test("2022 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2022", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2022']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2022")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2022"]').click();
    await expect(page.locator(".year-label")).toContainText(/2022/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints ITU and bans invented ILS", async ({ page }) => {
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText("5.3");
    await expect(page.locator("body")).toContainText("66%");
    await expect(page.locator("body")).toContainText("blank");
    await expect(page.locator("body")).toContainText("1,630,322,579");
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2022"]')).toBeVisible();
  });

  test("leftover 2× strip is not first paint", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator("#ott-2x-2022")).toHaveCount(0);
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2022"]')).toBeVisible();
  });
});
