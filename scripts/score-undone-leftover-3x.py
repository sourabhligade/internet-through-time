#!/usr/bin/env python3
"""Score leftover-3× 1994–1998 + 2016/2017/2019 + 2000 YES until every point is positive."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FROZEN = {
    "1994": 53,
    "1995": 51,
    "1996": 52,
    "1997": 56,
    "1998": 52,
    "2000": 54,
    "2016": 32,
    "2017": 55,
    "2019": 55,
}
GOLD = {
    "1994": ("csotd", "itt94-csotd", "index.html"),
    "1995": ("amazon", "itt95-ssl-checkout", "index.html"),
    "1996": ("portals", "itt96-portal-wars", "index.html"),
    "1997": ("pointcast", "itt97-pointcast", "index.html"),
    "1998": ("google", "itt98-lucky", "index.html"),
    "2016": ("instagram", "itt16-ig-stories", "stories.html"),
    "2017": ("iphone", "itt17-faceid", "x.html"),
    "2019": ("disneyplus", "itt19-disneyplus", "index.html"),
}
OFFICIAL = {
    "1994": {"csotd", "yahoo", "cern", "fishcam", "whitehouse", "nasa", "iuma", "hotwired", "lycos", "playable"},
    "1995": {"amazon", "auctionweb", "geocities", "yahoo", "altavista", "cnn", "microsoft", "netscape", "classmates", "playable"},
    "1996": {"portals", "hotmail", "spacejam", "yahoo", "geocities", "amazon", "auctionweb", "excite", "altavista", "playable"},
    "1997": {"pointcast", "icq", "ebay", "hotmail", "slashdot", "drudge", "hotbot", "aim", "apple", "microsoft"},
    "1998": {"google", "yahoo", "amazon", "ebay", "cdnow", "hotmail", "mozilla", "slashdot", "dmoz", "playable"},
    "2016": {"instagram", "pokemongo", "facebook", "whatsapp", "iphone", "vine", "snapchat", "musically", "windows10", "playable"},
    "2017": {"iphone", "fortnite", "twitter", "teams", "vine", "switch", "wannacry", "musically", "equifax", "playable"},
    "2019": {"disneyplus", "tiktok", "arcade", "appletv", "stadia", "iphone", "airpodspro", "chrome", "windows10", "playable"},
}
WANT_STRIPS = {
    "1994": (9, 9, 9),
    "1995": (9, 9, 9),
    "1996": (9, 9, 9),
    "1997": (9, 9, 9),
    "1998": (9, 9, 9),
    "2016": (6, 3, 9),
    "2017": (9, 9, 9),
    "2019": (9, 9, 9),
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
    ok = True
    for year, (slug, _k, page) in GOLD.items():
        p = ROOT / f"years/{year}/sites/{slug}/{page}"
        if not p.is_file():
            print("gold missing", year, slug, page)
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
            if f'data-pop-key="pop2-{slug}"' in html:
                print("official has pop2", year, slug)
                ok = False
            if re.search(rf'data-itt-lo3x[\s\S]{{0,1200}}data-pop-go data-pop-id="{slug}">', html) and f'data-pop-key="pop3-{slug}"' in html:
                # leftover dests have unkeyed first; official must not
                if "ITT-POP3X-FIRST" in html:
                    print("official has leftover-3× first", year, slug)
                    ok = False
    return ok


def matrix_ok() -> bool:
    lo94 = json.loads((ROOT / "e2e/1994-1998-leftover-3x.matrix.json").read_text())
    lo16 = json.loads((ROOT / "e2e/2016-2019-leftover-3x.matrix.json").read_text())
    yes_u = json.loads((ROOT / "e2e/undone-yes-leftover.matrix.json").read_text())
    yes00 = [r for r in json.loads((ROOT / "e2e/1999-2005-yes-leftover.matrix.json").read_text()) if str(r["year"]) == "2000"]
    print("matrix leftover-3×", len(lo94) + len(lo16), "YES undone", len(yes_u), "YES 2000", len(yes00))
    return len(lo94) >= 300 and len(lo16) >= 170 and len(yes_u) >= 100 and len(yes00) >= 30


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
