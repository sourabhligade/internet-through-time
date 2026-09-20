#!/usr/bin/env python3
"""Convert year-true PACK mock machines to dest-true leftover I/O.

Official dests: strip pack (gold I/O is official-verb).
Leftover dests that already have dest-true leftover: strip pack (duplicate mock).
Pack-only leftover dests: rewire pack chrome to leftover-official dest-true.
Never writes the star. Never dest-farms new dest folders.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKS = json.loads((ROOT / "js/config/year-true-packs.json").read_text(encoding="utf-8"))

STAR_TRAP = {
    "1994": "CSotD guestbook",
    "1995": "Amazon SSL checkout",
    "1996": "Portal wars",
    "1997": "PointCast",
    "1998": "I'm Feeling Lucky",
    "1999": "AIM",
    "2000": "MapQuest",
    "2004": "thefacebook networks",
    "2005": "YouTube upload",
    "2006": "Twttr",
    "2008": "GitHub issue",
}

PACK_TABLE = re.compile(
    r"<table\b[^>]*>\s*<tr>\s*<td\b[^>]*\bdata-itt-pack\b[^>]*>.*?</td>\s*</tr>\s*</table>",
    re.S | re.I,
)
PACK_TD_OPEN = re.compile(
    r"<td\b([^>]*\bdata-itt-pack\b[^>]*)>",
    re.I,
)


def strip_pack_widget(html: str) -> str:
    html, n = PACK_TABLE.subn("", html, count=8)
    if n:
        return html
    html = re.sub(r"\sdata-itt-pack(?:-type)?=\"[^\"]*\"", "", html)
    html = re.sub(r"\sdata-pack-skin=\"[^\"]*\"", "", html)
    return html


def dest_true_leftover(html: str) -> bool:
    return bool(re.search(r'data-lo-panel="1"[^>]*data-itt-dest-true="1"|data-itt-dest-true="1"[^>]*data-lo-panel="1"', html))


def convert_pack_td(html: str, year: str, slug: str, ptype: str, title: str) -> str:
    trap = STAR_TRAP.get(year, "year star")
    m = PACK_TD_OPEN.search(html)
    if not m:
        return html
    attrs = m.group(1)
    attrs = re.sub(r"\sdata-itt-pack(?:-type)?=\"[^\"]*\"", "", attrs)
    attrs = re.sub(r"\sdata-pack-skin=\"[^\"]*\"", "", attrs)
    attrs += f' data-lo-panel="1" data-itt-dest-true="1" data-itt-year="{year}"'
    html = html[: m.start()] + "<td" + attrs + ">" + html[m.end() :]

    if ptype == "fillGo":
        html = re.sub(
            r"<button type=\"button\" data-pack-go>([^<]*)</button>",
            rf'<button type="button" data-lo-pick="keep">\1 leftover</button>'
            rf'<button type="button" data-lo-pick="trap" data-lo-trap>{trap} as gold (trap)</button>'
            rf'<button type="button" data-lo-save data-lo-key="{slug}" data-lo-need-pick="keep">\1</button>',
            html,
            count=1,
        )
        html = html.replace("data-pack-q", "data-lo-field")
    elif ptype == "pickStart":
        html = re.sub(
            r'(<button type="button" data-pack-pick=")([^"]+)(">[^<]*</button>)',
            lambda mm: (
                f'<button type="button" data-lo-pick="keep">{mm.group(0)[mm.group(0).find(">")+1:-9]} leftover</button>'
                if mm.start() == html.find("data-pack-pick")
                else f'<button type="button" data-lo-pick="trap" data-lo-trap>{trap} as gold (trap)</button>'
            ),
            html,
            count=4,
        )
        html = re.sub(
            r"<button type=\"button\" data-pack-start>([^<]*)</button>",
            rf'<button type="button" data-lo-save data-lo-key="{slug}" data-lo-need-pick="keep">\1</button>',
            html,
            count=1,
        )
    else:
        html = re.sub(
            r"<button type=\"button\" data-pack-a>([^<]*)</button>",
            r'<button type="button" data-lo-pick="keep">\1 leftover</button>',
            html,
            count=1,
        )
        html = re.sub(
            r"<button type=\"button\" data-pack-b>([^<]*)</button>",
            rf'<button type="button" data-lo-pick="trap" data-lo-trap>{trap} as gold (trap)</button>'
            rf'<button type="button" data-lo-save data-lo-key="{slug}" data-lo-need-pick="keep">\1</button>',
            html,
            count=1,
        )

    html = html.replace("data-pack-req", "data-lo-req")
    html = html.replace("data-pack-field", "data-lo-field")
    html = html.replace("data-pack-status", "data-lo-status")
    html = html.replace("data-pack-stage", "data-lo-stage")
    html = re.sub(r"\sdata-itt-pack(?:-type)?=\"[^\"]*\"", "", html)
    html = re.sub(r"\sdata-pack-skin=\"[^\"]*\"", "", html)
    return html


def dest_true_existing_lo_panel(html: str) -> str:
    def add_true(m: re.Match[str]) -> str:
        tag = m.group(0)
        if "data-itt-dest-true" in tag:
            return tag
        return tag[:-1] + ' data-itt-dest-true="1">'

    html = re.sub(r"<[^>]*\bdata-lo-panel=\"1\"[^>]*>", add_true, html, count=4)
    # first leftover save without field: inject field before save if missing in that panel is hard;
    # add a field next to first data-lo-save if no data-lo-field in file
    if "data-lo-field" not in html and "data-lo-save" in html:
        html = re.sub(
            r"(<button type=\"button\" data-lo-save)",
            r'<p><input type="text" data-lo-field maxlength="80" placeholder="leftover" autocomplete="off"></p>\n\1',
            html,
            count=1,
        )
    if "data-lo-pick" not in html and "data-lo-save" in html:
        html = re.sub(
            r"(<button type=\"button\" data-lo-save)",
            r'<p><button type="button" data-lo-pick="keep">Keep leftover</button>'
            r'<button type="button" data-lo-pick="trap" data-lo-trap>Star as gold (trap)</button></p>\n\1',
            html,
            count=1,
        )
        html = re.sub(
            r'(data-lo-save data-lo-key="[^"]+")',
            r'\1 data-lo-need-pick="keep"',
            html,
            count=1,
        )
    return html


def main() -> None:
    n_strip_off = n_strip_dup = n_convert = n_true = 0
    for p in PACKS:
        path = ROOT / p["path"].lstrip("/")
        if not path.is_file():
            print("missing", p["path"])
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        if "data-itt-pack" not in html:
            continue
        official = 'data-official-key="' in html
        if official:
            html = strip_pack_widget(html)
            n_strip_off += 1
            print("strip-official", p["year"], p["id"])
        elif dest_true_leftover(html):
            html = strip_pack_widget(html)
            n_strip_dup += 1
            print("strip-dup", p["year"], p["id"])
        else:
            html = convert_pack_td(html, p["year"], p["id"], p["type"], p["title"])
            if "data-lo-panel" in html and "data-itt-dest-true" not in html:
                html = dest_true_existing_lo_panel(html)
                n_true += 1
            n_convert += 1
            print("convert", p["year"], p["id"], p["type"])
        if "data-itt-pack" in html:
            html = re.sub(r"\sdata-itt-pack(?:-type)?=\"[^\"]*\"", "", html)
            html = re.sub(r"\sdata-pack-skin=\"[^\"]*\"", "", html)
        path.write_text(html, encoding="utf-8")
    print(
        f"done strip-official={n_strip_off} strip-dup={n_strip_dup} convert={n_convert} dest-true={n_true}"
    )


if __name__ == "__main__":
    main()
