// @ts-check
/**
 * 1995 leftover densify — leftover-3× first dest-true (pack-shape).
 * Official 10 already dest-minute’d in all-years-official-10-real.
 */
const { test, expect } = require("@playwright/test");
const { revealLeftoverRails } = require("./helpers");

async function getKey(page, k) {
  return page.evaluate((key) => window.localStorage.getItem(key), k);
}

async function leftover3xFirst(page, href, id, key, star, ph) {
  await page.goto(href);
  await page.evaluate(({ k, s }) => {
    localStorage.removeItem(k);
    localStorage.removeItem(s);
  }, { k: key, s: star });
  await page.reload();
  await revealLeftoverRails(page);
  const panel = page.locator(`[data-itt-lo3x][data-pop-panel]:has([data-pop-go][data-pop-id="${id}"]:not([data-pop-key]))`).first();
  const go = panel.locator(`[data-pop-go][data-pop-id="${id}"]`);
  await expect(go).toBeVisible();
  await go.click();
  expect(await getKey(page, key)).toBeFalsy();
  await panel.locator('[data-pop-pick="keep"]').click();
  const reqs = panel.locator("[data-pop-req]");
  for (let i = 0; i < (await reqs.count()); i++) await reqs.nth(i).check();
  await panel.locator("[data-pop-field]").fill(ph);
  await go.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star)).toBeFalsy();
}

test.describe("1995 leftover densify", () => {
  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/1995/pages/home.html");
    await expect(page.locator("#ott-guided-1995 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="1995"]')).toBeVisible();
  });

  test("home leftover 3× strips are unique doors", async ({ page }) => {
    await page.goto("/years/1995/pages/home.html");
    await revealLeftoverRails(page);
    await expect(page.locator("#ott-guided-1995 ol > li")).toHaveCount(6);
    await expect(page.locator('[data-itt-pop3x="1995"]').first().locator('a[href*="sites/"]')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-more="1995"]').first().locator('a[href*="sites/"]')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-3x3="1995"]').first().locator('a[href*="sites/"]')).toHaveCount(9);
  });

  test("first 3× ESPNet leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/1995/sites/espn/index.html", "espn", "itt95-pop-espn", "itt95-ssl-checkout", "Bulls");
  });

  test("first 3× c|net leftover REAL", async ({ page }) => {
    await leftover3xFirst(page, "/years/1995/sites/cnet/index.html", "cnet", "itt95-pop-cnet", "itt95-ssl-checkout", "news");
  });

  test("leftover incomplete never writes gold itt95-ssl-checkout", async ({ page }) => {
    await page.goto("/years/1995/sites/amazon/ssl-checkout.html");
    await page.evaluate((k) => localStorage.removeItem(k), "itt95-ssl-checkout");
    await revealLeftoverRails(page);
    const save = page.locator("[data-lo-save]").first();
    if (await save.count()) {
      await save.click({ force: true });
      const raw = await page.evaluate((k) => localStorage.getItem(k), "itt95-ssl-checkout");
      expect(raw).toBeFalsy();
    }
  });
});
