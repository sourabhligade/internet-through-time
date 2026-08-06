// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear } = require('./helpers');

test.describe('2002 live buttons (not mocks)', () => {
  test('Start menu Settings opens Preferences', async ({ page }) => {
    await enterYear(page, '2002');
    await page.click('#btn-start');
    await page.click('[data-start-cmd="settings"]');
    await expect(page.locator('#dlg-prefs')).not.toHaveClass(/hidden/);
  });

  test('Start menu Run opens Open Location', async ({ page }) => {
    await enterYear(page, '2002');
    await page.click('#btn-start');
    await page.click('[data-start-cmd="run"]');
    await expect(page.locator('#dlg-open-location')).not.toHaveClass(/hidden/);
  });

  test('Start menu Programs navigates home', async ({ page }) => {
    await enterYear(page, '2002');
    await page.click('#btn-start');
    await page.click('[data-start-cmd="programs"]');
    await page.waitForTimeout(300);
    const src = await page.locator('#content').getAttribute('src');
    expect(src).toMatch(/home\.html/);
  });

  test('KaZaA download theater mutates status', async ({ page }) => {
    await page.goto('/years/2002/sites/kazaa/index.html');
    await page.waitForTimeout(600);
    await page.click('[data-itt-download]');
    // shared.js injects a live host panel and/or updates status
    await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
  });

  test('Phoenix download theater works', async ({ page }) => {
    await page.goto('/years/2002/sites/phoenix/index.html');
    await page.waitForTimeout(600);
    await page.click('[data-itt-download]');
    await expect(page.locator('.itt-live-host, [data-itt-live-status]').first()).toBeVisible({ timeout: 8000 });
  });

  test('Google News tabs switch panels', async ({ page }) => {
    await page.goto('/years/2002/sites/googlenews/index.html');
    await page.click('[data-gn-tab="tech"]');
    await expect(page.locator('[data-gn-panel="tech"]')).toHaveClass(/active/);
    await expect(page.locator('[data-gn-panel="top"]')).not.toHaveClass(/active/);
  });

  test('MTV hub cells navigate', async ({ page }) => {
    await page.goto('/years/2002/sites/mtv/index.html');
    await page.click('a[href="broadband.html"]');
    await expect(page).toHaveURL(/broadband\.html/);
    await expect(page.locator('b', { hasText: 'Broadband Zone' })).toBeVisible();
  });

  test('Friendster profile form saves', async ({ page }) => {
    await page.goto('/years/2002/sites/friendster/profile.html');
    await page.waitForTimeout(400);
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="about"]', 'Hello from e2e');
    await page.click('[data-friendster-profile-form] button[type="submit"]');
    await expect(page.locator('[data-friendster-status]')).toContainText(/saved/i);
  });

  test('dirbar Friendster KaZaA Wired Daypop Phoenix', async ({ page }) => {
    await enterYear(page, '2002');
    for (const [label, re] of [
      ['Friendster', /friendster/i],
      ['KaZaA', /kazaa/i],
      ['Wired', /wired/i],
      ['Daypop', /daypop/i],
      ['Phoenix', /phoenix/i],
      ['News BETA', /googlenews/i],
    ]) {
      await page.evaluate(() => {
        document.getElementById('modal-backdrop')?.classList.add('hidden');
        document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
      });
      await page.locator('#dirbar .dir-btn', { hasText: label }).click({ force: true });
      await page.waitForTimeout(700);
      expect(await page.locator('#content').getAttribute('src')).toMatch(re);
    }
  });

});
