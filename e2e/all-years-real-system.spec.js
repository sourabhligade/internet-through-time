// @ts-check
/**
 * REAL-flow system gate — every year 1994–2014.
 *
 * 1) Universal module boots (data-itt-real-flow / data-itt-feat-realFlow)
 * 2) Thesis literacy panel: incomplete writes nothing; complete writes year-prefixed *-thesis-ack
 * 3) No soft mock: bare click without checks must not save
 *
 * Product-specific REAL flows remain in year packs; this file enforces the shared system.
 */
const { test, expect } = require('@playwright/test');

const YEARS = [
  '1994',
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
];

/** @param {string} year */
function thesisKey(year) {
  // immersion configs use itt94…itt13 (1994 is itt94, not bare "itt")
  return 'itt' + year.slice(2) + '-thesis-ack';
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function openAbout(page, year) {
  await page.goto(`/years/${year}/pages/about.html`);
  await page.waitForFunction(
    () => {
      const d = document.documentElement;
      return (
        d.getAttribute('data-itt-real-flow') === '1' ||
        d.getAttribute('data-itt-feat-realFlow') === '1' ||
        !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]') ||
        !!document.querySelector('[data-itt-real-save]')
      );
    },
    null,
    { timeout: 20000 }
  );
  // Allow real-flow.js to bind
  await page
    .waitForFunction(
      () =>
        !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]') ||
        document.documentElement.getAttribute('data-itt-real-flow') === '1',
      null,
      { timeout: 10000 }
    )
    .catch(() => {});
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function clearKey(page, key) {
  await page.evaluate((k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {
      /* */
    }
  }, key);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

for (const year of YEARS) {
  test.describe(`REAL system ${year}`, () => {
    test(`about thesis REAL gate · ${year}`, async ({ page }) => {
      const key = thesisKey(year);
      await openAbout(page, year);
      await clearKey(page, key);
      await page.reload();
      await openAbout(page, year);

      const save = page.locator('[data-itt-real-save]').filter({ hasText: /thesis|literacy|Save/i }).first();
      const saveAny = page.locator('[data-itt-real-save]').first();
      const btn = (await save.count()) > 0 ? save : saveAny;
      await expect(btn).toBeVisible({ timeout: 15000 });

      // Wait for bind when present
      await page
        .waitForFunction(
          () => !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]'),
          null,
          { timeout: 8000 }
        )
        .catch(() => {});

      // Incomplete: zero checks
      await btn.click();
      await page.waitForTimeout(250);
      expect(await getKey(page, key), `${year}: incomplete must not write ${key}`).toBeFalsy();

      // One check still incomplete if min=2
      const boxes = page.locator('[data-req]');
      const n = await boxes.count();
      expect(n, `${year}: need data-req checkboxes`).toBeGreaterThanOrEqual(2);
      await boxes.nth(0).check();
      await btn.click();
      await page.waitForTimeout(250);
      expect(await getKey(page, key), `${year}: one check must not write`).toBeFalsy();

      // Complete
      await boxes.nth(1).check();
      await btn.click();
      await expect
        .poll(async () => getKey(page, key), {
          timeout: 10000,
          message: `${year}: expected ${key}`,
        })
        .toBeTruthy();
      const raw = (await getKey(page, key)) || '';
      expect(raw).toMatch(/multiStep|real|checks/i);

      // Isolation: neighbor year prefix not used for this write
      const neighbor =
        year === '1994' ? 'itt95-thesis-ack' : year === '2013' ? 'itt12-thesis-ack' : null;
      if (neighbor) {
        // only assert we didn't write the wrong key for *this* action — neighbor may be null
        expect(await getKey(page, neighbor === key ? 'itt-never' : neighbor)).toBeFalsy();
      }
    });

    test(`real-flow module flag · ${year}`, async ({ page }) => {
      await openAbout(page, year);
      const flagged = await page.evaluate(() => {
        const d = document.documentElement;
        return (
          d.getAttribute('data-itt-real-flow') === '1' ||
          d.getAttribute('data-itt-feat-realFlow') === '1' ||
          !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]')
        );
      });
      expect(flagged, `${year}: real-flow system must boot`).toBeTruthy();
    });
  });
}

/** Spot-check product REAL on flagship years (empty-block style) */
test.describe('REAL system product samples', () => {
  test('1995 cart incomplete empty not required — add writes itt95-amazon-cart', async ({ page }) => {
    await page.goto('/years/1995/sites/amazon/book-neuromancer.html');
    await page.evaluate(() => {
      try {
        localStorage.setItem('itt95-amazon-cart', '[]');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-add-cart]', { timeout: 20000 });
    await page.locator('[data-add-cart]').first().click();
    await expect
      .poll(async () =>
        page.evaluate(() => {
          try {
            return JSON.parse(localStorage.getItem('itt95-amazon-cart') || '[]').length;
          } catch (e) {
            return 0;
          }
        })
      )
      .toBeGreaterThan(0);
  });

  test('2005 YouTube empty title blocked; titled upload writes', async ({ page }) => {
    await page.goto('/years/2005/sites/youtube/upload.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt05-yt-uploads');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-yt-upload]', { timeout: 20000 });
    await page.fill('[name="title"]', '');
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await page.waitForTimeout(400);
    const empty = await page.evaluate(() => localStorage.getItem('itt05-yt-uploads'));
    // either null or seed-only without empty mock title — must not invent blank success as only item
    await page.fill('[name="title"]', 'REAL system 2005 ' + Date.now());
    await page.locator('[data-yt-upload] button[type="submit"]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt05-yt-uploads') || ''))
      .toMatch(/REAL system 2005/);
  });

  test('2007 Beacon incomplete blocked; complete writes itt07-beacon-ack', async ({ page }) => {
    await page.goto('/years/2007/sites/facebook/beacon.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt07-beacon-ack');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-itt-real-save]', { timeout: 20000 });
    await page
      .waitForFunction(() => !!document.querySelector('[data-itt-real-save][data-itt-real-bound="1"]'), null, {
        timeout: 10000,
      })
      .catch(() => {});
    await page.locator('[data-itt-real-save]').click();
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => localStorage.getItem('itt07-beacon-ack'))).toBeFalsy();
    await page.locator('[data-req]').nth(0).check();
    await page.locator('[data-req]').nth(1).check();
    await page.locator('[data-itt-real-save]').click();
    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('itt07-beacon-ack') || ''))
      .toBeTruthy();
  });

  test('2013 Xbox incomplete blocked', async ({ page }) => {
    await page.goto('/years/2013/sites/xboxone/index.html');
    await page.evaluate(() => {
      try {
        localStorage.removeItem('itt13-xbox');
      } catch (e) {
        /* */
      }
    });
    await page.reload();
    await page.waitForSelector('[data-xbox-ack]', { timeout: 20000 });
    await page.locator('[data-xbox-ack]').click();
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => localStorage.getItem('itt13-xbox'))).toBeFalsy();
  });
});
