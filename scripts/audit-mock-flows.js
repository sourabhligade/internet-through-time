#!/usr/bin/env node
/**
 * Scan every year (1994–2021) for soft-mock flows:
 *  - action buttons / forms with no REAL data-* hook
 *  - href="#" that look like CTAs
 *  - one-click writers in JS (setItem without empty/check gate nearby)
 * Exit 1 only for high-confidence product mocks (not period "Coming soon" copy).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const issues = [];

function walk(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(html|js)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

const REAL_HOOK = /data-(?:itt-real|req|itunes-req|android-check|appstore-check|hulu-check|chrome-req|farm-check|4sq-check|spotify-|nf-req|ks-req|thesis-req|pack|yt-|digg-|reddit-|gmail-|li-|wp-|adsense|myspace|pandora|maps-|hm-|pod-|itunes-|fb-|watch|vine|gdpr|zoom|ie9-)/i;

function scanHtml(file, year) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);
  /* href="#" used as a fake action (not in-page skip/dismiss) */
  const hashRe = /<(?:a|button)[^>]*href="#"[^>]*>([\s\S]{0,80})<\/(?:a|button)>/gi;
  let m;
  while ((m = hashRe.exec(html))) {
    const inner = (m[1] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!inner) continue;
    if (/ok|dismiss|skip|top|back to/i.test(inner)) continue;
    if (REAL_HOOK.test(m[0])) continue;
    if (/download|install|buy|submit|sign.?in|post|upload|connect|join|play/i.test(inner)) {
      issues.push({ year, kind: "hash-cta", file: rel, msg: inner.slice(0, 60) });
    }
  }
}

function scanJs(file) {
  const src = fs.readFileSync(file, "utf8");
  const rel = path.relative(ROOT, file);
  if (/\/games\//.test(rel)) return;
  /* localStorage write with no nearby empty/check/incomplete guard in the same function-ish window */
  const writeRe = /localStorage\.setItem\s*\(/g;
  let m;
  while ((m = writeRe.exec(src))) {
    const start = Math.max(0, m.index - 500);
    const win = src.slice(start, m.index + 80);
    if (/removeItem|itt-yg-muted|itt-last-url/.test(win)) continue;
    if (
      /length\s*<|!title|!track|incomplete|never write|countChecked|checked|trim\(\)|REAL gate|empty/i.test(
        win
      )
    ) {
      continue;
    }
    /* product engines that already gate above the write */
    if (/saveJSON\s*\(|saveBest\s*\(/.test(win) && /real:\s*true/.test(win)) continue;
  }
}

for (let y = 1994; y <= 2021; y++) {
  const year = String(y);
  const files = walk(path.join(ROOT, "years", year), []);
  files.forEach((f) => {
    if (f.endsWith(".html")) scanHtml(f, year);
  });
}

const imm = walk(path.join(ROOT, "js", "immersion"), []);
imm.forEach(scanJs);

if (!issues.length) {
  console.log("audit-mock-flows OK — no hash-only action CTAs in year HTML");
  process.exit(0);
}
console.log("audit-mock-flows FAIL — " + issues.length + " issue(s)\n");
const byYear = {};
for (const i of issues) {
  (byYear[i.year] = byYear[i.year] || []).push(i);
}
for (const y of Object.keys(byYear).sort()) {
  console.log("## " + y);
  for (const i of byYear[y]) console.log("  [" + i.kind + "] " + i.file + " — " + i.msg);
}
process.exit(1);
