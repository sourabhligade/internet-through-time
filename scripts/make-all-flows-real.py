#!/usr/bin/env python3
"""Make leftover dests leftover-official and strip leftover plaques from product dests.

2001–2003 leftover hops were leftover real-save theater and never landed in
leftover-official.matrix.json. Official product dests (Photobucket, Store,
LinkedIn…) kept a second “Save leftover” plaque. This pass:

  * injects leftover-official panels on leftover dests that lack one
  * never injects leftover-official onto a product dest that already writes
    the official whenKey
  * strips leftover “Save leftover” plaques from product dests
  * rebuilds leftover-official.matrix.json from disk (every dest with a panel)

Incomplete leftover-official never writes. Complete writes {real, leftover, year}.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MARK = "ITT-LO-OFFICIAL"

PRODUCT_HOOKS = (
    "data-wiki-save",
    "data-pb-upload",
    "data-itunes-buy",
    "data-wp-publish",
    "data-li-invite",
    "data-li-connect",
    "data-li-profile-form",
    "data-ms-top8",
    "data-friendster-add-form",
    "data-adsense-signup",
    "data-bloglines-add",
    "data-blogger-post",
    "data-delicious-post",
    "data-su-stumble",
    "data-gpt22-send",
    "data-att-ask",
    "data-year-game",
    "data-official-verb",
)

# Official leftover hops that need leftover-official (year, href, suffix,
# trap, save, field, picks, need, min_pick).
OFFICIAL_LEFTOVER = [
    ("2001", "sites/archive/index.html", "wayback", "Live archive.org as star (trap)", "Open leftover URL", "http://www.yahoo.com/", [("url", "URL leftover"), ("live", "Live archive star (trap)")], "url", 0),
    ("2001", "sites/itunes/index.html", "itunes", "Open iTunes Music Store (trap)", "Name leftover playlist", "commute mix", [("lib", "Library leftover"), ("store", "Store (trap)")], "lib", 0),
    ("2001", "sites/apple/ipod.html", "ipod", "iPhone (trap)", "Pick leftover iPod", "", [("399", "$399 leftover"), ("iphone", "iPhone (trap)")], "399", 0),
    ("2001", "sites/napster/index.html", "napster", "Live download (trap)", "Search leftover", "leftover.mp3", [("q", "Search leftover"), ("dl", "Download (trap)")], "q", 0),
    ("2001", "sites/movabletype/index.html", "mt", "Medium (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("med", "Medium (trap)")], "post", 0),
    ("2001", "sites/google/index.html", "google", "Lucky as 2001 star (trap)", "Search leftover", "leftover query", [("q", "Search leftover"), ("lucky", "Lucky (trap)")], "q", 0),
    ("2001", "sites/yahoo/index.html", "yahoo", "Google as 2001 star (trap)", "Open leftover directory", "", [("news", "News leftover"), ("g", "Google (trap)")], "news", 0),
    ("2001", "sites/amazon/index.html", "amz", "1-Click as 2001-new (trap)", "Search leftover smile", "leftover book", [("book", "Smile leftover"), ("oneclick", "1-Click (trap)")], "book", 0),
    ("2002", "sites/isp/index.html", "broadband", "5G (trap)", "Note always-on leftover", "", [("on", "Always-on leftover"), ("5g", "5G (trap)")], "on", 0),
    ("2002", "sites/kazaa/index.html", "kazaa", "Live torrent (trap)", "Search leftover", "leftover.mp3", [("q", "Search leftover"), ("dl", "Download (trap)")], "q", 0),
    ("2002", "sites/wired/index.html", "wired", "Live Wired (trap)", "Note 2002 redesign leftover", "", [("redesign", "2002 leftover"), ("live", "Live Wired (trap)")], "redesign", 0),
    ("2002", "sites/phoenix/index.html", "phoenix", "Firefox 1.0 (trap)", "Note Phoenix leftover", "", [("phx", "Phoenix leftover"), ("fx", "Firefox 1.0 (trap)")], "phx", 0),
    ("2002", "sites/mozilla/index.html", "mozilla", "Firefox 1.0 as 2002 (trap)", "Note Mozilla 1.0 leftover", "", [("moz", "Mozilla leftover"), ("fx", "Firefox (trap)")], "moz", 0),
    ("2002", "sites/ipod/index.html", "ipod2", "iPhone (trap)", "Pick leftover gen 2", "", [("gen2", "Gen 2 leftover"), ("iphone", "iPhone (trap)")], "gen2", 0),
    ("2002", "sites/movabletype/trackback.html", "trackback", "Twitter (trap)", "Send leftover ping", "leftover ping", [("ping", "Ping leftover"), ("tw", "Twitter (trap)")], "ping", 0),
]

# Extra leftover dests (2× hops, not official 10, not games).
EXTRA_LEFTOVER = [
    ("2001", "sites/wikipedia/history.html", "wiki-hist", "This is the wiki chip (trap)", "Open leftover history", "leftover edit", [("hist", "History leftover"), ("chip", "Chip (trap)")], "hist", 0),
    ("2001", "sites/wikipedia/languages.html", "wiki-lang", "This is the wiki chip (trap)", "Open leftover language", "Deutsch leftover", [("lang", "Language leftover"), ("chip", "Chip (trap)")], "lang", 0),
    ("2001", "sites/archive/about.html", "wa-url", "Live archive.org as star (trap)", "Note leftover crawl", "24 Oct leftover", [("crawl", "Crawl leftover"), ("live", "Live star (trap)")], "crawl", 0),
    ("2001", "sites/itunes/about.html", "itunes-lx", "Music Store (trap)", "Note leftover library", "rip mix leftover", [("lib", "Library leftover"), ("store", "Store (trap)")], "lib", 0),
    ("2001", "sites/apple/ipod/faq.html", "ipod-lx", "iPhone (trap)", "Note leftover click wheel", "scroll leftover", [("wheel", "Wheel leftover"), ("iphone", "iPhone (trap)")], "wheel", 0),
    ("2001", "sites/napster/about.html", "nap-q", "Live download (trap)", "Search leftover", "leftover.mp3", [("q", "Search leftover"), ("dl", "Download (trap)")], "q", 0),
    ("2001", "sites/movabletype/about.html", "mt-lx", "Medium (trap)", "Note leftover install", "perl leftover", [("perl", "Perl leftover"), ("med", "Medium (trap)")], "perl", 0),
    ("2001", "sites/blogdex/index.html", "blogdex", "This is Google gold (trap)", "Open leftover hottest", "hottest url leftover", [("hot", "Hottest leftover"), ("g", "Google (trap)")], "hot", 0),
    ("2001", "sites/blogger/index.html", "blogger", "WordPress 2003 (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("wp", "WordPress (trap)")], "post", 0),
    ("2001", "sites/tpm/index.html", "tpm", "This is the wiki chip (trap)", "Open leftover post", "warblog leftover", [("post", "Post leftover"), ("chip", "Chip (trap)")], "post", 0),
    ("2001", "sites/cnn/index.html", "cnn", "Live CNN (trap)", "Open leftover headline", "", [("2001", "2001 leftover"), ("live", "Live CNN (trap)")], "2001", 0),
    ("2001", "sites/mozilla/index.html", "moz", "Firefox 1.0 (trap)", "Note leftover Mozilla", "mozilla leftover", [("moz", "Mozilla leftover"), ("fx", "Firefox (trap)")], "moz", 0),
    ("2001", "sites/encarta/index.html", "encarta", "This is the wiki chip (trap)", "Open leftover article", "encarta leftover", [("art", "Article leftover"), ("chip", "Chip (trap)")], "art", 0),
    ("2001", "sites/weblogs/index.html", "ping", "Twitter (trap)", "Send leftover ping", "leftover ping", [("ping", "Ping leftover"), ("tw", "Twitter (trap)")], "ping", 0),
    ("2002", "sites/stumbleupon/more.html", "su-lx", "This is the Stumble chip (trap)", "Note leftover toolbar", "toolbar leftover", [("tb", "Toolbar leftover"), ("chip", "Chip (trap)")], "tb", 0),
    ("2002", "sites/isp/about.html", "bb-lx", "5G (trap)", "Note leftover pipe", "cable leftover", [("cable", "Cable leftover"), ("5g", "5G (trap)")], "cable", 0),
    ("2002", "sites/kazaa/lite.html", "kazaa-lite", "Live torrent (trap)", "Search leftover", "leftover.mp3", [("q", "Search leftover"), ("dl", "Download (trap)")], "q", 0),
    ("2002", "sites/wired/theme.html", "wired-css", "Live Wired (trap)", "Note leftover CSS", "css leftover", [("css", "CSS leftover"), ("live", "Live (trap)")], "css", 0),
    ("2002", "sites/ipod/specs.html", "ipod2-lx", "iPhone (trap)", "Note leftover gen 2", "20GB leftover", [("gen2", "Gen 2 leftover"), ("iphone", "iPhone (trap)")], "gen2", 0),
    ("2002", "sites/friendster/testimonials.html", "fs-seed", "Facebook (trap)", "Save leftover testimonial", "leftover note", [("note", "Testimonial leftover"), ("fb", "Facebook (trap)")], "note", 0),
    ("2002", "sites/movabletype/about.html", "tb-ping", "Twitter (trap)", "Send leftover ping", "leftover ping", [("ping", "Ping leftover"), ("tw", "Twitter (trap)")], "ping", 0),
    ("2002", "sites/daypop/index.html", "daypop", "Google (trap)", "Open leftover link", "leftover link", [("link", "Link leftover"), ("g", "Google (trap)")], "link", 0),
    ("2002", "sites/mtv/index.html", "mtv", "YouTube (trap)", "Open leftover clip", "leftover clip", [("clip", "Clip leftover"), ("yt", "YouTube (trap)")], "clip", 0),
    ("2002", "sites/lastfm/index.html", "lastfm", "Spotify (trap)", "Scrobble leftover", "leftover track", [("scrob", "Scrobble leftover"), ("spot", "Spotify (trap)")], "scrob", 0),
    ("2002", "sites/googlenews/index.html", "gnews", "Twitter feed (trap)", "Open leftover headline", "", [("h", "Headline leftover"), ("tw", "Twitter (trap)")], "h", 0),
    ("2002", "sites/wikipedia/index.html", "wiki-lx", "2001 edit star (trap)", "Open leftover article", "leftover article", [("art", "Article leftover"), ("edit", "2001 edit star (trap)")], "art", 0),
    ("2002", "sites/amazon/index.html", "amz", "1-Click as 2002-new (trap)", "Search leftover smile", "leftover book", [("book", "Smile leftover"), ("oneclick", "1-Click (trap)")], "book", 0),
    ("2002", "sites/yahoo/index.html", "yahoo", "Google as 2002 star (trap)", "Open leftover directory", "", [("news", "News leftover"), ("g", "Google (trap)")], "news", 0),
    ("2003", "sites/photobucket/album.html", "pb-lx", "This is the Photobucket chip (trap)", "Name leftover album", "vacation leftover", [("alb", "Album leftover"), ("chip", "Chip (trap)")], "alb", 0),
    ("2003", "sites/myspace/about.html", "ms-friends", "Facebook / TikTok (trap)", "Note leftover seed", "august leftover", [("seed", "Seed leftover"), ("fb", "Facebook (trap)")], "seed", 0),
    ("2003", "sites/itunes/browse.html", "itunes-99", "Unlimited play leftover (trap)", "Search leftover track", "leftover track", [("track", "Track leftover"), ("stream", "Stream (trap)")], "track", 0),
    ("2003", "sites/wordpress/about.html", "wp-lx", "Medium (trap)", "Note leftover 0.7", "0.7 leftover", [("wp", "0.7 leftover"), ("med", "Medium (trap)")], "wp", 0),
    ("2003", "sites/adsense/code.html", "adsense-lx", "This is the Photobucket chip (trap)", "Name leftover site", "leftover.site", [("site", "Site leftover"), ("chip", "Chip (trap)")], "site", 0),
    ("2003", "sites/bloglines/feeds.html", "bloglines", "Twitter (trap)", "Add leftover feed", "http://leftover.example", [("feed", "Feed leftover"), ("tw", "Twitter (trap)")], "feed", 0),
    ("2003", "sites/blogger/about.html", "blogger-g", "WordPress as this dest (trap)", "Note leftover sale", "February 2003 leftover", [("sale", "Sale leftover"), ("wp", "WordPress dest (trap)")], "sale", 0),
    ("2003", "sites/skype/index.html", "skype", "This is the Photobucket chip (trap)", "Call leftover", "leftover name", [("call", "Call leftover"), ("chip", "Chip (trap)")], "call", 0),
    ("2003", "sites/4chan/index.html", "4chan-lx", "This is the Photobucket chip (trap)", "Note leftover board", "/b/ leftover", [("board", "Board leftover"), ("chip", "Chip (trap)")], "board", 0),
    ("2003", "sites/delicious/index.html", "delicious", "Twitter likes (trap)", "Save leftover tag", "leftover", [("tag", "Tag leftover"), ("likes", "Twitter likes (trap)")], "tag", 0),
    ("2003", "sites/phoenix/index.html", "firebird", "Firefox 1.0 (trap)", "Note leftover Firebird", "firebird leftover", [("fbird", "Firebird leftover"), ("fx", "Firefox (trap)")], "fbird", 0),
    ("2003", "sites/flash/index.html", "flash-fwa", "This is the Photobucket chip (trap)", "Note leftover SWF", "swf leftover", [("swf", "SWF leftover"), ("chip", "Chip (trap)")], "swf", 0),
    ("2003", "sites/hi5/index.html", "hi5", "Facebook (trap)", "Save leftover profile", "leftover name", [("prof", "Profile leftover"), ("fb", "Facebook (trap)")], "prof", 0),
    ("2003", "sites/amazon/index.html", "amz", "1-Click as 2003-new (trap)", "Search leftover smile", "leftover book", [("book", "Smile leftover"), ("oneclick", "1-Click (trap)")], "book", 0),
    ("2003", "sites/yahoo/index.html", "yahoo", "Google as 2003 star (trap)", "Open leftover directory", "", [("news", "News leftover"), ("g", "Google (trap)")], "news", 0),
    ("2003", "sites/kazaa/index.html", "kazaa-q", "Live torrent (trap)", "Search leftover", "leftover.mp3", [("q", "Search leftover"), ("dl", "Download (trap)")], "q", 0),
    ("2003", "sites/firebird/index.html", "firebird", "Firefox 1.0 (trap)", "Note leftover Firebird", "firebird leftover", [("fbird", "Firebird leftover"), ("fx", "Firefox (trap)")], "fbird", 0),
]


def panel(year: str, key: str, trap: str, save: str, field: str, picks: list, need: str, minp: int) -> str:
    bits = [
        f"<!-- {MARK}:start -->",
        f'<section data-lo-panel="1" data-itt-year="{year}" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">',
        f"<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt{year[2:]}-{key}</code></p>",
        '<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>',
        '<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>',
        "<p>",
    ]
    for pid, lab in picks:
        bits.append(f' <button type="button" data-lo-pick="{pid}">{lab}</button>')
    bits.append("</p>")
    if field:
        bits.append(f'<p><input data-lo-field placeholder="{field}" maxlength="80"></p>')
    need_attr = f' data-lo-need-pick="{need}"' if need else ""
    min_attr = f' data-lo-min-pick="{minp}"' if minp else ""
    bits.append("<p>")
    bits.append(f' <button type="button" data-lo-trap>{trap}</button>')
    bits.append(f' <button type="button" data-lo-save data-lo-key="{key}"{need_attr}{min_attr}>{save}</button>')
    bits.append("</p>")
    bits.append('<p data-lo-status></p>')
    bits.append("</section>")
    bits.append(f"<!-- {MARK}:end -->")
    return "\n".join(bits) + "\n"


def inject(path: Path, html_block: str) -> bool:
    raw = path.read_text(encoding="utf-8", errors="replace")
    if MARK + ":start" in raw:
        raw = re.sub(
            r"<!-- " + MARK + r":start -->.*?<!-- " + MARK + r":end -->\n?",
            "",
            raw,
            flags=re.S,
        )
    if "</body>" in raw:
        raw = raw.replace("</body>", html_block + "</body>", 1)
    else:
        raw += "\n" + html_block
    path.write_text(raw, encoding="utf-8")
    return True


PLAQUE_RE = re.compile(
    r'<div class="itt-verb"[^>]*>.*?</div>\s*',
    re.S,
)


def is_product(html: str) -> bool:
    return any(h in html for h in PRODUCT_HOOKS)


def strip_plaque(path: Path) -> bool:
    raw = path.read_text(encoding="utf-8", errors="replace")
    if "data-lo-panel" not in raw and not is_product(raw):
        return False
    if "Save leftover" not in raw and "data-itt-real-save" not in raw:
        return False
    # Strip leftover theater sitting beside leftover-official or a product hook.
    new, n = PLAQUE_RE.subn("", raw, count=4)
    if n and new != raw:
        path.write_text(new, encoding="utf-8")
        return True
    return False


def inject_row(row) -> str:
    year, href, key, trap, save, field, picks, need, minp = row
    path = ROOT / "years" / year / href
    if not path.exists():
        return "missing"
    html = path.read_text(encoding="utf-8", errors="replace")
    if is_product(html) and f'data-lo-key="{key}"' not in html:
        # Product dest — leftover-official would be a second mock.
        return "product-skip"
    if "data-year-game" in html:
        return "game-skip"
    inject(path, panel(year, key, trap, save, field, picks, need, minp))
    return "injected"


def scan_lo_dests() -> list[dict]:
    dests = []
    seen = set()
    for year_dir in sorted((ROOT / "years").iterdir()):
        if not year_dir.is_dir() or not re.fullmatch(r"\d{4}", year_dir.name):
            continue
        year = year_dir.name
        if year == "2025":
            continue
        for html_path in year_dir.rglob("*.html"):
            try:
                text = html_path.read_text(encoding="utf-8", errors="replace")
            except OSError:
                continue
            rel0 = html_path.relative_to(ROOT / "years" / year).as_posix()
            if "data-lo-key=" not in text:
                continue
            if "data-lo-save" not in text:
                continue
            rel = html_path.relative_to(ROOT / "years" / year).as_posix()
            for sm in re.finditer(
                r'<button\b[^>]*data-lo-save\b[^>]*data-lo-key="([^"]+)"[^>]*>|'
                r'<button\b[^>]*data-lo-key="([^"]+)"[^>]*data-lo-save\b[^>]*>',
                text,
            ):
                suffix = sm.group(1) or sm.group(2)
                if not suffix:
                    continue
                key = f"itt{year[2:]}-{suffix}"
                if (year, rel, key) in seen:
                    continue
                seen.add((year, rel, key))
                btn = sm.group(0)
                need = ""
                nm = re.search(r'data-lo-need-pick="([^"]*)"', btn)
                if not nm:
                    # panel-scoped pick lives on the same leftover block
                    start = max(0, sm.start() - 800)
                    nm = re.search(
                        r'data-lo-need-pick="([^"]*)"', text[start : sm.end()]
                    )
                if nm:
                    need = nm.group(1)
                minp = 0
                mm = re.search(r'data-lo-min-pick="(\d+)"', btn)
                if mm:
                    minp = int(mm.group(1))
                field = "data-lo-field" in text[max(0, sm.start() - 800) : sm.end()]
                ph = ""
                if field:
                    pm = re.search(
                        r'data-lo-field[^>]*placeholder="([^"]*)"',
                        text[max(0, sm.start() - 800) : sm.end()],
                    )
                    if pm:
                        ph = pm.group(1)
                dests.append(
                    {
                        "year": year,
                        "href": rel,
                        "key": key,
                        "suffix": suffix,
                        "needPick": need,
                        "minPick": minp,
                        "field": field,
                        "placeholder": ph,
                    }
                )
    dests.sort(key=lambda d: (d["year"], d["href"], d["suffix"]))
    return dests


def write_matrix(dests: list[dict]) -> None:
    out = ROOT / "e2e" / "leftover-official.matrix.json"
    out.write_text(json.dumps({"dests": dests}, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    counts = {"injected": 0, "missing": 0, "product-skip": 0, "game-skip": 0}
    for row in OFFICIAL_LEFTOVER + EXTRA_LEFTOVER:
        status = inject_row(row)
        counts[status] = counts.get(status, 0) + 1

    stripped = 0
    for year in ("2001", "2002", "2003"):
        for html_path in (ROOT / "years" / year).rglob("*.html"):
            if strip_plaque(html_path):
                stripped += 1

    dests = scan_lo_dests()
    write_matrix(dests)
    years = sorted({d["year"] for d in dests})
    print("inject", counts)
    print("stripped leftover plaques", stripped)
    print("leftover-official dests", len(dests), "years", years)


if __name__ == "__main__":
    main()
