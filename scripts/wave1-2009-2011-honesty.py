#!/usr/bin/env python3
"""Wave 1 — 2009 + 2011 honesty.

Unlist wrong-era dests from the hallway. Rewrite Continuity leftover N
titles to year-true (or Not-YYYY) copy. Keep leftover keys / files so
hrefs stay 200 and leftover 2× rows still resolve.

See docs/EVERY-YEAR-IMPROVE-FLOWS-LINKS-GOALS-PHASES-MINUTE-2026-09-03.md
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Hallway unlist (files stay). Bible + obvious later brands on these doors.
UNLIST = {
    "2009": {
        "brave", "discord", "edge", "figma", "icloud", "notion", "patreon",
        "slack", "teams", "tt", "twitch", "zoom",
        "ig", "among", "fn",
    },
    "2011": {
        "brave", "discord", "edge", "figma", "notion", "patreon",
        "slack", "teams", "tt",
        "among", "fn",
    },
}

WHEN = {
    "brave": ("Brave", "2016"),
    "discord": ("Discord", "2015"),
    "edge": ("Chromium Edge", "2015"),
    "figma": ("Figma", "2016"),
    "icloud": ("iCloud", "2011"),
    "notion": ("Notion", "2016"),
    "patreon": ("Patreon", "2013"),
    "slack": ("Slack", "2014"),
    "teams": ("Microsoft Teams", "2017"),
    "tt": ("TikTok", "2018"),
    "twitch": ("Twitch mass", "2011"),
    "zoom": ("Zoom mass", "2020"),
    "ig": ("Instagram", "2010"),
    "among": ("Among Us", "2018"),
    "fn": ("Fortnite", "2017"),
}

LABEL = {
    "amz": "Amazon leftover",
    "android": "Android leftover",
    "angry": "Angry Birds leftover",
    "appstore": "App Store leftover",
    "beacon": "Beacon leftover",
    "bing": "Bing leftover",
    "bitcoin": "Bitcoin leftover",
    "chatroulette": "Chatroulette leftover",
    "chrome": "Chrome leftover",
    "cont": "2009 leftover hop",
    "epic": "2009 leftover hop",
    "facebook": "Facebook Like",
    "farmville": "FarmVille leftover",
    "ff": "Firefox leftover",
    "foursquare": "Foursquare leftover",
    "friendfeed": "FriendFeed leftover",
    "github": "GitHub leftover",
    "gmail": "Gmail leftover",
    "google": "Google leftover",
    "gvoice": "Google Voice leftover",
    "hulu": "Hulu leftover",
    "ie8": "IE8 leftover",
    "iphone": "iPhone 3GS leftover",
    "kickstarter": "Kickstarter leftover",
    "kindle": "Kindle leftover",
    "li": "LinkedIn leftover",
    "maps": "Maps leftover",
    "minecraft": "Minecraft leftover",
    "myspace": "MySpace leftover",
    "netflix": "Netflix leftover",
    "nfx": "Netflix leftover",
    "nintendo": "Nintendo leftover",
    "omegle": "Omegle leftover",
    "palmpre": "Palm Pre leftover",
    "playable": "Playables",
    "pp": "PayPal leftover",
    "ps": "PlayStation leftover",
    "reddit": "Reddit leftover",
    "roblox": "Roblox leftover",
    "safari": "Safari leftover",
    "spotify": "Spotify leftover",
    "ss": "leftover hop",
    "steam": "Steam leftover",
    "twitter": "Twitter leftover",
    "ubercab": "UberCab leftover",
    "wave": "Google Wave leftover",
    "whatsapp": "WhatsApp leftover",
    "wiki": "Wikipedia leftover",
    "wikipedia": "Wikipedia leftover",
    "windows7": "Windows 7 leftover",
    "wolfram": "Wolfram leftover",
    "xbox": "Xbox leftover",
    "youtube": "YouTube leftover",
    # 2011 keep
    "airbnb": "Airbnb leftover",
    "android4": "Android 4 leftover",
    "chromebook": "Chromebook leftover",
    "dropbox": "Dropbox leftover",
    "facebook": "Facebook leftover",
    "gmusic": "Google Music leftover",
    "googleplus": "Google+",
    "hotmail": "Hotmail leftover",
    "icloud": "iCloud leftover",
    "instagram": "Instagram leftover",
    "ipad": "iPad leftover",
    "jobs": "Jobs leftover",
    "kindlefire": "Kindle Fire leftover",
    "lastfm": "Last.fm leftover",
    "linkedin": "LinkedIn leftover",
    "lion": "OS X Lion leftover",
    "pinterest": "Pinterest leftover",
    "qwikster": "Qwikster leftover",
    "rdio": "Rdio leftover",
    "silk": "Silk leftover",
    "siri": "Siri leftover",
    "skype": "Skype leftover",
    "snapchat": "Snapchat leftover",
    "twitch": "Twitch leftover",
    "vita": "PS Vita leftover",
    "wallet": "Wallet leftover",
    "wp75": "Windows Phone 7.5 leftover",
    "zoom": "Zoom leftover",
}

STAR = {"2009": "itt09-like", "2011": "itt11-gplus"}
KEEP_NEXT = {
    "2009": [
        "../farmville/index.html",
        "../chatroulette/index.html",
        "../omegle/index.html",
        "../bing/index.html",
        "../facebook/index.html",
        "../wikipedia/index.html",
    ],
    "2011": [
        "../googleplus/index.html",
        "../siri/index.html",
        "../qwikster/index.html",
        "../icloud/index.html",
        "../snapchat/index.html",
        "../skype/index.html",
    ],
}

A_RE = re.compile(
    r'\s*<a href="([^"]+)">([^<]*)</a>\s*(?:·|&middot;|\|)?\s*',
    re.I,
)
CONT_TITLE = re.compile(
    r"(Continuity leftover(?:\s+\d+)?)",
    re.I,
)
H1_RE = re.compile(r"(<h1[^>]*>)(.*?)(</h1>)", re.I | re.S)
TITLE_RE = re.compile(r"(<title>)(.*?)(</title>)", re.I | re.S)
NEXT_A = re.compile(
    r'(<p hidden data-next-flow[^>]*>\s*<b>Next:</b>\s*<a href=")([^"]+)(">)([^<]*)(</a>)',
    re.I | re.S,
)


def slug_of_href(href: str) -> str | None:
    if "pages/" in href or href.startswith("#"):
        return None
    m = re.search(r"sites/([^/]+)/", href)
    if m:
        return m.group(1)
    m = re.search(r"\.\./([^./][^/]*)/", href)
    if m and m.group(1) not in {"pages", ".."}:
        return m.group(1)
    return None


def dest_label(year: str, slug: str) -> str:
    if slug in UNLIST.get(year, set()) and slug in WHEN:
        name, launched = WHEN[slug]
        return f"Not {year} · {name} is {launched}"
    return LABEL.get(slug, slug.replace("-", " ").title() + " leftover")


def rewrite_unlist_page(year: str, dest: Path, html: str) -> str:
    slug = dest.parent.name if dest.stem in {"index", "about", "more", "c", "home"} else dest.stem
    if slug not in UNLIST.get(year, set()):
        return html
    name, launched = WHEN.get(slug, (slug, "later"))
    star = STAR[year]
    title = f"Not {year} — {name} is {launched}"
    html = TITLE_RE.sub(rf"\1{title}\3", html, count=1)
    html = H1_RE.sub(rf"\1Not {year}\3", html, count=1)
    html = CONT_TITLE.sub(title, html)
    # honesty line under h1
    html = re.sub(
        r"(<h1[^>]*>Not \d{4}</h1>\s*)<p>[^<]*</p>",
        rf"\1<p><b>{name}</b> is <b>{launched}</b>. This leftover does not offer it as a {year} room. "
        rf"The star stays <code>{star}</code>.</p>",
        html,
        count=1,
        flags=re.I,
    )
    return html


def relabel_keep_chrome(year: str, dest: Path, html: str) -> str:
    slug = dest.parent.name
    if slug in UNLIST.get(year, set()):
        return html
    if not CONT_TITLE.search(html):
        return html
    label = dest_label(year, slug)
    html = TITLE_RE.sub(
        lambda m: f"{m.group(1)}{label} — {year}{m.group(3)}"
        if "Continuity leftover" in m.group(2)
        else m.group(0),
        html,
        count=1,
    )
    html = H1_RE.sub(
        lambda m: f"{m.group(1)}{label}{m.group(3)}"
        if "Continuity leftover" in m.group(2)
        else m.group(0),
        html,
        count=1,
    )
    return html


def filter_anchor_blob(year: str, blob: str) -> str:
    """Drop unlist dest anchors; relabel the rest."""
    parts = []
    for m in A_RE.finditer(blob):
        href, text = m.group(1), m.group(2)
        slug = slug_of_href(href)
        if slug and slug in UNLIST.get(year, set()):
            continue
        if slug:
            text = dest_label(year, slug)
            if href.endswith("about.html") and "about" not in text.lower():
                text = f"{text} · about"
            elif href.endswith("more.html") and "more" not in text.lower():
                text = f"{text} · more"
        elif "home.html" in href:
            text = "Starting Point"
        elif "map.html" in href:
            text = "Year flow map"
        parts.append(f'<a href="{href}">{text}</a>')
    return " ·\n ".join(parts)


def rewrite_strips(year: str, html: str) -> str:
    def repl_nav(m: re.Match) -> str:
        start, inner, end = m.group(1), m.group(2), m.group(3)
        lead = re.match(r"\s*(<b>.*?</b>)", inner, re.S | re.I)
        bold = lead.group(1) if lead else "<b>Also this year · 3×</b>"
        new_body = filter_anchor_blob(year, inner)
        if not new_body.strip():
            new_body = '<a href="home.html">Starting Point</a>'
        return (
            f"{start}{bold}"
            f'<p style="margin:6px 0 0">\n {new_body}\n</p>{end}'
        )

    html = re.sub(
        r"(<nav class=\"itt-3x-also\"[^>]*>)(.*?)(</nav>)",
        repl_nav,
        html,
        flags=re.S | re.I,
    )
    html = re.sub(
        r"(<nav class=\"itt-3x-links\"[^>]*>)(.*?)(</nav>)",
        repl_nav,
        html,
        flags=re.S | re.I,
    )

    def repl_pop(m: re.Match) -> str:
        tag, inner, end = m.group(1), m.group(2), m.group(3)
        new_body = filter_anchor_blob(year, inner)
        lead = re.search(r"<b>.*?</b>", inner, re.I | re.S)
        bold = lead.group(0) if lead else "<b>2× leftover links</b>"
        return f"{tag}{bold} · {new_body}{end}"

    html = re.sub(
        r'(<p class="itt-pop-more"[^>]*>)(.*?)(</p>)',
        repl_pop,
        html,
        flags=re.S | re.I,
    )
    return html


def retarget_next(year: str, html: str, i: int) -> str:
    keep = KEEP_NEXT[year]

    def repl(m: re.Match) -> str:
        href = m.group(2)
        slug = slug_of_href(href)
        if slug and slug in UNLIST.get(year, set()):
            href = keep[i % len(keep)]
            slug = slug_of_href(href)
        label = dest_label(year, slug) if slug else m.group(4)
        if "Continuity leftover" in (m.group(4) or "") and slug:
            label = dest_label(year, slug)
        return f"{m.group(1)}{href}{m.group(3)}{label}{m.group(5)}"

    return NEXT_A.sub(repl, html)


def filter_page_hallway(year: str, html: str) -> str:
    """home / about / map / whats-new leftover strips."""
    def repl_p(m: re.Match) -> str:
        inner = m.group(0)
        if "sites/" not in inner and "../" not in inner:
            return inner
        if "Continuity leftover" not in inner and not any(
            f"/{s}/" in inner for s in UNLIST.get(year, set())
        ):
            # still relabel if any unlist href
            if not any(f"/{s}/" in inner for s in UNLIST.get(year, set())):
                return CONT_TITLE.sub(
                    lambda cm: dest_label(year, "cont"), inner
                ) if False else inner
        new = filter_anchor_blob(year, inner)
        if new == inner:
            return inner
        # rebuild the paragraph keeping the open tag
        om = re.match(r"(<p[^>]*>)(.*)(</p>)", inner, re.S | re.I)
        if not om:
            return inner
        return f"{om.group(1)}\n {new}\n{om.group(3)}"

    # Only rewrite nav/p blocks that contain dest hrefs
    html = re.sub(r"<p[^>]*>.*?</p>", repl_p, html, flags=re.S | re.I)
    return html


def process_year(year: str) -> dict:
    root = ROOT / "years" / year
    n_html = n_unlisted_pages = n_relabel = 0
    for html_path in sorted(root.rglob("*.html")):
        raw = html_path.read_text(encoding="utf-8", errors="replace")
        t = raw
        rel = html_path.relative_to(root).as_posix()
        t = rewrite_strips(year, t)
        if rel.startswith("pages/"):
            t = filter_page_hallway(year, t)
        if "/sites/" in f"/{rel}":
            dest = html_path
            slug = dest.parent.name
            if slug in UNLIST.get(year, set()):
                t = rewrite_unlist_page(year, dest, t)
                n_unlisted_pages += 1
            else:
                before = t
                t = relabel_keep_chrome(year, dest, t)
                if t != before:
                    n_relabel += 1
        t = retarget_next(year, t, n_html)
        if t != raw:
            html_path.write_text(t, encoding="utf-8")
            n_html += 1
    return {
        "html_rewritten": n_html,
        "unlist_pages": n_unlisted_pages,
        "keep_relabel": n_relabel,
    }


def patch_matrices() -> None:
    m2_path = ROOT / "e2e" / "2x-links.matrix.json"
    rows = json.loads(m2_path.read_text(encoding="utf-8"))
    changed = 0
    for row in rows:
        y = str(row.get("year") or "")
        if y not in UNLIST:
            continue
        path = row.get("path") or ""
        slug = slug_of_href(path)
        title = row.get("title") or ""
        nxt = row.get("next") or ""
        nslug = slug_of_href(nxt)
        if slug and ("Continuity leftover" in title or slug in UNLIST[y]):
            row["title"] = dest_label(y, slug)
            changed += 1
        if nslug and nslug in UNLIST[y]:
            # point Next at a keep dest path
            keep_slug = {
                "2009": "farmville",
                "2011": "googleplus",
            }[y]
            row["next"] = f"/years/{y}/sites/{keep_slug}/index.html"
            row["nextLabel"] = dest_label(y, keep_slug)
            changed += 1
        elif nslug and "Continuity leftover" in (row.get("nextLabel") or ""):
            row["nextLabel"] = dest_label(y, nslug)
            changed += 1
    m2_path.write_text(json.dumps(rows, indent=2) + "\n", encoding="utf-8")

    lo_path = ROOT / "e2e" / "leftover-official.matrix.json"
    lo = json.loads(lo_path.read_text(encoding="utf-8"))
    dests = lo.get("dests") or []
    for row in dests:
        if not isinstance(row, dict):
            continue
        y = str(row.get("year") or "")
        if y not in UNLIST:
            continue
        href = row.get("href") or ""
        slug = slug_of_href("sites/" + href if "sites/" not in href else href)
        ph = row.get("placeholder") or ""
        if slug and ("Continuity leftover" in ph or slug in UNLIST.get(y, set())):
            row["placeholder"] = dest_label(y, slug)
    lo_path.write_text(json.dumps(lo, indent=2) + "\n", encoding="utf-8")
    print(f"  matrices touched ~{changed} 2× rows")


def main() -> int:
    print("Wave 1 — 2009 + 2011 honesty")
    for year in ("2009", "2011"):
        stats = process_year(year)
        print(f"  {year}: {stats}")
    patch_matrices()
    # leftover hallway still listing unlist?
    bad = 0
    for year, slugs in UNLIST.items():
        for page in ("home.html", "about.html", "map.html", "whats-new.html"):
            p = ROOT / "years" / year / "pages" / page
            if not p.exists():
                continue
            t = p.read_text(encoding="utf-8", errors="replace")
            for s in slugs:
                if f"sites/{s}/" in t or f"../{s}/" in t:
                    # home is YearUI + 3× nav — 3× should be cleaned
                    if f'href="../sites/{s}/' in t or f'href="../{s}/' in t:
                        print(f"  STILL LINKED {year}/{page} -> {s}")
                        bad += 1
    print("  leftover hallway unlist misses:", bad)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
