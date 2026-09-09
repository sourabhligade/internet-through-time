#!/usr/bin/env python3
"""Score leftover-3× 2010–2015 until every point is positive."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FROZEN = {"2010": 44, "2011": 71, "2012": 45, "2013": 0, "2014": 21, "2015": 71}
GOLD = {
    "2010": ("instagram", "itt10-ig-posts"),
    "2011": ("googleplus", "itt11-gplus"),
    "2012": ("instagram", "itt12-ig-android"),
    "2014": ("whatsapp", "itt14-wa-install"),
    "2015": ("periscope", "itt15-periscope"),
}
OFFICIAL = {
    "2011": {"googleplus", "spotify", "iphone", "facebook", "ipad", "airbnb", "instagram", "twitter", "qwikster", "playable"},
    "2012": {"instagram", "pinterest", "facebook", "iphone", "wikipedia", "medium", "path", "flipboard", "playable"},
    "2014": {"whatsapp", "heartbleed", "icebucket", "iphone", "material", "slack", "twitch", "playable"},
    "2015": {"periscope", "googlephotos", "windows10", "applemusic", "edge", "apple", "snapchat", "discord", "letsencrypt", "playable"},
}
WANT_STRIPS = {
    "2010": (9, 9, 9),
    "2011": (9, 9, 9),
    "2012": (9, 9, 9),
    "2014": (6, 3, 9),
    "2015": (9, 9, 9),
}


def dest_count(year: str) -> int:
    sites = ROOT / f"years/{year}/sites"
    if not sites.exists():
        return 0
    return len([p for p in sites.iterdir() if p.is_dir()])


def strip_n(year: str, attr: str) -> int:
    home = (ROOT / f"years/{year}/pages/home.html").read_text(encoding="utf-8", errors="replace")
    extra = (ROOT / "ui/year/start-extra.js").read_text(encoding="utf-8", errors="replace")
    blob = home + "\n" + extra
    m = re.search(rf'data-itt-{attr}="{year}"[^>]*>(.*?)</p>', blob, re.S)
    if not m:
        return 0
    return len(re.findall(r"sites/([^/]+)/", m.group(1)))


def gold_clean() -> bool:
    for year, (slug, _k) in GOLD.items():
        p = ROOT / f"years/{year}/sites/{slug}/index.html"
        if not p.is_file():
            if year == "2012":
                p = ROOT / "years/2012/sites/instagram/android.html"
            if not p.is_file():
                return False
        html = p.read_text(encoding="utf-8", errors="replace")
        if "data-itt-lo3x" in html:
            print("gold has leftover-3×", year, slug)
            return False
    return True


def official_no_first_second() -> bool:
    ok = True
    for year, dests in OFFICIAL.items():
        for slug in dests:
            p = ROOT / f"years/{year}/sites/{slug}/index.html"
            if not p.is_file():
                continue
            html = p.read_text(encoding="utf-8", errors="replace")
            if f'data-pop-key="pop2-{slug}"' in html and "data-itt-lo3x" in html:
                # pop2 on official leftover-3× is illegal
                if re.search(rf'data-itt-lo3x[\s\S]{{0,800}}data-pop-key="pop2-{slug}"', html):
                    print("official has pop2", year, slug)
                    ok = False
    return ok


def matrix_ok() -> bool:
    p = ROOT / "e2e/2010-2015-leftover-3x.matrix.json"
    y = ROOT / "e2e/2010-2015-yes-leftover.matrix.json"
    if not p.is_file() or not y.is_file():
        return False
    lo = json.loads(p.read_text())
    yes = json.loads(y.read_text())
    print("matrix leftover-3×", len(lo), "YES", len(yes))
    return len(lo) >= 200 and len(yes) >= 60


def main() -> None:
    points = []
    frozen = all(dest_count(y) == n for y, n in FROZEN.items())
    points.append(("dest folders frozen", frozen, {y: dest_count(y) for y in FROZEN}))
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
