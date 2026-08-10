// @ts-check
/** Shared helpers for year-shell immersion e2e tests */

/**
 * Kill connect overlay + modal backdrop that intercept clicks.
 * @param {import('@playwright/test').Page} page
 */
/**
 * Safety net for leftover dialogs. Product shells should not need this after
 * skip (see hideOverlay / maybePhoneEvent in js/browser/create.js). Overlay
 * honesty specs must NOT call this.
 */
async function killOverlays(page) {
  await page.evaluate(() => {
    const kill = (el) => {
      if (!el) return;
      el.classList.add('hidden');
      el.style.display = 'none';
      el.style.pointerEvents = 'none';
    };
    kill(document.getElementById('modal-backdrop'));
    kill(document.getElementById('connect-overlay'));
    document.querySelectorAll('.dialog').forEach((d) => d.classList.add('hidden'));
  });
}

/**
 * Open a year shell, skip dial-up, dismiss alerts, wait for content iframe body.
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function enterYear(page, year) {
  await page.goto(`/years/${year}/`);
  const skip = page.locator('#skip-connect');
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
  }
  for (let i = 0; i < 4; i++) {
    const alert = page.locator('#dlg-alert:not(.hidden)');
    if (await alert.isVisible().catch(() => false)) {
      await page.locator('#dlg-alert-ok, [data-close="dlg-alert"]').first().click();
      await alert.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
    } else break;
  }
  await killOverlays(page);
  await page.waitForFunction(() => {
    const f = document.getElementById('content');
    try {
      return !!(f && f.contentDocument && f.contentDocument.body && f.contentDocument.body.innerHTML.length > 20);
    } catch (e) {
      return false;
    }
  }, null, { timeout: 20000 });
}

/**
 * Navigate the content iframe to a path under the year root.
 * Prefer browser navigate API when available so status/history stay consistent.
 * @param {import('@playwright/test').Page} page
 * @param {string} relativePath e.g. sites/amazon/index.html
 * @param {{ instant?: boolean }} [opts]
 */
async function goInFrame(page, relativePath, opts) {
  const instant = !opts || opts.instant !== false;
  await killOverlays(page);
  await page.evaluate(
    ({ src, instant }) => {
      try {
        if (window.ITT && window.ITT.activeBrowser && typeof window.ITT.activeBrowser.navigate === 'function') {
          window.ITT.activeBrowser.navigate(src, { instant: !!instant });
          return;
        }
      } catch (e) { /* fall through */ }
      const iframe = document.getElementById('content');
      if (iframe) iframe.src = src;
    },
    { src: relativePath, instant }
  );
  // Wait until iframe src or path reflects destination
  const needle = relativePath.split('?')[0].replace(/^\/+/, '');
  await page.waitForFunction(
    (n) => {
      try {
        const f = document.getElementById('content');
        if (!f) return false;
        const src = (f.getAttribute('src') || '') + '';
        if (src.indexOf(n) !== -1) return true;
        const loc = f.contentWindow && f.contentWindow.location;
        if (loc && (loc.pathname + loc.search).indexOf(n) !== -1) return true;
        return false;
      } catch (e) {
        return false;
      }
    },
    needle,
    { timeout: 20000 }
  );
}

/**
 * Wait until immersion has booted for a year inside the iframe.
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function waitForImmersion(page, year) {
  await page.waitForFunction(
    (y) => {
      try {
        const doc = document.getElementById('content').contentDocument;
        return !!(doc && doc.documentElement.getAttribute('data-itt-immersion-booted') === y);
      } catch (e) {
        return false;
      }
    },
    year,
    { timeout: 25000 }
  );
}

/**
 * goInFrame + waitForImmersion
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {string} relativePath
 */
async function goImmersion(page, year, relativePath) {
  await goInFrame(page, relativePath);
  await waitForImmersion(page, year);
}

/**
 * Frame locator for the content iframe.
 * @param {import('@playwright/test').Page} page
 */
function contentFrame(page) {
  return page.frameLocator('#content');
}

/**
 * Click every #dirbar .dir-btn and assert content src matches data-go.
 * @param {import('@playwright/test').Page} page
 * @param {{ min?: number }} [opts]
 */
async function clickAllDirbar(page, opts) {
  const min = (opts && opts.min) || 4;
  const buttons = page.locator('#dirbar .dir-btn[data-go]');
  const n = await buttons.count();
  if (n < min) {
    throw new Error(`dirbar expected >=${min} buttons, got ${n}`);
  }
  /** @type {string[]} */
  const fails = [];

  function iframeMatchesTarget(target) {
    try {
      const f = document.getElementById('content');
      if (!f) return false;
      const src = (f.getAttribute('src') || '') + '';
      let path = '';
      try {
        const loc = f.contentWindow && f.contentWindow.location;
        if (loc) path = (loc.pathname || '') + (loc.search || '');
      } catch (ePath) {
        /* */
      }
      const hay = src + ' ' + path;
      if (!target) return hay.length > 1;
      if (hay.indexOf(target) !== -1) return true;
      const brand = target.indexOf('sites/') === 0 ? target.split('/')[1] : target.split('/').pop();
      return !!(brand && hay.indexOf(brand) !== -1);
    } catch (e) {
      return false;
    }
  }

  for (let i = 0; i < n; i++) {
    await killOverlays(page);
    await page
      .waitForFunction(
        () => {
          const b = document.getElementById('browser');
          return !b || !b.classList.contains('loading');
        },
        null,
        { timeout: 8000 }
      )
      .catch(() => {});
    const btn = buttons.nth(i);
    const go = (await btn.getAttribute('data-go')) || '';
    const label = ((await btn.innerText()) || '').trim() || go;
    await btn.click({ force: true });
    // wait for src / iframe path (modem delay may apply)
    let ok = false;
    for (let attempt = 0; attempt < 2 && !ok; attempt++) {
      try {
        await page.waitForFunction(iframeMatchesTarget, go, { timeout: 12000 });
        ok = true;
      } catch (e) {
        await killOverlays(page);
        await btn.click({ force: true });
      }
    }
    if (!ok) {
      const src = (await page.locator('#content').getAttribute('src')) || '';
      fails.push(`${label} go=${go} src=${src}`);
    }
  }
  return fails;
}

/**
 * Start menu Settings opens prefs; Run opens open-location (when data-start-cmd present).
 * @param {import('@playwright/test').Page} page
 */
async function exerciseStartMenu(page) {
  const start = page.locator('#btn-start');
  if (!(await start.count()) || !(await start.isVisible().catch(() => false))) {
    return { skipped: true };
  }
  const hasSettings = await page.locator('[data-start-cmd="settings"]').count();
  if (!hasSettings) return { skipped: true };

  await killOverlays(page);
  await start.click({ force: true });
  await page.locator('[data-start-cmd="settings"]').click({ force: true });
  const prefsOpen = await page
    .locator('#dlg-prefs:not(.hidden)')
    .waitFor({ state: 'visible', timeout: 3000 })
    .then(() => true)
    .catch(() => false);
  await killOverlays(page);
  await start.click({ force: true });
  await page.locator('[data-start-cmd="run"]').click({ force: true });
  const runOpen = await page
    .locator('#dlg-open-location:not(.hidden)')
    .waitFor({ state: 'visible', timeout: 3000 })
    .then(() => true)
    .catch(() => false);
  await killOverlays(page);
  return { skipped: false, prefsOpen, runOpen };
}

/**
 * Poll localStorage until a key is truthy. Prefer this over waitForTimeout + getItem.
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 * @param {{ timeout?: number }} [opts]
 */
async function waitKey(page, key, opts) {
  const { expect } = require('@playwright/test');
  const timeout = (opts && opts.timeout) || 8000;
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), { timeout })
    .toBeTruthy();
  return page.evaluate((k) => localStorage.getItem(k), key);
}

/**
 * Poll #content src until it matches. Prefer this over waitForTimeout + getAttribute.
 * @param {import('@playwright/test').Page} page
 * @param {RegExp|string} re
 * @param {{ timeout?: number }} [opts]
 */
/**
 * Wait until iframe YearGame API is bound (avoids sleep-then-evaluate races).
 * @param {import('@playwright/test').Page} page
 * @param {{ timeout?: number }} [opts]
 */
async function waitYearGame(page, opts) {
  const { expect } = require('@playwright/test');
  const timeout = (opts && opts.timeout) || 10000;
  await expect
    .poll(
      async () =>
        page.evaluate(() => {
          try {
            const w = document.getElementById('content') && document.getElementById('content').contentWindow;
            return !!(w && w.ITT && w.ITT.YearGame && typeof w.ITT.YearGame.saveBest === 'function');
          } catch (e) {
            return false;
          }
        }),
      { timeout }
    )
    .toBeTruthy();
}

async function waitContentSrc(page, re, opts) {
  const { expect } = require('@playwright/test');
  const timeout = (opts && opts.timeout) || 8000;
  await expect
    .poll(async () => (await page.locator('#content').getAttribute('src')) || '', { timeout })
    .toMatch(re);
  return page.locator('#content').getAttribute('src');
}

module.exports = {
  enterYear,
  goInFrame,
  waitForImmersion,
  goImmersion,
  contentFrame,
  killOverlays,
  clickAllDirbar,
  exerciseStartMenu,
  waitKey,
  waitContentSrc,
  waitYearGame,
};
