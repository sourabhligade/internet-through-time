#!/usr/bin/env python3
"""Wrap original leftover rooms that share a dest with leftover-3×."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = [1994, 1995, 1996, 1997, 1998, 2016, 2017, 2019, 2021, 2022]
TAG = re.compile(r"</?([a-zA-Z][\w:-]*)([^>]*)>", re.S)
VOID = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


def unkeyed_go(tag: str, attrs: str) -> bool:
    if "data-pop-go" not in attrs:
        return False
    if re.search(r"data-pop-key\s*=", attrs):
        return False
    return tag.lower() in {"button", "a", "input"}


def wrap_html(html: str) -> tuple[str, int]:
    if "data-itt-lo3x" not in html:
        return html, 0
    stack: list[tuple[int, int, str, str]] = []
    adds: list[int] = []
    for m in TAG.finditer(html):
        raw = m.group(0)
        name = m.group(1).lower()
        attrs = m.group(2) or ""
        closing = raw.startswith("</")
        self_close = raw.endswith("/>") or name in VOID
        if closing:
            while stack and stack[-1][2] != name:
                stack.pop()
            if stack and stack[-1][2] == name:
                stack.pop()
            continue
        if unkeyed_go(name, attrs):
            isolated = None
            for open_start, attr_at, _n, open_attrs in reversed(stack):
                inner = html[open_start : m.start()]
                if "data-itt-lo3x" in inner:
                    continue
                if "data-pop-field" not in inner and "data-pop-field" not in open_attrs:
                    continue
                if re.search(r'data-pop-panel\s*=\s*"1"', open_attrs):
                    isolated = None
                    break
                isolated = (open_start, attr_at, open_attrs)
                break
            if isolated:
                adds.append(isolated[1])
        if not self_close:
            stack.append((m.start(), m.start() + 1 + len(m.group(1)), name, attrs))
    if not adds:
        return html, 0
    out = html
    seen = set()
    for attr_at in sorted(set(adds), reverse=True):
        if attr_at in seen:
            continue
        seen.add(attr_at)
        out = out[:attr_at] + ' data-pop-panel="1"' + out[attr_at:]
    return out, len(seen)


def main() -> None:
    n_files = 0
    n_wraps = 0
    for year in YEARS:
        sites = ROOT / f"years/{year}/sites"
        if not sites.is_dir():
            continue
        for dest in sorted(p for p in sites.iterdir() if p.is_dir()):
            path = dest / "index.html"
            if not path.is_file():
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            nxt, n = wrap_html(html)
            if n:
                path.write_text(nxt, encoding="utf-8")
                n_files += 1
                n_wraps += n
                print(f"wrap {year}/{dest.name} +{n}")
    print(f"wrapped {n_files} dests ({n_wraps} panels)")


if __name__ == "__main__":
    main()
