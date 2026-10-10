// @ts-check
/** Leftover-3× unique dest-true stays removed. leftover-3× unique dest-links restored 2010 n=3. */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test("leftover-3× unique dest-true stays removed · leftover-3× unique dest-links restored", () => {
  expect(fs.existsSync(path.join(__dirname, "../js/config/leftover-3x-unique.js"))).toBe(false);
  expect(fs.existsSync(path.join(__dirname, "../js/config/leftover-3x-unique-links.js"))).toBe(true);
});
