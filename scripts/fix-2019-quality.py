#!/usr/bin/env python3
"""Tighten 2019 dest HTML: dest-true crumbs, leftover placeholders, no dup Starting Point."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2019"

# Mid-trail crumb: previous dest on the 55-list, then Starting Point.
HOPS = [
    ("sites/disneyplus/home.html", "★ Disney+ Continue"),
    ("sites/tiktok/index.html", "TikTok For You"),
    ("sites/arcade/index.html", "Apple Arcade"),
    ("sites/appletv/index.html", "Apple TV+"),
    ("sites/stadia/index.html", "Stadia Founder's"),
    ("sites/iphone/iphone11.html", "iPhone 11"),
    ("sites/airpodspro/index.html", "AirPods Pro"),
    ("sites/chrome/index.html", "Chrome habit"),
    ("sites/windows10/index.html", "Win10 residual"),
    ("sites/playable/game.html", "Continue Row"),
    ("sites/youtube/index.html", "YouTube leftover"),
    ("sites/instagram/index.html", "Instagram leftover"),
    ("sites/wikipedia/index.html", "Wikipedia leftover"),
    ("sites/google/index.html", "Google leftover"),
    ("sites/facebook/index.html", "Facebook leftover"),
    ("sites/amazon/index.html", "Amazon leftover"),
    ("sites/twitter/index.html", "Twitter leftover"),
    ("sites/reddit/index.html", "Reddit leftover"),
    ("sites/netflix/index.html", "Netflix leftover"),
    ("sites/yahoo/index.html", "Yahoo leftover"),
    ("sites/bing/index.html", "Bing leftover"),
    ("sites/msn/index.html", "MSN leftover"),
    ("sites/bbc/index.html", "BBC leftover"),
    ("sites/ebay/index.html", "eBay leftover"),
    ("sites/linkedin/index.html", "LinkedIn leftover"),
    ("sites/pinterest/index.html", "Pinterest leftover"),
    ("sites/twitch/index.html", "Twitch leftover"),
    ("sites/spotify/index.html", "Spotify leftover"),
    ("sites/snapchat/index.html", "Snapchat leftover"),
    ("sites/tumblr/index.html", "Tumblr leftover"),
    ("sites/paypal/index.html", "PayPal leftover"),
    ("sites/imdb/index.html", "IMDb leftover"),
    ("sites/nyt/index.html", "NYT leftover"),
    ("sites/cnn/index.html", "CNN leftover"),
    ("sites/apple/index.html", "Apple leftover"),
    ("sites/microsoft/index.html", "Microsoft leftover"),
    ("sites/discord/index.html", "Discord leftover"),
    ("sites/slack/index.html", "Slack leftover"),
    ("sites/fortnite/marshmello.html", "Marshmello leftover"),
    ("sites/ios13/index.html", "iOS 13 leftover"),
    ("sites/ipados/index.html", "iPadOS leftover"),
    ("sites/libra/index.html", "Libra leftover"),
    ("sites/cnil/index.html", "CNIL leftover"),
    ("sites/ftc/index.html", "FTC leftover"),
    ("sites/inbox/index.html", "Inbox leftover"),
    ("sites/gplus/index.html", "Google+ leftover"),
    ("sites/huawei/index.html", "Huawei leftover"),
    ("sites/edgerc/index.html", "Edge preview leftover"),
    ("sites/hidelikes/index.html", "Hide likes leftover"),
    ("sites/applecard/index.html", "Apple Card leftover"),
    ("sites/oculusquest/index.html", "Quest leftover"),
    ("sites/fortnitewc/index.html", "Fortnite WC leftover"),
    ("sites/wework/index.html", "WeWork leftover"),
    ("sites/area51/index.html", "Area 51 leftover"),
    ("sites/zoom10m/index.html", "Zoom 10M literacy"),
]

SIDE = {
    "sites/disneyplus/index.html": ("sites/disneyplus/home.html", "★ Continue watching"),
    "sites/disneyplus/about.html": ("sites/disneyplus/home.html", "★ Continue watching"),
    "sites/disneyplus/queue.html": ("sites/disneyplus/home.html", "★ Continue watching"),
    "sites/tiktok/create.html": ("sites/tiktok/index.html", "TikTok For You"),
    "sites/arcade/play.html": ("sites/arcade/index.html", "Apple Arcade"),
    "sites/appletv/watch.html": ("sites/appletv/index.html", "Apple TV+"),
    "sites/stadia/stream.html": ("sites/stadia/index.html", "Stadia"),
    "sites/airpodspro/pair.html": ("sites/airpodspro/index.html", "AirPods Pro"),
    "sites/iphone/about.html": ("sites/iphone/iphone11.html", "iPhone 11"),
    "sites/fortnite/index.html": ("sites/fortnite/marshmello.html", "Marshmello leftover"),
}

DUP = re.compile(
    r'<p class="crumb"><a href="([^"]+)">← Starting Point</a> · <a href="\1">Starting Point</a></p>'
)
DUP2 = re.compile(
    r'<p class="crumb"><a href="([^"]+)">Starting Point</a> · <a href="\1">Starting Point</a></p>'
)


def rel(src: str, dest: str) -> str:
    if dest.startswith("pages/"):
        if src.startswith("pages/"):
            return dest.split("/", 1)[1]
        return "../../" + dest
    if src.startswith("pages/"):
        return "../" + dest
    s_dir = str(Path(src).parent)
    d_dir = str(Path(dest).parent)
    if s_dir == d_dir:
        return Path(dest).name
    return "../" + dest[len("sites/") :]


def crumb_for(src: str) -> str:
    home = rel(src, "pages/home.html")
    if src in SIDE:
        back, lab = SIDE[src]
        return f'<p class="crumb"><a href="{rel(src, back)}">← {lab}</a> · <a href="{home}">Starting Point</a></p>'
    hrefs = [h for h, _ in HOPS]
    if src in hrefs:
        i = hrefs.index(src)
        if i == 0:
            return f'<p class="crumb"><a href="{home}">← Starting Point</a></p>'
        bh, bl = HOPS[i - 1]
        return f'<p class="crumb"><a href="{rel(src, bh)}">← {bl}</a> · <a href="{home}">Starting Point</a></p>'
    return f'<p class="crumb"><a href="{home}">← Starting Point</a></p>'


def placeholder_for(src: str) -> str:
    slug = Path(src).parent.name if src.startswith("sites/") else "leftover"
    return slug + " leftover"


def fix_file(path: Path) -> bool:
    src = str(path.relative_to(YEAR)).replace("\\", "/")
    if src.startswith("pages/") or src == "index.html":
        return False
    text = path.read_text()
    orig = text
    crumb = crumb_for(src)
    text, ncrumb = re.subn(r'<p class="crumb">.*?</p>', crumb, text, count=1)
    if ncrumb == 0:
        text = DUP.sub(crumb, text)
        text = DUP2.sub(crumb, text)
    ph = placeholder_for(src)
    text = text.replace('placeholder="2019 leftover"', f'placeholder="{ph}"')
    if text != orig:
        path.write_text(text)
        return True
    return False


def fix_game_css():
    p = YEAR / "sites/playable/game.html"
    t = p.read_text()
    if '<link rel="stylesheet" href="../../../../css/year-game-ui.css">' in t and t.find("year-game-ui.css") > t.find("<body"):
        t = t.replace(
            '<link rel="stylesheet" href="../../../../css/period-2019.css">\n',
            '<link rel="stylesheet" href="../../../../css/period-2019.css">\n'
            '<link rel="stylesheet" href="../../../../css/year-game-ui.css">\n',
        )
        t = t.replace(
            '<link rel="stylesheet" href="../../../../css/year-game-ui.css">\n<div class="itt-year-game',
            '<div class="itt-year-game',
        )
        p.write_text(t)
        return True
    return False


def main():
    n = 0
    for p in YEAR.rglob("*.html"):
        if fix_file(p):
            n += 1
    g = fix_game_css()
    print("updated", n, "game-css", g)


if __name__ == "__main__":
    main()
