#!/usr/bin/env python3
"""3 dest-true leftover-3× machines per legal 2006–2010 leftover dest."""
from __future__ import annotations

import json
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
real_spec = importlib.util.spec_from_file_location("real", ROOT / "scripts/implement-2006-2010-lo3x-real.py")
real = importlib.util.module_from_spec(real_spec)
real_spec.loader.exec_module(real)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-2006-2010-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

OFFICIAL = {
    "2006": {"twitter", "facebook", "youtube", "googledocs", "aws", "ie7", "wikipedia", "roblox", "playable"},
    "2007": {"iphone", "streetview", "gmail", "fbplat", "twitter", "youtube", "tumblr", "kindle", "ie6", "playable"},
    "2008": {"github", "appstore", "chrome", "android", "hulu", "facebook", "twitter", "youtube", "dropbox", "iphone"},
    "2009": {"facebook", "farmville", "bing", "iphone", "appstore", "twitter", "foursquare", "kickstarter", "windows7", "playable"},
    "2010": {"instagram", "iphone", "ipad", "facebook", "farmville", "imgur", "foursquare", "twitter", "youtube", "playable"},
}


def kinds_for(year: str, slug: str) -> list[str]:
    if slug in OFFICIAL[year]:
        return ["third"]
    return ["first", "second", "third"]


def dests(year: str):
    seen = {}
    for kind in ("first", "second", "third"):
        for slug, name in paint.PLAN[year][kind]:
            seen.setdefault(slug, name)
    return list(seen.items())


def next_of(year: str, slug: str, kind: str):
    items = paint.PLAN[year][kind]
    slugs = [s for s, _ in items]
    if slug in slugs:
        i = slugs.index(slug)
        return items[(i + 1) % len(items)]
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
                        "star": real.STAR_KEY[year],
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
    out = ROOT / "e2e/2006-2010-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("matrix", len(rows), out)
    print(counts)


if __name__ == "__main__":
    main()
