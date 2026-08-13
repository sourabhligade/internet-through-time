// @ts-check
/**
 * 2014 flows A–T — storage-hard where product allows (2013 parity depth).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, completeRealGate, checkAllReq } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      /* */
    }
  }, keys);
}

async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2014 flows A–T', () => {
  test('A enter year — shell boot', async ({ page }) => {
    await enterYear(page, '2014');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2014');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B thesis about — dual scale + REAL', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await clearKeys(page, ['itt14-thesis-ack']);
    await page.reload();
    await expect(page.locator('body')).toContainText('968,882,453');
    await checkAllReq(page);
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt14-thesis-ack');
  });

  test('C/D WhatsApp install + chat', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, ['itt14-wa-phone', 'itt14-wa-install', 'itt14-wa-msgs']);
    await page.reload();
    await page.locator('[data-wa14-phone]').fill('5551112222');
    await page.locator('[data-wa14-verify]').click();
    await expectStorageTruthy(page, 'itt14-wa-phone');
    await page.locator('[data-wa14-install]').click();
    await expectStorageTruthy(page, 'itt14-wa-install');
    await page.goto('/years/2014/sites/whatsapp/chat.html');
    await page.locator('[data-wa14-msg]').fill('flow chat');
    await page.locator('[data-wa14-send]').click();
    await expectStorageTruthy(page, 'itt14-wa-msgs');
  });

  test('E Heartbleed rotate ≥2', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await clearKeys(page, ['itt14-heartbleed']);
    await page.reload();
    await page.locator('[data-hb-cve]').check();
    await page.locator('[data-hb-lit]').check();
    await page.locator('[data-hb-service="email"]').check();
    await page.locator('[data-hb-service="social"]').check();
    await page.locator('[data-hb-rotate]').click();
    await expectStorageTruthy(page, 'itt14-heartbleed');
  });

  test('F–I Apple autumn path storage', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await clearKeys(page, ['itt14-iphone6', 'itt14-pay', 'itt14-bendgate', 'itt14-watch-announce']);
    await page.reload();
    await page.waitForSelector('[data-iphone6-pick]', { timeout: 15000 });
    await page.waitForTimeout(500);
    await page.locator('[data-iphone6-pick="6"]').first().click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-iphone6')), {
        timeout: 8000,
      })
      .toBeTruthy();
    await expectStorageTruthy(page, 'itt14-iphone6');
    await page.goto('/years/2014/sites/iphone/pay.html');
    await page.locator('[data-pay-last4]').fill('1111');
    await page.locator('[data-pay-touchid]').check();
    await page.locator('[data-pay-enroll]').click();
    await expectStorageTruthy(page, 'itt14-pay');
    await page.goto('/years/2014/sites/iphone/bendgate.html');
    await page.locator('[data-bendgate-check]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
      })
    );
    await page.locator('[data-bendgate-save]').click();
    await expectStorageTruthy(page, 'itt14-bendgate');
    await page.goto('/years/2014/sites/apple/watch.html');
    await page.locator('[data-watch-preship]').check();
    await page.locator('[data-watch-save]').click();
    await expectStorageTruthy(page, 'itt14-watch-announce');
  });

  test('J–M virality + desktop storage', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, [
      'itt14-icebucket-feed',
      'itt14-serial',
      'itt14-chrome',
      'itt14-win10tp',
    ]);
    await page.reload();
    await page.locator('[data-ib-name]').fill('Pat');
    await page.locator('[data-ib-nom1]').fill('Lee');
    await page.locator('[data-ib-post]').click();
    await expectStorageTruthy(page, 'itt14-icebucket-feed');

    await page.goto('/years/2014/sites/serial/index.html');
    await page.locator('[data-serial-boom]').check();
    await page.locator('[data-serial-ack]').click();
    await expectStorageTruthy(page, 'itt14-serial');

    await page.goto('/years/2014/sites/chrome/index.html');
    await completeRealGate(page, '[data-chrome-download]');
    await expectStorageTruthy(page, 'itt14-chrome');

    await page.goto('/years/2014/sites/windows10/index.html');
    await page.locator('[data-win10tp-preview]').check();
    await page.locator('[data-win10tp-not-retail]').check();
    await page.locator('[data-win10tp-save]').click();
    await expectStorageTruthy(page, 'itt14-win10tp');
  });

  test('N–R P1 empire REAL multi-step', async ({ page }) => {
    const rooms = [
      { path: '/years/2014/sites/twitch/index.html', key: 'itt14-twitch', btn: '[data-twitch-ack]' },
      { path: '/years/2014/sites/oculus/index.html', key: 'itt14-oculus', btn: '[data-oculus-ack]' },
      { path: '/years/2014/sites/alibaba/index.html', key: 'itt14-alibaba', btn: '[data-alibaba-ack]' },
      { path: '/years/2014/sites/material/index.html', key: 'itt14-material', btn: '[data-material-ack]' },
      {
        path: '/years/2014/sites/echo/index.html',
        key: 'itt14-echo-announce',
        btn: '[data-echo-ack]',
      },
    ];
    for (const r of rooms) {
      await page.goto(r.path);
      await page.evaluate((k) => localStorage.removeItem(k), r.key);
      await page.reload();
      await checkAllReq(page);
      await page.locator(r.btn).click();
      await expectStorageTruthy(page, r.key);
    }
  });

  test('S ban literacy on about + home', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Reactions|Meta/i);
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('body')).toContainText(/Hard bans|Stories|Watch shipped|Win10 retail/i);
  });

  test('T exit + resume probe', async ({ page }) => {
    await enterYear(page, '2014');
    await page.evaluate(() => {
      localStorage.setItem(
        'itt14-resume-probe',
        JSON.stringify({ year: 2014, real: true, ts: Date.now() })
      );
      try {
        localStorage.setItem('itt-last-year', '2014');
      } catch (e) {
        /* */
      }
    });
    await page.goto('/');
    await expect(page.locator('a.year-card.available[href*="years/2014"]')).toBeVisible();
    await enterYear(page, '2014');
    await expectStorageTruthy(page, 'itt14-resume-probe');
  });

  test('map + whats-new load', async ({ page }) => {
    await page.goto('/years/2014/pages/map.html');
    await expect(page.locator('body')).toContainText(/2014|flow|map|WhatsApp|Heartbleed/i);
    await page.goto('/years/2014/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/Feb 19|Heartbleed|iPhone 6/i);
  });
});
