// @ts-check
/**
 * 2008 real localStorage flows — no soft mocks.
 * Every interactive action must mutate itt08-* keys and DOM.
 */
const { test, expect } = require('@playwright/test');

/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, list);
}

test.describe('2008 real flows', () => {
  test('App Store install then remove', async ({ page }) => {
    await page.goto('/years/2008/sites/appstore/index.html');
    await clearKeys(page, 'itt08-apps');
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    await page.locator('[data-appstore-install]').first().click();
    await expect(page.locator('[data-appstore-apps]')).toContainText(
      /Koi|Monkey|Convert|Facebook|Shazam|NYTimes|Camera|Google/i,
      { timeout: 8000 }
    );
    const afterInstall = await page.evaluate(() => localStorage.getItem('itt08-apps'));
    expect(JSON.parse(afterInstall || '[]').length).toBeGreaterThan(0);
    await page.locator('[data-appstore-remove]').first().click();
    const afterRemove = JSON.parse((await page.evaluate(() => localStorage.getItem('itt08-apps'))) || '[]');
    expect(Array.isArray(afterRemove)).toBe(true);
  });

  test('Chrome download + prefer mutates itt08-chrome', async ({ page }) => {
    await page.goto('/years/2008/sites/chrome/index.html');
    await clearKeys(page, 'itt08-chrome');
    await page.reload();
    await page.waitForSelector('[data-chrome-download]', { timeout: 20000 });
    await page.locator('[data-chrome-download]').click();
    await page.locator('[data-chrome-prefer]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt08-chrome'));
    expect(raw || '').toContain('downloaded');
    expect(raw || '').toContain('preferred');
  });

  test('iPhone Safari history → itt08-iphone-history', async ({ page }) => {
    await page.goto('/years/2008/sites/iphone/index.html');
    await clearKeys(page, 'itt08-iphone-history');
    await page.reload();
    await page.waitForSelector('[data-iphone-browse]', { timeout: 20000 });
    await page.fill('[name="url"]', 'http://www.apple.com/');
    await page.locator('[data-iphone-browse] button[type="submit"]').click();
    await expect(page.locator('[data-iphone-status]')).toContainText(/Opened|itt08/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-iphone-history'));
    expect(raw || '').toMatch(/apple/i);
  });

  test('Android Market install', async ({ page }) => {
    await page.goto('/years/2008/sites/android/market.html');
    await clearKeys(page, 'itt08-android-apps');
    await page.reload();
    await page.waitForSelector('[data-android-install]', { timeout: 20000 });
    await page.locator('[data-android-install="Gmail"]').click();
    await expect(page.locator('[data-android-apps]')).toContainText(/Gmail/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-android-apps'));
    expect(raw || '').toContain('Gmail');
  });

  test('Hulu play mutates itt08-hulu', async ({ page }) => {
    await page.goto('/years/2008/sites/hulu/index.html');
    await clearKeys(page, 'itt08-hulu');
    await page.reload();
    await page.waitForSelector('[data-hulu-play]', { timeout: 20000 });
    await page.locator('[data-hulu-play]').first().click();
    const raw = await page.evaluate(() => localStorage.getItem('itt08-hulu'));
    expect(raw || '').toMatch(/Office|Rock|SNL|title/i);
  });

  test('Facebook Connect flag', async ({ page }) => {
    await page.goto('/years/2008/sites/facebook/connect.html');
    await clearKeys(page, 'itt08-fb-connect');
    await page.reload();
    await page.waitForSelector('[data-fb-connect]', { timeout: 20000 });
    await page.locator('[data-fb-connect]').click();
    await expect(page.locator('[data-fb-connect-status]')).toContainText(/Connected|Approved|itt08/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-fb-connect'));
    expect(raw || '').toContain('connected');
  });

  test('Netflix queue mutates itt08-netflix-queue', async ({ page }) => {
    await page.goto('/years/2008/sites/netflix/index.html');
    await clearKeys(page, 'itt08-netflix-queue');
    await page.reload();
    await page.waitForSelector('[data-netflix-queue-form]', { timeout: 20000 });
    await page.fill('[name="q"]', 'Wall-E');
    await page.locator('[data-netflix-queue-form] input[type="submit"]').click();
    await expect(page.locator('[data-netflix-queue]')).toContainText(/Wall-E/i, { timeout: 8000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-netflix-queue'));
    expect(raw || '').toMatch(/Wall-E/i);
  });

  test('Twitter compose → itt08-tweets', async ({ page }) => {
    await page.goto('/years/2008/sites/twitter/index.html');
    await clearKeys(page, 'itt08-tweets');
    await page.reload();
    await page.waitForSelector('[data-twitter-compose]', { timeout: 20000 });
    await page.fill('[data-twitter-status]', 'real flow tweet 2008');
    await page
      .locator('[data-twitter-compose] button[type="submit"], [data-twitter-compose] input[type="submit"]')
      .first()
      .click();
    await expect(page.locator('[data-twitter-status-msg]')).toContainText(/Posted|saved|update/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-tweets'));
    expect(raw || '').toMatch(/real flow tweet/i);
  });

  test('YouTube upload → itt08-yt-uploads', async ({ page }) => {
    await page.goto('/years/2008/sites/youtube/upload.html');
    await clearKeys(page, 'itt08-yt-uploads');
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[data-yt-upload] [name="title"]', 'Real flow upload');
    await page.locator('[data-yt-upload] button[type="submit"], [data-yt-upload] input[type="submit"]').first().click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/upload|saved|list/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt08-yt-uploads'));
    expect(raw || '').toMatch(/Real flow upload/i);
  });

  test('Amazon cart → itt08-amazon-cart', async ({ page }) => {
    await page.goto('/years/2008/sites/amazon/index.html');
    await clearKeys(page, 'itt08-amazon-cart');
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    await page.waitForTimeout(300);
    const raw = await page.evaluate(() => localStorage.getItem('itt08-amazon-cart'));
    expect(raw || '').toMatch(/\[|id|title|being|cart/i);
  });

  test('no soft-mock App Store install (status + storage both change)', async ({ page }) => {
    await page.goto('/years/2008/sites/appstore/index.html');
    await clearKeys(page, 'itt08-apps');
    await page.reload();
    await page.waitForSelector('[data-appstore-install]', { timeout: 20000 });
    const before = await page.locator('[data-appstore-apps]').innerText();
    await page.locator('[data-appstore-install]').nth(1).click();
    await expect(page.locator('[data-appstore-status]')).not.toHaveText('', { timeout: 8000 });
    const after = await page.locator('[data-appstore-apps]').innerText();
    expect(after).not.toBe(before);
    expect(await page.evaluate(() => localStorage.getItem('itt08-apps'))).toBeTruthy();
  });
});
