#!/usr/bin/env python3
"""Dest-true leftover-3× + 3 machines/legal dest for 2016 / 2017 / 2019."""
from __future__ import annotations

import json
import re
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
old_spec = importlib.util.spec_from_file_location("old", ROOT / "scripts/implement-1994-1998-lo3x-three-machines.py")
old = importlib.util.module_from_spec(old_spec)
old_spec.loader.exec_module(old)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-2016-2019-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

DEFAULT = dict(old.DEFAULT)
DEFAULT.update(
    {
        "alphago": ("open leftover match then honesty", "match", "AlphaGo leftover", "empty (trap)"),
        "assistant": ("ask leftover Assistant then honesty", "Assistant", "Assistant leftover", "empty (trap)"),
        "houseparty": ("join leftover room then honesty", "room", "Houseparty leftover", "empty (trap)"),
        "inbox": ("open leftover Inbox then honesty", "mail", "Inbox leftover", "empty (trap)"),
        "jio": ("open leftover Jio then honesty", "Jio", "Jio leftover", "empty (trap)"),
        "pokemongo": ("catch leftover then honesty", "gym", "Pokémon GO leftover", "PoGo-as-gold (trap)"),
        "smario": ("run leftover Mario then honesty", "run", "Mario Run leftover", "empty (trap)"),
        "snapipo": ("open leftover IPO then honesty", "IPO", "Snap leftover", "empty (trap)"),
        "bitcoinath": ("open leftover ATH then honesty", "ATH", "Bitcoin leftover", "empty (trap)"),
        "echoshow": ("ask leftover Echo Show then honesty", "Alexa", "Echo Show leftover", "empty (trap)"),
        "hqtrivia": ("play leftover HQ then honesty", "HQ", "HQ Trivia leftover", "empty (trap)"),
        "notpetya": ("open leftover NotPetya then honesty", "patch", "NotPetya leftover", "payload (trap)"),
        "yahoo3b": ("open leftover Yahoo then honesty", "Yahoo", "Yahoo leftover", "empty (trap)"),
        "discord17": ("join leftover Discord then honesty", "server", "Discord leftover", "empty (trap)"),
        "cloudbleed": ("rotate leftover then honesty", "rotate", "Cloudbleed leftover", "exploit (trap)"),
        "creditfrz": ("freeze leftover credit then honesty", "freeze", "Credit freeze leftover", "empty (trap)"),
        "flashend": ("open leftover Flash then honesty", "Flash", "Flash leftover", "empty (trap)"),
        "pixel2": ("open leftover Pixel then honesty", "Pixel", "Pixel leftover", "empty (trap)"),
        "signal17": ("send leftover Signal then honesty", "message", "Signal leftover", "empty (trap)"),
        "telegram17": ("send leftover Telegram then honesty", "message", "Telegram leftover", "empty (trap)"),
        "wannacry": ("patch leftover WannaCry then honesty", "patch", "WannaCry leftover", "payload (trap)"),
        "xboxonex": ("open leftover Xbox then honesty", "Xbox", "Xbox leftover", "empty (trap)"),
        "hidelikes": ("hide leftover likes then honesty", "likes", "Hide likes leftover", "empty (trap)"),
        "zoom10m": ("leave leftover Zoom then honesty", "Leave", "Zoom leftover", "Zoom-as-2019-gold (trap)"),
        "wework": ("open leftover WeWork then honesty", "WeWork", "WeWork leftover", "empty (trap)"),
        "gplus": ("open leftover G+ shutdown then honesty", "G+", "G+ leftover", "empty (trap)"),
        "tiktok": ("open leftover For You then honesty", "FYP", "TikTok leftover", "TikTok-as-gold (trap)"),
        "arcade": ("open leftover Arcade then honesty", "Arcade", "Arcade leftover", "empty (trap)"),
        "appletv": ("open leftover Apple TV+ then honesty", "TV+", "Apple TV+ leftover", "empty (trap)"),
        "stadia": ("open leftover Stadia then honesty", "Stadia", "Stadia leftover", "shutdown-as-2019 (trap)"),
        "airpodspro": ("open leftover AirPods Pro then honesty", "AirPods", "AirPods Pro leftover", "empty (trap)"),
        "oculusquest": ("open leftover Quest then honesty", "Quest", "Quest leftover", "empty (trap)"),
        "android8": ("open leftover Oreo then honesty", "Oreo", "Android 8 leftover", "empty (trap)"),
        "bitmoji": ("open leftover Bitmoji then honesty", "Bitmoji", "Bitmoji leftover", "empty (trap)"),
        "fortnite": ("drop leftover then honesty", "bus", "Fortnite leftover", "Fortnite-as-gold (trap)"),
        "musically": ("record leftover then honesty", "clip", "musical.ly leftover", "TikTok-as-2016 (trap)"),
    }
)

BEAT = {
    "2016": "2016 leftover. Instagram Stories is the chip. No TikTok brand. No Reels.",
    "2017": "2017 leftover. Face ID is the chip. Vine is gone. No TikTok US mass.",
    "2019": "2019 leftover. Disney+ Who's watching is the chip. Trial never writes.",
}

STAR_KEY = {
    "2016": "itt16-ig-stories",
    "2017": "itt17-faceid",
    "2019": "itt19-disneyplus",
}

OFFICIAL = {
    "2016": {"instagram", "pokemongo", "facebook", "whatsapp", "iphone", "vine", "snapchat", "musically", "windows10", "playable"},
    "2017": {"iphone", "fortnite", "twitter", "teams", "vine", "switch", "wannacry", "musically", "equifax", "playable"},
    "2019": {"disneyplus", "tiktok", "arcade", "appletv", "stadia", "iphone", "airpodspro", "chrome", "windows10", "playable"},
}


def truth(slug):
    return DEFAULT.get(slug, ("open leftover dest then dest-true verb", "leftover", f"{slug} leftover", "anachronism (trap)"))


def more_href(year, slug):
    more = ROOT / f"years/{year}/sites/{slug}/more.html"
    return "more.html" if more.is_file() else None


def real_panel(year, slug, name, kind, nxt):
    star = paint.STAR[year]
    verb, ph, keep, trap = truth(slug)
    beat = BEAT[year]
    if kind == "third":
        storage = f"itt{year[2:]}-pop3-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}"'
        mark = "ITT-POP3X-THIRD"
    elif kind == "second":
        storage = f"itt{year[2:]}-pop2-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop2-{slug}"'
        mark = "ITT-POP3X-SECOND"
    else:
        storage = f"itt{year[2:]}-pop-{slug}"
        go = f'data-pop-go data-pop-id="{slug}"'
        mark = "ITT-POP3X-FIRST"
    miss = more_href(year, slug)
    miss_html = (
        f'<p class="itt-lo3x-miss"><b>M2 miss / wall:</b> <a href="{miss}" data-itt-lo3x-miss="1">in-year miss / more · never writes leftover-3×</a></p>'
        if miss
        else ""
    )
    next_html = (
        f'<p hidden data-next-flow data-next-when-key="{storage}"><b>Next:</b> <a href="../{nxt[0]}/index.html">{nxt[1]}</a></p>'
        if nxt
        else ""
    )
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="{year}" data-itt-lo3x-verb="{verb}" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{name}</b> · leftover 3× · {year}-true · {star} is the chip · incomplete never writes · <code>{storage}</code></p>
<p data-itt-year-copy>{beat}</p>
<p><b>M3:</b> {verb}. Empty / trap never writes.</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {beat}</label>
{miss_html}
<p><button type="button" {go}>{keep}</button> <span data-pop-status></span></p>
{next_html}
</div>
<!-- {mark}:{slug}:end -->
"""


def replace_or_insert(path, year, slug, name, kind, nxt):
    if not path.is_file():
        return "missing"
    html = path.read_text(encoding="utf-8", errors="replace")
    mark = {"first": "ITT-POP3X-FIRST", "second": "ITT-POP3X-SECOND", "third": "ITT-POP3X-THIRD"}[kind]
    block = real_panel(year, slug, name, kind, nxt)
    pat = rf"<!-- {mark}:{slug}:start -->.*?<!-- {mark}:{slug}:end -->"
    if re.search(pat, html, re.S):
        html = re.sub(pat, block.strip(), html, count=1, flags=re.S)
        path.write_text(html, encoding="utf-8")
        return "replaced"
    if re.search(r"</body>", html, re.I):
        html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
    else:
        html += "\n" + block
    path.write_text(html, encoding="utf-8")
    return "inserted"


def kinds_for(year, slug):
    return ["third"] if slug in OFFICIAL[year] else ["first", "second", "third"]


def dests(year):
    seen = {}
    for kind in ("first", "second", "third"):
        for slug, name in paint.PLAN[year][kind]:
            seen.setdefault(slug, name)
    return list(seen.items())


def next_of(year, slug, kind):
    items = paint.PLAN[year][kind]
    slugs = [s for s, _ in items]
    if slug in slugs:
        return items[(slugs.index(slug) + 1) % len(items)]
    return items[0]


def main():
    counts = {"replaced": 0, "inserted": 0, "missing": 0}
    rows = []
    for year in paint.PLAN:
        for slug, name in dests(year):
            for kind in kinds_for(year, slug):
                nxt = next_of(year, slug, kind)
                st = replace_or_insert(ROOT / f"years/{year}/sites/{slug}/index.html", year, slug, name, kind, nxt)
                counts[st] = counts.get(st, 0) + 1
                print(st, year, kind, slug)
                verb, ph, keep, trap = truth(slug)
                key = {"first": f"itt{year[2:]}-pop-{slug}", "second": f"itt{year[2:]}-pop2-{slug}", "third": f"itt{year[2:]}-pop3-{slug}"}[kind]
                rows.append(
                    {
                        "year": year,
                        "kind": kind,
                        "id": slug,
                        "name": name,
                        "key": key,
                        "star": STAR_KEY[year],
                        "verb": verb,
                        "ph": ph,
                        "keep": keep,
                        "trap": trap,
                        "beat": BEAT[year],
                        "miss": more_href(year, slug),
                        "nextId": nxt[0],
                        "href": f"/years/{year}/sites/{slug}/index.html",
                    }
                )
    out = ROOT / "e2e/2016-2019-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print(counts, "matrix", len(rows))


if __name__ == "__main__":
    main()
