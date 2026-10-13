// @ts-check
/**
 * Boot every shipped year shell and confirm content iframe works.
 * Static matrix: `npm run check:years` / `python3 scripts/check-all-years.py`
 */
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, contentFrame } = require('./helpers');
const fs = require('fs');
const path = require('path');

/** Boarded plaque years: no visitor door. 2023–2025 have no tree. */
const BOARDED = new Set(['2023', '2024', '2025']);
/** Not a visitor door. 2011 has leftover rooms and no index.html. 2015 and 2017 have no tree. */
const OMITTED = new Set(['2011', '2015', '2017']);

/** Discover years/YYYY with index.html (skip research-only, boarded, and omitted). */
function shippedYears() {
  const yearsDir = path.join(__dirname, '..', 'years');
  return fs
    .readdirSync(yearsDir)
    .filter((name) => /^\d{4}$/.test(name))
    .filter((name) => !BOARDED.has(name) && !OMITTED.has(name))
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

test("2011 and 2017 are not shipped doors", () => {
  expect(YEARS).not.toContain("2011");
  expect(YEARS).not.toContain("2017");
  expect(YEARS).toHaveLength(22);
  const root = path.join(__dirname, "..");
  expect(fs.existsSync(path.join(root, "years", "2017"))).toBe(false);
  expect(fs.existsSync(path.join(root, "years", "2011", "index.html"))).toBe(false);
  expect(fs.existsSync(path.join(root, "years", "2011", "sites", "kindlefire", "index.html"))).toBe(true);
});

test.describe('omitted 2015 is not a door', () => {
  test('2015 has no hub card and hash is not a door', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card.available[data-year="2015"]')).toHaveCount(0);
    await expect(page.locator('.year-card.y2015')).toHaveCount(0);
    const res = await page.goto('/app/index.html#/year/2015');
    expect(res && res.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "2015 is not a door" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Periscope");
  });
});

test.describe('hub unlock consistency', () => {
  test('every hub available year has years/Y/index.html', async ({ page }) => {
    await page.goto('/');
    const years = await page.$$eval('a.year-card.available[data-year]', (els) =>
      els.map((e) => e.getAttribute('data-year')).filter(Boolean)
    );
    expect(years).toHaveLength(22);
    expect(years).not.toContain("2011");
    expect(years).not.toContain("2017");
    for (const y of years) {
      const res = await page.goto(`/years/${y}/`);
      expect(res && res.status(), `year ${y}`).toBeLessThan(400);
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
