#!/usr/bin/env python3
"""Apply leftover-3× unique dests (one dest / one key) on dests already on disk.

Does not dest-farm. Does not invent dest folders. Stops when 9 leftover dests
cannot fit. Forests stay dense (stacked pop/pop2/pop3 remain workshop).
2017 unique 30 wins — leftover-3× panels stripped from those dests.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STAR = {
    "2007": ("iPhone Safari", "itt07-iphone"),
    "2010": ("Instagram iOS", "itt10-ig-posts"),
    "2011": ("Google+", "itt11-gplus"),
    "2012": ("Instagram Android", "itt12-ig-android"),
    "2013": ("Vine 6s", "itt13-vine-posts"),
    "2014": ("WhatsApp Install", "itt14-wa-install"),
    "2015": ("Periscope Go LIVE", "itt15-periscope"),
    "2016": ("IG Stories", "itt16-ig-stories"),
    "2018": ("GDPR Manage", "itt18-gdpr"),
    "2019": ("Disney+ Continue", "itt19-disneyplus"),
    "2021": ("ATT Ask", "itt21-att"),
    "2020": ("Zoom Leave", "itt20-zoom"),
}

# Leftover dests already on disk. First 3 / next 3 / last 3 = unique leftover-3×n.
# Fewer than 9 = stop (do not add dests).
UNIQUE = {
    "2007": {
        "first": ["wiki", "myspace", "maps"],
        "second": ["ebay", "stumble", "wow"],
        "third": ["flickr", "reddit", "digg"],
    },
    "2010": {
        "first": ["netflix", "tumblr", "formspring"],
        "second": ["chrome", "wave", "android"],
        "third": ["reddit", "google", "groupon"],
    },
    "2011": {
        "first": ["icloud", "pinterest", "linkedin"],
        "second": ["kindlefire", "minecraft", "twitch"],
        "third": ["youtube", "dropbox", "hulu"],
    },
    "2012": {
        "first": ["drawsomething", "googledrive", "snapchat"],
        "second": ["uber", "buzzfeed", "youtube"],
        "third": ["reddit", "surface", "windows8"],
    },
    "2013": {
        "first": ["askfm", "whisper", "youtube"],
        "second": ["chrome", "medium", "yikyak"],
        "third": ["reddit", "facebook", "twitter"],
    },
    "2014": {
        "first": ["snapchat", "instagram", "uber"],
        "second": ["twitter", "musically14", "truecrypt"],
        "third": ["facebook", "wikipedia", "youtube"],
    },
    "2015": {
        "first": ["instagram", "spotify", "netflix"],
        "second": ["meerkat", "applemusicsub", "win10get"],
        "third": ["vine", "echo", "youtube"],
    },
    "2016": {
        "first": ["slack", "reddit", "netflix"],
        "second": ["youtube", "alphago", "assistant"],
        "third": ["dyn", "fblive", "moments"],
    },
    "2018": {
        "first": ["reddit", "youtube", "wikipedia"],
        "second": [],
        "third": [],
    },
    "2019": {
        "first": ["amazon", "facebook", "google"],
        "second": ["instagram", "nyt", "oculusquest"],
        "third": ["twitter", "yahoo", "youtube"],
    },
    "2021": {
        "first": ["amazon", "google", "instagram"],
        "second": ["twitter", "youtube"],
        "third": [],
    },
    "2020": {
        "first": ["amazon", "facebook", "google"],
        "second": ["instagram", "youtube", "slack"],
        "third": ["reddit", "wikipedia", "nyt"],
    },
}

UF17 = {
    "iphone",
    "fortnite",
    "twitter",
    "teams",
    "vine",
    "switch",
    "wannacry",
    "musically",
    "equifax",
    "playable",
    "ios11",
    "pubgnote",
    "cuphead",
    "twitterlite",
    "snapipo",
    "slack17",
    "hangoutschat",
    "snapmap",
    "instagram17",
    "botw",
    "splatoon2",
    "notpetya",
    "krack",
    "tbh",
    "messengerday",
    "creditfrz",
    "cloudbleed",
    "gettingoverit",
    "hollowknight",
}

LABEL = {
    "wiki": "Wikipedia",
    "myspace": "MySpace",
    "maps": "Maps",
    "ebay": "eBay",
    "stumble": "StumbleUpon",
    "wow": "World of Warcraft",
    "flickr": "Flickr",
    "reddit": "Reddit",
    "digg": "Digg",
    "netflix": "Netflix",
    "tumblr": "Tumblr",
    "formspring": "Formspring",
    "chrome": "Chrome",
    "wave": "Google Wave",
    "android": "Android",
    "google": "Google",
    "groupon": "Groupon",
    "icloud": "iCloud",
    "pinterest": "Pinterest",
    "linkedin": "LinkedIn",
    "kindlefire": "Kindle Fire",
    "minecraft": "Minecraft",
    "twitch": "Twitch",
    "youtube": "YouTube",
    "dropbox": "Dropbox",
    "hulu": "Hulu",
    "drawsomething": "Draw Something",
    "googledrive": "Drive",
    "snapchat": "Snapchat",
    "uber": "Uber",
    "buzzfeed": "BuzzFeed",
    "surface": "Surface",
    "windows8": "Windows 8",
    "askfm": "Ask.fm",
    "whisper": "Whisper",
    "yikyak": "Yik Yak",
    "medium": "Medium",
    "facebook": "Facebook",
    "twitter": "Twitter",
    "instagram": "Instagram",
    "musically14": "musical.ly",
    "truecrypt": "TrueCrypt",
    "wikipedia": "Wikipedia",
    "spotify": "Spotify",
    "meerkat": "Meerkat",
    "applemusicsub": "Apple Music leftover",
    "win10get": "Get Windows 10",
    "vine": "Vine leftover",
    "echo": "Echo",
    "slack": "Slack",
    "alphago": "AlphaGo",
    "assistant": "Assistant",
    "dyn": "Dyn leftover",
    "fblive": "Facebook Live",
    "moments": "Moments",
    "amazon": "Amazon leftover",
    "nyt": "NYT leftover",
    "oculusquest": "Oculus Quest",
    "yahoo": "Yahoo leftover",
}

VERB = {
    "wiki": "Read leftover",
    "myspace": "Open profile leftover",
    "maps": "Search leftover",
    "ebay": "Bid leftover",
    "stumble": "Stumble leftover",
    "wow": "Log leftover",
    "flickr": "Upload leftover",
    "reddit": "Open leftover",
    "digg": "Digg leftover",
    "netflix": "Queue leftover",
    "tumblr": "Reblog leftover",
    "formspring": "Answer leftover",
    "chrome": "Tab leftover",
    "wave": "Wave leftover",
    "android": "Froyo leftover",
    "google": "Search leftover",
    "groupon": "Deal leftover",
    "icloud": "Photo Stream leftover",
    "pinterest": "Pin leftover",
    "linkedin": "Invite leftover",
    "kindlefire": "Silk leftover",
    "minecraft": "World leftover",
    "twitch": "Watch leftover",
    "youtube": "Watch leftover",
    "dropbox": "Sync leftover",
    "hulu": "Watch leftover",
    "drawsomething": "Draw leftover",
    "googledrive": "Share leftover",
    "snapchat": "Snap leftover",
    "uber": "Ride leftover",
    "buzzfeed": "List leftover",
    "surface": "Start leftover",
    "windows8": "Start leftover",
    "askfm": "Ask leftover",
    "whisper": "Whisper leftover",
    "yikyak": "Yak leftover",
    "medium": "Publish leftover",
    "facebook": "Feed leftover",
    "twitter": "Tweet leftover",
    "instagram": "Filter leftover",
    "musically14": "Clip leftover",
    "truecrypt": "Volume leftover",
    "wikipedia": "Read leftover",
    "spotify": "Play leftover",
    "meerkat": "Go live leftover",
    "applemusicsub": "Trial leftover",
    "win10get": "GWX leftover",
    "vine": "6s leftover",
    "echo": "Alexa leftover",
    "slack": "Channel leftover",
    "alphago": "Match leftover",
    "assistant": "Ask leftover",
    "dyn": "Outage leftover",
    "fblive": "Live leftover",
    "moments": "Moment leftover",
    "amazon": "Cart leftover",
    "nyt": "Headline leftover",
    "oculusquest": "Quest leftover",
    "yahoo": "Portal leftover",
}

POP_BLOCK = re.compile(
    r"<!-- ITT-POP(?:3X|2|3|3X-2X)?(?::[A-Za-z0-9_-]+)?(?::[A-Za-z0-9_-]+)?:start -->"
    r".*?"
    r"<!-- ITT-POP(?:3X|2|3|3X-2X)?(?::[A-Za-z0-9_-]+)?(?::[A-Za-z0-9_-]+)?:end -->",
    re.S,
)
POP_FLOW = re.compile(
    r'<div class="itt-pop3x-flow"[^>]*>.*?</div>(?=\s*(?:<!--|</div><script|<script|</body>))',
    re.S,
)


def yy(year: str) -> str:
    return year[2:]


def dest_path(year: str, slug: str) -> Path:
    return ROOT / "years" / year / "sites" / slug / "index.html"


def panel_html(year: str, slug: str, kind: str, nxt: tuple[str, str] | None) -> str:
    star_name, _star_key = STAR[year]
    name = LABEL.get(slug, slug)
    verb = VERB.get(slug, "Open leftover")
    if kind == "first":
        key_attr = ""
        key = f"itt{yy(year)}-pop-{slug}"
        mark = f"ITT-POP3X:{slug}"
    elif kind == "second":
        key_attr = f' data-pop-key="pop2-{slug}"'
        key = f"itt{yy(year)}-pop2-{slug}"
        mark = f"ITT-POP2:{slug}"
    else:
        key_attr = f' data-pop-key="pop3-{slug}"'
        key = f"itt{yy(year)}-pop3-{slug}"
        mark = f"ITT-POP3:{slug}"
    trap = f"{star_name} as gold (trap)"
    if nxt:
        nslug, nlabel = nxt
        next_html = (
            f'<p hidden data-next-flow data-next-when-key="{key}">'
            f'<b>Next:</b><a href="../{nslug}/index.html">{nlabel}</a></p>'
        )
    else:
        next_html = (
            f'<p hidden data-next-flow data-next-when-key="{key}">'
            f'<b>Next:</b><a href="../../pages/home.html">Starting Point</a></p>'
        )
    return (
        f"<!-- {mark}:start -->"
        f'<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" '
        f'data-itt-dest-true="1" data-itt-year-beat="{year}" data-itt-lo3x-verb="{verb}" '
        f'style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;'
        f'background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">'
        f"<p><b>{name}</b> · dest-true leftover-3× {kind} · incomplete never writes · "
        f"<code>{key}</code></p>"
        f'<p data-itt-year-copy>{year}. {star_name} is the chip. This dest is leftover.</p>'
        f'<p><button type="button" data-pop-pick="keep" data-pop-q="{slug} leftover">{verb}</button>'
        f'<button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button></p>'
        f'<p><label>{verb}<br><input type="text" data-pop-field placeholder="{slug}" '
        f'size="28" maxlength="80"></label></p>'
        f'<label><input type="checkbox" data-pop-req>{year}. Empty never writes.</label>'
        f'<label><input type="checkbox" data-pop-req>Incomplete never writes gold.</label>'
        f'<p><button type="button" data-pop-go data-pop-id="{slug}"{key_attr}>{verb}</button>'
        f'<span data-pop-status></span></p>{next_html}</div>'
        f"<!-- {mark}:end -->"
    )


def strip_pop_panels(html: str) -> str:
    html = POP_BLOCK.sub("", html)
    html = POP_FLOW.sub("", html)
    return html


def inject_panel(html: str, panel: str) -> str:
    html = strip_pop_panels(html)
    if "<script src=" in html:
        return html.replace("<script src=", panel + "<script src=", 1)
    if "</body>" in html:
        return html.replace("</body>", panel + "</body>", 1)
    return html + panel


def apply_year(year: str) -> list[dict]:
    rows = []
    strips = UNIQUE[year]
    chain = []
    for kind in ("first", "second", "third"):
        for slug in strips[kind]:
            chain.append((kind, slug))
    for i, (kind, slug) in enumerate(chain):
        path = dest_path(year, slug)
        if not path.exists():
            raise SystemExit(f"missing leftover dest {path}")
        nxt = None
        if i + 1 < len(chain):
            nkind, nslug = chain[i + 1]
            nxt = (nslug, LABEL.get(nslug, nslug))
        panel = panel_html(year, slug, kind, nxt)
        html = path.read_text(encoding="utf-8")
        path.write_text(inject_panel(html, panel), encoding="utf-8")
        if kind == "first":
            key = f"itt{yy(year)}-pop-{slug}"
        elif kind == "second":
            key = f"itt{yy(year)}-pop2-{slug}"
        else:
            key = f"itt{yy(year)}-pop3-{slug}"
        rows.append(
            {
                "year": year,
                "kind": kind,
                "id": slug,
                "name": LABEL.get(slug, slug),
                "key": key,
                "star": STAR[year][1],
                "verb": VERB.get(slug, "Open leftover"),
                "href": f"/years/{year}/sites/{slug}/index.html",
            }
        )
    return rows


def strip_2017_unique() -> int:
    n = 0
    sites = ROOT / "years" / "2017" / "sites"
    for slug in UF17:
        dest = sites / slug
        files = []
        if dest.is_dir():
            files = list(dest.glob("*.html"))
        if not files:
            continue
        for f in files:
            html = f.read_text(encoding="utf-8")
            new = strip_pop_panels(html)
            if new != html:
                f.write_text(new, encoding="utf-8")
                n += 1
    return n


def write_catalogs(rows: list[dict]) -> None:
    first_src = json.loads((ROOT / "scripts" / "popular-3x-sites.json").read_text())
    third_src = json.loads((ROOT / "scripts" / "popular-3x3-sites.json").read_text())
    second: dict[str, list] = {}
    by_year: dict[str, dict[str, list]] = {}
    for row in rows:
        by_year.setdefault(row["year"], {"first": [], "second": [], "third": []})
        by_year[row["year"]][row["kind"]].append(row)
    for year, strips in by_year.items():

        def recs(kind: str) -> list[dict]:
            out = []
            for r in strips[kind]:
                out.append(
                    {
                        "id": r["id"],
                        "name": r["name"],
                        "title": f"{r['name']} leftover — {year}",
                        "why": f"{year} leftover-3× {kind}. Unique dest. Not the chip.",
                        "verb": r["verb"],
                        "ph": r["id"],
                        "btn": r["verb"],
                    }
                )
            return out

        first_src[year] = recs("first")
        third_src[year] = recs("third")
        if strips["second"]:
            second[year] = recs("second")
    (ROOT / "scripts" / "popular-3x-sites.json").write_text(
        json.dumps(first_src, indent=2) + "\n", encoding="utf-8"
    )
    (ROOT / "scripts" / "popular-3x3-sites.json").write_text(
        json.dumps(third_src, indent=2) + "\n", encoding="utf-8"
    )
    (ROOT / "scripts" / "popular-3x2-sites.json").write_text(
        json.dumps(second, indent=2) + "\n", encoding="utf-8"
    )


def write_flow_map(rows: list[dict]) -> None:
    cfg = ROOT / "js" / "config" / "flow-maps-popular-3x.js"
    t = cfg.read_text(encoding="utf-8")
    by_year: dict[str, list[dict]] = {}
    for row in rows:
        if row["kind"] != "first":
            continue
        by_year.setdefault(row["year"], []).append(row)
    for year, dests in by_year.items():
        line = (
            f'    "{year}": ['
            + ", ".join(f'"{r["id"]}|{r["name"]}"' for r in dests)
            + "],"
        )
        t = re.sub(rf'    "{year}": \[[^\]]*\],', line, t, count=1)
    cfg.write_text(t, encoding="utf-8")


def write_js_map(rows: list[dict]) -> None:
    by_year: dict[str, dict] = {}
    for row in rows:
        y = row["year"]
        by_year.setdefault(y, {"star": row["star"], "first": [], "second": [], "third": []})
        by_year[y][row["kind"]].append({"id": row["id"], "name": row["name"], "key": row["key"]})
    payload = json.dumps(by_year, indent=2)
    js = (
        "/** Unique leftover-3×n map — one dest / one key. Not dest-farm. */\n"
        "(function (global) {\n"
        '  "use strict";\n'
        "  var ITT = global.ITT || (global.ITT = {});\n"
        f"  ITT.leftover3xUnique = {payload};\n"
        "})(typeof window !== \"undefined\" ? window : this);\n"
    )
    (ROOT / "js" / "config" / "leftover-3x-unique.js").write_text(js, encoding="utf-8")
    (ROOT / "scripts" / "leftover-3x-unique.json").write_text(
        json.dumps(by_year, indent=2) + "\n", encoding="utf-8"
    )


def rewrite_matrix(path: Path, rows: list[dict], years: set[str]) -> None:
    keep = []
    for row in rows:
        if row["year"] not in years:
            continue
        keep.append(
            {
                "year": row["year"],
                "kind": row["kind"],
                "id": row["id"],
                "name": row["name"],
                "key": row["key"],
                "star": row["star"],
                "verb": row["verb"],
                "ph": row["id"],
                "keep": row["name"],
                "trap": f"{STAR[row['year']][0]} as gold (trap)",
                "href": row["href"],
            }
        )
    path.write_text(json.dumps(keep) + "\n", encoding="utf-8")


def prepend_rooms(year: str, slugs: list[str]) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.exists():
        return
    t = cfg.read_text(encoding="utf-8")
    for slug in reversed(slugs):
        line = f'    "sites/{slug}/index.html",\n'
        if line not in t and f'sites/{slug}/' not in t:
            t = t.replace("  var rooms = [\n", "  var rooms = [\n" + line, 1)
    cfg.write_text(t, encoding="utf-8")


def main() -> None:
    all_rows: list[dict] = []
    for year in UNIQUE:
        all_rows.extend(apply_year(year))
        slugs = []
        for kind in ("first", "second", "third"):
            slugs.extend(UNIQUE[year][kind])
        prepend_rooms(year, slugs)
    stripped = strip_2017_unique()
    write_catalogs(all_rows)
    write_flow_map(all_rows)
    write_js_map(all_rows)
    lean = set(UNIQUE)
    rewrite_matrix(
        ROOT / "e2e" / "2010-2015-leftover-3x.matrix.json",
        all_rows,
        {"2010", "2011", "2012", "2014", "2015"},
    )
    rewrite_matrix(
        ROOT / "e2e" / "2016-2019-leftover-3x.matrix.json",
        all_rows,
        {"2016", "2017", "2018", "2019"},
    )
    (ROOT / "e2e" / "leftover-3x-unique.matrix.json").write_text(
        json.dumps(all_rows, indent=2) + "\n", encoding="utf-8"
    )
    print(f"unique leftover-3× dests {len(all_rows)}")
    print(f"2017 unique-30 leftover-3× panels stripped {stripped}")
    for year, strips in UNIQUE.items():
        n = sum(len(strips[k]) for k in strips)
        print(f"  {year}: {n} dests first={strips['first']} second={strips['second']} third={strips['third']}")


if __name__ == "__main__":
    raise SystemExit("leftover-3× unique flows were removed. This script does not write them back.")
