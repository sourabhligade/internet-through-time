#!/usr/bin/env python3
"""Build years/2014/ lean door from the 2026-09-05 implement map.

WhatsApp Install star. Official 10. Leftover 6× dests. Leftover 2× + leftover 4×
on every dest. Leftover never stamps official whenKeys. HTML cap 70.
"""
from __future__ import annotations

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2014"

OFFICIAL = {
    "sites/whatsapp/index.html": "itt14-wa-install",
    "sites/whatsapp/chat.html": "itt14-wa-chat",
    "sites/heartbleed/index.html": "itt14-heartbleed",
    "sites/icebucket/index.html": "itt14-icebucket",
    "sites/iphone/index.html": "itt14-iphone6",
    "sites/iphone/pay.html": "itt14-applepay",
    "sites/material/index.html": "itt14-material",
    "sites/slack/index.html": "itt14-slack",
    "sites/twitch/index.html": "itt14-twitch",
    "sites/playable/game.html": "itt14-game-tilefold",
}
OFFICIAL_LO = {
    "sites/whatsapp/index.html": "wa-lx",
    "sites/whatsapp/chat.html": "chat-lx",
    "sites/heartbleed/index.html": "hb-lx",
    "sites/icebucket/index.html": "ice-lx",
    "sites/iphone/index.html": "ip6-lx",
    "sites/iphone/pay.html": "pay-lx",
    "sites/material/index.html": "mat-lx",
    "sites/slack/index.html": "sl-lx",
    "sites/twitch/index.html": "tw-lx",
    "sites/playable/game.html": "tile-lx",
}

# path, suffix, kind, title, verb, trap, next, nlab, body, official_html or None
DESTS = []


def _rel(src: str, dest: str) -> str:
    return os.path.relpath(dest, Path(src).parent).replace("\\", "/")


def leftover_block(src, suffix, kind, verb, trap, nxt, nlab, tag):
    nxt_rel = _rel(src, nxt)
    field = hops = wait = pick = need = min_pick = ""
    if kind == "query":
        field = f'<p><label>{verb}. Incomplete never writes.<br><input type="text" data-lo-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></label></p>\n'
    if kind == "hops":
        hops = f'<p><button type="button" data-lo-pick="a">{verb} room</button> <button type="button" data-lo-pick="b">{verb} second</button></p>\n'
        min_pick = ' data-lo-kind="hops" data-lo-min-pick="2"'
    if kind == "wait":
        wait = '<p><button type="button" data-lo-wait data-lo-wait-ms="2000">Wait leftover invite</button></p>\n'
    if kind != "hops":
        pick = (
            '<p>\n <button type="button" data-lo-pick="keep">This year leftover</button>\n'
            ' <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>\n</p>\n'
        )
        need = ' data-lo-need-pick="keep"'
    return f"""<!-- ITT-LO-OFFICIAL{tag}:start -->
<section data-lo-panel="1" data-itt-year="2014" class="itt-2014-machine" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>{verb}</b> · leftover · {suffix} · not the chip · incomplete never writes · <code>itt14-{suffix}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> WhatsApp Install is the star. This dest is leftover.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Empty, trap, or 0 ticks never write.</label>
{pick}{field}{hops}{wait}<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{suffix}"{need}{min_pick}>{verb}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt14-{suffix}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-LO-OFFICIAL{tag}:end -->
"""


POP = {
    "sites/snapchat/index.html": ("snapchat", None, "behind the gym", "Send leftover", "sites/instagram/index.html", "Instagram leftover", "Stories launched 2013 · mass habit here. Not IG Stories (2016). Not Discover (27 Jan 2015)."),
    "sites/instagram/index.html": ("instagram", None, "weekend", "Share leftover", "sites/uber/index.html", "Uber leftover", "Still the filter feed. No Stories."),
    "sites/uber/index.html": ("uber", None, "airport", "Request leftover", "sites/whatsapp/index.html", "★ WhatsApp Install", "Ride-hail mass. Not 2012 UberCab-only."),
    "sites/youtube/index.html": ("youtube", "pop3-youtube", "music video", "Watch leftover", "sites/wikipedia/index.html", "Wikipedia leftover", "Residual player. Not Vine. Not 2015 Live."),
    "sites/wikipedia/index.html": ("wikipedia", "pop3-wikipedia", "whatsapp", "Read leftover", "sites/facebook/index.html", "Facebook leftover", "Encyclopedia leftover. Not the 2001 edit star."),
    "sites/facebook/index.html": ("facebook", "pop3-facebook", "$19 billion", "Deal leftover", "sites/whatsapp/index.html", "★ WhatsApp Install", "Deal leftover. App still Facebook. Not the WhatsApp chip."),
    "sites/heartbleed/index.html": ("heartbleed", None, "rotate leftover", "Rotate leftover", "sites/icebucket/index.html", "Ice Bucket leftover", "CVE-2014-0160 leftover. Not the chip."),
    "sites/icebucket/index.html": ("icebucket", None, "nominate leftover", "Nominate leftover", "sites/slack/index.html", "Slack leftover", "ALS summer leftover. Not the chip."),
    "sites/slack/index.html": ("slack", None, "email bankruptcy", "Join leftover", "sites/whatsapp/index.html", "★ WhatsApp Install", "Public 12 Feb leftover. Not Teams."),
}


def pop_block(src, pop_id, pop_key, ph, verb, nxt, nlab, honesty):
    nxt_rel = _rel(src, nxt)
    key_attr = f' data-pop-key="{pop_key}"' if pop_key else ""
    when = f"itt14-{pop_key}" if pop_key else f"itt14-pop-{pop_id}"
    return f"""<!-- ITT-POP:{pop_id}:start -->
<section data-pop-panel="1" data-itt-year="2014" class="itt-pop3" style="margin:14px auto;padding:12px;border:1px dashed #2e7d32;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e8f5e9;color:#111">
<p><b>Also popular leftover</b> · not the chip · empty never writes · <code>{when}</code></p>
<p>{honesty}</p>
<p>
 <button type="button" data-pop-pick="ok" data-pop-q="{ph}">This year leftover</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">Neighbor year (trap)</button>
</p>
<p><label>Leftover note<br><input type="text" data-pop-field maxlength="80" placeholder="{ph}" autocomplete="off"></label></p>
<label style="display:block"><input type="checkbox" data-pop-req> {honesty}</label>
<p><button type="button" data-pop-go data-pop-id="{pop_id}"{key_attr}>{verb}</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{when}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-POP:{pop_id}:end -->
"""


def famous_cabinets():
    return """<div data-famous="mines" data-year-game data-year="2014" data-game-id="mines" tabindex="0" style="margin:12px 0;padding:10px;border:1px solid #888;background:#fff">
<h2>Mines leftover</h2>
<p>Textbook mines. Museum JS. Not Tile Fold gold. Key <code>itt14-game-mines</code>.</p>
<p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p data-itt-action-status>Start to play. Load never writes.</p>
<canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<div data-famous="snake" data-year-game data-year="2014" data-game-id="snake" tabindex="0" style="margin:12px 0;padding:10px;border:1px solid #888;background:#fff">
<h2>Pocket Snake leftover</h2>
<p>Textbook snake. Museum JS. Not Flappy gold. Key <code>itt14-game-snake</code>.</p>
<p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p data-itt-action-status>Start to play. Load never writes.</p>
<canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/famous-kit.js"></script>
"""


def fourx_block(src, suffix, kind, verb, nxt, nlab):
    nxt_rel = _rel(src, nxt)
    go = suffix + "-4x"
    inner = ""
    if kind == "query":
        inner = f'<p><input type="text" data-4x-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></p>\n'
    elif kind == "checks":
        inner = (
            '<p><label><input type="checkbox" data-4x-req> Leftover 2014 · not the star.</label></p>\n'
            '<p><label><input type="checkbox" data-4x-req> Empty / trap never writes.</label></p>\n'
        )
    elif kind == "hops":
        inner = '<p><button type="button" data-4x-hop="a">Leftover A</button> <button type="button" data-4x-hop="b">Leftover B</button></p>\n'
    elif kind == "wait":
        inner = '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">Wait leftover invite</button></p>\n'
    return f"""<!-- ITT-4X:{go}:start -->
<section data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:14px auto;padding:12px;border:1px dashed #165ca8;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e3f2fd;color:#111">
<p><b>{verb}</b> · leftover 4× · not the chip · empty go never writes · <code>itt14-{go}</code></p>
{inner}<p><button type="button" data-4x-go="{go}">{verb}</button> <span data-4x-status></span></p>
<p hidden data-4x-result></p>
<p hidden data-next-flow data-next-when-key="itt14-{go}"><b>Next:</b> <a href="{nxt_rel}">{nlab}</a></p>
</section>
<!-- ITT-4X:{go}:end -->
"""


def hops(src):
    pairs = [
        ("sites/whatsapp/index.html", "★ WhatsApp Install"),
        ("sites/heartbleed/index.html", "Heartbleed leftover"),
        ("sites/icebucket/index.html", "Ice Bucket leftover"),
        ("sites/iphone/index.html", "iPhone 6 leftover"),
        ("sites/oculus/index.html", "Oculus leftover"),
        ("sites/snapchat/index.html", "Snapchat leftover"),
        ("sites/playable/famous.html", "Famous leftover"),
        ("sites/playable/game.html", "Tile Fold"),
    ]
    return " · ".join(
        f'<a href="{_rel(src, h)}">{l}</a>' for h, l in pairs if h != src
    )


def wrap(src, title, core, official=None):
    key = f' data-official-key="{official}"' if official else ""
    depth = "../" * (src.count("/") + 2)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2014"{key}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{depth}css/period-2014.css">
</head>
<body bgcolor="#dce6f0" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:560px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{core}
</div>
<script src="{depth}js/immersion-2014.js"></script>
<script src="{depth}js/immersion/year-2014-extras.js"></script>
<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2014" style="margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;max-width:52em"><b>Also this year · 3×</b><p>{hops(src)}</p></nav>
<!-- ITT-3X-ALSO:end -->
"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def pages():
    write(
        YEAR / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2014">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer residual — 2014</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2014");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2014.js?v=20260830ui"></script>
<script src="../../js/browser-2014.js?v=20260830ui"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2014">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2014</title>
<link rel="stylesheet" href="../../../css/period-2014.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#dce6f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2014");</script>
<script src="../../../js/immersion-2014.js" defer></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2014">
<head>
<meta charset="utf-8">
<title>About 2014 — 968,882,453 June</title>
<link rel="stylesheet" href="../../../css/period-2014.css">
</head>
<body bgcolor="#dce6f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2014</h1>
<p><b>Messaging becomes the mass internet — WhatsApp is the $19 billion install, TLS bleeds, and a summer video loop fills a charity.</b>
Most people still live on a Windows 7 / IE 9 laptop. Chrome is the pageview narrative, not January chrome.</p>
<p>Browser honesty: StatCounter Chrome is the <b>pageview</b> #1. Net Applications IE is still <b>installed</b> #1. This window boots <b>IE 9</b>.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#dce6f0"><th>Cite</th><th>Number</th></tr>
<tr><td>ILS June 2014 websites</td><td><b>968,882,453 (+44%)</b></td></tr>
<tr><td>ILS June 2014 users</td><td><b>2,925,249,355</b></td></tr>
<tr><td>ILS June 2013 (parent)</td><td>672,985,183 (−3%)</td></tr>
<tr><td>ILS June 2015 (child)</td><td>863,105,652 (−11%)</td></tr>
<tr><td>1 billion hostnames</td><td>first crossed <b>September 2014</b> · ILS announced · Netcraft October survey · TBL tweet <b>16 Sep</b></td></tr>
<tr><td>Netcraft January 2014</td><td><b>861,379,152</b> — January, not June</td></tr>
<tr><td>Netcraft January 2015</td><td><b>876,812,666</b> — dip after 1B</td></tr>
</table>
<p style="font-size:12px">Never blend June ILS with January Netcraft. Never invent 980 million. 5k websites is a research envelope, not dest count. WhatsApp Web is <b>21 Jan 2015</b>, not this door. WhatsApp stays a standalone app.</p>
<h2>Bans</h2>
<ul>
<li>Watch / Win10 as defaults (ship 2015) · IG Stories · Snap Discover · Periscope</li>
<li>Heartbleed exploit · WhatsApp as Messenger · google.com dest · ChatGPT</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read June 968,882,453 (+44%) and Sep 1B hostnames.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Watch / Win10 / Messenger / exploit are not 2014 defaults.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p hidden data-next-flow><b>Next:</b> <a href="../sites/whatsapp/index.html">★ WhatsApp Install</a></p>
</section>
</div>
<script src="../../../js/immersion-2014.js"></script>
</body>
</html>
""",
    )
    write(
        YEAR / "pages/map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2014">
<head><meta charset="utf-8"><title>2014 year flow map</title>
<link rel="stylesheet" href="../../../css/period-2014.css"></head>
<body bgcolor="#dce6f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>2014 flow map</h1>
<p>Guided 6: About · ★ WhatsApp Install · Heartbleed leftover · Ice Bucket leftover · iPhone 6 leftover · this map. Messenger is the trap.</p>
<ol data-itt-ten-flows>
<li><a href="../sites/whatsapp/index.html">★ WhatsApp Install</a></li>
<li><a href="../sites/whatsapp/chat.html">WhatsApp chat leftover</a></li>
<li><a href="../sites/heartbleed/index.html">Heartbleed leftover</a></li>
<li><a href="../sites/icebucket/index.html">Ice Bucket leftover</a></li>
<li><a href="../sites/iphone/index.html">iPhone 6 leftover</a></li>
<li><a href="../sites/iphone/pay.html">Apple Pay leftover</a></li>
<li><a href="../sites/material/index.html">Material leftover</a></li>
<li><a href="../sites/slack/index.html">Slack leftover</a></li>
<li><a href="../sites/twitch/index.html">Twitch leftover</a></li>
<li><a href="../sites/playable/game.html">Tile Fold</a></li>
</ol>
<p>First 3× leftover: <a href="../sites/snapchat/index.html">Snapchat</a> · <a href="../sites/instagram/index.html">Instagram</a> · <a href="../sites/uber/index.html">Uber</a>. Leftover 6×: <a href="../sites/oculus/index.html">Oculus</a>. No Vine chip. No Periscope / Watch store / Win10 dest. No <code>sites/google/index.html</code>.</p>
<div class="itt-fmap">
<p class="itt-fmap-thesis">Messaging becomes the mass internet.</p>
<ul class="itt-fmap-sites">
<li class="itt-fmap-site"><a class="itt-fmap-name" href="../sites/playable/famous.html">Famous leftover</a> — Mines + Pocket Snake leftover parlor</li>
</ul>
</div>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/immersion-2014.js"></script>
</body></html>
""",
    )
    write(
        YEAR / "pages/whats-new.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2014">
<head><meta charset="utf-8"><title>What's new — 2014</title>
<link rel="stylesheet" href="../../../css/period-2014.css"></head>
<body bgcolor="#dce6f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>What's new — 2014</h1>
<p>WhatsApp Install is the chip. Messenger never writes. Watch / Win10 ship 2015.</p>
</div>
<script src="../../../js/immersion-2014.js"></script>
</body></html>
""",
    )
    for name, title in (("404.html", "404 leftover — 2014"), ("unreachable.html", "Unreachable leftover — 2014")):
        write(
            YEAR / "pages/error" / name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2014">
<head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2014.css"></head>
<body bgcolor="#dce6f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../home.html">Starting Point</a></p>
<h1>{title}</h1>
<p>Museum leftover error room. Not the chip.</p>
</div>
<script src="../../../../js/immersion-2014.js"></script>
</body></html>
""",
        )


CORES = {
    "sites/whatsapp/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] WhatsApp Install · no official green-bubble mark.</p>
<div class="wa14-phone">
<div class="wa14-top"><div class="wa14-word">WHATSAPP</div><p class="wa14-sub">19 Feb 2014 · $19B · 450M MAU · independent brand</p></div>
<div class="wa14-body">
<p>$0.99 / year after the first year. No ads as the 2014 pitch. Close 6 Oct. Messenger stays a separate app. WhatsApp Web is 21 Jan 2015 — not this room.</p>
<button type="button" class="wa14-deal" data-wa14-deal="16b">$16B cash+stock</button>
<button type="button" class="wa14-deal" data-wa14-deal="rsu">$3B RSU · $19B total</button>
<button type="button" class="wa14-install" data-wa14-install>Install</button>
<button type="button" class="wa14-trap" data-wa14-messenger>Open Messenger instead</button>
<p class="wa14-status" data-wa14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-wa-install"><b>Next:</b> <a href="chat.html">WhatsApp chat leftover</a></p>
</div></div>""",
    "sites/whatsapp/chat.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] WhatsApp chat leftover · no official mark.</p>
<p class="crumb"><a href="index.html">★ Install</a></p>
<h1>WhatsApp chat leftover</h1>
<p>Short leftover note. Not the chip. Completing this never writes <code>itt14-wa-install</code>.</p>
<label style="display:block"><input type="checkbox" data-wa14-req> Standalone brand. Messenger is a separate app.</label>
<label style="display:block"><input type="checkbox" data-wa14-req> $0.99 / year after the first year. No ads as the 2014 pitch.</label>
<p><input type="text" data-wa14-note maxlength="80" placeholder="leftover note" autocomplete="off"></p>
<p><button type="button" data-wa14-send>Send leftover</button></p>
<p data-wa14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-wa-chat"><b>Next:</b> <a href="../heartbleed/index.html">Heartbleed leftover</a></p>""",
    "sites/heartbleed/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Heartbleed leftover · no OpenSSL logo.</p>
<h1>Heartbleed leftover</h1>
<p>CVE-2014-0160 · public 7 Apr · OpenSSL 1.0.1–1.0.1f · fix 1.0.1g · 64k heartbeat · no log trace. Apache+nginx &gt;66% of <b>active</b> sites (Netcraft April 2014). Literacy + rotate. No exploit.</p>
<label style="display:block"><input type="checkbox" data-hb14-req> CVE-2014-0160 · 7 Apr 2014 · 64k heartbeat.</label>
<label style="display:block"><input type="checkbox" data-hb14-req> Rotate leftover. Exploit / dump never writes.</label>
<p>
 <button type="button" data-hb14-exploit>Exploit / Scan / Dump (trap)</button>
 <button type="button" data-hb14-rotate>Rotate leftover</button>
</p>
<p data-hb14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-heartbleed"><b>Next:</b> <a href="../icebucket/index.html">Ice Bucket leftover</a></p>""",
    "sites/icebucket/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Ice Bucket leftover · no celebrity still.</p>
<h1>Ice Bucket leftover</h1>
<p>ALS · Jul–Aug 2014. Kennedy 15 Jul ALS link · Frates 31 Jul viral · ALS Association &gt;$100M 29 Jul–29 Aug vs $2.8M prior year. Nominate + summer note. No dump. No celebrity still required.</p>
<label style="display:block"><input type="checkbox" data-ice14-req> Summer 2014 leftover loop. Not the WhatsApp chip.</label>
<label style="display:block"><input type="checkbox" data-ice14-req> Nominate leftover. Celebrity still never required.</label>
<p><input type="text" data-ice14-name maxlength="80" placeholder="nominate leftover" autocomplete="off"></p>
<p><button type="button" data-ice14-dump>Nominate leftover</button></p>
<p data-ice14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-icebucket"><b>Next:</b> <a href="../iphone/index.html">iPhone 6 leftover</a></p>""",
    "sites/iphone/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] iPhone 6 leftover · no official Apple art.</p>
<h1>iPhone 6 leftover</h1>
<p>9 Sep announce · 19 Sep ship. 6 is 4.7" · 6 Plus is 5.5". Contract class $199 / $299. Watch announced 9 Sep, <b>ships 2015</b>.</p>
<label style="display:block"><input type="checkbox" data-ip14-req> Sep 2014 leftover. Bigger glass. Not the chip.</label>
<label style="display:block"><input type="checkbox" data-ip14-req> Watch ships 2015. Face ID is 2017.</label>
<p>
 <button type="button" data-ip14-size="6">iPhone 6</button>
 <button type="button" data-ip14-size="6plus">iPhone 6 Plus</button>
</p>
<p>
 <button type="button" data-ip14-watch>Apple Watch (trap · 2015)</button>
 <button type="button" data-ip14-faceid>Face ID (trap · 2017)</button>
 <button type="button" data-ip14-save>Pick leftover 6</button>
</p>
<p data-ip14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-iphone6"><b>Next:</b> <a href="pay.html">Apple Pay leftover</a></p>""",
    "sites/iphone/pay.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Apple Pay leftover · no PAN · no official mark.</p>
<h1>Apple Pay leftover</h1>
<p>NFC + Touch ID · US October 2014. Not Watch. No real card.</p>
<label style="display:block"><input type="checkbox" data-pay14-req> October 2014 leftover tap. Not Watch.</label>
<label style="display:block"><input type="checkbox" data-pay14-req> No live PAN. Trap never writes.</label>
<p><button type="button" data-pay14-tap>Tap leftover</button></p>
<p data-pay14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-applepay"><b>Next:</b> <a href="../material/index.html">Material leftover</a></p>""",
    "sites/material/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Material leftover · no official Google mark.</p>
<h1>Material leftover</h1>
<p>Google I/O 25 Jun 2014 · Lollipop 12 Nov. Paper and ink leftover.</p>
<label style="display:block"><input type="checkbox" data-mat14-req> I/O 25 Jun 2014 leftover. Not the chip.</label>
<label style="display:block"><input type="checkbox" data-mat14-req> Lollipop 12 Nov leftover. Empty never writes.</label>
<p><button type="button" data-mat14-save>Material leftover</button></p>
<p data-mat14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-material"><b>Next:</b> <a href="../slack/index.html">Slack leftover</a></p>""",
    "sites/slack/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Slack leftover · no official mark · no Nitro bill.</p>
<h1>Slack leftover</h1>
<p>Public 12 Feb 2014. Email bankruptcy leftover. Pick a channel. Join leftover.</p>
<p>
 <button type="button" data-sl14-chan="general">#general</button>
 <button type="button" data-sl14-chan="random">#random</button>
</p>
<p><button type="button" data-sl14-join>Join leftover</button></p>
<p data-sl14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-slack"><b>Next:</b> <a href="../twitch/index.html">Twitch leftover</a></p>""",
    "sites/twitch/index.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Twitch leftover · no official mark.</p>
<h1>Twitch leftover</h1>
<p>Amazon $970M cash 25 Aug 2014. July class 55M uniques / 15B minutes. Google almost did — that trap never writes.</p>
<label style="display:block"><input type="checkbox" data-tw14-req> Amazon $970M cash 25 Aug 2014. Not Google-bought.</label>
<p><input type="text" data-tw14-note maxlength="80" placeholder="stream leftover" autocomplete="off"></p>
<p>
 <button type="button" data-tw14-google>Google bought Twitch (trap)</button>
 <button type="button" data-tw14-save>Ack leftover $970M</button>
</p>
<p data-tw14-status></p>
<p hidden data-next-flow data-next-when-key="itt14-twitch"><b>Next:</b> <a href="../whatsapp/index.html">★ WhatsApp Install</a></p>""",
    "sites/playable/game.html": """<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] Tile Fold · no Flappy gold.</p>
<div data-year-game data-year="2014" data-game-id="tilefold">
<h1>Tile Fold</h1>
<p>Load never writes. Fold two leftover tiles. Flappy is not the gold.</p>
<p>Score <b data-game-score>0</b></p>
<p><button type="button" data-game-start>New fold</button></p>
<p>
 <button type="button" data-tile-fold="a">Fold leftover A</button>
 <button type="button" data-tile-fold="b">Fold leftover B</button>
 <button type="button" data-tile-trap>Flappy gold (trap)</button>
</p>
<p data-itt-action-status>Load never writes.</p>
<p hidden data-next-flow data-next-when-key="itt14-game-tilefold"><b>Next:</b> <a href="../whatsapp/index.html">★ WhatsApp Install</a></p>
</div>""",
}


LEAN = [
    ("sites/oculus/index.html", "oc-6x", "checks", "Oculus leftover — 25 Mar 2014", "Ack leftover $2B", "wear headset (trap)", "sites/ello/index.html", "Ello leftover", "25 Mar 2014. Facebook ~$2B ($400M cash + 23.1M shares + $300M earn-out). Rift is still a developer kit (75,000+ DK2 preorders). Consumer CV1 is Mar 2016. Not the WhatsApp chip."),
    ("sites/ello/index.html", "el-6x", "query", "Ello leftover — 2014", "Invite leftover manifesto", "mass Facebook (trap)", "sites/serial/index.html", "Serial leftover", "Launch 19 Mar / invite 3 Apr. You Are Not a Product. September rush after Facebook real-name. Invite-only. Not mass."),
    ("sites/serial/index.html", "se-6x", "hops", "Serial leftover — 3 Oct 2014", "Listen leftover Serial", "courtroom UI (trap)", "sites/musically14/index.html", "musical.ly leftover", "Ep 1+2 3 Oct 2014 10am ET. Sarah Koenig. TAL Friday. First mass commute podcast. Not a courtroom."),
    ("sites/musically14/index.html", "ml-6x", "query", "musical.ly leftover — 2014", "Record leftover", "TikTok-as-2014 (trap)", "sites/truecrypt/index.html", "TrueCrypt leftover", "2014 launch year. Word on the icon is musical.ly. TikTok merge is 2 Aug 2018."),
    ("sites/truecrypt/index.html", "tc-6x", "checks", "TrueCrypt leftover — May 2014", "Ack leftover warning", "decrypt exploit (trap)", "sites/echoinvite/index.html", "Echo invite leftover", "28 May 2014 WARNING: Using TrueCrypt is not secure. 7.2 decrypt-only. Audit mid-flight. Literacy. No exploit."),
    ("sites/echoinvite/index.html", "ec-6x", "wait", "Echo invite leftover — 6 Nov 2014", "Wait leftover invite", "mass $179.99 (trap)", "sites/whatsapp/index.html", "★ WhatsApp Install", "6 Nov 2014 announce / invite. Mass $179.99 buy is 23 Jun / 14 Jul 2015. Not the chip."),
    ("sites/snapchat/index.html", "snap-lx", "hops", "Snapchat leftover — 2014", "Snap leftover 24h", "Discover-as-2014 (trap)", "sites/instagram/index.html", "Instagram leftover", "24h leftover. Stories launched 2013 · mass habit here. Not IG Stories (2016). Discover is 27 Jan 2015."),
    ("sites/instagram/index.html", "ig-lx", "hops", "Instagram leftover — 2014", "Filter leftover", "Stories-as-2014 (trap)", "sites/uber/index.html", "Uber leftover", "Filter leftover. Stories are 2016."),
    ("sites/uber/index.html", "uber-lx", "query", "Uber leftover — 2014", "Request leftover", "live pickup (trap)", "sites/youtube/index.html", "YouTube leftover", "Pickup leftover. No live ride."),
    ("sites/youtube/index.html", "yt-lx", "hops", "YouTube leftover — 2014", "Watch leftover", "live stream gold (trap)", "sites/wikipedia/index.html", "Wikipedia leftover", "3× leftover. Not the chip."),
    ("sites/wikipedia/index.html", "wk-lx", "query", "Wikipedia leftover — 2014", "Edit leftover", "live save (trap)", "sites/facebook/index.html", "Facebook leftover", "No live save."),
    ("sites/facebook/index.html", "fb-lx", "hops", "Facebook leftover — 2014", "Connect leftover", "Messenger-as-WhatsApp (trap)", "sites/twitter/index.html", "Twitter leftover", "Messenger stays separate. WhatsApp is standalone."),
    ("sites/twitter/index.html", "twit-lx", "query", "Twitter leftover — 2014", "140 leftover", "X-as-2014 (trap)", "sites/whatsapp/index.html", "★ WhatsApp Install", "Still Twitter. Dest stays leftover."),
    ("sites/playable/famous.html", "famous-lx", "hops", "Famous leftover — 2014", "Play leftover Famous", "Flappy gold (trap)", "sites/playable/game.html", "Tile Fold", "Famous leftover. Tile Fold is the year game."),
    ("sites/playable/index.html", "play-lx", "hops", "2014 playables leftover", "Play leftover cabinet", "Flappy gold (trap)", "sites/playable/famous.html", "Famous leftover", 'Cabinets are not leftover 6× dests. <a href="famous.html">Famous leftover</a> · <a href="game.html">Tile Fold</a>.'),
]


def dests():
    lo_rows = []
    x2_rows = []
    extras = ["extra-a", "extra-b", "extra-c", "extra-d", "extra-e", "more-a", "more-b"]
    all_rows = list(LEAN)
    for extra in extras:
        all_rows.append(
            (
                f"sites/playable/{extra}.html",
                extra.replace("-", "") + "-lx",
                "hops",
                f"{extra} leftover cabinet — 2014",
                "Play leftover cabinet",
                "Flappy gold (trap)",
                "sites/playable/famous.html",
                "Famous leftover",
                "Cabinet leftover. Not a leftover 6× dest. Not Tile Fold gold.",
            )
        )
    # official dests first
    official_meta = [
        ("sites/whatsapp/index.html", "wa-lx", "checks", "WhatsApp Install leftover literacy", "Install leftover", "Messenger (trap)", "sites/whatsapp/chat.html", "WhatsApp chat leftover"),
        ("sites/whatsapp/chat.html", "chat-lx", "query", "WhatsApp chat leftover literacy", "Send leftover", "empty gold (trap)", "sites/heartbleed/index.html", "Heartbleed leftover"),
        ("sites/heartbleed/index.html", "hb-lx", "checks", "Heartbleed leftover literacy", "Rotate leftover", "exploit (trap)", "sites/icebucket/index.html", "Ice Bucket leftover"),
        ("sites/icebucket/index.html", "ice-lx", "query", "Ice Bucket leftover literacy", "Nominate leftover", "celebrity dump (trap)", "sites/iphone/index.html", "iPhone 6 leftover"),
        ("sites/iphone/index.html", "ip6-lx", "checks", "iPhone 6 leftover literacy", "Pick leftover 6", "Watch (trap)", "sites/iphone/pay.html", "Apple Pay leftover"),
        ("sites/iphone/pay.html", "pay-lx", "checks", "Apple Pay leftover literacy", "Tap leftover", "live PAN (trap)", "sites/material/index.html", "Material leftover"),
        ("sites/material/index.html", "mat-lx", "checks", "Material leftover literacy", "Material leftover", "official mark (trap)", "sites/slack/index.html", "Slack leftover"),
        ("sites/slack/index.html", "sl-lx", "query", "Slack leftover literacy", "Join leftover", "live workspace (trap)", "sites/twitch/index.html", "Twitch leftover"),
        ("sites/twitch/index.html", "tw-lx", "query", "Twitch leftover literacy", "Ack leftover $970M", "Google-bought (trap)", "sites/whatsapp/index.html", "★ WhatsApp Install"),
        ("sites/playable/game.html", "tile-lx", "hops", "Tile Fold leftover literacy", "Fold leftover", "Flappy gold (trap)", "sites/whatsapp/index.html", "★ WhatsApp Install"),
    ]
    written = set()
    for path, suffix, kind, title, verb, trap, nxt, nlab, *rest in [
        *[(p, s, k, t, v, tr, n, l, b) for p, s, k, t, v, tr, n, l, b in all_rows],
    ]:
        body = rest[0] if rest else title
        official = OFFICIAL.get(path)
        lo_suf = OFFICIAL_LO.get(path, suffix)
        if path in CORES:
            core = CORES[path]
        else:
            core = (
                f'<p class="archive-residual" data-itt-capture-cite style="font-size:11px">[failed-final] {title} · no official brand pixels.</p>\n'
                f'<p class="crumb"><a href="{_rel(path, "pages/home.html")}">Starting Point</a> · leftover, not the chip</p>\n'
                f"<h1>{title.split(' —')[0]}</h1>\n<p>{body}</p>\n"
                f'<p class="honest">Leftover 2014. Completing this never writes <code>itt14-wa-install</code>.</p>\n'
            )
        html = wrap(path, title, core, official)
        if path == "sites/playable/famous.html":
            html = html.replace("</div>\n<script src=\"../../../../js/immersion-2014.js\">", famous_cabinets() + "</div>\n<script src=\"../../../../js/immersion-2014.js\">", 1)
        if path in POP:
            pid, pkey, ph, pverb, pnxt, pnlab, phon = POP[path]
            html += pop_block(path, pid, pkey, ph, pverb, pnxt, pnlab, phon)
        html += leftover_block(path, lo_suf, kind, verb, trap, nxt, nlab, f":{lo_suf}")
        html += leftover_block(path, lo_suf + "-d2", kind, verb, trap, nxt, nlab, f"-D2:{lo_suf}-d2")
        html += leftover_block(path, lo_suf + "-d4", kind, verb, trap, nxt, nlab, f"-D4:{lo_suf}-d4")
        html += fourx_block(path, lo_suf, kind, verb, nxt, nlab)
        html += "</body></html>\n"
        write(YEAR / path, html)
        written.add(path)
        for suf, field, minp in (
            (lo_suf, kind == "query", 2 if kind == "hops" else 0),
            (lo_suf + "-d2", kind == "query", 2 if kind == "hops" else 0),
            (lo_suf + "-d4", kind == "query", 2 if kind == "hops" else 0),
        ):
            lo_rows.append(
                {
                    "year": "2014",
                    "href": path,
                    "key": f"itt14-{suf}",
                    "suffix": suf,
                    "needPick": "" if kind == "hops" else "keep",
                    "minPick": minp,
                    "field": field,
                    "placeholder": verb.lower(),
                }
            )
        x2_rows.append(
            {
                "year": "2014",
                "path": f"/years/2014/{path}",
                "key": f"itt14-{lo_suf}",
                "kind": kind,
                "title": title,
                "next": f"/years/2014/{nxt}",
                "nextLabel": nlab,
            }
        )
    # official dests that were not in LEAN
    for path, suffix, kind, title, verb, trap, nxt, nlab in official_meta:
        if path in written:
            continue
        official = OFFICIAL[path]
        core = CORES[path]
        html = wrap(path, title, core, official)
        if path in POP:
            pid, pkey, ph, pverb, pnxt, pnlab, phon = POP[path]
            html += pop_block(path, pid, pkey, ph, pverb, pnxt, pnlab, phon)
        html += leftover_block(path, suffix, kind, verb, trap, nxt, nlab, f":{suffix}")
        html += leftover_block(path, suffix + "-d2", kind, verb, trap, nxt, nlab, f"-D2:{suffix}-d2")
        html += leftover_block(path, suffix + "-d4", kind, verb, trap, nxt, nlab, f"-D4:{suffix}-d4")
        html += fourx_block(path, suffix, kind, verb, nxt, nlab)
        html += "</body></html>\n"
        write(YEAR / path, html)
        for suf, field, minp in (
            (suffix, kind == "query", 2 if kind == "hops" else 0),
            (suffix + "-d2", kind == "query", 2 if kind == "hops" else 0),
            (suffix + "-d4", kind == "query", 2 if kind == "hops" else 0),
        ):
            lo_rows.append(
                {
                    "year": "2014",
                    "href": path,
                    "key": f"itt14-{suf}",
                    "suffix": suf,
                    "needPick": "" if kind == "hops" else "keep",
                    "minPick": minp,
                    "field": field,
                    "placeholder": verb.lower(),
                }
            )
        x2_rows.append(
            {
                "year": "2014",
                "path": f"/years/2014/{path}",
                "key": f"itt14-{suffix}",
                "kind": kind,
                "title": title,
                "next": f"/years/2014/{nxt}",
                "nextLabel": nlab,
            }
        )
    return lo_rows, x2_rows


def rooms_js(paths):
    lines = ",\n".join(f'    "{p}"' for p in sorted(set(paths)))
    cfg = (ROOT / "js/config/2014.js").read_text(encoding="utf-8")
    import re
    cfg = re.sub(r"var rooms = \[[\s\S]*?\];", f"var rooms = [\n{lines}\n  ];", cfg, count=1)
    (ROOT / "js/config/2014.js").write_text(cfg, encoding="utf-8")


def matrices(lo_rows, x2_rows):
    lo_path = ROOT / "e2e" / "leftover-official.matrix.json"
    lo = json.loads(lo_path.read_text(encoding="utf-8"))
    dests = [d for d in lo.get("dests", []) if str(d.get("year")) != "2014"]
    seen = set()
    for row in lo_rows:
        k = (row["year"], row["suffix"])
        if k in seen:
            continue
        seen.add(k)
        dests.append(row)
    lo["dests"] = dests
    lo_path.write_text(json.dumps(lo, indent=2) + "\n", encoding="utf-8")
    x2_path = ROOT / "e2e" / "2x-links.matrix.json"
    x2 = json.loads(x2_path.read_text(encoding="utf-8"))
    keep = [r for r in x2 if str(r.get("year")) != "2014"]
    seen2 = set()
    for row in x2_rows:
        k = (row["year"], row["key"], row["path"], row.get("next"))
        if k in seen2:
            continue
        seen2.add(k)
        keep.append(row)
    x2_path.write_text(json.dumps(keep, indent=2) + "\n", encoding="utf-8")
    print("lo 2014", sum(1 for d in dests if d["year"] == "2014"), "x2", sum(1 for r in keep if r["year"] == "2014"))


def main():
    pages()
    lo, x2 = dests()
    htmls = [str(p.relative_to(YEAR)) for p in YEAR.rglob("*.html")]
    rooms_js(htmls)
    matrices(lo, x2)
    print("2014 html", len(htmls), "dests", len([p for p in (YEAR / "sites").iterdir() if p.is_dir()]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
