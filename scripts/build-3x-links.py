#!/usr/bin/env python3
"""3× discoverable internal links for every playable year (1994–2019).

Adds (or replaces) marked blocks:
  home / about / what's-new / cool  → full site-index + extra-page directory
  every other year HTML             → rotating Also-this-year exits
  js/config/flow-maps-3x.js         → map branch of rooms the year map missed
  years/*/pages/map.html            → loads flow-maps-3x.js

Does not: create HTML rooms, change stars, touch guided <ol>, restore forests,
or invent brand pixels. Re-run is idempotent.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = range(1994, 2010)

MARK_LINKS = ("<!-- ITT-3X-LINKS:start -->", "<!-- ITT-3X-LINKS:end -->")
MARK_ALSO = ("<!-- ITT-3X-ALSO:start -->", "<!-- ITT-3X-ALSO:end -->")

SKIP_NAMES = {
    "404.html",
    "unreachable.html",
    "error.html",
}
SKIP_DIR_PARTS = {"error"}

HREF_RE = re.compile(r"""href=["']([^"'#?]+)""", re.I)
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)
BODY_RE = re.compile(r"</body\s*>", re.I)


def pretty(name: str, title: str | None = None) -> str:
    if title:
        t = re.sub(r"\s+", " ", title).strip()
        t = re.split(r"\s+[—\-|·:]\s+", t, maxsplit=1)[0].strip()
        if 1 < len(t) < 42:
            return t
    return name.replace("-", " ").replace("_", " ")


def is_year_html(path: Path, year: int) -> bool:
    if path.suffix.lower() != ".html":
        return False
    if path.name.lower() in SKIP_NAMES:
        return False
    if any(p in SKIP_DIR_PARTS for p in path.parts):
        return False
    # year chrome shell, not a content room
    if path == ROOT / "years" / str(year) / "index.html":
        return False
    return True


def site_inventory(year: int):
    ydir = ROOT / "years" / str(year)
    sites = ydir / "sites"
    rooms: list[tuple[str, Path]] = []
    extras: dict[str, list[Path]] = {}
    titles: dict[str, str] = {}
    if sites.exists():
        for d in sorted(p for p in sites.iterdir() if p.is_dir()):
            idx = d / "index.html"
            if not idx.exists():
                # lean rooms sometimes use a named page only
                kids = sorted(p for p in d.glob("*.html") if is_year_html(p, year))
                if not kids:
                    continue
                idx = kids[0]
            rooms.append((d.name, idx))
            titles[d.name] = ""
            m = TITLE_RE.search(idx.read_text(encoding="utf-8", errors="ignore"))
            if m:
                titles[d.name] = re.sub(r"\s+", " ", m.group(1)).strip()
            extra = []
            for p in sorted(d.glob("*.html")):
                if p.resolve() == idx.resolve():
                    continue
                if not is_year_html(p, year):
                    continue
                extra.append(p)
            extras[d.name] = extra[:3]
    pages = []
    pdir = ydir / "pages"
    if pdir.exists():
        for p in sorted(pdir.glob("*.html")):
            if is_year_html(p, year):
                pages.append(p)
    return rooms, extras, titles, pages


def rel_from(src: Path, dest: Path) -> str:
    return Path(os.path.relpath(dest, src.parent)).as_posix()


def existing_hrefs(text: str) -> set[str]:
    return {m.group(1) for m in HREF_RE.finditer(text)}


def strip_block(text: str, marks: tuple[str, str]) -> str:
    start, end = marks
    if start in text and end in text:
        a = text.index(start)
        b = text.index(end) + len(end)
        return (text[:a] + text[b:]).replace("\n\n\n\n", "\n\n")
    return text


def insert_before_body(text: str, block: str) -> str:
    m = BODY_RE.search(text)
    if not m:
        return text.rstrip() + "\n" + block + "\n"
    return text[: m.start()] + block + "\n" + text[m.start() :]


def home_block(year: int, src: Path, rooms, extras, titles) -> str:
    bits = []
    for name, idx in rooms:
        href = rel_from(src, idx)
        bits.append(f'<a href="{href}">{pretty(name, titles.get(name))}</a>')
        for extra in extras.get(name, [])[:2]:
            eh = rel_from(src, extra)
            label = extra.stem.replace("-", " ")
            bits.append(f'<a href="{eh}">{pretty(name)} · {label}</a>')
    joined = " ·\n ".join(bits)
    return (
        f"{MARK_LINKS[0]}\n"
        f'<nav class="itt-3x-links" data-itt-3x-links data-itt-year="{year}" '
        f'style="margin:12px 0;padding:10px;border:1px dashed #666;'
        f'font-family:Arial,sans-serif;font-size:11px;line-height:1.75;max-width:54em">'
        f"<b>More rooms this year · 3×</b>"
        f'<p style="margin:4px 0 0;color:#444">Existing rooms only · no new forest · star unchanged</p>'
        f'<p style="margin:6px 0 0">\n {joined}\n</p>\n'
        f"</nav>\n"
        f"{MARK_LINKS[1]}\n"
    )


def also_block(year: int, src: Path, rooms, extras, titles, this_site: str | None) -> str:
    names = [n for n, _ in rooms]
    if not names:
        return ""
    digest = hashlib.md5(str(src.relative_to(ROOT)).encode()).hexdigest()
    offset = int(digest[:8], 16)
    n = max(12, min(24, max(8, len(names) // 3)))
    picks = []
    for i in range(len(names)):
        name = names[(offset + i) % len(names)]
        if name == this_site:
            continue
        picks.append(name)
        if len(picks) >= n:
            break
    bits = []
    home = ROOT / "years" / str(year) / "pages" / "home.html"
    amap = ROOT / "years" / str(year) / "pages" / "map.html"
    if home.exists():
        bits.append(f'<a href="{rel_from(src, home)}">Starting Point</a>')
    if amap.exists():
        bits.append(f'<a href="{rel_from(src, amap)}">Year flow map</a>')
    if this_site and extras.get(this_site):
        for extra in extras[this_site][:4]:
            if extra.resolve() == src.resolve():
                continue
            bits.append(
                f'<a href="{rel_from(src, extra)}">{pretty(this_site, titles.get(this_site))} · {extra.stem}</a>'
            )
    room_lookup = {n: p for n, p in rooms}
    for name in picks:
        bits.append(
            f'<a href="{rel_from(src, room_lookup[name])}">{pretty(name, titles.get(name))}</a>'
        )
    joined = " ·\n ".join(bits)
    return (
        f"{MARK_ALSO[0]}\n"
        f'<nav class="itt-3x-also" data-itt-3x-also data-itt-year="{year}" '
        f'style="margin:12px 0;padding:8px;border:1px dashed #888;'
        f'font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em">'
        f"<b>Also this year · 3×</b>"
        f'<p style="margin:6px 0 0">\n {joined}\n</p>\n'
        f"</nav>\n"
        f"{MARK_ALSO[1]}\n"
    )


def patch_file(path: Path, marks: tuple[str, str], block: str) -> bool:
    if not block:
        return False
    text = path.read_text(encoding="utf-8", errors="ignore")
    text = strip_block(text, marks)
    new = insert_before_body(text, block)
    if new != path.read_text(encoding="utf-8", errors="ignore"):
        path.write_text(new, encoding="utf-8")
        return True
    return False


def this_site_of(path: Path, year: int) -> str | None:
    parts = path.parts
    try:
        i = parts.index("sites")
    except ValueError:
        return None
    if i + 1 < len(parts):
        return parts[i + 1]
    return None


def lobby_names(path: Path) -> bool:
    if path.parent.name != "pages":
        return False
    return path.name in {"home.html", "about.html", "whats-new.html", "cool.html"}


def write_flow_maps_3x(payload: dict) -> None:
    out = ROOT / "js" / "config" / "flow-maps-3x.js"
    lines = [
        "/**",
        " * Extra flow-map leaves — existing rooms not already on the year map.",
        " * Generated by scripts/build-3x-links.py. Do not invent pages.",
        " */",
        "(function (global) {",
        '  "use strict";',
        "  var ITT = global.ITT || (global.ITT = {});",
        "  var extra = " + json.dumps(payload, indent=2, sort_keys=True) + ";",
        "  Object.keys(extra).forEach(function (y) {",
        "    var m = ITT.flowMaps && ITT.flowMaps[y];",
        "    if (!m || !extra[y] || !extra[y].length) return;",
        "    m.branches = m.branches || [];",
        "    var i;",
        "    for (i = m.branches.length - 1; i >= 0; i--) {",
        '      if (m.branches[i] && m.branches[i].label === "More rooms · 3×") m.branches.splice(i, 1);',
        "    }",
        "    m.branches.push({",
        '      label: "More rooms · 3×",',
        '      do: "Existing rooms this year — no new forest",',
        "      sites: extra[y]",
        "    });",
        "  });",
        "})(typeof window !== \"undefined\" ? window : this);",
        "",
    ]
    out.write_text("\n".join(lines), encoding="utf-8")


def already_mapped_hrefs(year: int) -> set[str]:
    src = (ROOT / "js" / "config" / "flow-maps.js").read_text(encoding="utf-8", errors="ignore")
    # crude: collect sites/...html strings near this year block
    key = f'ITT.flowMaps["{year}"]'
    i = src.find(key)
    if i < 0:
        return set()
    j = src.find("ITT.flowMaps[", i + 10)
    chunk = src[i : j if j > i else i + 20000]
    return set(re.findall(r"sites/[A-Za-z0-9_./-]+\.html", chunk))


def patch_map_html(year: int) -> None:
    path = ROOT / "years" / str(year) / "pages" / "map.html"
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8", errors="ignore")
    needle = '<script src="../../../js/config/flow-maps.js"></script>'
    add = '<script src="../../../js/config/flow-maps-3x.js"></script>'
    if add in text:
        return
    if needle in text:
        path.write_text(text.replace(needle, needle + "\n" + add, 1), encoding="utf-8")


def main() -> None:
    map_payload = {}
    stats = []
    for year in YEARS:
        ydir = ROOT / "years" / str(year)
        if not ydir.exists():
            continue
        rooms, extras, titles, pages = site_inventory(year)
        mapped = already_mapped_hrefs(year)
        extra_sites = []
        for name, idx in rooms:
            href = f"sites/{name}/{idx.name}"
            # normalize to sites/name/index.html when that is the file
            rel = idx.relative_to(ydir).as_posix()
            if rel in mapped or href in mapped:
                continue
            extra_sites.append(
                {
                    "name": pretty(name, titles.get(name)),
                    "href": rel,
                    "do": "Existing room · 3× link pass",
                }
            )
        map_payload[str(year)] = extra_sites

        changed = 0
        also_pages = 0
        for html in sorted(ydir.rglob("*.html")):
            if not is_year_html(html, year):
                continue
            if lobby_names(html):
                if patch_file(html, MARK_LINKS, home_block(year, html, rooms, extras, titles)):
                    changed += 1
            else:
                if patch_file(
                    html,
                    MARK_ALSO,
                    also_block(year, html, rooms, extras, titles, this_site_of(html, year)),
                ):
                    also_pages += 1
        patch_map_html(year)
        stats.append((year, len(rooms), changed, also_pages, len(extra_sites)))

    write_flow_maps_3x(map_payload)
    print("year\trooms\tlobby_patched\talso_pages\tmap_new")
    for row in stats:
        print("\t".join(str(x) for x in row))


if __name__ == "__main__":
    main()
