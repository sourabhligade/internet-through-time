#!/usr/bin/env python3
"""Rebuild leftover extras as year-true minute machines (not pack taps)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def G(
    year: str,
    slot: str,
    gid: str,
    title: str,
    kind: str,
    goal: str,
    why: str,
    dest: str,
    dest_label: str,
    visitor: list[str],
    *,
    confirm: str | None = None,
    query: str | None = None,
    query_label: str = "Query",
    run_label: str = "Search",
    submit_label: str = "Submit",
    hold_label: str = "Hold",
    hold_ms: int = 1600,
    items: list | None = None,
    fields: list | None = None,
    results: list | None = None,
    panels: list | None = None,
    start_status: str = "",
    chrome: str = "",
    chrome_sub: str = "",
    bg: str = "#f0f0f0",
    bar: str = "#000080",
    bar_fg: str = "#fff",
    field_bg: str = "#fff",
    font: str = "Tahoma, Arial, sans-serif",
) -> dict:
    return {
        "year": year,
        "slot": slot,
        "id": gid,
        "title": title,
        "kind": kind,
        "goal": goal,
        "why": why,
        "dest": dest,
        "dest_label": dest_label,
        "visitor": visitor,
        "confirm": confirm,
        "query": query,
        "query_label": query_label,
        "run_label": run_label,
        "submit_label": submit_label,
        "hold_label": hold_label,
        "hold_ms": hold_ms,
        "items": items or [],
        "fields": fields or [],
        "results": results or [],
        "panels": panels or [],
        "start_status": start_status,
        "chrome": chrome,
        "chrome_sub": chrome_sub,
        "bg": bg,
        "bar": bar,
        "bar_fg": bar_fg,
        "field_bg": field_bg,
        "font": font,
    }


SPECS: list[dict] = [
    G(
        "1994", "a", "mosaicgif", "Mosaic inline GIF", "buffer",
        "Buffer every incoming GIF scanline before the 14.4k drops. Skip the modem die.",
        "Inline images were the first web toy. Mosaic painted GIFs line by line.",
        "../ncsa/index.html", "NCSA Mosaic",
        [
            "Start. Status should say Transferring…",
            "Click each GIF scanline as it lands (header, palette, scan 1–3).",
            "Do not click “14.4k dropped” — that is rot and never writes.",
            "Type mosaic in the confirm box.",
            "Finish writes itt94-game-mosaicgif. Incomplete never writes.",
        ],
        confirm="mosaic",
        items=[
            {"id": "hdr", "label": "GIF87a header (6 bytes landed)"},
            {"id": "pal", "label": "216-color Netscape cube"},
            {"id": "s1", "label": "Scanline 12 — fish eye"},
            {"id": "s2", "label": "Scanline 28 — water"},
            {"id": "s3", "label": "Scanline 44 — done"},
            {"id": "drop", "label": "14.4k dropped — host unreachable", "role": "trap", "trap": "Modem died"},
        ],
        start_status="Transferring inline GIF… click scanlines. Skip the drop.",
        chrome="NCSA Mosaic — [inline image]",
        chrome_sub="14.4k · Document: Done (maybe) · 12% of 38K",
        bg="#c0c0c0", bar="#000080",
    ),
    G(
        "1994", "b", "yahoocat", "Yahoo catalog hop", "seq",
        "Open the 1994 Yahoo directory in order: Arts → Computers → Entertainment. Type computers.",
        "The catalog was the game. Jerry and David’s list, not a search box.",
        "../yahoo/index.html", "Yahoo! 1994",
        [
            "Start.",
            "Open Arts, then Computers, then Entertainment — in that order.",
            "Do not open the broken CGI row.",
            "Type computers.",
            "Finish writes itt94-game-yahoocat.",
        ],
        confirm="computers",
        items=[
            {"id": "arts", "label": "Arts (Architecture, Literature, Museums…)", "order": 0},
            {"id": "comp", "label": "Computers (Internet, WWW, Software…)", "order": 1},
            {"id": "ent", "label": "Entertainment (Movies, Music, Cool Links…)", "order": 2},
            {"id": "cgi", "label": "cgi-bin/search — 500 Server Error", "role": "trap", "trap": "Broken CGI"},
        ],
        start_status="Hop the directory in order. The catalog is the map.",
        chrome="Yahoo! — A Guide to WWW",
        chrome_sub="Stanford · 14 categories · no crawler yet",
        bg="#ffffff", bar="#7b0099",
    ),
    G(
        "1995", "a", "geosign", "GeoCities sign-in", "form",
        "Claim a SiliconValley homestead. Neighborhood, street address, guestbook hello.",
        "Homestead guestbooks were the social game. Neighborhoods were the address.",
        "../geocities/index.html", "GeoCities",
        [
            "Start.",
            "Neighborhood: siliconvalley",
            "Address: 1234",
            "Guestbook: hello",
            "Click Sign guestbook, then Finish. Writes itt95-game-geosign.",
        ],
        fields=[
            {"id": "hood", "label": "Neighborhood", "need": "siliconvalley", "placeholder": "siliconvalley"},
            {"id": "addr", "label": "Street address", "need": "1234", "placeholder": "1234"},
            {"id": "gb", "label": "Guestbook", "need": "hello", "placeholder": "hello"},
        ],
        submit_label="Sign guestbook",
        start_status="Fill the homestead card exactly. Then sign.",
        chrome="GeoCities — SiliconValley / 1234",
        chrome_sub="Under construction since Tuesday · midi autoplay (off)",
        bg="#ffffcc", bar="#006600",
    ),
    G(
        "1995", "b", "altahit", "AltaVista hit", "search",
        "Type mosaic. Click the real DEC AltaVista hit. Banner and counter are decoys.",
        "Full-text search felt like magic. One box replaced the catalog.",
        "../altavista/index.html", "AltaVista",
        [
            "Start.",
            "Type mosaic in the query box.",
            "Click Search.",
            "Click the real AltaVista hit — not the banner, not the visitor counter.",
            "Finish writes itt95-game-altahit.",
        ],
        query="mosaic",
        query_label="AltaVista",
        run_label="Search",
        results=[
            {"label": "NCSA Mosaic Home Page — www.ncsa.uiuc.edu", "role": "hit"},
            {"label": "[AD] Cheap domain names — click here!!!", "role": "decoy", "trap": "Banner"},
            {"label": "You are visitor 0003847", "role": "decoy", "trap": "Counter"},
        ],
        start_status="One box. Type mosaic. Click the real hit.",
        chrome="AltaVista — Digital Equipment Corporation",
        chrome_sub="30 million pages · 0.2 seconds (theater)",
        bg="#ffffff", bar="#003399",
    ),
    G(
        "1996", "a", "mailsend", "HoTMaiL send", "form",
        "Address a web-mail note: friend@hotmail.com / hello / inbox. Send from the browser.",
        "Mail in the browser was the 1996 toy. No installed client.",
        "../hotmail/index.html", "HoTMaiL",
        [
            "Start.",
            "To: friend@hotmail.com",
            "Subject: hello",
            "Body: inbox",
            "Click Send, then Finish. Writes itt96-game-mailsend.",
        ],
        fields=[
            {"id": "to", "label": "To", "need": "friend@hotmail.com"},
            {"id": "sub", "label": "Subject", "need": "hello"},
            {"id": "body", "label": "Body", "need": "inbox"},
        ],
        submit_label="Send",
        start_status="Compose the note exactly. Send lives in the browser.",
        chrome="HoTMaiL — Compose",
        chrome_sub="Free email · www.hotmail.com · 1996",
        bg="#ffffff", bar="#ff6600",
    ),
    G(
        "1996", "b", "jamshot", "Space Jam hoop", "burst",
        "Hit the three court hoops on the hub. Skip the banner ad.",
        "The site was the playground. Warner’s 1996 hub was the destination.",
        "../spacejam/index.html", "Space Jam",
        [
            "Start.",
            "Click Center, Left wing, Right wing.",
            "Do not click the banner ad.",
            "Finish writes itt96-game-jamshot.",
        ],
        items=[
            {"id": "c", "label": "Center hoop — nothing but net"},
            {"id": "l", "label": "Left wing — Looney tune-up"},
            {"id": "r", "label": "Right wing — dunk theater"},
            {"id": "ad", "label": "[AD] Download our player (800K)", "role": "trap", "trap": "Banner"},
        ],
        start_status="Shoot the court. Skip the ad.",
        chrome="SPACE JAM — Junior Sports Theater",
        chrome_sub="1996 hub · no live video · museum original",
        bg="#000000", bar="#cc0000", field_bg="#111",
    ),
    G(
        "1997", "a", "ebayraise", "eBay raise", "seq",
        "View the listing, raise once, raise twice, confirm the bid. No real money.",
        "AuctionWeb became eBay. Bidding was the sport.",
        "../ebay/index.html", "eBay 1997",
        [
            "Start.",
            "View item → Raise $1 → Raise $2 → Confirm bid, in order.",
            "Type bid.",
            "Finish writes itt97-game-ebayraise. No live auction.",
        ],
        confirm="bid",
        items=[
            {"id": "view", "label": "View: Beanie Baby — current $3.50", "order": 0},
            {"id": "r1", "label": "Raise +$1.00 (now $4.50)", "order": 1},
            {"id": "r2", "label": "Raise +$2.00 (now $6.50)", "order": 2},
            {"id": "ok", "label": "Confirm bid (theater — no charge)", "order": 3},
            {"id": "scam", "label": "Wire money off-site to “win now”", "role": "trap", "trap": "Off-site scam"},
        ],
        start_status="Raise in order. Off-site wire is a trap.",
        chrome="eBay — AuctionWeb leftover",
        chrome_sub="No live money · museum theater",
        bg="#fff7e6", bar="#990000",
    ),
    G(
        "1997", "b", "icqping", "ICQ ping", "seq",
        "Enter the UIN, see them online, send the message. The number was the identity.",
        "The number was the identity. Uh-oh is leftover sound, not this page.",
        "../icq/index.html", "ICQ",
        [
            "Start.",
            "Enter UIN → Online → Send message, in order.",
            "Type uin.",
            "Finish writes itt97-game-icqping.",
        ],
        confirm="uin",
        items=[
            {"id": "uin", "label": "Enter UIN 12345678", "order": 0},
            {"id": "on", "label": "Status: Online (green flower)", "order": 1},
            {"id": "msg", "label": "Send: you there?", "order": 2},
            {"id": "spam", "label": "Add 400 random UINs", "role": "trap", "trap": "Spam list"},
        ],
        start_status="Ping one UIN. Do not spray the network.",
        chrome="ICQ — 1997 leftover",
        chrome_sub="UIN theater · no live roster",
        bg="#e8f4ff", bar="#0066cc",
    ),
    G(
        "1998", "a", "luckygo", "Lucky jump", "search",
        "Type yahoo. Hit I’m Feeling Lucky. The ten blue links and the banner are decoys.",
        "One button skipped the directory. That was the 1998 move.",
        "../google/lucky.html", "Google Lucky",
        [
            "Start.",
            "Type yahoo.",
            "Click I’m Feeling Lucky.",
            "Click the Lucky destination — not the ten-link list, not the banner.",
            "Finish writes itt98-game-luckygo.",
        ],
        query="yahoo",
        query_label="Google",
        run_label="I'm Feeling Lucky",
        results=[
            {"label": "Lucky: Yahoo! (Stanford directory)", "role": "hit"},
            {"label": "1–10 blue links (you skipped these)", "role": "decoy", "trap": "SERP list"},
            {"label": "[AD] Search the web faster!!!", "role": "decoy", "trap": "Banner"},
        ],
        start_status="One button. Skip the list.",
        chrome="Google — I'm Feeling Lucky",
        chrome_sub="1998 · beta · 25 million pages (claim)",
        bg="#ffffff", bar="#3366cc",
    ),
    G(
        "1998", "b", "mozmile", "Mozilla milestone", "seq",
        "Open M3 layout, M4 mail, M5 Chatzilla. The lizard was the other browser war.",
        "The lizard was the other browser war. mozilla.org, not a product box.",
        "../mozilla/index.html", "mozilla.org",
        [
            "Start.",
            "M3 layout → M4 mail → M5 Chatzilla, in order.",
            "Type mozilla.",
            "Finish writes itt98-game-mozmile.",
        ],
        confirm="mozilla",
        items=[
            {"id": "m3", "label": "M3 — new layout engine note", "order": 0},
            {"id": "m4", "label": "M4 — mail/news landing", "order": 1},
            {"id": "m5", "label": "M5 — Chatzilla nightlies", "order": 2},
            {"id": "ie", "label": "Internet Explorer 5 download (wrong war)", "role": "trap", "trap": "Wrong browser"},
        ],
        start_status="Milestones in order. IE is the other war.",
        chrome="mozilla.org — development",
        chrome_sub="Nightly · source · lizard leftover",
        bg="#e6e6e6", bar="#c60",
    ),
    G(
        "1999", "a", "napsearch", "Napster search", "search",
        "Type mp3. Click the real 192kbps row. The .exe and the empty folder are decoys. No real share.",
        "The query was the scare. Theater only — no live swarm.",
        "../napster/index.html", "Napster",
        [
            "Start.",
            "Type mp3. Click Search.",
            "Click the 192kbps row. Skip the .exe and the empty folder.",
            "Finish writes itt99-game-napsearch. No real share.",
        ],
        query="mp3",
        query_label="Napster",
        run_label="Search",
        results=[
            {"label": "track.mp3 · 192kbps · 3:42 · user: dorm12", "role": "hit"},
            {"label": "FREE_CODEC.exe · 2.1MB", "role": "decoy", "trap": "Fake codec"},
            {"label": "(empty folder) · 0 files", "role": "decoy", "trap": "Empty share"},
        ],
        start_status="Search. Pick the song row. No live share.",
        chrome="Napster — search (theater)",
        chrome_sub="No real swarm · museum leftover",
        bg="#1a1a2e", bar="#6c3", bar_fg="#111", field_bg="#111",
    ),
    G(
        "1999", "b", "aimaway", "AIM away", "form",
        "Set the buddy, the away word, and the reason. Idle was a status sport.",
        "Idle was a status sport. Away meant something.",
        "../aim/index.html", "AIM",
        [
            "Start.",
            "Buddy: aolpal",
            "Away: away",
            "Reason: at school",
            "Click Set away, then Finish. Writes itt99-game-aimaway.",
        ],
        fields=[
            {"id": "buddy", "label": "Buddy", "need": "aolpal"},
            {"id": "away", "label": "Away word", "need": "away"},
            {"id": "why", "label": "Reason", "need": "at school"},
        ],
        submit_label="Set away",
        start_status="Set away exactly. Idle is the sport.",
        chrome="AOL Instant Messenger — Away",
        chrome_sub="Running man leftover · no live roster",
        bg="#d6e7ff", bar="#003399",
    ),
    G(
        "2000", "a", "mqdrive", "MapQuest print", "wizard",
        "From → To → Get directions → Print. You printed the web to drive.",
        "You printed the web to drive. No live tiles.",
        "../mapquest/index.html", "MapQuest",
        [
            "Start.",
            "Next through From, To, Get directions, Print.",
            "Finish writes itt00-game-mqdrive. No live map.",
        ],
        panels=[
            {"title": "1 · From", "body": "123 Market St, San Jose, CA", "nextLabel": "To →"},
            {"title": "2 · To", "body": "1 Infinite Loop is leftover. Use 1 Stockton, SF.", "nextLabel": "Get directions"},
            {"title": "3 · Directions", "body": "US-101 N · 48 minutes · 8 turns (print this).", "nextLabel": "Print"},
            {"title": "4 · Print", "body": "Theater print. Fold it on the dash. No GPS.", "nextLabel": "Done"},
        ],
        start_status="Four panels. Print is the destination.",
        chrome="MapQuest — Get Directions",
        chrome_sub="2000 · printout · no live tiles",
        bg="#ffffee", bar="#003366",
    ),
    G(
        "2000", "b", "petsock", "Pets.com sock", "pick",
        "Pick sock, kibble, and bowl. The IPO flyer is rot. Residual only.",
        "The crash year still had a puppet. Residual, not a store.",
        "../pets/index.html", "Pets.com",
        [
            "Start.",
            "Pick sock, kibble, bowl.",
            "Skip the IPO flyer.",
            "Finish writes itt00-game-petsock.",
        ],
        items=[
            {"id": "sock", "label": "Sock puppet (warehouse leftover)"},
            {"id": "kib", "label": "Kibble 20lb (shipping > product)"},
            {"id": "bowl", "label": "Bowl — add to cart (theater)"},
            {"id": "ipo", "label": "IPO flyer — “pets will scale”", "role": "trap", "trap": "IPO rot"},
        ],
        start_status="Shop the residual. Skip the flyer.",
        chrome="Pets.com — sock leftover",
        chrome_sub="2000 crash year · no live cart",
        bg="#fff0f0", bar="#cc0000",
    ),
    G(
        "2001", "a", "wikiprev", "Wiki preview", "form",
        "Article internet, edit cite needed, preview edit. Anyone can edit — preview first.",
        "Anyone can edit — preview first. No live wiki write.",
        "../wikipedia/index.html", "Wikipedia",
        [
            "Start.",
            "Article: internet",
            "Edit: cite needed",
            "Preview box: edit",
            "Click Preview, then Finish. Writes itt01-game-wikiprev.",
        ],
        fields=[
            {"id": "art", "label": "Article", "need": "internet"},
            {"id": "ed", "label": "Edit", "need": "cite needed"},
            {"id": "prev", "label": "Preview box", "need": "edit"},
        ],
        submit_label="Preview",
        start_status="Preview before save. No live wiki.",
        chrome="Wikipedia — Preview",
        chrome_sub="2001 · Nupedia leftover energy · no live write",
        bg="#f8f9fa", bar="#000",
    ),
    G(
        "2001", "b", "ipodclick", "iPod click wheel", "seq",
        "Menu → Music → Playlists → Play. 1,000 songs. The wheel was the toy.",
        "1,000 songs. The wheel was the toy. No FireWire transfer here.",
        "../apple/ipod.html", "iPod",
        [
            "Start.",
            "Menu → Music → Playlists → Play, in order.",
            "Type wheel.",
            "Finish writes itt01-game-ipodclick.",
        ],
        confirm="wheel",
        items=[
            {"id": "menu", "label": "MENU", "order": 0},
            {"id": "mus", "label": "Music", "order": 1},
            {"id": "pl", "label": "Playlists", "order": 2},
            {"id": "play", "label": "► Play", "order": 3},
            {"id": "eject", "label": "Eject disk mode", "role": "trap", "trap": "Disk mode"},
        ],
        start_status="Click the wheel path. Disk mode is a trap.",
        chrome="iPod — 2001 click wheel",
        chrome_sub="1,000 songs · white · FireWire leftover",
        bg="#e8e8e8", bar="#111",
    ),
    G(
        "2002", "a", "stumble2", "Stumble twice", "pick",
        "Stumble two good pages. The pop-up is rot. The next button was the feed.",
        "The next button was the feed. Before the algorithmic home.",
        "../stumbleupon/index.html", "StumbleUpon",
        [
            "Start.",
            "Stumble the two good pages.",
            "Skip the pop-up.",
            "Finish writes itt02-game-stumble2.",
        ],
        items=[
            {"id": "s1", "label": "Stumble: dorm-photo blog (2002)"},
            {"id": "s2", "label": "Stumble: flash toy hub (textbook)"},
            {"id": "pop", "label": "POP-UP: You are the 1,000,000th visitor", "role": "trap", "trap": "Pop-up"},
        ],
        start_status="Two stumbles. Kill the pop-up by not clicking it.",
        chrome="StumbleUpon — 2002 leftover",
        chrome_sub="The next button · no live recommend",
        bg="#2b1b4a", bar="#ff6600", field_bg="#1a102c",
    ),
    G(
        "2002", "b", "kazaafind", "KaZaA find", "search",
        "Type mp3. Click the song. The .exe is a decoy. P2P after Napster. No real share.",
        "P2P after Napster. SuperNode theater only.",
        "../kazaa/index.html", "KaZaA",
        [
            "Start.",
            "Type mp3. Click Find.",
            "Click the song row. Skip the .exe.",
            "Finish writes itt02-game-kazaafind.",
        ],
        query="mp3",
        query_label="KaZaA",
        run_label="Find",
        results=[
            {"label": "track.mp3 · 128kbps · SuperNode theater", "role": "hit"},
            {"label": "kazaa_plus_gold.exe", "role": "decoy", "trap": "Bundled exe"},
        ],
        start_status="Find the song. Skip the installer.",
        chrome="KaZaA — Media Desktop (theater)",
        chrome_sub="No live SuperNode · leftover",
        bg="#1c1c1c", bar="#33cc66", bar_fg="#111", field_bg="#111",
    ),
    G(
        "2003", "a", "top8swap", "Top 8 swap", "seq",
        "Pick slot 3, pick slot 7, confirm the swap. Friendship was a ranked list.",
        "Friendship was a ranked list. Drama lived in the HTML.",
        "../myspace/index.html", "MySpace",
        [
            "Start.",
            "Slot 3 → Slot 7 → Confirm swap, in order.",
            "Type top8.",
            "Finish writes itt03-game-top8swap.",
        ],
        confirm="top8",
        items=[
            {"id": "s3", "label": "Slot 3 — Jess (autoplay MIDI)", "order": 0},
            {"id": "s7", "label": "Slot 7 — dorm roommate", "order": 1},
            {"id": "ok", "label": "Confirm swap (they will notice)", "order": 2},
            {"id": "tom", "label": "Delete Tom", "role": "trap", "trap": "Tom stays"},
        ],
        start_status="Swap 3 and 7. Tom stays.",
        chrome="MySpace — Top 8",
        chrome_sub="2003 · profile HTML · autoplay leftover",
        bg="#e5ecf4", bar="#003399",
    ),
    G(
        "2003", "b", "itunestap", "99¢ tap", "seq",
        "Browse the store, tap the 99¢ track, buy (theater). A song cost a dollar.",
        "A song cost a dollar. Theater only — no real card.",
        "../itunes/index.html", "iTunes Store",
        [
            "Start.",
            "Browse → 99¢ track → Buy (theater), in order.",
            "Type 99.",
            "Finish writes itt03-game-itunestap.",
        ],
        confirm="99",
        items=[
            {"id": "br", "label": "Browse: Today’s 99¢ shelf", "order": 0},
            {"id": "tr", "label": "Track — $0.99", "order": 1},
            {"id": "buy", "label": "Buy (theater — no card)", "order": 2},
            {"id": "album", "label": "Buy whole album $9.99 (not this leftover)", "role": "trap", "trap": "Album upsell"},
        ],
        start_status="One 99¢ tap. Album is the other product.",
        chrome="iTunes Music Store — 2003",
        chrome_sub="99¢ · FairPlay leftover · no live store",
        bg="#f4f4f4", bar="#333",
    ),
    G(
        "2004", "a", "thepoke", "thefacebook poke", "seq",
        "Join the Harvard network, find a name, poke. Poke was the first verb.",
        "Poke was the first verb. College network only. Leftover extra — not the 2004 star.",
        "../facebook/index.html", "thefacebook",
        [
            "Start.",
            "Harvard network → Find name → Poke, in order.",
            "Type poke.",
            "Finish writes itt04-game-thepoke.",
        ],
        confirm="poke",
        items=[
            {"id": "net", "label": "Network: Harvard (college only)", "order": 0},
            {"id": "find", "label": "Find: roommate in Adams", "order": 1},
            {"id": "poke", "label": "Poke", "order": 2},
            {"id": "open", "label": "Open the network to everyone (too early)", "role": "trap", "trap": "Not 2004"},
        ],
        start_status="College network. Then poke.",
        chrome="thefacebook — 2004 leftover",
        chrome_sub="Poke · not the Gem Cascade star",
        bg="#3b5998", bar="#3b5998", field_bg="#fff",
    ),
    G(
        "2004", "b", "flickrfave", "Flickr fave", "pick",
        "Fave three stills. The stock banner is rot. The star was the social photo.",
        "The star was the social photo. Leftover extra — not the 2004 star.",
        "../flickr/index.html", "Flickr",
        [
            "Start.",
            "Fave the three stills.",
            "Skip the stock banner.",
            "Finish writes itt04-game-flickrfave.",
        ],
        items=[
            {"id": "p1", "label": "★ still: rooftop party (tag: sf)"},
            {"id": "p2", "label": "★ still: cat in a sink"},
            {"id": "p3", "label": "★ still: concert phone-cam"},
            {"id": "ad", "label": "Stock CD: 1000 royalty-free photos", "role": "trap", "trap": "Stock banner"},
        ],
        start_status="Three stars. Skip stock.",
        chrome="Flickr — fave leftover",
        chrome_sub="2004 · pink star · no live API",
        bg="#fff", bar="#ff0084",
    ),
    G(
        "2005", "a", "ytsurge", "YouTube surge", "burst",
        "Hit play on three tiny clips. The pre-roll ad is rot. Me at the zoo was enough.",
        "Me at the zoo was enough. Leftover extra — not the 2005 star.",
        "../youtube/index.html", "YouTube",
        [
            "Start.",
            "Play the three clips.",
            "Skip the pre-roll.",
            "Finish writes itt05-game-ytsurge.",
        ],
        items=[
            {"id": "zoo", "label": "► Me at the zoo (18s)"},
            {"id": "dorm", "label": "► Dorm guitar (0:41)"},
            {"id": "cat", "label": "► Cat falls off TV (0:09)"},
            {"id": "ad", "label": "Pre-roll: 30s car ad (skip)", "role": "trap", "trap": "Pre-roll"},
        ],
        start_status="Three plays. Skip the pre-roll.",
        chrome="YouTube — 2005 leftover",
        chrome_sub="Flash theater · no live encode",
        bg="#fff", bar="#cc0000",
    ),
    G(
        "2005", "b", "mapdrag", "Maps drag", "seq",
        "Grab a tile, drag, zoom. The map moved. That was new. No live tiles.",
        "The map moved. That was new. Ajax leftover. No live tiles.",
        "../maps/index.html", "Google Maps",
        [
            "Start.",
            "Grab tile → Drag → Zoom, in order.",
            "Type maps.",
            "Finish writes itt05-game-mapdrag.",
        ],
        confirm="maps",
        items=[
            {"id": "grab", "label": "Grab tile (SF downtown)", "order": 0},
            {"id": "drag", "label": "Drag — tiles slide (theater)", "order": 1},
            {"id": "zoom", "label": "Zoom + (still tiles, not satellite yet)", "order": 2},
            {"id": "live", "label": "Load live tiles (blocked)", "role": "trap", "trap": "No live tiles"},
        ],
        start_status="Grab, drag, zoom. No live tiles.",
        chrome="Google Maps — 2005 leftover",
        chrome_sub="Ajax drag · no live tiles",
        bg="#e5e3df", bar="#3366cc",
    ),
    G(
        "2006", "a", "t140type", "140 type", "form",
        "Type twttr in the 140 box. The box was the game.",
        "The box was the game. 140 characters. Leftover extra.",
        "../twitter/index.html", "Twitter",
        [
            "Start.",
            "Tweet box: twttr",
            "Click Update, then Finish. Writes itt06-game-t140type.",
        ],
        fields=[{"id": "tw", "label": "What are you doing?", "need": "twttr"}],
        submit_label="Update",
        start_status="140-class box. Type twttr. Update.",
        chrome="Twitter — What are you doing?",
        chrome_sub="2006 · 140 · no live firehose",
        bg="#c0deed", bar="#33ccff", bar_fg="#033",
    ),
    G(
        "2006", "b", "diggup", "Digg up", "pick",
        "Digg three stories. The sponsored row is rot. The front page was voted.",
        "The front page was voted. Leftover extra.",
        "../digg/index.html", "Digg",
        [
            "Start.",
            "Digg the three stories.",
            "Skip the sponsored row.",
            "Finish writes itt06-game-diggup.",
        ],
        items=[
            {"id": "d1", "label": "▲ Story: iPod battery rumor (847 diggs)"},
            {"id": "d2", "label": "▲ Story: Firefox 2 ships"},
            {"id": "d3", "label": "▲ Story: YouTube sale chatter"},
            {"id": "ad", "label": "Sponsored: cheap ringtones", "role": "trap", "trap": "Sponsored"},
        ],
        start_status="Three diggs. Skip sponsored.",
        chrome="Digg — 2006 leftover",
        chrome_sub="Upcoming → Front page · no live vote",
        bg="#1b5790", bar="#1b5790", field_bg="#fff",
    ),
    G(
        "2007", "a", "safurl", "Safari URL", "search",
        "Type safari. Go. The phone was a browser. No store yet.",
        "The phone was a browser. No store. Leftover extra.",
        "../iphone/index.html", "iPhone Safari",
        [
            "Start.",
            "Type safari. Click Go.",
            "Click the Safari page — not the App Store (that is 2008).",
            "Finish writes itt07-game-safurl.",
        ],
        query="safari",
        query_label="Address",
        run_label="Go",
        results=[
            {"label": "apple.com/iphone — Safari on iPhone", "role": "hit"},
            {"label": "App Store (opens 2008)", "role": "decoy", "trap": "Too early"},
        ],
        start_status="Type the URL. The store is next year.",
        chrome="Safari — iPhone 2007",
        chrome_sub="No store · one button · leftover",
        bg="#c8c8c8", bar="#111",
    ),
    G(
        "2007", "b", "svgrab", "Street View grab", "seq",
        "Grab pegman, drop on the street, grab the view. The street became a panorama. Theater.",
        "The street became a panorama. Theater only.",
        "../maps/streetview.html", "Street View",
        [
            "Start.",
            "Grab pegman → Drop street → Grab view, in order.",
            "Type street.",
            "Finish writes itt07-game-svgrab.",
        ],
        confirm="street",
        items=[
            {"id": "grab", "label": "Grab pegman", "order": 0},
            {"id": "drop", "label": "Drop on blue line (theater street)", "order": 1},
            {"id": "view", "label": "Grab the panorama", "order": 2},
            {"id": "live", "label": "Load live Street View (blocked)", "role": "trap", "trap": "No live pano"},
        ],
        start_status="Pegman, drop, grab. No live pano.",
        chrome="Street View — 2007 leftover",
        chrome_sub="Pegman theater · no live tiles",
        bg="#e5e3df", bar="#3366cc",
    ),
    G(
        "2008", "a", "storeget", "App Store get", "seq",
        "Search the ~500, pick one, Get. The shelf opened. Theater.",
        "The shelf opened. ~500 apps. Leftover extra — GitHub is the 2008 gold leftover.",
        "../appstore/index.html", "App Store",
        [
            "Start.",
            "Search shelf → Pick one of ~500 → Get, in order.",
            "Type get.",
            "Finish writes itt08-game-storeget.",
        ],
        confirm="get",
        items=[
            {"id": "search", "label": "Search the ~500 (2008 shelf)", "order": 0},
            {"id": "pick", "label": "Pick: flashlight $0.99 (theater)", "order": 1},
            {"id": "get", "label": "GET", "order": 2},
            {"id": "iap", "label": "In-app purchase (too late for 2008 day one)", "role": "trap", "trap": "IAP later"},
        ],
        start_status="Get one app. IAP is later.",
        chrome="App Store — 2008 leftover",
        chrome_sub="~500 · no live bill",
        bg="#111", bar="#1c89f4", field_bg="#222",
    ),
    G(
        "2008", "b", "chromebox", "Chrome box", "search",
        "Type chrome. The box was the URL and the search.",
        "The box was the URL and the search. Leftover extra.",
        "../chrome/index.html", "Chrome",
        [
            "Start.",
            "Type chrome. Click the omnibox go.",
            "Click the Chrome hit — not the IE download.",
            "Finish writes itt08-game-chromebox.",
        ],
        query="chrome",
        query_label="Omnibox",
        run_label="Go",
        results=[
            {"label": "Google Chrome — a fresh take on the browser", "role": "hit"},
            {"label": "Download Internet Explorer 8", "role": "decoy", "trap": "Wrong browser"},
        ],
        start_status="One box. URL and search.",
        chrome="Chrome — omnibox leftover",
        chrome_sub="2008 · no live crash · museum original",
        bg="#fff", bar="#4a4a4a",
    ),
    G(
        "2009", "a", "likeburst", "Like burst", "burst",
        "Like four feed stories. The ad Like is rot. The thumb left the feed.",
        "The thumb left the feed. Leftover extra.",
        "../facebook/feed.html", "Facebook Like",
        [
            "Start.",
            "Like the four stories.",
            "Skip the ad Like.",
            "Finish writes itt09-game-likeburst.",
        ],
        items=[
            {"id": "l1", "label": "Like · roommate status"},
            {"id": "l2", "label": "Like · tagged photo"},
            {"id": "l3", "label": "Like · event tonight"},
            {"id": "l4", "label": "Like · shared link"},
            {"id": "ad", "label": "Like · sponsored page", "role": "trap", "trap": "Ad like"},
        ],
        start_status="Four likes. Skip the sponsored thumb.",
        chrome="Facebook — Like leftover",
        chrome_sub="2009 · thumb · no live graph",
        bg="#edeff4", bar="#3b5998",
    ),
    G(
        "2009", "b", "farmwilt", "Farm wilt", "seq",
        "Water plot A, water plot B, harvest. The timer was the loop.",
        "The timer was the loop. Residual extra — not the 2009 star.",
        "../farmville/index.html", "FarmVille",
        [
            "Start.",
            "Water A → Water B → Harvest, in order.",
            "Type wilt.",
            "Finish writes itt09-game-farmwilt.",
        ],
        confirm="wilt",
        items=[
            {"id": "a", "label": "Water plot A (wilt in 4h theater)", "order": 0},
            {"id": "b", "label": "Water plot B", "order": 1},
            {"id": "h", "label": "Harvest", "order": 2},
            {"id": "cash", "label": "Buy Farm Cash (skip)", "role": "trap", "trap": "IAP"},
        ],
        start_status="Water, water, harvest. Skip Farm Cash.",
        chrome="FarmVille — wilt leftover",
        chrome_sub="Timer theater · no live canvas",
        bg="#8fbc4c", bar="#35620c",
    ),
    G(
        "2010", "a", "ogburst", "Open Graph burst", "burst",
        "Like three objects off Facebook. Like left the site.",
        "Like left Facebook. Open Graph leftover.",
        "../facebook/index.html", "Open Graph",
        [
            "Start.",
            "Like the three off-site objects.",
            "Skip the fake counter.",
            "Finish writes itt10-game-ogburst.",
        ],
        items=[
            {"id": "cnn", "label": "Like · CNN article"},
            {"id": "mov", "label": "Like · movie page"},
            {"id": "song", "label": "Like · song"},
            {"id": "bot", "label": "Like · 14,000 fake fans", "role": "trap", "trap": "Fake counter"},
        ],
        start_status="Three off-site likes. Skip the fake counter.",
        chrome="Open Graph — 2010 leftover",
        chrome_sub="Like left the site · no live graph",
        bg="#edeff4", bar="#3b5998",
    ),
    G(
        "2010", "b", "ipadtilt", "iPad tilt", "seq",
        "Landscape, swipe a page, tilt back. The website, bigger. No camera.",
        "The website, bigger. 1st-gen leftover. No camera.",
        "../ipad/index.html", "iPad",
        [
            "Start.",
            "Landscape → Swipe page → Tilt back, in order.",
            "Type ipad.",
            "Finish writes itt10-game-ipadtilt.",
        ],
        confirm="ipad",
        items=[
            {"id": "land", "label": "Rotate to landscape", "order": 0},
            {"id": "swipe", "label": "Swipe a magazine page (theater)", "order": 1},
            {"id": "back", "label": "Tilt back to portrait", "order": 2},
            {"id": "cam", "label": "Open camera (1st-gen has none)", "role": "trap", "trap": "No camera"},
        ],
        start_status="Tilt, swipe, tilt. No camera.",
        chrome="iPad — 2010 leftover",
        chrome_sub="1st gen · no camera · website bigger",
        bg="#e8e8e8", bar="#111",
    ),
    G(
        "2011", "a", "circladd", "Circles add", "pick",
        "Add three people to a circle. “Add everyone” is the overshare trap.",
        "Circles were the pitch. Leftover extra.",
        "../googleplus/index.html", "Google+",
        [
            "Start.",
            "Add the three people.",
            "Do not add everyone.",
            "Finish writes itt11-game-circladd.",
        ],
        items=[
            {"id": "c1", "label": "Add · Friends"},
            {"id": "c2", "label": "Add · Family"},
            {"id": "c3", "label": "Add · Acquaintances"},
            {"id": "all", "label": "Add everyone (overshare)", "role": "trap", "trap": "Everyone"},
        ],
        start_status="Three circles. Everyone is the trap.",
        chrome="Google+ — Circles leftover",
        chrome_sub="2011 · no live plus",
        bg="#f5f5f5", bar="#dd4b39",
    ),
    G(
        "2011", "b", "spotplay", "Spotify US play", "seq",
        "Enter the invite, search a track, play. The US invite landed. Theater.",
        "The US invite landed. Theater only.",
        "../spotify/index.html", "Spotify US",
        [
            "Start.",
            "Invite → Search track → Play, in order.",
            "Type invite.",
            "Finish writes itt11-game-spotplay.",
        ],
        confirm="invite",
        items=[
            {"id": "inv", "label": "Paste invite code (theater)", "order": 0},
            {"id": "q", "label": "Search track", "order": 1},
            {"id": "play", "label": "Play", "order": 2},
            {"id": "pir", "label": "Open the torrent instead", "role": "trap", "trap": "Wrong 2011"},
        ],
        start_status="Invite, search, play. No torrent.",
        chrome="Spotify — US 2011 leftover",
        chrome_sub="Invite theater · no live stream",
        bg="#121212", bar="#1db954", bar_fg="#111", field_bg="#181818",
    ),
    G(
        "2012", "a", "andshare", "Android share", "seq",
        "Open the still, open the share sheet, pick Instagram. The filter left iOS.",
        "The filter left iOS. Leftover extra.",
        "../instagram/android.html", "IG Android",
        [
            "Start.",
            "Open still → Share sheet → Instagram, in order.",
            "Type android.",
            "Finish writes itt12-game-andshare.",
        ],
        confirm="android",
        items=[
            {"id": "still", "label": "Open still (gallery)", "order": 0},
            {"id": "sheet", "label": "Share sheet", "order": 1},
            {"id": "ig", "label": "Instagram", "order": 2},
            {"id": "mms", "label": "Send as MMS (not the 2012 verb)", "role": "trap", "trap": "MMS"},
        ],
        start_status="Share to IG. MMS is the old verb.",
        chrome="Android share — 2012 leftover",
        chrome_sub="Filter leaves iOS · no live upload",
        bg="#222222", bar="#3d8bfd", field_bg="#111111",
    ),
    G(
        "2012", "b", "ipopin", "IPO pin", "pick",
        "Pin $38, the lockup note, and the ticker. The rumor blog is rot.",
        "The ticker was the weather. Leftover extra.",
        "../facebook/ipo.html", "Facebook IPO",
        [
            "Start.",
            "Pin $38, lockup, ticker.",
            "Skip the rumor blog.",
            "Finish writes itt12-game-ipopin.",
        ],
        items=[
            {"id": "px", "label": "Pin $38"},
            {"id": "lock", "label": "Pin lockup note"},
            {"id": "tick", "label": "Pin ticker"},
            {"id": "rum", "label": "Rumor: $200 open (blog)", "role": "trap", "trap": "Rumor"},
        ],
        start_status="Three pins. Skip the rumor.",
        chrome="Facebook IPO — 2012 leftover",
        chrome_sub="$38 · ticker weather · no live quote",
        bg="#fff", bar="#3b5998",
    ),
    G(
        "2013", "a", "vinhold", "Vine hold", "hold",
        "Hold the record button for the 6-second beat. Six seconds was the unit.",
        "Six seconds was the unit. Leftover extra — not the 2013 star if the star is elsewhere.",
        "../vine/record.html", "Vine 6s",
        [
            "Start.",
            "Hold Record for the full beat (short in ?fast=1).",
            "Letting go early does not write.",
            "Finish writes itt13-game-vinhold.",
        ],
        hold_label="Hold to record",
        hold_ms=1600,
        start_status="Hold the full beat. Early release never writes.",
        chrome="Vine — hold leftover",
        chrome_sub="6s unit · no live loop",
        bg="#00bf8f", bar="#111",
    ),
    G(
        "2013", "b", "snap24", "Story 24h", "wizard",
        "Snap → add to Story → 24h. Stories lasted a day.",
        "Stories lasted a day. Leftover extra.",
        "../snapchat/story.html", "Snap Stories",
        [
            "Start.",
            "Next through Snap, Add to Story, 24h.",
            "Finish writes itt13-game-snap24.",
        ],
        panels=[
            {"title": "1 · Snap", "body": "Hold the circle (theater still).", "nextLabel": "Add to Story"},
            {"title": "2 · Story", "body": "This is not a one-to-one snap.", "nextLabel": "24 hours"},
            {"title": "3 · 24h", "body": "It dies tomorrow. That is the point.", "nextLabel": "Done"},
        ],
        start_status="Three panels. A day is the unit.",
        chrome="Snapchat — Story leftover",
        chrome_sub="24h · no live snap",
        bg="#fffc00", bar="#111",
    ),
    G(
        "2014", "a", "wainstall2", "WA install tap", "seq",
        "Get the app, allow contacts, open a chat. The deal was the weather. Install is leftover.",
        "The deal was the weather. Install is leftover. Literacy stays on the star page.",
        "../whatsapp/index.html", "WhatsApp",
        [
            "Start.",
            "Get app → Allow contacts → Open chat, in order.",
            "Type install.",
            "Finish writes itt14-game-wainstall2.",
        ],
        confirm="install",
        items=[
            {"id": "get", "label": "Get WhatsApp (theater install)", "order": 0},
            {"id": "con", "label": "Allow contacts", "order": 1},
            {"id": "chat", "label": "Open chat", "order": 2},
            {"id": "sms", "label": "Fall back to SMS forever", "role": "trap", "trap": "SMS"},
        ],
        start_status="Install path. SMS is the old world.",
        chrome="WhatsApp — install leftover",
        chrome_sub="2014 deal weather · no live send",
        bg="#ece5dd", bar="#075e54",
    ),
    G(
        "2014", "b", "bleedack", "Heartbleed rotate", "seq",
        "See the CVE, rotate the password, confirm. Change the password. Do not run the bug.",
        "Change the password. Do not run the bug. No exploit, no PoC.",
        "../heartbleed/index.html", "Heartbleed",
        [
            "Start.",
            "See CVE → Rotate password → Confirm, in order.",
            "Type rotate.",
            "Finish writes itt14-game-bleedack. No exploit.",
        ],
        confirm="rotate",
        items=[
            {"id": "cve", "label": "See CVE-2014-0160 (read-only)", "order": 0},
            {"id": "rot", "label": "Rotate password (theater)", "order": 1},
            {"id": "ok", "label": "Confirm rotate", "order": 2},
            {"id": "poc", "label": "Run the proof of concept (blocked)", "role": "trap", "trap": "No exploit"},
        ],
        start_status="Rotate. Do not run the bug.",
        chrome="Heartbleed — rotate leftover",
        chrome_sub="No exploit · no PoC · museum",
        bg="#fff4f4", bar="#9b1c1c",
    ),
    G(
        "2015", "a", "peritap", "Periscope tap", "seq",
        "Title the live, go live, stop. The phone goes live. Star stays Go LIVE on the product page.",
        "The phone goes live. Leftover extra — star stays on the Periscope page.",
        "../periscope/index.html", "Periscope",
        [
            "Start.",
            "Title → Go LIVE → Stop, in order.",
            "Type live.",
            "Finish writes itt15-game-peritap.",
        ],
        confirm="live",
        items=[
            {"id": "title", "label": "Title: walking home (theater)", "order": 0},
            {"id": "go", "label": "Go LIVE", "order": 1},
            {"id": "stop", "label": "Stop", "order": 2},
            {"id": "vod", "label": "Save VOD forever (not 2015 default)", "role": "trap", "trap": "VOD later"},
        ],
        start_status="Title, live, stop. VOD is later.",
        chrome="Periscope — leftover live",
        chrome_sub="Phone goes live · no real stream",
        bg="#3aa1ff", bar="#111",
    ),
    G(
        "2015", "b", "lockertap", "Photos locker", "seq",
        "Pick a still, lock it, confirm. The roll left the device.",
        "The roll left the device. Leftover extra.",
        "../googlephotos/index.html", "Google Photos",
        [
            "Start.",
            "Pick still → Lock → Confirm, in order.",
            "Type locker.",
            "Finish writes itt15-game-lockertap.",
        ],
        confirm="locker",
        items=[
            {"id": "pick", "label": "Pick still from the roll", "order": 0},
            {"id": "lock", "label": "Lock (theater locker)", "order": 1},
            {"id": "ok", "label": "Confirm", "order": 2},
            {"id": "pub", "label": "Share album to the web (not locker)", "role": "trap", "trap": "Public"},
        ],
        start_status="Lock a still. Public share is the other verb.",
        chrome="Google Photos — locker leftover",
        chrome_sub="Roll left the device · no live upload",
        bg="#fff", bar="#4285f4",
    ),
    G(
        "2016", "a", "storytap", "Story tap", "seq",
        "Open camera, add a 24h slide, share. Star stays Stories on the product page.",
        "The slide lasts a day. Leftover extra — star stays Stories.",
        "../instagram/stories.html", "Instagram Stories",
        [
            "Start.",
            "Camera → Add slide → Share 24h, in order.",
            "Type story.",
            "Finish writes itt16-game-storytap.",
        ],
        confirm="story",
        items=[
            {"id": "cam", "label": "Open camera", "order": 0},
            {"id": "add", "label": "Add 24h slide", "order": 1},
            {"id": "share", "label": "Share to Story", "order": 2},
            {"id": "grid", "label": "Post to the grid instead", "role": "trap", "trap": "Grid"},
        ],
        start_status="Story path. Grid is the other post.",
        chrome="Instagram Stories — leftover",
        chrome_sub="24h · star stays on stories.html",
        bg="#111", bar="#e1306c", field_bg="#1a1a1a",
    ),
    G(
        "2016", "b", "gymtap", "Gym tap", "burst",
        "Walk three leftover gyms. The lure shop is rot. Sidewalks filled. Stories is still the star.",
        "Sidewalks filled. Stories is still the star. This is leftover.",
        "../pokemongo/index.html", "Pokémon GO leftover",
        [
            "Start.",
            "Walk the three gyms.",
            "Skip the lure shop.",
            "Finish writes itt16-game-gymtap.",
        ],
        items=[
            {"id": "g1", "label": "Walk gym · park fountain"},
            {"id": "g2", "label": "Walk gym · library steps"},
            {"id": "g3", "label": "Walk gym · train station"},
            {"id": "lure", "label": "Buy a lure (shop)", "role": "trap", "trap": "Shop"},
        ],
        start_status="Three gyms. Skip the shop.",
        chrome="Pokémon GO — gym leftover",
        chrome_sub="Not the 2016 star · sidewalk theater",
        bg="#1a73e8", bar="#0b3d91",
    ),
    G(
        "2017", "a", "facetap", "Face tap", "seq",
        "Raise the phone, scan, unlock. The face is the password. Star stays Face ID.",
        "The face is the password. Leftover extra — star stays Face ID.",
        "../iphone/x.html", "Face ID",
        [
            "Start.",
            "Raise phone → Scan → Unlock, in order.",
            "Type face.",
            "Finish writes itt17-game-facetap.",
        ],
        confirm="face",
        items=[
            {"id": "raise", "label": "Raise phone", "order": 0},
            {"id": "scan", "label": "Scan (theater dots)", "order": 1},
            {"id": "un", "label": "Unlock", "order": 2},
            {"id": "pass", "label": "Use passcode instead (fallback)", "role": "trap", "trap": "Passcode"},
        ],
        start_status="Face path. Passcode is fallback, not this leftover.",
        chrome="Face ID — leftover",
        chrome_sub="Star stays on iphone/x · no live TrueDepth",
        bg="#111", bar="#f5f5f7", bar_fg="#111", field_bg="#1c1c1e",
    ),
    G(
        "2017", "b", "bustap", "Battle-bus tap", "seq",
        "Board the bus, jump, land. Saturday living rooms. Face ID is still the star.",
        "Saturday living rooms. Face ID is still the star. Museum original — no brand sprites.",
        "../fortnite/index.html", "Fortnite leftover",
        [
            "Start.",
            "Board → Jump → Land, in order.",
            "Type bus.",
            "Finish writes itt17-game-bustap.",
        ],
        confirm="bus",
        items=[
            {"id": "board", "label": "Board the bus (theater)", "order": 0},
            {"id": "jump", "label": "Jump", "order": 1},
            {"id": "land", "label": "Land", "order": 2},
            {"id": "vb", "label": "Buy V-Bucks (shop)", "role": "trap", "trap": "Shop"},
        ],
        start_status="Board, jump, land. Skip the shop.",
        chrome="Battle-bus leftover",
        chrome_sub="Not the 2017 star · no brand sprites",
        bg="#2b1055", bar="#9b5de5", field_bg="#1a0a33",
    ),
    G(
        "2018", "a", "managetap", "Manage tap", "seq",
        "See the banner, open Manage, reject extras. Accept All never writes.",
        "The banner is the door. Accept All is the trap.",
        "../gdpr/index.html", "GDPR Manage",
        [
            "Start.",
            "See banner → Manage → Reject extras, in order.",
            "Type manage.",
            "Do not Accept All.",
            "Finish writes itt18-game-managetap.",
        ],
        confirm="manage",
        items=[
            {"id": "ban", "label": "See the cookie banner", "order": 0},
            {"id": "man", "label": "Manage", "order": 1},
            {"id": "rej", "label": "Reject extras", "order": 2},
            {"id": "all", "label": "Accept All", "role": "trap", "trap": "Accept All"},
        ],
        start_status="Manage. Accept All never writes.",
        chrome="GDPR — Manage leftover",
        chrome_sub="Banner is the door · no live consent",
        bg="#fff", bar="#111",
    ),
    G(
        "2018", "b", "fyptap", "FYP tap", "seq",
        "Swipe one, swipe two, linger. The loops changed their name. Not the chip.",
        "The loops changed their name. Leftover extra — not the chip.",
        "../tiktok/fyp.html", "TikTok leftover",
        [
            "Start.",
            "Swipe 1 → Swipe 2 → Linger, in order.",
            "Type fyp.",
            "Finish writes itt18-game-fyptap.",
        ],
        confirm="fyp",
        items=[
            {"id": "s1", "label": "Swipe 1 (For You theater)", "order": 0},
            {"id": "s2", "label": "Swipe 2", "order": 1},
            {"id": "ling", "label": "Linger (the signal)", "order": 2},
            {"id": "live", "label": "Open live shop", "role": "trap", "trap": "Shop"},
        ],
        start_status="Swipe, swipe, linger. Skip the shop.",
        chrome="For You — leftover",
        chrome_sub="Not the chip · no live FYP",
        bg="#010101", bar="#fe2c55", field_bg="#111",
    ),
]


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


def js_spec(spec: dict) -> dict:
    out = {
        "year": spec["year"],
        "id": spec["id"],
        "kind": spec["kind"],
        "confirm": spec["confirm"],
        "query": spec["query"],
        "queryLabel": spec["query_label"],
        "runLabel": spec["run_label"],
        "submitLabel": spec["submit_label"],
        "holdLabel": spec["hold_label"],
        "holdMs": spec["hold_ms"],
        "items": spec["items"],
        "fields": spec["fields"],
        "results": spec["results"],
        "panels": spec["panels"],
        "startStatus": spec["start_status"] or "Do the year-true steps. Incomplete never writes.",
        "idleStatus": "Press Start. Incomplete never writes.",
    }
    return {k: v for k, v in out.items() if v not in (None, "", [], {})}


def steps_html(spec: dict) -> str:
    key = f"itt{spec['year'][2:]}-game-{spec['id']}"
    rows = [('<li data-step="start">Start</li>')]
    kind = spec["kind"]
    if kind == "form":
        rows.append('<li data-step="fields">Fill every field exactly</li>')
        rows.append(f'<li data-step="submit">{esc(spec["submit_label"])}</li>')
    elif kind == "search":
        rows.append(f'<li data-step="query">Type <code>{esc(spec["query"])}</code> and {esc(spec["run_label"])}</li>')
        rows.append('<li data-step="hit">Click the real hit — skip decoys</li>')
    elif kind == "hold":
        rows.append('<li data-step="hold">Hold the full beat</li>')
    elif kind == "wizard":
        rows.append('<li data-step="acts">Next through every panel</li>')
    elif kind == "seq":
        rows.append('<li data-step="acts">Click the year-true path in order. Traps never write.</li>')
    else:
        rows.append('<li data-step="acts">Do every good row. Skip traps.</li>')
    if spec["confirm"]:
        rows.append(f'<li data-step="type">Type <code>{esc(spec["confirm"])}</code></li>')
    rows.append(f'<li data-step="save">Finish writes <code>{key}</code></li>')
    return "\n    ".join(rows)


def is_dark(hex_color: str) -> bool:
    h = str(hex_color).lstrip("#")
    if len(h) != 6:
        return False
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return (r + g + b) / 3 < 90


def html_for(spec: dict, other: dict) -> str:
    year = spec["year"]
    gid = spec["id"]
    key = f"itt{year[2:]}-game-{gid}"
    slot = spec["slot"]
    other_file = "extra-b.html" if slot == "a" else "extra-a.html"
    confirm_attr = f' data-mx-confirm-need="{esc(spec["confirm"])}"' if spec["confirm"] else ""
    query_attr = f' data-mx-query="{esc(spec["query"])}"' if spec["query"] else ""
    fg = "#eee" if is_dark(spec["bg"]) or is_dark(spec["field_bg"]) else "#111"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{esc(spec["title"])} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css_for(year)}">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
<link rel="stylesheet" href="../../../../css/year-extra-minute.css">
<style>
.mx-shell {{ font-family: {spec["font"]}; background: {spec["field_bg"]}; color: {fg}; border: 1px solid #808080; }}
.mx-chrome {{ background: {spec["bar"]}; color: {spec["bar_fg"]}; }}
.mx-field {{ background: {spec["field_bg"]}; color: {fg}; }}
.mx-shell a {{ color: inherit; }}
</style>
</head>
<body class="yg-body yg-year-{year}" bgcolor="{spec["bg"]}" style="color:{fg}">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell mx-shell" data-year-game data-minute-extra data-mx-kind="{esc(spec["kind"])}" data-year="{year}" data-game-id="{gid}" data-yg-goal="{esc(spec["goal"])}" data-yg-next-href="{esc(spec["dest"])}" data-yg-next-label="{esc(spec["dest_label"])}"{confirm_attr}{query_attr}>
  <div class="mx-chrome">{esc(spec["chrome"])}<span class="mx-chrome-sub">{esc(spec["chrome_sub"])}</span></div>
  <h1>{esc(spec["title"])} — {year}</h1>
  <p class="mx-goal">{esc(spec["goal"])}</p>
  <p class="honesty yg-honesty"><b>{esc(spec["why"])}</b> · leftover extra · not the year star · museum original · incomplete never writes · key <code>{key}</code></p>
  <ol class="yg-steps" data-yg-steps>
    {steps_html(spec)}
  </ol>
  <p class="mx-hud">Score <b data-game-score>0</b> · Best <b data-game-best>0</b> · <span data-mx-hud>kind {esc(spec["kind"])}</span></p>
  <div data-mx-field class="mx-field" aria-label="{esc(spec["title"])} playfield"></div>
  <p class="mx-actions">
    <button type="button" data-game-start>Start</button>
    <button type="button" data-mx-finish>Finish</button>
  </p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
  <p class="mx-nav">
    <a href="index.html">← Playables</a> ·
    <a href="game.html">Year game</a> ·
    <a href="extra-a.html">Extra A</a> ·
    <a href="extra-b.html">Extra B</a> ·
    <a href="{other_file}">{esc(other["title"])}</a> ·
    <a href="famous.html">Famous leftover</a> ·
    <a href="{esc(spec["dest"])}">{esc(spec["dest_label"])}</a>
  </p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-extra-minute.js"></script>
<script src="../../../../js/games/year-{year}-{gid}.js"></script>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def js_for(spec: dict) -> str:
    payload = json.dumps(js_spec(spec), indent=2)
    return f"""/**
 * {spec["title"]} — {spec["year"]} leftover extra (minute).
 * Key: itt{spec["year"][2:]}-game-{spec["id"]}
 * Kind: {spec["kind"]}. Incomplete never writes. Traps never write.
 */
(function () {{
  "use strict";
  var MX = window.ITT && ITT.YearExtraMinute;
  if (!MX) return;
  MX.mount({payload});
}})();
"""


def write_doc(by_year: dict[str, list[dict]]) -> None:
    lines = [
        "# Year extra games — minute visitor steps",
        "",
        "Two leftover extras per shipped year (1994–2018). Not the year star.",
        "Engine: `js/games/year-extra-minute.js`. Pages: `years/YYYY/sites/playable/extra-a.html` / `extra-b.html`.",
        "",
        "Rules:",
        "",
        "- Start first. Empty Finish never writes.",
        "- Traps / decoys / Accept All / live tiles / exploits never write.",
        "- Finish after every year-true step writes `ittYY-game-<id>` with `real: true` and `multiStep: true`.",
        "- Honesty on every page: leftover extra · museum original · incomplete never writes.",
        "",
    ]
    for year in sorted(by_year):
        lines.append(f"## {year}")
        lines.append("")
        for spec in by_year[year]:
            key = f"itt{year[2:]}-game-{spec['id']}"
            lines.append(f"### {spec['title']} (`{spec['id']}`)")
            lines.append("")
            lines.append(f"- Kind: `{spec['kind']}`")
            lines.append(f"- Key: `{key}`")
            lines.append(f"- Dest: [{spec['dest_label']}]({spec['dest']})")
            lines.append(f"- Goal: {spec['goal']}")
            lines.append("- Visitor:")
            for i, step in enumerate(spec["visitor"], 1):
                lines.append(f"  {i}. {step}")
            lines.append("")
    path = ROOT / "docs" / "YEAR-EXTRA-GAMES-MINUTE.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", path.relative_to(ROOT))


def main() -> None:
    by_year: dict[str, list[dict]] = {}
    for spec in SPECS:
        by_year.setdefault(spec["year"], []).append(spec)

    assert len(SPECS) == 50, len(SPECS)
    for year, pair in by_year.items():
        assert len(pair) == 2, year

    for year, pair in by_year.items():
        a, b = pair
        for spec, other in ((a, b), (b, a)):
            html_path = ROOT / "years" / year / "sites" / "playable" / f"extra-{spec['slot']}.html"
            js_path = ROOT / "js" / "games" / f"year-{year}-{spec['id']}.js"
            html_path.write_text(html_for(spec, other), encoding="utf-8")
            js_path.write_text(js_for(spec), encoding="utf-8")
            print("wrote", html_path.relative_to(ROOT), js_path.relative_to(ROOT))

    write_doc(by_year)


if __name__ == "__main__":
    main()
