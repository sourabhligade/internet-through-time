#!/usr/bin/env python3
"""Dest-true leftover feel on live years. No dest folders. Keys unchanged.

Rewrites leftover plaques, Continuity leftover copy, generic leftover CTAs,
About-this leftover Next labels, and factory hop-strip slugs.
"""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2014", "2018", "2020", "2021", "2022", "2023", "2024", "2025"}
LIVE = [str(y) for y in range(1994, 2026) if str(y) not in WIPED]

spec = importlib.util.spec_from_file_location("af", ROOT / "scripts" / "improve-all-years-af.py")
af = importlib.util.module_from_spec(spec)
spec.loader.exec_module(af)

DEST_NAME = {
    "amz": "Amazon",
    "pp": "PayPal",
    "ps": "PlayStation",
    "nfx": "Netflix",
    "li": "LinkedIn",
    "wiki": "Wikipedia",
    "ig": "Instagram",
    "fb": "Facebook",
    "yt": "YouTube",
    "wa": "WhatsApp",
    "gplus": "Google+",
    "googleplus": "Google+",
    "cl": "Craigslist",
    "ff2": "Firefox 2",
    "saf3": "Safari 3",
    "dbxann": "Dropbox announce",
    "apltv": "Apple TV",
    "fbplat": "Facebook Platform",
    "huluann": "Hulu announce",
    "ipann": "iPhone announce",
    "ipsdk": "iPhone SDK",
    "iptouch": "iPod touch",
    "livesp": "Live Spaces",
    "off07": "Office 2007",
    "gears": "Google Gears",
    "gim": "Google IM",
    "wow": "WoW",
    "wl": "Windows Live",
    "sl": "Second Life",
    "sd": "Slashdot",
    "cont": "Still-here leftover",
    "ie6": "IE6",
    "ie7": "IE7",
    "orkut": "Orkut",
    "steam": "Steam",
    "vista": "Vista",
    "xbox": "Xbox",
    "nintendo": "Nintendo",
    "streetview": "Street View",
    "kindle": "Kindle",
    "maps": "Maps",
    "myspace": "MySpace",
    "tumblr": "Tumblr",
    "stumble": "Stumble",
    "playable": "Year cabinet",
    "personal": "Personal",
    "csotd": "Cool Site",
    "well": "The WELL",
    "mcom": "Mosaic Communications",
    "wwworm": "WWW Worm",
    "weblouvre": "WebLouvre",
    "whitehouse": "White House",
    "startingpoint": "Starting Point leftover dest",
    "firstvirtual": "First Virtual",
    "jumpstation": "JumpStation",
    "netmarket": "NetMarket",
    "pathfinder": "Pathfinder",
    "compuserve": "CompuServe",
    "youvegotmail": "You've Got Mail",
    "netcenter": "Netcenter",
    "hampsterdance": "Hampster Dance",
    "bowienet": "BowieNet",
    "lastfm": "Last.fm",
    "startupfailures": "Startup failures",
    "movabletype": "Movable Type",
    "googlenews": "Google News",
    "adsense": "AdSense",
    "metafilter": "MetaFilter",
    "askjeeves": "Ask Jeeves",
    "tpm": "Talking Points Memo",
    "archive": "Internet Archive",
    "photobucket": "Photobucket",
    "stumbleupon": "StumbleUpon",
    "thefacebook": "thefacebook",
    "chatroulette": "Chatroulette",
    "pokemongo": "Pokémon GO",
    "musically": "musical.ly",
    "appletv": "Apple TV+",
    "windows10": "Windows 10",
    "disneyplus": "Disney+",
    "airpodspro": "AirPods Pro",
    "googlephotos": "Google Photos",
    "applemusic": "Apple Music",
}

FACTORY_HOP = [
    ("dbxann leftover", "Dropbox announce leftover"),
    ("fbplat leftover", "Facebook Platform leftover"),
    ("huluann leftover", "Hulu announce leftover"),
    ("iptouch leftover", "iPod touch leftover"),
    ("ipann leftover", "iPhone announce leftover"),
    ("ipsdk leftover", "iPhone SDK leftover"),
    ("livesp leftover", "Live Spaces leftover"),
    ("apltv leftover", "Apple TV leftover"),
    ("off07 leftover", "Office 2007 leftover"),
    ("saf3 leftover", "Safari 3 leftover"),
    ("gears leftover", "Google Gears leftover"),
    ("nfx leftover", "Netflix leftover"),
    ("amz leftover", "Amazon leftover"),
    ("wow leftover", "WoW leftover"),
    ("ff2 leftover", "Firefox 2 leftover"),
    ("gim leftover", "Google IM leftover"),
    ("wiki leftover", "Wikipedia leftover"),
    ("cl leftover", "Craigslist leftover"),
    ("li leftover", "LinkedIn leftover"),
    ("pp leftover", "PayPal leftover"),
    ("sl leftover", "Second Life leftover"),
    ("sd leftover", "Slashdot leftover"),
    ("wl leftover", "Windows Live leftover"),
    ("yt leftover", "YouTube leftover"),
    ("fb leftover", "Facebook leftover"),
    ("ig leftover", "Instagram leftover"),
    ("wa leftover", "WhatsApp leftover"),
    ("ps leftover", "PlayStation leftover"),
]

LO_SAVE_BTN = re.compile(
    r'(<button\b[^>]*\bdata-lo-save\b[^>]*>)(Open leftover|Save leftover|Next leftover|Type leftover|Do leftover|Save leftover 2×)(</button>)',
    re.I,
)
ABOUT_H1 = re.compile(r"<h1>About this leftover</h1>", re.I)
ABOUT_WHAT = re.compile(r"<h1>What this leftover will not do</h1>", re.I)
ABOUT_A = re.compile(r'(<a href=")([^"]+)("[^>]*>)About this leftover(</a>)', re.I)
WHAT_A = re.compile(r'(<a href=")([^"]+)("[^>]*>)What this leftover will not do(</a>)', re.I)
CONT_P = re.compile(r"<p>Continuity leftover\.</p>", re.I)
CONT_P_REST = re.compile(r"<p>Continuity leftover\.([^<]*)</p>", re.I)
CONT_LABEL = re.compile(
    r'(<label[^>]*>\s*<input[^>]*data-req[^>]*>\s*)Continuity leftover(</label>)',
    re.I,
)


def dest_slug(path: Path) -> str:
    parts = path.parts
    if "sites" in parts:
        i = parts.index("sites")
        if i + 1 < len(parts):
            return parts[i + 1]
    if "pages" in parts:
        return path.stem
    return path.stem


def dest_name(slug: str) -> str:
    if slug in DEST_NAME:
        return DEST_NAME[slug]
    t = slug.replace("-", " ").replace("_", " ").strip()
    specials = {
        "iphone": "iPhone",
        "itunes": "iTunes",
        "ipad": "iPad",
        "ipod": "iPod",
        "imdb": "IMDb",
        "ibm": "IBM",
        "cnn": "CNN",
        "bbc": "BBC",
        "nyt": "NYT",
        "nasa": "NASA",
        "ncsa": "NCSA",
        "cern": "CERN",
        "pbs": "PBS",
        "aol": "AOL",
        "msn": "MSN",
        "aim": "AIM",
        "icq": "ICQ",
        "dmoz": "DMOZ",
        "aws": "AWS",
        "ie8": "IE8",
        "ie9": "IE9",
        "xp": "XP",
        "wow": "WoW",
        "y2k": "Y2K",
    }
    bits = []
    for w in t.split():
        bits.append(specials.get(w.lower(), w[:1].upper() + w[1:] if w else w))
    return " ".join(bits) or slug


def leftover_label(slug: str) -> str:
    name = dest_name(slug)
    if re.search(r"leftover\b", name, re.I):
        return name
    return f"{name} leftover"


def dest_verb(year: str, slug: str) -> str:
    v = af.SLUG_YEAR_VERB.get((year, slug)) or af.SLUG_VERB.get(slug)
    if v and v.lower() not in {"open leftover", "save leftover", "next leftover", "type leftover", "do leftover"}:
        return v
    if slug == "chatroulette":
        return "Next leftover"
    if v:
        return leftover_label(slug)
    return leftover_label(slug)


def href_label(href: str) -> str:
    if "pages/home.html" in href:
        return "Starting Point"
    if "pages/map.html" in href:
        return "Year flow map"
    m = re.search(r"(?:/sites/|\.\./(?:\.\./)*sites/|\.\./)([^/]+)/([^\"?#]+)", href)
    if m:
        slug, rest = m.group(1), m.group(2)
        lab = leftover_label(slug)
        stem = Path(rest).stem
        if stem in {"about", "more"}:
            if stem == "about":
                return f"About {lab}"
            return f"{lab} · more"
        return lab
    m = re.search(r"/pages/([^./]+)", href)
    if m:
        return leftover_label(m.group(1))
    return leftover_label(Path(href).stem)


def rewrite_html(path: Path, year: str) -> bool:
    raw = path.read_text(encoding="utf-8", errors="replace")
    out = raw
    slug = dest_slug(path)
    lab = leftover_label(slug)
    verb = dest_verb(year, slug)

    if "<b>Save leftover</b>" in out:
        out = out.replace("<b>Save leftover</b>", f"<b>{lab}</b>")
    out = out.replace("<b>Save leftover edit</b>", "<b>Edit leftover</b>")
    out = out.replace("<b>Save leftover Top 8</b>", "<b>Top 8 leftover</b>")
    out = out.replace("<b>Save leftover Excite</b>", "<b>Excite leftover</b>")

    def btn_repl(m: re.Match[str]) -> str:
        # Chatroulette period verb stays Next leftover.
        if slug == "chatroulette" and m.group(2).lower() == "next leftover":
            return m.group(0)
        return m.group(1) + verb + m.group(3)

    out = LO_SAVE_BTN.sub(btn_repl, out)

    if slug == "cont" or path.name == "index.html" and slug == "cont":
        out = out.replace("<title>Continuity leftover — 2007</title>", "<title>Still-here leftover — 2007</title>")
        out = out.replace("[failed-final] Continuity leftover ·", "[failed-final] Still-here leftover ·")
        out = out.replace("<h1>Continuity leftover</h1>", "<h1>Still-here leftover</h1>")
        out = out.replace("<p>Mass continuity leftover. Not the chip.</p>", "<p>Mass still-here leftover. Not the chip.</p>")

    out = re.sub(
        r'(<a href="[^"]*cont/index\.html"[^>]*>)Continuity leftover(</a>)',
        r"\1Still-here leftover\2",
        out,
        flags=re.I,
    )
    out = re.sub(
        r">([A-Za-z0-9 +.'’-]+) continuity leftover<",
        lambda m: f">{m.group(1)} leftover<",
        out,
        flags=re.I,
    )
    out = CONT_P.sub(f"<p>{lab}. Not the chip.</p>", out)
    out = CONT_P_REST.sub(lambda m: f"<p>{lab}.{m.group(1)}</p>", out)
    out = CONT_LABEL.sub(lambda m: f"{m.group(1)}{lab}{m.group(2)}", out)

    out = out.replace(
        "Continuity leftover · “Coming soon — buy direct”",
        "Apple leftover · “Coming soon — buy direct”",
    )
    out = out.replace("2014 continuity leftover.", "2014 Slack leftover.")
    out = out.replace("Wikipedia continuity leftover", "Wikipedia leftover")

    if ABOUT_H1.search(out):
        out = ABOUT_H1.sub(f"<h1>About {lab}</h1>", out)
    if ABOUT_WHAT.search(out):
        out = ABOUT_WHAT.sub(f"<h1>What {lab} will not do</h1>", out)

    def about_a(m: re.Match[str]) -> str:
        return m.group(1) + m.group(2) + m.group(3) + href_label(m.group(2)) + m.group(4)

    def what_a(m: re.Match[str]) -> str:
        dest = href_label(m.group(2))
        dest = re.sub(r"^About ", "", dest)
        return m.group(1) + m.group(2) + m.group(3) + f"What {dest} will not do" + m.group(4)

    out = ABOUT_A.sub(about_a, out)
    out = WHAT_A.sub(what_a, out)

    for old, new in FACTORY_HOP:
        out = re.sub(rf"(?<![A-Za-z0-9]){re.escape(old)}", new, out)

    if out != raw:
        path.write_text(out, encoding="utf-8")
        return True
    return False


def rewrite_matrix() -> int:
    path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    n = 0
    for r in rows:
        lab = str(r.get("nextLabel") or "")
        nxt = str(r.get("next") or "")
        if lab.lower() in {"about this leftover", "next leftover", "save leftover", "continuity leftover"}:
            r["nextLabel"] = href_label(nxt)
            n += 1
        title = str(r.get("title") or "")
        if re.search(r"continuity leftover", title, re.I):
            r["title"] = re.sub(r"continuity leftover", "leftover", title, flags=re.I)
            n += 1
    if n:
        path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    return n


def main() -> int:
    files = 0
    for year in LIVE:
        ydir = ROOT / "years" / year
        if not ydir.is_dir():
            continue
        for path in ydir.rglob("*.html"):
            if rewrite_html(path, year):
                files += 1
    matrix_n = rewrite_matrix()
    print(f"dest-true leftover feel rewritten in {files} files")
    print(f"2× matrix leftover labels rewritten {matrix_n}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
