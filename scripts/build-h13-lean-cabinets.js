#!/usr/bin/env node
/**
 * H13 — lean game-2…5 minute cabinets for 2015–2018 only.
 * Engine: year-extra-minute.js. Not pack twoClick.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const GAMES = [
  { year: "2015", n: 2, id: "meerkathop", kind: "seq", confirm: "live", title: "Meerkat hop",
    goal: "Go live leftover. Periscope is the chip.", next: "../meerkat/index.html", nextLabel: "Meerkat",
    items: [
      { id: "open", label: "Open leftover stream", order: 0 },
      { id: "go", label: "Go live (theater)", order: 1 },
      { id: "end", label: "End stream", order: 2 },
      { id: "vod", label: "Keep forever (trap)", role: "trap", trap: "VOD later" }
    ], start: "Open, live, end. VOD is later." },
  { year: "2015", n: 3, id: "fbliveceleb", kind: "seq", confirm: "celeb", title: "FB Live leftover",
    goal: "Celeb leftover only. Not the Periscope chip.", next: "../fblive/index.html", nextLabel: "FB Live",
    items: [
      { id: "watch", label: "Watch leftover stream", order: 0 },
      { id: "heart", label: "Tap a leftover heart", order: 1 },
      { id: "leave", label: "Leave", order: 2 },
      { id: "go", label: "Go LIVE yourself (trap)", role: "trap", trap: "stars only" }
    ], start: "Watch, heart, leave. You are not the celeb." },
  { year: "2015", n: 4, id: "win10tray", kind: "hold", confirm: "tray", title: "GWX leftover",
    goal: "Hold the leftover tray. Win10 is leftover hardware.", next: "../windows10/index.html", nextLabel: "Win10 leftover",
    items: [
      { id: "see", label: "See the leftover tray", order: 0 },
      { id: "hold", label: "Hold Get Windows 10 leftover", order: 1 },
      { id: "dismiss", label: "Dismiss", order: 2 },
      { id: "upgrade", label: "Upgrade now (trap)", role: "trap", trap: "not January chrome" }
    ], start: "See, hold, dismiss. Upgrade is the trap." },
  { year: "2015", n: 5, id: "watchface", kind: "seq", confirm: "watch", title: "Watch leftover",
    goal: "Watch ships leftover. Star stays Periscope.", next: "../apple/watch.html", nextLabel: "Watch leftover",
    items: [
      { id: "wake", label: "Raise leftover wrist", order: 0 },
      { id: "face", label: "Pick leftover face", order: 1 },
      { id: "lower", label: "Lower wrist", order: 2 },
      { id: "pay", label: "Apple Pay January (trap)", role: "trap", trap: "Pay leftover later" }
    ], start: "Wake, face, lower. Pay is later." },

  { year: "2016", n: 2, id: "storyrail", kind: "seq", confirm: "24h", title: "Story leftover rail",
    goal: "24 hours leftover. Not Reels.", next: "../instagram/stories.html", nextLabel: "Stories",
    items: [
      { id: "open", label: "Open leftover story", order: 0 },
      { id: "tap", label: "Tap through leftover", order: 1 },
      { id: "done", label: "It expires", order: 2 },
      { id: "reel", label: "Open Reels (trap)", role: "trap", trap: "Reels is later" }
    ], start: "Open, tap, expire. Reels is later." },
  { year: "2016", n: 3, id: "walkgo", kind: "search", confirm: "gym", title: "Sidewalk leftover",
    goal: "Name a leftover gym. Star stays Stories.", next: "../pokemongo/index.html", nextLabel: "Pokémon GO",
    query: "gym",
    items: [
      { id: "map", label: "Open leftover map", order: 0 },
      { id: "hit", label: "Hit leftover gym", order: 1 },
      { id: "leave", label: "Keep walking", order: 2 },
      { id: "raid", label: "Raid 2017 (trap)", role: "trap", trap: "later" }
    ], start: "Search gym. Raid is later." },
  { year: "2016", n: 4, id: "reactbar", kind: "pick", confirm: "love", title: "Reactions leftover",
    goal: "Pick leftover Love. Not the Stories chip.", next: "../facebook/reactions.html", nextLabel: "Reactions",
    items: [
      { id: "love", label: "Love leftover", order: 0 },
      { id: "haha", label: "Haha leftover", order: 1 },
      { id: "wow", label: "Wow leftover", order: 2 },
      { id: "care", label: "Care 2020 (trap)", role: "trap", trap: "Care is later" }
    ], start: "Pick Love leftover. Care is later." },
  { year: "2016", n: 5, id: "lipapp", kind: "seq", confirm: "lip", title: "musical.ly leftover",
    goal: "Lip leftover. Not TikTok gold.", next: "../musically/index.html", nextLabel: "musical.ly",
    items: [
      { id: "pick", label: "Pick leftover sound", order: 0 },
      { id: "lip", label: "Lip leftover", order: 1 },
      { id: "post", label: "Post leftover", order: 2 },
      { id: "tt", label: "TikTok 2018 (trap)", role: "trap", trap: "later name" }
    ], start: "Sound, lip, post. TikTok is later." },

  { year: "2017", n: 2, id: "swipeup", kind: "hold", confirm: "swipe", title: "Swipe leftover",
    goal: "Hold leftover swipe-up. Star stays Face ID.", next: "../iphone/x.html", nextLabel: "Face ID",
    items: [
      { id: "look", label: "Look leftover", order: 0 },
      { id: "hold", label: "Hold swipe-up leftover", order: 1 },
      { id: "home", label: "Home leftover", order: 2 },
      { id: "btn", label: "Home button (trap)", role: "trap", trap: "no Home button" }
    ], start: "Look, hold swipe, home. Button is the trap." },
  { year: "2017", n: 3, id: "animojipick", kind: "pick", confirm: "fox", title: "Animoji leftover",
    goal: "Pick leftover fox. Not the Face ID chip.", next: "../iphone/animoji.html", nextLabel: "Animoji",
    items: [
      { id: "fox", label: "Fox leftover", order: 0 },
      { id: "poo", label: "Pile leftover", order: 1 },
      { id: "send", label: "Send leftover", order: 2 },
      { id: "memoji", label: "Memoji 2018 (trap)", role: "trap", trap: "later" }
    ], start: "Fox leftover. Memoji is later." },
  { year: "2017", n: 4, id: "dropbus", kind: "seq", confirm: "bus", title: "Battle-bus leftover",
    goal: "Drop leftover. Star stays Face ID.", next: "../fortnite/index.html", nextLabel: "Fortnite leftover",
    items: [
      { id: "board", label: "Board leftover bus", order: 0 },
      { id: "drop", label: "Drop leftover", order: 1 },
      { id: "land", label: "Land leftover", order: 2 },
      { id: "vbuck", label: "Buy V-Bucks (trap)", role: "trap", trap: "no shop" }
    ], start: "Board, drop, land. Shop is the trap." },
  { year: "2017", n: 5, id: "twoeighty", kind: "form", confirm: "280", title: "280 leftover",
    goal: "Type leftover 280. Not the Face ID chip.", next: "../twitter/280.html", nextLabel: "280 leftover",
    items: [
      { id: "draft", label: "Draft leftover", order: 0 },
      { id: "count", label: "Count leftover 280", order: 1 },
      { id: "post", label: "Post leftover", order: 2 },
      { id: "blue", label: "Blue check shop (trap)", role: "trap", trap: "later" }
    ], start: "Draft, count 280, post." },

  { year: "2018", n: 2, id: "cookiebar", kind: "seq", confirm: "manage", title: "Cookie leftover",
    goal: "Manage leftover. Accept All is the trap.", next: "../gdpr/index.html", nextLabel: "GDPR",
    items: [
      { id: "see", label: "See leftover banner", order: 0 },
      { id: "manage", label: "Manage leftover", order: 1 },
      { id: "save", label: "Save leftover", order: 2 },
      { id: "all", label: "Accept All (trap)", role: "trap", trap: "never the save" }
    ], start: "See, Manage, Save. Accept All never writes." },
  { year: "2018", n: 3, id: "fypforu", kind: "seq", confirm: "fyp", title: "For You leftover",
    goal: "Swipe leftover FYP. Star stays GDPR.", next: "../tiktok/fyp.html", nextLabel: "TikTok leftover",
    items: [
      { id: "open", label: "Open leftover For You", order: 0 },
      { id: "swipe", label: "Swipe leftover", order: 1 },
      { id: "stay", label: "Stay leftover", order: 2 },
      { id: "live", label: "Go LIVE (trap)", role: "trap", trap: "not the chip" }
    ], start: "Open, swipe, stay. LIVE is leftover." },
  { year: "2018", n: 4, id: "notlock", kind: "seq", confirm: "lock", title: "Not Secure leftover",
    goal: "See leftover lock. Star stays GDPR.", next: "../notsecure/index.html", nextLabel: "Not Secure",
    items: [
      { id: "bar", label: "Read leftover bar", order: 0 },
      { id: "lock", label: "Note leftover lock", order: 1 },
      { id: "leave", label: "Leave leftover", order: 2 },
      { id: "hack", label: "Bypass HTTPS (trap)", role: "trap", trap: "no exploit" }
    ], start: "Bar, lock, leave. No exploit." },
  { year: "2018", n: 5, id: "igtvrow", kind: "search", confirm: "igtv", title: "IGTV leftover",
    goal: "Search leftover IGTV. Not the GDPR chip.", next: "../instagram/igtv.html", nextLabel: "IGTV leftover",
    query: "igtv",
    items: [
      { id: "open", label: "Open leftover IGTV", order: 0 },
      { id: "hit", label: "Hit leftover row", order: 1 },
      { id: "back", label: "Back leftover", order: 2 },
      { id: "reel", label: "Reels 2020 (trap)", role: "trap", trap: "later" }
    ], start: "Search igtv. Reels is later." }
];

function htmlFor(g) {
  const key = "itt" + g.year.slice(2) + "-game-" + g.id;
  const q = g.query || g.confirm;
  return `<!DOCTYPE html>
<html lang="en" data-itt-year="${g.year}">
<head>
<meta charset="utf-8">
<title>${g.title} — ${g.year}</title>
<link rel="stylesheet" href="../../../../css/period-${g.year}.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
<link rel="stylesheet" href="../../../../css/year-extra-minute.css">
</head>
<body class="yg-body yg-year-${g.year}" bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell mx-shell" data-year-game data-minute-extra data-mx-kind="${g.kind}" data-year="${g.year}" data-game-id="${g.id}" data-yg-goal="${g.goal}" data-yg-next-href="${g.next}" data-yg-next-label="${g.nextLabel}" data-mx-confirm-need="${g.confirm}"${g.query ? ` data-mx-query="${g.query}"` : ""}>
  <div class="mx-chrome">${g.title}<span class="mx-chrome-sub">leftover cabinet · not the star</span></div>
  <h1>${g.title} — ${g.year}</h1>
  <p class="mx-goal">${g.goal}</p>
  <p class="honesty yg-honesty"><b>Leftover cabinet.</b> · museum original · incomplete never writes · key <code>${key}</code></p>
  <ol class="yg-steps" data-yg-steps>
    <li data-step="start">Start</li>
    <li data-step="acts">Click the year-true path in order. Traps never write.</li>
    <li data-step="type">Type <code>${q}</code></li>
    <li data-step="save">Finish writes <code>${key}</code></li>
  </ol>
  <p class="mx-hud">Score <b data-game-score>0</b> · Best <b data-game-best>0</b> · <span data-mx-hud>kind ${g.kind}</span></p>
  <div data-mx-field class="mx-field" aria-label="${g.title} playfield"></div>
  <p class="mx-actions">
    <button type="button" data-game-start>Start</button>
    <button type="button" data-mx-finish>Finish</button>
  </p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p class="mx-nav">
    <a href="index.html">← Playables</a> ·
    <a href="game.html">Year game</a> ·
    <a href="game-2.html">2</a> ·
    <a href="game-3.html">3</a> ·
    <a href="game-4.html">4</a> ·
    <a href="game-5.html">5</a> ·
    <a href="${g.next}">${g.nextLabel}</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-extra-minute.js"></script>
<script src="../../../../js/games/year-${g.year}-${g.id}.js"></script>
<script src="../../../../js/immersion-${g.year}.js" defer></script>
</body>
</html>
`;
}

function jsFor(g) {
  const spec = {
    year: g.year,
    id: g.id,
    kind: g.kind,
    confirm: g.confirm,
    queryLabel: "Query",
    runLabel: "Search",
    submitLabel: "Submit",
    holdLabel: "Hold",
    holdMs: 1600,
    items: g.items,
    startStatus: g.start,
    idleStatus: "Press Start. Incomplete never writes."
  };
  if (g.query) spec.query = g.query;
  return `/**
 * ${g.title} — ${g.year} leftover cabinet (H13 minute).
 * Key: itt${g.year.slice(2)}-game-${g.id}
 * Kind: ${g.kind}. Incomplete never writes. Traps never write.
 */
(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount(${JSON.stringify(spec, null, 2)});
})();
`;
}

function patchRooms(year, rels) {
  const p = path.join(ROOT, "js/config", year + ".js");
  let s = fs.readFileSync(p, "utf8");
  for (const rel of rels) {
    if (s.includes('"' + rel + '"')) continue;
    s = s.replace(
      '"sites/playable/game.html"',
      '"sites/playable/game.html",\n    "' + rel + '"'
    );
  }
  fs.writeFileSync(p, s);
}

function patchIndex(year, titles) {
  const p = path.join(ROOT, "years", year, "sites/playable/index.html");
  let s = fs.readFileSync(p, "utf8");
  const strip =
    '<p data-itt-year-cabinets="' + year + '" class="itt-year-cabinets" style="font-size:13px;margin:10px 0"><b>Lean cabinets</b> — ' +
    titles.map((t, i) => '<a href="game-' + (i + 2) + '.html"><b>' + (i + 2) + " " + t + "</b></a>").join(" · ") +
    ' <span style="font-size:11px;color:#444">(leftover · not the star · incomplete never writes)</span></p>\n';
  if (s.includes("data-itt-year-cabinets")) {
    s = s.replace(/<p data-itt-year-cabinets="[^"]+"[\s\S]*?<\/p>\n?/, strip);
  } else {
    s = s.replace('<p><a href="famous.html">', strip + '<p><a href="famous.html">');
  }
  fs.writeFileSync(p, s);
}

for (const g of GAMES) {
  const htmlPath = path.join(ROOT, "years", g.year, "sites/playable", "game-" + g.n + ".html");
  const jsPath = path.join(ROOT, "js/games", "year-" + g.year + "-" + g.id + ".js");
  fs.writeFileSync(htmlPath, htmlFor(g));
  fs.writeFileSync(jsPath, jsFor(g));
  console.log("wrote", htmlPath, jsPath);
}

const byYear = {};
for (const g of GAMES) {
  byYear[g.year] = byYear[g.year] || [];
  byYear[g.year].push(g);
}
for (const year of Object.keys(byYear)) {
  const rels = byYear[year].map((g) => "sites/playable/game-" + g.n + ".html");
  patchRooms(year, rels);
  patchIndex(year, byYear[year].sort((a, b) => a.n - b.n).map((g) => g.title));
  console.log("patched", year);
}
