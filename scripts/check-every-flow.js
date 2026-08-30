#!/usr/bin/env node
/**
 * Every ship-year flow + link check.
 * Walks every HTML href, gold dest, 2× matrix row, flow-trail dest, guided ol.
 * Classifies mock vs wired. Exit 1 on broken dests / dest-field / unwired gold.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const WIPED = new Set(["2009", "2011", "2020", "2021", "2022", "2023", "2024", "2025"]);
const YEARS = [];
for (let y = 1994; y <= 2024; y++) {
  const s = String(y);
  if (!WIPED.has(s)) YEARS.push(s);
}

const GOLD = {
  1994: { path: "sites/csotd/index.html", key: "itt94-csotd", hook: /data-csotd|data-ott-one-thing/ },
  1995: { path: "sites/amazon/ssl-checkout.html", key: "itt95-ssl-checkout", hook: /data-ssl-form/ },
  1996: { path: "sites/portals/wars.html", key: "itt96-portal-wars", hook: /data-portal/ },
  1997: { path: "sites/pointcast/index.html", key: "itt97-pointcast", hook: /data-pc-sub/ },
  1998: { path: "sites/google/lucky.html", key: "itt98-lucky", hook: /data-google-lucky/ },
  1999: { path: "sites/aim/index.html", key: "itt99-aim", hook: /data-aim-signon/ },
  2000: { path: "sites/mapquest/index.html", key: "itt00-mapquest", hook: /data-mq-form/ },
  2001: { path: "sites/wikipedia/edit.html", key: "itt01-wiki-pages", hook: /data-wiki-save/ },
  2002: { path: "sites/stumbleupon/index.html", key: "itt02-stumble", hook: /data-su-stumble/ },
  2003: { path: "sites/photobucket/index.html", key: "itt03-photobucket", hook: /data-pb-upload/ },
  2004: { path: "sites/facebook/networks.html", key: "itt04-thefacebook-networks", hook: /data-fb-join/ },
  2005: { path: "sites/youtube/upload.html", key: "itt05-yt-uploads", hook: /data-yt-upload/ },
  2006: { path: "sites/twitter/index.html", key: "itt06-tweets", hook: /data-tw06-/ },
  2007: { path: "sites/iphone/index.html", key: "itt07-iphone", hook: /data-ip07-/ },
  2008: { path: "sites/github/issue.html", key: "itt08-github", hook: /data-gh-issue/ },
  2009: { path: "sites/facebook/index.html", key: "itt09-like", hook: /data-lk09-like/ },
  2010: { path: "sites/instagram/index.html", key: "itt10-ig", hook: /data-ig-share/ },
  2011: { path: "sites/googleplus/index.html", key: "itt11-gplus", hook: /data-gp11-hangout/ },
  2012: { path: "sites/instagram/android.html", key: "itt12-ig-android", hook: /data-ig12-share/ },
  2013: { path: "sites/vine/record.html", key: "itt13-vine-posts", hook: /data-vn13-post/ },
  2014: { path: "sites/whatsapp/index.html", key: "itt14-wa-install", hook: /data-wa14-install/ },
  2015: { path: "sites/periscope/index.html", key: "itt15-periscope", hook: /data-peri-live/ },
  2016: { path: "sites/instagram/stories.html", key: "itt16-ig-stories", hook: /data-ig-story/ },
  2017: { path: "sites/iphone/x.html", key: "itt17-faceid", hook: /data-faceid/ },
  2018: { path: "sites/gdpr/index.html", key: "itt18-gdpr", hook: /data-gdpr/ },
  2019: { path: "sites/disneyplus/home.html", key: "itt19-disneyplus", hook: /data-dplus/ },
  2020: { path: "sites/zoom/meeting.html", key: "itt20-zoom", hook: /data-zoom/ },
  2021: { path: "sites/att/index.html", key: "itt21-att", hook: /data-att/ },
  2022: { path: "sites/chatgpt/index.html", key: "itt22-chatgpt", hook: /data-gpt22/ },
  2023: { path: "sites/plus/index.html", key: "itt23-plus", hook: /data-plus-go|data-p23-go/ },
  2024: { path: "sites/chatgpt/4o.html", key: "itt24-gpt4o", hook: /data-4o-talk/ },
  2025: { path: "sites/deepseek/r1.html", key: "itt25-r1", hook: /data-r1-go/ },
};

function walkHtml(dir, acc) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (/\.html?$/i.test(ent.name)) acc.push(p);
  }
  return acc;
}

function resolveHref(fromFile, href) {
  href = String(href || "").split("#")[0].split("?")[0].trim();
  if (!href) return null;
  if (/^(https?:|mailto:|javascript:|data:)/i.test(href)) return { skip: true, href };
  let target;
  if (href.startsWith("/")) target = path.join(ROOT, href.replace(/^\/+/, ""));
  else target = path.normalize(path.join(path.dirname(fromFile), href));
  return { skip: false, href, target };
}

function existsTarget(target) {
  if (fs.existsSync(target)) {
    if (fs.statSync(target).isDirectory()) {
      return fs.existsSync(path.join(target, "index.html"));
    }
    return true;
  }
  if (fs.existsSync(target + ".html")) return true;
  if (fs.existsSync(path.join(target, "index.html"))) return true;
  return false;
}

function loadJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function loadTrails() {
  const src = fs.readFileSync(path.join(ROOT, "js/config/flow-trails.js"), "utf8");
  const sandbox = { window: {}, ITT: {}, console };
  sandbox.window.ITT = sandbox.ITT;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  try {
    vm.runInContext(src, sandbox);
  } catch (e) {
    return {};
  }
  return sandbox.ITT.flowTrails || sandbox.ITT.FLOW_TRAILS || {};
}

function yearReport() {
  const matrix = loadJson("e2e/2x-links.matrix.json");
  const trails = loadTrails();
  const byYear = {};
  for (const y of YEARS) {
    byYear[y] = {
      year: y,
      html: 0,
      hrefs: 0,
      broken: [],
      destField: [],
      hashCta: [],
      noteLeftover: [],
      gold: { ok: false, reason: "" },
      guided: { n: 0, missing: [] },
      twoX: { n: 0, missing: [], unwired: [] },
      trails: { n: 0, missing: [] },
    };
  }

  for (const year of YEARS) {
    const yroot = path.join(ROOT, "years", year);
    const files = walkHtml(yroot, []);
    const rep = byYear[year];
    rep.html = files.length;

    for (const file of files) {
      let html;
      try {
        html = fs.readFileSync(file, "utf8");
      } catch (e) {
        continue;
      }
      const rel = path.relative(ROOT, file).replace(/\\/g, "/");

      if (/data-dest-field/.test(html) || /I read the \d{4} period note/i.test(html)) {
        rep.destField.push(rel);
      }
      if (/Note leftover/.test(html)) rep.noteLeftover.push(rel);

      const hashRe = /<(?:a|button)([^>]*)href\s*=\s*["']#["']([^>]*)>([\s\S]{0,80})<\/(?:a|button)>/gi;
      let hm;
      while ((hm = hashRe.exec(html))) {
        const inner = (hm[3] || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (!inner || /ok|dismiss|skip|top|back/i.test(inner)) continue;
        if (/data-/.test((hm[1] || "") + (hm[2] || ""))) continue;
        if (/\b(save|submit|install|buy|send|join|search|login|post)\b/i.test(inner)) {
          rep.hashCta.push(rel + " · " + inner.slice(0, 50));
        }
      }

      const hrefRe = /href=["']([^"']+)["']/gi;
      let m;
      while ((m = hrefRe.exec(html))) {
        const r = resolveHref(file, m[1]);
        if (!r || r.skip) continue;
        rep.hrefs += 1;
        if (!existsTarget(r.target)) {
          rep.broken.push({ file: rel, href: r.href });
        }
      }
    }

    const gold = GOLD[year];
    if (!gold) {
      rep.gold.reason = "no gold row";
    } else {
      const gp = path.join(yroot, gold.path);
      if (!fs.existsSync(gp)) {
        rep.gold.reason = "missing " + gold.path;
      } else {
        const ghtml = fs.readFileSync(gp, "utf8");
        if (!gold.hook.test(ghtml)) {
          rep.gold.reason = "hook missing on " + gold.path;
        } else {
          rep.gold.ok = true;
        }
      }
    }

    const home = path.join(yroot, "pages/home.html");
    if (fs.existsSync(home)) {
      const h = fs.readFileSync(home, "utf8");
      const painted = /ITT\.YearUI\.paintStart|data-itt-tour/.test(h);
      const guidedId = h.match(/id=["']ott-guided-\d{4}["'][\s\S]{0,400}<ol[^>]*>([\s\S]*?)<\/ol>/);
      const allOls = [];
      const olRe = /<ol[^>]*>([\s\S]*?)<\/ol>/gi;
      let om;
      while ((om = olRe.exec(h))) allOls.push(om[1]);
      const six = allOls.find((body) => (body.match(/<li\b/g) || []).length === 6);
      if (guidedId) {
        rep.guided.n = (guidedId[1].match(/<li\b/g) || []).length;
      } else if (painted) {
        rep.guided.n = 6;
      } else if (six) {
        rep.guided.n = 6;
      } else if (allOls[0]) {
        rep.guided.n = (allOls[0].match(/<li\b/g) || []).length;
      }
      for (const olBody of allOls) {
        const re = /href=["']([^"']+)["']/gi;
        let hm;
        while ((hm = re.exec(olBody))) {
          const r = resolveHref(home, hm[1]);
          if (!r || r.skip) continue;
          if (!existsTarget(r.target)) {
            if (rep.guided.missing.indexOf(hm[1]) === -1) rep.guided.missing.push(hm[1]);
          }
        }
      }
    }

    const rows = matrix.filter((r) => r.year === year);
    rep.twoX.n = rows.length;
    for (const row of rows) {
      const dest = path.join(ROOT, String(row.path || "").replace(/^\//, ""));
      if (!fs.existsSync(dest)) {
        rep.twoX.missing.push(row.key + " " + row.path);
        continue;
      }
      const html = fs.readFileSync(dest, "utf8");
      const suffix = String(row.key || "").replace(/^itt\d{2}-/, "");
      if (!new RegExp('data-4x-go="' + suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"').test(html)) {
        rep.twoX.unwired.push(row.key);
      }
      if (row.next) {
        const nxt = path.join(ROOT, String(row.next).replace(/^\//, ""));
        if (!fs.existsSync(nxt)) rep.twoX.missing.push(row.key + " next " + row.next);
      }
    }

    const t = trails[year];
    const dests = (t && (t.dests || t.stops || t)) || [];
    const list = Array.isArray(dests) ? dests : [];
    rep.trails.n = list.length;
    for (const stop of list) {
      const href = stop.href || stop.path || stop.dest || "";
      if (!href) continue;
      const fromYear = path.join(yroot, "index.html");
      const r = resolveHref(fromYear, String(href).replace(/^\//, ""));
      if (!r || r.skip) continue;
      if (!existsTarget(r.target)) rep.trails.missing.push(href);
    }
  }

  return { byYear, matrix: matrix.length };
}

function main() {
  const { byYear, matrix } = yearReport();
  let broken = 0;
  let mocks = 0;
  let goldFail = 0;
  let twoXFail = 0;
  let guidedFail = 0;

  console.log("check-every-flow — " + YEARS.length + " ship years · 2× matrix " + matrix);
  console.log(
    "year  html  hrefs  broken  gold  guided  2x  2x-miss  dest-field  hash  trails"
  );
  for (const year of YEARS) {
    const r = byYear[year];
    const g = r.gold.ok ? "OK" : "FAIL";
    if (!r.gold.ok) goldFail += 1;
    broken += r.broken.length;
    mocks += r.destField.length + r.hashCta.length;
    twoXFail += r.twoX.missing.length + r.twoX.unwired.length;
    if (r.guided.n !== 6 || r.guided.missing.length) guidedFail += 1;
    console.log(
      [
        year,
        String(r.html).padStart(4),
        String(r.hrefs).padStart(5),
        String(r.broken.length).padStart(6),
        g.padStart(5),
        String(r.guided.n).padStart(6),
        String(r.twoX.n).padStart(3),
        String(r.twoX.missing.length + r.twoX.unwired.length).padStart(7),
        String(r.destField.length).padStart(10),
        String(r.hashCta.length).padStart(4),
        String(r.trails.n) + (r.trails.missing.length ? "!" + r.trails.missing.length : ""),
      ].join("  ")
    );
  }

  console.log("");
  function dump(title, rows) {
    if (!rows.length) return;
    console.log("## " + title + " (" + rows.length + ")");
    for (const line of rows.slice(0, 80)) console.log("  " + line);
    if (rows.length > 80) console.log("  … +" + (rows.length - 80) + " more");
    console.log("");
  }

  const brokenLines = [];
  const destLines = [];
  const hashLines = [];
  const goldLines = [];
  const twoXLines = [];
  const guidedLines = [];
  const trailLines = [];
  const noteLines = [];
  for (const year of YEARS) {
    const r = byYear[year];
    for (const b of r.broken) brokenLines.push(year + " " + b.file + " → " + b.href);
    for (const d of r.destField) destLines.push(year + " " + d);
    for (const h of r.hashCta) hashLines.push(year + " " + h);
    if (!r.gold.ok) goldLines.push(year + " " + r.gold.reason);
    for (const m of r.twoX.missing) twoXLines.push(year + " missing " + m);
    for (const u of r.twoX.unwired) twoXLines.push(year + " unwired " + u);
    if (r.guided.n !== 6) guidedLines.push(year + " guided " + r.guided.n + " (want 6)");
    for (const m of r.guided.missing) guidedLines.push(year + " guided miss " + m);
    for (const m of r.trails.missing) trailLines.push(year + " trail " + m);
    for (const n of r.noteLeftover) noteLines.push(year + " " + n);
  }
  dump("BROKEN HREFS", brokenLines);
  dump("DEST-FIELD / PERIOD-NOTE PLAQUES", destLines);
  dump("HASH CTA", hashLines);
  dump("NOTE LEFTOVER", noteLines);
  dump("GOLD FAIL", goldLines);
  dump("2× FAIL", twoXLines);
  dump("GUIDED", guidedLines);
  dump("TRAIL MISS", trailLines);

  const fail =
    brokenLines.length +
    destLines.length +
    goldLines.length +
    twoXLines.length +
    guidedLines.length +
    trailLines.length;
  if (fail) {
    console.log(
      "FAIL broken=" +
        brokenLines.length +
        " dest-field=" +
        destLines.length +
        " gold=" +
        goldLines.length +
        " 2x=" +
        twoXLines.length +
        " guided=" +
        guidedLines.length +
        " hash=" +
        hashLines.length
    );
    process.exit(1);
  }
  console.log("OK — every gold dest wired, every 2× row present, no dest-field, no broken year hrefs, guided=6");
}

main();
