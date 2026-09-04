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
  /* src can flip before the iframe document finishes scripts (G1 iframe Manage race). */
  await page.waitForFunction(
    (n) => {
      try {
        const f = document.getElementById('content');
        const doc = f && f.contentDocument;
        if (!doc || doc.readyState === 'loading') return false;
        const path = (doc.location && (doc.location.pathname + doc.location.search)) || '';
        const src = (f.getAttribute('src') || '') + '';
        if (path.indexOf(n) === -1 && src.indexOf(n) === -1) return false;
        return !!(doc.body && doc.body.innerHTML.length > 20);
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
  await killOverlays(page);
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


/* --- storage / boot helpers (2014+ packs) --- */

/**
 * @param {import('@playwright/test').Page} page
 * @param {string|string[]} keys
 */
async function clearKeys(page, keys) {
  const list = Array.isArray(keys) ? keys : [keys];
  await page.evaluate((ks) => {
    ks.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        /* */
      }
    });
  }, list);
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 * @param {{ timeout?: number }} [opts]
 */
async function requireKey(page, key, opts) {
  const { expect } = require('@playwright/test');
  const timeout = (opts && opts.timeout) || 10000;
  await expect
    .poll(async () => page.evaluate((k) => localStorage.getItem(k), key), {
      timeout,
      message: `missing ${key}`,
    })
    .toBeTruthy();
  return (await page.evaluate((k) => localStorage.getItem(k), key)) || '';
}

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} key
 */
async function assertNoKey(page, key) {
  const { expect } = require('@playwright/test');
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeFalsy();
}

/**
 * Wait until immersion boot marker or year extras feature flag is set.
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {{ extrasFlag?: string, timeout?: number }} [opts]
 */
async function waitBoot(page, year, opts) {
  const y = String(year);
  const timeout = (opts && opts.timeout) || 20000;
  const extrasFlag = (opts && opts.extrasFlag) || `data-itt-feat-year${y}extras`;
  await page
    .waitForFunction(
      ({ yearStr, flag }) => {
        const root = document.documentElement;
        return (
          root.getAttribute('data-itt-immersion-booted') === yearStr ||
          root.getAttribute(flag) === '1'
        );
      },
      { yearStr: y, flag: extrasFlag },
      { timeout }
    )
    .catch(() => {});
}

/**
 * Double-click helper used by older packs (shell menus).
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
async function twoStepClick(page, selector) {
  const el = page.locator(selector).first();
  await el.click();
  await page.waitForTimeout(150);
  await el.click();
}

/**
 * Check all matching checkboxes.
 * @param {import('@playwright/test').Page} page
 * @param {string} selector
 */
async function checkAll(page, selector) {
  const loc = page.locator(selector);
  const n = await loc.count();
  if (!n) return 0;
  await loc.evaluateAll((els) => {
    els.forEach((e) => {
      /** @type {HTMLInputElement} */ (e).checked = true;
    });
  });
  return n;
}

/** Common REAL literacy checkbox selectors across year packs. */
const REAL_CHECK_SEL = [
  '[data-req]',
  '[data-dl-check]',
  '[data-itt-download-confirm]',
  '[data-chrome-check]',
  '[data-chrome-req]',
  '[data-hulu-check]',
  '[data-itunes-req]',
  '[data-lastfm-req]',
  '[data-dropbox-req]',
  '[data-spotify-req]',
  '[data-spotify-ack]',
  '[data-spotify-no-stream]',
  '[data-spotify-invite-check]',
  '[data-gfc-check]',
  '[data-nf-req]',
  '[data-ks-req]',
  '[data-appstore-check]',
  '[data-android-check]',
  '[data-uber-check]',
  '[data-gfc-opensocial]',
  '[data-gfc-noroauth]',
  '[data-fb-connect-check]',
  '[data-wave-check]',
  '[data-sopa-check]',
  '[data-sopa-fact]',
  '[data-ps4-check]',
  '[data-ps4-share]',
  '[data-snap-check]',
  '[data-lightning-check]',
  '[data-ipo-fact]',
  '[data-glass-explorer]',
  '[data-glass-backlash]',
  '[data-btc-news]',
  '[data-btc-nomarket]',
  '[data-xbox-kinect]',
  '[data-xbox-drm]',
  '[data-telegram-privacy]',
  '[data-thesis-req]',
  '[data-healthcare-ack] ~ label input[type="checkbox"]',
  '[data-farm-check]',
  '[data-4sq-check]',
  'input[type="checkbox"][data-req]',
].join(', ');

/**
 * Fill Gmail theater login. Empty email/password never writes.
 * @param {import('@playwright/test').Page} page
 * @param {{ email?: string, pass?: string }} [creds]
 */
async function fillGmailLogin(page, creds) {
  creds = creds || {};
  const form = page.locator('[data-gmail-login]').first();
  await form.waitFor({ state: 'visible', timeout: 20000 });
  const email = form.locator('[name="email"]');
  const pass = form.locator('[name="pass"], input[type="password"]');
  if (await email.count()) await email.fill(creds.email || 'visitor@gmail.com');
  if (await pass.count()) await pass.fill(creds.pass || 'museum');
}

/**
 * Check every common REAL literacy box on the page.
 * @param {import('@playwright/test').Page} page
 * @param {string} [extraSel]
 */
async function checkAllReq(page, extraSel) {
  const sel = extraSel ? `${REAL_CHECK_SEL}, ${extraSel}` : REAL_CHECK_SEL;
  return checkAll(page, sel);
}

/**
 * Complete a REAL multipath action: literacy checks + two-step click when needed.
 * Prefers data-itt-real-save when present for the given storage key.
 * @param {import('@playwright/test').Page} page
 * @param {string} clickSelector
 * @param {{ storageKey?: string, checkSel?: string, waitMs?: number }} [opts]
 */
async function completeRealGate(page, clickSelector, opts) {
  opts = opts || {};
  /* residual-real.js injects literacy boxes at 80ms and 400ms */
  await page.waitForTimeout(opts.injectWaitMs != null ? opts.injectWaitMs : 450);
  await checkAllReq(page, opts.checkSel);
  if ((await page.locator(REAL_CHECK_SEL).count()) === 0) {
    await page.waitForTimeout(250);
    await checkAllReq(page, opts.checkSel);
  }
  let sel = clickSelector;
  if (opts.storageKey) {
    const real = page.locator(
      `[data-itt-real-save][data-storage-key="${opts.storageKey}"]`
    );
    if ((await real.count()) > 0) sel = `[data-itt-real-save][data-storage-key="${opts.storageKey}"]`;
  }
  // Prefer real-save buttons already on page even without storageKey hint
  if ((await page.locator(sel).count()) === 0) {
    const anyReal = page.locator('[data-itt-real-save]').first();
    if ((await anyReal.count()) > 0) {
      await anyReal.click();
      return;
    }
  }
  const el = page.locator(sel).first();
  await el.waitFor({ state: 'visible', timeout: opts.timeout || 15000 });
  await el.click();
  await page.waitForTimeout(opts.waitMs != null ? opts.waitMs : 120);
  // Second click for two-step arms (no-op if already written / detached)
  try {
    if (await el.isVisible().catch(() => false)) await el.click({ timeout: 2000 });
  } catch (e) {
    /* already done */
  }
}

/**
 * Thesis literacy: REAL panel preferred over soft data-thesis-ack.
 * @param {import('@playwright/test').Page} page
 */
async function completeThesis(page) {
  await page.waitForSelector(
    '[data-itt-real-save][data-storage-key="thesis-ack"], [data-thesis-ack]',
    { timeout: 15000 }
  );
  // Wait for immersion / real-flow bind when present
  await page
    .waitForFunction(
      () => {
        const y =
          document.documentElement.getAttribute('data-itt-year') ||
          (document.body && document.body.getAttribute('data-itt-year')) ||
          '';
        const booted = document.documentElement.getAttribute('data-itt-immersion-booted');
        const bound = document.querySelector(
          '[data-itt-real-save][data-itt-real-bound="1"], [data-itt-real-save][data-real-bound="1"]'
        );
        return !y || booted === y || !!bound || !!window.ITT;
      },
      null,
      { timeout: 15000 }
    )
    .catch(() => {});
  await page.waitForTimeout(150);
  await checkAllReq(page);
  const real = page.locator('[data-itt-real-save][data-storage-key="thesis-ack"]');
  if ((await real.count()) > 0) {
    await real.first().click();
  } else {
    await page.locator('[data-thesis-ack]').first().click();
  }
}

/**
 * Read data-itt-year from html or body.
 * @param {import('@playwright/test').Page} page
 */
async function pageYear(page) {
  return (
    (await page.locator('html').getAttribute('data-itt-year')) ||
    (await page.locator('body').getAttribute('data-itt-year')) ||
    ''
  );
}

/**
 * Open the Starting Point leftover drawer when present.
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 */
async function openAlsoYear(page, year) {
  const box = page.locator(`#itt-also-year-${year}`);
  if (!(await box.count())) return;
  if ((await box.getAttribute('open')) === null) {
    await box.locator('summary').first().click();
  }
}

/**
 * The 3-door leftover strip (not the 9-door leftover nav).
 * @param {import('@playwright/test').Page} page
 * @param {string} year
 * @param {'pop-more'|'pop-3x3'} kind
 */
function leftoverTrioStrip(page, year, kind) {
  return page.locator(`p.itt-${kind}[data-itt-${kind}="${year}"]`).first();
}

/**
 * Dest-true leftover-official on a dest page: trap / 0 ticks / field-or-picks / wait
 * then save. Never writes goldKey.
 * @param {import('@playwright/test').Page} page
 * @param {string} href
 * @param {string} suffix
 * @param {string} [goldKey]
 */
async function leftoverOfficialDest(page, href, suffix, goldKey) {
  const { expect } = require("@playwright/test");
  const yearMatch = String(href).match(/\/years\/(\d{4})\//);
  const year = yearMatch ? yearMatch[1] : "";
  const key = "itt" + String(year).slice(-2) + "-" + suffix;
  const panel = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suffix}"])`).first();
  await page.goto(href);
  await panel.locator("[data-lo-save]").waitFor({ timeout: 20000 });
  await page.waitForFunction((suf) => {
    const b = document.querySelector('[data-lo-save][data-lo-key="' + suf + '"]');
    return !!(b && b.getAttribute("data-lo-bound") === "1");
  }, suffix, { timeout: 20000 });
  await page.evaluate((k) => localStorage.removeItem(k), key);
  if (goldKey) await page.evaluate((k) => localStorage.removeItem(k), goldKey);

  await panel.locator("[data-lo-trap]").first().click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key), key + " trap").toBeFalsy();

  await panel.locator("[data-lo-save]").first().click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key), key + " 0 ticks").toBeFalsy();

  const reqs = panel.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();

  const saveBtn = panel.locator("[data-lo-save]").first();
  const needPick = (await saveBtn.getAttribute("data-lo-need-pick")) || "";
  const minPick = Number((await saveBtn.getAttribute("data-lo-min-pick")) || "0");
  const picks = panel.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (needPick) {
    await panel.locator(`[data-lo-pick="${needPick}"]`).first().click();
  } else if (nPick > 0) {
    const need = Math.max(minPick || 1, 1);
    for (let i = 0; i < Math.min(need, nPick); i++) await picks.nth(i).click();
  }

  const field = panel.locator("[data-lo-field]");
  if ((await field.count()) > 0) {
    await saveBtn.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key), key + " empty field").toBeFalsy();
    const ph = (await field.first().getAttribute("placeholder")) || "leftover";
    await field.first().fill(ph.length >= 2 ? ph : ph + "xx");
  }

  const wait = panel.locator("[data-lo-wait]");
  if ((await wait.count()) > 0) {
    await saveBtn.click();
    expect(await page.evaluate((k) => localStorage.getItem(k), key), key + " skip wait").toBeFalsy();
    await wait.first().click();
    await page.waitForTimeout(1000);
  }

  await saveBtn.click();
  await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), key), { timeout: 8000 }).toBeTruthy();
  if (goldKey) {
    expect(await page.evaluate((k) => localStorage.getItem(k), goldKey), "star after leftover").toBeFalsy();
  }
  return key;
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
  clearKeys,
  requireKey,
  assertNoKey,
  waitBoot,
  twoStepClick,
  checkAll,
  checkAllReq,
  completeRealGate,
  completeThesis,
  fillGmailLogin,
  REAL_CHECK_SEL,
  pageYear,
  openAlsoYear,
  leftoverTrioStrip,
  leftoverOfficialDest,
};
