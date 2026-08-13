// @ts-check
/**
 * 2019 year game — Continue Row.
 * Score key itt19-game-continuerow · literacy itt19-continuerow-lit
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

test.describe("2019 Continue Row honesty + load", () => {
  test("game.html is Continue Row not Consent Dash", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/game.html");
    await expect(page.locator("[data-year-game][data-game-id='continuerow']")).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Continue Row/i);
    expect(text).toMatch(/Who.s watching|Disney\+/i);
    expect(text).not.toMatch(/Consent Dash as the year game/i);
  });

  test("lobby points at Continue Row", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/index.html");
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Continue Row/i);
    await expect(page.locator("a[href*='disneyplus']").first()).toBeVisible();
  });
});

test.describe("2019 Continue Row REAL score", () => {
  test("bare load never writes itt19-game-continuerow", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt19-game-continuerow"));
    await page.reload();
    await expect(page.locator("[data-game-start]")).toBeVisible();
    expect(await getKey(page, "itt19-game-continuerow")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    expect(await getKey(page, "itt19-game-continuerow")).toBeFalsy();
  });

  test("forced end with score writes best", async ({ page }) => {
    await page.goto("/years/2019/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt19-game-continuerow"));
    await page.reload();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && host.__ittContinueRowEnd) host.__ittContinueRowEnd(30);
    });
    await expect.poll(async () => getKey(page, "itt19-game-continuerow")).toBeTruthy();
  });
});
