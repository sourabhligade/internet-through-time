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

  test('2001 Wikipedia preview renders bold markup', async ({ page }) => {
    await page.goto('/years/2001/sites/wikipedia/edit.html');
    await page.waitForTimeout(500);
    await page.fill('textarea[name="text"]', "'''Hello Wiki''' is live.");
    await page.click('[data-wiki-preview]');
    const out = page.locator('[data-wiki-preview-out]');
    await expect(out).toBeVisible({ timeout: 8000 });
    await expect(out.locator('b').filter({ hasText: 'Hello Wiki' })).toBeVisible();
  });

  test('2002 TrackBack logs ping to status panel', async ({ page }) => {
    await page.goto('/years/2002/sites/movabletype/trackback.html');
    await page.waitForTimeout(500);
    await page.fill('input[type="text"]', 'http://example.com/mt-tb.cgi/99');
    await page.fill('textarea', 'Ping body from test');
    await page.click('input[type="submit"]');
    const out = page.locator('#tb-out');
    await expect(out).toBeVisible({ timeout: 8000 });
    await expect(out).toContainText(/TrackBack|Ping accepted/i);
    await expect(out).toContainText('example.com');
  });

  test('2004 Gmail archive removes selected conversation', async ({ page }) => {
    await page.goto('/years/2004/sites/gmail/inbox.html');
    await page.waitForTimeout(800);
    await expect(page.locator('[data-gmail-list] input[data-gmail-check]').first()).toBeVisible({
      timeout: 10000,
    });
    const before = await page.locator('[data-gmail-list] input[data-gmail-check]').count();
    expect(before).toBeGreaterThan(0);
    await page.locator('[data-gmail-list] input[data-gmail-check]').first().check();
    await page.click('[data-gmail-archive]');
    await page.waitForTimeout(500);
    const after = await page.locator('[data-gmail-list] input[data-gmail-check]').count();
    expect(after).toBe(before - 1);
  });

  test('2004 Firefox download progress completes', async ({ page }) => {
    await page.goto('/years/2004/sites/firefox/index.html');
    await page.waitForTimeout(500);
    await page.click('[data-itt-download]');
    await expect(page.locator('[data-itt-live-status]')).toContainText(/Download complete/i, {
      timeout: 20000,
    });
  });

  test('2005 YouTube login shows signed-in chrome', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/index.html');
    await page.waitForTimeout(600);
    await page.fill('[data-yt-user]', 'jawed');
    await page.fill('[data-yt-pass]', 'secret');
    await page.click('[data-yt-login]');
    await expect(page.locator('[data-yt-user-slot]')).toContainText('jawed', { timeout: 8000 });
    await expect(page.locator('[data-yt-logout]')).toBeVisible();
  });

  test('2005 YouTube upload navigates to watch', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await page.waitForTimeout(500);
    await page.fill('[name="title"]', 'Test Clip');
    await page.fill('[name="desc"]', 'desc');
    await page.fill('[name="tags"]', 'test');
    await page.setInputFiles('input[type="file"]', {
      name: 'zoo-clip.avi',
      mimeType: 'video/avi',
      buffer: Buffer.from('fake'),
    });
    await expect(page.locator('[data-yt-file-name]')).toContainText('zoo-clip.avi', {
      timeout: 5000,
    });
    await page.click('input[type="submit"]');
    await page.waitForURL(/watch\.html/, { timeout: 10000 });
  });
});
