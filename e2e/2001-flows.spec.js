// @ts-check
/**
 * 2001 hard signature flows — DOM/storage must change; no soft mocks.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2001 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2001');
  });

  test('Wikipedia home + edit/preview path', async ({ page }) => {
    await goInFrame(page, 'sites/wikipedia/index.html');
    await waitForImmersion(page, '2001');
    let frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Wikipedia|encyclopedia/i, { timeout: 15000 });
    await goInFrame(page, 'sites/wikipedia/welcome.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Welcome|newcomers|edit/i, { timeout: 10000 });
    await goInFrame(page, 'sites/wikipedia/edit.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    await expect(frame.locator('[data-wiki-preview], input[value*="preview" i], textarea').first()).toBeVisible({
      timeout: 10000,
    });
    const t = await frame.locator('body').innerText();
    expect(t).not.toMatch(/Error code: 404|File not found/i);
  });

  test('iPod / iTunes library — no Store / 99¢', async ({ page }) => {
    await goInFrame(page, 'sites/apple/ipod.html');
    await waitForImmersion(page, '2001');
    let frame = contentFrame(page);
    const ipod = await frame.locator('body').innerText();
    expect(ipod).toMatch(/1,000 songs|iPod/i);
    expect(ipod).toMatch(/still in the future|Not a music store|not a store/i);
    // Allow "Music Store … still in the future" honesty; ban live storefront claims
    expect(ipod).not.toMatch(/buy (songs|music) for 99|99\s*¢\s*(songs|downloads)|storefront open|Music Store is (now )?open/i);

    await goInFrame(page, 'sites/apple/itunes.html');
    await waitForImmersion(page, '2001');
    frame = contentFrame(page);
    const itunes = await frame.locator('body').innerText();
    expect(itunes).toMatch(/iTunes|jukebox|library|Rip|playlist/i);
    expect(itunes).toMatch(/not (a |an )?(online )?store|not a storefront|Music Store arrives|still in the future/i);
    expect(itunes).not.toMatch(/buy songs for 99|99\s*¢ downloads|Music Store is open/i);
  });

  test('Amazon smile cart (itt01)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt01') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '2001');
    const frame = contentFrame(page);
    await expect(frame.locator('img[src*="smile"], img[alt*="smile" i]').first()).toBeVisible({ timeout: 10000 });
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2001');
    const f2 = contentFrame(page);
    const add = f2.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click({ force: true });
    await expect(f2.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 10000 });
  });

  test('Dirbar Start / Wikipedia / Amazon navigate', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    const targets = [
      ['pages/home.html', /pages\/home\.html/],
      ['sites/wikipedia/index.html', /sites\/wikipedia/],
      ['sites/amazon/index.html', /sites\/amazon/],
      ['sites/broadband/index.html', /sites\/broadband/],
    ];
    for (const [go, re] of targets) {
      await page.locator(`#dirbar .dir-btn[data-go="${go}"]`).click({ force: true });
      await page.waitForFunction(
        ({ needle }) => {
          const f = document.getElementById('content');
          const src = (f && f.getAttribute('src')) || '';
          return src.indexOf(needle) !== -1;
        },
        { needle: go },
        { timeout: 15000 }
      );
      const src = (await page.locator('#content').getAttribute('src')) || '';
      expect(src).toMatch(re);
    }
  });

  test('Broadband always-on room', async ({ page }) => {
    await goInFrame(page, 'sites/broadband/index.html');
    await waitForImmersion(page, '2001');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Always-on|broadband|DSL|cable/i, {
      timeout: 15000,
    });
    const btn = frame.locator('#speed-check');
    if (await btn.count()) {
      await btn.click();
      await expect(frame.locator('#speed-out')).not.toHaveText('', { timeout: 5000 });
    }
  });

  test('Movable Type product page not empty', async ({ page }) => {
    await goInFrame(page, 'sites/movabletype/index.html');
    await waitForImmersion(page, '2001');
    const frame = contentFrame(page);
    const t = await frame.locator('body').innerText();
    expect(t).toMatch(/Movable Type|Six Apart|weblog|template|RSS/i);
    expect(t.length).toBeGreaterThan(200);
    expect(t).not.toMatch(/Error code: 404|File not found/i);
  });
});
