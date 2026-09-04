#!/usr/bin/env python3
"""Wave 6 — lean leftover polish (2007, 2012, 2017–2019).

Keep data-lo-key. Relabel plaques to period verbs. Add 3× hops to dests on disk.
No new dest folders. Stars do not move. HTML file count must not grow.

See docs/EVERY-YEAR-NEXT-IMPROVE-MAP-GOALS-PHASES-FLOWS-MINUTE-2026-09-03.md Wave 6.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

C07 = [
    "amz", "bbc", "blogger", "cl", "cnn", "digg", "ebay", "ff2", "flickr",
    "gmail", "ie7", "itunes", "li", "livesp", "maps", "myspace", "nfx",
    "nyt", "orkut", "pp", "reddit", "saf3", "sd", "sl", "stumble",
    "twitter", "wow", "youtube",
]

# slug -> (title, verb, next_href, next_label)
C07_SPEC = {
    "amz": ("Amazon leftover", "Query leftover catalog", "../gmail/index.html", "Gmail leftover"),
    "bbc": ("BBC leftover", "Open leftover headline", "../cnn/index.html", "CNN leftover"),
    "blogger": ("Blogger leftover", "Post leftover", "../livesp/index.html", "Live Spaces leftover"),
    "cl": ("Craigslist leftover", "Browse leftover city", "../ebay/index.html", "eBay leftover"),
    "cnn": ("CNN leftover", "Open leftover headline", "../nyt/index.html", "NYT leftover"),
    "digg": ("Digg leftover", "Bury leftover", "../reddit/index.html", "Reddit leftover"),
    "ebay": ("eBay leftover", "Bid leftover", "../amz/index.html", "Amazon leftover"),
    "ff2": ("Firefox 2 leftover", "Download leftover", "../saf3/index.html", "Safari 3 leftover"),
    "flickr": ("Flickr leftover", "Upload leftover", "../youtube/index.html", "YouTube leftover"),
    "gmail": ("Gmail leftover", "Mail leftover", "../facebook/index.html", "Facebook leftover"),
    "ie7": ("IE7 leftover", "Note leftover IE7", "../ie6/index.html", "XP/IE6 leftover"),
    "itunes": ("iTunes leftover", "Browse leftover store", "../nfx/index.html", "Netflix leftover"),
    "li": ("LinkedIn leftover", "Invite leftover", "../orkut/index.html", "Orkut leftover"),
    "livesp": ("Live Spaces leftover", "Post leftover", "../blogger/index.html", "Blogger leftover"),
    "maps": ("Maps leftover", "Drag leftover", "../streetview/index.html", "Street View leftover"),
    "myspace": ("MySpace leftover", "Open leftover profile", "../facebook/index.html", "Facebook leftover"),
    "nfx": ("Netflix leftover", "Queue leftover", "../youtube/index.html", "YouTube leftover"),
    "nyt": ("NYT leftover", "Open leftover headline", "../bbc/index.html", "BBC leftover"),
    "orkut": ("Orkut leftover", "Scrap leftover", "../li/index.html", "LinkedIn leftover"),
    "pp": ("PayPal leftover", "Pay leftover", "../ebay/index.html", "eBay leftover"),
    "reddit": ("Reddit leftover", "Vote leftover", "../digg/index.html", "Digg leftover"),
    "saf3": ("Safari 3 leftover", "Note leftover Safari", "../ff2/index.html", "Firefox 2 leftover"),
    "sd": ("Slashdot leftover", "Comment leftover", "../cnn/index.html", "CNN leftover"),
    "sl": ("Second Life leftover", "Note leftover world", "../wow/index.html", "WoW leftover"),
    "stumble": ("Stumble leftover", "Stumble leftover", "../reddit/index.html", "Reddit leftover"),
    "twitter": ("Twitter leftover", "Update leftover 140", "../facebook/index.html", "Facebook leftover"),
    "wow": ("WoW leftover", "Realm leftover", "../youtube/index.html", "YouTube leftover"),
    "youtube": ("YouTube leftover", "Watch leftover", "../gmail/index.html", "Gmail leftover"),
}

HOPS = {
    "2007": [
        ("gmail", "Gmail leftover"),
        ("facebook", "Facebook leftover"),
        ("twitter", "Twitter leftover"),
        ("youtube", "YouTube leftover"),
        ("tumblr", "Tumblr leftover"),
        ("streetview", "Street View leftover"),
        ("kindle", "Kindle leftover"),
    ],
    "2012": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("twitter", "Twitter leftover"),
        ("pinterest", "Pinterest leftover"),
    ],
    "2017": [
        ("fortnite", "Fortnite leftover"),
        ("switch", "Switch leftover"),
        ("teams", "Teams leftover"),
        ("vine", "Vine gone leftover"),
        ("twitter", "Twitter 280 leftover"),
    ],
    "2018": [
        ("tiktok", "TikTok leftover"),
        ("cambridge", "Cambridge leftover"),
        ("instagram", "IGTV leftover"),
        ("github", "GitHub leftover"),
        ("fortnite", "Fortnite leftover"),
    ],
    "2019": [
        ("tiktok", "TikTok leftover"),
        ("arcade", "Arcade leftover"),
        ("stadia", "Stadia leftover"),
        ("fold19", "Fold leftover"),
        ("libra", "Libra leftover"),
        ("ftcfb", "FTC-Facebook leftover"),
    ],
}

GOLD_FILES = {
    "2007": ["sites/iphone/index.html"],
    "2012": [
        "sites/instagram/android.html",
        "sites/instagram/index.html",
        "sites/pinterest/index.html",
        "sites/facebook/ipo.html",
        "sites/facebook/index.html",
        "sites/iphone/maps.html",
        "sites/wikipedia/sopa.html",
        "sites/medium/index.html",
        "sites/path/index.html",
        "sites/flipboard/index.html",
    ],
    "2017": [
        "sites/iphone/x.html",
        "sites/fortnite/index.html",
        "sites/twitter/280.html",
        "sites/teams/index.html",
        "sites/vine/gone.html",
        "sites/switch/index.html",
        "sites/wannacry/index.html",
        "sites/equifax/index.html",
    ],
    "2018": [
        "sites/gdpr/index.html",
        "sites/tiktok/fyp.html",
        "sites/trust/index.html",
        "sites/instagram/igtv.html",
        "sites/notsecure/index.html",
        "sites/github/index.html",
        "sites/fnios/index.html",
    ],
    "2019": [
        "sites/disneyplus/home.html",
        "sites/tiktok/index.html",
        "sites/arcade/index.html",
        "sites/stadia/index.html",
        "sites/fold19/index.html",
        "sites/libra/index.html",
        "sites/ftcfb/index.html",
    ],
}

# (year, relpath) -> (verb, trap)
VERB = {
    ("2012", "sites/drawsomething/index.html"): ("Draw leftover", "live app (trap)"),
    ("2012", "sites/googledrive/index.html"): ("Folder leftover", "Docs-as-2016 (trap)"),
    ("2012", "sites/tinder/index.html"): ("Swipe leftover", "Stories / Super-Like mass (trap)"),
    ("2012", "sites/vinewait/index.html"): ("Wait leftover", "Vine 6s-as-2012 (trap)"),
    ("2012", "sites/surface/index.html"): ("Surface leftover", "iPad-as-this (trap)"),
    ("2012", "sites/windows8/index.html"): ("Start-gone leftover", "Win8-as-January-shell (trap)"),
    ("2012", "sites/facebook/ipo.html"): ("IPO leftover", "Stories-as-2012 (trap)"),
    ("2017", "sites/krack/index.html"): ("Note leftover patch", "exploit PoC (trap)"),
    ("2017", "sites/nnrepeal/index.html"): ("Note leftover repeal", "live petition (trap)"),
    ("2017", "sites/flashend/index.html"): ("Note leftover EOL", "live Flash (trap)"),
    ("2017", "sites/equifax/index.html"): ("Freeze leftover credit", "live SSN (trap)"),
    ("2017", "sites/twitter/280.html"): ("280 leftover", "under-140 as 280-gold (trap)"),
    ("2017", "sites/switch/index.html"): ("Buy leftover $299", "live eShop (trap)"),
    ("2017", "sites/teams/index.html"): ("Chat leftover", "Slack-as-default (trap)"),
    ("2017", "sites/vine/gone.html"): ("Archive leftover", "Vine-as-TikTok (trap)"),
    ("2018", "sites/cambridge/index.html"): ("Note leftover hearing", "live quiz (trap)"),
    ("2018", "sites/igtvabout/index.html"): ("Watch leftover IGTV", "Reels-as-2018 (trap)"),
    ("2018", "sites/mastodon/index.html"): ("Join leftover", "live instance (trap)"),
    ("2018", "sites/githubms/index.html"): ("Note leftover acquire", "live OAuth (trap)"),
    ("2018", "sites/notsecure/index.html"): ("Tick leftover HTTP", "Chromium Edge (trap)"),
    ("2018", "sites/fnios/index.html"): ("Play leftover", "live V-Bucks (trap)"),
    ("2019", "sites/fold19/index.html"): ("Note leftover fold", "live buy (trap)"),
    ("2019", "sites/libra/index.html"): ("Note leftover literacy", "live wallet (trap)"),
    ("2019", "sites/ftcfb/index.html"): ("Note leftover order", "live fine (trap)"),
}


def dests(year: str) -> list[str]:
    return sorted(p.name for p in (ROOT / "years" / year / "sites").iterdir() if p.is_dir())


def html_count(year: str) -> int:
    return len(list((ROOT / "years" / year).rglob("*.html")))


def dest_href(slug: str, year: str) -> str | None:
    d = ROOT / "years" / year / "sites" / slug
    prefer = {
        ("2017", "vine"): "gone.html",
        ("2017", "twitter"): "280.html",
        ("2018", "instagram"): "igtv.html",
        ("2018", "fortnite"): "creative.html",
        ("2018", "tiktok"): "fyp.html",
    }
    pref = prefer.get((year, slug))
    if pref and (d / pref).is_file():
        return f"../{slug}/{pref}"
    if (d / "index.html").is_file():
        return f"../{slug}/index.html"
    htmls = sorted(d.glob("*.html")) if d.is_dir() else []
    if htmls:
        return f"../{slug}/{htmls[0].name}"
    return None


def ensure_strip(html: str, year: str, hops: list[tuple[str, str]]) -> str:
    parts = []
    for slug, lab in hops:
        href = dest_href(slug, year)
        if href:
            parts.append((slug, href, lab))
    if not parts:
        return html
    m = re.search(r'(<nav class="itt-3x-also"[^>]*>)(.*?)(</nav>)', html, re.S | re.I)
    if m:
        inner = m.group(2)
        add = []
        for slug, href, lab in parts:
            if f"../{slug}/" in inner:
                continue
            add.append(f'<a href="{href}">{lab}</a>')
        if not add:
            return html
        extra = " ·\n " + " ·\n ".join(add)
        if "</p>" in inner:
            new_inner = inner.replace("</p>", extra + "\n</p>", 1)
        else:
            new_inner = inner + extra
        return html[: m.start()] + m.group(1) + new_inner + m.group(3) + html[m.end() :]
    extras = " · ".join(f'<a href="{h}">{lab}</a>' for _, h, lab in parts)
    nav = (
        f"<!-- ITT-W6-3X:start -->\n"
        f'<nav class="itt-3x-also" data-itt-3x-also data-itt-year="{year}" '
        f'style="margin:12px 0;padding:8px;border:1px dashed #888;'
        f'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
        f"<b>Also this year · 3×</b> · {extras}</nav>\n"
        f"<!-- ITT-W6-3X:end -->\n"
    )
    if "</body>" in html:
        return html.replace("</body>", nav + "</body>", 1)
    return html + nav


def rewrite_c07(path: Path, slug: str) -> bool:
    title, verb, nxt, nlab = C07_SPEC[slug]
    # next dest must exist
    rel = nxt.replace("../", "")
    if not (ROOT / "years" / "2007" / "sites" / rel).is_file():
        nxt, nlab = ("../gmail/index.html", "Gmail leftover")
        if not (ROOT / "years/2007/sites/gmail/index.html").is_file():
            nxt, nlab = ("../../pages/home.html", "Starting Point")
    raw = path.read_text(encoding="utf-8")
    t = raw
    t = re.sub(r"(<title>)(.*?)(</title>)", rf"\1{title} — 2007\3", t, count=1, flags=re.I | re.S)
    t = re.sub(r"(<h1[^>]*>)(.*?)(</h1>)", rf"\1{title}\3", t, count=1, flags=re.I | re.S)
    t = t.replace(
        "[failed-final] Amazon continuity leftover",
        f"[failed-final] {title}",
    )
    t = re.sub(
        r"(\[failed-final\] )[^\n<]*continuity leftover",
        rf"\1{title}",
        t,
        count=1,
        flags=re.I,
    )
    t = t.replace("Continuity leftover. Not live cart.", f"{title}. Not iPhone Safari gold.")
    t = t.replace(
        "Continuity leftover.",
        f"{title}.",
    )
    t = re.sub(
        r'(<button type="button" data-lo-trap>)live cart \(trap\)(</button>)',
        r"\1App Store / Chrome / 3G / Like (trap)\2",
        t,
        count=1,
    )
    # primary save only (not d2)
    t = re.sub(
        r'(<button type="button" data-lo-save data-lo-key="(?!.*-d2)[^"]+"[^>]*>)Save leftover [^<]*(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
        count=1,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save data-lo-key="[^"]+-d2"[^>]*>)Save leftover 2×(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    # primary next (not d2)
    def _next(m: re.Match) -> str:
        key = m.group("key")
        if key.endswith("-d2"):
            return m.group(0)
        return f'data-next-when-key="{key}" style="max-width:46em;margin:8px auto;font-family:Arial,sans-serif;font-size:13px"><b>Next:</b> <a href="{nxt}">{nlab}</a>'

    t = re.sub(
        r'data-next-when-key="(?P<key>itt07-[^"]+)"[^>]*>\s*<b>Next:</b>\s*<a href="[^"]+">[^<]*</a>',
        _next,
        t,
        count=1,
        flags=re.I | re.S,
    )
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def relabel_verbs(path: Path, verb: str, trap: str) -> bool:
    raw = path.read_text(encoding="utf-8")
    t = raw
    # plaque labels only — keep keys
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover [^<]*(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    t = re.sub(
        r'(<button type="button" data-lo-save[^>]*>)Save leftover 2×(</button>)',
        lambda m, v=verb: m.group(1) + v + m.group(2),
        t,
    )
    # generic leftover-as-star traps
    t = re.sub(
        r'(<button type="button" data-lo-trap>)This leftover is the year star \(trap\)(</button>)',
        lambda m, tr=trap: m.group(1) + tr + m.group(2),
        t,
    )
    if t == raw:
        return False
    path.write_text(t, encoding="utf-8")
    return True


def main() -> int:
    years = ("2007", "2012", "2017", "2018", "2019")
    before_dest = {y: dests(y) for y in years}
    before_html = {y: html_count(y) for y in years}
    print("Wave 6 — lean leftover polish")

    n_c = 0
    for slug in C07:
        path = ROOT / "years" / "2007" / "sites" / slug / "c.html"
        if not path.is_file():
            print("  skip missing c.html", slug)
            continue
        if rewrite_c07(path, slug):
            n_c += 1
    print(f"  2007 c.html rewritten {n_c}/{len(C07)}")

    n_hops = 0
    for year, files in GOLD_FILES.items():
        hops = HOPS[year]
        for rel in files:
            path = ROOT / "years" / year / rel
            if not path.is_file():
                print("  skip missing hop host", year, rel)
                continue
            html = path.read_text(encoding="utf-8")
            new = ensure_strip(html, year, hops)
            if new != html:
                path.write_text(new, encoding="utf-8")
                n_hops += 1
    print(f"  3× hops rewritten {n_hops} files")

    n_v = 0
    for (year, rel), (verb, trap) in VERB.items():
        path = ROOT / "years" / year / rel
        if not path.is_file():
            print("  skip missing verb dest", year, rel)
            continue
        if relabel_verbs(path, verb, trap):
            n_v += 1
    print(f"  leftover verbs rewritten {n_v} files")

    after_dest = {y: dests(y) for y in years}
    after_html = {y: html_count(y) for y in years}
    for y in years:
        if before_dest[y] != after_dest[y]:
            print("  DEST FOLDERS CHANGED", y)
            return 1
        if after_html[y] != before_html[y]:
            print("  HTML COUNT CHANGED", y, before_html[y], "->", after_html[y])
            return 1
        print(f"  {y} dests {len(after_dest[y])} html {after_html[y]} unchanged")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
