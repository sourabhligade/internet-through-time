// @ts-check
/**
 * 2011 5× lean reuse — no new Uber folder. Next chain to Airbnb star.
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

test.describe('2011 5× live F1–F4', () => {
  test('F1 Spotify checks then invite · Next Timeline', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await clearKeys(page, ['itt11-spotify-invited']);
    await page.reload();
    await page.locator('[data-spotify-invite]').click();
    await expect.poll(async () => getKey(page, 'itt11-spotify-invited')).toBeFalsy();
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await page.locator('[data-spotify-invite]').click();
    await expectKey(page, 'itt11-spotify-invited', /true|1/i);
    await expect(page.locator('[data-itt11-next] a[href*="timeline"]').first()).toBeVisible();
  });

  test('F2 Timeline JSON · Next Siri', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await clearKeys(page, ['itt11-fb-timeline']);
    await page.reload();
    await page.locator('[data-fb-timeline-enable]').click();
    await expect.poll(async () => getKey(page, 'itt11-fb-timeline')).toBeFalsy();
    await page.locator('[data-fb-tl-f8]').check();
    await page.locator('[data-fb-tl-not-stories]').check();
    await page.locator('[data-fb-timeline-enable]').click();
    const raw = await expectKey(page, 'itt11-fb-timeline', /2011|timeline|real/i);
    expect(raw).not.toBe('1');
    await expect(page.locator('[data-itt11-next] a[href*="siri"]').first()).toBeVisible();
  });

  test('F3 Siri empty blocked then phrase · Next Qwikster', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/siri.html');
    await clearKeys(page, ['itt11-siri-history']);
    await page.reload();
    await page.locator('[data-siri-form]').evaluate((f) => f.requestSubmit());
    await expect.poll(async () => getKey(page, 'itt11-siri-history')).toBeFalsy();
    await page.locator('[data-siri-phrase="Will I need an umbrella this weekend?"]').click();
    await expectKey(page, 'itt11-siri-history', /umbrella|rain/i);
    await expect(page.locator('[data-itt11-next] a[href*="qwikster"]').first()).toBeVisible();
  });

  test('F4 Qwikster after Netflix visit · Next Airbnb', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/index.html');
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await clearKeys(page, ['itt11-qwikster']);
    await page.reload();
    await page.evaluate(() => sessionStorage.setItem('itt11-netflix-visited', '1'));
    await page.locator('[data-qwikster-save]').click();
    await expect.poll(async () => getKey(page, 'itt11-qwikster')).toBeFalsy();
    await page.locator('[data-qw-event="hike"]').check();
    await page.locator('[data-qw-event="split"]').check();
    await page.locator('[data-qw-event="reverse"]').check();
    await page.locator('[data-qw-outcome][value="hike-stayed"]').check({ force: true });
    await page.locator('[data-qwikster-save]').click();
    await expectKey(page, 'itt11-qwikster', /hike-stayed|Qwikster/i);
    await expect(page.locator('[data-itt11-next] a[href*="airbnb"]').first()).toBeVisible();
  });

  test('home 5× chips · guided 6 · star Airbnb', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    await expect(page.locator('#ott-guided-2011 ol > li')).toHaveCount(6);
    await expect(page.locator('[data-ott-one-thing="2011"]')).toHaveAttribute('href', /airbnb/i);
    const box = page.locator('#ott-5x-2011');
    await expect(box).toBeVisible();
    await expect(box.locator('a[href*="spotify"]')).toHaveCount(1);
    await expect(box.locator('a[href*="timeline"]')).toHaveCount(1);
    await expect(box.locator('a[href*="siri"]')).toHaveCount(1);
    await expect(box.locator('a[href*="qwikster"]')).toHaveCount(1);
    await expect(box.locator('a[href*="airbnb"]')).toHaveCount(1);
  });
});
