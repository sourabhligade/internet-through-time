#!/usr/bin/env python3
"""Build 2021 3× door from scratch. No git checkout of wiped forest.

Star: ATT Ask · itt21-att · Allow never writes.
Size: ≥177 dest folders · ≥276 HTML · 27 leftover 3× doors · also-nav via build-3x-links.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
Y = ROOT / "years" / "2021"

# slug, title, life, next_rel, pop_id
DESTS: list[tuple[str, str, str, str, str]] = []


def add(slug: str, title: str, life: str, nxt: str, pop: str = "") -> None:
    DESTS.append((slug, title, life, nxt, pop or slug))


# Official + leftover 3× + deepen + pack E (unique slugs)
add("signal", "Signal leftover", "15 May 2021 leftover delay. WhatsApp policy is next door. Not ATT gold.", "../copilot/index.html")
add("copilot", "Copilot waitlist", "29 Jun 2021 GitHub technical preview. ChatGPT is 30 Nov 2022.", "../meta/index.html")
add("meta", "Meta rename", "28 Oct 2021 Facebook, Inc. → Meta. Consumer app stays Facebook.", "../windows11/index.html")
add("windows11", "Windows 11 leftover", "5 Oct 2021 GA leftover. Win10 is January mass.", "../flash/index.html")
add("flash", "Flash brick", "Chrome hard-block 12 Jan 2021. EOL 31 Dec 2020. Play SWF never writes.", "../chrome/index.html")
add("chrome", "Chrome habit", "Win10 + Chrome habit leftover. Not the chip.", "../windows10/index.html")
add("windows10", "Windows 10 residual", "January mass. Win11 is leftover.", "../facebook/index.html")
add("facebook", "Facebook leftover", "App is still Facebook. Meta is the company leftover.", "../playable/game.html")
add("youtube", "YouTube leftover", "Mass leftover watch tab. Shorts dest is next door. Not ATT.", "../wikipedia/index.html", "youtube")
add("wikipedia", "Wikipedia leftover", "World encyclopedia leftover. Not the 2001 edit star.", "../facebook/index.html")
add("reddit21", "reddit leftover 2021", "2021 leftover front page. Not 2018 GDPR gold.", "../netflix21/index.html")
add("netflix21", "Netflix leftover 2021", "Mass leftover. Squid Game is print dest.", "../twitter21/index.html")
add("twitter21", "Twitter leftover 2021", "Still Twitter. Spaces dest is separate. X is 2023.", "../tiktok21/index.html")
add("tiktok21", "TikTok leftover 2021", "Mass leftover. Reels is 2020. Not ATT.", "../spotify21/index.html")
add("spotify21", "Spotify leftover 2021", "2021 leftover. Spotify US is 2011 wiped.", "../twitch21/index.html")
add("twitch21", "Twitch leftover 2021", "2021 leftover stream theater. No live sub.", "../youtube/index.html")
add("win365", "Windows 365 leftover", "2 Aug 2021 Cloud PC leftover.", "../android12/index.html")
add("android12", "Android 12 leftover", "4 Oct 2021 Material You leftover.", "../pixel6/index.html")
add("pixel6", "Pixel 6 leftover", "19 Oct 2021 Tensor leftover. No live cart.", "../edge21/index.html")
add("edge21", "Edge leftover 2021", "Chromium Edge leftover. Chrome is still habit.", "../firefox91/index.html")
add("firefox91", "Firefox 91 leftover", "2021 leftover. Not Chrome gold.", "../safari15/index.html")
add("safari15", "Safari 15 leftover", "Ships with iOS 15. Not ATT gold.", "../windows11/index.html")
add("clubhouse", "Clubhouse leftover", "2021 invite leftover. Not 2020 mass gold.", "../nft/index.html")
add("nft", "NFT literacy leftover", "Beeple-class literacy. No wallet. No mint.", "../squid/index.html")
add("squid", "Squid Game print leftover", "Sep 2021 print leftover. No Netflix dest gold.", "../beeple/index.html")
add("beeple", "Beeple leftover", "11 Mar 2021 Christie's $69.3M leftover. No mint.", "../bayc/index.html")
add("bayc", "Bored Ape leftover", "23 Apr–1 May 2021 leftover literacy. No wallet.", "../topshot/index.html")
add("topshot", "NBA Top Shot leftover", "2021 leftover moments. No live buy.", "../opensea/index.html")
add("opensea", "OpenSea leftover", "2021 leftover marketplace. No mint.", "../axie/index.html")
add("axie", "Axie leftover", "2021 play-to-earn leftover literacy. No wallet.", "../wordleseed/index.html")
add("wordleseed", "Wordle seed leftover", "90 users 1 Nov 2021. NYT is 31 Jan 2022.", "../clubhouse/index.html")
add("shorts", "YouTube Shorts leftover", "US 18 Mar · global 13 Jul 2021 leftover.", "../airtag/index.html")
add("airtag", "AirTag leftover", "20 Apr 2021 · $29 / $99 · needs iOS 14.5.", "../coinbase/index.html")
add("coinbase", "Coinbase listing leftover", "14 Apr 2021 COIN leftover. No live order.", "../beeple/index.html")
add("log4j", "Log4Shell patch leftover", "CVE-2021-44228 · 9 Dec · patch only. No PoC.", "../whatsapp21/index.html")
add("whatsapp21", "WhatsApp policy leftover", "4 Jan notice · 8 Feb accept leftover.", "../telegram21/index.html")
add("telegram21", "Telegram leftover", "~5.6M downloads 6–10 Jan leftover.", "../ios15/index.html")
add("ios15", "iOS 15 Focus leftover", "20 Sep 2021 leftover.", "../mailpriv/index.html")
add("mailpriv", "Mail Privacy leftover", "iOS 15 leftover. Not ATT gold.", "../relay/index.html")
add("relay", "Private Relay leftover", "iOS 15 beta leftover. Not VPN gold.", "../hidemail/index.html")
add("hidemail", "Hide My Email leftover", "iOS 15 leftover.", "../spaces21/index.html")
add("spaces21", "Twitter Spaces leftover", "Host 3 May · anyone 21 Oct leftover.", "../superfol/index.html")
add("superfol", "Super Follows leftover", "22 Jun 2021 leftover. Not X Premium.", "../fboutage/index.html")
add("fboutage", "Facebook outage leftover", "4 Oct 2021 BGP/DNS leftover.", "../haugen/index.html")
add("haugen", "Facebook Papers leftover", "Sep–Oct 2021 leftover literacy. Not a booth.", "../dalle1/index.html")
add("dalle1", "DALL·E 1 leftover", "5 Jan 2021 research leftover. Not DALL·E 2.", "../codex/index.html")
add("codex", "OpenAI Codex leftover", "2021 leftover. Not ChatGPT.", "../win365/index.html")
add("dstage", "Discord Stage leftover", "2021 Stage leftover. Not Clubhouse gold.", "../substack21/index.html")
add("substack21", "Substack leftover", "2021 leftover writers. No live charge.", "../notion21/index.html")
add("notion21", "Notion leftover 2021", "2021 leftover. Notion AI is 2023.", "../figjam/index.html")
add("figjam", "FigJam leftover", "Apr 2021 leftover.", "../rbxipo/index.html")
add("rbxipo", "Roblox listing leftover", "10 Mar 2021 leftover. No live trade.", "../affirm/index.html")
add("affirm", "Affirm leftover", "13 Jan 2021 leftover. No live loan.", "../paramount/index.html")
add("paramount", "Paramount+ leftover", "4 Mar 2021 leftover. No live charge.", "../dplus21/index.html")
add("dplus21", "Disney+ Day leftover", "12 Nov 2021 leftover. 2019 Continue is gold last year.", "../topshot/index.html")
add("gme", "GME leftover", "Jan 2021 squeeze leftover literacy. No live trade.", "../epic/index.html")
add("epic", "Epic v Apple leftover", "2021 trial leftover.", "../att/index.html")
add("robinhood", "Robinhood leftover", "28 Jan restrict leftover. No live order.", "../opensea/index.html")
add("discord21", "Discord leftover", "2021 leftover MAU. Stage dest is next door.", "../clubhouse/index.html")
add("snapspot", "Snap Spotlight leftover", "Nov 2021 leftover.", "../dstage/index.html")
add("lamda", "LaMDA leftover", "Google I/O 2021 leftover. Not ChatGPT.", "../dalle1/index.html")
add("github21", "GitHub Copilot leftover page", "29 Jun 2021 leftover neighbor of Copilot dest.", "../copilot/index.html")
add("openaiapi", "OpenAI API leftover", "2021 leftover. Not ChatGPT Send.", "../codex/index.html")
add("eleuther", "EleutherAI leftover", "2021 leftover research. No live weights.", "../huggingface21/index.html")
add("huggingface21", "Hugging Face leftover", "2021 leftover hub.", "../eleuther/index.html")
add("npm21", "npm leftover", "2021 leftover registry.", "../github21/index.html")
add("githubarctic", "Arctic Vault leftover", "2020 vault · 2021 leftover note.", "../github21/index.html")
add("hafnium", "Hafnium leftover", "Mar 2021 Exchange leftover · patch only.", "../printnightmare/index.html")
add("printnightmare", "PrintNightmare leftover", "Jul 2021 leftover patch. No PoC.", "../kaseya/index.html")
add("kaseya", "Kaseya leftover", "Jul 2021 leftover literacy.", "../colonial/index.html")
add("colonial", "Colonial Pipeline leftover", "May 2021 leftover literacy.", "../jbs21/index.html")
add("jbs21", "JBS leftover", "2021 leftover literacy.", "../fastly21/index.html")
add("fastly21", "Fastly outage leftover", "8 Jun 2021 leftover.", "../awsoutage21/index.html")
add("awsoutage21", "AWS leftover outage", "7 Dec 2021 leftover.", "../fastly21/index.html")
add("privdash", "Android Privacy Dashboard leftover", "Android 12 leftover. Not ATT.", "../android12/index.html")
add("iphone13", "iPhone 13 leftover", "14 Sep 2021 leftover. Not ATT gold.", "../airtag/index.html")
add("macbookm1p", "MacBook Pro M1 Pro leftover", "18 Oct 2021 leftover.", "../iphone13/index.html")
add("quest2", "Quest 2 leftover", "2020 ship · 2021 leftover.", "../facebook/index.html")
add("igshop", "Instagram Shop leftover", "2021 leftover. Reels is 2020.", "../tiktok21/index.html")
add("snap21", "Snap leftover 2021", "Spotlight dest is next door.", "../snapspot/index.html")
add("parler", "Parler leftover", "Jan 2021 leftover literacy. Not a booth.", "../capitol21/index.html")
add("capitol21", "Jan 6 leftover literacy", "Literacy leftover. Not a partisan booth.", "../parler/index.html")
add("onlyfans21", "OnlyFans policy leftover", "Aug 2021 policy leftover. No adult room.", "../att/index.html")
add("amc21", "AMC leftover", "2021 leftover squeeze neighbor. No live trade.", "../gme/index.html")
add("dogecoin", "Dogecoin leftover", "2021 leftover literacy. No live trade.", "../gme/index.html")
add("elsalvador", "El Salvador bitcoin leftover", "Sep 2021 leftover literacy.", "../coinbase/index.html")
add("eth1559", "EIP-1559 leftover", "5 Aug 2021 London leftover.", "../chinamine/index.html")
add("chinamine", "China mining leftover", "2021 leftover literacy.", "../eth1559/index.html")
add("nftnyc", "NFT.NYC leftover", "2021 leftover. No ticket charge.", "../nft/index.html")
add("hbomax21", "HBO Max leftover", "2021 leftover. Not 2020 gold.", "../paramount/index.html")
add("peacock21", "Peacock leftover", "2021 leftover.", "../hbomax21/index.html")
add("miro21", "Miro leftover", "2021 leftover board.", "../figjam/index.html")
add("zoom21", "Zoom leftover 2021", "Not 2020 mute→Leave gold.", "../teams21/index.html")
add("teams21", "Teams leftover 2021", "2021 leftover. Not Zoom gold.", "../zoom21/index.html")
add("slack21", "Slack leftover 2021", "2021 leftover. IPO is 2019.", "../teams21/index.html")
add("ios145", "iOS 14.5 leftover note", "26 Apr leftover neighbor of ATT.", "../att/index.html")
add("watch7", "Watch Series 7 leftover", "14 Sep 2021 leftover.", "../iphone13/index.html")
add("airpods3", "AirPods 3 leftover", "26 Oct 2021 leftover.", "../iphone13/index.html")
add("magsafe21", "MagSafe leftover", "2021 leftover.", "../iphone13/index.html")
add("win11tpm", "Win11 TPM leftover", "Jun 24 leftover. No bypass how-to.", "../windows11/index.html")
add("sunvalley", "Sun Valley leftover", "Jun 24 2021 leftover name.", "../windows11/index.html")
add("brave21", "Brave leftover", "2021 leftover. Not ATT.", "../chrome/index.html")
add("genshin21", "Genshin leftover", "2021 leftover. No live spend.", "../rbxipo/index.html")
add("fortnite21", "Fortnite leftover 2021", "Epic dest is next door.", "../epic/index.html")
add("amongus21", "Among Us leftover", "2021 leftover. 2020 gold is wiped.", "../rbxipo/index.html")
add("pokemonunite", "Pokémon UNITE leftover", "21 Jul 2021 leftover.", "../rbxipo/index.html")
add("wwdc21", "WWDC leftover", "7–11 Jun 2021 leftover.", "../ios15/index.html")
add("io21", "Google I/O leftover", "18–20 May 2021 leftover.", "../lamda/index.html")
add("build21", "Microsoft Build leftover", "25–27 May 2021 leftover.", "../win365/index.html")
add("reinvent21", "re:Invent leftover", "Nov 2021 leftover.", "../win365/index.html")
add("gpay21", "Google Pay leftover", "2021 leftover. No live card.", "../affirm/index.html")
add("applepay21", "Apple Pay leftover", "2021 leftover. 2014 is not this dest.", "../att/index.html")
add("venmo21", "Venmo leftover", "2021 leftover. No live bank.", "../affirm/index.html")
add("paypal21", "PayPal leftover 2021", "2021 leftover.", "../venmo21/index.html")
add("shopify21", "Shopify leftover", "2021 leftover. No live charge.", "../igshop/index.html")
add("stripe21", "Stripe leftover", "2021 leftover. No live key.", "../shopify21/index.html")
add("shopapp21", "Shop app leftover", "2021 leftover.", "../shopify21/index.html")
add("ubereats21", "Uber Eats leftover", "2021 leftover. No live order.", "../doordash21/index.html")
add("doordash21", "DoorDash leftover", "2021 leftover. No live order.", "../ubereats21/index.html")
add("instacart21", "Instacart leftover", "2021 leftover.", "../doordash21/index.html")
add("linkedin21", "LinkedIn leftover", "2021 leftover. 2011 is wiped.", "../facebook/index.html")
add("pinterest21", "Pinterest leftover", "2021 leftover.", "../igshop/index.html")
add("tiktokshop", "TikTok Shop leftover", "2021 leftover seed.", "../tiktok21/index.html")
add("ytpremium", "YouTube Premium leftover", "2021 leftover. Not Shorts gold.", "../youtube/index.html")
add("stadia21", "Stadia leftover 2021", "Still alive leftover. 2019 is Stadia gold last year.", "../luna21/index.html")
add("luna21", "Amazon Luna leftover", "2021 leftover.", "../stadia21/index.html")
add("geforce21", "GeForce Now leftover", "2021 leftover.", "../luna21/index.html")
add("xboxcloud21", "xCloud leftover 2021", "2021 leftover.", "../stadia21/index.html")
add("switcholed", "Switch OLED leftover", "8 Oct 2021 leftover.", "../rbxipo/index.html")
add("ps5stock", "PS5 stock leftover", "2021 leftover stock theater.", "../xboxseries/index.html")
add("xboxseries", "Xbox Series leftover", "2021 leftover.", "../ps5stock/index.html")
add("steamdeckwait", "Steam Deck wait leftover", "16 Jul 2021 announce leftover. Ship is 2022.", "../ps5stock/index.html")
add("kindle21", "Kindle leftover 2021", "2021 leftover.", "../shopify21/index.html")
add("audible21", "Audible leftover", "2021 leftover.", "../kindle21/index.html")
add("podcasts21", "Apple Podcasts leftover", "2021 leftover.", "../spotify21/index.html")
add("maps21", "Google Maps leftover", "2021 leftover. 2005 Maps is not this dest.", "../chrome/index.html")
add("waze21", "Waze leftover", "2021 leftover.", "../maps21/index.html")
add("translate21", "Translate leftover", "2021 leftover.", "../chrome/index.html")
add("drive21", "Google Drive leftover", "2021 leftover.", "../win365/index.html")
add("onedrive21", "OneDrive leftover", "2021 leftover.", "../drive21/index.html")
add("icloud21", "iCloud leftover 2021", "2021 leftover + Private Relay neighbor.", "../relay/index.html")
add("dropbox21", "Dropbox leftover", "2021 leftover. 2008 is not this dest.", "../drive21/index.html")
add("zoomphone", "Zoom Phone leftover", "2021 leftover. Not 2020 Zoom gold.", "../zoom21/index.html")
add("webex21", "Webex leftover", "2021 leftover.", "../zoom21/index.html")
add("meet21", "Google Meet leftover", "2021 leftover. 2020 Meet is wiped.", "../zoom21/index.html")
add("calendly21", "Calendly leftover", "2021 leftover. No live book charge.", "../notion21/index.html")
add("canva21", "Canva leftover", "2021 leftover.", "../figjam/index.html")
add("grammarly21", "Grammarly leftover", "2021 leftover. Not ChatGPT.", "../notion21/index.html")
add("otter21", "Otter leftover", "2021 leftover. Not ChatGPT.", "../zoom21/index.html")
add("descript21", "Descript leftover", "2021 leftover.", "../otter21/index.html")
add("notionplain", "Notion leftover (no AI)", "2021 leftover. Notion AI is 2023.", "../notion21/index.html")
add("attabout", "ATT leftover about", "Literacy leftover. Ask dest is the chip.", "../att/index.html")
add("copabout", "Copilot leftover about", "Waitlist dest is next door.", "../copilot/index.html")
add("sigabout", "Signal leftover about", "Handle dest is next door.", "../signal/index.html")
add("metaabout", "Meta leftover about", "Rename dest is next door.", "../meta/index.html")
add("win11about", "Win11 leftover about", "Install dest is next door.", "../windows11/index.html")


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def leftover_html(slug: str, title: str, life: str, nxt: str, pop: str) -> str:
    nxt_label = nxt.split("/")[-2] if "/index" in nxt else "next"
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>{esc(title)} — 2021 leftover</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-pop3x-flow" style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · leftover, not the chip</p>
<h1>{esc(title)}</h1>
<p>{life} Star is <a href="../att/index.html">ATT Ask</a>. Allow / ChatGPT never write.</p>
<p class="itt-pixel-failed">[failed-final] leftover costume · no official mark</p>
<div class="pop-rows">
 <button type="button" data-pop-pick="go" data-pop-q="leftover">leftover note</button>
 <button type="button" data-pop-pick="chip" data-pop-q="chip">this is the chip (trap pick)</button>
</div>
<p><label>Note <input type="text" data-pop-field data-lo-field placeholder="leftover 2021" maxlength="80"></label></p>
<label class="pop-req"><input type="checkbox" data-pop-req data-lo-req> Leftover door · not ATT Ask.</label>
<label class="pop-req"><input type="checkbox" data-pop-req data-lo-req> Empty / trap never writes.</label>
<p>
 <button type="button" data-pop-go data-pop-id="{esc(pop)}" data-pop-key="pop3-{esc(slug)}">Save leftover</button>
 <button type="button" data-lo-pick="go">go leftover</button>
 <button type="button" data-lo-save data-lo-key="{esc(slug)}" data-lo-need-pick="go">Save leftover dest</button>
 <button type="button" data-lo-trap>ATT Ask (trap)</button>
 <span data-pop-status data-lo-status></span>
</p>
<p hidden data-next-flow data-next-when-key="itt21-pop-{esc(pop)}"><b>Next:</b> <a href="{esc(nxt)}">{esc(nxt_label)}</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def about_html(slug: str, title: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>About {esc(title)} — 2021 leftover</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:12px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="index.html">Open leftover</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>About {esc(title)}</h1>
<p>2021 leftover literacy. Not ATT Ask. ChatGPT is 2022.</p>
<p class="itt-pixel-failed">[failed-final]</p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def att_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021" data-official-key="itt21-att">
<head>
<meta charset="utf-8">
<title>Ask App Not to Track — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="../../pages/home.html">Starting Point</a> · <a href="about.html">about</a></p>
<p class="itt-pixel-failed">[failed-final] Settings silhouette · no official Apple mark</p>
<h1>Privacy → Tracking</h1>
<p style="background:#fff8e1;border:1px solid #ef6c00;padding:8px">
<b>26 Apr 2021</b> · iOS 14.5. Prompt: “Allow [app] to track…?”
<b>Ask App Not to Track</b> is the save. <b>Allow Tracking</b> is the trap.
ChatGPT is 30 Nov 2022. Wordle millions / NYT is 2022. Zoom mass is 2020 wiped.
</p>
<p>
<button type="button" data-att-open="privacy">Open Privacy</button>
<button type="button" data-att-open="tracking">Open Tracking</button>
<button type="button" data-att-allow>Allow Tracking (trap)</button>
</p>
<div data-att-pane="privacy" hidden>
<p>Privacy leftover pane. Tracking is next.</p>
</div>
<div data-att-pane="tracking" hidden>
<p>Tracking leftover pane. Ask is the save.</p>
</div>
<p><label><input type="checkbox" data-att-req> 26 Apr 2021 · iOS 14.5 · Ask vs Allow.</label></p>
<p><label><input type="checkbox" data-att-req> Allow / ChatGPT / Wordle millions / Zoom-gold never write.</label></p>
<p><button type="button" data-att-ask>Ask App Not to Track</button> <span data-att-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-att"><b>Next:</b> <a href="../signal/index.html">Signal leftover</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def signal_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Signal leftover — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a> · leftover, not ATT</p>
<h1>Signal leftover</h1>
<p>WhatsApp policy leftover next door. 15 May delay leftover. Not ATT gold.</p>
<p class="itt-pixel-failed">[failed-final]</p>
<p>
<button type="button" data-sig-note="jan4">4 Jan notice</button>
<button type="button" data-sig-note="may15">15 May delay</button>
<button type="button" data-sig-trap>WhatsApp deleted everyone 8 Feb (trap)</button>
</p>
<p><label>Handle <input data-sig-handle maxlength="40" placeholder="museum"></label></p>
<p><label><input type="checkbox" data-sig-req> Leftover, not ATT Ask.</label></p>
<p><label><input type="checkbox" data-sig-req> Empty handle never writes.</label></p>
<p><button type="button" data-sig-join>Join leftover</button> <span data-sig-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-signal"><b>Next:</b> <a href="../copilot/index.html">Copilot waitlist</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def copilot_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Copilot waitlist — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<h1>GitHub Copilot technical preview</h1>
<p><b>29 Jun 2021</b>. Waitlist leftover. <b>No chat box.</b> ChatGPT is 30 Nov 2022.</p>
<p class="itt-pixel-failed">[failed-final] no official GitHub mark</p>
<p><button type="button" data-copilot-chat>Open ChatGPT (trap)</button></p>
<p><label>Email <input data-copilot-email placeholder="leftover@museum" maxlength="80"></label></p>
<p><label><input type="checkbox" data-copilot-req> 29 Jun 2021 leftover preview.</label></p>
<p><label><input type="checkbox" data-copilot-req> ChatGPT / GPT-4 never write.</label></p>
<p><button type="button" data-copilot-wait>Join waitlist leftover</button> <span data-copilot-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-copilot"><b>Next:</b> <a href="../meta/index.html">Meta rename</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def meta_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Meta rename leftover — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<h1>Facebook, Inc. → Meta</h1>
<p><b>28 Oct 2021</b>. Company leftover. Consumer app stays Facebook.</p>
<p class="itt-pixel-failed">[failed-final]</p>
<p>
<button type="button" data-meta-keep="facebook">Facebook keeps name</button>
<button type="button" data-meta-keep="instagram">Instagram keeps name</button>
<button type="button" data-meta-keep="whatsapp">WhatsApp keeps name</button>
<button type="button" data-meta-app>Open Meta app (trap)</button>
</p>
<p data-meta-kept>Apps that keep names: none yet</p>
<p><label><input type="checkbox" data-meta-req> Company rename leftover.</label></p>
<p><label><input type="checkbox" data-meta-req> No Meta consumer app in 2021.</label></p>
<p><button type="button" data-meta-save>Save company leftover</button> <span data-meta-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-meta"><b>Next:</b> <a href="../windows11/index.html">Windows 11 leftover</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def win11_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Windows 11 leftover — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<h1>Windows 11 leftover</h1>
<p>Announce 24 Jun · GA <b>5 Oct 2021</b>. Win10 is January mass.</p>
<p class="itt-pixel-failed">[failed-final]</p>
<p><button type="button" data-w11-gone>Win10 is gone in January (trap)</button></p>
<p><label><input type="checkbox" data-w11-req> 5 Oct leftover · not January chrome.</label></p>
<p><label><input type="checkbox" data-w11-req> Win10 is still mass.</label></p>
<p><button type="button" data-w11-install>Note leftover install</button> <span data-w11-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-win11"><b>Next:</b> <a href="../flash/index.html">Flash brick</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def flash_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Flash brick leftover — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<h1>Flash brick leftover</h1>
<p>EOL 31 Dec 2020. Chrome hard-block <b>12 Jan 2021</b>.</p>
<p class="itt-pixel-failed">[failed-final]</p>
<p data-flash-stage>SWF stage leftover</p>
<p><button type="button" data-flash-play>Play SWF (trap)</button></p>
<p><label><input type="checkbox" data-flash-req> 12 Jan brick leftover.</label></p>
<p><label><input type="checkbox" data-flash-req> Play SWF never writes.</label></p>
<p><button type="button" data-flash-brick>Note brick leftover</button> <span data-flash-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-flash-brick"><b>Next:</b> <a href="../chrome/index.html">Chrome habit</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def chrome_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Chrome habit leftover — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<h1>Chrome habit leftover</h1>
<p>Win10 + Chrome habit is still the mass shell. Not the chip.</p>
<p class="itt-pixel-failed">[failed-final] word Chrome · no official pixels</p>
<p><button type="button" data-ch21-edge>Switch default to Edge (trap)</button></p>
<p><label>URL <input data-ch21-url placeholder="youtube.com" maxlength="80"></label></p>
<p><button type="button" data-ch21-keep>Keep habit leftover</button> <span data-ch21-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-chrome"><b>Next:</b> <a href="../windows10/index.html">Windows 10 residual</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def win10_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Windows 10 residual — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a></p>
<h1>Windows 10 residual</h1>
<p>January mass. Win11 is 5 Oct leftover.</p>
<p class="itt-pixel-failed">[failed-final]</p>
<p><button type="button" data-w10-mass>Win11 is already January mass (trap)</button></p>
<p><label><input type="checkbox" data-w10-req> Win10 is still mass in January.</label></p>
<p><label><input type="checkbox" data-w10-req> Win11 leftover is 5 Oct.</label></p>
<p><button type="button" data-w10-save>Stay leftover</button> <span data-w10-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-win10"><b>Next:</b> <a href="../facebook/index.html">Facebook leftover</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def game_html() -> str:
    return """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Five Letter — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#111" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a> · <a href="famous.html">Famous leftover</a></p>
<h1>Five Letter</h1>
<p>Museum cabinet. <b>Wordle millions / NYT tiles never write.</b> Seed dest is leftover (90 users 1 Nov).</p>
<p class="itt-pixel-failed">[failed-final]</p>
<p><button type="button" data-five-nyt>Open NYT Wordle (trap)</button></p>
<p><label>Guess <input data-five-field maxlength="5" placeholder="TRACK"></label></p>
<p><label><input type="checkbox" data-five-req> Not NYT. Not millions.</label></p>
<p><label><input type="checkbox" data-five-req> Empty guess never writes.</label></p>
<p><button type="button" data-five-go data-itt-real-save data-storage-key="game-five" data-min-req="2" data-requires="[data-five-req]">Play leftover</button>
<span data-itt-real-status></span></p>
<p hidden data-next-flow data-next-when-key="itt21-game-five"><b>Next:</b> <a href="../att/index.html">ATT Ask</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


SPECIAL = {
    "signal": signal_html,
    "copilot": copilot_html,
    "meta": meta_html,
    "windows11": win11_html,
    "flash": flash_html,
    "chrome": chrome_html,
    "windows10": win10_html,
}


def playable_extra(name: str, title: str) -> str:
    trap = "data-extra-a-allow" if name == "extra-a" else "data-lo-trap"
    ask = "data-extra-a-ask" if name == "extra-a" else ""
    extra_b = name == "extra-b"
    body = ""
    if name == "extra-a":
        body = """<p><button type="button" data-extra-a-allow>Allow (trap)</button>
<button type="button" data-extra-a-ask>Ask drill</button> <span data-extra-a-status></span></p>"""
    elif extra_b:
        body = """<p><label>Type ninety <input data-extra-b-field placeholder="ninety"></label></p>
<p><button type="button" data-extra-b-save>Save leftover</button> <span data-extra-b-status></span></p>"""
    else:
        body = f"""<p><button type="button" data-pop-pick="go">go leftover</button>
<button type="button" data-pop-go data-pop-id="{name}">Save leftover</button>
<button type="button" data-lo-save data-lo-key="{name}" data-lo-need-pick="go">Save leftover dest</button>
<span data-pop-status></span></p>
<p><input data-pop-field data-lo-field placeholder="leftover" maxlength="80">
<label><input type="checkbox" data-pop-req data-lo-req> Leftover not ATT.</label>
<label><input type="checkbox" data-pop-req data-lo-req> Empty never writes.</label></p>"""
    return f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>{esc(title)} — 2021</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#111" text="#eee">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="../../pages/home.html">Starting Point</a> · <a href="game.html">Five Letter</a></p>
<h1>{esc(title)}</h1>
<p>Cabinet leftover. Not ATT. Wordle millions never write.</p>
<p class="itt-pixel-failed">[failed-final]</p>
{body}
<p hidden data-next-flow><b>Next:</b> <a href="game.html">Five Letter</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
"""


def door_pages() -> None:
    write(
        Y / "index.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chrome habit — 2021</title>
<link rel="icon" href="../../favicon.gif" type="image/gif">
<base href="./">
</head>
<body>
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2021");</script>
<script src="../../js/lib/util.js?v=20260831ui"></script>
<script src="../../js/browser-core.js?v=20260831ui"></script>
<script src="../../js/config/2021.js?v=20260831ui"></script>
<script src="../../js/browser-2021.js?v=20260831ui"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages" / "home.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Welcome to the World Wide Web — 2021</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
<link rel="stylesheet" href="../../../ui/year/start.css">
</head>
<body class="itt-start-page" data-itt-start="1" bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div id="itt-year-start"></div>
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2021");</script>
<script src="../../../js/immersion-2021.js" defer></script>
<nav data-itt-pop3x="2021" class="itt-pop3x" style="margin:10px auto;padding:10px;background:#e3f2fd;border:1px dashed #1565c0;font-family:Arial,sans-serif;font-size:12px;max-width:52em">
<b>Leftover 3× · strip 1 · 9 doors</b> (not ATT · incomplete never writes):
 <a href="../sites/youtube/index.html">YouTube leftover</a> ·
 <a href="../sites/wikipedia/index.html">Wikipedia leftover</a> ·
 <a href="../sites/facebook/index.html">Facebook leftover</a> ·
 <a href="../sites/reddit21/index.html">reddit leftover</a> ·
 <a href="../sites/netflix21/index.html">Netflix leftover</a> ·
 <a href="../sites/twitter21/index.html">Twitter leftover</a> ·
 <a href="../sites/tiktok21/index.html">TikTok leftover</a> ·
 <a href="../sites/spotify21/index.html">Spotify leftover</a> ·
 <a href="../sites/twitch21/index.html">Twitch leftover</a>
</nav>
<nav data-itt-pop-more="2021" style="margin:10px auto;padding:10px;background:#fff8e1;border:1px dashed #ef6c00;font-family:Arial,sans-serif;font-size:12px;max-width:52em">
<b>Leftover more · strip 2 · 9 doors</b>:
 <a href="../sites/windows11/index.html">Win11 leftover</a> ·
 <a href="../sites/flash/index.html">Flash brick</a> ·
 <a href="../sites/chrome/index.html">Chrome habit</a> ·
 <a href="../sites/win365/index.html">Windows 365</a> ·
 <a href="../sites/android12/index.html">Android 12</a> ·
 <a href="../sites/pixel6/index.html">Pixel 6</a> ·
 <a href="../sites/edge21/index.html">Edge leftover</a> ·
 <a href="../sites/firefox91/index.html">Firefox 91</a> ·
 <a href="../sites/safari15/index.html">Safari 15</a>
</nav>
<nav data-itt-pop-3x3="2021" style="margin:10px auto;padding:10px;background:#f3e5f5;border:1px dashed #6a1b9a;font-family:Arial,sans-serif;font-size:12px;max-width:52em">
<b>Leftover 3×3 · strip 3 · 9 doors</b>:
 <a href="../sites/clubhouse/index.html">Clubhouse leftover</a> ·
 <a href="../sites/nft/index.html">NFT literacy</a> ·
 <a href="../sites/squid/index.html">Squid print</a> ·
 <a href="../sites/beeple/index.html">Beeple leftover</a> ·
 <a href="../sites/bayc/index.html">Bored Ape leftover</a> ·
 <a href="../sites/topshot/index.html">Top Shot leftover</a> ·
 <a href="../sites/opensea/index.html">OpenSea leftover</a> ·
 <a href="../sites/axie/index.html">Axie leftover</a> ·
 <a href="../sites/wordleseed/index.html">Wordle seed</a>
</nav>
</body>
</html>
""",
    )
    write(
        Y / "pages" / "about.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>About 2021 — dual scale · bans</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:640px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">Starting Point</a></p>
<h1>About 2021</h1>
<p><b>The phone asks first — Ask App Not to Track is the save, Allow is the trap, and there is no ChatGPT.</b></p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:12px">
<tr bgcolor="#bbdefb"><th>Cite</th><th>Number</th></tr>
<tr><td>Websites June (Live Stats)</td><td><b>table ends 2018</b> at <b>1,630,322,579</b>. <b>No June 2021 websites digit.</b></td></tr>
<tr><td>Netcraft January 2021 (labeled)</td><td><b>1,197,982,359</b> hostnames — <b>not</b> ILS June</td></tr>
<tr><td>Internet users (ITU 2021)</td><td><b>4.9 billion</b> / <b>63%</b> — labeled <b>ITU</b></td></tr>
</table>
<p>Never invent a June 2021 websites cell. Never blend January Netcraft with a fake June cell.</p>
<h2>Bans — not 2021 defaults</h2>
<ul>
<li>ChatGPT · GPT-4 · Wordle millions / NYT tiles</li>
<li>Meta consumer app · Allow as the save · Zoom-as-gold</li>
<li>Threads · X · Sora · GPT-4o</li>
<li>Log4Shell exploit / PoC · live mint / wallet / broker</li>
</ul>
<section style="margin:14px 0;padding:10px;border:1px dashed #666">
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I read that the Live Stats June table ends 2018 at 1,630,322,579 — Netcraft Jan 1,197,982,359 — ITU 4.9B / 63%.</label>
<label style="display:block"><input type="checkbox" data-req data-thesis-req> I know Allow never writes the star, and ChatGPT / Wordle millions / Zoom-as-gold are not 2021 defaults.</label>
<p><button type="button" data-itt-real-save data-storage-key="thesis-ack" data-min-req="2" data-requires="[data-thesis-req]">Save thesis literacy</button></p>
<p data-itt-real-status></p>
<p class="itt-popular-next" data-next-flow hidden><b>Next:</b> <a href="../sites/att/index.html">ATT Ask</a></p>
</section>
</div>
<script src="../../../js/immersion-2021.js"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages" / "map.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>2021 flow map</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:720px;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="home.html">← Starting Point</a> · <a href="about.html">About</a></p>
<h1>2021 UX flow map</h1>
<p>Allow is highlighted. Ask is the real click. <b>Star = ATT Ask App Not to Track</b>. Guided stays 6. Leftover 3× never steal the chip.</p>
<pre style="font-size:11px;background:#111;color:#90caf9;padding:10px;overflow:auto">
Starting Point
 ├─ Guided 6 …… About → ★ ATT → Signal → Copilot → Meta → this map
 ├─ Official 10 … ATT → Signal → Copilot → Meta → Win11 → Flash
 │                 → Chrome → Win10 → Facebook leftover → Five Letter
 ├─ Leftover 3× … 9 + 9 + 9 unique doors (not ATT)
 └─ Also ……… ≥36 live in-year exits after build-3x-links
</pre>
<h2>Official 10</h2>
<ol data-itt-ten-flows>
<li>★ <a href="../sites/att/index.html">ATT Ask</a> — Allow never writes.</li>
<li><a href="../sites/signal/index.html">Signal leftover</a></li>
<li><a href="../sites/copilot/index.html">Copilot waitlist</a></li>
<li><a href="../sites/meta/index.html">Meta rename</a></li>
<li><a href="../sites/windows11/index.html">Windows 11 leftover</a></li>
<li><a href="../sites/flash/index.html">Flash brick</a></li>
<li><a href="../sites/chrome/index.html">Chrome habit</a></li>
<li><a href="../sites/windows10/index.html">Windows 10 residual</a></li>
<li><a href="../sites/facebook/index.html">Facebook leftover</a></li>
<li><a href="../sites/playable/game.html">Five Letter</a></li>
</ol>
<h2>Leftover 3× strips</h2>
<p>Home lists 27 unique leftover doors. See Starting Point.</p>
</div>
<script src="../../../js/immersion-2021.js"></script>
<script src="../../../js/config/flow-maps-3x.js"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages" / "whats-new.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>What's new — 2021</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="home.html">Starting Point</a></p>
<h1>What's new leftover — 2021</h1>
<p>ATT Ask is the chip. ChatGPT is next year. Allow never writes.</p>
</div>
<script src="../../../js/immersion-2021.js"></script>
</body>
</html>
""",
    )
    write(
        Y / "pages" / "cool.html",
        """<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>Cool leftover — 2021</title>
<link rel="stylesheet" href="../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div style="max-width:46em;margin:16px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<p><a href="home.html">Starting Point</a></p>
<h1>Cool leftover — 2021</h1>
<p>Not the chip.</p>
</div>
<script src="../../../js/immersion-2021.js"></script>
</body>
</html>
""",
    )
    for name, title in (("404", "404 — 2021"), ("unreachable", "Unreachable — 2021")):
        write(
            Y / "pages" / "error" / f"{name}.html",
            f"""<!DOCTYPE html>
<html lang="en" data-itt-year="2021">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="stylesheet" href="../../../../css/period-2021.css">
</head>
<body bgcolor="#f2f2f2">
<div style="max-width:480px;margin:24px auto;font-family:Segoe UI,Arial,sans-serif;font-size:13px">
<h1>{name}</h1>
<p>That room is not on the 2021 door.</p>
<p><a href="../home.html">Starting Point</a> · <a href="../../sites/att/index.html">ATT Ask</a></p>
</div>
<script src="../../../../js/immersion-2021.js"></script>
</body>
</html>
""",
        )


def patch_config(slugs: list[str]) -> None:
    cfg = ROOT / "js" / "config" / "2021.js"
    rooms = [
        "pages/home.html",
        "pages/about.html",
        "pages/map.html",
        "pages/whats-new.html",
        "pages/cool.html",
        "pages/error/404.html",
        "pages/error/unreachable.html",
        "sites/att/index.html",
        "sites/att/about.html",
        "sites/playable/game.html",
        "sites/playable/famous.html",
        "sites/playable/index.html",
    ]
    for sl in slugs:
        rooms.append(f"sites/{sl}/index.html")
        rooms.append(f"sites/{sl}/about.html")
    for extra in ("extra-a", "extra-b", "extra-c", "extra-d", "extra-e", "extra-f", "extra-g", "extra-h", "extra-i", "more-a", "more-b", "more-c", "more-d"):
        rooms.append(f"sites/playable/{extra}.html")
    seen = []
    for r in rooms:
        if r not in seen:
            seen.append(r)
    text = cfg.read_text(encoding="utf-8")
    start = text.index("  var rooms = [")
    end = text.index("  ];", start) + 4
    body = "  var rooms = [\n" + ",\n".join(f'    "{r}"' for r in seen) + "\n  ];"
    cfg.write_text(text[:start] + body + text[end:], encoding="utf-8")


def main() -> None:
    seen: set[str] = set()
    uniq: list[tuple[str, str, str, str, str]] = []
    for row in DESTS:
        if row[0] in seen:
            continue
        seen.add(row[0])
        uniq.append(row)

    door_pages()
    write(Y / "sites" / "att" / "index.html", att_html())
    write(Y / "sites" / "att" / "about.html", about_html("att", "ATT Ask"))

    for slug, title, life, nxt, pop in uniq:
        if slug in SPECIAL:
            write(Y / "sites" / slug / "index.html", SPECIAL[slug]())
        else:
            write(Y / "sites" / slug / "index.html", leftover_html(slug, title, life, nxt, pop))
        write(Y / "sites" / slug / "about.html", about_html(slug, title))

    write(Y / "sites" / "playable" / "game.html", game_html())
    write(Y / "sites" / "playable" / "index.html", playable_extra("index", "2021 playables"))
    write(Y / "sites" / "playable" / "famous.html", playable_extra("famous", "Famous leftover"))
    for extra in ("extra-a", "extra-b", "extra-c", "extra-d", "extra-e", "extra-f", "extra-g", "extra-h", "extra-i", "more-a", "more-b", "more-c", "more-d"):
        write(Y / "sites" / "playable" / f"{extra}.html", playable_extra(extra, extra))

    patch_config([r[0] for r in uniq])
    dest_n = sum(1 for p in (Y / "sites").iterdir() if p.is_dir())
    html_n = sum(1 for _ in Y.rglob("*.html"))
    print(f"2021 dests={dest_n} html={html_n} leftover_slugs={len(uniq)}")


if __name__ == "__main__":
    main()
