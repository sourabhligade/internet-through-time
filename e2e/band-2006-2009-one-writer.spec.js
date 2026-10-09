// @ts-check
/**
 * Phase 2 lock for 2006–2009. Twttr, iPhone Safari, App Store, and Like
 * are one envelope of kind official. Plot Start writes nothing. The 794-page
 * walk is phase 6.
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
  await page.waitForFunction(() => {
    const verbs = document.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return document.readyState === "complete";
    return [...verbs].every((el) => el.getAttribute("data-official-verb-bound") === "1");
  }, null, { timeout: 15000 });
}

async function finishOfficial(page) {
  const boxes = page.locator("[data-official-req], [data-tw06-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2006-2009 phase 2 one writer", () => {
  test("Twttr empty, trap, and one character write nothing", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt06-tweets"));
    await page.locator("[data-tw06-post]").click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
    await page.locator("[data-tw06-trap], [data-official-trap]").first().click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
    await page.fill("[data-official-need]", "x");
    await page.locator("[data-tw06-post]").click();
    expect(await raw(page, "itt06-tweets")).toBeNull();
  });

  test("Twttr real update is official and a reload keeps that kind", async ({ page }) => {
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt06-tweets"));
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt06-tweets"), { timeout: 8000 }).toBeTruthy();
    const saved = await envelope(page, "itt06-tweets");
    expect(saved && saved.kind).toBe("official");
    expect(saved.real).toBe(true);
    expect(saved.year).toBe("2006");
    expect(saved.key).toBe("itt06-tweets");
    await page.goto("/years/2006/sites/twitter/index.html");
    await verbReady(page);
    const again = await envelope(page, "itt06-tweets");
    expect(again && again.kind).toBe("official");
  });

  test("iPhone empty URL writes nothing then a real Go is official", async ({ page }) => {
    await page.goto("/years/2007/sites/iphone/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt07-iphone"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt07-iphone")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt07-iphone"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt07-iphone")).kind).toBe("official");
  });

  test("App Store empty field writes nothing then FREE is official", async ({ page }) => {
    await page.goto("/years/2008/sites/appstore/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt08-apps"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt08-apps")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt08-apps"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt08-apps")).kind).toBe("official");
  });

  test("Like empty and one partner write nothing then a real Like is official", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt09-like")).toBeNull();
    await page.locator("[data-lk09-page]").first().click();
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt09-like")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt09-like"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt09-like")).kind).toBe("official");
  });

  test("Plot Start writes nothing", async ({ page }) => {
    await page.goto("/years/2009/sites/playable/game.html");
    await page.waitForSelector("[data-game-start]");
    await page.evaluate(() => localStorage.removeItem("itt09-game-plot"));
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(250);
    expect(await raw(page, "itt09-game-plot")).toBeNull();
  });
});
