// @ts-check
/**
 * 2013 shell + year-honesty regressions
 * Catches scaffold residue (2004 titles, 2010 bookmarks, anti-Stories copy, Chrome-as-2012-only).
 */
const { test, expect } = require('@playwright/test');
const { enterYear, killOverlays } = require('./helpers');

test.describe('2013 shell honesty (visitor-facing)', () => {
  test('config titleMap home/about are 2013 not 2004', async ({ page }) => {
    await enterYear(page, '2013');
    const titles = await page.evaluate(() => {
      const cfg = (window.ITT && ITT.configs && ITT.configs['2013']) || {};
      const tm = cfg.titleMap || {};
      return {
        home: tm['pages/home.html'] || null,
        about: tm['pages/about.html'] || null,
        vine: tm['sites/vine/index.html'] || null,
        story: tm['sites/snapchat/story.html'] || null,
        chrome: tm['sites/chrome/index.html'] || null,
        snowden: tm['sites/snowden/index.html'] || null,
        bookmark0: (cfg.defaultBookmarks && cfg.defaultBookmarks[0] && cfg.defaultBookmarks[0].title) || null,
      };
    });
    expect(titles.home, 'home titleMap').toMatch(/2013/);
    expect(titles.home).not.toMatch(/2004/);
    expect(titles.about, 'about titleMap').toMatch(/2013/);
    expect(titles.about).not.toMatch(/2004/);
    expect(titles.vine, 'vine titleMap').toMatch(/Vine/i);
    expect(titles.story, 'story titleMap').toMatch(/Stor(y|ies)|Snapchat/i);
    expect(titles.chrome, 'chrome titleMap').toMatch(/Chrome/i);
    expect(titles.snowden, 'snowden titleMap').toMatch(/Snowden|PRISM/i);
    expect(titles.bookmark0, 'default bookmark').toMatch(/2013/);
    expect(titles.bookmark0).not.toMatch(/2010|2004/);
  });

  test('window title starts 2013 and never shows 2004', async ({ page }) => {
    await enterYear(page, '2013');
    await killOverlays(page);
    const homeTitle = await page.locator('#window-title').textContent();
    expect(homeTitle || '').toMatch(/2013/);
    expect(homeTitle || '').not.toMatch(/2004/);
  });

  test('dirbar Vine / Stories / Chrome update window title', async ({ page }) => {
    await enterYear(page, '2013');
    await killOverlays(page);

    const clicks = [
      { label: 'Vine', re: /Vine/i },
      { label: 'Stories', re: /Stor(y|ies)|Snapchat/i },
      { label: 'Chrome', re: /Chrome/i },
      { label: 'Win8.1', re: /Windows 8\.1|8\.1/i },
      { label: 'Starting Point', re: /2013|Starting|Welcome/i },
    ];

    for (const { label, re } of clicks) {
      await page.locator('#dirbar .dir-btn', { hasText: new RegExp(`^${label.replace('.', '\\.')}$`) }).first().click();
      await page.waitForTimeout(350);
      const title = (await page.locator('#window-title').textContent()) || '';
      expect(title, `dirbar ${label} title`).toMatch(re);
      expect(title, `dirbar ${label} not 2004`).not.toMatch(/2004/);
      const path = await page.evaluate(() => {
        try {
          const f = document.getElementById('content');
          return (f && f.contentWindow && f.contentWindow.location.pathname) || (f && f.src) || '';
        } catch (e) {
          return '';
        }
      });
      expect(path.length, `dirbar ${label} navigated iframe`).toBeGreaterThan(5);
    }
  });

  test('iframe Vine post works inside shell', async ({ page }) => {
    await enterYear(page, '2013');
    await killOverlays(page);
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt13-vine-posts');
      } catch (e) {
        /* */
      }
      if (window.ITT && ITT.activeBrowser && ITT.activeBrowser.navigate) {
        ITT.activeBrowser.navigate('sites/vine/record.html', { instant: true });
      } else {
        const f = document.getElementById('content');
        if (f) f.src = 'sites/vine/record.html';
      }
    });
    await page.waitForFunction(() => {
      try {
        const d = document.getElementById('content').contentDocument;
        return !!(d && d.querySelector('[data-vine-post]'));
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });

    await page.evaluate(() => {
      const d = document.getElementById('content').contentDocument;
      const hold = d.querySelector('[data-vine-hold]');
      if (hold) {
        hold.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      }
    });
    await page.waitForTimeout(350);
    await page.evaluate(() => {
      const d = document.getElementById('content').contentDocument;
      const hold = d.querySelector('[data-vine-hold]');
      if (hold) hold.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      const post = d.querySelector('[data-vine-post]');
      if (post) post.click();
    });
    const raw = await page.evaluate(() => localStorage.getItem('itt13-vine-posts'));
    expect(raw).toBeTruthy();
    expect(raw.length).toBeGreaterThan(5);
  });

  test('Snapchat index routes to Stories (not anti-Stories seed only)', async ({ page }) => {
    await page.goto('/years/2013/sites/snapchat/index.html');
    const body = await page.locator('body').innerText();
    expect(body).toMatch(/Stories|My Story|Oct(ober)?\s*3/i);
    expect(body).not.toMatch(/still not Stories/i);
    await expect(page.locator('a[href*="story"]').first()).toBeVisible();
    await page.locator('[data-snap-send]').click();
    await page.waitForTimeout(200);
    const snapCount = await page.evaluate(() => localStorage.getItem('itt13-snap-count'));
    expect(snapCount).toBeTruthy();
  });

  test('Chrome room is 2013 + download writes itt13-chrome', async ({ page }) => {
    await page.goto('/years/2013/sites/chrome/index.html');
    const body = await page.locator('body').innerText();
    expect(body).toMatch(/2013/);
    expect(body).toMatch(/Chrome/i);
    await page.evaluate(() => localStorage.removeItem('itt13-chrome'));
    await page.reload();
    await page.waitForTimeout(600);
    await page.locator('[data-chrome-download]').click();
    await page.waitForTimeout(150);
    const raw = await page.evaluate(() => localStorage.getItem('itt13-chrome'));
    expect(raw, 'itt13-chrome after download').toBeTruthy();
    expect(raw).toMatch(/download|true|platform/i);
    await page.locator('[data-chrome-prefer]').click();
    await page.waitForTimeout(100);
    const pref = await page.evaluate(() => localStorage.getItem('itt13-chrome'));
    expect(pref).toMatch(/preferred|true/i);
  });

  test('Vine pointer/touch hold path posts', async ({ page }) => {
    await page.goto('/years/2013/sites/vine/record.html');
    await page.evaluate(() => localStorage.removeItem('itt13-vine-posts'));
    await page.reload();
    const hold = page.locator('[data-vine-hold]');
    await hold.dispatchEvent('pointerdown');
    await page.waitForTimeout(400);
    await hold.dispatchEvent('pointerup');
    await page.locator('[data-vine-post]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt13-vine-posts'));
    expect(raw).toBeTruthy();
  });

  test('exit bar and close control leave year with resume key', async ({ page }) => {
    await enterYear(page, '2013');
    await killOverlays(page);
    expect(await page.evaluate(() => localStorage.getItem('itt-last-year'))).toBe('2013');
    await expect(page.locator('#exit-bar a').first()).toHaveAttribute('href', /index\.html/);
    await page.locator('#btn-close').click();
    await expect(page).toHaveURL(/\/($|\?|#|index\.html)/, { timeout: 15000 });
    expect(await page.evaluate(() => localStorage.getItem('itt-last-year'))).toBe('2013');
  });
});
