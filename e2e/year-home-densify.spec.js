// @ts-check
/**
 * Every year Starting Point densify + trail integrity:
 *  - ≥20 unique internal links
 *  - densify trails (multipath →) + directory
 *  - densify destination hrefs resolve (no 404)
 *  - sample REAL multipath from trail destinations (gated years)
 */
const { test, expect } = require('@playwright/test');
const { completeRealGate, twoStepClick, checkAllReq, killOverlays } = require('./helpers');

const fs = require('fs');
const path = require('path');

const YEARS = [];
for (let y = 1994; y <= 2014; y++) {
  const home = path.join(__dirname, '..', 'years', String(y), 'pages', 'home.html');
  if (fs.existsSync(home)) YEARS.push(String(y));
}

/**
 * @param {import('@playwright/test').Page} page
 */
async function uniqueInternalHrefs(page) {
  return page.evaluate(() => {
    const out = new Set();
    document.querySelectorAll('a[href]').forEach((a) => {
      const h = a.getAttribute('href') || '';
      if (!h || h.startsWith('#') || h.startsWith('javascript:') || h.startsWith('mailto:')) return;
      if (/^https?:/i.test(h) && h.indexOf('/years/') === -1) return;
      out.add(h.split('?')[0].split('#')[0]);
    });
    return Array.from(out);
  });
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function waitImmersion(page, year) {
  await page
    .waitForFunction(
      (y) => {
        const d = document.documentElement;
        return (
          d.getAttribute('data-itt-immersion-booted') === y ||
          d.getAttribute('data-itt-nomock-common') === '1' ||
          d.getAttribute('data-itt-real-flow') === '1'
        );
      },
      year,
      { timeout: 20000 }
    )
    .catch(() => {});
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} sel
 */
async function checkAll(page, sel = '[data-req], [data-chrome-check], [data-uber-check], [data-sopa-check], [data-sopa-fact]') {
  const loc = page.locator(sel);
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    try {
      await loc.nth(i).check({ force: true });
    } catch (e) {
      /* */
    }
  }
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
async function twoStep(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(120);
  await el.click();
}

test.describe('Year home densify · ≥20 links + REAL trails', () => {
  for (const y of YEARS) {
    test(`${y} home has ≥20 unique links + densify trails`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/home.html`);
      await expect(page.locator('body')).toContainText(
        /Starting Point|on the web|Welcome|portal|20\d\d/i
      );

      const hrefs = await uniqueInternalHrefs(page);
      expect(hrefs.length, `${y} unique internal hrefs`).toBeGreaterThanOrEqual(20);

      const siteLinks = page.locator('a[href*="../sites/"], a[href*="/sites/"]');
      expect(await siteLinks.count(), `${y} site links`).toBeGreaterThanOrEqual(8);

      const body = await page.locator('body').innerText();
      expect(body).toMatch(
        /Connection trails|REAL multipath|product trails|Guided multi-step|Try these/i
      );
      expect(body).toMatch(/→|->/);

      const hasDensify =
        (await page.locator('[data-itt-densify="trails"], [data-itt-densify="directory"]').count()) >
        0;
      const hasMap = (await page.locator('a[href*="map.html"]').count()) > 0;
      expect(hasDensify || hasMap).toBeTruthy();

      // densify trails: at least one multi-hop list item when densify present
      if (hasDensify) {
        const trailItems = page.locator('[data-itt-densify="trails"] li');
        expect(await trailItems.count(), `${y} densify trail items`).toBeGreaterThanOrEqual(1);
        const dirLinks = page.locator('[data-itt-densify="directory"] a[href*="sites/"]');
        // early years have fewer product rooms on disk
        const minDir = Number(y) <= 1997 ? 8 : 12;
        expect(await dirLinks.count(), `${y} directory site links`).toBeGreaterThanOrEqual(minDir);
      }

      // spot-check first site link is 200 OK
      const first = siteLinks.first();
      await expect(first).toBeVisible();
      const href = await first.getAttribute('href');
      expect(href).toBeTruthy();
      const abs = new URL(/** @type {string} */ (href), page.url()).pathname;
      const res = await page.request.get(abs);
      expect(res.status(), `GET ${abs}`).toBeLessThan(400);
    });

    test(`${y} densify trail destinations resolve (sample)`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/home.html`);
      const hrefs = await page.evaluate(() => {
        /** @type {string[]} */
        const out = [];
        const root =
          document.querySelector('[data-itt-densify="trails"]') ||
          document.querySelector('.portal-trails') ||
          document.body;
        root.querySelectorAll('a[href*="sites/"]').forEach((a) => {
          const h = a.getAttribute('href') || '';
          if (h) out.push(h.split('?')[0].split('#')[0]);
        });
        return out.slice(0, 12);
      });
      expect(hrefs.length, `${y} trail sample`).toBeGreaterThanOrEqual(3);
      for (const h of hrefs) {
        const abs = new URL(h, page.url()).pathname;
        const res = await page.request.get(abs);
        expect(res.status(), `${y} trail → ${abs}`).toBeLessThan(400);
      }
    });
  }
});

test.describe('Year about densify links', () => {
  for (const y of YEARS) {
    test(`${y} about has explore / thesis surface`, async ({ page }) => {
      await page.goto(`/years/${y}/pages/about.html`);
      const hrefs = await uniqueInternalHrefs(page);
      expect(hrefs.length, `${y} about hrefs`).toBeGreaterThanOrEqual(6);
      await expect(page.locator('body')).toContainText(/About|thesis|honesty|Explore|scale/i);
    });
  }
});

test.describe('Trail → REAL multipath smoke (selected years)', () => {
  test('2008 densify → Chrome REAL download writes itt08-chrome', async ({ page }) => {
    await page.goto('/years/2008/pages/home.html');
    await expect(page.locator('a[href*="chrome"]').first()).toBeVisible();
    await page.goto('/years/2008/sites/chrome/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt08-chrome');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await waitImmersion(page, '2008');
    await checkAll(page);
    await completeRealGate(page, '[data-chrome-download]');
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt08-chrome')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('2010 densify → Uber REAL save writes itt10-uber', async ({ page }) => {
    await page.goto('/years/2010/pages/home.html');
    await expect(page.locator('a[href*="uber"]').first()).toBeVisible();
    await page.goto('/years/2010/sites/uber/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt10-uber');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await waitImmersion(page, '2010');
    await page.locator('#uber-req, [data-uber-kind]').first().click();
    await checkAll(page);
    await page.locator('[data-uber-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt10-uber')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('2012 densify → SOPA REAL writes itt12-sopa-ack', async ({ page }) => {
    await page.goto('/years/2012/pages/home.html');
    await expect(page.locator('a[href*="sopa"]').first()).toBeVisible();
    await page.goto('/years/2012/sites/wikipedia/sopa-blackout.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt12-sopa-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await waitImmersion(page, '2012');
    await checkAll(page, '[data-sopa-check], [data-sopa-fact], [data-req]');
    await page.locator('[data-sopa-ack]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt12-sopa-ack')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('2014 densify → WhatsApp trail REAL chain', async ({ page }) => {
    await page.goto('/years/2014/pages/home.html');
    await expect(page.locator('a[href*="whatsapp"]').first()).toBeVisible();
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await page.evaluate(() => {
      try {
        ['itt14-wa-phone', 'itt14-wa-install', 'itt14-wa-installed'].forEach((k) =>
          localStorage.removeItem(k)
        );
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await waitImmersion(page, '2014');
    await page.locator('[data-wa14-phone], [data-wa-phone]').fill('5551234567');
    await page.locator('[data-wa14-verify], [data-wa-verify]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt14-wa-phone')), {
        timeout: 10000,
      })
      .toBeTruthy();
    await page.locator('[data-wa14-install], [data-wa-install]').click();
    await expect
      .poll(
        async () =>
          page.evaluate(
            () => localStorage.getItem('itt14-wa-install') || localStorage.getItem('itt14-wa-installed')
          ),
        { timeout: 10000 }
      )
      .toBeTruthy();
  });

  test('2009 densify → FarmVille two-step plant writes itt09-farm', async ({ page }) => {
    await page.goto('/years/2009/pages/home.html');
    await expect(page.locator('a[href*="farmville"]').first()).toBeVisible();
    await page.goto('/years/2009/sites/farmville/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt09-farm');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await waitImmersion(page, '2009');
    await twoStep(page, '[data-farm-plant]');
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt09-farm')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });

  test('2011 densify → Spotify invite writes itt11-spotify-invited', async ({ page }) => {
    await page.goto('/years/2011/pages/home.html');
    await expect(page.locator('a[href*="spotify"]').first()).toBeVisible();
    await page.goto('/years/2011/sites/spotify/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt11-spotify-invited');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await waitImmersion(page, '2011');
    await page.waitForSelector('[data-spotify-invite]', { timeout: 15000 });
    await page.locator('[data-spotify-invite]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt11-spotify-invited')), {
        timeout: 10000,
      })
      .toBeTruthy();
  });
});

test.describe('Prefix isolation from densify REAL rooms', () => {
  test('2014 WhatsApp does not write itt13-', async ({ page }) => {
    await page.goto('/years/2014/sites/whatsapp/index.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt13-') || k.startsWith('itt14-'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await waitImmersion(page, '2014');
    await page.locator('[data-wa14-phone], [data-wa-phone]').fill('5559998888');
    await page.locator('[data-wa14-verify], [data-wa-verify]').click();
    await page.locator('[data-wa14-install], [data-wa-install]').click();
    const keys = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('itt13-') || k.startsWith('itt14-'))
    );
    expect(keys.some((k) => k.startsWith('itt14-'))).toBeTruthy();
    expect(keys.filter((k) => k.startsWith('itt13-'))).toEqual([]);
  });
});
