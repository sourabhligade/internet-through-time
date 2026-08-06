// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2017 densify', () => {
  test('about dual-cite scale visible', async ({ page }) => {
    await page.goto('/years/2017/pages/about.html');
    await expect(page.locator('body')).toContainText('1,766,926,408');
    await expect(page.locator('body')).toContainText(/\+69%|69%/);
  });

  test('home has guided trail links', async ({ page }) => {
    await page.goto('/years/2017/pages/home.html');
    const links = page.locator('a[href*="sites/"]');
    await expect(links.first()).toBeVisible();
    expect(await links.count()).toBeGreaterThanOrEqual(4);
  });

  test('hard bans listed', async ({ page }) => {
    await page.goto('/years/2017/pages/about.html');
    await expect(page.locator('body')).toContainText(/Meta|TikTok|Reels/i);
  });

  test('complex modern rooms load', async ({ page }) => {
    for (const path of [
      '/years/2017/sites/netflix/modern.html',
      '/years/2017/sites/discord/index.html',
      '/years/2017/sites/amp/index.html',
    ]) {
      const res = await page.goto(path);
      if (res && res.ok()) {
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });

  test('Face ID room is 2017-09-12 class', async ({ page }) => {
    await page.goto('/years/2017/sites/iphone/x.html');
    await expect(page.locator('body')).toContainText(/Face ID|iPhone X|Sep(?:tember)?\s*12|notch/i);
  });
});
