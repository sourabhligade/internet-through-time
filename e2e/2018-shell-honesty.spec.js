// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2018 shell honesty", () => {
  test("connect overlay is 2018 thesis", async ({ page }) => {
    await page.goto("/years/2018/");
    await expect(page.locator("#connect-overlay")).toContainText(/GDPR|TikTok|1\.63/i);
  });

  test("about hostname honesty", async ({ page }) => {
    await page.goto("/years/2018/pages/about.html");
    await expect(page.locator("body")).toContainText(/hostnames/i);
    await expect(page.locator("body")).toContainText(/51\.2%/);
  });

  test("dirbar has no Vine / 56k", async ({ page }) => {
    await page.goto("/years/2018/");
    const bar = ((await page.locator("#dirbar").textContent()) || "").toLowerCase();
    expect(bar).not.toMatch(/vine/);
    expect(bar).not.toMatch(/56k/);
    expect(bar).not.toMatch(/ie7/);
  });

  test("window location / title stay 2018 after enter", async ({ page }) => {
    await enterYear(page, "2018");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2018/);
  });

  test("Edge announce is not the default", async ({ page }) => {
    await page.goto("/years/2018/sites/edge/chromium.html");
    await expect(page.locator("body")).toContainText(/EdgeHTML/i);
    await expect(page.locator("body")).toContainText(/not the 2018 default/i);
  });

  test("IGTV is not Reels", async ({ page }) => {
    await page.goto("/years/2018/sites/instagram/igtv.html");
    await expect(page.locator("body")).toContainText(/not Reels/i);
  });

  test("about bans Meta Reels Marshmello Face ID new", async ({ page }) => {
    await page.goto("/years/2018/pages/about.html");
    await expect(page.locator("body")).toContainText(/Meta/);
    await expect(page.locator("body")).toContainText(/Reels/);
    await expect(page.locator("body")).toContainText(/Marshmello/);
    await expect(page.locator("body")).toContainText(/Face ID is last year|Face ID as new/i);
  });

  test("Spectre has no exploit how-to", async ({ page }) => {
    await page.goto("/years/2018/sites/spectre/index.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/January 3|3 January/i);
    expect(text).toMatch(/no attack code|no exploit/i);
    expect(text).not.toMatch(/how to (launch|run|spread)/i);
  });

  test("FOSTA room has no reconstructed ads", async ({ page }) => {
    await page.goto("/years/2018/sites/craigslist/personals.html");
    await expect(page.locator("body")).toContainText(/does not reconstruct/i);
    await expect(page.locator("[data-listing], .personals-ad")).toHaveCount(0);
  });

  test("dirbar has GDPR and TikTok", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("#dirbar .dir-btn", { hasText: "GDPR" }).first()).toBeVisible();
    await expect(page.locator("#dirbar .dir-btn", { hasText: "TikTok" }).first()).toBeVisible();
  });
});
