#!/usr/bin/env python3
"""2× REAL dests — leftover writers on existing rooms (every ship year).

Band B/C (2001–2011, 2015–2018): inject 18 ITT-4X leftover panels.
Band A (1994–2000, 2012): already have 18 writers — add more.html
continuation dests on single-page leftovers (second path, new keys).

Does not: move stars, grow guided <ol>, invent brand pixels, dest-field plaques.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent: marked blocks replaced in place.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WIPED = {"2005", "2006", "2007"}

# year, rel-from-year-root, suffix, kind, title, extra, next-rel, next-label
# extra: query placeholder | hops [(id,label)] | checks [label] | wait ms | toggle None
Flow = tuple

WRITERS: dict[str, list[Flow]] = {}
# Old leftover suffix to strip after a collision rename (year, path) → {old_suffix}
RETIRE: dict[tuple[str, str], set[str]] = {}

# Leftover suffixes that reused official product / 5× trail keys. Rename so leftover
# write never overwrites the year machine (docs seed, Top 8, Gmail, YearExtras, …).
COLLIDE: dict[tuple[str, str], str] = {
    ("2002", "gnews"): "gnews-lx",
    ("2003", "ms-top8"): "ms-top8-lx",
    ("2003", "adsense"): "adsense-lx",
    ("2003", "skype"): "skype-lx",
    ("2004", "flickr"): "flickr-lx",
    ("2004", "weather"): "weather-lx",
    ("2005", "hm"): "hm-lx",
    ("2005", "gmail"): "gmail-lx",
    ("2005", "kayak"): "kayak-lx",
    ("2006", "fb-feed"): "fb-feed-lx",
    ("2006", "docs"): "docs-lx",
    ("2006", "meebo"): "meebo-lx",
    ("2006", "gmail"): "gmail-lx",
    ("2007", "fb-app"): "fb-app-lx",
    ("2007", "kindle"): "kindle-lx",
    ("2007", "etsy"): "etsy-lx",
    ("2008", "g1"): "g1-lx",
    ("2008", "db"): "db-lx",
    ("2008", "groupon"): "groupon-lx",
    ("2008", "evernote"): "evernote-lx",
    ("2009", "4sq"): "4sq-lx",
    ("2009", "ks"): "ks-lx",
    ("2009", "wave"): "wave-lx",
    ("2009", "chrome"): "chrome-lx",
    ("2010", "4sq"): "4sq-lx",
    ("2010", "imgur"): "imgur-lx",
    ("2010", "pin"): "pin-lx",
    ("2011", "timeline"): "timeline-lx",
    ("2011", "ipad2"): "ipad2-lx",
    ("2011", "pin"): "pin-lx",
    ("2015", "win10"): "win10-lx",
    ("2015", "edge"): "edge-lx",
    ("2015", "le"): "le-lx",
    ("2015", "echo"): "echo-lx",
    ("2015", "watch"): "watch-lx",
    ("2016", "pogo"): "pogo-lx",
    ("2016", "wa-e2e"): "wa-e2e-lx",
    ("2016", "iphone7"): "iphone7-lx",
    ("2016", "vine-end"): "vine-end-lx",
    ("2016", "win10-end"): "win10-end-lx",
    ("2016", "dyn"): "dyn-lx",
    ("2016", "airpods"): "airpods-lx",
    ("2017", "animoji"): "animoji-lx",
    ("2017", "teams"): "teams-lx",
    ("2017", "vine-gone"): "vine-gone-lx",
    ("2017", "switch"): "switch-lx",
    ("2018", "igtv"): "igtv-lx",
}


def F(year: str, path: str, suffix: str, kind: str, title: str, extra, nxt: str, nl: str) -> None:
    if year in WIPED:
        return
    new = COLLIDE.get((year, suffix), suffix)
    if new != suffix:
        RETIRE.setdefault((year, path), set()).add(suffix)
    WRITERS.setdefault(year, []).append((path, new, kind, title, extra, nxt, nl))


# ---------------------------------------------------------------------------
# 2001
# ---------------------------------------------------------------------------
F("2001", "sites/wikipedia/edit.html", "wiki-prev", "hops", "Wiki preview then leftover",
  [("preview", "Preview"), ("history", "History")], "sites/apple/ipod.html", "iPod library")
F("2001", "sites/apple/ipod.html", "ipod-lib", "query", "Name a track in the iPod library",
  "Think Different", "sites/broadband/index.html", "Always-on ISP")
F("2001", "sites/broadband/index.html", "broadband", "checks", "Always-on ISP leftover",
  ["This is XP-era always-on theater", "Not a real ISP signup"], "sites/msn/index.html", "MSN sign-on")
F("2001", "sites/msn/index.html", "msn-sign", "query", "MSN leftover sign-on",
  "you@hotmail.com", "sites/google/index.html", "Google catalog")
F("2001", "sites/google/index.html", "google-q", "query", "Google 2001 catalog query",
  "wikipedia", "sites/yahoo/index.html", "Yahoo rails")
F("2001", "sites/yahoo/index.html", "yahoo-hop", "hops", "Yahoo 2001 two hubs",
  [("news", "News"), ("mail", "Mail")], "sites/amazon/index.html", "Amazon smile cart")
F("2001", "sites/amazon/index.html", "cart", "query", "Amazon smile leftover search",
  "Harry Potter", "sites/ebay/index.html", "eBay bid")
F("2001", "sites/ebay/index.html", "ebay-bid", "query", "eBay leftover bid theater",
  "laptop", "sites/napster/index.html", "Napster endgame")
F("2001", "sites/napster/index.html", "napster-q", "query", "Napster leftover search (no files)",
  "mp3 query", "sites/gnutella/index.html", "Gnutella")
F("2001", "sites/gnutella/index.html", "gnutella", "checks", "Gnutella scare leftover",
  ["No real P2P bytes", "Museum theater only"], "sites/wayback/index.html", "Wayback")
F("2001", "sites/wayback/index.html", "wayback-q", "query", "Wayback first-look leftover",
  "http://www.yahoo.com/", "sites/blogger/index.html", "Blogger")
F("2001", "sites/blogger/index.html", "blog-q", "query", "Blogger leftover title",
  "warblog note", "sites/movabletype/index.html", "Movable Type")
F("2001", "sites/movabletype/index.html", "mt-hop", "hops", "Movable Type leftover hops",
  [("publish", "Publish"), ("tb", "TrackBack")], "sites/mozilla/index.html", "Mozilla")
F("2001", "sites/mozilla/index.html", "mozilla-ack", "checks", "Mozilla 0.9 leftover",
  ["Not Firefox 1.0 yet", "Open-source leftover"], "sites/cnet/index.html", "CNET")
F("2001", "sites/cnet/index.html", "cnet-dl", "query", "CNET leftover download name",
  "winzip.exe", "sites/bbc/index.html", "BBC")
F("2001", "sites/bbc/index.html", "bbc-q", "query", "BBC leftover headline",
  "front page", "sites/encarta/index.html", "Encarta")
F("2001", "sites/encarta/index.html", "encarta-ack", "checks", "Encarta vs wiki leftover",
  ["Paid encyclopedia leftover", "Wikipedia is the chip"], "sites/pets/index.html", "Pets archive")
F("2001", "sites/pets/index.html", "pets-ack", "checks", "Pets.com archive leftover",
  ["Sock puppet is gone", "Not a live shop"], "sites/wikipedia/edit.html", "Wikipedia")

# ---------------------------------------------------------------------------
# 2002
# ---------------------------------------------------------------------------
F("2002", "sites/stumbleupon/index.html", "stumble-2x", "hops", "Stumble leftover ×2",
  [("one", "Stumble 1"), ("two", "Stumble 2")], "sites/friendster/index.html", "Friendster")
F("2002", "sites/friendster/index.html", "ftest", "query", "Friendster leftover testimonial",
  "college roommate", "sites/kazaa/index.html", "KaZaA")
F("2002", "sites/kazaa/index.html", "kazaa-q", "query", "KaZaA leftover search (no files)",
  "song title", "sites/netflix/index.html", "Netflix queue")
F("2002", "sites/netflix/index.html", "nfq", "query", "Netflix DVD leftover queue",
  "Amelie", "sites/wired/index.html", "Wired")
F("2002", "sites/wired/index.html", "wired-hop", "hops", "Wired CSS leftover hops",
  [("css", "CSS"), ("rss", "RSS")], "sites/googlenews/index.html", "Google News")
F("2002", "sites/googlenews/index.html", "gnews", "query", "Google News BETA leftover",
  "iraq", "sites/daypop/index.html", "Daypop")
F("2002", "sites/daypop/index.html", "daypop", "query", "Daypop leftover query",
  "blog", "sites/technorati/index.html", "Technorati")
F("2002", "sites/technorati/index.html", "cosmos", "query", "Technorati cosmos leftover",
  "http://blogger.com/", "sites/blogger/index.html", "Blogger")
F("2002", "sites/blogger/index.html", "blog-q", "query", "Blogger Pyra leftover",
  "hello weblog", "sites/phoenix/index.html", "Phoenix")
F("2002", "sites/phoenix/index.html", "phoenix-ack", "checks", "Phoenix 0.1 leftover",
  ["Not Firefox branded yet", "0.1 leftover"], "sites/lastfm/index.html", "Last.fm")
F("2002", "sites/lastfm/index.html", "lastfm", "query", "Last.fm leftover seed",
  "radiohead", "sites/steam/index.html", "Steam")
F("2002", "sites/steam/index.html", "steam-ack", "checks", "Steam leftover",
  ["Not a real install", "2002 leftover"], "sites/meetup/index.html", "Meetup")
F("2002", "sites/meetup/index.html", "meetup", "query", "Meetup leftover RSVP",
  "web standards", "sites/fotolog/index.html", "Fotolog")
F("2002", "sites/fotolog/index.html", "fotolog", "query", "Fotolog leftover caption",
  "roof", "sites/typepad/index.html", "TypePad")
F("2002", "sites/typepad/index.html", "typepad", "query", "TypePad leftover publish",
  "hello", "sites/askjeeves/index.html", "Ask Jeeves")
F("2002", "sites/askjeeves/index.html", "ask", "query", "Ask leftover question",
  "what is broadband", "sites/amazon/index.html", "Amazon")
F("2002", "sites/amazon/index.html", "cart", "query", "Amazon smile leftover",
  "book title", "sites/wikipedia/index.html", "Wikipedia")
F("2002", "sites/wikipedia/index.html", "wiki-hop", "hops", "Wikipedia leftover hops",
  [("edit", "Edit"), ("hist", "History")], "sites/stumbleupon/index.html", "Stumble")

# ---------------------------------------------------------------------------
# 2003
# ---------------------------------------------------------------------------
F("2003", "sites/photobucket/index.html", "pb-fn", "query", "Photobucket leftover filename",
  "vacation.jpg", "sites/myspace/index.html", "MySpace")
F("2003", "sites/myspace/index.html", "ms-top8", "hops", "MySpace leftover two friends",
  [("tom", "Tom"), ("friend", "Friend")], "sites/itunes/index.html", "iTunes Store")
F("2003", "sites/itunes/index.html", "it99", "query", "iTunes 99¢ leftover",
  "Hey Ya", "sites/wordpress/index.html", "WordPress")
F("2003", "sites/wordpress/index.html", "wppub", "query", "WordPress leftover publish",
  "hello world", "sites/linkedin/index.html", "LinkedIn")
F("2003", "sites/linkedin/index.html", "li-inv", "query", "LinkedIn leftover invite",
  "classmate", "sites/adsense/index.html", "AdSense")
F("2003", "sites/adsense/index.html", "adsense", "query", "AdSense leftover site",
  "myblog.example", "sites/bloglines/index.html", "Bloglines")
F("2003", "sites/bloglines/index.html", "bl", "query", "Bloglines leftover subscribe",
  "http://scripting.com/rss.xml", "sites/friendster/index.html", "Friendster")
F("2003", "sites/friendster/index.html", "ftest", "query", "Friendster leftover (still larger)",
  "display name", "sites/skype/index.html", "Skype")
F("2003", "sites/skype/index.html", "skype", "checks", "Skype leftover call theater",
  ["No real call", "2003 leftover"], "sites/delicious/index.html", "del.icio.us")
F("2003", "sites/delicious/index.html", "del", "query", "del.icio.us leftover post",
  "http://example.com/", "sites/4chan/index.html", "4chan literacy")
F("2003", "sites/4chan/index.html", "board", "query", "4chan leftover board code",
  "/mu/", "sites/hi5/index.html", "hi5")
F("2003", "sites/hi5/index.html", "hi5", "query", "hi5 leftover add",
  "roommate", "sites/newgrounds/index.html", "Newgrounds")
F("2003", "sites/newgrounds/index.html", "ng", "query", "Newgrounds leftover play theater",
  "tank game", "sites/secondlife/index.html", "Second Life")
F("2003", "sites/secondlife/index.html", "sl", "checks", "Second Life leftover",
  ["Grid leftover", "No live client"], "sites/walmart/index.html", "Walmart")
F("2003", "sites/walmart/index.html", "wm", "query", "Walmart leftover cart theater",
  "dvd", "sites/zengarden/index.html", "Zen Garden")
F("2003", "sites/zengarden/index.html", "zen", "hops", "CSS Zen Garden leftover themes",
  [("a", "Theme A"), ("b", "Theme B")], "sites/phoenix/index.html", "Phoenix")
F("2003", "sites/phoenix/index.html", "phoenix-ack", "checks", "Phoenix leftover",
  ["Not Firefox 1.0", "2003 leftover"], "sites/wikipedia/index.html", "Wikipedia")
F("2003", "sites/wikipedia/index.html", "wiki-hop", "hops", "Wikipedia leftover hops",
  [("edit", "Edit"), ("hist", "History")], "sites/photobucket/index.html", "Photobucket")

# ---------------------------------------------------------------------------
# 2004
# ---------------------------------------------------------------------------
F("2004", "sites/facebook/networks.html", "fb-net", "hops", "thefacebook leftover two campuses",
  [("harvard", "Harvard"), ("stanford", "Stanford")], "sites/gmail/index.html", "Gmail")
F("2004", "sites/gmail/index.html", "gmail-inv", "query", "Gmail leftover invite login",
  "you@gmail.com", "sites/flickr/index.html", "Flickr")
F("2004", "sites/flickr/index.html", "flickr", "query", "Flickr leftover title",
  "golden gate", "sites/firefox/index.html", "Firefox")
F("2004", "sites/firefox/index.html", "ff-ack", "checks", "Firefox 1.0 leftover",
  ["Nov 9 leftover", "Not Chrome"], "sites/digg/index.html", "Digg")
F("2004", "sites/digg/index.html", "digg-seed", "query", "Digg leftover submit",
  "web 2.0 story", "sites/orkut/index.html", "Orkut")
F("2004", "sites/orkut/index.html", "orkut", "query", "Orkut leftover add",
  "friend BR", "sites/livejournal/index.html", "LiveJournal")
F("2004", "sites/livejournal/index.html", "lj", "query", "LiveJournal leftover update",
  "today", "sites/craigslist/index.html", "Craigslist")
F("2004", "sites/craigslist/index.html", "cl", "query", "Craigslist leftover post",
  "bike for sale", "sites/yelp/index.html", "Yelp")
F("2004", "sites/yelp/index.html", "yelp", "query", "Yelp leftover local",
  "tacos", "sites/piczo/index.html", "Piczo")
F("2004", "sites/piczo/index.html", "piczo", "query", "Piczo leftover layout",
  "sparkle", "sites/tagged/index.html", "Tagged")
F("2004", "sites/tagged/index.html", "tagged", "query", "Tagged leftover tag",
  "classmate", "sites/odeo/index.html", "Odeo")
F("2004", "sites/odeo/index.html", "odeo", "query", "Odeo leftover subscribe",
  "IT Conversations", "sites/worldofwarcraft/index.html", "WoW")
F("2004", "sites/worldofwarcraft/index.html", "wow", "checks", "WoW retail leftover",
  ["Retail leftover", "No live realm"], "sites/feedburner/index.html", "FeedBurner")
F("2004", "sites/feedburner/index.html", "fburn", "query", "FeedBurner leftover burn",
  "http://example.com/rss", "sites/delicious/index.html", "del.icio.us")
F("2004", "sites/delicious/index.html", "del", "query", "del.icio.us leftover",
  "http://flickr.com/", "sites/weather/index.html", "Weather")
F("2004", "sites/weather/index.html", "weather", "query", "Weather.com leftover zip",
  "10001", "sites/myspace/index.html", "MySpace")
F("2004", "sites/myspace/index.html", "ms", "hops", "MySpace leftover hops",
  [("profile", "Profile"), ("tom", "Tom")], "sites/facebook/index.html", "thefacebook")
F("2004", "sites/facebook/index.html", "fb-wall", "query", "thefacebook leftover wall",
  "hello wall", "sites/facebook/networks.html", "Networks")

# ---------------------------------------------------------------------------
# 2005
# ---------------------------------------------------------------------------
F("2005", "sites/youtube/upload.html", "yt-title", "query", "YouTube leftover upload title",
  "skate clip", "sites/maps/index.html", "Maps")
F("2005", "sites/maps/index.html", "maps-hop", "hops", "Maps leftover two views",
  [("drag", "Drag"), ("search", "Search")], "sites/reddit/index.html", "Reddit")
F("2005", "sites/reddit/index.html", "reddit-up", "hops", "Reddit leftover boost",
  [("up", "Boost"), ("new", "Newest")], "sites/digg/index.html", "Digg")
F("2005", "sites/digg/index.html", "digg-bury", "hops", "Digg leftover bury path",
  [("up", "Digg"), ("bury", "Bury")], "sites/housingmaps/index.html", "HousingMaps")
F("2005", "sites/housingmaps/index.html", "hm", "query", "HousingMaps leftover city",
  "sf", "sites/pandora/index.html", "Pandora")
F("2005", "sites/pandora/index.html", "pandora-q", "query", "Pandora leftover seed",
  "radiohead", "sites/itunes/index.html", "iTunes podcasts")
F("2005", "sites/itunes/index.html", "pod", "query", "iTunes podcast leftover",
  "This American Life", "sites/dailymotion/index.html", "DailyMotion")
F("2005", "sites/dailymotion/index.html", "dm", "query", "DailyMotion leftover title",
  "clip", "sites/vimeo/index.html", "Vimeo")
F("2005", "sites/vimeo/index.html", "vimeo", "query", "Vimeo leftover title",
  "short film", "sites/gaia/index.html", "Gaia")
F("2005", "sites/gaia/index.html", "gaia", "query", "Gaia leftover avatar",
  "sparkle kid", "sites/flickr/index.html", "Flickr")
F("2005", "sites/flickr/index.html", "flickr", "query", "Flickr leftover (Yahoo-era)",
  "tag", "sites/gmail/index.html", "Gmail")
F("2005", "sites/gmail/index.html", "gmail", "query", "Gmail leftover invite",
  "you@gmail.com", "sites/myspace/index.html", "MySpace")
F("2005", "sites/myspace/index.html", "ms", "hops", "MySpace leftover hops",
  [("profile", "Profile"), ("tom", "Tom")], "sites/feedburner/index.html", "FeedBurner")
F("2005", "sites/feedburner/index.html", "fburn", "query", "FeedBurner leftover",
  "http://example.com/rss", "sites/kayak/index.html", "KAYAK")
F("2005", "sites/kayak/index.html", "kayak", "query", "KAYAK leftover search",
  "SFO to JFK", "sites/googleearth/index.html", "Google Earth")
F("2005", "sites/googleearth/index.html", "earth", "checks", "Google Earth leftover",
  ["Not live tiles", "2005 leftover"], "sites/utorrent/index.html", "µTorrent")
F("2005", "sites/utorrent/index.html", "ut", "checks", "µTorrent leftover scare",
  ["No real torrent", "Museum only"], "sites/google/index.html", "Google")
F("2005", "sites/google/index.html", "google-q", "query", "Google leftover catalog",
  "youtube", "sites/youtube/watch.html", "YouTube watch")

# ---------------------------------------------------------------------------
# 2006
# ---------------------------------------------------------------------------
F("2006", "sites/twitter/index.html", "t140", "query", "Twitter leftover 140",
  "just setting up my twttr", "sites/facebook/index.html", "Facebook Feed")
F("2006", "sites/facebook/index.html", "fb-feed", "query", "Facebook Feed leftover post",
  "hello feed", "sites/youtube/index.html", "YouTube")
F("2006", "sites/youtube/index.html", "yt-ack", "checks", "YouTube Google-owns leftover",
  ["Sold late 2006", "Not the 2005 independent chip"], "sites/docs/index.html", "Docs")
F("2006", "sites/docs/index.html", "docs", "query", "Google Docs leftover save",
  "notes", "sites/aws/index.html", "AWS")
F("2006", "sites/aws/index.html", "aws", "query", "AWS leftover bucket",
  "my-bucket", "sites/reader/index.html", "Reader")
F("2006", "sites/reader/index.html", "reader", "query", "Google Reader leftover add",
  "http://example.com/atom.xml", "sites/digg/index.html", "Digg")
F("2006", "sites/digg/index.html", "digg-v4", "hops", "Digg leftover front",
  [("up", "Digg"), ("front", "Front")], "sites/time-you/index.html", "Time You")
F("2006", "sites/time-you/index.html", "timeyou", "hops", "Time You leftover two trails",
  [("you", "You"), ("web", "Web")], "sites/bebo/index.html", "Bebo")
F("2006", "sites/bebo/index.html", "bebo", "query", "Bebo leftover profile",
  "school", "sites/slideshare/index.html", "SlideShare")
F("2006", "sites/slideshare/index.html", "slides", "query", "SlideShare leftover deck",
  "startup deck", "sites/newsvine/index.html", "Newsvine")
F("2006", "sites/newsvine/index.html", "nv", "query", "Newsvine leftover seed",
  "local vote", "sites/wikileaks/index.html", "WikiLeaks")
F("2006", "sites/wikileaks/index.html", "wl", "checks", "WikiLeaks leftover read",
  ["One cable leftover", "No dump"], "sites/meebo/index.html", "Meebo")
F("2006", "sites/meebo/index.html", "meebo", "query", "Meebo leftover chat theater",
  "hello", "sites/huffpost/index.html", "HuffPost")
F("2006", "sites/huffpost/index.html", "huff", "query", "HuffPost leftover headline",
  "front", "sites/wikipedia/index.html", "Wikipedia")
F("2006", "sites/wikipedia/index.html", "wiki-cite", "query", "Wikipedia leftover cite",
  "citation", "sites/myspace/index.html", "MySpace")
F("2006", "sites/myspace/index.html", "ms", "hops", "MySpace still-mass leftover",
  [("profile", "Profile"), ("music", "Music")], "sites/amazon/index.html", "Amazon")
F("2006", "sites/amazon/index.html", "cart", "query", "Amazon leftover cart",
  "kindle? no — book", "sites/gmail/index.html", "Gmail")
F("2006", "sites/gmail/index.html", "gmail", "query", "Gmail leftover (still invite-ish)",
  "you@gmail.com", "sites/twitter/index.html", "Twitter")

# ---------------------------------------------------------------------------
# 2007
# ---------------------------------------------------------------------------
F("2007", "sites/iphone/index.html", "saf-ack", "checks", "iPhone Safari leftover (no Store)",
  ["Shipped Jun 29", "No App Store yet"], "sites/gmail/index.html", "Gmail open")
F("2007", "sites/gmail/index.html", "gmail-open", "query", "Gmail leftover open send",
  "hello@gmail.com", "sites/maps/index.html", "Street View")
F("2007", "sites/maps/index.html", "sv", "hops", "Street View leftover turn",
  [("left", "Turn left"), ("right", "Turn right")], "sites/facebook/index.html", "Platform")
F("2007", "sites/facebook/index.html", "fb-app", "query", "Facebook Platform leftover app",
  "quiz", "sites/twitter/index.html", "Twitter SXSW")
F("2007", "sites/twitter/index.html", "t-sxsw", "query", "Twitter leftover 140",
  "sxsw", "sites/kindle/index.html", "Kindle")
F("2007", "sites/kindle/index.html", "kindle", "checks", "Kindle leftover Whispernet",
  ["$399 leftover", "Whispernet theater"], "sites/tumblr/index.html", "Tumblr")
F("2007", "sites/tumblr/index.html", "tumble", "query", "Tumblr leftover tumble",
  "photo post", "sites/friendfeed/index.html", "FriendFeed")
F("2007", "sites/friendfeed/index.html", "ff", "hops", "FriendFeed leftover two sources",
  [("tw", "Twitter"), ("blog", "Blog")], "sites/facebook/index.html", "Beacon")
F("2007", "sites/justintv/index.html", "jtv", "query", "Justin.tv leftover stream name",
  "desk cam", "sites/ustream/index.html", "Ustream")
F("2007", "sites/ustream/index.html", "ustream", "query", "Ustream leftover event",
  "keynote", "sites/qik/index.html", "Qik")
F("2007", "sites/qik/index.html", "qik", "query", "Qik leftover clip",
  "street", "sites/etsy/index.html", "Etsy")
F("2007", "sites/etsy/index.html", "etsy", "query", "Etsy leftover listing",
  "handmade", "sites/netflix/index.html", "Netflix Watch Now")
F("2007", "sites/netflix/index.html", "nf-watch", "checks", "Netflix Watch Now leftover",
  ["Watch Now leftover", "Not 2010 discs+stream star"], "sites/hulu/index.html", "Hulu")
F("2007", "sites/hulu/index.html", "hulu-ack", "checks", "Hulu leftover literacy",
  ["Public is 2008", "2007 leftover"], "sites/iphone/specs.html", "iPhone specs")
F("2007", "sites/iphone/specs.html", "iphone-specs", "checks", "iPhone specs leftover",
  ["Safari leftover", "Desktop still mass"], "sites/opensocial/index.html", "OpenSocial")
F("2007", "sites/opensocial/index.html", "os", "checks", "OpenSocial leftover",
  ["Gadget leftover", "No OAuth"], "sites/rickroll/index.html", "Rickroll")
F("2007", "sites/rickroll/index.html", "rick", "checks", "Rickroll leftover literacy",
  ["2007 leftover", "Not a live video"], "sites/kindlestore/index.html", "Kindle store")
F("2007", "sites/kindlestore/index.html", "kstore", "checks", "Kindle store leftover",
  ["Store leftover", "Whispernet on kindle/"], "sites/iphone/safari.html", "iPhone Safari")

# ---------------------------------------------------------------------------
# 2008
# ---------------------------------------------------------------------------
F("2008", "sites/appstore/index.html", "store", "checks", "App Store leftover literacy",
  ["~500 honesty", "No real IPA"], "sites/chrome/index.html", "Chrome")
F("2008", "sites/chrome/index.html", "chrome-dl", "checks", "Chrome leftover download",
  ["Windows-first leftover", "Shell stays IE"], "sites/android/index.html", "Android")
F("2008", "sites/android/index.html", "g1", "checks", "Android Market leftover",
  ["G1 leftover", "Two checks"], "sites/hulu/index.html", "Hulu")
F("2008", "sites/hulu/index.html", "hulu-ep", "query", "Hulu leftover episode title",
  "pilot", "sites/github/issue.html", "GitHub")
F("2008", "sites/github/issue.html", "gh-issue", "query", "GitHub leftover issue title",
  "cannot clone", "sites/dropbox/index.html", "Dropbox")
F("2008", "sites/dropbox/index.html", "db", "query", "Dropbox leftover folder",
  "Photos", "sites/spotify/index.html", "Spotify")
F("2008", "sites/spotify/index.html", "spot-eu", "checks", "Spotify EU leftover",
  ["EU seed leftover", "US is 2011"], "sites/stackoverflow/index.html", "Stack Overflow")
F("2008", "sites/stackoverflow/index.html", "so", "query", "Stack Overflow leftover ask",
  "how to center a div", "sites/posterous/index.html", "Posterous")
F("2008", "sites/posterous/index.html", "posterous", "query", "Posterous leftover title",
  "photos from the show", "sites/grooveshark/index.html", "Grooveshark")
F("2008", "sites/grooveshark/index.html", "groove", "query", "Grooveshark leftover song",
  "Kids", "sites/airbnb/index.html", "Airbnb")
F("2008", "sites/airbnb/index.html", "abnb", "query", "Airbnb leftover listing",
  "sf loft", "sites/groupon/index.html", "Groupon")
F("2008", "sites/groupon/index.html", "groupon", "query", "Groupon leftover deal",
  "pizza", "sites/evernote/index.html", "Evernote")
F("2008", "sites/evernote/index.html", "evernote", "query", "Evernote leftover note",
  "clip", "sites/friendconnect/index.html", "Friend Connect")
F("2008", "sites/friendconnect/index.html", "gfc", "checks", "Friend Connect leftover",
  ["OpenSocial leftover", "No OAuth"], "sites/youtube/index.html", "YouTube")
F("2008", "sites/youtube/index.html", "yt-hd", "checks", "YouTube HD leftover",
  ["HD leftover", "Not 2005 upload chip"], "sites/facebook/index.html", "Facebook")
F("2008", "sites/facebook/index.html", "fb-con", "checks", "Facebook Connect leftover",
  ["Connect leftover", "Two checks"], "sites/iphone/index.html", "iPhone 3G")
F("2008", "sites/iphone/index.html", "3g", "checks", "iPhone 3G leftover",
  ["3G leftover", "App Store is the chip"], "sites/dropbox/about.html", "Dropbox about")
F("2008", "sites/dropbox/about.html", "db-about", "checks", "Dropbox leftover about",
  ["Folder leftover", "Not a live sync"], "sites/appstore/about.html", "App Store")

# ---------------------------------------------------------------------------
# 2009
# ---------------------------------------------------------------------------
F("2009", "sites/facebook/feed.html", "like-2x", "hops", "Facebook Like leftover ×2",
  [("one", "Like 1"), ("two", "Like 2")], "sites/farmville/index.html", "FarmVille")
F("2009", "sites/farmville/index.html", "farm-2x", "checks", "FarmVille leftover plant literacy",
  ["3s theater leftover", "Not a live Zynga farm"], "sites/bing/index.html", "Bing")
F("2009", "sites/bing/index.html", "bing-q", "query", "Bing leftover query",
  "decision", "sites/foursquare/index.html", "Foursquare")
F("2009", "sites/foursquare/index.html", "4sq", "query", "Foursquare leftover venue",
  "coffee", "sites/kickstarter/index.html", "Kickstarter")
F("2009", "sites/kickstarter/index.html", "ks", "query", "Kickstarter leftover $amt theater",
  "25", "sites/wave/index.html", "Wave")
F("2009", "sites/wave/index.html", "wave", "checks", "Wave leftover invite",
  ["I/O leftover", "Not daily email"], "sites/stackoverflow/index.html", "Stack Overflow")
F("2009", "sites/stackoverflow/index.html", "so-acc", "hops", "SO leftover accept path",
  [("ask", "Ask"), ("acc", "Accept")], "sites/windows7/index.html", "Win7")
F("2009", "sites/windows7/index.html", "win7", "checks", "Win7 / IE8 leftover",
  ["Win7 leftover", "XP still common"], "sites/omegle/index.html", "Omegle")
F("2009", "sites/omegle/index.html", "omegle", "query", "Omegle leftover first line (text)",
  "hello", "sites/chatroulette/index.html", "Chatroulette")
F("2009", "sites/chatroulette/index.html", "cr", "checks", "Chatroulette leftover no-cam",
  ["No camera", "Next stranger theater"], "sites/mafiawars/index.html", "Mafia Wars")
F("2009", "sites/mafiawars/index.html", "mw", "query", "Mafia Wars leftover job",
  "street tax", "sites/wolframalpha/index.html", "Wolfram")
F("2009", "sites/wolframalpha/index.html", "wa", "query", "Wolfram leftover query",
  "population usa", "sites/whatsapp/index.html", "WhatsApp")
F("2009", "sites/whatsapp/index.html", "wa-ack", "checks", "WhatsApp leftover literacy",
  ["2009 leftover", "Not 2014 star"], "sites/ubercab/index.html", "UberCab")
F("2009", "sites/ubercab/index.html", "uber-sf", "checks", "UberCab SF leftover",
  ["SF-only leftover", "Not UberX mass"], "sites/twitter/index.html", "Twitter")
F("2009", "sites/twitter/index.html", "t140", "query", "Twitter leftover 140",
  "hello 2009", "sites/youtube/index.html", "YouTube")
F("2009", "sites/youtube/index.html", "yt", "checks", "YouTube leftover",
  ["Continuity leftover", "Like is the chip"], "sites/ie8/index.html", "IE8")
F("2009", "sites/ie8/index.html", "ie8", "checks", "IE8 leftover",
  ["IE8 leftover", "XP still common"], "sites/chrome/index.html", "Chrome")
F("2009", "sites/chrome/index.html", "chrome", "checks", "Chrome leftover (product room)",
  ["Product leftover", "Shell stays IE8"], "sites/facebook/index.html", "Like")

# ---------------------------------------------------------------------------
# 2010 lean
# ---------------------------------------------------------------------------
F("2010", "sites/instagram/index.html", "ig-cap", "query", "Instagram leftover caption path",
  "nofilter", "sites/ipad/order.html", "iPad")
F("2010", "sites/ipad/order.html", "ipad-ord", "checks", "iPad leftover $499 literacy",
  ["$499 class", "No camera"], "sites/iphone/index.html", "iPhone 4")
F("2010", "sites/iphone/index.html", "iphone4", "checks", "iPhone 4 leftover FaceTime/Antenna",
  ["FaceTime Wi-Fi", "Antenna leftover"], "sites/facebook/cnn.html", "Open Graph")
F("2010", "sites/facebook/cnn.html", "og1", "checks", "Open Graph leftover Like CNN",
  ["Like leftover", "Partner page"], "sites/facebook/imdb.html", "OG IMDb")
F("2010", "sites/facebook/imdb.html", "og2", "checks", "Open Graph leftover Like IMDb",
  ["Second Like leftover", "Need two partners"], "sites/farmville/index.html", "FarmVille")
F("2010", "sites/farmville/index.html", "farm-peak", "checks", "FarmVille peak leftover",
  ["83.76M peak leftover", "Not the 2009 chip"], "sites/foursquare/index.html", "Foursquare")
F("2010", "sites/foursquare/index.html", "4sq", "query", "Foursquare leftover check-in",
  "coffee", "sites/imgur/index.html", "Imgur")
F("2010", "sites/imgur/index.html", "imgur", "query", "Imgur leftover title",
  "cat", "sites/pinterest/index.html", "Pinterest")
F("2010", "sites/pinterest/index.html", "pin", "hops", "Pinterest leftover two pins",
  [("a", "Pin A"), ("b", "Pin B")], "sites/twitter/index.html", "Twitter")
F("2010", "sites/twitter/index.html", "t140", "query", "Twitter leftover 140 lurk OK",
  "hello", "sites/youtube/index.html", "YouTube")
F("2010", "sites/youtube/index.html", "yt", "checks", "YouTube leftover",
  ["Continuity leftover", "IG is the chip"], "sites/digg/index.html", "Digg")
F("2010", "sites/digg/index.html", "digg-v4", "checks", "Digg v4 leftover",
  ["v4 leftover", "Reddit next"], "sites/groupon/index.html", "Groupon")
F("2010", "sites/groupon/index.html", "groupon", "query", "Groupon leftover deal",
  "pizza", "sites/quora/index.html", "Quora")
F("2010", "sites/quora/index.html", "quora", "query", "Quora leftover ask",
  "why ipad", "sites/uber/index.html", "UberCab")
F("2010", "sites/uber/index.html", "uber-sf", "checks", "UberCab SF leftover",
  ["SF-only", "Refuse non-SF in product; leftover ack"], "sites/wave/index.html", "Wave funeral")
F("2010", "sites/wave/index.html", "wave-fun", "checks", "Wave funeral leftover",
  ["Public 2010-05-19", "Ended 2010-08-04"], "sites/browserchoice/index.html", "Ballot")
F("2010", "sites/browserchoice/index.html", "ballot", "hops", "Browser Ballot leftover pick",
  [("ie", "IE"), ("ff", "Firefox")], "sites/wikileaks/index.html", "Cablegate")
F("2010", "sites/wikileaks/index.html", "wl", "checks", "Cablegate leftover one-cable",
  ["One cable leftover", "No dump"], "sites/instagram/index.html", "Instagram")

# ---------------------------------------------------------------------------
# 2011 lean
# ---------------------------------------------------------------------------
F("2011", "sites/googleplus/hangouts.html", "hang", "checks", "G+ Hangouts leftover literacy",
  ["All leftover checks", "No camera"], "sites/googleplus/index.html", "Circles")
F("2011", "sites/googleplus/index.html", "circles", "query", "G+ leftover circle name",
  "friends", "sites/spotify/index.html", "Spotify US")
F("2011", "sites/spotify/index.html", "spot-us", "checks", "Spotify US leftover invite",
  ["Jul 14 US leftover", "Invite theater"], "sites/iphone/index.html", "Siri")
F("2011", "sites/iphone/index.html", "siri", "query", "Siri leftover type/chip",
  "weather", "sites/facebook/index.html", "Timeline")
F("2011", "sites/facebook/index.html", "timeline", "checks", "Timeline leftover two boxes",
  ["Timeline leftover", "Not News Feed 2006"], "sites/ipad/index.html", "iPad 2")
F("2011", "sites/ipad/index.html", "ipad2", "checks", "iPad 2 leftover cameras",
  ["Cameras leftover", "Not iPad 1 2010"], "sites/netflix/index.html", "Qwikster")
F("2011", "sites/netflix/index.html", "qwik", "checks", "Qwikster leftover reversed-split",
  ["Split leftover", "Reversed"], "sites/snapchat/index.html", "Snapchat")
F("2011", "sites/snapchat/index.html", "snap", "checks", "Snapchat leftover not-Stories",
  ["1–10s leftover", "Not Stories"], "sites/instagram/index.html", "IG iOS")
F("2011", "sites/instagram/index.html", "ig", "checks", "Instagram iOS leftover",
  ["Still iOS leftover", "Android is 2012"], "sites/tumblr/index.html", "Tumblr")
F("2011", "sites/tumblr/index.html", "reblog", "checks", "Tumblr leftover reblog",
  ["Two boxes", "Reblog leftover"], "sites/airbnb/index.html", "Airbnb")
F("2011", "sites/airbnb/index.html", "air", "query", "Airbnb leftover pick",
  "loft", "sites/twitter/index.html", "Twitter")
F("2011", "sites/twitter/index.html", "t140", "query", "Twitter leftover 140",
  "hello", "sites/youtube/index.html", "YouTube")
F("2011", "sites/youtube/index.html", "yt", "checks", "YouTube leftover",
  ["Continuity leftover", "G+ is the chip"], "sites/icloud/index.html", "iCloud")
F("2011", "sites/icloud/index.html", "icloud", "checks", "iCloud leftover",
  ["iCloud leftover", "Not Drive"], "sites/ie9/index.html", "IE9")
F("2011", "sites/ie9/index.html", "ie9", "checks", "IE9 leftover",
  ["IE9 leftover", "Shell is IE9"], "sites/linkedin/index.html", "LinkedIn")
F("2011", "sites/linkedin/index.html", "li", "query", "LinkedIn leftover",
  "classmate", "sites/pinterest/index.html", "Pinterest")
F("2011", "sites/pinterest/index.html", "pin", "hops", "Pinterest leftover two pins",
  [("a", "A"), ("b", "B")], "sites/snapghost/index.html", "Snap leftover")
F("2011", "sites/snapghost/index.html", "ghost", "checks", "Snap leftover ghost",
  ["Picaboo leftover", "Not Stories"], "sites/googleplus/hangouts.html", "Hangouts")

# ---------------------------------------------------------------------------
# 2015 lean
# ---------------------------------------------------------------------------
F("2015", "sites/periscope/index.html", "peri-title", "query", "Periscope leftover titled Go LIVE",
  "city walk", "sites/googlephotos/index.html", "Photos")
F("2015", "sites/googlephotos/index.html", "gp", "checks", "Google Photos leftover backup",
  ["HQ leftover", "Free locker leftover"], "sites/windows10/index.html", "Win10")
F("2015", "sites/windows10/index.html", "win10", "checks", "Win10 leftover reserve",
  ["Free upgrade leftover", "Two boxes"], "sites/applemusic/index.html", "Apple Music")
F("2015", "sites/applemusic/index.html", "am", "checks", "Apple Music leftover trial honesty",
  ["3-month leftover", "Auto-renew honesty"], "sites/edge/index.html", "Edge")
F("2015", "sites/edge/index.html", "edge", "checks", "Edge Spartan leftover (not Chromium)",
  ["EdgeHTML leftover", "Not Chromium Edge"], "sites/letsencrypt/index.html", "Let's Encrypt")
F("2015", "sites/letsencrypt/index.html", "le", "query", "Let's Encrypt leftover domain",
  "example.com", "sites/ios9/blockers.html", "iOS 9")
F("2015", "sites/ios9/blockers.html", "block", "checks", "iOS9 leftover content blockers",
  ["Blockers leftover", "Safari leftover"], "sites/snapchat/discover.html", "Discover")
F("2015", "sites/snapchat/discover.html", "discover", "hops", "Snap Discover leftover tiles",
  [("a", "Tile A"), ("b", "Tile B")], "sites/discord/index.html", "Discord")
F("2015", "sites/discord/index.html", "dc", "query", "Discord leftover join",
  "server", "sites/echo/index.html", "Echo")
F("2015", "sites/echo/index.html", "echo", "checks", "Echo leftover order literacy",
  ["Echo leftover", "Not Show 2017"], "sites/apple/watch.html", "Watch leftover")
F("2015", "sites/apple/watch.html", "watch", "checks", "Watch leftover (not the chip)",
  ["Ships leftover", "Periscope is the chip"], "sites/meerkat/index.html", "Meerkat")
F("2015", "sites/meerkat/index.html", "meerkat", "query", "Meerkat leftover stream",
  "live", "sites/fblive/index.html", "FB Live")
F("2015", "sites/fblive/index.html", "fblive", "checks", "FB Live leftover celebs-only",
  ["Celebs/Mentions leftover", "Not your Go LIVE"], "sites/spotify/index.html", "Spotify")
F("2015", "sites/spotify/index.html", "spot", "checks", "Spotify leftover",
  ["Continuity leftover", "Not the chip"], "sites/netflix/index.html", "Netflix")
F("2015", "sites/netflix/index.html", "nf", "checks", "Netflix leftover",
  ["Continuity leftover", "Not the chip"], "sites/instagram/index.html", "Instagram")
F("2015", "sites/instagram/index.html", "ig", "checks", "Instagram leftover (no Stories)",
  ["No Stories yet", "Stories are 2016"], "sites/win10get/index.html", "Get Windows 10")
F("2015", "sites/win10get/index.html", "gw10", "checks", "Get Windows 10 leftover",
  ["GWX leftover", "Reserve is on windows10"], "sites/meerkatlive/index.html", "Meerkat live")
F("2015", "sites/meerkatlive/index.html", "meerkat-live", "query", "Meerkat live leftover",
  "go live", "sites/periscope/watch.html", "Periscope watch")

# ---------------------------------------------------------------------------
# 2016 lean
# ---------------------------------------------------------------------------
F("2016", "sites/instagram/stories.html", "story", "query", "Stories leftover add (empty blocked)",
  "hello 24h", "sites/pokemongo/index.html", "Pokémon GO")
F("2016", "sites/pokemongo/index.html", "pogo", "checks", "Pokémon GO leftover team",
  ["Team leftover", "No live GPS"], "sites/facebook/reactions.html", "Reactions")
F("2016", "sites/facebook/reactions.html", "react", "hops", "Reactions leftover two faces",
  [("like", "Like"), ("love", "Love")], "sites/whatsapp/e2e.html", "WA E2E")
F("2016", "sites/whatsapp/e2e.html", "wa-e2e", "checks", "WhatsApp E2E leftover",
  ["Default E2E leftover", "Two boxes"], "sites/iphone/index.html", "iPhone 7")
F("2016", "sites/iphone/index.html", "iphone7", "checks", "iPhone 7 leftover no-jack",
  ["No jack leftover", "Two boxes"], "sites/vine/goodbye.html", "Vine")
F("2016", "sites/vine/goodbye.html", "vine-end", "checks", "Vine leftover dying",
  ["Dying leftover", "Gone is 2017"], "sites/snapchat/spectacles.html", "Spectacles")
F("2016", "sites/snapchat/spectacles.html", "specs", "checks", "Spectacles leftover",
  ["Spectacles leftover", "Not Stories chip"], "sites/musically/index.html", "Musical.ly")
F("2016", "sites/musically/index.html", "mly", "checks", "Musical.ly leftover (not TikTok)",
  ["Not TikTok brand", "2016 leftover"], "sites/windows10/end.html", "Win10 end")
F("2016", "sites/windows10/end.html", "win10-end", "checks", "Win10 free-upgrade ended leftover",
  ["Offer ended leftover", "Not 2015 reserve"], "sites/dyn/index.html", "Dyn")
F("2016", "sites/dyn/index.html", "dyn", "checks", "Dyn/Mirai leftover literacy (no exploit)",
  ["Outage leftover", "No exploit"], "sites/slack/index.html", "Slack")
F("2016", "sites/slack/index.html", "slack", "query", "Slack leftover channel",
  "general", "sites/reddit/index.html", "Reddit")
F("2016", "sites/reddit/index.html", "reddit", "hops", "Reddit leftover two votes",
  [("up", "Up"), ("new", "New")], "sites/netflix/index.html", "Netflix")
F("2016", "sites/netflix/index.html", "nf", "checks", "Netflix leftover",
  ["Continuity leftover", "Stories is the chip"], "sites/youtube/index.html", "YouTube")
F("2016", "sites/youtube/index.html", "yt", "checks", "YouTube leftover",
  ["Continuity leftover", "Stories is the chip"], "sites/fblive/index.html", "FB Live")
F("2016", "sites/fblive/index.html", "fblive", "checks", "FB Live leftover everyone",
  ["Everyone leftover", "Not 2015 celebs"], "sites/moments/index.html", "Moments")
F("2016", "sites/moments/index.html", "moments", "checks", "Moments leftover",
  ["Moments leftover", "Not Stories"], "sites/iphone/airpods.html", "AirPods")
F("2016", "sites/iphone/airpods.html", "airpods", "checks", "AirPods leftover",
  ["AirPods leftover", "No jack on iPhone 7"], "sites/playable/game.html", "Year game")
F("2016", "sites/playable/game.html", "gym", "checks", "Gym Rush leftover literacy",
  ["Museum original leftover", "No official sprites"], "sites/instagram/archive.html", "Stories archive")

# ---------------------------------------------------------------------------
# 2017 lean
# ---------------------------------------------------------------------------
F("2017", "sites/iphone/x.html", "faceid-2x", "checks", "Face ID leftover two boxes",
  ["Face ID leftover", "Not Touch ID"], "sites/iphone/animoji.html", "Animoji")
F("2017", "sites/iphone/animoji.html", "animoji", "checks", "Animoji leftover (needs Face ID gold)",
  ["Requires Face ID leftover", "Animoji leftover"], "sites/fortnite/index.html", "Fortnite")
F("2017", "sites/fortnite/index.html", "fn", "query", "Fortnite leftover drop",
  "tilted", "sites/twitter/280.html", "Twitter 280")
F("2017", "sites/twitter/280.html", "t280", "query", "Twitter leftover must exceed 140",
  "this leftover tweet is longer than one hundred forty characters on purpose", "sites/teams/index.html", "Teams")
F("2017", "sites/teams/index.html", "teams", "query", "Teams leftover create",
  "project", "sites/vine/gone.html", "Vine gone")
F("2017", "sites/vine/gone.html", "vine-gone", "checks", "Vine leftover actually gone",
  ["Gone leftover", "Not dying-2016"], "sites/switch/index.html", "Switch")
F("2017", "sites/switch/index.html", "switch", "checks", "Switch leftover buy",
  ["Buy leftover", "Not a live eShop"], "sites/wannacry/index.html", "WannaCry")
F("2017", "sites/wannacry/index.html", "wc", "checks", "WannaCry leftover literacy (no payload)",
  ["Literacy only", "No payload"], "sites/equifax/index.html", "Equifax")
F("2017", "sites/equifax/index.html", "eq", "checks", "Equifax leftover freeze literacy",
  ["Freeze leftover", "No real freeze"], "sites/musically/index.html", "Musical.ly")
F("2017", "sites/musically/index.html", "mly", "checks", "Musical.ly leftover",
  ["Not TikTok merge yet", "Merge is 2018"], "sites/echoshow/index.html", "Echo Show")
F("2017", "sites/echoshow/index.html", "show", "checks", "Echo Show leftover",
  ["Show leftover", "Not 2015 Echo"], "sites/snapipo/index.html", "Snap IPO")
F("2017", "sites/snapipo/index.html", "snapipo", "checks", "Snap IPO leftover",
  ["IPO leftover", "Not Stories"], "sites/reddit/index.html", "Reddit")
F("2017", "sites/reddit/index.html", "reddit", "hops", "Reddit leftover two",
  [("up", "Up"), ("hot", "Hot")], "sites/youtube/index.html", "YouTube")
F("2017", "sites/youtube/index.html", "yt", "checks", "YouTube leftover",
  ["Continuity leftover", "Face ID is the chip"], "sites/amazon/index.html", "Amazon")
F("2017", "sites/amazon/index.html", "amzn", "query", "Amazon leftover",
  "echo", "sites/bitcoinath/index.html", "Bitcoin")
F("2017", "sites/bitcoinath/index.html", "btc", "checks", "Bitcoin ATH leftover literacy",
  ["ATH leftover", "No live ticker"], "sites/playable/game.html", "Year game")
F("2017", "sites/playable/game.html", "storm", "checks", "Storm Circle leftover literacy",
  ["Museum original leftover", "No official art"], "sites/playable/famous.html", "Famous")
F("2017", "sites/playable/famous.html", "famous", "checks", "Famous leftover 2017",
  ["Famous leftover", "Not the chip"], "sites/iphone/x.html", "Face ID")

# ---------------------------------------------------------------------------
# 2018 lean
# ---------------------------------------------------------------------------
F("2018", "sites/gdpr/manage.html", "gdpr-2x", "checks", "GDPR Manage leftover two ticks",
  ["Purpose A leftover", "Purpose B leftover"], "sites/tiktok/fyp.html", "TikTok FYP")
F("2018", "sites/tiktok/fyp.html", "fyp", "hops", "TikTok leftover two FYP taps",
  [("one", "Tap 1"), ("two", "Tap 2")], "sites/trust/index.html", "Hearing")
F("2018", "sites/trust/index.html", "hear", "checks", "Hearing leftover sit",
  ["Apr 10 leftover", "Not the Manage chip"], "sites/instagram/igtv.html", "IGTV")
F("2018", "sites/instagram/igtv.html", "igtv", "query", "IGTV leftover post (not Reels)",
  "long video", "sites/chrome/not-secure.html", "Not Secure")
F("2018", "sites/chrome/not-secure.html", "ns", "checks", "Chrome 68 leftover Not Secure",
  ["Not Secure leftover", "HTTP leftover"], "sites/homepod/index.html", "HomePod")
F("2018", "sites/homepod/index.html", "hp", "checks", "HomePod leftover reserve",
  ["Reserve leftover", "Not a live order"], "sites/spectre/index.html", "Spectre")
F("2018", "sites/spectre/index.html", "sp", "checks", "Spectre leftover literacy",
  ["Literacy leftover", "No exploit"], "sites/fortnite/switch.html", "Fortnite Switch")
F("2018", "sites/fortnite/switch.html", "fn-sw", "query", "Fortnite Switch leftover drop",
  "tilted", "sites/github/microsoft.html", "GitHub")
F("2018", "sites/github/microsoft.html", "gh-ms", "checks", "Microsoft♥GitHub leftover",
  ["Deal leftover", "Not 2008 issue chip"], "sites/discord/index.html", "Discord")
F("2018", "sites/discord/index.html", "dc", "query", "Discord leftover",
  "server", "sites/reddit/index.html", "Reddit")
F("2018", "sites/reddit/index.html", "reddit", "hops", "Reddit leftover two",
  [("up", "Up"), ("hot", "Hot")], "sites/youtube/index.html", "YouTube")
F("2018", "sites/youtube/index.html", "yt", "checks", "YouTube leftover",
  ["Continuity leftover", "GDPR is the chip"], "sites/wikipedia/index.html", "Wikipedia")
F("2018", "sites/wikipedia/index.html", "wiki", "query", "Wikipedia leftover",
  "gdpr", "sites/applemusic/index.html", "Apple Music")
F("2018", "sites/applemusic/index.html", "am", "checks", "Apple Music leftover",
  ["Continuity leftover", "Not 2015 trial chip"], "sites/gdpr/index.html", "GDPR door")
F("2018", "sites/gdpr/index.html", "gdpr-door", "checks", "GDPR leftover door (Accept All never here)",
  ["Manage is the path", "Accept All is the trap on the product"], "sites/playable/game.html", "Year game")
F("2018", "sites/playable/game.html", "consent", "checks", "Consent Dash leftover (Manage wins)",
  ["Manage is the win", "Accept All is the trap"], "sites/fortnite/creative.html", "Fortnite Creative")
F("2018", "sites/fortnite/creative.html", "fn-cr", "query", "Fortnite Creative leftover",
  "island", "sites/playable/famous.html", "Famous")
F("2018", "sites/playable/famous.html", "famous", "checks", "Famous leftover 2018",
  ["Famous leftover", "GDPR is the chip"], "sites/gdpr/manage.html", "Manage")

# ---------------------------------------------------------------------------
# 2019 — Disney+ star stays. 18 leftover writers on existing rooms.
# ---------------------------------------------------------------------------
F("2019", "sites/tiktok/index.html", "tt-lx", "query", "TikTok leftover FYP (not the chip)",
  "sound", "sites/arcade/index.html", "Apple Arcade")
F("2019", "sites/arcade/index.html", "arcade-lx", "checks", "Arcade leftover pick",
  ["$4.99 leftover", "Not a free App Store game"], "sites/stadia/index.html", "Stadia")
F("2019", "sites/stadia/index.html", "stadia-lx", "checks", "Stadia leftover Founders",
  ["19 Nov leftover", "Not GeForce Now"], "sites/appletv/index.html", "Apple TV+")
F("2019", "sites/appletv/index.html", "tv-lx", "query", "Apple TV+ leftover title",
  "The Morning Show", "sites/airpodspro/index.html", "AirPods Pro")
F("2019", "sites/airpodspro/index.html", "app-lx", "checks", "AirPods Pro leftover",
  ["ANC leftover", "Not AirPods 1"], "sites/iphone/iphone11.html", "iPhone 11")
F("2019", "sites/iphone/iphone11.html", "11-lx", "query", "iPhone 11 leftover",
  "triple camera", "sites/edge/index.html", "Edge preview")
F("2019", "sites/edge/index.html", "edge-lx", "checks", "Edge Chromium leftover preview",
  ["Preview leftover", "Not default yet"], "sites/chrome/index.html", "Chrome habit")
F("2019", "sites/chrome/index.html", "ch-lx", "query", "Chrome leftover habit URL",
  "https://news.ycombinator.com", "sites/youtube/index.html", "YouTube")
F("2019", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover watch",
  "music video", "sites/instagram/index.html", "Instagram")
F("2019", "sites/instagram/index.html", "ig-lx", "checks", "Instagram leftover hide-likes",
  ["Hide likes leftover", "Not Reels"], "sites/wikipedia/index.html", "Wikipedia")
F("2019", "sites/wikipedia/index.html", "wiki-lx", "query", "Wikipedia leftover article",
  "Disney+", "sites/windows10/index.html", "Win10 residual")
F("2019", "sites/windows10/index.html", "w10-lx", "checks", "Win10 leftover residual",
  ["Still mass leftover", "Not Win11"], "sites/instagram/index.html", "Instagram")
F("2019", "sites/instagram/index.html", "ig-fn", "query", "Instagram leftover 2019 residual",
  "hide likes leftover", "sites/playable/game.html", "Year game")
F("2019", "sites/playable/game.html", "game-lx", "checks", "Continue Row leftover year game",
  ["Continue row leftover", "Trial is the trap"], "sites/playable/famous.html", "Famous")
F("2019", "sites/playable/famous.html", "famous-lx", "checks", "Famous leftover 2019",
  ["Famous leftover", "Disney+ is the chip"], "sites/playable/index.html", "Playable cabinet")
F("2019", "sites/playable/index.html", "cab-lx", "query", "Playable cabinet leftover",
  "cabinet leftover", "sites/playable/extra-a.html", "Extra A")
F("2019", "sites/playable/extra-a.html", "xa-lx", "query", "2019 extra-a leftover",
  "marshmello leftover", "sites/playable/extra-b.html", "Extra B")
F("2019", "sites/playable/extra-b.html", "xb-lx", "checks", "2019 extra-b leftover",
  ["Extra leftover", "Not the chip"], "sites/tiktok/index.html", "TikTok")

# ---------------------------------------------------------------------------
# 2020 — Zoom star stays. 18 leftover writers on existing rooms.
# ---------------------------------------------------------------------------
F("2020", "sites/reels/index.html", "reels-lx", "query", "Reels leftover 15s (not Shorts)",
  "15 seconds", "sites/openai/index.html", "GPT-3 waitlist")
F("2020", "sites/openai/index.html", "gpt-lx", "checks", "GPT-3 leftover waitlist (not ChatGPT)",
  ["Waitlist leftover", "ChatGPT is 2022"], "sites/flash/index.html", "Flash EOL")
F("2020", "sites/flash/index.html", "flash-lx", "checks", "Flash leftover EOL",
  ["31 Dec leftover", "No SWF payload"], "sites/meet/index.html", "Meet")
F("2020", "sites/meet/index.html", "meet-lx", "query", "Meet leftover room name",
  "standup", "sites/mixer/index.html", "Mixer")
F("2020", "sites/mixer/index.html", "mixer-lx", "checks", "Mixer leftover shutdown",
  ["Mixer leftover", "Not Twitch"], "sites/hbomax/index.html", "HBO Max")
F("2020", "sites/hbomax/index.html", "hbo-lx", "query", "HBO Max leftover title",
  "The Sopranos", "sites/peacock/index.html", "Peacock")
F("2020", "sites/peacock/index.html", "pk-lx", "query", "Peacock leftover title",
  "The Office", "sites/ccpa/index.html", "CCPA")
F("2020", "sites/ccpa/index.html", "ccpa-lx", "checks", "CCPA leftover Do Not Sell",
  ["Do Not Sell leftover", "Accept All never writes here"], "sites/chrome/index.html", "Chrome")
F("2020", "sites/chrome/index.html", "ch-lx", "query", "Chrome leftover habit URL",
  "https://zoom.us", "sites/edge/index.html", "Edge 79")
F("2020", "sites/edge/index.html", "edge-lx", "checks", "Edge 79 leftover (not Legacy)",
  ["Edge 79 leftover", "Not IE"], "sites/epic/index.html", "Epic")
F("2020", "sites/epic/index.html", "epic-lx", "checks", "Epic leftover sideload literacy",
  ["Sideload leftover", "Not App Store"], "sites/tiktok/index.html", "TikTok")
F("2020", "sites/tiktok/index.html", "tt-lx", "query", "TikTok leftover caption",
  "fyp leftover", "sites/spacehey/index.html", "SpaceHey")
F("2020", "sites/spacehey/index.html", "shy-lx", "query", "SpaceHey leftover add-friend",
  "friend leftover", "sites/youtube/index.html", "YouTube")
F("2020", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover watch",
  "music video", "sites/wikipedia/index.html", "Wikipedia")
F("2020", "sites/wikipedia/index.html", "wiki-lx", "query", "Wikipedia leftover article",
  "covid-19 pandemic", "sites/facebook/index.html", "Facebook")
F("2020", "sites/facebook/index.html", "fb-lx", "checks", "Facebook leftover 2020 residual",
  ["Residual leftover", "Meta is 2021"], "sites/playable/game.html", "Year game")
F("2020", "sites/playable/game.html", "game-lx", "checks", "2020 game leftover",
  ["Game leftover", "Zoom is the chip"], "sites/playable/famous.html", "Famous")
F("2020", "sites/playable/famous.html", "famous-lx", "checks", "Famous leftover 2020",
  ["Famous leftover", "Not the chip"], "sites/zoom/meeting.html", "Zoom")

# ---------------------------------------------------------------------------
# 2021 — ATT star stays. 18 leftover writers on existing rooms.
# ---------------------------------------------------------------------------
F("2021", "sites/signal/index.html", "sig-lx", "query", "Signal leftover handle",
  "museum", "sites/copilot/index.html", "Copilot")
F("2021", "sites/copilot/index.html", "cop-lx", "checks", "Copilot leftover waitlist (not ChatGPT)",
  ["Waitlist leftover", "ChatGPT is 2022"], "sites/meta/index.html", "Meta")
F("2021", "sites/meta/index.html", "meta-lx", "checks", "Meta leftover rename",
  ["Company leftover", "App still Facebook"], "sites/chrome/index.html", "Chrome")
F("2021", "sites/chrome/index.html", "ch-lx", "query", "Chrome leftover habit URL",
  "https://signal.org", "sites/youtube/index.html", "YouTube")
F("2021", "sites/youtube/index.html", "yt-lx", "query", "YouTube leftover watch",
  "music video", "sites/wikipedia/index.html", "Wikipedia")
F("2021", "sites/wikipedia/index.html", "wiki-lx", "query", "Wikipedia leftover article",
  "app tracking transparency", "sites/facebook/index.html", "Facebook")
F("2021", "sites/facebook/index.html", "fb-lx", "checks", "Facebook leftover 2021 residual",
  ["Hostname leftover", "Company is Meta"], "sites/flash/index.html", "Flash")
F("2021", "sites/flash/index.html", "flash-lx", "checks", "Flash leftover brick",
  ["Brick leftover", "No SWF"], "sites/windows10/index.html", "Win10")
F("2021", "sites/windows10/index.html", "w10-lx", "checks", "Win10 leftover mass residual",
  ["Still mass leftover", "Win11 is later"], "sites/windows11/index.html", "Win11")
F("2021", "sites/windows11/index.html", "w11-lx", "checks", "Win11 leftover install literacy",
  ["Leftover install", "Not gone from this year"], "sites/clubhouse/index.html", "Clubhouse")
F("2021", "sites/clubhouse/index.html", "chouse-lx", "query", "Clubhouse leftover room",
  "drop in leftover", "sites/nft/index.html", "NFT")
F("2021", "sites/nft/index.html", "nft-lx", "checks", "NFT leftover literacy",
  ["Theater leftover", "No wallet"], "sites/squid/index.html", "Squid")
F("2021", "sites/squid/index.html", "squid-lx", "query", "Squid leftover chip note",
  "not a token", "sites/playable/game.html", "Year game")
F("2021", "sites/playable/game.html", "game-lx", "checks", "2021 game leftover",
  ["Game leftover", "ATT is the chip"], "sites/playable/famous.html", "Famous")
F("2021", "sites/playable/famous.html", "famous-lx", "checks", "Famous leftover 2021",
  ["Famous leftover", "Not the chip"], "sites/att/index.html", "ATT")
F("2021", "sites/att/index.html", "att-lx", "query", "ATT leftover literacy note",
  "ask app not to track", "sites/playable/extra-a.html", "Extra A")
F("2021", "sites/playable/extra-a.html", "xa-lx", "query", "2021 extra-a leftover",
  "spaces leftover", "sites/playable/extra-b.html", "Extra B")
F("2021", "sites/playable/extra-b.html", "xb-lx", "checks", "2021 extra-b leftover",
  ["Extra leftover", "Not the chip"], "sites/signal/index.html", "Signal")

# ---------------------------------------------------------------------------
# 2015–2021 wave 2 — 2× the leftover writers (18 → 36). Existing HTML only.
# ---------------------------------------------------------------------------
# 2015
F("2015", "sites/periscope/watch.html", "peri-w", "query", "Periscope leftover watch title",
  "watch leftover", "sites/googlephotos/library.html", "Photos library")
F("2015", "sites/googlephotos/library.html", "gp-lib", "query", "Photos leftover library name",
  "backup leftover", "sites/windows10/upgrade.html", "Win10 upgrade")
F("2015", "sites/windows10/upgrade.html", "w10-up", "checks", "Win10 leftover upgrade literacy",
  ["Free upgrade leftover", "Not a new PC"], "sites/applemusic/beats1.html", "Beats 1")
F("2015", "sites/applemusic/beats1.html", "beats1", "query", "Beats 1 leftover show",
  "Zane Lowe leftover", "sites/applemusicsub/index.html", "Apple Music sub")
F("2015", "sites/applemusicsub/index.html", "am-sub", "checks", "Apple Music leftover trial note",
  ["Trial leftover", "Not a real card"], "sites/apple/faces.html", "Watch faces")
F("2015", "sites/apple/faces.html", "faces", "query", "Watch leftover face name",
  "modular leftover", "sites/apple/pair.html", "Watch pair")
F("2015", "sites/apple/pair.html", "pair", "checks", "Watch leftover pair literacy",
  ["Pair leftover", "Not the chip"], "sites/snapchat/index.html", "Snapchat")
F("2015", "sites/snapchat/index.html", "snap-h", "query", "Snapchat leftover story note",
  "discover leftover", "sites/playable/extra-a.html", "Extra A")
F("2015", "sites/playable/extra-a.html", "xa", "query", "2015 extra-a leftover",
  "surge leftover", "sites/playable/extra-b.html", "Extra B")
F("2015", "sites/playable/extra-b.html", "xb", "query", "2015 extra-b leftover",
  "maps leftover", "sites/playable/extra-c.html", "Extra C")
F("2015", "sites/playable/extra-c.html", "xc", "query", "2015 extra-c leftover",
  "extra leftover", "sites/playable/extra-d.html", "Extra D")
F("2015", "sites/playable/extra-d.html", "xd", "query", "2015 extra-d leftover",
  "extra leftover", "sites/playable/extra-e.html", "Extra E")
F("2015", "sites/playable/extra-e.html", "xe", "query", "2015 extra-e leftover",
  "extra leftover", "sites/playable/game-2.html", "Year game 2")
F("2015", "sites/playable/game-2.html", "g2", "checks", "2015 second game leftover",
  ["Game leftover", "Periscope is the chip"], "sites/playable/index.html", "Cabinet")
F("2015", "sites/playable/index.html", "cab", "query", "2015 cabinet leftover",
  "cabinet leftover", "sites/playable/famous.html", "Famous")
F("2015", "sites/playable/famous.html", "fam-2", "checks", "Famous leftover 2015 second",
  ["Famous leftover", "Not the chip"], "sites/ios9/blockers.html", "iOS 9 blockers")
F("2015", "sites/ios9/blockers.html", "block-2", "query", "iOS 9 leftover blocker name",
  "content blocker", "sites/letsencrypt/index.html", "Let's Encrypt")
F("2015", "sites/letsencrypt/index.html", "le-2", "query", "Let's Encrypt leftover second domain",
  "museum.test", "sites/periscope/index.html", "Periscope")

# 2016
F("2016", "sites/instagram/archive.html", "ig-arch", "query", "Stories leftover archive note",
  "24h leftover", "sites/vine/index.html", "Vine")
F("2016", "sites/vine/index.html", "vine-h", "query", "Vine leftover loop note",
  "six seconds leftover", "sites/snapchat/index.html", "Snapchat")
F("2016", "sites/snapchat/index.html", "snap-h", "query", "Snapchat leftover 2016 residual",
  "spectacles leftover", "sites/playable/extra-a.html", "Extra A")
F("2016", "sites/playable/extra-a.html", "xa", "query", "2016 extra-a leftover",
  "extra leftover", "sites/playable/extra-b.html", "Extra B")
F("2016", "sites/playable/extra-b.html", "xb", "query", "2016 extra-b leftover",
  "extra leftover", "sites/playable/extra-c.html", "Extra C")
F("2016", "sites/playable/extra-c.html", "xc", "query", "2016 extra-c leftover",
  "extra leftover", "sites/playable/extra-d.html", "Extra D")
F("2016", "sites/playable/extra-d.html", "xd", "query", "2016 extra-d leftover",
  "extra leftover", "sites/playable/extra-e.html", "Extra E")
F("2016", "sites/playable/extra-e.html", "xe", "query", "2016 extra-e leftover",
  "extra leftover", "sites/playable/index.html", "Cabinet")
F("2016", "sites/playable/index.html", "cab", "query", "2016 cabinet leftover",
  "cabinet leftover", "sites/facebook/reactions.html", "Reactions")
F("2016", "sites/facebook/reactions.html", "react-2", "query", "Reactions leftover second face",
  "love leftover", "sites/pokemongo/index.html", "Pokémon GO")
F("2016", "sites/pokemongo/index.html", "pogo-2", "query", "GO leftover sidewalk note",
  "team leftover", "sites/musically/index.html", "musical.ly")
F("2016", "sites/musically/index.html", "mly-2", "query", "musical.ly leftover second caption",
  "not tiktok leftover", "sites/slack/index.html", "Slack")
F("2016", "sites/slack/index.html", "slack-2", "query", "Slack leftover channel",
  "general leftover", "sites/youtube/index.html", "YouTube")
F("2016", "sites/youtube/index.html", "yt-2", "query", "YouTube leftover second watch",
  "music leftover", "sites/netflix/index.html", "Netflix")
F("2016", "sites/netflix/index.html", "nf-2", "query", "Netflix leftover second title",
  "Stranger Things leftover", "sites/moments/index.html", "Moments")
F("2016", "sites/moments/index.html", "mom-2", "query", "Moments leftover second album",
  "album leftover", "sites/whatsapp/e2e.html", "WhatsApp E2E")
F("2016", "sites/whatsapp/e2e.html", "wa-2", "checks", "WhatsApp leftover second lock",
  ["E2E leftover", "Not the chip"], "sites/windows10/end.html", "Win10 end")
F("2016", "sites/windows10/end.html", "w10e-2", "query", "Win10 leftover second note",
  "anniversary leftover", "sites/instagram/stories.html", "Stories")

# 2017
F("2017", "sites/playable/extra-a.html", "xa", "query", "2017 extra-a leftover",
  "extra leftover", "sites/playable/extra-b.html", "Extra B")
F("2017", "sites/playable/extra-b.html", "xb", "query", "2017 extra-b leftover",
  "extra leftover", "sites/playable/extra-c.html", "Extra C")
F("2017", "sites/playable/extra-c.html", "xc", "query", "2017 extra-c leftover",
  "extra leftover", "sites/playable/extra-d.html", "Extra D")
F("2017", "sites/playable/extra-d.html", "xd", "query", "2017 extra-d leftover",
  "extra leftover", "sites/playable/extra-e.html", "Extra E")
F("2017", "sites/playable/extra-e.html", "xe", "query", "2017 extra-e leftover",
  "extra leftover", "sites/playable/index.html", "Cabinet")
F("2017", "sites/playable/index.html", "cab", "query", "2017 cabinet leftover",
  "cabinet leftover", "sites/fortnite/index.html", "Fortnite")
F("2017", "sites/fortnite/index.html", "fn-2", "query", "Fortnite leftover second drop",
  "tilted leftover", "sites/amazon/index.html", "Amazon")
F("2017", "sites/amazon/index.html", "amzn-2", "query", "Amazon leftover second search",
  "Echo Show leftover", "sites/youtube/index.html", "YouTube")
F("2017", "sites/youtube/index.html", "yt-2", "query", "YouTube leftover second watch",
  "music leftover", "sites/reddit/index.html", "Reddit")
F("2017", "sites/reddit/index.html", "reddit-2", "query", "Reddit leftover second row",
  "front page leftover", "sites/twitter/280.html", "Twitter 280")
F("2017", "sites/twitter/280.html", "t280-2", "query", "Twitter leftover second 280",
  "xxxxxxxxxxxxxxxx leftover", "sites/teams/index.html", "Teams")
F("2017", "sites/teams/index.html", "teams-2", "query", "Teams leftover second name",
  "museum desk leftover", "sites/wannacry/index.html", "WannaCry")
F("2017", "sites/wannacry/index.html", "wc-2", "query", "WannaCry leftover second literacy",
  "patch leftover", "sites/switch/index.html", "Switch")
F("2017", "sites/switch/index.html", "sw-2", "query", "Switch leftover second reserve",
  "299 leftover", "sites/musically/index.html", "musical.ly")
F("2017", "sites/musically/index.html", "mly-2", "query", "musical.ly leftover second caption",
  "not tiktok leftover", "sites/snapipo/index.html", "Snap IPO")
F("2017", "sites/snapipo/index.html", "snap-2", "query", "Snap IPO leftover second note",
  "ipo leftover", "sites/bitcoinath/index.html", "Bitcoin")
F("2017", "sites/bitcoinath/index.html", "btc-2", "query", "Bitcoin leftover second note",
  "ath leftover", "sites/echoshow/index.html", "Echo Show")
F("2017", "sites/echoshow/index.html", "show-2", "query", "Echo Show leftover second note",
  "show leftover", "sites/iphone/x.html", "Face ID")

# 2018
F("2018", "sites/tiktok/index.html", "tt-h", "query", "TikTok leftover home note",
  "fyp leftover", "sites/github/index.html", "GitHub")
F("2018", "sites/github/index.html", "gh-h", "query", "GitHub leftover issue note",
  "issue leftover", "sites/playable/extra-a.html", "Extra A")
F("2018", "sites/playable/extra-a.html", "xa", "query", "2018 extra-a leftover",
  "extra leftover", "sites/playable/extra-b.html", "Extra B")
F("2018", "sites/playable/extra-b.html", "xb", "query", "2018 extra-b leftover",
  "extra leftover", "sites/playable/extra-c.html", "Extra C")
F("2018", "sites/playable/extra-c.html", "xc", "query", "2018 extra-c leftover",
  "extra leftover", "sites/playable/extra-d.html", "Extra D")
F("2018", "sites/playable/extra-d.html", "xd", "query", "2018 extra-d leftover",
  "extra leftover", "sites/playable/extra-e.html", "Extra E")
F("2018", "sites/playable/extra-e.html", "xe", "query", "2018 extra-e leftover",
  "extra leftover", "sites/playable/index.html", "Cabinet")
F("2018", "sites/playable/index.html", "cab", "query", "2018 cabinet leftover",
  "cabinet leftover", "sites/youtube/index.html", "YouTube")
F("2018", "sites/youtube/index.html", "yt-2", "query", "YouTube leftover second watch",
  "music leftover", "sites/wikipedia/index.html", "Wikipedia")
F("2018", "sites/wikipedia/index.html", "wiki-2", "query", "Wikipedia leftover second article",
  "GDPR leftover", "sites/reddit/index.html", "Reddit")
F("2018", "sites/reddit/index.html", "reddit-2", "query", "Reddit leftover second row",
  "old reddit leftover", "sites/discord/index.html", "Discord")
F("2018", "sites/discord/index.html", "dc-2", "query", "Discord leftover second join",
  "server leftover", "sites/chrome/not-secure.html", "Not Secure")
F("2018", "sites/chrome/not-secure.html", "ns-2", "query", "Chrome leftover second URL",
  "http leftover", "sites/instagram/igtv.html", "IGTV")
F("2018", "sites/instagram/igtv.html", "igtv-2", "query", "IGTV leftover second title",
  "not reels leftover", "sites/trust/index.html", "Hearing")
F("2018", "sites/trust/index.html", "hear-2", "query", "Hearing leftover second note",
  "apr 10 leftover", "sites/homepod/index.html", "HomePod")
F("2018", "sites/homepod/index.html", "hp-2", "query", "HomePod leftover second reserve",
  "siri leftover", "sites/spectre/index.html", "Spectre")
F("2018", "sites/spectre/index.html", "sp-2", "query", "Spectre leftover second literacy",
  "patch leftover", "sites/applemusic/index.html", "Apple Music")
F("2018", "sites/applemusic/index.html", "am-2", "query", "Apple Music leftover second trial",
  "trial leftover", "sites/gdpr/manage.html", "GDPR Manage")

# 2019
F("2019", "sites/disneyplus/about.html", "dplus-ab", "query", "Disney+ leftover about note",
  "fox close leftover", "sites/disneyplus/index.html", "Disney+ door")
F("2019", "sites/disneyplus/index.html", "dplus-ix", "query", "Disney+ leftover door note",
  "trial leftover", "sites/fortnite/marshmello.html", "Marshmello")
F("2019", "sites/fortnite/marshmello.html", "marsh", "query", "Fortnite leftover concert note",
  "marshmello leftover", "sites/tiktok/index.html", "TikTok")
F("2019", "sites/tiktok/index.html", "tt-2", "query", "TikTok leftover second sound",
  "sound leftover", "sites/youtube/index.html", "YouTube")
F("2019", "sites/youtube/index.html", "yt-2", "query", "YouTube leftover second watch",
  "music leftover", "sites/wikipedia/index.html", "Wikipedia")
F("2019", "sites/wikipedia/index.html", "wiki-2", "query", "Wikipedia leftover second article",
  "Disney+ leftover", "sites/chrome/index.html", "Chrome")
F("2019", "sites/chrome/index.html", "ch-2", "query", "Chrome leftover second URL",
  "https://news.ycombinator.com", "sites/arcade/index.html", "Arcade")
F("2019", "sites/arcade/index.html", "arcade-2", "query", "Arcade leftover second title",
  "oceanhorn leftover", "sites/stadia/index.html", "Stadia")
F("2019", "sites/stadia/index.html", "stadia-2", "query", "Stadia leftover second note",
  "founders leftover", "sites/appletv/index.html", "Apple TV+")
F("2019", "sites/appletv/index.html", "tv-2", "query", "Apple TV+ leftover second title",
  "The Morning Show leftover", "sites/airpodspro/index.html", "AirPods Pro")
F("2019", "sites/airpodspro/index.html", "app-2", "query", "AirPods Pro leftover second note",
  "anc leftover", "sites/iphone/iphone11.html", "iPhone 11")
F("2019", "sites/iphone/iphone11.html", "11-2", "query", "iPhone 11 leftover second note",
  "triple leftover", "sites/edge/index.html", "Edge")
F("2019", "sites/edge/index.html", "edge-2", "query", "Edge leftover second note",
  "preview leftover", "sites/windows10/index.html", "Win10")
F("2019", "sites/windows10/index.html", "w10-2", "query", "Win10 leftover second residual",
  "mass leftover", "sites/instagram/index.html", "Instagram")
F("2019", "sites/instagram/index.html", "ig-2", "query", "Instagram leftover second hide-likes",
  "hide likes leftover", "sites/playable/index.html", "Cabinet")
F("2019", "sites/playable/index.html", "cab-2", "query", "2019 cabinet leftover second",
  "cabinet leftover", "sites/playable/famous.html", "Famous")
F("2019", "sites/playable/famous.html", "fam-2", "checks", "Famous leftover 2019 second",
  ["Famous leftover", "Disney+ is the chip"], "sites/playable/extra-a.html", "Extra A")
F("2019", "sites/playable/extra-a.html", "xa-2", "query", "2019 extra-a leftover second",
  "marshmello leftover", "sites/tiktok/index.html", "TikTok")

# 2020
F("2020", "sites/zoom/about.html", "zm-ab", "query", "Zoom leftover about note",
  "participants leftover", "sites/zoom/index.html", "Zoom door")
F("2020", "sites/zoom/index.html", "zm-ix", "query", "Zoom leftover door note",
  "join leftover", "sites/zoom/recap.html", "Zoom recap")
F("2020", "sites/zoom/recap.html", "zm-rc", "query", "Zoom leftover recap note",
  "leave leftover", "sites/reels/about.html", "Reels about")
F("2020", "sites/reels/about.html", "reels-ab", "query", "Reels leftover about note",
  "15s leftover", "sites/reels/record.html", "Reels record")
F("2020", "sites/reels/record.html", "reels-rc", "query", "Reels leftover record note",
  "audio leftover", "sites/openai/wait.html", "GPT-3 wait")
F("2020", "sites/openai/wait.html", "gpt-w", "query", "GPT-3 leftover waitlist note",
  "request access leftover", "sites/flash/eol.html", "Flash EOL")
F("2020", "sites/flash/eol.html", "flash-eol", "checks", "Flash leftover EOL literacy",
  ["31 Dec leftover", "No SWF"], "sites/tiktok/eo.html", "TikTok EO")
F("2020", "sites/tiktok/eo.html", "tt-eo", "query", "TikTok leftover EO note",
  "13942 leftover", "sites/twitter/hack.html", "Twitter hack")
F("2020", "sites/twitter/hack.html", "tw-hk", "query", "Twitter leftover hack note",
  "hack leftover", "sites/markets/wti.html", "WTI")
F("2020", "sites/markets/wti.html", "wti", "query", "WTI leftover negative oil note",
  "-37.63 leftover", "sites/acnh/index.html", "ACNH")
F("2020", "sites/acnh/index.html", "acnh-2", "query", "ACNH leftover second island",
  "island leftover", "sites/astro/index.html", "Astronomical")
F("2020", "sites/astro/index.html", "astro-2", "query", "Astronomical leftover second note",
  "12.3 leftover", "sites/quibi/index.html", "Quibi")
F("2020", "sites/quibi/index.html", "quibi-2", "query", "Quibi leftover second title",
  "quick bite leftover", "sites/playable/extra-a.html", "Extra A")
F("2020", "sites/playable/extra-a.html", "xa", "query", "2020 extra-a leftover",
  "mute leftover", "sites/playable/extra-b.html", "Extra B")
F("2020", "sites/playable/extra-b.html", "xb", "query", "2020 extra-b leftover",
  "participants leftover", "sites/playable/index.html", "Cabinet")
F("2020", "sites/playable/index.html", "cab", "query", "2020 cabinet leftover",
  "cabinet leftover", "sites/playable/famous.html", "Famous")
F("2020", "sites/playable/famous.html", "fam-2", "checks", "Famous leftover 2020 second",
  ["Famous leftover", "Zoom is the chip"], "sites/hbomax/index.html", "HBO Max")
F("2020", "sites/hbomax/index.html", "hbo-2", "query", "HBO Max leftover second title",
  "The Sopranos leftover", "sites/zoom/meeting.html", "Zoom")

# 2021
F("2021", "sites/signal/index.html", "sig-2", "query", "Signal leftover second handle",
  "museum leftover", "sites/copilot/index.html", "Copilot")
F("2021", "sites/copilot/index.html", "cop-2", "query", "Copilot leftover second waitlist",
  "preview leftover", "sites/meta/index.html", "Meta")
F("2021", "sites/meta/index.html", "meta-2", "query", "Meta leftover second rename note",
  "company leftover", "sites/chrome/index.html", "Chrome")
F("2021", "sites/chrome/index.html", "ch-2", "query", "Chrome leftover second URL",
  "https://signal.org", "sites/youtube/index.html", "YouTube")
F("2021", "sites/youtube/index.html", "yt-2", "query", "YouTube leftover second watch",
  "music leftover", "sites/wikipedia/index.html", "Wikipedia")
F("2021", "sites/wikipedia/index.html", "wiki-2", "query", "Wikipedia leftover second article",
  "app tracking leftover", "sites/facebook/index.html", "Facebook")
F("2021", "sites/facebook/index.html", "fb-2", "query", "Facebook leftover second residual",
  "connect leftover", "sites/flash/index.html", "Flash")
F("2021", "sites/flash/index.html", "flash-2", "query", "Flash leftover second brick note",
  "12 jan leftover", "sites/windows10/index.html", "Win10")
F("2021", "sites/windows10/index.html", "w10-2", "query", "Win10 leftover second residual",
  "mass leftover", "sites/windows11/index.html", "Win11")
F("2021", "sites/windows11/index.html", "w11-2", "query", "Win11 leftover second install",
  "oct 5 leftover", "sites/clubhouse/index.html", "Clubhouse")
F("2021", "sites/clubhouse/index.html", "chouse-2", "query", "Clubhouse leftover second room",
  "drop in leftover", "sites/nft/index.html", "NFT")
F("2021", "sites/nft/index.html", "nft-2", "query", "NFT leftover second literacy",
  "theater leftover", "sites/squid/index.html", "Squid")
F("2021", "sites/squid/index.html", "squid-2", "query", "Squid leftover second print",
  "not a token leftover", "sites/playable/index.html", "Cabinet")
F("2021", "sites/playable/index.html", "cab-2", "query", "2021 cabinet leftover second",
  "cabinet leftover", "sites/playable/famous.html", "Famous")
F("2021", "sites/playable/famous.html", "fam-2", "checks", "Famous leftover 2021 second",
  ["Famous leftover", "ATT is the chip"], "sites/playable/game.html", "Year game")
F("2021", "sites/playable/game.html", "game-2", "query", "Five Letter leftover second note",
  "90 users leftover", "sites/playable/extra-a.html", "Extra A")
F("2021", "sites/playable/extra-a.html", "xa-2", "query", "2021 extra-a leftover second",
  "spaces leftover", "sites/playable/extra-b.html", "Extra B")
F("2021", "sites/playable/extra-b.html", "xb-2", "query", "2021 extra-b leftover second",
  "extra leftover", "sites/att/index.html", "ATT")

# ---------------------------------------------------------------------------
# Band A deepen — second dest on existing leftover rooms
# ---------------------------------------------------------------------------
DEEPEN: dict[str, list[tuple]] = {
    "1994": [
        ("sites/pizzahut/index.html", "pizza-more", "Confirm pizza leftover"),
        ("sites/netmarket/index.html", "netmarket-more", "Confirm first-retail leftover"),
        ("sites/imdb/index.html", "imdb-more", "Open a title card leftover"),
        ("sites/galaxy/index.html", "galaxy-more", "Open a second Galaxy category"),
        ("sites/gnn/index.html", "gnn-more", "GNN leftover second page"),
        ("sites/jumpstation/index.html", "jump-more", "JumpStation leftover results"),
        ("sites/prodigy/index.html", "prodigy-more", "Prodigy leftover second door"),
        ("sites/pathfinder/index.html", "pathfinder-more", "Pathfinder leftover magazine"),
        ("sites/infoseek/index.html", "infoseek-more", "Infoseek leftover results"),
        ("sites/compuserve/index.html", "cis-more", "CompuServe leftover forum"),
    ],
    "1995": [
        ("sites/espn/index.html", "espn-more", "ESPNet leftover scoreboard"),
        ("sites/salon/index.html", "salon-more", "Salon leftover essay"),
        ("sites/classmates/index.html", "classmates-more", "Classmates leftover result"),
        ("sites/match/index.html", "match-more", "Match leftover profile"),
        ("sites/tripod/index.html", "tripod-more", "Tripod leftover page"),
        ("sites/aol/index.html", "aol-more", "AOL leftover keyword"),
        ("sites/wsj/index.html", "wsj-more", "WSJ leftover story"),
        ("sites/hotbot/index.html", "hotbot-more", "HotBot leftover results"),
        ("sites/pathfinder/index.html", "pf-more", "Pathfinder leftover 1995"),
        ("sites/infoseek/index.html", "infoseek-more", "Infoseek leftover 1995"),
    ],
    "1996": [
        ("sites/mtv/index.html", "mtv-more", "MTV leftover video page"),
        ("sites/askjeeves/index.html", "jeeves-more", "Ask Jeeves leftover answer"),
        ("sites/theglobe/index.html", "globe-more", "theGlobe leftover"),
        ("sites/totalny/index.html", "tny-more", "totalny leftover listing"),
        ("sites/msn/index.html", "msn-more", "MSN leftover 1996"),
        ("sites/plugin/index.html", "plugin-more", "Plugin leftover skip"),
        ("sites/angelfire/index.html", "angel-more", "Angelfire leftover page"),
        ("sites/infoseek/index.html", "infoseek-more", "Infoseek leftover 1996"),
    ],
    "1997": [
        ("sites/nytimes/index.html", "nyt-more", "NYTimes leftover story"),
        ("sites/mp3com/index.html", "mp3-more", "MP3.com leftover track"),
        ("sites/zdnet/index.html", "zdnet-more", "ZDNet leftover file"),
        ("sites/bbc/index.html", "bbc-more", "BBC leftover story"),
        ("sites/newscom/index.html", "newscom-more", "News.com leftover"),
        ("sites/scripting/index.html", "scripting-more", "Scripting leftover"),
        ("sites/winamp/index.html", "winamp-more", "Winamp leftover skin"),
    ],
    "1998": [
        ("sites/go/index.html", "go-more", "GO leftover channel"),
        ("sites/snap/index.html", "snap-more", "Snap leftover results"),
        ("sites/about/index.html", "about-more", "About leftover guide"),
        ("sites/opendiary/index.html", "od-more", "Open Diary leftover"),
        ("sites/icqweb/index.html", "icqweb-more", "ICQ web leftover"),
        ("sites/valve/index.html", "valve-more", "Valve leftover"),
        ("sites/winfiles/index.html", "winfiles-more", "WinFiles leftover"),
    ],
    "1999": [
        ("sites/neopets/index.html", "neo-more", "Neopets leftover pet"),
        ("sites/egroups/index.html", "egroups-more", "eGroups leftover list"),
        ("sites/webvan/index.html", "webvan-more", "Webvan leftover"),
        ("sites/etrade/index.html", "etrade-more", "E*TRADE leftover"),
        ("sites/theonion/index.html", "onion-more", "Onion leftover"),
        ("sites/yahoomessenger/index.html", "ym-more", "Yahoo Messenger leftover"),
    ],
    "2000": [
        ("sites/half/index.html", "half-more", "Half.com leftover used CD"),
        ("sites/baidu/index.html", "baidu-more", "Baidu leftover results"),
        ("sites/everything2/index.html", "e2-more", "Everything2 leftover writeup"),
        ("sites/expedia/index.html", "expedia-more", "Expedia leftover"),
        ("sites/travelocity/index.html", "travel-more", "Travelocity leftover"),
        ("sites/homestar/index.html", "homestar-more", "Homestar leftover"),
    ],
    "2012": [
        ("sites/medium/index.html", "medium-more", "Medium leftover post"),
        ("sites/path/index.html", "path-more", "Path leftover"),
        ("sites/flipboard/index.html", "flip-more", "Flipboard leftover"),
        ("sites/tinder/index.html", "tinder-more", "Tinder leftover swipe"),
        ("sites/waze/index.html", "waze-more", "Waze leftover route"),
        ("sites/trello/index.html", "trello-more", "Trello leftover card"),
        ("sites/buzzfeed/index.html", "buzz-more", "BuzzFeed leftover list"),
        ("sites/lyft/index.html", "lyft-more", "Lyft leftover"),
    ],
}

STARS = {
    "1994": ("sites/csotd/index.html", "CSotD guestbook"),
    "1995": ("sites/amazon/ssl-checkout.html", "SSL checkout"),
    "1996": ("sites/portals/wars.html", "Portal wars"),
    "1997": ("sites/pointcast/index.html", "PointCast"),
    "1998": ("sites/google/lucky.html", "I’m Feeling Lucky"),
    "1999": ("sites/aim/index.html", "AIM"),
    "2000": ("sites/mapquest/index.html", "MapQuest"),
    "2001": ("sites/wikipedia/edit.html", "Wikipedia edit"),
    "2002": ("sites/stumbleupon/index.html", "StumbleUpon"),
    "2003": ("sites/photobucket/index.html", "Photobucket"),
    "2004": ("sites/facebook/networks.html", "thefacebook"),
    "2005": ("sites/youtube/upload.html", "YouTube upload"),
    "2006": ("sites/twitter/index.html", "Twitter 140"),
    "2007": ("sites/iphone/index.html", "iPhone Safari"),
    "2008": ("sites/appstore/index.html", "App Store"),
    "2009": ("sites/facebook/feed.html", "Facebook Like"),
    "2010": ("sites/instagram/index.html", "Instagram iOS"),
    "2011": ("sites/googleplus/hangouts.html", "G+ Hangouts"),
    "2012": ("sites/instagram/android.html", "IG Android"),
    "2015": ("sites/periscope/index.html", "Periscope"),
    "2016": ("sites/instagram/stories.html", "Stories"),
    "2017": ("sites/iphone/x.html", "Face ID"),
    "2018": ("sites/gdpr/manage.html", "GDPR Manage"),
    "2019": ("sites/disneyplus/home.html", "Disney+ Who’s watching"),
    "2020": ("sites/zoom/meeting.html", "Zoom mute → leave"),
    "2021": ("sites/att/index.html", "Ask App Not to Track"),
}

PANEL_RE = re.compile(
    r"<!-- ITT-4X:([A-Za-z0-9_-]+):start -->.*?<!-- ITT-4X:\1:end -->\s*",
    re.S,
)
BODY_RE = re.compile(r"</body\s*>", re.I)
TRAIL_RE = re.compile(
    r"<!-- ITT-2X-TRAILS:start -->.*?<!-- ITT-2X-TRAILS:end -->\s*",
    re.S,
)
MAP_RE = re.compile(
    r"<!-- ITT-2X-MAP:start -->.*?<!-- ITT-2X-MAP:end -->\s*",
    re.S,
)


def rel_href(src: str, dest: str) -> str:
    """Relative href from src file to dest file, both year-root relative."""
    s_parts = Path(src).parent.parts
    d = Path(dest)
    up = "/".join([".."] * len(s_parts))
    if not up:
        return dest
    return up + "/" + dest


def product_kind_extra(kind: str, extra):
    """Literacy checkboxes are mock. Force a typed leftover verb (REAL query)."""
    if kind == "checks":
        ph = "period leftover"
        if isinstance(extra, (list, tuple)) and extra:
            ph = re.sub(r"\s*leftover.*$", "", str(extra[0]), flags=re.I).strip() or "ok"
        return "query", ph[:48]
    return kind, extra


def product_verb(title: str, suffix: str, kind: str) -> str:
    """Year-true commit label. Never 'Save leftover'."""
    t = f"{title} {suffix}".lower()
    if kind == "hops":
        return "Continue"
    if kind == "wait":
        return "Done waiting"
    if kind == "toggle":
        return "Keep images on"
    pairs = (
        ("siri", "Ask Siri"),
        ("hang", "Start hangout"),
        ("circle", "Name circle"),
        ("invite", "Redeem invite"),
        ("spot", "Redeem invite"),
        ("reblog", "Reblog"),
        ("tweet", "Post 140"),
        ("t140", "Post 140"),
        ("bid", "Place bid"),
        ("book", "Request stay"),
        ("air", "Request stay"),
        ("pin", "Pin it"),
        ("search", "Search"),
        ("query", "Search"),
        ("sign", "Sign on"),
        ("download", "Download"),
        ("ghost", "Send pic"),
        ("snap", "Send pic"),
        ("qwik", "Note funeral"),
        ("icloud", "Turn on iCloud"),
        ("ie9", "Get IE9"),
        ("linkedin", "Connect"),
        ("li", "Connect"),
        ("yt", "Watch"),
        ("youtube", "Watch"),
        ("ig", "Share photo"),
        ("instagram", "Share photo"),
        ("timeline", "Publish Timeline"),
        ("ipad", "Order iPad 2"),
    )
    for needle, verb in pairs:
        if needle in t:
            return verb
    return "Do this"


def field_label(title: str, kind: str) -> str:
    if kind == "query":
        return title.split(" leftover")[0].strip() or title
    return title


def panel_html(year: str, src: str, suffix: str, kind: str, title: str, extra, nxt: str, nl: str) -> str:
    kind, extra = product_kind_extra(kind, extra)
    yy = year[2:]
    key = f"itt{yy}-{suffix}"
    next_href = rel_href(src, nxt) if nxt else "../../pages/home.html"
    verb = product_verb(title, suffix, kind)
    label = field_label(title, kind)
    inner = ""
    if kind == "query":
        ph = extra if isinstance(extra, str) else "type here"
        inner = (
            f'<p><label>{label}<br>'
            f'<input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="{ph}"></label></p>'
        )
    elif kind == "hops":
        hops = extra or []
        btns = " ".join(
            f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        inner = f"<p>{btns}</p>"
    elif kind == "checks":
        labels = extra or ["Honesty leftover", "Not the year star"]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>'
            for lab in labels
        )
        inner = f"<p>{boxes}</p>"
    elif kind == "wait":
        ms = extra if isinstance(extra, int) else 2000
        inner = f'<p><button type="button" data-4x-wait data-4x-wait-ms="{ms}">Wait the period timer</button></p>'
    elif kind == "toggle":
        inner = (
            '<p><button type="button" data-4x-toggle="off">Images off</button> '
            '<button type="button" data-4x-toggle="on">Images on</button></p>'
        )
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" data-4x-min="2" '
        f'style="margin:12px 0;padding:12px;border:1px solid #333;font-family:inherit;'
        f'font-size:13px;max-width:46em;background:#fff">\n'
        f"<h2 style=\"margin:0 0 8px;font-size:16px\">{title}</h2>\n"
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">{year} product path · incomplete never writes · not the chip</p>\n'
        f"{inner}\n"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> '
        f'<a href="{next_href}">{nl}</a></p>\n'
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def insert_before_body(text: str, block: str) -> str:
    m = BODY_RE.search(text)
    if not m:
        return text.rstrip() + "\n" + block
    return text[: m.start()] + block + text[m.start() :]


def strip_panel(text: str, suffix: str) -> str:
    pat = re.compile(
        rf"<!-- ITT-4X:{re.escape(suffix)}:start -->.*?<!-- ITT-4X:{re.escape(suffix)}:end -->\s*",
        re.S,
    )
    return pat.sub("", text)


def upsert_panel(text: str, suffix: str, block: str) -> str:
    pat = re.compile(
        rf"<!-- ITT-4X:{re.escape(suffix)}:start -->.*?<!-- ITT-4X:{re.escape(suffix)}:end -->\s*",
        re.S,
    )
    if pat.search(text):
        return pat.sub(block, text, count=1)
    return insert_before_body(text, block)


def ensure_urlmap(year: str, rel: str) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.is_file():
        return
    src = cfg.read_text(encoding="utf-8")
    if f'"{rel}"' in src:
        return
    rooms_m = re.search(r"var rooms = \[", src)
    if rooms_m:
        src = src.replace("var rooms = [", f'var rooms = [\n    "{rel}",', 1)
        cfg.write_text(src, encoding="utf-8")
        return
    um = re.search(r"urlMap:\s*\{", src)
    if not um:
        return
    insert = (
        f'\n      "{rel}": "http://museum.local/years/{year}/{rel}",'
    )
    src = src[: um.end()] + insert + src[um.end() :]
    cfg.write_text(src, encoding="utf-8")


def more_page(year: str, src_index: str, suffix: str, title: str) -> str:
    star_path, star_lab = STARS[year]
    dest = str(Path(src_index).with_name("more.html"))
    # years/YYYY/sites/foo/more.html → ../../../../css (file parts + 1)
    up = "../" * (len(Path(dest).parts) + 1)
    period_css = "mosaic-defaults.css" if year == "1994" else f"period-{year}.css"
    next_href = rel_href(dest, star_path)
    back = "index.html"
    panel = panel_html(year, dest, suffix, "query", title, "ok leftover", star_path, star_lab)
    # fix next in panel already set
    return dest, (
        f'<!DOCTYPE html>\n<html lang="en" data-itt-year="{year}">\n<head>\n'
        f'<meta charset="utf-8">\n<title>{title} — {year}</title>\n'
        f'<link rel="stylesheet" href="{up}css/{period_css}">\n</head>\n'
        f'<body bgcolor="#ffffff" text="#111" link="#00e">\n'
        f'<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
        f'<p style="font-family:Arial,sans-serif;font-size:12px">'
        f'<a href="{back}">← back</a> · '
        f'<a href="{rel_href(dest, "pages/home.html")}">Starting Point</a></p>\n'
        f'<div style="max-width:46em;margin:12px;font-family:Arial,sans-serif;font-size:13px">\n'
        f"<h1>{title}</h1>\n"
        f"<p>Second leftover dest · {year} · not the star · failed-final costume OK.</p>\n"
        f"</div>\n"
        f'<script src="{up}js/immersion-{year}.js"></script>\n'
        f"{panel}"
        f"</body>\n</html>\n"
    )


def home_trail(year: str, flows: list[Flow]) -> str:
    parts = []
    for path, suffix, _k, title, _e, _n, _nl in flows:
        href = "../" + path
        parts.append(f'<a href="{href}" data-trail-keys="itt{year[2:]}-{suffix}">{title}</a>')
    star_path, star_lab = STARS[year]
    parts.append(f'<a href="../{star_path}">★ {star_lab}</a>')
    chain = " → ".join(parts)
    return (
        "<!-- ITT-2X-TRAILS:start -->\n"
        f'<p class="itt-2x-trails" id="ott-2x-{year}" '
        f'style="margin:10px 0;padding:10px;background:#e8f5e9;border:1px solid #2e7d32;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>2× leftover dests</b> (not the chip · incomplete never writes): {chain}</p>\n"
        "<!-- ITT-2X-TRAILS:end -->\n"
    )


def map_block(year: str, flows: list[Flow]) -> str:
    lis = []
    for path, suffix, kind, title, _e, nxt, nl in flows:
        lis.append(
            f'<li><a href="../{path}">{title}</a> · <code>itt{year[2:]}-{suffix}</code> · {kind} '
            f'→ <a href="../{nxt}">{nl}</a></li>'
        )
    return (
        "<!-- ITT-2X-MAP:start -->\n"
        f'<div class="itt-2x-map" data-itt-2x-map="{year}" '
        f'style="margin:12px 0;padding:10px;border:1px dashed #2e7d32;font-family:Arial,sans-serif;font-size:12px">'
        f"<b>2× leftover map · {year}</b>\n<ul>\n"
        + "\n".join(lis)
        + "\n</ul></div>\n<!-- ITT-2X-MAP:end -->\n"
    )


def write_matrix() -> None:
    rows = []
    for year, flows in WRITERS.items():
        for path, suffix, kind, title, extra, nxt, nl in flows:
            k2, _e2 = product_kind_extra(kind, extra)
            rows.append(
                {
                    "year": year,
                    "path": f"/years/{year}/{path}",
                    "key": f"itt{year[2:]}-{suffix}",
                    "kind": k2,
                    "title": title,
                    "next": f"/years/{year}/{nxt}",
                    "nextLabel": nl,
                }
            )
    for year, items in DEEPEN.items():
        for src, suffix, title in items:
            dest = str(Path(src).with_name("more.html"))
            rows.append(
                {
                    "year": year,
                    "path": f"/years/{year}/{dest}",
                    "key": f"itt{year[2:]}-{suffix}",
                    "kind": "query",
                    "title": title,
                    "next": f"/years/{year}/{STARS[year][0]}",
                    "nextLabel": STARS[year][1],
                }
            )
    out = ROOT / "e2e" / "2x-links.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {out} ({len(rows)} flows)")


def main() -> int:
    missing = []
    injected = 0
    deepened = 0

    for year, flows in WRITERS.items():
        ydir = ROOT / "years" / year
        if not ydir.is_dir():
            print(f"SKIP year missing {year}")
            continue
        for path, suffix, kind, title, extra, nxt, nl in flows:
            dest = ydir / path
            if not dest.is_file():
                missing.append(f"{year}/{path}")
                continue
            text = dest.read_text(encoding="utf-8", errors="replace")
            block = panel_html(year, path, suffix, kind, title, extra, nxt, nl)
            new = upsert_panel(text, suffix, block)
            for old in RETIRE.get((year, path), set()):
                new = strip_panel(new, old)
            if new != text:
                dest.write_text(new, encoding="utf-8")
                injected += 1

        home = ydir / "pages" / "home.html"
        if home.is_file():
            ht = home.read_text(encoding="utf-8", errors="replace")
            trail = home_trail(year, flows)
            if TRAIL_RE.search(ht):
                ht = TRAIL_RE.sub(trail, ht, count=1)
            else:
                ht = insert_before_body(ht, trail)
            home.write_text(ht, encoding="utf-8")

        mp = ydir / "pages" / "map.html"
        if mp.is_file():
            mt = mp.read_text(encoding="utf-8", errors="replace")
            blk = map_block(year, flows)
            if MAP_RE.search(mt):
                mt = MAP_RE.sub(blk, mt, count=1)
            else:
                mt = insert_before_body(mt, blk)
            mp.write_text(mt, encoding="utf-8")

    for year, items in DEEPEN.items():
        ydir = ROOT / "years" / year
        if not ydir.is_dir():
            continue
        star_path, star_lab = STARS[year]
        for src, suffix, title in items:
            src_p = ydir / src
            if not src_p.is_file():
                missing.append(f"{year}/{src}")
                continue
            dest_rel, html = more_page(year, src, suffix, title)
            dest_p = ydir / dest_rel
            dest_p.write_text(html, encoding="utf-8")
            ensure_urlmap(year, dest_rel)
            deepened += 1
            # inbound on the index
            it = src_p.read_text(encoding="utf-8", errors="replace")
            mark = f"<!-- ITT-2X-MORE:{suffix}:start -->"
            link = (
                f"{mark}\n"
                f'<p class="itt-2x-more" style="font-family:Arial,sans-serif;font-size:12px">'
                f'<a href="more.html">2× leftover · {title}</a> · '
                f'<a href="{rel_href(src, star_path)}">★ {star_lab}</a></p>\n'
                f"<!-- ITT-2X-MORE:{suffix}:end -->\n"
            )
            pat = re.compile(
                rf"<!-- ITT-2X-MORE:{re.escape(suffix)}:start -->.*?<!-- ITT-2X-MORE:{re.escape(suffix)}:end -->\s*",
                re.S,
            )
            if pat.search(it):
                it = pat.sub(link, it, count=1)
            else:
                it = insert_before_body(it, link)
            src_p.write_text(it, encoding="utf-8")

        # home strip for deepen years (Band A) if no writers strip
        if year not in WRITERS:
            home = ydir / "pages" / "home.html"
            if home.is_file():
                fake_flows = []
                for src, suffix, title in items:
                    dest = str(Path(src).with_name("more.html"))
                    fake_flows.append((dest, suffix, "query", title, "ok", STARS[year][0], STARS[year][1]))
                ht = home.read_text(encoding="utf-8", errors="replace")
                trail = home_trail(year, fake_flows)
                if TRAIL_RE.search(ht):
                    ht = TRAIL_RE.sub(trail, ht, count=1)
                else:
                    ht = insert_before_body(ht, trail)
                home.write_text(ht, encoding="utf-8")

    write_matrix()
    print(f"injected/updated panels: {injected}")
    print(f"deepen more.html pages: {deepened}")
    if missing:
        print("MISSING files:")
        for m in missing:
            print(" ", m)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
