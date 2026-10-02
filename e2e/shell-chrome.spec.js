// @ts-check
const { test, expect } = require('@playwright/test');

const { enterYear, goInFrame, waitForImmersion, contentFrame, killOverlays } = require('./helpers');

test.describe('shell chrome (cross-year)', () => {
  test('skip dial-up reveals browser chrome for 1995 and 1998', async ({ page }) => {
    for (const year of ['1995', '1998']) {
      await page.goto(`/years/${year}/`);
      const overlay = page.locator('#connect-overlay');
      // Overlay may already be visible before skip
      const skip = page.locator('#skip-connect');
      if (await skip.isVisible().catch(() => false)) {
        await skip.click();
      }
      await expect(page.locator('#content')).toBeVisible({ timeout: 15000 });
      await expect(page.locator('#location')).toBeVisible();
      await expect(page.locator('#btn-home')).toBeVisible();
      await expect(page.locator('#btn-back')).toBeVisible();
      // connect overlay should not block
      await expect(overlay).toBeHidden({ timeout: 10000 }).catch(async () => {
        // some years remove overlay from flow via class
        const hidden = await overlay.evaluate((el) => {
          return el.classList.contains('hidden') || getComputedStyle(el).display === 'none';
        }).catch(() => true);
        expect(hidden).toBeTruthy();
      });
    }
  });

  test('home button returns to starting point', async ({ page }) => {
    await enterYear(page, '1998');
    await goInFrame(page, 'sites/google/index.html');
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('body')).toContainText(/Google/i, { timeout: 15000 });

    await page.locator('#btn-home').click();
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = f && (f.getAttribute('src') || '');
        return /pages\/home\.html|home\.html/i.test(src);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });

    await expect(contentFrame(page).locator('body')).toContainText(/Starting Point|I'm Feeling Lucky/i, {
      timeout: 15000,
    });
  });

  test('location bar hint: type yahoo then Enter (1995)', async ({ page }) => {
    await enterYear(page, '1995');
    await killOverlays(page);
    const loc = page.locator('#location');
    await expect(loc).toBeVisible({ timeout: 10000 });
    await loc.click({ force: true });
    await loc.fill('yahoo');
    await loc.press('Enter');
    const landed = await page
      .waitForFunction(
        () => {
          try {
            const f = document.getElementById('content');
            const src = (f && f.getAttribute('src')) || '';
            let path = '';
            try {
              path = (f.contentWindow && f.contentWindow.location.pathname) || '';
            } catch (eP) {
              /* */
            }
            return /yahoo/i.test(src + path);
          } catch (e) {
            return false;
          }
        },
        null,
        { timeout: 4000 }
      )
      .then(() => true)
      .catch(() => false);
    if (!landed) {
      const goBtn = page.locator('#btn-go');
      if (await goBtn.count()) await goBtn.click({ force: true });
      else await loc.press('Enter');
    }
    await page.waitForFunction(
      () => {
        try {
          const f = document.getElementById('content');
          const src = (f && f.getAttribute('src')) || '';
          let path = '';
          try {
            path = (f.contentWindow && f.contentWindow.location.pathname) || '';
          } catch (eP) {
            /* */
          }
          return /yahoo/i.test(src + path);
        } catch (e) {
          return false;
        }
      },
      null,
      { timeout: 20000 }
    );
    await waitForImmersion(page, '1995');
    await expect(contentFrame(page).locator('body')).toContainText(/Yahoo/i, { timeout: 15000 });
  });

  test('location bar hint: type google then Enter (1998)', async ({ page }) => {
    await enterYear(page, '1998');
    const loc = page.locator('#location');
    await loc.fill('google');
    await loc.press('Enter');
    await page.waitForFunction(() => {
      try {
        const f = document.getElementById('content');
        const src = (f && f.getAttribute('src')) || '';
        return /google/i.test(src);
      } catch (e) {
        return false;
      }
    }, null, { timeout: 15000 });
    await waitForImmersion(page, '1998');
    await expect(contentFrame(page).locator('body')).toContainText(/Google/i, { timeout: 15000 });
  });

  test('2016 address is the Google museum host', async ({ page }) => {
    await page.goto('/years/2016/');
    await expect(page.locator('#location')).toHaveValue(/google\.com\/web2016/);
  });

  test('home address stays on the period host after boot', async ({ page }) => {
    for (const year of ['2006', '2007', '2008', '2009']) {
      await page.goto('/years/' + year + '/');
      const loc = page.locator('#location');
      await expect(loc).toHaveValue(new RegExp('home\\.microsoft\\.com/intl/web' + year + '/?$'));
      await expect(loc).not.toHaveValue(/museum\.local/);
    }
  });

  test('period frames hold at desktop and phone width', async ({ page }) => {
    async function paddingLeft(year) {
      await page.goto('/years/' + year + '/');
      return page.locator('#itt-year-ui .desktop').evaluate((el) => parseFloat(getComputedStyle(el).paddingLeft));
    }
    async function titleHeight(year) {
      await page.goto('/years/' + year + '/');
      return page.locator('#titlebar').evaluate((el) => el.getBoundingClientRect().height);
    }
    async function gifHidden(year) {
      await page.goto('/years/' + year + '/');
      const img = page.locator('#btn-back img');
      if ((await img.count()) === 0) return true;
      return img.evaluate((el) => getComputedStyle(el).display === 'none');
    }

    await page.setViewportSize({ width: 1280, height: 800 });
    expect(await paddingLeft('1994')).toBeGreaterThan(40);
    const ie6 = await titleHeight('2001');
    const ie7 = await titleHeight('2008');
    expect(ie7).toBeGreaterThan(ie6);
    expect(await gifHidden('2009')).toBe(false);
    expect(await gifHidden('2010')).toBe(true);
    expect(await gifHidden('2014')).toBe(true);
    await page.goto('/years/2010/');
    await expect(page.locator('#toolbar img')).toHaveCount(0);
    await expect(page.locator('#btn-back .btn-label')).toBeVisible();
    await page.goto('/years/2014/');
    await expect(page.locator('#toolbar img')).toHaveCount(0);
    await page.goto('/years/2009/');
    await expect(page.locator('#btn-back img')).toHaveCount(1);
    await page.goto('/years/1997/');
    await expect(page.locator('body')).toHaveClass(/year-1997 os-win95 browser-ie4/);
    const ie4Title = await page.locator('#titlebar').evaluate((el) => getComputedStyle(el).backgroundImage);
    expect(ie4Title).toContain('gradient');
    await page.goto('/years/1998/');
    await expect(page.locator('body')).toHaveClass(/year-1998 os-win98 browser-ie4/);
    await page.goto('/years/2008/');
    await expect(page.locator('.year-label')).toHaveText('2008 · Windows XP · Internet Explorer 7 · App Store is a room');
    const ie7Border = await page.locator('#browser').evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(ie7Border).toBe('rgb(26, 94, 192)');
    await page.goto('/years/2000/');
    await expect(page.locator('body')).toHaveClass(/browser-ie55/);
    const version = await page.locator('#window-title').evaluate((el) => getComputedStyle(el, '::after').content);
    expect(version).toContain('5.5');

    await page.setViewportSize({ width: 390, height: 844 });
    expect(await paddingLeft('1994')).toBeLessThan(20);
    await page.goto('/years/2016/');
    await expect(page.locator('#location')).toHaveValue(/google\.com\/web2016/);
    await expect(page.locator('#dirbar')).toBeVisible();
    const sameRow = await page.evaluate(() => {
      const link = document.querySelector('#exit-bar a');
      const label = document.querySelector('#exit-bar .year-label');
      if (!link || !label) return false;
      return Math.abs(link.getBoundingClientRect().top - label.getBoundingClientRect().top) < 12;
    });
    expect(sameRow).toBe(true);
    await page.goto('/years/1997/');
    await expect(page.locator('#titlebar')).toBeVisible();
    await page.goto('/years/2008/');
    const phoneBorder = await page.locator('#browser').evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(phoneBorder).toBe('rgb(26, 94, 192)');
  });

  test('2006–2009 room addresses use home.microsoft.com', async ({ page }) => {
    test.setTimeout(90000);
    const rooms = {
      '2006': 'sites/twitter/index.html',
      '2007': 'sites/iphone/index.html',
      '2008': 'sites/appstore/index.html',
      '2009': 'sites/facebook/index.html',
    };
    for (const [year, path] of Object.entries(rooms)) {
      await page.goto('/years/' + year + '/');
      const skip = page.locator('#skip-connect');
      if (await skip.isVisible().catch(() => false)) await skip.click();
      const box = page.locator('#location');
      await box.fill('microsoft');
      await box.press('Enter');
      await page.waitForFunction(() => {
        const frame = document.getElementById('content');
        try {
          return frame.contentWindow.location.pathname.indexOf('pages/home.html') !== -1;
        } catch (e) {
          return false;
        }
      });
      await page.locator('.dir-btn[data-go="' + path + '"]').click();
      await page.waitForFunction((needle) => {
        const frame = document.getElementById('content');
        try {
          return frame.contentWindow.location.pathname.indexOf(needle) !== -1;
        } catch (e) {
          return false;
        }
      }, path);
      const shown = 'http://home.microsoft.com/intl/web' + year + '/' + path;
      await expect(box).toHaveValue(shown);
      await expect(box).not.toHaveValue(/museum\.local/);
    }
  });

  test('2000 home address has no /home.html suffix', async ({ page }) => {
    await page.goto('/years/2000/');
    const skip = page.locator('#skip-connect');
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.locator('#btn-home').click();
    await expect(page.locator('#location')).toHaveValue('http://home.microsoft.com/intl/web2000/');
  });

  test('1997–2014 room addresses use home.microsoft.com', async ({ page }) => {
    test.setTimeout(120000);
    const rooms = [
      ['1997', 'sites/amazonipo/index.html', 'http://home.microsoft.com/intl/web1997/sites/amazonipo/index.html'],
      ['2001', 'sites/wikipedia/index.html', 'http://home.microsoft.com/intl/web2001/sites/wikipedia/index.html'],
      ['2004', 'sites/google/index.html', 'http://home.microsoft.com/intl/web2004/sites/google/index.html'],
      ['2005', 'sites/reddit/index.html', 'http://home.microsoft.com/intl/web2005/sites/reddit/index.html'],
      ['2010', 'sites/instagram/index.html', 'http://home.microsoft.com/intl/web2010/sites/instagram/index.html'],
      ['2012', 'sites/instagram/android.html', 'http://home.microsoft.com/intl/web2012/sites/instagram/android.html'],
      ['2014', 'sites/whatsapp/index.html', 'http://home.microsoft.com/intl/web2014/sites/whatsapp/index.html'],
    ];
    async function openDir(year, path, shown) {
      await page.goto('/years/' + year + '/');
      const skip = page.locator('#skip-connect');
      if (await skip.isVisible().catch(() => false)) await skip.click();
      const btn = page.locator('.dir-btn[data-go="' + path + '"]');
      await expect(btn).toBeVisible();
      await btn.click();
      await page.waitForFunction((needle) => {
        const frame = document.getElementById('content');
        try {
          return frame.contentWindow.location.pathname.indexOf(needle) !== -1;
        } catch (e) {
          return false;
        }
      }, path);
      const box = page.locator('#location');
      await expect(box).toHaveValue(shown);
      await expect(box).not.toHaveValue(/museum\.local/);
    }
    await page.setViewportSize({ width: 1280, height: 800 });
    for (const [year, path, shown] of rooms) {
      await openDir(year, path, shown);
    }
    await page.goto('/years/2005/');
    const skipYt = page.locator('#skip-connect');
    if (await skipYt.isVisible().catch(() => false)) await skipYt.click();
    const box = page.locator('#location');
    await box.fill('http://home.microsoft.com/intl/web2005/sites/youtube/index.html');
    await box.press('Enter');
    await page.waitForFunction(() => {
      const frame = document.getElementById('content');
      try {
        return frame.contentWindow.location.pathname.indexOf('sites/youtube/index.html') !== -1;
      } catch (e) {
        return false;
      }
    });
    await expect(box).toHaveValue('http://home.microsoft.com/intl/web2005/sites/youtube/index.html');

    await page.goto('/years/2000/');
    const skip00 = page.locator('#skip-connect');
    if (await skip00.isVisible().catch(() => false)) await skip00.click();
    await box.fill('http://home.microsoft.com/intl/web2000/home.html');
    await box.press('Enter');
    await page.waitForFunction(() => {
      const frame = document.getElementById('content');
      try {
        return frame.contentWindow.location.pathname.indexOf('pages/home.html') !== -1;
      } catch (e) {
        return false;
      }
    });
    await expect(box).toHaveValue('http://home.microsoft.com/intl/web2000/');
    const lime = 'http://home.microsoft.com/intl/web2000/limewire/';
    let limeOpen = false;
    for (let attempt = 0; attempt < 3 && !limeOpen; attempt++) {
      await box.click();
      await box.fill(lime);
      await expect(box).toHaveValue(lime);
      await box.press('Enter');
      try {
        await page.waitForFunction(() => {
          const frame = document.getElementById('content');
          try {
            return frame.contentWindow.location.pathname.indexOf('sites/limewire/index.html') !== -1;
          } catch (e) {
            return false;
          }
        }, null, { timeout: 8000 });
        limeOpen = true;
      } catch (eLime) { /* a late iframe load can put the bar back on Starting Point */ }
    }
    expect(limeOpen, 'limewire address').toBe(true);
    await expect(box).toHaveValue(lime);

    for (const year of ['2007', '2008']) {
      await page.goto('/years/' + year + '/');
      const skip = page.locator('#skip-connect');
      if (await skip.isVisible().catch(() => false)) await skip.click();
      const home = 'http://home.microsoft.com/intl/web' + year + '/';
      await box.fill(home);
      await box.press('Enter');
      await page.waitForFunction(() => {
        const frame = document.getElementById('content');
        try {
          return frame.contentWindow.location.pathname.indexOf('pages/home.html') !== -1;
        } catch (e) {
          return false;
        }
      });
      await expect(box).toHaveValue(home);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await openDir(
      '2010',
      'sites/instagram/index.html',
      'http://home.microsoft.com/intl/web2010/sites/instagram/index.html'
    );
  });
});
