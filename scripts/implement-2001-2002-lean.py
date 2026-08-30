#!/usr/bin/env python3
"""Scaffold 2001 + 2002 lean doors from the 2026-08-30 from-scratch freeze.

Does not restore the old forest. Does not invent brand pixels.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def page(year: str, title: str, body: str, extra_css: str = "", extra_js: str = "") -> str:
    css = f"../../../css/period-{year}.css" if "/pages/" in str(title) else ""
    # caller passes relative css via extra
    return (
        "<!DOCTYPE html>\n"
        f'<html lang="en" data-itt-year="{year}">\n'
        "<head>\n<meta charset=\"utf-8\">\n"
        f"<title>{title}</title>\n"
        f"{extra_css}"
        "</head>\n"
        f'<body bgcolor="#fff" text="#111">\n'
        '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        f"{body}\n"
        f"{extra_js}"
        "</body>\n</html>\n"
    )


def site_page(year: str, title: str, body: str, official: str = "") -> str:
    off = f' data-official-key="{official}"' if official else ""
    return (
        "<!DOCTYPE html>\n"
        f'<html lang="en" data-itt-year="{year}"{off}>\n'
        "<head>\n<meta charset=\"utf-8\">\n"
        f"<title>{title}</title>\n"
        f'<link rel="stylesheet" href="../../../../css/period-{year}.css">\n'
        "</head>\n"
        '<body bgcolor="#fff" text="#111">\n'
        '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        f'<p class="crumb"><a href="../../pages/home.html">← Starting Point</a> · '
        f'<a href="../../pages/about.html">About</a></p>\n'
        f"{body}\n"
        f'<script src="../../../../js/immersion-{year}.js"></script>\n'
        "</body>\n</html>\n"
    )


def leftover(year: str, h1: str, blurb: str, key: str, ph: str, nxt: str, nxt_l: str) -> str:
    pfx = "01" if year == "2001" else "02"
    return site_page(
        year,
        h1,
        f"""<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px">[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>
<h1>{h1}</h1>
<p>{blurb}</p>
<label style="display:block"><input type="checkbox" data-req> Year-true leftover · not the chip</label>
<label style="display:block"><input type="checkbox" data-req> Incomplete never writes</label>
<p><input type="text" id="lx-{key}" maxlength="80" placeholder="{ph}"></p>
<p><button type="button" data-itt-real-save data-storage-key="{key}" data-min-req="2" data-requires="[data-req]" data-require-field="#lx-{key}" data-require-field-min="2">Save leftover</button>
<span data-itt-action-status></span></p>
<p hidden data-next-flow data-next-when-key="itt{pfx}-{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>""",
    )


def stub_js(year: str, kind: str) -> str:
    if kind == "immersion":
        return f"""/**
 * Immersion year stub — {year}
 */
(function () {{
  "use strict";
  var ITT = window.ITT || (window.ITT = {{}});
  ITT._immersionYear = "{year}";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
}})();
"""
    return f"""/**
 * Browser year stub — {year}
 */
(function () {{
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {{
    ITT.bootBrowserYear("{year}");
    return;
  }}
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["{year}"]) {{
    console.error("ITT {year} bootstrap: missing util/core/config scripts");
    return;
  }}
  ITT.Browser.create(ITT.configs["{year}"]);
}})();
"""


def config_js(year: str, rooms: list[str], home_host: str, suffix: str, desktop: str) -> str:
    room_l = ",\n    ".join(f'"{r}"' for r in rooms)
    return f"""/**
 * Year config — {year} lean from-scratch
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};

  var rooms = [
    {room_l}
  ];

  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "{home_host}",
    "pages/about.html": "{home_host}about.html",
    "pages/map.html": "http://museum.local/years/{year}/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) {{
      urlMap[rooms[i]] = "http://museum.local/years/{year}/" + rooms[i];
    }}
  }}

  ITT.configs["{year}"] = {{
    year: "{year}",
    home: "pages/home.html",
    prefsKey: "itt-{year}-prefs",
    bookmarksKey: "itt-{year}-bookmarks",
    connectedKey: "itt-{year}-connected",
    immersionScript: "js/immersion-{year}.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · 56k residual · broadband rising (museum)",
    connectBrowserLine: "Starting Internet Explorer {suffix}...",
    defaultPrefs: {{
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 40,
      homeUrl: "{home_host}",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "{desktop}"
    }},
    urlMap: urlMap
  }};
}})(typeof window !== "undefined" ? window : this);
"""


def immersion_config(year: str, pfx: str, subtitle: str, nav: list[tuple[str, str, str]]) -> str:
    items = ",\n      ".join(f'{{ label: "{l}", href: "{h}", match: "{m}" }}' for l, h, m in nav)
    return f"""/**
 * Immersion config — {year}
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.immersionConfigs = ITT.immersionConfigs || {{}};

  ITT.immersionConfigs["{year}"] = {{
    year: "{year}",
    storagePrefix: "{pfx}",
    features: {{
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      wikipedia: true,
      stumbleupon: true,
      friendster: true,
      kazaa: true
    }},
    navSubtitle: "{subtitle}",
    nav: [
      {{ label: "Start", href: "pages/home.html", match: "/pages/" }},
      {items}
    ],
    footerNav: [
      {{ label: "Starting Point", href: "pages/home.html" }},
      {{ label: "Flow map", href: "pages/map.html" }},
      {{ label: "About {year}", href: "pages/about.html" }}
    ]
  }};
}})(typeof window !== "undefined" ? window : this);
"""


def year_index(year: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 6.0 — {year}</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("{year}");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/{year}.js?v=20260830ui"></script>
<script src="../../js/browser-{year}.js?v=20260830ui"></script>
</body>
</html>
"""


def year_home(year: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — {year}</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#3a6ea5">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("{year}");</script>
<script src="../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def pages_shell(year: str, title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def playable_game(year: str, gid: str, title: str, key: str, inspire: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}" data-official-key="{key}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{gid}">
<p><a href="index.html">← Cabinet</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p class="yg-honesty">{inspire} · leftover cabinet · not the chip</p>
<p>Score <b data-game-score>0</b></p>
<p><button type="button" data-game-start>New Game</button></p>
<canvas id="game-canvas" width="480" height="280" data-game="{gid}" style="border:1px solid #333;background:#e8e8e8"></canvas>
<p data-itt-action-status>Play. Incomplete New Game never writes.</p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
<script src="../../../../js/games/year-{year}-{gid}.js"></script>
</body>
</html>
"""


def playable_index(year: str, title: str) -> str:
    return site_page(
        year,
        f"{title} cabinet",
        f"""<h1>{year} playable</h1>
<p>Year cabinet leftover. Star stays the year chip.</p>
<p><a href="game.html"><b>▶ {title}</b></a> · <a href="famous.html">Famous</a> ·
<a href="extra-a.html">extra A</a> · <a href="extra-b.html">extra B</a></p>
<div data-year-playable data-year="{year}"></div>""",
    ).replace("../../pages/", "../../../pages/").replace("../../../../css", "../../../../../css")  # keep paths


def insert_json_key(path: Path, after_key: str, new_key: str, blob: str) -> None:
    t = path.read_text(encoding="utf-8")
    if f'"{new_key}"' in t and f'"{new_key}":' in t:
        return
    needle = f'"{after_key}":'
    i = t.find(needle)
    if i < 0:
        raise SystemExit(f"no {after_key} in {path}")
    # find matching close of that object at this indent is hard; insert before next top-level year after 2000
    mark = '\n        "2004":' if after_key == "2000" else f'\n  "{after_key}":'
    # years.js has weird indent before 2004
    if after_key == "2000" and '"2004":' in t and f'"{new_key}"' not in t:
        t = t.replace('\n        "2004":', "\n  " + blob.rstrip() + "\n        \"2004\":", 1)
        path.write_text(t, encoding="utf-8")
        return
    raise SystemExit(f"could not insert {new_key} into {path}")


def patch_shared() -> None:
    # SHIP_YEARS
    p = ROOT / "scripts/itt_gate.py"
    t = p.read_text(encoding="utf-8")
    t = t.replace('_WIPED = {"2001", "2002", "2003", "2025"}', '_WIPED = {"2003", "2025"}')
    t = t.replace("# 2001 / 2002 / 2003 / 2025 wiped.", "# 2003 / 2025 wiped. 2001–2002 lean doors live.")
    p.write_text(t, encoding="utf-8")

    p = ROOT / "scripts/check-all-years.py"
    t = p.read_text(encoding="utf-8")
    t = t.replace('_WIPED = {"2001", "2002", "2003", "2025"}', '_WIPED = {"2003", "2025"}')
    t = t.replace(
        '"2001": ["pages/home.html", "sites/wikipedia/index.html", "sites/apple/ipod.html"],',
        '"2001": ["pages/home.html", "sites/wikipedia/index.html", "sites/apple/ipod.html", "sites/wikipedia/edit.html"],',
    )
    t = t.replace(
        '"2002": ["pages/home.html", "sites/friendster/index.html", "sites/kazaa/index.html"],',
        '"2002": ["pages/home.html", "sites/stumbleupon/index.html", "sites/friendster/index.html", "sites/kazaa/index.html"],',
    )
    p.write_text(t, encoding="utf-8")

    p = ROOT / "scripts/itt_5x_contract.py"
    t = p.read_text(encoding="utf-8")
    t = t.replace(
        "WIPED_YEARS: frozenset[int] = frozenset({2001, 2002, 2003, 2007, 2020, 2024, 2025})",
        "WIPED_YEARS: frozenset[int] = frozenset({2003, 2007, 2020, 2024, 2025})",
    )
    p.write_text(t, encoding="utf-8")

    for spec in (
        ROOT / "e2e/hub-years.spec.js",
        ROOT / "e2e/atlas.spec.js",
        ROOT / "e2e/atlas-all-flows.spec.js",
    ):
        if not spec.exists():
            continue
        t = spec.read_text(encoding="utf-8")
        t = t.replace(
            "const LOCKED = ['2001', '2002', '2003', '2025'];",
            "const LOCKED = ['2003', '2025'];",
        )
        t = t.replace(
            'const WIPED = ["2001", "2002", "2003", "2025"];',
            'const WIPED = ["2003", "2025"];',
        )
        t = t.replace(
            "'2000',\n  '2004'",
            "'2000', '2001', '2002',\n  '2004'",
        )
        t = t.replace(
            '"2000",\n  "2004"',
            '"2000", "2001", "2002",\n  "2004"',
        )
        t = t.replace("28 years open", "30 years open")
        t = t.replace("/28 years open/i", "/30 years open/i")
        spec.write_text(t, encoding="utf-8")

    # hub
    hub = ROOT / "index.html"
    t = hub.read_text(encoding="utf-8")
    t = t.replace("28 years open", "30 years open")
    t = t.replace("28 years on disk; 2001–2003 and 2025 wiped", "30 years on disk; 2003 and 2025 wiped")
    t = t.replace("2001–2003 and 2025 wiped for rebuild", "2003 and 2025 wiped for rebuild")
    t = t.replace("2001–2003 and 2025 are boarded", "2003 and 2025 are boarded")
    closed = """      <a class="year-card available y2001" href="years/2001/" data-year="2001">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2001</p>
            <span class="era-chip">Wiki · iPod · XP</span>
          </div>
          <p class="label">The Web gains a memory — Wikipedia anyone-can-edit, Wayback, iTunes library + iPod. No Store.</p>
          <p class="scale">29,254,370 sites · 500,609,240 users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>

      <a class="year-card available y2002" href="years/2002/" data-year="2002">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2002</p>
            <span class="era-chip">Stumble · always-on</span>
          </div>
          <p class="label">Click Stumble. Broadband is still a minority appliance. KaZaA / Wired CSS / Phoenix leftover.</p>
          <p class="scale">38,760,373 sites · 662,663,600 users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>

      <div class="closed-rooms" aria-label="Closed year 2003">
        <p class="closed-rooms-label">Closed for rebuild — Photobucket year</p>
        <div class="closed-rooms-row">
          <div class="year-card locked y2003" data-year="2003">
            <div class="year-card-inner">
              <div class="year-row">
                <p class="year">2003</p>
                <span class="era-chip">closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>"""
    old = """      <div class="closed-rooms" aria-label="Closed years 2001 to 2003">
        <p class="closed-rooms-label">Closed for rebuild — Wikipedia / Stumble / Photobucket years</p>
        <div class="closed-rooms-row">
          <div class="year-card locked y2001" data-year="2001">
            <div class="year-card-inner">
              <div class="year-row">
                <p class="year">2001</p>
                <span class="era-chip">closed</span>
              </div>
            </div>
          </div>
          <div class="year-card locked y2002" data-year="2002">
            <div class="year-card-inner">
              <div class="year-row">
                <p class="year">2002</p>
                <span class="era-chip">closed</span>
              </div>
            </div>
          </div>
          <div class="year-card locked y2003" data-year="2003">
            <div class="year-card-inner">
              <div class="year-row">
                <p class="year">2003</p>
                <span class="era-chip">closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>"""
    if old not in t:
        raise SystemExit("hub closed-rooms block not found")
    t = t.replace(old, closed)
    hub.write_text(t, encoding="utf-8")

    for f in (ROOT / "404.html", ROOT / "atlas/index.html", ROOT / "README.md", ROOT / "docs/DISK-TRUTH.md"):
        tt = f.read_text(encoding="utf-8")
        tt = tt.replace("28 years open", "30 years open")
        tt = tt.replace("**28 years open**", "**30 years open**")
        tt = tt.replace("28 years playable · 2001–2003 and 2025 boarded", "30 years playable · 2003 and 2025 boarded")
        tt = tt.replace("**2001–2003** and **2025** are boarded", "**2003** and **2025** are boarded")
        tt = tt.replace("**2001–2003 and 2025 are boarded**", "**2003 and 2025 are boarded**")
        tt = tt.replace("Hub **28 years open** · **1994–2024** · **2001–2003 and 2025 wiped**.",
                        "Hub **30 years open** · **1994–2024** · **2003 and 2025 wiped**.")
        tt = tt.replace("| **2001–2003** | **Wiped** · hub locked · no year tree |",
                        "| **2001** | Live lean door · Wikipedia edit `itt01-wiki` |\n| **2002** | Live lean door · StumbleUpon `itt02-stumble` |\n| **2003** | **Wiped** · hub locked · no year tree |")
        tt = tt.replace("2001–2003 and 2025", "2003 and 2025")
        f.write_text(tt, encoding="utf-8")

    sm = ROOT / "sitemap.txt"
    st = sm.read_text(encoding="utf-8")
    if "/years/2001/" not in st:
        st = st.replace(
            "/years/2000/pages/about.html\n/years/2004/",
            "/years/2000/pages/about.html\n/years/2001/\n/years/2001/pages/home.html\n/years/2001/pages/about.html\n/years/2002/\n/years/2002/pages/home.html\n/years/2002/pages/about.html\n/years/2004/",
        )
        sm.write_text(st, encoding="utf-8")

    layers = ROOT / "js/immersion/layers.js"
    lt = layers.read_text(encoding="utf-8")
    lt = lt.replace(
        '"2002": { machine: "Windows XP · Internet Explorer 6", star: "Friendster", starHref: "sites/friendster/index.html", game: "Room Sticky" }',
        '"2002": { machine: "Windows XP · Internet Explorer 6", star: "StumbleUpon", starHref: "sites/stumbleupon/index.html", game: "Room Sticky" }',
    )
    layers.write_text(lt, encoding="utf-8")


def insert_start_data() -> None:
    p = ROOT / "ui/year/start-data.js"
    t = p.read_text(encoding="utf-8")
    if '"2001":' in t:
        return
    blob = """  "2001": {
    "href": "../sites/wikipedia/edit.html",
    "label": "★ One-thing · Wikipedia edit REAL",
    "items": [
      "<a href=\\"about.html\\">About 2001</a> — memory · jukebox · monopoly",
      "<a href=\\"../sites/wikipedia/edit.html\\">Wikipedia</a> — edit · preview is not Save",
      "<a href=\\"../sites/archive/index.html\\">Wayback leftover</a> — Oct 24 public",
      "<a href=\\"../sites/itunes/index.html\\">iTunes library leftover</a> — no Store",
      "<a href=\\"../sites/apple/ipod.html\\">iPod leftover</a> — 1,000 songs · $399",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  },
  "2002": {
    "href": "../sites/stumbleupon/index.html",
    "label": "★ One-thing · StumbleUpon REAL",
    "items": [
      "<a href=\\"about.html\\">About 2002</a> — always-on minority · Stumble",
      "<a href=\\"../sites/stumbleupon/index.html\\">StumbleUpon</a> — topic + Stumble",
      "<a href=\\"../sites/isp/index.html\\">Always-on leftover</a> — Pew 21%",
      "<a href=\\"../sites/kazaa/index.html\\">KaZaA leftover</a> — no real files",
      "<a href=\\"../sites/wired/index.html\\">Wired CSS leftover</a> — Oct redesign",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  },
"""
    t = t.replace('        "2004": {', blob + '        "2004": {', 1)
    p.write_text(t, encoding="utf-8")


def insert_start_extra() -> None:
    p = ROOT / "ui/year/start-extra.js"
    t = p.read_text(encoding="utf-8")
    if '"2001":' in t:
        return
    e01 = (
        '<p class="itt-felt-trail">After you preview: <a href="../sites/wikipedia/edit.html">edit Wikipedia</a> — preview is not Save.</p>'
        '<p class="itt-2x-trails" id="ott-2x-2001"><b>2× leftover</b> · '
        '<a href="../sites/archive/index.html">Wayback</a> · '
        '<a href="../sites/itunes/index.html">iTunes</a> · '
        '<a href="../sites/apple/ipod.html">iPod</a> · '
        '<a href="../sites/napster/index.html">Napster</a> · '
        '<a href="../sites/movabletype/index.html">Movable Type</a></p>'
        '<p class="itt-pop3x" data-itt-pop3x><b>Also popular</b> · '
        '<a href="../sites/google/index.html">Google</a> · '
        '<a href="../sites/yahoo/index.html">Yahoo</a> · '
        '<a href="../sites/cnn/index.html">CNN</a></p>'
        '<p class="itt-year-true-pack"><b>Year-true residual</b> · Blogdex · Blogger · Mozilla · Encarta</p>'
    )
    e02 = (
        '<p class="itt-felt-trail">Click <a href="../sites/stumbleupon/index.html">Stumble</a> — empty topic never writes.</p>'
        '<p class="itt-2x-trails" id="ott-2x-2002"><b>2× leftover</b> · '
        '<a href="../sites/isp/index.html">always-on</a> · '
        '<a href="../sites/kazaa/index.html">KaZaA</a> · '
        '<a href="../sites/wired/index.html">Wired CSS</a> · '
        '<a href="../sites/phoenix/index.html">Phoenix</a> · '
        '<a href="../sites/friendster/index.html">Friendster seed</a></p>'
        '<p class="itt-pop3x" data-itt-pop3x><b>Also popular</b> · '
        '<a href="../sites/daypop/index.html">Daypop</a> · '
        '<a href="../sites/googlenews/index.html">Google News</a> · '
        '<a href="../sites/technorati/index.html">Technorati</a></p>'
        '<p class="itt-year-true-pack"><b>Year-true residual</b> · iPod gen 2 · TrackBack · last.fm seed · MTV</p>'
    )
    blob = f'  "2001": {json.dumps(e01)},\n  "2002": {json.dumps(e02)},\n'
    t = t.replace('  "2004":', blob + '  "2004":', 1)
    p.write_text(t, encoding="utf-8")


def insert_years_js() -> None:
    p = ROOT / "ui/year/years.js"
    t = p.read_text(encoding="utf-8")
    if '"2001":' in t:
        return
    blob = r'''  "2001": {
    "title": "Internet Explorer 6.0 — 2001",
    "css": ["win95-netscape.css", "ie5-overrides.css"],
    "bodyClass": "year-2001 os-winxp browser-ie6",
    "boot": "browser-2001.js",
    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/wikipedia/index.html", "label": "Wikipedia"},
      {"go": "sites/archive/index.html", "label": "Wayback"},
      {"go": "sites/apple/ipod.html", "label": "iPod"},
      {"go": "sites/itunes/index.html", "label": "iTunes"},
      {"go": "sites/google/index.html", "label": "Google"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "pages/about.html", "label": "About"}
    ],
    "chrome": "2001",
    "toolbar": "ie",
    "family": "ie",
    "location": "http://home.microsoft.com/intl/web2001/",
    "prefHome": "http://home.microsoft.com/intl/web2001/",
    "yearLabel": "2001 · Windows XP · Internet Explorer 6",
    "windowTitle": "Welcome to the World Wide Web — Microsoft Internet Explorer",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (56k residual)",
    "skipBtn": "Skip connect",
    "thesis": "2001 thesis: Wikipedia anyone-can-edit · Wayback · iTunes library · iPod. No Store.",
    "openLoc": "Open Location in Internet Explorer:",
    "aboutHtml": "<p><b>Microsoft Internet Explorer</b></p><p>Version 6.0</p>",
    "startBanner": "Windows<b>XP</b>",
    "taskBtn": "Internet Explorer",
    "icon": "e",
    "aria": "Internet Explorer 6",
    "locLabel": "Address",
    "bookmarksTitle": "Favorites",
    "mailPh": "friend@aol.com",
    "hasTaskbar": true,
    "maximized": true
  },
  "2002": {
    "title": "Internet Explorer 6.0 — 2002",
    "css": ["win95-netscape.css", "ie5-overrides.css"],
    "bodyClass": "year-2002 os-winxp browser-ie6",
    "boot": "browser-2002.js",
    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/stumbleupon/index.html", "label": "Stumble"},
      {"go": "sites/kazaa/index.html", "label": "KaZaA"},
      {"go": "sites/wired/index.html", "label": "Wired"},
      {"go": "sites/friendster/index.html", "label": "Friendster"},
      {"go": "sites/google/index.html", "label": "Google"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "pages/about.html", "label": "About"}
    ],
    "chrome": "2002",
    "toolbar": "ie",
    "family": "ie",
    "location": "http://home.microsoft.com/intl/web2002/",
    "prefHome": "http://home.microsoft.com/intl/web2002/",
    "yearLabel": "2002 · Windows XP · Internet Explorer 6",
    "windowTitle": "Welcome to the World Wide Web — Microsoft Internet Explorer",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (always-on rising)",
    "skipBtn": "Skip connect",
    "thesis": "2002 thesis: Stumble · always-on minority · KaZaA leftover. No Store. No MySpace.",
    "openLoc": "Open Location in Internet Explorer:",
    "aboutHtml": "<p><b>Microsoft Internet Explorer</b></p><p>Version 6.0</p>",
    "startBanner": "Windows<b>XP</b>",
    "taskBtn": "Internet Explorer",
    "icon": "e",
    "aria": "Internet Explorer 6",
    "locLabel": "Address",
    "bookmarksTitle": "Favorites",
    "mailPh": "friend@aol.com",
    "hasTaskbar": true,
    "maximized": true
  },
'''
    t = t.replace('\n        "2004": {', "\n" + blob + '        "2004": {', 1)
    p.write_text(t, encoding="utf-8")


def insert_flow_trails() -> None:
    p = ROOT / "js/config/flow-trails.js"
    t = p.read_text(encoding="utf-8")
    if '"2001":' in t:
        return
    blob = """    "2001": [
      {"n": 1, "name": "Wikipedia", "href": "sites/wikipedia/edit.html", "match": "/wikipedia/", "whenKey": "itt01-wiki", "nextHref": "sites/archive/index.html", "nextLabel": "Wayback"},
      {"n": 2, "name": "Wayback", "href": "sites/archive/index.html", "match": "/archive/", "whenKey": "itt01-wayback", "nextHref": "sites/itunes/index.html", "nextLabel": "iTunes"},
      {"n": 3, "name": "iTunes library", "href": "sites/itunes/index.html", "match": "/itunes/", "whenKey": "itt01-itunes", "nextHref": "sites/apple/ipod.html", "nextLabel": "iPod"},
      {"n": 4, "name": "iPod", "href": "sites/apple/ipod.html", "match": "/apple/", "whenKey": "itt01-ipod", "nextHref": "sites/napster/index.html", "nextLabel": "Napster"},
      {"n": 5, "name": "Napster leftover", "href": "sites/napster/index.html", "match": "/napster/", "whenKey": "itt01-napster", "nextHref": "sites/movabletype/index.html", "nextLabel": "Movable Type"},
      {"n": 6, "name": "Movable Type", "href": "sites/movabletype/index.html", "match": "/movabletype/", "whenKey": "itt01-mt", "nextHref": "sites/google/index.html", "nextLabel": "Google"},
      {"n": 7, "name": "Google leftover", "href": "sites/google/index.html", "match": "/google/", "whenKey": "itt01-google", "nextHref": "sites/yahoo/index.html", "nextLabel": "Yahoo"},
      {"n": 8, "name": "Yahoo leftover", "href": "sites/yahoo/index.html", "match": "/yahoo/", "whenKey": "itt01-yahoo", "nextHref": "sites/amazon/index.html", "nextLabel": "Amazon"},
      {"n": 9, "name": "Amazon smile leftover", "href": "sites/amazon/index.html", "match": "/amazon/", "whenKey": "itt01-amz", "nextHref": "sites/playable/game.html", "nextLabel": "Clickscape"},
      {"n": 10, "name": "Clickscape", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt01-game-clickscape", "nextHref": "sites/wikipedia/edit.html", "nextLabel": "Wikipedia"}
    ],
    "2002": [
      {"n": 1, "name": "StumbleUpon", "href": "sites/stumbleupon/index.html", "match": "/stumbleupon/", "whenKey": "itt02-stumble", "nextHref": "sites/isp/index.html", "nextLabel": "Always-on"},
      {"n": 2, "name": "Always-on", "href": "sites/isp/index.html", "match": "/isp/", "whenKey": "itt02-broadband", "nextHref": "sites/kazaa/index.html", "nextLabel": "KaZaA"},
      {"n": 3, "name": "KaZaA", "href": "sites/kazaa/index.html", "match": "/kazaa/", "whenKey": "itt02-kazaa", "nextHref": "sites/wired/index.html", "nextLabel": "Wired"},
      {"n": 4, "name": "Wired CSS", "href": "sites/wired/index.html", "match": "/wired/", "whenKey": "itt02-wired", "nextHref": "sites/phoenix/index.html", "nextLabel": "Phoenix"},
      {"n": 5, "name": "Phoenix", "href": "sites/phoenix/index.html", "match": "/phoenix/", "whenKey": "itt02-phoenix", "nextHref": "sites/mozilla/index.html", "nextLabel": "Mozilla"},
      {"n": 6, "name": "Mozilla 1.0", "href": "sites/mozilla/index.html", "match": "/mozilla/", "whenKey": "itt02-mozilla", "nextHref": "sites/ipod/index.html", "nextLabel": "iPod gen 2"},
      {"n": 7, "name": "iPod gen 2", "href": "sites/ipod/index.html", "match": "/ipod/", "whenKey": "itt02-ipod2", "nextHref": "sites/friendster/index.html", "nextLabel": "Friendster"},
      {"n": 8, "name": "Friendster seed", "href": "sites/friendster/index.html", "match": "/friendster/", "whenKey": "itt02-fs", "nextHref": "sites/movabletype/trackback.html", "nextLabel": "TrackBack"},
      {"n": 9, "name": "TrackBack", "href": "sites/movabletype/trackback.html", "match": "/movabletype/", "whenKey": "itt02-trackback", "nextHref": "sites/playable/game.html", "nextLabel": "Room Sticky"},
      {"n": 10, "name": "Room Sticky", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt02-game-roomsticky", "nextHref": "sites/stumbleupon/index.html", "nextLabel": "Stumble"}
    ],
"""
    t = t.replace('                "2004": [', blob + '                "2004": [', 1)
    p.write_text(t, encoding="utf-8")


def insert_registry() -> None:
    p = ROOT / "js/immersion/registry.js"
    t = p.read_text(encoding="utf-8")
    if '"2001":' in t:
        return
    blob = """    "2001": [
      "immersion/wikipedia.js",
      "immersion/napster.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/amazon.js",
      "immersion/blogger.js",
      "immersion/one-thing-machines.js"
    ],
    "2002": [
      "immersion/stumbleupon.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/amazon.js",
      "immersion/one-thing-machines.js"
    ],
"""
    # insert before 2004 extra
    t = t.replace('    "2004": [', blob + '    "2004": [', 1)
    p.write_text(t, encoding="utf-8")


def insert_year_playable() -> None:
    p = ROOT / "js/config/year-playable.js"
    t = p.read_text(encoding="utf-8")
    if '"2001":' in t:
        return
    blob = """    "2001": {
      id: "clickscape",
      title: "Clickscape",
      href: "game.html",
      key: "itt01-game-clickscape",
      inspire: "UseMod wiki click-farm leftover",
      blurb: "Click live links. Avoid dead ones. Incomplete never writes.",
      why: "2001 games were still mines and Flash seeds. The year verb is Wikipedia.",
      era: "XP ships. IE6 freezes the web. The cabinet is leftover.",
      famous: "Desk Mines + Table Tennis",
      accent: "#003399"
    },
    "2002": {
      id: "roomsticky",
      title: "Room Sticky",
      href: "game.html",
      key: "itt02-game-roomsticky",
      inspire: "Friendster / blog sidebar leftover",
      blurb: "Stick notes on the wall. Empty never writes.",
      why: "2002 social seed. Star stays Stumble.",
      era: "Always-on minority. KaZaA chaos.",
      famous: "Brick Bat + Desk Mines",
      accent: "#336699"
    },
"""
    t = t.replace('                "2004": {', blob + '                "2004": {', 1)
    p.write_text(t, encoding="utf-8")


def insert_popular() -> None:
    p = ROOT / "scripts/popular-3x-sites.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    if "2001" not in data:
        data["2001"] = [
            {"id": "google", "name": "Google", "title": "Google — 2001", "why": "Sparse habit. Not the wiki star.", "verb": "Type a query.", "ph": "nupedia", "btn": "Search", "bg": "#fff", "fg": "#111"},
            {"id": "yahoo", "name": "Yahoo", "title": "Yahoo — 2001", "why": "Still mass portal visits.", "verb": "Browse a category.", "ph": "News", "btn": "Go", "bg": "#7b0099", "fg": "#fff"},
            {"id": "cnn", "name": "CNN", "title": "CNN — 2001", "why": "Post-9/11 news costume.", "verb": "Open a headline.", "ph": "Afghanistan", "btn": "Read", "bg": "#cc0000", "fg": "#fff"},
        ]
    if "2002" not in data:
        data["2002"] = [
            {"id": "daypop", "name": "Daypop", "title": "Daypop — 2002", "why": "Blog hottest leftover.", "verb": "Name a link.", "ph": "trackback", "btn": "Hot", "bg": "#003366", "fg": "#fff"},
            {"id": "googlenews", "name": "Google News", "title": "Google News — 2002", "why": "Sep 2002 beta. No blogs.", "verb": "Type a topic.", "ph": "broadband", "btn": "Cluster", "bg": "#1a73e8", "fg": "#fff"},
            {"id": "technorati", "name": "Technorati", "title": "Technorati seed — 2002", "why": "Cosmos leftover.", "verb": "Name a blog.", "ph": "plasticbag", "btn": "Cosmos", "bg": "#111", "fg": "#fff"},
        ]
    p.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def append_2x_matrix(year: str, rows_spec: list[tuple[str, str, str]]) -> None:
    p = ROOT / "e2e/2x-links.matrix.json"
    rows = json.loads(p.read_text(encoding="utf-8"))
    have = {(r.get("year"), r.get("key")) for r in rows}
    for path, key, kind in rows_spec:
        if (year, key) in have:
            continue
        rows.append({
            "year": year,
            "path": path,
            "key": key,
            "kind": kind,
            "title": key,
            "next": "pages/home.html",
            "nextLabel": "Starting Point",
        })
    p.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")


def build_2001() -> list[str]:
    y = "2001"
    root = ROOT / "years" / y
    write(root / "index.html", year_index(y))
    write(root / "pages/home.html", year_home(y))
    write(
        root / "pages/about.html",
        pages_shell(
            y,
            "About the Web in 2001",
            """<h1>About 2001</h1>
<p>Internet Live Stats June <b>29,254,370</b> websites (+71%) · <b>500,609,240</b> users · Wikipedia is the Live Stats birthmark. Do not blend a Netcraft monthly hostname cell into June.</p>
<p>Anyone can edit. Preview is not Save. iTunes is a library. The Store is 2003.</p>
<label><input type="checkbox" data-req data-thesis-req> Wikipedia launches 15 Jan 2001</label>
<label><input type="checkbox" data-req data-thesis-req> iTunes Store is not this year</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<p><a href="home.html">← Starting Point</a></p>""",
        ),
    )
    write(
        root / "pages/map.html",
        pages_shell(
            y,
            "2001 — UX flow map",
            """<h1>2001 flow map</h1>
<ul>
<li><a href="../sites/wikipedia/edit.html">★ Wikipedia edit</a></li>
<li><a href="../sites/archive/index.html">Wayback</a></li>
<li><a href="../sites/itunes/index.html">iTunes library</a></li>
<li><a href="../sites/apple/ipod.html">iPod</a></li>
<li><a href="../sites/napster/index.html">Napster leftover</a></li>
</ul>
<p><a href="home.html">← Starting Point</a></p>""",
        ),
    )
    write(
        root / "pages/whats-new.html",
        pages_shell(
            y,
            "What's New — 2001",
            """<h1>What's New in 2001</h1>
<table border="1" cellpadding="6"><tr><th>When</th><th>What</th></tr>
<tr><td>15 Jan</td><td>Wikipedia</td></tr>
<tr><td>9 Jan</td><td>iTunes 1.0 library</td></tr>
<tr><td>23 Oct</td><td>iPod 1,000 songs</td></tr>
<tr><td>24 Oct</td><td>Wayback public</td></tr>
</table>
<p><a href="home.html">← Starting Point</a></p>""",
        ),
    )
    write(
        root / "pages/error/404.html",
        pages_shell(y, "Not Found", '<h1>Not Found</h1><p><a href="../home.html">Starting Point</a></p>').replace(
            "../../../css", "../../../../css"
        ).replace("../../../js", "../../../../js"),
    )
    write(
        root / "pages/error/unreachable.html",
        pages_shell(y, "Unreachable", '<h1>Unreachable</h1><p><a href="../home.html">Starting Point</a></p>').replace(
            "../../../css", "../../../../css"
        ).replace("../../../js", "../../../../js"),
    )

    wiki_nav = (
        '<p><a href="index.html">HomePage</a> · <a href="history.html">Recent changes</a> · '
        '<a href="edit.html">edit this page right now</a> · <a href="help.html">Help</a> · '
        '<a href="community.html">community</a> · <a href="languages.html">languages</a></p>'
    )
    write(
        root / "sites/wikipedia/index.html",
        site_page(
            y,
            "Wikipedia: HomePage",
            f"""{wiki_nav}
<h1>Wikipedia</h1>
<p>A free encyclopedia that anyone can edit.</p>
<p><i>You</i> can <a href="edit.html">edit this page right now!</a> It's a free, community project.</p>
<p><a href="article-wiki.html">Wiki</a> · <a href="article-nupedia.html">Nupedia</a></p>""",
            "itt01-wiki",
        ),
    )
    write(
        root / "sites/wikipedia/edit.html",
        site_page(
            y,
            "Edit HomePage — Wikipedia",
            f"""{wiki_nav}
<h1>Edit this page</h1>
<p>Preview is not Save. Empty never writes.</p>
<p><textarea data-wiki-body rows="8" cols="60" placeholder="This is the new WikiPedia!"></textarea></p>
<p>
 <button type="button" data-wiki-preview>Preview</button>
 <button type="button" data-wiki-save>Save</button>
</p>
<div data-wiki-preview-out></div>
<p data-wiki-status></p>
<p hidden data-next-flow data-next-when-key="itt01-wiki"><b>Next:</b> <a href="../archive/index.html">Wayback leftover</a></p>""",
            "itt01-wiki",
        ),
    )
    write(root / "sites/wikipedia/history.html", site_page(y, "Recent changes", f"{wiki_nav}<h1>Recent changes</h1><p data-wiki-history>No local revisions yet. Save an edit first.</p>"))
    write(root / "sites/wikipedia/help.html", site_page(y, "Wikipedia FAQ", f"{wiki_nav}<h1>Help</h1><p>UseMod wiki. Anyone can edit. GNU Free Documentation License.</p>"))
    write(root / "sites/wikipedia/community.html", site_page(y, "Wikipedians", f"{wiki_nav}<h1>Community</h1><p>Welcome, newcomers. Nupedia is the more rigorous sister project.</p>"))
    write(root / "sites/wikipedia/languages.html", site_page(y, "International Wikipedias", f"{wiki_nav}<h1>Languages</h1><p>Catalan · Chinese · German · Esperanto · French · Hebrew · Italian · Japanese · Portuguese · Russian · Spanish · Swedish</p>"))
    write(root / "sites/wikipedia/article-wiki.html", site_page(y, "Wiki", f"{wiki_nav}<h1>Wiki</h1><p>A wiki is a website anyone can edit. Ward Cunningham's WikiWikiWeb inspired this project.</p>"))
    write(root / "sites/wikipedia/article-nupedia.html", site_page(y, "Nupedia", f"{wiki_nav}<h1>Nupedia</h1><p>Expert-reviewed feeder. Slow. Wikipedia is the open wiki.</p>"))

    write(
        root / "sites/apple/ipod.html",
        site_page(
            y,
            "iPod — 1,000 songs in your pocket",
            """<p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] No official Apple art</p>
<h1>iPod</h1>
<p>1,000 songs in your pocket. 5 GB. $399. Mac. FireWire. Ships 10 Nov 2001. Requires iTunes 2.</p>
<p><a href="ipod/specs.html">Specs</a> · <a href="ipod/howto.html">How to</a> · <a href="ipod/faq.html">FAQ</a></p>
<label><input type="checkbox" data-req> Mac-only this year</label>
<label><input type="checkbox" data-req> The Store is 2003 — it never writes</label>
<p><button type="button" data-itt-real-save data-storage-key="ipod" data-min-req="2" data-requires="[data-req]">Save iPod leftover</button>
<button type="button" data-itt-trap>Open iTunes Music Store</button>
<span data-itt-action-status></span></p>
<p hidden data-next-flow data-next-when-key="itt01-ipod"><b>Next:</b> <a href="../napster/index.html">Napster leftover</a></p>""",
        ),
    )
    write(root / "sites/apple/ipod/specs.html", site_page(y, "iPod specs", "<h1>Specs</h1><p>5 GB hard drive. 6.5 oz. FireWire. 10 hours. Scroll-wheel.</p><p><a href=\"../ipod.html\">← iPod</a></p>"))
    write(root / "sites/apple/ipod/howto.html", site_page(y, "iPod howto", "<h1>How to</h1><p>Plug into a Mac. Auto-Sync iTunes. Unplug and go. Windows is next year.</p><p><a href=\"../ipod.html\">← iPod</a></p>"))
    write(root / "sites/apple/ipod/faq.html", site_page(y, "iPod FAQ", "<h1>FAQ</h1><p>No Music Store. No Windows. $399.</p><p><a href=\"../ipod.html\">← iPod</a></p>"))

    dests = {
        "archive": leftover(y, "Wayback Machine", "Public 24 Oct 2001. Broken images honesty. Time travel for URLs.", "wayback", "http://whitehouse.gov", "../itunes/index.html", "iTunes"),
        "itunes": leftover(y, "iTunes 1.0", "Rip mix burn. Mac library. Store never writes.", "itunes", "playlist name", "../apple/ipod.html", "iPod"),
        "napster": leftover(y, "Napster leftover", "Network down July 2001. Theater only. No real files.", "napster", "song title", "../movabletype/index.html", "Movable Type"),
        "movabletype": leftover(y, "Movable Type", "8 Oct 2001. Multi-blog. Static HTML. RSS out of box.", "mt", "blog name", "../blogdex/index.html", "Blogdex"),
        "blogdex": leftover(y, "Blogdex", "MIT Jul 2001. Most-linked weblog URLs.", "blogdex", "hottest url", "../blogger/index.html", "Blogger"),
        "blogger": leftover(y, "Blogger leftover", "Still Pyra. One-click publish.", "blogger", "post title", "../google/index.html", "Google"),
        "google": leftover(y, "Google leftover", "Sparse habit. Not the portal default.", "google", "wikipedia", "../yahoo/index.html", "Yahoo"),
        "yahoo": leftover(y, "Yahoo leftover", "Mass visits still.", "yahoo", "News", "../amazon/index.html", "Amazon"),
        "amazon": leftover(y, "Amazon smile leftover", "2000 smile continuity. Cart leftover.", "amz", "book title", "../cnn/index.html", "CNN"),
        "cnn": leftover(y, "CNN leftover", "Nov 2001 news costume.", "cnn", "headline", "../mozilla/index.html", "Mozilla"),
        "mozilla": leftover(y, "Mozilla 0.9.4 leftover", "Bloated suite. Firefox is 2004.", "moz", "suite note", "../encarta/index.html", "Encarta"),
        "encarta": leftover(y, "Encarta leftover", "CD encyclopedia vs the wiki.", "encarta", "article", "../../pages/home.html", "Starting Point"),
    }
    for slug, html in dests.items():
        write(root / "sites" / slug / "index.html", html)

    # playable
    write(root / "sites/playable/game.html", playable_game(y, "clickscape", "Clickscape", "itt01-game-clickscape", "UseMod click leftover"))
    write(
        root / "sites/playable/index.html",
        site_page(y, "2001 playable", "<h1>2001 cabinet</h1><p><a href=\"game.html\">Clickscape</a> · <a href=\"famous.html\">Famous</a></p><div data-year-playable data-year=\"2001\"></div>"),
    )
    write(root / "sites/playable/famous.html", leftover(y, "Famous leftover", "Desk mines class leftover.", "famous", "game", "index.html", "Cabinet"))
    write(root / "sites/playable/extra-a.html", leftover(y, "Extra A", "Leftover cabinet.", "extra-a", "note", "index.html", "Cabinet"))
    write(root / "sites/playable/extra-b.html", leftover(y, "Extra B", "Leftover cabinet.", "extra-b", "note", "index.html", "Cabinet"))
    write(root / "sites/playable/more-a.html", leftover(y, "More A", "Leftover cabinet.", "more-a", "note", "index.html", "Cabinet"))
    write(root / "sites/playable/more-b.html", leftover(y, "More B", "Leftover cabinet.", "more-b", "note", "index.html", "Cabinet"))

    rooms = []
    for pth in sorted(root.rglob("*.html")):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel != "index.html":
            rooms.append(rel)
    write(ROOT / "js/config/2001.js", config_js(y, rooms, "http://home.microsoft.com/intl/web2001/", "6.0", "#3a6ea5"))
    write(
        ROOT / "js/config/immersion-2001.js",
        immersion_config(
            y,
            "itt01",
            "2001 · XP · IE6 · Wikipedia",
            [
                ("Wikipedia", "sites/wikipedia/index.html", "/wikipedia/"),
                ("iPod", "sites/apple/ipod.html", "/apple/"),
                ("Wayback", "sites/archive/index.html", "/archive/"),
            ],
        ),
    )
    write(ROOT / "js/browser-2001.js", stub_js(y, "browser"))
    write(ROOT / "js/immersion-2001.js", stub_js(y, "immersion"))
    return rooms


def build_2002() -> list[str]:
    y = "2002"
    root = ROOT / "years" / y
    write(root / "index.html", year_index(y))
    write(root / "pages/home.html", year_home(y))
    write(
        root / "pages/about.html",
        pages_shell(
            y,
            "About the Web in 2002",
            """<h1>About 2002</h1>
<p>Internet Live Stats June <b>38,760,373</b> websites (+32%) · <b>662,663,600</b> users. Pew May: <b>21%</b> of US internet users on home broadband (24 million adults) — always-on, still a minority.</p>
<p>Stumble is the save. Friendster is a seed. The Store is 2003. MySpace is 2003.</p>
<label><input type="checkbox" data-req data-thesis-req> Stumble prototype is 2002</label>
<label><input type="checkbox" data-req data-thesis-req> iTunes Store is not this year</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<p><a href="home.html">← Starting Point</a></p>""",
        ),
    )
    write(
        root / "pages/map.html",
        pages_shell(
            y,
            "2002 — UX flow map",
            """<h1>2002 flow map</h1>
<ul>
<li><a href="../sites/stumbleupon/index.html">★ Stumble</a></li>
<li><a href="../sites/isp/index.html">Always-on</a></li>
<li><a href="../sites/kazaa/index.html">KaZaA</a></li>
<li><a href="../sites/wired/index.html">Wired CSS</a></li>
<li><a href="../sites/friendster/index.html">Friendster seed</a></li>
</ul>
<p><a href="home.html">← Starting Point</a></p>""",
        ),
    )
    write(
        root / "pages/whats-new.html",
        pages_shell(
            y,
            "What's New — 2002",
            """<h1>What's New in 2002</h1>
<table border="1" cellpadding="6"><tr><th>When</th><th>What</th></tr>
<tr><td>Feb</td><td>Stumble prototype</td></tr>
<tr><td>23 Jun</td><td>Pew Broadband Difference</td></tr>
<tr><td>5 Jun</td><td>Mozilla 1.0</td></tr>
<tr><td>23 Sep</td><td>Phoenix 0.1</td></tr>
<tr><td>Oct</td><td>Wired CSS redesign</td></tr>
</table>
<p><a href="home.html">← Starting Point</a></p>""",
        ),
    )
    write(
        root / "pages/error/404.html",
        pages_shell(y, "Not Found", '<h1>Not Found</h1><p><a href="../home.html">Starting Point</a></p>').replace(
            "../../../css", "../../../../css"
        ).replace("../../../js", "../../../../js"),
    )
    write(
        root / "pages/error/unreachable.html",
        pages_shell(y, "Unreachable", '<h1>Unreachable</h1><p><a href="../home.html">Starting Point</a></p>').replace(
            "../../../css", "../../../../css"
        ).replace("../../../js", "../../../../js"),
    )

    write(
        root / "sites/stumbleupon/index.html",
        site_page(
            y,
            "StumbleUpon — 2002",
            """<p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] No official toolbar art</p>
<h1>StumbleUpon</h1>
<p>Click a button, find something cool. Prototype Feb 2002. Name 5 Nov 2001. Empty topic never writes.</p>
<p>
 Topic
 <select data-su-topic>
  <option value="">(pick a topic)</option>
  <option value="art">art</option>
  <option value="music">music</option>
  <option value="science">science</option>
  <option value="blogs">blogs</option>
 </select>
</p>
<p>
 <button type="button" data-su-stumble>Stumble</button>
 <button type="button" data-su-up>Thumb up</button>
 <button type="button" data-su-down>Thumb down</button>
</p>
<div data-su-page style="min-height:4em;border:1px solid #999;padding:8px;margin:8px 0">Pick a topic, then Stumble.</div>
<p data-su-status></p>
<p hidden data-next-flow data-next-when-key="itt02-stumble"><b>Next:</b> <a href="../isp/index.html">Always-on leftover</a></p>""",
            "itt02-stumble",
        ),
    )

    write(
        root / "sites/friendster/index.html",
        site_page(
            y,
            "Friendster seed — 2002",
            """<div data-friendster-root>
<p>Founded 2002. Mass public is often dated March 2003. Seed leftover — not the chip.</p>
<p><b data-friendster-name></b> · <span data-friendster-location></span></p>
<p data-friendster-about></p>
<form data-friendster-profile-form>
<p><input name="name" placeholder="display name" maxlength="40">
<input name="location" placeholder="city" maxlength="40"></p>
<p><input name="about" placeholder="about" maxlength="80"></p>
<p><button type="submit">Save profile</button></p>
</form>
<form data-friendster-add-form>
<p><input name="fname" placeholder="friend name"> <input name="fabout" placeholder="testimonial"></p>
<p><button type="submit">Post leftover testimonial</button></p>
</form>
<p data-friendster-status></p>
<ul data-friendster-friends></ul>
<p><a href="testimonials.html">Testimonials leftover</a></p>
</div>""",
        ),
    )
    write(
        root / "sites/friendster/testimonials.html",
        site_page(y, "Friendster testimonials", '<div data-friendster-root><h1>Testimonials</h1><ul data-friendster-friends></ul><p><a href="index.html">← Friendster</a></p></div>'),
    )

    write(
        root / "sites/kazaa/index.html",
        site_page(
            y,
            "KaZaA leftover — 2002",
            """<p>~100 million downloads by August. FastTrack chaos. Theater only.</p>
<form data-kazaa-search>
<p><input name="q" data-kazaa-q placeholder="song title"> <button type="submit">Search FastTrack</button></p>
</form>
<div data-kazaa-progress><div data-kazaa-bar></div></div>
<div data-kazaa-results></div>
<div data-kazaa-history></div>
<p data-kazaa-status></p>
<p><a href="client.html">Client leftover</a></p>""",
        ),
    )
    write(
        root / "sites/kazaa/client.html",
        site_page(y, "KaZaA client", '<h1>Client leftover</h1><p>Spyware accusations both ways. KaZaA Lite is a warning, not a dest forest.</p><p><a href="index.html">← KaZaA</a></p>'),
    )

    write(
        root / "sites/wired/index.html",
        site_page(
            y,
            "Wired News — CSS 2002",
            """<div class="wn-wrap">
<h1>Wired News</h1>
<p>October 2002. Entirely CSS presentation. StopDesign / Bowman. A tremendous win for Web standards.</p>
<label><input type="checkbox" data-req> All-CSS layout</label>
<label><input type="checkbox" data-req> Not a table-only portal</label>
<p><button type="button" data-itt-real-save data-storage-key="wired" data-min-req="2" data-requires="[data-req]">Save Wired leftover</button>
<span data-itt-action-status></span></p>
</div>""",
        ),
    )

    write(
        root / "sites/movabletype/trackback.html",
        leftover(y, "TrackBack", "Movable Type 2.x. Ping a permalink. RSS wars leftover.", "trackback", "permalink", "../daypop/index.html", "Daypop"),
    )
    write(root / "sites/movabletype/index.html", leftover(y, "Movable Type 2.x", "Templates, categories, comments, TrackBack.", "mt", "blog", "trackback.html", "TrackBack"))

    dests = {
        "isp": leftover(y, "Always-on leftover", "Pew May 2002: 21% of US internet users. Still a minority appliance.", "broadband", "cable or dsl", "../kazaa/index.html", "KaZaA"),
        "phoenix": leftover(y, "Phoenix 0.1", "23 Sep 2002. Standalone Gecko. Not the Firefox wordmark.", "phoenix", "0.1 note", "../mozilla/index.html", "Mozilla"),
        "mozilla": leftover(y, "Mozilla 1.0", "5 Jun 2002. Suite: browser + mail + chat. Bloated on purpose.", "mozilla", "suite", "../ipod/index.html", "iPod gen 2"),
        "ipod": leftover(y, "iPod gen 2 leftover", "Aug 2002. Touch wheel. MusicMatch Windows path. Store never writes.", "ipod2", "20GB", "../friendster/index.html", "Friendster"),
        "daypop": leftover(y, "Daypop leftover", "Hottest weblog links.", "daypop", "url", "../technorati/index.html", "Technorati"),
        "technorati": leftover(y, "Technorati leftover", "Cosmos seed.", "technorati", "blog", "../googlenews/index.html", "Google News"),
        "googlenews": leftover(y, "Google News leftover", "Sep 2002 beta. Clusters. No blogs in the index.", "gnews", "topic", "../mtv/index.html", "MTV"),
        "mtv": leftover(y, "MTV leftover", "Tables + plugins. Real/WMP streams. Shockwave microsites.", "mtv", "show", "../lastfm/index.html", "last.fm"),
        "lastfm": leftover(y, "last.fm / Audioscrobbler seed", "Social music seed. Not the later social product.", "scrobble", "artist", "../google/index.html", "Google"),
        "google": leftover(y, "Google leftover", "Sparse + News-New!", "google", "query", "../yahoo/index.html", "Yahoo"),
        "yahoo": leftover(y, "Yahoo leftover", "Mass portal.", "yahoo", "dir", "../wikipedia/index.html", "Wikipedia"),
        "wikipedia": leftover(y, "Wikipedia leftover", "Continuity from 2001. Not this year's chip.", "wiki-lx", "article", "../amazon/index.html", "Amazon"),
        "amazon": leftover(y, "Amazon smile leftover", "2000 continuity cart.", "amz", "book", "../../pages/home.html", "Starting Point"),
    }
    for slug, html in dests.items():
        write(root / "sites" / slug / "index.html", html)

    write(root / "sites/playable/game.html", playable_game(y, "roomsticky", "Room Sticky", "itt02-game-roomsticky", "Friendster wall leftover"))
    write(
        root / "sites/playable/index.html",
        site_page(y, "2002 playable", "<h1>2002 cabinet</h1><p><a href=\"game.html\">Room Sticky</a> · <a href=\"famous.html\">Famous</a></p><div data-year-playable data-year=\"2002\"></div>"),
    )
    write(root / "sites/playable/famous.html", leftover(y, "Famous leftover", "Cabinet leftover.", "famous", "game", "index.html", "Cabinet"))
    write(root / "sites/playable/extra-a.html", leftover(y, "Extra A", "Leftover.", "extra-a", "note", "index.html", "Cabinet"))
    write(root / "sites/playable/extra-b.html", leftover(y, "Extra B", "Leftover.", "extra-b", "note", "index.html", "Cabinet"))
    write(root / "sites/playable/more-a.html", leftover(y, "More A", "Leftover.", "more-a", "note", "index.html", "Cabinet"))
    write(root / "sites/playable/more-b.html", leftover(y, "More B", "Leftover.", "more-b", "note", "index.html", "Cabinet"))

    rooms = []
    for pth in sorted(root.rglob("*.html")):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel != "index.html":
            rooms.append(rel)
    write(ROOT / "js/config/2002.js", config_js(y, rooms, "http://home.microsoft.com/intl/web2002/", "6.0", "#3a6ea5"))
    write(
        ROOT / "js/config/immersion-2002.js",
        immersion_config(
            y,
            "itt02",
            "2002 · XP · IE6 · Stumble",
            [
                ("Stumble", "sites/stumbleupon/index.html", "/stumbleupon/"),
                ("KaZaA", "sites/kazaa/index.html", "/kazaa/"),
                ("Friendster", "sites/friendster/index.html", "/friendster/"),
            ],
        ),
    )
    write(ROOT / "js/browser-2002.js", stub_js(y, "browser"))
    write(ROOT / "js/immersion-2002.js", stub_js(y, "immersion"))
    return rooms


def write_star_js() -> None:
    write(
        ROOT / "js/immersion/wikipedia.js",
        r"""/**
 * 2001 Wikipedia UseMod — preview is not Save.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function boot(doc) {
    doc = doc || document;
    var body = doc.querySelector("[data-wiki-body]");
    var prev = doc.querySelector("[data-wiki-preview]");
    var save = doc.querySelector("[data-wiki-save]");
    var out = doc.querySelector("[data-wiki-preview-out]");
    var st = doc.querySelector("[data-wiki-status]");
    var hist = doc.querySelector("[data-wiki-history]");
    if (hist) {
      try {
        var raw = localStorage.getItem("itt01-wiki");
        if (raw) hist.textContent = "Local revision saved in this browser.";
      } catch (eH) { /* */ }
    }
    if (!body || !save) return;
    if (prev) {
      prev.addEventListener("click", function () {
        var t = String(body.value || "").replace(/^\s+|\s+$/g, "");
        if (out) out.innerHTML = t ? "<p><b>Preview</b> (not saved)</p><pre>" + t.replace(/</g, "&lt;") + "</pre>" : "<p>Nothing to preview.</p>";
        if (st) st.textContent = "Preview is not Save. Nothing written.";
      });
    }
    save.addEventListener("click", function () {
      var t = String(body.value || "").replace(/^\s+|\s+$/g, "");
      if (t.length < 2) {
        if (st) st.textContent = "Empty never writes.";
        return;
      }
      try {
        localStorage.setItem("itt01-wiki", JSON.stringify({ multiStep: true, real: true, year: "2001", ts: Date.now(), body: t.slice(0, 200) }));
      } catch (eS) { /* */ }
      if (st) st.textContent = "Saved in this browser.";
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "wikipedia", boot: boot });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "js/immersion/stumbleupon.js",
        r"""/**
 * 2002 StumbleUpon — empty topic never writes.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var PAGES = {
    art: "A 2002 art page leftover. Not a live crawl.",
    music: "A 2002 music blog leftover. KaZaA is a different room.",
    science: "A 2002 science note leftover.",
    blogs: "A 2002 weblog leftover. TrackBack lives next door."
  };
  function boot(doc) {
    doc = doc || document;
    var topic = doc.querySelector("[data-su-topic]");
    var go = doc.querySelector("[data-su-stumble]");
    var up = doc.querySelector("[data-su-up]");
    var page = doc.querySelector("[data-su-page]");
    var st = doc.querySelector("[data-su-status]");
    if (!go || !topic) return;
    var last = "";
    go.addEventListener("click", function () {
      var t = topic.value || "";
      if (!t) {
        if (st) st.textContent = "Pick a topic first. Empty never writes.";
        return;
      }
      last = t;
      if (page) page.textContent = PAGES[t] || t;
      if (st) st.textContent = "Stumbled · " + t + ". Thumb up to save.";
    });
    if (up) {
      up.addEventListener("click", function () {
        if (!last) {
          if (st) st.textContent = "Stumble first. Empty never writes.";
          return;
        }
        try {
          localStorage.setItem("itt02-stumble", JSON.stringify({ multiStep: true, real: true, year: "2002", ts: Date.now(), topic: last }));
        } catch (eS) { /* */ }
        if (st) st.textContent = "Saved in this browser.";
        try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "stumbleupon", boot: boot });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
""",
    )


def stamp_read_first() -> None:
    write(
        ROOT / "docs/2001-READ-FIRST.md",
        """# 2001 — READ FIRST (**LEAN DOOR LIVE**)

**Date:** 2026-08-30
**Status:** **Lean door on disk.** Prefix `itt01`. Star = Wikipedia edit · preview is not Save.

Do **not** `git checkout` the old forest.

| | |
|--|--|
| Prefix | `itt01-*` |
| Star | Wikipedia UseMod · `itt01-wiki` |
| Shell | XP + IE 6 |
| Cap | HTML ≤90 |

**Harvest:** [`2001-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-30.md`](2001-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-30.md)
""",
    )
    write(
        ROOT / "docs/2002-READ-FIRST.md",
        """# 2002 — READ FIRST (**LEAN DOOR LIVE**)

**Date:** 2026-08-30
**Status:** **Lean door on disk.** Prefix `itt02`. Star = StumbleUpon Stumble.

Do **not** `git checkout` the old forest.

| | |
|--|--|
| Prefix | `itt02-*` |
| Star | StumbleUpon · `itt02-stumble` |
| Shell | XP + IE 6 |
| Cap | HTML ≤90 |

**Harvest:** [`2002-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-30.md`](2002-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-30.md)
""",
    )


def main() -> None:
    write_star_js()
    r1 = build_2001()
    r2 = build_2002()
    patch_shared()
    insert_start_data()
    insert_start_extra()
    insert_years_js()
    insert_flow_trails()
    insert_registry()
    insert_year_playable()
    insert_popular()
    stamp_read_first()
    append_2x_matrix(
        "2001",
        [
            ("sites/archive/index.html", "itt01-wayback", "query"),
            ("sites/itunes/index.html", "itt01-itunes", "query"),
            ("sites/apple/ipod.html", "itt01-ipod", "checks"),
            ("sites/napster/index.html", "itt01-napster", "query"),
            ("sites/movabletype/index.html", "itt01-mt", "query"),
            ("sites/blogdex/index.html", "itt01-blogdex", "query"),
            ("sites/blogger/index.html", "itt01-blogger", "query"),
            ("sites/google/index.html", "itt01-google", "query"),
            ("sites/yahoo/index.html", "itt01-yahoo", "query"),
            ("sites/amazon/index.html", "itt01-amz", "query"),
            ("sites/cnn/index.html", "itt01-cnn", "query"),
            ("sites/mozilla/index.html", "itt01-moz", "query"),
            ("sites/encarta/index.html", "itt01-encarta", "query"),
        ],
    )
    append_2x_matrix(
        "2002",
        [
            ("sites/isp/index.html", "itt02-broadband", "query"),
            ("sites/kazaa/index.html", "itt02-kazaa", "query"),
            ("sites/wired/index.html", "itt02-wired", "checks"),
            ("sites/phoenix/index.html", "itt02-phoenix", "query"),
            ("sites/mozilla/index.html", "itt02-mozilla", "query"),
            ("sites/ipod/index.html", "itt02-ipod2", "query"),
            ("sites/friendster/index.html", "itt02-fs", "query"),
            ("sites/movabletype/trackback.html", "itt02-trackback", "query"),
            ("sites/daypop/index.html", "itt02-daypop", "query"),
            ("sites/technorati/index.html", "itt02-technorati", "query"),
            ("sites/googlenews/index.html", "itt02-gnews", "query"),
        ],
    )
    print("2001 html", len(r1), "2002 html", len(r2))


if __name__ == "__main__":
    main()
