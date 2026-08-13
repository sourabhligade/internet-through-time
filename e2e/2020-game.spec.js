// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2020 Sus Vote", () => {
  test("game boots and incomplete does not write best", async ({ page }) => {
    await page.goto("/years/2020/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt20-game-among"));
    await page.reload();
    await expect(page.locator('[data-year-game][data-game-id="among"]')).toBeVisible();
    await expect(page.locator("#game-canvas")).toBeVisible();
    await page.locator("[data-game-start]").click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem("itt20-game-among"))).toBeFalsy();
  });

  test("literacy incomplete does not write", async ({ page }) => {
    await page.goto("/years/2020/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt20-among-lit"));
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator("[data-itt-real-save]").click();
    await page.waitForTimeout(120);
    expect(await page.evaluate(() => localStorage.getItem("itt20-among-lit"))).toBeFalsy();
  });

  test("literacy two checks write itt20-among-lit", async ({ page }) => {
    await page.goto("/years/2020/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt20-among-lit"));
    await page.reload();
    await page.waitForTimeout(400);
    const boxes = page.locator("[data-req]");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check();
    await page.locator("[data-itt-real-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-among-lit"))).toBeTruthy();
  });

  test("full run writes itt20-game-among", async ({ page }) => {
    await page.goto("/years/2020/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt20-game-among"));
    await page.reload();
    await page.locator("[data-game-start]").click();
    const box = await page.locator("#game-canvas").boundingBox();
    expect(box).toBeTruthy();
    // First bean (red) ~ x=70 of 400
    await page.locator("#game-canvas").click({ position: { x: 70, y: 160 } });
    // Hold task bar
    await page.locator("#game-canvas").hover({ position: { x: 200, y: 237 } });
    await page.mouse.down();
    await page.waitForTimeout(2200);
    await page.mouse.up();
    await page.locator("[data-among-type]").fill("red is sus");
    await page.locator("#game-canvas").click({ position: { x: 70, y: 160 } });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt20-game-among"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt20-game-among"))) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.year).toBe("2020");
    expect(blob.gameId).toBe("among");
    expect(blob.best).toBeGreaterThan(0);
  });
});
