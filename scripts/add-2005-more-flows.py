#!/usr/bin/env python3
"""Add the 2005 year-true leftover pack the first door skipped."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DST = ROOT / "years" / "2005"

PACK = [
    # folder, file, title, blurb, suffix, kind, verb
    ("googletalk", "index.html", "Google Talk", "24 Aug 2005. Free IM + PC voice for Gmail. Jabber. AIM/MSN/Yahoo do not federate yet.", "gtalk-lx", "query", "Add a Gmail friend"),
    ("analytics", "index.html", "Google Analytics", "14 Nov 2005. Free Urchin. Demand blew the servers.", "ga-lx", "query", "Paste a UA leftover"),
    ("reader", "index.html", "Google Reader", "7 Oct 2005. Labs. Announced at Web 2.0. Ajax river. Bloglines is the rival.", "reader-lx", "query", "Subscribe a feed"),
    ("itunesvideo", "index.html", "iTunes 6 video", "12 Oct 2005. Lost / Desperate Housewives $1.99. Not YouTube upload.", "itv-lx", "query", "Buy an episode leftover"),
    ("ipodnano", "index.html", "iPod nano", "7 Sep 2005. 1M in 17 days. Leftover product.", "nano-lx", "checks", "Nano leftover ticks"),
    ("ipodvideo", "index.html", "Video iPod", "12 Oct 2005. 30GB $299 / 60GB $399. Music first. Video is bonus.", "vidpod-lx", "checks", "Video iPod leftover"),
    ("xbox360", "index.html", "Xbox 360", "22 Nov 2005. Console leftover. Not a web gold.", "x360-lx", "checks", "360 leftover"),
    ("webkinz", "index.html", "Webkinz", "Apr 2005. Ganz. Kids leftover with Club Penguin.", "wkz-lx", "hops", "Adopt leftover"),
    ("lifehacker", "index.html", "Lifehacker", "Jan 2005. Gina Trapani. Gawker Media. Tips leftover.", "lh-lx", "query", "A 2005 tip"),
    ("huffpost", "index.html", "The Huffington Post", "9 May 2005. Group blog. Not the chip.", "huff-lx", "query", "A leftover headline"),
    ("yahooanswers", "index.html", "Yahoo Answers", "8 Dec 2005. Ask a sentence. Not paid Google Answers.", "ya-lx", "query", "Ask leftover"),
    ("yahoo360", "index.html", "Yahoo 360", "Mar 2005. Portal leftover beside Flickr buy.", "y360-lx", "hops", "360 leftover"),
    ("windowslive", "index.html", "Windows Live", "Nov 2005 name. Announce leftover. Not Vista default.", "wlive-lx", "checks", "Live leftover"),
    ("virtualearth", "index.html", "Virtual Earth / Live Local", "Jul 2005. Microsoft maps rival. Not Street View.", "ve-lx", "hops", "Bird's-eye leftover"),
    ("rails", "index.html", "Ruby on Rails 1.0", "13 Dec 2005. DHH. Dev leftover.", "rails-lx", "checks", "Rails leftover"),
    ("wordpresscom", "index.html", "WordPress.com", "2005 hosted leftover. Not self-hosted gold.", "wpcom-lx", "query", "A leftover blog name"),
    ("librarything", "index.html", "LibraryThing", "Aug 2005. Catalog leftover.", "lt-lx", "query", "Add a book leftover"),
    ("mturk", "index.html", "Amazon Mechanical Turk", "Nov 2005. HIT leftover.", "mturk-lx", "query", "A leftover HIT"),
    ("newsvine", "index.html", "Newsvine", "Mar 2005. Seed leftover.", "nv-lx", "query", "Seed leftover"),
    ("blogsearch", "index.html", "Google Blog Search", "14 Sep 2005. Search leftover.", "gbs-lx", "query", "Search leftover blogs"),
    ("googlebase", "index.html", "Google Base", "16 Nov 2005. Structured leftover.", "gbase-lx", "query", "An item leftover"),
    ("netvibes", "index.html", "Netvibes", "2005 start page leftover.", "nvib-lx", "hops", "Widget leftover"),
    ("greasemonkey", "index.html", "Greasemonkey", "Firefox user scripts leftover. 2005 mass.", "gm-lx", "checks", "Script leftover"),
    ("barcamp", "index.html", "BarCamp", "2005 unconference leftover.", "bcamp-lx", "checks", "BarCamp leftover"),
    ("katrinamaps", "index.html", "Katrina Maps", "Sep 2005. Crisis leftover. Not Street View.", "kat-lx", "hops", "Two leftover views"),
    ("upcoming", "index.html", "Upcoming.org", "2005 events leftover.", "up-lx", "query", "An event leftover"),
    ("eventful", "index.html", "Eventful", "2005 events leftover.", "evf-lx", "query", "An event leftover"),
    ("metacafe", "index.html", "Metacafe", "2005 video leftover. Not YouTube gold.", "mc-lx", "query", "A clip leftover"),
    ("revver", "index.html", "Revver", "2005 revenue-share video leftover.", "rev-lx", "query", "A clip leftover"),
    ("ifilm", "index.html", "iFilm", "2005 video leftover. YouTube passes it in December.", "ifilm-lx", "query", "A clip leftover"),
    ("yahoovideo", "index.html", "Yahoo Video", "2005 portal video leftover. Not the chip.", "yv-lx", "query", "A clip leftover"),
    ("imageshack", "index.html", "ImageShack", "2005 host leftover.", "ish-lx", "query", "A filename leftover"),
    ("deviantart", "index.html", "DeviantArt", "2005 art leftover.", "da-lx", "hops", "Two leftover pages"),
    ("newgrounds", "index.html", "Newgrounds", "2005 Flash leftover.", "ng-lx", "hops", "Two leftover portals"),
    ("homestarrunner", "index.html", "Homestar Runner", "2005 Flash leftover.", "hsr-lx", "hops", "Toon leftover"),
    ("ytmnd", "index.html", "YTMND", "2005 site leftover.", "ytmnd-lx", "query", "A site leftover"),
    ("fark", "index.html", "Fark", "2005 link leftover.", "fark-lx", "query", "A headline leftover"),
    ("engadget", "index.html", "Engadget", "2005 gadget leftover.", "eng-lx", "query", "A leftover post"),
    ("gizmodo", "index.html", "Gizmodo", "2005 gadget leftover.", "giz-lx", "query", "A leftover post"),
    ("boingboing", "index.html", "Boing Boing", "2005 blog leftover.", "bb-lx", "query", "A leftover post"),
    ("akismet", "index.html", "Akismet", "2005 comment-spam leftover.", "aki-lx", "checks", "Spam leftover"),
    ("joomla", "index.html", "Joomla", "2005 CMS leftover.", "joom-lx", "checks", "Joomla leftover"),
    ("habbo", "index.html", "Habbo Hotel", "2005 kids leftover.", "hab-lx", "hops", "Room leftover"),
    ("neopets", "index.html", "Neopets", "2005 leftover.", "neo-lx", "hops", "Pet leftover"),
    ("runescape", "index.html", "RuneScape", "2005 leftover.", "rs-lx", "hops", "World leftover"),
    ("azureus", "index.html", "Azureus", "2005 BitTorrent leftover.", "az-lx", "checks", "Torrent leftover"),
    ("yousendit", "index.html", "YouSendIt", "2005 file leftover.", "ysi-lx", "query", "A filename leftover"),
    ("collegehumor", "index.html", "CollegeHumor", "2005 leftover. Vimeo is the sister leftover.", "ch-lx", "hops", "Two leftover clips"),
    ("miniclip", "index.html", "Miniclip", "2005 Flash leftover.", "mini-lx", "hops", "Two leftover games"),
    ("msnmessenger", "index.html", "MSN Messenger", "2005 mass IM leftover. Talk does not federate.", "msn-lx", "query", "A leftover handle"),
    ("newsgator", "index.html", "NewsGator", "2005 RSS leftover. Reader is the Google one.", "ngat-lx", "query", "A feed leftover"),
    ("igoogle", "index.html", "Personalized Home / iGoogle", "2005 start-page leftover.", "igoog-lx", "hops", "Two leftover gadgets"),
    ("googledesktop", "index.html", "Google Desktop 2", "Aug 2005 leftover. Local search leftover.", "gdesk-lx", "checks", "Desktop leftover"),
    ("ie7beta", "index.html", "IE7 beta", "2005 leftover. IE6 stays the default shell.", "ie7-lx", "checks", "Beta leftover"),
    ("chicagocrime", "index.html", "ChicagoCrime", "2005 mashup leftover. Pre-API cousin of HousingMaps.", "ccrime-lx", "hops", "Two leftover pins"),
    ("lazysunday", "index.html", "Lazy Sunday leftover", "Late Dec 2005 SNL on YouTube. Literacy. Not the star write.", "lazy-lx", "checks", "SNL leftover"),
    ("infogami", "index.html", "Infogami", "YC S05 leftover. Merges into Reddit later.", "info-lx", "checks", "YC leftover"),
    ("kiko", "index.html", "Kiko", "YC S05 calendar leftover.", "kiko-lx", "query", "An event leftover"),
    ("photobucket", "index.html", "Photobucket leftover", "2005 host leftover. Not the 2003 gold.", "pbkt-lx", "query", "A filename leftover"),
]


def write(p: Path, t: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(t, encoding="utf-8")


def x4(suffix: str, kind: str, title: str, nxt: str) -> str:
    inner = ""
    if kind == "query":
        inner = '<p><label>Type<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="2005 leftover"></label></p>'
    elif kind == "checks":
        inner = (
            '<p><label><input type="checkbox" data-4x-req> Year-true 2005 leftover — not the Upload chip.</label></p>'
            '<p><label><input type="checkbox" data-4x-req> Incomplete never writes.</label></p>'
        )
    else:
        inner = (
            '<p><button type="button" data-4x-hop="a">Open A</button> '
            '<button type="button" data-4x-hop="b">Open B</button></p>'
        )
    return f"""
<section class="itt-4x-panel" data-4x-panel data-4x-kind="{kind}" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:15px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2005 leftover · incomplete never writes · Upload is the chip</p>
{inner}
<p><button type="button" data-4x-go="{suffix}">Do this</button> <span data-4x-status></span></p>
<p hidden data-4x-result></p>
<p hidden data-next-flow data-next-when-key="itt05-{suffix}"><b>Next:</b> <a href="{nxt}">Next leftover</a></p>
</section>
"""


def page(title: str, blurb: str, panel: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>{title} — 2005 leftover</title>
<link rel="stylesheet" href="../../../../css/period-2005.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000cc">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="../youtube/upload.html">★ Upload</a></p>
<p class="itt-pixel-failed">[failed-final] leftover · 2005 door · no official mark</p>
<h1>{title}</h1>
<p>{blurb}</p>
<p>Leftover dest. Not the 2005 chip. Incomplete never writes.</p>
{panel}
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
"""


def main() -> None:
    added = []
    for i, (folder, fn, title, blurb, suffix, kind, verb) in enumerate(PACK):
        rel = f"sites/{folder}/{fn}"
        nxt_i = (i + 1) % len(PACK)
        nxt = f"../{PACK[nxt_i][0]}/{PACK[nxt_i][1]}"
        p = DST / rel
        if p.exists() and f'data-4x-go="{suffix}"' in p.read_text(encoding="utf-8"):
            continue
        write(p, page(title, blurb + " " + verb + ".", x4(suffix, kind, title, nxt)))
        added.append((rel, suffix, kind, title, f"/years/2005/sites/{PACK[nxt_i][0]}/{PACK[nxt_i][1]}"))

    # urlMap
    cfg = ROOT / "js/config/2005.js"
    t = cfg.read_text(encoding="utf-8")
    extra = []
    for folder, fn, *_ in PACK:
        key = f"sites/{folder}/{fn}"
        if f'"{key}"' not in t:
            extra.append(f'      "{key}": "http://museum.local/years/2005/{key}",')
    if extra:
        t = t.replace("    urlMap: {", "    urlMap: {\n" + "\n".join(extra), 1)
        cfg.write_text(t, encoding="utf-8")

    # 2x matrix
    mx = ROOT / "e2e/2x-links.matrix.json"
    data = json.loads(mx.read_text(encoding="utf-8"))
    have = {r.get("key") for r in data if str(r.get("year")) == "2005"}
    for folder, fn, title, blurb, suffix, kind, verb in PACK:
        key = "itt05-" + suffix
        if key in have:
            continue
        nxt_folder = PACK[(PACK.index((folder, fn, title, blurb, suffix, kind, verb)) + 1) % len(PACK)][0]
        nxt_fn = PACK[(PACK.index((folder, fn, title, blurb, suffix, kind, verb)) + 1) % len(PACK)][1]
        data.append(
            {
                "year": "2005",
                "path": f"/years/2005/sites/{folder}/{fn}",
                "key": key,
                "kind": kind,
                "title": title + " leftover",
                "next": f"/years/2005/sites/{nxt_folder}/{nxt_fn}",
                "nextLabel": nxt_folder,
            }
        )
    mx.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    # leftover strip on home
    home = DST / "pages/home.html"
    ht = home.read_text(encoding="utf-8")
    if "googletalk" not in ht:
        links = " · ".join(
            f'<a href="../sites/{folder}/index.html">{title}</a>'
            for folder, fn, title, *_ in PACK[:18]
            if fn == "index.html"
        )
        strip = (
            f'<p class="itt-year-true-pack" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666;max-width:52em">'
            f"<b>Also 2005 leftover (not the one-thing):</b> {links} · "
            f'<a href="map.html">more on the map</a></p>'
        )
        ht = ht.replace("</td></tr>\n</table>", strip + "\n</td></tr>\n</table>", 1)
        home.write_text(ht, encoding="utf-8")

    n2 = sum(1 for r in data if str(r.get("year")) == "2005")
    print(f"pack dests={len(PACK)} 2005_2x={n2} html={len(list(DST.rglob('*.html')))} folders={len([p for p in (DST/'sites').iterdir() if p.is_dir()])}")


if __name__ == "__main__":
    main()
