#!/usr/bin/env python3
"""Fill remaining year-door flow gaps.

1. Official leftover dests still missing leftover-official panels (n=2–9, or n=10 if not the year game).
2. famous.html cabinets on 2007 / 2020 / 2024.
3. pop-3× + 3×3 JSON + dest panels on 2020 / 2024.
4. 2× leftover REAL writers on dest HTML with 0 writers, then a -d2 pack
   on dests that only have one (lean years) so 2× count matches dest count × 2.

Does not move stars, grow guided <ol>, invent brand pixels, or mkdir forests.
"""
from __future__ import annotations

import importlib.util
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

_spec = importlib.util.spec_from_file_location(
    "itt_lo_official", ROOT / "scripts" / "inject-leftover-official.py"
)
_mod = importlib.util.module_from_spec(_spec)
assert _spec and _spec.loader
_spec.loader.exec_module(_mod)
lo_inject = _mod.inject
lo_panel = _mod.panel
relhref = _mod.relhref
trail_index = _mod.trail_index

# Remaining official leftover dests (skip gold + year-game).
LO_REST = [
    ("1995", "sites/auctionweb/item-laser.html", "aw-bid", "Buy It Now (trap)", "Place leftover bid", "12.00", [("bid", "Bid leftover"), ("bin", "Buy It Now (trap)")], "bid", 0),
    ("1995", "sites/geocities/homestead.html", "homestead", "Facebook (trap)", "Claim leftover homestead", "leftover neighborhood", [("west", "Homestead leftover"), ("fb", "Facebook (trap)")], "west", 0),
    ("1995", "sites/altavista/index.html", "av", "Google (trap)", "Search leftover", "leftover query", [("q", "AltaVista leftover"), ("g", "Google (trap)")], "q", 0),
    ("1996", "sites/hotmail/index.html", "hotmail-user", "Gmail (trap)", "Send leftover mail", "leftover note", [("compose", "Compose leftover"), ("gmail", "Gmail (trap)")], "compose", 0),
    ("1997", "sites/icq/index.html", "icq-buddy", "AIM 1999 mass (trap)", "Save leftover UIN", "leftoveruin", [("uin", "UIN leftover"), ("aim", "AIM mass (trap)")], "uin", 0),
    ("1997", "sites/slashdot/story.html", "sd-comments-ie4", "Reddit (trap)", "Post leftover comment", "leftover comment", [("c", "Comment leftover"), ("reddit", "Reddit (trap)")], "c", 0),
    ("1999", "sites/napster/search.html", "napster", "Spotify (trap)", "Search leftover track", "leftover track", [("q", "Search leftover"), ("spot", "Spotify (trap)")], "q", 0),
    ("1999", "sites/paypal/send.html", "paypal", "Venmo (trap)", "Send leftover $", "1.00", [("send", "Send leftover"), ("venmo", "Venmo (trap)")], "send", 0),
    ("2000", "sites/paypal/send.html", "paypal", "Venmo (trap)", "Send leftover $", "1.00", [("send", "Send leftover"), ("venmo", "Venmo (trap)")], "send", 0),
    ("2000", "sites/napster/search.html", "napster", "iTunes Store (trap)", "Search leftover track", "leftover track", [("q", "Search leftover"), ("itunes", "iTunes (trap)")], "q", 0),
    ("2000", "sites/pets/shop.html", "amazon-cart", "This is the 2000 chip (trap)", "Note leftover sock puppet", "", [("sock", "Sock leftover"), ("chip", "Chip (trap)")], "sock", 0),
    ("2001", "sites/msn/index.html", "msn", "Teams (trap)", "Sign on leftover", "leftovername", [("sign", "Sign-on leftover"), ("teams", "Teams (trap)")], "sign", 0),
    ("2005", "sites/pandora/index.html", "pandora", "Spotify as 2005 star (trap)", "Seed leftover station", "leftover artist", [("seed", "Station leftover"), ("spot", "Spotify star (trap)")], "seed", 0),
    ("2006", "sites/facebook/feed.html", "feed", "This is the 2006 chip (trap)", "Open leftover feed", "", [("feed", "Feed leftover 5 Sep"), ("chip", "Chip (trap)")], "feed", 0),
    ("2013", "sites/snapchat/story.html", "snap-story", "IG Stories 2016 (trap)", "Open leftover story", "", [("story", "Story leftover"), ("ig", "IG Stories (trap)")], "story", 0),
    ("2013", "sites/telegram/index.html", "telegram-chat", "WhatsApp as 2013 star (trap)", "Send leftover chat", "leftover chat", [("chat", "Chat leftover"), ("wa", "WhatsApp star (trap)")], "chat", 0),
    ("2021", "sites/facebook/index.html", "pop-facebook", "Meta app (trap)", "Save leftover pop", "leftover note", [("pop", "Pop leftover"), ("meta", "Meta app (trap)")], "pop", 0),
    ("2022", "sites/windows10/index.html", "win10", "Win11 is already mass (trap)", "Note leftover residual", "", [("stay", "Stay leftover"), ("win11", "Win11 mass (trap)")], "stay", 0),
]

POP3 = {
    "2020": [
        {"id": "meet", "name": "Google Meet", "title": "Meet leftover — free 29 Apr 2020", "why": "Meet went free. Not the Zoom chip.", "verb": "Name leftover room.", "ph": "leftover room", "btn": "Open leftover", "bg": "#1a73e8", "fg": "#fff"},
        {"id": "hbomax", "name": "HBO Max", "title": "HBO Max leftover — 27 May 2020", "why": "Streamer leftover. Not the Zoom chip.", "verb": "Name leftover title.", "ph": "leftover title", "btn": "Open leftover", "bg": "#b10dc9", "fg": "#fff"},
        {"id": "quibi", "name": "Quibi", "title": "Quibi leftover — 6 Apr 2020", "why": "Short-form leftover. Dead 2020. Not the chip.", "verb": "Name leftover bite.", "ph": "leftover bite", "btn": "Open leftover", "bg": "#111", "fg": "#fff"},
    ],
    "2024": [
        {"id": "store", "name": "GPT Store", "title": "GPT Store leftover — 10 Jan 2024", "why": "Store leftover. Not 4o Talk.", "verb": "Name leftover GPT.", "ph": "leftover gpt", "btn": "Open leftover", "bg": "#10a37f", "fg": "#fff"},
        {"id": "search", "name": "ChatGPT Search", "title": "ChatGPT Search leftover — 31 Oct 2024", "why": "Search leftover. Not SearchGPT July.", "verb": "Name leftover query.", "ph": "leftover query", "btn": "Open leftover", "bg": "#10a37f", "fg": "#fff"},
        {"id": "visionpro", "name": "Vision Pro", "title": "Vision Pro leftover — 2 Feb 2024 US", "why": "Headset leftover. Not the 4o chip.", "verb": "Note leftover store.", "ph": "vision leftover", "btn": "Open leftover", "bg": "#111", "fg": "#fff"},
    ],
}
POP33 = {
    "2020": [
        {"id": "fleets", "name": "Twitter Fleets", "title": "Fleets leftover", "why": "24-hour leftover. Ends 2021. Not the chip.", "verb": "Pick fleet then go.", "ph": "fleet leftover", "btn": "Open leftover"},
        {"id": "discord", "name": "Discord leftover", "title": "Discord leftover", "why": "2020 MAU leftover. Not Zoom.", "verb": "Pick server then go.", "ph": "server leftover", "btn": "Open leftover"},
        {"id": "teams", "name": "Teams leftover", "title": "Teams leftover", "why": "Work leftover. Not the Zoom chip.", "verb": "Pick meeting then go.", "ph": "teams leftover", "btn": "Open leftover"},
    ],
    "2024": [
        {"id": "youtube", "name": "YouTube leftover", "title": "YouTube leftover", "why": "Watch leftover. Not Sora.", "verb": "Pick watch then go.", "ph": "watch leftover", "btn": "Open leftover"},
        {"id": "wikipedia", "name": "Wikipedia leftover", "title": "Wikipedia leftover", "why": "Article leftover. Not the chip.", "verb": "Pick article then go.", "ph": "article leftover", "btn": "Open leftover"},
        {"id": "facebook", "name": "Facebook leftover", "title": "Facebook leftover", "why": "Feed leftover. Not the 4o chip.", "verb": "Pick leftover then go.", "ph": "feed leftover", "btn": "Open leftover"},
    ],
}

LEAN = {str(y) for y in list(range(2006, 2025)) if y != 2008}
STAR_FILE = {
    "2006": "sites/twitter/index.html",
    "2007": "sites/iphone/index.html",
    "2009": "sites/facebook/index.html",
    "2010": "sites/instagram/index.html",
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/record.html",
    "2014": "sites/whatsapp/index.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
    "2020": "sites/zoom/meeting.html",
    "2021": "sites/att/index.html",
    "2022": "sites/chatgpt/index.html",
    "2023": "sites/plus/index.html",
    "2024": "sites/chatgpt/4o.html",
}


def prefix(year: str) -> str:
    return "itt" + year[2:]


def append_lo_matrix(rows) -> int:
    path = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    dests = data.get("dests") or []
    have = {(d.get("year"), d.get("href"), d.get("key")) for d in dests}
    added = 0
    for year, href, key, _t, _s, field, _p, need, minp in rows:
        rec = {
            "year": year,
            "href": href,
            "key": f"{prefix(year)}-{key}",
            "suffix": key,
            "needPick": need or "",
            "minPick": int(minp or 0),
            "field": bool(field),
            "placeholder": field or "",
        }
        ident = (rec["year"], rec["href"], rec["key"])
        if ident in have:
            continue
        dests.append(rec)
        have.add(ident)
        added += 1
    data["dests"] = dests
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return added


def ensure_immersion(path: Path, year: str) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    needle = f"immersion-{year}.js"
    if needle in text:
        return
    tag = f'<script src="../../../../js/{needle}"></script>\n'
    if "</body>" in text:
        text = text.replace("</body>", tag + "</body>", 1)
    else:
        text += "\n" + tag
    path.write_text(text, encoding="utf-8")


def fill_official_lo() -> None:
    trails = trail_index()
    injected = 0
    missing = 0
    for row in LO_REST:
        year, href, key, trap, save, field, picks, need, minp = row
        path = ROOT / "years" / year / href
        if not path.is_file():
            print("LO MISSING", year, href)
            missing += 1
            continue
        info = trails.get((year, href), {})
        nxt = ""
        lab = info.get("nextLabel") or ""
        if info.get("nextHref"):
            nxt = relhref(href, info["nextHref"])
        lo_inject(path, lo_panel(year, key, trap, save, field, picks, need, minp, nxt, lab))
        ensure_immersion(path, year)
        injected += 1
    added = append_lo_matrix(LO_REST)
    print("official-LO injected", injected, "missing", missing, "matrix +", added)


FAMOUS = {
    "2007": ("Pocket Snake", "snake", "Concentration", "memory", "IE 7 leftover cabinets. Not Peg Walk. Not the iPhone chip."),
    "2020": ("Brick Bat", "breakout", "Concentration", "memory", "Lockdown-tab cabinets. Not Sus Vote. Not the Zoom chip."),
    "2024": ("Concentration", "memory", "Brick Bat", "breakout", "Habit leftover cabinets. Not Omni Dash. Not the 4o chip."),
}


def write_famous(year: str, a_title, a_id, b_title, b_id, blurb: str) -> None:
    dest = ROOT / "years" / year / "sites" / "playable" / "famous.html"
    css = "period-2007.css" if year == "2007" else f"period-{year}.css"
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>Famous games · {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p style="font-size:12px;padding:12px">
 <a href="index.html">← Playables</a> ·
 <a href="game.html">Year game</a> ·
 <a href="../../pages/home.html">Starting Point {year}</a>
</p>
<h1 style="font-size:20px;margin:8px 12px">Famous games · {year}</h1>
<p style="font-size:13px;max-width:42em;margin:0 12px">{blurb} Museum JS. No ripped SWF. No official sprites.</p>
<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{a_id}" data-famous="{a_id}" tabindex="0" style="margin:18px 12px;padding:10px;border:1px solid #888;background:#fff">
 <h2 style="margin:0 0 6px;font-size:16px">{a_title}</h2>
 <p class="honesty" style="font-size:11px;background:#ffc;border:1px solid #cc0;padding:6px">Textbook leftover. Key <code>itt{year[2:]}-game-{a_id}</code>.</p>
 <p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Start to play. Incomplete never writes.</p>
 <canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<div class="itt-year-game yg-shell" data-year-game data-year="{year}" data-game-id="{b_id}" data-famous="{b_id}" tabindex="0" style="margin:18px 12px;padding:10px;border:1px solid #888;background:#fff">
 <h2 style="margin:0 0 6px;font-size:16px">{b_title}</h2>
 <p class="honesty" style="font-size:11px;background:#ffc;border:1px solid #cc0;padding:6px">Textbook leftover. Key <code>itt{year[2:]}-game-{b_id}</code>.</p>
 <p><button type="button" data-game-start>Start</button> Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
 <p data-itt-action-status style="min-height:1.2em;font-size:12px">Start to play. Incomplete never writes.</p>
 <canvas width="480" height="280" style="max-width:100%;border:1px solid #333;background:#111"></canvas>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/famous-kit.js"></script>
<script src="../../../../js/immersion-{year}.js"></script>
<!-- ITT-4X:playable-famous:start -->
<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:16px">{year} leftover · playable famous</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">{year} leftover · incomplete never writes · not the chip</p>
<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover note"></label></p>
<p><button type="button" data-4x-go="playable-famous">Save leftover</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-playable-famous"><b>Next:</b> <a href="game.html">Year game</a></p>
</section>
<!-- ITT-4X:playable-famous:end -->
</body>
</html>
"""
    dest.write_text(html, encoding="utf-8")
    print("famous", year, dest.relative_to(ROOT))


def merge_json(path: Path, extra: dict) -> None:
    data = json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}
    for year, rows in extra.items():
        data[year] = rows
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def pop_panel(year: str, pid: str, ph: str) -> str:
    return (
        f"<!-- ITT-POP:{pid}:start -->\n"
        f'<div class="itt-pop3" data-pop-panel="1" data-itt-year="{year}" '
        f'style="margin:12px 0;padding:10px;border:1px dashed #666;max-width:46em;'
        f'font-family:Arial,sans-serif;font-size:13px;background:#fff;color:#111">\n'
        f'<p><button type="button" data-pop-pick="{pid}">{pid} leftover</button></p>\n'
        f'<label><input type="checkbox" data-pop-req> Leftover. Star stays locked.</label>\n'
        f'<p><input type="text" data-pop-field maxlength="40" placeholder="{ph}"></p>\n'
        f'<p><button type="button" data-pop-go data-pop-id="{pid}">Popular leftover</button> '
        f"<span data-pop-status></span></p>\n"
        f"</div>\n"
        f"<!-- ITT-POP:{pid}:end -->\n"
    )


def fill_pop() -> None:
    merge_json(ROOT / "scripts" / "popular-3x-sites.json", POP3)
    merge_json(ROOT / "scripts" / "popular-3x3-sites.json", POP33)
    maps = ROOT / "js" / "config" / "flow-maps-popular-3x.js"
    t = maps.read_text(encoding="utf-8")
    extra_lines = {
        "2007": '    "2007": ["tumblr|Tumblr", "kindle|Kindle", "hulu|Hulu"],\n',
        "2020": '    "2020": ["meet|Google Meet", "hbomax|HBO Max", "quibi|Quibi"],\n',
        "2023": '    "2023": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"],\n',
        "2024": '    "2024": ["store|GPT Store", "search|ChatGPT Search", "visionpro|Vision Pro"],\n',
    }
    for year, line in extra_lines.items():
        if f'"{year}":' not in t:
            t = t.replace('    "2022":', line + '    "2022":', 1)
            if f'"{year}":' not in t:
                t = t.replace("  };\n", line + "  };\n", 1)
    maps.write_text(t, encoding="utf-8")
    for year, rows in {**POP3, **{k: POP33[k] for k in POP33}}.items():
        for rec in rows:
            pid = rec["id"]
            dest = ROOT / "years" / year / "sites" / pid / "index.html"
            if not dest.is_file():
                print("POP DEST MISS", year, pid)
                continue
            html = dest.read_text(encoding="utf-8", errors="replace")
            if f'data-pop-id="{pid}"' in html or f"ITT-POP:{pid}:" in html:
                continue
            block = pop_panel(year, pid, rec.get("ph") or "leftover")
            if "</body>" in html:
                html = html.replace("</body>", block + "</body>", 1)
            else:
                html += "\n" + block
            dest.write_text(html, encoding="utf-8")
            ensure_immersion(dest, year)
    # 3×3 wall on 2020/2024 home if missing
    for year, rows in POP33.items():
        home = ROOT / "years" / year / "pages" / "home.html"
        if not home.is_file():
            continue
        ht = home.read_text(encoding="utf-8")
        if f'data-itt-pop-3x3="{year}"' in ht:
            continue
        links = " · ".join(
            f'<a href="../sites/{r["id"]}/index.html">{r["name"]}</a>' for r in rows
        )
        wall = (
            f'<p data-itt-pop-3x3="{year}" class="itt-pop-3x3" '
            f'style="font-size:12px;margin:10px 0;padding:8px;border:1px solid #333;max-width:720px">'
            f"<b>3 more leftovers</b> (third trio · not the chip): {links} "
            f"· pick + honesty · empty never writes</p>\n"
        )
        if f'data-itt-pop3x="{year}"' in ht:
            ht = re.sub(
                rf'(<p data-itt-pop3x="{year}"[\s\S]*?</p>)',
                r"\1\n" + wall,
                ht,
                count=1,
            )
        elif "</body>" in ht:
            ht = ht.replace("</body>", wall + "</body>", 1)
        home.write_text(ht, encoding="utf-8")
    print("pop-3x / 3x3 2020+2024 wired")


def fourx(year: str, suffix: str, title: str, nxt: str, nl: str) -> str:
    pref = prefix(year)
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="query" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
        f'autocomplete="off" placeholder="leftover"></label></p>\n'
        f'<p><button type="button" data-4x-go="{suffix}">Type leftover</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{pref}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def inject_4x(dest: Path, year: str, suffix: str, title: str, next_rel: str, nl: str) -> bool:
    t = dest.read_text(encoding="utf-8", errors="replace")
    if f"ITT-4X:{suffix}:" in t or f'data-4x-go="{suffix}"' in t:
        return False
    rel = dest.relative_to(ROOT / "years" / year)
    depth = len(rel.parts)
    nxt_abs = ROOT / "years" / year / next_rel
    try:
        nxt = Path(nxt_abs).relative_to(dest.parent).as_posix()
    except ValueError:
        nxt = "../" * (depth - 1) + next_rel
    block = fourx(year, suffix, title, nxt, nl)
    if "</body>" in t:
        dest.write_text(t.replace("</body>", block + "</body>", 1), encoding="utf-8")
    else:
        dest.write_text(t + block, encoding="utf-8")
    return True


def dest_htmls(year: str) -> list[Path]:
    sites = ROOT / "years" / year / "sites"
    if not sites.is_dir():
        return []
    out = []
    skip_bits = (
        "/yahoo/",
        "/wikipedia/article",
        "/wikipedia/community",
        "/wikipedia/help",
        "/wikipedia/recent",
        "/zombo/about",
        "itunes-note.html",
    )
    for p in sorted(sites.rglob("*.html")):
        rel = "/" + str(p.relative_to(ROOT))
        if any(s in rel for s in skip_bits):
            continue
        # forest drill-down: keep only index/home + known dest pages
        if year < "2006" or year == "2008":
            if p.name not in {
                "index.html",
                "home.html",
                "about.html",
                "edit.html",
                "search.html",
                "send.html",
                "upload.html",
                "record.html",
                "story.html",
                "android.html",
                "stories.html",
                "lucky.html",
                "ssl-checkout.html",
                "item-laser.html",
                "item-laptop.html",
                "homestead.html",
                "wars.html",
                "feed.html",
                "networks.html",
                "issue.html",
            }:
                continue
        out.append(p)
    return out


def fill_2x() -> None:
    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(mx_path.read_text(encoding="utf-8"))
    have_path = defaultdict(list)
    have_key = set()
    for r in rows:
        have_path[r["year"]].append(r.get("path") or "")
        have_key.add((r["year"], r.get("key") or ""))
    added = 0
    injected = 0
    # 1) dest HTML with zero 2× path on lean years + 2007/2020/2024 famous
    years = [str(y) for y in range(2006, 2025)]
    for year in years:
        star = STAR_FILE.get(year, "pages/home.html")
        paths = set(have_path[year])
        taken = {k.split("-", 1)[-1] for y, k in have_key if y == year}
        for dest in dest_htmls(year):
            web = "/" + str(dest.relative_to(ROOT))
            if web in paths:
                continue
            slug = dest.parent.name
            if dest.name != "index.html":
                slug = dest.stem
            suf = re.sub(r"[^a-z0-9]+", "", slug.lower())[:12] or "dest"
            if suf in taken:
                suf = suf + "lx"
            n = 2
            while suf in taken:
                suf = f"{slug[:8]}{n}lx"
                n += 1
            taken.add(suf)
            title = f"{year} leftover · {slug}"
            if inject_4x(dest, year, suf, title, star, "★ year star"):
                injected += 1
            rec = {
                "year": year,
                "path": web,
                "key": f"{prefix(year)}-{suf}",
                "kind": "query",
                "title": title,
                "next": f"/years/{year}/{star}",
                "nextLabel": "year star",
            }
            if (year, rec["key"]) not in have_key:
                rows.append(rec)
                have_key.add((year, rec["key"]))
                have_path[year].append(web)
                added += 1
    # 2) second leftover pack on dests with only one 2× writer (lean, toward dest×2)
    path_count = defaultdict(lambda: defaultdict(int))
    for r in rows:
        path_count[r["year"]][r.get("path") or ""] += 1
    for year in years:
        if year not in LEAN:
            continue
        star = STAR_FILE.get(year, "pages/home.html")
        taken = {k.split("-", 1)[-1] for y, k in have_key if y == year}
        for dest in dest_htmls(year):
            web = "/" + str(dest.relative_to(ROOT))
            if path_count[year][web] != 1:
                continue
            # skip adding d2 on the gold file itself
            if STAR_FILE.get(year) and dest.relative_to(ROOT / "years" / year).as_posix() == STAR_FILE[year]:
                continue
            slug = dest.parent.name
            suf = re.sub(r"[^a-z0-9]+", "", slug.lower())[:10] + "-d2"
            n = 2
            while suf in taken:
                suf = f"{slug[:8]}-d{n}"
                n += 1
            taken.add(suf)
            title = f"{year} leftover · {slug} d2"
            if inject_4x(dest, year, suf, title, star, "★ year star"):
                injected += 1
            rec = {
                "year": year,
                "path": web,
                "key": f"{prefix(year)}-{suf}",
                "kind": "query",
                "title": title,
                "next": f"/years/{year}/{star}",
                "nextLabel": "year star",
            }
            if (year, rec["key"]) not in have_key:
                rows.append(rec)
                have_key.add((year, rec["key"]))
                added += 1
    mx_path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    print("2× injected panels", injected, "matrix +", added, "total", len(rows))


def main() -> None:
    fill_official_lo()
    for year, spec in FAMOUS.items():
        write_famous(year, *spec)
    fill_pop()
    fill_2x()


if __name__ == "__main__":
    main()
