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

# Hub-open years on disk (1994–2016). Keep smoke / check-all-years / ci in sync.
SHIP_YEARS: list[str] = [str(y) for y in range(1994, 2017)]

_URLMAP_START = re.compile(r"\burlMap\s*:\s*\{")
_URLMAP_KEY = re.compile(r'^\s*"([^"]+)"\s*:', re.M)


def urlmap_keys_from_source(text: str) -> list[str] | None:
    """Keys of the first `urlMap: { ... }` object, or None if missing."""
    m = _URLMAP_START.search(text)
    if not m:
        return None
    i = m.end()
    depth = 1
    body_chars: list[str] = []
    n = len(text)
    while i < n and depth:
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
        if depth:
            body_chars.append(c)
        i += 1
    if depth != 0:
        return None
    return _URLMAP_KEY.findall("".join(body_chars))


@lru_cache(maxsize=None)
def urlmap_keys(year: str) -> list[str] | None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.is_file():
        return None
    return urlmap_keys_from_source(cfg.read_text(encoding="utf-8", errors="replace"))


def dump_urlmaps(years: list[str] | None = None) -> dict[str, list[str] | None]:
    years = years or SHIP_YEARS
    return {y: urlmap_keys(y) for y in years}
