#!/usr/bin/env python3
"""Single 5× leftover contract — plaques vs native gold dests.

Used by the static gate and by strip-official-5x-plaques.py so those two
scripts cannot disagree. 5x-live specs that assert data-5x-save count 0
are the gold list; every other 5x-recheck.matrix dest must keep a plaque.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MATRIX_PATH = ROOT / "e2e" / "5x-recheck.matrix.json"

# YYYY-5x-live.spec.js dests that write via a product gold, not a checkbox plaque.
NO_PLAQUE: frozenset[tuple[int, str]] = frozenset(
    {
        (1994, "sites/fishcam/index.html"),
        (1994, "sites/whitehouse/index.html"),
        (1994, "sites/yahoo/index.html"),
        (1995, "sites/auctionweb/item-laser.html"),
        (1995, "sites/altavista/index.html"),
        (1995, "sites/netscape/index.html"),
        (1996, "sites/hotmail/index.html"),
        (1996, "sites/spacejam/index.html"),
        (1997, "sites/drudge/index.html"),
        (1999, "sites/y2k/index.html"),
        (2005, "sites/youtube/index.html"),
    }
)

# Years restored to committed dests (no leftover 5× plaques).
NO_PLAQUE_YEARS: frozenset[int] = frozenset({2008, 2010, 2011, 2012, 2013})
# Hub-wiped trees — do not require dests or famous cabinets.
WIPED_YEARS: frozenset[int] = frozenset({2006, 2007, 2020, 2021, 2022, 2023, 2024, 2025})

POP_PANEL_2020 = ()

FAMOUS_YEARS = [
    y
    for y in list(range(1994, 2020))
    if y not in {2005, 2006, 2007, 2009, 2011, 2013, 2014}
]


def load_matrix() -> dict:
    return json.loads(MATRIX_PATH.read_text(encoding="utf-8"))


def plaque_required(year: int, room: str) -> bool:
    if year in NO_PLAQUE_YEARS:
        return False
    return (year, room) not in NO_PLAQUE


def dest_html(year: int, room: str) -> Path:
    return ROOT / "years" / str(year) / room


def has_plaque(html: str) -> bool:
    return "data-5x-loop" in html and "data-5x-save" in html and "data-5x-next" in html


def check() -> list[str]:
    """Return human-readable failures. Empty list = contract holds."""
    fails: list[str] = []
    matrix = load_matrix()
    for pack in matrix.get("panel") or []:
        year = int(pack["year"])
        if year in WIPED_YEARS:
            continue
        for fl in pack.get("flows") or []:
            room = fl["room"]
            path = dest_html(year, room)
            if not path.is_file():
                fails.append(f"missing dest {year}/{room}")
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            want = plaque_required(year, room)
            got = "data-5x-save" in html
            # 4× leftover writers replaced plaques on some dests — still REAL.
            if want and not has_plaque(html) and "data-4x-go" not in html:
                fails.append(f"plaque required {year}/{room} key={fl.get('key')}")
            if not want and got:
                fails.append(f"gold dest must stay plaque-free {year}/{room}")
    for rel in POP_PANEL_2020:
        p = ROOT / rel
        if not p.is_file():
            fails.append(f"missing {rel}")
            continue
        if 'data-pop-panel' not in p.read_text(encoding="utf-8", errors="replace"):
            fails.append(f"2020 third-3× needs data-pop-panel {rel}")
    for year in FAMOUS_YEARS:
        p = ROOT / "years" / str(year) / "sites" / "playable" / "famous.html"
        if not p.is_file():
            fails.append(f"missing famous.html {year}")
            continue
        html = p.read_text(encoding="utf-8", errors="replace")
        if html.count("data-famous=") < 2:
            fails.append(f"famous.html needs two [data-famous] cabinets {year}")
    return fails
