#!/usr/bin/env python3
"""CUT-3X-AI implement: leftover 54 + 9 trios + 3×-also on 2010–2023.

Existing dest folders first. Gold dests do not get a leftover-official panel
that writes the star key. Matrix is appended (never wiped). Guided stays 6.
"""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
_spec = importlib.util.spec_from_file_location(
    "itt_lo_official", ROOT / "scripts" / "inject-leftover-official.py"
)
_mod = importlib.util.module_from_spec(_spec)
assert _spec and _spec.loader
_spec.loader.exec_module(_mod)
inject = _mod.inject
panel = _mod.panel
relhref = _mod.relhref
trail_index = _mod.trail_index

YEARS = range(2010, 2024)
TARGET = 54

STAR_HREF = {
    2010: "sites/instagram/index.html",
    2011: "sites/googleplus/index.html",
    2012: "sites/instagram/android.html",
    2013: "sites/vine/record.html",
    2014: "sites/whatsapp/index.html",
    2015: "sites/periscope/index.html",
    2016: "sites/instagram/stories.html",
    2017: "sites/iphone/x.html",
    2018: "sites/gdpr/index.html",
    2019: "sites/disneyplus/home.html",
    2020: "sites/zoom/meeting.html",
    2021: "sites/att/index.html",
    2022: "sites/chatgpt/index.html",
    2023: "sites/plus/index.html",
}

TRIOS = {
    2010: ["netflix", "tumblr", "formspring", "chrome", "wave", "android", "pinterest", "kickstarter", "wikileaks"],
    2011: ["icloud", "pinterest", "linkedin", "snapchat", "tumblr", "youtube", "hangnote", "whatsapp11", "minecraft11"],
    2012: ["medium", "path", "flipboard", "reddit", "tinder", "windows8", "vinewait", "lyft", "soundcloud"],
    2013: ["askfm", "whisper", "youtube", "reddit", "facebook", "twitter", "telegram", "bitcoin13", "patreon"],
    2014: ["snapchat", "instagram", "uber", "youtube", "wikipedia", "facebook", "slack", "twitch", "serial"],
    2015: ["instagram", "spotify", "netflix", "discord", "echo", "snapchat", "meerkat", "letsencrypt", "peach"],
    2016: ["reddit", "netflix", "youtube", "musically", "vine", "snapchat", "alphago", "houseparty", "jio"],
    2017: ["reddit", "youtube", "amazon", "fortnite", "teams", "switch", "wannacry", "equifax", "hqtrivia"],
    2018: ["reddit", "youtube", "wikipedia", "tiktok", "github", "homepod", "spectre", "cambridge", "mastodon"],
    2019: ["youtube", "instagram", "wikipedia", "tiktok", "stadia", "arcade", "appletv", "airpodspro", "gamepass"],
    2020: ["meet", "hbomax", "quibi", "fleets", "discord", "teams", "acnh", "amongus", "openai"],
    2021: ["youtube", "wikipedia", "facebook", "clubhouse", "opensea", "squid", "copilot", "dalle1", "att"],
    2022: ["youtube", "wikipedia", "facebook", "tiktok", "midjourney", "lensa", "copilotga", "stablediffusion", "wordle"],
    2023: ["youtube", "wikipedia", "facebook", "reddit", "dalle3", "bluesky", "gpt4", "threads", "bard"],
}

# folder → (suffix, trap, save, field, picks, need)
SPEC = {
    "youtube": ("yt", "This dest is the year chip (trap)", "Watch leftover", "", [("watch", "Watch leftover"), ("chip", "Chip (trap)")], "watch"),
    "wikipedia": ("wiki", "2001 UseMod as this dest (trap)", "Edit leftover", "leftover edit", [("edit", "Edit leftover"), ("gold", "2001 gold (trap)")], "edit"),
    "facebook": ("facebook", "This dest is the year chip (trap)", "Open leftover feed", "", [("feed", "Feed leftover"), ("chip", "Chip (trap)")], "feed"),
    "reddit": ("reddit", "This dest is the year chip (trap)", "Open leftover thread", "leftover thread", [("thread", "Thread leftover"), ("chip", "Chip (trap)")], "thread"),
    "dalle3": ("dalle3", "Sora / ripped weights (trap)", "Prompt leftover still", "a leftover still", [("prompt", "Prompt leftover"), ("sora", "Sora (trap)")], "prompt"),
    "bluesky": ("bluesky", "Twitter as this dest (trap)", "Invite leftover", "invite leftover", [("invite", "Invite leftover"), ("tw", "Twitter (trap)")], "invite"),
    "gpt4": ("gpt4", "This is Plus gold (trap)", "Save GPT-4 leftover", "gpt-4 leftover", [("gpt4", "gpt4 leftover"), ("plusgold", "plusgold (trap)")], "gpt4"),
    "threads": ("threads", "Live Meta / EU as launch default (trap)", "Join leftover", "threads leftover", [("join", "Join leftover"), ("eu", "EU default (trap)")], "join"),
    "bard": ("bard", "Gemini as 2023 gold (trap)", "Save Bard leftover", "bard leftover", [("bard", "bard leftover"), ("gemini", "Gemini gold (trap)")], "bard"),
    "claude2": ("claude2", "Claude 3.5 as 2023 gold (trap)", "Save Claude 2 leftover", "claude 2 leftover", [("claude2", "claude2 leftover"), ("c35", "Claude 3.5 (trap)")], "claude2"),
    "bingchat": ("bing", "GPT-4 as this dest (trap)", "Save Bing leftover", "bing chat leftover", [("bing", "bing leftover"), ("gpt4", "GPT-4 dest (trap)")], "bing"),
    "x": ("x", "X as 2022 dest (trap)", "Save X leftover", "x leftover", [("x", "x leftover"), ("bird", "2022 bird gold (trap)")], "x"),
    "chrome": ("habit", "Chrome as year chip (trap)", "Keep Chrome habit", "youtube.com", [("habit", "Habit leftover"), ("chip", "Chip (trap)")], "habit"),
    "windows10": ("win10", "Win11 as this dest gold (trap)", "Stay leftover", "", [("stay", "Stay leftover"), ("win11", "Win11 (trap)")], "stay"),
    "instagram": ("ig", "This dest is the year star (trap)", "Filter leftover", "", [("filter", "Filter leftover"), ("star", "Star (trap)")], "filter"),
    "twitter": ("tweets", "X / 280 as this dest gold (trap)", "Tweet leftover 140", "leftover tweet", [("140", "140 leftover"), ("x", "X gold (trap)")], "140"),
    "netflix": ("netflix", "Netflix as year chip (trap)", "Watch leftover", "", [("watch", "Watch leftover"), ("chip", "Chip (trap)")], "watch"),
    "snapchat": ("snap", "IG Stories as this dest gold (trap)", "Snap leftover", "", [("snap", "Snap leftover"), ("stories", "IG Stories gold (trap)")], "snap"),
    "tiktok": ("tiktok", "Reels as this dest gold (trap)", "For You leftover", "leftover caption", [("fyp", "For You leftover"), ("reels", "Reels gold (trap)")], "fyp"),
    "whatsapp": ("wa", "E2E / ads as this dest gold (trap)", "Install leftover", "", [("install", "Install leftover"), ("ads", "Ads gold (trap)")], "install"),
    "periscope": ("peri", "Meerkat as gold (trap)", "Go LIVE leftover", "", [("live", "Go LIVE leftover"), ("meer", "Meerkat gold (trap)")], "live"),
    "zoom": ("zoom", "Live Zoom (trap)", "Mute leftover", "", [("mute", "Mute leftover"), ("live", "Live Zoom (trap)")], "mute"),
    "att": ("att2", "Allow writes (trap)", "Ask leftover hop", "", [("ask", "Ask leftover"), ("allow", "Allow (trap)")], "ask"),
    "chatgpt": ("gpt-lx", "Plus as 2022 gold (trap)", "Send leftover hop", "leftover prompt", [("send", "Send leftover"), ("plus", "Plus gold (trap)")], "send"),
    "plus": ("plus-lx", "Live $20 / Sora (trap)", "Invoice leftover", "plus leftover", [("invoice", "Invoice leftover"), ("live", "Live $20 (trap)")], "invoice"),
}


def spec_for(folder: str, href: str, existing_suffix: str | None) -> tuple:
    suf = existing_suffix or folder.replace("_", "-")[:24]
    if folder in SPEC:
        s = SPEC[folder]
        if existing_suffix:
            return (existing_suffix, s[1], s[2], s[3], s[4], s[5])
        return s
    trap = f"{folder} as year chip (trap)"
    save = f"{folder} leftover"
    picks = [(suf[:12] or "lx", f"{folder} leftover"), ("chip", "Chip (trap)")]
    need = suf[:12] or "lx"
    field = f"{folder} leftover"
    return (suf, trap, save, field, picks, need)


def load_matrix():
    path = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    dests = data.get("dests") or []
    by = {}
    for d in dests:
        by.setdefault(int(d["year"]), []).append(d)
    return data, dests, by


def dest_folders(year: int) -> list[str]:
    p = ROOT / f"years/{year}/sites"
    return sorted(x.name for x in p.iterdir() if x.is_dir())


def dest_index(year: int, folder: str) -> Path | None:
    d = ROOT / f"years/{year}/sites/{folder}"
    idx = d / "index.html"
    if idx.is_file():
        return idx
    kids = sorted(d.glob("*.html"))
    return kids[0] if kids else None


def hops(year: int) -> list[Path]:
    p = ROOT / f"years/{year}/sites"
    out = []
    for html in sorted(p.rglob("*.html")):
        rel = html.relative_to(p).as_posix()
        if rel.endswith("index.html"):
            continue
        if rel.startswith("playable/"):
            continue
        out.append(html)
    return out


def has_lo(path: Path) -> bool:
    try:
        return "data-lo-panel" in path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return False


def ensure_immersion(path: Path, year: int) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    needle = f"immersion-{year}.js"
    if needle in text:
        return
    depth = len(path.relative_to(ROOT / f"years/{year}").parts) - 1
    prefix = "../" * depth
    tag = f'<script src="{prefix}../../js/{needle}"></script>\n'
    if "<!-- ITT-LO-OFFICIAL:start -->" in text:
        text = text.replace("<!-- ITT-LO-OFFICIAL:start -->", tag + "<!-- ITT-LO-OFFICIAL:start -->", 1)
    elif "</body>" in text:
        text = text.replace("</body>", tag + "</body>", 1)
    else:
        text += "\n" + tag
    path.write_text(text, encoding="utf-8")


def write_hop(year: int, folder: str) -> Path:
    dest = ROOT / f"years/{year}/sites/{folder}/about.html"
    if dest.exists():
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(
        f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{folder} leftover hop — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="index.html">{folder}</a></p>
<h1>{folder} leftover hop</h1>
<p>{year} leftover · not the chip · incomplete never writes.</p>
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
""",
        encoding="utf-8",
    )
    return dest


def candidates(year: int) -> list[tuple[str, Path]]:
    """Trios first, then dest index pages, then existing hops."""
    star = STAR_HREF[year]
    out: list[tuple[str, Path]] = []
    seen: set[str] = set()

    def add(href: str, path: Path) -> None:
        if href == star:
            return
        if href in seen:
            return
        if not path.is_file():
            return
        seen.add(href)
        out.append((href, path))

    for folder in TRIOS[year]:
        idx = dest_index(year, folder)
        if idx:
            add(f"sites/{folder}/{idx.name}", idx)
    for folder in dest_folders(year):
        if folder == "playable":
            continue
        idx = dest_index(year, folder)
        if idx:
            add(f"sites/{folder}/{idx.name}", idx)
    for hop in hops(year):
        rel = hop.relative_to(ROOT / f"years/{year}").as_posix()
        add(rel, hop)
    return out


def year_rows(year: int, by_year: dict, trails: dict) -> list[tuple]:
    existing = {d["href"]: d for d in by_year.get(year, [])}
    have_lo = []
    todo = []
    for href, path in candidates(year):
        if has_lo(path) or href in existing:
            have_lo.append((href, path, existing.get(href)))
        else:
            todo.append((href, path))
    need = max(0, TARGET - len(have_lo))
    # create about hops if still short
    if need > len(todo):
        for folder in dest_folders(year):
            if folder == "playable":
                continue
            if need <= len(todo):
                break
            hop = ROOT / f"years/{year}/sites/{folder}/about.html"
            href = f"sites/{folder}/about.html"
            if href == STAR_HREF[year]:
                continue
            if any(h == href for h, _ in todo) or any(h == href for h, _, _ in have_lo):
                continue
            if not hop.exists():
                write_hop(year, folder)
            if hop.exists() and not has_lo(hop):
                todo.append((href, hop))

    used_suffix = {d["suffix"] for d in by_year.get(year, [])}
    rows: list[tuple] = []
    # keep existing leftover dests; re-inject if the panel vanished
    for href, path, rec in have_lo:
        if rec:
            if not has_lo(path):
                folder = href.split("/")[1]
                suf, trap, save, field, picks, needp = spec_for(folder, href, rec.get("suffix"))
                rows.append((str(year), href, suf, trap, save, field, picks, needp, 0, path))
            continue
        folder = href.split("/")[1]
        suf, trap, save, field, picks, needp = spec_for(folder, href, None)
        if suf in used_suffix:
            suf = folder.replace("_", "-") + "-lx"
        used_suffix.add(suf)
        rows.append((str(year), href, suf, trap, save, field, picks, needp, 0, path))
    new_needed = max(0, TARGET - len(have_lo))
    added_new = 0
    for href, path in todo:
        if added_new >= new_needed:
            break
        folder = href.split("/")[1]
        exist_suf = existing.get(href, {}).get("suffix")
        suf, trap, save, field, picks, needp = spec_for(folder, href, exist_suf)
        if suf in used_suffix and not exist_suf:
            stem = Path(href).stem
            suf = f"{folder}-{stem}"[:24]
        used_suffix.add(suf)
        rows.append((str(year), href, suf, trap, save, field, picks, needp, 0, path))
        added_new += 1
    return rows


def inject_rows(rows: list[tuple], trails: dict) -> int:
    n = 0
    for year, href, suf, trap, save, field, picks, needp, minp, path in rows:
        info = trails.get((year, href), {})
        nxt = ""
        lab = info.get("nextLabel") or ""
        if info.get("nextHref"):
            nxt = relhref(href, info["nextHref"])
        inject(path, panel(year, suf, trap, save, field, picks, needp, minp, nxt, lab))
        ensure_immersion(path, int(year))
        n += 1
    return n


def append_matrix(rows: list[tuple]) -> int:
    path = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    dests = data.get("dests") or []
    have = {(d.get("year"), d.get("href"), d.get("key")) for d in dests}
    added = 0
    for year, href, suf, _trap, _save, field, _picks, need, minp, _path in rows:
        rec = {
            "year": year,
            "href": href,
            "key": f"itt{year[2:]}-{suf}",
            "suffix": suf,
            "needPick": need or "",
            "minPick": int(minp or 0),
            "field": bool(field),
            "placeholder": field or "",
        }
        ident = (rec["year"], rec["href"], rec["key"])
        if ident in have:
            continue
        dests.append(rec)
        have.add(ident)
        added += 1
    data["dests"] = dests
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return added


def trio_strip(year: int) -> None:
    home = ROOT / f"years/{year}/pages/home.html"
    if not home.exists():
        return
    folders = TRIOS[year]
    links = []
    for folder in folders:
        idx = dest_index(year, folder)
        if not idx:
            continue
        rel = Path(f"../sites/{folder}/{idx.name}").as_posix()
        links.append(f'<a href="{rel}">{folder} leftover</a>')
    if not links:
        return
    mark = f"ITT-CUT-3X-AI-{year}"
    block = (
        f"<!-- {mark}:start -->\n"
        f'<p class="itt-cut-3x-trios itt-pop3x" data-itt-cut-3x-trios="{year}" data-itt-pop3x="{year}" '
        'style="margin:10px auto;padding:10px;background:#fff8e1;border:1px dashed #ef6c00;'
        'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>9 leftover trios · CUT-3X-AI</b> (not the chip · incomplete never writes · not a 7th guided item): "
        + " · ".join(links)
        + "</p>\n"
        f"<!-- {mark}:end -->\n"
    )
    ht = home.read_text(encoding="utf-8")
    if f"{mark}:start" in ht:
        ht = re.sub(
            rf"<!-- {mark}:start -->.*?<!-- {mark}:end -->\n",
            block,
            ht,
            count=1,
            flags=re.S,
        )
    else:
        ht = ht.replace("</body>", block + "</body>", 1)
    home.write_text(ht, encoding="utf-8")


def count_year(year: int) -> tuple[int, int]:
    p = ROOT / f"years/{year}/sites"
    lo = also = 0
    for html in p.rglob("*.html"):
        t = html.read_text(encoding="utf-8", errors="ignore")
        if "data-lo-panel" in t:
            lo += 1
        if "data-itt-3x-also" in t:
            also += 1
    return lo, also


def main() -> None:
    trails = trail_index()
    data, dests, by = load_matrix()
    all_new = []
    for year in YEARS:
        rows = year_rows(year, by, trails)
        inj = inject_rows(rows, trails)
        trio_strip(year)
        all_new.extend(rows)
        lo, also = count_year(year)
        print(f"{year} inject={inj} leftover-html={lo} also={also} named={len(by.get(year, [])) + inj}")
    added = append_matrix(all_new)
    print("matrix +", added)


if __name__ == "__main__":
    main()
