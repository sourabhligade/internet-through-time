#!/usr/bin/env python3
"""Dest-true leftover-3× machines for 2006–2010. No new folders."""
from __future__ import annotations

import json
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("real99", ROOT / "scripts/implement-1999-2005-lo3x-real.py")
real99 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(real99)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-2006-2010-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

# Reuse dest-true verbs from 1999–2005 where the dest is the same product.
DEFAULT = dict(real99.DEFAULT)
DEFAULT.update(
    {
        "twitter": ("type leftover update ≤140 then Update", "just setting up my twttr", "Twttr leftover", "280-as-default / For-You (trap)"),
        "youtube": ("watch leftover · never upload star", "Me at the zoo", "YouTube leftover", "upload-as-leftover / Reels (trap)"),
        "facebook": ("open leftover feed / poke leftover", "News Feed", "Facebook leftover", "Like-as-2006 / Timeline (trap)"),
        "googledocs": ("title leftover doc then share theater", "doc", "Google Docs leftover", "Drive-as-already (trap)"),
        "aws": ("bucket leftover then PUT theater", "bucket", "S3 leftover", "live-AWS (trap)"),
        "ie7": ("open leftover IE7 notes then tab honesty", "IE7", "IE7 leftover", "Chrome-as-2006-default (trap)"),
        "roblox": ("name leftover place then play theater", "place", "Roblox leftover", "live-Roblox (trap)"),
        "wii": ("pick leftover channel then play theater", "Wii Sports", "Wii leftover", "Switch-as-2006 (trap)"),
        "bebo": ("name leftover profile then add", "profile", "Bebo leftover", "empty (trap)"),
        "wiki": ("search leftover then preview leftover", "article", "Wikipedia leftover", "preview-as-Save (trap)"),
        "stumble": ("pick leftover topic then stumble", "topic", "StumbleUpon leftover", "empty (trap)"),
        "wow": ("create leftover toon then realm", "toon", "WoW leftover", "shop-as-gold (trap)"),
        "ff2": ("download leftover Firefox 2 then tab honesty", "Firefox 2", "Firefox 2 leftover", "Chrome-as-2007 (trap)"),
        "nyt": ("open leftover headline", "headline", "NYT leftover", "paywall-skip (trap)"),
        "streetview": ("drag leftover street then honesty", "street", "Street View leftover", "Street-View-as-gold (trap)"),
        "fbplat": ("name leftover app then add theater", "app", "Facebook Platform leftover", "Like-as-2007 (trap)"),
        "tumblr": ("title leftover post then reblog theater", "post", "Tumblr leftover", "empty-post (trap)"),
        "kindle": ("title leftover book then wireless theater", "book", "Kindle leftover", "iPad-as-2007 (trap)"),
        "ie6": ("open leftover XP/IE6 residual", "IE6", "XP leftover", "Chrome-as-2007-default (trap)"),
        "xbox": ("pick leftover achievement then honesty", "achievement", "Xbox leftover", "empty (trap)"),
        "stackoverflow": ("title leftover question then ask theater", "question", "Stack Overflow leftover", "empty-title (trap)"),
        "posterous": ("title leftover post then publish theater", "post", "Posterous leftover", "empty (trap)"),
        "grooveshark": ("search leftover track then play theater", "track", "Grooveshark leftover", "Spotify-US-as-2008 (trap)"),
        "evernote": ("title leftover note then save theater", "note", "Evernote leftover", "empty (trap)"),
        "friendfeed": ("share leftover then comment theater", "share", "FriendFeed leftover", "empty (trap)"),
        "bitly": ("paste leftover URL then shorten", "http://", "bit.ly leftover", "empty-url (trap)"),
        "etsy": ("search leftover handmade then cart theater", "handmade", "Etsy leftover", "empty (trap)"),
        "duckduckgo": ("type leftover query then !bang", "query", "DuckDuckGo leftover", "empty (trap)"),
        "xkcd": ("open leftover comic then hover leftover", "comic", "xkcd leftover", "empty (trap)"),
        "appstore": ("search leftover app then get theater", "app", "App Store leftover", "App-Store-as-gold (trap)"),
        "chrome": ("download leftover Chrome then tab honesty", "Chrome", "Chrome leftover", "Chrome-as-gold (trap)"),
        "android": ("open leftover G1 / Market leftover", "G1", "Android leftover", "Play-as-2008 (trap)"),
        "hulu": ("watch leftover episode then queue", "episode", "Hulu leftover", "empty (trap)"),
        "dropbox": ("name leftover folder then sync theater", "folder", "Dropbox leftover", "empty (trap)"),
        "iphone": ("type leftover URL then Go theater", "apple.com", "iPhone leftover", "iPhone-as-gold (trap)"),
        "omegle": ("start leftover chat then next theater", "chat", "Omegle leftover", "empty (trap)"),
        "chatroulette": ("start leftover cam then next theater", "cam", "Chatroulette leftover", "empty (trap)"),
        "wave": ("title leftover wave then reply theater", "wave", "Google Wave leftover", "empty (trap)"),
        "farmville": ("plant leftover crop then harvest theater", "crop", "FarmVille leftover", "FarmVille-as-gold (trap)"),
        "bing": ("type leftover query then search", "query", "Bing leftover", "empty (trap)"),
        "foursquare": ("check in leftover venue then shout", "venue", "Foursquare leftover", "empty (trap)"),
        "kickstarter": ("back leftover project then pledge theater", "project", "Kickstarter leftover", "live-charge (trap)"),
        "windows7": ("open leftover Win7 leftover then honesty", "Win7", "Win7 leftover", "empty (trap)"),
        "minecraft": ("name leftover world then place block theater", "world", "Minecraft leftover", "empty (trap)"),
        "formspring": ("ask leftover question then answer theater", "question", "Formspring leftover", "empty (trap)"),
        "groupon": ("open leftover deal then buy theater", "deal", "Groupon leftover", "live-charge (trap)"),
        "quora": ("ask leftover question then follow theater", "question", "Quora leftover", "empty (trap)"),
        "pinterest": ("pin leftover then board theater", "pin", "Pinterest leftover", "empty (trap)"),
        "angrybirds": ("sling leftover bird then crash theater", "bird", "Angry Birds leftover", "empty (trap)"),
        "wikileaks": ("open leftover cable then honesty", "cable", "WikiLeaks leftover", "empty (trap)"),
        "spotifyeu": ("search leftover track then play theater", "track", "Spotify leftover", "US-launch-as-2010 (trap)"),
        "hulustream": ("watch leftover stream then queue", "episode", "Hulu leftover", "empty (trap)"),
        "ipad": ("open leftover site then bigger-web honesty", "website", "iPad leftover", "iPad-2 (trap)"),
        "imgur": ("title leftover image then upload theater", "image", "Imgur leftover", "empty (trap)"),
        "docs": ("title leftover doc then share theater", "doc", "Docs leftover", "Drive-as-already (trap)"),
        "li": ("leftover invite then accept", "invite", "LinkedIn leftover", "empty-invite (trap)"),
        "sl": ("name leftover avi then teleport theater", "avi", "Second Life leftover", "empty (trap)"),
        "nintendo": ("pick leftover Wii leftover then play", "Wii", "Nintendo leftover", "empty (trap)"),
        "amz": ("add leftover to cart", "item", "Amazon leftover", "Prime-Video (trap)"),
        "nfx": ("queue leftover DVD then envelope theater", "title", "Netflix leftover", "streaming-as-only (trap)"),
        "safari": ("type leftover URL then Go", "url", "Safari leftover", "empty (trap)"),
        "ie8": ("open leftover IE8 notes", "IE8", "IE8 leftover", "Chrome-as-2009-default (trap)"),
        "gvoice": ("enter leftover number then call theater", "number", "Google Voice leftover", "empty (trap)"),
        "palmpre": ("open leftover webOS leftover", "webOS", "Palm Pre leftover", "empty (trap)"),
        "flickrbox": ("tag leftover then stream", "photostream", "Flickr leftover", "Instagram (trap)"),
        "gmailtab": ("search leftover mail then conversation", "mail", "Gmail leftover", "empty (trap)"),
        "facetime": ("call leftover then honesty", "FaceTime", "FaceTime leftover", "empty (trap)"),
        "instant": ("search leftover then instant honesty", "query", "Google Instant leftover", "empty (trap)"),
        "windowsphone": ("open leftover WP leftover", "WP7", "Windows Phone leftover", "empty (trap)"),
    }
)

BEAT = {
    "2006": "2006 leftover. Twttr is the chip. IE6 / XP. No iPhone. No Chrome. No Street View.",
    "2007": "2007 leftover. iPhone Safari is the chip. App Store / Chrome / Android G1 are 2008.",
    "2008": "2008 leftover. GitHub issue is the chip. No Instagram.",
    "2009": "2009 leftover. Facebook Like is the chip. No Instagram. No iPad.",
    "2010": "2010 leftover. Instagram iOS is the chip. Android IG is 2012. Win7 + IE8 desktop.",
}

STAR_KEY = {
    "2006": "itt06-tweets",
    "2007": "itt07-iphone",
    "2008": "itt08-github",
    "2009": "itt09-like",
    "2010": "itt10-ig-posts",
}

HOP = {
    ("2006", "gmail"): "invite.html",
    ("2006", "flickr"): "index.html",
    ("2006", "youtube"): "watch.html",
    ("2007", "gmail"): "index.html",
    ("2008", "gmail"): "index.html",
    ("2008", "dropbox"): "index.html",
    ("2010", "instagram"): "index.html",
}


def truth(slug: str):
    return DEFAULT.get(slug, ("open leftover dest then dest-true verb", "leftover", f"{slug} leftover", "anachronism (trap)"))


def more_href(year: str, slug: str):
    hop = HOP.get((year, slug))
    if hop:
        p = ROOT / f"years/{year}/sites/{slug}/{hop}"
        if p.is_file() and hop != "index.html":
            return hop
    more = ROOT / f"years/{year}/sites/{slug}/more.html"
    if more.is_file():
        return "more.html"
    return None


def real_panel(year: str, slug: str, name: str, kind: str, nxt):
    star = paint.STAR[year]
    verb, ph, keep, trap = truth(slug)
    beat = BEAT[year]
    if kind == "third":
        storage = f"itt{year[2:]}-pop3-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}"'
        mark = "ITT-POP3X-THIRD"
    elif kind == "second":
        storage = f"itt{year[2:]}-pop2-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop2-{slug}"'
        mark = "ITT-POP3X-SECOND"
    else:
        storage = f"itt{year[2:]}-pop-{slug}"
        go = f'data-pop-go data-pop-id="{slug}"'
        mark = "ITT-POP3X-FIRST"
    miss = more_href(year, slug)
    miss_html = ""
    if miss:
        miss_html = (
            f'<p class="itt-lo3x-miss"><b>M2 miss / wall:</b> '
            f'<a href="{miss}" data-itt-lo3x-miss="1">in-year miss / more · never writes leftover-3×</a></p>'
        )
    next_html = ""
    if nxt:
        next_html = (
            f'<p hidden data-next-flow data-next-when-key="{storage}">'
            f'<b>Next:</b> <a href="../{nxt[0]}/index.html">{nxt[1]}</a></p>'
        )
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="{year}" data-itt-lo3x-verb="{verb}" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{name}</b> · leftover 3× · {year}-true · {star} is the chip · incomplete never writes · <code>{storage}</code></p>
<p data-itt-year-copy>{beat}</p>
<p><b>M3:</b> {verb}. Empty / trap never writes.</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {beat}</label>
{miss_html}
<p><button type="button" {go}>{keep}</button> <span data-pop-status></span></p>
{next_html}
</div>
<!-- {mark}:{slug}:end -->
"""


def replace_or_insert(path: Path, year: str, slug: str, name: str, kind: str, nxt) -> str:
    if not path.is_file():
        return "missing"
    html = path.read_text(encoding="utf-8", errors="replace")
    mark = {"first": "ITT-POP3X-FIRST", "second": "ITT-POP3X-SECOND", "third": "ITT-POP3X-THIRD"}[kind]
    block = real_panel(year, slug, name, kind, nxt)
    pat = rf"<!-- {mark}:{slug}:start -->.*?<!-- {mark}:{slug}:end -->"
    import re
    if re.search(pat, html, re.S):
        html = re.sub(pat, block.strip(), html, count=1, flags=re.S)
        path.write_text(html, encoding="utf-8")
        return "replaced"
    if re.search(r"</body>", html, re.I):
        html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
    else:
        html += "\n" + block
    path.write_text(html, encoding="utf-8")
    return "inserted"


def write_matrix(rows) -> None:
    out = ROOT / "e2e/2006-2010-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("matrix", len(rows), out)


def main() -> None:
    counts = {"replaced": 0, "inserted": 0, "missing": 0}
    rows = []
    for year, plan in paint.PLAN.items():
        for kind in ("first", "second", "third"):
            items = plan[kind]
            for i, (slug, name) in enumerate(items):
                nxt = items[(i + 1) % len(items)]
                path = ROOT / f"years/{year}/sites/{slug}/index.html"
                st = replace_or_insert(path, year, slug, name, kind, nxt)
                counts[st] = counts.get(st, 0) + 1
                print(st, year, kind, slug)
                verb, ph, keep, trap = truth(slug)
                key = {
                    "first": f"itt{year[2:]}-pop-{slug}",
                    "second": f"itt{year[2:]}-pop2-{slug}",
                    "third": f"itt{year[2:]}-pop3-{slug}",
                }[kind]
                rows.append(
                    {
                        "year": year,
                        "kind": kind,
                        "id": slug,
                        "name": name,
                        "key": key,
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "keep": keep,
                        "trap": trap,
                        "beat": BEAT[year],
                        "miss": more_href(year, slug),
                        "nextId": nxt[0],
                        "href": f"/years/{year}/sites/{slug}/index.html",
                    }
                )
    write_matrix(rows)
    print(counts)


if __name__ == "__main__":
    main()
