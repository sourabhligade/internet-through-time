#!/usr/bin/env python3
"""Rebuild leftover-shaped playable dests into year-true cabinets.

2001–2003 famous.html were leftover plaques (0 [data-famous]).
2005/2006 famous engines did not match e2e/famous-games.spec.js.
2001–2003 extra-a/b and more-a/b, plus 2015 more-a/b, lacked minute/more machines.
Keeps leftover 2× panels after the cabinet. No new dest folders.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

ENGINES = {
    "2001": (("mines", "Desk Mines"), ("memory", "Pairs")),
    "2002": (("snake", "Nibbles"), ("breakout", "Brick Bat")),
    "2003": (("tetris", "Falling Blocks"), ("simon", "Simon")),
}

FAMOUS_FIX = {
    "2005": (("snake", "Nibbles"), ("invaders", "Space Rows")),
    "2006": (("tetris", "Falling Blocks"), ("snake", "Nibbles")),
}

MORE = {
    "2001": (
        ("more-a", "wikiwalk", "Wiki Walk", "UseMod hop leftover. Gold is Wikipedia edit."),
        ("more-b", "wayhop", "Wayback Hop", "One capture leftover. Gold stays Wikipedia."),
    ),
    "2002": (
        ("more-a", "stumblehop", "Stumble Hop", "One hop leftover. Gold is StumbleUpon."),
        ("more-b", "roomnote", "Room Note", "Sticky leftover. Gold stays StumbleUpon."),
    ),
    "2003": (
        ("more-a", "bucketwalk", "Bucket Walk", "Album leftover. Gold is Photobucket upload."),
        ("more-b", "storehop", "Store Hop", "iTunes Store leftover. Gold stays Photobucket."),
    ),
    "2015": (
        ("more-a", "mercyrun", "Mercy Run", "Overwatch leftover. Star stays Periscope. slither is 2016."),
        ("more-b", "lockertap", "Locker Tap", "Apple Music leftover. Star stays Periscope."),
    ),
}

EXTRA = {
    "2001": (
        ("extra-a", "wayclick", "Wayback click", "Open one capture leftover."),
        ("extra-b", "ipodnote", "iPod leftover", "Scroll wheel leftover. Not the star."),
    ),
    "2002": (
        ("extra-a", "stumblenote", "Stumble leftover", "One hop leftover. Not the star."),
        ("extra-b", "kaznote", "KaZaA leftover", "Share leftover. Not the star."),
    ),
    "2003": (
        ("extra-a", "albumnote", "Album leftover", "Photobucket leftover cabinet."),
        ("extra-b", "wpnote", "WordPress leftover", "Dashboard leftover. Not the star."),
    ),
}


def prefix(year: str) -> str:
    return "itt" + year[2:]


def famous_cabinets(year: str, a: tuple[str, str], b: tuple[str, str]) -> str:
    pfx = prefix(year)
    blocks = []
    for gid, title in (a, b):
        blocks.append(
            f"""<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{gid}" data-famous="{gid}" tabindex="0" style="margin:18px 0;padding:10px;border:1px solid #888;background:#fff">
 <h2 style="margin:0 0 6px;font-size:16px">{title}</h2>
 <p class="honesty" style="font-size:11px;background:#ffc;border:1px solid #cc0;padding:6px">Museum JS textbook mechanic. No ripped SWF. No brand sprites. Incomplete never writes. Key <code>{pfx}-game-{gid}</code>.</p>
 <p>
  <button type="button" data-game-start>Start</button>
  Score <b data-game-score>0</b> · Best <b data-game-best>0</b>
 </p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Start to play. Incomplete never writes.</p>
 <canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>"""
        )
    return "\n".join(blocks)


def inject_after_title(path: Path, year: str, inner: str, scripts: str) -> None:
    text = path.read_text(encoding="utf-8")
    if "year-game-boot.js" not in text:
        text = text.replace(
            f'<link rel="stylesheet" href="../../../../css/period-{year}.css">',
            f'<link rel="stylesheet" href="../../../../css/period-{year}.css">\n'
            '<link rel="stylesheet" href="../../../../css/year-game-ui.css">',
            1,
        )
    marker = f'<script src="../../../../js/immersion-{year}.js">'
    if marker not in text:
        marker = f'<script src="../../../../js/immersion-{year}.js" defer>'
    if "<!-- ITT-FAMOUS-CABINET:start -->" in text:
        return
    block = (
        "<!-- ITT-FAMOUS-CABINET:start -->\n"
        + inner
        + "\n"
        + scripts
        + "\n<!-- ITT-FAMOUS-CABINET:end -->\n"
    )
    if marker in text:
        text = text.replace(marker, block + marker, 1)
    else:
        text = text.replace("</body>", block + "</body>", 1)
    path.write_text(text, encoding="utf-8")


def rewrite_famous(year: str, a: tuple[str, str], b: tuple[str, str]) -> None:
    path = ROOT / "years" / year / "sites" / "playable" / "famous.html"
    if not path.exists():
        print(year, "no famous.html")
        return
    text = path.read_text(encoding="utf-8")
    if 'data-famous="' in text and year in FAMOUS_FIX:
        # swap engine ids/attrs on existing cabinets
        old_ids = []
        for m in __import__("re").finditer(r'data-famous="([^"]+)"', text):
            old_ids.append(m.group(1))
        if len(old_ids) >= 2 and (old_ids[0], old_ids[1]) != (a[0], b[0]):
            text = text.replace(f'data-game-id="{old_ids[0]}"', f'data-game-id="{a[0]}"', 1)
            text = text.replace(f'data-famous="{old_ids[0]}"', f'data-famous="{a[0]}"', 1)
            text = text.replace(f"itt{year[2:]}-game-{old_ids[0]}", f"itt{year[2:]}-game-{a[0]}")
            text = text.replace(f'data-game-id="{old_ids[1]}"', f'data-game-id="{b[0]}"', 1)
            text = text.replace(f'data-famous="{old_ids[1]}"', f'data-famous="{b[0]}"', 1)
            text = text.replace(f"itt{year[2:]}-game-{old_ids[1]}", f"itt{year[2:]}-game-{b[0]}")
            path.write_text(text, encoding="utf-8")
            print(year, "famous engines", old_ids[:2], "->", a[0], b[0])
            return
        print(year, "famous already matched")
        return
    scripts = (
        '<script src="../../../../js/games/year-game-boot.js"></script>\n'
        '<script src="../../../../js/games/famous-kit.js"></script>'
    )
    inject_after_title(path, year, famous_cabinets(year, a, b), scripts)
    print(year, "famous cabinets injected")


def write_extra(year: str, slot: str, gid: str, title: str, blurb: str) -> None:
    path = ROOT / "years" / year / "sites" / "playable" / slot
    old = path.read_text(encoding="utf-8") if path.exists() else ""
    tail = ""
    i = old.find("<!-- ITT-3X-ALSO:start -->")
    if i >= 0:
        tail = old[i:]
    pfx = prefix(year)
    key = f"{pfx}-game-{gid}"
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
<link rel="stylesheet" href="../../../../css/year-extra-minute.css">
</head>
<body class="yg-body yg-year-{year}" bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell mx-shell" data-year-game data-minute-extra data-mx-kind="pick" data-year="{year}" data-game-id="{gid}">
  <h1>{title}</h1>
  <p class="mx-goal">{blurb}</p>
  <p class="honesty yg-honesty">Leftover extra · not the year star · incomplete never writes · key <code>{key}</code></p>
  <p class="mx-hud">Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-mx-field class="mx-field">
    <button type="button" data-mx-good>Year-true leftover</button>
    <button type="button" data-mx-good>Second leftover act</button>
    <button type="button" data-mx-trap>Neighbor year (trap)</button>
  </div>
  <p class="mx-actions">
    <button type="button" data-game-start>Start</button>
    <button type="button" data-mx-finish>Finish</button>
  </p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="index.html">Cabinet</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-extra-minute.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
"""
    if tail:
        html += "\n" + tail
        if "</body>" not in html:
            html += "\n</body>\n</html>\n"
    else:
        html += "</body>\n</html>\n"
    path.write_text(html, encoding="utf-8")
    print(year, slot, "minute machine")


def write_more(year: str, slot: str, gid: str, title: str, blurb: str, next_href: str, next_label: str) -> None:
    path = ROOT / "years" / year / "sites" / "playable" / f"{slot}.html"
    old = path.read_text(encoding="utf-8") if path.exists() else ""
    tail = ""
    i = old.find("<!-- ITT-3X-ALSO:start -->")
    if i >= 0:
        tail = old[i:]
    pfx = prefix(year)
    key = f"{pfx}-game-{gid}"
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-year="{year}" data-game-id="{gid}" data-more-kind="acts" data-more-need="2" style="max-width:480px;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p class="honesty yg-honesty">{blurb} · incomplete never writes · key <code>{key}</code></p>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p>
 <button type="button" data-game-start>Start</button>
 <button type="button" data-game-finish>Finish</button>
</p>
<p>
 <button type="button" data-more-good>Year-true leftover</button>
 <button type="button" data-more-good>Second leftover act</button>
 <button type="button" data-more-trap>Neighbor year (trap)</button>
</p>
<p data-itt-action-status>Press Start. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
"""
    if tail:
        html += "\n" + tail
        if "</body>" not in html:
            html += "\n</body>\n</html>\n"
    else:
        html += "</body>\n</html>\n"
    path.write_text(html, encoding="utf-8")
    print(year, slot, "more machine")


def add_map_famous(year: str) -> None:
    path = ROOT / "js" / "config" / "flow-maps.js"
    text = path.read_text(encoding="utf-8")
    key = f'ITT.flowMaps["{year}"]'
    if key not in text:
        print(year, "no flowMaps")
        return
    block_start = text.find(key)
    block_end = text.find("ITT.flowMaps[", block_start + 10)
    if block_end < 0:
        block_end = len(text)
    block = text[block_start:block_end]
    if "playable/famous.html" in block:
        print(year, "flowMaps already has famous")
        return
    needle = '{ "name": "Year flow map", "href": "pages/map.html"'
    if needle not in block:
        # 2005/2006 use different quote style
        needle = '{ "name": "Year flow map", "href": "pages/map.html", "do": "This tree" }'
    insert = (
        '{ "name": "Famous leftover", "href": "sites/playable/famous.html", "do": "cabinet" },\n          '
        + needle
    )
    if needle not in block:
        print(year, "no map row to precede")
        return
    new_block = block.replace(needle, insert, 1)
    text = text[:block_start] + new_block + text[block_end:]
    path.write_text(text, encoding="utf-8")
    print(year, "flowMaps + famous")


def main() -> None:
    for year, (a, b) in ENGINES.items():
        rewrite_famous(year, a, b)
        add_map_famous(year)
    for year, (a, b) in FAMOUS_FIX.items():
        rewrite_famous(year, a, b)
        add_map_famous(year)
    for year, slots in EXTRA.items():
        for slot, gid, title, blurb in slots:
            write_extra(year, slot + ".html", gid, title, blurb)
    for year, slots in MORE.items():
        nxt = ("more-b.html", "more-b")
        for i, (slot, gid, title, blurb) in enumerate(slots):
            if i == 0:
                write_more(year, slot, gid, title, blurb, "more-b.html", "more-b")
            else:
                write_more(year, slot, gid, title, blurb, "game.html", "Year game")


if __name__ == "__main__":
    main()
