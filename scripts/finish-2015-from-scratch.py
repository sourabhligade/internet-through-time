#!/usr/bin/env python3
"""Finish 2015 from-scratch: leftover dests, leftover fields, rooms, start-extra."""
from __future__ import annotations

import re
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

OFFICIAL_REL = {
    "sites/periscope/index.html",
    "sites/periscope/watch.html",
    "sites/googlephotos/index.html",
    "sites/googlephotos/library.html",
    "sites/windows10/index.html",
    "sites/windows10/upgrade.html",
    "sites/applemusic/index.html",
    "sites/applemusic/beats1.html",
    "sites/edge/index.html",
    "sites/apple/watch.html",
    "sites/apple/faces.html",
    "sites/apple/pair.html",
    "sites/snapchat/discover.html",
    "sites/discord/index.html",
    "sites/letsencrypt/index.html",
    "sites/playable/game.html",
}

LEFTOVER_COPY = {
    "instagram": "2015 square feed leftover. Caption a leftover share. Empty never writes. Instagram Stories are 9 Aug 2016.",
    "spotify": "2015 residual play leftover. Type a leftover track. Empty never writes. 2011 is not this year's gold.",
    "netflix": "2015 leftover play. Type a leftover title. Empty never writes. Disney+ is 2019.",
    "discordabout": "Leftover Discord path. Official join is discord/. Completing leftover never writes itt15-discord.",
    "echo": "Mass $179.99 leftover. 23 Jun order / 14 Jul ship. Reverse of the 2014 invite. Not the chip.",
    "snapchat": "2015 leftover. Discover (27 Jan) is the official dest. Stories-as-gold is 2013/2016, not this chip.",
    "meerkat": "SXSW leftover. Twitter cut the graph. Not a second Go LIVE. Completing leftover never writes itt15-periscope.",
    "leabout": "Leftover Let's Encrypt path. Official hostname request is letsencrypt/. Never writes itt15-le.",
    "vine": "Vine is still alive in 2015. Loop leftover. Vine-gone is 2016.",
    "adblock": "iOS 9 content-blocker leftover path. Settings → Safari. Official literacy is ios9/blockers.",
    "agario": "agar.io site leftover. Year game is still Blob Rush. slither.io is 2016.",
    "amppage": "AMP announce leftover (7 Oct). SERP habit is 2016. Not a 2015 gold.",
    "apple": "Apple leftover more. Watch ships Apr 24 as leftover hardware — not the chip.",
    "musicabout": "Leftover Music path. Official 3-month trial is applemusic/. Never writes itt15-applemusic.",
    "edgeabout": "Leftover Edge path. Official Spartan tick is edge/. Not Chromium (2020).",
    "fblive": "5 Aug 2015 Mentions leftover. Celebs / verified Pages only. Not your Go LIVE.",
    "iphone": "iPhone 6s leftover. 9 Sep announce / 25 Sep. 3D Touch leftover. Not the chip. Face ID is 2017.",
    "secret": "Secret shutdown leftover. Apr 29 2015. No dump. Not the chip.",
    "instant": "Instant Articles leftover (May). Lives inside Facebook. Not a 2015 gold.",
    "titleii": "26 Feb 2015 FCC 3–2 leftover. Open Internet / Title II. Civic leftover, not a game.",
    "swiftoss": "3 Dec 2015 Swift OSS leftover. Not the Let's Encrypt cert room.",
    "waweb": "21 Jan 2015 Chrome QR leftover. Phone must stay on. Not iOS day one. Not itt14-wa-install.",
    "win10get": "GWX tray leftover. Official reserve is windows10/. Completing leftover never writes itt15-win10.",
    "w10about": "Leftover Win10 path. Official free-upgrade reserve is windows10/.",
    "photosabout": "Leftover Photos path. Official backup is googlephotos/. Never writes itt15-googlephotos.",
    "periabout": "Leftover Periscope path. Official Go LIVE is periscope/. Never writes itt15-periscope.",
    "ytgaming": "YouTube Gaming leftover (2015). Not the year game. Not the chip.",
    "meerkatlive": "Meerkat leftover live path. Not a second Periscope. Empty leftover never writes.",
    "applemusicsub": "Apple Music leftover trial note. Official trial is applemusic/. Never writes itt15-applemusic.",
}


def lo_panel(slug: str, next_href: str, next_label: str) -> str:
    if slug in OFFICIAL_SUFFIXES:
        raise SystemExit(f"leftover slug collides with official: {slug}")
    return f"""<section data-lo-panel="1" data-itt-year="2015" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2×</b> · 2015 leftover · {slug} · not the chip · incomplete never writes · <code>itt15-{slug}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty / 0 ticks never write.</label>
<p><input data-lo-field placeholder="leftover note (not the star)" maxlength="80"></p>
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


def page(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2015">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2015.css">
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
    crumb = (
        '<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · '
        '<a href="../../pages/about.html">About 2015</a> · '
        '<a href="../periscope/index.html">★ Periscope</a></p>'
    )
    body = f"""<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{crumb}
<h1>{title}</h1>
<p>{copy}</p>
<p class="itt-pixel-failed">[failed-final] period wordmark · never invent the mark</p>
<p><a href="{nxt}">{nxt_label}</a></p>
{lo_panel(slug, nxt, nxt_label)}
</div>"""
    (dest / file).write_text(page(title + " — 2015", body), encoding="utf-8")


def leftover_about(folder: str, slug: str) -> None:
    dest = Y / "sites" / folder
    dest.mkdir(parents=True, exist_ok=True)
    p = dest / "about.html"
    if p.exists():
        return
    leftover_dest(
        folder,
        "about.html",
        f"{folder} leftover about",
        "Leftover about path. Not the chip. Empty leftover never writes.",
        slug,
        "index.html",
        "Leftover dest",
    )


def add_missing_dests() -> None:
    leftover_dest(
        "iphone",
        "index.html",
        "iPhone 6s leftover",
        LEFTOVER_COPY["iphone"],
        "6s-lx",
        "../periscope/index.html",
        "★ Periscope",
    )
    leftover_about("iphone", "iphone-ab")
    leftover_dest(
        "meerkatlive",
        "index.html",
        "Meerkat leftover live",
        LEFTOVER_COPY["meerkatlive"],
        "meerkat-live",
        "../meerkat/index.html",
        "Meerkat leftover",
    )
    leftover_about("meerkatlive", "meerkatlive-ab")
    leftover_dest(
        "applemusicsub",
        "index.html",
        "Apple Music leftover trial note",
        LEFTOVER_COPY["applemusicsub"],
        "am-sub",
        "../applemusic/index.html",
        "Apple Music official",
    )
    leftover_about("applemusicsub", "applemusicsub-ab")


FIELD_SNIP = (
    '<p><input data-lo-field placeholder="leftover note (not the star)" maxlength="80"></p>\n'
    "<p>\n"
    ' <button type="button" data-lo-pick="keep">'
)


def deepen_leftover() -> int:
    n = 0
    for html in (Y / "sites").rglob("*.html"):
        rel = html.relative_to(Y).as_posix()
        if rel in OFFICIAL_REL:
            continue
        if html.parent.name == "playable":
            continue
        t = html.read_text(encoding="utf-8")
        orig = t
        folder = html.parent.name
        if folder in LEFTOVER_COPY and html.name == "index.html":
            copy = LEFTOVER_COPY[folder]
            def _repl(m, c=copy):
                return m.group(1) + c + m.group(3)

            t = re.sub(r"(<h1>[^<]*</h1>\s*<p>)([^<]*)(</p>)", _repl, t, count=1)
        if "data-lo-field" not in t and "data-lo-save" in t:
            t = t.replace(
                "<p>\n <button type=\"button\" data-lo-pick=\"keep\">",
                FIELD_SNIP,
                1,
            )
        if t != orig:
            html.write_text(t, encoding="utf-8")
            n += 1
    return n


def regen_rooms() -> int:
    rooms = []
    for p in sorted((Y).rglob("*.html")):
        rel = p.relative_to(Y).as_posix()
        if rel == "index.html":
            continue
        rooms.append(rel)
    cfg = ROOT / "js" / "config" / "2015.js"
    src = cfg.read_text(encoding="utf-8")
    rooms_js = ",\n".join(f'    "{r}"' for r in rooms)
    src = re.sub(
        r"var rooms = \[[\s\S]*?\];",
        "var rooms = [\n" + rooms_js + "\n  ];",
        src,
        count=1,
    )
    src = src.replace(
        '      { re: /peach/i, path: "sites/peach/index.html" },\n',
        "",
    )
    if "meerkatlive" not in src:
        src = src.replace(
            '      { re: /echo|alexa/i, path: "sites/echo/index.html" }',
            '      { re: /meerkat.?live/i, path: "sites/meerkatlive/index.html" },\n'
            '      { re: /music.?sub|trial.?note/i, path: "sites/applemusicsub/index.html" },\n'
            '      { re: /iphone.?6s|3d.?touch/i, path: "sites/iphone/index.html" },\n'
            '      { re: /echo|alexa/i, path: "sites/echo/index.html" }',
        )
    cfg.write_text(src, encoding="utf-8")
    return len(rooms)


def retarget_start_extra() -> None:
    p = ROOT / "ui" / "year" / "start-extra.js"
    t = p.read_text(encoding="utf-8")
    t = t.replace("../sites/peach/index.html", "../sites/vine/index.html")
    t = t.replace(">peach leftover<", ">vine leftover<")
    t = t.replace(">Peach leftover<", ">Vine leftover<")
    t = t.replace("../sites/watchabout/index.html", "../sites/apple/about.html")
    t = t.replace(">Watch</a>", ">Watch leftover about</a>")
    t = t.replace("../sites/discoverabout/index.html", "../sites/snapchat/about.html")
    t = t.replace(">Discover</a>", ">Snap leftover about</a>")
    p.write_text(t, encoding="utf-8")


def main() -> None:
    add_missing_dests()
    deepened = deepen_leftover()
    nrooms = regen_rooms()
    retarget_start_extra()
    dests = [p.name for p in (Y / "sites").iterdir() if p.is_dir()]
    html = list(Y.rglob("*.html"))
    print(f"dests {len(dests)} html {len(html)} rooms {nrooms} deepened {deepened}")


if __name__ == "__main__":
    main()
