// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1995 GeoCities homestead + webring', () => {
  test('homestead wizard writes localStorage and shows page', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.removeItem('itt95-homestead'));

    await goInFrame(page, 'sites/geocities/homestead.html');
    const frame = contentFrame(page);
    await expect(frame.locator('form[data-homestead-form]')).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, '1995');

    await frame.locator('select[name="neighborhood"]').selectOption('Hollywood');
    await frame.locator('input[name="number"]').fill('9999');
    await frame.locator('input[name="title"]').fill('E2E Homestead');
    await frame.locator('textarea[name="about"]').fill('Built by Playwright tests.');
    await frame.locator('form[data-homestead-form] input[type="submit"]').click({ force: true });

    // Navigates to my-homestead.html
    await expect(frame.locator('[data-homestead-view]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('body')).toContainText(/E2E Homestead|Homesteader|Hollywood/i);

    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const h = JSON.parse(localStorage.getItem('itt95-homestead') || 'null');
          return h && h.title === 'E2E Homestead' && h.number === '9999';
        } catch (e) {
          return false;
        }
      });
    }, { timeout: 10000 }).toBeTruthy();
  });

  test('sample homestead has webring prev/random/next', async ({ page }) => {
    await enterYear(page, '1995');
    await goInFrame(page, 'sites/geocities/Hollywood/1234/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1995');

    const ring = frame.locator('[data-webring]');
    await expect(ring).toBeVisible({ timeout: 15000 });
    await expect(ring).toContainText(/Webring|Prev|Random|Next/i);
    await expect(ring.locator('a').first()).toBeVisible();
  });
});
