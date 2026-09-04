#!/usr/bin/env python3
"""Push 2001–2008 href counts to 2× of the current remesasure.

Dests already on disk only. Leftover machines only.
2001–2003 leftover-18 / dest counts do not grow.
No official 20, guided 12, leftover 4×, or new dest folders.

Mass order: Pew / ClickZ / Media Metrix / comScore dests that exist this year.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

BEFORE = {
    "2001": 2401,
    "2002": 1955,
    "2003": 2036,
    "2004": 12867,
    "2005": 14423,
    "2006": 15250,
    "2007": 3759,
    "2008": 14507,
}

DEST_FREEZE = {"2001": 29, "2002": 26, "2003": 23}

MASS_ORDER = {
    "2001": [
        "yahoo", "amazon", "ebay", "google", "cnn", "microsoft", "wikipedia",
        "msn", "excite", "paypal", "slashdot", "blogger",
    ],
    "2002": [
        "yahoo", "amazon", "google", "ebay", "wikipedia", "stumbleupon",
        "friendster", "blogger", "netflix", "mozilla", "wired",
    ],
    "2003": [
        "yahoo", "amazon", "google", "wikipedia", "friendster", "myspace",
        "photobucket", "linkedin", "skype", "blogger", "cnn",
    ],
    "2004": [
        "google", "yahoo", "amazon", "ebay", "facebook", "gmail", "flickr",
        "myspace", "wikipedia", "cnn", "digg", "delicious",
    ],
    "2005": [
        "google", "yahoo", "amazon", "youtube", "myspace", "flickr",
        "wikipedia", "gmail", "maps", "reddit", "digg", "facebook",
    ],
    "2006": [
        "google", "yahoo", "youtube", "myspace", "facebook", "wikipedia",
        "amazon", "flickr", "gmail", "twitter", "reddit", "digg",
    ],
    "2007": [
        "google", "youtube", "facebook", "wiki", "gmail", "myspace",
        "amz", "twitter", "flickr", "tumblr", "reddit", "stumble",
    ],
    "2008": [
        "google", "yahoo", "youtube", "facebook", "wikipedia", "myspace",
        "amazon", "gmail", "twitter", "flickr", "github", "digg",
    ],
}

GOLD = {
    "2001": "wikipedia",
    "2002": "stumbleupon",
    "2003": "photobucket",
    "2004": "facebook",
    "2005": "youtube",
    "2006": "twitter",
    "2007": "iphone",
    "2008": "github",
}

PREFERRED = {
    ("2001", "wikipedia"): "edit.html",
    ("2002", "stumbleupon"): "index.html",
    ("2003", "photobucket"): "index.html",
    ("2003", "wordpress"): "dashboard.html",
    ("2003", "linkedin"): "invite.html",
    ("2004", "facebook"): "networks.html",
    ("2005", "youtube"): "upload.html",
    ("2006", "twitter"): "index.html",
    ("2006", "facebook"): "feed.html",
    ("2007", "iphone"): "index.html",
    ("2008", "github"): "issue.html",
}

LABEL = {
    "yahoo": "Yahoo leftover",
    "amazon": "Amazon leftover",
    "amz": "Amazon leftover",
    "ebay": "eBay leftover",
    "google": "Google leftover",
    "cnn": "CNN leftover",
    "microsoft": "Microsoft leftover",
    "wikipedia": "Wikipedia leftover",
    "wiki": "Wikipedia leftover",
    "msn": "MSN leftover",
    "excite": "Excite leftover",
    "paypal": "PayPal leftover",
    "slashdot": "Slashdot leftover",
    "blogger": "Blogger leftover",
    "stumbleupon": "Stumble leftover",
    "friendster": "Friendster leftover",
    "netflix": "Netflix leftover",
    "mozilla": "Mozilla leftover",
    "wired": "Wired leftover",
    "myspace": "MySpace leftover",
    "photobucket": "Photobucket leftover",
    "linkedin": "LinkedIn leftover",
    "skype": "Skype leftover",
    "facebook": "Facebook leftover",
    "gmail": "Gmail leftover",
    "flickr": "Flickr leftover",
    "digg": "Digg leftover",
    "delicious": "del.icio.us leftover",
    "youtube": "YouTube leftover",
    "maps": "Maps leftover",
    "reddit": "Reddit leftover",
    "twitter": "Twitter leftover",
    "tumblr": "Tumblr leftover",
    "stumble": "Stumble leftover",
    "github": "GitHub leftover",
    "iphone": "iPhone leftover",
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


def dest_href(slug: str, year: str, path: Path | None = None) -> str | None:
    target = dest_target(slug, year)
    if not target:
        return None
    if path is None:
        return f"../{target}"
    rel = path.relative_to(ROOT / "years" / year / "sites")
    return ("../" * (len(rel.parts) - 1)) + target


def dest_rooms(slug: str, year: str, with_about: bool, path: Path | None = None) -> list[tuple[str, str]]:
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
            ups = "../"
            if path is not None:
                rel = path.relative_to(ROOT / "years" / year / "sites")
                ups = "../" * (len(rel.parts) - 1)
            out.append((f"{ups}{slug}/about.html", lab + " · about"))
    return out


def live_leftover_dests(year: str) -> list[str]:
    ydir = ROOT / "years" / year / "sites"
    live: list[str] = []
    for d in sorted(p for p in ydir.iterdir() if p.is_dir()):
        if d.name == "playable":
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


def dest_hop_budget(year: str, dest: str, chain: list[str], path: Path | None = None) -> list[tuple[str, str]]:
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
    # Lean years: index + about. Forests: index only (still enough dests to 2×).
    with_about = year in ("2001", "2002", "2003", "2007")
    for slug in others:
        for href, lab in dest_rooms(slug, year, with_about, path):
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
    if year in DEST_FREEZE and after_d != DEST_FREEZE[year]:
        raise SystemExit(f"{year} leftover dest freeze {DEST_FREEZE[year]} → {after_d}")
    return rewritten, hrefs, target


def main(argv: list[str]) -> int:
    years = argv[1:] or list(BEFORE)
    print("2001–2008 href 2× · dests on disk · leftover-18 freeze 2001–03")
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
