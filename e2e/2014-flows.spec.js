// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2014 flows A–T smoke', () => {
  test('A shell · B about · C/D whatsapp · E heartbleed path', async ({ page }) => {
    await page.goto('/years/2014/');
    await expect(page.locator('body.year-2014')).toBeVisible();

    await page.goto('/years/2014/pages/about.html');
    await expect(page.locator('body')).toContainText(/968,882,453/);

    await page.goto('/years/2014/sites/whatsapp/index.html');
    await expect(page.locator('body')).toContainText(/Feb 19|2014|WhatsApp/i);

    await page.goto('/years/2014/sites/heartbleed/index.html');
    await expect(page.locator('body')).toContainText(/CVE-2014-0160/);
  });

  test('F–I Apple autumn path', async ({ page }) => {
    await page.goto('/years/2014/sites/iphone/index.html');
    await expect(page.locator('body')).toContainText(/\$199|4\.7|iPhone 6/i);
    await page.goto('/years/2014/sites/iphone/plus.html');
    await expect(page.locator('body')).toContainText(/5\.5|\$299|Plus/i);
    await page.goto('/years/2014/sites/iphone/pay.html');
    await expect(page.locator('body')).toContainText(/Apple Pay/i);
    await page.goto('/years/2014/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/ships 2015|2015/i);
  });

  test('J–M virality + desktop', async ({ page }) => {
    await page.goto('/years/2014/sites/icebucket/index.html');
    await expect(page.locator('body')).toContainText(/Ice Bucket|ALS/i);
    await page.goto('/years/2014/sites/serial/index.html');
    await expect(page.locator('body')).toContainText(/Serial|October 3/i);
    await page.goto('/years/2014/sites/billion/index.html');
    await expect(page.locator('body')).toContainText(/968,882,453/);
    await page.goto('/years/2014/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/Technical Preview/i);
    await expect(page.locator('body')).not.toContainText(/free upgrade now for everyone as 2014 default/i);
  });

  test('map + whats-new', async ({ page }) => {
    await page.goto('/years/2014/pages/map.html');
    await expect(page.locator('body')).toContainText(/2014|flow|map|WhatsApp|Heartbleed/i);
    await page.goto('/years/2014/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/Feb 19|Heartbleed|iPhone 6/i);
  });
});
