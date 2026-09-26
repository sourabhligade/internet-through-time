#!/usr/bin/env python3
"""Leftover-3× unique dest links.

2× unique dest slugs in leftover-3× unique dest rails. One dest once.
Dests already on disk. KEEP original leftover-3× unique dests.
Leftover-3× unique dest-true dests stay. Official dest leftover-3× first paint 0.
Do not dest-farm dest folders. Do not grow leftover-3× unique dest-true dests
past 2018=3 / 2021=5. Skip 2017 leftover-20, forests, 2009, 2023–2025.
Do not write dest-true leftover dest I/O.
Cite: docs/LEFTOVER-3X-UNIQUE-LINKS.md
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from itt_leftover_dest import dest_label  # noqa: E402

OFF_KEY = re.compile(r"data-official-key=")
BLOCK = re.compile(
    r"<!-- ITT-3X-UNIQUE-LINKS:\d{4}:start -->[\s\S]*?<!-- ITT-3X-UNIQUE-LINKS:\d{4}:end -->"
)
P_RAIL = re.compile(
    r"<p[^>]*(?:data-itt-3x-unique-links)[^>]*>[\s\S]*?</p>",
    re.I,
)

# KEEP original leftover-3× unique dests (leftover-3× unique dest-true dests stay).
KEEP: dict[str, list[str]] = {
    "2007": [
        "wiki", "myspace", "maps", "ebay", "stumble", "wow", "flickr", "reddit", "digg"
    ],
    "2010": [
        "netflix", "tumblr", "formspring", "chrome", "wave", "android", "reddit",
        "google", "groupon",
    ],
    "2011": [
        "icloud", "pinterest", "linkedin", "kindlefire", "minecraft", "twitch",
        "youtube", "dropbox", "hulu",
    ],
    "2012": [
        "drawsomething", "googledrive", "snapchat", "uber", "buzzfeed", "youtube",
        "reddit", "surface", "windows8",
    ],
    "2013": [
        "askfm", "whisper", "youtube", "chrome", "medium", "yikyak", "reddit",
        "facebook", "twitter",
    ],
    "2014": [
        "snapchat", "instagram", "uber", "twitter", "musically14", "truecrypt",
        "facebook", "wikipedia", "youtube",
    ],
    "2015": [
        "instagram", "spotify", "netflix", "meerkat", "applemusicsub", "win10get",
        "vine", "echo", "youtube",
    ],
    "2016": [
        "slack", "reddit", "netflix", "youtube", "alphago", "assistant", "dyn",
        "fblive", "moments",
    ],
    "2018": ["reddit", "youtube", "wikipedia"],
    "2019": [
        "amazon", "facebook", "google", "instagram", "nyt", "oculusquest",
        "twitter", "yahoo", "youtube",
    ],
    "2020": [
        "amazon", "facebook", "google", "instagram", "youtube", "slack", "reddit",
        "wikipedia", "nyt",
    ],
    "2021": ["amazon", "google", "instagram", "twitter", "youtube"],
    "2022": [
        "amazon", "google", "instagram", "facebook", "youtube", "reddit",
        "wikipedia", "netflix", "nyt",
    ],
}

# Cited ADD. Leftover dest KEEP dest-disjoint first, then official dest hrefs
# already on disk (T6) where the KEEP set cannot reach 2×. Not leftover-4×.
# Not 123-reg. Not new dest folders. Stars and playable stay out of the rail.
CITED_ADD: dict[str, list[str]] = {
    "2007": [
        "hackernews", "friendfeed", "netflix", "appletv", "ipodtouch", "justintv",
        "icanhas", "funnyordie", "pownce",
    ],
    "2010": [
        "flipboard", "minecraft", "hulu", "angry", "googlebuzz", "chromewebstore",
        "kinect", "cityville", "ibooks",
    ],
    "2011": [
        "snapchat", "ios5", "imessage", "gmusic", "pandora", "wechat", "line",
        "stripe", "codecademy",
    ],
    "2012": [
        "tinder", "duolingo", "coursera", "udacity", "edx", "nexus7", "jellybean",
        "ios6", "googleplay",
    ],
    "2013": [
        "bitcoin", "chromecast", "doordash", "bustle", "giphy", "patreon", "kahoot",
        "kitkat", "ios7",
    ],
    "2014": [
        "alibabaipo", "oculusfb", "inbox", "echo", "flappybird", "game2048", "ios8",
        "heartbleed", "icebucket",
    ],
    "2015": [
        "applewatch", "ios9", "ethereum", "k8s", "marshmallow", "ipadpro",
        "androidpay", "applenews", "beats1",
    ],
    "2016": [
        "douyin", "airpods", "allo", "daydream", "ethereum", "figma", "googlehome",
        "ios10", "letsencrypt",
    ],
    "2018": ["gplusgone", "epicstore", "ios12"],
    "2019": [
        "apex", "airpods2", "android10", "applewatch5", "catalina", "galaxyfold",
        "ios13", "ipados", "sekiro",
    ],
    "2020": [
        "clubhouse", "hbomax", "peacock", "animalcrossing", "houseparty", "netflix",
        "tiktok", "amongus", "discord",
    ],
    "2021": ["nft", "coinbaseipo", "epicapple", "windows11", "meta"],
    "2022": [
        "temu", "stablediff", "midjourney", "dalle2", "ios16", "m2",
        "wordle", "bereal", "ftx",
    ],
}

WANT_AFTER = {
    "2007": 18,
    "2010": 18,
    "2011": 18,
    "2012": 18,
    "2013": 18,
    "2014": 18,
    "2015": 18,
    "2016": 18,
    "2018": 6,
    "2019": 18,
    "2020": 18,
    "2021": 10,
    "2022": 18,
}

WAREHOUSE = {"123-reg", "a21-inc", "123reg"}
LO4X_2012 = {"chrome", "twitter", "soundcloud"}


def dest_has_index(year: str, slug: str) -> bool:
    return (ROOT / "years" / year / "sites" / slug / "index.html").is_file()


def official_slugs(year: str) -> set[str]:
    trails = ROOT / "js" / "config" / "flow-trails.js"
    text = trails.read_text(encoding="utf-8", errors="replace")
    m = re.search(rf'"{year}"\s*:\s*\[', text)
    if not m:
        return set()
    i = m.end()
    depth = 1
    while i < len(text) and depth:
        if text[i] == "[":
            depth += 1
        elif text[i] == "]":
            depth -= 1
        i += 1
    chunk = text[m.end() : i]
    out = set()
    for stop in re.finditer(
        r'\{\s*"n":\s*(\d+),\s*"name":\s*"[^"]*",\s*"href":\s*"sites/([^/]+)/',
        chunk,
    ):
        if 1 <= int(stop.group(1)) <= 10:
            out.add(stop.group(2))
    return out


def unique_dests(year: str) -> list[str]:
    keep = KEEP.get(year, [])
    add = CITED_ADD.get(year, [])
    out: list[str] = []
    have: set[str] = set()
    for s in keep + add:
        if s in have:
            continue
        if s in WAREHOUSE:
            continue
        if year == "2012" and s in LO4X_2012:
            continue
        if not dest_has_index(year, s):
            continue
        have.add(s)
        out.append(s)
    return out


def official_dest_html(year: str, path: Path, html: str, off: set[str]) -> bool:
    if OFF_KEY.search(html):
        return True
    m = re.search(r"/sites/([^/]+)/", path.as_posix())
    if m and m.group(1) in off:
        return True
    return False


def is_start_or_pages(year: str, path: Path) -> bool:
    return f"/years/{year}/pages/" in path.as_posix()


def rail_html(year: str, dests: list[str], from_slug: str | None) -> str:
    bits = [
        f'<p class="itt-3x-unique-links" data-itt-3x-unique-links="{year}" '
        'style="margin:12px auto;padding:8px;border:1px dashed #888;'
        'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
        f"<b>Also this year · leftover-3× unique dest links</b> "
        "(not the chip · one dest once)"
    ]
    for slug in dests:
        if from_slug and slug == from_slug:
            continue
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        if not dest.is_file():
            continue
        name = dest_label(dest)
        bits.append(f' · <a href="../{slug}/index.html">{name}</a>')
    bits.append("</p>")
    inner = "".join(bits)
    return (
        f"<!-- ITT-3X-UNIQUE-LINKS:{year}:start -->{inner}"
        f"<!-- ITT-3X-UNIQUE-LINKS:{year}:end -->"
    )


def strip_rails(html: str) -> str:
    html = BLOCK.sub("", html)
    html = P_RAIL.sub("", html)
    return html


def has_leftover_3x_unique_rail(html: str) -> bool:
    return "ITT-3X-UNIQUE-LINKS" in html or "data-itt-3x-unique-links" in html


def inject_or_replace(html: str, rail: str) -> str:
    html = strip_rails(html)
    if re.search(r"<!-- ITT-2X-LINKS:", html):
        return re.sub(r"<!-- ITT-2X-LINKS:", rail + "<!-- ITT-2X-LINKS:", html, count=1)
    if re.search(r"</body>", html, re.I):
        return re.sub(r"</body>", rail + "</body>", html, count=1, flags=re.I)
    return html + rail


def write_catalog(catalog: dict[str, list[dict]]) -> None:
    write_js(catalog)
    matrix = []
    for year, rows in catalog.items():
        matrix.append(
            {
                "year": year,
                "dests": [r["id"] for r in rows],
                "n": len(rows),
                "keep": KEEP.get(year, []),
                "add": [s for s in CITED_ADD.get(year, []) if s in {r["id"] for r in rows}],
            }
        )
    (ROOT / "e2e" / "leftover-3x-unique-links.matrix.json").write_text(
        json.dumps(matrix, indent=2) + "\n", encoding="utf-8"
    )


def write_js(catalog: dict[str, list[dict]]) -> None:
    lines = [
        "/** Leftover-3× unique dest links — one dest once. Dests already on disk. */",
        "(function (global) {",
        '  "use strict";',
        "  var ITT = global.ITT || (global.ITT = {});",
        "  ITT.leftover3xUniqueLinks = ",
        json.dumps(catalog, indent=2),
        ";",
        "})(typeof window !== \"undefined\" ? window : this);",
        "",
    ]
    (ROOT / "js" / "config" / "leftover-3x-unique-links.js").write_text(
        "\n".join(lines), encoding="utf-8"
    )


def build_catalog() -> dict[str, list[dict]]:
    catalog: dict[str, list[dict]] = {}
    for year in KEEP:
        dests = unique_dests(year)
        rows = []
        for s in dests:
            dest = ROOT / "years" / year / "sites" / s / "index.html"
            name = dest_label(dest) if dest.is_file() else s
            rows.append({"id": s, "name": name})
        catalog[year] = rows
    return catalog


def rewrite_dest_html(catalog: dict[str, list[dict]]) -> tuple[int, int, int]:
    rewritten = 0
    injected = 0
    stripped_official = 0
    keep_years = set(KEEP)
    for year in keep_years:
        dests = [r["id"] for r in catalog[year]]
        keep_slugs = set(KEEP[year])
        year_root = ROOT / "years" / year
        if not year_root.is_dir():
            continue
        off = official_slugs(year)
        htmls = list(year_root.rglob("*.html")) + list(year_root.rglob("*.htm"))
        for path in htmls:
            html = path.read_text(encoding="utf-8", errors="replace")
            orig = html
            if is_start_or_pages(year, path):
                if has_leftover_3x_unique_rail(html):
                    html = strip_rails(html)
                    if html != orig:
                        path.write_text(html, encoding="utf-8")
                        stripped_official += 1
                continue
            from_slug = None
            m = re.search(r"/sites/([^/]+)/", path.as_posix())
            if m:
                from_slug = m.group(1)
            if official_dest_html(year, path, html, off):
                if has_leftover_3x_unique_rail(html):
                    html = strip_rails(html)
                    if html != orig:
                        path.write_text(html, encoding="utf-8")
                        stripped_official += 1
                continue
            if from_slug not in keep_slugs:
                if has_leftover_3x_unique_rail(html):
                    html = strip_rails(html)
                    if html != orig:
                        path.write_text(html, encoding="utf-8")
                        rewritten += 1
                continue
            rail = rail_html(year, dests, from_slug)
            if has_leftover_3x_unique_rail(html):
                html = inject_or_replace(html, rail)
                if html != orig:
                    path.write_text(html, encoding="utf-8")
                    rewritten += 1
            else:
                html = inject_or_replace(html, rail)
                if html != orig:
                    path.write_text(html, encoding="utf-8")
                    injected += 1
    return rewritten, injected, stripped_official


def main() -> int:
    catalog_only = "--catalog-only" in sys.argv
    catalog = build_catalog()
    write_catalog(catalog)
    rewritten = injected = stripped_official = 0
    if not catalog_only:
        rewritten, injected, stripped_official = rewrite_dest_html(catalog)
        print(
            f"rewrote leftover dest leftover-3× unique dest links {rewritten} · "
            f"injected {injected} · stripped official dest leftover-3× unique dest links {stripped_official}"
        )
    else:
        print("catalog only · dest HTML unchanged")
    for year in sorted(catalog):
        n = len(catalog[year])
        want = WANT_AFTER.get(year)
        mark = "" if want is None or n == want else f" (want {want})"
        print(f"  {year} leftover-3× unique dest links {n}{mark}")
        if want is not None and n != want:
            print(f"    FAIL leftover-3× unique dest links after {n} want {want}", file=sys.stderr)
            return 1
    return 0


if __name__ == "__main__":
    raise SystemExit("leftover-3× unique links were removed. This script does not write them back.")
