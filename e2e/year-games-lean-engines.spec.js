// @ts-check
/** 2013 Loop Six + 2014 Tile Fold — engines write official keys; traps never write. */
const fs = require("fs");
const path = require("path");
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, keys) {
  await page.goto(path);
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
  await page.reload();
}

test.describe("lean year game engines", () => {
  test("2013 Loop Six: New Game never writes · 15s trap never writes · six beats write itt13-game-loopsix", async ({
    page
  }) => {
    test.skip(!fs.existsSync(path.join(__dirname, "..", "years", "2013", "index.html")), "2013 wiped");
    await openClear(page, "/years/2013/sites/playable/game.html", [
      "itt13-game-loopsix",
      "itt13-game-loopsix-lx"
    ]);
    await expect(page.locator('[data-year-game][data-game-id="loopsix"]')).toBeVisible();
    await page.locator("[data-game-start]").click();
    expect(await getKey(page, "itt13-game-loopsix")).toBeFalsy();
    await page.locator("[data-peg-trap]").click();
    expect(await getKey(page, "itt13-game-loopsix")).toBeFalsy();
    await page.locator("[data-peg-city]").first().click();
    await expect.poll(() => getKey(page, "itt13-game-loopsix"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt13-game-loopsix-lx")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt13-game-loopsix")) || "{}");
    expect(blob.gameId).toBe("loopsix");
    expect(blob.year).toBe("2013");
    expect(blob.real).toBe(true);
    await expect(page.locator('[data-next-flow][data-next-when-key="itt13-game-loopsix"]')).toBeVisible();
  });

  test("2013 leftover Loop Six plaque does not stamp official", async ({ page }) => {
    test.skip(!fs.existsSync(path.join(__dirname, "..", "years", "2013", "index.html")), "2013 wiped");
    await openClear(page, "/years/2013/sites/playable/game.html", [
      "itt13-game-loopsix",
      "itt13-game-loopsix-lx"
    ]);
    const lo = page.locator('[data-lo-panel]:has([data-lo-save][data-lo-key="game-loopsix-lx"])').first();
    const reqs = lo.locator("[data-lo-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check({ force: true });
    await lo.locator('[data-lo-pick="a"]').click({ force: true });
    await lo.locator('[data-lo-save][data-lo-key="game-loopsix-lx"]').click({ force: true });
    await expect.poll(() => getKey(page, "itt13-game-loopsix-lx"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt13-game-loopsix")).toBeFalsy();
  });

  test("2014 Tile Fold: New Fold never writes · Flappy never writes · two tiles write itt14-game-tilefold", async ({
    page
  }) => {
    await openClear(page, "/years/2014/sites/playable/game.html", [
      "itt14-game-tilefold",
      "itt14-game-tilefold-lx"
    ]);
    await expect(page.locator('[data-year-game][data-game-id="tilefold"]')).toBeVisible();
    await page.locator("[data-game-start]").click();
    expect(await getKey(page, "itt14-game-tilefold")).toBeFalsy();
    await page.locator("[data-tile-trap]").click();
    expect(await getKey(page, "itt14-game-tilefold")).toBeFalsy();
    await page.locator("[data-tile-fold='a']").first().click();
    expect(await getKey(page, "itt14-game-tilefold")).toBeFalsy();
    await page.locator("[data-tile-fold='b']").first().click();
    await expect.poll(() => getKey(page, "itt14-game-tilefold"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt14-game-tilefold-lx")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt14-game-tilefold")) || "{}");
    expect(blob.gameId).toBe("tilefold");
    expect(blob.year).toBe("2014");
    expect(blob.real).toBe(true);
    await expect(page.locator('[data-next-flow][data-next-when-key="itt14-game-tilefold"]')).toBeVisible();
  });

  test("2022 Prompt Box: trap / empty never write · type leftover prompt writes itt22-game-prompt", async ({
    page
  }) => {
    await openClear(page, "/years/2022/sites/playable/game.html", [
      "itt22-game-prompt",
      "itt22-chatgpt",
      "itt22-prompt-lx"
    ]);
    await expect(page.locator('html')).toHaveAttribute("data-official-key", "itt22-game-prompt");
    await page.locator("[data-official-trap]").click();
    expect(await getKey(page, "itt22-game-prompt")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt22-game-prompt")).toBeFalsy();
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt22-game-prompt")).toBeFalsy();
    await page.locator("[data-official-need]").fill("type leftover prompt");
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt22-game-prompt"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, "itt22-game-prompt")) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2022");
    await expect(page.locator('[data-next-flow][data-next-when-key="itt22-game-prompt"]')).toBeVisible();
  });

  test("2022 Famous leftover: load never writes · Start writes snake + breakout", async ({ page }) => {
    await openClear(page, "/years/2022/sites/playable/famous.html?test=1", [
      "itt22-game-snake",
      "itt22-game-breakout",
      "itt22-chatgpt",
      "itt22-game-prompt"
    ]);
    await expect(page.locator('[data-famous="snake"][data-year-game]')).toBeVisible();
    await expect(page.locator('[data-famous="breakout"][data-year-game]')).toBeVisible();
    expect(await getKey(page, "itt22-game-snake")).toBeFalsy();
    expect(await getKey(page, "itt22-game-breakout")).toBeFalsy();
    await page.locator('[data-famous="snake"] [data-game-start]').click();
    await page.locator('[data-famous="breakout"] [data-game-start]').click();
    await expect.poll(() => getKey(page, "itt22-game-snake"), { timeout: 8000 }).toBeTruthy();
    await expect.poll(() => getKey(page, "itt22-game-breakout"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt22-chatgpt")).toBeFalsy();
    expect(await getKey(page, "itt22-game-prompt")).toBeFalsy();
  });
});
