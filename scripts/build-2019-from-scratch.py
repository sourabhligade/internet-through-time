#!/usr/bin/env python3
"""Build years/2019/ from the 2019 implementer map + leftover 312 book.

Clone shape = live 2017 door (55 dests · leftover-official 312 · playable 20).
Content is 2019-true. Official whenKeys stay on extras / official-verb only.
Leftover plaques use book suffixes and never stamp official 10.
"""
from __future__ import annotations

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YEAR = ROOT / "years" / "2019"
BOOK = ROOT / "docs" / "nostalgia-5k-every-flow" / "2019.md"

OFFICIAL = {
    "disneyplus": "itt19-disneyplus",
    "tiktok": "itt19-tiktok",
    "arcade": "itt19-arcade",
    "appletv": "itt19-appletv",
    "stadia": "itt19-stadia",
    "iphone11": "itt19-iphone11",
    "airpods-pro": "itt19-airpods-pro",
    "chrome": "itt19-chrome",
    "win10": "itt19-win10",
    "game-continuerow": "itt19-game-continuerow",
}

# dest-name hops inside the 55-folder list
HOPS = [
    ("disneyplus/home.html", "★ Disney+ Continue"),
    ("tiktok/index.html", "TikTok For You"),
    ("arcade/index.html", "Apple Arcade"),
    ("appletv/index.html", "Apple TV+"),
    ("stadia/index.html", "Stadia Founder's"),
    ("iphone/iphone11.html", "iPhone 11"),
    ("airpodspro/index.html", "AirPods Pro"),
    ("chrome/index.html", "Chrome habit"),
    ("windows10/index.html", "Win10 residual"),
    ("playable/game.html", "Continue Row"),
    ("youtube/index.html", "YouTube leftover"),
    ("instagram/index.html", "Instagram leftover"),
    ("wikipedia/index.html", "Wikipedia leftover"),
    ("google/index.html", "Google leftover"),
    ("facebook/index.html", "Facebook leftover"),
    ("amazon/index.html", "Amazon leftover"),
    ("twitter/index.html", "Twitter leftover"),
    ("reddit/index.html", "Reddit leftover"),
    ("netflix/index.html", "Netflix leftover"),
    ("yahoo/index.html", "Yahoo leftover"),
    ("bing/index.html", "Bing leftover"),
    ("msn/index.html", "MSN leftover"),
    ("bbc/index.html", "BBC leftover"),
    ("ebay/index.html", "eBay leftover"),
    ("linkedin/index.html", "LinkedIn leftover"),
    ("pinterest/index.html", "Pinterest leftover"),
    ("twitch/index.html", "Twitch leftover"),
    ("spotify/index.html", "Spotify leftover"),
    ("snapchat/index.html", "Snapchat leftover"),
    ("tumblr/index.html", "Tumblr leftover"),
    ("paypal/index.html", "PayPal leftover"),
    ("imdb/index.html", "IMDb leftover"),
    ("nyt/index.html", "NYT leftover"),
    ("cnn/index.html", "CNN leftover"),
    ("apple/index.html", "Apple leftover"),
    ("microsoft/index.html", "Microsoft leftover"),
    ("discord/index.html", "Discord leftover"),
    ("slack/index.html", "Slack leftover"),
    ("fortnite/marshmello.html", "Marshmello leftover"),
    ("ios13/index.html", "iOS 13 leftover"),
    ("ipados/index.html", "iPadOS leftover"),
    ("libra/index.html", "Libra leftover"),
    ("cnil/index.html", "CNIL leftover"),
    ("ftc/index.html", "FTC leftover"),
    ("inbox/index.html", "Inbox leftover"),
    ("gplus/index.html", "Google+ leftover"),
    ("huawei/index.html", "Huawei leftover"),
    ("edgerc/index.html", "Edge preview leftover"),
    ("hidelikes/index.html", "Hide likes leftover"),
    ("applecard/index.html", "Apple Card leftover"),
    ("oculusquest/index.html", "Quest leftover"),
    ("fortnitewc/index.html", "Fortnite WC leftover"),
    ("wework/index.html", "WeWork leftover"),
    ("area51/index.html", "Area 51 leftover"),
    ("zoom10m/index.html", "Zoom 10M literacy"),
]

DEST = {
    "disneyplus/home.html": {
        "title": "Disney+ Continue — 12 Nov 2019",
        "h1": "Disney+ · Continue watching",
        "body": (
            "<p>12 Nov 2019. United States / Canada / Netherlands. "
            "<b>$6.99 / month</b> or <b>$69.99 / year</b>. "
            "Disney 2019 press names <b>customizable profiles (up to 7, including Kids)</b>. "
            "Kevin Mayer (19 Nov) named a home-screen row that “says continue watching,” "
            "taken down at launch, back the next week. "
            "“10 million” on 13 Nov is <b>sign-ups</b>, not paid (26.5M paid as of 28 Dec).</p>"
            "<p>A weeklong trial is contemporaneous press, not a Disney-primary “7-day” string. "
            "The trial click never writes. Continue is the save.</p>"
        ),
        "trap": "Start weeklong trial (trap)",
        "keep": "Continue leftover",
        "wrong": "Trial as gold (trap)",
        "h1a": "Disney+ Continue is the star. This plaque is leftover.",
        "h1b": "Trap / empty / 0 ticks never write.",
        "next": ("tiktok/index.html", "TikTok For You"),
        "official": "itt19-disneyplus",
    },
    "disneyplus/index.html": {
        "title": "Disney+ join — trial is the trap",
        "h1": "Disney+ · join",
        "body": (
            "<p>Join page. The weeklong trial is the trap. "
            "The star lives on <a href=\"home.html\">Continue watching</a>. "
            "This room never writes <code>itt19-disneyplus</code>.</p>"
        ),
        "trap": "Start weeklong trial (trap)",
        "keep": "Join leftover literacy",
        "wrong": "Trial as gold (trap)",
        "h1a": "Continue watching is the star. Join leftover never stamps it.",
        "h1b": "Trap / empty never writes.",
        "next": ("disneyplus/home.html", "★ Continue watching"),
    },
    "disneyplus/about.html": {
        "title": "Disney+ literacy — 2019",
        "h1": "Disney+ · literacy",
        "body": (
            "<p>Launch 12 Nov. $6.99 / $69.99. Profiles up to 7 including Kids. "
            "Do not quote “Who’s watching” as a 2019 Disney press verb. "
            "No Mickey / Grogu / Marvel pixels on this museum door.</p>"
        ),
        "trap": "Quote Who’s watching as press (trap)",
        "keep": "Literacy leftover",
        "wrong": "Press quote (trap)",
        "h1a": "Literacy leftover. Not the chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("disneyplus/home.html", "★ Continue watching"),
    },
    "disneyplus/queue.html": {
        "title": "Disney+ queue leftover — 2019",
        "h1": "Disney+ · queue leftover",
        "body": (
            "<p>Launch demand leftover. The Continue row is the star room. "
            "This queue plaque is leftover literacy only.</p>"
        ),
        "trap": "Skip the line as gold (trap)",
        "keep": "Queue leftover",
        "wrong": "Skip as gold (trap)",
        "h1a": "Queue leftover. Continue is the star.",
        "h1b": "Trap / empty never writes.",
        "next": ("disneyplus/home.html", "★ Continue watching"),
    },
    "tiktok/index.html": {
        "title": "TikTok For You — 2019 US mass",
        "h1": "TikTok · For You leftover",
        "body": (
            "<p>The ByteDance / musical.ly merge was <b>2 Aug 2018</b>. "
            "2019 is the US pop-culture year. COPPA: announced 27 Feb 2019, "
            "order entered 27 Mar · <b>$5.7 million</b>. "
            "Caption ≥2 and two posts write <code>itt19-tiktok</code>. "
            "Empty caption never writes. Merge-as-gold never writes.</p>"
        ),
        "trap": "2018 merge as gold (trap)",
        "keep": "FYP leftover",
        "wrong": "Merge as gold (trap)",
        "h1a": "2019 US mass leftover. Merge was 2018. Not the chip.",
        "h1b": "Trap / empty / 0 ticks never write.",
        "next": ("arcade/index.html", "Apple Arcade"),
        "official": "itt19-tiktok",
    },
    "tiktok/create.html": {
        "title": "TikTok create leftover — 2019",
        "h1": "TikTok · create leftover",
        "body": "<p>Create leftover. The official For You save is on the index room.</p>",
        "trap": "Merge as gold (trap)",
        "keep": "Create leftover",
        "wrong": "Merge as gold (trap)",
        "h1a": "Create leftover. Not the chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("tiktok/index.html", "TikTok For You"),
    },
    "arcade/index.html": {
        "title": "Apple Arcade — 19 Sep 2019",
        "h1": "Apple Arcade · $4.99",
        "body": (
            "<p>Newsroom 10 Sep. Live <b>19 Sep 2019</b>. "
            "<b>$4.99 / month</b>. Apple wording: <b>no ads or additional in-game purchases</b>. "
            "Family Sharing 6. Pick a title and Play leftover. "
            "No pick / IAP costume never writes.</p>"
        ),
        "trap": "Buy IAP (trap)",
        "keep": "Arcade leftover",
        "wrong": "IAP (trap)",
        "h1a": "Arcade leftover. $4.99. Not Disney+.",
        "h1b": "Trap / empty / no pick never write.",
        "next": ("appletv/index.html", "Apple TV+"),
        "official": "itt19-arcade",
    },
    "arcade/play.html": {
        "title": "Arcade play leftover — 2019",
        "h1": "Apple Arcade · play leftover",
        "body": "<p>Play leftover. Official pick+Play lives on the index room.</p>",
        "trap": "IAP (trap)",
        "keep": "Play leftover",
        "wrong": "IAP (trap)",
        "h1a": "Play leftover. Not the chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("arcade/index.html", "Apple Arcade"),
    },
    "appletv/index.html": {
        "title": "Apple TV+ — 1 Nov 2019",
        "h1": "Apple TV+ · $4.99",
        "body": (
            "<p>1 Nov 2019. <b>$4.99 / month</b>. "
            "One year free on new hardware from the 10 Sep event. "
            "Pick an original and Watch leftover. No original never writes.</p>"
        ),
        "trap": "2018 iTunes rental as gold (trap)",
        "keep": "TV+ leftover",
        "wrong": "iTunes as gold (trap)",
        "h1a": "TV+ leftover. $4.99. Not Disney+.",
        "h1b": "Trap / empty / no pick never write.",
        "next": ("stadia/index.html", "Stadia"),
        "official": "itt19-appletv",
    },
    "appletv/watch.html": {
        "title": "TV+ watch leftover — 2019",
        "h1": "Apple TV+ · watch leftover",
        "body": "<p>Watch leftover. Official pick+Watch lives on the index room.</p>",
        "trap": "iTunes as gold (trap)",
        "keep": "Watch leftover",
        "wrong": "iTunes as gold (trap)",
        "h1a": "Watch leftover. Not the chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("appletv/index.html", "Apple TV+"),
    },
    "stadia/index.html": {
        "title": "Stadia Founder's — 19 Nov 2019",
        "h1": "Stadia · Founder's Edition",
        "body": (
            "<p>19 Nov 2019. <b>9 a.m. PST</b>. Founder's <b>$129.99</b>. "
            "Night Blue controller + Chromecast Ultra + 3 months Pro. "
            "14 countries. 2023 shutdown copy never writes. Pick Founder's and Claim.</p>"
        ),
        "trap": "2023 shutdown as gold (trap)",
        "keep": "Founder's leftover",
        "wrong": "Shutdown (trap)",
        "h1a": "Founder's leftover. $129.99 Night Blue. Not the chip.",
        "h1b": "Trap / empty / no box never write.",
        "next": ("iphone/iphone11.html", "iPhone 11"),
        "official": "itt19-stadia",
    },
    "stadia/stream.html": {
        "title": "Stadia stream leftover — 2019",
        "h1": "Stadia · stream leftover",
        "body": "<p>Stream leftover. Official Founder's claim lives on the index room. No live stream here.</p>",
        "trap": "2023 shutdown (trap)",
        "keep": "Stream leftover",
        "wrong": "Shutdown (trap)",
        "h1a": "Stream leftover. Not the chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("stadia/index.html", "Stadia"),
    },
    "iphone/iphone11.html": {
        "title": "iPhone 11 — stores 20 Sep 2019",
        "h1": "iPhone 11 · stores 20 Sep",
        "body": (
            "<p>Keynote 10 Sep. Stores <b>20 Sep 2019</b>. From <b>$699</b>. Dual camera. "
            "Face ID is <b>2017</b> — treating it as new never writes. "
            "Pick a color + both honesty ticks.</p>"
        ),
        "trap": "Face ID as new (trap)",
        "keep": "iPhone 11 leftover",
        "wrong": "Face ID as new (trap)",
        "h1a": "iPhone 11 leftover. Face ID is 2017.",
        "h1b": "Trap / empty / no color never write.",
        "next": ("airpodspro/index.html", "AirPods Pro"),
        "official": "itt19-iphone11",
    },
    "airpodspro/index.html": {
        "title": "AirPods Pro — $249 · 30 Oct 2019",
        "h1": "AirPods Pro · $249",
        "body": (
            "<p>Announce 28 Oct. Stores <b>30 Oct 2019</b>. <b>$249</b>. Active Noise Cancellation. "
            "Two honesty ticks + Pair. 0–1 tick never writes.</p>"
        ),
        "trap": "2016 AirPods as new (trap)",
        "keep": "AirPods Pro leftover",
        "wrong": "2016 as new (trap)",
        "h1a": "AirPods Pro leftover. $249 ANC. Not the chip.",
        "h1b": "Trap / empty / 0–1 tick never write.",
        "next": ("chrome/index.html", "Chrome habit"),
        "official": "itt19-airpods-pro",
    },
    "airpodspro/pair.html": {
        "title": "AirPods Pro pair leftover — 2019",
        "h1": "AirPods Pro · pair leftover",
        "body": "<p>Pair leftover. Official two-tick Pair lives on the index room.</p>",
        "trap": "2016 AirPods as new (trap)",
        "keep": "ANC leftover",
        "wrong": "2016 as new (trap)",
        "h1a": "ANC leftover. Not the chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("airpodspro/index.html", "AirPods Pro"),
    },
    "chrome/index.html": {
        "title": "Chrome habit — 2019",
        "h1": "Chrome habit leftover",
        "body": (
            "<p>Chrome is already the habit. Chromium Edge is a <b>2019 preview</b> "
            "(ships as default 15 Jan <b>2020</b>). Making Edge the default never writes.</p>"
        ),
        "trap": "Make Edge default (trap)",
        "keep": "Chrome habit leftover",
        "wrong": "Edge default (trap)",
        "h1a": "Chrome habit leftover. Edge default is 2020.",
        "h1b": "Trap / empty / 0–1 tick never write.",
        "next": ("windows10/index.html", "Win10 residual"),
        "official": "itt19-chrome",
    },
    "windows10/index.html": {
        "title": "Windows 10 residual — 2019",
        "h1": "Windows 10 · still mass",
        "body": (
            "<p>Free upgrade ended <b>29 Jul 2016</b>. Win10 is still the mass desktop. "
            "Win11 costume never writes. “Free upgrade still on” never writes.</p>"
        ),
        "trap": "Get Windows 11 (trap)",
        "keep": "Win10 residual leftover",
        "wrong": "Win11 (trap)",
        "h1a": "Win10 residual. Free upgrade ended 2016.",
        "h1b": "Trap / empty / 0–1 tick never write.",
        "next": ("playable/game.html", "Continue Row"),
        "official": "itt19-win10",
    },
    "playable/game.html": {
        "title": "Continue Row — 2019",
        "h1": "Continue Row",
        "body": "",
        "trap": "Start trial / Consent Dash (trap)",
        "keep": "Continue Row leftover",
        "wrong": "Trial as gold (trap)",
        "h1a": "Continue Row leftover. Not the Disney+ chip.",
        "h1b": "Trap / empty never writes.",
        "next": ("disneyplus/home.html", "★ Disney+ Continue"),
        "official": "itt19-game-continuerow",
    },
}

# leftover / mass / calendar dests
MASS = {
    "youtube/index.html": (
        "YouTube leftover — 2019",
        "YouTube · leftover",
        "<p>SimilarWeb June 2019 mass #1 class. YouTube COPPA / kids leftover is 2019 weather. "
        "Not the chip. Watch leftover. Empty never writes.</p>",
        "Reels as gold (trap)",
        "Watch leftover",
        "Disney+ is the star. YouTube is leftover.",
    ),
    "instagram/index.html": (
        "Instagram leftover — 2019",
        "Instagram · leftover",
        "<p>Hide-likes test class (Jul 2019). Reels are <b>2020</b>. Not the chip.</p>",
        "Reels as gold (trap)",
        "Feed leftover",
        "Hide-likes leftover. Reels are 2020.",
    ),
    "wikipedia/index.html": (
        "Wikipedia leftover — 2019",
        "Wikipedia · leftover",
        "<p>Encyclopedia leftover. SimilarWeb June 2019 mass. Not the chip.</p>",
        "Star as encyclopedia (trap)",
        "Read leftover",
        "Encyclopedia leftover. Not the chip.",
    ),
    "google/index.html": (
        "Google leftover — 2019",
        "Google · leftover",
        "<p>Search leftover. Chrome habit is a different official dest. Empty query never writes.</p>",
        "Lucky as gold (trap)",
        "Search leftover",
        "Search leftover. Not the chip.",
    ),
    "facebook/index.html": (
        "Facebook leftover — 2019",
        "Facebook · News Feed leftover",
        "<p>News Feed leftover. FTC $5B is 24 Jul 2019 leftover (its own dest). "
        "Like is 2009 gold. Meta is later. Not the chip.</p>",
        "Like as 2019 gold (trap)",
        "Feed leftover",
        "News Feed leftover. Not Like gold. Not Meta.",
    ),
    "amazon/index.html": (
        "Amazon leftover — 2019",
        "Amazon · leftover",
        "<p>Smile leftover. Prime / cart leftover. Not the chip.</p>",
        "1-Click as gold (trap)",
        "Cart leftover",
        "Amazon leftover. Not the chip.",
    ),
    "twitter/index.html": (
        "Twitter leftover — 2019",
        "Twitter · 280 leftover",
        "<p>280 is <b>2017</b> gold last year. 2019 is leftover. Dest still says Twitter. X is 2023.</p>",
        "280 as 2019 gold (trap)",
        "Tweet leftover",
        "280 leftover. Not 2017 gold again.",
    ),
    "reddit/index.html": (
        "Reddit leftover — 2019",
        "Reddit · leftover",
        "<p>Front leftover. Not the chip.</p>",
        "Star as front (trap)",
        "Front leftover",
        "Front leftover. Not the chip.",
    ),
    "netflix/index.html": (
        "Netflix leftover — 2019",
        "Netflix · Stranger Things S3 leftover",
        "<p>Stranger Things S3 (Jul 2019) leftover. Disney+ is the chip. Netflix is not.</p>",
        "Netflix as 2019 chip (trap)",
        "S3 leftover",
        "Netflix leftover. Disney+ is the star.",
    ),
    "yahoo/index.html": (
        "Yahoo leftover — 2019",
        "Yahoo · portal leftover",
        "<p>Portal leftover. Still there after Google. Not the chip.</p>",
        "Portal as gold (trap)",
        "Portal leftover",
        "Portal leftover. Not the chip.",
    ),
    "bing/index.html": (
        "Bing leftover — 2019",
        "Bing · leftover",
        "<p>Search leftover. Edge preview is a different dest.</p>",
        "Bing as default gold (trap)",
        "Search leftover",
        "Bing leftover. Not the chip.",
    ),
    "msn/index.html": (
        "MSN leftover — 2019",
        "MSN · leftover",
        "<p>Portal leftover on Win10 mass. Not the chip.</p>",
        "MSN as gold (trap)",
        "Portal leftover",
        "MSN leftover. Not the chip.",
    ),
    "bbc/index.html": (
        "BBC leftover — 2019",
        "BBC · leftover",
        "<p>News leftover. Not the chip.</p>",
        "BBC as gold (trap)",
        "Story leftover",
        "News leftover. Not the chip.",
    ),
    "ebay/index.html": (
        "eBay leftover — 2019",
        "eBay · leftover",
        "<p>Bid leftover. Not the chip.</p>",
        "Buy It Now as gold (trap)",
        "Bid leftover",
        "eBay leftover. Not the chip.",
    ),
    "linkedin/index.html": (
        "LinkedIn leftover — 2019",
        "LinkedIn · leftover",
        "<p>Invite leftover. Microsoft-owned leftover. Not the chip.</p>",
        "Invite as gold (trap)",
        "Invite leftover",
        "LinkedIn leftover. Not the chip.",
    ),
    "pinterest/index.html": (
        "Pinterest leftover — 2019",
        "Pinterest · leftover",
        "<p>Pin leftover. Not the chip.</p>",
        "Pin as gold (trap)",
        "Pin leftover",
        "Pinterest leftover. Not the chip.",
    ),
    "twitch/index.html": (
        "Twitch leftover — 2019",
        "Twitch · leftover",
        "<p>Watch leftover. Fortnite WC / Marshmello are different dests.</p>",
        "Live as gold (trap)",
        "Watch leftover",
        "Twitch leftover. Not the chip.",
    ),
    "spotify/index.html": (
        "Spotify leftover — 2019",
        "Spotify · leftover",
        "<p>Play leftover. Not the chip.</p>",
        "Free tier as gold (trap)",
        "Play leftover",
        "Spotify leftover. Not the chip.",
    ),
    "snapchat/index.html": (
        "Snapchat leftover — 2019",
        "Snapchat · leftover",
        "<p>Snap leftover. Stories were 2013. Instagram hide-likes is a different dest.</p>",
        "Stories as 2019 gold (trap)",
        "Snap leftover",
        "Snap leftover. Not the chip.",
    ),
    "tumblr/index.html": (
        "Tumblr leftover — 2019",
        "Tumblr · leftover",
        "<p>Post leftover. Verizon / Automattic weather. Not the chip.</p>",
        "Post as gold (trap)",
        "Post leftover",
        "Tumblr leftover. Not the chip.",
    ),
    "paypal/index.html": (
        "PayPal leftover — 2019",
        "PayPal · leftover",
        "<p>Send leftover. Not the chip. Not Libra.</p>",
        "Libra as PayPal (trap)",
        "Send leftover",
        "PayPal leftover. Libra is a different dest.",
    ),
    "imdb/index.html": (
        "IMDb leftover — 2019",
        "IMDb · leftover",
        "<p>Title leftover. Amazon-owned leftover. Not Disney+.</p>",
        "Title as gold (trap)",
        "Title leftover",
        "IMDb leftover. Not the chip.",
    ),
    "nyt/index.html": (
        "NYT leftover — 2019",
        "NYT · leftover",
        "<p>Story leftover. Not the chip.</p>",
        "Paywall as gold (trap)",
        "Story leftover",
        "NYT leftover. Not the chip.",
    ),
    "cnn/index.html": (
        "CNN leftover — 2019",
        "CNN · leftover",
        "<p>Story leftover. Not the chip.</p>",
        "Breaking as gold (trap)",
        "Story leftover",
        "CNN leftover. Not the chip.",
    ),
    "apple/index.html": (
        "Apple leftover — 2019",
        "Apple · leftover",
        "<p>About leftover. Arcade / TV+ / iPhone 11 / AirPods Pro are their own dests.</p>",
        "Apple.com as gold (trap)",
        "About leftover",
        "Apple leftover. Product dests hold the official keys.",
    ),
    "microsoft/index.html": (
        "Microsoft leftover — 2019",
        "Microsoft · leftover",
        "<p>About leftover. Edge preview and Win10 residual are their own dests.</p>",
        "Edge as default gold (trap)",
        "About leftover",
        "Microsoft leftover. Edge default is 2020.",
    ),
    "discord/index.html": (
        "Discord leftover — 2019",
        "Discord · leftover",
        "<p>Join leftover. Not the chip.</p>",
        "Join as gold (trap)",
        "Join leftover",
        "Discord leftover. Not the chip.",
    ),
    "slack/index.html": (
        "Slack leftover — 2019",
        "Slack · leftover",
        "<p>Workspace leftover. Slack IPO is 20 Jun 2019 leftover weather. Not the chip.</p>",
        "IPO as gold (trap)",
        "Workspace leftover",
        "Slack leftover. Not the chip.",
    ),
    "fortnite/marshmello.html": {
        "title": "Marshmello leftover — 2 Feb 2019",
        "h1": "Fortnite · Marshmello leftover",
        "body": (
            "<p>2 Feb 2019. Epic via press: <b>10.7 million peak concurrent</b> — "
            "not unique attendees. Not Travis Scott (2020). Not the chip. "
            "Two honesty ticks + ack write leftover <code>itt19-marshmello</code>.</p>"
        ),
        "trap": "Travis Scott as 2019 (trap)",
        "keep": "In-game leftover",
        "wrong": "Travis (trap)",
        "h1a": "Marshmello leftover. 10.7M peak concurrent. Not unique attendees.",
        "h1b": "Trap / empty / 0–1 tick never write.",
        "next": ("fortnitewc/index.html", "Fortnite WC leftover"),
    },
    "ios13/index.html": (
        "iOS 13 leftover — 2019",
        "iOS 13 · Dark Mode leftover",
        "<p>WWDC 3 Jun. Ships 19 Sep. Dark Mode leftover. Not a new phone. iPhone 11 is a different dest.</p>",
        "iPhone 11 as this dest (trap)",
        "Dark Mode leftover",
        "Dark Mode leftover. Not the chip.",
    ),
    "ipados/index.html": (
        "iPadOS leftover — 2019",
        "iPadOS · leftover",
        "<p>WWDC 2019 names iPadOS. Ships 30 Sep. Home screen leftover. Not iOS 13 the phone.</p>",
        "iPhone as iPadOS (trap)",
        "iPadOS leftover",
        "iPadOS leftover. Not the chip.",
    ),
    "libra/index.html": (
        "Libra leftover — 18 Jun 2019",
        "Libra · leftover",
        "<p>18 Jun 2019. Facebook publishes the Libra white paper. Calibra is the wallet name. "
        "Announce leftover, not a coin you hold. Diem rename is later.</p>",
        "Hold Libra (trap)",
        "White paper leftover",
        "Libra leftover. Not a coin you hold.",
    ),
    "cnil/index.html": (
        "CNIL leftover — 21 Jan 2019",
        "CNIL · €50M leftover",
        "<p>21 Jan 2019. CNIL fines Google <b>€50 million</b> under GDPR. "
        "Last year’s banner is still the 2018 star. This is the leftover fine.</p>",
        "GDPR Manage as 2019 gold (trap)",
        "Fine leftover",
        "CNIL leftover. GDPR Manage is 2018.",
    ),
    "ftc/index.html": (
        "FTC leftover — 24 Jul 2019",
        "FTC · $5B leftover",
        "<p>24 Jul 2019. FTC imposes a <b>$5 billion</b> penalty and new privacy restrictions on Facebook. "
        "2018 hearing stays in 2018. Not a Cambridge room.</p>",
        "2018 hearing as gold (trap)",
        "$5B leftover",
        "FTC leftover. Not the chip.",
    ),
    "inbox/index.html": (
        "Inbox leftover — 2 Apr 2019",
        "Inbox by Gmail · off",
        "<p>2 Apr 2019. Inbox by Gmail turns off (announced 2018). Bundles go back to Gmail. Not a new mail star.</p>",
        "Inbox as new mail gold (trap)",
        "Off leftover",
        "Inbox off leftover. Not a new star.",
    ),
    "gplus/index.html": (
        "Google+ leftover — 2 Apr 2019",
        "Google+ · consumer dies",
        "<p>Consumer Google+ dies 2 Apr 2019 (announced 2018). Funeral leftover. Not a new network.</p>",
        "G+ as 2019 gold (trap)",
        "Funeral leftover",
        "G+ dies leftover. Gold was 2011.",
    ),
    "huawei/index.html": (
        "Huawei leftover — 2019",
        "Huawei · Entity List leftover",
        "<p>May 2019 Entity List / GMS leftover. Not a new phone dest. Not the chip.</p>",
        "New phone as gold (trap)",
        "GMS leftover",
        "Huawei leftover. Not the chip.",
    ),
    "edgerc/index.html": {
        "title": "Chromium Edge preview — 2019",
        "h1": "Edge · 2019 preview leftover",
        "body": (
            "<p>Chromium Edge is a <b>2019 preview</b>. Default browser ships <b>15 Jan 2020</b>. "
            "Making Edge the default never writes. Pick the preview leftover.</p>"
        ),
        "trap": "Set as default (trap)",
        "keep": "Preview leftover",
        "wrong": "Default (trap)",
        "h1a": "Preview leftover. Default is 15 Jan 2020.",
        "h1b": "Trap / empty / 0–1 tick never write.",
        "next": ("chrome/index.html", "Chrome habit"),
    },
    "hidelikes/index.html": (
        "Hide likes leftover — 2019",
        "Instagram · hide likes leftover",
        "<p>Jul 2019 hide-likes test class. Not Reels. Not the chip.</p>",
        "Reels as gold (trap)",
        "Hide leftover",
        "Hide likes leftover. Reels are 2020.",
    ),
    "applecard/index.html": (
        "Apple Card leftover — 2019",
        "Apple Card · leftover",
        "<p>Apple Card leftover (Aug 2019 class). Not Arcade. Not the chip.</p>",
        "Card as gold (trap)",
        "Card leftover",
        "Apple Card leftover. Not the chip.",
    ),
    "oculusquest/index.html": (
        "Oculus Quest leftover — 21 May 2019",
        "Oculus Quest · leftover",
        "<p>Quest ships 21 May 2019. Standalone leftover. Not 2018 Go. Not 2020 Quest 2. Not Disney+.</p>",
        "Quest 2 as 2019 (trap)",
        "Quest leftover",
        "Quest leftover. Not Quest 2.",
    ),
    "fortnitewc/index.html": (
        "Fortnite World Cup leftover — Jul 2019",
        "Fortnite World Cup · leftover",
        "<p>July 2019 World Cup leftover. Marshmello is 2 Feb. Not the chip. Not Travis.</p>",
        "Travis as WC (trap)",
        "Cup leftover",
        "World Cup leftover. Not the chip.",
    ),
    "wework/index.html": (
        "WeWork leftover — 2019",
        "WeWork · IPO collapse leftover",
        "<p>WeWork IPO collapse leftover. Not a product star. Literacy only.</p>",
        "IPO as gold (trap)",
        "Collapse leftover",
        "WeWork leftover. Not the chip.",
    ),
    "area51/index.html": (
        "Area 51 leftover — 2019",
        "Area 51 · raid meme leftover",
        "<p>Raid meme leftover. Not a product star. Literacy only.</p>",
        "Raid as gold (trap)",
        "Meme leftover",
        "Area 51 leftover. Not the chip.",
    ),
    "zoom10m/index.html": {
        "title": "Zoom 10M literacy — Dec 2019",
        "h1": "Zoom · Dec 10M literacy",
        "body": (
            "<p>December 2019: Zoom literacy at a 10 million class. "
            "This is <b>not</b> 2020 mute → Leave gold. There is no mute control and no Leave gold here. "
            "Never write <code>itt20-zoom</code>.</p>"
        ),
        "trap": "Mute → Leave as 2019 gold (trap)",
        "keep": "10M literacy leftover",
        "wrong": "Mute/Leave (trap)",
        "h1a": "Dec 10M literacy only. Mute/Leave is 2020.",
        "h1b": "Trap / empty never writes. Never itt20-zoom.",
        "next": ("pages/about.html", "About 2019"),
    },
}

PLAYABLE_EXTRAS = {
    "playable/extra-a.html": ("Who’s watch", "whoswatch", "year-2019-whoswatch.js", "minute"),
    "playable/extra-b.html": ("Trial trap", "trialtrap", "year-2019-trialtrap.js", "minute"),
    "playable/extra-c.html": ("Row Extra", "rowextra", "year-2019-rowextra.js", "more"),
    "playable/extra-d.html": ("Stadia Wait", "stadiawait", "year-2019-stadiawait.js", "more"),
    "playable/extra-e.html": ("Arcade Card", "arcadecard", "year-2019-arcadecard.js", "more"),
    "playable/extra-f.html": ("Continue Two", "continue2", "year-2019-continue2.js", "more"),
    "playable/extra-g.html": ("Stadia Note", "stadnote", "year-2019-stadnote.js", "more"),
    "playable/extra-h.html": ("Face Two", "face2", "year-2019-face2.js", "more"),
    "playable/extra-i.html": ("Arcade Note", "arcnote", "year-2019-arcnote.js", "more"),
    "playable/more-a.html": ("More A leftover", "morea", None, "lo"),
    "playable/more-b.html": ("More B leftover", "moreb", None, "lo"),
    "playable/more-c.html": ("Shinobi Bar", "sekirobar", None, "full"),
    "playable/more-d.html": ("Goose Honk", "goosehk", None, "full"),
    "playable/more.html": ("More leftover", "more", None, "lo"),
    "playable/game-2.html": ("Continue Two cabinet", "g2", None, "lo"),
    "playable/game-3.html": ("Arcade leftover cabinet", "g3", None, "lo"),
    "playable/game-4.html": ("Stadia leftover cabinet", "g4", None, "lo"),
    "playable/game-5.html": ("Profile leftover cabinet", "g5", None, "lo"),
    "playable/famous.html": ("Famous leftover", "famous", None, "lo"),
    "playable/index.html": ("2019 playables", "pidx", None, "index"),
}


def parse_book():
    text = BOOK.read_text()
    rows = re.findall(r"^### (L-\d+) · `(itt19-[^`]+)` · ([^\n]+)", text, re.M)
    by_room = defaultdict(list)
    for lid, key, room in rows:
        suf = key[len("itt19-") :]
        by_room[room.strip()].append((lid, key, suf))
    return by_room


def rel_to(src: str, dest: str) -> str:
    if dest.startswith("pages/"):
        if src.startswith("pages/"):
            return dest.split("/", 1)[1]
        if src.startswith("sites/playable/"):
            return "../../" + dest
        return "../../" + dest
    # dest is sites/...
    d = dest if dest.startswith("sites/") else "sites/" + dest
    if src.startswith("pages/"):
        return "../" + d
    s_dir = str(Path(src).parent).replace("\\", "/")
    d_dir = str(Path(d).parent).replace("\\", "/")
    if s_dir == d_dir:
        return Path(d).name
    # both under sites/
    return "../" + d[len("sites/") :]


def two_x(src: str) -> str:
    bits = []
    for href, label in HOPS:
        full = "sites/" + href
        if full == src:
            continue
        bits.append(f'<a href="{rel_to(src, full)}">{label}</a>')
    return (
        '<!-- ITT-2X-LINKS:2019:start -->\n'
        '<p class="itt-pop-more" data-itt-pop-more="2019" data-itt-2x-links="2019" '
        'style="margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;'
        'font-size:11px;max-width:52em"><b>2× leftover links</b> · '
        + " · ".join(bits)
        + "</p>\n<!-- ITT-2X-LINKS:2019:end -->\n"
    )


def three_x(src: str) -> str:
    items = [
        ("pages/home.html", "Starting Point"),
        ("pages/map.html", "Year flow map"),
        ("sites/disneyplus/home.html", "★ Disney+ Continue"),
        ("sites/youtube/index.html", "YouTube leftover"),
        ("sites/instagram/index.html", "Instagram leftover"),
        ("sites/wikipedia/index.html", "Wikipedia leftover"),
        ("sites/tiktok/index.html", "TikTok leftover"),
        ("sites/arcade/index.html", "Arcade leftover"),
        ("sites/stadia/index.html", "Stadia leftover"),
        ("sites/playable/game.html", "Continue Row"),
    ]
    bits = []
    for href, label in items:
        if href == src:
            continue
        bits.append(f'<a href="{rel_to(src, href)}">{label}</a>')
    return (
        '<!-- ITT-3X-ALSO:start -->\n'
        '<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2019" '
        'style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;'
        'font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b>'
        '<p style="margin:6px 0 0">' + " · ".join(bits) + "</p></nav>\n"
        "<!-- ITT-3X-ALSO:end -->\n"
    )


def lo_panel(src: str, suf: str, meta: dict, next_href: str, next_label: str) -> str:
    trap = meta.get("trap") or "Neighbor year (trap)"
    keep = meta.get("keep") or "This year's leftover"
    wrong = meta.get("wrong") or "Neighbor year (trap)"
    h1a = meta.get("h1a") or "Disney+ Continue is the star. This plaque is leftover."
    h1b = meta.get("h1b") or "Empty, trap, or 0 ticks never write."
    nxt = rel_to(src, "sites/" + next_href if not next_href.startswith("pages/") and not next_href.startswith("sites/") else next_href)
    return f"""<!-- ITT-LO-OFFICIAL:{suf}:start -->
<section data-lo-panel="1" data-itt-year="2019" class="itt-2019-machine" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover machine</b> · dest-true · incomplete never writes · <code>itt19-{suf}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> {h1a}</label>
<label style="display:block"><input type="checkbox" data-lo-req> {h1b}</label>
<p>
 <button type="button" data-lo-pick="keep">{keep}</button>
 <button type="button" data-lo-pick="trap">{wrong}</button>
</p>
<p><label>Leftover note.<br><input type="text" data-lo-field maxlength="80" placeholder="2019 leftover" autocomplete="off"></label></p>
<p>
 <button type="button" data-lo-trap>{trap}</button>
 <button type="button" data-lo-save data-lo-key="{suf}" data-lo-need-pick="keep">Save leftover</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt19-{suf}"><b>Next:</b> <a href="{nxt}">{next_label}</a></p>
</section>
<!-- ITT-LO-OFFICIAL:{suf}:end -->
"""


def shell_head(title: str, official_key: str | None, extra_css: str = "") -> str:
    ok = f' data-official-key="{official_key}"' if official_key else ""
    css = extra_css or ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2019"{ok}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2019.css">
{css}
</head>
"""


def crumb(src: str, back_href: str, back_label: str) -> str:
    home = rel_to(src, "pages/home.html")
    if back_href in ("pages/home.html",) or back_label == "Starting Point":
        return f'<p class="crumb"><a href="{home}">← Starting Point</a></p>'
    dest = back_href if back_href.startswith(("pages/", "sites/")) else "sites/" + back_href
    return (
        f'<p class="crumb"><a href="{rel_to(src, dest)}">← {back_label}</a> · '
        f'<a href="{home}">Starting Point</a></p>'
    )


def product_disney_home() -> str:
    return """
<div class="dplus19-stage">
<div class="dplus19-well">
<p class="dplus19-wordmark">DISNEY+</p>
<p style="font-size:12px;opacity:.8">12 Nov 2019 · $6.99 / $69.99 · profiles up to 7 including Kids · Continue watching</p>
<p style="font-size:11px;opacity:.7">Museum costume. Do not quote “Who’s watching” as a 2019 Disney press verb. No official art.</p>
<p>
 <button type="button" data-dplus-trial data-official-trap>Start weeklong trial</button>
</p>
<p class="dplus19-grid">
 <button type="button" data-dplus-profile="adult">Adult</button>
 <button type="button" data-dplus-profile="kids">Kids</button>
</p>
<div data-dplus-kids-block hidden style="padding:8px;border:1px solid #333;margin:8px 0">Kids profile — different color. Blocked title hidden.</div>
<p>
 <button type="button" data-dplus-add data-title="the-mandalorian-class">Add Mandalorian-class leftover</button>
 <button type="button" data-dplus-add data-title="frozen-2-class">Add Frozen-2-class leftover</button>
</p>
<p data-dplus-row>Continue row empty</p>
<label style="display:block"><input type="checkbox" data-dplus-req> Weeklong trial is the trap. Continue is the save.</label>
<label style="display:block"><input type="checkbox" data-dplus-req> Incomplete / 0–1 profiles / 0–1 titles never write.</label>
<p>
 <button type="button" data-dplus-continue data-official-verb>Continue</button>
</p>
<p data-dplus-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-disneyplus"><b>Next:</b> <a href="../tiktok/index.html">TikTok For You</a></p>
</div>
</div>
"""


def product_tiktok() -> str:
    return """
<p><label>Caption leftover<br>
<textarea data-tt-caption rows="2" maxlength="80" placeholder="caption leftover"></textarea></label></p>
<p data-tt-rail>For You leftover empty</p>
<label style="display:block"><input type="checkbox" data-tt-req> Merge was 2 Aug 2018. 2019 is US mass.</label>
<label style="display:block"><input type="checkbox" data-tt-req> COPPA $5.7M · 27 Feb announced / 27 Mar order. Empty never writes.</label>
<p>
 <button type="button" data-tt-post data-official-verb>Post</button>
</p>
<p data-tt-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-tiktok"><b>Next:</b> <a href="../arcade/index.html">Apple Arcade</a></p>
"""


def product_arcade() -> str:
    return """
<p style="font-size:12px">19 Sep 2019 · $4.99 / month · no ads or additional in-game purchases · Family Sharing 6</p>
<p>
 <button type="button" data-arc-pick="oceanhorn">Oceanhorn-class leftover</button>
 <button type="button" data-arc-pick="exit-the-gungeon">Exit-class leftover</button>
</p>
<label style="display:block"><input type="checkbox" data-arc-req> $4.99 leftover. IAP never writes.</label>
<p>
 <button type="button" data-arc-play data-official-verb>Play leftover</button>
</p>
<p data-arc-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-arcade"><b>Next:</b> <a href="../appletv/index.html">Apple TV+</a></p>
"""


def product_tv() -> str:
    return """
<p style="font-size:12px">1 Nov 2019 · $4.99 / month · one year free on new hardware from 10 Sep</p>
<p>
 <button type="button" data-tv-pick="morning-show-class">Morning-show-class leftover</button>
 <button type="button" data-tv-pick="see-class">See-class leftover</button>
</p>
<label style="display:block"><input type="checkbox" data-tv-req> $4.99 leftover. No original never writes.</label>
<p>
 <button type="button" data-tv-watch data-official-verb>Watch leftover</button>
</p>
<p data-tv-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-appletv"><b>Next:</b> <a href="../stadia/index.html">Stadia</a></p>
"""


def product_stadia() -> str:
    return """
<p style="font-size:12px">19 Nov 2019 · 9 a.m. PST · Founder's $129.99 · Night Blue controller · Chromecast Ultra · 3 months Pro</p>
<p>
 <button type="button" data-stadia-tier="founders">Founder's $129.99</button>
 <button type="button" data-stadia-tier="premiere">Premiere leftover</button>
</p>
<label style="display:block"><input type="checkbox" data-stadia-req> Founder's leftover. 2023 shutdown copy never writes.</label>
<p>
 <button type="button" data-stadia-claim data-official-verb>Claim leftover</button>
</p>
<p data-stadia-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-stadia"><b>Next:</b> <a href="../iphone/iphone11.html">iPhone 11</a></p>
"""


def product_iphone() -> str:
    return """
<p style="font-size:12px">Stores 20 Sep 2019 · from $699 · dual camera. Face ID is 2017.</p>
<p>
 <button type="button" data-ip11-color="purple">Purple</button>
 <button type="button" data-ip11-color="green">Green</button>
 <button type="button" data-ip11-color="yellow">Yellow</button>
</p>
<label style="display:block"><input type="checkbox" data-ip11-req> Stores 20 Sep leftover. Face-ID-as-new never writes.</label>
<label style="display:block"><input type="checkbox" data-ip11-req> Color pick required. Incomplete never writes.</label>
<p>
 <button type="button" data-ip11-pick data-official-verb>Pick leftover</button>
</p>
<p data-ip11-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-iphone11"><b>Next:</b> <a href="../airpodspro/index.html">AirPods Pro</a></p>
"""


def product_airpods() -> str:
    return """
<p style="font-size:12px">30 Oct 2019 · $249 · Active Noise Cancellation</p>
<label style="display:block"><input type="checkbox" data-app-req> $249 leftover. 2016 AirPods are not new.</label>
<label style="display:block"><input type="checkbox" data-app-req> ANC leftover. 0–1 tick never writes.</label>
<p>
 <button type="button" data-app-pair data-official-verb>Pair leftover</button>
</p>
<p data-app-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-airpods-pro"><b>Next:</b> <a href="../chrome/index.html">Chrome habit</a></p>
"""


def product_chrome() -> str:
    return """
<label style="display:block"><input type="checkbox" data-ch-req> Chrome is already the habit.</label>
<label style="display:block"><input type="checkbox" data-ch-req> Chromium Edge as default is 15 Jan 2020.</label>
<p>
 <button type="button" data-ch-ack data-official-verb>Keep Chrome habit</button>
</p>
<p data-ch-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-chrome"><b>Next:</b> <a href="../windows10/index.html">Win10 residual</a></p>
"""


def product_win10() -> str:
    return """
<label style="display:block"><input type="checkbox" data-w10-req> Free upgrade ended 29 Jul 2016.</label>
<label style="display:block"><input type="checkbox" data-w10-req> Win10 is still mass. Win11 never writes.</label>
<p>
 <button type="button" data-w10-ack data-official-verb>Stay on Win10 leftover</button>
</p>
<p data-w10-status data-official-status></p>
<p hidden data-next-flow data-next-when-key="itt19-win10"><b>Next:</b> <a href="../playable/game.html">Continue Row</a></p>
"""


def product_marshmello() -> str:
    return """
<label style="display:block"><input type="checkbox" data-mm-req> 2 Feb 2019. 10.7M peak concurrent (Epic via press), not unique attendees.</label>
<label style="display:block"><input type="checkbox" data-mm-req> Not Travis Scott. Not the chip.</label>
<p>
 <button type="button" data-mm-ack>Note in-game leftover</button>
</p>
<p data-mm-status></p>
<p hidden data-next-flow data-next-when-key="itt19-marshmello"><b>Next:</b> <a href="../fortnitewc/index.html">Fortnite WC leftover</a></p>
"""


def product_edge() -> str:
    return """
<p>
 <button type="button" data-ed19-pick="preview">Chromium Edge preview leftover</button>
 <button type="button" data-ed19-pick="default">Set as default (2020)</button>
</p>
<label style="display:block"><input type="checkbox" data-ed19-req> 2019 is preview leftover.</label>
<label style="display:block"><input type="checkbox" data-ed19-req> Default browser is 15 Jan 2020.</label>
<p>
 <button type="button" data-ed19-default>Make Edge default (trap)</button>
 <button type="button" data-ed19-set>Set preview leftover</button>
</p>
<p data-ed19-status></p>
<p hidden data-next-flow data-next-when-key="itt19-edge-preview"><b>Next:</b> <a href="../chrome/index.html">Chrome habit</a></p>
"""


def continuerow_game() -> str:
    return """
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
<div class="itt-year-game yg-shell" data-year-game data-year="2019" data-game-id="continuerow" style="max-width:480px;margin:12px auto;font-family:Segoe UI,Arial,sans-serif">
 <h1>Continue Row — 2019</h1>
 <p class="yg-honesty" data-yg-inspire>Disney+ Continue class. Museum original silhouette — no official art. Trial is the trap. Not Consent Dash.</p>
 <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
 <p>
  <button type="button" data-game-start>New Game</button>
  <button type="button" data-cr-trial data-official-trap>Start trial (trap)</button>
 </p>
 <p>
  <button type="button" data-cr-profile="adult">Adult</button>
  <button type="button" data-cr-profile="kids">Kids</button>
 </p>
 <div data-cr-kids-block hidden>Kids — blocked title hidden.</div>
 <p>
  <button type="button" data-cr-add data-title="the-mandalorian-class">Add Mandalorian-class</button>
  <button type="button" data-cr-add data-title="frozen-2-class">Add Frozen-2-class</button>
 </p>
 <p data-cr-row>Continue row empty</p>
 <p>
  <button type="button" data-cr-continue data-official-verb>Continue</button>
 </p>
 <p data-itt-action-status data-official-status>New Game. Incomplete never writes.</p>
 <p hidden data-next-flow data-next-when-key="itt19-game-continuerow"><b>Next:</b> <a href="../disneyplus/home.html">★ Disney+ Continue</a></p>
 <p style="font-size:11px"><a href="index.html">← Playables</a> · <a href="famous.html">Famous leftover</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-2019-continuerow.js"></script>
"""


PRODUCT = {
    "disneyplus/home.html": product_disney_home,
    "tiktok/index.html": product_tiktok,
    "arcade/index.html": product_arcade,
    "appletv/index.html": product_tv,
    "stadia/index.html": product_stadia,
    "iphone/iphone11.html": product_iphone,
    "airpodspro/index.html": product_airpods,
    "chrome/index.html": product_chrome,
    "windows10/index.html": product_win10,
    "fortnite/marshmello.html": product_marshmello,
    "edgerc/index.html": product_edge,
    "playable/game.html": continuerow_game,
}


def dest_key(room: str) -> str:
    return room[6:] if room.startswith("sites/") else room


def normalize_meta(room: str) -> dict:
    key = dest_key(room)
    if key in DEST:
        return DEST[key]
    if room in DEST:
        return DEST[room]
    m = MASS.get(key) or MASS.get(room)
    if m is not None:
        if isinstance(m, dict):
            return m
        title, h1, body, trap, keep, h1a = m
        nxt = HOPS[0]
        href = dest_key(room)
        for i, (h, lab) in enumerate(HOPS):
            if h == href or ("sites/" + h) == room:
                nxt = HOPS[(i + 1) % len(HOPS)]
                break
        return {
            "title": title,
            "h1": h1,
            "body": body,
            "trap": trap,
            "keep": keep,
            "wrong": trap,
            "h1a": h1a,
            "h1b": "Trap / empty / 0 ticks never write.",
            "next": nxt if isinstance(nxt, tuple) else (nxt[0], nxt[1]),
        }
    # fallback
    return {
        "title": room + " — 2019 leftover",
        "h1": room,
        "body": "<p>2019 leftover dest. Disney+ Continue is the star. Incomplete never writes.</p>",
        "trap": "Star as leftover (trap)",
        "keep": "This year's leftover",
        "wrong": "Neighbor year (trap)",
        "h1a": "Disney+ Continue is the star. This plaque is leftover.",
        "h1b": "Trap / empty never writes.",
        "next": ("disneyplus/home.html", "★ Disney+ Continue"),
    }


def write_dest(room: str, keys: list, meta: dict):
    src = room
    official = meta.get("official")
    nxt_href, nxt_label = meta.get("next") or ("disneyplus/home.html", "★ Disney+ Continue")
    if not nxt_href.startswith("sites/") and not nxt_href.startswith("pages/"):
        nxt_full = "sites/" + nxt_href
    else:
        nxt_full = nxt_href
    extra_css = ""
    if room == "disneyplus/home.html":
        extra_css = ""
    path = YEAR / room
    path.parent.mkdir(parents=True, exist_ok=True)
    back = "pages/home.html"
    back_lab = "Starting Point"
    # previous official
    trail = [
        ("disneyplus/home.html", "★ Disney+"),
        ("tiktok/index.html", "TikTok"),
        ("arcade/index.html", "Arcade"),
        ("appletv/index.html", "TV+"),
        ("stadia/index.html", "Stadia"),
        ("iphone/iphone11.html", "iPhone 11"),
        ("airpodspro/index.html", "AirPods Pro"),
        ("chrome/index.html", "Chrome"),
        ("windows10/index.html", "Win10"),
        ("playable/game.html", "Continue Row"),
    ]
    href = room[len("sites/") :] if room.startswith("sites/") else room
    for i, (h, lab) in enumerate(trail):
        if h == href and i:
            back = "sites/" + trail[i - 1][0]
            back_lab = trail[i - 1][1]
            break
    parts = [shell_head(meta["title"], official, extra_css)]
    parts.append('<body bgcolor="#f2f2f2" text="#111">\n')
    parts.append('<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n')
    parts.append('<p class="itt-pixel-failed" data-itt-capture-cite style="font-size:11px;margin:8px 0;font-family:Arial,sans-serif">[failed-final] Period mark · CSS / wordmark only · no invented brand pixels</p>\n')
    parts.append('<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px;line-height:1.45">\n')
    parts.append(crumb(src, back, back_lab))
    parts.append(f'<h1>{meta["h1"]}</h1>\n')
    parts.append(meta.get("body") or "")
    prod = PRODUCT.get(dest_key(room)) or PRODUCT.get(room)
    if prod:
        parts.append(prod())
    parts.append("</div>\n")
    # leftover panels
    for i, (_lid, _key, suf) in enumerate(keys):
        # cycle next among hops
        nh, nl = nxt_href, nxt_label
        if i + 1 < len(keys):
            # stay on dest for other leftover keys
            pass
        parts.append(lo_panel(src, suf, meta, nh if nh.startswith(("sites/", "pages/")) else "sites/" + nh, nl))
    parts.append('<script src="../../../../js/immersion-2019.js"></script>\n')
    parts.append(three_x(src))
    parts.append(two_x(src))
    parts.append("</body>\n</html>\n")
    path.write_text("".join(parts))


def write_playable(room: str, keys: list, spec: tuple):
    title, gid, js, kind = spec
    src = room
    meta = {
        "trap": "Start trial / Consent Dash (trap)",
        "keep": "Cabinet leftover",
        "wrong": "Trial as gold (trap)",
        "h1a": "Continue Row is the year game. This cabinet is leftover.",
        "h1b": "Trap / empty never writes.",
    }
    path = YEAR / room
    path.parent.mkdir(parents=True, exist_ok=True)
    nxt = "playable/game.html"
    css = '<link rel="stylesheet" href="../../../../css/year-game-ui.css">\n'
    if kind == "minute":
        css += '<link rel="stylesheet" href="../../../../css/year-extra-minute.css">\n'
    parts = [shell_head(title + " — 2019", None, css)]
    parts.append('<body class="yg-body yg-year-2019" bgcolor="#111" style="color:#eee">\n')
    parts.append('<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n')
    if kind == "index":
        parts.append('<div class="am-shell" style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;color:#111;background:#f2f2f2;padding:16px">\n')
        parts.append('<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>\n')
        parts.append("<h1>2019 cabinet</h1>\n")
        parts.append('<p><a href="game.html"><b>Continue Row</b></a> — Disney+ Continue class · trial is the trap · no official art.</p>\n')
        parts.append('<p data-itt-year-extras="2019"><b>Two more</b> — <a href="extra-a.html">Who’s watch</a> · <a href="extra-b.html">Trial trap</a></p>\n')
        parts.append('<p data-itt-year-cabinets="2019"><b>Lean cabinets</b> — <a href="game-2.html">2</a> · <a href="game-3.html">3</a> · <a href="game-4.html">4</a> · <a href="game-5.html">5</a></p>\n')
        parts.append('<p data-itt-year-more="2019"><b>Three more</b> — <a href="extra-c.html">Row Extra</a> · <a href="extra-d.html">Stadia Wait</a> · <a href="extra-e.html">Arcade Card</a></p>\n')
        parts.append('<p><a href="famous.html">Famous leftover</a> · <a href="more.html">More leftover</a></p>\n')
        parts.append("</div>\n")
    elif kind == "minute":
        parts.append(f"""<div class="itt-year-game yg-shell mx-shell" data-year-game data-minute-extra data-mx-kind="seq" data-year="2019" data-game-id="{gid}" data-yg-next-href="game.html" data-yg-next-label="Continue Row">
  <h1>{title} — 2019</h1>
  <p class="honesty yg-honesty"><b>Leftover extra.</b> Star stays Disney+ Continue. Trial never writes. key <code>itt19-game-{gid}</code></p>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-mx-field class="mx-field" aria-label="{title} playfield"></div>
  <p><button type="button" data-game-start>Start</button> <button type="button" data-mx-finish>Finish</button></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p class="mx-nav"><a href="index.html">← Playables</a> · <a href="game.html">Continue Row</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-extra-minute.js"></script>
<script src="../../../../js/games/{js}"></script>
""")
    elif kind == "more":
        parts.append(f"""<div class="itt-year-game yg-shell" data-year-game data-more-game data-year="2019" data-game-id="{gid}" data-yg-next-href="game.html" data-yg-next-label="Continue Row">
  <h1>{title} — 2019</h1>
  <p class="honesty yg-honesty"><b>Leftover cabinet.</b> Star stays Disney+ Continue. key <code>itt19-game-{gid}</code></p>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-more-field class="mx-field"></div>
  <p><button type="button" data-game-start>Start</button> <button type="button" data-game-finish>Finish</button></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p><a href="index.html">← Playables</a> · <a href="game.html">Continue Row</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/games/{js}"></script>
""")
    elif kind == "full":
        parts.append(f"""<div class="itt-year-game yg-shell" data-year-game data-year="2019" data-game-id="{gid}">
  <h1>{title} — 2019</h1>
  <p class="honesty yg-honesty"><b>Leftover cabinet.</b> Museum original. Not official art. Star stays Disney+ Continue.</p>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <p><button type="button" data-game-start>Start</button></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p><a href="index.html">← Playables</a> · <a href="game.html">Continue Row</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-full-more.js"></script>
""")
    else:
        parts.append(f"""<div style="max-width:480px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;color:#eee">
<h1>{title} — 2019</h1>
<p>Leftover cabinet. Continue Row is the year game. Disney+ Continue is the star. Incomplete never writes.</p>
<p><a href="index.html">← Playables</a> · <a href="game.html">Continue Row</a></p>
</div>
""")
    for _lid, _key, suf in keys:
        parts.append(lo_panel(src, suf, meta, "sites/" + nxt, "Continue Row"))
    parts.append('<script src="../../../../js/immersion-2019.js"></script>\n')
    parts.append(three_x(src))
    parts.append(two_x(src))
    parts.append("</body>\n</html>\n")
    path.write_text("".join(parts))


def write_pages():
    (YEAR / "pages" / "error").mkdir(parents=True, exist_ok=True)
    (YEAR / "index.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2019</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2019");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2019.js?v=20260830ui"></script>
<script src="../../js/browser-2019.js?v=20260830ui"></script>
</body>
</html>
"""
    )
    (YEAR / "pages" / "home.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2019</title>
<link rel="stylesheet" href="../../../css/period-2019.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2019");</script>
<script src="../../../js/immersion-2019.js" defer></script>
</body>
</html>
"""
    )
    (YEAR / "pages" / "about.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<title>About 2019 — table ends 2018 · ITU 4.1B</title>
<link rel="stylesheet" href="../../../css/period-2019.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2019</h1>
<p><b>Profiles become the door, a weeklong trial is the trap, and Continue watching is the save.</b>
Disney+ ships 12 Nov. Arcade 19 Sep. TV+ 1 Nov. Stadia 19 Nov. TikTok is last year’s app-unite, this year’s US pop-culture year.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Internet Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579 (−8%)</b>. No June 2019 ILS cell. Do not invent one.</td></tr>
<tr><td>Live Stats users cell</td><td><b>blank</b></td></tr>
<tr><td>Internet users (ITU Facts and Figures 2019 · PR 5 Nov 2019)</td><td><b>4.1 billion</b> / <b>53.6%</b> — labeled <b>ITU</b>, never as Live Stats</td></tr>
<tr><td>Netcraft January 2019</td><td><b>1,518,207,412</b> (label January)</td></tr>
</table>
<p style="font-size:12px">Do not invent a June 2019 websites digit. Do not blend ITU users into an ILS cell.</p>
<h2>Bans — not 2019 defaults</h2>
<ul>
<li>Reels · Meta branding · COVID spine · Zoom mute → Leave gold</li>
<li>Chromium Edge as the <b>default</b> browser (15 Jan 2020) · HBO Max · Quibi · Travis Scott</li>
<li>Face ID as <b>new</b> (2017) · GDPR Manage as chip (2018) · musical.ly merge as unlock (2018)</li>
<li>Stadia 2023 shutdown room · Baidu / VK / Yandex / adult-video rooms</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that the ILS June table ends 2018 at 1,630,322,579 (−8%) and ITU is 4.1B / 53.6%.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Reels / Zoom-as-mass / Edge-as-default / Face-ID-as-new / GDPR-as-chip are not 2019 defaults.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/disneyplus/home.html">★ Disney+ Continue</a></p>
</section>
</div>
<script src="../../../js/immersion-2019.js"></script>
</body>
</html>
"""
    )
    (YEAR / "pages" / "map.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<title>2019 flow map</title>
<link rel="stylesheet" href="../../../css/period-2019.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:16px auto;font-family:Segoe UI,Helvetica Neue,Arial,sans-serif;font-size:13px;line-height:1.5">
<p class="crumb"><a href="home.html">← Starting Point</a> · <a href="about.html">About</a></p>
<h1>2019 UX flow map</h1>
<p>Pick a profile. A weeklong trial is the trap. <b>Star = Disney+ Continue</b>. Guided list stays 6. Leftover 3× never steal the chip.</p>
<p style="font-size:12px;background:#fff8dc;border:1px solid #c9a227;padding:8px 10px"><b>Mid-trail rule:</b> crumb <code>← last dest</code> is visible the moment you land. <b>Next</b> waits until this dest writes.</p>
<pre style="font-size:11px;background:#111;color:#ef9a9a;padding:10px;overflow:auto">
Starting Point
 ├─ Guided 6 …… About → ★ Disney+ Continue → TikTok → Arcade → Stadia → this map
 ├─ Official 10 … Disney+ → TikTok → Arcade → TV+ → Stadia → iPhone 11
 │                 → AirPods Pro → Chrome → Win10 → Continue Row ──► Disney+
 ├─ Leftover 3× … YouTube → Instagram → Wikipedia → Starting Point
 └─ Side ……… Marshmello leftover (10.7M peak concurrent) rejoins Fortnite WC
</pre>
<h2>Official 10</h2>
<ol data-itt-ten-flows style="padding-left:1.3em">
 <li>★ <a href="../sites/disneyplus/home.html">Disney+ Continue</a> — trial never writes → Continue → <code>itt19-disneyplus</code>. Next → TikTok.</li>
 <li><a href="../sites/tiktok/index.html">TikTok For You</a> — caption ≥2 + Post. Merge is 2018. <code>itt19-tiktok</code>.</li>
 <li><a href="../sites/arcade/index.html">Apple Arcade</a> — $4.99 · 19 Sep · no extra IAP. <code>itt19-arcade</code>.</li>
 <li><a href="../sites/appletv/index.html">Apple TV+</a> — $4.99 · 1 Nov. Trail n=4, not a 7th guided item. <code>itt19-appletv</code>.</li>
 <li><a href="../sites/stadia/index.html">Stadia Founder's</a> — $129.99 Night Blue · 9 a.m. PST. <code>itt19-stadia</code>.</li>
 <li><a href="../sites/iphone/iphone11.html">iPhone 11</a> — stores 20 Sep. Face ID is 2017. <code>itt19-iphone11</code>.</li>
 <li><a href="../sites/airpodspro/index.html">AirPods Pro</a> — $249 · 30 Oct. <code>itt19-airpods-pro</code>.</li>
 <li><a href="../sites/chrome/index.html">Chrome habit</a> — Edge default is 2020. <code>itt19-chrome</code>.</li>
 <li><a href="../sites/windows10/index.html">Win10 residual</a> — free upgrade ended 2016. <code>itt19-win10</code>.</li>
 <li><a href="../sites/playable/game.html">Continue Row</a> — two profiles + row survives Kids. <code>itt19-game-continuerow</code>.</li>
</ol>
<h2>Leftover 3× — not the chip</h2>
<p><a href="../sites/youtube/index.html">YouTube leftover</a> · <a href="../sites/instagram/index.html">Instagram leftover</a> · <a href="../sites/wikipedia/index.html">Wikipedia leftover</a></p>
</div>
<script src="../../../js/immersion-2019.js"></script>
</body>
</html>
"""
    )
    (YEAR / "pages" / "whats-new.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<title>What's new — 2019</title>
<link rel="stylesheet" href="../../../css/period-2019.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a> · <a href="about.html">About</a></p>
<h1>What's new in 2019</h1>
<ul>
<li>21 Jan — CNIL fines Google €50M under GDPR (leftover fine; Manage is 2018)</li>
<li>2 Feb — Marshmello in Fortnite · 10.7M peak concurrent (Epic via press)</li>
<li>27 Feb / 27 Mar — TikTok COPPA $5.7M</li>
<li>2 Apr — Inbox off · consumer Google+ dies</li>
<li>21 May — Oculus Quest ships</li>
<li>18 Jun — Libra white paper</li>
<li>20 Jun — Slack IPO leftover</li>
<li>24 Jul — FTC $5B Facebook penalty</li>
<li>19 Sep — Apple Arcade $4.99 · iOS 13 Dark Mode</li>
<li>20 Sep — iPhone 11 stores · from $699</li>
<li>30 Sep — iPadOS</li>
<li>30 Oct — AirPods Pro $249</li>
<li>1 Nov — Apple TV+ $4.99</li>
<li>12 Nov — Disney+ $6.99 / $69.99 · Continue is the save</li>
<li>19 Nov — Stadia Founder's $129.99 · 9 a.m. PST</li>
<li>Dec — Zoom 10M literacy only · mute/Leave is 2020</li>
</ul>
<p><a href="../sites/disneyplus/home.html">★ Continue watching</a></p>
</div>
<script src="../../../js/immersion-2019.js"></script>
</body>
</html>
"""
    )
    (YEAR / "pages" / "error" / "404.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<title>404 — 2019</title>
<link rel="stylesheet" href="../../../../css/period-2019.css">
</head>
<body bgcolor="#f2f2f2">
<div style="max-width:480px;margin:24px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<h1>404</h1>
<p>That room is not on the 2019 door.</p>
<p><a href="../home.html">Starting Point</a> · <a href="../../sites/disneyplus/home.html">★ Disney+ Continue</a> · <a href="../../sites/tiktok/index.html">TikTok leftover</a></p>
</div>
<script src="../../../../js/immersion-2019.js"></script>
</body>
</html>
"""
    )
    (YEAR / "pages" / "error" / "unreachable.html").write_text(
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2019">
<head>
<meta charset="utf-8">
<title>Unreachable — 2019</title>
<link rel="stylesheet" href="../../../../css/period-2019.css">
</head>
<body bgcolor="#f2f2f2">
<div style="max-width:480px;margin:24px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<h1>Unreachable</h1>
<p>That leftover is not on this door.</p>
<p><a href="../home.html">Starting Point</a></p>
</div>
<script src="../../../../js/immersion-2019.js"></script>
</body>
</html>
"""
    )


def write_fortnite_index():
    src = "sites/fortnite/index.html"
    path = YEAR / src
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        shell_head("Fortnite leftover — 2019", None)
        + """<body bgcolor="#111" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Fortnite leftover — 2019</h1>
<p>2019 leftover is the <a href="marshmello.html">Marshmello concert</a> (2 Feb · 10.7M peak concurrent) and the <a href="../fortnitewc/index.html">World Cup</a>. Battle Royale gold stays 2017. Travis Scott is 2020.</p>
</div>
<script src="../../../../js/immersion-2019.js"></script>
"""
        + three_x(src)
        + two_x(src)
        + "</body></html>\n"
    )


def write_iphone_about():
    src = "sites/iphone/about.html"
    path = YEAR / src
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        shell_head("iPhone leftover literacy — 2019", None)
        + """<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="iphone11.html">← iPhone 11</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>iPhone leftover literacy</h1>
<p>Face ID is 2017. iPhone 11 stores 20 Sep 2019. The official dest is <a href="iphone11.html">iphone11.html</a>.</p>
</div>
<script src="../../../../js/immersion-2019.js"></script>
</body></html>
"""
    )


def rebuild_matrices(by_room):
    lo_path = ROOT / "e2e" / "leftover-official.matrix.json"
    lo = json.loads(lo_path.read_text())
    dests = [d for d in lo.get("dests", []) if d.get("year") != "2019"]
    x2_path = ROOT / "e2e" / "2x-links.matrix.json"
    x2 = json.loads(x2_path.read_text())
    x2 = [d for d in x2 if d.get("year") != "2019"]
    hops = HOPS
    i = 0
    for room, keys in sorted(by_room.items()):
        href = room
        for _lid, key, suf in keys:
            dests.append(
                {
                    "year": "2019",
                    "href": href,
                    "key": key,
                    "suffix": suf,
                    "needPick": "keep",
                    "minPick": 0,
                    "field": True,
                    "placeholder": "2019 leftover",
                }
            )
            nh, nl = hops[(i + 1) % len(hops)]
            x2.append(
                {
                    "year": "2019",
                    "path": "/years/2019/" + href,
                    "key": key,
                    "kind": "query",
                    "title": "2019 leftover · " + suf,
                    "next": "/years/2019/sites/" + nh,
                    "nextLabel": nl,
                }
            )
            i += 1
    lo["dests"] = dests
    lo_path.write_text(json.dumps(lo, indent=2) + "\n")
    x2_path.write_text(json.dumps(x2, indent=2) + "\n")
    return len([d for d in dests if d["year"] == "2019"]), len([d for d in x2 if d["year"] == "2019"])


def rewrite_2019_config(rooms: list[str]):
    cfg = ROOT / "js" / "config" / "2019.js"
    text = cfg.read_text()
    # replace rooms array
    room_js = ",\n    ".join(json.dumps(r) for r in rooms)
    new = re.sub(
        r"var rooms = \[[^\]]*?\];",
        "var rooms = [\n    " + room_js + "\n  ];",
        text,
        count=1,
        flags=re.S,
    )
    hints = """    locationHints: [
      { re: /disney|continue|trial/i, path: "sites/disneyplus/home.html" },
      { re: /tiktok|fyp|for you|coppa/i, path: "sites/tiktok/index.html" },
      { re: /arcade/i, path: "sites/arcade/index.html" },
      { re: /apple.?tv|tv\\+/i, path: "sites/appletv/index.html" },
      { re: /stadia|founders|premiere/i, path: "sites/stadia/index.html" },
      { re: /iphone.?11/i, path: "sites/iphone/iphone11.html" },
      { re: /airpods/i, path: "sites/airpodspro/index.html" },
      { re: /marshmello|fortnite/i, path: "sites/fortnite/marshmello.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /win(dows)?\\s*10/i, path: "sites/windows10/index.html" },
      { re: /continue row|playable|game/i, path: "sites/playable/game.html" },
      { re: /ios.?13|dark.?mode/i, path: "sites/ios13/index.html" },
      { re: /ipados/i, path: "sites/ipados/index.html" },
      { re: /libra|calibra|diem/i, path: "sites/libra/index.html" },
      { re: /cnil/i, path: "sites/cnil/index.html" },
      { re: /\\bftc\\b/i, path: "sites/ftc/index.html" },
      { re: /inbox/i, path: "sites/inbox/index.html" },
      { re: /zoom/i, path: "sites/zoom10m/index.html" }
    ]"""
    new = re.sub(r"    locationHints: \[[^\]]*\]", hints, new, count=1, flags=re.S)
    cfg.write_text(new)


def main():
    by_room = parse_book()
    if YEAR.exists():
        # only remove our tree if we created a partial
        pass
    write_pages()
    rooms_written = set()
    for room, keys in by_room.items():
        rooms_written.add(room)
        if room.startswith("sites/playable/") and room != "sites/playable/game.html":
            spec = PLAYABLE_EXTRAS.get(room) or PLAYABLE_EXTRAS.get(dest_key(room))
            if spec:
                write_playable(room, keys, spec)
                continue
        meta = normalize_meta(room)
        write_dest(room, keys, meta)
    write_fortnite_index()
    write_iphone_about()
    # leftover dests with no book room still need folders? book covers 312.
    n_lo, n_x2 = rebuild_matrices(by_room)
    room_list = sorted(
        {
            "pages/home.html",
            "pages/about.html",
            "pages/map.html",
            "pages/whats-new.html",
            "pages/error/404.html",
            "pages/error/unreachable.html",
        }
        | rooms_written
        | {"sites/fortnite/index.html", "sites/iphone/about.html"}
    )
    rewrite_2019_config(room_list)
    html_n = len(list(YEAR.rglob("*.html")))
    dest_dirs = sorted(p.name for p in (YEAR / "sites").iterdir() if p.is_dir())
    print("html", html_n)
    print("dest folders", len(dest_dirs), dest_dirs)
    print("leftover rooms", len(by_room), "keys", sum(len(v) for v in by_room.values()))
    print("matrix 2019", n_lo, "2x", n_x2)


if __name__ == "__main__":
    main()
