#!/usr/bin/env python3
"""Rewrite leftover dest first-paint as product rooms (not Open leftover echo)."""
from pathlib import Path
import re

Y = Path(__file__).resolve().parents[1] / "years" / "2022" / "sites"

KIND = {
    "gmail": ("compose", "Compose", "Send leftover"),
    "outlook": ("compose", "New mail", "Send leftover"),
    "slack": ("compose", "Message #general", "Send leftover"),
    "teams": ("compose", "Type a message", "Send leftover"),
    "telegram": ("compose", "Message", "Send leftover"),
    "messenger": ("compose", "Message", "Send leftover"),
    "signal": ("compose", "Message", "Send leftover"),
    "discord": ("compose", "Message #general", "Send leftover"),
    "linkedin": ("compose", "Start a post", "Post leftover"),
    "github": ("compose", "Issue title", "Open leftover"),
    "gitlab": ("compose", "Issue title", "Open leftover"),
    "quora": ("compose", "Add question", "Ask leftover"),
    "stackoverflow": ("compose", "Ask a question", "Post leftover"),
    "medium": ("compose", "Title leftover", "Publish leftover"),
    "substack": ("compose", "Post leftover", "Publish leftover"),
    "wordpress": ("compose", "Post leftover", "Publish leftover"),
    "tumblr": ("compose", "Text leftover", "Post leftover"),
    "snapchat": ("compose", "Chat leftover", "Send leftover"),
    "whatsapp": ("compose", "Message leftover", "Send leftover"),
    "bluesky": ("compose", "What's up leftover", "Post leftover"),
    "meet": ("ride", "Meeting code", "Join leftover"),
    "skype": ("ride", "Call leftover", "Call leftover"),
    "zoom": ("ride", "Meeting leftover", "Join leftover"),
    "amazon": ("shop", "Search leftover", "Add leftover"),
    "ebay": ("shop", "Search leftover", "Bid leftover"),
    "etsy": ("shop", "Search leftover", "Add leftover"),
    "craigslist": ("shop", "Search leftover", "Open leftover"),
    "airbnb": ("stay", "Where leftover", "Search leftover"),
    "booking": ("stay", "Where leftover", "Search leftover"),
    "uber": ("ride", "Where to leftover", "Request leftover"),
    "lyft": ("ride", "Where to leftover", "Request leftover"),
    "doordash": ("shop", "Restaurant leftover", "Add leftover"),
    "paypal": ("pay", "Amount leftover", "Send leftover"),
    "venmo": ("pay", "Amount leftover", "Send leftover"),
    "cashapp": ("pay", "Amount leftover", "Send leftover"),
    "robinhood": ("pay", "Ticker leftover", "Order leftover"),
    "coinbase": ("pay", "Asset leftover", "Order leftover"),
    "binance": ("pay", "Asset leftover", "Order leftover"),
    "opensea": ("pay", "NFT leftover", "View leftover"),
    "google": ("search", "Search leftover", "Search leftover"),
    "bing": ("search", "Search leftover", "Search leftover"),
    "yahoo": ("search", "Search leftover", "Search leftover"),
    "duckduckgo": ("search", "Search leftover", "Search leftover"),
    "maps": ("search", "Search leftover", "Search leftover"),
    "wikipedia": ("search", "Search leftover", "Search leftover"),
    "archive": ("search", "Search leftover", "Search leftover"),
    "imdb": ("search", "Title leftover", "Search leftover"),
    "youtube": ("search", "Search leftover", "Search leftover"),
    "espn": ("search", "Team leftover", "Search leftover"),
    "yelp": ("search", "Place leftover", "Search leftover"),
    "weather": ("search", "City leftover", "Search leftover"),
    "netflix": ("watch", "Title leftover", "Play leftover"),
    "hulu": ("watch", "Title leftover", "Play leftover"),
    "disneyplus": ("watch", "Title leftover", "Play leftover"),
    "hbomax": ("watch", "Title leftover", "Play leftover"),
    "peacock": ("watch", "Title leftover", "Play leftover"),
    "twitch": ("watch", "Channel leftover", "Watch leftover"),
    "kick": ("watch", "Channel leftover", "Watch leftover"),
    "steam": ("play", "Game leftover", "Play leftover"),
    "epic": ("play", "Game leftover", "Play leftover"),
    "roblox": ("play", "Experience leftover", "Play leftover"),
    "spotify": ("play", "Track leftover", "Play leftover"),
    "bbc": ("news", "Topic leftover", "Open leftover"),
    "cnn": ("news", "Topic leftover", "Open leftover"),
    "nyt": ("news", "Topic leftover", "Open leftover"),
    "dropbox": ("files", "File leftover", "Open leftover"),
    "drive": ("files", "File leftover", "Open leftover"),
    "figma": ("files", "File leftover", "Open leftover"),
    "canva": ("files", "File leftover", "Open leftover"),
    "notion": ("files", "Page leftover", "Open leftover"),
    "openai": ("search", "Docs leftover", "Open leftover"),
    "chrome": ("search", "omnibox leftover", "Go leftover"),
    "edge": ("search", "omnibox leftover", "Go leftover"),
    "windows10": ("files", "Settings leftover", "Open leftover"),
    "apple": ("files", "iOS leftover", "Open leftover"),
    "pinterest": ("search", "Pin leftover", "Search leftover"),
    "reddit": ("search", "r/ leftover", "Open leftover"),
    "facebook": ("compose", "What's on your mind leftover", "Post leftover"),
    "instagram": ("compose", "Caption leftover", "Share leftover"),
    "reels": ("watch", "Reel leftover", "Play leftover"),
    "youtubeshorts": ("watch", "Short leftover", "Play leftover"),
    "patreon": ("pay", "Creator leftover", "Support leftover"),
    "duolingo": ("play", "Lesson leftover", "Start leftover"),
    "nft": ("pay", "Drop leftover", "View leftover"),
    "midjourney": ("compose", "Prompt leftover", "Imagine leftover"),
    "stablediffusion": ("compose", "Prompt leftover", "Generate leftover"),
    "layoffs": ("news", "Company leftover", "Open leftover"),
    "cohost": ("compose", "Post leftover", "Post leftover"),
    "substack": ("compose", "Post leftover", "Publish leftover"),
}


def room_html(slug, title):
    kind, ph, verb = KIND.get(slug, ("search", title + " leftover", "Open leftover"))
    return f'''<div class="y22-room" data-y22-kind="{kind}">
<p class="y22-room-label">{title} · 2022 leftover · not gold</p>
<p><input type="text" data-y22-q maxlength="80" placeholder="{ph}" aria-label="{title} leftover"></p>
<p><button type="button" data-y22-room-go>{verb}</button></p>
<div class="y22-result" data-y22-result></div>
</div>
'''


def main():
    n = 0
    for d in sorted(Y.iterdir()):
        if not d.is_dir():
            continue
        p = d / "index.html"
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8")
        if "data-official-key" in t:
            continue
        title_m = re.search(r"<h1>([^<]+)</h1>", t)
        title = title_m.group(1) if title_m else d.name
        room = room_html(d.name, title)
        # strip existing y22-room / g22-search / y22-grid first-paint rooms
        t = re.sub(r'<div class="y22-room[\s\S]*?</div>\s*', "", t, count=3)
        t = re.sub(r'<div data-g22-search>[\s\S]*?</div>\s*', "", t, count=1)
        t = re.sub(r'<div class="y22-room y22-grid">[\s\S]*?</div>\s*', "", t, count=1)
        m = re.search(r"(<h1>[^<]+</h1>\s*<p>[^<]*</p>\s*)", t)
        if not m:
            print("skip", d.name)
            continue
        t = t[: m.end()] + room + t[m.end() :]
        p.write_text(t, encoding="utf-8")
        n += 1
    print("skinned", n)


if __name__ == "__main__":
    main()
