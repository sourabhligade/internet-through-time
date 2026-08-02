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

test.describe('2013 real flows (storage required)', () => {
  test('IG video share storage', async ({ page }) => {
    await page.goto('/years/2013/sites/instagram/video.html');
    await clearKeys(page, ['itt13-ig-video']);
    await page.reload();
    await page.locator('[data-igv-filter="Cinema"]').click();
    await page.locator('[data-igv-share]').click();
    const raw = await expectStorageTruthy(page, 'itt13-ig-video');
    expect(raw).toMatch(/Cinema|15/i);
  });

  test('Snap story storage', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/story.html');
    await clearKeys(page, ['itt13-snap-story']);
    await page.reload();
    await page.locator('[data-snap-story-add]').click();
    await expectStorageTruthy(page, 'itt13-snap-story');
  });

  test('5c ack storage', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/5c.html');
    await clearKeys(page, ['itt13-iphone5c']);
    await page.reload();
    await page.locator('[data-5c-ack]').click();
    await expectStorageTruthy(page, 'itt13-iphone5c');
  });

  test('Chrome download + prefer storage', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    await expect(page.locator('body')).toContainText(/Chrome|browser|download|StatCounter/i);
    await expect(page.locator('body')).toContainText(/2013/);
    await clearKeys(page, ['itt13-chrome']);
    await page.reload();
    await page.waitForTimeout(600);
    await page.locator('[data-chrome-download]').click();
    await expectStorageTruthy(page, 'itt13-chrome');
    await page.locator('[data-chrome-prefer]').click();
    const raw = await expectStorageTruthy(page, 'itt13-chrome');
    expect(raw).toMatch(/preferred|true/i);
  });

  test('Snap index send + Stories link', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/index.html');
    await clearKeys(page, ['itt13-snap-count', 'itt13-snap-last-timer']);
    await page.reload();
    await page.waitForTimeout(600);
    await expect(page.locator('a[href*="story"]').first()).toBeVisible();
    await page.locator('[data-snap-send]').click();
    await expectStorageTruthy(page, 'itt13-snap-count');
  });

  test('FB Home flop room storage', async ({ page }) => {
    await page.goto('/years/2013/sites/facebook/home.html');
    await expect(page.locator('body')).toContainText(/Facebook Home|launcher|HTC|flop/i);
    await clearKeys(page, ['itt13-fb-home']);
    await page.reload();
    await page.locator('[data-fb-home-install]').click();
    await expectStorageTruthy(page, 'itt13-fb-home');
  });

  test('HealthCare.gov ack storage', async ({ page }) => {
    await page.goto('/years/2013/sites/healthcare/index.html');
    await clearKeys(page, ['itt13-healthcare-ack']);
    await page.reload();
    await page.locator('[data-hc-try="1"]').click().catch(() => {});
    await page.waitForTimeout(700);
    await page.locator('[data-hc-try="2"]').click().catch(() => {});
    await page.waitForTimeout(800);
    await page.locator('[data-healthcare-ack]').click();
    await expectStorageTruthy(page, 'itt13-healthcare-ack');
  });

  test('iPad Air interest storage', async ({ page }) => {
    await page.goto('/years/2013/sites/ipad/air.html');
    await clearKeys(page, ['itt13-ipadair']);
    await page.reload();
    await page.locator('[data-ipadair-ack]').click();
    await expectStorageTruthy(page, 'itt13-ipadair');
  });

  test('UberX request storage', async ({ page }) => {
    await page.goto('/years/2013/sites/uber/index.html');
    await clearKeys(page, ['itt13-uber']);
    await page.reload();
    await page.locator('#uber-x, [data-uber-kind="uberx"]').first().click();
    const raw = await expectStorageTruthy(page, 'itt13-uber');
    expect(raw).toMatch(/uberx|true/i);
  });

  test('Spotify invite writes itt13-spotify*', async ({ page }) => {
    await page.goto('/years/2013/sites/spotify/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt13-spotify') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForTimeout(500);
    await page.locator('[data-spotify-invite]').first().click();
    const n = await page.evaluate(() => {
      let c = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf('itt13-spotify') === 0) c++;
      }
      return c;
    });
    expect(n).toBeGreaterThan(0);
  });
});

