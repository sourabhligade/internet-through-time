// @ts-check
/** Leftover-3× flows and links were removed. This file no longer drives those panels. */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test("leftover-3× flows and links stay removed", () => {
  expect(fs.existsSync(path.join(__dirname, "../js/config/leftover-3x-unique.js"))).toBe(false);
  expect(fs.existsSync(path.join(__dirname, "../js/config/leftover-3x-unique-links.js"))).toBe(false);
});
