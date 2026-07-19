// @ts-check
const { test, expect } = require('@playwright/test');

async function enterYear(page, year) {
  await page.goto(`/years/${year}/`);
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  }
  for (let i = 0; i < 3; i++) {
    const alert = page.locator('#dlg-alert:not(.hidden)');
    if (await alert.isVisible().catch(() => false)) {
      await page.locator('#dlg-alert-ok, [data-close="dlg-alert"]').first().click();
      await page.waitForTimeout(150);
    } else break;
  }
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('1995 immersion', () => {
  test('amazon add-to-cart writes localStorage', async ({ page }) => {
    await enterYear(page, '1995');

    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/amazon/book-neuromancer.html';
    });

    const frame = page.frameLocator('#content');
    const addBtn = frame.locator('[data-add-cart]').first();
    await expect(addBtn).toBeVisible({ timeout: 20000 });

    // Wait until immersion-core has attached (ITT boot + click handlers)
    await page.waitForFunction(() => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.documentElement.getAttribute('data-itt-immersion-booted') === '1995');
      } catch (e) {
        return false;
      }
    }, null, { timeout: 20000 });

    // Clear cart first for deterministic assert
    await page.evaluate(() => localStorage.setItem('itt95-amazon-cart', '[]'));

    await addBtn.click({ force: true });

    await expect.poll(async () => {
      return page.evaluate(() => {
        try {
          const raw = localStorage.getItem('itt95-amazon-cart');
          const arr = raw ? JSON.parse(raw) : [];
          return Array.isArray(arr) ? arr.length : 0;
        } catch (e) {
          return -1;
        }
      });
    }, { timeout: 15000 }).toBeGreaterThan(0);

    const cart = await page.evaluate(() => JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]'));
    expect(cart[0].title || cart[0].id).toBeTruthy();
  });
});
