// @ts-check
/**
 * 2014 lean from-scratch — door + star + Heartbleed + Ice Bucket + Tile Fold
 */
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

async function clearKeys(page, keys) {
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) { /* */ }
    });
  }, keys);
}

test.describe('2014 MVP', () => {
  test('A shell boots Win7 / IE9 / 2014', async ({ page }) => {
    await enterYear(page, '2014');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2014');
    await expect(page.locator('body')).toHaveClass(/os-win7/);
    await expect(page.locator('body')).toHaveClass(/browser-ie9/);
    await expect(page.locator('#content')).toBeVisible();
  });

  test('B about dual scale + bans', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText('968,882,453');
    await expect(page.locator('body')).toContainText(/1 billion|1B/i);
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Windows 10/i);
    await expect(page.locator('body')).toContainText(/Watch/i);
  });

  test('C WhatsApp incomplete never writes then REAL itt14-wa-install', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await clearKeys(page, ['itt14-wa-install', 'itt14-wa']);
    await page.reload();
    await page.waitForSelector('[data-wa-install]', { timeout: 20000 });
    await page.locator('[data-wa-install]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-wa-install'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-wa-install]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-wa-install'))).toMatch(/whatsapp|16b|real/i);
    expect(await page.evaluate(() => localStorage.getItem('itt14-wa'))).toBeTruthy();
  });

  test('D Heartbleed blocked then REAL itt14-heartbleed', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await clearKeys(page, ['itt14-heartbleed']);
    await page.reload();
    await page.locator('[data-hb-ack]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-heartbleed'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check({ force: true });
    await page.locator('[data-req]').nth(1).check({ force: true });
    await page.locator('[data-hb-ack]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-heartbleed'))).toMatch(/2014-0160|rotate|real/i);
  });

  test('E Ice Bucket nominate + check writes itt14-icebucket', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await clearKeys(page, ['itt14-icebucket']);
    await page.reload();
    await page.locator('[data-ice-dump]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt14-icebucket'))).toBeFalsy();
    await page.locator('[data-ice-nominate]').fill('museum residual');
    await page.locator('[data-ice-req]').check({ force: true });
    await page.locator('[data-ice-dump]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-icebucket'))).toMatch(/museum|real/i);
  });

  test('F Tile Fold start never writes then saveBest writes itt14-game-tilefold', async ({ page }) => {
    await page.goto('/years/2014/sites/playable/game.html');
    await expect(page.locator('body')).not.toContainText(/No year game cabinet/i);
    await expect(page.locator('body')).toContainText(/Tile Fold/i);
    await page.evaluate(() => localStorage.removeItem('itt14-game-tilefold'));
    await page.reload();
    expect(await page.evaluate(() => localStorage.getItem('itt14-game-tilefold'))).toBeFalsy();
    await page.locator('[data-game-start]').click();
    await expect(page.locator('[data-tile-board]')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt14-game-tilefold'))).toBeFalsy();
    await page.evaluate(() => {
      if (window.ITT && window.ITT.YearGame) {
        window.ITT.YearGame.saveBest('tilefold', 128, { year: '2014' });
      }
    });
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt14-game-tilefold'))).toMatch(/tilefold|128|real|2014/i);
  });
});
