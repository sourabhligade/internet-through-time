#!/usr/bin/env python3
"""Wave 2 — 2001–2003 mass session on dests already on disk.

No new dest folders. Stamp official-verb on official n=2–9.
Deepen Yahoo / Google / Amazon / CNN leftover. 3× from gold to those dests.

See docs/EVERY-YEAR-IMPROVE-FLOWS-LINKS-GOALS-PHASES-MINUTE-2026-09-03.md
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Official n=2–9 only. n=1 gold and n=10 games stay off this stamp.
OFFICIAL = {
    "2001": [
        ("sites/archive/index.html", "itt01-wayback", "Pre-2001 URL leftover", "Live archive.org as star (trap)", "Open leftover URL"),
        ("sites/itunes/index.html", "itt01-itunes", "Ripped album leftover", "iTunes Store 99¢ (trap)", "Open leftover library"),
        ("sites/apple/ipod.html", "itt01-ipod", "Scroll-wheel leftover", "iPhone (trap)", "Open leftover iPod"),
        ("sites/napster/index.html", "itt01-napster", "leftover.mp3 theater", "Live download (trap)", "Search leftover Napster"),
        ("sites/movabletype/index.html", "itt01-mt", "Perl leftover", "Medium as this dest (trap)", "Open leftover MT"),
        ("sites/google/index.html", "itt01-google", "sparse leftover query", "Lucky as 2001 star (trap)", "Search leftover"),
        ("sites/yahoo/index.html", "itt01-yahoo", "News leftover", "Google as 2001 star (trap)", "Open leftover directory"),
        ("sites/amazon/index.html", "itt01-amz", "smile leftover book", "1-Click as 2001-new (trap)", "Search leftover smile"),
    ],
    "2002": [
        ("sites/isp/index.html", "itt02-broadband", "always-on leftover", "5G (trap)", "Open leftover broadband"),
        ("sites/kazaa/index.html", "itt02-kazaa", "leftover query", "Live download (trap)", "Search leftover KaZaA"),
        ("sites/wired/index.html", "itt02-wired", "CSS leftover", "Firefox 1.0 (trap)", "Open leftover Wired"),
        ("sites/phoenix/index.html", "itt02-phoenix", "Phoenix leftover", "Firefox 1.0 wordmark (trap)", "Open leftover Phoenix"),
        ("sites/mozilla/index.html", "itt02-mozilla", "Mozilla 1.0 leftover", "Firefox 1.0 (trap)", "Open leftover Mozilla"),
        ("sites/ipod/index.html", "itt02-ipod2", "gen 2 leftover", "iPhone (trap)", "Open leftover iPod"),
        ("sites/friendster/index.html", "itt02-fs", "seed leftover", "MySpace mass (trap)", "Open leftover Friendster"),
        ("sites/movabletype/trackback.html", "itt02-trackback", "ping leftover", "Twitter (trap)", "Open leftover TrackBack"),
    ],
    "2003": [
        ("sites/itunes/index.html", "itt03-itunes-library", "99¢ leftover browse", "Store as gold (trap)", "Browse leftover Store"),
        ("sites/wordpress/dashboard.html", "itt03-wp-posts", "0.7 leftover title", "WordPress 2017 (trap)", "Open leftover WP"),
        ("sites/linkedin/invite.html", "itt03-li-connections", "one invite leftover", "Live invite (trap)", "Send leftover invite"),
        ("sites/myspace/index.html", "itt03-ms-top8", "HTML leftover", "2017 MySpace (trap)", "Open leftover MySpace"),
        ("sites/friendster/friends.html", "itt03-fs-mass", "add friend leftover", "2002 seed as mass (trap)", "Open leftover friends"),
        ("sites/adsense/index.html", "itt03-adsense", "snippet leftover", "Live ads (trap)", "Paste leftover snippet"),
        ("sites/bloglines/index.html", "itt03-bloglines-feeds", "feed URL leftover", "Live Bloglines (trap)", "Add leftover feed"),
        ("sites/blogger/edit.html", "itt03-blog", "Feb 17 leftover", "WordPress as this dest (trap)", "Open leftover Blogger"),
    ],
}

# Leftover-only mass dests (not official 10, or also official). Deepen next + 3×.
MASS = {
    "2001": [
        ("sites/yahoo/index.html", "../google/index.html", "Google leftover"),
        ("sites/google/index.html", "../cnn/index.html", "CNN leftover"),
        ("sites/amazon/index.html", "../yahoo/index.html", "Yahoo leftover"),
        ("sites/cnn/index.html", "../wikipedia/edit.html", "Wikipedia edit"),
        ("sites/msn/index.html", "../yahoo/index.html", "Yahoo leftover"),
    ],
    "2002": [
        ("sites/yahoo/index.html", "../googlenews/index.html", "Google News leftover"),
        ("sites/google/index.html", "../stumbleupon/index.html", "StumbleUpon"),
        ("sites/amazon/index.html", "../yahoo/index.html", "Yahoo leftover"),
    ],
    "2003": [
        ("sites/yahoo/index.html", "../photobucket/index.html", "Photobucket"),
        ("sites/google/index.html", "../yahoo/index.html", "Yahoo leftover"),
        ("sites/amazon/index.html", "../yahoo/index.html", "Yahoo leftover"),
        ("sites/cnn/index.html", "../photobucket/index.html", "Photobucket"),
    ],
}

GOLD_3X = {
    "2001": (
        "sites/wikipedia/edit.html",
        [
            ("../yahoo/index.html", "Yahoo leftover"),
            ("../google/index.html", "Google leftover"),
            ("../amazon/index.html", "Amazon smile leftover"),
            ("../cnn/index.html", "CNN leftover"),
        ],
    ),
    "2002": (
        "sites/stumbleupon/index.html",
        [
            ("../yahoo/index.html", "Yahoo leftover"),
            ("../google/index.html", "Google leftover"),
            ("../amazon/index.html", "Amazon leftover"),
        ],
    ),
    "2003": (
        "sites/photobucket/index.html",
        [
            ("../yahoo/index.html", "Yahoo leftover"),
            ("../google/index.html", "Google leftover"),
            ("../amazon/index.html", "Amazon leftover"),
            ("../cnn/index.html", "CNN leftover"),
            ("../wikipedia/index.html", "Wikipedia leftover"),
        ],
    ),
}

BLOCK_MARK = "ITT-W2-OFFICIAL"


def stamp_html_key(html: str, key: str) -> str:
    if f'data-official-key="{key}"' in html:
        return html
    if "data-official-key=" in html:
        return html
    return re.sub(
        r"(<html\b)([^>]*)>",
        rf'\1\2 data-official-key="{key}">',
        html,
        count=1,
        flags=re.I,
    )


def official_block(year: str, key: str, field_ph: str, trap: str, verb: str) -> str:
    return (
        f"<!-- {BLOCK_MARK}:{key}:start -->\n"
        f'<div class="itt-w2-official" data-itt-year="{year}" '
        'style="margin:14px auto;padding:10px;border:1px solid #333;'
        'background:#fff;font-family:Arial,sans-serif;font-size:13px;max-width:46em">\n'
        f"<p><b>Period leftover</b> · not the chip · empty / trap never writes · <code>{key}</code></p>\n"
        f'<p><label>Leftover<br>\n'
        f'<input type="text" data-official-need data-official-min="2" maxlength="80" '
        f'placeholder="{field_ph}" autocomplete="off"></label></p>\n'
        f'<p><label><input type="checkbox" data-official-req> Leftover. Not the year star.</label></p>\n'
        f'<p><label><input type="checkbox" data-official-req> Empty / trap never writes.</label></p>\n'
        f"<p>\n"
        f' <button type="button" data-official-trap>{trap}</button>\n'
        f' <button type="button" data-official-verb>{verb}</button>\n'
        f"</p>\n"
        f'<p data-official-status></p>\n'
        f"</div>\n"
        f"<!-- {BLOCK_MARK}:{key}:end -->\n"
    )


def insert_before_script_or_lo(html: str, block: str) -> str:
    if BLOCK_MARK in html:
        return html
    if "<!-- ITT-LO-OFFICIAL:start -->" in html:
        return html.replace("<!-- ITT-LO-OFFICIAL:start -->", block + "<!-- ITT-LO-OFFICIAL:start -->", 1)
    m = re.search(r'<script src="[^"]*immersion-\d{4}\.js"></script>', html)
    if m:
        i = m.start()
        return html[:i] + block + html[i:]
    return html.replace("</body>", block + "</body>", 1)


def ensure_next(html: str, key: str, href: str, label: str) -> str:
    needle = f'data-next-when-key="{key}"'
    if needle in html:
        return html
    nxt = (
        f'<p hidden data-next-flow data-next-when-key="{key}">'
        f"<b>Next:</b> <a href=\"{href}\">{label}</a></p>\n"
    )
    if "<!-- ITT-LO-OFFICIAL:start -->" in html:
        return html.replace("<!-- ITT-LO-OFFICIAL:start -->", nxt + "<!-- ITT-LO-OFFICIAL:start -->", 1)
    return html.replace("</body>", nxt + "</body>", 1)


def ensure_3x_links(html: str, links: list[tuple[str, str]]) -> str:
    m = re.search(r'(<nav class="itt-3x-also"[^>]*>)(.*?)(</nav>)', html, re.S | re.I)
    if not m:
        extras = " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in links)
        nav = (
            f'<nav class="itt-3x-also" data-itt-3x-also '
            f'style="margin:12px 0;padding:8px;border:1px dashed #888;'
            f'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
            f"<b>Also this year · 3×</b> · {extras}</nav>\n"
        )
        return html.replace("</body>", nav + "</body>", 1)
    inner = m.group(2)
    add = []
    for href, lab in links:
        slug = ""
        sm = re.search(r"\.\./([^/]+)/", href)
        if sm:
            slug = sm.group(1)
        if slug and f"../{slug}/" in inner:
            continue
        if href in inner:
            continue
        add.append(f'<a href="{href}">{lab}</a>')
    if not add:
        return html
    extra = " ·\n " + " ·\n ".join(add)
    # insert before closing p if present
    new_inner = inner
    if "</p>" in inner:
        new_inner = inner.replace("</p>", extra + "\n</p>", 1)
    else:
        new_inner = inner + extra
    return html[: m.start()] + m.group(1) + new_inner + m.group(3) + html[m.end() :]


def process() -> dict:
    stats = {"official": 0, "next": 0, "gold3x": 0, "missing": 0, "skipped_gold": 0}
    for year, rows in OFFICIAL.items():
        for rel, key, ph, trap, verb in rows:
            path = ROOT / "years" / year / rel
            if not path.is_file():
                print("  MISSING official", year, rel)
                stats["missing"] += 1
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            if "data-official-verb" in html and f'data-official-key="{key}"' in html:
                continue
            html = stamp_html_key(html, key)
            html = insert_before_script_or_lo(html, official_block(year, key, ph, trap, verb))
            path.write_text(html, encoding="utf-8")
            stats["official"] += 1

    for year, rows in MASS.items():
        for rel, nxt, lab in rows:
            path = ROOT / "years" / year / rel
            if not path.is_file():
                print("  MISSING mass", year, rel)
                stats["missing"] += 1
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            # leftover next key is year leftover, not gold
            key_guess = None
            km = re.search(r'data-next-when-key="(itt\d{2}-[^"]+)"', html)
            if km:
                key_guess = km.group(1)
            else:
                lo = re.search(r"<code>(itt\d{2}-[^<]+)</code>", html)
                key_guess = lo.group(1) if lo else None
            if key_guess and f'data-next-when-key="{key_guess}"' not in html:
                html = ensure_next(html, key_guess, nxt, lab)
                stats["next"] += 1
            elif key_guess is None:
                # synthesize leftover next from lo-key
                ym = {"2001": "itt01", "2002": "itt02", "2003": "itt03"}[year]
                slug = Path(rel).parent.name
                html = ensure_next(html, f"{ym}-{slug}", nxt, lab)
                stats["next"] += 1
            path.write_text(html, encoding="utf-8")

    for year, (grel, links) in GOLD_3X.items():
        path = ROOT / "years" / year / grel
        if not path.is_file():
            print("  MISSING gold", year, grel)
            stats["missing"] += 1
            continue
        html = path.read_text(encoding="utf-8", errors="replace")
        if "data-official-verb" in html and "data-official-key" in html:
            # gold may have official-key for the star — do not add official-verb
            stats["skipped_gold"] += 0
        new = ensure_3x_links(html, links)
        if new != html:
            path.write_text(new, encoding="utf-8")
            stats["gold3x"] += 1

    return stats


def main() -> int:
    print("Wave 2 — 2001–2003 mass session (no new dests)")
    before = {
        y: sorted(p.name for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir())
        for y in ("2001", "2002", "2003")
    }
    stats = process()
    after = {
        y: sorted(p.name for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir())
        for y in ("2001", "2002", "2003")
    }
    print("  stats", stats)
    for y in before:
        if before[y] != after[y]:
            print("  DEST FOLDERS CHANGED", y, set(after[y]) - set(before[y]))
            return 1
    print("  dest folders unchanged")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
