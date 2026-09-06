#!/usr/bin/env python3
"""Improve leftover Next labels + dest-true hops on live years.

No dest folders. No leftover keys changed. No boarded years.
"""
from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

spec = importlib.util.spec_from_file_location(
    "hops", ROOT / "scripts" / "h1-h5-2010-2019-2x-hops.py"
)
hops_mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hops_mod)

WIPED = {"2014", "2018", "2020", "2021", "2022", "2023", "2024", "2025"}
LIVE = [str(y) for y in range(1994, 2026) if str(y) not in WIPED]

SLUG_LABEL = {
    "pizzahut": "Pizza Hut leftover",
    "playable": "Year cabinet leftover",
    "yahoo": "Yahoo leftover",
    "amazon": "Amazon leftover",
    "google": "Google leftover",
    "facebook": "Facebook leftover",
    "youtube": "YouTube leftover",
    "twitter": "Twitter leftover",
    "reddit": "Reddit leftover",
    "wikipedia": "Wikipedia leftover",
    "wiki": "Wikipedia leftover",
    "instagram": "Instagram leftover",
    "tiktok": "TikTok leftover",
    "arcade": "Arcade leftover",
    "stadia": "Stadia leftover",
    "appletv": "Apple TV+ leftover",
    "chrome": "Chrome leftover",
    "windows10": "Windows 10 leftover",
    "disneyplus": "★ Disney+ Continue",
    "gmail": "Gmail leftover",
    "flickr": "Flickr leftover",
    "firefox": "Firefox leftover",
    "ebay": "eBay leftover",
    "napster": "Napster leftover",
    "pets": "Pets leftover",
    "tumblr": "Tumblr leftover",
    "pinterest": "Pinterest leftover",
    "netflix": "Netflix leftover",
    "spotify": "Spotify leftover",
    "snapchat": "Snapchat leftover",
    "fortnite": "Fortnite leftover",
    "teams": "Teams leftover",
    "switch": "Switch leftover",
    "libra": "Libra leftover",
    "cnn": "CNN leftover",
    "bbc": "BBC leftover",
    "nyt": "NYT leftover",
    "digg": "Digg leftover",
    "docs": "Docs leftover",
    "aws": "AWS leftover",
    "reader": "Reader leftover",
    "bebo": "Bebo leftover",
    "time-you": "Time leftover",
    "csotd": "Cool Site leftover",
    "cern": "CERN leftover",
    "ncsa": "NCSA leftover",
    "iuma": "IUMA leftover",
    "hotwired": "HotWired leftover",
    "fishcam": "FishCam leftover",
    "well": "WELL leftover",
    "webcrawler": "WebCrawler leftover",
    "altavista": "AltaVista leftover",
    "hotmail": "HoTMaiL leftover",
    "excite": "Excite leftover",
    "pointcast": "PointCast leftover",
    "aim": "AIM leftover",
    "paypal": "PayPal leftover",
    "photobucket": "Photobucket leftover",
    "stumbleupon": "Stumble leftover",
    "stumble": "Stumble leftover",
    "myspace": "MySpace leftover",
    "wordpress": "WordPress leftover",
    "github": "GitHub leftover",
    "periscope": "Periscope leftover",
    "pokemongo": "Pokémon GO leftover",
    "musically": "musical.ly leftover",
    "vine": "Vine leftover",
    "kindle": "Kindle leftover",
    "streetview": "Street View leftover",
    "maps": "Maps leftover",
    "gmail": "Gmail leftover",
}

GOLD_HOPS = {
    "1994": [("yahoo", "Yahoo leftover"), ("cern", "CERN leftover"), ("ncsa", "NCSA leftover"), ("pizzahut", "Pizza Hut leftover")],
    "1995": [("yahoo", "Yahoo leftover"), ("amazon", "Amazon leftover"), ("webcrawler", "WebCrawler leftover")],
    "1996": [("yahoo", "Yahoo leftover"), ("hotmail", "HoTMaiL leftover"), ("excite", "Excite leftover")],
    "1997": [("ebay", "eBay leftover"), ("slashdot", "Slashdot leftover"), ("hotmail", "HoTMaiL leftover")],
    "1998": [("yahoo", "Yahoo leftover"), ("amazon", "Amazon leftover"), ("google", "Google leftover")],
    "1999": [("ebay", "eBay leftover"), ("paypal", "PayPal leftover"), ("napster", "Napster leftover")],
    "2000": [("yahoo", "Yahoo leftover"), ("amazon", "Amazon leftover"), ("ebay", "eBay leftover"), ("napster", "Napster leftover"), ("pets", "Pets leftover")],
    "2001": [("wikipedia", "Wikipedia leftover"), ("apple", "Apple leftover"), ("itunes", "iTunes leftover")],
    "2002": [("stumbleupon", "Stumble leftover"), ("wikipedia", "Wikipedia leftover")],
    "2003": [("photobucket", "Photobucket leftover"), ("myspace", "MySpace leftover"), ("wordpress", "WordPress leftover")],
    "2004": [("gmail", "Gmail leftover"), ("flickr", "Flickr leftover"), ("firefox", "Firefox leftover"), ("yahoo", "Yahoo leftover"), ("amazon", "Amazon leftover")],
    "2005": [("youtube", "YouTube leftover"), ("maps", "Maps leftover"), ("reddit", "Reddit leftover")],
    "2006": [("twitter", "Twitter leftover"), ("youtube", "YouTube leftover"), ("facebook", "Facebook leftover")],
    "2007": [("gmail", "Gmail leftover"), ("facebook", "Facebook leftover"), ("twitter", "Twitter leftover"), ("youtube", "YouTube leftover"), ("tumblr", "Tumblr leftover")],
    "2008": [("github", "GitHub leftover"), ("chrome", "Chrome leftover"), ("facebook", "Facebook leftover")],
    "2009": [("facebook", "Facebook leftover"), ("youtube", "YouTube leftover"), ("twitter", "Twitter leftover")],
}

GOLD_FILE = {
    "1994": "sites/csotd/index.html",
    "1995": "sites/amazon/ssl-checkout.html",
    "1996": "sites/portals/wars.html",
    "1997": "sites/pointcast/index.html",
    "1998": "sites/google/lucky.html",
    "1999": "sites/aim/index.html",
    "2000": "sites/mapquest/index.html",
    "2001": "sites/wikipedia/edit.html",
    "2002": "sites/stumbleupon/index.html",
    "2003": "sites/photobucket/index.html",
    "2004": "sites/facebook/networks.html",
    "2005": "sites/youtube/upload.html",
    "2006": "sites/twitter/index.html",
    "2007": "sites/iphone/index.html",
    "2008": "sites/github/issue.html",
    "2009": "sites/facebook/index.html",
    "2010": "sites/instagram/index.html",
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/record.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2019": "sites/disneyplus/home.html",
}

NEXT_RE = re.compile(
    r'(<p[^>]*data-next-flow[^>]*>.*?<a href=")([^"]+)("[^>]*>)([^<]*)(</a>)',
    re.S,
)


def slug_from_href(href: str) -> str:
    m = re.search(r"(?:/sites/|\.\./)([^/]+)/", href)
    if m:
        return m.group(1)
    m = re.search(r"/pages/([^./]+)", href)
    if m:
        return m.group(1)
    return ""


def label_for(href: str) -> str:
    if "pages/home.html" in href:
        return "Starting Point"
    if "pages/map.html" in href:
        return "Year flow map"
    slug = slug_from_href(href)
    if slug in SLUG_LABEL:
        return SLUG_LABEL[slug]
    if slug:
        return slug.replace("-", " ").title() + " leftover"
    return "Next leftover"


def rel_from_abs(src: Path, href: str, year: str) -> str:
    if not href.startswith("/years/"):
        return href
    dest = Path(href.lstrip("/"))
    if not dest.exists():
        return href
    try:
        rel = Path(os_rel(src.parent, dest))
        return str(rel).replace("\\", "/")
    except Exception:
        return href


def os_rel(src_dir: Path, dest: Path) -> str:
    import os

    return os.path.relpath(dest, src_dir)


def fix_nexts(year: str) -> int:
    n = 0
    for path in (ROOT / "years" / year).rglob("*.html"):
        raw = path.read_text(encoding="utf-8", errors="replace")
        if "data-next-flow" not in raw:
            continue

        def repl(m: re.Match[str]) -> str:
            pre, href, mid, lab, end = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5)
            new_href = rel_from_abs(path, href, year)
            new_lab = lab
            if lab.strip().lower() in ("next leftover", "next", "leftover"):
                new_lab = label_for(new_href)
            if new_href == href and new_lab == lab:
                return m.group(0)
            return pre + new_href + mid + new_lab + end

        new = NEXT_RE.sub(repl, raw)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            n += 1
    return n


def ensure_gold_hops(year: str) -> bool:
    hops = GOLD_HOPS.get(year) or hops_mod.MASS.get(year)
    gold = GOLD_FILE.get(year)
    if not hops or not gold:
        return False
    path = ROOT / "years" / year / gold
    if not path.is_file():
        return False
    html = path.read_text(encoding="utf-8", errors="replace")
    dest = hops_mod.dest_of(path, year) or ""
    pairs = [(s, l) for s, l in hops if s != dest and hops_mod.dest_href(s, year)]
    if not pairs:
        return False
    new = hops_mod.ensure_3x(html, year, pairs)
    new = hops_mod.ensure_2x(new, year, pairs)
    if new != html:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def main() -> int:
    print("flows + links · live years · dests on disk only")
    next_n = 0
    gold_n = 0
    for year in LIVE:
        next_n += fix_nexts(year)
        if ensure_gold_hops(year):
            gold_n += 1
            print(f"  {year} gold hops stamped")
    print(f"Next labels/hrefs rewritten in {next_n} files")
    print(f"gold hop strips updated {gold_n}")
    hop_years = [y for y in hops_mod.MASS if y in LIVE]
    print("H1–H5 dest hops", ",".join(hop_years))
    for year in hop_years:
        scanned, changed = hops_mod.process_year(year)
        dests, htmln = hops_mod.count_tree(year)
        print(f"  {year} scanned={scanned} rewritten={changed} dests={len(dests)} html={htmln}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
