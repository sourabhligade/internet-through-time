// @ts-check
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

async function expectStorageTruthy(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2014 real flows (storage required)', () => {
  test('thesis REAL panel', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await clearKeys(page, ['itt14-thesis-ack']);
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-req]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
        e.dispatchEvent(new Event('change', { bubbles: true }));
      })
    );
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expectStorageTruthy(page, 'itt14-thesis-ack');
  });

  test('WhatsApp install + chat message', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, [
      'itt14-wa-phone',
      'itt14-wa-install',
      'itt14-wa-installed',
      'itt14-wa-msgs',
    ]);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-wa14-phone]').fill('5551234567');
    await page.locator('[data-wa14-verify]').click();
    await expectStorageTruthy(page, 'itt14-wa-phone');
    await page.locator('[data-wa14-install]').click();
    await expectStorageTruthy(page, 'itt14-wa-install');
    await page.goto('/years/2014/sites/whatsapp/chat.html');
    await page.waitForTimeout(500);
    await page.locator('[data-wa14-msg]').fill('hello 2014');
    await page.locator('[data-wa14-send]').click();
    const msgs = await expectStorageTruthy(page, 'itt14-wa-msgs');
    expect(msgs).toMatch(/hello 2014/i);
  });

  test('Heartbleed rotate ≥2', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await clearKeys(page, ['itt14-heartbleed', 'itt14-heartbleed-rotate']);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-hb-cve]').check();
    await page.locator('[data-hb-lit]').check();
    await page.locator('[data-hb-service="email"]').check();
    // only 1 service — should not save
    await page.locator('[data-hb-rotate]').click();
    await page.waitForTimeout(200);
    let raw = await page.evaluate(() => localStorage.getItem('itt14-heartbleed'));
    expect(raw).toBeFalsy();
    await page.locator('[data-hb-service="social"]').check();
    await page.locator('[data-hb-rotate]').click();
    await expectStorageTruthy(page, 'itt14-heartbleed');
  });

  test('iPhone 6 pick + Pay + Bendgate', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await clearKeys(page, ['itt14-iphone6', 'itt14-pay', 'itt14-bendgate']);
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-iphone6-pick="6"]').first().click();
    await expectStorageTruthy(page, 'itt14-iphone6');

    await page.goto('/years/2014/sites/iphone/pay.html');
    await page.waitForTimeout(400);
    await page.locator('[data-pay-last4]').fill('4242');
    await page.locator('[data-pay-touchid]').check();
    await page.locator('[data-pay-enroll]').click();
    await expectStorageTruthy(page, 'itt14-pay');

    await page.goto('/years/2014/sites/iphone/bendgate.html');
    await page.waitForTimeout(400);
    await page.locator('[data-bendgate-check]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
      })
    );
    await page.locator('[data-bendgate-save]').click();
    await expectStorageTruthy(page, 'itt14-bendgate');
  });

  test('Ice Bucket + billion + win10tp', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, [
      'itt14-icebucket',
      'itt14-icebucket-feed',
      'itt14-billion-ack',
      'itt14-win10tp',
    ]);
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-ib-name]').fill('Alex');
    await page.locator('[data-ib-nom1]').fill('Sam');
    await page.locator('[data-ib-post]').click();
    await expectStorageTruthy(page, 'itt14-icebucket-feed');

    await page.goto('/years/2014/sites/billion/index.html');
    await page.waitForTimeout(400);
    await page.locator('[data-billion-june]').check();
    await page.locator('[data-billion-sep]').check();
    await page.locator('[data-billion-ack]').click();
    await expectStorageTruthy(page, 'itt14-billion-ack');

    await page.goto('/years/2014/sites/windows10/index.html');
    await page.waitForTimeout(400);
    await expect(page.locator('body')).toContainText(/Technical Preview|not retail/i);
    await page.locator('[data-win10tp-preview]').check();
    await page.locator('[data-win10tp-not-retail]').check();
    await page.locator('[data-win10tp-save]').click();
    await expectStorageTruthy(page, 'itt14-win10tp');
  });

  test('Chrome download storage', async ({ page }) => {
    await page.goto('/years/2014/sites/chrome/index.html');
    await clearKeys(page, ['itt14-chrome']);
    await page.reload();
    await page.waitForTimeout(600);
    await page.locator('[data-chrome-download]').click();
    await expectStorageTruthy(page, 'itt14-chrome');
  });

  test('prefix isolation — no itt13 from 2014 pages', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt13-') || k.startsWith('itt14-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.waitForTimeout(400);
    await page.locator('[data-req]').evaluateAll((els) =>
      els.forEach((e) => {
        e.checked = true;
      })
    );
    await page.locator('[data-itt-real-save]').click();
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt13-') || k.startsWith('itt14-'))
    );
    expect(keys.some((k) => k.startsWith('itt14-'))).toBeTruthy();
    expect(keys.filter((k) => k.startsWith('itt13-'))).toEqual([]);
  });
});
