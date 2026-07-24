// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('shell chrome (cross-year)', () => {
  test('skip dial-up reveals browser chrome for 1995 and 1998', async ({ page }) => {
    for (const year of ['1995', '1998']) {
      await page.goto(`/years/${year}/`);
      const overlay = page.locator('#connect-overlay');
      // Overlay may already be visible before skip
      const skip = page.locator('#skip-connect');
      if (await skip.isVisible().catch(() => false)) {
        await skip.click();
      }
      await expect(page.locator('#content')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('#location')).toBeVisible();
      await expect(page.locator('#btn-home')).toBeVisible();
      await expect(page.locator('#btn-back')).toBeVisible();
      // connect overlay should not block
      await expect(overlay).toBeHidden({ timeout: 10000 }).catch(async () => {
        // some years remove overlay from flow via class
        const hidden = await overlay.evaluate((el) => {
          return el.classList.contains('hidden') || getComputedStyle(el).display === 'none';
        }).catch(() => true);
        expect(hidden).toBeTruthy();
      });
    }
  });

  test('home button returns to starting point', async ({ page }) => {
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('body')).toContainText(/Google/i, { timeout: 15000 });

    await page.locator('#btn-home').click();
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = f && (f.getAttribute('src') || '');
        return /pages\/home\.html|home\.html/i.test(src);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });

    await expect(contentFrame(page).locator('body')).toContainText(/Welcome|World Wide Web|Start here/i, {
      timeout: 15000,
    });
  });

  test('location bar hint: type yahoo then Enter (1995)', async ({ page }) => {
    await enterYear(page, '1995');
    const loc = page.locator('#location');
    await loc.fill('yahoo');
    await loc.press('Enter');
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = (f && f.getAttribute('src')) || '';
        return /yahoo/i.test(src);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await waitForImmersion(page, '1995');
    await expect(contentFrame(page).locator('body')).toContainText(/Yahoo/i, { timeout: 15000 });
  });

  test('location bar hint: type google then Enter (1998)', async ({ page }) => {
    await enterYear(page, '1998');
    const loc = page.locator('#location');
    await loc.fill('google');
    await loc.press('Enter');
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = (f && f.getAttribute('src')) || '';
        return /google/i.test(src);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('body')).toContainText(/Google/i, { timeout: 15000 });
  });
});
