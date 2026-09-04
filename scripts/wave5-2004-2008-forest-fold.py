#!/usr/bin/env python3
"""Wave 5 — forest fold (2004, 2005, 2006, 2008).

Home leftover warehouse under .itt-home-more.
Amazon / Yahoo / AltaVista / Zombo get that year's costume + period verbs.
2005 android title = Google buys Android Inc leftover (not G1).
2006 Starting Point gets a visible 3× row (YouTube · Facebook · Wikipedia).
No new dest folders. Stars do not move.

See docs/EVERY-YEAR-IMPROVE-FLOWS-LINKS-GOALS-PHASES-MINUTE-2026-09-03.md Wave 5.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

YEARS = ("2004", "2005", "2006", "2008")
DESTS = ("amazon", "yahoo", "altavista", "zombo")

# Year-true costume. Must / must-not from the Wave 5 table.
COSTUME = {
    "2004": (
        "2004 leftover: smile catalog · Gmail is the new mail. "
        "Not News Feed. Not YouTube upload."
    ),
    "2005": (
        "2005 leftover: Maps (not Street View) · YouTube is not Google-owned. "
        "Not Twitter. Not iPhone."
    ),
    "2006": (
        "2006 leftover: YouTube is Google-owned · News Feed · 140-character update. "
        "Not iPhone. Not 280. Not Instagram."
    ),
    "2008": (
        "2008 leftover: App Store ~500 · Chrome · G1 · Hulu. "
        "App Store is not the year chip. Not iPad. Not Instagram."
    ),
}

YAHOO_BANNER = {
    "2004": (
        '<b style="color:#cc0000">YAHOO 2004 — still #1 visits</b> — '
        "Gmail is the new mail leftover · smile leftover · "
        "thefacebook is campus-only"
    ),
    "2005": (
        '<b style="color:#cc0000">YAHOO 2005 — still #1 visits</b> — '
        "Maps leftover (not Street View) · YouTube is not Google-owned · "
        "Flickr is Yahoo now"
    ),
    "2006": (
        '<b style="color:#cc0000">YAHOO 2006 — portal leftover</b> — '
        "YouTube is Google-owned leftover · News Feed leftover · "
        "140-character update is the year"
    ),
    "2008": (
        '<b style="color:#996600">YAHOO 2008 — portal leftover</b> — '
        "App Store leftover ~500 · Chrome leftover · G1 leftover · Hulu leftover"
    ),
}

# slug -> (verb, next_href, next_label) per year
NEXT = {
    "2004": {
        "amazon": ("Smile leftover", "../gmail/index.html", "Gmail leftover"),
        "yahoo": ("Browse leftover", "../gmail/index.html", "Gmail leftover"),
        "altavista": ("Query leftover", "../yahoo/index.html", "Yahoo leftover"),
        "zombo": ("Reload leftover", "../facebook/index.html", "thefacebook leftover"),
    },
    "2005": {
        "amazon": ("Smile leftover", "../maps/index.html", "Maps leftover"),
        "yahoo": ("Browse leftover", "../maps/index.html", "Maps leftover"),
        "altavista": ("Query leftover", "../maps/index.html", "Maps leftover"),
        "zombo": ("Reload leftover", "../youtube/index.html", "YouTube leftover"),
    },
    "2006": {
        "amazon": ("Smile leftover", "../youtube/index.html", "YouTube leftover"),
        "yahoo": ("Browse leftover", "../facebook/feed.html", "News Feed leftover"),
        "altavista": ("Query leftover", "../youtube/index.html", "YouTube leftover"),
        "zombo": ("Reload leftover", "../wikipedia/index.html", "Wikipedia leftover"),
    },
    "2008": {
        "amazon": ("Smile leftover", "../chrome/index.html", "Chrome leftover"),
        "yahoo": ("Browse leftover", "../hulu/index.html", "Hulu leftover"),
        "altavista": ("Query leftover", "../android/index.html", "G1 leftover"),
        "zombo": ("Reload leftover", "../chrome/index.html", "Chrome leftover"),
    },
}

TRAP = {
    "2004": {
        "amazon": "News Feed / YouTube-upload-as-2004 (trap)",
        "yahoo": "News Feed-as-2004 (trap)",
        "altavista": "YouTube-upload-as-2004 (trap)",
        "zombo": "thefacebook-as-gold (trap)",
    },
    "2005": {
        "amazon": "Street View / iPhone-as-2005 (trap)",
        "yahoo": "Twitter-as-2005 (trap)",
        "altavista": "Google-owns-YouTube (trap)",
        "zombo": "iPhone-as-2005 (trap)",
    },
    "2006": {
        "amazon": "iPhone-as-2006 (trap)",
        "yahoo": "280-as-this (trap)",
        "altavista": "Instagram-as-2006 (trap)",
        "zombo": "iPhone-as-2006 (trap)",
    },
    "2008": {
        "amazon": "App-Store-as-chip (trap)",
        "yahoo": "iPad-as-2008 (trap)",
        "altavista": "Instagram-as-2008 (trap)",
        "zombo": "App-Store-as-chip (trap)",
    },
}

COSTUME_P = (
    '<p class="itt-year-costume" data-itt-year-costume="1" '
    'style="font-family:Arial,sans-serif;font-size:11px;margin:8px 0;'
    'padding:6px 8px;background:#eef6ff;border:1px solid #69c;max-width:48em">'
    "{text}</p>\n"
)

HOME_MORE_OPEN = (
    "<!-- ITT-HOME-MORE:start -->\n"
    '<div class="itt-home-more">\n'
    '<p class="itt-home-more-label">Also this year · leftover warehouse</p>\n'
)
HOME_MORE_CLOSE = "</div>\n<!-- ITT-HOME-MORE:end -->\n"

POP3X_2006 = """<!-- ITT-2006-POP3X:start -->
<nav id="itt-2006-pop3x-dp" class="itt-pop3x" data-itt-pop3x="2006"
 style="margin:12px auto;padding:8px 10px;border:1px solid #666;background:#fff8dc;
 font-family:Arial,sans-serif;font-size:12px;max-width:48em">
<b>Also popular this year · 3×</b>
 · <a href="../sites/youtube/index.html">YouTube leftover</a>
 · <a href="../sites/facebook/index.html">Facebook leftover</a>
 · <a href="../sites/wikipedia/index.html">Wikipedia leftover</a>
</nav>
<!-- ITT-2006-POP3X:end -->
"""


def dest_counts() -> dict[str, list[str]]:
    out = {}
    for y in YEARS:
        sites = ROOT / "years" / y / "sites"
        out[y] = sorted(p.name for p in sites.iterdir() if p.is_dir())
    return out


def wrap_home(year: str) -> bool:
    path = ROOT / "years" / year / "pages" / "home.html"
    raw = path.read_text(encoding="utf-8")
    t = raw
    if 'class="itt-home-more"' not in t and "ITT-3X-LINKS:start" in t:
        t = t.replace(
            "<!-- ITT-3X-LINKS:start -->",
            HOME_MORE_OPEN + "<!-- ITT-3X-LINKS:start -->",
            1,
        )
        t = t.replace(
            "<!-- ITT-3X-LINKS:end -->",
            "<!-- ITT-3X-LINKS:end -->\n" + HOME_MORE_CLOSE,
            1,
        )
    if year == "2006" and "ITT-2006-POP3X:start" not in t:
        # Visible below guided (id ends -dp so start.js does not fold it).
        needle = '<script src="../../../js/immersion-2006.js" defer></script>'
        if needle in t:
            t = t.replace(needle, needle + "\n\n" + POP3X_2006, 1)
        else:
            t = t.replace("</body>", POP3X_2006 + "</body>", 1)
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def ensure_year_attr(html: str, year: str) -> str:
    if re.search(r"<html[^>]*data-itt-year=", html, re.I):
        return html
    return re.sub(r"<html([^>]*)>", rf'<html\1 data-itt-year="{year}">', html, count=1, flags=re.I)


def insert_costume(html: str, year: str) -> str:
    if 'data-itt-year-costume="1"' in html:
        return html
    block = COSTUME_P.format(text=COSTUME[year])
    if 'class="itt-continuity-chip"' in html or "itt-continuity-chip" in html:
        # after first continuity chip block (p or div)
        html, n = re.subn(
            r'((?:<p|<div)[^>]*itt-continuity-chip[\s\S]*?</(?:p|div)>\s*)',
            r"\1" + block,
            html,
            count=1,
            flags=re.I,
        )
        if n:
            return html
    if 'id="itt-nav-slot"' in html:
        return re.sub(
            r'(<div id="itt-nav-slot"[^>]*>\s*</div>\s*)',
            r"\1" + block,
            html,
            count=1,
            flags=re.I,
        )
    return html.replace("<body", "<body", 1).replace(
        re.search(r"<body[^>]*>", html).group(0),
        re.search(r"<body[^>]*>", html).group(0) + "\n" + block,
        1,
    )


def rewrite_yahoo_banner(html: str, year: str) -> str:
    banner = YAHOO_BANNER[year]
    # 2004/2005/2006 MARKETS 2003 dump
    html = re.sub(
        r'<b style="color:#cc0000">MARKETS 2003</b>[\s\S]*?</font>\s*</td></tr>',
        banner + "\n </font>\n</td></tr>",
        html,
        count=1,
        flags=re.I,
    )
    # 2008 YAHOO 2007 dump
    html = re.sub(
        r'<b style="color:#996600">YAHOO 2007 — Web 2\.0 buyer</b>[\s\S]*?</font>\s*</td></tr>',
        banner + "\n </font>\n</td></tr>",
        html,
        count=1,
        flags=re.I,
    )
    html = html.replace(
        "Yahoo portal density · 2003",
        f"Yahoo portal leftover · {year}",
    )
    html = html.replace(
        "Yahoo! portal banner · 2007 immersion",
        "Yahoo! portal leftover · 2008 immersion",
    )
    return html


def rewrite_amazon_footer(html: str, year: str) -> str:
    html = re.sub(
        r"Legal Notices © 1996-2001, Amazon\.com, Inc\.",
        f"Legal Notices © 1996-{year}, Amazon.com, Inc.",
        html,
    )
    return html


def rewrite_altavista_body(html: str, year: str) -> str:
    if "Speed-search sensation of the mid-90s" not in html:
        return html
    line = COSTUME[year]
    html = html.replace(
        "<p>Google's sparseness wins habit; AltaVista is the prior champion in many memories.</p>",
        f"<p>{line}</p>",
        1,
    )
    return html


def rewrite_zombo_body(html: str, year: str) -> str:
    if "Welcome to ZomboCom" not in html:
        return html
    line = COSTUME[year]
    html = re.sub(
        r"<p>ZomboCom teaches a generation that the web can be pure nonsense and still famous.</p>",
        f"<p>{line}</p>",
        html,
        count=1,
    )
    return html


def rewrite_lo_machine(html: str, year: str, slug: str) -> str:
    verb, nxt, nlab = NEXT[year][slug]
    trap = TRAP[year][slug]
    # Primary leftover traps (not d2 Neighbor year)
    html = re.sub(
        r'(<button type="button" data-lo-trap>)This leftover is the (?:\d{4} )?star \(trap\)(</button>)',
        lambda m, tr=trap: m.group(1) + tr + m.group(2),
        html,
        flags=re.I,
    )
    html = re.sub(
        r'(<button type="button" data-lo-trap>)This leftover is the year star \(trap\)(</button>)',
        lambda m, tr=trap: m.group(1) + tr + m.group(2),
        html,
        flags=re.I,
    )
    # Keep 1-Click / AltaVista-is-Google if already year-true-ish, but stamp Wave 5 trap
    # on the first leftover panel trap only when it is still a generic leftover-as-star.
    # Always refresh known generic leftover traps:
    generics = (
        "Zombo is the chip (trap)",
        "This is Flickr gold (trap)",
        "This is Google gold (trap)",
        "AltaVista is Google (trap)",
        "Yahoo is Google (trap)",
        "This is 1-Click gold (trap)",
        "1-Click live charge (trap)",
    )
    for g in generics:
        html = html.replace(
            f'<button type="button" data-lo-trap>{g}</button>',
            f'<button type="button" data-lo-trap>{trap}</button>',
        )
    # Period verbs — keep data-lo-key
    html = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover [^<]*(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        html,
        flags=re.I,
    )
    html = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Search leftover [^<]*(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        html,
        flags=re.I,
    )
    # Primary leftover next (not *-d2)
    def _next_sub(m: re.Match) -> str:
        key = m.group("key")
        if key.endswith("-d2"):
            return m.group(0)
        return f'data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nlab}</a>'

    html = re.sub(
        r'data-next-when-key="(?P<key>itt\d{2}-[^"]+)"[^>]*>\s*<b>Next:</b>\s*<a href="[^"]+">[^<]*</a>',
        _next_sub,
        html,
        flags=re.I | re.S,
    )
    return html


def rewrite_dest(year: str, slug: str) -> int:
    n = 0
    folder = ROOT / "years" / year / "sites" / slug
    if not folder.is_dir():
        return 0
    for path in sorted(folder.glob("*.html")):
        # index + about only — continuity pages, not every amazon leaf
        if path.name not in {"index.html", "about.html"}:
            continue
        raw = path.read_text(encoding="utf-8")
        t = raw
        t = ensure_year_attr(t, year)
        t = insert_costume(t, year)
        if slug == "yahoo":
            t = rewrite_yahoo_banner(t, year)
        if slug == "amazon":
            t = rewrite_amazon_footer(t, year)
        if slug == "altavista":
            t = rewrite_altavista_body(t, year)
        if slug == "zombo":
            t = rewrite_zombo_body(t, year)
        try:
            t = rewrite_lo_machine(t, year, slug)
        except re.error as err:
            raise RuntimeError(f"{path}: {err}") from err
        if t != raw:
            path.write_text(t, encoding="utf-8")
            n += 1
    return n


def rewrite_2005_android() -> bool:
    path = ROOT / "years" / "2005" / "sites" / "android" / "index.html"
    if not path.is_file():
        return False
    raw = path.read_text(encoding="utf-8")
    t = raw
    t = re.sub(
        r"(<title>)(.*?)(</title>)",
        r"\1Google buys Android Inc leftover — 2005\3",
        t,
        count=1,
        flags=re.I | re.S,
    )
    t = re.sub(
        r"(<h1[^>]*>)(.*?)(</h1>)",
        r"\1Google buys Android Inc leftover\3",
        t,
        count=1,
        flags=re.I | re.S,
    )
    t = t.replace(
        "Quiet acquire leftover. <b>Not G1.</b> G1 is 2008.",
        "Google buys Android Inc (Jul 2005) leftover. <b>Not the T-Mobile G1.</b> G1 is 2008.",
    )
    t = t.replace(
        "Save leftover android",
        "Note leftover acquire",
    )
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def patch_start_extra() -> bool:
    path = ROOT / "ui" / "year" / "start-extra.js"
    raw = path.read_text(encoding="utf-8")
    t = raw
    old = (
        '<p class=\\"itt-pop3x\\" data-itt-pop3x=\\"2006\\"><b>Also popular</b> · '
        '<a href=\\"../sites/youtube/index.html\\">YouTube leftover</a> · '
        '<a href=\\"../sites/facebook/feed.html\\">News Feed leftover</a> · '
        '<a href=\\"../sites/wikipedia/millionth.html\\">Wikipedia leftover</a></p>'
    )
    new = (
        '<p class=\\"itt-pop3x\\" data-itt-pop3x=\\"2006\\" id=\\"itt-2006-pop3x-dp\\">'
        "<b>Also popular this year</b> · "
        '<a href=\\"../sites/youtube/index.html\\">YouTube leftover</a> · '
        '<a href=\\"../sites/facebook/index.html\\">Facebook leftover</a> · '
        '<a href=\\"../sites/wikipedia/index.html\\">Wikipedia leftover</a></p>'
    )
    if old in t:
        t = t.replace(old, new, 1)
    # 2005 extra carries a duplicate 3× warehouse. Drop the nav so home.html is the one copy.
    # The extra is one escaped string; strip <nav class=\"itt-3x-links\" ... </nav>
    t2, n = re.subn(
        r'<nav class=\\"itt-3x-links\\" data-itt-3x-links data-itt-year=\\"2005\\"[^>]*>'
        r".*?</nav>",
        "",
        t,
        count=1,
        flags=re.S,
    )
    if n:
        t = t2
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def main() -> int:
    print("Wave 5 — 2004/2005/2006/2008 forest fold")
    before = dest_counts()
    homes = 0
    dests = 0
    for y in YEARS:
        if wrap_home(y):
            homes += 1
            print(f"  home folded {y}")
        for slug in DESTS:
            n = rewrite_dest(y, slug)
            dests += n
            if n:
                print(f"  dest {y}/{slug} {n} file(s)")
    android = rewrite_2005_android()
    print(f"  2005 android title {'rewritten' if android else 'unchanged'}")
    extra = patch_start_extra()
    print(f"  start-extra {'patched' if extra else 'unchanged'}")
    after = dest_counts()
    print(f"  homes {homes} · dest files {dests}")
    for y in YEARS:
        if before[y] != after[y]:
            print("  DEST FOLDERS CHANGED", y)
            return 1
        print(f"  dest folders {y}: {len(after[y])} unchanged")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
