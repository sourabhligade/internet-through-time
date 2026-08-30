#!/usr/bin/env python3
"""Build 2007 from scratch. No git checkout of any wiped forest."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2007"

# leftover dests toward 174 (year-true 2007 + continuity). Official rooms written separately.
LEFTOVER = [
    ("android", "Android OHA leftover", "and-07", "oha", "g1", "5 Nov OHA announced. G1 is 22 Oct 2008 BAN.", "hops"),
    ("amazon", "Amazon leftover", "az-07", "cart", "kindle", "Store leftover. Kindle is 19 Nov leftover.", "hops"),
    ("etsy", "Etsy leftover", "etsy", "shop", "appstore", "Handmade leftover. Not App Store.", "query"),
    ("friendfeed", "FriendFeed leftover", "ff", "feed", "fb", "1 Oct leftover. Not the star.", "hops"),
    ("hulu", "Hulu leftover", "hulu-ack", "beta", "public", "Private beta 29 Oct. Public 12 Mar 2008 BAN.", "checks"),
    ("justintv", "Justin.tv leftover", "jtv", "live", "twitch", "Live leftover. Not Twitch.", "query"),
    ("kindle", "Kindle leftover", "kindle", "buy", "app", "19 Nov $399 Whispernet. 3×.", "checks"),
    ("kindlestore", "Kindle Store leftover", "kstore", "book", "appstore", "Whispernet store leftover.", "checks"),
    ("netflix", "Netflix leftover", "nf-watch", "queue", "stream", "DVD primary. Electronic-delivery seed.", "checks"),
    ("opensocial", "OpenSocial leftover", "os", "gadget", "fb", "1 Nov leftover. Not Facebook gold.", "checks"),
    ("qik", "Qik leftover", "qik", "live", "ig", "Mobile live leftover.", "query"),
    ("rickroll", "Rickroll leftover", "rick", "link", "meme", "May 2007 seed. Mass 2008.", "checks"),
    ("tumblr", "Tumblr leftover", "tumble", "post", "appstore", "Feb birthmark. ILS launched. 3×.", "query"),
    ("ustream", "Ustream leftover", "ustream", "live", "twitch", "Live leftover.", "query"),
    ("wikipedia", "Wikipedia leftover", "wk-07", "cite", "ai", "Continuity leftover.", "hops"),
    ("yahoo", "Yahoo leftover", "yh-07", "dir", "google", "Still mass leftover.", "hops"),
    ("beacon", "Beacon leftover trap", "beacon", "note", "share", "6 Nov trap. Never gold.", "hops"),
    ("halo3", "Halo 3 leftover", "halo3", "boot", "appstore", "25 Sep culture leftover.", "hops"),
    ("portal", "Portal leftover", "portal", "cake", "appstore", "9 Oct leftover. Not year game.", "hops"),
    ("bloons", "Bloons leftover", "bloons", "pop", "appstore", "27 Mar / BTD 16 Aug leftover.", "hops"),
    ("dtd", "Desktop Tower Defense leftover", "dtd", "wave", "appstore", "3 Mar leftover.", "hops"),
    ("impossiblequiz", "Impossible Quiz leftover", "iqz", "play", "appstore", "20 Feb leftover.", "hops"),
    ("ie7", "IE7 leftover", "ie7", "dl", "chrome", "18 Oct 2006 leftover into 2007 shell.", "checks"),
    ("firefox", "Firefox leftover", "fx", "dl", "chrome", "Firefox 2 leftover. Not Chrome.", "checks"),
    ("reddit", "Reddit leftover", "reddit", "boost", "awards", "Under Digg leftover.", "hops"),
    ("flickr", "Flickr leftover", "flickr", "stream", "ig", "Yahoo residual leftover.", "hops"),
    ("delicious", "delicious leftover", "deli", "tag", "pin", "Yahoo residual leftover.", "query"),
    ("stumbleupon", "StumbleUpon leftover", "stu", "stumble", "ebay", "eBay May 2007 leftover owner.", "hops"),
    ("blogger", "Blogger leftover", "bgr", "post", "tw", "Google-owned leftover.", "hops"),
    ("wordpress", "WordPress leftover", "wp", "post", "wix", "Continuity leftover.", "hops"),
    ("techcrunch", "TechCrunch leftover", "tc", "post", "tiktok", "SXSW / iPhone desk leftover.", "query"),
    ("engadget", "Engadget leftover", "eng", "post", "appstore", "iPhone desk leftover.", "hops"),
    ("gizmodo", "Gizmodo leftover", "giz", "post", "appstore", "iPhone desk leftover.", "hops"),
    ("wired", "Wired leftover", "wired", "post", "tw", "Desk leftover.", "hops"),
    ("slashdot", "Slashdot leftover", "sd", "post", "reddit", "Continuity leftover.", "hops"),
    ("cnn", "CNN leftover", "cnn", "headline", "live", "YouTube debate leftover.", "hops"),
    ("bbc", "BBC leftover", "bbc", "headline", "live", "Mass news leftover.", "hops"),
    ("google", "Google search leftover", "google-q", "q", "chrome", "Search leftover. Not Chrome.", "query"),
    ("aol", "AOL leftover", "aol", "screen", "gmail", "Screen name leftover.", "hops"),
    ("msn", "MSN leftover", "msn", "portal", "bing", "Portal leftover.", "hops"),
    ("ask", "Ask leftover", "ask", "ask", "google", "Ask leftover.", "query"),
    ("ebay", "eBay leftover", "ebay", "bid", "paypal", "Bid leftover.", "hops"),
    ("paypal", "PayPal leftover", "pp", "pay", "checkout", "Pay leftover.", "hops"),
    ("craigslist", "Craigslist leftover", "cl", "local", "app", "Local leftover.", "hops"),
    ("imdb", "IMDb leftover", "imdb", "title", "hulu", "Title leftover.", "query"),
    ("linkedin", "LinkedIn leftover", "li", "invite", "fb", "Invite leftover.", "query"),
    ("orkut", "Orkut leftover", "orkut", "scrap", "fb", "Google social leftover.", "hops"),
    ("friendster", "Friendster leftover", "fs", "testimonial", "fb", "Residual leftover.", "hops"),
    ("bebo", "Bebo leftover", "bebo", "profile", "fb", "Social leftover.", "query"),
    ("hi5", "hi5 leftover", "hi5", "profile", "fb", "Social leftover.", "hops"),
    ("clubpenguin", "Club Penguin leftover", "cp", "igloo", "disney", "Disney 1 Aug 2007 leftover owner.", "hops"),
    ("webkinz", "Webkinz leftover", "webkinz", "pet", "app", "Zeitgeist leftover.", "hops"),
    ("secondlife", "Second Life leftover", "sl", "rez", "meta", "Zeitgeist leftover.", "hops"),
    ("dailymotion", "DailyMotion leftover", "dm", "watch", "yt", "Zeitgeist leftover.", "hops"),
    ("vimeo", "Vimeo leftover", "vimeo", "watch", "yt", "Not YouTube leftover.", "hops"),
    ("pandora", "Pandora leftover", "pandora", "station", "spotify", "Genome leftover.", "query"),
    ("lastfm", "Last.fm leftover", "lastfm", "scrobble", "spotify", "Scrobble leftover.", "query"),
    ("itunes", "iTunes leftover", "itunes", "pod", "appstore", "Music/video leftover. No App Store.", "hops"),
    ("skype", "Skype leftover", "skype", "call", "zoom", "Call leftover.", "hops"),
    ("aim", "AIM leftover", "aim", "im", "imessage", "Continuity leftover.", "hops"),
    ("msnmessenger", "WLM leftover", "wlm", "im", "teams", "Windows Live Messenger leftover.", "hops"),
    ("icq", "ICQ leftover", "icq", "im", "whatsapp", "Continuity leftover.", "hops"),
    ("meebo", "Meebo leftover", "meebo", "im", "slack", "Browser IM leftover.", "hops"),
    ("photobucket", "Photobucket leftover", "pb", "host", "ig", "Host leftover.", "hops"),
    ("imageshack", "ImageShack leftover", "ish", "host", "imgur", "Host leftover.", "hops"),
    ("tinypic", "TinyPic leftover", "tp", "host", "imgur", "Host leftover.", "hops"),
    ("geocities", "GeoCities leftover", "geo", "hood", "fb", "Neighborhood leftover.", "hops"),
    ("dmoz", "DMOZ leftover", "dmoz", "cat", "google", "Directory leftover.", "hops"),
    ("wayback", "Wayback leftover", "wa", "capture", "live", "archive.org leftover.", "hops"),
    ("adsense", "AdSense leftover", "adsense", "ad", "ads", "Ads leftover.", "hops"),
    ("analytics", "Analytics leftover", "ga", "hit", "ga4", "Analytics leftover.", "hops"),
    ("docs", "Docs leftover", "docs", "type", "drive", "Docs leftover. Drive 2012 BAN.", "query"),
    ("calendar", "Calendar leftover", "gcal", "event", "iphone", "Calendar leftover.", "query"),
    ("reader", "Reader leftover", "reader", "mark", "feedly", "Reader leftover.", "hops"),
    ("aws", "S3 leftover", "s3", "put", "drive", "S3 leftover.", "hops"),
    ("ec2", "EC2 leftover", "ec2", "boot", "ga", "EC2 leftover.", "hops"),
    ("slideshare", "SlideShare leftover", "slides", "title", "prezi", "Slides leftover.", "query"),
    ("newsvine", "Newsvine leftover", "nvine", "seed", "digg", "Seed leftover.", "query"),
    ("diggv4", "Digg leftover two", "digg2", "digg", "v4", "Not v4 2010.", "hops"),
    ("woot", "Woot leftover", "woot", "deal", "app", "Deal leftover.", "hops"),
    ("lifehacker", "Lifehacker leftover", "lh", "tip", "app", "Tip leftover.", "hops"),
    ("mashable", "Mashable leftover", "mash", "post", "tiktok", "Cashmore leftover.", "query"),
    ("boingboing", "Boing Boing leftover", "bb", "post", "tw", "A-list leftover.", "hops"),
    ("metafilter", "MetaFilter leftover", "mefi", "post", "reddit", "Community leftover.", "hops"),
    ("fark", "Fark leftover", "fark", "link", "reddit", "Link leftover.", "hops"),
    ("collegehumor", "CollegeHumor leftover", "ch", "clip", "yt", "Clip leftover.", "hops"),
    ("break", "Break leftover", "break", "clip", "yt", "Clip leftover.", "hops"),
    ("ebaumsworld", "eBaum leftover", "ebaum", "clip", "yt", "Clip leftover.", "hops"),
    ("addictinggames", "AddictingGames leftover", "agames", "play", "appstore", "Flash leftover.", "hops"),
    ("newgrounds", "Newgrounds leftover", "ng", "flash", "swf", "Flash leftover. No ripped SWF.", "hops"),
    ("miniclip", "Miniclip leftover", "mini", "play", "appstore", "Flash leftover.", "hops"),
    ("kongregate", "Kongregate leftover", "kong", "play", "appstore", "Portal leftover.", "hops"),
    ("steam", "Steam leftover", "steam", "lib", "epic", "Valve leftover.", "hops"),
    ("wow", "WoW leftover", "wow", "quest", "tbc", "TBC leftover (16 Jan).", "hops"),
    ("xbox360", "Xbox 360 leftover", "x360", "live", "appstore", "Console leftover.", "hops"),
    ("ps3", "PS3 leftover", "ps3", "boot", "appstore", "Console leftover.", "hops"),
    ("wii", "Wii leftover", "wii", "swing", "appstore", "Wii leftover.", "hops"),
    ("apple", "Apple leftover", "apple", "ipod", "appstore", "iPod leftover. iPhone is the star dest.", "hops"),
    ("microsoft", "Microsoft leftover", "msft", "xp", "aero", "XP mass. Vista is leftover dest.", "hops"),
    ("weather", "Weather leftover", "wx", "zip", "app", "Weather leftover.", "hops"),
    ("walmart", "Walmart leftover", "wm", "cart", "prime", "Retail leftover.", "hops"),
    ("kayak", "Kayak leftover", "kayak", "flight", "app", "Travel leftover.", "hops"),
    ("yelp", "Yelp leftover", "yelp", "review", "app", "Review leftover.", "hops"),
    ("basecamp", "Basecamp leftover", "bcamp", "proj", "asana", "Project leftover.", "hops"),
    ("yousendit", "YouSendIt leftover", "ysi", "send", "dropbox", "Send leftover. Dropbox 2008.", "hops"),
    ("dropbox", "Dropbox leftover note", "dbx", "note", "s3", "Dropbox is 2008 BAN as dest gold.", "hops"),
    ("gaia", "Gaia leftover", "gaia", "avatar", "app", "Avatar leftover.", "hops"),
    ("habbo", "Habbo leftover", "habbo", "room", "app", "Hotel leftover.", "hops"),
    ("neopets", "Neopets leftover", "neo", "pet", "app", "Pet leftover.", "hops"),
    ("runescape", "RuneScape leftover", "rs", "quest", "app", "MMORPG leftover.", "hops"),
    ("deviantart", "DeviantArt leftover", "da", "art", "ig", "Art leftover.", "hops"),
    ("ytmnd", "YTMND leftover", "ytmnd", "site", "meme", "Meme leftover.", "hops"),
    ("homestarrunner", "Homestar leftover", "hsr", "toon", "yt", "Toon leftover.", "hops"),
    ("mtv", "MTV leftover", "mtv", "video", "yt", "Video leftover.", "hops"),
    ("encarta", "Encarta leftover", "encarta", "lookup", "wiki", "Lookup leftover.", "query"),
    ("windowslive", "Windows Live leftover", "wlive", "home", "chrome", "Live leftover.", "hops"),
    ("livesearch", "Live Search leftover", "liveq", "q", "bing", "Live Search leftover.", "query"),
    ("virtualearth", "Virtual Earth leftover", "vearth", "map", "sv", "Not Street View gold.", "hops"),
    ("officelive", "Office Live leftover", "olife", "doc", "365", "Office Live leftover.", "hops"),
    ("igoogle", "iGoogle leftover", "igoogle", "gadget", "chrome", "Gadgets leftover.", "hops"),
    ("netvibes", "Netvibes leftover", "nvibes", "mod", "chrome", "Start page leftover.", "hops"),
    ("zoho", "Zoho leftover", "zoho", "type", "drive", "Docs rival leftover.", "query"),
    ("upcoming", "Upcoming leftover", "upc", "event", "fb", "Events leftover.", "hops"),
    ("eventful", "Eventful leftover", "evful", "event", "fb", "Events leftover.", "hops"),
    ("librarything", "LibraryThing leftover", "lthing", "book", "kindle", "Books leftover.", "hops"),
    ("ning", "Ning leftover", "ning", "net", "fb", "Social leftover.", "hops"),
    ("veoh", "Veoh leftover", "veoh", "watch", "yt", "Video leftover.", "hops"),
    ("metacafe", "Metacafe leftover", "mc", "watch", "yt", "Clips leftover.", "hops"),
    ("revver", "Revver leftover", "revver", "watch", "yt", "Video leftover.", "hops"),
    ("ifilm", "iFilm leftover", "ifilm", "watch", "yt", "Video leftover.", "hops"),
    ("yahoovideo", "Yahoo Video leftover", "yvid", "watch", "yt", "Video leftover.", "hops"),
    ("tagged", "Tagged leftover", "tagged", "tag", "fb", "Social leftover.", "hops"),
    ("piczo", "Piczo leftover", "piczo", "page", "fb", "Page leftover.", "hops"),
    ("xanga", "Xanga leftover", "xanga", "blog", "tumblr", "Blog leftover.", "hops"),
    ("livejournal", "LiveJournal leftover", "lj", "post", "tumblr", "Continuity leftover.", "hops"),
    ("typepad", "TypePad leftover", "typepad", "post", "wp", "Blog leftover.", "hops"),
    ("feedburner", "FeedBurner leftover", "fburn", "feed", "google", "Google Jun 2007 leftover owner.", "hops"),
    ("bloglines", "Bloglines leftover", "bl", "sub", "feedly", "Subscribe leftover.", "hops"),
    ("technorati", "Technorati leftover", "techno", "cosmos", "tw", "Cosmos leftover.", "query"),
    ("programmableweb", "ProgrammableWeb leftover", "pw", "api", "aws", "API leftover.", "query"),
    ("greasemonkey", "Greasemonkey leftover", "gm", "script", "ext", "Userscript leftover.", "hops"),
    ("rails", "Rails leftover", "rails", "app", "node", "Rails leftover.", "hops"),
    ("joomla", "Joomla leftover", "joomla", "cms", "wp", "CMS leftover.", "hops"),
    ("phpbb", "phpBB leftover", "phpbb", "post", "reddit", "Forum leftover.", "hops"),
    ("vbulletin", "vBulletin leftover", "vb", "post", "reddit", "Forum leftover.", "hops"),
    ("akismet", "Akismet leftover", "akismet", "spam", "captcha", "Spam leftover.", "hops"),
    ("mturk", "MTurk leftover", "mturk", "hit", "ai", "Mechanical Turk leftover.", "hops"),
    ("checkout", "Google Checkout leftover", "gco", "pay", "paypal", "Checkout leftover.", "hops"),
    ("doubleclick", "DoubleClick leftover", "dc", "ad", "ads", "Google Apr $3.1B leftover note.", "hops"),
    ("aquantive", "aQuantive leftover", "aq", "ad", "ads", "Microsoft May $6B leftover note.", "hops"),
    ("badoo", "Badoo leftover", "badoo", "profile", "fb", "Zeitgeist leftover. Not dest gold.", "hops"),
    ("ebuddy", "eBuddy leftover", "ebuddy", "im", "whatsapp", "Zeitgeist leftover.", "hops"),
    ("barcamp", "BarCamp leftover", "barcamp", "session", "tw", "Unconference leftover.", "hops"),
    ("web20conference", "Web 2.0 leftover", "w20", "talk", "tw", "Conference leftover.", "hops"),
    ("zune", "Zune leftover", "zune", "note", "ipod", "Zune leftover.", "hops"),
    ("housingmaps", "HousingMaps leftover", "hm", "pin", "zillow", "Mashup leftover.", "hops"),
    ("googleearth", "Google Earth leftover", "earth", "tilt", "sv", "Not Street View gold.", "hops"),
    ("googletalk", "Google Talk leftover", "gtalk", "chat", "hangouts", "Talk leftover.", "hops"),
    ("googlepack", "Google Pack leftover", "gpack", "pack", "chrome", "Pack leftover.", "hops"),
    ("flock", "Flock leftover", "flock", "beta", "chrome", "Not Chrome.", "checks"),
    ("wikileaks", "WikiLeaks leftover", "wl", "note", "cable", "Not Cablegate.", "hops"),
    ("time-you", "Time You leftover", "time", "you", "cover", "2006 leftover residual.", "hops"),
    ("unbox", "Unbox leftover", "unbox", "rent", "stream", "DVD leftover.", "hops"),
    ("wowhead", "Wowhead leftover", "wowhead", "item", "app", "TBC leftover.", "hops"),
    ("ign", "IGN leftover", "ign", "preview", "yt", "Games leftover.", "hops"),
    ("gamespot", "GameSpot leftover", "gamespot", "preview", "yt", "Games leftover.", "hops"),
    ("newegg", "Newegg leftover", "newegg", "cart", "prime", "Retail leftover.", "hops"),
    ("bestbuy", "Best Buy leftover", "bbuy", "cart", "prime", "Retail leftover.", "hops"),
    ("target", "Target leftover", "target", "cart", "prime", "Retail leftover.", "hops"),
    ("imemine", "imeem leftover", "imeem", "play", "spotify", "Music leftover.", "hops"),
    ("lastfmlite", "Audioscrobbler leftover", "ascr", "scrobble", "spotify", "Scrobble leftover.", "query"),
]


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def lo_panel(key: str, pick: str, trap: str, field: bool, next_href: str, next_label: str) -> str:
    field_html = f'<p><input data-lo-field placeholder="leftover {esc(key)}" maxlength="80"></p>' if field else ""
    return f"""
<section data-lo-panel="1" data-itt-year="2007" style="margin:12px auto;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em">
<p><b>Leftover machine</b> · not the chip · incomplete never writes · <code>itt07-{esc(key)}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> This is leftover, not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Trap / empty never writes.</label>
<p>
 <button type="button" data-lo-pick="{esc(pick)}">{esc(pick)} leftover</button>
 <button type="button" data-lo-trap>{esc(trap)} (trap)</button>
</p>
{field_html}
<p><button type="button" data-lo-save data-lo-key="{esc(key)}" data-lo-need-pick="{esc(pick)}">Save leftover</button>
 <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-{esc(key)}"><b>Next:</b> <a href="{esc(next_href)}">{esc(next_label)}</a></p>
</section>
"""


def x4(suffix: str, kind: str = "query") -> str:
    return f"""
<section class="itt-4x-panel" data-4x-panel data-4x-kind="{esc(kind)}" data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;font-family:Arial,sans-serif;font-size:13px;max-width:46em;background:#fff">
<h2 style="margin:0 0 8px;font-size:15px">2× leftover {esc(suffix)}</h2>
<p class="honest" style="margin:0 0 8px;font-size:12px">2007 leftover · incomplete never writes · not the chip.</p>
<p><label>Type<br><input type="text" data-4x-field maxlength="80" autocomplete="off" placeholder="leftover"></label></p>
<p><button type="button" data-4x-go="{esc(suffix)}">Save leftover {esc(suffix)}</button> <span data-4x-status></span></p>
<p hidden data-4x-result class="itt-4x-result"></p>
<p hidden data-next-flow data-next-when-key="itt07-{esc(suffix)}"><b>Next:</b> <a href="/years/2007/sites/iphone/index.html">★ iPhone Safari</a></p>
</section>
"""


def also3x() -> str:
    return """
<nav class="itt-3x-also" data-itt-3x-also data-itt-year="2007" style="margin:12px 0;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;max-width:52em"><b>Also this year · 3×</b>
<p><a href="../../pages/home.html">Starting Point</a> ·
<a href="../tumblr/index.html">Tumblr</a> ·
<a href="../kindle/index.html">Kindle</a> ·
<a href="../hulu/index.html">Hulu</a> ·
<a href="../iphone/index.html">iPhone Safari</a></p></nav>
"""


def page(title: str, body: str, official: str = "") -> str:
    off = f' data-official-key="{official}"' if official else ""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2007"{off}>
<head>
<meta charset="utf-8">
<title>{esc(title)}</title>
<link rel="stylesheet" href="../../../../css/period-2007.css">
</head>
<body bgcolor="#ffffff" link="#0000cc" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="../../../../js/immersion-2007.js" defer></script>
</body>
</html>
"""


def dest_body(title: str, thesis: str, slug: str, lo: str, extra: str = "") -> str:
    depth = slug.count("/")
    home = "../" * (depth + 2) + "pages/home.html"
    return f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p><a href="{home}">Starting Point</a> · <a href="index.html">{esc(title)}</a></p>
<p class="itt-pixel-failed">[failed-final] 2007 leftover costume · no invented brand pixel</p>
<h1>{esc(title)}</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px"><b>Honesty:</b> {esc(thesis)} Incomplete never writes. Star stays iPhone Safari. No App Store.</p>
<p>Period leftover room. XP + IE7. Desktop still mass.</p>
{lo}
{also3x()}
{extra}
</div>
"""


def build_pages() -> None:
    write(
        Y / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 7.0 — 2007</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2007");</script>
<script src="../../js/lib/util.js?v=20260831ui"></script>
<script src="../../js/browser-core.js?v=20260831ui"></script>
<script src="../../js/config/2007.js?v=20260831ui"></script>
<script src="../../js/browser-2007.js?v=20260831ui"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2007</title>
<link rel="stylesheet" href="../../../css/period-2007.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#3a6ea5">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2007");</script>
<script src="../../../js/immersion-2007.js" defer></script>
<div style="margin:12px;padding:10px;border:1px solid #333;background:#fff;font-family:Arial,sans-serif;font-size:12px;max-width:54em">
<p><b>2007 tour:</b> Phone as a real browser (iPhone Safari) · Gmail open · Street View · Platform leftover. ILS June websites <b>121,892,559</b>.</p>
<p><b>Hard bans:</b> App Store · Chrome · iPhone 3G · Android phones · Hulu public · Netflix streaming-first.</p>
<p><a href="../sites/tumblr/index.html">Tumblr</a> · <a href="../sites/kindle/index.html">Kindle</a> · <a href="../sites/hulu/index.html">Hulu</a></p>
</div>
<nav class="itt-3x-links" data-itt-3x-links data-itt-year="2007" style="margin:12px;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:11px;max-width:54em">
<b>More rooms this year · 3×</b>
<p>
<a href="../sites/iphone/index.html">iPhone Safari</a> ·
<a href="../sites/gmail/index.html">Gmail open</a> ·
<a href="../sites/maps/index.html">Street View</a> ·
<a href="../sites/facebook/index.html">Platform</a> ·
<a href="../sites/twitter/index.html">Twitter SXSW</a> ·
<a href="../sites/youtube/index.html">YouTube</a> ·
<a href="../sites/myspace/index.html">MySpace</a> ·
<a href="../sites/digg/index.html">Digg</a> ·
<a href="../sites/vista/index.html">Vista</a> ·
<a href="../sites/playable/game.html">Peg Walk</a> ·
<a href="../sites/tumblr/index.html">Tumblr</a> ·
<a href="../sites/kindle/index.html">Kindle</a> ·
<a href="../sites/hulu/index.html">Hulu</a>
</p>
</nav>
</body>
</html>
""",
    )
    write(
        Y / "pages/about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>About the Web in 2007</title>
<link rel="stylesheet" href="../../../css/period-2007.css">
</head>
<body bgcolor="#ffffff">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:680px;margin:16px auto;font-family:Verdana,Arial,sans-serif;font-size:13px;line-height:1.45">
<h1>About 2007</h1>
<p><b>★ One-thing:</b> capacity + Use Safari on the <a href="../sites/iphone/index.html">iPhone</a> (<code>itt07-iphone</code>). No App Store.</p>
<p><b>2007 is the year the phone becomes a real web browser you carry — while most people still live on the desktop Web 2.0 stack.</b></p>
<p style="background:#fff8dc;border:1px solid #cc0;padding:8px;font-size:12px">
<b>Scale (do not blend):</b>
ILS June websites <b>121,892,559</b> · +43% · <b>11.3</b> users/site · launched <b>Tumblr</b> ·
ILS users <b>1,373,327,790</b>.
Netcraft June hostnames <b>122,000,635</b> (not ILS).
Netcraft Dec <b>155,230,051</b> (December hostnames — not June websites).
</p>
<p style="background:#f5f5ff;border:1px solid #99c;padding:8px;font-size:12px">
<b>Mass ranks (do not blend):</b>
NYT 25 May Facebook <b>24M</b> vs MySpace <b>67M</b>.
June uniques MySpace <b>114.147M</b> vs Facebook <b>52.167M</b> — a different snapshot.
Zeitgeist fastest rising #1 <b>iphone</b>.
XP still mass (~82% mid-year). Vista retail 30 Jan is leftover, not the shell.
</p>
<p><b>Star calendar:</b> 9 Jan Macworld announce · Safari · Cingular · $499 4GB / $599 8GB · ships US <b>29 Jun</b> 6:00 p.m. local. No MMS. No paste. Web apps only. App Store is <b>10 Jul 2008 BAN</b>.</p>
<p><b>Open web:</b> Gmail open <b>14 Feb</b> · Street View <b>29 May</b> · Platform <b>24 May</b> · Beacon <b>6 Nov trap</b> · Twitter SXSW Mar leftover · YouTube Google-owned all year (close 13 Nov 2006).</p>
<h2>Bans (never 2007 default)</h2>
<p>App Store · Chrome · iPhone 3G · Android phones / G1 · Gmail invite-only as the year story · campus-only Facebook · Netflix streaming-first · Hulu public · modern iOS / X / Reels.</p>
<p><a href="home.html">Starting Point</a> · <a href="map.html">Year flow map</a></p>
</div>
<script src="../../../js/immersion-2007.js" defer></script>
</body>
</html>
""",
    )
    write(
        Y / "pages/map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2007">
<head>
<meta charset="utf-8">
<title>2007 — UX flow map</title>
<link rel="stylesheet" href="../../../css/period-2007.css">
<link rel="stylesheet" href="../../../css/flow-map.css">
<script src="../../../js/config/flow-maps.js"></script>
<script src="../../../js/config/flow-maps-popular-3x.js"></script>
<script src="../../../js/config/flow-maps-3x.js"></script>
<script src="../../../js/config/flow-maps-5x-atlas.js"></script>
</head>
<body class="itt-map-page" bgcolor="#3a6ea5">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-map-window">
<div class="itt-map-bar"><b>2007 · UX flow map</b> · <a href="home.html">Start</a> · <a href="about.html">About</a></div>
<div data-itt-flow-map></div>
</div>
<script src="../../../js/immersion-2007.js"></script>
<p style="font-size:12px"><b>★ Star:</b> <a href="../sites/iphone/index.html">iPhone Safari</a>
· 9 Jan announce · 29 Jun ship · no App Store
· ILS June websites 121,892,559 (not Netcraft Dec hostnames)
· Gmail open 14 Feb · Street View 29 May · Platform 24 May</p>
</body>
</html>
""",
    )
    for name, title in (("whats-new.html", "What's New — 2007"), ("cool.html", "What's Cool — 2007")):
        write(
            Y / "pages" / name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2007"><head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="../../../css/period-2007.css"></head>
<body bgcolor="#ffffff"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<h1>{title}</h1>
<p>iPhone Safari · Gmail open · Street View · Platform. No App Store. No Chrome.</p>
<p><a href="home.html">Starting Point</a></p></div>
<script src="../../../js/immersion-2007.js" defer></script></body></html>
""",
        )
    for name, title in (("404.html", "404 — 2007"), ("unreachable.html", "Unreachable — 2007")):
        write(
            Y / "pages/error" / name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2007"><head><meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2007.css"></head>
<body bgcolor="#ffffff"><div style="max-width:46em;margin:16px auto;font-family:Arial,sans-serif">
<h1>{title}</h1><p>That path is not in the 2007 exhibit.</p>
<p><a href="../home.html">Starting Point</a></p></div>
<script src="../../../../js/immersion-2007.js" defer></script></body></html>
""",
        )


def build_official() -> None:
    write(
        Y / "sites/iphone/index.html",
        page(
            "iPhone — Safari — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a> · <a href="specs.html">specs</a></p>
<p class="itt-pixel-failed">[failed-final] iPhone 2007 · no invented Apple pixel</p>
<h1>iPhone · Use Safari</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">
<b>9 Jan</b> Macworld · three products in one · multi-touch · Safari over Wi-Fi or EDGE.
Cingular exclusive · <b>$499 4GB / $599 8GB</b> · ships US <b>29 Jun</b> 6:00 p.m. local.
No MMS. No cut/copy/paste. Third-party = bookmarked Web 2.0 apps.
<b>App Store is 10 Jul 2008 BAN.</b>
</p>
<p>
<button type="button" data-ip07-store>Open App Store (trap)</button>
<button type="button" data-official-trap>Chrome (trap)</button>
</p>
<p><label><input type="checkbox" data-ip07-req> 9 Jan announce · Safari is the browser · no native app grid.</label></p>
<p><label><input type="checkbox" data-ip07-req> App Store / 3G / Android phones never write.</label></p>
<p>
<label><input type="radio" name="cap" data-ip07-cap value="4"> 4GB $499</label>
<label><input type="radio" name="cap" data-ip07-cap value="8"> 8GB $599</label>
</p>
<p><button type="button" data-ip07-safari>Use Safari</button> <span data-ip07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-iphone"><b>Next:</b> <a href="../gmail/index.html">Gmail open</a></p>
{lo_panel("iphone", "safari", "store", False, "../gmail/index.html", "Gmail open")}
{x4("saf-ack", "checks")}
</div>
""",
            "itt07-iphone",
        ),
    )
    write(
        Y / "sites/iphone/specs.html",
        page(
            "iPhone specs leftover — 2007",
            dest_body(
                "iPhone specs leftover",
                "4GB/8GB · EDGE + Wi-Fi · 2MP. Not 3G.",
                "iphone/specs",
                lo_panel("iphone-specs", "specs", "3g", False, "index.html", "iPhone Safari"),
                x4("iphone-specs", "checks") + x4("iphone-d2") + x4("saf-ack-d2"),
            ),
        ),
    )
    write(
        Y / "sites/gmail/index.html",
        page(
            "Gmail open — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] Gmail 2007 · no invented brand pixel</p>
<h1>Gmail sign-ups are now open worldwide</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">
<b>14 Feb</b> David Murray: “No more waiting for someone to invite you—just create an account directly at www.gmail.com.”
Invite CTA is the trap.
</p>
<p><button type="button" data-gm07-invite>Get an invite (trap)</button></p>
<p><label><input type="checkbox" data-gm07-req> 14 Feb 2007 · open worldwide.</label></p>
<p><label><input type="checkbox" data-gm07-req> Invite-only is the trap. Incomplete never writes.</label></p>
<p><label>Handle<br><input data-gm07-handle maxlength="40" placeholder="museum"></label></p>
<p><button type="button" data-gm07-open>Create account</button> <span data-gm07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-gmail"><b>Next:</b> <a href="../maps/index.html">Street View</a></p>
{lo_panel("gmail", "open", "invite", True, "../maps/index.html", "Street View")}
{x4("gmail-open")}{x4("gmail-open-d2")}
</div>
""",
            "itt07-gmail",
        ),
    )
    write(
        Y / "sites/maps/index.html",
        page(
            "Street View — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] Street View 2007 · no invented tiles / pegman art</p>
<h1>Introducing Street View</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">
Lat Long <b>29 May 2007</b> 10:11. Peg two launch cities. One city never writes. Wiki 25 May has no first-party cite — keep 29 May.
</p>
<p>
<button type="button" data-sv07-city="sf">San Francisco</button>
<button type="button" data-sv07-city="nyc">New York</button>
</p>
<p><button type="button" data-sv07-peg>Peg Street View</button> <span data-sv07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-streetview"><b>Next:</b> <a href="../facebook/index.html">Platform</a></p>
{lo_panel("streetview", "sf", "pegman", False, "../facebook/index.html", "Platform")}
{x4("sv", "hops")}{x4("maps-d2")}
</div>
""",
            "itt07-streetview",
        ),
    )
    write(
        Y / "sites/facebook/index.html",
        page(
            "Facebook Platform — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Tahoma,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] Platform 2007 · no invented f</p>
<h1>Facebook Platform / F8</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">
<b>24 May</b> F8. Campus-only ended 26 Sep 2006. NYT 25 May 24M vs MySpace 67M — do not blend with June 52M / 114M.
<b>Beacon 6 Nov is the trap.</b>
</p>
<p><button type="button" data-fb07-beacon>Share with Beacon (trap)</button></p>
<p>
<button type="button" data-fb07-app="poke">Poke app</button>
<button type="button" data-fb07-app="quiz">Quiz app</button>
</p>
<p><button type="button" data-fb07-add>Add two apps</button> <span data-fb07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-fb-platform"><b>Next:</b> <a href="../twitter/index.html">Twitter SXSW</a></p>
{lo_panel("fb-platform", "f8", "beacon", False, "../twitter/index.html", "Twitter SXSW")}
{x4("fb-app")}{x4("fb-app-d2")}
</div>
""",
            "itt07-fb-platform",
        ),
    )
    write(
        Y / "sites/twitter/index.html",
        page(
            "Twitter SXSW leftover — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] Twttr 2007 leftover · no invented bird</p>
<h1>twitter · SXSW leftover</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">
Mar 2007 SXSW breakout. Born 2006. Not the 2006 star rewrite. 140 leftover. 280 / For You / X never write.
</p>
<p><button type="button" data-tw07-trap>280 / For You (trap)</button></p>
<p><label><input type="checkbox" data-tw07-req> SXSW leftover · not the 2006 gold rewrite.</label></p>
<p><textarea data-tw07-body maxlength="140" rows="3" cols="48" placeholder="What are you doing?"></textarea> <span data-tw07-count>140</span></p>
<p><button type="button" data-tw07-post>update</button> <span data-tw07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-tweets"><b>Next:</b> <a href="../youtube/index.html">YouTube</a></p>
{lo_panel("tweets", "140", "280", True, "../youtube/index.html", "YouTube")}
{x4("t-sxsw")}{x4("twitter-d2")}
</div>
""",
            "itt07-tweets",
        ),
    )
    write(
        Y / "sites/youtube/index.html",
        page(
            "YouTube leftover — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] YouTube 2007 · no invented play-button</p>
<h1>YouTube leftover</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">Google-owned all year (close 13 Nov 2006). Flash. Not the 2005 gold rewrite.</p>
<p><button type="button" data-yt07-trap>HTML5 / Shorts (trap)</button></p>
<p><label><input type="checkbox" data-yt07-req> Google-owned leftover. Incomplete never writes.</label></p>
<p><button type="button" data-yt07-go>Watch leftover</button> <span data-yt07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-yt"><b>Next:</b> <a href="../myspace/index.html">MySpace</a></p>
{lo_panel("yt", "watch", "shorts", False, "../myspace/index.html", "MySpace")}
{x4("youtube")}{x4("youtube-d2")}
</div>
""",
            "itt07-yt",
        ),
    )
    write(
        Y / "sites/myspace/index.html",
        page(
            "MySpace leftover — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] MySpace 2007 · no invented brand pixel</p>
<h1>MySpace leftover</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">Still larger mid-year. June uniques 114.147M vs Facebook 52.167M. Do not blend with NYT May 67M / 24M.</p>
<p><button type="button" data-ms07-trap>Timeline (trap)</button></p>
<p><label><input type="checkbox" data-ms07-req> Still mass leftover. Incomplete never writes.</label></p>
<p><button type="button" data-ms07-go>Open profile leftover</button> <span data-ms07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-myspace"><b>Next:</b> <a href="../digg/index.html">Digg</a></p>
{lo_panel("myspace", "mass", "timeline", False, "../digg/index.html", "Digg")}
{x4("myspace-d2")}{x4("myspace-d3")}
</div>
""",
            "itt07-myspace",
        ),
    )
    write(
        Y / "sites/digg/index.html",
        page(
            "Digg leftover — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] Digg 2007 · no invented brand pixel</p>
<h1>Digg leftover</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">Peak leftover. v4 is 2010 BAN.</p>
<p><button type="button" data-dg07-trap>v4 (trap)</button></p>
<p><label><input type="checkbox" data-dg07-req> Peak leftover. Incomplete never writes.</label></p>
<p><button type="button" data-dg07-go>Digg leftover</button> <span data-dg07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-digg"><b>Next:</b> <a href="../vista/index.html">Vista</a></p>
{lo_panel("digg", "digg", "v4", False, "../vista/index.html", "Vista")}
{x4("digg-d2")}{x4("digg-d3")}
</div>
""",
            "itt07-digg",
        ),
    )
    write(
        Y / "sites/vista/index.html",
        page(
            "Vista leftover — 2007",
            f"""
<div style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] Vista 2007 · no invented Aero art</p>
<h1>Windows Vista leftover</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">Consumer retail <b>30 Jan</b>. XP still mass (~82%). Aero is not the year shell.</p>
<p><button type="button" data-vi07-trap>Aero default (trap)</button></p>
<p><label><input type="checkbox" data-vi07-req> 30 Jan retail leftover. Shell stays XP+IE7.</label></p>
<p><button type="button" data-vi07-go>Note leftover</button> <span data-vi07-status></span></p>
<p hidden data-next-flow data-next-when-key="itt07-vista"><b>Next:</b> <a href="../playable/game.html">Peg Walk</a></p>
{lo_panel("vista", "retail", "aero", False, "../playable/game.html", "Peg Walk")}
{x4("vista-d2")}{x4("vista-d3")}
</div>
""",
            "itt07-vista",
        ),
    )
    write(
        Y / "sites/playable/game.html",
        page(
            "Peg Walk — 2007",
            f"""
<div class="itt-year-game yg-shell" data-year-game data-year="2007" data-game-id="peg" data-official-key="itt07-game-peg" data-yg-goal="Walk two hills.">
<p><a href="index.html">Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
<p class="itt-pixel-failed">[failed-final] museum original · no official art</p>
<h1>Peg Walk</h1>
<p style="background:#ffc;border:1px solid #cc0;padding:8px;font-size:12px">Museum original. New Game without two hills never writes. Not the star.</p>
<p>Score <b data-game-score>0</b></p>
<p>
<button type="button" data-game-start>New Game</button>
<button type="button" data-peg-city="a">Hill A</button>
<button type="button" data-peg-city="b">Hill B</button>
<button type="button" data-peg-trap>Unlock App Store (trap)</button>
</p>
<p data-itt-action-status>New Game, then two hills.</p>
<p hidden data-next-flow data-next-when-key="itt07-game-peg"><b>Next:</b> <a href="../iphone/index.html">iPhone Safari</a></p>
</div>
{lo_panel("playable-game", "go", "trap", True, "../iphone/index.html", "iPhone Safari")}
{x4("playable-game")}{x4("playable-d8")}
""",
            "itt07-game-peg",
        ),
    )


def build_playable() -> None:
    extras = " · ".join(f'<a href="extra-{c}.html">extra-{c}</a>' for c in "abcdefghi")
    write(
        Y / "sites/playable/index.html",
        page(
            "Playables — 2007",
            f"""
<div data-year-playable style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<h1>2007 playables</h1>
<p>Year gold: Peg Walk. App Store never ships.</p>
</div>
<nav style="max-width:46em;margin:12px auto;font-family:Arial,sans-serif;font-size:13px">
<ul>
<li><a href="game.html">Peg Walk</a></li>
<li><a href="famous.html">Famous leftover</a></li>
<li><a href="more-a.html">more-a</a> · <a href="more-b.html">more-b</a></li>
<li>{extras}</li>
</ul>
</nav>
{lo_panel("playable", "go", "trap", True, "game.html", "Peg Walk")}
{x4("playable")}{x4("playable-d9")}
""",
        ),
    )
    for name, suffix in (
        ("famous.html", "famous"),
        ("more-a.html", "playable-d10"),
        ("more-b.html", "playable-d11"),
    ):
        write(
            Y / "sites/playable" / name,
            page(
                f"{name} — 2007",
                dest_body(name.replace(".html", " leftover"), "Cabinet leftover.", "playable/x", lo_panel(suffix, "go", "trap", True, "game.html", "Peg Walk"), x4(suffix) + (x4("playable-d7") if name == "famous.html" else "")),
            ),
        )
    letters = list("abcdefghi")
    dmap = {c: f"playable-d{i+2}" if i < 5 else f"playable-d{chr(ord('f')+i-5)}" for i, c in enumerate(letters)}
    # extra-a..e → playable-d2..d6 ; extra-f..i → playable-df..di plus playable-extra-*
    for i, c in enumerate(letters):
        suf = f"playable-extra-{c}"
        alt = {0: "playable-d2", 1: "playable-d3", 2: "playable-d4", 3: "playable-d5", 4: "playable-d6", 5: "playable-df", 6: "playable-dg", 7: "playable-dh", 8: "playable-di"}[i]
        write(
            Y / "sites/playable" / f"extra-{c}.html",
            page(
                f"extra-{c} — 2007",
                dest_body(f"extra-{c}", "Cabinet leftover.", "playable/x", lo_panel(suf, "go", "trap", True, "game.html", "Peg Walk"), x4(suf) + x4(alt)),
            ),
        )


def build_leftover() -> None:
    for slug, title, key, pick, trap, thesis, kind in LEFTOVER:
        out = Y / "sites" / slug / "index.html"
        extra = x4(key, kind)
        # extra 2x aliases used in matrix
        aliases = {
            "android": ["and-07-d2"],
            "amazon": ["az-07-d2"],
            "etsy": ["etsy-d2"],
            "friendfeed": ["ff-d2"],
            "hulu": ["hulu-ack-d2"],
            "justintv": ["justintv-d2"],
            "kindle": ["kindle-d2"],
            "kindlestore": ["kindlestor-d2"],
            "netflix": ["netflix-d2"],
            "opensocial": ["opensocial-d2"],
            "qik": ["qik-d2"],
            "rickroll": ["rickroll-d2"],
            "tumblr": ["tumblr-d2"],
            "ustream": ["ustream-d2"],
            "wikipedia": ["wk-07-d2"],
            "yahoo": ["yh-07-d2"],
        }
        for a in aliases.get(slug, []):
            extra += x4(a)
        write(out, page(f"{title} — 2007", dest_body(title, thesis, slug, lo_panel(key, pick, trap, True, "../../pages/map.html", "Year map"), extra)))
        write(
            Y / "sites" / slug / "about.html",
            page(
                f"About {title}",
                dest_body(f"About {title}", thesis, slug, lo_panel(key + "-ab", "go", "trap", True, "index.html", title), ""),
            ),
        )


def rebuild_urlmap() -> None:
    cfg = ROOT / "js" / "config" / "2007.js"
    text = cfg.read_text()
    htmls = sorted(p.relative_to(Y).as_posix() for p in Y.rglob("*.html") if p.name != "index.html" or "sites" in p.as_posix() or "pages" in p.as_posix())
    # include year index too
    htmls = sorted({p.relative_to(Y).as_posix() for p in Y.rglob("*.html")})
    entries = []
    for rel in htmls:
        if rel == "index.html":
            continue
        entries.append(f'      "{rel}": "http://museum.local/years/2007/{rel}"')
    block = "    urlMap: {\n" + ",\n".join(entries) + "\n    },"
    import re
    new, n = re.subn(r"    urlMap: \{.*?\n    \},", block, text, count=1, flags=re.S)
    if n != 1:
        raise SystemExit("urlMap replace failed")
    new = new.replace("Starting Internet Explorer 6.0...", "Starting Internet Explorer 7.0...")
    cfg.write_text(new)


def main() -> None:
    if Y.exists():
        # never checkout forest; we own this rebuild
        pass
    build_pages()
    build_official()
    build_playable()
    build_leftover()
    rebuild_urlmap()
    html = list(Y.rglob("*.html"))
    dests = [p for p in (Y / "sites").iterdir() if p.is_dir()]
    print("html", len(html), "dests", len(dests))


if __name__ == "__main__":
    main()
