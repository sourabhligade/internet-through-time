// @ts-check
/**
 * YouTube 2005 — dedicated hard suite (upload · list · watch · channels · bans).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

async function clearYt(page) {
  await page.evaluate(() => {
    try {
      localStorage.removeItem('itt05-yt-uploads');
    } catch (e) { /* */ }
  });
}

test.describe('2005 YouTube hard suite', () => {
  test.beforeEach(async ({ page }) => {
    await enterYear(page, '2005');
    await clearYt(page);
  });

  test('all YouTube HTML rooms HTTP 200 and non-empty', async ({ request }) => {
    const paths = [
      'index.html',
      'upload.html',
      'watch.html',
      'about.html',
      'channels.html',
    ];
    /** @type {string[]} */
    const fails = [];
    for (const p of paths) {
      const res = await request.get(`/years/2005/sites/youtube/${p}`);
      if (res.status() !== 200) fails.push(`${p} ${res.status()}`);
      else {
        const body = await res.text();
        if (body.length < 400) fails.push(`${p} thin ${body.length}`);
        if (/Error code: 404|File not found/i.test(body)) fails.push(`${p} 404 body`);
      }
    }
    expect(fails, fails.join('\n')).toEqual([]);
  });

  test('home seeds data-yt-list with Me at the zoo', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await expect(frame.locator('[data-yt-list]')).toBeVisible({ timeout: 15000 });
    await expect(frame.locator('[data-yt-list]')).toContainText(/Me at the zoo/i);
    await expect(frame.locator('[data-yt-list] a.yt-thumb, [data-yt-list] a').first()).toBeVisible();
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toMatch(/Me at the zoo/);
  });

  test('upload with description persists in itt05-yt-uploads', async ({ page }) => {
    const title = 'Desc clip ' + Date.now();
    const desc = 'shot on a 2005 digicam';
    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    await frame.locator('[name="title"]').fill(title);
    await frame.locator('[name="desc"]').fill(desc);
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload|list|videos/i, {
      timeout: 10000,
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    expect(raw || '').toContain(title);
    expect(raw || '').toContain(desc);
    // status offers navigation back to list/watch
    await expect(frame.locator('[data-yt-upload-status] a').first()).toBeVisible({ timeout: 5000 });
  });

  test('two uploads both appear on home list (newest first)', async ({ page }) => {
    const a = 'FirstUp ' + Date.now();
    const b = 'SecondUp ' + Date.now();
    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    let frame = contentFrame(page);
    await frame.locator('[name="title"]').fill(a);
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload/i, { timeout: 8000 });
    await frame.locator('[name="title"]').fill(b);
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload/i, { timeout: 8000 });

    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    const list = await frame.locator('[data-yt-list]').innerText();
    expect(list).toContain(a);
    expect(list).toContain(b);
    // newest unshifted first
    expect(list.indexOf(b)).toBeLessThan(list.indexOf(a));
  });

  test('list thumb links open watch with ?v= title', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    const thumb = frame.locator('[data-yt-list] a').filter({ hasText: /Me at the zoo/i }).first();
    await expect(thumb).toBeVisible({ timeout: 10000 });
    const href = (await thumb.getAttribute('href')) || '';
    expect(href).toMatch(/watch\.html/i);
    expect(href).toMatch(/v=/i);

    await thumb.click();
    // iframe may navigate internally
    await page.waitForFunction(
      () => {
        try {
          const f = document.getElementById('content');
          const src = (f && f.getAttribute('src')) || '';
          const loc = f && f.contentWindow && f.contentWindow.location;
          const path = loc ? loc.pathname + loc.search : src;
          return /watch\.html/i.test(path + src);
        } catch (e) {
          return false;
        }
      },
      null,
      { timeout: 15000 }
    );
    await waitForImmersion(page, '2005');
    const f2 = contentFrame(page);
    await expect(f2.locator('[data-yt-title]')).toContainText(/Me at the zoo/i, { timeout: 10000 });
    await expect(f2.locator('[data-yt-player]')).toBeVisible();
  });

  test('watch ?v= custom title from upload', async ({ page }) => {
    const title = 'Custom Watch ' + Date.now();
    await goInFrame(page, 'sites/youtube/upload.html');
    await waitForImmersion(page, '2005');
    let frame = contentFrame(page);
    await frame.locator('[name="title"]').fill(title);
    await frame.locator('[data-yt-upload] button[type="submit"]').click();
    await expect(frame.locator('[data-yt-upload-status]')).toContainText(/Upload/i, { timeout: 8000 });

    await goInFrame(page, 'sites/youtube/watch.html?v=' + encodeURIComponent(title));
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await expect(frame.locator('[data-yt-title]')).toContainText(title, { timeout: 10000 });
  });

  test('watch like can fire twice', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/watch.html');
    await waitForImmersion(page, '2005');
    const frame = contentFrame(page);
    const before = parseInt((await frame.locator('[data-yt-views]').innerText()).trim(), 10) || 0;
    await frame.locator('[data-yt-like]').click({ force: true });
    await frame.locator('[data-yt-like]').click({ force: true });
    await expect
      .poll(async () => parseInt((await frame.locator('[data-yt-views]').innerText()).trim(), 10) || 0)
      .toBeGreaterThanOrEqual(before + 2);
  });

  test('channels page densify + jawed lore', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/channels.html');
    await waitForImmersion(page, '2005');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).toMatch(/jawed|Channels/i);
    expect(t.length).toBeGreaterThan(350);
    expect(t).not.toMatch(/Error code: 404|File not found/i);
  });

  test('about bans Google ownership as 2005 fact', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/about.html');
    await waitForImmersion(page, '2005');
    const t = (await contentFrame(page).locator('body').innerText()).toLowerCase();
    expect(t).toMatch(/april 23|apr 23|broadcast yourself|2005/);
    expect(t).not.toMatch(/google owns youtube|youtube is a google product|google-owned youtube/);
    // may mention 2006 acquisition as future — that is OK if framed as not this year
    if (t.includes('google') && t.includes('acquis')) {
      expect(t).toMatch(/2006|not this year|not yet/);
    }
  });

  test('in-site nav: home → upload → about → channels', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    let frame = contentFrame(page);
    await frame.locator('a[href="upload.html"]').first().click();
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = (f && f.getAttribute('src')) || '';
        const path = (f && f.contentWindow && f.contentWindow.location.pathname) || '';
        return /upload\.html/.test(src + path);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await waitForImmersion(page, '2005');
    frame = contentFrame(page);
    await expect(frame.locator('[data-yt-upload]')).toBeVisible();

    await goInFrame(page, 'sites/youtube/about.html');
    await waitForImmersion(page, '2005');
    await expect(contentFrame(page).locator('body')).toContainText(/About YouTube|2005/i);

    await goInFrame(page, 'sites/youtube/channels.html');
    await waitForImmersion(page, '2005');
    await expect(contentFrame(page).locator('body')).toContainText(/Channel/i);
  });

  test('no dating-site UI on home (auth densify rule)', async ({ page }) => {
    await goInFrame(page, 'sites/youtube/index.html');
    await waitForImmersion(page, '2005');
    const t = await contentFrame(page).locator('body').innerText();
    expect(t).not.toMatch(/I'm a Male|seeking Everyone|between 18/i);
  });

  test('XP shell Start asset (year identity)', async ({ page }) => {
    const startSrc = await page.locator('#btn-start img').getAttribute('src');
    expect(startSrc || '').toMatch(/xp\/start/i);
  });
});
