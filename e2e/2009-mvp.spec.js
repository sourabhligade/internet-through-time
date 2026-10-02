// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { getKey, clickOfficialVerb } = require("./dest-true-io");
const { revealLeftoverRails } = require("./helpers");

test.describe("2009 mvp", () => {
  test("2009 is live on the hub", async ({ page }) => {
    expect(fs.existsSync(path.join(__dirname, "..", "years", "2009", "index.html"))).toBe(true);
    await page.goto("/");
    await expect(page.locator("a.year-card.available[href*='years/2009']")).toBeVisible();
    await expect(page.locator(".year-card.locked.y2009")).toHaveCount(0);
  });

  test("hub card opens Starting Point", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.year-card.available[href*="years/2009"]').click();
    await expect(page.locator(".year-label")).toContainText(/2009/);
    await expect(page.locator("#content")).toBeVisible();
  });

  test("about prints ILS June and bans iPad", async ({ page }) => {
    await page.goto("/years/2009/pages/about.html");
    await expect(page.locator("body")).toContainText("238,027,855");
    await expect(page.locator("body")).toContainText("1,766,206,240");
    await expect(page.locator("body")).toContainText("3GS");
    await expect(page.locator("body")).toContainText("FarmVille");
    await expect(page.locator("body")).toContainText("iPad");
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2009/pages/home.html");
    await expect(page.locator("#ott-guided-2009 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2009"]')).toBeVisible();
    await expect(page.locator('[data-ott-one-thing="2009"]')).toContainText(/Like/);
  });

  test("leftover 2× strip is not first paint", async ({ page }) => {
    await page.goto("/years/2009/pages/home.html");
    await expect(page.locator("#ott-2x-2009")).toHaveCount(0);
    await expect(page.locator("#ott-guided-2009 ol > li")).toHaveCount(6);
  });

  test("Like empty / trap never write · two partners write itt09-like", async ({ page }) => {
    const dest = "/years/2009/sites/facebook/index.html";
    await page.goto(dest);
    await revealLeftoverRails(page);
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await clickOfficialVerb(page, dest);
    expect(await getKey(page, "itt09-like")).toBeFalsy();
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt09-like")).toBeFalsy();
    await page.locator("[data-official-req]").first().check();
    await page.locator("[data-official-req]").nth(1).check();
    await page.fill("[data-official-need]", "Like");
    await clickOfficialVerb(page, dest);
    await expect.poll(() => getKey(page, "itt09-like"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt09-like")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2009");
    expect(blob.official).toBe(true);
  });

  test("leftover complete never writes the star", async ({ page }) => {
    await page.goto("/years/2009/sites/whatsapp/index.html");
    await revealLeftoverRails(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt09-like");
      localStorage.removeItem("itt09-wa");
    });
    const lo = page.locator("[data-lo-panel]").first();
    const reqs = lo.locator("[data-lo-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await lo.locator('[data-lo-pick="keep"]').click();
    await lo.locator("[data-lo-field]").fill("whatsapp leftover");
    await lo.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt09-wa"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt09-like")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt09-wa")) || "{}");
    expect(blob.leftover).toBe(true);
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2009");
  });
});
