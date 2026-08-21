// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

test.describe("2007 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2007/pages/about.html");
    await expect(page.locator("body")).toContainText("121,892,559");
    await expect(page.locator("body")).toContainText("155 million");
    await expect(page.locator("body")).toContainText("App Store");
    await expect(page.locator("body")).toContainText("Chrome");
  });

  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2007/pages/home.html");
    await expect(page.locator("#ott-guided-2007 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2007"]')).toBeVisible();
  });

  test("Kindle worldwide trap never writes; order writes itt07-kindle", async ({ page }) => {
    await page.goto("/years/2007/sites/kindle/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-kindle"));
    await page.reload();
    await page.locator("[data-kd07-world]").click();
    expect(await getKey(page, "itt07-kindle")).toBeFalsy();
    await page.locator("[data-kd07-req]").nth(0).check();
    await page.locator("[data-kd07-req]").nth(1).check();
    await page.locator("[data-kd07-order]").click();
    await expect.poll(() => getKey(page, "itt07-kindle")).toBeTruthy();
  });

  test("Tumblr empty never writes", async ({ page }) => {
    await page.goto("/years/2007/sites/tumblr/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-tumblr"));
    await page.reload();
    await page.locator("[data-tb07-req]").nth(0).check();
    await page.locator("[data-tb07-req]").nth(1).check();
    await page.locator("[data-tb07-post]").click();
    expect(await getKey(page, "itt07-tumblr")).toBeFalsy();
    await page.fill("[data-tb07-title]", "a small post");
    await page.locator("[data-tb07-post]").click();
    await expect.poll(() => getKey(page, "itt07-tumblr")).toBeTruthy();
  });

  test("Yahoo 3× empty never writes then leftover save", async ({ page }) => {
    await page.goto("/years/2007/sites/yahoo/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-pop-yahoo"));
    await page.reload();
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt07-pop-yahoo")).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    await page.locator("[data-pop-req]").check();
    await page.fill("[data-pop-field]", "check mail");
    await page.locator("[data-pop-go]").click();
    await expect.poll(() => getKey(page, "itt07-pop-yahoo")).toBeTruthy();
  });

  test("Safari extra trap never writes; type safari writes", async ({ page }) => {
    await page.goto("/years/2007/sites/playable/extra-a.html");
    await page.evaluate(() => localStorage.removeItem("itt07-game-safari"));
    await page.reload();
    await page.locator("[data-xa07-trap]").click();
    expect(await getKey(page, "itt07-game-safari")).toBeFalsy();
    await page.fill("[data-xa07-type]", "safari");
    await page.locator("[data-xa07-go]").click();
    await expect.poll(() => getKey(page, "itt07-game-safari")).toBeTruthy();
  });

  test("Beacon extra trap never writes; type beacon writes", async ({ page }) => {
    await page.goto("/years/2007/sites/playable/extra-b.html");
    await page.evaluate(() => localStorage.removeItem("itt07-game-beacon"));
    await page.reload();
    await page.locator("[data-xb07-trap]").click();
    expect(await getKey(page, "itt07-game-beacon")).toBeFalsy();
    await page.fill("[data-xb07-type]", "beacon");
    await page.locator("[data-xb07-go]").click();
    await expect.poll(() => getKey(page, "itt07-game-beacon")).toBeTruthy();
  });

  test("Peg Walk Tokyo trap never scores; start writes", async ({ page }) => {
    await page.goto("/years/2007/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt07-game-peg"));
    await page.reload();
    await page.locator("[data-peg-trap]").click();
    expect(await getKey(page, "itt07-game-peg")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await expect.poll(() => getKey(page, "itt07-game-peg")).toBeTruthy();
  });

  test("map lists leftover writers", async ({ page }) => {
    await page.goto("/years/2007/pages/map.html");
    await expect(page.locator('a[href*="kindle"]').first()).toBeVisible();
    await expect(page.locator('a[href*="tumblr"]').first()).toBeVisible();
    await expect(page.locator('a[href*="yahoo"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wikipedia"]').first()).toBeVisible();
    await expect(page.locator('a[href*="amazon"]').first()).toBeVisible();
  });
});
