// @ts-check
/**
 * 2017 year game — Storm Circle.
 * Score key itt17-game-stormcircle · literacy itt17-stormcircle-lit
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

test.describe("2017 Storm Circle honesty + load", () => {
  test("game.html is Storm Circle not Gym Rush / Face ID", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/game.html");
    await expect(page.locator("[data-year-game][data-game-id='stormcircle']")).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Storm Circle/i);
    expect(text).toMatch(/Sep(?:tember)?\s*26/i);
    expect(text).toMatch(/no official/i);
    expect(text).toMatch(/Face ID/i);
    expect(text).not.toMatch(/Gym Rush as the year game|Blob Rush/i);
  });

  test("lobby points at Storm Circle", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/index.html");
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Storm Circle/i);
    await expect(page.locator("a[href*='iphone/x']").first()).toBeVisible();
  });

  test("Fortnite literacy links Storm Circle", async ({ page }) => {
    await page.goto("/years/2017/sites/fortnite/index.html");
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
    await page.locator("a[href*='game.html']").first().click();
    await expect(page.locator("[data-game-id='stormcircle']")).toBeVisible();
  });
});

test.describe("2017 Storm Circle REAL score", () => {
  test("bare load never writes itt17-game-stormcircle", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt17-game-stormcircle"));
    await page.reload();
    await expect(page.locator("[data-game-start]")).toBeVisible();
    expect(await getKey(page, "itt17-game-stormcircle")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(200);
    expect(await getKey(page, "itt17-game-stormcircle")).toBeFalsy();
  });

  test("score 0 end does not write; score>0 writes REAL JSON", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/game.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt17-game-stormcircle"));
    await page.reload();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(0);
    });
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt17-game-stormcircle")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt17-game-stormcircle"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt17-game-stormcircle")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2017");
    expect(blob.gameId).toBe("stormcircle");
    expect(blob.best).toBeGreaterThanOrEqual(40);
    expect(blob.last).toBeGreaterThanOrEqual(40);
  });

  test("literacy incomplete never writes; two checks write itt17-stormcircle-lit", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt17-stormcircle-lit"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt17-stormcircle-lit")).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(80);
    expect(await getKey(page, "itt17-stormcircle-lit")).toBeFalsy();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt17-stormcircle-lit")).toBeTruthy();
  });

  test("score write does not touch itt16-game-gymrush", async ({ page }) => {
    await page.goto("/years/2017/sites/playable/game.html?fast=1");
    await page.evaluate(() => {
      localStorage.setItem("itt16-game-gymrush", '{"keep":1}');
      localStorage.removeItem("itt17-game-stormcircle");
    });
    await page.reload();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt17-game-stormcircle")).toBeTruthy();
    expect(await getKey(page, "itt16-game-gymrush")).toBe('{"keep":1}');
  });
});

test.describe("2017 Storm Circle iframe shell", () => {
  test("iframe start + end API writes itt17-game-stormcircle", async ({ page }) => {
    await enterYear(page, "2017");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt17-game-stormcircle");
        localStorage.setItem("itt16-game-gymrush", '{"keep":1}');
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, "sites/playable/game.html?fast=1");
    const frame = contentFrame(page);
    await expect(frame.locator("[data-game-id='stormcircle']")).toBeVisible({ timeout: 15000 });
    await frame.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const w = document.getElementById("content") && document.getElementById("content").contentWindow;
      const host = w && w.document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt17-game-stormcircle"), { timeout: 10000 }).toBeTruthy();
    expect(await getKey(page, "itt16-game-gymrush")).toBe('{"keep":1}');
    await expect(frame.locator("body")).toContainText(/Sep(?:tember)?\s*26|no official|Storm Circle/i);
  });
});
