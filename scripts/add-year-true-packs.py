#!/usr/bin/env python3
"""Generate year-true product rooms 1994–2013 (skip existing dirs). Incomplete never writes."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year, id, title, when, thesis, type, bans, ui hints
PACKS: list[dict] = [
    # 1994
    dict(y=1994, id="webcrawler", title="WebCrawler", when="Apr 20, 1994", thesis="Brian Pinkerton full-text Web search — crawl then query, not just titles.", typ="fillGo", bans="No invent logo · no live crawl", go="Search residual", q="search the web…"),
    dict(y=1994, id="galaxy", title="EINet Galaxy", when="1994 directory", thesis="EINet Galaxy subject tree — academic directory beside Yahoo@Stanford.", typ="twoClick", bans="No invent logo", a="Open Arts residual", b="Open Science residual"),
    dict(y=1994, id="gnn", title="Global Network Navigator", when="1993–94 O'Reilly", thesis="GNN is an early commercial Web magazine/directory — not a 1995 portal clone.", typ="twoClick", bans="No invent logo", a="Open Whole Internet Catalog", b="Read GNN Magazine residual"),
    dict(y=1994, id="jumpstation", title="JumpStation", when="1993–94", thesis="JumpStation robot search residual — early crawler before WebCrawler mass.", typ="fillGo", bans="Educational index only", go="Jump residual", q="keyword…"),
    # 1995
    dict(y=1995, id="classmates", title="Classmates.com", when="1995", thesis="Find your high-school class residual — early people search / reunion Web.", typ="fillGo", bans="No real PII · educational", go="Find class residual", q="Lincoln High 1988"),
    dict(y=1995, id="match", title="Match.com", when="1995", thesis="Online personals residual — pre-Tinder mass dating Web.", typ="twoClick", bans="Careful · no harassment theater · 18+ literacy only", a="Open profile residual", b="Send wink residual"),
    dict(y=1995, id="tripod", title="Tripod", when="1995", thesis="Free homepage host rival to GeoCities — build a pod residual.", typ="fillGo", bans="No invent logo", go="Publish pod residual", q="my trip home title"),
    dict(y=1995, id="pathfinder", title="Pathfinder", when="Time Inc. 1994–95", thesis="Magazine Web portal residual — Time/People/Fortune under one roof.", typ="twoClick", bans="No invent logo", a="Open Time residual", b="Open People residual"),
    # 1996
    dict(y=1996, id="angelfire", title="Angelfire", when="1996", thesis="Free host residual — under construction GIFs and guestbooks.", typ="fillGo", bans="No invent logo", go="Publish page residual", q="Welcome to my page"),
    dict(y=1996, id="aolportal", title="AOL.com residual", when="1996–97 Web door", thesis="AOL keyword Web door residual — walled garden meets the Web.", typ="fillGo", bans="No real AOL account · You’ve Got Mail is separate", go="Keyword residual", q="weather"),
    dict(y=1996, id="realplayer", title="RealPlayer / RealAudio", when="1995–97 stream", thesis="Buffering theater — hearing audio on the Web was news.", typ="twoClick", bans="No real stream · no codec rip", a="Buffer residual", b="Play residual"),
    dict(y=1996, id="theglobe", title="theGlobe.com", when="1995–98 community", thesis="Community portal residual — pre-crash “everyone’s a publisher.”", typ="twoClick", bans="No invent logo", a="Join community residual", b="Post residual"),
    # 1997
    dict(y=1997, id="aim", title="AOL Instant Messenger", when="May 1997 launch", thesis="US IM default launch residual — buddy list before mass 1999.", typ="fillGo", bans="No real AOL · 1997 launch honesty", go="Sign on residual", q="screenname97"),
    dict(y=1997, id="winamp", title="Winamp", when="1997", thesis="It really whips the llama’s ass — desktop MP3 player residual.", typ="twoClick", bans="No real MP3 · CSS silhouette only", a="Load playlist residual", b="Play residual"),
    dict(y=1997, id="javaplugin", title="Java plugin nag", when="1997 applet Web", thesis="This site needs Java — install/enable plugin literacy.", typ="twoClick", bans="No real applet · no invent Duke logo art", a="Enable Java residual", b="Reload applet residual"),
    dict(y=1997, id="scripting", title="Scripting News", when="Dave Winer 1997", thesis="Dave Winer daily residual — blog before Blogger was a product.", typ="twoClick", bans="Educational · no invent logo", a="Read today residual", b="Follow link residual"),
    # 1998
    dict(y=1998, id="goto", title="GoTo.com", when="1998 paid search", thesis="Paid placement search residual — ads as ranking, pre-AdWords mass.", typ="fillGo", bans="Educational ad literacy", go="Search residual", q="flowers"),
    dict(y=1998, id="mp3com", title="MP3.com", when="1997–99", thesis="Legal-ish MP3 locker / artist pages residual before Napster scare peak.", typ="twoClick", bans="No real files · no pirate UI", a="Open artist residual", b="Add to locker residual"),
    dict(y=1998, id="realplayer", title="RealPlayer 5 residual", when="1998 trailers", thesis="Click to buffer a trailer residual — pre-YouTube streaming literacy.", typ="twoClick", bans="No real stream", a="Buffer residual", b="Watch residual"),
    dict(y=1998, id="winamp", title="Winamp 2 residual", when="1998–99 mass", thesis="Skins + playlist residual as MP3 culture hits the desktop.", typ="twoClick", bans="No real MP3", a="Pick skin residual", b="Play residual"),
    # 1999
    dict(y=1999, id="yahoomessenger", title="Yahoo Messenger", when="1998–99", thesis="Yahoo IM residual beside AIM — status + chat theater.", typ="fillGo", bans="No real Yahoo ID", go="Sign in residual", q="coolkid99"),
    dict(y=1999, id="etrade", title="E*TRADE residual", when="1990s–99 boom", thesis="Click-trade residual — bubble retail brokerage literacy, not advice.", typ="twoClick", bans="Not financial advice · no real money", a="Open quote residual", b="Place residual order"),
    dict(y=1999, id="webvan", title="Webvan residual", when="1999 grocery crash seed", thesis="Grocery delivery IPO residual — last-mile crash literacy.", typ="pickStart", bans="No real delivery", picks="SF,Chicago,Atlanta"),
    dict(y=1999, id="boocom", title="Boo.com residual", when="1999 fashion crash", thesis="Flash-heavy fashion shop residual — why the boom looked expensive.", typ="twoClick", bans="No invent logo · no real cart charge", a="Browse look residual", b="Add residual"),
    # 2000
    dict(y=2000, id="limewire", title="LimeWire residual", when="2000 Gnutella client", thesis="Search → noisy results theater — P2P after Napster, no real files.", typ="fillGo", bans="Educational only · no real swarm", go="Search residual", q="song name"),
    dict(y=2000, id="expedia", title="Expedia residual", when="1996–2000 OTA mass", thesis="Flight search theater — Web travel agent residual.", typ="fillGo", bans="No real booking", go="Search flights residual", q="SEA to JFK"),
    dict(y=2000, id="travelocity", title="Travelocity residual", when="1996–2000", thesis="Sabre-backed OTA residual beside Expedia.", typ="fillGo", bans="No real booking", go="Find trips residual", q="LAX to ORD"),
    dict(y=2000, id="half", title="Half.com residual", when="1999–2000 eBay", thesis="Used CDs/textbooks fixed-price residual — eBay buys Half.com 2000.", typ="twoClick", bans="No real listing fee", a="List CD residual", b="Publish residual"),
    # 2001
    dict(y=2001, id="runescape", title="RuneScape residual", when="Jan 2001 browser MMO", thesis="Free browser fantasy residual — no official sprites.", typ="twoClick", bans="CSS silhouette only · no Jagex art", a="Create residual", b="Enter world residual"),
    dict(y=2001, id="habbo", title="Habbo Hotel residual", when="2000–01 rooms", thesis="Pixel hotel chat residual — no official furniture art.", typ="twoClick", bans="Silhouette · careful kids-adjacent framing", a="Enter lobby residual", b="Wave residual"),
    dict(y=2001, id="limewire", title="LimeWire residual", when="2001 mass", thesis="Gnutella client residual year after Napster shutdown path.", typ="fillGo", bans="No real files", go="Search residual", q="track title"),
    dict(y=2001, id="itunesstoreban", title="iTunes 2 honesty", when="2001 pre-Store", thesis="Rip/mix/burn residual — iTunes Music Store is Oct 2003 ban here.", typ="twoClick", bans="No Music Store · no invent logo", a="Import CD residual", b="Play library residual"),
    # 2002
    dict(y=2002, id="xanga", title="Xanga residual", when="2000s teen blog", thesis="Metablog / teen blog residual beside LiveJournal/Blogger.", typ="fillGo", bans="No invent logo", go="Publish residual", q="today at lunch…"),
    dict(y=2002, id="deviantart", title="DeviantArt residual", when="2000–02 art community", thesis="Art community residual — watch / deviation theater, no invent logo.", typ="twoClick", bans="No invent logo · no scraped art", a="Open deviation residual", b="Watch artist residual"),
    dict(y=2002, id="somethingawful", title="Something Awful residual", when="1999–2002 forums", thesis="Forum culture residual — FYAD literacy, not harassment theater.", typ="twoClick", bans="Careful · no raid tools", a="Open thread residual", b="Reply residual"),
    dict(y=2002, id="livejournal", title="LiveJournal residual", when="1999–2002 mass", thesis="Friends page + mood residual — blog as social graph.", typ="fillGo", bans="No invent logo", go="Post residual", q="current mood: okay"),
    # 2003
    dict(y=2003, id="secondlife", title="Second Life residual", when="2003 Linden", thesis="Virtual world residual — island silhouette, no Linden asset rip.", typ="twoClick", bans="No official textures · no real L$", a="Rez avatar residual", b="Teleport residual"),
    dict(y=2003, id="skype", title="Skype residual", when="Aug 2003 launch", thesis="Free PC-to-PC voice residual — launch year, mass later.", typ="fillGo", bans="No real VoIP", go="Call residual", q="echo123"),
    dict(y=2003, id="imageshack", title="ImageShack residual", when="2003 host", thesis="Hotlink image host residual beside Photobucket.", typ="twoClick", bans="No real CDN", a="Upload residual", b="Copy hotlink residual"),
    dict(y=2003, id="delicious", title="del.icio.us residual", when="2003 social bookmarks", thesis="Tag your links residual — folksonomy year before 2004 mass copy.", typ="fillGo", bans="No invent logo", go="Save bookmark residual", q="http://example.org cool"),
    # 2004
    dict(y=2004, id="basecamp", title="Basecamp residual", when="2004 37signals", thesis="Project Web app residual — to-dos + messages, not email.", typ="twoClick", bans="No real billing", a="New project residual", b="Add to-do residual"),
    dict(y=2004, id="tinypic", title="TinyPic residual", when="2004 host", thesis="Quick image host residual for forums/MySpace.", typ="twoClick", bans="No real CDN", a="Upload residual", b="Get URL residual"),
    dict(y=2004, id="orkutseed", title="Orkut residual densify", when="Jan 2004", thesis="Google invite social residual — Brazil/India mass honesty.", typ="twoClick", bans="No invent logo", a="Accept invite residual", b="Add scrap residual"),
    dict(y=2004, id="worldofwarcraft", title="World of Warcraft residual", when="Nov 23 2004", thesis="Subscription MMO residual culture — no official art, no gold sellers.", typ="twoClick", bans="Silhouette only", a="Create residual", b="Enter Azeroth residual"),
    # 2005
    dict(y=2005, id="utorrent", title="µTorrent residual", when="2005 client", thesis="Tiny BitTorrent client residual — swarm literacy, no real torrent bytes.", typ="twoClick", bans="Educational only · no pirate index UI", a="Open .torrent residual", b="Start swarm residual"),
    dict(y=2005, id="googleearth", title="Google Earth residual", when="2005 Keyhole", thesis="Spin the globe residual — Keyhole → Google Earth literacy.", typ="twoClick", bans="No live tiles · CSS globe", a="Spin residual", b="Search place residual"),
    dict(y=2005, id="kayak", title="KAYAK residual", when="2005 meta-search", thesis="Flight meta-search residual — compare OTAs, no real PNR.", typ="fillGo", bans="No real booking", go="Search residual", q="BOS to SFO"),
    dict(y=2005, id="secondlife", title="Second Life residual", when="2005 mass press", thesis="Virtual economy residual hits mainstream press.", typ="twoClick", bans="No Linden rip", a="Land residual", b="Pay residual L$ theater"),
    # 2006
    dict(y=2006, id="meebo", title="Meebo residual", when="2005–06 Web IM", thesis="Multi-IM in the browser residual — AIM+MSN+Yahoo bridge.", typ="fillGo", bans="No real IM network", go="Sign on residual", q="meebo_user"),
    dict(y=2006, id="huffpost", title="Huffington Post residual", when="May 2005–06", thesis="Blog → news residual — comment culture + politics literacy.", typ="twoClick", bans="Educational · no persuasion tool", a="Open story residual", b="Comment residual"),
    dict(y=2006, id="wikileaks", title="WikiLeaks residual", when="2006 launch", thesis="Document drop residual — careful journalism literacy, not a leak tool.", typ="twoClick", bans="Careful · no real drop · not advice", a="Read about residual", b="Ack careful residual"),
    dict(y=2006, id="youtubeembed", title="YouTube embed residual", when="2006 embed mass", thesis="Paste this embed code residual — video leaves YouTube.com.", typ="twoClick", bans="No real CDN", a="Copy embed residual", b="Preview page residual"),
    # 2007
    dict(y=2007, id="etsy", title="Etsy residual", when="2005–07 handmade mass", thesis="Handmade marketplace residual — browse shop, no real money.", typ="twoClick", bans="No real checkout", a="Open shop residual", b="Add to cart residual"),
    dict(y=2007, id="googletranslate", title="Google Translate residual", when="2006–07 public", thesis="Type text → another language residual — statistical MT literacy.", typ="fillGo", bans="No invent logo · on-device fake only", go="Translate residual", q="hello world"),
    dict(y=2007, id="kindle", title="Kindle residual", when="Nov 19 2007", thesis="Whispernet ebook residual — not a paper book store clone.", typ="pickStart", bans="No invent logo · no real Whispernet", picks="Kindle 1,$399"),
    dict(y=2007, id="iphoneweb", title="iPhone Web residual", when="Jun 29 2007", thesis="Safari in your pocket residual — no App Store yet (2008 ban).", typ="twoClick", bans="No App Store · no invent logo", a="Open safari residual", b="Add bookmark residual"),
    # 2008
    dict(y=2008, id="evernote", title="Evernote residual", when="2008 public", thesis="Clip the Web → notebook residual.", typ="twoClick", bans="No real sync cloud", a="Clip page residual", b="Save notebook residual"),
    dict(y=2008, id="groupon", title="Groupon residual", when="Nov 2008 launch", thesis="Deal-of-the-day residual — 2010 mass labeled as later.", typ="twoClick", bans="2008 launch honesty · not 2010 peak-only", a="See deal residual", b="Buy residual theater"),
    dict(y=2008, id="airbnb", title="Airbnb residual", when="Aug 2008 launch", thesis="AirBed & Breakfast launch residual — mass is later years.", typ="fillGo", bans="No real booking · 2008 seed honesty", go="Search residual", q="San Francisco"),
    dict(y=2008, id="spotifyseed", title="Spotify invite residual", when="Oct 2008 EU invite", thesis="EU invite streamer residual — US launch is 2011 ban here.", typ="twoClick", bans="No US mass · no invent logo", a="Request invite residual", b="Play residual"),
    # 2009
    dict(y=2009, id="wolframalpha", title="Wolfram|Alpha residual", when="May 2009", thesis="Compute engine residual — not a Google clone.", typ="fillGo", bans="No invent logo", go="Compute residual", q="population of japan"),
    dict(y=2009, id="vevo", title="VEVO residual", when="Dec 2009", thesis="Label music video residual on YouTube — official channel literacy.", typ="twoClick", bans="No real video", a="Open video residual", b="Share residual"),
    dict(y=2009, id="foursquarecheckin", title="Foursquare check-in", when="2009", thesis="Check in · mayorship residual — local social graph.", typ="twoClick", bans="No real GPS", a="Check in residual", b="Claim mayor residual"),
    dict(y=2009, id="bing", title="Bing residual densify", when="Jun 1 2009", thesis="Decision engine residual — Microsoft search rebrand vs Live Search.", typ="fillGo", bans="No invent logo", go="Search residual", q="weather seattle"),
    # 2010
    dict(y=2010, id="formspring", title="Formspring residual", when="2009–10 Q&A", thesis="Anonymous Q&A residual — careful teen-Web literacy.", typ="twoClick", bans="Careful · no harassment theater", a="Ask residual", b="Answer residual"),
    dict(y=2010, id="grooveshark", title="Grooveshark residual", when="2007–14 careful", thesis="Search-play locker residual — shutdown honesty, not a pirate tool.", typ="fillGo", bans="Educational · no real stream · legal careful", go="Play residual", q="song title"),
    dict(y=2010, id="path", title="Path residual", when="2010 private social", thesis="50-friend social residual — intimate vs Facebook mass.", typ="twoClick", bans="No invent logo", a="Add moment residual", b="Share path residual"),
    dict(y=2010, id="colorapp", title="Color residual", when="2011 seed labeled", thesis="Photo-proximity app residual flop literacy — 2011 launch often cited; keep 2010–11 seed honesty.", typ="twoClick", bans="Honesty · no invent logo", a="Open nearby residual", b="Snap residual"),
    # 2011
    dict(y=2011, id="duckduckgo", title="DuckDuckGo residual", when="2008–11 privacy search", thesis="Privacy search residual — !bangs literacy vs Google habit.", typ="fillGo", bans="No invent logo", go="Search residual", q="!w internet"),
    dict(y=2011, id="turntable", title="turntable.fm residual", when="2011 DJ rooms", thesis="Avatar DJ room residual — no official avatars.", typ="twoClick", bans="Silhouette only", a="Sit DJ residual", b="Play track residual"),
    dict(y=2011, id="twitch", title="Twitch / Justin.tv residual", when="2011 rebrand path", thesis="Justin.tv → Twitch gaming residual — 2011 path, Amazon deal is 2014.", typ="twoClick", bans="No invent logo · no real HLS", a="Open channel residual", b="Chat residual"),
    dict(y=2011, id="path", title="Path residual", when="2010–11", thesis="Intimate 50-friend residual beside Instagram launch year.", typ="twoClick", bans="No invent logo", a="Add friends residual", b="Post moment residual"),
    # 2012
    dict(y=2012, id="trello", title="Trello residual", when="2011–12 boards", thesis="Boards + cards residual — visual project Web.", typ="twoClick", bans="No real sync", a="Add card residual", b="Move list residual"),
    dict(y=2012, id="googledrive", title="Google Drive residual", when="Apr 24 2012", thesis="Files beyond Docs residual — Drive list theater.", typ="twoClick", bans="No real cloud bytes", a="Upload residual", b="Share residual"),
    dict(y=2012, id="waze", title="Waze residual", when="2012 mass / 2013 Google", thesis="Community traffic residual — 2013 Google buy is later honesty.", typ="twoClick", bans="No real GPS · not 2013 deal-as-2012", a="Report jam residual", b="Navigate residual"),
    dict(y=2012, id="lyft", title="Lyft residual", when="2012 launch (Zimride)", thesis="Pink-mustache ride residual vs UberX — no real dispatch.", typ="twoClick", bans="No real ride · no invent logo", a="Request residual", b="Rate residual"),
    # 2013
    dict(y=2013, id="slack", title="Slack residual", when="Aug 14 2013 launch", thesis="IRC for work residual — launch year; 2014 mass is next door.", typ="fillGo", bans="No real workspace tenant", go="Join residual", q="museum-hq"),
    dict(y=2013, id="tinder", title="Tinder residual", when="2012–13 mass", thesis="Swipe residual — 2013 campus/mass literacy, careful adult framing.", typ="twoClick", bans="18+ literacy · no harassment theater", a="Swipe residual", b="Match residual"),
    dict(y=2013, id="outlook", title="Outlook.com residual", when="2012–13 Hotmail successor", thesis="Hotmail → Outlook.com residual — Metro mail Web.", typ="fillGo", bans="No real Microsoft account", go="Sign in residual", q="you@outlook.com"),
    dict(y=2013, id="googlekeep", title="Google Keep residual", when="Mar 20 2013", thesis="Color notes residual — not Drive, not Evernote clone claim.", typ="fillGo", bans="No invent logo", go="Save note residual", q="buy milk"),
]

CSS = {
    1994: "mosaic-defaults.css",
}


def css_for(year: int) -> str:
    p = ROOT / f"css/period-{year}.css"
    if p.is_file():
        return f"period-{year}.css"
    return "mosaic-defaults.css"


SKIN_BY_ID = {
    "webcrawler": "search", "jumpstation": "search", "goto": "search", "classmates": "search",
    "limewire": "search", "duckduckgo": "search", "wolframalpha": "search", "googletranslate": "search",
    "aolportal": "search", "delicious": "search",
    "aim": "im", "yahoomessenger": "im", "meebo": "im", "skype": "call", "duo": "call",
    "teams": "call", "slack": "im", "outlook": "note",
    "winamp": "player", "realplayer": "player", "mp3com": "player", "itunesstoreban": "player",
    "discoverweekly": "player", "grooveshark": "player", "turntable": "player", "vevo": "player",
    "spotifyseed": "player",
    "trello": "board", "basecamp": "board", "googledrive": "board", "evernote": "note",
    "googlekeep": "note", "notion": "note", "inbox": "note", "figma": "board",
    "etsy": "shop", "boocom": "shop", "half": "shop", "webvan": "shop", "groupon": "shop",
    "venmo": "shop", "applepay": "shop", "applecard": "shop", "etrade": "shop", "kindle": "shop",
    "javaplugin": "plugin", "utorrent": "plugin", "firefoxquantum": "plugin", "ampseed": "plugin",
    "googlelens": "plugin", "assistant": "search",
    "match": "social", "tripod": "social", "angelfire": "social", "theglobe": "social",
    "pathfinder": "social", "galaxy": "social", "gnn": "social", "scripting": "social",
    "xanga": "social", "deviantart": "social", "somethingawful": "social", "livejournal": "social",
    "huffpost": "social", "formspring": "social", "path": "social", "colorapp": "social",
    "producthunt": "social", "orkutseed": "social", "imageshack": "social", "tinypic": "social",
    "youtubeembed": "player", "instagramlive": "social", "bitmoji": "social", "vsco": "social",
    "wikileaks": "social", "twitch": "player",
    "expedia": "travel", "travelocity": "travel", "kayak": "travel", "airbnb": "travel",
    "googleearth": "maps", "waze": "maps", "lyft": "maps",
    "runescape": "game", "habbo": "game", "secondlife": "game", "worldofwarcraft": "game",
    "supermariorun": "game", "nintendoswitch": "game", "stadia": "game", "applearcade": "game",
    "iphoneweb": "plugin", "airpodspro": "shop", "foursquarecheckin": "maps",
}


def skin_for(p: dict) -> str:
    if p["id"] in SKIN_BY_ID:
        return SKIN_BY_ID[p["id"]]
    if p["typ"] == "fillGo":
        return "search"
    if p["typ"] == "pickStart":
        return "shop"
    return "social"


def label(s: str) -> str:
    return re.sub(r"\s*residual\s*$", "", s or "", flags=re.I).strip() or s


def html_for(p: dict) -> str:
    year = p["y"]
    typ = p["typ"]
    css = css_for(year)
    skin = skin_for(p)
    title = label(p["title"])
    a = label(p.get("a", "Open"))
    b = label(p.get("b", "Confirm"))
    go = label(p.get("go", "Go"))
    qph = p.get("q", "type here…")
    wrap = f"ytp ytp-{skin}"
    if typ == "fillGo":
        controls = f"""<div class="ytp-bar">
 <input type="text" data-pack-q id="ott-field" placeholder="{qph}" autocomplete="off">
 <button type="button" data-pack-go>{go}</button>
</div>"""
    elif typ == "pickStart":
        picks = [x.strip() for x in p.get("picks", "A,B").split(",") if x.strip()]
        tiles = []
        for pick in picks:
            pid = re.sub(r"[^a-z0-9]+", "-", pick.lower()).strip("-")
            tiles.append(f'<button type="button" class="ytp-tile" data-pack-pick="{pid}">{pick}</button>')
        controls = '<div class="ytp-tiles">' + "".join(tiles) + '</div>\n<p><button type="button" data-pack-start>Use this</button></p>'
    elif skin == "board":
        controls = f"""<div class="ytp-cols">
 <div class="ytp-col"><b>To Do</b><div data-pack-todo></div></div>
 <div class="ytp-col"><b>Doing</b><div data-pack-doing></div></div>
</div>
<p><button type="button" data-pack-a>{a}</button> <button type="button" data-pack-b>{b}</button></p>"""
    else:
        controls = f"""<p><button type="button" data-pack-a>{a}</button> <button type="button" data-pack-b>{b}</button></p>"""
    bg = "#1b1b1b" if skin in ("player", "game", "call") else "#ffffff"
    fg = "#eee" if skin in ("player", "game", "call") else "#111"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} · {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/year-true-packs.css">
</head>
<body bgcolor="{bg}" text="{fg}" link="#00e">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="720" align="center" cellpadding="12"><tr><td data-itt-pack="{p["id"]}" data-itt-pack-type="{typ}" data-pack-skin="{skin}">
<p class="ytp-home"><a href="../../pages/home.html">← {year} home</a></p>
<div class="{wrap}">
 <div class="ytp-brand">{title}</div>
 <p style="margin:0 0 8px;opacity:.85;max-width:40em">{p["when"]} · {p["thesis"]}</p>
 {controls}
 <div class="ytp-stage" data-pack-stage>Use the product…</div>
 <p data-pack-status class="ytp-status"></p>
</div>
</td></tr></table>
<script src="../../../../js/immersion-{year}.js" defer></script>
</body>
</html>
"""


def inject_home(year: int, packs: list[dict]) -> None:
    home = ROOT / f"years/{year}/pages/home.html"
    if not home.is_file():
        return
    text = home.read_text(encoding="utf-8")
    marker = 'class="itt-year-true-pack"'
    links = " · ".join(
        f'<a href="../sites/{p["id"]}/index.html"><b>{p["title"]}</b></a>' for p in packs
    )
    block = (
        f'<p class="itt-year-true-pack" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px;border:1px dashed #666;max-width:48em">'
        f"<b>{year} year-true websites:</b> {links}</p>\n"
    )
    if marker in text:
        text = re.sub(
            r'<p class="itt-year-true-pack"[^>]*>.*?</p>\n?',
            block,
            text,
            count=1,
            flags=re.S,
        )
    else:
        text = text.replace(
            '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>',
            '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n' + block,
            1,
        )
    home.write_text(text, encoding="utf-8")


def inject_urlmap(year: int, packs: list[dict]) -> None:
    cfg = ROOT / f"js/config/{year}.js"
    if not cfg.is_file():
        return
    text = cfg.read_text(encoding="utf-8")
    entries = []
    for p in packs:
        rel = f'sites/{p["id"]}/index.html'
        if f'"{rel}"' in text:
            continue
        entries.append(f'      "{rel}": "http://museum.local/years/{year}/{p["id"]}/",')
    if not entries:
        return
    blob = "\n".join(entries) + "\n"
    m = re.search(r"urlMap\s*:\s*\{", text)
    if not m:
        return
    insert_at = m.end()
    text = text[:insert_at] + "\n" + blob + text[insert_at:]
    cfg.write_text(text, encoding="utf-8")


def patch_registry() -> None:
    path = ROOT / "js/immersion/registry.js"
    text = path.read_text(encoding="utf-8")
    needle = '"immersion/real-flow.js",\n      "immersion/year-true-packs.js"'
    if '"immersion/year-true-packs.js"' in text:
        return
    text = text.replace(
        '"immersion/real-flow.js",',
        '"immersion/real-flow.js",\n      "immersion/year-true-packs.js",',
    )
    path.write_text(text, encoding="utf-8")


def main() -> None:
    created = []
    skipped = []
    by_year: dict[int, list[dict]] = {}
    manifest = []
    for p in PACKS:
        year = int(p["y"])
        dest = ROOT / f"years/{year}/sites/{p['id']}/index.html"
        rec = {
            "year": str(year),
            "id": p["id"],
            "path": f"/years/{year}/sites/{p['id']}/index.html",
            "key": f"itt{str(year)[2:]}-{p['id']}",
            "type": p["typ"],
            "title": p["title"],
        }
        if dest.parent.is_dir() and dest.is_file() and "data-itt-pack" not in dest.read_text(encoding="utf-8", errors="ignore"):
            skipped.append(f"{year}/{p['id']} exists")
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(html_for(p), encoding="utf-8")
        created.append(f"{year}/{p['id']}")
        by_year.setdefault(year, []).append(p)
        manifest.append(rec)
    for year, packs in by_year.items():
        inject_home(year, packs)
        inject_urlmap(year, packs)
    patch_registry()
    man_path = ROOT / "js/config/year-true-packs.json"
    man_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"created {len(created)} rooms · skipped {len(skipped)}")
    for s in skipped:
        print(" skip", s)


if __name__ == "__main__":
    main()
