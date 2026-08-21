#!/usr/bin/env python3
"""Generate js/config/flow-trails.js and verify hrefs exist. Run from repo root."""
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# n, name, href, match, whenKey or "", nextHref, nextLabel
TRAILS = {
    "1994": [
        (1, "CSotD guestbook", "sites/csotd/index.html", "/csotd/", "itt94-csotd", "sites/yahoo/index.html", "Browse Yahoo · don't search"),
        (2, "Yahoo drill", "sites/yahoo/index.html", "/yahoo/", "itt94-yahoo-wander", "sites/cern/index.html", "CERN / WWW"),
        (3, "Mosaic origin", "sites/cern/index.html", "/cern/", "", "sites/ncsa/index.html", "NCSA Mosaic"),
        (4, "Fish Cam", "sites/fishcam/index.html", "/fishcam/", "itt94-fishcam", "sites/whitehouse/index.html", "White House"),
        (5, "White House", "sites/whitehouse/index.html", "/whitehouse/", "itt94-wh-map", "sites/nasa/index.html", "NASA"),
        (6, "NASA", "sites/nasa/index.html", "/nasa/", "", "sites/iuma/listen.html", "IUMA"),
        (7, "IUMA listen", "sites/iuma/listen.html", "/iuma/", "itt94-iuma", "sites/hotwired/index.html", "HotWired"),
        (8, "HotWired", "sites/hotwired/index.html", "/hotwired/", "", "sites/lycos/index.html", "Lycos"),
        (9, "Lycos catalog", "sites/lycos/index.html", "/lycos/", "itt94-lycos", "sites/csotd/index.html", "Cool Site of the Day"),
        (10, "Year game", "sites/playable/game.html", "/playable/", "itt94-game-hotlist", "sites/csotd/index.html", "CSotD guestbook"),
    ],
    "1995": [
        (1, "SSL checkout", "sites/amazon/ssl-checkout.html", "/amazon/ssl-checkout", "itt95-ssl-checkout", "sites/auctionweb/index.html", "Bid higher · AuctionWeb"),
        (2, "Amazon book", "sites/amazon/index.html", "/amazon/", "", "sites/amazon/ssl-checkout.html", "SSL checkout"),
        (3, "AuctionWeb bid", "sites/auctionweb/item-laser.html", "/auctionweb/", "itt95-aw-bid", "sites/geocities/homestead.html", "GeoCities homestead"),
        (4, "GeoCities homestead", "sites/geocities/homestead.html", "/geocities/", "itt95-homestead", "sites/yahoo/index.html", "Yahoo directory"),
        (5, "Yahoo directory", "sites/yahoo/index.html", "/yahoo/", "", "sites/altavista/index.html", "AltaVista"),
        (6, "AltaVista", "sites/altavista/index.html", "/altavista/", "itt95-av", "sites/cnn/index.html", "CNN"),
        (7, "CNN", "sites/cnn/index.html", "/cnn/", "", "sites/microsoft/index.html", "Microsoft"),
        (8, "Microsoft", "sites/microsoft/index.html", "/microsoft/", "", "sites/netscape/index.html", "Netscape"),
        (9, "Netscape", "sites/netscape/index.html", "/netscape/", "itt95-ns-dl", "sites/amazon/index.html", "Amazon books"),
        (10, "Classmates", "sites/classmates/index.html", "/classmates/", "", "sites/amazon/ssl-checkout.html", "SSL checkout"),
    ],
    "1996": [
        (1, "Portal wars", "sites/portals/wars.html", "/portals/", "itt96-portal-wars", "sites/hotmail/index.html", "HoTMaiL"),
        (2, "HoTMaiL", "sites/hotmail/index.html", "/hotmail/", "itt96-hotmail-user", "sites/spacejam/index.html", "Space Jam"),
        (3, "Space Jam", "sites/spacejam/index.html", "/spacejam/", "itt96-jam", "sites/yahoo/my.html", "My Yahoo!"),
        (4, "My Yahoo", "sites/yahoo/my.html", "/yahoo/", "", "sites/geocities/index.html", "GeoCities"),
        (5, "GeoCities", "sites/geocities/index.html", "/geocities/", "", "sites/amazon/index.html", "Amazon"),
        (6, "Amazon", "sites/amazon/index.html", "/amazon/", "", "sites/auctionweb/index.html", "AuctionWeb"),
        (7, "AuctionWeb", "sites/auctionweb/index.html", "/auctionweb/", "", "sites/excite/index.html", "Excite"),
        (8, "Excite", "sites/excite/index.html", "/excite/", "", "sites/altavista/index.html", "AltaVista"),
        (9, "AltaVista", "sites/altavista/index.html", "/altavista/", "", "sites/portals/wars.html", "Portal wars"),
        (10, "Year game", "sites/playable/game.html", "/playable/", "itt96-game-planets", "sites/portals/wars.html", "Portal wars"),
    ],
    "1997": [
        (1, "PointCast", "sites/pointcast/index.html", "/pointcast/", "itt97-pointcast", "sites/icq/index.html", "ICQ sign-on"),
        (2, "ICQ", "sites/icq/index.html", "/icq/", "itt97-icq-buddy", "sites/ebay/item-laptop.html", "eBay laptop"),
        (3, "eBay laptop", "sites/ebay/item-laptop.html", "/ebay/", "", "sites/hotmail/index.html", "HoTMaiL"),
        (4, "HoTMaiL", "sites/hotmail/index.html", "/hotmail/", "", "sites/slashdot/index.html", "Slashdot"),
        (5, "Slashdot", "sites/slashdot/story.html", "/slashdot/", "itt97-sd-comments-ie4", "sites/drudge/index.html", "Drudge"),
        (6, "Drudge", "sites/drudge/index.html", "/drudge/", "itt97-drudge", "sites/hotbot/index.html", "HotBot"),
        (7, "HotBot", "sites/hotbot/index.html", "/hotbot/", "", "sites/aim/index.html", "AIM seed"),
        (8, "AIM seed", "sites/aim/index.html", "/aim/", "", "sites/apple/think-different.html", "Apple"),
        (9, "Apple", "sites/apple/think-different.html", "/apple/", "itt97-td", "sites/microsoft/index.html", "IE 4"),
        (10, "Microsoft", "sites/microsoft/index.html", "/microsoft/", "", "sites/pointcast/index.html", "PointCast"),
    ],
    "1998": [
        (1, "I'm Feeling Lucky", "sites/google/lucky.html", "/google/lucky", "itt98-lucky", "sites/yahoo/index.html", "Yahoo packed portal"),
        (2, "Google empty", "sites/google/index.html", "/google/", "", "sites/google/lucky.html", "I'm Feeling Lucky"),
        (3, "Yahoo packed", "sites/yahoo/index.html", "/yahoo/", "", "sites/amazon/music.html", "Amazon Music"),
        (4, "Amazon Music", "sites/amazon/music.html", "/amazon/", "", "sites/ebay/index.html", "eBay"),
        (5, "eBay", "sites/ebay/index.html", "/ebay/", "", "sites/cdnow/index.html", "CDnow"),
        (6, "CDnow", "sites/cdnow/index.html", "/cdnow/", "", "sites/hotmail/index.html", "HoTMaiL"),
        (7, "HoTMaiL", "sites/hotmail/index.html", "/hotmail/", "", "sites/mozilla/index.html", "Mozilla.org"),
        (8, "Mozilla.org", "sites/mozilla/index.html", "/mozilla/", "", "sites/slashdot/index.html", "Slashdot"),
        (9, "Slashdot", "sites/slashdot/index.html", "/slashdot/", "", "sites/dmoz/index.html", "Open Directory"),
        (10, "DMOZ", "sites/dmoz/index.html", "/dmoz/", "", "sites/google/lucky.html", "I'm Feeling Lucky"),
    ],
    "1999": [
        (1, "AIM sign-on", "sites/aim/index.html", "/aim/", "itt99-aim", "sites/napster/index.html", "Napster"),
        (2, "Napster", "sites/napster/search.html", "/napster/", "itt99-napster", "sites/google/index.html", "Google"),
        (3, "Google", "sites/google/index.html", "/google/", "", "sites/blogger/edit.html", "Blogger"),
        (4, "Blogger", "sites/blogger/edit.html", "/blogger/", "", "sites/y2k/index.html", "Y2K"),
        (5, "Y2K", "sites/y2k/index.html", "/y2k/", "itt99-y2k", "sites/sourceforge/index.html", "SourceForge"),
        (6, "SourceForge", "sites/sourceforge/index.html", "/sourceforge/", "", "sites/paypal/send.html", "PayPal"),
        (7, "PayPal", "sites/paypal/send.html", "/paypal/", "itt99-paypal", "sites/amazon/index.html", "Amazon"),
        (8, "Amazon", "sites/amazon/index.html", "/amazon/", "", "sites/ebay/item-laptop.html", "eBay"),
        (9, "eBay", "sites/ebay/item-laptop.html", "/ebay/", "", "sites/askjeeves/index.html", "Ask Jeeves"),
        (10, "Ask Jeeves", "sites/askjeeves/index.html", "/askjeeves/", "", "sites/aim/index.html", "AIM"),
    ],
    "2000": [
        (1, "MapQuest", "sites/mapquest/index.html", "/mapquest/", "itt00-mapquest", "sites/amazon/index.html", "Amazon smile"),
        (2, "Amazon smile", "sites/amazon/index.html", "/amazon/", "", "sites/ebay/index.html", "eBay"),
        (3, "eBay", "sites/ebay/item-laptop.html", "/ebay/", "", "sites/paypal/index.html", "PayPal"),
        (4, "PayPal", "sites/paypal/index.html", "/paypal/", "", "sites/napster/search.html", "Napster"),
        (5, "Napster", "sites/napster/search.html", "/napster/", "itt00-napster", "sites/gnutella/index.html", "Gnutella"),
        (6, "Gnutella", "sites/gnutella/index.html", "/gnutella/", "", "sites/pets/shop.html", "Pets.com"),
        (7, "Pets.com", "sites/pets/shop.html", "/pets/", "itt00-amazon-cart", "sites/google/index.html", "Google"),
        (8, "Google", "sites/google/index.html", "/google/", "", "sites/cnn/index.html", "CNN"),
        (9, "CNN", "sites/cnn/index.html", "/cnn/", "", "sites/blogger/index.html", "Blogger"),
        (10, "Y2K", "sites/y2k/index.html", "/y2k/", "", "sites/mapquest/index.html", "MapQuest"),
    ],
    "2001": [
        (1, "Wikipedia edit", "sites/wikipedia/edit.html", "/wikipedia/", "itt01-wiki-pages", "sites/apple/ipod.html", "iPod"),
        (2, "iPod", "sites/apple/ipod.html", "/apple/ipod", "", "sites/apple/itunes.html", "iTunes"),
        (3, "iTunes", "sites/apple/itunes.html", "/apple/itunes", "", "sites/msn/index.html", "MSN Messenger"),
        (4, "MSN Messenger", "sites/msn/index.html", "/msn/", "itt01-msn", "sites/broadband/index.html", "Broadband"),
        (5, "Broadband", "sites/broadband/index.html", "/broadband/", "", "sites/microsoft/ie6.html", "IE 6"),
        (6, "IE 6", "sites/microsoft/ie6.html", "/microsoft/", "", "sites/wayback/index.html", "Wayback"),
        (7, "Wayback", "sites/wayback/index.html", "/wayback/", "", "sites/google/index.html", "Google"),
        (8, "Google", "sites/google/index.html", "/google/", "", "sites/amazon/index.html", "Amazon smile"),
        (9, "Blogger", "sites/blogger/index.html", "/blogger/", "", "sites/movabletype/index.html", "Movable Type"),
        (10, "Movable Type", "sites/movabletype/index.html", "/movabletype/", "", "sites/msn/index.html", "MSN Messenger"),
    ],
    "2002": [
        (1, "StumbleUpon", "sites/stumbleupon/index.html", "/stumbleupon/", "itt02-stumble", "sites/friendster/index.html", "Friendster"),
        (2, "Friendster", "sites/friendster/index.html", "/friendster/", "", "sites/kazaa/index.html", "KaZaA"),
        (3, "KaZaA", "sites/kazaa/index.html", "/kazaa/", "", "sites/blogger/index.html", "Blogger"),
        (4, "Blogger", "sites/blogger/index.html", "/blogger/", "", "sites/googlenews/index.html", "Google News"),
        (5, "Google News", "sites/googlenews/index.html", "/googlenews/", "", "sites/wikipedia/index.html", "Wikipedia"),
        (6, "Wikipedia", "sites/wikipedia/index.html", "/wikipedia/", "", "sites/daypop/index.html", "Daypop"),
        (7, "Daypop", "sites/daypop/index.html", "/daypop/", "", "sites/wired/index.html", "Wired"),
        (8, "Wired", "sites/wired/index.html", "/wired/", "", "sites/google/index.html", "Google"),
        (9, "Google", "sites/google/index.html", "/google/", "", "sites/stumbleupon/index.html", "StumbleUpon"),
        (10, "Year game", "sites/playable/game.html", "/playable/", "itt02-game-roomsticky", "sites/stumbleupon/index.html", "StumbleUpon"),
    ],
    "2003": [
        (1, "MySpace", "sites/myspace/index.html", "/myspace/", "", "sites/itunes/index.html", "iTunes Store 99¢"),
        (2, "iTunes Store", "sites/itunes/index.html", "/itunes/", "", "sites/photobucket/index.html", "Photobucket"),
        (3, "Photobucket", "sites/photobucket/index.html", "/photobucket/", "itt03-photobucket", "sites/wordpress/index.html", "WordPress"),
        (4, "WordPress", "sites/wordpress/index.html", "/wordpress/", "", "sites/linkedin/index.html", "LinkedIn"),
        (5, "LinkedIn", "sites/linkedin/index.html", "/linkedin/", "", "sites/friendster/index.html", "Friendster"),
        (6, "Friendster", "sites/friendster/index.html", "/friendster/", "", "sites/bloglines/index.html", "Bloglines"),
        (7, "Bloglines", "sites/bloglines/index.html", "/bloglines/", "", "sites/adsense/index.html", "AdSense"),
        (8, "AdSense", "sites/adsense/index.html", "/adsense/", "", "sites/google/index.html", "Google"),
        (9, "Blogger", "sites/blogger/index.html", "/blogger/", "", "sites/photobucket/index.html", "Photobucket"),
        (10, "Google", "sites/google/index.html", "/google/", "", "sites/photobucket/index.html", "Photobucket"),
    ],
    "2004": [
        (1, "thefacebook networks", "sites/facebook/networks.html", "/facebook/networks", "itt04-thefacebook-networks", "sites/gmail/index.html", "Gmail 1 GB"),
        (2, "Gmail", "sites/gmail/index.html", "/gmail/", "", "sites/firefox/index.html", "Firefox 1.0"),
        (3, "Firefox 1.0", "sites/firefox/index.html", "/firefox/", "", "sites/flickr/index.html", "Flickr"),
        (4, "Flickr", "sites/flickr/index.html", "/flickr/", "", "sites/delicious/index.html", "del.icio.us"),
        (5, "del.icio.us", "sites/delicious/index.html", "/delicious/", "", "sites/digg/index.html", "Digg seed"),
        (6, "Digg seed", "sites/digg/index.html", "/digg/", "", "sites/facebook/friends.html", "Friends"),
        (7, "Friends", "sites/facebook/friends.html", "/facebook/friends", "", "sites/facebook/profile.html", "Profile"),
        (8, "Profile", "sites/facebook/profile.html", "/facebook/profile", "", "sites/facebook/invite.html", "Invite"),
        (9, "Invite", "sites/facebook/invite.html", "/facebook/invite", "", "sites/gmail/index.html", "Gmail"),
        (10, "Web 2.0 Conf", "sites/web20conference/index.html", "/web20conference/", "", "sites/facebook/networks.html", "thefacebook"),
    ],
    "2005": [
        (1, "YouTube", "sites/youtube/upload.html", "/youtube/", "itt05-yt-uploads", "sites/maps/index.html", "Google Maps"),
        (2, "Google Maps", "sites/maps/index.html", "/maps/", "", "sites/pandora/index.html", "Pandora"),
        (3, "Pandora station", "sites/pandora/index.html", "/pandora/", "itt05-pandora", "sites/housingmaps/index.html", "HousingMaps"),
        (4, "HousingMaps", "sites/housingmaps/index.html", "/housingmaps/", "", "sites/digg/index.html", "Digg"),
        (5, "Digg", "sites/digg/index.html", "/digg/", "", "sites/reddit/index.html", "Reddit"),
        (6, "Reddit", "sites/reddit/index.html", "/reddit/", "", "sites/flickr/index.html", "Flickr"),
        (7, "Flickr", "sites/flickr/index.html", "/flickr/", "", "sites/delicious/index.html", "del.icio.us"),
        (8, "iTunes podcasts", "sites/itunes/index.html", "/itunes/", "", "sites/techcrunch/index.html", "TechCrunch"),
        (9, "TechCrunch", "sites/techcrunch/index.html", "/techcrunch/", "", "sites/pandora/index.html", "Pandora"),
        (10, "Facebook gated", "sites/facebook/index.html", "/facebook/", "", "sites/youtube/index.html", "YouTube"),
    ],
    "2006": [
        (1, "Twitter 140", "sites/twitter/index.html", "/twitter/", "itt06-tweets", "sites/facebook/index.html", "News Feed"),
        (2, "News Feed", "sites/facebook/index.html", "/facebook/", "", "sites/youtube/index.html", "YouTube"),
        (3, "YouTube", "sites/youtube/index.html", "/youtube/", "", "sites/digg/index.html", "Digg"),
        (4, "Digg", "sites/digg/index.html", "/digg/", "", "sites/reddit/index.html", "Reddit"),
        (5, "Reddit", "sites/reddit/index.html", "/reddit/", "", "sites/docs/index.html", "Google Docs"),
        (6, "Google Docs", "sites/docs/index.html", "/docs/", "", "sites/aws/index.html", "AWS"),
        (7, "AWS", "sites/aws/index.html", "/aws/", "", "sites/reader/index.html", "Google Reader"),
        (8, "Google Reader", "sites/reader/index.html", "/reader/", "", "sites/time-you/index.html", "Time You"),
        (9, "Time You", "sites/time-you/index.html", "/time-you/", "", "sites/twitter/index.html", "Twitter"),
        (10, "MySpace", "sites/myspace/index.html", "/myspace/", "", "sites/twitter/index.html", "Twitter"),
    ],
    "2007": [
        (1, "iPhone Safari", "sites/iphone/index.html", "/iphone/", "itt07-iphone", "sites/maps/index.html", "Street View"),
        (2, "Street View", "sites/maps/index.html", "/maps/", "", "sites/gmail/index.html", "Gmail open"),
        (3, "Gmail open", "sites/gmail/index.html", "/gmail/", "", "sites/facebook/beacon.html", "Beacon"),
        (4, "Beacon", "sites/facebook/beacon.html", "/facebook/", "", "sites/twitter/index.html", "Twitter"),
        (5, "Twitter", "sites/twitter/index.html", "/twitter/", "", "sites/youtube/index.html", "YouTube"),
        (6, "YouTube", "sites/youtube/index.html", "/youtube/", "", "sites/netflix/index.html", "Netflix DVD"),
        (7, "Netflix DVD", "sites/netflix/index.html", "/netflix/", "", "sites/iphone/index.html", "iPhone Safari"),
        (8, "Flash nag", "sites/flashplayer/index.html", "/flashplayer/", "", "sites/iphone/index.html", "iPhone Safari"),
        (9, "Digg", "sites/digg/index.html", "/digg/", "", "sites/iphone/index.html", "iPhone Safari"),
        (10, "Box Shift", "sites/playable/game.html", "/playable/", "itt07-game-boxshift", "sites/iphone/index.html", "iPhone Safari"),
    ],
    "2008": [
        (1, "App Store", "sites/appstore/index.html", "/appstore/", "", "sites/chrome/index.html", "Chrome"),
        (2, "Chrome", "sites/chrome/index.html", "/chrome/", "", "sites/github/issue.html", "GitHub issue"),
        (3, "GitHub issue", "sites/github/issue.html", "/github/", "itt08-github", "sites/android/index.html", "Android G1"),
        (4, "Android G1", "sites/android/index.html", "/android/", "", "sites/hulu/index.html", "Hulu"),
        (5, "Hulu", "sites/hulu/index.html", "/hulu/", "", "sites/facebook/index.html", "Facebook"),
        (6, "Facebook", "sites/facebook/index.html", "/facebook/", "", "sites/twitter/index.html", "Twitter"),
        (7, "Twitter", "sites/twitter/index.html", "/twitter/", "", "sites/youtube/index.html", "YouTube"),
        (8, "YouTube", "sites/youtube/index.html", "/youtube/", "", "sites/dropbox/index.html", "Dropbox"),
        (9, "Dropbox", "sites/dropbox/index.html", "/dropbox/", "", "sites/iphone/index.html", "iPhone 3G"),
        (10, "iPhone 3G", "sites/iphone/index.html", "/iphone/", "", "sites/github/issue.html", "GitHub issue"),
    ],
    "2009": [
        (1, "Facebook Like", "sites/facebook/feed.html", "/facebook/", "itt09-fb-likes", "sites/farmville/index.html", "FarmVille"),
        (2, "FarmVille", "sites/farmville/index.html", "/farmville/", "", "sites/stackoverflow/index.html", "Stack Overflow"),
        (3, "Stack Overflow", "sites/stackoverflow/index.html", "/stackoverflow/", "", "sites/bing/index.html", "Bing"),
        (4, "Bing", "sites/bing/index.html", "/bing/", "", "sites/google/index.html", "Google"),
        (5, "Google", "sites/google/index.html", "/google/", "", "sites/foursquare/index.html", "Foursquare"),
        (6, "Foursquare", "sites/foursquare/index.html", "/foursquare/", "", "sites/kickstarter/index.html", "Kickstarter"),
        (7, "Kickstarter", "sites/kickstarter/index.html", "/kickstarter/", "", "sites/twitter/index.html", "Twitter"),
        (8, "Twitter", "sites/twitter/index.html", "/twitter/", "", "sites/chrome/index.html", "Chrome"),
        (9, "Chrome", "sites/chrome/index.html", "/chrome/", "", "sites/appstore/index.html", "App Store"),
        (10, "App Store", "sites/appstore/index.html", "/appstore/", "", "sites/facebook/feed.html", "Facebook Like"),
    ],
    "2010": [
        (1, "Imgur upload", "sites/imgur/index.html", "/imgur/", "itt10-imgur", "sites/reddit/index.html", "Reddit"),
        (2, "Reddit", "sites/reddit/index.html", "/reddit/", "", "sites/instagram/index.html", "Instagram"),
        (3, "Instagram", "sites/instagram/index.html", "/instagram/", "", "sites/ipad/index.html", "iPad"),
        (4, "iPad", "sites/ipad/index.html", "/ipad/", "", "sites/iphone/index.html", "iPhone 4"),
        (5, "iPhone 4", "sites/iphone/index.html", "/iphone/", "", "sites/facebook/index.html", "Facebook"),
        (6, "Facebook", "sites/facebook/index.html", "/facebook/", "", "sites/foursquare/index.html", "Foursquare"),
        (7, "Foursquare", "sites/foursquare/index.html", "/foursquare/", "", "sites/digg/index.html", "Digg"),
        (8, "Digg", "sites/digg/index.html", "/digg/", "", "sites/groupon/index.html", "Groupon"),
        (9, "Groupon", "sites/groupon/index.html", "/groupon/", "", "sites/playable/fruit.html", "Fruit Slash"),
        (10, "Fruit Slash", "sites/playable/fruit.html", "/playable/", "itt10-game-fruit", "sites/imgur/index.html", "Imgur"),
    ],
    "2011": [
        (1, "Airbnb request", "sites/airbnb/index.html", "/airbnb/", "itt11-airbnb", "sites/facebook/timeline.html", "Timeline · JSON, not 1"),
        (2, "Timeline", "sites/facebook/timeline.html", "/facebook/", "itt11-fb-timeline", "sites/spotify/index.html", "Spotify US"),
        (3, "Spotify US", "sites/spotify/index.html", "/spotify/", "itt11-spotify-plan", "sites/iphone/siri.html", "Siri on 4S"),
        (4, "Siri / 4S", "sites/iphone/index.html", "/iphone/", "", "sites/googleplus/index.html", "Google+"),
        (5, "Google+", "sites/googleplus/index.html", "/googleplus/", "", "sites/ipad/index.html", "iPad 2"),
        (6, "iPad 2", "sites/ipad/index.html", "/ipad/", "", "sites/netflix/qwikster.html", "Qwikster"),
        (7, "Qwikster", "sites/netflix/qwikster.html", "/netflix/", "itt11-qwikster", "sites/youtube/index.html", "YouTube residual"),
        (8, "YouTube residual", "sites/youtube/index.html", "/youtube/", "itt11-yt-did-upload", "sites/instagram/index.html", "Instagram iOS"),
        (9, "Instagram iOS", "sites/instagram/index.html", "/instagram/", "", "sites/twitch/index.html", "Twitch / Justin.tv"),
        (10, "Letter Swap", "sites/playable/game.html", "/playable/", "itt11-game-letterswap", "sites/airbnb/index.html", "Airbnb request"),
    ],
    "2012": [
        (1, "SoundCloud", "sites/soundcloud/index.html", "/soundcloud/", "itt12-soundcloud", "sites/instagram/android.html", "Instagram Android"),
        (2, "IG Android", "sites/instagram/android.html", "/instagram/", "", "sites/facebook/ipo.html", "Facebook IPO"),
        (3, "Facebook IPO", "sites/facebook/ipo.html", "/facebook/", "", "sites/wikipedia/sopa-blackout.html", "SOPA blackout"),
        (4, "SOPA blackout", "sites/wikipedia/sopa-blackout.html", "/wikipedia/", "", "sites/reddit/ama.html", "Obama AMA"),
        (5, "Reddit AMA", "sites/reddit/ama.html", "/reddit/", "", "sites/iphone/index.html", "iPhone 5"),
        (6, "iPhone 5", "sites/iphone/index.html", "/iphone/", "", "sites/ipad/index.html", "iPad mini"),
        (7, "Windows 8", "sites/windows8/index.html", "/windows8/", "", "sites/chrome/index.html", "Chrome"),
        (8, "Pinterest", "sites/pinterest/index.html", "/pinterest/", "", "sites/snapchat/index.html", "Snap seed"),
        (9, "Uber seed", "sites/uber/index.html", "/uber/", "", "sites/soundcloud/index.html", "SoundCloud"),
        (10, "Guess Doodle", "sites/playable/game.html", "/playable/", "itt12-game-guessdoodle", "sites/soundcloud/index.html", "SoundCloud"),
    ],
    "2013": [
        (1, "Vine hold", "sites/vine/record.html", "/vine/", "itt13-vine-posts", "sites/instagram/video.html", "IG Video 15s"),
        (2, "IG Video", "sites/instagram/video.html", "/instagram/", "", "sites/snapchat/story.html", "Snap Stories"),
        (3, "Snap Stories", "sites/snapchat/story.html", "/snapchat/", "", "sites/iphone/ios7.html", "iOS 7"),
        (4, "iOS 7", "sites/iphone/ios7.html", "/iphone/ios7", "", "sites/iphone/touchid.html", "Touch ID"),
        (5, "Touch ID", "sites/iphone/touchid.html", "/iphone/touchid", "", "sites/snowden/index.html", "Snowden / PRISM"),
        (6, "Snowden", "sites/snowden/index.html", "/snowden/", "", "sites/whatsapp/index.html", "WhatsApp pre-FB"),
        (7, "WhatsApp", "sites/whatsapp/index.html", "/whatsapp/", "", "sites/telegram/index.html", "Telegram"),
        (8, "Telegram", "sites/telegram/index.html", "/telegram/", "", "sites/healthcare/index.html", "HealthCare.gov"),
        (9, "HealthCare.gov", "sites/healthcare/index.html", "/healthcare/", "", "sites/playable/game.html", "Pipe Hop"),
        (10, "Pipe Hop", "sites/playable/game.html", "/playable/", "itt13-game-pipehop", "sites/vine/record.html", "Vine hold"),
    ],
    "2014": [
        (1, "WhatsApp install", "sites/whatsapp/index.html", "/whatsapp/", "itt14-wa-install", "sites/whatsapp/chat.html", "WhatsApp chat"),
        (2, "WhatsApp chat", "sites/whatsapp/chat.html", "/whatsapp/chat", "itt14-wa-msgs", "sites/heartbleed/rotate.html", "Heartbleed rotate"),
        (3, "Heartbleed", "sites/heartbleed/rotate.html", "/heartbleed/", "itt14-heartbleed-rotate", "sites/iphone/index.html", "iPhone 6"),
        (4, "iPhone 6", "sites/iphone/index.html", "/iphone/", "", "sites/iphone/pay.html", "Apple Pay"),
        (5, "Apple Pay", "sites/iphone/pay.html", "/iphone/pay", "", "sites/icebucket/index.html", "Ice Bucket"),
        (6, "Ice Bucket", "sites/icebucket/index.html", "/icebucket/", "", "sites/serial/index.html", "Serial"),
        (7, "Serial", "sites/serial/index.html", "/serial/", "", "sites/slack/index.html", "Slack public"),
        (8, "Slack", "sites/slack/index.html", "/slack/", "itt14-slack", "sites/billion/index.html", "1B websites"),
        (9, "1B websites", "sites/billion/index.html", "/billion/", "", "sites/playable/game.html", "Tile Fold"),
        (10, "Tile Fold", "sites/playable/game.html", "/playable/", "itt14-game-tilefold", "sites/whatsapp/index.html", "WhatsApp"),
    ],
    "2015": [
        (1, "Periscope Go LIVE", "sites/periscope/index.html", "/periscope/", "itt15-periscope", "sites/googlephotos/index.html", "Google Photos"),
        (2, "Google Photos", "sites/googlephotos/index.html", "/googlephotos/", "itt15-googlephotos", "sites/windows10/index.html", "Windows 10"),
        (3, "Windows 10", "sites/windows10/index.html", "/windows10/", "itt15-win10", "sites/applemusic/index.html", "Apple Music"),
        (4, "Apple Music", "sites/applemusic/index.html", "/applemusic/", "itt15-applemusic", "sites/edge/index.html", "Edge"),
        (5, "Edge Spartan", "sites/edge/index.html", "/edge/", "itt15-edge", "sites/apple/watch.html", "Watch leftover"),
        (6, "Watch leftover", "sites/apple/watch.html", "/apple/watch", "itt15-watch", "sites/snapchat/discover.html", "Discover"),
        (7, "Snap Discover", "sites/snapchat/discover.html", "/snapchat/", "itt15-snap-discover", "sites/discord/index.html", "Discord"),
        (8, "Discord", "sites/discord/index.html", "/discord/", "itt15-discord", "sites/letsencrypt/index.html", "Let's Encrypt"),
        (9, "Let's Encrypt", "sites/letsencrypt/index.html", "/letsencrypt/", "itt15-le", "sites/playable/game.html", "Blob Rush"),
        (10, "Blob Rush", "sites/playable/game.html", "/playable/", "itt15-game-blobrush", "sites/periscope/index.html", "Periscope"),
    ],
    "2016": [
        (1, "IG Stories", "sites/instagram/stories.html", "/instagram/", "itt16-ig-stories", "sites/pokemongo/index.html", "Pokémon GO"),
        (2, "Pokémon GO", "sites/pokemongo/index.html", "/pokemongo/", "itt16-pogo", "sites/facebook/reactions.html", "Reactions"),
        (3, "Reactions", "sites/facebook/reactions.html", "/facebook/", "itt16-reactions", "sites/iphone/jack.html", "Jack death"),
        (4, "Jack / AirPods", "sites/iphone/jack.html", "/iphone/", "itt16-iphone7-jack", "sites/airpods/index.html", "AirPods"),
        (5, "AirPods", "sites/airpods/index.html", "/airpods/", "itt16-airpods", "sites/vine/goodbye.html", "Vine goodbye"),
        (6, "Vine goodbye", "sites/vine/goodbye.html", "/vine/", "itt16-vine-end", "sites/musically/create.html", "musical.ly"),
        (7, "musical.ly", "sites/musically/create.html", "/musically/", "itt16-musically", "sites/whatsapp/security.html", "WhatsApp E2E"),
        (8, "WhatsApp E2E", "sites/whatsapp/security.html", "/whatsapp/", "itt16-wa-e2e", "sites/dyn/index.html", "Dyn"),
        (9, "Dyn", "sites/dyn/index.html", "/dyn/", "itt16-dyn", "sites/stem/index.html", "STEM"),
        (10, "Gym Rush", "sites/playable/game.html", "/playable/", "itt16-game-gymrush", "sites/instagram/stories.html", "IG Stories"),
    ],
    "2017": [
        (1, "Face ID / X", "sites/iphone/x.html", "/iphone/x", "itt17-faceid", "sites/fortnite/index.html", "Fortnite BR"),
        (2, "Fortnite BR", "sites/fortnite/index.html", "/fortnite/", "itt17-fortnite", "sites/twitter/280.html", "Twitter 280"),
        (3, "Twitter 280", "sites/twitter/280.html", "/twitter/", "itt17-twitter280", "sites/wannacry/index.html", "WannaCry"),
        (4, "WannaCry", "sites/wannacry/index.html", "/wannacry/", "itt17-wannacry", "sites/vine/gone.html", "Vine gone"),
        (5, "Vine gone", "sites/vine/gone.html", "/vine/", "itt17-vine-gone", "sites/teams/index.html", "Teams GA"),
        (6, "Teams GA", "sites/teams/index.html", "/teams/", "", "sites/equifax/index.html", "Equifax"),
        (7, "Equifax", "sites/equifax/index.html", "/equifax/", "", "sites/switch/index.html", "Switch"),
        (8, "Switch", "sites/switch/index.html", "/switch/", "", "sites/youtube/tv.html", "YouTube TV"),
        (9, "YouTube TV", "sites/youtube/tv.html", "/youtube/", "", "sites/playable/game.html", "Storm Circle"),
        (10, "Storm Circle", "sites/playable/game.html", "/playable/", "itt17-game-stormcircle", "sites/iphone/x.html", "Face ID"),
    ],
    "2018": [
        (1, "GDPR Manage", "sites/gdpr/index.html", "/gdpr/", "itt18-gdpr", "sites/tiktok/fyp.html", "TikTok For You"),
        (2, "TikTok FYP", "sites/tiktok/fyp.html", "/tiktok/", "itt18-tiktok-fyp", "sites/trust/index.html", "Hearing"),
        (3, "Hearing", "sites/trust/index.html", "/trust/", "itt18-ca", "sites/instagram/igtv.html", "IGTV"),
        (4, "IGTV", "sites/instagram/igtv.html", "/instagram/", "itt18-igtv", "sites/chrome/not-secure.html", "Chrome 68"),
        (5, "Chrome 68", "sites/chrome/not-secure.html", "/chrome/", "", "sites/homepod/index.html", "HomePod"),
        (6, "HomePod", "sites/homepod/index.html", "/homepod/", "", "sites/fortnite/switch.html", "Fortnite Switch"),
        (7, "Fortnite Switch", "sites/fortnite/switch.html", "/fortnite/", "", "sites/github/microsoft.html", "GitHub $7.5B"),
        (8, "GitHub Microsoft", "sites/github/microsoft.html", "/github/", "", "sites/googleplus/sunset.html", "Google+ sunset"),
        (9, "G+ sunset", "sites/googleplus/sunset.html", "/googleplus/", "", "sites/playable/game.html", "Consent Dash"),
        (10, "Consent Dash", "sites/playable/game.html", "/playable/", "itt18-game-consentdash", "sites/gdpr/index.html", "GDPR Manage"),
    ],
    "2019": [
        (1, "Disney+", "sites/disneyplus/index.html", "/disneyplus/", "itt19-disneyplus", "sites/tiktok/index.html", "TikTok For You"),
        (2, "TikTok", "sites/tiktok/index.html", "/tiktok/", "", "sites/arcade/index.html", "Apple Arcade"),
        (3, "Arcade", "sites/arcade/index.html", "/arcade/", "", "sites/appletv/index.html", "Apple TV+"),
        (4, "TV+", "sites/appletv/index.html", "/appletv/", "", "sites/stadia/index.html", "Stadia"),
        (5, "Stadia", "sites/stadia/index.html", "/stadia/", "", "sites/iphone/iphone11.html", "iPhone 11"),
        (6, "iPhone 11", "sites/iphone/iphone11.html", "/iphone/", "", "sites/airpodspro/index.html", "AirPods Pro"),
        (7, "AirPods Pro", "sites/airpodspro/index.html", "/airpodspro/", "", "sites/chrome/index.html", "Chrome habit"),
        (8, "Chrome habit", "sites/chrome/index.html", "/chrome/", "", "sites/windows10/index.html", "Windows 10 residual"),
        (9, "Windows 10 residual", "sites/windows10/index.html", "/windows10/", "", "sites/playable/game.html", "Continue Row"),
        (10, "Continue Row", "sites/playable/game.html", "/playable/", "itt19-game-continuerow", "sites/disneyplus/index.html", "Disney+"),
    ],
}


def exists(year, href):
    return (ROOT / "years" / year / href).is_file()


def main():
    missing = []
    for year, rows in TRAILS.items():
        if not (ROOT / "years" / year).is_dir():
            continue
        if len(rows) != 10:
            raise SystemExit(f"{year} has {len(rows)} trails, need 10")
        for row in rows:
            href = row[2]
            nxt = row[5]
            if not exists(year, href):
                missing.append(f"{year} START {href}")
            if nxt and not exists(year, nxt):
                missing.append(f"{year} NEXT  {nxt}")
    if missing:
        print("MISSING FILES:")
        for m in missing:
            print(" ", m)
        raise SystemExit(1)

    lines = [
        "/**",
        " * Ten link-flows per year (1994–2019, skip 2014).",
        " * Consumed by js/immersion/flow-trails.js.",
        " * Generated by scripts/build-flow-trails.py — edit that, then re-run.",
        " */",
        "(function (global) {",
        '  "use strict";',
        "  var ITT = global.ITT || (global.ITT = {});",
        "  ITT.flowTrails = {",
    ]
    years = [y for y in sorted(TRAILS.keys()) if (ROOT / "years" / y).is_dir()]
    for yi, year in enumerate(years):
        lines.append(f'    "{year}": [')
        rows = TRAILS[year]
        for i, (n, name, href, match, key, nxt, label) in enumerate(rows):
            obj = {
                "n": n,
                "name": name,
                "href": href,
                "match": match,
                "whenKey": key,
                "nextHref": nxt,
                "nextLabel": label,
            }
            comma = "," if i < len(rows) - 1 else ""
            lines.append("      " + json.dumps(obj, ensure_ascii=False) + comma)
        comma = "," if yi < len(years) - 1 else ""
        lines.append("    ]" + comma)
    lines.append("  };")
    lines.append("})(typeof window !== \"undefined\" ? window : this);")
    lines.append("")
    out = ROOT / "js/config/flow-trails.js"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {out} ({sum(len(v) for v in TRAILS.values())} trails, {len(TRAILS)} years)")


if __name__ == "__main__":
    main()
