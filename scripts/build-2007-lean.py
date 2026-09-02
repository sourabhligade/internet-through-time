#!/usr/bin/env python3
"""Build 2007 lean door + leftover 120 from the 2026-09-01 freeze. No forest restore."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YDIR = ROOT / "years" / "2007"

# Official 10 (official-verb). Star is iPhone Safari.
OFFICIAL = [
    ("iphone", "index.html", "itt07-iphone", "iPhone Safari", "Type a URL + both honesties + Go. Empty / App Store / Chrome never write.", "sites/streetview/index.html", "Street View leftover", ["App Store (2008 trap)", "Chrome (2008 trap)", "iPhone 3G (trap)"], "Go"),
    ("streetview", "index.html", "itt07-streetview", "Street View leftover", "29 May 2007 leftover. Not January Maps. Not the chip.", "sites/gmail/index.html", "Gmail open leftover", ["App Store (trap)", "Street View as the chip (trap)"], "Save Street View leftover"),
    ("gmail", "index.html", "itt07-gmail", "Gmail open leftover", "7 Feb 2007 open leftover. Invite is leftover. Not the chip.", "sites/fbplat/index.html", "Facebook Platform leftover", ["Invite-as-gold (trap)", "App Store (trap)"], "Save Gmail leftover"),
    ("fbplat", "index.html", "itt07-fbplat", "Facebook Platform leftover", "24 May 2007 leftover. Like is 2009. Not the chip.", "sites/twitter/index.html", "Twitter leftover", ["Like (2009 trap)", "App Store (trap)"], "Save Platform leftover"),
    ("twitter", "index.html", "itt07-twitter", "Twitter leftover", "2007 leftover. Twttr gold is 2006. Not the chip.", "sites/youtube/index.html", "YouTube leftover", ["Twttr-as-chip (trap)", "X (trap)"], "Save Twitter leftover"),
    ("youtube", "index.html", "itt07-youtube", "YouTube leftover", "Google-owned leftover. Upload gold is 2005. Not the chip.", "sites/tumblr/index.html", "Tumblr leftover", ["Upload-as-gold (trap)", "App Store (trap)"], "Save YouTube leftover"),
    ("tumblr", "index.html", "itt07-tumblr", "Tumblr leftover", "ILS 2007 birthmark leftover. Not the chip.", "sites/kindle/index.html", "Kindle leftover", ["App Store (trap)", "Chrome (trap)"], "Save Tumblr leftover"),
    ("kindle", "index.html", "itt07-kindle", "Kindle leftover", "19 Nov 2007 leftover. Not the chip.", "sites/ie6/index.html", "XP/IE6 residual", ["App Store (trap)", "live buy (trap)"], "Save Kindle leftover"),
    ("ie6", "index.html", "itt07-ie6", "XP/IE6 residual", "January mass shell leftover. Vista is a room. Not the chip.", "sites/playable/game.html", "Safari Queue", ["Vista-as-January (trap)", "Chrome (trap)"], "Save IE6 leftover"),
    ("playable", "game.html", "itt07-game-safariq", "Safari Queue", "Year game. Not leftover 2×. App Store never writes.", "sites/iphone/index.html", "★ iPhone Safari", ["App Store tiles (trap)", "Chrome tiles (trap)"], "Queue leftover URL"),
]

# Pack A 40 — dest minutes from 2007-2X-LEFTOVER-GOALS.
PACK_A = [
    ("ipann", "index.html", "ipann-dp", "hops", "iPhone announce leftover", "9 Jan leftover. Ship dest is gold.", "ship-as-this (trap)"),
    ("iptouch", "index.html", "iptouch-dp", "hops", "iPod touch leftover", "Sep 2007 leftover. App Store is 2008.", "App Store (trap)"),
    ("ipsdk", "index.html", "ipsdk-dp", "checks", "iPhone SDK leftover", "Oct 2007 leftover. App Store is 2008 trap.", "App Store gold (trap)"),
    ("apltv", "index.html", "apltv-dp", "hops", "Apple TV leftover", "Jan 2007 1st gen leftover.", "live store (trap)"),
    ("vista", "index.html", "vista-dp", "checks", "Vista leftover", "30 Jan 2007 leftover. Not January chrome.", "Vista-as-January (trap)"),
    ("off07", "index.html", "off07-dp", "query", "Office 2007 leftover", "Ribbon leftover. Not the chip.", "live install (trap)"),
    ("ie7", "index.html", "ie7-dp", "hops", "IE7 leftover", "Shipped Oct 2006. 2007 leftover room.", "IE7-as-January (trap)"),
    ("saf3", "index.html", "saf3-dp", "query", "Safari 3 leftover", "Desktop Safari leftover. Not the chip.", "Safari-as-chip (trap)"),
    ("ff2", "index.html", "ff2-dp", "hops", "Firefox 2 leftover", "Leftover browser room.", "official logo (trap)"),
    ("gears", "index.html", "gears-dp", "query", "Google Gears leftover", "Offline leftover. Not the chip.", "live plugin (trap)"),
    ("gim", "index.html", "gim-dp", "hops", "Gmail IMAP leftover", "IMAP leftover. Official Gmail dest is separate.", "Gmail-as-this (trap)"),
    ("wl", "index.html", "wl-dp", "checks", "Wikileaks leftover", "2007 leftover literacy. No dump.", "dump (trap)"),
    ("halo3", "index.html", "halo3-dp", "hops", "Halo 3 leftover", "Sep 2007 leftover.", "live game (trap)"),
    ("wii", "index.html", "wii-dp", "hops", "Wii leftover", "US Nov 2006. 2007 leftover.", "live store (trap)"),
    ("sl", "index.html", "sl-dp", "query", "Second Life leftover", "Leftover world. Not live.", "live world (trap)"),
    ("livesp", "index.html", "livesp-dp", "hops", "Live Spaces leftover", "Netcraft Jan growth leftover.", "live blog (trap)"),
    ("blogger", "index.html", "blogger-dp", "query", "Blogger leftover", "Leftover post. Not live.", "live post (trap)"),
    ("flickr", "index.html", "flickr-dp", "hops", "Flickr leftover", "Leftover photos. Not live upload.", "live upload (trap)"),
    ("digg", "index.html", "digg-dp", "hops", "Digg leftover", "Leftover bury. Not live.", "live bury (trap)"),
    ("reddit", "index.html", "reddit-dp", "hops", "Reddit leftover", "Leftover vote. Not live.", "live vote (trap)"),
    ("myspace", "index.html", "myspace-dp", "hops", "MySpace leftover", "Leftover profile. Not live.", "live profile (trap)"),
    ("stumble", "index.html", "stumble-dp", "hops", "StumbleUpon leftover", "2007 leftover. 2002 gold stays 2002.", "2002 gold (trap)"),
    ("li", "index.html", "li-dp", "query", "LinkedIn leftover", "Leftover invite. Not live.", "live invite (trap)"),
    ("orkut", "index.html", "orkut-dp", "hops", "Orkut leftover", "Leftover scrap. Not live.", "live scrap (trap)"),
    ("nfx", "index.html", "nfx-dp", "query", "Netflix queue leftover", "Envelope leftover. Not live queue.", "live queue (trap)"),
    ("amz", "index.html", "amz-dp", "query", "Amazon leftover", "Leftover cart. Not live.", "live cart (trap)"),
    ("ebay", "index.html", "ebay-dp", "hops", "eBay leftover", "Leftover bid. Not live.", "live bid (trap)"),
    ("pp", "index.html", "pp-dp", "hops", "PayPal leftover", "Leftover pay. Not live.", "live pay (trap)"),
    ("wiki", "index.html", "wiki-dp", "hops", "Wikipedia leftover", "2007 leftover. 2001 gold stays 2001.", "2001 gold (trap)"),
    ("maps", "index.html", "maps-dp", "hops", "Maps leftover", "January Maps leftover. Street View dest is official leftover.", "Street View-as-this (trap)"),
    ("cnn", "index.html", "cnn-dp", "hops", "CNN leftover", "Leftover story. Not live.", "live story (trap)"),
    ("bbc", "index.html", "bbc-dp", "hops", "BBC leftover", "Leftover story. Not live.", "live story (trap)"),
    ("nyt", "index.html", "nyt-dp", "hops", "NYT leftover", "Leftover story. Not live.", "live story (trap)"),
    ("sd", "index.html", "sd-dp", "hops", "Slashdot leftover", "Leftover comment. Not live.", "live comment (trap)"),
    ("cl", "index.html", "cl-dp", "hops", "Craigslist leftover", "Leftover post. Not live.", "live post (trap)"),
    ("wow", "index.html", "wow-dp", "hops", "WoW leftover", "Leftover realm. Not live.", "live realm (trap)"),
    ("itunes", "index.html", "itunes-dp", "hops", "iTunes Wi-Fi leftover", "Leftover store. App Store is 2008.", "App Store (trap)"),
    ("huluann", "index.html", "huluann-dp", "checks", "Hulu announce leftover", "Public mass is 2008 trap.", "2008 public-as-this (trap)"),
    ("dbxann", "index.html", "dbxann-dp", "hops", "Dropbox announce leftover", "Public dest is 2008 trap.", "2008 dest-as-this (trap)"),
    ("iphone", "about.html", "iphone-lx", "checks", "Safari literacy leftover", "Second path on the gold room. Completing this never writes itt07-iphone.", "Go-as-this (trap)"),
]

# Pack B 40 — official leftover 2nds / 3× / 3×3. None writes the star.
PACK_B = [
    ("streetview", "more.html", "streetview-2", "hops", "Street View 2nd leftover", "Second path. Official dest is separate.", "chip-as-this (trap)"),
    ("gmail", "more.html", "gmail-2", "hops", "Gmail 2nd leftover", "Second path. Official dest is separate.", "invite-as-gold (trap)"),
    ("fbplat", "more.html", "fbplat-2", "hops", "Platform 2nd leftover", "Second path. Like is 2009.", "Like (trap)"),
    ("twitter", "more.html", "twitter-2", "hops", "Twitter 2nd leftover", "Second path. Twttr gold is 2006.", "Twttr-as-chip (trap)"),
    ("youtube", "more.html", "youtube-2", "hops", "YouTube 2nd leftover", "Second path. Upload gold is 2005.", "upload-as-gold (trap)"),
    ("tumblr", "more.html", "tumblr-2", "hops", "Tumblr 2nd leftover", "Second path. ILS birthmark dest is official leftover.", "chip-as-this (trap)"),
    ("kindle", "more.html", "kindle-2", "hops", "Kindle 2nd leftover", "Second path. Official dest is separate.", "live buy (trap)"),
    ("ie6", "more.html", "ie6-2", "hops", "IE6 2nd leftover", "Second path. Official dest is separate.", "Vista-as-January (trap)"),
    ("youtube", "watch.html", "youtube-3x", "hops", "YouTube 3× leftover", "Popular 3× leftover. Not the chip.", "upload-as-gold (trap)"),
    ("wiki", "more.html", "wiki-3x", "hops", "Wikipedia 3× leftover", "Popular 3× leftover. 2001 gold stays 2001.", "2001 gold (trap)"),
    ("myspace", "more.html", "myspace-3x", "hops", "MySpace 3× leftover", "Popular 3× leftover. Not the chip.", "live profile (trap)"),
    ("digg", "more.html", "digg-3x3", "hops", "Digg 3×3 leftover", "3×3 leftover. Not the chip.", "live bury (trap)"),
    ("flickr", "more.html", "flickr-3x3", "hops", "Flickr 3×3 leftover", "3×3 leftover. Not the chip.", "live upload (trap)"),
    ("reddit", "more.html", "reddit-3x3", "hops", "Reddit 3×3 leftover", "3×3 leftover. Not the chip.", "live vote (trap)"),
    ("ie6", "pop.html", "ie6-pop", "hops", "IE6 pop-more leftover", "Pop-more leftover. Not January chrome.", "Chrome (trap)"),
    ("twitter", "pop.html", "twitter-pop", "hops", "Twitter pop-more leftover", "Pop-more leftover. Twttr gold is 2006.", "Twttr-as-chip (trap)"),
    ("youtube", "pop.html", "youtube-pop", "hops", "YouTube pop-more leftover", "Pop-more leftover. Not the chip.", "upload-as-gold (trap)"),
    ("ipann", "more.html", "ipann-2", "hops", "Announce 2nd leftover", "Second announce path. Ship dest is gold.", "ship-as-this (trap)"),
    ("vista", "more.html", "vista-2", "hops", "Vista 2nd leftover", "Second Vista path. Not January chrome.", "Vista-as-January (trap)"),
    ("iptouch", "more.html", "iptouch-2", "hops", "iPod touch 2nd leftover", "Second path. App Store is 2008.", "App Store (trap)"),
    ("kindle", "path.html", "kindle-path", "hops", "Kindle 2nd path leftover", "Second Kindle path. Official dest is separate.", "live buy (trap)"),
    ("wl", "more.html", "wl-2", "hops", "Wikileaks 2nd leftover", "Second literacy path. No dump.", "dump (trap)"),
    ("halo3", "more.html", "halo3-2", "hops", "Halo 2nd leftover", "Second path. Not live.", "live game (trap)"),
    ("ipsdk", "more.html", "ipsdk-2", "hops", "SDK 2nd leftover", "Second path. App Store is 2008.", "App Store gold (trap)"),
    ("gears", "more.html", "gears-2", "hops", "Gears 2nd leftover", "Second path. Not live plugin.", "live plugin (trap)"),
    ("streetview", "about.html", "streetview-lx", "checks", "Street View literacy leftover", "Literacy leftover. Official dest is separate.", "chip-as-this (trap)"),
    ("gmail", "about.html", "gmail-lx", "checks", "Gmail literacy leftover", "Literacy leftover. Official dest is separate.", "invite-as-gold (trap)"),
    ("fbplat", "about.html", "fbplat-lx", "checks", "Platform literacy leftover", "Literacy leftover. Like is 2009.", "Like (trap)"),
    ("twitter", "about.html", "twitter-lx", "checks", "Twitter literacy leftover", "Literacy leftover. Twttr gold is 2006.", "Twttr-as-chip (trap)"),
    ("youtube", "about.html", "youtube-lx", "checks", "YouTube literacy leftover", "Literacy leftover. Upload gold is 2005.", "upload-as-gold (trap)"),
    ("tumblr", "about.html", "tumblr-lx", "checks", "Tumblr literacy leftover", "Literacy leftover. Official dest is separate.", "chip-as-this (trap)"),
    ("kindle", "about.html", "kindle-lx", "checks", "Kindle literacy leftover", "Literacy leftover. Official dest is separate.", "live buy (trap)"),
    ("ie6", "about.html", "ie6-lx", "checks", "IE6 literacy leftover", "Literacy leftover. Official dest is separate.", "Vista-as-January (trap)"),
    ("streetview", "3x.html", "streetview-3x", "hops", "Street View 3× leftover", "3× leftover. Official dest is separate.", "chip-as-this (trap)"),
    ("gmail", "3x.html", "gmail-3x", "hops", "Gmail 3× leftover", "3× leftover. Official dest is separate.", "invite-as-gold (trap)"),
    ("fbplat", "3x.html", "fbplat-3x", "hops", "Platform 3× leftover", "3× leftover. Like is 2009.", "Like (trap)"),
    ("tumblr", "3x.html", "tumblr-3x", "hops", "Tumblr 3× leftover", "3× leftover. Official dest is separate.", "chip-as-this (trap)"),
    ("kindle", "3x.html", "kindle-3x", "hops", "Kindle 3× leftover", "3× leftover. Official dest is separate.", "live buy (trap)"),
    ("iphone", "more.html", "safari-2", "hops", "Safari leftover 2nd path", "Second leftover path on the gold room. Never writes itt07-iphone.", "Go-as-this (trap)"),
    ("playable", "more.html", "game-2", "hops", "Safari Queue leftover 2nd", "Game leftover 2nd. Never writes game gold.", "App Store tiles (trap)"),
]

# Pack C 40 — mass continuity leftovers.
PACK_C = [
    ("youtube", "c.html", "youtube-c", "hops", "YouTube watch leftover", "Continuity leftover. Not the chip.", "upload-as-gold (trap)"),
    ("wiki", "edit.html", "wiki-edit", "hops", "Wikipedia edit leftover", "Continuity leftover. 2001 gold stays 2001.", "2001 gold (trap)"),
    ("amz", "c.html", "amz-c", "query", "Amazon continuity leftover", "Continuity leftover. Not live cart.", "live cart (trap)"),
    ("reddit", "c.html", "reddit-c", "hops", "Reddit continuity leftover", "Continuity leftover. Not live vote.", "live vote (trap)"),
    ("nfx", "c.html", "nfx-c", "query", "Netflix continuity leftover", "Continuity leftover. Not live queue.", "live queue (trap)"),
    ("myspace", "c.html", "myspace-c", "hops", "MySpace 2 leftover", "Continuity leftover. Not live profile.", "live profile (trap)"),
    ("facebook", "index.html", "facebook-c", "hops", "Facebook leftover 2", "Platform dest is official leftover. This is continuity.", "Like (trap)"),
    ("twitter", "c.html", "twitter-c", "hops", "Twitter leftover 2", "Continuity leftover. Twttr gold is 2006.", "Twttr-as-chip (trap)"),
    ("digg", "c.html", "digg-c", "hops", "Digg 2 leftover", "Continuity leftover. Not live bury.", "live bury (trap)"),
    ("google", "index.html", "google-c", "hops", "Google leftover", "Continuity leftover. Not the chip.", "Chrome (trap)"),
    ("gmail", "c.html", "gmail-c", "hops", "Gmail 2 leftover", "Continuity leftover. Official dest is separate.", "invite-as-gold (trap)"),
    ("maps", "c.html", "maps-c", "hops", "Maps 2 leftover", "Continuity leftover. Street View dest is official leftover.", "Street View-as-this (trap)"),
    ("pp", "c.html", "pp-c", "hops", "PayPal 2 leftover", "Continuity leftover. Not live pay.", "live pay (trap)"),
    ("flickr", "c.html", "flickr-c", "hops", "Flickr 2 leftover", "Continuity leftover. Not live upload.", "live upload (trap)"),
    ("li", "c.html", "li-c", "query", "LinkedIn 2 leftover", "Continuity leftover. Not live invite.", "live invite (trap)"),
    ("stumble", "c.html", "stumble-c", "hops", "Stumble 2 leftover", "Continuity leftover. 2002 gold stays 2002.", "2002 gold (trap)"),
    ("ebay", "c.html", "ebay-c", "hops", "eBay 2 leftover", "Continuity leftover. Not live bid.", "live bid (trap)"),
    ("cl", "c.html", "cl-c", "hops", "Craigslist 2 leftover", "Continuity leftover. Not live post.", "live post (trap)"),
    ("cnn", "c.html", "cnn-c", "hops", "CNN 2 leftover", "Continuity leftover. Not live story.", "live story (trap)"),
    ("bbc", "c.html", "bbc-c", "hops", "BBC 2 leftover", "Continuity leftover. Not live story.", "live story (trap)"),
    ("nyt", "c.html", "nyt-c", "hops", "NYT 2 leftover", "Continuity leftover. Not live story.", "live story (trap)"),
    ("sd", "c.html", "sd-c", "hops", "Slashdot 2 leftover", "Continuity leftover. Not live comment.", "live comment (trap)"),
    ("blogger", "c.html", "blogger-c", "query", "Blogger 2 leftover", "Continuity leftover. Not live post.", "live post (trap)"),
    ("livesp", "c.html", "livesp-c", "hops", "Live Spaces 2 leftover", "Continuity leftover. Not live blog.", "live blog (trap)"),
    ("itunes", "c.html", "itunes-c", "hops", "iTunes 2 leftover", "Continuity leftover. App Store is 2008.", "App Store (trap)"),
    ("amz", "more.html", "amz-2", "query", "Amazon 2 leftover", "Continuity leftover. Not live cart.", "live cart (trap)"),
    ("steam", "index.html", "steam-c", "hops", "Steam leftover", "Continuity leftover. Not live store.", "live store (trap)"),
    ("xbox", "index.html", "xbox-c", "hops", "Xbox leftover", "Continuity leftover. Not live store.", "live store (trap)"),
    ("nintendo", "index.html", "nintendo-c", "hops", "Nintendo leftover", "Continuity leftover. Not live store.", "live store (trap)"),
    ("wow", "c.html", "wow-c", "hops", "WoW 2 leftover", "Continuity leftover. Not live realm.", "live realm (trap)"),
    ("sl", "c.html", "sl-c", "query", "Second Life 2 leftover", "Continuity leftover. Not live world.", "live world (trap)"),
    ("orkut", "c.html", "orkut-c", "hops", "Orkut 2 leftover", "Continuity leftover. Not live scrap.", "live scrap (trap)"),
    ("ie7", "c.html", "ie7-c", "hops", "IE7 2 leftover", "Continuity leftover. Not January chrome.", "IE7-as-January (trap)"),
    ("ff2", "c.html", "ff2-c", "hops", "Firefox 2 leftover 2", "Continuity leftover. Not the chip.", "official logo (trap)"),
    ("saf3", "c.html", "saf3-c", "query", "Safari 3 2nd leftover", "Continuity leftover. Not the chip.", "Safari-as-chip (trap)"),
    ("cont", "index.html", "cont-c", "hops", "Continuity leftover", "Mass continuity leftover. Not the chip.", "App Store (trap)"),
    ("playable", "close.html", "cont-close", "hops", "Continuity close leftover", "Pack C end. Next is ★ Safari. Never writes gold.", "App Store (trap)"),
    ("facebook", "more.html", "facebook-2", "hops", "Facebook leftover more", "Continuity leftover. Like is 2009.", "Like (trap)"),
    ("google", "more.html", "google-2", "hops", "Google leftover more", "Continuity leftover. Chrome is 2008.", "Chrome (trap)"),
    ("wow", "more.html", "wow-2", "hops", "WoW leftover more", "Continuity leftover. Not live realm.", "live realm (trap)"),
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def also_nav(next_href: str, next_label: str) -> str:
    return f"""<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2007" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year</b><p style="margin:6px 0 0">
 <a href="../../pages/home.html">Starting Point</a> ·
 <a href="../../pages/map.html">Year flow map</a> ·
 <a href="../iphone/index.html">★ iPhone Safari</a> ·
 <a href="../streetview/index.html">Street View leftover</a> ·
 <a href="../gmail/index.html">Gmail leftover</a> ·
 <a href="../tumblr/index.html">Tumblr leftover</a> ·
 <a href="{next_href}">{next_label}</a> ·
 <a href="../playable/game.html">Safari Queue</a>
</p></nav>
"""


def official_html(slug, page, key, title, blurb, next_href, next_label, traps, verb) -> str:
    trap_btns = "\n ".join(f'<button type="button" data-official-trap>{t}</button>' for t in traps)
    game_attr = ' data-year-game data-year="2007" data-game-id="safariq"' if page == "game.html" else ""
    game_css = '\n<link rel="stylesheet" href="../../../../css/year-game-ui.css">' if page == "game.html" else ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2007" data-official-key="{key}">
<head>
<meta charset="utf-8">
<title>{title} — 2007</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">{game_css}
</head>
<body bgcolor="#ece9d8" text="#000">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">[failed-final] {title} · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px"{game_attr}>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="honest">Incomplete / trap never writes. Completing leftover never writes <code>itt07-iphone</code>.</p>
<p class="itt-pixel-failed">[failed-final] recon chrome · no official mark</p>
<p><label>2007 leftover URL<br>
<input type="text" data-official-need data-official-min="2" maxlength="80" placeholder="apple.com leftover" autocomplete="off"></label></p>
<p><label><input type="checkbox" data-official-req> I opened the 2007 leftover room. App Store / Chrome are 2008.</label></p>
<p><label><input type="checkbox" data-official-req> Empty / App Store / Chrome never write. Desktop stays XP + IE6.</label></p>
<p>
 {trap_btns}
 <button type="button" data-official-verb>{verb}</button>
</p>
<p data-official-status></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="../{next_href.replace('sites/','')}">{next_label}</a></p>
</div>
<script src="../../../../js/immersion-2007.js"></script>
{also_nav('../' + next_href.replace('sites/', ''), next_label)}
</body>
</html>
"""


def leftover_html(slug, page, suffix, kind, title, blurb, trap, next_href, next_label) -> str:
    extra = ""
    kind_attr = f' data-lo-kind="{kind}"'
    if kind == "hops":
        extra = """<p>
 <button type="button" data-lo-pick="a">Leftover hop 1</button>
 <button type="button" data-lo-pick="b">Leftover hop 2</button>
</p>
"""
        kind_attr += ' data-lo-min-pick="2"'
    elif kind == "query":
        extra = """<p><label>Leftover note<br>
<input type="text" data-lo-field maxlength="80" placeholder="2007 leftover" autocomplete="off"></label></p>
"""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>{title} — 2007</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">
</head>
<body bgcolor="#ece9d8" text="#000">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px 0;font-family:Arial,sans-serif">[failed-final] {title} · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{title}</h1>
<p>{blurb}</p>
<p class="honest">Leftover 2007. Not iPhone Safari gold. Incomplete / trap never writes. Completing this never writes <code>itt07-iphone</code>.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
</div>
<div data-lo-panel="1" data-itt-year="2007" class="itt-2007-machine" style="margin:14px auto;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">2007 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
{extra}<p><label><input type="checkbox" data-lo-req> Leftover 2007 · not iPhone Safari gold.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes. App Store / Chrome are 2008.</label></p>
<p><button type="button" data-lo-save data-lo-key="{suffix}"{kind_attr}>Save leftover {title}</button> <span data-lo-status></span></p>
</div>
<p hidden data-next-flow data-next-when-key="itt07-{suffix}" style="max-width:46em;margin:8px auto;font-family:Arial,sans-serif;font-size:13px"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
<script src="../../../../js/immersion-2007.js"></script>
{also_nav(next_href, next_label)}
</body>
</html>
"""


def page_html(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../css/period-2007.css">
</head>
<body bgcolor="#ece9d8" text="#000">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="../../../js/immersion-2007.js"></script>
</body>
</html>
"""


def leftover_chain(rows):
    out = []
    for i, row in enumerate(rows):
        if i + 1 < len(rows):
            nslug, npage, *_ = rows[i + 1]
            next_href = f"../{nslug}/{npage}"
            next_label = rows[i + 1][4]
        else:
            next_href = "../iphone/index.html"
            next_label = "★ iPhone Safari"
        out.append((*row, next_href, next_label))
    return out


def all_rooms() -> list[str]:
    rooms = [
        "pages/about.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
        "pages/home.html",
        "pages/map.html",
        "pages/whats-new.html",
        "sites/playable/index.html",
    ]
    seen = set(rooms)
    for slug, page, *_ in OFFICIAL:
        p = f"sites/{slug}/{page}"
        if p not in seen:
            rooms.append(p)
            seen.add(p)
    for pack in (PACK_A, PACK_B, PACK_C):
        for slug, page, *_ in pack:
            p = f"sites/{slug}/{page}"
            if p not in seen:
                rooms.append(p)
                seen.add(p)
    return rooms


def leftover_matrix_rows() -> list[dict]:
    rows = []
    for pack in (PACK_A, PACK_B, PACK_C):
        for slug, page, suffix, kind, *_ in pack:
            rows.append({
                "year": "2007",
                "href": f"sites/{slug}/{page}",
                "key": f"itt07-{suffix}",
                "suffix": suffix,
                "needPick": "",
                "minPick": 2 if kind == "hops" else 0,
                "field": kind == "query",
                "placeholder": "2007 leftover" if kind == "query" else "",
            })
    return rows


def start_extra_html() -> str:
    links = []
    for pack in (PACK_A, PACK_B, PACK_C):
        for slug, page, _suf, _kind, title, *_ in pack:
            links.append(f'<a href="../sites/{slug}/{page}">{title}</a>')
    strip = " ·\n ".join(links)
    return f"""<div style="max-width:720px;margin:12px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<p class="itt-felt-trail">Go, do not App Store: <a href="../sites/iphone/index.html">iPhone Safari</a>. Empty / App Store / Chrome never write.</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ece9d8" style="border:2px solid #0a246a">
<tr bgcolor="#0a246a"><td style="padding:8px 12px;color:#fff">
 <b>Starting Point — 2007</b> · XP · IE6 · June 121,892,559 · Jan 106,875,138 · users 1,373,327,790
</td></tr>
<tr bgcolor="#fff8dc"><td style="padding:8px 12px">
 <b>The phone becomes a browser — empty / App Store / Chrome never write — Go is the save.</b>
 Street View leftover · Gmail open leftover · Facebook Platform leftover. Desktop stays XP + IE6. App Store is 2008.
</td></tr>
<tr><td bgcolor="#fff" style="padding:12px">
 <div data-itt-tour></div>
 <p><a href="map.html"><b>2007 UX flow map</b></a> · <a href="about.html">About</a> · <a href="../sites/iphone/index.html">★ iPhone Safari</a></p>
</td></tr>
</table>
<div id="ott-2x-2007" style="margin:12px 0;padding:10px;border:1px dashed #666;background:#fff;font-family:Arial,sans-serif;font-size:12px">
<p><b>2007 leftover 2×</b> — 120 writers. Completing leftover never writes <code>itt07-iphone</code>.</p>
<p style="line-height:1.8">
 {strip}
</p>
</div>
</div>
"""


def build_tree() -> list[str]:
    rooms = all_rooms()
    write(YDIR / "index.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 6.0 — 2007</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2007");</script>
<script src="../../js/lib/util.js?v=20260901ui"></script>
<script src="../../js/browser-core.js?v=20260901ui"></script>
<script src="../../js/config/2007.js?v=20260901ui"></script>
<script src="../../js/browser-2007.js?v=20260901ui"></script>
</body>
</html>
""")
    write(YDIR / "pages" / "home.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2007</title>
<link rel="stylesheet" href="../../../css/period-2007.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#ece9d8">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2007");</script>
<script src="../../../js/immersion-2007.js" defer></script>
</body>
</html>
""")
    write(YDIR / "pages" / "about.html", page_html("About 2007 — dual scale · bans", """<div style="max-width:640px;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2007</h1>
<p><b>2007 is when the phone becomes a browser — iPhone Safari is the save, empty URL / App Store / Chrome never write, Street View / Gmail open / Facebook Platform are leftover, the mass shell is still XP + IE6, and App Store / Chrome / Android are next year.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#c6d3ef"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>121,892,559 (+43%)</b> · this year <b>has</b> a June row · birthmark Tumblr</td></tr>
<tr><td>Netcraft January 2007</td><td><b>106,875,138</b> sites (+1.63M) — <b>January</b>, never June</td></tr>
<tr><td>Internet users (ILS June table)</td><td><b>1,373,327,790</b> · same table as June websites. Do not blend ITU Trends Sept 2007 “1.1B” (2006-class) into this cell.</td></tr>
</table>
<p style="font-size:12px">Never blend ILS June, Netcraft January, and ITU people into one digit. iPhone is a room. Desktop stays XP + IE6.</p>
<h2>Bans — not 2007 defaults</h2>
<ul>
<li>App Store · Chrome · Android G1 · iPhone 3G</li>
<li>Facebook Like · Street View as the chip · App Store as gold</li>
<li>iPhone as January desktop · invent a later June ILS cell as if 2007 had none</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read June 121,892,559 · January 106,875,138 · users 1,373,327,790.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know empty / App Store / Chrome never write, Go is the save, and desktop stays XP + IE6.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/iphone/index.html">★ iPhone Safari</a></p>
</section>
</div>
"""))
    write(YDIR / "pages" / "map.html", page_html("2007 flow map", """<div style="max-width:720px;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px;line-height:1.5">
<p class="crumb"><a href="home.html">← Starting Point</a> · <a href="about.html">About</a></p>
<h1>2007 UX flow map</h1>
<p>App Store is highlighted. Go is the real click. <b>Star = iPhone Safari</b>. Guided list stays 6. Leftover 2× never steal the chip. Desktop stays XP + IE6.</p>
<p style="font-size:12px;background:#fff8dc;border:1px solid #c9a227;padding:8px 10px"><b>Mid-trail rule:</b> crumb ← last dest is visible the moment you land. <b>Next</b> waits until this dest writes. <b>Empty / App Store / Chrome never write</b> <code>itt07-iphone</code>.</p>
<pre style="font-size:11px;background:#111;color:#bbdefb;padding:10px;overflow:auto">
Starting Point
 ├─ Guided 6 …… About → ★ Safari → Street View → Gmail → Platform → this map
 ├─ Official 10 … Safari → Street View → Gmail → Platform → Twitter
 │                 → YouTube → Tumblr → Kindle → IE6 → Safari Queue ──► Safari
 ├─ Leftover 2× … Pack A 40 → Pack B 40 → Pack C 40 → ★ Safari
 └─ Side ……… App Store / Chrome / 3G / Like (no official write)
</pre>
<h2>Official 10</h2>
<ol data-itt-ten-flows style="padding-left:1.3em">
 <li>★ <a href="../sites/iphone/index.html">iPhone Safari</a> — empty / App Store / Chrome never write. Type + ticks + Go → <code>itt07-iphone</code>. Next → Street View.</li>
 <li><a href="../sites/streetview/index.html">Street View leftover</a> — 29 May. Not January Maps. <code>itt07-streetview</code>. Next → Gmail.</li>
 <li><a href="../sites/gmail/index.html">Gmail open leftover</a> — 7 Feb open. <code>itt07-gmail</code>. Next → Platform.</li>
 <li><a href="../sites/fbplat/index.html">Facebook Platform leftover</a> — 24 May. Like is 2009. <code>itt07-fbplat</code>. Next → Twitter.</li>
 <li><a href="../sites/twitter/index.html">Twitter leftover</a> — Twttr gold is 2006. <code>itt07-twitter</code>. Next → YouTube.</li>
 <li><a href="../sites/youtube/index.html">YouTube leftover</a> — Google-owned leftover. <code>itt07-youtube</code>. Next → Tumblr.</li>
 <li><a href="../sites/tumblr/index.html">Tumblr leftover</a> — ILS 2007 birthmark. <code>itt07-tumblr</code>. Next → Kindle.</li>
 <li><a href="../sites/kindle/index.html">Kindle leftover</a> — 19 Nov. <code>itt07-kindle</code>. Next → IE6.</li>
 <li><a href="../sites/ie6/index.html">XP/IE6 residual</a> — January mass. Vista is leftover. <code>itt07-ie6</code>. Next → Safari Queue.</li>
 <li><a href="../sites/playable/game.html">Safari Queue</a> — leftover URL queue. App Store trap. <code>itt07-game-safariq</code>. Next → Safari.</li>
</ol>
<p><a href="about.html">About</a> · <a href="home.html">Home</a> · <a href="whats-new.html">What's new</a></p>
<div data-itt-flow-map></div>
</div>
"""))
    write(YDIR / "pages" / "whats-new.html", page_html("What's new — 2007", """<div style="max-width:640px;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a> · <a href="about.html">About</a></p>
<h1>What's new in 2007</h1>
<ul>
<li>9 Jan — iPhone announced. Safari on the phone is the museum verb.</li>
<li>30 Jan — Vista leftover room. Desktop stays XP + IE6.</li>
<li>7 Feb — Gmail opens to everyone. Invite leftover.</li>
<li>24 May — Facebook Platform leftover. Like is 2009.</li>
<li>29 May — Street View leftover. Not January Maps.</li>
<li>29 Jun — iPhone ships US. Type a URL + Go is the save.</li>
<li>19 Nov — Kindle leftover.</li>
<li>ILS June — 121,892,559 websites · Tumblr birthmark. App Store / Chrome are 2008.</li>
</ul>
<p><a href="../sites/iphone/index.html">★ iPhone Safari</a></p>
</div>
"""))
    write(YDIR / "pages" / "error" / "404.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>404 — 2007</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">
</head>
<body bgcolor="#ece9d8">
<div style="max-width:480px;margin:24px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<h1>404</h1>
<p>That room is not on the 2007 door.</p>
<p><a href="../home.html">Starting Point</a> · <a href="../../sites/iphone/index.html">★ iPhone Safari</a> · <a href="../../sites/streetview/index.html">Street View leftover</a></p>
</div>
<script src="../../../../js/immersion-2007.js"></script>
</body>
</html>
""")
    write(YDIR / "pages" / "error" / "unreachable.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>Unreachable — 2007</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">
</head>
<body bgcolor="#ece9d8">
<div style="max-width:480px;margin:24px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<h1>Unreachable</h1>
<p>That host is not on the 2007 door.</p>
<p><a href="../home.html">Starting Point</a> · <a href="../../sites/iphone/index.html">★ iPhone Safari</a></p>
</div>
<script src="../../../../js/immersion-2007.js"></script>
</body>
</html>
""")
    write(YDIR / "sites" / "playable" / "index.html", """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>Playables — 2007</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">
</head>
<body bgcolor="#ece9d8" text="#000">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>2007 playables</h1>
<p>Cabinets are not leftover 2×. The year game is Safari Queue.</p>
<p><a href="game.html">Safari Queue</a> · <a href="more.html">Queue leftover 2nd</a> · <a href="close.html">Continuity close</a></p>
</div>
<script src="../../../../js/immersion-2007.js"></script>
</body>
</html>
""")
    for slug, page, key, title, blurb, next_href, next_label, traps, verb in OFFICIAL:
        write(YDIR / "sites" / slug / page, official_html(slug, page, key, title, blurb, next_href, next_label, traps, verb))
    for row in leftover_chain(PACK_A) + leftover_chain(PACK_B) + leftover_chain(PACK_C):
        slug, page, suffix, kind, title, blurb, trap, next_href, next_label = row
        write(YDIR / "sites" / slug / page, leftover_html(slug, page, suffix, kind, title, blurb, trap, next_href, next_label))
    return rooms


def write_js_css(rooms: list[str]) -> None:
    url_lines = []
    for r in rooms:
        url_lines.append(f'    "{r}": "http://museum.local/years/2007/{r}"')
    url_map = ",\n".join(url_lines)
    room_js = ",\n    ".join(json.dumps(r) for r in rooms)
    write(ROOT / "js" / "config" / "2007.js", f"""/**
 * Year config — 2007 lean from-scratch + leftover 2×
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};

  var rooms = [
    {room_js}
  ];

  var urlMap = {{
{url_map}
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) {{
      urlMap[rooms[i]] = "http://museum.local/years/2007/" + rooms[i];
    }}
  }}

  ITT.configs["2007"] = {{
    year: "2007",
    storagePrefix: "itt07",
    home: "pages/home.html",
    prefsKey: "itt-2007-prefs",
    bookmarksKey: "itt-2007-bookmarks",
    connectedKey: "itt-2007-connected",
    immersionScript: "js/immersion-2007.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 6.0...",
    defaultPrefs: {{
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 28,
      homeUrl: "http://home.microsoft.com/intl/web2007/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#000000"
    }},
    perf: {{
      navJitterMax: 70,
      navFixedMax: 50,
      imageBudgetMs: 480,
      imageMinStepMs: 40,
      imageMaxStepMs: 100,
      imageStartMs: 90,
      connectEarlyMs: 140,
      connectLineMs: 200,
      connectBusyMs: 400,
      connectEndMs: 150,
      connectBusyChance: 0.11
    }},
    urlMap: urlMap,
    bookmarks: [
      {{ title: "Starting Point", path: "pages/home.html" }},
      {{ title: "iPhone Safari", path: "sites/iphone/index.html" }},
      {{ title: "Street View leftover", path: "sites/streetview/index.html" }},
      {{ title: "Gmail leftover", path: "sites/gmail/index.html" }},
      {{ title: "Tumblr leftover", path: "sites/tumblr/index.html" }}
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2007/",
    locationHints: [
      {{ re: /iphone|safari|apple\\.com/i, path: "sites/iphone/index.html" }},
      {{ re: /street.?view/i, path: "sites/streetview/index.html" }},
      {{ re: /gmail/i, path: "sites/gmail/index.html" }},
      {{ re: /facebook|platform/i, path: "sites/fbplat/index.html" }},
      {{ re: /twitter/i, path: "sites/twitter/index.html" }},
      {{ re: /youtube/i, path: "sites/youtube/index.html" }},
      {{ re: /tumblr/i, path: "sites/tumblr/index.html" }},
      {{ re: /kindle/i, path: "sites/kindle/index.html" }},
      {{ re: /ie6|internet explorer/i, path: "sites/ie6/index.html" }}
    ]
  }};
}})(typeof window !== "undefined" ? window : this);
""")
    write(ROOT / "js" / "config" / "immersion-2007.js", """/**
 * Immersion config — 2007
 * Thesis: phone becomes a browser · Go is the save · App Store / Chrome never write
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2007"] = {
    year: "2007",
    storagePrefix: "itt07",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      officialDestGold: true,
      leftoverOfficial: true,
      officialVerb: true
    },
    navSubtitle: "XP · IE6 · iPhone Safari is a room · App Store is 2008",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Safari", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Street View", href: "sites/streetview/index.html", match: "/streetview/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Platform", href: "sites/fbplat/index.html", match: "/fbplat/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "iPhone Safari", href: "sites/iphone/index.html" },
      { label: "Street View leftover", href: "sites/streetview/index.html" },
      { label: "About 2007", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
""")
    write(ROOT / "js" / "immersion-2007.js", """/**
 * Immersion year stub — 2007
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2007";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""")
    write(ROOT / "js" / "browser-2007.js", """/**
 * Browser year stub — 2007
 * SRP: year id only; create lives in browser/create.js via browser-core.
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2007");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2007"]) {
    console.error("ITT 2007 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2007"]);
})();
""")
    write(ROOT / "css" / "period-2007.css", """/* 2007 document styles — XP · IE6 · iPhone is a room
   Year delta: @import period-2006 then 2007-specific rules. */
@import url("period-2006.css");

body.year-2007 .itt-year-chip {
  color: #0a246a;
  border-bottom-color: #33ccff;
}

:root {
  --itt07-safari: #0a246a;
  --itt07-xp: #ece9d8;
  --itt07-ie: #0a246a;
}
""")


def patch_wiring(rooms: list[str]) -> None:
    # itt_gate
    p = ROOT / "scripts" / "itt_gate.py"
    t = p.read_text()
    t = t.replace('_WIPED = {"2007", "2009", "2011", "2020", "2023", "2024", "2025"}',
                  '_WIPED = {"2009", "2011", "2020", "2023", "2024", "2025"}')
    t = t.replace("# Hub-open years on disk. 2007 / 2009 / 2011 / 2020–2025 wiped.",
                  "# Hub-open years on disk. 2009 / 2011 / 2020 / 2023–2025 wiped.")
    p.write_text(t)

    # check-all-years
    p = ROOT / "scripts" / "check-all-years.py"
    t = p.read_text()
    t = t.replace('_WIPED = {"2007", "2009", "2011", "2020", "2023", "2024", "2025"}',
                  '_WIPED = {"2009", "2011", "2020", "2023", "2024", "2025"}')
    if '"2007"' not in t.split("SIGNATURE")[1][:4000]:
        t = t.replace(
            '    "2006": ["pages/home.html", "pages/about.html", "sites/twitter/index.html", "sites/facebook/feed.html", "sites/youtube/index.html", "sites/googledocs/index.html", "sites/playable/linerider.html"],',
            '    "2006": ["pages/home.html", "pages/about.html", "sites/twitter/index.html", "sites/facebook/feed.html", "sites/youtube/index.html", "sites/googledocs/index.html", "sites/playable/linerider.html"],\n'
            '    "2007": ["pages/home.html", "pages/about.html", "sites/iphone/index.html", "sites/streetview/index.html", "sites/gmail/index.html", "sites/fbplat/index.html", "sites/playable/game.html"],',
        )
    p.write_text(t)

    # oss-visitor-gate
    p = ROOT / "scripts" / "oss-visitor-gate.mjs"
    t = p.read_text()
    t = t.replace('const WIPED = new Set(["2007", "2009", "2011", "2020", "2023", "2024", "2025"]);',
                  'const WIPED = new Set(["2009", "2011", "2020", "2023", "2024", "2025"]);')
    t = t.replace("1994–2006 + 2008 + 2010 + 2012–2019 + 2021–2022 · 2007 / 2009 / 2011 / 2020 / 2023–2025 boarded",
                  "1994–2008 + 2010 + 2012–2019 + 2021–2022 · 2009 / 2011 / 2020 / 2023–2025 boarded")
    t = t.replace('if (!/25 years open/i.test(copy)) fail("hub-copy", "expected 25 years open");',
                  'if (!/26 years open/i.test(copy)) fail("hub-copy", "expected 26 years open");')
    p.write_text(t)

    # run-every-year-e2e
    p = ROOT / "scripts" / "run-every-year-e2e.mjs"
    t = p.read_text()
    t = t.replace('const WIPED = new Set(["2007", "2009", "2011", "2020", "2023", "2024", "2025"]);',
                  'const WIPED = new Set(["2009", "2011", "2020", "2023", "2024", "2025"]);')
    t = t.replace(
        '  2006: { path: "sites/twitter/index.html", key: "itt06-tweets", hook: "[data-tw06-post], [data-tw06-body]" },\n  2008:',
        '  2006: { path: "sites/twitter/index.html", key: "itt06-tweets", hook: "[data-tw06-post], [data-tw06-body]" },\n'
        '  2007: { path: "sites/iphone/index.html", key: "itt07-iphone", hook: "[data-official-verb], [data-official-need]" },\n  2008:',
    )
    t = t.replace(
        "  2006: async (page) => {\n    await page.locator(\"[data-tw06-req]\").nth(0).check();",
        "  2007: async (page) => {\n"
        "    await page.locator(\"[data-official-need]\").fill(\"apple.com\");\n"
        "    await page.locator(\"[data-official-req]\").nth(0).check();\n"
        "    await page.locator(\"[data-official-req]\").nth(1).check();\n"
        "    await page.locator(\"[data-official-verb]\").click();\n"
        "  },\n"
        "  2006: async (page) => {\n    await page.locator(\"[data-tw06-req]\").nth(0).check();",
    )
    t = t.replace("**Wiped:** 2007 / 2009 / 2011 / 2020 / 2023–2025 — no year tree.",
                  "**Wiped:** 2009 / 2011 / 2020 / 2023–2025 — no year tree.")
    p.write_text(t)

    # hub index
    p = ROOT / "index.html"
    t = p.read_text()
    t = t.replace("25 years open", "26 years open")
    t = t.replace("25 years on disk", "26 years on disk")
    t = t.replace("1994–2006 + 2008 + 2010 + 2012–2019 + 2021–2022",
                  "1994–2008 + 2010 + 2012–2019 + 2021–2022")
    t = t.replace("1994–2006 + 2008 + 2010 + 2012–2019 + 2021",
                  "1994–2008 + 2010 + 2012–2019 + 2021–2022")
    t = t.replace("2007 / 2009 / 2011 / 2020 / 2023–2025 boarded",
                  "2009 / 2011 / 2020 / 2023–2025 boarded")
    t = t.replace("2007 / 2009 / 2011 / 2020 / 2022–2025 boarded",
                  "2009 / 2011 / 2020 / 2023–2025 boarded")
    t = t.replace("2007 / 2009 / 2011 / 2020 / 2022–2025 are boarded",
                  "2009 / 2011 / 2020 / 2023–2025 are boarded")
    t = t.replace("2006–2007 · 2006 live · 2007 boarded",
                  "2006–2007 · both live")
    locked = '''      <div class="year-card locked y2007" data-year="2007">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2007</p>
            <span class="era-chip">wiped</span>
          </div>
          <p class="label">Off disk for a from-scratch rebuild. iPhone Safari will come back as a new door.</p>
          <p class="scale">121,892,559 sites · 1.37B users (Live Stats, June)</p>
          <p class="meta">Wiped · rebuild later</p>
        </div>
      </div>'''
    open_card = '''      <a class="year-card available y2007" href="years/2007/" data-year="2007">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2007</p>
            <span class="era-chip">iPhone Safari</span>
          </div>
          <p class="label">XP · IE6 · iPhone Safari is a room — App Store / Chrome are 2008. Street View leftover.</p>
          <p class="scale">121,892,559 sites · 1,373,327,790 users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>'''
    if locked in t:
        t = t.replace(locked, open_card)
    p.write_text(t)

    # years.js — insert 2007 between 2006 and 2008
    p = ROOT / "ui" / "year" / "years.js"
    t = p.read_text()
    if '"2007":' not in t.split('"2006":', 1)[1][:800]:
        block = '''  "2007": {
    "title": "Internet Explorer 6.0 — 2007",
    "css": [
      "win95-netscape.css",
      "ie5-overrides.css"
    ],
    "bodyClass": "year-2007 os-winxp browser-ie6",
    "boot": "browser-2007.js",
    "dir": [
      { "go": "pages/home.html", "label": "Start" },
      { "go": "sites/iphone/index.html", "label": "Safari" },
      { "go": "sites/streetview/index.html", "label": "Street View" },
      { "go": "sites/gmail/index.html", "label": "Gmail" },
      { "go": "sites/fbplat/index.html", "label": "Platform" },
      { "go": "pages/about.html", "label": "About" }
    ],
    "chrome": "2004",
    "toolbar": "ie",
    "family": "ie",
    "location": "http://home.microsoft.com/intl/web2007/",
    "prefHome": "http://home.microsoft.com/intl/web2007/",
    "yearLabel": "2007 · Windows XP · Internet Explorer 6 · iPhone Safari is a room",
    "windowTitle": "Welcome to the World Wide Web — Microsoft Internet Explorer",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (always-on broadband)",
    "skipBtn": "Skip connect",
    "thesis": "2007 thesis: the phone becomes a browser. Empty / App Store / Chrome never write. Go is the save. Desktop stays XP + IE6.",
    "openLoc": "Open Location in Internet Explorer:",
    "aboutHtml": "<p><b>Microsoft Internet Explorer</b></p> <p>Version 6.0<br>Copyright © 1995–2001 Microsoft Corporation</p> <p>Educational historical Web exhibit.</p>",
    "startBanner": "Windows<b>XP</b>",
    "taskBtn": "Internet Explorer",
    "icon": "e",
    "aria": "Internet Explorer 6",
    "locLabel": "Address",
    "bookmarksTitle": "Favorites",
    "mailPh": "friend@aol.com",
    "hasTaskbar": true,
    "maximized": true
  },
'''
        t = t.replace('  "2008": {', block + '  "2008": {', 1)
        p.write_text(t)

    # start-data
    p = ROOT / "ui" / "year" / "start-data.js"
    t = p.read_text()
    if '"2007"' not in t:
        block = '''  "2007": {
  "href": "../sites/iphone/index.html",
  "label": "★ One-thing · iPhone Safari REAL",
  "items": [
    "<a href=\\"about.html\\" style=\\"color:#90caf9\\">About 2007</a> — June 121,892,559 · Jan 106,875,138 · 1,373,327,790",
    "<a href=\\"../sites/iphone/index.html\\" style=\\"color:#90caf9\\">★ iPhone Safari</a> — App Store never writes",
    "<a href=\\"../sites/streetview/index.html\\" style=\\"color:#90caf9\\">Street View leftover</a> — 29 May",
    "<a href=\\"../sites/gmail/index.html\\" style=\\"color:#90caf9\\">Gmail open leftover</a> — 7 Feb",
    "<a href=\\"../sites/fbplat/index.html\\" style=\\"color:#90caf9\\">Facebook Platform leftover</a> — 24 May",
    "<a href=\\"map.html\\" style=\\"color:#90caf9\\">Year flow map</a>"
  ]
},
'''
        t = t.replace('  "2021": {', block + '  "2021": {', 1)
        p.write_text(t)

    # start-extra
    p = ROOT / "ui" / "year" / "start-extra.js"
    t = p.read_text()
    if '"2007"' not in t:
        extra = json.dumps(start_extra_html())
        t = t.replace('  "2021":', f'  "2007": {extra},\n  "2021":', 1)
        p.write_text(t)

    # flow-trails
    p = ROOT / "js" / "config" / "flow-trails.js"
    t = p.read_text()
    if '"2007":' not in t:
        block = '''    "2007": [
      {"n": 1, "name": "iPhone Safari", "href": "sites/iphone/index.html", "match": "/iphone/", "whenKey": "itt07-iphone", "nextHref": "sites/streetview/index.html", "nextLabel": "Street View leftover"},
      {"n": 2, "name": "Street View leftover", "href": "sites/streetview/index.html", "match": "/streetview/", "whenKey": "itt07-streetview", "nextHref": "sites/gmail/index.html", "nextLabel": "Gmail leftover"},
      {"n": 3, "name": "Gmail open leftover", "href": "sites/gmail/index.html", "match": "/gmail/", "whenKey": "itt07-gmail", "nextHref": "sites/fbplat/index.html", "nextLabel": "Facebook Platform"},
      {"n": 4, "name": "Facebook Platform leftover", "href": "sites/fbplat/index.html", "match": "/fbplat/", "whenKey": "itt07-fbplat", "nextHref": "sites/twitter/index.html", "nextLabel": "Twitter leftover"},
      {"n": 5, "name": "Twitter leftover", "href": "sites/twitter/index.html", "match": "/twitter/", "whenKey": "itt07-twitter", "nextHref": "sites/youtube/index.html", "nextLabel": "YouTube leftover"},
      {"n": 6, "name": "YouTube leftover", "href": "sites/youtube/index.html", "match": "/youtube/", "whenKey": "itt07-youtube", "nextHref": "sites/tumblr/index.html", "nextLabel": "Tumblr leftover"},
      {"n": 7, "name": "Tumblr leftover", "href": "sites/tumblr/index.html", "match": "/tumblr/", "whenKey": "itt07-tumblr", "nextHref": "sites/kindle/index.html", "nextLabel": "Kindle leftover"},
      {"n": 8, "name": "Kindle leftover", "href": "sites/kindle/index.html", "match": "/kindle/", "whenKey": "itt07-kindle", "nextHref": "sites/ie6/index.html", "nextLabel": "XP/IE6 residual"},
      {"n": 9, "name": "XP/IE6 residual", "href": "sites/ie6/index.html", "match": "/ie6/", "whenKey": "itt07-ie6", "nextHref": "sites/playable/game.html", "nextLabel": "Safari Queue"},
      {"n": 10, "name": "Safari Queue", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt07-game-safariq", "nextHref": "sites/iphone/index.html", "nextLabel": "iPhone Safari"}
    ],
'''
        t = t.replace('    "2021": [', block + '    "2021": [', 1)
        p.write_text(t)

    # flow-maps
    p = ROOT / "js" / "config" / "flow-maps.js"
    t = p.read_text()
    if 'ITT.flowMaps["2007"]' not in t:
        block = '''
  ITT.flowMaps["2007"] = {
    thesis: "The phone becomes a browser. Empty / App Store / Chrome never write. Go is the save.",
    shell: "XP mass · IE6 · iPhone is a room",
    year: "2007",
    how: [
      "Safari: type ≥2 · two ticks · Go → itt07-iphone. Empty / App Store / Chrome never write.",
      "Street View / Gmail / Platform / Twitter / YouTube / Tumblr / Kindle are leftover, not the chip.",
      "Next waits for the write. Crumb ← last dest is visible on land.",
      "App Store / Chrome / Android / 3G / Like are not this year."
    ],
    branches: [
      {
        label: "★ Official 10",
        do: "Star stays iPhone Safari. App Store never writes.",
        sites: [
          { name: "1 iPhone Safari", href: "sites/iphone/index.html", do: "Go → itt07-iphone → Street View" },
          { name: "2 Street View leftover", href: "sites/streetview/index.html", do: "29 May leftover → Gmail" },
          { name: "3 Gmail open leftover", href: "sites/gmail/index.html", do: "7 Feb leftover → Platform" },
          { name: "4 Facebook Platform leftover", href: "sites/fbplat/index.html", do: "24 May leftover → Twitter" },
          { name: "5 Twitter leftover", href: "sites/twitter/index.html", do: "Twttr is 2006 → YouTube" },
          { name: "6 YouTube leftover", href: "sites/youtube/index.html", do: "Google-owned leftover → Tumblr" },
          { name: "7 Tumblr leftover", href: "sites/tumblr/index.html", do: "ILS birthmark → Kindle" },
          { name: "8 Kindle leftover", href: "sites/kindle/index.html", do: "19 Nov leftover → IE6" },
          { name: "9 XP/IE6 residual", href: "sites/ie6/index.html", do: "January mass → Safari Queue" },
          { name: "10 Safari Queue", href: "sites/playable/game.html", do: "leftover queue → itt07-game-safariq → Safari" }
        ]
      },
      {
        label: "Leftover 2×",
        do: "Never a second star",
        sites: [
          { name: "Announce leftover", href: "sites/ipann/index.html", do: "Pack A start" },
          { name: "Continuity close", href: "sites/playable/close.html", do: "Pack C end · Next Safari" }
        ]
      }
    ]
  };

'''
        t = t.replace("})(typeof window !== \"undefined\" ? window : this);", block + "})(typeof window !== \"undefined\" ? window : this);", 1)
        p.write_text(t)

    # registry
    p = ROOT / "js" / "immersion" / "registry.js"
    t = p.read_text()
    if '"2007":' not in t:
        t = t.replace(
            '    "2021": [',
            '    "2007": [\n      "immersion/no-mock-common.js",\n      "immersion/one-thing-machines.js"\n    ],\n    "2021": [',
            1,
        )
        p.write_text(t)

    # year-playable
    p = ROOT / "js" / "config" / "year-playable.js"
    t = p.read_text()
    if '"2007"' not in t:
        t = t.replace(
            '    "2021": {',
            '''    "2007": {
      id: "safariq",
      title: "Safari Queue",
      href: "game.html",
      key: "itt07-game-safariq",
      inspire: "iPhone Safari-class leftover queue — App Store / Chrome never write",
      blurb: "Queue a leftover URL. App Store never writes.",
      why: "The star is still iPhone Safari.",
      era: "App Store is highlighted. Go leftover is the real click.",
      famous: "Safari Queue",
      accent: "#0a246a"
    },
    "2021": {''',
            1,
        )
        p.write_text(t)

    # museum-progress
    p = ROOT / "js" / "museum-progress.js"
    t = p.read_text()
    t = t.replace('var WIPED = { "2007": 1, "2009": 1, "2011": 1, "2020": 1, "2023": 1, "2024": 1, "2025": 1 };',
                  'var WIPED = { "2009": 1, "2011": 1, "2020": 1, "2023": 1, "2024": 1, "2025": 1 };')
    if '"2007": yearVisitTour' not in t:
        t = t.replace(
            '    "2021": yearVisitTour("2021",',
            '    "2007": yearVisitTour("2007",\n'
            '      { path: "sites/iphone/index.html", label: "iPhone Safari", blurb: "Empty / App Store / Chrome never write. Go does.", match: "/iphone/" },\n'
            '      { path: "sites/streetview/index.html", label: "Street View leftover", blurb: "29 May leftover. Not the chip.", match: "/streetview/" }),\n'
            '    "2021": yearVisitTour("2021",',
            1,
        )
        p.write_text(t)

    # atlas-data
    p = ROOT / "js" / "atlas-data.js"
    t = p.read_text()
    t = t.replace(
        '"2004", "2005", "2006", "2008",',
        '"2004", "2005", "2006", "2007", "2008",',
    )
    t = t.replace('gapYears: ["2007", "2009", "2011", "2020", "2023", "2024", "2025"],',
                  'gapYears: ["2009", "2011", "2020", "2023", "2024", "2025"],')
    t = t.replace(
        '{ id: "rebuild", label: "Rebuild", blurb: "Wiki edit, Stumble, Photobucket, thefacebook, Twttr.", years: ["2001", "2002", "2003", "2004", "2005", "2006"] },',
        '{ id: "rebuild", label: "Rebuild", blurb: "Wiki edit, Stumble, Photobucket, thefacebook, Twttr, iPhone Safari.", years: ["2001", "2002", "2003", "2004", "2005", "2006", "2007"] },',
    )
    t = t.replace(
        '{ id: "wiped-late", label: "Boarded years", blurb: "2007 / 2009 / 2011 stay empty for rebuild.", years: ["2007", "2009", "2011"] }',
        '{ id: "wiped-late", label: "Boarded years", blurb: "2009 / 2011 stay empty for rebuild.", years: ["2009", "2011"] }',
    )
    t = t.replace(
        '"2018", "2019", "2021", "2022"',
        '"2007", "2018", "2019", "2021", "2022"',
    )
    t = t.replace(
        '''      "2007": {
        wiped: true,
        era: "iPhone Safari · Street View leftover",
        thesis: "Safari is the save. App Store never writes. Desktop is still mass.",
        gold: { label: "iPhone Safari", href: "years/2007/sites/iphone/index.html", key: "itt07-iphone" },
        guided: [
          { label: "Gmail open leftover", href: "years/2007/sites/gmail/index.html" },
          { label: "Street View leftover", href: "years/2007/sites/maps/index.html" }
        ],
        game: { label: "Peg Walk", href: "years/2007/sites/playable/game.html" }
      },''',
        '''      "2007": {
        era: "iPhone Safari · Street View leftover",
        thesis: "Safari is the save. App Store never writes. Desktop is still mass.",
        gold: { label: "iPhone Safari", href: "years/2007/sites/iphone/index.html", key: "itt07-iphone" },
        guided: [
          { label: "Street View leftover", href: "years/2007/sites/streetview/index.html" },
          { label: "Gmail open leftover", href: "years/2007/sites/gmail/index.html" }
        ],
        game: { label: "Safari Queue", href: "years/2007/sites/playable/game.html" }
      },''',
    )
    t = t.replace("2007 / 2009 / 2011 / 2020–2025 boarded", "2009 / 2011 / 2020 / 2023–2025 boarded")
    t = t.replace("2007 / 2009 / 2011 / 2020–2025 stay wiped for rebuild.",
                  "2009 / 2011 / 2020 / 2023–2025 stay wiped for rebuild.")
    p.write_text(t)

    # popular 3×
    p = ROOT / "js" / "config" / "flow-maps-popular-3x.js"
    t = p.read_text()
    if '"2007"' not in t:
        t = t.replace(
            '    "2008":',
            '    "2007": ["youtube|YouTube leftover", "wiki|Wikipedia leftover", "myspace|MySpace leftover"],\n    "2008":',
            1,
        )
        p.write_text(t)

    # DISK-TRUTH
    p = ROOT / "docs" / "DISK-TRUTH.md"
    t = p.read_text()
    t = t.replace("Hub **25 years open** · **1994–2006 + 2008 + 2010 + 2012–2019 + 2021–2022** · **2007 / 2009 / 2011 / 2020 / 2023–2025 wiped**.",
                  "Hub **26 years open** · **1994–2008 + 2010 + 2012–2019 + 2021–2022** · **2009 / 2011 / 2020 / 2023–2025 wiped**.")
    t = t.replace("| **2007** | **Wiped** · hub locked · no year tree · rebuild later · `assets/period/2007/chrome` stays |",
                  "| **2007** | **Live lean door** · iPhone Safari `itt07-iphone` · leftover 2× 120 · XP+IE6 |")
    t = t.replace("Lean doors: **2013–2019 + 2021–2022**. Wiped: **2007 / 2009 / 2011 / 2020 / 2023–2025**.",
                  "Lean doors: **2007 + 2013–2019 + 2021–2022**. Wiped: **2009 / 2011 / 2020 / 2023–2025**.")
    p.write_text(t)

    # sitemap
    p = ROOT / "sitemap.txt"
    t = p.read_text()
    if "/years/2007/" not in t:
        extra = [
            "/years/2007/",
            "/years/2007/pages/home.html",
            "/years/2007/pages/about.html",
            "/years/2007/pages/map.html",
            "/years/2007/sites/iphone/index.html",
        ]
        t = t.rstrip() + "\n" + "\n".join(extra) + "\n"
        p.write_text(t)

    # leftover-official matrix
    p = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(p.read_text())
    existing = {(d.get("year"), d.get("key")) for d in data.get("dests", [])}
    added = 0
    for row in leftover_matrix_rows():
        if (row["year"], row["key"]) not in existing:
            data["dests"].append(row)
            added += 1
    p.write_text(json.dumps(data, indent=2) + "\n")
    print("leftover-official matrix +", added)

    # e2e hub-years
    p = ROOT / "e2e" / "hub-years.spec.js"
    t = p.read_text()
    t = t.replace("'2004', '2005', '2006', '2008',",
                  "'2004', '2005', '2006', '2007', '2008',")
    t = t.replace("const LOCKED = ['2007', '2009', '2011', '2020', '2023', '2024', '2025'];",
                  "const LOCKED = ['2009', '2011', '2020', '2023', '2024', '2025'];")
    t = t.replace("/25 years open/i", "/26 years open/i")
    t = t.replace("    await expect(page.locator('.y2007.locked')).toBeVisible();\n    await expect(page.locator('.y2007.available')).toHaveCount(0);\n    await expect(page.locator('.y2007.locked')).toBeVisible();",
                  "    await expect(page.locator('.y2007.available')).toBeVisible();\n    await expect(page.locator('.y2007.locked')).toHaveCount(0);")
    p.write_text(t)

    # year-core-flows
    p = ROOT / "e2e" / "year-core-flows.spec.js"
    t = p.read_text()
    t = t.replace("'2008', '2010',", "'2007', '2008', '2010',")
    if "'2007':" not in t:
        t = t.replace(
            "  '2008': { type: 'iphone', re: /iphone/i },",
            "  '2007': { type: 'iphone', re: /iphone|safari/i },\n  '2008': { type: 'iphone', re: /iphone/i },",
        )
        p.write_text(t)

    # year-start-trails
    p = ROOT / "e2e" / "year-start-trails.spec.js"
    t = p.read_text()
    t = t.replace('expect(trails).not.toContain("2007-start");',
                  'expect(trails).toContain("2007-start");')
    t = t.replace("if (y === 2005 || y === 2006 || y === 2007 || y === 2009 || y === 2011 || y >= 2020) continue;",
                  "if (y === 2005 || y === 2006 || y === 2009 || y === 2011 || y === 2020 || y >= 2023) continue;")
    p.write_text(t)

    # one-thing
    p = ROOT / "e2e" / "one-thing-per-year.spec.js"
    t = p.read_text()
    if 'year: "2007"' not in t:
        t = t.replace(
            '    year: "2021",',
            '''    year: "2007",
    path: "/years/2007/sites/iphone/index.html",
    key: "itt07-iphone",
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("apple.com");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },
  {
    year: "2021",''',
            1,
        )
        p.write_text(t)

    # official-10 STAR
    p = ROOT / "e2e" / "all-years-official-10-real.spec.js"
    t = p.read_text()
    if '"itt07-iphone"' not in t:
        t = t.replace(
            "const STAR = {",
            '''const STAR = {
  "itt07-iphone": {
    incomplete: async (page) => {
      await page.locator("[data-official-trap]").first().click();
    },
    complete: async (page) => {
      await page.locator("[data-official-need]").fill("apple.com");
      await page.locator("[data-official-req]").nth(0).check();
      await page.locator("[data-official-req]").nth(1).check();
      await page.locator("[data-official-verb]").click();
    },
  },''',
            1,
        )
        p.write_text(t)

    # boarded checklist note
    p = ROOT / "docs" / "BOARDED-YEARS-IMPLEMENT-CHECKLIST-2026-09-01.md"
    t = p.read_text()
    t = t.replace("**Closed:** **2007 · 2009 · 2011 · 2020 · 2023 · 2024 · 2025**.",
                  "**Closed:** **2009 · 2011 · 2020 · 2023 · 2024 · 2025**. **2007 live** as of 2026-09-01.")
    t = t.replace("Hub **25 years open**", "Hub **26 years open**")
    p.write_text(t)


def main() -> None:
    rooms = build_tree()
    write_js_css(rooms)
    patch_wiring(rooms)
    print("2007 rooms", len(rooms))
    print("tree-ok" if (YDIR / "index.html").is_file() else "tree-missing")


if __name__ == "__main__":
    main()
