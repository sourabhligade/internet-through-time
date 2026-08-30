#!/usr/bin/env python3
"""Implement density-map holes H1 / H2 / H4 (no cap fight, no optional dests).

H1: year-true leftover button labels on dest indexes (suffixes stay).
H2: about.html leftover hops on named official dests (2006 / 2020 / 2024).
H4: list dests that already exist but home never linked.
"""
from __future__ import annotations

import json
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

# slug → leftover phrase used in button labels
PHRASE = {
    "2006": {
        "amazon": "Amazon store", "aol": "AOL screen name", "ask": "Ask leftover",
        "aws": "S3 put object", "bebo": "Bebo leftover", "calendar": "Calendar leftover",
        "delicious": "Delicious leftover", "digg": "Digg or bury", "docs": "Docs in browser",
        "ec2": "EC2 limited beta", "facebook": "News Feed leftover", "firefox": "Firefox 2 leftover",
        "flickr": "Flickr leftover", "gmail": "Gmail leftover", "huffpost": "HuffPost leftover",
        "ie7": "IE7 leftover download", "maps": "Maps leftover", "meebo": "Meebo leftover",
        "msn": "MSN leftover", "myspace": "MySpace leftover", "newsvine": "Newsvine leftover",
        "reader": "Reader unread", "reddit": "Reddit leftover boost", "secondlife": "Second Life leftover",
        "skype": "Skype leftover", "slideshare": "SlideShare leftover", "time-you": "Time You issue",
        "twitter": "Twitter 140 leftover", "wikileaks": "WikiLeaks leftover",
        "wikipedia": "Wikipedia leftover", "wordpress": "WordPress leftover", "youtube": "YouTube leftover",
    },
    "2016": {
        "allo": "Allo leftover", "alphago": "AlphaGo leftover", "assistant": "Ok Google leftover",
        "dyn": "Dyn leftover", "e2eabout": "E2E leftover about", "fblive": "FB Live leftover",
        "houseparty": "Houseparty leftover", "inbox": "Inbox leftover", "iphone": "iPhone 7 leftover",
        "iphone7about": "iPhone 7 leftover about", "jio": "Jio leftover", "linkedinms": "LinkedIn leftover",
        "moments": "Moments leftover", "musically": "musical.ly leftover", "netflix": "Netflix leftover",
        "note7": "Note 7 leftover", "pogoabout": "GO leftover about", "pokemongo": "Pokémon GO leftover",
        "reactabout": "Reactions leftover about", "reddit": "Reddit leftover", "slack": "Slack leftover",
        "smario": "Mario Run leftover", "snapchat": "Snap leftover", "spectabout": "Spectacles leftover about",
        "storyabout": "Stories leftover about", "superbowl": "Super Bowl leftover",
        "vine": "Vine leftover", "win10end": "Win10 leftover end",
    },
    "2020": {
        "acnh": "ACNH leftover", "amongus": "Among Us leftover literacy", "astro": "Astronomical leftover",
        "ccpa": "Do Not Sell leftover", "chrome": "Chrome habit leftover", "clubhouse": "Clubhouse leftover",
        "discord": "Discord leftover", "disneyplus": "Disney+ residual leftover",
        "edge": "Edge leftover", "epic": "Epic leftover", "exposure": "EN leftover",
        "facebook": "Facebook leftover", "fallguys": "Fall Guys leftover", "flash": "Flash EOL leftover",
        "fleets": "Fleets leftover", "hbomax": "HBO Max leftover", "ios14": "iOS 14 leftover",
        "iphone12": "iPhone 12 leftover", "meet": "Meet leftover 29 Apr", "mixer": "Mixer sunset leftover",
        "openai": "GPT-3 waitlist leftover", "peacock": "Peacock leftover", "ps5": "PS5 leftover queue",
        "quest2": "Quest 2 leftover", "quibi": "Quibi leftover", "reels": "Reels 15s leftover",
        "schrems": "Schrems leftover", "shop": "Shop leftover", "spacehey": "SpaceHey leftover",
        "stimulus": "Get My Payment leftover", "teams": "Teams leftover",
        "teamsschool": "Teams school leftover", "tiktok": "TikTok EO leftover",
        "wikipedia": "Wikipedia leftover", "youtube": "Shorts leftover", "zoom": "Zoom leftover",
        "zoombomb": "Zoom-bomb leftover",
    },
    "2024": {
        "appleintel": "Apple Intelligence leftover", "artifacts": "Artifacts leftover",
        "astra": "Astra leftover", "bluesky": "Bluesky leftover", "canvas": "Canvas leftover",
        "chrome": "Chrome habit leftover", "claude2": "Claude 2 residual leftover",
        "claude35": "Claude 3.5 leftover", "computeruse": "Computer Use leftover",
        "devin": "Devin leftover", "facebook": "Facebook leftover", "flux": "Flux leftover",
        "gemflash": "Gemini Flash leftover", "gemini": "Gemini leftover", "gen3": "Gen-3 leftover",
        "grok": "Grok leftover", "lensa": "Lensa leftover", "llama3": "Llama 3 leftover",
        "llama31": "Llama 3.1 leftover", "luma": "Luma leftover", "memory": "Memory leftover",
        "midjourney": "Midjourney leftover", "mini": "4o mini leftover",
        "notebooklm": "NotebookLM leftover", "o1": "o1 leftover", "o1mini": "o1-mini leftover",
        "orion": "Orion leftover", "perplexity": "Perplexity leftover", "rabbit": "Rabbit leftover",
        "recall": "Recall leftover", "search": "ChatGPT Search leftover", "sora": "Sora preview leftover",
        "store": "GPT Store leftover", "suno": "Suno leftover", "threads": "Threads leftover",
        "tiktok": "TikTok leftover", "udio": "Udio leftover", "veo": "Veo leftover",
        "visionpro": "Vision Pro leftover", "voice": "Voice leftover",
        "wikipedia": "Wikipedia leftover", "win11": "Win11 residual leftover",
        "youtube": "YouTube leftover",
    },
}

EXACT = (
    "Save leftover",
    "Type leftover",
    "Do leftover",
    "Second leftover pack",
    "Ack leftover",
    "Hop leftover",
    "Open leftover",
)

ABOUTS = [
    # year, slug, suf, title, body, hop_a, hop_b, trap, nxt, nxt_label
    ("2006", "docs", "docs-ab", "Docs leftover about — 10 Oct 2006",
     "Writely bought 9 Mar. Docs & Spreadsheets <b>10 Oct</b>. Type in the browser. Not Twitter gold.",
     "Note leftover 10 Oct", "Ack leftover browser doc", "Desktop Office only (trap)",
     "../aws/index.html", "AWS leftover"),
    ("2006", "aws", "aws-ab", "AWS leftover about — 14 Mar 2006",
     "S3 <b>14 Mar</b> · $0.15/GB-month. Developers, not shoppers. Not Twitter gold.",
     "Note leftover S3 price", "Ack leftover put object", "Consumer AWS console (trap)",
     "../reader/index.html", "Reader leftover"),
    ("2006", "reader", "rd-ab", "Reader leftover about — 2006",
     "Google Reader leftover. RSS in a Gmail-ish shell. Feedly is 2013.",
     "Note leftover unread", "Ack leftover Reader", "This is Feedly (trap)",
     "../time-you/index.html", "Time You leftover"),
    ("2006", "time-you", "ty-ab", "Time You leftover about — Dec 2006",
     "*You* Person of the Year leftover. User-generated web. Not Twitter gold. No invented cover.",
     "Note leftover December", "Ack leftover You", "Invented Time cover (trap)",
     "../reddit/index.html", "Reddit leftover"),
    ("2006", "reddit", "rdit-ab", "Reddit leftover about — 2006",
     "Reddit leftover sparse front. Still small next to Digg. Not Twitter gold.",
     "Note leftover boost", "Ack leftover 2006", "Awards / 2020 redesign (trap)",
     "../digg/index.html", "Digg leftover"),
    ("2006", "digg", "dg-ab", "Digg leftover about — 2006",
     "Digg leftover. Peak year. Bury is real. Not Twitter gold.",
     "Note leftover bury", "Ack leftover Digg", "iPhone story (trap)",
     "../youtube/index.html", "YouTube leftover"),
    ("2006", "youtube", "yt-ab", "YouTube leftover about — independent until Oct",
     "YouTube leftover. Independent until <b>9 Oct</b>. Close 13 Nov. Brand stays YouTube.",
     "Note leftover independent", "Ack leftover Oct 9", "Google Video is the gold (trap)",
     "../twitter/index.html", "★ Twitter 140"),
    ("2006", "ie7", "ie7-ab", "IE7 leftover about — 18 Oct 2006",
     "IE7 leftover download. Mass default stays IE6. Not January chrome.",
     "Note leftover 18 Oct", "Ack leftover download", "IE7 is the January shell (trap)",
     "../twitter/index.html", "★ Twitter 140"),
    ("2020", "meet", "meet-ab", "Meet leftover about — 29 Apr 2020",
     "Meet free leftover. 60 min after 30 Sep. Did not replace Zoom.",
     "Note leftover 29 Apr", "Ack leftover 60 min", "Meet replaced Zoom (trap)",
     "../mixer/index.html", "Mixer leftover"),
    ("2020", "mixer", "mix-ab", "Mixer leftover about — 22 Jul 2020",
     "Mixer sunset leftover. Not 2021 live. Not the Zoom chip.",
     "Note leftover 22 Jul", "Ack leftover sunset", "Mixer is live 2021 (trap)",
     "../hbomax/index.html", "HBO Max leftover"),
    ("2020", "hbomax", "hbo-ab", "HBO Max leftover about — 27 May 2020",
     "HBO Max leftover. $14.99. Not free Friends. Not the Zoom chip.",
     "Note leftover 27 May", "Ack leftover $14.99", "Free Friends / official key art (trap)",
     "../quibi/index.html", "Quibi leftover"),
    ("2020", "quibi", "qb-ab", "Quibi leftover about — Apr–Oct 2020",
     "Quibi leftover. 6 Apr launch · 21 Oct shut. Not the Zoom chip.",
     "Note leftover 6 Apr", "Ack leftover 21 Oct", "Quibi won (trap)",
     "../peacock/index.html", "Peacock leftover"),
    ("2020", "peacock", "pc-ab", "Peacock leftover about — 15 Jul 2020",
     "Peacock leftover. Not 2021 gold. Not the Zoom chip.",
     "Note leftover 15 Jul", "Ack leftover Peacock", "Peacock is 2021 gold (trap)",
     "../clubhouse/index.html", "Clubhouse leftover"),
    ("2020", "clubhouse", "cl-ab", "Clubhouse leftover about — 2020 invite",
     "Clubhouse leftover invite. Mass is 2021. Not the Zoom chip.",
     "Note leftover invite", "Ack leftover 2020", "Clubhouse is 2020 mass gold (trap)",
     "../fleets/index.html", "Fleets leftover"),
    ("2020", "fleets", "fl-ab", "Fleets leftover about — 17 Nov 2020",
     "Twitter Fleets leftover. Dies 3 Aug 2021. Not Stories forever. Not the Zoom chip.",
     "Note leftover 17 Nov", "Ack leftover 24h", "Fleets are Stories forever (trap)",
     "../teams/index.html", "Teams leftover"),
    ("2020", "teams", "tm-ab", "Teams leftover about — 29 Apr 2020",
     "Teams leftover. 75M DAU class. Did not replace Zoom.",
     "Note leftover 29 Apr", "Ack leftover Teams", "Teams replaced Zoom (trap)",
     "../ps5/index.html", "PS5 leftover"),
    ("2020", "ps5", "ps-ab", "PS5 leftover about — 12 Nov 2020",
     "PS5 leftover sold-out queue. $399 / $499. Xbox Series X honesty lives here. Not the Zoom chip.",
     "Note leftover 12 Nov", "Ack leftover queue", "You bought one (trap)",
     "../quest2/index.html", "Quest 2 leftover"),
    ("2020", "quest2", "q2-ab", "Quest 2 leftover about — 13 Oct 2020",
     "Quest 2 leftover. Not metaverse 2021 gold. Not the Zoom chip.",
     "Note leftover 13 Oct", "Ack leftover headset", "Metaverse 2021 gold (trap)",
     "../zoom/meeting.html", "★ Zoom"),
    ("2024", "store", "st-ab", "GPT Store leftover about — 10 Jan 2024",
     "GPT Store leftover. Custom GPTs were DevDay 2023. Not 4o gold.",
     "Note leftover 10 Jan", "Ack leftover Store", "DevDay 2023 is this dest (trap)",
     "../sora/index.html", "Sora leftover"),
    ("2024", "sora", "so-ab", "Sora leftover about — 15 Feb 2024 preview",
     "Sora preview leftover. Public mass 9 Dec is not this save. Not 4o gold.",
     "Note leftover 15 Feb", "Ack leftover preview", "Public mass Sora is this save (trap)",
     "../gemini/index.html", "Gemini leftover"),
    ("2024", "gemini", "gm-ab", "Gemini leftover about — 8 Feb 2024",
     "Bard becomes Gemini leftover. Bard is the 2023 name. Not 4o gold.",
     "Note leftover 8 Feb", "Ack leftover rename", "Bard is the 2024 name (trap)",
     "../claude35/index.html", "Claude 3.5 leftover"),
    ("2024", "claude35", "c35-ab", "Claude 3.5 leftover about — 20 Jun 2024",
     "Claude 3.5 leftover. Claude 2 is 2023. Not 4o gold.",
     "Note leftover 20 Jun", "Ack leftover Sonnet", "Claude 2 is 2024 gold (trap)",
     "../o1/index.html", "o1 leftover"),
    ("2024", "o1", "o1-ab", "o1 leftover about — 12 Sep 2024",
     "o1-preview leftover. Thinks before it answers. Not 4o gold.",
     "Note leftover 12 Sep", "Ack leftover preview", "o1 is the year gold (trap)",
     "../visionpro/index.html", "Vision Pro leftover"),
    ("2024", "visionpro", "vp-ab", "Vision Pro leftover about — 2 Feb 2024 ship",
     "Vision Pro US ship leftover. Announce was WWDC 2023. Not 4o gold.",
     "Note leftover 2 Feb", "Ack leftover ship", "WWDC announce is this dest (trap)",
     "../grok/index.html", "Grok leftover"),
    ("2024", "grok", "gk-ab", "Grok leftover about — 2024 dest",
     "Grok 2024 leftover dest. 2023 announce is a different year. Not 4o gold.",
     "Note leftover 2024 dest", "Ack leftover Grok", "2023 announce is this dest (trap)",
     "../search/index.html", "Search leftover"),
    ("2024", "search", "cs-ab", "ChatGPT Search leftover about — 31 Oct 2024",
     "ChatGPT Search leftover. SearchGPT 25 Jul is the trap, not this dest.",
     "Note leftover 31 Oct", "Ack leftover Search", "SearchGPT 25 Jul is this dest (trap)",
     "../recall/index.html", "Recall leftover"),
    ("2024", "recall", "rc-ab", "Recall leftover about — 20 May 2024",
     "Copilot+ Recall leftover. Delay honesty. Not 4o gold.",
     "Note leftover 20 May", "Ack leftover delay", "18 Jun preview is this save (trap)",
     "../notebooklm/index.html", "NotebookLM leftover"),
    ("2024", "notebooklm", "nb-ab", "NotebookLM leftover about — 6 Jun 2024",
     "NotebookLM leftover. 8 Dec 2023 US is not 2024 mass gold. Not 4o gold.",
     "Note leftover 6 Jun", "Ack leftover NotebookLM", "2023 US launch is this dest (trap)",
     "../chatgpt/4o.html", "★ GPT-4o Talk"),
]

PREFIX = {"2006": "06", "2020": "20", "2024": "24"}
STAR = {
    "2006": "sites/twitter/index.html",
    "2020": "sites/zoom/meeting.html",
    "2024": "sites/chatgpt/4o.html",
}


def relabel_h1() -> int:
    n = 0
    for year, phrases in PHRASE.items():
        for slug, phrase in phrases.items():
            p = ROOT / f"years/{year}/sites/{slug}/index.html"
            if not p.is_file():
                continue
            t = p.read_text(encoding="utf-8")
            orig = t
            repl = {
                "Save leftover": f"Note leftover {phrase}",
                "Type leftover": f"Type leftover {phrase}",
                "Do leftover": f"Note leftover {phrase}",
                "Second leftover pack": f"Note leftover {phrase}",
                "Ack leftover": f"Ack leftover {phrase}",
                "Hop leftover": f"Hop leftover {phrase}",
                "Open leftover": f"Open leftover {phrase}",
            }
            for old, new in repl.items():
                t = t.replace(f">{old}<", f">{new}<")
            if t != orig:
                p.write_text(t, encoding="utf-8")
                n += 1
    return n


def about_html(d: tuple) -> str:
    year, slug, suf, title, body, hop_a, hop_b, trap, nxt, nxt_label = d
    yy = PREFIX[year]
    key = f"itt{yy}-{suf}"
    d2 = f"{suf}-d2"
    key2 = f"itt{yy}-{d2}"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="index.html">{slug} leftover</a> · leftover, not the chip</p>
<h1>{title}</h1>
<p>{body}</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<p><button type="button" data-4x-trap data-official-trap>{trap}</button></p>
</div>
<!-- ITT-4X:{suf}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="hops" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><button type="button" data-4x-hop="a">{hop_a}</button> <button type="button" data-4x-hop="b">{hop_b}</button></p>
<p><button type="button" data-4x-go="{suf}">{hop_a}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_label}</a></p>
</section>
<!-- ITT-4X:{suf}:end -->
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:{d2}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · {slug} about d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Second leftover note<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover about"></label></p>
<p><button type="button" data-4x-go="{d2}">Note leftover {slug} about</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="{key2}"><b>Next:</b> <a href="{nxt}">{nxt_label}</a></p>
</section>
<!-- ITT-4X:{d2}:end -->
</body>
</html>
"""


def write_abouts() -> int:
    matrix_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(matrix_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in rows}
    written = 0
    by_year: dict[str, list[tuple[str, str]]] = {}
    rooms: dict[str, list[str]] = {}
    maps: dict[str, list[str]] = {}
    sitemap_add = []
    for d in ABOUTS:
        year, slug, suf, title, body, hop_a, hop_b, trap, nxt, nxt_label = d
        dest = ROOT / f"years/{year}/sites/{slug}/about.html"
        if write_if_missing(dest, about_html(d)):
            written += 1
        yy = PREFIX[year]
        key = f"itt{yy}-{suf}"
        key2 = f"itt{yy}-{suf}-d2"
        path = f"/years/{year}/sites/{slug}/about.html"
        # nxt may be relative from dest folder
        if nxt.startswith("../"):
            nxt_abs = str((Path(f"/years/{year}/sites/_") / nxt).resolve())
        else:
            nxt_abs = f"/years/{year}/sites/{slug}/{nxt}"
        append_matrix_row(rows, have, year, path, key, "hops", title, nxt_abs, nxt_label)
        append_matrix_row(rows, have, year, path, key2, "query", f"{year} leftover · {slug} about d2", nxt_abs, nxt_label)
        by_year.setdefault(year, []).append((f"{slug}/about.html", suf))
        rooms.setdefault(year, []).append(f"sites/{slug}/about.html")
        maps.setdefault(year, []).append(
            f'<li><a href="../sites/{slug}/about.html">{title}</a> — leftover about · not the chip</li>'
        )
        sitemap_add.append(path)
    matrix_path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    for year, slugs in by_year.items():
        prepend_rooms(year, rooms[year])
        # home strip uses slug/index — custom strip for about pages
        home = ROOT / f"years/{year}/pages/home.html"
        if home.exists():
            ht = home.read_text(encoding="utf-8")
            mark = f"ITT-2X-{year}-ABOUT"
            links = " · ".join(
                f'<a href="../sites/{slug}" data-trail-keys="itt{PREFIX[year]}-{suf}">{slug.replace("/about.html", " about")}</a>'
                for slug, suf in slugs
            )
            strip = (
                f"<!-- {mark}:start -->\n"
                f'<p class="itt-2x-trails" id="ott-2x-{year}-about" '
                'style="margin:10px auto;padding:10px;background:#fff3e0;border:1px solid #ef6c00;'
                'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
                f"<b>More {year} leftover about dests</b> (not the chip · incomplete never writes): "
                + links
                + f' · <a href="../{STAR[year]}">★ year star</a></p>\n'
                f"<!-- {mark}:end -->\n"
            )
            if f"{mark}:start" in ht:
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
        add_map_block(year, maps[year])
    sm = ROOT / "sitemap.txt"
    t = sm.read_text(encoding="utf-8")
    extra = [p for p in sitemap_add if p not in t]
    if extra:
        if not t.endswith("\n"):
            t += "\n"
        sm.write_text(t + "\n".join(extra) + "\n", encoding="utf-8")
    return written


def h4_list() -> None:
    injects = {
        "2006": (
            "H4-2006",
            '<a href="../sites/playable/extra-f.html">playable extra f</a> · '
            '<a href="../sites/playable/extra-g.html">extra g</a> · '
            '<a href="../sites/playable/extra-h.html">extra h</a> · '
            '<a href="../sites/playable/extra-i.html">extra i</a>',
        ),
        "2007": (
            "H4-2007",
            '<a href="../sites/yahoo/index.html">Yahoo leftover</a> · '
            '<a href="../sites/wikipedia/index.html">Wikipedia leftover</a> · '
            '<a href="../sites/amazon/index.html">Amazon leftover</a> · '
            '<a href="../sites/playable/famous.html">Famous leftover</a> · '
            '<a href="../sites/playable/extra-f.html">extra f</a> · '
            '<a href="../sites/playable/extra-g.html">extra g</a> · '
            '<a href="../sites/playable/extra-h.html">extra h</a> · '
            '<a href="../sites/playable/extra-i.html">extra i</a>',
        ),
        "2020": (
            "H4-2020",
            '<a href="../sites/school20/index.html">School leftover</a> · '
            '<a href="../sites/zoombomb/index.html">Zoom-bomb leftover</a> · '
            '<a href="../sites/teamsschool/index.html">Teams school leftover</a>',
        ),
        "2024": (
            "H4-2024",
            '<a href="../sites/win11/index.html">Win11 residual leftover</a>',
        ),
    }
    for year, (mark, links) in injects.items():
        home = ROOT / f"years/{year}/pages/home.html"
        if not home.exists():
            continue
        ht = home.read_text(encoding="utf-8")
        strip = (
            f"<!-- {mark}:start -->\n"
            f'<p class="itt-2x-trails" id="ott-h4-{year}" '
            'style="margin:10px auto;padding:10px;background:#e8eaf6;border:1px solid #3949ab;'
            'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
            f"<b>Also listed leftover dests</b> (already on disk · not the chip): {links}</p>\n"
            f"<!-- {mark}:end -->\n"
        )
        if f"{mark}:start" in ht:
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


def main() -> None:
    n1 = relabel_h1()
    n2 = write_abouts()
    h4_list()
    print(f"H1 dests relabeled={n1} · H2 abouts written={n2} · H4 listed")


if __name__ == "__main__":
    main()
