// @ts-check
/**
 * Former one-click mocks — incomplete never writes; complete writes year JSON.
 */
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

