#!/usr/bin/env python3
"""Push 2010–2019 href counts to 2× of the pre-hop remesasure.

Only dests already on disk. Only rooms that exist (HTTP-able files).
No new dest folders, HTML files, leftover writers, official 20, or guided 12.

Hops are leftover dests with a real data-lo-save machine, ordered by
year-true mass first (Pew / comScore / Pack A), then the rest on disk.

See the 2026-09-03 2× research lock + map.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Pre-hop remesasure (the numbers the user asked to double).
BEFORE = {
    "2010": 2880,
    "2011": 5249,
    "2012": 3250,
    "2013": 2551,
    "2014": 2451,
    "2015": 2658,
    "2016": 2616,
    "2017": 3436,
    "2018": 3344,
    "2019": 3683,
}

# Research-first leftover dests (must exist this year). Rest of disk follows.
MASS_ORDER = {
    "2010": [
        "facebook", "youtube", "twitter", "tumblr", "reddit", "netflix",
        "yahoo", "google", "pinterest", "farmville", "imgur", "foursquare",
        "dropbox", "ask", "digg", "chrome",
    ],
    "2011": [
        "facebook", "youtube", "twitter", "gmail", "google", "spotify",
        "instagram", "reddit", "netflix", "airbnb", "pinterest", "dropbox",
        "linkedin", "wiki",
    ],
    "2012": [
        "facebook", "youtube", "google", "yahoo", "amazon", "wikipedia",
        "twitter", "tumblr", "pinterest", "instagram", "reddit", "netflix",
        "gmail", "chrome",
    ],
    "2013": [
        "facebook", "instagram", "youtube", "twitter", "tumblr", "snapchat",
        "whisper", "telegram", "healthcare", "reddit", "vine",
    ],
    "2014": [
        "facebook", "instagram", "youtube", "wikipedia", "twitter", "slack",
        "snapchat", "uber", "twitch", "whatsapp", "heartbleed", "icebucket",
    ],
    "2015": [
        "instagram", "spotify", "netflix", "windows10", "snapchat",
        "googlephotos", "peach", "discord", "periscope", "applemusic",
    ],
    "2016": [
        "facebook", "youtube", "whatsapp", "vine", "pokemongo", "snapchat",
        "instagram", "windows10", "netflix", "reddit",
    ],
    "2017": [
        "youtube", "reddit", "amazon", "fortnite", "teams", "twitter",
        "musically", "facebook2b", "switch", "wannacry",
    ],
    "2018": [
        "youtube", "instagram", "tiktok", "reddit", "wikipedia", "github",
        "cambridge", "fortnite", "discord",
    ],
    "2019": [
        "youtube", "instagram", "tiktok", "wikipedia", "stadia", "arcade",
        "appletv", "chrome", "windows10",
    ],
}

GOLD = {
    "2010": "instagram",
    "2011": "googleplus",
    "2012": "instagram",
    "2013": "vine",
    "2014": "whatsapp",
    "2015": "periscope",
    "2016": "instagram",
    "2017": "iphone",
    "2018": "gdpr",
    "2019": "disneyplus",
}

PREFERRED = {
    ("2012", "instagram"): "android.html",
    ("2013", "instagram"): "video.html",
    ("2013", "snapchat"): "story.html",
    ("2013", "vine"): "record.html",
    ("2016", "facebook"): "reactions.html",
    ("2016", "whatsapp"): "e2e.html",
    ("2016", "instagram"): "stories.html",
    ("2016", "windows10"): "end.html",
    ("2017", "twitter"): "280.html",
    ("2017", "iphone"): "x.html",
    ("2018", "instagram"): "igtv.html",
    ("2018", "fortnite"): "switch.html",
    ("2018", "tiktok"): "fyp.html",
    ("2018", "gdpr"): "index.html",
    ("2019", "disneyplus"): "home.html",
}

HONESTY_2011 = {
    "figma", "notion", "teams", "discord", "zoom", "brave", "edge",
    "slack", "among", "fn",
}

LABEL = {
    "facebook": "Facebook leftover",
    "youtube": "YouTube leftover",
    "twitter": "Twitter leftover",
    "tumblr": "Tumblr leftover",
    "reddit": "Reddit leftover",
    "netflix": "Netflix leftover",
    "yahoo": "Yahoo leftover",
    "google": "Google leftover",
    "pinterest": "Pinterest leftover",
    "farmville": "FarmVille leftover",
    "instagram": "Instagram leftover",
    "gmail": "Gmail leftover",
    "spotify": "Spotify leftover",
    "wikipedia": "Wikipedia leftover",
    "amazon": "Amazon leftover",
    "snapchat": "Snapchat leftover",
    "whatsapp": "WhatsApp leftover",
    "slack": "Slack leftover",
    "uber": "Uber leftover",
    "twitch": "Twitch leftover",
    "vine": "Vine leftover",
    "pokemongo": "Pokémon GO leftover",
    "fortnite": "Fortnite leftover",
    "tiktok": "TikTok leftover",
    "gdpr": "GDPR leftover",
    "disneyplus": "Disney+ leftover",
    "heartbleed": "Heartbleed leftover",
    "icebucket": "Ice Bucket leftover",
    "cambridge": "Cambridge leftover",
    "github": "GitHub leftover",
    "stadia": "Stadia leftover",
    "arcade": "Arcade leftover",
    "appletv": "Apple TV+ leftover",
    "chrome": "Chrome leftover",
    "windows10": "Windows 10 leftover",
    "teams": "Teams leftover",
    "switch": "Switch leftover",
    "musically": "musical.ly leftover",
    "telegram": "Telegram leftover",
    "whisper": "Whisper leftover",
    "healthcare": "Healthcare leftover",
    "googlephotos": "Google Photos leftover",
    "peach": "Peach leftover",
    "discord": "Discord leftover",
    "wiki": "Wikipedia leftover",
    "airbnb": "Airbnb leftover",
    "dropbox": "Dropbox leftover",
    "ask": "Ask leftover",
    "digg": "Digg leftover",
    "imgur": "Imgur leftover",
    "foursquare": "Foursquare leftover",
    "linkedin": "LinkedIn leftover",
    "wannacry": "WannaCry leftover",
    "facebook2b": "Facebook leftover",
    "periscope": "Periscope leftover",
    "applemusic": "Apple Music leftover",
}


def dest_href(slug: str, year: str) -> str | None:
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return None
    pref = PREFERRED.get((year, slug))
    if pref and (d / pref).is_file():
        return f"../{slug}/{pref}"
    if (d / "index.html").is_file():
        return f"../{slug}/index.html"
    htmls = sorted(p for p in d.glob("*.html") if p.is_file())
    if htmls:
        return f"../{slug}/{htmls[0].name}"
    return None


def dest_rooms(slug: str, year: str) -> list[tuple[str, str]]:
    """Live leftover rooms on this dest (index/preferred + about if present)."""
    d = ROOT / "years" / year / "sites" / slug
    if not d.is_dir():
        return []
    out: list[tuple[str, str]] = []
    primary = dest_href(slug, year)
    if primary:
        out.append((primary, LABEL.get(slug, slug.replace("-", " ") + " leftover")))
    about = d / "about.html"
    if about.is_file() and (not primary or not primary.endswith("/about.html")):
        out.append((f"../{slug}/about.html", LABEL.get(slug, slug.replace("-", " ") + " leftover") + " · about"))
    return out


def live_leftover_dests(year: str) -> list[str]:
    ydir = ROOT / "years" / year / "sites"
    live: list[str] = []
    for d in sorted(p for p in ydir.iterdir() if p.is_dir()):
        if d.name == "playable":
            continue
        if year == "2011" and d.name in HONESTY_2011:
            continue
        if not dest_href(d.name, year):
            continue
        has_lo = False
        for f in d.glob("*.html"):
            t = f.read_text(encoding="utf-8", errors="replace")
            if "data-lo-save" in t:
                has_lo = True
                break
        if has_lo:
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
            seen.add(slug)
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
    return rel.parts[1]


def has_href(block: str, href: str) -> bool:
    return f'href="{href}"' in block or f"href='{href}'" in block


def inject(html: str, start: int, end: int, extras: list[str]) -> str:
    block = html[start:end]
    extra = " · " + " · ".join(extras)
    if "</p>" in block:
        block = block.replace("</p>", extra + "\n</p>", 1)
    elif "</nav>" in block:
        block = block.replace("</nav>", extra + "\n</nav>", 1)
    else:
        block = block + extra
    return html[:start] + block + html[end:]


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


def flow_hops(year: str, dest: str, chain: list[str]) -> list[tuple[str, str]]:
    """3-step leftover walk: prev · next · gold. All dests on disk with leftover."""
    hops: list[tuple[str, str]] = []
    if dest in chain:
        i = chain.index(dest)
        prev = chain[i - 1] if i > 0 else chain[-1]
        nxt = chain[(i + 1) % len(chain)]
        for slug in (prev, nxt):
            if slug == dest:
                continue
            href = dest_href(slug, year)
            if href:
                hops.append((href, LABEL.get(slug, slug + " leftover")))
    gold = GOLD[year]
    if dest != gold:
        href = dest_href(gold, year)
        if href:
            hops.append((href, "★ " + LABEL.get(gold, gold)))
    return hops


def dest_hop_budget(year: str, dest: str, chain: list[str]) -> list[tuple[str, str]]:
    hops: list[tuple[str, str]] = []
    seen: set[str] = set()
    # Full leftover walk first, then every live leftover dest room.
    for href, lab in flow_hops(year, dest, chain):
        if href not in seen:
            hops.append((href, lab))
            seen.add(href)
    others = [s for s in chain if s != dest]
    if dest == "playable":
        others = others[:8]
    for slug in others:
        for href, lab in dest_rooms(slug, year):
            if href not in seen:
                hops.append((href, lab))
                seen.add(href)
    return hops


def count_tree(year: str) -> tuple[int, int]:
    ydir = ROOT / "years" / year
    dests = sum(1 for p in (ydir / "sites").iterdir() if p.is_dir())
    htmls = len(list(ydir.rglob("*.html")))
    return dests, htmls


def writers_under2(year: str) -> list[str]:
    ydir = ROOT / "years" / year
    by: dict[str, int] = {}
    for f in ydir.rglob("*.html"):
        dest = dest_of(f, year)
        if not dest or dest == "playable":
            continue
        t = f.read_text(encoding="utf-8", errors="replace")
        by[dest] = by.get(dest, 0) + len(re.findall(r"data-lo-save\b", t))
    return [d for d, n in sorted(by.items()) if n < 2]


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
        hops = dest_hop_budget(year, dest, chain)
        html = path.read_text(encoding="utf-8", errors="replace")
        new = ensure_2x_strip(html, year, hops)
        if new != html:
            path.write_text(new, encoding="utf-8")
            rewritten += 1
    after_d, after_h = count_tree(year)
    hrefs = count_hrefs(year)
    if (after_d, after_h) != (before_d, before_h):
        raise SystemExit(f"{year} dest/HTML changed {before_d}/{before_h} → {after_d}/{after_h}")
    if year == "2014" and (ROOT / "years/2014/sites/google").exists():
        raise SystemExit("2014 google dest appeared")
    under = writers_under2(year)
    if under:
        raise SystemExit(f"{year} leftover writers <2: {under[:8]}")
    return rewritten, hrefs, target


def main(argv: list[str]) -> int:
    years = argv[1:] or list(BEFORE)
    print("href 2× targets · dests on disk · leftover machines only")
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
