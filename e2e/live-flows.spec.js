// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Live flows upgraded from flash-only theater (docs/FAKE-BUTTONS-AUDIT.md).
 * Content pages load immersion scripts directly (no chrome required).
 */

test.describe('Live flows — former theater CTAs', () => {
  test('1995 Amazon Eyes subscribe shows confirmation', async ({ page }) => {
    await page.goto('/years/1995/sites/amazon/eyes.html');
    await page.waitForTimeout(500);
    await page.fill('input[name="email"]', 'test@museum.local');
    await page.fill('input[name="authors"]', 'Gibson');
    await page.click('input[type="submit"]');
    await expect(page.locator('#itt-eyes-out')).toBeVisible({ timeout: 8000 });
    await expect(page.locator('#itt-eyes-out')).toContainText('test@museum.local');
    await expect(page.locator('#itt-eyes-out')).toContainText('Gibson');
  });

  test('1998 GameSpot download completes to Installed', async ({ page }) => {
    await page.goto('/years/1998/sites/gamespot/downloads.html');
    await page.waitForTimeout(500);
    const btn = page.locator('[data-itt-download]');
    await btn.click();
    await expect(page.locator('[data-itt-live-status]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-itt-live-status]')).toContainText(/Download complete/i, {
      timeout: 20000,
    });
    await expect(btn).toHaveValue(/Download complete|Finished|again/i);
  });

  test('2005 YouTube upload mutates itt05-yt-uploads', async ({ page }) => {
    // Replaces flaky data-yt-file-name assertion (file picker theater is optional)
    await page.goto('/years/2005/sites/youtube/upload.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-uploads');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[data-yt-upload] [name="title"]', 'zoo-clip museum');
    await page.locator('[data-yt-upload] button[type="submit"], [data-yt-upload] input[type="submit"]').first().click();
    await expect(page.locator('[data-yt-upload-status]')).toContainText(/upload|saved|list|itt05/i, {
      timeout: 8000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toMatch(/zoo-clip/i);
  });
});
