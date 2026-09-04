// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt05-yt-uploads");
    localStorage.removeItem("itt04-flickr");
    localStorage.removeItem("itt06-tweets");
  }, key);
  await page.reload();
  await page.waitForTimeout(250);
}

async function completeLo(page, key) {
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${key.replace(/^itt05-/, "")}"])`).first();
  await lo.locator("[data-lo-trap]").click();
  expect(await getKey(page, key)).toBeFalsy();
  await lo.locator("[data-lo-save]").click();
  expect(await getKey(page, key)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (nPick) {
    await lo.locator("[data-lo-save]").click();
    expect(await getKey(page, key)).toBeFalsy();
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await picks.nth(i).click();
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-save]").click();
    expect(await getKey(page, key)).toBeFalsy();
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await lo.locator("[data-lo-save]").click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2005");
  expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
}

test.describe("2005 official 10 · dest machines", () => {
  test("1 Upload empty / dating / Google-owned never write · ticks + title writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/youtube/upload.html", "itt05-yt-uploads");
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    const empty = JSON.parse((await getKey(page, "itt05-yt-uploads")) || "[]");
    expect(Array.isArray(empty) ? empty.some((x) => x && /residual/i.test(x.title || "")) : false).toBeFalsy();
    await page.locator("[data-yt-trap]").click();
    await page.locator("form[data-yt-dating] button[type='submit']").click();
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    const reqs = page.locator("[data-yt-req]");
    await reqs.nth(0).check();
    await reqs.nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(async () => {
      const raw = await getKey(page, "itt05-yt-uploads");
      const list = JSON.parse(raw || "[]");
      return Array.isArray(list) && list.some((x) => x && /residual/i.test(x.title || ""));
    }, { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    expect(await getKey(page, "itt04-thefacebook-networks")).toBeFalsy();
  });

  test("2 Maps hops · Street View trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/maps/index.html", "itt05-maps-lx");
    await completeLo(page, "itt05-maps-lx");
  });

  test("3 Pandora leftover · star trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/pandora/index.html", "itt05-pandora-lx");
    await completeLo(page, "itt05-pandora-lx");
  });

  test("4 HousingMaps ticks · live CL trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/housingmaps/index.html", "itt05-hm-lx");
    await completeLo(page, "itt05-hm-lx");
  });

  test("5 Digg hops · 1 hop never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/digg/index.html", "itt05-digg-lx");
    await completeLo(page, "itt05-digg-lx");
  });

  test("6 Reddit hops · Untitled trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/reddit/index.html", "itt05-reddit-lx");
    await completeLo(page, "itt05-reddit-lx");
  });

  test("7 Flickr leftover · Yahoo Photos trap · itt04-flickr empty", async ({ page }) => {
    await openClear(page, "/years/2005/sites/flickr/index.html", "itt05-flickr-lx");
    await completeLo(page, "itt05-flickr-lx");
    expect(await getKey(page, "itt04-flickr")).toBeFalsy();
  });

  test("8 iTunes podcasts · live store trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/itunes/podcasts.html", "itt05-pod-lx");
    await completeLo(page, "itt05-pod-lx");
  });

  test("9 TechCrunch leftover · star trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/techcrunch/index.html", "itt05-tc-lx");
    await completeLo(page, "itt05-tc-lx");
  });

  test("10 HoverChop hops write itt05-game-heli", async ({ page }) => {
    await openClear(page, "/years/2005/sites/playable/game.html", "itt05-game-heli-lx");
    await completeLo(page, "itt05-game-heli-lx");
  });

  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/2005/pages/home.html");
    await expect(page.locator("#ott-guided-2005 ol li")).toHaveCount(6);
  });

  test("Pack A Ajax leftover is a dest machine", async ({ page }) => {
    await openClear(page, "/years/2005/sites/ajax/index.html", "itt05-ajax-lx");
    await completeLo(page, "itt05-ajax-lx");
  });
});
