#!/usr/bin/env python3
"""Dest-true leftover-3× + 3 machines/legal dest for 2021 / 2022."""
from __future__ import annotations

import json
import re
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
old_spec = importlib.util.spec_from_file_location("old", ROOT / "scripts/implement-2016-2019-lo3x-three-machines.py")
old = importlib.util.module_from_spec(old_spec)
old_spec.loader.exec_module(old)
paint_spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-2018-2022-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(paint_spec)
paint_spec.loader.exec_module(paint)

DEFAULT = dict(old.DEFAULT)
DEFAULT.update(
    {
        "clubhouse": ("join leftover room then honesty", "room", "Clubhouse leftover", "Clubhouse-as-gold (trap)"),
        "nft": ("open leftover drop then honesty", "drop", "NFT leftover", "live-mint (trap)"),
        "squid": ("open leftover print then honesty", "print", "Squid leftover", "empty (trap)"),
        "shorts": ("watch leftover Short then honesty", "Short", "Shorts leftover", "Reels-as-2021 (trap)"),
        "airtag": ("name leftover AirTag then honesty", "keys", "AirTag leftover", "empty (trap)"),
        "gme": ("open leftover squeeze then honesty", "GME", "GME leftover", "live-trade (trap)"),
        "beeple": ("open leftover Everydays then honesty", "Everydays", "Beeple leftover", "live-bid (trap)"),
        "bayc": ("open leftover Ape then honesty", "Ape", "BAYC leftover", "live-mint (trap)"),
        "opensea": ("browse leftover drop then honesty", "drop", "OpenSea leftover", "live-mint (trap)"),
        "coinbase": ("open leftover listing then honesty", "COIN", "Coinbase leftover", "live-trade (trap)"),
        "spaces21": ("join leftover Space then honesty", "Space", "Spaces leftover", "empty (trap)"),
        "fboutage": ("open leftover outage then honesty", "outage", "Outage leftover", "empty (trap)"),
        "haugen": ("open leftover Files then honesty", "Files", "Haugen leftover", "empty (trap)"),
        "log4j": ("patch leftover then honesty", "patch", "Log4j leftover", "exploit (trap)"),
        "rbxipo": ("open leftover listing then honesty", "RBLX", "Roblox leftover", "live-trade (trap)"),
        "signal": ("send leftover Signal then honesty", "message", "Signal leftover", "Signal-as-gold (trap)"),
        "copilot": ("open leftover waitlist then honesty", "waitlist", "Copilot leftover", "ChatGPT-as-2021 (trap)"),
        "meta": ("open leftover rename then honesty", "Meta", "Meta leftover", "Meta-app-as-gold (trap)"),
        "windows11": ("open leftover Win11 then honesty", "Win11", "Win11 leftover", "Win11-as-January (trap)"),
        "flash": ("open leftover brick then honesty", "Flash", "Flash leftover", "Play-SWF (trap)"),
        "ftx": ("open leftover collapse then honesty", "FTX", "FTX leftover", "live-book (trap)"),
        "steamdeck": ("open leftover Deck then honesty", "Deck", "Steam Deck leftover", "empty (trap)"),
        "passkeys": ("create leftover passkey then honesty", "passkey", "Passkeys leftover", "empty (trap)"),
        "midjourney": ("open leftover prompt then honesty", "prompt", "Midjourney leftover", "Midjourney-as-gold (trap)"),
        "lensa3": ("open leftover avatar then honesty", "avatar", "Lensa leftover", "empty (trap)"),
        "temu": ("open leftover deal then honesty", "deal", "Temu leftover", "live-charge (trap)"),
        "merge": ("open leftover Merge then honesty", "Merge", "Merge leftover", "empty (trap)"),
        "lastpass": ("rotate leftover then honesty", "rotate", "LastPass leftover", "dump (trap)"),
        "whisper": ("transcribe leftover then honesty", "audio", "Whisper leftover", "empty (trap)"),
        "copilotga": ("open leftover Copilot then honesty", "Copilot", "Copilot leftover", "ChatGPT-as-gold (trap)"),
        "ios16": ("open leftover Lock Screen then honesty", "Lock Screen", "iOS 16 leftover", "ATT-as-2022 (trap)"),
        "figmaad": ("open leftover announce then honesty", "Figma", "Figma leftover", "empty (trap)"),
        "stablediffusion": ("open leftover prompt then honesty", "prompt", "SD leftover", "live-weights (trap)"),
        "mastodon": ("join leftover instance then honesty", "instance", "Mastodon leftover", "X-as-2022 (trap)"),
        "bereal": ("post leftover BeReal then honesty", "BeReal", "BeReal leftover", "empty (trap)"),
        "dalle2": ("open leftover waitlist then honesty", "waitlist", "DALL·E 2 leftover", "DALL-E-3-as-2022 (trap)"),
        "craiyon": ("open leftover prompt then honesty", "prompt", "Craiyon leftover", "DALL-E-2-as-gold (trap)"),
        "wordle": ("type leftover word then honesty", "crane", "Wordle leftover", "Wordle-as-gold (trap)"),
        "ios15": ("open leftover Focus then honesty", "Focus", "iOS 15 leftover", "empty (trap)"),
        "whatsapp21": ("open leftover policy then honesty", "policy", "WhatsApp leftover", "Signal-as-gold (trap)"),
        "telegram21": ("join leftover Telegram then honesty", "Telegram", "Telegram leftover", "empty (trap)"),
        "dalle1": ("open leftover DALL·E then honesty", "DALL-E", "DALL·E leftover", "Midjourney-as-2021 (trap)"),
        "codex": ("open leftover Codex then honesty", "Codex", "Codex leftover", "ChatGPT-as-2021 (trap)"),
        "win365": ("open leftover Cloud PC then honesty", "Cloud PC", "Win365 leftover", "empty (trap)"),
        "pixel6": ("open leftover Pixel then honesty", "Pixel", "Pixel leftover", "empty (trap)"),
        "robinhood": ("open leftover leftover then honesty", "GME", "Robinhood leftover", "live-trade (trap)"),
        "paramount": ("open leftover stream then honesty", "stream", "Paramount leftover", "empty (trap)"),
        "notionai": ("open leftover Notion AI then honesty", "Notion", "Notion leftover", "ChatGPT-as-gold (trap)"),
        "heardle": ("guess leftover track then honesty", "track", "Heardle leftover", "Wordle-as-gold (trap)"),
        "quordle": ("type leftover words then honesty", "words", "Quordle leftover", "Wordle-as-gold (trap)"),
        "lockdown": ("open leftover Lockdown then honesty", "Lockdown", "Lockdown leftover", "ATT-as-2022 (trap)"),
        "win22h2": ("open leftover 22H2 then honesty", "22H2", "Win11 leftover", "empty (trap)"),
    }
)

BEAT = {
    "2021": "2021 leftover. ATT Ask is the chip. No ChatGPT. No Wordle NYT. Win10 + Chrome habit.",
    "2022": "2022 leftover. ChatGPT Send is the chip. Plus / GPT-4 / Bing / X are 2023.",
}

STAR_KEY = {
    "2021": "itt21-att",
    "2022": "itt22-chatgpt",
}

OFFICIAL = {
    "2021": {"att", "signal", "copilot", "meta", "windows11", "flash", "chrome", "windows10", "facebook", "playable"},
    "2022": {"chatgpt", "twitter", "wordle", "stablediffusion", "mastodon", "bereal", "dalle2", "chrome", "windows10", "playable"},
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


def replace_or_insert(path: Path, year, slug, name, kind, nxt):
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
    out = ROOT / "e2e/2018-2022-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print(counts, "matrix", len(rows))


if __name__ == "__main__":
    main()
