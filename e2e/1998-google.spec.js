// @ts-check
const { test, expect } = require('@playwright/test');

async function enter1998(page) {
  await page.goto('/years/1998/');
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) await skip.click();
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

test.describe('1998 Google', () => {
  test('Google home is sparse and branded Google!', async ({ page }) => {
    await enter1998(page);
    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/google/index.html';
    });
    const frame = page.frameLocator('#content');
    await expect(frame.locator('body')).toContainText('Google', { timeout: 20000 });
    await expect(frame.locator('form[data-google-search]')).toBeVisible();
    await expect(frame.locator('body')).toContainText('1998');
  });

  test('Google search shows catalog results', async ({ page }) => {
    await enter1998(page);
    await page.evaluate(() => {
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = 'sites/google/search.html?q=yahoo';
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
    await expect(frame.locator('[data-google-results]')).toContainText('Yahoo', { timeout: 15000 });
  });
});

test.describe('1998 Google Feeling Lucky', () => {
  test("I'm feeling lucky navigates to a catalog result", async ({ page }) => {
    const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '1998');
    const frame = contentFrame(page);

    await frame.locator('input[name="q"]').fill('yahoo');
    await frame.locator('input[data-google-lucky], input[name="btnI"]').first().click();

    // Lucky should leave google home for a catalog destination (often yahoo)
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = (f && f.getAttribute('src')) || '';
        const path = f && f.contentWindow && f.contentWindow.location && f.contentWindow.location.pathname;
        const combined = src + (path || '');
        return /yahoo|amazon|ebay|excite|cnn|google\/about/i.test(combined);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });

    await waitForImmersion(page, '1998');
    // Should not still be only the empty Google home form-only state without navigation
    const body = await contentFrame(page).locator('body').innerText();
    expect(body.length).toBeGreaterThan(20);
  });
});
