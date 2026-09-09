#!/usr/bin/env python3
"""Paint leftover-3× ×3 for 1994–1998. Famous-that-year dests only. No new folders."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STAR = {
    "1994": "Cool Site of the Day",
    "1995": "Amazon SSL",
    "1996": "Portal wars",
    "1997": "PointCast",
    "1998": "I'm Feeling Lucky",
}

WHY = {
    "1994": "1994 leftover. Cool Site of the Day is the chip. Mosaic / 14.4.",
    "1995": "1995 leftover. Amazon SSL is the chip. AOL is #1 visits.",
    "1996": "1996 leftover. Portal wars is the chip. Space Jam leftover.",
    "1997": "1997 leftover. PointCast is the chip. eBay / ICQ leftover.",
    "1998": "1998 leftover. I'm Feeling Lucky is the chip. Yahoo is loud.",
}

PLAN = {
    "1994": {
        "first": [
            ("pizzahut", "Pizza Hut leftover"),
            ("netmarket", "NetMarket leftover"),
            ("imdb", "IMDb leftover"),
            ("prodigy", "Prodigy leftover"),
            ("pathfinder", "Pathfinder leftover"),
            ("cnn", "CNN leftover"),
            ("apple", "Apple leftover"),
            ("bbc", "BBC leftover"),
            ("microsoft", "Microsoft leftover"),
        ],
        "second": [
            ("ibm", "IBM leftover"),
            ("webcrawler", "WebCrawler leftover"),
            ("ncsa", "NCSA leftover"),
            ("infoseek", "Infoseek leftover"),
            ("mcom", "Mosaic leftover"),
            ("gnn", "GNN leftover"),
            ("well", "WELL leftover"),
            ("time", "TIME leftover"),
            ("nyt", "NYT leftover"),
        ],
        "third": [
            ("yahoo", "Yahoo leftover"),
            ("cern", "CERN leftover"),
            ("fishcam", "Fish Cam leftover"),
            ("whitehouse", "White House leftover"),
            ("nasa", "NASA leftover"),
            ("iuma", "IUMA leftover"),
            ("hotwired", "HotWired leftover"),
            ("lycos", "Lycos leftover"),
            ("compuserve", "CompuServe leftover"),
        ],
    },
    "1995": {
        "first": [
            ("espn", "ESPNet leftover"),
            ("cnet", "c|net leftover"),
            ("timewarner", "Time Warner leftover"),
            ("hotbot", "HotBot leftover"),
            ("aol", "AOL leftover"),
            ("apple", "Apple leftover"),
            ("ibm", "IBM leftover"),
            ("infoseek", "Infoseek leftover"),
            ("nyt", "NYT leftover"),
        ],
        "second": [
            ("pathfinder", "Pathfinder leftover"),
            ("wsj", "WSJ leftover"),
            ("salon", "Salon leftover"),
            ("tripod", "Tripod leftover"),
            ("suck", "Suck leftover"),
            ("zdnet", "ZDNet leftover"),
            ("weather", "Weather leftover"),
            ("well", "WELL leftover"),
            ("pbs", "PBS leftover"),
        ],
        "third": [
            ("auctionweb", "AuctionWeb leftover"),
            ("geocities", "GeoCities leftover"),
            ("yahoo", "Yahoo leftover"),
            ("altavista", "AltaVista leftover"),
            ("cnn", "CNN leftover"),
            ("microsoft", "Microsoft leftover"),
            ("netscape", "Netscape leftover"),
            ("classmates", "Classmates leftover"),
            ("loc", "LoC leftover"),
        ],
    },
    "1996": {
        "first": [
            ("totalny", "TotalNY leftover"),
            ("pathfinder", "Pathfinder leftover"),
            ("hotbot", "HotBot leftover"),
            ("craigslist", "Craigslist leftover"),
            ("icq", "ICQ leftover"),
            ("espn", "ESPN leftover"),
            ("disney", "Disney leftover"),
            ("archive", "Archive leftover"),
            ("askjeeves", "Ask Jeeves leftover"),
        ],
        "second": [
            ("mtv", "MTV leftover"),
            ("cnn", "CNN leftover"),
            ("microsoft", "Microsoft leftover"),
            ("netscape", "Netscape leftover"),
            ("suck", "Suck leftover"),
            ("tripod", "Tripod leftover"),
            ("zdnet", "ZDNet leftover"),
            ("well", "WELL leftover"),
            ("weather", "Weather leftover"),
        ],
        "third": [
            ("hotmail", "HoTMaiL leftover"),
            ("spacejam", "Space Jam leftover"),
            ("yahoo", "Yahoo leftover"),
            ("geocities", "GeoCities leftover"),
            ("amazon", "Amazon leftover"),
            ("auctionweb", "AuctionWeb leftover"),
            ("excite", "Excite leftover"),
            ("altavista", "AltaVista leftover"),
            ("angelfire", "Angelfire leftover"),
        ],
    },
    "1997": {
        "first": [
            ("newscom", "News.com leftover"),
            ("drudgereport", "Drudge leftover"),
            ("hotwired", "HotWired leftover"),
            ("winamp", "Winamp leftover"),
            ("netflix", "Netflix leftover"),
            ("amazon", "Amazon leftover"),
            ("yahoo", "Yahoo leftover"),
            ("cnn", "CNN leftover"),
            ("geocities", "GeoCities leftover"),
        ],
        "second": [
            ("netscape", "Netscape leftover"),
            ("altavista", "AltaVista leftover"),
            ("espn", "ESPN leftover"),
            ("disney", "Disney leftover"),
            ("lycos", "Lycos leftover"),
            ("goto", "GoTo leftover"),
            ("suck", "Suck leftover"),
            ("tripod", "Tripod leftover"),
            ("zdnet", "ZDNet leftover"),
        ],
        "third": [
            ("icq", "ICQ leftover"),
            ("ebay", "eBay leftover"),
            ("hotmail", "HoTMaiL leftover"),
            ("slashdot", "Slashdot leftover"),
            ("drudge", "Drudge leftover"),
            ("hotbot", "HotBot leftover"),
            ("aim", "AIM leftover"),
            ("apple", "Apple leftover"),
            ("microsoft", "Microsoft leftover"),
        ],
    },
    "1998": {
        "first": [
            ("opendiary", "Open Diary leftover"),
            ("icqweb", "ICQ Web leftover"),
            ("broadcastcom", "broadcast.com leftover"),
            ("go", "GO leftover"),
            ("excite", "Excite leftover"),
            ("geocities", "GeoCities leftover"),
            ("aol", "AOL leftover"),
            ("lycos", "Lycos leftover"),
            ("winamp", "Winamp leftover"),
        ],
        "second": [
            ("cnn", "CNN leftover"),
            ("microsoft", "Microsoft leftover"),
            ("netscape", "Netscape leftover"),
            ("icq", "ICQ leftover"),
            ("altavista", "AltaVista leftover"),
            ("about", "About leftover"),
            ("gamespot", "GameSpot leftover"),
            ("valve", "Valve leftover"),
            ("youvegotmail", "You've Got Mail leftover"),
        ],
        "third": [
            ("yahoo", "Yahoo leftover"),
            ("amazon", "Amazon leftover"),
            ("ebay", "eBay leftover"),
            ("cdnow", "CDnow leftover"),
            ("hotmail", "HoTMaiL leftover"),
            ("mozilla", "Mozilla leftover"),
            ("slashdot", "Slashdot leftover"),
            ("dmoz", "DMOZ leftover"),
            ("go", "GO leftover"),
        ],
    },
}

# 1998 first already uses go; third last dest must stay unique.
PLAN["1998"]["third"][-1] = ("snap", "Snap leftover")


def row(year: str, slug: str, name: str) -> dict:
    return {
        "id": slug,
        "name": name.replace(" leftover", ""),
        "title": f"{name} — {year}",
        "why": WHY[year],
        "verb": "Pick leftover then go.",
        "ph": "leftover",
        "btn": "Open leftover",
        "bg": "#111",
        "fg": "#fff",
    }


def extract_js_string(src: str, year: str):
    key = f'"{year}":'
    i = src.find(key)
    if i < 0:
        return None
    q = src.find('"', i + len(key))
    if q < 0:
        return None
    q += 1
    out = []
    j = q
    while j < len(src):
        c = src[j]
        if c == "\\":
            nxt = src[j + 1] if j + 1 < len(src) else ""
            mapping = {"n": "\n", "t": "\t", '"': '"', "'": "'", "\\": "\\"}
            out.append(mapping.get(nxt, nxt))
            j += 2
            continue
        if c == '"':
            return "".join(out), q, j
        out.append(c)
        j += 1
    return None


def escape_js_string(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def strip_html(year: str, kind: str, items: list[tuple[str, str]]) -> str:
    cls = {"first": "itt-pop3x", "second": "itt-pop-more", "third": "itt-pop-3x3"}[kind]
    attr = {"first": "data-itt-pop3x", "second": "data-itt-pop-more", "third": "data-itt-pop-3x3"}[kind]
    label = {
        "first": "Also this year · 3×",
        "second": "3 more leftovers",
        "third": "3 more leftovers",
    }[kind]
    links = " · ".join(f'<a href="../sites/{slug}/index.html">{name}</a>' for slug, name in items)
    return (
        f'<p class="{cls}" {attr}="{year}" '
        f'style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px">'
        f"<b>{label}</b> (not the chip · empty never writes): {links} · pick + honesty</p>"
    )


def upsert_strips_in_html(html: str, year: str) -> str:
    plan = PLAN[year]
    blocks = {
        "first": strip_html(year, "first", plan["first"]),
        "second": strip_html(year, "second", plan["second"]),
        "third": strip_html(year, "third", plan["third"]),
    }
    pats = {
        "first": rf'<p[^>]*data-itt-pop3x="{year}"[^>]*>.*?</p>',
        "second": rf'<p[^>]*data-itt-pop-more="{year}"[^>]*>.*?</p>',
        "third": rf'<p[^>]*data-itt-pop-3x3="{year}"[^>]*>.*?</p>',
    }
    out = html
    for kind, pat in pats.items():
        if re.search(pat, out, re.I | re.S):
            out = re.sub(pat, blocks[kind], out, count=1, flags=re.I | re.S)
        else:
            out = blocks[kind] + "\n" + out
    return out


def write_jsons() -> None:
    p3 = json.loads((ROOT / "scripts/popular-3x-sites.json").read_text())
    p33 = json.loads((ROOT / "scripts/popular-3x3-sites.json").read_text())
    for year, plan in PLAN.items():
        p3[year] = [row(year, s, n) for s, n in plan["first"]]
        p33[year] = [row(year, s, n) for s, n in plan["third"]]
    (ROOT / "scripts/popular-3x-sites.json").write_text(json.dumps(p3, indent=2) + "\n")
    (ROOT / "scripts/popular-3x3-sites.json").write_text(json.dumps(p33, indent=2) + "\n")


def write_flow_map() -> None:
    path = ROOT / "js/config/flow-maps-popular-3x.js"
    text = path.read_text(encoding="utf-8")
    for year, plan in PLAN.items():
        items = ",".join(f'"{s}|{n}"' for s, n in plan["first"])
        pat = rf'"{year}":\s*\[[^\]]*\]'
        repl = f'"{year}": [{items}]'
        if re.search(pat, text):
            text = re.sub(pat, repl, text, count=1)
        else:
            text = text.replace("var POP = {", "var POP = {\n    " + repl + ",", 1)
    path.write_text(text, encoding="utf-8")


def write_home_and_extra() -> None:
    extra_path = ROOT / "ui/year/start-extra.js"
    extra = extra_path.read_text(encoding="utf-8")
    for year, plan in PLAN.items():
        home = ROOT / f"years/{year}/pages/home.html"
        if home.is_file():
            ht = home.read_text(encoding="utf-8", errors="replace")
            marker = f"<!-- ITT-LO3X-X3:{year}:start -->"
            block = (
                f"{marker}\n"
                + strip_html(year, "first", plan["first"])
                + "\n"
                + strip_html(year, "second", plan["second"])
                + "\n"
                + strip_html(year, "third", plan["third"])
                + f"\n<!-- ITT-LO3X-X3:{year}:end -->\n"
            )
            if marker in ht:
                ht = re.sub(
                    rf"<!-- ITT-LO3X-X3:{year}:start -->.*?<!-- ITT-LO3X-X3:{year}:end -->\n?",
                    block,
                    ht,
                    count=1,
                    flags=re.S,
                )
            else:
                ht = re.sub(r"(<body[^>]*>)", r"\1\n" + block, ht, count=1, flags=re.I)
            home.write_text(ht, encoding="utf-8")
        got = extract_js_string(extra, year)
        if not got:
            print("no start-extra", year)
            continue
        html, a, b = got
        extra = extra[:a] + escape_js_string(upsert_strips_in_html(html, year)) + extra[b:]
    extra_path.write_text(extra, encoding="utf-8")


def main() -> None:
    missing = []
    for year, plan in PLAN.items():
        for kind in ("first", "second", "third"):
            for slug, _n in plan[kind]:
                p = ROOT / f"years/{year}/sites/{slug}/index.html"
                if not p.is_file():
                    missing.append(f"{year}/{slug}")
    if missing:
        raise SystemExit("missing dests: " + ", ".join(missing))
    write_jsons()
    write_flow_map()
    write_home_and_extra()
    print("painted 1994-1998 leftover-3x unique dests")


if __name__ == "__main__":
    main()
