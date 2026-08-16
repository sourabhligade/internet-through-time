#!/usr/bin/env python3
"""Emit years/YYYY/sites/playable/famous.html — two famous OSS-class games per year."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# engine, museum title, why this year (period-famous, not brand clone)
FAMOUS = {
    1994: [
        ("pong", "Table Tennis", "Pong is still the demo on every lab PC in 1994."),
        ("mines", "Desk Mines", "Windows 3.1 Minesweeper is the office time-sink."),
    ],
    1995: [
        ("mines", "Win95 Mines", "Windows 95 Games folder ships Minesweeper."),
        ("memory", "Concentration", "Solitaire / FreeCell era — pairs is the legal cousin."),
    ],
    1996: [
        ("invaders", "Space Rows", "Space-shooter Java/Shockwave tabs next to Space Jam."),
        ("pong", "Table Tennis", "Still the first thing anyone codes in a <canvas> later."),
    ],
    1997: [
        ("snake", "Pocket Snake", "Nokia 6110 Snake (1997) is the phone everyone remembers."),
        ("breakout", "Brick Bat", "Shockwave / Java breakout clones fill portal game rooms."),
    ],
    1998: [
        ("breakout", "Brick Bat", "Skip-intro agencies still hide a breakout in the Flash nav."),
        ("memory", "Concentration", "Yahoo Games / ClassicGames pair-matching rooms."),
    ],
    1999: [
        ("tetris", "Fall Blocks", "Flash portal falling-block clones are everywhere."),
        ("snake", "Pocket Snake", "Every Nokia in a backpack still runs Snake."),
    ],
    2000: [
        ("invaders", "Space Rows", "Newgrounds / Flash shooter culture."),
        ("pong", "Table Tennis", "Still the 10-line demo kids paste into Notepad."),
    ],
    2001: [
        ("mines", "Desk Mines", "XP-era Minesweeper is still the IT-closet default."),
        ("memory", "Concentration", "Casual pair games on MSN Zone."),
    ],
    2002: [
        ("snake", "Pocket Snake", "Java midlet Snake ports flood feature phones."),
        ("breakout", "Brick Bat", "Miniclip-class Flash breakout."),
    ],
    2003: [
        ("tetris", "Fall Blocks", "Club / school-computer falling-block tabs."),
        ("simon", "Simon Pads", "Memory-tone Flash toys on eBaum / Newgrounds."),
    ],
    2004: [
        ("breakout", "Brick Bat", "AddictingGames / Miniclip brick bats."),
        ("mines", "Desk Mines", "Office XP Minesweeper never left."),
    ],
    2005: [
        ("snake", "Pocket Snake", "Phone + browser Snake clones next to Helicopter Game."),
        ("invaders", "Space Rows", "After-school Flash shooters."),
    ],
    2006: [
        ("tetris", "Fall Blocks", "Kongregate / Newgrounds falling-block flood."),
        ("snake", "Pocket Snake", "Still the phone game under the desk."),
    ],
    2007: [
        ("pong", "Table Tennis", "Wii Sports year — table tennis is back in the living room."),
        ("breakout", "Brick Bat", "Still a Miniclip default."),
    ],
    2008: [
        ("snake", "Pocket Snake", "App Store year — Snake clones are the free-app flood."),
        ("memory", "Concentration", "iPhone free puzzle clones."),
    ],
    2009: [
        ("tetris", "Fall Blocks", "EA Tetris on iPhone is the paid chart; this is the class."),
        ("mines", "Desk Mines", "Win7 still ships Minesweeper."),
    ],
    2010: [
        ("snake", "Pocket Snake", "Android Market Snake clones."),
        ("breakout", "Brick Bat", "HTML5 canvas breakouts start replacing SWF."),
    ],
    2011: [
        ("memory", "Concentration", "Social/casual pair games around Draw Something’s eve."),
        ("pong", "Table Tennis", "HTML5 Pong is the canvas tutorial of the year."),
    ],
    2012: [
        ("tetris", "Fall Blocks", "HTML5 falling-block open-source ports."),
        ("snake", "Pocket Snake", "Still the first canvas tutorial after Flappy’s seed."),
    ],
    2013: [
        ("snake", "Pocket Snake", "Not Flappy (that’s Pipe Hop). Snake stays the phone classic."),
        ("breakout", "Brick Bat", "HTML5 breakout JSFiddles."),
    ],
    2014: [
        ("mines", "Desk Mines", "Not 2048 (that’s Tile Fold). Mines is the other office classic."),
        ("snake", "Pocket Snake", "Open-source Snake on every CodePen."),
    ],
    2015: [
        ("pong", "Table Tennis", "Not agar.io (Blob Rush). Pong is the canvas hello-world."),
        ("snake", "Pocket Snake", "Still the JS tutorial."),
    ],
    2016: [
        ("memory", "Concentration", "Casual mobile pair games beside PoGO."),
        ("breakout", "Brick Bat", "HTML5 arcade clones."),
    ],
    2017: [
        ("snake", "Pocket Snake", "Not Fortnite (Storm Circle). Snake is the opposite energy."),
        ("tetris", "Fall Blocks", "Open-source falling-block still everywhere."),
    ],
    2018: [
        ("memory", "Concentration", "Casual pair games in the GDPR year."),
        ("pong", "Table Tennis", "Still the 40-line demo."),
    ],
    2019: [
        ("snake", "Pocket Snake", "TikTok year — Snake is the anti-FYP toy."),
        ("breakout", "Brick Bat", "HTML5 arcade."),
    ],
    2020: [
        ("breakout", "Brick Bat", "Not Among Us (Sus Vote). Breakout is the other lockdown tab."),
        ("memory", "Concentration", "Zoom-break pair games."),
    ],
    2021: [
        ("memory", "Concentration", "Not Wordle (Five Letter). Pairs is the other daily."),
        ("snake", "Pocket Snake", "Still the first thing anyone codes."),
    ],
}

WHY_OSS = (
    "Public-domain / textbook mechanics (Pong 1972, Snake/Nibbles, Breakout, Minesweeper-class, "
    "falling-block, memory pairs, Space Invaders-class, Simon). Museum JS — no ripped SWF, no brand sprites."
)


def page(year: int) -> str:
    games = FAMOUS[year]
    panels = []
    for engine, title, why in games:
        gid = engine
        panels.append(
            f"""
<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{gid}" data-famous="{engine}" tabindex="0" style="margin:18px 0;padding:10px;border:1px solid #888;background:#fff">
 <h2 style="margin:0 0 6px;font-size:16px">{title}</h2>
 <p class="honesty" style="font-size:11px;background:#ffc;border:1px solid #cc0;padding:6px">{why} {WHY_OSS} Key <code>itt{str(year)[2:]}-game-{gid}</code>.</p>
 <p>
  <button type="button" data-game-start>Start</button>
  Score <b data-game-score>0</b> · Best <b data-game-best>0</b>
 </p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Start to play. Incomplete never writes.</p>
 <canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>"""
        )
    inner = "\n".join(panels)
    css = "mosaic-defaults.css" if year == 1994 else "period-%s.css" % year
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>Famous games · {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f0f0f0" style="margin:0;padding:12px;font-family:Arial,sans-serif">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p style="font-size:12px">
 <a href="index.html">← Playables</a> ·
 <a href="game.html">Year game</a> ·
 <a href="../../pages/home.html">Starting Point {year}</a>
</p>
<h1 style="font-size:20px;margin:8px 0">Famous games · {year}</h1>
<p style="font-size:13px;max-width:42em">Two era-famous arcade mechanics you can actually play. OSS / textbook rules. No commercial SWF. Start writes nothing until you score.</p>
{inner}
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/famous-kit.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def insert_urlmap(year: int) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.exists():
        return
    text = cfg.read_text(encoding="utf-8")
    rel = "sites/playable/famous.html"
    if f'"{rel}"' in text:
        return
    m = re.search(r"urlMap:\s*\{", text)
    if not m:
        return
    key = f'      "{rel}": "http://museum.local/years/{year}/{rel}",\n'
    text = text[: m.end()] + "\n" + key + text[m.end() :]
    cfg.write_text(text, encoding="utf-8")


def chip_home(year: int) -> None:
    home = ROOT / "years" / str(year) / "pages" / "home.html"
    if not home.exists():
        return
    text = home.read_text(encoding="utf-8")
    if "playable/famous.html" in text:
        return
    chip = (
        f' <a href="../sites/playable/famous.html"><b>Famous games</b></a> ·'
    )
    # inject into residual pack if present
    m = re.search(r'(Also \d{4} residual[^<]*</b>)', text)
    if m:
        text = text[: m.end()] + chip + text[m.end() :]
        home.write_text(text, encoding="utf-8")
        return
    # lean residual heading
    m2 = re.search(r'(Residual chips \(not P0\)</h2>\s*<p[^>]*>)', text)
    if m2:
        text = text[: m2.end()] + chip + text[m2.end() :]
        home.write_text(text, encoding="utf-8")


def chip_playable(year: int) -> None:
    idx = ROOT / "years" / str(year) / "sites" / "playable" / "index.html"
    if not idx.exists():
        return
    text = idx.read_text(encoding="utf-8")
    if "famous.html" in text:
        return
    link = ' · <a href="famous.html"><b>Famous games</b></a>'
    text = text.replace("</p>", link + "</p>", 1)
    idx.write_text(text, encoding="utf-8")


def _match_bracket(s: str, open_idx: int) -> int:
    opener = s[open_idx]
    closer = {"[": "]", "{": "}"}.get(opener)
    if not closer:
        return -1
    depth = 0
    i = open_idx
    in_str = None
    escape = False
    while i < len(s):
        c = s[i]
        if in_str:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == in_str:
                in_str = None
        else:
            if c in "\"'":
                in_str = c
            elif c == opener:
                depth += 1
            elif c == closer:
                depth -= 1
                if depth == 0:
                    return i
        i += 1
    return -1


def _year_span(text: str, year: int) -> tuple[int, int] | None:
    m = re.search(rf'ITT\.flowMaps\["{year}"\]\s*=', text)
    if not m:
        return None
    brace = text.find("{", m.end())
    if brace < 0:
        return None
    end = _match_bracket(text, brace)
    if end < 0:
        return None
    return brace, end


def insert_flowmap(year: int) -> bool:
    """Append a residual Famous branch on ITT.flowMaps[year] (map.html reads this)."""
    path = ROOT / "js" / "config" / "flow-maps.js"
    text = path.read_text(encoding="utf-8")
    span = _year_span(text, year)
    if not span:
        return False
    start, end = span
    block = text[start : end + 1]
    if "playable/famous.html" in block:
        return False
    bm = re.search(r'"branches"\s*:\s*\[|branches\s*:\s*\[', block)
    if not bm:
        return False
    arr_open = start + bm.end() - 1
    arr_close = _match_bracket(text, arr_open)
    if arr_close < 0:
        return False
    quoted = '"branches"' in bm.group(0)
    if quoted:
        branch = (
            "      {\n"
            '        "label": "Famous games",\n'
            '        "do": "Two era-famous cabinets · incomplete never writes",\n'
            '        "sites": [\n'
            "          {\n"
            '            "name": "Famous games",\n'
            '            "href": "sites/playable/famous.html",\n'
            '            "do": "Play two era-famous cabinets"\n'
            "          }\n"
            "        ]\n"
            "      }\n"
        )
    else:
        branch = (
            "      {\n"
            '        label: "Famous games",\n'
            '        do: "Two era-famous cabinets · incomplete never writes",\n'
            "        sites: [\n"
            '          { name: "Famous games", href: "sites/playable/famous.html", do: "Play two era-famous cabinets" }\n'
            "        ]\n"
            "      }\n"
        )
    before = text[:arr_close].rstrip()
    if before.endswith(","):
        insert = "\n" + branch
    else:
        insert = ",\n" + branch
    path.write_text(before + insert + text[arr_close:], encoding="utf-8")
    return True


def chip_map_static(year: int) -> None:
    """Belt-and-suspenders visible link on map.html chrome (flow-map still owns the tree)."""
    dest = ROOT / "years" / str(year) / "pages" / "map.html"
    if not dest.exists():
        return
    text = dest.read_text(encoding="utf-8")
    if "playable/famous.html" in text:
        return
    chip = ' · <a href="../sites/playable/famous.html"><b>Famous games</b></a>'
    # 3× also nav
    if "data-itt-3x-also" in text and "playable/index.html" in text:
        text = text.replace(
            'href="../sites/playable/index.html">Period playables</a>',
            'href="../sites/playable/index.html">Period playables</a>' + chip,
            1,
        )
        if "playable/famous.html" in text:
            dest.write_text(text, encoding="utf-8")
            return
    # lean footer / chrome paragraph with an existing playable or home link
    m = re.search(r'(<p[^>]*>\s*<a href="home.html")', text)
    if m:
        # insert after first </a> in that p
        end_a = text.find("</a>", m.start())
        if end_a > 0:
            text = text[: end_a + 4] + chip + text[end_a + 4 :]
            dest.write_text(text, encoding="utf-8")
            return
    # last-resort: before closing body
    text = text.replace("</body>", f"<p style=\"font-size:12px\">{chip.lstrip(' ·')}</p>\n</body>", 1)
    dest.write_text(text, encoding="utf-8")


def main() -> None:
    n = 0
    maps = 0
    statics = 0
    for year in range(1994, 2022):
        dest_dir = ROOT / "years" / str(year) / "sites" / "playable"
        dest_dir.mkdir(parents=True, exist_ok=True)
        (dest_dir / "famous.html").write_text(page(year), encoding="utf-8")
        insert_urlmap(year)
        chip_home(year)
        chip_playable(year)
        if insert_flowmap(year):
            maps += 1
        before = (ROOT / "years" / str(year) / "pages" / "map.html").read_text(encoding="utf-8") if (ROOT / "years" / str(year) / "pages" / "map.html").exists() else ""
        chip_map_static(year)
        after = (ROOT / "years" / str(year) / "pages" / "map.html").read_text(encoding="utf-8") if (ROOT / "years" / str(year) / "pages" / "map.html").exists() else ""
        if after != before and "playable/famous.html" in after:
            statics += 1
        n += 1
    print("famous pages", n, "flow-maps added", maps, "map.html chips", statics)


if __name__ == "__main__":
    main()
