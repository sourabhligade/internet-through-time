#!/usr/bin/env python3
"""2014–2019 leftover +6 dests (2→8). Skip wiped 2020.

Research:
  docs/2014-READ-FIRST.md · 2015-READ-FIRST.md · 2016-READ-FIRST.md
  docs/2017-READ-FIRST.md · 2018-READ-FIRST.md · 2019-READ-FIRST.md
  docs/5X-REAL-DEST-GAPS-2011-2020-AND-1994-2007.md
  docs/2015-RESEARCH.md · docs/2019-FROM-SCRATCH-RESEARCH-…-2026-08-20.md
  docs/2X-LINKS-EVERY-YEAR-NEXT-PASS-RESEARCH-…-2026-08-26.md

Does not: move stars, grow guided <ol>, dest-field plaques, restore 2020.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent: ITT-4X:suffix markers + ITT-6X-ROOM rooms.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

VERB = {
    "query": "Type leftover",
    "checks": "Ack leftover",
    "hops": "Hop leftover",
    "wait": "Save leftover",
}

PREFIX = {
    "2014": "itt14",
    "2015": "itt15",
    "2016": "itt16",
    "2017": "itt17",
    "2018": "itt18",
    "2019": "itt19",
}

STAR_HREF = {
    "2014": "sites/whatsapp/index.html",
    "2015": "sites/periscope/index.html",
    "2016": "sites/instagram/stories.html",
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
}

STAR_LABEL = {
    "2014": "★ WhatsApp Install",
    "2015": "★ Periscope Go LIVE",
    "2016": "★ Instagram Stories",
    "2017": "★ Face ID",
    "2018": "★ GDPR Manage",
    "2019": "★ Disney+ Continue",
}

# year, slug, suffix, kind, title, extra, copy_html
ROOMS: list[tuple] = []


def R(year, slug, suffix, kind, title, extra, copy_html):
    ROOMS.append((year, slug, suffix, kind, title, extra, copy_html))


# ----- 2014 (5X densify + new dirs · READ-FIRST leftovers already on disk) -----
R(
    "2014",
    "oculus",
    "oc-6x",
    "checks",
    "Oculus leftover 6×",
    [
        "25 Mar 2014 · Facebook ~$2B ($400M cash + stock) · not a headset you wear here",
        "Rift is still a dev kit leftover · consumer CV1 is 2016 · not the chip",
    ],
    """<h1>Oculus leftover</h1>
<p>25 Mar 2014. Facebook agrees to buy Oculus VR for about <b>$2 billion</b> ($400M cash + stock, plus earn-out). The Rift is still a developer kit. Consumer CV1 ships <b>2016</b>.</p>
<p class="honest">Leftover literacy. No headset. No invented Oculus mark. Not the WhatsApp chip.</p>""",
)
R(
    "2014",
    "ello",
    "el-6x",
    "query",
    "Ello leftover 6×",
    "ello leftover invite",
    """<h1>Ello leftover</h1>
<p>March–April 2014 invite-only social. Manifesto line: you are not a product. Invite rush spikes in <b>September</b> after Facebook’s real-name fight. Not a mass feed.</p>
<p class="honest">Leftover invite note. Empty never writes. No official Ello pixel.</p>""",
)
R(
    "2014",
    "serial",
    "se-6x",
    "hops",
    "Serial leftover 6×",
    [("ep1", "Episode 1 leftover"), ("subscribe", "Subscribe leftover")],
    """<h1>Serial leftover</h1>
<p><i>This American Life</i> spin-off. Season one drops <b>3 Oct 2014</b> (Sarah Koenig). First podcast to become a mass commute object. Not a courtroom.</p>
<p class="honest">Leftover listen. No victim stills. No case dump. Not the chip.</p>""",
)
R(
    "2014",
    "musically14",
    "ml-6x",
    "query",
    "musical.ly leftover 6×",
    "musically leftover 2014",
    """<h1>musical.ly leftover</h1>
<p>2014 launch year. Lip-sync loops on a phone. The word on the icon is <b>musical.ly</b>. TikTok merge is <b>2 Aug 2018</b>. Do not print TikTok as the 2014 name.</p>
<p class="honest">Leftover caption. Empty never writes. No official mark. Not the chip.</p>""",
)
R(
    "2014",
    "truecrypt",
    "tc-6x",
    "checks",
    "TrueCrypt leftover 6×",
    [
        "28 May 2014 · site warns unfixed issues · migrate leftover",
        "Literacy only · no decrypt theater · no exploit",
    ],
    """<h1>TrueCrypt leftover</h1>
<p>28 May 2014. truecrypt.org redirects and warns: not secure, may contain unfixed issues. Version 7.2 decrypts only. Audit was mid-flight.</p>
<p class="honest">Literacy leftover. No payload. No live decrypt. Not Heartbleed (that room is separate).</p>""",
)
R(
    "2014",
    "echoinvite",
    "ec-6x",
    "wait",
    "Echo invite leftover 6×",
    None,
    """<h1>Echo invite leftover</h1>
<p>6 Nov 2014. Amazon announces Echo / Alexa as an <b>invite</b>. Mass $179.99 order is <b>2015</b> (23 Jun / 14 Jul). Do not treat this as a kitchen buy.</p>
<p class="honest">Invite leftover. Wait the leftover timer. No real Alexa. Not the chip.</p>""",
)

# ----- 2015 (READ-FIRST P1 + RESEARCH calendar + 5X) -----
R(
    "2015",
    "waweb",
    "ww-6x",
    "checks",
    "WhatsApp Web leftover 6×",
    [
        "21 Jan 2015 · Chrome first · QR pairs the phone",
        "Phone must stay on · iOS is not day one · not the 2014 install star",
    ],
    """<h1>WhatsApp Web leftover</h1>
<p>21 Jan 2015. web.whatsapp.com is a <b>mirror</b> of the phone. Chrome first. Scan a QR. The phone must stay connected. iOS is blocked “for now.”</p>
<p class="honest">2014 deal continuity. Not a second WhatsApp star. Empty / 0 ticks never write.</p>""",
)
R(
    "2015",
    "titleii",
    "t2-6x",
    "checks",
    "Title II leftover 6×",
    [
        "26 Feb 2015 · FCC 3–2 Open Internet · Title II reclass",
        "Civic leftover · not a game · repeal is 2017",
    ],
    """<h1>Title II leftover</h1>
<p>26 Feb 2015. FCC votes <b>3–2</b> to reclassify broadband under Title II. Released 12 Mar, effective 12 Jun. Four-million-comment year. Not a playable.</p>
<p class="honest">Civic leftover on About-class weather. Not Periscope. Repeal is Dec 2017.</p>""",
)
R(
    "2015",
    "swiftoss",
    "sw-6x",
    "query",
    "Swift OSS leftover 6×",
    "swift leftover apache",
    """<h1>Swift leftover</h1>
<p>3 Dec 2015. Apple opens Swift under Apache 2.0 — same day as Let’s Encrypt public beta. Language leftover, not a cert room.</p>
<p class="honest">Open-source leftover. Empty never writes. Not the Periscope chip.</p>""",
)
R(
    "2015",
    "instant",
    "ia-6x",
    "query",
    "Instant Articles leftover 6×",
    "instant articles leftover",
    """<h1>Instant Articles leftover</h1>
<p>May 2015. Facebook Instant Articles: publishers ship a story that loads inside the app. AMP is announced in October; SERP habit is <b>2016</b>.</p>
<p class="honest">Publisher leftover. No Facebook pixel. Not a second Photos locker.</p>""",
)
R(
    "2015",
    "agario",
    "ag-6x",
    "hops",
    "Agar.io leftover 6×",
    [("split", "Split leftover"), ("name", "Name leftover")],
    """<h1>Agar.io leftover</h1>
<p>2015 browser blob. You name a cell and eat smaller cells. Year game on this door is still the cabinet leftover — this room is the site habit.</p>
<p class="honest">Leftover hops. No official mark. Not Periscope.</p>""",
)
R(
    "2015",
    "secret",
    "sec-6x",
    "query",
    "Secret leftover 6×",
    "secret app leftover",
    """<h1>Secret leftover</h1>
<p>Anonymous-share app. 2015 is the wind-down year (April shutdown class). Whisper stays. Do not treat this as a 2014 launch room.</p>
<p class="honest">Shutdown leftover. Empty never writes. No dump. Not the chip.</p>""",
)

# ----- 2016 (READ-FIRST P1 + 5X new dirs) -----
R(
    "2016",
    "smario",
    "sm-6x",
    "query",
    "Super Mario Run leftover 6×",
    "mario run leftover",
    """<h1>Super Mario Run leftover</h1>
<p>15 Dec 2016. Nintendo’s first Mario on a phone. iOS first. Free download, then a one-time <b>$9.99</b> unlock. Always-on internet leftover. Android is later.</p>
<p class="honest">Not Pokémon GO (that room is separate). Not the Stories chip. Empty never writes.</p>""",
)
R(
    "2016",
    "assistant",
    "as-6x",
    "query",
    "Assistant leftover 6×",
    "ok google leftover",
    """<h1>Google Assistant leftover</h1>
<p>4 Oct 2016. Pixel launch. “Ok Google” leftover on a new phone. Allo is a separate chat leftover. Do not print Gemini.</p>
<p class="honest">2016 Assistant. Empty never writes. No official Google pixel. Not Stories.</p>""",
)
R(
    "2016",
    "houseparty",
    "hp-6x",
    "hops",
    "Houseparty leftover 6×",
    [("knock", "Knock leftover"), ("leave", "Leave leftover")],
    """<h1>Houseparty leftover</h1>
<p>2016 group-video leftover. You knock, they let you in, four faces on a phone. Not FaceTime. Not Zoom (2020).</p>
<p class="honest">Leftover hops. No real camera. Not the Stories chip.</p>""",
)
R(
    "2016",
    "inbox",
    "in-6x",
    "query",
    "Inbox leftover 6×",
    "inbox leftover bundle",
    """<h1>Inbox leftover</h1>
<p>Inbox by Gmail is the bundles-and-pins habit in 2016. Sunset is <b>2 Apr 2019</b>. Do not treat this as Gmail classic.</p>
<p class="honest">Leftover bundle note. Empty never writes. Not Stories.</p>""",
)
R(
    "2016",
    "linkedinms",
    "li-6x",
    "checks",
    "LinkedIn leftover 6×",
    [
        "13 Jun 2016 · Microsoft agrees to buy LinkedIn for $26.2B",
        "Leftover deal literacy · not a new feed star",
    ],
    """<h1>LinkedIn leftover</h1>
<p>13 Jun 2016. Microsoft announces it will buy LinkedIn for <b>$26.2 billion</b>. Close later that year. Work graph leftover, not the Stories chip.</p>
<p class="honest">Deal leftover. No invented LinkedIn pixel. Incomplete never writes.</p>""",
)
R(
    "2016",
    "jio",
    "ji-6x",
    "query",
    "Jio leftover 6×",
    "jio leftover 2016",
    """<h1>Jio leftover</h1>
<p>5 Sep 2016. Reliance Jio commercial launch in India. Cheap 4G leftover that changes who can stay online. Not a US default room.</p>
<p class="honest">Scale leftover. Empty never writes. Not Pokémon GO.</p>""",
)

# ----- 2017 (READ-FIRST P1 seeds) -----
R(
    "2017",
    "youtubetv",
    "ytv-6x",
    "query",
    "YouTube TV leftover 6×",
    "youtube tv leftover",
    """<h1>YouTube TV leftover</h1>
<p>2017 live-TV skinny bundle. Launch price class <b>$35</b> / month. Not YouTube the homepage. Not cable.</p>
<p class="honest">Leftover subscribe note. Empty never writes. Not Face ID.</p>""",
)
R(
    "2017",
    "pixel2",
    "px-6x",
    "query",
    "Pixel 2 leftover 6×",
    "pixel 2 leftover",
    """<h1>Pixel 2 leftover</h1>
<p>4 Oct 2017. Pixel 2 / 2 XL. Camera leftover, not iPhone X. Unlimited original-quality Photos leftover still rides along.</p>
<p class="honest">Hardware leftover. No official Google pixel. Not the Face ID chip.</p>""",
)
R(
    "2017",
    "ios11ar",
    "ar-6x",
    "hops",
    "ARKit leftover 6×",
    [("plane", "Plane leftover"), ("drop", "Drop leftover")],
    """<h1>ARKit leftover</h1>
<p>iOS 11 ships 19 Sep 2017. ARKit is the plane-detect leftover — a coffee cup on the table, not a headset. Animoji is the Face ID room.</p>
<p class="honest">Leftover hops. No real camera. Not Face ID gold.</p>""",
)
R(
    "2017",
    "krack",
    "kr-6x",
    "checks",
    "KRACK leftover 6×",
    [
        "Oct 2017 · WPA2 KRACK literacy · patch leftover",
        "No packet capture · no exploit · not WannaCry",
    ],
    """<h1>KRACK leftover</h1>
<p>October 2017. KRACK against WPA2. The verb is <b>patch the router / the phone</b>. Not a payload room. WannaCry / NotPetya stay in their rooms.</p>
<p class="honest">Literacy only. No exploit. Incomplete never writes.</p>""",
)
R(
    "2017",
    "nnrepeal",
    "nn-6x",
    "checks",
    "Title II repeal leftover 6×",
    [
        "14 Dec 2017 · FCC votes to repeal the 2015 Open Internet order",
        "Civic leftover · not a game · 2015 vote was Title II",
    ],
    """<h1>Title II repeal leftover</h1>
<p>14 Dec 2017. FCC votes to repeal the 2015 Open Internet / Title II order. Civic leftover. Not a playable. 2015 was the classify year.</p>
<p class="honest">Weather leftover. Not Face ID. Not Fortnite.</p>""",
)
R(
    "2017",
    "flashend",
    "fl-6x",
    "query",
    "Flash EOL announce leftover 6×",
    "flash leftover 2020",
    """<h1>Flash leftover</h1>
<p>25 Jul 2017. Adobe announces Flash Player will <b>end in 2020</b>. This year is the announce, not the kill switch. Do not print 31 Dec 2020 as a 2017 verb.</p>
<p class="honest">Announce leftover. Empty never writes. Not the chip.</p>""",
)

# ----- 2018 (5X new dirs + densify) -----
R(
    "2018",
    "fnios",
    "fi-6x",
    "query",
    "Fortnite iOS leftover 6×",
    "fortnite ios leftover",
    """<h1>Fortnite iOS leftover</h1>
<p>2018. Battle Royale on an iPhone. Switch leftover is a different room. Creative is a different room. Epic vs Apple is <b>2020</b>.</p>
<p class="honest">Mobile leftover. No V-Bucks checkout. Not the GDPR chip.</p>""",
)
R(
    "2018",
    "gplusend",
    "gp-6x",
    "checks",
    "Google+ sunset leftover 6×",
    [
        "8 Oct 2018 · consumer Google+ shutdown announced",
        "Funeral leftover · consumer dies 2 Apr 2019 · not a new network",
    ],
    """<h1>Google+ leftover</h1>
<p>8 Oct 2018. Google announces consumer Google+ will shut down (later dated <b>2 Apr 2019</b>). 2018 is the funeral notice. Not a new social star.</p>
<p class="honest">Sunset leftover. Not GDPR Manage. Incomplete never writes.</p>""",
)
R(
    "2018",
    "clpersonals",
    "cl-6x",
    "checks",
    "Craigslist personals leftover 6×",
    [
        "23 Mar 2018 · personals taken offline after FOSTA",
        "Literacy leftover · no personals content · not a dating room",
    ],
    """<h1>Craigslist personals leftover</h1>
<p>23 Mar 2018. Craigslist takes personals offline after Congress passes FOSTA. Missed Connections class goes with it. No ads on this page.</p>
<p class="honest">Law leftover. No listings. Not the GDPR chip.</p>""",
)
R(
    "2018",
    "mastodon",
    "ma-6x",
    "query",
    "Mastodon leftover 6×",
    "mastodon leftover 2018",
    """<h1>Mastodon leftover</h1>
<p>2018 federated habit. Join a server, see a local timeline. Not Twitter. Not Threads (2023). Instance leftover, not a bird rebrand.</p>
<p class="honest">Leftover toot note. Empty never writes. No official mark.</p>""",
)
R(
    "2018",
    "itunesmovie",
    "im-6x",
    "query",
    "iTunes movie leftover 6×",
    "itunes movie leftover",
    """<h1>iTunes movie leftover</h1>
<p>2018. You still rent the movie in iTunes. Apple TV+ is <b>1 Nov 2019</b>. Disney+ is 2019. This room is the old store habit.</p>
<p class="honest">Rental leftover. No real charge. Not GDPR. Not TV+.</p>""",
)
R(
    "2018",
    "screentime",
    "st-6x",
    "hops",
    "Screen Time leftover 6×",
    [("downtime", "Downtime leftover"), ("limit", "App limit leftover")],
    """<h1>Screen Time leftover</h1>
<p>iOS 12 (17 Sep 2018). Settings → Screen Time. Downtime + app limits leftover. Not a parental-control product room. Not Face ID (2017).</p>
<p class="honest">Leftover hops. No real device lock. Not the GDPR chip.</p>""",
)

# ----- 2019 (harvest calendar · READ-FIRST residuals) -----
R(
    "2019",
    "ios13dark",
    "dk-6x",
    "hops",
    "iOS 13 Dark Mode leftover 6×",
    [("on", "Dark leftover"), ("off", "Light leftover")],
    """<h1>Dark Mode leftover</h1>
<p>WWDC 3 Jun 2019. iOS 13 Dark Mode. Ships 19 Sep. System leftover, not a new phone. iPhone 11 is a different leftover room.</p>
<p class="honest">Toggle leftover. No official Apple pixel. Not Disney+ Continue.</p>""",
)
R(
    "2019",
    "ipados",
    "ip-6x",
    "query",
    "iPadOS leftover 6×",
    "ipados leftover",
    """<h1>iPadOS leftover</h1>
<p>WWDC 2019 names <b>iPadOS</b>. Ships 30 Sep 2019. Home screen leftover + Slide Over leftover. Not iOS 13 the phone. Not a new iPad buy.</p>
<p class="honest">Name leftover. Empty never writes. Not the Continue chip.</p>""",
)
R(
    "2019",
    "libra",
    "lb-6x",
    "checks",
    "Libra leftover 6×",
    [
        "18 Jun 2019 · Facebook Libra white paper · Calibra wallet name",
        "Announce leftover · not a wallet you fund · Diem is later",
    ],
    """<h1>Libra leftover</h1>
<p>18 Jun 2019. Facebook publishes the Libra white paper. Calibra is the wallet name. This is an announce leftover, not a coin you hold. Diem rename is later.</p>
<p class="honest">No real wallet. No fund. Not Disney+.</p>""",
)
R(
    "2019",
    "cnil",
    "cn-6x",
    "checks",
    "CNIL leftover 6×",
    [
        "21 Jan 2019 · CNIL fines Google €50M under GDPR",
        "Residual fine leftover · 2018 was the Manage star · not a new banner",
    ],
    """<h1>CNIL leftover</h1>
<p>21 Jan 2019. CNIL fines Google <b>€50 million</b> under GDPR. Last year’s banner is still the 2018 star. This is the leftover fine, not a new Manage door.</p>
<p class="honest">Residual literacy. Not Disney+ Continue. Incomplete never writes.</p>""",
)
R(
    "2019",
    "ftcfb",
    "ft-6x",
    "checks",
    "FTC Facebook leftover 6×",
    [
        "24 Jul 2019 · FTC $5B Facebook penalty + new restrictions",
        "Residual leftover · not a 2018 hearing room · not the chip",
    ],
    """<h1>FTC leftover</h1>
<p>24 Jul 2019. FTC imposes a <b>$5 billion</b> penalty and new privacy restrictions on Facebook. 2018 hearing stays in 2018. Not a Cambridge room.</p>
<p class="honest">Residual leftover. No targeting UI. Not Disney+.</p>""",
)
R(
    "2019",
    "inboxend",
    "ib-6x",
    "wait",
    "Inbox sunset leftover 6×",
    None,
    """<h1>Inbox sunset leftover</h1>
<p>2 Apr 2019. Inbox by Gmail turns off (announced 2018). Bundles go back to Gmail. Not a new mail star.</p>
<p class="honest">Funeral leftover. Wait the leftover timer. Not Continue.</p>""",
)


def panel_inner(kind: str, extra) -> str:
    if kind == "query":
        ph = extra or "leftover"
        return (
            f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
            f'autocomplete="off" placeholder="{ph}"></label></p>\n'
        )
    if kind == "checks":
        labs = extra or ["Leftover tick one", "Leftover tick two"]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        return f"<p>{boxes}</p>\n"
    if kind == "wait":
        return (
            '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">'
            "Wait leftover</button></p>\n"
        )
    hops = extra or [("a", "Hop A"), ("b", "Hop B")]
    btns = " ".join(
        f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
    )
    return f"<p>{btns}</p>\n"


def fourx(year: str, suffix: str, kind: str, title: str, nxt: str, nl: str, extra) -> str:
    pref = PREFIX[year]
    verb = VERB[kind]
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f"{panel_inner(kind, extra)}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{pref}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def next_of(i: int, year: str) -> tuple[str, str]:
    year_rooms = [(j, r) for j, r in enumerate(ROOMS) if r[0] == year]
    pos = [k for k, (j, r) in enumerate(year_rooms) if j == i][0]
    if pos + 1 < len(year_rooms):
        nxt = year_rooms[pos + 1][1]
        return f"sites/{nxt[1]}/index.html", nxt[4]
    return STAR_HREF[year], STAR_LABEL[year]


def write_room(year, slug, suffix, kind, title, extra, copy_html, next_rel, nl) -> str:
    dest = ROOT / "years" / year / "sites" / slug / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.is_file() and f"ITT-4X:{suffix}:" in dest.read_text(encoding="utf-8"):
        return "exists"
    nxt_href = f"../{Path(next_rel).name}/index.html" if next_rel.startswith("sites/") and next_rel.count("/") == 2 else (
        f"../../{STAR_HREF[year]}" if next_rel == STAR_HREF[year] else f"../{Path(next_rel).parts[1]}/{Path(next_rel).name}"
    )
    # Prefer a correct relative from sites/SLUG/index.html
    if next_rel == STAR_HREF[year]:
        nxt_href = "../../" + STAR_HREF[year]
    else:
        nxt_slug = next_rel.split("/")[1]
        nxt_file = "/".join(next_rel.split("/")[2:])
        nxt_href = f"../{nxt_slug}/{nxt_file}"

    panel = fourx(year, suffix, kind, title, nxt_href, nl, extra)
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<!-- ITT-6X-ROOM:{slug} -->
<div style="max-width:520px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
{copy_html}
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
</div>
{panel}
<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""
    dest.write_text(html, encoding="utf-8")
    return "ok"


def matrix_row(year, slug, suffix, kind, title, next_rel, nl) -> dict:
    return {
        "year": year,
        "path": f"/years/{year}/sites/{slug}/index.html",
        "key": f"{PREFIX[year]}-{suffix}",
        "kind": kind,
        "title": title,
        "next": f"/years/{year}/{next_rel}",
        "nextLabel": nl,
    }


def patch_home(year: str, rows: list[tuple]) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    if not home.is_file():
        print(f"SKIP home {year}")
        return
    t = home.read_text(encoding="utf-8")
    links = []
    for slug, suffix, title in rows:
        href = f"../sites/{slug}/index.html"
        links.append(
            f' <a href="{href}" data-trail-keys="{PREFIX[year]}-{suffix}">{title}</a> ·'
        )
    star = f' <a href="../{STAR_HREF[year]}">{STAR_LABEL[year]}</a>'
    inner = (
        f'<p class="itt-2x-trails" id="ott-2x-{year}-6x" data-itt-pop-l9="{year}" '
        f'style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px solid #1565c0;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>6× leftover dests</b> (new doors · not the chip · incomplete never writes):"
        + "".join(links)
        + star
        + "</p>"
    )
    marker = f"<!-- ITT-2X-6X:{year}:start -->"
    end = f"<!-- ITT-2X-6X:{year}:end -->"
    block = f"{marker}\n{inner}\n{end}\n"
    if marker in t:
        t = re.sub(
            re.escape(marker) + r".*?" + re.escape(end),
            block.strip(),
            t,
            count=1,
            flags=re.S,
        )
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    else:
        t += block
    home.write_text(t, encoding="utf-8")


def main() -> None:
    added = []
    skipped = []
    by_year: dict[str, list] = {}
    matrix_new = []
    for i, row in enumerate(ROOMS):
        year, slug, suffix, kind, title, extra, copy_html = row
        nxt, nl = next_of(i, year)
        st = write_room(year, slug, suffix, kind, title, extra, copy_html, nxt, nl)
        by_year.setdefault(year, []).append((slug, suffix, title))
        if st == "ok":
            added.append(f"{year}/{slug}")
        else:
            skipped.append(f"{year}/{slug}")
        matrix_new.append(matrix_row(year, slug, suffix, kind, title, nxt, nl))

    mx_path = ROOT / "e2e" / "2x-links.matrix.json"
    mx = json.loads(mx_path.read_text(encoding="utf-8"))
    have = {(r["year"], r["key"]) for r in mx}
    n = 0
    for rec in matrix_new:
        if (rec["year"], rec["key"]) not in have:
            mx.append(rec)
            have.add((rec["year"], rec["key"]))
            n += 1
    mx_path.write_text(json.dumps(mx, indent=2) + "\n", encoding="utf-8")

    for year, rows in by_year.items():
        patch_home(year, rows)

    print(f"rooms +{len(added)} already {len(skipped)}")
    for a in added:
        print(" ", a)
    print(f"matrix +{n}")
    for y in ("2014", "2015", "2016", "2017", "2018", "2019"):
        print(f"  {y} matrix now {sum(1 for r in mx if r['year']==y)}")


if __name__ == "__main__":
    main()
