#!/usr/bin/env python3
"""Build 2006 from scratch. No git checkout of any wiped forest."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2006"

OFFICIAL = [
    ("twitter", "Twitter / Twttr 140", "itt06-tweets", "sites/twitter/index.html", "sites/facebook/feed.html", "News Feed"),
    ("facebook", "News Feed", "itt06-feed", "sites/facebook/feed.html", "sites/youtube/index.html", "YouTube"),
    ("youtube", "YouTube", "itt06-yt", "sites/youtube/index.html", "sites/digg/index.html", "Digg"),
    ("digg", "Digg 3.0", "itt06-digg", "sites/digg/index.html", "sites/reddit/index.html", "Reddit"),
    ("reddit", "Reddit", "itt06-reddit", "sites/reddit/index.html", "sites/docs/index.html", "Google Docs"),
    ("docs", "Google Docs", "itt06-docs", "sites/docs/index.html", "sites/aws/index.html", "AWS"),
    ("aws", "AWS S3", "itt06-aws", "sites/aws/index.html", "sites/reader/index.html", "Google Reader"),
    ("reader", "Google Reader", "itt06-reader", "sites/reader/index.html", "sites/time-you/index.html", "Time You"),
    ("time-you", "Time You", "itt06-time-you", "sites/time-you/index.html", "sites/playable/game.html", "TrailSled"),
    ("playable", "TrailSled", "itt06-game-sled", "sites/playable/game.html", "sites/youtube/index.html", "YouTube"),
]

# slug, title, lo_key, pick, trap, thesis, kind
LEFTOVER = [
    # Pack A extras (not already official gold rooms)
    ("twitter/sms", "Twttr SMS 40404", "sms-lx", "sms", "280", "Text 40404. Not the star Update.", "query"),
    ("twitter/timeline", "Twttr public timeline", "tw-tl", "tl", "foryou", "Public timeline leftover. Not For You.", "hops"),
    ("twitter/about", "Twttr About", "tw-about", "about", "bird", "About leftover. No invented bird.", "hops"),
    ("facebook/story", "News Feed leftover story", "feed-lx", "story", "hide", "See a story leftover. Not the gold.", "hops"),
    ("facebook/privacy", "Mini-Feed privacy", "feed-priv", "priv", "ignore", "8 Sep privacy leftover.", "checks"),
    ("facebook/open", "Facebook open / geo", "fb-open", "open", "campus", "26 Sep anyone · geographic networks.", "hops"),
    ("youtube/watch", "YouTube leftover watch", "yt-watch", "watch", "gv", "Independent until 9 Oct.", "hops"),
    ("youtube/upload", "YouTube leftover upload", "yt-up-lx", "up", "2005gold", "Not the 2005 gold key.", "query"),
    ("youtube/sale", "YouTube sale honesty", "yt-sale", "sale", "jan", "9 Oct $1.65B · 13 Nov close.", "checks"),
    ("youtube/embed", "YouTube embed", "yt-embed", "embed", "html5", "Flash <object> leftover.", "query"),
    ("digg/bury", "Digg leftover bury", "digg-lx", "bury", "v4", "v3 26 Jun. Not v4.", "hops"),
    ("digg/upcoming", "Digg upcoming", "digg-up", "up", "v4", "Upcoming / popular leftover.", "hops"),
    ("digg/powerlaw", "Digg power-law", "digg-pl", "pl", "fair", "Power-law leftover tick.", "checks"),
    ("reddit/boost", "Reddit leftover boost", "reddit-lx", "boost", "awards", "Condé Nast 31 Oct.", "hops"),
    ("reddit/new", "Reddit what's new", "reddit-new", "new", "awards", "Sparse front leftover.", "hops"),
    ("writely", "Writely leftover", "writely", "type", "drive", "9 Mar acquire. Brand dies 10 Oct.", "query"),
    ("spreadsheets", "Spreadsheets Labs", "sheets", "cell", "excel", "6 Jun Labs · Oct wedding.", "query"),
    ("docs/leftover", "Docs leftover type", "docs-lx", "doc", "drive", "10–11 Oct docs.google.com.", "query"),
    ("calendar", "Google Calendar", "gcal", "event", "iphone", "13 Apr leftover event.", "query"),
    ("aws/put", "S3 leftover put", "s3-lx", "put", "drive", "14 Mar $0.15/GB second path.", "hops"),
    ("ec2", "EC2 leftover boot", "ec2", "boot", "ga", "24–25 Aug beta. GA 2008 BAN.", "hops"),
    ("sqs", "SQS leftover send", "sqs", "send", "sns", "11–13 Jul production.", "hops"),
    ("reader/mark", "Reader leftover mark", "reader-lx", "mark", "feedly", "28 Sep redesign leftover.", "hops"),
    ("reader/share", "Reader share", "reader-share", "share", "feedly", "Shared icon leftover.", "hops"),
    ("time-you/open", "Time You leftover open", "time-lx", "open", "cover", "Dec issue leftover. No invented cover.", "hops"),
    ("ie7", "IE7 leftover download", "ie7", "dl", "chrome", "18 Oct for XP. Not the shell.", "checks"),
    ("firefox", "Firefox 2 leftover", "fx2", "dl", "chrome", "24 Oct. Not the shell.", "checks"),
    ("slideshare", "SlideShare leftover", "slides", "title", "prezi", "4 Oct PowerPoint + YouTube.", "query"),
    ("newsvine", "Newsvine leftover", "nvine", "seed", "digg", "Public 3 Mar. Not Digg gold.", "query"),
    ("bebo", "Bebo leftover", "bebo", "profile", "fb", "Zeitgeist #1 gainer.", "query"),
    ("unbox", "Amazon Unbox leftover", "unbox", "rent", "stream", "7 Sep. DVD still primary.", "hops"),
    ("wikileaks", "WikiLeaks leftover", "wl", "note", "cable", "Domain 4 Oct. First doc Dec. Not Cablegate.", "hops"),
    ("kongregate", "Kongregate leftover", "kong", "play", "appstore", "10 Oct alpha. Not App Store.", "hops"),
    ("linerider", "Line Rider leftover", "linerider", "draw", "official", "23 Sep dA. Not TrailSled gold.", "hops"),
    ("googlevideo", "Google Video leftover", "gvid", "watch", "gold", "Not the YouTube gold.", "hops"),
    ("googletalk", "Google Talk leftover", "gtalk", "chat", "hangouts", "28 Sep no Gmail required.", "hops"),
    ("googlepack", "Google Pack leftover", "gpack", "pack", "chrome", "13 Apr same day as Calendar.", "hops"),
    ("wii", "Wii leftover", "wii", "swing", "appstore", "19 Nov US. Not year chrome.", "hops"),
    ("zune", "Zune leftover", "zune", "note", "ipod", "14 Nov US $249.99.", "hops"),
    ("vista", "Vista RTM leftover", "vista-rtm", "rtm", "aero", "8 Nov RTM. Retail 30 Jan 2007 BAN.", "checks"),
    # Pack B
    ("myspace", "MySpace leftover", "ms-lx", "profile", "fb", "Still mass. 51.4M May US.", "hops"),
    ("myspace/pv", "MySpace PV tick", "ms-pv", "pv", "uniques", "Nov Fox 38.7B vs Yahoo 38.1B.", "checks"),
    ("facebook/wall", "Facebook leftover wall", "fb-wall", "wall", "timeline", "Not Timeline.", "hops"),
    ("facebook/poke", "Facebook leftover poke", "fb-poke", "poke", "react", "Period verb poke.", "hops"),
    ("wikipedia", "Wikipedia leftover", "wiki-lx", "cite", "ai", "Time You names it. Jordanhill 1 Mar.", "query"),
    ("flickr", "Flickr leftover", "fl-lx", "stream", "ig", "Yahoo-owned residual.", "hops"),
    ("delicious", "delicious leftover", "deli-lx", "tag", "pin", "1M registered 25 Sep.", "query"),
    ("stumbleupon", "StumbleUpon leftover", "stu-lx", "stumble", "ebay", "eBay May 2007 BAN as owner.", "hops"),
    ("bloglines", "Bloglines leftover", "bl-lx", "sub", "feedly", "Search 31 May.", "hops"),
    ("technorati", "Technorati leftover", "techno-lx", "cosmos", "tw", "27.2→57M blogs.", "query"),
    ("techcrunch", "TechCrunch leftover", "tc-lx", "post", "tiktok", "2006 trade paper.", "query"),
    ("huffpost", "HuffPost leftover", "huff-lx", "post", "fb", "2005 launch · year-two.", "hops"),
    ("boingboing", "Boing Boing leftover", "bb-lx", "post", "tw", "A-list leftover.", "hops"),
    ("engadget", "Engadget leftover", "eng-lx", "post", "appstore", "Gadget desk leftover.", "hops"),
    ("gizmodo", "Gizmodo leftover", "giz-lx", "post", "appstore", "Gadget desk leftover.", "hops"),
    ("lifehacker", "Lifehacker leftover", "lh-lx", "post", "appstore", "Covered Calendar 13 Apr.", "hops"),
    ("mashable", "Mashable leftover", "mash-lx", "post", "tiktok", "Cashmore leftover.", "query"),
    ("wired", "Wired leftover", "wired-lx", "post", "tw", "Feed revolt desk.", "hops"),
    ("slashdot", "Slashdot leftover", "sd-lx", "post", "reddit", "Digg surpassed it.", "hops"),
    ("blogger", "Blogger leftover", "bgr-lx", "post", "tw", "Google-owned leftover.", "hops"),
    ("wordpress", "WordPress leftover", "wp-lx", "post", "wix", "Continuity leftover.", "hops"),
    ("livejournal", "LiveJournal leftover", "lj-lx", "post", "tumblr", "Continuity leftover.", "hops"),
    ("feedburner", "FeedBurner leftover", "fburn-lx", "feed", "google", "Google Jun 2007 BAN as owner.", "hops"),
    ("odeo", "Odeo leftover", "odeo-lx", "pod", "tw", "Twttr parent leftover.", "hops"),
    ("jaiku", "Jaiku leftover", "jaiku", "update", "tw", "Google-owned 9 Oct 2007 BAN.", "query"),
    ("secondlife", "Second Life leftover", "sl-lx", "rez", "meta", "1M accounts 18 Oct.", "hops"),
    ("clubpenguin", "Club Penguin leftover", "cp-lx", "igloo", "disney", "Independent. Disney 1 Aug 2007 BAN.", "hops"),
    ("meebo", "Meebo leftover", "meebo-lx", "im", "slack", "Browser IM leftover.", "hops"),
    ("orkut", "Orkut leftover", "orkut-lx", "scrap", "fb", "Google social leftover.", "hops"),
    ("friendster", "Friendster leftover", "fs-lx", "testimonial", "fb", "Testimonials leftover.", "hops"),
    ("linkedin", "LinkedIn leftover", "li-lx", "invite", "fb", "Invite a colleague leftover.", "query"),
    ("yahoo360", "Yahoo 360 leftover", "y360-lx", "blog", "fb", "Yahoo social leftover.", "hops"),
    ("yahooanswers", "Yahoo Answers leftover", "yans-lx", "ask", "gpt", "Dec 2005 leftover into 2006.", "query"),
    ("zoho", "Zoho leftover", "zoho-lx", "type", "drive", "Docs rival named 10 Oct.", "query"),
    ("igoogle", "iGoogle leftover", "igoogle-lx", "gadget", "chrome", "Gadgets leftover.", "hops"),
    ("netvibes", "Netvibes leftover", "nvibes-lx", "mod", "chrome", "Start page leftover.", "hops"),
    ("flock", "Flock leftover", "flock-lx", "beta", "chrome", "13 Jun public beta. Not Chrome.", "checks"),
    ("programmableweb", "ProgrammableWeb leftover", "pw-lx", "api", "aws", "S3/EC2 year leftover.", "query"),
    # Pack C
    ("yahoo", "Yahoo portal leftover", "yahoo-lx", "dir", "google", "US uniques #1 leftover.", "hops"),
    ("google", "Google search leftover", "google-q", "q", "docs", "Search leftover. Not Docs gold.", "query"),
    ("msn", "MSN leftover", "msn-lx", "portal", "bing", "World uniques #1 leftover.", "hops"),
    ("aol", "AOL leftover", "aol-lx", "screen", "gmail", "Screen name leftover.", "hops"),
    ("ask", "Ask leftover", "ask-lx", "ask", "google", "Jeeves residual leftover.", "query"),
    ("amazon", "Amazon cart leftover", "amz-lx", "cart", "s3", "Cart leftover. Not S3.", "hops"),
    ("ebay", "eBay leftover", "ebay-lx", "bid", "unbox", "Bid leftover. Not Unbox.", "hops"),
    ("paypal", "PayPal leftover", "pp-lx", "pay", "checkout", "eBay-owned leftover.", "hops"),
    ("netflix", "Netflix leftover", "nflx-lx", "queue", "stream", "DVD primary. Streaming BAN.", "hops"),
    ("maps", "Google Maps leftover", "maps-lx", "go", "pegman", "No pegman. SV 29 May 2007 BAN.", "query"),
    ("housingmaps", "HousingMaps leftover", "hm-lx", "pin", "zillow", "Craigslist + Maps leftover.", "hops"),
    ("googleearth", "Google Earth leftover", "earth-lx", "tilt", "sv", "Not Street View.", "hops"),
    ("gmail", "Gmail leftover", "gmail-lx", "compose", "open", "Invite all year. Open 14 Feb 2007 BAN.", "query"),
    ("aim", "AIM leftover", "aim-lx", "im", "imessage", "Continuity leftover.", "hops"),
    ("msnmessenger", "MSN Messenger leftover", "msnmsg-lx", "im", "teams", "WLM public 8 May leftover.", "hops"),
    ("icq", "ICQ leftover", "icq-lx", "im", "whatsapp", "Continuity leftover.", "hops"),
    ("skype", "Skype leftover", "skype-lx", "call", "zoom", "eBay residual leftover.", "hops"),
    ("itunes", "iTunes leftover", "itunes-lx", "pod", "appstore", "Podcasts + video leftover.", "hops"),
    ("pandora", "Pandora leftover", "pandora-lx", "station", "spotify", "Genome leftover.", "query"),
    ("lastfm", "Last.fm leftover", "lastfm-lx", "scrobble", "spotify", "Scrobble leftover.", "query"),
    ("photobucket", "Photobucket leftover", "pb-lx", "host", "ig", "MySpace pics leftover.", "hops"),
    ("imageshack", "ImageShack leftover", "ish-lx", "host", "imgur", "Host leftover.", "hops"),
    ("tinypic", "TinyPic leftover", "tp-lx", "host", "imgur", "Host leftover.", "hops"),
    ("vimeo", "Vimeo leftover", "vimeo-lx", "watch", "yt", "Not YouTube gold.", "hops"),
    ("dailymotion", "DailyMotion leftover", "dm-lx", "watch", "yt", "EU video leftover.", "hops"),
    ("metacafe", "Metacafe leftover", "mc-lx", "watch", "yt", "Clips leftover.", "hops"),
    ("steam", "Steam leftover", "steam-lx", "lib", "epic", "Valve store leftover.", "hops"),
    ("wow", "WoW leftover", "wow-lx", "quest", "tbc", "Vanilla. TBC 16 Jan 2007 BAN.", "hops"),
    ("newgrounds", "Newgrounds leftover", "ng-lx", "flash", "swf", "Flash leftover. No ripped SWF.", "hops"),
    ("miniclip", "Miniclip leftover", "mini-lx", "play", "appstore", "Flash leftover.", "hops"),
    ("apple", "Apple / iPod leftover", "ipod-lx", "ipod", "iphone", "No iPhone.", "hops"),
    ("microsoft", "Microsoft leftover", "msft-lx", "xp", "aero", "XP. No Aero default.", "hops"),
    ("cnn", "CNN leftover", "cnn-lx", "headline", "live", "Mass news leftover.", "hops"),
    ("bbc", "BBC leftover", "bbc-lx", "headline", "live", "Mass news leftover.", "hops"),
    ("wikipedia/cite", "Wikipedia leftover two", "wiki-2", "cite", "ai", "Time You leftover two.", "query"),
    ("craigslist", "Craigslist leftover", "cl-lx", "local", "app", "Local leftover.", "hops"),
    ("imdb", "IMDb leftover", "imdb-lx", "title", "netflix", "Title leftover.", "query"),
    ("encarta", "Encarta leftover", "encarta-lx", "lookup", "wiki", "Lookup leftover.", "query"),
    ("wayback", "Wayback leftover", "wa-lx", "capture", "live", "archive.org leftover.", "hops"),
    # extras toward 174
    ("ning", "Ning leftover", "ning", "net", "fb", "Year-true social leftover.", "hops"),
    ("veoh", "Veoh leftover", "veoh", "watch", "yt", "Video leftover.", "hops"),
    ("break", "Break.com leftover", "break", "clip", "yt", "Clip leftover.", "hops"),
    ("ebaumsworld", "eBaum leftover", "ebaum", "clip", "yt", "Clip leftover.", "hops"),
    ("addictinggames", "AddictingGames leftover", "agames", "play", "appstore", "Flash leftover.", "hops"),
    ("armorgames", "Armor Games leftover", "armor", "play", "appstore", "Flash leftover.", "hops"),
    ("albinoblacksheep", "Albino Blacksheep leftover", "abs", "play", "swf", "Flash leftover.", "hops"),
    ("revver", "Revver leftover", "revver", "watch", "yt", "Video leftover.", "hops"),
    ("ifilm", "iFilm leftover", "ifilm", "watch", "yt", "Video leftover.", "hops"),
    ("yahoovideo", "Yahoo Video leftover", "yvid", "watch", "yt", "Video leftover.", "hops"),
    ("virtualearth", "Virtual Earth leftover", "vearth", "map", "sv", "Not Street View.", "hops"),
    ("livesearch", "Live Search leftover", "liveq", "q", "bing", "Live Search leftover.", "query"),
    ("officelive", "Office Live leftover", "olife", "doc", "365", "Office Live leftover.", "hops"),
    ("mturk", "MTurk leftover", "mturk", "hit", "ai", "Mechanical Turk leftover.", "hops"),
    ("greasemonkey", "Greasemonkey leftover", "gm", "script", "ext", "Userscript leftover.", "hops"),
    ("akismet", "Akismet leftover", "akismet", "spam", "captcha", "Spam leftover.", "hops"),
    ("joomla", "Joomla leftover", "joomla", "cms", "wp", "CMS leftover.", "hops"),
    ("rails", "Rails leftover", "rails", "app", "node", "Rails leftover.", "hops"),
    ("kiko", "Kiko leftover", "kiko", "cal", "gcal", "Calendar rival leftover.", "hops"),
    ("upcoming", "Upcoming leftover", "upc", "event", "fb", "Events leftover.", "hops"),
    ("eventful", "Eventful leftover", "evful", "event", "fb", "Events leftover.", "hops"),
    ("librarything", "LibraryThing leftover", "lthing", "book", "kindle", "Books leftover.", "hops"),
    ("basecamp", "Basecamp leftover", "bcamp", "proj", "asana", "Project leftover.", "hops"),
    ("yousendit", "YouSendIt leftover", "ysi", "send", "dropbox", "Send leftover.", "hops"),
    ("utorrent", "µTorrent leftover", "utor", "tor", "steam", "Torrent leftover.", "hops"),
    ("weather", "Weather leftover", "wx", "zip", "app", "Weather leftover.", "hops"),
    ("walmart", "Walmart leftover", "wm", "cart", "prime", "Retail leftover.", "hops"),
    ("kayak", "Kayak leftover", "kayak", "flight", "app", "Travel leftover.", "hops"),
    ("dmoz", "DMOZ leftover", "dmoz", "cat", "google", "Directory leftover.", "hops"),
    ("geocities", "GeoCities leftover", "geo", "hood", "fb", "Neighborhood leftover.", "hops"),
    ("piczo", "Piczo leftover", "piczo", "page", "fb", "Page leftover.", "hops"),
    ("tagged", "Tagged leftover", "tagged", "tag", "fb", "Social leftover.", "hops"),
    ("hi5", "hi5 leftover", "hi5", "profile", "fb", "Social leftover.", "hops"),
    ("webkinz", "Webkinz leftover", "webkinz", "pet", "app", "Pet leftover.", "hops"),
    ("habbo", "Habbo leftover", "habbo", "room", "app", "Hotel leftover.", "hops"),
    ("gaia", "Gaia leftover", "gaia", "avatar", "app", "Avatar leftover.", "hops"),
    ("neopets", "Neopets leftover", "neo", "pet", "app", "Pet leftover.", "hops"),
    ("runescape", "RuneScape leftover", "rs", "quest", "app", "MMORPG leftover.", "hops"),
    ("xbox360", "Xbox 360 leftover", "x360", "live", "appstore", "Console leftover.", "hops"),
    ("ps3", "PS3 leftover", "ps3", "boot", "appstore", "11 Nov US class leftover.", "hops"),
    ("ytmnd", "YTMND leftover", "ytmnd", "site", "meme", "Meme leftover.", "hops"),
    ("homestarrunner", "Homestar leftover", "hsr", "toon", "yt", "Toon leftover.", "hops"),
    ("deviantart", "DeviantArt leftover", "da", "art", "ig", "Art leftover. Line Rider class.", "hops"),
    ("fark", "Fark leftover", "fark", "link", "reddit", "Link leftover.", "hops"),
    ("metafilter", "MetaFilter leftover", "mefi", "post", "reddit", "Community leftover.", "hops"),
    ("collegehumor", "CollegeHumor leftover", "ch", "clip", "yt", "Clip leftover.", "hops"),
    ("mtv", "MTV leftover", "mtv", "video", "yt", "Video leftover.", "hops"),
    ("barcamp", "BarCamp leftover", "barcamp", "session", "tw", "Unconference leftover.", "hops"),
    ("web20conference", "Web 2.0 Conf leftover", "w20", "talk", "tw", "Conference leftover.", "hops"),
    ("adsense", "AdSense leftover", "adsense", "ad", "ads", "Ads leftover.", "hops"),
    ("analytics", "Analytics leftover", "ga", "hit", "ga4", "Analytics leftover.", "hops"),
    ("windowslive", "Windows Live leftover", "wlive", "home", "chrome", "Windows Live leftover.", "hops"),
    ("yelp", "Yelp leftover", "yelp", "review", "app", "Review leftover.", "hops"),
    ("checkout", "Google Checkout leftover", "gco", "pay", "paypal", "29 Jun 2%+$0.20. Not P2P.", "hops"),
    ("lonelygirl15", "lonelygirl15 leftover", "lg15", "vlog", "reel", "16 Jun first Bree. Outed 8 Sep.", "hops"),
    ("stupidvideos", "StupidVideos leftover", "sv", "clip", "yt", "Clip leftover.", "hops"),
]


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def lo_panel(year: str, key: str, pick: str, trap: str, field: bool, next_href: str, next_label: str) -> str:
    field_html = (
        f'<p><input data-lo-field placeholder="leftover {esc(key)}" maxlength="80"></p>' if field else ""
    )
    return f"""
<!-- ITT-LO-OFFICIAL:start -->
<section data-lo-panel="1" data-itt-year="{year}" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">
<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt06-{esc(key)}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>
<p>
 <button type="button" data-lo-pick="{esc(pick)}">{esc(pick)} leftover</button>
 <button type="button" data-lo-trap>{esc(trap)} (trap)</button>
 <button type="button" data-lo-pick="{esc(trap)}">{esc(trap)} (wrong)</button>
</p>
{field_html}
<p><button type="button" data-lo-save data-lo-key="{esc(key)}" data-lo-need-pick="{esc(pick)}">Save leftover</button>
 <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt06-{esc(key)}"><b>Next:</b> <a href="{esc(next_href)}">{esc(next_label)}</a></p>
</section>
<!-- ITT-LO-OFFICIAL:end -->
"""


def also3x(links: list[tuple[str, str]]) -> str:
    bits = " ·\n ".join(f'<a href="{esc(h)}">{esc(l)}</a>' for h, l in links)
    return f"""
<!-- ITT-3X-ALSO:start -->
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2006" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;line-height:1.7;max-width:52em"><b>Also this year · 3×</b><p style="margin:6px 0 0">
 {bits}
</p></nav>
<!-- ITT-3X-ALSO:end -->
"""


def page_wrap(title: str, body: str, extra_head: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>{esc(title)}</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
{extra_head}
</head>
<body bgcolor="#ffffff" link="#0000cc" vlink="#551a8b" text="#000000">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def dest_index(slug: str, title: str, thesis: str, lo: str, also: str) -> str:
    depth = slug.count("/")
    home = "../" * (depth + 2) + "pages/home.html"
    return page_wrap(
        f"{title} — 2006",
        f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p><a href="{home}">Starting Point</a> · <a href="index.html">{esc(title)}</a></p>
<p class="itt-pixel-failed">[failed-final] 2006 leftover costume · no invented brand pixel</p>
<h1>{esc(title)}</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px"><b>Honesty:</b> {esc(thesis)} Incomplete never writes. Star stays Twitter 140.</p>
<p>Period leftover room. XP + IE6. No iPhone. No Chrome.</p>
{lo}
{also}
</div>
""",
    )


def build_official() -> None:
    # Twitter star
    write(
        Y / "sites/twitter/index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006" data-official-key="itt06-tweets">
<head>
<meta charset="utf-8">
<title>twitter — What are you doing?</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body bgcolor="#9ae4e8">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="tw-shell tw-card">
<p><a href="../../pages/home.html">Starting Point</a> · <a href="about.html">about</a> · <a href="timeline.html">timeline</a></p>
<p class="itt-pixel-failed">[failed-final] Twttr 2006 · no invented bird</p>
<div style="font-size:28px;font-weight:bold;color:#33ccff">twitter</div>
<p>What are you doing?</p>
<p style="background:#ffc;border:1px solid #cc0;padding:6px;font-size:12px">
<b>15 Jul 2006</b> public · SMS <b>40404</b> · 140 because SMS — HTML does not print 140.
Empty Update never writes. SXSW mass is Mar 2007 BAN.
</p>
<p>
<button type="button" data-tw06-trap>280 / For You (trap)</button>
<button type="button" data-official-trap>iPhone (trap)</button>
</p>
<p><label><input type="checkbox" data-tw06-req> 15 Jul 2006 · Twttr public · SMS 40404.</label></p>
<p><label><input type="checkbox" data-tw06-req> 140 because SMS — empty / 280 / iPhone never write.</label></p>
<p><textarea data-tw06-body data-twitter-status maxlength="140" rows="3" cols="48" placeholder="What are you doing?"></textarea>
 <span data-tw06-count>140</span></p>
<p><button type="button" data-tw06-post data-official-verb>update</button>
 <span data-tw06-status data-official-status></span></p>
<div data-tw06-timeline data-twitter-timeline></div>
<p hidden data-next-flow data-next-when-key="itt06-tweets"><b>Next:</b> <a href="../facebook/feed.html">News Feed</a></p>
</div>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
    )
    write(
        Y / "sites/twitter/about.html",
        page_wrap(
            "About Twttr — 2006",
            """
<div class="tw-card">
<h1>About twttr</h1>
<p>First tweet 21 Mar 2006 · @jack · just setting up my twttr. Public 15 Jul. Odeo side project. Not modern X.</p>
<p><a href="index.html">compose</a></p>
</div>
""",
        ),
    )
    write(
        Y / "sites/twitter/timeline.html",
        dest_index(
            "twitter/timeline",
            "Twttr public timeline",
            "Public timeline leftover.",
            lo_panel("2006", "tw-tl", "tl", "foryou", False, "index.html", "Twitter 140"),
            "",
        ),
    )
    write(
        Y / "sites/twitter/sms.html",
        dest_index(
            "twitter/sms",
            "SMS 40404",
            "Text 40404 leftover. Not the star.",
            lo_panel("2006", "sms-lx", "sms", "280", True, "index.html", "Twitter 140"),
            "",
        ),
    )

    # News Feed
    write(
        Y / "sites/facebook/feed.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006" data-official-key="itt06-feed">
<head>
<meta charset="utf-8">
<title>Facebook News Feed — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body bgcolor="#ffffff">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:12px auto;font-family:Tahoma,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a> · <a href="index.html">home</a> · <a href="open.html">open</a></p>
<p class="itt-pixel-failed">[failed-final] News Feed 2006 · no invented f</p>
<h1>News Feed</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">
<b>5 Sep</b> “Calm down. Breathe.” · <b>8 Sep</b> “We really messed this one up.” · <b>26 Sep</b> open / geographic networks.
Campus-only after 26 Sep is a lie. Beacon is 2007 BAN.
</p>
<p>
<button type="button" data-feed-hide>Hide Feed</button>
<button type="button" data-ff06-trap>Campus-only after 26 Sep (trap)</button>
</p>
<p><label><input type="checkbox" data-ff06-req> 5 Sep live · Mini-Feed vs News Feed.</label></p>
<p><label><input type="checkbox" data-ff06-req> 8 Sep privacy leftover. Empty / Hide never writes.</label></p>
<p>
<button type="button" data-ff06-pick="see">See a story</button>
<button type="button" data-ff06-pick="privacy">8 Sep privacy leftover</button>
</p>
<p><button type="button" data-ff06-save>Save leftover</button> <span data-ff06-status></span></p>
<div data-fb-feed class="fb-feed-item">A friend joined a group. (theater)</div>
<p hidden data-next-flow data-next-when-key="itt06-feed"><b>Next:</b> <a href="../youtube/index.html">YouTube</a></p>
</div>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
    )
    write(
        Y / "sites/facebook/index.html",
        dest_index(
            "facebook",
            "Facebook leftover",
            "Wall leftover. Not Timeline. Not the Feed gold.",
            lo_panel("2006", "fb-wall", "wall", "timeline", False, "feed.html", "News Feed"),
            "",
        ),
    )
    write(
        Y / "sites/facebook/open.html",
        dest_index(
            "facebook/open",
            "Facebook open",
            "26 Sep anyone · geographic networks.",
            lo_panel("2006", "fb-open", "open", "campus", False, "feed.html", "News Feed"),
            "",
        ),
    )
    write(
        Y / "sites/facebook/privacy.html",
        dest_index(
            "facebook/privacy",
            "Mini-Feed privacy",
            "8 Sep privacy leftover.",
            lo_panel("2006", "feed-priv", "priv", "ignore", False, "feed.html", "News Feed"),
            "",
        ),
    )
    write(
        Y / "sites/facebook/story.html",
        dest_index(
            "facebook/story",
            "Feed leftover story",
            "See a story leftover.",
            lo_panel("2006", "feed-lx", "story", "hide", False, "feed.html", "News Feed"),
            "",
        ),
    )
    write(
        Y / "sites/facebook/poke.html",
        dest_index(
            "facebook/poke",
            "Poke leftover",
            "Period verb poke.",
            lo_panel("2006", "fb-poke", "poke", "react", False, "feed.html", "News Feed"),
            "",
        ),
    )
    write(
        Y / "sites/facebook/wall.html",
        dest_index(
            "facebook/wall",
            "Wall leftover",
            "Not Timeline.",
            lo_panel("2006", "fb-wall", "wall", "timeline", False, "index.html", "Facebook"),
            "",
        ),
    )

    # YouTube official leftover-official pick=watch key=yt
    write(
        Y / "sites/youtube/index.html",
        official_lo(
            "YouTube — Broadcast Yourself",
            "itt06-yt",
            "yt",
            "watch",
            "gv",
            "Costume 7 Oct still YouTube, Inc. Independent until 9 Oct $1.65B. Close 13 Nov. Google Video is not the gold.",
            "../digg/index.html",
            "Digg",
        ),
    )
    write(
        Y / "sites/digg/index.html",
        official_lo(
            "Digg 3.0",
            "itt06-digg",
            "digg",
            "digg",
            "v4",
            "v3 launches 26 Jun 2006. ~800k UV/day. v4 is 2010 BAN.",
            "../reddit/index.html",
            "Reddit",
        ),
    )
    write(
        Y / "sites/reddit/index.html",
        official_lo(
            "reddit: what's new online",
            "itt06-reddit",
            "reddit",
            "sub",
            "awards",
            "Condé Nast / Wired Digital 31 Oct. Sparse front. Awards are leftover trap.",
            "../docs/index.html",
            "Google Docs",
        ),
    )
    write(
        Y / "sites/docs/index.html",
        official_lo(
            "Google Docs & Spreadsheets",
            "itt06-docs",
            "docs",
            "doc",
            "drive",
            "Writely 9 Mar · Sheets 6 Jun · docs.google.com 10–11 Oct. Drive is 2012 BAN.",
            "../aws/index.html",
            "AWS",
        ),
    )
    write(
        Y / "sites/aws/index.html",
        official_lo(
            "Amazon S3",
            "itt06-aws",
            "aws",
            "s3",
            "drive",
            "14 Mar $0.15/GB-mo · 5 GB objects. Not consumer Drive.",
            "../reader/index.html",
            "Google Reader",
        ),
    )
    write(
        Y / "sites/reader/index.html",
        official_lo(
            "Google Reader",
            "itt06-reader",
            "reader",
            "feed",
            "feedly",
            "28 Sep redesign. Feedly is 2013 BAN.",
            "../time-you/index.html",
            "Time You",
        ),
    )
    write(
        Y / "sites/time-you/index.html",
        official_lo(
            "Time — You",
            "itt06-time-you",
            "time-you",
            "you",
            "cover",
            "Dec 2006 issue. Wikipedia · YouTube · MySpace. Do not invent the cover JPEG.",
            "../playable/game.html",
            "TrailSled",
        ),
    )


def official_lo(title, when, key, pick, trap, thesis, nxt, nxtl) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006" data-official-key="{when}">
<head>
<meta charset="utf-8">
<title>{esc(title)} — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body bgcolor="#ffffff">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] 2006 official leftover · no invented brand pixel</p>
<h1>{esc(title)}</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px"><b>Honesty:</b> {esc(thesis)}</p>
{lo_panel("2006", key, pick, trap, True, nxt, nxtl)}
<p hidden data-next-flow data-next-when-key="{when}"><b>Next:</b> <a href="{esc(nxt)}">{esc(nxtl)}</a></p>
</div>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
"""


def build_playable() -> None:
    write(
        Y / "sites/playable/game.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006" data-official-key="itt06-game-sled">
<head>
<meta charset="utf-8">
<title>TrailSled — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#eef">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2006" data-game-id="sled" data-official-key="itt06-game-sled" data-yg-goal="Draw a trail. Ride it without crashing.">
<p><a href="index.html">Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] museum original · no official Line Rider art</p>
<h1>TrailSled</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">Line Rider <i>class</i> · 23 Sep leftover toy is not this gold. New Game without a run never writes.</p>
<canvas id="game-canvas" width="520" height="240" style="border:1px solid #333;background:#fff"></canvas>
<p>Score <b id="play-score" data-game-score>0</b> · Best <b data-game-best>0</b></p>
<p>
<button type="button" id="play-start">Ride</button>
<button type="button" data-game-start>New Game</button>
<button type="button" data-peg-city="a">Hill A</button>
<button type="button" data-peg-city="b">Hill B</button>
<button type="button" data-peg-trap>Unlock 280 (trap)</button>
</p>
<p id="play-status" data-itt-action-status>Draw or Ride demo. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="itt06-game-sled"><b>Next:</b> <a href="../youtube/index.html">YouTube</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-2006-sled.js"></script>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
    )
    packs = [
        ("game-2.html", "t140", "Type 140", "just setting up my twttr", "itt06-game-t140"),
        ("game-3.html", "feedclick", "Feed click", "", "itt06-game-feedclick"),
        ("game-4.html", "kongbadge", "Kong Badge", "", "itt06-game-kongbadge"),
        ("game-5.html", "wikicite", "Wiki cite", "", "itt06-game-wikicite"),
    ]
    for href, gid, title, phrase, key in packs:
        need = "3"
        phrase_html = (
            f'<p><input data-pack-type placeholder="{esc(phrase)}" maxlength="80"></p>' if phrase else ""
        )
        write(
            Y / "sites/playable" / href,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>{esc(title)} — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-pack-game data-year="2006" data-game-id="{gid}" data-pack-need="{need}" data-pack-phrase="{esc(phrase)}" data-yg-goal="{esc(title)}">
<h1>{esc(title)}</h1>
<p class="honesty">Leftover pack · not TrailSled gold · incomplete never writes · <code>{key}</code></p>
<p>Score <b data-game-score>0</b> · Acts <b data-pack-count>0/{need}</b></p>
<p>
<button type="button" data-game-start>Start</button>
<button type="button" data-pack-act>Act</button>
<button type="button" data-pack-finish>Finish</button>
</p>
{phrase_html}
<p data-itt-action-status>Press Start. Incomplete never writes.</p>
<p><a href="index.html">Playables</a> · <a href="game.html">TrailSled</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-pack-boot.js"></script>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
        )

    extras = [
        ("extra-a.html", "140 type leftover"),
        ("extra-b.html", "Digg up leftover"),
        ("extra-c.html", "Kong Badge leftover"),
        ("extra-d.html", "Fancy Dash leftover"),
        ("extra-e.html", "Flow Cell leftover"),
        ("extra-f.html", "Tab Filter leftover"),
        ("extra-g.html", "Feed Tick leftover"),
        ("extra-h.html", "Bury Cell leftover"),
        ("extra-i.html", "You Cover leftover"),
        ("more-a.html", "Fancy Run leftover"),
        ("more-b.html", "Wii Swing leftover"),
        ("more-c.html", "Obliv Walk leftover"),
        ("more-d.html", "Gears Cover leftover"),
        ("famous.html", "Pocket Snake · Concentration"),
        ("index.html", "Playables cabinet"),
        ("game-oblivwalk.html", "Obliv Walk"),
        ("game-gearscover.html", "Gears Cover"),
    ]
    for href, title in extras:
        gid = href.replace(".html", "").replace("-", "")
        write(
            Y / "sites/playable" / href,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>{esc(title)} — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2006" data-game-id="{esc(gid)}" data-year-playable>
<h1>{esc(title)}</h1>
<p class="honesty">Cabinet leftover · not TrailSled gold · no ripped SWF · no official Line Rider art.</p>
<p>
<a href="index.html">Playables</a> ·
<a href="game.html">TrailSled</a> ·
<a href="game-2.html">Type 140</a> ·
<a href="game-3.html">Feed click</a> ·
<a href="game-4.html">Kong Badge</a> ·
<a href="game-5.html">Wiki cite</a> ·
<a href="famous.html">Famous</a> ·
<a href="extra-a.html">extra-a</a> ·
<a href="extra-b.html">extra-b</a> ·
<a href="more-a.html">Fancy Run</a> ·
<a href="more-b.html">Wii Swing</a>
</p>
{lo_panel("2006", "playable-" + gid[:12], "play", "swf", False, "game.html", "TrailSled")}
</div>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
        )
    # cabinet index special
    write(
        Y / "sites/playable/index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>Playables — 2006</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div data-year-playable style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<h1>2006 playables</h1>
<p>Year gold: <a href="game.html">TrailSled</a>. Line Rider official art never ships.</p>
<ul>
<li><a href="game.html">TrailSled</a></li>
<li><a href="game-2.html">Type 140</a></li>
<li><a href="game-3.html">Feed click</a></li>
<li><a href="game-4.html">Kong Badge</a></li>
<li><a href="game-5.html">Wiki cite</a></li>
<li><a href="famous.html">Famous leftover</a></li>
<li><a href="more-a.html">Fancy Run</a></li>
<li><a href="more-b.html">Wii Swing</a></li>
<li><a href="extra-a.html">extra-a</a> · <a href="extra-b.html">extra-b</a> · <a href="extra-c.html">extra-c</a></li>
<li><a href="extra-d.html">extra-d</a> · <a href="extra-e.html">extra-e</a> · <a href="extra-f.html">extra-f</a></li>
<li><a href="extra-g.html">extra-g</a> · <a href="extra-h.html">extra-h</a> · <a href="extra-i.html">extra-i</a></li>
</ul>
</div>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
""",
    )


def build_leftovers() -> None:
    also_links = [
        ("../../pages/home.html", "Starting Point"),
        ("../../pages/map.html", "Year flow map"),
        ("../twitter/index.html", "Twitter 140"),
        ("../bebo/index.html", "Bebo"),
        ("../slideshare/index.html", "SlideShare"),
        ("../newsvine/index.html", "Newsvine"),
    ]
    also = also3x(also_links)
    for slug, title, key, pick, trap, thesis, kind in LEFTOVER:
        field = kind == "query"
        # skip if official dest index already written for same path
        dest = Y / "sites" / slug
        if slug.endswith(("/sms", "/timeline", "/about")) and slug.startswith("twitter"):
            continue
        if slug in {
            "facebook",
            "facebook/open",
            "facebook/privacy",
            "facebook/story",
            "facebook/poke",
            "facebook/wall",
        }:
            # already written
            if (Y / "sites" / (slug if "/" in slug else slug) / "index.html").exists() or (
                Y / "sites" / slug
            ).with_suffix(".html").exists():
                pass
        path = Y / "sites" / slug
        if path.suffix == ".html":
            out = path
        else:
            out = path / "index.html"
        if out.exists():
            continue
        nxt = "../../pages/map.html"
        nxtl = "Year map"
        html = dest_index(slug, title, thesis, lo_panel("2006", key, pick, trap, field, nxt, nxtl), also)
        write(out, html)
        # extra about page for density
        if out.name == "index.html":
            write(
                out.parent / "about.html",
                page_wrap(
                    f"About {title}",
                    f"<div style='max-width:46em;margin:12px auto;font-family:Arial,sans-serif'><h1>About {esc(title)}</h1><p>{esc(thesis)}</p><p><a href='index.html'>Open leftover</a></p></div>",
                ),
            )


def build_pages() -> None:
    about = """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>About the Web in 2006</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
</head>
<body bgcolor="#ffffff">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:680px;margin:16px auto;font-family:Verdana,Arial,sans-serif;font-size:13px;line-height:1.45">
<h1>About 2006</h1>
<p><b>★ One-thing:</b> type ≤140 on <a href="../sites/twitter/index.html">Twitter / Twttr</a> (<code>itt06-tweets</code>).</p>
<p><b>2006 is when the social web breaks through on a fat laptop — Twttr 140 is the save, News Feed / YouTube-sale / Digg / Docs / S3 are leftover, XP+IE6 is still the mass shell, and there is no iPhone.</b></p>
<p style="background:#fff8dc;border:1px solid #cc0;padding:8px;font-size:12px">
<b>Scale (do not blend):</b>
ILS June websites <b>85,507,314</b> · +32% · <b>13.6</b> users/site · launched Twttr ·
ILS users <b>1,160,335,280</b>.
Netcraft June hostnames <b>85,541,228</b> (not ILS).
Netcraft Nov <b>101,435,253</b> first &gt;100M.
Netcraft Dec <b>105,244,649</b> · year +30.9M / +41.5%.
Pew US home broadband <b>42% / 84M</b> (30%→42%).
ITU users/100 <b>17.5</b> (2006) vs 15.9 (2005) — later 20.5 is another revision.
IE6 ~<b>77.17%</b> Oct · IE7 <b>3.18%</b> after 18 Oct.
</p>
<p style="background:#f5f5ff;border:1px solid #99c;padding:8px;font-size:12px">
<b>Mass ranks (do not blend):</b>
MySpace May US uniques <b>51,441,000</b> · Facebook <b>14,069,000</b>.
World Jun uniques #1 Microsoft <b>499.5M</b>.
Nov US page views Fox/MySpace <b>38.7B</b> vs Yahoo <b>38.1B</b> (PVs, not uniques).
Hitwise Jul MySpace <b>~4.46%</b> of US visits (share, not uniques).
Sifry blogs 27.2M Feb → 50M 31 Jul → &gt;57M Oct.
Time You names Wikipedia · YouTube · <b>MySpace</b> (not Facebook).
</p>
<h2>Bans (never 2006 default)</h2>
<p>iPhone · App Store · Chrome · Street View / pegman · Vista Aero retail · Gmail open-to-all (14 Feb 2007) · Google-owns-YouTube as January · Facebook campus-only after 26 Sep · Beacon · Tumblr · FarmVille / Like · Instagram · 280 / For You / X · Spotify US · Netflix streaming-as-primary · Digg v4 · Cablegate.</p>
<h2>Signature leftover</h2>
<ul>
<li><a href="../sites/twitter/index.html">Twitter 140</a> — ★</li>
<li><a href="../sites/facebook/feed.html">News Feed</a> — 5 / 8 / 26 Sep</li>
<li><a href="../sites/youtube/index.html">YouTube</a> — independent until 9 Oct</li>
<li><a href="../sites/digg/index.html">Digg 3.0</a> — 26 Jun</li>
<li><a href="../sites/docs/index.html">Docs</a> · <a href="../sites/aws/index.html">S3</a> · <a href="../sites/reader/index.html">Reader</a></li>
</ul>
<p><a href="home.html">Starting Point</a> · <a href="map.html">Year flow map</a></p>
</div>
<script src="../../../js/immersion-2006.js" defer></script>
</body>
</html>
"""
    write(Y / "pages/about.html", about)
    write(
        Y / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2006</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#3a6ea5">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2006");</script>
<script src="../../../js/immersion-2006.js" defer></script>
<nav class="itt-3x-links" data-itt-3x-links data-itt-year="2006" style="margin:12px;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:11px;max-width:54em">
<b>More rooms this year · 3×</b>
<p>
<a href="../sites/twitter/index.html">Twitter 140</a> ·
<a href="../sites/facebook/feed.html">News Feed</a> ·
<a href="../sites/youtube/index.html">YouTube</a> ·
<a href="../sites/digg/index.html">Digg</a> ·
<a href="../sites/reddit/index.html">Reddit</a> ·
<a href="../sites/docs/index.html">Docs</a> ·
<a href="../sites/aws/index.html">S3</a> ·
<a href="../sites/reader/index.html">Reader</a> ·
<a href="../sites/time-you/index.html">Time You</a> ·
<a href="../sites/playable/game.html">TrailSled</a> ·
<a href="../sites/playable/index.html">Playables</a> ·
<a href="../sites/bebo/index.html">Bebo</a> ·
<a href="../sites/slideshare/index.html">SlideShare</a> ·
<a href="../sites/newsvine/index.html">Newsvine</a> ·
<a href="../sites/myspace/index.html">MySpace</a> ·
<a href="../sites/wikipedia/index.html">Wikipedia</a>
</p>
</nav>
</body>
</html>
""",
    )
    write(
        Y / "pages/map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>2006 — UX flow map</title>
<link rel="stylesheet" href="../../../css/period-2006.css">
<link rel="stylesheet" href="../../../css/flow-map.css">
<script src="../../../js/config/flow-maps.js"></script>
<script src="../../../js/config/flow-maps-popular-3x.js"></script>
<script src="../../../js/config/flow-maps-3x.js"></script>
<script src="../../../js/config/flow-maps-5x-atlas.js"></script>
</head>
<body class="itt-map-page" bgcolor="#3a6ea5">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-map-window">
<div class="itt-map-bar"><b>2006 · UX flow map</b> · <a href="home.html">Start</a> · <a href="about.html">About</a></div>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/immersion-2006.js"></script>
<p style="font-size:12px"><b>★ Star:</b> <a href="../sites/twitter/index.html">Twitter 140</a></p>
<div class="itt-2x-map" data-itt-2x-map="2006" style="margin:12px;padding:10px;border:1px dashed #2e7d32;font-family:Arial,sans-serif;font-size:12px">
<b>2× leftover map · 2006</b>
<ul>
<li><a href="../sites/twitter/sms.html">SMS 40404</a></li>
<li><a href="../sites/facebook/open.html">Facebook open</a></li>
<li><a href="../sites/calendar/index.html">Calendar</a></li>
<li><a href="../sites/ec2/index.html">EC2</a></li>
<li><a href="../sites/slideshare/index.html">SlideShare</a></li>
<li><a href="../sites/bebo/index.html">Bebo</a></li>
<li><a href="../sites/newsvine/index.html">Newsvine</a></li>
</ul>
</div>
</body>
</html>
""",
    )
    for name, title in [
        ("whats-new.html", "What's New — 2006"),
        ("cool.html", "What's Cool — 2006"),
    ]:
        write(
            Y / "pages" / name,
            page_wrap(
                title,
                f"<div style='max-width:46em;margin:12px auto;font-family:Arial,sans-serif'><h1>{esc(title)}</h1><p><a href='../sites/twitter/index.html'>Twitter 140</a> · <a href='../sites/digg/index.html'>Digg</a> · <a href='../sites/youtube/index.html'>YouTube</a></p></div>",
            ).replace("../../../../css/period-2006.css", "../../../css/period-2006.css")
            .replace("../../../../js/immersion-2006.js", "../../../js/immersion-2006.js"),
        )
    err = """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<title>__TITLE__</title>
<link rel="stylesheet" href="../../../../css/period-2006.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>__TITLE__</h1>
<p>__BODY__</p>
<p><a href="../home.html">Starting Point</a></p>
<script src="../../../../js/immersion-2006.js" defer></script>
</body>
</html>
"""
    write(Y / "pages/error/404.html", err.replace("__TITLE__", "404 — 2006").replace("__BODY__", "That path is not in the 2006 exhibit."))
    write(Y / "pages/error/unreachable.html", err.replace("__TITLE__", "Unreachable — 2006").replace("__BODY__", "That host is not on this disk."))
    write(
        Y / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2006">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 6.0 — 2006</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2006");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2006.js?v=20260830ui"></script>
<script src="../../js/browser-2006.js?v=20260830ui"></script>
</body>
</html>
""",
    )


def patch_urlmap() -> None:
    cfg = ROOT / "js/config/2006.js"
    text = cfg.read_text(encoding="utf-8")
    dests = sorted({p.relative_to(Y).as_posix() for p in Y.rglob("*.html") if "sites/" in p.as_posix() or "pages/" in p.as_posix()})
    entries = []
    for d in dests:
        entries.append(f'      "{d}": "http://museum.local/years/2006/{d}"')
    block = ",\n".join(entries)
    new = re.sub(
        r"urlMap:\s*\{.*?\n    \},",
        "urlMap: {\n" + block + "\n    },",
        text,
        count=1,
        flags=re.S,
    )
    if new == text:
        # insert if missing shape
        new = text.replace("urlMap: {", "urlMap: {\n" + block + ",", 1)
    cfg.write_text(new, encoding="utf-8")


def patch_hub() -> None:
    idx = ROOT / "index.html"
    text = idx.read_text(encoding="utf-8")
    old = """      <div class="year-card locked y2006" data-year="2006">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2006</p>
            <span class="era-chip">wiped</span>
          </div>
          <p class="label">Off disk for a from-scratch rebuild. Twitter 140 / News Feed will come back as a new lean door.</p>
          <p class="scale">~85.5M sites · ~1.16B users (Live Stats, June)</p>
          <p class="meta">Wiped · rebuild later</p>
        </div>
      </div>"""
    new = """      <a class="year-card available y2006" href="years/2006/" data-year="2006">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2006</p>
            <span class="era-chip">Twitter 140</span>
          </div>
          <p class="label">Social breakthrough on a fat laptop — Twttr 140 is the save. News Feed / YouTube-sale / Digg leftover. XP+IE6. No iPhone.</p>
          <p class="scale">85,507,314 sites · 1.16B users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>"""
    if old not in text:
        raise SystemExit("hub 2006 card not found")
    text = text.replace(old, new)
    text = text.replace("27 years open", "28 years open")
    text = text.replace("27 years are open", "28 years are open")
    text = text.replace("2006 / 2007 / 2009 / 2011 / 2025 boarded", "2007 / 2009 / 2011 / 2025 boarded")
    text = text.replace("2006 / 2007 / 2009 / 2011 / 2025 are wiped", "2007 / 2009 / 2011 / 2025 are wiped")
    idx.write_text(text, encoding="utf-8")


def patch_wiped() -> None:
    for path in [
        ROOT / "scripts/check-all-years.py",
        ROOT / "scripts/check-every-flow.js",
        ROOT / "scripts/audit-all-year-flows.js",
        ROOT / "playwright.config.js",
    ]:
        t = path.read_text(encoding="utf-8")
        t2 = t.replace('"2006", "2007"', '"2007"').replace("'2006', '2007'", "'2007'")
        t2 = t2.replace("/\\/2006[-.]/, /\\/2007[-.]/", "/\\/2007[-.]/")
        t2 = t2.replace("/\\/2006[-.]/, ", "")
        if path.name == "playwright.config.js":
            t2 = t.replace(" /\\/2006[-.]/,", "")
        path.write_text(t2, encoding="utf-8")


def main() -> None:
    build_official()
    build_playable()
    build_leftovers()
    build_pages()
    patch_urlmap()
    patch_hub()
    patch_wiped()
    htmls = list(Y.rglob("*.html"))
    dests = [p for p in (Y / "sites").iterdir() if p.is_dir()]
    print(f"html={len(htmls)} dest_folders={len(dests)}")


if __name__ == "__main__":
    main()
