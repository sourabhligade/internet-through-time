// @ts-check
const { test, expect } = require("@playwright/test");

const SHIP = [];
for (let y = 1994; y <= 2020; y++) {
  if (y === 2014) continue;
  SHIP.push(String(y));
}

async function tickAllReqs(page) {
  const reqs = page.locator("[data-pop-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
}

async function leftoverSave(page, year, slug, key) {
  await page.goto(`/years/${year}/sites/${slug}/index.html`);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  const go = page.locator(`[data-pop-go][data-pop-key='pop3-${slug}']`).first();
  await go.click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
  await page.locator("[data-pop-pick]").first().click();
  await tickAllReqs(page);
  const field = page.locator("[data-pop-field]").last();
  const ph = (await field.getAttribute("placeholder")) || "museum";
  await field.fill(ph);
  await go.click();
  await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key)).toBeTruthy();
}

test.describe("third leftover 3× — every shipped year", () => {
  for (const year of SHIP) {
    test(`${year} home lists 3 third-trio leftover doors`, async ({ page }) => {
      await page.goto(`/years/${year}/pages/home.html`);
      const strip = page.locator(`[data-itt-pop-3x3="${year}"]`);
      await expect(strip).toBeVisible();
      await expect(strip.locator("a[href*='sites/']")).toHaveCount(3);
      await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
      const star = page.locator(`[data-ott-one-thing="${year}"]`);
      await expect(star).toBeVisible();
      const starHref = await star.getAttribute("href");
      const hrefs = await strip.locator("a[href*='sites/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
      expect(hrefs.some((h) => starHref && h && starHref.includes(h.replace("../", "")))).toBeFalsy();
    });
  }
});

test.describe("third leftover 3× writers — sample years", () => {
  test("1994 lycos empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "1994", "lycos", "itt94-pop3-lycos");
  });
  test("2005 myspace empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2005", "myspace", "itt05-pop3-myspace");
  });
  test("2007 justin empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2007", "justin", "itt07-pop3-justin");
  });
  test("2009 mafiawars empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2009", "mafiawars", "itt09-pop3-mafiawars");
  });
  test("2010 chrome empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2010", "chrome", "itt10-pop3-chrome");
  });
  test("2011 snapchat empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2011", "snapchat", "itt11-pop3-snapchat");
  });
  test("2012 reddit empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2012", "reddit", "itt12-pop3-reddit");
  });
  test("2013 reddit empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2013", "reddit", "itt13-pop3-reddit");
  });
  test("2018 tiktok empty never writes then leftover save", async ({ page }) => {
    await leftoverSave(page, "2018", "tiktok", "itt18-pop3-tiktok");
  });
});

test.describe("third leftover 3× costume rooms", () => {
  test("2007 justin trap never writes and named picks exist", async ({ page }) => {
    await page.goto("/years/2007/sites/justin/index.html");
    await page.evaluate(() => localStorage.removeItem("itt07-pop3-justin"));
    await page.reload();
    await expect(page.locator("[data-pop3-costume]")).toBeVisible();
    await expect(page.locator("[data-pop-pick]")).toHaveCount(3);
    await page.locator("[data-jtv07-trap]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt07-pop3-justin"))).toBeFalsy();
    await expect(page.locator("[data-pop-status]")).toContainText(/never writes/i);
  });
  test("2009 ubercab trap never writes", async ({ page }) => {
    await page.goto("/years/2009/sites/ubercab/index.html");
    await page.evaluate(() => localStorage.removeItem("itt09-pop3-ubercab"));
    await page.reload();
    await page.locator("[data-ub09-trap]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt09-pop3-ubercab"))).toBeFalsy();
  });
  test("2011 snapchat story trap never writes", async ({ page }) => {
    await page.goto("/years/2011/sites/snapchat/index.html");
    await page.evaluate(() => localStorage.removeItem("itt11-pop3-snapchat"));
    await page.reload();
    await page.locator("[data-sc11-trap]").click();
    expect(await page.evaluate(() => localStorage.getItem("itt11-pop3-snapchat"))).toBeFalsy();
  });
});
