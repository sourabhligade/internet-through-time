#!/usr/bin/env python3
"""Paint leftover-3× ×3 for 1999–2005. Famous-that-year dests only. No new folders."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PLAN = {
    "1999": {
        "first": [
            ("livejournal", "LiveJournal"),
            ("neopets", "Neopets"),
            ("egroups", "eGroups"),
            ("yahoo", "Yahoo leftover"),
            ("geocities", "GeoCities leftover"),
            ("slashdot", "Slashdot leftover"),
            ("msn", "MSN leftover"),
            ("hampsterdance", "Hampster Dance leftover"),
            ("webvan", "Webvan leftover"),
        ],
        "second": [
            ("theonion", "The Onion leftover"),
            ("drkoop", "drkoop leftover"),
            ("sixdegrees", "sixdegrees leftover"),
            ("aol", "AOL leftover"),
            ("excite", "Excite leftover"),
            ("icq", "ICQ leftover"),
            ("altavista", "AltaVista leftover"),
            ("netscape", "Netscape leftover"),
            ("yahoomessenger", "Yahoo Messenger leftover"),
        ],
        "third": [
            ("blogger", "Blogger leftover"),
            ("etrade", "E*TRADE leftover"),
            ("paypal", "PayPal leftover"),
            ("amazon", "Amazon leftover"),
            ("ebay", "eBay leftover"),
            ("google", "Google leftover"),
            ("napster", "Napster leftover"),
            ("y2k", "Y2K leftover"),
            ("askjeeves", "Ask Jeeves leftover"),
        ],
    },
    "2000": {
        "first": [
            ("half", "Half.com"),
            ("limewire", "LimeWire leftover"),
            ("travelocity", "Travelocity leftover"),
            ("yahoo", "Yahoo leftover"),
            ("geocities", "GeoCities leftover"),
            ("slashdot", "Slashdot leftover"),
            ("msn", "MSN leftover"),
            ("excite", "Excite leftover"),
            ("icq", "ICQ leftover"),
        ],
        "second": [
            ("ivillage", "iVillage leftover"),
            ("metafilter", "MetaFilter leftover"),
            ("napsterweb", "Napster web leftover"),
            ("aol", "AOL leftover"),
            ("microsoft", "Microsoft leftover"),
            ("blogger", "Blogger leftover"),
            ("altavista", "AltaVista leftover"),
            ("homestar", "Homestar leftover"),
            ("kottke", "kottke leftover"),
        ],
        "third": [
            ("expedia", "Expedia leftover"),
            ("paypal", "PayPal leftover"),
            ("ebay", "eBay leftover"),
            ("amazon", "Amazon leftover"),
            ("napster", "Napster leftover"),
            ("google", "Google leftover"),
            ("pets", "Pets.com leftover"),
            ("cnn", "CNN leftover"),
            ("gnutella", "Gnutella leftover"),
        ],
    },
    "2001": {
        "first": [
            ("google", "Google leftover"),
            ("yahoo", "Yahoo leftover"),
            ("cnn", "CNN leftover"),
            ("slashdot", "Slashdot leftover"),
            ("blogger", "Blogger leftover"),
            ("microsoft", "Microsoft leftover"),
        ],
        "second": [
            ("moveon", "MoveOn leftover"),
            ("grok", "Grokster leftover"),
            ("appleimac", "iMac leftover"),
            ("mozilla", "Mozilla leftover"),
            ("encarta", "Encarta leftover"),
            ("dmoz", "dmoz leftover"),
        ],
        "third": [
            ("ebay", "eBay leftover"),
            ("paypal", "PayPal leftover"),
            ("excite", "Excite leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("itunes", "iTunes leftover"),
            ("napster", "Napster leftover"),
        ],
    },
    "2002": {
        "first": [
            ("daypop", "Daypop leftover"),
            ("googlenews", "Google News leftover"),
            ("technorati", "Technorati leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("google", "Google leftover"),
            ("lastfm", "Last.fm leftover"),
        ],
        "second": [
            ("fark", "Fark leftover"),
            ("homestar", "Homestar leftover"),
            ("blogspot", "Blogspot leftover"),
            ("netflix", "Netflix leftover"),
            ("mtv", "MTV leftover"),
            ("ebay", "eBay leftover"),
        ],
        "third": [
            ("amazon", "Amazon leftover"),
            ("yahoo", "Yahoo leftover"),
            ("blogger", "Blogger leftover"),
            ("friendster", "Friendster leftover"),
            ("kazaa", "KaZaA leftover"),
            ("wired", "Wired leftover"),
        ],
    },
    "2003": {
        "first": [
            ("skype", "Skype leftover"),
            ("delicious", "del.icio.us leftover"),
            ("hi5", "hi5 leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("google", "Google leftover"),
            ("cnn", "CNN leftover"),
        ],
        "second": [
            ("flash", "Flash leftover"),
            ("phoenix", "Firebird leftover"),
            ("4chan", "4chan leftover"),
            ("kazaa", "KaZaA leftover"),
            ("firebird", "Firebird leftover"),
        ],
        "third": [
            ("amazon", "Amazon leftover"),
            ("yahoo", "Yahoo leftover"),
            ("blogger", "Blogger leftover"),
            ("itunes", "iTunes leftover"),
            ("wordpress", "WordPress leftover"),
            ("myspace", "MySpace leftover"),
        ],
    },
    "2004": {
        "first": [
            ("myspace", "MySpace leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("yahoo", "Yahoo leftover"),
            ("skype", "Skype leftover"),
            ("livejournal", "LiveJournal leftover"),
            ("friendster", "Friendster leftover"),
            ("cnn", "CNN leftover"),
            ("bbc", "BBC leftover"),
            ("imdb", "IMDb leftover"),
        ],
        "second": [
            ("amazon", "Amazon leftover"),
            ("ebay", "eBay leftover"),
            ("orkut", "Orkut leftover"),
            ("craigslist", "craigslist leftover"),
            ("wow", "WoW leftover"),
            ("linkedin", "LinkedIn leftover"),
            ("wordpress", "WordPress leftover"),
            ("itunes", "iTunes leftover"),
            ("bloglines", "Bloglines leftover"),
        ],
        "third": [
            ("digg", "Digg leftover"),
            ("gmail", "Gmail leftover"),
            ("delicious", "del.icio.us leftover"),
            ("facebook", "thefacebook leftover"),
            ("firefox", "Firefox leftover"),
            ("flickr", "Flickr leftover"),
            ("web20conference", "Web 2.0 Conf leftover"),
            ("google", "Google leftover"),
            ("msn", "MSN leftover"),
        ],
    },
    "2005": {
        "first": [
            ("milliondollar", "Million Dollar Homepage"),
            ("clubpenguin", "Club Penguin leftover"),
            ("kayak", "Kayak leftover"),
            ("myspace", "MySpace leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("yahoo", "Yahoo leftover"),
            ("dailymotion", "DailyMotion leftover"),
            ("googlevideo", "Google Video leftover"),
            ("earth", "Google Earth leftover"),
        ],
        "second": [
            ("firefox", "Firefox leftover"),
            ("gmail", "Gmail leftover"),
            ("vimeo", "Vimeo leftover"),
            ("google", "Google leftover"),
            ("amazon", "Amazon leftover"),
            ("msn", "MSN leftover"),
            ("aol", "AOL leftover"),
            ("skype", "Skype leftover"),
            ("delicious", "del.icio.us leftover"),
        ],
        "third": [
            ("maps", "Maps leftover"),
            ("reddit", "Reddit leftover"),
            ("digg", "Digg leftover"),
            ("youtube", "YouTube leftover"),
            ("flickr", "Flickr leftover"),
            ("itunes", "iTunes leftover"),
            ("pandora", "Pandora leftover"),
            ("housingmaps", "HousingMaps leftover"),
            ("techcrunch", "TechCrunch leftover"),
        ],
    },
}

STAR = {
    "1999": "AIM sign-on",
    "2000": "MapQuest",
    "2001": "Wikipedia edit",
    "2002": "StumbleUpon",
    "2003": "Photobucket",
    "2004": "thefacebook networks",
    "2005": "YouTube upload",
}

WHY = {
    "1999": "1999 leftover 3×. Famous that year. Not the AIM chip.",
    "2000": "2000 leftover 3×. Famous that year. Not the MapQuest chip.",
    "2001": "2001 leftover 3×. Famous that year. Not the Wikipedia chip.",
    "2002": "2002 leftover 3×. Famous that year. Not the Stumble chip.",
    "2003": "2003 leftover 3×. Famous that year. Not the Photobucket chip.",
    "2004": "2004 leftover 3×. Famous that year. Not thefacebook chip.",
    "2005": "2005 leftover 3×. Famous that year. Not the Upload chip.",
}


def row(year: str, slug: str, name: str) -> dict:
    return {
        "id": slug,
        "name": name.replace(" leftover", ""),
        "title": f"{name} — {year}",
        "why": WHY[year],
        "verb": "Pick leftover then go.",
        "ph": "leftover",
        "btn": "Open leftover",
        "bg": "#111",
        "fg": "#fff",
    }


def extract_js_string(src: str, year: str) -> tuple[str, int, int] | None:
    key = f'"{year}":'
    i = src.find(key)
    if i < 0:
        return None
    q = src.find('"', i + len(key))
    if q < 0:
        return None
    q += 1
    out = []
    j = q
    while j < len(src):
        c = src[j]
        if c == "\\":
            nxt = src[j + 1] if j + 1 < len(src) else ""
            mapping = {"n": "\n", "t": "\t", '"': '"', "'": "'", "\\": "\\"}
            out.append(mapping.get(nxt, nxt))
            j += 2
            continue
        if c == '"':
            return "".join(out), q, j
        out.append(c)
        j += 1
    return None


def escape_js_string(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def strip_html(year: str, kind: str, items: list[tuple[str, str]]) -> str:
    cls = {"first": "itt-pop3x", "second": "itt-pop-more", "third": "itt-pop-3x3"}[kind]
    attr = {"first": "data-itt-pop3x", "second": "data-itt-pop-more", "third": "data-itt-pop-3x3"}[kind]
    label = {
        "first": "Also this year · 3×",
        "second": "3 more leftovers",
        "third": "3 more leftovers",
    }[kind]
    links = " · ".join(
        f'<a href="../sites/{slug}/index.html">{name}</a>' for slug, name in items
    )
    return (
        f'<p class="{cls}" {attr}="{year}" '
        f'style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px">'
        f"<b>{label}</b> (not the chip · empty never writes): {links} · pick + honesty</p>"
    )


def upsert_strips_in_html(html: str, year: str) -> str:
    plan = PLAN[year]
    blocks = {
        "first": strip_html(year, "first", plan["first"]),
        "second": strip_html(year, "second", plan["second"]),
        "third": strip_html(year, "third", plan["third"]),
    }
    pats = {
        "first": rf'<p[^>]*data-itt-pop3x="{year}"[^>]*>.*?</p>',
        "second": rf'<p[^>]*data-itt-pop-more="{year}"[^>]*>.*?</p>',
        "third": rf'<p[^>]*data-itt-pop-3x3="{year}"[^>]*>.*?</p>',
    }
    out = html
    for kind, pat in pats.items():
        if re.search(pat, out, re.I | re.S):
            out = re.sub(pat, blocks[kind], out, count=1, flags=re.I | re.S)
        else:
            out = blocks[kind] + "\n" + out
    return out


def panel(year: str, slug: str, name: str, kind: str, nxt: tuple[str, str] | None) -> str:
    star = STAR[year]
    if kind == "third":
        key = f"pop3-{slug}"
        storage = f"itt{year[2:]}-pop3-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}"'
        mark = "ITT-POP3X-THIRD"
    elif kind == "second":
        key = f"pop2-{slug}"
        storage = f"itt{year[2:]}-pop2-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop2-{slug}"'
        mark = "ITT-POP3X-SECOND"
    else:
        key = f"pop-{slug}"
        storage = f"itt{year[2:]}-pop-{slug}"
        go = f'data-pop-go data-pop-id="{slug}"'
        mark = "ITT-POP3X-FIRST"
    next_html = ""
    if nxt:
        next_html = (
            f'<p hidden data-next-flow data-next-when-key="{storage}">'
            f'<b>Next:</b> <a href="../{nxt[0]}/index.html">{nxt[1]}</a></p>'
        )
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{name}</b> · leftover 3× · {star} is the chip · incomplete never writes · <code>{storage}</code></p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{slug} leftover">{name}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{star} as leftover 3× (trap)</button>
</p>
<p><label>Caption <input type="text" data-pop-field placeholder="leftover" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> Famous-that-year leftover. Never write gold.</label>
<p><button type="button" {go}>Open leftover</button> <span data-pop-status></span></p>
{next_html}
</div>
<!-- {mark}:{slug}:end -->
"""


def has_first_go(html: str, slug: str) -> bool:
    return bool(re.search(rf'data-pop-go[^>]*data-pop-id="{re.escape(slug)}"(?![^>]*data-pop-key)', html)) or bool(
        re.search(rf'data-pop-id="{re.escape(slug)}"(?![^>]*data-pop-key)[^>]*data-pop-go', html)
    )


def has_keyed_go(html: str, key: str) -> bool:
    return f'data-pop-key="{key}"' in html


def inject_panel(path: Path, year: str, slug: str, name: str, kind: str, nxt: tuple[str, str] | None) -> bool:
    if not path.is_file():
        print("MISSING", path)
        return False
    html = path.read_text(encoding="utf-8", errors="replace")
    if kind == "first" and (has_first_go(html, slug) or f"ITT-POP3X-FIRST:{slug}:" in html):
        return False
    if kind == "second" and (has_keyed_go(html, f"pop2-{slug}") or f"ITT-POP3X-SECOND:{slug}:" in html):
        return False
    if kind == "third" and (has_keyed_go(html, f"pop3-{slug}") or f"ITT-POP3X-THIRD:{slug}:" in html):
        return False
    block = panel(year, slug, name, kind, nxt)
    if re.search(r"</body>", html, re.I):
        html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
    else:
        html += "\n" + block
    path.write_text(html, encoding="utf-8")
    return True


def write_jsons() -> None:
    p3 = json.loads((ROOT / "scripts/popular-3x-sites.json").read_text())
    p33 = json.loads((ROOT / "scripts/popular-3x3-sites.json").read_text())
    for year, plan in PLAN.items():
        p3[year] = [row(year, s, n) for s, n in plan["first"]]
        p33[year] = [row(year, s, n) for s, n in plan["third"]]
    (ROOT / "scripts/popular-3x-sites.json").write_text(json.dumps(p3, indent=2) + "\n")
    (ROOT / "scripts/popular-3x3-sites.json").write_text(json.dumps(p33, indent=2) + "\n")


def write_flow_map() -> None:
    path = ROOT / "js/config/flow-maps-popular-3x.js"
    text = path.read_text(encoding="utf-8")
    for year, plan in PLAN.items():
        items = ",".join(f'"{s}|{n}"' for s, n in plan["first"])
        pat = rf'"{year}":\s*\[[^\]]*\]'
        repl = f'"{year}": [{items}]'
        if re.search(pat, text):
            text = re.sub(pat, repl, text, count=1)
        else:
            text = text.replace("var POP = {", "var POP = {\n    " + repl + ",", 1)
    path.write_text(text, encoding="utf-8")


def write_home_and_extra() -> None:
    extra_path = ROOT / "ui/year/start-extra.js"
    extra = extra_path.read_text(encoding="utf-8")
    for year, plan in PLAN.items():
        home = ROOT / f"years/{year}/pages/home.html"
        if home.is_file():
            ht = home.read_text(encoding="utf-8", errors="replace")
            marker = f"<!-- ITT-LO3X-X3:{year}:start -->"
            block = (
                f"{marker}\n"
                + strip_html(year, "first", plan["first"])
                + "\n"
                + strip_html(year, "second", plan["second"])
                + "\n"
                + strip_html(year, "third", plan["third"])
                + f"\n<!-- ITT-LO3X-X3:{year}:end -->\n"
            )
            if marker in ht:
                ht = re.sub(
                    rf"<!-- ITT-LO3X-X3:{year}:start -->.*?<!-- ITT-LO3X-X3:{year}:end -->\n?",
                    block,
                    ht,
                    count=1,
                    flags=re.S,
                )
            else:
                ht = re.sub(r"(<body[^>]*>)", r"\1\n" + block, ht, count=1, flags=re.I)
            # keep a single canonical pop-more p on home (first match for V6)
            home.write_text(ht, encoding="utf-8")

        got = extract_js_string(extra, year)
        if not got:
            print("no start-extra", year)
            continue
        html, a, b = got
        html2 = upsert_strips_in_html(html, year)
        extra = extra[: a] + escape_js_string(html2) + extra[b:]
    extra_path.write_text(extra, encoding="utf-8")


def write_dest_panels() -> None:
    added = 0
    for year, plan in PLAN.items():
        for kind in ("first", "second", "third"):
            items = plan[kind]
            for i, (slug, name) in enumerate(items):
                nxt = items[(i + 1) % len(items)]
                path = ROOT / f"years/{year}/sites/{slug}/index.html"
                if inject_panel(path, year, slug, name, kind, nxt):
                    added += 1
                    print("panel", year, kind, slug)
    print("panels added", added)


def main() -> None:
    write_jsons()
    write_flow_map()
    write_home_and_extra()
    write_dest_panels()
    print("ok")


if __name__ == "__main__":
    main()
