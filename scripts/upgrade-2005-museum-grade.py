#!/usr/bin/env python3
"""Upgrade 2005 from leftover plaques to dest-by-dest freeze machines.

Official dests are hops/checks/query product rooms, not Type leftover plaques.
Pack A/B/C 120 writers use freeze keys. Star stays itt05-yt-uploads.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from itt_leftover_dest import append_matrix_row, write_matrix  # noqa: E402

Y = ROOT / "years" / "2005"


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text, encoding="utf-8")


def dest_wrap(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2005.css">
</head>
<body bgcolor="#ffffff" text="#111111" link="#003399" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-2005-room" style="max-width:48em;margin:16px auto;font-family:Arial,Verdana,sans-serif;font-size:13px;line-height:1.45">
{body}
</div>
<script src="../../../../js/immersion-2005.js"></script>
</body>
</html>
"""


def hops(key: str, title: str, life: str, hop_a: tuple[str, str], hop_b: tuple[str, str], trap: str, nxt: str, nl: str, extra: str = "") -> str:
    return f"""
<p class="itt-pixel-failed">[failed-final]</p>
<h1>{title}</h1>
<p>{life}</p>
{extra}
<div data-lo-panel="1" data-itt-year="2005" class="itt-2005-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">2005 leftover machine · incomplete never writes · not dest-field</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p>
 <button type="button" data-lo-pick="{hop_a[0]}">{hop_a[1]}</button>
 <button type="button" data-lo-pick="{hop_b[0]}">{hop_b[1]}</button>
</p>
<p><label><input type="checkbox" data-lo-req> Leftover 2005 · not the upload chip.</label></p>
<p><label><input type="checkbox" data-lo-req> 0 hops / 1 hop / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}" data-lo-min-pick="2">Hop leftover</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{key}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def checks(key: str, title: str, life: str, tick_a: str, tick_b: str, trap: str, nxt: str, nl: str, extra: str = "") -> str:
    return f"""
<p class="itt-pixel-failed">[failed-final]</p>
<h1>{title}</h1>
<p>{life}</p>
{extra}
<div data-lo-panel="1" data-itt-year="2005" class="itt-2005-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">2005 leftover machine · incomplete never writes · not dest-field</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p><label><input type="checkbox" data-lo-req> {tick_a}</label></p>
<p><label><input type="checkbox" data-lo-req> {tick_b}</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}">Ack leftover</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{key}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def query(key: str, title: str, life: str, ph: str, tick: str, trap: str, nxt: str, nl: str, extra: str = "") -> str:
    return f"""
<p class="itt-pixel-failed">[failed-final]</p>
<h1>{title}</h1>
<p>{life}</p>
{extra}
<div data-lo-panel="1" data-itt-year="2005" class="itt-2005-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">2005 leftover machine · incomplete never writes · not dest-field</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p><label>Leftover note<br><input type="text" data-lo-field maxlength="80" placeholder="{ph}" autocomplete="off"></label></p>
<p><label><input type="checkbox" data-lo-req> {tick}</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}">Type leftover</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{key}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def crumb(*pairs: tuple[str, str]) -> str:
    return "<p>" + " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in pairs) + "</p>"


def strip_lo(html: str) -> str:
    return re.sub(
        r'<div data-lo-panel="1"[^>]*>.*?</div>\s*',
        "",
        html,
        flags=re.S,
    )


def inject_machine(path: Path, machine: str) -> None:
    if not path.exists():
        write(path, dest_wrap(path.parent.name + " leftover — 2005", machine))
        return
    t = path.read_text(encoding="utf-8", errors="replace")
    t = strip_lo(t)
    if re.search(r'<script[^>]+immersion-2005\.js', t):
        t = re.sub(
            r'(<script[^>]+immersion-2005\.js[^>]*>\s*</script>)',
            machine + "\n\\1",
            t,
            count=1,
        )
    elif "</body>" in t:
        t = t.replace("</body>", machine + "\n</body>", 1)
    else:
        t += machine
    path.write_text(t, encoding="utf-8")


def official_dests() -> None:
    # Gold upload: keep machine, strip leftover plaque
    up = Y / "sites" / "youtube" / "upload.html"
    t = up.read_text(encoding="utf-8")
    t = strip_lo(t)
    up.write_text(t, encoding="utf-8")

    write(
        Y / "sites" / "maps" / "index.html",
        dest_wrap(
            "Google Maps leftover — 8 Feb 2005",
            crumb(("../../pages/home.html", "Starting Point"), ("../youtube/upload.html", "★ Upload"), ("../pandora/index.html", "Pandora leftover"))
            + hops(
                "maps",
                "Google Maps leftover",
                "8 Feb 2005 · Bret Taylor · Official Google Blog. “hotels near LAX.” Click-and-drag, no wait for a new image. Maps API is 29 Jun leftover. Street View is <b>2007</b> — that button never writes.",
                ("drag", "Drag leftover"),
                ("hotels", "Hotels near LAX leftover"),
                "Open Street View (trap)",
                "../pandora/index.html",
                "Pandora leftover",
                extra="""
<form data-maps-search action="#">
<label>What <input name="what" size="14" placeholder="hotels"></label>
<label>Where <input name="where" size="18" placeholder="LAX"></label>
<button type="submit">Search leftover</button>
</form>
<div data-maps-canvas style="height:160px;background:#cde;border:1px solid #669;margin:8px 0;position:relative">
<button type="button" data-maps-zoom="in">+</button>
<button type="button" data-maps-zoom="out">−</button>
<button type="button" data-maps-pan="n">N</button>
<button type="button" data-maps-pan="s">S</button>
<button type="button" data-maps-pan="w">W</button>
<button type="button" data-maps-pan="e">E</button>
<div data-maps-status>Drag leftover · no live tiles · no Street View</div>
</div>
<p><a href="mashups.html">Mashups leftover</a> · <a href="about.html">About Maps leftover</a> · <a href="../housingmaps/index.html">HousingMaps leftover</a></p>
""",
            )
            + hops("maps-lx", "Maps leftover two views", "Second path · 8 Feb theater · not the official write if you skip hops.", ("map", "Map leftover"), ("sat", "Satellite leftover"), "Pegman is 2005 (trap)", "../pandora/index.html", "Pandora leftover")
            + query("maps-lax", "Maps hotels near LAX leftover", "Google Blog leftover query. Not Street View.", "hotels near LAX", "8 Feb 2005 leftover", "Street View (trap)", "../pandora/index.html", "Pandora leftover"),
        ),
    )
    write(
        Y / "sites" / "maps" / "about.html",
        dest_wrap(
            "Google Maps leftover — About",
            crumb(("index.html", "Maps leftover"), ("../ajax/index.html", "Ajax leftover"))
            + checks("maps-nsv", "No-Street-View leftover", "Street View is May 2007. This dest is Feb 2005 drag.", "Street View is 2007 leftover", "This room is 8 Feb drag leftover", "Street View launched Feb 2005 (trap)", "index.html", "Maps leftover")
            + query("maps-api", "Maps API leftover — 29 Jun 2005", "Free JS API. Cites HousingMaps. Logo + link-back leftover.", "API leftover", "29 Jun 2005 leftover", "This is Street View (trap)", "../housingmaps/index.html", "HousingMaps leftover"),
        ),
    )
    write(
        Y / "sites" / "pandora" / "index.html",
        dest_wrap(
            "Pandora leftover — 20 Aug 2005",
            crumb(("../../pages/home.html", "Starting Point"), ("../maps/index.html", "Maps leftover"), ("../housingmaps/index.html", "HousingMaps leftover"))
            + query(
                "pandora",
                "Pandora leftover · not the chip",
                "TechCrunch 20 Aug 2005. Savage Beast / Music Genome since 2000. ~300k songs. $3/mo after 10 free hours, then free ads 10 Nov. <b>Not the year star.</b> No live stream.",
                "station leftover",
                "Music Genome leftover · not the upload chip",
                "This is the 2005 star (trap)",
                "../housingmaps/index.html",
                "HousingMaps leftover",
                extra="""
<div data-pd-root>
<form data-pd-create action="#">
<p><label>Station seed<br><input name="seed" data-pd-seed size="32" placeholder="Radiohead leftover"></label></p>
<p><button type="submit">Create station leftover</button> <span data-pd-status></span></p>
</form>
<div data-pd-now></div>
</div>
""",
            )
            + query("pandora-lx", "Pandora station leftover", "Second path · TC 20 Aug · not the star.", "genome leftover", "Savage Beast leftover", "This writes upload gold (trap)", "../housingmaps/index.html", "HousingMaps leftover")
            + checks("pandora-ck", "Pandora genome tick", "Music Genome leftover.", "Music Genome leftover", "Not the upload chip", "Pandora is the star (trap)", "../housingmaps/index.html", "HousingMaps leftover"),
        ),
    )
    write(
        Y / "sites" / "housingmaps" / "index.html",
        dest_wrap(
            "HousingMaps leftover — mid-Apr 2005",
            crumb(("../maps/index.html", "Maps leftover"), ("../craigslist/index.html", "craigslist leftover"), ("../digg/index.html", "Digg leftover"))
            + checks(
                "hm",
                "HousingMaps leftover",
                "Paul Rademacher · mid-Apr 2005 (NYT 1 May: site ~3 weeks old). Craigslist housing + Google Maps <b>before</b> the official Maps API (29 Jun). &gt;200k uniques · ~25 cities. Unaffiliated. Sample pins only — not live Craigslist.",
                "~Apr 2005 · Paul Rademacher · Craigslist + Maps · pre-API",
                "Unaffiliated leftover · no live Craigslist",
                "Load live Craigslist (trap)",
                "../digg/index.html",
                "Digg leftover",
                extra="""
<form data-hm-filter>
City <select name="city"><option>San Francisco</option><option>New York</option><option>Chicago</option><option>Austin</option></select>
Kind <select name="kind"><option value="rent">For Rent</option><option value="sale">For Sale</option></select>
<button type="submit">Refresh leftover</button>
</form>
<p data-hm-status></p>
<div data-hm-pins class="hm-map"></div>
""",
            )
            + query("hm-lx", "HousingMaps city leftover", "Rademacher · ~25 cities · pre-API.", "SF leftover", "pre-API leftover", "API already shipped Apr (trap)", "../digg/index.html", "Digg leftover")
            + checks("hm-ck", "HousingMaps both ticks leftover", "Craigslist + Maps leftover.", "Craigslist leftover", "Maps leftover", "This is Street View (trap)", "../digg/index.html", "Digg leftover")
            + query("hm-city2", "HousingMaps second city leftover", "Pack C second city leftover.", "Austin leftover", "second city leftover", "Live CL (trap)", "../digg/index.html", "Digg leftover"),
        ),
    )
    inject_machine(
        Y / "sites" / "digg" / "index.html",
        hops(
            "digg",
            "Digg leftover · rise year",
            "Public 5 Dec 2004. <b>2005 is the rise year.</b> Digg 2.0 27 May. Diggnation ep.1 1 Jul is a leftover writer on this dest, not a 7th guided step. Two hops: promote leftover · bury leftover.",
            ("up", "Promote leftover"),
            ("bury", "Bury leftover"),
            "This is Slashdot gold (trap)",
            "../reddit/index.html",
            "Reddit leftover",
        )
        + hops("digg-lx", "Digg leftover bury", "Rise year leftover bury path.", ("dig", "Dig leftover"), ("bury2", "Bury leftover"), "Digg is the 2005 star (trap)", "../reddit/index.html", "Reddit leftover")
        + hops("digg-up", "Digg promote leftover", "2005 UI promote leftover.", ("up2", "Promote leftover"), ("front", "Front page leftover"), "Digg v4 is 2005 (trap)", "../reddit/index.html", "Reddit leftover")
        + checks("diggnation", "Diggnation ep.1 leftover", "1 Jul 2005 · Rose + Albrecht / Revision3 leftover.", "1 Jul 2005 Diggnation leftover", "Not a 7th guided step", "Revision3 is YouTube gold (trap)", "../reddit/index.html", "Reddit leftover"),
    )
    write(
        Y / "sites" / "reddit" / "index.html",
        dest_wrap(
            "reddit leftover — 22 / 23 Jun 2005",
            crumb(("../digg/index.html", "Digg leftover"), ("../flickr/index.html", "Flickr leftover"), ("../youtube/upload.html", "★ Upload"))
            + hops(
                "reddit",
                "reddit leftover",
                "First line 3–4 Jun 2005. Live <b>22 Jun</b> because Paul Graham linked it. Wikipedia / ILS founded date <b>23 Jun</b> — print both. YC first class. Condé Nast buy is Oct 2006. Empty Untitled submit never writes.",
                ("boost", "Boost leftover"),
                ("hot", "Hottest leftover"),
                "Submit Untitled (trap)",
                "../flickr/index.html",
                "Flickr leftover",
                extra='<div data-reddit-list></div><p><a href="submit.html">submit leftover</a> · <a href="about.html">about leftover</a></p>',
            )
            + hops("reddit-lx", "Reddit leftover boost", "YC first class leftover.", ("boost2", "Boost leftover"), ("new", "Newest leftover"), "Boost writes upload gold (trap)", "../flickr/index.html", "Flickr leftover")
            + hops("reddit-hot", "Reddit hottest leftover", "Jul WA hottest leftover.", ("hot2", "Hottest leftover"), ("top", "Top leftover"), "Hottest is Digg 2.0 (trap)", "../flickr/index.html", "Flickr leftover"),
        ),
    )
    write(
        Y / "sites" / "reddit" / "submit.html",
        dest_wrap(
            "reddit leftover — submit",
            crumb(("index.html", "reddit leftover"),)
            + checks("reddit-empty", "Empty-submit trap leftover", "Empty submit never writes Untitled.", "Empty submit never writes Untitled", "This is leftover 2005 reddit", "Submit empty as Untitled (trap)", "index.html", "reddit leftover")
            + query("reddit-sub", "Reddit submit leftover", "Pack C second path leftover.", "title leftover", "submit leftover", "Untitled (trap)", "index.html", "reddit leftover"),
        ),
    )
    inject_machine(
        Y / "sites" / "flickr" / "index.html",
        query(
            "flickr",
            "Flickr leftover · Yahoo-owned 20 Mar 2005",
            "Yahoo acquires Ludicorp 20 Mar 2005. Flickr blog: <b>not Yahoo Photos</b> for the foreseeable future. API stays open. 2004 birth dest stays <code>itt04-*</code>. This room is the Yahoo-owned leftover.",
            "tag leftover",
            "Yahoo-owned leftover · not Yahoo Photos · 2004 chip unmoved",
            "This is Yahoo Photos (trap)",
            "../itunes/podcasts.html",
            "iTunes podcasts leftover",
        )
        + query("flickr-lx", "Flickr leftover upload", "Yahoo 20 Mar leftover upload path.", "upload leftover", "not Yahoo Photos leftover", "This writes 2004 flickr gold (trap)", "../itunes/podcasts.html", "iTunes podcasts leftover")
        + query("flickr-tag", "Flickr tags leftover", "Period tags leftover.", "tag leftover", "folksonomy leftover", "Folksonomy is the chip (trap)", "../itunes/podcasts.html", "iTunes podcasts leftover"),
    )
    write(
        Y / "sites" / "itunes" / "podcasts.html",
        dest_wrap(
            "iTunes podcasts leftover — 28 Jun 2005",
            crumb(("index.html", "iTunes leftover"), ("../techcrunch/index.html", "TechCrunch leftover"))
            + query(
                "pod",
                "iTunes podcasts leftover",
                "Apple 28 Jun 2005. iTunes 4.9. <b>3,000+</b> free podcasts. Jobs: “Podcasting is the next generation of radio.” 30 Jun: <b>&gt;1 million</b> subscriptions in two days. No live iTunes Store charge.",
                "podcast leftover",
                "28 Jun · 3,000+ leftover · not the upload chip",
                "Buy on live iTunes (trap)",
                "../techcrunch/index.html",
                "TechCrunch leftover",
            )
            + query("pod-lx", "Podcast subscribe leftover", "Apple PR leftover subscribe.", "subscribe leftover", "3,000+ leftover", "Subscribe writes upload gold (trap)", "../techcrunch/index.html", "TechCrunch leftover")
            + checks("pod-1m", "iTunes >1M / 2 days leftover", "Apple PR 30 Jun leftover.", ">1 million subscriptions in two days leftover", "Not the upload chip", "iPod is the chip (trap)", "../techcrunch/index.html", "TechCrunch leftover"),
        ),
    )
    write(
        Y / "sites" / "techcrunch" / "index.html",
        dest_wrap(
            "TechCrunch leftover — 11 Jun 2005",
            crumb(("../../pages/home.html", "Starting Point"), ("../playable/game.html", "HoverChop"), ("../mashable/index.html", "Mashable leftover"))
            + query(
                "tc",
                "TechCrunch leftover",
                "Michael Arrington first post <b>11 Jun 2005</b>. Atherton. Web 2.0 startup press. Technorati ~#70 by year-end. Mashable / ProgrammableWeb are neighbor leftovers. AOL 2010 is not 2005.",
                "crunch leftover",
                "11 Jun 2005 Arrington leftover · not the upload chip",
                "This is the 2005 star (trap)",
                "../playable/game.html",
                "HoverChop",
            )
            + query("tc-lx", "TechCrunch leftover note", "Boom press leftover second path.", "note leftover", "Jun 2005 leftover", "This writes upload gold (trap)", "../playable/game.html", "HoverChop"),
        ),
    )
    write(
        Y / "sites" / "playable" / "game.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>HoverChop — 2005</title>
<link rel="stylesheet" href="../../../../css/period-2005.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-2005" bgcolor="#ece9d8">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2005" data-game-id="heli" data-yg-goal="Hold to climb. Release to fall." data-yg-next-href="../youtube/upload.html" data-yg-next-label="★ Upload">
<h1>HoverChop — 2005</h1>
<p>Museum original · Helicopter-game genre leftover. Cabinets extra-a…i sit beside this dest. Incomplete never writes. Not the YouTube chip.</p>
<p class="honesty">key <code>itt05-game-heli</code></p>
<canvas id="game-canvas" width="480" height="220" style="border:1px solid #333;background:#0a1628"></canvas>
<p>Score <b id="play-score">0</b> · <span id="play-status">Hold mouse / Space to climb</span></p>
<p><button type="button" data-game-start id="game-start">Start leftover</button></p>
</div>
{hops("game-heli", "HoverChop leftover", "Flash-peak year game leftover. Two hops: lift leftover · land leftover. No live Flash exploit.", ("lift", "Lift leftover"), ("land", "Land leftover"), "This is the YouTube gold (trap)", "../youtube/upload.html", "★ Upload")}
{hops("heli-lx", "HoverChop leftover path", "Pack C second path leftover.", ("lift2", "Lift leftover"), ("cave", "Cave leftover"), "This writes upload gold (trap)", "../youtube/upload.html", "★ Upload")}
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/heli.js"></script>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )


def year_true_and_strips() -> None:
    rooms = [
        ("youtube/watch.html", hops("yt-watch", "YouTube watch leftover", "*Me at the zoo* 23 Apr 2005 · ~19s · Jawed Karim · San Diego Zoo. Watch leftover. <b>Not</b> the upload gold.", ("watch", "Watch leftover"), ("share", "Share leftover"), "Watching writes the upload gold (trap)", "../wikipedia/index.html", "Wikipedia leftover", extra='<h1 data-yt-title>Me at the zoo</h1><div data-yt-player style="width:320px;height:160px;background:#222;color:#fff;padding:16px">Flash leftover player · no real codec</div><p data-yt-views data-yt-base="1">1</p>')),
        ("youtube/about.html", hops("yt-inv", "YouTube invite friends leftover", "Aug 2005 WA Invite Friends leftover. Not the upload gold.", ("inv", "Invite leftover"), ("friend", "Friend leftover"), "Invite writes upload gold (trap)", "upload.html", "★ Upload") + checks("yt-ind", "Independent YouTube leftover", "Google buy is Oct 2006.", "Google does not own YouTube yet", "Sequoia $3.5M / 8 TB/day is 7 Nov leftover", "Google already closed the buy (trap)", "upload.html", "★ Upload") + checks("yt-seq", "YouTube Sequoia leftover", "7 Nov 2005 · $3.5M · 8 TB/day leftover.", "7 Nov Sequoia leftover", "Still independent leftover", "Google buy is 2005 (trap)", "upload.html", "★ Upload") + checks("yt-dec", "YouTube Dec launch leftover", "Official launch class 15 Dec leftover literacy.", "15 Dec leftover", "Not a second gold", "This is the upload gold (trap)", "upload.html", "★ Upload")),
        ("ajax/index.html", checks("ajax-lx", "Ajax leftover — 18 Feb 2005", "Jesse James Garrett / Adaptive Path coins Ajax. Cites Maps + Suggest. WA Adaptive Path 18 Feb.", "18 Feb 2005 Garrett leftover", "Cites Maps + Suggest leftover", "Street View is the Ajax gold (trap)", "../maps/index.html", "Maps leftover")),
        ("mashable/index.html", query("mash-lx", "Mashable leftover — ~Jul 2005", "Pete Cashmore. Boom-year press leftover. Not TechCrunch.", "mash leftover", "~Jul 2005 Cashmore leftover", "Mashable is TechCrunch (trap)", "../programmableweb/index.html", "ProgrammableWeb leftover")),
        ("programmableweb/index.html", query("pw-lx", "ProgrammableWeb leftover — Aug 2005", "John Musser. API directory leftover. Maps API is a neighbor leftover.", "api leftover", "Aug 2005 Musser leftover", "This is the Maps API gold (trap)", "../dailymotion/index.html", "DailyMotion leftover")),
        ("dailymotion/index.html", query("dm-lx", "DailyMotion leftover — 15 Mar 2005", "French video leftover. Founded 15 Mar 2005. Not YouTube gold.", "clip leftover", "15 Mar 2005 FR leftover", "DailyMotion is the 2005 star (trap)", "../vimeo/index.html", "Vimeo leftover")),
        ("vimeo/index.html", query("vimeo-lx", "Vimeo leftover — 18 Jun 2005", "Self-register 18 Jun 2005. Not HD-as-default gold.", "clip leftover", "18 Jun self-register leftover", "Vimeo HD is 2005 gold (trap)", "../googlevideo/index.html", "Google Video leftover")),
        ("googlevideo/index.html", query("gv-lx", "Google Video leftover — 25 Jan 2005", "25 Jan search · 27 Jun play. Not YouTube gold. Google does not own YouTube.", "search leftover", "25 Jan search leftover", "Google Video is YouTube (trap)", "../earth/index.html", "Earth leftover") + hops("gv-play", "Google Video play leftover", "27 Jun 2005 in-page play leftover.", ("play", "Play leftover"), ("search2", "Search leftover"), "This is YouTube gold (trap)", "../youtube/watch.html", "Watch leftover")),
        ("earth/index.html", hops("earth-lx", "Google Earth leftover — 28 Jun 2005", "Keyhole. Plus $20/yr · Pro $400/yr. Not Street View.", ("spin", "Spin leftover"), ("tilt", "Tilt leftover"), "Street View is Earth (trap)", "../analytics/index.html", "Analytics leftover")),
        ("analytics/index.html", query("ga-lx", "Google Analytics leftover — 14 Nov 2005", "Urchin. Invite throttle leftover. Not the star.", "urchin leftover", "14 Nov Urchin leftover", "Analytics is the chip (trap)", "../milliondollar/index.html", "Million Dollar leftover")),
        ("milliondollar/index.html", query("mdh-lx", "Million Dollar Homepage leftover — 26 Aug 2005", "Alex Tew. $1/pixel · 1,000,000 grid · min 10×10=$100. Jan 2006 auction is edge, not this gold.", "pixel leftover", "26 Aug 2005 Tew leftover", "Buy live pixels (trap)", "../dailymotion/index.html", "DailyMotion leftover") + """
<div data-pop-panel="1" class="itt-pop3" style="margin:12px 0;padding:10px;border:1px dashed #1565c0;max-width:46em;font-family:Arial,sans-serif;font-size:12px;background:#e3f2fd">
<p><b>Popular leftover</b> · not the chip · empty never writes</p>
<p><button type="button" data-pop-pick="a">pixel A</button>
<button type="button" data-pop-pick="b">pixel B</button></p>
<p><label><input type="checkbox" data-pop-req> Leftover, not upload gold.</label></p>
<p><input type="text" data-pop-field maxlength="80" placeholder="pixel leftover"></p>
<p><button type="button" data-pop-go data-pop-id="milliondollar">Save leftover</button> <span data-pop-status></span></p>
</div>
"""),
        ("clubpenguin/index.html", hops("cp-lx", "Club Penguin leftover — 24 Oct 2005", "Public noon PT 24 Oct. New Horizon / RocketSnail. Kids Flash MMO leftover. Disney buy is <b>2007</b>.", ("waddle", "Waddle leftover"), ("igloo", "Igloo leftover"), "Disney already owns Club Penguin (trap)", "../milliondollar/index.html", "Million Dollar leftover") + """
<div data-pop-panel="1" class="itt-pop3" style="margin:12px 0;padding:10px;border:1px dashed #1565c0;max-width:46em;font-family:Arial,sans-serif;font-size:12px;background:#e3f2fd">
<p><b>Popular leftover</b> · not the chip · empty never writes</p>
<p><button type="button" data-pop-pick="a">waddle A</button>
<button type="button" data-pop-pick="b">waddle B</button></p>
<p><label><input type="checkbox" data-pop-req> Leftover, not upload gold.</label></p>
<p><input type="text" data-pop-field maxlength="80" placeholder="waddle leftover"></p>
<p><button type="button" data-pop-go data-pop-id="clubpenguin">Waddle leftover</button> <span data-pop-status></span></p>
</div>
"""),
        ("kayak/index.html", query("kayak-lx", "Kayak leftover — 7 Feb 2005", "Public 7 Feb 2005 travel leftover. Not Google Flights.", "flight leftover", "7 Feb 2005 leftover", "Kayak is Google Flights (trap)", "../gaia/index.html", "Gaia leftover") + """
<div data-pop-panel="1" class="itt-pop3" style="margin:12px 0;padding:10px;border:1px dashed #1565c0;max-width:46em;font-family:Arial,sans-serif;font-size:12px;background:#e3f2fd">
<p><b>Popular leftover</b> · not the chip · empty never writes</p>
<p><button type="button" data-pop-pick="a">flight A</button>
<button type="button" data-pop-pick="b">flight B</button></p>
<p><label><input type="checkbox" data-pop-req> Leftover, not upload gold.</label></p>
<p><input type="text" data-pop-field maxlength="80" placeholder="SFO leftover"></p>
<p><button type="button" data-pop-go data-pop-id="kayak">Search leftover</button> <span data-pop-status></span></p>
</div>
"""),
        ("gaia/index.html", hops("gaia-lx", "Gaia leftover — 2005 social", "2005 leftover social. Not open Facebook.", ("home", "Home leftover"), ("forum", "Forum leftover"), "Gaia is Facebook gold (trap)", "../secondlife/index.html", "Second Life leftover")),
        ("secondlife/index.html", hops("secondlife", "Second Life leftover — 2005 world", "Leftover world. Not a web gold.", ("island", "Island leftover"), ("fly", "Fly leftover"), "Metaverse is the chip (trap)", "../utorrent/index.html", "µTorrent leftover")),
        ("utorrent/index.html", query("utorrent", "µTorrent leftover — 2005 client", "Client leftover. Not an exploit dest.", "torrent leftover", "2005 client leftover", "Exploit this client (trap)", "../xbox360/index.html", "Xbox 360 leftover")),
        ("xbox360/index.html", hops("x360-lx", "Xbox 360 leftover — 22 Nov 2005", "NA launch leftover console. Not a web gold.", ("dash", "Dashboard leftover"), ("live", "Live leftover"), "Xbox Live is the chip (trap)", "../android/index.html", "Android footnote")),
        ("android/index.html", checks("android-fn", "Android leftover — Jul 2005 footnote", "Quiet acquire leftover. <b>Not G1.</b> G1 is 2008.", "Jul 2005 quiet acquire leftover", "Not T-Mobile G1 leftover", "T-Mobile G1 launched 2005 (trap)", "../memeorandum/index.html", "Memeorandum leftover")),
        ("memeorandum/index.html", query("memo-lx", "Memeorandum leftover", "Political blog river leftover.", "memo leftover", "blog river leftover", "Memeorandum is TechCrunch (trap)", "../daypop/index.html", "Daypop leftover")),
        ("ask/index.html", hops("ask-acq", "Ask leftover — Bloglines Feb 2005", "Ask←Bloglines Feb. Not Jeeves gold.", ("ask", "Ask leftover"), ("bloglines", "Bloglines leftover"), "Ask is Google (trap)", "../bloglines/index.html", "Bloglines leftover")),
        ("reader/index.html", hops("reader-lx", "Google Reader leftover — 7 Oct 2005", "Labs 7 Oct. Shutdown 2013 out of scope.", ("star", "Star leftover"), ("share", "Share leftover"), "Reader is the chip (trap)", "../odeo/index.html", "Odeo leftover")),
        ("odeo/index.html", query("odeo-lx", "Odeo leftover", "Evan Williams podcast leftover · announce ~25 Feb / launch ~Jul. Twitter is 2006.", "odeo leftover", "2005 podcast leftover", "Odeo is Twitter 2005 (trap)", "../itunes/podcasts.html", "Podcasts leftover")),
        ("mapquest/index.html", hops("mq-print", "MapQuest leftover — print trap", "Print leftover. This write never writes Maps gold.", ("print", "Print leftover"), ("dir", "Directions leftover"), "This is Google Maps (trap)", "../maps/index.html", "Maps leftover")),
        ("googleearth/index.html", hops("googleearth", "Google Earth leftover (alias)", "Same 28 Jun 2005 Keyhole leftover. Prefer <a href='../earth/index.html'>earth</a>.", ("spin", "Spin leftover"), ("tilt", "Tilt leftover"), "Street View (trap)", "../earth/index.html", "Earth leftover")),
    ]
    for rel, body in rooms:
        write(Y / "sites" / rel, dest_wrap(rel.split("/")[0] + " leftover — 2005", crumb(("../../pages/home.html", "Starting Point"), ("../../pages/map.html", "Year flow map")) + body))

    # leftover strip + pack B/C injects on continuity dests
    injects = [
        ("wikipedia/index.html", query("wiki-lx", "Wikipedia leftover", "Continuity encyclopedia leftover. Not the 2001 edit star. 2005 English growth leftover. Millionth article is 1 Mar 2006 — ban as 2005 gold. 2005 milestone is 500k on 17–18 Mar.", "wiki leftover", "leftover, not 2001 gold", "Millionth article is 2005 gold (trap)", "../myspace/index.html", "MySpace leftover")),
        ("myspace/index.html", hops("ms-lx", "MySpace leftover", "June 2005 visits #9 (Hosting.com). News Corp $580M 18 Jul · 16M monthly users class. Zeitgeist #1 gainer. Not the chip.", ("profile", "Profile leftover"), ("friend", "Friend leftover"), "MySpace is the 2005 star (trap)", "../yahoo/index.html", "Yahoo leftover") + checks("ms-580", "MySpace $580M leftover", "NYT 18 Jul News Corp / Intermix $580M leftover.", "$580M Intermix leftover", "Zeitgeist #1 gainer leftover", "MySpace is the chip (trap)", "../yahoo/index.html", "Yahoo leftover")),
        ("yahoo/index.html", hops("yahoo-lx", "Yahoo leftover · #1 visits", "June 2005 visits #1 · 6.20B. Still the mass portal. YouTube is culture gold, not visits gold.", ("dir", "Directory leftover"), ("mail", "Mail leftover"), "Yahoo is Google (trap)", "../google/index.html", "Google leftover")),
        ("google/index.html", query("google-q", "Google leftover", "Visits climb to #2 (2.98B). Search leftover. Maps is a different dest. IPO is 2004 leftover.", "search leftover", "search leftover · not Maps gold", "This is Maps gold (trap)", "../amazon/index.html", "Amazon leftover")),
        ("amazon/index.html", hops("amz-lx", "Amazon leftover", "Smile cart leftover. Continuity from 2004. No 1-Click live charge.", ("search", "Search leftover"), ("cart", "Cart leftover"), "1-Click live charge (trap)", "../ebay/index.html", "eBay leftover")),
        ("ebay/index.html", hops("ebay-lx", "eBay leftover", "Bid leftover. Skype buy 12 Sep is a different dest.", ("bid", "Bid leftover"), ("watch", "Watch leftover"), "This is Skype gold (trap)", "../msn/index.html", "MSN leftover")),
        ("msn/index.html", hops("msn-lx", "MSN leftover", "June 2005 visits #3 · 1.73B. Portal leftover. IE6 still default shell.", ("home", "Home leftover"), ("search", "Search leftover"), "MSN is the chip (trap)", "../aol/index.html", "AOL leftover")),
        ("aol/index.html", hops("aol-lx", "AOL leftover", "June 2005 visits #4 · 1.01B. You've Got Mail is an epitaph dest.", ("signon", "Sign on leftover"), ("welcome", "Welcome leftover"), "AOL is the chip (trap)", "../firefox/index.html", "Firefox leftover")),
        ("firefox/index.html", checks("fx15-lx", "Firefox 1.5 leftover — 29 Nov 2005", "Firefox 1.5. 100M+ lineage downloads. Auto-update. Cool-blogger leftover. <b>IE6 remains January shell.</b>", "29 Nov 2005 · Firefox 1.5 leftover", "IE6 is still the mass default", "Firefox 1.5 is the default shell (trap)", "../gmail/index.html", "Gmail leftover")),
        ("gmail/index.html", query("gmail-lx", "Gmail invite leftover", "Still invite. Open Gmail is 2007. 1 GB pitch is 2004 lore leftover.", "invite leftover", "still invite leftover", "This is open Gmail (trap)", "../flickr/index.html", "Flickr leftover")),
        ("skype/index.html", hops("skype-lx", "Skype leftover", "eBay 12 Sep 2005 · $2.6B up front · 54M registered users. PC-to-PC leftover. No live call.", ("call", "Call leftover"), ("chat", "Chat leftover"), "Live call (trap)", "../delicious/index.html", "delicious leftover") + hops("skype-call", "Skype call leftover", "Call theater leftover. No live call.", ("dial", "Dial leftover"), ("hang", "Hang leftover"), "Live PSTN (trap)", "../delicious/index.html", "delicious leftover")),
        ("delicious/index.html", query("deli-lx", "delicious leftover", "Yahoo 9 Dec 2005 · Joshua Schachter · ~300k users · price undisclosed.", "tag leftover", "9 Dec Yahoo leftover · price undisclosed", "Yahoo published the price (trap)", "../blogger/index.html", "Blogger leftover") + checks("deli-bm", "delicious bookmarklet leftover", "Sep WA leftover.", "bookmarklet leftover", "not the upload chip", "This writes Maps gold (trap)", "../blogger/index.html", "Blogger leftover")),
        ("blogger/index.html", hops("blogger-lx", "Blogger leftover", "Google-owned continuity. Sidebar / blogroll era leftover.", ("post", "Post leftover"), ("publish", "Publish leftover"), "This is 1999 gold (trap)", "../wordpress/index.html", "WordPress leftover")),
        ("wordpress/index.html", hops("wp-lx", "WordPress leftover", "2003 birth · 2005 theme leftover. Not WordPress.com VIP gold.", ("dash", "Dashboard leftover"), ("theme", "Theme leftover"), "VIP is 2005 gold (trap)", "../cnn/index.html", "CNN leftover")),
        ("cnn/index.html", hops("cnn-lx", "CNN leftover", "Mass news leftover. Katrina / tsunami are Zeitgeist news leftover lines, not rooms.", ("top", "Top leftover"), ("world", "World leftover"), "This is the chip (trap)", "../apple/ipod.html", "iPod leftover")),
        ("apple/ipod.html", hops("ipod-lx", "iPod leftover", "Apple 28 Jun PR: >15 million iPods sold as of 31 Mar 2005. Click Wheel leftover. No live iTunes charge.", ("click", "Click Wheel leftover"), ("sync", "Sync leftover"), "Buy on live iTunes (trap)", "../clubpenguin/index.html", "Club Penguin leftover")),
        ("feedburner/index.html", query("fburn-lx", "FeedBurner leftover", "RSS stats leftover.", "feed leftover", "RSS stats leftover", "FeedBurner is Reader (trap)", "../bloglines/index.html", "Bloglines leftover")),
        ("bloglines/index.html", hops("blines-lx", "Bloglines leftover", "Ask acquired Feb 2005 leftover.", ("sub", "Subscribe leftover"), ("read", "Read leftover"), "Bloglines is Google Reader (trap)", "../web20conference/index.html", "Web 2.0 leftover")),
        ("web20conference/index.html", checks("w20-lx", "Web 2.0 Conference leftover", "Oct 2005 sold-out leftover.", "Oct 2005 sold-out leftover", "Not the upload chip", "Web 2.0 is the chip (trap)", "../odeo/index.html", "Odeo leftover")),
        ("facebook/index.html", checks("fb-rename", "Facebook rename leftover", "Aug 2005 drops “The” · still gated · not open FB.", "Aug 2005 drops The leftover", "Still gated leftover", "Facebook is open to everyone (trap)", "networks.html", "networks leftover") + hops("fb-hs", "Facebook high school leftover", "Sep 2005 · not open.", ("hs", "High school leftover"), ("gate", "Gate leftover"), "News Feed launched 2005 (trap)", "invite.html", "invite leftover") + hops("fb-net", "Facebook networks leftover", "Still gated college leftover. Not the 2004 chip rewrite.", ("harvard", "Harvard leftover"), ("gate2", "Gate leftover"), "Open Facebook (trap)", "invite.html", "invite leftover") + hops("fb-inv", "Facebook invite leftover", "Invite leftover · still gated.", ("inv", "Invite leftover"), ("wait", "Wait leftover"), "Open FB (trap)", "index.html", "facebook leftover") + checks("fb-accel", "Accel leftover", "~$12.7M May leftover.", "Accel leftover", "still gated leftover", "Open FB (trap)", "index.html", "facebook leftover")),
        ("friendster/index.html", hops("friendster-lx", "Friendster leftover", "Losing buzz leftover. MySpace is the gainer.", ("test", "Testimonial leftover"), ("friend", "Friend leftover"), "Friendster is the chip (trap)", "../myspace/index.html", "MySpace leftover")),
        ("technorati/index.html", query("techno-lx", "Technorati leftover", "Blogger addiction leftover. TechCrunch ~#70 EOY.", "cosmos leftover", "blogger addiction leftover", "Technorati is the chip (trap)", "../movabletype/index.html", "Movable Type leftover")),
        ("movabletype/index.html", hops("mt-lx", "Movable Type leftover", "Sidebar / blogroll leftover.", ("entry", "Entry leftover"), ("tb", "Trackback leftover"), "MT is WordPress (trap)", "../wordpress/index.html", "WordPress leftover")),
        ("lastfm/index.html", hops("lastfm-lx", "Last.fm leftover", "9 Aug 2005 merge leftover. Scrobble leftover.", ("scrobble", "Scrobble leftover"), ("chart", "Chart leftover"), "Last.fm is Pandora gold (trap)", "../pandora/index.html", "Pandora leftover")),
        ("linkedin/index.html", hops("li-lx", "LinkedIn leftover", "Continuity career graph leftover.", ("invite", "Invite leftover"), ("conn", "Connections leftover"), "LinkedIn is the chip (trap)", "../facebook/index.html", "Facebook leftover")),
        ("steam/index.html", hops("steam-lx", "Steam leftover", "Desktop leftover. Not a web gold.", ("lib", "Library leftover"), ("play", "Play leftover"), "Steam is the chip (trap)", "../playable/game.html", "HoverChop")),
        ("paypal/index.html", hops("paypal-lx", "PayPal leftover", "Continuity leftover.", ("send", "Send leftover"), ("req", "Request leftover"), "Live charge (trap)", "../ebay/index.html", "eBay leftover")),
        ("microsoft/index.html", checks("msft-lx", "Microsoft leftover", "IE6 honesty leftover. Vista is not January shell.", "IE6 is the January shell leftover", "Vista is not default leftover", "Vista is the 2005 shell (trap)", "../firefox/index.html", "Firefox leftover")),
        ("adsense/index.html", query("adsense-lx", "AdSense leftover", "Continuity leftover.", "ads leftover", "AdSense leftover", "AdSense is the chip (trap)", "../blogger/index.html", "Blogger leftover")),
        ("slashdot/index.html", hops("slash-lx", "Slashdot leftover", "Digg is rising against this leftover.", ("story", "Story leftover"), ("mod", "Mod leftover"), "Slashdot is Digg gold (trap)", "../digg/index.html", "Digg leftover")),
        ("metafilter/index.html", hops("mefi-lx", "MetaFilter leftover", "Continuity leftover.", ("post", "Post leftover"), ("fave", "Fave leftover"), "MeFi is the chip (trap)", "../slashdot/index.html", "Slashdot leftover")),
        ("daypop/index.html", query("daypop-lx", "Daypop leftover", "Blog search leftover.", "daypop leftover", "blog search leftover", "Daypop is Google (trap)", "../technorati/index.html", "Technorati leftover")),
        ("netflix/index.html", hops("nflix-dvd", "Netflix DVD leftover", "DVD leftover. Not streaming-as-default.", ("queue", "Queue leftover"), ("dvd", "DVD leftover"), "Streaming is 2005 gold (trap)", "../amazon/index.html", "Amazon leftover")),
        ("altavista/index.html", query("altavista-lx", "AltaVista leftover", "Search leftover.", "query leftover", "search leftover", "AltaVista is Google (trap)", "../google/index.html", "Google leftover")),
        ("askjeeves/index.html", query("jeeves-lx", "Ask Jeeves leftover", "Search leftover.", "ask leftover", "Jeeves leftover", "Jeeves is Ask gold (trap)", "../ask/index.html", "Ask leftover")),
        ("encarta/index.html", hops("encarta-lx", "Encarta leftover", "Encyclopedia leftover vs Wikipedia.", ("article", "Article leftover"), ("vs", "Vs leftover"), "Encarta is Wikipedia gold (trap)", "../wikipedia/index.html", "Wikipedia leftover")),
        ("excite/index.html", hops("excite-lx", "Excite leftover", "Portal leftover.", ("home", "Home leftover"), ("search", "Search leftover"), "Excite is Yahoo (trap)", "../yahoo/index.html", "Yahoo leftover")),
        ("hotbot/index.html", query("hotbot-lx", "HotBot leftover", "Search leftover.", "hotbot leftover", "search leftover", "HotBot is Google (trap)", "../google/index.html", "Google leftover")),
        ("infoseek/index.html", query("infoseek-lx", "Infoseek leftover", "Search leftover.", "infoseek leftover", "search leftover", "Infoseek is Google (trap)", "../google/index.html", "Google leftover")),
        ("dmoz/index.html", hops("dmoz-lx", "DMOZ leftover", "Directory leftover.", ("cat", "Category leftover"), ("edit", "Edit leftover"), "DMOZ is Yahoo (trap)", "../yahoo/index.html", "Yahoo leftover")),
        ("geocities/index.html", hops("geo-lx", "GeoCities leftover", "Homestead leftover.", ("hood", "Neighborhood leftover"), ("page", "Page leftover"), "GeoCities is MySpace (trap)", "../myspace/index.html", "MySpace leftover")),
        ("icq/index.html", hops("icq-lx", "ICQ leftover", "IM leftover.", ("uin", "UIN leftover"), ("msg", "Message leftover"), "ICQ is AIM gold (trap)", "../msn/index.html", "MSN leftover")),
        ("kazaa/index.html", hops("kazaa-lx", "KaZaA leftover", "P2P leftover.", ("search", "Search leftover"), ("dl", "Download leftover"), "Live file (trap)", "../gnutella/index.html", "Gnutella leftover")),
        ("napster/index.html", hops("nap-ep", "Napster epitaph leftover", "Epitaph leftover.", ("legal", "Legal leftover"), ("search", "Search leftover"), "Napster is iTunes gold (trap)", "../itunes/index.html", "iTunes leftover")),
        ("gnutella/index.html", hops("gnutella-lx", "Gnutella leftover", "P2P leftover.", ("node", "Node leftover"), ("search", "Search leftover"), "Live file (trap)", "../kazaa/index.html", "KaZaA leftover")),
        ("netscape/index.html", hops("netscape-lx", "Netscape leftover", "Browser leftover.", ("home", "Home leftover"), ("dl", "Download leftover"), "Netscape is Firefox gold (trap)", "../firefox/index.html", "Firefox leftover")),
        ("netcenter/index.html", hops("netcenter-lx", "Netcenter leftover", "Portal leftover.", ("home", "Home leftover"), ("news", "News leftover"), "Netcenter is Yahoo (trap)", "../yahoo/index.html", "Yahoo leftover")),
        ("mtv/index.html", hops("mtv-lx", "MTV leftover", "Broadband leftover.", ("video", "Video leftover"), ("radio", "Radio leftover"), "MTV is YouTube gold (trap)", "../youtube/watch.html", "Watch leftover")),
        ("gamespot/index.html", hops("gamespot-lx", "GameSpot leftover", "Games leftover.", ("preview", "Preview leftover"), ("dl", "Download leftover"), "GameSpot is the chip (trap)", "../playable/game.html", "HoverChop")),
        ("wired/index.html", query("wired-lx", "Wired leftover", "Press leftover.", "wired leftover", "press leftover", "Wired is TechCrunch (trap)", "../techcrunch/index.html", "TechCrunch leftover")),
        ("wayback/index.html", hops("wayback-lx", "Wayback leftover", "Archive leftover.", ("save", "Save leftover"), ("browse", "Browse leftover"), "Wayback is the chip (trap)", "../wikipedia/index.html", "Wikipedia leftover")),
        ("macromedia/index.html", hops("macro-lx", "Macromedia leftover", "Flash leftover. No exploit dest.", ("flash", "Flash leftover"), ("dl", "Download leftover"), "Exploit Flash (trap)", "../playable/game.html", "HoverChop")),
        ("mozilla/index.html", hops("mozilla-lx", "Mozilla leftover", "Browser leftover.", ("home", "Home leftover"), ("fx", "Firefox leftover"), "Mozilla is IE (trap)", "../firefox/index.html", "Firefox leftover")),
        ("isp/index.html", hops("isp-lx", "ISP leftover", "Broadband leftover.", ("connect", "Connect leftover"), ("bill", "Bill leftover"), "Dial-up is the shell (trap)", "../../pages/about.html", "About 2005")),
        ("pets/index.html", hops("pets-ep", "Pets.com epitaph leftover", "Epitaph leftover.", ("sock", "Sock leftover"), ("shop", "Shop leftover"), "Pets is Amazon gold (trap)", "../amazon/index.html", "Amazon leftover")),
        ("startupfailures/index.html", hops("fail-lx", "Startup-failures leftover", "Dot-com leftover.", ("list", "List leftover"), ("why", "Why leftover"), "This is the chip (trap)", "../pets/index.html", "Pets leftover")),
        ("youvegotmail/index.html", hops("ygm-lx", "You've Got Mail leftover", "Epitaph leftover.", ("mail", "Mail leftover"), ("movie", "Movie leftover"), "This is AOL gold (trap)", "../aol/index.html", "AOL leftover")),
        ("moreover/index.html", query("moreover-lx", "Moreover leftover", "News leftover.", "moreover leftover", "news leftover", "Moreover is Google News (trap)", "../googlenews/index.html", "Google News leftover")),
        ("blogdex/index.html", hops("blogdex-lx", "Blogdex leftover", "Blog leftover.", ("rank", "Rank leftover"), ("post", "Post leftover"), "Blogdex is Technorati (trap)", "../technorati/index.html", "Technorati leftover")),
        ("bowienet/index.html", hops("bowie-lx", "BowieNet leftover", "Epitaph leftover.", ("fan", "Fan leftover"), ("about", "About leftover"), "BowieNet is the chip (trap)", "../myspace/index.html", "MySpace leftover")),
        ("phoenix/index.html", hops("phoenix-lx", "Phoenix leftover", "Firebird leftover.", ("dl", "Download leftover"), ("name", "Name leftover"), "Phoenix is Firefox gold (trap)", "../firefox/index.html", "Firefox leftover")),
        ("loudcloud/index.html", hops("loud-lx", "Loudcloud leftover", "Epitaph leftover.", ("about", "About leftover"), ("cloud", "Cloud leftover"), "Loudcloud is AWS (trap)", "../adsense/index.html", "AdSense leftover")),
        ("zombo/index.html", hops("zombo-lx", "Zombo leftover", "Thin leftover.", ("welcome", "Welcome leftover"), ("flash", "Flash leftover"), "Zombo is the chip (trap)", "../../pages/home.html", "Starting Point")),
        ("y2k/index.html", hops("y2k-ep", "Y2K epitaph leftover", "Epitaph leftover.", ("clock", "Clock leftover"), ("done", "Done leftover"), "Y2K is 2005 gold (trap)", "../../pages/about.html", "About 2005")),
        ("hampsterdance/index.html", hops("hamp-lx", "Hampster leftover", "Thin leftover.", ("dance", "Dance leftover"), ("loop", "Loop leftover"), "This is the chip (trap)", "../../pages/home.html", "Starting Point")),
        ("googlenews/index.html", query("gnews-lx", "Google News leftover", "Continuity leftover.", "news leftover", "news leftover", "Google News is the chip (trap)", "../cnn/index.html", "CNN leftover")),
        ("itunes/browse.html", hops("itunes-browse", "iTunes directory leftover", "Pack C directory browse leftover.", ("browse", "Browse leftover"), ("pod", "Podcast leftover"), "Live buy (trap)", "../itunes/podcasts.html", "Podcasts leftover")),
        ("digg/submit.html", query("digg-sub", "Digg submit leftover", "Pack C submit leftover.", "story leftover", "submit leftover", "Untitled (trap)", "../digg/index.html", "Digg leftover")),
        ("youtube/index.html", query("yt-lx", "YouTube leftover title", "Second path on YouTube. Never the star write.", "title leftover", "leftover title · not the upload gold", "This leftover is the upload gold (trap)", "upload.html", "★ Upload")),
    ]
    for rel, machine in injects:
        inject_machine(Y / "sites" / rel, machine)


PACK_120 = [
    # Pack A
    ("/years/2005/sites/youtube/index.html", "itt05-yt-lx", "YouTube leftover title"),
    ("/years/2005/sites/youtube/about.html", "itt05-yt-inv", "YouTube invite leftover"),
    ("/years/2005/sites/youtube/watch.html", "itt05-yt-watch", "YouTube watch leftover"),
    ("/years/2005/sites/maps/index.html", "itt05-maps-lx", "Maps leftover two views"),
    ("/years/2005/sites/maps/index.html", "itt05-maps-lax", "Maps hotels near LAX"),
    ("/years/2005/sites/maps/about.html", "itt05-maps-nsv", "Maps no-Street-View"),
    ("/years/2005/sites/ajax/index.html", "itt05-ajax-lx", "Ajax leftover"),
    ("/years/2005/sites/housingmaps/index.html", "itt05-hm-lx", "HousingMaps city"),
    ("/years/2005/sites/housingmaps/index.html", "itt05-hm-ck", "HousingMaps ticks"),
    ("/years/2005/sites/reddit/index.html", "itt05-reddit-lx", "Reddit leftover boost"),
    ("/years/2005/sites/reddit/index.html", "itt05-reddit-hot", "Reddit hottest"),
    ("/years/2005/sites/reddit/submit.html", "itt05-reddit-empty", "Reddit empty-submit"),
    ("/years/2005/sites/digg/index.html", "itt05-digg-lx", "Digg leftover bury"),
    ("/years/2005/sites/digg/index.html", "itt05-digg-up", "Digg promote"),
    ("/years/2005/sites/digg/index.html", "itt05-diggnation", "Diggnation ep.1"),
    ("/years/2005/sites/pandora/index.html", "itt05-pandora-lx", "Pandora station leftover"),
    ("/years/2005/sites/pandora/index.html", "itt05-pandora-ck", "Pandora genome"),
    ("/years/2005/sites/itunes/podcasts.html", "itt05-pod-lx", "iTunes podcast subscribe"),
    ("/years/2005/sites/itunes/podcasts.html", "itt05-pod-1m", "iTunes 1M / 2 days"),
    ("/years/2005/sites/flickr/index.html", "itt05-flickr-lx", "Flickr leftover upload"),
    ("/years/2005/sites/flickr/index.html", "itt05-flickr-tag", "Flickr tags"),
    ("/years/2005/sites/delicious/index.html", "itt05-deli-lx", "delicious leftover tag"),
    ("/years/2005/sites/delicious/index.html", "itt05-deli-bm", "delicious bookmarklet"),
    ("/years/2005/sites/techcrunch/index.html", "itt05-tc-lx", "TechCrunch leftover"),
    ("/years/2005/sites/mashable/index.html", "itt05-mash-lx", "Mashable leftover"),
    ("/years/2005/sites/programmableweb/index.html", "itt05-pw-lx", "ProgrammableWeb leftover"),
    ("/years/2005/sites/dailymotion/index.html", "itt05-dm-lx", "DailyMotion leftover"),
    ("/years/2005/sites/vimeo/index.html", "itt05-vimeo-lx", "Vimeo leftover"),
    ("/years/2005/sites/googlevideo/index.html", "itt05-gv-lx", "Google Video search"),
    ("/years/2005/sites/googlevideo/index.html", "itt05-gv-play", "Google Video play"),
    ("/years/2005/sites/earth/index.html", "itt05-earth-lx", "Google Earth leftover"),
    ("/years/2005/sites/milliondollar/index.html", "itt05-mdh-lx", "Million Dollar leftover"),
    ("/years/2005/sites/clubpenguin/index.html", "itt05-cp-lx", "Club Penguin leftover"),
    ("/years/2005/sites/firefox/index.html", "itt05-fx15-lx", "Firefox 1.5 leftover"),
    ("/years/2005/sites/kayak/index.html", "itt05-kayak-lx", "Kayak leftover"),
    ("/years/2005/sites/feedburner/index.html", "itt05-fburn-lx", "FeedBurner leftover"),
    ("/years/2005/sites/bloglines/index.html", "itt05-blines-lx", "Bloglines leftover"),
    ("/years/2005/sites/web20conference/index.html", "itt05-w20-lx", "Web 2.0 Conference"),
    ("/years/2005/sites/facebook/index.html", "itt05-fb-rename", "Facebook rename leftover"),
    ("/years/2005/sites/facebook/index.html", "itt05-fb-hs", "Facebook high school leftover"),
    # Pack B
    ("/years/2005/sites/myspace/index.html", "itt05-ms-580", "MySpace $580M leftover"),
    ("/years/2005/sites/facebook/index.html", "itt05-fb-net", "Facebook networks leftover"),
    ("/years/2005/sites/facebook/index.html", "itt05-fb-inv", "Facebook invite leftover"),
    ("/years/2005/sites/friendster/index.html", "itt05-friendster-lx", "Friendster leftover"),
    ("/years/2005/sites/gaia/index.html", "itt05-gaia-lx", "Gaia leftover"),
    ("/years/2005/sites/skype/index.html", "itt05-skype-lx", "Skype leftover"),
    ("/years/2005/sites/skype/index.html", "itt05-skype-call", "Skype call leftover"),
    ("/years/2005/sites/gmail/index.html", "itt05-gmail-lx", "Gmail invite leftover"),
    ("/years/2005/sites/google/index.html", "itt05-google-q", "Google search leftover"),
    ("/years/2005/sites/yahoo/index.html", "itt05-yahoo-lx", "Yahoo leftover"),
    ("/years/2005/sites/technorati/index.html", "itt05-techno-lx", "Technorati leftover"),
    ("/years/2005/sites/movabletype/index.html", "itt05-mt-lx", "Movable Type leftover"),
    ("/years/2005/sites/wordpress/index.html", "itt05-wp-lx", "WordPress leftover"),
    ("/years/2005/sites/blogger/index.html", "itt05-blogger-lx", "Blogger leftover"),
    ("/years/2005/sites/lastfm/index.html", "itt05-lastfm-lx", "Last.fm leftover"),
    ("/years/2005/sites/linkedin/index.html", "itt05-li-lx", "LinkedIn leftover"),
    ("/years/2005/sites/steam/index.html", "itt05-steam-lx", "Steam leftover"),
    ("/years/2005/sites/secondlife/index.html", "itt05-secondlife", "Second Life leftover"),
    ("/years/2005/sites/utorrent/index.html", "itt05-utorrent", "µTorrent leftover"),
    ("/years/2005/sites/wikipedia/index.html", "itt05-wiki-lx", "Wikipedia leftover"),
    ("/years/2005/sites/amazon/index.html", "itt05-amz-lx", "Amazon leftover"),
    ("/years/2005/sites/ebay/index.html", "itt05-ebay-lx", "eBay leftover"),
    ("/years/2005/sites/paypal/index.html", "itt05-paypal-lx", "PayPal leftover"),
    ("/years/2005/sites/cnn/index.html", "itt05-cnn-lx", "CNN leftover"),
    ("/years/2005/sites/apple/ipod.html", "itt05-ipod-lx", "iPod leftover"),
    ("/years/2005/sites/microsoft/index.html", "itt05-msft-lx", "Microsoft leftover"),
    ("/years/2005/sites/adsense/index.html", "itt05-adsense-lx", "AdSense leftover"),
    ("/years/2005/sites/slashdot/index.html", "itt05-slash-lx", "Slashdot leftover"),
    ("/years/2005/sites/metafilter/index.html", "itt05-mefi-lx", "MetaFilter leftover"),
    ("/years/2005/sites/memeorandum/index.html", "itt05-memo-lx", "Memeorandum leftover"),
    ("/years/2005/sites/daypop/index.html", "itt05-daypop-lx", "Daypop leftover"),
    ("/years/2005/sites/netflix/index.html", "itt05-nflix-dvd", "Netflix DVD leftover"),
    ("/years/2005/sites/mapquest/index.html", "itt05-mq-print", "MapQuest print leftover"),
    ("/years/2005/sites/ask/index.html", "itt05-ask-acq", "Ask/Bloglines leftover"),
    ("/years/2005/sites/android/index.html", "itt05-android-fn", "Android footnote leftover"),
    ("/years/2005/sites/facebook/index.html", "itt05-fb-accel", "Accel leftover"),
    ("/years/2005/sites/youtube/about.html", "itt05-yt-seq", "YouTube Sequoia leftover"),
    ("/years/2005/sites/youtube/about.html", "itt05-yt-dec", "YouTube Dec launch leftover"),
    ("/years/2005/sites/youtube/about.html", "itt05-yt-ind", "Independent YouTube leftover"),
    ("/years/2005/sites/myspace/index.html", "itt05-ms-lx", "MySpace leftover"),
    # Pack C
    ("/years/2005/sites/altavista/index.html", "itt05-altavista-lx", "AltaVista leftover"),
    ("/years/2005/sites/askjeeves/index.html", "itt05-jeeves-lx", "Ask Jeeves leftover"),
    ("/years/2005/sites/encarta/index.html", "itt05-encarta-lx", "Encarta leftover"),
    ("/years/2005/sites/excite/index.html", "itt05-excite-lx", "Excite leftover"),
    ("/years/2005/sites/hotbot/index.html", "itt05-hotbot-lx", "HotBot leftover"),
    ("/years/2005/sites/infoseek/index.html", "itt05-infoseek-lx", "Infoseek leftover"),
    ("/years/2005/sites/dmoz/index.html", "itt05-dmoz-lx", "DMOZ leftover"),
    ("/years/2005/sites/geocities/index.html", "itt05-geo-lx", "GeoCities leftover"),
    ("/years/2005/sites/icq/index.html", "itt05-icq-lx", "ICQ leftover"),
    ("/years/2005/sites/kazaa/index.html", "itt05-kazaa-lx", "KaZaA leftover"),
    ("/years/2005/sites/napster/index.html", "itt05-nap-ep", "Napster epitaph leftover"),
    ("/years/2005/sites/gnutella/index.html", "itt05-gnutella-lx", "Gnutella leftover"),
    ("/years/2005/sites/netscape/index.html", "itt05-netscape-lx", "Netscape leftover"),
    ("/years/2005/sites/netcenter/index.html", "itt05-netcenter-lx", "Netcenter leftover"),
    ("/years/2005/sites/aol/index.html", "itt05-aol-lx", "AOL leftover"),
    ("/years/2005/sites/mtv/index.html", "itt05-mtv-lx", "MTV leftover"),
    ("/years/2005/sites/gamespot/index.html", "itt05-gamespot-lx", "GameSpot leftover"),
    ("/years/2005/sites/wired/index.html", "itt05-wired-lx", "Wired leftover"),
    ("/years/2005/sites/wayback/index.html", "itt05-wayback-lx", "Wayback leftover"),
    ("/years/2005/sites/macromedia/index.html", "itt05-macro-lx", "Macromedia leftover"),
    ("/years/2005/sites/mozilla/index.html", "itt05-mozilla-lx", "Mozilla leftover"),
    ("/years/2005/sites/isp/index.html", "itt05-isp-lx", "ISP leftover"),
    ("/years/2005/sites/pets/index.html", "itt05-pets-ep", "Pets.com leftover"),
    ("/years/2005/sites/startupfailures/index.html", "itt05-fail-lx", "Startup-failures leftover"),
    ("/years/2005/sites/youvegotmail/index.html", "itt05-ygm-lx", "You've Got Mail leftover"),
    ("/years/2005/sites/moreover/index.html", "itt05-moreover-lx", "Moreover leftover"),
    ("/years/2005/sites/blogdex/index.html", "itt05-blogdex-lx", "Blogdex leftover"),
    ("/years/2005/sites/bowienet/index.html", "itt05-bowie-lx", "BowieNet leftover"),
    ("/years/2005/sites/phoenix/index.html", "itt05-phoenix-lx", "Phoenix leftover"),
    ("/years/2005/sites/loudcloud/index.html", "itt05-loud-lx", "Loudcloud leftover"),
    ("/years/2005/sites/zombo/index.html", "itt05-zombo-lx", "Zombo leftover"),
    ("/years/2005/sites/y2k/index.html", "itt05-y2k-ep", "Y2K leftover"),
    ("/years/2005/sites/hampsterdance/index.html", "itt05-hamp-lx", "Hampster leftover"),
    ("/years/2005/sites/googlenews/index.html", "itt05-gnews-lx", "Google News leftover"),
    ("/years/2005/sites/maps/about.html", "itt05-maps-api", "Maps API leftover"),
    ("/years/2005/sites/housingmaps/index.html", "itt05-hm-city2", "HousingMaps second city"),
    ("/years/2005/sites/reddit/submit.html", "itt05-reddit-sub", "Reddit submit leftover"),
    ("/years/2005/sites/digg/submit.html", "itt05-digg-sub", "Digg submit leftover"),
    ("/years/2005/sites/itunes/browse.html", "itt05-itunes-browse", "iTunes browse leftover"),
    ("/years/2005/sites/playable/game.html", "itt05-heli-lx", "HoverChop leftover path"),
]


def wire_trails_and_matrix() -> None:
    ft = ROOT / "js" / "config" / "flow-trails.js"
    t = ft.read_text(encoding="utf-8")
    t = t.replace('"whenKey": "itt05-game-hoverchop"', '"whenKey": "itt05-game-heli"')
    ft.write_text(t, encoding="utf-8")

    yp = ROOT / "js" / "config" / "year-playable.js"
    t = yp.read_text(encoding="utf-8")
    t = t.replace('key: "itt05-game-hoverchop"', 'key: "itt05-game-heli"')
    t = t.replace('id: "hoverchop"', 'id: "heli"')
    yp.write_text(t, encoding="utf-8")

    rows = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in rows}
    added = 0
    nxts = {
        i: (PACK_120[(i + 1) % len(PACK_120)][0], PACK_120[(i + 1) % len(PACK_120)][2])
        for i in range(len(PACK_120))
    }
    for i, (path, key, title) in enumerate(PACK_120):
        nxt, lab = nxts[i]
        dest = ROOT / path.lstrip("/")
        if not dest.exists():
            print("MISSING dest for matrix", path)
            continue
        added += append_matrix_row(rows, have, "2005", path, key, "query", title, nxt, lab)
    # drop cloned 2004 leftover rows that are not freeze keys, keep freeze + extras that still have writers
    freeze_keys = {k for _, k, _ in PACK_120}
    keep = []
    for r in rows:
        if r.get("year") != "2005":
            keep.append(r)
            continue
        if r["key"] in freeze_keys or r["key"] in {
            "itt05-maps",
            "itt05-pandora",
            "itt05-hm",
            "itt05-digg",
            "itt05-reddit",
            "itt05-flickr",
            "itt05-pod",
            "itt05-tc",
            "itt05-game-heli",
        }:
            keep.append(r)
    write_matrix(keep)
    n05 = sum(1 for r in keep if r.get("year") == "2005")
    print(f"2x 2005 freeze rows={n05} added={added} pack={len(PACK_120)}")


def write_e2e() -> None:
    write(
        ROOT / "e2e" / "2005-official-10.spec.js",
        """// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt05-yt-uploads");
    localStorage.removeItem("itt04-flickr");
    localStorage.removeItem("itt06-tweets");
  }, key);
  await page.reload();
  await page.waitForTimeout(250);
}

async function completeLo(page, key) {
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${key.replace(/^itt05-/, "")}"])`).first();
  await lo.locator("[data-lo-trap]").click();
  expect(await getKey(page, key)).toBeFalsy();
  await lo.locator("[data-lo-save]").click();
  expect(await getKey(page, key)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (nPick) {
    await lo.locator("[data-lo-save]").click();
    expect(await getKey(page, key)).toBeFalsy();
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await picks.nth(i).click();
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-save]").click();
    expect(await getKey(page, key)).toBeFalsy();
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await lo.locator("[data-lo-save]").click();
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  const blob = JSON.parse((await getKey(page, key)) || "{}");
  expect(blob.real).toBe(true);
  expect(String(blob.year)).toBe("2005");
  expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
}

test.describe("2005 official 10 · dest machines", () => {
  test("1 Upload empty / dating / Google-owned never write · ticks + title writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/youtube/upload.html", "itt05-yt-uploads");
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    const empty = JSON.parse((await getKey(page, "itt05-yt-uploads")) || "[]");
    expect(Array.isArray(empty) ? empty.some((x) => x && /residual/i.test(x.title || "")) : false).toBeFalsy();
    await page.locator("[data-yt-trap]").click();
    await page.locator("form[data-yt-dating] button[type='submit']").click();
    await page.fill("[name='title']", "Me at the zoo residual");
    await page.fill("[name='desc']", "first clip");
    const reqs = page.locator("[data-yt-req]");
    await reqs.nth(0).check();
    await reqs.nth(1).check();
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    await expect.poll(async () => {
      const raw = await getKey(page, "itt05-yt-uploads");
      const list = JSON.parse(raw || "[]");
      return Array.isArray(list) && list.some((x) => x && /residual/i.test(x.title || ""));
    }, { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    expect(await getKey(page, "itt04-thefacebook-networks")).toBeFalsy();
  });

  test("2 Maps hops · Street View trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/maps/index.html", "itt05-maps");
    await completeLo(page, "itt05-maps");
  });

  test("3 Pandora leftover · star trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/pandora/index.html", "itt05-pandora");
    await completeLo(page, "itt05-pandora");
  });

  test("4 HousingMaps ticks · live CL trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/housingmaps/index.html", "itt05-hm");
    await completeLo(page, "itt05-hm");
  });

  test("5 Digg hops · 1 hop never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/digg/index.html", "itt05-digg");
    await completeLo(page, "itt05-digg");
  });

  test("6 Reddit hops · Untitled trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/reddit/index.html", "itt05-reddit");
    await completeLo(page, "itt05-reddit");
  });

  test("7 Flickr leftover · Yahoo Photos trap · itt04-flickr empty", async ({ page }) => {
    await openClear(page, "/years/2005/sites/flickr/index.html", "itt05-flickr");
    await completeLo(page, "itt05-flickr");
    expect(await getKey(page, "itt04-flickr")).toBeFalsy();
  });

  test("8 iTunes podcasts · live store trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/itunes/podcasts.html", "itt05-pod");
    await completeLo(page, "itt05-pod");
  });

  test("9 TechCrunch leftover · star trap never writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/techcrunch/index.html", "itt05-tc");
    await completeLo(page, "itt05-tc");
  });

  test("10 HoverChop hops write itt05-game-heli", async ({ page }) => {
    await openClear(page, "/years/2005/sites/playable/game.html", "itt05-game-heli");
    await completeLo(page, "itt05-game-heli");
  });

  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/2005/pages/home.html");
    await expect(page.locator("#ott-guided-2005 ol li")).toHaveCount(6);
  });

  test("Pack A Ajax leftover is a dest machine", async ({ page }) => {
    await openClear(page, "/years/2005/sites/ajax/index.html", "itt05-ajax-lx");
    await completeLo(page, "itt05-ajax-lx");
  });
});
""",
    )


def update_docs() -> None:
    p = ROOT / "docs" / "2005-READ-FIRST.md"
    t = p.read_text(encoding="utf-8")
    t = t.replace("**Status:** **research freeze.** `years/2005/` is **absent**. Hub card **boarded**. Do **not** implement this pass. Do **not** `git checkout` the wiped tree.",
                  "**Status:** **implemented 2026-08-31.** Full-year door from 2004 scaffold. Official dests are dest machines, not Type leftover plaques. Do **not** `git checkout` the wiped tree.")
    t = t.replace("**Status:** **implemented 2026-08-31**", "**Status:** **implemented 2026-08-31**")
    p.write_text(t, encoding="utf-8")


def main() -> None:
    print("==> official 10 dest machines")
    official_dests()
    print("==> year-true + leftover strips + Pack B/C")
    year_true_and_strips()
    print("==> trails + 120 freeze matrix")
    wire_trails_and_matrix()
    print("==> e2e")
    write_e2e()
    update_docs()
    dests = [p for p in (Y / "sites").iterdir() if p.is_dir()]
    html = list(Y.rglob("*.html"))
    print(f"2005 dests={len(dests)} html={len(html)}")


if __name__ == "__main__":
    main()
