#!/usr/bin/env python3
"""Score leftover-3× 2018–2022 until every point is positive."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FROZEN = {"2018": 0, "2019": 55, "2020": 0, "2021": 107, "2022": 88}
GOLD = {
    "2021": ("att", "itt21-att", "index.html"),
    "2022": ("chatgpt", "itt22-chatgpt", "index.html"),
}
OFFICIAL = {
    "2021": {"att", "signal", "copilot", "meta", "windows11", "flash", "chrome", "windows10", "facebook", "playable"},
    "2022": {"chatgpt", "twitter", "wordle", "stablediffusion", "mastodon", "bereal", "dalle2", "chrome", "windows10", "playable"},
}
WANT_STRIPS = {
    "2019": (9, 9, 9),
    "2021": (9, 9, 9),
    "2022": (9, 9, 9),
}


def dest_count(year: str) -> int:
    sites = ROOT / f"years/{year}/sites"
    if not sites.exists():
        return 0
    return len([p for p in sites.iterdir() if p.is_dir()])


def strip_n(year: str, attr: str) -> int:
    home = ROOT / f"years/{year}/pages/home.html"
    extra = ROOT / "ui/year/start-extra.js"
    blob = ""
    if home.is_file():
        blob += home.read_text(encoding="utf-8", errors="replace")
    if extra.is_file():
        blob += "\n" + extra.read_text(encoding="utf-8", errors="replace")
    m = re.search(rf'data-itt-{attr}="{year}"[^>]*>(.*?)</p>', blob, re.S)
    if not m:
        return 0
    return len(re.findall(r"sites/([^/]+)/", m.group(1)))


def gold_clean() -> bool:
    ok = True
    for year, (slug, _k, page) in GOLD.items():
        p = ROOT / f"years/{year}/sites/{slug}/{page}"
        if not p.is_file():
            print("gold missing", year, slug)
            ok = False
            continue
        html = p.read_text(encoding="utf-8", errors="replace")
        if "data-itt-lo3x" in html:
            print("gold has leftover-3×", year, slug)
            ok = False
    return ok


def official_no_first_second() -> bool:
    ok = True
    for year, dests in OFFICIAL.items():
        for slug in dests:
            p = ROOT / f"years/{year}/sites/{slug}/index.html"
            if not p.is_file():
                continue
            html = p.read_text(encoding="utf-8", errors="replace")
            if "data-itt-lo3x" not in html:
                continue
            if "ITT-POP3X-FIRST" in html or "ITT-POP3X-SECOND" in html:
                print("official has leftover-3× first/second", year, slug)
                ok = False
    return ok


def wiped_stay_wiped() -> bool:
    ok = True
    for year in ("2018", "2020"):
        if (ROOT / f"years/{year}").exists():
            print("wiped year tree exists", year)
            ok = False
    return ok


def matrix_ok() -> bool:
    p = ROOT / "e2e/2018-2022-leftover-3x.matrix.json"
    y = ROOT / "e2e/2018-2022-yes-leftover.matrix.json"
    if not p.is_file() or not y.is_file():
        return False
    lo = json.loads(p.read_text())
    yes = json.loads(y.read_text())
    print("matrix leftover-3×", len(lo), "YES", len(yes))
    return len(lo) >= 120 and len(yes) >= 40


def main() -> None:
    points = []
    frozen = all(dest_count(y) == n for y, n in FROZEN.items())
    points.append(("dest folders frozen", frozen, {y: dest_count(y) for y in FROZEN}))
    points.append(("wiped years stay wiped", wiped_stay_wiped(), None))
    strips = {}
    strips_ok = True
    for y, want in WANT_STRIPS.items():
        got = (strip_n(y, "pop3x"), strip_n(y, "pop-more"), strip_n(y, "pop-3x3"))
        strips[y] = got
        if got != want:
            strips_ok = False
    points.append(("unique dests 3×", strips_ok, strips))
    points.append(("gold off leftover-3×", gold_clean(), None))
    points.append(("official first/second empty", official_no_first_second(), None))
    points.append(("dest-true matrices", matrix_ok(), None))
    pos = 0
    for name, ok, extra in points:
        mark = "+" if ok else "-"
        if ok:
            pos += 1
        print(f"{mark} {name}" + (f" {extra}" if extra else ""))
    print(f"score {pos - (len(points) - pos):+d} ({pos}/{len(points)})")
    if pos < len(points):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
