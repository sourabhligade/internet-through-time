#!/usr/bin/env python3
"""Kill every 2005 leftover 4× mock plaque.

Each leftover dest becomes leftover-official dest-true hops/query/checks.
Incomplete never writes. Star stays itt05-yt-uploads. No dest-field.
"""
from __future__ import annotations

import html as htmlmod
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2005"

ITT4X = re.compile(
    r"\n?<!-- ITT-4X:([^:]+):start -->(.*?)<!-- ITT-4X:\1:end -->\s*",
    re.S,
)

# dest slug → dest-true leftover (life, hop_a, hop_b, trap, field, verb)
DEST = {
    "amazon": ("Earth's Biggest leftover catalog. Not 1-Click gold.", ("cart", "Add leftover cart"), ("buy", "Buy leftover now"), "This is 1-Click gold (trap)", "title leftover", "Search leftover catalog"),
    "ebay": ("Auction leftover. Bid leftover. Not PayPal gold.", ("bid", "Place leftover bid"), ("watch", "Watch leftover item"), "This is PayPal gold (trap)", "bid leftover", "Place leftover bid"),
    "orkut": ("Google social leftover. Invite-driven. Not campus gold.", ("scrap", "Leave leftover scrap"), ("community", "Join leftover community"), "Open Facebook (trap)", "scrap leftover", "Leave leftover scrap"),
    "orkutcircle": ("Orkut leftover circle. Not thefacebook.", ("scrap", "Leave leftover scrap"), ("invite", "Invite leftover"), "Open Facebook (trap)", "circle leftover", "Invite leftover friend"),
    "orkutseed": ("Orkut leftover seed. Not campus gold.", ("invite", "Invite leftover"), ("scrap", "Scrap leftover"), "Open Facebook (trap)", "seed leftover", "Seed leftover invite"),
    "tinypic": ("Forum leftover image host. Not Flickr gold.", ("upload", "Upload leftover pic"), ("url", "Copy leftover URL"), "This is Flickr gold (trap)", "forum leftover", "Host leftover pic"),
    "piczo": ("Teen leftover homepage. Not MySpace gold.", ("page", "Build leftover page"), ("glitter", "Add leftover glitter"), "This is MySpace gold (trap)", "page leftover", "Build leftover page"),
    "tagged": ("Tagged leftover. Not open Facebook.", ("tag", "Tag leftover friend"), ("invite", "Invite leftover"), "Open Facebook (trap)", "tag leftover", "Tag leftover friend"),
    "yelp": ("Yelp leftover reviews. Not Maps gold.", ("review", "Write leftover review"), ("star", "Star leftover place"), "This is Maps gold (trap)", "review leftover", "Write leftover review"),
    "yelplocal": ("Yelp leftover local. Not Maps gold.", ("local", "Find leftover local"), ("review", "Review leftover"), "This is Maps gold (trap)", "local leftover", "Find leftover local"),
    "flickr": ("Yahoo-owned leftover. Not Yahoo Photos.", ("photo", "Title leftover photo"), ("tag", "Tag leftover photo"), "This is Yahoo Photos (trap)", "tag leftover", "Title leftover photo"),
    "flickrpro": ("Flickr Pro leftover. Not Yahoo Photos.", ("pro", "Pro leftover"), ("upload", "Upload leftover"), "This is Yahoo Photos (trap)", "pro leftover", "Keep leftover Pro"),
    "youtube": ("Independent leftover. Google does not own YouTube.", ("watch", "Watch leftover"), ("share", "Share leftover"), "Google already owns YouTube (trap)", "title leftover", "Watch leftover clip"),
    "gmail": ("Invite-only leftover. Open signup is later.", ("invite", "Send leftover invite"), ("beta", "Still invite-only leftover"), "Gmail is open signup in 2005 (trap)", "invite leftover", "Send leftover invite"),
    "google": ("Search leftover. Yahoo is still #1 visits.", ("q", "Search leftover"), ("lucky", "I'm Feeling Lucky leftover"), "This is the 2005 star (trap)", "query leftover", "Search leftover"),
    "yahoo": ("#1 visits leftover. Not Flickr gold.", ("dir", "Directory leftover"), ("mail", "Mail leftover"), "This is Flickr gold (trap)", "yahoo leftover", "Search leftover Yahoo"),
    "maps": ("8 Feb leftover drag. Street View is 2007.", ("drag", "Drag leftover"), ("hotels", "Hotels near LAX leftover"), "Open Street View (trap)", "hotels leftover", "Search leftover map"),
    "facebook": ("Still college-gated leftover. Not open Facebook.", ("harvard", "Harvard leftover"), ("stanford", "Stanford leftover"), "Open Facebook (trap)", "network leftover", "Join leftover network"),
    "myspace": ("News Corp $580M leftover. Not the chip.", ("top8", "Top 8 leftover"), ("html", "HTML leftover"), "This is the 2005 star (trap)", "profile leftover", "Edit leftover profile"),
    "craigslist": ("Classified leftover. Not HousingMaps gold.", ("post", "Post leftover ad"), ("city", "City leftover"), "Load live Craigslist (trap)", "ad leftover", "Post leftover ad"),
    "bbc": ("BBC leftover headline. Not CNN gold.", ("world", "World leftover"), ("tech", "Tech leftover"), "This is the 2005 star (trap)", "headline leftover", "Read leftover headline"),
    "cnn": ("CNN leftover. Not the chip.", ("world", "World leftover"), ("tech", "Tech leftover"), "This is the 2005 star (trap)", "headline leftover", "Read leftover headline"),
    "imdb": ("IMDb leftover title. Not Netflix gold.", ("title", "Title leftover"), ("cast", "Cast leftover"), "This is Netflix gold (trap)", "title leftover", "Look up leftover title"),
    "livejournal": ("LJ leftover. Not Blogger gold.", ("post", "Post leftover"), ("friend", "Friends leftover"), "This is Blogger gold (trap)", "post leftover", "Post leftover entry"),
    "basecamp": ("37signals leftover. Not the chip.", ("todo", "Todo leftover"), ("post", "Message leftover"), "This is the 2005 star (trap)", "todo leftover", "Add leftover todo"),
    "weather": ("Weather leftover. Not Maps gold.", ("zip", "ZIP leftover"), ("forecast", "Forecast leftover"), "This is Maps gold (trap)", "zip leftover", "Check leftover forecast"),
    "walmart": ("Walmart leftover. Not Amazon gold.", ("aisle", "Aisle leftover"), ("cart", "Cart leftover"), "This is Amazon gold (trap)", "aisle leftover", "Browse leftover aisle"),
    "wow": ("WoW leftover. Not the chip.", ("realm", "Realm leftover"), ("quest", "Quest leftover"), "This is the 2005 star (trap)", "realm leftover", "Pick leftover realm"),
    "worldofwarcraft": ("WoW leftover. Not the chip.", ("realm", "Realm leftover"), ("quest", "Quest leftover"), "This is the 2005 star (trap)", "realm leftover", "Pick leftover realm"),
    "itunes": ("iTunes leftover store. Podcasts are 28 Jun leftover.", ("song", "Song leftover"), ("podcast", "Podcast leftover"), "This is the 2005 star (trap)", "song leftover", "Browse leftover store"),
    "apple": ("Apple leftover. iPod leftover. Not iPhone.", ("ipod", "iPod leftover"), ("itunes", "iTunes leftover"), "This is iPhone (trap)", "ipod leftover", "Browse leftover Apple"),
    "firefox": ("Firefox leftover. IE6 is still the shell.", ("download", "Download leftover"), ("tab", "Tab leftover"), "This is Chrome (trap)", "download leftover", "Download leftover Firefox"),
    "friendster": ("Friendster leftover. Not MySpace gold.", ("testimonial", "Testimonial leftover"), ("friend", "Friend leftover"), "This is MySpace gold (trap)", "friend leftover", "Add leftover friend"),
    "digg": ("Digg leftover rise year. Not Slashdot gold.", ("up", "Promote leftover"), ("bury", "Bury leftover"), "This is Slashdot gold (trap)", "story leftover", "Promote leftover story"),
    "delicious": ("Yahoo leftover bookmark. Not the chip.", ("tag", "Tag leftover"), ("bundle", "Bundle leftover"), "This is the 2005 star (trap)", "tag leftover", "Tag leftover bookmark"),
    "blogger": ("Blogger leftover. Not WordPress gold.", ("post", "Post leftover"), ("publish", "Publish leftover"), "This is WordPress gold (trap)", "post leftover", "Publish leftover post"),
    "bloglines": ("Bloglines leftover reader. Not Reader gold.", ("sub", "Subscribe leftover"), ("read", "Read leftover"), "This is Google Reader gold (trap)", "feed leftover", "Subscribe leftover feed"),
    "adsense": ("AdSense leftover. Not the chip.", ("ad", "Ad leftover"), ("stats", "Stats leftover"), "This is the 2005 star (trap)", "ad leftover", "Check leftover stats"),
    "mashable": ("Mashable leftover. Not TechCrunch gold.", ("post", "Post leftover"), ("web20", "Web 2.0 leftover"), "This is TechCrunch gold (trap)", "post leftover", "Read leftover Mashable"),
    "programmableweb": ("API leftover directory. Not Maps gold.", ("api", "API leftover"), ("mashup", "Mashup leftover"), "This is Maps gold (trap)", "api leftover", "List leftover API"),
    "reader": ("Google Reader leftover. Not the chip.", ("sub", "Subscribe leftover"), ("star", "Star leftover"), "This is the 2005 star (trap)", "feed leftover", "Subscribe leftover feed"),
    "googlevideo": ("Google Video leftover. Not YouTube gold.", ("search", "Search leftover"), ("play", "Play leftover"), "This is YouTube gold (trap)", "clip leftover", "Search leftover Google Video"),
    "memeorandum": ("Memeorandum leftover. Not TechCrunch gold.", ("cluster", "Cluster leftover"), ("link", "Link leftover"), "This is TechCrunch gold (trap)", "cluster leftover", "Open leftover cluster"),
    "milliondollar": ("Alex Tew leftover pixels. Not the chip.", ("pixel", "Name leftover pixels"), ("buy", "Buy leftover pixels"), "This is the 2005 star (trap)", "pixel leftover", "Name leftover pixels"),
    "askjeeves": ("Ask leftover. Not Google gold.", ("ask", "Ask leftover"), ("answer", "Answer leftover"), "This is Google gold (trap)", "ask leftover", "Ask leftover Jeeves"),
    "altavista": ("AltaVista leftover. Not Google gold.", ("search", "Search leftover"), ("babel", "Babel Fish leftover"), "This is Google gold (trap)", "query leftover", "Search leftover AltaVista"),
    "excite": ("Excite leftover portal. Not Yahoo gold.", ("search", "Search leftover"), ("channel", "Channel leftover"), "This is Yahoo gold (trap)", "query leftover", "Search leftover Excite"),
    "dmoz": ("DMOZ leftover directory. Not Yahoo gold.", ("cat", "Category leftover"), ("edit", "Edit leftover"), "This is Yahoo gold (trap)", "category leftover", "Browse leftover DMOZ"),
    "gnutella": ("Gnutella leftover. Not the chip.", ("search", "Search leftover"), ("share", "Share leftover"), "This is the 2005 star (trap)", "file leftover", "Search leftover Gnutella"),
    "hampsterdance": ("Hampster leftover. Not the chip.", ("dance", "Dance leftover"), ("loop", "Loop leftover"), "This is the 2005 star (trap)", "dance leftover", "Play leftover dance"),
    "bowienet": ("BowieNet leftover. Not the chip.", ("fan", "Fan leftover"), ("isp", "ISP leftover"), "This is the 2005 star (trap)", "fan leftover", "Join leftover BowieNet"),
    "blogdex": ("Blogdex leftover. Not Technorati gold.", ("link", "Link leftover"), ("rank", "Rank leftover"), "This is Technorati gold (trap)", "link leftover", "Rank leftover link"),
    "gamespot": ("GameSpot leftover. Not the chip.", ("preview", "Preview leftover"), ("download", "Download leftover"), "This is the 2005 star (trap)", "game leftover", "Read leftover preview"),
    "folklore": ("folklore.org leftover. Not thefacebook.", ("story", "Story leftover"), ("anecdote", "Anecdote leftover"), "This is thefacebook gold (trap)", "story leftover", "Read leftover anecdote"),
    "geocities": ("GeoCities leftover neighborhood. Not MySpace gold.", ("hood", "Neighborhood leftover"), ("page", "Page leftover"), "This is MySpace gold (trap)", "page leftover", "Visit leftover homestead"),
}


def dest_slug(path: Path) -> str:
    parts = path.parts
    try:
        i = parts.index("sites")
        return parts[i + 1]
    except (ValueError, IndexError):
        return path.parent.name


def dest_true(slug: str, page: str) -> tuple[str, tuple[str, str], tuple[str, str], str, str, str]:
    if slug in DEST:
        return DEST[slug]
    name = slug.replace("-", " ")
    page_bit = page.replace(".html", "").replace("-", " ")
    if page_bit and page_bit not in ("index", "about"):
        name = f"{name} {page_bit}"
    return (
        f"{name} leftover. Incomplete never writes. Not the upload chip.",
        ("a", f"{name} leftover"),
        ("b", f"{name} leftover path"),
        "This leftover is the 2005 star (trap)",
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


def hops_html(key: str, title: str, life: str, hop_a: tuple[str, str], hop_b: tuple[str, str], trap: str, nxt: str, nl: str) -> str:
    return f"""<div data-lo-panel="1" data-itt-year="2005" class="itt-2005-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">2005 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{htmlmod.escape(trap)}</button></p>
<p>
 <button type="button" data-lo-pick="{htmlmod.escape(hop_a[0])}">{htmlmod.escape(hop_a[1])}</button>
 <button type="button" data-lo-pick="{htmlmod.escape(hop_b[0])}">{htmlmod.escape(hop_b[1])}</button>
</p>
<p><label><input type="checkbox" data-lo-req> Leftover 2005 · not the upload chip.</label></p>
<p><label><input type="checkbox" data-lo-req> 0 hops / 1 hop / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{htmlmod.escape(key)}" data-lo-min-pick="2">{htmlmod.escape(title)}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{htmlmod.escape(key)}"><b>Next:</b> <a href="{htmlmod.escape(nxt)}">{htmlmod.escape(nl)}</a></p>
</div>
"""


def query_html(key: str, title: str, life: str, field: str, trap: str, nxt: str, nl: str) -> str:
    return f"""<div data-lo-panel="1" data-itt-year="2005" class="itt-2005-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">2005 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{htmlmod.escape(trap)}</button></p>
<p><label>{htmlmod.escape(life)}<br><input type="text" data-lo-field maxlength="80" placeholder="{htmlmod.escape(field)}" autocomplete="off"></label></p>
<p><label><input type="checkbox" data-lo-req> Leftover 2005 · not the upload chip.</label></p>
<p><label><input type="checkbox" data-lo-req> Empty / trap never writes.</label></p>
<p><button type="button" data-lo-save data-lo-key="{htmlmod.escape(key)}">{htmlmod.escape(title)}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{htmlmod.escape(key)}"><b>Next:</b> <a href="{htmlmod.escape(nxt)}">{htmlmod.escape(nl)}</a></p>
</div>
"""


def checks_html(key: str, title: str, tick_a: str, tick_b: str, trap: str, nxt: str, nl: str) -> str:
    return f"""<div data-lo-panel="1" data-itt-year="2005" class="itt-2005-machine" style="margin:14px 0;padding:12px;border:1px solid #333;background:#fff8dc;max-width:46em;color:#111">
<p style="font-size:11px;color:#444;margin:0 0 8px">2005 leftover machine · dest-true · incomplete never writes</p>
<p><button type="button" data-lo-trap>{htmlmod.escape(trap)}</button></p>
<p><label><input type="checkbox" data-lo-req> {htmlmod.escape(tick_a)}</label></p>
<p><label><input type="checkbox" data-lo-req> {htmlmod.escape(tick_b)}</label></p>
<p><button type="button" data-lo-save data-lo-key="{htmlmod.escape(key)}">{htmlmod.escape(title)}</button> <span data-lo-status></span></p>
<p hidden data-next-flow data-next-when-key="itt05-{htmlmod.escape(key)}"><b>Next:</b> <a href="{htmlmod.escape(nxt)}">{htmlmod.escape(nl)}</a></p>
</div>
"""


def machine_from_4x(path: Path, key: str, body: str) -> str:
    slug = dest_slug(path)
    life, hop_a, hop_b, trap, field, verb = dest_true(slug, path.name)
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
    title_m = re.search(r"<h2[^>]*>([^<]+)</h2>", body)
    title = htmlmod.unescape(title_m.group(1).strip()) if title_m else verb
    title = re.sub(r"\s*\(not the chip\)\s*", "", title, flags=re.I)
    title = title.replace("leftover (not the chip)", "leftover").strip() or verb
    if kind == "hops":
        return hops_html(key, verb, life, hop_a, hop_b, trap, nxt, nl)
    if kind == "checks":
        return checks_html(key, verb, hop_a[1], hop_b[1], trap, nxt, nl)
    return query_html(key, verb, life, field, trap, nxt, nl)


def inject_before_script(text: str, machine: str) -> str:
    if re.search(r"<script[^>]+immersion-2005\.js", text):
        return re.sub(
            r"(<script[^>]+immersion-2005\.js[^>]*>\s*</script>)",
            machine + "\n\\1",
            text,
            count=1,
        )
    if "</body>" in text:
        return text.replace("</body>", machine + "\n</body>", 1)
    return text + machine


def dest_true_existing_lo(text: str, path: Path) -> str:
    slug = dest_slug(path)
    _life, _a, _b, _trap, field, verb = dest_true(slug, path.name)
    text = text.replace(">Type leftover</button>", f">{htmlmod.escape(verb)}</button>")
    text = text.replace(">Ack leftover</button>", f">{htmlmod.escape(verb)}</button>")
    text = text.replace(">Hop leftover</button>", f">{htmlmod.escape(verb)}</button>")
    text = text.replace(">Do leftover", f">{htmlmod.escape(verb)} · ")
    text = re.sub(
        r"<label>Leftover note<br>",
        f"<label>{htmlmod.escape(field)}<br>",
        text,
    )
    text = text.replace(
        "2005 leftover machine · incomplete never writes · not dest-field",
        "2005 leftover machine · dest-true · incomplete never writes",
    )
    return text


def convert_file(path: Path) -> tuple[int, int]:
    text = path.read_text(encoding="utf-8", errors="replace")
    if "youtube/upload.html" in str(path).replace("\\", "/"):
        # Gold dest — strip leftover 4× only, never inject leftover plaque.
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
        machines.append(machine_from_4x(path, key, body))
        have_lo.add(key)
        converted += 1
    text = ITT4X.sub("\n", text)
    if machines:
        text = inject_before_script(text, "\n".join(machines))
    text = dest_true_existing_lo(text, path)
    path.write_text(text, encoding="utf-8")
    return stripped, converted


def main() -> int:
    htmls = sorted(Y.rglob("*.html"))
    stripped = converted = 0
    for p in htmls:
        s, c = convert_file(p)
        stripped += s
        converted += c
    left_4x = 0
    left_do = 0
    left_type = 0
    dest_field = 0
    for p in htmls:
        t = p.read_text(encoding="utf-8", errors="replace")
        left_4x += t.count("data-4x-go")
        left_do += t.count("Do leftover")
        left_type += t.count("Type leftover")
        dest_field += t.count("data-dest-field")
    print(f"stripped-4x={stripped} converted-to-lo={converted}")
    print(f"remain data-4x-go={left_4x} Do leftover={left_do} Type leftover={left_type} dest-field={dest_field}")
    return 0 if left_4x == 0 and dest_field == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
