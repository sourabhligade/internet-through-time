// @ts-check
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt06-tweets");
    localStorage.removeItem("itt05-yt-uploads");
    localStorage.removeItem("itt07-iphone");
    localStorage.removeItem("itt01-wiki");
  }, key);
  await page.reload();
}

async function completeLo(page, key) {
  await revealLeftoverRails(page);
  const suf = key.replace(/^itt06-/, "");
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suf}"])`).first();
  await lo.locator("[data-lo-trap]").click({ force: true });
  expect(await getKey(page, key)).toBeFalsy();
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, key)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const needPick = await lo.locator("[data-lo-save]").getAttribute("data-lo-need-pick");
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (needPick) {
    await lo.locator(`[data-lo-pick="${needPick}"]`).click({ force: true });
  } else if (nPick) {
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await picks.nth(i).click({ force: true });
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await lo.locator("[data-lo-save]").click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt06-tweets")).toBeFalsy();
}

test.describe("2006 official 10 · dest machines", () => {
  test("1 Twttr empty / trap never write · ticks + update writes", async ({ page }) => {
    await openClear(page, "/years/2006/sites/twitter/index.html", "itt06-tweets");
    await page.locator("[data-tw06-post]").click();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    await page.locator("[data-tw06-trap]").first().click();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    await page.fill("[data-tw06-body]", "just setting up my twttr residual");
    const reqs = page.locator("[data-tw06-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-tw06-post]").click();
    await expect.poll(() => getKey(page, "itt06-tweets"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  });
  test("2 News Feed hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/facebook/feed.html", "itt06-feed-lx");
    await completeLo(page, "itt06-feed-lx");
  });
  test("3 Facebook open hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/facebook/open.html", "itt06-fb-open");
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt06-fb-open")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-fb-open")).toBeFalsy();
    await page.locator("[data-official-need]").fill("you@example.com");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-fb-open"), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await getKey(page, "itt06-fb-open")) || "{}");
    expect(blob.official).toBe(true);
    expect(blob.year).toBe("2006");
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
  });
  test("4 YouTube Google-owned leftover", async ({ page }) => {
    await openClear(page, "/years/2006/sites/youtube/index.html", "itt06-yt-lx");
    await completeLo(page, "itt06-yt-lx");
  });
  test("5 Google Docs leftover", async ({ page }) => {
    await openClear(page, "/years/2006/sites/googledocs/index.html", "itt06-gdocs");
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt06-gdocs")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-gdocs")).toBeFalsy();
    await page.locator("[data-official-need]").fill("Untitled document");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-gdocs"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt06-gdocs")) || "{}").official).toBe(true);
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
  });
  test("6 S3 checks", async ({ page }) => {
    await openClear(page, "/years/2006/sites/aws/index.html", "itt06-s3");
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-s3")).toBeFalsy();
    await page.locator("[data-official-need]").fill("museum-bucket");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-s3"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt06-s3")) || "{}").official).toBe(true);
  });
  test("7 IE7 hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/ie7/index.html", "itt06-ie7");
    await page.locator("[data-official-trap]").first().click();
    expect(await getKey(page, "itt06-ie7")).toBeFalsy();
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-ie7")).toBeFalsy();
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-ie7"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt06-ie7")) || "{}").official).toBe(true);
  });
  test("8 Wiki millionth", async ({ page }) => {
    await openClear(page, "/years/2006/sites/wikipedia/millionth.html", "itt06-wiki-1m");
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-wiki-1m")).toBeFalsy();
    await page.locator("[data-official-need]").fill("Jordanhill");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-wiki-1m"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt06-wiki-1m")) || "{}").official).toBe(true);
    expect(await getKey(page, "itt01-wiki")).toBeFalsy();
  });
  test("9 Roblox hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/roblox/index.html", "itt06-roblox");
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-roblox")).toBeFalsy();
    await page.locator("[data-official-need]").fill("Crossroads");
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-roblox"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt06-roblox")) || "{}").official).toBe(true);
  });
  test("10 Line Rider hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/playable/linerider.html", "itt06-game-linerider");
    await page.locator("[data-official-verb]").click();
    expect(await getKey(page, "itt06-game-linerider")).toBeFalsy();
    const reqs = page.locator("[data-official-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("[data-official-verb]").click();
    await expect.poll(() => getKey(page, "itt06-game-linerider"), { timeout: 8000 }).toBeTruthy();
    expect(JSON.parse((await getKey(page, "itt06-game-linerider")) || "{}").official).toBe(true);
  });
  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/2006/pages/home.html");
    await expect(page.locator("#ott-guided-2006 ol li")).toHaveCount(6);
  });
});
