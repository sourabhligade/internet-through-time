// @ts-check
/**
 * 2014 densify — year spine, bans, P0 dates, densify gems (museum L3 bar).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, completeRealGate, checkAllReq } = require('./helpers');

test.describe('2014 densify', () => {
  test('scale dual-cite on about', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText('968,882,453');
    await expect(page.locator('body')).toContainText('2,925,249,355');
    await expect(page.locator('body')).toContainText(/1 billion|Sep 2014|September 2014/i);
  });

  test('hard bans Stories Reactions Meta Watch retail Win10 retail', async ({ page }) => {
    await page.goto('/years/2014/pages/about.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Stories/i);
    expect(text).toMatch(/TikTok|Reactions|Meta/i);
    expect(text).toMatch(/Watch|2015/i);
    expect(text).toMatch(/Windows 10|Win10|retail|Technical Preview/i);
  });

  test('home trails list P0 products', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/WhatsApp/);
    expect(text).toMatch(/Heartbleed/);
    expect(text).toMatch(/iPhone 6/);
    expect(text).toMatch(/968,882,453|1B|1 billion/i);
    expect(text).toMatch(/Secret|Yik Yak|Ello|Hyperlapse/i);
  });

  test('whats-new is 2014 spine', async ({ page }) => {
    await page.goto('/years/2014/pages/whats-new.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/2014/);
    expect(text).not.toMatch(/What.?s New in 2013/i);
    expect(text).toMatch(/WhatsApp|Heartbleed|iPhone 6|Feb 19/i);
  });

  test('WhatsApp deal honesty Feb 19', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/about.html');
    await expect(page.locator('body')).toContainText(/Feb(ruary)?\s*19|2014/i);
    await expect(page.locator('body')).toContainText(/\$19|16|billion|acquisition|deal/i);
  });

  test('Heartbleed CVE-2014-0160', async ({ page }) => {
    await page.goto('/years/2014/sites/heartbleed/index.html');
    await expect(page.locator('body')).toContainText(/CVE-2014-0160/);
  });

  test('iPhone 6 prices Pay Bendgate paths', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/\$199|4\.7|iPhone 6/i);
    await page.goto('/years/2014/sites/iphone/plus.html');
    await expect(page.locator('body')).toContainText(/5\.5|Plus|\$299/i);
    await page.goto('/years/2014/sites/iphone/pay.html');
    await expect(page.locator('body')).toContainText(/Apple Pay/i);
    await page.goto('/years/2014/sites/iphone/bendgate.html');
    await expect(page.locator('body')).toContainText(/Bendgate|bend/i);
  });

  test('Watch pre-ship 2015', async ({ page }) => {
    await page.goto('/years/2014/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ships 2015|2015/i);
  });

  test('Win10 Technical Preview not retail', async ({ page }) => {
    await page.goto('/years/2014/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Technical Preview|Insider/i);
    await expect(page.locator('body')).toContainText(/not retail|not.*mass|Win7 residual/i);
  });

  test('Ice Bucket Serial billion rooms', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await expect(page.locator('body')).toContainText(/Ice Bucket|ALS/i);
    await page.goto('/years/2014/sites/serial/index.html');
    await expect(page.locator('body')).toContainText(/Serial|October 3/i);
    await page.goto('/years/2014/sites/billion/index.html');
    await expect(page.locator('body')).toContainText(/968,882,453|1 billion/i);
  });

  test('P1 empire rooms load', async ({ page }) => {
    for (const path of [
      '/years/2014/sites/twitch/index.html',
      '/years/2014/sites/oculus/index.html',
      '/years/2014/sites/alibaba/index.html',
      '/years/2014/sites/material/index.html',
      '/years/2014/sites/echo/index.html',
    ]) {
      await page.goto(path);
      await expect(page.locator('body')).toContainText(/2014|Amazon|Facebook|IPO|Material|Echo/i);
      await expect(page.locator('[data-req]').first()).toBeVisible();
    }
  });

  test('nav shell has year 2014', async ({ page }) => {
    await enterYear(page, '2014');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2014');
    await expect(page.locator('#content')).toBeVisible();
  });

  test('Instagram residual bans Stories product', async ({ page }) => {
    await page.goto('/years/2014/sites/instagram/index.html');
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/Instagram Stories is live for everyone/i);
  });

  test('Secret densify gem multipage REAL', async ({ page }) => {
    await page.goto('/years/2014/sites/secret/compose.html');
    await page.evaluate(() => localStorage.removeItem('itt14-secret-posts'));
    await page.reload();
    await page.locator('[data-secret-text]').fill('museum secret 2014');
    await page.locator('[data-secret-ack]').check();
    await page.locator('[data-secret-compose]').evaluate((f) => f.requestSubmit());
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-secret-posts')))
      .toMatch(/museum secret 2014/i);
  });

  test('Yik Yak herd REAL', async ({ page }) => {
    await page.goto('/years/2014/sites/yikyak/herd.html');
    await page.evaluate(() => localStorage.removeItem('itt14-yikyak-yaks'));
    await page.reload();
    await page.locator('[data-yikyak-text]').fill('library is packed');
    await page.locator('[data-yikyak-lit]').check();
    await page.locator('[data-yikyak-compose]').evaluate((f) => f.requestSubmit());
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-yikyak-yaks')))
      .toMatch(/library is packed/i);
  });

  test('Ello multi-step REAL', async ({ page }) => {
    await page.goto('/years/2014/sites/ello/index.html');
    await page.evaluate(() => localStorage.removeItem('itt14-ello-ack'));
    await page.reload();
    await checkAllReq(page);
    await page.locator('[data-ello-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-ello-ack')))
      .toBeTruthy();
  });

  test('Hyperlapse export REAL not Reels', async ({ page }) => {
    await page.goto('/years/2014/sites/hyperlapse/export.html');
    await page.evaluate(() => localStorage.removeItem('itt14-hyperlapse-export'));
    await page.reload();
    await expect(page.locator('body')).toContainText(/not Reels/i);
    await page.locator('[data-hyperlapse-clip]').check();
    await page.locator('[data-hyperlapse-ig]').check();
    await page.locator('[data-hyperlapse-export]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-hyperlapse-export')))
      .toBeTruthy();
  });
});
