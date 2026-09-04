#!/usr/bin/env node
/**
 * Fail if live e2e still names retired year-game ids (Portal Judge / Cubicle Whack / Tap Grid).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BANNED = ["portaljudge", "cubewhack", "tapgrid"];
const DIRS = ["e2e"];
const okName = /check-year-game-ids/;

function walk(dir, acc) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((ent) => {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(js|mjs|cjs)$/.test(ent.name)) acc.push(p);
  });
  return acc;
}

const hits = [];
DIRS.forEach((d) => {
  const abs = path.join(ROOT, d);
  if (!fs.existsSync(abs)) return;
  walk(abs, []).forEach((file) => {
    if (okName.test(file)) return;
    const text = fs.readFileSync(file, "utf8");
    BANNED.forEach((id) => {
      const re = new RegExp("\\b" + id + "\\b", "i");
      if (re.test(text)) hits.push(path.relative(ROOT, file) + " :: " + id);
    });
  });
});

if (hits.length) {
  console.error("Retired year-game ids still referenced in e2e:");
  hits.forEach((h) => console.error("  " + h));
  process.exit(1);
}
console.log("check-year-game-ids OK — no portaljudge / cubewhack / tapgrid in e2e");
