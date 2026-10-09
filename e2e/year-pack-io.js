// @ts-check
/**
 * Named year pack I/O — official dest trap never writes, complete writes envelope.
 * Not dest-true CI. Do not dest-farm.
 */
const { expect } = require("@playwright/test");
const { getKey, clickOfficialVerb } = require("./dest-true-io");

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} href
 * @param {string} key
 * @param {string} fill
 */
async function trapThenOfficial(page, href, key, fill) {
  await page.goto(href);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.reload();
  await expect(page.locator("[data-official-verb]").first()).toBeVisible({ timeout: 15000 });
  const trap = page.locator("[data-official-trap]").first();
  if (await trap.count()) await trap.click();
  expect(await getKey(page, key), key + " trap").toBeFalsy();
  await clickOfficialVerb(page, href);
  expect(await getKey(page, key), key + " empty").toBeFalsy();
  const reqs = page.locator("[data-official-req], [data-yt-req]");
  const n = await reqs.count();
  for (let i = 0; i < n; i++) await reqs.nth(i).check();
  const need = page.locator("[data-official-need]").first();
  if (await need.count()) await need.fill(fill || "leftover residual");
  const desc = page.locator("[name='desc']").first();
  if (await desc.count()) {
    const v = await desc.inputValue().catch(() => "");
    if (!String(v).trim()) await desc.fill("tag residual");
  }
  await clickOfficialVerb(page, href);
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real, key).toBe(true);
  expect(blob.v, key + " v").toBe(1);
  expect(blob.kind, key + " kind").toBe("official");
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {{ href: string, key: string, fill?: string }[]} dests
 */
async function everyOfficialDest(page, year, dests) {
  for (const d of dests) {
    await trapThenOfficial(page, `/years/${year}/${d.href}`, d.key, d.fill || "leftover residual");
  }
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {string[]} hrefs
 */
async function trailDestsLoad(page, year, hrefs) {
  for (const href of hrefs) {
    const res = await page.goto(`/years/${year}/${href}`);
    expect(res && res.ok(), href).toBeTruthy();
    await expect(page.locator("[data-official-verb], [data-game-start], [data-yt-upload]").first()).toBeVisible({
      timeout: 15000,
    });
  }
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {RegExp} chip
 */
async function densifyDoor(page, year, chip) {
  await page.goto(`/years/${year}/pages/home.html`);
  await expect(page.locator(`#ott-guided-${year} ol > li`)).toHaveCount(6);
  await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toBeVisible();
  await expect(page.locator(`[data-ott-one-thing="${year}"]`)).toHaveAttribute("href", chip);
  await expect(page.locator(`#ott-2x-${year}`)).toHaveCount(0);
}

module.exports = { trapThenOfficial, everyOfficialDest, trailDestsLoad, densifyDoor, getKey };
