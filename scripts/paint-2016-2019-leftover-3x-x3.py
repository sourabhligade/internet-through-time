#!/usr/bin/env python3
"""Paint leftover-3× ×3 for live 2016 / 2017 / 2019. Skip 2018 wiped. No dest-farm."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

STAR = {
    "2016": "Instagram Stories",
    "2017": "Face ID",
    "2019": "Disney+",
}

WHY = {
    "2016": "2016 leftover. Instagram Stories is the chip. No TikTok brand.",
    "2017": "2017 leftover. Face ID is the chip. Vine is gone. No TikTok US mass.",
    "2019": "2019 leftover. Disney+ Who's watching is the chip. Trial never writes.",
}

PLAN = {
    "2016": {
        "first": [
            ("slack", "Slack leftover"),
            ("reddit", "Reddit leftover"),
            ("netflix", "Netflix leftover"),
            ("youtube", "YouTube leftover"),
            ("alphago", "AlphaGo leftover"),
            ("assistant", "Assistant leftover"),
        ],
        "second": [
            ("houseparty", "Houseparty leftover"),
            ("inbox", "Inbox leftover"),
            ("jio", "Jio leftover"),
        ],
        "third": [
            ("pokemongo", "Pokémon GO leftover"),
            ("iphone", "iPhone 7 leftover"),
            ("vine", "Vine leftover"),
            ("snapchat", "Spectacles leftover"),
            ("musically", "musical.ly leftover"),
            ("smario", "Mario Run leftover"),
            ("fblive", "FB Live leftover"),
            ("moments", "Moments leftover"),
            ("superbowl", "Super Bowl leftover"),
        ],
    },
    "2017": {
        "first": [
            ("snapipo", "Snap IPO leftover"),
            ("bitcoinath", "Bitcoin leftover"),
            ("echoshow", "Echo Show leftover"),
            ("reddit", "Reddit leftover"),
            ("youtube", "YouTube leftover"),
            ("hqtrivia", "HQ Trivia leftover"),
            ("notpetya", "NotPetya leftover"),
            ("yahoo3b", "Yahoo leftover"),
            ("discord17", "Discord leftover"),
        ],
        "second": [
            ("amazon", "Amazon leftover"),
            ("android8", "Android 8 leftover"),
            ("bitmoji", "Bitmoji leftover"),
            ("cloudbleed", "Cloudbleed leftover"),
            ("creditfrz", "Credit freeze leftover"),
            ("flashend", "Flash leftover"),
            ("pixel2", "Pixel 2 leftover"),
            ("signal17", "Signal leftover"),
            ("telegram17", "Telegram leftover"),
        ],
        "third": [
            ("fortnite", "Fortnite leftover"),
            ("teams", "Teams leftover"),
            ("switch", "Switch leftover"),
            ("wannacry", "WannaCry leftover"),
            ("musically", "musical.ly leftover"),
            ("equifax", "Equifax leftover"),
            ("xboxonex", "Xbox leftover"),
            ("slack17", "Slack leftover"),
            ("pixelbook", "Pixelbook leftover"),
        ],
    },
    "2019": {
        "first": [
            ("facebook", "Facebook leftover"),
            ("fortnite", "Fortnite leftover"),
            ("hidelikes", "Hide likes leftover"),
            ("instagram", "Instagram leftover"),
            ("netflix", "Netflix leftover"),
            ("reddit", "Reddit leftover"),
            ("slack", "Slack leftover"),
            ("snapchat", "Snap leftover"),
            ("twitch", "Twitch leftover"),
        ],
        "second": [
            ("youtube", "YouTube leftover"),
            ("zoom10m", "Zoom leftover"),
            ("wework", "WeWork leftover"),
            ("gplus", "G+ shutdown leftover"),
            ("pinterest", "Pinterest leftover"),
            ("twitter", "Twitter leftover"),
            ("spotify", "Spotify leftover"),
            ("tumblr", "Tumblr leftover"),
            ("wikipedia", "Wikipedia leftover"),
        ],
        "third": [
            ("tiktok", "TikTok leftover"),
            ("arcade", "Arcade leftover"),
            ("appletv", "Apple TV+ leftover"),
            ("stadia", "Stadia leftover"),
            ("airpodspro", "AirPods Pro leftover"),
            ("chrome", "Chrome leftover"),
            ("windows10", "Windows 10 leftover"),
            ("oculusquest", "Quest leftover"),
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


def extract_js_string(src: str, year: str):
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
    print("painted 2016-2019 leftover-3x unique dests")


if __name__ == "__main__":
    main()
