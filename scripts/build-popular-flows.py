#!/usr/bin/env python3
"""Scaffold popular-session REAL rooms + urlMap + home chips + e2e matrix.

Idempotent. Lean years stay within +3 HTML vs the counts baked into FLOWS.
Does not change stars or guided <ol>.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# kind: new = create index if missing
#       reuse = inject panel on existing page
#       star = do not touch page (e2e load-check only)
FLOWS = [
    # year, id, key, path, kind, title, field_ph, check_a, check_b, next_rel, next_label
    (1994, "F1", "infoseek", "sites/infoseek/index.html", "new", "Infoseek — 1994", "query", "1994 search · not Google", "Type a query · results are theater", "../yahoo/index.html", "Yahoo directory"),
    (1994, "F2", "yahoo-dir", "sites/yahoo/index.html", "reuse", "Yahoo directory · 2 hubs", None, "Browse a category (not a search box)", "Visit two hubs this session", "../webcrawler/index.html", "WebCrawler"),
    (1994, "F3", "webcrawler", "sites/webcrawler/index.html", "reuse", "WebCrawler full-text", "query", "First full-text search class", "Not a 1998 Google story", "../ncsa/index.html", "NCSA What’s New"),
    (1994, "F4", "whatsnew", "sites/ncsa/index.html", "reuse", "NCSA What’s New", None, "One dated What’s New item", "Mosaic-era list · not a portal", "../mcom/index.html", "Netscape"),
    (1994, "F5", "nn-url", "sites/mcom/index.html", "reuse", "Netscape first URL", "url", "Type a period URL theater", "No tabs · Back is the map", "../csotd/index.html", "Cool Site of the Day"),
    (1995, "F1", "aol", "sites/aol/index.html", "new", "AOL — You’ve Got Mail", "screen", "CD install class · garden then Web", "You’ve Got Mail is the first screen", "../prodigy/index.html", "Prodigy"),
    (1995, "F2", "prodigy", "sites/prodigy/index.html", "new", "Prodigy — first WWW among Big Three", None, "First Big Three service with full WWW", "June 1995 member home pages class", "../infoseek/index.html", "Infoseek"),
    (1995, "F3", "infoseek", "sites/infoseek/index.html", "new", "Infoseek — 1995", "query", "1995 search leftover", "Not Google", "../compuserve/index.html", "Compuserve"),
    (1995, "F4", "compuserve", "sites/compuserve/index.html", "new", "Compuserve — GO word", "go", "Forum GO word theater", "Not AOL keywords", "../yahoo/index.html", "Yahoo"),
    (1995, "F5", "yahoo", "sites/yahoo/index.html", "reuse", "Yahoo.com 1995 domain", None, "yahoo.com is 1995 (akebono was 1994)", "Directory still wins", "../amazon/ssl-checkout.html", "SSL checkout"),
    (1996, "F1", "msn", "sites/msn/index.html", "new", "MSN.com — start page 1996", "channel", "Home button can be MSN", "Not Bing · not 2001 MSN star", "../infoseek/index.html", "Infoseek"),
    (1996, "F2", "infoseek", "sites/infoseek/index.html", "new", "Infoseek — 1996", "query", "Search from a portal leftover", "Not the home button", "../prodigy/index.html", "Prodigy"),
    (1996, "F3", "prodigy", "sites/prodigy/index.html", "new", "Prodigy residual 1996", None, "Now third behind AOL + Compuserve", "WWW already open", "../excite/index.html", "My Excite"),
    (1996, "F4", "myexcite", "sites/excite/index.html", "reuse", "My Excite modules", None, "Portal modules · not a search-only box", "Set news + weather class", "../hotmail/index.html", "Hotmail"),
    (1996, "F5", "hotmail", "sites/hotmail/index.html", "reuse", "Hotmail compose 1996", "to", "Jul 1996 webmail", "To + body class (field is the to)", "../portals/wars.html", "Portal wars"),
    (1997, "F1", "msn", "sites/msn/index.html", "new", "MSN.com — 1997", "channel", "MSN is top-3 this year", "Channels · not Bing", "../bbc/index.html", "BBC News"),
    (1997, "F2", "bbc", "sites/bbc/index.html", "new", "BBC News — 1997", None, "bbc.com class 1997", "One story · not a 2020 masthead", "../aol/index.html", "AOL"),
    (1997, "F3", "aol", "sites/aol/index.html", "new", "AOL.com residual 1997", "screen", "Mail then keyword", "Garden still real", "../excite/index.html", "Excite"),
    (1997, "F4", "excite", "sites/excite/index.html", "new", "Excite portal 1997", "query", "Portal search", "Not Google default", "../lycos/index.html", "Lycos"),
    (1997, "F5", "lycos", "sites/lycos/index.html", "new", "Lycos catalog 1997", "query", "Catalog class", "Next is PointCast (star)", "../pointcast/index.html", "PointCast"),
    (1998, "F1", "msn", "sites/msn/index.html", "new", "MSN.com start 1998", "channel", "Portal still the home button", "Lucky is the trick later", "../lycos/index.html", "Lycos"),
    (1998, "F2", "lycos", "sites/lycos/index.html", "new", "Lycos catalog 1998", "query", "Catalog vs Lucky", "Not PageRank", "../aol/index.html", "AOL"),
    (1998, "F3", "aol", "sites/aol/index.html", "new", "AOL.com 1998", "screen", "You’ve Got Mail still", "Then try Lucky", "../bbc/index.html", "BBC"),
    (1998, "F4", "bbc", "sites/bbc/index.html", "new", "BBC News 1998", None, "Top-10 this year", "One story", "../google/lucky.html", "I’m Feeling Lucky"),
    (1998, "F5", "lucky", "sites/google/lucky.html", "star", "Lucky (star)", None, "star", "star", "", ""),
    (1999, "F1", "about", "sites/about/index.html", "new", "About.com topic 1999", "topic", "Human-written directory", "Not Wikipedia", "../aol/index.html", "AOL"),
    (1999, "F2", "aol", "sites/aol/index.html", "new", "AOL.com 1999", "screen", "Mail first", "AIM signs on before the browser", "../msn/index.html", "MSN"),
    (1999, "F3", "msn", "sites/msn/index.html", "new", "MSN.com 1999", "channel", "MSN is #2 this June table", "Not Bing", "../aim/index.html", "AIM"),
    (1999, "F4", "napster", "sites/napster/index.html", "reuse", "Napster file (not a stream)", "track", "Search a track · download a file", "Not Spotify", "../geocities/index.html", "GeoCities"),
    (1999, "F5", "geocities", "sites/geocities/index.html", "reuse", "GeoCities still a place you live", None, "Yahoo buy Jan 28 1999", "3rd most-visited class", "../aim/index.html", "AIM"),
    (2000, "F1", "about", "sites/about/index.html", "new", "About.com 2000", "topic", "Human directory leftover", "Not Wikipedia", "../bbc/index.html", "BBC"),
    (2000, "F2", "bbc", "sites/bbc/index.html", "new", "BBC News 2000", None, "Top-10", "One story", "../msn/index.html", "MSN"),
    (2000, "F3", "msn", "sites/msn/index.html", "new", "MSN.com residual 2000", "channel", "Not the 2001 MSN star", "Start page only", "../aol/index.html", "AOL"),
    (2000, "F4", "aol", "sites/aol/index.html", "new", "AOL.com 2000", "screen", "Still #2 this June table", "Mail theater", "../mapquest/index.html", "MapQuest"),
    (2000, "F5", "mapquest", "sites/mapquest/index.html", "star", "MapQuest print (star)", None, "star", "star", "", ""),
    (2001, "F1", "cnet", "sites/cnet/index.html", "new", "CNET download 2001", "title", "News + download class", "No live binary", "../bbc/index.html", "BBC"),
    (2001, "F2", "bbc", "sites/bbc/index.html", "new", "BBC News 2001", None, "Top-10", "One story", "../about/index.html", "About.com"),
    (2001, "F3", "about", "sites/about/index.html", "new", "About.com 2001", "topic", "Human directory", "Not wiki", "../aol/index.html", "AOL"),
    (2001, "F4", "aol", "sites/aol/index.html", "new", "AOL.com 2001", "screen", "Residual garden", "Wiki is the star path", "../wikipedia/index.html", "Wikipedia"),
    (2001, "F5", "wiki", "sites/wikipedia/index.html", "star", "Wiki edit (star)", None, "star", "star", "", ""),
    (2002, "F1", "msn", "sites/msn/index.html", "new", "MSN.com 2002", "channel", "IE6 / XP start", "Not 2001 star", "../bbc/index.html", "BBC"),
    (2002, "F2", "bbc", "sites/bbc/index.html", "new", "BBC News 2002", None, "Top-10", "One story", "../about/index.html", "About.com"),
    (2002, "F3", "about", "sites/about/index.html", "new", "About.com 2002", "topic", "Human directory", "Not wiki", "../aol/index.html", "AOL"),
    (2002, "F4", "aol", "sites/aol/index.html", "new", "AOL.com 2002", "screen", "Residual", "Then Google News", "../googlenews/index.html", "Google News"),
    (2002, "F5", "gnews", "sites/googlenews/index.html", "reuse", "Google News scan", None, "Sep 2002 headlines", "Not a newspaper site", "../stumbleupon/index.html", "StumbleUpon"),
    (2003, "F1", "walmart", "sites/walmart/index.html", "new", "Walmart.com 2003", "sku", "Mass ecommerce · not Amazon", "2003 catalog theater", "../cnet/index.html", "CNET"),
    (2003, "F2", "cnet", "sites/cnet/index.html", "new", "CNET 2003", "title", "Download class", "No live binary", "../itunes/index.html", "iTunes"),
    (2003, "F3", "itunes", "sites/itunes/index.html", "reuse", "iTunes 99¢", None, "Apr 28 2003 store", "FairPlay file · not a stream", "../myspace/index.html", "MySpace"),
    (2003, "F4", "myspace", "sites/myspace/index.html", "reuse", "MySpace profile song", None, "Custom HTML nightlife", "Pick a song class", "../photobucket/index.html", "Photobucket"),
    (2003, "F5", "photobucket", "sites/photobucket/index.html", "star", "Photobucket (star)", None, "star", "star", "", ""),
    (2004, "F1", "weather", "sites/weather/index.html", "new", "Weather.com zip", "zip", "Check before you leave", "Not an app · no live tiles", "../walmart/index.html", "Walmart"),
    (2004, "F2", "walmart", "sites/walmart/index.html", "new", "Walmart.com 2004", "sku", "Mass catalog", "Not Amazon", "../msn/index.html", "MSN"),
    (2004, "F3", "msn", "sites/msn/index.html", "new", "MSN.com 2004", "channel", "Parents still start here", "Not Bing", "../aol/index.html", "AOL"),
    (2004, "F4", "aol", "sites/aol/index.html", "new", "AOL.com 2004", "screen", "Residual garden", "Then .edu facebook", "../facebook/networks.html", "Networks"),
    (2004, "F5", "networks", "sites/facebook/networks.html", "star", "thefacebook networks (star)", None, "star", "star", "", ""),
    (2005, "F1", "ask", "sites/ask/index.html", "new", "Ask.com 2005", "query", "Jeeves fading · Ask.com name", "Not 1998 Jeeves-only", "../youtube/index.html", "YouTube"),
    (2005, "F2", "youtube", "sites/youtube/index.html", "reuse", "YouTube one clip", "title", "Feb 2005 · one clip", "No subscriptions-as-default", "../maps/index.html", "Maps"),
    (2005, "F3", "maps", "sites/maps/index.html", "reuse", "Maps drag 2005", None, "Drag the map", "Not MapQuest print", "../myspace/index.html", "MySpace"),
    (2005, "F4", "aol", "sites/aol/index.html", "new", "AOL chip 2005", "screen", "Residual", "Pandora is the star", "../pandora/index.html", "Pandora"),
    (2005, "F5", "pandora", "sites/pandora/index.html", "star", "Pandora (star)", None, "star", "star", "", ""),
    (2006, "F1", "msn", "sites/msn/index.html", "new", "MSN / Live 2006", "channel", "Windows Live era skin", "Not Bing yet", "../ask/index.html", "Ask"),
    (2006, "F2", "ask", "sites/ask/index.html", "new", "Ask.com 2006", "query", "Still top-10", "Not Google", "../facebook/feed.html", "News Feed"),
    (2006, "F3", "feed", "sites/facebook/feed.html", "reuse", "News Feed scan", None, "Feed comes to you", "Not 2004 wall-first", "../twitter/index.html", "Twitter"),
    (2006, "F4", "aol", "sites/aol/index.html", "new", "AOL chip 2006", "screen", "Residual", "Then 140", "../twitter/index.html", "Twitter"),
    (2006, "F5", "tweets", "sites/twitter/index.html", "star", "Twitter 140 (star)", None, "star", "star", "", ""),
    (2007, "F1", "msn", "sites/msn/index.html", "new", "MSN Live query 2007", "query", "Live Search", "Not the iPhone star", "../google/index.html", "Google"),
    (2007, "F2", "google-q", "sites/google/index.html", "reuse", "Google same-query contrast", "query", "Same string class", "Desktop still default", "../ask/index.html", "Ask"),
    (2007, "F3", "ask", "sites/ask/index.html", "new", "Ask.com 2007", "query", "Chip", "Then Safari", "../aol/index.html", "AOL"),
    (2007, "F4", "aol", "sites/aol/index.html", "new", "AOL chip 2007", "screen", "Residual", "No App Store yet", "../iphone/index.html", "iPhone Safari"),
    (2007, "F5", "iphone", "sites/iphone/index.html", "star", "iPhone Safari (star)", None, "star", "star", "", ""),
    (2008, "F1", "msn", "sites/msn/index.html", "new", "MSN.com 2008", "channel", "Still top-5", "Not Bing default story (2009)", "../ask/index.html", "Ask"),
    (2008, "F2", "ask", "sites/ask/index.html", "new", "Ask.com 2008", "query", "Top-10 leftover", "Then Chrome", "../chrome/index.html", "Chrome"),
    (2008, "F3", "chrome", "sites/chrome/index.html", "reuse", "Chrome omnibox", "url", "Sep 2 2008 one box", "Not IE", "../appstore/index.html", "App Store"),
    (2008, "F4", "appstore", "sites/appstore/index.html", "reuse", "App Store Get", None, "Jul 10 2008 Get", "Icon on the springboard", "../github/index.html", "GitHub"),
    (2008, "F5", "github", "sites/github/index.html", "star", "GitHub (star)", None, "star", "star", "", ""),
    (2009, "F1", "ask", "sites/ask/index.html", "new", "Ask.com 2009", "query", "Ask leftover", "Bing is the Microsoft box", "../bing/index.html", "Bing"),
    (2009, "F2", "bing", "sites/bing/index.html", "reuse", "Bing query", "query", "Jun 1 2009", "IE default story", "../facebook/index.html", "Like"),
    (2009, "F3", "likes", "sites/facebook/index.html", "star", "Like (star)", None, "star", "star", "", ""),
    (2009, "F4", "foursquare", "sites/foursquare/index.html", "reuse", "Foursquare check-in", None, "Check-in literacy", "Optional deepen", "../facebook/index.html", "Like"),
    (2009, "F5", "so", "sites/stackoverflow/index.html", "reuse", "Stack Overflow accept", None, "Accept an answer class", "Optional", "../facebook/index.html", "Like"),
    (2010, "F1", "ask", "sites/ask/index.html", "new", "Ask.com chip 2010", "query", "Only mass hole worth a chip", "Do not grow the forest", "../instagram/index.html", "Instagram"),
    (2010, "F2", "ig", "sites/instagram/index.html", "star", "Instagram filter (star)", None, "star", "star", "", ""),
    (2010, "F3", "imgur", "sites/imgur/index.html", "star", "Imgur (star path)", None, "star", "star", "", ""),
    (2010, "F4", "facebook", "sites/facebook/index.html", "reuse", "Facebook 2010 residual", None, "Continuity · already here", "Not a new forest", "../youtube/index.html", "YouTube"),
    (2010, "F5", "youtube", "sites/youtube/index.html", "reuse", "YouTube 2010 residual", None, "Top-3 this year", "Already on disk", "../instagram/index.html", "Instagram"),
    (2011, "F1", "tweets", "sites/twitter/index.html", "new", "Twitter 140 — 2011", "tweet", "Public 140 · not Fleets", "Not the Airbnb star", "../groupon/index.html", "Groupon"),
    (2011, "F2", "groupon", "sites/groupon/index.html", "new", "Groupon daily deal 2011", None, "Daily-deal peak", "Not a 2020 app", "../tumblr/index.html", "Tumblr"),
    (2011, "F3", "tumblr", "sites/tumblr/index.html", "new", "Tumblr reblog 2011", None, "Reblog theater", "Then Airbnb request", "../airbnb/index.html", "Airbnb"),
    (2011, "F4", "wiki", "pages/about.html", "reuse", "Wikipedia continuity (About)", None, "Continuity chip · not a forest", "Not the 2011 one-thing", "../sites/airbnb/index.html", "Airbnb"),
    (2011, "F5", "airbnb", "sites/airbnb/index.html", "star", "Airbnb request (star)", None, "star", "star", "", ""),
    (2012, "F1", "tweets", "sites/twitter/index.html", "new", "Twitter 140 — 2012", "tweet", "Still 140", "Not SoundCloud star", "../tumblr/index.html", "Tumblr"),
    (2012, "F2", "tumblr", "sites/tumblr/index.html", "new", "Tumblr 2012", None, "Reblog", "Then IPO literacy", "../facebook/index.html", "Facebook"),
    (2012, "F3", "fb-ipo", "sites/facebook/index.html", "reuse", "Facebook IPO literacy May 18", None, "May 18 2012 · not a new product", "Instagram buy is September", "../soundcloud/index.html", "SoundCloud"),
    (2012, "F4", "wiki", "sites/wikipedia/sopa-blackout.html", "reuse", "Wikipedia 2012", None, "Already on disk", "Continuity", "../soundcloud/index.html", "SoundCloud"),
    (2012, "F5", "soundcloud", "sites/soundcloud/index.html", "star", "SoundCloud (star)", None, "star", "star", "", ""),
    (2013, "F1", "tweets", "sites/twitter/index.html", "new", "Twitter 2013 (top-10)", "tweet", "Twitter is #6 this June table", "Vine stays the star", "../vine/index.html", "Vine"),
    (2013, "F2", "google", "sites/google/index.html", "new", "Google Search chip 2013", "query", "Continuity · mass #1", "Not a forest", "../../pages/about.html", "About 2013"),
    (2013, "F3", "wiki", "pages/about.html", "reuse", "Wikipedia chip on About", None, "Continuity", "Cap: no extra wiki HTML", "../sites/vine/index.html", "Vine"),
    (2013, "F4", "vine", "sites/vine/index.html", "star", "Vine 6s (star)", None, "star", "star", "", ""),
    (2013, "F5", "snap", "sites/snapchat/index.html", "reuse", "Snap that dies", None, "Timer literacy", "Then Vine", "../vine/index.html", "Vine"),
    (2014, "F1", "tweets", "sites/twitter/index.html", "new", "Twitter 2014", "tweet", "Still mass", "Not WhatsApp star", "../icebucket/index.html", "Ice Bucket"),
    (2014, "F2", "fb", "sites/facebook/index.html", "new", "Facebook 2014 residual", None, "Not a 2006 feed rebuild", "Continuity", "../youtube/index.html", "YouTube"),
    (2014, "F3", "youtube", "sites/youtube/index.html", "new", "YouTube 2014 residual", None, "Mass #3", "One page only", "../whatsapp/index.html", "WhatsApp"),
    (2014, "F4", "icebucket", "sites/icebucket/index.html", "reuse", "Ice Bucket", None, "Film → caption → tag", "Already on disk", "../whatsapp/index.html", "WhatsApp"),
    (2014, "F5", "wa", "sites/whatsapp/index.html", "star", "WhatsApp install (star)", None, "star", "star", "", ""),
    (2015, "F1", "ig", "sites/instagram/index.html", "new", "Instagram 2015 feed", None, "Enters web top 10 this year", "Not Stories · not Reels", "../apple/watch.html", "Watch"),
    (2015, "F2", "google", "pages/about.html", "reuse", "Google chip on About", None, "Continuity", "Watch is the star", "../sites/apple/watch.html", "Watch"),
    (2015, "F3", "wiki", "pages/about.html", "reuse", "Wikipedia chip on About", None, "Continuity", "Same About panel", "../sites/apple/watch.html", "Watch"),
    (2015, "F4", "tweets", "sites/twitter/index.html", "reuse", "Twitter 2015 deepen", "tweet", "Compose if thin", "Still 140", "../apple/watch.html", "Watch"),
    (2015, "F5", "watch", "sites/apple/watch.html", "star", "Watch shipped (star)", None, "star", "star", "", ""),
    (2016, "F1", "tweets", "sites/twitter/index.html", "new", "Twitter 140 — 2016", "tweet", "140 until Nov 2017", "Stories is the star", "../instagram/index.html", "Stories"),
    (2016, "F2", "youtube", "sites/youtube/index.html", "new", "YouTube chip 2016", None, "Mass #3", "One page", "../google/index.html", "Google"),
    (2016, "F3", "google", "sites/google/index.html", "new", "Google chip 2016", "query", "Mass #1 continuity", "Not a forest", "../instagram/index.html", "Stories"),
    (2016, "F4", "stories", "sites/instagram/index.html", "star", "Stories (star)", None, "star", "star", "", ""),
    (2016, "F5", "pogo", "sites/pokemongo/index.html", "reuse", "PoGO literacy", None, "Map → gym theater", "No official sprites", "../instagram/index.html", "Stories"),
    (2017, "F1", "google", "pages/about.html", "reuse", "Google chip 2017", None, "Continuity", "Face ID is the star", "../sites/iphone/index.html", "Face ID"),
    (2017, "F2", "wiki", "pages/about.html", "reuse", "Wikipedia chip 2017", None, "Continuity", "Same About", "../sites/iphone/index.html", "Face ID"),
    (2017, "F3", "amazon", "pages/about.html", "reuse", "Amazon chip 2017", None, "Continuity · not 1995 SSL", "Same About", "../sites/iphone/index.html", "Face ID"),
    (2017, "F4", "faceid", "sites/iphone/index.html", "star", "Face ID (star)", None, "star", "star", "", ""),
    (2017, "F5", "fortnite", "sites/fortnite/index.html", "reuse", "Fortnite drop literacy", None, "No Epic slash art", "Optional", "../iphone/index.html", "Face ID"),
    (2018, "F1", "google", "pages/about.html", "reuse", "Google chip 2018", None, "Continuity", "GDPR is the star", "../sites/gdpr/index.html", "GDPR"),
    (2018, "F2", "wiki", "pages/about.html", "reuse", "Wikipedia chip 2018", None, "Continuity", "Same About", "../sites/gdpr/index.html", "GDPR"),
    (2018, "F3", "amazon", "pages/about.html", "reuse", "Amazon chip 2018", None, "Continuity", "Same About", "../sites/gdpr/index.html", "GDPR"),
    (2018, "F4", "gdpr", "sites/gdpr/index.html", "star", "GDPR Manage (star)", None, "star", "star", "", ""),
    (2018, "F5", "tiktok", "sites/tiktok/fyp.html", "reuse", "TikTok FYP 2018", None, "Aug 2 merge", "Not Reels", "../gdpr/index.html", "GDPR"),
    (2019, "F1", "youtube", "sites/youtube/index.html", "new", "YouTube 2019 habit", None, "Mass #2 · one residual page", "Not a clone forest", "../instagram/index.html", "Instagram"),
    (2019, "F2", "ig", "sites/instagram/index.html", "new", "Instagram hide-likes 2019", None, "Jul 2019 test class", "Not Reels", "../twitter/index.html", "Twitter"),
    (2019, "F3", "tweets", "sites/twitter/index.html", "new", "Twitter 2019", "tweet", "Mass leftover", "Disney+ is the star", "../disneyplus/home.html", "Disney+"),
    (2019, "F4", "wiki", "pages/about.html", "reuse", "Wikipedia chip 2019", None, "Continuity", "About", "../sites/disneyplus/home.html", "Disney+"),
    (2019, "F5", "disneyplus", "sites/disneyplus/home.html", "star", "Disney+ Continue (star)", None, "star", "star", "", ""),
]

def pop_mark(key: str) -> tuple[str, str]:
    return (f"<!-- ITT-POPULAR-PANEL:{key}:start -->", f"<!-- ITT-POPULAR-PANEL:{key}:end -->")


HOME_MARK = ("<!-- ITT-POPULAR-HOME:start -->", "<!-- ITT-POPULAR-HOME:end -->")


def css_for(year: int) -> str:
    if year <= 1994:
        return "mosaic-defaults.css"
    p = ROOT / "css" / f"period-{year}.css"
    return p.name if p.exists() else "period-1995.css"


def strip_block(text: str, marks: tuple[str, str]) -> str:
    a, b = marks
    if a in text and b in text:
        i = text.index(a)
        j = text.index(b) + len(b)
        return text[:i] + text[j:]
    return text


def insert_before_body(text: str, block: str) -> str:
    m = re.search(r"</body\s*>", text, re.I)
    if not m:
        return text.rstrip() + "\n" + block + "\n"
    return text[: m.start()] + block + "\n" + text[m.start() :]


def panel_html(year: int, key: str, title: str, field: str | None, ca: str, cb: str, nxt: str, nl: str) -> str:
    field_html = ""
    req_field = ""
    if field:
        field_html = (
            f'<p style="margin:8px 0"><label>{field}<br>'
            f'<input id="pop-field" data-popular-field name="{field}" size="28" autocomplete="off"></label></p>'
        )
        req_field = ' data-require-field="#pop-field" data-require-field-min="2"'
    next_html = ""
    if nxt:
        next_html = (
            f'<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> '
            f'<a href="{nxt}">{nl}</a></p>'
        )
    a, b = pop_mark(key)
    return (
        f"{a}\n"
        f'<section class="itt-popular-panel" data-itt-popular="{key}" '
        f'style="margin:12px 0;padding:10px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:13px;max-width:46em">'
        f"<b>{title}</b>"
        f'<p style="margin:6px 0;color:#444">Popular session · known destination · incomplete never writes</p>'
        f"{field_html}"
        f'<label style="display:block;margin:6px 0"><input type="checkbox" data-popular-req> {ca}</label>'
        f'<label style="display:block;margin:6px 0"><input type="checkbox" data-popular-req> {cb}</label>'
        f'<p><button type="button" data-itt-popular-save data-storage-key="{key}" data-min-req="2" '
        f'data-requires="[data-popular-req]"{req_field}>Save popular session</button></p>'
        f'<p data-itt-real-status class="itt-popular-status" style="min-height:1.2em"></p>'
        f"<p style=\"font-size:11px;color:#555\">key <code>itt{str(year)[2:]}-{key}</code></p>"
        f"{next_html}"
        f"</section>\n"
        f"{b}\n"
    )


def new_page(year: int, rel: str, title: str, field, ca, cb, nxt, nl, key: str) -> str:
    css = css_for(year)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/{css}">
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000ee" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="720" align="center" cellpadding="10"><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">← Starting Point</a></p>
<h1>{title}</h1>
<p>Known popular destination this year · educational localStorage theater · no live accounts.</p>
{panel_html(year, key, title, field, ca, cb, nxt, nl)}
</td></tr></table>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def ensure_urlmap(year: int, rels: list[str]) -> None:
    cfg = ROOT / "js" / "config" / f"{year}.js"
    if not cfg.exists():
        return
    text = cfg.read_text(encoding="utf-8", errors="ignore")
    added = []
    for rel in rels:
        if f'"{rel}"' in text:
            continue
        fake = f"http://museum.local/years/{year}/{rel}"
        line = f'      "{rel}": "{fake}",\n'
        m = re.search(r"urlMap:\s*\{", text)
        if not m:
            continue
        # insert after opening brace
        i = m.end()
        text = text[:i] + "\n" + line + text[i:]
        added.append(rel)
    if added:
        cfg.write_text(text, encoding="utf-8")


def home_chip_block(year: int, items: list[tuple[str, str, str]]) -> str:
    bits = []
    for key, href, label in items:
        bits.append(f'<a href="{href}" data-trail-keys="itt{str(year)[2:]}-{key}">{label}</a>')
    joined = " ·\n ".join(bits)
    return (
        f"{HOME_MARK[0]}\n"
        f'<p class="itt-popular-pack" data-itt-popular-pack data-itt-year="{year}" '
        f'style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #060;max-width:52em">'
        f"<b>Popular session · known destinations (not the one-thing):</b><br>\n {joined}\n</p>\n"
        f"{HOME_MARK[1]}\n"
    )


def main() -> None:
    by_year: dict[int, list] = {}
    created = 0
    injected = 0
    for row in FLOWS:
        year, fid, key, path, kind, title, field, ca, cb, nxt, nl = row
        by_year.setdefault(year, []).append(row)
        if kind == "star":
            continue
        dest = ROOT / "years" / str(year) / path
        panel = panel_html(year, key, title, field, ca, cb, nxt, nl)
        if kind == "new":
            dest.parent.mkdir(parents=True, exist_ok=True)
            marks = pop_mark(key)
            if dest.exists():
                text = strip_block(dest.read_text(encoding="utf-8", errors="ignore"), marks)
                dest.write_text(insert_before_body(text, panel), encoding="utf-8")
                injected += 1
            else:
                dest.write_text(new_page(year, path, title, field, ca, cb, nxt, nl, key), encoding="utf-8")
                created += 1
        elif kind == "reuse":
            marks = pop_mark(key)
            if not dest.exists():
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(new_page(year, path, title, field, ca, cb, nxt, nl, key), encoding="utf-8")
                created += 1
            else:
                text = strip_block(dest.read_text(encoding="utf-8", errors="ignore"), marks)
                dest.write_text(insert_before_body(text, panel), encoding="utf-8")
                injected += 1

    for year, rows in by_year.items():
        rels = [r[3] for r in rows if r[4] != "star"]
        # also map new files that exist
        ensure_urlmap(year, rels)
        home = ROOT / "years" / str(year) / "pages" / "home.html"
        if home.exists():
            chips = []
            for r in rows:
                if r[4] == "star":
                    continue
                rel = r[3]
                href = "../" + rel if rel.startswith("sites/") else rel.replace("pages/", "")
                chips.append((r[2], href, r[5].split("—")[0].split("·")[0].strip()[:40]))
            block = home_chip_block(year, chips)
            text = strip_block(home.read_text(encoding="utf-8", errors="ignore"), HOME_MARK)
            home.write_text(insert_before_body(text, block), encoding="utf-8")

    matrix = []
    for row in FLOWS:
        year, fid, key, path, kind, title, field, ca, cb, nxt, nl = row
        matrix.append(
            {
                "year": str(year),
                "id": fid,
                "key": f"itt{str(year)[2:]}-{key}",
                "suffix": key,
                "path": f"/years/{year}/{path}",
                "kind": kind,
                "field": field,
                "next": nxt,
            }
        )
    out = ROOT / "e2e" / "popular-flows.matrix.json"
    out.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")
    print(f"created={created} injected={injected} flows={len(FLOWS)} years={len(by_year)}")


if __name__ == "__main__":
    main()
