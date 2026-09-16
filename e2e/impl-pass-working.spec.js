// @ts-check
/**
 * Working probe of the implement pass — leftover-trail writers, dest-true official,
 * 2011 extras, 2022 dest-first, 2019 one-key, year-lock chrome.
 */
const { test, expect } = require("@playwright/test");
const { destOnDisk } = require("./helpers");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function leftoverComplete(page, href, suffix, star) {
  const year = (href.match(/\/years\/(\d{4})\//) || [])[1] || "";
  const key = "itt" + year.slice(2) + "-" + suffix;
  await page.goto(href);
  await page.evaluate((ks) => ks.forEach((k) => localStorage.removeItem(k)), [key, star]);
  await page.reload();
  const save = page.locator(`[data-lo-save][data-lo-key="${suffix}"]`).first();
  await expect(save, href + " leftover save").toBeVisible();
  await save.click();
  expect(await getKey(page, key), key + " empty").toBeFalsy();
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  const reqs = panel.locator("[data-lo-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const keep = panel.locator('[data-lo-pick="keep"]');
  if ((await keep.count()) > 0) await keep.click();
  const field = panel.locator("[data-lo-field]").first();
  if ((await field.count()) > 0) await field.fill("museum leftover");
  await save.click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, star), star + " after leftover").toBeFalsy();
}

const FOREST = [
  { href: "/years/1994/sites/cnn/index.html", suffix: "cnn-dp", star: "itt94-csotd" },
  { href: "/years/1998/sites/cnn/index.html", suffix: "cnn-lx", star: "itt98-lucky" },
  { href: "/years/2000/sites/yahoo/index.html", suffix: "yahoo", star: "itt00-mapquest" },
  { href: "/years/2003/sites/yahoo/index.html", suffix: "yahoo", star: "itt03-photobucket" },
  { href: "/years/2006/sites/google/index.html", suffix: "google-q", star: "itt06-tweets" },
  { href: "/years/2008/sites/google/index.html", suffix: "google-rlx", star: "itt08-github" },
];

for (const row of FOREST) {
  test(`leftover-trail ${row.href} empty never writes · complete leftover only`, async ({ page }) => {
    test.skip(!destOnDisk(row.href), "missing dest");
    await leftoverComplete(page, row.href, row.suffix, row.star);
  });
}

test("2019 reddit leftover is one key · empty never writes · complete leftover only", async ({ page }) => {
  await leftoverComplete(page, "/years/2019/sites/reddit/index.html", "reddit-lx", "itt19-disneyplus");
  expect(await getKey(page, "itt19-reddit-d2")).toBeFalsy();
});

test("2002 KaZaA dest-true official empty never writes · complete writes itt02-kazaa", async ({ page }) => {
  await page.goto("/years/2002/sites/kazaa/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt02-kazaa");
    localStorage.removeItem("itt02-stumble");
  });
  await page.reload();
  const verb = page.locator("[data-official-verb]").first();
  await expect(verb).toBeVisible();
  await verb.click();
  expect(await getKey(page, "itt02-kazaa")).toBeFalsy();
  const reqs = page.locator("[data-official-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-official-need]").fill("song title");
  await verb.click();
  await expect.poll(() => getKey(page, "itt02-kazaa")).toBeTruthy();
  expect(await getKey(page, "itt02-stumble")).toBeFalsy();
});

test("2011 Spotify extras attach · SKU+ticks write itt11-spotify · stream trap never", async ({ page }) => {
  await page.goto("/years/2011/sites/spotify/index.html");
  await page.evaluate(() => {
    localStorage.removeItem("itt11-spotify");
    localStorage.removeItem("itt11-gplus");
  });
  await page.reload();
  await page.locator("[data-sp11-invite]").click();
  expect(await getKey(page, "itt11-spotify")).toBeFalsy();
  await page.locator("[data-sp11-stream]").first().click();
  expect(await getKey(page, "itt11-spotify")).toBeFalsy();
  await page.locator('[data-sp11-sku="premium"]').click();
  const reqs = page.locator("[data-sp11-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  await page.locator("[data-official-need]").fill("Play leftover");
  await page.locator("[data-sp11-invite]").click();
  await expect.poll(() => getKey(page, "itt11-spotify")).toBeTruthy();
  expect(await getKey(page, "itt11-gplus")).toBeFalsy();
});


test("2005 Starting Point title is 2005 not 2004", async ({ page }) => {
  await page.goto("/years/2005/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2005");
  const frame = page.frameLocator("#content");
  await expect(frame.locator("body")).toContainText(/2005|YouTube|Upload/i);
});

test("2006 dirbar names Twttr", async ({ page }) => {
  await page.goto("/years/2006/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2006");
  await expect(page.locator("body")).toContainText(/Twttr|Twitter/i);
});

test("2008 shell is IE7 + XP", async ({ page }) => {
  await page.goto("/years/2008/");
  const skip = page.locator("#skip-connect");
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await expect(page.locator("body")).toHaveAttribute("data-itt-year", "2008");
  await expect(page.locator("body")).toHaveClass(/browser-ie7/);
  await expect(page.locator("body")).toHaveClass(/os-winxp/);
});
