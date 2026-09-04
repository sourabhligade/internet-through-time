// @ts-check
/** 2013 Loop Six + 2014 Tile Fold — engines write official keys; traps never write. */
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
    test.skip(true, "2014 wiped");
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
});
