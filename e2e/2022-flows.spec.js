// @ts-check
/**
 * Every 2022 writer: trap / empty / 0–1 tick never writes; complete writes itt22-* only.
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

async function assertOnlyItt22(page) {
  const leaked = await page.evaluate(() =>
    Object.keys(localStorage).filter((k) => /^itt(21|23)-/.test(k))
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
  await page.locator("[data-pop-go]").first().click();
  expect(await getKey(page, key)).toBeFalsy();
  await page.locator("[data-pop-pick]").first().click();
  const reqs = page.locator("[data-pop-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const field = page.locator("[data-pop-field]").first();
  const ph = (await field.getAttribute("placeholder")) || "museum leftover";
  await field.fill(ph.length >= 2 ? ph : "museum leftover");
  await page.locator("[data-pop-go]").first().click();
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = await blobOf(page, key);
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2022");
  await assertOnlyItt22(page);
}

test.describe("2022 leftover flows", () => {
  test("Twitter X trap never writes; ticks + note write", async ({ page }) => {
    await openClean(page, "/years/2022/sites/twitter/index.html", "itt22-twitter");
    await page.locator("[data-tw22-x]").click();
    expect(await getKey(page, "itt22-twitter")).toBeFalsy();
    await page.locator("[data-tw22-go]").click();
    expect(await getKey(page, "itt22-twitter")).toBeFalsy();
    await page.fill("[data-tw22-note]", "bird");
    await page.locator("[data-tw22-go]").click();
    await expect.poll(async () => getKey(page, "itt22-twitter")).toBeTruthy();
    const blob = await blobOf(page, "itt22-twitter");
    expect(blob.real).toBe(true);
    expect(blob.stillTwitter).toBe(true);
    await assertOnlyItt22(page);
  });

  test("Wordle paywall trap never writes; leftover writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/wordle/index.html", "itt22-wordle");
    await page.locator("[data-wd22-paywall]").click();
    expect(await getKey(page, "itt22-wordle")).toBeFalsy();
    await page.fill("[data-wd22-guess]", "times");
    await page.locator("[data-wd22-go]").click();
    await expect.poll(async () => getKey(page, "itt22-wordle")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("SD adult / weights traps never write; generate leftover writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/stablediffusion/index.html", "itt22-sd");
    await page.locator("[data-sd22-adult]").click();
    expect(await getKey(page, "itt22-sd")).toBeFalsy();
    await page.locator("[data-sd22-weights]").click();
    expect(await getKey(page, "itt22-sd")).toBeFalsy();
    await page.fill("[data-sd22-prompt]", "astronaut leftover");
    await page.locator("[data-sd22-go]").click();
    await expect.poll(async () => getKey(page, "itt22-sd")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("Mastodon X trap never writes; instance writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/mastodon/index.html", "itt22-mastodon");
    await page.locator("[data-md22-x]").click();
    expect(await getKey(page, "itt22-mastodon")).toBeFalsy();
    await page.fill("[data-md22-instance]", "mastodon.social");
    await page.locator("[data-md22-go]").click();
    await expect.poll(async () => getKey(page, "itt22-mastodon")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("BeReal filter trap never writes; leftover writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/bereal/index.html", "itt22-bereal");
    await page.locator("[data-br22-filter]").click();
    expect(await getKey(page, "itt22-bereal")).toBeFalsy();
    await page.locator("[data-br22-go]").click();
    await expect.poll(async () => getKey(page, "itt22-bereal")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("DALL·E 3 trap never writes; preview leftover writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/dalle2/index.html", "itt22-dalle2");
    await page.locator("[data-dl22-dalle3]").click();
    expect(await getKey(page, "itt22-dalle2")).toBeFalsy();
    await page.fill("[data-dl22-desc]", "astronaut leftover");
    await page.locator("[data-dl22-go]").click();
    await expect.poll(async () => getKey(page, "itt22-dalle2")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("Chrome google.com trap never writes; habit writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/chrome/index.html", "itt22-chrome");
    await page.locator("[data-ch22-google]").click();
    expect(await getKey(page, "itt22-chrome")).toBeFalsy();
    await page.fill("[data-ch22-url]", "example.com");
    await page.locator("[data-ch22-keep]").click();
    await expect.poll(async () => getKey(page, "itt22-chrome")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("Win10 January-desktop trap never writes; residual writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/windows10/index.html", "itt22-win10");
    await page.locator("[data-w10-mass]").click();
    expect(await getKey(page, "itt22-win10")).toBeFalsy();
    await page.locator("[data-w10-save]").click();
    await expect.poll(async () => getKey(page, "itt22-win10")).toBeTruthy();
    await assertOnlyItt22(page);
  });

  test("first 3× YouTube / Wikipedia / Facebook write pop keys", async ({ page }) => {
    await completePop(page, "/years/2022/sites/youtube/index.html", "itt22-pop-youtube");
    await completePop(page, "/years/2022/sites/wikipedia/index.html", "itt22-pop-wikipedia");
    await completePop(page, "/years/2022/sites/facebook/index.html", "itt22-pop-facebook");
  });

  test("third 3× TikTok / Midjourney / Lensa write pop3 keys", async ({ page }) => {
    await completePop(page, "/years/2022/sites/tiktok/index.html", "itt22-pop3-tiktok");
    await completePop(page, "/years/2022/sites/midjourney/index.html", "itt22-pop3-midjourney");
    await completePop(page, "/years/2022/sites/lensa/index.html", "itt22-pop3-lensa");
  });

  test("Prompt Box empty never writes; send writes", async ({ page }) => {
    await openClean(page, "/years/2022/sites/playable/game.html", "itt22-game-prompt");
    await page.locator("[data-prompt-go]").click();
    expect(await getKey(page, "itt22-game-prompt")).toBeFalsy();
    await page.locator("[data-game-start]").click();
    await page.locator("[data-prompt-go]").click();
    expect(await getKey(page, "itt22-game-prompt")).toBeFalsy();
    await page.locator("[data-prompt-req]").nth(0).check();
    await page.locator("[data-prompt-req]").nth(1).check();
    await page.fill("[data-prompt-field]", "explain leftover");
    await page.locator("[data-prompt-go]").click();
    await expect.poll(async () => getKey(page, "itt22-game-prompt")).toBeTruthy();
    const blob = await blobOf(page, "itt22-game-prompt");
    expect(blob.real).toBe(true);
    expect(blob.theater).toBe(true);
    await assertOnlyItt22(page);
  });

  test("home chip ChatGPT · guided 6 · leftover trios unique", async ({ page }) => {
    await page.goto("/years/2022/pages/home.html");
    await expect(page.locator('[data-ott-one-thing="2022"]')).toHaveAttribute("href", /chatgpt/);
    await expect(page.locator("#ott-guided-2022 ol > li")).toHaveCount(6);
    const more = page.locator('[data-itt-pop-more="2022"] a[href*="sites/"]');
    const third = page.locator('[data-itt-pop-3x3="2022"] a[href*="sites/"]');
    const first = page.locator('[data-itt-pop3x="2022"] a[href*="sites/"]');
    await expect(first).toHaveCount(3);
    await expect(more).toHaveCount(3);
    await expect(third).toHaveCount(3);
  });
});
