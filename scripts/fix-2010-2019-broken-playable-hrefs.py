#!/usr/bin/env python3
"""Retarget dead hrefs in 2011–2019 cloned playable extras to dests on disk."""
from __future__ import annotations

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HREF = re.compile(r'''((?:href|src)=["'])([^"'#?]+)(["'])''', re.I)
SKIP = re.compile(r"^(https?:|mailto:|javascript:|data:)", re.I)
GOLD = {
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/record.html",
    "2014": "sites/whatsapp/index.html",
    "2016": "sites/instagram/stories.html",
    "2019": "sites/disneyplus/home.html",
}


def year_dests(year: str) -> list[Path]:
    yd = ROOT / "years" / year / "sites"
    out = []
    for p in sorted(yd.rglob("*.html")):
        rel = p.relative_to(ROOT / "years" / year).as_posix()
        if rel.startswith("sites/playable/"):
            continue
        if "error" in rel:
            continue
        out.append(p)
    return out


def resolve_ok(src: Path, href: str) -> bool:
    if href.startswith("/"):
        t = ROOT / href.lstrip("/")
    else:
        t = (src.parent / href).resolve()
    return t.is_file() or (t.is_dir() and (t / "index.html").is_file())


def main() -> None:
    n_files = n_hrefs = 0
    for year in ("2011", "2012", "2013", "2014", "2016", "2019"):
        dests = year_dests(year)
        gold = ROOT / "years" / year / GOLD[year]
        play_idx = ROOT / "years" / year / "sites" / "playable" / "index.html"
        pool = [p for p in dests if p.is_file()]
        if gold.is_file():
            pool = [gold] + [p for p in pool if p != gold]
        playable = ROOT / "years" / year / "sites" / "playable"
        for src in sorted(playable.glob("*.html")):
            text = src.read_text(encoding="utf-8")
            orig = text
            used = 0

            def repl(m: re.Match[str]) -> str:
                nonlocal used
                pre, href, post = m.group(1), m.group(2), m.group(3)
                if SKIP.match(href) or href.startswith("#"):
                    return m.group(0)
                if resolve_ok(src, href):
                    return m.group(0)
                # pick next leftover dest
                if used < len(pool):
                    dest = pool[used]
                    used += 1
                elif play_idx.is_file():
                    dest = play_idx
                else:
                    dest = gold
                rel = Path(os.path.relpath(dest, src.parent)).as_posix()
                return pre + rel + post

            text = HREF.sub(repl, text)
            if text != orig:
                src.write_text(text, encoding="utf-8")
                n_files += 1
                n_hrefs += used
                print(f"{src.relative_to(ROOT)} retargeted ~{used}")
    print("files", n_files, "hrefs", n_hrefs)


if __name__ == "__main__":
    main()
