#!/usr/bin/env python3
"""Inject leftover official-trail machines. Idempotent. Forest: in place, no new folders."""
from pathlib import Path
import json
import os
import re

ROOT = Path(__file__).resolve().parents[1]
MARK = "ITT-LO-OFFICIAL"

# year, href, key suffix, trap label, save label, field placeholder or "", picks [(id,label)], need_pick or "", min_pick
DESTS = [
    ("1994", "sites/cern/index.html", "cern", "Browse modern CERN (trap)", "Open Line Mode leftover", "info.cern", [("path", "Line Mode leftover"), ("modern", "Modern CERN (trap)")], "path", 0),
    ("1994", "sites/nasa/index.html", "nasa", "Live NASA TV (trap)", "Open leftover mission", "", [("hubble", "Hubble leftover"), ("shuttle", "Shuttle leftover"), ("live", "Live TV (trap)")], "hubble", 0),
    ("1994", "sites/hotwired/index.html", "hotwired", "This is Twitter (trap)", "Open leftover headline", "wired leftover", [("headline", "Headline leftover"), ("tweet", "Tweet (trap)")], "headline", 0),
    ("1995", "sites/amazon/index.html", "amazon", "1-Click (trap)", "Search leftover book", "a leftover book", [("book", "Book leftover"), ("oneclick", "1-Click (trap)")], "book", 0),
    ("1995", "sites/yahoo/index.html", "yahoo", "Google search (trap)", "Open leftover directory", "", [("news", "News leftover"), ("sports", "Sports leftover")], "", 2),
    ("1995", "sites/cnn/index.html", "cnn", "Live CNN (trap)", "Open leftover headline", "", [("1995", "1995 leftover"), ("live", "Live CNN (trap)")], "1995", 0),
    ("1995", "sites/microsoft/index.html", "ms", "Windows 11 (trap)", "Note Win95 leftover", "", [("win95", "Win95 leftover"), ("win11", "Win11 (trap)")], "win95", 0),
    ("1995", "sites/classmates/index.html", "classmates", "Facebook (trap)", "Save leftover school", "high school leftover", [("school", "School leftover"), ("fb", "Facebook (trap)")], "school", 0),
    ("1996", "sites/yahoo/my.html", "myyahoo", "Sparse Google (trap)", "Save leftover modules", "", [("mail", "Mail leftover"), ("news", "News leftover")], "", 2),
    ("1996", "sites/geocities/index.html", "geocities", "Facebook (trap)", "Open leftover neighborhood", "", [("west", "West leftover"), ("fb", "Facebook (trap)")], "west", 0),
    ("1996", "sites/amazon/index.html", "amazon", "Prime (trap)", "Search leftover book", "a leftover book", [("book", "Book leftover"), ("prime", "Prime (trap)")], "book", 0),
    ("1996", "sites/auctionweb/index.html", "auctionweb", "Buy It Now (trap)", "Open leftover auction", "laptop leftover", [("bid", "Bid leftover"), ("bin", "Buy It Now (trap)")], "bid", 0),
    ("1996", "sites/excite/index.html", "excite", "Google (trap)", "Search leftover", "leftover query", [("q", "Excite leftover"), ("g", "Google (trap)")], "q", 0),
    ("1996", "sites/altavista/index.html", "av", "Google (trap)", "Search leftover", "leftover query", [("q", "AltaVista leftover"), ("g", "Google (trap)")], "q", 0),
    ("1997", "sites/ebay/item-laptop.html", "ebay", "Buy It Now (trap)", "Place leftover bid", "12.00", [("bid", "Bid leftover"), ("bin", "Buy It Now (trap)")], "bid", 0),
    ("1997", "sites/hotmail/index.html", "hotmail", "Gmail (trap)", "Send leftover mail", "leftover note", [("compose", "Compose leftover"), ("gmail", "Gmail (trap)")], "compose", 0),
    ("1997", "sites/hotbot/index.html", "hotbot", "Google (trap)", "Search leftover", "leftover query", [("q", "HotBot leftover"), ("g", "Google (trap)")], "q", 0),
    ("1997", "sites/aim/index.html", "aim-seed", "1999 mass AIM (trap)", "Save leftover screen name", "leftovername", [("seed", "1997 seed leftover"), ("mass", "1999 mass (trap)")], "seed", 0),
    ("1997", "sites/microsoft/index.html", "ms", "Azure (trap)", "Note IE4 leftover", "", [("ie4", "IE4 leftover"), ("azure", "Azure (trap)")], "ie4", 0),
    ("1998", "sites/google/index.html", "google", "ChatGPT (trap)", "Google Search leftover", "museum leftover", [("search", "Search leftover"), ("chat", "ChatGPT (trap)")], "search", 0),
    ("1998", "sites/yahoo/index.html", "yahoo", "Sparse Google (trap)", "Open leftover cats", "", [("news", "News leftover"), ("sports", "Sports leftover")], "", 2),
    ("1998", "sites/amazon/music.html", "amazon-music", "Spotify (trap)", "Search leftover album", "leftover album", [("cd", "CD leftover"), ("spotify", "Spotify (trap)")], "cd", 0),
    ("1998", "sites/ebay/index.html", "ebay", "Buy It Now only (trap)", "Search leftover auction", "leftover item", [("bid", "Bid leftover"), ("bin", "Buy It Now (trap)")], "bid", 0),
    ("1998", "sites/cdnow/index.html", "cdnow", "iTunes Store (trap)", "Search leftover CD", "leftover cd", [("cd", "CD leftover"), ("itunes", "iTunes (trap)")], "cd", 0),
    ("1998", "sites/hotmail/index.html", "hotmail", "Gmail 1GB (trap)", "Send leftover mail", "leftover note", [("compose", "Compose leftover"), ("gmail", "Gmail (trap)")], "compose", 0),
    ("1998", "sites/mozilla/index.html", "mozilla", "Download Firefox 1.0 (trap)", "Get the source leftover", "", [("mpl", "MPL 1.0 leftover"), ("fx", "Firefox 1.0 (trap)")], "mpl", 0),
    ("1998", "sites/slashdot/index.html", "slashdot", "Reddit (trap)", "Post leftover comment", "leftover comment", [("c", "Comment leftover"), ("reddit", "Reddit (trap)")], "c", 0),
    ("1998", "sites/dmoz/index.html", "dmoz", "Google Directory as chip (trap)", "Open leftover category", "", [("cat", "Category leftover"), ("gdir", "Google Directory chip (trap)")], "cat", 0),
    ("1999", "sites/google/index.html", "google", "I'm Feeling Lucky as 1999 star (trap)", "Search leftover", "leftover query", [("q", "Search leftover"), ("lucky", "Lucky star (trap)")], "q", 0),
    ("1999", "sites/blogger/edit.html", "blogger", "Twitter (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("tw", "Twitter (trap)")], "post", 0),
    ("1999", "sites/sourceforge/index.html", "sf", "GitHub as 1999 star (trap)", "Open leftover project", "leftover project", [("proj", "Project leftover"), ("gh", "GitHub (trap)")], "proj", 0),
    ("1999", "sites/amazon/index.html", "amazon", "Prime (trap)", "Search leftover book", "leftover book", [("book", "Book leftover"), ("prime", "Prime (trap)")], "book", 0),
    ("1999", "sites/ebay/item-laptop.html", "ebay", "Buy It Now (trap)", "Place leftover bid", "12.00", [("bid", "Bid leftover"), ("bin", "Buy It Now (trap)")], "bid", 0),
    ("1999", "sites/askjeeves/index.html", "jeeves", "This is Google (trap)", "Ask leftover question", "why leftover?", [("ask", "Jeeves leftover"), ("g", "Google (trap)")], "ask", 0),
    ("2000", "sites/amazon/index.html", "amazon", "1-Click as 2000-new (trap)", "Search leftover smile", "leftover book", [("book", "Smile leftover"), ("oneclick", "1-Click new (trap)")], "book", 0),
    ("2000", "sites/ebay/item-laptop.html", "ebay", "Live wallet (trap)", "Place leftover bid", "12.00", [("bid", "Bid leftover"), ("wallet", "Wallet (trap)")], "bid", 0),
    ("2000", "sites/gnutella/index.html", "gnutella", "Live P2P download (trap)", "Share leftover name", "leftover.mp3", [("share", "Share leftover"), ("dl", "Download (trap)")], "share", 0),
    ("2000", "sites/google/index.html", "google", "Lucky as 2000 star (trap)", "Search leftover", "leftover query", [("q", "Search leftover"), ("lucky", "Lucky star (trap)")], "q", 0),
    ("2000", "sites/cnn/index.html", "cnn", "Live CNN (trap)", "Open leftover headline", "", [("2000", "2000 leftover"), ("live", "Live (trap)")], "2000", 0),
    ("2000", "sites/y2k/index.html", "y2k", "The world ended (trap)", "Note 2000 hangover", "", [("hang", "Hangover leftover"), ("ended", "World ended (trap)")], "hang", 0),
    ("2001", "sites/apple/ipod.html", "ipod", "iPhone (trap)", "Pick leftover iPod", "", [("399", "$399 leftover"), ("iphone", "iPhone (trap)")], "399", 0),
    ("2001", "sites/apple/itunes.html", "itunes", "App Store (trap)", "Name leftover library", "leftover library", [("lib", "Library leftover"), ("apps", "App Store (trap)")], "lib", 0),
    ("2001", "sites/broadband/index.html", "broadband", "5G (trap)", "Note always-on leftover", "", [("on", "Always-on leftover"), ("5g", "5G (trap)")], "on", 0),
    ("2001", "sites/microsoft/ie6.html", "ie6", "Edge (trap)", "Download IE6 leftover", "", [("ie6", "IE6 leftover"), ("edge", "Edge (trap)")], "ie6", 0),
    ("2001", "sites/wayback/index.html", "wayback", "Live archive.org as star (trap)", "Open leftover URL", "http://example.com", [("url", "URL leftover"), ("live", "Live archive star (trap)")], "url", 0),
    ("2001", "sites/google/index.html", "google", "Lucky as 2001 star (trap)", "Search leftover", "leftover query", [("q", "Search leftover"), ("lucky", "Lucky (trap)")], "q", 0),
    ("2001", "sites/blogger/index.html", "blogger", "WordPress 2003 (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("wp", "WordPress (trap)")], "post", 0),
    ("2001", "sites/movabletype/index.html", "mt", "Medium (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("med", "Medium (trap)")], "post", 0),
    ("2002", "sites/friendster/index.html", "friendster", "Facebook (trap)", "Save leftover testimonial", "leftover note", [("note", "Testimonial leftover"), ("fb", "Facebook (trap)")], "note", 0),
    ("2002", "sites/kazaa/index.html", "kazaa", "Live torrent (trap)", "Search leftover", "leftover.mp3", [("q", "Search leftover"), ("dl", "Download (trap)")], "q", 0),
    ("2002", "sites/blogger/index.html", "blogger", "Twitter (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("tw", "Twitter (trap)")], "post", 0),
    ("2002", "sites/googlenews/index.html", "gnews", "Twitter feed (trap)", "Open leftover headline", "", [("h", "Headline leftover"), ("tw", "Twitter (trap)")], "h", 0),
    ("2002", "sites/wikipedia/index.html", "wiki", "2001 edit star (trap)", "Open leftover article", "leftover article", [("art", "Article leftover"), ("edit", "2001 edit star (trap)")], "art", 0),
    ("2002", "sites/daypop/index.html", "daypop", "Google (trap)", "Open leftover link", "leftover link", [("link", "Link leftover"), ("g", "Google (trap)")], "link", 0),
    ("2002", "sites/wired/index.html", "wired", "Live Wired (trap)", "Note 2002 redesign leftover", "", [("redesign", "2002 leftover"), ("live", "Live Wired (trap)")], "redesign", 0),
    ("2002", "sites/google/index.html", "google", "Lucky as 2002 star (trap)", "Search leftover", "leftover query", [("q", "Search leftover"), ("lucky", "Lucky (trap)")], "q", 0),
    ("2003", "sites/myspace/index.html", "myspace", "Facebook / TikTok (trap)", "Save leftover profile", "leftover name", [("tom", "Tom leftover"), ("fb", "Facebook (trap)")], "tom", 0),
    ("2003", "sites/itunes/index.html", "itunes", "App Store 2008 (trap)", "Search leftover track", "leftover track", [("track", "Track leftover"), ("apps", "App Store (trap)")], "track", 0),
    ("2003", "sites/wordpress/index.html", "wp", "Medium (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("med", "Medium (trap)")], "post", 0),
    ("2003", "sites/linkedin/index.html", "li", "Meta (trap)", "Connect leftover", "leftover name", [("connect", "Connect leftover"), ("meta", "Meta (trap)")], "connect", 0),
    ("2003", "sites/friendster/index.html", "friendster", "2002 Stumble star (trap)", "Save leftover testimonial", "leftover note", [("note", "Testimonial leftover"), ("stumble", "Stumble star (trap)")], "note", 0),
    ("2003", "sites/bloglines/index.html", "bloglines", "Twitter (trap)", "Add leftover feed", "http://leftover.example", [("feed", "Feed leftover"), ("tw", "Twitter (trap)")], "feed", 0),
    ("2003", "sites/adsense/index.html", "adsense", "AdSense as 2020 gold (trap)", "Name leftover site", "leftover.site", [("site", "Site leftover"), ("gold", "2020 gold (trap)")], "site", 0),
    ("2003", "sites/blogger/index.html", "blogger", "WordPress (trap)", "Publish leftover post", "leftover post", [("post", "Post leftover"), ("wp", "WordPress (trap)")], "post", 0),
    ("2003", "sites/google/index.html", "google", "Lucky as 2003 star (trap)", "Search leftover", "leftover query", [("q", "Search leftover"), ("lucky", "Lucky (trap)")], "q", 0),
    ("2004", "sites/gmail/index.html", "gmail", "April Fools skip (trap)", "Request leftover invite", "wait@museum", [("invite", "Invite leftover"), ("joke", "April Fools skip (trap)")], "invite", 0),
    ("2004", "sites/firefox/index.html", "fx", "Chrome (trap)", "Download Fx 1.0 leftover", "", [("fx", "Firefox 1.0 leftover"), ("chrome", "Chrome (trap)")], "fx", 0),
    ("2004", "sites/flickr/index.html", "flickr", "Instagram (trap)", "Title leftover photo", "leftover photo", [("photo", "Photo leftover"), ("ig", "Instagram (trap)")], "photo", 0),
    ("2004", "sites/delicious/index.html", "delicious", "Twitter likes (trap)", "Save leftover tag", "leftover", [("tag", "Tag leftover"), ("likes", "Twitter likes (trap)")], "tag", 0),
    ("2004", "sites/digg/index.html", "digg", "Reddit 2005 (trap)", "Submit leftover", "leftover link", [("sub", "Submit leftover"), ("reddit", "Reddit (trap)")], "sub", 0),
    ("2004", "sites/facebook/friends.html", "fb-friends", "News Feed 2006 (trap)", "Add leftover friend", "leftover name", [("add", "Add leftover"), ("feed", "News Feed (trap)")], "add", 0),
    ("2004", "sites/facebook/profile.html", "fb-profile", "Timeline 2011 (trap)", "Save leftover profile", "leftover about", [("about", "About leftover"), ("tl", "Timeline (trap)")], "about", 0),
    ("2004", "sites/facebook/invite.html", "fb-invite", "Open Facebook (trap)", "Send leftover invite", "wait@museum", [("invite", "Invite leftover"), ("open", "Open Facebook (trap)")], "invite", 0),
    ("2004", "sites/web20conference/index.html", "web20", "SXSW as star (trap)", "Pick leftover session", "", [("sess", "Session leftover"), ("sxsw", "SXSW star (trap)")], "sess", 0),
    ("2005", "sites/maps/index.html", "maps", "Live Google Maps (trap)", "Search leftover address", "leftover street", [("addr", "Address leftover"), ("live", "Live Maps (trap)")], "addr", 0),
    ("2005", "sites/housingmaps/index.html", "housingmaps", "Zillow (trap)", "Drop leftover pin", "", [("pin", "Pin leftover"), ("zillow", "Zillow (trap)")], "pin", 0),
    ("2005", "sites/digg/index.html", "digg", "Bury as star (trap)", "Digg leftover", "", [("digg", "Digg leftover"), ("bury", "Bury star (trap)")], "digg", 0),
    ("2005", "sites/reddit/index.html", "reddit", "2018 redesign (trap)", "Submit leftover", "leftover link", [("sub", "Submit leftover"), ("redesign", "2018 redesign (trap)")], "sub", 0),
    ("2005", "sites/flickr/index.html", "flickr", "Instagram (trap)", "Title leftover photo", "leftover photo", [("photo", "Photo leftover"), ("ig", "Instagram (trap)")], "photo", 0),
    ("2005", "sites/itunes/index.html", "itunes", "Podcasts as star (trap)", "Search leftover show", "leftover show", [("show", "Show leftover"), ("star", "Podcasts star (trap)")], "show", 0),
    ("2005", "sites/techcrunch/index.html", "techcrunch", "This is the 2005 chip (trap)", "Open leftover post", "leftover startup", [("post", "Post leftover"), ("chip", "Chip (trap)")], "post", 0),
    ("2006", "sites/youtube/index.html", "yt", "2005 upload star (trap)", "Watch leftover", "", [("watch", "Watch leftover"), ("upload", "2005 upload star (trap)")], "watch", 0),
    ("2006", "sites/digg/index.html", "digg", "Reddit as 2006 star (trap)", "Digg leftover", "", [("digg", "Digg leftover"), ("reddit", "Reddit star (trap)")], "digg", 0),
    ("2006", "sites/reddit/index.html", "reddit", "2018 redesign (trap)", "Submit leftover", "leftover link", [("sub", "Submit leftover"), ("redesign", "2018 (trap)")], "sub", 0),
    ("2006", "sites/docs/index.html", "docs", "Office 365 (trap)", "Name leftover doc", "leftover.doc", [("doc", "Doc leftover"), ("o365", "Office 365 (trap)")], "doc", 0),
    ("2006", "sites/aws/index.html", "aws", "ChatGPT (trap)", "Note S3 leftover", "", [("s3", "S3 leftover"), ("chat", "ChatGPT (trap)")], "s3", 0),
    ("2006", "sites/reader/index.html", "reader", "Twitter (trap)", "Add leftover feed", "http://leftover.example", [("feed", "Feed leftover"), ("tw", "Twitter (trap)")], "feed", 0),
    ("2006", "sites/time-you/index.html", "time-you", "This is the 2006 chip (trap)", "Note Person of the Year leftover", "", [("you", "You leftover"), ("chip", "Chip (trap)")], "you", 0),
    ("2008", "sites/appstore/index.html", "apps", "Play Store as 2008 star (trap)", "Get leftover app", "", [("free", "FREE leftover"), ("play", "Play Store star (trap)")], "free", 0),
    ("2008", "sites/chrome/index.html", "chrome", "Chrome as 2008 star (trap)", "Note Chrome leftover", "", [("habit", "Habit leftover"), ("star", "Star (trap)")], "habit", 0),
    ("2008", "sites/android/index.html", "android", "iPhone as Android (trap)", "Note G1 leftover", "", [("g1", "G1 leftover"), ("iphone", "iPhone (trap)")], "g1", 0),
    ("2008", "sites/hulu/index.html", "hulu", "Netflix as 2008 star (trap)", "Play leftover episode", "", [("play", "Play leftover"), ("nflx", "Netflix star (trap)")], "play", 0),
    ("2008", "sites/facebook/index.html", "facebook", "News Feed as 2008 star (trap)", "Open leftover feed", "", [("feed", "Feed leftover"), ("star", "Star (trap)")], "feed", 0),
    ("2008", "sites/twitter/index.html", "tweets", "280 (trap)", "Tweet leftover 140", "leftover tweet", [("140", "140 leftover"), ("280", "280 (trap)")], "140", 0),
    ("2008", "sites/youtube/index.html", "yt", "2005 upload star (trap)", "Watch leftover", "", [("watch", "Watch leftover"), ("upload", "Upload star (trap)")], "watch", 0),
    ("2008", "sites/dropbox/index.html", "dropbox", "Drive as 2008 star (trap)", "Save leftover file", "leftover.txt", [("file", "File leftover"), ("drive", "Drive star (trap)")], "file", 0),
    ("2008", "sites/iphone/index.html", "iphone3g", "App Store as this dest (trap)", "Note 3G leftover", "", [("3g", "3G leftover"), ("store", "App Store dest (trap)")], "3g", 0),
    ("2010", "sites/youtube/index.html", "yt", "2005 upload star (trap)", "Watch leftover", "", [("watch", "Watch leftover"), ("upload", "Upload star (trap)")], "watch", 0),
    ("2012", "sites/facebook/ipo.html", "fb-ipo", "Nasdaq was fine / $43 (trap)", "Note $38 leftover", "", [("38", "$38 leftover"), ("43", "$43 (trap)")], "38", 0),
    ("2012", "sites/facebook/index.html", "facebook", "1 billion users (trap)", "Note 1B MAU leftover", "", [("mau", "MAU leftover"), ("users", "Users (trap)")], "mau", 0),
    ("2012", "sites/iphone/maps.html", "maps", "Maps is fine (trap)", "Note flop leftover", "", [("flop", "Flop leftover"), ("fine", "Fine (trap)")], "flop", 0),
    ("2012", "sites/wikipedia/sopa.html", "sopa", "Skip the blackout (trap)", "Note 18 Jan leftover", "", [("blackout", "Blackout leftover"), ("skip", "Skip (trap)")], "blackout", 0),
    ("2013", "sites/iphone/ios7.html", "ios7", "Keep iOS 6 (trap)", "Note flat leftover", "", [("flat", "Flat leftover"), ("skeu", "iOS 6 (trap)")], "flat", 0),
    ("2013", "sites/iphone/touchid.html", "touchid", "Face ID (trap)", "Hold leftover", "", [("hold", "Hold leftover"), ("face", "Face ID (trap)")], "hold", 0),
    ("2013", "sites/snowden/index.html", "snowden-ack", "Live leak dump (trap)", "Name leftover doc", "leftover doc", [("doc", "Doc leftover"), ("dump", "Dump (trap)")], "doc", 0),
    ("2013", "sites/tumblr/index.html", "tumblr-yahoo", "Yahoo killed it in 2013 (trap)", "Open leftover dashboard", "", [("dash", "Dashboard leftover"), ("dead", "Killed (trap)")], "dash", 0),
    ("2013", "sites/windows81/index.html", "win81", "Win11 / January chrome (trap)", "Note Start leftover", "", [("start", "Start leftover"), ("win11", "Win11 (trap)")], "start", 0),
    ("2019", "sites/chrome/index.html", "chrome", "Make Edge default (trap)", "Keep Chrome habit", "youtube.com", [("habit", "Habit leftover"), ("edge", "Edge default (trap)")], "habit", 0),
    ("2019", "sites/windows10/index.html", "win10", "Get Windows 10 / Win11 (trap)", "Stay on Win10 mass", "", [("stay", "Stay leftover"), ("get", "Get Win10 (trap)")], "stay", 0),
    ("2019", "sites/fortnite/marshmello.html", "marshmello", "Live concert / Travis (trap)", "Note in-game leftover", "", [("ingame", "In-game leftover"), ("travis", "Travis (trap)")], "ingame", 0),
    ("2007", "sites/youtube/index.html", "yt", "2005 upload star (trap)", "Watch leftover", "", [("watch", "Watch leftover"), ("upload", "Upload star (trap)")], "watch", 0),
    ("2007", "sites/myspace/index.html", "myspace", "Facebook (trap)", "Open leftover profile", "", [("mass", "Mass leftover"), ("fb", "Facebook (trap)")], "mass", 0),
    ("2007", "sites/digg/index.html", "digg", "Reddit as 2007 star (trap)", "Digg leftover", "", [("digg", "Digg leftover"), ("reddit", "Reddit star (trap)")], "digg", 0),
    ("2007", "sites/vista/index.html", "vista", "Win11 (trap)", "Note Vista leftover", "", [("retail", "Retail leftover"), ("win11", "Win11 (trap)")], "retail", 0),
    ("2009", "sites/windows7/index.html", "win7", "Win11 (trap)", "Note Win7 leftover", "", [("retail", "22 Oct leftover"), ("win11", "Win11 (trap)")], "retail", 0),
    ("2011", "sites/facebook/index.html", "timeline", "News Feed as Timeline (trap)", "Note Timeline leftover", "", [("tl", "Timeline leftover"), ("feed", "Feed star (trap)")], "tl", 0),
    ("2011", "sites/instagram/index.html", "ig", "Android / 2012 (trap)", "Note iOS leftover", "", [("ios", "iOS leftover"), ("android", "Android (trap)")], "ios", 0),
    ("2011", "sites/qwikster/index.html", "qwikster", "Qwikster shipped (trap)", "Note funeral leftover", "", [("funeral", "Funeral leftover"), ("shipped", "Shipped (trap)")], "funeral", 0),
    ("2013", "sites/instagram/video.html", "ig-posts", "Skip 15s (trap)", "Note 15s leftover", "", [("sec", "15s leftover"), ("skip", "Skip (trap)")], "sec", 0),
]

# Fill trail whenKey only — dest already writes this key (do not inject a second game machine).
WHENKEY_ONLY = [
    ("2010", "sites/playable/game.html", "game-slingnest"),
]


def relhref(from_href, to_href):
    src = Path(from_href).parent
    dst = Path(to_href)
    try:
        return Path(os.path.relpath(dst, src)).as_posix()
    except ValueError:
        return "../" + to_href.split("/", 1)[-1] if "/" in to_href else to_href


def trail_index():
    raw = (ROOT / "js/config/flow-trails.js").read_text(encoding="utf-8", errors="replace")
    out = {}
    year = None
    for line in raw.splitlines():
        ym = re.search(r'"(\d{4})":\s*\[', line)
        if ym:
            year = ym.group(1)
            continue
        if year is None:
            continue
        hm = re.search(
            r'"href":\s*"([^"]+)"[^}]*"whenKey":\s*"([^"]*)"[^}]*"nextHref":\s*"([^"]+)"[^}]*"nextLabel":\s*"([^"]*)"',
            line,
        )
        if hm:
            out[(year, hm.group(1))] = {
                "whenKey": hm.group(2),
                "nextHref": hm.group(3),
                "nextLabel": hm.group(4),
            }
    return out


def panel(year, key, trap, save, field, picks, need, minp, next_href="", next_label=""):
    bits = [
        f"<!-- {MARK}:start -->",
        f'<section data-lo-panel="1" data-itt-year="{year}" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">',
        f"<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt{year[2:]}-{key}</code></p>",
        '<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>',
        '<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>',
        "<p>",
    ]
    for pid, lab in picks:
        bits.append(f' <button type="button" data-lo-pick="{pid}">{lab}</button>')
    bits.append("</p>")
    if field:
        bits.append(f'<p><input data-lo-field placeholder="{field}" maxlength="80"></p>')
    need_attr = f' data-lo-need-pick="{need}"' if need else ""
    min_attr = f' data-lo-min-pick="{minp}"' if minp else ""
    bits.append("<p>")
    bits.append(f' <button type="button" data-lo-trap>{trap}</button>')
    bits.append(f' <button type="button" data-lo-save data-lo-key="{key}"{need_attr}{min_attr}>{save}</button>')
    bits.append("</p>")
    bits.append('<p data-lo-status></p>')
    if next_href:
        bits.append(
            f'<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{key}">'
            f"<b>Next:</b> <a href=\"{next_href}\">{next_label or 'Next leftover'}</a></p>"
        )
    bits.append("</section>")
    bits.append(f"<!-- {MARK}:end -->")
    return "\n".join(bits)


def inject(path: Path, html_block: str) -> bool:
    raw = path.read_text(encoding="utf-8", errors="replace")
    if MARK + ":start" in raw:
        raw = re.sub(
            r"<!-- " + MARK + r":start -->.*?<!-- " + MARK + r":end -->\n?",
            "",
            raw,
            flags=re.S,
        )
    if "</body>" in raw:
        raw = raw.replace("</body>", html_block + "\n</body>", 1)
    else:
        raw += "\n" + html_block + "\n"
    path.write_text(raw, encoding="utf-8")
    return True


def fill_whenkeys(rows):
    path = ROOT / "js/config/flow-trails.js"
    text = path.read_text(encoding="utf-8")
    filled = 0
    for year, href, key in rows:
        m = re.search(rf'"{year}":\s*\[', text)
        if not m:
            print("NO YEAR BLOCK", year)
            continue
        start = m.end()
        nxt = re.search(r'\n    "\d{4}":\s*\[', text[start:])
        end = start + nxt.start() if nxt else len(text)
        block = text[start:end]
        href_esc = re.escape(href)
        new_block, n = re.subn(
            rf'("href": "{href_esc}", "match": "[^"]*", "whenKey": )""',
            rf'\1"itt{year[2:]}-{key}"',
            block,
            count=1,
        )
        if n:
            text = text[:start] + new_block + text[end:]
            filled += 1
    path.write_text(text, encoding="utf-8")
    return filled


def write_matrix(rows):
    dests = []
    for year, href, key, trap, save, field, picks, need, minp in rows:
        dests.append({
            "year": year,
            "href": href,
            "key": f"itt{year[2:]}-{key}",
            "suffix": key,
            "needPick": need or "",
            "minPick": int(minp or 0),
            "field": bool(field),
            "placeholder": field or "",
        })
    out = ROOT / "e2e/leftover-official.matrix.json"
    out.write_text(json.dumps({"dests": dests}, indent=2) + "\n", encoding="utf-8")
    return len(dests)


def main():
    trails = trail_index()
    n = 0
    missing = 0
    for row in DESTS:
        year, href, key, trap, save, field, picks, need, minp = row
        path = ROOT / "years" / year / href
        if not path.exists():
            print("MISSING", year, href)
            missing += 1
            continue
        info = trails.get((year, href), {})
        nxt = ""
        lab = info.get("nextLabel") or ""
        if info.get("nextHref"):
            nxt = relhref(href, info["nextHref"])
        inject(path, panel(year, key, trap, save, field, picks, need, minp, nxt, lab))
        n += 1
    when_rows = [(r[0], r[1], r[2]) for r in DESTS] + WHENKEY_ONLY
    filled = fill_whenkeys(when_rows)
    matrix_n = write_matrix(DESTS)
    print("injected", n, "missing", missing, "whenKeys", filled, "matrix", matrix_n)


if __name__ == "__main__":
    main()
