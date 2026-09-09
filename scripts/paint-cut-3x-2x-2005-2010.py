#!/usr/bin/env python3
"""CUT-3X-2X-2005-2010 — leftover-3× second pack. No new dest folders."""
from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
MARK = "ITT-POP3X-2X"

# dest, pop_id, key, keep, trap, next, next_label, weather, tick, verb
DOORS = {
    "2005": [
        ("facebook", "facebook", "itt05-pop-facebook", "high-school Facebook leftover", "2004 dorm / News Feed 2006 as 2005 (trap)", "../lastfm/index.html", "Last.fm leftover",
         "Dest chrome is Thefacebook college leftover. 2× is Sep 2005 high school. NYT 16 Oct 2005. TC 7 Sep 85% of college. Not 2004 dorm gold. Not 2006 News Feed.",
         "High school is 2005 leftover weather. Dest chrome stays college leftover. News Feed is 2006. Never write itt05-yt-uploads.",
         "Open leftover 2005 Facebook"),
        ("lastfm", "lastfm", "itt05-pop-lastfm", "Last.fm merge leftover", "2007 CBS acquire as 2005 (trap)", "../reader/index.html", "Google Reader leftover",
         "Dest chrome is 2003 seed leftover. 2× is 9 Aug 2005 Audioscrobbler merges into Last.fm. CBS $280M is 2007.",
         "2003 seed is dest leftover. 2007 acquire is not 2005. Never write gold.",
         "Open leftover Last.fm"),
        ("reader", "reader", "itt05-pop-reader", "Google Reader leftover", "2013 Reader death as 2005 (trap)", "../analytics/index.html", "Analytics leftover",
         "7 Oct 2005 Google Reader at Web 2.0. Google press 7 Oct. TC 8 Oct. Death is 2013.",
         "2013 death is not 2005 gold.",
         "Open leftover Reader"),
        ("analytics", "analytics", "itt05-pop-analytics", "Google Analytics leftover", "Urchin paid as this gold (trap)", "../googleearth/index.html", "Earth leftover",
         "14 Nov 2005 Google Analytics free. Urchin acquire Mar 2005. Google press 14 Nov.",
         "Paid Urchin is not this dest. No live bill.",
         "Open leftover Analytics"),
        ("googleearth", "googleearth", "itt05-pop-googleearth", "Google Earth leftover", "Street View 2007 as 2005 (trap)", "../secondlife/index.html", "Second Life leftover",
         "28 Jun 2005 Google Earth (Keyhole). earth/ is leftover 999. Street View is 2007.",
         "Street View is 2007. Never write itt05-maps.",
         "Open leftover Earth"),
        ("secondlife", "secondlife", "itt05-pop-secondlife", "Second Life leftover", "Meta as 2005 (trap)", "../yelp/index.html", "Yelp leftover",
         "2005 Second Life leftover habit. Not a second year game.",
         "Not gold. Not Meta as 2005.",
         "Open leftover Second Life"),
        ("yelp", "yelp", "itt05-pop-yelp", "Yelp leftover", "2020 as 2005 (trap)", "../odeo/index.html", "Odeo leftover",
         "Yelp leftover 2005 reviews habit. Founded 2004.",
         "Not 2004 gold. Not 2020.",
         "Open leftover Yelp"),
        ("odeo", "pop3-odeo", "itt05-pop3-odeo", "Odeo leftover", "Twitter-as-this dest (trap)", "../linkedin/index.html", "LinkedIn leftover",
         "Odeo 2005 podcast leftover. Ev Williams. Twttr is 2006.",
         "Twitter is 2006. Never write itt06-tweets.",
         "Open leftover Odeo"),
        ("linkedin", "pop3-linkedin", "itt05-pop3-linkedin", "LinkedIn leftover", "2011 IPO / 2016 MS as 2005 (trap)", "../../pages/home.html", "Starting Point",
         "LinkedIn leftover 2005 professional network. IPO is 2011. MS acquire is 2016.",
         "2011 IPO is not 2005. Never write gold.",
         "Open leftover LinkedIn"),
    ],
    "2006": [
        ("wii", "wii", "itt06-pop-wii", "Wii 19 Nov leftover", "PS3 as this dest (trap)", "../time-you/index.html", "Time You leftover",
         "Wii North America 19 Nov 2006, $250, Wii Sports in the box.",
         "PS3 is not this dest. No live charge. Never write itt06-tweets.",
         "Open leftover Wii"),
        ("time-you", "time-you", "itt06-pop-time-you", "Time You leftover", "great-man cover as 2006 gold (trap)", "../skype/index.html", "Skype leftover",
         "Time Person of the Year 2006 is You. 25 Dec issue. Lev Grossman.",
         "Not a second star. Never write itt06-tweets / itt06-yt.",
         "Read leftover You cover"),
        ("skype", "skype", "itt06-pop-skype", "Skype leftover", "eBay 2005 acquire as 2006 gold (trap)", "../lastfm/index.html", "Last.fm leftover",
         "Skype leftover 2006 calls. eBay acquire is 12 Sep 2005 leftover weather.",
         "2005 acquire is not 2006 gold. No live call charge.",
         "Open leftover Skype"),
        ("lastfm", "lastfm", "itt06-pop-lastfm", "Last.fm leftover", "2005 merge as 2006 gold (trap)", "../secondlife/index.html", "Second Life leftover",
         "Last.fm leftover 2006 scrobble habit after the 2005 merge. CBS is 2007.",
         "2005 merge is the 2005 dest. 2007 CBS is not 2006.",
         "Open leftover Last.fm"),
        ("secondlife", "secondlife", "itt06-pop-secondlife", "Second Life leftover", "2020 as 2006 (trap)", "../blogger/index.html", "Blogger leftover",
         "Second Life leftover 2006 habit. Time You cover weather.",
         "Not gold.",
         "Open leftover Second Life"),
        ("blogger", "blogger", "itt06-pop-blogger", "Blogger leftover", "1999 gold as 2006 (trap)", "../wordpress/index.html", "WordPress leftover",
         "Blogger leftover 2006 Google blog habit.",
         "1999 is not 2006.",
         "Open leftover Blogger"),
        ("wordpress", "pop3-wordpress", "itt06-pop3-wordpress", "WordPress leftover", "2003 launch as 2006 gold (trap)", "../adsense/index.html", "AdSense leftover",
         "WordPress leftover 2006 personal publish.",
         "2003 is not 2006.",
         "Open leftover WordPress"),
        ("adsense", "pop3-adsense", "itt06-pop3-adsense", "AdSense leftover", "2003 launch as 2006 gold (trap)", "../flickr/index.html", "Flickr leftover",
         "AdSense leftover 2006 publisher habit.",
         "2003 is not 2006. No live bill.",
         "Open leftover AdSense"),
        ("flickr", "pop3-flickr", "itt06-pop3-flickr", "Flickr leftover", "Yahoo 2005 acquire as 2006 gold (trap)", "../../pages/home.html", "Starting Point",
         "Flickr leftover 2006 after Yahoo 20 Mar 2005 acquire.",
         "2005 acquire is not 2006 gold. Never write itt06-tweets.",
         "Open leftover Flickr"),
    ],
    "2007": [
        ("iptouch", "iptouch", "itt07-pop-iptouch", "iPod touch leftover", "iPhone as this dest (trap)", "../apltv/index.html", "Apple TV leftover",
         "5 Sep 2007 Apple unveils iPod touch. $299 / $399. Wi-Fi Safari. Star dest is iphone/.",
         "iPhone is the chip. Never write itt07-iphone.",
         "Open leftover touch"),
        ("apltv", "apltv", "itt07-pop-apltv", "Apple TV leftover", "Apple TV+ 2019 as 2007 (trap)", "../huluann/index.html", "Hulu announce leftover",
         "Apple TV 2007 leftover set-top. TV+ is 2019.",
         "TV+ is 2019. Never write itt07-iphone.",
         "Open leftover Apple TV"),
        ("huluann", "huluann", "itt07-pop-huluann", "Hulu announce leftover", "Hulu 2008 live as 2007 gold (trap)", "../gears/index.html", "Gears leftover",
         "Hulu announced 2007. Live dest is 2008 hulu/.",
         "2008 live is not 2007 gold. No live bill.",
         "Read leftover announce"),
        ("gears", "gears", "itt07-pop-gears", "Google Gears leftover", "Chrome 2008 as 2007 (trap)", "../halo3/index.html", "Halo 3 leftover",
         "Google Gears 2007 offline web leftover. Chrome is 2008 official.",
         "Chrome is 2008. Never write itt07-iphone.",
         "Open leftover Gears"),
        ("halo3", "halo3", "itt07-pop-halo3", "Halo 3 leftover", "Xbox as gold (trap)", "../stumble/index.html", "StumbleUpon leftover",
         "Halo 3 25 Sep 2007 leftover. Not the year game cabinet.",
         "Not gold. Not a second year game write.",
         "Open leftover Halo 3"),
        ("stumble", "stumble", "itt07-pop-stumble", "StumbleUpon leftover", "2020 as 2007 (trap)", "../ipann/index.html", "iPhone announce leftover",
         "StumbleUpon leftover 2007 discovery habit.",
         "Not gold.",
         "Open leftover Stumble"),
        ("ipann", "pop3-ipann", "itt07-pop3-ipann", "iPhone announce leftover", "App Store 2008 / ship dest as this (trap)", "../vista/index.html", "Vista leftover",
         "9 Jan 2007 iPhone announce leftover dest. Ship dest is the star.",
         "Never write itt07-iphone. App Store is 2008.",
         "Read leftover announce"),
        ("vista", "pop3-vista", "itt07-pop3-vista", "Vista leftover", "XP-as-gone / Win7 2009 as 2007 (trap)", "../gim/index.html", "Gmail IMAP leftover",
         "Vista leftover 2007. Mass shell is still XP + IE6.",
         "XP is not gone. Win7 is 2009. Never write itt07-ie6.",
         "Open leftover Vista"),
        ("gim", "pop3-gim", "itt07-pop3-gim", "Gmail IMAP leftover", "Gmail open as this dest (trap)", "../../pages/home.html", "Starting Point",
         "Gmail IMAP leftover 2007. Gmail open is official n=3.",
         "Never write itt07-gmail.",
         "Open leftover IMAP"),
    ],
    "2008": [
        ("airbnb", "airbnb", "itt08-pop-airbnb", "Airbnb leftover", "2020 IPO as 2008 (trap)", "../bitcoin/index.html", "Bitcoin leftover",
         "Airbnb 2008 leftover. Three airbeds. IPO is 2020.",
         "2020 IPO is not 2008. No live charge. Never write itt08-github.",
         "Open leftover Airbnb"),
        ("bitcoin", "bitcoin", "itt08-pop-bitcoin", "Bitcoin paper leftover", "2009 genesis as 2008 gold (trap)", "../duckduckgo/index.html", "DuckDuckGo leftover",
         "31 Oct 2008 Bitcoin P2P e-cash paper leftover. Genesis is 2009.",
         "2009 genesis is not 2008 gold. No live coin.",
         "Read leftover paper"),
        ("duckduckgo", "duckduckgo", "itt08-pop-duckduckgo", "DuckDuckGo leftover", "Google as this dest (trap)", "../groupon/index.html", "Groupon leftover",
         "DuckDuckGo 2008 leftover search. google.com is habit.",
         "Not gold.",
         "Search leftover"),
        ("groupon", "groupon", "itt08-pop-groupon", "Groupon leftover", "2010 $6B walk as 2008 gold (trap)", "../tweetdeck/index.html", "TweetDeck leftover",
         "Groupon 2008 leftover. 2010 Google walk is 2010 groupondeal/.",
         "2010 is not 2008. No live deal charge.",
         "Open leftover Groupon"),
        ("tweetdeck", "tweetdeck", "itt08-pop-tweetdeck", "TweetDeck leftover", "Twitter official as this dest (trap)", "../failwhale/index.html", "Fail Whale leftover",
         "TweetDeck 2008 leftover desktop. Twitter dest is official n=7.",
         "Never write itt08-tweets.",
         "Open leftover TweetDeck"),
        ("failwhale", "failwhale", "itt08-pop-failwhale", "Fail Whale leftover", "live outage (trap)", "../cuil/index.html", "Cuil leftover",
         "Fail Whale leftover 2008 Twitter scale literacy. Literacy only.",
         "No live outage. Never write itt08-tweets.",
         "Read leftover whale"),
        ("cuil", "pop3-cuil", "itt08-pop3-cuil", "Cuil leftover", "Google as this dest (trap)", "../bitly/index.html", "bit.ly leftover",
         "Cuil 28 Jul 2008 leftover search flop.",
         "google.com is habit. Never write gold.",
         "Search leftover Cuil"),
        ("bitly", "pop3-bitly", "itt08-pop3-bitly", "bit.ly leftover", "2020 as 2008 (trap)", "../spotify/index.html", "Spotify leftover",
         "bit.ly 2008 leftover short links.",
         "Not gold.",
         "Open leftover bit.ly"),
        ("spotify", "pop3-spotify", "itt08-pop3-spotify", "Spotify leftover", "Spotify US 2011 as 2008 (trap)", "../../pages/home.html", "Starting Point",
         "Spotify Europe 2008 leftover. spotifyeu/ is leftover 3× already. US is 2011.",
         "US is 2011. No live bill. Never write itt08-chrome.",
         "Open leftover Spotify"),
    ],
    "2009": [
        ("wolfram", "wolfram", "itt09-pop-wolfram", "Wolfram|Alpha leftover", "Google as this dest (trap)", "../angry/index.html", "Angry Birds leftover",
         "18 May 2009 Wolfram|Alpha official launch. Computational leftover.",
         "google.com is habit. Never write itt09-like.",
         "Ask leftover Alpha"),
        ("angry", "angry", "itt09-pop-angry", "Angry Birds leftover", "2010 smash as 2009 gold (trap)", "../gvoice/index.html", "Google Voice leftover",
         "9 Dec 2009 Angry Birds iOS leftover. Mass smash is 2010 dest angrybirds/.",
         "2010 smash is the 2010 dest. Never write itt09-game-plot.",
         "Open leftover Birds"),
        ("gvoice", "gvoice", "itt09-pop-gvoice", "Google Voice leftover", "Gmail as this dest (trap)", "../palmpre/index.html", "Palm Pre leftover",
         "Google Voice leftover 2009. Invite leftover weather.",
         "Gmail is not this. Never write itt09-like.",
         "Open leftover Voice"),
        ("palmpre", "palmpre", "itt09-pop-palmpre", "Palm Pre leftover", "iPhone as this dest (trap)", "../friendfeed/index.html", "FriendFeed leftover",
         "Palm Pre 2009 leftover. iPhone 3GS is official n=4.",
         "Never write itt09-iphone.",
         "Open leftover Pre"),
        ("friendfeed", "friendfeed", "itt09-pop-friendfeed", "FriendFeed leftover", "Facebook Like as this dest (trap)", "../minecraft/index.html", "Minecraft leftover",
         "FriendFeed leftover 2009. Facebook bought it Aug 2009 leftover weather.",
         "Never write itt09-like.",
         "Open leftover FriendFeed"),
        ("minecraft", "minecraft", "itt09-pop-minecraft", "Minecraft leftover", "2011 1.0 as 2009 gold (trap)", "../bitcoin/index.html", "Bitcoin leftover",
         "Minecraft 17 May 2009 public leftover. 1.0 is 2011 leftover 3×.",
         "2011 1.0 is not 2009 gold.",
         "Open leftover Minecraft"),
        ("bitcoin", "pop3-bitcoin", "itt09-pop3-bitcoin", "Bitcoin leftover", "2008 paper as 2009 gold (trap)", "../ubercab/index.html", "UberCab leftover",
         "3 Jan 2009 Bitcoin genesis leftover. 2008 dest is the paper.",
         "2008 paper is not 2009 gold. No live coin.",
         "Read leftover genesis"),
        ("ubercab", "pop3-ubercab", "itt09-pop3-ubercab", "UberCab leftover", "2010 SF launch as 2009 gold (trap)", "../kindle/index.html", "Kindle leftover",
         "UberCab founded 2009 leftover. SF launch is 2010 dest uber/.",
         "2010 launch is not 2009 gold. No live charge.",
         "Open leftover UberCab"),
        ("kindle", "pop3-kindle", "itt09-pop3-kindle", "Kindle leftover", "2007 Kindle as this dest (trap)", "../../pages/home.html", "Starting Point",
         "Kindle leftover 2009. 2007 dest is the first Kindle leftover.",
         "2007 is not 2009 gold. Never write itt09-like.",
         "Open leftover Kindle"),
    ],
    "2010": [
        ("uber", "uber", "itt10-pop-uber", "UberCab SF leftover", "2012 leftover 3× as this dest (trap)", "../wikileaks/index.html", "Cablegate leftover",
         "UberCab SF 2010. May launch. TC 15 Oct $1.25M. Renamed Uber Oct 2010 after SF C&D.",
         "2012 is not 2010. No live charge. Never write itt10-ig-posts.",
         "Open leftover UberCab"),
        ("wikileaks", "wikileaks", "itt10-pop-wikileaks", "Cablegate leftover", "live dump (trap)", "../facetime/index.html", "FaceTime leftover",
         "28 Nov 2010 Cablegate. NYT Shane + Lehren. 250k cables. Literacy only.",
         "No live dump. Never write gold.",
         "Read leftover Cablegate"),
        ("facetime", "facetime", "itt10-pop-facetime", "FaceTime leftover", "iPhone 4 official as this dest (trap)", "../windowsphone/index.html", "Windows Phone leftover",
         "FaceTime leftover with iPhone 4. Wi-Fi only 2010. Official dest is iphone/.",
         "Never write itt10-iphone4 / itt10-ig-posts.",
         "Open leftover FaceTime"),
        ("windowsphone", "windowsphone", "itt10-pop-windowsphone", "Windows Phone 7 leftover", "iPhone as this dest (trap)", "../ie9/index.html", "IE9 leftover",
         "Windows Phone 7 leftover. Nov 2010. iPhone 4 is official n=2.",
         "Never write itt10-iphone4. No live charge.",
         "Open leftover WP7"),
        ("ie9", "ie9", "itt10-pop-ie9", "IE9 preview leftover", "Chrome leftover 3× as this dest (trap)", "../digg/index.html", "Digg v4 leftover",
         "Internet Explorer 9 preview leftover 2010. Ship is 2011. Chrome leftover 3× is chrome/.",
         "2011 ship is not 2010 gold. Never write itt10-ig-posts.",
         "Open leftover IE9"),
        ("digg", "digg", "itt10-pop-digg", "Digg v4 leftover", "2005 official as this dest (trap)", "../browserchoice/index.html", "BrowserChoice leftover",
         "Digg v4 leftover 25 Aug 2010. 2005 dest is official n=5 that year.",
         "Never write 2005 gold. Never write itt10-ig-posts.",
         "Open leftover Digg v4"),
        ("browserchoice", "pop3-browserchoice", "itt10-pop3-browserchoice", "BrowserChoice leftover", "Chrome as this dest (trap)", "../kickstarter/index.html", "Kickstarter leftover",
         "BrowserChoice.eu 2010 leftover ballot. Chrome leftover 3× is chrome/.",
         "Never write itt10-ig-posts.",
         "Open leftover ballot"),
        ("kickstarter", "pop3-kickstarter", "itt10-pop3-kickstarter", "Kickstarter leftover", "2009 official as this dest (trap)", "../reddit/index.html", "Reddit leftover",
         "Kickstarter leftover 2010 habit. 2009 dest is official n=8.",
         "Never write 2009 gold.",
         "Open leftover Kickstarter"),
        ("reddit", "pop3-reddit", "itt10-pop3-reddit", "Reddit leftover", "2005 official as this dest (trap)", "../../pages/home.html", "Starting Point",
         "Reddit leftover 2010 habit. 2005 dest is official n=6.",
         "Never write 2005 gold. Never write itt10-ig-posts.",
         "Open leftover Reddit"),
    ],
}

STARS = {
    "2005": "Upload",
    "2006": "Twttr",
    "2007": "iPhone Safari",
    "2008": "GitHub",
    "2009": "Like",
    "2010": "Instagram",
}

HOME = {
    "2005": [
        ("a", "facebook", "Facebook leftover", "lastfm", "Last.fm leftover", "reader", "Reader leftover"),
        ("b", "analytics", "Analytics leftover", "googleearth", "Earth leftover", "secondlife", "Second Life leftover"),
        ("c", "yelp", "Yelp leftover", "odeo", "Odeo leftover", "linkedin", "LinkedIn leftover"),
    ],
    "2006": [
        ("a", "wii", "Wii leftover", "time-you", "Time You leftover", "skype", "Skype leftover"),
        ("b", "lastfm", "Last.fm leftover", "secondlife", "Second Life leftover", "blogger", "Blogger leftover"),
        ("c", "wordpress", "WordPress leftover", "adsense", "AdSense leftover", "flickr", "Flickr leftover"),
    ],
    "2007": [
        ("a", "iptouch", "iPod touch leftover", "apltv", "Apple TV leftover", "huluann", "Hulu announce leftover"),
        ("b", "gears", "Gears leftover", "halo3", "Halo 3 leftover", "stumble", "StumbleUpon leftover"),
        ("c", "ipann", "iPhone announce leftover", "vista", "Vista leftover", "gim", "Gmail IMAP leftover"),
    ],
    "2008": [
        ("a", "airbnb", "Airbnb leftover", "bitcoin", "Bitcoin leftover", "duckduckgo", "DuckDuckGo leftover"),
        ("b", "groupon", "Groupon leftover", "tweetdeck", "TweetDeck leftover", "failwhale", "Fail Whale leftover"),
        ("c", "cuil", "Cuil leftover", "bitly", "bit.ly leftover", "spotify", "Spotify leftover"),
    ],
    "2009": [
        ("a", "wolfram", "Wolfram leftover", "angry", "Angry Birds leftover", "gvoice", "Google Voice leftover"),
        ("b", "palmpre", "Palm Pre leftover", "friendfeed", "FriendFeed leftover", "minecraft", "Minecraft leftover"),
        ("c", "bitcoin", "Bitcoin leftover", "ubercab", "UberCab leftover", "kindle", "Kindle leftover"),
    ],
    "2010": [
        ("a", "uber", "UberCab leftover", "wikileaks", "Cablegate leftover", "facetime", "FaceTime leftover"),
        ("b", "windowsphone", "Windows Phone leftover", "ie9", "IE9 leftover", "digg", "Digg v4 leftover"),
        ("c", "browserchoice", "BrowserChoice leftover", "kickstarter", "Kickstarter leftover", "reddit", "Reddit leftover"),
    ],
}


def pop_block(year, dest, pop_id, key, keep, trap, nxt, nxt_l, weather, tick, verb):
    star = STARS[year]
    key_attr = f' data-pop-key="{pop_id}"' if pop_id.startswith("pop3-") else ""
    return f"""<!-- {MARK}:{dest}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1">
<p><b>{keep}</b> · leftover 3× 2× · {star} is the chip · incomplete never writes · <code>{key}</code></p>
<p>{weather}</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{keep}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>Caption <input type="text" data-pop-field placeholder="{keep}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {tick}</label>
<p><button type="button" data-pop-go data-pop-id="{pop_id}"{key_attr}>{verb}</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>
</div>
<!-- {MARK}:{dest}:end -->
"""


def strip_html(year, letter, a, al, b, bl, c, cl):
    return (
        f'<nav data-itt-pop-2x-{letter}="{year}" class="itt-pop-2x-{letter}" '
        f'style="margin:10px auto;padding:10px;background:#e8f5e9;border:1px dashed #2e7d32;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f'<b>Leftover 3× 2× · strip {letter}</b> (not the chip · not today’s leftover 3×) · '
        f'<a href="../sites/{a}/index.html">{al}</a> · '
        f'<a href="../sites/{b}/index.html">{bl}</a> · '
        f'<a href="../sites/{c}/index.html">{cl}</a>'
        f"</nav>"
    )


def unescape_js_string(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i] == "\\" and i + 1 < len(s):
            n = s[i + 1]
            out.append({"n": "\n", '"': '"', "\\": "\\"}.get(n, n))
            i += 2
            continue
        out.append(s[i])
        i += 1
    return "".join(out)


def escape_js_string(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def extract_year_string(text: str, year: str) -> tuple[int, int, str]:
    m = re.search(r'\n  "' + year + r'": "', text)
    if not m:
        raise SystemExit(f"year {year} missing in start-extra.js")
    start = m.end()
    i = start
    raw = []
    while i < len(text):
        c = text[i]
        if c == "\\" and i + 1 < len(text):
            raw.append(text[i : i + 2])
            i += 2
            continue
        if c == '"':
            return start, i, unescape_js_string("".join(raw))
        raw.append(c)
        i += 1
    raise SystemExit(f"unterminated {year}")


def paint_home():
    path = ROOT / "ui/year/start-extra.js"
    text = path.read_text(encoding="utf-8")
    for year, strips in HOME.items():
        start, end, html = extract_year_string(text, year)
        html = re.sub(
            rf'\n?<nav data-itt-pop-2x-[abc]="{year}"[\s\S]*?</nav>',
            "",
            html,
        )
        block = "\n".join(strip_html(year, *row) for row in strips)
        inserted = False
        last_at = -1
        for m in re.finditer(rf'data-itt-pop(?!-2x)[^=]*="{year}"', html):
            last_at = m.start()
        if last_at >= 0:
            close_p = html.find("</p>", last_at)
            close_n = html.find("</nav>", last_at)
            if close_p >= 0 and (close_n < 0 or close_p < close_n):
                insert_at = close_p + len("</p>")
            elif close_n >= 0:
                insert_at = close_n + len("</nav>")
            else:
                insert_at = -1
            if insert_at >= 0:
                html = html[:insert_at] + "\n" + block + html[insert_at:]
                inserted = True
        if not inserted:
            html = html + "\n" + block
        text = text[:start] + escape_js_string(html) + text[end:]
    path.write_text(text, encoding="utf-8")
    print("home strips painted")


def paint_dests():
    n = 0
    stripped = 0
    for year, doors in DOORS.items():
        keep = {row[0] for row in doors}
        sites = ROOT / "years" / year / "sites"
        for dest_dir in sites.iterdir():
            if not dest_dir.is_dir():
                continue
            p = dest_dir / "index.html"
            if not p.exists():
                continue
            html = p.read_text(encoding="utf-8")
            if MARK in html and dest_dir.name not in keep:
                html = re.sub(rf"<!-- {MARK}:{dest_dir.name}:start -->[\s\S]*?<!-- {MARK}:{dest_dir.name}:end -->\n?", "", html)
                p.write_text(html, encoding="utf-8")
                stripped += 1
        for dest, pop_id, key, keep_l, trap, nxt, nxt_l, weather, tick, verb in doors:
            p = ROOT / "years" / year / "sites" / dest / "index.html"
            if not p.exists():
                raise SystemExit(f"missing dest {p}")
            html = p.read_text(encoding="utf-8")
            html = re.sub(rf"<!-- {MARK}:{dest}:start -->[\s\S]*?<!-- {MARK}:{dest}:end -->\n?", "", html)
            block = pop_block(year, dest, pop_id, key, keep_l, trap, nxt, nxt_l, weather, tick, verb)
            m = re.search(rf'<script src="[^"]*immersion-{year}\.js"></script>', html)
            if m:
                html = html[: m.start()] + block + html[m.start() :]
            else:
                html = html.replace("</body>", block + "</body>", 1)
            p.write_text(html, encoding="utf-8")
            n += 1
    print(f"dest writers {n} · orphan 2× panels stripped {stripped}")


def paint_maps():
    for year, doors in DOORS.items():
        p = ROOT / "years" / year / "pages" / "map.html"
        if not p.exists():
            print(f"skip map {year}")
            continue
        html = p.read_text(encoding="utf-8")
        html = re.sub(rf"<!-- {MARK}:start -->[\s\S]*?<!-- {MARK}:end -->\n?", "", html)
        lis = []
        for dest, pop_id, key, keep, trap, nxt, nxt_l, weather, tick, verb in doors:
            lis.append(
                f' <li><a href="../sites/{dest}/index.html">{keep}</a> — {weather[:80]} → <code>{key}</code> → {nxt_l}</li>'
            )
        extra = (
            f"<!-- {MARK}:start -->\n"
            f"<h2>Leftover 3× 2× — not the chip</h2>\n"
            f'<p data-itt-pop-2x-a="{year}">Pick a row → tick honesty → go. Empty / trap / 0 ticks never write.</p>\n'
            f"<ol>\n" + "\n".join(lis) + "\n</ol>\n"
            f"<!-- {MARK}:end -->\n"
        )
        if "</div>" in html:
            html = html.replace("</div>", extra + "</div>", 1) if extra not in html else html
            # insert before last script if possible
        if f"<!-- {MARK}:start -->" not in html:
            if "</body>" in html:
                html = html.replace("</body>", extra + "</body>", 1)
            else:
                html += extra
        else:
            pass
        # redo cleanly
        html = p.read_text(encoding="utf-8")
        html = re.sub(rf"<!-- {MARK}:start -->[\s\S]*?<!-- {MARK}:end -->\n?", "", html)
        if "</body>" in html:
            html = html.replace("</body>", extra + "</body>", 1)
        else:
            html += extra
        p.write_text(html, encoding="utf-8")
    print("maps painted")


def main():
    paint_home()
    paint_dests()
    paint_maps()
    print("CUT-3X-2X-2005-2010 painted")


if __name__ == "__main__":
    main()
