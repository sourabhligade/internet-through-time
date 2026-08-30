#!/usr/bin/env python3
"""Museum-grade leftover polish for thin-looking years.

Does NOT pad dest counts or break HTML caps.
- 2007: add the one named leftover still missing (Android OHA).
- 1994–2006: turn factory 5× plaques into year-true ticks + visible trap.
- 2007/2009/2016/2020/2024 dest index pages: rename generic Type leftover
  hops/go to year-true verbs. Suffixes stay so 2× e2e still matches.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from itt_leftover_dest import (  # noqa: E402
    add_home_strip,
    add_location_hints,
    add_map_block,
    append_matrix_row,
    prepend_rooms,
    write_if_missing,
)
import json

# path relative years/YYYY/... → (tick_a, tick_b, save, trap)
FIVE_X = {
    "1994/sites/iuma/index.html": (
        "IUMA leftover — MP2 helper-app theater, not a stream",
        "Not Cool Site of the Day gold",
        "Note leftover IUMA",
        "Stream live MP3 now (trap)",
    ),
    "1994/sites/ncsa/index.html": (
        "NCSA Mosaic leftover — starting points / What’s New",
        "Not Cool Site of the Day gold",
        "Open leftover Mosaic",
        "This is Netscape gold (trap)",
    ),
    "1995/sites/hotwired/index.html": (
        "HotWired leftover — 1995 banner / Signal",
        "Not SSL checkout gold",
        "Open leftover HotWired",
        "This is the 1995 star (trap)",
    ),
    "1995/sites/geocities/homestead.html": (
        "GeoCities homestead leftover — neighborhood, not a live host",
        "Not SSL checkout gold",
        "Note leftover homestead",
        "Publish a live homestead (trap)",
    ),
    "1996/sites/angelfire/index.html": (
        "Angelfire leftover — 1996 free host",
        "Not portal-wars gold",
        "Note leftover Angelfire",
        "This is the 1996 star (trap)",
    ),
    "1996/sites/realplayer/index.html": (
        "RealPlayer leftover — buffer theater, not a live stream",
        "Not portal-wars gold",
        "Note leftover buffer",
        "Play a live stream (trap)",
    ),
    "1996/sites/yahoo/index.html": (
        "Yahoo leftover — 1996 directory residual",
        "Not portal-wars gold",
        "Open leftover directory",
        "Yahoo is the 1996 star (trap)",
    ),
    "1997/sites/apple/index.html": (
        "Think Different leftover — 1997 campaign literacy",
        "Not PointCast gold",
        "Note leftover campaign",
        "This is the 1997 star (trap)",
    ),
    "1997/sites/slashdot/index.html": (
        "Slashdot leftover — 1997 story / moderate",
        "Not PointCast gold",
        "Open leftover story",
        "This is the 1997 star (trap)",
    ),
    "1997/sites/ebay/index.html": (
        "eBay leftover — 1997 auction residual",
        "Not PointCast gold",
        "Note leftover bid",
        "Live bid / this is the star (trap)",
    ),
    "1997/sites/icq/index.html": (
        "ICQ leftover — 1997 UIN residual",
        "Not PointCast gold",
        "Note leftover UIN",
        "This is the 1997 star (trap)",
    ),
    "1998/sites/mozilla/index.html": (
        "mozilla.org leftover — 1998 source split",
        "Not I’m Feeling Lucky gold",
        "Note leftover mozilla.org",
        "This is Google gold (trap)",
    ),
    "1998/sites/amazon/index.html": (
        "Amazon leftover — 1998 store residual",
        "Not I’m Feeling Lucky gold",
        "Note leftover catalog",
        "This is Google gold (trap)",
    ),
    "1998/sites/google/index.html": (
        "Google leftover literacy — not Lucky as this 5×",
        "Lucky is the year gold · this plaque is leftover",
        "Note leftover Google",
        "I’m Feeling Lucky writes here (trap)",
    ),
    "1998/sites/dmoz/index.html": (
        "DMOZ leftover — 1998 open directory",
        "Not I’m Feeling Lucky gold",
        "Note leftover DMOZ",
        "This is Google gold (trap)",
    ),
    "1998/sites/altavista/index.html": (
        "AltaVista leftover — 1998 residual search",
        "Not I’m Feeling Lucky gold",
        "Note leftover AltaVista",
        "This is Google gold (trap)",
    ),
    "1999/sites/ebay/index.html": (
        "eBay leftover — 1999 auction residual",
        "Not AIM gold",
        "Note leftover auction",
        "This is AIM gold (trap)",
    ),
    "1999/sites/paypal/index.html": (
        "PayPal leftover — 1999 send residual",
        "Not AIM gold",
        "Note leftover send",
        "Live send / this is AIM (trap)",
    ),
    "1999/sites/napster/index.html": (
        "Napster leftover — 1999 search residual",
        "Not AIM gold",
        "Note leftover search",
        "Live download / this is AIM (trap)",
    ),
    "1999/sites/blogger/index.html": (
        "Blogger leftover — 1999 publish residual",
        "Not AIM gold",
        "Note leftover blog",
        "This is AIM gold (trap)",
    ),
    "2000/sites/amazon/index.html": (
        "Amazon leftover — 2000 smile residual",
        "Not MapQuest gold",
        "Note leftover smile",
        "This is MapQuest gold (trap)",
    ),
    "2000/sites/pets/index.html": (
        "Pets.com leftover — 2000 crash residual",
        "Not MapQuest gold",
        "Note leftover sock puppet",
        "This is MapQuest gold (trap)",
    ),
    "2000/sites/ebay/index.html": (
        "eBay leftover — 2000 residual",
        "Not MapQuest gold",
        "Note leftover bid",
        "This is MapQuest gold (trap)",
    ),
    "2000/sites/napster/index.html": (
        "Napster leftover — 2000 residual",
        "Not MapQuest gold",
        "Note leftover search",
        "This is MapQuest gold (trap)",
    ),
    "2000/sites/flash4/index.html": (
        "Flash leftover — 2000 plugin residual",
        "Not MapQuest gold",
        "Note leftover Flash",
        "Play live SWF (trap)",
    ),
    "2001/sites/apple/ipod.html": (
        "iPod leftover — 2001 1,000 songs residual",
        "Not Wikipedia gold",
        "Note leftover iPod",
        "This is Wikipedia gold (trap)",
    ),
    "2001/sites/wikipedia/index.html": (
        "Wikipedia leftover literacy — not the gold 5×",
        "The wiki-pages gold is a different verb",
        "Note leftover Wikipedia",
        "This 5× is the year gold (trap)",
    ),
    "2001/sites/movabletype/index.html": (
        "Movable Type leftover — 2001 publish residual",
        "Not Wikipedia gold",
        "Note leftover MT",
        "This is Wikipedia gold (trap)",
    ),
    "2001/sites/wayback/index.html": (
        "Wayback leftover — 2001 archive residual",
        "Not Wikipedia gold",
        "Note leftover Wayback",
        "This is Wikipedia gold (trap)",
    ),
    "2001/sites/broadband/index.html": (
        "Broadband leftover — 2001 always-on residual",
        "Not Wikipedia gold",
        "Note leftover broadband",
        "This is Wikipedia gold (trap)",
    ),
    "2003/sites/wordpress/index.html": (
        "WordPress leftover — 2003 publish residual",
        "Not Photobucket gold",
        "Note leftover WP",
        "This is Photobucket gold (trap)",
    ),
    "2003/sites/myspace/index.html": (
        "MySpace leftover — 2003 profile residual",
        "Not Photobucket gold",
        "Note leftover profile",
        "This is Photobucket gold (trap)",
    ),
    "2003/sites/itunes/index.html": (
        "iTunes Store leftover — 2003 99¢ residual",
        "Not Photobucket gold",
        "Note leftover 99¢",
        "This is Photobucket gold (trap)",
    ),
    "2003/sites/adsense/index.html": (
        "AdSense leftover — 2003 ads residual",
        "Not Photobucket gold",
        "Note leftover AdSense",
        "This is Photobucket gold (trap)",
    ),
    "2003/sites/linkedin/index.html": (
        "LinkedIn leftover — 2003 network residual",
        "Not Photobucket gold",
        "Note leftover LinkedIn",
        "This is Photobucket gold (trap)",
    ),
    "2004/sites/firefox/index.html": (
        "Firefox leftover — 2004 1.0 residual",
        "Not Thefacebook networks gold",
        "Note leftover Firefox",
        "This is Thefacebook gold (trap)",
    ),
    "2004/sites/flickr/index.html": (
        "Flickr leftover — 2004 photostream residual",
        "Not Thefacebook networks gold",
        "Note leftover Flickr",
        "This is Thefacebook gold (trap)",
    ),
    "2004/sites/digg/index.html": (
        "Digg leftover — 2004 bury residual",
        "Not Thefacebook networks gold",
        "Note leftover Digg",
        "This is Thefacebook gold (trap)",
    ),
    "2004/sites/folklore/index.html": (
        "Folklore leftover — 2004 oral history residual",
        "Not Thefacebook networks gold",
        "Note leftover folklore",
        "This is Thefacebook gold (trap)",
    ),
    "2004/sites/gmail/index.html": (
        "Gmail leftover — 2004 invite residual",
        "Not Thefacebook networks gold",
        "Note leftover invite",
        "This is Thefacebook gold (trap)",
    ),
    "2005/sites/firefox/index.html": (
        "Firefox leftover — 2005 residual",
        "Not YouTube upload gold",
        "Note leftover Firefox",
        "This is YouTube gold (trap)",
    ),
    "2005/sites/flickr/index.html": (
        "Flickr leftover — 2005 residual",
        "Not YouTube upload gold",
        "Note leftover Flickr",
        "This is YouTube gold (trap)",
    ),
    "2005/sites/folklore/index.html": (
        "Folklore leftover — 2005 residual",
        "Not YouTube upload gold",
        "Note leftover folklore",
        "This is YouTube gold (trap)",
    ),
    "2005/sites/gmail/index.html": (
        "Gmail leftover — 2005 residual",
        "Not YouTube upload gold",
        "Note leftover Gmail",
        "This is YouTube gold (trap)",
    ),
    "2006/sites/ask/index.html": (
        "Ask leftover — 2006 residual search",
        "Not Twitter 140 gold",
        "Note leftover Ask",
        "This is Twitter gold (trap)",
    ),
    "2006/sites/msn/index.html": (
        "MSN leftover — 2006 portal residual",
        "Not Twitter 140 gold",
        "Note leftover MSN",
        "This is Twitter gold (trap)",
    ),
    "2006/sites/aol/index.html": (
        "AOL leftover — 2006 portal residual",
        "Not Twitter 140 gold",
        "Note leftover AOL",
        "This is Twitter gold (trap)",
    ),
}

# dest index.html only — (old_go_or_hop_text → new). Applied as exact button text replace.
# Keep data-4x-go suffixes.
RELABEL = {
    ("2007", "friendfeed"): [("Open A", "Open leftover source A"), ("Open B", "Open leftover source B"), ("Second leftover pack", "Note leftover FriendFeed"), ("Save leftover", "Note leftover FriendFeed")],
    ("2007", "maps"): [("Open A", "Pan leftover Street View"), ("Open B", "Note leftover 29 May"), ("Type leftover", "Type leftover Street View")],
    ("2007", "kindle"): [("Type leftover", "Type leftover Kindle $399")],
    ("2007", "twitter"): [("Type leftover", "Type leftover SXSW 140")],
    ("2007", "wikipedia"): [("Open leftover", "Open leftover article"), ("Save second leftover", "Note leftover Wikipedia")],
    ("2007", "amazon"): [("Save second leftover", "Note leftover Amazon store")],
    ("2007", "justintv"): [("Type leftover", "Type leftover Justin.tv")],
    ("2007", "rickroll"): [("Type leftover", "Type leftover Rickroll")],
    ("2007", "kindlestore"): [("Type leftover", "Type leftover Whispernet")],
    ("2007", "opensocial"): [("Type leftover", "Type leftover OpenSocial")],
    ("2007", "qik"): [("Type leftover", "Type leftover Qik")],
    ("2007", "myspace"): [("Save leftover", "Note leftover MySpace"), ("Type leftover", "Type leftover MySpace")],
    ("2007", "ustream"): [("Type leftover", "Type leftover Ustream")],
    ("2007", "tumblr"): [("Type leftover", "Type leftover tumblelog")],
    ("2007", "etsy"): [("Save leftover", "Note leftover Etsy")],
    ("2007", "youtube"): [("Type leftover", "Type leftover YouTube Flash")],
    ("2007", "netflix"): [("Type leftover", "Type leftover Watch Now")],
    ("2007", "digg"): [("Save leftover", "Note leftover Digg"), ("Type leftover", "Type leftover Digg")],
    ("2007", "facebook"): [("Save leftover", "Note leftover Platform")],
    ("2007", "iphone"): [("Save leftover", "Note leftover Safari")],
    ("2007", "vista"): [("Save leftover", "Note leftover Vista"), ("Type leftover", "Type leftover Vista")],
    ("2007", "hulu"): [("Save leftover", "Note leftover Hulu beta")],
    ("2007", "gmail"): [("Save leftover", "Note leftover Gmail open")],
    ("2007", "yahoo"): [("Save second leftover", "Note leftover Yahoo portal")],
    ("2009", "friendfeed09"): [("Save second leftover", "Note leftover FriendFeed epitaph")],
    ("2009", "twitter"): [("Type leftover", "Type leftover 140"), ("Save leftover", "Note leftover tweets")],
    ("2009", "chrome09"): [("Save second leftover", "Note leftover Chrome rising")],
    ("2009", "kickstarter"): [("Type leftover", "Type leftover project"), ("Save leftover", "Note leftover Kickstarter")],
    ("2009", "wikipedia"): [("Type leftover", "Type leftover article"), ("Save leftover", "Note leftover Wikipedia")],
    ("2009", "farmville"): [("Hop leftover", "Harvest leftover hop"), ("Connect", "Note leftover FarmVille"), ("Save leftover", "Note leftover FarmVille")],
    ("2009", "appstore"): [("Type leftover", "Type leftover App Store"), ("Save leftover", "Note leftover App Store")],
    ("2009", "googlewave"): [("Save second leftover", "Note leftover Wave invite")],
    ("2009", "android09"): [("Save second leftover", "Note leftover Android handset")],
    ("2009", "bing"): [("Type leftover", "Type leftover decision engine"), ("Ack leftover", "Ack leftover Bing"), ("Save leftover", "Note leftover Bing")],
    ("2009", "wolframalpha"): [("Type leftover", "Type leftover Wolfram"), ("Save leftover", "Note leftover Wolfram")],
    ("2009", "foursquare"): [("Type leftover", "Type leftover check-in"), ("Save leftover", "Note leftover Foursquare")],
    ("2009", "ubercab"): [("Type leftover", "Type leftover UberCab"), ("Save leftover", "Note leftover UberCab")],
    ("2009", "youtube"): [("Type leftover", "Type leftover YouTube"), ("Save leftover", "Note leftover YouTube")],
    ("2009", "omegle"): [("Ack leftover", "Ack leftover Omegle"), ("Connect", "Note leftover stranger"), ("Save leftover", "Note leftover Omegle")],
    ("2009", "dropbox09"): [("Save second leftover", "Note leftover Dropbox")],
    ("2009", "spotifyeu"): [("Save second leftover", "Note leftover Spotify EU")],
    ("2009", "iphone"): [("Ack leftover", "Ack leftover 3GS"), ("Save leftover", "Note leftover 3GS")],
    ("2009", "windows7"): [("Ack leftover", "Ack leftover Win7"), ("Save leftover", "Note leftover Win7")],
    ("2009", "mafiawars"): [("Type leftover", "Type leftover Mafia Wars"), ("Save leftover", "Note leftover Mafia Wars")],
    ("2009", "whatsapp"): [("Type leftover", "Type leftover WhatsApp seed"), ("Connect", "Note leftover WhatsApp"), ("Save leftover", "Note leftover WhatsApp")],
    ("2009", "chatroulette"): [("Ack leftover", "Ack leftover Chatroulette"), ("Save leftover", "Note leftover Chatroulette")],
    ("2016", "allo"): [("Ack leftover", "Ack leftover Allo"), ("Save leftover", "Note leftover Allo")],
    ("2016", "note7"): [("Ack leftover", "Ack leftover recall"), ("Save leftover", "Note leftover Note 7")],
    ("2020", "shop"): [("Ack leftover", "Ack leftover Shop"), ("Save leftover", "Note leftover Shop")],
    ("2020", "mixer"): [("Type leftover", "Type leftover Mixer sunset")],
    ("2020", "ccpa"): [("Type leftover", "Type leftover Do Not Sell")],
    ("2020", "tiktok"): [("Type leftover", "Type leftover EO 13942")],
    ("2020", "openai"): [("Type leftover", "Type leftover GPT-3 waitlist")],
    ("2024", "sora"): [("Type leftover", "Type leftover Sora preview")],
    ("2024", "recall"): [("Type leftover", "Type leftover Recall")],
    ("2024", "search"): [("Type leftover", "Type leftover ChatGPT Search")],
    ("2024", "voice"): [("Type leftover", "Type leftover Voice")],
    ("2024", "win11"): [("Type leftover", "Type leftover Win11 residual")],
    ("2024", "store"): [("Type leftover", "Type leftover GPT Store")],
    ("2024", "tiktok"): [("Type leftover", "Type leftover TikTok")],
    ("2024", "suno"): [("Type leftover", "Type leftover Suno")],
    ("2024", "appleintel"): [("Type leftover", "Type leftover Apple Intelligence")],
    ("2024", "perplexity"): [("Type leftover", "Type leftover Perplexity")],
    ("2024", "threads"): [("Type leftover", "Type leftover Threads")],
    ("2024", "wikipedia"): [("Type leftover", "Type leftover Wikipedia")],
    ("2024", "youtube"): [("Type leftover", "Type leftover YouTube")],
    ("2024", "visionpro"): [("Type leftover", "Type leftover Vision Pro ship")],
    ("2024", "udio"): [("Type leftover", "Type leftover Udio")],
    ("2024", "veo"): [("Type leftover", "Type leftover Veo")],
    ("2024", "rabbit"): [("Type leftover", "Type leftover Rabbit R1")],
    ("2024", "o1"): [("Type leftover", "Type leftover o1-preview")],
    ("2024", "claude35"): [("Type leftover", "Type leftover Claude 3.5")],
    ("2024", "gemini"): [("Type leftover", "Type leftover Gemini")],
    ("2024", "chrome"): [("Type leftover", "Type leftover Chrome habit")],
}

ANDROID_HTML = """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>Android OHA leftover — 5 Nov 2007</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>Android OHA leftover — 5 Nov 2007</h1>
<p>Open Handset Alliance announced <b>5 Nov 2007</b>. Literacy only. <b>No mass phones.</b> G1 is <b>late 2008</b>. Not the iPhone Safari chip.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<p><button type="button" data-4x-trap data-official-trap>Android phones shipped this year (trap)</button></p>
</div>
<!-- ITT-4X:and-07:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="hops" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">Android OHA leftover — 5 Nov 2007</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2007 leftover · incomplete never writes · not the chip</p>
<p><button type="button" data-4x-hop="a">Note leftover OHA</button> <button type="button" data-4x-hop="b">Ack leftover announce</button></p>
<p><button type="button" data-4x-go="and-07">Note leftover OHA</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt07-and-07"><b>Next:</b> <a href="../iphone/index.html">★ iPhone Safari</a></p>
</section>
<!-- ITT-4X:and-07:end -->
<script src="../../../../js/immersion-2007.js"></script>
<!-- ITT-4X:and-07-d2:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">2007 leftover · android d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2007 leftover · incomplete never writes · not the chip</p>
<p><label>Second leftover note<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="OHA leftover"></label></p>
<p><button type="button" data-4x-go="and-07-d2">Note leftover OHA again</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt07-and-07-d2"><b>Next:</b> <a href="../iphone/index.html">★ iPhone Safari</a></p>
</section>
<!-- ITT-4X:and-07-d2:end -->
</body>
</html>
"""


def polish_5x() -> int:
    n = 0
    label_re = re.compile(
        r'(<input type="checkbox" data-5x-req="[ab]">)([^<]*)',
        re.I,
    )
    save_re = re.compile(r'(<button type="button" data-5x-save>)([^<]*)(</button>)')
    for rel, (a, b, save, trap) in FIVE_X.items():
        p = ROOT / "years" / rel
        if not p.is_file():
            print("missing 5x dest", rel)
            continue
        t = p.read_text(encoding="utf-8")
        if "data-5x-save" not in t:
            continue
        labels = []

        def lab(m):
            labels.append(1)
            txt = a if m.group(0).find('data-5x-req="a"') >= 0 or m.group(1).find('="a"') >= 0 else b
            # distinguish a vs b by already replaced count
            return m.group(1) + (a if len(labels) == 1 else b)

        nt, c1 = label_re.subn(lab, t)
        nt, c2 = save_re.subn(rf"\g<1>{save}\3", nt, count=1)
        if "data-5x-trap" not in nt:
            nt = nt.replace(
                '<button type="button" data-5x-save>',
                f'<button type="button" data-5x-trap>{trap}</button> '
                '<button type="button" data-5x-save>',
                1,
            )
        # title line
        nt = re.sub(
            r"(<b>5× leftover · )[^<]+(</b>)",
            rf"\1{save}\2",
            nt,
            count=1,
        )
        if nt != t:
            p.write_text(nt, encoding="utf-8")
            n += 1
    return n


def relabel() -> int:
    n = 0
    for (year, slug), pairs in RELABEL.items():
        p = ROOT / f"years/{year}/sites/{slug}/index.html"
        if not p.is_file():
            continue
        t = p.read_text(encoding="utf-8")
        orig = t
        for old, new in pairs:
            t = t.replace(f">{old}<", f">{new}<")
        if t != orig:
            p.write_text(t, encoding="utf-8")
            n += 1
    return n


def add_android() -> None:
    dest = ROOT / "years/2007/sites/android/index.html"
    write_if_missing(dest, ANDROID_HTML)
    matrix_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(matrix_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in rows}
    append_matrix_row(
        rows, have, "2007", "/years/2007/sites/android/index.html",
        "itt07-and-07", "hops", "Android OHA leftover — 5 Nov 2007",
        "/years/2007/sites/iphone/index.html", "★ iPhone Safari",
    )
    append_matrix_row(
        rows, have, "2007", "/years/2007/sites/android/index.html",
        "itt07-and-07-d2", "query", "2007 leftover · android d2",
        "/years/2007/sites/iphone/index.html", "★ iPhone Safari",
    )
    matrix_path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    prepend_rooms("2007", ["sites/android/index.html"])
    add_location_hints("2007", [("android", "android|oha")])
    add_home_strip("2007", "07", [("android", "and-07")], "sites/iphone/index.html")
    add_map_block(
        "2007",
        ['<li><a href="../sites/android/index.html">Android OHA leftover — 5 Nov 2007</a> — announce only · G1 is 2008</li>'],
    )
    sm = ROOT / "sitemap.txt"
    line = "/years/2007/sites/android/index.html"
    t = sm.read_text(encoding="utf-8")
    if line not in t:
        if not t.endswith("\n"):
            t += "\n"
        sm.write_text(t + line + "\n", encoding="utf-8")


def main() -> None:
    add_android()
    n5 = polish_5x()
    nr = relabel()
    print(f"android added · 5x polished={n5} · dest labels={nr}")


if __name__ == "__main__":
    main()
