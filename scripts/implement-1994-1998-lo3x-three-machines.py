#!/usr/bin/env python3
"""Dest-true leftover-3× + 3 machines/legal dest for 1994–1998."""
from __future__ import annotations

import json
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
old_spec = importlib.util.spec_from_file_location("old", ROOT / "scripts/implement-2010-2015-lo3x-real.py")
old = importlib.util.module_from_spec(old_spec)
old_spec.loader.exec_module(old)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-1994-1998-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

DEFAULT = dict(old.DEFAULT)
DEFAULT.update(
    {
        "pizzahut": ("name leftover pizza then order theater", "pepperoni", "Pizza Hut leftover", "live-charge (trap)"),
        "netmarket": ("name leftover item then buy theater", "CD", "NetMarket leftover", "live-charge (trap)"),
        "prodigy": ("open leftover Prodigy then honesty", "Prodigy", "Prodigy leftover", "empty (trap)"),
        "pathfinder": ("open leftover Pathfinder then honesty", "Pathfinder", "Pathfinder leftover", "empty (trap)"),
        "compuserve": ("open leftover CompuServe then honesty", "forum", "CompuServe leftover", "empty (trap)"),
        "cern": ("open leftover WWW then honesty", "WWW", "CERN leftover", "empty (trap)"),
        "fishcam": ("watch leftover Fish Cam then honesty", "fish", "Fish Cam leftover", "empty (trap)"),
        "whitehouse": ("open leftover White House then honesty", "tour", "White House leftover", "empty (trap)"),
        "nasa": ("open leftover KSC then honesty", "KSC", "NASA leftover", "empty (trap)"),
        "iuma": ("listen leftover IUMA then honesty", "track", "IUMA leftover", "empty (trap)"),
        "hotwired": ("open leftover HotWired then honesty", "HotWired", "HotWired leftover", "empty (trap)"),
        "lycos": ("search leftover catalog then honesty", "web", "Lycos leftover", "empty (trap)"),
        "gnn": ("open leftover GNN then honesty", "GNN", "GNN leftover", "empty (trap)"),
        "well": ("open leftover WELL then honesty", "WELL", "WELL leftover", "empty (trap)"),
        "mcom": ("download leftover Mosaic then honesty", "Mosaic", "Mosaic leftover", "empty (trap)"),
        "ncsa": ("open leftover NCSA then honesty", "Mosaic", "NCSA leftover", "empty (trap)"),
        "webcrawler": ("search leftover then honesty", "query", "WebCrawler leftover", "empty (trap)"),
        "cnet": ("open leftover c|net then honesty", "news", "c|net leftover", "empty (trap)"),
        "timewarner": ("open leftover Pathfinder then honesty", "Pathfinder", "Time Warner leftover", "empty (trap)"),
        "auctionweb": ("bid leftover then honesty", "bid", "AuctionWeb leftover", "live-charge (trap)"),
        "classmates": ("find leftover classmate then honesty", "school", "Classmates leftover", "empty (trap)"),
        "wsj": ("open leftover WSJ then honesty", "headline", "WSJ leftover", "paywall-skip (trap)"),
        "salon": ("open leftover Salon then honesty", "essay", "Salon leftover", "empty (trap)"),
        "suck": ("open leftover Suck then honesty", "Suck", "Suck leftover", "empty (trap)"),
        "zdnet": ("open leftover ZDNet then honesty", "download", "ZDNet leftover", "empty (trap)"),
        "totalny": ("open leftover TotalNY then honesty", "NYC", "TotalNY leftover", "empty (trap)"),
        "spacejam": ("click leftover planet then honesty", "planet", "Space Jam leftover", "empty (trap)"),
        "angelfire": ("build leftover page then honesty", "page", "Angelfire leftover", "empty (trap)"),
        "newscom": ("open leftover News.com then honesty", "headline", "News.com leftover", "empty (trap)"),
        "drudgereport": ("open leftover Drudge then honesty", "scoop", "Drudge leftover", "empty (trap)"),
        "drudge": ("open leftover Drudge then honesty", "scoop", "Drudge leftover", "empty (trap)"),
        "goto": ("bid leftover keyword then honesty", "keyword", "GoTo leftover", "empty (trap)"),
        "opendiary": ("write leftover diary then honesty", "entry", "Open Diary leftover", "empty (trap)"),
        "icqweb": ("sign leftover ICQ then honesty", "UIN", "ICQ Web leftover", "empty (trap)"),
        "broadcastcom": ("play leftover stream then honesty", "stream", "broadcast.com leftover", "empty (trap)"),
        "go": ("open leftover GO Network then honesty", "GO", "GO leftover", "empty (trap)"),
        "cdnow": ("buy leftover CD then theater", "CD", "CDnow leftover", "live-charge (trap)"),
        "youvegotmail": ("open leftover You've Got Mail then honesty", "mail", "You've Got Mail leftover", "empty (trap)"),
        "snap": ("open leftover Snap.com then honesty", "Snap", "Snap leftover", "empty (trap)"),
        "valve": ("open leftover Valve then honesty", "Half-Life", "Valve leftover", "empty (trap)"),
        "womencom": ("open leftover Women.com then honesty", "board", "Women.com leftover", "empty (trap)"),
        "baidu": ("search leftover then honesty", "query", "Baidu leftover", "empty (trap)"),
        "hampsterdance": ("open leftover Hampster Dance then honesty", "hampster", "Hampster Dance leftover", "empty (trap)"),
        "y2k": ("open leftover Y2K then honesty", "Y2K", "Y2K leftover", "empty (trap)"),
        "gamespot": ("open leftover GameSpot then honesty", "review", "GameSpot leftover", "empty (trap)"),
        "dmoz": ("browse leftover directory then honesty", "category", "DMOZ leftover", "empty (trap)"),
    }
)

BEAT = {
    "1994": "1994 leftover. Cool Site of the Day is the chip. Mosaic / 14.4. No Amazon SSL.",
    "1995": "1995 leftover. Amazon SSL is the chip. AOL is #1 visits.",
    "1996": "1996 leftover. Portal wars is the chip. Space Jam leftover. No Google.",
    "1997": "1997 leftover. PointCast is the chip. AIM seed leftover. No Google mass.",
    "1998": "1998 leftover. I'm Feeling Lucky is the chip. Yahoo is loud.",
}

STAR_KEY = {
    "1994": "itt94-csotd",
    "1995": "itt95-ssl-checkout",
    "1996": "itt96-portal-wars",
    "1997": "itt97-pointcast",
    "1998": "itt98-lucky",
}

OFFICIAL = {
    "1994": {"csotd", "yahoo", "cern", "fishcam", "whitehouse", "nasa", "iuma", "hotwired", "lycos", "playable"},
    "1995": {"amazon", "auctionweb", "geocities", "yahoo", "altavista", "cnn", "microsoft", "netscape", "classmates", "playable"},
    "1996": {"portals", "hotmail", "spacejam", "yahoo", "geocities", "amazon", "auctionweb", "excite", "altavista", "playable"},
    "1997": {"pointcast", "icq", "ebay", "hotmail", "slashdot", "drudge", "hotbot", "aim", "apple", "microsoft"},
    "1998": {"google", "yahoo", "amazon", "ebay", "cdnow", "hotmail", "mozilla", "slashdot", "dmoz", "playable"},
}


def truth(slug: str):
    return DEFAULT.get(slug, ("open leftover dest then dest-true verb", "leftover", f"{slug} leftover", "anachronism (trap)"))


def more_href(year: str, slug: str):
    more = ROOT / f"years/{year}/sites/{slug}/more.html"
    return "more.html" if more.is_file() else None


def real_panel(year, slug, name, kind, nxt):
    star = paint.STAR[year]
    verb, ph, keep, trap = truth(slug)
    beat = BEAT[year]
    if kind == "third":
        storage = f"itt{year[2:]}-pop3-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}"'
        mark = "ITT-POP3X-THIRD"
    elif kind == "second":
        storage = f"itt{year[2:]}-pop2-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop2-{slug}"'
        mark = "ITT-POP3X-SECOND"
    else:
        storage = f"itt{year[2:]}-pop-{slug}"
        go = f'data-pop-go data-pop-id="{slug}"'
        mark = "ITT-POP3X-FIRST"
    miss = more_href(year, slug)
    miss_html = (
        f'<p class="itt-lo3x-miss"><b>M2 miss / wall:</b> <a href="{miss}" data-itt-lo3x-miss="1">in-year miss / more · never writes leftover-3×</a></p>'
        if miss
        else ""
    )
    next_html = (
        f'<p hidden data-next-flow data-next-when-key="{storage}"><b>Next:</b> <a href="../{nxt[0]}/index.html">{nxt[1]}</a></p>'
        if nxt
        else ""
    )
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="{year}" data-itt-lo3x-verb="{verb}" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{name}</b> · leftover 3× · {year}-true · {star} is the chip · incomplete never writes · <code>{storage}</code></p>
<p data-itt-year-copy>{beat}</p>
<p><b>M3:</b> {verb}. Empty / trap never writes.</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {beat}</label>
{miss_html}
<p><button type="button" {go}>{keep}</button> <span data-pop-status></span></p>
{next_html}
</div>
<!-- {mark}:{slug}:end -->
"""


def replace_or_insert(path: Path, year, slug, name, kind, nxt):
    import re

    if not path.is_file():
        return "missing"
    html = path.read_text(encoding="utf-8", errors="replace")
    mark = {"first": "ITT-POP3X-FIRST", "second": "ITT-POP3X-SECOND", "third": "ITT-POP3X-THIRD"}[kind]
    block = real_panel(year, slug, name, kind, nxt)
    pat = rf"<!-- {mark}:{slug}:start -->.*?<!-- {mark}:{slug}:end -->"
    if re.search(pat, html, re.S):
        html = re.sub(pat, block.strip(), html, count=1, flags=re.S)
        path.write_text(html, encoding="utf-8")
        return "replaced"
    if re.search(r"</body>", html, re.I):
        html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
    else:
        html += "\n" + block
    path.write_text(html, encoding="utf-8")
    return "inserted"


def kinds_for(year, slug):
    return ["third"] if slug in OFFICIAL[year] else ["first", "second", "third"]


def dests(year):
    seen = {}
    for kind in ("first", "second", "third"):
        for slug, name in paint.PLAN[year][kind]:
            seen.setdefault(slug, name)
    return list(seen.items())


def next_of(year, slug, kind):
    items = paint.PLAN[year][kind]
    slugs = [s for s, _ in items]
    if slug in slugs:
        return items[(slugs.index(slug) + 1) % len(items)]
    return items[0]


def main():
    counts = {"replaced": 0, "inserted": 0, "missing": 0}
    rows = []
    for year in paint.PLAN:
        for slug, name in dests(year):
            for kind in kinds_for(year, slug):
                nxt = next_of(year, slug, kind)
                st = replace_or_insert(ROOT / f"years/{year}/sites/{slug}/index.html", year, slug, name, kind, nxt)
                counts[st] = counts.get(st, 0) + 1
                print(st, year, kind, slug)
                verb, ph, keep, trap = truth(slug)
                key = {"first": f"itt{year[2:]}-pop-{slug}", "second": f"itt{year[2:]}-pop2-{slug}", "third": f"itt{year[2:]}-pop3-{slug}"}[kind]
                rows.append(
                    {
                        "year": year,
                        "kind": kind,
                        "id": slug,
                        "name": name,
                        "key": key,
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "keep": keep,
                        "trap": trap,
                        "beat": BEAT[year],
                        "miss": more_href(year, slug),
                        "nextId": nxt[0],
                        "href": f"/years/{year}/sites/{slug}/index.html",
                    }
                )
    out = ROOT / "e2e/1994-1998-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print(counts, "matrix", len(rows))


if __name__ == "__main__":
    main()
