// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear, contentFrame } = require("./helpers");

test.describe("2022 mvp", () => {
  test("2022 is live on the hub", async ({ page }) => {
    const fs = require("fs");
    const path = require("path");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2022", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2022']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2022")).toHaveCount(0);
    await expect(page.locator("body")).toContainText(/28 years open/i);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await enterYear(page, "2022");
    await expect(page.locator(".year-label")).toContainText(/2022/);
    await expect(page.locator("#content")).toBeVisible();
    const frame = contentFrame(page);
    await expect(frame.locator('[data-ott-one-thing="2022"]')).toBeVisible({ timeout: 20000 });
    await expect(frame.locator('[data-ott-one-thing="2022"]')).toHaveAttribute("href", /chatgpt/);
    await expect(frame.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
  });

  test("about prints scale and bans", async ({ page }) => {
    await page.goto("/years/2022/pages/about.html");
    await expect(page.locator("body")).toContainText("1,630,322,579");
    await expect(page.locator("body")).toContainText("ends 2018");
    await expect(page.locator("body")).toContainText("1,167,715,133");
    await expect(page.locator("body")).toContainText("January");
    await expect(page.locator("body")).toContainText("5.3");
    await expect(page.locator("body")).toContainText("Plus");
    await expect(page.locator("body")).toContainText("Twitter");
  });

  test("shell is Chrome habit + Win10, dest name Twitter", async ({ page }) => {
    await page.goto("/years/2022/");
    await expect(page.locator("body")).toContainText(/Chrome habit/i);
    await expect(page.locator(".year-label")).toContainText(/2022/);
    await expect(page.locator("body")).not.toContainText("X Premium");
  });
});
