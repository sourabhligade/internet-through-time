#!/usr/bin/env python3
"""CUT-DOUBLE 2008 — named 105 dests from the criteria map. Star / official 10 stay."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITES = ROOT / "years" / "2008" / "sites"

# id, folder, file, suffix, title, thesis, trap, verb, kind, next_href, next_label
# kind: query | checks | hops | wait
DESTS: list[tuple] = [
    # Pack A
    ("N-A01", "firefox", "downloadday.html", "fx3-day", "Firefox 3 Download Day",
     "17–18 Jun 2008 · Guinness 8,002,530 downloads in 24 hours. Still XP + IE7 for most people. Chrome is September.",
     "Instant Chrome majority (trap)", "Pledge leftover", "wait",
     "../cuil/index.html", "Cuil leftover"),
    ("N-A02", "cuil", "index.html", "cuil-dp", "Cuil",
     "27–28 Jul 2008 · claimed 120 billion pages · launch-night crash · results flop. Not a Google-killer.",
     "Cuil won search (trap)", "Search leftover", "query",
     "../bitcoin/index.html", "Bitcoin paper leftover"),
    ("N-A03", "bitcoin", "index.html", "btc-paper", "Bitcoin P2P e-cash paper",
     "31 Oct 2008 · Satoshi to the cryptography list. Paper only. Genesis is 3 Jan 2009. No wallet. No price.",
     "Mine / wallet / price (trap)", "Read leftover", "checks",
     "../friendfeed/index.html", "FriendFeed leftover"),
    ("N-A04", "friendfeed", "index.html", "ffeed-dp", "FriendFeed",
     "Public 25 Feb 2008 (TC 14 Mar). Private beta 1 Oct 2007. Buchheit / Taylor. Not Facebook gold.",
     "Facebook-as-this-dest (trap)", "Follow leftover", "hops",
     "../tweetdeck/index.html", "TweetDeck leftover"),
    ("N-A05", "tweetdeck", "index.html", "tdeck-dp", "TweetDeck",
     "4 Jul 2008 Iain Dodsworth AIR columns. Dest name stays Twitter. X is 2023.",
     "X rebrand (trap)", "Column leftover", "hops",
     "../bitly/index.html", "bit.ly leftover"),
    ("N-A06", "bitly", "index.html", "bitly-dp", "bit.ly",
     "8 Jul 2008 Betaworks launch (WIRED + Scripting News). Type ≥2. Live click fraud never writes.",
     "Live click fraud (trap)", "Shorten leftover", "query",
     "../recaptcha/index.html", "reCAPTCHA leftover"),
    ("N-A07", "recaptcha", "index.html", "recap-dp", "reCAPTCHA",
     "2008 leftover: type two words. Google buy is 16 Sep 2009 — that year never writes here.",
     "Break captcha (trap)", "Type leftover", "query",
     "../fbconnect/index.html", "Facebook Connect leftover"),
    ("N-A08", "fbconnect", "index.html", "fbcon-dp", "Facebook Connect",
     "2008 login leftover. Not the GitHub star. No live OAuth.",
     "OAuth live (trap)", "Connect leftover", "hops",
     "../beacon/index.html", "Beacon leftover"),
    ("N-A09", "beacon", "index.html", "beacon-dp", "Facebook Beacon",
     "Beacon backlash. Opt out leftover. “Launched 2008” is not gold.",
     "Beacon-as-star (trap)", "Opt-out leftover", "checks",
     "../mybo/index.html", "my.barackobama leftover"),
    ("N-A10", "mybo", "index.html", "mybo-dp", "my.barackobama.com",
     "2008 campaign leftover. RSVP theater. Live donate never writes.",
     "Donate live (trap)", "RSVP leftover", "hops",
     "../changegov/index.html", "change.gov leftover"),
    ("N-A11", "changegov", "index.html", "change-dp", "change.gov",
     "Dec 2008 transition leftover. 2009.gov is not this year’s gold.",
     "2009.gov as gold (trap)", "Read leftover", "checks",
     "../lehman/index.html", "Lehman leftover"),
    ("N-A12", "lehman", "index.html", "lehman-dp", "Lehman literacy",
     "15 Sep 2008. Honesty leftover. Trade / exploit never writes.",
     "Trade / exploit (trap)", "Tick leftover", "checks",
     "../justin/index.html", "Justin.tv leftover"),
    ("N-A13", "justin", "index.html", "jtv-dp", "Justin.tv",
     "2008 live leftover. Twitch brand is 2011.",
     "Twitch 2011 (trap)", "Watch leftover", "hops",
     "../ustream/index.html", "Ustream leftover"),
    ("N-A14", "ustream", "index.html", "ustream-dp", "Ustream",
     "2008 live leftover. Not Zoom. No live stream.",
     "Zoom-as-2008 (trap)", "Go leftover", "hops",
     "../vimeo/index.html", "Vimeo leftover"),
    ("N-A15", "vimeo", "index.html", "vimeo-dp", "Vimeo",
     "HD culture 2008. Title leftover. Live CDN never writes.",
     "Live CDN (trap)", "Upload leftover", "query",
     "../kongregate/index.html", "Kongregate leftover"),
    ("N-A16", "kongregate", "index.html", "kong-dp", "Kongregate",
     "Flash portal mass 2008. Play leftover. No official brand rip.",
     "Official brand rip (trap)", "Play leftover", "hops",
     "../newgrounds/index.html", "Newgrounds leftover"),
    ("N-A17", "newgrounds", "index.html", "ng-dp", "Newgrounds",
     "Portal still mass. No invented Tom Fulp art.",
     "Invented brand art (trap)", "Portal leftover", "hops",
     "../miniclip/index.html", "Miniclip leftover"),
    ("N-A18", "miniclip", "index.html", "mini-dp", "Miniclip",
     "Casual Flash mass. Play leftover.",
     "Official splash rip (trap)", "Play leftover", "hops",
     "../mafiawars/index.html", "Mafia Wars leftover"),
    ("N-A19", "mafiawars", "index.html", "mafia-dp", "Mafia Wars",
     "Zynga 2008 Facebook leftover. FarmVille is 2009.",
     "FarmVille 2009 (trap)", "Job leftover", "hops",
     "../scrabulous/index.html", "Scrabulous leftover"),
    ("N-A20", "scrabulous", "index.html", "scrab-dp", "Scrabulous",
     "Facebook scrabble 2008. Sued. No Hasbro art.",
     "Official Hasbro (trap)", "Tile leftover", "hops",
     "../wow/index.html", "WoW Wrath leftover"),
    ("N-A21", "wow", "index.html", "wotlk-dp", "World of Warcraft · Wrath",
     "13 Nov 2008. Armory leftover. Classic 2019 is not this year.",
     "Classic 2019 (trap)", "Armory leftover", "hops",
     "../spore/index.html", "Spore leftover"),
    ("N-A22", "spore", "index.html", "spore-dp", "Spore",
     "7 Sep 2008. Cell leftover. No official EA cell.",
     "Official EA cell (trap)", "Cell leftover", "hops",
     "../braid/index.html", "Braid leftover"),
    ("N-A23", "braid", "index.html", "braid-dp", "Braid",
     "6 Aug 2008. Fold leftover. No official Tim.",
     "Official Tim (trap)", "Fold leftover", "hops",
     "../lbp/index.html", "LittleBigPlanet leftover"),
    ("N-A24", "lbp", "index.html", "lbp-dp", "LittleBigPlanet",
     "NA 27 Oct 2008 · EU 5 Nov 2008 (UK after Qur'an-track recall). Sack leftover. No official Sackboy.",
     "Official Sackboy (trap)", "Sack leftover", "hops",
     "../gtaiv/index.html", "GTA IV leftover"),
    ("N-A25", "gtaiv", "index.html", "gtaiv-dp", "Grand Theft Auto IV",
     "29 Apr 2008. Load leftover. No official Rockstar art.",
     "Official Rockstar (trap)", "Load leftover", "hops",
     "../clubpenguin/index.html", "Club Penguin leftover"),
    ("N-A26", "clubpenguin", "index.html", "cp-dp", "Club Penguin",
     "Disney mass 2008. Waddle leftover. No official CP art.",
     "Official CP art (trap)", "Waddle leftover", "hops",
     "../iplayer/index.html", "BBC iPlayer leftover"),
    ("N-A27", "iplayer", "index.html", "iplayer-dp", "BBC iPlayer",
     "UK mass 2008. Play leftover. Live iPlayer never writes.",
     "Live iPlayer (trap)", "Play leftover", "hops",
     "../mint/index.html", "Mint leftover"),
    ("N-A28", "mint", "index.html", "mint-dp", "Mint.com",
     "2008 money leftover. No live bank.",
     "Live bank (trap)", "Budget leftover", "query",
     "../yelp/index.html", "Yelp leftover"),
    ("N-A29", "yelp", "index.html", "yelp-dp", "Yelp",
     "2008 S-1 class: ~15.7M uniques · ~4.69M reviews (2007 was ~5.7M / ~1.99M). GMV not dual-cited. Review leftover. No live Yelp.",
     "Live Yelp (trap)", "Review leftover", "query",
     "../etsy/index.html", "Etsy leftover"),
    ("N-A30", "etsy", "index.html", "etsy-dp", "Etsy",
     "Nov 2008 $10.8M (NYT) · year ~$88.3M (Exciting Commerce). Shop leftover. No checkout.",
     "Live checkout (trap)", "Shop leftover", "hops",
     "../limewire/index.html", "LimeWire leftover"),
    ("N-A31", "limewire", "index.html", "lime-dp", "LimeWire",
     "P2P leftover. Search leftover. Real download never writes.",
     "Real download (trap)", "Search leftover", "query",
     "../piratebay/index.html", "Pirate Bay leftover"),
    ("N-A32", "piratebay", "index.html", "tpb-dp", "The Pirate Bay literacy",
     "2008 trial weather. Literacy only. Torrent payload never writes.",
     "Torrent payload (trap)", "Literacy leftover", "checks",
     "../mobileme/index.html", "MobileMe leftover"),
    ("N-A33", "mobileme", "index.html", "mme-dp", "MobileMe",
     "Apple cloud 2008. Sync leftover. iCloud is 2011.",
     "iCloud 2011 (trap)", "Sync leftover", "hops",
     "../lively/index.html", "Google Lively leftover"),
    ("N-A34", "lively", "index.html", "lively-dp", "Google Lively",
     "Closed Dec 2008. Walk leftover. Not a 2021 metaverse.",
     "Metaverse 2021 (trap)", "Walk leftover", "hops",
     "../knol/index.html", "Google Knol leftover"),
    ("N-A35", "knol", "index.html", "knol-dp", "Google Knol",
     "2008 write leftover. Not Wikipedia gold.",
     "Wikipedia-as-this (trap)", "Write leftover", "query",
     "../hi5/index.html", "hi5 leftover"),
    # Pack B
    ("N-B01", "hi5", "index.html", "hi5-dp", "hi5",
     "comScore 2008 social mass · Latin America leftover.",
     "Facebook-as-this (trap)", "Hops leftover", "hops",
     "../orkut/index.html", "Orkut leftover"),
    ("N-B02", "orkut", "index.html", "orkut-dp", "Orkut",
     "Google’s network. Brazil / India leftover. Not the chip.",
     "G+ as 2008 (trap)", "Hops leftover", "hops",
     "../bebo/index.html", "Bebo leftover"),
    ("N-B03", "bebo", "index.html", "bebo-dp", "Bebo",
     "AOL buy March 2008 leftover.",
     "MySpace-as-dead (trap)", "Hops leftover", "hops",
     "../ning/index.html", "Ning leftover"),
    ("N-B04", "ning", "index.html", "ning-dp", "Ning",
     "Mashable: +303% in 2008. Network leftover.",
     "Facebook Platform gold (trap)", "Hops leftover", "hops",
     "../scribd/index.html", "Scribd leftover"),
    ("N-B05", "scribd", "index.html", "scribd-dp", "Scribd",
     "comScore Nov 2008 · ~23M uniques leftover.",
     "Live upload CDN (trap)", "Query leftover", "query",
     "../livespaces/index.html", "Live Spaces leftover"),
    ("N-B06", "livespaces", "index.html", "spaces-dp", "Windows Live Spaces",
     "87M Nov 2008 leftover. Not Facebook gold.",
     "Facebook-as-this (trap)", "Hops leftover", "hops",
     "../craigslist/index.html", "Craigslist leftover"),
    ("N-B07", "craigslist", "index.html", "cl-dp", "Craigslist",
     "comScore top-50 2008. Hops leftover.",
     "Live post (trap)", "Hops leftover", "hops",
     "../weather/index.html", "Weather leftover"),
    ("N-B08", "weather", "index.html", "wx-dp", "Weather leftover",
     "Weather Channel class 2008. Query leftover.",
     "Live radar (trap)", "Query leftover", "query",
     "../nyt/index.html", "NYT leftover"),
    ("N-B09", "nyt", "index.html", "nyt-dp", "New York Times leftover",
     "Mass news 2008. Paywall later. Hops leftover.",
     "Live subscribe (trap)", "Hops leftover", "hops",
     "../bbc/index.html", "BBC leftover"),
    ("N-B10", "bbc", "index.html", "bbc-dp", "BBC leftover",
     "News leftover. iPlayer is N-A27, not this dest’s gold.",
     "iPlayer-as-this-gold (trap)", "Hops leftover", "hops",
     "../huffpo/index.html", "Huffington Post leftover"),
    ("N-B11", "huffpo", "index.html", "huff-dp", "Huffington Post",
     "2008 blog leftover.",
     "Live comment (trap)", "Hops leftover", "hops",
     "../gizmodo/index.html", "Gizmodo leftover"),
    ("N-B12", "gizmodo", "index.html", "giz-dp", "Gizmodo",
     "Gadget blog leftover 2008.",
     "Official Apple art (trap)", "Hops leftover", "hops",
     "../engadget/index.html", "Engadget leftover"),
    ("N-B13", "engadget", "index.html", "eng-dp", "Engadget",
     "Gadget blog leftover 2008.",
     "Official brand art (trap)", "Hops leftover", "hops",
     "../ars/index.html", "Ars Technica leftover"),
    ("N-B14", "ars", "index.html", "ars-dp", "Ars Technica",
     "Tech leftover 2008.",
     "Live subscribe (trap)", "Hops leftover", "hops",
     "../collegehumor/index.html", "CollegeHumor leftover"),
    ("N-B15", "collegehumor", "index.html", "ch-dp", "CollegeHumor",
     "2008 clip leftover. No live video.",
     "Live CDN (trap)", "Hops leftover", "hops",
     "../funnyordie/index.html", "Funny or Die leftover"),
    ("N-B16", "funnyordie", "index.html", "fod-dp", "Funny or Die",
     "2008 clip leftover.",
     "Live CDN (trap)", "Hops leftover", "hops",
     "../icanhas/index.html", "I Can Has leftover"),
    ("N-B17", "icanhas", "index.html", "ichc-dp", "I Can Has Cheezburger",
     "Meme leftover 2008.",
     "Invented lolcat art as WA (trap)", "Hops leftover", "hops",
     "../failblog/index.html", "Failblog leftover"),
    ("N-B18", "failblog", "index.html", "fail-dp", "Failblog",
     "Meme leftover 2008.",
     "Invented brand art (trap)", "Hops leftover", "hops",
     "../xkcd/index.html", "xkcd leftover"),
    ("N-B19", "xkcd", "index.html", "xkcd-dp", "xkcd",
     "2008 comic leftover. No official Randall art.",
     "Official comic rip (trap)", "Hops leftover", "hops",
     "../onion/index.html", "The Onion leftover"),
    ("N-B20", "onion", "index.html", "onion-dp", "The Onion",
     "Satire leftover 2008.",
     "Live subscribe (trap)", "Hops leftover", "hops",
     "../ytmnd/index.html", "YTMND leftover"),
    ("N-B21", "ytmnd", "index.html", "ytmnd-dp", "YTMND",
     "2008 site leftover.",
     "Live host (trap)", "Hops leftover", "hops",
     "../disqus/index.html", "Disqus leftover"),
    ("N-B22", "disqus", "index.html", "disqus-dp", "Disqus",
     "Comments leftover 2008.",
     "Live comment API (trap)", "Hops leftover", "hops",
     "../plurk/index.html", "Plurk leftover"),
    ("N-B23", "plurk", "index.html", "plurk-dp", "Plurk",
     "2008 timeline leftover. Not Twitter gold.",
     "Twitter-as-this (trap)", "Hops leftover", "hops",
     "../duckduckgo/index.html", "DuckDuckGo leftover"),
    ("N-B24", "duckduckgo", "index.html", "ddg-dp", "DuckDuckGo",
     "Founded Sep 2008 leftover. Not a Google-killer. Not the chip.",
     "Google-killer won (trap)", "Query leftover", "query",
     "../pandora/index.html", "Pandora leftover"),
    ("N-B25", "pandora", "index.html", "pandora-dp", "Pandora",
     "Radio leftover 2008. No live stream.",
     "Live stream (trap)", "Hops leftover", "hops",
     "../imeem/index.html", "Imeem leftover"),
    ("N-B26", "imeem", "index.html", "imeem-dp", "Imeem",
     "Music social leftover 2008.",
     "Spotify US (trap)", "Hops leftover", "hops",
     "../tripadvisor/index.html", "TripAdvisor leftover"),
    ("N-B27", "tripadvisor", "index.html", "ta-dp", "TripAdvisor",
     "Travel leftover 2008.",
     "Live book (trap)", "Hops leftover", "hops",
     "../kayak/index.html", "Kayak leftover"),
    ("N-B28", "kayak", "index.html", "kayak-dp", "Kayak",
     "Metasearch leftover 2008.",
     "Live fare (trap)", "Query leftover", "query",
     "../zillow/index.html", "Zillow leftover"),
    ("N-B29", "zillow", "index.html", "zillow-dp", "Zillow",
     "Housing leftover 2008. Crisis weather. No live listing.",
     "Live listing (trap)", "Query leftover", "query",
     "../flash10/index.html", "Flash 10 leftover"),
    ("N-B30", "flash10", "index.html", "flash10-dp", "Adobe Flash 10 leftover",
     "2008 plugin leftover. No official splash rip.",
     "Official splash as WA (trap)", "Tick leftover", "checks",
     "../silverlight/index.html", "Silverlight leftover"),
    ("N-B31", "silverlight", "index.html", "silver-dp", "Microsoft Silverlight leftover",
     "2008 plugin leftover. Not January chrome.",
     "Silverlight-as-shell (trap)", "Tick leftover", "checks",
     "../html5/index.html", "HTML5 leftover"),
    ("N-B32", "html5", "index.html", "html5-dp", "HTML5 leftover",
     "Jan 2008 draft leftover. Apps still won the year. Not the chip.",
     "HTML5 beat apps (trap)", "Tick leftover", "checks",
     "../opensocial/index.html", "OpenSocial leftover"),
    ("N-B33", "opensocial", "index.html", "osoc-dp", "OpenSocial leftover",
     "675 million registered class Nov 2008. Facebook held out.",
     "Facebook joined (trap)", "Hops leftover", "hops",
     "../ie8/index.html", "IE8 leftover"),
    ("N-B34", "ie8", "index.html", "ie8-dp", "Internet Explorer 8 beta leftover",
     "Beta leftover. January shell stays IE7.",
     "IE8 as January shell (trap)", "Tick leftover", "checks",
     "../windows7/index.html", "Windows 7 leftover"),
    ("N-B35", "windows7", "index.html", "win7-dp", "Windows 7 PDC leftover",
     "Announce room. Not January OS. Desktop stays XP.",
     "Win7 January OS (trap)", "Tick leftover", "checks",
     "../addicting/index.html", "AddictingGames leftover"),
    # Pack C
    ("N-C01", "addicting", "index.html", "ag-dp", "AddictingGames",
     "Casual Flash leftover 2008.",
     "Official brand rip (trap)", "Play leftover", "hops",
     "../armorgames/index.html", "Armor Games leftover"),
    ("N-C02", "armorgames", "index.html", "armor-dp", "Armor Games",
     "Flash portal leftover 2008.",
     "Official brand rip (trap)", "Play leftover", "hops",
     "../pogo/index.html", "Pogo leftover"),
    ("N-C03", "pogo", "index.html", "pogo-dp", "Pogo",
     "EA parlor leftover 2008.",
     "Live lobby (trap)", "Play leftover", "hops",
     "../neopets/index.html", "Neopets leftover"),
    ("N-C04", "neopets", "index.html", "neo-dp", "Neopets",
     "Pet leftover 2008. Not 1999 gold.",
     "1999 star (trap)", "Hops leftover", "hops",
     "../habbo/index.html", "Habbo leftover"),
    ("N-C05", "habbo", "index.html", "habbo-dp", "Habbo",
     "Hotel leftover 2008.",
     "Official Sulake art (trap)", "Hops leftover", "hops",
     "../gaia/index.html", "Gaia leftover"),
    ("N-C06", "gaia", "index.html", "gaia-dp", "Gaia Online",
     "Dress-up leftover 2008.",
     "Official art (trap)", "Hops leftover", "hops",
     "../runescape/index.html", "RuneScape leftover"),
    ("N-C07", "runescape", "index.html", "rs-dp", "RuneScape",
     "Browser MMO leftover 2008.",
     "Live login (trap)", "Hops leftover", "hops",
     "../webkinz/index.html", "Webkinz leftover"),
    ("N-C08", "webkinz", "index.html", "wk-dp", "Webkinz",
     "Toy-to-web leftover 2008.",
     "Live code (trap)", "Hops leftover", "hops",
     "../secondlife/index.html", "Second Life leftover"),
    ("N-C09", "secondlife", "index.html", "sl-dp", "Second Life",
     "Grid leftover 2008. Crisis hit virtual land too.",
     "Live L$ (trap)", "Hops leftover", "hops",
     "../xboxlive/index.html", "Xbox Live leftover"),
    ("N-C10", "xboxlive", "index.html", "xbl-dp", "Xbox Live leftover",
     "Console leftover 2008. No official blade art.",
     "Official blade (trap)", "Hops leftover", "hops",
     "../wii/index.html", "Wii leftover"),
    ("N-C11", "wii", "index.html", "wii-dp", "Wii leftover",
     "2008 living-room leftover.",
     "Official Nintendo art (trap)", "Hops leftover", "hops",
     "../psn/index.html", "PSN leftover"),
    ("N-C12", "psn", "index.html", "psn-dp", "PlayStation Network leftover",
     "2008 leftover. No official Sony art.",
     "Official Sony art (trap)", "Hops leftover", "hops",
     "../ign/index.html", "IGN leftover"),
    ("N-C13", "ign", "index.html", "ign-dp", "IGN leftover",
     "Games press leftover 2008.",
     "Live score (trap)", "Hops leftover", "hops",
     "../wow/armory.html", "WoW Armory leftover"),
    ("N-C14", "wow", "armory.html", "armory-dp", "WoW Armory leftover",
     "Second path of Wrath. Not the chip.",
     "Classic 2019 (trap)", "Armory leftover", "hops",
     "../megaupload/index.html", "Megaupload leftover"),
    ("N-C15", "megaupload", "index.html", "mega-dp", "Megaupload literacy",
     "Host leftover. No real upload.",
     "Real host (trap)", "Tick leftover", "checks",
     "../rapidshare/index.html", "RapidShare leftover"),
    ("N-C16", "rapidshare", "index.html", "rsfile-dp", "RapidShare leftover",
     "Host leftover. No real upload.",
     "Real host (trap)", "Tick leftover", "checks",
     "../skydrive/index.html", "SkyDrive leftover"),
    ("N-C17", "skydrive", "index.html", "sky-dp", "Windows Live SkyDrive leftover",
     "2008 cloud leftover. OneDrive is later.",
     "OneDrive 2014 (trap)", "Hops leftover", "hops",
     "../heroku/index.html", "Heroku leftover"),
    ("N-C18", "heroku", "index.html", "heroku-dp", "Heroku leftover",
     "2008 deploy leftover. No live dyno.",
     "Live GCP (trap)", "Query leftover", "query",
     "../bitbucket/index.html", "Bitbucket leftover"),
    ("N-C19", "bitbucket", "index.html", "bb-dp", "Bitbucket leftover",
     "2008 forge leftover. GitHub issue stays the star.",
     "GitHub-issue-as-gold (trap)", "Hops leftover", "hops",
     "../wikileaks/index.html", "WikiLeaks leftover"),
    ("N-C20", "wikileaks", "index.html", "wl-dp", "WikiLeaks leftover",
     "2008 leftover. No leak dump.",
     "Leak dump (trap)", "Tick leftover", "checks",
     "../chanology/index.html", "Chanology leftover"),
    ("N-C21", "chanology", "index.html", "chan-dp", "Project Chanology literacy",
     "2008 leftover. No raid.",
     "Raid (trap)", "Tick leftover", "checks",
     "../failwhale/index.html", "Fail Whale leftover"),
    ("N-C22", "failwhale", "index.html", "whale-dp", "Fail Whale leftover",
     "Twitter costume 2008. Not the tweet gold.",
     "Tweet gold (trap)", "Hops leftover", "hops",
     "../seesmic/index.html", "Seesmic leftover"),
    ("N-C23", "seesmic", "index.html", "see-dp", "Seesmic leftover",
     "2008 Twitter client leftover.",
     "X rebrand (trap)", "Hops leftover", "hops",
     "../identica/index.html", "Identi.ca leftover"),
    ("N-C24", "identica", "index.html", "identica-dp", "Identi.ca leftover",
     "2008 federated leftover. Not Twitter gold.",
     "Twitter-as-this (trap)", "Hops leftover", "hops",
     "../appengine/index.html", "App Engine leftover"),
    ("N-C25", "appengine", "index.html", "gae-dp", "Google App Engine leftover",
     "2008 deploy leftover. No live GCP.",
     "Live GCP (trap)", "Query leftover", "query",
     "../stumbleupon/index.html", "StumbleUpon leftover"),
    ("N-C26", "stumbleupon", "index.html", "stumble-dp", "StumbleUpon leftover",
     "2008 toolbar leftover. 2002 star stays 2002.",
     "2002 gold (trap)", "Hops leftover", "hops",
     "../digg/more.html", "Digg leftover 2×"),
    ("N-C27", "digg", "more.html", "digg-lx", "Digg leftover 2×",
     "Second path. Not the chip.",
     "Digg-as-gold (trap)", "Hops leftover", "hops",
     "../reddit/more.html", "Reddit leftover 2×"),
    ("N-C28", "reddit", "more.html", "rd-lx", "Reddit leftover 2×",
     "Second path. Not the chip.",
     "Reddit-as-gold (trap)", "Hops leftover", "hops",
     "../myspace/us.html", "MySpace US leftover"),
    ("N-C29", "myspace", "us.html", "ms-us", "MySpace still wins the US",
     "May 2008: Facebook passes MySpace worldwide. US still MySpace 73.7 vs 35.6.",
     "MySpace already dead in the US (trap)", "Hops leftover", "hops",
     "../geocities/more.html", "GeoCities leftover 2×"),
    ("N-C30", "geocities", "more.html", "geo-lx", "GeoCities still #6 leftover",
     "comScore Nov 2008 · 69M. Second path.",
     "GeoCities-as-2008-gold (trap)", "Hops leftover", "hops",
     "../flickr/more.html", "Flickr leftover 2×"),
    ("N-C31", "flickr", "more.html", "flickr-lx", "Flickr leftover 2×",
     "64M Nov 2008. Second path.",
     "Flickr-as-gold (trap)", "Hops leftover", "hops",
     "../delicious/more.html", "Delicious leftover 2×"),
    ("N-C32", "delicious", "more.html", "del-lx", "del.icio.us leftover 2×",
     "Second path. Not the chip.",
     "Delicious-as-gold (trap)", "Hops leftover", "hops",
     "../friendster/asia.html", "Friendster Asia leftover"),
    ("N-C33", "friendster", "asia.html", "fs-asia", "Friendster Asia leftover",
     "US dead. Asia leftover 2008.",
     "US Friendster mass (trap)", "Hops leftover", "hops",
     "../github/about.html", "GitHub literacy leftover"),
    ("N-C34", "github", "about.html", "github-lx", "GitHub literacy leftover",
     "Literacy only. This dest never writes itt08-github.",
     "Write the gold issue (trap)", "Tick leftover", "checks",
     "../youtube/hd.html", "YouTube HD leftover"),
    ("N-C35", "youtube", "hd.html", "ythd-dp", "YouTube 720p leftover",
     "Dec 2008 HD class. Not the YouTube gold.",
     "YouTube gold (trap)", "Hops leftover", "hops",
     "../github/issue.html", "★ GitHub issue"),
]


def lo_block(suffix: str, verb: str, trap: str, kind: str, nxt: str, nlab: str, need_pick: str = "", min_pick: int = 0) -> str:
    field = ""
    hops = ""
    need = f' data-lo-need-pick="{need_pick}"' if need_pick else ""
    mp = f' data-lo-min-pick="{min_pick}"' if min_pick else ""
    if kind == "query":
        field = (
            f'<p><label>{verb}. Incomplete never writes. Not the year star.<br>'
            f'<input type="text" data-lo-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></label></p>\n'
        )
    elif kind == "wait":
        hops = f'<p><button type="button" data-lo-wait>{verb} wait</button></p>\n'
    elif kind == "hops":
        hops = (
            f'<p><button type="button" data-lo-pick="keep">{verb}</button> '
            f'<button type="button" data-lo-pick="trap">{trap}</button></p>\n'
        )
        need = ' data-lo-need-pick="keep"'
    page = f"""<!-- ITT-LO-OFFICIAL:{suffix}:start -->
<div data-lo-panel="1" data-itt-year="2008" class="itt-2008-machine" style="margin:14px auto;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">2008 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{trap}</button></p>
{field}{hops}<p><label><input type="checkbox" data-lo-req> Leftover 2008 · not the year star.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{suffix}"{need}{mp}>{verb}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt08-{suffix}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
</div>
<!-- ITT-LO-OFFICIAL:{suffix}:end -->
"""
    return page


def fourx_block(go: str, verb: str, trap: str, kind: str, nxt: str, nlab: str) -> str:
    if kind == "query":
        inner = f'<p><input type="text" data-4x-field maxlength="80" placeholder="{verb.lower()}" autocomplete="off"></p>\n'
        k = "query"
    elif kind == "checks":
        inner = (
            '<p><label><input type="checkbox" data-4x-req> Leftover 2008 · not the star.</label></p>\n'
            '<p><label><input type="checkbox" data-4x-req> Empty / trap never writes.</label></p>\n'
        )
        k = "checks"
    elif kind == "wait":
        inner = f'<p><button type="button" data-4x-wait data-4x-wait-ms="2000">{verb} wait</button></p>\n'
        k = "wait"
    else:
        inner = (
            f'<p><button type="button" data-4x-hop="a">{verb} room</button> '
            f'<button type="button" data-4x-hop="b">{verb} second path</button></p>\n'
        )
        k = "hops"
    return f"""<!-- ITT-4X:{go}:start -->
<section data-4x-panel data-4x-kind="{k}" data-4x-min="2" style="margin:14px auto;padding:12px;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#e3f2fd;color:#111">
<p><b>{verb}</b> · leftover 4× · not the chip · empty go never writes · <code>itt08-{go}</code></p>
{inner}<p>
 <button type="button" data-4x-go="{go}">{verb}</button>
 <button type="button" data-4x-hop="trap" hidden>{trap}</button>
 <span data-4x-status></span>
</p>
<p hidden data-4x-result></p>
<p hidden data-next-flow data-next-when-key="itt08-{go}"><b>Next:</b> <a href="{nxt}">{nlab}</a></p>
</section>
<!-- ITT-4X:{go}:end -->
"""


def page_html(title: str, thesis: str, trap: str, body_extra: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2008">
<head>
<meta charset="utf-8">
<title>{title} — 2008 leftover</title>
<link rel="stylesheet" href="../../../../css/period-2008.css">
</head>
<body bgcolor="#ece9d8" text="#111" link="#00e" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:13px">
<p class="crumb" style="font-size:12px"><a href="../../pages/home.html">Starting Point</a> · <a href="../../pages/map.html">Map</a> · <a href="../github/issue.html">★ GitHub issue</a></p>
<h1>{title}</h1>
<p>{thesis}</p>
<p class="itt-pixel-failed">[failed-final] Period mark · CSS / wordmark only · never invent brand pixels</p>
<p class="itt-trap-label">{trap}</p>
{body_extra}
</div>
<script src="../../../../js/immersion-2008.js"></script>
</body>
</html>
"""


def insert_before_script_or_body(text: str, block: str) -> str:
    if block.strip() in text:
        return text
    for mark in ("<script src=", "</body>"):
        i = text.rfind(mark)
        if i >= 0:
            return text[:i] + block + text[i:]
    return text.rstrip() + "\n" + block


def write_dest(row: tuple) -> str:
    _id, folder, fname, suffix, title, thesis, trap, verb, kind, nxt, nlab = row
    dest_dir = SITES / folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    path = dest_dir / fname
    lo = lo_block(suffix, verb, trap, kind, nxt, nlab)
    lo_d2 = lo_block(suffix + "-d2", verb + " 2×", trap, "hops", nxt, nlab, need_pick="keep")
    fx = fourx_block(suffix + "-4x", verb, trap, kind, nxt, nlab)
    machines = lo + lo_d2 + fx
    if path.exists():
        t = path.read_text(encoding="utf-8", errors="replace")
        if f'data-lo-key="{suffix}"' in t:
            return "skip"
        path.write_text(insert_before_script_or_body(t, machines), encoding="utf-8")
        return "append"
    html = insert_before_script_or_body(page_html(title, thesis, trap), machines)
    path.write_text(html, encoding="utf-8")
    about = dest_dir / "about.html"
    if fname == "index.html" and not about.exists():
        about_html = page_html(title + " · about", thesis + " About leftover. Not the chip.", trap)
        about.write_text(
            insert_before_script_or_body(
                about_html,
                lo_block(
                    suffix + "-ab",
                    "About leftover",
                    trap,
                    "checks",
                    "index.html",
                    title,
                ),
            ),
            encoding="utf-8",
        )
    return "write"


def patch_urlmap(hrefs: list[str]) -> int:
    cfg = ROOT / "js/config/2008.js"
    text = cfg.read_text(encoding="utf-8")
    added = 0
    # insert before last urlMap close — find "pages/whats-new" block end area: after first urlMap key we append at start of urlMap
    m = re.search(r"urlMap:\s*\{", text)
    if not m:
        raise SystemExit("no urlMap")
    insert_at = m.end()
    chunk = []
    for href in hrefs:
        if f'"{href}"' in text:
            continue
        chunk.append(f'      "{href}": "http://museum.local/years/2008/{href}",\n')
        added += 1
    if chunk:
        text = text[:insert_at] + "\n" + "".join(chunk) + text[insert_at:]
        cfg.write_text(text, encoding="utf-8")
    return added


def matrix_rows() -> tuple[list, list]:
    lo = []
    x2 = []
    for row in DESTS:
        _id, folder, fname, suffix, title, thesis, trap, verb, kind, nxt, nlab = row
        href = f"sites/{folder}/{fname}"
        field = kind == "query"
        min_pick = 2 if kind == "hops" else 0
        need = "keep" if kind == "hops" else ""
        for suf, extra_need, extra_min, extra_field in (
            (suffix, need, min_pick, field),
            (suffix + "-d2", "keep", 0, False),
        ):
            lo.append({
                "year": "2008",
                "href": href,
                "key": f"itt08-{suf}",
                "suffix": suf,
                "needPick": extra_need,
                "minPick": extra_min,
                "field": extra_field,
                "placeholder": verb.lower() if extra_field else "",
            })
        x2.append({
            "year": "2008",
            "path": f"/years/2008/{href}",
            "key": f"itt08-{suffix}",
            "kind": kind if kind != "wait" else "query",
            "title": f"2008 leftover · {suffix}",
            "next": f"/years/2008/sites/{nxt.replace('../','')}" if nxt.startswith("../") else nxt,
            "nextLabel": nlab,
        })
    return lo, x2


def merge_lo(new_rows: list) -> int:
    p = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    have = {(d["year"], d["href"], d["suffix"]) for d in data["dests"]}
    n = 0
    for r in new_rows:
        sig = (r["year"], r["href"], r["suffix"])
        if sig in have:
            continue
        data["dests"].append(r)
        have.add(sig)
        n += 1
    p.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return n


def merge_x2(new_rows: list) -> int:
    p = ROOT / "e2e" / "2x-links.matrix.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    have = {(r.get("year"), r.get("path"), r.get("key")) for r in data}
    n = 0
    for r in new_rows:
        sig = (r["year"], r["path"], r["key"])
        if sig in have:
            continue
        data.append(r)
        have.add(sig)
        n += 1
    p.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return n


def patch_start_extra() -> None:
    p = ROOT / "ui" / "year" / "start-extra.js"
    text = p.read_text(encoding="utf-8")
    if 'id="ott-2x-2008"' in text:
        return
    links = []
    for row in DESTS:
        if not row[0].startswith("N-A"):
            continue
        folder, fname, title = row[1], row[2], row[4]
        href = f"../sites/{folder}/{fname}"
        links.append(f'<a href="{href}">{title}</a>')
    strip = (
        '<p class="itt-2x-2008" id="ott-2x-2008" style="margin:10px 0;padding:8px;border:1px dashed #888;font-size:12px;max-width:48em">'
        "<b>CUT-DOUBLE Pack A · below guided</b> · "
        + " · ".join(links)
        + "</p>\\n"
    )
    # inject after 2008 mass-honesty open by replacing the 2008 value start
    needle = '"2008": "'
    i = text.find(needle)
    if i < 0:
        raise SystemExit("no 2008 start-extra")
    j = i + len(needle)
    text = text[:j] + strip + text[j:]
    p.write_text(text, encoding="utf-8")


def main() -> None:
    counts = {"write": 0, "append": 0, "skip": 0}
    hrefs = []
    for row in DESTS:
        action = write_dest(row)
        counts[action] = counts.get(action, 0) + 1
        hrefs.append(f"sites/{row[1]}/{row[2]}")
        if row[2] == "index.html":
            hrefs.append(f"sites/{row[1]}/about.html")
    added_map = patch_urlmap(hrefs)
    lo, x2 = matrix_rows()
    nlo = merge_lo(lo)
    nx2 = merge_x2(x2)
    patch_start_extra()
    print("dests", len(DESTS), counts, "urlMap+", added_map, "lo+", nlo, "x2+", nx2)


if __name__ == "__main__":
    main()
