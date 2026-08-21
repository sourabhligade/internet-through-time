#!/usr/bin/env python3
"""Third leftover 3× trio — every playable year.

Idempotent. Does not move stars or grow guided <ol>.
See docs/3X-FLOWS-LINKS-EVERY-YEAR-MAP-GOALS-STEPS-FLOWS.md
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year -> [(slug, label, pick, placeholder, next_slug_or_STAR, next_label)]
# last next is STAR
TRIOS: dict[str, list[tuple[str, str, str, str, str, str]]] = {
    "1994": [
        ("lycos", "Lycos leftover", "catalog", "web", "infoseek", "Infoseek"),
        ("infoseek", "Infoseek leftover", "search", "mosaic", "nasa", "NASA"),
        ("nasa", "NASA leftover", "shuttle", "ksc", "STAR", "★ Cool Site of the Day"),
    ],
    "1995": [
        ("geocities", "GeoCities leftover", "homestead", "colby", "classmates", "Classmates"),
        ("classmates", "Classmates leftover", "find", "class of 89", "match", "Match"),
        ("match", "Match leftover", "personals", "seattle", "STAR", "★ Amazon SSL"),
    ],
    "1996": [
        ("hotmail", "Hotmail leftover", "inbox", "you@hotmail", "excite", "Excite"),
        ("excite", "Excite leftover", "portal", "channels", "angelfire", "Angelfire"),
        ("angelfire", "Angelfire leftover", "page", "my site", "STAR", "★ Portal wars"),
    ],
    "1997": [
        ("slashdot", "Slashdot leftover", "story", "linux", "winamp", "Winamp"),
        ("winamp", "Winamp leftover", "skin", "classic", "ebay", "eBay"),
        ("ebay", "eBay leftover", "auction", "peanut", "STAR", "★ PointCast"),
    ],
    "1998": [
        ("dmoz", "DMOZ leftover", "catalog", "computers", "cdnow", "CDNow"),
        ("cdnow", "CDNow leftover", "album", "ok computer", "gamespot", "GameSpot"),
        ("gamespot", "GameSpot leftover", "preview", "halflife", "STAR", "★ Lucky"),
    ],
    "1999": [
        ("blogger", "Blogger leftover", "post", "hello", "etrade", "E*TRADE"),
        ("etrade", "E*TRADE leftover", "quote", "yhoo", "paypal", "PayPal"),
        ("paypal", "PayPal leftover", "send", "20", "STAR", "★ AIM"),
    ],
    "2000": [
        ("expedia", "Expedia leftover", "flight", "sfo", "paypal", "PayPal"),
        ("paypal", "PayPal leftover", "send", "20", "ebay", "eBay"),
        ("ebay", "eBay leftover", "watch", "beanie", "STAR", "★ MapQuest"),
    ],
    "2001": [
        ("google", "Google leftover", "search", "wikipedia", "cnet", "CNET"),
        ("cnet", "CNET leftover", "news", "xp", "bbc", "BBC"),
        ("bbc", "BBC leftover", "world", "kabul", "STAR", "★ Wikipedia edit"),
    ],
    "2002": [
        ("deviantart", "DeviantArt leftover", "watch", "skin", "daypop", "Daypop"),
        ("daypop", "Daypop leftover", "blog", "iraq", "encarta", "Encarta"),
        ("encarta", "Encarta leftover", "article", "moon", "STAR", "★ StumbleUpon"),
    ],
    "2003": [
        ("delicious", "Delicious leftover", "tag", "ajax", "skype", "Skype"),
        ("skype", "Skype leftover", "call", "echo", "adsense", "AdSense"),
        ("adsense", "AdSense leftover", "ad", "blog", "STAR", "★ Photobucket"),
    ],
    "2004": [
        ("digg", "Digg leftover", "digg", "firefox", "gmail", "Gmail"),
        ("gmail", "Gmail leftover", "invite", "1gb", "delicious", "Delicious"),
        ("delicious", "Delicious leftover", "tag", "web2", "STAR", "★ thefacebook"),
    ],
    "2005": [
        ("myspace", "MySpace leftover", "tom", "top 8", "flickr", "Flickr"),
        ("flickr", "Flickr leftover", "tag", "cat", "maps", "Maps"),
        ("maps", "Maps leftover", "drag", "sf", "STAR", "★ YouTube upload"),
    ],
    "2006": [
        ("facebook", "Facebook leftover", "feed", "open", "youtube", "YouTube"),
        ("youtube", "YouTube leftover", "watch", "saturday", "wikipedia", "Wikipedia"),
        ("wikipedia", "Wikipedia leftover", "article", "web 2.0", "STAR", "★ Twitter"),
    ],
    "2007": [
        ("justin", "Justin.tv leftover", "live", "desk", "ustream", "Ustream"),
        ("ustream", "Ustream leftover", "live", "show", "qik", "Qik"),
        ("qik", "Qik leftover", "phone", "clip", "STAR", "★ iPhone Safari"),
    ],
    "2008": [
        ("friendconnect", "FriendConnect leftover", "gadget", "friends", "evernote", "Evernote"),
        ("evernote", "Evernote leftover", "clip", "note", "lastfm", "Last.fm"),
        ("lastfm", "Last.fm leftover", "scrobble", "radio", "STAR", "★ App Store"),
    ],
    "2009": [
        ("mafiawars", "Mafia Wars leftover", "job", "hit", "whatsapp", "WhatsApp seed"),
        ("whatsapp", "WhatsApp seed leftover", "sms", "hello", "ubercab", "UberCab"),
        ("ubercab", "UberCab leftover", "sf", "black", "STAR", "★ Like"),
    ],
    "2010": [
        ("chrome", "Chrome leftover", "tab", "omnibox", "wave", "Wave"),
        ("wave", "Wave leftover", "funeral", "wave", "android", "Android"),
        ("android", "Android leftover", "market", "app", "STAR", "★ Instagram"),
    ],
    "2011": [
        ("snapchat", "Snapchat leftover", "snap", "ghost", "tumblr", "Tumblr"),
        ("tumblr", "Tumblr leftover", "reblog", "gif", "youtube", "YouTube"),
        ("youtube", "YouTube leftover", "watch", "music", "STAR", "★ Google+"),
    ],
    "2012": [
        ("reddit", "Reddit leftover", "sub", "pics", "tinder", "Tinder"),
        ("tinder", "Tinder leftover", "swipe", "usc", "windows8", "Windows 8"),
        ("windows8", "Windows 8 leftover", "start", "tiles", "STAR", "★ IG Android"),
    ],
    "2013": [
        ("reddit", "Reddit leftover", "sub", "videos", "facebook", "Facebook leftover"),
        ("facebook", "Facebook leftover", "home", "graph", "twitter", "Twitter"),
        ("twitter", "Twitter leftover", "tweet", "vine", "STAR", "★ Vine"),
    ],
    "2015": [
        ("discord", "Discord leftover", "server", "#general", "echo", "Echo"),
        ("echo", "Echo leftover", "alexa", "timer", "snapchat", "Snapchat"),
        ("snapchat", "Snapchat leftover", "snap", "24h", "STAR", "★ Periscope"),
    ],
    "2016": [
        ("musically", "Musical.ly leftover", "lip", "15", "vine", "Vine"),
        ("vine", "Vine leftover", "loop", "6s", "snapchat", "Snapchat"),
        ("snapchat", "Snapchat leftover", "story", "24h", "STAR", "★ Stories"),
    ],
    "2017": [
        ("fortnite", "Fortnite leftover", "drop", "tilted", "teams", "Teams"),
        ("teams", "Teams leftover", "chat", "#general", "switch", "Switch"),
        ("switch", "Switch leftover", "dock", "zelda", "STAR", "★ Face ID"),
    ],
    "2018": [
        ("tiktok", "TikTok leftover", "fyp", "sound", "github", "GitHub"),
        ("github", "GitHub leftover", "issue", "ms", "homepod", "HomePod"),
        ("homepod", "HomePod leftover", "siri", "room", "STAR", "★ GDPR"),
    ],
    "2019": [
        ("tiktok", "TikTok leftover", "fyp", "sound", "stadia", "Stadia"),
        ("stadia", "Stadia leftover", "stream", "founders", "arcade", "Arcade"),
        ("arcade", "Arcade leftover", "play", "oceanhorn", "STAR", "★ Disney+"),
    ],
}

STARS = {
    "1994": "../sites/csotd/index.html",
    "1995": "../sites/amazon/ssl-checkout.html",
    "1996": "../sites/portals/wars.html",
    "1997": "../sites/pointcast/index.html",
    "1998": "../sites/google/lucky.html",
    "1999": "../sites/aim/index.html",
    "2000": "../sites/mapquest/index.html",
    "2001": "../sites/wikipedia/edit.html",
    "2002": "../sites/stumbleupon/index.html",
    "2003": "../sites/photobucket/index.html",
    "2004": "../sites/facebook/networks.html",
    "2005": "../sites/youtube/upload.html",
    "2006": "../sites/twitter/index.html",
    "2007": "../sites/iphone/index.html",
    "2008": "../sites/appstore/index.html",
    "2009": "../sites/facebook/index.html",
    "2010": "../sites/instagram/index.html",
    "2011": "../sites/googleplus/index.html",
    "2012": "../sites/instagram/android.html",
    "2013": "../sites/vine/record.html",
    "2015": "../sites/periscope/index.html",
    "2016": "../sites/instagram/stories.html",
    "2017": "../sites/iphone/x.html",
    "2018": "../sites/gdpr/index.html",
    "2019": "../sites/disneyplus/home.html",
}

HOLE_YEARS = {"2007", "2009", "2011", "2013"}
FILL_POP_MORE = {"2012", "2019"}
REWRITE_POP_MORE = {"2007", "2009", "2011", "2013"}

def period_css(year: str) -> str:
    p = ROOT / f"css/period-{year}.css"
    if p.exists():
        return f"period-{year}.css"
    return "period-2012.css"

MARKER_START = "<!-- ITT-POP3:{slug}:start -->"
MARKER_END = "<!-- ITT-POP3:{slug}:end -->"
HOME_START = "<!-- ITT-POP3-HOME:start -->"
HOME_END = "<!-- ITT-POP3-HOME:end -->"
MAP_START = "<!-- ITT-POP3-MAP:start -->"
MAP_END = "<!-- ITT-POP3-MAP:end -->"


def pfx(year: str) -> str:
    return "itt" + year[2:]


def key_of(year: str, slug: str) -> str:
    return f"{pfx(year)}-pop3-{slug}"


def upsert_block(text: str, start: str, end: str, inner: str) -> str:
    block = f"{start}\n{inner}\n{end}"
    if start in text and end in text:
        return re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), block, text, count=1)
    # insert before last </body> if present else append
    if "</body>" in text:
        return text.replace("</body>", block + "\n</body>", 1)
    return text.rstrip() + "\n" + block + "\n"


def panel(year: str, slug: str, label: str, pick: str, ph: str, next_href: str, next_label: str) -> str:
    k = key_of(year, slug)
    return f"""<section class="itt-pop3" data-pop-panel="1" data-itt-year="{year}" style="margin:12px 0;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:13px;max-width:46em">
<p><b>Also popular leftover (not the chip)</b> · {label}</p>
<p class="honest" style="font-size:12px">{year} leftover · incomplete never writes · star stays locked</p>
<p>
 <button type="button" data-pop-pick="{pick}" data-pop-q="{ph}">{pick}</button>
</p>
<label><input type="checkbox" data-pop-req> Leftover. Star stays the year chip.</label>
<p><input type="text" data-pop-field maxlength="40" placeholder="{ph}"></p>
<p><button type="button" data-pop-go data-pop-id="pop3-{slug}" data-pop-key="pop3-{slug}">Open leftover</button>
 <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{k}"><b>Next:</b>
 <a href="{next_href}">{next_label}</a></p>
</section>"""


def next_href(year: str, nxt: str) -> str:
    if nxt == "STAR":
        # dest-relative: from sites/foo/index.html to star
        star = STARS[year]  # ../sites/...
        return star.replace("../sites/", "../")
    return f"../{nxt}/index.html"


def dest_next_from_sites(year: str, nxt: str) -> str:
    if nxt == "STAR":
        # years/YYYY/sites/foo -> pages star is ../<star without ../sites prefix wait>
        # STARS is from home: ../sites/csotd/index.html
        # from sites/lycos/index.html star is ../csotd/index.html
        rel = STARS[year]  # ../sites/csotd/index.html
        return "../" + rel.split("/sites/")[1]
    return f"../{nxt}/index.html"


def ensure_year_attr(html: str, year: str) -> str:
    if re.search(r"<html[^>]*data-itt-year=", html):
        return html
    return re.sub(r"<html(\s[^>]*)?>", rf'<html lang="en" data-itt-year="{year}">', html, count=1)


def inject_dest(year: str, slug: str, label: str, pick: str, ph: str, nxt: str, nxt_label: str) -> Path:
    path = ROOT / "years" / year / "sites" / slug / "index.html"
    if not path.exists():
        parent = path.parent
        if year in HOLE_YEARS or parent.exists():
            write_hole(year, slug, label, pick, ph, nxt, nxt_label)
            return path
        raise SystemExit(f"missing dest {path}")
    text = path.read_text(encoding="utf-8", errors="replace")
    if 'data-pop3-costume=' in text:
        return path
    if f'data-pop-key="pop3-{slug}"' in text and f"ITT-POP3:{slug}:" not in text:
        return path
    if re.search(r"data-pop-go(?![^>]*pop3-)", text) and f"ITT-POP3:{slug}:" not in text:
        # existing first-3× pop-go on this page — illegal
        if "data-pop-key=" not in text:
            raise SystemExit(f"{path} already has data-pop-go — pick another dest")
    text = ensure_year_attr(text, year)
    nh = dest_next_from_sites(year, nxt)
    inner = panel(year, slug, label, pick, ph, nh, nxt_label)
    start = MARKER_START.format(slug=slug)
    end = MARKER_END.format(slug=slug)
    text = upsert_block(text, start, end, inner)
    path.write_text(text, encoding="utf-8")
    return path


def write_hole(year: str, slug: str, label: str, pick: str, ph: str, nxt: str, nxt_label: str) -> None:
    css = period_css(year)
    nh = dest_next_from_sites(year, nxt)
    body = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{label} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:520px;margin:16px auto;font-family:Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">← Starting Point</a> · <a href="../../pages/about.html">About {year}</a></p>
<h1>{label}</h1>
<p>{year} leftover popular door. Not the year chip. Incomplete never writes.</p>
<p class="itt-pixel-failed" style="font-size:11px;color:#666">[failed-final] official mark · RECON text only</p>
{panel(year, slug, label, pick, ph, nh, nxt_label)}
</div>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""
    path = ROOT / "years" / year / "sites" / slug / "index.html"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body, encoding="utf-8")


def home_strip(year: str) -> str:
    rows = TRIOS[year]
    links = " ·\n ".join(f'<a href="../sites/{s}/index.html">{lab}</a>' for s, lab, *_ in rows)
    extra = ""
    if year in FILL_POP_MORE:
        extra = f"""<p data-itt-pop-more="{year}" class="itt-pop-more" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (new doors · not the chip · not the first 3×): {links} · pick + honesty · empty never writes</p>
"""
    return extra + f"""<p data-itt-pop-3x3="{year}" class="itt-pop-3x3" style="font-size:12px;margin:10px 0;padding:8px;border:1px solid #333;max-width:720px">
 <b>3 more leftovers</b> (third trio · not the chip · not the first 3×):
 {links}
 · pick + honesty · empty never writes
</p>"""


def rewrite_pop_more(text: str, year: str) -> str:
    rows = TRIOS[year]
    links = " · ".join(f'<a href="../sites/{s}/index.html">{lab}</a>' for s, lab, *_ in rows)
    new = (
        f'<p data-itt-pop-more="{year}" class="itt-pop-more" '
        f'style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px">'
        f'<b>3 more leftovers</b> (new doors · not the chip · not the first 3×): {links} '
        f"· pick + honesty · empty never writes</p>"
    )
    return re.sub(
        rf'<p[^>]*data-itt-pop-more="{year}"[\s\S]*?</p>',
        new,
        text,
        count=1,
    )


def patch_home(year: str) -> None:
    path = ROOT / "years" / year / "pages" / "home.html"
    text = path.read_text(encoding="utf-8", errors="replace")
    if year in REWRITE_POP_MORE:
        text = rewrite_pop_more(text, year)
    inner = home_strip(year)
    if year in FILL_POP_MORE and HOME_START in text:
        before, mid, rest = text.partition(HOME_START)
        before = re.sub(
            rf'<p[^>]*data-itt-pop-more="{year}"[\s\S]*?</p>\s*',
            "",
            before,
        )
        text = before + mid + rest
    text = upsert_block(text, HOME_START, HOME_END, inner)
    path.write_text(text, encoding="utf-8")


def patch_map(year: str) -> None:
    path = ROOT / "years" / year / "pages" / "map.html"
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8", errors="replace")
    lis = "\n".join(
        f'<li><a href="../sites/{s}/index.html">{lab} 3×</a></li>'
        for s, lab, *_ in TRIOS[year]
    )
    inner = f"<ul>\n{lis}\n</ul>"
    if "</ul>" in text and MAP_START not in text:
        # lean maps have a writer ul — insert lis before last </ul>
        text = text.replace("</ul>", lis + "\n</ul>", 1)
        text = upsert_block(text, MAP_START, MAP_END, "<!-- mapped into ul -->")
    else:
        text = upsert_block(text, MAP_START, MAP_END, inner)
    path.write_text(text, encoding="utf-8")


def write_json() -> None:
    out = {}
    for year, rows in TRIOS.items():
        out[year] = [
            {
                "id": slug,
                "name": lab.replace(" leftover", ""),
                "title": lab,
                "why": f"{year} leftover third trio. Not the chip.",
                "verb": f"Pick {pick} then go.",
                "ph": ph,
                "btn": "Open leftover",
            }
            for slug, lab, pick, ph, *_ in rows
        ]
    (ROOT / "scripts" / "popular-3x3-sites.json").write_text(
        json.dumps(out, indent=2) + "\n", encoding="utf-8"
    )


def write_e2e() -> None:
    dest = ROOT / "e2e" / "year-3x3.spec.js"
    if dest.exists() and "leftoverSave" in dest.read_text(encoding="utf-8", errors="replace"):
        return
    samples = [
        ("1994", "lycos", "itt94-pop3-lycos"),
        ("2005", "myspace", "itt05-pop3-myspace"),
        ("2007", "justin", "itt07-pop3-justin"),
        ("2009", "mafiawars", "itt09-pop3-mafiawars"),
        ("2010", "chrome", "itt10-pop3-chrome"),
        ("2011", "snapchat", "itt11-pop3-snapchat"),
        ("2012", "reddit", "itt12-pop3-reddit"),
        ("2013", "reddit", "itt13-pop3-reddit"),
        ("2018", "tiktok", "itt18-pop3-tiktok"),
    ]
    tests = []
    for year, slug, key in samples:
        tests.append(
            f"""
  test("{year} {slug} empty never writes then leftover save", async ({{ page }}) => {{
    await page.goto("/years/{year}/sites/{slug}/index.html");
    await page.evaluate(() => localStorage.removeItem("{key}"));
    await page.reload();
    await page.locator("[data-pop-go][data-pop-key='pop3-{slug}']").click();
    expect(await page.evaluate(() => localStorage.getItem("{key}"))).toBeFalsy();
    await page.locator("[data-pop-pick]").first().click();
    const reqs = page.locator("[data-pop-req]");
    const nReq = await reqs.count();
    for (let i = 0; i < nReq; i++) await reqs.nth(i).check();
    const field = page.locator("[data-pop-field]").last();
    const ph = (await field.getAttribute("placeholder")) || "museum";
    await field.fill(ph);
    await page.locator("[data-pop-go][data-pop-key='pop3-{slug}']").click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem("{key}"))).toBeTruthy();
  }});"""
        )
    body = f"""// @ts-check
const {{ test, expect }} = require("@playwright/test");

const SHIP = [];
for (let y = 1994; y <= 2019; y++) {{
  if (y === 2014) continue;
  SHIP.push(String(y));
}}

test.describe("third leftover 3× — every shipped year", () => {{
  for (const year of SHIP) {{
    test(`${{year}} home lists 3 third-trio leftover doors`, async ({{ page }}) => {{
      await page.goto(`/years/${{year}}/pages/home.html`);
      const strip = page.locator(`[data-itt-pop-3x3="${{year}}"]`);
      await expect(strip).toBeVisible();
      await expect(strip.locator("a[href*='sites/']")).toHaveCount(3);
      await expect(page.locator(`#ott-guided-${{year}} ol > li`)).toHaveCount(6);
      const star = page.locator(`[data-ott-one-thing="${{year}}"]`);
      await expect(star).toBeVisible();
      const starHref = await star.getAttribute("href");
      const hrefs = await strip.locator("a[href*='sites/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
      expect(hrefs.some((h) => starHref && h && starHref.includes(h.replace("../", "")))).toBeFalsy();
    }});
  }}
}});

test.describe("third leftover 3× writers — sample years", () => {{
{"".join(tests)}
}});
"""
    (ROOT / "e2e" / "year-3x3.spec.js").write_text(body, encoding="utf-8")


def main() -> None:
    n = 0
    for year, rows in TRIOS.items():
        for slug, lab, pick, ph, nxt, nxt_lab in rows:
            inject_dest(year, slug, lab, pick, ph, nxt, nxt_lab)
            n += 1
        patch_home(year)
        patch_map(year)
    write_json()
    write_e2e()
    print(f"pop3 injected {n} dests · {len(TRIOS)} years")


if __name__ == "__main__":
    main()
