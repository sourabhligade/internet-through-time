// @ts-check
/**
 * Phase 2 lock for 2010–2013. Instagram, Google+, Instagram Android, Vine,
 * and Facebook 1B are kind official. Guess Doodle Start writes nothing.
 * iPad order stays official. The 182-page walk is phase 6.
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
  const boxes = page.locator("[data-official-req], [data-req], [data-fb1b-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2010-2013 phase 2 one writer", () => {
  test("Instagram empty write nothing then a real share is official", async ({ page }) => {
    await page.goto("/years/2010/sites/instagram/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt10-ig-posts"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt10-ig-posts")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt10-ig-posts"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt10-ig-posts")).kind).toBe("official");
  });

  test("Google+ empty write nothing then a real ack is official", async ({ page }) => {
    await page.goto("/years/2011/sites/googleplus/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt11-gplus"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt11-gplus")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt11-gplus"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt11-gplus")).kind).toBe("official");
  });

  test("Instagram Android empty write nothing then a real share is official", async ({ page }) => {
    await page.goto("/years/2012/sites/instagram/android.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt12-ig-android"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt12-ig-android")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt12-ig-android"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt12-ig-android")).kind).toBe("official");
  });

  test("Facebook 1B empty then a real ack is official", async ({ page }) => {
    await page.goto("/years/2012/sites/facebook/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt12-facebook"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt12-facebook")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt12-facebook"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt12-facebook")).kind).toBe("official");
  });

  test("Vine empty write nothing then a real post is official", async ({ page }) => {
    await page.goto("/years/2013/sites/vine/record.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt13-vine-posts"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt13-vine-posts")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt13-vine-posts"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt13-vine-posts")).kind).toBe("official");
  });

  test("iPad empty order writes nothing then Place order is official", async ({ page }) => {
    await page.goto("/years/2010/sites/ipad/order.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt10-ipad"));
    await page.locator("[data-ipad-order]").click();
    expect(await raw(page, "itt10-ipad")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt10-ipad"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt10-ipad")).kind).toBe("official");
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
