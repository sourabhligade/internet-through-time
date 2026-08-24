// @ts-check
/**
 * Every 2021 writer: trap / empty / 0–1 tick never writes; complete writes itt21-* only.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function clearKey(page, key) {
  await page.evaluate((k) => localStorage.removeItem(k), key);
}

async function blobOf(page, key) {
  const raw = await getKey(page, key);
  return raw ? JSON.parse(raw) : null;
}

async function assertOnlyItt21(page) {
  const leaked = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => /^itt(20|22)-/.test(k))
  );
  expect(leaked).toEqual([]);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 * @param {string} key
 */
async function openClean(page, url, key) {
  await page.goto(url);
  await clearKey(page, key);
  await page.reload();
}

/**
 * First / third 3× — pick + every honesty + field ≥2 + Go.
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 * @param {string} key
 */
async function completePop(page, url, key) {
  await openClean(page, url, key);
  await page.locator("[data-pop-go]").click();
  expect(await getKey(page, key)).toBeFalsy();
  await page.locator("[data-pop-pick]").first().click();
  const reqs = page.locator("[data-pop-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = page.locator("[data-pop-field]");
  const ph = (await field.getAttribute("placeholder")) || "museum leftover";
  await field.fill(ph.length >= 2 ? ph : "museum leftover");
  await page.locator("[data-pop-go]").click();
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = await blobOf(page, key);
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2021");
  await assertOnlyItt21(page);
}

test.describe("2021 leftover flows", () => {
  test("Signal 8 Feb trap never writes; handle + ticks write", async ({ page }) => {
    await openClean(page, "/years/2021/sites/signal/index.html", "itt21-signal");
    await page.locator("[data-sig-trap]").click();
    expect(await getKey(page, "itt21-signal")).toBeFalsy();
    await page.locator("[data-sig-join]").click();
    expect(await getKey(page, "itt21-signal")).toBeFalsy();
    await page.locator("[data-sig-req]").nth(0).check();
    await page.locator("[data-sig-req]").nth(1).check();
    await page.fill("[data-sig-handle]", "museum");
    await page.locator("[data-sig-join]").click();
    await expect.poll(async () => getKey(page, "itt21-signal")).toBeTruthy();
    const blob = await blobOf(page, "itt21-signal");
    expect(blob.real).toBe(true);
    await assertOnlyItt21(page);
  });

  test("Copilot chat trap never writes; waitlist writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/copilot/index.html", "itt21-copilot");
    await page.locator("[data-copilot-chat]").click();
    expect(await getKey(page, "itt21-copilot")).toBeFalsy();
    await page.locator("[data-copilot-wait]").click();
    expect(await getKey(page, "itt21-copilot")).toBeFalsy();
    await page.locator("[data-copilot-req]").nth(0).check();
    await page.locator("[data-copilot-req]").nth(1).check();
    await page.fill("[data-copilot-email]", "waitlist@museum");
    await page.locator("[data-copilot-wait]").click();
    await expect.poll(async () => getKey(page, "itt21-copilot")).toBeTruthy();
    const blob = await blobOf(page, "itt21-copilot");
    expect(blob.real).toBe(true);
    expect(blob.notChatgpt).toBe(true);
    await assertOnlyItt21(page);
  });

  test("Meta app trap never writes; company leftover writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/meta/index.html", "itt21-meta");
    await page.locator("[data-meta-app]").click();
    expect(await getKey(page, "itt21-meta")).toBeFalsy();
    await page.locator("[data-meta-save]").click();
    await expect.poll(async () => getKey(page, "itt21-meta")).toBeTruthy();
    const blob = await blobOf(page, "itt21-meta");
    expect(blob.real).toBe(true);
    expect(blob.appStillFacebook).toBe(true);
    await assertOnlyItt21(page);
  });

  test("Win11 gone trap never writes; leftover install writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/windows11/index.html", "itt21-win11");
    await page.locator("[data-w11-gone]").click();
    expect(await getKey(page, "itt21-win11")).toBeFalsy();
    await page.locator("[data-w11-install]").click();
    await expect.poll(async () => getKey(page, "itt21-win11")).toBeTruthy();
    await assertOnlyItt21(page);
  });

  test("Flash Play SWF never writes; brick leftover writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/flash/index.html", "itt21-flash-brick");
    await page.locator("[data-flash-play]").click();
    expect(await getKey(page, "itt21-flash-brick")).toBeFalsy();
    await page.locator("[data-flash-brick]").click();
    await expect.poll(async () => getKey(page, "itt21-flash-brick")).toBeTruthy();
    expect(await getKey(page, "itt20-flash")).toBeFalsy();
    await assertOnlyItt21(page);
  });

  test("Chrome Edge trap never writes; keep habit writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/chrome/index.html", "itt21-chrome");
    await page.locator("[data-ch21-edge]").click();
    expect(await getKey(page, "itt21-chrome")).toBeFalsy();
    await page.locator("[data-ch21-keep]").click();
    expect(await getKey(page, "itt21-chrome")).toBeFalsy();
    await page.fill("[data-ch21-url]", "example.com");
    await page.locator("[data-ch21-keep]").click();
    await expect.poll(async () => getKey(page, "itt21-chrome")).toBeTruthy();
    await assertOnlyItt21(page);
  });

  test("Win10 mass trap never writes; residual writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/windows10/index.html", "itt21-win10");
    await page.locator("[data-w10-mass]").click();
    expect(await getKey(page, "itt21-win10")).toBeFalsy();
    await page.locator("[data-w10-save]").click();
    await expect.poll(async () => getKey(page, "itt21-win10")).toBeTruthy();
    await assertOnlyItt21(page);
  });

  test("first 3× YouTube / Wikipedia / Facebook write pop keys", async ({ page }) => {
    await completePop(page, "/years/2021/sites/youtube/index.html", "itt21-pop-youtube");
    await completePop(page, "/years/2021/sites/wikipedia/index.html", "itt21-pop-wikipedia");
    await completePop(page, "/years/2021/sites/facebook/index.html", "itt21-pop-facebook");
  });

  test("third 3× Clubhouse / NFT / Squid write pop3 keys", async ({ page }) => {
    await completePop(page, "/years/2021/sites/clubhouse/index.html", "itt21-pop3-clubhouse");
    await completePop(page, "/years/2021/sites/nft/index.html", "itt21-pop3-nft");
    await completePop(page, "/years/2021/sites/squid/index.html", "itt21-pop3-squid");
  });

  test("Five Letter empty never writes; guess writes", async ({ page }) => {
    await openClean(page, "/years/2021/sites/playable/game.html", "itt21-game-five");
    await page.locator("[data-five-guess]").click();
    expect(await getKey(page, "itt21-game-five")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.locator("[data-five-guess]").click();
    expect(await getKey(page, "itt21-game-five")).toBeFalsy();
    await page.fill("[data-five-field]", "track");
    await page.locator("[data-five-guess]").click();
    await expect.poll(async () => getKey(page, "itt21-game-five")).toBeTruthy();
    const blob = await blobOf(page, "itt21-game-five");
    expect(blob.real).toBe(true);
    expect(blob.users).toBe(90);
    await assertOnlyItt21(page);
  });

  test("home chip ATT · guided 6 · leftover trios unique", async ({ page }) => {
    await page.goto("/years/2021/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2021"]')).toHaveAttribute("href", /att/);
    await expect(page.locator("#ott-guided-2021 ol > li")).toHaveCount(6);
    const more = page.locator('[data-itt-pop-more="2021"] a[href*="sites/"]');
    const third = page.locator('[data-itt-pop-3x3="2021"] a[href*="sites/"]');
    const first = page.locator('[data-itt-pop3x="2021"] a[href*="sites/"]');
    await expect(first).toHaveCount(3);
    await expect(more).toHaveCount(3);
    await expect(third).toHaveCount(3);
  });
});
