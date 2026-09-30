#!/usr/bin/env python3
"""Shared gate helpers — year list + urlMap parse (no Node).

Smoke and check-all-years used to spawn `node -e` once per year (~40ms each,
24–27 processes). Config urlMaps are string-key objects; parse them in-process.
"""
from __future__ import annotations

import json
import re
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# One year card. kind html|react are the 22 open doors.
# boarded: 2009 (tree stays, no hub card). absent includes 2008.
_YEARS: dict = json.loads((ROOT / "js" / "year-card.json").read_text(encoding="utf-8"))["years"]
_BOARDED = {y for y, r in _YEARS.items() if r.get("kind") == "boarded"}
_WIPED = {y for y, r in _YEARS.items() if r.get("kind") == "absent"}
# Back-compat: older scripts imported _WIPED as “not a hub year”.
_NOT_SHIP = _BOARDED | _WIPED
SHIP_YEARS: list[str] = [
    y for y, r in sorted(_YEARS.items()) if r.get("kind") in ("html", "react")
]


def assert_mutable(year: str) -> None:
    """Frozen years stay playable. Generators may not add a dest folder."""
    rec = _YEARS.get(str(year))
    if rec and rec.get("frozen"):
        raise SystemExit(f"{year} is frozen — no new dest folders")

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
