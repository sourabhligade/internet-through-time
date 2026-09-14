#!/usr/bin/env python3
"""Scaffold a new museum year. Does not invent dests, pixels, or leftover farms.

Usage:
  python3 scripts/new-year.py 1999
"""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def die(msg: str) -> None:
    print("new-year:", msg, file=sys.stderr)
    raise SystemExit(1)


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        print("exists", path.relative_to(ROOT))
        return
    path.write_text(text, encoding="utf-8")
    print("wrote ", path.relative_to(ROOT))


def main() -> None:
    if len(sys.argv) != 2 or not sys.argv[1].isdigit() or len(sys.argv[1]) != 4:
        die("usage: python3 scripts/new-year.py YYYY")
    year = sys.argv[1]
    ydir = ROOT / "years" / year
    if ydir.exists():
        die(f"years/{year}/ already exists — will not overwrite a live room")

    prefix = "itt" + year[2:]
    write(
        ydir / "index.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{year}</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/ui.js"></script>
<script>ITT.YearUI.paint("{year}");</script>
<script src="../../js/lib/util.js"></script>
<script src="../../js/browser-core.js"></script>
<script src="../../js/config/{year}.js"></script>
<script src="../../js/browser-{year}.js"></script>
</body>
</html>
""",
    )
    write(
        ydir / "pages" / "home.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}" data-itt-start="1">
<head>
<meta charset="utf-8">
<title>Starting Point — {year}</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
</head>
<body class="itt-start-page" data-itt-start="1">
<div id="itt-year-start"></div>
<script src="../../../ui/year/ui.js"></script>
<script>ITT.YearUI.paintStart("{year}");</script>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
""",
    )
    write(ydir / "pages" / "about.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head><meta charset="utf-8"><title>About {year}</title>
<link rel="stylesheet" href="../../../css/period-{year}.css"></head>
<body>
<p><a href="home.html">Starting Point</a></p>
<h1>About {year}</h1>
<p>Thesis · scale · hard bans. Fill from that year’s READ-FIRST.</p>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
""")
    write(ydir / "pages" / "map.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head><meta charset="utf-8"><title>{year} map</title>
<link rel="stylesheet" href="../../../css/period-{year}.css"></head>
<body>
<p><a href="home.html">Starting Point</a></p>
<h1>{year} flow map</h1>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
""")
    write(
        ROOT / "js" / f"browser-{year}.js",
        f"""/**
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
""",
    )
    write(
        ROOT / "js" / f"immersion-{year}.js",
        f"""/**
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
""",
    )
    write(
        ROOT / "js" / "config" / f"{year}.js",
        f"""/**
 * Year config — {year} (scaffold)
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};
  var rooms = [
    "index.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html"
  ];
  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://museum.local/years/{year}/home/",
    "pages/about.html": "http://museum.local/years/{year}/about.html",
    "pages/map.html": "http://museum.local/years/{year}/map/"
  }};
  ITT.configs["{year}"] = {{
    year: "{year}",
    rooms: rooms,
    home: "pages/home.html",
    start: "pages/home.html",
    storagePrefix: "{prefix}",
    prefsKey: "itt-{year}-prefs",
    bookmarksKey: "itt-{year}-bookmarks",
    connectedKey: "itt-{year}-connected",
    immersionScript: "js/immersion-{year}.js",
    urlMap: urlMap
  }};
}})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "js" / "config" / f"immersion-{year}.js",
        f"""/**
 * Immersion config — {year} (scaffold)
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.immersionConfigs = ITT.immersionConfigs || {{}};
  ITT.immersionConfigs["{year}"] = {{
    year: "{year}",
    storagePrefix: "{prefix}",
    features: {{}}
  }};
}})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "css" / f"period-{year}.css",
        f"""/* {year} document styles — add only this year’s deltas */
@import url("itt-leftover-fold.css");
""",
    )
    print()
    print("Next (not done by this script):")
    print("  1. Add FEATURES_BY_YEAR entry in js/immersion/registry.js")
    print("  2. Add YearUI.YEARS + START + START_EXTRA")
    print("  3. Unlock the hub card only when the year is playable")
    print("  4. Add SHIP_YEARS / DISK-TRUTH / e2e only when named")
    print("Do not dest-farm. Do not invent period pixels.")


if __name__ == "__main__":
    main()
