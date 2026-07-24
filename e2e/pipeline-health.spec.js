// @ts-check
/**
 * Lightweight HTTP health checks for critical static assets.
 * Complements Python smoke when Playwright webServer is up.
 */
const { test, expect } = require('@playwright/test');

const CRITICAL = [
  '/',
  '/index.html',
  '/js/browser-core.js',
  '/js/immersion-core.js',
  '/js/immersion/create.js',
  '/js/immersion/shared.js',
  '/js/immersion/amazon.js',
  '/js/lib/util.js',
  '/js/config/1995.js',
  '/css/hub.css',
  '/years/1994/',
  '/years/1995/',
  '/years/1996/',
  '/years/1997/',
  '/years/1998/',
  '/js/config/1998.js',
  '/js/immersion/google.js',
  '/js/immersion/excite.js',
  '/js/immersion/yahoo.js',
  '/js/immersion/boot.js',
  '/js/immersion/registry.js',
  '/favicon.gif',
  '/robots.txt',
];

test.describe('pipeline health (static assets)', () => {
  for (const path of CRITICAL) {
    test(`GET ${path} is 200`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    });
  }

  test('year config immersion scripts resolve', async ({ request }) => {
    for (const y of ['1994', '1995', '1996', '1997', '1998']) {
      const cfg = await request.get(`/js/config/${y}.js`);
      expect(cfg.status(), `config ${y}`).toBe(200);
      const body = await cfg.text();
      expect(body).toMatch(/urlMap|ITT/);
    }
  });
});
