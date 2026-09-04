#!/usr/bin/env python3
"""Push 1994–2000 + 2009 href counts to 2× of today's remesasure.

Dests already on disk only. Leftover machines only.
No official 20, guided 12, leftover 4×, or new dest folders.

2009 honesty dests stay unlisted as hop targets.
Nested dest rooms (Yahoo / GeoCities) get depth-correct ../ hops.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Today's remesasure — the numbers to double.
BEFORE = {
    "1994": 8426,
    "1995": 7811,
    "1996": 5852,
    "1997": 6062,
    "1998": 6646,
    "1999": 7013,
    "2000": 7401,
    "2009": 3706,
}

DEST_FREEZE = {
    "1994": 53,
    "1995": 51,
    "1996": 52,
    "1997": 56,
    "1998": 52,
    "1999": 48,
    "2000": 54,
    "2009": 68,
}

HTML_FREEZE = {
    "1994": 277,
    "1995": 247,
    "1996": 199,
    "1997": 183,
    "1998": 202,
    "1999": 219,
    "2000": 209,
    "2009": 139,
}

# Year-true leftover dests already on disk. Rest of live leftover dests follow.
MASS_ORDER = {
    "1994": [
        "yahoo", "cern", "ncsa", "lycos", "webcrawler", "hotwired",
        "whitehouse", "nasa", "iuma", "fishcam", "csotd", "mcom", "cnn",
    ],
    "1995": [
        "yahoo", "amazon", "netscape", "altavista", "geocities",
        "auctionweb", "cnn", "microsoft", "classmates", "webcrawler",
    ],
    "1996": [
        "yahoo", "hotmail", "excite", "altavista", "amazon", "geocities",
        "spacejam", "auctionweb", "netscape", "portals",
    ],
    "1997": [
        "yahoo", "hotmail", "ebay", "icq", "slashdot", "pointcast",
        "hotbot", "aim", "netscape", "amazon",
    ],
    "1998": [
        "yahoo", "google", "ebay", "hotmail", "amazon", "slashdot",
        "netscape", "geocities", "cdnow", "dmoz",
    ],
    "1999": [
        "yahoo", "google", "ebay", "amazon", "napster", "blogger",
        "paypal", "aim", "geocities", "askjeeves",
    ],
    "2000": [
        "yahoo", "google", "ebay", "amazon", "napster", "paypal",
        "mapquest", "geocities", "gnutella", "cnn",
    ],
    "2009": [
        "facebook", "youtube", "twitter", "wikipedia", "chrome",
        "farmville", "bing", "appstore", "foursquare", "hulu",
        "windows7", "kickstarter", "minecraft", "android",
    ],
}

GOLD = {
    "1994": "csotd",
    "1995": "amazon",
    "1996": "portals",
    "1997": "pointcast",
    "1998": "google",
    "1999": "aim",
    "2000": "mapquest",
    "2009": "facebook",
}

PREFERRED = {
    ("1995", "amazon"): "ssl-checkout.html",
    ("1996", "portals"): "wars.html",
    ("1998", "google"): "lucky.html",
    ("1997", "ebay"): "item-laptop.html",
    ("1999", "napster"): "search.html",
    ("2000", "napster"): "search.html",
}

# 2009 honesty dests — exist on disk, not hop targets.
HONESTY_2009 = {
    "figma", "notion", "teams", "discord", "zoom", "brave", "edge",
    "slack", "among", "fn", "ig", "tt", "patreon", "icloud", "twitch",
}

LABEL = {
    "yahoo": "Yahoo leftover",
    "cern": "CERN leftover",
    "ncsa": "NCSA leftover",
    "lycos": "Lycos leftover",
    "webcrawler": "WebCrawler leftover",
    "hotwired": "HotWired leftover",
    "whitehouse": "White House leftover",
    "nasa": "NASA leftover",
    "iuma": "IUMA leftover",
    "fishcam": "Fish Cam leftover",
    "csotd": "CSotD leftover",
    "mcom": "Mosaic leftover",
    "cnn": "CNN leftover",
    "amazon": "Amazon leftover",
    "netscape": "Netscape leftover",
    "altavista": "AltaVista leftover",
    "geocities": "GeoCities leftover",
    "auctionweb": "AuctionWeb leftover",
    "microsoft": "Microsoft leftover",
    "classmates": "Classmates leftover",
    "hotmail": "HoTMaiL leftover",
    "excite": "Excite leftover",
    "spacejam": "Space Jam leftover",
    "portals": "Portal leftover",
    "ebay": "eBay leftover",
    "icq": "ICQ leftover",
    "slashdot": "Slashdot leftover",
    "pointcast": "PointCast leftover",
    "hotbot": "HotBot leftover",
    "aim": "AIM leftover",
    "google": "Google leftover",
    "cdnow": "CDnow leftover",
    "dmoz": "dmoz leftover",
    "napster": "Napster leftover",
    "blogger": "Blogger leftover",
    "paypal": "PayPal leftover",
    "askjeeves": "Ask Jeeves leftover",
    "mapquest": "MapQuest leftover",
    "gnutella": "Gnutella leftover",
    "facebook": "Facebook leftover",
    "youtube": "YouTube leftover",
    "twitter": "Twitter leftover",
    "wikipedia": "Wikipedia leftover",
    "chrome": "Chrome leftover",
    "farmville": "FarmVille leftover",
    "bing": "Bing leftover",
    "appstore": "App Store leftover",
    "foursquare": "Foursquare leftover",
    "hulu": "Hulu leftover",
    "windows7": "Windows 7 leftover",
    "kickstarter": "Kickstarter leftover",
    "minecraft": "Minecraft leftover",
    "android": "Android leftover",
}


def dest_target(slug: str, year: str) -> str | None:
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return None
    pref = PREFERRED.get((year, slug))
    if pref and (d / pref).is_file():
        return f"{slug}/{pref}"
    if (d / "index.html").is_file():
        return f"{slug}/index.html"
    htmls = sorted(p for p in d.glob("*.html") if p.is_file())
    if htmls:
        return f"{slug}/{htmls[0].name}"
    return None


def href_from(path: Path, year: str, target: str) -> str:
    rel = path.relative_to(ROOT / "years" / year / "sites")
    return ("../" * (len(rel.parts) - 1)) + target


def dest_href(slug: str, year: str, path: Path) -> str | None:
    target = dest_target(slug, year)
    if not target:
        return None
    return href_from(path, year, target)


def dest_rooms(slug: str, year: str, path: Path, with_about: bool) -> list[tuple[str, str]]:
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return []
    out: list[tuple[str, str]] = []
    primary = dest_href(slug, year, path)
    lab = LABEL.get(slug, slug.replace("-", " ") + " leftover")
    if primary:
        out.append((primary, lab))
    if with_about:
        about = d / "about.html"
        if about.is_file() and (not primary or not primary.endswith("/about.html")):
            out.append((href_from(path, year, f"{slug}/about.html"), lab + " · about"))
    return out


def live_leftover_dests(year: str) -> list[str]:
    ydir = ROOT / "years" / year / "sites"
    live: list[str] = []
    for d in sorted(p for p in ydir.iterdir() if p.is_dir()):
        if d.name == "playable":
            continue
        if year == "2009" and d.name in HONESTY_2009:
            continue
        if not dest_target(d.name, year):
            continue
        if any("data-lo-save" in f.read_text(encoding="utf-8", errors="replace") for f in d.glob("*.html")):
            live.append(d.name)
    ordered: list[str] = []
    seen: set[str] = set()
    for slug in MASS_ORDER[year]:
        if slug in live and slug not in seen:
            ordered.append(slug)
            seen.add(slug)
    for slug in live:
        if slug not in seen:
            ordered.append(slug)
    return ordered


def count_hrefs(year: str) -> int:
    n = 0
    for f in (ROOT / "years" / year).rglob("*.html"):
        n += len(re.findall(r"href\s*=", f.read_text(encoding="utf-8", errors="replace"), re.I))
    return n


def dest_of(path: Path, year: str) -> str | None:
    rel = path.relative_to(ROOT / "years" / year)
    if rel.parts[0] != "sites" or len(rel.parts) < 2:
        return None
    dest = rel.parts[1]
    if dest.endswith(".html"):
        return None
    return dest


def has_href(block: str, href: str) -> bool:
    return f'href="{href}"' in block or f"href='{href}'" in block


def ensure_2x_strip(html: str, year: str, hops: list[tuple[str, str]]) -> str:
    if not hops:
        return html
    m = re.search(
        r'(<p[^>]*data-itt-2x-links="[^"]*"[^>]*>)(.*?)(</p>)',
        html,
        re.S | re.I,
    )
    if m:
        inner = m.group(2)
        add = [f'<a href="{h}">{lab}</a>' for h, lab in hops if not has_href(inner, h)]
        if not add:
            return html
        return html[: m.start(2)] + inner + " · " + " · ".join(add) + html[m.end(2) :]
    extras = " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in hops)
    block = (
        f'\n<!-- ITT-2X-TARGET:{year}:start -->\n'
        f'<p class="itt-pop-more" data-itt-pop-more="{year}" data-itt-2x-links="{year}" '
        f'data-itt-2x-flow="{year}" '
        f'style="margin:12px auto;padding:8px;border:1px dashed #888;'
        f'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
        f"<b>2× leftover walk</b> · {extras}</p>\n"
        f"<!-- ITT-2X-TARGET:{year}:end -->\n"
    )
    if "</body>" in html:
        return html.replace("</body>", block + "</body>", 1)
    return html + block


def dest_hop_budget(year: str, dest: str, chain: list[str], path: Path) -> list[tuple[str, str]]:
    hops: list[tuple[str, str]] = []
    seen: set[str] = set()
    gold = GOLD[year]
    if dest != gold:
        href = dest_href(gold, year, path)
        if href:
            hops.append((href, "★ " + LABEL.get(gold, gold)))
            seen.add(href)
    if dest in chain:
        i = chain.index(dest)
        for slug in (chain[i - 1] if i else chain[-1], chain[(i + 1) % len(chain)]):
            if slug == dest:
                continue
            href = dest_href(slug, year, path)
            if href and href not in seen:
                hops.append((href, LABEL.get(slug, slug + " leftover")))
                seen.add(href)
    others = [s for s in chain if s != dest]
    if dest == "playable":
        others = others[:8]
    for slug in others:
        for href, lab in dest_rooms(slug, year, path, True):
            if href not in seen:
                hops.append((href, lab))
                seen.add(href)
    return hops


def count_tree(year: str) -> tuple[int, int]:
    ydir = ROOT / "years" / year
    dests = sum(1 for p in (ydir / "sites").iterdir() if p.is_dir())
    htmls = len(list(ydir.rglob("*.html")))
    return dests, htmls


def process_year(year: str) -> tuple[int, int, int]:
    target = BEFORE[year] * 2
    chain = live_leftover_dests(year)
    before_d, before_h = count_tree(year)
    ydir = ROOT / "years" / year / "sites"
    rewritten = 0
    for path in sorted(ydir.rglob("*.html")):
        dest = dest_of(path, year)
        if not dest:
            continue
        hops = dest_hop_budget(year, dest, chain, path)
        html = path.read_text(encoding="utf-8", errors="replace")
        new = ensure_2x_strip(html, year, hops)
        if new != html:
            path.write_text(new, encoding="utf-8")
            rewritten += 1
    after_d, after_h = count_tree(year)
    hrefs = count_hrefs(year)
    if (after_d, after_h) != (before_d, before_h):
        raise SystemExit(f"{year} dest/HTML changed {before_d}/{before_h} → {after_d}/{after_h}")
    if after_d != DEST_FREEZE[year]:
        raise SystemExit(f"{year} dest freeze {DEST_FREEZE[year]} → {after_d}")
    if after_h != HTML_FREEZE[year]:
        raise SystemExit(f"{year} HTML freeze {HTML_FREEZE[year]} → {after_h}")
    return rewritten, hrefs, target


def main(argv: list[str]) -> int:
    years = argv[1:] or list(BEFORE)
    print("1994–2000 + 2009 href 2× · dests on disk · dest/HTML freeze")
    all_ok = True
    for year in years:
        if year not in BEFORE:
            print(" skip", year)
            continue
        rewritten, hrefs, target = process_year(year)
        ok = hrefs >= target
        all_ok = all_ok and ok
        print(
            f"  {year} rewritten={rewritten} hrefs={hrefs} "
            f"target={target} {'HIT' if ok else 'SHORT ' + str(target - hrefs)}"
        )
    return 0 if all_ok else 1


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
