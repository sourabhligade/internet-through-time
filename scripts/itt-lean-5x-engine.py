#!/usr/bin/env python3
"""
Lean 5× engine for 2010–2013.

Ships: 4 pack games + 50 trails + atlas of on-disk rooms + leftover F-loop
panels + home chips. Merges into flow-trails-5x.js / flow-maps-5x-atlas.js
so 1994–2009 extras stay put.

Does not: invent dest HTML, re-inject retired tap toys, restar SoundCloud /
pipehop / WhatsApp / Imgur / Airbnb as the year star.
"""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ["2010", "2011", "2012", "2013"]

STAR = {
    "2010": ("sites/instagram/index.html", "Instagram iOS", "itt10-ig-posts"),
    "2011": ("sites/googleplus/index.html", "Google+ Circles", "itt11-gplus-circles"),
    "2012": ("sites/instagram/android.html", "Instagram Android", "itt12-ig-android"),
    "2013": ("sites/vine/record.html", "Vine 6s", "itt13-vine-posts"),
}

# Leftover 5× F1–F5 (save rooms) + next. Home chips = these five + locked star.
LEFTOVER = {
    "2010": [
        ("ask", "F1 Ask leftover", "Query persist", "Instagram is the star", "sites/ask/index.html", "sites/facebook/index.html", "Open Graph"),
        ("facebook", "F2 Open Graph", "Like on the rest of the web", "Not Timeline / G+", "sites/facebook/index.html", "sites/youtube/index.html", "YouTube"),
        ("youtube", "F3 YouTube", "2B streams/day class", "Flash residual", "sites/youtube/index.html", "sites/twitter/index.html", "Twitter"),
        ("tweets", "F4 Twitter 140", "Still 140", "Not X", "sites/twitter/index.html", "sites/foursquare/index.html", "Foursquare"),
        ("4sq", "F5 Foursquare", "Check-in leftover", "Next is IG star", "sites/foursquare/index.html", "sites/instagram/index.html", "Instagram"),
    ],
    "2011": [
        ("tweets", "F1 Twitter 140", "Still 140", "Not X", "sites/twitter/index.html", "sites/groupon/index.html", "Groupon"),
        ("groupon", "F2 Groupon", "One deal a day", "No merchant charge", "sites/groupon/index.html", "sites/tumblr/index.html", "Tumblr"),
        ("tumblr", "F3 Tumblr", "Dashboard leftover", "Not TikTok", "sites/tumblr/index.html", "pages/about.html", "About 2011"),
        ("wiki", "F4 About wiki", "Dual-cite scale", "Bans read", "pages/about.html", "sites/facebook/timeline.html", "Timeline"),
        ("timeline", "F5 Timeline", "2011 leftover", "Next is G+ star", "sites/facebook/timeline.html", "sites/googleplus/index.html", "Google+"),
    ],
    "2012": [
        ("tweets", "F1 Twitter 140", "Still 140", "IPO-day chatter", "sites/twitter/index.html", "sites/facebook/ipo.html", "Facebook IPO"),
        ("fb-ipo", "F2 Facebook IPO", "$38 · Nasdaq delay", "Not Reactions", "sites/facebook/ipo.html", "sites/facebook/index.html", "Facebook 1B"),
        ("facebook", "F3 Facebook 1B", "1B MAU 4 Oct", "Still Like", "sites/facebook/index.html", "sites/wikipedia/index.html", "SOPA"),
        ("wiki", "F4 SOPA black", "18 Jan 24h", "SOPA and PIPA", "sites/wikipedia/index.html", "sites/pinterest/index.html", "Pinterest"),
        ("pin", "F5 Pinterest", "Public board leftover", "Next is IG Android", "sites/pinterest/index.html", "sites/instagram/android.html", "Instagram Android"),
    ],
    "2013": [
        ("tinder", "F1 Tinder trail", "Swipe literacy", "Best New Startup class", "sites/tinder/index.html", "sites/snapchat/index.html", "Snap 24h"),
        ("snap-story", "F2 Snap 24h", "Oct 2013 Stories", "Not IG Stories 2016", "sites/snapchat/index.html", "sites/instagram/video.html", "IG Video"),
        ("igvid", "F3 IG Video 15s", "15s + not Reels", "20 Jun 2013", "sites/instagram/video.html", "sites/iphone/ios7.html", "iOS 7"),
        ("ios7", "F4 iOS 7 / Touch ID", "Flat overnight", "Not Material", "sites/iphone/ios7.html", "sites/snowden/index.html", "Snowden"),
        ("snowden", "F5 Snowden Jun 2013", "Two papers same week", "Next is Vine star", "sites/snowden/index.html", "sites/vine/record.html", "Vine 6s"),
    ],
}

NEED_BY_GID = {
    "igfilter": 2,
    "ipadrot": 2,
    "oglike": 2,
    "imgurup": 2,
    "siriline": 2,
    "spotinv": 2,
    "tlon": 2,
    "airreq": 2,
    "pinboard": 2,
    "draw2": 2,
    "sopa": 2,
    "mapsflop": 2,
    "vin6": 6,
    "swipe10": 10,
    "snap10": 2,
    "ios7flat": 2,
}

PHRASE_BY_GID = {
    "igfilter": "filter",
    "imgurup": "title",
    "siriline": "siri",
    "airreq": "stay",
    "pinboard": "board",
    "draw2": "guess",
}


def load_b5x():
    spec = importlib.util.spec_from_file_location(
        "b5x", ROOT / "scripts" / "build-5x-measurable.py"
    )
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader
    spec.loader.exec_module(mod)
    for year, triple in STAR.items():
        mod.STAR[year] = triple
    return mod


def load_extra_js(path: Path) -> dict:
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    marker = "var extra = "
    i = text.find(marker)
    if i < 0:
        return {}
    blob = text[i + len(marker) :]
    return json.JSONDecoder().raw_decode(blob)[0]


def write_trails_merged(extra: dict) -> None:
    js = (
        "/**\n"
        " * Extra trail stops — 5× measurable (n=11–50). Keep n=1–10 locked.\n"
        " * Generated by scripts/build-5x-measurable.py / itt-lean-5x-engine.py\n"
        " */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        "  var extra = "
        + json.dumps(extra, indent=2, ensure_ascii=False)
        + ";\n"
        "  Object.keys(extra).forEach(function (y) {\n"
        "    var arr = (ITT.flowTrails && ITT.flowTrails[y]) || null;\n"
        "    if (!arr) return;\n"
        "    var have = {};\n"
        "    var i;\n"
        "    for (i = 0; i < arr.length; i++) have[arr[i].n] = true;\n"
        "    extra[y].forEach(function (row) {\n"
        "      if (!have[row.n]) arr.push(row);\n"
        "    });\n"
        "  });\n"
        "  ITT._flowTrails5x = true;\n"
        "})(typeof window !== \"undefined\" ? window : this);\n"
    )
    (ROOT / "js" / "config" / "flow-trails-5x.js").write_text(js, encoding="utf-8")


def write_atlas_merged(extra: dict) -> None:
    js = (
        "/**\n"
        " * Extra flow-map leaves — 5× measurable atlas.\n"
        " * Existing rooms + playable dests. Do not invent pages.\n"
        " * Generated by scripts/build-5x-measurable.py / itt-lean-5x-engine.py\n"
        " */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        "  var extra = "
        + json.dumps(extra, indent=2, ensure_ascii=False)
        + ";\n"
        "  Object.keys(extra).forEach(function (y) {\n"
        "    var m = ITT.flowMaps && ITT.flowMaps[y];\n"
        "    if (!m || !extra[y] || !extra[y].length) return;\n"
        "    m.branches = m.branches || [];\n"
        "    var i;\n"
        "    for (i = m.branches.length - 1; i >= 0; i--) {\n"
        '      if (m.branches[i] && m.branches[i].label === "5× atlas") m.branches.splice(i, 1);\n'
        "    }\n"
        "    m.branches.push({\n"
        '      label: "5× atlas",\n'
        '      do: "Existing rooms + playable dests — no new forest",\n'
        "      sites: extra[y]\n"
        "    });\n"
        "  });\n"
        "})(typeof window !== \"undefined\" ? window : this);\n"
    )
    (ROOT / "js" / "config" / "flow-maps-5x-atlas.js").write_text(js, encoding="utf-8")


def pretty(href: str) -> str:
    h = href.split("?")[0].rstrip("/")
    if h.endswith("/index.html"):
        h = h[: -len("/index.html")]
    elif h.endswith(".html"):
        h = h[: -len(".html")]
    part = h.split("/")[-1] or h
    part = part.replace("-", " ").replace("_", " ")
    return (part[:1].upper() + part[1:]) if part else href


def page_href(rel: str) -> str:
    if rel.startswith("sites/"):
        return "../" + rel
    if rel.startswith("pages/"):
        return rel[len("pages/") :]
    return rel


def site_href(from_sites: str, dest: str) -> str:
    """Relative href from a sites/* page (or pages/about) to dest."""
    if dest.startswith("pages/"):
        if from_sites.startswith("pages/"):
            return dest[len("pages/") :]
        return "../../" + dest
    if dest.startswith("sites/"):
        if from_sites.startswith("pages/"):
            return "../" + dest
        src_dir = "/".join(from_sites.split("/")[:2])  # sites/foo
        dst_dir = "/".join(dest.split("/")[:2])
        if src_dir == dst_dir:
            return dest.split("/")[-1]
        return "../" + dest[len("sites/") :]
    return dest


def insert_before_body_end(html: str, snippet: str) -> str:
    if snippet.strip()[:40] in html:
        return html
    idx = html.rfind("</body>")
    if idx < 0:
        return html + "\n" + snippet
    return html[:idx] + snippet + html[idx:]


def add_5x_panel(year: str, suffix: str, title: str, a: str, b: str, room: str, nxt: str, nxt_label: str) -> None:
    path = ROOT / "years" / year / room
    if not path.is_file():
        print("missing room", year, room)
        return
    html = path.read_text(encoding="utf-8")
    if f'data-5x-suffix="{suffix}"' in html:
        return
    yy = year[2:]
    key = f"itt{yy}-{suffix}"
    href = site_href(room, nxt)
    panel = (
        f'\n<div class="itt-5x-loop" data-5x-loop data-5x-year="{year}" data-5x-suffix="{suffix}" '
        f'id="ott-5x-f-{suffix}" style="margin:12px 0;padding:10px;border:2px solid #f9a825;'
        f'background:#fff8e1;font-family:Arial,sans-serif;font-size:13px;max-width:46em;color:#111">\n'
        f'<p style="margin:0 0 6px"><b>5× {title}</b> · incomplete never writes · key <code>{key}</code></p>\n'
        f'<label style="display:block;margin:4px 0"><input type="checkbox" data-5x-req="a"> {a}</label>\n'
        f'<label style="display:block;margin:4px 0"><input type="checkbox" data-5x-req="b"> {b}</label>\n'
        f'<p style="margin:8px 0 0"><button type="button" data-5x-save>Save 5× REAL</button> '
        f'<span data-5x-status></span></p>\n'
        f'<p data-5x-next hidden data-next-flow data-itt{yy}-next data-next-when-key="{key}" '
        f'style="margin:8px 0 0">Next: <a href="{href}">{nxt_label}</a></p>\n'
        f"</div>\n"
    )
    path.write_text(insert_before_body_end(html, panel), encoding="utf-8")


def add_popular_panel(year: str, suffix: str, title: str, a: str, b: str, room: str, nxt: str, nxt_label: str, field: str | None = None) -> None:
    path = ROOT / "years" / year / room
    if not path.is_file():
        print("missing popular room", year, room)
        return
    html = path.read_text(encoding="utf-8")
    if f'data-storage-key="{suffix}"' in html and "data-itt-popular-save" in html:
        return
    if f'data-itt-real-save' in html and f'data-storage-key="{suffix}"' in html and not field:
        # real-save already satisfies popular-flows-all-years
        if "data-next-flow" not in html and nxt:
            href = site_href(room, nxt)
            extra = (
                f'<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> '
                f'<a href="{href}">{nxt_label}</a></p>\n'
            )
            path.write_text(insert_before_body_end(html, extra), encoding="utf-8")
        return
    href = site_href(room, nxt) if nxt else ""
    field_html = ""
    field_attrs = ""
    if field:
        field_html = (
            f'<p><label>{field}<br>'
            f'<input id="pop-field" data-popular-field name="{field}" size="28" autocomplete="off"></label></p>\n'
        )
        field_attrs = ' data-require-field="#pop-field" data-require-field-min="2"'
    next_html = (
        f'<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="{href}">{nxt_label}</a></p>\n'
        if nxt
        else ""
    )
    panel = (
        f'\n<section class="itt-popular-panel" data-itt-popular="{suffix}" '
        f'style="margin:12px 0;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;'
        f'font-size:13px;max-width:46em;background:#fff;color:#111">\n'
        f"<b>{title}</b>\n"
        f'<p style="margin:6px 0;color:#444">Popular session · known destination · incomplete never writes</p>\n'
        f"{field_html}"
        f'<label style="display:block;margin:6px 0"><input type="checkbox" data-popular-req> {a}</label>\n'
        f'<label style="display:block;margin:6px 0"><input type="checkbox" data-popular-req> {b}</label>\n'
        f'<p><button type="button" data-itt-popular-save data-storage-key="{suffix}" '
        f'data-min-req="2" data-requires="[data-popular-req]"{field_attrs}>Save popular session</button></p>\n'
        f'<p data-itt-real-status class="itt-popular-status" style="min-height:1.2em"></p>\n'
        f"{next_html}"
        f"</section>\n"
    )
    path.write_text(insert_before_body_end(html, panel), encoding="utf-8")


def patch_home(year: str, rooms: list[str]) -> None:
    path = ROOT / "years" / year / "pages" / "home.html"
    html = path.read_text(encoding="utf-8")
    star_href, star_label, _ = STAR[year]
    chips = []
    for suffix, title, _a, _b, room, _n, _nl in LEFTOVER[year]:
        chips.append(f'<a href="{page_href(room)}">{title}</a>')
    chips.append(f'<a href="{page_href(star_href)}">★ {star_label}</a>')
    chip_html = " → ".join(chips)
    trails = (
        f'<p class="itt-5x-trails" id="ott-5x-{year}" style="padding:10px;background:#fff8e1;'
        f'border:1px solid #f9a825">\n'
        f" <b>Connection trails · Guided multi-step · 5× leftover F1–F5</b> (star stays {star_label}):\n {chip_html}\n</p>"
    )
    if f'id="ott-5x-{year}"' in html:
        html = re.sub(
            rf'<p class="itt-5x-trails"[^>]*id="ott-5x-{year}"[\s\S]*?</p>',
            trails,
            html,
            count=1,
        )
    elif 'class="itt-5x-trails"' in html:
        html = re.sub(
            r'<p class="itt-5x-trails"[^>]*>[\s\S]*?</p>',
            trails,
            html,
            count=1,
        )
    else:
        html = html.replace(
            f'id="ott-guided-{year}"',
            f'id="ott-guided-{year}"',
            1,
        )
        html = html.replace(
            "</div>\n<p class=\"itt-5x-trails\"",
            "</div>\n" + trails + "\n<p class=\"itt-5x-trails\"",
            1,
        )
        if f'id="ott-5x-{year}"' not in html:
            html = html.replace(
                f'</div>\n<p class="itt-playable-link"',
                f"</div>\n{trails}\n<p class=\"itt-playable-link\"",
                1,
            )

    atlas_links = []
    seen = set()
    prefer = [
        "sites/playable/game.html",
        "sites/playable/game-2.html",
        "sites/playable/game-3.html",
        "sites/playable/game-4.html",
        "sites/playable/game-5.html",
        "sites/playable/famous.html",
        "sites/playable/index.html",
    ]
    for href in prefer + rooms:
        if href in seen or "error/" in href:
            continue
        seen.add(href)
        atlas_links.append(f'<a href="{page_href(href)}">{pretty(href)}</a>')
    atlas = (
        f'<p class="itt-5x-atlas" data-itt-5x-atlas style="margin:10px 0;padding:10px;'
        f'background:#eef6ff;border:1px solid #90caf9;font-family:Arial,sans-serif;'
        f'font-size:12px;line-height:1.8"><b>5× atlas · {year} rooms:</b> '
        + " · ".join(atlas_links)
        + "</p>"
    )
    if "data-itt-5x-atlas" in html:
        html = re.sub(
            r'<p class="itt-5x-atlas"[^>]*>[\s\S]*?</p>',
            atlas,
            html,
            count=1,
        )
    else:
        html = html.replace(trails, trails + "\n" + atlas, 1)
        if "data-itt-5x-atlas" not in html:
            html = html.replace("</table>", atlas + "\n</table>", 1)

    play = (
        f' <a href="../sites/playable/game.html"><b>Year game 1</b></a> · '
        f'<a href="../sites/playable/game-2.html">2</a> · '
        f'<a href="../sites/playable/game-3.html">3</a> · '
        f'<a href="../sites/playable/game-4.html">4</a> · '
        f'<a href="../sites/playable/game-5.html">5</a> · '
        f'<a href="../sites/playable/famous.html">Famous games</a>'
    )
    html = re.sub(
        r'(<p class="itt-playable-link"[^>]*>)([\s\S]*?)(</p>)',
        lambda m: m.group(1) + "<b>▶ Play this year’s games</b> —" + play + m.group(3),
        html,
        count=1,
    )
    path.write_text(html, encoding="utf-8")


def patch_map(year: str, rooms: list[str]) -> None:
    path = ROOT / "years" / year / "pages" / "map.html"
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    if 'data-itt-flow-map' not in html:
        html = html.replace(
            '<p><a href="home.html">',
            '<div data-itt-flow-map></div>\n<p><a href="home.html">',
            1,
        )
    lis = []
    for href in rooms:
        if "error/" in href:
            continue
        lis.append(f'<li><a href="{page_href(href)}">{pretty(href)}</a></li>')
    block = "<ul>\n" + "\n".join(lis) + "\n</ul>"
    if "<ul>" in html:
        html = re.sub(r"<ul>[\s\S]*?</ul>", block, html, count=1)
    else:
        html = html.replace("<h1>", block + "\n<h1>", 1)
    path.write_text(html, encoding="utf-8")


def patch_playable_index(year: str) -> None:
    path = ROOT / "years" / year / "sites" / "playable" / "index.html"
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    nav = (
        ' <a href="game.html">Year game 1</a> · '
        '<a href="game-2.html">2</a> · '
        '<a href="game-3.html">3</a> · '
        '<a href="game-4.html">4</a> · '
        '<a href="game-5.html">5</a> · '
        '<a href="famous.html">Famous</a>'
    )
    if "game-2.html" not in html:
        html = html.replace('<a href="game.html">', nav + " · <a href=\"game.html\">", 1)
        if "game-2.html" not in html:
            html = html.replace(
                '<div data-year-playable',
                "<p>" + nav + "</p>\n<div data-year-playable",
                1,
            )
    path.write_text(html, encoding="utf-8")


def ensure_config_rooms(year: str) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    text = cfg.read_text(encoding="utf-8")
    extra = [
        "sites/playable/game-2.html",
        "sites/playable/game-3.html",
        "sites/playable/game-4.html",
        "sites/playable/game-5.html",
    ]
    for page in extra:
        if f'"{page}"' in text:
            continue
        text = text.replace(
            '    "sites/playable/game.html"',
            f'    "{page}",\n    "sites/playable/game.html"',
            1,
        )
        if f'"{page}"' not in text:
            text = text.replace(
                "  var rooms = [",
                '  var rooms = [\n    "' + page + '",',
                1,
            )
    cfg.write_text(text, encoding="utf-8")


def ensure_flow_map_year(year: str, rooms: list[str]) -> None:
    path = ROOT / "js" / "config" / "flow-maps.js"
    text = path.read_text(encoding="utf-8")
    if f'ITT.flowMaps["{year}"]' in text:
        return
    star_href, star_label, _ = STAR[year]
    leftover_sites = []
    for suffix, title, a, _b, room, _n, _nl in LEFTOVER[year]:
        leftover_sites.append(
            {"name": title, "href": room, "do": a + " → itt" + year[2:] + "-" + suffix}
        )
    leftover_sites.append({"name": "★ " + star_label, "href": star_href, "do": "locked star"})
    atlas = [{"name": pretty(h), "href": h, "do": "On-disk room"} for h in rooms if "error/" not in h]
    blob = {
        "thesis": f"{year} lean door · leftover F-loops + locked star",
        "shell": "Windows 7 · IE 9",
        "how": [f"Star {star_label}", "Leftover F1–F5", "Atlas lists on-disk rooms"],
        "branches": [
            {"label": f"5× F1–F5 · {year}", "do": "REAL leftover loops", "sites": leftover_sites},
            {"label": "★ Star", "do": "Locked lean star", "sites": [{"name": star_label, "href": star_href, "do": "incomplete never writes"}]},
        ],
        "year": year,
    }
    insert = (
        f'\n  ITT.flowMaps["{year}"] = '
        + json.dumps(blob, indent=2, ensure_ascii=False)
        + ";\n"
    )
    # json.dumps uses 2-space; wrap assignment is fine
    text = text.replace(
        "})(typeof window !== \"undefined\" ? window : this);",
        insert + "})(typeof window !== \"undefined\" ? window : this);",
        1,
    )
    path.write_text(text, encoding="utf-8")


def ensure_2012_base_trails() -> None:
    path = ROOT / "js" / "config" / "flow-trails.js"
    text = path.read_text(encoding="utf-8")
    if '"2012":' in text:
        return
    rows = [
        {"n": 1, "name": "Instagram Android", "href": "sites/instagram/android.html", "match": "/instagram/android", "whenKey": "itt12-ig-android", "nextHref": "sites/instagram/acquired.html", "nextLabel": "$1B"},
        {"n": 2, "name": "$1B sale", "href": "sites/instagram/acquired.html", "match": "/instagram/acquired", "whenKey": "", "nextHref": "sites/facebook/ipo.html", "nextLabel": "IPO"},
        {"n": 3, "name": "Facebook IPO", "href": "sites/facebook/ipo.html", "match": "/facebook/ipo", "whenKey": "itt12-fb-ipo", "nextHref": "sites/facebook/index.html", "nextLabel": "1B"},
        {"n": 4, "name": "Facebook 1B", "href": "sites/facebook/index.html", "match": "/facebook/", "whenKey": "", "nextHref": "sites/wikipedia/index.html", "nextLabel": "SOPA"},
        {"n": 5, "name": "SOPA", "href": "sites/wikipedia/index.html", "match": "/wikipedia/", "whenKey": "", "nextHref": "sites/pinterest/index.html", "nextLabel": "Pinterest"},
        {"n": 6, "name": "Pinterest", "href": "sites/pinterest/index.html", "match": "/pinterest/", "whenKey": "", "nextHref": "sites/iphone/index.html", "nextLabel": "iPhone 5"},
        {"n": 7, "name": "iPhone 5", "href": "sites/iphone/index.html", "match": "/iphone/", "whenKey": "", "nextHref": "sites/iphone/maps.html", "nextLabel": "Maps flop"},
        {"n": 8, "name": "Maps flop", "href": "sites/iphone/maps.html", "match": "/iphone/maps", "whenKey": "", "nextHref": "sites/playable/game.html", "nextLabel": "Guess Doodle"},
        {"n": 9, "name": "Guess Doodle", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt12-game-guessdoodle", "nextHref": "sites/instagram/android.html", "nextLabel": "Instagram Android"},
        {"n": 10, "name": "Chrome", "href": "sites/chrome/index.html", "match": "/chrome/", "whenKey": "", "nextHref": "sites/instagram/android.html", "nextLabel": "Instagram Android"},
    ]
    blob = json.dumps(rows, indent=6, ensure_ascii=False)
    insert = '    "2012": ' + blob + ",\n"
    text = text.replace('    "2013": [', insert + '    "2013": [', 1)
    path.write_text(text, encoding="utf-8")


def existing_rooms(year: str) -> list[str]:
    root = ROOT / "years" / year
    out = []
    for p in sorted(root.rglob("*.html")):
        rel = p.relative_to(root).as_posix()
        if rel == "index.html":
            continue
        out.append(rel)
    extras = [
        "sites/playable/game-2.html",
        "sites/playable/game-3.html",
        "sites/playable/game-4.html",
        "sites/playable/game-5.html",
    ]
    for e in extras:
        if e not in out:
            out.append(e)
    return out


def main() -> None:
    b5x = load_b5x()
    trails = load_extra_js(ROOT / "js" / "config" / "flow-trails-5x.js")
    atlas = load_extra_js(ROOT / "js" / "config" / "flow-maps-5x-atlas.js")
    ensure_2012_base_trails()

    for year in YEARS:
        rooms = existing_rooms(year)
        bible = b5x.parse_bible(year)
        games = bible["games"]
        for g in games:
            if g["gid"] in NEED_BY_GID:
                g["need"] = NEED_BY_GID[g["gid"]]
            if g["gid"] in PHRASE_BY_GID:
                g["phrase"] = PHRASE_BY_GID[g["gid"]]
            if g["gid"] in ("ipadrot", "vin6", "snap10"):
                g["wait_ms"] = 0
        assets = b5x.detect_game_assets(year)
        for g in games:
            b5x.write_game_js(year, g)
            b5x.write_game_html(year, g, assets)
        b5x.patch_urlmap(year, games)
        ensure_config_rooms(year)

        trails[year] = b5x.trail_rows(year)
        sites = []
        seen = set()
        for href in rooms:
            if href in seen or "error/" in href:
                continue
            seen.add(href)
            sites.append({"name": pretty(href), "href": href, "do": "Existing dest · 5× atlas"})
        atlas[year] = sites

        ensure_flow_map_year(year, rooms)
        b5x.ensure_map_script(year)
        patch_map(year, rooms)
        patch_playable_index(year)

        for suffix, title, a, b, room, nxt, nxt_label in LEFTOVER[year]:
            add_5x_panel(year, suffix, title, a, b, room, nxt, nxt_label)

        patch_home(year, rooms)
        print(year, "games", len(games), "trails", len(trails[year]), "atlas", len(atlas[year]))

    write_trails_merged(trails)
    write_atlas_merged(atlas)

    # 2012 popular dests that were missing after prune
    add_popular_panel(
        "2012",
        "tweets",
        "Twitter 2012 (top-10 leftover)",
        "Still 140",
        "Instagram Android stays the star",
        "sites/twitter/index.html",
        "sites/facebook/ipo.html",
        "Facebook IPO",
        field="tweet",
    )
    add_popular_panel(
        "2012",
        "fb-ipo",
        "Facebook IPO $38",
        "IPO price is $38",
        "Nasdaq delayed the open",
        "sites/facebook/ipo.html",
        "sites/facebook/index.html",
        "Facebook 1B",
    )
    add_popular_panel(
        "2012",
        "facebook",
        "Facebook 1B leftover",
        "1 billion monthly actives 4 Oct 2012",
        "Still Like — not Reactions",
        "sites/facebook/index.html",
        "sites/wikipedia/index.html",
        "SOPA",
    )
    add_popular_panel(
        "2012",
        "wiki",
        "Wikipedia SOPA blackout",
        "24-hour English Wikipedia blackout",
        "SOPA and PIPA",
        "sites/wikipedia/index.html",
        "sites/instagram/android.html",
        "Instagram Android",
    )
    print("lean 5× engine done")


if __name__ == "__main__":
    main()
