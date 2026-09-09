#!/usr/bin/env python3
"""Paint leftover-3× ×3 for 2011–2015. Famous-that-year dests only. No new folders. Skip 2010 (already done) and 2013 (boarded)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STAR = {
    "2011": "Google+",
    "2012": "Instagram Android",
    "2014": "WhatsApp Install",
    "2015": "Periscope",
}

WHY = {
    "2011": "2011 leftover. Google+ Circles is the chip. Win7 + IE9.",
    "2012": "2012 leftover. Instagram Android is the chip. Vine is 2013.",
    "2014": "2014 leftover. WhatsApp Install is the chip. Echo is 2015.",
    "2015": "2015 leftover. Periscope Go LIVE is the chip.",
}

PLAN = {
    "2011": {
        "first": [
            ("icloud", "iCloud leftover"),
            ("pinterest", "Pinterest leftover"),
            ("linkedin", "LinkedIn leftover"),
            ("kindlefire", "Kindle Fire leftover"),
            ("minecraft", "Minecraft leftover"),
            ("twitch", "Twitch leftover"),
            ("dropbox", "Dropbox leftover"),
            ("chrome", "Chrome leftover"),
            ("gmusic", "Google Music leftover"),
        ],
        "second": [
            ("android4", "ICS leftover"),
            ("lion", "OS X Lion leftover"),
            ("netflix", "Netflix leftover"),
            ("reddit", "Reddit leftover"),
            ("steam", "Steam leftover"),
            ("skype", "Skype leftover"),
            ("github", "GitHub leftover"),
            ("lastfm", "Last.fm leftover"),
            ("xbox", "Xbox leftover"),
        ],
        "third": [
            ("spotify", "Spotify leftover"),
            ("iphone", "Siri leftover"),
            ("facebook", "Timeline leftover"),
            ("ipad", "iPad 2 leftover"),
            ("airbnb", "Airbnb leftover"),
            ("instagram", "IG iOS leftover"),
            ("twitter", "Twitter leftover"),
            ("qwikster", "Qwikster leftover"),
            ("youtube", "YouTube leftover"),
        ],
    },
    "2012": {
        "first": [
            ("drawsomething", "Draw Something leftover"),
            ("googledrive", "Drive leftover"),
            ("snapchat", "Snap leftover"),
            ("youtube", "YouTube leftover"),
            ("uber", "Uber leftover"),
            ("buzzfeed", "BuzzFeed leftover"),
            ("chrome", "Chrome leftover"),
            ("soundcloud", "SoundCloud leftover"),
            ("surface", "Surface leftover"),
        ],
        "second": [
            ("trello", "Trello leftover"),
            ("lyft", "Lyft leftover"),
            ("kindlefire", "Kindle Fire leftover"),
            ("tumblr", "Tumblr leftover"),
            ("netflix", "Netflix leftover"),
            ("gmail", "Gmail leftover"),
            ("amazon", "Amazon leftover"),
            ("twitter", "Twitter leftover"),
            ("waze", "Waze leftover"),
        ],
        "third": [
            ("medium", "Medium leftover"),
            ("path", "Path leftover"),
            ("flipboard", "Flipboard leftover"),
            ("pinterest", "Pinterest leftover"),
            ("facebook", "Facebook leftover"),
            ("iphone", "Maps leftover"),
            ("wikipedia", "SOPA leftover"),
            ("reddit", "Reddit leftover"),
            ("windows8", "Windows 8 leftover"),
        ],
    },
    "2014": {
        "first": [
            ("snapchat", "Snapchat leftover"),
            ("instagram", "Instagram leftover"),
            ("uber", "Uber leftover"),
            ("twitter", "Twitter leftover"),
            ("musically14", "musical.ly leftover"),
            ("truecrypt", "TrueCrypt leftover"),
        ],
        "second": [
            ("oculus", "Oculus leftover"),
            ("serial", "Serial leftover"),
            ("ello", "Ello leftover"),
        ],
        "third": [
            ("youtube", "YouTube leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("facebook", "Facebook leftover"),
            ("heartbleed", "Heartbleed leftover"),
            ("icebucket", "Ice Bucket leftover"),
            ("iphone", "iPhone 6 leftover"),
            ("material", "Material leftover"),
            ("slack", "Slack leftover"),
            ("twitch", "Twitch leftover"),
        ],
    },
    "2015": {
        "first": [
            ("instagram", "Instagram leftover"),
            ("spotify", "Spotify leftover"),
            ("netflix", "Netflix leftover"),
            ("meerkat", "Meerkat leftover"),
            ("applemusicsub", "Music sub leftover"),
            ("win10get", "GWX leftover"),
            ("vine", "Vine leftover"),
            ("echo", "Echo leftover"),
            ("youtube", "YouTube leftover"),
        ],
        "second": [
            ("uber", "Uber leftover"),
            ("twitch", "Twitch leftover"),
            ("slack", "Slack leftover"),
            ("tinder", "Tinder leftover"),
            ("reddit", "Reddit leftover"),
            ("twitter", "Twitter leftover"),
            ("facebook", "Facebook leftover"),
            ("gmail", "Gmail leftover"),
            ("chrome", "Chrome leftover"),
        ],
        "third": [
            ("googlephotos", "Photos leftover"),
            ("windows10", "Windows 10 leftover"),
            ("applemusic", "Apple Music leftover"),
            ("edge", "Edge leftover"),
            ("snapchat", "Discover leftover"),
            ("discord", "Discord leftover"),
            ("letsencrypt", "Let's Encrypt leftover"),
            ("wikipedia", "Wikipedia leftover"),
            ("nyt", "NYT leftover"),
        ],
    },
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
    missing = []
    for year, plan in PLAN.items():
        for kind in ("first", "second", "third"):
            for slug, _n in plan[kind]:
                p = ROOT / f"years/{year}/sites/{slug}/index.html"
                if not p.is_file():
                    missing.append(f"{year}/{slug}")
    if missing:
        raise SystemExit("missing dests: " + ", ".join(missing))
    write_jsons()
    write_flow_map()
    write_home_and_extra()
    print("painted 2011-2015 leftover-3x unique dests")


if __name__ == "__main__":
    main()
