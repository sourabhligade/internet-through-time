// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2019 shell honesty", () => {
  test("connect overlay is 2019 thesis", async ({ page }) => {
    await page.goto("/years/2019/");
    await expect(page.locator("#connect-overlay")).toContainText(/Disney\+|Marshmello|4\.1/i);
  });

  test("about hostname honesty", async ({ page }) => {
    await page.goto("/years/2019/pages/about.html");
    await expect(page.locator("body")).toContainText(/table|not published|ends 2018/i);
    await expect(page.locator("body")).toContainText(/53%/);
  });

  test("dirbar has no Vine / 56k / GDPR first", async ({ page }) => {
    await page.goto("/years/2019/");
    const bar = ((await page.locator("#dirbar").textContent()) || "").toLowerCase();
    expect(bar).not.toMatch(/vine/);
    expect(bar).not.toMatch(/56k/);
    expect(bar).not.toMatch(/ie7/);
    expect(bar).not.toMatch(/gdpr/);
    expect(bar).toMatch(/disney/);
  });

  test("window title stays 2019 after enter", async ({ page }) => {
    await enterYear(page, "2019");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2019/);
  });

  test("Edge preview names January 15, 2020", async ({ page }) => {
    await page.goto("/years/2019/sites/edge/preview.html");
    await expect(page.locator("body")).toContainText(/January 15, 2020/);
    await expect(page.locator("body")).toContainText(/preview/i);
  });

  test("IGTV residual is not Reels", async ({ page }) => {
    await page.goto("/years/2019/sites/instagram/igtv.html");
    await expect(page.locator("body")).toContainText(/Reels/i);
  });

  test("about bans COVID Reels Zoom Edge-as-default", async ({ page }) => {
    await page.goto("/years/2019/pages/about.html");
    await expect(page.locator("body")).toContainText(/COVID/);
    await expect(page.locator("body")).toContainText(/Reels/);
    await expect(page.locator("body")).toContainText(/Zoom/);
  });
});
