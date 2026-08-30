#!/usr/bin/env python3
"""Wire leftover-official on thin years to official-10 leftover density (8).

Years: 1994 · 2007 · 2009 · 2010 · 2011 · 2012 · 2019
Skip gold (star) and year-game dests. Existing dest files only — no new folders.
Append to leftover-official.matrix.json. Idempotent via ITT-LO-OFFICIAL.
Does not move stars or grow guided <ol>.
"""
from __future__ import annotations

import importlib.util
import json
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

# year, href, suffix (= trail whenKey after ittYY-), trap, save, field, picks, need, min_pick
# Gold + year game omitted on purpose.
DESTS = [
    # 1994 — gold CSotD / game Hotlist stay off. Already: cern, nasa, hotwired.
    ("1994", "sites/yahoo/index.html", "yahoo-wander", "Google search (trap)", "Browse leftover directory", "", [("browse", "Browse leftover"), ("g", "Google (trap)")], "browse", 0),
    ("1994", "sites/fishcam/index.html", "fishcam", "Live webcam (trap)", "Reload leftover cam", "", [("reload", "Reload leftover"), ("live", "Live webcam (trap)")], "reload", 0),
    ("1994", "sites/whitehouse/index.html", "wh-map", "Live whitehouse.gov (trap)", "Open leftover tour", "", [("tour", "Tour leftover"), ("live", "Live WH (trap)")], "tour", 0),
    ("1994", "sites/iuma/listen.html", "iuma", "Spotify (trap)", "Listen leftover", "", [("listen", "Listen leftover"), ("spotify", "Spotify (trap)")], "listen", 0),
    ("1994", "sites/lycos/index.html", "lycos", "Google search (trap)", "Open leftover catalog", "leftover query", [("cat", "Catalog leftover"), ("g", "Google (trap)")], "cat", 0),
    # 2007 — gold iPhone Safari / Peg Walk stay off. Already: yt, myspace, digg, vista.
    ("2007", "sites/gmail/index.html", "gmail", "I still need an invite (trap)", "Open leftover worldwide", "leftover handle", [("open", "Open leftover 14 Feb"), ("invite", "Invite (trap)")], "open", 0),
    ("2007", "sites/maps/index.html", "streetview", "Live Street View 2024 (trap)", "Turn leftover city", "", [("sf", "SF leftover 29 May"), ("live", "Live 2024 (trap)")], "sf", 0),
    ("2007", "sites/facebook/index.html", "fb-platform", "MySpace already smaller (trap)", "Note leftover F8", "", [("f8", "F8 leftover 24 May"), ("bigger", "FB bigger (trap)")], "f8", 0),
    ("2007", "sites/twitter/index.html", "tweets", "Twitter founded 2007 (trap)", "Tweet leftover 140", "leftover tweet", [("140", "140 leftover SXSW"), ("founded", "Founded 2007 (trap)")], "140", 0),
    # 2009 — gold Like / Plot Neighbors stay off. Already: win7.
    ("2009", "sites/farmville/index.html", "farm", "FarmVille 2 (trap)", "Plant leftover plot", "", [("plant", "Plant leftover"), ("fv2", "FarmVille 2 (trap)")], "plant", 0),
    ("2009", "sites/bing/index.html", "bing", "Google as 2009 star (trap)", "Search leftover", "leftover query", [("q", "Bing leftover 1 Jun"), ("g", "Google star (trap)")], "q", 0),
    ("2009", "sites/iphone/index.html", "iphone", "iPhone 4 (trap)", "Note leftover 3GS", "", [("3gs", "3GS leftover 19 Jun"), ("4", "iPhone 4 (trap)")], "3gs", 0),
    ("2009", "sites/appstore/index.html", "apps", "This is the 2009 chip (trap)", "Get leftover app", "", [("app", "App leftover"), ("chip", "Chip (trap)")], "app", 0),
    ("2009", "sites/twitter/index.html", "tweets", "280 (trap)", "Tweet leftover 140", "leftover tweet", [("140", "140 leftover"), ("280", "280 (trap)")], "140", 0),
    ("2009", "sites/foursquare/index.html", "4sq", "Swarm (trap)", "Check in leftover", "", [("check", "Check-in leftover"), ("swarm", "Swarm (trap)")], "check", 0),
    ("2009", "sites/kickstarter/index.html", "kickstarter", "Kickstarter as 2009 star (trap)", "Back leftover project", "leftover project", [("back", "Back leftover 28 Apr"), ("star", "Star (trap)")], "back", 0),
    # 2010 — gold Instagram iOS / Sling Nest stay off. Already: yt.
    ("2010", "sites/iphone/index.html", "iphone4", "iPhone 5 (trap)", "Note leftover 4", "", [("4", "iPhone 4 leftover 24 Jun"), ("5", "iPhone 5 (trap)")], "4", 0),
    ("2010", "sites/ipad/order.html", "ipad", "iPad Pro (trap)", "Order leftover iPad", "", [("order", "Order leftover 3 Apr"), ("pro", "iPad Pro (trap)")], "order", 0),
    ("2010", "sites/facebook/index.html", "fb-og", "Timeline 2011 (trap)", "Like leftover", "", [("like", "Open Graph leftover 21 Apr"), ("tl", "Timeline (trap)")], "like", 0),
    ("2010", "sites/farmville/index.html", "farm", "FarmVille as 2010 star (trap)", "Plant leftover peak", "", [("plant", "Peak leftover"), ("star", "Star (trap)")], "plant", 0),
    ("2010", "sites/imgur/index.html", "imgur", "Instagram as this dest (trap)", "Upload leftover", "leftover.gif", [("up", "Upload leftover"), ("ig", "Instagram dest (trap)")], "up", 0),
    ("2010", "sites/foursquare/index.html", "4sq", "Swarm (trap)", "Check in leftover", "", [("check", "Check-in leftover"), ("swarm", "Swarm (trap)")], "check", 0),
    ("2010", "sites/twitter/index.html", "tweets", "280 (trap)", "Tweet leftover 140", "leftover tweet", [("140", "140 leftover"), ("280", "280 (trap)")], "140", 0),
    # 2011 — gold G+ / Letter Swap stay off. Already: timeline, ig, qwikster.
    ("2011", "sites/spotify/index.html", "spotify", "Spotify as 2011 star (trap)", "Play leftover US", "", [("us", "US leftover 14 Jul"), ("star", "Star (trap)")], "us", 0),
    ("2011", "sites/iphone/index.html", "siri", "ChatGPT (trap)", "Ask leftover Siri", "leftover question", [("ask", "Siri leftover 14 Oct"), ("gpt", "ChatGPT (trap)")], "ask", 0),
    ("2011", "sites/ipad/index.html", "ipad2", "iPad Pro (trap)", "Note leftover iPad 2", "", [("ipad2", "iPad 2 leftover 11 Mar"), ("pro", "iPad Pro (trap)")], "ipad2", 0),
    ("2011", "sites/airbnb/index.html", "airbnb", "Airbnb as 2011 star (trap)", "Book leftover stay", "leftover city", [("book", "Book leftover"), ("star", "Star (trap)")], "book", 0),
    ("2011", "sites/twitter/index.html", "tweets", "280 (trap)", "Tweet leftover 140", "leftover tweet", [("140", "140 leftover"), ("280", "280 (trap)")], "140", 0),
    # 2012 — gold IG Android / Guess Doodle stay off. Already: fb-ipo, facebook, maps, sopa.
    ("2012", "sites/pinterest/index.html", "pin", "Instagram as 2012 star (trap)", "Pin leftover", "", [("pin", "Pin leftover"), ("ig", "IG star (trap)")], "pin", 0),
    ("2012", "sites/medium/index.html", "pop-medium", "Substack (trap)", "Publish leftover", "leftover draft", [("pub", "Publish leftover"), ("sub", "Substack (trap)")], "pub", 0),
    ("2012", "sites/path/index.html", "pop-path", "Instagram (trap)", "Post leftover 50", "", [("50", "50-friend leftover"), ("ig", "Instagram (trap)")], "50", 0),
    ("2012", "sites/flipboard/index.html", "pop-flipboard", "Apple News (trap)", "Flip leftover", "", [("flip", "Flip leftover"), ("news", "Apple News (trap)")], "flip", 0),
    # 2019 — gold Disney+ / Continue Row stay off. Already: chrome, win10. marshmello stays extra.
    ("2019", "sites/tiktok/index.html", "tiktok", "Reels 2020 (trap)", "Post leftover For You", "leftover caption", [("fyp", "For You leftover 2019"), ("reels", "Reels 2020 (trap)")], "fyp", 0),
    ("2019", "sites/arcade/index.html", "arcade", "Netflix Games (trap)", "Play leftover Arcade", "", [("play", "Arcade leftover 19 Sep"), ("nflx", "Netflix Games (trap)")], "play", 0),
    ("2019", "sites/appletv/index.html", "appletv", "Disney+ as this dest (trap)", "Continue leftover TV+", "", [("cont", "TV+ leftover 1 Nov"), ("dplus", "Disney+ dest (trap)")], "cont", 0),
    ("2019", "sites/stadia/index.html", "stadia", "Stadia still ships (trap)", "Play leftover Stadia", "", [("play", "Stadia leftover 19 Nov"), ("ships", "Still ships (trap)")], "play", 0),
    ("2019", "sites/iphone/iphone11.html", "iphone11", "iPhone 12 (trap)", "Note leftover 11", "", [("11", "iPhone 11 leftover 20 Sep"), ("12", "iPhone 12 (trap)")], "11", 0),
    ("2019", "sites/airpodspro/index.html", "airpods-pro", "AirPods Max (trap)", "Note leftover ANC", "", [("anc", "Pro leftover 30 Oct"), ("max", "AirPods Max (trap)")], "anc", 0),
]


def ensure_immersion(path: Path, year: str) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    needle = f"immersion-{year}.js"
    if needle in text:
        return
    # depth: years/YYYY/sites/foo/bar.html → ../../../../js/
    tag = f'<script src="../../../../js/{needle}"></script>\n'
    if "<!-- ITT-LO-OFFICIAL:start -->" in text:
        text = text.replace("<!-- ITT-LO-OFFICIAL:start -->", tag + "<!-- ITT-LO-OFFICIAL:start -->", 1)
    elif "</body>" in text:
        text = text.replace("</body>", tag + "</body>", 1)
    else:
        text += "\n" + tag
    path.write_text(text, encoding="utf-8")


def append_matrix(rows: list[tuple]) -> int:
    path = ROOT / "e2e" / "leftover-official.matrix.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    dests = data.get("dests") or []
    have = {(d.get("year"), d.get("href"), d.get("key")) for d in dests}
    added = 0
    for year, href, key, _trap, _save, field, _picks, need, minp in rows:
        rec = {
            "year": year,
            "href": href,
            "key": f"itt{year[2:]}-{key}",
            "suffix": key,
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


def main() -> None:
    trails = trail_index()
    injected = 0
    missing = 0
    key_mismatch = 0
    for row in DESTS:
        year, href, key, trap, save, field, picks, need, minp = row
        path = ROOT / "years" / year / href
        if not path.is_file():
            print("MISSING", year, href)
            missing += 1
            continue
        info = trails.get((year, href), {})
        expect = f"itt{year[2:]}-{key}"
        live_key = info.get("whenKey") or ""
        if live_key and live_key != expect:
            print("KEY MISMATCH", year, href, "trail", live_key, "inject", expect)
            key_mismatch += 1
        nxt = ""
        lab = info.get("nextLabel") or ""
        if info.get("nextHref"):
            nxt = relhref(href, info["nextHref"])
        inject(path, panel(year, key, trap, save, field, picks, need, minp, nxt, lab))
        ensure_immersion(path, year)
        injected += 1
    added = append_matrix(DESTS)
    print("injected", injected, "missing", missing, "key_mismatch", key_mismatch, "matrix +", added)


if __name__ == "__main__":
    main()
