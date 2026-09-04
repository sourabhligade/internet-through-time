#!/usr/bin/env python3
"""Point leftover Next hops on 2011–2019 playable extras at leftover dests.

D2 leftover Next was cloned onto the year star. Existing dests only.
Game next hops (extra-d, game.html) stay.
"""
from __future__ import annotations

import os
import re
import sys
from pathlib import Path
from urllib.parse import unquote

sys.path.insert(0, str(Path(__file__).resolve().parent))
from itt_leftover_dest import dest_label

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(2011, 2020)]
GOLD = {
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/record.html",
    "2014": "sites/whatsapp/index.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
}
NEXT = re.compile(
    r'(<p hidden data-next-flow data-next-when-key=")([^"]+)("[^>]*>.*?<a href=")([^"]+)(">)(.*?)(</a></p>)',
    re.S,
)
SKIP_KEY = re.compile(r"itt\d{2}-game-")


def resolve(page: Path, href: str) -> Path | None:
    href = unquote(href.split("#")[0].split("?")[0].strip())
    if not href or href.startswith(("http://", "https://", "mailto:", "javascript:", "data:")):
        return None
    if href.startswith("/"):
        return ROOT / href.lstrip("/")
    return (page.parent / href).resolve()


def leftover_pool(year: str) -> list[Path]:
    gold = (ROOT / "years" / year / GOLD[year]).resolve()
    yd = ROOT / "years" / year / "sites"
    out = []
    for p in sorted(yd.rglob("*.html")):
        if p.resolve() == gold:
            continue
        if "playable" in p.as_posix():
            continue
        if re.search(r"(error|404|unreachable|handbook)", p.as_posix(), re.I):
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        if "data-lo-save" not in text:
            continue
        out.append(p)
    return out


def is_leftover_key(key: str) -> bool:
    if SKIP_KEY.search(key):
        return False
    return bool(
        re.search(
            r"(playable|leftover|-d2|-d\d+|extra-|more-|famous|close)",
            key,
        )
    )


def main() -> None:
    files = n = 0
    for year in YEARS:
        play = ROOT / "years" / year / "sites" / "playable"
        if not play.is_dir():
            continue
        gold = (ROOT / "years" / year / GOLD[year]).resolve()
        pool = leftover_pool(year)
        if not pool:
            print(year, "no leftover dests")
            continue
        used = 0
        for src in sorted(play.glob("*.html")):
            text = src.read_text(encoding="utf-8")
            changed = 0

            def repl(m: re.Match[str]) -> str:
                nonlocal used, changed
                key, href, lab = m.group(2), m.group(4), m.group(6)
                if not is_leftover_key(key):
                    return m.group(0)
                dest = resolve(src, href)
                if dest is None:
                    return m.group(0)
                if dest.is_dir() and (dest / "index.html").is_file():
                    dest = dest / "index.html"
                if dest.resolve() != gold:
                    return m.group(0)
                pick = pool[used % len(pool)]
                used += 1
                rel = Path(os.path.relpath(pick, src.parent)).as_posix()
                new_lab = dest_label(pick)
                changed += 1
                return f"{m.group(1)}{key}{m.group(3)}{rel}{m.group(5)}{new_lab}{m.group(7)}"

            out = NEXT.sub(repl, text)
            if out != text:
                src.write_text(out, encoding="utf-8")
                files += 1
                n += changed
                print(f"{src.relative_to(ROOT)} leftover-next {changed}")
    print("files", files, "hops", n)


if __name__ == "__main__":
    main()
