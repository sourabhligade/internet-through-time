#!/usr/bin/env python3
"""S1–S2: backup 2015 clone, prune forest, write inventory, emit lean urlMap JSON."""
from __future__ import annotations

import json
import shutil
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2015"
BACKUP = Path("/tmp") / f"itt-2015-clone-backup-{date.today().isoformat()}"
NOTES = ROOT / "docs" / "references" / "2015" / "notes"
INVENTORY = NOTES / "CLONE-INVENTORY-2026-08-10.txt"
URLMAP_OUT = NOTES / "2015-lean-urlmap.json"

KEEP_DIRS = {
    "amp",
    "alibaba",
    "apple",
    "applemusic",
    "billion",
    "chrome",
    "discord",
    "echo",
    "edge",
    "facebook",
    "fblive",
    "fcc",
    "googlephotos",
    "heartbleed",
    "ie8",
    "instagram",
    "ios9",
    "iphone",
    "letsencrypt",
    "material",
    "meerkat",
    "messenger",
    "oculus",
    "peach",
    "periscope",
    "playable",
    "privacy",
    "reactnative",
    "snapchat",
    "spotify",
    "swift",
    "twitch",
    "twitter",
    "vine",
    "whatsapp",
    "windows10",
    "windows7",
    "youtube",
}

# CHIP residual 2014 rooms that e2e still asserts
CHIP = {
    "heartbleed",
    "twitch",
    "alibaba",
    "material",
    "billion",
    "vine",
    "instagram",
}

P0 = {
    "apple",
    "windows10",
    "edge",
    "chrome",
    "whatsapp",
    "periscope",
    "meerkat",
    "applemusic",
    "googlephotos",
    "ios9",
    "playable",
    "fblive",
}

DISPLAY = {
    "pages/home.html": ("http://home.microsoft.com/intl/web2015/", "2015 Starting Point — Watch ships · Win10 free · Periscope"),
    "pages/about.html": ("http://home.microsoft.com/intl/web2015/about.html", "About 2015"),
    "pages/map.html": ("http://museum.local/years/2015/map/", "2015 — UX flow map"),
    "pages/whats-new.html": ("http://museum.local/pages/whats-new.html", "What's New — 2015"),
    "pages/cool.html": ("http://museum.local/pages/cool.html", "What's Cool — 2015"),
    "pages/error/404.html": ("http://museum.local/pages/error/404.html", "Not Found"),
    "pages/error/unreachable.html": ("http://museum.local/pages/error/unreachable.html", "Unable to Locate Server"),
    "sites/apple/watch.html": ("http://www.apple.com/watch/", "Apple Watch — ships April 24, 2015"),
    "sites/windows10/index.html": ("http://www.microsoft.com/windows/windows-10/", "Windows 10 — free upgrade July 29, 2015"),
    "sites/edge/index.html": ("http://www.microsoft.com/windows/microsoft-edge/", "Microsoft Edge — EdgeHTML 2015"),
    "sites/chrome/index.html": ("https://www.google.com/chrome/", "Google Chrome — 2015 residual"),
    "sites/whatsapp/web.html": ("https://web.whatsapp.com/", "WhatsApp Web — January 21, 2015"),
    "sites/whatsapp/index.html": ("https://www.whatsapp.com/", "WhatsApp — 2014 deal residual"),
    "sites/periscope/index.html": ("https://www.periscope.tv/", "Periscope — Go LIVE"),
    "sites/meerkat/index.html": ("https://meerkatapp.co/", "Meerkat — SXSW 2015"),
    "sites/fblive/index.html": ("https://www.facebook.com/live", "Facebook Live — celebs only 2015"),
    "sites/applemusic/index.html": ("http://www.apple.com/music/", "Apple Music — June 30, 2015"),
    "sites/googlephotos/index.html": ("https://photos.google.com/", "Google Photos — unlimited HQ"),
    "sites/ios9/blockers.html": ("http://www.apple.com/ios/ios-9/", "iOS 9 Content Blockers"),
    "sites/discord/index.html": ("https://discordapp.com/", "Discord — May 13, 2015"),
    "sites/echo/index.html": ("http://www.amazon.com/echo", "Amazon Echo — $179.99 mass"),
    "sites/letsencrypt/index.html": ("https://letsencrypt.org/", "Let's Encrypt public beta"),
    "sites/swift/index.html": ("https://swift.org/", "Swift open source — Dec 3, 2015"),
    "sites/snapchat/discover.html": ("https://www.snapchat.com/discover", "Snapchat Discover — Jan 27, 2015"),
    "sites/snapchat/story.html": ("https://www.snapchat.com/", "Snapchat Stories — 2013 residual"),
    "sites/playable/index.html": ("http://museum.local/years/2015/playable/", "2015 playables"),
    "sites/playable/game.html": ("http://museum.local/years/2015/playable/game.html", "Blob Rush"),
    "sites/youtube/red.html": ("https://www.youtube.com/red", "YouTube Red — Oct 28, 2015"),
    "sites/facebook/instant.html": ("https://www.facebook.com/instantarticles", "Instant Articles — May 2015"),
    "sites/twitter/moments.html": ("https://twitter.com/i/moments", "Twitter Moments — Oct 6, 2015"),
    "sites/fcc/index.html": ("https://www.fcc.gov/openinternet", "Title II / Open Internet — Feb 26, 2015"),
    "sites/amp/index.html": ("https://www.ampproject.org/", "AMP Project announce — Oct 7, 2015"),
    "sites/spotify/index.html": ("https://www.spotify.com/", "Spotify — 2015 residual"),
}


def main() -> None:
    NOTES.mkdir(parents=True, exist_ok=True)
    sites = YEAR / "sites"
    before = sorted(p.name for p in sites.iterdir() if p.is_dir())
    if not BACKUP.exists():
        print(f"backup → {BACKUP}")
        shutil.copytree(YEAR, BACKUP)
    else:
        print(f"backup already exists: {BACKUP}")

    kill = [d for d in before if d not in KEEP_DIRS]
    keep = [d for d in before if d in KEEP_DIRS]
    for name in kill:
        shutil.rmtree(sites / name)
        print(f"KILL {name}")

    after = sorted(p.name for p in sites.iterdir() if p.is_dir())
    html = list(YEAR.rglob("*.html")) + list(YEAR.rglob("*.htm"))
    lines = [
        "2015 clone inventory + prune",
        f"date: {date.today().isoformat()}",
        f"backup: {BACKUP}",
        f"before dirs: {len(before)}",
        f"after dirs: {len(after)}",
        f"html now: {len(html)}",
        "",
        "KEEP P0: " + ", ".join(sorted(P0)),
        "KEEP CHIP/residual: " + ", ".join(sorted(CHIP)),
        "KEEP all: " + ", ".join(after),
        "",
        "KILLED: " + ", ".join(kill),
    ]
    INVENTORY.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(INVENTORY)

    urlmap = {}
    titlemap = {}
    for p in sorted(html):
        rel = str(p.relative_to(YEAR)).replace("\\", "/")
        if rel == "index.html":
            continue
        url, title = DISPLAY.get(
            rel,
            (f"http://museum.local/years/2015/{rel.replace('index.html', '')}", Path(rel).stem.replace("-", " ").title()),
        )
        urlmap[rel] = url
        titlemap[rel] = title

    URLMAP_OUT.write_text(
        json.dumps({"urlMap": urlmap, "titleMap": titlemap}, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"urlMap keys: {len(urlmap)}  html: {len(html)}")


if __name__ == "__main__":
    main()
