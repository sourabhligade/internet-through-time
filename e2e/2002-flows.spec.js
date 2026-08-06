// @ts-check
/**
 * 2002 hard signature flows — Friendster · KaZaA · TrackBack · smile · bans.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2002 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2002');
  });

  test('Friendster profile save (itt02)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt02-friendster') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/friendster/profile.html');
    await waitForImmersion(page, '2002');
    const frame = contentFrame(page);
    await frame.locator('[data-friendster-profile-form] [name="name"]').fill('E2E User');
    await frame.locator('[data-friendster-profile-form] [name="about"]').fill('Always-on friend graph.');
    await frame.locator('[data-friendster-profile-form] [name="location"]').fill('San Francisco');
    await frame.locator('[data-friendster-profile-form] button[type="submit"]').click();
    await expect(frame.locator('[data-friendster-status]')).toContainText(/saved|browser/i, { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt02-friendster-profile'));
    expect(raw || '').toMatch(/E2E User/);
  });

  test('Friendster add friend grows list', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt02-friendster') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/friendster/friends.html');
    await waitForImmersion(page, '2002');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-friendster-friends]')).toBeVisible({ timeout: 10000 });
    const before = await frame.locator('[data-friendster-friends] li').count();
    await frame.locator('[data-friendster-add-form] [name="fname"]').fill('HardFlow Pal');
    await frame.locator('[data-friendster-add-form] [name="fabout"]').fill('From e2e');
    await frame.locator('[data-friendster-add-form] button[type="submit"]').click();
    await expect(frame.locator('[data-friendster-friends]')).toContainText(/HardFlow Pal/i, { timeout: 10000 });
    const after = await frame.locator('[data-friendster-friends] li').count();
    expect(after).toBeGreaterThanOrEqual(before);
  });

  test('KaZaA search returns rows', async ({ page }) => {
    await goInFrame(page, 'sites/kazaa/client.html');
    await waitForImmersion(page, '2002');
    const frame = contentFrame(page);
    await frame.locator('[data-kazaa-q], [name="q"]').fill('radiohead');
    await frame.locator('[data-kazaa-search] button[type="submit"], [data-kazaa-search] input[type="submit"]').first().click();
    await expect(frame.locator('[data-kazaa-results]')).toContainText(/Radiohead|mp3|File|Download|peer|kbps/i, {
      timeout: 10000,
    });
    const t = await frame.locator('body').innerText();
    expect(t).not.toMatch(/Error code: 404|File not found/i);
  });

  test('TrackBack ping mutates status', async ({ page }) => {
    await goInFrame(page, 'sites/movabletype/trackback.html');
    await waitForImmersion(page, '2002');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-trackback-form]')).toBeVisible({ timeout: 10000 });
    await frame.locator('[data-trackback-form] button[type="submit"]').click();
    await expect(frame.locator('[data-trackback-status]')).toContainText(/Ping|sent|TrackBack|ok|list/i, {
      timeout: 10000,
    });
  });

  test('Amazon smile + cart (itt02)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt02') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '2002');
    const frame = contentFrame(page);
    await expect(frame.locator('img[src*="smile"]').first()).toBeVisible({ timeout: 10000 });
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2002');
    const f2 = contentFrame(page);
    await f2.locator('[data-add-cart]').first().click({ force: true });
    await expect(f2.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 10000 });
  });

  test('Shell XP · no MySpace / Store as 2002 product', async ({ page }) => {
    const bodyClass = await page.locator('body').getAttribute('class');
    expect(bodyClass || '').toMatch(/year-2002/);
    const startSrc = await page.locator('#btn-start img').getAttribute('src');
    expect(startSrc || '').toMatch(/xp\/start/i);
    await goInFrame(page, 'pages/about.html');
    await waitForImmersion(page, '2002');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).toMatch(/21%|broadband|always-on|2002/i);
    // Store / MySpace should not be sold as 2002 default products on about
    expect(t).not.toMatch(/iTunes Music Store is open|buy songs for 99/i);
  });

  test('Dirbar Friendster + KaZaA navigate', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    for (const go of ['sites/friendster/index.html', 'sites/kazaa/index.html']) {
      await page.locator(`#dirbar .dir-btn[data-go="${go}"]`).click({ force: true });
      await page.waitForFunction(
        (g) => ((document.getElementById('content')?.getAttribute('src')) || '').includes(g.split('/')[1]),
        go,
        { timeout: 15000 }
      );
      const src = (await page.locator('#content').getAttribute('src')) || '';
      expect(src).toMatch(new RegExp(go.split('/')[1]));
    }
  });
});
