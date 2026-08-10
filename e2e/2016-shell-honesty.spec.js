// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2016 shell honesty", () => {
  test("connect overlay is 2016 thesis", async ({ page }) => {
    await page.goto("/years/2016/");
    await expect(page.locator("#connect-overlay")).toContainText(/Stories|Pokémon|Pokemon|1\.05B|Reactions/i);
  });

  test("About bans TikTok Face ID Reels", async ({ page }) => {
    await page.goto("/years/2016/pages/about.html");
    await expect(page.locator("body")).toContainText(/TikTok/i);
    await expect(page.locator("body")).toContainText(/Face ID/i);
    await expect(page.locator("body")).toContainText(/Reels/i);
  });

  test("Win10 free upgrade ended", async ({ page }) => {
    await page.goto("/years/2016/sites/windows10/index.html");
    await expect(page.locator("body")).toContainText(/ended|Jul(?:y)?\s*29/i);
  });

  test("connect overlay is not leftover 2015", async ({ page }) => {
    await page.goto("/years/2016/");
    const overlay = page.locator("#connect-overlay");
    await expect(overlay).toBeVisible();
    await expect(overlay).not.toContainText(/Watch Apr 24|863M|Periscope · Apple Music/i);
  });

  test("window location / title stay 2016 after enter", async ({ page }) => {
    await enterYear(page, "2016");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2016/);
    expect(title).not.toMatch(/2015 Starting Point/);
  });

  test("Vine is announce not already gone", async ({ page }) => {
    await page.goto("/years/2016/sites/vine/goodbye.html");
    await expect(page.locator("body")).toContainText(/Oct(?:ober)?\s*27/i);
    await expect(page.locator("body")).toContainText(/Jan(?:uary)?\s*17|2017/i);
    await expect(page.locator("body")).toContainText(/nothing happens today|not already/i);
  });

  test("Watch room is residual 2015", async ({ page }) => {
    await page.goto("/years/2016/sites/apple/watch.html");
    await expect(page.locator("body")).toContainText(/Residual 2015/i);
  });

  test("Dyn is literacy with no attack how-to", async ({ page }) => {
    await page.goto("/years/2016/sites/dyn/index.html");
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Oct(?:ober)?\s*21/i);
    expect(text).toMatch(/Mirai/i);
    expect(text).not.toMatch(/how to (launch|run) .*ddos/i);
    expect(text).toMatch(/no attack code/i);
  });

  test("iPhone 7 is not Face ID", async ({ page }) => {
    await page.goto("/years/2016/sites/iphone/7.html");
    await expect(page.locator("body")).toContainText(/not Face ID/i);
  });

  test("musical.ly says not TikTok", async ({ page }) => {
    await page.goto("/years/2016/sites/musically/index.html");
    await expect(page.locator("body")).toContainText(/not TikTok/i);
  });
});
