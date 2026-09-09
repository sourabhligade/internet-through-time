#!/usr/bin/env python3
"""Paint leftover-3× ×3 for 2006–2010. Famous-that-year dests only. No new folders."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PLAN = {
    "2006": {
        "first": [
            ("flickr", "Flickr leftover"),
            ("gmail", "Gmail leftover"),
            ("reddit", "Reddit leftover"),
            ("myspace", "MySpace leftover"),
            ("delicious", "del.icio.us leftover"),
            ("digg", "Digg leftover"),
            ("google", "Google leftover"),
            ("yahoo", "Yahoo leftover"),
            ("amazon", "Amazon leftover"),
        ],
        "second": [
            ("firefox", "Firefox leftover"),
            ("lastfm", "Last.fm leftover"),
            ("linkedin", "LinkedIn leftover"),
            ("blogger", "Blogger leftover"),
            ("cnn", "CNN leftover"),
            ("ebay", "eBay leftover"),
            ("skype", "Skype leftover"),
            ("netflix", "Netflix leftover"),
            ("orkut", "Orkut leftover"),
        ],
        "third": [
            ("facebook", "Facebook leftover"),
            ("youtube", "YouTube leftover"),
            ("googledocs", "Google Docs leftover"),
            ("aws", "S3 leftover"),
            ("ie7", "IE7 leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("roblox", "Roblox leftover"),
            ("wii", "Wii leftover"),
            ("bebo", "Bebo leftover"),
        ],
    },
    "2007": {
        "first": [
            ("wiki", "Wikipedia leftover"),
            ("myspace", "MySpace leftover"),
            ("maps", "Maps leftover"),
            ("ebay", "eBay leftover"),
            ("stumble", "StumbleUpon leftover"),
            ("wow", "WoW leftover"),
            ("flickr", "Flickr leftover"),
            ("reddit", "Reddit leftover"),
            ("digg", "Digg leftover"),
        ],
        "second": [
            ("google", "Google leftover"),
            ("blogger", "Blogger leftover"),
            ("cnn", "CNN leftover"),
            ("orkut", "Orkut leftover"),
            ("itunes", "iTunes leftover"),
            ("steam", "Steam leftover"),
            ("wii", "Wii leftover"),
            ("ff2", "Firefox 2 leftover"),
            ("nyt", "NYT leftover"),
        ],
        "third": [
            ("streetview", "Street View leftover"),
            ("gmail", "Gmail leftover"),
            ("fbplat", "Facebook Platform leftover"),
            ("twitter", "Twitter leftover"),
            ("youtube", "YouTube leftover"),
            ("tumblr", "Tumblr leftover"),
            ("kindle", "Kindle leftover"),
            ("ie6", "XP/IE6 leftover"),
            ("xbox", "Xbox leftover"),
        ],
    },
    "2008": {
        "first": [
            ("stackoverflow", "Stack Overflow leftover"),
            ("posterous", "Posterous leftover"),
            ("grooveshark", "Grooveshark leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("gmail", "Gmail leftover"),
            ("reddit", "Reddit leftover"),
            ("flickr", "Flickr leftover"),
            ("myspace", "MySpace leftover"),
            ("netflix", "Netflix leftover"),
        ],
        "second": [
            ("tumblr", "Tumblr leftover"),
            ("lastfm", "Last.fm leftover"),
            ("evernote", "Evernote leftover"),
            ("friendfeed", "FriendFeed leftover"),
            ("bitly", "bit.ly leftover"),
            ("etsy", "Etsy leftover"),
            ("duckduckgo", "DuckDuckGo leftover"),
            ("xkcd", "xkcd leftover"),
            ("stumbleupon", "StumbleUpon leftover"),
        ],
        "third": [
            ("appstore", "App Store leftover"),
            ("chrome", "Chrome leftover"),
            ("android", "Android G1 leftover"),
            ("hulu", "Hulu leftover"),
            ("facebook", "Facebook leftover"),
            ("twitter", "Twitter leftover"),
            ("youtube", "YouTube leftover"),
            ("dropbox", "Dropbox leftover"),
            ("iphone", "iPhone 3G leftover"),
        ],
    },
    "2009": {
        "first": [
            ("omegle", "Omegle leftover"),
            ("chatroulette", "Chatroulette leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("android", "Android leftover"),
            ("kindle", "Kindle leftover"),
            ("reddit", "Reddit leftover"),
            ("youtube", "YouTube leftover"),
            ("myspace", "MySpace leftover"),
            ("wave", "Google Wave leftover"),
        ],
        "second": [
            ("chrome", "Chrome leftover"),
            ("gmail", "Gmail leftover"),
            ("google", "Google leftover"),
            ("hulu", "Hulu leftover"),
            ("maps", "Maps leftover"),
            ("netflix", "Netflix leftover"),
            ("steam", "Steam leftover"),
            ("github", "GitHub leftover"),
            ("friendfeed", "FriendFeed leftover"),
        ],
        "third": [
            ("farmville", "FarmVille leftover"),
            ("bing", "Bing leftover"),
            ("iphone", "iPhone 3GS leftover"),
            ("appstore", "App Store leftover"),
            ("twitter", "Twitter leftover"),
            ("foursquare", "Foursquare leftover"),
            ("kickstarter", "Kickstarter leftover"),
            ("windows7", "Win7 leftover"),
            ("minecraft", "Minecraft leftover"),
        ],
    },
    "2010": {
        "first": [
            ("netflix", "Netflix leftover"),
            ("tumblr", "Tumblr leftover"),
            ("formspring", "Formspring leftover"),
            ("chrome", "Chrome leftover"),
            ("wave", "Wave leftover"),
            ("android", "Android leftover"),
            ("reddit", "Reddit leftover"),
            ("google", "Google leftover"),
            ("groupon", "Groupon leftover"),
        ],
        "second": [
            ("quora", "Quora leftover"),
            ("pinterest", "Pinterest leftover"),
            ("dropbox", "Dropbox leftover"),
            ("digg", "Digg leftover"),
            ("angrybirds", "Angry Birds leftover"),
            ("wikileaks", "WikiLeaks leftover"),
            ("spotifyeu", "Spotify leftover"),
            ("yahoo", "Yahoo leftover"),
            ("hulustream", "Hulu leftover"),
        ],
        "third": [
            ("iphone", "iPhone 4 leftover"),
            ("ipad", "iPad leftover"),
            ("facebook", "Open Graph leftover"),
            ("farmville", "FarmVille leftover"),
            ("imgur", "Imgur leftover"),
            ("foursquare", "Foursquare leftover"),
            ("twitter", "Twitter leftover"),
            ("youtube", "YouTube leftover"),
            ("kickstarter", "Kickstarter leftover"),
        ],
    },
}

STAR = {
    "2006": "Twttr update",
    "2007": "iPhone Safari",
    "2008": "GitHub issue",
    "2009": "Facebook Like",
    "2010": "Instagram iOS",
}

WHY = {
    "2006": "2006 leftover. Twttr is the chip. No iPhone. No Chrome. No Street View.",
    "2007": "2007 leftover. iPhone Safari is the chip. App Store / Chrome are 2008.",
    "2008": "2008 leftover. GitHub issue is the chip. No Instagram.",
    "2009": "2009 leftover. Facebook Like is the chip. No Instagram. No iPad.",
    "2010": "2010 leftover. Instagram iOS is the chip. Android IG is 2012.",
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
    links = " · ".join(f'<a href="../sites/{slug}/index.html">{name}</a>' for slug, name in items)
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
            home.write_text(ht, encoding="utf-8")
        got = extract_js_string(extra, year)
        if not got:
            print("no start-extra", year)
            continue
        html, a, b = got
        extra = extra[:a] + escape_js_string(upsert_strips_in_html(html, year)) + extra[b:]
    extra_path.write_text(extra, encoding="utf-8")


def main() -> None:
    write_jsons()
    write_flow_map()
    write_home_and_extra()
    print("painted 2006-2010 leftover-3x unique dests")


if __name__ == "__main__":
    main()
