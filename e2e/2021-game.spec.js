// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("2021 Five Letter", () => {
  test("game boots and abandon never writes", async ({ page }) => {
    await page.goto("/years/2021/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt21-game-five"));
    await page.reload();
    await expect(page.locator('[data-year-game][data-game-id="five"]')).toBeVisible();
    await expect(page.locator("[data-five-board]")).toBeVisible();
    await page.locator("[data-five-guess]").fill("TRACE");
    await page.locator("[data-five-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-game-five"))).toBeNull();
  });

  test("unfinished + checks still never writes", async ({ page }) => {
    await page.goto("/years/2021/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt21-game-five"));
    await page.reload();
    const boxes = page.locator("[data-req]");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
    await page.locator("[data-five-save]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt21-game-five"))).toBeNull();
  });

  test("win TRACE + checks writes itt21-game-five", async ({ page }) => {
    await page.goto("/years/2021/sites/playable/game.html");
    await page.evaluate(() => localStorage.removeItem("itt21-game-five"));
    await page.reload();
    await page.locator("[data-five-guess]").fill("TRACE");
    await page.locator("[data-five-enter]").click();
    await expect(page.locator("[data-year-game]")).toHaveAttribute("data-five-done", "1");
    const boxes = page.locator("[data-req]");
    const n = await boxes.count();
    for (let i = 0; i < n; i++) await boxes.nth(i).check({ force: true });
    await page.locator("[data-five-save]").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem("itt21-game-five"))).toBeTruthy();
    const blob = JSON.parse((await page.evaluate(() => localStorage.getItem("itt21-game-five"))) || "null");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2021");
  });
});
