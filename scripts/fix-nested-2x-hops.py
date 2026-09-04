#!/usr/bin/env python3
"""Rewrite 2× leftover hops on nested dest rooms to the correct ../ depth.

The 2001–2008 href-2× pass wrote href="../slug/file.html" from every dest HTML.
That 404s from dest/sub/... rooms (apple/ipod, yahoo categories, facebook rooms).
Dests / HTML files / leftover writers do not change.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STRIP_RE = re.compile(
    r'(<p[^>]*data-itt-2x-links="[^"]*"[^>]*>)(.*?)(</p>)',
    re.S | re.I,
)
HREF_RE = re.compile(r'href="(\.\./)([^"./][^"]*)"')


def dest_of(path: Path, year: str) -> str | None:
    rel = path.relative_to(ROOT / "years" / year)
    if rel.parts[0] != "sites" or len(rel.parts) < 2:
        return None
    dest = rel.parts[1]
    if dest.endswith(".html"):
        return None
    return dest


def rewrite_inner(inner: str, ups: str) -> str:
    def repl(m: re.Match[str]) -> str:
        return f'href="{ups}{m.group(2)}"'

    return HREF_RE.sub(repl, inner)


def process_year(year: str) -> tuple[int, int]:
    ydir = ROOT / "years" / year / "sites"
    pages = 0
    hrefs = 0
    for path in sorted(ydir.rglob("*.html")):
        dest = dest_of(path, year)
        if not dest:
            continue
        rel = path.relative_to(ydir)
        depth = len(rel.parts)
        if depth <= 2:
            continue
        ups = "../" * (depth - 1)
        html = path.read_text(encoding="utf-8", errors="replace")
        changed = False

        def strip_sub(m: re.Match[str]) -> str:
            nonlocal changed, hrefs
            inner = m.group(2)
            new_inner = rewrite_inner(inner, ups)
            if new_inner != inner:
                changed = True
                hrefs += len(HREF_RE.findall(inner))
            return m.group(1) + new_inner + m.group(3)

        new = STRIP_RE.sub(strip_sub, html)
        if changed:
            path.write_text(new, encoding="utf-8")
            pages += 1
    return pages, hrefs


def count_tree(year: str) -> tuple[int, int]:
    ydir = ROOT / "years" / year
    dests = sum(1 for p in (ydir / "sites").iterdir() if p.is_dir())
    htmls = len(list(ydir.rglob("*.html")))
    return dests, htmls


def main() -> int:
    years = [str(y) for y in range(2001, 2009)]
    print("fix nested 2× hops · dest/HTML freeze")
    for year in years:
        before = count_tree(year)
        pages, hrefs = process_year(year)
        after = count_tree(year)
        if after != before:
            raise SystemExit(f"{year} dest/HTML changed {before} → {after}")
        print(f"  {year} pages={pages} hrefs-rewritten={hrefs} dests={after[0]} html={after[1]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
