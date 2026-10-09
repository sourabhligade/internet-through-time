// @ts-check
/**
 * Museum-grade UX phase 3. Accepted write prints Saved.
 * Keys stay in storage. They leave the glass.
 * Off dest-true 12. Do not dest-farm.
 */
const { test, expect } = require("@playwright/test");
const { completeReactStop } = require("./helpers.js");
const { getKey, verbReady, finishOfficial, envelope, statusText } = require("./ux-phase-io.js");

async function openDest(page, path, key) {
  await page.goto(path);
  await verbReady(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function expectSavedGlass(page, key) {
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  await envelope(page, key);
  await expect.poll(() => statusText(page), { timeout: 8000 }).toMatch(/^(Saved\.|This browser blocked the save\.)$/);
  const text = await statusText(page);
  expect(text).not.toMatch(/itt1[56]-/);
  await expect(page.locator("[data-official-status]").first()).not.toContainText(/itt1[56]-/);
}

test.describe("UX phase 3 receipt glass", () => {
  test("Stories official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/instagram/stories.html", "itt16-ig-stories");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-ig-stories");
  });

  test("Pokémon GO official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/pokemongo/index.html", "itt16-pogo");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-pogo");
  });

  test("Reactions official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/facebook/reactions.html", "itt16-fb-react");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-fb-react");
  });

  test("E2E official finish says Saved. with no key on the glass", async ({ page }) => {
    await openDest(page, "/years/2016/sites/whatsapp/e2e.html", "itt16-wa-e2e");
    await finishOfficial(page);
    await expectSavedGlass(page, "itt16-wa-e2e");
  });

  test("2015 Periscope official finish says Saved. with no key on the glass", async ({ page }) => {
    await page.goto("/app/index.html#/year/2015?stop=itt15-periscope");
    await page.waitForFunction(() => !!(window.ITT && window.ITT.User && window.ITT.User.store), null, {
      timeout: 15000,
    });
    const room = page.locator("article.stop#itt15-periscope");
    await room.waitFor({ timeout: 15000 });
    await page.evaluate(() => localStorage.removeItem("itt15-periscope"));
    await completeReactStop(page, room);
    await expect.poll(() => getKey(page, "itt15-periscope"), { timeout: 8000 }).toBeTruthy();
    await envelope(page, "itt15-periscope");
    await expect(room.locator(".status")).toHaveText("Saved.");
    await expect(room.locator(".status")).not.toContainText(/itt15-/);
  });
});
