// @ts-check
const { test, expect } = require('@playwright/test');

const OPEN = ['1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008'];
const LOCKED = [];

test.describe('hub + year shells', () => {
  test('hub lists 1994–2008 as available', async ({ page }) => {
    await page.goto('/');
    for (const y of OPEN) {
      await expect(page.locator(`a.year-card.available[href*="years/${y}"]`)).toBeVisible();
    }
    for (const y of LOCKED) {
      await expect(page.locator(`a.year-card[href*="years/${y}"]`)).toHaveCount(0);
      await expect(page.locator(`.year-card.locked.y${y}`)).toBeVisible();
    }
  });

  test('hub year cards use period class skins + data-year', async ({ page }) => {
    await page.goto('/');
    for (const y of OPEN) {
      const card = page.locator(`a.year-card.available.y${y}[href*="years/${y}"]`);
      await expect(card).toBeVisible();
      await expect(card).toHaveAttribute('data-year', y);
      await expect(card.locator('.year-card-inner .year')).toHaveText(y);
      await expect(card.locator('.motif')).toHaveCount(1);
    }
    // Distinct era chrome strips (period UI match)
    await expect(page.locator('.y1994')).toBeVisible();
    await expect(page.locator('.y2005')).toBeVisible();
    await expect(page.locator('.y2006')).toBeVisible();
    await expect(page.locator('.y2007')).toBeVisible();
    await expect(page.locator('.y2008')).toBeVisible();
    await expect(page.locator('body')).toContainText(/15 years open|1994–2008/i);
    await expect(page.locator('a.start-btn[href*="years/2007"]')).toBeVisible();
    await expect(page.locator('a.start-btn[href*="years/2008"]')).toBeVisible();
  });

  test('hub compare includes 2006–2007', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.compare-late')).toBeVisible();
    await expect(page.locator('.compare-late')).toContainText('2006');
    await expect(page.locator('.compare-late')).toContainText('2007');
    await expect(page.locator('.compare-late')).toContainText(/iPhone|Street View|Platform/i);
  });

  for (const year of OPEN) {
    test(`${year} shell boots with content iframe`, async ({ page }) => {
      await page.goto(`/years/${year}/`);
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
      await expect(page.locator('#content')).toBeVisible();
      await expect(page.locator('#location')).toBeVisible();
    });
  }
});
