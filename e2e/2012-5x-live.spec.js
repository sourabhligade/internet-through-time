// @ts-check
/**
 * 2012 5× lean reuse — Next chain to the SoundCloud star.
 * Keys stay itt12-pin / itt12-ig-android / itt12-fb-ipo-ack / itt12-maps-note / itt12-sopa-ack.
 */
const { test, expect } = require('@playwright/test');

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

test.describe('2012 5× live F1–F5', () => {
  test('F1 Pinterest literacy then pin · Next IG Android', async ({ page }) => {
    await page.goto('/years/2012/sites/pinterest/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => /pin/i.test(k))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.locator('[data-pin-save]').first().click();
    await expect
      .poll(async () =>
        page.evaluate(() =>
          Object.keys(localStorage).some((k) => /pin/i.test(k) && localStorage.getItem(k) && localStorage.getItem(k) !== '[]')
        )
      )
      .toBeFalsy();
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-pin-save]').first().click();
    await expect
      .poll(async () =>
        page.evaluate(() =>
          Object.keys(localStorage).some((k) => /pin/i.test(k) && localStorage.getItem(k) && localStorage.getItem(k) !== '[]')
        )
      )
      .toBeTruthy();
    await expect(page.locator('[data-itt12-next] a[href*="instagram/android"]').first()).toBeVisible();
  });

  test('F2 IG Android checks then install · Next IPO', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await clearKeys(page, ['itt12-ig-android']);
    await page.reload();
    await page.locator('[data-ig-android-install]').click();
    await expect.poll(async () => getKey(page, 'itt12-ig-android')).toBeFalsy();
    await page.locator('[data-ig-android-date]').check();
    await page.locator('[data-ig-android-not-stories]').check();
    await page.locator('[data-ig-android-install]').click();
    await expectKey(page, 'itt12-ig-android', /2012-04-03|android|real/i);
    await expect(page.locator('[data-itt12-next] a[href*="facebook/ipo"]').first()).toBeVisible();
  });

  test('F3 IPO two facts · Next Maps', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await clearKeys(page, ['itt12-fb-ipo-ack']);
    await page.reload();
    await page.locator('[data-fb-ipo-ack]').click();
    await expect.poll(async () => getKey(page, 'itt12-fb-ipo-ack')).toBeFalsy();
    await page.locator('[data-ipo-fact="price38"]').check();
    await page.locator('[data-ipo-fact="nasdaq"]').check();
    await page.locator('[data-fb-ipo-ack]').click();
    await expectKey(page, 'itt12-fb-ipo-ack', /38|2012-05-18|real/i);
    await expect(page.locator('[data-itt12-next] a[href*="iphone/maps"]').first()).toBeVisible();
  });

  test('F4 Maps checks + place then REAL · Next SOPA', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/maps.html');
    await clearKeys(page, ['itt12-maps-note']);
    await page.reload();
    await page.locator('[data-maps-q]').fill('Lake');
    await page.locator('[data-maps-search]').click();
    await expect.poll(async () => getKey(page, 'itt12-maps-note')).toBeFalsy();
    await page.locator('[data-maps-dropped]').check();
    await page.locator('[data-maps-apology]').check();
    await page.locator('[data-maps-search]').click();
    await expectKey(page, 'itt12-maps-note', /Lake|real/i);
    await expect(page.locator('[data-itt12-next] a[href*="sopa-blackout"]').first()).toBeVisible();
  });

  test('F5 SOPA two facts · Next SoundCloud star', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/sopa-blackout.html');
    await clearKeys(page, ['itt12-sopa-ack']);
    await page.reload();
    await page.locator('[data-sopa-ack]').click();
    await expect.poll(async () => getKey(page, 'itt12-sopa-ack')).toBeFalsy();
    await page.locator('[data-sopa-fact="wiki"]').check();
    await page.locator('[data-sopa-fact="bills"]').check();
    await page.locator('[data-sopa-ack]').click();
    await expectKey(page, 'itt12-sopa-ack', /2012-01-18|wikipedia-blackout|real/i);
    await expect(page.locator('[data-itt12-next] a[href*="soundcloud"]').first()).toBeVisible();
  });

  test('home 5× chips · guided still 6 · star SoundCloud', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    await expect(page.locator('#ott-guided-2012 ol > li')).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2012"]')).toHaveAttribute('href', /soundcloud/i);
    const box = page.locator('#ott-5x-2012');
    await expect(box).toBeVisible();
    await expect(box.locator('a[href*="pinterest"]')).toHaveCount(1);
    await expect(box.locator('a[href*="instagram/android"]')).toHaveCount(1);
    await expect(box.locator('a[href*="facebook/ipo"]')).toHaveCount(1);
    await expect(box.locator('a[href*="iphone/maps"]')).toHaveCount(1);
    await expect(box.locator('a[href*="sopa-blackout"]')).toHaveCount(1);
    await expect(box.locator('a[href*="soundcloud"]')).toHaveCount(1);
  });
});
