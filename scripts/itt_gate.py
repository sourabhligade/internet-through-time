#!/usr/bin/env python3
"""Shared gate helpers — year list + urlMap parse (no Node).

Smoke and check-all-years used to spawn `node -e` once per year (~40ms each,
24–27 processes). Config urlMaps are string-key objects; parse them in-process.
"""
from __future__ import annotations

import re
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Hub-open years. Branch museum/1994-2020-lean.
# Hub 24 years open (1994–2007 + 2010 + 2012–2017 + 2020–2022).
# 2009 boarded (tree stays, year-shell is a boarded room, no hub card).
# Wiped years are _WIPED (no tree). 2005 is restored.
_BOARDED = {"2009"}
_WIPED = {"2011", "2023", "2024", "2025"}
# Back-compat: older scripts imported _WIPED as “not a hub year”.
_NOT_SHIP = _BOARDED | _WIPED
SHIP_YEARS: list[str] = [
    "1994", "1995", "1996", "1997", "1998", "1999",
    "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
    "2010", "2012", "2013", "2014", "2015", "2016", "2017",
    "2020", "2021", "2022",
]

_URLMAP_START = re.compile(r"(?:\burlMap\s*:\s*\{|\bvar\s+urlMap\s*=\s*\{)")
_URLMAP_KEY = re.compile(r'^\s*"([^"]+)"\s*:', re.M)
_ROOMS_START = re.compile(r"\brooms\s*=\s*\[")
_ROOM_STR = re.compile(r'"([^"]+)"')


def _brace_body(text: str, start: int, open_ch: str, close_ch: str) -> str | None:
    depth = 1
    i = start
    n = len(text)
    out: list[str] = []
    while i < n and depth:
        c = text[i]
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                break
        if depth:
            out.append(c)
        i += 1
    if depth != 0:
        return None
    return "".join(out)


def urlmap_keys_from_source(text: str) -> list[str] | None:
    """Keys of urlMap plus rooms[] paths (lean years fill urlMap from rooms)."""
    m = _URLMAP_START.search(text)
    keys: list[str] = []
    if m:
        body = _brace_body(text, m.end(), "{", "}")
        if body is None:
            return None
        keys = _URLMAP_KEY.findall(body)
    rm = _ROOMS_START.search(text)
    if rm:
        rbody = _brace_body(text, rm.end(), "[", "]")
        if rbody is not None:
            for path in _ROOM_STR.findall(rbody):
                if path not in keys:
                    keys.append(path)
    if not keys and not m:
        return None
    return keys


@lru_cache(maxsize=None)
def urlmap_keys(year: str) -> list[str] | None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.is_file():
        return None
    return urlmap_keys_from_source(cfg.read_text(encoding="utf-8", errors="replace"))


def dump_urlmaps(years: list[str] | None = None) -> dict[str, list[str] | None]:
    years = years or SHIP_YEARS
    return {y: urlmap_keys(y) for y in years}
