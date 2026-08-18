// @ts-check
/**
 * 2012 flows A–T — incomplete blocked then REAL write
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, contentFrame } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2012 flows A–T', () => {
  test('A hub card → Win7 / IE9 → Starting Point', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.year-card.available[data-year="2012"]').click();
    await expect(page).toHaveURL(/\/years\/2012/);
    await enterYear(page, '2012');
    await expect(contentFrame(page).locator('body')).toContainText(/Instagram Android|Starting Point|visual/i);
  });

  test('B thesis literacy writes itt12-thesis-ack', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await clearKeys(page, ['itt12-thesis-ack']);
    await page.reload();
    await page.locator('[data-itt-real-save]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-thesis-ack'))).toBeFalsy();
    await page.locator('[data-thesis-req]').nth(0).check({ force: true });
    await page.locator('[data-thesis-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-thesis-ack'))).toBeTruthy();
  });

  test('I Maps flop writes itt12-maps', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/maps.html');
    await clearKeys(page, ['itt12-maps']);
    await page.reload();
    await page.locator('[data-maps-flop]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-maps'))).toBeFalsy();
    await page.locator('[data-maps-req]').check({ force: true });
    await page.locator('[data-maps-flop]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-maps'))).toMatch(/flop|real/i);
  });

  test('J iPad mini writes itt12-ipadmini', async ({ page }) => {
    await page.goto('/years/2012/sites/ipad/index.html');
    await clearKeys(page, ['itt12-ipadmini']);
    await page.reload();
    await page.locator('[data-mini-order]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-ipadmini'))).toBeFalsy();
    await page.locator('[name="mini-sku"]').first().check({ force: true });
    await page.locator('[data-mini-order]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-ipadmini'))).toMatch(/329|real/i);
  });

  test('K Windows 8 two tiles write itt12-win8', async ({ page }) => {
    await page.goto('/years/2012/sites/windows8/index.html');
    await clearKeys(page, ['itt12-win8']);
    await page.reload();
    await page.locator('[data-win8-tile]').nth(0).click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-win8'))).toBeFalsy();
    await page.locator('[data-win8-tile]').nth(1).click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-win8'))).toMatch(/tiles|real/i);
  });

  test('L Chrome 3-check writes itt12-chrome', async ({ page }) => {
    await page.goto('/years/2012/sites/chrome/index.html');
    await clearKeys(page, ['itt12-chrome']);
    await page.reload();
    await page.locator('[data-chrome-download]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-chrome'))).toBeFalsy();
    const n = await page.locator('[data-chrome-req]').count();
    for (let i = 0; i < n; i++) await page.locator('[data-chrome-req]').nth(i).check({ force: true });
    await page.locator('[data-chrome-download]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-chrome'))).toBeTruthy();
  });

  test('M UberX SF writes itt12-uberx · NY refused', async ({ page }) => {
    await page.goto('/years/2012/sites/uber/index.html');
    await clearKeys(page, ['itt12-uberx']);
    await page.reload();
    await page.locator('[data-uberx-city]').fill('New York');
    await page.locator('[name="uber-sku"][value="uberx"]').check({ force: true });
    await page.locator('[data-uberx-go]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-uberx'))).toBeFalsy();
    await page.locator('[data-uberx-city]').fill('San Francisco');
    await page.locator('[data-uberx-go]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-uberx'))).toMatch(/uberx|3.25|real/i);
  });

  test('Q SOPA writes itt12-sopa', async ({ page }) => {
    await page.goto('/years/2012/sites/wikipedia/index.html');
    await clearKeys(page, ['itt12-sopa', 'itt12-sopa-ack']);
    await page.reload();
    await page.locator('[data-itt-real-save]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-sopa'))).toBeFalsy();
    await page.locator('[data-sopa-check]').check({ force: true });
    await page.locator('[data-sopa-fact]').check({ force: true });
    await page.locator('[data-itt-real-save]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-sopa'))).toBeTruthy();
  });

  test('S Tinder two swipes write itt12-tinder', async ({ page }) => {
    await page.goto('/years/2012/sites/tinder/index.html');
    await clearKeys(page, ['itt12-tinder']);
    await page.reload();
    await page.locator('[data-tinder-left]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-tinder'))).toBeFalsy();
    await page.locator('[data-tinder-right]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-tinder'))).toMatch(/swipe|real/i);
  });

  test('R Drive leftover writes itt12-drive', async ({ page }) => {
    await page.goto('/years/2012/sites/googledrive/index.html');
    await clearKeys(page, ['itt12-drive']);
    await page.reload();
    await page.locator('[data-drive-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-drive'))).toBeFalsy();
    await page.locator('[data-drive-req]').check({ force: true });
    await page.locator('[data-drive-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-drive'))).toBeTruthy();
  });

  test('T SoundCloud play then comment writes itt12-soundcloud', async ({ page }) => {
    await page.goto('/years/2012/sites/soundcloud/index.html');
    await clearKeys(page, ['itt12-soundcloud']);
    await page.reload();
    await page.locator('[data-sc-comment-btn]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt12-soundcloud'))).toBeFalsy();
    await page.locator('[data-sc-play]').click();
    await page.locator('[data-sc-text]').fill('horse dance residual');
    await page.locator('[data-sc-comment-btn]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt12-soundcloud'))).toMatch(/horse|comments|real/i);
  });

  test('N Snapchat send writes year key when checks on', async ({ page }) => {
    await page.goto('/years/2012/sites/snapchat/index.html');
    await clearKeys(page, ['itt12-snap', 'itt12-snapchat', 'itt12-snap-count']);
    await page.reload();
    await page.waitForSelector('[data-snap-send]', { timeout: 20000 });
    await page.locator('[data-snap-check]').check({ force: true });
    await page.locator('[data-snap-not-stories]').check({ force: true });
    await page.locator('[data-snap-send]').click();
    await expect.poll(async () =>
      page.evaluate(
        () =>
          localStorage.getItem('itt12-snap') ||
          localStorage.getItem('itt12-snap-count') ||
          localStorage.getItem('itt12-snapchat')
      )
    ).toBeTruthy();
  });

  test('home guided targets live', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails|Guided multi-step/i);
    const hrefs = ['instagram/android', 'instagram/acquired', 'facebook/ipo', 'iphone/index', 'pinterest'];
    for (const h of hrefs) {
      await expect(page.locator(`a[href*="${h}"]`).first()).toBeVisible();
    }
  });

  test('no itt11 writes from 2012 pages', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-ig-filter="Lo-Fi"]').click();
    await page.locator('[data-ig-caption]').fill('iso');
    await page.locator('[data-ig-share]').click();
    expect(await page.evaluate(() => Object.keys(localStorage).some((k) => k.indexOf('itt11') === 0))).toBeFalsy();
  });
});
