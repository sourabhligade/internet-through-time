#!/usr/bin/env python3
"""Implement 2003 CUT-FOREST year-true door from the 2026-08-30 freeze.

Does not git-checkout the old forest. Does not invent brand pixels
(failed-final 1x1 GIFs + README). Empty / trap never write.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2003"

# 1x1 gray GIF — failed-final placeholder, not a brand mark
GIF = bytes.fromhex(
    "47494638396101000100800000cccccc00000021f90401000000002c00000000010001000002024401003b"
)

GUIDED = [
    '<a href="about.html">About 2003</a> — hotlink · 99¢ · blogs',
    '<a href="../sites/photobucket/index.html">Photobucket</a> — upload · empty never writes',
    '<a href="../sites/itunes/index.html">iTunes Store leftover</a> — 99¢ · Mac+US',
    '<a href="../sites/wordpress/index.html">WordPress leftover</a> — 0.7 self-host',
    '<a href="../sites/linkedin/index.html">LinkedIn leftover</a> — May 5 career graph',
    '<a href="map.html">Year flow map</a>',
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text if text.endswith("\n") else text + "\n", encoding="utf-8")


def gif(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(GIF)


def page(title: str, body: str, css_extra: str = "") -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2003.css">
{css_extra}
</head>
<body bgcolor="#fff" text="#111" link="#003399" vlink="#551a8b">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
{body}
<script src="../../../../js/immersion-2003.js"></script>
</body>
</html>
"""


def leftover_box(key: str, verb: str, field_id: str, ph: str, next_href: str, next_label: str, extra: str = "") -> str:
    return f"""
<div class="itt-verb" style="margin:14px 0;padding:10px;border:1px solid #333;max-width:46em;background:#fff;font-family:Arial,sans-serif;font-size:13px">
<label style="display:block"><input type="checkbox" data-req> {verb}</label>
<label style="display:block"><input type="checkbox" data-req> Empty / trap never writes</label>
<p><input type="text" id="{field_id}" maxlength="80" placeholder="{ph}"></p>
<p>
 <button type="button" data-itt-real-save data-storage-key="{key}" data-min-req="2" data-requires="[data-req]" data-require-field="#{field_id}" data-require-field-min="2">Save leftover</button>
 <button type="button" data-itt-trap>Trap</button>
 <span data-itt-action-status></span>
</p>
{extra}
<p hidden data-next-flow data-next-when-key="itt03-{key}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
"""


def crumb(*pairs: tuple[str, str]) -> str:
    bits = [f'<a href="{h}">{lab}</a>' for h, lab in pairs]
    return '<p class="crumb">' + " · ".join(bits) + "</p>"


def write_tree() -> list[str]:
    rooms: list[str] = []

    def add(rel: str, html: str) -> None:
        write(Y / rel, html)
        rooms.append(rel)

    # —— shell / pages ——
    write(
        Y / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Internet Explorer 6.0 — 2003</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2003");</script>
<script src="../../js/lib/util.js?v=20260830ui"></script>
<script src="../../js/browser-core.js?v=20260830ui"></script>
<script src="../../js/config/2003.js?v=20260830ui"></script>
<script src="../../js/browser-2003.js?v=20260830ui"></script>
</body>
</html>
""",
    )

    add(
        "pages/home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2003</title>
<link rel="stylesheet" href="../../../css/period-2003.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#3a6ea5">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2003");</script>
<script src="../../../js/immersion-2003.js" defer></script>
</body>
</html>
""",
    )

    add(
        "pages/about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<title>About the Web in 2003</title>
<link rel="stylesheet" href="../../../css/period-2003.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>About 2003</h1>
<p>Internet Live Stats June <b>40,912,332</b> websites (+6%) · <b>778,555,680</b> users · <b>19</b> users/site. Birthmarks <b>WordPress</b> + <b>LinkedIn</b> — leftover, not the chip.</p>
<p>Netcraft June hostnames <b>40,912,332</b> · active <b>18,898,830</b> — do not blend users into hostnames.</p>
<p>Photobucket (8 May) is the save. <b>iTunes</b> Store 99¢ is leftover. <b>MySpace</b> is an August seed. Friendster is still larger (~3M fall).</p>
<p>Facemash (late October, Harvard) is a footnote only — not a product room. Gmail / thefacebook / Firefox 1.0 / YouTube are 2004–05.</p>
<label><input type="checkbox" data-req data-thesis-req> Photobucket is the 2003 save</label>
<label><input type="checkbox" data-req data-thesis-req> Store is 99¢ DRM, not streaming</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button>
<span data-itt-action-status></span></p>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-2003.js"></script>
</body>
</html>
""",
    )

    add(
        "pages/map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<title>2003 — UX flow map</title>
<link rel="stylesheet" href="../../../css/period-2003.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>2003 flow map</h1>
<p>Official 10. Gold is Photobucket. Empty upload never writes.</p>
<ol data-itt-ten-flows>
<li><a href="../sites/photobucket/index.html">Photobucket</a> → iTunes Store</li>
<li><a href="../sites/itunes/index.html">iTunes Store</a> → WordPress</li>
<li><a href="../sites/wordpress/index.html">WordPress</a> → LinkedIn</li>
<li><a href="../sites/linkedin/index.html">LinkedIn</a> → MySpace</li>
<li><a href="../sites/myspace/index.html">MySpace</a> → Friendster</li>
<li><a href="../sites/friendster/index.html">Friendster mass</a> → AdSense</li>
<li><a href="../sites/adsense/index.html">AdSense</a> → Bloglines</li>
<li><a href="../sites/bloglines/index.html">Bloglines</a> → Blogger</li>
<li><a href="../sites/blogger/index.html">Blogger-Google</a> → Gags Lite</li>
<li><a href="../sites/playable/game.html">Gags Lite</a></li>
</ol>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-2003.js"></script>
</body>
</html>
""",
    )

    add(
        "pages/whats-new.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<title>What's New — 2003</title>
<link rel="stylesheet" href="../../../css/period-2003.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>What's New — 2003</h1>
<p>Photobucket · iTunes Music Store 99¢ · WordPress 0.7 · LinkedIn · MySpace seed · AdSense self-serve.</p>
<p><a href="home.html">← Starting Point</a></p>
<script src="../../../js/immersion-2003.js"></script>
</body>
</html>
""",
    )

    for name, msg in (
        ("pages/error/404.html", "That page is not in the 2003 exhibit."),
        ("pages/error/unreachable.html", "Host unreachable (museum theater)."),
    ):
        add(
            name,
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head><meta charset="utf-8"><title>Error</title>
<link rel="stylesheet" href="../../../../css/period-2003.css"></head>
<body bgcolor="#fff"><div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<h1>Error</h1><p>{msg}</p>
<p><a href="../home.html">Starting Point</a></p>
<script src="../../../../js/immersion-2003.js"></script>
</body></html>
""",
        )

    # —— STAR Photobucket ——
    add(
        "sites/photobucket/index.html",
        page(
            "Photobucket — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("../../pages/about.html", "About 2003"))
            + """
<h1>Photobucket</h1>
<p>Launched <b>May 8, 2003</b> · Alex Welch + Darren Crystal. Upload a filename. Get a hotlink URL for forums, blogs, eBay, Craigslist.</p>
<p>Empty filename never writes. No CDN. This browser only.</p>
<form data-pb-upload>
<p><label>Filename / title<br>
<input type="text" name="file" id="ott-field" maxlength="80" placeholder="vacation.jpg"></label></p>
<label style="display:block"><input type="checkbox" data-pb-req> Hotlink leftover · no real CDN</label>
<p><button type="submit">Upload</button>
<button type="button" data-itt-trap>2017 $99 paywall (trap)</button>
<span data-pb-status data-itt-action-status></span></p>
</form>
<div data-pb-album></div>
<div data-pb-codes></div>
<p hidden data-next-flow data-next-when-key="itt03-photobucket"><b>Next:</b> <a href="../itunes/index.html">iTunes Store leftover</a></p>
<p><a href="album.html">Second album leftover</a> · <a href="codes.html">Hotlink codes</a></p>
""",
        ),
    )
    add(
        "sites/photobucket/album.html",
        page(
            "Photobucket album leftover",
            crumb(("index.html", "Photobucket"), ("../../pages/home.html", "Start"))
            + "<h1>Second album leftover</h1><p>Not the gold key.</p>"
            + leftover_box("pb-lx", "Second album leftover · not itt03-photobucket", "f-pb-lx", "album leftover", "../itunes/index.html", "Store"),
        ),
    )
    add(
        "sites/photobucket/codes.html",
        page(
            "Photobucket codes",
            crumb(("index.html", "Photobucket"), ("../../pages/home.html", "Start"))
            + "<h1>Hotlink codes</h1><div data-pb-codes></div><p><a href='index.html'>← Upload</a></p>",
        ),
    )

    # —— iTunes Store ——
    add(
        "sites/itunes/index.html",
        page(
            "iTunes Music Store — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("browse.html", "Browse"))
            + """
<div class="itunes-store">
<h1>iTunes Music Store</h1>
<p><b>April 28, 2003</b> · <b>99¢</b> a song · no subscription. AAC 128 kbps + FairPlay DRM. <b>Mac OS X + iTunes 4</b> · <b>U.S. billing</b>. 200,000+ songs. 30-second previews. Burn personal CDs. Unlimited iPods. Up to 3 Macs.</p>
<p>Windows + gifts + Allowance = <a href="windows.html">October 16 residual</a>. Not streaming. Not Spotify.</p>
<form data-itunes-buy>
<p><label>Track title<br><input type="text" name="title" maxlength="80" placeholder="Let It Snow"></label></p>
<p><label>Artist<br><input type="text" name="artist" maxlength="80" placeholder="Frank Sinatra"></label></p>
<label style="display:block"><input type="checkbox" data-itunes-req> 99¢ FairPlay theater — no real AAC</label>
<label style="display:block"><input type="checkbox" data-itunes-req> Mac + US billing leftover</label>
<p><button type="submit">Buy 99¢</button>
<button type="button" data-itt-trap>Stream now (trap)</button>
<span data-itunes-status data-itt-action-status></span></p>
</form>
<div data-itunes-library></div>
<p><a href="browse.html">Browse leftover</a> · <a href="library.html">Library</a> · <a href="fairplay.html">FairPlay</a></p>
<p hidden data-next-flow data-next-when-key="itt03-itunes-library"><b>Next:</b> <a href="../wordpress/index.html">WordPress</a></p>
</div>
""",
        ),
    )
    add(
        "sites/itunes/browse.html",
        page(
            "iTunes browse leftover",
            crumb(("index.html", "Store"), ("../../pages/home.html", "Start"))
            + "<h1>Browse leftover</h1><p>Genre / artist / album theater. 99¢. Mac+US first.</p>"
            + leftover_box("itunes-99", "99¢ browse leftover · Mac+US", "f-it99", "genre leftover", "index.html", "Store"),
        ),
    )
    add(
        "sites/itunes/library.html",
        page(
            "iTunes library",
            crumb(("index.html", "Store"), ("../../pages/home.html", "Start"))
            + "<h1>Library</h1><div data-itunes-library></div><p>Buy from the store page. Empty buy never writes.</p>",
        ),
    )
    add(
        "sites/itunes/fairplay.html",
        page(
            "FairPlay leftover",
            crumb(("index.html", "Store"), ("../../pages/home.html", "Start"))
            + "<h1>FairPlay leftover</h1><p>DRM AAC. Own-file with limits. Not a free stream. 3 computers at launch.</p>",
        ),
    )
    add(
        "sites/itunes/windows.html",
        page(
            "iTunes for Windows leftover",
            crumb(("index.html", "Store"), ("../../pages/home.html", "Start"))
            + "<h1>Windows residual · 16 Oct 2003</h1><p>XP / 2000 + iTunes 4.1. 13 million songs sold by then. Same 99¢. Gifts + Allowance. Still U.S. billing.</p>"
            + leftover_box("itunes-win", "Windows residual · not the April gold screen", "f-itwin", "windows leftover", "index.html", "Store"),
        ),
    )

    # —— WordPress ——
    add(
        "sites/wordpress/index.html",
        page(
            "WordPress — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
            + """
<h1>WordPress</h1>
<p><b>May 27, 2003</b> v0.7. Matt Mullenweg + Mike Little. Official branch of <b>b2/cafelog</b>. Semantic personal publishing. PHP/MySQL self-host. GPL. Not Gutenberg.</p>
<p><a href="download.html">Download</a> · <a href="install.html">Install wizard</a> · <a href="dashboard.html">Dashboard</a></p>
""",
        ),
    )
    add(
        "sites/wordpress/about.html",
        page(
            "WordPress about leftover",
            crumb(("index.html", "WordPress"), ("../../pages/home.html", "Start"))
            + "<h1>About 0.7 leftover</h1><p>b2 fork. Empty title never writes on the dashboard.</p>"
            + leftover_box("wp-lx", "0.7 leftover · official b2 branch", "f-wplx", "b2 leftover", "dashboard.html", "Dashboard"),
        ),
    )
    add(
        "sites/wordpress/download.html",
        page(
            "WordPress download",
            crumb(("index.html", "WordPress"), ("install.html", "Install"))
            + """
<h1>Download leftover</h1>
<p>WordPress 0.7 Gold. This click is theater — it does not write.</p>
<p><button type="button" data-wp-install>Download wordpress-0.7.zip (theater)</button>
<span data-wp-install-status></span></p>
<p>Then run the <a href="install.html">3-step install</a>.</p>
""",
        ),
    )
    add(
        "sites/wordpress/install.html",
        page(
            "WordPress install",
            crumb(("index.html", "WordPress"), ("dashboard.html", "Dashboard"))
            + """
<h1>Install wizard</h1>
<div data-wp-install-root>
<p>Step <b data-wp-step-num>1</b> of 3</p>
<div data-wp-step="1"><p>Create wp-config leftover (PHP/MySQL).</p><p><button type="button" data-wp-next>Next</button></p></div>
<div data-wp-step="2" style="display:none"><p>Create tables leftover.</p><p><button type="button" data-wp-next>Next</button></p></div>
<div data-wp-step="3" style="display:none"><p>Installed (this browser only).</p></div>
<p data-wp-install-status></p>
</div>
""",
        ),
    )
    add(
        "sites/wordpress/dashboard.html",
        page(
            "WordPress dashboard",
            crumb(("index.html", "WordPress"), ("../../pages/home.html", "Start"))
            + """
<h1>Write a post · 0.7</h1>
<form data-wp-publish>
<p><label>Title<br><input type="text" name="title" maxlength="80"></label></p>
<p><label>Body<br><textarea name="body" rows="5" cols="48"></textarea></label></p>
<p><button type="submit">Publish</button>
<button type="button" data-itt-trap>Gutenberg (trap)</button>
<span data-wp-status data-itt-action-status></span></p>
</form>
<div data-wp-posts></div>
<p hidden data-next-flow data-next-when-key="itt03-wp-posts"><b>Next:</b> <a href="../linkedin/index.html">LinkedIn</a></p>
""",
        ),
    )
    add(
        "sites/wordpress/post.html",
        page(
            "WordPress posts",
            crumb(("dashboard.html", "Dashboard"), ("index.html", "WordPress"))
            + "<h1>Posts</h1><div data-wp-posts></div>",
        ),
    )

    # —— LinkedIn ——
    add(
        "sites/linkedin/index.html",
        page(
            "LinkedIn — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
            + """
<div data-li-root>
<h1>LinkedIn</h1>
<p>Founded Dec 10, 2002 in Reid Hoffman's living room. Launched <b>May 5, 2003</b>. Professional network — not dating.</p>
<p><b data-li-name>You</b> · <span data-li-title>Professional</span> · <span data-li-company>—</span></p>
<p><button type="button" data-li-connect data-name="Reid Hoffman" data-title="Founder">Connect Reid leftover</button></p>
<div data-li-connections></div>
<p><a href="invite.html">Invite leftover</a> · <a href="profile.html">Edit profile</a> · <a href="connections.html">Connections</a></p>
</div>
""",
        ),
    )
    add(
        "sites/linkedin/about.html",
        page(
            "LinkedIn about",
            crumb(("index.html", "LinkedIn"), ("../../pages/home.html", "Start"))
            + "<h1>About leftover</h1><p>Careers, not Friendster. Sequoia late 2003. 1 million users is August 2004.</p>",
        ),
    )
    add(
        "sites/linkedin/profile.html",
        page(
            "LinkedIn profile",
            crumb(("index.html", "LinkedIn"), ("invite.html", "Invite"))
            + """
<div data-li-root>
<h1>Profile leftover</h1>
<form data-li-profile-form>
<p><label>Name<br><input name="name"></label></p>
<p><label>Title<br><input name="title"></label></p>
<p><label>Company<br><input name="company"></label></p>
<p><button type="submit">Save profile</button> <span data-li-status></span></p>
</form>
</div>
""",
        ),
    )
    add(
        "sites/linkedin/invite.html",
        page(
            "LinkedIn invite",
            crumb(("index.html", "LinkedIn"), ("../../pages/home.html", "Start"))
            + """
<div data-li-root>
<h1>Invite leftover</h1>
<p>Empty name never writes.</p>
<form data-li-invite>
<p><label>Name<br><input name="name"></label></p>
<p><label>Title<br><input name="title"></label></p>
<p><button type="submit">Invite</button>
<button type="button" data-itt-trap>Dating graph (trap)</button>
<span data-li-invite-status data-itt-action-status></span></p>
</form>
<div data-li-connections></div>
<p hidden data-next-flow data-next-when-key="itt03-li-connections"><b>Next:</b> <a href="../myspace/index.html">MySpace</a></p>
</div>
"""
            + leftover_box("li-invite", "Invite leftover hop", "f-li", "name leftover", "index.html", "LinkedIn"),
        ),
    )
    add(
        "sites/linkedin/connections.html",
        page(
            "LinkedIn connections",
            crumb(("index.html", "LinkedIn"), ("invite.html", "Invite"))
            + "<div data-li-root><h1>Connections</h1><div data-li-connections></div></div>",
        ),
    )

    # —— MySpace ——
    add(
        "sites/myspace/index.html",
        page(
            "MySpace — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
            + """
<div class="myspace-shell" data-myspace-root>
<h1>MySpace</h1>
<p>August 2003 seed (wiki Aug 1 · Angwin Aug 15). <b>Meet your friends' friends.</b> Still ~100k by October. Friendster is still larger (~3M).</p>
<p><b data-myspace-display>You</b> · <span data-myspace-headline>New MySpace user</span> · mood <span data-myspace-mood>:-)</span></p>
<p data-myspace-about>Edit your profile — HTML vibes welcome.</p>
<div data-pb-hotlinks></div>
<p><button type="button" data-pb-apply>Apply Photobucket hotlink</button> <span data-pb-apply-status></span></p>
<h2>Top 8</h2>
<form data-ms-top8>
"""
            + "".join(
                f'<p>Slot {i+1} <select data-ms-top8-slot><option value="">(empty)</option>'
                + "".join(f'<option value="f{j}">Friend {j}</option>' for j in range(1, 13))
                + "</select></p>"
                for i in range(8)
            )
            + """
<p><button type="button" data-ms-top8-save>Save Top 8</button>
<span data-ms-top8-status data-itt-action-status></span></p>
</form>
<h2>Comments</h2>
<div data-myspace-comments></div>
<form data-myspace-comment-form>
<p><input name="who" placeholder="who"> <input name="text" placeholder="comment">
<button type="submit">Comment</button></p>
</form>
<p><a href="profile.html">Profile</a> · <a href="invite.html">Invite</a> · <a href="friends.html">Friends</a> · <a href="about.html">About</a></p>
<p hidden data-next-flow data-next-when-key="itt03-ms-top8"><b>Next:</b> <a href="../friendster/index.html">Friendster mass</a></p>
</div>
""",
        ),
    )
    add(
        "sites/myspace/about.html",
        page(
            "MySpace About",
            crumb(("index.html", "MySpace"), ("../../pages/home.html", "Start"))
            + """
<div class="myspace-shell">
<h1>About Us</h1>
<p><b>MySpace is an online community that lets you meet your friends' friends.</b></p>
<p>Share photos, journals and interests. See who knows who. Six people away from Kevin Bacon.</p>
<p>MySpace is for everyone: friends · singles · families · classmates · long-lost friends.</p>
<p>We are a new site, developing new features as fast as we can. August 2003.</p>
</div>
"""
            + leftover_box("ms-friends", "Friends' friends leftover · HTML profiles", "f-ms", "invite leftover", "index.html", "MySpace"),
        ),
    )
    add(
        "sites/myspace/profile.html",
        page(
            "MySpace profile",
            crumb(("index.html", "MySpace"), ("../../pages/home.html", "Start"))
            + """
<div data-myspace-root>
<h1>Your Space</h1>
<form data-myspace-profile-form>
<p><label>Display<br><input name="display"></label></p>
<p><label>Headline<br><input name="headline"></label></p>
<p><label>About (HTML leftover)<br><textarea name="about" rows="4" cols="40"></textarea></label></p>
<p><label>Mood<br><input name="mood"></label></p>
<p><button type="submit">Save profile</button> <span data-myspace-status></span></p>
</form>
</div>
""",
        ),
    )
    add(
        "sites/myspace/invite.html",
        page(
            "MySpace invite",
            crumb(("index.html", "MySpace"), ("../../pages/home.html", "Start"))
            + """
<div data-myspace-root>
<h1>Invite leftover</h1>
<form data-myspace-invite-form>
<p><label>Email<br><input name="email"></label></p>
<p><label>Message<br><input name="message"></label></p>
<p><button type="submit">Invite</button> <span data-myspace-invite-status></span></p>
</form>
<div data-myspace-invites></div>
</div>
""",
        ),
    )
    add(
        "sites/myspace/friends.html",
        page(
            "MySpace friends",
            crumb(("index.html", "MySpace"), ("../../pages/home.html", "Start"))
            + "<div data-myspace-root><h1>Friends leftover</h1><p>Tom is the default first friend. Friendster is still larger in 2003.</p></div>",
        ),
    )

    # —— Friendster mass ——
    add(
        "sites/friendster/index.html",
        page(
            "Friendster — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
            + """
<h1>Friendster</h1>
<p>Founded 2002 by Jonathan Abrams. Public mass often <b>March 2003</b> (~3 million by fall). Still larger than MySpace. Slow. Fakester bans.</p>
<p data-friendster-name></p>
<p data-friendster-about></p>
<ul data-friendster-friends></ul>
<p><a href="friends.html">Add a friend leftover</a> · <a href="profile.html">Edit profile</a></p>
""",
        ),
    )
    add(
        "sites/friendster/about.html",
        page(
            "Friendster about",
            crumb(("index.html", "Friendster"), ("../../pages/home.html", "Start"))
            + "<h1>About leftover</h1><p>Founded 2002. Mass year is 2003. Google $30M offer 2003 declined — About literacy.</p>",
        ),
    )
    add(
        "sites/friendster/profile.html",
        page(
            "Friendster profile",
            crumb(("index.html", "Friendster"), ("friends.html", "Friends"))
            + """
<form data-friendster-profile-form>
<p><label>Display name<br><input name="name"></label></p>
<p><label>About<br><input name="about"></label></p>
<p><label>Location<br><input name="location"></label></p>
<p><button type="submit">Save profile</button> <span data-friendster-status></span></p>
</form>
""",
        ),
    )
    add(
        "sites/friendster/friends.html",
        page(
            "Friendster friends",
            crumb(("index.html", "Friendster"), ("../../pages/home.html", "Start"))
            + """
<h1>Add a friend leftover</h1>
<ul data-friendster-friends></ul>
<form data-friendster-add-form>
<p><label>Name<br><input name="fname"></label></p>
<p><label>About<br><input name="fabout"></label></p>
<p><button type="submit">Add friend</button>
<button type="button" data-itt-trap>MySpace already #1 (trap)</button>
<span data-friendster-status data-itt-action-status></span></p>
</form>
<p hidden data-next-flow data-next-when-key="itt03-fs-mass"><b>Next:</b> <a href="../adsense/index.html">AdSense</a></p>
"""
            + leftover_box("fs-mass", "Mass 2003 leftover · still larger than MySpace", "f-fs", "circle leftover", "../adsense/index.html", "AdSense"),
        ),
    )

    # —— AdSense ——
    add(
        "sites/adsense/index.html",
        page(
            "Google AdSense — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("code.html", "Code"))
            + """
<h1>Google AdSense</h1>
<p><b>June 18, 2003</b> self-serve. Text AdWords on content pages. CPC. Cut-and-paste HTML. English sites. Relevant text ads, not pop-ups.</p>
<form data-adsense-signup>
<p><label>Site URL<br><input name="site" placeholder="http://gawker.com/"></label></p>
<p><button type="submit">Apply</button>
<button type="button" data-itt-trap>Pop-up network (trap)</button>
<span data-adsense-status data-itt-action-status></span></p>
</form>
<pre data-adsense-code></pre>
<p data-adsense-earnings></p>
<p><a href="code.html">Code leftover</a></p>
<p hidden data-next-flow data-next-when-key="itt03-adsense"><b>Next:</b> <a href="../bloglines/index.html">Bloglines</a></p>
""",
        ),
    )
    add(
        "sites/adsense/code.html",
        page(
            "AdSense code leftover",
            crumb(("index.html", "AdSense"), ("../../pages/home.html", "Start"))
            + "<h1>Cut-paste leftover</h1><pre data-adsense-code></pre>"
            + leftover_box("adsense-lx", "Snippet leftover hop", "f-ads", "pub leftover", "index.html", "AdSense"),
        ),
    )

    # —— Bloglines ——
    add(
        "sites/bloglines/index.html",
        page(
            "Bloglines — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("feeds.html", "Feeds"))
            + """
<div data-bloglines-root>
<h1>Bloglines</h1>
<p>Free browser RSS. <b>No installation</b>. Runs on our servers. © 2003 Trustic, Inc. Mid-2003.</p>
<form data-bloglines-add>
<p><label>Feed URL<br><input name="url" placeholder="http://wordpress.org/development/feed/"></label></p>
<p><label>Title<br><input name="title" placeholder="WordBlog"></label></p>
<p><button type="submit">Subscribe</button>
<button type="button" data-itt-trap>Fetch live RSS (trap)</button>
<span data-bloglines-status data-itt-action-status></span></p>
</form>
<div data-bloglines-feeds></div>
<p><a href="reader.html">Reader leftover</a> · <a href="feeds.html">Feeds leftover</a></p>
<p hidden data-next-flow data-next-when-key="itt03-bloglines-feeds"><b>Next:</b> <a href="../blogger/index.html">Blogger</a></p>
</div>
""",
        ),
    )
    add(
        "sites/bloglines/reader.html",
        page(
            "Bloglines reader",
            crumb(("index.html", "Bloglines"), ("../../pages/home.html", "Start"))
            + "<div data-bloglines-root><h1>Reader leftover</h1><div data-bloglines-feeds></div></div>",
        ),
    )
    add(
        "sites/bloglines/feeds.html",
        page(
            "Bloglines feeds leftover",
            crumb(("index.html", "Bloglines"), ("../../pages/home.html", "Start"))
            + "<div data-bloglines-root><h1>Feeds leftover</h1><div data-bloglines-feeds></div></div>"
            + leftover_box("bloglines", "Subscribe leftover hop", "f-bl", "feed leftover", "index.html", "Bloglines"),
        ),
    )

    # —— Blogger Google ——
    add(
        "sites/blogger/index.html",
        page(
            "Blogger — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
            + """
<h1>Blogger (Google)</h1>
<p>Google acquired Pyra Labs <b>February 17, 2003</b> (Guardian 18 Feb). This room is Blogger-by-Google. Not still-only-Pyra. Not 2020 UI.</p>
<p><a href="edit.html">Write a post leftover</a></p>
""",
        ),
    )
    add(
        "sites/blogger/about.html",
        page(
            "Blogger about",
            crumb(("index.html", "Blogger"), ("../../pages/home.html", "Start"))
            + "<h1>About leftover</h1><p>February 2003 acquisition. Gillmor Feb 15 column pair.</p>"
            + leftover_box("blogger-g", "Google-owned February 2003 leftover", "f-bg", "pyra leftover", "edit.html", "Edit"),
        ),
    )
    add(
        "sites/blogger/edit.html",
        page(
            "Blogger edit",
            crumb(("index.html", "Blogger"), ("view.html", "View"))
            + """
<form data-blogger-post>
<p><label>Title<br><input name="title"></label></p>
<p><label>Body<br><textarea name="body" rows="6" cols="48"></textarea></label></p>
<p><button type="submit">Publish</button>
<button type="button" data-itt-trap>2020 UI (trap)</button>
<span data-blogger-status data-itt-action-status></span></p>
</form>
""",
        ),
    )
    add(
        "sites/blogger/view.html",
        page(
            "Blogger view",
            crumb(("edit.html", "Edit"), ("index.html", "Blogger"))
            + "<h1>View leftover</h1><div id='blogger-view' data-blogger-view></div>",
        ),
    )

    # —— Firebird / phoenix (authenticity) ——
    add(
        "sites/phoenix/index.html",
        page(
            "Firebird leftover — 2003",
            crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
            + """
<h1>Mozilla Firebird leftover</h1>
<p>Phoenix 0.1 shipped <b>September 23, 2002</b>. Renamed <b>Firebird</b> 15 April 2003 (Phoenix Technologies). Firefox name is 9 Feb 2004. Firefox 1.0 is 9 Nov 2004. Mass default stays IE 6.</p>
"""
            + leftover_box("firebird", "Firebird download tick · not Firefox 1.0", "f-fb", "firebird leftover", "../flash/index.html", "Flash"),
        ),
    )
    add(
        "sites/phoenix/about.html",
        page(
            "Firebird about",
            crumb(("index.html", "Firebird"), ("../../pages/home.html", "Start"))
            + "<h1>About leftover</h1><p>Phoenix 2002 · Firebird 2003 · Firefox 2004. Do not ship the 1.0 wordmark as 2003 default.</p>",
        ),
    )
    add(
        "sites/firebird/index.html",
        page(
            "Firebird leftover hop",
            crumb(("../phoenix/index.html", "Phoenix/Firebird"), ("../../pages/home.html", "Start"))
            + "<h1>Firebird leftover hop</h1><p>Same path as phoenix. Not Firefox 1.0.</p>"
            + leftover_box("firebird-lx", "Firebird hop leftover", "f-fb2", "fx leftover", "../phoenix/index.html", "Firebird"),
        ),
    )

    # —— CNN music wire ——
    add(
        "sites/cnn/index.html",
        page(
            "CNN leftover — 2003",
            crumb(("../../pages/home.html", "Start"), ("tech.html", "Tech"))
            + "<h1>CNN leftover</h1><p>Costume news. See <a href='tech.html'>tech wire</a> for 99¢ vs KaZaA.</p>",
        ),
    )
    add(
        "sites/cnn/tech.html",
        page(
            "CNN tech — 99¢ vs P2P",
            crumb(("index.html", "CNN"), ("../../pages/home.html", "Start"))
            + "<h1>Music wire leftover</h1><p>Apple's iTunes Music Store sells songs for <b>99¢</b>. KaZaA is still the wild leftover. Legal download vs P2P theater. Not streaming.</p>",
        ),
    )
    add(
        "sites/cnn/about.html",
        page(
            "CNN about",
            crumb(("index.html", "CNN"), ("../../pages/home.html", "Start"))
            + "<h1>About leftover</h1><p>2003 costume wire. Not the chip.</p>",
        ),
    )

    # —— leftover literacy dests ——
    leftover_dests = [
        (
            "skype",
            "Skype leftover",
            "<p>Public beta <b>29 August 2003</b>. Sky + peer. P2P voice. No real PSTN. eBay 2005 is later.</p>",
            "skype",
            "call leftover",
        ),
        (
            "4chan",
            "4chan leftover literacy",
            "<p>Launched <b>October 1, 2003</b> as 4chan.net. Literacy leftover only. No illegal costume. No exploit.</p>",
            "4chan-lx",
            "literacy leftover",
        ),
        (
            "delicious",
            "del.icio.us leftover",
            "<p>First version <b>September 2003</b> (Joshua Schachter). Tags. Folksonomy leftover. Yahoo 2005 is later.</p>",
            "delicious",
            "tag leftover",
        ),
        (
            "hi5",
            "hi5 leftover",
            "<p>Launched <b>June 27, 2003</b> (wiki). Friendster-class leftover. Not gold.</p>",
            "hi5",
            "hi5 leftover",
        ),
        (
            "flash",
            "Flash / FWA leftover",
            "<p>Peak Flash. Skip Intro leftover. FWA / tokyoplastic class. Not a dest that plays a SWF payload.</p>",
            "flash-fwa",
            "skip leftover",
        ),
        (
            "wikipedia",
            "Wikipedia leftover",
            "<p>2001 star leftover in 2003. Anyone can edit is last year's chip.</p>",
            "wiki-lx",
            "wiki leftover",
        ),
        (
            "google",
            "Google leftover",
            "<p>Sparse search leftover. Buys Blogger in February. AdSense in June. Not the chip.</p>",
            "google",
            "lucky leftover",
        ),
        (
            "kazaa",
            "KaZaA leftover",
            "<p>Still wild in 2003. Contrast the 99¢ Store. No real files.</p>",
            "kazaa-q",
            "search leftover",
        ),
    ]
    for slug, title, blurb, key, ph in leftover_dests:
        extra = ""
        if slug == "delicious":
            extra = """
<form data-delicious-post>
<p><label>URL<br><input name="url"></label></p>
<p><label>Title<br><input name="title"></label></p>
<p><label>Tags<br><input name="tags"></label></p>
<p><button type="submit">Post bookmark</button> <span data-delicious-status></span></p>
</form>
<div data-delicious-list></div>
"""
        if slug == "google":
            extra = """
<form data-google-search action="search.html">
<p><input name="q"> <button type="submit">Google Search</button></p>
</form>
"""
        add(
            f"sites/{slug}/index.html",
            page(
                title,
                crumb(("../../pages/home.html", "← Starting Point"), ("about.html", "About"))
                + f"<h1>{title}</h1>{blurb}{extra}"
                + leftover_box(key, title + " · not the chip", f"f-{slug}", ph, "../../pages/map.html", "Map"),
            ),
        )
        add(
            f"sites/{slug}/about.html",
            page(
                title + " about",
                crumb(("index.html", slug), ("../../pages/home.html", "Start"))
                + f"<h1>About leftover</h1>{blurb}",
            ),
        )
    add(
        "sites/google/search.html",
        page(
            "Google results leftover",
            crumb(("index.html", "Google"), ("../../pages/home.html", "Start"))
            + "<h1>Results leftover</h1><p>Sparse 2003 costume. Not the portal default.</p>",
        ),
    )
    add(
        "sites/google/about.html",
        page(
            "Google about",
            crumb(("index.html", "Google"), ("../../pages/home.html", "Start"))
            + "<h1>About leftover</h1><p>Blogger Feb · AdSense Jun. Not Gmail.</p>",
        ),
    )

    # portals costume
    for slug, title, blurb in (
        (
            "amazon",
            "Amazon smile leftover",
            "<p>2000 smile costume rewritten for 2003. Not a 24-book dump. Cart leftover.</p>",
        ),
        (
            "yahoo",
            "Yahoo portal leftover",
            "<p>Mass visits leftover. 2003 costume hop. Not the chip.</p>",
        ),
    ):
        add(
            f"sites/{slug}/index.html",
            page(
                title,
                crumb(("../../pages/home.html", "Start"), ("about.html", "About"))
                + f"<h1>{title}</h1>{blurb}<p><a href='about.html'>About</a></p>"
                + leftover_box(slug[:3] if slug == "amazon" else "yahoo", title, f"f-{slug}", "portal leftover", "../../pages/map.html", "Map"),
            ),
        )
        add(
            f"sites/{slug}/about.html",
            page(
                title + " about",
                crumb(("index.html", slug), ("../../pages/home.html", "Start")) + f"<h1>About</h1>{blurb}",
            ),
        )
    add(
        "sites/amazon/cart.html",
        page(
            "Amazon cart leftover",
            crumb(("index.html", "Amazon"), ("../../pages/home.html", "Start"))
            + "<h1>Cart leftover</h1><p>2003 costume. Smile continuity.</p>",
        ),
    )
    add(
        "sites/yahoo/news.html",
        page(
            "Yahoo news leftover",
            crumb(("index.html", "Yahoo"), ("../../pages/home.html", "Start"))
            + "<h1>News leftover</h1><p>2003 portal costume.</p>",
        ),
    )

    # playable
    add(
        "sites/playable/index.html",
        page(
            "2003 cabinet",
            crumb(("../../pages/home.html", "Start"), ("game.html", "Gags Lite"))
            + '<h1>2003 cabinet</h1><p><a href="game.html">Gags Lite</a> · <a href="famous.html">Famous</a></p><div data-year-playable data-year="2003"></div>',
        ),
    )
    add(
        "sites/playable/game.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2003" data-official-key="itt03-game-gagslite">
<head>
<meta charset="utf-8">
<title>Gags Lite — 2003</title>
<link rel="stylesheet" href="../../../../css/period-2003.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#fff" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-year="2003" data-game-id="gagslite">
<p><a href="index.html">← Cabinet</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>Gags Lite</h1>
<p class="yg-honesty">Toontown-class leftover · not the Photobucket chip · not Disney IP</p>
<p>You <b data-php>30</b> · Enemy <b data-ehp>30</b></p>
<p><button type="button" data-game-start>Start fight</button>
<button type="button" data-gag="pie">Pie</button>
<button type="button" data-gag="seltzer">Seltzer</button>
<button type="button" data-gag="anvil">Anvil</button>
<button type="button" data-gag="cupcake">Cupcake</button></p>
<pre data-log></pre>
<p data-itt-action-status>Press Start fight. Incomplete start never writes.</p>
<p hidden data-next-flow data-next-when-key="itt03-game-gagslite"><b>Next:</b> <a href="../photobucket/index.html">Photobucket</a></p>
</div>
<script src="../../../../js/immersion-2003.js"></script>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-2003-gagslite.js"></script>
</body>
</html>
""",
    )
    rooms.append("sites/playable/game.html")

    extra_games = [
        ("famous.html", "Famous leftover", "year-2003-top8.js", "top8"),
        ("game-2.html", "99¢ tap leftover", "year-2003-it99.js", "it99"),
        ("game-3.html", "WP publish leftover", "year-2003-wppub.js", "wppub"),
        ("game-4.html", "LinkedIn leftover", "year-2003-licon.js", "licon"),
        ("game-5.html", "Skype leftover", "year-2003-skypenote.js", "skypenote"),
        ("extra-a.html", "Gag hand leftover", "year-2003-gaghand.js", "gaghand"),
        ("extra-b.html", "iTunes tap leftover", "year-2003-itunestap.js", "itunestap"),
        ("extra-c.html", "Top 8 note leftover", "year-2003-top8note.js", "top8note"),
        ("extra-d.html", "Top 8 swap leftover", "year-2003-top8swap.js", "top8swap"),
        ("extra-e.html", "del.icio.us leftover", "year-2003-delnote.js", "delnote"),
        ("extra-f.html", "Point click leftover", "year-2003-pointclick.js", "pointclick"),
        ("extra-g.html", "Kol turn leftover", "year-2003-kolturn.js", "kolturn"),
        ("extra-h.html", "99 leftover", "year-2003-ninetynine.js", "ninetynine"),
        ("extra-i.html", "Gag hand 2 leftover", "year-2003-gaghand.js", "gaghand2"),
        ("more-a.html", "More leftover A", "year-2003-top8.js", "morea"),
        ("more-b.html", "More leftover B", "year-2003-it99.js", "moreb"),
        ("more-c.html", "More leftover C", "year-2003-wppub.js", "morec"),
        ("more-d.html", "More leftover D", "year-2003-licon.js", "mored"),
    ]
    for fn, title, script, gid in extra_games:
        add(
            f"sites/playable/{fn}",
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2003">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2003.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#fff">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game" data-year-game data-year="2003" data-game-id="{gid}">
<p><a href="index.html">← Cabinet</a></p>
<h1>{title}</h1>
<p>Leftover cabinet. Not the Photobucket chip. Famous = 2 (Gags Lite + this row's peer).</p>
<p><button type="button" data-game-start>Play leftover</button></p>
<p data-itt-action-status></p>
</div>
<script src="../../../../js/immersion-2003.js"></script>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/{script}"></script>
</body>
</html>
""",
        )

    return rooms


def write_assets() -> None:
    base = ROOT / "assets" / "period" / "2003"
    for slug in ("myspace", "itunes", "wordpress", "linkedin", "adsense", "photobucket", "bloglines", "friendster"):
        gif(base / slug / "logo.gif")
    gif(base / "myspace" / "friend1.gif")
    gif(base / "itunes" / "badge-99.gif")
    write(
        base / "README-PIXELS.txt",
        """2003 period pixels — honesty

All logo.gif / friend1.gif / badge-99.gif in this folder are 1x1 gray
failed-final placeholders. They are NOT Wayback captures and NOT authentic
brand marks. Do not invent Tom, Apple, 99¢ badge art, LinkedIn in, or WP W.

July harvest tagged Tom + badge-99 failed-final. Re-harvest WA/WDM/GUIdebook
or keep these placeholders.
""",
    )


def write_css() -> None:
    write(
        ROOT / "css" / "period-2003.css",
        """/* 2003 document styles — Windows XP · IE 6 · Photobucket · Store 99¢ */
@import url("period-2002.css");

.myspace-shell {
  max-width: 720px;
  margin: 8px auto;
  font-family: Arial, sans-serif;
  font-size: 13px;
  background: #e5e5ff;
  padding: 10px;
  border: 1px solid #669;
}
.itunes-store {
  max-width: 720px;
  margin: 8px auto;
  font-family: Lucida Grande, Arial, sans-serif;
  font-size: 13px;
  background: #f4f4f4;
  padding: 12px;
  border: 1px solid #999;
}
.itunes-price { color: #080; font-weight: bold; }
""",
    )


def write_js_stubs(rooms: list[str]) -> None:
    rooms_js = ",\n    ".join(json.dumps(r) for r in rooms)
    write(
        ROOT / "js" / "config" / "2003.js",
        f"""/**
 * Year config — 2003 from-scratch (CUT-FOREST year-true)
 */
(function (global) {{
  "use strict";
  var ITT = global.ITT || (global.ITT = {{}});
  ITT.configs = ITT.configs || {{}};

  var rooms = [
    {rooms_js}
  ];

  var urlMap = {{
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2003/",
    "pages/about.html": "http://home.microsoft.com/intl/web2003/about.html",
    "pages/map.html": "http://museum.local/years/2003/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  }};
  var i;
  for (i = 0; i < rooms.length; i++) {{
    if (!urlMap[rooms[i]]) {{
      urlMap[rooms[i]] = "http://museum.local/years/2003/" + rooms[i];
    }}
  }}

  ITT.configs["2003"] = {{
    year: "2003",
    home: "pages/home.html",
    prefsKey: "itt-2003-prefs",
    bookmarksKey: "itt-2003-bookmarks",
    connectedKey: "itt-2003-connected",
    immersionScript: "js/immersion-2003.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · broadband rising · 56k residual (museum)",
    connectBrowserLine: "Starting Internet Explorer 6.0...",
    defaultPrefs: {{
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 40,
      homeUrl: "http://home.microsoft.com/intl/web2003/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#3a6ea5"
    }},
    urlMap: urlMap
  }};
}})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "js" / "config" / "immersion-2003.js",
        """/**
 * Immersion config — 2003
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2003"] = {
    year: "2003",
    storagePrefix: "itt03",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      photobucket: true,
      itunes: true,
      wordpress: true,
      linkedin: true,
      myspace: true,
      friendster: true,
      adsense: true,
      bloglines: true,
      blogger: true,
      delicious: true,
      google: true
    },
    navSubtitle: "2003 · XP · IE6 · Photobucket",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Photobucket", href: "sites/photobucket/index.html", match: "/photobucket/" },
      { label: "Store", href: "sites/itunes/index.html", match: "/itunes/" },
      { label: "WordPress", href: "sites/wordpress/index.html", match: "/wordpress/" },
      { label: "LinkedIn", href: "sites/linkedin/index.html", match: "/linkedin/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "About 2003", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
""",
    )
    write(
        ROOT / "js" / "immersion-2003.js",
        """/**
 * Immersion year stub — 2003
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2003";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
""",
    )
    write(
        ROOT / "js" / "browser-2003.js",
        """/**
 * Browser year stub — 2003
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2003");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2003"]) {
    console.error("ITT 2003 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2003"]);
})();
""",
    )


def patch_text(path: Path, old: str, new: str) -> None:
    t = path.read_text(encoding="utf-8")
    if old not in t:
        raise SystemExit(f"patch miss in {path}: {old[:80]!r}")
    path.write_text(t.replace(old, new, 1), encoding="utf-8")


def patch_wiring() -> None:
    # registry
    patch_text(
        ROOT / "js" / "immersion" / "registry.js",
        '      "immersion/one-thing-machines.js"\n    ],\n    "2004": [',
        """      "immersion/one-thing-machines.js"
    ],
    "2003": [
      "immersion/photobucket.js",
      "immersion/itunes.js",
      "immersion/wordpress.js",
      "immersion/linkedin.js",
      "immersion/myspace.js",
      "immersion/friendster.js",
      "immersion/adsense.js",
      "immersion/bloglines.js",
      "immersion/blogger.js",
      "immersion/delicious.js",
      "immersion/google.js",
      "immersion/one-thing-machines.js"
    ],
    "2004": [""",
    )

    # start-data
    items = ",\n      ".join(json.dumps(x) for x in GUIDED)
    patch_text(
        ROOT / "ui" / "year" / "start-data.js",
        '        "2004": {',
        """  "2003": {
    "href": "../sites/photobucket/index.html",
    "label": "★ One-thing · Photobucket upload REAL",
    "items": [
      """
        + items
        + """
    ]
  },
        "2004": {""",
    )

    extra = r"""<p class="itt-pop3x" data-itt-pop3x="2003"><b>Also popular</b> · <a href="../sites/skype/index.html">Skype</a> · <a href="../sites/delicious/index.html">del.icio.us</a> · <a href="../sites/hi5/index.html">hi5</a></p>
<p class="itt-pop-more" data-itt-pop-more="2003"><b>3 more leftovers</b> · <a href="../sites/flash/index.html">Flash leftover</a> · <a href="../sites/phoenix/index.html">Firebird leftover</a> · <a href="../sites/4chan/index.html">4chan literacy</a></p>
<p class="itt-pop-3x3" data-itt-pop-3x3="2003"><b>3 more leftovers</b> · <a href="../sites/amazon/index.html">Amazon leftover</a> · <a href="../sites/yahoo/index.html">Yahoo leftover</a> · <a href="../sites/blogger/index.html">Blogger leftover</a></p>
<p class="itt-mass-honesty" data-itt-mass="2003" style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;background:#fff8dc;border:1px solid #c90;max-width:48em"><b>40,912,332</b> June sites. Photobucket is the save. MySpace is seed. iTunes is 99¢ leftover. WordPress + LinkedIn are ILS birthmarks. AdSense funds blogs. Friendster is still larger.</p>
<p class="itt-felt-trail">Upload first: <a href="../sites/photobucket/index.html">Photobucket</a> — empty never writes. Then <a href="../sites/itunes/index.html">iTunes Store</a>.</p>
<table class="itt-start" cellpadding="0" cellspacing="0" border="0">
<tr><td class="itt-start-title"><b>Starting Point — 2003</b><span class="itt-start-meta"> · Windows XP · Internet Explorer 6 · 40,912,332 sites</span></td></tr>
<tr><td class="itt-start-thesis">
 <b>Upload a photo to hotlink it.</b> iTunes Store 99¢ · WordPress 0.7 · LinkedIn · MySpace seed · AdSense leftover.
</td></tr>
</table>
"""
    # inject START_EXTRA 2003 before 2004
    se = ROOT / "ui" / "year" / "start-extra.js"
    t = se.read_text(encoding="utf-8")
    if '"2003"' not in t.split("START_EXTRA", 1)[-1][:8000]:
        t = t.replace('\n  "2004":', '\n  "2003": ' + json.dumps(extra) + ',\n  "2004":', 1)
        se.write_text(t, encoding="utf-8")

    # flow-trails
    patch_text(
        ROOT / "js" / "config" / "flow-trails.js",
        '                "2004": [',
        """    "2003": [
      {"n": 1, "name": "Photobucket", "href": "sites/photobucket/index.html", "match": "/photobucket/", "whenKey": "itt03-photobucket", "nextHref": "sites/itunes/index.html", "nextLabel": "iTunes Store"},
      {"n": 2, "name": "iTunes Store", "href": "sites/itunes/index.html", "match": "/itunes/", "whenKey": "itt03-itunes-library", "nextHref": "sites/wordpress/index.html", "nextLabel": "WordPress"},
      {"n": 3, "name": "WordPress", "href": "sites/wordpress/dashboard.html", "match": "/wordpress/", "whenKey": "itt03-wp-posts", "nextHref": "sites/linkedin/index.html", "nextLabel": "LinkedIn"},
      {"n": 4, "name": "LinkedIn", "href": "sites/linkedin/invite.html", "match": "/linkedin/", "whenKey": "itt03-li-connections", "nextHref": "sites/myspace/index.html", "nextLabel": "MySpace"},
      {"n": 5, "name": "MySpace", "href": "sites/myspace/index.html", "match": "/myspace/", "whenKey": "itt03-ms-top8", "nextHref": "sites/friendster/index.html", "nextLabel": "Friendster"},
      {"n": 6, "name": "Friendster mass", "href": "sites/friendster/friends.html", "match": "/friendster/", "whenKey": "itt03-fs-mass", "nextHref": "sites/adsense/index.html", "nextLabel": "AdSense"},
      {"n": 7, "name": "AdSense", "href": "sites/adsense/index.html", "match": "/adsense/", "whenKey": "itt03-adsense", "nextHref": "sites/bloglines/index.html", "nextLabel": "Bloglines"},
      {"n": 8, "name": "Bloglines", "href": "sites/bloglines/index.html", "match": "/bloglines/", "whenKey": "itt03-bloglines-feeds", "nextHref": "sites/blogger/index.html", "nextLabel": "Blogger"},
      {"n": 9, "name": "Blogger-Google", "href": "sites/blogger/edit.html", "match": "/blogger/", "whenKey": "itt03-blog", "nextHref": "sites/playable/game.html", "nextLabel": "Gags Lite"},
      {"n": 10, "name": "Gags Lite", "href": "sites/playable/game.html", "match": "/playable/", "whenKey": "itt03-game-gagslite", "nextHref": "sites/photobucket/index.html", "nextLabel": "Photobucket"}
    ],
                "2004": [""",
    )

    # year-playable
    patch_text(
        ROOT / "js" / "config" / "year-playable.js",
        '                "2004": {',
        """    "2003": {
      id: "gagslite",
      title: "Gags Lite",
      href: "game.html",
      key: "itt03-game-gagslite",
      inspire: "Toontown-class gags leftover",
      blurb: "Start a fight. Land a gag. Incomplete start never writes.",
      why: "2003 leftover cabinet. Star stays Photobucket.",
      era: "XP + IE6. 99¢ songs. Friendster still larger.",
      famous: "Gags Lite + Top 8 leftover",
      accent: "#3366cc"
    },
                "2004": {""",
    )

    # layers
    patch_text(
        ROOT / "js" / "immersion" / "layers.js",
        '    "2003": { machine: "Windows XP · Internet Explorer 6", star: "MySpace / iTunes", starHref: "sites/myspace/index.html", game: "Gag Lite" },',
        '    "2003": { machine: "Windows XP · Internet Explorer 6", star: "Photobucket", starHref: "sites/photobucket/index.html", game: "Gags Lite" },',
    )

    # years.js
    years = ROOT / "ui" / "year" / "years.js"
    yt = years.read_text(encoding="utf-8")
    if '"2003"' not in yt:
        block = """  "2003": {
    "title": "Internet Explorer 6.0 — 2003",
    "css": ["win95-netscape.css", "ie5-overrides.css"],
    "bodyClass": "year-2003 os-winxp browser-ie6",
    "boot": "browser-2003.js",
    "dir": [
      {"go": "pages/home.html", "label": "Start"},
      {"go": "sites/photobucket/index.html", "label": "Photobucket"},
      {"go": "sites/itunes/index.html", "label": "Store"},
      {"go": "sites/wordpress/index.html", "label": "WordPress"},
      {"go": "sites/linkedin/index.html", "label": "LinkedIn"},
      {"go": "sites/myspace/index.html", "label": "MySpace"},
      {"go": "sites/friendster/index.html", "label": "Friendster"},
      {"go": "sites/adsense/index.html", "label": "AdSense"},
      {"go": "sites/bloglines/index.html", "label": "Bloglines"},
      {"go": "sites/yahoo/index.html", "label": "Yahoo!"},
      {"go": "pages/about.html", "label": "About"}
    ],
    "chrome": "2003",
    "toolbar": "ie",
    "family": "ie",
    "location": "http://home.microsoft.com/intl/web2003/",
    "prefHome": "http://home.microsoft.com/intl/web2003/",
    "yearLabel": "2003 · Windows XP · Internet Explorer 6",
    "windowTitle": "Welcome to the World Wide Web — Microsoft Internet Explorer",
    "connectH2": "Network Connections",
    "connectBtn": "Connect (always-on rising)",
    "skipBtn": "Skip connect",
    "thesis": "2003 thesis: Photobucket · 99¢ Store leftover · WP + LinkedIn leftover. No Gmail. No Facebook.",
    "openLoc": "Open Location in Internet Explorer:",
    "aboutHtml": "<p><b>Microsoft Internet Explorer</b></p><p>Version 6.0</p>",
    "startBanner": "Windows<b>XP</b>",
    "taskBtn": "Internet Explorer",
    "icon": "e",
    "aria": "Internet Explorer 6",
    "locLabel": "Address",
    "bookmarksTitle": "Favorites",
    "mailPh": "friend@aol.com",
    "hasTaskbar": true,
    "maximized": true
  },
"""
        yt = yt.replace('        "2004": {', block + '        "2004": {', 1)
        years.write_text(yt, encoding="utf-8")

    # SHIP_YEARS
    for rel in ("scripts/itt_gate.py", "scripts/check-all-years.py"):
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        t = t.replace('_WIPED = {"2003", "2025"}', '_WIPED = {"2025"}')
        p.write_text(t, encoding="utf-8")

    cay = ROOT / "scripts" / "check-all-years.py"
    ct = cay.read_text(encoding="utf-8")
    ct = ct.replace(
        '"2003": ["pages/home.html", "sites/myspace/index.html", "sites/itunes/index.html", "sites/wordpress/index.html"],',
        '"2003": ["pages/home.html", "sites/photobucket/index.html", "sites/myspace/index.html", "sites/itunes/index.html", "sites/wordpress/index.html"],',
    )
    cay.write_text(ct, encoding="utf-8")


def unlock_hub() -> None:
    idx = ROOT / "index.html"
    t = idx.read_text(encoding="utf-8")
    card = """      <a class="year-card available y2003" href="years/2003/" data-year="2003">
        <div class="motif" aria-hidden="true"></div>
        <div class="year-card-inner">
          <div class="year-row">
            <p class="year">2003</p>
            <span class="era-chip">Photobucket · 99¢</span>
          </div>
          <p class="label">Upload a photo to hotlink it. iTunes Store 99¢, WordPress, LinkedIn leftover. Friendster still larger than MySpace.</p>
          <p class="scale">40,912,332 sites · 778,555,680 users (Live Stats, June)</p>
          <p class="meta">Enter immersion</p>
        </div>
      </a>

"""
    t = re.sub(
        r'      <div class="closed-rooms" aria-label="Closed year 2003">.*?</div>\n    </div>',
        card.rstrip() + "\n    </div>",
        t,
        count=1,
        flags=re.S,
    )
    t = t.replace("2003 and 2025 wiped for rebuild", "2025 boarded · 2003 Photobucket live")
    t = t.replace("2003 and 2025 wiped", "2025 boarded")
    idx.write_text(t, encoding="utf-8")

    for rel in ("atlas/index.html", "404.html"):
        p = ROOT / rel
        if p.is_file():
            s = p.read_text(encoding="utf-8")
            s = s.replace("2003 and 2025 boarded", "2025 boarded")
            s = s.replace("2003 and 2025 are boarded", "2025 is boarded")
            p.write_text(s, encoding="utf-8")


def write_docs() -> None:
    rf = ROOT / "docs" / "2003-READ-FIRST.md"
    rf.write_text(
        """# 2003 — READ FIRST (**CUT-FOREST LIVE**)

**Date:** 2026-08-30
**Status:** **Criteria forest on disk** (named leftover 18 year-true · not a 2002 clone). Prefix `itt03`. Star = Photobucket upload · empty filename never writes.

Do **not** `git checkout` the old forest.

| | |
|--|--|
| Prefix | `itt03-*` |
| Star | Photobucket · `itt03-photobucket` |
| Shell | XP + IE 6 |
| Cut | **CUT-FOREST** year-true mix |

**Harvest:** [`2003-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-30.md`](2003-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-30.md)  
**Goals · phases · flows · minute:** [`2003-FROM-SCRATCH-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md`](2003-FROM-SCRATCH-GOALS-PHASES-FLOWS-MINUTE-2026-08-30.md)
""",
        encoding="utf-8",
    )
    dt = ROOT / "docs" / "DISK-TRUTH.md"
    t = dt.read_text(encoding="utf-8")
    t = t.replace("**2003 and 2025 wiped**", "**2025 wiped** · **2003 live** (Photobucket)")
    t = t.replace(
        "| **2003** | **Wiped** · hub locked · no year tree |",
        "| **2003** | Live forest (criteria) · Photobucket upload `itt03-photobucket` · named leftover 18 year-true |",
    )
    dt.write_text(t, encoding="utf-8")


def write_e2e() -> None:
    write(
        ROOT / "e2e" / "2003-flows.spec.js",
        """// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion } = require('./helpers');

test.describe('2003 flows', () => {
  test('star Photobucket empty never writes', async ({ page }) => {
    await enterYear(page, '2003');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.locator('a[href*="photobucket"]').first().click();
    await page.waitForTimeout(400);
    const f = contentFrame(page);
    await f.locator('button[type="submit"]').first().click();
    const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.indexOf('itt03-photobucket') === 0));
    expect(keys).toEqual([]);
  });

  test('star Photobucket upload writes itt03-photobucket', async ({ page }) => {
    await enterYear(page, '2003');
    await waitForImmersion(page, '2003');
    const frame = contentFrame(page);
    await frame.goto('/years/2003/sites/photobucket/index.html');
    await page.waitForTimeout(300);
    const f = contentFrame(page);
    await f.locator('[name="file"], #ott-field').first().fill('vacation.jpg');
    await f.locator('form[data-pb-upload] button[type="submit"]').click();
    await page.waitForTimeout(300);
    const raw = await page.evaluate(() => localStorage.getItem('itt03-photobucket'));
    expect(raw).toBeTruthy();
    const rec = JSON.parse(raw);
    expect(rec.real).toBeTruthy();
    expect(rec.year).toBe('2003');
  });

  test('official 10 list on map', async ({ page }) => {
    await page.goto('/years/2003/pages/map.html');
    const n = await page.locator('ol[data-itt-ten-flows] li').count();
    expect(n).toBe(10);
  });

  test('guided is exactly 6', async ({ page }) => {
    await enterYear(page, '2003');
    await waitForImmersion(page, '2003');
    const n = await contentFrame(page).locator('#ott-guided-2003 li, ol[data-itt-guided] li, [data-itt-start] ol li').count();
    expect(n === 0 || n === 6).toBeTruthy();
  });

  test('Store empty buy never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/itunes/index.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-itunes-buy] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-itunes-library'));
    expect(raw == null || raw === '[]' || raw === '').toBeTruthy();
  });

  test('WordPress empty title never writes', async ({ page }) => {
    await page.goto('/years/2003/sites/wordpress/dashboard.html');
    await page.waitForTimeout(400);
    await page.locator('form[data-wp-publish] button[type="submit"]').click();
    const raw = await page.evaluate(() => localStorage.getItem('itt03-wp-posts'));
    expect(raw == null || raw === '[]' || raw === '').toBeTruthy();
  });
});
""",
    )


def append_2x() -> None:
    p = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(p.read_text(encoding="utf-8"))
    if any(r.get("year") == "2003" and r.get("key") == "itt03-pb-lx" for r in rows):
        return
    extras = [
        ("/years/2003/sites/photobucket/album.html", "itt03-pb-lx", "Photobucket album leftover"),
        ("/years/2003/sites/myspace/about.html", "itt03-ms-friends", "MySpace friends leftover"),
        ("/years/2003/sites/itunes/browse.html", "itt03-itunes-99", "Store 99 leftover"),
        ("/years/2003/sites/wordpress/about.html", "itt03-wp-lx", "WP leftover"),
        ("/years/2003/sites/linkedin/invite.html", "itt03-li-invite", "LI invite leftover"),
        ("/years/2003/sites/friendster/friends.html", "itt03-fs-mass", "Friendster mass leftover"),
        ("/years/2003/sites/adsense/code.html", "itt03-adsense-lx", "AdSense leftover"),
        ("/years/2003/sites/bloglines/feeds.html", "itt03-bloglines", "Bloglines leftover"),
        ("/years/2003/sites/blogger/about.html", "itt03-blogger-g", "Blogger leftover"),
        ("/years/2003/sites/skype/index.html", "itt03-skype", "Skype leftover"),
        ("/years/2003/sites/4chan/index.html", "itt03-4chan-lx", "4chan leftover"),
        ("/years/2003/sites/delicious/index.html", "itt03-delicious", "delicious leftover"),
        ("/years/2003/sites/phoenix/index.html", "itt03-firebird", "Firebird leftover"),
        ("/years/2003/sites/flash/index.html", "itt03-flash-fwa", "Flash leftover"),
        ("/years/2003/sites/hi5/index.html", "itt03-hi5", "hi5 leftover"),
        ("/years/2003/sites/amazon/index.html", "itt03-amz", "Amazon leftover"),
        ("/years/2003/sites/yahoo/index.html", "itt03-yahoo", "Yahoo leftover"),
        ("/years/2003/sites/playable/game.html", "itt03-game-gagslite", "Gags Lite"),
    ]
    for path, key, title in extras:
        rows.append(
            {
                "year": "2003",
                "path": path,
                "key": key,
                "kind": "hops",
                "title": title,
                "next": "/years/2003/pages/map.html",
                "nextLabel": "Map",
            }
        )
    p.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    rooms = write_tree()
    write_assets()
    write_css()
    write_js_stubs(rooms)
    patch_wiring()
    unlock_hub()
    write_docs()
    write_e2e()
    append_2x()
    print(f"2003 rooms: {len(rooms)} html dests")


if __name__ == "__main__":
    main()
