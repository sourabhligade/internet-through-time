#!/usr/bin/env python3
"""
Generate author-only flow atlas under dev/flow-atlas/.

NOT linked from hub, years, or visitor UI. Open locally:
  python3 -m http.server 8765 --bind 127.0.0.1
  open http://127.0.0.1:8765/dev/flow-atlas/

Regenerate: python3 scripts/generate-flow-atlas.py
"""
from __future__ import annotations

import json
import re
import subprocess
from datetime import date
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dev" / "flow-atlas"
YEARS = [str(y) for y in range(1994, 2014)]


def load_flow_maps() -> dict:
    """Evaluate flow-maps.js via node → JSON."""
    script = r"""
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('js/config/flow-maps.js', 'utf8');
const sandbox = { console, ITT: {} };
sandbox.global = sandbox;
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const maps = (sandbox.ITT && sandbox.ITT.flowMaps) || {};
process.stdout.write(JSON.stringify(maps));
"""
    r = subprocess.run(
        ["node", "-e", script],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(r.stdout)


def extract_immersion_nav(year: str) -> dict:
    path = ROOT / "js" / "config" / f"immersion-{year}.js"
    if not path.exists():
        return {"nav": [], "footerNav": [], "navSubtitle": "", "tour": []}
    text = path.read_text(encoding="utf-8", errors="replace")
    subtitle = ""
    m = re.search(r'navSubtitle:\s*["\']([^"\']*)["\']', text)
    if m:
        subtitle = m.group(1)

    def grab_array(name: str) -> list[dict]:
        # Find name: [ ... ] with nested braces — simple bracket match
        m = re.search(rf"{name}\s*:\s*\[", text)
        if not m:
            return []
        i = m.end() - 1
        depth = 0
        start = i
        for j in range(i, len(text)):
            if text[j] == "[":
                depth += 1
            elif text[j] == "]":
                depth -= 1
                if depth == 0:
                    chunk = text[start : j + 1]
                    items = []
                    for obj in re.finditer(
                        r'\{\s*label:\s*["\']([^"\']+)["\']\s*,\s*href:\s*["\']([^"\']+)["\']',
                        chunk,
                    ):
                        items.append({"label": obj.group(1), "href": obj.group(2)})
                    # tour may have extra fields — already captured label/href
                    return items
        return []

    return {
        "nav": grab_array("nav"),
        "footerNav": grab_array("footerNav"),
        "tour": grab_array("tour"),
        "navSubtitle": subtitle,
    }


def parse_home(year: str) -> dict:
    path = ROOT / "years" / year / "pages" / "home.html"
    if not path.exists():
        return {"exists": False}
    raw = path.read_text(encoding="utf-8", errors="replace")
    # strip tags lightly for thesis
    thesis = ""
    tm = re.search(
        r'class="itt-start-thesis"[^>]*>(.*?)</(?:td|div|p)>',
        raw,
        re.I | re.S,
    )
    if tm:
        thesis = re.sub(r"<[^>]+>", " ", tm.group(1))
        thesis = re.sub(r"\s+", " ", thesis).strip()

    chips = []
    for m in re.finditer(
        r'<a\s+[^>]*href="([^"]+)"[^>]*class="[^"]*chip[^"]*"[^>]*>(.*?)</a>',
        raw,
        re.I | re.S,
    ):
        href = m.group(1)
        inner = re.sub(r"<[^>]+>", " ", m.group(2))
        inner = re.sub(r"\s+", " ", inner).strip()
        chips.append({"href": href, "text": inner})

    trails = []
    for m in re.finditer(
        r'<div\s+class="itt-trail"[^>]*>(.*?)</div>',
        raw,
        re.I | re.S,
    ):
        block = m.group(1)
        title_m = re.search(r"<b>(.*?)</b>", block, re.I | re.S)
        title = re.sub(r"<[^>]+>", "", title_m.group(1)).strip() if title_m else "Trail"
        links = []
        for lm in re.finditer(r'href="([^"]+)"[^>]*>(.*?)</a>', block, re.I | re.S):
            links.append(
                {
                    "href": lm.group(1),
                    "text": re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", lm.group(2))).strip(),
                }
            )
        plain = re.sub(r"<[^>]+>", " ", block)
        plain = re.sub(r"\s+", " ", plain).strip()
        trails.append({"title": title, "links": links, "text": plain})

    return {
        "exists": True,
        "thesis_snip": thesis[:400],
        "chips": chips,
        "trails": trails,
    }


def inventory_year(year: str) -> dict:
    yroot = ROOT / "years" / year
    pages = sorted((yroot / "pages").rglob("*.html")) if (yroot / "pages").exists() else []
    sites_dir = yroot / "sites"
    site_roots = sorted([p.name for p in sites_dir.iterdir() if p.is_dir()]) if sites_dir.exists() else []
    site_html = list(sites_dir.rglob("*.html")) if sites_dir.exists() else []
    return {
        "pages_html": len(pages),
        "site_folders": len(site_roots),
        "site_html": len(site_html),
        "site_names": site_roots,
        "page_names": [str(p.relative_to(yroot / "pages")) for p in pages],
    }


def resolve_exists(year: str, href: str) -> bool:
    if not href or href.startswith(("http://", "https://", "mailto:", "#")):
        return True
    # flow-map hrefs are relative to year root
    clean = href.split("#")[0].split("?")[0]
    if clean.startswith("../"):
        # from pages/home
        clean = clean[3:]
    path = ROOT / "years" / year / clean
    return path.exists()


def css() -> str:
    return """
:root {
  --bg: #0f1419;
  --panel: #1a2332;
  --panel2: #243044;
  --text: #e7ecf3;
  --muted: #8b9bb4;
  --accent: #6cb6ff;
  --ok: #3ecf8e;
  --warn: #f0b429;
  --bad: #f07178;
  --line: #2d3a4f;
  --chip: #2a3f5f;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font: 14px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
  background: var(--bg);
  color: var(--text);
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
header {
  position: sticky; top: 0; z-index: 10;
  background: rgba(15,20,25,.94);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(8px);
  padding: 12px 20px;
}
header .banner {
  background: #3d2a00;
  color: #ffd27a;
  border: 1px solid #7a5a10;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  margin-bottom: 10px;
}
header h1 { margin: 0 0 4px; font-size: 18px; font-weight: 650; }
header p { margin: 0; color: var(--muted); font-size: 12px; }
.wrap { max-width: 1100px; margin: 0 auto; padding: 16px 20px 48px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  margin: 16px 0 28px;
}
.year-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px;
  transition: border-color .15s, transform .15s;
}
.year-card:hover { border-color: var(--accent); transform: translateY(-1px); }
.year-card .y { font-size: 22px; font-weight: 700; }
.year-card .meta { font-size: 11px; color: var(--muted); margin-top: 6px; }
.year-card .meta b { color: var(--ok); font-weight: 600; }
.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px 18px;
  margin: 0 0 16px;
}
.panel h2 { margin: 0 0 8px; font-size: 16px; }
.panel h3 { margin: 16px 0 8px; font-size: 14px; color: var(--accent); }
.muted { color: var(--muted); }
.thesis { font-size: 15px; line-height: 1.5; }
.shell {
  display: inline-block;
  background: var(--panel2);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: #c5d4ea;
  margin: 6px 0 0;
}
.how { margin: 8px 0 0; padding-left: 18px; color: #c8d4e6; }
.branch {
  border-left: 3px solid var(--accent);
  padding: 4px 0 4px 12px;
  margin: 14px 0;
}
.branch .blabel { font-weight: 650; }
.branch .bdo { color: var(--muted); font-size: 12px; }
.site {
  background: var(--panel2);
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px 0;
}
.site .name { font-weight: 600; }
.site .do { color: #c5d0e0; font-size: 13px; margin-top: 2px; }
.site .href { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: var(--muted); }
.steps { margin: 6px 0 0; padding-left: 18px; font-size: 12px; color: #b8c7dc; }
.badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: .02em;
  padding: 2px 6px;
  border-radius: 999px;
  margin-left: 6px;
  vertical-align: middle;
}
.badge.ok { background: #143d2a; color: var(--ok); }
.badge.miss { background: #3d1a1e; color: var(--bad); }
.badge.step { background: #2a2440; color: #c4b5fd; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.chip {
  background: var(--chip);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  color: #d7e6ff;
}
.trail {
  background: #1b2838;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px 0;
  font-size: 13px;
}
.trail b { color: #fff; }
.navrow { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.navpill {
  background: #1e2d42;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
}
.toc a { margin-right: 10px; font-size: 13px; }
.stats {
  display: flex; flex-wrap: wrap; gap: 12px;
  margin: 10px 0 0;
}
.stat {
  background: var(--panel2);
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 90px;
}
.stat .n { font-size: 20px; font-weight: 700; }
.stat .l { font-size: 11px; color: var(--muted); }
.site-list {
  columns: 3;
  column-gap: 16px;
  font-size: 11px;
  color: var(--muted);
  margin-top: 8px;
}
.site-list span { display: block; break-inside: avoid; padding: 1px 0; }
footer {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  font-size: 12px;
  color: var(--muted);
}
@media (max-width: 700px) {
  .site-list { columns: 2; }
}
"""


def page_shell(title: str, body: str, active: str | None = None) -> str:
    year_links = " ".join(
        f'<a href="{y}.html"{" class=active" if y == active else ""}>{y}</a>'
        for y in YEARS
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(title)} · Flow atlas (author only)</title>
<style>{css()}
header .toc a.active {{ color: #fff; font-weight: 700; border-bottom: 2px solid var(--accent); }}
</style>
</head>
<body>
<header>
  <div class="banner">
    <b>Author-only · not linked from the museum hub or year shells.</b>
    Visitors never see this path. Regenerated from <code>js/config/flow-maps.js</code>, immersion nav, and home HTML.
  </div>
  <h1>Internet Through Time — flow atlas</h1>
  <p>Map every implemented year · trails · rooms · multi-step content · disk inventory · {date.today().isoformat()}</p>
  <div class="toc" style="margin-top:10px">
    <a href="index.html">Index</a>
    {year_links}
  </div>
</header>
<div class="wrap">
{body}
<footer>
  Private atlas under <code>dev/flow-atlas/</code> · regenerate with
  <code>python3 scripts/generate-flow-atlas.py</code> · open via local static server, not production museum entry.
</footer>
</div>
</body>
</html>
"""


def render_year(year: str, fmap: dict, inv: dict, home: dict, imm: dict) -> str:
    branches = fmap.get("branches") or []
    n_sites = sum(len(b.get("sites") or []) for b in branches)
    n_with_steps = 0
    missing = []
    for b in branches:
        for s in b.get("sites") or []:
            if s.get("steps"):
                n_with_steps += 1
            href = s.get("href") or ""
            if not resolve_exists(year, href):
                missing.append(f"{s.get('name')}: {href}")

    stats = f"""
<div class="stats">
  <div class="stat"><div class="n">{len(branches)}</div><div class="l">trails / branches</div></div>
  <div class="stat"><div class="n">{n_sites}</div><div class="l">mapped rooms</div></div>
  <div class="stat"><div class="n">{n_with_steps}</div><div class="l">with step lists</div></div>
  <div class="stat"><div class="n">{inv['site_folders']}</div><div class="l">site folders on disk</div></div>
  <div class="stat"><div class="n">{inv['site_html']}</div><div class="l">HTML under sites/</div></div>
  <div class="stat"><div class="n">{inv['pages_html']}</div><div class="l">pages/*.html</div></div>
  <div class="stat"><div class="n">{len(missing)}</div><div class="l">missing map targets</div></div>
</div>
"""

    nav_html = ""
    if imm.get("nav"):
        pills = "".join(
            f'<span class="navpill">{escape(n["label"])} <span class="muted">→ {escape(n["href"])}</span></span>'
            for n in imm["nav"]
        )
        nav_html = f"""
<div class="panel">
  <h2>Shell dir / in-year nav</h2>
  <p class="muted">{escape(imm.get("navSubtitle") or "")}</p>
  <div class="navrow">{pills}</div>
</div>
"""

    chips_html = ""
    if home.get("chips"):
        chips = "".join(f'<span class="chip">{escape(c["text"])}</span>' for c in home["chips"])
        chips_html = f"""
<div class="panel">
  <h2>Starting Point product chips</h2>
  <div class="chips">{chips}</div>
</div>
"""

    trails_html = ""
    if home.get("trails"):
        blocks = []
        for t in home["trails"]:
            blocks.append(f'<div class="trail"><b>{escape(t["title"])}</b><br>{escape(t["text"])}</div>')
        trails_html = f"""
<div class="panel">
  <h2>Home connection trails (as written on home.html)</h2>
  {"".join(blocks)}
</div>
"""

    branch_html = []
    for b in branches:
        sites_h = []
        for s in b.get("sites") or []:
            href = s.get("href") or ""
            ok = resolve_exists(year, href)
            badge = '<span class="badge ok">on disk</span>' if ok else '<span class="badge miss">MISSING</span>'
            steps = s.get("steps") or []
            step_badge = f'<span class="badge step">{len(steps)} steps</span>' if steps else ""
            steps_html = ""
            if steps:
                steps_html = "<ol class='steps'>" + "".join(f"<li>{escape(x)}</li>" for x in steps) + "</ol>"
            # relative link for author: to museum year file (opens if served from repo root)
            museum_href = f"../../years/{year}/{href}" if href and not href.startswith("http") else href
            sites_h.append(
                f"""
<div class="site">
  <div class="name">{escape(s.get("name") or "?")}{badge}{step_badge}</div>
  <div class="do">{escape(s.get("do") or "")}</div>
  <div class="href"><a href="{escape(museum_href)}">{escape(href)}</a></div>
  {steps_html}
</div>"""
            )
        branch_html.append(
            f"""
<div class="branch">
  <div class="blabel">{escape(b.get("label") or "")}</div>
  <div class="bdo">{escape(b.get("do") or "")}</div>
  {"".join(sites_h)}
</div>"""
        )

    miss_html = ""
    if missing:
        miss_html = (
            '<div class="panel"><h2>Missing map targets</h2><ul>'
            + "".join(f"<li class='muted'>{escape(x)}</li>" for x in missing)
            + "</ul></div>"
        )

    folders = "".join(f"<span>{escape(n)}</span>" for n in inv["site_names"])
    pages = "".join(f"<span>{escape(n)}</span>" for n in inv["page_names"])

    thesis = fmap.get("thesis") or home.get("thesis_snip") or ""
    shell = fmap.get("shell") or ""
    how = fmap.get("how") or []
    how_html = "<ol class='how'>" + "".join(f"<li>{escape(h)}</li>" for h in how) + "</ol>" if how else ""

    body = f"""
<p class="muted"><a href="index.html">← All years</a> · museum year root
  <a href="../../years/{year}/pages/home.html">years/{year}/pages/home.html</a> ·
  public map <a href="../../years/{year}/pages/map.html">map.html</a>
</p>

<div class="panel">
  <h2>{year}</h2>
  <p class="thesis">{escape(thesis)}</p>
  <div class="shell">{escape(shell)}</div>
  {how_html}
  {stats}
</div>

{nav_html}
{chips_html}
{trails_html}

<div class="panel">
  <h2>Flow map trees (visitor-facing structure)</h2>
  <p class="muted">Source: <code>js/config/flow-maps.js</code> · same data as <code>years/{year}/pages/map.html</code></p>
  {"".join(branch_html) if branch_html else "<p class='muted'>No branches in flow-maps.js</p>"}
</div>

{miss_html}

<div class="panel">
  <h2>Disk inventory · site folders ({inv['site_folders']})</h2>
  <p class="muted">Every folder under <code>years/{year}/sites/</code> — includes continuity residuals not always on the flow map.</p>
  <div class="site-list">{folders or "<span>(none)</span>"}</div>
</div>

<div class="panel">
  <h2>Disk inventory · pages/ ({inv['pages_html']})</h2>
  <div class="site-list">{pages or "<span>(none)</span>"}</div>
</div>
"""
    return page_shell(f"{year} flows", body, active=year)


def render_index(years_data: list[dict]) -> str:
    cards = []
    total_sites = 0
    total_branches = 0
    for yd in years_data:
        y = yd["year"]
        fmap = yd["fmap"]
        inv = yd["inv"]
        branches = fmap.get("branches") or []
        n_sites = sum(len(b.get("sites") or []) for b in branches)
        total_sites += n_sites
        total_branches += len(branches)
        thesis = (fmap.get("thesis") or "")[:90]
        cards.append(
            f"""
<a class="year-card" href="{y}.html">
  <div class="y">{y}</div>
  <div class="meta">
    <b>{len(branches)}</b> trails · <b>{n_sites}</b> rooms<br>
    disk: {inv['site_folders']} site folders · {inv['site_html']} html
  </div>
  <div class="meta" style="margin-top:8px">{escape(thesis)}…</div>
</a>"""
        )

    body = f"""
<div class="panel">
  <h2>All implemented years · 1994–2013</h2>
  <p class="muted">
    {len(years_data)} years · {total_branches} trails · {total_sites} flow-map rooms (sites listed in trees).
    This index is <b>not</b> part of the public museum — use it to plan trails and see what each year contains.
  </p>
  <p>
    <b>How to open:</b> from repo root run
    <code>python3 -m http.server 8765 --bind 127.0.0.1</code>
    then visit <code>http://127.0.0.1:8765/dev/flow-atlas/</code>
  </p>
</div>
<div class="grid">
{"".join(cards)}
</div>
<div class="panel">
  <h2>What each year page shows</h2>
  <ul class="muted">
    <li>Thesis + shell + how-to steps from flow-maps.js</li>
    <li>In-year nav / dirbar labels from immersion config</li>
    <li>Starting Point chips + connection trails from home.html</li>
    <li>Every flow-map branch → room name, what it does, multi-step list, on-disk check</li>
    <li>Full disk inventory of sites/ and pages/ (residuals included)</li>
  </ul>
</div>
"""
    return page_shell("Index", body)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    maps = load_flow_maps()
    years_data = []
    for year in YEARS:
        fmap = maps.get(year) or {"thesis": "", "shell": "", "how": [], "branches": []}
        if "year" not in fmap:
            fmap = dict(fmap)
            fmap["year"] = year
        inv = inventory_year(year)
        home = parse_home(year)
        imm = extract_immersion_nav(year)
        years_data.append({"year": year, "fmap": fmap, "inv": inv, "home": home, "imm": imm})
        html = render_year(year, fmap, inv, home, imm)
        (OUT / f"{year}.html").write_text(html, encoding="utf-8")

    (OUT / "index.html").write_text(render_index(years_data), encoding="utf-8")

    # JSON dump for tooling
    dump = []
    for yd in years_data:
        y = yd["year"]
        fmap = yd["fmap"]
        dump.append(
            {
                "year": y,
                "thesis": fmap.get("thesis"),
                "shell": fmap.get("shell"),
                "how": fmap.get("how"),
                "branches": fmap.get("branches"),
                "nav": yd["imm"].get("nav"),
                "home_chips": yd["home"].get("chips"),
                "home_trails": [
                    {"title": t["title"], "text": t["text"]} for t in (yd["home"].get("trails") or [])
                ],
                "inventory": {
                    "site_folders": yd["inv"]["site_folders"],
                    "site_html": yd["inv"]["site_html"],
                    "pages_html": yd["inv"]["pages_html"],
                    "site_names": yd["inv"]["site_names"],
                },
            }
        )
    (OUT / "atlas.json").write_text(json.dumps(dump, indent=2), encoding="utf-8")

    readme = f"""# Flow atlas (author only)

**Not visitor-facing.** Not linked from the hub, year shells, or public map pages.

Generated **{date.today().isoformat()}** by `scripts/generate-flow-atlas.py`.

## Open

```bash
# from repo root
python3 -m http.server 8765 --bind 127.0.0.1
# browser
open http://127.0.0.1:8765/dev/flow-atlas/
```

Or open `dev/flow-atlas/index.html` via any local static server rooted at the repo.

## Contents

| File | Purpose |
|------|---------|
| `index.html` | All years 1994–2013 overview cards |
| `YYYY.html` | Full year: thesis, nav, chips, trails, flow tree, disk inventory |
| `atlas.json` | Machine-readable dump of the same data |

## Sources

- `js/config/flow-maps.js` — trails / rooms / steps
- `js/config/immersion-YYYY.js` — in-year nav labels
- `years/YYYY/pages/home.html` — chips + connection trails
- `years/YYYY/sites/*` — disk inventory (includes residuals)

## Regenerate

```bash
python3 scripts/generate-flow-atlas.py
```
"""
    (OUT / "README.md").write_text(readme, encoding="utf-8")
    print(f"Wrote {OUT}/index.html + {len(YEARS)} year pages + atlas.json")


if __name__ == "__main__":
    main()
