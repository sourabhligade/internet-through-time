// @ts-check
const { defineConfig } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8080',
    headless: true,
    trace: 'on-first-retry',
  },
  // When BASE_URL is set (external server), do not start another.
  // Local/CI default: Playwright starts the static server.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'python3 -m http.server 8080 --bind 127.0.0.1',
        port: 8080,
        reuseExistingServer: !isCI,
        timeout: 30_000,
      },
});
