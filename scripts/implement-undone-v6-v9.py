#!/usr/bin/env python3
"""Paint leftover-3× off official dests + stamp 2015 official keys.

Named cut: leftover-3× honesty for years that fail V6.
Does not add dest folders. Does not unboard wiped years.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year -> (first3, second3, third3) as (slug, label)
PAINT: dict[str, tuple[list[tuple[str, str]], list[tuple[str, str]], list[tuple[str, str]]]] = {
    "2005": (
        [("milliondollar", "Million Dollar Homepage"), ("clubpenguin", "Club Penguin"), ("kayak", "Kayak")],
        [("firefox", "Firefox leftover"), ("gmail", "Gmail leftover"), ("vimeo", "Vimeo leftover")],
        [("maps", "Maps leftover"), ("reddit", "Reddit leftover"), ("digg", "Digg leftover")],
    ),
    "2006": (
        [("flickr", "Flickr leftover"), ("gmail", "Gmail leftover"), ("reddit", "Reddit leftover")],
        [("myspace", "MySpace leftover"), ("delicious", "del.icio.us leftover"), ("digg", "Digg leftover")],
        [("googledocs", "Google Docs leftover"), ("roblox", "Roblox leftover"), ("ie7", "IE7 leftover")],
    ),
    "2007": (
        [("wiki", "Wikipedia leftover"), ("myspace", "MySpace leftover"), ("maps", "Maps leftover")],
        [("ebay", "eBay leftover"), ("stumble", "Stumble leftover"), ("wow", "WoW leftover")],
        [("digg", "Digg leftover"), ("flickr", "Flickr leftover"), ("reddit", "Reddit leftover")],
    ),
    "2009": (
        [("omegle", "Omegle"), ("chatroulette", "Chatroulette"), ("wikipedia", "Wikipedia leftover")],
        [("android", "Android leftover"), ("kindle", "Kindle leftover"), ("reddit", "Reddit leftover")],
        [("youtube", "YouTube leftover"), ("myspace", "MySpace leftover"), ("wave", "Wave leftover")],
    ),
    "2014": (
        [("snapchat", "Snapchat leftover"), ("instagram", "Instagram leftover"), ("uber", "Uber leftover")],
        [("oculus", "Oculus leftover"), ("serial", "Serial leftover"), ("ello", "Ello leftover")],
        [("youtube", "YouTube leftover"), ("wikipedia", "Wikipedia leftover"), ("facebook", "Facebook leftover")],
    ),
    "2021": (
        [("youtube", "YouTube leftover"), ("wikipedia", "Wikipedia leftover"), ("discord", "Discord leftover")],
        [("clubhouse", "Clubhouse leftover"), ("nft", "NFT leftover"), ("squid", "Squid Game leftover")],
        [("tiktok", "TikTok leftover"), ("instagram", "Instagram leftover"), ("reddit", "Reddit leftover")],
    ),
    "2022": (
        [("youtube", "YouTube leftover"), ("wikipedia", "Wikipedia leftover"), ("facebook", "Facebook leftover")],
        [("ftx", "FTX leftover"), ("steamdeck", "Steam Deck leftover"), ("passkeys", "Passkeys leftover")],
        [("tiktok", "TikTok leftover"), ("midjourney", "Midjourney leftover"), ("lensa3", "Lensa leftover")],
    ),
}

OFFICIAL_2015 = [
    ("sites/periscope/index.html", "itt15-periscope"),
    ("sites/googlephotos/index.html", "itt15-googlephotos"),
    ("sites/windows10/index.html", "itt15-win10"),
    ("sites/applemusic/index.html", "itt15-applemusic"),
    ("sites/edge/index.html", "itt15-edge"),
    ("sites/apple/watch.html", "itt15-watch"),
    ("sites/snapchat/discover.html", "itt15-snap-discover"),
    ("sites/discord/index.html", "itt15-discord"),
    ("sites/letsencrypt/index.html", "itt15-le"),
    ("sites/playable/game.html", "itt15-game-blobrush"),
]


def links(rows: list[tuple[str, str]], prefix: str = "../sites/") -> str:
    return " · ".join(f'<a href="{prefix}{s}/index.html">{lab}</a>' for s, lab in rows)


def strip_html(year: str, kind: str, rows: list[tuple[str, str]]) -> str:
    attr = {
        "first": f'data-itt-pop3x="{year}" class="itt-pop3x"',
        "second": f'data-itt-pop-more="{year}" class="itt-pop-more"',
        "third": f'data-itt-pop-3x3="{year}" class="itt-pop-3x3"',
    }[kind]
    title = {
        "first": "Also this year · 3×",
        "second": "3 more leftovers",
        "third": "3 more leftovers",
    }[kind]
    note = {
        "first": "not the chip",
        "second": "new doors · not the chip · not the first 3×",
        "third": "third trio · not the chip · not the first 3×",
    }[kind]
    return (
        f'<p {attr} style="font-size:12px;margin:10px auto;padding:8px;'
        f'border:1px solid #333;max-width:720px"><b>{title}</b> ({note}): '
        f"{links(rows)} · pick + honesty · empty never writes</p>"
    )


def replace_attr_block(text: str, attr: str, new: str) -> tuple[str, int]:
    pat = re.compile(rf"<p[^>]*{re.escape(attr)}[^>]*>[\s\S]*?</p>", re.I)
    n = 0

    def repl(_m: re.Match) -> str:
        nonlocal n
        n += 1
        return new

    return pat.sub(repl, text), n


def paint_html(text: str, year: str) -> tuple[str, dict[str, int]]:
    first, second, third = PAINT[year]
    counts = {}
    for kind, rows, attr in (
        ("first", first, f'data-itt-pop3x="{year}"'),
        ("second", second, f'data-itt-pop-more="{year}"'),
        ("third", third, f'data-itt-pop-3x3="{year}"'),
    ):
        text, n = replace_attr_block(text, attr, strip_html(year, kind, rows))
        counts[kind] = n
    # If second strip is missing, insert after first or at a marker.
    if counts["second"] == 0:
        first_block = strip_html(year, "first", first)
        second_block = strip_html(year, "second", second)
        if counts["first"]:
            text = text.replace(first_block, first_block + "\n" + second_block, 1)
            counts["second"] = 1
        else:
            marker = f'data-itt-year="{year}"'
            # append near start extra host if present
            if "itt-year-start-extra" in text or "itt-pop" in text:
                text = text.replace("</body>", second_block + "\n</body>", 1)
                counts["second"] = 1
    return text, counts


def patch_start_extra() -> None:
    path = ROOT / "ui" / "year" / "start-extra.js"
    raw = path.read_text(encoding="utf-8")
    # Extract the object body after START_EXTRA =
    m = re.search(r"(ITT\.YearUI\.START_EXTRA\s*=\s*)(\{[\s\S]*\})(\s*;\s*\}\)\([^)]*\)\s*;?\s*)$", raw)
    if not m:
        # file is IIFE wrapping the object
        m = re.search(r"(START_EXTRA\s*=\s*)(\{[\s\S]*\n\s*\})(\s*;[\s\S]*)$", raw)
    if not m:
        raise SystemExit("could not parse ui/year/start-extra.js")
    prefix, obj_src, suffix = m.group(1), m.group(2), m.group(3)
    # Safer: replace per-year quoted strings in place
    for year in PAINT:
        ym = re.search(rf'("{year}"\s*:\s*")((?:\\.|[^"\\])*)(")', raw)
        if not ym:
            print("start-extra missing", year)
            continue
        html = bytes(ym.group(2), "utf-8").decode("unicode_escape")
        painted, counts = paint_html(html, year)
        esc = (
            painted.replace("\\", "\\\\")
            .replace('"', '\\"')
            .replace("\n", "\\n")
            .replace("\r", "")
        )
        raw = raw[: ym.start(2)] + esc + raw[ym.end(2) :]
        print(f"start-extra {year} painted {counts}")
    path.write_text(raw, encoding="utf-8")


def patch_home_and_map() -> None:
    for year, (first, second, third) in PAINT.items():
        for rel in (f"years/{year}/pages/home.html", f"years/{year}/pages/map.html"):
            path = ROOT / rel
            if not path.is_file():
                continue
            text = path.read_text(encoding="utf-8", errors="replace")
            painted, counts = paint_html(text, year)
            if counts["second"] == 0 and path.name == "home.html":
                # insert before </body> or after guided
                painted = text.replace("</body>", strip_html(year, "second", second) + "\n</body>", 1)
                counts["second"] = 1
            if painted != text:
                path.write_text(painted, encoding="utf-8")
            print(f"{rel} painted {counts}")


def patch_json() -> None:
    p3_path = ROOT / "scripts" / "popular-3x-sites.json"
    p3 = json.loads(p3_path.read_text(encoding="utf-8"))
    p33_path = ROOT / "scripts" / "popular-3x3-sites.json"
    p33 = json.loads(p33_path.read_text(encoding="utf-8"))
    maps = ROOT / "js" / "config" / "flow-maps-popular-3x.js"
    maps_txt = maps.read_text(encoding="utf-8")
    for year, (first, second, third) in PAINT.items():
        def rows(pairs):
            out = []
            for slug, label in pairs:
                out.append(
                    {
                        "id": slug,
                        "name": label.split(" leftover")[0],
                        "title": f"{label} — {year}",
                        "why": f"{year} leftover 3×. Not the chip.",
                        "verb": "Pick leftover then go.",
                        "ph": "leftover",
                        "btn": "Open leftover",
                        "bg": "#111",
                        "fg": "#fff",
                    }
                )
            return out

        p3[year] = rows(first)
        p33[year] = rows(third)
        pipe = ",".join(f'"{s}|{lab}"' for s, lab in first)
        maps_txt, n = re.subn(
            rf'"{year}":\s*\[[^\]]*\]',
            f'"{year}": [{pipe}]',
            maps_txt,
            count=1,
        )
        print(f"json {year} first={ [s for s,_ in first] } third={ [s for s,_ in third] } map={n}")
    p3_path.write_text(json.dumps(p3, indent=2) + "\n", encoding="utf-8")
    p33_path.write_text(json.dumps(p33, indent=2) + "\n", encoding="utf-8")
    maps.write_text(maps_txt, encoding="utf-8")


def stamp_2015_keys() -> None:
    for rel, key in OFFICIAL_2015:
        path = ROOT / "years" / "2015" / rel
        if not path.is_file():
            print("missing 2015 dest", rel)
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        if f'data-official-key="{key}"' in text:
            print("already", rel, key)
            continue
        new, n = re.subn(
            r"<html([^>]*)>",
            lambda m: (
                f'<html{m.group(1)} data-official-key="{key}">'
                if "data-official-key=" not in m.group(1)
                else m.group(0)
            ),
            text,
            count=1,
            flags=re.I,
        )
        if n == 0:
            print("no html tag", rel)
            continue
        path.write_text(new, encoding="utf-8")
        print("stamped", rel, key)


STAR_COPY = re.compile(
    r'(<input type="checkbox" data-lo-req>\s*)([^<]+is the star\.[^<]*)',
    re.I,
)


def dest_true_copy() -> None:
    years = ["2011", "2014", "2015", "2021"]
    n = 0
    for year in years:
        for f in (ROOT / "years" / year).rglob("*.html"):
            text = f.read_text(encoding="utf-8", errors="replace")
            dest = f.parent.name if f.parent.name != "sites" else f.stem

            def repl(m: re.Match) -> str:
                return (
                    m.group(1)
                    + f"This leftover is {dest}, not the {year} star. Incomplete never writes."
                )

            new, c = STAR_COPY.subn(repl, text, count=1)
            if c:
                f.write_text(new, encoding="utf-8")
                n += c
    print("dest-true leftover labels", n)


def main() -> None:
    for year, (first, second, third) in PAINT.items():
        for slug, _ in first + second + third:
            p = ROOT / "years" / year / "sites" / slug / "index.html"
            if not p.is_file():
                print("MISSING dest", year, slug)
    patch_json()
    patch_home_and_map()
    patch_start_extra()
    stamp_2015_keys()
    dest_true_copy()


if __name__ == "__main__":
    main()
