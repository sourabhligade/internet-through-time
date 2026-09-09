#!/usr/bin/env python3
"""Upgrade leftover-3× dests to dest-true year-matching machines. No new folders."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

import importlib.util

spec = importlib.util.spec_from_file_location("paint", ROOT / "scripts/paint-1999-2005-leftover-3x-x3.py")
paint = importlib.util.module_from_spec(spec)
spec.loader.exec_module(paint)

STAR = paint.STAR
PLAN = paint.PLAN

# Dest-true leftover-3×: verb / placeholder / keep pick / trap / year beat / product hop
# Traps are anachronisms for THAT calendar year.
DEFAULT = {
    "yahoo": ("browse a directory category", "News", "Yahoo directory leftover", "Google-as-already-#1 (trap)"),
    "google": ("type a sparse query", "nupedia", "Google sparse leftover", "Chrome-as-1999-default (trap)"),
    "amazon": ("add leftover to cart", "OK Computer", "Amazon cart leftover", "Prime-Video-as-already-here (trap)"),
    "ebay": ("place leftover bid higher than current", "beanie", "eBay bid leftover", "Buy-It-Now-as-only-path (trap)"),
    "aol": ("keyword leftover then You've Got Mail hop", "keyword", "AOL keyword leftover", "AIM-as-open-Facebook (trap)"),
    "msn": ("open a leftover channel", "Hotmail", "MSN channel leftover", "Passport-as-gold (trap)"),
    "cnn": ("open a leftover headline", "headline", "CNN headline leftover", "live-video-CDN (trap)"),
    "microsoft": ("read leftover IE / Windows note", "IE5", "Microsoft leftover", "Chrome-as-default (trap)"),
    "geocities": ("pick a neighborhood then homestead leftover", "Colossus", "GeoCities homestead leftover", "Squarespace-as-1999 (trap)"),
    "slashdot": ("open a story then moderate leftover", "story", "Slashdot leftover", "login-wall-skip (trap)"),
    "excite": ("query leftover then My Excite", "News", "Excite leftover", "Chrome-as-Excite (trap)"),
    "altavista": ("query leftover then Babel Fish hop", "query", "AltaVista leftover", "Google-as-only-search (trap)"),
    "netscape": ("open Netcenter leftover", "Netcenter", "Netscape leftover", "AOL-owns-already-forgotten (trap)"),
    "icq": ("enter leftover UIN then add contact", "UIN", "ICQ leftover", "empty-UIN-writes (trap)"),
    "napster": ("search leftover track · download theater", "Metallica", "Napster search leftover", "real-file-download (trap)"),
    "blogger": ("title leftover post then publish theater", "hello", "Blogger post leftover", "empty-post-writes (trap)"),
    "paypal": ("amount leftover then send theater", "20", "PayPal send leftover", "live-charge (trap)"),
    "y2k": ("open leftover clock then honesty", "1999-12-31", "Y2K leftover", "crash-already-happened (trap)"),
    "livejournal": ("title leftover entry then Post theater", "today", "LiveJournal entry leftover", "empty-title-writes (trap)"),
    "neopets": ("name leftover pet then Adopt theater", "Aisha", "Neopets adopt leftover", "Roblox-as-1999 (trap)"),
    "egroups": ("name leftover list then Join theater", "vintage-computers", "eGroups join leftover", "Yahoo-Groups-rename-as-already (trap)"),
    "theonion": ("open leftover headline then read", "headline", "Onion leftover", "live-CDN (trap)"),
    "drkoop": ("query leftover symptom then article", "flu", "drkoop leftover", "WebMD-as-only (trap)"),
    "sixdegrees": ("name leftover person then connect", "classmate", "sixdegrees leftover", "Facebook-as-1999 (trap)"),
    "etrade": ("quote leftover ticker then paper trade", "YHOO", "E*TRADE leftover", "live-order (trap)"),
    "hampsterdance": ("play leftover loop then more hamsters", "the hamsters", "Hampster Dance leftover", "YouTube-as-1999 (trap)"),
    "webvan": ("zip leftover then grocery slot", "94107", "Webvan leftover", "Amazon-Fresh-as-1999 (trap)"),
    "yahoomessenger": ("ID leftover then send theater", "screenname", "Yahoo Messenger leftover", "empty-ID-writes (trap)"),
    "askjeeves": ("ask leftover question", "what is Y2K", "Ask Jeeves leftover", "Bard-as-Jeeves (trap)"),
    "half": ("name leftover used CD then Buy used theater", "OK Computer", "Half.com leftover", "eBay-already-owns (trap)"),
    "limewire": ("query leftover track then download theater", "track", "LimeWire leftover", "real-file (trap)"),
    "travelocity": ("from+to leftover then find", "SFO", "Travelocity leftover", "Expedia-as-same (trap)"),
    "expedia": ("from+to leftover then fares", "SFO", "Expedia leftover", "empty-city-writes (trap)"),
    "ivillage": ("pick leftover channel then join", "parenting", "iVillage leftover", "empty-channel (trap)"),
    "metafilter": ("open leftover FPP then favorite", "FPP", "MetaFilter leftover", "login-wall (trap)"),
    "napsterweb": ("search leftover web client then theater", "track", "Napster web leftover", "real-file (trap)"),
    "pets": ("sock-puppet leftover shop then cart theater", "sock", "Pets.com leftover", "Amazon-as-Pets (trap)"),
    "gnutella": ("query leftover then peer theater", "query", "Gnutella leftover", "real-file (trap)"),
    "homestar": ("pick leftover toon then play", "Strong Bad", "Homestar leftover", "YouTube-as-Homestar (trap)"),
    "kottke": ("open leftover post then blogroll hop", "post", "kottke leftover", "empty (trap)"),
    "wikipedia": ("search leftover then preview leftover", "nupedia", "Wikipedia leftover", "preview-as-Save / millionth-2006 (trap)"),
    "moveon": ("name leftover petition then sign theater", "petition", "MoveOn leftover", "live-petition (trap)"),
    "grok": ("query leftover Grokster then download theater", "track", "Grokster leftover", "real-file (trap)"),
    "appleimac": ("pick leftover color then brochure", "indigo", "iMac leftover", "iPod-as-this-room (trap)"),
    "encarta": ("look up leftover article", "encyclopedia", "Encarta leftover", "wiki-millionth (trap)"),
    "dmoz": ("browse leftover category", "Computers", "dmoz leftover", "Google-Directory-as-gold (trap)"),
    "mozilla": ("download leftover milestone then notes", "Mozilla 1.0", "Mozilla leftover", "Firefox-1.0-as-2001 (trap)"),
    "daypop": ("name leftover link then Hot", "trackback", "Daypop leftover", "Twitter-as-Daypop (trap)"),
    "googlenews": ("type leftover topic then cluster", "broadband", "Google News leftover", "blogs-in-News (trap)"),
    "technorati": ("name leftover blog then cosmos", "plasticbag", "Technorati leftover", "empty (trap)"),
    "fark": ("open leftover tag then comment theater", "tag", "Fark leftover", "login-wall (trap)"),
    "blogspot": ("open leftover blog then next", "blog", "Blogspot leftover", "empty (trap)"),
    "lastfm": ("scrobble leftover then station", "track", "Last.fm leftover", "Spotify-as-2002 (trap)"),
    "netflix": ("queue leftover DVD then envelope theater", "title", "Netflix leftover", "streaming-as-2002-default (trap)"),
    "mtv": ("open leftover clip", "video", "MTV leftover", "YouTube-as-MTV (trap)"),
    "skype": ("name leftover contact then call theater", "contact", "Skype leftover", "eBay-owns-as-2003 / Teams (trap)"),
    "delicious": ("tag leftover bookmark then save", "web2", "del.icio.us leftover", "empty-tag-writes (trap)"),
    "hi5": ("name leftover profile then add", "profile", "hi5 leftover", "empty (trap)"),
    "flash": ("open leftover FWA site then skip intro", "skip intro", "Flash leftover", "HTML5-as-2003 (trap)"),
    "phoenix": ("download leftover Firebird", "Firebird", "Phoenix leftover", "Firefox-1.0-as-2002 (trap)"),
    "4chan": ("open leftover board then thread", "/b/", "4chan leftover", "empty (trap)"),
    "firebird": ("download leftover Firebird", "Firebird 0.7", "Firebird leftover", "Firefox-1.0-as-2003 (trap)"),
    "kazaa": ("query leftover then download theater", "track", "KaZaA leftover", "real-file (trap)"),
    "wired": ("open leftover Oct CSS redesign", "CSS", "Wired leftover", "paywall-skip (trap)"),
    "friendster": ("name leftover friend then add", "friend", "Friendster leftover", "Facebook-as-already (trap)"),
    "myspace": ("leftover Top 8 then comment", "Top 8", "MySpace leftover", "thefacebook-as-mass / News-Feed (trap)"),
    "wordpress": ("leftover dashboard post then publish theater", "hello world", "WordPress leftover", "empty-post (trap)"),
    "linkedin": ("leftover invite then accept", "invite", "LinkedIn leftover", "empty-invite (trap)"),
    "itunes": ("browse leftover library / 99¢ / podcasts", "podcast", "iTunes leftover", "App-Store (trap)"),
    "orkut": ("join leftover scrap then community", "scrap", "Orkut leftover", "open-Facebook (trap)"),
    "craigslist": ("city leftover then post leftover", "sfbay", "craigslist leftover", "Street-View-on-CL (trap)"),
    "wow": ("create leftover toon then realm", "toon", "WoW leftover", "Wrath-shop (trap)"),
    "bbc": ("open leftover headline", "headline", "BBC leftover", "live-CDN (trap)"),
    "imdb": ("search leftover title", "title", "IMDb leftover", "empty (trap)"),
    "bloglines": ("subscribe leftover feed", "feed", "Bloglines leftover", "Reader-as-Bloglines-gold (trap)"),
    "facebook": ("join leftover gated network then poke leftover", "Harvard", "thefacebook leftover", "open-Facebook / News-Feed / Like (trap)"),
    "gmail": ("request leftover invite then 1GB pitch", "invite", "Gmail invite leftover", "open-Gmail-as-gold (trap)"),
    "firefox": ("download leftover 1.0/1.5 then tab honesty", "Firefox 1.0", "Firefox leftover", "Chrome-as-default (trap)"),
    "flickr": ("upload leftover / tag leftover", "photostream", "Flickr leftover", "Instagram (trap)"),
    "digg": ("bury leftover story then honesty", "story", "Digg leftover", "Digg-as-star (trap)"),
    "web20conference": ("open leftover agenda then sold-out wall", "agenda", "Web 2.0 Conf leftover", "empty (trap)"),
    "milliondollar": ("pick leftover pixel then buy theater", "pixel", "Million Dollar Homepage leftover", "live-payment (trap)"),
    "clubpenguin": ("name leftover penguin then waddle", "penguin", "Club Penguin leftover", "Roblox-as-2005 (trap)"),
    "kayak": ("SFO leftover then fares", "SFO", "Kayak leftover", "empty (trap)"),
    "vimeo": ("watch leftover then upload theater", "clip", "Vimeo leftover", "YouTube-as-this-room (trap)"),
    "dailymotion": ("watch leftover then upload theater", "clip", "DailyMotion leftover", "Google-owns-DM (trap)"),
    "googlevideo": ("search leftover then watch", "video", "Google Video leftover", "YouTube-owned (trap)"),
    "earth": ("spin leftover globe then fly", "Keyhole", "Google Earth leftover", "Street-View (trap)"),
    "maps": ("leftover drag · no Street View", "hotels near LAX", "Maps leftover", "Street-View (trap)"),
    "reddit": ("leftover boost", "boost", "Reddit leftover", "Reddit-as-star (trap)"),
    "youtube": ("leftover watch · never upload star", "Me at the zoo", "YouTube watch leftover", "Google-owns-YouTube / upload-as-leftover (trap)"),
    "pandora": ("leftover station", "station", "Pandora leftover", "Pandora-as-star (trap)"),
    "housingmaps": ("leftover mashup pin", "craigslist", "HousingMaps leftover", "Maps-API-as-already (trap)"),
    "techcrunch": ("open leftover first-post era", "Arrington", "TechCrunch leftover", "TC-as-star (trap)"),
    "reader": ("subscribe leftover then unread", "feed", "Reader leftover", "empty-feed (trap)"),
    "secondlife": ("name leftover avi then teleport theater", "avi", "Second Life leftover", "empty (trap)"),
}

BEAT = {
    "1999": "1999 leftover. AOL is still #1 visits. AIM is the chip. No Chrome. No Facebook.",
    "2000": "2000 leftover. Yahoo is passing AOL. MapQuest is the chip. Crash is culture. No Wikipedia.",
    "2001": "2001 leftover. Wikipedia edit is the chip. Preview is not Save. No iTunes Store. No Facebook.",
    "2002": "2002 leftover. StumbleUpon is the chip. Broadband is minority. No MySpace mass. No YouTube.",
    "2003": "2003 leftover. Photobucket is the chip. iTunes Store is 99¢. No thefacebook. No Chrome.",
    "2004": "2004 leftover. thefacebook is campus-only. Yahoo still #1. No YouTube. No open Facebook.",
    "2005": "2005 leftover. YouTube upload is the chip. Google does not own YouTube. No Twitter. No Street View. No iPhone.",
}

HOP = {
    ("1999", "napster"): "search.html",
    ("1999", "blogger"): "edit.html",
    ("1999", "paypal"): "send.html",
    ("1999", "ebay"): "item-laptop.html",
    ("1999", "amazon"): "cart.html",
    ("1999", "altavista"): "search.html",
    ("1999", "askjeeves"): "ask.html",
    ("2000", "napster"): "search.html",
    ("2000", "ebay"): "item-laptop.html",
    ("2000", "amazon"): "cart.html",
    ("2000", "paypal"): "send.html",
    ("2001", "wikipedia"): "edit.html",
    ("2001", "itunes"): "index.html",
    ("2001", "napster"): "index.html",
    ("2002", "friendster"): "index.html",
    ("2003", "myspace"): "index.html",
    ("2003", "wordpress"): "dashboard.html",
    ("2003", "itunes"): "index.html",
    ("2004", "gmail"): "invite.html",
    ("2004", "facebook"): "networks.html",
    ("2004", "flickr"): "index.html",
    ("2004", "firefox"): "index.html",
    ("2005", "gmail"): "invite.html",
    ("2005", "youtube"): "watch.html",
    ("2005", "flickr"): "index.html",
    ("2005", "maps"): "index.html",
}


def truth(slug: str) -> tuple[str, str, str, str]:
    return DEFAULT.get(slug, ("open leftover dest then dest-true verb", "leftover", f"{slug} leftover", "anachronism (trap)"))


def more_href(year: str, slug: str) -> str | None:
    hop = HOP.get((year, slug))
    if hop:
        p = ROOT / f"years/{year}/sites/{slug}/{hop}"
        if p.is_file() and hop != "index.html":
            return hop
    more = ROOT / f"years/{year}/sites/{slug}/more.html"
    if more.is_file():
        return "more.html"
    return None


def real_panel(year: str, slug: str, name: str, kind: str, nxt: tuple[str, str] | None) -> str:
    star = STAR[year]
    verb, ph, keep, trap = truth(slug)
    beat = BEAT[year]
    if kind == "third":
        storage = f"itt{year[2:]}-pop3-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop3-{slug}"'
        mark = "ITT-POP3X-THIRD"
    elif kind == "second":
        storage = f"itt{year[2:]}-pop2-{slug}"
        go = f'data-pop-go data-pop-id="{slug}" data-pop-key="pop2-{slug}"'
        mark = "ITT-POP3X-SECOND"
    else:
        storage = f"itt{year[2:]}-pop-{slug}"
        go = f'data-pop-go data-pop-id="{slug}"'
        mark = "ITT-POP3X-FIRST"
    miss = more_href(year, slug)
    miss_html = ""
    if miss:
        miss_html = (
            f'<p class="itt-lo3x-miss"><b>M2 miss / wall:</b> '
            f'<a href="{miss}" data-itt-lo3x-miss="1">in-year miss / more · never writes leftover-3×</a></p>'
        )
    next_html = ""
    if nxt:
        next_html = (
            f'<p hidden data-next-flow data-next-when-key="{storage}">'
            f'<b>Next:</b> <a href="../{nxt[0]}/index.html">{nxt[1]}</a></p>'
        )
    return f"""<!-- {mark}:{slug}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="{year}" data-itt-lo3x-verb="{verb}" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{name}</b> · leftover 3× · {year}-true · {star} is the chip · incomplete never writes · <code>{storage}</code></p>
<p data-itt-year-copy>{beat}</p>
<p><b>M3:</b> {verb}. Empty / trap never writes.</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{ph}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{ph}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {beat}</label>
{miss_html}
<p><button type="button" {go}>{keep}</button> <span data-pop-status></span></p>
{next_html}
</div>
<!-- {mark}:{slug}:end -->
"""


def replace_or_insert(path: Path, year: str, slug: str, name: str, kind: str, nxt: tuple[str, str] | None) -> str:
    if not path.is_file():
        return "missing"
    html = path.read_text(encoding="utf-8", errors="replace")
    mark = {"first": "ITT-POP3X-FIRST", "second": "ITT-POP3X-SECOND", "third": "ITT-POP3X-THIRD"}[kind]
    block = real_panel(year, slug, name, kind, nxt)
    pat = rf"<!-- {mark}:{slug}:start -->.*?<!-- {mark}:{slug}:end -->"
    if re.search(pat, html, re.S):
        html = re.sub(pat, block.strip(), html, count=1, flags=re.S)
        path.write_text(html, encoding="utf-8")
        return "replaced"
    if re.search(r"</body>", html, re.I):
        html = re.sub(r"</body>", block + "\n</body>", html, count=1, flags=re.I)
    else:
        html += "\n" + block
    path.write_text(html, encoding="utf-8")
    return "inserted"


def write_matrix() -> None:
    rows = []
    for year, plan in PLAN.items():
        for kind in ("first", "second", "third"):
            items = plan[kind]
            for i, (slug, name) in enumerate(items):
                verb, ph, keep, trap = truth(slug)
                nxt = items[(i + 1) % len(items)]
                key = {
                    "first": f"itt{year[2:]}-pop-{slug}",
                    "second": f"itt{year[2:]}-pop2-{slug}",
                    "third": f"itt{year[2:]}-pop3-{slug}",
                }[kind]
                rows.append(
                    {
                        "year": year,
                        "kind": kind,
                        "id": slug,
                        "name": name,
                        "key": key,
                        "star": {
                            "1999": "itt99-aim",
                            "2000": "itt00-mapquest",
                            "2001": "itt01-wiki",
                            "2002": "itt02-stumble",
                            "2003": "itt03-photobucket",
                            "2004": "itt04-thefacebook-networks",
                            "2005": "itt05-yt-uploads",
                        }[year],
                        "verb": verb,
                        "ph": ph,
                        "keep": keep,
                        "trap": trap,
                        "beat": BEAT[year],
                        "miss": more_href(year, slug),
                        "nextId": nxt[0],
                        "href": f"/years/{year}/sites/{slug}/index.html",
                    }
                )
    out = ROOT / "e2e/1999-2005-leftover-3x.matrix.json"
    out.write_text(json.dumps(rows, indent=2) + "\n")
    print("matrix", len(rows), out)


def upgrade_json_verbs() -> None:
    p3 = json.loads((ROOT / "scripts/popular-3x-sites.json").read_text())
    p33 = json.loads((ROOT / "scripts/popular-3x3-sites.json").read_text())
    for year, plan in PLAN.items():
        for blob, kind in ((p3, "first"), (p33, "third")):
            rows = []
            for slug, name in plan[kind]:
                verb, ph, keep, _trap = truth(slug)
                rows.append(
                    {
                        "id": slug,
                        "name": name.replace(" leftover", ""),
                        "title": f"{name} — {year}",
                        "why": BEAT[year],
                        "verb": verb,
                        "ph": ph,
                        "btn": keep,
                        "bg": "#111",
                        "fg": "#fff",
                    }
                )
            blob[year] = rows
    (ROOT / "scripts/popular-3x-sites.json").write_text(json.dumps(p3, indent=2) + "\n")
    (ROOT / "scripts/popular-3x3-sites.json").write_text(json.dumps(p33, indent=2) + "\n")


def main() -> None:
    counts = {"replaced": 0, "inserted": 0, "missing": 0}
    for year, plan in PLAN.items():
        for kind in ("first", "second", "third"):
            items = plan[kind]
            for i, (slug, name) in enumerate(items):
                nxt = items[(i + 1) % len(items)]
                path = ROOT / f"years/{year}/sites/{slug}/index.html"
                st = replace_or_insert(path, year, slug, name, kind, nxt)
                counts[st] = counts.get(st, 0) + 1
                print(st, year, kind, slug)
    write_matrix()
    upgrade_json_verbs()
    print(counts)


if __name__ == "__main__":
    main()
