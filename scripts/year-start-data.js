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
const SRC = path.join(ROOT, "ui", "year", "start-data.js");
const WIPED = new Set(["2020", "2023", "2024", "2025"]);

function loadYearStart() {
  const sandbox = { window: {}, ITT: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(SRC, "utf8"), sandbox);
  const itt = sandbox.window.ITT || sandbox.ITT;
  return (itt && itt.YearUI && itt.YearUI.START) || {};
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
  const live = years.filter((y) => fs.existsSync(path.join(ROOT, "years", y, "index.html")));
  const ship = [];
  for (let y = 1994; y <= 2022; y++) {
    const s = String(y);
    if (WIPED.has(s)) continue;
    if (fs.existsSync(path.join(ROOT, "years", s, "index.html"))) ship.push(s);
  }
  if (live.length !== ship.length) {
    issues.push("START live years " + live.length + " != ship " + ship.length);
  }
  for (const y of ["2007", "2010", "2014", "2021", "2022"]) {
    if (!start[y] && fs.existsSync(path.join(ROOT, "years", y, "index.html"))) {
      issues.push(y + " live door missing from YearUI.START");
    }
  }
  for (const year of years) {
    if (!fs.existsSync(path.join(ROOT, "years", year, "index.html"))) continue;
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
