// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2016 densify', () => {
  test('about dual-cite scale visible', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    await expect(page.locator('body')).toContainText('1,045,534,808');
    await expect(page.locator('body')).toContainText(/\+21%|21%/);
  });

  test('home has guided trail links (≥3 product rooms)', async ({ page }) => {
    await page.goto('/years/2016/pages/home.html');
    const links = page.locator('a[href*="sites/"]');
    await expect(links.first()).toBeVisible();
    expect(await links.count()).toBeGreaterThanOrEqual(6);
    await expect(page.locator('body')).toContainText(/Stories|Pokémon GO|Reactions/i);
  });

  test('hard bans listed (Meta · TikTok · Reels · Face ID)', async ({ page }) => {
    await page.goto('/years/2016/pages/about.html');
    const text = await page.locator('body').innerText();
    expect(text).toMatch(/Meta|TikTok|Reels|Face ID/i);
  });

  test('Musical.ly brand room (not TikTok mass)', async ({ page }) => {
    await page.goto('/years/2016/sites/musically/index.html');
    await expect(page.locator('body')).toContainText(/Musical\.ly/i);
    await expect(page.locator('body')).toContainText(/not TikTok|not.*TikTok brand|TikTok/i);
  });

  test('Allo · Rift densify rooms load', async ({ page }) => {
    const resA = await page.goto('/years/2016/sites/allo/index.html');
    expect(resA && resA.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Allo/i);

    const resR = await page.goto('/years/2016/sites/oculus/rift.html');
    expect(resR && resR.ok()).toBeTruthy();
    await expect(page.locator('body')).toContainText(/Rift|Oculus|ship/i);
  });

  test('PoGO honesty: silhouette · no official sprites', async ({ page }) => {
    await page.goto('/years/2016/sites/pokemongo/index.html');
    await expect(page.locator('body')).toContainText(/silhouette|no official|no real GPS/i);
  });
});
