#!/usr/bin/env python3
"""Cut toy playables (g=1–15) and wire each year to its real game cabinet."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2005", "2006", "2007", "2009", "2011", "2013", "2014"}
YEARS = [str(y) for y in range(1994, 2010) if str(y) not in WIPED]

CABINETS = {
    "1994": {"title": "Hotlist Surfer", "key": "itt94-game-hotlist", "inspire": "Netscape hotlist"},
    "1995": {"title": "Applet Checkers", "key": "itt95-game-checkers", "inspire": "Java applet parlor"},
    "1996": {"title": "Planet Hop", "key": "itt96-game-planets", "inspire": "Space Jam hub"},
    "1997": {"title": "Lobby Connect Four", "key": "itt97-game-connect4", "inspire": "Yahoo Games parlor"},
    "1998": {"title": "Skip-Intro Runner", "key": "itt98-game-skipintro", "inspire": "agency Flash skip-intro"},
    "1999": {"title": "Pixel Pet Dash", "key": "itt99-game-petdash", "inspire": "Neopets-class pet"},
    "2000": {"title": "Lot Life", "key": "itt00-game-lotlife", "inspire": "The Sims dollhouse"},
    "2001": {"title": "Clickscape", "key": "itt01-game-clickscape", "inspire": "RuneScape click-grind"},
    "2002": {"title": "Room Sticky", "key": "itt02-game-roomsticky", "inspire": "Habbo room"},
    "2003": {"title": "Gags Lite", "key": "itt03-game-gagslite", "inspire": "Toontown gags"},
    "2004": {"title": "Gem Cascade", "key": "itt04-game-gemcascade", "inspire": "Bejeweled / PopCap"},
    "2005": {"title": "HoverChop", "key": "itt05-game-heli", "inspire": "Helicopter Game"},
    "2006": {"title": "TrailSled", "key": "itt06-game-sled", "inspire": "Line Rider"},
    "2007": {"title": "Box Shift", "key": "itt07-game-boxshift", "inspire": "Portal-class puzzle"},
    "2008": {"title": "Goo Span", "key": "itt08-game-goospan", "inspire": "World of Goo"},
    "2009": {"title": "Plot Neighbors", "key": "itt09-game-plotneighbors", "inspire": "FarmVille plots"},
}


def patch_home(year: str) -> bool:
    path = ROOT / "years" / year / "pages" / "home.html"
    if not path.exists():
        return False
    html = path.read_text(encoding="utf-8")
    spec = CABINETS[year]
    chip = (
        f'<p class="itt-playable-link" style="font-size:13px;margin:10px 0;padding:8px 10px;'
        f'border:2px solid #333;background:#ffc;max-width:46em">'
        f"<b>▶ Play this year’s game</b> — "
        f'<a href="../sites/playable/game.html"><b>{spec["title"]}</b></a> '
        f'({spec["inspire"]}) · '
        f'<a href="../sites/playable/famous.html">Famous games</a> · '
        f'<a href="../sites/playable/index.html">Game cabinet</a> '
        f'<span style="font-size:11px;color:#444">(key <code>{spec["key"]}</code>)</span></p>'
    )
    html2, n = re.subn(
        r'<p class="itt-playable-link"[\s\S]*?</p>',
        chip,
        html,
        count=1,
    )
    html = html2 if n else html
    html, n5 = re.subn(
        r'\s*<p class="itt-5x-playables"[^>]*>[\s\S]*?</p>',
        "\n",
        html,
        count=1,
    )
    if n or n5:
        path.write_text(html, encoding="utf-8")
        return True
    return False


def patch_playable_index(year: str) -> bool:
    path = ROOT / "years" / year / "sites" / "playable" / "index.html"
    if not path.exists():
        return False
    html = path.read_text(encoding="utf-8")
    spec = CABINETS[year]
    html = re.sub(
        r"<title>[\s\S]*?</title>",
        f"<title>{spec['title']} · {year} game cabinet</title>",
        html,
        count=1,
    )
    nav = (
        f'<p class="yp-chrome-nav" style="font-size:12px;max-width:560px;margin:0 auto 8px;line-height:1.5">\n'
        f' <a href="../../pages/home.html">Starting Point {year}</a> ·\n'
        f' <a href="../../pages/map.html">Flow map</a> ·\n'
        f' <a href="../../pages/about.html">About</a> ·\n'
        f' <a href="game.html"><b>▶ {spec["title"]}</b></a> ·\n'
        f' <a href="famous.html"><b>Famous games</b></a>\n'
        f"</p>"
    )
    html2, n = re.subn(
        r'<p class="yp-chrome-nav"[\s\S]*?</p>',
        nav,
        html,
        count=1,
    )
    if n:
        path.write_text(html2, encoding="utf-8")
        return True
    return False


def patch_map(year: str) -> bool:
    path = ROOT / "years" / year / "pages" / "map.html"
    if not path.exists():
        return False
    html = path.read_text(encoding="utf-8")
    spec = CABINETS[year]
    if 'href="../sites/playable/game.html"' in html:
        return False
    extra = (
        f'<p style="font-size:12px"><a href="../sites/playable/game.html"><b>▶ {spec["title"]}</b></a>'
        f' · <a href="../sites/playable/index.html">Game cabinet</a></p>\n'
    )
    if 'href="../sites/playable/famous.html"' in html:
        html = html.replace(
            '<a href="../sites/playable/famous.html">',
            f'<a href="../sites/playable/game.html"><b>▶ {spec["title"]}</b></a> · <a href="../sites/playable/famous.html">',
            1,
        )
        path.write_text(html, encoding="utf-8")
        return True
    if 'href="../sites/playable/index.html"' in html:
        html = html.replace(
            '<a href="../sites/playable/index.html">',
            f'<a href="../sites/playable/game.html"><b>▶ {spec["title"]}</b></a> · <a href="../sites/playable/index.html">',
            1,
        )
        path.write_text(html, encoding="utf-8")
        return True
    html = re.sub(r"(</h1>)", r"\1\n" + extra, html, count=1)
    path.write_text(html, encoding="utf-8")
    return True


def append_cabinet_css() -> None:
    path = ROOT / "css" / "year-playable.css"
    css = path.read_text(encoding="utf-8")
    if ".yp-cabinet" in css:
        return
    path.write_text(
        css
        + """

/* Year game cabinet (toys removed) */
a.yp-btn {
  display: inline-block;
  text-decoration: none;
  margin: 4px 6px 4px 0;
}
.yp-cabinet .yp-why,
.yp-cabinet .yp-era {
  font-size: 13px;
  line-height: 1.45;
  margin: 0 0 10px;
}
.yp-cabinet .yp-hud {
  font-size: 12px;
  font-weight: 600;
}
""",
        encoding="utf-8",
    )


def patch_5x_builder() -> None:
    path = ROOT / "scripts" / "build-5x-measurable.py"
    if not path.exists():
        return
    src = path.read_text(encoding="utf-8")
    src = src.replace(
        "    # playable strip: add g=4–15 + games 2–5 if missing",
        "    # toys 4–15 retired — do not re-inject tap/hold chips",
    )
    # make patch_home skip toy strip by forcing the condition false
    src = src.replace(
        '    if \'class="itt-5x-playables"\' not in html and "data-itt-5x-playables" not in html:',
        "    if False and 'class=\"itt-5x-playables\"' not in html and \"data-itt-5x-playables\" not in html:",
    )
    src = src.replace(
        "    if \"data-itt-5x-play\" in html:",
        "    if False and \"data-itt-5x-play\" in html:",
    )
    path.write_text(src, encoding="utf-8")


def main() -> None:
    append_cabinet_css()
    patch_5x_builder()
    report = {"home": [], "index": [], "map": []}
    for year in YEARS:
        if patch_home(year):
            report["home"].append(year)
        if patch_playable_index(year):
            report["index"].append(year)
        if patch_map(year):
            report["map"].append(year)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
