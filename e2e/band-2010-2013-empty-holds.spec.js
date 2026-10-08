// @ts-check
/**
 * Phase 3 lock for 2010–2013. Empty clicks on the four stars and Guess Doodle
 * Start write nothing. The 182-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function verbReady(page) {
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

test.describe("2010-2013 phase 3 empty holds", () => {
  test("Instagram empty click leaves the star empty", async ({ page }) => {
    await page.goto("/years/2010/sites/instagram/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt10-ig-posts"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt10-ig-posts")).toBeNull();
  });

  test("Google+ empty click leaves the star empty", async ({ page }) => {
    await page.goto("/years/2011/sites/googleplus/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt11-gplus"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt11-gplus")).toBeNull();
  });

  test("Instagram Android empty click leaves the star empty", async ({ page }) => {
    await page.goto("/years/2012/sites/instagram/android.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt12-ig-android"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt12-ig-android")).toBeNull();
  });

  test("Vine empty click leaves the star empty", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt13-vine-posts"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt13-vine-posts")).toBeNull();
  });

  test("Guess Doodle Start writes nothing", async ({ page }) => {
    await page.goto("/years/2012/sites/playable/game.html");
    await page.waitForSelector("[data-game-start]");
    await page.evaluate(() => localStorage.removeItem("itt12-game-guessdoodle"));
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(250);
    expect(await raw(page, "itt12-game-guessdoodle")).toBeNull();
  });
});
