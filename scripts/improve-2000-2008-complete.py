#!/usr/bin/env python3
"""Quiet 2000–2005/2008 homes, leftover labels, more.html theater, continuity badges.

No new dest folders. Stars and guided 6 stay locked.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEARS = ("2000", "2001", "2002", "2003", "2004", "2005", "2008")
GHOST = {
    "Help", "Faq", "Press", "Legal", "Tips", "Status", "Support",
    "Privacy", "Terms", "Notes", "Blog", "News",
}
CONTINUITY = ("yahoo", "amazon", "ebay", "google", "hotmail", "geocities", "altavista", "cnn")
CHIP = (
    '<p class="itt-continuity-chip" data-itt-continuity-archive="1" data-itt-forest="1" '
    'style="font-size:11px;background:#ffc;border:1px solid #c90;padding:6px 8px;margin:8px 0;'
    'font-family:Arial,sans-serif"><b>Continuity archive</b> — this room is held over from '
    "an earlier year. Year-true products sit on the Starting Point chips and the star.</p>\n"
)
LABEL_SWAPS = (
    ("Type leftover", "Type to confirm"),
    ("Hop leftover", "Open both sections"),
    ("Ack leftover", "Tick both notes"),
    (">Do this<", ">Confirm<"),
    ("2× leftover dests (next pass)", "Also try · next rooms"),
    ("2× leftover dests (remaining REAL)", "Also try · remaining rooms"),
    ("2× leftover dests", "Also try · second rooms"),
    ("leftover 2× pack", "· also this year"),
    ("leftover 2×", "· also this year"),
)
MORE_COPY = {
    "limewire": ("LimeWire", "Leftover P2P search theater · no real files.", "Query", "Search leftover library"),
    "expedia": ("Expedia", "Leftover travel search · no real booking.", "City", "Search leftover trip"),
    "travelocity": ("Travelocity", "Leftover trip theater · no real booking.", "City", "Search leftover trip"),
    "pets": ("Pets.com", "Sock-puppet leftover · crash memory.", "Aisle", "Open leftover aisle"),
    "gnutella": ("Gnutella", "Leftover P2P · no real files.", "Query", "Search leftover net"),
    "habbo": ("Habbo", "Leftover hotel room · no real account.", "Room", "Open leftover room"),
    "runescape": ("RuneScape", "Leftover login theater · no real account.", "Name", "Open leftover character"),
    "deviantart": ("deviantART", "Leftover gallery · no real upload.", "Title", "Open leftover deviation"),
    "xanga": ("Xanga", "Leftover blog entry.", "Entry", "Open leftover post"),
    "somethingawful": ("Something Awful", "Leftover FYAD theater.", "Thread", "Open leftover thread"),
    "livejournal": ("LiveJournal", "Leftover entry.", "Subject", "Open leftover entry"),
    "delicious": ("del.icio.us", "Leftover bookmark.", "Tag", "Save leftover tag"),
    "skype": ("Skype", "Leftover call theater · no real network.", "Name", "Call leftover contact"),
    "secondlife": ("Second Life", "Leftover grid · no real login.", "Place", "Open leftover sim"),
    "imageshack": ("ImageShack", "Leftover hotlink.", "File", "Open leftover image"),
    "orkutseed": ("Orkut", "Leftover invite · not the year star.", "Name", "Open leftover invite"),
    "basecamp": ("Basecamp", "Leftover project · not the year star.", "Project", "Open leftover project"),
    "tinypic": ("TinyPic", "Leftover image host.", "File", "Open leftover image"),
    "worldofwarcraft": ("World of Warcraft", "Leftover armory theater.", "Character", "Open leftover toon"),
    "dailymotion": ("DailyMotion", "Leftover video · not YouTube.", "Title", "Open leftover clip"),
    "vimeo": ("Vimeo", "Leftover clip · not YouTube.", "Title", "Open leftover clip"),
    "gaia": ("Gaia Online", "Leftover forum.", "Thread", "Open leftover thread"),
    "airbnb": ("Airbnb residual", "Leftover listing · not the star.", "Listing", "Open leftover stay"),
    "evernote": ("Evernote residual", "Leftover note.", "Note", "Open leftover note"),
    "groupon": ("Groupon residual", "Leftover deal.", "Deal", "Open leftover deal"),
}


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
        return cleaned

    return re.sub(r'<p class="itt-5x-atlas"[^>]*>.*?</p>', repl, html, flags=re.S)


def relabel(html: str) -> str:
    out = html
    for a, b in LABEL_SWAPS:
        out = out.replace(a, b)
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
        r'<h2 style="margin:0 0 8px;font-size:16px">.*?</h2>',
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>',
        html,
        count=1,
    )
    html = html.replace(">Do this<", f">{go_lab}<")
    html = html.replace(">Confirm<", f">{go_lab}<")
    html = re.sub(
        r"(<label>)([^<]*)(<br>\s*<input type=\"text\" data-4x-field)",
        rf"\1{field_lab}\3",
        html,
        count=1,
    )
    return html


def move_rails(html: str) -> str:
    m = re.search(
        r'(<p class="itt-playable-link"[\s\S]*?</p>\s*(?:<p class="itt-year-true-pack"[\s\S]*?</p>\s*)?)',
        html,
    )
    if not m or "<!-- ITT-DENSIFY:start -->" not in html[m.end() :]:
        return html
    block = m.group(1)
    html = html[: m.start()] + html[m.end() :]
    return html.replace("<!-- ITT-DENSIFY:start -->", block + "<!-- ITT-DENSIFY:start -->", 1)


def add_quiet_css(html: str) -> str:
    if "year-start-quiet.css" in html:
        return html
    return html.replace(
        "</title>\n",
        '</title>\n<link rel="stylesheet" href="../../../css/year-start-quiet.css">\n',
        1,
    )


def add_continuity(path: Path, html: str) -> str:
    if "itt-continuity-chip" in html or "data-itt-continuity-archive" in html:
        return html
    slug = path.parent.name
    if path.name != "index.html" or slug not in CONTINUITY:
        return html
    if "<body" not in html:
        return html
    return re.sub(r"(<body[^>]*>)", r"\1\n" + CHIP, html, count=1)


def main() -> None:
    n = 0
    for year in YEARS:
        ydir = ROOT / "years" / year
        home = ydir / "pages" / "home.html"
        if home.exists():
            raw = home.read_text(encoding="utf-8")
            nxt = add_quiet_css(raw)
            nxt = slim_atlas(nxt)
            nxt = relabel(nxt)
            nxt = move_rails(nxt)
            if nxt != raw:
                home.write_text(nxt, encoding="utf-8")
                n += 1
                print("home", year)
        for html_path in sorted(ydir.rglob("*.html")):
            raw = html_path.read_text(encoding="utf-8")
            nxt = relabel(raw)
            if html_path.name == "more.html":
                nxt = deepen_more(html_path, nxt)
            if year in ("2002", "2003", "2004", "2005", "2008"):
                nxt = add_continuity(html_path, nxt)
            if nxt != raw:
                html_path.write_text(nxt, encoding="utf-8")
                n += 1
    print("files", n)


if __name__ == "__main__":
    main()
