#!/usr/bin/env python3
"""Upgrade 2021/2022 -dp dests from plaques to product theaters.

Keeps ITT-4X leftover packs so e2e 2× still walks.
First click is the period verb. Incomplete never writes.
No official brand pixels. Stars unmoved.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# year, slug, suffix, kind, tone, bar, h1, life, ticks, field_ph|None, hops|None, wait|None,
# trap_label, trap_msg, go_label, next_rel, next_label
D: list[tuple] = []


def add(*row):
    D.append(row)


# ----- 2021 -----
add("2021", "shorts", "shorts-dp", "hops", "yt",
    "YouTube · Shorts leftover · 2021",
    "Watch a Short leftover",
    "<p>US beta <b>18 Mar 2021</b> (YouTube Blog, Todd Sherman). Global <b>13 Jul 2021</b> to more than 100 countries. India beta was <b>2020</b> — leftover line only. Vertical leftover, not the homepage watch dest.</p><p>Swipe the leftover hops. No live upload. Not TikTok. Not the ATT chip.</p>",
    ["18 Mar 2021 US beta · 13 Jul global leftover", "Not TikTok. Not the homepage YouTube leftover gold."],
    None, [("watch", "Watch a Short leftover"), ("create", "Create leftover")], None,
    "Open TikTok gold (trap)", "TikTok is not this dest. Shorts leftover never writes that.",
    "Save Short leftover", "../airtag/index.html", "AirTag leftover")

add("2021", "airtag", "airtag-dp", "query", "ios",
    "Find My · Items · leftover",
    "Pair leftover AirTag",
    "<p><b>20 Apr 2021</b> Apple Newsroom. <b>$29</b> / <b>$99</b> four-pack. Sale <b>30 Apr</b>. Requires <b>iOS 14.5</b> (the ATT week). Precision Finding is U1.</p><p>Name the leftover item. Empty never writes. No live Find My. Not the Ask chip.</p>",
    ["20 Apr 2021 · $29 / $99 · iOS 14.5 required", "Not the ATT chip. No live Find My."],
    "Keys leftover", None, None,
    "Open live Find My (trap)", "No live Find My on this dest. That click never writes.",
    "Name leftover item", "../coinbase/index.html", "Coinbase leftover")

add("2021", "coinbase", "coin-dp", "checks", "coin",
    "Nasdaq · COIN leftover listing",
    "Coinbase leftover listing",
    "<p><b>14 Apr 2021</b>. Direct listing on Nasdaq as <b>COIN</b>. Opened at $381, closed $328.28, about <b>$85.8 billion</b>. Not a traditional IPO. Not Robinhood.</p><p>Ack the listing leftover. No live order ticket.</p>",
    ["14 Apr 2021 · Nasdaq direct listing · ticker COIN · not a traditional IPO", "Open $381 · close $328.28 · about $85.8B · no live trade here"],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack listing leftover", "../beeple/index.html", "Beeple leftover")

add("2021", "beeple", "beeple-dp", "checks", "warn",
    "Christie's · lot leftover",
    "Everydays leftover",
    "<p><b>11 Mar 2021</b>. Christie's sells Beeple's <i>Everydays: The First 5000 Days</i> for <b>$69.3 million</b> (hammer $60.25M + premium). First purely digital NFT at the house. Ether accepted.</p><p>Literacy leftover. No live mint. Not the OpenSea dest. Not the chip.</p>",
    ["11 Mar 2021 · Christie's Everydays: The First 5000 Days · $69.3M", "First purely digital NFT at Christie's · ETH accepted · no live mint"],
    None, None, None,
    "Mint this lot (trap)", "No live mint. That click never writes.",
    "Ack leftover lot", "../bayc/index.html", "Bored Ape leftover")

add("2021", "bayc", "bayc-dp", "query", "coin",
    "Mint leftover · 0.08 ETH",
    "Bored Ape leftover mint",
    "<p>Pre-sale <b>23 Apr 2021</b>. Public reveal <b>30 Apr</b>. Sold out <b>1 May</b>. Mint <b>0.08 ETH</b>. 10,000. Membership leftover, not a live mint.</p>",
    ["23 Apr pre-sale · 30 Apr reveal · sold out 1 May", "Mint 0.08 ETH leftover · no live contract"],
    "0.08 ETH leftover", None, None,
    "Mint live (trap)", "No live mint. That click never writes.",
    "Note leftover mint", "../log4j/index.html", "Log4Shell leftover")

add("2021", "log4j", "log4j-dp", "checks", "warn",
    "Advisory · CVE-2021-44228 · patch leftover",
    "Log4Shell leftover",
    "<p><b>9 Dec 2021</b>. CVE-2021-44228 in Apache Log4j 2 goes public. Apache ships 2.15.0 the next day; later 2.16 / 2.17. The museum verb is <b>patch</b>.</p><p>No exploit. No PoC. Same law as Heartbleed / KRACK.</p>",
    ["CVE-2021-44228 public 9 Dec 2021 · Apache Log4j 2 · patch leftover", "Verb is patch · 2.15 then 2.16 / 2.17 · no exploit on this dest"],
    None, None, None,
    "Run the exploit (trap)", "No exploit. No PoC. That click never writes.",
    "Ack patch leftover", "../whatsapp21/index.html", "WhatsApp policy leftover")

add("2021", "whatsapp21", "wa21-dp", "checks", "wa",
    "WhatsApp · privacy leftover 2021",
    "WhatsApp 2021 policy leftover",
    "<p><b>4 Jan 2021</b> in-app notice. Original accept-by <b>8 Feb</b>. The update is about <b>business</b> data shared with Facebook — not “WhatsApp reads family chats.” Signal dest already exists.</p>",
    ["4 Jan 2021 notice · original accept-by 8 Feb · business data with Facebook", "Not “WhatsApp reads your chats” · Signal dest is the neighbor leftover"],
    None, None, None,
    "WhatsApp deleted you 8 Feb (trap)", "WhatsApp did not mass-delete on 8 Feb. That lie never writes.",
    "Ack policy leftover", "../telegram21/index.html", "Telegram leftover")

add("2021", "telegram21", "tg21-dp", "query", "wa",
    "Telegram · leftover join",
    "Telegram leftover",
    "<p>Same week as the WhatsApp notice. Apptopia counted about <b>5.6 million</b> Telegram downloads 6–10 Jan 2021. Neighbor leftover to Signal, not the chip.</p>",
    ["Jan 2021 download surge leftover", "Not Signal. Not WhatsApp gold."],
    "telegram leftover 2021", None, None,
    "This is the Signal chip (trap)", "Signal dest already exists. This leftover never writes the chip.",
    "Join leftover", "../ios15/index.html", "iOS 15 leftover")

add("2021", "ios15", "ios15-dp", "checks", "ios",
    "Settings · Focus leftover",
    "iOS 15 Focus leftover",
    "<p><b>20 Sep 2021</b>. Apple Newsroom: iOS 15 is available today. <b>Focus</b> is the mass leftover — work / sleep / personal filters. Free. iPhone 6s and later.</p><p>ATT is <b>iOS 14.5 Ask</b>. iOS 16 is <b>2022</b>.</p>",
    ["20 Sep 2021 · iOS 15 ships · Focus leftover · iPhone 6s and later", "Not ATT (that is iOS 14.5 Ask) · not iOS 16 Lock Screen"],
    None, None, None,
    "Ask App Not to Track (trap)", "ATT is the 2021 chip on the ATT dest. This Focus leftover never writes Ask.",
    "Ack Focus leftover", "../mailpriv/index.html", "Mail Privacy leftover")

add("2021", "mailpriv", "mailpp-dp", "checks", "ios",
    "Mail · Privacy Protection leftover",
    "Mail Privacy leftover",
    "<p>Ships with iOS 15. Mail Privacy Protection stops senders learning whether you opened the mail and hides your IP from their pixel.</p>",
    ["iOS 15 Mail Privacy Protection · hides open-pixel and sender IP", "Ships with 20 Sep 2021 · not ATT · not a second Focus dest"],
    None, None, None,
    "Allow Tracking (trap)", "Allow never writes. This is not the ATT dest.",
    "Ack Mail leftover", "../relay/index.html", "Private Relay leftover")

add("2021", "relay", "relay-dp", "wait", "ios",
    "iCloud+ · Private Relay beta leftover",
    "iCloud Private Relay leftover",
    "<p>iCloud+ <b>Private Relay</b> launches as a <b>beta</b> with iOS 15. Two relays. Safari traffic. Not a VPN gold. Wait the leftover timer.</p>",
    ["iCloud+ Private Relay is a beta leftover at iOS 15 launch", "Two relays · Safari leftover · not a live tunnel"],
    None, None, True,
    "Connect live VPN (trap)", "No live tunnel. That click never writes.",
    "Save Relay leftover", "../hidemail/index.html", "Hide My Email leftover")

add("2021", "hidemail", "hidemail-dp", "query", "ios",
    "iCloud+ · Hide My Email leftover",
    "Hide My Email leftover",
    "<p>iCloud+ / iOS 15. Random forwarders so a site does not get the real inbox. Type a leftover label. Empty never writes. No live iCloud account.</p>",
    ["Hide My Email leftover · random forwarder theater", "No live iCloud account · empty never writes"],
    "hide leftover address", None, None,
    "Create a live address (trap)", "No live iCloud account. That click never writes.",
    "Save leftover address", "../spaces21/index.html", "Twitter Spaces leftover")

add("2021", "spaces21", "spaces-dp", "hops", "tw",
    "Twitter · Spaces leftover",
    "Twitter Spaces leftover",
    "<p><b>3 May 2021</b>: host unlock for accounts with 600+ followers. <b>21 Oct 2021</b>: anyone on iOS/Android can host. Clubhouse rival leftover. Dest name stays Twitter. X is <b>23 Jul 2023</b>.</p>",
    ["3 May 2021 · host 600+ leftover", "21 Oct 2021 · anyone hosts leftover · not X"],
    None, [("host600", "Host 600+ leftover (3 May)"), ("anyone", "Anyone hosts leftover (21 Oct)")], None,
    "This is X now (trap)", "X is 23 Jul 2023. This dest stays Twitter. That click never writes.",
    "Save Spaces leftover", "../superfol/index.html", "Super Follows leftover")

add("2021", "superfol", "superfol-dp", "query", "tw",
    "Twitter · Super Follows leftover",
    "Super Follows leftover",
    "<p>Apply <b>22 Jun 2021</b>. Broader <b>Sep 2021</b>. Price leftover <b>$2.99 / $4.99 / $9.99</b>. US iOS first. Not X Premium (2023). No live charge.</p>",
    ["22 Jun 2021 apply · $2.99 / $4.99 / $9.99 leftover", "Not X Premium (2023) · no live charge"],
    "$2.99 leftover", None, None,
    "Subscribe X Premium (trap)", "X Premium is 2023. That click never writes.",
    "Save Super Follow leftover", "../fboutage/index.html", "Facebook outage leftover")

add("2021", "fboutage", "fbout-dp", "checks", "warn",
    "Outage leftover · 4 Oct 2021",
    "Facebook outage leftover",
    "<p><b>4 Oct 2021</b>. Facebook, Instagram and WhatsApp drop off the internet for about six hours. Engineers later blame a faulty backbone configuration that withdrew BGP routes to Facebook DNS.</p>",
    ["4 Oct 2021 · ~15:39–22:50 UTC · BGP withdrawal of Facebook DNS", "FB / Instagram / WhatsApp down about 6 hours · faulty backbone config"],
    None, None, None,
    "This is the Meta app (trap)", "There is no Meta consumer app in 2021. That click never writes.",
    "Ack outage leftover", "../haugen/index.html", "Facebook Papers leftover")

add("2021", "haugen", "haugen-dp", "checks", "warn",
    "Civic leftover · Facebook Papers",
    "Facebook Papers leftover",
    "<p><b>3 Oct 2021</b>. Frances Haugen identifies herself on <i>60 Minutes</i>. The Facebook Papers / WSJ Facebook Files are already in circulation. Senate the same week as the outage.</p><p>Civic leftover. No dump of the papers. Not the Meta rename dest.</p>",
    ["3 Oct 2021 · Frances Haugen on 60 Minutes · Facebook Papers / WSJ Files", "Senate 5 Oct leftover · civic leftover · not a document dump"],
    None, None, None,
    "Open the papers dump (trap)", "No dump. Civic leftover only. That click never writes.",
    "Ack Papers leftover", "../dalle1/index.html", "DALL·E 1 leftover")

add("2021", "dalle1", "dalle1-dp", "query", "coin",
    "OpenAI research leftover · 5 Jan 2021",
    "DALL·E leftover (2021 research)",
    "<p><b>5 Jan 2021</b>. OpenAI publishes DALL·E — a 12-billion-parameter GPT-3 descendant that makes images from captions. <b>Not public.</b> DALL·E 2 is April 2022. ChatGPT is 30 Nov 2022.</p>",
    ["5 Jan 2021 · DALL·E research leftover · not public", "Not DALL·E 2. Not ChatGPT. No live image."],
    "avocado armchair leftover", None, None,
    "Generate live image (trap)", "No live image. That click never writes.",
    "Save research leftover", "../codex/index.html", "Codex leftover")

add("2021", "codex", "codex-dp", "query", "win",
    "OpenAI Codex · API leftover",
    "OpenAI Codex leftover",
    "<p><b>10 Aug 2021</b>. OpenAI opens Codex as an API private beta. Natural language → code. This is the model that already powers the Copilot waitlist dest. Not ChatGPT.</p>",
    ["10 Aug 2021 · Codex API private beta leftover", "Neighbor to Copilot waitlist · not ChatGPT"],
    "codex leftover prompt", None, None,
    "Open ChatGPT (trap)", "ChatGPT is 30 Nov 2022. That click never writes.",
    "Save Codex leftover", "../win365/index.html", "Windows 365 leftover")

add("2021", "win365", "win365-dp", "checks", "win",
    "Windows 365 · Cloud PC leftover",
    "Windows 365 leftover",
    "<p><b>14 Jul 2021</b>. Microsoft announces Windows 365 — a Cloud PC leftover. Windows 11 GA is still <b>5 Oct</b> and stays a leftover dest. Win10 is January mass.</p>",
    ["14 Jul 2021 · Windows 365 Cloud PC announce leftover", "Not Windows 11 GA (5 Oct) · Win10 is still the mass shell"],
    None, None, None,
    "Win10 is gone (trap)", "Win10 is still mass in January. That click never writes.",
    "Ack Cloud PC leftover", "../android12/index.html", "Android 12 leftover")

add("2021", "android12", "and12-dp", "checks", "win",
    "Android 12 · Material You leftover",
    "Android 12 leftover",
    "<p><b>4 Oct 2021</b>. Android 12 ships. Material You leftover. Same week as Windows 11 GA. Not a Pixel dest. No official Material pixel.</p>",
    ["4 Oct 2021 · Android 12 ships · Material You leftover", "Same week as Win11 GA · not a Pixel buy · no official Material pixel"],
    None, None, None,
    "Buy Pixel gold (trap)", "Pixel 6 is the next leftover dest, not gold. That click never writes.",
    "Ack Android leftover", "../pixel6/index.html", "Pixel 6 leftover")

add("2021", "pixel6", "pixel6-dp", "query", "win",
    "Pixel 6 · Tensor leftover",
    "Pixel 6 leftover",
    "<p><b>19 Oct 2021</b>. Pixel 6 / Pixel 6 Pro. First Google Tensor leftover. Not iPhone 13. Not Android 12 the OS dest.</p>",
    ["19 Oct 2021 · Pixel 6 / Tensor leftover", "Not iPhone 13. No official Google pixel."],
    "Tensor leftover", None, None,
    "This is iPhone 13 (trap)", "Not iPhone 13. That click never writes.",
    "Save Tensor leftover", "../tiktok21/index.html", "TikTok leftover")

add("2021", "tiktok21", "tt21-dp", "hops", "yt",
    "TikTok leftover · 2021 stamp",
    "TikTok leftover (2021)",
    "<p>2021 mass leftover. The 2022 year already has a TikTok dest; this room is year-stamped <b>2021</b>. Not Shorts. Not the chip.</p>",
    ["2021 For You leftover · year-stamped dest", "Not YouTube Shorts. Not the 2022 TikTok dest."],
    None, [("fyp", "For You leftover"), ("create", "Create leftover")], None,
    "This is Shorts gold (trap)", "Shorts is a different leftover dest. That click never writes.",
    "Save FYP leftover", "../snapspot/index.html", "Snap Spotlight leftover")

add("2021", "snapspot", "spotlight-dp", "hops", "yt",
    "Snap · Spotlight leftover",
    "Snap Spotlight leftover",
    "<p>2021. Snap Spotlight leftover — the TikTok/Shorts rival on Snapchat. Not TikTok. Not Shorts.</p>",
    ["2021 Spotlight leftover", "Not TikTok. Not Shorts."],
    None, [("spot", "Spotlight leftover"), ("snap", "Snap leftover")], None,
    "Open TikTok (trap)", "Not TikTok. That click never writes.",
    "Save Spotlight leftover", "../dstage/index.html", "Discord Stage leftover")

add("2021", "dstage", "dstage-dp", "hops", "tw",
    "Discord · Stage leftover",
    "Discord Stage leftover",
    "<p>~Mar 2021. Discord Stage Channels leftover — Clubhouse-on-Discord. The Discord dest already exists; this is the Stage verb.</p>",
    ["~Mar 2021 Stage Channels leftover", "Not Clubhouse dest. Not Twitter Spaces."],
    None, [("stage", "Stage leftover"), ("listen", "Listen leftover")], None,
    "This is Clubhouse gold (trap)", "Clubhouse dest already exists. Stage leftover never writes that chip.",
    "Save Stage leftover", "../substack21/index.html", "Substack leftover")

add("2021", "substack21", "substack-dp", "query", "warn",
    "Substack · leftover note",
    "Substack leftover",
    "<p>2021 newsletter leftover. Creator-pay neighbor to Super Follows. Type a leftover title. Empty never writes. No live list.</p>",
    ["2021 newsletter leftover", "Not Super Follows dest. No live list."],
    "substack leftover note", None, None,
    "Publish live (trap)", "No live list. That click never writes.",
    "Save leftover note", "../notion21/index.html", "Notion leftover")

add("2021", "notion21", "notion21-dp", "query", "win",
    "Notion leftover · 2021 stamp",
    "Notion leftover (2021)",
    "<p>2021 workspace leftover. Notion AI waitlist is later. 2022 already has <code>notion22</code> — this room stays year-stamped 2021.</p>",
    ["2021 workspace leftover · not Notion AI", "Not the 2022 notion22 dest."],
    "notion leftover page", None, None,
    "Open Notion AI (trap)", "Notion AI is later. That click never writes.",
    "Save leftover page", "../figjam/index.html", "FigJam leftover")

add("2021", "figjam", "figjam-dp", "hops", "win",
    "FigJam leftover whiteboard",
    "FigJam leftover",
    "<p>2021. Figma FigJam leftover whiteboard. Adobe agrees to buy Figma in <b>2022</b> — that dest is next year’s deepen pack.</p>",
    ["2021 FigJam leftover board", "Adobe acquire is 2022 · not this dest"],
    None, [("board", "Board leftover"), ("sticky", "Sticky leftover")], None,
    "Adobe already owns this (trap)", "Adobe←Figma is 15 Sep 2022. That click never writes.",
    "Save board leftover", "../rbxipo/index.html", "Roblox listing leftover")

add("2021", "rbxipo", "rbxipo-dp", "checks", "coin",
    "Roblox · leftover listing",
    "Roblox leftover listing",
    "<p><b>10 Mar 2021</b>. Roblox direct listing leftover. Same listing style as Coinbase a month later. No live trade.</p>",
    ["10 Mar 2021 · Roblox direct listing leftover", "Neighbor to Coinbase listing style · no live trade"],
    None, None, None,
    "Place a live order (trap)", "No live trade. That click never writes.",
    "Ack listing leftover", "../affirm/index.html", "Affirm leftover")

add("2021", "affirm", "affirm-dp", "checks", "coin",
    "Affirm · BNPL leftover",
    "Affirm leftover",
    "<p><b>13 Jan 2021</b>. Affirm IPO leftover. Buy-now-pay-later residual. No live loan on this dest.</p>",
    ["13 Jan 2021 · Affirm IPO leftover · buy-now-pay-later", "No live loan · not a cart gold"],
    None, None, None,
    "Take a live loan (trap)", "No live loan. That click never writes.",
    "Ack BNPL leftover", "../paramount/index.html", "Paramount+ leftover")

add("2021", "paramount", "paramount-dp", "query", "yt",
    "Paramount+ leftover stream",
    "Paramount+ leftover",
    "<p><b>4 Mar 2021</b>. Paramount+ leftover stream. Not Netflix. Not Disney+ Day (November leftover). No live subscribe charge.</p>",
    ["4 Mar 2021 · Paramount+ leftover", "Not Netflix. Not Disney+ Continue (2019)."],
    "paramount leftover", None, None,
    "Start free trial gold (trap)", "Not the 2019 Disney+ chip. That click never writes.",
    "Save stream leftover", "../dplus21/index.html", "Disney+ Day leftover")

add("2021", "dplus21", "dplus21-dp", "hops", "yt",
    "Disney+ Day leftover · 12 Nov 2021",
    "Disney+ Day leftover",
    "<p><b>12 Nov 2021</b>. Disney+ Day leftover event. Disney+ Continue is the <b>2019</b> star — this room is the 2021 event only.</p>",
    ["12 Nov 2021 · Disney+ Day leftover event", "Not 2019 Continue. Not the ATT chip."],
    None, [("day", "Disney+ Day leftover"), ("watch", "Watch leftover")], None,
    "Continue as 2019 gold (trap)", "Continue is the 2019 chip. This 2021 event leftover never writes it.",
    "Save Day leftover", "../topshot/index.html", "NBA Top Shot leftover")

add("2021", "topshot", "topshot-dp", "query", "coin",
    "NBA Top Shot leftover · Dapper",
    "NBA Top Shot leftover",
    "<p>Peak about <b>22 Feb 2021</b> (~$45.8M in a day). Dapper / Flow leftover. Cool-down from April. No live pack. Not OpenSea.</p>",
    ["22 Feb 2021 peak leftover · Dapper / Flow", "No live pack. Not OpenSea. Not the chip."],
    "moment leftover", None, None,
    "Buy a live pack (trap)", "No live pack. That click never writes.",
    "Save moment leftover", "../../sites/att/index.html", "★ ATT Ask")

# ----- 2022 -----
add("2022", "whisper", "whisper-dp", "query", "gpt",
    "OpenAI · Whisper leftover · 21 Sep 2022",
    "Whisper leftover",
    "<p><b>21 Sep 2022</b>. OpenAI open-sources Whisper, an automatic speech recognizer trained on 680,000 hours. Not ChatGPT. Not a live model here.</p>",
    ["21 Sep 2022 · Whisper leftover · not Send", "No live model. Plus / GPT-4 never write."],
    "whisper leftover transcript", None, None,
    "Subscribe Plus (trap)", "Plus is 1 Feb 2023. That click never writes.",
    "Save transcript leftover", "../merge/index.html", "Merge leftover")

add("2022", "merge", "merge-dp", "checks", "eth",
    "Ethereum · Merge leftover",
    "Ethereum Merge leftover",
    "<p><b>15 Sep 2022</b>. The Merge. Ethereum execution layer joins the Beacon Chain. Proof-of-work ends. About <b>99.95%</b> energy claim. Block <b>15537393</b>.</p>",
    ["15 Sep 2022 · Merge · proof-of-work to proof-of-stake · block 15537393", "Energy claim about 99.95% · no live stake on this dest"],
    None, None, None,
    "Stake live ETH (trap)", "No live stake. That click never writes.",
    "Ack Merge leftover", "../ftx/index.html", "FTX leftover")

add("2022", "ftx", "ftx-dp", "checks", "warn",
    "FTX leftover · literacy only",
    "FTX leftover",
    "<p><b>11 Nov 2022</b>. FTX collapse leftover. Literacy only. No live order book on this dest.</p>",
    ["11 Nov 2022 · FTX collapse leftover · literacy only", "No live book · no order ticket · not Binance gold"],
    None, None, None,
    "Place a live order (trap)", "No live book. That click never writes.",
    "Ack FTX leftover", "../luna/index.html", "Luna leftover")

add("2022", "luna", "luna-dp", "checks", "warn",
    "Terra / Luna leftover",
    "Terra / Luna leftover",
    "<p><b>May 2022</b>. UST depegs. Luna leftover. Crypto-winter lead-in before FTX. No live trade.</p>",
    ["May 2022 · Terra / UST / Luna depeg leftover", "Crypto-winter lead-in · no live trade"],
    None, None, None,
    "Swap live (trap)", "No live trade. That click never writes.",
    "Ack depeg leftover", "../copilotga/index.html", "Copilot GA leftover")

add("2022", "copilotga", "copga-dp", "query", "win",
    "GitHub Copilot · GA leftover",
    "GitHub Copilot GA leftover",
    "<p><b>21 Jun 2022</b>. Copilot is generally available at <b>$10/month</b> or <b>$100/year</b>. Free for verified students and popular OSS maintainers. Technical preview was <b>29 Jun 2021</b>.</p>",
    ["21 Jun 2022 · GA leftover · $10/mo or $100/yr", "Preview was 29 Jun 2021 · not ChatGPT · not GPT-4"],
    "$10 leftover", None, None,
    "Open GPT-4 (trap)", "GPT-4 is 14 Mar 2023. That click never writes.",
    "Save GA leftover", "../figmaad/index.html", "Figma leftover")

add("2022", "figmaad", "figmaad-dp", "checks", "win",
    "Adobe · Figma leftover announce",
    "Adobe ← Figma leftover",
    "<p><b>15 Sep 2022</b>. Adobe agrees to acquire Figma for about <b>$20 billion</b>. Same calendar day as the Merge. Print the 2022 announce — not the later collapse of the deal. FigJam is the 2021 dest.</p>",
    ["15 Sep 2022 · Adobe agrees to buy Figma about $20B", "Same day as the Merge · print the 2022 announce · not the later kill"],
    None, None, None,
    "Deal already dead (trap)", "Print the 2022 announce. The later kill is not this dest. That click never writes.",
    "Ack announce leftover", "../steamdeck/index.html", "Steam Deck leftover")

add("2022", "steamdeck", "steamdeck-dp", "checks", "win",
    "Steam Deck leftover handheld",
    "Steam Deck leftover",
    "<p><b>25 Feb 2022</b>. Steam Deck leftover handheld. Same day as Elden Ring — this dest is the Deck. No live Steam checkout.</p>",
    ["25 Feb 2022 · Steam Deck leftover handheld", "Same day as Elden Ring · no live store checkout"],
    None, None, None,
    "Checkout live (trap)", "No live store checkout. That click never writes.",
    "Ack Deck leftover", "../ios16/index.html", "iOS 16 leftover")

add("2022", "ios16", "ios16-dp", "hops", "ios",
    "iOS 16 · Lock Screen leftover",
    "iOS 16 leftover",
    "<p><b>12 Sep 2022</b>. iOS 16. Lock Screen widgets and fonts leftover. Not ATT (2021). Not iOS 15 Focus.</p>",
    ["12 Sep 2022 · iOS 16 Lock Screen leftover", "Not ATT (2021 Ask). Not iOS 15 Focus."],
    None, [("lock", "Lock Screen leftover"), ("widget", "Widget leftover")], None,
    "Ask App Not to Track (trap)", "ATT is the 2021 chip. This leftover never writes Ask.",
    "Save Lock Screen leftover", "../passkeys/index.html", "Passkeys leftover")

add("2022", "passkeys", "passkeys-dp", "checks", "ios",
    "Passkeys leftover · FIDO",
    "Passkeys leftover",
    "<p>WWDC <b>6 Jun 2022</b>. Passkeys ship with iOS 16 and macOS Ventura. FIDO / WebAuthn leftover. Face ID / Touch ID theater — no live credential.</p>",
    ["WWDC 6 Jun 2022 announce · passkeys ship with iOS 16 / Ventura", "FIDO / WebAuthn leftover · not a live sign-in"],
    None, None, None,
    "Sign in live (trap)", "No live WebAuthn. That click never writes.",
    "Ack passkey leftover", "../craiyon/index.html", "Craiyon leftover")

add("2022", "craiyon", "craiyon-dp", "query", "gpt",
    "Craiyon leftover · was DALL·E mini",
    "Craiyon leftover",
    "<p><b>Jun 2022</b>. DALL·E mini is renamed <b>Craiyon</b>. Not DALL·E 2 (already a dest). Not Midjourney. No live image.</p>",
    ["Jun 2022 · DALL·E mini renamed Craiyon leftover", "Not DALL·E 2 dest. No live image."],
    "craiyon leftover prompt", None, None,
    "Generate live (trap)", "No live image. That click never writes.",
    "Save Craiyon leftover", "../heardle/index.html", "Heardle leftover")

add("2022", "heardle", "heardle-dp", "query", "yt",
    "Heardle leftover · daily song",
    "Heardle leftover",
    "<p>2022. Spotify Heardle leftover — Wordle-class daily song. Spotify later shuts it; this room prints the 2022 play. Not NYT Wordle tiles.</p>",
    ["2022 Heardle leftover · not Wordle dest", "Not NYT tiles. Not the chip."],
    "heardle leftover", None, None,
    "Open NYT Wordle gold (trap)", "Wordle leftover dest already exists. Not this gold. That click never writes.",
    "Save Heardle leftover", "../quordle/index.html", "Quordle leftover")

add("2022", "quordle", "quordle-dp", "query", "yt",
    "Quordle leftover · four boards",
    "Quordle leftover",
    "<p>2022. Four Wordles at once leftover. Not the Wordle dest. Not NYT gold.</p>",
    ["2022 Quordle leftover", "Not the Wordle dest. Not Send."],
    "quordle leftover", None, None,
    "This is Wordle gold (trap)", "Not the Wordle dest. That click never writes.",
    "Save Quordle leftover", "../redditnft/index.html", "Reddit NFT leftover")

add("2022", "redditnft", "redditnft-dp", "hops", "coin",
    "Reddit · NFT avatar leftover",
    "Reddit NFT leftover",
    "<p><b>Jul 2022</b>. Reddit NFT avatars leftover. No live mint. Not OpenSea (2021 dest).</p>",
    ["Jul 2022 · Reddit NFT avatars leftover", "No live mint. Not OpenSea."],
    None, [("avatar", "Avatar leftover"), ("vault", "Vault leftover")], None,
    "Mint live (trap)", "No live mint. That click never writes.",
    "Save avatar leftover", "../twnft/index.html", "Twitter hex leftover")

add("2022", "twnft", "twnft-dp", "hops", "tw",
    "Twitter · hex leftover",
    "Twitter NFT hex leftover",
    "<p>~<b>20 Jan 2022</b>. Twitter hex NFT profile-pic leftover. Dest name stays <b>Twitter</b>. <b>X is 23 Jul 2023</b>.</p>",
    ["~20 Jan 2022 · Twitter hex leftover", "Dest stays Twitter. X is 23 Jul 2023."],
    None, [("hex", "Hex leftover"), ("pfp", "PFP leftover")], None,
    "This is X now (trap)", "X is 23 Jul 2023. This dest stays Twitter. That click never writes.",
    "Save hex leftover", "../ignft/index.html", "Instagram NFT leftover")

add("2022", "ignft", "ignft-dp", "hops", "tw",
    "Instagram · digital collectible leftover",
    "Instagram NFT leftover",
    "<p>2022. Instagram digital-collectible leftover. Not the 2021 Meta rename dest. The consumer app is still Instagram / Facebook. Threads is <b>2023</b>.</p>",
    ["2022 Instagram collectible leftover", "Not Meta rename. Not Threads (2023)."],
    None, [("collect", "Digital collectible leftover"), ("share", "Share leftover")], None,
    "Open Threads (trap)", "Threads is 5 Jul 2023. That click never writes.",
    "Save collectible leftover", "../looksrare/index.html", "LooksRare leftover")

add("2022", "looksrare", "looksrare-dp", "query", "coin",
    "LooksRare leftover · Jan 2022",
    "LooksRare leftover",
    "<p><b>Jan 2022</b>. LooksRare leftover — OpenSea rival. No live mint. OpenSea is a 2021 dest.</p>",
    ["Jan 2022 · LooksRare leftover", "No live mint. Not OpenSea dest."],
    "looksrare leftover", None, None,
    "Mint live (trap)", "No live mint. That click never writes.",
    "Save LooksRare leftover", "../temu/index.html", "Temu leftover")

add("2022", "temu", "temu-dp", "query", "warn",
    "Temu leftover shop",
    "Temu leftover",
    "<p>~<b>Sep 2022</b>. Temu US leftover shop. No live cart charge.</p>",
    ["~Sep 2022 · Temu US leftover", "No live cart charge."],
    "temu leftover", None, None,
    "Checkout live (trap)", "No live cart charge. That click never writes.",
    "Save shop leftover", "../next13/index.html", "Next.js 13 leftover")

add("2022", "next13", "next13-dp", "checks", "win",
    "Next.js 13 leftover · app dir",
    "Next.js 13 leftover",
    "<p><b>Oct / Nov 2022</b>. Next.js 13 leftover (app directory). Dev leftover. Not ChatGPT.</p>",
    ["Oct / Nov 2022 · Next.js 13 leftover · app directory", "Dev leftover · not a second ChatGPT dest"],
    None, None, None,
    "Open ChatGPT (trap)", "Not Send. That click never writes.",
    "Ack Next leftover", "../bun22/index.html", "Bun leftover")

add("2022", "bun22", "bun-dp", "query", "win",
    "Bun leftover runtime",
    "Bun leftover",
    "<p>2022. Bun leftover runtime. Not Node gold. Type a leftover note.</p>",
    ["2022 Bun leftover runtime", "Not Node gold."],
    "bun leftover", None, None,
    "This is Node gold (trap)", "Not Node gold. That click never writes.",
    "Save Bun leftover", "../pplx/index.html", "Perplexity leftover")

add("2022", "pplx", "pplx-dp", "query", "gpt",
    "Perplexity leftover ask",
    "Perplexity leftover",
    "<p><b>Dec 2022</b>. Perplexity leftover ask. <b>Bing Chat is 7 Feb 2023</b> — that click is a trap and never writes.</p>",
    ["Dec 2022 · Perplexity leftover ask", "Bing Chat is 7 Feb 2023 · never writes"],
    "perplexity leftover ask", None, None,
    "Open Bing Chat (trap)", "Bing Chat is 7 Feb 2023. That click never writes.",
    "Save ask leftover", "../d2api/index.html", "DALL·E 2 API leftover")

add("2022", "d2api", "d2api-dp", "query", "gpt",
    "DALL·E 2 API leftover",
    "DALL·E 2 API leftover",
    "<p>~<b>Nov 2022</b>. DALL·E 2 API / broader access leftover. The DALL·E 2 dest already exists — this room is the API verb. DALL·E 3 is 2023. No live image.</p>",
    ["Nov 2022 · DALL·E 2 API leftover", "Not DALL·E 3. No live image. Not Send."],
    "dalle 2 api leftover", None, None,
    "Open DALL·E 3 (trap)", "DALL·E 3 is 2023. That click never writes.",
    "Save API leftover", "../instruct/index.html", "InstructGPT leftover")

add("2022", "instruct", "instruct-dp", "checks", "gpt",
    "InstructGPT leftover · RLHF",
    "InstructGPT leftover",
    "<p><b>Jan 2022</b>. InstructGPT leftover (RLHF). Parent of the 30 Nov ChatGPT preview. The star is still <b>Send</b>.</p>",
    ["Jan 2022 · InstructGPT leftover · RLHF parent of ChatGPT", "Not Send · not GPT-4 · not Plus"],
    None, None, None,
    "Send as gold (trap)", "Send is the chip on the ChatGPT dest. This leftover never writes it.",
    "Ack Instruct leftover", "../copyai/index.html", "Copy.ai leftover")

add("2022", "copyai", "copyai-dp", "query", "gpt",
    "Copy.ai leftover writer",
    "Copy.ai leftover",
    "<p>2022 GPT-3 writer leftover. Neighbor to the Jasper dest. Not ChatGPT Send.</p>",
    ["2022 Copy.ai leftover", "Not Send. Not Plus. Not GPT-4."],
    "copy.ai leftover", None, None,
    "Subscribe Plus (trap)", "Plus is 1 Feb 2023. That click never writes.",
    "Save writer leftover", "../eleven/index.html", "ElevenLabs leftover")

add("2022", "eleven", "eleven-dp", "query", "gpt",
    "ElevenLabs leftover voice",
    "ElevenLabs leftover",
    "<p>2022 leftover voice. Type a leftover line. No live clone of a real person.</p>",
    ["2022 ElevenLabs leftover voice", "No live clone of a real person."],
    "eleven leftover", None, None,
    "Clone a real voice (trap)", "No live clone. That click never writes.",
    "Save voice leftover", "../lastpass/index.html", "LastPass leftover")

add("2022", "lastpass", "lastpass-dp", "checks", "warn",
    "LastPass leftover · rotate",
    "LastPass leftover",
    "<p><b>Dec 2022</b>. LastPass breach leftover. The museum verb is <b>rotate / ack</b>. No dump. No exploit.</p>",
    ["Dec 2022 · LastPass breach leftover · verb is rotate / ack", "No dump · no exploit · incomplete never writes"],
    None, None, None,
    "Dump the vault (trap)", "No dump. No exploit. That click never writes.",
    "Ack rotate leftover", "../arc22/index.html", "Arc leftover")

add("2022", "arc22", "arc-dp", "hops", "win",
    "Arc leftover browser",
    "Arc leftover",
    "<p>2022. Arc browser leftover (The Browser Company). Chrome habit stays the mass shell. No official Chrome pixels.</p>",
    ["2022 Arc leftover", "Chrome habit stays the mass shell. Not official Chrome pixels."],
    None, [("space", "Space leftover"), ("tab", "Tab leftover")], None,
    "This is Chrome gold (trap)", "Chrome habit dest already exists. That click never writes.",
    "Save Arc leftover", "../truth/index.html", "Truth Social leftover")

add("2022", "truth", "truth-dp", "query", "xtrap",
    "Truth Social leftover · 21 Feb 2022",
    "Truth Social leftover",
    "<p><b>21 Feb 2022</b>. Truth Social leftover launch. Not Twitter. Not X (23 Jul 2023).</p>",
    ["21 Feb 2022 · Truth Social leftover launch", "Not Twitter dest. Not X."],
    "truth leftover", None, None,
    "This is X (trap)", "X is 23 Jul 2023. That click never writes.",
    "Save Truth leftover", "../hive22/index.html", "Hive leftover")

add("2022", "hive22", "hive-dp", "query", "xtrap",
    "Hive leftover · Twitter-alt",
    "Hive leftover",
    "<p>2022. Hive Social leftover Twitter-alt. Not the Mastodon dest. Not X.</p>",
    ["2022 Hive leftover", "Not Mastodon dest. Not X."],
    "hive leftover", None, None,
    "This is X (trap)", "X is 23 Jul 2023. That click never writes.",
    "Save Hive leftover", "../tumblr22/index.html", "Tumblr leftover")

add("2022", "tumblr22", "tumblr22-dp", "hops", "xtrap",
    "Tumblr leftover · 2022",
    "Tumblr leftover (2022)",
    "<p>Tumblr comeback leftover during the Twitter close. Automattic residual. Dest name on Twitter dest stays Twitter.</p>",
    ["2022 Tumblr comeback leftover", "Not X. Not Mastodon."],
    None, [("dash", "Dashboard leftover"), ("reblog", "Reblog leftover")], None,
    "This is X (trap)", "X is 23 Jul 2023. That click never writes.",
    "Save Tumblr leftover", "../win22h2/index.html", "Win11 22H2 leftover")

add("2022", "win22h2", "win22h2-dp", "checks", "win",
    "Windows 11 22H2 leftover",
    "Windows 11 22H2 leftover",
    "<p>2022. Windows 11 22H2 leftover. Windows 10 is still the January mass shell. Failed-final word Chrome on the desktop.</p>",
    ["2022 · Windows 11 22H2 leftover", "Win10 is still the January mass shell · not Win11-as-default"],
    None, None, None,
    "Win11 is January default (trap)", "Win10 is still January mass. That click never writes.",
    "Ack 22H2 leftover", "../lockdown/index.html", "Lockdown leftover")

add("2022", "lockdown", "lockdown-dp", "checks", "ios",
    "iOS 16 · Lockdown Mode leftover",
    "Lockdown Mode leftover",
    "<p>iOS 16. Lockdown Mode leftover for extreme threats. Not App Tracking Transparency. Not the Ask chip.</p>",
    ["iOS 16 Lockdown Mode leftover · extreme-threat leftover", "Not ATT (2021 Ask) · not a live lockdown"],
    None, None, None,
    "Ask App Not to Track (trap)", "ATT is the 2021 chip. That click never writes.",
    "Ack Lockdown leftover", "../gen2/index.html", "Gen-2 leftover")

add("2022", "gen2", "gen2-dp", "query", "gpt",
    "Runway Gen-2 leftover",
    "Runway Gen-2 leftover",
    "<p>2022. Runway Gen-2 leftover (text / video). Gen-1 dest already exists. Sora is <b>2024</b>. No live video.</p>",
    ["2022 Runway Gen-2 leftover", "Gen-1 dest exists. Sora is 2024. No live video."],
    "gen-2 leftover prompt", None, None,
    "Open Sora (trap)", "Sora is 2024. That click never writes.",
    "Save Gen-2 leftover", "../../sites/chatgpt/index.html", "★ ChatGPT Send")


def fourx_from(path: Path) -> str:
    t = path.read_text(encoding="utf-8")
    blocks = re.findall(r"<!-- ITT-4X:.*?<!-- ITT-4X:[^>]*:end -->", t, flags=re.S)
    return "\n".join(blocks) + ("\n" if blocks else "")


def theater(row) -> str:
    (year, slug, suffix, kind, tone, bar, h1, life, ticks, field, hops, wait,
     trap_lab, trap_msg, go_lab, nxt, nl) = row
    ns = "p21" if year == "2021" else "p22"
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
<p hidden data-next-flow data-next-when-key="itt{year[2:]}-{suffix}"><b>Next:</b> <a href="{nxt}">{nl}</a></p>
</div>
</div>
"""


def main() -> None:
    n = 0
    for row in D:
        year, slug = row[0], row[1]
        dest = ROOT / "years" / year / "sites" / slug / "index.html"
        if not dest.is_file():
            print("MISSING", dest)
            continue
        fourx = fourx_from(dest)
        html = theater(row) + fourx + f'<script src="../../../../js/immersion-{year}.js"></script>\n</body>\n</html>\n'
        dest.write_text(html, encoding="utf-8")
        n += 1
    print(f"upgraded {n} dests")


if __name__ == "__main__":
    main()
