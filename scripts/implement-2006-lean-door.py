#!/usr/bin/env python3
"""Scaffold the 2006 lean door.

Named dests from live matrices + 8 researched leftovers so 2× rows = 51
(same as 2015–2019 lean doors). Hard stop 90 HTML. Never restore urlMap forest.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2006"
CSS = "../../../../css/period-2006.css"
IMM = "../../../../js/immersion-2006.js"

# Existing 2× chain (do not rename keys — e2e walks these suffixes).
TWOX_EXISTING = [
    ("twitter", "itt06-t140", "query", "Twitter leftover 140", "facebook", "Facebook Feed"),
    ("facebook", "itt06-fb-feed-lx", "query", "Facebook Feed leftover post", "youtube", "YouTube"),
    ("youtube", "itt06-yt-ack", "query", "YouTube Google-owns leftover", "docs", "Docs"),
    ("docs", "itt06-docs-lx", "query", "Google Docs leftover save", "aws", "AWS"),
    ("aws", "itt06-aws", "query", "AWS leftover bucket", "reader", "Reader"),
    ("reader", "itt06-reader", "query", "Google Reader leftover add", "digg", "Digg"),
    ("digg", "itt06-digg-v4", "hops", "Digg leftover front", "time-you", "Time You"),
    ("time-you", "itt06-timeyou", "hops", "Time You leftover two trails", "bebo", "Bebo"),
    ("bebo", "itt06-bebo", "query", "Bebo leftover profile", "slideshare", "SlideShare"),
    ("slideshare", "itt06-slides", "query", "SlideShare leftover deck", "newsvine", "Newsvine"),
    ("newsvine", "itt06-nv", "query", "Newsvine leftover seed", "wikileaks", "WikiLeaks"),
    ("wikileaks", "itt06-wl", "query", "WikiLeaks leftover read", "meebo", "Meebo"),
    ("meebo", "itt06-meebo-lx", "query", "Meebo leftover chat theater", "huffpost", "HuffPost"),
    ("huffpost", "itt06-huff", "query", "HuffPost leftover headline", "wikipedia", "Wikipedia"),
    ("wikipedia", "itt06-wiki-cite", "query", "Wikipedia leftover cite", "myspace", "MySpace"),
    ("myspace", "itt06-ms", "hops", "MySpace still-mass leftover", "amazon", "Amazon"),
    ("amazon", "itt06-cart", "query", "Amazon leftover cart", "gmail", "Gmail"),
    ("gmail", "itt06-gmail-lx", "query", "Gmail leftover (still invite-ish)", "twitter", "Twitter"),
]

# Researched dests so site-dir count matches 2014 (~30) and 2× hits 51.
TWOX_NEW = [
    ("flickr", "itt06-fl-lx", "query", "Flickr leftover photostream", "firefox", "Firefox 2"),
    ("firefox", "itt06-fx2-lx", "query", "Firefox 2 leftover download", "maps", "Google Maps"),
    ("maps", "itt06-maps-lx", "query", "Maps leftover (no Street View)", "delicious", "delicious"),
    ("delicious", "itt06-deli-lx", "query", "delicious leftover bookmark", "wordpress", "WordPress"),
    ("wordpress", "itt06-wp-lx", "query", "WordPress.com leftover post", "calendar", "Google Calendar"),
    ("calendar", "itt06-gcal-lx", "query", "Google Calendar leftover (13 Apr)", "secondlife", "Second Life"),
    ("secondlife", "itt06-sl-lx", "query", "Second Life leftover teleport", "skype", "Skype"),
    ("skype", "itt06-sk-lx", "query", "Skype leftover (eBay-owned)", "twitter", "Twitter"),
]

TWOX_NEXT = [
    ("twitter", "itt06-t140-2", "query", "Twitter leftover 2× next", "facebook", "Facebook"),
    ("facebook", "itt06-fb-feed-2", "query", "Feed leftover 2× next", "youtube", "YouTube"),
    ("youtube", "itt06-yt-ack-2", "query", "YouTube leftover 2× next", "docs", "Docs"),
    ("docs", "itt06-docs-lx2", "query", "Docs leftover 2× next", "aws", "AWS"),
    ("aws", "itt06-aws-2", "query", "AWS leftover 2× next", "reader", "Reader"),
    ("reader", "itt06-reader-2", "query", "Reader leftover 2× next", "digg", "Digg"),
    ("digg", "itt06-digg-v4-2", "hops", "Digg leftover 2× next", "time-you", "Time You"),
    ("time-you", "itt06-timeyou-2", "hops", "Time You leftover 2× next", "bebo", "Bebo"),
    ("bebo", "itt06-bebo-2", "query", "Bebo leftover 2× next", "slideshare", "SlideShare"),
    ("slideshare", "itt06-slides-2", "query", "SlideShare leftover 2× next", "newsvine", "Newsvine"),
    ("newsvine", "itt06-nv-2", "query", "Newsvine leftover 2× next", "wikileaks", "WikiLeaks"),
    ("wikileaks", "itt06-wl-2", "query", "WikiLeaks leftover 2× next", "meebo", "Meebo"),
    ("meebo", "itt06-meebo-2", "query", "Meebo leftover 2× next", "huffpost", "HuffPost"),
    ("huffpost", "itt06-huff-2", "query", "HuffPost leftover 2× next", "wikipedia", "Wikipedia"),
    ("wikipedia", "itt06-wiki-cite-2", "query", "Wikipedia leftover 2× next", "myspace", "MySpace"),
    ("myspace", "itt06-ms-2", "hops", "MySpace leftover 2× next", "amazon", "Amazon"),
    ("amazon", "itt06-cart-2", "query", "Amazon leftover 2× next", "gmail", "Gmail"),
    ("gmail", "itt06-gmail-2", "query", "Gmail leftover 2× next", "flickr", "Flickr"),
]

TWOX_NEW_NEXT = [
    ("flickr", "itt06-fl-2", "query", "Flickr leftover 2× next", "firefox", "Firefox 2"),
    ("firefox", "itt06-fx2-2", "query", "Firefox 2 leftover 2× next", "maps", "Maps"),
    ("maps", "itt06-maps-2", "query", "Maps leftover 2× next", "delicious", "delicious"),
    ("delicious", "itt06-deli-2", "query", "delicious leftover 2× next", "wordpress", "WordPress"),
    ("wordpress", "itt06-wp-2", "query", "WordPress leftover 2× next", "calendar", "Calendar"),
    ("calendar", "itt06-gcal-2", "query", "Calendar leftover 2× next", "secondlife", "Second Life"),
    ("secondlife", "itt06-sl-2", "query", "Second Life leftover 2× next", "skype", "Skype"),
]

DESTS = {
    "twitter": ("Twttr", "15 Jul public · SMS 40404 · 140 from SMS. “What are you doing?” First tweet 21 Mar is literacy, not the gold screen.", "#9ae4e8"),
    "facebook": ("Facebook leftover", "Open 26 Sep · geographic networks. Campus-only after that date is a lie. Feed is the leftover dest.", "#d8dfea"),
    "youtube": ("YouTube leftover", "Independent until 9 Oct. Google $1.65B stock announce · close 13 Nov. Still Flash. Brand stays YouTube.", "#fff"),
    "docs": ("Google Docs leftover", "Writely bought 9 Mar. Docs & Spreadsheets 10 Oct. Type in the browser.", "#fff"),
    "aws": ("AWS leftover", "S3 14 Mar · $0.15/GB-mo · 5 GB objects. Developers, not shoppers. EC2 Aug limited beta.", "#fff"),
    "reader": ("Google Reader leftover", "RSS in a Gmail-ish shell by September. Mark unread leftover.", "#fff"),
    "digg": ("Digg leftover", "2006 peak geek front page. Bury is real. Digg v4 is 2010 — not this room.", "#fff"),
    "time-you": ("Time You leftover", "Dec 2006 · You are Person of the Year. Lev Grossman. No invented cover pixels.", "#fff"),
    "bebo": ("Bebo leftover", "School network mass outside Facebook colleges.", "#2d6cdf"),
    "slideshare": ("SlideShare leftover", "Decks on the web. 2006 launch class.", "#fff"),
    "newsvine": ("Newsvine leftover", "Seeded news + comments. 2006 leftover.", "#fff"),
    "wikileaks": ("WikiLeaks leftover", "Oct 2006 class. Read leftover. No invented mark.", "#fff"),
    "meebo": ("Meebo leftover", "Web IM in the browser. Chat theater. Not the chip.", "#fff"),
    "huffpost": ("HuffPost leftover", "May 2006 launch. Headline leftover. Not the chip.", "#fff"),
    "wikipedia": ("Wikipedia leftover", "Continuity cite. Not the 2001 gold. Not the chip.", "#fff"),
    "myspace": ("MySpace leftover", "Still mass social in 2006. News Corp. Not the chip.", "#fff"),
    "amazon": ("Amazon leftover", "Continuity cart. Not the 1995 SSL gold.", "#fff"),
    "gmail": ("Gmail leftover", "Still invite-ish. Open-to-all is 14 Feb 2007 — trap.", "#fff"),
    "reddit": ("Reddit leftover", "Still sparse next to Digg. Boost leftover.", "#fff"),
    "msn": ("MSN leftover", "Portal channel leftover. Not the chip.", "#fff"),
    "ask": ("Ask leftover", "Query leftover. Not the chip.", "#fff"),
    "aol": ("AOL leftover", "Screen-name leftover. Not the chip.", "#fff"),
    "flickr": ("Flickr leftover", "Yahoo photostream. Mass 2006. Not the chip.", "#fff"),
    "firefox": ("Firefox 2 leftover", "24 Oct 2006. Mass default stays IE6. Download leftover.", "#fff"),
    "maps": ("Google Maps leftover", "Slippy map. No Street View (May 2007). No pegman.", "#fff"),
    "delicious": ("delicious leftover", "Yahoo bookmarks. Tag leftover. Not the chip.", "#fff"),
    "wordpress": ("WordPress.com leftover", "Hosted blog leftover. Growing 2006.", "#fff"),
    "calendar": ("Google Calendar leftover", "13 Apr 2006. Add an event leftover. Not the chip.", "#fff"),
    "secondlife": ("Second Life leftover", "2006 mainstream peak. Teleport leftover. Not the chip.", "#fff"),
    "skype": ("Skype leftover", "eBay-owned IM. Call leftover. Not the chip.", "#fff"),
}

LO = {
    "youtube": ("yt", "watch", "bury", False, ""),
    "digg": ("digg", "digg", "bury", False, ""),
    "reddit": ("reddit", "sub", "award", True, "leftover link"),
    "docs": ("docs", "doc", "desktop", True, "leftover.doc"),
    "aws": ("aws", "s3", "console", False, ""),
    "reader": ("reader", "feed", "feedly", True, "http://leftover.example"),
    "time-you": ("time-you", "you", "cover", False, ""),
}

POP3 = {"bebo": "school", "slideshare": "startup deck", "newsvine": "local vote"}
POP33 = {"facebook": "open", "youtube": "saturday", "wikipedia": "web 2.0"}

OFFICIAL_KEYS = {
    "twitter": "itt06-tweets",
    "facebook": None,
    "youtube": "itt06-yt",
    "docs": "itt06-docs",
    "aws": "itt06-aws",
    "reader": "itt06-reader",
    "digg": "itt06-digg",
    "time-you": "itt06-time-you",
    "reddit": "itt06-reddit",
}


def suffix(key: str) -> str:
    return key.replace("itt06-", "", 1)


def fourx(slug: str, key: str, kind: str, title: str, nxt: str, nxt_label: str) -> str:
    suf = suffix(key)
    if kind == "hops":
        body = (
            '<p><button type="button" data-4x-hop="a">Open A</button> '
            '<button type="button" data-4x-hop="b">Open B</button></p>\n'
            f'<p><button type="button" data-4x-go="{suf}">Confirm leftover</button> '
            '<span data-4x-status></span></p>'
        )
    else:
        body = (
            f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
            f'autocomplete="off" placeholder="{slug} leftover"></label></p>\n'
            f'<p><button type="button" data-4x-go="{suf}">Do leftover</button> '
            '<span data-4x-status></span></p>'
        )
    return f"""<!-- ITT-4X:{suf}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2006 leftover · incomplete never writes · not the chip</p>
{body}
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="../{nxt}/index.html">{nxt_label}</a></p>
</section>
<!-- ITT-4X:{suf}:end -->
"""


def lo_panel(slug: str) -> str:
    if slug not in LO:
        return ""
    suf, need, trap, field, ph = LO[slug]
    field_html = ""
    if field:
        field_html = f'<p><input type="text" data-lo-field maxlength="80" placeholder="{ph}"></p>\n'
    return f"""<div data-lo-panel="1" data-itt-year="2006" style="margin:12px 0;padding:12px;border:1px solid #333;max-width:46em;font-family:Arial,sans-serif;font-size:13px;background:#fffef5">
<h2 style="margin:0 0 8px;font-size:16px">{DESTS[slug][0]} leftover</h2>
<p style="font-size:12px">Period verb · incomplete never writes · not the Twttr chip.</p>
<p><button type="button" data-lo-pick="{need}">{need}</button>
<button type="button" data-lo-pick="{trap}">{trap} (trap pick)</button></p>
<p><label><input type="checkbox" data-lo-req data-official-req> 2006 leftover · not the chip.</label></p>
<p><label><input type="checkbox" data-lo-req data-official-req> Incomplete never writes.</label></p>
{field_html}<p><button type="button" data-lo-trap>This is already the 2007 iPhone gold</button>
<button type="button" data-lo-save data-lo-key="{suf}" data-lo-need-pick="{need}">Save leftover</button></p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt06-{suf}"><b>Next:</b> <a href="../../pages/map.html">Year map</a></p>
</div>
"""


def pop_panel(slug: str, kind: str) -> str:
    if kind == "3x":
        ph = POP3[slug]
        go = f'data-pop-go data-pop-id="{slug}"'
        nxt = "itt06-pop-" + slug
    else:
        ph = POP33[slug]
        go = f'data-pop-go data-pop-key="pop3-{slug}"'
        nxt = "itt06-pop3-" + slug
    return f"""<div class="itt-pop3" data-pop-panel="1" style="margin:12px 0;padding:10px;border:1px dashed #666;max-width:46em;font-family:Arial,sans-serif;font-size:13px">
<p><button type="button" data-pop-pick="{slug[:8]}">{slug} leftover</button></p>
<label><input type="checkbox" data-pop-req> Leftover. Star stays Twttr 140.</label>
<p><input type="text" data-pop-field maxlength="40" placeholder="{ph}"></p>
<p><button type="button" {go}>Open leftover</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{nxt}"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</div>
"""


def also_nav() -> str:
    links = [
        ("../../pages/home.html", "Starting Point"),
        ("../../pages/map.html", "Year map"),
        ("../twitter/index.html", "Twitter 140"),
        ("../facebook/feed.html", "News Feed"),
        ("../youtube/index.html", "YouTube"),
        ("../digg/index.html", "Digg"),
        ("../docs/index.html", "Docs"),
        ("../playable/game.html", "TrailSled"),
    ]
    inner = " ·\n ".join(f'<a href="{h}">{lab}</a>' for h, lab in links)
    return f"""<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2006" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 {inner}
</p>
</nav>
<!-- ITT-3X-ALSO:end -->
"""


def dest_html(slug: str, panels: list[str], extra: str = "") -> str:
    title, blurb, bg = DESTS[slug]
    ok = OFFICIAL_KEYS.get(slug)
    ok_attr = f' data-official-key="{ok}"' if ok else ""
    bits = [extra, lo_panel(slug)]
    if slug in POP3:
        bits.append(pop_panel(slug, "3x"))
    if slug in POP33:
        bits.append(pop_panel(slug, "3x3"))
    bits.extend(panels)
    body = "\n".join(b for b in bits if b)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006"{ok_attr}>
<head>
<meta charset="utf-8">
<title>{title} — 2006</title>
<link rel="stylesheet" href="{CSS}">
</head>
<body bgcolor="{bg}" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px;margin:8px 0;font-family:Arial,sans-serif">[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>
<p class="crumb"><a href="../../pages/home.html">← Starting Point</a> · <a href="../../pages/about.html">About</a></p>
<h1>{title}</h1>
<p>{blurb}</p>
{body}
<script src="{IMM}"></script>
{also_nav()}
</body>
</html>
"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def panels_for(slug: str) -> list[str]:
    out = []
    for row in TWOX_EXISTING + TWOX_NEW + TWOX_NEXT + TWOX_NEW_NEXT:
        if row[0] == slug:
            out.append(fourx(*row))
    return out


def gold_twitter_extra() -> str:
    return """<div class="tw-shell">
<p>★ Gold. Empty Update never writes. 280 / For You / X chrome are not on this page.</p>
<label style="display:block"><input type="checkbox" data-tw06-req> Still 140 because SMS 40404</label>
<label style="display:block"><input type="checkbox" data-tw06-req> Not modern X · no iPhone</label>
<p><textarea data-tw06-body maxlength="140" placeholder="What are you doing?"></textarea>
<span data-tw06-count>140</span></p>
<p>
 <button type="button" data-tw06-post>Update</button>
 <button type="button" data-tw06-trap>Post 280 / For You</button>
</p>
<p data-tw06-status></p>
<div data-tw06-timeline></div>
<p hidden data-next-flow data-next-when-key="itt06-tweets"><b>Next:</b> <a href="../facebook/feed.html">News Feed leftover</a></p>
</div>
"""


def feed_extra() -> str:
    return """<div class="fb-feed">
<p>5 Sep News Feed + Mini-Feed. “Calm down. Breathe.” Privacy 8 Sep. Open 26 Sep.</p>
<label style="display:block"><input type="checkbox" data-ff06-req data-official-req> Feed shipped 5 Sep 2006</label>
<label style="display:block"><input type="checkbox" data-ff06-req data-official-req> Campus-only after 26 Sep is a lie</label>
<p><button type="button" data-ff06-pick="see">See the feed</button>
<button type="button" data-ff06-pick="privacy">Set one privacy leftover</button>
<button type="button" data-official-trap data-ff06-trap>Ignore the backlash</button></p>
<p><button type="button" data-ff06-save>Save Feed leftover</button>
<span data-ff06-status data-official-status></span></p>
<p hidden data-next-flow data-next-when-key="itt06-feed"><b>Next:</b> <a href="../youtube/index.html">YouTube leftover</a></p>
</div>
"""


def five_x(slug: str, key: str) -> str:
    return f"""<div class="itt-5x-loop" data-5x-loop data-5x-year="2006" data-5x-suffix="{slug}" style="margin:12px 0;padding:10px;border:2px solid #f9a825;background:#fff8e1;font-family:Arial,sans-serif;font-size:13px;max-width:46em">
<p style="margin:0 0 6px"><b>5× leftover · {slug}</b> · incomplete never writes · key <code>{key}</code></p>
<label style="display:block;margin:4px 0"><input type="checkbox" data-5x-req="a"> This leftover is REAL literacy — incomplete never writes.</label>
<label style="display:block;margin:4px 0"><input type="checkbox" data-5x-req="b"> Not the locked year star. Tick both boxes then Save.</label>
<p style="margin:8px 0 0"><button type="button" data-5x-save>Save 5× REAL</button> <span data-5x-status></span></p>
</div>
"""


def write_dests() -> None:
    extras = {
        "twitter": gold_twitter_extra(),
        "facebook": "",
        "youtube": "",
    }
    for slug in DESTS:
        extra = extras.get(slug, "")
        if slug in ("msn", "ask", "aol"):
            extra += five_x(slug, f"itt06-{slug}")
            extra += pop_panel_simple(slug)
        html = dest_html(slug, panels_for(slug), extra)
        write(YEAR / "sites" / slug / "index.html", html)

    # Official-2 News Feed is a second facebook dest (not facebook/index).
    write(
        YEAR / "sites" / "facebook" / "feed.html",
        dest_html("facebook", [], feed_extra())
        .replace("<h1>Facebook leftover</h1>", "<h1>News Feed leftover</h1>", 1)
        .replace(
            '<html lang="en" data-itt-year="2006">',
            '<html lang="en" data-itt-year="2006" data-official-key="itt06-feed">',
            1,
        ),
    )


def pop_panel_simple(slug: str) -> str:
    return f"""<div class="itt-pop3" data-pop-panel="1" style="margin:12px 0;padding:10px;border:1px dashed #666;max-width:46em;font-family:Arial,sans-serif;font-size:13px">
<p><button type="button" data-pop-pick="{slug}">open {slug}</button></p>
<label><input type="checkbox" data-pop-req> Leftover. Star stays Twttr 140.</label>
<p><input type="text" data-pop-field maxlength="40" placeholder="{slug} leftover"></p>
<p><button type="button" data-pop-go data-pop-id="{slug}">Open leftover</button> <span data-pop-status></span></p>
</div>
"""


def write_pages() -> None:
    home_links_3x = """
 <a href="../sites/amazon/index.html">Amazon</a> ·
 <a href="../sites/ask/index.html">Ask</a> ·
 <a href="../sites/aol/index.html">AOL</a> ·
 <a href="../sites/aws/index.html">AWS</a> ·
 <a href="../sites/bebo/index.html">Bebo</a> ·
 <a href="../sites/calendar/index.html">Google Calendar</a> ·
 <a href="../sites/delicious/index.html">delicious</a> ·
 <a href="../sites/digg/index.html">Digg</a> ·
 <a href="../sites/docs/index.html">Google Docs</a> ·
 <a href="../sites/facebook/index.html">Facebook leftover</a> ·
 <a href="../sites/facebook/feed.html">News Feed</a> ·
 <a href="../sites/firefox/index.html">Firefox 2</a> ·
 <a href="../sites/flickr/index.html">Flickr</a> ·
 <a href="../sites/gmail/index.html">Gmail leftover</a> ·
 <a href="../sites/huffpost/index.html">HuffPost</a> ·
 <a href="../sites/maps/index.html">Google Maps</a> ·
 <a href="../sites/meebo/index.html">Meebo</a> ·
 <a href="../sites/msn/index.html">MSN</a> ·
 <a href="../sites/myspace/index.html">MySpace</a> ·
 <a href="../sites/newsvine/index.html">Newsvine</a> ·
 <a href="../sites/playable/game.html">TrailSled</a> ·
 <a href="../sites/playable/extra-a.html">playable · extra a</a> ·
 <a href="../sites/playable/extra-b.html">playable · extra b</a> ·
 <a href="../sites/reader/index.html">Google Reader</a> ·
 <a href="../sites/reddit/index.html">Reddit</a> ·
 <a href="../sites/secondlife/index.html">Second Life</a> ·
 <a href="../sites/skype/index.html">Skype</a> ·
 <a href="../sites/slideshare/index.html">SlideShare</a> ·
 <a href="../sites/time-you/index.html">Time You</a> ·
 <a href="../sites/twitter/index.html">Twitter 140</a> ·
 <a href="../sites/wikileaks/index.html">WikiLeaks</a> ·
 <a href="../sites/wikipedia/index.html">Wikipedia</a> ·
 <a href="../sites/wordpress/index.html">WordPress</a> ·
 <a href="../sites/youtube/index.html">YouTube leftover</a>
"""
    two_x_first = " → ".join(
        f'<a href="../sites/{slug}/index.html" data-trail-keys="{key}">{title}</a>'
        for slug, key, _k, title, _n, _nl in TWOX_EXISTING
    )
    two_x_next = " → ".join(
        f'<a href="../sites/{slug}/index.html" data-trail-keys="{key}">{title}</a>'
        for slug, key, _k, title, _n, _nl in TWOX_NEXT
    )
    six_x = " → ".join(
        f'<a href="../sites/{slug}/index.html" data-trail-keys="{key}">{title}</a>'
        for slug, key, _k, title, _n, _nl in TWOX_NEW
    )

    home = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2006</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
<link rel="stylesheet" href="../../../css/year-start-quiet.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../js/year-ui/start-data.js"></script>
<script src="../../../js/year-ui/start.js"></script>
<script>ITT.YearUI.paintStart("2006");</script>
<p class="itt-felt-trail">140 first: <a href="../sites/twitter/index.html">Twttr Update</a> — type ≤140. Then <a href="../sites/facebook/feed.html">News Feed leftover</a>.</p>

<div class="h06">
<p class="itt-mass-honesty" data-itt-mass="myspace" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em">MySpace is still mass social. Twttr is the year verb. <a href="../sites/myspace/index.html">MySpace leftover</a>. No iPhone / Chrome / Street View / Vista retail.</p>

<table width="100%" cellpadding="0" cellspacing="0" border="0" class="lean-card">
<tr bgcolor="#0a246a"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2006</b> · XP · IE 6 · 85,507,314 June
</td></tr>
<tr bgcolor="#fff8dc"><td style="padding:8px 12px"><b>The social web breaks through on a fat laptop — Twttr 140 is the save.</b> News Feed · YouTube-sale · Digg · Docs · S3 leftover.</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <p><a href="map.html"><b>2006 UX flow map</b></a> · <a href="whats-new.html">What’s new</a> · <a href="about.html">About</a></p>
 <p class="itt-year-true-pack"><b>Also 2006 residual (not the one-thing):</b> <a href="../sites/facebook/feed.html"><b>News Feed leftover</b></a> · <a href="../sites/youtube/index.html"><b>YouTube leftover</b></a> · <a href="../sites/digg/index.html"><b>Digg leftover</b></a> · <a href="../sites/docs/index.html"><b>Docs leftover</b></a> · <a href="../sites/aws/index.html"><b>AWS leftover</b></a> · <a href="../sites/playable/game.html"><b>TrailSled</b></a></p>
 <p><a href="../sites/twitter/index.html">Twitter 140</a> · <a href="../sites/facebook/feed.html">News Feed</a> · <a href="../sites/youtube/index.html">YouTube</a> · <a href="../sites/digg/index.html">Digg</a></p>
</td></tr>
</table>
</div>

<div class="itt-home-more" data-itt-year="2006">
<p class="itt-home-more-label">Also this year</p>
<p class="itt-5x-trails" id="ott-5x-2006">
 <b>5× leftover F1–F5</b> (star stays Twitter 140 REAL):
 <a href="../sites/msn/index.html">F1 MSN</a> →
 <a href="../sites/ask/index.html">F2 Ask</a> →
 <a href="../sites/facebook/feed.html">F3 News Feed</a> →
 <a href="../sites/aol/index.html">F4 AOL</a> →
 <a href="../sites/twitter/index.html">★ Twitter 140 REAL</a>
</p>
<p data-itt-pop3x="2006" class="itt-pop3x">Also popular in 2006 (leftover, not the chip): <a href="../sites/bebo/index.html">Bebo</a> · <a href="../sites/slideshare/index.html">SlideShare</a> · <a href="../sites/newsvine/index.html">Newsvine</a></p>
<p data-itt-pop-more="2006" class="itt-pop-more" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (new doors · not the chip · not the first 3× · not the third 3×): <a href="../sites/flickr/index.html">Flickr leftover</a> · <a href="../sites/firefox/index.html">Firefox 2 leftover</a> · <a href="../sites/calendar/index.html">Google Calendar leftover</a> · pick + honesty · empty never writes</p>
<p data-itt-pop-3x3="2006" class="itt-pop-3x3" style="font-size:12px;margin:10px 0;padding:8px;border:1px solid #333;max-width:720px">
 <b>3 more leftovers</b> (third trio · not the chip · not the first 3×):
 <a href="../sites/facebook/index.html">Facebook leftover</a> ·
 <a href="../sites/youtube/index.html">YouTube leftover</a> ·
 <a href="../sites/wikipedia/index.html">Wikipedia leftover</a>
 · pick + honesty · empty never writes
</p>
</div>
<script src="../../../js/immersion-2006.js"></script>

<p class="itt-2x-trails" id="ott-2x-2006" style="margin:10px 0;padding:10px;background:#e8f5e9;border:1px solid #2e7d32;font-family:Arial,sans-serif;font-size:12px;max-width:52em"><b>2× leftover dests</b> (not the chip · incomplete never writes): {two_x_first} → <a href="../sites/twitter/index.html">★ Twitter 140</a></p>
<p class="itt-2x-trails" id="ott-2x-2006-next" style="margin:10px auto;padding:10px;background:#e8f5e9;border:1px solid #2e7d32;font-family:Arial,sans-serif;font-size:12px;max-width:52em"><b>2× leftover dests (next pass)</b> (not the chip · incomplete never writes): {two_x_next} → <a href="../sites/twitter/index.html">★ Twitter 140</a></p>
<p class="itt-2x-trails" id="ott-2x-2006-6x" style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px solid #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:52em"><b>6× leftover dests</b> (researched to match 2014–2019 density · not the chip): {six_x} → <a href="../sites/twitter/index.html">★ Twitter 140</a></p>

<nav class="itt-3x-links" data-itt-3x-links data-itt-year="2006" style="margin:12px 0;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:11px;line-height:1.75;max-width:54em"><b>More rooms this year · 3×</b><p style="margin:4px 0 0;color:#444">Existing rooms only · no new forest · star unchanged</p><p style="margin:6px 0 0">
{home_links_3x}
</p>
</nav>
</body>
</html>
"""
    write(YEAR / "pages" / "home.html", home)

    about = """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>About the Web in 2006</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="ab-lean">
<h1>About 2006</h1>
<p><b>2006 is when the social web breaks through on a fat laptop.</b> <b>Twttr</b> public 15 Jul. <b>News Feed</b> 5 Sep. Facebook <b>open 26 Sep</b>. Google announces YouTube <b>9 Oct</b> ($1.65B stock) and closes <b>13 Nov</b>. There is <b>no iPhone</b>.</p>
<p class="ab-scale"><b>Scale (dual-cite — do not blend):</b> Internet Live Stats June <b>85,507,314</b> websites (+32%) · <b>1,160,335,280</b> users · birthmark <b>Twttr</b>. Netcraft hostnames pass <b>100 million in November</b> (97.9M Oct → ~101M). Shell here: <b>Windows XP + IE 6</b>. IE7 is 18 Oct leftover. Firefox 2 is 24 Oct leftover. Vista retail is <b>30 Jan 2007</b>.</p>
<h2>How a day felt</h2>
<p>Boot XP. IE 6. Broadband. Digg or MySpace first. Late year you type 140 characters to 40404. Facebook starts shouting friends’ walls into a feed. YouTube is still independent in June. Developers rent a disk called S3. There is no Home button to swipe.</p>
<h2>Anachronism bans</h2>
<table border="1" cellpadding="4" cellspacing="0" class="ab-bans">
<tr><th align="left">Never 2006 default</th><th align="left">Correct era</th></tr>
<tr><td><b>iPhone / App Store</b></td><td>2007 / 10 Jul 2008</td></tr>
<tr><td><b>Chrome</b></td><td>2 Sep 2008</td></tr>
<tr><td><b>Street View</b></td><td>May 2007</td></tr>
<tr><td><b>Gmail open-to-all</b></td><td>14 Feb 2007</td></tr>
<tr><td><b>YouTube “a Google company” in March</b></td><td>Announce 9 Oct · close 13 Nov</td></tr>
<tr><td><b>Vista Aero default</b></td><td>Retail 30 Jan 2007</td></tr>
<tr><td><b>280 / For You / X</b></td><td>Later Twitter</td></tr>
<tr><td><b>Like button as gold</b></td><td>2009</td></tr>
</table>
<label><input type="checkbox" data-req data-thesis-req> I read the June 85,507,314 count and I will not blend it with November 100M hostnames.</label><br>
<label><input type="checkbox" data-req data-thesis-req> I know there is no iPhone, no Chrome, and no Vista retail shell in 2006.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<h2>Sources this door is built from</h2>
<ul style="font-size:12px;line-height:1.45">
<li><b>Scale</b> — Internet Live Stats June 2006 <b>85,507,314</b> (+32%) · <b>1,160,335,280</b> users. Netcraft via RTÉ 3 Nov 2006: hostnames pass 100M.</li>
<li><b>Twttr</b> — first tweet 21 Mar · public 15 Jul · SMS 40404 · 140 from SMS. HISTORY + Atlantic.</li>
<li><b>News Feed</b> — 5 Sep live · “Calm down. Breathe.” Privacy 8 Sep. Open registration 26 Sep.</li>
<li><b>YouTube</b> — Google press 9 Oct $1.65B stock · SEC 8-K close 13 Nov. Independent until then.</li>
<li><b>S3</b> — Amazon press 14 Mar · $0.15/GB-mo · 5 GB objects.</li>
<li><b>Look</b> — Web Design Museum · year research in <code>docs/2006-READ-FIRST.md</code>.</li>
</ul>
<p><a href="home.html">← Starting Point</a></p>
</div>
<script src="../../../js/immersion-2006.js"></script>
</body>
</html>
"""
    write(YEAR / "pages" / "about.html", about)

    fmap = """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>2006 flow map</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>2006 flow map</h1>
<p>Official 10 already named in <code>flow-trails.js</code>. Gold is Twttr 140. News Feed is leftover even as official-2.</p>
<ol>
<li><a href="../sites/twitter/index.html">Twitter 140</a> → News Feed</li>
<li><a href="../sites/facebook/feed.html">News Feed</a> → YouTube</li>
<li><a href="../sites/youtube/index.html">YouTube</a> → Digg</li>
<li><a href="../sites/digg/index.html">Digg</a> → Reddit</li>
<li><a href="../sites/reddit/index.html">Reddit</a> → Docs</li>
<li><a href="../sites/docs/index.html">Google Docs</a> → AWS</li>
<li><a href="../sites/aws/index.html">AWS</a> → Reader</li>
<li><a href="../sites/reader/index.html">Google Reader</a> → Time You</li>
<li><a href="../sites/time-you/index.html">Time You</a> → TrailSled</li>
<li><a href="../sites/playable/game.html">TrailSled</a></li>
</ol>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-2006.js"></script>
</body>
</html>
"""
    write(YEAR / "pages" / "map.html", fmap)
    write(
        YEAR / "pages" / "whats-new.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head><meta charset="utf-8"><title>What’s new — 2006</title>
<link rel="stylesheet" href="../../../css/period-2006.css"></head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>What’s new in 2006</h1>
<p>Twttr. News Feed. YouTube sale (late). S3. Docs. Firefox 2 / IE7 leftover. No iPhone.</p>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-2006.js"></script>
</body></html>
""",
    )
    for name, title in (("404.html", "404"), ("unreachable.html", "Unreachable")):
        write(
            YEAR / "pages" / "error" / name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head><meta charset="utf-8"><title>{title} — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css"></head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>{title}</h1>
<p>This 2006 address is not on the lean door.</p>
<p><a href="../../pages/home.html">← Starting Point</a></p>
<script src="../../../../js/immersion-2006.js"></script>
</body></html>
""",
        )


def write_playable() -> None:
    game = """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>TrailSled — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2006" data-game-id="sled">
<p><a href="index.html">← Cabinet</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>TrailSled</h1>
<p class="yg-honesty" data-yg-inspire>Line Rider (Sep 2006) class leftover. Draw a trail. Ride it. Not official art. Star stays Twttr.</p>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p><button type="button" data-game-start>New Game</button></p>
<p>
 <button type="button" data-peg-city="a">Hill A</button> <button type="button" data-peg-city="b">Hill B</button>
 <button type="button" data-peg-trap="pay">Unlock 280-char trail</button>
</p>
<p data-itt-action-status>New Game. Incomplete never writes. Trap never scores.</p>
<p hidden data-next-flow data-next-when-key="itt06-game-sled"><b>Next:</b> <a href="../../pages/home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-2006.js"></script>
</body>
</html>
"""
    write(YEAR / "sites" / "playable" / "game.html", game)
    write(
        YEAR / "sites" / "playable" / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head><meta charset="utf-8"><title>2006 playable</title>
<link rel="stylesheet" href="../../../../css/period-2006.css"></head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>2006 playable cabinet</h1>
<p><a href="game.html">TrailSled</a> · <a href="famous.html">Famous leftover</a> ·
<a href="extra-a.html">A</a> · <a href="extra-b.html">B</a> ·
<a href="extra-c.html">C</a> · <a href="extra-d.html">D</a> · <a href="extra-e.html">E</a></p>
<p><a href="../../pages/home.html">← Starting Point</a></p>
<script src="../../../../js/immersion-2006.js"></script>
</body></html>
""",
    )
    write(
        YEAR / "sites" / "playable" / "famous.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head><meta charset="utf-8"><title>Famous leftover — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css"></head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>Fall Blocks + Pocket Snake</h1>
<p>Cabinet leftover. Not the TrailSled year game. Not the chip.</p>
<p><a href="game.html">TrailSled</a> · <a href="../../pages/home.html">Starting Point</a></p>
<script src="../../../../js/immersion-2006.js"></script>
</body></html>
""",
    )

    extra_ab = [
        (
            "extra-a.html",
            "140 type",
            "t140type",
            "seq",
            "type",
            "js/games/year-2006-t140type.js",
        ),
        (
            "extra-b.html",
            "Digg up",
            "diggup",
            "seq",
            "digg",
            "js/games/year-2006-diggup.js",
        ),
    ]
    for fname, title, gid, kind, confirm, jsrel in extra_ab:
        write(
            YEAR / "sites" / "playable" / fname,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>{title} — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
<link rel="stylesheet" href="../../../../css/year-extra-minute.css">
</head>
<body class="yg-body yg-year-2006" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell mx-shell" data-year-game data-minute-extra data-mx-kind="{kind}" data-year="2006" data-game-id="{gid}" data-mx-confirm-need="{confirm}">
  <h1>{title} — 2006</h1>
  <p class="honesty yg-honesty">Leftover extra · not the Twttr chip · incomplete never writes · key <code>itt06-game-{gid}</code></p>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b> · <span data-mx-hud>kind {kind}</span></p>
  <div data-mx-field class="mx-field" aria-label="{title} playfield"></div>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-mx-finish>Finish</button>
  </p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-extra-minute.js"></script>
<script src="../../../../{jsrel}"></script>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
        )

    extras_cde = [
        ("extra-c.html", "Kong Badge", "kongbadge2", "parlor", "extra-d.html"),
        ("extra-d.html", "Fancy Dash", "fancydash", "runner", "extra-e.html"),
        ("extra-e.html", "Flow Cell", "flowcell", "dodge", "game.html"),
    ]
    for fname, title, gid, kind, nxt in extras_cde:
        write(
            YEAR / "sites" / "playable" / fname,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>{title} — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-2006" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-more-role="{fname[6]}" data-more-kind="{kind}" data-year="2006" data-game-id="{gid}" data-more-need="3" data-yg-next-href="{nxt}">
  <h1>{title} — 2006</h1>
  <p class="honesty yg-honesty">Kongregate / Line Rider class leftover · museum original · incomplete never writes · key <code>itt06-game-{gid}</code></p>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-more-field class="mx-field" aria-label="{title} playfield"></div>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-game-finish>Finish</button>
  </p>
  <p hidden data-next-flow data-next-when-key="itt06-game-{gid}"><b>Next:</b> <a href="{nxt}">Next</a></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
        )


def write_shell() -> None:
    write(
        YEAR / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 6.0 — 2006</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../js/year-ui/years.js"></script>
<script src="../../js/year-ui/shell.js"></script>
<script>ITT.YearUI.paint("2006");</script>
<script src="../../js/lib/util.js?v=20260724bg"></script>
<script src="../../js/browser-core.js?v=20260724bg"></script>
<script src="../../js/config/2006.js?v=20260724bg"></script>
<script src="../../js/browser-2006.js?v=20260724bg"></script>
</body>
</html>
""",
    )


def write_config() -> None:
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
        "sites/facebook/feed.html",
        "sites/playable/game.html",
        "sites/playable/index.html",
        "sites/playable/famous.html",
        "sites/playable/extra-a.html",
        "sites/playable/extra-b.html",
        "sites/playable/extra-c.html",
        "sites/playable/extra-d.html",
        "sites/playable/extra-e.html",
    ]
    for slug in sorted(DESTS):
        rooms.append(f"sites/{slug}/index.html")
    room_js = ",\n    ".join(json.dumps(r) for r in rooms)
    write(
        ROOT / "js" / "config" / "2006.js",
        f"""/**
 * Year config — 2006 lean from-scratch
 * Do not restore the leftover urlMap forest.
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};

  var rooms = [
    {room_js}
  ];

  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2006/",
    "pages/about.html": "http://home.microsoft.com/intl/web2006/about.html",
    "pages/map.html": "http://museum.local/years/2006/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) {{
      urlMap[rooms[i]] = "http://museum.local/years/2006/" + rooms[i];
    }}
  }}

  ITT.configs["2006"] = {{
    year: "2006",
    home: "pages/home.html",
    prefsKey: "itt-2006-prefs",
    bookmarksKey: "itt-2006-bookmarks",
    connectedKey: "itt-2006-connected",
    immersionScript: "js/immersion-2006.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 6.0...",
    defaultPrefs: {{
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2006/",
      homePath: "pages/home.html"
    }},
    urlMap: urlMap
  }};
}})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "js" / "browser-2006.js",
        """/**
 * Browser year stub — 2006
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2006");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2006"]) {
    console.error("ITT 2006 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2006"]);
})();
""",
    )


def write_extras_js() -> None:
    write(
        ROOT / "js" / "immersion" / "year-2006-extras.js",
        """/**
 * 2006 extras — Twttr 140 gold + News Feed leftover.
 * Empty / trap / 280 never write.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2006");

  function key(s) {
    return YX ? YX.key(s) : "itt06-" + s;
  }
  function blob(extra) {
    var o = { real: true, multiStep: true, year: "2006", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function saveJSON(k, o) {
    try { localStorage.setItem(k, JSON.stringify(o)); } catch (e) { /* */ }
  }
  function val(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.value || "").replace(/^\\s+|\\s+$/g, "") : "";
  }
  function ticks(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0, i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }
  function say(st, msg, err) {
    if (!st) return;
    st.textContent = msg;
    try { st.style.color = err ? "#a00" : "#060"; } catch (eC) { /* */ }
  }
  function reveal(doc) {
    try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
  }

  function bootTwitter(doc) {
    var btn = doc.querySelector("[data-tw06-post]");
    if (!btn || btn.getAttribute("data-tw06-bound") === "1") return;
    btn.setAttribute("data-tw06-bound", "1");
    var st = doc.querySelector("[data-tw06-status]");
    var ta = doc.querySelector("[data-tw06-body]");
    var cnt = doc.querySelector("[data-tw06-count]");
    var tl = doc.querySelector("[data-tw06-timeline]");
    function paint() {
      var n = 140 - String((ta && ta.value) || "").length;
      if (cnt) {
        cnt.textContent = String(n);
        cnt.style.color = n < 0 ? "#a00" : n < 20 ? "#a60" : "#666";
      }
    }
    if (ta) {
      ta.addEventListener("input", paint);
      ta.addEventListener("keyup", paint);
      paint();
    }
    var trap = doc.querySelector("[data-tw06-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        say(st, "280 / For You never writes.", true);
      });
    }
    btn.addEventListener("click", function () {
      if (ticks(doc, "[data-tw06-req]") < 2) {
        say(st, "Tick both honesties first. Incomplete never writes.", true);
        return;
      }
      var t = val(doc, "[data-tw06-body]");
      if (!t || t.length < 2) {
        say(st, "Empty update never writes.", true);
        return;
      }
      if (t.length > 140) {
        say(st, "Still 140 in 2006. Over 140 never writes.", true);
        return;
      }
      saveJSON(key("tweets"), blob({
        text: t.slice(0, 140),
        chars: t.length,
        sms: "40404",
        limit: 140
      }));
      if (tl) {
        tl.innerHTML = '<div class="tw-item"><b>you</b> ' + t.slice(0, 140) +
          ' <span style="color:#888;font-size:11px">· just now · 40404</span></div>' + tl.innerHTML;
      }
      if (ta) ta.value = "";
      paint();
      say(st, "Posted · 140 · " + key("tweets"));
      reveal(doc);
    });
  }

  function bootFeed(doc) {
    var btn = doc.querySelector("[data-ff06-save]");
    if (!btn || btn.getAttribute("data-ff06-bound") === "1") return;
    btn.setAttribute("data-ff06-bound", "1");
    var st = doc.querySelector("[data-ff06-status]");
    var picked = "";
    var picks = doc.querySelectorAll("[data-ff06-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-ff06-pick") || "";
      });
    }
    var trap = doc.querySelector("[data-ff06-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        say(st, "Ignore-backlash never writes.", true);
      });
    }
    btn.addEventListener("click", function () {
      if (ticks(doc, "[data-ff06-req]") < 2) {
        say(st, "Tick both honesties first. Incomplete never writes.", true);
        return;
      }
      if (picked !== "privacy" && picked !== "see") {
        say(st, "See the feed or set one privacy leftover first.", true);
        return;
      }
      saveJSON(key("feed"), blob({ privacy: picked === "privacy", see: true }));
      say(st, "Feed leftover · " + key("feed"));
      reveal(doc);
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootTwitter(doc);
    bootFeed(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2006-extras", boot: boot });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "js" / "games" / "year-2006-t140type.js",
        """(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2006",
    id: "t140type",
    kind: "seq",
    confirm: "type",
    items: [
      { id: "box", label: "Open the 140 box", order: 0 },
      { id: "type", label: "Type What are you doing?", order: 1 },
      { id: "update", label: "Update", order: 2 },
      { id: "x", label: "Post 280 / For You", role: "trap", trap: "Not 2006" }
    ]
  });
})();
""",
    )
    write(
        ROOT / "js" / "games" / "year-2006-diggup.js",
        """(function () {
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({
    year: "2006",
    id: "diggup",
    kind: "seq",
    confirm: "digg",
    items: [
      { id: "open", label: "Open a 2006 seed", order: 0 },
      { id: "digg", label: "Digg it", order: 1 },
      { id: "bury", label: "Bury leftover", order: 2 },
      { id: "v4", label: "Open Digg v4 (2010)", role: "trap", trap: "v4 is 2010" }
    ]
  });
})();
""",
    )


def expand_2x_matrix() -> None:
    path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    kept = [r for r in rows if str(r.get("year")) != "2006"]
    new_rows = []
    for pack in (TWOX_EXISTING, TWOX_NEW, TWOX_NEXT, TWOX_NEW_NEXT):
        for slug, key, kind, title, nxt, nxt_label in pack:
            new_rows.append(
                {
                    "year": "2006",
                    "path": f"/years/2006/sites/{slug}/index.html",
                    "key": key,
                    "kind": kind,
                    "title": title,
                    "next": f"/years/2006/sites/{nxt}/index.html",
                    "nextLabel": nxt_label,
                }
            )
    # Keep original 2006 block position: after 2004, before 2007 if present.
    out = []
    inserted = False
    for r in kept:
        if not inserted and str(r.get("year")) == "2007":
            out.extend(new_rows)
            inserted = True
        out.append(r)
    if not inserted:
        out.extend(new_rows)
    path.write_text(json.dumps(out, indent=2) + "\n", encoding="utf-8")
    print("2x rows 2006:", len(new_rows))


def main() -> None:
    write_shell()
    write_pages()
    write_dests()
    write_playable()
    write_config()
    write_extras_js()
    expand_2x_matrix()
    htmls = list(YEAR.rglob("*.html"))
    dirs = [p.name for p in (YEAR / "sites").iterdir() if p.is_dir()]
    print("HTML", len(htmls), "site-dirs", len(dirs))


if __name__ == "__main__":
    main()
