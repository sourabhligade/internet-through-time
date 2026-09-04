#!/usr/bin/env python3
"""Wave 3 — 3× hops on 2010 + 2013–2016 gold and official dests.

No new dest folders. See docs/THIN-YEARS-FLOWS-LINKS-RESEARCH-2026-09-03.md
and EVERY-YEAR-IMPROVE Wave 3.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# dest slug -> preferred file under that dest (index if present)
HOPS = {
    "2010": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("twitter", "Twitter leftover"),
        ("tumblr", "Tumblr leftover"),
        ("reddit", "Reddit leftover"),
        ("netflix", "Netflix leftover"),
    ],
    "2013": [
        ("facebook", "Facebook leftover"),
        ("instagram", "Instagram leftover"),
        ("youtube", "YouTube leftover"),
        ("twitter", "Twitter leftover"),
        ("tumblr", "Tumblr leftover"),
        ("snapchat", "Snapchat leftover"),
    ],
    "2014": [
        ("facebook", "Facebook leftover"),
        ("instagram", "Instagram leftover"),
        ("youtube", "YouTube leftover"),
        ("wikipedia", "Wikipedia leftover"),
        ("twitter", "Twitter leftover"),
        ("slack", "Slack leftover"),
    ],
    "2015": [
        ("instagram", "Instagram leftover"),
        ("spotify", "Spotify leftover"),
        ("netflix", "Netflix leftover"),
        ("windows10", "Windows 10 leftover"),
        ("snapchat", "Snapchat leftover"),
        ("googlephotos", "Google Photos leftover"),
    ],
    "2016": [
        ("facebook", "Facebook leftover"),
        ("youtube", "YouTube leftover"),
        ("whatsapp", "WhatsApp leftover"),
        ("vine", "Vine leftover"),
        ("pokemongo", "Pokémon GO leftover"),
        ("snapchat", "Snapchat leftover"),
    ],
}

OFFICIAL_FILES = {
    "2010": [
        "sites/instagram/index.html",
        "sites/iphone/index.html",
        "sites/ipad/order.html",
        "sites/facebook/index.html",
        "sites/farmville/index.html",
        "sites/imgur/index.html",
        "sites/foursquare/index.html",
        "sites/twitter/index.html",
        "sites/youtube/index.html",
    ],
    "2013": [
        "sites/vine/record.html",
        "sites/vine/index.html",
        "sites/instagram/video.html",
        "sites/instagram/index.html",
        "sites/snapchat/story.html",
        "sites/snapchat/index.html",
        "sites/iphone/ios7.html",
        "sites/iphone/touchid.html",
        "sites/snowden/index.html",
        "sites/telegram/index.html",
        "sites/tumblr/index.html",
        "sites/windows81/index.html",
    ],
    "2014": [
        "sites/whatsapp/index.html",
        "sites/whatsapp/chat.html",
        "sites/heartbleed/index.html",
        "sites/icebucket/index.html",
        "sites/iphone/index.html",
        "sites/iphone/pay.html",
        "sites/material/index.html",
        "sites/slack/index.html",
        "sites/twitch/index.html",
    ],
    "2015": [
        "sites/periscope/index.html",
        "sites/googlephotos/index.html",
        "sites/windows10/index.html",
        "sites/applemusic/index.html",
        "sites/edge/index.html",
        "sites/apple/watch.html",
        "sites/snapchat/discover.html",
        "sites/discord/index.html",
        "sites/letsencrypt/index.html",
    ],
    "2016": [
        "sites/instagram/stories.html",
        "sites/instagram/index.html",
        "sites/instagram/about.html",
        "sites/pokemongo/index.html",
        "sites/facebook/reactions.html",
        "sites/facebook/index.html",
        "sites/whatsapp/e2e.html",
        "sites/iphone/index.html",
        "sites/vine/goodbye.html",
        "sites/snapchat/spectacles.html",
        "sites/musically/index.html",
        "sites/windows10/end.html",
    ],
}

MARK = "ITT-W3-3X"


def dest_href(slug: str, year: str) -> str | None:
    d = ROOT / "years" / year / "sites" / slug
    if (d / "index.html").is_file():
        return f"../{slug}/index.html"
    htmls = sorted(d.glob("*.html")) if d.is_dir() else []
    if htmls:
        return f"../{slug}/{htmls[0].name}"
    return None


def ensure_strip(html: str, year: str, hops: list[tuple[str, str]]) -> str:
    parts = []
    for slug, lab in hops:
        href = dest_href(slug, year)
        if not href:
            continue
        parts.append((slug, href, lab))
    if not parts:
        return html

    m = re.search(r'(<nav class="itt-3x-also"[^>]*>)(.*?)(</nav>)', html, re.S | re.I)
    if m:
        inner = m.group(2)
        add = []
        for slug, href, lab in parts:
            if f"../{slug}/" in inner:
                continue
            add.append(f'<a href="{href}">{lab}</a>')
        if not add:
            return html
        extra = " ·\n " + " ·\n ".join(add)
        if "</p>" in inner:
            new_inner = inner.replace("</p>", extra + "\n</p>", 1)
        else:
            new_inner = inner + extra
        return html[: m.start()] + m.group(1) + new_inner + m.group(3) + html[m.end() :]

    extras = " · ".join(f'<a href="{h}">{lab}</a>' for _, h, lab in parts)
    nav = (
        f"<!-- {MARK}:start -->\n"
        f'<nav class="itt-3x-also" data-itt-3x-also data-itt-year="{year}" '
        f'style="margin:12px 0;padding:8px;border:1px dashed #888;'
        f'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
        f"<b>Also this year · 3×</b> · {extras}</nav>\n"
        f"<!-- {MARK}:end -->\n"
    )
    if "</body>" in html:
        return html.replace("</body>", nav + "</body>", 1)
    return html + nav


def main() -> int:
    print("Wave 3 — 2010 + 2013–2016 3× hops")
    before = {
        y: sorted(p.name for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir())
        for y in HOPS
    }
    n = 0
    miss = 0
    for year, files in OFFICIAL_FILES.items():
        hops = HOPS[year]
        for rel in files:
            path = ROOT / "years" / year / rel
            if not path.is_file():
                print("  skip missing", year, rel)
                miss += 1
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            new = ensure_strip(html, year, hops)
            if new != html:
                path.write_text(new, encoding="utf-8")
                n += 1
    after = {
        y: sorted(p.name for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir())
        for y in HOPS
    }
    print(f"  rewritten {n} files · missing dest files {miss}")
    for y in before:
        if before[y] != after[y]:
            print("  DEST FOLDERS CHANGED", y)
            return 1
    print("  dest folders unchanged")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
