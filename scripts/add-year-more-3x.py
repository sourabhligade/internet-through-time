#!/usr/bin/env python3
"""Three NEW leftover doors per shipped year (1994–2018).

Not the star. Not the original 3×. Not extra-a/b.
Guided 6 + official 10 stay locked.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year -> (slug, href from home, label, title, lead, picks[(id,label,q)], ph, btn, req, bg, fg)
# href is relative to pages/home.html
ROOMS: dict[str, list[dict]] = {}


def add(year: str, slug: str, href: str, label: str, title: str, lead: str, picks, ph: str, btn: str, req: str, bg: str, fg: str, next_href: str, next_lab: str) -> None:
    ROOMS.setdefault(year, []).append({
        "id": slug,
        "href": href,
        "label": label,
        "file": href.replace("../", ""),
        "title": title,
        "lead": lead,
        "picks": picks,
        "ph": ph,
        "btn": btn,
        "req": req,
        "bg": bg,
        "fg": fg,
        "next": next_href,
        "nl": next_lab,
    })


# 1994
add("1994", "prodigy", "../sites/prodigy/index.html", "Prodigy",
    "Prodigy — 1994 leftover", "Walled garden leftover. Hotlist is the chip.",
    [("news", "news", "news"), ("shop", "shop", "shop"), ("mail", "mail", "mail")],
    "news", "Go", "Prodigy leftover — not Mosaic, not the hotlist chip.", "#003399", "#fff",
    "../compuserve/index.html", "CompuServe leftover")
add("1994", "compuserve", "../sites/compuserve/index.html", "CompuServe",
    "CompuServe — 1994 leftover", "Forums leftover. Hotlist is the chip.",
    [("forum", "forum", "forum"), ("mail", "mail", "mail"), ("go", "GO word", "GO INTERNET")],
    "forum", "GO", "CompuServe leftover — not the hotlist chip.", "#000080", "#fff",
    "../pathfinder/index.html", "Pathfinder leftover")
add("1994", "pathfinder", "../sites/pathfinder/index.html", "Pathfinder",
    "Pathfinder — 1994 leftover", "Time Warner web hub leftover. Hotlist is the chip.",
    [("time", "TIME", "TIME"), ("people", "People", "People"), ("fortune", "Fortune", "Fortune")],
    "TIME", "Open", "Pathfinder leftover — not the hotlist chip.", "#990000", "#fff",
    "../../pages/home.html", "Starting Point")

# 1995
add("1995", "wsj", "../sites/wsj/index.html", "WSJ",
    "Wall Street Journal — 1995 leftover", "Paywall-class leftover. Amazon SSL is the chip.",
    [("front", "front", "front page"), ("tech", "tech", "tech"), ("mkt", "markets", "markets")],
    "front page", "Read", "WSJ leftover — not Amazon SSL.", "#000", "#fff",
    "../timewarner/index.html", "Time Warner leftover")
add("1995", "timewarner", "../sites/timewarner/index.html", "Time Warner",
    "Time Warner path — 1995 leftover", "Portal leftover. Amazon SSL is the chip.",
    [("path", "Pathfinder", "Pathfinder"), ("cnn", "CNN", "CNN"), ("time", "TIME", "TIME")],
    "Pathfinder", "Open", "Time Warner leftover — not Amazon SSL.", "#003366", "#fff",
    "../hotbot/index.html", "HotBot leftover")
add("1995", "hotbot", "../sites/hotbot/index.html", "HotBot",
    "HotBot — 1995 leftover", "Wired search leftover. AltaVista extra is not this door.",
    [("web", "the web", "the web"), ("wired", "Wired", "Wired"), ("java", "Java", "Java")],
    "the web", "Search", "HotBot leftover — not AltaVista, not Amazon SSL.", "#003300", "#0f0",
    "../../pages/home.html", "Starting Point")

# 1996
add("1996", "totalny", "../sites/totalny/index.html", "TotalNY",
    "totalny — 1996 leftover", "City guide leftover. Portal wars is the chip.",
    [("eat", "eat", "eat"), ("go", "go out", "go out"), ("nyc", "nyc", "nyc")],
    "eat", "Open", "totalny leftover — not HoTMaiL, not the portal chip.", "#000", "#fc0",
    "../pathfinder/index.html", "Pathfinder leftover")
add("1996", "pathfinder", "../sites/pathfinder/index.html", "Pathfinder",
    "Pathfinder — 1996 leftover", "Time Warner hub leftover. Portal wars is the chip.",
    [("time", "TIME", "TIME"), ("people", "People", "People"), ("ew", "EW", "EW")],
    "TIME", "Open", "Pathfinder leftover — not the portal chip.", "#990000", "#fff",
    "../hotbot/index.html", "HotBot leftover")
add("1996", "hotbot", "../sites/hotbot/index.html", "HotBot",
    "HotBot — 1996 leftover", "Wired search leftover. Portal wars is the chip.",
    [("web", "the web", "the web"), ("jam", "Space Jam", "Space Jam"), ("mail", "HoTMaiL", "HoTMaiL")],
    "the web", "Search", "HotBot leftover — not the portal chip.", "#003300", "#0f0",
    "../../pages/home.html", "Starting Point")

# 1997
add("1997", "newscom", "../sites/newscom/index.html", "news.com",
    "news.com — 1997 leftover", "CNET news leftover. PointCast is the chip.",
    [("msft", "Microsoft", "Microsoft"), ("intel", "Intel", "Intel"), ("net", "Netscape", "Netscape")],
    "Microsoft", "Read", "news.com leftover — not PointCast.", "#cc0000", "#fff",
    "../drudgereport/index.html", "Drudge leftover")
add("1997", "drudgereport", "../sites/drudgereport/index.html", "Drudge",
    "Drudge Report — 1997 leftover", "Link dump leftover. PointCast is the chip.",
    [("scoop", "scoop", "scoop"), ("wire", "wire", "wire"), ("link", "link", "link")],
    "scoop", "Open", "Drudge leftover — not PointCast.", "#000", "#0f0",
    "../hotwired/index.html", "HotWired leftover")
add("1997", "hotwired", "../sites/hotwired/index.html", "HotWired",
    "HotWired — 1997 leftover", "Wired online leftover. PointCast is the chip.",
    [("rgb", "RGB", "RGB"), ("packet", "Packet", "Packet"), ("coin", "Coin", "Coin")],
    "RGB", "Open", "HotWired leftover — not PointCast.", "#000", "#fc0",
    "../../pages/home.html", "Starting Point")

# 1998
add("1998", "opendiary", "../sites/opendiary/index.html", "Open Diary",
    "Open Diary — 1998 leftover", "Public diary leftover. Skip-Intro is the game. Lucky is extra.",
    [("today", "today", "today"), ("secret", "secret", "secret"), ("school", "school", "school")],
    "today", "Post", "Open Diary leftover — not Lucky, not Skip-Intro.", "#336699", "#fff",
    "../icqweb/index.html", "ICQ web leftover")
add("1998", "icqweb", "../sites/icqweb/index.html", "ICQ web",
    "ICQ on the web — 1998 leftover", "UIN leftover. Not the 1997 ICQ extra.",
    [("uin", "UIN", "12345678"), ("msg", "message", "you there"), ("away", "away", "away")],
    "12345678", "Ping", "ICQ web leftover — not Lucky.", "#0066cc", "#fff",
    "../broadcastcom/index.html", "broadcast.com leftover")
add("1998", "broadcastcom", "../sites/broadcastcom/index.html", "broadcast.com",
    "broadcast.com — 1998 leftover", "Audio/video leftover. Yahoo buys it later.",
    [("radio", "radio", "radio"), ("sports", "sports", "sports"), ("talk", "talk", "talk")],
    "radio", "Listen (theater)", "broadcast.com leftover — not Lucky.", "#003366", "#fff",
    "../../pages/home.html", "Starting Point")

# 1999
add("1999", "theonion", "../sites/theonion/index.html", "The Onion",
    "The Onion — 1999 leftover", "Satire leftover. Pixel Pet is the game.",
    [("head", "headline", "headline"), ("op", "opinion", "opinion"), ("local", "local", "local")],
    "headline", "Read", "Onion leftover — not Neopets, not Napster extra.", "#000", "#fff",
    "../drkoop/index.html", "drkoop leftover")
add("1999", "drkoop", "../sites/drkoop/index.html", "drkoop.com",
    "drkoop.com — 1999 leftover", "Health-portal leftover. Crash-year seed.",
    [("cold", "cold", "cold"), ("heart", "heart", "heart"), ("ask", "ask", "ask")],
    "cold", "Search", "drkoop leftover — not the pet chip.", "#006633", "#fff",
    "../sixdegrees/index.html", "SixDegrees leftover")
add("1999", "sixdegrees", "../sites/sixdegrees/index.html", "SixDegrees",
    "SixDegrees — 1999 leftover", "Early social leftover. Not Friendster.",
    [("friend", "friend", "friend"), ("invite", "invite", "invite"), ("deg", "degree", "degree")],
    "friend", "Connect", "SixDegrees leftover — not the pet chip.", "#333399", "#fff",
    "../../pages/home.html", "Starting Point")

# 2000
add("2000", "ivillage", "../sites/ivillage/index.html", "iVillage",
    "iVillage — 2000 leftover", "Women’s portal leftover. Lot Life is the game.",
    [("board", "board", "board"), ("baby", "baby", "baby"), ("work", "work", "work")],
    "board", "Open", "iVillage leftover — not Pets.com extra.", "#cc3366", "#fff",
    "../womencom/index.html", "Women.com leftover")
add("2000", "womencom", "../sites/womencom/index.html", "Women.com",
    "Women.com — 2000 leftover", "Portal leftover. Lot Life is the game.",
    [("mag", "magazine", "magazine"), ("chat", "chat", "chat"), ("shop", "shop", "shop")],
    "magazine", "Open", "Women.com leftover — not the Sims cabinet.", "#990033", "#fff",
    "../napsterweb/index.html", "Napster web leftover")
add("2000", "napsterweb", "../sites/napsterweb/index.html", "Napster web",
    "Napster on the web — 2000 leftover", "Scare leftover. No real share. 1999 extra is search.",
    [("mp3", "mp3", "mp3"), ("query", "query", "query"), ("user", "user", "user")],
    "mp3", "Search (no share)", "Napster web leftover — no live swarm.", "#1a1a2e", "#6c3",
    "../../pages/home.html", "Starting Point")

# 2001
add("2001", "moveon", "../sites/moveon/index.html", "MoveOn",
    "MoveOn — 2001 leftover", "Petition leftover. Clickscape is the game.",
    [("sign", "sign", "sign"), ("fwd", "forward", "forward"), ("note", "note", "note")],
    "sign", "Sign (theater)", "MoveOn leftover — not Wikipedia extra.", "#003366", "#fff",
    "../grok/index.html", "Grok leftover")
add("2001", "grok", "../sites/grok/index.html", "Grok",
    "Grok — 2001 leftover", "Museum original leftover name. Not a product claim.",
    [("read", "read", "read"), ("link", "link", "link"), ("note", "note", "note")],
    "read", "Open", "Grok leftover — not the RuneScape cabinet.", "#222", "#9f9",
    "../appleimac/index.html", "iMac leftover")
add("2001", "appleimac", "../sites/appleimac/index.html", "iMac",
    "iMac leftover — 2001", "Flower-power leftover. iPod extra is the wheel.",
    [("indigo", "Indigo", "Indigo"), ("flower", "Flower Power", "Flower Power"), ("snow", "Snow", "Snow")],
    "Indigo", "Pick", "iMac leftover — not the click-wheel extra.", "#111", "#fff",
    "../../pages/home.html", "Starting Point")

# 2002
add("2002", "fark", "../sites/fark/index.html", "Fark",
    "Fark — 2002 leftover", "Link dump leftover. Room Sticky is the game.",
    [("photoshop", "photoshop", "photoshop"), ("dumbass", "dumbass", "dumbass"), ("sports", "sports", "sports")],
    "photoshop", "Open", "Fark leftover — not Stumble extra.", "#fff", "#111",
    "../homestar/index.html", "Homestar leftover")
add("2002", "homestar", "../sites/homestar/index.html", "Homestar",
    "Homestar Runner — 2002 leftover", "Flash toon leftover. No ripped SWF.",
    [("sbemail", "sbemail", "sbemail"), ("toon", "toon", "toon"), ("trogdor", "trogdor", "trogdor")],
    "sbemail", "Play (theater)", "Homestar leftover — museum JS, no SWF.", "#003", "#fc0",
    "../blogspot/index.html", "Blogspot leftover")
add("2002", "blogspot", "../sites/blogspot/index.html", "Blogspot",
    "Blogspot — 2002 leftover", "Blogger host leftover. Not LiveJournal.",
    [("post", "post", "post"), ("template", "template", "template"), ("comment", "comment", "comment")],
    "post", "Publish", "Blogspot leftover — not Friendster.", "#ff9900", "#111",
    "../../pages/home.html", "Starting Point")

# 2003
add("2003", "evite", "../sites/evite/index.html", "Evite",
    "Evite — 2003 leftover", "Party invite leftover. Gags Lite is the game.",
    [("party", "party", "party"), ("rsvp", "RSVP", "RSVP"), ("addr", "address", "address")],
    "party", "RSVP (theater)", "Evite leftover — not Top 8 extra.", "#663399", "#fff",
    "../tribe/index.html", "Tribe leftover")
add("2003", "tribe", "../sites/tribe/index.html", "Tribe.net",
    "Tribe.net — 2003 leftover", "Social leftover. Not MySpace extra.",
    [("tribe", "tribe", "tribe"), ("post", "post", "post"), ("join", "join", "join")],
    "tribe", "Join", "Tribe leftover — not the Toontown cabinet.", "#336633", "#fff",
    "../secondlifegrid/index.html", "Second Life leftover")
add("2003", "secondlifegrid", "../sites/secondlifegrid/index.html", "Second Life",
    "Second Life — 2003 leftover", "Grid leftover. Not a 2003 star.",
    [("land", "land", "land"), ("av", "avatar", "avatar"), ("tp", "teleport", "teleport")],
    "land", "Teleport (theater)", "Second Life leftover — no live grid.", "#000", "#9cf",
    "../../pages/home.html", "Starting Point")

# 2004
add("2004", "yelplocal", "../sites/yelplocal/index.html", "Yelp",
    "Yelp — 2004 leftover", "Local review leftover. Gem Cascade is the game.",
    [("taco", "taco", "taco"), ("cafe", "cafe", "cafe"), ("bar", "bar", "bar")],
    "taco", "Review", "Yelp leftover — not thefacebook poke extra.", "#c41200", "#fff",
    "../orkutcircle/index.html", "Orkut leftover")
add("2004", "orkutcircle", "../sites/orkutcircle/index.html", "Orkut",
    "Orkut — 2004 leftover", "Google social leftover. Not thefacebook.",
    [("scraps", "scraps", "scraps"), ("comm", "community", "community"), ("friend", "friend", "friend")],
    "scraps", "Add", "Orkut leftover — not poke extra.", "#dd4b39", "#fff",
    "../flickrpro/index.html", "Flickr Pro leftover")
add("2004", "flickrpro", "../sites/flickrpro/index.html", "Flickr Pro",
    "Flickr Pro leftover — 2004", "Pro leftover. Fave extra is the star leftover photo.",
    [("pro", "Pro", "Pro"), ("set", "set", "set"), ("tag", "tag", "tag")],
    "Pro", "Upgrade (theater)", "Flickr Pro leftover — no real bill.", "#ff0084", "#fff",
    "../../pages/home.html", "Starting Point")

# 2005
add("2005", "redditfront", "../sites/redditfront/index.html", "reddit front",
    "reddit — 2005 leftover", "Front page leftover. HoverChop is the game. YouTube is extra.",
    [("prog", "programming", "programming"), ("pics", "pics", "pics"), ("sci", "science", "science")],
    "programming", "Open", "reddit leftover — not YouTube surge extra.", "#cee3f8", "#000",
    "../googleearthkml/index.html", "Earth leftover")
add("2005", "googleearthkml", "../sites/googleearthkml/index.html", "Earth KML",
    "Google Earth KML — 2005 leftover", "Desktop globe leftover. Maps drag is extra.",
    [("fly", "fly to", "fly to"), ("kml", "KML", "KML"), ("tilt", "tilt", "tilt")],
    "fly to", "Fly (theater)", "Earth leftover — no live tiles.", "#1a73e8", "#fff",
    "../kayakplus/index.html", "Kayak leftover")
add("2005", "kayakplus", "../sites/kayakplus/index.html", "Kayak",
    "Kayak — 2005 leftover", "Fare leftover. Not Maps.",
    [("sfo", "SFO", "SFO"), ("jfk", "JFK", "JFK"), ("lax", "LAX", "LAX")],
    "SFO", "Search fares", "Kayak leftover — no live fares.", "#ff690f", "#fff",
    "../../pages/home.html", "Starting Point")

# 2006
add("2006", "twitterbird", "../sites/twitterbird/index.html", "Twitter bird",
    "Twitter bird leftover — 2006", "140 leftover. 140 type is extra. TrailSled is the game.",
    [("doing", "what are you doing", "what are you doing"), ("twttr", "twttr", "twttr"), ("sms", "SMS", "SMS")],
    "twttr", "Update", "Twitter bird leftover — not the 140 extra twice.", "#c0deed", "#033",
    "../wikihow06/index.html", "wikiHow leftover")
add("2006", "wikihow06", "../sites/wikihow06/index.html", "wikiHow",
    "wikiHow — 2006 leftover", "How-to leftover.",
    [("modem", "modem", "modem"), ("blog", "blog", "blog"), ("wifi", "wifi", "wifi")],
    "modem", "Read", "wikiHow leftover — not Wikipedia 2001.", "#93b874", "#111",
    "../diggv4/index.html", "Digg v4 leftover")
add("2006", "diggv4", "../sites/diggv4/index.html", "Digg v4",
    "Digg v4 leftover — 2006", "Upcoming leftover. Digg up is extra.",
    [("up", "upcoming", "upcoming"), ("front", "front", "front"), ("video", "video", "video")],
    "upcoming", "Digg", "Digg v4 leftover — not the Digg extra twice.", "#1b5790", "#fff",
    "../../pages/home.html", "Starting Point")

# 2007
add("2007", "tumblrlog", "../sites/tumblrlog/index.html", "Tumblr",
    "Tumblr — 2007 leftover", "Reblog leftover. Box Shift is the game.",
    [("reblog", "reblog", "reblog"), ("photo", "photo", "photo"), ("quote", "quote", "quote")],
    "reblog", "Reblog", "Tumblr leftover — not iPhone Safari extra.", "#36465d", "#fff",
    "../kindlestore/index.html", "Kindle leftover")
add("2007", "kindlestore", "../sites/kindlestore/index.html", "Kindle store",
    "Kindle store leftover — 2007", "$399 leftover. Whispernet theater.",
    [("book", "book", "book"), ("whisp", "whispernet", "whispernet"), ("exp", "experimental", "experimental")],
    "book", "Buy (theater)", "Kindle leftover — no real bill.", "#111", "#fff",
    "../iphonesafari/index.html", "Safari leftover")
add("2007", "iphonesafari", "../sites/iphonesafari/index.html", "Safari iPhone",
    "Safari on iPhone leftover — 2007", "No store yet. Safari URL extra is separate.",
    [("url", "apple.com", "apple.com"), ("pinch", "pinch", "pinch"), ("mail", "mail", "mail")],
    "apple.com", "Go", "Safari leftover — store is 2008.", "#c8c8c8", "#111",
    "../../pages/home.html", "Starting Point")

# 2008
add("2008", "spotifyeu", "../sites/spotifyeu/index.html", "Spotify EU",
    "Spotify EU — 2008 leftover", "EU leftover. US is 2011. Goo Span is the game.",
    [("invite", "invite", "invite"), ("play", "play", "play"), ("queue", "queue", "queue")],
    "invite", "Play (theater)", "Spotify EU leftover — no US, no live stream.", "#121212", "#1db954",
    "../dropboxfolder/index.html", "Dropbox leftover")
add("2008", "dropboxfolder", "../sites/dropboxfolder/index.html", "Dropbox",
    "Dropbox — 2008 leftover", "Folder leftover. Type a file name.",
    [("notes", "notes.txt", "notes.txt"), ("deck", "deck.ppt", "deck.ppt"), ("shot", "shot.png", "shot.png")],
    "notes.txt", "Put in folder", "Dropbox leftover — no real servers.", "#007ee5", "#fff",
    "../huluwatch/index.html", "Hulu leftover")
add("2008", "huluwatch", "../sites/huluwatch/index.html", "Hulu",
    "Hulu — 2008 leftover", "Ad-supported leftover. No real stream.",
    [("office", "The Office", "The Office"), ("family", "Family Guy", "Family Guy"), ("daily", "Daily Show", "Daily Show")],
    "The Office", "Watch (theater)", "Hulu leftover — no real stream.", "#1ce783", "#111",
    "../../pages/home.html", "Starting Point")

# 2009
add("2009", "foursquaremayor", "../sites/foursquaremayor/index.html", "Foursquare mayor",
    "Foursquare mayor leftover — 2009", "Mayorship leftover. Plot Neighbors is the game.",
    [("cafe", "cafe", "cafe"), ("bar", "bar", "bar"), ("park", "park", "park")],
    "cafe", "Check in", "Foursquare leftover — not Farm wilt extra.", "#ef4b23", "#fff",
    "../uberblack/index.html", "UberBlack leftover")
add("2009", "uberblack", "../sites/uberblack/index.html", "UberBlack",
    "UberBlack leftover — 2009", "Black-car leftover. UberX is 2012.",
    [("sf", "SF", "SF"), ("hail", "hail", "hail"), ("black", "black car", "black car")],
    "SF", "Hail (theater)", "UberBlack leftover — not UberX.", "#000", "#fff",
    "../whatsappweb/index.html", "WhatsApp leftover")
add("2009", "whatsappweb", "../sites/whatsappweb/index.html", "WhatsApp",
    "WhatsApp leftover — 2009", "Status leftover. Install extra is 2014.",
    [("hey", "hey", "hey"), ("photo", "photo", "photo"), ("status", "status", "status")],
    "hey", "Send (theater)", "WhatsApp leftover — no live send.", "#075e54", "#fff",
    "../../pages/home.html", "Starting Point")

# 2010
add("2010", "groupondeal", "../sites/groupondeal/index.html", "Groupon deal",
    "Groupon deal leftover — 2010", "Daily deal leftover. Sling Nest is the game.",
    [("pizza", "pizza", "pizza"), ("yoga", "yoga", "yoga"), ("spa", "spa", "spa")],
    "pizza", "Buy (theater)", "Groupon leftover — no real merchant.", "#78c042", "#111",
    "../quorawait/index.html", "Quora leftover")
add("2010", "quorawait", "../sites/quorawait/index.html", "Quora",
    "Quora — 2010 leftover", "Invite leftover.",
    [("ask", "ask", "ask"), ("ans", "answer", "answer"), ("wait", "waitlist", "waitlist")],
    "ask", "Ask", "Quora leftover — invite theater.", "#b92b27", "#fff",
    "../instagramios/index.html", "IG iOS leftover")
add("2010", "instagramios", "../sites/instagramios/index.html", "IG iOS leftover",
    "Instagram iOS leftover door — 2010", "Not the star cabinet. Filter tray stays on the chip page.",
    [("lofi", "Lo-Fi", "Lo-Fi"), ("early", "Earlybird", "Earlybird"), ("sutro", "Sutro", "Sutro")],
    "Lo-Fi", "Peek", "Leftover peek — the chip is still filter→share.", "#111", "#fff",
    "../../pages/home.html", "Starting Point")

# 2011
add("2011", "snapghost", "../sites/snapghost/index.html", "Snap ghost",
    "Snapchat leftover — 2011", "Pic leftover. Stories are 2013. Letter Swap is the game.",
    [("pic", "pic", "pic"), ("timer", "timer", "timer"), ("ghost", "ghost", "ghost")],
    "pic", "Send (theater)", "Snap leftover — not Stories, not Circles extra.", "#fffc00", "#111",
    "../uberblack11/index.html", "Uber leftover")
add("2011", "uberblack11", "../sites/uberblack11/index.html", "Uber 2011",
    "Uber leftover — 2011", "Black car leftover. UberX is 2012.",
    [("sf", "SF", "SF"), ("hail", "hail", "hail"), ("black", "black", "black")],
    "SF", "Hail (theater)", "Uber leftover — not UberX.", "#000", "#fff",
    "../spotifyusopen/index.html", "Spotify leftover")
add("2011", "spotifyusopen", "../sites/spotifyusopen/index.html", "Spotify open",
    "Spotify US leftover door — 2011", "Invite extra is extra-b. This is the leftover peek.",
    [("play", "play", "play"), ("queue", "queue", "queue"), ("invite", "invite", "invite")],
    "play", "Play (theater)", "Spotify leftover peek — extra-b stays the invite machine.", "#121212", "#1db954",
    "../../pages/home.html", "Starting Point")

# 2012
add("2012", "vinewait", "../sites/vinewait/index.html", "Vine wait",
    "Vine wait leftover — 2012", "Vine mass is 2013. Guess Doodle is the game.",
    [("soon", "soon", "soon"), ("ios", "iOS", "iOS"), ("loop", "loop", "loop")],
    "soon", "Wait", "Vine wait leftover — mass is 2013.", "#00bf8f", "#111",
    "../tinderswipe/index.html", "Tinder leftover")
add("2012", "tinderswipe", "../sites/tinderswipe/index.html", "Tinder swipe",
    "Tinder leftover door — 2012", "L/R leftover. Not the star.",
    [("left", "left", "left"), ("right", "right", "right"), ("match", "match", "match")],
    "right", "Swipe", "Tinder leftover — no real match.", "#fe3c72", "#fff",
    "../pinterestpublic/index.html", "Pinterest leftover")
add("2012", "pinterestpublic", "../sites/pinterestpublic/index.html", "Pinterest public",
    "Pinterest public leftover — 2012", "Aug public leftover.",
    [("pin", "pin", "pin"), ("board", "board", "board"), ("recipe", "recipe", "recipe")],
    "pin", "Pin", "Pinterest leftover — not Android share extra.", "#bd081c", "#fff",
    "../../pages/home.html", "Starting Point")

# 2013
add("2013", "telegramchat", "../sites/telegramchat/index.html", "Telegram",
    "Telegram leftover — 2013", "Chat leftover. Loop Six is the game. Vine hold is extra.",
    [("secret", "secret", "secret"), ("group", "group", "group"), ("stick", "sticker", "sticker")],
    "secret", "Send", "Telegram leftover — not Vine extra.", "#2ca5e0", "#fff",
    "../askfmq/index.html", "Ask.fm leftover")
add("2013", "askfmq", "../sites/askfmq/index.html", "Ask.fm Q",
    "Ask.fm leftover door — 2013", "Q leftover. Not the 3× Ask.fm page twice — this is the Q machine.",
    [("q", "question", "question"), ("anon", "anon", "anon"), ("ans", "answer", "answer")],
    "question", "Ask", "Ask.fm leftover door — 3× page stays.", "#ea1f25", "#fff",
    "../ios7flat/index.html", "iOS 7 leftover")
add("2013", "ios7flat", "../sites/ios7flat/index.html", "iOS 7 flat",
    "iOS 7 leftover — 2013", "Flat leftover. Not Vine.",
    [("tile", "tile", "tile"), ("cc", "Control Center", "Control Center"), ("blur", "blur", "blur")],
    "tile", "Flip", "iOS 7 leftover — not Loop Six.", "#007aff", "#fff",
    "../../pages/home.html", "Starting Point")

# 2014
add("2014", "twitchchat", "../sites/twitchchat/index.html", "Twitch chat",
    "Twitch leftover — 2014", "Chat leftover. Tile Fold is the game.",
    [("pog", "pog", "pog"), ("lul", "lul", "lul"), ("sub", "sub", "sub")],
    "pog", "Chat", "Twitch leftover — no live stream.", "#6441a5", "#fff",
    "../slackteam/index.html", "Slack leftover")
add("2014", "slackteam", "../sites/slackteam/index.html", "Slack team",
    "Slack leftover door — 2014", "Team leftover. Not 2016 Slack room.",
    [("eng", "eng", "eng"), ("gen", "general", "general"), ("rand", "random", "random")],
    "general", "Join", "Slack leftover — 2014 door.", "#4a154b", "#fff",
    "../icebucketchallenge/index.html", "Ice Bucket leftover")
add("2014", "icebucketchallenge", "../sites/icebucketchallenge/index.html", "Ice Bucket",
    "Ice Bucket leftover door — 2014", "Nominate leftover.",
    [("nom", "nominate", "nominate"), ("dump", "dump", "dump"), ("als", "ALS", "ALS")],
    "nominate", "Nominate", "Ice Bucket leftover — theater only.", "#00bcd4", "#111",
    "../../pages/home.html", "Starting Point")

# 2015
add("2015", "meerkatlive", "../sites/meerkatlive/index.html", "Meerkat",
    "Meerkat leftover — 2015", "Live leftover. Periscope extra is extra-a. Blob Rush is the game.",
    [("go", "go live", "go live"), ("title", "title", "title"), ("stop", "stop", "stop")],
    "go live", "Go Live (theater)", "Meerkat leftover — not Periscope extra.", "#6c3", "#111",
    "../applemusicsub/index.html", "Apple Music leftover")
add("2015", "applemusicsub", "../sites/applemusicsub/index.html", "Apple Music sub",
    "Apple Music leftover — 2015", "June leftover. Beats 1.",
    [("beats", "Beats 1", "Beats 1"), ("lib", "library", "library"), ("radio", "radio", "radio")],
    "Beats 1", "Play (theater)", "Apple Music leftover — no real stream.", "#fa233b", "#fff",
    "../win10get/index.html", "Get Windows 10 leftover")
add("2015", "win10get", "../sites/win10get/index.html", "Get Windows 10",
    "Get Windows 10 leftover — 2015", "Tray leftover. Offer ends 2016.",
    [("get", "Get", "Get"), ("tray", "tray", "tray"), ("no", "not now", "not now")],
    "Get", "Close tray", "Get Windows 10 leftover — not Chromium Edge.", "#0078d7", "#fff",
    "../../pages/home.html", "Starting Point")

# 2016 already created
add("2016", "slack", "../sites/slack/index.html", "Slack",
    "Slack — 2016 leftover", "Workplace leftover. Stories is the chip.",
    [("eng", "engineering", "#engineering"), ("des", "design", "#design"), ("gen", "general", "#general")],
    "#general", "Join channel (theater)", "2016 Slack leftover — not Teams, not the Stories chip.", "#4a154b", "#fff",
    "../fblive/index.html", "Facebook Live leftover")
add("2016", "fblive", "../sites/fblive/index.html", "Facebook Live",
    "Facebook Live — 2016 leftover", "Go Live leftover. Stories is the chip.",
    [("walk", "walking home", "walking home"), ("game", "living room", "living room"), ("news", "breaking", "breaking")],
    "walking home", "Go Live (theater)", "Facebook Live leftover — not Periscope, not Stories.", "#3b5998", "#fff",
    "../moments/index.html", "Twitter Moments leftover")
add("2016", "moments", "../sites/moments/index.html", "Twitter Moments",
    "Twitter Moments — 2016 leftover", "Curated 140 leftover. 280 is 2017.",
    [("go", "GO sidewalks", "GO sidewalks"), ("vote", "election night", "election night"), ("vine", "Vine winding down", "Vine winding down")],
    "GO sidewalks", "Open Moment", "Moments leftover — still 140. Stories is the chip.", "#1da1f2", "#fff",
    "../../pages/home.html", "Starting Point")

# 2017 new
add("2017", "snapipo", "../sites/snapipo/index.html", "Snap IPO",
    "Snap IPO leftover — 2017", "Mar 2 leftover. Face ID is the chip.",
    [("px", "$17", "$17"), ("open", "$24", "$24"), ("spec", "Spectacles", "Spectacles")],
    "$17", "Pin", "Snap IPO leftover — Face ID is the chip.", "#fffc00", "#111",
    "../bitcoinath/index.html", "Bitcoin leftover")
add("2017", "bitcoinath", "../sites/bitcoinath/index.html", "Bitcoin",
    "Bitcoin leftover — 2017", "~$20k Dec leftover. Not a wallet. Face ID is the chip.",
    [("ath", "ATH", "ATH"), ("fork", "fork", "fork"), ("chart", "chart", "chart")],
    "ATH", "Note", "Bitcoin leftover — no real wallet. Face ID is the chip.", "#f7931a", "#111",
    "../echoshow/index.html", "Echo Show leftover")
add("2017", "echoshow", "../sites/echoshow/index.html", "Echo Show",
    "Echo Show leftover — 2017", "Screen leftover. Face ID is the chip.",
    [("drop", "Drop In", "Drop In"), ("video", "video", "video"), ("timer", "timer", "timer")],
    "Drop In", "Set up (theater)", "Echo Show leftover — no live camera. Face ID is the chip.", "#232f3e", "#fff",
    "../../pages/home.html", "Starting Point")

# 2018 already created (creative lives under fortnite/)
add("2018", "discord", "../sites/discord/index.html", "Discord",
    "Discord — 2018 leftover", "Gaming chat leftover. GDPR is the chip.",
    [("fort", "fortnite-squad", "#fortnite-squad"), ("mus", "music", "#music"), ("gen", "general", "#general")],
    "#general", "Join (theater)", "Discord leftover — not the GDPR chip. No real Nitro bill.", "#5865f2", "#fff",
    "../applemusic/index.html", "Apple Music leftover")
add("2018", "applemusic", "../sites/applemusic/index.html", "Apple Music",
    "Apple Music — 2018 leftover", "Subscription leftover. GDPR is the chip.",
    [("replay", "Replay 2018", "Replay 2018"), ("radio", "Beats 1", "Beats 1"), ("lib", "library", "library")],
    "Replay 2018", "Play (theater)", "Apple Music leftover — no real stream. GDPR is the chip.", "#fa233b", "#fff",
    "../fortnite/creative.html", "Fortnite Creative leftover")
add("2018", "creative", "../sites/fortnite/creative.html", "Fortnite Creative",
    "Fortnite Creative — 2018 leftover", "Dec 2018 leftover. GDPR is the chip.",
    [("box", "box fight", "box fight"), ("zone", "zone wars", "zone wars"), ("race", "race", "race")],
    "box fight", "Publish island (theater)", "Creative leftover — not Marshmello (2019). GDPR is the chip.", "#2b1055", "#fff",
    "../../pages/home.html", "Starting Point")


def css_for(year: str) -> str:
    if (ROOT / "css" / f"period-{year}.css").exists():
        return f"period-{year}.css"
    return "mosaic-defaults.css"


def esc(s: str) -> str:
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def html_new(year: str, spec: dict) -> str:
    key = f"itt{year[2:]}-pop-{spec['id']}"
    picks = []
    for pid, lab, q in spec["picks"]:
        picks.append(
            f' <button type="button" data-pop-pick="{esc(pid)}" data-pop-q="{esc(q)}">{esc(lab)}</button>'
        )
    depth = spec["file"].count("/")
    css_prefix = "../" * (depth + 1) + "../css/"
    js_prefix = "../" * (depth + 1) + "../js/"
    # sites/foo/index.html -> ../../../../css
    # sites/fortnite/creative.html -> same
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{esc(spec["title"])}</title>
<link rel="stylesheet" href="../../../../css/{css_for(year)}">
</head>
<body bgcolor="{spec["bg"]}" text="{spec["fg"]}">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:36em;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{esc(spec["title"])}</h1>
<p>{esc(spec["lead"])}</p>
<div>
{chr(10).join(picks)}
</div>
<p><label>Type <input type="text" data-pop-field placeholder="{esc(spec["ph"])}" size="28"></label></p>
<label><input type="checkbox" data-pop-req> {esc(spec["req"])}</label>
<p><button type="button" data-pop-go data-pop-id="{esc(spec["id"])}">{esc(spec["btn"])}</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{esc(spec["next"])}">{esc(spec["nl"])}</a></p>
<p style="font-size:11px">Empty / no pick / no honesty never writes <code>{key}</code>.</p>
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def patch_home(year: str) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.exists():
        return
    trio = ROOMS[year]
    bits = " · ".join(f'<a href="{esc(s["href"])}">{esc(s["label"])}</a>' for s in trio)
    block = (
        f'<p data-itt-pop-more="{year}" class="itt-pop-more" '
        f'style="font-size:12px;margin:10px auto;padding:8px;border:1px dashed #396;max-width:720px">'
        f'<b>3 more leftovers</b> (new doors · not the chip · not the first 3×): {bits}'
        f' · pick + honesty · empty never writes</p>\n'
    )
    text = home.read_text(encoding="utf-8", errors="ignore")
    mark = f'data-itt-pop-more="{year}"'
    if mark in text:
        text = re.sub(rf"<p {re.escape(mark)}[\s\S]*?</p>\n?", block, text, count=1)
    elif f'data-itt-pop3x="{year}"' in text:
        i = text.find(f'data-itt-pop3x="{year}"')
        close = text.find("</p>", i)
        text = text[: close + 4] + "\n" + block + text[close + 4 :]
    else:
        text = text.replace("</body>", block + "</body>")
    home.write_text(text, encoding="utf-8")


def patch_rooms(year: str, rels: list[str]) -> None:
    cfgp = ROOT / "js" / "config" / f"{year}.js"
    if not cfgp.exists() or not rels:
        return
    cfg = cfgp.read_text(encoding="utf-8")
    missing = [r for r in rels if f'"{r}"' not in cfg]
    if not missing:
        return
    m = re.search(r"var rooms = \[", cfg)
    if m:
        insert = "".join(f'    "{r}",\n' for r in missing)
        cfgp.write_text(cfg[: m.end()] + "\n" + insert + cfg[m.end() :], encoding="utf-8")
        return
    marker = "urlMap: {"
    i = cfg.find(marker)
    if i < 0:
        return
    block = "".join(
        f'\n      "{r}": "http://museum.local/years/{year}/{r}",' for r in missing
    )
    cfgp.write_text(cfg[: i + len(marker)] + block + cfg[i + len(marker) :], encoding="utf-8")


def main() -> None:
    assert all(len(v) == 3 for v in ROOMS.values()), {k: len(v) for k, v in ROOMS.items()}
    assert set(ROOMS) == {str(y) for y in range(1994, 2019)}
    for year, specs in ROOMS.items():
        rels = []
        for spec in specs:
            dest = ROOT / "years" / year / spec["file"]
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(html_new(year, spec), encoding="utf-8")
            rels.append(spec["file"])
        patch_rooms(year, rels)
        patch_home(year)
        print(year, " ".join(s["id"] for s in specs))


if __name__ == "__main__":
    main()
