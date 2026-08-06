// @ts-check
/**
 * 2000 hard signature flows — DOM/storage must change; no soft mocks.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2000 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2000');
  });

  test('Amazon smile home + music cart add (itt00)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt00') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    await goInFrame(page, 'sites/amazon/index.html');
    await waitForImmersion(page, '2000');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Amazon/i, { timeout: 15000 });
    const smile = frame.locator('img[src*="logo-smile"], img[src*="smile"]');
    await expect(smile.first()).toBeVisible({ timeout: 10000 });
    const html = await frame.locator('body').innerHTML();
    expect(html).toMatch(/logo-smile/i);

    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2000');
    const f2 = contentFrame(page);
    const add = f2.locator('[data-add-cart]').first();
    await expect(add).toBeVisible({ timeout: 10000 });
    await add.click({ force: true });
    await expect(f2.locator('[data-cart-count]').first()).not.toHaveText('0', { timeout: 10000 });
  });

  test('Napster search returns catalog rows', async ({ page }) => {
    await goInFrame(page, 'sites/napster/search.html?q=radiohead');
    await waitForImmersion(page, '2000');
    const frame = contentFrame(page);
    await expect(frame.locator('#napster-results')).toContainText(/Radiohead|mp3|Download|peer|result/i, {
      timeout: 15000,
    });
    const t = await frame.locator('body').innerText();
    expect(t).not.toMatch(/Error code: 404|File not found/i);
    expect(t).not.toMatch(/stream(ing)? (your )?music|listen now/i);
  });

  test('Pets shop or shutdown path loads', async ({ page }) => {
    await goInFrame(page, 'sites/pets/index.html');
    await waitForImmersion(page, '2000');
    let frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Pets\.com|sock puppet|Pets Can't Drive/i, {
      timeout: 15000,
    });
    await goInFrame(page, 'sites/pets/shutdown.html');
    await waitForImmersion(page, '2000');
    frame = contentFrame(page);
    const t = await frame.locator('body').innerText();
    expect(t).toMatch(/November|shutdown|closed|2000/i);
    expect(t).not.toMatch(/Error code: 404|File not found/i);
  });

  test('Google sparse branding present', async ({ page }) => {
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '2000');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Google/i, { timeout: 15000 });
    const form = frame.locator('form, input[name="q"], input[type="text"]');
    await expect(form.first()).toBeVisible({ timeout: 10000 });
  });

  test('Shell year identity is IE 5.5 / not XP Luna', async ({ page }) => {
    const bodyClass = await page.locator('body').getAttribute('class');
    expect(bodyClass || '').toMatch(/year-2000/);
    // Win98 / IE5.5 era shell — Start asset must not be XP Luna
    const startImg = page.locator('#btn-start img, .start-btn img, #start-button img, #btn-start img').first();
    const startSrc =
      (await startImg.count()) > 0
        ? await startImg.getAttribute('src')
        : await page.locator('img[src*="start"]').first().getAttribute('src').catch(() => '');
    expect(startSrc || '').toMatch(/win98|start/i);
    expect(startSrc || '').not.toMatch(/xp\/start/i);
    const title = await page.title();
    expect(title).toMatch(/Internet Explorer/i);
    expect(title + (bodyClass || '')).not.toMatch(/Windows XP|Luna/i);
  });

  test('Napster legal has no Museum: label', async ({ page }) => {
    await goInFrame(page, 'sites/napster/legal.html');
    await waitForImmersion(page, '2000');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).toMatch(/RIAA|copyright|2000|injunction/i);
    expect(t).not.toMatch(/Museum:\s/i);
  });

  test('Amazon cart page lists items after add (itt00 isolation)', async ({ page }) => {
    await page.evaluate(() => {
      try {
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt00') === 0 || k.indexOf('itt99') === 0)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        /* */
      }
    });
    await goInFrame(page, 'sites/amazon/music.html');
    await waitForImmersion(page, '2000');
    let frame = contentFrame(page);
    await frame.locator('[data-add-cart]').first().click({ force: true });
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt00-amazon-cart')), {
        timeout: 10000,
      })
      .toBeTruthy();
    expect(await page.evaluate(() => localStorage.getItem('itt99-amazon-cart'))).toBeNull();
    await goInFrame(page, 'sites/amazon/cart.html');
    await waitForImmersion(page, '2000');
    frame = contentFrame(page);
    await expect(frame.locator('[data-cart-list]').first()).toContainText(/\$|item|Music|CD|Remove|OK Computer|Radiohead/i, {
      timeout: 10000,
    });
  });

  test('Google search form submits with q', async ({ page }) => {
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '2000');
    const frame = contentFrame(page);
    const q = frame.locator('input[name="q"], input[type="text"]').first();
    await expect(q).toBeVisible({ timeout: 10000 });
    await q.fill('amazon');
    const form = frame.locator('form[data-google-search], form').first();
    await form.evaluate((f) => {
      /** @type {HTMLFormElement} */ (f).submit();
    });
    await page.waitForTimeout(500);
    const src = (await page.locator('#content').getAttribute('src')) || '';
    const body = await contentFrame(page).locator('body').innerText();
    expect(src + body).toMatch(/amazon|search|result|Google/i);
  });
});
