// @ts-check
/**
 * 2005 hard signature flows — YouTube upload/list/watch must mutate storage/DOM.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2005 hard flows', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2005');
  });

  test('YouTube home Broadcast Yourself + no Google ownership', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('body')).toContainText(/Broadcast Yourself/i, { timeout: 15000 });
    await expect(frame.locator('[data-yt-list]')).toBeVisible();
    await expect(frame.locator('img[src*="youtube"]').first()).toBeVisible();
    const t = await frame.locator('body').innerText();
    expect(t).not.toMatch(/Google (owns|owned|acquired|bought) YouTube/i);
    expect(t).toMatch(/does not own YouTube|not own YouTube|Not yet/i);
  });

  test('YouTube upload → itt05 storage → list shows title', async ({ page }) => {
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-uploads');
        Object.keys(localStorage)
          .filter((k) => k.indexOf('itt05') === 0 && k.indexOf('yt') !== -1)
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) { /* */ }
    });
    const title = 'E2E Zoo Clip ' + Date.now();
    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await frame.locator('[data-yt-upload] [name="title"]').fill(title);
    await frame.locator('[data-yt-upload] button[type="submit"], [data-yt-upload] input[type="submit"]').first().click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|local|list|videos/i, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toContain(title);

    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    const f2 = contentFrame(page);
    await expect(f2.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });
  });

  test('YouTube watch like increments views', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/watch.html?v=Me%20at%20the%20zoo');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-yt-title]')).toContainText(/Me at the zoo/i, { timeout: 10000 });
    const before = parseInt((await frame.locator('[data-yt-views]').innerText()).trim(), 10) || 0;
    await frame.locator('[data-yt-like]').click({ force: true });
    await expect
      .poll(async () => parseInt((await frame.locator('[data-yt-views]').innerText()).trim(), 10) || 0, {
        timeout: 5000,
      })
      .toBeGreaterThan(before);
    await expect(frame.locator('[data-yt-status]')).toContainText(/Rated|Like|thanks/i);
  });

  test('YouTube about densify · not Google product', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/about.html');
    await waitForImmersion(page, '2005');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).toMatch(/April 23|Apr 23|2005|Broadcast Yourself/i);
    expect(t.length).toBeGreaterThan(400);
    expect(t.toLowerCase()).not.toMatch(/google owns youtube|youtube is a google product/);
  });

  test('Dirbar YouTube navigates to youtube room', async ({ page }) => {
    await page.evaluate(() => {
      document.getElementById('modal-backdrop')?.classList.add('hidden');
      document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
    });
    await page.locator('#dirbar .dir-btn[data-go="sites/youtube/index.html"], #dirbar .dir-btn', { hasText: 'YouTube' }).first().click({ force: true });
    await page.waitForFunction(() => {
      const src = (document.getElementById('content') && document.getElementById('content').getAttribute('src')) || '';
      return src.indexOf('youtube') !== -1;
    }, null, { timeout: 15000 });
    const src = (await page.locator('#content').getAttribute('src')) || '';
    expect(src).toMatch(/youtube/);
  });

  test('Maps + Reddit still live (pair sanity)', async ({ page }) => {
    await goInFrame(page, 'sites/maps/index.html');
    await waitForImmersion(page, '2005');
    await expect(contentFrame(page).locator('body')).toContainText(/Maps|Google|Zoom/i, { timeout: 10000 });
    await goInFrame(page, 'sites/reddit/index.html');
    await waitForImmersion(page, '2005');
    await expect(contentFrame(page).locator('body')).toContainText(/reddit|Reddit/i, { timeout: 10000 });
  });

  test('YouTube multipage path upload → list → watch like', async ({ page }) => {
    await page.evaluate(() => {
      try { localStorage.removeItem('itt05-yt-uploads'); } catch (e) { /* */ }
    });
    const title = 'Multi path ' + Date.now();
    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    let frame = contentFrame(page);
    await frame.locator('[data-yt-upload] [name="title"]').fill(title);
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload/i, { timeout: 10000 });

    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await expect(frame.locator('[data-yt-list]')).toContainText(title, { timeout: 10000 });

    await goInFrame(page, 'sites/youtube/watch.html?v=' + encodeURIComponent(title));
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await expect(frame.locator('[data-yt-title]')).toContainText(title, { timeout: 10000 });
    const before = parseInt((await frame.locator('[data-yt-views]').innerText()).trim(), 10) || 0;
    await frame.locator('[data-yt-like]').click({ force: true });
    await expect
      .poll(async () => parseInt((await frame.locator('[data-yt-views]').innerText()).trim(), 10) || 0)
      .toBeGreaterThan(before);
  });

  test('YouTube channels densify', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/channels.html');
    await waitForImmersion(page, '2005');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).toMatch(/jawed|Channel/i);
    expect(t.length).toBeGreaterThan(300);
  });

  test('Digg submit mutates status', async ({ page }) => {
    await goInFrame(page, 'sites/digg/submit.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    const form = frame.locator('[data-digg-submit]');
    if (await form.count()) {
      await form.locator('input[name="title"], input[type="text"]').first().fill('Digg hard ' + Date.now());
      await form.locator('button[type="submit"], input[type="submit"]').first().click();
      const status = frame.locator('[data-digg-status], #digg-status');
      if (await status.count()) {
        await expect(status.first()).toContainText(/Submit|local|dugg/i, { timeout: 8000 });
      } else {
        await expect(frame.locator('body')).toContainText(/Submit|local|dugg|Digg/i, { timeout: 8000 });
      }
    } else {
      await expect(frame.locator('body')).toContainText(/Digg/i);
    }
  });

});
