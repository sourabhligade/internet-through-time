// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { getKey, clickOfficialVerb } = require("./dest-true-io");
const { revealLeftoverRails } = require("./helpers");

test.describe("2011 mvp", () => {
  test("2011 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2011", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2011']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2011")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2011"]').click();
    await expect(page.locator(".year-label")).toContainText(/2011/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints Google+ and bans later rooms", async ({ page }) => {
    await page.goto("/years/2011/pages/about.html");
    await expect(page.locator("body")).toContainText("Google+");
    await expect(page.locator("body")).toContainText("Spotify");
    await expect(page.locator("body")).toContainText("Siri");
    await expect(page.locator("body")).toContainText("Instagram Android");
    await expect(page.locator("body")).toContainText("Vine");
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2011/pages/home.html");
    await expect(page.locator("#ott-guided-2011 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2011"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2011"]')).toContainText(/Google\+/);
  });

  test("leftover 2× strip is not first paint", async ({ page }) => {
    await page.goto("/years/2011/pages/home.html");
    await expect(page.locator("#ott-2x-2011")).toHaveCount(0);
    await expect(page.locator("#ott-guided-2011 ol > li")).toHaveCount(6);
  });

  test("Google+ empty / trap never write · Circle writes itt11-gplus", async ({ page }) => {
    const dest = "/years/2011/sites/googleplus/index.html";
    await page.goto(dest);
    await revealLeftoverRails(page);
    await page.evaluate(() => localStorage.removeItem("itt11-gplus"));
    await clickOfficialVerb(page, dest);
    expect(await getKey(page, "itt11-gplus")).toBeFalsy();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt11-gplus")).toBeFalsy();
    await page.locator("[data-official-req]").first().check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "Friends");
    await clickOfficialVerb(page, dest);
    await expect.poll(() => getKey(page, "itt11-gplus"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt11-gplus")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2011");
    expect(blob.kind).toBe("official");
  });

  test("leftover complete never writes the star", async ({ page }) => {
    await page.goto("/years/2011/sites/chromebook/index.html");
    await revealLeftoverRails(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt11-gplus");
      localStorage.removeItem("itt11-chromebook-lx");
    });
    const lo = page.locator("[data-lo-panel]").first();
    const reqs = lo.locator("[data-lo-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await lo.locator('[data-lo-pick="keep"]').click();
    await lo.locator("[data-lo-field]").fill("chromebook leftover");
    await lo.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt11-chromebook-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt11-gplus")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt11-chromebook-lx")) || "{}");
    expect(blob.leftover).toBe(true);
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2011");
  });
});
