#!/usr/bin/env python3
"""Wave 7 — forest index.html leftover plaques → period verbs.

1994–2000 · 2004–2006 · 2008. Keep data-lo-key. Skip playable + gold dest files.
No new dest folders. Stars do not move.

See docs/EVERY-YEAR-NEXT-IMPROVE-MAP-GOALS-PHASES-FLOWS-MINUTE-2026-09-03.md Wave 7.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

YEARS = ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2004", "2005", "2006", "2008")

# Gold dest FILES (not the whole slug — amazon 1995 index is leftover)
GOLD_FILES = {
    "1994": {"sites/csotd/index.html"},
    "1995": {"sites/amazon/ssl-checkout.html"},
    "1996": {"sites/portals/wars.html"},
    "1997": {"sites/pointcast/index.html"},
    "1998": {"sites/google/lucky.html"},
    "1999": {"sites/aim/index.html"},
    "2000": {"sites/mapquest/index.html"},
    "2004": {"sites/facebook/networks.html"},
    "2005": {"sites/youtube/upload.html"},
    "2006": {"sites/twitter/index.html"},
    "2008": {"sites/github/issue.html"},
}

# slug -> period verb
SLUG_VERB = {
    "amazon": "Smile leftover",
    "yahoo": "Browse leftover",
    "altavista": "Query leftover",
    "lycos": "Catalog leftover",
    "hotbot": "Query leftover",
    "webcrawler": "Query leftover",
    "infoseek": "Query leftover",
    "google": "Query leftover",
    "ebay": "Bid leftover",
    "auctionweb": "Bid leftover",
    "hotmail": "Sign-up leftover",
    "napster": "Search leftover",
    "pets": "Crash leftover",
    "gmail": "Invite leftover",
    "flickr": "Upload leftover",
    "maps": "Maps leftover",
    "facebook": "Campus leftover",
    "youtube": "Watch leftover",
    "twitter": "140 leftover",
    "chrome": "Chrome leftover",
    "appstore": "App Store leftover",
    "android": "G1 leftover",
    "hulu": "Hulu leftover",
    "aim": "Sign-on leftover",
    "icq": "Sign-on leftover",
    "aliweb": "Submit leftover",
    "wwworm": "Query leftover",
    "well": "Login leftover",
    "iuma": "Listen leftover",
    "pizzahut": "Order leftover",
    "personal": "Guestbook leftover",
    "imdb": "Search leftover title",
    "cnn": "Open leftover headline",
    "bbc": "Open leftover headline",
    "nyt": "Open leftover headline",
    "cdnow": "Buy leftover CD",
    "webvan": "Crash leftover",
    "winamp": "Play leftover",
    "netflix": "Queue leftover",
    "myspace": "Open leftover profile",
    "wikipedia": "Edit leftover",
    "digg": "Bury leftover",
    "reddit": "Vote leftover",
    "blogger": "Post leftover",
    "craigslist": "Browse leftover city",
    "paypal": "Pay leftover",
    "zombo": "Reload leftover",
    "geocities": "Homestead leftover",
    "spacejam": "Planet leftover",
    "pointcast": "Channel leftover",
}

YEAR_DEFAULT = {
    "1994": "Query leftover",
    "1995": "Browse leftover",
    "1996": "Browse leftover",
    "1997": "Open leftover",
    "1998": "Query leftover",
    "1999": "Sign-on leftover",
    "2000": "Smile leftover",
    "2004": "Browse leftover",
    "2005": "Maps leftover",
    "2006": "Feed leftover",
    "2008": "Chrome leftover",
}

YEAR_TRAP = {
    "1994": "Search-as-gold (trap)",
    "1995": "SSL-checkout-as-this (trap)",
    "1996": "Portal-wars-as-this (trap)",
    "1997": "PointCast-as-gold (trap)",
    "1998": "Lucky-as-this (trap)",
    "1999": "AIM-as-gold (trap)",
    "2000": "MapQuest-as-gold (trap)",
    "2004": "thefacebook-as-gold (trap)",
    "2005": "Upload-as-gold (trap)",
    "2006": "Twttr-as-gold (trap)",
    "2008": "GitHub-issue-as-gold (trap)",
}

# 2005 android is acquire leftover, not G1
SLUG_YEAR_VERB = {
    ("2005", "android"): "Note leftover acquire",
    ("2004", "gmail"): "Invite leftover",
    ("2005", "youtube"): "Watch leftover",
    ("2006", "youtube"): "Watch leftover Google-owned",
    ("2006", "facebook"): "News Feed leftover",
    ("2008", "android"): "G1 leftover",
}


def dests(year: str) -> list[str]:
    return sorted(p.name for p in (ROOT / "years" / year / "sites").iterdir() if p.is_dir())


def keys_in(text: str) -> list[str]:
    return re.findall(r'data-lo-key="([^"]+)"', text)


def verb_for(year: str, slug: str) -> str:
    return SLUG_YEAR_VERB.get((year, slug)) or SLUG_VERB.get(slug) or YEAR_DEFAULT[year]


def rewrite_index(year: str, path: Path) -> bool:
    slug = path.parent.name
    if slug == "playable" or "playable" in path.parts:
        return False
    rel = str(path.relative_to(ROOT / "years" / year))
    if rel in GOLD_FILES[year]:
        return False
    raw = path.read_text(encoding="utf-8")
    if "data-lo-save" not in raw:
        return False
    verb = verb_for(year, slug)
    trap = YEAR_TRAP[year]
    before_keys = keys_in(raw)
    t = raw
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover 2×(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover 2x(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover [^<]*(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    t = re.sub(
        r'(<button type="button" data-lo-trap>)This leftover is the (?:\d{4} )?star \(trap\)(</button>)',
        lambda m, tr=trap: m.group(1) + tr + m.group(2),
        t,
    )
    t = re.sub(
        r'(<button type="button" data-lo-trap>)This leftover is the year star \(trap\)(</button>)',
        lambda m, tr=trap: m.group(1) + tr + m.group(2),
        t,
    )
    if keys_in(t) != before_keys:
        raise RuntimeError(f"keys changed {path}")
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def plaque_count(year: str, index_only: bool) -> int:
    n = 0
    for p in (ROOT / "years" / year).rglob("*.html"):
        if index_only and p.name != "index.html":
            continue
        if "playable" in p.parts:
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        n += t.count("Save leftover 2×") + t.count("Save leftover 2x")
        n += len(re.findall(r">Save leftover [^<]+<", t))
    return n


def main() -> int:
    print("Wave 7 — forest index leftover plaques")
    before_dest = {y: dests(y) for y in YEARS}
    before_idx = {y: plaque_count(y, True) for y in YEARS}
    n = 0
    skipped_gold = 0
    for year in YEARS:
        for path in sorted((ROOT / "years" / year / "sites").glob("*/index.html")):
            rel = str(path.relative_to(ROOT / "years" / year))
            if rel in GOLD_FILES[year]:
                skipped_gold += 1
                continue
            if rewrite_index(year, path):
                n += 1
    after_dest = {y: dests(y) for y in YEARS}
    after_idx = {y: plaque_count(y, True) for y in YEARS}
    print(f"  rewritten {n} index.html · gold index skipped {skipped_gold}")
    for y in YEARS:
        if before_dest[y] != after_dest[y]:
            print("  DEST FOLDERS CHANGED", y)
            return 1
        print(f"  {y} dests {len(after_dest[y])} index-plaques {before_idx[y]} -> {after_idx[y]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
