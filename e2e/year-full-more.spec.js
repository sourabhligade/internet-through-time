// @ts-check
/**
 * Two full era games per year (more-c / more-d).
 * Load / trap never write. ?test=1 Start writes REAL ittYY-game-*.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const matrix = require('./year-full-more.matrix.json').filter((row) =>
  fs.existsSync(path.join(__dirname, '..', 'years', row.year, 'index.html')) &&
  fs.existsSync(path.join(__dirname, '..', row.path.replace(/^\//, '')))
);

async function getKey(page, key) {
  return page.evaluate((k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }, key);
}

async function clearKey(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      /* */
    }
  }, key);
}

async function neighborLeaks(page, year) {
  const yy = String(year) === '1994' ? '94' : String(year).slice(2);
  return page.evaluate((y) => {
    const bad = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (/^itt\d{2}-/.test(k) && k.indexOf('itt' + y + '-') !== 0) bad.push(k);
    }
    return bad;
  }, yy);
}

const byYear = {};
for (const row of matrix) {
  if (!byYear[row.year]) byYear[row.year] = [];
  byYear[row.year].push(row);
}

for (const year of Object.keys(byYear).sort()) {
  test.describe(`full more ${year}`, () => {
    for (const spec of byYear[year]) {
      test(`${spec.slot} ${spec.id} incomplete then REAL`, async ({ page }) => {
        const dest = spec.path + '?test=1';
        await page.goto(dest);
        expect((await page.request.get(spec.path)).status(), spec.path).toBe(200);
        await clearKey(page, spec.key);
        await page.reload();
        const host = page.locator(`[data-full-more][data-game-id="${spec.id}"]`);
        await expect(host).toBeVisible({ timeout: 15000 });
        await expect(page.locator('[data-full-engine]')).toHaveAttribute('data-full-engine', spec.engine);

        expect(await getKey(page, spec.key)).toBeNull();

        await page.locator('[data-full-trap]').click();
        await expect.poll(async () => getKey(page, spec.key)).toBeFalsy();

        await page.locator('[data-game-start]').click();
        await expect.poll(async () => getKey(page, spec.key), { timeout: 8000 }).toBeTruthy();
        const blob = JSON.parse((await getKey(page, spec.key)) || '{}');
        expect(blob.real, spec.key + ' must be REAL').toBe(true);
        expect(blob.multiStep, spec.key + ' must be multi-step').toBe(true);
        expect(blob.fullMore, spec.key + ' must be fullMore').toBe(true);
        expect(String(blob.year)).toBe(String(spec.year));
        expect(await neighborLeaks(page, spec.year)).toEqual([]);
        if (spec.next) {
          const res = await page.request.get(spec.next);
          expect(res.status(), spec.next).toBe(200);
        }
      });
    }
  });
}
