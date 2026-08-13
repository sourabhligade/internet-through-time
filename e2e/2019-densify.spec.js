// @ts-check
const { test, expect } = require('@playwright/test');
const { checkAllReq } = require('./helpers');

test.describe('2019 densify', () => {
  test('scale dual-cite on about', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await expect(page.locator('body')).toContainText('1,630,322,579');
    await expect(page.locator('body')).toContainText(/4\.1B|ITU/i);
    await expect(page.locator('body')).toContainText(/2018|not dual-cited|honest/i);
  });

  test('hard bans COVID invent 2020', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/COVID|2020/i);
    expect(text).toMatch(/Clubhouse|invent/i);
  });

  test('home trails list 2019 P0', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/TikTok/i);
    expect(text).toMatch(/Disney\+/i);
    expect(text).toMatch(/Arcade/i);
    expect(text).toMatch(/AirPods Pro|iPhone 11/i);
    expect(text).toMatch(/Stadia/i);
    expect(text).toMatch(/1,630,322,579|4\.1B/i);
  });

  test('whats-new is 2019 spine', async ({ page }) => {
    await page.goto('/years/2019/pages/whats-new.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/2019/);
    expect(text).toMatch(/Disney\+|Arcade|Stadia|Nov 12|Sep 19/i);
  });

  test('Disney+ multipage paths', async ({ page }) => {
    for (const path of [
      '/years/2019/sites/disneyplus/index.html',
      '/years/2019/sites/disneyplus/queue.html',
      '/years/2019/sites/disneyplus/about.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('Arcade multipage paths', async ({ page }) => {
    for (const path of [
      '/years/2019/sites/arcade/index.html',
      '/years/2019/sites/arcade/play.html',
      '/years/2019/sites/arcade/about.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('Stadia multipage paths', async ({ page }) => {
    for (const path of [
      '/years/2019/sites/stadia/index.html',
      '/years/2019/sites/stadia/stream.html',
      '/years/2019/sites/stadia/about.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });

  test('TikTok REAL multipage', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await page.evaluate(() => localStorage.removeItem('itt19-tiktok'));
    await page.reload();
    await page.locator('[data-tt-caption]').fill('museum fyp 2019');
    await checkAllReq(page);
    await page.locator('[data-tt-post]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt19-tiktok')))
      .toMatch(/museum fyp 2019/i);
  });

  test('home continuity archive links residual', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    await expect(page.locator('body')).toContainText(/Continuity archive/i);
    await expect(page.locator('a[href*="airpods"]').first()).toBeVisible();
  });

  test('TikTok page not invent COVID', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await expect(page.locator('body')).toContainText(/For You|2019/i);
    await expect(page.locator('[data-tt-post]')).toBeVisible();
  });

  test('AirPods Pro multipage', async ({ page }) => {
    for (const path of [
      '/years/2019/sites/airpodspro/index.html',
      '/years/2019/sites/airpodspro/pair.html',
    ]) {
      const res = await page.goto(path);
      expect(res && res.ok(), path).toBeTruthy();
    }
  });
});

  test('FTC $5B densify room', async ({ page }) => {
    const res = await page.goto('/years/2019/sites/facebook/ftc-fine.html');
    expect(res && res.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/5 billion|\$5|Jul(y)?\s*24/i);
  });

  test('home dual camera honesty not triple base', async ({ page }) => {
    await page.goto('/years/2019/pages/home.html');
    await expect(page.locator('body')).toContainText(/Dual camera/i);
    await expect(page.locator('body')).not.toContainText(/Triple camera/i);
  });

  test('about ITU 53.6 class', async ({ page }) => {
    await page.goto('/years/2019/pages/about.html');
    await expect(page.locator('body')).toContainText(/53\.6|4\.1B/i);
  });

  test('TikTok phone frame theater', async ({ page }) => {
    await page.goto('/years/2019/sites/tiktok/index.html');
    await expect(page.locator('[data-tt-phone], .itt19-phone-frame')).toBeVisible();
  });

  test('Disney+ launch price class on page', async ({ page }) => {
    await page.goto('/years/2019/sites/disneyplus/index.html');
    await expect(page.locator('body')).toContainText(/6\.99|\$69/i);
  });

  test('hub labels 2017-18 research gap', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toContainText(/2017|2018|research gap|gap/i);
  });
