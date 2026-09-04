#!/usr/bin/env python3
"""2015 leftover 2× walk strips + leftover-official / 2× matrix rows."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2015"
SITES = Y / "sites"

# Walk leftover dests first (no peach), then mass residual on disk.
WALK = [
    "instagram", "spotify", "netflix", "discordabout", "echo", "snapchat",
    "meerkat", "leabout", "vine", "ios9", "agario", "amppage", "apple",
    "musicabout", "edgeabout", "fblive", "iphone", "secret", "instant",
    "titleii", "swiftoss", "waweb", "win10get", "w10about", "photosabout",
    "periabout", "ytgaming",
]
MASS = [
    "facebook", "youtube", "twitter", "google", "wikipedia", "reddit",
    "gmail", "amazon", "uber", "twitch", "linkedin", "pinterest",
    "tumblr", "slack", "dropbox", "airbnb", "chrome", "yahoo",
]
GOLD = "periscope"
LABEL = {
    "instagram": "Instagram leftover",
    "spotify": "Spotify leftover",
    "netflix": "Netflix leftover",
    "discordabout": "Discord leftover path",
    "echo": "Echo leftover",
    "snapchat": "Snapchat leftover",
    "meerkat": "Meerkat leftover",
    "leabout": "Let's Encrypt leftover path",
    "vine": "Vine leftover",
    "ios9": "iOS 9 leftover",
    "agario": "Agar.io leftover",
    "amppage": "AMP leftover",
    "apple": "Apple leftover",
    "musicabout": "Music leftover path",
    "edgeabout": "Edge leftover path",
    "fblive": "FB Live leftover",
    "iphone": "iPhone 6s leftover",
    "secret": "Secret leftover",
    "instant": "Instant Articles leftover",
    "titleii": "Title II leftover",
    "swiftoss": "Swift leftover",
    "waweb": "WhatsApp Web leftover",
    "win10get": "GWX leftover",
    "w10about": "Win10 leftover path",
    "photosabout": "Photos leftover path",
    "periabout": "Periscope leftover path",
    "ytgaming": "YouTube Gaming leftover",
    "periscope": "★ Periscope",
    "facebook": "Facebook leftover",
    "youtube": "YouTube leftover",
    "twitter": "Twitter leftover",
    "google": "Google leftover",
    "wikipedia": "Wikipedia leftover",
    "reddit": "Reddit leftover",
    "gmail": "Gmail leftover",
    "amazon": "Amazon leftover",
    "uber": "Uber leftover",
    "twitch": "Twitch leftover",
    "linkedin": "LinkedIn leftover",
    "pinterest": "Pinterest leftover",
    "tumblr": "Tumblr leftover",
    "slack": "Slack leftover",
    "dropbox": "Dropbox leftover",
    "airbnb": "Airbnb leftover",
    "chrome": "Chrome leftover",
    "yahoo": "Yahoo leftover",
}

OFFICIAL = {
    "periscope", "googlephotos", "win10", "applemusic", "edge", "watch",
    "snap-discover", "discord", "le", "game-blobrush",
}

PREFERRED = {
    "ios9": "blockers.html",
    "apple": "about.html",
    "snapchat": "index.html",
}


def dest_file(slug: str) -> Path | None:
    d = SITES / slug
    if not d.is_dir():
        return None
    pref = PREFERRED.get(slug)
    if pref and (d / pref).exists():
        return d / pref
    if (d / "index.html").exists():
        return d / "index.html"
    htmls = sorted(d.glob("*.html"))
    return htmls[0] if htmls else None


def rel_href(from_file: Path, to_file: Path) -> str:
    import os
    return os.path.relpath(to_file, from_file.parent).replace("\\", "/")


def chain() -> list[str]:
    out = []
    for slug in WALK + MASS:
        if slug == "peach":
            continue
        if dest_file(slug):
            out.append(slug)
    return out


def hops_for(slug: str, ch: list[str], from_file: Path) -> list[tuple[str, str]]:
    hops: list[tuple[str, str]] = []
    seen: set[str] = set()
    if slug in ch:
        i = ch.index(slug)
        for other in (ch[i - 1], ch[(i + 1) % len(ch)]):
            if other == slug:
                continue
            tf = dest_file(other)
            if not tf:
                continue
            href = rel_href(from_file, tf)
            if href not in seen:
                hops.append((href, LABEL.get(other, other + " leftover")))
                seen.add(href)
    gf = dest_file(GOLD)
    if gf and slug != GOLD:
        href = rel_href(from_file, gf)
        if href not in seen:
            hops.append((href, "★ Periscope"))
            seen.add(href)
    extras = [s for s in ch if s != slug][:14]
    for other in extras:
        tf = dest_file(other)
        if not tf:
            continue
        href = rel_href(from_file, tf)
        if href in seen:
            continue
        hops.append((href, LABEL.get(other, other + " leftover")))
        seen.add(href)
    return hops


STRIP_RE = re.compile(
    r"\n?<!-- ITT-2X-LINKS:2015:start -->[\s\S]*?<!-- ITT-2X-LINKS:2015:end -->\n?",
    re.I,
)


def inject_strips() -> int:
    ch = chain()
    n = 0
    for html in Y.rglob("*.html"):
        t = html.read_text(encoding="utf-8")
        if "data-lo-save" not in t:
            continue
        slug = html.parent.name if html.parent.name != "sites" else html.stem
        if html.parent.name == "playable":
            slug = "playable"
        hops = hops_for(slug if slug in ch or slug == GOLD else (ch[0] if ch else GOLD), ch, html)
        if not hops:
            continue
        extras = " · ".join(f'<a href="{h}">{lab}</a>' for h, lab in hops)
        block = (
            "\n<!-- ITT-2X-LINKS:2015:start -->\n"
            '<p class="itt-pop-more" data-itt-pop-more="2015" data-itt-2x-links="2015" '
            'style="margin:12px auto;padding:8px;border:1px dashed #888;'
            'font-family:Arial,sans-serif;font-size:11px;max-width:52em">'
            f"<b>2× leftover walk</b> · {extras}</p>\n"
            "<!-- ITT-2X-LINKS:2015:end -->\n"
        )
        t = STRIP_RE.sub("", t)
        if "</body>" in t:
            t = t.replace("</body>", block + "</body>", 1)
        else:
            t += block
        html.write_text(t, encoding="utf-8")
        n += 1
    return n


def leftover_rows() -> list[dict]:
    rows = []
    seen = set()
    panel_re = re.compile(r"<section[^>]*data-lo-panel[\s\S]*?</section>", re.I)
    for html in sorted(Y.rglob("*.html")):
        rel = html.relative_to(Y).as_posix()
        text = html.read_text(encoding="utf-8")
        for panel in panel_re.findall(text):
            m = re.search(r'data-lo-save[^>]*data-lo-key="([^"]+)"', panel)
            if not m:
                m = re.search(r'data-lo-key="([^"]+)"[^>]*data-lo-save', panel)
            if not m:
                continue
            suf = m.group(1)
            if not suf or suf in OFFICIAL:
                continue
            key = "itt15-" + suf
            sig = (rel, key)
            if sig in seen:
                continue
            seen.add(sig)
            need_m = re.search(r'data-lo-need-pick="([^"]+)"', panel)
            rows.append({
                "year": "2015",
                "href": rel,
                "key": key,
                "suffix": suf,
                "needPick": need_m.group(1) if need_m else "",
                "minPick": 0,
                "field": "data-lo-field" in panel,
                "placeholder": "2015 leftover",
            })
    return rows


def upsert_lo_matrix(rows: list[dict]) -> int:
    p = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    dests = [d for d in data.get("dests", []) if d.get("year") != "2015"]
    dests.extend(rows)
    data["dests"] = dests
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return len(rows)


def upsert_2x(rows: list[dict]) -> int:
    p = ROOT / "e2e" / "2x-links.matrix.json"
    data = json.loads(p.read_text(encoding="utf-8"))
    keep = [r for r in data if r.get("year") != "2015"]
    out = []
    for d in rows:
        nxt = "/years/2015/sites/periscope/index.html"
        out.append({
            "year": "2015",
            "path": "/years/2015/" + d["href"],
            "key": d["key"],
            "kind": "query",
            "title": "2015 leftover · " + d["suffix"],
            "next": nxt,
            "nextLabel": "★ Periscope",
        })
    keep.extend(out)
    p.write_text(json.dumps(keep, indent=4, ensure_ascii=False) + "\n", encoding="utf-8")
    return len(out)


def unwipe() -> None:
    for rel in (
        "e2e/leftover-official.spec.js",
        "e2e/year-more-3x.spec.js",
    ):
        p = ROOT / rel
        t = p.read_text(encoding="utf-8")
        t = t.replace('"2015", "2018"', '"2018"')
        t = t.replace("'2015', '2018'", "'2018'")
        p.write_text(t, encoding="utf-8")


def main() -> None:
    strips = inject_strips()
    rows = leftover_rows()
    nlo = upsert_lo_matrix(rows)
    n2x = upsert_2x(rows)
    unwipe()
    print(f"strips {strips} leftover-official {nlo} 2x {n2x}")


if __name__ == "__main__":
    main()
