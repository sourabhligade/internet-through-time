// @ts-check
/**
 * Boot every shipped year shell and confirm content iframe works.
 * Static matrix: `npm run check:years` / `python3 scripts/check-all-years.py`
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame } = require('./helpers');
const fs = require('fs');
const path = require('path');

/** Discover years/YYYY with index.html (skip research-only years). */
function shippedYears() {
  const yearsDir = path.join(__dirname, '..', 'years');
  return fs
    .readdirSync(yearsDir)
    .filter((name) => /^\d{4}$/.test(name))
    .filter((name) => fs.existsSync(path.join(yearsDir, name, 'index.html')))
    .sort();
}

const YEARS = shippedYears();

test.describe('all years smoke — shell boots', () => {
  for (const year of YEARS) {
    test(`${year}: shell boots · content iframe live`, async ({ page }) => {
      await enterYear(page, year);

      // URL is under /years/{year}/
      expect(page.url()).toMatch(new RegExp(`/years/${year}/`));

      // Body should be year shell (attribute on 1998+, class or label on older)
      const bodyYear =
        (await page.locator('body').getAttribute('data-itt-year')) ||
        (await page.locator('body').getAttribute('class')) ||
        '';
      const label = await page.locator('.year-label').innerText().catch(() => '');
      const yearMarked =
        bodyYear.includes(year) ||
        label.includes(year) ||
        (await page.content()).includes(`year-${year}`) ||
        (await page.content()).includes(`browser-${year}`);
      expect(yearMarked, `${year} shell should identify the year`).toBeTruthy();

      await expect(page.locator('#content')).toBeVisible();
      const frame = contentFrame(page);
      await expect(frame.locator('body')).toBeVisible({ timeout: 15000 });
      const htmlLen = await frame.locator('body').evaluate((el) => el.innerHTML.length);
      expect(htmlLen).toBeGreaterThan(40);
    });
  }
});

test.describe('all years smoke — home page direct', () => {
  for (const year of YEARS) {
    test(`${year}: pages/home.html loads`, async ({ page }) => {
      const home = `/years/${year}/pages/home.html`;
      const res = await page.goto(home);
      expect(res && res.ok()).toBeTruthy();
      await expect(page.locator('body')).toBeVisible();
      const hasImmersion = await page.locator('script[src*="immersion"]').count();
      expect(hasImmersion).toBeGreaterThan(0);
    });
  }
});

test.describe('hub unlock consistency', () => {
  test('every hub available year has years/Y/index.html', async ({ page }) => {
    await page.goto('/');
    const years = await page.$$eval('a.year-card.available[data-year]', (els) =>
      els.map((e) => e.getAttribute('data-year')).filter(Boolean)
    );
    expect(years.length).toBeGreaterThanOrEqual(10);
    for (const y of years) {
      const res = await page.goto(`/years/${y}/`);
      expect(res && res.status(), `year ${y}`).toBeLessThan(400);
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
