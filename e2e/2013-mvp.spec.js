// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2013 MVP', () => {
  test('shell boots 2013', async ({ page }) => {
    await enterYear(page, '2013');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2013');
    await expect(page.locator('#content, iframe, .content-frame').first()).toBeVisible({ timeout: 15000 });
  });

  test('home lists P0 thesis', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Vine/i);
    expect(text).toMatch(/iOS 7|Stories|Snowden|672,985,183/i);
  });

  test('about dual scale and bans', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('body')).toContainText('672,985,183');
    await expect(page.locator('body')).toContainText(/861|850/);
    await expect(page.locator('body')).toContainText(/Stories|TikTok|Reactions|Meta/i);
  });

  test('Vine post theater storage', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await page.evaluate(() => localStorage.removeItem('itt13-vine-posts'));
    await page.reload();
    await page.locator('[data-vine-hold]').dispatchEvent('mousedown');
    await page.waitForTimeout(400);
    await page.locator('[data-vine-hold]').dispatchEvent('mouseup');
    await page.locator('[data-vine-post]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt13-vine-posts'));
    expect(raw).toBeTruthy();
    expect(raw).toMatch(/caption|secs|untitled/i);
  });

  test('shell dirbar has Vine', async ({ page }) => {
    await enterYear(page, '2013');
    await expect(page.locator('#dirbar .dir-btn, .dir-btn', { hasText: 'Vine' }).first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('window title is 2013 not scaffold 2004', async ({ page }) => {
    await enterYear(page, '2013');
    const title = (await page.locator('#window-title').textContent()) || '';
    expect(title).toMatch(/2013/);
    expect(title).not.toMatch(/2004/);
  });

  test('about has Bitcoin news note control', async ({ page }) => {
    await page.goto('/years/2013/pages/about.html');
    await expect(page.locator('[data-btc-note]')).toBeVisible();
    await expect(page.locator('body')).toContainText(/Silk Road|Bitcoin/i);
  });
});

