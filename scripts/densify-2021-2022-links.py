#!/usr/bin/env python3
"""Widen 2021/2022 leftover strips + dest Also-this-year navs. Existing rooms only."""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
START = ROOT / "ui/year/start-extra.js"

spec = importlib.util.spec_from_file_location("b3", ROOT / "scripts/build-3x-links.py")
b3 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(b3)

PACK = {
    "2021": [
        ("../sites/shorts/index.html", "YouTube Shorts"),
        ("../sites/airtag/index.html", "AirTag"),
        ("../sites/coinbase/index.html", "Coinbase listing"),
        ("../sites/beeple/index.html", "Beeple Everydays"),
        ("../sites/bayc/index.html", "BAYC"),
        ("../sites/log4j/index.html", "Log4j patch"),
        ("../sites/whatsapp21/index.html", "WhatsApp policy"),
        ("../sites/telegram21/index.html", "Telegram surge"),
        ("../sites/ios15/index.html", "iOS 15 Focus"),
        ("../sites/mailpriv/index.html", "Mail Privacy"),
        ("../sites/relay/index.html", "iCloud Private Relay"),
        ("../sites/hidemail/index.html", "Hide My Email"),
        ("../sites/spaces21/index.html", "Twitter Spaces"),
        ("../sites/superfol/index.html", "Super Follows"),
        ("../sites/fboutage/index.html", "Facebook outage"),
        ("../sites/haugen/index.html", "Haugen"),
        ("../sites/dalle1/index.html", "DALL·E 1"),
        ("../sites/codex/index.html", "OpenAI Codex"),
        ("../sites/win365/index.html", "Windows 365"),
        ("../sites/android12/index.html", "Android 12"),
        ("../sites/pixel6/index.html", "Pixel 6"),
        ("../sites/tiktok21/index.html", "TikTok-as-2021"),
        ("../sites/snapspot/index.html", "Snap Spotlight"),
        ("../sites/dstage/index.html", "Discord Stage"),
        ("../sites/substack21/index.html", "Substack"),
        ("../sites/notion21/index.html", "Notion 2021"),
        ("../sites/figjam/index.html", "FigJam"),
        ("../sites/rbxipo/index.html", "Roblox listing"),
        ("../sites/affirm/index.html", "Affirm"),
        ("../sites/paramount/index.html", "Paramount+"),
        ("../sites/dplus21/index.html", "Disney+ Day"),
        ("../sites/topshot/index.html", "NBA Top Shot"),
        ("../sites/clubhouse/index.html", "Clubhouse"),
        ("../sites/gme/index.html", "GME"),
        ("../sites/epic/index.html", "Epic v Apple"),
        ("../sites/robinhood/index.html", "Robinhood"),
        ("../sites/opensea/index.html", "OpenSea"),
        ("../sites/wordleseed/index.html", "Wordle seed"),
        ("../sites/copilot/more.html", "Copilot second path"),
        ("../sites/att/about.html", "ATT literacy"),
        ("../sites/signal/index.html", "Signal leftover"),
        ("../sites/copilot/index.html", "Copilot waitlist"),
        ("../sites/meta/index.html", "Meta rename"),
        ("../sites/windows11/index.html", "Windows 11 leftover"),
        ("../sites/flash/index.html", "Flash brick"),
        ("../sites/chrome/index.html", "Chrome habit"),
        ("../sites/windows10/index.html", "Windows 10 residual"),
        ("../sites/facebook/index.html", "Facebook leftover"),
        ("../sites/youtube/index.html", "YouTube leftover"),
        ("../sites/wikipedia/index.html", "Wikipedia leftover"),
        ("../sites/facebook3x/index.html", "Facebook 3x"),
        ("../sites/nft/index.html", "NFT literacy"),
        ("../sites/squid/index.html", "Squid Game print"),
        ("../sites/instagram/index.html", "Instagram leftover"),
        ("../sites/twitter/index.html", "Twitter leftover"),
        ("../sites/tiktok/index.html", "TikTok leftover"),
        ("../sites/reddit/index.html", "Reddit leftover"),
        ("../sites/discord/index.html", "Discord leftover"),
        ("../sites/slack/index.html", "Slack leftover"),
        ("../sites/spotify/index.html", "Spotify leftover"),
        ("../sites/netflix/index.html", "Netflix leftover"),
        ("../sites/amazon/index.html", "Amazon leftover"),
        ("../sites/gmail/index.html", "Gmail leftover"),
        ("../sites/maps/index.html", "Maps leftover"),
        ("../sites/github/index.html", "GitHub leftover"),
        ("../sites/zoom/index.html", "Zoom leftover"),
        ("../sites/teams/index.html", "Teams leftover"),
        ("../sites/icloud/index.html", "iCloud leftover"),
        ("../sites/brave/index.html", "Brave leftover"),
        ("../sites/edge/index.html", "Edge leftover"),
        ("../sites/firefox/index.html", "Firefox leftover"),
        ("../sites/safari/index.html", "Safari leftover"),
        ("../sites/steam/index.html", "Steam leftover"),
        ("../sites/roblox/index.html", "Roblox leftover"),
        ("../sites/fortnite/index.html", "Fortnite leftover"),
        ("../sites/playable/game.html", "Five Letter"),
        ("../sites/att/index.html", "ATT Ask"),
    ],
    "2022": [
        ("../sites/whisper/index.html", "Whisper leftover"),
        ("../sites/merge/index.html", "Merge leftover"),
        ("../sites/ftx/index.html", "FTX leftover"),
        ("../sites/luna/index.html", "Luna leftover"),
        ("../sites/copilotga/index.html", "Copilot GA leftover"),
        ("../sites/figmaad/index.html", "Figma leftover"),
        ("../sites/steamdeck/index.html", "Steam Deck leftover"),
        ("../sites/ios16/index.html", "iOS 16 leftover"),
        ("../sites/passkeys/index.html", "Passkeys leftover"),
        ("../sites/craiyon/index.html", "Craiyon leftover"),
        ("../sites/heardle/index.html", "Heardle leftover"),
        ("../sites/quordle/index.html", "Quordle leftover"),
        ("../sites/redditnft/index.html", "Reddit NFT leftover"),
        ("../sites/twnft/index.html", "Twitter NFT leftover"),
        ("../sites/ignft/index.html", "IG NFT leftover"),
        ("../sites/looksrare/index.html", "LooksRare leftover"),
        ("../sites/temu/index.html", "Temu leftover"),
        ("../sites/next13/index.html", "Next.js 13 leftover"),
        ("../sites/bun22/index.html", "Bun leftover"),
        ("../sites/pplx/index.html", "Perplexity leftover"),
        ("../sites/d2api/index.html", "DALL-E 2 API leftover"),
        ("../sites/instruct/index.html", "InstructGPT leftover"),
        ("../sites/copyai/index.html", "Copy.ai leftover"),
        ("../sites/eleven/index.html", "ElevenLabs leftover"),
        ("../sites/lastpass/index.html", "LastPass leftover"),
        ("../sites/arc22/index.html", "Arc leftover"),
        ("../sites/truth/index.html", "Truth Social leftover"),
        ("../sites/hive22/index.html", "Hive leftover"),
        ("../sites/tumblr22/index.html", "Tumblr leftover"),
        ("../sites/win22h2/index.html", "Win11 22H2 leftover"),
        ("../sites/lockdown/index.html", "Lockdown Mode leftover"),
        ("../sites/gen2/index.html", "Runway Gen-2 leftover"),
        ("../sites/mj/index.html", "Midjourney leftover path"),
        ("../sites/lensa/index.html", "Lensa leftover"),
        ("../sites/masto/index.html", "Mastodon surge leftover"),
        ("../sites/cai/index.html", "Character leftover"),
        ("../sites/notionai/index.html", "Notion AI leftover"),
        ("../sites/chatgpt/about.html", "ChatGPT literacy"),
        ("../sites/twitter/index.html", "Twitter leftover"),
        ("../sites/wordle/index.html", "Wordle leftover"),
        ("../sites/stablediffusion/index.html", "Stable Diffusion leftover"),
        ("../sites/mastodon/index.html", "Mastodon leftover"),
        ("../sites/bereal/index.html", "BeReal leftover"),
        ("../sites/dalle2/index.html", "DALL-E 2 leftover"),
        ("../sites/chrome/index.html", "Chrome habit"),
        ("../sites/windows10/index.html", "Windows 10 residual"),
        ("../sites/youtube/index.html", "YouTube leftover"),
        ("../sites/wikipedia/index.html", "Wikipedia leftover"),
        ("../sites/facebook/index.html", "Facebook leftover"),
        ("../sites/tiktok/index.html", "TikTok leftover"),
        ("../sites/midjourney/index.html", "Midjourney leftover"),
        ("../sites/lensa3/index.html", "Lensa 3x"),
        ("../sites/instagram/index.html", "Instagram leftover"),
        ("../sites/reddit/index.html", "Reddit leftover"),
        ("../sites/discord/index.html", "Discord leftover"),
        ("../sites/slack/index.html", "Slack leftover"),
        ("../sites/spotify/index.html", "Spotify leftover"),
        ("../sites/netflix/index.html", "Netflix leftover"),
        ("../sites/amazon/index.html", "Amazon leftover"),
        ("../sites/gmail/index.html", "Gmail leftover"),
        ("../sites/maps/index.html", "Maps leftover"),
        ("../sites/github/index.html", "GitHub leftover"),
        ("../sites/zoom/index.html", "Zoom leftover"),
        ("../sites/teams/index.html", "Teams leftover"),
        ("../sites/icloud/index.html", "iCloud leftover"),
        ("../sites/brave/index.html", "Brave leftover"),
        ("../sites/edge/index.html", "Edge leftover"),
        ("../sites/firefox/index.html", "Firefox leftover"),
        ("../sites/safari/index.html", "Safari leftover"),
        ("../sites/steam/index.html", "Steam leftover"),
        ("../sites/roblox/index.html", "Roblox leftover"),
        ("../sites/fortnite/index.html", "Fortnite leftover"),
        ("../sites/playable/game.html", "Prompt Box"),
        ("../sites/chatgpt/index.html", "ChatGPT Send"),
    ],
}


def exists_from_pages(year: str, href: str) -> bool:
    return (ROOT / f"years/{year}/pages" / href).resolve().exists()


def strip_html(year: str, rows: list[tuple[str, str]]) -> tuple[str, list[tuple[str, str]]]:
    live = [(h, lab) for h, lab in rows if exists_from_pages(year, h)]
    bits = " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in live)
    html = (
        f'<p class="itt-2x-strip" id="ott-2x-{year}" data-itt-2x="{year}" '
        f'style="margin:12px 0;padding:8px;border:1px dashed #1565c0;background:#e3f2fd">'
        f"<b>Also this year · leftover 2×</b> (star stays) · {len(live)} rooms on disk<br>\n"
        f" {bits}\n</p>"
    )
    return html, live


def replace_year_string(src: str, year: str, old_html: str, new_html: str) -> str:
    """Replace leftover strip inside the JSON-escaped year value."""
    key = f'"{year}": '
    i = src.find(key)
    if i < 0:
        raise SystemExit(f"no year key {year}")
    j = src.find('"', i + len(key))
    if j < 0:
        raise SystemExit(f"no year string {year}")
    # parse JSON string starting at j
    decoder = json.JSONDecoder()
    value, end = decoder.raw_decode(src[j:])
    if old_html not in value and f'id="ott-2x-{year}"' not in value and f"ott-2x-{year}" not in value:
        raise SystemExit(f"ott-2x-{year} not inside START_EXTRA string")
    # replace any leftover strip paragraph
    updated, n = re.subn(
        rf'<p[^>]*id="ott-2x-{year}"[^>]*>.*?</p>',
        new_html,
        value,
        count=1,
        flags=re.S,
    )
    if n != 1:
        raise SystemExit(f"strip replace failed {year} n={n}")
    encoded = json.dumps(updated, ensure_ascii=False)
    return src[:j] + encoded + src[j + end :]


def main() -> None:
    src = START.read_text(encoding="utf-8")
    for year in ("2021", "2022"):
        new_strip, live = strip_html(year, PACK[year])
        missing = [h for h, _ in PACK[year] if not exists_from_pages(year, h)]
        print(f"{year} leftover strip rooms {len(live)} missing {len(missing)}")
        if missing:
            print("  missing", missing)
        src = replace_year_string(src, year, "", new_strip)
    START.write_text(src, encoding="utf-8")

    for year in (2021, 2022):
        ydir = ROOT / "years" / str(year)
        rooms, extras, titles, _pages = b3.site_inventory(year)
        also_pages = 0
        for html in sorted(ydir.rglob("*.html")):
            if not b3.is_year_html(html, year):
                continue
            if b3.lobby_names(html):
                continue
            block = b3.also_block(year, html, rooms, extras, titles, b3.this_site_of(html, year))
            if b3.patch_file(html, b3.MARK_ALSO, block):
                also_pages += 1
        print(f"{year} dest also-navs patched {also_pages} / rooms {len(rooms)}")


if __name__ == "__main__":
    main()
