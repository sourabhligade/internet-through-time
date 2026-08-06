// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2015 densify', () => {
  test('about dual-cite scale visible', async ({ page }) => {
    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText('863,105,652');
    await expect(page.locator('body')).toContainText(/−11%|-11%/);
    await expect(page.locator('body')).toContainText('3,185,996,155');
  });

  test('home has guided trail links (≥3 product rooms)', async ({ page }) => {
    await page.goto('/years/2015/pages/home.html');
    const links = page.locator('a[href*="sites/"]');
    await expect(links.first()).toBeVisible();
    expect(await links.count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('body')).toContainText(/Watch|Windows 10|Periscope|Apple Music/i);
  });

  test('hard bans listed (no Stories / Reactions / PoGO / Meta as 2015 defaults)', async ({
    page,
  }) => {
    await page.goto('/years/2015/pages/about.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Stories/i);
    expect(text).toMatch(/Reactions|Meta|Pokémon GO|TikTok/i);
  });

  test('Discord / Discover densify rooms load', async ({ page }) => {
    const resD = await page.goto('/years/2015/sites/discord/index.html');
    expect(resD && resD.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Discord/i);

    const resS = await page.goto('/years/2015/sites/snapchat/discover.html');
    expect(resS && resS.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Discover/i);
  });

  test('Echo mass + Let\'s Encrypt rooms load', async ({ page }) => {
    await page.goto('/years/2015/sites/echo/index.html');
    await expect(page.locator('body')).toContainText(/Echo|Alexa/i);
    await page.goto('/years/2015/sites/letsencrypt/index.html');
    await expect(page.locator('body')).toContainText(/Let.?s Encrypt|HTTPS|free cert/i);
  });

  test('IG residual has no Stories tray as 2015 product', async ({ page }) => {
    await page.goto('/years/2015/sites/instagram/index.html');
    const text = await page.locator('body').innerText();
    // May mention Stories as ban/future, but must not claim Aug 2016 launch as shipped
    expect(text).not.toMatch(/Aug(?:ust)?\s*2,?\s*2016.*shipped|Stories launched here in 2015/i);
  });
});
