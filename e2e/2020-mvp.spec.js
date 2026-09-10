// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test.describe("2020 mvp", () => {
  test("2020 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2020", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2020']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2020")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2020"]').click();
    await expect(page.locator(".year-label")).toContainText(/2020/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints Netcraft and bans invented ILS", async ({ page }) => {
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText("1,295,973,827");
    await expect(page.locator("body")).toContainText("participants");
    await expect(page.locator("body")).toContainText("blank");
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2020"]')).toBeVisible();
  });

  test("leftover 2× strip lists lean dests below guided", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("#ott-2x-2020")).toBeAttached();
    await expect(page.locator("#ott-2x-2020")).toContainText(/#1 \+ #2/);
    expect(await page.locator("#ott-2x-2020 a[href*='sites/']").count()).toBe(31);
    await expect(page.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
  });
});
