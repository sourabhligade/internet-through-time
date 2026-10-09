// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { getKey, clickOfficialVerb } = require("./dest-true-io");
const { revealLeftoverRails } = require("./helpers");

test.describe("2008 mvp", () => {
  test("2008 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2008", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2008']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2008")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2008"]').click();
    await expect(page.locator(".year-label")).toContainText(/2008/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints ILS June and bans 3GS", async ({ page }) => {
    await page.goto("/years/2008/pages/about.html");
    await expect(page.locator("body")).toContainText("172,338,726");
    await expect(page.locator("body")).toContainText("1,571,601,630");
    await expect(page.locator("body")).toContainText("186,727,854");
    await expect(page.locator("body")).toContainText("iPhone 3GS");
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2008/pages/home.html");
    await expect(page.locator("#ott-guided-2008 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2008"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2008"]')).toContainText(/App Store/);
  });

  test("leftover 2× strip is not first paint", async ({ page }) => {
    await page.goto("/years/2008/pages/home.html");
    await expect(page.locator("#ott-2x-2008")).toHaveCount(0);
    await expect(page.locator("#ott-guided-2008 ol > li")).toHaveCount(6);
  });

  test("App Store empty / trap never write · FREE writes itt08-apps", async ({ page }) => {
    const dest = "/years/2008/sites/appstore/index.html";
    await page.goto(dest);
    await revealLeftoverRails(page);
    await page.evaluate(() => localStorage.removeItem("itt08-apps"));
    await clickOfficialVerb(page, dest);
    expect(await getKey(page, "itt08-apps")).toBeFalsy();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt08-apps")).toBeFalsy();
    await page.locator("[data-official-req]").first().check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "Koi Pond");
    await clickOfficialVerb(page, dest);
    await expect.poll(() => getKey(page, "itt08-apps"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt08-apps")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2008");
    expect(blob.official).toBe(true);
  });

  test("leftover complete never writes the star", async ({ page }) => {
    await page.goto("/years/2008/sites/cuil/index.html");
    await revealLeftoverRails(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt08-apps");
      localStorage.removeItem("itt08-cuil-dp");
    });
    const lo = page.locator("[data-lo-panel]").first();
    const reqs = lo.locator("[data-lo-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await lo.locator('[data-lo-pick="keep"]').click();
    await lo.locator("[data-lo-field]").fill("cuil leftover");
    await lo.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt08-cuil-dp"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt08-apps")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt08-cuil-dp")) || "{}");
    expect(blob.leftover).toBe(true);
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2008");
  });

  test("Pack A leftover Next is a 2008 dest", async ({ page }) => {
    await page.goto("/years/2008/sites/cuil/index.html");
    const href = await page.locator("[data-next-flow] a").getAttribute("href");
    expect(href).toBe("../bitcoin/index.html");
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2008", "sites", "bitcoin", "index.html"))).toBe(true);
  });
});
