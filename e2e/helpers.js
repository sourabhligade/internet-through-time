// @ts-check
/** Shared helpers for year-shell immersion e2e tests */

/**
 * Kill connect overlay + modal backdrop that intercept clicks.
 * @param {import('@playwright/test').Page} page
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
      await page.waitForTimeout(100);
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
  for (let i = 0; i < n; i++) {
    await killOverlays(page);
    const btn = buttons.nth(i);
    const go = (await btn.getAttribute('data-go')) || '';
    const label = ((await btn.innerText()) || '').trim() || go;
    await btn.click({ force: true });
    // wait for src change (modem delay may apply)
    try {
      await page.waitForFunction(
        (target) => {
          const f = document.getElementById('content');
          const src = (f && f.getAttribute('src')) || '';
          if (!target) return src.length > 0;
          const brand = target.indexOf('sites/') === 0 ? target.split('/')[1] : target.split('/').pop();
          return src.indexOf(target) !== -1 || (brand && src.indexOf(brand) !== -1);
        },
        go,
        { timeout: 12000 }
      );
    } catch (e) {
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
  await page.waitForTimeout(200);
  const prefsOpen = await page.evaluate(() => {
    const d = document.getElementById('dlg-prefs');
    return !!(d && !d.classList.contains('hidden'));
  });
  await killOverlays(page);
  await start.click({ force: true });
  await page.locator('[data-start-cmd="run"]').click({ force: true });
  await page.waitForTimeout(200);
  const runOpen = await page.evaluate(() => {
    const d = document.getElementById('dlg-open-location');
    return !!(d && !d.classList.contains('hidden'));
  });
  await killOverlays(page);
  return { skipped: false, prefsOpen, runOpen };
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
};
