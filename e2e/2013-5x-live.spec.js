// @ts-check
/**
 * 2013 lean 5× — trails 10→50 dest live · atlas · pack leftover
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function yearTrailHrefs(year) {
  const hrefs = [];
  const re = /"href"\s*:\s*"(sites\/[^"]+|pages\/[^"]+)"/g;
  const slice = (src) => {
    const i = src.indexOf('"' + year + '"');
    if (i < 0) return '';
    const j = src.indexOf(']', i);
    return src.slice(i, j + 1);
  };
  for (const name of ['flow-trails.js', 'flow-trails-5x.js']) {
    const src = slice(fs.readFileSync(path.join(ROOT, 'js/config', name), 'utf8'));
    let m;
    while ((m = re.exec(src))) hrefs.push(m[1]);
    re.lastIndex = 0;
  }
  return [...new Set(hrefs)];
}

test.describe('2013 5× live', () => {
  test('50 trail dests are live on-disk rooms', async ({ page }) => {
    const extra = fs.readFileSync(path.join(ROOT, 'js/config/flow-trails-5x.js'), 'utf8');
    const i = extra.indexOf('"2013"');
    expect(i).toBeGreaterThan(0);
    const j = extra.indexOf(']', i);
    const ns = (extra.slice(i, j + 1).match(/"n"\s*:\s*(\d+)/g) || []).length;
    expect(ns, '5x extra n=11–50').toBe(40);
    const hrefs = yearTrailHrefs('2013');
    expect(hrefs.length).toBeGreaterThanOrEqual(10);
    for (const href of hrefs) {
      expect((await page.request.get('/years/2013/' + href)).status(), href).toBe(200);
    }
  });

  test('home atlas chips dest 200 · guided 6 · Connection trails', async ({ page }) => {
    await page.goto('/years/2013/pages/home.html');
    await expect(page.locator('body')).toContainText(/Connection trails/i);
    await expect(page.locator('#ott-guided-2013 ol > li')).toHaveCount(6);
    const n = await page.locator('[data-itt-5x-atlas] a').count();
    expect(n).toBeGreaterThan(5);
    const hrefs = await page.locator('[data-itt-5x-atlas] a').evaluateAll((els) =>
      els.map((a) => a.getAttribute('href') || '')
    );
    for (const href of hrefs) {
      const dest = new URL(href, page.url());
      expect((await page.request.get(dest.pathname)).status(), dest.pathname).toBe(200);
    }
  });
});
