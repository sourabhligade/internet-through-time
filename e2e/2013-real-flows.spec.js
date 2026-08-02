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
});

