// @ts-check
/**
 * REAL-flow system gate — every ship year (1994–2018 minus 2005–2007 wiped).
 *
 * 1) Universal module boots (data-itt-real-flow / data-itt-feat-realFlow)
 * 2) Thesis literacy panel: incomplete writes nothing; complete writes year-prefixed *-thesis-ack
 * 3) No soft mock: bare click without checks must not save
 *
 * Product-specific REAL flows remain in year packs; this file enforces the shared system.
 */
const { test, expect } = require('@playwright/test');


async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}


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
  '2008',
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

      // Complete — tick every remaining required box
      for (let i = 1; i < n; i++) await boxes.nth(i).check();
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
        year === '1994' ? 'itt95-thesis-ack' : null;
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

  test('1999 AIM empty sign-on blocked; SN writes itt99-aim', async ({ page }) => {
    await page.goto('/years/1999/sites/aim/index.html');
    await page.evaluate(() => localStorage.removeItem('itt99-aim'));
    await page.reload();
    await page.locator('form[data-aim-signon] button[type="submit"]').click();
    expect(await page.evaluate(() => localStorage.getItem('itt99-aim'))).toBeFalsy();
    await page.fill('#ott-field', 'realflow99');
    await page.locator('form[data-aim-signon] button[type="submit"]').click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt99-aim'))).toBeTruthy();
  });

  test('2008 GitHub empty issue blocked; titled+body writes', async ({ page }) => {
    await page.goto('/years/2008/sites/github/issue.html');
    await page.evaluate(() => {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('itt08-github'))
        .forEach((k) => localStorage.removeItem(k));
    });
    await page.reload();
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    expect(await page.evaluate(() => localStorage.getItem('itt08-github'))).toBeFalsy();
    await page.fill("[name='title']", "Cannot center logo residual");
    await page.fill("[name='body']", "Steps to reproduce residual");
    await page.locator("form[data-gh-issue-form] button[type='submit']").click();
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('itt08-github'))).toBeTruthy();
  });

});
