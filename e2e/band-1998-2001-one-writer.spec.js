// @ts-check
/**
 * Phase 2 lock for 1998–2001. Lucky is one envelope of kind official.
 * One character and empty do not finish the star. Clickscape score 0
 * writes nothing. The full register walk is phase 6.
 */
const { test, expect } = require("@playwright/test");

async function raw(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function envelope(page, key) {
  const text = await raw(page, key);
  return text ? JSON.parse(text) : null;
}

async function verbReady(page) {
  await page.waitForFunction(
    () => {
      const v = document.querySelector("[data-official-verb]");
      return !!(v && v.getAttribute("data-official-verb-bound") === "1");
    },
    null,
    { timeout: 15000 }
  );
}

test.describe("1998-2001 phase 2 one writer", () => {
  test("Lucky empty, trap, and one character write nothing", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt98-lucky"));
    await page.locator("[data-google-lucky]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
    await page.locator("[data-lucky-trap]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
    await page.fill('input[name="q"]', "x");
    await page.locator("[data-google-lucky]").click();
    expect(await raw(page, "itt98-lucky")).toBeNull();
  });

  test("Lucky real query is official and a reload keeps that kind", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt98-lucky"));
    await page.fill('input[name="q"]', "yahoo");
    await page.locator("[data-google-lucky]").click();
    await expect.poll(() => raw(page, "itt98-lucky"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt98-lucky");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("1998");
    expect(saved.key).toBe("itt98-lucky");
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    const again = await envelope(page, "itt98-lucky");
    expect(again && again.kind).toBe("official");
    expect(again.real).toBe(true);
  });

  test("Google Search does not write the Lucky star", async ({ page }) => {
    await page.goto("/years/1998/sites/google/lucky.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt98-lucky"));
    await page.fill('input[name="q"]', "yahoo");
    await page.locator('input[name="btnG"]').click();
    await page.waitForTimeout(300);
    expect(await raw(page, "itt98-lucky")).toBeNull();
  });

  test("AIM real sign-on is official and empty stays empty", async ({ page }) => {
    await page.goto("/years/1999/sites/aim/index.html");
    await page.waitForSelector("[data-aim-signon]");
    await page.evaluate(() => {
      localStorage.removeItem("itt99-aim");
      localStorage.removeItem("itt99-aim-user");
    });
    await page.locator("[data-aim-signon] button[type='submit']").click();
    expect(await raw(page, "itt99-aim")).toBeNull();
    await page.fill("[name='sn']", "sk8r99");
    await page.locator("[data-aim-signon] button[type='submit']").click();
    await expect.poll(() => raw(page, "itt99-aim"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt99-aim");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("1999");
    expect(saved.key).toBe("itt99-aim");
  });

  test("MapQuest real From+To is official and does not fall back to toy", async ({ page }) => {
    await page.goto("/years/2000/sites/mapquest/index.html");
    await verbReady(page);
    await page.evaluate(() => {
      localStorage.removeItem("itt00-mapquest");
      localStorage.removeItem("itt00-mapquest-trip");
    });
    await page.fill("[name='from']", "123 Main St");
    await page.fill("[name='to']", "456 Oak Ave");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => raw(page, "itt00-mapquest"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt00-mapquest");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("2000");
    expect(saved.key).toBe("itt00-mapquest");
  });

  test("Clickscape score 0 and New Game write nothing", async ({ page }) => {
    await page.goto("/years/2001/sites/playable/game.html");
    await page.waitForFunction(
      () => !!(window.ITT && window.ITT.YearGame && window.ITT.YearGame.saveBest),
      null,
      { timeout: 15000 }
    );
    await page.evaluate(() => localStorage.removeItem("itt01-game-clickscape"));
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(250);
    expect(await raw(page, "itt01-game-clickscape")).toBeNull();
    const refused = await page.evaluate(() => {
      const blob = window.ITT.YearGame.saveBest("clickscape", 0, { year: "2001" });
      return {
        blob: blob,
        stored: localStorage.getItem("itt01-game-clickscape"),
      };
    });
    expect(refused.blob).toBeNull();
    expect(refused.stored).toBeNull();
  });
});
