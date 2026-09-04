#!/usr/bin/env python3
"""Generate years/2015 from-scratch tree (2011-class density). Run once from repo root."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2015"

OFFICIAL_SUFFIXES = {
    "periscope",
    "googlephotos",
    "win10",
    "applemusic",
    "edge",
    "watch",
    "snap-discover",
    "discord",
    "le",
    "game-blobrush",
}


def lo_panel(slug: str, next_href: str, next_label: str) -> str:
    if slug in OFFICIAL_SUFFIXES:
        raise SystemExit(f"leftover slug collides with official: {slug}")
    return f"""<section data-lo-panel="1" data-itt-year="2015" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2×</b> · 2015 leftover · {slug} · not the chip · incomplete never writes · <code>itt15-{slug}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty / 0 ticks never write.</label>
<p>
 <button type="button" data-lo-pick="keep">2015 leftover path</button>
 <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>
</p>
<p>
 <button type="button" data-lo-trap>This leftover is the 2015 star (trap)</button>
 <button type="button" data-lo-save data-lo-key="{slug}" data-lo-need-pick="keep">Save leftover</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt15-{slug}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</section>
<section data-lo-panel="1" data-itt-year="2015" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2×</b> · second path · {slug}-d2 · <code>itt15-{slug}-d2</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Second leftover path. Not the star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Incomplete never writes.</label>
<p>
 <button type="button" data-lo-pick="keep">2015 leftover path</button>
 <button type="button" data-lo-pick="trap">Neighbor year (trap)</button>
</p>
<p>
 <button type="button" data-lo-trap>Star trap</button>
 <button type="button" data-lo-save data-lo-key="{slug}-d2" data-lo-need-pick="keep">Save leftover d2</button>
</p>
<p data-lo-status></p>
</section>"""


def also() -> str:
    return """<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2015" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 <a href="../../pages/home.html">Starting Point</a> ·
 <a href="../../pages/map.html">Year flow map</a> ·
 <a href="../../pages/about.html">About 2015</a> ·
 <a href="../periscope/index.html">★ Periscope</a> ·
 <a href="../googlephotos/index.html">Google Photos</a> ·
 <a href="../windows10/index.html">Windows 10</a> ·
 <a href="../applemusic/index.html">Apple Music</a> ·
 <a href="../playable/index.html">2015 playables</a>
</p></nav>"""


def page(title: str, body: str, extra_head: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2015.css">
{extra_head}
</head>
<body bgcolor="#1b2838" text="#eee" link="#ffcdd2" vlink="#ef9a9a">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
{also()}
<script src="../../../../js/immersion-2015.js"></script>
</body>
</html>
"""


def leftover_dest(folder: str, file: str, title: str, copy: str, slug: str, nxt: str, nxt_label: str) -> None:
    dest = Y / "sites" / folder
    dest.mkdir(parents=True, exist_ok=True)
    crumb = f'<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="../../pages/about.html">About 2015</a> · <a href="../periscope/index.html">★ Periscope</a></p>'
    body = f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{crumb}
<h1>{title}</h1>
<p>{copy}</p>
<p class="itt-pixel-failed">[failed-final] period wordmark · never invent the mark</p>
<p><a href="{nxt}">{nxt_label}</a></p>
{lo_panel(slug, nxt, nxt_label)}
</div>"""
    (dest / file).write_text(page(title + " — 2015", body), encoding="utf-8")


def write_official() -> None:
    dests = {
        "periscope/index.html": page(
            "Periscope — Go LIVE — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="watch.html">Watch</a></p>
<h1>Go LIVE</h1>
<p>26 Mar 2015. Title required. Empty title never writes. Twitter-owned, separate app. Apple iPhone App of the Year 9 Dec. Not Meerkat. Not Stories.</p>
<p class="itt-pixel-failed">[failed-final] periscope mark</p>
<p><input data-peri-title maxlength="80" placeholder="Name this broadcast" style="width:96%"></p>
<p><button type="button" data-peri-live>Go LIVE</button> <span data-peri-status></span></p>
<p data-peri-viewers></p>
<div data-peri-live-well hidden>
 <p>LIVE · <b data-peri-live-title></b> · <span data-peri-clock>0:00</span></p>
</div>
<p hidden data-next-flow data-next-when-key="itt15-periscope"><b>Next:</b> <a href="../googlephotos/index.html">Dump the camera roll</a></p>
<p data-prev-flow><a href="../../pages/about.html">← About 2015</a></p>
{lo_panel("peri-d2", "watch.html", "Watch your title")}
</div>""",
        ),
        "periscope/watch.html": page(
            "Periscope — Watch — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="index.html">← Go LIVE</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>Someone else's eyes</h1>
<p>Replay up to 24 hours. Hearts. If you went LIVE, this is <b>your</b> title. Does not replace Go LIVE.</p>
<p>Replay: <b data-peri-replay-title>a leftover rooftop</b></p>
<div data-peri-heart-well tabindex="0" style="padding:24px;border:1px solid #e53935;text-align:center">Tap for hearts · <span data-peri-hearts>0</span></div>
<p data-peri-watch-status></p>
<p><a href="../googlephotos/index.html">Next · Photos locker</a></p>
{lo_panel("peri-d3", "../googlephotos/index.html", "Photos")}
</div>""",
        ),
        "googlephotos/index.html": page(
            "Google Photos — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="library.html">Library</a></p>
<h1>Unlimited high quality</h1>
<p>28 May 2015 I/O. Free locker ~16MP / 1080p. Originals count against 15 GB. Pick at least one still.</p>
<p>
 <button type="button" data-photo-pick="beach">beach</button>
 <button type="button" data-photo-pick="dog">dog</button>
 <button type="button" data-photo-pick="food">food</button>
</p>
<p>
 <label><input type="radio" name="gpq" data-gp-quality="hq" checked> High quality</label>
 <label><input type="radio" name="gpq" data-gp-quality="original"> Original (counts)</label>
</p>
<p><button type="button" data-gp-backup>Backup</button> <span data-gp-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-googlephotos"><b>Next:</b> <a href="../windows10/index.html">Get Windows 10</a></p>
{lo_panel("photos-lx", "library.html", "Search the locker")}
</div>""",
        ),
        "googlephotos/library.html": page(
            "Google Photos library — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="index.html">← Backup</a></p>
<h1>Search the locker</h1>
<p>Try <button type="button" data-gp-hint="beach">beach</button>.</p>
<p><input data-gp-search placeholder="beach"> <button type="button" data-gp-search-go>Search</button></p>
<p data-gp-hits></p>
<p><a href="../windows10/index.html">Windows 10</a></p>
{lo_panel("photos-d2", "../windows10/index.html", "Win10")}
</div>""",
        ),
        "windows10/index.html": page(
            "Windows 10 — Get Windows 10 — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="upgrade.html">Upgrade notes</a></p>
<h1>Get Windows 10</h1>
<p>29 Jul 2015. Free for eligible Win7 / 8.1. GWX tray. This year still boots <b>Win7 residual</b>. Edge is a product room, not Chromium.</p>
<label style="display:block"><input type="checkbox" data-win10-req> Free upgrade for eligible Win7 / 8.1.</label>
<label style="display:block"><input type="checkbox" data-win10-req> The museum chrome stays Win7 residual.</label>
<p><button type="button" data-win10-reserve>Reserve</button> <span data-win10-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-win10"><b>Next:</b> <a href="../applemusic/index.html">Apple Music</a></p>
{lo_panel("win10-lx", "upgrade.html", "Upgrade notes")}
</div>""",
        ),
        "windows10/upgrade.html": page(
            "Windows 10 upgrade notes — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="index.html">← Reserve</a></p>
<h1>Start menu is back</h1>
<p>Not Chromium Edge. Not the year chrome.</p>
<p><a href="../applemusic/index.html">Apple Music</a></p>
{lo_panel("win10-d2", "../applemusic/index.html", "Music")}
</div>""",
        ),
        "applemusic/index.html": page(
            "Apple Music — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="beats1.html">Beats 1</a></p>
<h1>Three free months</h1>
<p>30 Jun 2015. Then $9.99. Family $14.99 / six. Auto-renew unless you cancel.</p>
<p><input data-am-account placeholder="account name" style="width:60%"></p>
<p><button type="button" data-am-trial>Start trial</button> <span data-am-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-applemusic"><b>Next:</b> <a href="../edge/index.html">Edge Spartan</a></p>
{lo_panel("music-lx", "beats1.html", "Beats 1")}
</div>""",
        ),
        "applemusic/beats1.html": page(
            "Beats 1 — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="index.html">← Trial</a></p>
<h1>Same station, 100 countries</h1>
<p>
 <button type="button" data-beats-desk="LA">Zane · LA</button>
 <button type="button" data-beats-desk="NY">Ebro · NY</button>
 <button type="button" data-beats-desk="London">Julie · London</button>
</p>
<p data-beats-status></p>
<p><a href="../edge/index.html">Edge</a></p>
{lo_panel("music-d2", "../edge/index.html", "Edge")}
</div>""",
        ),
        "edge/index.html": page(
            "Microsoft Edge — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Microsoft Edge</h1>
<p>Press name is Edge. Museum lock: Spartan / EdgeHTML. <b>Not Chromium</b> (2020).</p>
<label style="display:block"><input type="checkbox" data-edge-req> Spartan / EdgeHTML · not Chromium.</label>
<p><button type="button" data-edge-prefer>Prefer Edge</button> <span data-edge-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-edge"><b>Next:</b> <a href="../apple/watch.html">Watch leftover</a></p>
{lo_panel("edge-lx", "../apple/watch.html", "Watch leftover")}
</div>""",
        ),
        "apple/watch.html": page(
            "Apple Watch leftover — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="faces.html">Faces</a> · <a href="pair.html">Pair</a></p>
<h1>Watch ships · not the chip</h1>
<p>24 Apr 2015. Sport $349 / $399. iPhone 5+ / iOS 8.2. Face + band required.</p>
<p>
 <select data-watch-face><option value="">face</option><option value="astronomy">Astronomy</option><option value="chrono">Chronograph</option></select>
 <select data-watch-band><option value="">band</option><option value="sport">Sport</option><option value="milanese">Milanese</option></select>
</p>
<label style="display:block"><input type="checkbox" data-watch-req> Shipped 24 Apr 2015. Leftover, not the star.</label>
<p><button type="button" data-watch-save>Pair leftover</button> <span data-watch-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-watch"><b>Next:</b> <a href="../snapchat/discover.html">Snap Discover</a></p>
{lo_panel("watch-lx", "../snapchat/discover.html", "Discover")}
</div>""",
        ),
        "apple/faces.html": page(
            "Watch faces leftover — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="watch.html">← Watch</a></p>
<h1>Faces leftover</h1>
<p>Not the chip.</p>
{lo_panel("watch-d2", "pair.html", "Pair")}
</div>""",
        ),
        "apple/pair.html": page(
            "Watch pair leftover — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="watch.html">← Watch</a></p>
<h1>Pair leftover</h1>
<p><a href="../snapchat/discover.html">Discover</a></p>
{lo_panel("watch-d3", "../snapchat/discover.html", "Discover")}
</div>""",
        ),
        "snapchat/discover.html": page(
            "Snap Discover — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="index.html">Snap leftover</a></p>
<h1>This is not social media</h1>
<p>27 Jan 2015. 24-hour editions. Not Instagram Stories.</p>
<p>
 <button type="button" data-discover-tile="CNN">CNN</button>
 <button type="button" data-discover-tile="Vice">Vice</button>
 <button type="button" data-discover-tile="ESPN">ESPN</button>
</p>
<p data-discover-status></p>
<p hidden data-next-flow data-next-when-key="itt15-snap-discover"><b>Next:</b> <a href="../discord/index.html">Discord</a></p>
{lo_panel("disc-lx", "../discord/index.html", "Discord")}
</div>""",
        ),
        "discord/index.html": page(
            "Discord — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>discordapp.com</h1>
<p>May 2015 public seed. Name a server. Empty never writes. Not 2020 mass.</p>
<p><input data-dc-server placeholder="#general leftover"></p>
<p><button type="button" data-dc-join>Join leftover</button> <span data-dc-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-discord"><b>Next:</b> <a href="../letsencrypt/index.html">Let's Encrypt</a></p>
{lo_panel("discapp-lx", "../letsencrypt/index.html", "Let's Encrypt")}
</div>""",
        ),
        "letsencrypt/index.html": page(
            "Let's Encrypt — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>HTTPS by default</h1>
<p>3 Dec 2015 public beta. 26,000 certs in limited beta. No real ACME. Type a hostname.</p>
<p><input data-le-domain placeholder="example.com"></p>
<p><button type="button" data-le-request>Request leftover cert</button> <span data-le-status></span></p>
<p hidden data-next-flow data-next-when-key="itt15-le"><b>Next:</b> <a href="../playable/game.html">Blob Rush</a></p>
{lo_panel("le-lx", "../playable/game.html", "Blob Rush")}
</div>""",
        ),
        "ios9/blockers.html": page(
            "iOS 9 content blockers — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Settings → Safari → Content Blockers</h1>
<p>16 Sep 2015. Enable one leftover blocker.</p>
<label style="display:block"><input type="checkbox" data-block-req> Enable one blocker (theater).</label>
<p><button type="button" data-block-enable>Enable leftover</button> <span data-block-status></span></p>
{lo_panel("block-lx", "../letsencrypt/index.html", "Let's Encrypt")}
</div>""",
        ),
        "echo/index.html": page(
            "Amazon Echo leftover — 2015",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>$179.99 · ships 14 Jul</h1>
<p>Mass order 23 Jun 2015. Reverse of the 2014 invite.</p>
<label style="display:block"><input type="checkbox" data-echo-req> $179.99 · ships 14 Jul · not the 2014 invite.</label>
<p><button type="button" data-echo-order>Order leftover</button> <span data-echo-status></span></p>
{lo_panel("echo-lx", "../waweb/index.html", "WhatsApp Web")}
</div>""",
        ),
    }
    for rel, html in dests.items():
        p = Y / "sites" / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(html, encoding="utf-8")


def write_pages() -> None:
    pages = Y / "pages"
    (pages / "error").mkdir(parents=True, exist_ok=True)
    (pages / "home.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<title>Starting Point — 2015</title>
<link rel="stylesheet" href="../../../css/period-2015.css">
</head>
<body bgcolor="#1b2838" text="#eee">
<div id="itt-year-start" data-itt-year="2015"></div>
<script src="../../../js/immersion-2015.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "about.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<title>About 2015</title>
<link rel="stylesheet" href="../../../css/period-2015.css">
</head>
<body bgcolor="#1b2838" text="#eee" link="#ffcdd2">
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a> · <a href="map.html">Map</a></p>
<h1>About 2015</h1>
<p><b>The phone goes live. The photo roll leaves the device. Microsoft gives the desktop away. The hostname count dips after one billion.</b></p>
<p>Live Stats <b>June 2015</b> websites <b>863,105,652 (−11%)</b> · users <b>3,185,996,155</b> (3.7 / site). 1B first-cross Sep 2014 · dip · restabilize Mar 2016. Netcraft June matches the hostname cell. Netcraft January 876,812,666 is a <b>different month</b>.</p>
<p><b>Bans:</b> Instagram Stories · Facebook Reactions worldwide · Pokémon GO · slither.io · Chromium Edge · WhatsApp default E2E · Oculus CV1 retail · TikTok · Meta · FB Live as your Go LIVE · Watch as the chip.</p>
<p>Pew spring 2015: nearly two-thirds of US adults own a smartphone. Do not stamp 64% as year-round.</p>
<p><a href="../sites/periscope/index.html">★ Periscope Go LIVE</a></p>
</div>
<script src="../../../js/immersion-2015.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "map.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<title>2015 flow map</title>
<link rel="stylesheet" href="../../../css/period-2015.css">
</head>
<body bgcolor="#1b2838" text="#eee" link="#ffcdd2">
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a> · <a href="about.html">About</a></p>
<h1>2015 UX flow map</h1>
<ol>
 <li><a href="../sites/periscope/index.html">Periscope Go LIVE</a></li>
 <li><a href="../sites/googlephotos/index.html">Google Photos</a></li>
 <li><a href="../sites/windows10/index.html">Windows 10</a></li>
 <li><a href="../sites/applemusic/index.html">Apple Music</a></li>
 <li><a href="../sites/edge/index.html">Edge Spartan</a></li>
 <li><a href="../sites/apple/watch.html">Watch leftover</a></li>
 <li><a href="../sites/snapchat/discover.html">Snap Discover</a></li>
 <li><a href="../sites/discord/index.html">Discord</a></li>
 <li><a href="../sites/letsencrypt/index.html">Let's Encrypt</a></li>
 <li><a href="../sites/playable/game.html">Blob Rush</a></li>
</ol>
</div>
<script src="../../../js/immersion-2015.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (pages / "whats-new.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head><meta charset="utf-8"><title>What's new — 2015</title></head>
<body bgcolor="#1b2838" text="#eee">
<p><a href="home.html">Starting Point</a></p>
<p>2015 · Go LIVE · free locker · Get Windows 10 · no Stories.</p>
<script src="../../../js/immersion-2015.js"></script>
</body></html>
""",
        encoding="utf-8",
    )
    for name, title in (("404.html", "404"), ("unreachable.html", "Unreachable")):
        (pages / "error" / name).write_text(
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2015"><head><meta charset="utf-8"><title>{title} — 2015</title></head>
<body bgcolor="#1b2838" text="#eee"><p>{title}.</p><p><a href="../home.html">Starting Point</a></p>
<script src="../../../../js/immersion-2015.js"></script></body></html>
""",
            encoding="utf-8",
        )


def write_playable() -> None:
    dest = Y / "sites" / "playable"
    dest.mkdir(parents=True, exist_ok=True)
    (dest / "game.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<title>Blob Rush — 2015</title>
<link rel="stylesheet" href="../../../../css/period-2015.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#1b2838" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2015" data-game-id="blobrush" style="max-width:440px;margin:12px auto;font-family:Tahoma,Arial,sans-serif">
 <h1>Blob Rush — 2015</h1>
 <p class="yg-honesty">agar.io <b>class</b> 2015 tab mania. Original cells — not their art. slither.io is <b>2016</b>. Star stays Periscope.</p>
 <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
 <p><button type="button" data-game-start>New Game</button> <button type="button" data-blob-split>Split</button></p>
 <canvas id="game-canvas" width="400" height="320" style="border:1px solid #444;background:#0b1a0b"></canvas>
 <p data-itt-action-status>New Game. Incomplete never writes.</p>
 <p hidden data-next-flow data-next-when-key="itt15-game-blobrush"><b>Next:</b> <a href="../periscope/index.html">★ Periscope</a></p>
 <p><a href="index.html">← Playables</a> · <a href="famous.html">Famous leftover</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-2015-blobrush.js"></script>
{lo_panel("blob-lx", "../periscope/index.html", "Periscope")}
<script src="../../../../js/immersion-2015.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    (dest / "index.html").write_text(
        page(
            "2015 playables",
            f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
<h1>2015 playables</h1>
<p><a href="game.html">Blob Rush</a> · <a href="famous.html">Famous leftover</a></p>
<p><a href="game-2.html">game-2</a> · <a href="extra-a.html">extra-a</a> · <a href="more-a.html">more-a</a></p>
{lo_panel("play-lx", "game.html", "Blob Rush")}
</div>""",
        ),
        encoding="utf-8",
    )
    (dest / "famous.html").write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head><meta charset="utf-8"><title>Famous leftover — 2015</title></head>
<body bgcolor="#1b2838" text="#eee">
<p><a href="index.html">← Playables</a></p>
<div data-famous="pong">Table Tennis leftover · not Blob Rush</div>
<div data-famous="snake">Pocket Snake leftover · not slither</div>
{lo_panel("fam-lx", "game.html", "Blob Rush")}
<script src="../../../../js/immersion-2015.js"></script>
</body></html>
""",
        encoding="utf-8",
    )
    extras = {
        "extra-a.html": ("Periscope tap leftover", "xa-lx"),
        "extra-b.html": ("Photos locker leftover", "xb-lx"),
        "extra-c.html": ("Split Drill leftover", "xc-lx"),
        "extra-d.html": ("Tray leftover", "xd-lx"),
        "extra-e.html": ("Heart leftover", "xe-lx"),
        "extra-f.html": ("GWX leftover game", "xf-lx"),
        "extra-g.html": ("Beats leftover game", "xg-lx"),
        "extra-h.html": ("Discover leftover game", "xh-lx"),
        "extra-i.html": ("LE leftover game", "xi-lx"),
        "more-a.html": ("Mercy Run leftover", "ma-lx"),
        "more-b.html": ("Kickoff leftover", "mb-lx"),
        "more-c.html": ("More leftover c", "mc-lx"),
        "more-d.html": ("More leftover d", "md-lx"),
        "game-2.html": ("Minute leftover 2", "g2-lx"),
        "game-3.html": ("Minute leftover 3", "g3-lx"),
        "game-4.html": ("Minute leftover 4", "g4-lx"),
        "game-5.html": ("Minute leftover 5", "g5-lx"),
    }
    for fn, (title, slug) in extras.items():
        gid = slug.replace("-lx", "")
        (dest / fn).write_text(
            page(
                title + " — 2015",
                f"""<div class="itt-year-game" data-year-game data-year="2015" data-game-id="{gid}" data-minute-extra data-pack-game style="max-width:46em;margin:12px auto">
<h1>{title}</h1>
<p>Empty Finish never writes. Star stays Periscope. slither is 2016.</p>
<p><button type="button" data-game-start>Start</button>
<button type="button" data-mx-good>Good leftover</button>
<button type="button" data-mx-finish data-pack-finish>Finish leftover</button></p>
<p><a href="game.html">Blob Rush</a></p>
{lo_panel(slug, "game.html", "Blob Rush")}
</div>""",
            ),
            encoding="utf-8",
        )


def main() -> None:
    if Y.exists():
        raise SystemExit("years/2015 already exists")
    Y.mkdir(parents=True)
    (Y / "index.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2015</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2015");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2015.js?v=20260830ui"></script>
<script src="../../js/browser-2015.js?v=20260830ui"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    write_pages()
    write_official()
    leftovers = [
        ("waweb", "WhatsApp Web leftover", "21 Jan 2015. Chrome QR mirror. Phone must stay on. Not iOS day one. Not the 2014 install star.", "ww-lx", "../titleii/index.html", "Title II"),
        ("meerkat", "Meerkat leftover", "SXSW peak. Twitter cut the graph. Not a second Go LIVE.", "meer-lx", "../periscope/index.html", "★ Periscope"),
        ("titleii", "Title II leftover", "26 Feb 2015. FCC 3–2. Civic leftover. Not a game. Repeal is 2017.", "t2-lx", "../swiftoss/index.html", "Swift OSS"),
        ("swiftoss", "Swift OSS leftover", "3 Dec 2015 Apache 2.0. Same day as Let's Encrypt. Not the cert room.", "sw-lx", "../instant/index.html", "Instant Articles"),
        ("instant", "Instant Articles leftover", "May 2015. Story opens inside Facebook. AMP SERP is 2016.", "ia-lx", "../agario/index.html", "Agar.io site"),
        ("agario", "Agar.io site leftover", "2015 tab habit. Year game is still Blob Rush. slither is 2016.", "agar-lx", "../secret/index.html", "Secret"),
        ("secret", "Secret leftover", "2015 wind-down. Whisper stays. No dump spectacle.", "sec-lx", "../periscope/index.html", "★ Periscope"),
        ("fblive", "Facebook Live leftover", "5 Aug 2015 Mentions. Celebs / verified Pages only. Not your Go LIVE.", "fblive-lx", "../periscope/index.html", "★ Periscope"),
        ("instagram", "Instagram leftover", "2015 feed. Stories are 2016.", "ig-lx", "../periscope/index.html", "★ Periscope"),
        ("spotify", "Spotify leftover", "2015 residual. Not 2011 gold.", "spot-lx", "../netflix/index.html", "Netflix leftover"),
        ("netflix", "Netflix leftover", "2015 residual. Not Disney+.", "nf-lx", "../youtube/index.html", "YouTube leftover"),
        ("discordabout", "Discord leftover path", "Literacy leftover. Does not write official Discord.", "dc-lx", "../discord/index.html", "Discord"),
        ("leabout", "Let's Encrypt leftover path", "Literacy leftover. Does not write official LE.", "le-d2", "../letsencrypt/index.html", "Let's Encrypt"),
        ("vine", "Vine leftover", "Still alive in 2015. Gone is 2016/17.", "vine-lx", "../youtube/index.html", "YouTube"),
        ("amppage", "AMP announce leftover", "Oct 2015 announce. SERP habit is 2016.", "amp-lx", "../letsencrypt/index.html", "Let's Encrypt"),
        ("musicabout", "Music leftover path", "Does not write official Music.", "am-lx", "../applemusic/index.html", "Apple Music"),
        ("edgeabout", "Edge leftover path", "Does not write official Edge.", "edge-d2", "../edge/index.html", "Edge"),
        ("win10get", "GWX tray leftover", "Tray icon leftover. Does not write official Win10.", "gwx-lx", "../windows10/index.html", "Windows 10"),
        ("w10about", "Win10 leftover path", "Does not write official Win10.", "w10-lx", "../windows10/index.html", "Windows 10"),
        ("photosabout", "Photos leftover path", "Does not write official Photos.", "gp-lx", "../googlephotos/index.html", "Photos"),
        ("periabout", "Periscope leftover path", "Does not write official Go LIVE.", "peri-lx", "../periscope/index.html", "★ Periscope"),
        ("ytgaming", "YouTube Gaming leftover", "2015 YouTube Gaming leftover.", "ytg-lx", "../youtube/index.html", "YouTube"),
        ("adblock", "Content blocker leftover", "iOS 9 Safari blockers leftover path.", "adblock-lx", "../ios9/blockers.html", "Blockers"),
        ("snapchat", "Snapchat leftover", "Discover is official. This path is leftover.", "snap-lx", "../snapchat/discover.html", "Discover"),
        ("google", "Google leftover", "2015 may have a google dest. Chrome habit starts this year.", "g-lx", "../chrome/index.html", "Chrome habit"),
        ("youtube", "YouTube leftover", "Mass residual. Not the star.", "yt-lx", "../facebook/index.html", "Facebook leftover"),
        ("facebook", "Facebook leftover", "2015 feed. Reactions are 2016.", "fb-lx", "../twitter/index.html", "Twitter leftover"),
        ("twitter", "Twitter leftover", "Separate from Periscope.", "tw-lx", "../periscope/index.html", "★ Periscope"),
        ("amazon", "Amazon leftover", "Mass residual.", "az-lx", "../wikipedia/index.html", "Wikipedia leftover"),
        ("wikipedia", "Wikipedia leftover", "Mass residual.", "wk-lx", "../yahoo/index.html", "Yahoo leftover"),
        ("yahoo", "Yahoo leftover", "Still loud in 2015.", "yh-lx", "../bing/index.html", "Bing leftover"),
        ("bing", "Bing leftover", "Residual.", "bing-lx", "../reddit/index.html", "Reddit leftover"),
        ("reddit", "Reddit leftover", "Residual.", "rd-lx", "../pinterest/index.html", "Pinterest leftover"),
        ("pinterest", "Pinterest leftover", "Residual.", "pin-lx", "../linkedin/index.html", "LinkedIn leftover"),
        ("linkedin", "LinkedIn leftover", "Residual.", "li-lx", "../paypal/index.html", "PayPal leftover"),
        ("paypal", "PayPal leftover", "Residual.", "pp-lx", "../ebay/index.html", "eBay leftover"),
        ("ebay", "eBay leftover", "Residual.", "eb-lx", "../buzzfeed/index.html", "BuzzFeed leftover"),
        ("buzzfeed", "BuzzFeed leftover", "Quantcast US 2015 mass.", "bz-lx", "../yelp/index.html", "Yelp leftover"),
        ("yelp", "Yelp leftover", "Quantcast US 2015 mass.", "yelp-lx", "../wordpress/index.html", "WordPress leftover"),
        ("wordpress", "WordPress leftover", "Residual.", "wp-lx", "../blogger/index.html", "Blogger leftover"),
        ("blogger", "Blogger leftover", "Residual.", "bl-lx", "../tumblr/index.html", "Tumblr leftover"),
        ("tumblr", "Tumblr leftover", "Residual.", "tb-lx", "../gmail/index.html", "Gmail leftover"),
        ("gmail", "Gmail leftover", "Residual.", "gm-lx", "../chrome/index.html", "Chrome habit"),
        ("chrome", "Chrome habit leftover", "Chrome habit starts 2015. Not Chromium Edge.", "ch-lx", "../msn/index.html", "MSN leftover"),
        ("msn", "MSN leftover", "Quantcast US 2015 mass.", "msn-lx", "../github/index.html", "GitHub leftover"),
        ("github", "GitHub leftover", "Residual. Not 2008 gold.", "gh-lx", "../dropbox/index.html", "Dropbox leftover"),
        ("dropbox", "Dropbox leftover", "Residual.", "db-lx", "../slack/index.html", "Slack leftover"),
        ("slack", "Slack leftover", "2014 continuity leftover.", "sl-lx", "../twitch/index.html", "Twitch leftover"),
        ("twitch", "Twitch leftover", "Residual.", "twch-lx", "../uber/index.html", "Uber leftover"),
        ("uber", "Uber leftover", "Residual.", "uber-lx", "../airbnb/index.html", "Airbnb leftover"),
        ("airbnb", "Airbnb leftover", "Residual.", "abnb-lx", "../tinder/index.html", "Tinder leftover"),
        ("tinder", "Tinder leftover", "Residual.", "td-lx", "../messenger/index.html", "Messenger leftover"),
        ("messenger", "Messenger leftover", "F8 2015 business. Not 2016 mass bots.", "msg-lx", "../hbonow/index.html", "HBO Now leftover"),
        ("hbonow", "HBO Now leftover", "2015 paid-video seed.", "hbo-lx", "../waabout/index.html", "WhatsApp archive"),
        ("waabout", "WhatsApp 2014 archive", "Deal / install is last year. Never writes itt14-wa-install.", "wa-arch", "../waweb/index.html", "WhatsApp Web"),
        ("nyt", "NYT leftover", "Residual press.", "nyt-lx", "../cnn/index.html", "CNN leftover"),
        ("cnn", "CNN leftover", "Residual press.", "cnn-lx", "../pages/home.html", "Starting Point"),
    ]
    for folder, title, copy, slug, nxt, lab in leftovers:
        leftover_dest(folder, "index.html", title, copy, slug, nxt, lab)
    write_playable()
    print("wrote", Y)


if __name__ == "__main__":
    main()
