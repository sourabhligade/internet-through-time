// @ts-check
/**
 * Cross-year real localStorage flows — regression gate for multi-year products.
 *
 * Covers the failure class fixed in 2026-07 audit:
 *  - dead navigation after save (blogger location.assign)
 *  - registry gaps (year boot missing module)
 *  - wrong year storage keys
 *  - static showcase without post form (delicious 2004)
 *
 * Plan: docs/CROSS-YEAR-REAL-FLOWS-EXECUTION.md
 * Prefer direct page loads (no year shell) for pure module truth.
 * Deep single-year suites stay in e2e/2004-real-flows / 2005-real-flows.
 */
const { test, expect } = require('@playwright/test');

/**
 * @param {string|number} year
 * @returns {string} two-digit suffix e.g. "05", "99", "00"
 */
function yy(year) {
  return String(year).slice(2);
}

/**
 * @param {string|number} year
 * @param {string} suffix e.g. "blog" → itt05-blog
 */
function ittKey(year, suffix) {
  return 'itt' + yy(year) + '-' + suffix;
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    try {
      ks.forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* */ }
  }, list);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 * @param {string} readySelector
 * @param {string|string[]} [keysToClear]
 */
async function gotoReady(page, path, readySelector, keysToClear) {
  await page.goto(path);
  if (keysToClear) {
    await clearKeys(page, keysToClear);
    await page.reload();
  }
  await page.waitForSelector(readySelector, { timeout: 20000 });
  await page.waitForTimeout(200);
}

/* ─── P0: Blogger 1999–2005 ─────────────────────────────────────────── */

const BLOGGER_YEARS = ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007'];

test.describe('cross-year blogger (post → view + year key)', () => {
  for (const year of BLOGGER_YEARS) {
    test(`blogger ${year}: post → view.html + ${ittKey(year, 'blog')}`, async ({ page }) => {
      const key = ittKey(year, 'blog');
      await gotoReady(
        page,
        `/years/${year}/sites/blogger/edit.html`,
        '[data-blogger-post]',
        key
      );
      await page.waitForFunction(() => {
        try {
          return !!(window.ITT && window.ITT.blogger);
        } catch (e) {
          return false;
        }
      }, null, { timeout: 10000 }).catch(() => {});

      const title = `XBlog ${year} ${Date.now()}`;
      const body = `Cross-year body ${year} ${Date.now()}`;
      await page.fill('[data-blogger-post] [name="title"]', title);
      await page.fill('[data-blogger-post] [name="body"]', body);
      await Promise.all([
        page.waitForURL(/view\.html/, { timeout: 15000 }),
        page.locator('[data-blogger-post] input[type="submit"]').click(),
      ]);
      await page.waitForSelector('#blogger-view', { timeout: 20000 });
      await expect(page.locator('#blogger-view')).toContainText(title, { timeout: 10000 });
      await expect(page.locator('#blogger-view')).toContainText(body);
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(title);
      expect(raw || '').toContain(body);
      await page.reload();
      await page.waitForSelector('#blogger-view', { timeout: 20000 });
      await expect(page.locator('#blogger-view')).toContainText(title, { timeout: 10000 });
    });
  }

  test('blogger 2005 exposes ITT.blogger after boot', async ({ page }) => {
    await page.goto('/years/2005/sites/blogger/edit.html');
    await page.waitForSelector('[data-blogger-post]', { timeout: 20000 });
    await expect
      .poll(
        async () =>
          page.evaluate(() => {
            try {
              return !!(window.ITT && window.ITT.blogger && window.ITT._immersionYear === '2005');
            } catch (e) {
              return false;
            }
          }),
        { timeout: 15000 }
      )
      .toBe(true);
  });
});

/* ─── P0: Technorati 2002–2005 ──────────────────────────────────────── */

const TECHNORATI_YEARS = ['2002', '2003', '2004', '2005', '2006', '2007'];

test.describe('cross-year technorati (cosmos + year key)', () => {
  for (const year of TECHNORATI_YEARS) {
    test(`technorati ${year}: cosmos → ${ittKey(year, 'technorati-cosmos')}`, async ({ page }) => {
      const key = ittKey(year, 'technorati-cosmos');
      await gotoReady(
        page,
        `/years/${year}/sites/technorati/index.html`,
        '[data-technorati-cosmos]',
        key
      );
      const url = `http://example.com/cosmos-${year}-${Date.now()}`;
      await page.fill('[data-technorati-cosmos] [name="url"]', url);
      await page
        .locator(
          '[data-technorati-cosmos] button[type="submit"], [data-technorati-cosmos] input[type="submit"]'
        )
        .first()
        .click();
      await expect(page.locator('[data-technorati-status]')).toContainText(
        /blogs linking|Cosmos/i,
        { timeout: 5000 }
      );
      await expect(page.locator('[data-technorati-list]')).toContainText(
        /kottke|boingboing|slashdot|metafilter|scripting/i,
        { timeout: 5000 }
      );
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(`cosmos-${year}`);
    });
  }
});

/* ─── P0: del.icio.us 2004–2005 ─────────────────────────────────────── */

const DELICIOUS_YEARS = ['2004', '2005', '2006', '2007'];

test.describe('cross-year delicious (post + year key)', () => {
  for (const year of DELICIOUS_YEARS) {
    test(`delicious ${year}: post → ${ittKey(year, 'delicious-posts')}`, async ({ page }) => {
      const key = ittKey(year, 'delicious-posts');
      await gotoReady(
        page,
        `/years/${year}/sites/delicious/index.html`,
        '[data-delicious-post]',
        key
      );
      const title = `XDel ${year} ${Date.now()}`;
      await page.fill('[data-delicious-post] [name="url"]', `http://example.com/del-${year}`);
      await page.fill('[data-delicious-post] [name="title"]', title);
      if (await page.locator('[data-delicious-post] [name="tags"]').count()) {
        await page.fill('[data-delicious-post] [name="tags"]', 'test folksonomy');
      }
      await page.locator('[data-delicious-post] button[type="submit"]').click();
      await expect(page.locator('[data-delicious-status]')).toContainText(/Posted|browser/i, {
        timeout: 5000,
      });
      await expect(page.locator('[data-delicious-list]')).toContainText(title, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(title);
    });
  }

  test('delicious 2004 isolation: year key present, does not require itt05', async ({ page }) => {
    const key = 'itt04-delicious-posts';
    await gotoReady(page, '/years/2004/sites/delicious/index.html', '[data-delicious-post]', [
      key,
      'itt05-delicious-posts',
    ]);
    const title = 'IsoDel04 ' + Date.now();
    await page.fill('[data-delicious-post] [name="url"]', 'http://example.com/iso04');
    await page.fill('[data-delicious-post] [name="title"]', title);
    await page.locator('[data-delicious-post] button[type="submit"]').click();
    await expect(page.locator('[data-delicious-list]')).toContainText(title, { timeout: 5000 });
    const pair = await page.evaluate(() => ({
      y04: localStorage.getItem('itt04-delicious-posts'),
      y05: localStorage.getItem('itt05-delicious-posts'),
    }));
    expect(pair.y04 || '').toContain(title);
    // Must not spill into 2005 key
    expect(pair.y05 || '').not.toContain(title);
  });
});

/* ─── P1: Bloglines 2003–2005 ───────────────────────────────────────── */

const BLOGLINES_YEARS = ['2003', '2004', '2005', '2006', '2007'];

test.describe('cross-year bloglines (subscribe + year key)', () => {
  for (const year of BLOGLINES_YEARS) {
    test(`bloglines ${year}: subscribe → ${ittKey(year, 'bloglines-feeds')}`, async ({ page }) => {
      const key = ittKey(year, 'bloglines-feeds');
      await gotoReady(
        page,
        `/years/${year}/sites/bloglines/reader.html`,
        '[data-bloglines-add]',
        key
      );
      const title = `XFeed ${year} ${Date.now()}`;
      await page.fill('[data-bloglines-add] [name="url"]', `http://example.com/feed-${year}.xml`);
      if (await page.locator('[data-bloglines-add] [name="title"]').count()) {
        await page.fill('[data-bloglines-add] [name="title"]', title);
      }
      await page
        .locator(
          '[data-bloglines-add] button[type="submit"], [data-bloglines-add] input[type="submit"]'
        )
        .first()
        .click();
      await expect(page.locator('[data-bloglines-status]')).toContainText(/Subscribed|feed|browser/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toBeTruthy();
      if (await page.locator('[data-bloglines-add] [name="title"]').count()) {
        expect(raw || '').toContain(title);
        await expect(page.locator('[data-bloglines-feeds]')).toContainText(title, { timeout: 5000 });
      }
    });
  }
});

/* ─── P1: WordPress 2003–2005 ───────────────────────────────────────── */

const WORDPRESS_YEARS = ['2003', '2004', '2005', '2006', '2007'];

test.describe('cross-year wordpress (publish + year key)', () => {
  for (const year of WORDPRESS_YEARS) {
    test(`wordpress ${year}: publish → ${ittKey(year, 'wp-posts')}`, async ({ page }) => {
      const key = ittKey(year, 'wp-posts');
      await gotoReady(
        page,
        `/years/${year}/sites/wordpress/dashboard.html`,
        '[data-wp-publish]',
        key
      );
      const title = `XWP ${year} ${Date.now()}`;
      await page.fill('[data-wp-publish] [name="title"]', title);
      await page.fill('[data-wp-publish] [name="body"]', `Hello from ${year}`);
      await page
        .locator(
          '[data-wp-publish] button[type="submit"], [data-wp-publish] input[type="submit"]'
        )
        .first()
        .click();
      await expect(page.locator('[data-wp-status]')).toContainText(/Published|browser/i, {
        timeout: 5000,
      });
      await expect(page.locator('[data-wp-posts]')).toContainText(title, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(title);
    });
  }
});

/* ─── Follow-on: Digg 2004–2005 ─────────────────────────────────────── */

const DIGG_YEARS = ['2004', '2005', '2006', '2007'];

test.describe('cross-year digg (dig + submit + year key)', () => {
  for (const year of DIGG_YEARS) {
    test(`digg ${year}: digg it increments + ${ittKey(year, 'digg-links')}`, async ({ page }) => {
      const key = ittKey(year, 'digg-links');
      await gotoReady(page, `/years/${year}/sites/digg/index.html`, '[data-digg-list]', key);
      await page.waitForSelector('[data-digg-up="0"]', { timeout: 20000 });
      const before = parseInt(await page.locator('[data-digg-count="0"]').innerText(), 10);
      await page.locator('[data-digg-up="0"]').click();
      await expect(page.locator('[data-digg-count="0"]')).toContainText(String(before + 1), {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toBeTruthy();
      expect(JSON.parse(raw || '[]').length).toBeGreaterThan(0);
    });

    test(`digg ${year}: submit → list + ${ittKey(year, 'digg-links')}`, async ({ page }) => {
      const key = ittKey(year, 'digg-links');
      await gotoReady(
        page,
        `/years/${year}/sites/digg/submit.html`,
        '[data-digg-submit]',
        key
      );
      const title = `XDigg ${year} ${Date.now()}`;
      await page.fill('[data-digg-submit] [name="url"]', `http://example.com/digg-${year}`);
      await page.fill('[data-digg-submit] [name="title"]', title);
      await page
        .locator(
          '[data-digg-submit] button[type="submit"], [data-digg-submit] input[type="submit"]'
        )
        .first()
        .click();
      await expect(page.locator('[data-digg-status]')).toContainText(/Submitted/i, {
        timeout: 5000,
      });
      await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 5000 });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(title);
    });
  }

  test('digg 2004 isolation: no spill into itt05-digg-links', async ({ page }) => {
    await gotoReady(page, '/years/2004/sites/digg/submit.html', '[data-digg-submit]', [
      'itt04-digg-links',
      'itt05-digg-links',
    ]);
    const title = 'IsoDigg04 ' + Date.now();
    await page.fill('[data-digg-submit] [name="url"]', 'http://example.com/iso-digg04');
    await page.fill('[data-digg-submit] [name="title"]', title);
    await page.locator('[data-digg-submit] button[type="submit"]').click();
    await expect(page.locator('[data-digg-list]')).toContainText(title, { timeout: 5000 });
    const pair = await page.evaluate(() => ({
      y04: localStorage.getItem('itt04-digg-links'),
      y05: localStorage.getItem('itt05-digg-links'),
    }));
    expect(pair.y04 || '').toContain(title);
    expect(pair.y05 || '').not.toContain(title);
  });
});

/* ─── Follow-on: MySpace 2003–2005 ──────────────────────────────────── */

const MYSPACE_YEARS = ['2003', '2004', '2005', '2006', '2007'];

test.describe('cross-year myspace (profile + year key)', () => {
  for (const year of MYSPACE_YEARS) {
    test(`myspace ${year}: save profile → ${ittKey(year, 'myspace-profile')}`, async ({
      page,
    }) => {
      const key = ittKey(year, 'myspace-profile');
      await gotoReady(
        page,
        `/years/${year}/sites/myspace/profile.html`,
        '[data-myspace-profile-form]',
        key
      );
      const name = `XSpace${year}${Date.now()}`;
      await page.fill('[data-myspace-profile-form] [name="display"]', name);
      await page.fill('[data-myspace-profile-form] [name="headline"]', `Headline ${year}`);
      await page.fill('[data-myspace-profile-form] [name="about"]', `About me ${year}`);
      await page.fill('[data-myspace-profile-form] [name="mood"]', ':-D');
      await page
        .locator(
          '[data-myspace-profile-form] input[type="submit"], [data-myspace-profile-form] button[type="submit"]'
        )
        .first()
        .click();
      await expect(page.locator('[data-myspace-status]')).toContainText(/saved|Profile/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(name);
      // View home reflects display when present
      await page.goto(`/years/${year}/sites/myspace/index.html`);
      await page.waitForSelector('[data-myspace-display]', { timeout: 20000 });
      await page.waitForTimeout(300);
      await expect(page.locator('[data-myspace-display]')).toContainText(name, { timeout: 10000 });
    });
  }
});

/* ─── Follow-on: Friendster 2002–2005 ───────────────────────────────── */

const FRIENDSTER_YEARS = ['2002', '2003', '2004', '2005', '2006', '2007'];

test.describe('cross-year friendster (profile + year key)', () => {
  for (const year of FRIENDSTER_YEARS) {
    test(`friendster ${year}: save profile → ${ittKey(year, 'friendster-profile')}`, async ({
      page,
    }) => {
      const key = ittKey(year, 'friendster-profile');
      await gotoReady(
        page,
        `/years/${year}/sites/friendster/profile.html`,
        '[data-friendster-profile-form]',
        key
      );
      const name = `XFriend${year}${Date.now()}`;
      await page.fill('[data-friendster-profile-form] [name="name"]', name);
      if (await page.locator('[data-friendster-profile-form] [name="location"]').count()) {
        await page.fill('[data-friendster-profile-form] [name="location"]', 'Museum City');
      }
      if (await page.locator('[data-friendster-profile-form] [name="about"]').count()) {
        await page.fill('[data-friendster-profile-form] [name="about"]', `Friend graph ${year}`);
      }
      await page
        .locator(
          '[data-friendster-profile-form] button[type="submit"], [data-friendster-profile-form] input[type="submit"]'
        )
        .first()
        .click();
      await expect(page.locator('[data-friendster-status]')).toContainText(/saved|Profile/i, {
        timeout: 5000,
      });
      const raw = await page.evaluate((k) => localStorage.getItem(k), key);
      expect(raw || '', `storage ${key}`).toContain(name);
    });
  }
});
