#!/usr/bin/env python3
"""2017–2019 leftover 2× deepen — year-true product theaters.

Last-5 live years minus already-deepened 2021/2022.
HTML stays ≤ 90. Stars unmoved. Guided stays 6.
4× leftover packs so e2e 2× still walks. Incomplete never writes.
No dest-field plaques. No invented brand pixels.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PREFIX = {"2017": "itt17", "2018": "itt18", "2019": "itt19"}
NS = {"2017": "p17", "2018": "p18", "2019": "p19"}
STAR_HREF = {
    "2017": "sites/iphone/x.html",
    "2018": "sites/gdpr/index.html",
    "2019": "sites/disneyplus/home.html",
}
STAR_LABEL = {
    "2017": "★ Face ID",
    "2018": "★ GDPR Manage",
    "2019": "★ Disney+ Who’s watching",
}
VERB4 = {"query": "Type leftover", "checks": "Ack leftover", "hops": "Hop leftover", "wait": "Save leftover"}

# year, slug, suffix, kind, tone, bar, h1, life, ticks, field|None, hops|None, wait|None,
# trap_lab, trap_msg, go_lab
D: list[tuple] = []


def add(*row):
    D.append(row)


# ---------- 2017 (24) Face ID is gold · TikTok merge / GDPR / Switch Fortnite are not ----------
add("2017", "facebook2b", "fb2b-dp", "checks", "win",
    "Facebook leftover · 2 billion",
    "Facebook 2 billion leftover",
    "<p><b>27 Jun 2017</b>. Facebook leftover two-billion people note. Consumer app is still Facebook. Meta is <b>2021</b>. Reels is <b>2020</b>.</p>",
    ["27 Jun 2017 · Facebook leftover 2 billion note", "Not Meta. Not Reels. Not the Face ID chip."],
    None, None, None,
    "Open Meta (trap)", "Meta is 28 Oct 2021. That click never writes.",
    "Ack 2 billion leftover")
add("2017", "yahoo3b", "yahoo3b-dp", "checks", "warn",
    "Yahoo leftover · 3 billion",
    "Yahoo 3 billion leftover",
    "<p><b>3 Oct 2017</b>. Verizon leftover disclosure: Yahoo breach hits about <b>3 billion</b> accounts. Literacy leftover. No dump. No live login steal.</p>",
    ["3 Oct 2017 · Yahoo leftover ~3 billion accounts", "No dump. No live steal. Not Equifax dest."],
    None, None, None,
    "Dump the list (trap)", "No dump. That click never writes.",
    "Ack breach leftover")
add("2017", "ios11", "ios11-dp", "checks", "ios",
    "Settings · iOS 11 leftover",
    "iOS 11 leftover",
    "<p><b>19 Sep 2017</b>. iOS 11 leftover. Control Center leftover. Files leftover dest is next door. Face ID dest is the chip — this room never writes it.</p>",
    ["19 Sep 2017 · iOS 11 leftover · Control Center", "Not Face ID gold. Not iOS 12."],
    None, None, None,
    "Unlock with Face ID (trap)", "Face ID is the chip on the iPhone X dest. That click never writes.",
    "Ack iOS 11 leftover")
add("2017", "iphone8", "iphone8-dp", "query", "ios",
    "iPhone 8 leftover",
    "iPhone 8 leftover",
    "<p><b>22 Sep 2017</b>. iPhone 8 leftover. Home button leftover. The X dest is next door. Not the chip.</p>",
    ["22 Sep 2017 · iPhone 8 leftover · Home button still here", "Not Face ID. Not iPhone XS (2018)."],
    "iphone 8 leftover", None, None,
    "This is Face ID gold (trap)", "Face ID is the chip on the X dest. That click never writes.",
    "Save iPhone 8 leftover")
add("2017", "watch3", "watch3-dp", "query", "ios",
    "Apple Watch Series 3 leftover",
    "Watch Series 3 leftover",
    "<p><b>22 Sep 2017</b>. Series 3 leftover. Cellular leftover. No live pair. Not AirPods Pro (2019).</p>",
    ["22 Sep 2017 · Series 3 leftover · cellular leftover", "No live pair. Not Face ID gold."],
    "watch leftover 2017", None, None,
    "Pair live (trap)", "No live pair. That click never writes.",
    "Save Watch leftover")
add("2017", "xboxonex", "xonex-dp", "query", "win",
    "Xbox One X leftover · $499",
    "Xbox One X leftover",
    "<p><b>7 Nov 2017</b>. Xbox One X leftover. About <b>$499</b>. Not Switch dest. Not Fortnite gold.</p>",
    ["7 Nov 2017 · Xbox One X leftover · about $499", "Not Switch dest. Not the chip."],
    "xbox one x leftover", None, None,
    "This is Switch gold (trap)", "Switch dest already exists. That click never writes.",
    "Save Xbox leftover")
add("2017", "odyssey", "odyssey-dp", "query", "win",
    "Super Mario Odyssey leftover",
    "Odyssey leftover",
    "<p><b>27 Oct 2017</b>. Super Mario Odyssey leftover on Switch. Switch dest already exists. No live cart charge.</p>",
    ["27 Oct 2017 · Odyssey leftover · Switch leftover game", "No live cart. Not Fortnite gold."],
    "odyssey leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save Odyssey leftover")
add("2017", "cmebtc", "cmebtc-dp", "checks", "coin",
    "CME leftover · Bitcoin futures",
    "CME Bitcoin leftover",
    "<p><b>17 Dec 2017</b>. CME leftover Bitcoin futures. Bitcoin ATH dest already exists. No live order.</p>",
    ["17 Dec 2017 · CME leftover Bitcoin futures", "No live order. Not the ATH dest gold."],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack futures leftover")
add("2017", "bch", "bch-dp", "query", "coin",
    "Bitcoin Cash leftover fork",
    "Bitcoin Cash leftover",
    "<p><b>1 Aug 2017</b>. Bitcoin Cash leftover fork. No live wallet. No live trade.</p>",
    ["1 Aug 2017 · Bitcoin Cash leftover fork", "No live wallet. Not the ATH dest."],
    "bitcoin cash leftover", None, None,
    "Send live coin (trap)", "No live wallet. That click never writes.",
    "Save fork leftover")
add("2017", "cloudbleed", "cbleed-dp", "checks", "warn",
    "Cloudbleed leftover · patch",
    "Cloudbleed leftover",
    "<p><b>23 Feb 2017</b>. Cloudflare leftover memory leak. Verb is <b>rotate / ack</b>. No dump. No exploit.</p>",
    ["23 Feb 2017 · Cloudbleed leftover · verb is rotate / ack", "No dump. No exploit."],
    None, None, None,
    "Dump the cache (trap)", "No dump. That click never writes.",
    "Ack rotate leftover")
add("2017", "vault7", "vault7-dp", "checks", "warn",
    "Vault 7 leftover literacy",
    "Vault 7 leftover",
    "<p><b>7 Mar 2017</b>. WikiLeaks leftover Vault 7 literacy. No dump. No exploit. No payload.</p>",
    ["7 Mar 2017 · Vault 7 leftover literacy", "No dump. No exploit. No payload."],
    None, None, None,
    "Open the dump (trap)", "No dump. That click never writes.",
    "Ack literacy leftover")
add("2017", "telegram17", "tg17-dp", "query", "wa",
    "Telegram leftover · 2017",
    "Telegram leftover",
    "<p>2017 Telegram leftover. Neighbor to WhatsApp. Not Signal. Not the chip.</p>",
    ["2017 Telegram leftover", "Not Signal. Not Face ID gold."],
    "telegram leftover 2017", None, None,
    "This is Face ID (trap)", "Face ID is the chip. That click never writes.",
    "Join leftover")
add("2017", "signal17", "sig17-dp", "query", "wa",
    "Signal leftover · 2017",
    "Signal leftover",
    "<p>2017 Signal leftover. Not the 2021 dest. WhatsApp did not mass-delete this year.</p>",
    ["2017 Signal leftover · not 2021 dest", "Not Face ID gold. No mass-delete lie."],
    "signal leftover 2017", None, None,
    "WhatsApp deleted you (trap)", "That lie never writes.",
    "Join leftover")
add("2017", "discord17", "dc17-dp", "query", "win",
    "Discord leftover · 2017",
    "Discord leftover",
    "<p>2017 Discord leftover server. No live voice. Nitro leftover is not this year’s gold.</p>",
    ["2017 Discord leftover server", "No live voice. Not the chip."],
    "discord leftover 2017", None, None,
    "Open live voice (trap)", "No live voice. That click never writes.",
    "Join leftover server")
add("2017", "zoom17", "zoom17-dp", "query", "win",
    "Zoom leftover · 2017",
    "Zoom leftover",
    "<p>2017 Zoom leftover meeting note. <b>Zoom-as-mass is 2020</b> — wiped here. This leftover never writes a 2020 key.</p>",
    ["2017 Zoom leftover · not 2020 mass", "No live meeting. Not the chip."],
    "zoom leftover 2017", None, None,
    "This is 2020 mass (trap)", "2020 is wiped. That click never writes.",
    "Save Zoom leftover")
add("2017", "slack17", "slack17-dp", "query", "win",
    "Slack leftover · 2017",
    "Slack leftover",
    "<p>2017 Slack leftover channel. Teams dest already exists. Not the chip.</p>",
    ["2017 Slack leftover channel", "Not Teams gold. Not the chip."],
    "slack leftover 2017", None, None,
    "This is Teams gold (trap)", "Teams dest already exists. That click never writes.",
    "Save Slack leftover")
add("2017", "android8", "oreo-dp", "checks", "win",
    "Android 8 Oreo leftover",
    "Android Oreo leftover",
    "<p><b>21 Aug 2017</b>. Android 8 Oreo leftover. Pixel 2 dest is next door. Not Face ID.</p>",
    ["21 Aug 2017 · Android 8 Oreo leftover", "Not Face ID. Not Pixel 2 dest gold."],
    None, None, None,
    "Unlock with Face ID (trap)", "Face ID is the iPhone X chip. That click never writes.",
    "Ack Oreo leftover")
add("2017", "pixelbook", "pbook-dp", "query", "win",
    "Pixelbook leftover · $999",
    "Pixelbook leftover",
    "<p><b>4 Oct 2017</b>. Pixelbook leftover. About <b>$999</b>. No live cart. Not the chip.</p>",
    ["4 Oct 2017 · Pixelbook leftover · about $999", "No live cart. Not Face ID gold."],
    "pixelbook leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save Pixelbook leftover")
add("2017", "applepark", "park-dp", "checks", "ios",
    "Apple Park leftover",
    "Apple Park leftover",
    "<p>2017. Apple Park leftover campus. Steve Jobs Theater leftover on <b>12 Sep</b> (same day as iPhone X). Not the chip.</p>",
    ["2017 Apple Park leftover campus", "12 Sep theater leftover · not Face ID gold"],
    None, None, None,
    "This is Face ID gold (trap)", "Face ID is the chip on the X dest. That click never writes.",
    "Ack Park leftover")
add("2017", "creditfrz", "cfrz-dp", "checks", "warn",
    "Credit freeze leftover",
    "Credit freeze leftover",
    "<p>2017 leftover freeze literacy after Equifax. Equifax dest already exists. No SSN field. No live bureau.</p>",
    ["2017 leftover freeze literacy · Equifax dest already exists", "No SSN field. No live bureau."],
    None, None, None,
    "Type a Social (trap)", "No SSN field. That click never writes.",
    "Ack freeze leftover")
add("2017", "fnstw", "stw-dp", "query", "win",
    "Fortnite Save the World leftover",
    "Save the World leftover",
    "<p><b>25 Jul 2017</b>. Fortnite Save the World leftover (paid). Battle Royale dest is <b>26 Sep</b> and already exists. Not Switch (2018).</p>",
    ["25 Jul 2017 · Save the World leftover · paid", "Not BR dest gold. Not Switch."],
    "stw leftover", None, None,
    "Open Fortnite on Switch (trap)", "Switch Fortnite is 2018. That click never writes.",
    "Save STW leftover")
add("2017", "homepodann", "hpodann-dp", "query", "ios",
    "HomePod leftover announce",
    "HomePod announce leftover",
    "<p><b>5 Jun 2017</b> WWDC leftover announce. HomePod <b>ships 9 Feb 2018</b>. This leftover never writes the 2018 dest.</p>",
    ["5 Jun 2017 · HomePod leftover announce", "Ships 2018. Not this year’s gold."],
    "homepod announce leftover", None, None,
    "Buy HomePod today (trap)", "HomePod ships 2018. That click never writes.",
    "Save announce leftover")
add("2017", "airpods17", "ap17-dp", "query", "ios",
    "AirPods leftover · 2017",
    "AirPods leftover",
    "<p>2017 AirPods leftover mass (shipped late 2016). AirPods Pro is <b>2019</b>. No live pair.</p>",
    ["2017 AirPods leftover mass", "Not AirPods Pro. No live pair."],
    "airpods leftover 2017", None, None,
    "This is AirPods Pro (trap)", "AirPods Pro is 2019. That click never writes.",
    "Save AirPods leftover")
add("2017", "coreml", "coreml-dp", "checks", "ios",
    "WWDC leftover · Core ML",
    "Core ML leftover",
    "<p><b>5 Jun 2017</b>. WWDC leftover Core ML. On-device leftover. Not Face ID gold. Not a live model.</p>",
    ["5 Jun 2017 · Core ML leftover", "Not Face ID gold. No live model."],
    None, None, None,
    "Run a live model (trap)", "No live model. That click never writes.",
    "Ack Core ML leftover")

# ---------- 2018 (22) GDPR is gold · Reels / Meta / Disney+ / COVID are not ----------
add("2018", "iphonexs", "xs-dp", "query", "ios",
    "iPhone XS leftover",
    "iPhone XS leftover",
    "<p><b>21 Sep 2018</b>. iPhone XS leftover. Face ID is last year’s password. Not the GDPR chip.</p>",
    ["21 Sep 2018 · iPhone XS leftover", "Face ID is 2017. Not the GDPR chip."],
    "iphone xs leftover", None, None,
    "This is Face ID gold (trap)", "Face ID is last year’s password. That click never writes.",
    "Save XS leftover")
add("2018", "iphonexr", "xr-dp", "query", "ios",
    "iPhone XR leftover",
    "iPhone XR leftover",
    "<p><b>26 Oct 2018</b>. iPhone XR leftover. Liquid Retina leftover. Not Face ID as new. Not the chip.</p>",
    ["26 Oct 2018 · iPhone XR leftover", "Not Face ID as new. Not GDPR gold."],
    "iphone xr leftover", None, None,
    "Accept All (trap)", "Accept All never writes. Manage is the 2018 save.",
    "Save XR leftover")
add("2018", "memoji", "memoji-dp", "hops", "ios",
    "Memoji leftover · iOS 12",
    "Memoji leftover",
    "<p><b>17 Sep 2018</b>. iOS 12 Memoji leftover. Animoji dest is 2017. Not Reels.</p>",
    ["17 Sep 2018 · Memoji leftover · iOS 12", "Not Animoji gold. Not Reels."],
    None, [("make", "Make leftover Memoji"), ("send", "Send leftover")], None,
    "Open Reels (trap)", "Reels is 2020. That click never writes.",
    "Save Memoji leftover")
add("2018", "groupft", "gft-dp", "checks", "ios",
    "Group FaceTime leftover",
    "Group FaceTime leftover",
    "<p><b>30 Oct 2018</b> (iOS 12.1). Group FaceTime leftover. Delayed from 12.0. No live call.</p>",
    ["30 Oct 2018 · Group FaceTime leftover · iOS 12.1", "No live call. Not the chip."],
    None, None, None,
    "Start a live call (trap)", "No live call. That click never writes.",
    "Ack FaceTime leftover")
add("2018", "ios12", "ios12-dp", "checks", "ios",
    "Settings · iOS 12 leftover",
    "iOS 12 leftover",
    "<p><b>17 Sep 2018</b>. iOS 12 leftover. Screen Time dest already exists. Not Face ID as new.</p>",
    ["17 Sep 2018 · iOS 12 leftover", "Screen Time dest already exists. Not Face ID as new."],
    None, None, None,
    "Unlock with Face ID gold (trap)", "Face ID is last year’s password. That click never writes.",
    "Ack iOS 12 leftover")
add("2018", "mojave", "mojave-dp", "checks", "win",
    "macOS Mojave leftover",
    "Mojave leftover",
    "<p><b>24 Sep 2018</b>. Mojave leftover Dark Mode. Desktop leftover. Not the GDPR chip.</p>",
    ["24 Sep 2018 · Mojave leftover Dark Mode", "Not GDPR gold. Not Catalina (2019)."],
    None, None, None,
    "Open Catalina (trap)", "Catalina is 2019. That click never writes.",
    "Ack Mojave leftover")
add("2018", "epicstore", "egs-dp", "query", "win",
    "Epic Games Store leftover",
    "Epic Games Store leftover",
    "<p><b>6 Dec 2018</b>. Epic Games Store leftover. Fortnite dests already exist. No live cart.</p>",
    ["6 Dec 2018 · Epic Games Store leftover", "No live cart. Not Fortnite gold."],
    "epic store leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save store leftover")
add("2018", "tumblrban", "tumblr18-dp", "checks", "warn",
    "Tumblr leftover · Dec 2018",
    "Tumblr leftover ban",
    "<p><b>17 Dec 2018</b>. Tumblr leftover adult-content ban. Dashboard leftover. Not the chip.</p>",
    ["17 Dec 2018 · Tumblr leftover ban", "Not the GDPR chip. Not 2022 Tumblr dest."],
    None, None, None,
    "This is the year chip (trap)", "Tumblr is leftover. That click never writes the chip.",
    "Ack ban leftover")
add("2018", "portal18", "portal-dp", "query", "win",
    "Facebook Portal leftover",
    "Portal leftover",
    "<p><b>8 Oct 2018</b>. Facebook Portal leftover. Consumer app is still Facebook. Meta is 2021.</p>",
    ["8 Oct 2018 · Facebook Portal leftover", "Not Meta. No live camera."],
    "portal leftover", None, None,
    "Open Meta (trap)", "Meta is 28 Oct 2021. That click never writes.",
    "Save Portal leftover")
add("2018", "oculusgo", "ogo-dp", "query", "win",
    "Oculus Go leftover · $199",
    "Oculus Go leftover",
    "<p><b>1 May 2018</b>. Oculus Go leftover. About <b>$199</b>. No live headset. Not the chip.</p>",
    ["1 May 2018 · Oculus Go leftover · about $199", "No live headset. Not Meta."],
    "oculus go leftover", None, None,
    "This is Meta Quest (trap)", "Meta is 2021. That click never writes.",
    "Save Go leftover")
add("2018", "duplex", "duplex-dp", "query", "win",
    "Google Duplex leftover",
    "Duplex leftover",
    "<p><b>8 May 2018</b> I/O leftover. Duplex leftover demo. No live call. Not a live assistant.</p>",
    ["8 May 2018 · Duplex leftover I/O", "No live call. Not the chip."],
    "duplex leftover", None, None,
    "Place a live call (trap)", "No live call. That click never writes.",
    "Save Duplex leftover")
add("2018", "androidpie", "pie-dp", "checks", "win",
    "Android 9 Pie leftover",
    "Android Pie leftover",
    "<p><b>6 Aug 2018</b>. Android 9 Pie leftover. Pixel 3 dest is next door. Not GDPR gold.</p>",
    ["6 Aug 2018 · Android 9 Pie leftover", "Not GDPR gold. Not Oreo dest."],
    None, None, None,
    "Accept All (trap)", "Accept All never writes. Manage is the 2018 save.",
    "Ack Pie leftover")
add("2018", "pixel3", "pixel3-dp", "query", "win",
    "Pixel 3 leftover",
    "Pixel 3 leftover",
    "<p><b>9 Oct 2018</b>. Pixel 3 leftover. Night Sight leftover. No live camera. Not the chip.</p>",
    ["9 Oct 2018 · Pixel 3 leftover", "No live camera. Not GDPR gold."],
    "pixel 3 leftover", None, None,
    "Open live camera (trap)", "No live camera. That click never writes.",
    "Save Pixel leftover")
add("2018", "cf1111", "dns-dp", "query", "win",
    "1.1.1.1 leftover DNS",
    "1.1.1.1 leftover",
    "<p><b>1 Apr 2018</b>. Cloudflare leftover 1.1.1.1 public DNS. No live tunnel. Not a VPN gold.</p>",
    ["1 Apr 2018 · 1.1.1.1 leftover DNS", "No live tunnel. Not the chip."],
    "1.1.1.1 leftover", None, None,
    "Open a live tunnel (trap)", "No live tunnel. That click never writes.",
    "Save DNS leftover")
add("2018", "btc18", "btc18-dp", "checks", "coin",
    "Bitcoin leftover · 2018",
    "Bitcoin leftover 2018",
    "<p>2018 leftover after the 2017 ATH dest. No live order. Not a second ATH gold.</p>",
    ["2018 Bitcoin leftover · after 2017 ATH dest", "No live order. Not the chip."],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack leftover crash")
add("2018", "zoom18", "zoom18-dp", "query", "win",
    "Zoom leftover · 2018",
    "Zoom leftover",
    "<p>2018 Zoom leftover. <b>Zoom-as-mass is 2020</b> — wiped. This leftover never writes a 2020 key.</p>",
    ["2018 Zoom leftover · not 2020 mass", "No live meeting. Not GDPR gold."],
    "zoom leftover 2018", None, None,
    "This is 2020 mass (trap)", "2020 is wiped. That click never writes.",
    "Save Zoom leftover")
add("2018", "slack18", "slack18-dp", "query", "win",
    "Slack leftover · 2018",
    "Slack leftover",
    "<p>2018 Slack leftover channel. IPO is <b>2019</b>. Not Teams. Not the chip.</p>",
    ["2018 Slack leftover", "IPO is 2019. Not GDPR gold."],
    "slack leftover 2018", None, None,
    "This is the Slack IPO (trap)", "Slack IPO is 2019. That click never writes.",
    "Save Slack leftover")
add("2018", "watch4", "watch4-dp", "query", "ios",
    "Apple Watch Series 4 leftover",
    "Watch Series 4 leftover",
    "<p><b>21 Sep 2018</b>. Series 4 leftover. Larger leftover face. No live pair. ECG leftover later.</p>",
    ["21 Sep 2018 · Series 4 leftover", "No live pair. Not Face ID as new."],
    "watch leftover 2018", None, None,
    "Pair live (trap)", "No live pair. That click never writes.",
    "Save Watch leftover")
add("2018", "labo", "labo-dp", "query", "win",
    "Nintendo Labo leftover",
    "Labo leftover",
    "<p><b>20 Apr 2018</b>. Nintendo Labo leftover. Switch dest already exists (2017). No live cart.</p>",
    ["20 Apr 2018 · Labo leftover", "No live cart. Not Switch gold."],
    "labo leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save Labo leftover")
add("2018", "smashbros", "smash-dp", "query", "win",
    "Smash Ultimate leftover",
    "Smash leftover",
    "<p><b>7 Dec 2018</b>. Super Smash Bros. Ultimate leftover. Switch leftover game. No live cart.</p>",
    ["7 Dec 2018 · Smash Ultimate leftover", "No live cart. Not Fortnite gold."],
    "smash leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save Smash leftover")
add("2018", "godofwar", "gow-dp", "query", "win",
    "God of War leftover",
    "God of War leftover",
    "<p><b>20 Apr 2018</b>. God of War leftover (PS4). No live cart. Not Fortnite gold.</p>",
    ["20 Apr 2018 · God of War leftover", "No live cart. Not the chip."],
    "god of war leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save leftover")
add("2018", "rdr2", "rdr2-dp", "query", "win",
    "Red Dead Redemption 2 leftover",
    "Red Dead 2 leftover",
    "<p><b>26 Oct 2018</b>. Red Dead Redemption 2 leftover. No live cart. Not the chip.</p>",
    ["26 Oct 2018 · Red Dead 2 leftover", "No live cart. Not GDPR gold."],
    "red dead leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save leftover")

# ---------- 2019 (28) Disney+ Continue is gold · trial / Reels / COVID / Travis / HBO Max are not ----------
add("2019", "wework", "wework-dp", "checks", "warn",
    "WeWork leftover · IPO withdrawn",
    "WeWork leftover",
    "<p><b>Sep 2019</b>. WeWork leftover IPO withdrawn. SoftBank leftover. No live order.</p>",
    ["Sep 2019 · WeWork leftover IPO withdrawn", "No live order. Not Disney+ gold."],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack WeWork leftover")
add("2019", "uberipo", "uber-dp", "checks", "coin",
    "Uber leftover IPO",
    "Uber IPO leftover",
    "<p><b>10 May 2019</b>. Uber leftover IPO. No live order. Not the chip.</p>",
    ["10 May 2019 · Uber leftover IPO", "No live order. Not Disney+ gold."],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack Uber leftover")
add("2019", "lyftipo", "lyft-dp", "checks", "coin",
    "Lyft leftover IPO",
    "Lyft IPO leftover",
    "<p><b>29 Mar 2019</b>. Lyft leftover IPO. No live order. Not Uber dest gold.</p>",
    ["29 Mar 2019 · Lyft leftover IPO", "No live order. Not the chip."],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack Lyft leftover")
add("2019", "slackipo", "slipo-dp", "checks", "win",
    "Slack leftover listing",
    "Slack listing leftover",
    "<p><b>20 Jun 2019</b>. Slack leftover direct listing. No live order. Not the chip.</p>",
    ["20 Jun 2019 · Slack leftover direct listing", "No live order. Not Disney+ gold."],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack Slack leftover")
add("2019", "applecard", "acard-dp", "query", "ios",
    "Apple Card leftover",
    "Apple Card leftover",
    "<p><b>20 Aug 2019</b>. Apple Card leftover. Titanium leftover. No live apply. Not the chip.</p>",
    ["20 Aug 2019 · Apple Card leftover", "No live apply. Not Disney+ gold."],
    "apple card leftover", None, None,
    "Apply live (trap)", "No live apply. That click never writes.",
    "Save Card leftover")
add("2019", "signinap", "siwa-dp", "checks", "ios",
    "Sign in with Apple leftover",
    "Sign in with Apple leftover",
    "<p><b>3 Jun 2019</b> WWDC leftover. Sign in with Apple leftover. Hide My Email is <b>2021</b>.</p>",
    ["3 Jun 2019 · Sign in with Apple leftover", "Not Hide My Email (2021). Not ATT."],
    None, None, None,
    "Ask App Not to Track (trap)", "ATT is 2021. That click never writes.",
    "Ack Sign in leftover")
add("2019", "catalina", "cata-dp", "checks", "ios",
    "macOS Catalina leftover",
    "Catalina leftover",
    "<p><b>7 Oct 2019</b>. Catalina leftover. iTunes leftover split dest is next door. 32-bit leftover gone.</p>",
    ["7 Oct 2019 · Catalina leftover", "iTunes split dest next door. Not Disney+ gold."],
    None, None, None,
    "Start free trial (trap)", "Trial never writes. Continue is the 2019 save.",
    "Ack Catalina leftover")
add("2019", "itunesend", "itunes-dp", "hops", "yt",
    "iTunes leftover split",
    "iTunes leftover end",
    "<p>Catalina leftover splits iTunes into Music / TV / Podcasts. iTunes Movie dest is 2018. Not the chip.</p>",
    ["2019 iTunes leftover split · Music / TV / Podcasts", "Not the 2018 movie dest gold."],
    None, [("music", "Music leftover"), ("tv", "TV leftover")], None,
    "This is Disney+ gold (trap)", "Continue is the chip on the Disney+ dest. That click never writes.",
    "Save split leftover")
add("2019", "findmy19", "findmy-dp", "query", "ios",
    "Find My leftover · iOS 13",
    "Find My leftover",
    "<p>2019 Find My leftover (Find My iPhone + Friends). AirTag is <b>2021</b>. No live Find My.</p>",
    ["2019 Find My leftover · iOS 13", "Not AirTag. No live Find My."],
    "find my leftover", None, None,
    "Open live Find My (trap)", "No live Find My. AirTag is 2021. That click never writes.",
    "Save Find My leftover")
add("2019", "watch5", "watch5-dp", "query", "ios",
    "Apple Watch Series 5 leftover",
    "Watch Series 5 leftover",
    "<p><b>20 Sep 2019</b>. Series 5 leftover. Always-On leftover. No live pair. Not AirPods Pro dest.</p>",
    ["20 Sep 2019 · Series 5 leftover · Always-On", "No live pair. Not the chip."],
    "watch leftover 2019", None, None,
    "Pair live (trap)", "No live pair. That click never writes.",
    "Save Watch leftover")
add("2019", "apex", "apex-dp", "query", "win",
    "Apex Legends leftover",
    "Apex leftover",
    "<p><b>4 Feb 2019</b>. Apex Legends leftover free-to-play. No live match. Not Fortnite gold. Not the chip.</p>",
    ["4 Feb 2019 · Apex leftover free-to-play", "No live match. Not Fortnite World Cup dest."],
    "apex leftover", None, None,
    "Queue live (trap)", "No live match. That click never writes.",
    "Save Apex leftover")
add("2019", "fnwc", "fnwc-dp", "checks", "win",
    "Fortnite World Cup leftover",
    "World Cup leftover",
    "<p><b>26–28 Jul 2019</b>. Fortnite World Cup leftover (Arthur Ashe). Marshmello dest already exists. No live ticket.</p>",
    ["26–28 Jul 2019 · Fortnite World Cup leftover", "No live ticket. Not Travis Scott (2020)."],
    None, None, None,
    "Open Travis Scott (trap)", "Travis Scott is 2020. That click never writes.",
    "Ack World Cup leftover")
add("2019", "fnch2", "fnch2-dp", "hops", "win",
    "Fortnite Chapter 2 leftover",
    "Chapter 2 leftover",
    "<p><b>15 Oct 2019</b>. Fortnite Chapter 2 leftover. New island leftover. Not Travis Scott (2020).</p>",
    ["15 Oct 2019 · Chapter 2 leftover", "Not Travis Scott. Not the chip."],
    None, [("island", "Island leftover"), ("water", "Water leftover")], None,
    "Open Travis Scott (trap)", "Travis Scott is 2020. That click never writes.",
    "Save Chapter leftover")
add("2019", "xcloud", "xcloud-dp", "wait", "win",
    "xCloud leftover preview",
    "xCloud leftover",
    "<p>2019 Project xCloud leftover preview (E3). Stadia dest already exists. No live stream. Wait leftover.</p>",
    ["2019 xCloud leftover preview", "Not Stadia dest gold. No live stream."],
    None, None, True,
    "This is Stadia gold (trap)", "Stadia dest already exists. That click never writes.",
    "Save xCloud leftover")
add("2019", "gamepass", "gpass-dp", "query", "win",
    "Game Pass Ultimate leftover",
    "Game Pass leftover",
    "<p><b>9 Jun 2019</b>. Xbox Game Pass Ultimate leftover. No live subscribe charge.</p>",
    ["9 Jun 2019 · Game Pass Ultimate leftover", "No live charge. Not Stadia gold."],
    "game pass leftover", None, None,
    "Subscribe live (trap)", "No live charge. That click never writes.",
    "Save Pass leftover")
add("2019", "pixel4", "pixel4-dp", "query", "win",
    "Pixel 4 leftover",
    "Pixel 4 leftover",
    "<p><b>15 Oct 2019</b>. Pixel 4 leftover. Motion Sense leftover. No live camera. Not the chip.</p>",
    ["15 Oct 2019 · Pixel 4 leftover · Motion Sense", "No live camera. Not Disney+ gold."],
    "pixel 4 leftover", None, None,
    "Open live camera (trap)", "No live camera. That click never writes.",
    "Save Pixel leftover")
add("2019", "fold19", "fold-dp", "query", "win",
    "Galaxy Fold leftover",
    "Galaxy Fold leftover",
    "<p>2019 Galaxy Fold leftover. April delay leftover. US leftover ~<b>6 Sep</b>. No live cart.</p>",
    ["2019 Galaxy Fold leftover · April delay · ~6 Sep US", "No live cart. Not the chip."],
    "galaxy fold leftover", None, None,
    "Checkout live (trap)", "No live cart. That click never writes.",
    "Save Fold leftover")
add("2019", "huawei19", "huawei-dp", "checks", "warn",
    "Huawei leftover · Entity List",
    "Huawei leftover",
    "<p><b>15 May 2019</b>. Huawei leftover Entity List. Android leftover. Not a partisan room. Literacy leftover.</p>",
    ["15 May 2019 · Huawei leftover Entity List", "Literacy leftover. Not the chip."],
    None, None, None,
    "This is the year chip (trap)", "This leftover never writes the chip.",
    "Ack Huawei leftover")
add("2019", "fiveg", "fiveg-dp", "query", "win",
    "5G leftover · 2019",
    "5G leftover",
    "<p>2019 US leftover 5G. Carrier leftover. Not a live radio. Not the chip.</p>",
    ["2019 5G leftover", "Not a live radio. Not Disney+ gold."],
    "5g leftover 2019", None, None,
    "Connect live 5G (trap)", "No live radio. That click never writes.",
    "Save 5G leftover")
add("2019", "art17", "art17-dp", "checks", "warn",
    "Article 17 leftover",
    "Article 17 leftover",
    "<p><b>15 Apr 2019</b>. EU leftover copyright directive (was Article 13). GDPR is last year’s banner. Not a CMP vendor UI.</p>",
    ["15 Apr 2019 · Article 17 leftover · was Article 13", "GDPR is 2018. Not a CMP vendor UI."],
    None, None, None,
    "Accept All (trap)", "Accept All never writes. GDPR is last year.",
    "Ack Article leftover")
add("2019", "ytcoppa", "ytcoppa-dp", "checks", "yt",
    "YouTube leftover · COPPA",
    "YouTube COPPA leftover",
    "<p><b>4 Sep 2019</b>. YouTube leftover FTC COPPA settlement. Comments leftover off kids. Not TikTok dest gold.</p>",
    ["4 Sep 2019 · YouTube leftover COPPA settlement", "Not TikTok dest gold. Not the chip."],
    None, None, None,
    "This is TikTok gold (trap)", "TikTok dest already exists. That click never writes.",
    "Ack COPPA leftover")
add("2019", "alloend", "allo-dp", "checks", "win",
    "Allo leftover end",
    "Allo leftover",
    "<p><b>Mar 2019</b>. Google Allo leftover shutdown. Messages leftover neighbor. Not the chip.</p>",
    ["Mar 2019 · Allo leftover shutdown", "Not the chip. Not Hangouts gold."],
    None, None, None,
    "This is the year chip (trap)", "Allo is leftover. That click never writes the chip.",
    "Ack Allo leftover")
add("2019", "gplus19", "gplus19-dp", "checks", "win",
    "Google+ leftover consumer end",
    "Google+ leftover end",
    "<p><b>2 Apr 2019</b>. Google+ leftover consumer shutdown. 2018 dest announced the wind-down. This is the day it is gone.</p>",
    ["2 Apr 2019 · Google+ leftover consumer shutdown", "2018 dest announced it. Not the chip."],
    None, None, None,
    "Open Google+ live (trap)", "Consumer Google+ is gone. That click never writes.",
    "Ack leftover end")
add("2019", "zoom19", "zoom19-dp", "query", "win",
    "Zoom leftover · 2019",
    "Zoom leftover",
    "<p>2019 Zoom leftover. <b>Zoom-as-mass is 2020</b> — wiped. COVID spine is not this year.</p>",
    ["2019 Zoom leftover · not 2020 mass", "No live meeting. Not Disney+ gold."],
    "zoom leftover 2019", None, None,
    "This is 2020 mass (trap)", "2020 is wiped. That click never writes.",
    "Save Zoom leftover")
add("2019", "mixer19", "mixer-dp", "query", "yt",
    "Mixer leftover · 2019",
    "Mixer leftover",
    "<p><b>1 Aug 2019</b>. Mixer leftover (Ninja). Twitch leftover neighbor. Mixer shutdown is 2020. No live stream.</p>",
    ["1 Aug 2019 · Mixer leftover", "No live stream. Shutdown is 2020."],
    "mixer leftover", None, None,
    "Open live stream (trap)", "No live stream. That click never writes.",
    "Save Mixer leftover")
add("2019", "newsplus", "news-dp", "query", "ios",
    "Apple News+ leftover",
    "News+ leftover",
    "<p><b>25 Mar 2019</b>. Apple News+ leftover. About <b>$9.99</b>. No live subscribe charge. Not TV+ dest.</p>",
    ["25 Mar 2019 · News+ leftover · about $9.99", "No live charge. Not TV+ dest gold."],
    "news+ leftover", None, None,
    "Subscribe live (trap)", "No live charge. That click never writes.",
    "Save News leftover")
add("2019", "sidecar", "sidecar-dp", "hops", "ios",
    "Sidecar leftover",
    "Sidecar leftover",
    "<p>2019 Sidecar leftover (Catalina / iPadOS). iPad as leftover display. No live Sidecar.</p>",
    ["2019 Sidecar leftover · Catalina / iPadOS", "No live Sidecar. Not iPadOS dest gold."],
    None, [("mac", "Mac leftover"), ("ipad", "iPad leftover")], None,
    "Start live Sidecar (trap)", "No live Sidecar. That click never writes.",
    "Save Sidecar leftover")
add("2019", "swiftui", "swiftui-dp", "checks", "ios",
    "SwiftUI leftover · WWDC",
    "SwiftUI leftover",
    "<p><b>3 Jun 2019</b>. WWDC leftover SwiftUI. Dev leftover. Not the chip. Not a live Xcode.</p>",
    ["3 Jun 2019 · SwiftUI leftover", "Not Disney+ gold. No live Xcode."],
    None, None, None,
    "Start free trial (trap)", "Trial never writes. Continue is the 2019 save.",
    "Ack SwiftUI leftover")


def fourx(year, suffix, kind, title, nxt, nl, field, hops, ticks):
    pref = PREFIX[year]
    verb = VERB4[kind]
    inner = ""
    if kind == "query" and field:
        inner = (
            f'<p><label>Leftover<br><input type="text" data-4x-field maxlength="80" '
            f'autocomplete="off" placeholder="{field}"></label></p>\n'
        )
    elif kind == "checks":
        labs = ticks or ["Leftover tick one", "Leftover tick two"]
        boxes = "".join(
            f'<label style="display:block"><input type="checkbox" data-4x-req> {lab}</label>\n'
            for lab in labs
        )
        inner = f"<p>{boxes}</p>\n"
    elif kind == "hops" and hops:
        btns = " ".join(
            f'<button type="button" data-4x-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        inner = f"<p>{btns}</p>\n"
    elif kind == "wait":
        inner = '<p><button type="button" data-4x-wait data-4x-wait-ms="2000">Wait leftover</button></p>\n'
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f"{inner}"
        f'<p><button type="button" data-4x-go="{suffix}">{verb}</button> '
        f"<span data-4x-status></span></p>\n"
        f'<p hidden data-4x-result class="itt-4x-result"></p>\n'
        f'<p hidden data-next-flow data-next-when-key="{pref}-{suffix}">'
        f"<b>Next:</b> <a href=\"{nxt}\">{nl}</a></p>\n"
        f"</section>\n"
        f"<!-- ITT-4X:{suffix}:end -->\n"
    )


def theater(row, nxt, nl):
    (year, slug, suffix, kind, tone, bar, h1, life, ticks, field, hops, wait,
     trap_lab, trap_msg, go_lab) = row
    ns = NS[year]
    tick_html = "".join(
        f'<label style="display:block"><input type="checkbox" data-{ns}-req> {t}</label>\n'
        for t in ticks
    )
    mid = ""
    if field:
        mid += (
            f'<p><label>Leftover<br><input type="text" data-{ns}-field maxlength="80" '
            f'autocomplete="off" placeholder="{field}"></label></p>\n'
        )
    if hops:
        btns = " ".join(
            f'<button type="button" data-{ns}-hop="{hid}">{lab}</button>' for hid, lab in hops
        )
        mid += f"<p>{btns}</p>\n"
    if wait:
        mid += f'<p><button type="button" data-{ns}-wait>Wait leftover</button></p>\n'
    if nxt.startswith("sites/"):
        nxt_href = "../../" + nxt
    else:
        nxt_href = nxt
    panel = fourx(year, suffix, kind, h1 + " deepen", nxt_href, nl, field, hops, ticks)
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{h1} — {year}</title>
<link rel="stylesheet" href="../../../../css/period-{year}.css">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-recon-gold" data-recon="{slug}"><b>RECON frame</b> leftover theater · no official mark</div>
<div class="dp-stage" data-dp-tone="{tone}" data-{ns}-theater>
<div class="dp-bar">{bar}</div>
<div class="dp-body">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{h1}</h1>
{life}
<p class="itt-pixel-failed">[failed-final] leftover chrome · no official mark</p>
{tick_html}{mid}<p>
 <button type="button" class="dp-trap" data-{ns}-trap data-{ns}-trap-msg="{trap_msg}">{trap_lab}</button>
 <button type="button" class="dp-go" data-{ns}-go data-{ns}-key="{suffix}">{go_lab}</button>
</p>
<p data-{ns}-status></p>
<p hidden data-next-flow data-next-when-key="{PREFIX[year]}-{suffix}"><b>Next:</b> <a href="{nxt_href}">{nl}</a></p>
</div>
</div>
{panel}<script src="../../../../js/immersion-{year}.js"></script>
</body>
</html>
"""


def next_of(i: int) -> tuple[str, str]:
    year = D[i][0]
    year_idx = [j for j, r in enumerate(D) if r[0] == year]
    pos = year_idx.index(i)
    if pos + 1 < len(year_idx):
        nxt = D[year_idx[pos + 1]]
        return f"../{nxt[1]}/index.html", nxt[6]
    return "../../" + STAR_HREF[year], STAR_LABEL[year]


def patch_home(year: str, rows: list[tuple]) -> None:
    home = ROOT / "years" / year / "pages" / "home.html"
    t = home.read_text(encoding="utf-8")
    links = []
    for slug, suffix, title in rows:
        links.append(
            f' <a href="../sites/{slug}/index.html" data-trail-keys="{PREFIX[year]}-{suffix}">{title}</a> ·'
        )
    star = f' <a href="../{STAR_HREF[year]}">{STAR_LABEL[year]}</a>'
    inner = (
        f'<p class="itt-2x-trails" id="ott-2x-{year}-dp" '
        f'style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px solid #1565c0;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f"<b>Year-true leftover dests (deepen)</b> (new doors · not the chip · incomplete never writes):"
        + "".join(links)
        + star
        + "</p>"
    )
    marker = f"<!-- ITT-2X-DP:{year}:start -->"
    end = f"<!-- ITT-2X-DP:{year}:end -->"
    block = f"{marker}\n{inner}\n{end}\n"
    if marker in t:
        t = re.sub(re.escape(marker) + r".*?" + re.escape(end), block.strip(), t, count=1, flags=re.S)
    elif "</body>" in t:
        t = t.replace("</body>", block + "</body>", 1)
    home.write_text(t, encoding="utf-8")


def main() -> None:
    added = []
    matrix_new = []
    by_year: dict[str, list] = {}
    extra_sm = []
    for i, row in enumerate(D):
        year, slug, suffix, kind, _tone, _bar, h1 = row[:7]
        nxt, nl = next_of(i)
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(theater(row, nxt, nl), encoding="utf-8")
        added.append(f"{year}/{slug}")
        by_year.setdefault(year, []).append((slug, suffix, h1))
        if nxt.startswith("../") and not nxt.startswith("../../"):
            nxt_path = f"/years/{year}/sites/{nxt.split('/')[1]}/index.html"
        else:
            nxt_path = f"/years/{year}/{STAR_HREF[year]}"
        matrix_new.append({
            "year": year,
            "path": f"/years/{year}/sites/{slug}/index.html",
            "key": f"{PREFIX[year]}-{suffix}",
            "kind": kind,
            "title": h1 + " deepen",
            "next": nxt_path,
            "nextLabel": nl,
        })
        extra_sm.append(f"/years/{year}/sites/{slug}/index.html")

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

    sm = ROOT / "sitemap.txt"
    t = sm.read_text(encoding="utf-8")
    have_sm = set(t.splitlines())
    add_sm = [u for u in extra_sm if u not in have_sm]
    if add_sm:
        sm.write_text(t.rstrip() + "\n" + "\n".join(add_sm) + "\n", encoding="utf-8")

    print(f"rooms {len(added)} matrix +{n} sitemap +{len(add_sm)}")
    for y in ("2017", "2018", "2019"):
        html = len(list((ROOT / "years" / y).rglob("*.html")))
        dests = len([p for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir()])
        mcount = sum(1 for r in mx if r["year"] == y)
        print(f"  {y} HTML {html} dests {dests} matrix {mcount}")


if __name__ == "__main__":
    main()
