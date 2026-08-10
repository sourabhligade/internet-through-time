// @ts-check
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

test.describe("2015 shell honesty", () => {
  test("connect overlay is 2015 thesis", async ({ page }) => {
    await page.goto("/years/2015/");
    await expect(page.locator("#connect-overlay")).toContainText(/Watch|Win10|Periscope|863/i);
  });

  test("About bans Stories and Pokémon GO", async ({ page }) => {
    await page.goto("/years/2015/pages/about.html");
    await expect(page.locator("body")).toContainText(/Stories/i);
    await expect(page.locator("body")).toContainText(/Pokémon|Pokemon|Reactions/i);
  });

  test("Win10 is free upgrade not TP-only", async ({ page }) => {
    await page.goto("/years/2015/sites/windows10/index.html");
    await expect(page.locator("body")).toContainText(/July 29|Jul 29|free upgrade/i);
  });

  test("Win7 residual is 2015 voice not Mass PC year 2013", async ({ page }) => {
    await page.goto("/years/2015/sites/windows7/index.html");
    await expect(page.locator("body")).toContainText(/residual 2015|Mass residual 2015/i);
    await expect(page.locator("body")).not.toContainText("Mass PC year 2013");
    await expect(page.locator("body")).toContainText("About 2015");
    await expect(page.locator("h1")).not.toHaveText(/2013/);
  });

  test("connect overlay is not leftover 2014", async ({ page }) => {
    await page.goto("/years/2015/");
    const overlay = page.locator("#connect-overlay");
    await expect(overlay).toBeVisible();
    await expect(overlay).not.toContainText(/2014 Starting Point|WhatsApp deal|Technical Preview only/i);
  });

  test("window location / title stay 2015 after enter", async ({ page }) => {
    await enterYear(page, "2015");
    const title = (await page.locator("#window-title").textContent()) || "";
    expect(title).toMatch(/2015/);
    expect(title).not.toMatch(/2014 Starting Point/);
  });

  test("leftover 2014 rooms are residual archive", async ({ page }) => {
    await page.goto("/years/2015/sites/heartbleed/index.html");
    await expect(page.locator("body")).toContainText(/Residual 2014/i);
    await expect(page.locator("body")).toContainText(/Apple Watch|Watch shipped/i);
    await page.goto("/years/2015/sites/twitch/index.html");
    await expect(page.locator("body")).toContainText(/Residual 2014/i);
    await page.goto("/years/2015/sites/oculus/index.html");
    await expect(page.locator("body")).toContainText(/Residual 2014/i);
    await expect(page.locator("a[href*='cv1']")).toBeVisible();
  });

  test("IE8 room is 2009 archive not 2015 XP shell", async ({ page }) => {
    await page.goto("/years/2015/sites/ie8/index.html");
    await expect(page.locator("body")).toContainText(/archive residual|2015 residual/i);
    await expect(page.locator("body")).not.toContainText("Windows XP + IE 9");
  });

  test("Oculus CV1 page is pre-ship not retail", async ({ page }) => {
    await page.goto("/years/2015/sites/oculus/cv1.html");
    await expect(page.locator("body")).toContainText(/Q1 2016|2016/i);
    await expect(page.locator("body")).toContainText(/pre-ship|not.*retail|not.*mass/i);
  });
});
