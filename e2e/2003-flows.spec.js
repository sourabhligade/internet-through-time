// @ts-check
/**
 * 2003 hard signature flows — MySpace · iTunes · WordPress · LinkedIn · bans.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2003 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2003');
  });

  test('MySpace profile + comment (itt03)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt03-myspace') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/myspace/profile.html');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.locator('[data-myspace-profile-form] [name="display"]').fill('FlowUser');
    await frame.locator('[data-myspace-profile-form] [name="headline"]').fill('Top 8 forever');
    await frame.locator('[data-myspace-profile-form] input[type="submit"], [data-myspace-profile-form] button[type="submit"]').first().click();
    await expect(frame.locator('[data-myspace-status]')).toContainText(/saved/i, { timeout: 10000 });

    await goInFrame(page, 'sites/myspace/index.html');
    await waitForImmersion(page, '2003');
    const f2 = contentFrame(page);
    await expect(f2.locator('[data-myspace-display]')).toContainText(/FlowUser/i, { timeout: 10000 });
    await f2.locator('[data-myspace-comment-form] [name="text"]').fill('hard flow comment');
    await f2.locator('[data-myspace-comment-form] input[type="submit"], [data-myspace-comment-form] button[type="submit"]').first().click();
    await expect(f2.locator('[data-myspace-comments]')).toContainText(/hard flow comment/i, { timeout: 10000 });
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.indexOf('itt03-myspace') === 0)
    );
    expect(keys.length).toBeGreaterThan(0);
  });

  test('iTunes 99¢ buy → library (itt03)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt03-itunes-library');
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/itunes/index.html');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/99|Music Store|iTunes/i, { timeout: 15000 });
    await frame.locator('[data-itunes-buy] button[type="submit"]').first().click();
    await expect(frame.locator('[data-itunes-status]')).toContainText(/Purchased|99/i, { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt03-itunes-library'));
    expect(raw && raw.length > 2).toBeTruthy();

    await goInFrame(page, 'sites/itunes/library.html');
    await waitForImmersion(page, '2003');
    const lib = contentFrame(page).locator('[data-itunes-library]');
    await expect(lib).toBeVisible({ timeout: 10000 });
    const libText = await lib.innerText();
    const bodyText = await contentFrame(page).locator('body').innerText();
    expect((libText + bodyText).length).toBeGreaterThan(40);
  });

  test('WordPress publish appears on blog', async ({ page }) => {
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt03-wp-posts');
        localStorage.removeItem('itt03-wp-installed');
      } catch (e) { /* */ }
    });
    const title = 'WP Flow ' + Date.now();
    await goInFrame(page, 'sites/wordpress/dashboard.html');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.locator('[data-wp-publish] [name="title"]').fill(title);
    await frame.locator('[data-wp-publish] [name="body"]').fill('Self-host 0.7 era post.');
    await frame.locator('[data-wp-publish] button[type="submit"]').click();
    await expect(frame.locator('[data-wp-status]')).toContainText(/Published|browser/i, { timeout: 10000 });
    await goInFrame(page, 'sites/wordpress/blog.html');
    await waitForImmersion(page, '2003');
    await expect(contentFrame(page).locator('[data-wp-posts]')).toContainText(title, { timeout: 10000 });
  });

  test('LinkedIn invite adds connection', async ({ page }) => {
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt03-li-profile');
        localStorage.removeItem('itt03-li-connections');
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/linkedin/invite.html');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.locator('[data-li-invite] [name="name"]').fill('Flow Connect');
    await frame.locator('[data-li-invite] [name="title"]').fill('Engineer');
    await frame.locator('[data-li-invite] button[type="submit"]').click();
    await expect(frame.locator('[data-li-invite-status]')).toContainText(/Invitation|connection|sent/i, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt03-li-connections'));
    expect(raw || '').toMatch(/Flow Connect/);
  });

  test('Dirbar MySpace / iTunes / WordPress', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    const targets = [
      ['sites/myspace/index.html', /myspace/i],
      ['sites/itunes/index.html', /itunes/i],
      ['sites/wordpress/index.html', /wordpress/i],
    ];
    for (const [go, re] of targets) {
      await page.locator(`#dirbar .dir-btn[data-go="${go}"]`).click({ force: true });
      await page.waitForFunction(
        (g) => ((document.getElementById('content')?.getAttribute('src')) || '').indexOf(g) !== -1,
        go,
        { timeout: 15000 }
      );
      const src = (await page.locator('#content').getAttribute('src')) || '';
      expect(src).toMatch(re);
    }
  });

  test('Bans: Store present · no YouTube/Gmail product', async ({ page }) => {
    await goInFrame(page, 'sites/itunes/index.html');
    await waitForImmersion(page, '2003');
    const itunes = await contentFrame(page).locator('body').innerText();
    expect(itunes).toMatch(/Music Store|99/i);
    expect(itunes).not.toMatch(/unlimited free streaming as default|unlimited free streaming/i);

    await goInFrame(page, 'pages/about.html');
    await waitForImmersion(page, '2003');
    const about = await contentFrame(page).locator('body').innerText();
    expect(about).not.toMatch(/YouTube is available|Gmail is available|Firefox 1\.0 is the default browser/i);
  });

  test('Amazon smile cart uses itt03', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt03') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect(frame.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 10000 });
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.indexOf('itt03') === 0 && k.toLowerCase().indexOf('amazon') !== -1)
    );
    expect(keys.length).toBeGreaterThan(0);
  });
});
