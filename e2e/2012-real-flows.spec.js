// @ts-check
/**
 * 2012 real localStorage flows — no soft mocks
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, keys);
}

async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `expected ${key}`).toBeTruthy();
  expect(raw).not.toBe('[]');
  expect(raw).not.toBe('{}');
  return raw;
}

test.describe('2012 real flows (storage required)', () => {
  test('Instagram acquisition ack storage', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/acquired.html');
    await clearKeys(page, ['itt12-ig-owned']);
    await page.reload();
    await page.locator('[data-ig-acquired-ack]').click();
    await expect(page.locator('[data-ig-acquired-status]')).toContainText(/Saved|owned/i);
    const raw = await expectStorageTruthy(page, 'itt12-ig-owned');
    expect(raw).toMatch(/Facebook|1B|owned/i);
  });

  test('Instagram share posts storage', async ({ page }) => {
    await page.goto('/years/2012/sites/instagram/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => /ig-posts/i.test(k))
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
    await page.locator('[data-ig-filter="Valencia"]').click();
    await page.locator('[data-ig-caption]').fill('android summer 2012');
    await page.locator('[data-ig-share]').click();
    await expect(page.locator('[data-ig-status]')).toContainText(/Shared|Valencia|itt12/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => {
      return Object.keys(localStorage)
        .filter((k) => /ig-posts/i.test(k))
        .map((k) => localStorage.getItem(k))
        .join(' ');
    });
    expect(raw).toMatch(/Valencia|android summer 2012/i);
  });

  test('Facebook 1B milestone storage', async ({ page }) => {
    await page.goto('/years/2012/sites/facebook/about.html');
    await clearKeys(page, ['itt12-fb-1b-ack']);
    await page.reload();
    await page.locator('[data-fb-1b-ack]').click();
    await expectStorageTruthy(page, 'itt12-fb-1b-ack');
  });

  test('Apple Maps search storage', async ({ page }) => {
    await page.goto('/years/2012/sites/iphone/maps.html');
    await clearKeys(page, ['itt12-maps-note']);
    await page.reload();
    await page.locator('[data-maps-q]').fill('Golden Gate');
    await page.locator('[data-maps-search]').click();
    await expect(page.locator('[data-maps-status]')).toContainText(/Saved|itt12-maps/i);
    const raw = await expectStorageTruthy(page, 'itt12-maps-note');
    expect(raw).toMatch(/Golden Gate/i);
  });

  test('iPad mini claim + prices locked', async ({ page }) => {
    await page.goto('/years/2012/sites/ipad/prices.html');
    await expect(page.locator('body')).toContainText('$329');
    await expect(page.locator('body')).toContainText(/429|529/);
    await page.goto('/years/2012/sites/ipad/index.html');
    await clearKeys(page, ['itt12-ipad-history']);
    await page.reload();
    await page.locator('[data-ipad-claim]').click();
    const raw = await expectStorageTruthy(page, 'itt12-ipad-history');
    expect(raw).toMatch(/mini|329|interested/i);
  });

  test('Chrome download real storage', async ({ page }) => {
    await page.goto('/years/2012/sites/chrome/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => /chrome/i.test(k))
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
    await page.locator('[data-chrome-download]').click();
    await expect(page.locator('[data-chrome-status]')).toContainText(/Download|theater|Chrome/i, {
      timeout: 8000,
    });
    const hit = await page.evaluate(() => {
      return Object.keys(localStorage).some((k) => {
        const v = localStorage.getItem(k) || '';
        return /chrome/i.test(k) && /download|true|Windows/i.test(v);
      });
    });
    expect(hit).toBeTruthy();
  });

  test('UberX request storage', async ({ page }) => {
    await page.goto('/years/2012/sites/uber/index.html');
    await clearKeys(page, ['itt12-uber']);
    await page.reload();
    await page.locator('#uber-x, [data-uber-kind="uberx"]').first().click();
    await expect(page.locator('[data-uber-status], #uber-st').first()).toContainText(
      /UberX|35%|itt12-uber/i
    );
    const raw = await expectStorageTruthy(page, 'itt12-uber');
    expect(raw).toMatch(/uberx/i);
  });

  test('Snapchat send storage', async ({ page }) => {
    await page.goto('/years/2012/sites/snapchat/index.html');
    await clearKeys(page, ['itt12-snap-count', 'itt12-snap-last-timer']);
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '2012',
      null,
      { timeout: 25000 }
    );
    await page.waitForSelector('[data-snap-send]', { timeout: 20000 });
    await page.locator('[data-snap-send]').click();
    await expect(page.locator('[data-snap-status]')).toContainText(/Snap|sent/i, { timeout: 5000 });
    expect(Number(await expectStorageTruthy(page, 'itt12-snap-count'))).toBeGreaterThan(0);
  });

  test('trail: home → IPO via shell', async ({ page }) => {
    await enterYear(page, '2012');
    await goInFrame(page, 'sites/facebook/ipo.html');
    await waitForImmersion(page, '2012');
    await expect(page.frameLocator('#content').locator('body')).toContainText(/\$38|IPO|May 18/i);
  });
});
