// @ts-check
/**
 * Second leftover trio (3 more) on every shipped year home.
 * 2016 / 2018 new rooms write ittYY-pop-* after pick + honesty + go.
 */
const { test, expect } = require("@playwright/test");

test.describe("3 more leftovers on home — every shipped year", () => {
  for (let y = 1994; y <= 2018; y++) {
    const year = String(y);
    test(`${year} home lists 3 more leftover doors`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      const strip = page.locator(`[data-itt-pop-more="${year}"]`);
      await expect(strip).toBeVisible();
      await expect(strip.locator("a[href*='sites/']")).toHaveCount(3);
    });
  }
});

async function completePop(page, key) {
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await page.locator("[data-pop-go]").click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  await page.locator("[data-pop-pick]").first().click();
  await page.locator("[data-pop-req]").check();
  const field = page.locator("[data-pop-field]");
  const ph = (await field.getAttribute("placeholder")) || "museum";
  await field.fill(ph);
  await page.locator("[data-pop-go]").click();
  await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 }).toBeTruthy();
}

test.describe("new leftover rooms write — sample years", () => {
  test("1994 Prodigy incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/1994/sites/prodigy/index.html");
    await completePop(page, "itt94-pop-prodigy");
  });

  test("2005 reddit front incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2005/sites/redditfront/index.html");
    await completePop(page, "itt05-pop-redditfront");
  });

  test("2017 Snap IPO incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2017/sites/snapipo/index.html");
    await completePop(page, "itt17-pop-snapipo");
  });

  test("2016 Slack incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2016/sites/slack/index.html");
    await page.evaluate(() => localStorage.removeItem("itt16-pop-slack"));
    await page.reload();
    await page.locator("[data-pop-go]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt16-pop-slack"))).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    await page.locator("[data-pop-req]").check();
    await page.locator("[data-pop-field]").fill("#general");
    await page.locator("[data-pop-go]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt16-pop-slack")), { timeout: 8000 })
      .toBeTruthy();
  });

  test("2018 Discord incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2018/sites/discord/index.html");
    await page.evaluate(() => localStorage.removeItem("itt18-pop-discord"));
    await page.reload();
    await page.locator("[data-pop-go]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt18-pop-discord"))).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    await page.locator("[data-pop-req]").check();
    await page.locator("[data-pop-field]").fill("#general");
    await page.locator("[data-pop-go]").click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem("itt18-pop-discord")), { timeout: 8000 })
      .toBeTruthy();
  });
});
