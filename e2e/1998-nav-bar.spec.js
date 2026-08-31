// @ts-check
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test('1998 exhibit nav + tour links work', async ({ page }) => {
  await enterYear(page, '1998');
  // Nav strip is on site pages only (Starting Point skips triple-nav)
  await goInFrame(page, 'sites/yahoo/index.html');
  await waitForImmersion(page, '1998');
  const frame = contentFrame(page);

  const nav = frame.locator('#itt-exhibit-nav a');
  const n = await nav.count();
  expect(n).toBeGreaterThan(0);

  for (let i = 0; i < n; i++) {
    await goInFrame(page, 'sites/yahoo/index.html');
    await waitForImmersion(page, '1998');
    const f = contentFrame(page);
    const a = f.locator('#itt-exhibit-nav a').nth(i);
    const text = (await a.innerText()).trim();
    if (/exit|^home$/i.test(text)) continue;
    const href = await a.getAttribute('href');
    await a.click();
    await page.waitForTimeout(700);
    const body = await contentFrame(page).locator('body').innerText();
    const loc = await page.locator('#location').inputValue();
    expect(body, text + ' ' + href + ' ' + loc).not.toMatch(/404 Not Found|Unable to locate/i);
    expect(loc, text).not.toMatch(/pages\/sites\//);
  }
});
