// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, goInFrame, contentFrame, killOverlays } = require('./helpers');

test('shell 2006 Obliv Walk actually plays', async ({ page }) => {
  const logs = [];
  page.on('console', (m) => logs.push(m.type() + ': ' + m.text()));
  page.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message));
  await enterYear(page, '2006');
  await goInFrame(page, 'sites/playable/more-c.html');
  await killOverlays(page);
  const frame = contentFrame(page);
  const host = frame.locator('[data-full-more]');
  await expect(host).toBeVisible({ timeout: 15000 });
  const diag = await frame.locator('body').evaluate(() => {
    const h = document.querySelector('[data-full-more]');
    const cv = document.querySelector('canvas');
    const r = cv && cv.getBoundingClientRect();
    const mid = r ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null;
    const kids = Array.from(document.body.children).slice(0, 25).map((el) => {
      const b = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        id: el.id,
        cls: String(el.className || '').slice(0, 60),
        h: Math.round(b.height),
        t: Math.round(b.top),
        text: String(el.textContent || '').replace(/\s+/g, ' ').slice(0, 80)
      };
    });
    return {
      ready: h && h.getAttribute('data-full-ready'),
      err: h && h.getAttribute('data-full-error'),
      engine: h && h.getAttribute('data-full-engine'),
      id: h && h.getAttribute('data-game-id'),
      yearGame: !!(window.ITT && ITT.YearGame),
      vh: window.innerHeight,
      scroll: document.body.scrollHeight,
      kids,
      canvas: !!(cv && cv.getContext('2d')),
      canvasBox: r ? { w: r.width, h: r.height, t: r.top, vis: r.width > 0 && r.height > 0 } : null,
      midTag: mid && mid.tagName,
      overlayOpen: !!document.querySelector('.yg-overlay.is-open'),
      paused: h && h.getAttribute('data-yg-paused'),
      status: (document.querySelector('[data-itt-action-status]') || {}).textContent || ''
    };
  });
  await page.screenshot({ path: 'test-results/full-more-shell-2006.png', fullPage: true });
  console.log('DIAG', JSON.stringify(diag, null, 2));
  console.log('LOGS', logs.slice(0, 20).join('\n'));
  expect(diag.ready, 'boot ready ' + JSON.stringify(diag)).toBe('1');
  expect(diag.err, 'boot error').toBeFalsy();
  await frame.locator('[data-game-start]').click();
  const canvas = frame.locator('canvas');
  const spots = [
    [60, 50],
    [200, 50],
    [340, 50],
    [60, 140],
    [200, 140],
    [340, 140]
  ];
  for (let n = 0; n < 4; n++) {
    for (const [x, y] of spots) await canvas.click({ position: { x, y } });
  }
  for (let i = 0; i < 4; i++) await canvas.click({ position: { x: 420, y: 260 } });
  await expect
    .poll(async () =>
      page.evaluate(() => {
        try {
          return document.getElementById('content').contentWindow.localStorage.getItem('itt06-game-oblivwalk');
        } catch (e) {
          return 'ERR:' + e.message;
        }
      }),
      { timeout: 12000 }
    )
    .toMatch(/real/);
});
