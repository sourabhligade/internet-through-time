// @ts-check
/**
 * 2016 year game — Gym Rush + playable toys + slither honesty.
 * Score key itt16-game-gymrush · literacy itt16-gymrush-lit · toys itt16-playable*
 */
const { test, expect } = require("@playwright/test");
const { enterYear, goInFrame, contentFrame } = require("./helpers");

async function getKey(page, k) {
  return page.evaluate((key) => localStorage.getItem(key), k);
}

test.describe("2016 Gym Rush honesty + load", () => {
  test("game.html is Gym Rush not slither / Blob Rush / Stories", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html");
    await expect(page.locator("[data-year-game][data-game-id='gymrush']")).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
    const text = await page.locator("body").innerText();
    expect(text).toMatch(/Gym Rush/i);
    expect(text).toMatch(/Jul(?:y)?\s*6/i);
    expect(text).toMatch(/no official|no official sprites|silhouette/i);
    expect(text).toMatch(/no real GPS|not use real GPS/i);
    expect(text).toMatch(/slither\.io/i);
    expect(text).toMatch(/not this game/i);
    expect(text).toMatch(/500 million/i);
    expect(text).toMatch(/Instagram Stories/i);
    expect(text).not.toMatch(/Blob Rush|agar\.io as the year game/i);
  });

  test("lobby points at Gym Rush and three 2016 toys", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/index.html");
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(/Gym Rush/i);
    await expect(page.locator("a[href*='g=1']").first()).toBeVisible();
    await expect(page.locator("a[href*='g=2']").first()).toBeVisible();
    await expect(page.locator("a[href*='g=3']").first()).toBeVisible();
    await expect(page.locator("a[href*='#slither'], a[href*='slither']").first()).toBeVisible();
  });

  test("PoGO literacy links Gym Rush", async ({ page }) => {
    await page.goto("/years/2016/sites/pokemongo/index.html");
    await expect(page.locator("a[href*='game.html']").first()).toBeVisible();
    await page.locator("a[href*='game.html']").first().click();
    await expect(page.locator("[data-game-id='gymrush']")).toBeVisible();
  });
});

test.describe("2016 Gym Rush REAL score", () => {
  test("bare load never writes itt16-game-gymrush", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt16-game-gymrush"));
    await page.reload();
    await expect(page.locator("[data-game-start]")).toBeVisible();
    expect(await getKey(page, "itt16-game-gymrush")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(200);
    expect(await getKey(page, "itt16-game-gymrush")).toBeFalsy();
  });

  test("score 0 end does not write; score>0 writes REAL JSON", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html?fast=1");
    await page.evaluate(() => localStorage.removeItem("itt16-game-gymrush"));
    await page.reload();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(0);
    });
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt16-game-gymrush")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt16-game-gymrush"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt16-game-gymrush")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2016");
    expect(blob.gameId).toBe("gymrush");
    expect(blob.best).toBeGreaterThanOrEqual(40);
    expect(blob.last).toBeGreaterThanOrEqual(40);
  });

  test("literacy incomplete never writes; two checks write itt16-gymrush-lit", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt16-gymrush-lit"));
    await page.reload();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await getKey(page, "itt16-gymrush-lit")).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(80);
    expect(await getKey(page, "itt16-gymrush-lit")).toBeFalsy();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt16-gymrush-lit")).toBeTruthy();
  });

  test("score write does not touch itt15-game-blobrush", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html?fast=1");
    await page.evaluate(() => {
      localStorage.setItem("itt15-game-blobrush", '{"keep":1}');
      localStorage.removeItem("itt16-game-gymrush");
    });
    await page.reload();
    await page.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt16-game-gymrush")).toBeTruthy();
    expect(await getKey(page, "itt15-game-blobrush")).toBe('{"keep":1}');
  });
});

test.describe("2016 Gym Rush play + pause", () => {
  test("tap canvas visits a stop (score or status changes)", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html?fast=1");
    await page.locator("[data-game-start]").click();
    const before = (await page.locator("[data-game-score]").textContent()) || "0";
    await page.evaluate(() => {
      const host = document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushVisit === "function") host.__ittGymRushVisit(2);
    });
    const after = (await page.locator("[data-game-score]").textContent()) || "0";
    expect(Number(after)).toBeGreaterThanOrEqual(Number(before));
    await expect(page.locator("[data-itt-action-status]")).toContainText(/Stop|gym|Walk/i);
  });

  test("Pause chrome honors YearGame.isPaused", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/game.html?fast=1");
    await page.locator("[data-game-start]").click();
    const pause = page.locator("[data-yg-pause]");
    if (await pause.count()) {
      await pause.click();
      await expect(page.locator("[data-year-game]")).toHaveAttribute("data-yg-paused", "1");
      const paused = await page.evaluate(() => !!(window.ITT && ITT.YearGame && ITT.YearGame.isPaused && ITT.YearGame.isPaused()));
      expect(paused).toBe(true);
    }
  });
});

test.describe("2016 slither strip + toys", () => {
  test("slither loop is literacy not the year game", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/index.html");
    await page.evaluate(() => {
      localStorage.removeItem("itt16-slither-ack");
      localStorage.removeItem("itt13-game-loopsix");
    });
    await page.reload();
    await expect(page.locator("body")).toContainText(/slither\.io/i);
    await expect(page.locator("body")).toContainText(/Gym Rush/i);
    await expect(page.locator("body")).toContainText(/not the year game/i);
    await page.locator("[data-itt-real-save]").click();
    expect(await getKey(page, "itt16-slither-ack")).toBeFalsy();
    await page.locator("[data-req]").nth(0).check();
    await page.locator("[data-req]").nth(1).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => getKey(page, "itt16-slither-ack")).toBeTruthy();
    expect(await getKey(page, "itt13-game-loopsix")).toBeFalsy();
  });

  test("toy 3 go outside writes itt16-playable-3", async ({ page }) => {
    await page.goto("/years/2016/sites/playable/index.html?g=3");
    await page.evaluate(() => localStorage.removeItem("itt16-playable-3"));
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-itt-feat-yearplayable") === "1",
      null,
      { timeout: 15000 }
    );
    await expect(page.locator("[data-year-playable]")).toBeVisible();
    await page.locator("[data-yp-start]").click();
    await page.locator("[data-yp-input]").fill("go outside");
    await page.locator("[data-yp-submit]").click();
    await expect.poll(async () => getKey(page, "itt16-playable-3"), { timeout: 8000 }).toBeTruthy();
  });
});

test.describe("2016 Gym Rush iframe shell", () => {
  test("iframe start + end API writes itt16-game-gymrush", async ({ page }) => {
    await enterYear(page, "2016");
    await page.evaluate(() => {
      try {
        localStorage.removeItem("itt16-game-gymrush");
        localStorage.setItem("itt15-game-blobrush", '{"keep":1}');
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, "sites/playable/game.html?fast=1");
    const frame = contentFrame(page);
    await expect(frame.locator("[data-game-id='gymrush']")).toBeVisible({ timeout: 15000 });
    await frame.locator("[data-game-start]").click();
    await page.evaluate(() => {
      const w = document.getElementById("content") && document.getElementById("content").contentWindow;
      const host = w && w.document.querySelector("[data-year-game]");
      if (host && typeof host.__ittGymRushEnd === "function") host.__ittGymRushEnd(40);
    });
    await expect.poll(async () => getKey(page, "itt16-game-gymrush"), { timeout: 10000 }).toBeTruthy();
    expect(await getKey(page, "itt15-game-blobrush")).toBe('{"keep":1}');
    await expect(frame.locator("body")).toContainText(/Jul(?:y)?\s*6|no official|Gym Rush/i);
  });
});
