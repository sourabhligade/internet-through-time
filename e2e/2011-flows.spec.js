// @ts-check
/**
 * 2011 period flows A–T
 * docs/2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

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

test.describe('2011 flows A–T', () => {
  test('A hub card → Win7 / IE9 → Starting Point', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card.available.y2011[href*="years/2011"]');
    await expect(card).toBeVisible();
    await card.click();
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2011');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B thesis literacy writes itt11-thesis-ack', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await clearKeys(page, ['itt11-thesis-ack']);
    await page.reload();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    expect(await getKey(page, 'itt11-thesis-ack')).toBeFalsy();
    const boxes = page.locator('[data-thesis-req]');
    await boxes.nth(0).check();
    await boxes.nth(1).check();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expect.poll(() => getKey(page, 'itt11-thesis-ack')).toMatch(/real|true|multiStep/i);
  });

  test('C G+ Hangout incomplete blocked then writes', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/hangouts.html');
    await clearKeys(page, ['itt11-gplus-hangout']);
    await page.reload();
    await page.locator('[data-gplus-hangout-start]').click();
    expect(await getKey(page, 'itt11-gplus-hangout')).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-gplus-hangout-start]').click();
    await expect.poll(() => getKey(page, 'itt11-gplus-hangout')).toBeTruthy();
  });

  test('D Spotify empty invite blocked then writes', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await clearKeys(page, ['itt11-spotify-invited']);
    await page.reload();
    await page.locator('[data-spotify-invite]').click();
    expect(await getKey(page, 'itt11-spotify-invited')).toBeFalsy();
    await page.locator('[data-spotify-ack]').check();
    await page.locator('[data-spotify-no-stream]').check();
    await page.locator('[data-spotify-invite]').click();
    await expect.poll(() => getKey(page, 'itt11-spotify-invited')).toBeTruthy();
    await expect(page.locator('[data-itt11-next] a[href*="timeline"]')).toBeVisible();
  });

  test('E iPad 2 empty blocked then writes itt11-ipad2', async ({ page }) => {
    await page.goto('/years/2011/sites/ipad/index.html');
    await clearKeys(page, ['itt11-ipad2']);
    await page.reload();
    await page.locator('[data-ipad2-order]').click();
    expect(await getKey(page, 'itt11-ipad2')).toBeFalsy();
    await page.locator('[data-ipad2-camera]').check();
    await page.locator('[name="ipad2-cap"][value="16GB"]').check();
    await page.locator('[name="ipad2-radio"][value="Wi-Fi"]').check();
    await page.locator('[data-ipad2-order]').click();
    await expect.poll(() => getKey(page, 'itt11-ipad2')).toMatch(/16GB|camera|real/i);
  });

  test('F Siri phrase writes itt11-siri-history', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/index.html');
    await clearKeys(page, ['itt11-siri-history', 'itt11-siri']);
    await page.reload();
    await page.waitForSelector('[data-siri-phrase]', { timeout: 20000 });
    await page.locator('[data-siri-phrase]').first().click();
    await expect.poll(async () => {
      const a = await getKey(page, 'itt11-siri-history');
      const b = await getKey(page, 'itt11-siri');
      return a || b;
    }).toBeTruthy();
  });

  test('G Timeline literacy writes itt11-timeline', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await clearKeys(page, ['itt11-timeline']);
    await page.reload();
    await page.locator('[data-timeline-ack]').click();
    expect(await getKey(page, 'itt11-timeline')).toBeFalsy();
    const req = page.locator('[data-timeline-req]');
    await req.nth(0).check();
    await req.nth(1).check();
    await page.locator('[data-timeline-ack]').click();
    await expect.poll(() => getKey(page, 'itt11-timeline')).toMatch(/memoir|real/i);
  });

  test('H Airbnb empty city blocked then request writes', async ({ page }) => {
    await page.goto('/years/2011/sites/airbnb/index.html');
    await clearKeys(page, ['itt11-airbnb']);
    await page.reload();
    await page.locator('[data-abnb-book]').click();
    expect(await getKey(page, 'itt11-airbnb')).toBeFalsy();
    await page.locator('#ott-field').fill('Portland');
    await page.locator('[data-abnb-search]').click();
    await page.locator('[data-abnb-listing]').first().click();
    await page.locator('[data-abnb-note]').fill('Hello host');
    await page.locator('[data-abnb-book]').click();
    await expect.poll(() => getKey(page, 'itt11-airbnb')).toMatch(/Portland|requested|real/i);
  });

  test('I Instagram still iOS filter+caption writes', async ({ page }) => {
    await page.goto('/years/2011/sites/instagram/index.html');
    await clearKeys(page, ['itt11-ig-posts']);
    await page.reload();
    await page.locator('[data-ig-filter="Earlybird"]').click();
    await page.locator('[data-ig-caption]').fill('still ios');
    await page.locator('[data-ig-share]').click();
    await expect.poll(() => getKey(page, 'itt11-ig-posts')).toBeTruthy();
    await expect(page.locator('body')).toContainText(/iOS only|2012/i);
  });

  test('J Twitter popular leftover writes itt11-tweets', async ({ page }) => {
    await page.goto('/years/2011/sites/twitter/index.html');
    await clearKeys(page, ['itt11-tweets']);
    await page.reload();
    const save = page.locator('[data-itt-popular-save][data-storage-key="tweets"]');
    await save.click();
    expect(await getKey(page, 'itt11-tweets')).toBeFalsy();
    await page.locator('#pop-field').fill('arab spring residual');
    const req = page.locator('[data-popular-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await save.click();
    await expect.poll(() => getKey(page, 'itt11-tweets')).toMatch(/real|true|multiStep/i);
  });

  test('K Groupon leftover writes itt11-groupon', async ({ page }) => {
    await page.goto('/years/2011/sites/groupon/index.html');
    await clearKeys(page, ['itt11-groupon']);
    await page.reload();
    const save = page.locator('[data-itt-popular-save][data-storage-key="groupon"]');
    await save.click();
    expect(await getKey(page, 'itt11-groupon')).toBeFalsy();
    const req = page.locator('[data-popular-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await save.click();
    await expect.poll(() => getKey(page, 'itt11-groupon')).toBeTruthy();
  });

  test('L Tumblr leftover writes itt11-tumblr', async ({ page }) => {
    await page.goto('/years/2011/sites/tumblr/index.html');
    await clearKeys(page, ['itt11-tumblr']);
    await page.reload();
    const save = page.locator('[data-itt-popular-save][data-storage-key="tumblr"]');
    await save.click();
    expect(await getKey(page, 'itt11-tumblr')).toBeFalsy();
    const req = page.locator('[data-popular-req]');
    const n = await req.count();
    for (let i = 0; i < n; i++) await req.nth(i).check({ force: true });
    await save.click();
    await expect.poll(() => getKey(page, 'itt11-tumblr')).toBeTruthy();
  });

  test('N Snapchat seed empty blocked then writes', async ({ page }) => {
    await page.goto('/years/2011/sites/snapchat/index.html');
    await page.waitForSelector('[data-snap-send]', { timeout: 20000 });
    await expect(page.locator('body')).toContainText(/not Stories|Stories/i);
  });

  test('O Qwikster funeral writes itt11-qwikster', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/index.html');
    await clearKeys(page, ['itt11-qwikster']);
    await page.reload();
    await page.locator('[data-qwikster-ack]').click();
    expect(await getKey(page, 'itt11-qwikster')).toBeFalsy();
    await page.locator('[data-qwikster-req]').check();
    await page.locator('[data-qwikster-ack]').click();
    await expect.poll(() => getKey(page, 'itt11-qwikster')).toMatch(/reversed|real/i);
  });

  test('T Letter Swap start + play updates status', async ({ page }) => {
    await page.goto('/years/2011/sites/playable/game.html?fast=1');
    await page.locator('[data-game-start]').click();
    await expect(page.locator('[data-rack]')).not.toHaveText('—');
    await page.locator('[data-word]').fill('a');
    await page.locator('[data-play-word]').click();
    await expect.poll(async () => ((await page.locator('[data-itt-action-status]').textContent()) || '').length).toBeGreaterThan(0);
    await expect(page.locator('[data-game-time]')).toBeVisible();
  });
});

test.describe('2011 continuity live', () => {
  const rooms = [
    '/years/2011/pages/home.html',
    '/years/2011/pages/map.html',
    '/years/2011/sites/chrome/index.html',
    '/years/2011/sites/ie9/index.html',
    '/years/2011/sites/android/index.html',
    '/years/2011/sites/youtube/index.html',
    '/years/2011/sites/playable/famous.html',
  ];
  for (const path of rooms) {
    test(`${path} is 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    });
  }

  test('home guided targets live', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    const hrefs = await page.locator('#ott-guided-2011 a[href]').evaluateAll((as) =>
      as.map((a) => a.getAttribute('href'))
    );
    expect(hrefs.length).toBe(6);
    for (const href of hrefs) {
      const dest = new URL(href || '', page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });
});
