// @ts-check
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

async function officialVerbLeftover(page, href, key) {
  await page.goto(href);
  await revealLeftoverRails(page);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await revealLeftoverRails(page);
  await page.locator("[data-official-trap]").first().click();
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await page.locator("[data-official-verb]").click();
  expect(await getKey(page, key), key + " empty").toBeFalsy();
  const need = page.locator("[data-official-need]");
  if ((await need.count()) > 0) await need.fill("leftover");
  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-official-verb]").click();
  await expect.poll(() => getKey(page, key)).toBeTruthy();
  expect(await getKey(page, "itt11-gplus"), "star after leftover").toBeFalsy();
}

test.describe("2011 flows", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2011/pages/about.html");
    await expect(page.locator("body")).toContainText("346,004,403");
    await expect(page.locator("body")).toContainText("555 million");
    await expect(page.locator("body")).toContainText("Android");
    await expect(page.locator("body")).toContainText("iPhone 4");
  });
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2011/pages/home.html");
    await expect(page.locator("#ott-guided-2011 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2011"]')).toBeVisible();
  });
  test("star trap + empty never write; complete writes itt11-gplus", async ({ page }) => {
    await page.goto("/years/2011/sites/googleplus/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-gplus"));
    await page.reload();
    await page.locator("[data-gp11-won]").click();
    await page.locator("[data-gp11-hangout]").click();
    expect(await getKey(page, "itt11-gplus")).toBeFalsy();
    await page.fill("[data-gp11-circle]", "Friends");
    await page.locator('[data-gp11-person="ada"]').click();
    await page.locator('[data-gp11-person="al"]').click();
    await page.locator("[data-gp11-hangout]").click();
    await expect.poll(() => getKey(page, "itt11-gplus")).toBeTruthy();
  });
  test("Spotify leftover incomplete never writes then save", async ({ page }) => {
    await officialVerbLeftover(page, "/years/2011/sites/spotify/index.html", "itt11-spotify");
  });
  test("YouTube leftover-official dest-true never writes star", async ({ page }) => {
    const { leftoverOfficialDest } = require("./helpers");
    await leftoverOfficialDest(page, "/years/2011/sites/youtube/index.html", "yt", "itt11-gplus");
  });
  test("Siri leftover incomplete never writes then save", async ({ page }) => {
    await officialVerbLeftover(page, "/years/2011/sites/iphone/index.html", "itt11-siri");
  });
});
