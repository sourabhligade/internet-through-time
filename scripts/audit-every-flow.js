#!/usr/bin/env node
/**
 * Static audit: every year home chip, map leaf, next dest, 5× loop.
 * Exit 1 if any href is missing or a gold next chip is absent.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const YEARS = [];
for (let y = 1994; y <= 2009; y++) YEARS.push(String(y));

const GOLD = {
  1994: { chip: "sites/csotd/index.html", key: "itt94-csotd" },
  1995: { chip: "sites/amazon/ssl-checkout.html", key: "itt95-ssl-checkout" },
  1996: { chip: "sites/portals/wars.html", key: "itt96-portal-wars" },
  1997: { chip: "sites/pointcast/index.html", key: "itt97-pointcast" },
  1998: { chip: "sites/google/lucky.html", key: "itt98-lucky" },
  1999: { chip: "sites/aim/index.html", key: "itt99-aim" },
  2000: { chip: "sites/mapquest/index.html", key: "itt00-mapquest" },
  2001: { chip: "sites/msn/index.html", key: "itt01-msn" },
  2002: { chip: "sites/stumbleupon/index.html", key: "itt02-stumble" },
  2003: { chip: "sites/photobucket/index.html", key: "itt03-photobucket" },
  2004: { chip: "sites/facebook/networks.html", key: "itt04-thefacebook-networks" },
  2005: { chip: "sites/pandora/index.html", key: "itt05-pandora" },
  2006: { chip: "sites/twitter/index.html", key: "itt06-tweets" },
  2007: { chip: "sites/iphone/index.html", key: "itt07-iphone" },
  2008: { chip: "sites/github/issue.html", key: "itt08-github" },
  2009: { chip: "sites/facebook/feed.html", key: "itt09-fb-likes" },
};

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

function loadMaps() {
  const src = read("js/config/flow-maps.js");
  const sandbox = {
    window: {},
    ITT: {},
    console,
  };
  sandbox.window.ITT = sandbox.ITT;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  try {
    vm.runInContext(src, sandbox);
  } catch (e) {
    return { error: String(e && e.message), maps: sandbox.ITT.flowMaps || {} };
  }
  return { error: null, maps: sandbox.ITT.flowMaps || {} };
}

function resolveYearHref(year, href) {
  if (!href) return null;
  let h = String(href).split("#")[0].split("?")[0];
  if (!h) return null;
  if (/^https?:/i.test(h)) return null;
  if (h.startsWith("/years/")) return h.replace(/^\//, "");
  if (h.startsWith("years/")) return h;
  if (h.startsWith("../") || h.startsWith("./")) {
    /* relative from a site page — skip here */
    return null;
  }
  return "years/" + year + "/" + h.replace(/^\/+/, "");
}

const issues = [];
function fail(year, kind, msg) {
  issues.push({ year, kind, msg });
}

const mapsLoad = loadMaps();
if (mapsLoad.error) fail("maps", "parse", mapsLoad.error);

for (const year of YEARS) {
  const homeRel = "years/" + year + "/pages/home.html";
  if (!exists(homeRel)) {
    fail(year, "home", "missing pages/home.html");
    continue;
  }
  const home = read(homeRel);
  const gold = GOLD[year];
  if (gold) {
    if (!home.includes('data-ott-one-thing="' + year + '"')) {
      fail(year, "chip", "no data-ott-one-thing");
    }
    if (!home.includes(gold.chip)) {
      fail(year, "chip", "home chip does not mention " + gold.chip);
    }
    const chipFile = "years/" + year + "/" + gold.chip;
    if (!exists(chipFile)) fail(year, "chip", "chip target missing " + gold.chip);
    const writerRel = "years/" + year + "/" + (gold.writer || gold.chip);
    if (!exists(writerRel)) fail(year, "writer", "writer missing " + (gold.writer || gold.chip));
    else {
      const wh = read(writerRel);
      if (!/data-next-flow/.test(wh)) fail(year, "next", "writer has no data-next-flow");
      if (!wh.includes(gold.key) && !/data-next-when-key/.test(wh)) {
        fail(year, "next", "writer missing key " + gold.key + " and when-key");
      }
    }
  }

  const map = mapsLoad.maps[year];
  if (!map) {
    fail(year, "map", "no ITT.flowMaps[" + year + "]");
    continue;
  }
  const hrefs = [];
  const branches = map.branches || [];
  for (const b of branches) {
    for (const s of b.sites || []) {
      if (s && s.href) hrefs.push({ name: s.name, href: s.href, branch: b.label });
    }
  }
  if (!hrefs.length) fail(year, "map", "zero sites");
  const seen = {};
  for (const row of hrefs) {
    const resolved = resolveYearHref(year, row.href);
    if (!resolved) continue;
    if (seen[resolved]) continue;
    seen[resolved] = true;
    if (!exists(resolved)) {
      fail(year, "href", (row.branch || "") + " · " + row.name + " → missing " + row.href);
    }
  }

  /* 5× loops on disk: dest of data-5x-next a[href] */
  const yearRoot = path.join(ROOT, "years", year);
  function walkHtml(dir) {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walkHtml(p);
      else if (ent.name.endsWith(".html")) {
        const html = fs.readFileSync(p, "utf8");
        const rel = path.relative(path.join(ROOT, "years", year), p).replace(/\\/g, "/");
        const nextRe = /data-next-flow[\s\S]{0,400}?<a[^>]+href="([^"]+)"/gi;
        let m;
        while ((m = nextRe.exec(html))) {
          const href = m[1];
          if (/^https?:/i.test(href) || href.startsWith("mailto:")) continue;
          const dest = path.normalize(path.join(path.dirname(p), href.split("#")[0].split("?")[0]));
          if (!fs.existsSync(dest)) {
            fail(year, "next-dest", rel + " → missing " + href);
          }
        }
        const five = /data-5x-next[\s\S]{0,200}?<a[^>]+href="([^"]+)"/gi;
        while ((m = five.exec(html))) {
          const href = m[1];
          if (/^https?:/i.test(href)) continue;
          const dest = path.normalize(path.join(path.dirname(p), href.split("#")[0].split("?")[0]));
          if (!fs.existsSync(dest)) {
            fail(year, "5x-next", rel + " → missing " + href);
          }
        }
        const hasConfig = /js\/config\/immersion-\d{4}\.js/.test(html);
        const hasProduct =
          /js\/immersion-\d{4}\.js/.test(html) || /js\/immersion\.js/.test(html);
        if (hasConfig && !hasProduct) {
          fail(year, "config-only-boot", rel + " loads js/config/immersion-YYYY.js without product stub");
        }
      }
    }
  }
  walkHtml(yearRoot);
}

if (!issues.length) {
  console.log("audit-every-flow OK — " + YEARS.length + " years, all gold chips + map hrefs + next dests exist");
  process.exit(0);
}
console.log("audit-every-flow FAIL — " + issues.length + " issue(s)\n");
const byYear = {};
for (const i of issues) {
  (byYear[i.year] = byYear[i.year] || []).push(i);
}
for (const y of Object.keys(byYear).sort()) {
  console.log("## " + y);
  for (const i of byYear[y]) console.log("  [" + i.kind + "] " + i.msg);
}
process.exit(1);
