#!/usr/bin/env python3
"""Next 2× pass — Band B 18→36 leftover REAL writers on existing rooms.

Research: docs/2X-LINKS-EVERY-YEAR-NEXT-PASS-RESEARCH-GOALS-PHASES-MINUTE-2026-08-26.md
Does not: move stars, grow guided <ol>, dest-field plaques, invent folders, restore 2005–2007.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent: ITT-4X:suffix markers.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

VERB = {
    "query": "Type leftover",
    "checks": "Ack leftover",
    "hops": "Hop leftover",
    "wait": "Save leftover",
}

PREFIX = {
    "1994": "itt94",
    "1995": "itt95",
    "1996": "itt96",
    "1997": "itt97",
    "1998": "itt98",
    "1999": "itt99",
    "2000": "itt00",
    "2001": "itt01",
    "2002": "itt02",
    "2003": "itt03",
    "2004": "itt04",
    "2008": "itt08",
    "2009": "itt09",
    "2010": "itt10",
    "2011": "itt11",
    "2012": "itt12",
    "2013": "itt13",
    "2014": "itt14",
    "2022": "itt22",
}

STAR_HREF = {
    "1994": "sites/csotd/index.html",
    "1995": "sites/amazon/ssl-checkout.html",
    "1996": "sites/portals/wars.html",
    "1997": "sites/pointcast/index.html",
    "1998": "sites/google/lucky.html",
    "1999": "sites/aim/index.html",
    "2000": "sites/mapquest/index.html",
    "2001": "sites/wikipedia/edit.html",
    "2002": "sites/stumbleupon/index.html",
    "2003": "sites/photobucket/index.html",
    "2004": "sites/facebook/networks.html",
    "2008": "sites/github/index.html",
    "2009": "sites/facebook/index.html",
    "2010": "sites/instagram/index.html",
    "2011": "sites/googleplus/index.html",
    "2012": "sites/instagram/android.html",
    "2013": "sites/vine/index.html",
    "2014": "sites/whatsapp/index.html",
    "2022": "sites/chatgpt/index.html",
}

STAR_LABEL = {
    "1994": "★ Cool Site of the Day",
    "1995": "★ Amazon SSL",
    "1996": "★ Portal wars",
    "1997": "★ PointCast",
    "1998": "★ I'm Feeling Lucky",
    "1999": "★ AIM",
    "2000": "★ MapQuest",
    "2001": "★ Wikipedia edit",
    "2002": "★ StumbleUpon",
    "2003": "★ Photobucket",
    "2004": "★ thefacebook",
    "2008": "★ GitHub leftover",
    "2009": "★ Facebook Like",
    "2010": "★ Instagram iOS",
    "2011": "★ Google+",
    "2012": "★ IG Android",
    "2013": "★ Vine 6s",
    "2014": "★ WhatsApp Install",
    "2022": "★ ChatGPT Send",
}

# year, rel, suffix, kind, title, extra, next_rel, next_label
INJECT: list[tuple] = []


def F(year, rel, suffix, kind, title, extra, nxt, nl):
    INJECT.append((year, rel, suffix, kind, title, extra, nxt, nl))


# ----- 2001 -----
F("2001", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2×",
  "aol leftover", "sites/about/index.html", "About.com leftover")
F("2001", "sites/about/index.html", "about-lx", "query", "About.com leftover 2×",
  "about leftover", "sites/cnn/index.html", "CNN leftover")
F("2001", "sites/cnn/index.html", "cnn-lx", "hops", "CNN leftover 2×",
  [("news", "News leftover"), ("world", "World leftover")],
  "sites/gamespot/index.html", "GameSpot leftover")
F("2001", "sites/gamespot/index.html", "gs-lx", "query", "GameSpot leftover 2×",
  "gamespot leftover", "sites/geocities/index.html", "GeoCities leftover")
F("2001", "sites/geocities/index.html", "geo-lx", "checks", "Geocities leftover 2×",
  ["2001 leftover · not the chip", "Homestead leftover"],
  "sites/icq/index.html", "ICQ leftover")
F("2001", "sites/icq/index.html", "icq-lx", "query", "ICQ leftover 2×",
  "icq leftover", "sites/paypal/index.html", "PayPal leftover")
F("2001", "sites/paypal/index.html", "pp-lx", "checks", "Paypal leftover 2×",
  ["PayPal leftover · not a real transfer", "Not the chip"],
  "sites/slashdot/index.html", "Slashdot leftover")
F("2001", "sites/slashdot/index.html", "sd-lx", "query", "Slashdot leftover 2×",
  "slashdot leftover", "sites/limewire/index.html", "LimeWire leftover")
F("2001", "sites/limewire/index.html", "lw-lx", "checks", "Limewire leftover 2×",
  ["No real P2P bytes", "Museum theater only"],
  "sites/morpheus/index.html", "Morpheus leftover")
F("2001", "sites/morpheus/index.html", "morph-lx", "query", "Morpheus leftover 2×",
  "morpheus leftover", "sites/habbo/index.html", "Habbo leftover")
F("2001", "sites/habbo/index.html", "habbo-lx", "query", "Habbo leftover 2×",
  "habbo leftover", "sites/runescape/index.html", "RuneScape leftover")
F("2001", "sites/runescape/index.html", "rs-lx", "query", "RuneScape leftover 2×",
  "runescape leftover", "sites/itunes/index.html", "iTunes leftover")
F("2001", "sites/itunes/index.html", "it-lx", "checks", "Itunes leftover 2×",
  ["No Store in 2001", "Library leftover only"],
  "sites/macromedia/index.html", "Macromedia leftover")
F("2001", "sites/macromedia/index.html", "mm-lx", "query", "Macromedia leftover 2×",
  "shockwave leftover", "sites/encarta/index.html", "Encarta leftover")
F("2001", "sites/encarta/index.html", "enc-lx", "query", "Encarta leftover 2×",
  "encarta leftover", "sites/askjeeves/index.html", "Ask Jeeves leftover")
F("2001", "sites/askjeeves/index.html", "ask-lx", "query", "Ask Jeeves leftover 2×",
  "ask leftover", "sites/dmoz/index.html", "DMOZ leftover")
F("2001", "sites/dmoz/index.html", "dmoz-lx", "hops", "DMOZ leftover 2×",
  [("arts", "Arts leftover"), ("comp", "Computers leftover")],
  "sites/moreover/index.html", "Moreover leftover")
F("2001", "sites/moreover/index.html", "more-lx", "query", "Moreover leftover 2×",
  "moreover leftover", "sites/wikipedia/edit.html", "★ Wikipedia edit")

# ----- 2002 -----
F("2002", "sites/friendster/index.html", "fs-lx", "checks", "Friendster leftover 2×",
  ["2002 leftover · mass often 2003", "Not the chip"],
  "sites/livejournal/index.html", "LiveJournal leftover")
F("2002", "sites/livejournal/index.html", "lj-lx", "query", "LiveJournal leftover 2×",
  "livejournal leftover", "sites/meetup/index.html", "Meetup leftover")
F("2002", "sites/meetup/index.html", "mu-lx", "query", "Meetup leftover 2×",
  "meetup leftover", "sites/deviantart/index.html", "DeviantArt leftover")
F("2002", "sites/deviantart/index.html", "da-lx", "query", "DeviantArt leftover 2×",
  "deviant leftover", "sites/lastfm/index.html", "last.fm leftover")
F("2002", "sites/lastfm/index.html", "lfm-lx", "query", "last.fm leftover 2×",
  "lastfm leftover", "sites/steam/index.html", "Steam leftover")
F("2002", "sites/steam/index.html", "st-lx", "checks", "Steam leftover 2×",
  ["2002 leftover · no store cart", "Not the chip"],
  "sites/netflix/index.html", "Netflix leftover")
F("2002", "sites/netflix/index.html", "nf-lx", "query", "Netflix leftover 2×",
  "dvd leftover", "sites/wired/index.html", "Wired leftover")
F("2002", "sites/wired/index.html", "wired-lx", "query", "Wired leftover 2×",
  "wired leftover", "sites/somethingawful/index.html", "Something Awful leftover")
F("2002", "sites/somethingawful/index.html", "sa-lx", "query", "Something Awful leftover 2×",
  "sa leftover", "sites/fotolog/index.html", "Fotolog leftover")
F("2002", "sites/fotolog/index.html", "fl-lx", "query", "Fotolog leftover 2×",
  "fotolog leftover", "sites/xanga/index.html", "Xanga leftover")
F("2002", "sites/xanga/index.html", "xg-lx", "query", "Xanga leftover 2×",
  "xanga leftover", "sites/typepad/index.html", "TypePad leftover")
F("2002", "sites/typepad/index.html", "tp-lx", "query", "TypePad leftover 2×",
  "typepad leftover", "sites/bbc/index.html", "BBC leftover")
F("2002", "sites/bbc/index.html", "bbc-lx", "hops", "BBC leftover 2×",
  [("news", "News leftover"), ("world", "World leftover")],
  "sites/aol/index.html", "AOL leftover")
F("2002", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2×",
  "aol leftover", "sites/msn/index.html", "MSN leftover")
F("2002", "sites/msn/index.html", "msn-lx", "query", "MSN leftover 2×",
  "msn leftover", "sites/ebay/index.html", "eBay leftover")
F("2002", "sites/ebay/index.html", "ebay-lx", "query", "eBay leftover 2×",
  "ebay leftover", "sites/kazaa/index.html", "KaZaA leftover")
F("2002", "sites/kazaa/index.html", "kz-lx", "checks", "Kazaa leftover 2×",
  ["No real P2P bytes", "Museum theater only"],
  "sites/technorati/index.html", "Technorati leftover")
F("2002", "sites/technorati/index.html", "tech-lx", "query", "Technorati leftover 2×",
  "technorati leftover", "sites/stumbleupon/index.html", "★ StumbleUpon")

# ----- 2003 -----
F("2003", "sites/linkedin/index.html", "li-lx", "query", "LinkedIn leftover 2×",
  "linkedin leftover", "sites/wordpress/index.html", "WordPress leftover")
F("2003", "sites/wordpress/index.html", "wp-lx", "query", "WordPress leftover 2×",
  "wordpress leftover", "sites/skype/index.html", "Skype leftover")
F("2003", "sites/skype/index.html", "sk-lx", "checks", "Skype leftover 2×",
  ["2003 leftover · no live call", "Not the chip"],
  "sites/hi5/index.html", "hi5 leftover")
F("2003", "sites/hi5/index.html", "hi5-lx", "query", "hi5 leftover 2×",
  "hi5 leftover", "sites/4chan/index.html", "4chan leftover")
F("2003", "sites/4chan/index.html", "4c-lx", "checks", "4Chan leftover 2×",
  ["Literacy leftover · not a dump", "Not the chip"],
  "sites/secondlife/index.html", "Second Life leftover")
F("2003", "sites/secondlife/index.html", "sl-lx", "query", "Second Life leftover 2×",
  "secondlife leftover", "sites/newgrounds/index.html", "Newgrounds leftover")
F("2003", "sites/newgrounds/index.html", "ng-lx", "query", "Newgrounds leftover 2×",
  "newgrounds leftover", "sites/walmart/index.html", "Walmart leftover")
F("2003", "sites/walmart/index.html", "wm-lx", "query", "Walmart leftover 2×",
  "walmart leftover", "sites/cnet/index.html", "CNET leftover")
F("2003", "sites/cnet/index.html", "cnet-lx", "query", "CNET leftover 2×",
  "cnet leftover", "sites/evite/index.html", "Evite leftover")
F("2003", "sites/evite/index.html", "ev-lx", "query", "Evite leftover 2×",
  "evite leftover", "sites/imageshack/index.html", "ImageShack leftover")
F("2003", "sites/imageshack/index.html", "is-lx", "query", "ImageShack leftover 2×",
  "imageshack leftover", "sites/delicious/index.html", "del.icio.us leftover")
F("2003", "sites/delicious/index.html", "del-lx", "query", "del.icio.us leftover 2×",
  "delicious leftover", "sites/tribe/index.html", "Tribe leftover")
F("2003", "sites/tribe/index.html", "tr-lx", "query", "Tribe leftover 2×",
  "tribe leftover", "sites/zengarden/index.html", "CSS Zen Garden leftover")
F("2003", "sites/zengarden/index.html", "css-lx", "hops", "CSS Zen Garden leftover 2×",
  [("css", "CSS leftover"), ("garden", "Garden leftover")],
  "sites/friendster/index.html", "Friendster leftover")
F("2003", "sites/friendster/index.html", "fs-lx", "checks", "Friendster leftover 2×",
  ["Founded 2002 leftover", "Not the chip"],
  "sites/askjeeves/index.html", "Ask leftover")
F("2003", "sites/askjeeves/index.html", "ask-lx", "query", "Ask leftover 2×",
  "ask leftover", "sites/bloglines/index.html", "Bloglines leftover")
F("2003", "sites/bloglines/index.html", "bl-lx", "query", "Bloglines leftover 2×",
  "bloglines leftover", "sites/itunes/index.html", "iTunes leftover")
F("2003", "sites/itunes/index.html", "it-lx", "checks", "Itunes leftover 2×",
  ["Store leftover · FairPlay honesty", "Not Photobucket gold"],
  "sites/photobucket/index.html", "★ Photobucket")

# ----- 2004 -----
F("2004", "sites/orkut/index.html", "ork-lx", "query", "Orkut leftover 2×",
  "orkut leftover", "sites/yelp/index.html", "Yelp leftover")
F("2004", "sites/yelp/index.html", "yelp-lx", "query", "Yelp leftover 2×",
  "yelp leftover", "sites/craigslist/index.html", "Craigslist leftover")
F("2004", "sites/craigslist/index.html", "cl-lx", "hops", "Craigslist leftover 2×",
  [("city", "City leftover"), ("forums", "Forums leftover")],
  "sites/livejournal/index.html", "LiveJournal leftover")
F("2004", "sites/livejournal/index.html", "lj-lx", "query", "LiveJournal leftover 2×",
  "livejournal leftover", "sites/weather/index.html", "Weather leftover")
F("2004", "sites/weather/index.html", "wx-lx", "query", "Weather.com leftover 2×",
  "weather leftover", "sites/firefox/index.html", "Firefox leftover")
F("2004", "sites/firefox/index.html", "fx-lx", "checks", "Firefox leftover 2×",
  ["Firefox 1.0 leftover", "Not thefacebook gold"],
  "sites/digg/index.html", "Digg leftover")
F("2004", "sites/digg/index.html", "digg-lx", "query", "Digg leftover 2×",
  "digg leftover", "sites/gmail/index.html", "Gmail leftover")
F("2004", "sites/gmail/index.html", "gm-lx", "checks", "Gmail leftover 2×",
  ["Invite leftover · not modern Gmail", "Not the chip"],
  "sites/worldofwarcraft/index.html", "WoW leftover")
F("2004", "sites/worldofwarcraft/index.html", "wow-lx", "query", "WoW leftover 2×",
  "wow leftover", "sites/piczo/index.html", "Piczo leftover")
F("2004", "sites/piczo/index.html", "pz-lx", "query", "Piczo leftover 2×",
  "piczo leftover", "sites/tagged/index.html", "Tagged leftover")
F("2004", "sites/tagged/index.html", "tg-lx", "query", "Tagged leftover 2×",
  "tagged leftover", "sites/odeo/index.html", "Odeo leftover")
F("2004", "sites/odeo/index.html", "od-lx", "query", "Odeo leftover 2×",
  "odeo leftover", "sites/basecamp/index.html", "Basecamp leftover")
F("2004", "sites/basecamp/index.html", "bc-lx", "query", "Basecamp leftover 2×",
  "basecamp leftover", "sites/flickr/index.html", "Flickr leftover")
F("2004", "sites/flickr/index.html", "fl-lx", "query", "Flickr leftover 2×",
  "flickr leftover", "sites/orkutcircle/index.html", "Orkut circle leftover")
F("2004", "sites/orkutcircle/index.html", "oc-lx", "hops", "Orkut circle leftover 2×",
  [("circle", "Circle leftover"), ("scrap", "Scrap leftover")],
  "sites/yelplocal/index.html", "Yelp local leftover")
F("2004", "sites/yelplocal/index.html", "yl-lx", "query", "Yelp local leftover 2×",
  "yelp local leftover", "sites/tinypic/index.html", "TinyPic leftover")
F("2004", "sites/tinypic/index.html", "tp-lx", "query", "TinyPic leftover 2×",
  "tinypic leftover", "sites/feedburner/index.html", "FeedBurner leftover")
F("2004", "sites/feedburner/index.html", "fburn-lx", "query", "FeedBurner leftover 2×",
  "feedburner leftover", "sites/facebook/networks.html", "★ thefacebook")

# ----- 2008 -----
F("2008", "sites/dropbox/index.html", "db2-lx", "query", "Dropbox leftover 2×",
  "dropbox leftover", "sites/hulu/index.html", "Hulu leftover")
F("2008", "sites/hulu/index.html", "hulu-lx", "query", "Hulu leftover 2×",
  "hulu leftover", "sites/spotify/index.html", "Spotify leftover")
F("2008", "sites/spotify/index.html", "sp-lx", "checks", "Spotify leftover 2×",
  ["EU leftover · US later", "Not the chip"],
  "sites/stackoverflow/index.html", "Stack Overflow leftover")
F("2008", "sites/stackoverflow/index.html", "so-lx", "query", "Stack Overflow leftover 2×",
  "stackoverflow leftover", "sites/airbnb/index.html", "Airbnb leftover")
F("2008", "sites/airbnb/index.html", "ab-lx", "query", "Airbnb leftover 2×",
  "airbnb leftover", "sites/tumblr/index.html", "Tumblr leftover")
F("2008", "sites/tumblr/index.html", "tb-lx", "query", "Tumblr leftover 2×",
  "tumblr leftover", "sites/reddit/index.html", "Reddit leftover")
F("2008", "sites/reddit/index.html", "rd-lx", "query", "Reddit leftover 2×",
  "reddit leftover", "sites/android/index.html", "Android leftover")
F("2008", "sites/android/index.html", "and-lx", "checks", "Android leftover 2×",
  ["G1 leftover · not mass iPhone", "Not the chip"],
  "sites/maps/index.html", "Maps leftover")
F("2008", "sites/maps/index.html", "maps-lx", "hops", "Maps leftover 2×",
  [("map", "Map leftover"), ("sat", "Satellite leftover")],
  "sites/docs/index.html", "Docs leftover")
F("2008", "sites/docs/index.html", "docs2-lx", "query", "Docs leftover 2×",
  "docs leftover", "sites/twitter/index.html", "Twitter leftover")
F("2008", "sites/twitter/index.html", "tw-lx", "query", "Twitter leftover 2×",
  "twitter leftover", "sites/youtube/index.html", "YouTube leftover")
F("2008", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover 2×",
  "youtube leftover", "sites/facebook/index.html", "Facebook leftover")
F("2008", "sites/facebook/index.html", "fb-lx", "query", "Facebook leftover 2×",
  "facebook leftover", "sites/ask/index.html", "Ask leftover")
F("2008", "sites/ask/index.html", "ask-lx", "query", "Ask leftover 2×",
  "ask leftover", "sites/groupon/index.html", "Groupon leftover")
F("2008", "sites/groupon/index.html", "gp-lx", "query", "Groupon leftover 2×",
  "groupon leftover", "sites/evernote/index.html", "Evernote leftover")
F("2008", "sites/evernote/index.html", "en-lx", "query", "Evernote leftover 2×",
  "evernote leftover", "sites/techcrunch/index.html", "TechCrunch leftover")
F("2008", "sites/techcrunch/index.html", "tc-lx", "query", "TechCrunch leftover 2×",
  "techcrunch leftover", "sites/chrome/index.html", "Chrome leftover")
F("2008", "sites/chrome/index.html", "ch-lx", "checks", "Chrome leftover 2×",
  ["Chrome leftover · not sole shell", "Not GitHub gold"],
  "sites/github/index.html", "★ GitHub leftover")

# ----- 2012 -----
F("2012", "sites/medium/index.html", "md2-lx", "query", "Medium leftover 2× pack",
  "medium leftover", "sites/path/index.html", "Path leftover")
F("2012", "sites/path/index.html", "path-lx", "query", "Path leftover 2×",
  "path leftover", "sites/flipboard/index.html", "Flipboard leftover")
F("2012", "sites/flipboard/index.html", "flip-lx", "query", "Flipboard leftover 2×",
  "flipboard leftover", "sites/waze/index.html", "Waze leftover")
F("2012", "sites/waze/index.html", "wz-lx", "query", "Waze leftover 2×",
  "waze leftover", "sites/trello/index.html", "Trello leftover")
F("2012", "sites/trello/index.html", "tr-lx", "query", "Trello leftover 2×",
  "trello leftover", "sites/buzzfeed/index.html", "BuzzFeed leftover")
F("2012", "sites/buzzfeed/index.html", "bz-lx", "query", "BuzzFeed leftover 2×",
  "buzzfeed leftover", "sites/lyft/index.html", "Lyft leftover")
F("2012", "sites/lyft/index.html", "ly-lx", "query", "Lyft leftover 2×",
  "lyft leftover", "sites/kindlefire/index.html", "Kindle Fire leftover")
F("2012", "sites/kindlefire/index.html", "kf-lx", "query", "Kindle Fire leftover 2×",
  "kindle leftover", "sites/googledrive/index.html", "Drive leftover")
F("2012", "sites/googledrive/index.html", "gd-lx", "query", "Drive leftover 2×",
  "drive leftover", "sites/drivebox/index.html", "Drive box leftover")
F("2012", "sites/drivebox/index.html", "gdb-lx", "query", "Drive box leftover 2×",
  "drive box leftover", "sites/windows8/index.html", "Win8 leftover")
F("2012", "sites/windows8/index.html", "w8b-lx", "checks", "Windows8 leftover 2×",
  ["Win8 leftover · not the chip", "Metro leftover"],
  "sites/tumblr12/index.html", "Tumblr leftover")
F("2012", "sites/tumblr12/index.html", "tb12-lx", "query", "Tumblr leftover 2×",
  "tumblr leftover", "sites/twnote12/index.html", "Twitter leftover")
F("2012", "sites/twnote12/index.html", "tw12-lx", "query", "Twitter leftover 2×",
  "twitter leftover", "sites/ytnote12/index.html", "YouTube leftover")
F("2012", "sites/ytnote12/index.html", "yt12-lx", "query", "YouTube leftover 2×",
  "youtube leftover", "sites/pinabout/index.html", "Pinterest leftover")
F("2012", "sites/pinabout/index.html", "pina-lx", "query", "Pinterest about leftover 2×",
  "pinterest leftover", "sites/igabout/index.html", "IG leftover")
F("2012", "sites/igabout/index.html", "iga-lx", "query", "IG about leftover 2×",
  "ig leftover", "sites/ipoabout/index.html", "IPO leftover")
F("2012", "sites/ipoabout/index.html", "ipoa-lx", "query", "IPO about leftover 2×",
  "ipo leftover", "sites/instagram/android.html", "★ IG Android")

# ----- 2013 -----
F("2013", "sites/chrome/index.html", "ch-lx", "query", "Chrome leftover 2×",
  "chrome leftover", "sites/instagram/about.html", "IG leftover")
F("2013", "sites/instagram/about.html", "ig-lx", "query", "IG leftover 2×",
  "ig leftover", "sites/ios7about/index.html", "iOS 7 leftover")
F("2013", "sites/ios7about/index.html", "ios7-lx", "checks", "Ios7About leftover 2×",
  ["iOS 7 leftover · not Vine gold", "Flat leftover"],
  "sites/reddit/index.html", "Reddit leftover")
F("2013", "sites/reddit/index.html", "rd-lx", "query", "Reddit leftover 2×",
  "reddit leftover", "sites/snapabout/index.html", "Snap leftover")
F("2013", "sites/snapabout/index.html", "sna-lx", "query", "Snap leftover 2×",
  "snap leftover", "sites/teleabout/index.html", "Telegram leftover")
F("2013", "sites/teleabout/index.html", "tla-lx", "query", "Telegram leftover 2×",
  "telegram leftover", "sites/touchabout/index.html", "Touch ID leftover")
F("2013", "sites/touchabout/index.html", "tid-lx", "query", "Touch ID leftover 2×",
  "touch leftover", "sites/vineabout/index.html", "Vine leftover literacy")
F("2013", "sites/vineabout/index.html", "vina-lx", "checks", "Vineabout leftover 2×",
  ["Literacy leftover · not the 6s gold", "Not the chip"],
  "sites/snowden/index.html", "Snowden leftover")
F("2013", "sites/snowden/index.html", "sn-lx", "checks", "Snowden leftover 2×",
  ["2013 leftover literacy", "Not a second gold"],
  "sites/telegram/index.html", "Telegram dest leftover")
F("2013", "sites/telegram/index.html", "tg-lx", "query", "Telegram dest leftover 2×",
  "telegram leftover", "sites/iphone/index.html", "iPhone leftover")
F("2013", "sites/iphone/index.html", "ip-lx", "query", "iPhone leftover 2×",
  "iphone leftover", "sites/facebook/index.html", "Facebook leftover")

# 2013 remaining to reach 18 if some of the first 12 already exist from thin-2x
F("2013", "sites/tumblr/index.html", "tb-lx", "query", "Tumblr leftover 2× pack",
  "tumblr leftover", "sites/snapchat/index.html", "Snapchat leftover")
F("2013", "sites/snapchat/index.html", "sc-lx", "query", "Snapchat leftover 2× pack",
  "snap leftover", "sites/windows81/index.html", "Win8.1 leftover")
F("2013", "sites/windows81/index.html", "w81b-lx", "query", "Win8.1 leftover 2× pack",
  "win81 leftover", "sites/twitter/index.html", "Twitter leftover")
F("2013", "sites/twitter/index.html", "twb-lx", "query", "Twitter leftover 2× pack",
  "twitter leftover", "sites/youtube/index.html", "YouTube leftover")
F("2013", "sites/youtube/index.html", "ytb-lx", "query", "YouTube leftover 2× pack",
  "youtube leftover", "sites/vine/index.html", "★ Vine 6s")

# ----- 2014 -----
F("2014", "sites/instagram/index.html", "ig-lx", "query", "IG leftover 2×",
  "ig leftover", "sites/snapchat/index.html", "Snap leftover")
F("2014", "sites/snapchat/index.html", "sc-lx", "query", "Snap leftover 2×",
  "snap leftover", "sites/twitter/index.html", "Twitter leftover")
F("2014", "sites/twitter/index.html", "tw-lx", "query", "Twitter leftover 2×",
  "twitter leftover", "sites/waabout/index.html", "WA leftover literacy")
F("2014", "sites/waabout/index.html", "waa-lx", "checks", "Waabout leftover 2×",
  ["Literacy leftover · not Install gold", "Not the chip"],
  "sites/payabout/index.html", "Apple Pay leftover")
F("2014", "sites/payabout/index.html", "pay-lx", "query", "Apple Pay leftover 2×",
  "apple pay leftover", "sites/materialabout/index.html", "Material leftover")
F("2014", "sites/materialabout/index.html", "mata-lx", "query", "Material leftover 2× pack",
  "material leftover", "sites/heartbleed/index.html", "Heartbleed leftover")
F("2014", "sites/heartbleed/index.html", "hb-lx", "checks", "Heartbleed leftover 2×",
  ["CVE leftover literacy", "Not Install gold"],
  "sites/icebucket/index.html", "Ice Bucket leftover")
F("2014", "sites/icebucket/index.html", "ib-lx", "query", "Ice Bucket leftover 2×",
  "ice bucket leftover", "sites/iphone/index.html", "iPhone leftover")
F("2014", "sites/iphone/index.html", "ip-lx", "query", "iPhone leftover 2×",
  "iphone leftover", "sites/slack/index.html", "Slack leftover")
F("2014", "sites/slack/index.html", "sl-lx", "query", "Slack leftover 2× pack",
  "slack leftover", "sites/twitch/index.html", "Twitch leftover")
F("2014", "sites/twitch/index.html", "twch-lx", "query", "Twitch leftover 2× pack",
  "twitch leftover", "sites/whatsapp/index.html", "★ WhatsApp Install")

# extra 2014 to fill toward 18 if first ones already exist
F("2014", "sites/uber/index.html", "ub2-lx", "query", "Uber leftover 2× pack",
  "uber leftover", "sites/facebook/index.html", "Facebook leftover")
F("2014", "sites/facebook/index.html", "fb2-lx", "query", "Facebook leftover 2× pack",
  "facebook leftover", "sites/youtube/index.html", "YouTube leftover")
F("2014", "sites/youtube/index.html", "yt2-lx", "query", "YouTube leftover 2× pack",
  "youtube leftover", "sites/wikipedia/index.html", "Wikipedia leftover")
F("2014", "sites/wikipedia/index.html", "wk2-lx", "query", "Wikipedia leftover 2× pack",
  "wiki leftover", "sites/giphy/index.html", "Giphy leftover")
F("2014", "sites/giphy/index.html", "gi2-lx", "query", "Giphy leftover 2× pack",
  "giphy leftover", "sites/whatsapp/index.html", "★ WhatsApp Install")

# ----- 2022 -----
F("2022", "sites/cohere/index.html", "co2-lx", "query", "Cohere leftover 2× pack",
  "cohere leftover", "sites/jasper/index.html", "Jasper leftover")
F("2022", "sites/jasper/index.html", "jsp2-lx", "query", "Jasper leftover 2× pack",
  "jasper leftover", "sites/runwaygen1/index.html", "Runway leftover")
F("2022", "sites/runwaygen1/index.html", "rw2-lx", "query", "Runway leftover 2× pack",
  "runway leftover", "sites/stabilityhq/index.html", "Stability leftover")
F("2022", "sites/stabilityhq/index.html", "stab2-lx", "checks", "Stabilityhq leftover 2×",
  ["2022 leftover · no live weights", "Not the chip"],
  "sites/wordle/index.html", "Wordle leftover")
F("2022", "sites/wordle/index.html", "wd-lx", "query", "Wordle leftover 2× pack",
  "wordle leftover", "sites/mastodon/index.html", "Mastodon leftover")
F("2022", "sites/mastodon/index.html", "md-lx", "query", "Mastodon leftover 2× pack",
  "mastodon leftover", "sites/stablediffusion/index.html", "SD leftover")
F("2022", "sites/stablediffusion/index.html", "sd2-lx", "query", "SD leftover 2× pack",
  "sd leftover", "sites/chrome22/index.html", "Chrome leftover")
F("2022", "sites/chrome22/index.html", "ch22-lx", "query", "Chrome leftover 2×",
  "chrome leftover", "sites/copilot22/index.html", "Copilot leftover")
F("2022", "sites/copilot22/index.html", "cp22-lx", "query", "Copilot leftover 2×",
  "copilot leftover", "sites/cail22/index.html", "Character leftover")
F("2022", "sites/cail22/index.html", "cai-lx", "query", "Character leftover 2×",
  "character leftover", "sites/dalleabout/index.html", "DALL·E leftover")
F("2022", "sites/dalleabout/index.html", "dla-lx", "query", "DALL·E about leftover 2×",
  "dalle leftover", "sites/gptabout/index.html", "GPT leftover")
F("2022", "sites/gptabout/index.html", "gpa-lx", "checks", "Gptabout leftover 2×",
  ["Literacy leftover · not Send gold", "Not Plus / GPT-4"],
  "sites/mastoabout/index.html", "Masto leftover")
F("2022", "sites/mastoabout/index.html", "msa-lx", "query", "Masto about leftover 2×",
  "mastodon leftover", "sites/win10n22/index.html", "Win10 leftover")
F("2022", "sites/win10n22/index.html", "w10n-lx", "query", "Win10 leftover 2×",
  "win10 leftover", "sites/facebook/index.html", "Facebook leftover")
F("2022", "sites/facebook/index.html", "fb-lx", "query", "Facebook leftover 2×",
  "facebook leftover", "sites/youtube/index.html", "YouTube leftover")
F("2022", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover 2×",
  "youtube leftover", "sites/wikipedia/index.html", "Wikipedia leftover")
F("2022", "sites/wikipedia/index.html", "wk-lx", "query", "Wikipedia leftover 2×",
  "wiki leftover", "sites/chatgpt/index.html", "★ ChatGPT Send")


# ----- Band A 1994–2000 · rooms that still lacked leftover 4× -----
F("1994", "sites/yahoo/index.html", "yh-lx", "hops", "Yahoo leftover 2×",
  [("dir", "Directory leftover"), ("whatsnew", "What's New leftover")],
  "sites/whitehouse/index.html", "White House leftover")
F("1994", "sites/whitehouse/index.html", "wh-lx", "query", "White House leftover 2×",
  "whitehouse leftover", "sites/fishcam/index.html", "FishCam leftover")
F("1994", "sites/fishcam/index.html", "fish-lx", "wait", "FishCam leftover 2×",
  None, "sites/exploratorium/index.html", "Exploratorium leftover")
F("1994", "sites/exploratorium/index.html", "exp-lx", "query", "Exploratorium leftover 2×",
  "exploratorium leftover", "sites/weblouvre/index.html", "WebLouvre leftover")
F("1994", "sites/weblouvre/index.html", "louvre-lx", "query", "WebLouvre leftover 2×",
  "weblouvre leftover", "sites/bbs/index.html", "BBS leftover")
F("1994", "sites/bbs/index.html", "bbs-lx", "query", "BBS leftover 2×",
  "bbs leftover", "sites/mcom/index.html", "Netscape leftover")
F("1994", "sites/mcom/index.html", "mcom-lx", "checks", "Netscape leftover 2×",
  ["NN1 leftover · not the chip", "Helper-app leftover"],
  "sites/goodtimes/index.html", "Good Times leftover")
F("1994", "sites/goodtimes/index.html", "gt-lx", "checks", "Good Times leftover 2×",
  ["Hoax leftover literacy", "Not a real virus"],
  "sites/cern/index.html", "CERN leftover")
F("1994", "sites/cern/index.html", "cern-lx", "query", "CERN leftover 2×",
  "cern leftover", "sites/nasa/index.html", "NASA leftover")
F("1994", "sites/nasa/index.html", "nasa-lx", "query", "NASA leftover 2×",
  "nasa leftover", "sites/ncsa/index.html", "NCSA leftover")
F("1994", "sites/ncsa/index.html", "ncsa-lx", "query", "NCSA leftover 2×",
  "ncsa leftover", "sites/lycos/index.html", "Lycos leftover")
F("1994", "sites/lycos/index.html", "ly-lx", "query", "Lycos leftover 2×",
  "lycos leftover", "sites/webcrawler/index.html", "WebCrawler leftover")
F("1994", "sites/webcrawler/index.html", "wc-lx", "query", "WebCrawler leftover 2×",
  "webcrawler leftover", "sites/hotwired/index.html", "HotWired leftover")
F("1994", "sites/hotwired/index.html", "hw-lx", "query", "HotWired leftover 2×",
  "hotwired leftover", "sites/iuma/index.html", "IUMA leftover")
F("1994", "sites/iuma/index.html", "iuma-lx", "query", "IUMA leftover 2×",
  "iuma leftover", "sites/compuserve/index.html", "CompuServe leftover")
F("1994", "sites/compuserve/index.html", "cis-lx", "query", "CompuServe leftover 2× pack",
  "compuserve leftover", "sites/prodigy/index.html", "Prodigy leftover")
F("1994", "sites/prodigy/index.html", "prod-lx", "query", "Prodigy leftover 2× pack",
  "prodigy leftover", "sites/infoseek/index.html", "Infoseek leftover")
F("1994", "sites/infoseek/index.html", "is-lx", "query", "Infoseek leftover 2× pack",
  "infoseek leftover", "sites/csotd/index.html", "★ Cool Site of the Day")

F("1995", "sites/altavista/index.html", "av-lx", "query", "AltaVista leftover 2×",
  "altavista leftover", "sites/compuserve/index.html", "CompuServe leftover")
F("1995", "sites/compuserve/index.html", "cis-lx", "query", "CompuServe leftover 2×",
  "compuserve leftover", "sites/prodigy/index.html", "Prodigy leftover")
F("1995", "sites/prodigy/index.html", "prod-lx", "query", "Prodigy leftover 2×",
  "prodigy leftover", "sites/beanies/index.html", "Beanie leftover")
F("1995", "sites/beanies/index.html", "bn-lx", "query", "Beanie leftover 2×",
  "beanie leftover", "sites/aol/index.html", "AOL leftover")
F("1995", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2× pack",
  "aol leftover", "sites/cnn/index.html", "CNN leftover")
F("1995", "sites/cnn/index.html", "cnn-lx", "hops", "CNN leftover 2×",
  [("news", "News leftover"), ("world", "World leftover")],
  "sites/cnet/index.html", "CNET leftover")
F("1995", "sites/cnet/index.html", "cnet-lx", "query", "CNET leftover 2×",
  "cnet leftover", "sites/espn/index.html", "ESPN leftover")
F("1995", "sites/espn/index.html", "espn-lx", "query", "ESPN leftover 2× pack",
  "espn leftover", "sites/microsoft/index.html", "Microsoft leftover")
F("1995", "sites/microsoft/index.html", "ms-lx", "query", "Microsoft leftover 2×",
  "microsoft leftover", "sites/netscape/index.html", "Netscape leftover")
F("1995", "sites/netscape/index.html", "ns-lx", "query", "Netscape leftover 2×",
  "netscape leftover", "sites/hotwired/index.html", "HotWired leftover")
F("1995", "sites/hotwired/index.html", "hw-lx", "query", "HotWired leftover 2×",
  "hotwired leftover", "sites/whitehouse/index.html", "White House leftover")
F("1995", "sites/whitehouse/index.html", "wh-lx", "query", "White House leftover 2×",
  "whitehouse leftover", "sites/yahoo/index.html", "Yahoo leftover")
F("1995", "sites/yahoo/index.html", "yh-lx", "hops", "Yahoo leftover 2×",
  [("dir", "Directory leftover"), ("search", "Search leftover")],
  "sites/infoseek/index.html", "Infoseek leftover")
F("1995", "sites/infoseek/index.html", "is-lx", "query", "Infoseek leftover 2× pack",
  "infoseek leftover", "sites/hotbot/index.html", "HotBot leftover")
F("1995", "sites/hotbot/index.html", "hb-lx", "query", "HotBot leftover 2× pack",
  "hotbot leftover", "sites/geocities/index.html", "GeoCities leftover")
F("1995", "sites/geocities/index.html", "geo-lx", "checks", "GeoCities leftover 2×",
  ["1995 leftover · not glitter 1998", "Not the chip"],
  "sites/auctionweb/index.html", "AuctionWeb leftover")
F("1995", "sites/auctionweb/index.html", "aw-lx", "query", "AuctionWeb leftover literacy",
  "auction leftover", "sites/amazon/ssl-checkout.html", "★ Amazon SSL")

F("1996", "sites/aolportal/index.html", "aol-lx", "query", "AOL portal leftover 2×",
  "aol leftover", "sites/prodigy/index.html", "Prodigy leftover")
F("1996", "sites/prodigy/index.html", "prod-lx", "query", "Prodigy leftover 2×",
  "prodigy leftover", "sites/hotbot/index.html", "HotBot leftover")
F("1996", "sites/hotbot/index.html", "hb-lx", "query", "HotBot leftover 2×",
  "hotbot leftover", "sites/microsoft/index.html", "Microsoft leftover")
F("1996", "sites/microsoft/index.html", "ms-lx", "query", "Microsoft leftover 2×",
  "microsoft leftover", "sites/msn/index.html", "MSN leftover")
F("1996", "sites/msn/index.html", "msn-lx", "query", "MSN leftover 2× pack",
  "msn leftover", "sites/amazon/index.html", "Amazon leftover")
F("1996", "sites/amazon/index.html", "am-lx", "query", "Amazon leftover literacy",
  "amazon leftover", "sites/excite/index.html", "Excite leftover")
F("1996", "sites/excite/index.html", "ex-lx", "query", "Excite leftover 2× pack",
  "excite leftover", "sites/yahoo/index.html", "Yahoo leftover")
F("1996", "sites/yahoo/index.html", "yh-lx", "hops", "Yahoo leftover 2×",
  [("dir", "Directory leftover"), ("my", "My Yahoo leftover")],
  "sites/altavista/index.html", "AltaVista leftover")
F("1996", "sites/altavista/index.html", "av-lx", "query", "AltaVista leftover 2× pack",
  "altavista leftover", "sites/geocities/index.html", "GeoCities leftover")
F("1996", "sites/geocities/index.html", "geo-lx", "checks", "GeoCities leftover 2×",
  ["1996 leftover", "Not the chip"],
  "sites/cnn/index.html", "CNN leftover")
F("1996", "sites/cnn/index.html", "cnn-lx", "hops", "CNN leftover 2×",
  [("news", "News leftover"), ("world", "World leftover")],
  "sites/infoseek/index.html", "Infoseek leftover")
F("1996", "sites/infoseek/index.html", "is-lx", "query", "Infoseek leftover 2× pack",
  "infoseek leftover", "sites/netscape/index.html", "Netscape leftover")
F("1996", "sites/netscape/index.html", "ns-lx", "query", "Netscape leftover 2×",
  "netscape leftover", "sites/craigslist/index.html", "Craigslist leftover")
F("1996", "sites/craigslist/index.html", "cl-lx", "query", "Craigslist leftover 2× pack",
  "craigslist leftover", "sites/angelfire/index.html", "Angelfire leftover")
F("1996", "sites/angelfire/index.html", "af-lx", "query", "Angelfire leftover 2× pack",
  "angelfire leftover", "sites/pathfinder/index.html", "Pathfinder leftover")
F("1996", "sites/pathfinder/index.html", "pf-lx", "query", "Pathfinder leftover 2× pack",
  "pathfinder leftover", "sites/portals/wars.html", "★ Portal wars")

F("1997", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2×",
  "aol leftover", "sites/msn/index.html", "MSN leftover")
F("1997", "sites/msn/index.html", "msn-lx", "query", "MSN leftover 2×",
  "msn leftover", "sites/excite/index.html", "Excite leftover")
F("1997", "sites/excite/index.html", "ex-lx", "query", "Excite leftover 2×",
  "excite leftover", "sites/yahoo/index.html", "Yahoo leftover")
F("1997", "sites/yahoo/index.html", "yh-lx", "hops", "Yahoo leftover 2×",
  [("dir", "Directory leftover"), ("mail", "Mail leftover")],
  "sites/cnn/index.html", "CNN leftover")
F("1997", "sites/cnn/index.html", "cnn-lx", "query", "CNN leftover 2×",
  "cnn leftover", "sites/netscape/index.html", "Netscape leftover")
F("1997", "sites/netscape/index.html", "ns-lx", "query", "Netscape leftover 2×",
  "netscape leftover", "sites/hotwired/index.html", "HotWired leftover")
F("1997", "sites/hotwired/index.html", "hw-lx", "query", "HotWired leftover 2×",
  "hotwired leftover", "sites/drudgereport/index.html", "Drudge leftover")
F("1997", "sites/drudgereport/index.html", "dr-lx", "query", "Drudge leftover 2×",
  "drudge leftover", "sites/dancing-baby/index.html", "Dancing Baby leftover")
F("1997", "sites/dancing-baby/index.html", "db-lx", "checks", "Dancing Baby leftover 2×",
  ["Culture leftover", "Not the chip"],
  "sites/apple/index.html", "Apple leftover")
F("1997", "sites/apple/index.html", "ap-lx", "query", "Apple leftover 2×",
  "think different leftover", "sites/microsoft/index.html", "Microsoft leftover")
F("1997", "sites/microsoft/index.html", "ms-lx", "query", "Microsoft leftover 2×",
  "microsoft leftover", "sites/geocities/index.html", "GeoCities leftover")
F("1997", "sites/geocities/index.html", "geo-lx", "query", "GeoCities leftover 2×",
  "geocities leftover", "sites/altavista/index.html", "AltaVista leftover")
F("1997", "sites/altavista/index.html", "av-lx", "query", "AltaVista leftover 2× pack",
  "altavista leftover", "sites/lycos/index.html", "Lycos leftover")
F("1997", "sites/lycos/index.html", "ly-lx", "query", "Lycos leftover 2× pack",
  "lycos leftover", "sites/hotmail/index.html", "HoTMaiL leftover")
F("1997", "sites/hotmail/index.html", "hm-lx", "query", "HoTMaiL leftover 2× pack",
  "hotmail leftover", "sites/icq/index.html", "ICQ leftover")
F("1997", "sites/icq/index.html", "icq-lx", "query", "ICQ leftover 2× pack",
  "icq leftover", "sites/slashdot/index.html", "Slashdot leftover")
F("1997", "sites/slashdot/index.html", "sd-lx", "query", "Slashdot leftover 2× pack",
  "slashdot leftover", "sites/pointcast/index.html", "★ PointCast")

F("1998", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2×",
  "aol leftover", "sites/msn/index.html", "MSN leftover")
F("1998", "sites/msn/index.html", "msn-lx", "query", "MSN leftover 2×",
  "msn leftover", "sites/excite/index.html", "Excite leftover")
F("1998", "sites/excite/index.html", "ex-lx", "query", "Excite leftover 2×",
  "excite leftover", "sites/lycos/index.html", "Lycos leftover")
F("1998", "sites/lycos/index.html", "ly-lx", "query", "Lycos leftover 2×",
  "lycos leftover", "sites/geocities/index.html", "GeoCities leftover")
F("1998", "sites/geocities/index.html", "geo-lx", "query", "GeoCities leftover 2×",
  "geocities leftover", "sites/bbc/index.html", "BBC leftover")
F("1998", "sites/bbc/index.html", "bbc-lx", "hops", "BBC leftover 2×",
  [("news", "News leftover"), ("world", "World leftover")],
  "sites/cnn/index.html", "CNN leftover")
F("1998", "sites/cnn/index.html", "cnn-lx", "query", "CNN leftover 2×",
  "cnn leftover", "sites/hotmail/index.html", "HoTMaiL leftover")
F("1998", "sites/hotmail/index.html", "hm-lx", "query", "HoTMaiL leftover 2×",
  "hotmail leftover", "sites/icq/index.html", "ICQ leftover")
F("1998", "sites/icq/index.html", "icq-lx", "query", "ICQ leftover 2×",
  "icq leftover", "sites/infoseek/index.html", "Infoseek leftover")
F("1998", "sites/infoseek/index.html", "is-lx", "query", "Infoseek leftover 2×",
  "infoseek leftover", "sites/hotbot/index.html", "HotBot leftover")
F("1998", "sites/hotbot/index.html", "hb-lx", "query", "HotBot leftover 2×",
  "hotbot leftover", "sites/netscape/index.html", "Netscape leftover")
F("1998", "sites/netscape/index.html", "ns-lx", "query", "Netscape leftover 2×",
  "netscape leftover", "sites/microsoft/index.html", "Microsoft leftover")
F("1998", "sites/microsoft/index.html", "ms-lx", "query", "Microsoft leftover 2×",
  "microsoft leftover", "sites/altavista/index.html", "AltaVista leftover")
F("1998", "sites/altavista/index.html", "av-lx", "query", "AltaVista leftover 2× pack",
  "altavista leftover", "sites/about/index.html", "About leftover")
F("1998", "sites/about/index.html", "ab-lx", "query", "About leftover 2× pack",
  "about leftover", "sites/dmoz/index.html", "DMOZ leftover")
F("1998", "sites/dmoz/index.html", "dmoz-lx", "hops", "DMOZ leftover 2× pack",
  [("arts", "Arts leftover"), ("comp", "Computers leftover")],
  "sites/slashdot/index.html", "Slashdot leftover")
F("1998", "sites/slashdot/index.html", "sd-lx", "query", "Slashdot leftover 2× pack",
  "slashdot leftover", "sites/google/lucky.html", "★ I'm Feeling Lucky")

F("1999", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2×",
  "aol leftover", "sites/msn/index.html", "MSN leftover")
F("1999", "sites/msn/index.html", "msn-lx", "query", "MSN leftover 2×",
  "msn leftover", "sites/yahoo/index.html", "Yahoo leftover")
F("1999", "sites/yahoo/index.html", "yh-lx", "hops", "Yahoo leftover 2×",
  [("dir", "Directory leftover"), ("mail", "Mail leftover")],
  "sites/excite/index.html", "Excite leftover")
F("1999", "sites/excite/index.html", "ex-lx", "query", "Excite leftover 2×",
  "excite leftover", "sites/about/index.html", "About leftover")
F("1999", "sites/about/index.html", "ab-lx", "query", "About leftover 2×",
  "about leftover", "sites/google/index.html", "Google leftover")
F("1999", "sites/google/index.html", "g-lx", "query", "Google leftover literacy",
  "google leftover", "sites/cnn/index.html", "CNN leftover")
F("1999", "sites/cnn/index.html", "cnn-lx", "query", "CNN leftover 2×",
  "cnn leftover", "sites/icq/index.html", "ICQ leftover")
F("1999", "sites/icq/index.html", "icq-lx", "query", "ICQ leftover 2×",
  "icq leftover", "sites/altavista/index.html", "AltaVista leftover")
F("1999", "sites/altavista/index.html", "av-lx", "query", "AltaVista leftover 2×",
  "altavista leftover", "sites/slashdot/index.html", "Slashdot leftover")
F("1999", "sites/slashdot/index.html", "sd-lx", "query", "Slashdot leftover 2×",
  "slashdot leftover", "sites/y2k/index.html", "Y2K leftover")
F("1999", "sites/y2k/index.html", "y2k-lx", "checks", "Y2K leftover 2×",
  ["Y2K leftover literacy", "Not a real clock"],
  "sites/apple/index.html", "Apple leftover")
F("1999", "sites/apple/index.html", "ap-lx", "query", "Apple leftover 2×",
  "apple leftover", "sites/microsoft/index.html", "Microsoft leftover")
F("1999", "sites/microsoft/index.html", "ms-lx", "query", "Microsoft leftover 2×",
  "microsoft leftover", "sites/hotbot/index.html", "HotBot leftover")
F("1999", "sites/hotbot/index.html", "hb-lx", "query", "HotBot leftover 2×",
  "hotbot leftover", "sites/infoseek/index.html", "Infoseek leftover")
F("1999", "sites/infoseek/index.html", "is-lx", "query", "Infoseek leftover 2×",
  "infoseek leftover", "sites/dmoz/index.html", "DMOZ leftover")
F("1999", "sites/dmoz/index.html", "dmoz-lx", "query", "DMOZ leftover 2× pack",
  "dmoz leftover", "sites/gamespot/index.html", "GameSpot leftover")
F("1999", "sites/gamespot/index.html", "gs-lx", "query", "GameSpot leftover 2× pack",
  "gamespot leftover", "sites/aim/index.html", "★ AIM")

F("2000", "sites/yahoo/index.html", "yh-lx", "hops", "Yahoo leftover 2×",
  [("dir", "Directory leftover"), ("mail", "Mail leftover")],
  "sites/aol/index.html", "AOL leftover")
F("2000", "sites/aol/index.html", "aol-lx", "query", "AOL leftover 2×",
  "aol leftover", "sites/msn/index.html", "MSN leftover")
F("2000", "sites/msn/index.html", "msn-lx", "query", "MSN leftover 2×",
  "msn leftover", "sites/about/index.html", "About leftover")
F("2000", "sites/about/index.html", "ab-lx", "query", "About leftover 2×",
  "about leftover", "sites/bbc/index.html", "BBC leftover")
F("2000", "sites/bbc/index.html", "bbc-lx", "hops", "BBC leftover 2×",
  [("news", "News leftover"), ("world", "World leftover")],
  "sites/excite/index.html", "Excite leftover")
F("2000", "sites/excite/index.html", "ex-lx", "query", "Excite leftover 2×",
  "excite leftover", "sites/google/index.html", "Google leftover")
F("2000", "sites/google/index.html", "g-lx", "query", "Google leftover literacy",
  "google leftover", "sites/blogger/index.html", "Blogger leftover")
F("2000", "sites/blogger/index.html", "bg-lx", "query", "Blogger leftover 2×",
  "blogger leftover", "sites/paypal/index.html", "PayPal leftover")
F("2000", "sites/paypal/index.html", "pp-lx", "checks", "PayPal leftover 2×",
  ["PayPal leftover · not a real transfer", "Not the chip"],
  "sites/zombo/index.html", "Zombo leftover")
F("2000", "sites/zombo/index.html", "zombo-lx", "query", "Zombo leftover literacy",
  "zombo leftover", "sites/altavista/index.html", "AltaVista leftover")
F("2000", "sites/altavista/index.html", "av-lx", "query", "AltaVista leftover 2×",
  "altavista leftover", "sites/askjeeves/index.html", "Ask leftover")
F("2000", "sites/askjeeves/index.html", "ask-lx", "query", "Ask leftover 2×",
  "ask leftover", "sites/dmoz/index.html", "DMOZ leftover")
F("2000", "sites/dmoz/index.html", "dmoz-lx", "query", "DMOZ leftover 2×",
  "dmoz leftover", "sites/gamespot/index.html", "GameSpot leftover")
F("2000", "sites/gamespot/index.html", "gs-lx", "query", "GameSpot leftover 2×",
  "gamespot leftover", "sites/geocities/index.html", "GeoCities leftover")
F("2000", "sites/geocities/index.html", "geo-lx", "query", "GeoCities leftover 2×",
  "geocities leftover", "sites/icq/index.html", "ICQ leftover")
F("2000", "sites/icq/index.html", "icq-lx", "query", "ICQ leftover 2×",
  "icq leftover", "sites/slashdot/index.html", "Slashdot leftover")
F("2000", "sites/slashdot/index.html", "sd-lx", "query", "Slashdot leftover 2×",
  "slashdot leftover", "sites/mapquest/index.html", "★ MapQuest")

# ----- 2009–2011 second-path (no new folders) -----
F("2009", "sites/bing/index.html", "bing2-lx", "query", "Bing leftover 2× pack",
  "bing leftover", "sites/farmville/index.html", "FarmVille leftover")
F("2009", "sites/farmville/index.html", "fv2-lx", "hops", "FarmVille leftover 2× pack",
  [("plant", "Plant leftover"), ("harvest", "Harvest leftover")],
  "sites/foursquare/index.html", "Foursquare leftover")
F("2009", "sites/foursquare/index.html", "4sq2-lx", "query", "Foursquare leftover 2× pack",
  "foursquare leftover", "sites/kickstarter/index.html", "Kickstarter leftover")
F("2009", "sites/kickstarter/index.html", "ks2-lx", "query", "Kickstarter leftover 2× pack",
  "kickstarter leftover", "sites/wolframalpha/index.html", "Wolfram leftover")
F("2009", "sites/wolframalpha/index.html", "wa2-lx", "query", "Wolfram leftover 2× pack",
  "wolfram leftover", "sites/chatroulette/index.html", "Chatroulette leftover")
F("2009", "sites/chatroulette/index.html", "cr-lx", "checks", "Chatroulette leftover 2×",
  ["2009 leftover · not a live cam", "Not the chip"],
  "sites/omegle/index.html", "Omegle leftover")
F("2009", "sites/omegle/index.html", "og-lx", "checks", "Omegle leftover 2×",
  ["2009 leftover · not a live chat", "Not the chip"],
  "sites/ubercab/index.html", "UberCab leftover")
F("2009", "sites/ubercab/index.html", "uber-lx", "query", "UberCab leftover 2×",
  "ubercab leftover", "sites/whatsapp/index.html", "WhatsApp leftover")
F("2009", "sites/whatsapp/index.html", "wa-lx", "query", "WhatsApp leftover 2×",
  "whatsapp leftover", "sites/windows7/index.html", "Win7 leftover")
F("2009", "sites/windows7/index.html", "w7-lx", "checks", "Win7 leftover 2×",
  ["Win7 leftover · not the chip", "XP leftover is last year"],
  "sites/mafiawars/index.html", "Mafia Wars leftover")
F("2009", "sites/mafiawars/index.html", "mw-lx", "query", "Mafia Wars leftover 2×",
  "mafia leftover", "sites/twitter/index.html", "Twitter leftover")
F("2009", "sites/twitter/index.html", "tw-lx", "query", "Twitter leftover 2×",
  "twitter leftover", "sites/youtube/index.html", "YouTube leftover")
F("2009", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover 2×",
  "youtube leftover", "sites/wikipedia/index.html", "Wikipedia leftover")
F("2009", "sites/wikipedia/index.html", "wk-lx", "query", "Wikipedia leftover 2×",
  "wiki leftover", "sites/appstore/index.html", "App Store leftover")
F("2009", "sites/appstore/index.html", "as-lx", "query", "App Store leftover 2×",
  "appstore leftover", "sites/iphone/index.html", "iPhone leftover")
F("2009", "sites/iphone/index.html", "ip-lx", "checks", "iPhone leftover 2×",
  ["3GS leftover", "Not Like gold"],
  "sites/facebook/index.html", "★ Facebook Like")
F("2009", "sites/facebook/index.html", "fb2-lx", "hops", "Facebook leftover literacy",
  [("wall", "Wall leftover"), ("like", "Like leftover literacy")],
  "sites/bing/index.html", "Bing leftover")
F("2009", "sites/bing/index.html", "bing3-lx", "checks", "Bing leftover literacy",
  ["Bing leftover · not the chip", "Decision Engine leftover"],
  "sites/facebook/index.html", "★ Facebook Like")

F("2010", "sites/android/index.html", "and-lx", "query", "Android leftover 2×",
  "android leftover", "sites/chrome/index.html", "Chrome leftover")
F("2010", "sites/chrome/index.html", "ch-lx", "query", "Chrome leftover 2×",
  "chrome leftover", "sites/dropbox/index.html", "Dropbox leftover")
F("2010", "sites/dropbox/index.html", "db-lx", "query", "Dropbox leftover 2×",
  "dropbox leftover", "sites/facetime/index.html", "FaceTime leftover")
F("2010", "sites/facetime/index.html", "ft-lx", "query", "FaceTime leftover 2×",
  "facetime leftover", "sites/farmnote/index.html", "Farm leftover")
F("2010", "sites/farmnote/index.html", "fn-lx", "query", "Farm leftover 2×",
  "farm leftover", "sites/formspring/index.html", "Formspring leftover")
F("2010", "sites/formspring/index.html", "fs-lx", "query", "Formspring leftover 2×",
  "formspring leftover", "sites/gmailtab/index.html", "Gmail leftover")
F("2010", "sites/gmailtab/index.html", "gm-lx", "query", "Gmail leftover 2×",
  "gmail leftover", "sites/groupondeal/index.html", "Groupon leftover")
F("2010", "sites/groupondeal/index.html", "gp-lx", "query", "Groupon leftover 2×",
  "groupon leftover", "sites/hulustream/index.html", "Hulu leftover")
F("2010", "sites/hulustream/index.html", "hu-lx", "query", "Hulu leftover 2×",
  "hulu leftover", "sites/ie9/index.html", "IE9 leftover")
F("2010", "sites/ie9/index.html", "ie-lx", "query", "IE9 leftover 2×",
  "ie9 leftover", "sites/instant/index.html", "Instant leftover")
F("2010", "sites/instant/index.html", "in-lx", "query", "Instant leftover 2×",
  "instant leftover", "sites/kickstarter/index.html", "Kickstarter leftover")
F("2010", "sites/kickstarter/index.html", "ks-lx", "query", "Kickstarter leftover 2×",
  "kickstarter leftover", "sites/netflix/index.html", "Netflix leftover")
F("2010", "sites/netflix/index.html", "nf-lx", "query", "Netflix leftover 2×",
  "netflix leftover", "sites/quorawait/index.html", "Quora leftover")
F("2010", "sites/quorawait/index.html", "qu-lx", "query", "Quora leftover 2×",
  "quora leftover", "sites/reddit/index.html", "Reddit leftover")
F("2010", "sites/reddit/index.html", "rd-lx", "query", "Reddit leftover 2×",
  "reddit leftover", "sites/spotifyeu/index.html", "Spotify leftover")
F("2010", "sites/spotifyeu/index.html", "sp-lx", "query", "Spotify leftover 2×",
  "spotify leftover", "sites/tumblr/index.html", "Tumblr leftover")
F("2010", "sites/tumblr/index.html", "tb-lx", "query", "Tumblr leftover 2×",
  "tumblr leftover", "sites/wave/index.html", "Wave leftover")
F("2010", "sites/wave/index.html", "wv-lx", "query", "Wave leftover 2×",
  "wave leftover", "sites/instagram/index.html", "★ Instagram iOS")

F("2011", "sites/dropbox11/index.html", "db-lx", "query", "Dropbox leftover 2×",
  "dropbox leftover", "sites/groupon11/index.html", "Groupon leftover")
F("2011", "sites/groupon11/index.html", "gp-lx", "query", "Groupon leftover 2×",
  "groupon leftover", "sites/hangnote/index.html", "Hangout leftover")
F("2011", "sites/hangnote/index.html", "hg-lx", "query", "Hangout leftover 2×",
  "hangout leftover", "sites/ie9note/index.html", "IE9 leftover")
F("2011", "sites/ie9note/index.html", "ie-lx", "query", "IE9 leftover 2×",
  "ie9 leftover", "sites/ipad2cam/index.html", "iPad 2 leftover")
F("2011", "sites/ipad2cam/index.html", "ip2-lx", "query", "iPad 2 leftover 2×",
  "ipad2 leftover", "sites/netflix11/index.html", "Netflix leftover")
F("2011", "sites/netflix11/index.html", "nf-lx", "query", "Netflix leftover 2×",
  "netflix leftover", "sites/qwiknote/index.html", "Qwikster leftover")
F("2011", "sites/qwiknote/index.html", "qw-lx", "query", "Qwikster leftover 2×",
  "qwikster leftover", "sites/qwikster/index.html", "Qwikster dest leftover")
F("2011", "sites/qwikster/index.html", "qw2-lx", "checks", "Qwikster dest leftover 2×",
  ["2011 leftover flop", "Not the chip"],
  "sites/sirileftover/index.html", "Siri leftover")
F("2011", "sites/sirileftover/index.html", "si-lx", "query", "Siri leftover 2×",
  "siri leftover", "sites/twitternote/index.html", "Twitter leftover")
F("2011", "sites/twitternote/index.html", "tw-lx", "query", "Twitter leftover 2×",
  "twitter leftover", "sites/icloud/index.html", "iCloud leftover")
F("2011", "sites/icloud/index.html", "ic-lx", "query", "iCloud leftover 2× pack",
  "icloud leftover", "sites/snapchat/index.html", "Snap leftover")
F("2011", "sites/snapchat/index.html", "sc-lx", "query", "Snap leftover 2× pack",
  "snap leftover", "sites/spotify/index.html", "Spotify leftover")
F("2011", "sites/spotify/index.html", "sp-lx", "query", "Spotify leftover 2× pack",
  "spotify leftover", "sites/airbnb/index.html", "Airbnb leftover")
F("2011", "sites/airbnb/index.html", "ab-lx", "query", "Airbnb leftover 2× pack",
  "airbnb leftover", "sites/linkedin/index.html", "LinkedIn leftover")
F("2011", "sites/linkedin/index.html", "li-lx", "query", "LinkedIn leftover 2× pack",
  "linkedin leftover", "sites/tumblr/index.html", "Tumblr leftover")
F("2011", "sites/tumblr/index.html", "tb-lx", "query", "Tumblr leftover 2× pack",
  "tumblr leftover", "sites/youtube/index.html", "YouTube leftover")
F("2011", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover 2× pack",
  "youtube leftover", "sites/googleplus/index.html", "★ Google+")

def panel_inner(kind: str, extra) -> str:
    if kind == "query":
        ph = extra if isinstance(extra, str) else "ok leftover"
        return (
            f'<p><label>Leftover<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" '
            f'placeholder="{ph}"></label></p>\n'
        )
    if kind == "checks":
        labs = extra if isinstance(extra, list) else [
            "leftover · not the chip",
            "Incomplete never writes",
        ]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        return f"<p>{boxes}</p>\n"
    if kind == "wait":
        return (
            '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">'
            "Wait leftover</button></p>\n"
        )
    hops = extra or [("a", "Hop A"), ("b", "Hop B")]
    btns = " ".join(
        f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
    )
    return f"<p>{btns}</p>\n"


def fourx(year: str, suffix: str, kind: str, title: str, nxt: str, nl: str, extra) -> str:
    pref = PREFIX[year]
    verb = VERB[kind]
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f"{panel_inner(kind, extra)}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{pref}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def rel_href(dest: Path, year: str, next_rel: str) -> str:
    next_abs = ROOT / "years" / year / next_rel
    dest_dir = dest.parent
    try:
        nxt = Path(next_abs).relative_to(dest_dir).as_posix()
        return nxt
    except ValueError:
        depth = len(dest.relative_to(ROOT / "years" / year).parts) - 1
        return "../" * depth + next_rel


def script_needles(year: str, dest: Path) -> list[str]:
    rel = dest.relative_to(ROOT / "years" / year)
    depth = len(rel.parts)
    prefix = "/".join([".."] * depth)
    return [
        f'<script src="{prefix}/js/immersion-{year}.js"></script>',
        f'<script src="{prefix}/../js/immersion-{year}.js"></script>',
    ]


def inject_file(year, rel, suffix, kind, title, extra, next_rel, nl) -> str:
    dest = ROOT / "years" / year / rel
    if not dest.is_file():
        return f"SKIP missing {year}/{rel}"
    t = dest.read_text(encoding="utf-8")
    if f"ITT-4X:{suffix}:" in t or f'data-4x-go="{suffix}"' in t:
        return "exists"
    nxt = rel_href(dest, year, next_rel)
    block = fourx(year, suffix, kind, title, nxt, nl, extra)
    for needle in script_needles(year, dest):
        if needle in t:
            dest.write_text(t.replace(needle, block + "\n" + needle, 1), encoding="utf-8")
            return "ok"
    if "</body>" in t:
        dest.write_text(t.replace("</body>", block + "</body>", 1), encoding="utf-8")
        return "ok"
    dest.write_text(t + block, encoding="utf-8")
    return "ok"


def matrix_row(year, rel, suffix, kind, title, next_rel, nl) -> dict:
    return {
        "year": year,
        "path": f"/years/{year}/{rel}",
        "key": f"{PREFIX[year]}-{suffix}",
        "kind": kind,
        "title": title,
        "next": f"/years/{year}/{next_rel}",
        "nextLabel": nl,
    }


TRAIL_START = "<!-- ITT-2X-TRAILS:start -->"
TRAIL_END = "<!-- ITT-2X-TRAILS:end -->"


def patch_home(year: str, rows: list[tuple]) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.is_file():
        print(f"SKIP home {year}")
        return
    t = home.read_text(encoding="utf-8")
    links = []
    for _y, rel, suffix, _k, title, _e, _n, _nl in rows:
        href = "../" + rel
        links.append(f' <a href="{href}" data-trail-keys="{PREFIX[year]}-{suffix}">{title}</a> →')
    star = f' <a href="../{STAR_HREF[year]}">{STAR_LABEL[year]}</a>'
    inner = (
        f'<p class="itt-2x-trails" id="ott-2x-{year}-next" '
        f'style="margin:10px auto;padding:10px;background:#e8f5e9;border:1px solid #2e7d32;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>2× leftover dests (next pass)</b> (not the chip · incomplete never writes):"
        + "".join(links)
        + star
        + "</p>"
    )
    marker = f"<!-- ITT-2X-NEXT:{year}:start -->"
    end = f"<!-- ITT-2X-NEXT:{year}:end -->"
    block = f"{marker}\n{inner}\n{end}\n"
    if marker in t:
        t = re.sub(
            re.escape(marker) + r".*?" + re.escape(end),
            block.strip(),
            t,
            count=1,
            flags=re.S,
        )
    elif TRAIL_END in t:
        t = t.replace(TRAIL_END, TRAIL_END + "\n" + block, 1)
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    else:
        t += block
    home.write_text(t, encoding="utf-8")


def main() -> None:
    added = []
    skipped = []
    missing = []
    by_year: dict[str, list] = {}
    for row in INJECT:
        year, rel, suffix, kind, title, extra, nxt, nl = row
        st = inject_file(year, rel, suffix, kind, title, extra, nxt, nl)
        by_year.setdefault(year, []).append(row)
        if st == "ok":
            added.append(f"{year}/{suffix}")
        elif st == "exists":
            skipped.append(f"{year}/{suffix}")
        else:
            missing.append(st)

    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    mx = json.loads(mx_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in mx}
    new_rows = []
    for year, rel, suffix, kind, title, extra, nxt, nl in INJECT:
        dest = ROOT / "years" / year / rel
        if not dest.is_file():
            continue
        rec = matrix_row(year, rel, suffix, kind, title, nxt, nl)
        if (rec["year"], rec["key"]) not in have:
            mx.append(rec)
            new_rows.append(rec["key"])
            have.add((rec["year"], rec["key"]))
    mx_path.write_text(json.dumps(mx, indent=2) + "\n", encoding="utf-8")

    for year, rows in by_year.items():
        existing = [r for r in rows if (ROOT / "years" / year / r[1]).is_file()]
        if existing:
            patch_home(year, existing)

    print(f"injected {len(added)}")
    print(f"already  {len(skipped)}")
    print(f"missing  {len(missing)}")
    for m in missing:
        print(" ", m)
    print(f"matrix +{len(new_rows)}")


if __name__ == "__main__":
    main()
