#!/usr/bin/env python3
"""3 dest-true leftover-3× machines per leftover dest.

Non-official leftover-3× dests get pop + pop2 + pop3.
Official n=1–10 dests stay third-only (pop3).
2001 Google/Yahoo leftover-18 HOLD keep first and also get legal third.
Gold dest pages are not painted. No new folders.
"""
from __future__ import annotations

import json
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("real", ROOT / "scripts/implement-1999-2005-lo3x-real.py")
real = importlib.util.module_from_spec(spec)
spec.loader.exec_module(real)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-1999-2005-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

OFFICIAL = {
    "1999": {"aim", "napster", "google", "blogger", "y2k", "sourceforge", "paypal", "amazon", "ebay", "askjeeves"},
    "2000": {"mapquest", "amazon", "ebay", "paypal", "napster", "gnutella", "pets", "google", "cnn", "y2k"},
    "2001": {"wikipedia", "archive", "itunes", "apple", "napster", "movabletype", "google", "yahoo", "amazon", "playable"},
    "2002": {"stumbleupon", "isp", "kazaa", "wired", "phoenix", "mozilla", "ipod", "friendster", "movabletype", "playable"},
    "2003": {"photobucket", "itunes", "wordpress", "linkedin", "myspace", "friendster", "adsense", "bloglines", "blogger", "playable"},
    "2004": {"facebook", "gmail", "firefox", "flickr", "delicious", "digg", "web20conference"},
    "2005": {"youtube", "maps", "pandora", "housingmaps", "digg", "reddit", "flickr", "itunes", "techcrunch", "playable"},
}

HOLD_FIRST = {("2001", "google"), ("2001", "yahoo")}

STAR_KEY = {
    "1999": "itt99-aim",
    "2000": "itt00-mapquest",
    "2001": "itt01-wiki",
    "2002": "itt02-stumble",
    "2003": "itt03-photobucket",
    "2004": "itt04-thefacebook-networks",
    "2005": "itt05-yt-uploads",
}


def kinds_for(year: str, slug: str) -> list[str]:
    if (year, slug) in HOLD_FIRST:
        return ["first", "third"]
    if slug in OFFICIAL[year]:
        return ["third"]
    return ["first", "second", "third"]


def dests(year: str) -> list[tuple[str, str]]:
    seen: dict[str, str] = {}
    plan = paint.PLAN[year]
    for kind in ("first", "second", "third"):
        for slug, name in plan[kind]:
            seen.setdefault(slug, name)
    return list(seen.items())


def next_of(year: str, slug: str, kind: str) -> tuple[str, str]:
    items = paint.PLAN[year][kind]
    slugs = [s for s, _ in items]
    if slug in slugs:
        i = slugs.index(slug)
        return items[(i + 1) % len(items)]
    # extra machine on a dest from another row — hop to first dest of that kind
    return items[0]


def main() -> None:
    counts = {"replaced": 0, "inserted": 0, "missing": 0}
    rows = []
    for year in paint.PLAN:
        for slug, name in dests(year):
            for kind in kinds_for(year, slug):
                nxt = next_of(year, slug, kind)
                path = ROOT / f"years/{year}/sites/{slug}/index.html"
                st = real.replace_or_insert(path, year, slug, name, kind, nxt)
                counts[st] = counts.get(st, 0) + 1
                print(st, year, kind, slug)
                verb, ph, keep, trap = real.truth(slug)
                key = {
                    "first": f"itt{year[2:]}-pop-{slug}",
                    "second": f"itt{year[2:]}-pop2-{slug}",
                    "third": f"itt{year[2:]}-pop3-{slug}",
                }[kind]
                rows.append(
                    {
                        "year": year,
                        "kind": kind,
                        "id": slug,
                        "name": name,
                        "key": key,
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "keep": keep,
                        "trap": trap,
                        "beat": real.BEAT[year],
                        "miss": real.more_href(year, slug),
                        "nextId": nxt[0],
                        "href": f"/years/{year}/sites/{slug}/index.html",
                    }
                )
    out = ROOT / "e2e/1999-2005-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("matrix", len(rows), out)
    print(counts)


if __name__ == "__main__":
    main()
