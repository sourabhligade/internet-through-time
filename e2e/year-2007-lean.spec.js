// @ts-check
/**
 * 2007 lean door — official 10 period machines.
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
    localStorage.removeItem("itt07-iphone");
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

test("2007 dests 200 · home guided 6", async ({ page }) => {
  const paths = [
    "/years/2007/pages/home.html",
    "/years/2007/pages/about.html",
    "/years/2007/pages/map.html",
    "/years/2007/sites/iphone/index.html",
    "/years/2007/sites/gmail/index.html",
    "/years/2007/sites/maps/index.html",
    "/years/2007/sites/facebook/index.html",
    "/years/2007/sites/twitter/index.html",
    "/years/2007/sites/youtube/index.html",
    "/years/2007/sites/myspace/index.html",
    "/years/2007/sites/digg/index.html",
    "/years/2007/sites/vista/index.html",
    "/years/2007/sites/playable/game.html"
  ];
  for (const p of paths) {
    const res = await page.goto(p);
    expect(res && res.status(), p).toBeLessThan(400);
  }
  await page.goto("/years/2007/pages/home.html");
  await expect(page.locator('[data-ott-one-thing="2007"]')).toBeVisible();
  await expect(page.locator("#ott-guided-2007 ol > li")).toHaveCount(6);
});

test("1 iPhone Safari · App Store never writes · capacity + Use Safari writes", async ({ page }) => {
  await openClear(page, "/years/2007/sites/iphone/index.html", "itt07-iphone");
  await page.locator("[data-ip07-safari]").click();
  expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  await page.locator("[data-ip07-store]").click();
  expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  await page.locator("[data-ip07-req]").nth(0).check();
  await page.locator("[data-ip07-req]").nth(1).check();
  await page.locator('[data-ip07-cap][value="8"]').check();
  await page.locator("[data-ip07-safari]").click();
  await expect.poll(() => getKey(page, "itt07-iphone"), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, "itt07-iphone")) || "{}");
  expect(blob.real).toBe(true);
  expect(blob.safari).toBe(true);
  expect(blob.appStore).toBe(false);
  expect(String(blob.year)).toBe("2007");
  await expectNext(page, "itt07-iphone", "gmail/index.html");
});

test("2 Gmail open · invite never writes · handle writes · star empty", async ({ page }) => {
  await openClear(page, "/years/2007/sites/gmail/index.html", "itt07-gmail");
  await page.locator("[data-gm07-invite]").click();
  expect(await getKey(page, "itt07-gmail")).toBeFalsy();
  await page.locator("[data-gm07-req]").nth(0).check();
  await page.locator("[data-gm07-req]").nth(1).check();
  await page.fill("[data-gm07-handle]", "museum");
  await page.locator("[data-gm07-open]").click();
  await expect.poll(() => getKey(page, "itt07-gmail"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  await expectNext(page, "itt07-gmail", "maps/index.html");
});

test("3 Street View · one city never writes · two cities write", async ({ page }) => {
  await openClear(page, "/years/2007/sites/maps/index.html", "itt07-streetview");
  await page.locator('[data-sv07-city="sf"]').click();
  await page.locator("[data-sv07-peg]").click();
  expect(await getKey(page, "itt07-streetview")).toBeFalsy();
  await page.locator('[data-sv07-city="nyc"]').click();
  await page.locator("[data-sv07-peg]").click();
  await expect.poll(() => getKey(page, "itt07-streetview"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  await expectNext(page, "itt07-streetview", "facebook/index.html");
});

test("4 Platform · Beacon never writes · two apps write", async ({ page }) => {
  await openClear(page, "/years/2007/sites/facebook/index.html", "itt07-fb-platform");
  await page.locator("[data-fb07-beacon]").click();
  expect(await getKey(page, "itt07-fb-platform")).toBeFalsy();
  await page.locator('[data-fb07-app="poke"]').click();
  await page.locator('[data-fb07-app="quiz"]').click();
  await page.locator("[data-fb07-add]").click();
  await expect.poll(() => getKey(page, "itt07-fb-platform"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  await expectNext(page, "itt07-fb-platform", "twitter/index.html");
});

test("5–10 leftovers write own keys · star empty", async ({ page }) => {
  await page.goto("/years/2007/sites/twitter/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt07-tweets");
    localStorage.removeItem("itt07-iphone");
  });
  await page.reload();
  await page.locator("[data-tw07-req]").check();
  await page.fill("[data-tw07-body]", "just setting up my twttr leftover");
  await page.locator("[data-tw07-post]").click();
  await expect.poll(() => getKey(page, "itt07-tweets"), { timeout: 8000 }).toBeTruthy();

  const leftover = [
    ["/years/2007/sites/youtube/index.html", "yt07", "itt07-yt"],
    ["/years/2007/sites/myspace/index.html", "ms07", "itt07-myspace"],
    ["/years/2007/sites/digg/index.html", "dg07", "itt07-digg"],
    ["/years/2007/sites/vista/index.html", "vi07", "itt07-vista"]
  ];
  for (const [path, pfx, key] of leftover) {
    await page.goto(path);
    await page.evaluate((k) => localStorage.removeItem(k), key);
    await page.reload();
    await page.locator(`[data-${pfx}-trap]`).click();
    expect(await getKey(page, key), key + " trap").toBeFalsy();
    await page.locator(`[data-${pfx}-req]`).check();
    await page.locator(`[data-${pfx}-go]`).click();
    await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  }

  await page.goto("/years/2007/sites/playable/game.html");
  await page.evaluate(() => localStorage.removeItem("itt07-game-peg"));
  await page.reload();
  await page.locator("[data-peg-trap]").click();
  expect(await getKey(page, "itt07-game-peg")).toBeFalsy();
  await page.locator("[data-game-start]").click();
  await page.locator('[data-peg-city="a"]').click();
  expect(await getKey(page, "itt07-game-peg")).toBeFalsy();
  await page.locator('[data-peg-city="b"]').click();
  await expect.poll(() => getKey(page, "itt07-game-peg"), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt07-iphone")).toBeFalsy();
});
