// @ts-check
/**
 * Phase 3 lock for 2014–2017. Empty WhatsApp, empty Story, empty Periscope
 * title, and Live Rush score 0 write nothing.
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

test.describe("2014-2017 phase 3 empty holds", () => {
  test("WhatsApp empty Install writes nothing", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt14-wa-install"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt14-wa-install")).toBeNull();
  });

  test("Stories empty Add writes nothing", async ({ page }) => {
    await page.goto("/years/2016/sites/instagram/stories.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.locator("[data-ig-story-add]").click();
    expect(await raw(page, "itt16-ig-stories")).toBeNull();
  });

  test("Periscope empty title writes nothing and ended broadcast writes nothing", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.locator("#root").waitFor({ state: "attached", timeout: 15000 });
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await room.locator(".actions button").last().click();
    expect(await raw(page, "itt15-periscope")).toBeNull();
    await room.locator(".actions button").first().click();
    expect(await raw(page, "itt15-periscope")).toBeNull();
  });

  test("Live Rush score 0 trap writes nothing", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-game-liverush");
    await page.locator("#root").waitFor({ state: "attached", timeout: 15000 });
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-game-liverush");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-game-liverush"));
    await room.locator(".actions button").first().click();
    expect(await raw(page, "itt15-game-liverush")).toBeNull();
  });
});
