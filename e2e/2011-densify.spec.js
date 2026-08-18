// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2011 leftover densify copy', () => {
  test('About social + bans', async ({ page }) => {
    await page.goto('/years/2011/pages/about.html');
    await expect(page.locator('body')).toContainText('#egypt');
    await expect(page.locator('body')).toContainText('800+ million');
    await expect(page.locator('body')).toContainText('48 hours');
  });

  test('G+ four pillars + 10-step trail', async ({ page }) => {
    await page.goto('/years/2011/sites/googleplus/index.html');
    await expect(page.locator('body')).toContainText('Circles');
    await expect(page.locator('body')).toContainText('Sparks');
    await expect(page.locator('body')).toContainText('Hangouts');
    await expect(page.locator('body')).toContainText('Instant Upload');
    await expect(page.locator('.itt-10-trail li')).toHaveCount(10);
  });

  test('Spotify SKUs + 22 Sep + no Facebook', async ({ page }) => {
    await page.goto('/years/2011/sites/spotify/index.html');
    await expect(page.locator('body')).toContainText('$4.99');
    await expect(page.locator('body')).toContainText('$9.99');
    await expect(page.locator('body')).toContainText('22 Sep');
    await expect(page.locator('body')).toContainText(/No Facebook/i);
  });

  test('iPad 2 Smart Cover + 3G', async ({ page }) => {
    await page.goto('/years/2011/sites/ipad/index.html');
    await expect(page.locator('body')).toContainText('Smart Cover');
    await expect(page.locator('body')).toContainText('$39');
    await expect(page.locator('body')).toContainText('$629');
  });

  test('4S langs + iCloud + leftover 4', async ({ page }) => {
    await page.goto('/years/2011/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText('French');
    await expect(page.locator('body')).toContainText('iCloud');
    await expect(page.locator('body')).toContainText('$199');
  });

  test('Timeline Cover + ticker', async ({ page }) => {
    await page.goto('/years/2011/sites/facebook/timeline.html');
    await expect(page.locator('body')).toContainText('Cover');
    await expect(page.locator('body')).toContainText(/ticker/i);
  });

  test('Netflix 30% traffic + Qwikster', async ({ page }) => {
    await page.goto('/years/2011/sites/netflix/index.html');
    await expect(page.locator('body')).toContainText('30%');
    await expect(page.locator('body')).toContainText('Qwikster');
  });

  test('YouTube 48 hours + play control', async ({ page }) => {
    await page.goto('/years/2011/sites/youtube/index.html');
    await expect(page.locator('body')).toContainText('48 hours');
    await expect(page.locator('[data-yt-play]')).toBeVisible();
    await page.locator('[data-yt-play]').click();
    await expect(page.locator('[data-yt-share-bridges] a').first()).toBeVisible({ timeout: 15000 });
    const hrefs = await page.locator('[data-yt-share-bridges] a').evaluateAll((as) =>
      as.map((a) => a.getAttribute('href') || '')
    );
    for (const h of hrefs) {
      const url = new URL(h, page.url());
      expect((await page.request.get(url.pathname)).status(), url.pathname).toBe(200);
    }
  });
});
