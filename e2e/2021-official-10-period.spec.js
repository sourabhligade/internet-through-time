// @ts-check
/**
 * 2021 official 10 — period machines, not leftover-official 4× panels.
 * Trap / empty / 0 ticks / wrong pick never write. Complete writes whenKey.
 * Leftover complete must not write itt21-att. Official Next matches flow-trails.
 */
const { test, expect } = require("@playwright/test");

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @param {import('@playwright/test').Page} page @param {string} path @param {string} key */
async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.evaluate(() => localStorage.removeItem("itt21-att"));
  await page.reload();
  await page.waitForTimeout(250);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 * @param {string} nextHref
 */
async function expectNext(page, key, nextHref) {
  const chip = page.locator(`[data-next-flow][data-next-when-key="${key}"] a`).first();
  await expect(chip).toBeVisible({ timeout: 8000 });
  const href = await chip.getAttribute("href");
  expect(href, key + " Next").toContain(nextHref.replace(/^sites\//, ""));
}

test.describe("2021 official 10 · period machines", () => {
  test("1 ATT Ask · Allow never writes · hops + ticks + Ask writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/att/index.html", "itt21-att");
    await page.locator("[data-att-ask]").click();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await page.locator("[data-att-allow]").click();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await page.locator('[data-att-open="privacy"]').click();
    await page.locator('[data-att-open="tracking"]').click();
    await page.locator("[data-att-req]").nth(0).check();
    await page.locator("[data-att-req]").nth(1).check();
    await page.locator("[data-att-ask]").click();
    await expect.poll(() => getKey(page, "itt21-att"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt21-att")) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.asked).toBe(true);
    expect(blob.allow).toBe(false);
    expect(String(blob.year)).toBe("2021");
    await expectNext(page, "itt21-att", "signal/index.html");
  });

  test("2 Signal leftover · 8 Feb trap · join writes · star empty", async ({ page }) => {
    await openClear(page, "/years/2021/sites/signal/index.html", "itt21-signal");
    await page.locator("[data-sig-trap]").click();
    expect(await getKey(page, "itt21-signal")).toBeFalsy();
    await page.locator("[data-sig-join]").click();
    expect(await getKey(page, "itt21-signal")).toBeFalsy();
    await page.locator("[data-sig-req]").nth(0).check();
    await page.locator("[data-sig-req]").nth(1).check();
    await page.fill("[data-sig-handle]", "museum");
    await page.locator("[data-sig-join]").click();
    await expect.poll(() => getKey(page, "itt21-signal"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-signal", "copilot/index.html");
  });

  test("3 Copilot waitlist · chat trap · waitlist writes · not ChatGPT", async ({ page }) => {
    await openClear(page, "/years/2021/sites/copilot/index.html", "itt21-copilot");
    await page.locator("[data-copilot-chat]").click();
    expect(await getKey(page, "itt21-copilot")).toBeFalsy();
    await page.locator("[data-copilot-req]").nth(0).check();
    await page.locator("[data-copilot-req]").nth(1).check();
    await page.fill("[data-copilot-email]", "leftover@museum");
    await page.locator("[data-copilot-wait]").click();
    await expect.poll(() => getKey(page, "itt21-copilot"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expect(page.locator("body")).not.toContainText(/ChatGPT is here/i);
    await expectNext(page, "itt21-copilot", "meta/index.html");
  });

  test("4 Meta rename · Meta app trap · company leftover writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/meta/index.html", "itt21-meta");
    await page.locator("[data-meta-app]").click();
    expect(await getKey(page, "itt21-meta")).toBeFalsy();
    await page.locator("[data-meta-req]").nth(0).check();
    await page.locator("[data-meta-req]").nth(1).check();
    await page.locator("[data-meta-save]").click();
    await expect.poll(() => getKey(page, "itt21-meta"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-meta", "windows11/index.html");
  });

  test("5 Win11 leftover · Win10-gone trap · install writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/windows11/index.html", "itt21-win11");
    await page.locator("[data-w11-gone]").click();
    expect(await getKey(page, "itt21-win11")).toBeFalsy();
    await page.locator("[data-w11-install]").click();
    expect(await getKey(page, "itt21-win11")).toBeFalsy();
    await page.locator("[data-w11-req]").nth(0).check();
    await page.locator("[data-w11-req]").nth(1).check();
    await page.locator("[data-w11-install]").click();
    await expect.poll(() => getKey(page, "itt21-win11"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-win11", "flash/index.html");
  });

  test("6 Flash brick · Play SWF trap · brick writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/flash/index.html", "itt21-flash-brick");
    await page.locator("[data-flash-play]").click();
    expect(await getKey(page, "itt21-flash-brick")).toBeFalsy();
    await page.locator("[data-flash-brick]").click();
    expect(await getKey(page, "itt21-flash-brick")).toBeFalsy();
    await page.locator("[data-flash-req]").nth(0).check();
    await page.locator("[data-flash-req]").nth(1).check();
    await page.locator("[data-flash-brick]").click();
    await expect.poll(() => getKey(page, "itt21-flash-brick"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-flash-brick", "chrome/index.html");
  });

  test("7 Chrome habit · Edge trap · empty URL · keep writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/chrome/index.html", "itt21-chrome");
    await page.locator("[data-ch21-edge]").click();
    expect(await getKey(page, "itt21-chrome")).toBeFalsy();
    await page.locator("[data-ch21-keep]").click();
    expect(await getKey(page, "itt21-chrome")).toBeFalsy();
    await page.fill("[data-ch21-url]", "example.com");
    await page.locator("[data-ch21-keep]").click();
    await expect.poll(() => getKey(page, "itt21-chrome"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-chrome", "windows10/index.html");
  });

  test("8 Win10 residual · Win11-mass trap · residual writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/windows10/index.html", "itt21-win10");
    await page.locator("[data-w10-mass]").click();
    expect(await getKey(page, "itt21-win10")).toBeFalsy();
    await page.locator("[data-w10-save]").click();
    expect(await getKey(page, "itt21-win10")).toBeFalsy();
    await page.locator("[data-w10-req]").nth(0).check();
    await page.locator("[data-w10-req]").nth(1).check();
    await page.locator("[data-w10-save]").click();
    await expect.poll(() => getKey(page, "itt21-win10"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-win10", "facebook/index.html");
  });

  test("9 Facebook leftover · Meta-app pick never writes · connect writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/facebook/index.html", "itt21-pop-facebook");
    await page.fill("[data-pop-field]", "connect 2021");
    await page.locator("[data-pop-req]").check();
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt21-pop-facebook")).toBeFalsy();
    await page.locator('[data-pop-pick="app"]').click();
    await page.locator("[data-pop-go]").click();
    expect(await getKey(page, "itt21-pop-facebook")).toBeFalsy();
    await page.locator('[data-pop-pick="connect"]').click();
    await page.locator("[data-pop-go]").click();
    await expect.poll(() => getKey(page, "itt21-pop-facebook"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expectNext(page, "itt21-pop-facebook", "playable/game.html");
  });

  test("10 Five Letter · 0 ticks never write · New Game + guess writes", async ({ page }) => {
    await openClear(page, "/years/2021/sites/playable/game.html", "itt21-game-five");
    await page.locator("[data-five-guess]").click();
    expect(await getKey(page, "itt21-game-five")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.locator("[data-five-guess]").click();
    expect(await getKey(page, "itt21-game-five")).toBeFalsy();
    await page.locator("[data-five-req]").nth(0).check();
    await page.locator("[data-five-req]").nth(1).check();
    await page.fill("[data-five-field]", "track");
    await page.locator("[data-five-guess]").click();
    await expect.poll(() => getKey(page, "itt21-game-five"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt21-att")).toBeFalsy();
    await expect(page.locator("body")).not.toContainText(/New York Times/i);
    await expectNext(page, "itt21-game-five", "att/index.html");
  });
});
