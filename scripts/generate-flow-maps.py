#!/usr/bin/env python3
"""Generate js/config/flow-maps.js, immersion module, css, and years/*/pages/map.html."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def site(name, href, do, steps=None):
    d = {"name": name, "href": href, "do": do}
    if steps:
        d["steps"] = steps
    return d


def branch(label, do, sites):
    return {"label": label, "do": do, "sites": sites}


def build_maps():
    M = {}
    M["1994"] = {
        "thesis": "The public Web's first mass year — directories, universities, gray Mosaic pages.",
        "shell": "Windows 3.1 · Netscape Navigator 1.0 · 14.4 kbps modem theater",
        "how": [
            "Hub → open 1994 → optional dial-up log → Starting Point map",
            "Use Back / Directory buttons / location bar (period URLs)",
            "Follow a trail below · Exit (Year menu) returns to hub",
        ],
        "branches": [
            branch("Enter & orient", "Learn the shell before surfing", [
                site("Starting Point", "pages/home.html", "Year map · trails · browser tips"),
                site("About 1994", "pages/about.html", "Thesis · scale · what's reconstructed"),
                site("Netscape Handbook", "pages/handbook.html", "How Navigator menus & graphics worked"),
                site("Year flow map", "pages/map.html", "This page — UX tree of the year"),
            ]),
            branch("Find things (directories)", "Browse, don't search the whole web yet", [
                site("Yahoo! @ Stanford", "sites/yahoo/index.html", "Hierarchical directory of the early Web",
                     ["Open a category", "Drill into leaves", "Add URL / What's New theater"]),
                site("Lycos", "sites/lycos/index.html", "Early catalog / search from Net Search"),
                site("Cool Site of the Day", "sites/csotd/index.html", "Daily cool destination rotation"),
            ]),
            branch("Who built the Web", "Origins of HTML and browsers", [
                site("CERN / WWW", "sites/cern/index.html", "Where the Web started"),
                site("NCSA Mosaic", "sites/ncsa/index.html", "Browser that popularized the Web"),
                site("Welcome to Netscape", "sites/mcom/index.html", "home.mcom.com · commercial browser"),
            ]),
            branch("Culture & cool", "Why people stayed online after dark", [
                site("Fish Cam", "sites/fishcam/index.html", "Live-ish cam theater · multi-still frames"),
                site("IUMA", "sites/iuma/index.html", "Underground music · helper-app download theater"),
                site("HotWired", "sites/hotwired/index.html", "Early commercial magazine + banner ads"),
                site("Exploratorium", "sites/exploratorium/index.html", "Museum web landmark"),
            ]),
            branch("Institutions & people", "Government and personal home pages", [
                site("White House", "sites/whitehouse/index.html", "Imagemap · publications · guestbook"),
                site("NASA", "sites/nasa/index.html", "Shuttle · centers · image galleries"),
                site("Personal homepage", "sites/personal/index.html", "University-style page · guestbook"),
            ]),
        ],
    }
    M["1995"] = {
        "thesis": "Windows 95 ships; the commercial Web wakes up.",
        "shell": "Windows 95 · Netscape 2.0 · 28.8 kbps",
        "how": [
            "Start at Starting Point → pick commerce or homestead trail",
            "Amazon: book → Add to Cart → cart → SSL checkout → thanks",
            "AuctionWeb: item → bid form → high bidder in this browser only",
        ],
        "branches": [
            branch("Enter", "Orient in Win95 Netscape", [
                site("Starting Point", "pages/home.html", "Year map · product chips · trails"),
                site("About 1995", "pages/about.html", "Thesis · Win95 · commercial Web"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Commerce arrives", "Shop and bid like 1995", [
                site("Amazon bookstore", "sites/amazon/index.html", "Early river bookstore · catalog",
                     ["Open a book page", "Add to cart", "View cart · checkout · SSL banner"]),
                site("AuctionWeb", "sites/auctionweb/index.html", "Pre-eBay auctions · not named eBay yet",
                     ["Open an item", "Place a higher bid", "See high bidder + history"]),
                site("Yahoo!", "sites/yahoo/index.html", "Commercial yahoo.com directory"),
                site("AltaVista", "sites/altavista/index.html", "Full-text search engine home"),
            ]),
            branch("Homesteads", "Everyone gets a free neighborhood page", [
                site("GeoCities", "sites/geocities/index.html", "Neighborhoods · homestead wizard · webring"),
            ]),
            branch("News & platforms", "Portals and OS vendors", [
                site("CNN", "sites/cnn/index.html", "Early news site sections"),
                site("Microsoft", "sites/microsoft/index.html", "Period Microsoft presence"),
                site("Netscape", "sites/netscape/index.html", "Browser vendor page"),
            ]),
        ],
    }
    M["1996"] = {
        "thesis": "Portal wars · free webmail · movie promo sites · Netscape 3.",
        "shell": "Windows 95 · Netscape 3.0 · 28.8 kbps",
        "how": [
            "HoTMaiL: login → inbox → compose → logout (localStorage mail)",
            "Space Jam: hub planets are real multipage destinations",
            "Amazon cart still works this year",
        ],
        "branches": [
            branch("Enter", "Portal-era starting point", [
                site("Starting Point", "pages/home.html", "Trails · chips · bans"),
                site("About 1996", "pages/about.html", "Portal grammar · free mail story"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Free webmail", "Mail that isn't tied to your ISP", [
                site("HoTMaiL", "sites/hotmail/index.html", "Login · inbox · compose · read",
                     ["Sign in", "Open inbox", "Compose", "Logout"]),
            ]),
            branch("Movie web", "Why Space Jam is a landmark", [
                site("Space Jam", "sites/spacejam/index.html", "Warner Bros hub · planet destinations · GIFs"),
            ]),
            branch("Portals & search", "Start pages compete hard", [
                site("Yahoo!", "sites/yahoo/index.html", "Portal Yahoo with category depth"),
                site("Excite", "sites/excite/index.html", "Competing portal + personalize"),
                site("AltaVista", "sites/altavista/index.html", "Search results theater"),
            ]),
            branch("Commerce continuity", "Cart and bids still matter", [
                site("Amazon", "sites/amazon/index.html", "Cart · checkout · SSL"),
                site("AuctionWeb", "sites/auctionweb/index.html", "Bid theater"),
                site("Plugin theater", "sites/plugin/index.html", "Flash/plugin-era demo page"),
            ]),
        ],
    }
    M["1997"] = {
        "thesis": "Browser wars peak · eBay brand · push media · 56k · IE4.",
        "shell": "Windows 95 · Internet Explorer 4.0 · 56k",
        "how": [
            "IE4 Channels → PointCast push culture",
            "eBay: item → bid → high bid storage (black logo era)",
            "Slashdot: read story → post comment",
        ],
        "branches": [
            branch("Enter", "IE4 desktop immersion", [
                site("Starting Point", "pages/home.html", "Year map · trails"),
                site("About 1997", "pages/about.html", "Browser wars · ~1M sites"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Auctions rebranded", "AuctionWeb becomes eBay", [
                site("eBay", "sites/ebay/index.html", "Categories · items · bid confirm",
                     ["Open laptop or PDA item", "Submit bid", "See high bidder update"]),
            ]),
            branch("Mail & shopping", "Still everyday web", [
                site("HoTMaiL", "sites/hotmail/index.html", "Webmail continuity"),
                site("Amazon", "sites/amazon/index.html", "IPO-era · cart · Book of the Day"),
            ]),
            branch("News culture", "Diana · Mars · Drudge · Slashdot", [
                site("CNN", "sites/cnn/index.html", "Diana · Pathfinder · tech sections"),
                site("Slashdot", "sites/slashdot/index.html", "Story + localStorage comments"),
                site("Drudge Report", "sites/drudge/index.html", "Headline board"),
            ]),
            branch("Search & push", "Find things · get pushed", [
                site("HotBot", "sites/hotbot/index.html", "Search competitor"),
                site("PointCast", "sites/pointcast/index.html", "Push channels · IE4 Channels target"),
                site("ICQ", "sites/icq/index.html", "Instant messaging culture landing"),
            ]),
            branch("Brand web", "Think Different era", [
                site("Apple", "sites/apple/index.html", "Think Different campaign room"),
                site("Microsoft IE4", "sites/microsoft/ie4.html", "Browser product story"),
            ]),
        ],
    }
    M["1998"] = {
        "thesis": "Portals still rule the front page — then sparse Google! appears.",
        "shell": "Windows 98 · IE 4 · 56k",
        "how": [
            "Compare Yahoo/Excite portal density with Google's sparse home",
            "Google: type a query → results from exhibit catalog",
            "Amazon Music: add CD to cart",
        ],
        "branches": [
            branch("Enter", "Win98 IE4 room", [
                site("Starting Point", "pages/home.html", "Google chip · portal trails"),
                site("About 1998", "pages/about.html", "Portal peak + Google beta"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Search rupture", "Sparse Google vs fat portals", [
                site("Google!", "sites/google/index.html", "Search · I'm Feeling Lucky",
                     ["Type a query", "Submit Google Search", "Or Feeling Lucky"]),
                site("Yahoo!", "sites/yahoo/index.html", "Still the start-page habit"),
                site("Excite", "sites/excite/index.html", "Personalize modules that persist"),
                site("HotBot", "sites/hotbot/index.html", "Search market color"),
            ]),
            branch("Commerce", "Music + auctions + mail", [
                site("Amazon Music", "sites/amazon/music.html", "CD catalog · cart"),
                site("eBay", "sites/ebay/index.html", "IPO-era marketplace · bid"),
                site("CDnow", "sites/cdnow/index.html", "Music retail competitor"),
                site("HoTMaiL", "sites/hotmail/index.html", "MS-owned free mail"),
            ]),
            branch("Open source & culture", "Mozilla opens the source", [
                site("Mozilla.org", "sites/mozilla/index.html", "Open-source Netscape story"),
                site("Slashdot", "sites/slashdot/index.html", "Nerd news comments"),
                site("Valve", "sites/valve/index.html", "PC gaming web culture"),
            ]),
        ],
    }
    M["1999"] = {
        "thesis": "Bubble peak · Napster · Blogger · Y2K · Google funded.",
        "shell": "Windows 98 SE · IE 5 · 56k · P2P arrives",
        "how": [
            "Napster: search → client/download theater",
            "Blogger: write post → view published page (itt99-blog)",
            "eBay multicolor era · Amazon multi-category",
        ],
        "branches": [
            branch("Enter", "Bubble-peak lobby", [
                site("Starting Point", "pages/home.html", "Napster · Blogger · Y2K chips"),
                site("About 1999", "pages/about.html", "P2P · funded Google · Y2K dread"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Peer-to-peer music", "Share MP3s (theater only)", [
                site("Napster", "sites/napster/index.html", "Search · client · legal storm",
                     ["Search tracks", "Download/install theater", "Read legal timeline"]),
            ]),
            branch("Publish yourself", "Blogs leave the geek corner", [
                site("Blogger", "sites/blogger/index.html", "Post → view · free hosting story",
                     ["Edit a post", "Save to server theater", "View weblog"]),
            ]),
            branch("Search & portals", "Google grows; portals still sticky", [
                site("Google", "sites/google/index.html", "Funded sparse search"),
                site("Yahoo!", "sites/yahoo/index.html", "Portal peak habit"),
                site("Ask Jeeves", "sites/askjeeves/index.html", "Natural-language Q&A branding"),
            ]),
            branch("Commerce & culture", "Buy · bid · fear Y2K", [
                site("Amazon", "sites/amazon/index.html", "Multi-category tabs · cart"),
                site("eBay", "sites/ebay/index.html", "Multicolor logo era marketplace"),
                site("Y2K", "sites/y2k/index.html", "Millennium bug culture room"),
                site("PayPal", "sites/paypal/index.html", "Payments on the web seed"),
            ]),
        ],
    }
    M["2000"] = {
        "thesis": "Peak and crash in one year — smile Amazon, Napster fight, Pets.com lore.",
        "shell": "Windows 98 SE · IE 5.5 · 56k · ~17M sites",
        "how": [
            "Amazon smile logo is the year tell — shop music → cart (itt00)",
            "Napster: search works; legal pressure is the story",
            "Pets: shop → shutdown arc",
        ],
        "branches": [
            branch("Enter", "Crash-year lobby", [
                site("Starting Point", "pages/home.html", "Smile · Napster · Pets trails"),
                site("About 2000", "pages/about.html", "Scale · crash · continuity"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Commerce peak", "Buy while the bubble crests", [
                site("Amazon (smile)", "sites/amazon/index.html", "Smile logo · music cart · SSL",
                     ["Note the smile logo", "Add music to cart", "Open cart under itt00"]),
                site("eBay", "sites/ebay/index.html", "Auction continuity · bid"),
                site("PayPal", "sites/paypal/index.html", "Web payments culture"),
            ]),
            branch("Music fight", "P2P meets the courts", [
                site("Napster", "sites/napster/index.html", "Search · client · legal timeline"),
                site("Gnutella", "sites/gnutella/index.html", "Decentralized alternative lore"),
            ]),
            branch("Crash culture", "What died and what people joked about", [
                site("Pets.com", "sites/pets/index.html", "Sock puppet · shop · shutdown pages"),
                site("Startup Failures", "sites/startupfailures/index.html", "Dot-com flameout catalog"),
                site("Y2K retrospective", "sites/y2k/index.html", "After the non-apocalypse"),
            ]),
            branch("Search & media", "Google habit grows", [
                site("Google", "sites/google/index.html", "Still sparse · everyday search"),
                site("CNN", "sites/cnn/index.html", "News in crash year"),
                site("Blogger", "sites/blogger/index.html", "Publish continues"),
            ]),
        ],
    }
    M["2001"] = {
        "thesis": "Post-crash rebuild — XP + IE6 default, Wikipedia born, iPod + early iTunes.",
        "shell": "Windows XP · IE 6 · broadband rising",
        "how": [
            "Wikipedia: browse → welcome → edit/preview path",
            "iPod/iTunes: library jukebox honesty (Music Store still future)",
            "Broadband ISP room: always-on speed theater",
        ],
        "branches": [
            branch("Enter", "XP Luna shell", [
                site("Starting Point", "pages/home.html", "Wiki · iPod · Google chips"),
                site("About 2001", "pages/about.html", "Memory machines · monopoly browser"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Memory of the web", "Encyclopedia anyone can edit", [
                site("Wikipedia", "sites/wikipedia/index.html", "UseMod-era wiki densify",
                     ["Home", "Welcome newcomers", "Edit / preview theater"]),
                site("Wayback culture", "sites/wayback/index.html", "Remembering dead pages"),
            ]),
            branch("Portable jukebox", "1,000 songs in your pocket", [
                site("iPod", "sites/apple/ipod.html", "Specs · honesty: not a storefront yet"),
                site("iTunes (library)", "sites/apple/itunes.html", "Rip · playlist · no 99c Store yet"),
            ]),
            branch("Always-on", "Leave the modem behind (if you can)", [
                site("Broadband ISP", "sites/broadband/index.html", "Plans · speed-check theater"),
                site("Google", "sites/google/index.html", "Default search habit"),
                site("Amazon smile", "sites/amazon/index.html", "Cart continues (itt01)"),
            ]),
            branch("Blog tools", "Publish stack densifies", [
                site("Blogger", "sites/blogger/edit.html", "Post → view storage"),
                site("Movable Type", "sites/movabletype/index.html", "Self-hosted weblog software"),
            ]),
        ],
    }
    M["2002"] = {
        "thesis": "Always-on minority · Friendster seed · KaZaA · blogosphere TrackBack.",
        "shell": "Windows XP · IE 6 · broadband option",
        "how": [
            "Friendster: profile save → friends list (itt02)",
            "KaZaA: search rows → download theater",
            "Blogs: publish + TrackBack / Daypop culture",
        ],
        "branches": [
            branch("Enter", "Always-on lobby", [
                site("Starting Point", "pages/home.html", "Friendster · KaZaA trails"),
                site("About 2002", "pages/about.html", "Pew broadband · social seed"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Social graph seed", "Before MySpace mass", [
                site("Friendster", "sites/friendster/index.html", "Profile · add friend · storage",
                     ["Edit profile", "Save", "Add a friend · list grows"]),
            ]),
            branch("P2P after Napster", "Files still move peer-to-peer", [
                site("KaZaA", "sites/kazaa/index.html", "Search · download progress theater"),
            ]),
            branch("Blogosphere", "RSS, TrackBack, rankings", [
                site("Blogger", "sites/blogger/index.html", "Post → view"),
                site("Movable Type", "sites/movabletype/index.html", "TrackBack / ping culture"),
                site("Daypop", "sites/daypop/index.html", "Blog search & rankings"),
                site("Wired", "sites/wired/index.html", "CSS-era magazine web"),
            ]),
            branch("Search & news", "Google News appears", [
                site("Google", "sites/google/index.html", "Default search"),
                site("Google News", "sites/googlenews/index.html", "Automated news clusters"),
                site("Wikipedia", "sites/wikipedia/index.html", "Wiki densifies"),
            ]),
        ],
    }
    M["2003"] = {
        "thesis": "Social + paid music — MySpace, iTunes Store 99c, WordPress, LinkedIn.",
        "shell": "Windows XP · IE 6 · broadband more common",
        "how": [
            "MySpace: profile · comment · invite (itt03)",
            "iTunes Store: browse → 99c buy → library",
            "WordPress: install story → publish post",
        ],
        "branches": [
            branch("Enter", "Mass social begins", [
                site("Starting Point", "pages/home.html", "MySpace · iTunes · WP trails"),
                site("About 2003", "pages/about.html", "99c Store · social graph"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Mass social", "Customize your page, add friends", [
                site("MySpace", "sites/myspace/index.html", "Profile · comments · invites",
                     ["Open profile", "Leave a comment", "Send invite theater"]),
                site("Friendster", "sites/friendster/index.html", "Earlier graph still around"),
                site("LinkedIn", "sites/linkedin/index.html", "Professional network · invite"),
            ]),
            branch("99c music store", "Legal downloads go mainstream", [
                site("iTunes Music Store", "sites/itunes/index.html", "Browse · buy · library"),
            ]),
            branch("Blog CMS", "WordPress arrives", [
                site("WordPress", "sites/wordpress/index.html", "Install · dashboard · publish"),
                site("Bloglines", "sites/bloglines/index.html", "Web RSS reader · add feed"),
                site("Blogger", "sites/blogger/index.html", "Hosted blogs continue"),
            ]),
            branch("Ads & platforms", "Money finds blogs", [
                site("AdSense", "sites/adsense/index.html", "Contextual ads · signup theater"),
                site("Google", "sites/google/index.html", "Search + ads engine"),
            ]),
        ],
    }
    M["2004"] = {
        "thesis": "Web 2.0 named — Gmail invite, Flickr, Thefacebook, Firefox 1.0.",
        "shell": "Windows XP · IE 6 · Firefox rising",
        "how": [
            "Gmail: invite-only login → compose → 1 GB story",
            "Thefacebook: campus-gated login · friends (not open FB)",
            "Flickr: upload → stream · tags",
        ],
        "branches": [
            branch("Enter", "Web 2.0 hinge lobby", [
                site("Starting Point", "pages/home.html", "Gmail · Flickr · Thefacebook chips"),
                site("About 2004", "pages/about.html", "Web 2.0 Conf · IPO · scale"),
                site("Year flow map", "pages/map.html", "This UX tree"),
                site("Web 2.0 Conference", "sites/web20conference/index.html", "Named the boom"),
            ]),
            branch("Mail reinvented", "Search, don't sort · 1 GB", [
                site("Gmail", "sites/gmail/index.html", "Invite beta · login · compose",
                     ["Login theater", "Compose message", "Spend an invite"]),
            ]),
            branch("Photos & tags", "Folksonomy goes visual", [
                site("Flickr", "sites/flickr/index.html", "Upload · stream · groups · tags"),
                site("del.icio.us", "sites/delicious/index.html", "Social bookmarks · post link"),
            ]),
            branch("Campus social", "Not yet the open Facebook", [
                site("Thefacebook", "sites/facebook/index.html", "Harvard → colleges · friends",
                     ["Login", "Add friend", "Note campus-gated honesty"]),
                site("MySpace", "sites/myspace/index.html", "Mass social still large"),
            ]),
            branch("Browser revolt", "Firefox 1.0", [
                site("Firefox 1.0", "sites/firefox/index.html", "Download day · NYT ad lore"),
                site("Digg seed", "sites/digg/index.html", "Late-2004 seed honesty"),
            ]),
        ],
    }
    M["2005"] = {
        "thesis": "Web 2.0 as business boom — YouTube, Maps+Ajax, Reddit, Digg, podcasts.",
        "shell": "Windows XP · IE 6 · broadband when you have it",
        "how": [
            "YouTube: upload → list → watch/like (no Google ownership yet)",
            "Maps: pan/zoom · search · then HousingMaps mashup",
            "Reddit/Digg: submit and vote — counts change immediately",
        ],
        "branches": [
            branch("Enter", "Web 2.0 boom lobby", [
                site("Starting Point", "pages/home.html", "Four product trails · chips"),
                site("About 2005", "pages/about.html", "Timeline · scale · bans"),
                site("Year flow map", "pages/map.html", "This UX tree"),
                site("Web 2.0 Conference", "sites/web20conference/index.html", "Sold-out map of the year"),
            ]),
            branch("Trail · Ajax / maps", "The web feels like software", [
                site("Ajax essay", "sites/maps/about.html", "Garrett Feb 18 essay context"),
                site("Google Maps", "sites/maps/index.html", "Slippy maps · pan/zoom · local search",
                     ["Zoom/pan theater", "Search what/where", "State saves in this browser"]),
                site("HousingMaps", "sites/housingmaps/index.html", "Craigslist-on-Maps mashup filter"),
                site("Maps mashups", "sites/maps/mashups.html", "API / remix culture"),
            ]),
            branch("Trail · Video + votes", "Broadcast yourself · digg it", [
                site("YouTube", "sites/youtube/index.html", "Upload · watch · like · still independent",
                     ["Upload a title", "See it on the list", "Watch · like increments views"]),
                site("Digg", "sites/digg/index.html", "Digg / bury · submit story"),
                site("Reddit", "sites/reddit/index.html", "Submit · boost score"),
                site("Slashdot", "sites/slashdot/index.html", "Older nerd-news continuum"),
            ]),
            branch("Trail · Tags + M&A", "Buy the folksonomy", [
                site("Flickr", "sites/flickr/index.html", "Yahoo acquires · tags"),
                site("del.icio.us", "sites/delicious/index.html", "Bookmarks · Yahoo Dec 9 story"),
                site("MySpace about", "sites/myspace/about.html", "News Corp $580M"),
            ]),
            branch("Trail · Blogosphere / RSS", "Feeds everywhere", [
                site("Bloglines", "sites/bloglines/reader.html", "Add feed · reader list"),
                site("FeedBurner", "sites/feedburner/index.html", "Feed stats culture"),
                site("Technorati", "sites/technorati/index.html", "Cosmos · blog authority"),
                site("TechCrunch", "sites/techcrunch/index.html", "Startup blog rises"),
                site("iTunes Podcasts", "sites/itunes/index.html", "Jun 28 · free auto-download lore"),
            ]),
            branch("Social graph", "Who you know online", [
                site("Friendster", "sites/friendster/index.html", "Earlier graph"),
                site("MySpace", "sites/myspace/index.html", "Mass social"),
                site("Facebook (gated)", "sites/facebook/index.html", "Still campus networks"),
                site("LinkedIn", "sites/linkedin/index.html", "Work graph"),
            ]),
        ],
    }
    M["2006"] = {
        "thesis": "Social breakthrough — Twitter, News Feed + open Facebook, Digg peak, Docs, AWS. Pre-iPhone.",
        "shell": "Windows XP · IE 6 · IE7 download story",
        "how": [
            "Twitter: compose <=140 → timeline (itt06-tweets)",
            "Facebook: News Feed status · open registration Sep 26",
            "YouTube two-era: independent most of year · Google deal late",
        ],
        "branches": [
            branch("Enter", "Social year lobby", [
                site("Starting Point", "pages/home.html", "Twitter · Feed · Digg trails"),
                site("About 2006", "pages/about.html", "Scale · bans (no iPhone default)"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Microblog", "What are you doing?", [
                site("Twitter / Twttr", "sites/twitter/index.html", "Compose · timeline · 140 chars",
                     ["Type status", "Post", "See timeline · storage"]),
            ]),
            branch("Feed + open graph", "Facebook becomes the product", [
                site("News Feed", "sites/facebook/feed.html", "Status post · feed list"),
                site("Open registration", "sites/facebook/open.html", "Sep 26 · 13+ · email"),
                site("MySpace", "sites/myspace/index.html", "Still mass · competition pressure"),
            ]),
            branch("Video ownership shift", "Independent → Google", [
                site("YouTube", "sites/youtube/index.html", "Upload · watch · Oct 9 deal story"),
                site("Google Video", "sites/googlevideo/index.html", "Not the same product as YT"),
            ]),
            branch("UGC peak", "Digg nation", [
                site("Digg", "sites/digg/index.html", "Digg/bury · submit · peak year"),
                site("Reddit", "sites/reddit/index.html", "Under Digg in mindshare"),
            ]),
            branch("Cloud office", "Docs & AWS born", [
                site("Google Docs", "sites/docs/edit.html", "Edit/save document theater"),
                site("AWS", "sites/aws/index.html", "S3/EC2 birthmark for builders"),
                site("Google Reader", "sites/reader/index.html", "Subscribe feeds"),
            ]),
        ],
    }
    M["2007"] = {
        "thesis": "Phone as real browser — iPhone Safari (no App Store), open Gmail, Street View, FB Platform.",
        "shell": "Windows XP · IE · mobile Safari product story",
        "how": [
            "iPhone: browse URL / presets → history (no App Store yet)",
            "Gmail is open to everyone — compose without invite gate",
            "Maps → Street View five cities",
        ],
        "branches": [
            branch("Enter", "Mobile web year", [
                site("Starting Point", "pages/home.html", "iPhone · Gmail · Street View trails"),
                site("About 2007", "pages/about.html", "No App Store · scale"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Phone browser", "Three products · one device · no apps store", [
                site("iPhone", "sites/iphone/index.html", "Safari browse · presets · history",
                     ["Open a URL", "Use Maps/YouTube preset", "Read no-App-Store honesty"]),
            ]),
            branch("Open Google day", "Mail for everyone", [
                site("Gmail (open)", "sites/gmail/compose.html", "Compose · inbox · not invite-only"),
                site("Google Maps", "sites/maps/index.html", "Search · then Street View"),
                site("Street View", "sites/maps/streetview.html", "Five cities · turn controls"),
            ]),
            branch("Platforms & status", "Apps on Facebook · tweets at SXSW", [
                site("Facebook Platform", "sites/facebook/platform.html", "Add/remove app theater"),
                site("Twitter", "sites/twitter/index.html", "SXSW breakout compose"),
                site("YouTube (Google-owned)", "sites/youtube/index.html", "All-year Google ownership"),
            ]),
        ],
    }
    M["2008"] = {
        "thesis": "Apps + browser reinvention — App Store + iPhone 3G, Chrome, Android G1, Hulu.",
        "shell": "Windows XP · IE 7 · Chrome product room (not sole shell)",
        "how": [
            "App Store: browse → install theater",
            "Chrome: download theater · Windows-first",
            "Android G1: first phone story · not global mass yet",
        ],
        "branches": [
            branch("Enter", "Apps year lobby", [
                site("Starting Point", "pages/home.html", "App Store · Chrome · G1 chips"),
                site("About 2008", "pages/about.html", "Scale · Dropbox birthmark"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("App Store era", "Software as downloads on phone", [
                site("App Store", "sites/appstore/index.html", "Catalog · install theater",
                     ["Browse apps", "Install", "See local install list"]),
                site("iPhone 3G", "sites/iphone/index.html", "3G · GPS · $199 class · OS 2.0"),
            ]),
            branch("Browser reinvention", "Chrome vs IE habit", [
                site("Google Chrome", "sites/chrome/index.html", "Download · prefer theater"),
                site("Firefox 3", "sites/firefox/index.html", "Download Day framing"),
            ]),
            branch("Android begins", "First Google phone", [
                site("Android / G1", "sites/android/index.html", "T-Mobile G1 · market seed"),
            ]),
            branch("Video & social continuity", "Hulu · YT · FB Connect", [
                site("Hulu", "sites/hulu/index.html", "Legal streaming TV public"),
                site("YouTube", "sites/youtube/index.html", "HD densify late year"),
                site("Facebook", "sites/facebook/index.html", "Connect / identity seed"),
                site("Twitter", "sites/twitter/index.html", "Compose continues"),
                site("Dropbox", "sites/dropbox/index.html", "Sync folder birthmark"),
            ]),
        ],
    }
    M["2009"] = {
        "thesis": "Social & apps daily — 3GS, Like, FarmVille, Bing, Windows 7.",
        "shell": "XP · IE 8 · Win7 product (Oct)",
        "how": [
            "Facebook Like button culture · Beacon end story",
            "FarmVille: plant → plot state (itt09-farm)",
            "Bing: decision-engine search theater",
        ],
        "branches": [
            branch("Enter", "Daily social lobby", [
                site("Starting Point", "pages/home.html", "3GS · Like · FarmVille chips"),
                site("About 2009", "pages/about.html", "Scale · IE8 · Win7"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Phone + store scale", "Faster iPhone · huge catalog", [
                site("iPhone 3GS", "sites/iphone/index.html", "Video · copy/paste · prices"),
                site("App Store", "sites/appstore/index.html", "50k apps / 1B downloads honesty"),
            ]),
            branch("Like economy", "One-click social proof", [
                site("Facebook", "sites/facebook/index.html", "Like · Beacon epitaph"),
                site("FarmVille", "sites/farmville/index.html", "Plant · harvest theater on FB"),
                site("Twitter", "sites/twitter/index.html", "Mainstream status updates"),
            ]),
            branch("Search war", "Bing launches", [
                site("Bing", "sites/bing/index.html", "Decision engine search"),
                site("Google", "sites/google/index.html", "Default still Google for most"),
            ]),
            branch("Desktop OS", "Windows 7 ships late year", [
                site("Windows 7", "sites/windows7/index.html", "Oct GA · not January default"),
                site("IE 8", "sites/ie8/index.html", "Mar 19 browser product"),
                site("Chrome", "sites/chrome/index.html", "Mac/Linux late continuity"),
            ]),
            branch("Check-in seed", "Foursquare SXSW", [
                site("Foursquare", "sites/foursquare/index.html", "Check-in culture seed"),
                site("Kickstarter", "sites/kickstarter/index.html", "Crowdfunding seed"),
            ]),
        ],
    }
    M["2010"] = {
        "thesis": "Tablet + filters — iPad, iPhone 4, Instagram, Open Graph, Foursquare peak.",
        "shell": "Windows 7 · IE 8 · Chrome product room",
        "how": [
            "Instagram: filter → share → posts list (iOS-only honesty)",
            "iPad multipage product · iPhone 4 Antennagate honesty",
            "Foursquare check-in · Facebook Open Graph",
        ],
        "branches": [
            branch("Enter", "Tablet year lobby", [
                site("Starting Point", "pages/home.html", "iPad · IG · iPhone 4 chips"),
                site("About 2010", "pages/about.html", "Dual-cite scale · bans"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Tablet arrives", "A third device class", [
                site("iPad", "sites/ipad/index.html", "Announce · prices · multipage"),
                site("App Store catalog", "sites/appstore/index.html", "225k / 5B honesty class"),
            ]),
            branch("Phone cameras as social", "Filters go mainstream", [
                site("Instagram", "sites/instagram/index.html", "Share · filters · iOS-only",
                     ["Pick filter energy", "Share", "Posts persist itt10-ig-posts"]),
                site("iPhone 4", "sites/iphone/index.html", "Retina · FaceTime · Antennagate"),
            ]),
            branch("Social graph 2.0", "Open Graph · places · games peak", [
                site("Facebook", "sites/facebook/index.html", "Like · Places · Open Graph"),
                site("Foursquare", "sites/foursquare/index.html", "Check-in peak culture"),
                site("FarmVille", "sites/farmville/index.html", "Plant/share continuity"),
            ]),
            branch("Also-ran seeds", "Future giants in embryo", [
                site("Pinterest", "sites/pinterest/index.html", "Pinboard seed"),
                site("Uber SF", "sites/uber/index.html", "Black car seed honesty"),
                site("Google Wave funeral", "sites/wave/index.html", "Public then gone"),
            ]),
        ],
    }
    M["2011"] = {
        "thesis": "Streaming + Timeline + Siri — Spotify US, Facebook Timeline, Google+, iPhone 4S.",
        "shell": "Windows 7 · IE 9 · Chrome product",
        "how": [
            "Spotify US: invite / plan theater",
            "Facebook Timeline product · Google+ circles/+1/hangout",
            "Qwikster multi-step honesty · Siri on 4S only",
        ],
        "branches": [
            branch("Enter", "Streaming year lobby", [
                site("Starting Point", "pages/home.html", "Spotify · Timeline · Siri trails"),
                site("About 2011", "pages/about.html", "Dual-cite scale · hard bans"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Music streaming US", "Invite culture", [
                site("Spotify US", "sites/spotify/index.html", "Jul 14 · invite · plan theater"),
            ]),
            branch("Algorithmic social", "Timeline · Google+", [
                site("Facebook Timeline", "sites/facebook/index.html", "Profile as story · feed modes"),
                site("Google+", "sites/googleplus/index.html", "Circles · +1 · Hangouts"),
                site("Hangouts", "sites/googleplus/hangouts.html", "Start hangout · tiles · local only"),
            ]),
            branch("Voice AI phone", "4S / Siri / iCloud", [
                site("iPhone 4S / Siri", "sites/iphone/index.html", "Siri · iOS 5 · iCloud honesty"),
                site("iPad 2", "sites/ipad/index.html", "Thinner tablet generation"),
            ]),
            branch("Streaming drama", "Netflix stumbles", [
                site("Netflix / Qwikster", "sites/netflix/index.html", "Unbundle · Qwikster era"),
                site("IE 9", "sites/ie9/index.html", "Mar 14 browser product"),
                site("Instagram (still iOS)", "sites/instagram/index.html", "No Android default yet"),
            ]),
        ],
    }
    M["2012"] = {
        "thesis": "Mobile + visual web — IG Android + FB buy, IPO, Pinterest, iPhone 5, Win8, Chrome > IE.",
        "shell": "Windows 7 · Chrome/IE9 rising · Win8 product late",
        "how": [
            "Instagram Android: install → platform flag",
            "Facebook IPO / 1B culture rooms",
            "Pinterest pin · iPhone 5 Lightning/Maps honesty",
        ],
        "branches": [
            branch("Enter", "Mobile visual lobby", [
                site("Starting Point", "pages/home.html", "IG Android · IPO · Pinterest trails"),
                site("About 2012", "pages/about.html", "Dual-cite · hard bans"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Visual apps win", "Photos leave the desktop", [
                site("Instagram Android", "sites/instagram/android.html", "Apr 3 · install · FB buy path"),
                site("Instagram", "sites/instagram/index.html", "Share · filters continuum"),
                site("Pinterest", "sites/pinterest/index.html", "Mass pinboards"),
            ]),
            branch("Facebook as market", "IPO · one billion", [
                site("Facebook IPO", "sites/facebook/index.html", "IPO details · 1B users"),
                site("SOPA blackout", "sites/wikipedia/sopa-blackout.html", "Jan 18 protest literacy"),
            ]),
            branch("Phone hardware leap", "Lightning · Maps stumble", [
                site("iPhone 5", "sites/iphone/index.html", "Lightning · Maps controversy honesty"),
                site("iPad mini", "sites/ipad/index.html", "$329+ class"),
            ]),
            branch("Desktop OS & browser war", "Win8 · Chrome tops IE", [
                site("Windows 8", "sites/windows8/index.html", "Oct 26 · Start screen product"),
                site("Chrome", "sites/chrome/index.html", "StatCounter dual-week honesty"),
                site("UberX seed", "sites/uber/index.html", "Rideshare expands"),
            ]),
        ],
    }
    M["2013"] = {
        "thesis": "Short video · flat design · privacy mass story — Vine, Stories, iOS 7, Snowden.",
        "shell": "Windows 7 · Chrome · mobile flat UI product rooms",
        "how": [
            "Vine: hold to record → caption → post → feed",
            "Snapchat Stories · Instagram Video 15s",
            "iOS 7 flat redesign · Snowden / PRISM literacy multi-step",
        ],
        "branches": [
            branch("Enter", "Short-video lobby", [
                site("Starting Point", "pages/home.html", "Vine · Stories · iOS 7 app grid"),
                site("About 2013", "pages/about.html", "Dual-cite · bans · Bitcoin note"),
                site("Year flow map", "pages/map.html", "This UX tree"),
            ]),
            branch("Six-second loops", "Hold to record", [
                site("Vine", "sites/vine/index.html", "Feed of loops"),
                site("Record a Vine", "sites/vine/record.html", "Hold · caption · post",
                     ["Hold record", "Add caption", "Post → feed list"]),
                site("Vine Android", "sites/vine/android.html", "Jun 2 platform expand"),
            ]),
            branch("Stories & 15s video", "Ephemeral + longer clips", [
                site("Snapchat Stories", "sites/snapchat/story.html", "Add to My Story · 24h"),
                site("Snapchat", "sites/snapchat/index.html", "Send snap · Stories link"),
                site("Instagram Video", "sites/instagram/video.html", "15s · filters · share"),
            ]),
            branch("Flat phones overnight", "iOS 7 · Touch ID", [
                site("iOS 7", "sites/iphone/ios7.html", "Flat redesign literacy"),
                site("Touch ID", "sites/iphone/touchid.html", "5s fingerprint theater"),
                site("iPhone 5c", "sites/iphone/5c.html", "Color plastics · gold lore"),
                site("iPad Air", "sites/ipad/air.html", "Oct 22 thinner iPad"),
            ]),
            branch("Privacy hits the front page", "PRISM summer", [
                site("Snowden / PRISM", "sites/snowden/index.html", "Multi-card literacy → save"),
                site("HealthCare.gov", "sites/healthcare/index.html", "Launch · outage · retry theater"),
            ]),
            branch("Desktop & consoles", "Chrome #1 · next gen boxes", [
                site("Chrome", "sites/chrome/index.html", "Desktop share story · download"),
                site("Windows 8.1", "sites/windows81/index.html", "Oct 17 Start button return lore"),
                site("PS4", "sites/ps4/index.html", "Share button · launch honesty"),
                site("Xbox One", "sites/xboxone/index.html", "Kinect-in-box · DRM controversy"),
            ]),
        ],
    }
    return M


def write_flow_maps_js(maps: dict) -> None:
    lines = [
        "/**",
        " * Flow maps by year — UX trees (sites + what you do).",
        " * Consumed by js/immersion/flow-map.js on pages/map.html",
        " */",
        "(function (global) {",
        '  "use strict";',
        "  var ITT = global.ITT || (global.ITT = {});",
        "  ITT.flowMaps = ITT.flowMaps || {};",
        "",
    ]
    for y in sorted(maps.keys()):
        data = dict(maps[y])
        data["year"] = y
        # compact JSON as JS object
        blob = json.dumps(data, ensure_ascii=False, indent=2)
        # indent for file
        indented = "\n".join("  " + ln if ln else ln for ln in blob.splitlines())
        lines.append(f'  ITT.flowMaps["{y}"] = {indented};')
        lines.append("")
    lines.append('})(typeof window !== "undefined" ? window : this);')
    path = ROOT / "js/config/flow-maps.js"
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("wrote", path, path.stat().st_size)


def write_module() -> None:
    path = ROOT / "js/immersion/flow-map.js"
    path.write_text(r'''/**
 * Flow map — render year UX tree into [data-itt-flow-map]
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function R(path) {
    path = String(path || "");
    if (ITT.util && typeof ITT.util.resolveYearPath === "function") {
      try {
        return ITT.util.resolveYearPath(path);
      } catch (e) { /* fall through */ }
    }
    /* pages/map.html → relative links */
    if (path.indexOf("pages/") === 0) return path.replace(/^pages\//, "");
    if (path.indexOf("sites/") === 0) return "../" + path;
    return path;
  }

  function yearOf() {
    if (ITT._immersionYear) return String(ITT._immersionYear);
    try {
      var y = document.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e) { /* */ }
    var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
    return m ? m[1] : "1995";
  }

  function render(host, data) {
    if (!host || !data) return;
    var y = data.year || yearOf();
    var html = [];
    html.push('<div class="itt-fmap">');
    html.push('<header class="itt-fmap-head">');
    html.push("<h1>" + esc(y) + " · UX flow map</h1>");
    html.push('<p class="itt-fmap-thesis">' + esc(data.thesis || "") + "</p>");
    html.push('<p class="itt-fmap-shell"><b>Shell:</b> ' + esc(data.shell || "") + "</p>");
    html.push("</header>");

    if (data.how && data.how.length) {
      html.push('<section class="itt-fmap-how"><h2>How the experience works</h2><ol>');
      for (var h = 0; h < data.how.length; h++) {
        html.push("<li>" + esc(data.how[h]) + "</li>");
      }
      html.push("</ol></section>");
    }

    html.push('<section class="itt-fmap-tree">');
    html.push("<h2>Trails &amp; sites (tree)</h2>");
    html.push('<p class="itt-fmap-legend">Each branch is a path you can click through. <b>What it does</b> is the period product action (localStorage theater only).</p>');
    html.push('<ul class="itt-fmap-branches">');
    var branches = data.branches || [];
    for (var i = 0; i < branches.length; i++) {
      var b = branches[i];
      html.push('<li class="itt-fmap-branch">');
      html.push('<div class="itt-fmap-branch-label"><span class="itt-fmap-twig" aria-hidden="true">&#9500;&#9472;</span> <b>' + esc(b.label) + "</b>");
      if (b.do) html.push('<span class="itt-fmap-do"> — ' + esc(b.do) + "</span>");
      html.push("</div><ul class=\"itt-fmap-sites\">");
      var sites = b.sites || [];
      for (var j = 0; j < sites.length; j++) {
        var s = sites[j];
        var tw = j === sites.length - 1 ? "&#9492;&#9472;" : "&#9500;&#9472;";
        html.push('<li class="itt-fmap-site">');
        html.push('<span class="itt-fmap-twig" aria-hidden="true">' + tw + "</span> ");
        if (s.href) {
          html.push('<a class="itt-fmap-name" href="' + esc(R(s.href)) + '"><b>' + esc(s.name) + "</b></a>");
        } else {
          html.push("<b>" + esc(s.name) + "</b>");
        }
        if (s.do) html.push('<span class="itt-fmap-do"> — ' + esc(s.do) + "</span>");
        if (s.steps && s.steps.length) {
          html.push('<ol class="itt-fmap-steps">');
          for (var k = 0; k < s.steps.length; k++) {
            html.push("<li>" + esc(s.steps[k]) + "</li>");
          }
          html.push("</ol>");
        }
        html.push("</li>");
      }
      html.push("</ul></li>");
    }
    html.push("</ul></section>");
    html.push('<footer class="itt-fmap-foot">');
    html.push('<a href="' + esc(R("pages/home.html")) + '">&larr; Starting Point</a> · ');
    html.push('<a href="' + esc(R("pages/about.html")) + '">About ' + esc(y) + "</a>");
    html.push('<p class="itt-fmap-note">All actions stay in this browser only · no real accounts or payments.</p>');
    html.push("</footer></div>");
    host.innerHTML = html.join("");
  }

  function boot(doc) {
    doc = doc || document;
    var host = doc.querySelector("[data-itt-flow-map]");
    if (!host) return;
    var y = yearOf();
    var data = (ITT.flowMaps && ITT.flowMaps[y]) || null;
    if (!data) {
      host.innerHTML =
        '<p class="itt-fmap-missing">Flow map data missing for ' +
        esc(y) +
        ". Ensure <code>js/config/flow-maps.js</code> is loaded.</p>";
      return;
    }
    render(host, data);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "flowMap", featureKey: "flowMap", boot: boot });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "flowMap",
      needs: function () { return true; },
      init: function () { boot(document); }
    });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
''', encoding="utf-8")
    print("wrote", path)


def write_css() -> None:
    path = ROOT / "css/flow-map.css"
    path.write_text(
        """/* Flow map — year UX tree */
.itt-fmap {
  max-width: 720px;
  margin: 0 auto;
  font-family: "MS Sans Serif", Tahoma, Arial, Helvetica, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: #000;
}
.itt-fmap-head h1 { font-size: 18px; margin: 0 0 8px; }
.itt-fmap-thesis { margin: 0 0 6px; font-size: 13px; }
.itt-fmap-shell {
  margin: 0 0 12px;
  font-size: 12px;
  color: #333;
  background: #ffffcc;
  border: 1px solid #999;
  padding: 6px 8px;
}
.itt-fmap-how {
  margin: 0 0 16px;
  border: 1px solid #666;
  background: #f0f0f0;
  padding: 8px 12px;
}
.itt-fmap-how h2,
.itt-fmap-tree h2 { font-size: 14px; margin: 0 0 6px; }
.itt-fmap-how ol { margin: 4px 0 0 20px; padding: 0; }
.itt-fmap-legend { font-size: 11px; color: #444; margin: 0 0 10px; }
.itt-fmap-branches { list-style: none; margin: 0; padding: 0; }
.itt-fmap-branch {
  margin: 0 0 14px;
  border-left: 3px solid #0a246a;
  padding-left: 10px;
}
.itt-fmap-branch-label { margin: 0 0 4px; font-size: 13px; }
.itt-fmap-sites {
  list-style: none;
  margin: 0 0 0 8px;
  padding: 0;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}
.itt-fmap-site { margin: 2px 0; padding: 2px 0; }
.itt-fmap-twig { color: #666; user-select: none; }
a.itt-fmap-name { color: #0000cc; text-decoration: underline; }
.itt-fmap-do {
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 12px;
}
.itt-fmap-steps {
  margin: 2px 0 6px 28px;
  padding: 0;
  font-family: Tahoma, Arial, sans-serif;
  font-size: 11px;
  color: #222;
}
.itt-fmap-foot {
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid #999;
  font-size: 12px;
}
.itt-fmap-note { font-size: 11px; color: #666; margin: 8px 0 0; }
.itt-fmap-missing {
  color: #900;
  padding: 12px;
  border: 1px solid #c66;
  background: #fee;
}
""",
        encoding="utf-8",
    )
    print("wrote", path)


def write_map_pages() -> None:
    for y in range(1994, 2014):
        ydir = ROOT / f"years/{y}/pages"
        ydir.mkdir(parents=True, exist_ok=True)
        if y == 1994:
            css = "../../../css/mosaic-defaults.css"
            bg = "#C0C0C0"
            imm = "../../../js/immersion.js"
        else:
            css = f"../../../css/period-{y}.css"
            bg = "#ffffff"
            imm = f"../../../js/immersion-{y}.js"
        html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{y}">
<head>
<meta charset="utf-8">
<title>{y} — UX flow map</title>
<link rel="stylesheet" href="{css}">
<link rel="stylesheet" href="../../../css/flow-map.css">
<script src="../../../js/config/flow-maps.js"></script>
</head>
<body bgcolor="{bg}" text="#000000" link="#0000cc" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p style="font-family:Arial,sans-serif;font-size:12px;margin:8px 12px">
 <a href="home.html"><b>&larr; Starting Point</b></a> ·
 <a href="about.html">About {y}</a> ·
 <b>Flow map</b>
</p>
<div data-itt-flow-map style="padding:8px 12px 24px"></div>
<script src="{imm}"></script>
</body>
</html>
"""
        (ydir / "map.html").write_text(html, encoding="utf-8")
    print("wrote 20 map.html pages")


def patch_registry() -> None:
    reg = ROOT / "js/immersion/registry.js"
    text = reg.read_text(encoding="utf-8")
    if "immersion/flow-map.js" in text:
        print("registry already has flow-map")
        return
    # After shared.js in every year list
    text2 = text.replace(
        '"immersion/shared.js",\n',
        '"immersion/shared.js",\n      "immersion/flow-map.js",\n',
    )
    if text2 == text:
        raise SystemExit("registry patch failed")
    reg.write_text(text2, encoding="utf-8")
    print("patched registry.js")


def patch_immersion_configs() -> None:
    import re

    for y in range(1994, 2014):
        p = ROOT / f"js/config/immersion-{y}.js"
        s = p.read_text(encoding="utf-8")
        changed = False
        # features.flowMap
        if "flowMap:" not in s:
            s = re.sub(
                r"(features:\s*\{)",
                r"\1\n      flowMap: true,",
                s,
                count=1,
            )
            changed = True
        # footerNav entry
        if "pages/map.html" not in s:
            # insert after Starting Point / Start / home entry in footerNav if present
            if "footerNav:" in s and "pages/map.html" not in s:
                s = re.sub(
                    r'(footerNav:\s*\[\s*\n\s*\{ label: "[^"]+", href: "pages/home\.html" \},)',
                    r'\1\n      { label: "Flow map", href: "pages/map.html" },',
                    s,
                    count=1,
                )
                if "pages/map.html" not in s:
                    # try Start label
                    s = re.sub(
                        r'(footerNav:\s*\[\s*\n)',
                        r'\1      { label: "Flow map", href: "pages/map.html" },\n',
                        s,
                        count=1,
                    )
                changed = True
        # nav bar optional
        if re.search(r"\bnav:\s*\[", s) and "pages/map.html" not in s.split("nav:")[1].split("footerNav")[0] if "footerNav" in s else True:
            # add Map after Start in nav if not present
            nav_section = s
            if 'href: "pages/map.html"' not in s:
                s2 = re.sub(
                    r'(\{ label: "(?:Start|Starting Point|Home)", href: "pages/home\.html"[^}]*\},)',
                    r'\1\n      { label: "Map", href: "pages/map.html", match: "/map" },',
                    s,
                    count=1,
                )
                if s2 != s:
                    s = s2
                    changed = True
        if changed:
            p.write_text(s, encoding="utf-8")
            print("patched immersion", y)
        else:
            print("immersion", y, "unchanged or partial")


def patch_browser_urlmaps() -> None:
    import re

    for y in range(1994, 2014):
        p = ROOT / f"js/config/{y}.js"
        if not p.exists():
            continue
        s = p.read_text(encoding="utf-8")
        if "pages/map.html" in s:
            continue
        # insert near pages/home.html in urlMap
        s2 = re.sub(
            r'("pages/home\.html"\s*:\s*"[^"]*")',
            rf'\1,\n      "pages/map.html": "http://museum.local/years/{y}/map/"',
            s,
            count=1,
        )
        # titleMap if present
        if "titleMap" in s2 and "pages/map.html" not in s2.split("titleMap")[1][:800]:
            s2 = re.sub(
                r'("pages/home\.html"\s*:\s*"[^"]*")',
                rf'\1,\n      "pages/map.html": "{y} — UX flow map"',
                s2,
                count=1,
            ) if s2.count('"pages/home.html"') > 1 else s2
            # safer: only if titleMap block doesn't have map
            if '"pages/map.html": "' + str(y) not in s2:
                s2 = re.sub(
                    r'(titleMap:\s*\{[^}]*"pages/home\.html"\s*:\s*"[^"]*")',
                    rf'\1,\n      "pages/map.html": "{y} UX flow map"',
                    s2,
                    count=1,
                    flags=re.S,
                )
        if s2 != s:
            p.write_text(s2, encoding="utf-8")
            print("patched browser config", y)
        else:
            print("browser config", y, "no patch")


def patch_homes() -> None:
    """Add Flow map link near top of home pages."""
    for y in range(1994, 2014):
        p = ROOT / f"years/{y}/pages/home.html"
        if not p.exists():
            continue
        s = p.read_text(encoding="utf-8")
        if "map.html" in s and "Flow map" in s:
            continue
        # insert after data-itt-tour div if present, else after first product chips, else after body open content
        link = (
            f'\n<p class="itt-flow-map-link" style="margin:10px 0;font-size:12px">'
            f'<a href="map.html"><b>&#9783; {y} UX flow map</b></a>'
            f' — tree of trails, sites, and what each one does</p>\n'
        )
        if 'data-itt-tour' in s:
            s = s.replace(
                '<div data-itt-tour></div>',
                '<div data-itt-tour></div>' + link,
                1,
            )
        elif 'itt-product-chips' in s:
            # after chips block start
            s = s.replace(
                'class="itt-product-chips"',
                'class="itt-product-chips"',
                1,
            )
            # inject before chips
            s = s.replace(
                '<div class="itt-product-chips"',
                link + '<div class="itt-product-chips"',
                1,
            )
        else:
            # after itt-nav-slot
            s = s.replace(
                'aria-hidden="true"></div>',
                'aria-hidden="true"></div>' + link,
                1,
            )
        p.write_text(s, encoding="utf-8")
        print("patched home", y)


def main() -> None:
    maps = build_maps()
    assert len(maps) == 20
    write_flow_maps_js(maps)
    write_module()
    write_css()
    write_map_pages()
    patch_registry()
    patch_immersion_configs()
    patch_browser_urlmaps()
    patch_homes()
    print("ALL OK")


if __name__ == "__main__":
    main()
