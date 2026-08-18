// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2010 leftover densify copy', () => {
  test('About Pingdom social + bans table', async ({ page }) => {
    await page.goto('/years/2010/pages/about.html');
    await expect(page.locator('body')).toContainText('206,956,723');
    await expect(page.locator('body')).toContainText('255 million');
    await expect(page.locator('body')).toContainText('600 million');
    await expect(page.locator('body')).toContainText('35 hours');
    await expect(page.locator('body')).toContainText('iPad 2');
  });

  test('Instagram instagr.am + 25,000 + iOS', async ({ page }) => {
    await page.goto('/years/2010/sites/instagram/index.html');
    await expect(page.locator('body')).toContainText('instagr.am');
    await expect(page.locator('body')).toContainText('25,000');
    await expect(page.locator('body')).toContainText(/iOS|iPhone only/i);
  });

  test('iPad full prices + 300,000', async ({ page }) => {
    await page.goto('/years/2010/sites/ipad/index.html');
    await expect(page.locator('body')).toContainText('$499');
    await expect(page.locator('body')).toContainText('$629');
    await expect(page.locator('body')).toContainText('300,000');
  });

  test('iPhone 4 prices + Retina + Apple letter', async ({ page }) => {
    await page.goto('/years/2010/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText('$199');
    await expect(page.locator('body')).toContainText('326');
    await expect(page.locator('body')).toContainText('Apple statement');
    await expect(page.locator('body')).not.toContainText('2 Jul Jobs letter');
  });

  test('FarmVille wilt + October slide', async ({ page }) => {
    await page.goto('/years/2010/sites/farmville/index.html');
    await expect(page.locator('body')).toContainText('83.76');
    await expect(page.locator('body')).toContainText('60 million');
    await expect(page.locator('body')).toContainText('2.5');
  });

  test('map lists Wave Digg Uber Cablegate', async ({ page }) => {
    await page.goto('/years/2010/pages/map.html');
    await expect(page.locator('a[href*="wave"]').first()).toBeVisible();
    await expect(page.locator('a[href*="digg"]').first()).toBeVisible();
    await expect(page.locator('a[href*="uber"]').first()).toBeVisible();
    await expect(page.locator('a[href*="wikileaks"]').first()).toBeVisible();
  });
});
