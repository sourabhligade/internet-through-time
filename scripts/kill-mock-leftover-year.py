#!/usr/bin/env python3
"""Convert leftover 4× mock plaques to dest-true leftover-official.

Usage: python3 scripts/kill-mock-leftover-year.py 2004 2008 2010
Does not touch gold dests. Incomplete never writes. No dest-field.
"""
from __future__ import annotations

import html as htmlmod
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

ITT4X = re.compile(
    r"\n?<!-- ITT-4X:([^:]+):start -->(.*?)<!-- ITT-4X:\1:end -->\s*",
    re.S,
)

GOLD = {
    "1994": ("csotd/index.html",),
    "1995": ("amazon/ssl-checkout.html",),
    "1996": ("portals/wars.html",),
    "1997": ("pointcast/index.html",),
    "1998": ("google/lucky.html",),
    "1999": ("aim/index.html",),
    "2004": ("facebook/index.html", "facebook/networks.html"),
    "2005": ("youtube/upload.html",),
    "2006": ("twitter/index.html",),
    "2008": ("appstore/index.html", "chrome/index.html"),
    "2010": ("instagram/index.html",),
    "2012": ("instagram/android.html",),
    "2013": ("vine/record.html",),
    "2014": ("whatsapp/index.html",),
    "2015": ("periscope/index.html",),
    "2016": ("instagram/stories.html",),
    "2017": ("iphone/x.html",),
    "2018": ("gdpr/index.html",),
    "2019": ("disneyplus/home.html",),
}

DEST = {
    "csotd": ("Cool Site leftover. Not the guestbook chip.", ("visit", "Visit leftover cool"), ("sign", "Sign leftover guestbook"), "This leftover is the 1994 star (trap)", "cool leftover", "Sign leftover cool"),
    "cern": ("WWW origin leftover. Not the 1994 star.", ("line", "Line leftover"), ("next", "Next leftover"), "This leftover is the 1994 star (trap)", "www leftover", "Open leftover WWW"),
    "fishcam": ("Fish Cam leftover. Not the 1994 star.", ("frame", "Frame leftover"), ("reload", "Reload leftover"), "This leftover is the 1994 star (trap)", "fish leftover", "Open leftover cam"),
    "whitehouse": ("White House leftover. Not the 1994 star.", ("map", "Map leftover"), ("mail", "Mail leftover"), "This leftover is the 1994 star (trap)", "whitehouse leftover", "Open leftover map"),
    "nasa": ("NASA leftover. Not the 1994 star.", ("center", "Center leftover"), ("shuttle", "Shuttle leftover"), "This leftover is the 1994 star (trap)", "nasa leftover", "Open leftover NASA"),
    "iuma": ("IUMA leftover. MP2 helper theater. Not a real file.", ("listen", "Listen leftover"), ("band", "Band leftover"), "This leftover is the 1994 star (trap)", "listen leftover", "Listen leftover IUMA"),
    "hotwired": ("HotWired leftover. Not the 1994 star.", ("issue", "Issue leftover"), ("banner", "Banner leftover"), "This leftover is the 1994 star (trap)", "hotwired leftover", "Open leftover HotWired"),
    "lycos": ("Lycos leftover catalog. Not the 1994 star.", ("q", "Search leftover"), ("catalog", "Catalog leftover"), "This leftover is the 1994 star (trap)", "lycos leftover", "Search leftover Lycos"),
    "ncsa": ("NCSA Mosaic leftover. Not the 1994 star.", ("mosaic", "Mosaic leftover"), ("whatsnew", "What's New leftover"), "This leftover is the 1994 star (trap)", "mosaic leftover", "Open leftover Mosaic"),
    "auctionweb": ("AuctionWeb leftover. Not eBay 1997 gold.", ("bid", "Place leftover bid"), ("watch", "Watch leftover item"), "This is eBay 1997 (trap)", "bid leftover", "Place leftover bid"),
    "geocities": ("GeoCities leftover. Not the year star.", ("homestead", "Homestead leftover"), ("neighborhood", "Neighborhood leftover"), "This leftover is the year star (trap)", "homestead leftover", "Claim leftover homestead"),
    "altavista": ("AltaVista leftover. Not the year star.", ("q", "Search leftover"), ("babel", "Babel leftover"), "This leftover is the year star (trap)", "query leftover", "Search leftover AltaVista"),
    "classmates": ("Classmates leftover. Not the 1995 star.", ("school", "School leftover"), ("year", "Year leftover"), "This leftover is the 1995 star (trap)", "class leftover", "Find leftover classmates"),
    "hotmail": ("HoTMaiL leftover. Free web mail. Not the year star.", ("user", "User leftover"), ("inbox", "Inbox leftover"), "This leftover is the year star (trap)", "hotmail leftover", "Open leftover HoTMaiL"),
    "spacejam": ("Space Jam leftover. Planets stay. Not a leftover warehouse.", ("planet", "Planet leftover"), ("jam", "Jam leftover"), "Wrap Space Jam as leftover warehouse (trap)", "planet leftover", "Click leftover planet"),
    "portals": ("Portal leftover. Not portal-wars gold.", ("yahoo", "Yahoo leftover"), ("excite", "Excite leftover"), "This leftover is portal wars gold (trap)", "portal leftover", "Open leftover portal"),
    "pointcast": ("PointCast leftover. Not the push chip.", ("news", "News leftover"), ("weather", "Weather leftover"), "This leftover is the 1997 star (trap)", "push leftover", "Subscribe leftover channel"),
    "icq": ("ICQ leftover. UIN theater. Not the 1997 star.", ("uin", "UIN leftover"), ("msg", "Message leftover"), "This leftover is the 1997 star (trap)", "uin leftover", "Sign leftover ICQ"),
    "aim": ("AIM leftover. Not the 1999 sign-on chip.", ("sn", "Screen name leftover"), ("buddy", "Buddy leftover"), "This leftover is the 1999 star (trap)", "screen name leftover", "Sign leftover AIM"),
    "slashdot": ("Slashdot leftover. Not the year star.", ("story", "Story leftover"), ("comment", "Comment leftover"), "This leftover is the year star (trap)", "slashdot leftover", "Open leftover story"),
    "drudge": ("Drudge leftover. Not the 1997 star.", ("link", "Link leftover"), ("siren", "Siren leftover"), "This leftover is the 1997 star (trap)", "drudge leftover", "Open leftover Drudge"),
    "hotbot": ("HotBot leftover. Not the year star.", ("q", "Search leftover"), ("inktomi", "Inktomi leftover"), "This leftover is the year star (trap)", "hotbot leftover", "Search leftover HotBot"),
    "cdnow": ("CDnow leftover. Not the 1998 star.", ("cd", "CD leftover"), ("cart", "Cart leftover"), "This leftover is the 1998 star (trap)", "cd leftover", "Buy leftover CD"),
    "mozilla": ("Mozilla.org leftover. Not the 1998 star.", ("src", "Source leftover"), ("bug", "Bug leftover"), "This leftover is the 1998 star (trap)", "mozilla leftover", "Open leftover Mozilla"),
    "dmoz": ("DMOZ leftover. Not the 1998 star.", ("cat", "Category leftover"), ("edit", "Edit leftover"), "This leftover is the 1998 star (trap)", "dmoz leftover", "Open leftover DMOZ"),
    "napster": ("Napster leftover. Search theater. No real file.", ("search", "Search leftover track"), ("lib", "Library leftover"), "Download a real file (trap)", "track leftover", "Search leftover Napster"),
    "blogger": ("Blogger leftover. Not the 1999 star.", ("post", "Post leftover"), ("edit", "Edit leftover"), "This leftover is the 1999 star (trap)", "blog leftover", "Publish leftover post"),
    "y2k": ("Y2K leftover. Not the 1999 star.", ("clock", "Clock leftover"), ("ack", "Ack leftover"), "This leftover is the 1999 star (trap)", "y2k leftover", "Ack leftover Y2K"),
    "sourceforge": ("SourceForge leftover. Not the 1999 star.", ("proj", "Project leftover"), ("cvs", "CVS leftover"), "This leftover is the 1999 star (trap)", "sf leftover", "Open leftover project"),
    "paypal": ("PayPal leftover. Theater send. Not live money.", ("send", "Send leftover"), ("email", "Email leftover"), "Send real money (trap)", "paypal leftover", "Send leftover PayPal"),
    "askjeeves": ("Ask Jeeves leftover. Not the 1999 star.", ("ask", "Ask leftover"), ("jeeves", "Jeeves leftover"), "This leftover is the 1999 star (trap)", "ask leftover", "Ask leftover Jeeves"),
    "amazon": ("Earth's Biggest leftover catalog. Not 1-Click gold.", ("cart", "Add leftover cart"), ("buy", "Buy leftover now"), "This is 1-Click gold (trap)", "title leftover", "Search leftover catalog"),
    "ebay": ("Auction leftover. Bid leftover. Not PayPal gold.", ("bid", "Place leftover bid"), ("watch", "Watch leftover item"), "This is PayPal gold (trap)", "bid leftover", "Place leftover bid"),
    "orkut": ("Google social leftover. Invite-driven. Not campus gold.", ("scrap", "Leave leftover scrap"), ("community", "Join leftover community"), "Open Facebook (trap)", "scrap leftover", "Leave leftover scrap"),
    "tinypic": ("Forum leftover image host. Not Flickr gold.", ("upload", "Upload leftover pic"), ("url", "Copy leftover URL"), "This is Flickr gold (trap)", "forum leftover", "Host leftover pic"),
    "flickr": ("Yahoo-owned leftover. Not Yahoo Photos.", ("photo", "Title leftover photo"), ("tag", "Tag leftover photo"), "This is Yahoo Photos (trap)", "tag leftover", "Title leftover photo"),
    "youtube": ("Video leftover. Not the year star.", ("watch", "Watch leftover"), ("share", "Share leftover"), "This leftover is the year star (trap)", "title leftover", "Watch leftover clip"),
    "gmail": ("Invite leftover. Not the year star.", ("invite", "Send leftover invite"), ("beta", "Still invite-only leftover"), "This leftover is the year star (trap)", "invite leftover", "Send leftover invite"),
    "google": ("Search leftover.", ("q", "Search leftover"), ("lucky", "I'm Feeling Lucky leftover"), "This leftover is the year star (trap)", "query leftover", "Search leftover"),
    "yahoo": ("Portal leftover.", ("dir", "Directory leftover"), ("mail", "Mail leftover"), "This leftover is the year star (trap)", "yahoo leftover", "Search leftover Yahoo"),
    "maps": ("Maps leftover. Street View is 2007.", ("drag", "Drag leftover"), ("hotels", "Hotels leftover"), "Open Street View (trap)", "hotels leftover", "Search leftover map"),
    "facebook": ("Facebook leftover. Not the year star.", ("feed", "Feed leftover"), ("poke", "Poke leftover"), "This leftover is the year star (trap)", "feed leftover", "Open leftover feed"),
    "twitter": ("140 leftover. Not the gold Update.", ("140", "140 leftover"), ("sms", "SMS leftover"), "This leftover is the year star (trap)", "What are you doing?", "Save leftover 140"),
    "instagram": ("Filter leftover. Not the year star.", ("filter", "Filter leftover"), ("share", "Share leftover"), "This leftover is the year star (trap)", "filter leftover", "Share leftover photo"),
    "chrome": ("Chrome leftover. Not the year star.", ("tab", "Tab leftover"), ("omnibox", "Omnibox leftover"), "This leftover is the year star (trap)", "tab leftover", "Open leftover tab"),
    "appstore": ("App leftover. Not the year star.", ("browse", "Browse leftover"), ("get", "Get leftover app"), "This leftover is the year star (trap)", "app leftover", "Get leftover app"),
    "ipad": ("iPad leftover. Website, bigger.", ("safari", "Safari leftover"), ("app", "App leftover"), "This leftover is the year star (trap)", "ipad leftover", "Open leftover iPad"),
    "vine": ("6s leftover. Not the year star.", ("loop", "Loop leftover 6s"), ("revine", "Revine leftover"), "This leftover is the year star (trap)", "6s leftover", "Save leftover 6s"),
    "periscope": ("Live leftover. Not Go LIVE gold.", ("live", "Watch leftover live"), ("heart", "Heart leftover"), "This leftover is the year star (trap)", "live leftover", "Open leftover live"),
    "snapchat": ("Snap leftover. Stories 24h is a later machine.", ("snap", "Send leftover snap"), ("story", "Story leftover"), "This leftover is the year star (trap)", "snap leftover", "Send leftover snap"),
    "pinterest": ("Pin leftover. Not the year star.", ("pin", "Pin leftover"), ("board", "Board leftover"), "This leftover is the year star (trap)", "pin leftover", "Save leftover pin"),
    "slack": ("Email-bankruptcy leftover. Not the year star.", ("channel", "Channel leftover"), ("invite", "Invite leftover"), "This leftover is the year star (trap)", "slack leftover", "Open leftover channel"),
    "twitch": ("Stream leftover. Not the year star.", ("watch", "Watch leftover stream"), ("follow", "Follow leftover"), "This leftover is the year star (trap)", "stream leftover", "Watch leftover stream"),
    "whatsapp": ("Chat leftover. Not the $19B install.", ("chat", "Chat leftover"), ("status", "Status leftover"), "This leftover is the year star (trap)", "chat leftover", "Open leftover chat"),
    "gdpr": ("Banner leftover. Accept All never writes Manage.", ("reject", "Reject leftover"), ("manage", "Manage leftover"), "Accept All (trap)", "gdpr leftover", "Save leftover manage"),
    "disneyplus": ("Who's watching leftover. 7-day trial is trap.", ("profile", "Profile leftover"), ("continue", "Continue leftover"), "Start 7-day trial (trap)", "profile leftover", "Continue leftover"),
    "tiktok": ("For You leftover. Not the year star.", ("fyp", "For You leftover"), ("sound", "Sound leftover"), "This leftover is the year star (trap)", "fyp leftover", "Open leftover For You"),
    "fortnite": ("Battle bus leftover. Not the year star.", ("drop", "Drop leftover"), ("build", "Build leftover"), "This leftover is the year star (trap)", "bus leftover", "Drop leftover"),
    "tinder": ("Swipe leftover. Not the year star.", ("right", "Swipe leftover right"), ("left", "Swipe leftover left"), "This leftover is the year star (trap)", "swipe leftover", "Swipe leftover"),
    "medium": ("Read leftover. Not the year star.", ("read", "Read leftover"), ("write", "Write leftover"), "This leftover is the year star (trap)", "read leftover", "Read leftover"),
    "heartbleed": ("TLS leftover literacy. No exploit.", ("rotate", "Rotate leftover cert"), ("patch", "Patch leftover"), "Run the exploit (trap)", "rotate leftover", "Rotate leftover cert"),
    "snowden": ("Ack leftover. Not the year star.", ("ack", "Ack leftover"), ("read", "Read leftover"), "This leftover is the year star (trap)", "ack leftover", "Ack leftover"),
    "telegram": ("Secret-chat leftover. Not the year star.", ("chat", "Chat leftover"), ("secret", "Secret leftover"), "This leftover is the year star (trap)", "chat leftover", "Open leftover chat"),
    "discord": ("Server leftover. Not the year star.", ("join", "Join leftover server"), ("voice", "Voice leftover"), "This leftover is the year star (trap)", "server leftover", "Join leftover server"),
    "stadia": ("Founders leftover. Not the year star.", ("play", "Play leftover"), ("founders", "Founders leftover"), "This leftover is the year star (trap)", "stadia leftover", "Play leftover"),
    "arcade": ("$4.99 leftover. Not Disney+ Continue.", ("play", "Play leftover"), ("catalog", "Catalog leftover"), "This leftover is the year star (trap)", "arcade leftover", "Play leftover"),
    "wannacry": ("Patch leftover literacy. No sample.", ("patch", "Patch leftover"), ("kill", "Kill-switch leftover"), "Open the sample (trap)", "patch leftover", "Patch leftover"),
    "spectre": ("Patch leftover literacy. No exploit.", ("patch", "Patch leftover"), ("isolate", "Isolate leftover"), "Open the exploit (trap)", "patch leftover", "Patch leftover"),
}


def dest_slug(path: Path) -> str:
    parts = path.parts
    try:
        i = parts.index("sites")
        return parts[i + 1]
    except (ValueError, IndexError):
        return path.parent.name


def dest_true(slug: str, page: str, year: str) -> tuple[str, tuple[str, str], tuple[str, str], str, str, str]:
    if slug in DEST:
        return DEST[slug]
    name = slug.replace("-", " ")
    page_bit = page.replace(".html", "").replace("-", " ")
    if page_bit and page_bit not in ("index", "about"):
        name = f"{name} {page_bit}"
    return (
        f"{name} leftover. Incomplete never writes. Not the year star.",
        ("a", f"{name} leftover"),
        ("b", f"{name} leftover path"),
        f"This leftover is the {year} star (trap)",
        f"{name} leftover",
        f"Save leftover {name}",
    )


def parse_next(body: str) -> tuple[str, str]:
    m = re.search(
        r'data-next-when-key="[^"]*"[^>]*>\s*<b>Next:</b>\s*<a href="([^"]+)">([^<]+)</a>',
        body,
    )
    if m:
        return m.group(1), htmlmod.unescape(m.group(2).strip())
    m2 = re.search(r'<a href="([^"]+)">([^<]+)</a>', body)
    if m2:
        return m2.group(1), htmlmod.unescape(m2.group(2).strip())
    return "../../pages/home.html", "Starting Point"


def hops_html(year: str, pref: str, key: str, title: str, hop_a: tuple[str, str], hop_b: tuple[str, str], trap: str, nxt: str, nl: str) -> str:
    return f"""<div data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">{year} leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{htmlmod.escape(trap)}</button></p>
<p>
 <button type="button" data-lo-pick="{htmlmod.escape(hop_a[0])}">{htmlmod.escape(hop_a[1])}</button>
 <button type="button" data-lo-pick="{htmlmod.escape(hop_b[0])}">{htmlmod.escape(hop_b[1])}</button>
</p>
<p><label><input type="checkbox" data-lo-req> Leftover {year} · not the year star.</label></p>
<p><label><input type="checkbox" data-lo-req> 0 hops / 1 hop / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{htmlmod.escape(key)}" data-lo-min-pick="2">{htmlmod.escape(title)}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="{pref}-{htmlmod.escape(key)}"><b>Next:</b> <a href="{htmlmod.escape(nxt)}">{htmlmod.escape(nl)}</a></p>
</div>
"""


def query_html(year: str, pref: str, key: str, title: str, life: str, field: str, trap: str, nxt: str, nl: str) -> str:
    return f"""<div data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">{year} leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{htmlmod.escape(trap)}</button></p>
<p><label>{htmlmod.escape(life)}<br><input type="text" data-lo-field maxlength="80" placeholder="{htmlmod.escape(field)}" autocomplete="off"></label></p>
<p><label><input type="checkbox" data-lo-req> Leftover {year} · not the year star.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{htmlmod.escape(key)}">{htmlmod.escape(title)}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="{pref}-{htmlmod.escape(key)}"><b>Next:</b> <a href="{htmlmod.escape(nxt)}">{htmlmod.escape(nl)}</a></p>
</div>
"""


def checks_html(year: str, pref: str, key: str, title: str, tick_a: str, tick_b: str, trap: str, nxt: str, nl: str) -> str:
    return f"""<div data-lo-panel="1" data-itt-year="{year}" class="itt-{year}-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">{year} leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{htmlmod.escape(trap)}</button></p>
<p><label><input type="checkbox" data-lo-req> {htmlmod.escape(tick_a)}</label></p>
<p><label><input type="checkbox" data-lo-req> {htmlmod.escape(tick_b)}</label></p>
<p><button type="button" data-lo-save data-lo-key="{htmlmod.escape(key)}">{htmlmod.escape(title)}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="{pref}-{htmlmod.escape(key)}"><b>Next:</b> <a href="{htmlmod.escape(nxt)}">{htmlmod.escape(nl)}</a></p>
</div>
"""


def machine_from_4x(path: Path, year: str, pref: str, key: str, body: str) -> str:
    slug = dest_slug(path)
    life, hop_a, hop_b, trap, field, verb = dest_true(slug, path.name, year)
    nxt, nl = parse_next(body)
    kind = "query"
    km = re.search(r'data-4x-kind="([^"]+)"', body)
    if km:
        kind = km.group(1)
    hops = re.findall(r'data-4x-hop="([^"]+)"[^>]*>([^<]+)', body)
    if hops and len(hops) >= 2:
        hop_a = (hops[0][0], hops[0][1].strip() or hop_a[1])
        hop_b = (hops[1][0], hops[1][1].strip() or hop_b[1])
        kind = "hops"
    if kind == "hops":
        return hops_html(year, pref, key, verb, hop_a, hop_b, trap, nxt, nl)
    if kind == "checks":
        return checks_html(year, pref, key, verb, hop_a[1], hop_b[1], trap, nxt, nl)
    return query_html(year, pref, key, verb, life, field, trap, nxt, nl)


def inject_before_script(text: str, year: str, machine: str) -> str:
    pat = rf"(<script[^>]+immersion-{year}\.js[^>]*>\s*</script>)"
    if re.search(pat, text):
        return re.sub(pat, machine + "\n\\1", text, count=1)
    if "</body>" in text:
        return text.replace("</body>", machine + "\n</body>", 1)
    return text + machine


def is_gold(path: Path, year: str) -> bool:
    s = str(path).replace("\\", "/")
    for g in GOLD.get(year, ()):
        if s.endswith("/sites/" + g):
            return True
    return False


def convert_file(path: Path, year: str, pref: str) -> tuple[int, int]:
    text = path.read_text(encoding="utf-8", errors="replace")
    if is_gold(path, year):
        n = len(ITT4X.findall(text))
        text2 = ITT4X.sub("\n", text)
        if text2 != text:
            path.write_text(text2, encoding="utf-8")
        return n, 0
    have_lo = set(re.findall(r'data-lo-key="([^"]+)"', text))
    converted = 0
    stripped = 0
    machines = []
    for m in ITT4X.finditer(text):
        key = m.group(1)
        body = m.group(2)
        stripped += 1
        if key in have_lo:
            continue
        machines.append(machine_from_4x(path, year, pref, key, body))
        have_lo.add(key)
        converted += 1
    text = ITT4X.sub("\n", text)
    if machines:
        text = inject_before_script(text, year, "\n".join(machines))
    path.write_text(text, encoding="utf-8")
    return stripped, converted


def convert_year(year: str) -> int:
    ydir = ROOT / "years" / year
    if not (ydir / "index.html").exists():
        print(year, "missing")
        return 1
    pref = "itt" + year[2:]
    htmls = sorted(ydir.rglob("*.html"))
    stripped = converted = 0
    for p in htmls:
        s, c = convert_file(p, year, pref)
        stripped += s
        converted += c
    left_4x = dest_field = 0
    for p in htmls:
        t = p.read_text(encoding="utf-8", errors="replace")
        left_4x += t.count("data-4x-go")
        dest_field += t.count("data-dest-field")
    print(f"{year}: stripped-4x={stripped} converted-to-lo={converted} remain-4x={left_4x} dest-field={dest_field}")
    return 0 if left_4x == 0 and dest_field == 0 else 1


def main() -> int:
    years = sys.argv[1:] or ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
    rc = 0
    for y in years:
        rc |= convert_year(y)
    return rc


if __name__ == "__main__":
    raise SystemExit(main())
