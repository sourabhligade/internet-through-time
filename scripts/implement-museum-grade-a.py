#!/usr/bin/env python3
"""Implement museum-grade A close-order on existing rooms. No new dests. No invented pixels."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2006", "2007"}
SKIP_BTN = (
    "data-4x-",
    "data-5x-",
    "data-pop-",
    "data-lo-",
    "data-official-trap",
    "data-itt-popular",
    "data-yg-",
    "trap",
)

CLONE_SITES = (
    "yahoo",
    "amazon",
    "ebay",
    "google",
    "hotmail",
    "geocities",
    "altavista",
    "cnn",
    "gmail",
)

CHIP = (
    '<p class="itt-continuity-chip" data-itt-continuity-archive="1" data-itt-forest="1" '
    'style="font-size:11px;background:#ffc;border:1px solid #c90;padding:6px 8px;margin:8px 0;'
    'font-family:Arial,sans-serif"><b>Continuity archive</b> — this room is held over from an '
    "earlier year. Year-true products sit on the Starting Point chips and the star.</p>\n"
)

FAILED = (
    '<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px;margin:8px 0;'
    'font-family:Arial,sans-serif">[failed-final] Period mark · CSS / wordmark only · '
    "no invented brand pixels</p>\n"
)

VERB_LABEL = {
    "lycos": "Search the catalog",
    "nasa": "Open a NASA dest",
    "hotwired": "Open HotWired",
    "cern": "Open WWW",
    "yahoo": "Browse leftover",
    "altavista": "Search leftover",
    "cnn": "Open a headline",
    "microsoft": "Open leftover",
    "netscape": "Download leftover",
    "classmates": "Find leftover",
    "excite": "Search leftover",
    "geocities": "Open homestead leftover",
    "auctionweb": "Bid leftover",
    "spacejam": "Hop leftover",
    "drudge": "Open a story",
    "hotbot": "Search leftover",
    "aim": "Sign on leftover",
    "dmoz": "Open leftover cat",
    "cdnow": "Find leftover CD",
    "mozilla": "Open leftover",
    "slashdot": "Open leftover",
    "blogger": "Publish leftover",
    "y2k": "Mark leftover",
    "sourceforge": "Open leftover project",
    "askjeeves": "Ask leftover",
    "gnutella": "Search leftover",
    "pets": "Add leftover",
    "ipod": "Open leftover 1,000 songs",
    "itunes": "Open leftover",
    "broadband": "Open leftover",
    "ie6": "Open leftover IE6",
    "wayback": "Open leftover",
    "movabletype": "Publish leftover",
    "stumbleupon": "Stumble leftover",
    "friendster": "Open leftover profile",
    "kazaa": "Search leftover",
    "googlenews": "Open leftover",
    "wikipedia": "Open leftover",
    "daypop": "Open leftover",
    "wired": "Open leftover",
    "myspace": "Open leftover profile",
    "linkedin": "Connect leftover",
    "bloglines": "Open leftover",
    "adsense": "Open leftover",
    "wordpress": "Open leftover",
    "gmail": "Open leftover invite",
    "firefox": "Download leftover",
    "flickr": "Upload leftover",
    "delicious": "Save leftover",
    "digg": "Digg leftover",
    "facebook": "Open leftover",
    "web20conference": "Open leftover",
    "youtube": "Open leftover",
    "maps": "Drag leftover",
    "pandora": "Tune leftover",
    "housingmaps": "Open leftover",
    "reddit": "Boost leftover",
    "techcrunch": "Open leftover",
    "appstore": "Install leftover",
    "chrome": "Open leftover",
    "android": "Open leftover G1",
    "hulu": "Play leftover",
    "twitter": "Post leftover",
    "dropbox": "Open leftover",
    "iphone": "Open leftover",
    "windows7": "Open leftover",
    "instagram": "Share leftover",
    "siri": "Ask leftover",
    "airbnb": "Open leftover",
    "qwikster": "Open leftover",
    "pokemongo": "Catch leftover",
    "fortnite": "Drop leftover",
    "gdpr": "Manage leftover",
    "tiktok": "Open leftover FYP",
    "periscope": "Go LIVE leftover",
    "disneyplus": "Continue leftover",
}


def parse_official():
    ft = (ROOT / "js/config/flow-trails.js").read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(r'\n    "(\d{4})": \[', ft):
        y = m.group(1)
        arr = ft[m.end() : ft.find("\n    ]", m.end())]
        rows = []
        for rec in re.finditer(r"\{([^}]+)\}", arr):
            recs = rec.group(1)
            name = re.search(r'"name": "([^"]+)"', recs)
            href = re.search(r'"href": "([^"]+)"', recs)
            key = re.search(r'"whenKey": "([^"]+)"', recs)
            if href and key:
                rows.append((name.group(1) if name else "?", href.group(1), key.group(1)))
        out[y] = rows
    return out


def skip_tag(tag: str) -> bool:
    low = tag.lower()
    return any(s in low for s in SKIP_BTN)


def add_key(html: str, key: str) -> str:
    if "data-official-key=" in html:
        return html
    if "<html " in html:
        return html.replace("<html ", f'<html data-official-key="{key}" ', 1)
    if "<html>" in html:
        return html.replace("<html>", f'<html data-official-key="{key}">', 1)
    return html


def mark_verb(html: str) -> str:
    if "data-official-verb" in html:
        return html
    for rx in (
        r"<input\b[^>]*type=\"submit\"[^>]*>",
        r"<button\b[^>]*>",
        r"<input\b[^>]*type=\"image\"[^>]*>",
    ):
        for m in re.finditer(rx, html, re.I):
            tag = m.group(0)
            if skip_tag(tag):
                continue
            if "data-official-verb" in tag:
                return html
            new = tag[:-1] + " data-official-verb>"
            return html[: m.start()] + new + html[m.end() :]
    return html


def insert_verb(html: str, label: str) -> str:
    if "data-official-verb" in html:
        return html
    block = (
        "\n<!-- ITT-OFFICIAL-VERB:start -->\n"
        f'<p><button type="button" data-official-verb>{label}</button> '
        '<span data-official-status>Period verb. Empty / trap never writes.</span></p>\n'
        "<!-- ITT-OFFICIAL-VERB:end -->\n"
    )
    if "</h1>" in html:
        return html.replace("</h1>", "</h1>" + block, 1)
    return re.sub(
        r'(<div id="itt-nav-slot"[^>]*>\s*</div>)',
        r"\1" + block,
        html,
        count=1,
    )


def stamp_official() -> int:
    n = 0
    official = parse_official()
    for y, rows in official.items():
        if y in WIPED or int(y) > 2019:
            continue
        yd = ROOT / "years" / y
        if not yd.exists():
            continue
        for name, href, key in rows:
            if "playable/game" in href:
                continue
            if "spacejam" in href:
                continue
            path = yd / href
            if not path.exists():
                print("MISS", path)
                continue
            html = path.read_text(encoding="utf-8", errors="ignore")
            orig = html
            html = add_key(html, key)
            html = mark_verb(html)
            if "data-official-verb" not in html:
                slug = href.split("/")[1] if "/" in href else name
                label = VERB_LABEL.get(slug, "Do leftover")
                html = insert_verb(html, label)
            if html != orig:
                path.write_text(html, encoding="utf-8")
                n += 1
    return n


def relabel_4x() -> int:
    n = 0
    repls = (
        ("Type leftover", "Do leftover"),
        (">Do this<", ">Do leftover<"),
        ("Type to confirm", "Confirm leftover"),
        ("Open leftover essay", "Open leftover"),
        ("Save this dest", "Save leftover dest"),
        ("Find this CD", "Find leftover CD"),
        ("Open leftover headline", "Open leftover"),
    )
    for p in ROOT.glob("years/20*/sites/**/*.html"):
        y = p.parts[p.parts.index("years") + 1]
        if y in WIPED or int(y) < 2014 or int(y) > 2019:
            continue
        html = p.read_text(encoding="utf-8", errors="ignore")
        orig = html
        for a, b in repls:
            html = html.replace(a, b)
        if html != orig:
            p.write_text(html, encoding="utf-8")
            n += 1
    return n


def failed_final_official() -> int:
    n = 0
    official = parse_official()
    for y in [str(x) for x in range(2009, 2020)]:
        if y == "2010":
            continue  # has a few stills; gold already cited
        rows = official.get(y, [])
        yd = ROOT / "years" / y
        for name, href, key in rows:
            if "playable/" in href:
                continue
            path = yd / href
            if not path.exists():
                continue
            html = path.read_text(encoding="utf-8", errors="ignore")
            if "failed-final" in html or "archive-residual" in html or "itt-pixel-failed" in html:
                continue
            if 'id="itt-nav-slot"' in html:
                html = re.sub(
                    r'(<div id="itt-nav-slot"[^>]*>\s*</div>)',
                    r"\1\n" + FAILED,
                    html,
                    count=1,
                )
            else:
                html = re.sub(r"(<body[^>]*>)", r"\1\n" + FAILED, html, count=1)
            path.write_text(html, encoding="utf-8")
            n += 1
    return n


def continuity() -> int:
    n = 0
    for y in ("2002", "2003", "2004", "2005", "2008"):
        sites = ROOT / "years" / y / "sites"
        if not sites.is_dir():
            continue
        for slug in CLONE_SITES:
            path = sites / slug / "index.html"
            if not path.exists():
                continue
            html = path.read_text(encoding="utf-8", errors="ignore")
            if "itt-continuity-chip" in html or "data-itt-continuity" in html:
                continue
            if 'id="itt-nav-slot"' in html:
                html = re.sub(
                    r'(<div id="itt-nav-slot"[^>]*>\s*</div>)',
                    r"\1\n" + CHIP,
                    html,
                    count=1,
                )
            else:
                html = re.sub(r"(<body[^>]*>)", r"\1\n" + CHIP, html, count=1)
            path.write_text(html, encoding="utf-8")
            n += 1
    return n


def wrap_home_more() -> int:
    n = 0
    for y in [str(x) for x in range(1994, 2000)]:
        path = ROOT / "years" / y / "pages" / "home.html"
        if not path.exists():
            continue
        html = path.read_text(encoding="utf-8", errors="ignore")
        if 'class="itt-home-more"' in html or "data-itt-home-more" in html:
            continue
        # wrap leftover rails after first 5x atlas / pop3x block start
        m = re.search(r'(<p[^>]*(?:data-itt-pop3x|itt-5x-atlas|itt-2x-trails)[^>]*>)', html)
        if not m:
            continue
        html = (
            html[: m.start()]
            + '<div class="itt-home-more" data-itt-home-more="1"><p class="itt-home-more-label">Also this year</p>\n'
            + html[m.start():]
        )
        if "</body>" in html:
            html = html.replace("</body>", "</div>\n</body>", 1)
        path.write_text(html, encoding="utf-8")
        n += 1
    return n


def main() -> None:
    a = stamp_official()
    b = relabel_4x()
    c = failed_final_official()
    d = continuity()
    e = wrap_home_more()
    print("official dests stamped", a)
    print("4x relabeled", b)
    print("failed-final added", c)
    print("continuity chips", d)
    print("home-more wrap", e)


if __name__ == "__main__":
    main()
