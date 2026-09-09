#!/usr/bin/env python3
"""Author-only museum map — hallway, gold dests, leftover law, 2020 door, CI.

Not visitor-facing. Not linked from the hub.
  python3 scripts/generate-museum-map.py
  open http://127.0.0.1:8080/dev/museum-map/
"""
from __future__ import annotations

import json
import subprocess
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dev" / "museum-map"
LOCK_4X = {"2012", "2013", "2016", "2017", "2018", "2019", "2020"}
NO_SECOND = {"2013", "2018"}
BOARDED = ["2023", "2024", "2025"]


def dump_disk() -> dict:
    script = r"""
const fs = require("fs");
const vm = require("vm");
function load(p) {
  const sandbox = { console, ITT: {} };
  sandbox.global = sandbox;
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(p, "utf8"), sandbox);
  return sandbox.ITT;
}
const trails = load("js/config/flow-trails.js").flowTrails;
const atlas = load("js/atlas-data.js").AtlasData;
const pop = JSON.parse(fs.readFileSync("scripts/popular-3x-sites.json", "utf8"));
const pop2 = JSON.parse(fs.readFileSync("scripts/popular-3x3-sites.json", "utf8"));
const years = atlas.openYears.map((y) => {
  const rec = (atlas.years && atlas.years[y]) || {};
  const official = (trails[y] || [])
    .filter((s) => s.n >= 1 && s.n <= 10)
    .map((s) => ({ n: s.n, name: s.name, href: s.href, key: s.whenKey, next: s.nextHref }));
  return {
    year: y,
    gold: rec.gold || null,
    official,
    lean: (atlas.leanYears || []).includes(y),
    first: (pop[y] || []).map((s) => s.id),
    secondNamed: (pop2[y] || []).map((s) => s.id),
  };
});
process.stdout.write(JSON.stringify({
  open: atlas.openYears,
  gap: atlas.gapYears,
  lean: atlas.leanYears,
  years,
}));
"""
    r = subprocess.run(["node", "-e", script], cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


def href_short(h: str) -> str:
    return h.replace("years/", "").replace("sites/", "")


CSS = """
:root {
  --bg: #0d1117;
  --panel: #161b22;
  --ink: #e6edf3;
  --muted: #8b949e;
  --line: #30363d;
  --gold: #d4a017;
  --live: #3fb950;
  --lean: #58a6ff;
  --lock: #f85149;
  --board: #6e7681;
  --chip: #21262d;
}
* { box-sizing: border-box; }
html, body { margin: 0; background: var(--bg); color: var(--ink);
  font: 14px/1.4 "Segoe UI", Tahoma, Arial, sans-serif; }
a { color: var(--lean); text-decoration: none; }
a:hover { text-decoration: underline; }
.wrap { max-width: 1280px; margin: 0 auto; padding: 20px 24px 64px; }
header { border-bottom: 1px solid var(--line); padding-bottom: 14px; margin-bottom: 22px; }
header h1 { margin: 0 0 6px; font-size: 22px; }
.lede { color: var(--muted); margin: 0; }
.banner { background: #3d2a00; color: #ffd27a; border: 1px solid #7a5a10;
  padding: 8px 12px; border-radius: 6px; font-size: 12px; margin: 12px 0 0; }
h2 { font-size: 16px; margin: 28px 0 10px; color: var(--ink); }
h2 span { color: var(--muted); font-weight: 500; font-size: 12px; margin-left: 8px; }
.spine { display: flex; flex-wrap: wrap; gap: 6px; }
.tick { min-width: 72px; padding: 8px 8px 7px; border-radius: 8px;
  background: var(--chip); border: 1px solid var(--line); text-align: center; }
.tick .y { font-weight: 700; font-size: 15px; }
.tick .g { font-size: 10px; color: var(--gold); margin-top: 3px; line-height: 1.25; }
.tick.lean { border-color: #1f6feb; }
.tick.forest { border-color: #3fb95055; }
.tick.board { background: #21262d; color: var(--board); border-style: dashed; }
.tick.board .g { color: var(--board); }
.legend { display: flex; flex-wrap: wrap; gap: 12px; color: var(--muted); font-size: 12px; margin: 10px 0 0; }
.legend i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: -1px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; }
.card h3 { margin: 0 0 6px; font-size: 14px; }
.card .path { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px; color: var(--muted); word-break: break-all; }
.card ol { margin: 8px 0 0; padding-left: 18px; font-size: 12px; }
.card ol li { margin: 2px 0; }
.machine { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
@media (max-width: 900px) { .machine { grid-template-columns: 1fr 1fr; } }
.slot { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px; }
.slot b { display: block; margin-bottom: 4px; }
.slot.ok { border-color: #238636; }
.slot.lock { border-color: #da3633; }
.flow { display: flex; flex-wrap: wrap; align-items: stretch; gap: 0; }
.box { background: var(--panel); border: 1px solid var(--line); border-radius: 10px;
  padding: 10px 12px; min-width: 140px; flex: 1 1 140px; }
.box.star { border-color: var(--gold); box-shadow: 0 0 0 1px #d4a01744; }
.arrow { align-self: center; color: var(--muted); padding: 0 4px; font-size: 18px; }
.row { display: flex; flex-wrap: wrap; gap: 8px; }
.pill { background: var(--chip); border: 1px solid var(--line); border-radius: 999px;
  padding: 4px 10px; font-size: 12px; }
.pill.lock { border-color: #da3633; color: #ffa198; }
.ci { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 800px) { .ci { grid-template-columns: 1fr; } }
ul.plain { margin: 6px 0 0; padding-left: 18px; }
.ok { color: var(--live); }
.bad { color: var(--lock); }
.foot { margin-top: 36px; color: var(--muted); font-size: 12px; border-top: 1px solid var(--line); padding-top: 12px; }
"""


def render(data: dict) -> str:
    years = data["years"]
    gold_cards = []
    for rec in years:
        g = rec["gold"] or {}
        kind = "lean" if rec["lean"] else "forest"
        lock = " leftover-4× 0" if rec["year"] in LOCK_4X else ""
        items = "".join(
            f"<li><code>{escape(s['href'])}</code> — {escape(s['name'])}</li>"
            for s in rec["official"]
        )
        first = ", ".join(rec["first"]) or "—"
        gold_cards.append(
            f"""<article class="card" id="y{escape(rec['year'])}">
<h3>{escape(rec['year'])} · {escape(g.get('label') or '?')} <span class="path">{escape(kind)}{escape(lock)}</span></h3>
<div class="path">{escape(g.get('href') or '')} · <code>{escape(g.get('key') or '')}</code></div>
<ol>{items}</ol>
<div class="path" style="margin-top:8px">leftover-3× first: {escape(first)}</div>
</article>"""
        )

    ticks = []
    for rec in years:
        g = rec["gold"] or {}
        cls = "tick lean" if rec["lean"] else "tick forest"
        ticks.append(
            f'<a class="{cls}" href="#y{escape(rec["year"])}"><div class="y">{escape(rec["year"])}</div>'
            f'<div class="g">{escape(g.get("label") or "")}</div></a>'
        )
    for y in BOARDED:
        ticks.append(
            f'<div class="tick board"><div class="y">{escape(y)}</div><div class="g">boarded</div></div>'
        )

    y20 = next(r for r in years if r["year"] == "2020")
    boxes = []
    for s in y20["official"]:
        star = " star" if s["n"] == 1 else ""
        boxes.append(
            f'<div class="box{star}"><b>{s["n"]}. {escape(s["name"])}</b>'
            f'<div class="path">{escape(s["href"])}</div>'
            f'<div class="path">→ {escape(s["next"] or "")}</div></div>'
        )
    flow20 = '<div class="arrow">→</div>'.join(boxes[:5]) + '</div><div class="flow" style="margin-top:8px">' + '<div class="arrow">→</div>'.join(boxes[5:])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Museum map — 29 live years (author only)</title>
<style>{CSS}</style>
</head>
<body>
<div class="wrap">
<header>
  <h1>Internet Through Time — disk map</h1>
  <p class="lede">29 years open · 2023–2025 boarded · leftover-2× ×2 on every dest · incomplete never writes.</p>
  <p class="banner">Author only. Not linked from the hub. Names come from <code>js/atlas-data.js</code>, <code>js/config/flow-trails.js</code>, and <code>scripts/popular-3x-sites.json</code>.</p>
</header>

<h2 id="hallway">Hallway <span>click a year</span></h2>
<div class="spine">{''.join(ticks)}</div>
<p class="legend">
  <span><i style="background:#3fb950"></i>forest</span>
  <span><i style="background:#58a6ff"></i>lean door</span>
  <span><i style="background:#6e7681"></i>boarded</span>
  <span><i style="background:#d4a017"></i>gold label</span>
</p>

<h2 id="machines">Leftover machines <span>law, not a wish list</span></h2>
<div class="machine">
  <div class="slot ok"><b>leftover-2×</b> <code>*-lx</code> + <code>*-d2</code> on every live dest. Land → trap/empty never write → complete leftover only → Next 200.</div>
  <div class="slot ok"><b>leftover-3× first</b> pop3x. Unused leftover dests. Never official n=1–10.</div>
  <div class="slot lock"><b>leftover-3× second</b> pop-more. Same rule. 2013 / 2018 stay unnamed — no dest-farm.</div>
  <div class="slot ok"><b>leftover-3× third</b> pop3-* may sit on official dests.</div>
  <div class="slot lock"><b>leftover-4×</b> lock 0 on {escape(", ".join(sorted(LOCK_4X)))}.</div>
</div>

<h2 id="y2020-door">2020 Zoom lean door <span>15 dest folders · leftover-4× 0</span></h2>
<p class="lede">Star: Join is a trap. Mute → chat → Leave writes <code>itt20-zoom</code>. 300 million is daily meeting participants, not users. No ILS June 2020 websites cell.</p>
<div class="flow">{flow20}</div>
<div class="row" style="margin-top:10px">
  <span class="pill">3× first: youtube · wikipedia · facebook</span>
  <span class="pill">3× third: teams · vine · tiktok</span>
  <span class="pill">2× ×2 every dest</span>
  <span class="pill lock">4× 0</span>
</div>

<h2 id="golds">Every gold + official 10 <span>exact dest paths</span></h2>
<div class="grid">{''.join(gold_cards)}</div>

<h2 id="ci">Ship pipeline <code>scripts/ci.sh</code> <span>last run 490 passed · 8 skipped</span></h2>
<div class="ci">
  <div class="card">
    <h3>Static (this script)</h3>
    <ul class="plain">
      <li>smoke-production.py</li>
      <li>audit-internal-links.py — 440,253 / 0 broken</li>
      <li>test-authenticity.py — 84/84</li>
      <li>test-pipeline.py — sitemap includes /years/2020/</li>
      <li>check-5x-contract.py</li>
      <li>audit-mock-flows.js</li>
      <li>check-all-years.py — 29/29</li>
      <li>HTTP smoke on :8080</li>
    </ul>
  </div>
  <div class="card">
    <h3>E2E ship pack</h3>
    <ul class="plain">
      <li>oss-visitor-gate — enter all 29</li>
      <li>hub · atlas · 3× links · all-years smoke</li>
      <li>Gold-A · popular 3× · one-thing</li>
      <li>2005–2010 leftover-4× · 2008 CUT-DOUBLE + 5×</li>
      <li>2014 mvp/flows/4× · 2018 mvp/flows</li>
      <li>2020 mvp/flows · 2022 mvp/flows/4×</li>
      <li>2016–2018 3× + trail · 2017–2019 deepen</li>
    </ul>
    <p class="path">Not this script: leftover-official dest-minutes (~12k) · full 317-spec tree</p>
  </div>
</div>

<h2 id="leave">Still leftover by law</h2>
<div class="row">
  <span class="pill lock">2013 leftover-3× second — no dest-farm</span>
  <span class="pill lock">2018 leftover-3× second — official 10 + first 3 = 13 dests</span>
  <span class="pill lock">leftover-4× on lock years</span>
  <span class="pill lock">CUT-OPEN 2023–2025 unnamed</span>
  <span class="pill lock">do not restore 2013 / 2018 forests</span>
</div>

<p class="foot">Generated from live configs. Trust order: years/ → itt_gate.py → DISK-TRUTH. Do not treat this page as a visitor room.</p>
</div>
</body>
</html>
"""


def main() -> int:
    data = dump_disk()
    OUT.mkdir(parents=True, exist_ok=True)
    html = render(data)
    (OUT / "index.html").write_text(html, encoding="utf-8")
    (OUT / "README.md").write_text(
        "# Museum map (author only)\n\n"
        "Not visitor-facing. Regenerated by `python3 scripts/generate-museum-map.py`.\n"
        "Open `/dev/museum-map/` on the local static server.\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT / 'index.html'} ({len(html)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
