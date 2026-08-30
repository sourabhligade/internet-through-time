#!/usr/bin/env python3
"""Named leftover dests + playable extras for thin lean years.

Only dests already named in year READ-FIRST / from-scratch / 5× gap maps.
Incomplete never writes. Guided stays 6. Stars do not move.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year, prefix, star rel, html cap
META = {
    "2006": ("06", "sites/twitter/index.html", 90),
    "2007": ("07", "sites/iphone/index.html", 50),
    "2009": ("09", "sites/facebook/index.html", 50),
    "2011": ("11", "sites/googleplus/index.html", 90),
    "2013": ("13", "sites/vine/record.html", 90),
    "2020": ("20", "sites/zoom/meeting.html", 90),
    "2024": ("24", "sites/chatgpt/4o.html", 90),
}

# slug, title, body, kind, go, suffix, trap, req1, req2
# Sourced from year bibles + opened cites (see comments).
ROOMS = {
    "2006": [
        (
            "ie7",
            "IE7 leftover — 18 Oct 2006",
            "IE7 for XP ships <b>18 Oct 2006</b>. Leftover download. This door still boots <b>IE 6</b>. Not Chrome. Not Vista Aero.",
            "checks",
            "Ack leftover",
            "ie7-06",
            "Make IE7 the January shell (trap)",
            "18 Oct 2006 leftover — IE7 for XP, not the January shell",
            "Mass default stays IE6 · empty / trap never writes · not the chip",
        ),
        (
            "ec2",
            "EC2 leftover — 24 Aug 2006",
            "Amazon EC2 limited beta <b>24–25 Aug 2006</b>. $0.10 / instance-hour. GA is <b>2008</b>. S3 (14 Mar) is the other leftover. Not the Twttr chip.",
            "checks",
            "Ack leftover",
            "ec2-06",
            "Spin live instances (trap)",
            "24 Aug 2006 leftover — EC2 limited beta, not 2008 GA",
            "Literacy only · no live AMI · not the chip",
        ),
    ],
    "2007": [
        (
            "yahoo",
            "Yahoo leftover — 2007 mass portal",
            "Yahoo is still a 2007 mass portal leftover. Not the iPhone chip. Not a live search API.",
            "query",
            "Type leftover",
            "yh-07",
            "This is Google.com habit (trap)",
            "2007 leftover — Yahoo mass portal, not the iPhone chip",
            "No live search · empty never writes · not the chip",
        ),
        (
            "wikipedia",
            "Wikipedia leftover — 2007 mass",
            "Wikipedia is 2007 mass leftover. Born 2001. Not the iPhone chip.",
            "query",
            "Type leftover",
            "wk-07",
            "Wikipedia launched in 2007 (trap)",
            "2007 leftover — Wikipedia mass, born 2001",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "amazon",
            "Amazon leftover — 2007 store",
            "Amazon store leftover. Kindle (19 Nov) is a different leftover. Not the iPhone chip. No live cart.",
            "query",
            "Type leftover",
            "az-07",
            "One-click live buy (trap)",
            "2007 leftover — Amazon store literacy, not Kindle gold",
            "No live checkout · empty never writes · not the chip",
        ),
    ],
    "2009": [
        (
            "googlewave",
            "Google Wave leftover — May 2009 invite",
            "Wave demo / invite seed <b>May 2009</b> (I/O). Public is <b>2010</b>. Not daily email. Not the Like chip.",
            "query",
            "Type leftover",
            "wave-09",
            "Wave is already daily email (trap)",
            "May 2009 leftover — Wave invite seed, public 2010",
            "Invite leftover · empty never writes · not the chip",
        ),
        (
            "friendfeed09",
            "FriendFeed leftover — Aug 2009 epitaph",
            "Facebook agrees to buy FriendFeed <b>10 Aug 2009</b>. Epitaph leftover. Not the Like chip. Not a 2007 FriendFeed room.",
            "checks",
            "Ack leftover",
            "ff-09",
            "FriendFeed is the 2009 star (trap)",
            "10 Aug 2009 leftover — FriendFeed epitaph, not the Like chip",
            "Beacon funeral neighbor · empty / trap never writes · not the chip",
        ),
        (
            "android09",
            "Android leftover — 2009 multiphone",
            "Android leftover on more than one handset. Not iPhone 3GS gold. Not the Like chip.",
            "checks",
            "Ack leftover",
            "and-09",
            "Android replaced the iPhone this year (trap)",
            "2009 leftover — Android multiphone, not the 3GS chip",
            "Product leftover · empty / trap never writes · not the chip",
        ),
        (
            "chrome09",
            "Chrome leftover — 2009 rising",
            "Chrome is a 2009 rising leftover (Mac/Linux Dec class). This door still boots <b>XP + IE 8</b>. Not the Like chip.",
            "checks",
            "Ack leftover",
            "ch-09",
            "Chrome is the January 2009 shell (trap)",
            "2009 leftover — Chrome rising, not the January shell",
            "Shell stays XP + IE 8 · empty / trap never writes · not the chip",
        ),
        (
            "spotifyeu",
            "Spotify leftover — EU residual 2009",
            "Spotify EU residual. US invite-free is <b>14 Jul 2011</b>. Not a US unlock. Not the Like chip.",
            "query",
            "Type leftover",
            "sp-09",
            "Unlock Spotify US today (trap)",
            "2009 leftover — Spotify EU residual, US is 2011",
            "No live stream · empty never writes · not the chip",
        ),
        (
            "dropbox09",
            "Dropbox leftover — 2009 continuity",
            "Dropbox continuity leftover. Born 2008. Not the Like chip. No live sync.",
            "query",
            "Type leftover",
            "db-09",
            "Sync a live folder (trap)",
            "2009 leftover — Dropbox continuity, not a 2008/2011 dest steal",
            "Literacy only · empty never writes · not the chip",
        ),
    ],
    "2011": [
        (
            "wechat",
            "Weixin leftover — 21 Jan 2011",
            "Tencent Weixin ships <b>21 Jan 2011</b>. English WeChat name is later. Leftover chat. Not Google+ gold.",
            "checks",
            "Ack leftover",
            "wx-11",
            "WeChat Pay / Mini Programs 2011 (trap)",
            "21 Jan 2011 leftover — Weixin 1.0, not Pay, not Mini Programs",
            "Unbundle leftover · empty / trap never writes · not the chip",
        ),
        (
            "line11",
            "LINE leftover — Jun 2011",
            "LINE launches <b>Jun 2011</b> (JP). Leftover messenger. Not Google+ gold.",
            "query",
            "Type leftover",
            "ln-11",
            "LINE is the 2011 star (trap)",
            "Jun 2011 leftover — LINE, not the Circles chip",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "skypemsft",
            "Skype leftover — 10 May 2011",
            "Microsoft agrees to buy Skype for <b>$8.5 billion</b> cash on <b>10 May 2011</b>. Close is Oct. Not a live call. Not the Circles chip.",
            "checks",
            "Ack leftover",
            "sk-11",
            "Place a live Skype call (trap)",
            "10 May 2011 leftover — Microsoft agrees to buy Skype $8.5B",
            "Deal leftover · empty / trap never writes · not the chip",
        ),
        (
            "minecraft11",
            "Minecraft leftover — 18 Nov 2011",
            "Minecraft 1.0 ships <b>18 Nov 2011</b> (Mojang). Leftover. Not a live world. Not the Circles chip.",
            "query",
            "Type leftover",
            "mc-11",
            "Join a live realm (trap)",
            "18 Nov 2011 leftover — Minecraft 1.0, not a live world",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "quora11",
            "Quora leftover — 2011 breakout",
            "Quora 2011 breakout leftover (launch was 2010). Not the Circles chip. No live follow graph.",
            "query",
            "Type leftover",
            "qo-11",
            "Follow a live topic (trap)",
            "2011 leftover — Quora breakout, launch was 2010",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "evernote11",
            "Evernote leftover — 2011 clipper",
            "Evernote 2011 clipper leftover. Not the Circles chip. No live sync.",
            "query",
            "Type leftover",
            "en-11",
            "Clip a live page (trap)",
            "2011 leftover — Evernote clipper habit",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "rdio11",
            "Rdio leftover — 2011 stream rival",
            "Rdio leftover as a 2011 US streaming rival to Spotify. Not Spotify US gold. No live stream.",
            "checks",
            "Ack leftover",
            "rd-11",
            "This is Spotify US (trap)",
            "2011 leftover — Rdio rival, not the Spotify US dest",
            "No live stream · empty / trap never writes · not the chip",
        ),
        (
            "whatsapp11",
            "WhatsApp leftover — Oct 2011",
            "WhatsApp leftover: <b>1 billion messages / day</b> class Oct 2011. Not the 2014 $19B install star. Not Circles gold.",
            "checks",
            "Ack leftover",
            "wa-11",
            "This is the 2014 WhatsApp Install chip (trap)",
            "Oct 2011 leftover — 1B msgs/day class, not the 2014 install star",
            "Not Facebook Messenger · empty / trap never writes · not the chip",
        ),
    ],
    "2013": [
        (
            "patreon",
            "Patreon leftover — 2013",
            "Patreon leftover 2013. Not Vine gold. No live pledge.",
            "query",
            "Type leftover",
            "pa-13",
            "Charge a live pledge (trap)",
            "2013 leftover — Patreon seed, not the Vine chip",
            "No live money · empty never writes · not the chip",
        ),
        (
            "yikyak13",
            "Yik Yak leftover — 2013 seed",
            "Yik Yak 2013 seed leftover. Mass is later. Not Vine gold. No live dump.",
            "query",
            "Type leftover",
            "yk-13",
            "Post a live dump (trap)",
            "2013 leftover — Yik Yak seed, not 2014 mass",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "hangouts13",
            "Hangouts leftover — 2013",
            "Google Hangouts leftover 2013. Not Vine gold. Not a live Meet.",
            "query",
            "Type leftover",
            "hg-13",
            "Start a live Meet (trap)",
            "2013 leftover — Hangouts, not Meet, not the Vine chip",
            "Literacy only · empty never writes · not the chip",
        ),
        (
            "twitteripo",
            "Twitter IPO leftover — 7 Nov 2013",
            "Twitter IPO leftover <b>7 Nov 2013</b>. Not Vine gold. No live ticker.",
            "checks",
            "Ack leftover",
            "ti-13",
            "Trade live TWTR (trap)",
            "7 Nov 2013 leftover — Twitter IPO literacy",
            "No live broker · empty / trap never writes · not the chip",
        ),
        (
            "bitcoin13",
            "Bitcoin leftover — 2013 literacy",
            "2013 price-run / Silk Road leftover literacy. Not a live wallet. Not Vine gold.",
            "checks",
            "Ack leftover",
            "bt-13",
            "Buy coins live (trap)",
            "2013 leftover — Bitcoin literacy, not a live wallet",
            "No live broker · empty / trap never writes · not the chip",
        ),
    ],
    "2020": [
        (
            "zoombomb",
            "Zoom-bomb leftover — 2020",
            "Uninvited join leftover. Waiting-room / passcode leftover. Not the mute→Leave star. No case-count dashboard.",
            "checks",
            "Ack leftover",
            "zb-20",
            "Admit everyone / write the Zoom star (trap)",
            "2020 leftover — Zoom-bomb literacy, not the mute→Leave chip",
            "Join never writes itt20-zoom · empty / trap never writes",
        ),
        (
            "school20",
            "School leftover — 2020 remote",
            "Remote-school leftover. Not Zoom gold. Not a live LMS. No case dashboard.",
            "query",
            "Type leftover",
            "sc-20",
            "Open a live gradebook (trap)",
            "2020 leftover — remote school literacy, not the Zoom chip",
            "No live roster · empty never writes · not the chip",
        ),
        (
            "teamsschool",
            "Teams-school leftover — 2020",
            "Teams-for-school leftover. Teams is not the Zoom star. 29–30 Apr DAU leftover lives on the Teams dest.",
            "checks",
            "Ack leftover",
            "ts-20",
            "Teams replaced Zoom as the star (trap)",
            "2020 leftover — Teams-school, not the Zoom mute→Leave chip",
            "Empty / trap never writes · not the chip",
        ),
    ],
}

# year-true extra leftover games (f–i) for years missing them
EXTRAS = {
    "2006": [
        ("f", "Tab Filter", "ie7tab", "IE7 tab leftover parlor · not the Twttr chip"),
        ("g", "Feed Tick", "feedtick", "News Feed leftover parlor · not the Twttr chip"),
        ("h", "Bury Cell", "burycell", "Digg leftover parlor · not the Twttr chip"),
        ("i", "You Cover", "youcover", "Time You leftover parlor · not the Twttr chip"),
    ],
    "2007": [
        ("f", "SXSW 140", "sxsw140", "Twitter SXSW leftover parlor · not the iPhone chip"),
        ("g", "Peg City", "pegcity", "Street View leftover parlor · not the iPhone chip"),
        ("h", "Whisper Net", "whispernet", "Kindle leftover parlor · not the iPhone chip"),
        ("i", "Tumble Cell", "tumblecell", "Tumblr leftover parlor · not the iPhone chip"),
    ],
    "2020": [
        ("f", "Wait Room", "waitroom", "Zoom 5.0 waiting-room leftover parlor · not the mute chip"),
        ("g", "Fleet Fade", "fleetfade", "Fleets leftover parlor · not the Zoom chip"),
        ("h", "Sus Hall", "sushall", "Among Us leftover parlor · not the Zoom chip"),
        ("i", "Get Pay", "getpay", "Get My Payment leftover parlor · not the Zoom chip"),
    ],
    "2024": [
        ("f", "Store Shelf", "storeshelf", "GPT Store leftover parlor · not the 4o chip"),
        ("g", "Think First", "thinkfirst", "o1 leftover parlor · not the 4o chip"),
        ("h", "Preview Reel", "previewreel", "Sora preview leftover parlor · not the 4o chip"),
        ("i", "Vision Desk", "visiondesk", "Vision Pro leftover parlor · not the 4o chip"),
    ],
}

HINTS = {
    "2006": [
        ("ie7", r"ie.?7|internet explorer 7"),
        ("ec2", r"ec2|elastic.?compute"),
    ],
    "2007": [
        ("yahoo", r"\byahoo\b"),
        ("wikipedia", r"wikipedia"),
        ("amazon", r"\bamazon\b"),
    ],
    "2009": [
        ("googlewave", r"google.?wave|\bwave\b"),
        ("friendfeed09", r"friend.?feed"),
        ("android09", r"android"),
        ("chrome09", r"\bchrome\b"),
        ("spotifyeu", r"spotify"),
        ("dropbox09", r"dropbox"),
    ],
    "2011": [
        ("wechat", r"wechat|weixin"),
        ("line11", r"\bline\b"),
        ("skypemsft", r"skype"),
        ("minecraft11", r"minecraft"),
        ("quora11", r"quora"),
        ("evernote11", r"evernote"),
        ("rdio11", r"\brdio\b"),
        ("whatsapp11", r"whatsapp"),
    ],
    "2013": [
        ("patreon", r"patreon"),
        ("yikyak13", r"yik.?yak"),
        ("hangouts13", r"hangouts"),
        ("twitteripo", r"twitter.?ipo|\btwtr\b"),
        ("bitcoin13", r"bitcoin|silk.?road"),
    ],
    "2020": [
        ("zoombomb", r"zoom.?bomb|zoombomb"),
        ("school20", r"remote.?school|school.?2020"),
        ("teamsschool", r"teams.?school"),
    ],
}


def room_html(year, prefix, star, slug, title, body, kind, go, suffix, trap, req1, req2) -> str:
    nxt = "../" + "/".join(star.split("/")[1:])
    if kind == "checks":
        inner = (
            f'<p><label style="display:block"><input type="checkbox" data-4x-req> {req1}</label>\n'
            f'<label style="display:block"><input type="checkbox" data-4x-req> {req2}</label></p>\n'
        )
    else:
        inner = (
            '<p><label>Leftover<br>'
            '<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            'placeholder="leftover note"></label></p>\n'
        )
    d2 = suffix + "-d2"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{title}</h1>
<p>{body}</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<button type="button" style="display:none" data-4x-trap>{trap}</button>
</div>
<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
{inner}<p><button type="button" data-4x-go="{suffix}">{go}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{suffix}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:{d2}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · {slug} d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover"></label></p>
<p><button type="button" data-4x-go="{d2}">Type leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{d2}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{d2}:end -->
</body>
</html>
"""


def extra_html(year, prefix, star, role, title, gid, honesty) -> str:
    nxt = "../../" + star
    suf = f"playable-extra-{role}"
    d2 = f"playable-d{role}"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-more-role="{role}" data-year="{year}" data-game-id="{gid}" data-more-kind="place" data-more-need="3" data-more-goods="cell-0,cell-1,cell-2" data-more-traps="offpath">
<p class="crumb"><a href="index.html">Playables</a> · leftover extra, not the chip</p>
<h1>{title}</h1>
<p class="honesty yg-honesty"><b>{honesty}</b> · museum original · no official art · incomplete never writes · key <code>itt{prefix}-game-{gid}</code></p>
<ol class="yg-steps" data-yg-steps>
 <li data-step="start">Start</li>
 <li data-step="acts">Do the good acts. Skip traps.</li>
 <li data-step="save">Finish writes <code>itt{prefix}-game-{gid}</code></li>
</ol>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<div data-more-field class="mx-field"></div>
<p><button type="button" data-game-start>Start</button> <button type="button" data-game-finish>Finish</button></p>
<p data-itt-action-status>Press Start. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-game-{gid}"><b>Next:</b> <a href="game.html">Year game</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:{suf}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · playable extra {role}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover note"></label></p>
<p><button type="button" data-4x-go="{suf}">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{suf}"><b>Next:</b> <a href="game.html">Year game</a></p>
</section>
<!-- ITT-4X:{suf}:end -->
<!-- ITT-4X:{d2}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · playable extra {role} d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover"></label></p>
<p><button type="button" data-4x-go="{d2}">Type leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{d2}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{d2}:end -->
</body>
</html>
"""


def famous_2006() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>Famous games · 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p style="font-size:12px;padding:12px">
 <a href="index.html">← Playables</a> ·
 <a href="game.html">Year game</a> ·
 <a href="../../pages/home.html">Starting Point 2006</a>
</p>
<h1 style="font-size:20px;margin:8px 12px">Famous games · 2006</h1>
<p style="font-size:13px;max-width:42em;margin:0 12px">IE 6 leftover cabinets. Not TrailSled. Not the Twttr chip. Museum JS. No ripped SWF. No official sprites.</p>
<div class="itt-year-game yg-shell" data-year-game data-year="2006" data-game-id="snake" data-famous="snake" tabindex="0" style="margin:18px 12px;padding:10px;border:1px solid #888;background:#fff">
 <h2 style="margin:0 0 6px;font-size:16px">Pocket Snake</h2>
 <p class="honesty" style="font-size:11px;background:#ffc;border:1px solid #cc0;padding:6px">Textbook leftover. Key <code>itt06-game-snake</code>.</p>
 <p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Start to play. Incomplete never writes.</p>
 <canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<div class="itt-year-game yg-shell" data-year-game data-year="2006" data-game-id="memory" data-famous="memory" tabindex="0" style="margin:18px 12px;padding:10px;border:1px solid #888;background:#fff">
 <h2 style="margin:0 0 6px;font-size:16px">Concentration</h2>
 <p class="honesty" style="font-size:11px;background:#ffc;border:1px solid #cc0;padding:6px">Textbook leftover. Key <code>itt06-game-memory</code>.</p>
 <p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Start to play. Incomplete never writes.</p>
 <canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/famous-kit.js"></script>
<script src="../../../../js/immersion-2006.js"></script>
<!-- ITT-4X:playable-famous:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">2006 leftover · playable famous</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2006 leftover · incomplete never writes · not the chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover note"></label></p>
<p><button type="button" data-4x-go="playable-famous">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt06-playable-famous"><b>Next:</b> <a href="../twitter/index.html">Next leftover</a></p>
</section>
<!-- ITT-4X:playable-famous:end -->
<!-- ITT-4X:playable-d7:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">2006 leftover · playable d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2006 leftover · incomplete never writes · not the chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover"></label></p>
<p><button type="button" data-4x-go="playable-d7">Type leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt06-playable-d7"><b>Next:</b> <a href="../../sites/twitter/index.html">★ year star</a></p>
</section>
<!-- ITT-4X:playable-d7:end -->
</body>
</html>
"""


def append_matrix(rows, have, year, path, key, kind, title, nxt, label):
    if (year, key) in have:
        return 0
    rows.append(
        {
            "year": year,
            "path": path,
            "key": key,
            "kind": kind,
            "title": title,
            "next": nxt,
            "nextLabel": label,
        }
    )
    have.add((year, key))
    return 1


def prepend_rooms(cfg: Path, paths: list[str]) -> None:
    t = cfg.read_text(encoding="utf-8")
    for p in reversed(paths):
        line = f'    "{p}",\n'
        if line not in t:
            t = t.replace("  var rooms = [\n", "  var rooms = [\n" + line, 1)
    cfg.write_text(t, encoding="utf-8")


def add_hints(cfg: Path, year: str) -> None:
    hints = HINTS.get(year) or []
    if not hints:
        return
    t = cfg.read_text(encoding="utf-8")
    if "locationHints:" not in t:
        return
    for slug, re_s in reversed(hints):
        line = f'      {{ re: /{re_s}/i, path: "sites/{slug}/index.html" }},\n'
        if line not in t:
            t = t.replace("    locationHints: [\n", "    locationHints: [\n" + line, 1)
    cfg.write_text(t, encoding="utf-8")


def add_home_strip(year: str, prefix: str, slugs: list[tuple[str, str]]) -> None:
    home = ROOT / f"years/{year}/pages/home.html"
    if not home.exists():
        return
    ht = home.read_text(encoding="utf-8")
    mark = f"ITT-2X-{year}-ADD"
    links = " · ".join(
        f'<a href="../sites/{slug}/index.html" data-trail-keys="itt{prefix}-{suf}">{slug} leftover</a>'
        for slug, suf in slugs
    )
    strip = (
        f"<!-- {mark}:start -->\n"
        f'<p class="itt-2x-trails" id="ott-2x-{year}-add" '
        'style="margin:10px auto;padding:10px;background:#fff3e0;border:1px solid #ef6c00;'
        'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>More {year} leftover dests</b> (not the chip · incomplete never writes): "
        + links
        + f' · <a href="../{META[year][1]}">★ year star</a></p>\n'
        f"<!-- {mark}:end -->\n"
    )
    if f"{mark}:start" in ht:
        import re

        ht = re.sub(
            rf"<!-- {mark}:start -->.*?<!-- {mark}:end -->\n",
            strip,
            ht,
            count=1,
            flags=re.S,
        )
    else:
        ht = ht.replace("</body>", strip + "</body>", 1)
    home.write_text(ht, encoding="utf-8")


def add_map_block(year: str, prefix: str, items: list[str]) -> None:
    mp = ROOT / f"years/{year}/pages/map.html"
    if not mp.exists():
        return
    mt = mp.read_text(encoding="utf-8")
    mark = f"ITT-2X-{year}-ADD-MAP"
    block = (
        f"<!-- {mark}:start -->\n"
        f'<div class="itt-2x-map" data-itt-2x-add-map="{year}" '
        'style="margin:12px auto;padding:10px;border:1px dashed #ef6c00;'
        'font-family:Arial,sans-serif;font-size:12px;max-width:46em">'
        f"<b>More {year} leftover map</b> (not the chip · incomplete never writes)<ul>\n"
        + "\n".join(items)
        + f"\n</ul></div>\n<!-- {mark}:end -->\n"
    )
    if f"{mark}:start" in mt:
        import re

        mt = re.sub(
            rf"<!-- {mark}:start -->.*?<!-- {mark}:end -->\n",
            block,
            mt,
            count=1,
            flags=re.S,
        )
    else:
        mt = mt.replace("</body>", block + "</body>", 1)
    mp.write_text(mt, encoding="utf-8")


def main() -> None:
    rows = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text())
    have = {(r.get("year"), r.get("key")) for r in rows}
    added = 0

    famous = ROOT / "years/2006/sites/playable/famous.html"
    famous.write_text(famous_2006(), encoding="utf-8")
    print("wrote 2006 famous cabinets")

    years = sorted(set(ROOMS) | set(EXTRAS), key=lambda y: int(y))
    for year in years:
        rooms = ROOMS.get(year) or []
        prefix, star, cap = META[year]
        html_now = len(list((ROOT / "years" / year).rglob("*.html")))
        planned = len(rooms) + len(EXTRAS.get(year) or [])
        if html_now + planned > cap:
            raise SystemExit(f"{year} would be {html_now + planned} > cap {cap}")
        new_paths = []
        map_items = []
        strip = []
        for rec in rooms:
            slug, title, body, kind, go, suffix, trap, req1, req2 = rec
            dest = ROOT / "years" / year / "sites" / slug / "index.html"
            dest.parent.mkdir(parents=True, exist_ok=True)
            if dest.exists():
                print("skip existing", dest.relative_to(ROOT))
            else:
                dest.write_text(
                    room_html(year, prefix, star, slug, title, body, kind, go, suffix, trap, req1, req2),
                    encoding="utf-8",
                )
                print("wrote", dest.relative_to(ROOT))
            new_paths.append(f"sites/{slug}/index.html")
            strip.append((slug, suffix))
            star_href = f"/years/{year}/{star}"
            added += append_matrix(
                rows, have, year, f"/years/{year}/sites/{slug}/index.html",
                f"itt{prefix}-{suffix}", kind, title, star_href, "year star",
            )
            added += append_matrix(
                rows, have, year, f"/years/{year}/sites/{slug}/index.html",
                f"itt{prefix}-{suffix}-d2", "query", f"{year} leftover · {slug} d2",
                star_href, "year star",
            )
            map_items.append(
                f'<li><a href="../sites/{slug}/index.html">{title.split(" — ")[0]}</a> · '
                f"<code>itt{prefix}-{suffix}</code> · {kind} → "
                f'<a href="../{star}">★ year star</a></li>'
            )

        for role, title, gid, honesty in EXTRAS.get(year) or []:
            dest = ROOT / "years" / year / "sites" / "playable" / f"extra-{role}.html"
            if dest.exists():
                print("skip existing", dest.relative_to(ROOT))
            else:
                dest.write_text(extra_html(year, prefix, star, role, title, gid, honesty), encoding="utf-8")
                print("wrote", dest.relative_to(ROOT))
            new_paths.append(f"sites/playable/extra-{role}.html")
            suf = f"playable-extra-{role}"
            d2 = f"playable-d{role}"
            added += append_matrix(
                rows, have, year, f"/years/{year}/sites/playable/extra-{role}.html",
                f"itt{prefix}-{suf}", "query", f"{year} leftover · playable extra {role}",
                f"/years/{year}/sites/playable/game.html", "Year game",
            )
            added += append_matrix(
                rows, have, year, f"/years/{year}/sites/playable/extra-{role}.html",
                f"itt{prefix}-{d2}", "query", f"{year} leftover · playable extra {role} d2",
                f"/years/{year}/{star}", "year star",
            )
            map_items.append(
                f'<li><a href="../sites/playable/extra-{role}.html">{title}</a> · '
                f"<code>itt{prefix}-{suf}</code> · extra → "
                f'<a href="../sites/playable/game.html">Year game</a></li>'
            )

        prepend_rooms(ROOT / f"js/config/{year}.js", new_paths)
        add_hints(ROOT / f"js/config/{year}.js", year)
        if strip:
            add_home_strip(year, prefix, strip)
        if map_items:
            add_map_block(year, prefix, map_items)

    (ROOT / "e2e" / "2x-links.matrix.json").write_text(
        json.dumps(rows, indent=2) + "\n", encoding="utf-8"
    )
    print("matrix +", added, "total", len(rows))


if __name__ == "__main__":
    main()
