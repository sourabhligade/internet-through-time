// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2018 densify', () => {
  test('about dual-cite scale visible', async ({ page }) => {
    await page.goto('/years/2018/pages/about.html');
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await expect(page.locator('body')).toContainText(/−8%|-8%/);
  });

  test('home has guided trail links', async ({ page }) => {
    await page.goto('/years/2018/pages/home.html');
    const links = page.locator('a[href*="sites/"]');
    await expect(links.first()).toBeVisible();
    expect(await links.count()).toBeGreaterThanOrEqual(4);
    await expect(page.locator('body')).toContainText(/GDPR|TikTok|IGTV/i);
  });

  test('hard bans listed', async ({ page }) => {
    await page.goto('/years/2018/pages/about.html');
    await expect(page.locator('body')).toContainText(/Meta|Reels|COVID|ChatGPT/i);
  });

  test('complex modern rooms load', async ({ page }) => {
    for (const path of [
      '/years/2018/sites/netflix/modern.html',
      '/years/2018/sites/discord/index.html',
      '/years/2018/sites/amp/index.html',
      '/years/2018/sites/crypto/index.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('Musical.ly reverse / TikTok merge honesty', async ({ page }) => {
    await page.goto('/years/2018/sites/musically/index.html');
    await expect(page.locator('body')).toContainText(/Musical\.ly|TikTok|merge|Aug/i);
  });
});
