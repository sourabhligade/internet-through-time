// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2013 leftover densify copy', () => {
  test('About dual scale + −3% + bans', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await expect(page.locator('body')).toContainText(/861|−3%|-3%/);
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Windows 10/i);
    await expect(page.locator('body')).toContainText(/House of Cards|Silk Road/i);
  });

  test('home guided + connection trails', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails|Guided multi-step/i);
    await expect(page.locator('a[href*="vine/record"]').first()).toBeVisible();
    await expect(page.locator('a[href*="instagram/video"]').first()).toBeVisible();
  });

  test('iPhone 5s prints Touch ID + $199/$299/$399', async ({ page }) => {
    await page.goto('/years/2013/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText('Touch ID');
    await expect(page.locator('body')).toContainText('$199');
    await expect(page.locator('body')).toContainText('$399');
    await expect(page.locator('body')).toContainText(/A7|20 Sep/i);
  });

  test('Win8.1 is late product not January shell', async ({ page }) => {
    await page.goto('/years/2013/sites/windows81/index.html');
    await expect(page.locator('body')).toContainText(/17 Oct|Windows 7/i);
    await expect(page.locator('body')).toContainText(/Start/i);
    await expect(page.locator('body')).toContainText(/Windows 10/i);
  });

  test('Loop Six cabinet exists and game starts without writing', async ({ page }) => {
    await page.goto('/years/2013/sites/playable/index.html');
    await expect(page.locator('body')).not.toContainText(/No year game cabinet/i);
    await expect(page.locator('body')).toContainText(/Loop Six/i);
    await page.goto('/years/2013/sites/playable/game.html');
    await expect(page.locator('[data-game-start]')).toBeVisible();
    await page.evaluate(() => localStorage.removeItem('itt13-game-loopsix'));
    await page.reload();
    await expect(page.evaluate(() => localStorage.getItem('itt13-game-loopsix'))).resolves.toBeFalsy();
    await page.locator('[data-game-start]').click();
    await expect(page.locator('[data-loop-hold]')).toBeVisible();
    expect(await page.evaluate(() => localStorage.getItem('itt13-game-loopsix'))).toBeFalsy();
    const hold = page.locator('[data-loop-hold]');
    for (let i = 0; i < 6; i++) await hold.click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt13-game-loopsix'))).toBeTruthy();
  });

  test('Telegram Medium Tumblr Snowden pages load', async ({ page }) => {
    await page.goto('/years/2013/sites/telegram/index.html');
    await expect(page.locator('body')).toContainText(/secure chat|Snowden/i);
    await page.goto('/years/2013/sites/telegram/chat.html');
    await expect(page.locator('[data-tg-send]')).toBeVisible();
    await page.goto('/years/2013/sites/medium/index.html');
    await expect(page.locator('[data-med-publish]')).toBeVisible();
    await page.goto('/years/2013/sites/tumblr/index.html');
    await expect(page.locator('body')).toContainText(/1\.1/i);
    await page.goto('/years/2013/sites/snowden/index.html');
    await expect(page.locator('body')).toContainText(/PRISM|Guardian/i);
    await page.goto('/years/2013/sites/snowden/prism.html');
    await expect(page.locator('[data-prism-ack]')).toBeVisible();
    await page.goto('/years/2013/sites/vine/android.html');
    await expect(page.locator('body')).toContainText(/2 Jun/i);
  });

  test('home leftover chips Telegram Medium Tumblr', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    await expect(page.locator('body')).toContainText(/Telegram/i);
    await expect(page.locator('body')).toContainText(/Medium/i);
    await expect(page.locator('body')).toContainText(/Tumblr/i);
    await expect(page.locator('body')).toContainText(/House of Cards/i);
  });
});
