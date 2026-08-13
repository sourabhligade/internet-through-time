// @ts-check
const { test, expect } = require('@playwright/test');

async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

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

  test('empty title does not write · reload still shows published title', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt95-homestead');
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, 'sites/geocities/homestead.html');
    const frame = contentFrame(page);
    await expect(frame.locator('form[data-homestead-form]')).toBeVisible({ timeout: 20000 });
    await waitForImmersion(page, '1995');
    await frame.locator('input[name="title"]').fill('');
    await frame.locator('form[data-homestead-form] input[type="submit"]').click({ force: true });
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => localStorage.getItem('itt95-homestead'))).toBeFalsy();
    await frame.locator('select[name="neighborhood"]').selectOption('SiliconValley');
    await frame.locator('input[name="number"]').fill('4242');
    await frame.locator('input[name="title"]').fill('Reload Homestead');
    await frame.locator('textarea[name="about"]').fill('Gold wave persist.');
    await frame.locator('form[data-homestead-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-homestead-view]')).toContainText(/Reload Homestead/i, { timeout: 15000 });
    await goInFrame(page, 'sites/geocities/my-homestead.html');
    await waitForImmersion(page, '1995');
    await expect(frame.locator('[data-homestead-view]')).toContainText(/Reload Homestead/i, { timeout: 15000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt95-homestead') || '');
    expect(raw).toMatch(/multiStep|Reload Homestead/i);
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

  test('claimed homestead appears in webring with street address', async ({ page }) => {
    await enterYear(page, '1995');
    await page.evaluate(() => localStorage.removeItem('itt95-homestead'));
    await goInFrame(page, 'sites/geocities/homestead.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1995');
    await frame.locator('select[name="neighborhood"]').selectOption('Hollywood');
    await frame.locator('input[name="number"]').fill('7777');
    await frame.locator('input[name="title"]').fill('Ring Homestead');
    await frame.locator('textarea[name="about"]').fill('Street theater.');
    await frame.locator('form[data-homestead-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-homestead-addr]')).toContainText(/Hollywood\s*\/\s*7777/i, {
      timeout: 15000,
    });
    await expect(frame.locator('[data-webring]')).toContainText(/7777|yours|Hollywood/i, {
      timeout: 10000,
    });
  });
});
