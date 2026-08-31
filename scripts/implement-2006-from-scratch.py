#!/usr/bin/env python3
"""Implement 2006 full-year door from live years/2005.

Do not git-checkout the wiped forest. 2007 stays boarded.
Star: Twitter update itt06-tweets. Official dests are dest-true leftover-official.
"""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from itt_leftover_dest import append_matrix_row, write_matrix  # noqa: E402

Y = ROOT / "years" / "2006"


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text, encoding="utf-8")


def replace_many(text: str, pairs: list[tuple[str, str]]) -> str:
    for a, b in pairs:
        text = text.replace(a, b)
    return text


def structural_retarget(text: str) -> str:
    pairs = [
        ('data-itt-year="2005"', 'data-itt-year="2006"'),
        ("data-itt-year='2005'", "data-itt-year='2006'"),
        ("period-2005", "period-2006"),
        ("immersion-2005", "immersion-2006"),
        ("browser-2005", "browser-2006"),
        ("config/2005", "config/2006"),
        ('ITT.configs["2005"]', 'ITT.configs["2006"]'),
        ('paintStart("2005")', 'paintStart("2006")'),
        ("years/2005", "years/2006"),
        ("year-2005", "year-2006"),
        ("web2005", "web2006"),
        ("itt-2005-", "itt-2006-"),
        ("ITT-2X-2005", "ITT-2X-2006"),
        ("ITT-3X-2005", "ITT-3X-2006"),
        ('data-year="2005"', 'data-year="2006"'),
        ("yg-year-2005", "yg-year-2006"),
        ("itt05-", "itt06-"),
        ('storagePrefix: "itt05"', 'storagePrefix: "itt06"'),
        ('year: "2005"', 'year: "2006"'),
        ("2005 leftover", "2006 leftover"),
        ("About 2005", "About 2006"),
        ("— 2005", "— 2006"),
        ("· 2005", "· 2006"),
        ("Welcome to the World Wide Web — 2005", "Welcome to the World Wide Web — 2006"),
        ("Internet Explorer 6.0 — 2005", "Internet Explorer 6.0 — 2006"),
        ("About the Web in 2005", "About the Web in 2006"),
        ("data-itt-pop3x=\"2005\"", "data-itt-pop3x=\"2006\""),
        ("data-itt-pop-more=\"2005\"", "data-itt-pop-more=\"2006\""),
        ("data-itt-pop-3x3=\"2005\"", "data-itt-pop-3x3=\"2006\""),
        ("data-itt-3x-also data-itt-year=\"2005\"", "data-itt-3x-also data-itt-year=\"2006\""),
        ("data-itt-3x-links data-itt-year=\"2005\"", "data-itt-3x-links data-itt-year=\"2006\""),
        ("Google does not own YouTube", "Google owns YouTube as of Oct 2006"),
        ("Google does <b>not</b> own YouTube", "Google <b>owns</b> YouTube as of Oct 2006"),
        ("not the upload chip", "not the Twttr chip"),
        ("not the upload gold", "not the Twttr gold"),
        ("★ Upload", "★ Twttr"),
        ("sites/youtube/upload.html", "sites/twitter/index.html"),
    ]
    return replace_many(text, pairs)


def dest_page(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body bgcolor="#ffffff" text="#111111" link="#003399" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:48em;margin:16px auto;font-family:Arial,Verdana,sans-serif;font-size:13px;line-height:1.45">
{body}
</div>
<script src="../../../../js/immersion-2006.js"></script>
</body>
</html>
"""


def crumb(*pairs: tuple[str, str]) -> str:
    return "<p>" + " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in pairs) + "</p>"


def hops(key: str, title: str, life: str, a: tuple[str, str], b: tuple[str, str], trap: str, nxt: str, nl: str, extra: str = "") -> str:
    return f"""
<p class="itt-pixel-failed">[failed-final]</p>
<h1>{title}</h1>
<p>{life}</p>
{extra}
<div data-lo-panel="1" data-itt-year="2006" class="itt-2006-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">2006 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p>
 <button type="button" data-lo-pick="{a[0]}">{a[1]}</button>
 <button type="button" data-lo-pick="{b[0]}">{b[1]}</button>
</p>
<p><label><input type="checkbox" data-lo-req> Leftover 2006 · not the Twttr chip.</label></p>
<p><label><input type="checkbox" data-lo-req> 0 hops / 1 hop / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}" data-lo-min-pick="2">{title}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt06-{key}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def checks(key: str, title: str, life: str, ta: str, tb: str, trap: str, nxt: str, nl: str, extra: str = "") -> str:
    return f"""
<p class="itt-pixel-failed">[failed-final]</p>
<h1>{title}</h1>
<p>{life}</p>
{extra}
<div data-lo-panel="1" data-itt-year="2006" class="itt-2006-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">2006 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p><label><input type="checkbox" data-lo-req> {ta}</label></p>
<p><label><input type="checkbox" data-lo-req> {tb}</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}">{title}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt06-{key}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def query(key: str, title: str, life: str, ph: str, tick: str, trap: str, nxt: str, nl: str, extra: str = "") -> str:
    return f"""
<p class="itt-pixel-failed">[failed-final]</p>
<h1>{title}</h1>
<p>{life}</p>
{extra}
<div data-lo-panel="1" data-itt-year="2006" class="itt-2006-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em">
<p style="font-size:11px;color:#444;margin:0 0 8px">2006 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p><label>{title}<br><input type="text" data-lo-field maxlength="80" placeholder="{ph}" autocomplete="off"></label></p>
<p><label><input type="checkbox" data-lo-req> {tick}</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}">{title}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt06-{key}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
"""


def copy_scaffold() -> None:
    src = ROOT / "years" / "2005"
    if not src.exists():
        raise SystemExit("years/2005 missing — cannot scaffold 2006")
    if Y.exists():
        shutil.rmtree(Y)
    shutil.copytree(src, Y)
    pairs = [
        ("js/config/2005.js", "js/config/2006.js"),
        ("js/config/immersion-2005.js", "js/config/immersion-2006.js"),
        ("js/immersion-2005.js", "js/immersion-2006.js"),
        ("js/browser-2005.js", "js/browser-2006.js"),
    ]
    for a, b in pairs:
        sa, sb = ROOT / a, ROOT / b
        if sa.exists():
            shutil.copy2(sa, sb)
            sb.write_text(structural_retarget(sb.read_text(encoding="utf-8", errors="replace")), encoding="utf-8")
    for p in Y.rglob("*"):
        if not p.is_file():
            continue
        if p.suffix.lower() not in {".html", ".js", ".css", ".txt", ".md", ".json"}:
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        n = structural_retarget(t)
        if n != t:
            p.write_text(n, encoding="utf-8")


def clone_2008_twitter() -> None:
    src = ROOT / "years" / "2008" / "sites" / "twitter"
    dest = Y / "sites" / "twitter"
    dest.mkdir(parents=True, exist_ok=True)
    for p in src.rglob("*"):
        if not p.is_file() or p.suffix.lower() != ".html":
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        t = t.replace("period-2008", "period-2006")
        t = t.replace("immersion-2008", "immersion-2006")
        t = t.replace('data-itt-year="2008"', 'data-itt-year="2006"')
        t = t.replace("itt08-", "itt06-")
        t = t.replace("2008 leftover", "2006 leftover")
        t = t.replace("2007 honesty", "2006 honesty")
        t = t.replace("2007 is the breakout year", "2006 is the birth year")
        out = dest / p.relative_to(src)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(t, encoding="utf-8")
    for slug in ("feed.html", "open.html"):
        srcp = ROOT / "years" / "2008" / "sites" / "facebook" / slug
        if srcp.exists():
            t = srcp.read_text(encoding="utf-8", errors="replace")
            t = t.replace("period-2008", "period-2006")
            t = t.replace("immersion-2008", "immersion-2006")
            t = t.replace('data-itt-year="2008"', 'data-itt-year="2006"')
            t = t.replace("itt08-", "itt06-")
            write(Y / "sites" / "facebook" / slug, t)


def write_gold_twitter() -> None:
    write(
        Y / "sites" / "twitter" / "index.html",
        dest_page(
            "Twttr — What are you doing? (2006)",
            crumb(
                ("../../pages/home.html", "Starting Point"),
                ("about.html", "About leftover"),
                ("../facebook/feed.html", "News Feed leftover"),
            )
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>twitter</h1>
<p>What are you doing? <b>21 Mar 2006</b> jack · <i>just setting up my twttr</i>. Public <b>15 Jul</b>. 140 characters. SMS era. <b>This is the year star.</b></p>
<form class="tw-box" data-twitter-compose action="#" method="post" style="border:1px solid #b2d1e5;background:#e5f2f7;padding:12px;margin:12px 0">
<label>update:</label>
<p><textarea name="status" data-twitter-status maxlength="140" placeholder="just setting up my twttr" style="width:98%;height:60px"></textarea></p>
<p><label><input type="checkbox" data-tw-req> This is leftover 2006 Twttr · 140 chars · not modern X</label></p>
<p><label><input type="checkbox" data-tw-req> Empty / 280 / iPhone / trap never writes</label></p>
<p><button type="submit" data-official-verb>update</button> <span class="tw-count"><span data-twitter-count>140</span> left</span>
<span data-twitter-status-msg></span></p>
</form>
<div data-twitter-timeline></div>
<p hidden data-next-flow data-next-when-key="itt06-tweets"><b>Next:</b> <a href="../facebook/feed.html">News Feed leftover</a></p>
<hr>
<p><b>Traps — these never write the chip</b></p>
<p><button type="button" data-tw-trap>Post 280 characters (trap)</button></p>
<p><button type="button" data-tw-trap>Open on iPhone (trap)</button></p>
""",
        ),
    )


def write_official() -> None:
    write(
        Y / "sites" / "facebook" / "feed.html",
        dest_page(
            "Facebook News Feed leftover — 5 Sep 2006",
            crumb(("index.html", "Facebook leftover"), ("open.html", "Open leftover"), ("../twitter/index.html", "★ Twttr"))
            + hops(
                "feed",
                "News Feed leftover",
                "5 Sep 2006. Mini-Feed + live story leftover. <b>Not the year star.</b> Privacy backlash leftover.",
                ("mini", "Mini-Feed leftover"),
                ("live", "Live story leftover"),
                "News Feed is the 2006 star (trap)",
                "open.html",
                "Facebook open leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "facebook" / "open.html",
        dest_page(
            "Facebook open leftover — 26 Sep 2006",
            crumb(("index.html", "Facebook leftover"), ("feed.html", "News Feed leftover"), ("../twitter/index.html", "★ Twttr"))
            + hops(
                "fb-open",
                "Facebook open leftover",
                "26 Sep 2006. College gate ends. Still not a phone app. <b>Not the year star.</b>",
                ("register", "Register leftover"),
                ("desktop", "Desktop leftover"),
                "iPhone Facebook (trap)",
                "../youtube/index.html",
                "YouTube Google-owned leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "youtube" / "index.html",
        dest_page(
            "YouTube leftover — Google-owned Oct 2006",
            crumb(("../../pages/home.html", "Starting Point"), ("../twitter/index.html", "★ Twttr"), ("upload.html", "Upload leftover"))
            + query(
                "yt-google",
                "YouTube Google-owned leftover",
                "9 Oct 2006. $1.65B class. Google owns YouTube <b>this year</b>. 2005 gold was independent upload. That chip stays <code>itt05-yt-uploads</code>.",
                "google-owned leftover",
                "Oct 2006 leftover · not the 2005 independent chip",
                "YouTube is still independent (trap)",
                "../googledocs/index.html",
                "Google Docs leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "googledocs" / "index.html",
        dest_page(
            "Google Docs leftover — Oct 2006",
            crumb(("../../pages/home.html", "Starting Point"), ("../twitter/index.html", "★ Twttr"))
            + query(
                "gdocs",
                "Google Docs leftover",
                "Writely + Spreadsheets · ~10–11 Oct 2006 leftover. No live Drive. <b>Not the year star.</b>",
                "doc leftover",
                "Writely leftover · not the Twttr chip",
                "Docs is the 2006 star (trap)",
                "../aws/index.html",
                "S3 leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "aws" / "index.html",
        dest_page(
            "AWS S3 leftover — 14 Mar 2006",
            crumb(("../../pages/home.html", "Starting Point"), ("../twitter/index.html", "★ Twttr"))
            + checks(
                "s3",
                "AWS S3 leftover",
                "14 Mar 2006. Object store leftover. Not EC2-as-default gold (EC2 is later 2006 leftover, not this write).",
                "14 Mar 2006 S3 leftover",
                "Not the Twttr chip",
                "S3 is the 2006 star (trap)",
                "../ie7/index.html",
                "IE7 leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "ie7" / "index.html",
        dest_page(
            "Internet Explorer 7 leftover — 18 Oct 2006",
            crumb(("../../pages/home.html", "Starting Point"), ("../twitter/index.html", "★ Twttr"))
            + hops(
                "ie7",
                "IE7 leftover",
                "18 Oct 2006. Tabs leftover. <b>XP + IE6 stays the January shell.</b> Not Chrome.",
                ("tab", "Tab leftover"),
                ("download", "Download leftover"),
                "IE7 is the XP default shell (trap)",
                "../wikipedia/millionth.html",
                "Wiki millionth leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "wikipedia" / "millionth.html",
        dest_page(
            "Wikipedia millionth leftover — 1 Mar 2006",
            crumb(("index.html", "Wikipedia leftover"), ("../twitter/index.html", "★ Twttr"))
            + checks(
                "wiki-1m",
                "Wikipedia millionth leftover",
                "EN millionth article <b>1 Mar 2006</b> · Jordanhill railway station. 2005 dest stays 500k (17–18 Mar).",
                "1 Mar 2006 millionth leftover",
                "Not the 2005 500k chip",
                "Millionth article is 2005 (trap)",
                "../roblox/index.html",
                "Roblox leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "roblox" / "index.html",
        dest_page(
            "Roblox leftover — 1 Sep 2006",
            crumb(("../../pages/home.html", "Starting Point"), ("../twitter/index.html", "★ Twttr"))
            + hops(
                "roblox",
                "Roblox leftover",
                "Public <b>1 Sep 2006</b>. Banned as a 2005 dest. Not the year star.",
                ("play", "Play leftover"),
                ("catalog", "Catalog leftover"),
                "Roblox launched publicly in 2005 (trap)",
                "../playable/linerider.html",
                "Line Rider leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "playable" / "linerider.html",
        dest_page(
            "Line Rider leftover — 2006",
            crumb(("index.html", "Playables"), ("../twitter/index.html", "★ Twttr"))
            + hops(
                "game-linerider",
                "Line Rider leftover",
                "2006 flash leftover. Museum reconstruction · no commercial SWF. Incomplete never writes. <b>Not the Twttr chip.</b>",
                ("draw", "Draw leftover"),
                ("ride", "Ride leftover"),
                "This is the Twttr gold (trap)",
                "../twitter/index.html",
                "★ Twttr",
            ),
        ),
    )


def patch_home_and_about() -> None:
    write(
        Y / "pages" / "about.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>About the Web in 2006</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000cc" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Verdana,Arial,sans-serif;font-size:13px">
<h1>About 2006</h1>
<p><b>2006 is the year the feed and the 140-character update become the session — Twttr is the save, News Feed / open Facebook / Google←YouTube / Docs / S3 are leftover, and the iPhone is not here yet.</b></p>
<p><b>Scale (Internet Live Stats, June 2006):</b> <b>85,507,314</b> websites (+32%) · <b>1,160,335,280</b> users · 13.6 users/site. Birthmark <b>Twttr</b>.</p>
<h2>Anachronism bans</h2>
<ul>
<li>iPhone (2007)</li>
<li>Street View (2007)</li>
<li>Chrome · Vista as the default shell</li>
<li>280-character default · For You algorithm</li>
<li>News Feed as the year star — leftover only</li>
</ul>
<p><a href="home.html">← Starting Point</a> · <a href="../sites/twitter/index.html">★ Twttr</a></p>
</div>
<script src="../../../js/immersion-2006.js"></script>
</body>
</html>
""",
    )
    home = Y / "pages" / "home.html"
    ht = home.read_text(encoding="utf-8", errors="replace")
    ht = ht.replace("paintStart(\"2005\")", "paintStart(\"2006\")")
    honesty = """<p class="itt-2006-honesty" style="margin:10px auto;padding:8px;max-width:52em;font-family:Arial,sans-serif;font-size:12px;background:#ffc;border:1px solid #880">
<b>2006 honesty.</b> ★ Twttr update · News Feed leftover · Google owns YouTube · Docs leftover.
<b>Not yet:</b> iPhone · Street View · Chrome · Vista as default · 280-char default.
</p>
"""
    if "itt-2006-honesty" not in ht:
        ht = ht.replace("itt-2005-honesty", "itt-2006-honesty")
        if "itt-2006-honesty" not in ht:
            ht = ht.replace('<div id="itt-year-start"></div>', '<div id="itt-year-start"></div>\n' + honesty, 1)
        else:
            ht = re_sub_honesty(ht, honesty)
    home.write_text(ht, encoding="utf-8")


def re_sub_honesty(ht: str, honesty: str) -> str:
    import re
    return re.sub(r'<p class="itt-2006-honesty"[\s\S]*?</p>', honesty.strip(), ht, count=1)


def patch_twitter_js() -> None:
    p = ROOT / "js" / "immersion" / "twitter.js"
    t = p.read_text(encoding="utf-8")
    if "data-tw-req" in t:
        return
    needle = """        if (!text) {
          if (st) st.textContent = "Type something first.";
          return;
        }"""
    insert = """        if (!text) {
          if (st) st.textContent = "Type something first.";
          return;
        }
        var reqs = form.querySelectorAll("[data-tw-req]");
        if (reqs.length) {
          var ticksOk = true;
          var ri;
          for (ri = 0; ri < reqs.length; ri++) {
            if (!reqs[ri].checked) ticksOk = false;
          }
          if (!ticksOk) {
            if (st) st.textContent = "Tick both honesty boxes. Empty / trap never writes.";
            return;
          }
        }"""
    if needle not in t:
        raise SystemExit("twitter.js empty gate moved — cannot patch ticks")
    t = t.replace(needle, insert, 1)
    trap = """
    var traps = doc.querySelectorAll("[data-tw-trap]");
    var ti;
    for (ti = 0; ti < traps.length; ti++) {
      if (traps[ti].getAttribute("data-tw-trap-bound") === "1") continue;
      traps[ti].setAttribute("data-tw-trap-bound", "1");
      traps[ti].addEventListener("click", function () {
        var st2 = doc.querySelector("[data-twitter-status-msg]");
        if (st2) st2.textContent = "Trap. That click never writes.";
      });
    }
"""
    if "data-tw-trap-bound" not in t:
        t = t.replace("    seed();", trap + "\n    seed();", 1)
    p.write_text(t, encoding="utf-8")


def wire() -> None:
    sd = ROOT / "ui" / "year" / "start-data.js"
    t = sd.read_text(encoding="utf-8")
    if '"2006"' not in t:
        block = '''  "2006": {
    "href": "../sites/twitter/index.html",
    "label": "★ One-thing · Twttr update REAL",
    "items": [
      "<a href=\\"about.html\\">About 2006</a> — feed year · Twttr birthmark",
      "<a href=\\"../sites/twitter/index.html\\">★ Twttr</a> — empty / 280 / iPhone never write",
      "<a href=\\"../sites/facebook/feed.html\\">News Feed leftover</a> — 5 Sep",
      "<a href=\\"../sites/youtube/index.html\\">YouTube Google-owned leftover</a> — 9 Oct",
      "<a href=\\"../sites/googledocs/index.html\\">Google Docs leftover</a> — Oct",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  },
'''
        t = t.replace('  "2008": {', block + '  "2008": {', 1)
        sd.write_text(t, encoding="utf-8")

    se = ROOT / "ui" / "year" / "start-extra.js"
    t = se.read_text(encoding="utf-8")
    if '"2006"' not in t:
        t = t.replace(
            '  "2005":',
            '  "2006": "<p class=\\"itt-year-true-pack\\" style=\\"font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666;max-width:48em\\"><b>Also 2006 residual (not the one-thing):</b> <a href=\\"../sites/facebook/feed.html\\">News Feed leftover</a> · <a href=\\"../sites/youtube/index.html\\">YouTube Google-owned leftover</a> · <a href=\\"../sites/googledocs/index.html\\">Docs leftover</a></p>\\n<p class=\\"itt-mass-honesty\\" data-itt-mass=\\"2006\\" style=\\"font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em\\"><b>Twttr is the save.</b> Google owns YouTube. iPhone is 2007. <a href=\\"../sites/twitter/index.html\\">★ Twttr</a>.</p>\\n",\n  "2005":',
            1,
        )
        se.write_text(t, encoding="utf-8")

    ft = ROOT / "js" / "config" / "flow-trails.js"
    t = ft.read_text(encoding="utf-8")
    if '"2006"' not in t:
        block = """    "2006": [
      {"n": 1, "name": "Twttr", "href": "sites/twitter/index.html", "match": "/twitter/", "whenKey": "itt06-tweets", "nextHref": "sites/facebook/feed.html", "nextLabel": "News Feed leftover"},
      {"n": 2, "name": "News Feed leftover", "href": "sites/facebook/feed.html", "match": "/facebook/feed", "whenKey": "itt06-feed", "nextHref": "sites/facebook/open.html", "nextLabel": "Facebook open leftover"},
      {"n": 3, "name": "Facebook open leftover", "href": "sites/facebook/open.html", "match": "/facebook/open", "whenKey": "itt06-fb-open", "nextHref": "sites/youtube/index.html", "nextLabel": "YouTube Google-owned leftover"},
      {"n": 4, "name": "YouTube Google-owned leftover", "href": "sites/youtube/index.html", "match": "/youtube/", "whenKey": "itt06-yt-google", "nextHref": "sites/googledocs/index.html", "nextLabel": "Google Docs leftover"},
      {"n": 5, "name": "Google Docs leftover", "href": "sites/googledocs/index.html", "match": "/googledocs/", "whenKey": "itt06-gdocs", "nextHref": "sites/aws/index.html", "nextLabel": "S3 leftover"},
      {"n": 6, "name": "S3 leftover", "href": "sites/aws/index.html", "match": "/aws/", "whenKey": "itt06-s3", "nextHref": "sites/ie7/index.html", "nextLabel": "IE7 leftover"},
      {"n": 7, "name": "IE7 leftover", "href": "sites/ie7/index.html", "match": "/ie7/", "whenKey": "itt06-ie7", "nextHref": "sites/wikipedia/millionth.html", "nextLabel": "Wiki millionth leftover"},
      {"n": 8, "name": "Wiki millionth leftover", "href": "sites/wikipedia/millionth.html", "match": "/wikipedia/millionth", "whenKey": "itt06-wiki-1m", "nextHref": "sites/roblox/index.html", "nextLabel": "Roblox leftover"},
      {"n": 9, "name": "Roblox leftover", "href": "sites/roblox/index.html", "match": "/roblox/", "whenKey": "itt06-roblox", "nextHref": "sites/playable/linerider.html", "nextLabel": "Line Rider leftover"},
      {"n": 10, "name": "Line Rider leftover", "href": "sites/playable/linerider.html", "match": "/linerider/", "whenKey": "itt06-game-linerider", "nextHref": "sites/twitter/index.html", "nextLabel": "Twttr"}
    ],
"""
        t = t.replace('    "2008": [', block + '    "2008": [', 1)
        ft.write_text(t, encoding="utf-8")

    yj = ROOT / "ui" / "year" / "years.js"
    t = yj.read_text(encoding="utf-8")
    if '\n  "2006":' not in t:
        marker = '    "maximized": true\n  },\n  "2008": {'
        block = """    "maximized": true
  },
  "2006": {
    "title": "Internet Explorer 6.0 — 2006",
    "css": [
      "win95-netscape.css",
      "ie5-overrides.css"
    ],
    "bodyClass": "year-2006 os-winxp browser-ie6",
    "boot": "browser-2006.js",
    "dir": [
      { "go": "pages/home.html", "label": "Start" },
      { "go": "sites/twitter/index.html", "label": "Twttr" },
      { "go": "sites/facebook/feed.html", "label": "Feed" },
      { "go": "sites/youtube/index.html", "label": "YouTube" },
      { "go": "sites/googledocs/index.html", "label": "Docs" },
      { "go": "sites/wikipedia/millionth.html", "label": "Wiki 1M" },
      { "go": "pages/about.html", "label": "About" }
    ],
    "chrome": "2004",
    "toolbar": "ie",
    "family": "ie",
    "location": "http://home.microsoft.com/intl/web2006/",
    "prefHome": "http://home.microsoft.com/intl/web2006/",
    "yearLabel": "2006 · Windows XP · Internet Explorer 6",
    "windowTitle": "Welcome to the World Wide Web — Microsoft Internet Explorer",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (always-on broadband)",
    "skipBtn": "Skip connect",
    "thesis": "2006 thesis: Twttr is the save. News Feed leftover. Google owns YouTube. iPhone is 2007.",
    "openLoc": "Open Location in Internet Explorer:",
    "aboutHtml": "<p><b>Microsoft Internet Explorer</b></p> <p>Version 6.0<br>Copyright © 1995–2001 Microsoft Corporation</p> <p>Educational historical Web exhibit.</p>",
    "startBanner": "Windows<b>XP</b>",
    "taskBtn": "Internet Explorer",
    "icon": "e",
    "aria": "Internet Explorer 6",
    "locLabel": "Address",
    "bookmarksTitle": "Favorites",
    "mailPh": "friend@aol.com",
    "hasTaskbar": true,
    "maximized": true
  },
  "2008": {"""
        if marker not in t:
            raise SystemExit("years.js 2005/2008 marker missing")
        t = t.replace(marker, block, 1)
        yj.write_text(t, encoding="utf-8")

    reg = ROOT / "js" / "immersion" / "registry.js"
    t = reg.read_text(encoding="utf-8")
    if '"2006"' not in t.split("EXTRA", 1)[-1][:4000]:
        t = t.replace(
            '    "2005": [',
            '    "2006": EXTRA && EXTRA["2005"] ? EXTRA["2005"].concat(["immersion/twitter.js"]) : ["immersion/twitter.js"],\n    "2005": [',
            1,
        )
        # EXTRA is a dict literal — cannot reference itself. Fix properly.
        t = t.replace(
            '    "2006": EXTRA && EXTRA["2005"] ? EXTRA["2005"].concat(["immersion/twitter.js"]) : ["immersion/twitter.js"],\n    "2005": [',
            '    "2006": [\n      "immersion/twitter.js",\n      "immersion/youtube.js",\n      "immersion/maps.js",\n      "immersion/facebook.js",\n      "immersion/digg.js",\n      "immersion/gmail.js",\n      "immersion/flickr.js",\n      "immersion/amazon.js"\n    ],\n    "2005": [',
            1,
        )
        reg.write_text(t, encoding="utf-8")


def unlock() -> None:
    for rel in ("scripts/itt_gate.py", "scripts/check-all-years.py"):
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        t = t.replace(
            '_WIPED = {"2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"}',
            '_WIPED = {"2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"}',
        )
        p.write_text(t, encoding="utf-8")

    chk = ROOT / "scripts" / "check-all-years.py"
    t = chk.read_text(encoding="utf-8")
    if '"2006":' not in t.split("SIGNATURE", 1)[-1][:4000]:
        t = t.replace(
            '    "2005": ["pages/home.html", "pages/about.html", "sites/youtube/upload.html", "sites/maps/index.html", "sites/reddit/index.html", "sites/digg/index.html", "sites/playable/game.html"],\n',
            '    "2005": ["pages/home.html", "pages/about.html", "sites/youtube/upload.html", "sites/maps/index.html", "sites/reddit/index.html", "sites/digg/index.html", "sites/playable/game.html"],\n'
            '    "2006": ["pages/home.html", "pages/about.html", "sites/twitter/index.html", "sites/facebook/feed.html", "sites/youtube/index.html", "sites/googledocs/index.html", "sites/playable/linerider.html"],\n',
            1,
        )
        chk.write_text(t, encoding="utf-8")

    mp = ROOT / "js" / "museum-progress.js"
    t = mp.read_text(encoding="utf-8")
    t = t.replace(
        'var WIPED = { "2006": 1, "2007": 1, "2009": 1, "2011": 1, "2020": 1, "2022": 1, "2023": 1, "2024": 1, "2025": 1 };',
        'var WIPED = { "2007": 1, "2009": 1, "2011": 1, "2020": 1, "2022": 1, "2023": 1, "2024": 1, "2025": 1 };',
    )
    mp.write_text(t, encoding="utf-8")

    idx = ROOT / "index.html"
    t = idx.read_text(encoding="utf-8")
    t = t.replace("23 years open", "24 years open")
    t = t.replace("1994–2005 + 2008 + 2010 + 2012–2019 + 2021", "1994–2006 + 2008 + 2010 + 2012–2019 + 2021")
    t = t.replace("2006–2007 / 2009 / 2011 / 2020 / 2022–2025 boarded", "2007 / 2009 / 2011 / 2020 / 2022–2025 boarded")
    t = t.replace("23 years on disk; 2006–2007 / 2009 / 2011 / 2020 / 2022–2025 boarded", "24 years on disk; 2007 / 2009 / 2011 / 2020 / 2022–2025 boarded")
    t = t.replace(
        """      <div class="year-card locked y2006" data-year="2006">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2006</p>
            <span class="era-chip">wiped</span>
          </div>""",
        """      <a class="year-card available y2006" href="years/2006/" data-year="2006">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2006</p>
            <span class="era-chip">Twttr · Feed</span>
          </div>""",
        1,
    )
    # close the card as an anchor if we opened one
    if '<a class="year-card available y2006"' in t and "</a>" not in t[t.find('y2006'):t.find('y2006') + 800]:
        t = t.replace(
            """          <p class="meta">Wiped · rebuild later</p>
        </div>
      </div>""",
            """          <p class="label">XP · IE6 · Twttr · News Feed leftover — Google owns YouTube. iPhone is 2007.</p>
          <p class="scale">85,507,314 sites · 1,160,335,280 users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>""",
            1,
        )
    idx.write_text(t, encoding="utf-8")

    hub = ROOT / "e2e" / "hub-years.spec.js"
    t = hub.read_text(encoding="utf-8")
    t = t.replace(
        "  '2004', '2005', '2008', '2010',",
        "  '2004', '2005', '2006', '2008', '2010',",
    )
    t = t.replace(
        "const LOCKED = ['2006', '2007', '2009', '2011', '2020', '2022', '2023', '2024', '2025'];",
        "const LOCKED = ['2007', '2009', '2011', '2020', '2022', '2023', '2024', '2025'];",
    )
    t = t.replace("/23 years open/i", "/24 years open/i")
    t = t.replace(
        "    await expect(page.locator('.y2006.locked')).toBeVisible();\n    await expect(page.locator('.y2006.available')).toHaveCount(0);\n    await expect(page.locator('.y2006.locked')).toBeVisible();",
        "    await expect(page.locator('.y2006.available')).toBeVisible();\n    await expect(page.locator('.y2007.locked')).toBeVisible();",
    )
    hub.write_text(t, encoding="utf-8")

    sm = ROOT / "sitemap.txt"
    t = sm.read_text(encoding="utf-8")
    if "/years/2006/" not in t:
        t = t.replace(
            "/years/2005/sites/youtube/upload.html\n",
            "/years/2005/sites/youtube/upload.html\n/years/2006/\n/years/2006/pages/home.html\n/years/2006/pages/about.html\n/years/2006/sites/twitter/index.html\n",
            1,
        )
        sm.write_text(t, encoding="utf-8")

    pw = ROOT / "playwright.config.js"
    t = pw.read_text(encoding="utf-8")
    t = t.replace("/200[67][-.]/", "/2007[-.]/")
    pw.write_text(t, encoding="utf-8")

    at = ROOT / "js" / "atlas-data.js"
    t = at.read_text(encoding="utf-8")
    t = t.replace('"2005", "2008",', '"2005", "2006", "2008",')
    t = t.replace(
        'gapYears: ["2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"]',
        'gapYears: ["2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"]',
    )
    t = t.replace(
        'blurb: "2006–2007 / 2009 / 2011 stay empty for rebuild.", years: ["2006", "2007", "2009", "2011"]',
        'blurb: "2007 / 2009 / 2011 stay empty for rebuild.", years: ["2007", "2009", "2011"]',
    )
    at.write_text(t, encoding="utf-8")

    atlas_spec = ROOT / "e2e" / "atlas.spec.js"
    t = atlas_spec.read_text(encoding="utf-8")
    t = t.replace('  "2004", "2005", "2008",', '  "2004", "2005", "2006", "2008",')
    t = t.replace(
        'const WIPED = ["2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"];',
        'const WIPED = ["2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"];',
    )
    t = t.replace("toHaveCount(23)", "toHaveCount(24)")
    t = t.replace("toHaveCount(9)", "toHaveCount(8)")
    atlas_spec.write_text(t, encoding="utf-8")


def clone_2x() -> None:
    matrix_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(matrix_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in rows}
    added = 0
    extras = [
        ("/years/2006/sites/twitter/index.html", "itt06-tweets", "Twttr update"),
        ("/years/2006/sites/facebook/feed.html", "itt06-feed", "News Feed leftover"),
        ("/years/2006/sites/facebook/open.html", "itt06-fb-open", "Facebook open leftover"),
        ("/years/2006/sites/youtube/index.html", "itt06-yt-google", "YouTube Google-owned leftover"),
        ("/years/2006/sites/googledocs/index.html", "itt06-gdocs", "Google Docs leftover"),
        ("/years/2006/sites/aws/index.html", "itt06-s3", "AWS S3 leftover"),
        ("/years/2006/sites/ie7/index.html", "itt06-ie7", "IE7 leftover"),
        ("/years/2006/sites/wikipedia/millionth.html", "itt06-wiki-1m", "Wiki millionth leftover"),
        ("/years/2006/sites/roblox/index.html", "itt06-roblox", "Roblox leftover"),
        ("/years/2006/sites/playable/linerider.html", "itt06-game-linerider", "Line Rider leftover"),
    ]
    for i, (path, key, title) in enumerate(extras):
        nxt = extras[(i + 1) % len(extras)]
        added += append_matrix_row(rows, have, "2006", path, key, "hops" if "feed" in key or "open" in key or "ie7" in key or "roblox" in key or "linerider" in key else "query", title, nxt[0], nxt[2])
    # clone 2005 leftover rows that exist on disk
    for r in list(rows):
        if r.get("year") != "2005":
            continue
        path = r["path"].replace("/years/2005/", "/years/2006/")
        key = r["key"].replace("itt05-", "itt06-")
        if key == "itt06-tweets":
            continue
        dest = ROOT / path.lstrip("/")
        if not dest.exists():
            continue
        added += append_matrix_row(
            rows,
            have,
            "2006",
            path,
            key,
            r.get("kind") or "query",
            str(r.get("title") or "2006 leftover").replace("2005", "2006"),
            (r.get("next") or "").replace("/years/2005/", "/years/2006/") or "/years/2006/sites/twitter/index.html",
            r.get("nextLabel") or "★ Twttr",
        )
    write_matrix(rows)
    n = sum(1 for r in rows if r.get("year") == "2006")
    print(f"2x matrix 2006 rows={n} added={added}")


def add_popular() -> None:
    p = ROOT / "scripts" / "popular-3x-sites.json"
    spec = json.loads(p.read_text(encoding="utf-8"))
    if "2006" not in spec:
        spec["2006"] = [
            {"id": "roblox", "name": "Roblox", "title": "Roblox — 1 Sep 2006", "why": "Public leftover. Not the chip.", "verb": "Play leftover.", "ph": "place leftover", "btn": "Play leftover", "bg": "#039", "fg": "#fff"},
            {"id": "wikipedia", "name": "Wikipedia millionth", "title": "Wiki millionth — 1 Mar 2006", "why": "EN millionth leftover.", "verb": "Name leftover article.", "ph": "Jordanhill leftover", "btn": "Ack leftover", "bg": "#111", "fg": "#fff"},
            {"id": "aws", "name": "AWS S3", "title": "S3 — 14 Mar 2006", "why": "Object store leftover.", "verb": "Name leftover bucket.", "ph": "bucket leftover", "btn": "Save leftover", "bg": "#222", "fg": "#fff"},
        ]
        p.write_text(json.dumps(spec, indent=2) + "\n", encoding="utf-8")


def write_e2e() -> None:
    write(
        ROOT / "e2e" / "2006-mvp.spec.js",
        """const { test, expect } = require('@playwright/test');

test.describe('2006 MVP', () => {
  test('hub opens 2006', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card[data-year="2006"]');
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/years\\/2006/);
  });
  test('shell boots year 2006', async ({ page }) => {
    await page.goto('/years/2006/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2006');
  });
  test('home lists guided 6 and leftover strips', async ({ page }) => {
    await page.goto('/years/2006/pages/home.html');
    await expect(page.locator('#ott-guided-2006 ol li')).toHaveCount(6);
    await expect(page.locator('body')).toContainText('Twttr');
    await expect(page.locator('nav[data-itt-pop3x="2006"] a')).toHaveCount(9);
  });
  test('2007 stays boarded', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[href*="years/2007"]')).toHaveCount(0);
    await expect(page.locator('.year-card.locked.y2007')).toBeVisible();
  });
});
""",
    )
    write(
        ROOT / "e2e" / "2006-official-10.spec.js",
        """// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}
async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => {
    localStorage.removeItem(k);
    localStorage.removeItem("itt06-tweets");
    localStorage.removeItem("itt05-yt-uploads");
    localStorage.removeItem("itt07-iphone");
  }, key);
  await page.reload();
}

async function completeLo(page, key) {
  const suf = key.replace(/^itt06-/, "");
  const lo = page.locator(`[data-lo-panel]:has([data-lo-save][data-lo-key="${suf}"])`).first();
  await lo.locator("[data-lo-trap]").click({ force: true });
  expect(await getKey(page, key)).toBeFalsy();
  await lo.locator("[data-lo-save]").click({ force: true });
  expect(await getKey(page, key)).toBeFalsy();
  const reqs = lo.locator("[data-lo-req]");
  const nReq = await reqs.count();
  for (let i = 0; i < nReq; i++) await reqs.nth(i).check({ force: true });
  const picks = lo.locator("[data-lo-pick]");
  const nPick = await picks.count();
  if (nPick) {
    const min = parseInt((await lo.locator("[data-lo-save]").getAttribute("data-lo-min-pick")) || "0", 10);
    const need = min || nPick;
    for (let i = 0; i < need && i < nPick; i++) await picks.nth(i).click({ force: true });
  }
  if ((await lo.locator("[data-lo-field]").count()) > 0) {
    await lo.locator("[data-lo-field]").fill("museum leftover");
  }
  await lo.locator("[data-lo-save]").click({ force: true });
  await expect.poll(() => getKey(page, key), { timeout: 8000 }).toBeTruthy();
  expect(await getKey(page, "itt06-tweets")).toBeFalsy();
}

test.describe("2006 official 10 · dest machines", () => {
  test("1 Twttr empty / trap never write · ticks + update writes", async ({ page }) => {
    await openClear(page, "/years/2006/sites/twitter/index.html", "itt06-tweets");
    await page.locator("form[data-twitter-compose] button[type='submit']").click();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    await page.locator("[data-tw-trap]").first().click();
    expect(await getKey(page, "itt06-tweets")).toBeFalsy();
    await page.fill("[data-twitter-status]", "just setting up my twttr residual");
    const reqs = page.locator("[data-tw-req]");
    const n = await reqs.count();
    for (let i = 0; i < n; i++) await reqs.nth(i).check();
    await page.locator("form[data-twitter-compose] button[type='submit']").click();
    await expect.poll(() => getKey(page, "itt06-tweets"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
    expect(await getKey(page, "itt07-iphone")).toBeFalsy();
  });
  test("2 News Feed hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/facebook/feed.html", "itt06-feed");
    await completeLo(page, "itt06-feed");
  });
  test("3 Facebook open hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/facebook/open.html", "itt06-fb-open");
    await completeLo(page, "itt06-fb-open");
  });
  test("4 YouTube Google-owned leftover", async ({ page }) => {
    await openClear(page, "/years/2006/sites/youtube/index.html", "itt06-yt-google");
    await completeLo(page, "itt06-yt-google");
  });
  test("5 Google Docs leftover", async ({ page }) => {
    await openClear(page, "/years/2006/sites/googledocs/index.html", "itt06-gdocs");
    await completeLo(page, "itt06-gdocs");
  });
  test("6 S3 checks", async ({ page }) => {
    await openClear(page, "/years/2006/sites/aws/index.html", "itt06-s3");
    await completeLo(page, "itt06-s3");
  });
  test("7 IE7 hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/ie7/index.html", "itt06-ie7");
    await completeLo(page, "itt06-ie7");
  });
  test("8 Wiki millionth", async ({ page }) => {
    await openClear(page, "/years/2006/sites/wikipedia/millionth.html", "itt06-wiki-1m");
    await completeLo(page, "itt06-wiki-1m");
  });
  test("9 Roblox hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/roblox/index.html", "itt06-roblox");
    await completeLo(page, "itt06-roblox");
  });
  test("10 Line Rider hops", async ({ page }) => {
    await openClear(page, "/years/2006/sites/playable/linerider.html", "itt06-game-linerider");
    await completeLo(page, "itt06-game-linerider");
  });
  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/2006/pages/home.html");
    await expect(page.locator("#ott-guided-2006 ol li")).toHaveCount(6);
  });
});
""",
    )


def main() -> int:
    copy_scaffold()
    clone_2008_twitter()
    write_gold_twitter()
    write_official()
    patch_home_and_about()
    patch_twitter_js()
    wire()
    unlock()
    clone_2x()
    add_popular()
    write_e2e()
    dests = len([p for p in (Y / "sites").iterdir() if p.is_dir()]) if (Y / "sites").exists() else 0
    htmls = len(list(Y.rglob("*.html")))
    print(f"2006 dests={dests} html={htmls}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
