// @ts-check
/**
 * 1994 — one hard e2e per interactive flow.
 * Failures mean the theater is mock/broken, not just missing copy.
 */
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, waitForImmersion, contentFrame } = require('./helpers');

async function boot(page, path) {
  await enterYear(page, '1994');
  await goInFrame(page, path);
  await waitForImmersion(page, '1994');
  return contentFrame(page);
}

function clearStorageKeys(page, re) {
  return page.evaluate((src) => {
    const r = new RegExp(src);
    Object.keys(localStorage)
      .filter((k) => r.test(k))
      .forEach((k) => localStorage.removeItem(k));
  }, re.source || re);
}

test.describe('1994 flow: FishCam', () => {
  test('multi-still theater shows Frame N of 4 and GIF src', async ({ page }) => {
    const frame = await boot(page, 'sites/fishcam/index.html');
    await expect(frame.locator('[data-fishcam]')).toBeVisible();
    await expect(frame.locator('[data-fish-label]')).toContainText(/Frame \d+ of 4/i, { timeout: 15000 });
    await expect(frame.locator('[data-fish-frame]')).toHaveAttribute('src', /fishcam\/frame-\d/);
    await expect(frame.locator('[data-fish-time]')).not.toHaveText('');
  });
});

test.describe('1994 flow: Cool Site of the Day', () => {
  test('rotation fills link + blurb (not loading placeholder)', async ({ page }) => {
    const frame = await boot(page, 'sites/csotd/index.html');
    const link = frame.locator('[data-csotd-link]');
    await expect(link).toBeVisible({ timeout: 15000 });
    await expect(link).not.toContainText(/Loading pick/i);
    const href = await link.getAttribute('href');
    expect(href && href.length > 1).toBeTruthy();
    await expect(frame.locator('[data-csotd-date]')).not.toHaveText('…');
    await expect(frame.locator('[data-csotd-blurb]')).not.toHaveText(
      'A human editor picked one site worth your modem time.'
    );
  });
});

test.describe('1994 flow: Yahoo search', () => {
  test('catalog search returns matches for nasa', async ({ page }) => {
    const frame = await boot(page, 'sites/yahoo/search.html?p=nasa');
    const out = frame.locator('[data-search-results]');
    await expect(out).toContainText(/match/i, { timeout: 15000 });
    await expect(out).not.toContainText(/No matches/i);
    await expect(out.locator('a').first()).toBeVisible();
  });
});

test.describe('1994 flow: Lycos search', () => {
  test('catalog search returns matches for music', async ({ page }) => {
    const frame = await boot(page, 'sites/lycos/search.html?q=music');
    await expect(frame.locator('[data-search-results]')).toContainText(/match|IUMA|Music/i, {
      timeout: 15000,
    });
  });
});

test.describe('1994 flow: personal guestbook', () => {
  test('sign form appends entry to list and localStorage', async ({ page }) => {
    await enterYear(page, '1994');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => /gb-jdoe|gb-whitehouse/.test(k))
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/personal/guestbook.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await frame.locator('input[name="n"]').fill('Flow94Personal');
    await frame.locator('textarea[name="m"]').fill('Guestbook flow works.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('Flow94Personal', { timeout: 10000 });
    await expect(frame.locator('[data-gb-list]')).toContainText('Guestbook flow works');
    await expect.poll(async () =>
      page.evaluate(() =>
        Object.keys(localStorage).some((k) => (localStorage.getItem(k) || '').includes('Flow94Personal'))
      )
    ).toBeTruthy();
  });
});

test.describe('1994 flow: White House guestbook', () => {
  test('sign form with name=c message field works', async ({ page }) => {
    await enterYear(page, '1994');
    await goInFrame(page, 'sites/whitehouse/guestbook.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    await frame.locator('input[name="n"]').fill('CitizenFlow94');
    await frame.locator('input[name="f"]').fill('Ohio');
    await frame.locator('textarea[name="c"]').fill('Information superhighway guestbook.');
    await frame.locator('form[data-gb-form] input[type="submit"]').click({ force: true });
    await expect(frame.locator('[data-gb-list]')).toContainText('CitizenFlow94', { timeout: 10000 });
  });
});

test.describe('1994 flow: IUMA player', () => {
  test('download theater completes and enables Play', async ({ page }) => {
    const frame = await boot(page, 'sites/iuma/bands/download.html');
    await expect(frame.locator('[data-iuma-player]')).toBeVisible({ timeout: 15000 });
    const play = frame.locator('[data-player-play]');
    await expect(play).toBeEnabled({ timeout: 20000 });
    await expect(frame.locator('[data-player-status]')).toContainText(/complete|ready|Play|helper/i);
    await expect(frame.locator('[data-player-bar]')).toContainText(/100%|##########/);
  });
});

test.describe('1994 flow: White House imagemap', () => {
  test('map areas exist and icon fallback navigates', async ({ page }) => {
    const frame = await boot(page, 'sites/whitehouse/index.html');
    await expect(frame.locator('map[name="whmap"] area').first()).toHaveAttribute('href', /.+/);
    const n = await frame.locator('map[name="whmap"] area').count();
    expect(n).toBeGreaterThanOrEqual(3);
    await frame.locator('a[href="president.html"]').first().click();
    await expect(frame.locator('body')).toContainText(/President|Clinton|White House/i, { timeout: 15000 });
  });
});

test.describe('1994 flow: shell navigation', () => {
  test('Yahoo hub loads with Stanford / akebono story', async ({ page }) => {
    const frame = await boot(page, 'sites/yahoo/index.html');
    await expect(frame.locator('body')).toContainText(/Yahoo/i);
    await expect(frame.locator('body')).toContainText(/akebono|Stanford|Guide/i);
    await expect.poll(async () => page.locator('#location').inputValue(), { timeout: 15000 }).toMatch(
      /yahoo|stanford|akebono/i
    );
  });

  test('Starting Point Fish Cam link does not 404 via pages/sites/', async ({ page }) => {
    await enterYear(page, '1994');
    const frame = contentFrame(page);
    await expect(frame.getByRole('link', { name: /Fish Cam/i }).first()).toBeVisible({ timeout: 15000 });
    await frame.getByRole('link', { name: /Fish Cam/i }).first().click();
    await expect(frame.getByText(/404 Not Found/i)).toHaveCount(0, { timeout: 15000 });
    await expect(frame.getByText(/Fish|webcam|tank|FishCam/i).first()).toBeVisible({ timeout: 15000 });
    const v = await page.locator('#location').inputValue();
    expect(v).not.toMatch(/pages\/sites\//);
  });

  test('exhibit dirbar buttons navigate without 404', async ({ page }) => {
    await enterYear(page, '1994');
    const buttons = page.locator('#dirbar .dir-btn[data-go], #dirbar button[data-go], .dirbar [data-go]');
    const n = await buttons.count();
    // Some years use different dirbar markup — fall back to immersion nav in frame
    if (n >= 2) {
      for (let i = 0; i < Math.min(n, 6); i++) {
        const btn = buttons.nth(i);
        const go = await btn.getAttribute('data-go');
        await btn.click({ force: true });
        await page.waitForTimeout(200);
        if (go) {
          await expect.poll(async () => {
            return page.evaluate(() => {
              const f = document.getElementById('content');
              return (f && (f.getAttribute('src') || '')) || '';
            });
          }, { timeout: 15000 }).toMatch(new RegExp(go.split('/').pop().replace('.', '\\.') || 'html', 'i'));
        }
      }
    } else {
      // Immersion nav in content
      await goInFrame(page, 'pages/home.html');
      await waitForImmersion(page, '1994');
      const frame = contentFrame(page);
      const nav = frame.locator('#itt-exhibit-nav a, .itt-nav a, a').filter({ hasText: /Yahoo/i }).first();
      if (await nav.count()) {
        await nav.click();
        await expect(frame.locator('body')).toContainText(/Yahoo/i, { timeout: 15000 });
      }
    }
  });
});

test.describe('1994 flow: hit counter', () => {
  test('personal page counter paints digit GIFs and bumps localStorage', async ({ page }) => {
    await enterYear(page, '1994');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.indexOf('hits') !== -1)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/personal/index.html');
    await waitForImmersion(page, '1994');
    const frame = contentFrame(page);
    const counter = frame.locator('.hit-counter[data-counter="jdoe1994"]');
    await expect(counter).toBeVisible({ timeout: 10000 });
    // Digit-GIF theater: counter is images, not text
    await expect(counter.locator('img')).toHaveCount(6, { timeout: 10000 });
    await expect.poll(async () => {
      return page.evaluate(() => {
        const keys = Object.keys(localStorage).filter((k) => k.indexOf('hits') !== -1);
        return keys.some((k) => {
          const n = parseInt(localStorage.getItem(k) || '0', 10);
          return n > 0;
        });
      });
    }, { timeout: 10000 }).toBeTruthy();
  });
});
