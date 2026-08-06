// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion } = require('./helpers');

test.describe('2012 MVP', () => {
  test('shell boots 2012', async ({ page }) => {
    await enterYear(page, '2012');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2012');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    for (const t of [
      'Instagram',
      'Facebook IPO',
      'Pinterest',
      'iPhone 5',
      'Windows 8',
      '697,089,489',
    ]) {
      await expect(page.locator('body')).toContainText(t);
    }
  });

  test('about dual scale and bans', async ({ page }) => {
    await page.goto('/years/2012/pages/about.html');
    await expect(page.locator('body')).toContainText('697,089,489');
    await expect(page.locator('body')).toContainText(/634/);
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Reactions/i);
    await expect(page.locator('body')).toContainText(/Instagram|IPO|Pinterest/i);
  });

  test('Instagram Android install theater', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/android.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt12-ig-android');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-ig-android-install]', { timeout: 20000 });
    await page.locator('[data-ig-android-install]').click();
    await expect(page.locator('[data-ig-android-status]')).toContainText(/Installed|android/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt12-ig-android'));
    expect(raw).toBe('1');
  });

  test('Facebook IPO $38 ack', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/ipo.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt12-fb-ipo-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-fb-ipo-ack]', { timeout: 20000 });
    await page.locator('[data-fb-ipo-ack]').click();
    await expect(page.locator('[data-fb-ipo-status]')).toContainText(/\$38|Saved/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt12-fb-ipo-ack'));
    expect(raw || '').toMatch(/38/);
  });

  test('Pinterest pin save storage', async ({ page }) => {
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
    await page.waitForSelector('[data-pin-save]', { timeout: 20000 });
    await page.locator('[data-pin-save]').first().click();
    await expect(page.locator('[data-pin-status]')).toContainText(/pin|1|itt12/i, {
      timeout: 8000,
    });
    const hit = await page.evaluate(() =>
      Object.keys(localStorage).some((k) => {
        const v = localStorage.getItem(k) || '';
        return /pin/i.test(k) && v && v !== '[]' && v !== '{}';
      })
    );
    expect(hit).toBeTruthy();
  });

  test('Windows 8 tile theater storage', async ({ page }) => {
    await page.goto('/years/2012/sites/windows8/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt12-win8-tour');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-win8-tile]', { timeout: 20000 });
    await page.locator('[data-win8-tile]').first().click();
    await expect(page.locator('[data-win8-status]')).toContainText(/Opened|theater/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt12-win8-tour'));
    expect(raw).toBeTruthy();
    expect(raw).not.toBe('[]');
  });

  test('shell navigates to Instagram', async ({ page }) => {
    await enterYear(page, '2012');
    await goInFrame(page, 'sites/instagram/index.html');
    await waitForImmersion(page, '2012');
    const body = page.frameLocator('#content').locator('body');
    await expect(body).toContainText(/Instagram|Android|filters/i);
  });
});
