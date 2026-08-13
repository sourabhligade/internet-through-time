// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2020 shell honesty", () => {
  test("connect overlay is 2020 thesis", async ({ page }) => {
    await page.goto("/years/2020/");
    await expect(page.locator("#connect-overlay")).toContainText(/muted|participants|Flash/i);
  });

  test("about hostname honesty", async ({ page }) => {
    await page.goto("/years/2020/pages/about.html");
    await expect(page.locator("body")).toContainText(/table|not published|ends 2018/i);
    await expect(page.locator("body")).toContainText(/participants/);
    await expect(page.locator("body")).toContainText(/not unique people|participants, not unique/i);
  });

  test("dirbar has no Vine / 56k / GDPR / Disney+", async ({ page }) => {
    await page.goto("/years/2020/");
    const bar = ((await page.locator("#dirbar").textContent()) || "").toLowerCase();
    expect(bar).not.toMatch(/vine/);
    expect(bar).not.toMatch(/56k/);
    expect(bar).not.toMatch(/ie7/);
    expect(bar).not.toMatch(/gdpr/);
    expect(bar).not.toMatch(/disney/);
    expect(bar).toMatch(/zoom/);
  });

  test("window title stays 2020 after enter", async ({ page }) => {
    await enterYear(page, "2020");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2020/);
  });

  test("no Meta branding on home", async ({ page }) => {
    await page.goto("/years/2020/pages/home.html");
    await expect(page.locator("body")).toContainText(/Hard bans/);
    await expect(page.locator("body")).toContainText(/Meta/);
  });
});
