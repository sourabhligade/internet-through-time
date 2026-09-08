#!/usr/bin/env node
/**
 * Static audit of the third leftover 3× trio — every shipped year.
 * Checks dest files, writer hooks, home/map strips, uniqueness, next hrefs.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TRIOS = require("./popular-3x3-sites.json");
const FIRST = require("./popular-3x-sites.json");
const { loadYearStart, assertStartCatalog } = require("./year-start-data");
const START = loadYearStart();

const STARS = {
  1994: "sites/csotd/index.html",
  1995: "sites/amazon/ssl-checkout.html",
  1996: "sites/portals/wars.html",
  1997: "sites/pointcast/index.html",
  1998: "sites/google/lucky.html",
  1999: "sites/aim/index.html",
  2000: "sites/mapquest/index.html",
  2001: "sites/wikipedia/edit.html",
  2002: "sites/stumbleupon/index.html",
  2003: "sites/photobucket/index.html",
  2004: "sites/facebook/networks.html",
  2005: "sites/youtube/upload.html",
  2006: "sites/twitter/index.html",
  2007: "sites/iphone/index.html",
  2008: "sites/github/issue.html",
  2009: "sites/facebook/index.html",
  2010: "sites/instagram/index.html",
  2011: "sites/googleplus/index.html",
  2012: "sites/instagram/android.html",
  2013: "sites/vine/record.html",
  2014: "sites/whatsapp/index.html",
  2015: "sites/periscope/index.html",
  2016: "sites/instagram/stories.html",
  2017: "sites/iphone/x.html",
  2018: "sites/gdpr/index.html",
  2019: "sites/disneyplus/home.html",
  2020: "sites/zoom/meeting.html",
  2021: "sites/att/index.html",
  2022: "sites/chatgpt/index.html",
};

const SHARE_POP_MORE = new Set(["2007", "2009"]);
const WIPED = new Set(["2020", "2023", "2024", "2025"]);
const STRIP_OK = new Set([3, 5, 6, 9]);

const fail = [];
const warn = [];
let ok = 0;
fail.push.apply(fail, assertStartCatalog(START));

function relHref(fromDir, href) {
  if (!href) return null;
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|javascript:)/i.test(clean)) return null;
  return path.normalize(path.join(fromDir, clean));
}

function hrefsIn(html, attr) {
  const block = html.match(new RegExp(`<[^>]*${attr}[^>]*>[\\s\\S]*?</p>`, "i"));
  if (!block) return [];
  const out = [];
  const re = /href="([^"]*sites\/[^"]+)"/g;
  let m;
  while ((m = re.exec(block[0]))) out.push(m[1]);
  return out;
}

function normSite(href) {
  const m = String(href || "").match(/sites\/[^"'#?]+/);
  return m ? m[0].replace(/^\.\.\//, "") : "";
}

const years = Object.keys(TRIOS).sort().filter((y) => !WIPED.has(y));

for (const year of years) {
  const rows = TRIOS[year];
  if (!rows || !STRIP_OK.has(rows.length)) {
    fail.push(year + " trio count " + (rows && rows.length));
    continue;
  }
  const home = path.join(ROOT, "years", year, "pages", "home.html");
  const map = path.join(ROOT, "years", year, "pages", "map.html");
  if (!fs.existsSync(home)) {
    fail.push(year + " missing home");
    continue;
  }
  const homeHtml = fs.readFileSync(home, "utf8");
  const spec = START[year];
  let starHref = spec && spec.href;
  let guidedLis = spec && spec.items ? spec.items.length : 0;
  if (spec) {
    if (!homeHtml.includes('id="itt-year-start"') || !homeHtml.includes("YearUI.paintStart")) {
      fail.push(year + " home missing YearUI.paintStart mount");
    }
  } else {
    const guided = homeHtml.match(new RegExp(`id="ott-guided-${year}"[\\s\\S]*?<ol[^>]*>([\\s\\S]*?)</ol>`));
    guidedLis = guided ? (guided[1].match(/<li/g) || []).length : 0;
    const star = homeHtml.match(new RegExp(`data-ott-one-thing="${year}"[^>]*href="([^"]+)"`));
    starHref = star && star[1];
    if (homeHtml.includes("YearUI.paintStart")) {
      fail.push(year + " 2010+ home must keep inline start chrome");
    }
  }
  if (guidedLis !== 6) fail.push(year + " guided ol = " + guidedLis + " (want 6)");
  if (!starHref) fail.push(year + " missing star");
  else if (normSite(starHref) !== STARS[year]) {
    fail.push(year + " star moved: " + starHref + " != " + STARS[year]);
  }

  const strip3 = hrefsIn(homeHtml, `data-itt-pop-3x3="${year}"`);
  if (!STRIP_OK.has(strip3.length)) fail.push(year + " home pop-3x3 hrefs " + strip3.length);
  const first3 = hrefsIn(homeHtml, `data-itt-pop3x="${year}"`);
  const more = hrefsIn(homeHtml, `data-itt-pop-more="${year}"`);
  if (!STRIP_OK.has(first3.length)) fail.push(year + " home first-3× hrefs " + first3.length);
  if (!STRIP_OK.has(more.length) && more.length !== 0) fail.push(year + " home pop-more hrefs " + more.length);

  const firstNorm = first3.map(normSite);
  const moreNorm = more.map(normSite);
  const stripNorm = strip3.map(normSite);

  for (const href of strip3) {
    const dest = relHref(path.dirname(home), href);
    if (!dest || !fs.existsSync(dest)) fail.push(year + " home 3x3 broken " + href);
  }

  if (starHref && stripNorm.includes(normSite(starHref))) {
    fail.push(year + " 3x3 overlaps star");
  }
  for (const h of stripNorm) {
    if (firstNorm.includes(h)) fail.push(year + " 3x3 overlaps first-3× " + h);
  }
  if (!SHARE_POP_MORE.has(year)) {
    for (const h of stripNorm) {
      if (moreNorm.includes(h)) fail.push(year + " 3x3 overlaps unique pop-more " + h);
    }
  }

  if (fs.existsSync(map)) {
    const mapHtml = fs.readFileSync(map, "utf8");
    for (const row of rows) {
      if (!mapHtml.includes("sites/" + row.id + "/")) {
        warn.push(year + " map missing " + row.id);
      }
    }
  }

  rows.forEach((row, i) => {
    const dest = path.join(ROOT, "years", year, "sites", row.id, "index.html");
    const wantHome = "sites/" + row.id + "/index.html";
    if (stripNorm[i] && stripNorm[i] !== wantHome) {
      fail.push(year + " home[" + i + "] " + stripNorm[i] + " != " + wantHome);
    }
    if (!fs.existsSync(dest)) {
      fail.push(year + " missing dest " + row.id);
      return;
    }
    const html = fs.readFileSync(dest, "utf8");
    const key = "pop3-" + row.id;
    const storage = "itt" + year.slice(2) + "-pop3-" + row.id;
    if (!html.includes('data-pop-pick')) fail.push(year + "/" + row.id + " no pick");
    if (!html.includes("data-pop-req")) fail.push(year + "/" + row.id + " no req");
    if (!html.includes("data-pop-field")) fail.push(year + "/" + row.id + " no field");
    if (!html.includes('data-pop-go')) fail.push(year + "/" + row.id + " no go");
    if (!html.includes('data-pop-key="' + key + '"')) {
      fail.push(year + "/" + row.id + " missing data-pop-key=" + key);
    }
    if (!html.includes(storage)) fail.push(year + "/" + row.id + " missing next key " + storage);
    const goCount = (html.match(new RegExp('data-pop-key="' + key + '"', "g")) || []).length;
    if (goCount < 1) fail.push(year + "/" + row.id + " pop3-go count " + goCount);
    if (!/data-itt-year="/.test(html)) fail.push(year + "/" + row.id + " no data-itt-year");
    const next = html.match(/data-next-when-key="[^"]+"[\s\S]*?<a href="([^"]+)"/);
    if (!next) fail.push(year + "/" + row.id + " no next href");
    else {
      const nxt = relHref(path.dirname(dest), next[1]);
      if (!nxt || !fs.existsSync(nxt)) fail.push(year + "/" + row.id + " next broken " + next[1]);
    }
    const hrefRe = /href="([^"]+)"/g;
    let hm;
    while ((hm = hrefRe.exec(html))) {
      const t = relHref(path.dirname(dest), hm[1]);
      if (t && !fs.existsSync(t) && !fs.existsSync(t + "/index.html")) {
        fail.push(year + "/" + row.id + " broken href " + hm[1]);
      }
    }
    ok += 1;
  });
}

void FIRST;

console.log("audit-3x3-flows · dests checked " + ok + " · fail " + fail.length + " · warn " + warn.length);
if (warn.length) warn.forEach((w) => console.log("  WARN " + w));
if (fail.length) {
  fail.forEach((f) => console.log("  FAIL " + f));
  process.exit(1);
}
console.log("OK — 81 writers, homes, uniqueness, next hrefs");
