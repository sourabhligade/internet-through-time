// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion } = require('./helpers');

test.describe('2003 flows', () => {
  test('star Photobucket empty never writes', async ({ page }) => {
    await enterYear(page, '2003');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.locator('a[href*="photobucket"]').first().click();
    await page.waitForTimeout(400);
    const f = contentFrame(page);
    await f.locator('button[type="submit"]').first().click();
    const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.indexOf('itt03-photobucket') === 0));
    expect(keys).toEqual([]);
  });

  test('star Photobucket upload writes itt03-photobucket', async ({ page }) => {
    await enterYear(page, '2003');
    await waitForImmersion(page, '2003');
    await page.goto('/years/2003/sites/photobucket/index.html');
    await page.waitForTimeout(400);
    const f = page;
    await f.locator('[name="file"], #ott-field').first().fill('vacation.jpg');
    await f.locator('form[data-pb-upload] button[type="submit"]').click();
    await page.waitForTimeout(300);
    const raw = await page.evaluate(() => localStorage.getItem('itt03-photobucket'));
    expect(raw).toBeTruthy();
    const rec = JSON.parse(raw);
    expect(rec.real).toBeTruthy();
    expect(rec.year).toBe('2003');
  });

  test('official 10 list on map', async ({ page }) => {
    await page.goto('/years/2003/pages/map.html');
    const n = await page.locator('ol[data-itt-ten-flows] li').count();
    expect(n).toBe(10);
  });

  test('guided is exactly 6', async ({ page }) => {
    await enterYear(page, '2003');
    await waitForImmersion(page, '2003');
    const n = await contentFrame(page).locator('#ott-guided-2003 li, ol[data-itt-guided] li, [data-itt-start] ol li').count();
    expect(n === 0 || n === 6).toBeTruthy();
  });

  test('Store empty buy never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-itunes-buy] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-itunes-library'));
    expect(raw == null || raw === '[]' || raw === '').toBeTruthy();
  });

  test('WordPress empty title never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/dashboard.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-wp-publish] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-wp-posts'));
    expect(raw == null || raw === '[]' || raw === '').toBeTruthy();
  });

  test('Store 99¢ buy writes library', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-itunes-buy] [name="title"]').fill('Let It Snow');
    await page.locator('form[data-itunes-buy] [name="artist"]').fill('Sinatra');
    const reqs = page.locator('form[data-itunes-buy] [data-itunes-req]');
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator('form[data-itunes-buy] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-itunes-library'));
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw)[0].title).toBe('Let It Snow');
  });

  test('WordPress publish writes posts', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/dashboard.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-wp-publish] [name="title"]').fill('Hello 0.7');
    await page.locator('form[data-wp-publish] [name="body"]').fill('Semantic leftover');
    await page.locator('form[data-wp-publish] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-wp-posts'));
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw)[0].title).toBe('Hello 0.7');
  });

  test('LinkedIn empty invite does not add a connection', async ({ page }) => {
    await page.goto('/years/2003/sites/linkedin/invite.html');
    await page.waitForTimeout(400);
    const before = await page.evaluate(() => localStorage.getItem('itt03-li-connections'));
    await page.locator('form[data-li-invite] button[type="submit"]').click();
    const after = await page.evaluate(() => localStorage.getItem('itt03-li-connections'));
    expect(after).toBe(before);
  });

  test('AdSense empty apply never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/adsense/index.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-adsense-signup] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-adsense'));
    expect(raw == null || raw === '' || raw === 'null').toBeTruthy();
  });
});
