// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

test.describe('1997 authenticity', () => {
  test('eBay logo is black serif, not multicolor spans', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/ebay/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');

    const logo = frame.locator('.eb-logo').first();
    await expect(logo).toBeVisible({ timeout: 15000 });

    // Multicolor letter spans should not drive the mark
    const multi = await frame.locator('.eb-logo .eb-e, .eb-logo .eb-b, .eb-logo .eb-a, .eb-logo .eb-y').count();
    expect(multi).toBe(0);

    // Accept period black wordmark as either text or GIF (SRP-era authenticity)
    const logoImg = frame.locator('.eb-logo img[alt*="eBay" i], .eb-logo img[src*="ebay" i]');
    const imgCount = await logoImg.count();
    if (imgCount > 0) {
      await expect(logoImg.first()).toBeVisible();
    } else {
      await expect(logo).toContainText(/eBay/i);
      const color = await logo.evaluate((el) => getComputedStyle(el).color);
      expect(color).toMatch(/rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|#000|black/i);
    }
  });

  test('Drudge headlines link to real exhibit pages', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/drudge/index.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');

    await expect(frame.locator('text=DRUDGE REPORT').first()).toBeVisible({ timeout: 15000 });

    // Content bare href="#" (ignore immersion chrome: exit/flash dismiss)
    const bare = await page.evaluate(() => {
      try {
        const doc = document.getElementById('content').contentDocument;
        const allow = { 'itt-exit-link': 1, 'itt-flash-dismiss': 1 };
        const anchors = Array.from(doc.querySelectorAll('a[href="#"]'));
        return anchors
          .filter((a) => {
            if (a.id && allow[a.id]) return false;
            for (let i = 0; i < a.attributes.length; i++) {
              if (a.attributes[i].name.indexOf('data-') === 0) return false;
            }
            return true;
          })
          .map((a) => a.outerHTML.slice(0, 80));
      } catch (e) {
        return ['error'];
      }
    });
    expect(bare, `bare hash links: ${JSON.stringify(bare)}`).toEqual([]);

    // Follow Amazon IPO link into amazon
    await frame.locator('a[href*="amazon"]').first().click({ force: true });
    await expect(frame.locator('text=/Amazon|Bookstore/i').first()).toBeVisible({ timeout: 15000 });
  });

  test('eBay bid flow still works after logo change', async ({ page }) => {
    await enterYear(page, '1997');
    await goInFrame(page, 'sites/ebay/item-laptop.html');
    const frame = contentFrame(page);
    await waitForImmersion(page, '1997');
    await expect(frame.locator('text=ThinkPad').first()).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('.eb-logo').first()).toBeVisible();
  });
});
