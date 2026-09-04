#!/usr/bin/env python3
"""Add leftover-official machines on 2014–2018 official dests.

Skip gold (star) and year-game dests. Append to the matrix — do not replace
later years (2020–2024) already wired elsewhere. Idempotent via ITT-LO-OFFICIAL.
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

# year, href, suffix, trap, save, field, picks, need, min_pick
# Gold + year game omitted on purpose (do not steal the chip / cabinet).
DESTS = [
    # 2014 — gold WhatsApp Install / game Tile Fold stay off this list
    ("2014", "sites/whatsapp/chat.html", "wa-chat", "iMessage (trap)", "Send leftover chat", "leftover chat", [("chat", "Chat leftover"), ("imsg", "iMessage (trap)")], "chat", 0),
    ("2014", "sites/heartbleed/index.html", "heartbleed", "Ignore it (trap)", "Note leftover CVE", "", [("patch", "Patch leftover"), ("ignore", "Ignore (trap)")], "patch", 0),
    ("2014", "sites/icebucket/index.html", "icebucket", "Venmo the ALS (trap)", "Note leftover dump", "", [("dump", "Dump leftover"), ("venmo", "Venmo (trap)")], "dump", 0),
    ("2014", "sites/iphone/index.html", "iphone6", "iPhone X (trap)", "Note leftover 6", "", [("6", "iPhone 6 leftover"), ("x", "iPhone X (trap)")], "6", 0),
    ("2014", "sites/iphone/pay.html", "applepay", "Google Pay (trap)", "Tap leftover Pay", "", [("tap", "Apple Pay leftover"), ("gpay", "Google Pay (trap)")], "tap", 0),
    ("2014", "sites/material/index.html", "material", "iOS 7 as Material (trap)", "Note leftover paper", "", [("paper", "Paper leftover"), ("ios7", "iOS 7 (trap)")], "paper", 0),
    ("2014", "sites/slack/index.html", "slack", "Teams (trap)", "Join leftover channel", "leftover #general", [("chan", "Channel leftover"), ("teams", "Teams (trap)")], "chan", 0),
    ("2014", "sites/twitch/index.html", "twitch", "YouTube Live (trap)", "Open leftover stream", "", [("stream", "Stream leftover"), ("yt", "YouTube Live (trap)")], "stream", 0),
    # 2015 — gold Periscope / game Blob Rush stay off
    ("2015", "sites/googlephotos/index.html", "googlephotos", "iCloud as 2015 star (trap)", "Backup leftover library", "", [("lib", "Library leftover"), ("icloud", "iCloud (trap)")], "lib", 0),
    ("2015", "sites/windows10/index.html", "win10", "Get Windows 11 (trap)", "Stay leftover Win10", "", [("stay", "Stay leftover"), ("win11", "Win11 (trap)")], "stay", 0),
    ("2015", "sites/applemusic/index.html", "applemusic", "Spotify as 2015 star (trap)", "Play leftover station", "", [("play", "Play leftover"), ("spot", "Spotify star (trap)")], "play", 0),
    ("2015", "sites/edge/index.html", "edge", "Chrome as 2015 default (trap)", "Note leftover Spartan", "", [("spartan", "Spartan leftover"), ("chrome", "Chrome default (trap)")], "spartan", 0),
    ("2015", "sites/apple/watch.html", "watch", "Watch Ultra (trap)", "Note leftover Watch", "", [("s0", "Series 0 leftover"), ("ultra", "Ultra (trap)")], "s0", 0),
    ("2015", "sites/snapchat/discover.html", "snap-discover", "Stories 2016 (trap)", "Open leftover Discover", "", [("disc", "Discover leftover"), ("stories", "Stories 2016 (trap)")], "disc", 0),
    ("2015", "sites/discord/index.html", "discord", "Slack as 2015 star (trap)", "Join leftover server", "leftover server", [("server", "Server leftover"), ("slack", "Slack star (trap)")], "server", 0),
    ("2015", "sites/letsencrypt/index.html", "le", "Paid CA only (trap)", "Issue leftover cert", "", [("cert", "Cert leftover"), ("paid", "Paid CA (trap)")], "cert", 0),
    # 2016 — gold Stories / game Gym Rush stay off
    ("2016", "sites/pokemongo/index.html", "pogo", "ARKit 2017 (trap)", "Catch leftover gym", "", [("gym", "Gym leftover"), ("arkit", "ARKit (trap)")], "gym", 0),
    ("2016", "sites/facebook/reactions.html", "fb-react", "Like only (trap)", "Pick leftover reaction", "", [("wow", "Wow leftover"), ("likeonly", "Like only (trap)")], "wow", 0),
    ("2016", "sites/whatsapp/e2e.html", "wa-e2e", "No lock (trap)", "Note leftover lock", "", [("lock", "Lock leftover"), ("open", "No lock (trap)")], "lock", 0),
    ("2016", "sites/iphone/index.html", "iphone7", "Keep the jack (trap)", "Note leftover 7", "", [("7", "iPhone 7 leftover"), ("jack", "Keep jack (trap)")], "7", 0),
    ("2016", "sites/vine/goodbye.html", "vine-end", "Vine still ships (trap)", "Note leftover goodbye", "", [("bye", "Goodbye leftover"), ("ships", "Still ships (trap)")], "bye", 0),
    ("2016", "sites/snapchat/spectacles.html", "spectacles", "Vision Pro (trap)", "Note leftover glasses", "", [("glass", "Spectacles leftover"), ("vp", "Vision Pro (trap)")], "glass", 0),
    ("2016", "sites/musically/index.html", "musically", "TikTok 2018 merge (trap)", "Post leftover lip-sync", "", [("lip", "Lip-sync leftover"), ("merge", "2018 merge (trap)")], "lip", 0),
    ("2016", "sites/windows10/end.html", "win10-end", "Forced Win11 (trap)", "Note leftover free-upgrade end", "", [("end", "Upgrade-end leftover"), ("win11", "Win11 (trap)")], "end", 0),
    # 2017 — gold Face ID / game Storm Circle stay off
    ("2017", "sites/fortnite/index.html", "fortnite", "OG season shop (trap)", "Drop leftover circle", "", [("drop", "Drop leftover"), ("og", "OG shop (trap)")], "drop", 0),
    ("2017", "sites/twitter/280.html", "twitter-280", "Keep 140 (trap)", "Note leftover 280", "leftover tweet", [("280", "280 leftover"), ("140", "Keep 140 (trap)")], "280", 0),
    ("2017", "sites/teams/index.html", "teams", "Slack as 2017 default (trap)", "Join leftover team", "", [("team", "Team leftover"), ("slack", "Slack default (trap)")], "team", 0),
    ("2017", "sites/vine/gone.html", "vine-gone", "Vine is back (trap)", "Note leftover gone", "", [("gone", "Gone leftover"), ("back", "Back (trap)")], "gone", 0),
    ("2017", "sites/switch/index.html", "switch", "Wii U as 2017 star (trap)", "Note leftover hybrid", "", [("hybrid", "Hybrid leftover"), ("wiiu", "Wii U star (trap)")], "hybrid", 0),
    ("2017", "sites/wannacry/index.html", "wannacry", "Pay the ransom (trap)", "Note leftover patch", "", [("patch", "Patch leftover"), ("pay", "Pay (trap)")], "patch", 0),
    ("2017", "sites/musically/index.html", "musically", "Already TikTok (trap)", "Post leftover 2017 clip", "", [("clip", "2017 clip leftover"), ("tiktok", "Already TikTok (trap)")], "clip", 0),
    ("2017", "sites/equifax/index.html", "equifax", "Ignore the freeze (trap)", "Note leftover freeze", "", [("freeze", "Freeze leftover"), ("ignore", "Ignore (trap)")], "freeze", 0),
    # 2018 — gold GDPR / game Consent Dash stay off
    ("2018", "sites/tiktok/fyp.html", "tiktok-fyp", "Reels (trap)", "Tap leftover For You", "", [("fyp", "For You leftover"), ("reels", "Reels (trap)")], "fyp", 0),
    ("2018", "sites/trust/index.html", "hearing", "No hearing (trap)", "Note leftover hearing", "", [("hear", "Hearing leftover"), ("none", "No hearing (trap)")], "hear", 0),
    ("2018", "sites/instagram/igtv.html", "igtv", "Reels as IGTV (trap)", "Open leftover IGTV", "", [("igtv", "IGTV leftover"), ("reels", "Reels (trap)")], "igtv", 0),
    ("2018", "sites/chrome/not-secure.html", "not-secure", "HTTP is fine (trap)", "Note leftover Not Secure", "", [("mark", "Not Secure leftover"), ("fine", "HTTP fine (trap)")], "mark", 0),
    ("2018", "sites/homepod/index.html", "homepod", "HomePod mini 2020 (trap)", "Note leftover HomePod", "", [("pod", "HomePod leftover"), ("mini", "Mini 2020 (trap)")], "pod", 0),
    ("2018", "sites/spectre/index.html", "spectre", "Ignore the CPU (trap)", "Note leftover Spectre", "", [("cpu", "Spectre leftover"), ("ignore", "Ignore (trap)")], "cpu", 0),
    ("2018", "sites/fortnite/switch.html", "fn-switch", "Fortnite iOS-only (trap)", "Note leftover Switch drop", "", [("nsw", "Switch leftover"), ("iosonly", "iOS-only (trap)")], "nsw", 0),
    ("2018", "sites/github/microsoft.html", "github", "GitHub stays independent (trap)", "Note leftover $7.5B", "", [("deal", "$7.5B leftover"), ("indie", "Independent (trap)")], "deal", 0),
]


def ensure_immersion(path: Path, year: str) -> None:
    text = path.read_text(encoding="utf-8", errors="replace")
    needle = f"immersion-{year}.js"
    if needle in text:
        return
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
    for row in DESTS:
        year, href, key, trap, save, field, picks, need, minp = row
        path = ROOT / "years" / year / href
        if not path.is_file():
            print("MISSING", year, href)
            missing += 1
            continue
        info = trails.get((year, href), {})
        nxt = ""
        lab = info.get("nextLabel") or ""
        if info.get("nextHref"):
            nxt = relhref(href, info["nextHref"])
        inject(path, panel(year, key, trap, save, field, picks, need, minp, nxt, lab))
        ensure_immersion(path, year)
        injected += 1
    added = append_matrix(DESTS)
    print("injected", injected, "missing", missing, "matrix +", added)


if __name__ == "__main__":
    main()
