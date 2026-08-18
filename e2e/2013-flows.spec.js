// @ts-check
/**
 * 2013 flows — incomplete blocked then REAL write
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2013 flows', () => {
  test('A hub card → Win7 / IE9 → Starting Point', async ({ page }) => {
    await page.goto('/');
    await page.locator('a.year-card.available[data-year="2013"]').click();
    await expect(page).toHaveURL(/\/years\/2013/);
    await enterYear(page, '2013');
    await expect(contentFrame(page).locator('body')).toContainText(/Vine|Starting Point|mobile/i);
  });

  test('B thesis literacy writes itt13-thesis-ack', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await clearKeys(page, ['itt13-thesis-ack']);
    await page.reload();
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-thesis-ack'))).toBeFalsy();
    await page.locator('[data-thesis-req]').nth(0).check({ force: true });
    await page.locator('[data-thesis-req]').nth(1).check({ force: true });
    await page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-thesis-ack'))).toBeTruthy();
  });

  test('I iOS 7 two tiles + CC write itt13-ios7', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/ios7.html');
    await clearKeys(page, ['itt13-ios7']);
    await page.reload();
    await page.locator('[data-ios7-cc]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-ios7'))).toBeFalsy();
    await page.locator('[data-ios7-tile]').nth(0).click();
    await page.locator('[data-ios7-tile]').nth(1).click();
    await page.locator('[data-ios7-cc]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-ios7'))).toMatch(/tiles|real/i);
  });

  test('J Touch ID enroll writes itt13-touchid', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/touchid.html');
    await clearKeys(page, ['itt13-touchid']);
    await page.reload();
    await page.locator('[data-touch-enroll]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-touchid'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-touch-lift]').click();
    await page.locator('[data-touch-rest]').click();
    await page.locator('[data-touch-enroll]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-touchid'))).toMatch(/enroll|real/i);
  });

  test('K Windows 8.1 two tiles write itt13-win81', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/index.html');
    await clearKeys(page, ['itt13-win81']);
    await page.reload();
    await page.locator('[data-win81-tile]').nth(0).click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-win81'))).toBeFalsy();
    await page.locator('[data-win81-tile]').nth(1).click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-win81'))).toMatch(/tiles|real/i);
  });

  test('L Chrome 3-check writes itt13-chrome', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    await clearKeys(page, ['itt13-chrome']);
    await page.reload();
    await page.locator('[data-chrome-download]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-chrome'))).toBeFalsy();
    const n = await page.locator('[data-chrome-req]').count();
    for (let i = 0; i < n; i++) await page.locator('[data-chrome-req]').nth(i).check({ force: true });
    await page.locator('[data-chrome-download]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-chrome'))).toBeTruthy();
  });

  test('Q Snowden writes itt13-snowden-ack', async ({ page }) => {
    await page.goto('/years/2013/sites/snowden/index.html');
    await clearKeys(page, ['itt13-snowden', 'itt13-snowden-ack']);
    await page.reload();
    await page.locator('[data-snowden-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-snowden-ack'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-snowden-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-snowden-ack'))).toBeTruthy();
  });

  test('S Tinder two swipes write itt13-tinder', async ({ page }) => {
    await page.goto('/years/2013/sites/tinder/index.html');
    await clearKeys(page, ['itt13-tinder']);
    await page.reload();
    await page.locator('[data-tinder-left]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt13-tinder'))).toBeFalsy();
    await page.locator('[data-tinder-right]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-tinder'))).toMatch(/swipe|real/i);
  });

  test('home guided targets live', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails|Guided multi-step/i);
    const hrefs = ['vine/record', 'instagram/video', 'snapchat/story', 'iphone/ios7'];
    for (const h of hrefs) {
      await expect(page.locator(`a[href*="${h}"]`).first()).toBeVisible();
    }
  });

  test('no itt12 writes from 2013 pages', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    const hold = page.locator('[data-vine-hold]');
    for (let i = 0; i < 5; i++) await hold.click();
    await page.locator('[data-vine-caption]').fill('iso');
    await page.locator('[data-vine-post]').click();
    expect(await page.evaluate(() => Object.keys(localStorage).some((k) => k.indexOf('itt12') === 0))).toBeFalsy();
  });
});
