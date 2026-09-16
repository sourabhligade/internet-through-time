#!/usr/bin/env python3
"""Add 2019 leftover dests (~38) and rebuild 2020 (~38). Dest-true. No invented pixels."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

Y19_EXTRA = [
    ("reddit", "Reddit leftover", "Post leftover"),
    ("wikipedia", "Wikipedia leftover", "Read leftover"),
    ("netflix", "Netflix leftover", "Watch leftover"),
    ("spotify", "Spotify leftover", "Wrapped leftover"),
    ("snapchat", "Snapchat leftover", "Snap leftover"),
    ("twitch", "Twitch leftover", "Watch leftover"),
    ("slack", "Slack leftover", "Message leftover"),
    ("uber", "Uber leftover", "Ride leftover"),
    ("airbnb", "Airbnb leftover", "Book leftover"),
    ("whatsapp", "WhatsApp leftover", "Chat leftover"),
    ("linkedin", "LinkedIn leftover", "Feed leftover"),
    ("github", "GitHub leftover", "Issue leftover"),
    ("hulu", "Hulu leftover", "Watch leftover"),
    ("switchlite", "Switch Lite leftover", "Handheld leftover"),
    ("applecard", "Apple Card leftover", "Apply leftover"),
    ("wework", "WeWork leftover", "S-1 leftover"),
    ("peloton", "Peloton leftover", "Ride leftover"),
    ("discord", "Discord leftover", "Join leftover"),
    ("pinterest", "Pinterest leftover", "Pin leftover"),
]

Y20_OFFICIAL = [
    ("zoom", "Zoom Leave", "Leave"),
    ("houseparty", "Houseparty leftover", "Hang leftover"),
    ("discord", "Discord leftover", "Join leftover"),
    ("teams", "Teams leftover", "Join leftover"),
    ("classroom", "Classroom leftover", "Join class leftover"),
    ("netflix", "Netflix leftover", "Watch leftover"),
    ("tiktok", "TikTok leftover", "For You leftover"),
    ("amongus", "Among Us leftover", "Impostor leftover"),
    ("animalcrossing", "Animal Crossing leftover", "Island leftover"),
    ("playable", "Year game leftover", "Play leftover"),
]

Y20_LO3X = {
    "first": ["amazon", "facebook", "google"],
    "second": ["instagram", "youtube", "slack"],
    "third": ["reddit", "wikipedia", "nyt"],
}

Y20_EXTRA = [
    ("twitter", "Twitter leftover", "Tweet leftover"),
    ("chrome", "Chrome leftover", "Tab leftover"),
    ("windows10", "Windows 10 leftover", "Update leftover"),
    ("iphone", "iPhone leftover", "Lock leftover"),
    ("spotify", "Spotify leftover", "Play leftover"),
    ("twitch", "Twitch leftover", "Watch leftover"),
    ("uber", "Uber leftover", "Ride leftover"),
    ("whatsapp", "WhatsApp leftover", "Chat leftover"),
    ("linkedin", "LinkedIn leftover", "Feed leftover"),
    ("github", "GitHub leftover", "Issue leftover"),
    ("hulu", "Hulu leftover", "Watch leftover"),
    ("airbnb", "Airbnb leftover", "Book leftover"),
    ("peacock", "Peacock leftover", "Watch leftover"),
    ("hbomax", "HBO Max leftover", "Watch leftover"),
    ("edge", "Edge leftover", "Tab leftover"),
    ("notion", "Notion leftover", "Page leftover"),
    ("figma", "Figma leftover", "File leftover"),
    ("robinhood", "Robinhood leftover", "Trade leftover"),
    ("coinbase", "Coinbase leftover", "Trade leftover"),
]


def leftover2x_html(year: str, slug: str, name: str, verb: str, star_name: str) -> str:
    y2 = year[2:]
    lx = f"{slug[:8]}-lx"
    d2 = f"{slug[:8]}-d2"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{name} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px;margin:8px 0;font-family:Arial,sans-serif">[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;line-height:1.45">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{name}</h1>
<p>{year} leftover dest. {star_name} is the chip. Incomplete never writes.</p>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="{year}">
<p><b>{verb}</b> · <code>itt{y2}-{lx}</code></p>
<label><input type="checkbox" data-lo-req>The chip is not this dest.</label>
<label><input type="checkbox" data-lo-req>Empty / trap never write.</label>
<p>
<button type="button" data-lo-pick="keep">{verb}</button>
<button type="button" data-lo-pick="trap">{star_name} as gold (trap)</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{slug} leftover"></p>
<p>
<button type="button" data-lo-trap>{star_name} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{lx}" data-lo-need-pick="keep">{verb}</button>
</p>
<p data-lo-status></p>
</section>
<section data-lo-panel="1" data-itt-dest-true="1" data-itt-year="{year}">
<p><b>{verb} cite</b> · <code>itt{y2}-{d2}</code></p>
<label><input type="checkbox" data-lo-req>Second path. Not the year star.</label>
<label><input type="checkbox" data-lo-req>Incomplete never writes.</label>
<p>
<button type="button" data-lo-pick="keep">{verb} cite</button>
<button type="button" data-lo-pick="trap">{star_name} as gold (trap)</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{slug} cite leftover"></p>
<p>
<button type="button" data-lo-trap>{star_name} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{d2}" data-lo-need-pick="keep">{verb} cite</button>
</p>
<p data-lo-status></p>
</section>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def write_dest(year: str, slug: str, name: str, verb: str, star: str) -> Path:
    d = ROOT / "years" / year / "sites" / slug
    d.mkdir(parents=True, exist_ok=True)
    p = d / "index.html"
    if year == "2020" and slug == "playable":
        p = d / "game.html"
        (d / "index.html").write_text(
            leftover2x_html(year, slug, name, verb, star).replace("game.html", "index.html"),
            encoding="utf-8",
        )
    p.write_text(leftover2x_html(year, slug, name, verb, star), encoding="utf-8")
    return p


def zoom_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2020" data-official-key="itt20-zoom">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Zoom Leave — 2020</title>
<link rel="stylesheet" href="../../../../css/period-2020.css">
</head>
<body bgcolor="#1a1a1a" text="#eee">
<p class="archive-residual" data-itt-capture-cite style="font-size:11px;margin:10px auto;max-width:36em;font-family:Arial,sans-serif">[failed-final] Zoom Leave · no official brand pixels.</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb" style="text-align:center;font-size:12px"><a href="../../pages/home.html">Starting Point</a></p>
<div style="max-width:28em;margin:24px auto;padding:20px;background:#2d2d2d;border-radius:8px;font-family:Segoe UI,Arial,sans-serif" data-official-verb-host="1">
<h1 style="font-size:20px">Leave meeting</h1>
<p>Mute, then chat, then Leave. Empty never writes <code>itt20-zoom</code>.</p>
<label style="display:block;font-size:12px;margin:8px 0"><input type="checkbox" data-official-req> Honesty. Empty / Stay never write.</label>
<label style="display:block;font-size:12px;margin:8px 0"><input type="checkbox" data-official-req> This dest, not Disney+ Continue / ATT Ask.</label>
<p>
<button type="button" data-official-trap>Stay</button>
<button type="button" data-official-verb>Leave</button>
<span data-official-status></span>
</p>
</div>
<script src="../../../../js/immersion-2020.js"></script>
</body>
</html>
"""


def rewrite_rooms(year: str) -> None:
    cfg = ROOT / "js/config" / f"{year}.js"
    ydir = ROOT / "years" / year
    rooms = []
    for p in sorted(ydir.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(ydir).as_posix()
        if rel == "index.html" or rel.startswith("pages/") or rel.startswith("sites/"):
            rooms.append(rel)
    if "index.html" not in rooms:
        rooms.insert(0, "index.html")
    text = cfg.read_text(encoding="utf-8")
    body = ",\n    ".join(json.dumps(r) for r in rooms)
    new_arr = "var rooms = [\n    " + body + "\n  ];"
    new_text, n = re.subn(r"var rooms = \[[^\]]*\]", new_arr, text, count=1, flags=re.S)
    if n != 1:
        raise SystemExit(f"could not rewrite rooms[] in {cfg}")
    cfg.write_text(new_text, encoding="utf-8")
    print(f"{year} rooms {len(rooms)}")


def main() -> None:
    star19 = "Disney+ Continue"
    for slug, name, verb in Y19_EXTRA:
        write_dest("2019", slug, name, verb, star19)
        print("2019 dest", slug)
    rewrite_rooms("2019")

    # 2020 tree
    ydir = ROOT / "years" / "2020"
    (ydir / "pages").mkdir(parents=True, exist_ok=True)
    (ydir / "sites").mkdir(parents=True, exist_ok=True)
    (ydir / "index.html").write_text(
        Path(ROOT / "years/2021/index.html").read_text(encoding="utf-8")
        .replace("2021", "2020")
        .replace("c21", "c20"),
        encoding="utf-8",
    )
    (ydir / "pages" / "home.html").write_text(
        Path(ROOT / "years/2021/pages/home.html").read_text(encoding="utf-8")
        .replace("2021", "2020"),
        encoding="utf-8",
    )
    about = Path(ROOT / "years/2021/pages/about.html")
    if about.is_file():
        (ydir / "pages" / "about.html").write_text(
            about.read_text(encoding="utf-8").replace("2021", "2020").replace("ATT Ask", "Zoom Leave"),
            encoding="utf-8",
        )
    mmap = Path(ROOT / "years/2021/pages/map.html")
    if mmap.is_file():
        (ydir / "pages" / "map.html").write_text(
            mmap.read_text(encoding="utf-8").replace("2021", "2020"),
            encoding="utf-8",
        )
    cfg21 = (ROOT / "js/config/2021.js").read_text(encoding="utf-8")
    (ROOT / "js/config/2020.js").write_text(
        cfg21.replace("2021", "2020").replace("Ask App Not to Track", "Zoom Leave"),
        encoding="utf-8",
    )
    (ROOT / "js/browser-2020.js").write_text(
        (ROOT / "js/browser-2021.js").read_text(encoding="utf-8").replace("2021", "2020"),
        encoding="utf-8",
    )
    (ROOT / "js/immersion-2020.js").write_text(
        (ROOT / "js/immersion-2021.js").read_text(encoding="utf-8").replace("2021", "2020"),
        encoding="utf-8",
    )
    (ROOT / "css/period-2020.css").write_text(
        '@import url("period-2019.css");\n'
        ".year-2020.os-win10 { --itt-desktop-bg: #0078d7; }\n"
        'html[data-itt-year="2020"] body.itt-start-page { background: #f3f3f3 !important; color: #111 !important; }\n',
        encoding="utf-8",
    )

    (ROOT / "years/2020/sites/zoom").mkdir(parents=True, exist_ok=True)
    (ROOT / "years/2020/sites/zoom/meeting.html").write_text(zoom_html(), encoding="utf-8")
    (ROOT / "years/2020/sites/zoom/index.html").write_text(zoom_html(), encoding="utf-8")

    star20 = "Zoom Leave"
    for slug, name, verb in Y20_OFFICIAL:
        if slug == "zoom":
            continue
        write_dest("2020", slug, name, verb, star20)
        print("2020 official dest", slug)
    for slug, name, verb in [
        ("amazon", "Amazon leftover", "Cart leftover"),
        ("facebook", "Facebook leftover", "Feed leftover"),
        ("google", "Google leftover", "Search leftover"),
        ("instagram", "Instagram leftover", "Feed leftover"),
        ("youtube", "YouTube leftover", "Watch leftover"),
        ("slack", "Slack leftover", "Message leftover"),
        ("reddit", "Reddit leftover", "Post leftover"),
        ("wikipedia", "Wikipedia leftover", "Read leftover"),
        ("nyt", "NYT leftover", "Read leftover"),
    ]:
        write_dest("2020", slug, name, verb, star20)
        print("2020 lo3x dest", slug)
    for slug, name, verb in Y20_EXTRA:
        write_dest("2020", slug, name, verb, star20)
        print("2020 leftover dest", slug)

    rewrite_rooms("2020")
    print("done dests")


if __name__ == "__main__":
    main()
