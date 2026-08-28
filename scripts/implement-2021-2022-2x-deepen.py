#!/usr/bin/env python3
"""2021–2022 leftover deepen (+32 year-true dests each).

Research freeze:
  docs/2021-2022-2X-DEEPEN-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-2026-08-27.md

Does not: move stars, grow guided <ol>, dest-field plaques, restore 2020/2023.
Incomplete never writes (js/immersion/year-4x-flows.js).
Idempotent: ITT-4X:suffix markers + ITT-DP-ROOM rooms.
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

PREFIX = {"2021": "itt21", "2022": "itt22"}
STAR_HREF = {
    "2021": "sites/att/index.html",
    "2022": "sites/chatgpt/index.html",
}
STAR_LABEL = {
    "2021": "★ ATT Ask",
    "2022": "★ ChatGPT Send",
}

ROOMS: list[tuple] = []


def R(year, slug, suffix, kind, title, extra, copy_html):
    ROOMS.append((year, slug, suffix, kind, title, extra, copy_html))


# ----- 2021 (year-true products the lean door skipped) -----
R("2021", "shorts", "shorts-dp", "hops",
  "YouTube Shorts leftover deepen",
  [("watch", "Watch a Short leftover"), ("create", "Create leftover")],
  """<h1>YouTube Shorts leftover</h1>
<p>US beta <b>18 Mar 2021</b> (YouTube Blog, Todd Sherman). Global rollout <b>13 Jul 2021</b> to more than 100 countries. India beta was 2020 — leftover line only. Vertical leftover, not the homepage watch.</p>
<p class="honest">Leftover hops. No live upload. Not TikTok. Not the ATT chip.</p>""")

R("2021", "airtag", "airtag-dp", "query",
  "AirTag leftover deepen",
  "AirTag $29 leftover",
  """<h1>AirTag leftover</h1>
<p><b>20 Apr 2021</b> Apple Newsroom. <b>$29</b> / <b>$99</b> four-pack. Sale <b>30 Apr</b>. Requires <b>iOS 14.5</b> (the ATT week). Precision Finding is U1. Pair leftover — no live Find My.</p>
<p class="honest">Leftover name. Empty never writes. Not the Ask chip.</p>""")

R("2021", "coinbase", "coin-dp", "checks",
  "Coinbase listing leftover deepen",
  ["14 Apr 2021 · Nasdaq direct listing · ticker COIN · not a traditional IPO",
   "Open $381 · close $328.28 · about $85.8B · no live trade here"],
  """<h1>Coinbase leftover listing</h1>
<p><b>14 Apr 2021</b>. Direct listing on Nasdaq as <b>COIN</b>. Opened at $381, closed $328.28, about <b>$85.8 billion</b>. Not Robinhood. Not a live order ticket.</p>
<p class="honest">Listing leftover. Incomplete never writes. No broker mark.</p>""")

R("2021", "beeple", "beeple-dp", "checks",
  "Beeple leftover deepen",
  ["11 Mar 2021 · Christie's Everydays: The First 5000 Days · $69.3M",
   "First purely digital NFT at Christie's · ETH accepted · no live mint"],
  """<h1>Beeple leftover</h1>
<p><b>11 Mar 2021</b>. Christie's sells Beeple's <i>Everydays: The First 5000 Days</i> for <b>$69.3 million</b> (hammer $60.25M + premium). First purely digital NFT at the house. Payment in ether accepted.</p>
<p class="honest">Literacy leftover. No live mint. Not the OpenSea dest. Not the chip.</p>""")

R("2021", "bayc", "bayc-dp", "query",
  "Bored Ape leftover deepen",
  "0.08 ETH leftover",
  """<h1>Bored Ape leftover</h1>
<p>Pre-sale <b>23 Apr 2021</b>. Public reveal <b>30 Apr</b>. Sold out <b>1 May</b>. Mint <b>0.08 ETH</b>. 10,000 apes. Membership leftover, not a live mint.</p>
<p class="honest">Empty never writes. No official Yuga pixel. Not the NFT literacy plaque.</p>""")

R("2021", "log4j", "log4j-dp", "checks",
  "Log4Shell leftover deepen",
  ["CVE-2021-44228 public 9 Dec 2021 · Apache Log4j 2 · patch leftover",
   "Verb is patch · 2.15 then 2.16 / 2.17 · no exploit on this dest"],
  """<h1>Log4Shell leftover</h1>
<p><b>9 Dec 2021</b>. CVE-2021-44228 in Apache Log4j 2 goes public. Apache ships 2.15.0 the next day; later 2.16 / 2.17. The museum verb is <b>patch</b>.</p>
<p class="honest">No exploit. No PoC. Incomplete never writes. Not the chip.</p>""")

R("2021", "whatsapp21", "wa21-dp", "checks",
  "WhatsApp policy leftover deepen",
  ["4 Jan 2021 notice · original accept-by 8 Feb · business data with Facebook",
   "Not “WhatsApp reads your chats” · Signal dest is the neighbor leftover"],
  """<h1>WhatsApp 2021 policy leftover</h1>
<p><b>4 Jan 2021</b> in-app notice. Original accept-by <b>8 Feb</b>. The update is about <b>business</b> data shared with Facebook — not “WhatsApp reads family chats.” Signal dest already exists.</p>
<p class="honest">Policy leftover. Not the Signal chip. Not ATT.</p>""")

R("2021", "telegram21", "tg21-dp", "query",
  "Telegram leftover deepen",
  "telegram leftover 2021",
  """<h1>Telegram leftover</h1>
<p>Same week as the WhatsApp notice. Apptopia counted about <b>5.6 million</b> Telegram downloads 6–10 Jan 2021. Neighbor leftover to Signal, not the chip.</p>
<p class="honest">Join leftover. Empty never writes. Not Signal. Not WhatsApp gold.</p>""")

R("2021", "ios15", "ios15-dp", "checks",
  "iOS 15 Focus leftover deepen",
  ["20 Sep 2021 · iOS 15 ships · Focus leftover · iPhone 6s and later",
   "Not ATT (that is iOS 14.5 Ask) · not iOS 16 Lock Screen"],
  """<h1>iOS 15 leftover</h1>
<p><b>20 Sep 2021</b>. Apple Newsroom: iOS 15 is available today. <b>Focus</b> is the mass leftover — work / sleep / personal filters. Free. iPhone 6s and later.</p>
<p class="honest">Not the ATT chip (iOS 14.5). Not iOS 16. No official Apple pixel.</p>""")

R("2021", "mailpriv", "mailpp-dp", "checks",
  "Mail Privacy leftover deepen",
  ["iOS 15 Mail Privacy Protection · hides open-pixel and sender IP",
   "Ships with 20 Sep 2021 · not ATT · not a second Focus dest"],
  """<h1>Mail Privacy leftover</h1>
<p>Ships with iOS 15. Mail Privacy Protection stops senders learning whether you opened the mail and hides your IP from their pixel.</p>
<p class="honest">Leftover ack. Not ATT Ask. Incomplete never writes.</p>""")

R("2021", "relay", "relay-dp", "wait",
  "Private Relay leftover deepen",
  None,
  """<h1>iCloud Private Relay leftover</h1>
<p>iCloud+ <b>Private Relay</b> launches as a <b>beta</b> with iOS 15. Two relays. Safari traffic. Not a VPN gold. Wait the leftover timer.</p>
<p class="honest">Beta leftover. No live tunnel. Not the chip.</p>""")

R("2021", "hidemail", "hidemail-dp", "query",
  "Hide My Email leftover deepen",
  "hide leftover address",
  """<h1>Hide My Email leftover</h1>
<p>iCloud+ / iOS 15. Random forwarders so a site does not get the real inbox. Type a leftover label. Empty never writes.</p>
<p class="honest">Leftover address theater. No live iCloud account.</p>""")

R("2021", "spaces21", "spaces-dp", "hops",
  "Twitter Spaces leftover deepen",
  [("host600", "Host 600+ leftover (3 May)"), ("anyone", "Anyone hosts leftover (21 Oct)")],
  """<h1>Twitter Spaces leftover</h1>
<p><b>3 May 2021</b>: host unlock for accounts with 600+ followers. <b>21 Oct 2021</b>: anyone on iOS/Android can host. Clubhouse rival leftover. Dest name stays Twitter.</p>
<p class="honest">Audio leftover. Clubhouse dest already exists. Not X (2023).</p>""")

R("2021", "superfol", "superfol-dp", "query",
  "Super Follows leftover deepen",
  "$2.99 leftover",
  """<h1>Super Follows leftover</h1>
<p>Apply <b>22 Jun 2021</b>. Broader <b>Sep 2021</b>. Price leftover <b>$2.99 / $4.99 / $9.99</b>. US iOS first. Not X Premium (2023).</p>
<p class="honest">Empty never writes. No live charge. Dest stays Twitter.</p>""")

R("2021", "fboutage", "fbout-dp", "checks",
  "Facebook outage leftover deepen",
  ["4 Oct 2021 · ~15:39–22:50 UTC · BGP withdrawal of Facebook DNS",
   "FB / Instagram / WhatsApp down about 6 hours · faulty backbone config"],
  """<h1>Facebook outage leftover</h1>
<p><b>4 Oct 2021</b>. Facebook, Instagram and WhatsApp drop off the internet for about six hours. Engineers later blame a faulty backbone configuration that withdrew BGP routes to Facebook DNS.</p>
<p class="honest">Literacy leftover. Not a second Facebook plaque. Not the chip.</p>""")

R("2021", "haugen", "haugen-dp", "checks",
  "Facebook Papers leftover deepen",
  ["3 Oct 2021 · Frances Haugen on 60 Minutes · Facebook Papers / WSJ Files",
   "Senate 5 Oct leftover · civic leftover · not a document dump"],
  """<h1>Facebook Papers leftover</h1>
<p><b>3 Oct 2021</b>. Frances Haugen identifies herself on <i>60 Minutes</i>. The Facebook Papers / WSJ Facebook Files are already in circulation. Senate the same week as the outage.</p>
<p class="honest">Civic leftover. No dump of the papers. Not the Meta rename dest.</p>""")

R("2021", "dalle1", "dalle1-dp", "query",
  "DALL·E 1 leftover deepen",
  "avocado armchair leftover",
  """<h1>DALL·E leftover (2021 research)</h1>
<p><b>5 Jan 2021</b>. OpenAI publishes DALL·E — a 12-billion-parameter GPT-3 descendant that makes images from captions. <b>Not public.</b> DALL·E 2 is April 2022. ChatGPT is 30 Nov 2022.</p>
<p class="honest">Research leftover. No live image. Not DALL·E 2. Not Send.</p>""")

R("2021", "codex", "codex-dp", "query",
  "OpenAI Codex leftover deepen",
  "codex leftover prompt",
  """<h1>OpenAI Codex leftover</h1>
<p><b>10 Aug 2021</b>. OpenAI opens Codex as an API private beta. Natural language → code. This is the model that already powers the Copilot waitlist dest. Not ChatGPT.</p>
<p class="honest">API leftover. Empty never writes. Copilot dest stays the waitlist.</p>""")

R("2021", "win365", "win365-dp", "checks",
  "Windows 365 leftover deepen",
  ["14 Jul 2021 · Windows 365 Cloud PC announce leftover",
   "Not Windows 11 GA (5 Oct) · Win10 is still the mass shell"],
  """<h1>Windows 365 leftover</h1>
<p><b>14 Jul 2021</b>. Microsoft announces Windows 365 — a Cloud PC leftover. Windows 11 GA is still <b>5 Oct</b> and stays a leftover dest. Win10 is January mass.</p>
<p class="honest">Cloud PC leftover. Not the Win11 dest. Not the chip.</p>""")

R("2021", "android12", "and12-dp", "checks",
  "Android 12 leftover deepen",
  ["4 Oct 2021 · Android 12 ships · Material You leftover",
   "Same week as Win11 GA · not a Pixel buy · no official Material pixel"],
  """<h1>Android 12 leftover</h1>
<p><b>4 Oct 2021</b>. Android 12 ships. Material You leftover. Same week as Windows 11 GA. Not a Pixel dest.</p>
<p class="honest">Leftover ack. No official Material mark. Not ATT.</p>""")

R("2021", "pixel6", "pixel6-dp", "query",
  "Pixel 6 leftover deepen",
  "Tensor leftover",
  """<h1>Pixel 6 leftover</h1>
<p><b>19 Oct 2021</b>. Pixel 6 / Pixel 6 Pro. First Google Tensor leftover. Not iPhone 13. Not Android 12 the OS dest.</p>
<p class="honest">Product leftover. Empty never writes. No official Google pixel.</p>""")

R("2021", "tiktok21", "tt21-dp", "hops",
  "TikTok 2021 leftover deepen",
  [("fyp", "For You leftover"), ("create", "Create leftover")],
  """<h1>TikTok leftover (2021)</h1>
<p>2021 mass leftover — Nikkei Treendy put “TikTok売れ” at #1 in Japan. The 2022 year already has a TikTok dest; this room is year-stamped 2021. Not Shorts. Not the chip.</p>
<p class="honest">Leftover hops. No official TikTok pixel. Not YouTube Shorts.</p>""")

R("2021", "snapspot", "spotlight-dp", "hops",
  "Snap Spotlight leftover deepen",
  [("spot", "Spotlight leftover"), ("snap", "Snap leftover")],
  """<h1>Snap Spotlight leftover</h1>
<p>2021. Snap Spotlight leftover — the TikTok/Shorts rival on Snapchat. Not TikTok. Not Shorts.</p>
<p class="honest">Leftover hops. No official Snap pixel. Not the chip.</p>""")

R("2021", "dstage", "dstage-dp", "hops",
  "Discord Stage leftover deepen",
  [("stage", "Stage leftover"), ("listen", "Listen leftover")],
  """<h1>Discord Stage leftover</h1>
<p>~Mar 2021. Discord Stage Channels leftover — Clubhouse-on-Discord. The Discord dest already exists; this is the Stage verb.</p>
<p class="honest">Leftover hops. Not Clubhouse. Not Twitter Spaces.</p>""")

R("2021", "substack21", "substack-dp", "query",
  "Substack leftover deepen",
  "substack leftover note",
  """<h1>Substack leftover</h1>
<p>2021 newsletter leftover. Creator-pay neighbor to Super Follows. Type a leftover title. Empty never writes.</p>
<p class="honest">Publish leftover. No live list. Not the chip.</p>""")

R("2021", "notion21", "notion21-dp", "query",
  "Notion 2021 leftover deepen",
  "notion leftover page",
  """<h1>Notion leftover (2021)</h1>
<p>2021 workspace leftover. Notion AI waitlist is later. 2022 already has a <code>notion22</code> dest — this room stays year-stamped 2021.</p>
<p class="honest">Empty never writes. Not Notion AI. Not the chip.</p>""")

R("2021", "figjam", "figjam-dp", "hops",
  "FigJam leftover deepen",
  [("board", "Board leftover"), ("sticky", "Sticky leftover")],
  """<h1>FigJam leftover</h1>
<p>2021. Figma FigJam leftover whiteboard. Adobe agrees to buy Figma in <b>2022</b> — that dest is next year’s deepen pack.</p>
<p class="honest">Leftover hops. No official Figma pixel. Not the chip.</p>""")

R("2021", "rbxipo", "rbxipo-dp", "checks",
  "Roblox listing leftover deepen",
  ["10 Mar 2021 · Roblox direct listing leftover",
   "Neighbor to Coinbase listing style · no live trade"],
  """<h1>Roblox leftover listing</h1>
<p><b>10 Mar 2021</b>. Roblox direct listing leftover. Same listing style as Coinbase a month later. No live trade.</p>
<p class="honest">Listing leftover. Incomplete never writes.</p>""")

R("2021", "affirm", "affirm-dp", "checks",
  "Affirm leftover deepen",
  ["13 Jan 2021 · Affirm IPO leftover · buy-now-pay-later",
   "No live loan · not a cart gold"],
  """<h1>Affirm leftover</h1>
<p><b>13 Jan 2021</b>. Affirm IPO leftover. Buy-now-pay-later residual. No live loan on this dest.</p>
<p class="honest">BNPL leftover. Incomplete never writes. Not the chip.</p>""")

R("2021", "paramount", "paramount-dp", "query",
  "Paramount+ leftover deepen",
  "paramount leftover",
  """<h1>Paramount+ leftover</h1>
<p><b>4 Mar 2021</b>. Paramount+ leftover stream. Not Netflix. Not Disney+ Day (November leftover).</p>
<p class="honest">Empty never writes. No live subscribe charge. Not the chip.</p>""")

R("2021", "dplus21", "dplus21-dp", "hops",
  "Disney+ Day leftover deepen",
  [("day", "Disney+ Day leftover"), ("watch", "Watch leftover")],
  """<h1>Disney+ Day leftover</h1>
<p><b>12 Nov 2021</b>. Disney+ Day leftover event. Disney+ Continue is the <b>2019</b> star — this room is the 2021 event only.</p>
<p class="honest">Event leftover. Not 2019 Continue. Not the ATT chip.</p>""")

R("2021", "topshot", "topshot-dp", "query",
  "NBA Top Shot leftover deepen",
  "moment leftover",
  """<h1>NBA Top Shot leftover</h1>
<p>Peak about <b>22 Feb 2021</b> (~$45.8M in a day). Dapper / Flow leftover. Cool-down from April. No live pack.</p>
<p class="honest">Empty never writes. Not OpenSea. Not the chip.</p>""")


# ----- 2022 (year-true products the lean door skipped) -----
R("2022", "whisper", "whisper-dp", "query",
  "Whisper leftover deepen",
  "whisper leftover transcript",
  """<h1>Whisper leftover</h1>
<p><b>21 Sep 2022</b>. OpenAI open-sources Whisper, an automatic speech recognizer trained on 680,000 hours. Not ChatGPT. Not a live model here.</p>
<p class="honest">ASR leftover. Empty never writes. Plus / GPT-4 never write.</p>""")

R("2022", "merge", "merge-dp", "checks",
  "Ethereum Merge leftover deepen",
  ["15 Sep 2022 · Merge · proof-of-work to proof-of-stake · block 15537393",
   "Energy claim about 99.95% · no live stake on this dest"],
  """<h1>Ethereum Merge leftover</h1>
<p><b>15 Sep 2022</b>. The Merge. Ethereum execution layer joins the Beacon Chain. Proof-of-work ends. About <b>99.95%</b> energy claim. Block <b>15537393</b>.</p>
<p class="honest">Ack leftover. No live stake. Not FTX. Not the Send chip.</p>""")

R("2022", "ftx", "ftx-dp", "checks",
  "FTX leftover deepen",
  ["11 Nov 2022 · FTX collapse leftover · literacy only",
   "No live book · no order ticket · not Binance gold"],
  """<h1>FTX leftover</h1>
<p><b>11 Nov 2022</b>. FTX collapse leftover. Literacy only. No live order book on this dest.</p>
<p class="honest">Any “place a trade” control is a trap. Incomplete never writes.</p>""")

R("2022", "luna", "luna-dp", "checks",
  "Terra Luna leftover deepen",
  ["May 2022 · Terra / UST / Luna depeg leftover",
   "Crypto-winter lead-in · no live trade"],
  """<h1>Terra / Luna leftover</h1>
<p><b>May 2022</b>. UST depegs. Luna leftover. Crypto-winter lead-in before FTX. No live trade.</p>
<p class="honest">Ack leftover. Incomplete never writes. Not the chip.</p>""")

R("2022", "copilotga", "copga-dp", "query",
  "Copilot GA leftover deepen",
  "$10 leftover",
  """<h1>GitHub Copilot GA leftover</h1>
<p><b>21 Jun 2022</b>. Copilot is generally available at <b>$10/month</b> or <b>$100/year</b>. Free for verified students and popular OSS maintainers. Technical preview was <b>29 Jun 2021</b>.</p>
<p class="honest">Type leftover. ChatGPT / GPT-4 buttons never write. Not the 2021 waitlist dest.</p>""")

R("2022", "figmaad", "figmaad-dp", "checks",
  "Adobe Figma leftover deepen",
  ["15 Sep 2022 · Adobe agrees to buy Figma about $20B",
   "Same day as the Merge · print the 2022 announce · not the later kill"],
  """<h1>Adobe ← Figma leftover</h1>
<p><b>15 Sep 2022</b>. Adobe agrees to acquire Figma for about <b>$20 billion</b>. Same calendar day as the Merge. Print the 2022 announce — not the later collapse of the deal.</p>
<p class="honest">Announce leftover. FigJam is the 2021 dest. Not the chip.</p>""")

R("2022", "steamdeck", "steamdeck-dp", "checks",
  "Steam Deck leftover deepen",
  ["25 Feb 2022 · Steam Deck leftover handheld",
   "Same day as Elden Ring · no live store checkout"],
  """<h1>Steam Deck leftover</h1>
<p><b>25 Feb 2022</b>. Steam Deck leftover handheld. Same day as Elden Ring — this dest is the Deck. No live Steam checkout.</p>
<p class="honest">Ack leftover. No official Valve pixel. Not the chip.</p>""")

R("2022", "ios16", "ios16-dp", "hops",
  "iOS 16 Lock Screen leftover deepen",
  [("lock", "Lock Screen leftover"), ("widget", "Widget leftover")],
  """<h1>iOS 16 leftover</h1>
<p><b>12 Sep 2022</b>. iOS 16. Lock Screen widgets and fonts leftover. Not ATT (2021). Not iOS 15 Focus.</p>
<p class="honest">Leftover hops. No official Apple pixel. Plus / GPT-4 never write here.</p>""")

R("2022", "passkeys", "passkeys-dp", "checks",
  "Passkeys leftover deepen",
  ["WWDC 6 Jun 2022 announce · passkeys ship with iOS 16 / Ventura",
   "FIDO / WebAuthn leftover · not a live sign-in"],
  """<h1>Passkeys leftover</h1>
<p>WWDC <b>6 Jun 2022</b>. Passkeys ship with iOS 16 and macOS Ventura. FIDO / WebAuthn leftover. Face ID / Touch ID theater — no live credential.</p>
<p class="honest">Ack leftover. Not ATT. Not a live WebAuthn.</p>""")

R("2022", "craiyon", "craiyon-dp", "query",
  "Craiyon leftover deepen",
  "craiyon leftover prompt",
  """<h1>Craiyon leftover</h1>
<p><b>Jun 2022</b>. DALL·E mini is renamed <b>Craiyon</b>. Not DALL·E 2 (already a dest). Not Midjourney. No live image.</p>
<p class="honest">Empty never writes. Not Send. Not GPT-4.</p>""")

R("2022", "heardle", "heardle-dp", "query",
  "Heardle leftover deepen",
  "heardle leftover",
  """<h1>Heardle leftover</h1>
<p>2022. Spotify Heardle leftover — Wordle-class daily song. Spotify later shuts it; this room prints the 2022 play. Not NYT Wordle tiles.</p>
<p class="honest">Empty never writes. Not the Wordle dest. Not the chip.</p>""")

R("2022", "quordle", "quordle-dp", "query",
  "Quordle leftover deepen",
  "quordle leftover",
  """<h1>Quordle leftover</h1>
<p>2022. Four Wordles at once leftover. Not the Wordle dest. Not NYT gold.</p>
<p class="honest">Empty never writes. Not Send.</p>""")

R("2022", "redditnft", "redditnft-dp", "hops",
  "Reddit NFT leftover deepen",
  [("avatar", "Avatar leftover"), ("vault", "Vault leftover")],
  """<h1>Reddit NFT leftover</h1>
<p><b>Jul 2022</b>. Reddit NFT avatars leftover. No live mint. Not OpenSea (2021 dest).</p>
<p class="honest">Leftover hops. No official Reddit pixel. Not the chip.</p>""")

R("2022", "twnft", "twnft-dp", "hops",
  "Twitter NFT hex leftover deepen",
  [("hex", "Hex leftover"), ("pfp", "PFP leftover")],
  """<h1>Twitter NFT hex leftover</h1>
<p>~<b>20 Jan 2022</b>. Twitter hex NFT profile-pic leftover. Dest name stays <b>Twitter</b>. X is <b>23 Jul 2023</b>.</p>
<p class="honest">Leftover hops. An X button never writes.</p>""")

R("2022", "ignft", "ignft-dp", "hops",
  "Instagram NFT leftover deepen",
  [("collect", "Digital collectible leftover"), ("share", "Share leftover")],
  """<h1>Instagram NFT leftover</h1>
<p>2022. Instagram digital-collectible leftover. Not the 2021 Meta rename dest. The consumer app is still Instagram / Facebook.</p>
<p class="honest">Leftover hops. No official IG pixel. Not Threads (2023).</p>""")

R("2022", "looksrare", "looksrare-dp", "query",
  "LooksRare leftover deepen",
  "looksrare leftover",
  """<h1>LooksRare leftover</h1>
<p><b>Jan 2022</b>. LooksRare leftover — OpenSea rival. No live mint. OpenSea is a 2021 dest.</p>
<p class="honest">Empty never writes. Not the chip.</p>""")

R("2022", "temu", "temu-dp", "query",
  "Temu leftover deepen",
  "temu leftover",
  """<h1>Temu leftover</h1>
<p>~<b>Sep 2022</b>. Temu US leftover shop. No live cart charge.</p>
<p class="honest">Empty never writes. Not the chip.</p>""")

R("2022", "next13", "next13-dp", "checks",
  "Next.js 13 leftover deepen",
  ["Oct / Nov 2022 · Next.js 13 leftover · app directory",
   "Dev leftover · not a second ChatGPT dest"],
  """<h1>Next.js 13 leftover</h1>
<p><b>Oct / Nov 2022</b>. Next.js 13 leftover (app directory). Dev leftover. Not ChatGPT.</p>
<p class="honest">Ack leftover. Incomplete never writes.</p>""")

R("2022", "bun22", "bun-dp", "query",
  "Bun leftover deepen",
  "bun leftover",
  """<h1>Bun leftover</h1>
<p>2022. Bun leftover runtime. Not Node gold. Type a leftover note.</p>
<p class="honest">Empty never writes. Not the chip.</p>""")

R("2022", "pplx", "pplx-dp", "query",
  "Perplexity leftover deepen",
  "perplexity leftover ask",
  """<h1>Perplexity leftover</h1>
<p><b>Dec 2022</b>. Perplexity leftover ask. <b>Bing Chat is 7 Feb 2023</b> — that click is a trap on the ChatGPT dest and never writes here either.</p>
<p class="honest">Empty never writes. Not Send. Not Bing Chat.</p>""")

R("2022", "d2api", "d2api-dp", "query",
  "DALL·E 2 API leftover deepen",
  "dalle 2 api leftover",
  """<h1>DALL·E 2 API leftover</h1>
<p>~<b>Nov 2022</b>. DALL·E 2 API / broader access leftover. The DALL·E 2 dest already exists — this room is the API verb. DALL·E 3 is 2023. No live image.</p>
<p class="honest">Empty never writes. Not Send. Not GPT-4.</p>""")

R("2022", "instruct", "instruct-dp", "checks",
  "InstructGPT leftover deepen",
  ["Jan 2022 · InstructGPT leftover · RLHF parent of ChatGPT",
   "Not Send · not GPT-4 · not Plus"],
  """<h1>InstructGPT leftover</h1>
<p><b>Jan 2022</b>. InstructGPT leftover (RLHF). Parent of the 30 Nov ChatGPT preview. The star is still <b>Send</b>.</p>
<p class="honest">Ack leftover. Plus / GPT-4 never write.</p>""")

R("2022", "copyai", "copyai-dp", "query",
  "Copy.ai leftover deepen",
  "copy.ai leftover",
  """<h1>Copy.ai leftover</h1>
<p>2022 GPT-3 writer leftover. Neighbor to the Jasper dest. Not ChatGPT Send.</p>
<p class="honest">Empty never writes. Not Plus. Not GPT-4.</p>""")

R("2022", "eleven", "eleven-dp", "query",
  "ElevenLabs leftover deepen",
  "eleven leftover",
  """<h1>ElevenLabs leftover</h1>
<p>2022 leftover voice. Type a leftover line. No live clone of a real person.</p>
<p class="honest">Empty never writes. Not a live voice. Not the chip.</p>""")

R("2022", "lastpass", "lastpass-dp", "checks",
  "LastPass leftover deepen",
  ["Dec 2022 · LastPass breach leftover · verb is rotate / ack",
   "No dump · no exploit · incomplete never writes"],
  """<h1>LastPass leftover</h1>
<p><b>Dec 2022</b>. LastPass breach leftover. The museum verb is <b>rotate / ack</b>.</p>
<p class="honest">No dump. No exploit. Incomplete never writes.</p>""")

R("2022", "arc22", "arc-dp", "hops",
  "Arc leftover deepen",
  [("space", "Space leftover"), ("tab", "Tab leftover")],
  """<h1>Arc leftover</h1>
<p>2022. Arc browser leftover (The Browser Company). Chrome habit stays the mass shell. No official Chrome pixels.</p>
<p class="honest">Leftover hops. Not the Chrome dest. Not the chip.</p>""")

R("2022", "truth", "truth-dp", "query",
  "Truth Social leftover deepen",
  "truth leftover",
  """<h1>Truth Social leftover</h1>
<p><b>21 Feb 2022</b>. Truth Social leftover launch. Not Twitter. Not X (23 Jul 2023).</p>
<p class="honest">Empty never writes. An X button never writes.</p>""")

R("2022", "hive22", "hive-dp", "query",
  "Hive leftover deepen",
  "hive leftover",
  """<h1>Hive leftover</h1>
<p>2022. Hive Social leftover Twitter-alt. Not the Mastodon dest. Not X.</p>
<p class="honest">Empty never writes. Not the chip.</p>""")

R("2022", "tumblr22", "tumblr22-dp", "hops",
  "Tumblr 2022 leftover deepen",
  [("dash", "Dashboard leftover"), ("reblog", "Reblog leftover")],
  """<h1>Tumblr leftover (2022)</h1>
<p>Tumblr comeback leftover during the Twitter close. Automattic residual. Dest name on Twitter dest stays Twitter.</p>
<p class="honest">Leftover hops. Not X. Not Mastodon.</p>""")

R("2022", "win22h2", "win22h2-dp", "checks",
  "Windows 11 22H2 leftover deepen",
  ["2022 · Windows 11 22H2 leftover",
   "Win10 is still the January mass shell · not Win11-as-default"],
  """<h1>Windows 11 22H2 leftover</h1>
<p>2022. Windows 11 22H2 leftover. Windows 10 is still the January mass shell. Failed-final word Chrome on the desktop.</p>
<p class="honest">Ack leftover. Not the chip. Not official Windows pixels.</p>""")

R("2022", "lockdown", "lockdown-dp", "checks",
  "Lockdown Mode leftover deepen",
  ["iOS 16 Lockdown Mode leftover · extreme-threat leftover",
   "Not ATT (2021 Ask) · not a live lockdown"],
  """<h1>Lockdown Mode leftover</h1>
<p>iOS 16. Lockdown Mode leftover for extreme threats. Not App Tracking Transparency. Not the Ask chip.</p>
<p class="honest">Ack leftover. Incomplete never writes.</p>""")

R("2022", "gen2", "gen2-dp", "query",
  "Runway Gen-2 leftover deepen",
  "gen-2 leftover prompt",
  """<h1>Runway Gen-2 leftover</h1>
<p>2022. Runway Gen-2 leftover (text / video). Gen-1 dest already exists. Sora is 2024. No live video.</p>
<p class="honest">Empty never writes. Not Send. Not a live model.</p>""")


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
    trap = ""
    if year == "2021" and suffix == "log4j-dp":
        trap = (
            '<p><button type="button" data-4x-trap="exploit">Run the exploit (trap)</button> '
            "<span class=\"honest\">That click never writes.</span></p>\n"
        )
    if year == "2022" and suffix in {"ftx-dp", "luna-dp"}:
        trap = (
            '<p><button type="button" data-4x-trap="trade">Place a live order (trap)</button> '
            "<span class=\"honest\">That click never writes.</span></p>\n"
        )
    if year == "2022" and suffix in {"whisper-dp", "copga-dp", "craiyon-dp", "pplx-dp", "d2api-dp", "instruct-dp", "copyai-dp", "gen2-dp"}:
        trap = (
            '<p><button type="button" data-4x-trap="plus">Plus / GPT-4 / Bing Chat (trap)</button> '
            "<span class=\"honest\">2023. That click never writes.</span></p>\n"
        )
    if year == "2022" and suffix in {"twnft-dp", "truth-dp", "hive-dp", "tumblr22-dp"}:
        trap = (
            '<p><button type="button" data-4x-trap="x">X (trap)</button> '
            "<span class=\"honest\">X is 23 Jul 2023. That click never writes.</span></p>\n"
        )
    return (
        f"<!-- ITT-4X:{suffix}:start -->\n"
        f'<section class="itt-4x-panel itt-4x-product" data-4x-panel data-4x-kind="{kind}" '
        f'data-4x-min="2" style="margin:12px 0;padding:12px;border:1px solid #333;'
        f'font-family:inherit;font-size:13px;max-width:46em;background:#fff">\n'
        f'<h2 style="margin:0 0 8px;font-size:16px">{title}</h2>\n'
        f'<p class="honest" style="margin:0 0 8px;font-size:12px">'
        f"{year} leftover · incomplete never writes · not the chip</p>\n"
        f"{panel_inner(kind, extra)}"
        f"{trap}"
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
    if next_rel == STAR_HREF[year]:
        nxt_href = "../../" + STAR_HREF[year]
    else:
        nxt_slug = next_rel.split("/")[1]
        nxt_file = "/".join(next_rel.split("/")[2:])
        nxt_href = f"../{nxt_slug}/{nxt_file}"

    panel = fourx(year, suffix, kind, title, nxt_href, nl, extra)
    css = f"period-{year}.css"
    html = f"""<!DOCTYPE html>
<html lang="en" data-itt-year="{year}">
<head>
<meta charset="utf-8">
<title>{title} — {year}</title>
<link rel="stylesheet" href="../../../../css/{css}">
<link rel="stylesheet" href="../../../../css/itt-recon-gold.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<!-- ITT-DP-ROOM:{slug} -->
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


def patch_sitemap(slugs_by_year: dict[str, list[str]]) -> None:
    sm = ROOT / "sitemap.txt"
    if not sm.is_file():
        return
    t = sm.read_text(encoding="utf-8")
    added = 0
    lines = t.splitlines()
    have = set(lines)
    extra = []
    for year, slugs in slugs_by_year.items():
        for slug in slugs:
            url = f"/years/{year}/sites/{slug}/index.html"
            # sitemap may be path-only or full — match either
            if not any(url in x or x.endswith(f"sites/{slug}/index.html") for x in have):
                extra.append(f"https://internetthroughtime.com/years/{year}/sites/{slug}/index.html")
                added += 1
    if extra:
        sm.write_text(t.rstrip() + "\n" + "\n".join(extra) + "\n", encoding="utf-8")
    print(f"sitemap +{added}")


def main() -> None:
    added = []
    skipped = []
    by_year: dict[str, list] = {}
    slugs_by_year: dict[str, list] = {}
    matrix_new = []
    for i, row in enumerate(ROOMS):
        year, slug, suffix, kind, title, extra, copy_html = row
        nxt, nl = next_of(i, year)
        st = write_room(year, slug, suffix, kind, title, extra, copy_html, nxt, nl)
        by_year.setdefault(year, []).append((slug, suffix, title))
        slugs_by_year.setdefault(year, []).append(slug)
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

    patch_sitemap(slugs_by_year)

    print(f"rooms +{len(added)} already {len(skipped)}")
    for a in added:
        print(" ", a)
    print(f"matrix +{n}")
    for y in ("2021", "2022"):
        html = len(list((ROOT / "years" / y).rglob("*.html")))
        dests = len([p for p in (ROOT / "years" / y / "sites").iterdir() if p.is_dir()])
        mcount = sum(1 for r in mx if r["year"] == y)
        print(f"  {y} HTML {html} dests {dests} matrix {mcount}")


if __name__ == "__main__":
    main()
