#!/usr/bin/env python3
"""Turn Type-leftover plaques on thin-year dests into year-true hops.

Keeps data-4x-go suffixes so 2× e2e still matches. Incomplete never writes.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year, slug, suffix, title, body, hop1, hop2, go, trap, nxt
# nxt is relative from dest folder
REAL = [
    (
        "2007", "yahoo", "yh-07",
        "Yahoo leftover — 2007 mass portal",
        "Yahoo is still a 2007 mass portal leftover. Not the iPhone chip. Not a live search API.",
        "Search leftover", "Open directory leftover", "Search leftover",
        "This is Google.com habit (trap)", "../iphone/index.html",
    ),
    (
        "2007", "wikipedia", "wk-07",
        "Wikipedia leftover — 2007 mass",
        "Wikipedia is 2007 mass leftover. Born 2001. Not the iPhone chip.",
        "Open leftover article", "Note leftover cite", "Open leftover",
        "Wikipedia launched in 2007 (trap)", "../iphone/index.html",
    ),
    (
        "2007", "amazon", "az-07",
        "Amazon leftover — 2007 store",
        "Amazon store leftover. Kindle (19 Nov) is a different leftover. Not the iPhone chip. No live cart.",
        "Search leftover item", "Cart leftover theater", "Look leftover",
        "One-click live buy (trap)", "../iphone/index.html",
    ),
    (
        "2009", "googlewave", "wave-09",
        "Google Wave leftover — May 2009 invite",
        "Wave demo / invite seed <b>May 2009</b> (I/O). Public is <b>2010</b>. Not daily email. Not the Like chip.",
        "Request leftover invite", "Open leftover wave", "Request leftover",
        "Wave is already daily email (trap)", "../facebook/index.html",
    ),
    (
        "2009", "spotifyeu", "sp-09",
        "Spotify leftover — EU residual 2009",
        "Spotify EU residual. US invite-free is <b>14 Jul 2011</b>. Not a US unlock. Not the Like chip.",
        "Note leftover EU", "Open leftover catalog", "Note leftover",
        "Unlock Spotify US today (trap)", "../facebook/index.html",
    ),
    (
        "2009", "dropbox09", "db-09",
        "Dropbox leftover — 2009 continuity",
        "Dropbox continuity leftover. Born 2008. Not the Like chip. No live sync.",
        "Name leftover folder", "Note leftover sync", "Note leftover",
        "Sync a live folder (trap)", "../facebook/index.html",
    ),
    (
        "2011", "line11", "ln-11",
        "LINE leftover — Jun 2011",
        "LINE launches <b>Jun 2011</b> (JP). Leftover messenger. Not Google+ gold.",
        "Send leftover", "Sticker leftover", "Send leftover",
        "LINE is the 2011 star (trap)", "../googleplus/index.html",
    ),
    (
        "2011", "minecraft11", "mc-11",
        "Minecraft leftover — 18 Nov 2011",
        "Minecraft 1.0 ships <b>18 Nov 2011</b> (Mojang). Leftover. Not a live world. Not the Circles chip.",
        "Name leftover world", "Play leftover theater", "Name leftover",
        "Join a live realm (trap)", "../googleplus/index.html",
    ),
    (
        "2011", "quora11", "qo-11",
        "Quora leftover — 2011 breakout",
        "Quora 2011 breakout leftover (launch was 2010). Not the Circles chip. No live follow graph.",
        "Ask leftover", "Follow leftover theater", "Ask leftover",
        "Follow a live topic (trap)", "../googleplus/index.html",
    ),
    (
        "2011", "evernote11", "en-11",
        "Evernote leftover — 2011 clipper",
        "Evernote 2011 clipper leftover. Not the Circles chip. No live sync.",
        "Title leftover clip", "Clip leftover theater", "Clip leftover",
        "Clip a live page (trap)", "../googleplus/index.html",
    ),
    (
        "2013", "patreon", "pa-13",
        "Patreon leftover — 2013",
        "Patreon leftover 2013. Not Vine gold. No live pledge.",
        "Name leftover creator", "Note leftover pledge", "Note leftover",
        "Charge a live pledge (trap)", "../vine/record.html",
    ),
    (
        "2013", "yikyak13", "yk-13",
        "Yik Yak leftover — 2013 seed",
        "Yik Yak 2013 seed leftover. Mass is later. Not Vine gold. No live dump.",
        "Note leftover seed", "Open leftover theater", "Note leftover",
        "Post a live dump (trap)", "../vine/record.html",
    ),
    (
        "2013", "hangouts13", "hg-13",
        "Hangouts leftover — 2013",
        "Google Hangouts leftover 2013. Not Vine gold. Not a live Meet.",
        "Name leftover hangout", "Note leftover chat", "Note leftover",
        "Start a live Meet (trap)", "../vine/record.html",
    ),
    (
        "2020", "school20", "sc-20",
        "School leftover — 2020 remote",
        "Remote-school leftover. Not Zoom gold. Not a live LMS. No case dashboard.",
        "Name leftover class", "Note leftover roster", "Note leftover",
        "Open a live gradebook (trap)", "../zoom/meeting.html",
    ),
]

# checks dests: only unhide trap + product shell, keep kind
CHECKS = [
    ("2006", "ie7", "ie7-06", "IE7 leftover — 18 Oct 2006",
     "IE7 for XP ships <b>18 Oct 2006</b>. Leftover download. This door still boots <b>IE 6</b>.",
     "Make IE7 the January shell (trap)", "../twitter/index.html",
     "18 Oct 2006 leftover — IE7 for XP, not the January shell",
     "Mass default stays IE6 · empty / trap never writes · not the chip",
     "Ack leftover download"),
    ("2006", "ec2", "ec2-06", "EC2 leftover — 24 Aug 2006",
     "Amazon EC2 limited beta <b>24–25 Aug 2006</b>. $0.10 / instance-hour. GA is <b>2008</b>.",
     "Spin live instances (trap)", "../twitter/index.html",
     "24 Aug 2006 leftover — EC2 limited beta, not 2008 GA",
     "Literacy only · no live AMI · not the chip",
     "Ack leftover instance"),
    ("2009", "friendfeed09", "ff-09", "FriendFeed leftover — Aug 2009 epitaph",
     "Facebook agrees to buy FriendFeed <b>10 Aug 2009</b>. Epitaph leftover. Not the Like chip.",
     "FriendFeed is the 2009 star (trap)", "../facebook/index.html",
     "10 Aug 2009 leftover — FriendFeed epitaph, not the Like chip",
     "Beacon funeral neighbor · empty / trap never writes · not the chip",
     "Ack leftover epitaph"),
    ("2009", "android09", "and-09", "Android leftover — 2009 multiphone",
     "Android leftover on more than one handset. Not iPhone 3GS gold. Not the Like chip.",
     "Android replaced the iPhone this year (trap)", "../facebook/index.html",
     "2009 leftover — Android multiphone, not the 3GS chip",
     "Product leftover · empty / trap never writes · not the chip",
     "Ack leftover handset"),
    ("2009", "chrome09", "ch-09", "Chrome leftover — 2009 rising",
     "Chrome is a 2009 rising leftover (Mac/Linux Dec class). This door still boots <b>XP + IE 8</b>.",
     "Chrome is the January 2009 shell (trap)", "../facebook/index.html",
     "2009 leftover — Chrome rising, not the January shell",
     "Shell stays XP + IE 8 · empty / trap never writes · not the chip",
     "Ack leftover browser"),
    ("2011", "wechat", "wx-11", "Weixin leftover — 21 Jan 2011",
     "Tencent Weixin ships <b>21 Jan 2011</b>. English WeChat name is later. Not Google+ gold.",
     "WeChat Pay / Mini Programs 2011 (trap)", "../googleplus/index.html",
     "21 Jan 2011 leftover — Weixin 1.0, not Pay, not Mini Programs",
     "Unbundle leftover · empty / trap never writes · not the chip",
     "Ack leftover Weixin"),
    ("2011", "skypemsft", "sk-11", "Skype leftover — 10 May 2011",
     "Microsoft agrees to buy Skype for <b>$8.5 billion</b> cash on <b>10 May 2011</b>. Not a live call.",
     "Place a live Skype call (trap)", "../googleplus/index.html",
     "10 May 2011 leftover — Microsoft agrees to buy Skype $8.5B",
     "Deal leftover · empty / trap never writes · not the chip",
     "Ack leftover deal"),
    ("2011", "rdio11", "rd-11", "Rdio leftover — 2011 stream rival",
     "Rdio leftover as a 2011 US streaming rival to Spotify. Not Spotify US gold. No live stream.",
     "This is Spotify US (trap)", "../googleplus/index.html",
     "2011 leftover — Rdio rival, not the Spotify US dest",
     "No live stream · empty / trap never writes · not the chip",
     "Ack leftover rival"),
    ("2011", "whatsapp11", "wa-11", "WhatsApp leftover — Oct 2011",
     "WhatsApp leftover: <b>1 billion messages / day</b> class Oct 2011. Not the 2014 $19B install star.",
     "This is the 2014 WhatsApp Install chip (trap)", "../googleplus/index.html",
     "Oct 2011 leftover — 1B msgs/day class, not the 2014 install star",
     "Not Facebook Messenger · empty / trap never writes · not the chip",
     "Ack leftover messages"),
    ("2013", "twitteripo", "ti-13", "Twitter IPO leftover — 7 Nov 2013",
     "Twitter IPO leftover <b>7 Nov 2013</b>. Not Vine gold. No live ticker.",
     "Trade live TWTR (trap)", "../vine/record.html",
     "7 Nov 2013 leftover — Twitter IPO literacy",
     "No live broker · empty / trap never writes · not the chip",
     "Ack leftover IPO"),
    ("2013", "bitcoin13", "bt-13", "Bitcoin leftover — 2013 literacy",
     "2013 price-run leftover literacy. Not a live wallet. Not Vine gold.",
     "Buy coins live (trap)", "../vine/record.html",
     "2013 leftover — Bitcoin literacy, not a live wallet",
     "No live broker · empty / trap never writes · not the chip",
     "Ack leftover literacy"),
    ("2020", "zoombomb", "zb-20", "Zoom-bomb leftover — 2020",
     "Uninvited join leftover. Waiting-room / passcode leftover. Not the mute→Leave star.",
     "Admit everyone / write the Zoom star (trap)", "../zoom/meeting.html",
     "2020 leftover — Zoom-bomb literacy, not the mute→Leave chip",
     "Join never writes itt20-zoom · empty / trap never writes",
     "Ack leftover passcode"),
    ("2020", "teamsschool", "ts-20", "Teams-school leftover — 2020",
     "Teams-for-school leftover. Teams is not the Zoom star.",
     "Teams replaced Zoom as the star (trap)", "../zoom/meeting.html",
     "2020 leftover — Teams-school, not the Zoom mute→Leave chip",
     "Empty / trap never writes · not the chip",
     "Ack leftover Teams"),
]


def hops_html(year, slug, suffix, title, body, hop1, hop2, go, trap, nxt) -> str:
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
<p><button type="button" data-4x-trap data-official-trap>{trap}</button></p>
</div>
<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="hops" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><button type="button" data-4x-hop="a">{hop1}</button> <button type="button" data-4x-hop="b">{hop2}</button></p>
<p><button type="button" data-4x-go="{suffix}">{go}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{suffix}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:{d2}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · {slug} d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Second leftover note<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="second leftover"></label></p>
<p><button type="button" data-4x-go="{d2}">Save second leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{d2}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{d2}:end -->
</body>
</html>
"""


def checks_html(year, slug, suffix, title, body, trap, nxt, req1, req2, go) -> str:
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
<p><button type="button" data-4x-trap data-official-trap>{trap}</button></p>
</div>
<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="checks" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label style="display:block"><input type="checkbox" data-4x-req> {req1}</label>
<label style="display:block"><input type="checkbox" data-4x-req> {req2}</label></p>
<p><button type="button" data-4x-go="{suffix}">{go}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{suffix}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:{d2}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · {slug} d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Second leftover note<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="second leftover"></label></p>
<p><button type="button" data-4x-go="{d2}">Save second leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{d2}"><b>Next:</b> <a href="{nxt}">★ year star</a></p>
</section>
<!-- ITT-4X:{d2}:end -->
</body>
</html>
"""


def main() -> None:
    rows = json.loads((ROOT / "e2e" / "2x-links.matrix.json").read_text())
    by_key = {(r.get("year"), r.get("key")): r for r in rows}
    n = 0
    for rec in REAL:
        year, slug, suffix, title, body, hop1, hop2, go, trap, nxt = rec
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        dest.write_text(
            hops_html(year, slug, suffix, title, body, hop1, hop2, go, trap, nxt),
            encoding="utf-8",
        )
        key = f"itt{year[2:]}-{suffix}"
        row = by_key.get((year, key))
        if row:
            row["kind"] = "hops"
            row["title"] = title
        n += 1
        print("hops", dest.relative_to(ROOT))
    for rec in CHECKS:
        year, slug, suffix, title, body, trap, nxt, req1, req2, go = rec
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        dest.write_text(
            checks_html(year, slug, suffix, title, body, trap, nxt, req1, req2, go),
            encoding="utf-8",
        )
        n += 1
        print("checks", dest.relative_to(ROOT))
    (ROOT / "e2e" / "2x-links.matrix.json").write_text(
        json.dumps(rows, indent=2) + "\n", encoding="utf-8"
    )
    print("rewrote", n)


if __name__ == "__main__":
    main()
