// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1997 Slashdot + PointCast', () => {
  test('Slashdot comment posts to localStorage', async ({ page }) => {
    await enterYear(page, '1997');
    await page.evaluate(() => localStorage.removeItem('itt97-sd-comments-ie4'));
    await goInFrame(page, 'sites/slashdot/story.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');
    await expect(frame.locator('form[data-sd-comment-form]')).toBeVisible({ timeout: 15000 });
    await frame.locator('input[name="nick"]').fill('TestNerd');
    await frame.locator('input[name="subject"]').fill('E2E comment');
    await frame.locator('textarea[name="body"]').fill('Posted by Playwright.');
    await frame.locator('form[data-sd-comment-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-sd-comments]')).toContainText(/E2E comment|TestNerd|Playwright/i, {
      timeout: 10000,
    });
    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const raw = localStorage.getItem('itt97-sd-comments-ie4');
          return !!(raw && raw.indexOf('E2E comment') !== -1);
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 8000 }).toBeTruthy();
  });

  test('PointCast channels page loads', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/pointcast/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');
    await expect(frame.locator('text=/PointCast/i').first()).toBeVisible({ timeout: 10000 });
    await frame.locator('a[href*="channels"]').first().click({ force: true });
    await expect(frame.locator('text=/Channel/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('Amazon Book of the Day renders', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/amazon/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');
    await expect(frame.locator('[data-book-of-day]')).toBeVisible({ timeout: 10000 });
    await expect(frame.locator('[data-book-of-day]')).not.toBeEmpty();
  });
});
