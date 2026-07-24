// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion } = require('./helpers');

test('1998 exhibit nav + tour links work', async ({ page }) => {
  await enterYear(page, '1998');
  await waitForImmersion(page, '1998');
  const frame = contentFrame(page);

  // Immersion injects nav with sites/* via R()
  const nav = frame.locator('#itt-exhibit-nav a');
  const n = await nav.count();
  expect(n).toBeGreaterThan(0);
  const labels = [];
  for (let i = 0; i < n; i++) {
    labels.push(await nav.nth(i).innerText());
  }
  // Click each nav link except Start/Exit
  for (let i = 0; i < n; i++) {
    await enterYear(page, '1998');
    await waitForImmersion(page, '1998');
    const f = contentFrame(page);
    const a = f.locator('#itt-exhibit-nav a').nth(i);
    const text = (await a.innerText()).trim();
    if (/exit|start/i.test(text)) continue;
    const href = await a.getAttribute('href');
    await a.click();
    await page.waitForTimeout(700);
    const body = await contentFrame(page).locator('body').innerText();
    const loc = await page.locator('#location').inputValue();
    expect(body, text + ' ' + href + ' ' + loc).not.toMatch(/404 Not Found|Unable to locate/i);
    expect(loc, text).not.toMatch(/pages\/sites\//);
  }
});
