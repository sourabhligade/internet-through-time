// @ts-check
const { test, expect } = require('@playwright/test');

async function enter1998(page) {
  await page.goto('/years/1998/');
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('1998 Excite (SRP personalize)', () => {
  test('toggle hides My News module via immersion/excite.js', async ({ page }) => {
    await enter1998(page);
    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/excite/index.html';
    });
    const frame = page.frameLocator('#content');
    await page.waitForFunction(() => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.documentElement.getAttribute('data-itt-immersion-booted') === '1998');
      } catch (e) {
        return false;
      }
    }, null, { timeout: 20000 });

    const mod = frame.locator('[data-excite-mod="news"]');
    await expect(mod).toBeVisible({ timeout: 15000 });
    await frame.locator('[data-excite-toggle="news"]').click();
    await expect(mod).toBeHidden({ timeout: 5000 });
  });
});
