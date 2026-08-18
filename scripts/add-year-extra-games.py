#!/usr/bin/env python3
"""OBSOLETE pack stubs. Minute extras are built by scripts/build-year-extra-minute.py."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = [str(y) for y in range(1994, 2019)]

# Two extras per year. IDs must not collide with game.html / game-2…5 pack ids.
EXTRAS: dict[str, list[dict]] = {
    "1994": [
        {"id": "mosaicgif", "title": "Mosaic inline GIF", "goal": "Buffer the inline GIF before the 14.4k dies.", "act": "Buffer", "need": 4, "phrase": "mosaic", "next": "../ncsa/index.html", "nl": "NCSA Mosaic", "why": "Inline images were the first web toy."},
        {"id": "yahoocat", "title": "Yahoo catalog hop", "goal": "Open two Yahoo categories. Type computers.", "act": "Open category", "need": 2, "phrase": "computers", "next": "../yahoo/index.html", "nl": "Yahoo! 1994", "why": "The catalog was the game."},
    ],
    "1995": [
        {"id": "geosign", "title": "GeoCities sign-in", "goal": "Sign the homestead guestbook twice.", "act": "Sign", "need": 2, "phrase": "hello", "next": "../geocities/index.html", "nl": "GeoCities", "why": "Homestead guestbooks were the social game."},
        {"id": "altahit", "title": "AltaVista hit", "goal": "Run two AltaVista queries.", "act": "Search", "need": 2, "phrase": "web", "next": "../altavista/index.html", "nl": "AltaVista", "why": "Full-text search felt like magic."},
    ],
    "1996": [
        {"id": "mailsend", "title": "HoTMaiL send", "goal": "Address two web-mail notes.", "act": "Send", "need": 2, "phrase": "inbox", "next": "../hotmail/index.html", "nl": "HoTMaiL", "why": "Mail in the browser was the 1996 toy."},
        {"id": "jamshot", "title": "Space Jam hoop", "goal": "Take two hoop shots on the hub.", "act": "Shoot", "need": 2, "phrase": "jam", "next": "../spacejam/index.html", "nl": "Space Jam", "why": "The site was the playground."},
    ],
    "1997": [
        {"id": "ebayraise", "title": "eBay raise", "goal": "Raise twice. Type bid. No real money.", "act": "Raise", "need": 2, "phrase": "bid", "next": "../ebay/index.html", "nl": "eBay 1997", "why": "AuctionWeb became eBay. Bidding was the sport."},
        {"id": "icqping", "title": "ICQ ping", "goal": "Ping a UIN twice.", "act": "Ping", "need": 2, "phrase": "uin", "next": "../icq/index.html", "nl": "ICQ", "why": "The number was the identity."},
    ],
    "1998": [
        {"id": "luckygo", "title": "Lucky jump", "goal": "Hit I’m Feeling Lucky twice.", "act": "Lucky", "need": 2, "phrase": "yahoo", "next": "../google/lucky.html", "nl": "Google Lucky", "why": "One button skipped the directory."},
        {"id": "mozmile", "title": "Mozilla milestone", "goal": "Open two mozilla.org notes.", "act": "Open", "need": 2, "phrase": "mozilla", "next": "../mozilla/index.html", "nl": "mozilla.org", "why": "The lizard was the other browser war."},
    ],
    "1999": [
        {"id": "napsearch", "title": "Napster search", "goal": "Search twice. No real share.", "act": "Search", "need": 2, "phrase": "mp3", "next": "../napster/index.html", "nl": "Napster", "why": "The query was the scare."},
        {"id": "aimaway", "title": "AIM away", "goal": "Set away twice.", "act": "Away", "need": 2, "phrase": "away", "next": "../aim/index.html", "nl": "AIM", "why": "Idle was a status sport."},
    ],
    "2000": [
        {"id": "mqdrive", "title": "MapQuest print", "goal": "Print two turn lists. No live tiles.", "act": "Print", "need": 2, "phrase": "route", "next": "../mapquest/index.html", "nl": "MapQuest", "why": "You printed the web to drive."},
        {"id": "petsock", "title": "Pets.com sock", "goal": "Wave the sock puppet twice. Residual only.", "act": "Wave", "need": 2, "phrase": "sock", "next": "../pets/index.html", "nl": "Pets.com", "why": "The crash year still had a puppet."},
    ],
    "2001": [
        {"id": "wikiprev", "title": "Wiki preview", "goal": "Preview two edits. No live wiki.", "act": "Preview", "need": 2, "phrase": "edit", "next": "../wikipedia/index.html", "nl": "Wikipedia", "why": "Anyone can edit — preview first."},
        {"id": "ipodclick", "title": "iPod click wheel", "goal": "Scroll the wheel twice.", "act": "Scroll", "need": 2, "phrase": "wheel", "next": "../apple/ipod.html", "nl": "iPod", "why": "1,000 songs. The wheel was the toy."},
    ],
    "2002": [
        {"id": "stumble2", "title": "Stumble twice", "goal": "Stumble two pages.", "act": "Stumble", "need": 2, "phrase": "stumble", "next": "../stumbleupon/index.html", "nl": "StumbleUpon", "why": "The next button was the feed."},
        {"id": "kazaafind", "title": "KaZaA find", "goal": "Search twice. No real share.", "act": "Find", "need": 2, "phrase": "mp3", "next": "../kazaa/index.html", "nl": "KaZaA", "why": "P2P after Napster."},
    ],
    "2003": [
        {"id": "top8swap", "title": "Top 8 swap", "goal": "Swap two Top 8 slots.", "act": "Swap", "need": 2, "phrase": "top8", "next": "../myspace/index.html", "nl": "MySpace", "why": "Friendship was a ranked list."},
        {"id": "itunestap", "title": "99¢ tap", "goal": "Tap two 99¢ tracks. Theater only.", "act": "Buy (theater)", "need": 2, "phrase": "99", "next": "../itunes/index.html", "nl": "iTunes Store", "why": "A song cost a dollar."},
    ],
    "2004": [
        {"id": "thepoke", "title": "thefacebook poke", "goal": "Poke twice. College network only.", "act": "Poke", "need": 2, "phrase": "poke", "next": "../facebook/index.html", "nl": "thefacebook", "why": "Poke was the first verb."},
        {"id": "flickrfave", "title": "Flickr fave", "goal": "Fave two stills.", "act": "Fave", "need": 2, "phrase": "fave", "next": "../flickr/index.html", "nl": "Flickr", "why": "The star was the social photo."},
    ],
    "2005": [
        {"id": "ytsurge", "title": "YouTube surge", "goal": "Hit play twice on a tiny clip.", "act": "Play", "need": 2, "phrase": "zoo", "next": "../youtube/index.html", "nl": "YouTube", "why": "Me at the zoo was enough."},
        {"id": "mapdrag", "title": "Maps drag", "goal": "Drag the map twice. No live tiles.", "act": "Drag", "need": 2, "phrase": "maps", "next": "../maps/index.html", "nl": "Google Maps", "why": "The map moved. That was new."},
    ],
    "2006": [
        {"id": "t140type", "title": "140 type", "goal": "Type two 140-class tweets.", "act": "Tweet", "need": 2, "phrase": "twttr", "next": "../twitter/index.html", "nl": "Twitter", "why": "The box was the game."},
        {"id": "diggup", "title": "Digg up", "goal": "Digg two stories.", "act": "Digg", "need": 2, "phrase": "digg", "next": "../digg/index.html", "nl": "Digg", "why": "The front page was voted."},
    ],
    "2007": [
        {"id": "safurl", "title": "Safari URL", "goal": "Type two mobile URLs.", "act": "Go", "need": 2, "phrase": "safari", "next": "../iphone/index.html", "nl": "iPhone Safari", "why": "The phone was a browser. No store."},
        {"id": "svgrab", "title": "Street View grab", "goal": "Grab two pegman views. Theater.", "act": "Grab", "need": 2, "phrase": "street", "next": "../maps/streetview.html", "nl": "Street View", "why": "The street became a panorama."},
    ],
    "2008": [
        {"id": "storeget", "title": "App Store get", "goal": "Get two of the ~500 apps. Theater.", "act": "Get", "need": 2, "phrase": "get", "next": "../appstore/index.html", "nl": "App Store", "why": "The shelf opened."},
        {"id": "chromebox", "title": "Chrome box", "goal": "Omnibox two queries.", "act": "Search", "need": 2, "phrase": "chrome", "next": "../chrome/index.html", "nl": "Chrome", "why": "The box was the URL and the search."},
    ],
    "2009": [
        {"id": "likeburst", "title": "Like burst", "goal": "Like two feed stories.", "act": "Like", "need": 2, "phrase": "like", "next": "../facebook/feed.html", "nl": "Facebook Like", "why": "The thumb left the feed."},
        {"id": "farmwilt", "title": "Farm wilt", "goal": "Water two plots before wilt.", "act": "Water", "need": 2, "phrase": "wilt", "next": "../farmville/index.html", "nl": "FarmVille", "why": "The timer was the loop."},
    ],
    "2010": [
        {"id": "ogburst", "title": "Open Graph burst", "goal": "Like two CNN-class pages.", "act": "Like", "need": 2, "phrase": "like", "next": "../facebook/index.html", "nl": "Open Graph", "why": "Like left Facebook."},
        {"id": "ipadtilt", "title": "iPad tilt", "goal": "Tilt the 1st-gen twice. No camera.", "act": "Tilt", "need": 2, "phrase": "ipad", "next": "../ipad/index.html", "nl": "iPad", "why": "The website, bigger."},
    ],
    "2011": [
        {"id": "circladd", "title": "Circles add", "goal": "Add two people to a circle.", "act": "Add", "need": 2, "phrase": "circle", "next": "../googleplus/index.html", "nl": "Google+", "why": "Circles were the pitch."},
        {"id": "spotplay", "title": "Spotify US play", "goal": "Play two invited tracks. Theater.", "act": "Play", "need": 2, "phrase": "invite", "next": "../spotify/index.html", "nl": "Spotify US", "why": "The US invite landed."},
    ],
    "2012": [
        {"id": "andshare", "title": "Android share", "goal": "Share two IG Android stills.", "act": "Share", "need": 2, "phrase": "android", "next": "../instagram/android.html", "nl": "IG Android", "why": "The filter left iOS."},
        {"id": "ipopin", "title": "IPO pin", "goal": "Pin two $38 notes.", "act": "Pin", "need": 2, "phrase": "ipo", "next": "../facebook/ipo.html", "nl": "Facebook IPO", "why": "The ticker was the weather."},
    ],
    "2013": [
        {"id": "vinhold", "title": "Vine hold", "goal": "Hold two 6-second loops.", "act": "Hold", "need": 2, "phrase": "six", "next": "../vine/record.html", "nl": "Vine 6s", "why": "Six seconds was the unit."},
        {"id": "snap24", "title": "Story 24h", "goal": "Post two 24h stories.", "act": "Post", "need": 2, "phrase": "story", "next": "../snapchat/story.html", "nl": "Snap Stories", "why": "Stories lasted a day."},
    ],
    "2014": [
        {"id": "wainstall2", "title": "WA install tap", "goal": "Tap install twice. Literacy on the star page.", "act": "Install", "need": 2, "phrase": "install", "next": "../whatsapp/index.html", "nl": "WhatsApp", "why": "The deal was the weather. Install is leftover."},
        {"id": "bleedack", "title": "Heartbleed rotate", "goal": "Rotate two leftover passwords. No exploit.", "act": "Rotate", "need": 2, "phrase": "rotate", "next": "../heartbleed/index.html", "nl": "Heartbleed", "why": "Change the password. Do not run the bug."},
    ],
    "2015": [
        {"id": "peritap", "title": "Periscope tap", "goal": "Title two leftover lives. Star stays Go LIVE.", "act": "Go LIVE (theater)", "need": 2, "phrase": "live", "next": "../periscope/index.html", "nl": "Periscope", "why": "The phone goes live."},
        {"id": "lockertap", "title": "Photos locker", "goal": "Lock two leftover stills.", "act": "Lock", "need": 2, "phrase": "locker", "next": "../googlephotos/index.html", "nl": "Google Photos", "why": "The roll left the device."},
    ],
    "2016": [
        {"id": "storytap", "title": "Story tap", "goal": "Add two leftover 24h slides. Star stays Stories.", "act": "Add", "need": 2, "phrase": "story", "next": "../instagram/stories.html", "nl": "Instagram Stories", "why": "The slide lasts a day."},
        {"id": "gymtap", "title": "Gym tap", "goal": "Walk two leftover gyms. Not the chip.", "act": "Walk", "need": 2, "phrase": "gym", "next": "../pokemongo/index.html", "nl": "Pokémon GO leftover", "why": "Sidewalks filled. Stories is still the star."},
    ],
    "2017": [
        {"id": "facetap", "title": "Face tap", "goal": "Unlock twice. Star stays Face ID.", "act": "Unlock (theater)", "need": 2, "phrase": "face", "next": "../iphone/x.html", "nl": "Face ID", "why": "The face is the password."},
        {"id": "bustap", "title": "Battle-bus tap", "goal": "Board two leftover buses. Not the chip.", "act": "Board", "need": 2, "phrase": "bus", "next": "../fortnite/index.html", "nl": "Fortnite leftover", "why": "Saturday living rooms. Face ID is still the star."},
    ],
    "2018": [
        {"id": "managetap", "title": "Manage tap", "goal": "Open Manage twice. Accept All never writes.", "act": "Manage", "need": 2, "phrase": "manage", "next": "../gdpr/index.html", "nl": "GDPR Manage", "why": "The banner is the door."},
        {"id": "fyptap", "title": "FYP tap", "goal": "Swipe two leftover For You rows. Not the chip.", "act": "Swipe", "need": 2, "phrase": "fyp", "next": "../tiktok/fyp.html", "nl": "TikTok leftover", "why": "The loops changed their name."},
    ],
}


def css_for(year: str) -> str:
    if (ROOT / "css" / f"period-{year}.css").exists():
        return f"period-{year}.css"
    return "mosaic-defaults.css"


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def html_for(year: str, spec: dict, slot: str) -> str:
    css = css_for(year)
    gid = spec["id"]
    key = f"itt{year[2:]}-game-{gid}"
    phrase = spec["phrase"]
    phrase_row = (
        f'  <p><label>Type <code>{esc(phrase)}</code> '
        f'<input type="text" data-pack-type autocomplete="off" spellcheck="false" '
        f'placeholder="{esc(phrase)}"></label></p>\n'
        if phrase
        else ""
    )
    other = "extra-b.html" if slot == "a" else "extra-a.html"
    other_title = EXTRAS[year][1]["title"] if slot == "a" else EXTRAS[year][0]["title"]
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{esc(spec["title"])} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-{year}" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-pack-game data-year="{year}" data-game-id="{gid}" data-pack-need="{spec["need"]}" data-pack-phrase="{esc(phrase)}" data-yg-goal="{esc(spec["goal"])}" data-yg-next-href="{esc(spec["next"])}" data-yg-next-label="{esc(spec["nl"])}" style="max-width:520px;margin:12px auto;font-family:Tahoma,Arial,sans-serif;font-size:13px">
  <h1>{esc(spec["title"])} — {year}</h1>
  <p>{esc(spec["goal"])}</p>
  <p class="honesty yg-honesty"><b>{esc(spec["why"])}</b> · leftover extra · not the year star · museum original · incomplete never writes · key <code>{key}</code></p>
  <ol class="yg-steps" data-yg-steps style="font-size:11px;margin:8px 0;padding-left:1.3em">
    <li data-step="start">Start</li>
    <li data-step="taps">{esc(spec["act"])} {spec["need"]} time(s)</li>
    <li data-step="type">Type the phrase if shown</li>
    <li data-step="save">Finish writes <code>{key}</code></li>
  </ol>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b> · Acts <b data-pack-count>0/{spec["need"]}</b></p>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-pack-act>{esc(spec["act"])}</button>
    <button type="button" data-pack-finish>Finish</button>
  </p>
{phrase_row}  <p data-itt-action-status style="font-size:12px;min-height:1.2em">Press Start. Incomplete never writes.</p>
  <p style="font-size:11px">
    <a href="index.html">← Playables</a> ·
    <a href="game.html">Year game</a> ·
    <a href="extra-a.html">Extra A</a> ·
    <a href="extra-b.html">Extra B</a> ·
    <a href="{other}">{esc(other_title)}</a> ·
    <a href="famous.html">Famous leftover</a> ·
    <a href="{esc(spec["next"])}">{esc(spec["nl"])}</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-pack-boot.js"></script>
<script src="../../../../js/games/year-{year}-{gid}.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def js_for(year: str, spec: dict) -> str:
    gid = spec["id"]
    return f"""/**
 * {spec["title"]} — {year} extra
 * Key: itt{year[2:]}-game-{gid}
 * Engine: year-pack-boot.js. Incomplete never writes.
 */
(function () {{
  "use strict";
  var host = document.querySelector('[data-year-game][data-game-id="{gid}"]');
  if (!host) return;
  host.setAttribute("data-5x-pack", "1");
}})();
"""


def ensure_urlmap(year: str, rels: list[str]) -> None:
    cfgp = ROOT / "js" / "config" / f"{year}.js"
    if not cfgp.exists():
        return
    cfg = cfgp.read_text(encoding="utf-8")
    missing = [r for r in rels if f'"{r}"' not in cfg]
    if not missing:
        return
    marker = "urlMap: {"
    i = cfg.find(marker)
    if i < 0:
        return
    block = "".join(f'\n      "{r}": "http://museum.local/years/{year}/{r}",' for r in missing)
    cfgp.write_text(cfg[: i + len(marker)] + block + cfg[i + len(marker) :], encoding="utf-8")


def patch_home(year: str) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.exists():
        return
    a, b = EXTRAS[year]
    text = home.read_text(encoding="utf-8", errors="ignore")
    extra = (
        f' · extras: <a href="../sites/playable/extra-a.html">{a["title"]}</a>'
        f' · <a href="../sites/playable/extra-b.html">{b["title"]}</a>'
    )
    mark = 'data-itt-year-extras="' + year + '"'
    if mark in text:
        text = re.sub(
            rf' · extras: <a href="\.\./sites/playable/extra-a.html">[\s\S]*?</a> · <a href="\.\./sites/playable/extra-b.html">[\s\S]*?</a>',
            extra,
            text,
            count=1,
        )
        home.write_text(text, encoding="utf-8")
        return
    # append inside first playable-link paragraph, before closing </p>
    if 'class="itt-playable-link"' in text:
        text = text.replace(
            'class="itt-playable-link"',
            f'class="itt-playable-link" {mark}',
            1,
        )
        # first playable-link close
        idx = text.find(mark)
        close = text.find("</p>", idx)
        if close != -1:
            text = text[:close] + extra + text[close:]
            home.write_text(text, encoding="utf-8")


def patch_playable_index(year: str) -> None:
    path = ROOT / "years" / year / "sites" / "playable" / "index.html"
    if not path.exists():
        return
    a, b = EXTRAS[year]
    text = path.read_text(encoding="utf-8", errors="ignore")
    block = (
        f'<p data-itt-year-extras="{year}" class="itt-year-extras" style="font-size:13px;margin:10px 0">'
        f'<b>Two more {year} games</b> — '
        f'<a href="extra-a.html"><b>{esc(a["title"])}</b></a> · '
        f'<a href="extra-b.html"><b>{esc(b["title"])}</b></a> '
        f'<span style="font-size:11px;color:#444">(leftover extras · not the star)</span></p>\n'
    )
    mark = f'data-itt-year-extras="{year}"'
    if mark in text:
        text = re.sub(rf"<p {re.escape(mark)}[\s\S]*?</p>\n?", block, text, count=1)
    elif "famous.html" in text:
        text = text.replace(
            '<a href="famous.html">',
            block + '<a href="famous.html">',
            1,
        )
    else:
        text = text.replace("</body>", block + "</body>")
    # fix 2016 index claiming 2015
    if year != "2015":
        text = text.replace("<h1>2015 cabinet</h1>", f"<h1>{year} cabinet</h1>")
        text = text.replace("<title>2015 playables</title>", f"<title>{year} playables</title>")
    path.write_text(text, encoding="utf-8")


def write_data_js() -> None:
    payload = {}
    for year, pair in EXTRAS.items():
        payload[year] = [
            {
                "id": s["id"],
                "title": s["title"],
                "href": name,
                "key": f"itt{year[2:]}-game-{s['id']}",
            }
            for s, name in zip(pair, ("extra-a.html", "extra-b.html"))
        ]
    body = (
        "/**\n * Two leftover extra games per shipped year (1994–2018).\n"
        " * Consumed by js/immersion/year-playable.js.\n */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        "  ITT.yearExtraGames = "
        + json.dumps(payload, indent=2)
        + ";\n"
        "})(typeof window !== \"undefined\" ? window : this);\n"
    )
    (ROOT / "js" / "config" / "year-extra-games.js").write_text(body, encoding="utf-8")


def main() -> None:
    n = 0
    for year in YEARS:
        dest_dir = ROOT / "years" / year / "sites" / "playable"
        dest_dir.mkdir(parents=True, exist_ok=True)
        rels = []
        for slot, spec in zip(("a", "b"), EXTRAS[year]):
            (dest_dir / f"extra-{slot}.html").write_text(html_for(year, spec, slot), encoding="utf-8")
            (ROOT / "js" / "games" / f"year-{year}-{spec['id']}.js").write_text(
                js_for(year, spec), encoding="utf-8"
            )
            rels.append(f"sites/playable/extra-{slot}.html")
            n += 1
        ensure_urlmap(year, rels)
        patch_home(year)
        patch_playable_index(year)
    write_data_js()
    print(f"wrote {n} extra games")


if __name__ == "__main__":
    main()
