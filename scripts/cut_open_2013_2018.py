#!/usr/bin/env python3
"""CUT-OPEN lean doors for 2013 and 2018. Official dests + leftover-2× ×2. No dest-farm."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def lo2x(year, slug, key1, key2, trap, next_href, next_label, prefix):
    return f"""<!-- ITT-LO-2X:{slug}:start -->
<section data-lo-panel="1" data-itt-year="{year}" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2×</b> · dest-true · incomplete never writes · <code>itt{prefix}-{key1}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Year leftover. The chip is not this dest.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Empty / trap / 0 ticks never write.</label>
<p>
 <button type="button" data-lo-pick="keep">Leftover {slug}</button>
 <button type="button" data-lo-pick="trap">{trap} (trap)</button>
</p>
<p><label>Leftover honesty<br><input type="text" data-lo-field maxlength="80" placeholder="{slug} leftover" autocomplete="off"></label></p>
<p>
 <button type="button" data-lo-trap>{trap} (trap)</button>
 <button type="button" data-lo-save data-lo-key="{key1}" data-lo-need-pick="keep">Leftover {slug}</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{key1}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</section>
<section data-lo-panel="1" data-itt-year="{year}" style="margin:14px auto;padding:12px;border:1px dashed #666;font-family:Arial,sans-serif;font-size:12px;max-width:46em;background:#fff8dc;color:#111">
<p><b>Leftover 2× #2</b> · dest-true · incomplete never writes · <code>itt{prefix}-{key2}</code></p>
<label style="display:block"><input type="checkbox" data-lo-req> Second leftover path. Not the year star.</label>
<label style="display:block"><input type="checkbox" data-lo-req> Incomplete never writes.</label>
<p>
 <button type="button" data-lo-pick="keep">Leftover {slug} again</button>
 <button type="button" data-lo-pick="trap">{trap} (trap)</button>
</p>
<p><label>Leftover honesty<br><input type="text" data-lo-field maxlength="80" placeholder="{slug} leftover" autocomplete="off"></label></p>
<p>
 <button type="button" data-lo-trap>{trap} (trap)</button>
 <button type="button" data-lo-save data-lo-key="{key2}" data-lo-need-pick="keep">Leftover {slug} again</button>
</p>
<p data-lo-status></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{key2}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</section>
<!-- ITT-LO-2X:{slug}:end -->
"""


def pop3x(year, dest_id, verb, trap, next_href, next_label, prefix, key=None, third=False):
    k = key or dest_id
    suffix = f"pop3-{k}" if third else f"pop-{k}"
    key_attr = f' data-pop-key="{suffix}"' if third else ""
    return f"""<!-- ITT-POP3X:{dest_id}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1" data-itt-lo3x="1" data-itt-year-beat="{year}" style="margin:14px auto;padding:12px;border:1px solid #333;max-width:46em;background:#fff8dc;font-family:Arial,sans-serif;font-size:12px;color:#111">
<p><b>{dest_id} leftover 3×</b> · incomplete never writes · <code>itt{prefix}-{suffix}</code></p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{verb}">{verb}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap} (trap)</button>
</p>
<p><label>{verb}<br><input type="text" data-pop-field placeholder="{verb}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> Incomplete never writes gold.</label>
<p><button type="button" data-pop-go data-pop-id="{dest_id}"{key_attr}>Go leftover</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="itt{prefix}-{suffix}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
<!-- ITT-POP3X:{dest_id}:end -->
"""


def page(year, title, body, css_depth="../../../../", extra_head=""):
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{css_depth}css/period-{year}.css">
{extra_head}
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
{body}
</div>
<script src="{css_depth}js/immersion-{year}.js"></script>
</body></html>
"""


def write(rel, text):
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    return rel


def lean_config(year, rooms, extra):
    room_js = ",\n".join(f'    "{r}"' for r in rooms)
    hints = ",\n".join(
        f'      {{ re: {h["re"]}, path: "{h["path"]}" }}' for h in extra["hints"]
    )
    books = ",\n".join(
        f'      {{ title: "{b["title"]}", path: "{b["path"]}" }}' for b in extra["bookmarks"]
    )
    storage = extra.get("storagePrefix", f"itt{year[2:]}")
    return f"""/**
 * Year config — {year} CUT-OPEN lean door
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};

  var rooms = [
{room_js}
  ];

  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "{extra["homeUrl"]}",
    "pages/about.html": "{extra["homeUrl"]}about.html",
    "pages/map.html": "http://museum.local/years/{year}/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) {{
      urlMap[rooms[i]] = "http://museum.local/years/{year}/" + rooms[i];
    }}
  }}

  ITT.configs["{year}"] = {{
    year: "{year}",
    storagePrefix: "{storage}",
    home: "pages/home.html",
    prefsKey: "itt-{year}-prefs",
    bookmarksKey: "itt-{year}-bookmarks",
    connectedKey: "itt-{year}-connected",
    immersionScript: "js/immersion-{year}.js",
    maximizedDefault: true,
    browserTitleSuffix: "{extra["browserTitleSuffix"]}",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "{extra["connectBrowserLine"]}",
    defaultPrefs: {{
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "{extra["homeUrl"]}",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "{extra["desktopBg"]}"
    }},
    perf: {{
      navJitterMax: 50,
      navFixedMax: 40,
      imageBudgetMs: 360,
      imageMinStepMs: 30,
      imageMaxStepMs: 80,
      imageStartMs: 70,
      connectEarlyMs: 100,
      connectLineMs: 160,
      connectBusyMs: 280,
      connectEndMs: 120,
      connectBusyChance: 0.08
    }},
    urlMap: urlMap,
    bookmarks: [
{books}
    ],
    fallbackUrlBase: "{extra["homeUrl"]}",
    locationHints: [
{hints}
    ]
  }};
}})(typeof window !== "undefined" ? window : this);
"""


def build_2013():
    y = "2013"
    rooms = [
        "index.html",
        "pages/home.html", "pages/about.html", "pages/map.html", "pages/whats-new.html",
        "pages/error/404.html", "pages/error/unreachable.html",
        "sites/vine/record.html", "sites/instagram/video.html", "sites/snapchat/story.html",
        "sites/iphone/ios7.html", "sites/iphone/touchid.html", "sites/snowden/index.html",
        "sites/telegram/index.html", "sites/tumblr/index.html", "sites/windows81/index.html",
        "sites/playable/game.html", "sites/askfm/index.html", "sites/whisper/index.html",
        "sites/youtube/index.html", "sites/reddit/index.html", "sites/facebook/index.html",
        "sites/twitter/index.html", "sites/medium/index.html", "sites/chrome/index.html",
    ]
    write(f"js/config/{y}.js", lean_config(y, rooms, {
        "homeUrl": "http://home.microsoft.com/intl/web2013/",
        "browserTitleSuffix": " - Microsoft Internet Explorer",
        "connectBrowserLine": "Starting Internet Explorer 9.0...",
        "desktopBg": "#165ca8",
        "bookmarks": [
            {"title": "Starting Point", "path": "pages/home.html"},
            {"title": "Vine", "path": "sites/vine/record.html"},
            {"title": "iOS 7", "path": "sites/iphone/ios7.html"},
            {"title": "Stories", "path": "sites/snapchat/story.html"},
        ],
        "hints": [
            {"re": "/vine/i", "path": "sites/vine/record.html"},
            {"re": "/instagram|ig.?video/i", "path": "sites/instagram/video.html"},
            {"re": "/snapchat|stories/i", "path": "sites/snapchat/story.html"},
            {"re": "/ios.?7/i", "path": "sites/iphone/ios7.html"},
            {"re": "/touch.?id|5s/i", "path": "sites/iphone/touchid.html"},
            {"re": "/snowden/i", "path": "sites/snowden/index.html"},
            {"re": "/telegram/i", "path": "sites/telegram/index.html"},
            {"re": "/tumblr|yahoo/i", "path": "sites/tumblr/index.html"},
            {"re": "/windows.?8|win8/i", "path": "sites/windows81/index.html"},
        ],
    }))
    write(f"years/{y}/index.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{y}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 9 residual — 2013</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2013");</script>
<script src="../../js/lib/util.js?v=20260908cutopen"></script>
<script src="../../js/browser-core.js?v=20260908cutopen"></script>
<script src="../../js/config/2013.js?v=20260908cutopen"></script>
<script src="../../js/browser-2013.js?v=20260908cutopen"></script>
</body>
</html>
""")
    write(f"years/{y}/pages/home.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{y}">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2013</title>
<link rel="stylesheet" href="../../../css/period-2013.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#f2f2f2">
<p class="itt-pop3x" data-itt-pop3x="2013" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>Also this year · 3×</b> (not the chip · empty never writes): <a href="../sites/askfm/index.html">Ask.fm leftover</a> · <a href="../sites/whisper/index.html">Whisper leftover</a> · <a href="../sites/youtube/index.html">YouTube leftover</a> · pick + honesty</p>
<p class="itt-pop-3x3" data-itt-pop-3x3="2013" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (not the chip · empty never writes): <a href="../sites/reddit/index.html">Reddit leftover</a> · <a href="../sites/facebook/index.html">Facebook leftover</a> · <a href="../sites/twitter/index.html">Twitter leftover</a> · pick + honesty</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2013");</script>
<script src="../../../js/immersion-2013.js" defer></script>
</body>
</html>
""")
    write(f"years/{y}/pages/about.html", page(y, "About 2013 — 672,985,183 June", """
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2013</h1>
<p><b>The loop is six seconds and the phone goes flat.</b> Vine hold → post. iOS 7 is flat. Snapchat Stories are 24 hours, not IG Stories.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e0f2f1"><th>Cite</th><th>Number</th></tr>
<tr><td>ILS June 2013 websites</td><td><b>672,985,183 (−3%)</b></td></tr>
<tr><td>ILS June 2013 users</td><td><b>2,728,428,107</b></td></tr>
<tr><td>Dec class hostnames</td><td>~861 million — label, do not blend</td></tr>
</table>
<p>Shell is Win7 + IE 9 residual. Win8.1 is a leftover room.</p>
<h2>Bans</h2>
<ul>
<li>IG Stories · TikTok-as-Vine · iPhone 6 · Material · Slack default · WhatsApp-as-star</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read June 672,985,183 (−3%).</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> Vine is 6 seconds. Stories are not IG Stories 2016.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p hidden data-next-flow><b>Next:</b> <a href="../sites/vine/record.html">★ Vine 6s</a></p>
</section>
""", css_depth="../../../"))
    write(f"years/{y}/pages/map.html", page(y, "2013 — UX flow map", """
<h1>2013 flow map</h1>
<ul>
<li><a href="about.html">About</a></li>
<li><a href="../sites/vine/record.html">★ Vine 6s</a></li>
<li><a href="../sites/instagram/video.html">IG Video 15s leftover</a></li>
<li><a href="../sites/snapchat/story.html">Snapchat Stories</a></li>
<li><a href="../sites/iphone/ios7.html">iOS 7</a></li>
<li><a href="../sites/iphone/touchid.html">Touch ID leftover</a></li>
<li><a href="../sites/snowden/index.html">Snowden leftover</a></li>
<li><a href="../sites/telegram/index.html">Telegram leftover</a></li>
<li><a href="../sites/tumblr/index.html">Yahoo×Tumblr leftover</a></li>
<li><a href="../sites/windows81/index.html">Win8.1 leftover</a></li>
<li><a href="../sites/askfm/index.html">Ask.fm leftover 3×</a></li>
<li><a href="../sites/whisper/index.html">Whisper leftover 3×</a></li>
<li><a href="../sites/youtube/index.html">YouTube leftover 3×</a></li>
<li><a href="../sites/reddit/index.html">Reddit leftover 3×</a></li>
<li><a href="../sites/facebook/index.html">Facebook leftover 3×</a></li>
<li><a href="../sites/twitter/index.html">Twitter leftover 3×</a></li>
<li><a href="../sites/playable/game.html">Loop Six</a></li>
</ul>
""", css_depth="../../../"))
    write(f"years/{y}/pages/whats-new.html", page(y, "What's new — 2013", "<h1>What's new — 2013</h1><p>CUT-OPEN lean door. Vine 6s is the chip. Leftover 2× on every dest.</p><p><a href=\"home.html\">Starting Point</a></p>", css_depth="../../../"))
    for err in ("404", "unreachable"):
        write(f"years/{y}/pages/error/{err}.html", page(y, f"{err} leftover — 2013", f"<p class=\"crumb\"><a href=\"../home.html\">Starting Point</a></p><h1>{err} leftover — 2013</h1><p>Museum leftover error room. Not the chip.</p>", css_depth="../../../../"))

    dests = [
        ("sites/vine/record.html", "Vine — hold 6s — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Vine · hold 6 seconds</h1>
<p>24 Jan 2013. Hold then post. 15s / IG Stories never write <code>itt13-vine-posts</code>.</p>
<p class="itt-pixel-failed">[failed-final] Vine mark</p>
<p><button type="button" data-vn13-hold>Hold leftover loop</button> <span data-vn13-clock>0.0 / 6.0</span></p>
<p><button type="button" data-vn13-trap>Record 15s (trap)</button></p>
<p><button type="button" data-vn13-post>Post 6s</button> <span data-vn13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-vine-posts"><b>Next:</b> <a href="../instagram/video.html">IG Video leftover</a></p>
""" + lo2x(y, "vine", "vine-lx", "vine-d2", "Vine-as-15s / IG Stories", "../instagram/video.html", "IG Video leftover", "13")),
        ("sites/instagram/video.html", "Instagram Video leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Instagram Video · 15s leftover</h1>
<p>20 Jun 2013. 15 seconds, not 6. Not Vine gold.</p>
<label><input type="checkbox" data-ig13-req> 15s leftover. Vine is 6s gold.</label>
<label><input type="checkbox" data-ig13-req> Empty never writes.</label>
<p><button type="button" data-ig13-ack>Ack 15s leftover</button> <span data-ig13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-ig-posts"><b>Next:</b> <a href="../snapchat/story.html">Snap Stories</a></p>
""" + lo2x(y, "igv", "igv-lx", "igv-d2", "6s as this / Reels", "../snapchat/story.html", "Snap Stories", "13")),
        ("sites/snapchat/story.html", "Snapchat Stories — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Snapchat Stories · 24h</h1>
<p>3 Oct 2013. Two snaps. IG Stories are 2016.</p>
<p><button type="button" data-sn13-snap="a">Add snap 1</button> <button type="button" data-sn13-snap="b">Add snap 2</button></p>
<p data-sn13-rail>0 snap(s)</p>
<label><input type="checkbox" data-sn13-req> 24h leftover. Not IG Stories.</label>
<label><input type="checkbox" data-sn13-req> Incomplete never writes.</label>
<p><button type="button" data-sn13-ig>IG Stories (trap)</button></p>
<p><button type="button" data-sn13-post>Post Stories leftover</button> <span data-sn13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-snap-story"><b>Next:</b> <a href="../iphone/ios7.html">iOS 7</a></p>
""" + lo2x(y, "snap", "snap-lx", "snap-d2", "IG Stories 2016 as 2013", "../iphone/ios7.html", "iOS 7", "13")),
        ("sites/iphone/ios7.html", "iOS 7 — flat — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>iOS 7 · flat</h1>
<p>18 Sep 2013. Flat, not skeuomorph. Not the chip.</p>
<label><input type="checkbox" data-io13-req> Flat leftover. Not January shell.</label>
<label><input type="checkbox" data-io13-req> iOS 7 is not the star.</label>
<p><button type="button" data-io13-ack>Ack flat leftover</button> <span data-io13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-ios7"><b>Next:</b> <a href="touchid.html">Touch ID</a></p>
""" + lo2x(y, "ios7", "ios7-lx", "ios7-d2", "iOS 7 as chip", "touchid.html", "Touch ID", "13")),
        ("sites/iphone/touchid.html", "Touch ID leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Touch ID leftover</h1>
<p>20 Sep 2013. Face ID is 2017.</p>
<label><input type="checkbox" data-td13-req> Touch ID leftover. Face ID is 2017.</label>
<label><input type="checkbox" data-td13-req> Incomplete never writes.</label>
<p><button type="button" data-td13-ack>Ack Touch ID leftover</button> <span data-td13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-touchid"><b>Next:</b> <a href="../snowden/index.html">Snowden leftover</a></p>
""" + lo2x(y, "tid", "tid-lx", "tid-d2", "Face ID as 2013", "../snowden/index.html", "Snowden leftover", "13")),
        ("sites/snowden/index.html", "Snowden leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Snowden leftover literacy</h1>
<p>June 2013 leftover. Not the chip.</p>
<label><input type="checkbox" data-sd13-req> June leftover literacy.</label>
<label><input type="checkbox" data-sd13-req> Snowden is not gold.</label>
<p><button type="button" data-sd13-ack>Ack leftover</button> <span data-sd13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-snowden-ack"><b>Next:</b> <a href="../telegram/index.html">Telegram leftover</a></p>
""" + lo2x(y, "snow", "snow-lx", "snow-d2", "Snowden as gold", "../telegram/index.html", "Telegram leftover", "13")),
        ("sites/telegram/index.html", "Telegram leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Telegram leftover</h1>
<p>14 Aug 2013. WhatsApp is not the star.</p>
<p><input data-tg13-msg maxlength="80" placeholder="leftover chat"></p>
<label><input type="checkbox" data-tg13-req> Telegram leftover. WhatsApp is 2014.</label>
<label><input type="checkbox" data-tg13-req> Incomplete never writes.</label>
<p><button type="button" data-tg13-wa>WhatsApp-as-star (trap)</button></p>
<p><button type="button" data-tg13-send>Send leftover</button> <span data-tg13-status></span></p>
<p data-tg13-log></p>
<p hidden data-next-flow data-next-when-key="itt13-telegram-chat"><b>Next:</b> <a href="../tumblr/index.html">Yahoo×Tumblr</a></p>
""" + lo2x(y, "tg", "tg-lx", "tg-d2", "WhatsApp-as-star", "../tumblr/index.html", "Yahoo×Tumblr", "13")),
        ("sites/tumblr/index.html", "Yahoo×Tumblr leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Yahoo buys Tumblr leftover</h1>
<p>20 May 2013 · $1.1B. Not 2013 gold.</p>
<label><input type="checkbox" data-tb13-req> Yahoo leftover. Not the chip.</label>
<label><input type="checkbox" data-tb13-req> Incomplete never writes.</label>
<p><button type="button" data-tb13-ack>Ack leftover</button> <span data-tb13-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-tumblr-yahoo"><b>Next:</b> <a href="../windows81/index.html">Win8.1 leftover</a></p>
""" + lo2x(y, "tum", "tum-lx", "tum-d2", "Tumblr as gold", "../windows81/index.html", "Win8.1 leftover", "13")),
        ("sites/windows81/index.html", "Windows 8.1 leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Windows 8.1 leftover</h1>
<p>17 Oct 2013. Start button leftover. January shell stays Win7 + IE 9.</p>
<label><input type="checkbox" data-w813-req> Win8.1 is a room, not January chrome.</label>
<label><input type="checkbox" data-w813-req> Incomplete never writes.</label>
<p><button type="button" data-w813-ack>Ack leftover</button> <span data-w813-status></span></p>
<p hidden data-next-flow data-next-when-key="itt13-win81"><b>Next:</b> <a href="../playable/game.html">Loop Six</a></p>
""" + lo2x(y, "w81", "w81-lx", "w81-d2", "Win8 as January shell", "../playable/game.html", "Loop Six", "13")),
        ("sites/playable/game.html", "Loop Six — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<div data-year-game data-year="2013" data-game-id="loopsix">
<h1>Loop Six</h1>
<p>Year game leftover. Not Vine gold. 15s never scores.</p>
<p>Score <b data-game-score>0</b></p>
<p><button type="button" data-game-start>New loop</button></p>
<p>
 <button type="button" data-peg-city>Beat leftover</button>
 <button type="button" data-peg-trap>15s (trap)</button>
</p>
<p data-itt-action-status>Load never writes.</p>
<p hidden data-next-flow data-next-when-key="itt13-game-loopsix"><b>Next:</b> <a href="../vine/record.html">★ Vine</a></p>
</div>
""" + lo2x(y, "game", "game-lx", "game-d2", "game writes Vine gold", "../askfm/index.html", "Ask.fm leftover", "13")),
        ("sites/askfm/index.html", "Ask.fm leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Ask.fm leftover 3×</h1>
<p>2013 leftover. Formspring is not gold.</p>
""" + pop3x(y, "askfm", "ask leftover", "Formspring as 2013 gold", "../whisper/index.html", "Whisper leftover", "13")
            + lo2x(y, "askfm", "askfm-lx", "askfm-d2", "Formspring as 2013 gold", "../whisper/index.html", "Whisper leftover", "13")),
        ("sites/whisper/index.html", "Whisper leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Whisper leftover 3×</h1>
""" + pop3x(y, "whisper", "whisper leftover", "Secrets as gold", "../youtube/index.html", "YouTube leftover", "13")
            + lo2x(y, "whisper", "wh-lx", "wh-d2", "Secrets as gold", "../youtube/index.html", "YouTube leftover", "13")),
        ("sites/youtube/index.html", "YouTube leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>YouTube leftover 3×</h1>
""" + pop3x(y, "youtube", "youtube leftover", "YouTube as 2013 star", "../../pages/home.html", "Starting Point", "13")
            + lo2x(y, "youtube", "yt-lx", "yt-d2", "YouTube as 2013 star", "../../pages/home.html", "Starting Point", "13")),
        ("sites/reddit/index.html", "Reddit leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Reddit leftover 3×</h1>
<p><button type="button" data-rd13-trap>15 seconds (trap)</button> <span data-pop-status></span></p>
""" + pop3x(y, "reddit", "reddit leftover", "Reddit as gold", "../facebook/index.html", "Facebook leftover", "13", third=True)
            + lo2x(y, "reddit", "rd-lx", "rd-d2", "Reddit as gold", "../facebook/index.html", "Facebook leftover", "13")),
        ("sites/facebook/index.html", "Facebook leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Facebook leftover 3×</h1>
<p><button type="button" data-fb13-trap>Stories 2016 (trap)</button> <span data-pop-status></span></p>
""" + pop3x(y, "facebook", "facebook leftover", "Stories as 2013", "../twitter/index.html", "Twitter leftover", "13", third=True)
            + lo2x(y, "facebook", "fb-lx", "fb-d2", "Stories as 2013", "../twitter/index.html", "Twitter leftover", "13")),
        ("sites/twitter/index.html", "Twitter leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Twitter leftover 3×</h1>
<p>140. 280 is the trap.</p>
<p><button type="button" data-tw13-trap>280 (trap)</button> <span data-pop-status></span></p>
""" + pop3x(y, "twitter", "twitter leftover", "280 as 2013", "../../pages/home.html", "Starting Point", "13", third=True)
            + lo2x(y, "twitter", "tw-lx", "tw-d2", "280 as 2013", "../../pages/home.html", "Starting Point", "13")),
        ("sites/medium/index.html", "Medium leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Medium leftover</h1>
<p><textarea data-med13-draft rows="4" cols="40" placeholder="essay leftover"></textarea></p>
<label><input type="checkbox" data-med13-req> Essay leftover. Not a tweet.</label>
<label><input type="checkbox" data-med13-req> Incomplete never writes.</label>
<p><button type="button" data-med13-tweet>Tweet (trap)</button></p>
<p><button type="button" data-med13-publish>Publish leftover</button> <span data-med13-status></span></p>
""" + lo2x(y, "medium", "med-lx", "med-d2", "tweet as gold", "../chrome/index.html", "Chrome leftover", "13")),
        ("sites/chrome/index.html", "Chrome leftover — 2013", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Chrome habit leftover</h1>
<p><input data-ch13-field maxlength="80" placeholder="habit url"></p>
<button type="button" data-ch13-pick="habit">Keep Chrome habit</button>
<button type="button" data-ch13-ie>IE as 2013 gold (trap)</button>
<label><input type="checkbox" data-ch13-req> Habit leftover. Not January IE as gold.</label>
<label><input type="checkbox" data-ch13-req> Incomplete never writes.</label>
<p><button type="button" data-ch13-ack>Ack habit leftover</button> <span data-ch13-status></span></p>
""" + lo2x(y, "chrome", "ch-lx", "ch-d2", "Chrome as 2008 launch", "../../pages/home.html", "Starting Point", "13")),
    ]
    for rel, title, body in dests:
        write(f"years/{y}/{rel}", page(y, title, body))


def build_2018():
    y = "2018"
    rooms = [
        "index.html",
        "pages/home.html", "pages/about.html", "pages/map.html", "pages/whats-new.html",
        "pages/error/404.html", "pages/error/unreachable.html",
        "sites/gdpr/index.html", "sites/tiktok/fyp.html", "sites/trust/index.html",
        "sites/instagram/igtv.html", "sites/chrome/not-secure.html", "sites/homepod/index.html",
        "sites/spectre/index.html", "sites/fortnite/switch.html", "sites/github/microsoft.html",
        "sites/playable/game.html", "sites/reddit/index.html", "sites/youtube/index.html",
        "sites/wikipedia/index.html",
        "sites/tiktok/index.html", "sites/github/index.html",
    ]
    write(f"js/config/{y}.js", lean_config(y, rooms, {
        "homeUrl": "http://home.microsoft.com/intl/web2018/",
        "browserTitleSuffix": " - Chrome habit",
        "connectBrowserLine": "Starting Chrome habit (museum desktop frame)...",
        "desktopBg": "#0078d7",
        "bookmarks": [
            {"title": "Starting Point", "path": "pages/home.html"},
            {"title": "GDPR Manage", "path": "sites/gdpr/index.html"},
            {"title": "TikTok For You", "path": "sites/tiktok/fyp.html"},
            {"title": "Hearing", "path": "sites/trust/index.html"},
            {"title": "IGTV", "path": "sites/instagram/igtv.html"},
        ],
        "hints": [
            {"re": "/gdpr|cookie|consent|manage|banner/i", "path": "sites/gdpr/index.html"},
            {"re": "/tiktok|fyp|for you|musical/i", "path": "sites/tiktok/fyp.html"},
            {"re": "/hearing|zuckerberg|cambridge|senate/i", "path": "sites/trust/index.html"},
            {"re": "/igtv|reels/i", "path": "sites/instagram/igtv.html"},
            {"re": "/not.?secure|chrome.?68|http/i", "path": "sites/chrome/not-secure.html"},
            {"re": "/homepod/i", "path": "sites/homepod/index.html"},
            {"re": "/spectre|meltdown/i", "path": "sites/spectre/index.html"},
            {"re": "/fortnite|switch/i", "path": "sites/fortnite/switch.html"},
            {"re": "/github/i", "path": "sites/github/microsoft.html"},
        ],
    }))
    write(f"years/{y}/index.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{y}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2018</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2018");</script>
<script src="../../js/lib/util.js?v=20260908cutopen"></script>
<script src="../../js/browser-core.js?v=20260908cutopen"></script>
<script src="../../js/config/2018.js?v=20260908cutopen"></script>
<script src="../../js/browser-2018.js?v=20260908cutopen"></script>
</body>
</html>
""")
    write(f"years/{y}/pages/home.html", f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{y}">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2018</title>
<link rel="stylesheet" href="../../../css/period-2018.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#e3f2fd">
<p class="itt-pop3x" data-itt-pop3x="2018" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>Also this year · 3×</b> (not the chip · empty never writes): <a href="../sites/reddit/index.html">Reddit leftover</a> · <a href="../sites/youtube/index.html">YouTube leftover</a> · <a href="../sites/wikipedia/index.html">Wikipedia leftover</a> · pick + honesty</p>
<p class="itt-pop-3x3" data-itt-pop-3x3="2018" style="font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px"><b>3 more leftovers</b> (not the chip · empty never writes): <a href="../sites/tiktok/index.html">TikTok leftover</a> · <a href="../sites/github/index.html">GitHub leftover</a> · <a href="../sites/homepod/index.html">HomePod leftover</a> · pick + honesty</p>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../js/config/flow-trails.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2018");</script>
<script src="../../../js/immersion-2018.js" defer></script>
</body>
</html>
""")
    write(f"years/{y}/pages/about.html", page(y, "About 2018 — 1,630,322,579 June", """
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2018</h1>
<p><b>The banner is the door.</b> GDPR Manage. Accept All never writes. Users cell is blank.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#e3f2fd"><th>Cite</th><th>Number</th></tr>
<tr><td>ILS June 2018 websites</td><td><b>1,630,322,579 (−8%)</b></td></tr>
<tr><td>Users cell</td><td><b>blank</b> — do not invent</td></tr>
<tr><td>ITU end-2018</td><td><b>51.2% / ~3.9B</b></td></tr>
</table>
<p>Shell: Win10 mass · Chrome habit · EdgeHTML residual.</p>
<h2>Bans</h2>
<ul>
<li>Reels · Meta · COVID · Marshmello · Chromium Edge as default · Face ID as new · Disney+</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read June 1,630,322,579 (−8%). Users cell blank.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> Accept All never writes GDPR.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p hidden data-next-flow><b>Next:</b> <a href="../sites/gdpr/index.html">★ GDPR Manage</a></p>
</section>
""", css_depth="../../../"))
    write(f"years/{y}/pages/map.html", page(y, "2018 — UX flow map", """
<h1>2018 flow map</h1>
<ul>
<li><a href="about.html">About</a></li>
<li><a href="../sites/gdpr/index.html">★ GDPR Manage</a></li>
<li><a href="../sites/tiktok/fyp.html">TikTok For You</a></li>
<li><a href="../sites/trust/index.html">Hearing</a></li>
<li><a href="../sites/instagram/igtv.html">IGTV</a></li>
<li><a href="../sites/chrome/not-secure.html">Chrome 68 Not secure</a></li>
<li><a href="../sites/homepod/index.html">HomePod leftover</a></li>
<li><a href="../sites/spectre/index.html">Spectre leftover</a></li>
<li><a href="../sites/fortnite/switch.html">Fortnite on Switch leftover</a></li>
<li><a href="../sites/github/microsoft.html">GitHub $7.5B leftover</a></li>
<li><a href="../sites/reddit/index.html">Reddit leftover 3×</a></li>
<li><a href="../sites/youtube/index.html">YouTube leftover 3×</a></li>
<li><a href="../sites/wikipedia/index.html">Wikipedia leftover 3×</a></li>
<li><a href="../sites/tiktok/index.html">TikTok leftover 3×</a></li>
<li><a href="../sites/github/index.html">GitHub leftover 3×</a></li>
<li><a href="../sites/homepod/index.html">HomePod leftover 3×</a></li>
<li><a href="../sites/playable/game.html">Consent Dash</a></li>
</ul>
""", css_depth="../../../"))
    write(f"years/{y}/pages/whats-new.html", page(y, "What's new — 2018", "<h1>What's new — 2018</h1><p>CUT-OPEN lean door. GDPR Manage is the chip. Leftover 2× on every dest.</p><p><a href=\"home.html\">Starting Point</a></p>", css_depth="../../../"))
    for err in ("404", "unreachable"):
        write(f"years/{y}/pages/error/{err}.html", page(y, f"{err} leftover — 2018", f"<p class=\"crumb\"><a href=\"../home.html\">Starting Point</a></p><h1>{err} leftover — 2018</h1><p>Museum leftover error room. Not the chip.</p>", css_depth="../../../../"))

    dests = [
        ("sites/gdpr/index.html", "GDPR Manage — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>GDPR Manage</h1>
<p>25 May 2018. Accept All never writes <code>itt18-gdpr</code>.</p>
<p><button type="button" data-gdpr-accept-all>Accept All (trap)</button></p>
<p><button type="button" data-gdpr-manage>Manage</button></p>
<div data-gdpr-panel hidden>
<p>Preferences leftover. Save is the real click.</p>
<p><button type="button" data-gdpr-save>Save preferences</button></p>
</div>
<p data-gdpr-status></p>
<p hidden data-next-flow data-next-when-key="itt18-gdpr"><b>Next:</b> <a href="../tiktok/fyp.html">TikTok For You</a></p>
""" + lo2x(y, "gdpr", "gdpr-lx", "gdpr-d2", "Accept All as save", "../tiktok/fyp.html", "TikTok For You", "18")),
        ("sites/tiktok/fyp.html", "TikTok For You — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>TikTok For You · 2 Aug merge</h1>
<p>musical.ly merges into TikTok. Reels are not 2018.</p>
<p><button type="button" data-fyp-tap="a">Tap leftover 1</button> <button type="button" data-fyp-tap="b">Tap leftover 2</button></p>
<p><button type="button" data-fyp-learn>Learn leftover FYP</button> <span data-fyp-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-tiktok-fyp"><b>Next:</b> <a href="../trust/index.html">Hearing</a></p>
""" + lo2x(y, "tt", "tt-lx", "tt-d2", "Reels / musical.ly-as-gold", "../trust/index.html", "Hearing", "18")),
        ("sites/trust/index.html", "Hearing leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Hearing · 10 Apr</h1>
<p>Zuckerberg sits. Hearing is leftover official, not the chip.</p>
<p><button type="button" data-hear-sit>Sit leftover hearing</button> <span data-hear-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-hearing"><b>Next:</b> <a href="../instagram/igtv.html">IGTV</a></p>
""" + lo2x(y, "hear", "hear-lx", "hear-d2", "Hearing as gold", "../instagram/igtv.html", "IGTV", "18")),
        ("sites/instagram/igtv.html", "IGTV leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>IGTV · 20 Jun</h1>
<p>Not Reels.</p>
<p><label>Episode leftover<br><input type="text" data-igtv-title maxlength="60" placeholder="episode leftover"></label></p>
<p><button type="button" data-igtv-post>Post leftover IGTV</button> <span data-igtv-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-igtv"><b>Next:</b> <a href="../chrome/not-secure.html">Chrome 68</a></p>
""" + lo2x(y, "igtv", "igtv-lx", "igtv-d2", "Reels as 2018", "../chrome/not-secure.html", "Chrome 68", "18")),
        ("sites/chrome/not-secure.html", "Chrome 68 Not secure — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Chrome 68 · Not secure</h1>
<p>HTTP leftover literacy. Edge is not the default.</p>
<p><button type="button" data-ns-ack>Ack leftover Not secure</button> <span data-ns-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-not-secure"><b>Next:</b> <a href="../homepod/index.html">HomePod leftover</a></p>
""" + lo2x(y, "ns", "ns-lx", "ns-d2", "Edge as default", "../homepod/index.html", "HomePod leftover", "18")),
        ("sites/homepod/index.html", "HomePod leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>HomePod leftover · $349</h1>
<p>9 Feb 2018 ship. Not the chip.</p>
<p><button type="button" data-hp-reserve>Reserve leftover</button> <span data-hp-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-homepod"><b>Next:</b> <a href="../spectre/index.html">Spectre leftover</a></p>
""" + pop3x(y, "homepod", "homepod leftover", "HomePod as chip", "../spectre/index.html", "Spectre leftover", "18", third=True)
            + lo2x(y, "hp", "hp-lx", "hp-d2", "HomePod as chip", "../spectre/index.html", "Spectre leftover", "18")),
        ("sites/spectre/index.html", "Spectre leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Spectre leftover literacy</h1>
<p>No exploit. Literacy only.</p>
<p><button type="button" data-sp-ack>Ack leftover</button> <span data-sp-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-spectre"><b>Next:</b> <a href="../fortnite/switch.html">Fortnite on Switch</a></p>
""" + lo2x(y, "sp", "sp-lx", "sp-d2", "exploit / live PoC", "../fortnite/switch.html", "Fortnite on Switch", "18")),
        ("sites/fortnite/switch.html", "Fortnite on Switch leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Fortnite on Switch leftover</h1>
<p>12 Jun 2018. Not 2018 gold.</p>
<p><button type="button" data-fns-drop>Drop leftover</button> <span data-fns-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-fn-switch"><b>Next:</b> <a href="../github/microsoft.html">GitHub $7.5B</a></p>
""" + lo2x(y, "fns", "fns-lx", "fns-d2", "Fortnite as 2018 gold", "../github/microsoft.html", "GitHub $7.5B", "18")),
        ("sites/github/microsoft.html", "GitHub $7.5B leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>GitHub leftover · Microsoft $7.5B</h1>
<p>Copilot is not 2018.</p>
<p><button type="button" data-gh-ack>Ack leftover</button> <span data-gh-status></span></p>
<p hidden data-next-flow data-next-when-key="itt18-github"><b>Next:</b> <a href="../playable/game.html">Consent Dash</a></p>
""" + lo2x(y, "gh", "gh-lx", "gh-d2", "Copilot as 2018", "../playable/game.html", "Consent Dash", "18")),
        ("sites/playable/game.html", "Consent Dash — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<div data-year-game data-year="2018" data-game-id="consentdash">
<h1>Consent Dash</h1>
<p>Year game leftover. Accept All never writes GDPR.</p>
<p>Score <b data-game-score>0</b></p>
<p><button type="button" data-game-start>New dash</button></p>
<p hidden data-next-flow data-next-when-key="itt18-game-consentdash"><b>Next:</b> <a href="../gdpr/index.html">★ GDPR Manage</a></p>
</div>
""" + lo2x(y, "game", "game-lx", "game-d2", "game writes GDPR", "../reddit/index.html", "Reddit leftover", "18")),
        ("sites/reddit/index.html", "Reddit leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Reddit leftover 3×</h1>
""" + pop3x(y, "reddit", "reddit leftover", "Reddit as gold", "../youtube/index.html", "YouTube leftover", "18")
            + lo2x(y, "reddit", "rd-lx", "rd-d2", "Reddit as gold", "../youtube/index.html", "YouTube leftover", "18")),
        ("sites/youtube/index.html", "YouTube leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>YouTube leftover 3×</h1>
""" + pop3x(y, "youtube", "youtube leftover", "YouTube as gold", "../wikipedia/index.html", "Wikipedia leftover", "18")
            + lo2x(y, "youtube", "yt-lx", "yt-d2", "YouTube as gold", "../wikipedia/index.html", "Wikipedia leftover", "18")),
        ("sites/wikipedia/index.html", "Wikipedia leftover — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>Wikipedia leftover 3×</h1>
""" + pop3x(y, "wikipedia", "wikipedia leftover", "Wiki as gold", "../../pages/home.html", "Starting Point", "18")
            + lo2x(y, "wikipedia", "wk-lx", "wk-d2", "Wiki as gold", "../../pages/home.html", "Starting Point", "18")),
        ("sites/tiktok/index.html", "TikTok leftover 3× — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>TikTok leftover 3×</h1>
<p>Official For You gold is <a href="fyp.html">fyp.html</a>. This dest is leftover 3×.</p>
""" + pop3x(y, "tiktok", "tiktok leftover", "Reels as 2018", "../github/index.html", "GitHub leftover", "18", third=True)
            + lo2x(y, "tt3", "tt3-lx", "tt3-d2", "Reels as 2018", "../github/index.html", "GitHub leftover", "18")),
        ("sites/github/index.html", "GitHub leftover 3× — 2018", """
<p class="crumb"><a href="../../pages/home.html">Starting Point</a></p>
<h1>GitHub leftover 3×</h1>
<p>Official $7.5B gold is <a href="microsoft.html">microsoft.html</a>. This dest is leftover 3×.</p>
""" + pop3x(y, "github", "github leftover", "Copilot as 2018", "../homepod/index.html", "HomePod leftover", "18", third=True)
            + lo2x(y, "gh3", "gh3-lx", "gh3-d2", "Copilot as 2018", "../homepod/index.html", "HomePod leftover", "18")),
    ]
    for rel, title, body in dests:
        write(f"years/{y}/{rel}", page(y, title, body))


if __name__ == "__main__":
    build_2013()
    build_2018()
    print("CUT-OPEN lean doors written")
