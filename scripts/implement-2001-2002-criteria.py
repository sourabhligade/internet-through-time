#!/usr/bin/env python3
"""Implement 2001/2002 against docs/2001-2002-CRITERIA-MAP-2026-08-30.md.

CUT-FOREST: year-true named leftover 18 + rewritten portal costume.
Does not clone years/2000 as density. Does not move stars. Does not
restore wiped forests. Does not invent brand pixels. 2003/2025 stay boarded.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

KEEP_2001 = {
    "wikipedia",
    "apple",
    "itunes",
    "archive",
    "blogdex",
    "movabletype",
    "mozilla",
    "encarta",
    "napster",
    "blogger",
    "google",
    "yahoo",
    "amazon",
    "cnn",
    "tpm",
    "weblogs",
    "microsoft",
    "xp",
    "msn",
    "ebay",
    "slashdot",
    "paypal",
    "excite",
    "dmoz",
    "askjeeves",
    "playable",
}

KEEP_2002 = {
    "stumbleupon",
    "isp",
    "kazaa",
    "wired",
    "phoenix",
    "mozilla",
    "ipod",
    "friendster",
    "movabletype",
    "daypop",
    "mtv",
    "lastfm",
    "googlenews",
    "wikipedia",
    "amazon",
    "yahoo",
    "google",
    "technorati",
    "playable",
    "xp",
    "ebay",
    "blogger",
}

STAR = {
    "2001": ("sites/wikipedia/edit.html", "Wikipedia edit"),
    "2002": ("sites/stumbleupon/index.html", "Stumble"),
}

# 2× leftover dests — named 18 + official leftover hops. Not 142 clones.
MATRIX = {
    "2001": [
        ("sites/wikipedia/history.html", "wiki-hist", "Wiki leftover recent changes"),
        ("sites/wikipedia/languages.html", "wiki-lang", "Wiki leftover languages"),
        ("sites/archive/index.html", "wayback", "Wayback leftover URL"),
        ("sites/archive/about.html", "wa-url", "Wayback leftover about"),
        ("sites/itunes/index.html", "itunes", "iTunes library leftover"),
        ("sites/itunes/about.html", "itunes-lx", "iTunes rip/mix leftover"),
        ("sites/apple/ipod.html", "ipod", "iPod leftover"),
        ("sites/apple/ipod/faq.html", "ipod-lx", "iPod leftover FAQ"),
        ("sites/napster/index.html", "napster", "Napster endgame leftover"),
        ("sites/napster/about.html", "nap-q", "Napster leftover search"),
        ("sites/movabletype/index.html", "mt", "Movable Type leftover"),
        ("sites/movabletype/about.html", "mt-lx", "Movable Type leftover about"),
        ("sites/blogdex/index.html", "blogdex", "Blogdex leftover"),
        ("sites/blogger/index.html", "blogger", "Blogger Pyra leftover"),
        ("sites/tpm/index.html", "tpm", "Warblog leftover"),
        ("sites/google/index.html", "google", "Google 2001 leftover"),
        ("sites/yahoo/index.html", "yahoo", "Yahoo 2001 leftover"),
        ("sites/amazon/index.html", "amz", "Amazon smile leftover"),
        ("sites/cnn/index.html", "cnn", "CNN Nov 2001 leftover"),
        ("sites/mozilla/index.html", "moz", "Mozilla 0.9 leftover"),
        ("sites/encarta/index.html", "encarta", "Encarta leftover"),
        ("sites/weblogs/index.html", "ping", "Weblogs.com ping leftover"),
        ("sites/playable/game.html", "game-clickscape", "Clickscape"),
    ],
    "2002": [
        ("sites/stumbleupon/more.html", "su-lx", "Stumble leftover topic"),
        ("sites/isp/index.html", "broadband", "Always-on leftover"),
        ("sites/isp/about.html", "bb-lx", "Excite@Home leftover"),
        ("sites/kazaa/index.html", "kazaa", "KaZaA leftover"),
        ("sites/kazaa/lite.html", "kazaa-lite", "KaZaA Lite leftover"),
        ("sites/wired/index.html", "wired", "Wired CSS leftover"),
        ("sites/wired/theme.html", "wired-css", "Wired CSS leftover theme"),
        ("sites/phoenix/index.html", "phoenix", "Phoenix 0.1 leftover"),
        ("sites/mozilla/index.html", "mozilla", "Mozilla 1.0 leftover"),
        ("sites/ipod/index.html", "ipod2", "iPod gen 2 leftover"),
        ("sites/ipod/specs.html", "ipod2-lx", "iPod gen 2 specs leftover"),
        ("sites/friendster/index.html", "fs", "Friendster seed leftover"),
        ("sites/friendster/testimonials.html", "fs-seed", "Friendster leftover circle"),
        ("sites/movabletype/trackback.html", "trackback", "TrackBack leftover"),
        ("sites/movabletype/about.html", "tb-ping", "TrackBack leftover ping"),
        ("sites/daypop/index.html", "daypop", "Daypop leftover"),
        ("sites/mtv/index.html", "mtv", "MTV leftover"),
        ("sites/lastfm/index.html", "lastfm", "last.fm leftover"),
        ("sites/googlenews/index.html", "gnews", "Google News leftover"),
        ("sites/wikipedia/index.html", "wiki-lx", "Wikipedia 2002 leftover"),
        ("sites/amazon/index.html", "amz", "Amazon smile leftover"),
        ("sites/yahoo/index.html", "yahoo", "Yahoo 2002 leftover"),
        ("sites/playable/game.html", "game-roomsticky", "Room Sticky"),
    ],
}


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def img(year: str, slug: str, name: str, alt: str = "") -> str:
    rel = f"../../../../assets/period/{year}/{slug}/{name}"
    if (ROOT / "assets" / "period" / year / slug / name).is_file():
        return f'<img src="{rel}" border="0" alt="{alt}">'
    return (
        '<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px">'
        "[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>"
    )


def crumb(year: str) -> str:
    return (
        '<p class="crumb"><a href="../../pages/home.html">← Starting Point</a> · '
        f'<a href="../../pages/about.html">About {year}</a></p>'
    )


def also(year: str, links: list[tuple[str, str]]) -> str:
    bits = " · ".join(f'<a href="{h}">{l}</a>' for h, l in links)
    return (
        f'<nav class="itt-3x-also" data-itt-3x-also data-itt-year="{year}" '
        'style="margin:14px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;'
        f'font-size:11px;max-width:52em"><b>Also {year}</b> · {bits}</nav>'
    )


def machine(
    year: str,
    key: str,
    btn: str,
    ph: str,
    c1: str,
    c2: str,
    trap: str,
    nxt: str,
    nxt_l: str,
) -> str:
    pfx = year[2:]
    fid = "f-" + key.replace(".", "-")
    return f"""
<div class="itt-verb" style="margin:14px 0;padding:10px;border:1px solid #333;max-width:46em;background:#fff;font-family:Arial,sans-serif;font-size:13px">
<label style="display:block"><input type="checkbox" data-req> {c1}</label>
<label style="display:block"><input type="checkbox" data-req> {c2}</label>
<p><input type="text" id="{fid}" maxlength="80" placeholder="{ph}"></p>
<p>
 <button type="button" data-itt-real-save data-storage-key="{key}" data-min-req="2" data-requires="[data-req]" data-require-field="#{fid}" data-require-field-min="2">{btn}</button>
 <button type="button" data-itt-trap>{trap}</button>
 <span data-itt-action-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt{pfx}-{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>
</div>
"""


def wrap(year: str, title: str, body: str, official: str = "", bg: str = "#ffffff") -> str:
    off = f' data-official-key="{official}"' if official else ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}"{off}>
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="{bg}" text="#111" link="#003399" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{crumb(year)}
{body}
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def strip_clones(year: str, keep: set[str]) -> int:
    sites = ROOT / "years" / year / "sites"
    n = 0
    for d in list(sites.iterdir()):
        if d.is_dir() and d.name not in keep:
            shutil.rmtree(d)
            n += 1
    return n


def patch_append(path: Path, mark: str, block: str) -> None:
    t = path.read_text(encoding="utf-8")
    if mark in t:
        t = re.sub(
            rf"<!-- {re.escape(mark)}:start -->.*?<!-- {re.escape(mark)}:end -->",
            f"<!-- {mark}:start -->\n{block}\n<!-- {mark}:end -->",
            t,
            count=1,
            flags=re.S,
        )
    else:
        t = t.replace("</body>", f"<!-- {mark}:start -->\n{block}\n<!-- {mark}:end -->\n</body>")
    path.write_text(t, encoding="utf-8")


def build_2001() -> None:
    y = "2001"
    root = ROOT / "years/2001/sites"

    # Wiki leftover hops — do not touch edit.html / star.
    patch_append(
        root / "wikipedia/history.html",
        "ITT-N-wiki-hist",
        machine(
            y, "wiki-hist", "Open leftover revision", "HomePage leftover",
            "This is leftover history · not the Save chip",
            "Preview / empty never write the star key",
            "This is the 2001 star (trap)",
            "languages.html", "Languages leftover",
        ),
    )
    patch_append(
        root / "wikipedia/languages.html",
        "ITT-N-wiki-lang",
        machine(
            y, "wiki-lang", "Open leftover edition", "Deutsch leftover",
            "2001 leftover language hop · de/fr exist",
            "Not the English edit star",
            "Make German the 2001 chip (trap)",
            "../archive/index.html", "Wayback",
        ),
    )

    # Wayback
    write(
        root / "archive/index.html",
        wrap(
            y,
            "Wayback Machine — 24 Oct 2001",
            img(y, "archive", "logo.gif", "Wayback")
            + """
<h1>Internet Archive Wayback Machine</h1>
<p>Public <b>24 Oct 2001</b> · Berkeley. Type a URL from before this year. Broken images are honest. Wikipedia is the chip.</p>
<p>The live web forgets. This leftover remembers a copy — when the crawl had it.</p>
"""
            + machine(
                y, "wayback", "Look up leftover URL", "http://www.yahoo.com/",
                "24 Oct 2001 leftover · not the wiki chip",
                "Broken images stay broken · no live archive.org dump",
                "This is the 2001 star (trap)",
                "about.html", "Wayback about",
            )
            + also(y, [("../itunes/index.html", "iTunes"), ("../apple/ipod.html", "iPod")]),
        ),
    )
    write(
        root / "archive/about.html",
        wrap(
            y,
            "About the Wayback Machine",
            """
<h1>About this leftover</h1>
<p>Brewster Kahle’s Archive opens a public time path in October. This is not a live crawl API. Name a host you remember.</p>
"""
            + machine(
                y, "wa-url", "Name leftover host", "whitehouse.gov",
                "URL leftover · incomplete never writes",
                "Not live archive.org as the chip",
                "Play the live Wayback (trap)",
                "../itunes/index.html", "iTunes library",
            ),
        ),
    )
    write(
        root / "archive/more.html",
        wrap(
            y,
            "Wayback — what it cannot do",
            """
<h1>What this leftover will not do</h1>
<p>It will not fetch 2001 bytes from the live net. It will not restore Flash. It will not make Wikipedia the memory machine — Wikipedia is the <b>edit</b> chip.</p>
<p><a href="index.html">« Wayback</a></p>
""",
        ),
    )

    # iTunes library
    write(
        root / "itunes/index.html",
        wrap(
            y,
            "iTunes 1.0 — rip, mix, burn",
            img(y, "itunes", "logo.gif", "iTunes")
            + """
<h1>iTunes</h1>
<p>Macworld <b>9 Jan 2001</b>. Import from CD, make a playlist, burn a disc, sync a later iPod. <b>There is no Music Store.</b> 99¢ is 28 Apr 2003.</p>
<table border="1" cellpadding="6" cellspacing="0" bgcolor="#f4f4f4" style="font-family:Geneva,Arial;font-size:13px">
<tr><td><b>Library</b></td><td>AIFF / MP3 from a CD you own</td></tr>
<tr><td><b>Playlist</b></td><td>Name leftover mix</td></tr>
<tr><td><b>Store</b></td><td>Not this year · the trap</td></tr>
</table>
"""
            + machine(
                y, "itunes", "Name leftover playlist", "commute mix",
                "Library leftover · Mac · no Store",
                "Empty playlist never writes",
                "Open iTunes Music Store (trap)",
                "about.html", "Rip / mix leftover",
            )
            + '<p><a href="burn.html">Burn leftover</a></p>',
        ),
    )
    write(
        root / "itunes/about.html",
        wrap(
            y,
            "iTunes — rip / mix leftover",
            """
<h1>Rip and mix</h1>
<p>iTunes 1.0 is a jukebox. Name a CD you actually owned. The Store button is the trap.</p>
"""
            + machine(
                y, "itunes-lx", "Name leftover CD", "OK Computer",
                "Rip leftover · you already own the disc",
                "Store / 99¢ never write",
                "Buy 99¢ track (trap)",
                "../apple/ipod.html", "iPod",
            ),
        ),
    )
    write(
        root / "itunes/burn.html",
        wrap(
            y,
            "iTunes — burn leftover",
            """
<h1>Burn</h1>
<p>Write a leftover playlist to a CD-R. Theater only. No live burner.</p>
"""
            + machine(
                y, "itunes-burn", "Name leftover burn", "mix-01 leftover",
                "Burn leftover · not a live disc",
                "Store never writes",
                "Burn an MP3 CD for Windows (trap)",
                "../apple/ipod.html", "iPod",
            ),
        ),
    )

    # iPod leftover hop on FAQ (keep index signature)
    patch_append(
        root / "apple/ipod/faq.html",
        "ITT-N-ipod-lx",
        machine(
            y, "ipod-lx", "Note leftover $399", "5 GB leftover",
            "Mac + FireWire leftover · ships 10 Nov",
            "Store is 2003 · never writes",
            "Open the iPhone (trap)",
            "../../napster/index.html", "Napster endgame",
        ),
    )

    # Napster endgame
    write(
        root / "napster/index.html",
        wrap(
            y,
            "Napster — 2001 endgame",
            img(y, "napster", "logo.gif", "Napster")
            + """
<h1>Napster leftover — the war is over</h1>
<p>Injunction upheld Feb. Temporary shutdown Jul. This is <b>not</b> the 2000 growth monster. Type a leftover query. No files move.</p>
"""
            + machine(
                y, "napster", "Search leftover (no files)", "mp3 leftover",
                "2001 endgame leftover · theater only",
                "No real P2P bytes",
                "Download the track (trap)",
                "about.html", "Napster leftover about",
            ),
        ),
    )
    write(
        root / "napster/about.html",
        wrap(
            y,
            "Napster leftover — about",
            """
<h1>After July</h1>
<p>People still type a song name out of habit. KaZaA is next year’s leftover. This door does not give you the file.</p>
"""
            + machine(
                y, "nap-q", "Type leftover query", "metallica leftover",
                "Habit leftover · not 2000 gold",
                "Empty never writes",
                "This is still 2000 Napster (trap)",
                "../movabletype/index.html", "Movable Type",
            ),
        ),
    )
    write(
        root / "napster/more.html",
        wrap(y, "Napster leftover — more", "<h1>No files</h1><p>Museum theater. <a href='index.html'>« Napster</a></p>"),
    )

    # Movable Type
    write(
        root / "movabletype/index.html",
        wrap(
            y,
            "Movable Type 1.2 — 8 Oct 2001",
            """
<h1>Movable Type</h1>
<p>Six Apart · <b>8 Oct 2001</b>. Multiple blogs, templates, static HTML, RSS out of the box. TrackBack is <b>2002</b>.</p>
"""
            + machine(
                y, "mt", "Name leftover blog", "warblog leftover",
                "8 Oct 2001 leftover · static publish",
                "TrackBack is next year · not the chip",
                "This is WordPress / Medium (trap)",
                "about.html", "MT leftover about",
            )
            + '<p><a href="templates.html">Templates leftover</a></p>',
        ),
    )
    write(
        root / "movabletype/about.html",
        wrap(
            y,
            "Movable Type leftover — about",
            """
<h1>Install leftover</h1>
<p>Perl on a host you already have. Name the leftover weblog. Incomplete never writes.</p>
"""
            + machine(
                y, "mt-lx", "Name leftover install", "mt leftover",
                "Install leftover · not a live host",
                "Empty never writes",
                "One-click WordPress (trap)",
                "../blogdex/index.html", "Blogdex",
            ),
        ),
    )
    write(
        root / "movabletype/templates.html",
        wrap(
            y,
            "Movable Type leftover — templates",
            "<h1>Templates</h1><p>Static HTML leftovers. RSS 0.91 / 1.0 mess is literacy. <a href='index.html'>« MT</a></p>",
        ),
    )

    # Blogdex
    write(
        root / "blogdex/index.html",
        wrap(
            y,
            "Blogdex — MIT Jul 2001",
            """
<h1>Blogdex</h1>
<p>MIT Media Lab · Jul 2001. The leftover hottest URLs among weblogs. Not Google. Not the wiki chip.</p>
<ol>
<li>A warblog permalink leftover</li>
<li>A MetaFilter thread leftover</li>
<li>A script someone pinged</li>
</ol>
"""
            + machine(
                y, "blogdex", "Open leftover hottest", "hottest url leftover",
                "Jul 2001 leftover index · ~13k sites framing",
                "Not the Wikipedia chip",
                "This is Google gold (trap)",
                "about.html", "Blogdex about",
            ),
        ),
    )
    write(
        root / "blogdex/about.html",
        wrap(
            y,
            "Blogdex leftover — about",
            "<h1>About Blogdex</h1><p>Cameron Marlow’s leftover map of what weblogs linked. <a href='index.html'>« Blogdex</a></p>"
            + machine(
                y, "blogdex-about", "Name leftover link", "http://leftover.example",
                "Hottest leftover · empty never writes",
                "Not a live crawl",
                "Rank this as PageRank (trap)",
                "../blogger/index.html", "Blogger Pyra",
            ),
        ),
    )

    # Blogger Pyra
    write(
        root / "blogger/index.html",
        wrap(
            y,
            "Blogger — still Pyra, 2001",
            img(y, "blogger", "logo.gif", "Blogger")
            + """
<h1>Blogger</h1>
<p>Still <b>Pyra Labs</b>. Google has not bought it. Publish a leftover post. Twitter is not a 2001 trap that writes.</p>
"""
            + machine(
                y, "blogger", "Publish leftover post", "hello weblog leftover",
                "Pyra leftover · not Google Blogger",
                "Empty post never writes",
                "This is Twitter (trap)",
                "about.html", "Blogger leftover about",
            ),
        ),
    )
    write(
        root / "blogger/about.html",
        wrap(
            y,
            "Blogger leftover — Pyra",
            "<h1>Pyra</h1><p>2001 leftover publish. WordPress is 2003. <a href='index.html'>« Blogger</a></p>"
            + machine(
                y, "blogger-lx", "Title leftover", "warblog note leftover",
                "Pyra leftover",
                "Incomplete never writes",
                "Push to WordPress (trap)",
                "../tpm/index.html", "Warblog leftover",
            ),
        ),
    )
    write(
        root / "blogger/more.html",
        wrap(y, "Blogger leftover — more", "<h1>More</h1><p><a href='index.html'>« Blogger</a></p>"),
    )

    # Warblog / TPM
    write(
        root / "tpm/index.html",
        wrap(
            y,
            "Warblog leftover — 2001",
            """
<h1>Talking Points leftover</h1>
<p>After September, political weblogs become daily leftover habit: TPM, Instapundit, Daily Dish. Literacy only. This is not the wiki chip and not a live blog.</p>
"""
            + machine(
                y, "tpm", "Name leftover post", "warblog leftover",
                "2001 warblog leftover · not the chip",
                "No live comments",
                "This is Twitter (trap)",
                "about.html", "Warblog about",
            ),
        ),
    )
    write(
        root / "tpm/about.html",
        wrap(
            y,
            "Warblog leftover — about",
            "<h1>About this leftover</h1><p>Instapundit / Dish are the other names on the rail. Empty never writes.</p>"
            + machine(
                y, "tpm-lx", "Name leftover rail", "instapundit leftover",
                "Literacy leftover",
                "Empty never writes",
                "Open live TPM (trap)",
                "../google/index.html", "Google leftover",
            ),
        ),
    )

    # Google sparse 2001
    write(
        root / "google/index.html",
        wrap(
            y,
            "Google — 2001 leftover",
            img(y, "google", "logo.gif", "Google")
            + """
<center>
<p style="font-family:Arial,sans-serif;font-size:12px">©2001 Google · leftover habit · not #1 visits</p>
<p>Nielsen Jun 2001: AOL / Yahoo / MSN still own mass. Google is about <b>#15</b>. Lucky is not this year’s chip.</p>
</center>
"""
            + machine(
                y, "google", "Search leftover", "nupedia leftover",
                "Sparse leftover · not the wiki chip",
                "Empty query never writes",
                "I'm Feeling Lucky is the 2001 star (trap)",
                "about.html", "Google leftover about",
            ),
        ),
    )
    write(
        root / "google/about.html",
        wrap(
            y,
            "Google leftover — about",
            "<h1>About Google leftover</h1><p>White page. Few words. Portals are still louder on TV.</p>"
            + machine(
                y, "google-lx", "Type leftover query", "wikipedia leftover",
                "2001 catalog leftover",
                "Empty never writes",
                "ChatGPT (trap)",
                "../yahoo/index.html", "Yahoo leftover",
            ),
        ),
    )
    write(
        root / "google/more.html",
        wrap(y, "Google leftover — more", "<h1>More</h1><p><a href='index.html'>« Google</a></p>"),
    )

    # Yahoo 2001 rails
    write(
        root / "yahoo/index.html",
        wrap(
            y,
            "Yahoo! — 2001 leftover portal",
            img(y, "yahoo", "logo.gif", "Yahoo!")
            + """
<h1>Yahoo!</h1>
<p>Still a mass portal leftover. In the News this door will only name <b>2001</b> rails: Afghanistan, iPod, Wikipedia, IE 6. Not 2000 NASDAQ as gold.</p>
<p><b>In the News (2001 leftover)</b> · Afghanistan · iPod pocket · anyone-can-edit encyclopedia · IE 6 ships</p>
"""
            + machine(
                y, "yahoo", "Open leftover category", "News leftover",
                "2001 portal leftover · not the wiki chip",
                "Browse leftover · empty never writes",
                "This is Google gold (trap)",
                "about.html", "Yahoo leftover about",
            )
            + '<p><a href="news.html">News leftover</a></p>',
        ),
    )
    write(
        root / "yahoo/about.html",
        wrap(
            y,
            "Yahoo leftover — about",
            "<h1>About Yahoo leftover</h1><p>Directory leftover still works. Search is not why this door exists.</p>"
            + machine(
                y, "yahoo-lx", "Name leftover cat", "Science leftover",
                "Directory leftover",
                "Empty never writes",
                "Sparse Google as 2001 gold (trap)",
                "../amazon/index.html", "Amazon smile",
            ),
        ),
    )
    write(
        root / "yahoo/news.html",
        wrap(
            y,
            "Yahoo leftover — 2001 news",
            "<h1>Yahoo News leftover</h1><p>Year-correct rails only. No 1999 leftover headlines as this year.</p>"
            + machine(
                y, "yahoo-news", "Open leftover headline", "afghanistan leftover",
                "Nov-class 2001 leftover",
                "Empty never writes",
                "Live Yahoo News (trap)",
                "../cnn/index.html", "CNN leftover",
            ),
        ),
    )

    # Amazon smile leftover (3–4 pages, not 24 books)
    smile = img(y, "amazon", "logo-smile.gif", "amazon.com")
    write(
        root / "amazon/index.html",
        wrap(
            y,
            "Amazon.com — smile leftover 2001",
            smile
            + """
<p style="font-family:verdana;font-size:11px">Jan 2000 smile held over as leftover shop. MapQuest was 2000’s one-thing. Wikipedia is 2001’s chip.</p>
<p><a href="search.html">Search leftover</a> · <a href="cart.html">Cart leftover</a> · <a href="about.html">About leftover</a></p>
"""
            + machine(
                y, "amz", "Search leftover book", "Harry Potter leftover",
                "Smile leftover · not the wiki chip",
                "No live checkout",
                "1-Click is 2001-new (trap)",
                "cart.html", "Cart leftover",
            ),
        ),
    )
    write(
        root / "amazon/cart.html",
        wrap(
            y,
            "Amazon leftover — cart",
            "<h1>Cart leftover</h1><p>Theater cart. Nothing ships.</p>"
            + machine(
                y, "amz-cart", "Name leftover item", "book leftover",
                "Cart leftover · not a live order",
                "Empty never writes",
                "Prime (trap)",
                "about.html", "Amazon leftover about",
            ),
        ),
    )
    write(
        root / "amazon/search.html",
        wrap(
            y,
            "Amazon leftover — search",
            "<h1>Search leftover</h1><p>Books and CDs leftover. No 1-Click gold.</p>"
            + machine(
                y, "amz-q", "Type leftover title", "being digital leftover",
                "Search leftover",
                "Empty never writes",
                "Buy with 1-Click (trap)",
                "index.html", "Amazon",
            ),
        ),
    )
    write(
        root / "amazon/about.html",
        wrap(
            y,
            "Amazon leftover — about",
            "<h1>About this leftover</h1><p>Smile logo continuity. Not this year’s chip.</p>"
            + machine(
                y, "amz-about", "Ack leftover smile", "smile leftover",
                "Held-over shop leftover",
                "Empty never writes",
                "Amazon launched in 2001 (trap)",
                "../cnn/index.html", "CNN leftover",
            ),
        ),
    )

    # CNN Nov 2001
    write(
        root / "cnn/index.html",
        wrap(
            y,
            "CNN.com — Nov 2001 leftover",
            img(y, "cnn", "logo.gif", "CNN")
            + """
<h1>CNN.com leftover</h1>
<p>WORLD · U.S. · BUSINESS · SCI-TECH. Nov 2001 costume. No gore gallery. Not live CNN.</p>
"""
            + machine(
                y, "cnn", "Open leftover headline", "afghanistan leftover",
                "Nov 2001 leftover rails",
                "Not live video",
                "Watch live CNN (trap)",
                "about.html", "CNN leftover about",
            )
            + '<p><a href="world.html">World leftover</a></p>',
        ),
    )
    write(
        root / "cnn/about.html",
        wrap(
            y,
            "CNN leftover — about",
            "<h1>About this leftover</h1><p>Careful 2001 news leftover. Wikipedia is the chip.</p>"
            + machine(
                y, "cnn-lx", "Name leftover desk", "SCI-TECH leftover",
                "Desk leftover",
                "Empty never writes",
                "Live CNN (trap)",
                "../mozilla/index.html", "Mozilla leftover",
            ),
        ),
    )
    write(
        root / "cnn/world.html",
        wrap(
            y,
            "CNN leftover — world",
            "<h1>World leftover</h1><p>2001 rails only. <a href='index.html'>« CNN</a></p>"
            + machine(
                y, "cnn-world", "Open leftover world", "world leftover",
                "World leftover",
                "Empty never writes",
                "Live map (trap)",
                "index.html", "CNN",
            ),
        ),
    )

    # Mozilla 0.9.4
    write(
        root / "mozilla/index.html",
        wrap(
            y,
            "Mozilla 0.9.4 leftover",
            """
<h1>Mozilla leftover</h1>
<p>0.9.4 class · open and bloated. <b>Not Firefox.</b> Firefox 1.0 is 9 Nov 2004.</p>
"""
            + machine(
                y, "moz", "Ack leftover suite", "0.9 leftover",
                "Open-source leftover · not Firefox",
                "Empty never writes",
                "Download Firefox 1.0 (trap)",
                "about.html", "Mozilla leftover about",
            ),
        ),
    )
    write(
        root / "mozilla/about.html",
        wrap(
            y,
            "Mozilla leftover — about",
            "<h1>About Mozilla leftover</h1><p>Mail + browser in one leftover suite.</p>"
            + machine(
                y, "moz-lx", "Name leftover build", "0.9.4 leftover",
                "Suite leftover",
                "Empty never writes",
                "This is Chrome (trap)",
                "../encarta/index.html", "Encarta leftover",
            ),
        ),
    )

    # Encarta
    write(
        root / "encarta/index.html",
        wrap(
            y,
            "Encarta leftover — paid vs wiki",
            """
<h1>Encarta leftover</h1>
<p>Paid encyclopedia leftover. Wikipedia is the chip: anyone can edit. Encarta does not become free because this door exists.</p>
"""
            + machine(
                y, "encarta", "Look up leftover article", "encarta leftover",
                "Paid leftover · not the wiki chip",
                "Empty never writes",
                "Encarta is the 2001 star (trap)",
                "about.html", "Encarta leftover about",
            ),
        ),
    )
    write(
        root / "encarta/about.html",
        wrap(
            y,
            "Encarta leftover — about",
            "<h1>About Encarta leftover</h1><p>CD / online leftover. Wiki is the save.</p>"
            + machine(
                y, "encarta-lx", "Name leftover topic", "solar system leftover",
                "CD leftover",
                "Empty never writes",
                "Wikipedia launched as Encarta (trap)",
                "../weblogs/index.html", "Weblogs.com ping",
            ),
        ),
    )

    # Weblogs.com ping
    write(
        root / "weblogs/index.html",
        wrap(
            y,
            "Weblogs.com ping leftover — Oct 2001",
            """
<h1>Weblogs.com leftover</h1>
<p>Dave Winer’s ping server · Oct 2001. Name a leftover feed. Not Twitter. Not the wiki chip.</p>
"""
            + machine(
                y, "ping", "Ping leftover URL", "http://leftover.example/index.xml",
                "Oct 2001 ping leftover",
                "Empty never writes",
                "This is Twitter (trap)",
                "about.html", "Ping leftover about",
            ),
        ),
    )
    write(
        root / "weblogs/about.html",
        wrap(
            y,
            "Weblogs.com leftover — about",
            "<h1>About pings</h1><p>A leftover list of recently updated weblogs. No live ping.</p>"
            + machine(
                y, "ping-lx", "Name leftover weblog", "scripting leftover",
                "Ping leftover",
                "Empty never writes",
                "Push live (trap)",
                "../playable/game.html", "Clickscape",
            ),
        ),
    )

    # XP / IE6 / MSN leftover habit
    write(
        root / "microsoft/index.html",
        wrap(
            y,
            "Internet Explorer 6 leftover",
            """
<h1>Internet Explorer 6 leftover</h1>
<p>Ships with XP · 25 Oct 2001 retail. This door’s shell. Not Edge. Not Chrome. Not the wiki chip.</p>
"""
            + machine(
                y, "ie6", "Ack leftover IE6", "ie6 leftover",
                "XP + IE6 leftover · this shell",
                "Empty never writes",
                "Download Edge (trap)",
                "ie6.html", "IE6 leftover hop",
            ),
        ),
    )
    write(
        root / "microsoft/ie6.html",
        wrap(
            y,
            "IE6 leftover — download theater",
            "<h1>IE6 leftover</h1><p>Theater download. The year already boots IE 6.</p>"
            + machine(
                y, "ie6-dl", "Ack leftover download", "ie6 leftover",
                "Download leftover · not a live installer",
                "Empty never writes",
                "Make Firefox the January shell (trap)",
                "../xp/index.html", "Windows XP leftover",
            ),
        ),
    )
    write(
        root / "xp/index.html",
        wrap(
            y,
            "Windows XP leftover — 25 Oct 2001",
            img(y, "xp", "start.gif", "start")
            + """
<h1>Windows XP leftover</h1>
<p>Retail 25 Oct 2001. Luna leftover. This door’s desktop. Not Vista.</p>
"""
            + machine(
                y, "xp", "Ack leftover Start", "start leftover",
                "XP leftover · not the wiki chip",
                "Empty never writes",
                "This is Windows 11 (trap)",
                "../msn/index.html", "MSN leftover",
            ),
        ),
    )
    write(
        root / "xp/about.html",
        wrap(
            y,
            "Windows XP leftover — about",
            "<h1>About XP leftover</h1><p>Always-on is rising, still not mass. Pew 21% is <b>2002</b>.</p>"
            + machine(
                y, "xp-lx", "Ack leftover desktop", "luna leftover",
                "Desktop leftover",
                "Empty never writes",
                "Always-on is already mass (trap)",
                "../../pages/home.html", "Starting Point",
            ),
        ),
    )
    write(
        root / "msn/index.html",
        wrap(
            y,
            "MSN leftover — habit, not gold",
            """
<h1>MSN leftover</h1>
<p>Mass visit leftover. Messenger is habit, not the 2001 chip. Wikipedia is the save.</p>
"""
            + machine(
                y, "msn", "Sign leftover", "you@hotmail.com",
                "Habit leftover · not the chip",
                "Empty never writes",
                "MSN is the 2001 gold (trap)",
                "about.html", "MSN leftover about",
            ),
        ),
    )
    write(
        root / "msn/about.html",
        wrap(
            y,
            "MSN leftover — about",
            "<h1>About MSN leftover</h1><p>AOL / Yahoo / MSN still own June visits.</p>"
            + machine(
                y, "msn-lx", "Ack leftover portal", "msn leftover",
                "Portal leftover",
                "Empty never writes",
                "Google is #1 this June (trap)",
                "../ebay/index.html", "eBay leftover",
            ),
        ),
    )

    # Continuity costume: ebay, slashdot, paypal, excite, dmoz, askjeeves
    write(
        root / "ebay/index.html",
        wrap(
            y,
            "eBay leftover — 2001",
            img(y, "ebay", "logo.gif", "eBay")
            + """
<h1>eBay leftover</h1>
<p>Bid leftover. Buy It Now is not the only path. Not the wiki chip.</p>
"""
            + machine(
                y, "ebay", "Place leftover bid", "12.00",
                "Bid leftover · theater only",
                "Empty never writes",
                "Buy It Now only (trap)",
                "about.html", "eBay leftover about",
            ),
        ),
    )
    write(
        root / "ebay/about.html",
        wrap(
            y,
            "eBay leftover — about",
            "<h1>About eBay leftover</h1><p>Continuity marketplace leftover.</p>"
            + machine(
                y, "ebay-lx", "Name leftover item", "laptop leftover",
                "Auction leftover",
                "Empty never writes",
                "Live wallet (trap)",
                "../slashdot/index.html", "Slashdot leftover",
            ),
        ),
    )
    write(
        root / "slashdot/index.html",
        wrap(
            y,
            "Slashdot leftover — 2001",
            "<h1>Slashdot leftover</h1><p>News for nerds leftover. Not Reddit.</p>"
            + machine(
                y, "slashdot", "Post leftover comment", "leftover comment",
                "Comment leftover",
                "Empty never writes",
                "This is Reddit (trap)",
                "about.html", "Slashdot leftover about",
            ),
        ),
    )
    write(
        root / "slashdot/about.html",
        wrap(
            y,
            "Slashdot leftover — about",
            "<h1>About Slashdot leftover</h1>"
            + machine(
                y, "slashdot-lx", "Open leftover story", "linux leftover",
                "Story leftover",
                "Empty never writes",
                "Reddit gold (trap)",
                "../paypal/index.html", "PayPal leftover",
            ),
        ),
    )
    write(
        root / "paypal/index.html",
        wrap(
            y,
            "PayPal leftover — 2001",
            img(y, "paypal", "logo.gif", "PayPal")
            + "<h1>PayPal leftover</h1><p>Send leftover theater. No live money.</p>"
            + machine(
                y, "paypal", "Send leftover", "20 leftover",
                "Send leftover · no live cash",
                "Empty never writes",
                "Live wallet (trap)",
                "about.html", "PayPal leftover about",
            ),
        ),
    )
    write(
        root / "paypal/about.html",
        wrap(
            y,
            "PayPal leftover — about",
            "<h1>About PayPal leftover</h1>"
            + machine(
                y, "paypal-lx", "Ack leftover send", "send leftover",
                "Continuity leftover",
                "Empty never writes",
                "Venmo (trap)",
                "../excite/index.html", "Excite leftover",
            ),
        ),
    )
    write(
        root / "excite/index.html",
        wrap(
            y,
            "Excite leftover — 2001",
            img(y, "excite", "logo.gif", "Excite")
            + "<h1>Excite leftover</h1><p>Portal leftover. @Home death is a 2002 honesty line.</p>"
            + machine(
                y, "excite", "Search leftover", "leftover query",
                "Portal leftover",
                "Empty never writes",
                "This is Google (trap)",
                "about.html", "Excite leftover about",
            ),
        ),
    )
    write(
        root / "excite/about.html",
        wrap(
            y,
            "Excite leftover — about",
            "<h1>About Excite leftover</h1>"
            + machine(
                y, "excite-lx", "Ack leftover portal", "excite leftover",
                "Continuity leftover",
                "Empty never writes",
                "Google gold (trap)",
                "../dmoz/index.html", "DMOZ leftover",
            ),
        ),
    )
    write(
        root / "dmoz/index.html",
        wrap(
            y,
            "Open Directory leftover — 2001",
            "<h1>DMOZ leftover</h1><p>Human catalog leftover. Not Google Directory as the chip.</p>"
            + machine(
                y, "dmoz", "Open leftover category", "computers leftover",
                "Catalog leftover",
                "Empty never writes",
                "Google Directory is the chip (trap)",
                "about.html", "DMOZ leftover about",
            ),
        ),
    )
    write(
        root / "dmoz/about.html",
        wrap(
            y,
            "DMOZ leftover — about",
            "<h1>About DMOZ leftover</h1>"
            + machine(
                y, "dmoz-lx", "Name leftover cat", "reference leftover",
                "Catalog leftover",
                "Empty never writes",
                "This is Wikipedia (trap)",
                "../askjeeves/index.html", "Ask Jeeves leftover",
            ),
        ),
    )
    write(
        root / "askjeeves/index.html",
        wrap(
            y,
            "Ask Jeeves leftover — 2001",
            img(y, "askjeeves", "logo.gif", "Ask Jeeves")
            + "<h1>Ask Jeeves leftover</h1><p>Question leftover. Not Google.</p>"
            + machine(
                y, "ask", "Ask leftover question", "what is wikipedia leftover",
                "Jeeves leftover",
                "Empty never writes",
                "This is Google (trap)",
                "about.html", "Jeeves leftover about",
            ),
        ),
    )
    write(
        root / "askjeeves/about.html",
        wrap(
            y,
            "Ask Jeeves leftover — about",
            "<h1>About Jeeves leftover</h1>"
            + machine(
                y, "ask-lx", "Ask leftover", "why leftover",
                "Question leftover",
                "Empty never writes",
                "Google gold (trap)",
                "../../pages/home.html", "Starting Point",
            ),
        ),
    )


def build_2002() -> None:
    y = "2002"
    root = ROOT / "years/2002/sites"

    write(
        root / "stumbleupon/more.html",
        wrap(
            y,
            "Stumble leftover — second topic",
            """
<h1>Stumble leftover</h1>
<p>This dest is <b>not</b> the star key. Pick a leftover topic. Empty never writes. Thumb-up on the star page writes <code>itt02-stumble</code>.</p>
"""
            + machine(
                y, "su-lx", "Name leftover topic", "blogs leftover",
                "Leftover topic hop · not the star",
                "Empty never writes",
                "This is the 2002 star (trap)",
                "../isp/index.html", "Always-on",
            ),
        ),
    )

    write(
        root / "isp/index.html",
        wrap(
            y,
            "Always-on leftover — Pew May 2002",
            img(y, "isp", "logo.gif", "")
            + """
<h1>Always-on leftover</h1>
<p>Pew May 2002: <b>21%</b> of US internet users / ~24M. Still a minority appliance. Cable or DSL leftover. Not 5G. Not the Stumble chip.</p>
"""
            + machine(
                y, "broadband", "Name leftover pipe", "cable leftover",
                "Pew 21% leftover · still a minority",
                "Empty never writes",
                "Always-on is already mass (trap)",
                "about.html", "Excite@Home leftover",
            ),
        ),
    )
    write(
        root / "isp/about.html",
        wrap(
            y,
            "Excite@Home leftover",
            "<h1>Excite@Home leftover</h1><p>The always-on story includes a death. Honesty leftover. No live ISP signup.</p>"
            + machine(
                y, "bb-lx", "Ack leftover death", "excite@home leftover",
                "2002 leftover honesty",
                "Empty never writes",
                "Sign up for 5G (trap)",
                "../kazaa/index.html", "KaZaA",
            ),
        ),
    )
    write(
        root / "isp/more.html",
        wrap(y, "Always-on leftover — more", "<h1>More</h1><p><a href='index.html'>« Always-on</a></p>"),
    )

    # KaZaA lite — keep index hooks
    write(
        root / "kazaa/lite.html",
        wrap(
            y,
            "KaZaA Lite leftover",
            img(y, "kazaa", "logo.gif", "KaZaA")
            + """
<h1>KaZaA Lite leftover</h1>
<p>Spyware literacy. The leftover warning, not a live installer. No real files.</p>
"""
            + machine(
                y, "kazaa-lite", "Ack leftover warning", "spyware leftover",
                "Lite leftover · not a real install",
                "No P2P bytes",
                "Download live torrent (trap)",
                "../wired/index.html", "Wired CSS",
            ),
        ),
    )
    patch_append(
        root / "kazaa/index.html",
        "ITT-N-kazaa-q",
        machine(
            y, "kazaa-q", "Search leftover (no files)", "song leftover",
            "FastTrack leftover · theater only",
            "Empty never writes",
            "Download the file (trap)",
            "lite.html", "KaZaA Lite leftover",
        ),
    )

    # Wired theme hop
    write(
        root / "wired/theme.html",
        wrap(
            y,
            "Wired leftover — second CSS path",
            """
<div class="wn-wrap">
<h1>Wired leftover theme</h1>
<p>Second CSS path. Oct 2002 StopDesign leftover. Not a table portal.</p>
</div>
"""
            + machine(
                y, "wired-css", "Ack leftover theme", "css leftover",
                "All-CSS leftover hop",
                "Empty never writes",
                "This is live Wired (trap)",
                "../phoenix/index.html", "Phoenix 0.1",
            ),
        ),
    )
    patch_append(
        root / "wired/index.html",
        "ITT-N-wired",
        '<p><a href="theme.html">Second CSS leftover path</a></p>'
        + machine(
            y, "wired", "Ack leftover CSS", "oct 2002 leftover",
            "All-CSS leftover · Oct 2002",
            "Not a table-only portal",
            "Open live Wired (trap)",
            "theme.html", "Theme leftover",
        ),
    )

    write(
        root / "phoenix/index.html",
        wrap(
            y,
            "Phoenix 0.1 leftover — 23 Sep 2002",
            """
<h1>Phoenix leftover</h1>
<p>0.1 · <b>23 Sep 2002</b>. Not Firefox branded yet. Firefox 1.0 is 9 Nov 2004.</p>
"""
            + machine(
                y, "phoenix", "Ack leftover 0.1", "phoenix leftover",
                "0.1 leftover · no Firefox wordmark",
                "Empty never writes",
                "Download Firefox 1.0 (trap)",
                "about.html", "Phoenix leftover about",
            ),
        ),
    )
    write(
        root / "phoenix/about.html",
        wrap(
            y,
            "Phoenix leftover — about",
            "<h1>About Phoenix leftover</h1><p>Standalone browser leftover next to the Mozilla suite.</p>"
            + machine(
                y, "phoenix-lx", "Ack leftover download", "0.1 leftover",
                "Download leftover · theater",
                "Empty never writes",
                "This is Chrome (trap)",
                "../mozilla/index.html", "Mozilla 1.0",
            ),
        ),
    )

    write(
        root / "mozilla/index.html",
        wrap(
            y,
            "Mozilla 1.0 leftover",
            "<h1>Mozilla 1.0 leftover</h1><p>Suite leftover: browser + mail + chat. Phoenix is the thin leftover next door.</p>"
            + machine(
                y, "mozilla", "Ack leftover suite", "1.0 leftover",
                "Suite leftover · not Firefox 1.0",
                "Empty never writes",
                "Download Firefox (trap)",
                "about.html", "Mozilla leftover about",
            ),
        ),
    )
    write(
        root / "mozilla/about.html",
        wrap(
            y,
            "Mozilla leftover — about",
            "<h1>About Mozilla leftover</h1>"
            + machine(
                y, "moz-suite", "Ack leftover mail", "mail leftover",
                "Mail+chat leftover",
                "Empty never writes",
                "Gmail (trap)",
                "../ipod/index.html", "iPod gen 2",
            ),
        ),
    )

    write(
        root / "ipod/index.html",
        wrap(
            y,
            "iPod gen 2 leftover — 17 Jul 2002",
            img(y, "apple", "logo.gif", "")
            + """
<h1>iPod (second generation) leftover</h1>
<p>Newsroom <b>17 Jul 2002</b>. Touch wheel leftover. <b>No Store.</b> Stumble is the chip.</p>
"""
            + machine(
                y, "ipod2", "Ack leftover gen 2", "touch wheel leftover",
                "17 Jul 2002 leftover · no Store",
                "Empty never writes",
                "Open iTunes Store (trap)",
                "specs.html", "Specs leftover",
            ),
        ),
    )
    write(
        root / "ipod/specs.html",
        wrap(
            y,
            "iPod gen 2 leftover — specs",
            "<h1>Specs leftover</h1><p>Capacity leftover. FireWire leftover. Store never writes.</p>"
            + machine(
                y, "ipod2-lx", "Note leftover capacity", "10 GB leftover",
                "Specs leftover",
                "Store never writes",
                "Buy on iTunes Store (trap)",
                "../friendster/index.html", "Friendster seed",
            ),
        ),
    )
    write(
        root / "ipod/about.html",
        wrap(y, "iPod gen 2 leftover — about", "<h1>About</h1><p><a href='index.html'>« iPod gen 2</a></p>"),
    )

    patch_append(
        root / "friendster/testimonials.html",
        "ITT-N-fs-seed",
        machine(
            y, "fs-seed", "Save leftover testimonial", "college roommate leftover",
            "Seed leftover · public mass is Mar 2003",
            "Empty never writes",
            "This is Facebook / MySpace (trap)",
            "../movabletype/trackback.html", "TrackBack",
        ),
    )

    write(
        root / "movabletype/about.html",
        wrap(
            y,
            "TrackBack leftover — about",
            "<h1>TrackBack leftover</h1><p>MT 2.2 · <b>26 Jun 2002</b>. Ping a leftover permalink.</p>"
            + machine(
                y, "tb-ping", "Ping leftover permalink", "http://leftover.example/post",
                "26 Jun 2002 leftover ping",
                "Empty never writes",
                "This is Twitter (trap)",
                "../daypop/index.html", "Daypop",
            ),
        ),
    )
    # Deepen trackback page without removing heading
    patch_append(
        root / "movabletype/trackback.html",
        "ITT-N-tb",
        '<p><a href="about.html">TrackBack leftover about</a></p>',
    )
    # Replace generic Save leftover on trackback with year-true machine
    tb = (root / "movabletype/trackback.html").read_text(encoding="utf-8")
    if "Save leftover" in tb:
        tb = re.sub(
            r'<label style="display:block"><input type="checkbox" data-req> Year-true leftover.*?</p>\n<p hidden data-next-flow.*?</p>',
            machine(
                y, "trackback", "Ping leftover", "permalink leftover",
                "MT 2.x leftover · 26 Jun 2002",
                "Empty never writes",
                "This is Twitter (trap)",
                "about.html", "TrackBack about",
            ).strip(),
            tb,
            count=1,
            flags=re.S,
        )
        (root / "movabletype/trackback.html").write_text(tb, encoding="utf-8")

    write(
        root / "daypop/index.html",
        wrap(
            y,
            "Daypop leftover",
            img(y, "daypop", "logo.gif", "Daypop")
            + "<h1>Daypop leftover</h1><p>Hottest leftover weblog links. Not Google.</p>"
            + machine(
                y, "daypop", "Open leftover link", "blog leftover",
                "Hottest leftover",
                "Empty never writes",
                "This is Google (trap)",
                "about.html", "Daypop leftover about",
            ),
        ),
    )
    write(
        root / "daypop/about.html",
        wrap(
            y,
            "Daypop leftover — about",
            "<h1>About Daypop leftover</h1>"
            + machine(
                y, "daypop-lx", "Name leftover query", "trackback leftover",
                "Query leftover",
                "Empty never writes",
                "Google gold (trap)",
                "../mtv/index.html", "MTV leftover",
            ),
        ),
    )

    write(
        root / "mtv/index.html",
        wrap(
            y,
            "MTV leftover — 2002",
            img(y, "mtv", "logo.gif", "MTV")
            + "<h1>MTV leftover</h1><p>Real / Windows Media leftover. Not Flash-only. Not the Stumble chip.</p>"
            + machine(
                y, "mtv", "Name leftover stream", "video leftover",
                "Plugin leftover · Real/WMP",
                "Empty never writes",
                "Play live MTV (trap)",
                "about.html", "MTV leftover about",
            ),
        ),
    )
    write(
        root / "mtv/about.html",
        wrap(
            y,
            "MTV leftover — about",
            "<h1>About MTV leftover</h1>"
            + machine(
                y, "mtv-lx", "Ack leftover plugin", "realplayer leftover",
                "Plugin leftover",
                "Empty never writes",
                "YouTube (trap)",
                "../lastfm/index.html", "last.fm leftover",
            ),
        ),
    )

    write(
        root / "lastfm/index.html",
        wrap(
            y,
            "last.fm leftover seed — 2002",
            img(y, "lastfm", "logo.gif", "last.fm")
            + "<h1>last.fm leftover</h1><p>Scrobble seed leftover. Not 2003+ social last.fm. Not the Stumble chip.</p>"
            + machine(
                y, "lastfm", "Name leftover artist", "radiohead leftover",
                "Scrobble leftover seed",
                "Empty never writes",
                "This is Spotify (trap)",
                "about.html", "last.fm leftover about",
            ),
        ),
    )
    write(
        root / "lastfm/about.html",
        wrap(
            y,
            "last.fm leftover — about",
            "<h1>About last.fm leftover</h1>"
            + machine(
                y, "scrobble", "Ack leftover scrobble", "scrobble leftover",
                "Seed leftover · not 2003 social",
                "Empty never writes",
                "Spotify gold (trap)",
                "../googlenews/index.html", "Google News",
            ),
        ),
    )

    write(
        root / "googlenews/index.html",
        wrap(
            y,
            "Google News BETA leftover — Sep 2002",
            img(y, "googlenews", "logo.gif", "Google News")
            + "<h1>Google News leftover</h1><p>Sep 2002 beta. Clusters leftover. <b>No blogs</b> in the cluster this year.</p>"
            + machine(
                y, "gnews", "Cluster leftover topic", "iraq leftover",
                "Sep 2002 leftover · no blogs",
                "Empty never writes",
                "This is Twitter (trap)",
                "about.html", "Google News leftover about",
            ),
        ),
    )
    write(
        root / "googlenews/about.html",
        wrap(
            y,
            "Google News leftover — about",
            "<h1>About Google News leftover</h1>"
            + machine(
                y, "gnews-lx", "Name leftover cluster", "broadband leftover",
                "Cluster leftover",
                "Empty never writes",
                "Blogs are in the 2002 cluster (trap)",
                "../wikipedia/index.html", "Wikipedia leftover",
            ),
        ),
    )

    write(
        root / "wikipedia/index.html",
        wrap(
            y,
            "Wikipedia leftover — 2002 continuity",
            "<h1>Wikipedia leftover</h1><p>Born 15 Jan <b>2001</b>. This door’s leftover encyclopedia. The edit star stays on the 2001 door. Empty never writes the 2001 star key.</p>"
            + machine(
                y, "wiki-lx", "Open leftover article", "leftover article",
                "2002 leftover · born 2001",
                "Empty never writes · not itt02-stumble",
                "This is the 2001 edit star (trap)",
                "about.html", "Wikipedia leftover about",
            ),
        ),
    )
    write(
        root / "wikipedia/about.html",
        wrap(
            y,
            "Wikipedia leftover — about",
            "<h1>About Wikipedia leftover</h1><p>Continuity leftover. Stumble is the 2002 chip.</p>"
            + machine(
                y, "wiki-lx2", "Name leftover article", "phoenix leftover",
                "Continuity leftover",
                "Empty never writes",
                "Edit as 2002 gold (trap)",
                "../amazon/index.html", "Amazon leftover",
            ),
        ),
    )

    write(
        root / "amazon/index.html",
        wrap(
            y,
            "Amazon smile leftover — 2002",
            img(y, "amazon", "logo-smile.gif", "amazon.com")
            + "<h1>Amazon leftover</h1><p>Smile held over. Stumble is the chip. No live checkout.</p>"
            + machine(
                y, "amz", "Search leftover book", "book leftover",
                "Smile leftover · not the chip",
                "Empty never writes",
                "1-Click live (trap)",
                "about.html", "Amazon leftover about",
            ),
        ),
    )
    write(
        root / "amazon/about.html",
        wrap(
            y,
            "Amazon leftover — about",
            "<h1>About Amazon leftover</h1>"
            + machine(
                y, "amz-lx", "Ack leftover smile", "smile leftover",
                "Held-over shop leftover",
                "Empty never writes",
                "Prime (trap)",
                "../yahoo/index.html", "Yahoo leftover",
            ),
        ),
    )
    write(
        root / "amazon/cart.html",
        wrap(
            y,
            "Amazon leftover — cart",
            "<h1>Cart leftover</h1>"
            + machine(
                y, "amz-cart", "Name leftover item", "cd leftover",
                "Cart leftover",
                "Empty never writes",
                "Live buy (trap)",
                "index.html", "Amazon",
            ),
        ),
    )

    write(
        root / "yahoo/index.html",
        wrap(
            y,
            "Yahoo leftover — 2002",
            img(y, "yahoo", "logo.gif", "Yahoo!")
            + "<h1>Yahoo leftover</h1><p>Mass portal leftover. Stumble is the chip. Always-on is still a minority.</p>"
            + machine(
                y, "yahoo", "Open leftover category", "News leftover",
                "2002 portal leftover",
                "Empty never writes",
                "This is Google gold (trap)",
                "about.html", "Yahoo leftover about",
            ),
        ),
    )
    write(
        root / "yahoo/about.html",
        wrap(
            y,
            "Yahoo leftover — about",
            "<h1>About Yahoo leftover</h1>"
            + machine(
                y, "yahoo-lx", "Name leftover cat", "Science leftover",
                "Directory leftover",
                "Empty never writes",
                "Lucky is 2002 gold (trap)",
                "../playable/game.html", "Room Sticky",
            ),
        ),
    )
    write(
        root / "yahoo/news.html",
        wrap(y, "Yahoo leftover — news", "<h1>News leftover</h1><p><a href='index.html'>« Yahoo</a></p>"),
    )

    write(
        root / "google/index.html",
        wrap(
            y,
            "Google leftover — 2002",
            img(y, "google", "logo.gif", "Google")
            + "<h1>Google leftover</h1><p>Still leftover habit. Google News is the 2002 leftover product next door. Stumble is the chip.</p>"
            + machine(
                y, "google", "Search leftover", "broadband leftover",
                "Search leftover · not the chip",
                "Empty never writes",
                "Lucky is the 2002 star (trap)",
                "about.html", "Google leftover about",
            ),
        ),
    )
    write(
        root / "google/about.html",
        wrap(
            y,
            "Google leftover — about",
            "<h1>About Google leftover</h1>"
            + machine(
                y, "google-lx", "Type leftover", "phoenix leftover",
                "Habit leftover",
                "Empty never writes",
                "ChatGPT (trap)",
                "../technorati/index.html", "Technorati leftover",
            ),
        ),
    )

    write(
        root / "technorati/index.html",
        wrap(
            y,
            "Technorati leftover seed — 2002",
            img(y, "technorati", "logo.gif", "Technorati")
            + "<h1>Technorati leftover</h1><p>Cosmos leftover. Name a leftover blog URL.</p>"
            + machine(
                y, "technorati", "Name leftover blog", "http://blogger.com/",
                "Cosmos leftover",
                "Empty never writes",
                "This is Google (trap)",
                "about.html", "Technorati leftover about",
            ),
        ),
    )
    write(
        root / "technorati/about.html",
        wrap(
            y,
            "Technorati leftover — about",
            "<h1>About Technorati leftover</h1>"
            + machine(
                y, "cosmos", "Name leftover cosmos", "plasticbag leftover",
                "Cosmos leftover",
                "Empty never writes",
                "Google gold (trap)",
                "../daypop/index.html", "Daypop",
            ),
        ),
    )

    write(
        root / "ebay/index.html",
        wrap(
            y,
            "eBay leftover — 2002",
            img(y, "ebay", "logo.gif", "eBay")
            + "<h1>eBay leftover</h1><p>Bid leftover. Stumble is the chip.</p>"
            + machine(
                y, "ebay", "Place leftover bid", "12.00",
                "Bid leftover",
                "Empty never writes",
                "Buy It Now only (trap)",
                "about.html", "eBay leftover about",
            ),
        ),
    )
    write(
        root / "ebay/about.html",
        wrap(
            y,
            "eBay leftover — about",
            "<h1>About eBay leftover</h1>"
            + machine(
                y, "ebay-lx", "Name leftover item", "disc leftover",
                "Auction leftover",
                "Empty never writes",
                "Live wallet (trap)",
                "../blogger/index.html", "Blogger leftover",
            ),
        ),
    )

    write(
        root / "blogger/index.html",
        wrap(
            y,
            "Blogger leftover — 2002",
            img(y, "blogger", "logo.gif", "Blogger")
            + "<h1>Blogger leftover</h1><p>Still Pyra leftover. TrackBack lives on Movable Type.</p>"
            + machine(
                y, "blogger", "Publish leftover post", "hello weblog leftover",
                "Pyra leftover",
                "Empty never writes",
                "This is Twitter (trap)",
                "about.html", "Blogger leftover about",
            ),
        ),
    )
    write(
        root / "blogger/about.html",
        wrap(
            y,
            "Blogger leftover — about",
            "<h1>About Blogger leftover</h1>"
            + machine(
                y, "blog-q", "Title leftover", "hello leftover",
                "Publish leftover",
                "Empty never writes",
                "Twitter (trap)",
                "../phoenix/index.html", "Phoenix",
            ),
        ),
    )

    write(
        root / "xp/index.html",
        wrap(
            y,
            "Windows XP leftover — 2002",
            img(y, "xp", "start.gif", "start")
            + "<h1>Windows XP leftover</h1><p>Continuity desktop. Always-on is still a minority (Pew 21%).</p>"
            + machine(
                y, "xp", "Ack leftover Start", "start leftover",
                "XP leftover · not the Stumble chip",
                "Empty never writes",
                "Vista (trap)",
                "../isp/index.html", "Always-on",
            ),
        ),
    )
    write(
        root / "xp/about.html",
        wrap(
            y,
            "Windows XP leftover — about",
            "<h1>About XP leftover</h1>"
            + machine(
                y, "xp-lx", "Ack leftover desktop", "luna leftover",
                "Desktop leftover",
                "Empty never writes",
                "Always-on is mass (trap)",
                "../../pages/home.html", "Starting Point",
            ),
        ),
    )


def rebuild_rooms(year: str) -> int:
    root = ROOT / "years" / year
    rooms = []
    for pth in sorted(root.rglob("*.html")):
        rel = pth.relative_to(root).as_posix()
        if rel == "index.html":
            continue
        rooms.append(rel)
    cfg = ROOT / f"js/config/{year}.js"
    text = cfg.read_text(encoding="utf-8")
    body = ",\n    ".join(f'"{r}"' for r in rooms)
    new = re.sub(
        r"var rooms = \[\n.*?\n  \];",
        "var rooms = [\n    " + body + "\n  ];",
        text,
        count=1,
        flags=re.S,
    )
    if "var rooms = [" not in new:
        raise SystemExit(f"rooms[] rewrite failed {year}")
    cfg.write_text(new, encoding="utf-8")
    return len(rooms)


def rebuild_2x() -> None:
    path = ROOT / "e2e/2x-links.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    kept = [r for r in rows if r.get("year") not in {"2001", "2002"}]
    for year, items in MATRIX.items():
        nxt_star, lab_star = STAR[year]
        for i, (rel, suf, title) in enumerate(items):
            nxt_rel, nxt_lab = (items[i + 1][0], items[i + 1][2]) if i + 1 < len(items) else (nxt_star, lab_star)
            kept.append(
                {
                    "year": year,
                    "path": f"/years/{year}/{rel}",
                    "key": f"itt{year[2:]}-{suf}",
                    "kind": "query",
                    "title": title,
                    "next": f"/years/{year}/{nxt_rel}",
                    "nextLabel": nxt_lab,
                }
            )
    path.write_text(json.dumps(kept, indent=2) + "\n", encoding="utf-8")


def replace_js_string_key(path: Path, year: str, html: str) -> None:
    text = path.read_text(encoding="utf-8")
    key = f'  "{year}": '
    i = text.find(key)
    if i < 0:
        raise SystemExit(f"missing {year} in {path}")
    j = text.find('"', i + len(key))
    k = j + 1
    while k < len(text):
        if text[k] == "\\":
            k += 2
            continue
        if text[k] == '"':
            break
        k += 1
    encoded = json.dumps(html, ensure_ascii=False)
    path.write_text(text[:i] + key + encoded + text[k + 1 :], encoding="utf-8")


def forest_start(year: str) -> str:
    if year == "2001":
        mass = (
            '<p class="itt-mass-honesty" data-itt-mass="2001" style="font-family:Arial,sans-serif;'
            'font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em">'
            "<b>AOL / Yahoo / MSN</b> still own June visits. Google is about #15. "
            "Gold is Wikipedia edit. Preview is not Save. No iTunes Store. "
            f"ILS June <b>29,254,370</b> websites · <b>500,609,240</b> users.</p>"
        )
        felt = (
            '<p class="itt-felt-trail">After you preview: '
            '<a href="../sites/wikipedia/edit.html">edit Wikipedia</a> — preview is not Save.</p>'
        )
        chips = [
            ("../sites/wikipedia/edit.html", "Wikipedia", "anyone can edit"),
            ("../sites/archive/index.html", "Wayback", "24 Oct public"),
            ("../sites/itunes/index.html", "iTunes", "library · no Store"),
            ("../sites/apple/ipod.html", "iPod", "1,000 songs · $399"),
            ("../sites/blogdex/index.html", "Blogdex", "Jul MIT"),
            ("../sites/movabletype/index.html", "Movable Type", "8 Oct"),
            ("../sites/tpm/index.html", "Warblog", "TPM leftover"),
            ("../sites/weblogs/index.html", "Weblogs.com", "Oct ping"),
        ]
        thesis = "Anyone can edit. Preview is not Save. Portals are leftover costume."
    else:
        mass = (
            '<p class="itt-mass-honesty" data-itt-mass="2002" style="font-family:Arial,sans-serif;'
            'font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em">'
            "<b>Always-on is still a minority</b> (Pew May 2002: 21% / ~24M). "
            "Gold is Stumble. Empty topic never writes. No Store. No MySpace. "
            f"ILS June <b>38,760,373</b> websites · <b>662,663,600</b> users.</p>"
        )
        felt = (
            '<p class="itt-felt-trail">Click <a href="../sites/stumbleupon/index.html">Stumble</a> — '
            "empty topic never writes.</p>"
        )
        chips = [
            ("../sites/stumbleupon/index.html", "StumbleUpon", "topic + thumb"),
            ("../sites/isp/index.html", "Always-on", "Pew 21%"),
            ("../sites/kazaa/index.html", "KaZaA", "no real files"),
            ("../sites/wired/index.html", "Wired", "Oct CSS"),
            ("../sites/phoenix/index.html", "Phoenix", "0.1"),
            ("../sites/friendster/index.html", "Friendster", "seed · mass 2003"),
            ("../sites/googlenews/index.html", "Google News", "Sep beta"),
            ("../sites/daypop/index.html", "Daypop", "hottest"),
        ]
        thesis = "Stumble is the save. Always-on is still a minority. No Store. No MySpace."

    chip_html = "".join(
        f'<a href="{h}" class="chip-blue"><b>{l}</b><br><span style="color:#666">{s}</span></a>\n'
        for h, l, s in chips
    )
    sites = ROOT / f"years/{year}/sites"
    groups = []
    for slug in sorted(p.name for p in sites.iterdir() if p.is_dir()):
        pages = sorted(p.relative_to(sites / slug).as_posix() for p in (sites / slug).rglob("*.html"))
        links = []
        for pg in pages:
            lab = slug if pg == "index.html" else f"{slug}/{pg.replace('.html', '')}"
            links.append(f'<a href="../sites/{slug}/{pg}">{lab}</a>')
        groups.append(f'<p style="margin:4px 0;font-size:12px"><b>{slug}</b> — ' + " · ".join(links) + "</p>")
    return (
        mass + felt
        + '<p class="itt-continuity-note" data-itt-forest="1" style="font-family:Arial,sans-serif;font-size:11px;'
        'margin:8px 0;padding:6px 8px;background:#ffffcc;border:1px dashed #996;max-width:48em">'
        "Portal leftover rooms are <b>year costume</b>, not a 2000 photocopy. "
        f"Year-true {year} products sit on the chips and the star.</p>"
        f'<table class="itt-start" cellpadding="0" cellspacing="0" border="0">'
        f'<tr><td class="itt-start-title"><b>Starting Point — {year}</b>'
        f'<span class="itt-start-meta"> · Windows XP · Internet Explorer 6</span></td></tr>'
        f'<tr><td class="itt-start-thesis"><b>{thesis}</b></td></tr>'
        f'<tr><td class="itt-start-body"><div data-itt-tour></div>'
        f'<p class="itt-flow-map-link"><a href="map.html"><b>&#9783; {year} UX flow map</b></a></p>'
        f'<div class="itt-product-chips"><b class="itt-chips-label">Open these first</b>\n{chip_html}</div>'
        f'<h2 style="font-size:14px">Rooms this year</h2>\n'
        + "\n".join(groups)
        + "</td></tr></table>"
    )


def rewrite_map(year: str) -> None:
    root = ROOT / f"years/{year}"
    sites = root / "sites"
    star_href, star_lab = STAR[year]
    lis = [f'<li><a href="../{star_href}">★ {star_lab}</a></li>']
    for slug in sorted(p.name for p in sites.iterdir() if p.is_dir()):
        lis.append(f'<li><a href="../sites/{slug}/index.html">{slug}</a></li>')
    write(
        root / "pages/map.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{year} — UX flow map</title>
<link rel="stylesheet" href="../../../css/period-{year}.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>{year} flow map</h1>
<p>Star first. Named leftover dests have a year-true verb. Incomplete never writes.</p>
<ul>
{chr(10).join(lis)}
</ul>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-{year}.js"></script>
</body>
</html>
""",
    )


def patch_start_data() -> None:
    path = ROOT / "ui/year/start-data.js"
    text = path.read_text(encoding="utf-8")
    b01 = '''  "2001": {
    "href": "../sites/wikipedia/edit.html",
    "label": "★ One-thing · Wikipedia edit REAL",
    "items": [
      "<a href=\\"about.html\\">About 2001</a> — memory · jukebox · monopoly",
      "<a href=\\"../sites/wikipedia/edit.html\\">Wikipedia</a> — preview is not Save",
      "<a href=\\"../sites/archive/index.html\\">Wayback leftover</a> — Oct 24 public",
      "<a href=\\"../sites/itunes/index.html\\">iTunes library leftover</a> — no Store",
      "<a href=\\"../sites/apple/ipod.html\\">iPod leftover</a> — 1,000 songs · $399",
      "<a href=\\"../sites/blogdex/index.html\\">Blogdex</a> · <a href=\\"../sites/tpm/index.html\\">Warblog</a> · <a href=\\"../sites/weblogs/index.html\\">ping</a>",
      "<a href=\\"../sites/amazon/index.html\\">Amazon smile leftover</a> · <a href=\\"../sites/yahoo/index.html\\">Yahoo leftover</a>",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  }'''
    b02 = '''  "2002": {
    "href": "../sites/stumbleupon/index.html",
    "label": "★ One-thing · StumbleUpon REAL",
    "items": [
      "<a href=\\"about.html\\">About 2002</a> — always-on minority · Stumble",
      "<a href=\\"../sites/stumbleupon/index.html\\">StumbleUpon</a> — topic + Stumble",
      "<a href=\\"../sites/isp/index.html\\">Always-on leftover</a> — Pew 21%",
      "<a href=\\"../sites/kazaa/index.html\\">KaZaA leftover</a> — no real files",
      "<a href=\\"../sites/wired/index.html\\">Wired CSS leftover</a> — Oct redesign",
      "<a href=\\"../sites/friendster/index.html\\">Friendster seed</a> · <a href=\\"../sites/phoenix/index.html\\">Phoenix 0.1</a>",
      "<a href=\\"../sites/googlenews/index.html\\">Google News</a> · <a href=\\"../sites/daypop/index.html\\">Daypop</a>",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  }'''
    text = re.sub(r'  "2001": \{.*?\n  \}', b01, text, count=1, flags=re.S)
    text = re.sub(r'  "2002": \{.*?\n  \}', b02, text, count=1, flags=re.S)
    path.write_text(text, encoding="utf-8")


def patch_years_dir() -> None:
    path = ROOT / "ui/year/years.js"
    text = path.read_text(encoding="utf-8")
    d01 = """    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/wikipedia/index.html", "label": "Wikipedia"},
      {"go": "sites/archive/index.html", "label": "Wayback"},
      {"go": "sites/apple/ipod.html", "label": "iPod"},
      {"go": "sites/itunes/index.html", "label": "iTunes"},
      {"go": "sites/blogdex/index.html", "label": "Blogdex"},
      {"go": "sites/tpm/index.html", "label": "Warblog"},
      {"go": "sites/google/index.html", "label": "Google"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "sites/amazon/index.html", "label": "Amazon"},
      {"go": "pages/about.html", "label": "About"}
    ],"""
    d02 = """    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/stumbleupon/index.html", "label": "Stumble"},
      {"go": "sites/kazaa/index.html", "label": "KaZaA"},
      {"go": "sites/wired/index.html", "label": "Wired"},
      {"go": "sites/friendster/index.html", "label": "Friendster"},
      {"go": "sites/phoenix/index.html", "label": "Phoenix"},
      {"go": "sites/isp/index.html", "label": "Always-on"},
      {"go": "sites/googlenews/index.html", "label": "Google News"},
      {"go": "sites/daypop/index.html", "label": "Daypop"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "pages/about.html", "label": "About"}
    ],"""
    for year, new_dir in (("2001", d01), ("2002", d02)):
        m = re.search(rf'  "{year}": \{{.*?"dir": \[.*?\n    \],', text, re.S)
        if not m:
            raise SystemExit(f"years.js dir {year}")
        old = m.group(0)
        prefix = old[: old.find('"dir":')]
        text = text[: m.start()] + prefix + new_dir + text[m.end() :]
    path.write_text(text, encoding="utf-8")


def patch_docs() -> None:
    dt = ROOT / "docs/DISK-TRUTH.md"
    t = dt.read_text(encoding="utf-8")
    t = t.replace(
        "| **2001** | Live forest · Wikipedia edit `itt01-wiki` |\n| **2002** | Live forest · StumbleUpon `itt02-stumble` |",
        "| **2001** | Live forest (criteria) · Wikipedia edit `itt01-wiki` · named leftover 18 year-true |\n| **2002** | Live forest (criteria) · StumbleUpon `itt02-stumble` · named leftover 18 year-true |",
    )
    dt.write_text(t, encoding="utf-8")
    for rf, label in (
        (ROOT / "docs/2001-READ-FIRST.md", "2001"),
        (ROOT / "docs/2002-READ-FIRST.md", "2002"),
    ):
        rt = rf.read_text(encoding="utf-8")
        rt = rt.replace("**LEAN DOOR LIVE**", "**CRITERIA FOREST LIVE**")
        rt = rt.replace("**Lean door on disk.**", "**Criteria forest on disk** (named leftover 18 year-true · not a 2000 clone).")
        rf.write_text(rt, encoding="utf-8")


def main() -> int:
    n1 = strip_clones("2001", KEEP_2001)
    n2 = strip_clones("2002", KEEP_2002)
    print(f"stripped clone folders 2001={n1} 2002={n2}")
    build_2001()
    build_2002()
    r1 = rebuild_rooms("2001")
    r2 = rebuild_rooms("2002")
    rebuild_2x()
    replace_js_string_key(ROOT / "ui/year/start-extra.js", "2001", forest_start("2001"))
    replace_js_string_key(ROOT / "ui/year/start-extra.js", "2002", forest_start("2002"))
    patch_start_data()
    patch_years_dir()
    rewrite_map("2001")
    rewrite_map("2002")
    patch_docs()
    for y in ("2001", "2002"):
        html = len(list((ROOT / f"years/{y}").rglob("*.html")))
        sites = len([p for p in (ROOT / f"years/{y}/sites").iterdir() if p.is_dir()])
        print(f"{y}: html={html} sites={sites} rooms[]={r1 if y=='2001' else r2}")
    print("criteria implement done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
