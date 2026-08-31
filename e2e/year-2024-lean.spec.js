// @ts-check
/**
 * 2024 lean door — official 10 period machines.
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
    localStorage.removeItem("itt24-gpt4o");
    localStorage.removeItem("itt23-plus");
    localStorage.removeItem("itt23-chatgpt-plus");
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

test("2024 dests 200 · home guided 6", async ({ page }) => {
  const paths = [
    "/years/2024/pages/home.html",
    "/years/2024/pages/about.html",
    "/years/2024/pages/map.html",
    "/years/2024/sites/chatgpt/4o.html",
    "/years/2024/sites/gemini/index.html",
    "/years/2024/sites/claude35/index.html",
    "/years/2024/sites/sora/index.html",
    "/years/2024/sites/appleintel/index.html",
    "/years/2024/sites/o1/index.html",
    "/years/2024/sites/chatgpt/plus.html",
    "/years/2024/sites/chrome/index.html",
    "/years/2024/sites/win11/index.html",
    "/years/2024/sites/playable/game.html"
  ];
  for (const p of paths) {
    const res = await page.goto(p);
    expect(res && res.status(), p).toBeLessThan(400);
  }
  await page.goto("/years/2024/pages/home.html");
  await expect(page.locator('[data-ott-one-thing="2024"]')).toBeVisible();
  await expect(page.locator("#ott-guided-2024 ol > li")).toHaveCount(6);
});

test("1 GPT-4o Talk · traps never write · pick+ticks+Talk writes", async ({ page }) => {
  await openClear(page, "/years/2024/sites/chatgpt/4o.html", "itt24-gpt4o");
  await page.locator('[data-4o-trap="gpt5"]').click();
  expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
  await page.locator('[data-4o-pick="5"]').click();
  expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
  await page.locator("[data-4o-talk]").click();
  expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
  await page.locator('[data-4o-pick="4"]').click();
  await page.locator("[data-4o-req]").nth(0).check();
  await page.locator("[data-4o-req]").nth(1).check();
  await page.locator("[data-4o-talk]").click();
  expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
  await page.locator('[data-4o-pick="4o"]').click();
  await page.locator("[data-4o-talk]").click();
  await expect.poll(() => getKey(page, "itt24-gpt4o"), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, "itt24-gpt4o")) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.omni).toBe(true);
  expect(blob.freeClass).toBe(true);
  expect(blob.gpt5).toBe(false);
  expect(String(blob.year)).toBe("2024");
  expect(await getKey(page, "itt23-plus")).toBeFalsy();
  await expectNext(page, "itt24-gpt4o", "gemini/index.html");
});

const OFFICIAL = [
  ["2 Gemini", "/years/2024/sites/gemini/index.html", "itt24-gemini", "claude35"],
  ["3 Claude 3.5", "/years/2024/sites/claude35/index.html", "itt24-claude35", "sora"],
  ["4 Sora", "/years/2024/sites/sora/index.html", "itt24-sora", "appleintel"],
  ["5 Apple Intelligence", "/years/2024/sites/appleintel/index.html", "itt24-appleintel", "o1"],
  ["6 o1", "/years/2024/sites/o1/index.html", "itt24-o1", "plus"],
  ["7 Plus residual", "/years/2024/sites/chatgpt/plus.html", "itt24-plus", "chrome"],
  ["8 Chrome", "/years/2024/sites/chrome/index.html", "itt24-chrome", "win11"],
  ["9 Win11", "/years/2024/sites/win11/index.html", "itt24-win11", "game"]
];

for (const [name, path, key, nextBit] of OFFICIAL) {
  test(`${name} · trap/empty never write · year-true writes · star empty`, async ({ page }) => {
    await openClear(page, path, key);
    const stage = page.locator("[data-v24-stage]").first();
    await expect(stage).toBeVisible({ timeout: 15000 });
    await stage.locator("[data-v24-trap]").click();
    expect(await getKey(page, key)).toBeFalsy();
    await stage.locator("[data-v24-go]").click();
    expect(await getKey(page, key)).toBeFalsy();
    expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
    expect(await getKey(page, "itt23-plus")).toBeFalsy();
    await stage.locator("[data-v24-req]").nth(0).check();
    await stage.locator("[data-v24-req]").nth(1).check();
    await stage.locator("[data-v24-field]").fill("ok leftover");
    const goodPick = stage.locator("[data-v24-pick]:not([data-v24-pick='trap'])").first();
    if (await goodPick.count()) await goodPick.click();
    await stage.locator("[data-v24-go]").click();
    await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
    expect(await getKey(page, "itt23-plus")).toBeFalsy();
    const blob = JSON.parse((await getKey(page, key)) || "{}");
    expect(blob.real).toBe(true);
    expect(String(blob.year)).toBe("2024");
    await expectNext(page, key, nextBit);
  });
}

test("10 Omni Dash · costume never writes · start+finish writes", async ({ page }) => {
  await openClear(page, "/years/2024/sites/playable/game.html", "itt24-game-omni");
  await page.locator("[data-omni-trap]").click();
  expect(await getKey(page, "itt24-game-omni")).toBeFalsy();
  await page.locator("[data-omni-finish]").click();
  expect(await getKey(page, "itt24-game-omni")).toBeFalsy();
  await page.locator("[data-game-start]").click();
  await page.locator("[data-omni-req]").nth(0).check();
  await page.locator("[data-omni-req]").nth(1).check();
  await page.locator("[data-omni-finish]").click();
  await expect.poll(() => getKey(page, "itt24-game-omni"), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, "itt24-game-omni")) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2024");
  expect(await getKey(page, "itt24-gpt4o")).toBeFalsy();
  await expectNext(page, "itt24-game-omni", "chatgpt/4o.html");
});
