#!/usr/bin/env python3
"""Stamp leftover 2× hop strips on 2022 dests that already exist.

No new dest folders. No new leftover writers. Replace ITT-2X-LINKS:2022 blocks only.
"""
from __future__ import annotations

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2022"

STAR = ("sites/chatgpt/index.html", "★ ChatGPT Send")

HA = [
    ("sites/whisper/index.html", "Whisper leftover"),
    ("sites/merge/index.html", "Merge leftover"),
    ("sites/ftx/index.html", "FTX leftover"),
    ("sites/luna/index.html", "Luna leftover"),
    ("sites/copilotga/index.html", "Copilot GA leftover"),
    ("sites/figmaad/index.html", "Figma announce leftover"),
    ("sites/steamdeck/index.html", "Steam Deck leftover"),
    ("sites/ios16/index.html", "iOS 16 leftover"),
    ("sites/passkeys/index.html", "Passkeys leftover"),
    ("sites/craiyon/index.html", "Craiyon leftover"),
    ("sites/heardle/index.html", "Heardle leftover"),
    ("sites/quordle/index.html", "Quordle leftover"),
    ("sites/redditnft/index.html", "Reddit NFT leftover"),
    ("sites/twnft/index.html", "Twitter NFT leftover"),
    ("sites/ignft/index.html", "IG NFT leftover"),
    ("sites/looksrare/index.html", "LooksRare leftover"),
    ("sites/temu/index.html", "Temu leftover"),
    ("sites/next13/index.html", "Next.js 13 leftover"),
    ("sites/bun22/index.html", "Bun leftover"),
    ("sites/pplx/index.html", "Perplexity leftover"),
    ("sites/d2api/index.html", "DALL·E 2 API leftover"),
    ("sites/instruct/index.html", "InstructGPT leftover"),
    ("sites/copyai/index.html", "Copy.ai leftover"),
    ("sites/eleven/index.html", "ElevenLabs leftover"),
    ("sites/lastpass/index.html", "LastPass leftover"),
    ("sites/arc22/index.html", "Arc leftover"),
    ("sites/truth/index.html", "Truth Social leftover"),
    ("sites/hive22/index.html", "Hive leftover"),
    ("sites/tumblr22/index.html", "Tumblr leftover"),
    ("sites/win22h2/index.html", "Win11 22H2 leftover"),
    ("sites/lockdown/index.html", "Lockdown leftover"),
    ("sites/gen2/index.html", "Gen-2 leftover"),
    ("sites/mj/index.html", "Midjourney leftover"),
    ("sites/lensa/index.html", "Lensa leftover"),
    ("sites/masto/index.html", "Mastodon surge leftover"),
    ("sites/bereal/more.html", "BeReal second leftover"),
    ("sites/wordle/more.html", "Wordle second leftover"),
    ("sites/cai/index.html", "Character.AI leftover"),
    ("sites/notionai/index.html", "Notion AI leftover"),
    ("sites/chatgpt/about.html", "ChatGPT literacy leftover"),
]

HB = [
    ("sites/chatgpt/index.html", "★ ChatGPT Send"),
    ("sites/twitter/index.html", "Twitter leftover"),
    ("sites/wordle/index.html", "Wordle leftover"),
    ("sites/stablediffusion/index.html", "Stable Diffusion leftover"),
    ("sites/mastodon/index.html", "Mastodon leftover"),
    ("sites/bereal/index.html", "BeReal leftover"),
    ("sites/dalle2/index.html", "DALL·E 2 leftover"),
    ("sites/chrome/index.html", "Chrome leftover"),
    ("sites/windows10/index.html", "Windows 10 leftover"),
    ("sites/playable/game.html", "Prompt Box"),
]

HC = [
    ("sites/youtube/index.html", "YouTube leftover"),
    ("sites/wikipedia/index.html", "Wikipedia leftover"),
    ("sites/facebook/index.html", "Facebook leftover"),
    ("sites/tiktok/index.html", "TikTok leftover"),
    ("sites/midjourney/index.html", "Midjourney leftover"),
    ("sites/lensa3/index.html", "Lensa leftover 3×3"),
    ("sites/chrome/more.html", "Chrome pop-more leftover"),
    ("sites/windows10/more.html", "Win10 pop-more leftover"),
    ("sites/mastodon/more.html", "Mastodon pop-more leftover"),
    ("sites/coprev/index.html", "Copilot preview leftover"),
]

HD = [
    ("sites/youtube/watch.html", "YouTube leftover watch"),
    ("sites/wikipedia/edit.html", "Wikipedia leftover edit"),
    ("sites/amazon/index.html", "Amazon leftover"),
    ("sites/reddit/index.html", "Reddit leftover"),
    ("sites/netflix/index.html", "Netflix leftover"),
    ("sites/spotify/index.html", "Spotify leftover"),
    ("sites/instagram/index.html", "Instagram leftover"),
    ("sites/twitter/more.html", "Twitter leftover 2"),
    ("sites/tiktok/more.html", "TikTok leftover 2"),
    ("sites/google/index.html", "Google leftover"),
    ("sites/gmail/index.html", "Gmail leftover"),
    ("sites/maps/index.html", "Maps leftover"),
    ("sites/paypal/index.html", "PayPal leftover"),
    ("sites/slack/index.html", "Slack leftover"),
    ("sites/discord/index.html", "Discord leftover"),
    ("sites/zoom/index.html", "Zoom leftover"),
    ("sites/teams/index.html", "Teams leftover"),
    ("sites/notion/index.html", "Notion leftover"),
    ("sites/figma/index.html", "Figma leftover"),
    ("sites/github/index.html", "GitHub leftover"),
    ("sites/linkedin/index.html", "LinkedIn leftover"),
    ("sites/twitch/index.html", "Twitch leftover"),
    ("sites/steam/index.html", "Steam leftover"),
    ("sites/epicstore/index.html", "Epic leftover"),
    ("sites/playstation/index.html", "PlayStation leftover"),
    ("sites/xbox/index.html", "Xbox leftover"),
    ("sites/nintendo/index.html", "Nintendo leftover"),
    ("sites/fortnite/index.html", "Fortnite leftover"),
    ("sites/amongus/index.html", "Among Us leftover"),
    ("sites/roblox/index.html", "Roblox leftover"),
    ("sites/substack/index.html", "Substack leftover"),
    ("sites/patreon/index.html", "Patreon leftover"),
    ("sites/kindle/index.html", "Kindle leftover"),
    ("sites/icloud/index.html", "iCloud leftover"),
    ("sites/edge/index.html", "Edge leftover"),
    ("sites/safari/index.html", "Safari leftover"),
    ("sites/firefox/index.html", "Firefox leftover"),
    ("sites/brave/index.html", "Brave leftover"),
    ("sites/playable/more.html", "Continuity leftover"),
    ("sites/playable/close.html", "Continuity close leftover"),
]

CAB = [
    ("sites/playable/index.html", "Playables leftover"),
    ("sites/playable/famous.html", "Famous leftover"),
    ("sites/playable/more-c.html", "God of War leftover cabinet"),
    ("sites/playable/more-d.html", "Elden Ring leftover cabinet"),
    ("sites/playable/extra-a.html", "extra-a leftover cabinet"),
    ("sites/playable/extra-b.html", "extra-b leftover cabinet"),
]

HA_ABOUT = [
    "sites/whisper/about.html",
    "sites/merge/about.html",
    "sites/ftx/about.html",
    "sites/ios16/about.html",
    "sites/passkeys/about.html",
    "sites/steamdeck/about.html",
    "sites/next13/about.html",
    "sites/pplx/about.html",
    "sites/arc22/about.html",
    "sites/lastpass/about.html",
    "sites/instruct/about.html",
    "sites/craiyon/about.html",
    "sites/temu/about.html",
    "sites/win22h2/about.html",
    "sites/lockdown/about.html",
    "sites/hive22/about.html",
]

HB_SECOND = [
    "sites/twitter/about.html",
    "sites/wordle/tiles.html",
    "sites/stablediffusion/about.html",
    "sites/mastodon/about.html",
    "sites/dalle2/about.html",
    "sites/chrome/about.html",
]


def rel(src: str, dest: str) -> str:
    return os.path.relpath(dest, Path(src).parent).replace("\\", "/")


def window(seq: list[tuple[str, str]], src: str, n: int = 8) -> list[tuple[str, str]]:
    paths = [p for p, _ in seq]
    if src in paths:
        i = paths.index(src)
    else:
        i = 0
    out: list[tuple[str, str]] = []
    seen = {src}
    # leftover Next first
    if src in paths and i + 1 < len(seq):
        nxt = seq[i + 1]
        out.append(nxt)
        seen.add(nxt[0])
    # neighbors
    for j in range(len(seq)):
        p, lab = seq[(i + j) % len(seq)]
        if p in seen:
            continue
        out.append((p, lab))
        seen.add(p)
        if len(out) >= n:
            break
    if STAR[0] not in seen:
        out.append(STAR)
    return out


def strip_html(src: str, hops: list[tuple[str, str]]) -> str:
    bits = []
    for href, lab in hops:
        bits.append(f'<a href="{rel(src, href)}">{lab}</a>')
    inner = " · ".join(bits)
    return (
        "<!-- ITT-2X-LINKS:2022:start -->\n"
        '<p class="itt-pop-more" data-itt-pop-more="2022" data-itt-2x-links="2022" '
        'style="margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;'
        'font-size:11px;max-width:52em">'
        f"<b>2× leftover walk</b> · {inner}</p>\n"
        "<!-- ITT-2X-LINKS:2022:end -->\n"
    )


BLOCK = re.compile(
    r"<!-- ITT-2X-LINKS:2022:start -->.*?<!-- ITT-2X-LINKS:2022:end -->\n?",
    re.S,
)


def stamp(src: str, hops: list[tuple[str, str]]) -> bool:
    path = YEAR / src
    if not path.is_file():
        print("missing", src)
        return False
    t = path.read_text(encoding="utf-8")
    block = strip_html(src, hops)
    if BLOCK.search(t):
        t = BLOCK.sub(block, t)
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    else:
        t = t.rstrip() + "\n" + block
    path.write_text(t, encoding="utf-8")
    return True


def main() -> int:
    n = 0
    for src, _ in HA:
        n += stamp(src, window(HA, src))
    for src in HA_ABOUT:
        n += stamp(src, window(HA, src))
    for src, _ in HB:
        n += stamp(src, window(HB, src))
    for src in HB_SECOND:
        n += stamp(src, window(HB, src))
    for src, _ in HC:
        n += stamp(src, window(HC, src))
    for src, _ in HD:
        n += stamp(src, window(HD, src))
    cab_hops = [
        ("sites/playable/famous.html", "Famous leftover"),
        ("sites/playable/game.html", "Prompt Box"),
        ("sites/whisper/index.html", "Whisper leftover"),
        STAR,
    ]
    for src, _ in CAB:
        n += stamp(src, cab_hops)
    htmln = len(list(YEAR.rglob("*.html")))
    dests = len([p for p in (YEAR / "sites").iterdir() if p.is_dir()])
    strips = 0
    for p in YEAR.rglob("*.html"):
        if 'data-itt-2x-links="2022"' in p.read_text(encoding="utf-8", errors="replace"):
            strips += 1
    print(f"stamped {n} · strips {strips} · html {htmln} · dests {dests}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
