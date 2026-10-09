// @ts-check
/**
 * Museum-grade UX phase 1. One official envelope.
 * Extras skip when the dest owns [data-official-verb].
 * Empty / trap / incomplete write nothing.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const { getKey, verbReady, finishOfficial, envelope } = require("./ux-phase-io.js");

async function openDest(page, path, key) {
  await page.goto(path);
  await verbReady(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function trapNeverWrites(page, key) {
  const trap = page.locator("[data-official-trap]").first();
  if (await trap.count()) {
    await trap.click();
    expect(await getKey(page, key)).toBeNull();
  }
}

test.describe("UX phase 1 honesty writers", () => {
  test("Pokémon GO Catch extras skip then a real team is official", async ({ page }) => {
    await openDest(page, "/years/2016/sites/pokemongo/index.html", "itt16-pogo");
    await trapNeverWrites(page, "itt16-pogo");
    await page.locator("[data-pogo-catch]").click();
    expect(await getKey(page, "itt16-pogo")).toBeNull();
    await page.locator("[data-pogo-gps]").check();
    await page.locator("[data-pogo-catch]").click();
    expect(await getKey(page, "itt16-pogo")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => getKey(page, "itt16-pogo"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt16-pogo");
  });

  test("Reactions Love and Like-only write nothing then dest-true is official", async ({ page }) => {
    await openDest(page, "/years/2016/sites/facebook/reactions.html", "itt16-fb-react");
    await trapNeverWrites(page, "itt16-fb-react");
    await page.locator('[data-fb-react="love"]').click();
    expect(await getKey(page, "itt16-fb-react")).toBeNull();
    await page.locator("[data-fb-like]").click();
    expect(await getKey(page, "itt16-fb-react")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => getKey(page, "itt16-fb-react"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt16-fb-react");
  });

  test("Stories empty Add writes nothing then a real add is official", async ({ page }) => {
    await openDest(page, "/years/2016/sites/instagram/stories.html", "itt16-ig-stories");
    await trapNeverWrites(page, "itt16-ig-stories");
    await page.locator("[data-official-verb]").first().click();
    expect(await getKey(page, "itt16-ig-stories")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => getKey(page, "itt16-ig-stories"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt16-ig-stories");
  });

  test("E2E Open with no ticks writes nothing then dest-true is official", async ({ page }) => {
    await openDest(page, "/years/2016/sites/whatsapp/e2e.html", "itt16-wa-e2e");
    await trapNeverWrites(page, "itt16-wa-e2e");
    await page.locator("[data-official-verb]").first().click();
    expect(await getKey(page, "itt16-wa-e2e")).toBeNull();
    await finishOfficial(page);
    await expect.poll(() => getKey(page, "itt16-wa-e2e"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt16-wa-e2e");
  });
});
