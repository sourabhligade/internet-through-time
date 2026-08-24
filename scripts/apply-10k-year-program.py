#!/usr/bin/env python3
"""One-shot apply for YEAR-WEB 10k program: costume, mass honesty, recon, continuity."""
from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]

MASS = {
    "1995": 'AOL is <b>#1 visits</b> this June (37.5M). This door keeps Amazon SSL as gold. <a href="../sites/aol/index.html">AOL start-page leftover</a>.',
    "1996": 'AOL is still <b>#1 visits</b>. Portals IPO. Gold is walking Yahoo + Excite + AltaVista. <a href="../sites/aolportal/index.html">AOL portal leftover</a>.',
    "1998": 'AOL is still <b>#1 visits</b>. Google is born and is <b>not</b> in the June top 10. Keep Lucky sparse. <a href="../sites/yahoo/index.html">Yahoo is loud</a>.',
    "1999": 'AOL is still <b>#1 visits</b> (MSN #2). Gold is AIM. <a href="../sites/aol/index.html">AOL leftover</a>.',
    "2000": '<b>Yahoo — #1 visits</b> this year (413M June). Gold stays MapQuest. Smile / Pets are the crash memory. <a href="../sites/yahoo/index.html">Open Yahoo</a> · <a href="../sites/amazon/index.html">Amazon smile</a> · <a href="../sites/pets/index.html">Pets.com</a>.',
    "2001": '<b>Yahoo — #1 visits</b>. Google is still <b>#9</b>. Gold stays Wikipedia edit. <a href="../sites/yahoo/index.html">Open Yahoo</a>.',
    "2002": '<b>Yahoo — #1 visits</b>. Google is now <b>#4</b>. Gold stays StumbleUpon. <a href="../sites/yahoo/index.html">Open Yahoo</a>.',
    "2003": '<b>Yahoo — #1 visits</b>. MySpace is the social memory. Gold stays Photobucket. <a href="../sites/yahoo/index.html">Open Yahoo</a> · <a href="../sites/myspace/index.html">MySpace</a>.',
    "2004": '<b>Yahoo — #1 visits</b>. thefacebook is campus-only. <a href="../sites/yahoo/index.html">Open Yahoo</a>.',
    "2005": '<b>Yahoo — still #1 visits</b> (6.2B vs Google 3.0B) the year YouTube launches. Gold stays the upload. <a href="../sites/yahoo/index.html">Open Yahoo</a>.',
    "2006": '<b>Google takes #1 visits</b> this year. Do not add an iPhone. Gold stays Twitter 140. <a href="../sites/google/index.html">Google leftover</a>.',
    "2007": 'Google #1 · Yahoo #2 · <b>MySpace still #4</b>. Year object is Safari (no App Store). <a href="../sites/myspace/index.html">MySpace leftover</a>.',
    "2008": 'YouTube #3 · Facebook #4 enter the chart. Year object is App Store. Gold chip may stay GitHub. <a href="../sites/appstore/index.html">App Store</a> · <a href="../sites/chrome/index.html">Chrome</a>.',
    "2010": 'Yahoo / Google still eat June visits. Instagram is the year object (iOS only). <a href="../sites/yahoo/index.html">Yahoo leftover</a>.',
    "2011": 'Google is <b>#1 visits for good</b>. Do not rebuild google.com. The year object is <b>G+ Circles</b>.',
    "2012": 'Facebook passes YouTube for #2. Gold is IG Android. VK is mass and out of thesis.',
    "2013": 'Vine is never top 10 — correct gold. Twitter is #6. Stories-as-product is 2016.',
    "2015": 'Instagram is now <b>#8 visits</b>. Stories stay banned. Gold is Periscope. <a href="../sites/instagram/index.html">IG leftover (no Stories)</a>.',
    "2016": 'Instagram is #8 <em>and</em> the gold (Stories). Users cell on ILS is blank.',
    "2017": 'Face ID is the year object, not a top-10 website. Baidu is #4 global — out of US thesis.',
    "2018": 'ILS June table <b>ends</b> at 1,630,322,579. YouTube passes Facebook for #2. Gold is GDPR Manage.',
    "2019": '<b>No June websites cell.</b> ITU 4.1B / ~54%. Disney+ ships 12 Nov — not in the June top 10. Adult #10 is never a room.',
    "2020": '<b>No June websites cell.</b> Zoom 300M daily <em>participants</em>, not users. Gold is mute → leave. ChatGPT is 2022.',
}

CONTINUITY = {
    "2002", "2003", "2004", "2005", "2006", "2008"
}

GOLD = {
    "2009": ("years/2009/sites/facebook/index.html", "like", "RECON · 2009 Like bar · not an official glyph"),
    "2010": ("years/2010/sites/instagram/index.html", "ig", "RECON · 2010 filter tray · museum photos only"),
    "2011": ("years/2011/sites/googleplus/index.html", "gplus", "RECON · Circles panel · not google.com"),
    "2012": ("years/2012/sites/instagram/android.html", "ig", "RECON · Android share · not Stories"),
    "2013": ("years/2013/sites/vine/record.html", "vine", "RECON · 6-second phone frame"),
    "2015": ("years/2015/sites/periscope/index.html", "peri", "RECON · red LIVE · no official bird"),
    "2016": ("years/2016/sites/instagram/stories.html", "stories", "RECON · 24h ring · no official glyph"),
    "2017": ("years/2017/sites/iphone/x.html", "faceid", "RECON · no-Home bezel · Look then Unlock"),
    "2018": ("years/2018/sites/gdpr/index.html", "gdpr", "RECON · cookie wall · Manage is the verb"),
    "2019": ("years/2019/sites/disneyplus/home.html", "dplus", "RECON · Continue row · no official art"),
    "2020": ("years/2020/sites/zoom/meeting.html", "zoom", "RECON · mute / Leave bar · no official art"),
}

SHELL_YEARS = {
    "2015": ("Chrome habit — 2015", "Windows 7 residual · Chrome habit"),
    "2016": ("Chrome habit — 2016", "Windows 10 · Chrome habit"),
    "2017": ("Chrome habit — 2017", "Windows 10 · Chrome habit"),
    "2018": ("Chrome habit — 2018", "Windows 10 · Chrome habit"),
    "2019": ("Chrome habit — 2019", "Windows 10 · Chrome habit"),
    "2020": ("Chrome habit — 2020", "Windows 10 · Chrome habit · Edge residual"),
}


def insert_after_guided(home: pathlib.Path, year: str, html: str) -> str:
    if 'class="itt-mass-honesty"' in html and year != "1994":
        # 2009 already has one; skip if present
        if year != "2009":
            return html
        return html
    block = (
        f'<p class="itt-mass-honesty" data-itt-mass="{year}" '
        f'style="font-family:Arial,sans-serif;font-size:12px;margin:10px 0;padding:8px 10px;'
        f'background:#fff8dc;border:1px solid #c90;max-width:48em">'
        f"{MASS[year]}</p>\n"
    )
    if year in CONTINUITY:
        block += (
            '<p class="itt-continuity-note" data-itt-forest="1" '
            'style="font-family:Arial,sans-serif;font-size:11px;margin:8px 0;padding:6px 8px;'
            'background:#ffffcc;border:1px dashed #996;max-width:48em">'
            "Amazon / Yahoo / portal rooms below may be <b>held over</b> from earlier years. "
            "Year-true products sit on the chips and the star.</p>\n"
        )
    # Close of guided is </div> immediately after </ol> (optional whitespace)
    m = re.search(
        rf'(<div class="ott-guided" id="ott-guided-{year}"[\s\S]*?</ol>\s*</div>\s*)',
        html,
    )
    if not m:
        print("no guided close", year)
        return html
    return html[: m.end()] + block + html[m.end() :]


def costume_shell(path: pathlib.Path, year: str, title: str, chip: str) -> None:
    t = path.read_text(encoding="utf-8")
    t = t.replace(f"<title>Internet Explorer — {year}</title>", f"<title>{title}</title>")
    t = t.replace(f"<title>Internet Explorer 9.0 — {year}</title>", f"<title>{title}</title>")
    t = t.replace("Open Location in Internet Explorer:", "Open Location (museum desktop frame):")
    t = t.replace("<span>About Internet Explorer</span>", "<span>About this browser</span>")
    t = t.replace("<p><b>Microsoft Internet Explorer</b></p>", f"<p><b>{title}</b></p>")
    t = t.replace(
        "Chrome is the #1 narrative. This chrome is still Internet Explorer 9.0.",
        "Chrome is the #1 visit habit. This window is still the museum desktop frame — not a Chrome screenshot.",
    )
    t = t.replace(
        '<span id="dlg-alert-title">Internet Explorer</span>',
        '<span id="dlg-alert-title">Browser</span>',
    )
    t = t.replace(
        'aria-label="Internet Explorer 8"',
        'aria-label="Chrome habit (museum frame)"',
    )
    t = t.replace(
        "Welcome to the World Wide Web — Microsoft Internet Explorer",
        f"Welcome to the World Wide Web — {title}",
    )
    t = t.replace("About Internet Explorer...", "About this browser...")
    t = t.replace(
        'aria-label="Internet Explorer toolbar"',
        'aria-label="Browser toolbar"',
    )
    t = t.replace('title="Internet Explorer"', 'title="Chrome habit"')
    t = t.replace('title="Restore Internet Explorer"', 'title="Restore browser"')
    t = t.replace("<span>e</span> Internet Explorer", "<span>e</span> Chrome habit")
    t = t.replace(
        '<button type="button" class="win95-task-btn" id="task-ie">Internet Explorer</button>',
        '<button type="button" class="win95-task-btn" id="task-ie">Chrome habit</button>',
    )
    if year == "2015":
        t = t.replace(
            "2015 · Windows 7 residual · Internet Explorer 9 · Chrome habit",
            f"2015 · {chip}",
        )
    path.write_text(t, encoding="utf-8")
    print("shell", year)


def costume_config(year: str) -> None:
    p = ROOT / f"js/config/{year}.js"
    t = p.read_text(encoding="utf-8")
    t = t.replace(
        'browserTitleSuffix: " - Microsoft Internet Explorer"',
        'browserTitleSuffix: " - Chrome habit"',
    )
    t = re.sub(
        r'connectBrowserLine: "Starting Internet Explorer[^"]*"',
        'connectBrowserLine: "Starting Chrome habit (museum desktop frame)..."',
        t,
    )
    p.write_text(t, encoding="utf-8")
    print("config", year)


def add_recon(rel: str, kind: str, caption: str) -> None:
    p = ROOT / rel
    if not p.exists():
        print("missing gold", rel)
        return
    t = p.read_text(encoding="utf-8")
    if "itt-recon-gold.css" not in t:
        t = t.replace(
            "</head>",
            '<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">\n</head>',
            1,
        )
    if 'class="itt-recon-gold"' not in t:
        block = (
            f'<div class="itt-recon-gold" data-recon="{kind}">'
            f"<b>RECON frame</b> {caption}</div>\n"
        )
        if '<div id="itt-nav-slot"' in t:
            t = t.replace(
                '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n',
                '<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>\n'
                + block,
                1,
            )
        else:
            t = t.replace("<body", "<body", 1)
    p.write_text(t, encoding="utf-8")
    print("recon", rel)


def main() -> None:
    for year, text in MASS.items():
        home = ROOT / f"years/{year}/pages/home.html"
        html = home.read_text(encoding="utf-8")
        new = insert_after_guided(home, year, html)
        if new != html:
            home.write_text(new, encoding="utf-8")
            print("mass", year)
        else:
            print("mass skip", year)

    for y, (title, chip) in SHELL_YEARS.items():
        costume_shell(ROOT / f"years/{y}/index.html", y, title, chip)
        costume_config(y)

    for y, (rel, kind, cap) in GOLD.items():
        add_recon(rel, kind, cap)

    sm = ROOT / "sitemap.txt"
    line = "/years/2009/sites/youtube/index.html"
    txt = sm.read_text(encoding="utf-8")
    if line not in txt:
        sm.write_text(txt.rstrip() + "\n" + line + "\n", encoding="utf-8")
        print("sitemap youtube 2009")


if __name__ == "__main__":
    main()
