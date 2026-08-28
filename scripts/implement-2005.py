#!/usr/bin/env python3
"""Implement 2005 full year from the 2026-08-26 freeze.

Steal 2004 density. Do not checkout the wiped tree. Do not touch 2004 gold.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "years" / "2004"
DST = ROOT / "years" / "2005"


def write(p: Path, t: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(t, encoding="utf-8")


def retarget(text: str) -> str:
    reps = [
        ('data-itt-year="2004"', 'data-itt-year="2005"'),
        ("itt04-", "itt05-"),
        ("immersion-2004.js", "immersion-2005.js"),
        ("browser-2004.js", "browser-2005.js"),
        ("js/config/2004.js", "js/config/2005.js"),
        ("year-2004", "year-2005"),
        ("yg-year-2004", "yg-year-2005"),
        ("ott-guided-2004", "ott-guided-2005"),
        ('data-ott-one-thing="2004"', 'data-ott-one-thing="2005"'),
        ('data-itt-pop3x="2004"', 'data-itt-pop3x="2005"'),
        ('data-itt-pop-more="2004"', 'data-itt-pop-more="2005"'),
        ('data-itt-pop-3x3="2004"', 'data-itt-pop-3x3="2005"'),
        ('data-itt-year-extras="2004"', 'data-itt-year-extras="2005"'),
        ('data-itt-mass="2004"', 'data-itt-mass="2005"'),
        ("years/2004/", "years/2005/"),
        ("web2004", "web2005"),
        ('class="year-2004', 'class="year-2005'),
        ('ITT.bootBrowserYear("2004")', 'ITT.bootBrowserYear("2005")'),
        ('ITT.configs["2004"]', 'ITT.configs["2005"]'),
        ('storagePrefix: "itt04"', 'storagePrefix: "itt05"'),
        ("itt-2004-", "itt-2005-"),
        ('data-year="2004"', 'data-year="2005"'),
        ("Welcome to the World Wide Web — 2004", "Welcome to the World Wide Web — 2005"),
        ("Starting Point — 2004", "Starting Point — 2005"),
        ("About 2004", "About 2005"),
        ("2004 UX flow map", "2005 UX flow map"),
        ("ITT-2X-REMAIN:2004", "ITT-2X-REMAIN:2005"),
        ("ott-2x-2004", "ott-2x-2005"),
        ("Internet Explorer 6.0 — 2004", "Internet Explorer 6.0 — 2005"),
        ("paintStart(\"2004\")", "paintStart(\"2005\")"),
        ('ITT.YearUI.paint("2004")', 'ITT.YearUI.paint("2005")'),
        ("period-2004.css", "period-2005.css"),
        ("period-2004-lite.css", "period-2005-lite.css"),
    ]
    for a, b in reps:
        text = text.replace(a, b)
    return text


def copy_forest() -> None:
    if DST.exists():
        shutil.rmtree(DST)
    shutil.copytree(SRC, DST)
    for p in DST.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".html", ".htm", ".js", ".css", ".md"}:
            try:
                t = p.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                continue
            n = retarget(t)
            if n != t:
                p.write_text(n, encoding="utf-8")


def page(title: str, body: str, css: str = "period-2005.css") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>{title} — 2005</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000cc" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
"""


def lo_panel(suffix: str, title: str, need: str, field: bool, ph: str, ticks: list[str], trap: str, next_href: str, next_label: str) -> str:
    field_html = (
        f'<p><label>Leftover<br><input type="text" data-lo-field maxlength="80" placeholder="{ph}"></label></p>'
        if field
        else ""
    )
    tick_html = "".join(
        f'<p><label><input type="checkbox" data-lo-req> {t}</label></p>' for t in ticks
    )
    pick = f'<p><button type="button" data-lo-pick="{need}">{need}</button></p>' if need else ""
    return f"""
<div data-lo-panel="1" data-itt-year="2005" style="margin:12px 0;padding:12px;border:1px solid #333;max-width:46em;font-family:Arial,sans-serif;font-size:13px;background:#fffef5">
<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>
<p style="font-size:12px">Leftover · incomplete never writes · not the YouTube upload chip.</p>
{pick}
{field_html}
{tick_html}
<p><button type="button" data-lo-trap>{trap}</button>
<button type="button" data-lo-save data-lo-key="{suffix}" data-lo-need-pick="{need}">Save leftover</button></p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt05-{suffix}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
"""


def x4(suffix: str, kind: str, title: str, honest: str, next_href: str, next_label: str, min_n: int = 2) -> str:
    inner = ""
    if kind == "query":
        inner = '<p><label>Type<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="2005 leftover"></label></p>'
    elif kind == "checks":
        inner = (
            '<p><label><input type="checkbox" data-4x-req> Year-true 2005 leftover.</label></p>'
            '<p><label><input type="checkbox" data-4x-req> Incomplete never writes.</label></p>'
        )
    elif kind == "hops":
        inner = (
            '<p><button type="button" data-4x-hop="a">Open A</button> '
            '<button type="button" data-4x-hop="b">Open B</button></p>'
        )
    elif kind == "wait":
        inner = '<p><button type="button" data-4x-wait data-4x-wait-ms="1600">Wait the period timer</button></p>'
    elif kind == "toggle":
        inner = (
            '<p><button type="button" data-4x-toggle="off">Off</button> '
            '<button type="button" data-4x-toggle="on">On</button></p>'
        )
    return f"""
<!-- ITT-4X:{suffix}:start -->
<section class="itt-4x-panel" data-4x-panel data-4x-kind="{kind}" data-4x-min="{min_n}" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:15px">{title}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{honest}</p>
{inner}
<p><button type="button" data-4x-go="{suffix}">Do this</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt05-{suffix}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</section>
<!-- ITT-4X:{suffix}:end -->
"""


def ensure_x4(path: Path, suffix: str, kind: str, title: str, honest: str, nxt: str, nxt_l: str) -> None:
    if not path.exists():
        write(
            path,
            page(
                title,
                f"""<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{title}</h1>
<p class="itt-pixel-failed">[failed-final] leftover · 2005 door · no official mark</p>
<p>2005 leftover dest. Incomplete never writes.</p>
"""
                + x4(suffix, kind, title, honest, nxt, nxt_l),
            ),
        )
        return
    t = path.read_text(encoding="utf-8")
    if f'data-4x-go="{suffix}"' in t:
        return
    block = x4(suffix, kind, title, honest, nxt, nxt_l)
    if "</body>" in t:
        t = t.replace("</body>", block + "\n</body>", 1)
    else:
        t += block
    path.write_text(t, encoding="utf-8")


def write_gold() -> None:
    write(
        DST / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2005</title>
<link rel="stylesheet" href="../../../css/period-2005.css">
<link rel="stylesheet" href="../../../css/year-start-quiet.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#3a6ea5" text="#000000" link="#000080" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../js/year-ui/start-data.js"></script>
<script src="../../../js/year-ui/start.js"></script>
<script>ITT.YearUI.paintStart("2005");</script>
<p class="itt-mass-honesty" data-itt-mass="2005" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>Yahoo — #1 visits</b>. YouTube is the culture gold. <a href="../sites/yahoo/index.html">Open Yahoo</a>.</p>
<p class="itt-continuity-note" data-itt-forest="1" style="font-family:Arial,sans-serif;font-size:11px;margin:8px 0;padding:6px 8px;background:#ffffcc;border:1px dashed #996;max-width:48em">Amazon / Yahoo / portal rooms below may be <b>held over</b> from earlier years. Year-true 2005 products sit on the chips and the star.</p>

<table class="itt-start" cellpadding="0" cellspacing="0" border="0">
<tr><td class="itt-start-title"><b>Starting Point — 2005</b><span class="itt-start-meta"> · Windows XP · Internet Explorer 6 · Web 2.0 boom</span></td></tr>
<tr><td class="itt-start-thesis">
 <b>64,780,617 websites · 1,027,580,990 users</b> (June 2005) —
 YouTube still independent · Maps + Ajax · Reddit · Digg rise · iTunes podcasts.
 Default shell stays <b>IE6 on XP</b>. No Twitter. No iPhone. No Street View.
</td></tr>
<tr><td class="itt-start-body">
 <div data-itt-tour></div>
<div data-ott-one-thing="2005" class="ott-one-thing" style="margin:10px 0;padding:10px;border:2px solid #c00;background:#fff0f0;max-width:46em;font-family:Arial,sans-serif">
 <b>★ One-thing · YouTube upload</b><br>
 <a href="../sites/youtube/upload.html"><b>Upload, tag and share</b></a> — mid-2005 product. Empty / dating form / Google-owned never write.
</div>
<ol id="ott-guided-2005" class="ott-guided" style="margin:8px 0 12px 20px;font-family:Arial,sans-serif;font-size:13px">
 <li><a href="about.html"><b>About 2005</b></a> — 64.8M · 1.03B · bans</li>
 <li><a href="../sites/youtube/upload.html"><b>YouTube upload</b></a> — the save</li>
 <li><a href="../sites/maps/index.html"><b>Google Maps</b></a> — 8 Feb drag</li>
 <li><a href="../sites/reddit/index.html"><b>Reddit</b></a> — June boost</li>
 <li><a href="../sites/digg/index.html"><b>Digg</b></a> — rise / bury</li>
 <li><a href="map.html"><b>Year flow map</b></a></li>
</ol>
<p class="itt-flow-map-link"><a href="map.html"><b>&#9783; 2005 UX flow map</b></a></p>
<p class="itt-playable-link" data-itt-year-extras="2005" style="font-size:13px;margin:10px 0;padding:8px 10px;border:2px solid #333;background:#ffc;max-width:46em"><b>▶ Play this year’s game</b> — <a href="../sites/playable/game.html"><b>HoverChop</b></a> · <a href="../sites/playable/famous.html">Famous games</a> · <a href="../sites/playable/index.html">Game cabinet</a> <span style="font-size:11px;color:#444">(key <code>itt05-game-heli</code>)</span></p>
 <div class="itt-product-chips"><b class="itt-chips-label">Open these first (2005 products)</b>
  <a href="../sites/youtube/upload.html" class="chip-red"><b>YouTube</b><br><span style="color:#666">upload</span></a>
  <a href="../sites/maps/index.html" class="chip-blue"><b>Maps</b><br><span style="color:#666">Ajax drag</span></a>
  <a href="../sites/reddit/index.html" class="chip-orange"><b>Reddit</b><br><span style="color:#666">boost</span></a>
  <a href="../sites/digg/index.html" class="chip-green"><b>Digg</b><br><span style="color:#666">bury</span></a>
 </div>
 <p style="font-size:12px;font-family:Arial,sans-serif;max-width:48em">Official leftovers: <a href="../sites/pandora/index.html">Pandora</a> · <a href="../sites/housingmaps/index.html">HousingMaps</a> · <a href="../sites/flickr/index.html">Flickr</a> · <a href="../sites/itunes/index.html">iTunes podcasts</a> · <a href="../sites/techcrunch/index.html">TechCrunch</a></p>
</td></tr>
</table>
<script src="../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "pages/about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>About 2005</title>
<link rel="stylesheet" href="../../../css/period-2005.css">
</head>
<body bgcolor="#ffffff" text="#000000">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px;font-family:Arial,sans-serif;font-size:13px">
<p><a href="home.html">Starting Point</a></p>
<h1>About 2005</h1>
<p><b>64,780,617</b> websites (Internet Live Stats, <b>June 2005</b>) · +26% from 51,611,646 · <b>1,027,580,990</b> users · 16 users/site · launched YouTube, Reddit.</p>
<p>Netcraft <b>December 2005</b>: <b>74,353,258</b> hostnames. Print as December, not June.</p>
<p>Yahoo is still #1 <i>visits</i>. YouTube is the <i>culture</i> gold — independent. Google does not own it yet.</p>
<p><b>Bans:</b> Twitter / Twttr (2006) · Facebook open / News Feed (Sep 2006) · Google owns YouTube (Oct 2006) · Chrome (2008) · iPhone (2007) · Street View (2007) · Vista as default.</p>
<p>Shell: Windows XP + Internet Explorer 6. Firefox 1.x is what bloggers use.</p>
<div data-lo-panel="1" data-itt-year="2005" style="border:1px solid #333;padding:10px;margin:12px 0">
<p><label><input type="checkbox" data-lo-req> June 64,780,617 is ILS, not Netcraft December.</label></p>
<p><label><input type="checkbox" data-lo-req> YouTube is independent in 2005.</label></p>
<p><button type="button" data-lo-trap>Twitter already launched</button>
<button type="button" data-lo-save data-lo-key="about">Save thesis</button></p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt05-about"><b>Next:</b> <a href="../sites/youtube/upload.html">YouTube upload</a></p>
</div>
</div>
<script src="../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    yt_head = """<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>YouTube — 2005</title>
<link rel="stylesheet" href="../../../../css/period-2005.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
<style>
.yt-wrap{max-width:52em;margin:12px auto;font-family:Arial,Helvetica,sans-serif;font-size:13px}
.yt-bar{background:#fff;border-bottom:1px solid #ccc;padding:8px 0;margin-bottom:10px}
.yt-grid{display:block}
.yt-cell{display:inline-block;width:140px;margin:0 10px 12px 0;vertical-align:top}
.yt-thumb{display:block;height:88px;background:#222;color:#fff;text-align:center;padding-top:28px;text-decoration:none}
.yt-player-stage{background:#111;color:#fff;height:220px;text-align:center;padding-top:80px}
.yt-player-bar{background:#444;height:14px;margin-top:4px;position:relative}
.yt-player-bar-fill{background:#f00;height:14px}
</style>
</head>
<body bgcolor="#ffffff" text="#333333" link="#0033cc">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="yt-wrap">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="index.html">YouTube</a></p>
<p class="itt-pixel-failed">[failed-final] mid-2005 video product · no official mark</p>
"""

    write(
        DST / "sites/youtube/index.html",
        yt_head
        + """
<div class="yt-bar"><b>YouTube</b> — Broadcast Yourself. · <a href="upload.html">Upload Videos</a> · <a href="invite.html">Invite Friends</a> · <a href="channels.html">Channels</a> · <a href="about.html">About</a></div>
<h1>Watch Videos</h1>
<p>Upload, tag and share your videos worldwide.</p>
<div data-yt-list class="yt-grid"></div>
<p style="font-size:11px">©2005 YouTube, LLC</p>
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/youtube/upload.html",
        yt_head
        + """
<div class="yt-bar"><b>YouTube</b> — <a href="index.html">Watch Videos</a> · <b>Upload Videos</b> · <a href="invite.html">Invite Friends</a></div>
<h1>Upload Videos</h1>
<p>Upload, tag and share your videos worldwide.</p>
<form data-yt-upload>
<p><label>Title<br><input type="text" name="title" size="40" maxlength="80"></label></p>
<p><label>Description / tags<br><input type="text" name="desc" size="40" maxlength="120"></label></p>
<p><label><input type="checkbox" data-yt-req> 23 Apr 2005 · <i>Me at the zoo</i> — independent YouTube, not Google.</label></p>
<p><label><input type="checkbox" data-yt-req> Upload is the save — empty / dating form / 2006-buy never write.</label></p>
<p><button type="submit">Upload</button></p>
<p data-yt-upload-status></p>
</form>
<p><a href="dating.html">Early dating pitch (honesty only)</a></p>
<p hidden data-next-flow data-next-when-key="itt05-yt-did-upload,itt05-yt-uploads"><b>Next:</b> <a href="../maps/index.html">Google Maps</a></p>
<p style="font-size:11px">©2005 YouTube, LLC</p>
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/youtube/watch.html",
        yt_head
        + """
<div class="yt-bar"><a href="index.html">Watch Videos</a> · <a href="upload.html">Upload</a></div>
<h1 data-yt-title>Me at the zoo</h1>
<div data-yt-player></div>
<p>Views <span data-yt-views data-yt-base="19">19</span> · <button type="button" data-yt-like>Rate</button></p>
<p data-yt-status></p>
<p data-yt-share-bridges></p>
<p style="font-size:11px">©2005 YouTube, LLC</p>
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/youtube/about.html",
        yt_head
        + """
<h1>About YouTube</h1>
<p>Founded 2005. First video <i>Me at the zoo</i> 23 Apr. Sequoia $3.5M 7 Nov — still independent. Official launch class 15 Dec. Google buys YouTube in <b>October 2006</b>.</p>
<p>Default UI here is mid-2005: Upload, tag and share. The April dating form is honesty only.</p>
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/youtube/channels.html",
        yt_head
        + """
<h1>My channel</h1>
<div data-yt-channel-mine></div>
<p><a href="upload.html">Upload</a></p>
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/youtube/invite.html",
        yt_head
        + """
<h1>Invite Friends</h1>
<p>Mid-2005 YouTube leftover. Not the star.</p>
"""
        + x4("yt-inv", "hops", "Invite leftover", "Two hops. Incomplete never writes.", "../maps/index.html", "Maps")
        + """
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/youtube/dating.html",
        yt_head
        + """
<h1>Tune In, Hook Up — honesty</h1>
<p>April 2005 dating form. This never writes. Upload is the product.</p>
<form>
<p>I'm a <select><option>male</option><option>female</option></select> seeking
<select><option>females</option><option>males</option></select></p>
<p><button type="submit">This dating form never writes</button></p>
</form>
<p><a href="upload.html">Go to Upload</a></p>
</div>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )

    write(
        DST / "sites/maps/index.html",
        page(
            "Google Maps",
            """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Google Maps</h1>
<p>8 Feb 2005 · Bret Taylor · click and drag · no wait. <b>Not Street View</b> (2007).</p>
<div data-maps-canvas style="width:480px;height:280px;border:1px solid #333"></div>
<p>
<button type="button" data-maps-pan="w">W</button>
<button type="button" data-maps-pan="n">N</button>
<button type="button" data-maps-pan="s">S</button>
<button type="button" data-maps-pan="e">E</button>
<button type="button" data-maps-zoom="+">+</button>
<button type="button" data-maps-zoom="-">−</button>
</p>
<form data-maps-search>
<input name="q" size="28" placeholder="hotels near LAX">
<button type="submit" data-maps-search>Search</button>
</form>
<p data-maps-status></p>
<div data-maps-results></div>
<p data-maps-history></p>
"""
            + lo_panel(
                "maps",
                "Keep this view",
                "addr",
                True,
                "hotels near LAX",
                ["8 Feb 2005 desktop — not Street View.", "This is leftover. Upload is the 2005 chip."],
                "Open Street View (2007)",
                "../reddit/index.html",
                "Reddit",
            ),
        ),
    )
    write(DST / "sites/maps/about.html", page("Maps about", "<h1>Maps about</h1><p>Feb 8 2005. Ajax Feb 18. API June. HousingMaps was earlier, pre-API. No Street View.</p>"))

    write(
        DST / "sites/reddit/index.html",
        page(
            "reddit",
            """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>reddit</h1>
<p>June 2005 · YC · hottest. Empty submit never writes.</p>
<p><button type="button" data-lo-pick="sub">boost this link</button>
<button type="button" data-lo-pick="hot">hottest</button></p>
<form action="submit.html"><input name="title" placeholder="submit"><button type="submit">submit</button></form>
"""
            + lo_panel(
                "reddit",
                "Keep front page",
                "sub",
                True,
                "leftover link",
                ["June 2005 · YC · not 2006 Condé Nast.", "Boost is leftover. Upload is the chip."],
                "This is already Digg v4",
                "../digg/index.html",
                "Digg",
            ),
        ),
    )
    write(DST / "sites/reddit/submit.html", page("reddit submit", "<h1>submit</h1><p>Empty title is blocked by leftover machine on index. Type a title on the front page leftover field.</p>"))
    write(DST / "sites/reddit/about.html", page("reddit about", "<h1>about</h1><p>First line of code 4 Jun 2005. Live 22/23 Jun. Paul Graham linked it.</p>"))

    write(
        DST / "sites/digg/index.html",
        page(
            "Digg",
            """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Digg</h1>
<p>2005 is the rise year. Diggnation ep.1 1 Jul.</p>
<p><button type="button" data-lo-pick="digg">digg it</button>
<button type="button" data-lo-pick="bury">bury</button></p>
"""
            + lo_panel(
                "digg",
                "Keep pile",
                "digg",
                False,
                "",
                ["Rise year 2005 — not the 2004 seed as gold.", "Bury is leftover. Upload is the chip."],
                "This is already Reddit gold",
                "../../pages/map.html",
                "Year map",
            ),
        ),
    )
    write(DST / "sites/digg/submit.html", page("Digg submit", "<h1>submit</h1>"))
    write(DST / "sites/digg/about.html", page("Digg about", "<h1>about</h1><p>Diggnation ep.1 July 1, 2005.</p>"))

    write(
        DST / "sites/pandora/index.html",
        page(
            "Pandora",
            """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Pandora</h1>
<p>Late summer 2005 · Music Genome · leftover, <b>not the star</b>.</p>
<div data-pd-root>
<form data-pd-create>
<input name="q" data-pd-q placeholder="type an artist">
<button type="submit">Create station</button>
</form>
<p data-pd-now></p>
<p data-pd-status></p>
</div>
"""
            + lo_panel(
                "pandora",
                "Station leftover path",
                "",
                True,
                "Radiohead",
                ["Late summer 2005 — leftover, not the 2005 chip.", "Music Genome / not Spotify (2008)."],
                "This is the 2005 star",
                "../housingmaps/index.html",
                "HousingMaps",
            ),
        ),
    )

    write(
        DST / "sites/housingmaps/index.html",
        page(
            "HousingMaps",
            """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>HousingMaps</h1>
<p>Paul Rademacher · ~Apr 2005 · Craigslist + Maps · <b>pre-API</b>.</p>
<form data-hm-filter>
<select name="city" data-hm-city>
<option>San Francisco</option><option>New York</option><option>Chicago</option>
</select>
<button type="submit">Filter</button>
</form>
<div data-hm-pins style="position:relative;height:220px;border:1px solid #333;background:#cde"></div>
<p data-hm-status></p>
"""
            + lo_panel(
                "housingmaps",
                "Show listings leftover",
                "pin",
                False,
                "",
                ["Craigslist listings on Google Maps.", "Pre-API ~Apr 2005 — unaffiliated."],
                "This used the official June API",
                "../digg/index.html",
                "Digg",
            )
            + '<p><button type="button" data-lo-pick="pin">Drop a pin</button></p>',
        ),
    )

    write(
        DST / "sites/techcrunch/index.html",
        page(
            "TechCrunch",
            """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>TechCrunch</h1>
<p>June 2005 · Michael Arrington · Tracking Web 2.0.</p>
"""
            + lo_panel(
                "techcrunch",
                "Keep this post",
                "post",
                True,
                "leftover startup",
                ["TechCrunch launches June 2005.", "Blog leftover — not the chip."],
                "This is already Recode",
                "../playable/game.html",
                "HoverChop",
            )
            + '<p><button type="button" data-lo-pick="post">Open a June-class post</button></p>',
        ),
    )

    # iTunes / flickr already exist from 2004 copy — add official leftover panels
    for rel, suffix, title, need, field, ph, ticks, trap, nxt, nl in [
        (
            "sites/itunes/index.html",
            "itunes",
            "Subscribe leftover",
            "show",
            True,
            "leftover show",
            ["iTunes 4.9 · 28 Jun 2005.", ">1 million subscriptions in two days."],
            "This is already Spotify",
            "../techcrunch/index.html",
            "TechCrunch",
        ),
        (
            "sites/flickr/index.html",
            "flickr",
            "Flickr leftover",
            "photo",
            True,
            "leftover photo",
            ["Yahoo bought Flickr 20 Mar 2005.", "Not Yahoo Photos."],
            "This is Yahoo Photos",
            "../delicious/index.html",
            "del.icio.us",
        ),
    ]:
        p = DST / rel
        if p.exists():
            t = p.read_text(encoding="utf-8")
            if f'data-lo-key="{suffix}"' not in t:
                block = lo_panel(suffix, title, need, field, ph, ticks, trap, nxt, nl)
                block += f'<p><button type="button" data-lo-pick="{need}">{need}</button></p>'
                t = t.replace("</body>", block + "\n</body>") if "</body>" in t else t + block
                p.write_text(t, encoding="utf-8")


def write_new_rooms() -> None:
    rooms = {
        "dailymotion/index.html": ("DailyMotion", "Founded 15 Mar 2005. Leftover video."),
        "vimeo/index.html": ("Vimeo", "Self-register 18 Jun 2005. Leftover video."),
        "googlevideo/index.html": ("Google Video", "Search 25 Jan · play-in-page 27 Jun. Not YouTube."),
        "googleearth/index.html": ("Google Earth", "Mid-2005 leftover. Not Street View."),
        "mashable/index.html": ("Mashable", "~Jul 2005 · Pete Cashmore."),
        "programmableweb/index.html": ("ProgrammableWeb", "Aug 2005 · John Musser · APIs."),
        "milliondollar/index.html": ("Million Dollar Homepage", "26 Aug 2005 · Alex Tew · $1/pixel."),
        "kayak/index.html": ("Kayak", "2005 travel leftover."),
        "clubpenguin/index.html": ("Club Penguin", "Public 24 Oct 2005."),
        "secondlife/index.html": ("Second Life", "2005 leftover."),
        "utorrent/index.html": ("µTorrent", "2005 client leftover."),
        "gaia/index.html": ("Gaia Online", "2005 leftover."),
        "skype/index.html": ("Skype", "eBay $2.6B 12 Sep 2005."),
        "feedburner/index.html": ("FeedBurner", "RSS stats leftover."),
        "redditfront/index.html": ("reddit hottest", "Second Reddit path."),
        "googleearthkml/index.html": ("Earth KML leftover", "Not Maps gold."),
        "kayakplus/index.html": ("Kayak leftover+", "Second travel path."),
    }
    for rel, (title, blurb) in rooms.items():
        p = DST / "sites" / rel
        if p.exists() and p.stat().st_size > 400:
            continue
        write(
            p,
            page(
                title,
                f'<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p><h1>{title}</h1><p>{blurb}</p><p class="itt-pixel-failed">[failed-final] leftover · 2005 door</p>',
            ),
        )


FREEZE = [
    # path, suffix, kind, title, next, next_label
    ("sites/youtube/upload.html", "yt-lx", "query", "YouTube leftover title", "../maps/index.html", "Maps"),
    ("sites/youtube/invite.html", "yt-inv", "hops", "YouTube invite", "../maps/index.html", "Maps"),
    ("sites/youtube/watch.html", "yt-watch", "hops", "Watch leftover", "../maps/index.html", "Maps"),
    ("sites/maps/index.html", "maps-lx", "hops", "Maps two views", "../reddit/index.html", "Reddit"),
    ("sites/maps/index.html", "maps-lax", "query", "hotels near LAX", "../reddit/index.html", "Reddit"),
    ("sites/maps/about.html", "maps-nsv", "checks", "No Street View", "../housingmaps/index.html", "HousingMaps"),
    ("sites/maps/about.html", "ajax-lx", "checks", "Ajax 18 Feb", "../housingmaps/index.html", "HousingMaps"),
    ("sites/housingmaps/index.html", "hm-lx", "query", "HousingMaps city", "../digg/index.html", "Digg"),
    ("sites/housingmaps/index.html", "hm-ck", "checks", "Mashup ticks", "../digg/index.html", "Digg"),
    ("sites/reddit/index.html", "reddit-lx", "hops", "Reddit leftover boost", "../digg/index.html", "Digg"),
    ("sites/reddit/index.html", "reddit-hot", "hops", "hottest leftover", "../digg/index.html", "Digg"),
    ("sites/reddit/about.html", "reddit-empty", "checks", "Empty submit literacy", "../digg/index.html", "Digg"),
    ("sites/digg/index.html", "digg-lx", "hops", "Digg leftover bury", "../housingmaps/index.html", "HousingMaps"),
    ("sites/digg/index.html", "digg-up", "hops", "Digg promote", "../../pages/map.html", "Map"),
    ("sites/digg/about.html", "diggnation", "checks", "Diggnation 1 Jul", "../../pages/map.html", "Map"),
    ("sites/pandora/index.html", "pandora-lx", "query", "Pandora leftover station", "../housingmaps/index.html", "HousingMaps"),
    ("sites/pandora/index.html", "pandora-ck", "checks", "Genome leftover", "../housingmaps/index.html", "HousingMaps"),
    ("sites/itunes/index.html", "pod-lx", "query", "Podcast name", "../techcrunch/index.html", "TechCrunch"),
    ("sites/itunes/index.html", "pod-1m", "checks", ">1M in two days", "../techcrunch/index.html", "TechCrunch"),
    ("sites/flickr/index.html", "flickr-lx", "query", "Flickr leftover tag", "../delicious/index.html", "delicious"),
    ("sites/flickr/index.html", "flickr-tag", "query", "Second tag", "../delicious/index.html", "delicious"),
    ("sites/delicious/index.html", "deli-lx", "query", "delicious leftover", "../techcrunch/index.html", "TechCrunch"),
    ("sites/delicious/index.html", "deli-bm", "checks", "Yahoo 9 Dec", "../techcrunch/index.html", "TechCrunch"),
    ("sites/techcrunch/index.html", "tc-lx", "query", "TechCrunch leftover", "../playable/game.html", "HoverChop"),
    ("sites/mashable/index.html", "mash-lx", "query", "Mashable leftover", "../techcrunch/index.html", "TechCrunch"),
    ("sites/programmableweb/index.html", "pw-lx", "query", "API leftover", "../techcrunch/index.html", "TechCrunch"),
    ("sites/dailymotion/index.html", "dm-lx", "query", "DailyMotion leftover", "../youtube/index.html", "YouTube"),
    ("sites/vimeo/index.html", "vimeo-lx", "query", "Vimeo leftover", "../youtube/index.html", "YouTube"),
    ("sites/googlevideo/index.html", "gv-lx", "query", "Google Video search", "../youtube/index.html", "YouTube"),
    ("sites/googlevideo/index.html", "gv-play", "hops", "Google Video play", "../youtube/index.html", "YouTube"),
    ("sites/googleearth/index.html", "earth-lx", "hops", "Earth leftover", "../maps/index.html", "Maps"),
    ("sites/milliondollar/index.html", "mdh-lx", "query", "Million Dollar leftover", "../../pages/home.html", "Start"),
    ("sites/clubpenguin/index.html", "cp-lx", "hops", "Club Penguin leftover", "../../pages/home.html", "Start"),
    ("sites/firefox/index.html", "fx15-lx", "checks", "Firefox 1.5 leftover", "../../pages/home.html", "Start"),
    ("sites/kayak/index.html", "kayak-lx", "query", "Kayak leftover", "../../pages/home.html", "Start"),
    ("sites/feedburner/index.html", "fburn-lx", "query", "FeedBurner leftover", "../bloglines/index.html", "Bloglines"),
    ("sites/bloglines/index.html", "blines-lx", "hops", "Bloglines leftover", "../feedburner/index.html", "FeedBurner"),
    ("sites/web20conference/index.html", "w20-lx", "checks", "Web 2.0 Conf leftover", "../../pages/about.html", "About"),
    ("sites/facebook/index.html", "fb-rename", "checks", "Facebook rename leftover", "../facebook/networks.html", "Networks"),
    ("sites/facebook/networks.html", "fb-hs", "hops", "High school leftover", "../facebook/invite.html", "Invite"),
    ("sites/myspace/index.html", "ms-lx", "hops", "MySpace leftover", "../myspace/index.html", "MySpace"),
    ("sites/myspace/index.html", "ms-sold", "checks", "MySpace $580M", "../../pages/about.html", "About"),
    ("sites/facebook/networks.html", "fb-net", "hops", "College networks leftover", "../facebook/invite.html", "Invite"),
    ("sites/facebook/invite.html", "fb-inv", "query", "Facebook invite leftover", "../gmail/index.html", "Gmail"),
    ("sites/friendster/index.html", "fs-lx", "hops", "Friendster leftover", "../myspace/index.html", "MySpace"),
    ("sites/gaia/index.html", "gaia-lx", "query", "Gaia leftover", "../myspace/index.html", "MySpace"),
    ("sites/skype/index.html", "skype-lx", "hops", "Skype leftover", "../ebay/index.html", "eBay"),
    ("sites/skype/index.html", "skype-call", "toggle", "Skype call leftover", "../ebay/index.html", "eBay"),
    ("sites/gmail/index.html", "gmail-lx", "query", "Gmail still-invite", "../yahoo/index.html", "Yahoo"),
    ("sites/google/index.html", "google-q", "query", "Google search leftover", "../yahoo/index.html", "Yahoo"),
    ("sites/yahoo/index.html", "yahoo-lx", "hops", "Yahoo portal leftover", "../google/index.html", "Google"),
    ("sites/technorati/index.html", "techno-lx", "query", "Technorati leftover", "../blogger/index.html", "Blogger"),
    ("sites/movabletype/index.html", "mt-lx", "hops", "Movable Type leftover", "../wordpress/index.html", "WordPress"),
    ("sites/wordpress/index.html", "wp-lx", "hops", "WordPress leftover", "../blogger/index.html", "Blogger"),
    ("sites/blogger/index.html", "blogger-lx", "hops", "Blogger leftover", "../wordpress/index.html", "WordPress"),
    ("sites/lastfm/index.html", "lastfm-lx", "query", "Last.fm leftover", "../pandora/index.html", "Pandora"),
    ("sites/linkedin/index.html", "li-lx", "query", "LinkedIn leftover", "../facebook/index.html", "Facebook"),
    ("sites/steam/index.html", "steam-lx", "hops", "Steam leftover", "../../pages/home.html", "Start"),
    ("sites/secondlife/index.html", "sl-lx", "hops", "Second Life leftover", "../../pages/home.html", "Start"),
    ("sites/utorrent/index.html", "ut-lx", "hops", "µTorrent leftover", "../../pages/home.html", "Start"),
    ("sites/wikipedia/index.html", "wiki-lx", "query", "Wikipedia leftover", "../google/index.html", "Google"),
    ("sites/amazon/index.html", "amz-lx", "hops", "Amazon leftover", "../ebay/index.html", "eBay"),
    ("sites/ebay/index.html", "ebay-lx", "hops", "eBay leftover", "../amazon/index.html", "Amazon"),
    ("sites/paypal/index.html", "pp-lx", "hops", "PayPal leftover", "../ebay/index.html", "eBay"),
    ("sites/cnn/index.html", "cnn-lx", "hops", "CNN leftover", "../../pages/home.html", "Start"),
    ("sites/apple/index.html", "ipod-lx", "hops", "iPod leftover", "../itunes/index.html", "iTunes"),
    ("sites/microsoft/index.html", "msft-lx", "hops", "Microsoft leftover", "../../pages/home.html", "Start"),
    ("sites/adsense/index.html", "ads-lx", "hops", "AdSense leftover", "../google/index.html", "Google"),
    ("sites/slashdot/index.html", "sd-lx", "hops", "Slashdot leftover", "../digg/index.html", "Digg"),
    ("sites/metafilter/index.html", "mefi-lx", "hops", "MetaFilter leftover", "../slashdot/index.html", "Slashdot"),
    ("sites/memeorandum/index.html", "memo-lx", "hops", "Memeorandum leftover", "../technorati/index.html", "Technorati"),
    ("sites/daypop/index.html", "daypop-lx", "query", "Daypop leftover", "../technorati/index.html", "Technorati"),
    ("sites/netflix/index.html", "nflx-lx", "hops", "Netflix DVD leftover", "../../pages/home.html", "Start"),
    ("sites/maps/about.html", "mq-trap", "checks", "MapQuest print trap", "../maps/index.html", "Maps"),
    ("sites/bloglines/index.html", "ask-bl", "checks", "Ask→Bloglines", "../feedburner/index.html", "FeedBurner"),
    ("pages/about.html", "android-fn", "checks", "Android quiet footnote", "home.html", "Start"),
    ("sites/facebook/about.html", "fb-accel", "checks", "Accel $12.7M", "../facebook/index.html", "Facebook"),
    ("sites/youtube/about.html", "yt-seq", "checks", "Sequoia $3.5M", "upload.html", "Upload"),
    ("sites/youtube/about.html", "yt-dec", "checks", "15 Dec launch class", "upload.html", "Upload"),
    ("sites/youtube/about.html", "yt-ind", "checks", "Independent 2005", "upload.html", "Upload"),
    ("sites/altavista/index.html", "av-lx", "query", "AltaVista leftover", "../google/index.html", "Google"),
    ("sites/askjeeves/index.html", "aj-lx", "query", "Ask Jeeves leftover", "../google/index.html", "Google"),
    ("sites/encarta/index.html", "enc-lx", "hops", "Encarta leftover", "../wikipedia/index.html", "Wikipedia"),
    ("sites/excite/index.html", "exc-lx", "query", "Excite leftover", "../google/index.html", "Google"),
    ("sites/hotbot/index.html", "hb-lx", "query", "HotBot leftover", "../google/index.html", "Google"),
    ("sites/infoseek/index.html", "is-lx", "query", "Infoseek leftover", "../google/index.html", "Google"),
    ("sites/dmoz/index.html", "dmoz-lx", "hops", "DMOZ leftover", "../yahoo/index.html", "Yahoo"),
    ("sites/geocities/index.html", "geo-lx", "hops", "GeoCities leftover", "../yahoo/index.html", "Yahoo"),
    ("sites/icq/index.html", "icq-lx", "hops", "ICQ leftover", "../aim/index.html", "AIM"),
    ("sites/kazaa/index.html", "kazaa-lx", "hops", "Kazaa leftover", "../utorrent/index.html", "µTorrent"),
    ("sites/napster/index.html", "nap-lx", "checks", "Napster epitaph", "../itunes/index.html", "iTunes"),
    ("sites/gnutella/index.html", "gn-lx", "hops", "Gnutella leftover", "../kazaa/index.html", "Kazaa"),
    ("sites/netscape/index.html", "ns-lx", "hops", "Netscape leftover", "../firefox/index.html", "Firefox"),
    ("sites/netcenter/index.html", "nc-lx", "hops", "Netcenter leftover", "../netscape/index.html", "Netscape"),
    ("sites/aol/index.html", "aol-lx", "hops", "AOL leftover", "../yahoo/index.html", "Yahoo"),
    ("sites/mtv/index.html", "mtv-lx", "hops", "MTV leftover", "../../pages/home.html", "Start"),
    ("sites/gamespot/index.html", "gs-lx", "hops", "Gamespot leftover", "../playable/index.html", "Playable"),
    ("sites/wired/index.html", "wired-lx", "hops", "Wired leftover", "../techcrunch/index.html", "TechCrunch"),
    ("sites/wayback/index.html", "wa-lx", "hops", "Wayback leftover", "../../pages/home.html", "Start"),
    ("sites/macromedia/index.html", "mm-lx", "hops", "Macromedia leftover", "../playable/index.html", "Playable"),
    ("sites/mozilla/index.html", "moz-lx", "hops", "Mozilla leftover", "../firefox/index.html", "Firefox"),
    ("pages/about.html", "isp-lx", "checks", "Broadband leftover", "home.html", "Start"),
    ("sites/pets/index.html", "pets-lx", "checks", "Pets.com epitaph", "../../pages/home.html", "Start"),
    ("sites/startupfailures/index.html", "fail-lx", "hops", "Startup failures leftover", "../../pages/about.html", "About"),
    ("sites/youvegotmail/index.html", "ygm-lx", "hops", "You've Got Mail leftover", "../aol/index.html", "AOL"),
    ("sites/moreover/index.html", "more-lx", "hops", "Moreover leftover", "../cnn/index.html", "CNN"),
    ("sites/blogdex/index.html", "bdex-lx", "hops", "Blogdex leftover", "../technorati/index.html", "Technorati"),
    ("sites/bowienet/index.html", "bowie-lx", "hops", "BowieNet leftover", "../../pages/home.html", "Start"),
    ("sites/phoenix/index.html", "phx-lx", "hops", "Phoenix leftover", "../firefox/index.html", "Firefox"),
    ("sites/loudcloud/index.html", "lc-lx", "hops", "Loudcloud leftover", "../../pages/home.html", "Start"),
    ("sites/zombo/index.html", "zombo-lx", "hops", "Zombo leftover", "../../pages/home.html", "Start"),
    ("sites/y2k/index.html", "y2k-lx", "checks", "Y2K epitaph leftover", "../../pages/about.html", "About"),
    ("sites/hampsterdance/index.html", "hamp-lx", "hops", "Hampster leftover", "../../pages/home.html", "Start"),
    ("sites/googlenews/index.html", "gnews-lx", "query", "Google News leftover", "../google/index.html", "Google"),
    ("sites/maps/about.html", "maps-api", "checks", "Maps API June leftover", "../housingmaps/index.html", "HousingMaps"),
    ("sites/housingmaps/index.html", "hm-city2", "query", "Second HousingMaps city", "../maps/index.html", "Maps"),
    ("sites/reddit/submit.html", "reddit-sub", "query", "Reddit submit leftover", "../reddit/index.html", "Reddit"),
    ("sites/digg/submit.html", "digg-sub", "query", "Digg submit leftover", "../digg/index.html", "Digg"),
    ("sites/itunes/index.html", "pod-dir", "hops", "iTunes directory leftover", "../pandora/index.html", "Pandora"),
    ("sites/playable/index.html", "heli-lx", "hops", "HoverChop leftover path", "game.html", "HoverChop"),
]


def inject_freeze() -> None:
    for rel, suffix, kind, title, nxt, nl in FREEZE:
        ensure_x4(DST / rel, suffix, kind, title, "2005 leftover · incomplete never writes · not the chip.", nxt, nl)


def extra_html(slot: str, gid: str, title: str, kind_note: str, key: str, nxt: str, nxt_l: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>{title} — 2005</title>
<link rel="stylesheet" href="../../../../css/period-2005.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body class="yg-body yg-year-2005" bgcolor="#f0f0f0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-more-role="{slot}" data-more-kind="runner" data-year="2005" data-game-id="{gid}" data-more-need="2" data-more-goods="a,b" data-more-traps="trap" data-yg-next-href="{nxt}" data-yg-next-label="{nxt_l}">
  <h1>{title} — 2005</h1>
  <p class="honesty yg-honesty"><b>{kind_note}</b> · museum original · incomplete never writes · key <code>{key}</code></p>
  <ol class="yg-steps" data-yg-steps>
    <li data-step="start">Start</li>
    <li data-step="acts">Do the leftover acts. Skip traps.</li>
    <li data-step="save">Finish writes <code>{key}</code></li>
  </ol>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-more-field class="mx-field" aria-label="{title} playfield"></div>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-game-finish>Finish</button>
  </p>
  <p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p class="mx-nav"><a href="index.html">← Playables</a> · <a href="game.html">HoverChop</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
"""


def write_playable() -> None:
    extras = [
        ("a", "ytsurge", "YouTube surge", "Tag a 2005 clip", "itt05-game-ytsurge", "extra-b.html", "Maps drag"),
        ("b", "mapdrag", "Maps drag", "Hold the 8 Feb drag", "itt05-game-mapdrag", "extra-c.html", "Boost seq"),
        ("c", "boost", "Reddit boost seq", "Boost in order", "itt05-game-boost", "extra-d.html", "Digg bury"),
        ("d", "bury", "Digg bury pick", "Bury the rise-year story", "itt05-game-bury", "extra-e.html", "Podcast"),
        ("e", "pod", "iTunes subscribe", "Subscribe leftover", "itt05-game-pod", "extra-f.html", "HousingMaps"),
        ("f", "hm", "HousingMaps city", "Pick a pre-API city", "itt05-game-hm", "extra-g.html", "Pandora"),
        ("g", "radio", "Pandora station", "Name a leftover station", "itt05-game-radio", "extra-h.html", "Flickr"),
        ("h", "tag", "Flickr tag", "Tag after Yahoo buy", "itt05-game-tag", "extra-i.html", "delicious"),
        ("i", "deli", "delicious bookmark", "Bookmark leftover", "itt05-game-deli", "game.html", "HoverChop"),
    ]
    for slot, gid, title, note, key, nxt, nl in extras:
        write(DST / "sites/playable" / f"extra-{slot}.html", extra_html(slot, gid, title, note, key, nxt, nl))
    games = [
        ("game-2.html", "g2", "YouTube tag cabinet", "itt05-game-g2"),
        ("game-3.html", "g3", "Facebook gated invite", "itt05-game-g3"),
        ("game-4.html", "g4", "Firefox 1.5 download", "itt05-game-g4"),
        ("game-5.html", "g5", "Million Dollar block", "itt05-game-g5"),
    ]
    for fn, gid, title, key in games:
        write(DST / "sites/playable" / fn, extra_html(gid, gid, title, title, key, "game.html", "HoverChop"))
    write(
        DST / "sites/playable/game.html",
        extra_html("heli", "heli", "HoverChop", "Helicopter Game class · hold to climb", "itt05-game-heli", "famous.html", "Famous"),
    )


def patch_youtube_ticks() -> None:
    p = ROOT / "js/immersion/youtube.js"
    t = p.read_text(encoding="utf-8")
    needle = '        if (!title) {\n          if (st) {\n            st.innerHTML = "Enter a title to upload (no blank clips).";'
    if "data-yt-req" in t:
        return
    insert = """        if (yearNum() === 2005) {
          var reqs = form.querySelectorAll("[data-yt-req]");
          var rn = 0;
          var ri;
          for (ri = 0; ri < reqs.length; ri++) if (reqs[ri].checked) rn++;
          if (reqs.length && rn < reqs.length) {
            if (st) {
              st.innerHTML = "Tick both honesty boxes. Incomplete never writes.";
              st.classList.add("itt-ux-need-attention");
            }
            return false;
          }
        }
        if (!title) {
          if (st) {
            st.innerHTML = "Enter a title to upload (no blank clips).";"""
    if needle not in t:
        raise SystemExit("youtube.js hook missing")
    p.write_text(t.replace(needle, insert, 1), encoding="utf-8")


def patch_wiring() -> None:
    # wiped sets
    for rel, old, new in [
        (
            "scripts/itt_gate.py",
            '_WIPED = {"2005", "2006", "2007"}',
            '_WIPED = {"2006", "2007"}',
        ),
        (
            "scripts/check-all-years.py",
            '_WIPED = {"2005", "2006", "2007"}',
            '_WIPED = {"2006", "2007"}',
        ),
        (
            "scripts/check-every-flow.js",
            'const WIPED = new Set(["2005", "2006", "2007"]);',
            'const WIPED = new Set(["2006", "2007"]);',
        ),
        (
            "scripts/oss-visitor-gate.mjs",
            'const WIPED = new Set(["2005", "2006", "2007"]);',
            'const WIPED = new Set(["2006", "2007"]);',
        ),
    ]:
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        if old in t:
            p.write_text(t.replace(old, new, 1), encoding="utf-8")

    p = ROOT / "scripts/check-every-flow.js"
    t = p.read_text(encoding="utf-8")
    if "2005:" not in t.split("const GOLD")[1][:2500]:
        t = t.replace(
            "  2004: { path: \"sites/facebook/networks.html\", key: \"itt04-thefacebook-networks\", hook: /data-fb-join/ },\n",
            "  2004: { path: \"sites/facebook/networks.html\", key: \"itt04-thefacebook-networks\", hook: /data-fb-join/ },\n"
            "  2005: { path: \"sites/youtube/upload.html\", key: \"itt05-yt-uploads\", hook: /data-yt-upload/ },\n",
        )
        p.write_text(t, encoding="utf-8")

    p = ROOT / "scripts/github-ready.sh"
    t = p.read_text(encoding="utf-8")
    t = t.replace(
        '  if [[ "$y" == "2005" || "$y" == "2006" || "$y" == "2007" ]]; then continue; fi',
        '  if [[ "$y" == "2006" || "$y" == "2007" ]]; then continue; fi',
    )
    p.write_text(t, encoding="utf-8")

    p = ROOT / "js/atlas-data.js"
    t = p.read_text(encoding="utf-8")
    t = t.replace('gapYears: ["2005", "2006", "2007"]', 'gapYears: ["2006", "2007"]')
    t = t.replace(
        '{ id: "gap", label: "Boarded", blurb: "These three rooms are empty on purpose. YouTube upload, Twitter 140, and iPhone Safari without a Store will be rebuilt later. They are not on disk.", years: ["2005", "2006", "2007"] }',
        '{ id: "gap", label: "Boarded", blurb: "2006 Twitter 140 and 2007 iPhone Safari without a Store stay empty on purpose.", years: ["2006", "2007"] }',
    )
    t = t.replace(
        '"2005": "Off disk. Rebuild later.",',
        '"2005": "YouTube upload is the save. Maps / Reddit / Digg leftover. Google does not own YouTube.",',
    )
    t = t.replace(
        """      "2005": {
        wiped: true,
        era: "YouTube · Maps · Ajax",
        thesis: "Off disk for a from-scratch rebuild.",""",
        """      "2005": {
        wiped: false,
        era: "YouTube · Maps · Ajax",
        thesis: "Web 2.0 boom. Upload is the save. Independent YouTube.",""",
    )
    # OPEN list already includes 2005
    p.write_text(t, encoding="utf-8")

    p = ROOT / "js/museum-progress.js"
    t = p.read_text(encoding="utf-8")
    t = t.replace("if (y === 2005 || y === 2006 || y === 2007) continue;", "if (y === 2006 || y === 2007) continue;")
    p.write_text(t, encoding="utf-8")

    p = ROOT / "js/year-ui/start-data.js"
    t = p.read_text(encoding="utf-8")
    t = t.replace(
        """      "<a href=\\"../sites/pandora/index.html\\">Pandora</a> — name a station REAL",
      "<a href=\\"../sites/reddit/index.html\\">Reddit</a> · <a href=\\"../sites/digg/index.html\\">Digg</a>",""",
        """      "<a href=\\"../sites/reddit/index.html\\">Reddit</a> — June boost",
      "<a href=\\"../sites/digg/index.html\\">Digg</a> — rise / bury",""",
    )
    p.write_text(t, encoding="utf-8")

    # hub card
    p = ROOT / "index.html"
    t = p.read_text(encoding="utf-8")
    old_card = """      <div class="year-card locked y2005" data-year="2005">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2005</p>
            <span class="era-chip">wiped</span>
          </div>
          <p class="label">Off disk for a from-scratch rebuild. YouTube / Maps / Reddit will come back as a new lean door.</p>
          <p class="scale">~64.8M sites · ~1.03B users (Live Stats)</p>
          <p class="meta">Wiped · rebuild later</p>
        </div>
      </div>"""
    new_card = """      <a class="year-card available y2005" href="years/2005/" data-year="2005">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2005</p>
            <span class="era-chip">YouTube · Maps · Ajax</span>
          </div>
          <p class="label">Web 2.0 boom — YouTube upload is the save. Maps drag, Reddit boost, Digg bury leftover. Independent YouTube. No Twitter.</p>
          <p class="scale">~64.8M sites · ~1.03B users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>"""
    if old_card in t:
        t = t.replace(old_card, new_card)
    t = t.replace("29 years open", "30 years open")
    t = t.replace("2005–2007 wiped for rebuild", "2006–2007 wiped for rebuild")
    t = t.replace("2005–2007 are wiped for rebuild", "2006–2007 are wiped for rebuild")
    t = t.replace("(29 years on disk; 2005–2007 wiped)", "(30 years on disk; 2006–2007 wiped)")
    p.write_text(t, encoding="utf-8")

    # extra games c-i
    p = ROOT / "js/config/year-extra-games.js"
    t = p.read_text(encoding="utf-8")
    if "itt05-game-boost" not in t:
        t = t.replace(
            """    {
      "id": "mapdrag",
      "title": "Maps drag",
      "href": "extra-b.html",
      "key": "itt05-game-mapdrag"
    }
  ],""",
            """    {
      "id": "mapdrag",
      "title": "Maps drag",
      "href": "extra-b.html",
      "key": "itt05-game-mapdrag"
    },
    { "id": "boost", "title": "Reddit boost seq", "href": "extra-c.html", "key": "itt05-game-boost" },
    { "id": "bury", "title": "Digg bury pick", "href": "extra-d.html", "key": "itt05-game-bury" },
    { "id": "pod", "title": "iTunes subscribe", "href": "extra-e.html", "key": "itt05-game-pod" },
    { "id": "hm", "title": "HousingMaps city", "href": "extra-f.html", "key": "itt05-game-hm" },
    { "id": "radio", "title": "Pandora station", "href": "extra-g.html", "key": "itt05-game-radio" },
    { "id": "tag", "title": "Flickr tag", "href": "extra-h.html", "key": "itt05-game-tag" },
    { "id": "deli", "title": "delicious bookmark", "href": "extra-i.html", "key": "itt05-game-deli" }
  ],""",
        )
        p.write_text(t, encoding="utf-8")

    # 2x matrix
    mx = ROOT / "e2e/2x-links.matrix.json"
    data = json.loads(mx.read_text(encoding="utf-8"))
    data = [r for r in data if str(r.get("year")) != "2005"]
    rows = []
    for rel, suffix, kind, title, nxt, nl in FREEZE:
        rows.append(
            {
                "year": "2005",
                "path": "/years/2005/" + rel,
                "key": "itt05-" + suffix,
                "kind": kind,
                "title": title,
                "next": "/years/2005/" + nxt.replace("../", "sites/").replace("../../pages/", "pages/")
                if nxt.startswith(".")
                else nxt,
                "nextLabel": nl,
            }
        )
    # fix next paths simply
    for r, src in zip(rows, FREEZE):
        rel = src[0]
        nxt = src[4]
        base = Path("/years/2005") / Path(rel).parent
        # resolve relative
        resolved = (Path(rel).parent / nxt).as_posix()
        resolved = re.sub(r"/\./", "/", resolved)
        while "/../" in resolved:
            resolved = re.sub(r"[^/]+/\.\./", "", resolved, count=1)
        r["next"] = "/years/2005/" + resolved
        r["path"] = "/years/2005/" + rel
    data.extend(rows)
    mx.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    # sitemap
    sm = ROOT / "sitemap.txt"
    if sm.exists():
        t = sm.read_text(encoding="utf-8")
        if "/years/2005/" not in t:
            t = t.rstrip() + "\n/years/2005/\n/years/2005/sites/youtube/upload.html\n"
            sm.write_text(t, encoding="utf-8")

    # e2e atlas wiped
    for rel in ["e2e/atlas.spec.js", "e2e/atlas-all-flows.spec.js", "e2e/year-more-3x.spec.js"]:
        p = ROOT / rel
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8")
        t = t.replace('["2005", "2006", "2007"]', '["2006", "2007"]')
        t = t.replace('new Set(["2005", "2006", "2007"])', 'new Set(["2006", "2007"])')
        p.write_text(t, encoding="utf-8")


def merge_urlmap() -> None:
    p = ROOT / "js/config/2005.js"
    t = p.read_text(encoding="utf-8")
    extra = []
    for rel, *_ in FREEZE:
        key = rel
        if f'"{key}"' not in t:
            extra.append(f'      "{key}": "http://museum.local/years/2005/{key}",')
    extras_rooms = [
        "sites/playable/extra-c.html",
        "sites/playable/extra-d.html",
        "sites/playable/extra-e.html",
        "sites/playable/extra-f.html",
        "sites/playable/extra-g.html",
        "sites/playable/extra-h.html",
        "sites/playable/extra-i.html",
        "sites/playable/game-2.html",
        "sites/playable/game-3.html",
        "sites/playable/game-4.html",
        "sites/playable/game-5.html",
        "sites/clubpenguin/index.html",
        "sites/youtube/dating.html",
        "sites/youtube/channels.html",
        "sites/youtube/invite.html",
        "sites/youtube/watch.html",
        "sites/youtube/about.html",
        "sites/maps/about.html",
        "sites/reddit/submit.html",
        "sites/reddit/about.html",
        "sites/digg/submit.html",
        "sites/digg/about.html",
    ]
    for key in extras_rooms:
        if f'"{key}"' not in t:
            extra.append(f'      "{key}": "http://museum.local/years/2005/{key}",')
    if extra:
        t = t.replace("    urlMap: {", "    urlMap: {\n" + "\n".join(extra), 1)
        p.write_text(t, encoding="utf-8")


def main() -> None:
    copy_forest()
    write_gold()
    write_new_rooms()
    inject_freeze()
    write_playable()
    patch_youtube_ticks()
    patch_wiring()
    merge_urlmap()
    html = list(DST.rglob("*.html"))
    folders = {p.parent.name for p in (DST / "sites").iterdir() if p.is_dir()}
    print(f"2005 html={len(html)} site_folders={len(folders)} freeze={len(FREEZE)}")


if __name__ == "__main__":
    main()
