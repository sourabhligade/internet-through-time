// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('2015 flows A–T smoke', () => {
  test('A shell · B about · C Watch · D Win10 · E Edge', async ({ page }) => {
    await page.goto('/years/2015/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2015');

    await page.goto('/years/2015/pages/about.html');
    await expect(page.locator('body')).toContainText('863,105,652');

    await page.goto('/years/2015/sites/apple/watch.html');
    await expect(page.locator('body')).toContainText(/April 24|Apr 24|shipped/i);

    await page.goto('/years/2015/sites/windows10/index.html');
    await expect(page.locator('body')).toContainText(/July 29|free upgrade/i);
    await expect(page.locator('body')).toContainText(/not ended/i);

    await page.goto('/years/2015/sites/edge/index.html');
    await expect(page.locator('body')).toContainText(/EdgeHTML|not Chromium/i);
  });

  test('F–I live + music + photos + blockers', async ({ page }) => {
    await page.goto('/years/2015/sites/periscope/index.html');
    await expect(page.locator('body')).toContainText(/Periscope|LIVE|March 26/i);

    await page.goto('/years/2015/sites/applemusic/index.html');
    await expect(page.locator('body')).toContainText(/Apple Music|trial|Beats/i);

    await page.goto('/years/2015/sites/googlephotos/index.html');
    await expect(page.locator('body')).toContainText(/Photos|unlimited|backup/i);

    await page.goto('/years/2015/sites/ios9/blockers.html');
    await expect(page.locator('body')).toContainText(/blocker|Safari|iOS 9/i);
  });

  test('map + whats-new', async ({ page }) => {
    await page.goto('/years/2015/pages/map.html');
    await expect(page.locator('body')).toContainText(/2015|flow|map|Watch|Win10|Periscope/i);

    await page.goto('/years/2015/pages/whats-new.html');
    await expect(page.locator('body')).toContainText(/2015|Watch|Windows 10|Music/i);
  });
});
