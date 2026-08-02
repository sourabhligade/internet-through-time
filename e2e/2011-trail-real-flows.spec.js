// @ts-check
/**
 * 2011 multi-step trails — real localStorage (itt11)
 * Home connection trails
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

async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  return raw || '';
}

test.describe('2011 trail 1 — Streaming US', () => {
  test('Spotify invite → plans Premium storage', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await clearKeys(page, ['itt11-spotify-invited', 'itt11-spotify-plan']);
    await page.reload();
    await page.waitForSelector('[data-spotify-invite]', { timeout: 20000 });
    await page.locator('[data-spotify-invite]').click();
    await requireKey(page, 'itt11-spotify-invited');

    await page.goto('/years/2011/sites/spotify/plans.html');
    await page.waitForSelector('[data-spotify-plan="premium"]', { timeout: 20000 });
    await page.locator('[data-spotify-plan="premium"]').click();
    const plan = await requireKey(page, 'itt11-spotify-plan');
    expect(plan).toMatch(/premium/i);
  });
});

test.describe('2011 trail 2 — Social redesign', () => {
  test('Timeline enable → feed mode', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await clearKeys(page, ['itt11-fb-timeline', 'itt11-fb-feed-mode']);
    await page.reload();
    await page.waitForSelector('[data-fb-timeline-enable]', { timeout: 20000 });
    await page.locator('[data-fb-timeline-enable]').click();
    await requireKey(page, 'itt11-fb-timeline');

    await page.goto('/years/2011/sites/facebook/feed-about.html');
    await page.waitForSelector('[data-fb-feed-mode]', { timeout: 20000 });
    await page.locator('[data-fb-feed-mode="recent"]').click();
    await requireKey(page, 'itt11-fb-feed-mode');
  });
});

test.describe('2011 trail 3 — Google+ challenger', () => {
  test('Circles add → Hangout mock', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/circles.html');
    await clearKeys(page, ['itt11-gplus-circles', 'itt11-gplus-hangout']);
    await page.reload();
    await page.waitForSelector('[data-gplus-add-circle]', { timeout: 20000 });
    await page.locator('[data-gplus-circle-name]').fill('Trail Friends');
    await page.locator('[data-gplus-add-circle]').click();
    await requireKey(page, 'itt11-gplus-circles');

    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await page.waitForSelector('[data-gplus-hangout-start]', { timeout: 20000 });
    await page.locator('[data-gplus-hangout-start]').click();
    await requireKey(page, 'itt11-gplus-hangout');
  });
});

test.describe('2011 trail 4 — Phone AI autumn', () => {
  test('Siri ask → iMessage send', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/siri.html');
    await clearKeys(page, ['itt11-siri-history', 'itt11-imessage']);
    await page.reload();
    await page.waitForSelector('[data-siri-phrase]', { timeout: 20000 });
    await page.locator('[data-siri-phrase="Will I need an umbrella this weekend?"]').click();
    await requireKey(page, 'itt11-siri-history');

    await page.goto('/years/2011/sites/iphone/ios5.html');
    await page.waitForSelector('[data-imessage-send]', { timeout: 15000 });
    await page.locator('[data-imessage-text]').fill('trail from 4S');
    await page.locator('[data-imessage-send]').click();
    await requireKey(page, 'itt11-imessage');
  });
});

test.describe('2011 trail 5 — Qwikster honesty', () => {
  test('pricing → qwikster reverse copy', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/pricing-2011.html');
    await expect(page.locator('body')).toContainText(/7\.99|15\.98|60%|July|price/i);
    await page.goto('/years/2011/sites/netflix/qwikster.html');
    await expect(page.locator('body')).toContainText(/Qwikster/i);
    await expect(page.locator('body')).toContainText(/Oct|cancel|reverse|23/i);
  });
});

test.describe('2011 trail 6 — thesis ack', () => {
  test('About thesis storage', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await clearKeys(page, ['itt11-thesis-ack']);
    await page.reload();
    await page.locator('[data-thesis-ack]').click();
    await requireKey(page, 'itt11-thesis-ack');
  });
});
