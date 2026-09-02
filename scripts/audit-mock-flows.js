#!/usr/bin/env node
/**
 * Mock-flow classifier — 23 ship years 1994–2006 + 2008 + 2010 + 2012–2019
 * (2025 boarded / wiped).
 *
 * Previous "no-mock" work kept failing because dest-field plaques
 * (scripts/build-5x-real-dests.py) satisfy the REAL e2e contract
 * (2 checks + required note → write) while remaining checkbox theater.
 *
 * Classes
 *   DEST_FIELD  factory plaque (period note + theater check + dest-field + Save)
 *   WEAK_REAL   data-min-req < 2, or "I saw / I watched" as the save action
 *   HASH_CTA    href="#" action word with no data-* hook
 *   UNWIRED     action button / submit with no product, pack, or REAL hook
 *   PACK        data-itt-pack twoClick / fillGo / pickStart (thin machine)
 *
 * Exit 1 on DEST_FIELD, WEAK_REAL, HASH_CTA.
 * UNWIRED and PACK are reported (WARN) — prove DEAD with e2e/mock-harvest.spec.js.
 *
 *   node scripts/audit-mock-flows.js
 *   node scripts/audit-mock-flows.js --json
 *   node scripts/audit-mock-flows.js --allow-dest-field
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const WIPED = new Set(["2025"]);
const YEARS = [];
for (let y = 1994; y <= 2025; y++) {
  const s = String(y);
  if (!WIPED.has(s)) YEARS.push(s);
}

const argv = process.argv.slice(2);
const WANT_JSON = argv.includes("--json");
const ALLOW_DEST = argv.includes("--allow-dest-field");

const PRODUCT_HOOK = new RegExp(
  [
    "data-itt-real-",
    "data-itt-popular-",
    "data-itt-pack",
    "data-itt-product-action",
    "data-official-verb",
    "data-official-trap",
    "data-official-key",
    "data-lo-",
    "data-drive-",
    "data-ch21-",
    "data-gpt22-",
    "data-tw22-",
    "data-wd22-",
    "data-sd22-",
    "data-md22-",
    "data-br22-",
    "data-dl22-",
    "data-ch22-",
    "data-prompt-",
    "data-pop3-",
    "data-wa14-",
    "data-hb14-",
    "data-ice14-",
    "data-ip14-",
    "data-sl14-",
    "data-mat14-",
    "data-tw14-",
    "data-nft-",
    "data-sq-",
    "data-mw09-",
    "data-yt09-",
    "data-tw13-",
    "data-med13-",
    "data-gpt-",
    "data-edge-",
    "data-epic-",
    "data-hbo-",
    "data-wti-",
    "data-meet-",
    "data-mx-",
    "data-pk-",
    "data-extra-a-",
    "data-extra-b-",
    "data-shy-",
    "data-eo-",
    "data-tw-",
    "data-pack-",
    "data-req",
    "data-ott-",
    "data-5x-",
    "data-4x-",
    "data-next-flow",
    "data-add-cart",
    "data-yt-",
    "data-yt12-",
    "data-ipo-",
    "data-fb1b-",
    "data-sopa-",
    "data-sopa-seen",
    "data-sopa-cheat",
    "data-seti-",
    "data-pets-",
    "data-hc13-",
    "data-wb-",
    "data-banner-",
    "data-wc-",
    "data-feed-",
    "data-ff06-",
    "data-tw06-",
    "data-yt06-",
    "data-ty06-",
    "data-p06-",
    "data-game-start",
    "data-game-score",
    "data-peg-",
    "id=\"play-start\"",
    "id=\"play-clear\"",
    "data-fv09-",
    "data-sr11-",
    "data-sv07-",
    "data-le-",
    "data-flash-",
    "data-pogo-",
    "data-hear-",
    "data-dplus-",
    "data-gi-",
    "data-flip-",
    "data-tinder-",
    "data-sc-",
    "data-snap12-",
    "data-tumblr-",
    "data-pin-",
    "data-ig12-",
    "data-digg",
    "data-reddit",
    "data-gmail",
    "data-fb-",
    "data-pc-sub",
    "data-icq-",
    "data-aim-",
    "data-hm-",
    "data-player-",
    "data-plugin-",
    "data-tf-",
    "data-itunes",
    "data-appstore-",
    "data-android-",
    "data-chrome-",
    "data-ns-",
    "data-igtv-",
    "data-hulu-",
    "data-farm-",
    "data-4sq-",
    "data-ks-",
    "data-nf-",
    "data-spotify-",
    "data-maps-",
    "data-watch",
    "data-cmd",
    "data-close",
    "data-itt-download",
    "data-year-game",
    "data-bid-form",
    "data-auction-",
    "data-high-bid",
    "data-homestead",
    "data-webring",
    "data-friendster",
    "data-flickr",
    "data-wp-",
    "data-ms-",
    "data-myspace",
    "data-blogger",
    "data-sd-",
    "data-pd-",
    "data-fish-",
    "data-iuma",
    "data-csotd",
    "data-li-",
    "data-linkedin",
    "data-pb-",
    "data-napster",
    "data-kazaa",
    "data-ytp",
    "data-pod-",
    "data-docs-",
    "data-hm-",
    "data-napster",
    "napster-install",
    "data-beacon",
    "data-ff-",
    "data-opensocial",
    "data-iphone",
    "data-netflix",
    "data-dropbox",
    "data-flash",
    "data-zengarden",
    "data-folklore",
    "data-elon",
    "data-cl-",
    "data-craigslist",
    "data-sf-",
    "data-zen-",
    "data-folk-",
    "data-os-",
    "data-game-",
    "data-pop-",
    "data-ig-",
    "data-fb-",
    "data-gdpr-",
    "data-faceid-",
    "data-watch",
    "data-peri-",
    "data-og-like",
    "data-pin-save",
    "data-groupon-",
    "data-ballot-",
    "data-snap-",
    "data-siri-",
    "data-timeline-",
    "data-qwikster-",
    "data-gplus-",
    "data-abnb-",
    "data-tw-280",
    "data-animoji-",
    "data-ml-post",
    "data-win10-",
    "data-gp-",
    "data-dc-join",
    "data-lot-buy",
    "data-lot-party",
    "data-photo-pick",
    "data-airpods-",
    "data-iphone7-",
    "data-faceid-",
    "data-play-word",
    "data-word",
    "data-arc-",
    "data-tt-",
    "data-zoom-",
    "data-copilot-",
    "data-sig-",
    "data-att-",
    "data-ft-",
    "data-gi-",
    "data-ks-",
    "data-w11-",
    "data-hear-",
    "data-gdpr-",
    "data-dplus-",
    "data-reels-",
    "data-ccpa-",
    "data-stadia-",
    "data-ip11-",
    "data-ip12-",
    "data-tv-",
    "data-ch-",
    "data-w10-",
    "data-meta-",
    "data-medium-",
    "data-path-",
    "data-among-",
    "data-five-",
    "data-cr-",
    "data-mm-",
    "data-app-",
    "data-ip07-",
    "data-gm07-",
    "data-sv07-",
    "data-fb07-",
    "data-tw07-",
    "data-yt07-",
    "data-ms07-",
    "data-dg07-",
    "data-vi07-",
    "data-kd07-",
    "data-tb07-",
    "data-xa07-",
    "data-xb07-",
    "data-lk09-",
    "data-fv09-",
    "data-bg09-",
    "data-ip09-",
    "data-as09-",
    "data-tw09-",
    "data-fq09-",
    "data-ks09-",
    "data-w709-",
    "data-gp11-",
    "data-sp11-",
    "data-sr11-",
    "data-tl11-",
    "data-pd11-",
    "data-ab11-",
    "data-ig11-",
    "data-qw11-",
    "data-tw11-",
    "data-vn13-",
    "data-ig13-",
    "data-sn13-",
    "data-io13-",
    "data-td13-",
    "data-sd13-",
    "data-tg13-",
    "data-tb13-",
    "data-w813-",
    "data-xa-",
    "data-xb-",
    "data-peg-",
    "data-4x-",
    "data-ytl",
    "data-p06-",
    "data-tw06-",
    "data-ty06-",
    "data-p17-",
    "data-p18-",
    "data-p19-",
    "data-p21-",
    "data-p22-",
    "data-p23-",
    "data-plus-go",
    "data-plus-",
    "data-4o-",
    "data-pop-",
    "data-pop3",
    "data-ott-",
    "data-full-trap",
    "data-z20-",
    "data-v20-",
    "data-z24-",
    "data-v24-"
  ].join("|"),
  "i"
);

const ACTION_WORD =
  /\b(save|submit|install|download|buy|sign\s*(on|in)?|post|upload|join|play|send|bid|search|login|log\s*in|register|like|digg|bury|subscribe|wink|resign|queue)\b/i;

const DEST_NOTE = /I read the \d{4} period note/i;
const DEST_THEATER = /This is museum theater/i;
const DEST_FIELD = /data-dest-field/;
const DEST_SAVE = /data-itt-real-save/;
const SAVE_LOCAL = /Save \(local only\)/;

function walk(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (ent.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, "/");
}

function isShell(fileRel) {
  return /^years\/\d{4}\/index\.html$/.test(fileRel);
}

function classifyPage(fileRel, html) {
  const hits = [];
  const nReq = (html.match(/\bdata-req\b/g) || []).length;
  const mins = [];
  const minRe = /data-min-req="(\d+)"/g;
  let m;
  while ((m = minRe.exec(html))) mins.push(parseInt(m[1], 10));

  const factory =
    DEST_NOTE.test(html) &&
    DEST_THEATER.test(html) &&
    DEST_FIELD.test(html) &&
    DEST_SAVE.test(html) &&
    SAVE_LOCAL.test(html);
  if (factory) {
    hits.push({
      kind: "DEST_FIELD",
      sev: "fail",
      msg: "5× dest-field plaque (period note + theater check + dest-field + Save)"
    });
  } else if (DEST_NOTE.test(html) && DEST_SAVE.test(html)) {
    hits.push({
      kind: "DEST_FIELD",
      sev: "fail",
      msg: "period-note REAL plaque (not a product machine)"
    });
  }

  if (DEST_SAVE.test(html) && mins.some((n) => n < 2)) {
    hits.push({
      kind: "WEAK_REAL",
      sev: "fail",
      msg: "data-min-req < 2 (" + mins.join(",") + ") — one-click / one-check write"
    });
  }
  if (DEST_SAVE.test(html) && nReq < 2 && (!mins.length || Math.min.apply(null, mins) < 2)) {
    hits.push({
      kind: "WEAK_REAL",
      sev: "fail",
      msg: "real-save with " + nReq + " data-req checkbox(es)"
    });
  }

  const sawRe =
    /<(?:button|a)[^>]*>\s*I\s+(saw|watched|visited|acknowledge)\b[\s\S]{0,40}<\/(?:button|a)>/gi;
  while ((m = sawRe.exec(html))) {
    hits.push({
      kind: "WEAK_REAL",
      sev: "fail",
      msg: "one-click literacy CTA: " + m[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 60)
    });
  }

  const hashRe = /<(?:a|button)([^>]*)href\s*=\s*["']#["']([^>]*)>([\s\S]{0,80})<\/(?:a|button)>/gi;
  while ((m = hashRe.exec(html))) {
    const tag = (m[1] || "") + (m[2] || "");
    const inner = (m[3] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!inner) continue;
    if (/ok|dismiss|skip|top|back to/i.test(inner)) continue;
    if (PRODUCT_HOOK.test(tag) || PRODUCT_HOOK.test(m[0])) continue;
    if (ACTION_WORD.test(inner)) {
      hits.push({
        kind: "HASH_CTA",
        sev: "fail",
        msg: 'href="#" action with no hook: ' + inner.slice(0, 60)
      });
    }
  }

  if (/data-itt-pack/.test(html)) {
    const typ = (html.match(/data-itt-pack-type="([^"]+)"/) || [])[1] || "pack";
    hits.push({
      kind: "PACK",
      sev: "warn",
      msg: "year-true pack (" + typ + ") — two-click / fillGo machine, not dest-field"
    });
  }

  if (!isShell(fileRel)) {
    const btnRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
    while ((m = btnRe.exec(html))) {
      const attrs = m[1] || "";
      const inner = (m[2] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!ACTION_WORD.test(inner) && !ACTION_WORD.test(attrs)) continue;
      if (PRODUCT_HOOK.test(attrs) || PRODUCT_HOOK.test(inner) || PRODUCT_HOOK.test(m[0])) continue;
      if (/data-close|id="(connect|skip|dlg-)/i.test(attrs)) continue;
      /* submit inside a form[action] is real navigation */
      const before = html.slice(Math.max(0, m.index - 2500), m.index);
      const formOpen = before.lastIndexOf("<form");
      const formClose = before.lastIndexOf("</form>");
      if (formOpen > formClose) {
        const formTag = before.slice(formOpen, formOpen + 400);
        if (/\baction\s*=/.test(formTag) || PRODUCT_HOOK.test(formTag) || /data-/.test(formTag)) continue;
      }
      /* Playable year-game chrome */
      if (/sites\/playable\//.test(fileRel) && /resign|start|retry|play coin|submit ballot/i.test(inner)) continue;
      hits.push({
        kind: "UNWIRED",
        sev: "warn",
        msg: "action button with no product/REAL/pack hook: " + (inner || attrs).slice(0, 70)
      });
    }
  }

  return hits;
}

const issues = [];
const summary = { DEST_FIELD: 0, WEAK_REAL: 0, HASH_CTA: 0, UNWIRED: 0, PACK: 0 };

for (const year of YEARS) {
  const files = walk(path.join(ROOT, "years", year), []);
  for (const file of files) {
    const fileRel = rel(file);
    let html;
    try {
      html = fs.readFileSync(file, "utf8");
    } catch (e) {
      continue;
    }
    const hits = classifyPage(fileRel, html);
    const seen = {};
    for (const h of hits) {
      const k = h.kind + "|" + h.msg;
      if (seen[k]) continue;
      seen[k] = true;
      summary[h.kind] = (summary[h.kind] || 0) + 1;
      issues.push({ year, file: fileRel, kind: h.kind, sev: h.sev, msg: h.msg });
    }
  }
}

const fails = issues.filter((i) => {
  if (i.sev !== "fail") return false;
  if (ALLOW_DEST && i.kind === "DEST_FIELD") return false;
  return true;
});

if (WANT_JSON) {
  process.stdout.write(
    JSON.stringify({ summary, fail: fails.length, issues }, null, 2) + "\n"
  );
} else {
  console.log("audit-mock-flows — 31 years (2025 boarded)");
  console.log(
    "  DEST_FIELD " +
      summary.DEST_FIELD +
      "  WEAK_REAL " +
      summary.WEAK_REAL +
      "  HASH_CTA " +
      summary.HASH_CTA +
      "  UNWIRED " +
      summary.UNWIRED +
      "  PACK " +
      summary.PACK
  );
  console.log("");
  function dump(kind, title) {
    const rows = issues.filter((i) => i.kind === kind);
    if (!rows.length) return;
    console.log("## " + title + " (" + rows.length + ")");
    const byYear = {};
    for (const r of rows) (byYear[r.year] = byYear[r.year] || []).push(r);
    for (const y of Object.keys(byYear).sort()) {
      console.log("  " + y);
      for (const r of byYear[y]) console.log("    " + r.file + " — " + r.msg);
    }
    console.log("");
  }
  dump("DEST_FIELD", "DEST_FIELD · factory plaques (pass REAL e2e, still mock)");
  dump("WEAK_REAL", "WEAK_REAL · one-check / I-saw write");
  dump("HASH_CTA", "HASH_CTA · href=# action, no hook");
  dump("UNWIRED", "UNWIRED · action button, no hook (warn — harvest to prove DEAD)");
  dump("PACK", "PACK · year-true two-click / fillGo (thin machine, not dest-field)");

  if (!fails.length) {
    console.log("audit-mock-flows OK — no dest-field / weak-real / hash-cta");
  } else {
    console.log("audit-mock-flows FAIL — " + fails.length + " high-confidence mock(s)");
    console.log("These pass incomplete-never-writes e2e and still are not product machines.");
    console.log("Factory: scripts/build-5x-real-dests.py  ·  allow: --allow-dest-field");
  }
}

process.exit(fails.length ? 1 : 0);
