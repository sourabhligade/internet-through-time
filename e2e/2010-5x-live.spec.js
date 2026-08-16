// @ts-check
/**
 * 2010 5× F1–F5 — REAL incomplete-never-writes + Next chain to the Imgur star.
 * Keys stay itt10-ig-posts / itt10-ipad-history / itt10-4sq / itt10-fb-likes / itt10-wave-funeral.
 */
const { test, expect } = require('@playwright/test');
const { completeRealGate } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function expectKey(page, key, re) {
  await expect.poll(async () => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const raw = (await getKey(page, key)) || '';
  if (re) expect(raw).toMatch(re);
  return raw;
}

test.describe('2010 5× live F1–F5', () => {
  test('F1 Instagram no-filter blocked then REAL · Next iPad', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await clearKeys(page, ['itt10-ig-posts']);
    await page.reload();
    await page.locator('[data-ig-share]').click();
    await expect.poll(async () => getKey(page, 'itt10-ig-posts')).toBeFalsy();
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-share]').click();
    await expect.poll(async () => getKey(page, 'itt10-ig-posts')).toBeFalsy();
    await page.locator('[data-ig-caption]').fill('valencia 5x');
    await page.locator('[data-ig-share]').click();
    await expectKey(page, 'itt10-ig-posts', /Earlybird|valencia 5x/i);
    const next = page.locator('[data-itt10-next]');
    await expect(next).toBeVisible();
    await expect(next.locator('a[href*="ipad"]')).toHaveCount(1);
  });

  test('F2 iPad checks required then REAL · Next Foursquare', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/index.html');
    await clearKeys(page, ['itt10-ipad-history']);
    await page.reload();
    await page.locator('[data-ipad-claim]').click();
    await expect.poll(async () => getKey(page, 'itt10-ipad-history')).toBeFalsy();
    await page.locator('[data-ipad-date]').check();
    await page.locator('[data-ipad-not-os]').check();
    await page.locator('[data-ipad-claim]').click();
    await expectKey(page, 'itt10-ipad-history', /499|iPad|real/i);
    await expect(page.locator('[data-itt10-next] a[href*="foursquare"]').first()).toBeVisible();
  });

  test('F3 Foursquare two-step then REAL · Next CNN', async ({ page }) => {
    await page.goto('/years/2010/sites/foursquare/index.html');
    await clearKeys(page, ['itt10-4sq']);
    await page.reload();
    await completeRealGate(page, '[data-4sq-checkin="Coffee House"]');
    await expectKey(page, 'itt10-4sq', /Coffee House/i);
    await expect(page.locator('[data-itt10-next] a[href*="cnn"]').first()).toBeVisible();
  });

  test('F4 CNN Open Graph Like · Next Wave', async ({ page }) => {
    await page.goto('/years/2010/sites/cnn/index.html');
    await clearKeys(page, ['itt10-fb-likes']);
    await page.reload();
    await page.locator('[data-fb-like="cnn-og-2010"]').click();
    await expectKey(page, 'itt10-fb-likes', /cnn-og-2010/i);
    await expect(page.locator('[data-itt10-next] a[href*="wave/funeral"]').first()).toBeVisible();
  });

  test('F5 Wave funeral checks then REAL · Next Imgur star', async ({ page }) => {
    await page.goto('/years/2010/sites/wave/funeral.html');
    await clearKeys(page, ['itt10-wave-funeral', 'itt10-wave']);
    await page.reload();
    await page.locator('[data-wave-funeral]').click();
    await expect.poll(async () => getKey(page, 'itt10-wave-funeral')).toBeFalsy();
    await page.locator('[data-wave-may]').check();
    await page.locator('[data-wave-aug]').check();
    await page.locator('[data-wave-funeral]').click();
    await expectKey(page, 'itt10-wave-funeral', /2010-08-04|funeral|real/i);
    await expect(page.locator('[data-itt10-next] a[href*="imgur"]').first()).toBeVisible();
  });

  test('home 5× chips · guided still 6 · star Imgur', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    await expect(page.locator('#ott-guided-2010 ol > li')).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2010"]')).toHaveAttribute('href', /imgur/i);
    const box = page.locator('#ott-5x-2010');
    await expect(box).toBeVisible();
    await expect(box.locator('a[href*="instagram"]')).toHaveCount(1);
    await expect(box.locator('a[href*="ipad"]')).toHaveCount(1);
    await expect(box.locator('a[href*="foursquare"]')).toHaveCount(1);
    await expect(box.locator('a[href*="cnn"]')).toHaveCount(1);
    await expect(box.locator('a[href*="wave/funeral"]')).toHaveCount(1);
    await expect(box.locator('a[href*="imgur"]')).toHaveCount(1);
  });
});
