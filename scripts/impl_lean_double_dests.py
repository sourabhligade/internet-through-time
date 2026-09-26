#!/usr/bin/env python3
"""Named lean-double leftover dests (LEAN-DOUBLE-CRITERIA Step 2).

One leftover writer per dest (ittYY-<slug>-lx). Never overwrites an existing
dest folder. Never writes official keys or the star. Never stamps leftover-3×
unique (no data-itt-lo3x / data-pop-*). Cap is not a quota.

Also: EXTRA_KEEP on dest-lock years, rewrite rooms[], emit e2e matrix.
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import dest_lock_lean  # noqa: E402

STARS = {
    2007: ("itt07-iphone", "App Store"),
    2010: ("itt10-ig-posts", "Instagram Android"),
    2011: ("itt11-gplus", "Instagram Android"),
    2012: ("itt12-ig-android", "Vine 6s"),
    2014: ("itt14-wa-install", "Watch"),
    2016: ("itt16-ig-stories", "Reels"),
    2018: ("itt18-gdpr", "Accept All"),
    2020: ("itt20-zoom", "ChatGPT dest"),
    2021: ("itt21-att", "Allow"),
    2022: ("itt22-chatgpt", "GPT-4"),
}

# slug, product, verb, why, cite
# trap defaults to year star trap
DESTS: dict[int, list[tuple[str, str, str, str, str]]] = {
    2007: [
        ("hackernews", "Hacker News", "Submit leftover", "Startup News / Hacker News launched 19 Feb 2007.", "https://en.wikipedia.org/wiki/Hacker_News"),
        ("friendfeed", "FriendFeed", "Subscribe leftover", "FriendFeed launched October 2007.", "https://cybercultural.com/p/internet-2007/"),
        ("tesla", "Tesla", "Roadster leftover", "Tesla website 2007 · Web Design Museum gallery.", "https://www.webdesignmuseum.org/gallery/tesla-2007"),
        ("amazon", "Amazon", "Browse leftover", "Hosting.com June 2007 most-visited mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("bbc", "BBC", "Read leftover", "Hosting.com June 2007 most-visited mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("aol", "AOL", "Sign on leftover", "Hosting.com June 2007 most-visited mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("msn", "MSN", "Portal leftover", "Hosting.com June 2007 most-visited mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("ask", "Ask", "Ask leftover", "Hosting.com June 2007 most-visited mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("netflix", "Netflix", "Watch Instantly leftover", "Watch Instantly 16 Jan 2007 · electronic delivery.", "https://cybercultural.com/p/internet-2007/"),
        ("appletv", "Apple TV", "Front Row leftover", "Apple TV 1st gen 9 Jan 2007.", "https://en.wikipedia.org/wiki/Apple_TV"),
        ("ipodtouch", "iPod touch", "Touch leftover", "iPod touch announced 5 Sep 2007.", "https://en.wikipedia.org/wiki/IPod_Touch"),
        ("justintv", "Justin.tv", "Go live leftover", "Justin.tv launched March 2007.", "https://en.wikipedia.org/wiki/Justin.tv"),
        ("icanhas", "I Can Has Cheezburger", "LOL leftover", "I Can Has Cheezburger launched January 2007.", "https://en.wikipedia.org/wiki/I_Can_Has_Cheezburger%3F"),
        ("funnyordie", "Funny or Die", "Watch leftover", "Funny or Die launched 12 Apr 2007.", "https://en.wikipedia.org/wiki/Funny_or_Die"),
        ("pownce", "Pownce", "Send leftover", "Pownce launched 27 Jun 2007.", "https://en.wikipedia.org/wiki/Pownce"),
        ("androidann", "Open Handset Alliance", "Announce leftover", "OHA announced 5 Nov 2007. Android G1 is a 2008 trap.", "https://en.wikipedia.org/wiki/Open_Handset_Alliance"),
        ("feedburner", "FeedBurner", "Burn leftover", "Google acquired FeedBurner June 2007.", "https://en.wikipedia.org/wiki/FeedBurner"),
        ("gears", "Google Gears", "Enable leftover", "Google Gears announced 31 May 2007.", "https://en.wikipedia.org/wiki/Gears_(software)"),
        ("iplayer", "BBC iPlayer", "Play leftover", "BBC iPlayer public Christmas 2007.", "https://en.wikipedia.org/wiki/BBC_iPlayer"),
        ("lastfm", "Last.fm", "Scrobble leftover", "CBS acquired Last.fm May 2007.", "https://en.wikipedia.org/wiki/Last.fm"),
        ("clubpenguin", "Club Penguin", "Waddle leftover", "Disney acquired Club Penguin 1 Aug 2007.", "https://en.wikipedia.org/wiki/Club_Penguin"),
        ("amazonmp3", "Amazon MP3", "Buy track leftover", "Amazon MP3 store 25 Sep 2007.", "https://en.wikipedia.org/wiki/Amazon_Music"),
        ("safari3", "Safari 3", "Beta leftover", "Safari 3 public beta 11 Jun 2007.", "https://en.wikipedia.org/wiki/Safari_version_history"),
    ],
    2010: [
        ("flipboard", "Flipboard", "Flip leftover", "Flipboard iPad social magazine July 2010.", "https://cybercultural.com/p/internet-2010/"),
        ("minecraft", "Minecraft Forum", "Craft leftover", "Minecraft Forum 2010 · Web Design Museum gallery.", "https://www.webdesignmuseum.org/gallery/minecraft-forum-in-2010"),
        ("baidu", "Baidu", "Search leftover", "Hosting.com June 2010 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com June 2010 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("hulu", "Hulu Plus", "Subscribe leftover", "Hulu Plus launched 29 Jun 2010.", "https://en.wikipedia.org/wiki/Hulu"),
        ("angry", "Angry Birds", "Fling leftover", "Angry Birds 2010 mass (Dec 2009 launch).", "https://en.wikipedia.org/wiki/Angry_Birds"),
        ("path", "Path", "Moment leftover", "Path launched November 2010.", "https://en.wikipedia.org/wiki/Path_(social_network)"),
        ("googlebuzz", "Google Buzz", "Buzz leftover", "Google Buzz launched 9 Feb 2010.", "https://en.wikipedia.org/wiki/Google_Buzz"),
        ("chromewebstore", "Chrome Web Store", "Install leftover", "Chrome Web Store 7 Dec 2010.", "https://en.wikipedia.org/wiki/Chrome_Web_Store"),
        ("kinect", "Kinect", "Wave leftover", "Kinect launched 4 Nov 2010.", "https://en.wikipedia.org/wiki/Kinect"),
        ("cityville", "CityVille", "Build leftover", "CityVille launched 2 Dec 2010.", "https://en.wikipedia.org/wiki/CityVille"),
        ("ibooks", "iBooks", "Shelf leftover", "iBooks shipped with iPad 2010.", "https://en.wikipedia.org/wiki/Apple_Books"),
        ("ios4", "iOS 4", "Multitask leftover", "iOS 4 released 21 Jun 2010.", "https://en.wikipedia.org/wiki/IOS_4"),
        ("nexusone", "Nexus One", "Unlock leftover", "Nexus One launched 5 Jan 2010.", "https://en.wikipedia.org/wiki/Nexus_One"),
        ("froyo", "Android 2.2 Froyo", "Flash leftover", "Android 2.2 Froyo 20 May 2010.", "https://en.wikipedia.org/wiki/Android_Froyo"),
        ("skype", "Skype", "Call leftover", "Skype 2010 video-call mass.", "https://en.wikipedia.org/wiki/Skype"),
        ("wordpress", "WordPress 3.0", "Publish leftover", "WordPress 3.0 released 17 Jun 2010.", "https://en.wikipedia.org/wiki/WordPress"),
        ("bing", "Bing", "Search leftover", "Bing 2010 year-mass.", "https://en.wikipedia.org/wiki/Microsoft_Bing"),
        ("flickr", "Flickr", "Upload leftover", "Flickr 2010 year-mass.", "https://en.wikipedia.org/wiki/Flickr"),
        ("wikipedia", "Wikipedia", "Edit leftover", "Wikipedia 2010 year-mass.", "https://en.wikipedia.org/wiki/Wikipedia"),
        ("ebay", "eBay", "Bid leftover", "eBay 2010 year-mass.", "https://en.wikipedia.org/wiki/EBay"),
        ("paypal", "PayPal", "Send leftover", "PayPal 2010 year-mass.", "https://en.wikipedia.org/wiki/PayPal"),
    ],
    2011: [
        ("snapchat", "Snapchat", "Snap leftover", "Picaboo 8 Jul 2011 · Snapchat September 2011.", "https://en.wikipedia.org/wiki/Snapchat"),
        ("ios5", "iOS 5", "Notify leftover", "iOS 5 released 12 Oct 2011.", "https://en.wikipedia.org/wiki/IOS_5"),
        ("imessage", "iMessage", "Blue leftover", "iMessage shipped with iOS 5.", "https://en.wikipedia.org/wiki/IMessage"),
        ("chromebook", "Chromebook", "Sign in leftover", "Chromebooks launched June 2011.", "https://en.wikipedia.org/wiki/Chromebook"),
        ("honeycomb", "Android 3.0 Honeycomb", "Tablet leftover", "Honeycomb launched February 2011.", "https://en.wikipedia.org/wiki/Android_Honeycomb"),
        ("ics", "Ice Cream Sandwich", "Beam leftover", "Android 4.0 Ice Cream Sandwich 19 Oct 2011.", "https://en.wikipedia.org/wiki/Android_Ice_Cream_Sandwich"),
        ("wechat", "WeChat", "Chat leftover", "WeChat launched 21 Jan 2011.", "https://en.wikipedia.org/wiki/WeChat"),
        ("line", "LINE", "Sticker leftover", "LINE launched 23 Jun 2011.", "https://en.wikipedia.org/wiki/Line_(software)"),
        ("temple", "Temple Run", "Run leftover", "Temple Run launched August 2011.", "https://en.wikipedia.org/wiki/Temple_Run"),
        ("skyrim", "Skyrim", "Adventure leftover", "The Elder Scrolls V: Skyrim 11 Nov 2011.", "https://en.wikipedia.org/wiki/The_Elder_Scrolls_V:_Skyrim"),
        ("nytpaywall", "NYT paywall", "Subscribe leftover", "NYT digital paywall March 2011.", "https://en.wikipedia.org/wiki/The_New_York_Times"),
        ("skypebuy", "Skype buy", "Acquire leftover", "Microsoft acquired Skype 10 May 2011.", "https://en.wikipedia.org/wiki/Skype"),
        ("grouponipo", "Groupon IPO", "File leftover", "Groupon IPO November 2011.", "https://en.wikipedia.org/wiki/Groupon"),
        ("zyngaipo", "Zynga IPO", "File leftover", "Zynga IPO December 2011.", "https://en.wikipedia.org/wiki/Zynga"),
        ("googlewallet", "Google Wallet", "Tap leftover", "Google Wallet launched September 2011.", "https://en.wikipedia.org/wiki/Google_Wallet"),
        ("stripe", "Stripe", "Charge leftover", "Stripe launched 2011.", "https://en.wikipedia.org/wiki/Stripe,_Inc."),
        ("duolingo", "Duolingo", "Lesson leftover", "Duolingo launched 2011 (public 2012 site).", "https://en.wikipedia.org/wiki/Duolingo"),
        ("codecademy", "Codecademy", "Lesson leftover", "Codecademy launched 2011.", "https://en.wikipedia.org/wiki/Codecademy"),
        ("baidu", "Baidu", "Search leftover", "Hosting.com 2011 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com 2011 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("wikipedia", "Wikipedia", "Edit leftover", "Wikipedia 2011 year-mass.", "https://en.wikipedia.org/wiki/Wikipedia"),
        ("amazon", "Amazon", "Browse leftover", "Amazon 2011 year-mass.", "https://en.wikipedia.org/wiki/Amazon_(company)"),
        ("reddit", "Reddit", "Upvote leftover", "Reddit 2011 year-mass.", "https://en.wikipedia.org/wiki/Reddit"),
        ("tumblr", "Tumblr", "Reblog leftover", "Tumblr 2011 year-mass.", "https://en.wikipedia.org/wiki/Tumblr"),
        ("netflix", "Netflix", "Play leftover", "Netflix streaming 2011 mass (Qwikster is official).", "https://en.wikipedia.org/wiki/Netflix"),
        ("github", "GitHub", "Push leftover", "GitHub 2011 year-mass.", "https://en.wikipedia.org/wiki/GitHub"),
        ("whatsapp", "WhatsApp", "Chat leftover", "WhatsApp 2011 year-mass.", "https://en.wikipedia.org/wiki/WhatsApp"),
        ("path", "Path", "Moment leftover", "Path 2011 iOS social.", "https://en.wikipedia.org/wiki/Path_(social_network)"),
        ("nintendo3ds", "Nintendo 3DS", "StreetPass leftover", "Nintendo 3DS launched 26 Feb 2011 JP / 25 Mar NA.", "https://en.wikipedia.org/wiki/Nintendo_3DS"),
        ("psnhack", "PSN hack", "Reset leftover", "PlayStation Network outage April 2011.", "https://en.wikipedia.org/wiki/2011_PlayStation_Network_outage"),
        ("gowalla", "Gowalla", "Check in leftover", "Facebook acquired Gowalla December 2011.", "https://en.wikipedia.org/wiki/Gowalla"),
    ],
    2012: [
        ("tinder", "Tinder", "Swipe leftover", "Tinder launched 12 Sep 2012.", "https://en.wikipedia.org/wiki/Tinder_(app)"),
        ("duolingo", "Duolingo", "Lesson leftover", "Duolingo 2012 website · Web Design Museum gallery.", "https://www.webdesignmuseum.org/gallery/duolingo-in-2012"),
        ("baidu", "Baidu", "Search leftover", "Hosting.com 2012 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com 2012 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("vk", "VK", "Wall leftover", "Hosting.com 2012–2014 VK top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("coursera", "Coursera", "Enroll leftover", "Coursera launched April 2012.", "https://en.wikipedia.org/wiki/Coursera"),
        ("udacity", "Udacity", "Enroll leftover", "Udacity launched 2012.", "https://en.wikipedia.org/wiki/Udacity"),
        ("edx", "edX", "Enroll leftover", "edX announced May 2012.", "https://en.wikipedia.org/wiki/EdX"),
        ("nexus7", "Nexus 7", "Play leftover", "Nexus 7 launched July 2012.", "https://en.wikipedia.org/wiki/Nexus_7_(2012)"),
        ("jellybean", "Jelly Bean", "Project Butter leftover", "Android 4.1 Jelly Bean 9 Jul 2012.", "https://en.wikipedia.org/wiki/Android_Jelly_Bean"),
        ("ios6", "iOS 6", "Update leftover", "iOS 6 released 19 Sep 2012.", "https://en.wikipedia.org/wiki/IOS_6"),
        ("applemaps", "Apple Maps", "Route leftover", "Apple Maps shipped with iOS 6.", "https://en.wikipedia.org/wiki/Apple_Maps"),
        ("googleplay", "Google Play", "Install leftover", "Android Market rebranded Google Play March 2012.", "https://en.wikipedia.org/wiki/Google_Play"),
        ("kindlefirehd", "Kindle Fire HD", "Silk leftover", "Kindle Fire HD announced September 2012.", "https://en.wikipedia.org/wiki/Amazon_Fire"),
        ("github", "GitHub", "Push leftover", "GitHub 2012 year-mass.", "https://en.wikipedia.org/wiki/GitHub"),
        ("dropbox", "Dropbox", "Share leftover", "Dropbox 2012 year-mass.", "https://en.wikipedia.org/wiki/Dropbox"),
        ("evernote", "Evernote", "Clip leftover", "Evernote 2012 year-mass.", "https://en.wikipedia.org/wiki/Evernote"),
        ("linkedin", "LinkedIn", "Connect leftover", "LinkedIn 2012 year-mass.", "https://en.wikipedia.org/wiki/LinkedIn"),
        ("etsy", "Etsy", "Shop leftover", "Etsy 2012 year-mass.", "https://en.wikipedia.org/wiki/Etsy"),
        ("netflix", "Netflix", "Play leftover", "Netflix 2012 year-mass.", "https://en.wikipedia.org/wiki/Netflix"),
        ("hulu", "Hulu", "Watch leftover", "Hulu 2012 year-mass.", "https://en.wikipedia.org/wiki/Hulu"),
        ("whatsapp", "WhatsApp", "Chat leftover", "WhatsApp 2012 year-mass.", "https://en.wikipedia.org/wiki/WhatsApp"),
        ("coinbase", "Coinbase", "Buy leftover", "Coinbase launched June 2012.", "https://en.wikipedia.org/wiki/Coinbase"),
        ("tumblr", "Tumblr", "Reblog leftover", "Tumblr 2012 year-mass.", "https://en.wikipedia.org/wiki/Tumblr"),
    ],
    2014: [
        ("baidu", "Baidu", "Search leftover", "Hosting.com 2014 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com 2014 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("vk", "VK", "Wall leftover", "Hosting.com 2012–2014 VK top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("chrome", "Chrome", "Tab leftover", "StatCounter Chrome habit 2014 · missing dest.", "https://gs.statcounter.com/press/chrome-overtakes-ie-globally-monthly"),
        ("google", "Google", "Search leftover", "Hosting.com 2014 #1 most-visited · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yahoo", "Yahoo", "Portal leftover", "Hosting.com 2014 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("amazon", "Amazon", "Browse leftover", "Amazon 2014 year-mass.", "https://en.wikipedia.org/wiki/Amazon_(company)"),
        ("netflix", "Netflix", "Play leftover", "Netflix 2014 year-mass.", "https://en.wikipedia.org/wiki/Netflix"),
        ("github", "GitHub", "Push leftover", "GitHub 2014 year-mass.", "https://en.wikipedia.org/wiki/GitHub"),
        ("reddit", "Reddit", "Upvote leftover", "Reddit 2014 year-mass.", "https://en.wikipedia.org/wiki/Reddit"),
        ("alibabaipo", "Alibaba IPO", "File leftover", "Alibaba IPO 19 Sep 2014.", "https://en.wikipedia.org/wiki/Alibaba_Group"),
        ("oculusfb", "Oculus", "Acquire leftover", "Facebook acquired Oculus March 2014.", "https://en.wikipedia.org/wiki/Oculus_VR"),
        ("inbox", "Inbox by Gmail", "Bundle leftover", "Inbox by Gmail launched 22 Oct 2014.", "https://en.wikipedia.org/wiki/Inbox_by_Gmail"),
        ("echo", "Amazon Echo", "Alexa leftover", "Amazon Echo announced 6 Nov 2014.", "https://en.wikipedia.org/wiki/Amazon_Echo"),
        ("flappybird", "Flappy Bird", "Tap leftover", "Flappy Bird 2014 mass · removed 10 Feb 2014.", "https://en.wikipedia.org/wiki/Flappy_Bird"),
        ("game2048", "2048", "Slide leftover", "2048 released March 2014.", "https://en.wikipedia.org/wiki/2048_(video_game)"),
        ("androidl", "Android Lollipop", "Material leftover", "Android 5.0 Lollipop 12 Nov 2014.", "https://en.wikipedia.org/wiki/Android_Lollipop"),
        ("ios8", "iOS 8", "Update leftover", "iOS 8 released 17 Sep 2014.", "https://en.wikipedia.org/wiki/IOS_8"),
    ],
    2016: [
        ("douyin", "Douyin", "For You leftover", "Douyin launched 20 Sep 2016. TikTok 2018 brand is a trap.", "https://en.wikipedia.org/wiki/TikTok"),
        ("wikipedia", "Wikipedia", "Edit leftover", "Hosting.com 2016 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("twitter", "Twitter", "Tweet leftover", "Hosting.com 2016 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("amazon", "Amazon", "Browse leftover", "Hosting.com 2016 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("google", "Google", "Search leftover", "Hosting.com 2016 #1 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yahoo", "Yahoo", "Portal leftover", "Hosting.com 2016 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("baidu", "Baidu", "Search leftover", "Hosting.com 2016 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com 2016 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("chrome", "Chrome", "Tab leftover", "StatCounter Chrome habit 2016 · missing dest.", "https://gs.statcounter.com/press/chrome-overtakes-ie-globally-monthly"),
        ("github", "GitHub", "Push leftover", "GitHub 2016 year-mass.", "https://en.wikipedia.org/wiki/GitHub"),
        ("pinterest", "Pinterest", "Pin leftover", "Pinterest 2016 year-mass.", "https://en.wikipedia.org/wiki/Pinterest"),
        ("tumblr", "Tumblr", "Reblog leftover", "Tumblr 2016 year-mass.", "https://en.wikipedia.org/wiki/Tumblr"),
        ("twitch", "Twitch", "Watch leftover", "Twitch 2016 year-mass.", "https://en.wikipedia.org/wiki/Twitch_(service)"),
        ("discord", "Discord", "Join leftover", "Discord 2016 year-mass (2015 launch).", "https://en.wikipedia.org/wiki/Discord"),
        ("airpods", "AirPods", "Pair leftover", "AirPods announced 7 Sep 2016 · shipped December.", "https://en.wikipedia.org/wiki/AirPods"),
        ("pixel", "Pixel", "Assistant leftover", "Google Pixel launched October 2016.", "https://en.wikipedia.org/wiki/Pixel_(1st_generation)"),
        ("nougat", "Android Nougat", "Update leftover", "Android 7.0 Nougat 22 Aug 2016.", "https://en.wikipedia.org/wiki/Android_Nougat"),
        ("allo", "Allo", "Chat leftover", "Google Allo launched 21 Sep 2016.", "https://en.wikipedia.org/wiki/Google_Allo"),
        ("duo", "Duo", "Call leftover", "Google Duo launched 16 Aug 2016.", "https://en.wikipedia.org/wiki/Google_Duo"),
        ("googlehome", "Google Home", "Hey leftover", "Google Home launched 4 Nov 2016.", "https://en.wikipedia.org/wiki/Google_Home"),
        ("oculusrift", "Oculus Rift", "Strap leftover", "Oculus Rift CV1 shipped 28 Mar 2016.", "https://en.wikipedia.org/wiki/Oculus_Rift_CV1"),
        ("psvr", "PlayStation VR", "Strap leftover", "PlayStation VR launched 13 Oct 2016.", "https://en.wikipedia.org/wiki/PlayStation_VR"),
        ("overwatch", "Overwatch", "Queue leftover", "Overwatch launched 24 May 2016.", "https://en.wikipedia.org/wiki/Overwatch_(video_game)"),
        ("doom2016", "DOOM", "Rip leftover", "DOOM (2016) launched 13 May 2016.", "https://en.wikipedia.org/wiki/Doom_(2016_video_game)"),
        ("uncharted4", "Uncharted 4", "Climb leftover", "Uncharted 4 launched 10 May 2016.", "https://en.wikipedia.org/wiki/Uncharted_4:_A_Thief%27s_End"),
        ("nomanssky", "No Man's Sky", "Warp leftover", "No Man's Sky launched 9 Aug 2016.", "https://en.wikipedia.org/wiki/No_Man%27s_Sky"),
        ("clashroyale", "Clash Royale", "Battle leftover", "Clash Royale launched 2 Mar 2016.", "https://en.wikipedia.org/wiki/Clash_Royale"),
        ("signal", "Signal", "Chat leftover", "Signal 2016 E2E mass.", "https://en.wikipedia.org/wiki/Signal_(software)"),
        ("telegram", "Telegram", "Chat leftover", "Telegram 2016 year-mass.", "https://en.wikipedia.org/wiki/Telegram_(software)"),
        ("paypal", "PayPal", "Send leftover", "PayPal 2016 year-mass.", "https://en.wikipedia.org/wiki/PayPal"),
        ("applepay", "Apple Pay", "Tap leftover", "Apple Pay 2016 year-mass.", "https://en.wikipedia.org/wiki/Apple_Pay"),
        ("panamapapers", "Panama Papers", "Leak leftover", "Panama Papers 3 Apr 2016.", "https://en.wikipedia.org/wiki/Panama_Papers"),
    ],
    2018: [
        ("facebook", "Facebook", "Scroll leftover", "Hosting.com 2018 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("twitter", "Twitter", "Tweet leftover", "Hosting.com 2018 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("amazon", "Amazon", "Browse leftover", "Hosting.com 2018 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("google", "Google", "Search leftover", "Hosting.com 2018 #1 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yahoo", "Yahoo", "Portal leftover", "Hosting.com 2018 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("baidu", "Baidu", "Search leftover", "Hosting.com 2018 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com 2018 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("netflix", "Netflix", "Play leftover", "Netflix 2018 year-mass.", "https://en.wikipedia.org/wiki/Netflix"),
        ("snapchat", "Snapchat", "Snap leftover", "Snapchat 2018 year-mass.", "https://en.wikipedia.org/wiki/Snapchat"),
        ("discord", "Discord", "Join leftover", "Discord 2018 year-mass.", "https://en.wikipedia.org/wiki/Discord"),
        ("gplusgone", "Google+", "Sunset leftover", "Google+ consumer shutdown announced 8 Oct 2018.", "https://en.wikipedia.org/wiki/Google%2B"),
        ("androidpie", "Android Pie", "Gesture leftover", "Android 9 Pie 6 Aug 2018.", "https://en.wikipedia.org/wiki/Android_Pie"),
        ("ios12", "iOS 12", "Screen Time leftover", "iOS 12 released 17 Sep 2018.", "https://en.wikipedia.org/wiki/IOS_12"),
    ],
    2020: [
        ("clubhouse", "Clubhouse", "Raise hand leftover", "Clubhouse launched March 2020 invite-only audio rooms.", "https://en.wikipedia.org/wiki/Clubhouse_(app)"),
    ],
    2021: [
        ("yahoo", "Yahoo", "Portal leftover", "Hosting.com 2021 top-10 · missing dest.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("baidu", "Baidu", "Search leftover", "Hosting.com 2021 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("yandex", "Yandex", "Search leftover", "Hosting.com 2021 global top-10 mass.", "https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/"),
        ("wikipedia", "Wikipedia", "Edit leftover", "Wikipedia 2021 year-mass.", "https://en.wikipedia.org/wiki/Wikipedia"),
        ("reddit", "Reddit", "Upvote leftover", "Reddit 2021 year-mass.", "https://en.wikipedia.org/wiki/Reddit"),
        ("netflix", "Netflix", "Play leftover", "Netflix 2021 year-mass.", "https://en.wikipedia.org/wiki/Netflix"),
        ("tiktok", "TikTok", "For You leftover", "TikTok 2021 year-mass.", "https://en.wikipedia.org/wiki/TikTok"),
        ("discord", "Discord", "Join leftover", "Discord 2021 year-mass.", "https://en.wikipedia.org/wiki/Discord"),
        ("twitch", "Twitch", "Watch leftover", "Twitch 2021 year-mass.", "https://en.wikipedia.org/wiki/Twitch_(service)"),
        ("github", "GitHub", "Push leftover", "GitHub 2021 year-mass.", "https://en.wikipedia.org/wiki/GitHub"),
        ("nft", "NFT", "Mint leftover", "NFT 2021 mass market.", "https://en.wikipedia.org/wiki/Non-fungible_token"),
        ("coinbaseipo", "Coinbase IPO", "Direct list leftover", "Coinbase direct listing 14 Apr 2021.", "https://en.wikipedia.org/wiki/Coinbase"),
        ("epicapple", "Epic v Apple", "Sideload leftover", "Epic v. Apple trial 2021.", "https://en.wikipedia.org/wiki/Epic_Games_v._Apple"),
        ("m1", "M1 Mac", "Chip leftover", "M1 Macs 2021 mass (announced 2020).", "https://en.wikipedia.org/wiki/Apple_M1"),
        ("clubhouse21", "Clubhouse", "Room leftover", "Clubhouse 2021 audio-room mass (launched 2020).", "https://en.wikipedia.org/wiki/Clubhouse_(app)"),
    ],
    2022: [
        ("temu", "Temu", "Shop leftover", "Temu launched September 2022.", "https://en.wikipedia.org/wiki/Temu"),
        ("chrome", "Chrome", "Tab leftover", "StatCounter Chrome habit 2022 · missing dest.", "https://gs.statcounter.com/press/chrome-overtakes-ie-globally-monthly"),
        ("baidu", "Baidu", "Search leftover", "Baidu 2022 year-mass.", "https://en.wikipedia.org/wiki/Baidu"),
        ("yandex", "Yandex", "Search leftover", "Yandex 2022 year-mass.", "https://en.wikipedia.org/wiki/Yandex"),
        ("yahoo", "Yahoo", "Portal leftover", "Yahoo 2022 year-mass.", "https://en.wikipedia.org/wiki/Yahoo"),
        ("github", "GitHub", "Push leftover", "GitHub 2022 year-mass.", "https://en.wikipedia.org/wiki/GitHub"),
        ("discord", "Discord", "Join leftover", "Discord 2022 year-mass.", "https://en.wikipedia.org/wiki/Discord"),
        ("twitch", "Twitch", "Watch leftover", "Twitch 2022 year-mass.", "https://en.wikipedia.org/wiki/Twitch_(service)"),
        ("spotify", "Spotify", "Play leftover", "Spotify 2022 year-mass.", "https://en.wikipedia.org/wiki/Spotify"),
        ("snapchat", "Snapchat", "Snap leftover", "Snapchat 2022 year-mass.", "https://en.wikipedia.org/wiki/Snapchat"),
        ("whatsapp", "WhatsApp", "Chat leftover", "WhatsApp 2022 year-mass.", "https://en.wikipedia.org/wiki/WhatsApp"),
        ("linkedin", "LinkedIn", "Connect leftover", "LinkedIn 2022 year-mass.", "https://en.wikipedia.org/wiki/LinkedIn"),
        ("pinterest", "Pinterest", "Pin leftover", "Pinterest 2022 year-mass.", "https://en.wikipedia.org/wiki/Pinterest"),
        ("musk", "Twitter buy", "Acquire leftover", "Musk closed Twitter acquisition 27 Oct 2022. X wordmark is a trap.", "https://en.wikipedia.org/wiki/Acquisition_of_Twitter_by_Elon_Musk"),
        ("stablediff", "Stable Diffusion", "Prompt leftover", "Stable Diffusion released August 2022.", "https://en.wikipedia.org/wiki/Stable_Diffusion"),
        ("midjourney", "Midjourney", "Prompt leftover", "Midjourney opened 2022.", "https://en.wikipedia.org/wiki/Midjourney"),
        ("dalle2", "DALL-E 2", "Prompt leftover", "DALL-E 2 announced 6 Apr 2022.", "https://en.wikipedia.org/wiki/DALL-E"),
        ("ios16", "iOS 16", "Lock leftover", "iOS 16 released 12 Sep 2022.", "https://en.wikipedia.org/wiki/IOS_16"),
        ("m2", "M2", "Chip leftover", "M2 announced 6 Jun 2022.", "https://en.wikipedia.org/wiki/Apple_M2"),
    ],
}

LOCK_SKIP_2010 = {
    "groupondeal", "quorawait", "instant", "pinterest", "uber", "quora", "digg",
    "wikileaks", "browserchoice", "ask", "facetime", "windowsphone", "dropbox",
}


def prefix(year: int) -> str:
    return f"itt{str(year)[2:]}"


def dest_html(year: int, slug: str, product: str, verb: str, why: str, cite: str) -> str:
    star_key, trap = STARS[year]
    p = html.escape(product)
    v = html.escape(verb)
    w = html.escape(why)
    t = html.escape(trap)
    c = html.escape(cite)
    key = f"{prefix(year)}-{slug}-lx"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{p} leftover — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body class="itt-lo-dest-page">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="itt-pixel-failed" data-itt-capture-cite>[failed-final] {p} · {w} · {c} · no invented brand pixels</p>
<div class="itt-lo-dest">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>{p} leftover</h1>
<p>{w} Incomplete never writes. Leftover never writes the star.</p>
<section class="itt-lo-panel" data-lo-panel="1" data-itt-dest-true="1" data-itt-year="{year}">
<p><b>{v}</b> · leftover dest · <code>{html.escape(key)}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req>The chip is not this dest.</label>
<label style="display:block"><input type="checkbox" data-lo-req>Empty / trap never write.</label>
<p>
<button type="button" data-lo-pick="keep">{v}</button>
<button type="button" data-lo-pick="trap">{t} as gold (trap)</button>
</p>
<p><input type="text" data-lo-field maxlength="80" placeholder="{v}" autocomplete="off"></p>
<p>
<button type="button" data-lo-trap>{t} as gold (trap)</button>
<button type="button" data-lo-save data-lo-key="{html.escape(slug)}-lx" data-lo-need-pick="keep">{v}</button>
</p>
<p data-lo-status></p>
</section>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def disk_slugs(year: int) -> set[str]:
    d = ROOT / "years" / str(year) / "sites"
    if not d.is_dir():
        return set()
    return {p.name for p in d.iterdir() if p.is_dir()}


def pop_ids(year: str) -> set[str]:
    path = ROOT / "scripts" / "leftover-3x-unique.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    row = data.get(year) or {}
    out: set[str] = set()
    for layer in ("first", "second", "third"):
        for item in row.get(layer) or []:
            if item.get("id"):
                out.add(item["id"])
    return out


def patch_extra_keep(new_by_year: dict[str, set[str]]) -> None:
    path = ROOT / "scripts" / "dest_lock_lean.py"
    text = path.read_text(encoding="utf-8")
    extra = dict(dest_lock_lean.EXTRA_KEEP)
    for year, slugs in new_by_year.items():
        extra.setdefault(year, set()).update(slugs)
    lines = ["EXTRA_KEEP = {"]
    for year in sorted(extra):
        slugs = sorted(extra[year])
        lines.append(f'    "{year}": {{')
        chunk: list[str] = []
        buf = "        "
        for i, s in enumerate(slugs):
            piece = json.dumps(s)
            if i < len(slugs) - 1:
                piece += ", "
            if len(buf) + len(piece) > 88:
                chunk.append(buf.rstrip())
                buf = "        " + piece
            else:
                buf += piece
        if buf.strip():
            chunk.append(buf.rstrip())
        lines.extend(chunk)
        lines.append("    },")
    lines.append("}")
    new_block = "\n".join(lines) + "\n"
    new_text, n = re.subn(
        r"EXTRA_KEEP = \{.*?\n\}",
        new_block.rstrip(),
        text,
        count=1,
        flags=re.S,
    )
    if n != 1:
        raise SystemExit("could not patch EXTRA_KEEP")
    path.write_text(new_text, encoding="utf-8")


def main() -> None:
    wrote = []
    skipped = []
    collisions = []
    matrix = []
    extra: dict[str, set[str]] = {}
    lock_years = {"2007", "2010", "2011", "2012", "2014", "2021", "2022"}
    caps = {2007: 46, 2010: 44, 2011: 62, 2012: 48, 2014: 36, 2016: 64, 2020: 39, 2021: 30, 2022: 38}
    for year, rows in DESTS.items():
        if year == 2018:
            continue
        existing = disk_slugs(year)
        added_year = 0
        cap = caps.get(year)
        unique3 = pop_ids(str(year))
        seen: set[str] = set()
        for slug, product, verb, why, cite in rows:
            if slug in seen:
                collisions.append((year, slug, "dup-in-harvest"))
                continue
            seen.add(slug)
            if year == 2010 and slug in LOCK_SKIP_2010:
                collisions.append((year, slug, "dest-lock-skip"))
                continue
            if slug in unique3:
                collisions.append((year, slug, "leftover-3x-unique"))
                continue
            if cap is not None and len(existing) + added_year >= cap:
                collisions.append((year, slug, "cap"))
                continue
            star_key, _trap = STARS[year]
            row = {
                "year": str(year),
                "id": slug,
                "href": f"/years/{year}/sites/{slug}/index.html",
                "key": f"{prefix(year)}-{slug}-lx",
                "star": star_key,
                "verb": verb,
            }
            extra.setdefault(str(year), set()).add(slug)
            dest_dir = ROOT / "years" / str(year) / "sites" / slug
            if slug in existing or dest_dir.exists():
                skipped.append((year, slug, "exists"))
                if dest_dir.is_dir():
                    matrix.append(row)
                continue
            dest_dir.mkdir(parents=True, exist_ok=False)
            (dest_dir / "index.html").write_text(
                dest_html(year, slug, product, verb, why, cite),
                encoding="utf-8",
            )
            wrote.append((year, slug))
            added_year += 1
            matrix.append(row)
        extra.setdefault(str(year), set())

    keep_years = {y: extra[y] for y in extra if y in lock_years or y == "2020"}
    if keep_years:
        patch_extra_keep(keep_years)

    for year in sorted({str(y) for y in DESTS}):
        dest_lock_lean.rewrite_rooms(year)

    matrix_path = ROOT / "e2e" / "lean-double-leftover.matrix.json"
    matrix_path.write_text(json.dumps(matrix, indent=2) + "\n", encoding="utf-8")

    print(f"wrote {len(wrote)} dests")
    print(f"skipped {len(skipped)} existing")
    print(f"collisions {len(collisions)}")
    for row in collisions:
        print(" COLLIDE", row)
    for row in skipped:
        print(" SKIP", row)
    by = {}
    for y, s in wrote:
        by.setdefault(y, []).append(s)
    for y in sorted(by):
        print(f"  {y}: +{len(by[y])} {', '.join(by[y])}")


if __name__ == "__main__":
    main()
