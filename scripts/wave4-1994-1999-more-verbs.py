#!/usr/bin/env python3
"""Wave 4 — 1994–1999 more.html leftover-120 quality.

Keep data-lo-key. Relabel title/h1/trap/save/next to period verbs.
No new dest folders. 1998 google/more.html stays empty leftover (Lucky is gold).

See docs/EVERY-YEAR-IMPROVE-FLOWS-LINKS-GOALS-PHASES-MINUTE-2026-09-03.md Wave 4.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STAR = {
    "1994": "itt94-csotd",
    "1995": "itt95-ssl-checkout",
    "1996": "itt96-portal-wars",
    "1997": "itt97-pointcast",
    "1998": "itt98-lucky",
    "1999": "itt99-aim",
}

# slug -> (title, verb, trap, next_href, next_label)
# next_* optional; year default used if missing
SPEC: dict[str, tuple] = {
    "aliweb": ("ALIWEB submit leftover", "Submit leftover", "Yahoo-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "wwworm": ("WWW Worm leftover", "Query leftover", "Google-as-1994 (trap)", "../jumpstation/index.html", "JumpStation leftover"),
    "well": ("The WELL leftover", "Login leftover", "Forum-as-2000s (trap)", "../cern/index.html", "CERN leftover"),
    "iuma": ("IUMA listen leftover", "Listen leftover", "Play-as-live (trap)", "../hotwired/index.html", "HotWired leftover"),
    "pizzahut": ("Pizza Hut leftover", "Order leftover", "Live card (trap)", "../netmarket/index.html", "NetMarket leftover"),
    "netmarket": ("NetMarket leftover", "Buy leftover", "Live card (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "harvest": ("Harvest leftover", "Query leftover", "AltaVista-as-1994 (trap)", "../lycos/index.html", "Lycos leftover"),
    "jumpstation": ("JumpStation leftover", "Query leftover", "Google-as-1994 (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "suck": ("suck.com leftover", "Open leftover essay", "HotWired-as-gold (trap)", "../hotwired/index.html", "HotWired leftover"),
    "auctionweb": ("AuctionWeb leftover", "Bid leftover", "eBay-as-1995-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "hotmail": ("HoTMaiL leftover", "Sign-up leftover", "Portal-wars-as-this (trap)", "../yahoo/my.html", "My Yahoo leftover"),
    "spacejam": ("Space Jam leftover", "Planet leftover", "Google-as-1996-gold (trap)", "../portals/wars.html", "Portal wars"),
    "winamp": ("Winamp leftover", "Play leftover", "Live stream (trap)", "../mp3com/index.html", "MP3.com leftover"),
    "netflix": ("Netflix DVD leftover", "Mail leftover", "Stream-as-1997 (trap)", "../amazon/index.html", "Amazon leftover"),
    "google": ("Google leftover — still empty", "Note leftover empty", "Packed-Google-as-1998 (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "cdnow": ("CDnow leftover", "Buy leftover CD", "Live cart (trap)", "../amazon/music.html", "Amazon Music leftover"),
    "napster": ("Napster leftover", "Search leftover", "Live file (trap)", "../aim/index.html", "AIM leftover"),
    "webvan": ("Webvan leftover", "Crash leftover", "Live grocery (trap)", "../paypal/index.html", "PayPal leftover"),
    "personal": ("Personal leftover", "Guestbook leftover", "Search-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "imdb": ("IMDb leftover", "Search leftover title", "Live IMDb (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "cnn": ("CNN leftover", "Open leftover headline", "Live CNN (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "bbc": ("BBC leftover", "Open leftover headline", "Live BBC (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "nyt": ("NYT leftover", "Open leftover headline", "Live NYT (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "amazon": ("Amazon leftover", "Book leftover", "1-Click-new (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "yahoo": ("Yahoo leftover", "Browse leftover", "Search-as-gold (trap)", "../lycos/index.html", "Lycos leftover"),
    "altavista": ("AltaVista leftover", "Query leftover", "Google-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "hotbot": ("HotBot leftover", "Query leftover", "Google-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "webcrawler": ("WebCrawler leftover", "Query leftover", "Google-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "infoseek": ("Infoseek leftover", "Query leftover", "Google-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "lycos": ("Lycos leftover", "Catalog leftover", "Search-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "aim": ("AIM leftover", "Sign-on leftover", "Empty-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "icq": ("ICQ leftover", "Sign-on leftover", "ICQ-as-gold (trap)", "../hotmail/index.html", "HoTMaiL leftover"),
    "ebay": ("eBay leftover", "Bid leftover", "eBay-as-gold (trap)", "../yahoo/index.html", "Yahoo leftover"),
    "pointcast": ("PointCast leftover", "Channel leftover", "PointCast-as-gold (trap)", "../hotmail/index.html", "HoTMaiL leftover"),
}

DEFAULT_NEXT = {
    "1994": ("../yahoo/index.html", "Yahoo leftover"),
    "1995": ("../altavista/index.html", "AltaVista leftover"),
    "1996": ("../hotmail/index.html", "HoTMaiL leftover"),
    "1997": ("../hotmail/index.html", "HoTMaiL leftover"),
    "1998": ("../yahoo/index.html", "Yahoo leftover"),
    "1999": ("../aim/index.html", "AIM leftover"),
}

DEFAULT_TRAP = {
    "1994": "Search-as-gold (trap)",
    "1995": "eBay-as-1995-gold (trap)",
    "1996": "Google-as-1996-gold (trap)",
    "1997": "eBay-as-gold (trap)",
    "1998": "Packed-Google-as-1998 (trap)",
    "1999": "iPhone-as-1999 (trap)",
}

SKIP_SLUGS = {"playable"}


def spec_for(year: str, slug: str) -> tuple[str, str, str, str, str]:
    if slug in SPEC:
        title, verb, trap, nxt, nlab = SPEC[slug]
    else:
        label = slug.replace("-", " ").title()
        title = f"{label} leftover"
        verb = "Open leftover"
        trap = DEFAULT_TRAP[year]
        nxt, nlab = DEFAULT_NEXT[year]
        return title, verb, trap, nxt, nlab
    # resolve next if dest missing
    nxt_path = (ROOT / "years" / year / "sites" / Path(nxt).as_posix().replace("../", "")).parent
    # nxt is like ../yahoo/index.html
    rel = nxt.replace("../", "")
    if not (ROOT / "years" / year / "sites" / rel).is_file():
        nxt, nlab = DEFAULT_NEXT[year]
        if not (ROOT / "years" / year / "sites" / nxt.replace("../", "")).is_file():
            nxt, nlab = ("../../pages/home.html", "Starting Point")
    return title, verb, trap, nxt, nlab


def rewrite_more(year: str, path: Path) -> bool:
    slug = path.parent.name
    if slug in SKIP_SLUGS:
        return False
    raw = path.read_text(encoding="utf-8", errors="replace")
    title, verb, trap, nxt, nlab = spec_for(year, slug)
    star = STAR[year]
    t = raw
    t = re.sub(r"(<title>)(.*?)(</title>)", rf"\1{title} — {year}\3", t, count=1, flags=re.I | re.S)
    t = re.sub(r"(<h1[^>]*>)(.*?)(</h1>)", rf"\1{title}\3", t, count=1, flags=re.I | re.S)
    t = re.sub(
        r'(<p class="archive-residual"[^>]*>)(.*?)(</p>)',
        rf"\1[failed-final] {title} · no official brand pixels.\3",
        t,
        count=1,
        flags=re.I | re.S,
    )
    t = re.sub(
        r"(<h1[^>]*>.*?</h1>\s*)<p>Second leftover path\. Never the star\.</p>",
        rf"\1<p>Second leftover path. Completing this never writes <code>{star}</code>.</p>",
        t,
        count=1,
        flags=re.I | re.S,
    )
    t = re.sub(
        r'(<button type="button" data-lo-trap>)([^<]*)(</button>)',
        rf"\1{trap}\3",
        t,
        flags=re.I,
    )
    # first-panel picks
    t = re.sub(
        rf'(<button type="button" data-lo-pick="a">){re.escape(slug)} 2nd room(</button>)',
        rf"\1{title} path\2",
        t,
        flags=re.I,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover [^<]*(</button>)',
        rf"\1{verb}\2",
        t,
        flags=re.I,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover 2×(</button>)',
        rf"\1{verb}\2",
        t,
        flags=re.I,
    )
    # first next (not d2) — only the more.html primary next
    t = re.sub(
        rf'(data-next-when-key="itt{year[2:]}-{re.escape(slug)}-2"[^>]*>\s*<b>Next:</b>\s*<a href=")[^"]+(">)[^<]*(</a>)',
        rf"\1{nxt}\2{nlab}\3",
        t,
        count=1,
        flags=re.I | re.S,
    )
    # 1998 google: extra empty honesty
    if year == "1998" and slug == "google":
        t = t.replace(
            "Second leftover path. Completing this never writes",
            "Google stays almost empty. Lucky is the gold. Completing this never writes",
        )
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def main() -> int:
    print("Wave 4 — 1994–1999 more.html period verbs")
    before = {
        y: sorted(p.name for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir())
        for y in STAR
    }
    n = 0
    for year in STAR:
        for path in sorted((ROOT / "years" / year).rglob("more.html")):
            if rewrite_more(year, path):
                n += 1
    after = {
        y: sorted(p.name for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir())
        for y in STAR
    }
    print(f"  rewritten {n} more.html")
    for y in before:
        if before[y] != after[y]:
            print("  DEST FOLDERS CHANGED", y)
            return 1
    print("  dest folders unchanged")
    # leftover Save leftover 2× still on more.html?
    left = 0
    for year in STAR:
        for path in (ROOT / "years" / year).rglob("more.html"):
            t = path.read_text(encoding="utf-8", errors="replace")
            if "Save leftover 2×" in t or "leftover 2nd" in t.lower() and "google leftover — still empty" not in t.lower():
                if "Save leftover 2×" in t:
                    left += 1
                    if left <= 5:
                        print("  still 2× plaque", path)
    print("  remaining Save leftover 2× on more.html:", left)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
