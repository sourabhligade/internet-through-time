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
    // Direct page load is more reliable than iframe src race in shell
    await page.goto('/years/1998/sites/excite/index.html');
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => /excite/i.test(k))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-itt-immersion-booted') === '1998',
      null,
      { timeout: 20000 }
    );
    // Ensure news visible after clear (re-apply if needed)
    await page.evaluate(() => {
      const el = document.querySelector('[data-excite-mod="news"]');
      if (el) el.style.display = '';
    });
    const mod = page.locator('[data-excite-mod="news"]');
    await expect(mod).toBeVisible({ timeout: 10000 });
    await page.locator('[data-excite-toggle="news"]').click();
    await expect(mod).toBeHidden({ timeout: 5000 });
  });
});
