#!/usr/bin/env node
/**
 * Load js/year-ui/start-data.js in Node.
 * Star + 6-item directory live there — not in years/YYYY/pages/home.html source.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "js", "year-ui", "start-data.js");

function loadYearStart() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(SRC, "utf8"), sandbox);
  return (sandbox.window.ITT && sandbox.window.ITT.YearUI && sandbox.window.ITT.YearUI.START) || {};
}

function startBlob(spec) {
  if (!spec) return "";
  return String(spec.href || "") + "\n" + (spec.items || []).join("\n");
}

function resolveStartHref(year, href) {
  if (!href) return null;
  const clean = String(href).split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|javascript:)/i.test(clean)) return null;
  return path.normalize(path.join(ROOT, "years", year, "pages", clean));
}

function assertStartCatalog(start) {
  const issues = [];
  const years = Object.keys(start).sort();
  if (years.length !== 16) issues.push("START years " + years.length + " != 16 (1994–2009)");
  if (start["2010"] || start["2014"] || start["2021"]) {
    issues.push("2010+ must stay out of YearUI.START");
  }
  for (const year of years) {
    const spec = start[year];
    const n = (spec.items || []).length;
    if (n !== 6) issues.push(year + " START items " + n + " (want 6)");
    if (!spec.href) issues.push(year + " START missing href");
    if (!spec.label) issues.push(year + " START missing label");
    const dest = resolveStartHref(year, spec.href);
    if (!dest || !fs.existsSync(dest)) issues.push(year + " START href missing " + spec.href);
    const blob = startBlob(spec);
    if (!/href="about\.html"/.test(blob)) issues.push(year + " START missing about.html");
    for (const item of spec.items || []) {
      const re = /href="([^"]+)"/g;
      let m;
      while ((m = re.exec(item))) {
        const t = resolveStartHref(year, m[1]);
        if (t && !fs.existsSync(t) && !fs.existsSync(t + "/index.html")) {
          issues.push(year + " START broken href " + m[1]);
        }
      }
    }
  }
  return issues;
}

module.exports = { ROOT, loadYearStart, startBlob, resolveStartHref, assertStartCatalog };

if (require.main === module) {
  const start = loadYearStart();
  const issues = assertStartCatalog(start);
  if (issues.length) {
    issues.forEach((i) => console.log("  FAIL " + i));
    process.exit(1);
  }
  console.log("year-start-data OK — " + Object.keys(start).length + " years · 6 items each");
}
