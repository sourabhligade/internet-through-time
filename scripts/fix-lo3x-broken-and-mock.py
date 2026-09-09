#!/usr/bin/env python3
"""Fix leftover-3× leaks + official first/second leftover-3× on live years.

- Wrap original leftover rooms that share a dest with leftover-3×.
- Strip leftover-3× first/second from official dests (keep pop3). 2001 google/yahoo HOLD stays.
Does not dest-farm. Does not rebuild wiped years. Does not leftover-3× gold dests.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2020", "2023", "2024", "2025"}

OFFICIAL = {
    "1994": {"csotd", "yahoo", "cern", "fishcam", "whitehouse", "nasa", "iuma", "hotwired", "lycos", "playable"},
    "1995": {"amazon", "auctionweb", "geocities", "yahoo", "altavista", "cnn", "microsoft", "netscape", "classmates", "playable"},
    "1996": {"portals", "hotmail", "spacejam", "yahoo", "geocities", "amazon", "auctionweb", "excite", "altavista", "playable"},
    "1997": {"pointcast", "icq", "ebay", "hotmail", "slashdot", "drudge", "hotbot", "aim", "apple", "microsoft"},
    "1998": {"google", "yahoo", "amazon", "ebay", "cdnow", "hotmail", "mozilla", "slashdot", "dmoz", "playable"},
    "1999": {"aim", "napster", "google", "blogger", "y2k", "sourceforge", "paypal", "amazon", "ebay", "askjeeves"},
    "2000": {"mapquest", "amazon", "ebay", "paypal", "napster", "gnutella", "pets", "google", "cnn", "y2k"},
    "2001": {"wikipedia", "archive", "itunes", "apple", "napster", "movabletype", "google", "yahoo", "amazon", "playable"},
    "2002": {"stumbleupon", "isp", "kazaa", "wired", "phoenix", "mozilla", "ipod", "friendster", "movabletype", "playable"},
    "2003": {"photobucket", "itunes", "wordpress", "linkedin", "myspace", "friendster", "adsense", "bloglines", "blogger", "playable"},
    "2004": {"facebook", "gmail", "firefox", "flickr", "delicious", "digg", "web20conference"},
    "2005": {"youtube", "maps", "pandora", "housingmaps", "digg", "reddit", "flickr", "itunes", "techcrunch", "playable"},
    "2006": {"twitter", "facebook", "youtube", "googledocs", "aws", "ie7", "wikipedia", "roblox", "playable"},
    "2007": {"iphone", "streetview", "gmail", "fbplat", "twitter", "youtube", "tumblr", "kindle", "ie6", "playable"},
    "2008": {"github", "appstore", "chrome", "android", "hulu", "facebook", "twitter", "youtube", "dropbox", "iphone"},
    "2009": {"facebook", "farmville", "bing", "iphone", "appstore", "twitter", "foursquare", "kickstarter", "windows7", "playable"},
    "2010": {"instagram", "iphone", "ipad", "facebook", "farmville", "imgur", "foursquare", "twitter", "youtube", "playable"},
    "2011": {"googleplus", "spotify", "iphone", "facebook", "ipad", "airbnb", "instagram", "twitter", "qwikster", "playable"},
    "2012": {"instagram", "pinterest", "facebook", "iphone", "wikipedia", "medium", "path", "flipboard", "playable"},
    "2014": {"whatsapp", "heartbleed", "icebucket", "iphone", "material", "slack", "twitch", "playable"},
    "2015": {"periscope", "googlephotos", "windows10", "applemusic", "edge", "apple", "snapchat", "discord", "letsencrypt", "playable"},
    "2016": {"instagram", "pokemongo", "facebook", "whatsapp", "iphone", "vine", "snapchat", "musically", "windows10", "playable"},
    "2017": {"iphone", "fortnite", "twitter", "teams", "vine", "switch", "wannacry", "musically", "equifax", "playable"},
    "2019": {"disneyplus", "tiktok", "arcade", "appletv", "stadia", "iphone", "airpodspro", "chrome", "windows10", "playable"},
    "2021": {"att", "signal", "copilot", "meta", "windows11", "flash", "chrome", "windows10", "facebook", "playable"},
    "2022": {"chatgpt", "twitter", "wordle", "stablediffusion", "mastodon", "bereal", "dalle2", "chrome", "windows10", "playable"},
}
HOLD_FIRST = {("2001", "google"), ("2001", "yahoo")}
FIRST_SECOND = re.compile(
    r"\n?<!-- ITT-POP3X-(?:FIRST|SECOND):([^:]+):start -->.*?<!-- ITT-POP3X-(?:FIRST|SECOND):\1:end -->\n?",
    re.S,
)
TAG = re.compile(r"</?([a-zA-Z][\w:-]*)([^>]*)>", re.S)
VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}


def unkeyed_go(tag: str, attrs: str) -> bool:
    if "data-pop-go" not in attrs:
        return False
    if re.search(r"data-pop-key\s*=", attrs):
        return False
    return tag.lower() in {"button", "a", "input"}


def wrap_html(html: str) -> tuple[str, int]:
    if "data-itt-lo3x" not in html:
        return html, 0
    # Add data-pop-panel to leftover wrappers that already isolate the original room.
    n = 0
    def add_panel(m: re.Match) -> str:
        nonlocal n
        tag = m.group(0)
        if 'data-pop-panel=' in tag:
            return tag
        n += 1
        return tag[:-1] + ' data-pop-panel="1">'

    html2 = re.sub(
        r'<div class="itt-pop3x-flow"(?![^>]*data-pop-panel)[^>]*>',
        add_panel,
        html,
        count=8,
    )
    # Isolated ancestor wrap for remaining unkeyed gos outside leftover-3× / yeslo.
    stack: list[tuple[int, int, str, str]] = []
    adds: list[int] = []
    for m in TAG.finditer(html2):
        raw = m.group(0)
        name = m.group(1).lower()
        attrs = m.group(2) or ""
        closing = raw.startswith("</")
        self_close = raw.endswith("/>") or name in VOID
        if closing:
            while stack and stack[-1][2] != name:
                stack.pop()
            if stack and stack[-1][2] == name:
                stack.pop()
            continue
        if unkeyed_go(name, attrs):
            isolated = None
            for open_start, attr_at, _n, open_attrs in reversed(stack):
                inner = html2[open_start : m.start()]
                if "data-itt-lo3x" in inner or "data-itt-yeslo" in inner:
                    continue
                if "data-pop-field" not in inner and "data-pop-field" not in open_attrs:
                    continue
                if re.search(r'data-pop-panel\s*=\s*"1"', open_attrs):
                    isolated = None
                    break
                isolated = attr_at
                break
            if isolated is not None:
                adds.append(isolated)
        if not self_close:
            stack.append((m.start(), m.start() + 1 + len(m.group(1)), name, attrs))
    if adds:
        for attr_at in sorted(set(adds), reverse=True):
            html2 = html2[:attr_at] + ' data-pop-panel="1"' + html2[attr_at:]
            n += 1
    # Loose leftover cluster: field + unkeyed go as siblings, no panel ancestor.
    loose = re.search(
        r'(<p[^>]*>\s*(?:Popular leftover|Type |Name |Title |<input[^>]*data-pop-field)[\s\S]{0,800}?<button[^>]*data-pop-go(?![^>]*data-pop-key)[^>]*>[\s\S]{0,200}?</p>\s*(?:<p[^>]*data-pop-status[^>]*>.*?</p>\s*)?)',
        html2,
        re.I,
    )
    if loose and "data-pop-panel" not in loose.group(1) and "data-itt-lo3x" not in loose.group(1):
        start, end = loose.span(1)
        # only if this cluster is not already inside a panel (look back 400 chars)
        before = html2[max(0, start - 400) : start]
        if 'data-pop-panel="1"' not in before[-200:]:
            html2 = html2[:start] + '<div data-pop-panel="1">\n' + loose.group(1) + "</div>\n" + html2[end:]
            n += 1
    return html2, n


def strip_official_first_second(year: str, slug: str, html: str) -> tuple[str, int]:
    if (year, slug) in HOLD_FIRST:
        return html, 0
    if slug not in OFFICIAL.get(year, set()):
        return html, 0
    nxt, n = FIRST_SECOND.subn("", html)
    return nxt, n


def main() -> None:
    wrap_n = 0
    strip_n = 0
    for year in [str(y) for y in range(1994, 2026) if str(y) not in WIPED]:
        sites = ROOT / f"years/{year}/sites"
        if not sites.is_dir():
            continue
        for dest in sorted(p for p in sites.iterdir() if p.is_dir()):
            path = dest / "index.html"
            if not path.is_file():
                continue
            html = path.read_text(encoding="utf-8", errors="replace")
            orig = html
            html, s = strip_official_first_second(year, dest.name, html)
            if s:
                strip_n += s
                print("strip official first/second", year, dest.name, s)
            if "data-itt-lo3x" in html:
                html, w = wrap_html(html)
                if w:
                    wrap_n += w
                    print("wrap", year, dest.name, w)
            if html != orig:
                path.write_text(html, encoding="utf-8")
    print(f"stripped {strip_n} official first/second leftover-3× · wrapped {wrap_n}")


if __name__ == "__main__":
    main()
