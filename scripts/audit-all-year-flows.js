#!/usr/bin/env node
/**
 * All-year flow report — 23 ship years (1994–2006 + 2008 + 2010 + 2012–2019).
 *
 * Classes (strict):
 *   REAL      named product hook + incomplete-never-writes + JSON {real, multiStep}
 *   LITERACY  two+ ticks / thesis / dual-cite panel (not a product machine)
 *   LEFTOVER  year-true pack / 3× fillGo / leftover gold (thin but gated)
 *   PLAQUE    data-5x-req + data-5x-save checkbox theater
 *   VISIT     official stop with no whenKey and no writer
 *   MISSING   href on disk trail points at a file that is gone
 *   UNWIRED   action button / href=# with no product, pack, or REAL hook
 *
 * Usage:
 *   node scripts/audit-all-year-flows.js
 *   node scripts/audit-all-year-flows.js --json
 *   node scripts/audit-all-year-flows.js --md > docs/ALL-YEAR-FLOW-MOCK-REPORT.md
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const WANT_JSON = process.argv.includes("--json");
const WANT_MD = process.argv.includes("--md");

const WIPED = new Set(["2025"]);
const YEARS = [];
for (let y = 1994; y <= 2025; y++) {
  if (!WIPED.has(String(y))) YEARS.push(String(y));
}

const STARS = {
  1994: { name: "CSotD guestbook", href: "sites/csotd/index.html", key: "itt94-csotd" },
  1995: { name: "Amazon SSL checkout", href: "sites/amazon/ssl-checkout.html", key: "itt95-ssl-checkout" },
  1996: { name: "Portal wars", href: "sites/portals/wars.html", key: "itt96-portal-wars" },
  1997: { name: "PointCast", href: "sites/pointcast/index.html", key: "itt97-pointcast" },
  1998: { name: "I'm Feeling Lucky", href: "sites/google/lucky.html", key: "itt98-lucky" },
  1999: { name: "AIM sign-on", href: "sites/aim/index.html", key: "itt99-aim" },
  2000: { name: "MapQuest", href: "sites/mapquest/index.html", key: "itt00-mapquest" },
  2001: { name: "Wikipedia edit", href: "sites/wikipedia/edit.html", key: "itt01-wiki-pages" },
  2002: { name: "StumbleUpon", href: "sites/stumbleupon/index.html", key: "itt02-stumble" },
  2003: { name: "Photobucket", href: "sites/photobucket/index.html", key: "itt03-photobucket" },
  2004: { name: "thefacebook networks", href: "sites/facebook/networks.html", key: "itt04-thefacebook-networks" },
  2005: { name: "YouTube upload", href: "sites/youtube/upload.html", key: "itt05-yt-uploads" },
  2006: { name: "Twitter compose", href: "sites/twitter/index.html", key: "itt06-tweets" },
  2007: { name: "iPhone Safari", href: "sites/iphone/index.html", key: "itt07-iphone" },
  2008: { name: "App Store shelf", href: "sites/appstore/index.html", key: "itt08-apps" },
  2009: { name: "Facebook Like", href: "sites/facebook/index.html", key: "itt09-like" },
  2010: { name: "Instagram filter+share", href: "sites/instagram/index.html", key: "itt10-ig" },
  2011: { name: "Google+", href: "sites/googleplus/index.html", key: "itt11-gplus" },
  2012: { name: "Instagram Android", href: "sites/instagram/android.html", key: "itt12-ig-android" },
  2013: { name: "Vine 6s", href: "sites/vine/record.html", key: "itt13-vine-posts" },
  2014: { name: "WhatsApp Install", href: "sites/whatsapp/index.html", key: "itt14-wa-install" },
  2015: { name: "Periscope Go LIVE", href: "sites/periscope/index.html", key: "itt15-periscope" },
  2016: { name: "Instagram Stories", href: "sites/instagram/stories.html", key: "itt16-ig-stories" },
  2017: { name: "Face ID / iPhone X", href: "sites/iphone/x.html", key: "itt17-faceid" },
  2018: { name: "GDPR Manage", href: "sites/gdpr/index.html", key: "itt18-gdpr" },
  2019: { name: "Disney+ Continue", href: "sites/disneyplus/home.html", key: "itt19-disneyplus" }};

const PRODUCT_HOOK = new RegExp(
  [
    "data-itt-real-",
    "data-itt-popular-",
    "data-itt-pack",
    "data-itt-product-action",
    "data-pack-",
    "data-ott-",
    "data-add-cart",
    "data-yt-",
    "data-digg",
    "data-reddit",
    "data-gmail",
    "data-fb-",
    "data-pc-sub",
    "data-icq-",
    "data-aim-",
    "data-hm-",
    "data-tf-",
    "data-itunes",
    "data-appstore-",
    "data-android-",
    "data-chrome-",
    "data-hulu-",
    "data-farm-",
    "data-4sq-",
    "data-ks-",
    "data-nf-",
    "data-spotify-",
    "data-maps-",
    "data-watch",
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
    "data-pb-",
    "data-napster",
    "data-kazaa",
    "data-ytp",
    "data-pod-",
    "data-docs-",
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
    "data-csotd",
    "data-iuma",
    "data-li-",
    "data-linkedin",
    "data-google",
    "data-ssl-form",
    "data-portal",
    "data-mq-form",
    "data-wiki-save",
    "data-su-",
    "data-gh-issue",
    "data-ig-",
    "data-gplus-",
    "data-vine-",
    "data-wa-",
    "data-peri-",
    "data-gp-",
    "data-beats-",
    "data-ipad-",
    "data-iphone4-",
    "data-og-",
    "data-siri",
    "data-airbnb",
    "data-qwikster",
    "data-timeline",
    "data-snap-",
    "data-telegram",
    "data-tumblr",
    "data-win81",
    "data-ios7",
    "data-touchid",
    "data-snowden",
    "data-heartbleed",
    "data-icebucket",
    "data-applepay",
    "data-material",
    "data-slack",
    "data-twitch",
    "data-gwx",
    "data-win10",
    "data-am-",
    "data-le-",
    "data-echo",
    "data-discord",
    "data-edge",
    "data-blockers",
    "data-year-game",
    "data-pop-go",
    "data-pop-field",
    "data-dplus-",
    "data-tt-",
    "data-arc-",
    "data-tv-",
    "data-stadia-",
    "data-ip11-",
    "data-ip12-",
    "data-app-",
    "data-ch-",
    "data-w10-",
    "data-w11-",
    "data-zoom-",
    "data-gpt-",
    "data-wrd-",
    "data-mj-",
    "data-cga-",
    "data-br-",
    "data-bing-",
    "data-th-",
    "data-g4-",
    "data-bard-",
    "data-yg-",
    "data-reels-",
    "data-ccpa-",
    "data-att-",
    "data-sig-",
    "data-copilot-",
    "data-meta-",
    "data-fb1b-",
    "data-flip-",
    "data-pin-",
    "data-medium-",
    "data-path-",
    "data-among-",
    "data-five-",
    "data-cr-",
    "data-mm-",
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
    "data-peg-"
  ].join("|"),
  "i"
);

const ACTION_WORD =
  /\b(save|submit|install|download|buy|sign\s*(on|in)?|post|upload|join|play|send|bid|search|login|log\s*in|register|like|digg|bury|subscribe|wink|resign|queue|order|go live|share|record)\b/i;

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

function loadTrails() {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const m = src.match(/ITT\.flowTrails\s*=\s*(\{[\s\S]*\});?\s*\n\}\)/);
  if (!m) throw new Error("could not parse flow-trails.js");
  return Function("return (" + m[1] + ")")();
}

function loadPop3x() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/popular-3x-sites.json"), "utf8"));
}

function pagePath(year, href) {
  if (!href) return null;
  const clean = href.split("#")[0].split("?")[0];
  return path.join(ROOT, "years", year, clean);
}

function classifyHtml(html, fileRel) {
  const out = {
    plaque: /data-5x-save/.test(html) && /data-5x-req/.test(html),
    destField:
      /data-dest-field/.test(html) && /data-itt-real-save/.test(html),
    pack: /data-itt-pack/.test(html),
    packType: ((html.match(/data-itt-pack-type="([^"]+)"/) || [])[1] || ""),
    pop3x: /data-pop-go/.test(html) && /data-pop-field/.test(html),
    realSave: /data-itt-real-save/.test(html),
    thesis: /data-storage-key="thesis-ack"/.test(html) || /data-thesis-req/.test(html),
    product: PRODUCT_HOOK.test(html) && !(/data-5x-save/.test(html) && !PRODUCT_HOOK.test(html.replace(/data-5x-[^>]*/g, ""))),
    namedProduct: false,
    hashCta: [],
    unwired: []
  };

  // named product = a specific data-* hook besides 5x / pack / pop
  const namedRe =
    /data-(?:csotd|ssl-form|portal|pc-sub|google-lucky|aim-|mq-form|wiki-save|su-|pb-|fb-|yt-upload|twitter-compose|iphone-ott|gh-issue|ig12-|ig-|gplus-|vine-|wa-|peri-|gp-|ipad-|ipad2-|iphone4-|iphone7-|og-like|siri|airbnb|abnb-|qwikster|snap-|story-|telegram|tg-|tumblr|win81|ios7|touchid|touch-|snowden|heartbleed|icebucket|ice-|applepay|pay-|material|slack|twitch|gwx|win10|am-|le-|echo|discord|edge|blockers|add-cart|bid-form|homestead|friendster|gmail|flickr|myspace|blogger|napster|itunes|appstore|android|chrome|farm-|4sq-|spotify-|netflix|dropbox|reddit|digg|linkedin|craigslist|iuma|webring|year-game|icq-|msn-|tw-|hb-|watch-|discover-|dc-|timeline-|iphone6-|siri-|av-search|ns-download|lycos-search|sj-planet|drudge-story|y2k-|td-|paypal-send|fish-|wh-map|hotmail-|yahoo-wander|sd-comment|faceid-|gdpr-|ipo-|sopa-|4x-field|4x-hop|4x-go|4x-req|pogo-|igtv-|fyp-|hear-|ns-|hp-|sp-|fn-|wannacry|equifax|musically|airpods|ballot-|dyn-|react-|t280|teams|switch|maps-|sv-|ie6-|beacon-|flash|ip07-|gm07-|sv07-|fb07-|tw07-|yt07-|ms07-|dg07-|vi07-|kd07-|tb07-|xa07-|xb07-|lk09-|fv09-|bg09-|ip09-|as09-|tw09-|fq09-|ks09-|w709-|gp11-|sp11-|sr11-|tl11-|pd11-|ab11-|ig11-|qw11-|tw11-|vn13-|ig13-|sn13-|io13-|td13-|sd13-|tg13-|tb13-|w813-|xa-|xb-|peg-|dplus-|tt-|arc-|tv-|stadia-|ip11-|ip12-|app-|ch-|w10-|w11-|zoom-|reels-|ccpa-|att-|sig-|copilot-|meta-|fb1b-|flip-|pin-|medium-|path-|among-|five-|cr-|mm-|gpt-|wrd-|mj-|cga-|br-|bing-|th-|g4-|bard-|elon-|yg-|x-go|x-req|x-field|x-trap|prompt)[a-z0-9-]*/gi;
  const named = html.match(namedRe) || [];
  out.namedProduct = named.length > 0;
  out.namedHooks = Array.from(new Set(named)).slice(0, 8);

  const hashRe = /<(?:a|button)([^>]*)href\s*=\s*["']#["']([^>]*)>([\s\S]{0,80})<\/(?:a|button)>/gi;
  let m;
  while ((m = hashRe.exec(html))) {
    const tag = (m[1] || "") + (m[2] || "");
    const inner = (m[3] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!inner) continue;
    if (/ok|dismiss|skip|top|back to/i.test(inner)) continue;
    if (PRODUCT_HOOK.test(tag) || PRODUCT_HOOK.test(m[0])) continue;
    if (ACTION_WORD.test(inner)) out.hashCta.push(inner.slice(0, 60));
  }

  if (!/^years\/\d{4}\/index\.html$/.test(fileRel)) {
    const btnRe = /<button\b([^>]*)>([\s\S]*?)<\/button>/gi;
    while ((m = btnRe.exec(html))) {
      const attrs = m[1] || "";
      const inner = (m[2] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!ACTION_WORD.test(inner) && !ACTION_WORD.test(attrs)) continue;
      if (PRODUCT_HOOK.test(attrs) || PRODUCT_HOOK.test(inner) || PRODUCT_HOOK.test(m[0])) continue;
      if (/data-close|data-5x-save|data-itt-real-save|data-pop-go/i.test(attrs)) continue;
      const before = html.slice(Math.max(0, m.index - 2500), m.index);
      const formOpen = before.lastIndexOf("<form");
      const formClose = before.lastIndexOf("</form>");
      if (formOpen > formClose) {
        const formTag = before.slice(formOpen, formOpen + 400);
        if (/\baction\s*=/.test(formTag) || PRODUCT_HOOK.test(formTag) || /data-/.test(formTag)) continue;
      }
      if (/sites\/playable\//.test(fileRel) && /resign|start|retry|play coin|submit ballot/i.test(inner)) continue;
      out.unwired.push((inner || attrs).slice(0, 70));
    }
  }

  return out;
}

function gradePage(cls, whenKey) {
  if (cls.destField && !cls.namedProduct) return "PLAQUE";
  if (cls.plaque && cls.namedProduct) return "REAL+PLAQUE";
  if (cls.plaque && !cls.namedProduct) return "PLAQUE";
  if (cls.pop3x && !cls.namedProduct) return "LEFTOVER";
  if (cls.pack && !cls.namedProduct) return "LEFTOVER";
  if (cls.thesis && !cls.namedProduct) return "LITERACY";
  if (cls.namedProduct) return "REAL";
  if (cls.realSave && !cls.namedProduct) return "LITERACY";
  if (!whenKey) return "VISIT";
  return "VISIT";
}

function gradeLabel(g) {
  return (
    {
      REAL: "REAL product machine",
      "REAL+PLAQUE": "REAL hook + leftover 5× plaque on same page",
      LITERACY: "literacy / thesis ticks (not a product)",
      LEFTOVER: "leftover thin (pack / 3× fill+go)",
      PLAQUE: "MOCK — checkbox plaque (data-5x-save)",
      VISIT: "visit-only (no writer / empty whenKey)",
      MISSING: "MISSING file",
      UNWIRED: "UNWIRED action (no hook)"
    }[g] || g
  );
}

const trails = loadTrails();
const pop3x = loadPop3x();
const report = [];

for (const year of YEARS) {
  const row = {
    year,
    star: null,
    official: [],
    pop: [],
    extraPlaques: [],
    extraUnwired: [],
    extraHash: [],
    extraPacks: [],
    counts: { REAL: 0, "REAL+PLAQUE": 0, LITERACY: 0, LEFTOVER: 0, PLAQUE: 0, VISIT: 0, MISSING: 0 }
  };

  const star = STARS[year];
  if (star) {
    const abs = pagePath(year, star.href);
    const exists = abs && fs.existsSync(abs);
    let cls = {};
    let grade = "MISSING";
    if (exists) {
      const html = fs.readFileSync(abs, "utf8");
      cls = classifyHtml(html, rel(abs));
      grade = gradePage(cls, star.key);
    }
    row.star = { ...star, exists, grade, hooks: cls.namedHooks || [], plaque: !!cls.plaque };
    row.counts[grade] = (row.counts[grade] || 0) + 1;
  }

  const stops = trails[year] || [];
  for (const stop of stops) {
    const abs = pagePath(year, stop.href);
    const exists = abs && fs.existsSync(abs);
    let cls = {};
    let grade = "MISSING";
    if (exists) {
      const html = fs.readFileSync(abs, "utf8");
      cls = classifyHtml(html, rel(abs));
      grade = gradePage(cls, stop.whenKey);
    }
    row.official.push({
      n: stop.n,
      name: stop.name,
      href: stop.href,
      whenKey: stop.whenKey || "",
      exists,
      grade,
      hooks: cls.namedHooks || [],
      plaque: !!cls.plaque,
      pack: !!cls.pack,
      hash: cls.hashCta || [],
      unwired: cls.unwired || []
    });
    row.counts[grade] = (row.counts[grade] || 0) + 1;
  }

  const pops = pop3x[year] || [];
  for (const p of pops) {
    const href = "sites/" + p.id + "/index.html";
    const abs = pagePath(year, href);
    const exists = abs && fs.existsSync(abs);
    let cls = {};
    let grade = "MISSING";
    if (exists) {
      const html = fs.readFileSync(abs, "utf8");
      cls = classifyHtml(html, rel(abs));
      grade = "LEFTOVER";
    }
    row.pop.push({
      id: p.id,
      name: p.name,
      href,
      key: "itt" + year.slice(2) + "-pop-" + p.id,
      exists,
      grade,
      theater: /\(theater\)/i.test(p.btn || "")
    });
  }

  // rest of year tree: leftover plaques / packs / hash not already listed
  const listed = new Set();
  if (star) listed.add(path.join("years", year, star.href).replace(/\\/g, "/"));
  for (const s of row.official) listed.add(path.join("years", year, s.href).replace(/\\/g, "/"));
  for (const p of row.pop) listed.add(path.join("years", year, p.href).replace(/\\/g, "/"));

  const files = walk(path.join(ROOT, "years", year), []);
  for (const file of files) {
    const fileRel = rel(file);
    if (listed.has(fileRel)) continue;
    if (/\/index\.html$/.test(fileRel) && fileRel.split("/").length === 3) continue;
    let html;
    try {
      html = fs.readFileSync(file, "utf8");
    } catch (e) {
      continue;
    }
    const cls = classifyHtml(html, fileRel);
    if (cls.plaque || cls.destField) row.extraPlaques.push(fileRel);
    if (cls.pack) row.extraPacks.push(fileRel + (cls.packType ? " (" + cls.packType + ")" : ""));
    if (cls.hashCta && cls.hashCta.length) {
      row.extraHash.push({ file: fileRel, msgs: cls.hashCta.slice(0, 3) });
    }
    if (cls.unwired && cls.unwired.length) {
      row.extraUnwired.push({ file: fileRel, msgs: cls.unwired.slice(0, 3) });
    }
  }

  report.push(row);
}

function verdict(row) {
  const plaqueOnOfficial = row.official.filter((s) => s.grade === "PLAQUE" || s.plaque).length;
  const missing = row.official.filter((s) => s.grade === "MISSING").length;
  const visit = row.official.filter((s) => s.grade === "VISIT").length;
  const real = row.official.filter((s) => s.grade === "REAL" || s.grade === "REAL+PLAQUE").length;
  if (missing) return "FAIL — missing official dest";
  if (row.star && (row.star.grade === "PLAQUE" || row.star.grade === "MISSING")) return "FAIL — star is mock/missing";
  if (plaqueOnOfficial && real < 4) return "FAIL — official trail is mostly plaques";
  if (plaqueOnOfficial) return "MIXED — star REAL, some official stops still plaques";
  if (visit >= 6) return "MIXED — star REAL, most official stops are visit-only";
  if (real >= 6) return "OK — official trail mostly REAL";
  if (real >= 4 && !plaqueOnOfficial) return "OK — official plaques gone";
  return "MIXED";
}

if (WANT_JSON) {
  process.stdout.write(JSON.stringify({ years: report }, null, 2) + "\n");
  process.exit(0);
}

function md() {
  const lines = [];
  lines.push("# All-year flow mock report — 1994–2015");
  lines.push("");
  lines.push("Generated by `scripts/audit-all-year-flows.js`. Static HTML + hook scan — not a Playwright run.");
  lines.push("");
  lines.push("## How to read a grade");
  lines.push("");
  lines.push("| Grade | Meaning | Mock? |");
  lines.push("| --- | --- | --- |");
  lines.push("| **REAL** | Named product hook. Empty never writes. Writes JSON `{real, multiStep}`. | No |");
  lines.push("| **REAL+PLAQUE** | Product hook is on the page, plus a leftover `data-5x-save` checkbox. | Plaque is mock; hook is not |");
  lines.push("| **LITERACY** | Thesis / dual-cite ticks. Museum reading, not a product. | No (allowed) |");
  lines.push("| **LEFTOVER** | Year-true pack or 3× popular fill+go. Thin, gated, not the chip. | Thin, not dest-field |");
  lines.push("| **PLAQUE** | `data-5x-req` + `data-5x-save` checkbox theater. | **Yes — mock** |");
  lines.push("| **VISIT** | Official stop with no writer / empty `whenKey`. Walk, not a flow. | Not a flow |");
  lines.push("| **MISSING** | Trail href file is gone. | Broken |");
  lines.push("");
  lines.push("Star = one-thing chip. Official = the 10 `flowTrails` stops. 3× = leftover popular rooms (never the chip).");
  lines.push("");
  lines.push("`scripts/audit-mock-flows.js` (1994–2009 dest-field factory) is clean: no dest-field / I-saw / href=# action.");
  lines.push("What remains mock is the leftover **5× checkbox plaque** (`data-5x-save`) glued onto costume rooms — including some official-10 dests.");
  lines.push("");

  lines.push("## Scoreboard");
  lines.push("");
  lines.push("| Year | Star | Official REAL | Official plaque | Official visit | Official leftover | Extra plaques | Extra packs | Verdict |");
  lines.push("| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |");
  for (const row of report) {
    const real = row.official.filter((s) => s.grade === "REAL" || s.grade === "REAL+PLAQUE").length;
    const plaque = row.official.filter((s) => s.grade === "PLAQUE").length;
    const visit = row.official.filter((s) => s.grade === "VISIT").length;
    const left = row.official.filter((s) => s.grade === "LEFTOVER").length;
    lines.push(
      "| " +
        row.year +
        " | " +
        (row.star ? row.star.grade : "—") +
        " | " +
        real +
        " | " +
        plaque +
        " | " +
        visit +
        " | " +
        left +
        " | " +
        row.extraPlaques.length +
        " | " +
        row.extraPacks.length +
        " | " +
        verdict(row) +
        " |"
    );
  }
  lines.push("");

  const plaqueStops = [];
  const visitKeyed = [];
  for (const row of report) {
    for (const s of row.official) {
      if (s.grade === "PLAQUE") plaqueStops.push({ year: row.year, ...s });
      if (s.grade === "VISIT" && s.whenKey) visitKeyed.push({ year: row.year, ...s });
    }
  }
  lines.push("## Official 10 that are still mock (5× checkbox on the dest)");
  lines.push("");
  lines.push("These pass as rooms (period HTML exists) but the only write on that dest is `Save 5× REAL`. That is checkbox theater.");
  lines.push("");
  for (const s of plaqueStops) {
    lines.push(
      "- **" +
        s.year +
        " #" +
        s.n +
        " " +
        s.name +
        "** `" +
        s.href +
        "` · key `" +
        (s.whenKey || "—") +
        "`"
    );
  }
  lines.push("");
  lines.push("**" + plaqueStops.length + " official dests.** Some have a real sibling (Yahoo wander is 3 hubs; ICQ register/buddy; AuctionWeb item page). The official href itself is still a plaque.");
  lines.push("");
  if (visitKeyed.length) {
    lines.push("## Official dest has a whenKey but no hook on that file");
    lines.push("");
    for (const s of visitKeyed) {
      lines.push("- **" + s.year + " #" + s.n + " " + s.name + "** `" + s.href + "` · `" + s.whenKey + "`");
    }
    lines.push("");
  }

  for (const row of report) {
    lines.push("## " + row.year + " — " + verdict(row));
    lines.push("");
    if (row.star) {
      lines.push(
        "**Star:** " +
          row.star.name +
          " · `" +
          row.star.key +
          "` · " +
          gradeLabel(row.star.grade) +
          (row.star.hooks.length ? " · hooks `" + row.star.hooks.join("`, `") + "`" : "")
      );
      lines.push("");
    }
    lines.push("| # | Official stop | whenKey | Grade | Hooks / notes |");
    lines.push("| ---: | --- | --- | --- | --- |");
    for (const s of row.official) {
      const notes = [];
      if (s.hooks.length) notes.push("`" + s.hooks.join("`, `") + "`");
      if (s.plaque) notes.push("has 5× plaque");
      if (s.pack) notes.push("pack");
      if (s.hash.length) notes.push("hash CTA: " + s.hash[0]);
      if (s.unwired.length) notes.push("unwired: " + s.unwired[0]);
      if (!s.exists) notes.push("FILE MISSING");
      if (!s.whenKey) notes.push("empty whenKey");
      lines.push(
        "| " +
          s.n +
          " | " +
          s.name +
          " | `" +
          (s.whenKey || "—") +
          "` | **" +
          s.grade +
          "** | " +
          (notes.join(" · ") || "—") +
          " |"
      );
    }
    lines.push("");
    lines.push("**3× leftover popular** (all fill+go, not the chip):");
    lines.push("");
    for (const p of row.pop) {
      lines.push(
        "- " +
          p.name +
          " `" +
          p.key +
          "` · " +
          p.grade +
          (p.theater ? " · button labeled theater" : "") +
          (p.exists ? "" : " · **FILE MISSING**")
      );
    }
    if (!row.pop.length) lines.push("- (none on disk)");
    lines.push("");
    if (row.extraPlaques.length) {
      lines.push("**Other checkbox plaques (not on official 10):**");
      lines.push("");
      for (const f of row.extraPlaques) lines.push("- `" + f + "`");
      lines.push("");
    }
    if (row.extraPacks.length) {
      lines.push("**Other leftover packs:** " + row.extraPacks.length);
      lines.push("");
    }
    if (row.extraHash.length) {
      lines.push("**Hash CTAs (href=# action, no hook):**");
      lines.push("");
      for (const h of row.extraHash.slice(0, 12)) {
        lines.push("- `" + h.file + "` — " + h.msgs.join("; "));
      }
      if (row.extraHash.length > 12) lines.push("- … +" + (row.extraHash.length - 12) + " more");
      lines.push("");
    }
    if (row.extraUnwired.length) {
      lines.push("**Unwired action buttons (warn):** " + row.extraUnwired.length + " pages");
      lines.push("");
    }
  }

  lines.push("## What this does not claim");
  lines.push("");
  lines.push("- Incomplete-never-writes is proven by Playwright on stars + selected extras, not on every VISIT stop.");
  lines.push("- A VISIT stop can still be a period-costume room. It is not a flow until it writes a key.");
  lines.push("- 3× rooms are leftover by design. They write `ittYY-pop-<slug>` if you type ≥2 chars. They are not gold machines.");
  lines.push("- 2016+ is not on disk.");
  lines.push("");
  return lines.join("\n");
}

if (WANT_MD) {
  process.stdout.write(md());
} else {
  console.log("all-year flow audit — 1994–2015\n");
  console.log(
    "Year  Star           OffREAL OffPLAQUE OffVISIT ExtraPlaque ExtraPack Verdict"
  );
  for (const row of report) {
    const real = row.official.filter((s) => s.grade === "REAL" || s.grade === "REAL+PLAQUE").length;
    const plaque = row.official.filter((s) => s.grade === "PLAQUE").length;
    const visit = row.official.filter((s) => s.grade === "VISIT").length;
    console.log(
      row.year +
        "  " +
        String(row.star ? row.star.grade : "—").padEnd(14) +
        " " +
        String(real).padStart(7) +
        " " +
        String(plaque).padStart(9) +
        " " +
        String(visit).padStart(8) +
        " " +
        String(row.extraPlaques.length).padStart(11) +
        " " +
        String(row.extraPacks.length).padStart(9) +
        "  " +
        verdict(row)
    );
  }
  console.log("");
  const failStars = report.filter((r) => r.star && (r.star.grade === "PLAQUE" || r.star.grade === "MISSING"));
  const plaqueOfficial = report.reduce(
    (n, r) => n + r.official.filter((s) => s.grade === "PLAQUE").length,
    0
  );
  const extraP = report.reduce((n, r) => n + r.extraPlaques.length, 0);
  console.log("stars that are mock/missing: " + failStars.length);
  console.log("official stops that are PLAQUE: " + plaqueOfficial);
  console.log("other checkbox plaques: " + extraP);
}

process.exit(0);
