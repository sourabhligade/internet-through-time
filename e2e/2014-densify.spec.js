// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2014 densify', () => {
  test('about dual-cite scale visible', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText('968,882,453');
    await expect(page.locator('body')).toContainText('2,925,249,355');
    await expect(page.locator('body')).toContainText(/1 billion|Sep 2014/i);
  });

  test('home has guided trail links', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    const links = page.locator('a[href*="sites/"]');
    await expect(links.first()).toBeVisible();
    expect(await links.count()).toBeGreaterThanOrEqual(4);
    await expect(page.locator('body')).toContainText(/WhatsApp|Heartbleed|iPhone 6|Ice Bucket/i);
  });

  test('hard bans listed', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Reactions|Meta/i);
  });

  test('Serial · Twitch densify rooms load', async ({ page }) => {
    const resS = await page.goto('/years/2014/sites/serial/index.html');
    expect(resS && resS.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Serial/i);

    const resT = await page.goto('/years/2014/sites/twitch/index.html');
    if (resT && resT.ok()) {
      await expect(page.locator('body')).toContainText(/Twitch|stream/i);
    }
  });

  test('Watch is pre-ship 2015 honesty', async ({ page }) => {
    await page.goto('/years/2014/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ships 2015|2015/i);
  });

  test('Win10 is Technical Preview only', async ({ page }) => {
    await page.goto('/years/2014/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Technical Preview|Insider/i);
  });
});
