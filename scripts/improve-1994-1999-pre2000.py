#!/usr/bin/env python3
"""1994–1999 pre-2000 improve: slim ghost atlas, period leftover labels, deepen more.html.

Does not add dest folders, move stars, or grow guided 6.
Keeps data-4x-* / data-lo-* / e2e selectors intact.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ("1994", "1995", "1996", "1997", "1998", "1999")
GHOST = {
    "Help",
    "Faq",
    "Press",
    "Legal",
    "Tips",
    "Status",
    "Support",
    "Privacy",
    "Terms",
    "Notes",
    "Blog",
    "News",
}

MORE_COPY = {
    "pizzahut": (
        "Pizza Hut online order",
        "1994 leftover room · order theater only · no real pizza.",
        "Confirm this order",
        "Place leftover order",
    ),
    "netmarket": (
        "NetMarket first-retail",
        "1994 leftover room · early commerce proof · no real charge.",
        "Confirm this sale",
        "Confirm leftover sale",
    ),
    "imdb": (
        "Internet Movie Database",
        "1994 leftover room · open a title card. No live listings.",
        "Title to look up",
        "Open leftover title",
    ),
    "galaxy": (
        "EINet Galaxy",
        "1994 leftover room · a second directory category.",
        "Category to open",
        "Open leftover category",
    ),
    "gnn": (
        "Global Network Navigator",
        "1994 leftover room · O’Reilly’s early web magazine.",
        "Article to open",
        "Open leftover article",
    ),
    "jumpstation": (
        "JumpStation",
        "1994 leftover room · early robot search results.",
        "Query for results",
        "Run leftover search",
    ),
    "prodigy": (
        "Prodigy",
        "Leftover walled-garden door · not a full Prodigy client.",
        "Keyword to open",
        "Open leftover keyword",
    ),
    "pathfinder": (
        "Pathfinder",
        "Time Warner magazine leftover · one more story.",
        "Magazine section",
        "Open leftover story",
    ),
    "infoseek": (
        "Infoseek",
        "Leftover search results · catalog theater only.",
        "Search this leftover",
        "Run leftover search",
    ),
    "compuserve": (
        "CompuServe",
        "Leftover forum door · no real CIS network.",
        "Forum to open",
        "Open leftover forum",
    ),
    "espn": ("ESPNet SportsZone", "1995 leftover scoreboard.", "Score line", "Open leftover scoreboard"),
    "salon": ("Salon", "1995 leftover essay.", "Essay to open", "Open leftover essay"),
    "classmates": ("Classmates.com", "1995 leftover reunion result.", "Name to find", "Open leftover result"),
    "match": ("Match.com", "1995 leftover profile.", "Profile note", "Open leftover profile"),
    "tripod": ("Tripod", "1995 leftover homepage.", "Page title", "Open leftover page"),
    "aol": ("AOL.com", "Leftover start-page keyword · not the walled garden.", "Keyword", "Open leftover keyword"),
    "wsj": ("Wall Street Journal", "1995 leftover story.", "Headline", "Open leftover story"),
    "hotbot": ("HotBot", "Leftover neon search results.", "Query", "Run leftover search"),
    "mtv": ("MTV Online", "1996 leftover video page.", "Video title", "Open leftover video"),
    "askjeeves": ("Ask Jeeves", "Leftover answer theater.", "Question", "Ask leftover Jeeves"),
    "theglobe": ("theGlobe.com", "1996 leftover community page.", "Page to open", "Open leftover page"),
    "totalny": ("TotalNY", "1996 leftover city listing.", "Listing", "Open leftover listing"),
    "msn": ("MSN", "Leftover start page.", "Channel", "Open leftover channel"),
    "plugin": ("FutureSplash / Flash", "1996 leftover plug-in skip · no real SWF.", "Skip note", "Skip leftover plugin"),
    "angelfire": ("Angelfire", "1996 leftover homestead page.", "Page title", "Open leftover page"),
    "nytimes": ("The New York Times", "1997 leftover story.", "Headline", "Open leftover story"),
    "mp3com": ("MP3.com", "Leftover track card · no real audio.", "Track title", "Open leftover track"),
    "zdnet": ("ZDNet", "1997 leftover download file.", "File name", "Open leftover file"),
    "bbc": ("BBC News", "Leftover story.", "Headline", "Open leftover story"),
    "newscom": ("news.com", "1997 leftover CNET story.", "Headline", "Open leftover story"),
    "scripting": ("Scripting News", "1997 leftover Dave Winer note.", "Note", "Open leftover note"),
    "winamp": ("Winamp", "1997 leftover skin pick · no real audio.", "Skin name", "Pick leftover skin"),
    "go": ("GO Network", "1998 leftover channel.", "Channel", "Open leftover channel"),
    "snap": ("Snap", "1998 leftover results.", "Query", "Run leftover search"),
    "about": ("About.com", "1998 leftover guide.", "Topic", "Open leftover guide"),
    "opendiary": ("Open Diary", "1998 leftover entry.", "Entry title", "Open leftover diary"),
    "icqweb": ("ICQ web", "1998 leftover pager.", "UIN / nick", "Open leftover pager"),
    "valve": ("Valve / Half-Life", "1998 leftover note.", "Note", "Open leftover note"),
    "winfiles": ("WinFiles", "1998 leftover download.", "File name", "Open leftover file"),
    "neopets": ("Neopets", "1999 leftover pet · no real account.", "Pet name", "Name leftover pet"),
    "egroups": ("eGroups", "1999 leftover mailing list.", "List name", "Open leftover list"),
    "webvan": ("Webvan", "1999 leftover grocery order theater.", "Aisle", "Open leftover aisle"),
    "etrade": ("E*TRADE", "1999 leftover quote · no real trade.", "Ticker", "Open leftover quote"),
    "theonion": ("The Onion", "1999 leftover headline.", "Headline", "Open leftover headline"),
    "yahoomessenger": ("Yahoo Messenger", "1999 leftover IM leftover.", "Screen name", "Open leftover IM"),
}

LABEL_SWAPS = (
    ("Type leftover", "Type to confirm"),
    ("Hop leftover", "Open both sections"),
    ("Ack leftover", "Tick both notes"),
    (">Do this<", ">Confirm<"),
    ("Open leftover</button>", "Open this room</button>"),
    ("Search leftover album", "Find this CD"),
    ("Get the source leftover", "Get the source"),
    ("Open leftover category", "Open a category"),
    ("This leftover is REAL literacy — incomplete never writes.", "Incomplete never writes. Not the year star."),
    ("Official dest leftover", "Also this dest"),
    ("2× leftover dests (next pass)", "Also try · next rooms"),
    ("2× leftover dests (remaining REAL)", "Also try · remaining rooms"),
    ("2× leftover dests", "Also try · second rooms"),
    ("leftover 2× pack", "· also this year"),
    ("leftover 2×", "· also this year"),
    ("leftover REAL", "room"),
    (" leftover literacy", ""),
)


def slim_atlas(html: str) -> str:
    def repl(m: re.Match[str]) -> str:
        block = m.group(0)

        def drop_or_keep(am: re.Match[str]) -> str:
            label = re.sub(r"\s+", " ", am.group(1)).strip()
            href = am.group(0)
            hm = re.search(r'href="([^"]+)"', href)
            path = hm.group(1) if hm else ""
            if label in GHOST and path.rstrip("/").endswith("index.html"):
                return ""
            return href

        cleaned = re.sub(r'<a\s+href="[^"]+">([^<]*)</a>', drop_or_keep, block)
        cleaned = re.sub(r"(?: · ){2,}", " · ", cleaned)
        cleaned = re.sub(r" · </b>", "</b>", cleaned)
        cleaned = re.sub(r" · \s*$", "", cleaned)
        return cleaned

    return re.sub(
        r'<p class="itt-5x-atlas"[^>]*>.*?</p>',
        repl,
        html,
        flags=re.S,
    )


def relabel(html: str) -> str:
    out = html
    for a, b in LABEL_SWAPS:
        out = out.replace(a, b)
    # restore official leftover field placeholders the e2e matrix fills
    out = out.replace('placeholder="Find this CD"', 'placeholder="leftover album"')
    return out


def deepen_more(path: Path, html: str) -> str:
    slug = path.parent.name
    if slug not in MORE_COPY:
        return html
    title, blurb, field_lab, go_lab = MORE_COPY[slug]
    html = re.sub(
        r"<h1>.*?</h1>\s*<p>Second leftover dest · \d{4} · not the star · failed-final costume OK.</p>",
        f"<h1>{title}</h1>\n<p>{blurb}</p>",
        html,
        count=1,
        flags=re.S,
    )
    html = re.sub(
        r"<h2 style=\"margin:0 0 8px;font-size:16px\">.*?</h2>",
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>',
        html,
        count=1,
    )
    html = html.replace("Confirm pizza leftover", title)
    html = html.replace(">Do this<", f">{go_lab}<")
    html = html.replace(">Confirm<", f">{go_lab}<")
    html = re.sub(
        r"<label>Confirm pizza<br>",
        f"<label>{field_lab}<br>",
        html,
        count=1,
    )
    html = re.sub(
        r"(<label>)([^<]*)(<br>\s*<input type=\"text\" data-4x-field)",
        rf"\1{field_lab}\3",
        html,
        count=1,
    )
    return html


def main() -> None:
    changed = 0
    for year in YEARS:
        ydir = ROOT / "years" / year
        home = ydir / "pages" / "home.html"
        if home.exists():
            raw = home.read_text(encoding="utf-8")
            nxt = relabel(slim_atlas(raw))
            if nxt != raw:
                home.write_text(nxt, encoding="utf-8")
                changed += 1
                print("home", year)
        for html_path in sorted(ydir.rglob("*.html")):
            raw = html_path.read_text(encoding="utf-8")
            nxt = relabel(raw)
            if html_path.name == "more.html":
                nxt = deepen_more(html_path, nxt)
            if nxt != raw:
                html_path.write_text(nxt, encoding="utf-8")
                changed += 1
                print(html_path.relative_to(ROOT))
    print("files", changed)


if __name__ == "__main__":
    main()
