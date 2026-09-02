// @ts-check
/**
 * Second leftover trio (3 more) on every shipped year home.
 * 2016 / 2018 new rooms write ittYY-pop-* after pick + honesty + go.
 */
const { test, expect } = require("@playwright/test");


const WIPED = new Set(["2025"]);

async function openAlsoYear(page, year) {
  const box = page.locator(`#itt-also-year-${year}`);
  if (await box.count()) {
    await box.locator("summary").first().click();
    await expect(box).toHaveAttribute("open", "");
  }
}

test.describe("3 more leftovers on home — every shipped year", () => {
  for (let y = 1994; y <= 2023; y++) {
    const year = String(y);
    if (WIPED.has(year)) continue;
    test(`${year} home lists 3 more leftover doors`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      await openAlsoYear(page, year);
      const strip = page.locator(`p.itt-pop-more[data-itt-pop-more="${year}"]`).first();
      test.skip(!(await strip.count()), year + " has no 3-door leftover strip");
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
  test("1994 Pizza Hut first 3× empty never writes · complete writes", async ({ page }) => {
    await page.goto("/years/1994/sites/pizzahut/index.html");
    await page.evaluate(() => localStorage.removeItem("itt94-pop-pizzahut"));
    await page.reload();
    await page.locator("[data-pop-go][data-pop-id='pizzahut']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt94-pop-pizzahut"))).toBeFalsy();
    await page.locator("[data-pop-field]").first().fill("pepperoni");
    await page.locator("[data-pop-go][data-pop-id='pizzahut']").click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("itt94-pop-pizzahut")), { timeout: 8000 })
      .toBeTruthy();
  });

  test("1994 Prodigy incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/1994/sites/prodigy/index.html");
    await completePop(page, "itt94-pop-prodigy");
  });

  test("2010 Dropbox leftover incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2010/sites/dropbox/index.html");
    const key = "itt10-pop4-dropbox";
    await page.evaluate((k) => localStorage.removeItem(k), key);
    await page.reload();
    await page.locator("[data-ytl-go]").click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
    await page.locator('[data-ytl-pick="trap"]').click();
    await page.locator("[data-ytl-go]").click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
    await page.locator('[data-ytl-pick="folder"]').click();
    await page.locator("[data-ytl-req]").check();
    await page.locator("[data-ytl-field]").fill("photos.zip");
    await page.locator("[data-ytl-go]").click();
    await expect.poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 }).toBeTruthy();
    const blob = JSON.parse((await page.evaluate((k) => localStorage.getItem(k), key)) || "{}");
    expect(blob.real).toBe(true);
    expect(blob.year).toBe("2010");
    expect(blob.verb).toMatch(/Sync/i);
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

  test("2010 Netflix first 3× incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2010/sites/netflix/index.html");
    await page.evaluate(() => localStorage.removeItem("itt10-pop-netflix"));
    await page.reload();
    await page.locator("[data-pop-go][data-pop-id='netflix']").click();
    expect(await page.evaluate(() => localStorage.getItem("itt10-pop-netflix"))).toBeFalsy();
    await page.locator("[data-pop-field]").first().fill("Lost");
    await page.locator("[data-pop-go][data-pop-id='netflix']").click();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("itt10-pop-netflix")), { timeout: 8000 })
      .toBeTruthy();
  });

  test("2013 Chrome second 3× incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2013/sites/chrome/index.html");
    await completePop(page, "itt13-pop-chrome");
  });

  test("2019 Apple TV+ second 3× incomplete never writes · complete writes", async ({ page }) => {
    await page.goto("/years/2019/sites/appletv/index.html");
    await completePop(page, "itt19-pop-appletv");
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
