// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2016 MVP', () => {
  test('shell boots with year-2016', async ({ page }) => {
    await page.goto('/years/2016/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2016');
  });

  test('home thesis + trails', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    await expect(page.locator('body')).toContainText(/2016|Stories|Pokémon|GO|Reactions|1,045,534,808/i);
    await expect(page.locator('a[href*="stories"]').first()).toBeVisible();
    await expect(page.locator('a[href*="pokemongo"]').first()).toBeVisible();
  });

  test('about dual-cite scale + bans', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText('1,045,534,808');
    await expect(page.locator('body')).toContainText('3,424,971,237');
    await expect(page.locator('body')).toContainText(/\+21%|\+21/);
    await expect(page.locator('body')).toContainText(/TikTok|Meta|Reels/i);
    await expect(page.locator('[data-itt-real-save]')).toBeVisible();
  });

  test('P0 rooms exist', async ({ page }) => {
    for (const path of [
      '/years/2016/sites/instagram/stories.html',
      '/years/2016/sites/pokemongo/index.html',
      '/years/2016/sites/facebook/reactions.html',
      '/years/2016/sites/iphone/jack.html',
      '/years/2016/sites/airpods/index.html',
      '/years/2016/sites/vine/goodbye.html',
      '/years/2016/sites/whatsapp/security.html',
      '/years/2016/sites/musically/create.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('home trail cards T1–T6 hrefs', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    for (const href of [
      'stories.html',
      'pokemongo',
      'reactions.html',
      'jack.html',
      'goodbye.html',
      'security.html',
    ]) {
      await expect(page.locator(`a[href*="${href}"]`).first()).toBeVisible();
    }
  });

  test('whats-new calendar loads', async ({ page }) => {
    const res = await page.goto('/years/2016/pages/whats-new.html');
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Aug 2|Jul 6|Feb 24|Oct 27/i);
  });
});
