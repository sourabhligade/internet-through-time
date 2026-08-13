// @ts-check
/**
 * 2014 multi-hop trails — storage required on each step (2013 parity).
 */
const { test, expect } = require('@playwright/test');
const { completeRealGate, checkAllReq } = require('./helpers');
// expect used for poll + requireKey

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
  return raw || '';
}

test.describe('2014 trail 1 — WhatsApp empire', () => {
  test('install → deal about → chat message', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, [
      'itt14-wa-phone',
      'itt14-wa-install',
      'itt14-wa-installed',
      'itt14-wa-msgs',
    ]);
    await page.reload();
    await page.locator('[data-wa14-phone]').fill('5559876543');
    await page.locator('[data-wa14-verify]').click();
    await requireKey(page, 'itt14-wa-phone');
    await page.locator('[data-wa14-install]').click();
    await requireKey(page, 'itt14-wa-install');

    await page.goto('/years/2014/sites/whatsapp/about.html');
    await expect(page.locator('body')).toContainText(/Feb|19|billion|deal|acquisition/i);

    await page.goto('/years/2014/sites/whatsapp/chat.html');
    await page.locator('[data-wa14-msg]').fill('trail chat 2014');
    await page.locator('[data-wa14-send]').click();
    const msgs = await requireKey(page, 'itt14-wa-msgs');
    expect(msgs).toMatch(/trail chat 2014/i);
  });
});

test.describe('2014 trail 2 — Heartbleed', () => {
  test('incomplete blocked then rotate ≥2', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await clearKeys(page, ['itt14-heartbleed', 'itt14-heartbleed-rotate']);
    await page.reload();
    await page.locator('[data-hb-cve]').check();
    await page.locator('[data-hb-lit]').check();
    await page.locator('[data-hb-service="email"]').check();
    await page.locator('[data-hb-rotate]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-heartbleed'))).toBeFalsy();
    await page.locator('[data-hb-service="social"]').check();
    await page.locator('[data-hb-rotate]').click();
    await requireKey(page, 'itt14-heartbleed');
  });
});

test.describe('2014 trail 3 — iPhone 6 autumn', () => {
  test('pick → Pay → Bendgate → Watch announce', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await clearKeys(page, [
      'itt14-iphone6',
      'itt14-pay',
      'itt14-bendgate',
      'itt14-watch-announce',
    ]);
    await page.reload();
    await page.waitForSelector('[data-iphone6-pick]', { timeout: 15000 });
    await page.waitForTimeout(500);
    await page.locator('[data-iphone6-pick="6"]').first().click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-iphone6')), {
        timeout: 8000,
      })
      .toBeTruthy();
    await requireKey(page, 'itt14-iphone6');

    await page.goto('/years/2014/sites/iphone/pay.html');
    await page.locator('[data-pay-last4]').fill('4242');
    await page.locator('[data-pay-touchid]').check();
    await page.locator('[data-pay-enroll]').click();
    await requireKey(page, 'itt14-pay');

    await page.goto('/years/2014/sites/iphone/bendgate.html');
    await page.locator('[data-bendgate-check]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
      })
    );
    await page.locator('[data-bendgate-save]').click();
    await requireKey(page, 'itt14-bendgate');

    await page.goto('/years/2014/sites/apple/watch.html');
    await page.locator('[data-watch-preship]').check();
    await page.locator('[data-watch-save]').click();
    await requireKey(page, 'itt14-watch-announce');
  });
});

test.describe('2014 trail 4 — Ice · Serial · 1B', () => {
  test('Ice Bucket → Serial → billion', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, ['itt14-icebucket', 'itt14-icebucket-feed', 'itt14-serial', 'itt14-billion-ack']);
    await page.reload();
    await page.locator('[data-ib-name]').fill('Alex');
    await page.locator('[data-ib-nom1]').fill('Sam');
    await page.locator('[data-ib-post]').click();
    await requireKey(page, 'itt14-icebucket-feed');

    await page.goto('/years/2014/sites/serial/index.html');
    await page.locator('[data-serial-boom]').check();
    await page.locator('[data-serial-ack]').click();
    await requireKey(page, 'itt14-serial');

    await page.goto('/years/2014/sites/billion/index.html');
    await page.locator('[data-billion-june]').check();
    await page.locator('[data-billion-sep]').check();
    await page.locator('[data-billion-ack]').click();
    await requireKey(page, 'itt14-billion-ack');
  });
});

test.describe('2014 trail 5 — Chrome · Win10 TP', () => {
  test('Chrome download → Win10 TP honesty', async ({ page }) => {
    await page.goto('/years/2014/sites/chrome/index.html');
    await clearKeys(page, ['itt14-chrome', 'itt14-win10tp']);
    await page.reload();
    await completeRealGate(page, '[data-chrome-download]');
    await requireKey(page, 'itt14-chrome');

    await page.goto('/years/2014/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Technical Preview/i);
    await page.locator('[data-win10tp-preview]').check();
    await page.locator('[data-win10tp-not-retail]').check();
    await page.locator('[data-win10tp-save]').click();
    await requireKey(page, 'itt14-win10tp');
  });
});

test.describe('2014 trail 7 — densify gems', () => {
  test('Secret → Yik Yak → Ello', async ({ page }) => {
    await page.goto('/years/2014/sites/secret/compose.html');
    await clearKeys(page, ['itt14-secret-posts', 'itt14-yikyak-yaks', 'itt14-ello-ack']);
    await page.reload();
    await page.locator('[data-secret-text]').fill('trail secret');
    await page.locator('[data-secret-ack]').check();
    await page.locator('[data-secret-compose]').evaluate((f) => f.requestSubmit());
    await requireKey(page, 'itt14-secret-posts');

    await page.goto('/years/2014/sites/yikyak/herd.html');
    await page.locator('[data-yikyak-text]').fill('trail yak');
    await page.locator('[data-yikyak-lit]').check();
    await page.locator('[data-yikyak-compose]').evaluate((f) => f.requestSubmit());
    await requireKey(page, 'itt14-yikyak-yaks');

    await page.goto('/years/2014/sites/ello/index.html');
    await checkAllReq(page);
    await page.locator('[data-ello-save]').click();
    await requireKey(page, 'itt14-ello-ack');
  });
});
