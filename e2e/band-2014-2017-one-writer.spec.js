// @ts-check
/**
 * Phase 2 lock for 2014–2017. WhatsApp Install, Stories, Pokémon GO, and
 * Reactions are kind official. 2015 React stops store official. 2017 stays
 * absent. The 115-page walk is phase 6.
 */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { completeReactStop } = require("./helpers.js");

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
  const boxes = page.locator("[data-official-req], [data-req]");
  const n = await boxes.count();
  for (let i = 0; i < n; i++) await boxes.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill("leftover residual");
  await page.locator("[data-official-verb]").first().click();
}

test.describe("2014-2017 phase 2 one writer", () => {
  test("2015 tree, 2016, and 2017 stay absent", () => {
    expect(fs.existsSync(path.join(__dirname, "../years/2015"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2016"))).toBe(false);
    expect(fs.existsSync(path.join(__dirname, "../years/2017"))).toBe(false);
  });

  test("WhatsApp empty install writes nothing then a real install is official", async ({ page }) => {
    await page.goto("/years/2014/sites/whatsapp/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt14-wa-install"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt14-wa-install")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt14-wa-install"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt14-wa-install")).kind).toBe("official");
  });

  test("Stories empty write nothing then a real add is official", async ({ page }) => {
    test.skip(!require("fs").existsSync(require("path").join(__dirname, "..", "years", "2016", "index.html")), "2016 wiped");

    await page.goto("/years/2016/sites/instagram/stories.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt16-ig-stories"));
    await page.locator("[data-official-verb]").click();
    expect(await raw(page, "itt16-ig-stories")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt16-ig-stories")).kind).toBe("official");
  });

  test("Pokémon GO empty catch writes nothing then a real team is official", async ({ page }) => {
    test.skip(!require("fs").existsSync(require("path").join(__dirname, "..", "years", "2016", "index.html")), "2016 wiped");

    await page.goto("/years/2016/sites/pokemongo/index.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt16-pogo"));
    await page.locator("[data-pogo-catch]").click();
    expect(await raw(page, "itt16-pogo")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt16-pogo"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt16-pogo")).kind).toBe("official");
  });

  test("Reactions Like-only writes nothing then a real Like with reqs is official", async ({ page }) => {
    test.skip(!require("fs").existsSync(require("path").join(__dirname, "..", "years", "2016", "index.html")), "2016 wiped");

    await page.goto("/years/2016/sites/facebook/reactions.html");
    await verbReady(page);
    await page.evaluate(() => localStorage.removeItem("itt16-fb-react"));
    await page.locator("[data-fb-like]").click();
    expect(await raw(page, "itt16-fb-react")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => raw(page, "itt16-fb-react"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt16-fb-react")).kind).toBe("official");
  });

  test("Apple Music empty then a real Play is official", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-music");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-music");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-music"));
    await room.locator(".actions button").last().click();
    expect(await raw(page, "itt15-music")).toBeNull();
    await completeReactStop(page, room);
    await expect.poll(() => raw(page, "itt15-music"), { timeout: 8000 }).toBeTruthy();
    expect((await envelope(page, "itt15-music")).kind).toBe("official");
  });
});
