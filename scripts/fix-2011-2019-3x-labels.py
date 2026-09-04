#!/usr/bin/env python3
"""Dest-true ITT-3X-ALSO labels on 2011–2019 cloned playable extras.

Href retarget already pointed dead 2010 dests at files on disk, but left
the 2010 labels (Tumblr → Airbnb). Existing dests only. No new folders.
"""
from __future__ import annotations

import re
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_leftover_dest import dest_label
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(2011, 2020)]
A = re.compile(r'(<a\s+href=["\'])([^"\']+)(["\'][^>]*>)(.*?)(</a>)', re.I | re.S)
BLOCK = re.compile(r"(<!-- ITT-3X-ALSO:start -->)(.*?)(<!-- ITT-3X-ALSO:end -->)", re.S)
KEEP = re.compile(
    r"^(starting point|year flow map|playables|extra [a-i]|year star)$",
    re.I,
)


def resolve(page: Path, href: str) -> Path | None:
    href = unquote(href.split("#")[0].split("?")[0].strip())
    if not href or href.startswith(("http://", "https://", "mailto:", "javascript:", "data:")):
        return None
    if href.startswith("/"):
        return ROOT / href.lstrip("/")
    return (page.parent / href).resolve()


def slug_of(dest: Path) -> str:
    try:
        rel = dest.relative_to(ROOT)
        parts = rel.parts
        if len(parts) >= 4 and parts[0] == "years" and parts[2] == "sites":
            return parts[3]
    except Exception:
        pass
    return dest.parent.name


def matches(label: str, dest: Path) -> bool:
    lab = re.sub(r"[^a-z0-9]+", "", label.lower())
    slug = re.sub(r"[^a-z0-9]+", "", slug_of(dest).lower())
    if not lab or not slug:
        return False
    if slug in lab or lab in slug:
        return True
    if slug[:4] and slug[:4] in lab:
        return True
    title = re.sub(r"[^a-z0-9]+", "", dest_label(dest).lower())
    if title and (title in lab or lab in title):
        return True
    return False


def rewrite_block(page: Path, block: str) -> tuple[str, int]:
    n = 0

    def repl(m: re.Match[str]) -> str:
        nonlocal n
        pre, href, mid, label, end = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5)
        lab = re.sub(r"\s+", " ", label).strip()
        if KEEP.match(lab) or href.endswith(("home.html", "map.html")):
            return m.group(0)
        dest = resolve(page, href)
        if dest is None:
            return m.group(0)
        if dest.is_dir() and (dest / "index.html").is_file():
            dest = dest / "index.html"
        if not dest.is_file():
            return m.group(0)
        if matches(lab, dest):
            return m.group(0)
        new = dest_label(dest)
        if not new or new == lab:
            return m.group(0)
        n += 1
        return f"{pre}{href}{mid}{new}{end}"

    return A.sub(repl, block), n


def main() -> None:
    files = n_hrefs = 0
    for year in YEARS:
        play = ROOT / "years" / year / "sites" / "playable"
        if not play.is_dir():
            continue
        for src in sorted(play.glob("*.html")):
            text = src.read_text(encoding="utf-8")
            changed = 0

            def block_repl(m: re.Match[str]) -> str:
                nonlocal changed
                new, n = rewrite_block(src, m.group(2))
                changed += n
                return m.group(1) + new + m.group(3)

            out = BLOCK.sub(block_repl, text)
            if out != text:
                src.write_text(out, encoding="utf-8")
                files += 1
                n_hrefs += changed
                print(f"{src.relative_to(ROOT)} labels {changed}")
    print("files", files, "labels", n_hrefs)


if __name__ == "__main__":
    main()
