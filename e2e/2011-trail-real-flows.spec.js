// @ts-check
const { test, expect } = require('@playwright/test');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try { localStorage.removeItem(k); } catch (e) { /* */ }
    });
  }, keys);
}
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

test.describe('2011 leftover trail', () => {
  test('Hangout start reveals Spotify next', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await clearKeys(page, ['itt11-gplus-hangout']);
    await page.reload();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-gplus-hangout-start]').click();
    await expect.poll(() => getKey(page, 'itt11-gplus-hangout')).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="spotify"]')).toBeVisible();
  });

  test('Spotify invite reveals Timeline next', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await clearKeys(page, ['itt11-spotify-invited']);
    await page.reload();
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await page.locator('[data-spotify-invite]').click();
    await expect.poll(() => getKey(page, 'itt11-spotify-invited')).toBeTruthy();
    await expect(page.locator('[data-itt11-next] a[href*="timeline"]')).toBeVisible();
  });

  test('Timeline literacy reveals Siri next', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await clearKeys(page, ['itt11-timeline']);
    await page.reload();
    const req = page.locator('[data-timeline-req]');
    await req.nth(0).check();
    await req.nth(1).check();
    await page.locator('[data-timeline-ack]').click();
    await expect.poll(() => getKey(page, 'itt11-timeline')).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="iphone"]')).toBeVisible();
  });

  test('Siri phrase reveals iPad 2 next', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/index.html');
    await clearKeys(page, ['itt11-siri', 'itt11-siri-history']);
    await page.reload();
    await page.waitForSelector('[data-siri-phrase]', { timeout: 20000 });
    await page.locator('[data-siri-phrase]').first().click();
    await expect.poll(async () => (await getKey(page, 'itt11-siri')) || (await getKey(page, 'itt11-siri-history'))).toBeTruthy();
    await expect(page.locator('[data-next-flow] a[href*="ipad"]')).toBeVisible();
  });

  test('iPad 2 order writes itt11-ipad2', async ({ page }) => {
    await page.goto('/years/2011/sites/ipad/index.html');
    await clearKeys(page, ['itt11-ipad2']);
    await page.reload();
    await page.locator('[data-ipad2-camera]').check();
    await page.locator('[name="ipad2-cap"][value="16GB"]').check();
    await page.locator('[name="ipad2-radio"][value="Wi-Fi"]').check();
    await page.locator('[data-ipad2-order]').click();
    await expect.poll(() => getKey(page, 'itt11-ipad2')).toMatch(/16GB|camera|real/i);
  });

  test('Airbnb city listing note writes', async ({ page }) => {
    await page.goto('/years/2011/sites/airbnb/index.html');
    await clearKeys(page, ['itt11-airbnb']);
    await page.reload();
    await page.locator('#ott-field').fill('Portland');
    await page.locator('[data-abnb-search]').click();
    await page.locator('[data-abnb-listing]').first().click();
    await page.locator('[data-abnb-note]').fill('Hello host');
    await page.locator('[data-abnb-book]').click();
    await expect.poll(() => getKey(page, 'itt11-airbnb')).toMatch(/Portland|requested|real/i);
  });
});
