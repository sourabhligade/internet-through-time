#!/usr/bin/env python3
"""Implement judge-sheet leftover dests (B1 / B2 / B3).

Year-true hops + visible trap. Empty / trap never writes.
Does not touch guided 6 or stars. Skips dest files that already exist.
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

# year, slug, suffix, title, body, hop_a, hop_b, go_label, trap, next_rel, next_label
DESTS = [
    # --- 2023 B1 ---
    (
        "2023", "myai", "myai-lx",
        "Snapchat My AI leftover — Feb 2023",
        "Snapchat My AI launches <b>27 Feb 2023</b>. Leftover bot. Not Plus gold. No live Snap model.",
        "Ack leftover My AI", "Type leftover note", "Ack leftover",
        "This is Plus / live Snap model (trap)",
        "../plus/index.html", "★ Plus",
    ),
    (
        "2023", "firefly", "fly-lx",
        "Adobe Firefly leftover — Mar 2023",
        "Adobe Firefly public beta <b>Mar 2023</b>. Leftover generate literacy. Not DALL·E 3. No live generate.",
        "Note leftover Firefly", "Ack leftover beta", "Ack leftover",
        "Live generate / this is DALL·E 3 (trap)",
        "../dalle3/index.html", "DALL·E 3 leftover",
    ),
    (
        "2023", "m365copilot", "m365-lx",
        "Microsoft 365 Copilot leftover — 16 Mar 2023",
        "Microsoft 365 Copilot announce <b>16 Mar 2023</b>. Leftover. Not Windows Copilot. Not GitHub Copilot. Not 2024 gold.",
        "Tick leftover announce", "Ack leftover M365", "Ack leftover",
        "This is Copilot X / 2024 gold / GitHub Copilot (trap)",
        "../wincopilot/index.html", "Windows Copilot leftover",
    ),
    (
        "2023", "copilotx", "cx-lx",
        "GitHub Copilot X leftover — Mar 2023",
        "GitHub Copilot X announce <b>Mar 2023</b> (chat / voice / PRs as leftover). Not Windows Copilot. Not M365. Not Plus gold.",
        "Ack leftover Copilot X", "Note leftover chat", "Ack leftover",
        "This is Windows Copilot / M365 / Plus (trap)",
        "../wincopilot/index.html", "Windows Copilot leftover",
    ),
    (
        "2023", "sge", "sge-lx",
        "Google SGE leftover — May 2023",
        "Google Search Generative Experience <b>May 2023</b>. Leftover Search experiment. Not the Gemini app. Not Bard.",
        "Note leftover SGE", "Ack leftover Search", "Ack leftover",
        "This is the Gemini app / Bard (trap)",
        "../bard/index.html", "Bard leftover",
    ),
    (
        "2023", "gen2", "gen2-lx",
        "Runway Gen-2 leftover — 2023",
        "Runway Gen-2 public leftover <b>2023</b>. Not the 2022 dest. Not 2024 Sora. No live video.",
        "Note leftover Gen-2", "Ack leftover 2023", "Ack leftover",
        "Live video / this is Sora / this is 2022 (trap)",
        "../plus/index.html", "★ Plus",
    ),
    (
        "2023", "spotifyaidj", "aidj-lx",
        "Spotify AI DJ leftover — Feb 2023",
        "Spotify AI DJ <b>Feb 2023</b>. Leftover. Not Plus gold. No live audio.",
        "Note leftover AI DJ", "Ack leftover Feb", "Ack leftover",
        "Live audio / this is Plus (trap)",
        "../plus/index.html", "★ Plus",
    ),
    (
        "2023", "duolingomax", "duo-lx",
        "Duolingo Max leftover — Mar 2023",
        "Duolingo Max <b>Mar 2023</b> (GPT-4 inside as leftover). Not Plus gold. No live Max subscribe.",
        "Tick leftover Max", "Ack leftover Duolingo", "Ack leftover",
        "Live subscribe / this is Plus (trap)",
        "../plus/index.html", "★ Plus",
    ),
    (
        "2023", "poe", "poe-lx",
        "Quora Poe leftover — 2023",
        "Quora Poe multi-bot leftover <b>2023</b>. Not Plus. Not Perplexity. No live model.",
        "Note leftover Poe", "Ack leftover bots", "Ack leftover",
        "Live model / this is Plus / Perplexity (trap)",
        "../perplexity/index.html", "Perplexity leftover",
    ),
    (
        "2023", "huggingfacechat", "hf-lx",
        "HuggingChat leftover — 2023",
        "HuggingChat leftover <b>2023</b>. Not the Llama 2 dest. No live weights.",
        "Note leftover HuggingChat", "Ack leftover chat", "Ack leftover",
        "Live weights / this is Llama 2 (trap)",
        "../llama2/index.html", "Llama 2 leftover",
    ),
    (
        "2023", "pika", "pika-lx",
        "Pika Labs leftover — 2023",
        "Pika Labs leftover <b>2023</b>. Not 2024 Sora. No live video.",
        "Note leftover Pika", "Ack leftover 2023", "Ack leftover",
        "Live video / this is Sora (trap)",
        "../plus/index.html", "★ Plus",
    ),
    (
        "2023", "pi", "pi-lx",
        "Inflection Pi leftover — 2023",
        "Inflection Pi leftover. Not Plus gold. Not Character.AI. No live Pi.",
        "Note leftover Pi", "Ack leftover chat", "Ack leftover",
        "Live Pi / this is Plus / Character.AI (trap)",
        "../character/index.html", "Character leftover",
    ),
    (
        "2023", "neevashut", "neeva-lx",
        "Neeva shut leftover — May 2023",
        "Neeva shuts <b>May 2023</b>. Leftover epitaph. Not still live in 2024. Not Plus gold.",
        "Tick leftover shut", "Ack leftover Neeva", "Ack leftover",
        "Neeva is still live / this is Plus (trap)",
        "../plus/index.html", "★ Plus",
    ),
    (
        "2023", "writersstrike", "wga-lx",
        "Writers’ strike leftover — 2023",
        "2023 WGA / writers’ strike leftover literacy. Not the year gold. Not a product dest.",
        "Tick leftover WGA", "Ack leftover strike", "Ack leftover",
        "This is the year gold (trap)",
        "../plus/index.html", "★ Plus",
    ),
    # --- 2012 B2 ---
    (
        "2012", "drawsomething", "draw-lx",
        "Draw Something leftover — 2012",
        "OMGPOP Draw Something leftover (Zynga bought 2012). Not Instagram Android gold. No live draw.",
        "Draw leftover hop", "Guess leftover hop", "Draw leftover",
        "This is IG Android gold (trap)",
        "../instagram/android.html", "★ IG Android",
    ),
    (
        "2012", "surface", "surface-lx",
        "Surface leftover — 2012 announce",
        "Surface RT announce leftover. Not January OS. Not the year chrome.",
        "Note leftover announce", "Ack leftover Surface", "Ack leftover",
        "Surface is January OS (trap)",
        "../instagram/android.html", "★ IG Android",
    ),
    (
        "2012", "nexus", "nexus-lx",
        "Nexus leftover — 2012",
        "Nexus leftover phone. Not the iPhone dest. Not IG Android gold.",
        "Note leftover Nexus", "Ack leftover phone", "Ack leftover",
        "This is the iPhone dest (trap)",
        "../iphone/maps.html", "iPhone Maps flop",
    ),
    (
        "2012", "yahoo-marissa", "marissa-lx",
        "Yahoo / Mayer leftover — Jul 2012",
        "Marissa Mayer named Yahoo CEO <b>Jul 2012</b>. Leftover literacy. Not 1994 Yahoo gold. Not the year chip.",
        "Note leftover CEO", "Ack leftover 2012", "Ack leftover",
        "Yahoo is the year gold / 1994 steal (trap)",
        "../instagram/android.html", "★ IG Android",
    ),
    (
        "2012", "windows-phone", "wp-lx",
        "Windows Phone leftover — 2012",
        "Windows Phone leftover OS. Not January chrome. Not the year chip.",
        "Note leftover WP", "Ack leftover OS", "Ack leftover",
        "WinPhone is January chrome (trap)",
        "../instagram/android.html", "★ IG Android",
    ),
    # --- B3 ---
    (
        "2015", "peach", "peach-lx",
        "Peach leftover — 2015",
        "Peach app leftover 2015. Not Periscope gold. Not the year chip.",
        "Note leftover Peach", "Ack leftover app", "Ack leftover",
        "This is Periscope (trap)",
        "../periscope/index.html", "★ Periscope",
    ),
    (
        "2016", "allo", "allo-lx",
        "Google Allo leftover — 2016",
        "Google Allo leftover messenger 2016. Not Instagram Stories. Not Assistant gold.",
        "Note leftover Allo", "Ack leftover chat", "Ack leftover",
        "Allo is Stories / Assistant / year gold (trap)",
        "../instagram/stories.html", "★ Stories",
    ),
    (
        "2016", "note7", "note7-lx",
        "Galaxy Note 7 leftover — 2016",
        "Galaxy Note 7 recall leftover 2016. Literacy only. No live recall store. Not Stories gold.",
        "Note leftover recall", "Ack leftover Note 7", "Ack leftover",
        "Live recall store / this is Stories (trap)",
        "../instagram/stories.html", "★ Stories",
    ),
    (
        "2019", "quest", "quest-lx",
        "Oculus Quest leftover — May 2019",
        "Oculus Quest standalone leftover <b>May 2019</b>. Not 2018 Go. Not 2020 Quest 2 gold. Not Disney+.",
        "Note leftover Quest", "Ack leftover headset", "Ack leftover",
        "This is 2014 Oculus / 2020 gold / Disney+ (trap)",
        "../disneyplus/home.html", "★ Disney+",
    ),
    (
        "2020", "shop", "shop-lx",
        "Shop leftover — 2020",
        "Shopify Shop app leftover 2020. Not Zoom gold. Not a case dashboard.",
        "Note leftover Shop", "Ack leftover 2020", "Ack leftover",
        "This is Zoom / case dashboard (trap)",
        "../zoom/meeting.html", "★ Zoom",
    ),
    (
        "2011", "kickstarter", "kick-lx",
        "Kickstarter leftover — 2011",
        "Kickstarter 2011 leftover folder. Not the 2009 dest. Not Google+ gold.",
        "Note leftover project", "Ack leftover 2011", "Ack leftover",
        "This is the 2009 dest / G+ (trap)",
        "../googleplus/index.html", "★ Google+",
    ),
]

STAR = {
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2019": "sites/disneyplus/home.html",
    "2020": "sites/zoom/meeting.html",
    "2023": "sites/plus/index.html",
}

PREFIX = {
    "2011": "11",
    "2012": "12",
    "2015": "15",
    "2016": "16",
    "2019": "19",
    "2020": "20",
    "2023": "23",
}


def dest_html(d: tuple) -> str:
    year, slug, suf, title, body, hop_a, hop_b, go, trap, nxt, nxt_label = d
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
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
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
<p><button type="button" data-4x-go="{suf}">{go}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_label}</a></p>
</section>
<!-- ITT-4X:{suf}:end -->
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:{d2}:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · {slug} d2</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Second leftover note<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="second leftover"></label></p>
<p><button type="button" data-4x-go="{d2}">Save second leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="{key2}"><b>Next:</b> <a href="{nxt}">{nxt_label}</a></p>
</section>
<!-- ITT-4X:{d2}:end -->
</body>
</html>
"""


def strip_2009_plaques() -> int:
    n = 0
    loop_re = re.compile(
        r'\s*<div class="itt-5x-loop"[^>]*data-5x-loop[\s\S]*?</div>\s*',
        re.I,
    )
    for slug in ("farmville", "bing", "iphone", "foursquare", "windows7"):
        p = ROOT / f"years/2009/sites/{slug}/index.html"
        t = p.read_text(encoding="utf-8")
        nt, c = loop_re.subn("\n", t, count=1)
        if c:
            p.write_text(nt, encoding="utf-8")
            n += 1
    return n


def next_abs(year: str, nxt: str) -> str:
    # nxt is relative from dest folder, e.g. ../plus/index.html
    dest_dir = Path(f"/years/{year}/sites/_/")
    resolved = (dest_dir / nxt).resolve()
    return str(resolved)


def main() -> None:
    stripped = strip_2009_plaques()
    matrix_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(matrix_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in rows}
    written = 0
    skipped = 0
    added_rows = 0
    by_year: dict[str, list[tuple[str, str]]] = {}
    rooms_by: dict[str, list[str]] = {}
    hints_by: dict[str, list[tuple[str, str]]] = {}
    map_by: dict[str, list[str]] = {}

    for d in DESTS:
        year, slug, suf, title, body, hop_a, hop_b, go, trap, nxt, nxt_label = d
        dest = ROOT / f"years/{year}/sites/{slug}/index.html"
        html = dest_html(d)
        if write_if_missing(dest, html):
            written += 1
        else:
            skipped += 1
        yy = PREFIX[year]
        key = f"itt{yy}-{suf}"
        key2 = f"itt{yy}-{suf}-d2"
        path = f"/years/{year}/sites/{slug}/index.html"
        nxt_path = next_abs(year, nxt)
        added_rows += append_matrix_row(rows, have, year, path, key, "hops", title, nxt_path, nxt_label)
        added_rows += append_matrix_row(
            rows, have, year, path, key2, "query", f"{year} leftover · {slug} d2", nxt_path, nxt_label
        )
        by_year.setdefault(year, []).append((slug, suf))
        rooms_by.setdefault(year, []).append(f"sites/{slug}/index.html")
        hints_by.setdefault(year, []).append((slug, slug.replace("-", r"\-")))
        map_by.setdefault(year, []).append(
            f'<li><a href="../sites/{slug}/index.html">{title}</a> — leftover, not the chip</li>'
        )

    matrix_path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")

    for year, slugs in by_year.items():
        prepend_rooms(year, rooms_by[year])
        add_location_hints(year, hints_by[year])
        add_home_strip(year, PREFIX[year], slugs, STAR[year])
        add_map_block(year, map_by[year])

    print(f"dests written={written} skipped={skipped} matrix+={added_rows} 2009-plaques-stripped={stripped}")


if __name__ == "__main__":
    main()
