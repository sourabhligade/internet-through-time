// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2002 Phase 9 pixels + P2 rooms', () => {
  test('XP start recon asset loads', async ({ page }) => {
    const res = await page.request.get('/assets/period/2002/xp/start.gif');
    expect(res.status()).toBe(200);
    const res2 = await page.request.get('/assets/period/2002/xp/taskbar.gif');
    expect(res2.status()).toBe(200);
  });

  test('P2 Netflix is DVD-by-mail not stream-now', async ({ page }) => {
    await page.goto('/years/2002/sites/netflix/index.html');
    await expect(page.getByText(/DVD/i).first()).toBeVisible();
    await expect(page.getByText(/stream now|watch instantly/i)).toHaveCount(0);
    await page.locator('input[type="submit"]').click();
    await expect(page.locator('#nf-out')).toBeVisible({ timeout: 5000 });
  });

  test('Steam install theater', async ({ page }) => {
    await page.goto('/years/2002/sites/steam/index.html');
    await page.waitForTimeout(500);
    await page.click('[data-itt-download]');
    await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
  });

  test('last.fm scrobble theater', async ({ page }) => {
    await page.goto('/years/2002/sites/lastfm/index.html');
    await page.waitForTimeout(300);
    await page.click('[data-lastfm-scrobble] button[type="submit"]');
    await expect(page.locator('[data-lastfm-status]')).toContainText(/Scrobbled/i);
  });

  test('ISP broadband landing', async ({ page }) => {
    await page.goto('/years/2002/sites/isp/index.html');
    await expect(page.getByText(/21%/)).toBeVisible();
    await page.click('[data-itt-download]');
    await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
  });

  test('home links to P2 rooms', async ({ page }) => {
    await page.goto('/years/2002/pages/home.html');
    for (const slug of ['netflix', 'steam', 'lastfm', 'isp']) {
      await expect(page.locator(`a[href*="${slug}"]`)).toBeVisible();
    }
  });
});
