#!/usr/bin/env python3
"""Restore broken 2001/2002 product flows (blogger, technorati, friendster,
netflix, google search, wiki name=text, guided 6, leftover 3× trios).
"""
from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def blogger_edit(year: str) -> str:
    logo = f"../../../../assets/period/{year}/blogger/logo.gif"
    if not (ROOT / "assets" / "period" / year / "blogger" / "logo.gif").is_file():
        logo = "../../../../assets/period/2000/blogger/logo.gif"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>blogger! — post</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#0d2352" text="#ffffff" link="#ffff00" vlink="#ffff9d" style="margin:0">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="540" align="center" cellpadding="8" cellspacing="0" border="0" bgcolor="#074adb" style="margin-top:16px">
<tr><td>
 <img src="{logo}" width="200" height="50" alt="blogger!" border="0">
 <font face="Arial" size="2" color="#ffff9d"> — new post · still Pyra</font>
</td></tr>
<tr bgcolor="#0d2352"><td>
 <form data-blogger-title style="margin-bottom:12px">
 <font face="Arial" size="2" color="#ffffff">Weblog title:<br>
 <input type="text" name="blogtitle" size="40" value="My Weblog" style="font-size:12px">
 <input type="submit" value="Update" style="font-size:11px"></font>
 </form>
 <form data-blogger-post>
 <font face="Arial" size="2" color="#ffffff">
 Title (optional):<br>
 <input type="text" name="title" size="50" style="font-size:12px;width:95%"><br><br>
 Body:<br>
 <textarea name="body" rows="10" cols="55" style="font-size:12px;width:95%;font-family:Arial,sans-serif"></textarea><br><br>
 Link (optional):<br>
 <input type="text" name="link" size="50" style="font-size:12px;width:95%"><br><br>
 <input type="submit" value="Save to Server" style="font-size:12px;font-weight:bold">
 <font size="1" color="#90c800"> FTP theater · free</font>
 </font>
 </form>
 <p><font face="Arial" size="2">
 <a href="view.html"><font color="#ffff00">View weblog</font></a> ·
 <a href="index.html"><font color="#ffff00">blogger! home</font></a> ·
 <a href="about.html"><font color="#ffff00">leftover about</font></a>
 </font></p>
</td></tr>
</table>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def blogger_view(year: str) -> str:
    logo = f"../../../../assets/period/{year}/blogger/logo.gif"
    if not (ROOT / "assets" / "period" / year / "blogger" / "logo.gif").is_file():
        logo = "../../../../assets/period/2000/blogger/logo.gif"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>My Weblog — blogger!</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#ffffff" text="#000000" link="#0000cc" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="540" align="center" cellpadding="0" cellspacing="0" border="0">
<tr bgcolor="#074adb"><td style="padding:8px">
 <img src="{logo}" width="140" height="35" alt="blogger!" border="0" align="absmiddle">
 <font face="Arial" size="2" color="#ffff9d"> · reverse-chronological · free · <b>Pyra Labs</b></font>
</td></tr>
<tr><td style="padding:12px;font-family:Georgia,'Times New Roman',serif">
 <p style="font-family:Arial;font-size:11px;background:#ffc;border:1px solid #c80;padding:6px">
 Still a <b>Pyra</b> product. Google does not own Blogger until February 2003.
 </p>
 <div id="blogger-view" data-blogger-view>
 <h2 style="font-size:16px;margin:0 0 8px">My Weblog</h2>
 <p style="font-size:13px;color:#666">Posts appear here after you “Save to Server” (FTP theater). Newest first.</p>
 </div>
 <p style="font-family:Arial,sans-serif;font-size:12px;margin-top:16px">
 <a href="edit.html">« New post</a> · <a href="index.html">blogger! home</a>
 </p>
</td></tr>
</table>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def leftover_page(year: str, title: str, body: str, key: str, ph: str, nxt: str, nxt_l: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">← Starting Point</a></p>
<h1>{title}</h1>
<p>{body}</p>
<label style="display:block"><input type="checkbox" data-req> Year-true leftover dest · not the chip</label>
<label style="display:block"><input type="checkbox" data-req> Empty never writes</label>
<p><input type="text" id="f-{key}" maxlength="80" placeholder="{ph}"></p>
<p>
 <button type="button" data-itt-real-save data-storage-key="{key}" data-min-req="2" data-requires="[data-req]" data-require-field="#f-{key}" data-require-field-min="2">Open leftover dest</button>
 <span data-itt-action-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{key}"><b>Next:</b> <a href="{nxt}">{nxt_l}</a></p>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def main() -> int:
    # Wiki handoff: tests fill textarea[name="text"]
    wiki = ROOT / "years/2001/sites/wikipedia/edit.html"
    t = wiki.read_text(encoding="utf-8")
    if 'name="text"' not in t:
        t = t.replace(
            '<textarea data-wiki-body rows="8" cols="60"',
            '<textarea name="text" data-wiki-body rows="8" cols="60"',
        )
        wiki.write_text(t, encoding="utf-8")

    # Blogger REAL post → view
    for year in ("2001", "2002"):
        write(ROOT / f"years/{year}/sites/blogger/edit.html", blogger_edit(year))
        write(ROOT / f"years/{year}/sites/blogger/view.html", blogger_view(year))

    # Technorati cosmos on 2002 index (keep leftover about)
    logo = "../../../../assets/period/2002/technorati/logo.gif"
    write(
        ROOT / "years/2002/sites/technorati/index.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2002">
<head>
<meta charset="utf-8">
<title>Technorati — What's happening on the web</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">← Starting Point</a></p>
<p><img src="{logo}" alt="Technorati" border="0"></p>
<h1>Technorati leftover seed</h1>
<p>Cosmos leftover. Who links to a URL. Not the Stumble chip.</p>
<form data-technorati-cosmos>
 <b>Cosmos</b> — see who links to a URL<br>
 <input name="url" size="48" value="http://www.example.com/">
 <button type="submit">Search Cosmos</button>
</form>
<div data-technorati-status style="font-size:12px;color:#060;margin:6px 0"></div>
<div data-technorati-results style="margin-top:8px">
 <b>Who’s linking:</b>
 <ul data-technorati-list></ul>
</div>
<p><a href="about.html">Technorati leftover about</a></p>
<script src="../../../../js/immersion-2002.js"></script>
</body>
</html>
""",
    )

    # Friendster profile dest
    write(
        ROOT / "years/2002/sites/friendster/profile.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2002">
<head>
<meta charset="utf-8">
<title>Friendster — Edit profile</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head>
<body bgcolor="#ffffff" data-itt-year="2002">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div data-friendster-root>
<p>Founded 2002. Mass public is often dated March 2003. Seed leftover — not the chip.</p>
<form data-friendster-profile-form>
 <p>Display name<br><input name="name" size="40"></p>
 <p>Location<br><input name="location" size="40"></p>
 <p>About me<br><textarea name="about" rows="5"></textarea></p>
 <button type="submit">Save profile</button>
 <span data-friendster-status style="color:green;margin-left:8px"></span>
</form>
<p><a href="index.html">← Friendster seed</a> · <a href="testimonials.html">Testimonials leftover</a></p>
</div>
<script src="../../../../js/immersion-2002.js"></script>
</body>
</html>
""",
    )

    # Netflix DVD queue leftover
    nflix = "../../../../assets/period/2002/netflix/logo.gif"
    write(
        ROOT / "years/2002/sites/netflix/index.html",
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2002">
<head>
<meta charset="utf-8">
<title>Netflix — DVDs by mail leftover</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head>
<body bgcolor="#000" text="#fff" link="#e50914">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">← Starting Point</a></p>
<img src="{nflix}" alt="Netflix" border="0">
<h1>Netflix leftover · DVDs by mail</h1>
<p>Queue leftover. No live stream. Photobucket / Store are later. Stumble is the chip.</p>
<form data-netflix-queue-form style="margin:12px 0">
 Add a title:
 <input name="q" size="28" value="Amélie" data-netflix-q>
 <input type="submit" value="Add to Queue">
</form>
<div data-netflix-status style="display:none;padding:8px;border:1px solid #e50914;font-size:12px;margin:8px 0"></div>
<p><b>Your queue</b></p>
<div data-netflix-queue style="padding:8px;border:1px solid #333;min-height:40px"></div>
<script src="../../../../js/immersion-2002.js"></script>
</body>
</html>
""",
    )

    # Google search form + results
    for year in ("2001", "2002"):
        logo = f"../../../../assets/period/{year}/google/logo.gif"
        if not (ROOT / f"assets/period/{year}/google/logo.gif").is_file():
            logo = "../../../../assets/period/2000/google/logo.gif"
        sm = f"../../../../assets/period/{year}/google/logo-sm.gif"
        if not (ROOT / f"assets/period/{year}/google/logo-sm.gif").is_file():
            sm = "../../../../assets/period/2000/google/logo-sm.gif"
        write(
            ROOT / f"years/{year}/sites/google/index.html",
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>Google</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#FFFFFF" text="#000000">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<center>
<img src="{logo}" border="0" alt="Google">
<p style="font-family:Arial;font-size:12px">©{year} Google · leftover habit · not the chip</p>
<form data-google-search action="search.html" method="get" name="f">
<font face="Arial" size="2">Search the web using Google<br></font>
<input type="text" value="" name="q" size="40" title="Search"><br>
<input type="submit" name="btnG" value="Google Search">
<input type="submit" name="btnI" value="I'm feeling lucky" data-google-lucky>
</form>
<p><a href="about.html">About leftover</a></p>
</center>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
""",
        )
        write(
            ROOT / f"years/{year}/sites/google/search.html",
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>Google Search: Results</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body bgcolor="#FFFFFF">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<form data-google-search action="search.html" method="get">
<img src="{sm}" border="0" alt="Google" align="absmiddle">
<input type="text" name="q" size="40">
<input type="submit" name="btnG" value="Google Search">
</form>
<p><font face="arial" size="2">Results for <b data-google-q></b></font></p>
<div data-google-results><p><font face="arial" size="2">Searching…</font></p></div>
<p><a href="index.html">Google Home</a></p>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
""",
        )

    # 3× unique leftover doors (tests + start pop-more)
    write(
        ROOT / "years/2001/sites/moveon/index.html",
        leftover_page(
            "2001",
            "MoveOn leftover",
            "2001 leftover petition door. Not the wiki chip.",
            "moveon",
            "petition leftover",
            "../grok/index.html",
            "Grokster leftover",
        ),
    )
    write(
        ROOT / "years/2001/sites/grok/index.html",
        leftover_page(
            "2001",
            "Grokster leftover",
            "P2P leftover next to dying Napster. No real files. Not the wiki chip.",
            "grok",
            "search leftover",
            "../appleimac/index.html",
            "iMac leftover",
        ),
    )
    write(
        ROOT / "years/2001/sites/appleimac/index.html",
        leftover_page(
            "2001",
            "iMac leftover",
            "Flower / white leftover Mac. Not the iPod chip. Not the wiki chip.",
            "imac",
            "imac leftover",
            "../apple/ipod.html",
            "iPod",
        ),
    )
    write(
        ROOT / "years/2002/sites/fark/index.html",
        leftover_page(
            "2002",
            "Fark leftover",
            "Link leftover. Not the Stumble chip.",
            "fark",
            "headline leftover",
            "../homestar/index.html",
            "Homestar leftover",
        ),
    )
    write(
        ROOT / "years/2002/sites/homestar/index.html",
        leftover_page(
            "2002",
            "Homestar Runner leftover",
            "Flash toon leftover. Not the Stumble chip.",
            "homestar",
            "toon leftover",
            "../blogspot/index.html",
            "Blogspot leftover",
        ),
    )
    write(
        ROOT / "years/2002/sites/blogspot/index.html",
        leftover_page(
            "2002",
            "Blogspot leftover",
            "Hosted Blogger leftover. Pyra still. Not the Stumble chip.",
            "blogspot",
            "blog leftover",
            "../blogger/edit.html",
            "Blogger post",
        ),
    )

    # Guided exactly 6
    sd = ROOT / "ui/year/start-data.js"
    text = sd.read_text(encoding="utf-8")
    b01 = '''  "2001": {
    "href": "../sites/wikipedia/edit.html",
    "label": "★ One-thing · Wikipedia edit REAL",
    "items": [
      "<a href=\\"about.html\\">About 2001</a> — memory · jukebox · monopoly",
      "<a href=\\"../sites/wikipedia/edit.html\\">Wikipedia</a> — preview is not Save",
      "<a href=\\"../sites/archive/index.html\\">Wayback leftover</a> — Oct 24 public",
      "<a href=\\"../sites/itunes/index.html\\">iTunes library leftover</a> — no Store",
      "<a href=\\"../sites/apple/ipod.html\\">iPod leftover</a> — 1,000 songs · $399",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  }'''
    b02 = '''  "2002": {
    "href": "../sites/stumbleupon/index.html",
    "label": "★ One-thing · StumbleUpon REAL",
    "items": [
      "<a href=\\"about.html\\">About 2002</a> — always-on minority · Stumble",
      "<a href=\\"../sites/stumbleupon/index.html\\">StumbleUpon</a> — topic + Stumble",
      "<a href=\\"../sites/isp/index.html\\">Always-on leftover</a> — Pew 21%",
      "<a href=\\"../sites/kazaa/index.html\\">KaZaA leftover</a> — no real files",
      "<a href=\\"../sites/wired/index.html\\">Wired CSS leftover</a> — Oct redesign",
      "<a href=\\"map.html\\">Year flow map</a>"
    ]
  }'''
    text = re.sub(r'  "2001": \{.*?\n  \}', b01, text, count=1, flags=re.S)
    text = re.sub(r'  "2002": \{.*?\n  \}', b02, text, count=1, flags=re.S)
    sd.write_text(text, encoding="utf-8")

    # start-extra: 3× strips + existing directory
    spec = importlib.util.spec_from_file_location("imp", ROOT / "scripts/implement-2001-2002-criteria.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    strips_01 = """<p class="itt-pop3x" data-itt-pop3x="2001"><b>Also popular</b> · <a href="../sites/google/index.html">Google</a> · <a href="../sites/yahoo/index.html">Yahoo</a> · <a href="../sites/cnn/index.html">CNN</a></p>
<p class="itt-pop-more" data-itt-pop-more="2001"><b>3 more leftovers</b> · <a href="../sites/moveon/index.html">MoveOn</a> · <a href="../sites/grok/index.html">Grokster</a> · <a href="../sites/appleimac/index.html">iMac leftover</a></p>
<p class="itt-pop-3x3" data-itt-pop-3x3="2001"><b>3 more leftovers</b> · <a href="../sites/ebay/index.html">eBay leftover</a> · <a href="../sites/paypal/index.html">PayPal leftover</a> · <a href="../sites/excite/index.html">Excite leftover</a></p>
"""
    strips_02 = """<p class="itt-pop3x" data-itt-pop3x="2002"><b>Also popular</b> · <a href="../sites/daypop/index.html">Daypop</a> · <a href="../sites/googlenews/index.html">Google News</a> · <a href="../sites/technorati/index.html">Technorati</a></p>
<p class="itt-pop-more" data-itt-pop-more="2002"><b>3 more leftovers</b> · <a href="../sites/fark/index.html">Fark</a> · <a href="../sites/homestar/index.html">Homestar leftover</a> · <a href="../sites/blogspot/index.html">Blogspot leftover</a></p>
<p class="itt-pop-3x3" data-itt-pop-3x3="2002"><b>3 more leftovers</b> · <a href="../sites/amazon/index.html">Amazon leftover</a> · <a href="../sites/yahoo/index.html">Yahoo leftover</a> · <a href="../sites/blogger/index.html">Blogger leftover</a></p>
"""
    m.replace_js_string_key(ROOT / "ui/year/start-extra.js", "2001", strips_01 + m.forest_start("2001"))
    m.replace_js_string_key(ROOT / "ui/year/start-extra.js", "2002", strips_02 + m.forest_start("2002"))

    # Registry: 2002 needs blogger / technorati / netflix
    reg = ROOT / "js/immersion/registry.js"
    rt = reg.read_text(encoding="utf-8")
    old = '''    "2002": [
      "immersion/stumbleupon.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/amazon.js",
      "immersion/one-thing-machines.js"
    ],'''
    new = '''    "2002": [
      "immersion/stumbleupon.js",
      "immersion/friendster.js",
      "immersion/kazaa.js",
      "immersion/google.js",
      "immersion/yahoo.js",
      "immersion/amazon.js",
      "immersion/blogger.js",
      "immersion/technorati.js",
      "immersion/netflix.js",
      "immersion/one-thing-machines.js"
    ],'''
    if old in rt:
        reg.write_text(rt.replace(old, new), encoding="utf-8")

    print("rooms", m.rebuild_rooms("2001"), m.rebuild_rooms("2002"))
    m.rewrite_map("2001")
    m.rewrite_map("2002")
    print("flows repaired")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
