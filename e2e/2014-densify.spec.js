// @ts-check
/**
 * 2014 leftover densify — first 3× + third 3× + leftover 6× strip.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

async function completePop(page, href, goId, key, star) {
  await page.goto(href);
  await page.evaluate(({ k, s }) => {
    localStorage.removeItem(k);
    localStorage.removeItem(s);
  }, { k: key, s: star });
  await page.reload();
  const panel = page.locator("[data-pop-panel]").first();
  await panel.locator("[data-pop-go]").click();
  expect(await getKey(page, key)).toBeFalsy();
  await panel.locator('[data-pop-pick="ok"]').click();
  await panel.locator("[data-pop-req]").check();
  await panel.locator("[data-pop-field]").fill("museum leftover");
  await panel.locator("[data-pop-go]").click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star)).toBeFalsy();
}

test.describe("2014 leftover densify", () => {
  test("guided stays 6 and leftover 6× strip sits below", async ({ page }) => {
    await page.goto("/years/2014/pages/home.html");
    await expect(page.locator("#ott-guided-2014 ol > li")).toHaveCount(6);
    await expect(page.locator("#ott-2x-2014-6x")).toBeAttached();
    await expect(page.locator("#ott-2x-2014-6x")).toContainText(/Oculus/);
  });

  test("first 3× Snapchat leftover REAL", async ({ page }) => {
    await completePop(page, "/years/2014/sites/snapchat/index.html", "snapchat", "itt14-pop-snapchat", "itt14-wa-install");
  });

  test("first 3× Instagram leftover REAL", async ({ page }) => {
    await completePop(page, "/years/2014/sites/instagram/index.html", "instagram", "itt14-pop-instagram", "itt14-wa-install");
  });

  test("first 3× Uber leftover REAL", async ({ page }) => {
    await completePop(page, "/years/2014/sites/uber/index.html", "uber", "itt14-pop-uber", "itt14-wa-install");
  });

  test("third 3× YouTube leftover REAL", async ({ page }) => {
    await completePop(page, "/years/2014/sites/youtube/index.html", "youtube", "itt14-pop3-youtube", "itt14-wa-install");
  });

  test("leftover 6× dests 200", async ({ page }) => {
    for (const slug of ["oculus", "ello", "serial", "musically14", "truecrypt", "echoinvite"]) {
      const res = await page.goto("/years/2014/sites/" + slug + "/index.html");
      expect(res && res.ok(), slug).toBeTruthy();
    }
  });
});
