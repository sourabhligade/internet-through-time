// @ts-check
/**
 * Phase 3 lock for 2006–2009. Empty Twttr, empty iPhone URL, empty App Store
 * field, empty Like, and Plot Start leave the stars empty. The 794-page walk
 * is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKeys(page, keys) {
  await page.evaluate((list) => {
    list.forEach((k) => localStorage.removeItem(k));
  }, keys);
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

test.describe("2006-2009 phase 3 empty holds", () => {
  test("Twttr empty, trap, and one character leave the star empty", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt06-tweets"]);
    await page.locator("[data-tw06-post]").click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
    await page.locator("[data-official-trap]").first().click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
    await page.fill("[data-official-need]", "x");
    await page.locator("[data-tw06-post]").click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
  });

  test("iPhone empty URL and trap leave the star empty", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt07-iphone"]);
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt07-iphone")).toBeNull();
    await page.locator("[data-official-trap]").first().click();
    expect(await raw(page, "itt07-iphone")).toBeNull();
  });

  test("App Store empty FREE leaves the star empty", async ({ page }) => {
    await page.goto("/years/2008/sites/appstore/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt08-apps"]);
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt08-apps")).toBeNull();
  });

  test("Like empty and Beacon trap leave the star empty", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await verbReady(page);
    await clearKeys(page, ["itt09-like"]);
    await page.locator("[data-lk09-like]").click();
    expect(await raw(page, "itt09-like")).toBeNull();
    await page.locator("[data-lk09-beacon], [data-official-trap]").first().click();
    expect(await raw(page, "itt09-like")).toBeNull();
  });

  test("Plot Start leaves the game key empty", async ({ page }) => {
    await page.goto("/years/2009/sites/playable/game.html");
    await page.waitForSelector("[data-game-start]");
    await clearKeys(page, ["itt09-game-plot"]);
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(250);
    expect(await raw(page, "itt09-game-plot")).toBeNull();
  });
});
