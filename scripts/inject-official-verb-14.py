#!/usr/bin/env python3
"""Add official-verb writers on leftover-only official n=2–10 dests."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

DESTS = [
    ("1996", "sites/spacejam/index.html", "itt96-jam", "../yahoo/my.html", "My Yahoo!"),
    ("2005", "sites/maps/index.html", "itt05-maps", "../pandora/index.html", "Pandora leftover"),
    ("2005", "sites/pandora/index.html", "itt05-pandora", "../housingmaps/index.html", "HousingMaps leftover"),
    ("2005", "sites/housingmaps/index.html", "itt05-hm", "../digg/index.html", "Digg leftover"),
    ("2005", "sites/reddit/index.html", "itt05-reddit", "../flickr/index.html", "Flickr leftover"),
    ("2005", "sites/itunes/podcasts.html", "itt05-pod", "../techcrunch/index.html", "TechCrunch leftover"),
    ("2005", "sites/techcrunch/index.html", "itt05-tc", "../playable/game.html", "HoverChop"),
    ("2006", "sites/facebook/open.html", "itt06-fb-open", "../youtube/index.html", "YouTube Google-owned leftover"),
    ("2006", "sites/googledocs/index.html", "itt06-gdocs", "../aws/index.html", "S3 leftover"),
    ("2006", "sites/aws/index.html", "itt06-s3", "../ie7/index.html", "IE7 leftover"),
    ("2006", "sites/ie7/index.html", "itt06-ie7", "../wikipedia/millionth.html", "Wiki millionth leftover"),
    ("2006", "sites/wikipedia/millionth.html", "itt06-wiki-1m", "../roblox/index.html", "Roblox leftover"),
    ("2006", "sites/roblox/index.html", "itt06-roblox", "../playable/linerider.html", "Line Rider leftover"),
    ("2006", "sites/playable/linerider.html", "itt06-game-linerider", "../twitter/index.html", "★ Twttr"),
]


def verb_block(key: str, next_href: str, next_label: str) -> str:
    return (
        "\n<!-- ITT-OFFICIAL-VERB:start -->\n"
        '<div data-official-verb-host="1" style="margin:12px 0;padding:10px;border:1px solid #333;'
        'max-width:46em;font-family:Arial,sans-serif;font-size:12px;background:#fff">\n'
        f"<p><b>Official leftover</b> · writes <code>{key}</code> · leftover plaques never stamp this key.</p>\n"
        '<p><label>Official leftover note<br>\n'
        '<input type="text" data-official-need data-official-min="2" maxlength="80" '
        'placeholder="official leftover" autocomplete="off"></label></p>\n'
        '<p><label><input type="checkbox" data-official-req> I opened this official leftover room.</label></p>\n'
        '<p><label><input type="checkbox" data-official-req> Empty / trap never writes.</label></p>\n'
        "<p>\n"
        ' <button type="button" data-official-trap>Neighbor year (trap)</button>\n'
        ' <button type="button" data-official-verb>Save official leftover</button>\n'
        "</p>\n"
        "<p data-official-status></p>\n"
        f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> '
        f'<a href="{next_href}">{next_label}</a></p>\n'
        "</div>\n"
        "<!-- ITT-OFFICIAL-VERB:end -->\n"
    )


def add_official_key(html: str, key: str) -> str:
    if 'data-official-key="' in html:
        return html
    m = re.search(r"<html([^>]*)>", html, re.I)
    if not m:
        return html
    attrs = m.group(1)
    return html[: m.start()] + f'<html{attrs} data-official-key="{key}">' + html[m.end() :]


def inject(path: Path, key: str, next_href: str, next_label: str) -> bool:
    html = path.read_text(encoding="utf-8", errors="replace")
    if "data-official-verb" in html and f'data-official-key="{key}"' in html:
        return False
    html = add_official_key(html, key)
    if "ITT-OFFICIAL-VERB:start" in html:
        path.write_text(html, encoding="utf-8")
        return True
    block = verb_block(key, next_href, next_label)
    m = re.search(r"</h1>", html, re.I)
    if m:
        html = html[: m.end()] + block + html[m.end() :]
    else:
        m = re.search(r'<div id="itt-nav-slot"[^>]*>.*?</div>', html, re.S)
        if m:
            html = html[: m.end()] + block + html[m.end() :]
        else:
            html = block + html
    path.write_text(html, encoding="utf-8")
    return True


def main() -> None:
    n = 0
    for year, href, key, nxt, label in DESTS:
        dest = ROOT / "years" / year / href
        if not dest.is_file():
            print("MISSING", dest)
            continue
        if inject(dest, key, nxt, label):
            n += 1
            print("ok", year, href, key)
        else:
            print("skip", year, href)
    print("injected", n)


if __name__ == "__main__":
    main()
