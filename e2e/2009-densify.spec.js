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
  expect(await getKey(page, "itt09-like"), "star after leftover").toBeFalsy();
}

test.describe("2009 leftover densify", () => {
  test("About dual-cite + bans", async ({ page }) => {
    await page.goto("/years/2009/pages/about.html");
    await expect(page.locator("body")).toContainText("238,027,855");
    await expect(page.locator("body")).toContainText(/234 million|234M/i);
    await expect(page.locator("body")).toContainText("iPad");
    await expect(page.locator("body")).toContainText("Instagram");
  });
  test("guided stays exactly 6", async ({ page }) => {
    await page.goto("/years/2009/pages/home.html");
    await expect(page.locator("#ott-guided-2009 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2009"]')).toBeVisible();
  });
  test("star trap + empty never write; complete writes itt09-like", async ({ page }) => {
    await page.goto("/years/2009/sites/facebook/index.html");
    await page.evaluate(() => localStorage.removeItem("itt09-like"));
    await page.reload();
    await page.locator("[data-lk09-beacon]").click();
    await page.locator("[data-lk09-like]").click();
    expect(await getKey(page, "itt09-like")).toBeFalsy();
    await page.locator('[data-lk09-page="news"]').click();
    await page.locator('[data-lk09-page="music"]').click();
    await page.locator("[data-lk09-like]").click();
    await expect.poll(() => getKey(page, "itt09-like")).toBeTruthy();
  });
  test("FarmVille leftover incomplete never writes then save", async ({ page }) => {
    await officialVerbLeftover(page, "/years/2009/sites/farmville/index.html", "itt09-farm");
  });
  test("Bing leftover incomplete never writes then save", async ({ page }) => {
    await officialVerbLeftover(page, "/years/2009/sites/bing/index.html", "itt09-bing");
  });
});
