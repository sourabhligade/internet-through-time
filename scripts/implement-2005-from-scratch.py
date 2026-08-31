#!/usr/bin/env python3
"""Implement 2005 full-year door from the 2026-08-31 freeze.

Scaffold from years/2004. Do not git-checkout the wiped forest.
2006 stays boarded. Incomplete / trap never write.
"""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
Y = ROOT / "years" / "2005"

CLONE_2008 = [
    "youtube",
    "maps",
    "reddit",
    "housingmaps",
    "milliondollar",
    "mashable",
    "programmableweb",
    "googlevideo",
    "reader",
    "techcrunch",
    "ask",
    "memeorandum",
]

SKIP_2008_FILES = {"streetview.html"}

NEW_DESTS = [
    ("pandora", "Pandora leftover — Music Genome", "pandora", "station leftover", "Google already owns Pandora (trap)", "housingmaps", "HousingMaps leftover"),
    ("ajax", "Ajax leftover — 18 Feb 2005", "ajax-lx", "Jesse James Garrett leftover", "Street View is Ajax gold (trap)", "maps", "Maps leftover"),
    ("dailymotion", "DailyMotion leftover — 15 Mar 2005", "dm-lx", "French video leftover", "YouTube already owns DailyMotion (trap)", "vimeo", "Vimeo leftover"),
    ("vimeo", "Vimeo leftover — 18 Jun 2005", "vimeo-lx", "self-register leftover", "HD as default 2005 (trap)", "googlevideo", "Google Video leftover"),
    ("earth", "Google Earth leftover — 28 Jun 2005", "earth-lx", "Keyhole leftover", "Street View is Earth (trap)", "analytics", "Analytics leftover"),
    ("analytics", "Google Analytics leftover — 14 Nov 2005", "ga-lx", "Urchin leftover", "Universal Analytics 2005 (trap)", "milliondollar", "Million Dollar leftover"),
    ("clubpenguin", "Club Penguin leftover — 24 Oct 2005", "cp-lx", "waddle leftover", "Disney already owns Club Penguin (trap)", "kayak", "Kayak leftover"),
    ("kayak", "Kayak leftover — 7 Feb 2005", "kayak-lx", "flight leftover", "Kayak is Google Flights (trap)", "gaia", "Gaia leftover"),
    ("gaia", "Gaia leftover — 2005 social", "gaia-lx", "gaia leftover", "Gaia is Facebook (trap)", "secondlife", "Second Life leftover"),
    ("secondlife", "Second Life leftover — 2005 world", "secondlife", "island leftover", "Metaverse is 2005 gold (trap)", "utorrent", "µTorrent leftover"),
    ("utorrent", "µTorrent leftover — 2005 client", "utorrent", "torrent leftover", "The Pirate Bay is this dest (trap)", "xbox360", "Xbox 360 leftover"),
    ("xbox360", "Xbox 360 leftover — 22 Nov 2005", "x360-lx", "NA launch leftover", "Xbox Live Gold is the chip (trap)", "android", "Android footnote leftover"),
    ("android", "Android leftover — Jul 2005 footnote", "android-fn", "quiet acquire leftover", "T-Mobile G1 is 2005 (trap)", "memeorandum", "Memeorandum leftover"),
    ("mapquest", "MapQuest leftover — print trap", "mq-lx", "print leftover", "This write is Google Maps (trap)", "maps", "Maps leftover"),
    ("gaia", "Gaia leftover — 2005 social", "gaia-lx", "gaia leftover", "Gaia is Facebook (trap)", "secondlife", "Second Life leftover"),
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not text.endswith("\n"):
        text += "\n"
    path.write_text(text, encoding="utf-8")


def replace_many(text: str, pairs: list[tuple[str, str]]) -> str:
    for a, b in pairs:
        text = text.replace(a, b)
    return text


def structural_retarget(text: str, src_year: str, dst_year: str, src_pref: str, dst_pref: str) -> str:
    src_yy = src_year[2:]
    dst_yy = dst_year[2:]
    pairs = [
        (f'data-itt-year="{src_year}"', f'data-itt-year="{dst_year}"'),
        (f"data-itt-year='{src_year}'", f"data-itt-year='{dst_year}'"),
        (f"period-{src_year}", f"period-{dst_year}"),
        (f"immersion-{src_year}", f"immersion-{dst_year}"),
        (f"browser-{src_year}", f"browser-{dst_year}"),
        (f"config/{src_year}", f"config/{dst_year}"),
        (f'ITT.configs["{src_year}"]', f'ITT.configs["{dst_year}"]'),
        (f'ITT.immersionConfigs["{src_year}"]', f'ITT.immersionConfigs["{dst_year}"]'),
        (f'paintStart("{src_year}")', f'paintStart("{dst_year}")'),
        (f'paint("{src_year}")', f'paint("{dst_year}")'),
        (f'bootBrowserYear("{src_year}")', f'bootBrowserYear("{dst_year}")'),
        (f'ITT._immersionYear = "{src_year}"', f'ITT._immersionYear = "{dst_year}"'),
        (f"years/{src_year}", f"years/{dst_year}"),
        (f"year-{src_year}", f"year-{dst_year}"),
        (f"web{src_year}", f"web{dst_year}"),
        (f"itt-{src_year}-", f"itt-{dst_year}-"),
        (f"ITT-2X-{src_year}", f"ITT-2X-{dst_year}"),
        (f"ITT-3X-{src_year}", f"ITT-3X-{dst_year}"),
        (f'data-itt-year="{src_year}"', f'data-itt-year="{dst_year}"'),
        (f'data-itt-3x-also data-itt-year="{src_year}"', f'data-itt-3x-also data-itt-year="{dst_year}"'),
        (f'data-itt-3x-links data-itt-year="{src_year}"', f'data-itt-3x-links data-itt-year="{dst_year}"'),
        (f'data-year="{src_year}"', f'data-year="{dst_year}"'),
        (f"yg-year-{src_year}", f"yg-year-{dst_year}"),
        (f"{src_pref}-", f"{dst_pref}-"),
        (f'storagePrefix: "{src_pref}"', f'storagePrefix: "{dst_pref}"'),
        (f'year: "{src_year}"', f'year: "{dst_year}"'),
        (f"{src_year} leftover", f"{dst_year} leftover"),
        (f"About {src_year}", f"About {dst_year}"),
        (f"— {src_year}", f"— {dst_year}"),
        (f"· {src_year}", f"· {dst_year}"),
        (f"Welcome to the World Wide Web — {src_year}", f"Welcome to the World Wide Web — {dst_year}"),
        (f"Internet Explorer 6.0 — {src_year}", f"Internet Explorer 6.0 — {dst_year}"),
        (f"About the Web in {src_year}", f"About the Web in {dst_year}"),
        (f"year-game-boot.js", f"year-game-boot.js"),
    ]
    return replace_many(text, pairs)


def lo_panel(key: str, title: str, honest: str, ph: str, trap: str, next_href: str, next_label: str) -> str:
    return f"""
<div data-lo-panel="1" data-itt-year="2005" class="itt-lo" style="margin:14px 0;padding:10px;border:1px solid #333;max-width:46em;background:#fff;font-family:Arial,sans-serif;font-size:13px">
<h2 style="margin:0 0 8px;font-size:15px">{title}</h2>
<p style="font-size:12px;color:#444">{honest}</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{ph}" autocomplete="off"></p>
<p><label><input type="checkbox" data-lo-req> Leftover 2005 · not the chip.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{key}">Save leftover</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{key}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
"""


def pop_panel(dest_id: str, verb: str, ph: str) -> str:
    return f"""
<div data-pop-panel="1" class="itt-pop3" style="margin:12px 0;padding:10px;border:1px dashed #1565c0;max-width:46em;font-family:Arial,sans-serif;font-size:12px;background:#e3f2fd">
<p><b>Popular leftover</b> · not the chip · empty never writes</p>
<p><button type="button" data-pop-pick="a">leftover A</button>
<button type="button" data-pop-pick="b">leftover B</button></p>
<p><label><input type="checkbox" data-pop-req> Leftover, not upload gold.</label></p>
<p><input type="text" data-pop-field maxlength="80" placeholder="{ph}"></p>
<p><button type="button" data-pop-go data-pop-id="{dest_id}">{verb}</button> <span data-pop-status></span></p>
</div>
"""


def dest_page(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2005.css">
</head>
<body bgcolor="#ffffff" text="#111111" link="#003399" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Arial,Verdana,sans-serif;font-size:13px">
{body}
</div>
<script src="../../../../js/immersion-2005.js"></script>
</body>
</html>
"""


def crumb(*pairs: tuple[str, str]) -> str:
    return "<p>" + " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in pairs) + "</p>"


def copy_scaffold() -> None:
    src = ROOT / "years" / "2004"
    if Y.exists():
        shutil.rmtree(Y)
    shutil.copytree(src, Y)
    pairs = [
        ("js/config/2004.js", "js/config/2005.js"),
        ("js/config/immersion-2004.js", "js/config/immersion-2005.js"),
        ("js/immersion-2004.js", "js/immersion-2005.js"),
        ("js/browser-2004.js", "js/browser-2005.js"),
    ]
    for a, b in pairs:
        shutil.copy2(ROOT / a, ROOT / b)
        t = (ROOT / b).read_text(encoding="utf-8")
        (ROOT / b).write_text(structural_retarget(t, "2004", "2005", "itt04", "itt05"), encoding="utf-8")


def retarget_tree() -> None:
    for p in Y.rglob("*"):
        if not p.is_file():
            continue
        if p.suffix.lower() not in {".html", ".js", ".css", ".txt", ".md", ".json"}:
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        n = structural_retarget(t, "2004", "2005", "itt04", "itt05")
        if n != t:
            p.write_text(n, encoding="utf-8")


def clone_2008() -> None:
    for slug in CLONE_2008:
        src = ROOT / "years" / "2008" / "sites" / slug
        dest = Y / "sites" / slug
        if not src.exists():
            continue
        dest.mkdir(parents=True, exist_ok=True)
        for p in src.rglob("*"):
            if not p.is_file():
                continue
            if p.name in SKIP_2008_FILES:
                continue
            rel = p.relative_to(src)
            out = dest / rel
            out.parent.mkdir(parents=True, exist_ok=True)
            if p.suffix.lower() in {".html", ".js", ".css"}:
                t = p.read_text(encoding="utf-8", errors="replace")
                t = structural_retarget(t, "2008", "2005", "itt08", "itt05")
                t = t.replace("period-2008-lite", "period-2005-lite")
                t = t.replace("period-2008", "period-2005")
                out.write_text(t, encoding="utf-8")
            else:
                shutil.copy2(p, out)


def patch_youtube_js() -> None:
    p = ROOT / "js" / "immersion" / "youtube.js"
    t = p.read_text(encoding="utf-8")
    needle = """        title = String(title).replace(/^\\s+|\\s+$/g, "");
        var st = doc.querySelector("[data-yt-upload-status]");
        /* REAL gate: empty title must not invent "Untitled" mock success */
        if (!title) {
          if (st) {
            st.innerHTML = "Enter a title to upload (no blank clips).";
            st.classList.add("itt-ux-need-attention");
          }
          return false;
        }"""
    insert = """        title = String(title).replace(/^\\s+|\\s+$/g, "");
        var st = doc.querySelector("[data-yt-upload-status]");
        /* REAL gate: empty title must not invent "Untitled" mock success */
        if (!title) {
          if (st) {
            st.innerHTML = "Enter a title to upload (no blank clips).";
            st.classList.add("itt-ux-need-attention");
          }
          return false;
        }
        var reqs = form.querySelectorAll("[data-yt-req]");
        if (reqs.length) {
          var ticksOk = true;
          var ri;
          for (ri = 0; ri < reqs.length; ri++) {
            if (!reqs[ri].checked) ticksOk = false;
          }
          if (!ticksOk) {
            if (st) {
              st.innerHTML = "Tick both honesty boxes. Empty / trap never writes.";
              st.classList.add("itt-ux-need-attention");
            }
            return false;
          }
        }"""
    if "data-yt-req" not in t:
        if needle not in t:
            raise SystemExit("youtube.js empty-title gate moved — cannot patch ticks")
        t = t.replace(needle, insert, 1)
    trap = """
    var trapBtns = doc.querySelectorAll("[data-yt-trap]");
    var tbi;
    for (tbi = 0; tbi < trapBtns.length; tbi++) {
      (function (btn) {
        if (btn.getAttribute("data-yt-trap-bound") === "1") return;
        btn.setAttribute("data-yt-trap-bound", "1");
        btn.addEventListener("click", function () {
          var st2 = doc.querySelector("[data-yt-upload-status]");
          if (st2) {
            st2.innerHTML = "Trap. That click never writes.";
            st2.classList.add("itt-ux-need-attention");
          }
        });
      })(trapBtns[tbi]);
    }
"""
    if "data-yt-trap-bound" not in t:
        t = t.replace(
            "    var list = seed();",
            trap + "\n    var list = seed();",
            1,
        )
    p.write_text(t, encoding="utf-8")


def write_gold_youtube() -> None:
    write(
        Y / "sites" / "youtube" / "upload.html",
        dest_page(
            "YouTube leftover — Upload (2005)",
            crumb(
                ("../../pages/home.html", "Starting Point"),
                ("index.html", "Videos leftover"),
                ("watch.html", "Watch leftover"),
                ("about.html", "About leftover"),
            )
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>Upload a video · mid-2005 leftover</h1>
<p>Upload, tag and share your videos worldwide. <b>Google does not own YouTube yet.</b>
<i>Me at the zoo</i> (23 Apr) is the watch leftover, not this write. Sequoia $3.5M / 8 TB/day is 7 Nov leftover.
Google buy is <b>Oct 2006</b>.</p>
<form data-yt-upload action="#">
<p><label>Title<br><input name="title" size="42" maxlength="80" autocomplete="off" placeholder="elephant leftover"></label></p>
<p><label>Tags / description<br><textarea name="desc" rows="3" cols="42" placeholder="tag leftover"></textarea></label></p>
<p><label><input type="checkbox" data-yt-req> This is leftover 2005 · Google does not own YouTube yet</label></p>
<p><label><input type="checkbox" data-yt-req> Empty / dating / trap never writes</label></p>
<p><button type="submit">Upload</button> <span data-yt-upload-status></span></p>
</form>
<p hidden data-next-flow data-next-when-key="itt05-yt-uploads"><b>Next:</b> <a href="../maps/index.html">Google Maps leftover</a></p>
<hr>
<p><b>Traps — these never write the chip</b></p>
<p><button type="button" data-yt-trap>Google already owns YouTube</button></p>
<form data-yt-dating action="#" style="margin:10px 0;padding:8px;border:1px dashed #a00">
<p>Find a date (Apr 2005 dating-form leftover — not gold)</p>
<p><input name="who" placeholder="find a date"></p>
<p><button type="submit">Find a date</button></p>
</form>
"""
            + lo_panel(
                "yt-lx",
                "YouTube leftover title (not the chip)",
                "Second path · incomplete never writes · not itt05-yt-uploads",
                "title leftover",
                "This leftover is the upload gold (trap)",
                "../maps/index.html",
                "Maps leftover",
            ),
        ),
    )
    write(
        Y / "sites" / "youtube" / "index.html",
        dest_page(
            "YouTube leftover — Videos (2005)",
            crumb(
                ("../../pages/home.html", "Starting Point"),
                ("upload.html", "★ Upload"),
                ("watch.html", "Watch leftover"),
                ("about.html", "About leftover"),
            )
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>YouTube leftover · independent 2005</h1>
<p>Broadcast Yourself class. Google does <b>not</b> own YouTube. Watch leftover below. ★ write is Upload.</p>
<form class="yt-search-bar" data-yt-search action="watch.html" method="get">
<b>Search leftover</b> <input name="v" size="28" placeholder="Me at the zoo"> <button type="submit">Search</button>
</form>
<div data-yt-list></div>
<p><a href="upload.html"><b>Upload a video</b></a> — that is the year star.</p>
"""
            + lo_panel(
                "yt-watch",
                "Watch leftover · Me at the zoo",
                "23 Apr 2005 · not the upload write",
                "elephant leftover",
                "Watching writes the upload gold (trap)",
                "upload.html",
                "★ Upload",
            )
            + pop_panel("youtube", "Save leftover watch", "zoo leftover"),
        ),
    )
    write(
        Y / "sites" / "youtube" / "watch.html",
        dest_page(
            "YouTube leftover — Watch (2005)",
            crumb(("index.html", "Videos leftover"), ("upload.html", "★ Upload"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1 data-yt-title>Me at the zoo</h1>
<p>Jawed Karim · San Diego Zoo elephants · ~19s · 23 Apr 2005. Watch leftover, not the chip.</p>
<div data-yt-player style="width:320px;height:180px;background:#222;color:#fff;padding:20px">Flash leftover player · no real codec</div>
<p data-yt-views data-yt-base="1">1</p>
<p><button type="button" data-yt-like>Rate leftover</button> <span data-yt-status></span></p>
"""
            + lo_panel(
                "yt-inv",
                "Invite friends leftover",
                "Aug 2005 WA Invite Friends · not the chip",
                "friend leftover",
                "Invite writes upload gold (trap)",
                "upload.html",
                "★ Upload",
            ),
        ),
    )
    write(
        Y / "sites" / "youtube" / "about.html",
        dest_page(
            "YouTube leftover — About (2005)",
            crumb(("index.html", "Videos leftover"), ("upload.html", "★ Upload"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>About YouTube leftover</h1>
<p>Founded Feb 2005. Domain 14 Feb. Public beta mid-year. Sequoia $3.5M / 8 TB/day on 7 Nov.
Official launch class 15 Dec. Google buy is Oct 2006 — <b>not this year</b>.</p>
"""
            + lo_panel(
                "yt-ind",
                "Independent YouTube tick",
                "Google buy is 2006",
                "independent leftover",
                "Google already closed the buy (trap)",
                "upload.html",
                "★ Upload",
            ),
        ),
    )


def write_maps() -> None:
    write(
        Y / "sites" / "maps" / "index.html",
        dest_page(
            "Google Maps leftover — 8 Feb 2005",
            crumb(
                ("../../pages/home.html", "Starting Point"),
                ("../youtube/upload.html", "★ Upload"),
                ("../housingmaps/index.html", "HousingMaps leftover"),
            )
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>Google Maps leftover</h1>
<p>Bret Taylor, 8 Feb 2005. Click-and-drag · no wait for a new image. “hotels near LAX.”
<b>Street View is 2007 — that pick never writes this leftover.</b> Maps API is 29 Jun leftover.</p>
<form data-maps-search action="#">
<label>What <input name="what" size="16" placeholder="hotels"></label>
<label>Where <input name="where" size="22" placeholder="LAX"></label>
<button type="submit">Search Maps leftover</button>
</form>
<div data-maps-canvas style="height:180px;background:#cde;border:1px solid #669;margin:8px 0;position:relative">
<button type="button" data-maps-zoom="in">+</button>
<button type="button" data-maps-zoom="out">−</button>
<button type="button" data-maps-pan="n">N</button>
<button type="button" data-maps-pan="s">S</button>
<button type="button" data-maps-pan="w">W</button>
<button type="button" data-maps-pan="e">E</button>
<div data-maps-status>Drag leftover · no Street View</div>
</div>
"""
            + lo_panel(
                "maps",
                "Maps leftover (official n=2)",
                "8 Feb 2005 · Street View never writes · not the chip",
                "hotels near LAX",
                "Open Street View (trap)",
                "../pandora/index.html",
                "Pandora leftover",
            )
            + lo_panel(
                "maps-lx",
                "Maps leftover two views",
                "Second path · not the official leftover write if you skip ticks",
                "pizza leftover",
                "Pegman is 2005 (trap)",
                "../pandora/index.html",
                "Pandora leftover",
            )
            + pop_panel("maps", "Save leftover map", "LAX leftover"),
        ),
    )
    write(
        Y / "sites" / "maps" / "about.html",
        dest_page(
            "Google Maps leftover — About",
            crumb(("index.html", "Maps leftover"), ("../ajax/index.html", "Ajax leftover"))
            + "<h1>About Maps leftover</h1><p>Public 8 Feb 2005. API 29 Jun cites HousingMaps. Not Street View.</p>"
            + lo_panel("maps-nsv", "No-Street-View tick", "Street View is 2007", "no pegman leftover", "Street View launched Feb 2005 (trap)", "index.html", "Maps leftover"),
        ),
    )


def write_official_rest() -> None:
    write(
        Y / "sites" / "pandora" / "index.html",
        dest_page(
            "Pandora leftover — 20 Aug 2005",
            crumb(("../../pages/home.html", "Starting Point"), ("../maps/index.html", "Maps leftover"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>Pandora leftover · not the chip</h1>
<p>TechCrunch 20 Aug 2005. Savage Beast. ~300k songs. <b>$3/mo</b> after 10 free hours. Free ads <b>10 Nov</b>.
Not the year star. Music Genome leftover.</p>
<div data-pd-root>
<form data-pd-create action="#">
<p><label>Station seed<br><input name="seed" data-pd-seed size="32" placeholder="Radiohead leftover"></label></p>
<p><button type="submit">Create station leftover</button> <span data-pd-status></span></p>
</form>
<div data-pd-now></div>
</div>
"""
            + lo_panel(
                "pandora",
                "Pandora leftover (official n=3)",
                "Not the chip · $3/mo then free ads Nov",
                "station leftover",
                "Pandora is the 2005 star (trap)",
                "../housingmaps/index.html",
                "HousingMaps leftover",
            )
            + lo_panel("pandora-lx", "Pandora station leftover", "TC 20 Aug · not the star", "genome leftover", "This writes upload gold (trap)", "../housingmaps/index.html", "HousingMaps leftover")
            + lo_panel("pandora-ck", "Pandora genome tick", "Music Genome leftover", "genome leftover", "iTunes Music Store is Pandora (trap)", "../housingmaps/index.html", "HousingMaps leftover"),
        ),
    )
    write(
        Y / "sites" / "housingmaps" / "index.html",
        dest_page(
            "HousingMaps leftover — mid-Apr 2005",
            crumb(("../maps/index.html", "Maps leftover"), ("../craigslist/index.html", "craigslist leftover"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>HousingMaps leftover</h1>
<p>Paul Rademacher · mid-Apr 2005 (NYT 1 May: site ~3 weeks old). &gt;200k uniques · ~25 cities.
Pre-API. Maps API lands <b>29 Jun</b>. Sample pins only — not live Craigslist.</p>
<form data-hm-filter>
City <select name="city"><option>San Francisco</option><option>New York</option><option>Chicago</option><option>Austin</option></select>
Kind <select name="kind"><option value="rent">For Rent</option><option value="sale">For Sale</option></select>
<button type="submit">Refresh leftover</button>
</form>
<p data-hm-status></p>
<div data-hm-pins class="hm-map"></div>
"""
            + lo_panel("hm", "HousingMaps leftover (official n=4)", "pre-API · mid-Apr 2005", "SF leftover", "Live Craigslist write (trap)", "../digg/index.html", "Digg leftover")
            + lo_panel("hm-lx", "HousingMaps city leftover", "Rademacher · ~25 cities", "Austin leftover", "API already shipped Apr (trap)", "../digg/index.html", "Digg leftover")
            + lo_panel("hm-ck", "HousingMaps both ticks", "Craigslist + Maps leftover", "both leftover", "This is Street View (trap)", "../digg/index.html", "Digg leftover"),
        ),
    )
    # Digg / Reddit / Flickr already exist after 2004 copy — inject official leftover
    inject_lo(
        Y / "sites" / "digg" / "index.html",
        lo_panel("digg", "Digg leftover (official n=5)", "Rise year · Digg 2.0 27 May · Diggnation 1 Jul", "bury leftover", "Digg is the 2005 star (trap)", "../reddit/index.html", "Reddit leftover")
        + lo_panel("digg-lx", "Digg leftover bury", "public Dec 2004 · rise 2005", "bury leftover", "Bury writes upload gold (trap)", "../reddit/index.html", "Reddit leftover")
        + lo_panel("diggnation", "Diggnation ep.1 leftover", "1 Jul 2005", "diggnation leftover", "Revision3 is YouTube gold (trap)", "../reddit/index.html", "Reddit leftover"),
    )
    write(
        Y / "sites" / "reddit" / "index.html",
        dest_page(
            "reddit leftover — 22 / 23 Jun 2005",
            crumb(("../digg/index.html", "Digg leftover"), ("../youtube/upload.html", "★ Upload"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>reddit leftover</h1>
<p>First line 3–4 Jun. Live <b>22 Jun</b> because Paul Graham linked it. Wikipedia / ILS founded date <b>23 Jun</b> — print both.
Boost leftover. Empty submit never writes Untitled.</p>
<div data-reddit-list></div>
<p><a href="submit.html">submit leftover</a> · <a href="about.html">about leftover</a></p>
"""
            + lo_panel("reddit", "Reddit leftover (official n=6)", "22 Jun live · 23 Jun Wikipedia", "boost leftover", "Reddit is the 2005 star (trap)", "../flickr/index.html", "Flickr leftover")
            + lo_panel("reddit-lx", "Reddit leftover boost", "YC first class", "boost leftover", "Boost writes upload gold (trap)", "../flickr/index.html", "Flickr leftover")
            + lo_panel("reddit-hot", "Reddit hottest leftover", "Jul WA hottest", "hottest leftover", "Hottest is Digg 2.0 (trap)", "../flickr/index.html", "Flickr leftover")
            + pop_panel("reddit", "Save leftover boost", "boost leftover"),
        ),
    )
    write(
        Y / "sites" / "reddit" / "submit.html",
        dest_page(
            "reddit leftover — submit",
            crumb(("index.html", "reddit leftover"),)
            + "<h1>submit leftover</h1><p>Empty submit never writes Untitled.</p>"
            + lo_panel("reddit-empty", "Empty-submit trap tick", "never writes Untitled", "title leftover", "Submit empty as Untitled (trap)", "index.html", "reddit leftover"),
        ),
    )
    write(
        Y / "sites" / "reddit" / "about.html",
        dest_page(
            "reddit leftover — about",
            crumb(("index.html", "reddit leftover"),)
            + "<h1>about leftover</h1><p>22 Jun live · 23 Jun Wikipedia / ILS. Print both.</p>"
            + lo_panel("reddit-about", "Reddit about leftover", "Huffman YC leftover", "about leftover", "Twttr launched 2005 (trap)", "index.html", "reddit leftover"),
        ),
    )
    inject_lo(
        Y / "sites" / "flickr" / "index.html",
        lo_panel("flickr", "Flickr leftover (official n=7)", "Yahoo←Ludicorp 20 Mar 2005 · not Yahoo Photos · 2004 chip stays itt04-*", "tag leftover", "Yahoo Photos is this dest (trap)", "../itunes/podcasts.html", "iTunes podcasts leftover")
        + lo_panel("flickr-lx", "Flickr leftover upload", "Yahoo-owned leftover", "upload leftover", "This writes 2004 flickr gold (trap)", "../itunes/podcasts.html", "iTunes podcasts leftover")
        + lo_panel("flickr-tag", "Flickr tags leftover", "period tags", "tag leftover", "Folksonomy is the chip (trap)", "../itunes/podcasts.html", "iTunes podcasts leftover"),
    )
    write(
        Y / "sites" / "itunes" / "podcasts.html",
        dest_page(
            "iTunes podcasts leftover — 28 Jun 2005",
            crumb(("index.html", "iTunes leftover"), ("../../pages/home.html", "Starting Point"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>iTunes podcasts leftover</h1>
<p>Apple 28 Jun 2005. iTunes 4.9. 3,000+ free podcasts. &gt;1 million subscriptions in two days (30 Jun).
Jobs: “Podcasting is the next generation of radio.” Not the chip.</p>
"""
            + lo_panel("pod", "iTunes podcast leftover (official n=8)", "28 Jun · 3,000+ · 1M by 30 Jun", "podcast leftover", "Podcasts are the 2005 star (trap)", "../techcrunch/index.html", "TechCrunch leftover")
            + lo_panel("pod-lx", "Podcast subscribe leftover", "Apple PR opened", "subscribe leftover", "Subscribe writes upload gold (trap)", "../techcrunch/index.html", "TechCrunch leftover")
            + lo_panel("pod-1m", "iTunes >1M / 2 days tick", "Apple PR 30 Jun", "1M leftover", "iPod is the chip (trap)", "../techcrunch/index.html", "TechCrunch leftover"),
        ),
    )
    write(
        Y / "sites" / "techcrunch" / "index.html",
        dest_page(
            "TechCrunch leftover — 11 Jun 2005",
            crumb(("../../pages/home.html", "Starting Point"), ("../mashable/index.html", "Mashable leftover"))
            + """
<p class="itt-pixel-failed">[failed-final]</p>
<h1>TechCrunch leftover</h1>
<p>Arrington first post 11 Jun 2005. Technorati EOY ~#70. Boom-year press leftover. Not the chip.</p>
"""
            + lo_panel("tc", "TechCrunch leftover (official n=9)", "11 Jun 2005 Arrington", "crunch leftover", "TechCrunch is the star (trap)", "../playable/game.html", "HoverChop")
            + lo_panel("tc-lx", "TechCrunch leftover note", "boom press leftover", "note leftover", "This writes upload gold (trap)", "../playable/game.html", "HoverChop"),
        ),
    )
    write(
        Y / "sites" / "techcrunch" / "about.html",
        dest_page(
            "TechCrunch leftover — about",
            crumb(("index.html", "TechCrunch leftover"),)
            + "<h1>about leftover</h1><p>Jun 2005. Not Mashable. Not ProgrammableWeb.</p>"
            + lo_panel("tc-about", "TechCrunch about leftover", "Arrington leftover", "about leftover", "TC bought Yahoo (trap)", "index.html", "TechCrunch leftover"),
        ),
    )


def write_hoverchop() -> None:
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
<div class="itt-year-game yg-shell" data-year-game data-year="2005" data-game-id="hoverchop" data-yg-goal="Hold to climb. Release to fall. Don't hit the cave." data-yg-next-href="../youtube/upload.html" data-yg-next-label="★ Upload">
<h1>HoverChop — 2005</h1>
<p>Museum original · Helicopter-game genre leftover. Not a commercial clone. Incomplete never writes.</p>
<p class="honesty">key <code>itt05-game-hoverchop</code> · not the YouTube chip</p>
<canvas id="game-canvas" width="480" height="220" style="border:1px solid #333;background:#0a1628"></canvas>
<p>Score <b id="play-score">0</b> · <span id="play-status">Hold mouse / Space to climb</span></p>
<p><button type="button" data-game-start id="game-start">Start leftover</button></p>
<div id="score-board"></div>
<p style="font-size:11px"><a href="index.html">← Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
</div>
{lo_panel("game-hoverchop", "HoverChop leftover (official n=10)", "Museum helicopter leftover · not the chip", "chop leftover", "This is the YouTube gold (trap)", "../youtube/upload.html", "★ Upload")}
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/heli.js"></script>
<script src="../../../../js/immersion-2005.js" defer></script>
</body>
</html>
""",
    )


def inject_lo(path: Path, html: str) -> None:
    if not path.exists():
        write(path, dest_page(path.parent.name + " leftover", html))
        return
    t = path.read_text(encoding="utf-8", errors="replace")
    if 'data-lo-key="' in t and "data-lo-panel" in t:
        # still append extra official keys if missing
        if html.split('data-lo-key="', 1)[1][:20] in t:
            return
    if "</body>" in t:
        t = t.replace("</body>", html + "\n</body>", 1)
    else:
        t += html
    path.write_text(t, encoding="utf-8")


def write_year_true() -> None:
    dests = [
        ("ajax", "Ajax leftover — 18 Feb 2005", "ajax-lx", "Jesse James Garrett coins Ajax. Cites Maps + Suggest. WA Adaptive Path 18 Feb.", "ajax leftover", "Street View is the Ajax gold (trap)", "../maps/index.html", "Maps leftover"),
        ("dailymotion", "DailyMotion leftover — 15 Mar 2005", "dm-lx", "French video leftover. Founded 15 Mar 2005. Not YouTube gold.", "clip leftover", "DailyMotion is the 2005 star (trap)", "../vimeo/index.html", "Vimeo leftover"),
        ("vimeo", "Vimeo leftover — 18 Jun 2005", "vimeo-lx", "Self-register 18 Jun 2005. Not HD-as-default gold.", "clip leftover", "Vimeo HD is 2005 gold (trap)", "../googlevideo/index.html", "Google Video leftover"),
        ("earth", "Google Earth leftover — 28 Jun 2005", "earth-lx", "Keyhole. Plus $20/yr · Pro $400/yr. Not Street View.", "keyhole leftover", "Street View is Earth (trap)", "../analytics/index.html", "Analytics leftover"),
        ("analytics", "Google Analytics leftover — 14 Nov 2005", "ga-lx", "Urchin. Invite throttle leftover. Not the star.", "urchin leftover", "Analytics is the chip (trap)", "../milliondollar/index.html", "Million Dollar leftover"),
        ("clubpenguin", "Club Penguin leftover — 24 Oct 2005", "cp-lx", "Public noon PT 24 Oct. WDM 2005. Disney is 2007.", "waddle leftover", "Disney already owns this (trap)", "../kayak/index.html", "Kayak leftover"),
        ("kayak", "Kayak leftover — 7 Feb 2005", "kayak-lx", "Public 7 Feb 2005 travel leftover. Not Google Flights.", "flight leftover", "Kayak is Google Flights (trap)", "../gaia/index.html", "Gaia leftover"),
        ("gaia", "Gaia leftover — 2005 social", "gaia-lx", "2005 leftover social. Not open Facebook.", "gaia leftover", "Gaia is Facebook gold (trap)", "../secondlife/index.html", "Second Life leftover"),
        ("secondlife", "Second Life leftover — 2005 world", "secondlife", "Leftover world. Not a web gold.", "island leftover", "Metaverse is the chip (trap)", "../utorrent/index.html", "µTorrent leftover"),
        ("utorrent", "µTorrent leftover — 2005 client", "utorrent", "Client leftover. Not an exploit dest.", "torrent leftover", "Exploit this client (trap)", "../xbox360/index.html", "Xbox 360 leftover"),
        ("xbox360", "Xbox 360 leftover — 22 Nov 2005", "x360-lx", "NA launch leftover console. Not a web gold.", "360 leftover", "Xbox Live is the chip (trap)", "../android/index.html", "Android footnote"),
        ("android", "Android leftover — Jul 2005 footnote", "android-fn", "Quiet acquire leftover. <b>Not G1.</b> G1 is 2008.", "footnote leftover", "T-Mobile G1 launched 2005 (trap)", "../memeorandum/index.html", "Memeorandum leftover"),
        ("mapquest", "MapQuest leftover — print trap", "mq-lx", "Print leftover. This write never writes Maps gold.", "print leftover", "This is Google Maps (trap)", "../maps/index.html", "Maps leftover"),
        ("milliondollar", "Million Dollar Homepage leftover — 26 Aug 2005", "mdh-lx", "Alex Tew. 26 Aug. Jan 2006 auction is edge.", "pixel leftover", "Million Dollar is the star (trap)", "../clubpenguin/index.html", "Club Penguin leftover"),
        ("mashable", "Mashable leftover — ~Jul 2005", "mash-lx", "Pete Cashmore. Boom-year press leftover.", "mash leftover", "Mashable is TechCrunch (trap)", "../programmableweb/index.html", "ProgrammableWeb leftover"),
        ("programmableweb", "ProgrammableWeb leftover — Aug 2005", "pw-lx", "John Musser. API directory leftover.", "api leftover", "This is the Maps API gold (trap)", "../dailymotion/index.html", "DailyMotion leftover"),
        ("googlevideo", "Google Video leftover — 2005", "gv-lx", "25 Jan search · 27 Jun play. Not YouTube gold. Google does not own YouTube.", "search leftover", "Google Video is YouTube (trap)", "../earth/index.html", "Earth leftover"),
        ("reader", "Google Reader leftover — 7 Oct 2005", "reader-lx", "Labs 7 Oct. Shutdown 2013 out of scope.", "atom leftover", "Reader is the chip (trap)", "../odeo/index.html", "Odeo leftover"),
        ("ask", "Ask leftover — Bloglines Feb 2005", "ask-lx", "Ask←Bloglines Feb. Not Jeeves gold.", "ask leftover", "Ask is Google (trap)", "../bloglines/index.html", "Bloglines leftover"),
        ("memeorandum", "Memeorandum leftover", "memo-lx", "Political blog river leftover.", "memo leftover", "Memeorandum is TechCrunch (trap)", "../daypop/index.html", "Daypop leftover"),
    ]
    for slug, title, key, honest, ph, trap, nxt, nl in dests:
        extra = ""
        if slug in ("milliondollar", "clubpenguin", "kayak"):
            extra = pop_panel(slug, "Save leftover", ph)
        write(
            Y / "sites" / slug / "index.html",
            dest_page(
                title,
                crumb(("../../pages/home.html", "Starting Point"), ("../../pages/map.html", "Year flow map"))
                + f'<p class="itt-pixel-failed">[failed-final]</p><h1>{title}</h1><p>{honest}</p>'
                + lo_panel(key, title, honest, ph, trap, nxt if nxt.startswith("../") else "../" + nxt, nl)
                + extra,
            ),
        )
    # googleearth alias for year-true-packs leftover path
    write(
        Y / "sites" / "googleearth" / "index.html",
        dest_page(
            "Google Earth leftover (alias)",
            crumb(("../earth/index.html", "Earth leftover"),)
            + "<h1>Google Earth leftover</h1><p>Same 28 Jun 2005 Keyhole leftover. Prefer <a href='../earth/index.html'>earth</a>.</p>"
            + lo_panel("googleearth", "Google Earth residual", "Keyhole leftover", "earth leftover", "Street View (trap)", "../earth/index.html", "Earth leftover"),
        ),
    )
    # leftover injects on existing 2004 dests that are year-true in 2005
    inject_lo(
        Y / "sites" / "firefox" / "index.html",
        lo_panel("fx15-lx", "Firefox 1.5 leftover", "29 Nov 2005 · IE6 remains January shell", "1.5 leftover", "Firefox 1.5 is the default shell (trap)", "../gmail/index.html", "Gmail leftover"),
    )
    inject_lo(
        Y / "sites" / "facebook" / "index.html",
        lo_panel("fb-rename", "Facebook rename leftover", "Aug 2005 drops “The” · still gated · not open FB", "rename leftover", "Facebook is open to everyone (trap)", "networks.html", "networks leftover")
        + lo_panel("fb-hs", "Facebook high school leftover", "Sep 2005 · not open", "hs leftover", "News Feed launched 2005 (trap)", "invite.html", "invite leftover"),
    )
    inject_lo(
        Y / "sites" / "delicious" / "index.html",
        lo_panel("deli-lx", "delicious leftover", "Yahoo 9 Dec · ~300k · price undisclosed", "tag leftover", "Yahoo published the price (trap)", "../flickr/index.html", "Flickr leftover")
        + lo_panel("deli-bm", "delicious bookmarklet leftover", "Sep WA leftover", "bookmarklet leftover", "This writes Maps gold (trap)", "../flickr/index.html", "Flickr leftover"),
    )
    inject_lo(
        Y / "sites" / "feedburner" / "index.html",
        lo_panel("fburn-lx", "FeedBurner leftover", "RSS stats leftover", "feed leftover", "FeedBurner is Reader (trap)", "../bloglines/index.html", "Bloglines leftover"),
    )
    inject_lo(
        Y / "sites" / "bloglines" / "index.html",
        lo_panel("blines-lx", "Bloglines leftover", "Ask acquired Feb 2005", "feeds leftover", "Bloglines is Google Reader (trap)", "../web20conference/index.html", "Web 2.0 leftover"),
    )
    inject_lo(
        Y / "sites" / "web20conference" / "index.html",
        lo_panel("w20-lx", "Web 2.0 Conference leftover", "Oct 2005 sold-out", "conf leftover", "Web 2.0 is the chip (trap)", "../odeo/index.html", "Odeo leftover"),
    )
    inject_lo(
        Y / "sites" / "odeo" / "index.html",
        lo_panel("odeo-lx", "Odeo leftover", "Evan Williams podcast leftover · announce ~25 Feb / launch ~Jul", "odeo leftover", "Odeo is Twitter 2005 (trap)", "../itunes/podcasts.html", "Podcasts leftover"),
    )
    inject_lo(
        Y / "sites" / "googlevideo" / "index.html",
        lo_panel("gv-play", "Google Video play leftover", "27 Jun 2005 in-page play", "play leftover", "This is YouTube gold (trap)", "../youtube/watch.html", "Watch leftover"),
    )


def write_about_and_home() -> None:
    write(
        Y / "pages" / "about.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2005">
<head>
<meta charset="utf-8">
<title>About the Web in 2005</title>
<link rel="stylesheet" href="../../../css/period-2005.css">
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000cc" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Verdana,Arial,sans-serif;font-size:13px">
<h1 style="font-size:20px">About 2005</h1>
<p><b>2005 is when Web 2.0 becomes a business boom — YouTube upload is the save, Maps / Reddit / Digg / Pandora / iTunes podcasts are leftover, Yahoo is still #1 visits, and Google does not own YouTube yet.</b></p>
<p><b>Scale (Internet Live Stats, June 2005):</b> <b>64,780,617</b> websites (+26%) · <b>1,027,580,990</b> users · 16 users/site. Birthmarks <b>YouTube</b> + <b>Reddit</b>.</p>
<p>Netcraft June hostnames <b>64,808,485</b> · December <b>74,353,258</b> (Apache 69.97% / Microsoft 20.92%). Print June and December separately. Do not blend the two cells.</p>
<p>Yahoo is still #1 visits (6.20B). MySpace enters top 10 at #9 (462M). YouTube is <b>not</b> on the visits list.</p>
<h2 style="font-size:15px">Anachronism bans</h2>
<ul>
<li>Google owns YouTube (Oct 2006)</li>
<li>Twitter / Twttr (2006)</li>
<li>Open Facebook / News Feed (2006)</li>
<li>Street View (2007) · Chrome · iPhone · Vista-as-default</li>
<li>Roblox public (1 Sep 2006) · Wikipedia millionth article (1 Mar 2006 — 2005 milestone is 500k on 17–18 Mar)</li>
<li>Pandora as the year star — leftover only</li>
</ul>
<p><a href="home.html">← Starting Point</a> · <a href="../sites/youtube/upload.html">★ Upload</a></p>
</div>
<script src="../../../js/immersion-2005.js"></script>
</body>
</html>
""",
    )
    home = Y / "pages" / "home.html"
    ht = home.read_text(encoding="utf-8")
    strips = """
<nav data-itt-pop3x="2005" class="itt-pop3x" style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:52em">
<b>Leftover 3× · strip 1 · 9 doors</b> (not Upload · incomplete never writes):
 <a href="../sites/youtube/watch.html">watch leftover</a> ·
 <a href="../sites/wikipedia/index.html">wiki leftover</a> ·
 <a href="../sites/myspace/index.html">myspace leftover</a> ·
 <a href="../sites/yahoo/index.html">yahoo leftover</a> ·
 <a href="../sites/google/index.html">google leftover</a> ·
 <a href="../sites/amazon/index.html">amazon leftover</a> ·
 <a href="../sites/ebay/index.html">ebay leftover</a> ·
 <a href="../sites/msn/index.html">msn leftover</a> ·
 <a href="../sites/aol/index.html">aol leftover</a>
</nav>
<nav data-itt-pop-more="2005" style="margin:10px auto;padding:10px;background:#fff8e1;border:1px dashed #ef6c00;font-family:Arial,sans-serif;font-size:12px;max-width:52em">
<b>Leftover more · strip 2 · 9 doors</b>:
 <a href="../sites/firefox/index.html">firefox leftover</a> ·
 <a href="../sites/gmail/invite.html">gmail-invite leftover</a> ·
 <a href="../sites/flickr/index.html">flickr leftover</a> ·
 <a href="../sites/skype/index.html">skype leftover</a> ·
 <a href="../sites/delicious/index.html">delicious leftover</a> ·
 <a href="../sites/blogger/index.html">blogger leftover</a> ·
 <a href="../sites/wordpress/index.html">wordpress leftover</a> ·
 <a href="../sites/cnn/index.html">cnn leftover</a> ·
 <a href="../sites/apple/ipod.html">ipod leftover</a>
</nav>
<nav data-itt-pop-3x3="2005" style="margin:10px auto;padding:10px;background:#f3e5f5;border:1px dashed #6a1b9a;font-family:Arial,sans-serif;font-size:12px;max-width:52em">
<b>Leftover 3×3 · strip 3 · 9 doors</b>:
 <a href="../sites/clubpenguin/index.html">clubpenguin leftover</a> ·
 <a href="../sites/milliondollar/index.html">milliondollar leftover</a> ·
 <a href="../sites/dailymotion/index.html">dailymotion leftover</a> ·
 <a href="../sites/vimeo/index.html">vimeo leftover</a> ·
 <a href="../sites/googlevideo/index.html">googlevideo leftover</a> ·
 <a href="../sites/earth/index.html">earth leftover</a> ·
 <a href="../sites/mashable/index.html">mashable leftover</a> ·
 <a href="../sites/programmableweb/index.html">programmableweb leftover</a> ·
 <a href="../sites/kayak/index.html">kayak leftover</a>
</nav>
"""
    if 'data-itt-pop3x="2005"' not in ht:
        ht = ht.replace("</body>", strips + "</body>", 1)
        home.write_text(ht, encoding="utf-8")


def wire_start_and_trails() -> None:
    sd = ROOT / "ui" / "year" / "start-data.js"
    t = sd.read_text(encoding="utf-8")
    if '"2005"' not in t:
        block = '''  "2005": {
    "href": "../sites/youtube/upload.html",
    "label": "★ One-thing · YouTube upload REAL",
    "items": [
      "<a href=\\"about.html\\">About 2005</a> — boom · Yahoo still #1",
      "<a href=\\"../sites/youtube/upload.html\\">★ Upload</a> — empty / dating / Google-owned never write",
      "<a href=\\"../sites/maps/index.html\\">Google Maps leftover</a> — 8 Feb · no Street View",
      "<a href=\\"../sites/reddit/index.html\\">Reddit leftover</a> — 22 / 23 Jun",
      "<a href=\\"../sites/digg/index.html\\">Digg leftover</a> — rise year",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  },
'''
        if '  "2008": {' not in t:
            raise SystemExit("start-data.js 2008 marker missing")
        t = t.replace('  "2008": {', block + '  "2008": {', 1)
        sd.write_text(t, encoding="utf-8")

    ft = ROOT / "js" / "config" / "flow-trails.js"
    t = ft.read_text(encoding="utf-8")
    if '"2005"' not in t:
        block = """    "2005": [
      {"n": 1, "name": "Upload", "href": "sites/youtube/upload.html", "match": "/youtube/upload", "whenKey": "itt05-yt-uploads", "nextHref": "sites/maps/index.html", "nextLabel": "Google Maps leftover"},
      {"n": 2, "name": "Maps leftover", "href": "sites/maps/index.html", "match": "/maps/", "whenKey": "itt05-maps", "nextHref": "sites/pandora/index.html", "nextLabel": "Pandora leftover"},
      {"n": 3, "name": "Pandora leftover", "href": "sites/pandora/index.html", "match": "/pandora/", "whenKey": "itt05-pandora", "nextHref": "sites/housingmaps/index.html", "nextLabel": "HousingMaps leftover"},
      {"n": 4, "name": "HousingMaps leftover", "href": "sites/housingmaps/index.html", "match": "/housingmaps/", "whenKey": "itt05-hm", "nextHref": "sites/digg/index.html", "nextLabel": "Digg leftover"},
      {"n": 5, "name": "Digg leftover", "href": "sites/digg/index.html", "match": "/digg/", "whenKey": "itt05-digg", "nextHref": "sites/reddit/index.html", "nextLabel": "Reddit leftover"},
      {"n": 6, "name": "Reddit leftover", "href": "sites/reddit/index.html", "match": "/reddit/", "whenKey": "itt05-reddit", "nextHref": "sites/flickr/index.html", "nextLabel": "Flickr leftover"},
      {"n": 7, "name": "Flickr leftover", "href": "sites/flickr/index.html", "match": "/flickr/", "whenKey": "itt05-flickr", "nextHref": "sites/itunes/podcasts.html", "nextLabel": "iTunes podcasts leftover"},
      {"n": 8, "name": "iTunes podcasts leftover", "href": "sites/itunes/podcasts.html", "match": "/itunes/podcasts", "whenKey": "itt05-pod", "nextHref": "sites/techcrunch/index.html", "nextLabel": "TechCrunch leftover"},
      {"n": 9, "name": "TechCrunch leftover", "href": "sites/techcrunch/index.html", "match": "/techcrunch/", "whenKey": "itt05-tc", "nextHref": "sites/playable/game.html", "nextLabel": "HoverChop"},
      {"n": 10, "name": "HoverChop", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt05-game-hoverchop", "nextHref": "sites/youtube/upload.html", "nextLabel": "Upload"}
    ],
"""
        t = t.replace('    "2008": [', block + '    "2008": [', 1)
        ft.write_text(t, encoding="utf-8")

    yj = ROOT / "ui" / "year" / "years.js"
    t = yj.read_text(encoding="utf-8")
    if '"2005":' not in t.split("2004", 1)[-1][:200] and '\n  "2005":' not in t:
        # insert after 2004 block's maximized close, before 2008
        marker = '    "maximized": true\n  },\n  "2008": {'
        block = """    "maximized": true
  },
  "2005": {
    "title": "Internet Explorer 6.0 — 2005",
    "css": [
      "win95-netscape.css",
      "ie5-overrides.css"
    ],
    "bodyClass": "year-2005 os-winxp browser-ie6",
    "boot": "browser-2005.js",
    "dir": [
      { "go": "pages/home.html", "label": "Start" },
      { "go": "sites/youtube/upload.html", "label": "Upload" },
      { "go": "sites/maps/index.html", "label": "Maps" },
      { "go": "sites/reddit/index.html", "label": "Reddit" },
      { "go": "sites/digg/index.html", "label": "Digg" },
      { "go": "sites/flickr/index.html", "label": "Flickr" },
      { "go": "sites/pandora/index.html", "label": "Pandora" },
      { "go": "sites/myspace/index.html", "label": "MySpace" },
      { "go": "sites/yahoo/index.html", "label": "Yahoo" },
      { "go": "pages/about.html", "label": "About" }
    ],
    "chrome": "2004",
    "toolbar": "ie",
    "family": "ie",
    "location": "http://home.microsoft.com/intl/web2005/",
    "prefHome": "http://home.microsoft.com/intl/web2005/",
    "yearLabel": "2005 · Windows XP · Internet Explorer 6",
    "windowTitle": "Welcome to the World Wide Web — Microsoft Internet Explorer",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (always-on broadband)",
    "skipBtn": "Skip connect",
    "thesis": "2005 thesis: Web 2.0 boom. YouTube upload is the save. Yahoo still #1 visits. Google does not own YouTube.",
    "openLoc": "Open Location in Internet Explorer:",
    "aboutHtml": "<p><b>Microsoft Internet Explorer</b></p> <p>Version 6.0<br>Copyright © 1995–2001 Microsoft Corporation</p> <p>Educational historical Web exhibit.</p> <p>Supports Dynamic HTML, CSS, ActiveX, and always-on broadband.</p>",
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
            raise SystemExit("years.js 2004/2008 marker missing")
        t = t.replace(marker, block, 1)
        yj.write_text(t, encoding="utf-8")

    # immersion config nav
    ic = ROOT / "js" / "config" / "immersion-2005.js"
    t = ic.read_text(encoding="utf-8")
    t = t.replace(
        'navSubtitle: "IE 6 · Windows XP · Gmail · Flickr · Firefox 1.0"',
        'navSubtitle: "IE 6 · Windows XP · Upload · Maps · Reddit"',
    )
    t = t.replace(
        'hint: "51.6M sites · Web 2.0 hinge"',
        'hint: "64.8M sites · boom year · Yahoo still #1"',
    )
    t = t.replace(
        "Gmail · Flickr · Thefacebook · Firefox 1.0.",
        "Upload · Maps · Reddit · Google does not own YouTube.",
    )
    ic.write_text(t, encoding="utf-8")

    # year-playable
    yp = ROOT / "js" / "config" / "year-playable.js"
    t = yp.read_text(encoding="utf-8")
    if '"2005"' not in t:
        t = t.replace(
            '        "2008": {',
            """    "2005": {
      id: "hoverchop",
      title: "HoverChop",
      href: "game.html",
      key: "itt05-game-hoverchop",
      inspire: "Helicopter-game genre (hold to climb)",
      blurb: "Hold to climb. Release to fall. Don't hit the cave. Incomplete never writes.",
      why: "2005 leftover cabinet. Star stays YouTube upload.",
      era: "XP + IE6. Maps. Independent YouTube.",
      famous: "HoverChop + leftover cabinets",
      accent: "#c00"
    },
        "2008": {""",
            1,
        )
        yp.write_text(t, encoding="utf-8")

    # year-true-packs googleearth path → keep alias dest; also earth
    pack = ROOT / "js" / "config" / "year-true-packs.json"
    rows = json.loads(pack.read_text(encoding="utf-8"))
    for row in rows:
        if row.get("year") == "2005" and row.get("id") == "googleearth":
            row["path"] = "/years/2005/sites/earth/index.html"
            row["key"] = "itt05-earth-lx"
            row["title"] = "Google Earth leftover"
    pack.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")

    # urlMap + hints for new dests
    cfg = ROOT / "js" / "config" / "2005.js"
    t = cfg.read_text(encoding="utf-8")
    extras = [
        "youtube/upload.html",
        "youtube/index.html",
        "youtube/watch.html",
        "maps/index.html",
        "pandora/index.html",
        "housingmaps/index.html",
        "reddit/index.html",
        "itunes/podcasts.html",
        "techcrunch/index.html",
        "ajax/index.html",
        "dailymotion/index.html",
        "vimeo/index.html",
        "earth/index.html",
        "analytics/index.html",
        "clubpenguin/index.html",
        "kayak/index.html",
        "gaia/index.html",
        "secondlife/index.html",
        "utorrent/index.html",
        "xbox360/index.html",
        "android/index.html",
        "mapquest/index.html",
        "milliondollar/index.html",
        "mashable/index.html",
        "programmableweb/index.html",
        "googlevideo/index.html",
        "reader/index.html",
        "ask/index.html",
        "memeorandum/index.html",
        "googleearth/index.html",
    ]
    for rel in extras:
        line = f'      "sites/{rel}": "http://museum.local/years/2005/sites/{rel}",\n'
        if line not in t:
            t = t.replace("    urlMap: {\n", "    urlMap: {\n" + line, 1)
    hints = [
        ("youtube", "youtube|upload"),
        ("maps", "google maps|maps\\.google"),
        ("pandora", "pandora"),
        ("housingmaps", "housingmaps"),
        ("reddit", "reddit"),
        ("techcrunch", "techcrunch"),
        ("earth", "google earth|keyhole"),
        ("clubpenguin", "club penguin"),
        ("kayak", "kayak"),
        ("milliondollar", "million dollar"),
    ]
    for slug, re_s in hints:
        line = f'      {{ re: /{re_s}/i, path: "sites/{slug}/index.html" }},\n'
        if line not in t:
            t = t.replace("    locationHints: [\n", "    locationHints: [\n" + line, 1)
    if '"youtube"' not in t.split("dirSiteKeys", 1)[-1][:400]:
        t = t.replace(
            'dirSiteKeys: [\n      "gmail"',
            'dirSiteKeys: [\n      "youtube", "maps", "reddit", "pandora", "gmail"',
            1,
        )
    cfg.write_text(t, encoding="utf-8")


def unlock() -> None:
    for rel in ("scripts/itt_gate.py", "scripts/check-all-years.py"):
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        t = t.replace(
            '_WIPED = {"2005", "2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"}',
            '_WIPED = {"2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"}',
        )
        p.write_text(t, encoding="utf-8")

    chk = ROOT / "scripts" / "check-all-years.py"
    t = chk.read_text(encoding="utf-8")
    if '"2005":' not in t.split("SIGNATURE", 1)[-1][:2500]:
        t = t.replace(
            '    "2004": ["pages/home.html", "sites/facebook/index.html", "sites/flickr/index.html", "sites/gmail/index.html"],\n',
            '    "2004": ["pages/home.html", "sites/facebook/index.html", "sites/flickr/index.html", "sites/gmail/index.html"],\n'
            '    "2005": ["pages/home.html", "pages/about.html", "sites/youtube/upload.html", "sites/maps/index.html", "sites/reddit/index.html", "sites/digg/index.html", "sites/playable/game.html"],\n',
            1,
        )
        chk.write_text(t, encoding="utf-8")

    mp = ROOT / "js" / "museum-progress.js"
    t = mp.read_text(encoding="utf-8")
    t = t.replace(
        'var WIPED = { "2005": 1, "2006": 1, "2007": 1, "2009": 1, "2011": 1, "2020": 1, "2022": 1, "2023": 1, "2024": 1, "2025": 1 };',
        'var WIPED = { "2006": 1, "2007": 1, "2009": 1, "2011": 1, "2020": 1, "2022": 1, "2023": 1, "2024": 1, "2025": 1 };',
    )
    mp.write_text(t, encoding="utf-8")

    idx = ROOT / "index.html"
    t = idx.read_text(encoding="utf-8")
    t = t.replace("22 years open", "23 years open")
    t = t.replace("1994–2019 + 2021 (22 years on disk; 2005–2007 / 2009 / 2011 / 2020 / 2022–2025 boarded",
                  "1994–2019 + 2021 (23 years on disk; 2006–2007 / 2009 / 2011 / 2020 / 2022–2025 boarded")
    t = t.replace("1994–2019 + 2021 · 2005–2007 / 2009 / 2011 / 2020 / 2022–2025 boarded",
                  "1994–2005 + 2008 + 2010 + 2012–2019 + 2021 · 2006–2007 / 2009 / 2011 / 2020 / 2022–2025 boarded")
    t = t.replace("22 years, 1994–2019 + 2021. 2005–2007 / 2009 / 2011 / 2020 / 2022–2025 are boarded.",
                  "23 years, 1994–2005 + 2008 + 2010 + 2012–2019 + 2021. 2006–2007 / 2009 / 2011 / 2020 / 2022–2025 are boarded.")
    t = t.replace(
        """      <div class="year-card locked y2005" data-year="2005">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2005</p>
            <span class="era-chip">wiped</span>
          </div>
          <p class="label">Off disk for a from-scratch rebuild. YouTube upload will come back as a new door.</p>
          <p class="scale">~64.8M sites · ~1.03B users (Live Stats, June)</p>
          <p class="meta">Wiped · rebuild later</p>
        </div>
      </div>""",
        """      <a class="year-card available y2005" href="years/2005/" data-year="2005">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2005</p>
            <span class="era-chip">Upload · Maps</span>
          </div>
          <p class="label">XP · IE6 · Upload · Maps — boom year, Yahoo still #1, YouTube still independent.</p>
          <p class="scale">64,780,617 sites · 1,027,580,990 users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>""",
        1,
    )
    idx.write_text(t, encoding="utf-8")

    hub = ROOT / "e2e" / "hub-years.spec.js"
    t = hub.read_text(encoding="utf-8")
    t = t.replace(
        "  '2004', '2008', '2010', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2021',",
        "  '2004', '2005', '2008', '2010', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2021',",
    )
    t = t.replace(
        "const LOCKED = ['2005', '2006', '2007', '2009', '2011', '2020', '2022', '2023', '2024', '2025'];",
        "const LOCKED = ['2006', '2007', '2009', '2011', '2020', '2022', '2023', '2024', '2025'];",
    )
    t = t.replace("/22 years open/i", "/23 years open/i")
    t = t.replace(
        "    await expect(page.locator('.y2005.available')).toHaveCount(0);\n    await expect(page.locator('.y2005.locked')).toBeVisible();",
        "    await expect(page.locator('.y2005.available')).toBeVisible();\n    await expect(page.locator('.y2006.locked')).toBeVisible();",
    )
    hub.write_text(t, encoding="utf-8")

    sm = ROOT / "sitemap.txt"
    t = sm.read_text(encoding="utf-8")
    if "/years/2005/" not in t:
        t = t.replace(
            "/years/2004/pages/about.html\n",
            "/years/2004/pages/about.html\n/years/2005/\n/years/2005/pages/home.html\n/years/2005/pages/about.html\n/years/2005/sites/youtube/upload.html\n",
            1,
        )
        sm.write_text(t, encoding="utf-8")

    pw = ROOT / "playwright.config.js"
    t = pw.read_text(encoding="utf-8")
    t = t.replace("/200[5-7][-.]/", "/200[67][-.]/")
    pw.write_text(t, encoding="utf-8")

    at = ROOT / "js" / "atlas-data.js"
    t = at.read_text(encoding="utf-8")
    t = t.replace(
        '"2004", "2008",',
        '"2004", "2005", "2008",',
    )
    t = t.replace(
        'gapYears: ["2005", "2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"]',
        'gapYears: ["2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"]',
    )
    t = t.replace(
        'years: ["2001", "2002", "2003", "2004"]',
        'years: ["2001", "2002", "2003", "2004", "2005"]',
    )
    t = t.replace(
        'blurb: "2005–2007 / 2009 / 2011 stay empty for rebuild.", years: ["2005", "2006", "2007", "2009", "2011"]',
        'blurb: "2006–2007 / 2009 / 2011 stay empty for rebuild.", years: ["2006", "2007", "2009", "2011"]',
    )
    t = t.replace(
        '      "2005": {\n        wiped: true,\n',
        '      "2005": {\n',
        1,
    )
    t = t.replace("2005–2007 / 2009 / 2011 / 2020 / 2022–2025 wiped", "2006–2007 / 2009 / 2011 / 2020 / 2022–2025 wiped")
    at.write_text(t, encoding="utf-8")

    atlas_spec = ROOT / "e2e" / "atlas.spec.js"
    t = atlas_spec.read_text(encoding="utf-8")
    t = t.replace(
        '  "2004", "2008",',
        '  "2004", "2005", "2008",',
    )
    t = t.replace(
        'const WIPED = ["2005", "2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"];',
        'const WIPED = ["2006", "2007", "2009", "2011", "2020", "2022", "2023", "2024", "2025"];',
    )
    t = t.replace("toHaveCount(22)", "toHaveCount(23)")
    t = t.replace("toHaveCount(10)", "toHaveCount(9)")
    atlas_spec.write_text(t, encoding="utf-8")


def clone_2x_matrix() -> None:
    from itt_leftover_dest import append_matrix_row, write_matrix

    matrix_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(matrix_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in rows}
    added = 0
    for r in list(rows):
        if r.get("year") != "2004":
            continue
        path = r["path"].replace("/years/2004/", "/years/2005/")
        key = r["key"].replace("itt04-", "itt05-")
        nxt = (r.get("next") or "").replace("/years/2004/", "/years/2005/")
        dest = ROOT / path.lstrip("/")
        if not dest.exists():
            continue
        added += append_matrix_row(
            rows,
            have,
            "2005",
            path,
            key,
            r.get("kind") or "query",
            str(r.get("title") or "2005 leftover").replace("2004", "2005"),
            nxt or "/years/2005/sites/youtube/upload.html",
            r.get("nextLabel") or "Next leftover",
        )
    extras = [
        ("/years/2005/sites/youtube/upload.html", "itt05-yt-lx", "YouTube leftover title"),
        ("/years/2005/sites/maps/index.html", "itt05-maps", "Maps leftover"),
        ("/years/2005/sites/pandora/index.html", "itt05-pandora", "Pandora leftover"),
        ("/years/2005/sites/housingmaps/index.html", "itt05-hm", "HousingMaps leftover"),
        ("/years/2005/sites/digg/index.html", "itt05-digg", "Digg leftover"),
        ("/years/2005/sites/reddit/index.html", "itt05-reddit", "Reddit leftover"),
        ("/years/2005/sites/flickr/index.html", "itt05-flickr", "Flickr leftover"),
        ("/years/2005/sites/itunes/podcasts.html", "itt05-pod", "iTunes podcast leftover"),
        ("/years/2005/sites/techcrunch/index.html", "itt05-tc", "TechCrunch leftover"),
        ("/years/2005/sites/playable/game.html", "itt05-game-hoverchop", "HoverChop leftover"),
        ("/years/2005/sites/ajax/index.html", "itt05-ajax-lx", "Ajax leftover"),
        ("/years/2005/sites/earth/index.html", "itt05-earth-lx", "Earth leftover"),
        ("/years/2005/sites/clubpenguin/index.html", "itt05-cp-lx", "Club Penguin leftover"),
        ("/years/2005/sites/kayak/index.html", "itt05-kayak-lx", "Kayak leftover"),
        ("/years/2005/sites/milliondollar/index.html", "itt05-mdh-lx", "Million Dollar leftover"),
        ("/years/2005/sites/utorrent/index.html", "itt05-utorrent", "µTorrent leftover"),
        ("/years/2005/sites/secondlife/index.html", "itt05-secondlife", "Second Life leftover"),
    ]
    for path, key, title in extras:
        added += append_matrix_row(
            rows,
            have,
            "2005",
            path,
            key,
            "query",
            title,
            "/years/2005/sites/youtube/upload.html",
            "★ Upload",
        )
    write_matrix(rows)
    n05 = sum(1 for r in rows if r.get("year") == "2005")
    print(f"2x matrix 2005 rows={n05} added_this_pass={added}")


def add_popular_3x() -> None:
    p = ROOT / "scripts" / "popular-3x-sites.json"
    spec = json.loads(p.read_text(encoding="utf-8"))
    if "2005" not in spec:
        spec["2005"] = [
            {
                "id": "milliondollar",
                "name": "Million Dollar Homepage",
                "title": "Million Dollar Homepage — 26 Aug 2005",
                "why": "Alex Tew pixel leftover. Not the chip.",
                "verb": "Name a pixel leftover.",
                "ph": "pixel leftover",
                "btn": "Save leftover",
                "bg": "#111",
                "fg": "#fff",
            },
            {
                "id": "clubpenguin",
                "name": "Club Penguin",
                "title": "Club Penguin — 24 Oct 2005",
                "why": "Public noon PT. Disney is 2007.",
                "verb": "Name a waddle leftover.",
                "ph": "waddle leftover",
                "btn": "Waddle leftover",
                "bg": "#039",
                "fg": "#fff",
            },
            {
                "id": "kayak",
                "name": "Kayak",
                "title": "Kayak — 7 Feb 2005",
                "why": "Travel leftover. Not Google Flights.",
                "verb": "Name a flight leftover.",
                "ph": "SFO leftover",
                "btn": "Search leftover",
                "bg": "#ff6600",
                "fg": "#fff",
            },
        ]
        # keep year order roughly
        p.write_text(json.dumps(spec, indent=2) + "\n", encoding="utf-8")


def add_one_thing() -> None:
    p = ROOT / "e2e" / "one-thing-per-year.spec.js"
    t = p.read_text(encoding="utf-8")
    if 'year: "2005"' not in t:
        block = """  {
    year: "2005",
    path: "/years/2005/sites/youtube/upload.html",
    key: "itt05-yt-uploads",
    incomplete: async (page) => {
      await page.locator("form[data-yt-upload] button[type='submit']").click();
    },
    complete: async (page) => {
      await page.fill("[name='title']", "Me at the zoo residual");
      await page.fill("[name='desc']", "first clip");
      const reqs = page.locator("[data-yt-req]");
      const n = await reqs.count();
      for (let i = 0; i < n; i++) await reqs.nth(i).check();
      await page.locator("form[data-yt-upload] button[type='submit']").click();
    },
  },
"""
        t = t.replace(
            '    year: "2008",',
            block + '    year: "2008",',
            1,
        )
        p.write_text(t, encoding="utf-8")


def write_e2e() -> None:
    write(
        ROOT / "e2e" / "2005-mvp.spec.js",
        """const { test, expect } = require('@playwright/test');

test.describe('2005 MVP', () => {
  test('hub opens 2005', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('a.year-card[data-year="2005"]');
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(/years\\/2005/);
  });

  test('shell boots year 2005', async ({ page }) => {
    await page.goto('/years/2005/');
    await expect(page.locator('body')).toHaveAttribute('data-itt-year', '2005');
  });

  test('home lists guided 6 and leftover strips', async ({ page }) => {
    await page.goto('/years/2005/pages/home.html');
    await expect(page.locator('#ott-guided-2005 ol li')).toHaveCount(6);
    await expect(page.locator('body')).toContainText('Upload');
    await expect(page.locator('nav[data-itt-pop3x="2005"] a')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-more="2005"] a')).toHaveCount(9);
    await expect(page.locator('[data-itt-pop-3x3="2005"] a')).toHaveCount(9);
  });

  test('2006 stays boarded', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a.year-card[href*="years/2006"]')).toHaveCount(0);
    await expect(page.locator('.year-card.locked.y2006')).toBeVisible();
  });
});
""",
    )
    write(
        ROOT / "e2e" / "2005-official-10.spec.js",
        """// @ts-check
const { test, expect } = require("@playwright/test");

async function getKey(page, key) {
  return page.evaluate((k) => localStorage.getItem(k), key);
}

async function openClear(page, path, key) {
  await page.goto(path);
  await page.evaluate((k) => localStorage.removeItem(k), key);
  await page.evaluate(() => localStorage.removeItem("itt05-yt-uploads"));
  await page.reload();
  await page.waitForTimeout(250);
}

test.describe("2005 official · gold + leftover", () => {
  test("Upload empty / dating / Google-owned never write · ticks + title writes", async ({ page }) => {
    await openClear(page, "/years/2005/sites/youtube/upload.html", "itt05-yt-uploads");
    await page.locator("form[data-yt-upload] button[type='submit']").click();
    const empty = JSON.parse((await getKey(page, "itt05-yt-uploads")) || "[]");
    expect(Array.isArray(empty) ? empty.some((x) => x && /residual/i.test(x.title || "")) : false).toBeFalsy();
    await page.locator("[data-yt-trap]").click();
    const afterTrap = JSON.parse((await getKey(page, "itt05-yt-uploads")) || "[]");
    expect(Array.isArray(afterTrap) ? afterTrap.some((x) => x && /residual/i.test(x.title || "")) : false).toBeFalsy();
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

  test("Maps leftover · Street View trap never writes · complete writes itt05-maps", async ({ page }) => {
    await openClear(page, "/years/2005/sites/maps/index.html", "itt05-maps");
    const lo = page.locator("[data-lo-panel]").first();
    await lo.locator("[data-lo-trap]").click();
    expect(await getKey(page, "itt05-maps")).toBeFalsy();
    await lo.locator("[data-lo-save]").click();
    expect(await getKey(page, "itt05-maps")).toBeFalsy();
    await lo.locator("[data-lo-req]").nth(0).check();
    await lo.locator("[data-lo-req]").nth(1).check();
    await lo.locator("[data-lo-field]").fill("hotels near LAX");
    await lo.locator("[data-lo-save]").click();
    await expect.poll(() => getKey(page, "itt05-maps"), { timeout: 8000 }).toBeTruthy();
    expect(await getKey(page, "itt05-yt-uploads")).toBeFalsy();
  });

  test("guided stays 6", async ({ page }) => {
    await page.goto("/years/2005/pages/home.html");
    await expect(page.locator("#ott-guided-2005 ol li")).toHaveCount(6);
  });
});
""",
    )


def update_docs() -> None:
    for rel, pairs in [
        (
            "docs/DISK-TRUTH.md",
            [
                ("Hub **22 years open** · **1994–2019 + 2021** · **2005–2007 / 2009 / 2011 / 2020 / 2022–2025 wiped**. 2021 is ATT Ask.",
                 "Hub **23 years open** · **1994–2005 + 2008 + 2010 + 2012–2019 + 2021** · **2006–2007 / 2009 / 2011 / 2020 / 2022–2025 wiped**. 2005 is YouTube upload."),
                ("| **2005** | **Wiped** · hub locked · no year tree · rebuild later · `assets/period/2005` stays |",
                 "| **2005** | **Live** · YouTube upload gold · Maps / Reddit / Digg leftover · XP+IE6 |"),
                ("Wiped: **2005–2007 / 2009 / 2011 / 2020 / 2022–2025**.",
                 "Wiped: **2006–2007 / 2009 / 2011 / 2020 / 2022–2025**."),
            ],
        ),
        (
            "README.md",
            [
                ("Hub **22 years open** (1994–2019 + 2021). **2005–2007 / 2009 / 2011 / 2020 / 2022–2025** are wiped.",
                 "Hub **23 years open** (1994–2005 + 2008 + 2010 + 2012–2019 + 2021). **2006–2007 / 2009 / 2011 / 2020 / 2022–2025** are wiped."),
            ],
        ),
        (
            "docs/2005-READ-FIRST.md",
            [
                ("**Status:** **research freeze**", "**Status:** **implemented 2026-08-31**"),
                ("**do not implement**", "implemented from 2004 scaffold — not a checkout of the wiped forest"),
            ],
        ),
    ]:
        p = ROOT / rel
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8")
        for a, b in pairs:
            t = t.replace(a, b)
        p.write_text(t, encoding="utf-8")


def counts() -> None:
    dests = [p for p in (Y / "sites").iterdir() if p.is_dir()]
    html = list(Y.rglob("*.html"))
    print(f"2005 dest folders={len(dests)} html={len(html)}")


def main() -> None:
    print("==> scaffold 2004 → 2005")
    copy_scaffold()
    print("==> retarget")
    retarget_tree()
    print("==> clone 2008 dests")
    clone_2008()
    print("==> youtube.js ticks/traps")
    patch_youtube_js()
    print("==> gold + official")
    write_gold_youtube()
    write_maps()
    write_official_rest()
    write_hoverchop()
    print("==> year-true dests")
    write_year_true()
    print("==> about + leftover strips")
    write_about_and_home()
    print("==> start / trails / years.js")
    wire_start_and_trails()
    print("==> unlock 2005")
    unlock()
    print("==> 2× matrix")
    clone_2x_matrix()
    add_popular_3x()
    add_one_thing()
    print("==> e2e")
    write_e2e()
    print("==> docs")
    update_docs()
    counts()
    print("2005 implement script done")


if __name__ == "__main__":
    main()
