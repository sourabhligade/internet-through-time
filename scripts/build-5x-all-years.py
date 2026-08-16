#!/usr/bin/env python3
"""Inject 5× REAL loops, home chips, flow-map branches, and live e2e for 1994–2020."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year -> list of (suffix, label, check_a, check_b, room_candidates, next_candidates)
# next_candidates empty on last F (star handled separately)
PACKS: dict[int, list[tuple]] = {
    1994: [
        ("iuma", "F1 IUMA listen", "Helper-app era — no CD / MP3 store", "Modem bar finished then Play (no skip)", ["sites/iuma/index.html", "sites/iuma/about.html"], ["sites/fishcam/index.html"]),
        ("fishcam", "F2 FishCam", "Waited the still timer (no skip)", "Last still id persists on reload", ["sites/fishcam/index.html"], ["sites/whitehouse/index.html"]),
        ("wh-map", "F3 White House map", "Clicked a real map region (not empty)", "Landed in that building room", ["sites/whitehouse/index.html", "sites/whitehouse/map.html"], ["sites/yahoo/index.html"]),
        ("yahoo-wander", "F4 Yahoo 3-hub", "Opened Computers hub", "Opened Entertainment + News (3 hubs)", ["sites/yahoo/index.html"], ["sites/ncsa/index.html"]),
        ("whatsnew", "F5 What’s New / NCSA", "Opened a dated What’s New item", "Item id would persist", ["sites/ncsa/index.html", "sites/ncsa/whats-new.html"], ["sites/csotd/index.html"]),
    ],
    1995: [
        ("homestead", "F1 Homestead", "Neighborhood + title filled", "Published then visited my page", ["sites/geocities/homestead.html", "sites/geocities/index.html"], ["sites/auctionweb/index.html"]),
        ("aw-bid", "F2 AuctionWeb bid", "Low bid confirmed", "Never named eBay", ["sites/auctionweb/index.html"], ["sites/altavista/index.html"]),
        ("av", "F3 AltaVista catalog", "Query was not empty", "Last query persists on the list", ["sites/altavista/index.html"], ["sites/hotwired/index.html"]),
        ("hotwired", "F4 HotWired 3 departments", "Hopped three departments", "Third hop is the write", ["sites/hotwired/index.html"], ["sites/netscape/index.html"]),
        ("cool", "F5 What’s Cool", "Clicked Cool/New and landed", "Next is SSL view — not a second checkout", ["sites/netscape/index.html"], ["sites/amazon/ssl-checkout.html"]),
    ],
    1996: [
        ("myportal", "F1 My portal", "Moved 2 widgets on My Yahoo or My Excite", "0–1 move would not write", ["sites/yahoo/index.html", "sites/portals/wars.html"], ["sites/hotmail/index.html"]),
        ("hotmail", "F2 HoTMaiL compose", "To + body filled", "Empty compose blocked", ["sites/hotmail/index.html"], ["sites/spacejam/index.html"]),
        ("jam", "F3 Space Jam 3 planets", "Opened three planet pages", "Fewer than 3 would not write", ["sites/spacejam/index.html"], ["sites/realplayer/index.html"]),
        ("real", "F4 RealPlayer buffer", "Buffer theater finished", "Skip-bar would not write", ["sites/realplayer/index.html", "sites/plugin/index.html"], ["sites/angelfire/index.html", "sites/geocities/index.html"]),
        ("gb", "F5 Guestbook", "Name at least 2 characters", "Next is portal wars star", ["sites/angelfire/index.html", "sites/geocities/index.html"], ["sites/portals/wars.html"]),
    ],
    1997: [
        ("slashdot", "F1 Slashdot moderate", "Comment was not empty", "Score / moderate persisted", ["sites/slashdot/index.html"], ["sites/ebay/index.html"]),
        ("ebay-bid", "F2 eBay bid", "Bid confirmed", "Black wordmark — not modern rainbow", ["sites/ebay/index.html"], ["sites/icq/index.html"]),
        ("icq-buddy", "F3 ICQ buddy", "Buddy / UIN added", "Empty UIN blocked", ["sites/icq/index.html"], ["sites/apple/index.html"]),
        ("td", "F4 Think Different", "Hopped 2 product pages", "1997 TBWA campaign literacy", ["sites/apple/index.html"], ["sites/drudge/index.html"]),
        ("drudge", "F5 Drudge story", "Opened a headline then the story", "Next is PointCast star", ["sites/drudge/index.html"], ["sites/pointcast/index.html"]),
    ],
    1998: [
        ("babelfish", "F1 Babel Fish", "Typed text + language pair", "Empty text blocked", ["sites/altavista/index.html", "sites/infoseek/index.html"], ["sites/google/index.html"]),
        ("google-q", "F2 Google catalog", "Query ran catalog results (not Lucky)", "No 2005 Google skin", ["sites/google/index.html"], ["sites/amazon/index.html"]),
        ("amzn-cd", "F3 Amazon Music CD", "Added a CD to the residual cart", "1998 music store — not SSL star", ["sites/amazon/index.html"], ["sites/dmoz/index.html"]),
        ("dmoz", "F4 DMOZ 2-level", "Drilled two category levels", "One level would not write", ["sites/dmoz/index.html"], ["sites/mozilla/index.html", "sites/netscape/index.html"]),
        ("mozilla", "F5 Mozilla split", "netscape.org vs mozilla.org both checked", "Next is Lucky star", ["sites/mozilla/index.html", "sites/netscape/index.html"], ["sites/google/lucky.html"]),
    ],
    1999: [
        ("napster", "F1 Napster search", "Query was not empty", "Zero-file honesty — no real MP3", ["sites/napster/index.html"], ["sites/blogger/index.html"]),
        ("blogger", "F2 Blogger permalink", "Published with a title", "Permalink would persist", ["sites/blogger/index.html"], ["sites/paypal/index.html"]),
        ("paypal", "F3 PayPal send residual", "Amount + name theater", "No money moved", ["sites/paypal/index.html"], ["sites/ebay/index.html"]),
        ("ebay", "F4 eBay watch", "Watched a listing", "Browse + watch persist", ["sites/ebay/index.html"], ["sites/y2k/index.html"]),
        ("y2k", "F5 Y2K literacy", "Two Y2K checks ticked", "Keep Hampster / Zombo weather", ["sites/y2k/index.html"], ["sites/aim/index.html"]),
    ],
    2000: [
        ("ebay-watch", "F1 eBay watch+bid", "Watchlist then bid confirm", "Reload would show the bid", ["sites/ebay/index.html"], ["sites/pets/index.html"]),
        ("pets", "F2 Pets shop→shutdown", "Opened the shop", "9 Nov 2000 cease-orders honesty", ["sites/pets/index.html"], ["sites/amazon/index.html"]),
        ("amzn", "F3 Amazon smile cart", "Cart persist (not 1995 SSL)", "Smile-era A-to-Z", ["sites/amazon/index.html"], ["sites/napster/index.html"]),
        ("nap-legal", "F4 Napster legal", "Hopped 2 legal/news pages", "Injunction class — no files", ["sites/napster/index.html"], ["sites/flash4/index.html", "sites/macromedia/index.html"]),
        ("flash", "F5 Flash 4 nag", "Download theater only", "No SWF payload", ["sites/flash4/index.html", "sites/macromedia/index.html"], ["sites/mapquest/index.html"]),
    ],
    2001: [
        ("wiki-pages", "F1 Wiki edit→history", "Preview never writes", "Save then history row", ["sites/wikipedia/index.html"], ["sites/apple/index.html"]),
        ("ipod", "F2 iPod library", "iTunes 2 library (no Store)", "1,000 songs in your pocket literacy", ["sites/apple/index.html"], ["sites/wayback/index.html"]),
        ("wayback", "F3 Wayback lookup", "Query theater not empty", "Lookup persists", ["sites/wayback/index.html"], ["sites/movabletype/index.html"]),
        ("mt", "F4 Movable Type", "Title was not empty", "Publish residual", ["sites/movabletype/index.html"], ["sites/broadband/index.html", "sites/isp/index.html"]),
        ("bb", "F5 Always-on ISP", "Two Pew / always-on checks", "Next is MSN star", ["sites/broadband/index.html", "sites/isp/index.html"], ["sites/msn/index.html"]),
    ],
    2002: [
        ("netflix-q", "F1 Netflix queue", "Added then reordered", "Empty add blocked · DVD queue", ["sites/netflix/index.html"], ["sites/friendster/index.html"]),
        ("fs", "F2 Friendster testimonial", "Profile + testimonial", "2002 launch · mass often 2003 honesty", ["sites/friendster/index.html"], ["sites/kazaa/index.html"]),
        ("kazaa", "F3 KaZaA search", "Search theater", "NO files", ["sites/kazaa/index.html"], ["sites/wired/index.html"]),
        ("wired", "F4 Wired CSS article", "Opened the CSS article", "2002 Wired News literacy", ["sites/wired/index.html"], ["sites/googlenews/index.html"]),
        ("gnews", "F5 Google News BETA", "Headline click persist", "Next is Stumble star", ["sites/googlenews/index.html"], ["sites/stumbleupon/index.html"]),
    ],
    2003: [
        ("itunes", "F1 iTunes 99¢", "Browse + 1-click residual", "Mac-only at launch · no audio", ["sites/itunes/index.html"], ["sites/wordpress/index.html"]),
        ("wp", "F2 WordPress publish", "Title not empty", "27 May 2003 class", ["sites/wordpress/index.html"], ["sites/linkedin/index.html"]),
        ("li", "F3 LinkedIn invite", "Invite persist", "May 2003", ["sites/linkedin/index.html"], ["sites/myspace/index.html"]),
        ("ms-top8", "F4 MySpace Top 8", "Saved 8 friends", "Fewer than 8 would not write", ["sites/myspace/index.html"], ["sites/adsense/index.html"]),
        ("adsense", "F5 AdSense report", "Stats residual viewed", "Next is Photobucket star", ["sites/adsense/index.html"], ["sites/photobucket/index.html"]),
    ],
    2004: [
        ("flickr", "F1 Flickr stream", "Filename + tag", "Not Yahoo-owned yet", ["sites/flickr/index.html"], ["sites/gmail/index.html"]),
        ("gmail", "F2 Gmail invite", "Compose invite", "1 Apr 2004 · 1 GB · invite wall", ["sites/gmail/index.html"], ["sites/firefox/index.html"]),
        ("fx", "F3 Firefox 1.0 thanks", "Download-thanks persist", "Nov 2004", ["sites/firefox/index.html"], ["sites/digg/index.html"]),
        ("digg", "F4 Digg seed vote", "Vote persist", "Dec 2004 seed", ["sites/digg/index.html"], ["sites/folklore/index.html"]),
        ("folk", "F5 folklore story", "Opened a Macintosh story", "Next is networks star", ["sites/folklore/index.html"], ["sites/facebook/networks.html", "sites/facebook/index.html"]),
    ],
    2005: [
        ("yt", "F1 YouTube like", "Watch then like", "Independent 2005 — not Google-owned", ["sites/youtube/index.html"], ["sites/maps/index.html"]),
        ("maps", "F2 Maps last view", "Pan theater persist", "8 Feb 2005 Bret Taylor", ["sites/maps/index.html"], ["sites/reddit/index.html"]),
        ("reddit", "F3 Reddit upvote", "Upvote persist", "2005 launch", ["sites/reddit/index.html"], ["sites/digg/index.html"]),
        ("digg", "F4 Digg bury", "Bury / promote persist", "Not the 2006 front-page star", ["sites/digg/index.html"], ["sites/housingmaps/index.html"]),
        ("hm", "F5 Housing Maps", "Mashup 2-check", "Next is Pandora star", ["sites/housingmaps/index.html"], ["sites/pandora/index.html"]),
    ],
    2006: [
        ("digg", "F1 Digg front page", "Submit / bury to front", "2006 peak", ["sites/digg/index.html"], ["sites/facebook/index.html"]),
        ("feed", "F2 News Feed click", "Story persist", "Sep 2006 feed invented", ["sites/facebook/index.html"], ["sites/youtube/index.html"]),
        ("yt", "F3 YT Google-owns", "2005 independent + Oct 2006 dual-date", "Both checks required", ["sites/youtube/index.html"], ["sites/docs/index.html"]),
        ("docs", "F4 Google Docs", "Create residual persist", "Writely era", ["sites/docs/index.html"], ["sites/time-you/index.html"]),
        ("time-you", "F5 Time You", "Person of the Year 2006 2-check", "Next is Twitter star", ["sites/time-you/index.html"], ["sites/twitter/index.html"]),
    ],
    2007: [
        ("streetview", "F1 Street View pano", "Last pano persist", "May 2007", ["sites/maps/index.html", "sites/google/index.html"], ["sites/gmail/index.html"]),
        ("gmail", "F2 Gmail open send", "No invite wall · To not empty", "Open Feb 2007", ["sites/gmail/index.html"], ["sites/facebook/index.html"]),
        ("fb-app", "F3 Platform app", "Add residual persist", "F8 2007", ["sites/facebook/index.html"], ["sites/twitter/index.html"]),
        ("tw", "F4 Twitter SXSW", "Compose persist", "Not the 2006 star rewrite", ["sites/twitter/index.html"], ["sites/kindle/index.html"]),
        ("kindle-ack", "F5 Kindle literacy", "Nov 2007 2-check", "Next is iPhone Safari star", ["sites/kindle/index.html"], ["sites/iphone/index.html"]),
    ],
    2008: [
        ("appstore", "F1 App Store library", "Confirm Get then library", "10 Jul 2008 · 500 apps", ["sites/appstore/index.html"], ["sites/chrome/index.html"]),
        ("chrome", "F2 Chrome 3-check", "Speed · tabs · omnibox", "2 Sep 2008 Windows-only honesty", ["sites/chrome/index.html"], ["sites/android/index.html"]),
        ("g1", "F3 Android Market", "G1 browse persist", "Oct 2008", ["sites/android/index.html"], ["sites/hulu/index.html"]),
        ("hulu", "F4 Hulu queue", "Add persist", "Mar 2008", ["sites/hulu/index.html"], ["sites/dropbox/index.html"]),
        ("db", "F5 Dropbox folder", "Empty-folder residual", "Next is GitHub star", ["sites/dropbox/index.html"], ["sites/github/issue.html", "sites/github/index.html"]),
    ],
    2009: [
        ("foursquare", "F1 Foursquare check-in", "Venue + shout", "11 Mar 2009 SXSW", ["sites/foursquare/index.html", "sites/foursquarecheckin/index.html"], ["sites/farmville/index.html"]),
        ("farm", "F2 FarmVille neighbor", "3s grow + neighbor", "19 Jun 2009", ["sites/farmville/index.html"], ["sites/bing/index.html"]),
        ("bing", "F3 Bing catalog", "Query persist", "Jun 2009 Decision Engine", ["sites/bing/index.html"], ["sites/stackoverflow/index.html"]),
        ("so-accepted", "F4 SO accept", "Accepted-answer trail", "Not the Like star", ["sites/stackoverflow/index.html"], ["sites/windows7/index.html"]),
        ("w7", "F5 Win7 / IE8", "Two product hops", "Next is Like star", ["sites/windows7/index.html"], ["sites/facebook/feed.html", "sites/facebook/index.html"]),
    ],
    2013: [
        ("tinder", "F1 Tinder trail", "Swipe literacy", "2013 Best New Startup class", ["sites/tinder/index.html"], ["sites/snapchat/index.html"]),
        ("snap-story", "F2 Snap 24h", "Oct 2013 Stories + 24h expire", "Not Instagram Stories 2016", ["sites/snapchat/index.html"], ["sites/instagram/index.html"]),
        ("igvid", "F3 IG Video 15s", "15s + not-Reels", "20 Jun 2013", ["sites/instagram/index.html"], ["sites/iphone/index.html"]),
        ("ios7", "F4 iOS 7 / Touch ID", "Flat UI + Touch ID 2-check", "iPhone 5s", ["sites/iphone/index.html"], ["sites/snowden/index.html"]),
        ("snowden", "F5 Snowden Jun 2013", "Verizon + PRISM 2-check", "Next is Vine record star", ["sites/snowden/index.html"], ["sites/vine/record.html", "sites/vine/index.html"]),
    ],
    2014: [
        ("twitch", "F1 Twitch chat", "Send then reload thread", "Empty send blocked", ["sites/twitch/index.html"], ["sites/slack/index.html"]),
        ("slack", "F2 Slack trail", "Workspace pick", "Do not star Slack", ["sites/slack/index.html"], ["sites/heartbleed/index.html"]),
        ("hb", "F3 Heartbleed rotate", "Password-rotate literacy", "NO exploit · CVE-2014-0160", ["sites/heartbleed/index.html"], ["sites/icebucket/index.html"]),
        ("ice", "F4 Ice Bucket", "Share residual", "ALS official", ["sites/icebucket/index.html"], ["sites/billion/index.html", "sites/iphone/index.html"]),
        ("1b", "F5 iPhone 6 + 1B sites", "6/6 Plus + Sep 1B websites", "Next is WhatsApp star", ["sites/billion/index.html", "sites/iphone/index.html"], ["sites/whatsapp/index.html"]),
    ],
    2015: [
        ("discord", "F1 Discord trail", "Server pick", "Do not star Discord", ["sites/discord/index.html"], ["sites/windows10/index.html"]),
        ("win10", "F2 Win10 / GWX", "29 Jul 2015 free upgrade", "Get Windows honesty", ["sites/windows10/index.html"], ["sites/periscope/index.html", "sites/fblive/index.html"]),
        ("live", "F3 Periscope / FB Live", "Go-live literacy", "Mentions-celebs-only 2015", ["sites/periscope/index.html", "sites/fblive/index.html"], ["sites/applemusic/index.html", "sites/apple/index.html"]),
        ("music", "F4 Apple Music", "30 Jun station persist", "Trial never writes the star", ["sites/applemusic/index.html", "sites/apple/index.html"], ["sites/googlephotos/index.html", "sites/ios9/index.html"]),
        ("photos", "F5 Photos + iOS 9 blockers", "Unlimited HQ + blockers", "Next is Watch star", ["sites/googlephotos/index.html", "sites/ios9/index.html"], ["sites/apple/watch.html", "sites/apple/index.html"]),
    ],
    2016: [
        ("musically", "F1 musical.ly", "Sound → clip residual", "NOT TikTok", ["sites/musically/index.html"], ["sites/dyn/index.html"]),
        ("dyn", "F2 Dyn", "21 Oct 2016 2-check", "NO exploit", ["sites/dyn/index.html"], ["sites/stem/index.html"]),
        ("stem", "F3 STEM", "Chirp or Game 4", "1-check would not write — two required", ["sites/stem/index.html"], ["sites/jio/index.html"]),
        ("jio", "F4 Jio", "Welcome Offer through 31 Dec", "100M is 2017 lookback", ["sites/jio/index.html"], ["sites/facebook/index.html"]),
        ("mkt", "F5 Marketplace", "No-pay local list", "Next is Stories star", ["sites/facebook/index.html"], ["sites/instagram/stories.html", "sites/instagram/index.html"]),
    ],
    2017: [
        ("netflix", "F1 Netflix My List", "Title → add → row", "Not a 2016 star rewrite", ["sites/netflix/index.html"], ["sites/fortnite/index.html"]),
        ("fn", "F2 Fortnite literacy", "BR 26 Sep 2017", "No official art", ["sites/fortnite/index.html"], ["sites/twitter/index.html"]),
        ("280", "F3 Twitter 280", "7 Nov 2017 compose", "Empty tweet blocked", ["sites/twitter/index.html"], ["sites/wannacry/index.html"]),
        ("wc", "F4 WannaCry", "12 May 2017 literacy", "NO exploit", ["sites/wannacry/index.html"], ["sites/vine/index.html"]),
        ("vine-gone", "F5 Vine gone", "17 Jan 2017 archive honesty", "Next is Face ID star", ["sites/vine/index.html"], ["sites/iphone/x.html", "sites/iphone/index.html"]),
    ],
    2018: [
        ("tiktok-fyp", "F1 TikTok FYP", "musical.ly merge 2 Aug 2018", "Empty caption blocked", ["sites/tiktok/index.html"], ["sites/trust/index.html", "sites/facebook/index.html"]),
        ("hearing", "F2 Hearing", "Break + 10 Apr sit 2-check", "Not a meme", ["sites/trust/index.html", "sites/facebook/index.html"], ["sites/instagram/index.html"]),
        ("igtv", "F3 IGTV", "20 Jun 2018 residual", "Hour-class vertical — not Reels", ["sites/instagram/index.html"], ["sites/chrome/index.html"]),
        ("notsec", "F4 Chrome Not Secure", "Chrome 68 Jul 2018", "HTTP marked Not Secure", ["sites/chrome/index.html"], ["sites/spectre/index.html"]),
        ("spectre", "F5 Spectre / HomePod", "Jan 3 + HomePod Feb", "NO exploit", ["sites/spectre/index.html"], ["sites/gdpr/index.html"]),
    ],
    2020: [
        ("quibi-ep", "F1 Quibi 6-min", "Show → episode → gone", "Apr–Oct 2020", ["sites/quibi/index.html"], ["sites/instagram/index.html"]),
        ("reels", "F2 Reels 15s", "5 Aug 2020", "Not Stories", ["sites/instagram/index.html"], ["sites/flash/index.html"]),
        ("flash", "F3 Flash EOL", "31 Dec 2020 Adobe", "Literacy — no SWF", ["sites/flash/index.html"], ["sites/ccpa/index.html"]),
        ("ccpa", "F4 CCPA", "1 Jan 2020", "Do Not Sell literacy", ["sites/ccpa/index.html"], ["sites/acnh/index.html"]),
        ("acnh", "F5 ACNH", "20 Mar 2020 + Meet chip", "Next is Zoom star", ["sites/acnh/index.html"], ["sites/zoom/index.html"]),
    ],
}

STARS = {
    1994: ("sites/csotd/index.html", "CSotD guestbook"),
    1995: ("sites/amazon/ssl-checkout.html", "SSL view — not a second checkout"),
    1996: ("sites/portals/wars.html", "Portal wars"),
    1997: ("sites/pointcast/index.html", "PointCast"),
    1998: ("sites/google/lucky.html", "I’m Feeling Lucky"),
    1999: ("sites/aim/index.html", "AIM"),
    2000: ("sites/mapquest/index.html", "MapQuest"),
    2001: ("sites/msn/index.html", "MSN"),
    2002: ("sites/stumbleupon/index.html", "Stumble"),
    2003: ("sites/photobucket/index.html", "Photobucket"),
    2004: ("sites/facebook/networks.html", "thefacebook networks"),
    2005: ("sites/pandora/index.html", "Pandora"),
    2006: ("sites/twitter/index.html", "Twitter 140"),
    2007: ("sites/iphone/index.html", "iPhone Safari"),
    2008: ("sites/github/issue.html", "GitHub"),
    2009: ("sites/facebook/feed.html", "Like"),
    2013: ("sites/vine/record.html", "Vine 6s"),
    2014: ("sites/whatsapp/index.html", "WhatsApp"),
    2015: ("sites/apple/watch.html", "Apple Watch"),
    2016: ("sites/instagram/stories.html", "IG Stories"),
    2017: ("sites/iphone/x.html", "Face ID"),
    2018: ("sites/gdpr/index.html", "GDPR Manage"),
    2019: ("sites/disneyplus/home.html", "Disney+ Continue"),
    2020: ("sites/zoom/index.html", "Zoom mute/leave"),
}

# Already have F-room machines; still need chips / maps where noted
SKIP_ROOM_INJECT = {2010, 2011, 2012}

CHIP_ONLY = {2019}  # F rooms already live


def first_existing(year: int, cands: list[str]) -> str | None:
    for rel in cands:
        if (ROOT / "years" / str(year) / rel).exists():
            return rel
    return None


def rel_href(from_rel: str, to_rel: str) -> str:
    """Relative href from one years/Y/sites/... file to another years/Y/... file."""
    src = Path(from_rel).parent
    dst = Path(to_rel)
    try:
        return Path(dst).relative_to(src).as_posix() if False else _rel(src, dst)
    except Exception:
        return _rel(src, dst)


def _rel(src: Path, dst: Path) -> str:
    src_parts = src.parts
    dst_parts = dst.parts
    i = 0
    while i < min(len(src_parts), len(dst_parts)) and src_parts[i] == dst_parts[i]:
        i += 1
    up = [".."] * (len(src_parts) - i)
    down = list(dst_parts[i:])
    return "/".join(up + down) if (up or down) else dst.name


def panel_html(year: int, suffix: str, label: str, a: str, b: str, next_rel: str | None, from_rel: str) -> str:
    key = f"itt{str(year)[2:]}-{suffix}"
    nxt = ""
    if next_rel:
        href = rel_href(from_rel, next_rel)
        nxt = (
            f'<p hidden data-next-flow data-itt{str(year)[2:]}-next '
            f'data-next-when-key="{key}" style="margin:8px 0 0">'
            f'Next: <a href="{href}">{Path(next_rel).parent.name}</a></p>'
        )
    return f"""
<div class="itt-5x-loop" data-5x-loop data-5x-year="{year}" data-5x-suffix="{suffix}" id="ott-5x-f-{suffix}" style="margin:12px 0;padding:10px;border:2px solid #f9a825;background:#fff8e1;font-family:Arial,sans-serif;font-size:13px;max-width:46em">
<p style="margin:0 0 6px"><b>5× {label}</b> · incomplete never writes · key <code>{key}</code></p>
<label style="display:block;margin:4px 0"><input type="checkbox" data-5x-req="a"> {a}</label>
<label style="display:block;margin:4px 0"><input type="checkbox" data-5x-req="b"> {b}</label>
<p style="margin:8px 0 0"><button type="button" data-5x-save>Save 5× REAL</button> <span data-5x-status></span></p>
{nxt}
</div>
"""


def inject_panel(path: Path, snippet: str) -> bool:
    text = path.read_text(encoding="utf-8", errors="replace")
    if "data-5x-loop" in text and "data-5x-suffix" in snippet:
        suf = re.search(r'data-5x-suffix="([^"]+)"', snippet)
        if suf and f'data-5x-suffix="{suf.group(1)}"' in text:
            return False
    if "</body>" in text.lower():
        # case-preserving
        idx = text.lower().rfind("</body>")
        path.write_text(text[:idx] + snippet + "\n" + text[idx:], encoding="utf-8")
        return True
    path.write_text(text.rstrip() + "\n" + snippet + "\n", encoding="utf-8")
    return True


def inject_home_chips(year: int, flows: list, star_rel: str, star_name: str) -> bool:
    home = ROOT / "years" / str(year) / "pages" / "home.html"
    if not home.exists():
        return False
    text = home.read_text(encoding="utf-8", errors="replace")
    if f'id="ott-5x-{year}"' in text:
        return False
    links = []
    for i, fl in enumerate(flows, 1):
        room = first_existing(year, fl[4])
        if not room:
            continue
        links.append(f'<a href="../{room}">{fl[1]}</a>')
    links.append(f'<a href="../{star_rel}">★ {star_name}</a>')
    chip = (
        f'\n<p class="itt-5x-trails" id="ott-5x-{year}" '
        f'style="margin:10px 0;padding:10px;background:#fff8e1;border:1px solid #f9a825;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:48em">'
        f"<b>5× trails (also · star stays {star_name}):</b> "
        + " → ".join(links)
        + "</p>\n"
    )
    m = re.search(rf'(id="ott-guided-{year}"[\s\S]*?</ol>\s*</div>)', text)
    if m:
        text = text[: m.end()] + chip + text[m.end() :]
    else:
        m2 = re.search(r'(data-ott-one-thing="\d+"[^>]*>.*?</a>\s*</p>)', text, re.I | re.S)
        if m2:
            text = text[: m2.end()] + chip + text[m2.end() :]
        else:
            text = text.replace("<body", "<body", 1)
            text = re.sub(r"(<div id=\"itt-nav-slot\"[^>]*>\s*</div>)", r"\1" + chip, text, count=1)
    home.write_text(text, encoding="utf-8")
    return True


def patch_flow_map(year: int, flows: list, star_rel: str, star_name: str) -> bool:
    p = ROOT / "js/config/flow-maps.js"
    text = p.read_text(encoding="utf-8")
    key = f'ITT.flowMaps["{year}"]'
    if key not in text:
        return False
    if f'"label": "5× F1–F5 · {year}"' in text or f"5× F1–F5 · {year}" in text:
        return False
    sites = []
    for fl in flows:
        room = first_existing(year, fl[4])
        if not room:
            continue
        sites.append(
            {
                "name": fl[1],
                "href": room,
                "do": f"{fl[2]} → itt{str(year)[2:]}-{fl[0]}",
            }
        )
    sites.append({"name": f"Star {star_name}", "href": star_rel, "do": "locked star · empty never writes"})
    branch = {
        "label": f"5× F1–F5 · {year}",
        "do": "REAL leftover loops · incomplete never writes",
        "sites": sites,
    }
    blob = json.dumps(branch, indent=10)
    # insert after first "branches": [
    pat = rf'({re.escape(key)}[\s\S]*?"branches"\s*:\s*\[)'
    m = re.search(pat, text)
    if not m:
        return False
    insert = m.group(1) + "\n      " + blob + ",\n"
    text = text[: m.start()] + insert + text[m.end() :]
    p.write_text(text, encoding="utf-8")
    return True


def write_e2e(year: int, flows: list) -> None:
    if year in SKIP_ROOM_INJECT:
        return
    dest = ROOT / "e2e" / f"{year}-5x-live.spec.js"
    if dest.exists() and year in {2010, 2011, 2012, 2019}:
        return
    lines = [
        "// @ts-check",
        f"/** {year} 5× live — incomplete never writes · Next along the locked chain. */",
        "const { test, expect } = require('@playwright/test');",
        "",
        "async function getKey(page, key) { return page.evaluate((k) => localStorage.getItem(k), key); }",
        "",
        f"test.describe('{year} 5× live F1–F5', () => {{",
    ]
    for fl in flows:
        room = first_existing(year, fl[4])
        nxt = first_existing(year, fl[5]) if fl[5] else None
        if not room:
            continue
        suffix = fl[0]
        key = f"itt{str(year)[2:]}-{suffix}"
        href = f"/years/{year}/{room}"
        nxt_frag = Path(nxt).as_posix() if nxt else ""
        lines += [
            f"  test('{fl[1]} empty never writes', async ({{ page }}) => {{",
            f"    await page.goto('{href}');",
            f"    await page.evaluate((k) => {{ try {{ localStorage.removeItem(k); }} catch (e) {{}} }}, '{key}');",
            "    await page.reload();",
            "    const save = page.locator('[data-5x-save]').first();",
            "    await expect(save).toBeVisible();",
            "    await save.click();",
            f"    await expect.poll(async () => getKey(page, '{key}')).toBeFalsy();",
            "    await page.locator('[data-5x-req=\"a\"]').check();",
            "    await page.locator('[data-5x-req=\"b\"]').check();",
            "    await save.click();",
            f"    await expect.poll(async () => getKey(page, '{key}'), {{ timeout: 8000 }}).toBeTruthy();",
            f"    const raw = (await getKey(page, '{key}')) || '';",
            "    expect(raw).toMatch(/real|multiStep/i);",
        ]
        if nxt_frag:
            # match a distinctive path fragment
            frag = Path(nxt).name if Path(nxt).name != "index.html" else Path(nxt).parent.name
            lines.append(
                f"    await expect(page.locator('[data-itt{str(year)[2:]}-next] a[href*=\"{frag}\"]')).toHaveCount(1);"
            )
        lines += ["  });", ""]
    lines.append("});")
    lines.append("")
    dest.write_text("\n".join(lines), encoding="utf-8")


def patch_package() -> None:
    p = ROOT / "package.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    scripts = data.setdefault("scripts", {})
    for year in sorted(PACKS):
        key = f"test:e2e:{year}"
        spec = f"e2e/{year}-5x-live.spec.js"
        if key in scripts:
            if spec not in scripts[key]:
                scripts[key] = scripts[key].replace(" --workers=1", f" {spec} --workers=1")
                if spec not in scripts[key]:
                    scripts[key] += f" && playwright test {spec} --workers=1"
        else:
            scripts[key] = f"playwright test {spec} --workers=1"
    specs = " ".join(f"e2e/{y}-5x-live.spec.js" for y in sorted(set(PACKS) | {2010, 2011, 2012, 2019}))
    scripts["test:e2e:5x-all"] = f"playwright test {specs} --workers=1"
    p.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    stats = {"rooms": 0, "homes": 0, "maps": 0, "e2e": 0, "missing": []}
    for year, flows in PACKS.items():
        star_rel, star_name = STARS[year]
        if not (ROOT / "years" / str(year) / star_rel).exists():
            # star fallback
            for alt in (star_rel.replace("networks.html", "index.html"), star_rel.replace("feed.html", "index.html"), star_rel.replace("record.html", "index.html"), star_rel.replace("x.html", "index.html"), star_rel.replace("watch.html", "index.html"), star_rel.replace("stories.html", "index.html"), star_rel.replace("lucky.html", "index.html"), star_rel.replace("issue.html", "index.html"), star_rel.replace("ssl-checkout.html", "index.html"), star_rel.replace("wars.html", "index.html")):
                if (ROOT / "years" / str(year) / alt).exists():
                    star_rel = alt
                    break
        if year not in SKIP_ROOM_INJECT and year not in CHIP_ONLY:
            for i, fl in enumerate(flows):
                room = first_existing(year, fl[4])
                if not room:
                    stats["missing"].append(f"{year} {fl[0]} {fl[4]}")
                    continue
                nxt = first_existing(year, fl[5]) if fl[5] else star_rel
                snippet = panel_html(year, fl[0], fl[1], fl[2], fl[3], nxt, room)
                if inject_panel(ROOT / "years" / str(year) / room, snippet):
                    stats["rooms"] += 1
        if inject_home_chips(year, flows, star_rel, star_name):
            stats["homes"] += 1
        if year == 2019 or year not in SKIP_ROOM_INJECT:
            if patch_flow_map(year, flows, star_rel, star_name):
                stats["maps"] += 1
        write_e2e(year, flows)
        stats["e2e"] += 1
    # 2010–12 chips already exist; still ensure 2010-12 maps labeled
    patch_package()
    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
