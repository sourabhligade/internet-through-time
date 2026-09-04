#!/usr/bin/env python3
"""Shared leftover-dest helpers (one write path for densify scripts).

Does not invent dest copy. Callers pass year-true title/body/verb.
Never overwrites an existing dest file (upgrade scripts own verb quality).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Dest-folder slugs that are year-true leftover dests, not factory codes.
SLUG_LABEL = {
    "amz": "Amazon",
    "pp": "PayPal",
    "ps": "PlayStation",
    "nfx": "Netflix",
    "li": "LinkedIn",
    "wiki": "Wikipedia",
    "ig": "Instagram",
    "fb": "Facebook",
    "yt": "YouTube",
    "wa": "WhatsApp",
    "gplus": "Google+",
    "googleplus": "Google+",
}


def dest_label(dest: Path) -> str:
    """Readable leftover dest label. Existing dests only. No invented copy."""
    slug = dest.parent.name if dest.stem in ("index", "more", "home", "about") else dest.stem
    if slug in SLUG_LABEL:
        return SLUG_LABEL[slug]
    text = dest.read_text(encoding="utf-8", errors="replace")
    m = re.search(r"<h1[^>]*>(.*?)</h1>", text, re.I | re.S) or re.search(
        r"<title>(.*?)</title>", text, re.I | re.S
    )
    raw = re.sub(r"<[^>]+>", "", m.group(1) if m else slug)
    t = re.sub(r"\s+", " ", raw).strip()
    t = re.sub(r"\s*[—–|:]\s*\d{4}\b.*$", "", t).strip()
    if re.search(r"continuity leftover", t, re.I) or not t or t.lower() == slug.lower():
        t = SLUG_LABEL.get(slug, slug.replace("-", " "))
        t = t[:1].upper() + t[1:] if t else slug
    return t[:42].rstrip()


def append_matrix_row(rows: list, have: set, year: str, path: str, key: str, kind: str, title: str, nxt: str, label: str) -> int:
    if (year, key) in have:
        return 0
    rows.append(
        {
            "year": year,
            "path": path,
            "key": key,
            "kind": kind,
            "title": title,
            "next": nxt,
            "nextLabel": label,
        }
    )
    have.add((year, key))
    return 1


def write_matrix(rows: list) -> None:
    (ROOT / "e2e" / "2x-links.matrix.json").write_text(
        json.dumps(rows, indent=2) + "\n", encoding="utf-8"
    )


def prepend_rooms(year: str, paths: list[str]) -> None:
    cfg = ROOT / f"js/config/{year}.js"
    t = cfg.read_text(encoding="utf-8")
    for p in reversed(paths):
        line = f'    "{p}",\n'
        if line not in t:
            t = t.replace("  var rooms = [\n", "  var rooms = [\n" + line, 1)
    cfg.write_text(t, encoding="utf-8")


def add_location_hints(year: str, hints: list[tuple[str, str]]) -> None:
    cfg = ROOT / f"js/config/{year}.js"
    t = cfg.read_text(encoding="utf-8")
    if "locationHints:" not in t:
        return
    for slug, re_s in reversed(hints):
        line = f'      {{ re: /{re_s}/i, path: "sites/{slug}/index.html" }},\n'
        if line not in t:
            t = t.replace("    locationHints: [\n", "    locationHints: [\n" + line, 1)
    cfg.write_text(t, encoding="utf-8")


def write_if_missing(dest: Path, html: str) -> bool:
    """Write dest HTML only when the file does not already exist."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        return False
    dest.write_text(html, encoding="utf-8")
    return True


def add_home_strip(year: str, prefix: str, slugs: list[tuple[str, str]], star_rel: str) -> None:
    home = ROOT / f"years/{year}/pages/home.html"
    if not home.exists() or not slugs:
        return
    ht = home.read_text(encoding="utf-8")
    mark = f"ITT-2X-{year}-ADD"
    links = " · ".join(
        f'<a href="../sites/{slug}/index.html" data-trail-keys="itt{prefix}-{suf}">{slug} leftover</a>'
        for slug, suf in slugs
    )
    strip = (
        f"<!-- {mark}:start -->\n"
        f'<p class="itt-2x-trails" id="ott-2x-{year}-add" '
        'style="margin:10px auto;padding:10px;background:#fff3e0;border:1px solid #ef6c00;'
        'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>More {year} leftover dests</b> (not the chip · incomplete never writes): "
        + links
        + f' · <a href="../{star_rel}">★ year star</a></p>\n'
        f"<!-- {mark}:end -->\n"
    )
    if f"{mark}:start" in ht:
        ht = re.sub(
            rf"<!-- {mark}:start -->.*?<!-- {mark}:end -->\n",
            strip,
            ht,
            count=1,
            flags=re.S,
        )
    else:
        ht = ht.replace("</body>", strip + "</body>", 1)
    home.write_text(ht, encoding="utf-8")


def add_map_block(year: str, items: list[str]) -> None:
    mp = ROOT / f"years/{year}/pages/map.html"
    if not mp.exists() or not items:
        return
    mt = mp.read_text(encoding="utf-8")
    mark = f"ITT-2X-{year}-ADD-MAP"
    block = (
        f"<!-- {mark}:start -->\n"
        f'<div class="itt-2x-map" data-itt-2x-add-map="{year}" '
        'style="margin:12px auto;padding:10px;border:1px dashed #ef6c00;'
        'font-family:Arial,sans-serif;font-size:12px;max-width:46em">'
        f"<b>More {year} leftover map</b> (not the chip · incomplete never writes)<ul>\n"
        + "\n".join(items)
        + f"\n</ul></div>\n<!-- {mark}:end -->\n"
    )
    if f"{mark}:start" in mt:
        mt = re.sub(
            rf"<!-- {mark}:start -->.*?<!-- {mark}:end -->\n",
            block,
            mt,
            count=1,
            flags=re.S,
        )
    else:
        mt = mt.replace("</body>", block + "</body>", 1)
    mp.write_text(mt, encoding="utf-8")
