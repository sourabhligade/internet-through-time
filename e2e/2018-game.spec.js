// @ts-check
/**
 * 2018 year game — Consent Dash.
 * Score key itt18-game-consentdash · literacy itt18-consentdash-lit
 */
const { test, expect } = require("@playwright/test");
const { enterYear } = require("./helpers");

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

test.describe("2018 Consent Dash honesty + load", () => {
  test("game.html is Consent Dash not Storm Circle / Face ID gold", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/game.html");
    await expect(page.locator("[data-year-game][data-game-id='consentdash']")).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Consent Dash/i);
    expect(text).toMatch(/25 May|GDPR/i);
    expect(text).toMatch(/Manage/i);
    expect(text).not.toMatch(/Storm Circle as the year game|Gym Rush/i);
  });

  test("lobby points at Consent Dash", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/index.html");
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Consent Dash/i);
    await expect(page.locator("a[href*='gdpr']").first()).toBeVisible();
  });
});

test.describe("2018 Consent Dash REAL score", () => {
  test("bare load never writes itt18-game-consentdash", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt18-game-consentdash"));
    await page.reload();
    await expect(page.locator("[data-game-start]")).toBeVisible();
    expect(await getKey(page, "itt18-game-consentdash")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(200);
    expect(await getKey(page, "itt18-game-consentdash")).toBeFalsy();
  });

  test("score 0 end does not write; score>0 writes REAL JSON", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/game.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt18-game-consentdash"));
    await page.reload();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(0);
    });
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt18-game-consentdash")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt18-game-consentdash"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt18-game-consentdash")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2018");
    expect(blob.gameId).toBe("consentdash");
    expect(blob.best).toBeGreaterThanOrEqual(40);
  });

  test("literacy incomplete never writes; two checks write itt18-consentdash-lit", async ({ page }) => {
    await page.goto("/years/2018/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt18-consentdash-lit"));
    await page.reload();
    await page.locator('[data-storage-key="consentdash-lit"]').click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt18-consentdash-lit")).toBeFalsy();
    const boxes = page.locator("[data-itt-real-panel] [data-req]");
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await page.locator('[data-storage-key="consentdash-lit"]').click();
    await expect.poll(async () => getKey(page, "itt18-consentdash-lit")).toBeTruthy();
  });
});

test.describe("2018 Consent Dash iframe shell", () => {
  test("iframe loads game", async ({ page }) => {
    await enterYear(page, "2018");
    await expect(page.locator("#content")).toBeVisible();
  });
});
