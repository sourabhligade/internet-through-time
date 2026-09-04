#!/usr/bin/env python3
"""2010–2019 legal 2× hops — dest minutes from the 2026-09-03 map.

Add missing mass hops on dests already on disk.
Do not add dest folders, HTML files, leftover writers, official 20, or 2020+ dests.
2014: never create sites/google/.
2011 honesty dests are never hop *targets*.

See docs/2010-2019-2X-EVERY-NUMBER-MAP-GOALS-PHASES-FLOWS-MINUTE-2026-09-03.md
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

MASS: dict[str, list[tuple[str, str]]] = {
    "2010": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("twitter", "Twitter leftover"),
        ("tumblr", "Tumblr leftover"),
        ("reddit", "Reddit leftover"),
        ("netflix", "Netflix leftover"),
        ("yahoo", "Yahoo leftover"),
        ("google", "Google leftover"),
        ("pinterest", "Pinterest leftover"),
        ("farmville", "FarmVille leftover"),
    ],
    "2011": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("twitter", "Twitter leftover"),
        ("gmail", "Gmail leftover"),
        ("google", "Google leftover"),
        ("spotify", "Spotify leftover"),
        ("instagram", "Instagram leftover"),
        ("reddit", "Reddit leftover"),
        ("netflix", "Netflix leftover"),
    ],
    "2012": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("google", "Google leftover"),
        ("yahoo", "Yahoo leftover"),
        ("amazon", "Amazon leftover"),
        ("wikipedia", "Wikipedia leftover"),
        ("twitter", "Twitter leftover"),
        ("tumblr", "Tumblr leftover"),
        ("pinterest", "Pinterest leftover"),
        ("instagram", "Instagram leftover"),
    ],
    "2013": [
        ("facebook", "Facebook leftover"),
        ("instagram", "Instagram leftover"),
        ("youtube", "YouTube leftover"),
        ("twitter", "Twitter leftover"),
        ("tumblr", "Tumblr leftover"),
        ("snapchat", "Snapchat leftover"),
        ("whisper", "Whisper leftover"),
        ("telegram", "Telegram leftover"),
        ("healthcare", "Healthcare leftover"),
    ],
    "2014": [
        ("facebook", "Facebook leftover"),
        ("instagram", "Instagram leftover"),
        ("youtube", "YouTube leftover"),
        ("wikipedia", "Wikipedia leftover"),
        ("twitter", "Twitter leftover"),
        ("slack", "Slack leftover"),
        ("snapchat", "Snapchat leftover"),
        ("uber", "Uber leftover"),
        ("twitch", "Twitch leftover"),
    ],
    "2015": [
        ("instagram", "Instagram leftover"),
        ("spotify", "Spotify leftover"),
        ("netflix", "Netflix leftover"),
        ("windows10", "Windows 10 leftover"),
        ("snapchat", "Snapchat leftover"),
        ("googlephotos", "Google Photos leftover"),
        ("peach", "Peach leftover"),
        ("discord", "Discord leftover"),
    ],
    "2016": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("whatsapp", "WhatsApp leftover"),
        ("vine", "Vine leftover"),
        ("pokemongo", "Pokémon GO leftover"),
        ("snapchat", "Snapchat leftover"),
        ("instagram", "Instagram leftover"),
        ("windows10", "Windows 10 leftover"),
        ("netflix", "Netflix leftover"),
        ("reddit", "Reddit leftover"),
    ],
    "2017": [
        ("youtube", "YouTube leftover"),
        ("reddit", "Reddit leftover"),
        ("amazon", "Amazon leftover"),
        ("fortnite", "Fortnite leftover"),
        ("teams", "Teams leftover"),
        ("twitter", "Twitter leftover"),
        ("musically", "musical.ly leftover"),
        ("facebook2b", "Facebook leftover"),
        ("switch", "Switch leftover"),
    ],
    "2018": [
        ("youtube", "YouTube leftover"),
        ("instagram", "Instagram leftover"),
        ("tiktok", "TikTok leftover"),
        ("reddit", "Reddit leftover"),
        ("wikipedia", "Wikipedia leftover"),
        ("github", "GitHub leftover"),
        ("cambridge", "Cambridge leftover"),
        ("fortnite", "Fortnite leftover"),
        ("discord", "Discord leftover"),
    ],
    "2019": [
        ("youtube", "YouTube leftover"),
        ("instagram", "Instagram leftover"),
        ("tiktok", "TikTok leftover"),
        ("wikipedia", "Wikipedia leftover"),
        ("stadia", "Stadia leftover"),
        ("arcade", "Arcade leftover"),
        ("appletv", "Apple TV+ leftover"),
        ("chrome", "Chrome leftover"),
        ("windows10", "Windows 10 leftover"),
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

HONESTY_2011 = {
    "figma",
    "notion",
    "teams",
    "discord",
    "zoom",
    "brave",
    "edge",
    "slack",
    "among",
    "fn",
}

# Dest-name period verbs for leftover 2× plaques. Keys stay.
VERB = {
    "whatsapp": "Install leftover",
    "heartbleed": "Rotate leftover",
    "icebucket": "Nominate leftover",
    "iphone": "Bigger-glass leftover",
    "slack": "Join leftover",
    "twitch": "Stream leftover",
    "twitter": "Tweet leftover 140",
    "facebook": "Like leftover",
    "instagram": "Filter leftover",
    "youtube": "Watch leftover",
    "wikipedia": "Read leftover",
    "snapchat": "Story leftover",
    "uber": "Pickup leftover",
    "vine": "Hold leftover",
    "telegram": "Chat leftover",
    "periscope": "Go LIVE leftover",
    "netflix": "Queue leftover",
    "reddit": "Vote leftover",
    "tumblr": "Reblog leftover",
    "google": "Search leftover",
    "yahoo": "Directory leftover",
    "gdpr": "Manage leftover",
    "tiktok": "For You leftover",
    "disneyplus": "Continue leftover",
    "pokemongo": "Catch leftover",
    "fortnite": "Drop leftover",
    "cambridge": "Break leftover",
}


def dest_of(path: Path, year: str) -> str | None:
    rel = path.relative_to(ROOT / "years" / year)
    if rel.parts[0] != "sites" or len(rel.parts) < 2:
        return None
    return rel.parts[1]


# Prefer the year-true room when index.html is absent (Wave 3 / official trails).
PREFERRED = {
    ("2013", "instagram"): "video.html",
    ("2013", "snapchat"): "story.html",
    ("2016", "facebook"): "reactions.html",
    ("2016", "whatsapp"): "e2e.html",
    ("2016", "instagram"): "stories.html",
    ("2016", "windows10"): "end.html",
    ("2017", "twitter"): "280.html",
    ("2018", "instagram"): "igtv.html",
    ("2018", "fortnite"): "switch.html",
    ("2012", "instagram"): "android.html",
    ("2017", "iphone"): "x.html",
    ("2019", "disneyplus"): "home.html",
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


def repair_dead_index(html: str, year: str) -> str:
    """Rewrite ../slug/index.html hops when that file is not on disk."""

    def repl(m: re.Match[str]) -> str:
        slug = m.group(1)
        d = ROOT / "years" / year / "sites" / slug
        if (d / "index.html").is_file():
            return m.group(0)
        href = dest_href(slug, year)
        if not href:
            return m.group(0)
        return f'href="{href}"'

    return re.sub(r'href="\.\./([^/"]+)/index\.html"', repl, html)


def hops_for(year: str, dest: str) -> list[tuple[str, str]]:
    hops = list(MASS[year])
    if year == "2011":
        hops = [(s, l) for s, l in hops if s not in HONESTY_2011]
    hops = [(s, l) for s, l in hops if s != dest]
    if dest == "playable":
        gold = GOLD[year]
        gold_lab = next((l for s, l in MASS[year] if s == gold), f"{gold} leftover")
        first = [(gold, gold_lab)] if gold != dest else []
        extra = [(s, l) for s, l in hops if s != gold][:3]
        return first + extra
    return hops


def has_slug(block: str, slug: str) -> bool:
    return (
        f"../{slug}/" in block
        or f'href="{slug}/' in block
        or f"href='{slug}/" in block
        or f"sites/{slug}/" in block
    )


def inject_into_block(html: str, start: int, end: int, extras: list[str]) -> str:
    block = html[start:end]
    extra = " ·\n " + " ·\n ".join(extras)
    if "</p>" in block:
        block = block.replace("</p>", extra + "\n</p>", 1)
    elif "</nav>" in block:
        block = block.replace("</nav>", extra + "\n</nav>", 1)
    else:
        block = block + extra
    return html[:start] + block + html[end:]


def ensure_3x(html: str, year: str, hops: list[tuple[str, str]]) -> str:
    parts = []
    for slug, lab in hops:
        href = dest_href(slug, year)
        if href:
            parts.append((slug, href, lab))
    if not parts:
        return html
    m = re.search(r'(<nav class="itt-3x-also"[^>]*>)(.*?)(</nav>)', html, re.S | re.I)
    if m:
        inner = m.group(2)
        add = []
        for slug, href, lab in parts:
            if has_slug(inner, slug):
                continue
            add.append(f'<a href="{href}">{lab}</a>')
        if not add:
            return html
        return inject_into_block(html, m.start(2), m.end(2), add)
    extras = " · ".join(f'<a href="{h}">{lab}</a>' for _, h, lab in parts)
    nav = (
        f'\n<!-- ITT-H-3X:{year}:start -->\n'
        f'<nav class="itt-3x-also" data-itt-3x-also data-itt-year="{year}" '
        f'style="margin:12px 0;padding:8px;border:1px dashed #888;'
        f'font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em">'
        f"<b>Also this year · 3×</b><p style=\"margin:6px 0 0\">{extras}</p></nav>\n"
        f"<!-- ITT-H-3X:{year}:end -->\n"
    )
    if "</body>" in html:
        return html.replace("</body>", nav + "</body>", 1)
    return html + nav


def ensure_2x(html: str, year: str, hops: list[tuple[str, str]]) -> str:
    parts = []
    for slug, lab in hops:
        href = dest_href(slug, year)
        if href:
            parts.append((slug, href, lab))
    if not parts:
        return html
    m = re.search(
        r'(<p[^>]*data-itt-2x-links="[^"]*"[^>]*>)(.*?)(</p>)',
        html,
        re.S | re.I,
    )
    if m:
        inner = m.group(2)
        add = []
        for slug, href, lab in parts:
            if has_slug(inner, slug):
                continue
            add.append(f'<a href="{href}">{lab}</a>')
        if not add:
            return html
        extra = " · " + " · ".join(add)
        new_inner = inner + extra
        return html[: m.start(2)] + new_inner + html[m.end(2) :]
    extras = " · ".join(f'<a href="{h}">{lab}</a>' for _, h, lab in parts)
    block = (
        f'\n<!-- ITT-H-2X:{year}:start -->\n'
        f'<p class="itt-pop-more" data-itt-pop-more="{year}" data-itt-2x-links="{year}" '
        f'style="margin:12px auto;padding:8px;border:1px dashed #888;'
        f'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
        f"<b>2× leftover links</b> · {extras}</p>\n"
        f"<!-- ITT-H-2X:{year}:end -->\n"
    )
    if "</body>" in html:
        return html.replace("</body>", block + "</body>", 1)
    return html + block


def relabel_plaque(html: str, dest: str) -> str:
    verb = VERB.get(dest, dest.replace("-", " ") + " leftover")

    def repl(m: re.Match[str]) -> str:
        return m.group(1) + verb + m.group(2)

    return re.sub(
        r"(<button\b[^>]*\bdata-lo-save\b[^>]*>)\s*Save leftover 2×\s*(</button>)",
        repl,
        html,
        flags=re.I,
    )


def count_tree(year: str) -> tuple[list[str], int]:
    ydir = ROOT / "years" / year
    dests = sorted(p.name for p in (ydir / "sites").iterdir() if p.is_dir())
    htmls = list(ydir.rglob("*.html"))
    return dests, len(htmls)


def writers_under2(year: str) -> list[str]:
    ydir = ROOT / "years" / year
    by: dict[str, int] = {}
    for f in ydir.rglob("*.html"):
        dest = dest_of(f, year)
        if not dest or dest == "playable":
            continue
        t = f.read_text(encoding="utf-8", errors="replace")
        n = len(re.findall(r"data-lo-save\b", t)) + len(re.findall(r"data-official-verb\b", t))
        by[dest] = by.get(dest, 0) + n
    return [d for d, n in sorted(by.items()) if n < 2]


def process_year(year: str) -> tuple[int, int]:
    ydir = ROOT / "years" / year / "sites"
    changed = 0
    scanned = 0
    for path in sorted(ydir.rglob("*.html")):
        dest = dest_of(path, year)
        if not dest:
            continue
        hops = hops_for(year, dest)
        if not hops:
            continue
        scanned += 1
        html = path.read_text(encoding="utf-8", errors="replace")
        new = repair_dead_index(html, year)
        # 2011: do not grow the already-huge 3× dest-list dump. 2×-strip only.
        if year != "2011":
            new = ensure_3x(new, year, hops)
        new = ensure_2x(new, year, hops)
        new = relabel_plaque(new, dest)
        if new != html:
            path.write_text(new, encoding="utf-8")
            changed += 1
    return scanned, changed


def main(argv: list[str]) -> int:
    years = argv[1:] or list(MASS.keys())
    print("H1–H5 legal 2× hops · dests on disk only")
    before = {y: count_tree(y) for y in years}
    for year in years:
        if year not in MASS:
            print("  skip unknown year", year)
            continue
        scanned, changed = process_year(year)
        dests, htmln = count_tree(year)
        under = writers_under2(year)
        print(
            f"  {year} scanned={scanned} rewritten={changed} "
            f"dests={len(dests)} html={htmln} under2={len(under)}"
        )
        if before[year][0] != dests:
            print("  DEST FOLDERS CHANGED", year)
            return 1
        if before[year][1] != htmln:
            print("  HTML COUNT CHANGED", year)
            return 1
        if year == "2014" and (ROOT / "years/2014/sites/google").exists():
            print("  FAIL 2014 google dest exists")
            return 1
        if under:
            print("  under2", under[:8])
            return 1
    print("dest folders + HTML counts unchanged · writers <2 = 0")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
