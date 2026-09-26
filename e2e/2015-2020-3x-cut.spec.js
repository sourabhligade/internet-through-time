// @ts-check
/** Leftover-3× flows and links were removed. This file no longer drives those panels. */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

test("leftover-3× flows and links stay removed", () => {
  const cfg = fs.readFileSync(path.join(__dirname, "../js/config/leftover-3x-unique.js"), "utf8");
  const links = fs.readFileSync(path.join(__dirname, "../js/config/leftover-3x-unique-links.js"), "utf8");
  expect(cfg).toMatch(/leftover3xUnique = \{\}/);
  expect(links).toMatch(/leftover3xUniqueLinks = \{\}/);
});
