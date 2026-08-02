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

async function requireKey(page, key) {
  const raw = await page.evaluate((k) => localStorage.getItem(k), key);
  expect(raw, `trail missing ${key}`).toBeTruthy();
  return raw || '';
}

test.describe('2013 trail — short video stack', () => {
  test('Vine post → IG video → Snap Story', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await clearKeys(page, ['itt13-vine-posts', 'itt13-ig-video', 'itt13-snap-story']);
    await page.reload();
    await page.locator('[data-vine-hold]').dispatchEvent('mousedown');
    await page.waitForTimeout(300);
    await page.locator('[data-vine-hold]').dispatchEvent('mouseup');
    await page.locator('[data-vine-post]').click();
    await requireKey(page, 'itt13-vine-posts');

    await page.goto('/years/2013/sites/instagram/video.html');
    await page.locator('[data-igv-share]').click();
    await requireKey(page, 'itt13-ig-video');

    await page.goto('/years/2013/sites/snapchat/story.html');
    await page.locator('[data-snap-story-add]').click();
    await requireKey(page, 'itt13-snap-story');
  });
});

test.describe('2013 trail — flat phone + privacy', () => {
  test('iOS 7 → Touch ID → Snowden → thesis', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearKeys(page, ['itt13-ios7', 'itt13-touchid', 'itt13-snowden-ack', 'itt13-thesis-ack']);
    await page.reload();
    await page.locator('[data-ios7-ack]').click();
    await requireKey(page, 'itt13-ios7');

    await page.goto('/years/2013/sites/iphone/touchid.html');
    await page.locator('[data-touchid-enroll]').click();
    await requireKey(page, 'itt13-touchid');

    await page.goto('/years/2013/sites/snowden/index.html');
    await page.locator('[data-snowden-ack]').click();
    await requireKey(page, 'itt13-snowden-ack');

    await page.goto('/years/2013/pages/about.html');
    await page.locator('[data-thesis-ack]').click();
    await requireKey(page, 'itt13-thesis-ack');
  });
});
