// @ts-check
/**
 * 2020 lean door — official 10 period machines.
 * Trap / empty never write. Complete writes whenKey. Star empty on leftovers.
 */
const { test, expect } = require("@playwright/test");

/** @param {import('@playwright/test').Page} page @param {string} key */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/** @param {import('@playwright/test').Page} page @param {string} path @param {string} key */
async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt20-zoom");
  }, key);
  await page.reload();
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 * @param {string} nextBit
 */
async function expectNext(page, key, nextBit) {
  const chip = page.locator(`[data-next-flow][data-next-when-key="${key}"] a`).first();
  await expect(chip).toBeVisible({ timeout: 8000 });
  const href = await chip.getAttribute("href");
  expect(href, key + " Next").toContain(nextBit);
}

/** @param {import('@playwright/test').Page} page @param {string} suffix */
async function fourxComplete(page, suffix) {
  const panel = page.locator(`[data-4x-panel]:has([data-4x-go="${suffix}"])`);
  await expect(page.locator('html[data-4x-ready="1"]')).toBeAttached({ timeout: 15000 });
  await panel.locator("[data-4x-go]").click();
  await panel.locator("[data-4x-field]").fill("ok leftover");
  await panel.locator("[data-4x-go]").click();
}

test("2020 dests 200 · home guided 6", async ({ page }) => {
  const paths = [
    "/years/2020/pages/home.html",
    "/years/2020/pages/about.html",
    "/years/2020/pages/map.html",
    "/years/2020/sites/zoom/meeting.html",
    "/years/2020/sites/reels/index.html",
    "/years/2020/sites/openai/index.html",
    "/years/2020/sites/flash/index.html",
    "/years/2020/sites/tiktok/index.html",
    "/years/2020/sites/markets/wti.html",
    "/years/2020/sites/edge/index.html",
    "/years/2020/sites/ccpa/index.html",
    "/years/2020/sites/chrome/index.html",
    "/years/2020/sites/playable/game.html"
  ];
  for (const p of paths) {
    const res = await page.goto(p);
    expect(res && res.status(), p).toBeLessThan(400);
  }
  await page.goto("/years/2020/pages/home.html");
  await expect(page.locator('[data-ott-one-thing="2020"]')).toBeVisible();
  await expect(page.locator("#ott-guided-2020 ol > li")).toHaveCount(6);
});

test("1 Zoom mute · Join never writes · mute+chat+leave writes", async ({ page }) => {
  await openClear(page, "/years/2020/sites/zoom/index.html", "itt20-zoom");
  await page.locator("[data-zoom-join]").click();
  expect(await getKey(page, "itt20-zoom")).toBeFalsy();
  await page.goto("/years/2020/sites/zoom/meeting.html");
  await page.evaluate(() => localStorage.removeItem("itt20-zoom"));
  await page.reload();
  await page.locator("[data-zoom-leave]").click();
  expect(await getKey(page, "itt20-zoom")).toBeFalsy();
  await page.locator("[data-zoom-req]").nth(0).check();
  await page.locator("[data-zoom-req]").nth(1).check();
  await page.locator("[data-zoom-mute]").click();
  await page.locator("[data-zoom-leave]").click();
  expect(await getKey(page, "itt20-zoom")).toBeFalsy();
  await page.locator("[data-zoom-chat]").fill("can you hear me");
  await page.locator("[data-zoom-send]").click();
  await page.locator("[data-zoom-leave]").click();
  await expect.poll(() => getKey(page, "itt20-zoom"), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, "itt20-zoom")) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.muted).toBe(true);
  expect(blob.left).toBe(true);
  expect(blob.participantsNotUsers).toBe(true);
  expect(String(blob.year)).toBe("2020");
  await expectNext(page, "itt20-zoom", "reels/index.html");
});

const OFFICIAL = [
  ["2 Reels", "/years/2020/sites/reels/index.html", "itt20-reels", "openai"],
  ["3 GPT-3", "/years/2020/sites/openai/index.html", "itt20-gpt3", "flash"],
  ["4 Flash", "/years/2020/sites/flash/index.html", "itt20-flash", "tiktok"],
  ["5 TikTok EO", "/years/2020/sites/tiktok/index.html", "itt20-tiktok-eo", "wti"],
  ["6 WTI", "/years/2020/sites/markets/wti.html", "itt20-wti", "edge"],
  ["7 Edge", "/years/2020/sites/edge/index.html", "itt20-edge", "ccpa"],
  ["8 CCPA", "/years/2020/sites/ccpa/index.html", "itt20-ccpa", "chrome"],
  ["9 Chrome", "/years/2020/sites/chrome/index.html", "itt20-chrome", "game"]
];

for (const [name, path, key, nextBit] of OFFICIAL) {
  test(`${name} · trap/empty never write · year-true writes · star empty`, async ({ page }) => {
    await openClear(page, path, key);
    const stage = page.locator("[data-v20-stage]").first();
    await expect(stage).toBeVisible({ timeout: 15000 });
    await stage.locator("[data-v20-trap]").click();
    expect(await getKey(page, key)).toBeFalsy();
    await stage.locator("[data-v20-go]").click();
    expect(await getKey(page, key)).toBeFalsy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    await stage.locator("[data-v20-req]").nth(0).check();
    await stage.locator("[data-v20-req]").nth(1).check();
    await stage.locator("[data-v20-field]").fill("ok leftover");
    await stage.locator("[data-v20-go]").click();
    await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt20-zoom")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, key)) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2020");
    await expectNext(page, key, nextBit);
  });
}

test("10 Sus Vote · skip never writes · vote writes", async ({ page }) => {
  await openClear(page, "/years/2020/sites/playable/game.html", "itt20-game-among");
  await page.locator("[data-sus-skip]").click();
  expect(await getKey(page, "itt20-game-among")).toBeFalsy();
  await page.locator("[data-game-start]").click();
  await page.locator("[data-sus-req]").nth(0).check();
  await page.locator("[data-sus-req]").nth(1).check();
  await page.locator("[data-sus-field]").fill("red is sus");
  await page.locator("[data-sus-vote]").click();
  await expect.poll(() => getKey(page, "itt20-game-among"), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, "itt20-game-among")) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2020");
  await expectNext(page, "itt20-game-among", "zoom/meeting.html");
});
