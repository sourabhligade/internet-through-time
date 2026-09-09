#!/usr/bin/env python3
"""CUT-3X-2X-2015-2020 — paint leftover-3× second pack. No new dest folders."""
from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
MARK = "ITT-POP3X-2X"

DOORS = {
    "2015": [
        ("facebook", "facebook", "itt15-pop-facebook", "1B people in a day leftover", "Reactions 2016 as 2015 (trap)", "../youtube/index.html", "YouTube leftover"),
        ("youtube", "youtube", "itt15-pop-youtube", "YouTube Red leftover", "Shorts / Reels as 2015 (trap)", "../hbonow/index.html", "HBO Now leftover"),
        ("hbonow", "hbonow", "itt15-pop-hbonow", "HBO Now $14.99 leftover", "HBO Max 2020 as 2015 (trap)", "../slack/index.html", "Slack leftover"),
        ("slack", "slack", "itt15-pop-slack", "Slack $2.8B 16 Apr leftover", "2014 launch / 2019 IPO as 2015 (trap)", "../waweb/index.html", "WhatsApp Web leftover"),
        ("waweb", "waweb", "itt15-pop-waweb", "WhatsApp Web QR leftover", "iOS Web as 2015 (trap)", "../agario/index.html", "Agar.io leftover"),
        ("agario", "agario", "itt15-pop-agario", "Agar.io site leftover", "slither.io 2016 as 2015 (trap)", "../adblock/index.html", "Content blocker leftover"),
        ("adblock", "pop3-adblock", "itt15-pop3-adblock", "iOS 9 blocker leftover", "desktop uBlock as 2015 (trap)", "../ytgaming/index.html", "YouTube Gaming leftover"),
        ("ytgaming", "pop3-ytgaming", "itt15-pop3-ytgaming", "YouTube Gaming leftover", "Twitch as this dest (trap)", "../instant/index.html", "Instant Articles leftover"),
        ("instant", "pop3-instant", "itt15-pop3-instant", "Instant Articles leftover", "AMP as Instant Articles (trap)", "../../pages/home.html", "Starting Point"),
    ],
    "2016": [
        ("alphago", "alphago", "itt16-pop-alphago", "AlphaGo 4–1 leftover", "2017 rematch as 2016 (trap)", "../linkedinms/index.html", "LinkedIn leftover"),
        ("linkedinms", "linkedinms", "itt16-pop-linkedinms", "MS/LinkedIn $26.2B leftover", "2011 IPO as 2016 (trap)", "../dyn/index.html", "Dyn leftover"),
        ("dyn", "dyn", "itt16-pop-dyn", "Dyn 21 Oct leftover", "live outage / 2020 as 2016 (trap)", "../jio/index.html", "Jio leftover"),
        ("jio", "jio", "itt16-pop-jio", "Jio 5 Sep leftover", "2017 100M as 2016 (trap)", "../assistant/index.html", "Assistant leftover"),
        ("assistant", "assistant", "itt16-pop-assistant", "Google Assistant leftover", "Alexa / HomePod 2018 as 2016 (trap)", "../houseparty/index.html", "Houseparty leftover"),
        ("houseparty", "houseparty", "itt16-pop-houseparty", "Houseparty leftover", "2020 lockdown as 2016 (trap)", "../../pages/home.html", "Starting Point"),
    ],
    "2017": [
        ("hqtrivia", "hqtrivia", "itt17-pop-hqtrivia", "HQ Trivia leftover", "2018 death as 2017 gold (trap)", "../pubgnote/index.html", "PUBG leftover"),
        ("pubgnote", "pubgnote", "itt17-pop-pubgnote", "PUBG leftover", "Fortnite as this dest (trap)", "../facebook2b/index.html", "Facebook 2B leftover"),
        ("facebook2b", "facebook2b", "itt17-pop-facebook2b", "Facebook 2B leftover", "2012 1B / Meta as 2017 (trap)", "../youtubetv/index.html", "YouTube TV leftover"),
        ("youtubetv", "youtubetv", "itt17-pop-youtubetv", "YouTube TV $35 leftover", "YouTube Red as this (trap)", "../notpetya/index.html", "NotPetya leftover"),
        ("notpetya", "notpetya", "itt17-pop-notpetya", "NotPetya leftover", "WannaCry as this dest (trap)", "../nnrepeal/index.html", "Title II repeal leftover"),
        ("nnrepeal", "nnrepeal", "itt17-pop-nnrepeal", "Title II repeal leftover", "2015 Title II vote as this (trap)", "../yahoo3b/index.html", "Yahoo 3B leftover"),
        ("yahoo3b", "pop3-yahoo3b", "itt17-pop3-yahoo3b", "Yahoo 3B leftover", "2013 disclose as this (trap)", "../iphone8/index.html", "iPhone 8 leftover"),
        ("iphone8", "pop3-iphone8", "itt17-pop3-iphone8", "iPhone 8 leftover", "Face ID / X as this dest (trap)", "../pixel2/index.html", "Pixel 2 leftover"),
        ("pixel2", "pop3-pixel2", "itt17-pop3-pixel2", "Pixel 2 leftover", "iPhone X as this dest (trap)", "../../pages/home.html", "Starting Point"),
    ],
    "2019": [
        ("gplus", "gplus", "itt19-pop-gplus", "Google+ dies leftover", "2011 Hangout as this (trap)", "../inbox/index.html", "Inbox leftover"),
        ("inbox", "inbox", "itt19-pop-inbox", "Inbox off leftover", "Gmail / 2014 launch as 2019 (trap)", "../cnil/index.html", "CNIL leftover"),
        ("cnil", "cnil", "itt19-pop-cnil", "CNIL €50M leftover", "GDPR 2018 as 2019 gold (trap)", "../fortnitewc/index.html", "Fortnite World Cup leftover"),
        ("fortnitewc", "fortnitewc", "itt19-pop-fortnitewc", "Fortnite World Cup leftover", "2017 BR / Travis Scott 2020 as 2019 (trap)", "../oculusquest/index.html", "Oculus Quest leftover"),
        ("oculusquest", "oculusquest", "itt19-pop-oculusquest", "Oculus Quest leftover", "CV1 2016 / Quest 2 2020 as 2019 (trap)", "../libra/index.html", "Libra leftover"),
        ("libra", "libra", "itt19-pop-libra", "Libra leftover", "Diem 2020 as 2019 (trap)", "../slack/index.html", "Slack leftover"),
        ("slack", "pop3-slack", "itt19-pop3-slack", "Slack IPO 20 Jun leftover", "2014 launch / 2015 $2.8B as this (trap)", "../huawei/index.html", "Huawei leftover"),
        ("huawei", "pop3-huawei", "itt19-pop3-huawei", "Huawei Entity List leftover", "2020 ban as 2019 (trap)", "../area51/index.html", "Area 51 leftover"),
        ("area51", "pop3-area51", "itt19-pop3-area51", "Storm Area 51 leftover", "2020 as this / live raid (trap)", "../../pages/home.html", "Starting Point"),
    ],
}

STARS = {
    "2015": "Periscope",
    "2016": "Stories",
    "2017": "Face ID",
    "2019": "Disney+",
}

HOME = {
    "2015": [
        ("a", "facebook", "Facebook leftover", "youtube", "YouTube leftover", "hbonow", "HBO Now leftover"),
        ("b", "slack", "Slack leftover", "waweb", "WhatsApp Web leftover", "agario", "Agar.io leftover"),
        ("c", "adblock", "iOS 9 blockers leftover", "ytgaming", "YouTube Gaming leftover", "instant", "Instant Articles leftover"),
    ],
    "2016": [
        ("a", "alphago", "AlphaGo leftover", "linkedinms", "LinkedIn leftover", "dyn", "Dyn leftover"),
        ("b", "jio", "Jio leftover", "assistant", "Assistant leftover", "houseparty", "Houseparty leftover"),
    ],
    "2017": [
        ("a", "hqtrivia", "HQ Trivia leftover", "pubgnote", "PUBG leftover", "facebook2b", "Facebook 2B leftover"),
        ("b", "youtubetv", "YouTube TV leftover", "notpetya", "NotPetya leftover", "nnrepeal", "Title II repeal leftover"),
        ("c", "yahoo3b", "Yahoo 3B leftover", "iphone8", "iPhone 8 leftover", "pixel2", "Pixel 2 leftover"),
    ],
    "2019": [
        ("a", "gplus", "Google+ leftover", "inbox", "Inbox leftover", "cnil", "CNIL leftover"),
        ("b", "fortnitewc", "Fortnite World Cup leftover", "oculusquest", "Oculus Quest leftover", "libra", "Libra leftover"),
        ("c", "slack", "Slack IPO leftover", "huawei", "Huawei leftover", "area51", "Area 51 leftover"),
    ],
}

MAP_ITEMS = {
    "2015": [
        ('facebook/index.html', "Facebook leftover", "1B people in a day · Reactions are 2016", "itt15-pop-facebook", "YouTube leftover"),
        ('youtube/index.html', "YouTube leftover", "YouTube Red $9.99 · not Shorts", "itt15-pop-youtube", "HBO Now leftover"),
        ('hbonow/index.html', "HBO Now leftover", "$14.99 · 7 Apr · Max is 2020", "itt15-pop-hbonow", "Slack leftover"),
        ('slack/index.html', "Slack leftover", "$2.8B 16 Apr · not 2019 IPO", "itt15-pop-slack", "WhatsApp Web leftover"),
        ('waweb/index.html', "WhatsApp Web leftover", "21 Jan · QR · not iOS", "itt15-pop-waweb", "Agar.io leftover"),
        ('agario/index.html', "Agar.io leftover", "#1 trending US game · not slither", "itt15-pop-agario", "Content blocker leftover"),
        ('adblock/index.html', "Content blocker leftover", "iOS 9 16 Sep · Peace / Purify", "itt15-pop3-adblock", "YouTube Gaming leftover"),
        ('ytgaming/index.html', "YouTube Gaming leftover", "26 Aug · not Twitch dest", "itt15-pop3-ytgaming", "Instant Articles leftover"),
        ('instant/index.html', "Instant Articles leftover", "12–13 May · not AMP", "itt15-pop3-instant", "Starting Point"),
    ],
    "2016": [
        ('alphago/index.html', "AlphaGo leftover", "Lee Sedol 4–1 · not 2017 rematch", "itt16-pop-alphago", "LinkedIn leftover"),
        ('linkedinms/index.html', "LinkedIn leftover", "$26.2B 13 Jun · not 2011 IPO", "itt16-pop-linkedinms", "Dyn leftover"),
        ('dyn/index.html', "Dyn leftover", "21 Oct Mirai · literacy only", "itt16-pop-dyn", "Jio leftover"),
        ('jio/index.html', "Jio leftover", "5 Sep cheap 4G · not 2017 100M", "itt16-pop-jio", "Assistant leftover"),
        ('assistant/index.html', "Assistant leftover", "I/O 18 May · Pixel 4 Oct", "itt16-pop-assistant", "Houseparty leftover"),
        ('houseparty/index.html', "Houseparty leftover", "Feb–Dec 2016 · 2020 is the trap", "itt16-pop-houseparty", "Starting Point"),
    ],
    "2017": [
        ('hqtrivia/index.html', "HQ Trivia leftover", "Vine founders · 730k Christmas", "itt17-pop-hqtrivia", "PUBG leftover"),
        ('pubgnote/index.html', "PUBG leftover", "23 Mar EA · 21 Dec 1.0 · not Fortnite", "itt17-pop-pubgnote", "Facebook 2B leftover"),
        ('facebook2b/index.html', "Facebook 2B leftover", "27 Jun 2B MAU · not 2012 1B", "itt17-pop-facebook2b", "YouTube TV leftover"),
        ('youtubetv/index.html', "YouTube TV leftover", "$35 · 5 Apr · five cities", "itt17-pop-youtubetv", "NotPetya leftover"),
        ('notpetya/index.html', "NotPetya leftover", "27 Jun · not WannaCry dest", "itt17-pop-notpetya", "Title II repeal leftover"),
        ('nnrepeal/index.html', "Title II repeal leftover", "14 Dec Pai · not 2015 vote-in", "itt17-pop-nnrepeal", "Yahoo 3B leftover"),
        ('yahoo3b/index.html', "Yahoo 3B leftover", "3 Oct all 3B accounts", "itt17-pop3-yahoo3b", "iPhone 8 leftover"),
        ('iphone8/index.html', "iPhone 8 leftover", "22 Sep · not Face ID / X", "itt17-pop3-iphone8", "Pixel 2 leftover"),
        ('pixel2/index.html', "Pixel 2 leftover", "4 Oct · not iPhone X", "itt17-pop3-pixel2", "Starting Point"),
    ],
    "2019": [
        ('gplus/index.html', "Google+ leftover", "consumer dies 2 Apr", "itt19-pop-gplus", "Inbox leftover"),
        ('inbox/index.html', "Inbox leftover", "off 2 Apr · not Gmail gold", "itt19-pop-inbox", "CNIL leftover"),
        ('cnil/index.html', "CNIL leftover", "€50M 21 Jan · not GDPR 2018 dest", "itt19-pop-cnil", "Fortnite World Cup leftover"),
        ('fortnitewc/index.html', "Fortnite World Cup leftover", "Jul 2019 · not 2017 BR", "itt19-pop-fortnitewc", "Oculus Quest leftover"),
        ('oculusquest/index.html', "Oculus Quest leftover", "21 May $399 · not CV1", "itt19-pop-oculusquest", "Libra leftover"),
        ('libra/index.html', "Libra leftover", "18 Jun white paper · not Diem", "itt19-pop-libra", "Slack leftover"),
        ('slack/index.html', "Slack leftover", "20 Jun WORK listing · not 2014/2015", "itt19-pop3-slack", "Huawei leftover"),
        ('huawei/index.html', "Huawei leftover", "Entity List 15 May", "itt19-pop3-huawei", "Area 51 leftover"),
        ('area51/index.html', "Area 51 leftover", "Facebook event Jun–Sep", "itt19-pop3-area51", "Starting Point"),
    ],
}


# Year-true dest-minute weather + extra honesty tick + verb. Keyed (year, dest).
DETAIL = {
    ("2015", "facebook"): {
        "weather": "24 Aug 2015 Zuckerberg posted that one billion people used Facebook in a single day. Q3 print: 1.55B MAU. Reactions worldwide are 24 Feb 2016. Open leftover 2015 feed. Not a second star. Never print 2012 1B MAU as this dest.",
        "tick": "Reactions worldwide are 24 Feb 2016. Like is leftover weather. Never write gold.",
        "verb": "Open leftover 2015 feed",
    },
    ("2015", "youtube"): {
        "weather": "comScore June 2015 desktop video: Google/YouTube 172.7M uniques. YouTube Red announced 21 Oct 2015, $9.99, live 28 Oct. This dest is the 2015 watch page, not Shorts, not YouTube Gaming (that is the next pop3 dest).",
        "tick": "Red is 2015 leftover weather. Shorts / Reels / 2020 YT Gaming close are not 2015 gold.",
        "verb": "Watch leftover",
    },
    ("2015", "hbonow"): {
        "weather": "Announced 9 Mar 2015 at the Apple event. Live 7 Apr 2015, $14.99, Apple exclusive three months, timed to Game of Thrones S5 (12 Apr). First premium-cable stand-alone stream. HBO Max is 2020. HBO Go is authenticated cable — not this dest.",
        "tick": "HBO Max / Max is 2020. No live bill. $14.99 leftover weather.",
        "verb": "Start leftover Now",
    },
    ("2015", "slack"): {
        "weather": "Public launch was Feb 2014. The 2015 beat is 16 Apr Series E: $160M at $2.8B, 750k daily, 200k paid seats. 2019 dest is the IPO. Do not print 2019 WORK as 2015. Leftover-2× sl-lx may stay dest-true leftover.",
        "tick": "2014 public launch is not this gold. 2019 IPO is the 2019 dest. Teams is not 2015.",
        "verb": "Open leftover workspace",
    },
    ("2015", "waweb"): {
        "weather": "21 Jan 2015. web.whatsapp.com. QR pair. Phone must stay on. Chrome. Not iOS (Apple platform limitations). 700M mobile users that week. Not the 2014 Install gold (itt14-wa-install).",
        "tick": "Phone stays on. iOS Web is not 2015. Never write itt14-wa-install.",
        "verb": "Scan leftover QR",
    },
    ("2015", "agario"): {
        "weather": "Browser hit April 2015. Google Year in Search: #1 trending US game, #7 US trending overall. Official year game is Blob Rush. This dest is the site habit, not a second year game. slither.io is Mar 2016.",
        "tick": "Not Blob Rush gold. slither.io is 2016. Never write itt15-game-blobrush.",
        "verb": "Open leftover agar.io",
    },
    ("2015", "adblock"): {
        "weather": "iOS 9 16 Sep 2015 Safari content blockers. Peace / Purify / Crystal #1 paid App Store the next day. NYT backlash 18 Sep. Use this dest, not ios9/ (no index; blockers.html is a peek).",
        "tick": "Desktop uBlock is not this. iOS 10 is not 2015. Settings is leftover weather, not gold.",
        "verb": "Enable leftover blocker",
    },
    ("2015", "ytgaming"): {
        "weather": "Live 26 Aug 2015. gaming.youtube.com + US/UK apps. Twitch counter after Amazon’s $970M. YouTube watch leftover is the other dest. This dest is Gaming leftover.",
        "tick": "Twitch is not this dest. 2020 YT Gaming close is not 2015. Never write itt15-pop-youtube.",
        "verb": "Open leftover Gaming",
    },
    ("2015", "instant"): {
        "weather": "12–13 May 2015. Loads inside the Facebook iPhone app. Launch partners NYT / BuzzFeed / NatGeo / NBC / Atlantic. AMP is a different dest (amppage/, THIN). Instant Search is 2010.",
        "tick": "AMP is not Instant Articles. Instant Search 2010 is not this. 2016 open-to-all is not 2015 gold.",
        "verb": "Open leftover Instant Article",
    },
    ("2016", "alphago"): {
        "weather": "Lee Sedol, Seoul, 9–15 Mar 2016, 4–1. ~200M watched. Move 37. 2017 Ke Jie rematch is the trap. Watch leftover match weather. Never write Stories or Reactions gold.",
        "tick": "2017 rematch is not this. No live match charge. Never write itt16-ig-stories or itt16-fb-react.",
        "verb": "Watch leftover match weather",
    },
    ("2016", "linkedinms"): {
        "weather": "Microsoft acquires LinkedIn 13 Jun 2016, $26.2B / $196 a share. Largest MS deal then. Close 8 Dec. 2011 IPO is a different dest/year.",
        "tick": "2011 IPO is not this. June announce is not the December close.",
        "verb": "Open leftover LinkedIn",
    },
    ("2016", "dyn"): {
        "weather": "Dyn Managed DNS DDoS 21 Oct 2016. Mirai IoT botnet. Twitter / Spotify / Reddit / NYT hard to reach. Literacy only. Never write official Win10-end gold. No click-to-take-down.",
        "tick": "Literacy only. Never write itt16-win10-end. No live outage / 2020 as this.",
        "verb": "Read leftover literacy",
    },
    ("2016", "jio"): {
        "weather": "Reliance Jio commercial 5 Sep 2016. Free voice for life. Welcome Offer free to 31 Dec. World’s cheapest data. 16M in first month. 2017 100M is the trap. Never write Stories gold.",
        "tick": "2017 100M is not 2016 launch. No live SIM charge. Never write itt16-ig-stories.",
        "verb": "Open leftover Jio",
    },
    ("2016", "assistant"): {
        "weather": "Google Assistant unveiled I/O 18 May 2016. First phone with it baked in: Pixel 4 Oct 2016. Dest is Assistant leftover, not iPhone 7 gold. Alexa is the trap. HomePod is 2018. Gemini is not 2016.",
        "tick": "Alexa is not this. HomePod is 2018. Gemini is not 2016. Never write itt16-iphone7.",
        "verb": "Ask leftover Assistant",
    },
    ("2016", "houseparty"): {
        "weather": "Life On Air after Meerkat. Feb 2016 stealth. App Store social #1 / #2 May. Public 28 Sep. Sequoia ~$50M Dec. 1M people / 20M minutes (Nov). 2020 lockdown mass is the trap. Next goes home — 2016 Inbox is DROP.",
        "tick": "2020 lockdown mass is not 2016 gold. FaceTime is not this. No door 16.",
        "verb": "Drop in leftover party",
    },
    ("2017", "hqtrivia"): {
        "weather": "Vine founders. Late Aug / covered 17 Oct 2017. Christmas Day 730k concurrent. Million-player peak is early 2018 — trap, not a drop. Never write Face ID gold.",
        "tick": "2018 death / 2020 shutdown is not 2017 gold. Million-player is not 2017 gold. Never write itt17-faceid.",
        "verb": "Play leftover HQ",
    },
    ("2017", "pubgnote"): {
        "weather": "Steam Early Access 23 Mar 2017. 1.0 21 Dec 2017. The 2017 battle-royale year-beat on PC. Fortnite BR is official n=2 and leftover-3× pop3 already. Chicken dinner leftover weather.",
        "tick": "Fortnite is not this dest. 2018 PUBG mobile is not 2017. Never write itt17-fortnite or itt17-pop3-fortnite.",
        "verb": "Open leftover PUBG",
    },
    ("2017", "facebook2b"): {
        "weather": "2 billion MAU 27 Jun 2017. Zuckerberg post. Doubled since Oct 2012 1B. Dest is the 2B leftover, not the feed as gold. Meta is not 2017.",
        "tick": "2012 1B is not this. Meta is not 2017.",
        "verb": "Open leftover 2B weather",
    },
    ("2017", "youtubetv"): {
        "weather": "Live 5 Apr 2017, $35, five cities (NY / LA / SF / Chicago / Philly). Skinny live bundle. YouTube Red is 2015 leftover weather on the 2015 YouTube dest.",
        "tick": "YouTube Red is not this. 2020 price is not 2017. No live bill. $35 leftover weather.",
        "verb": "Start leftover YouTube TV",
    },
    ("2017", "notpetya"): {
        "weather": "27 Jun 2017. Maersk / Merck / FedEx TNT. WannaCry is official n=7 — different worm, different dest. Literacy only. No live encrypt.",
        "tick": "WannaCry is not this dest. Never write itt17-wannacry. No live encrypt.",
        "verb": "Read leftover literacy",
    },
    ("2017", "nnrepeal"): {
        "weather": "FCC repeals Title II 14 Dec 2017, 3–2 (Pai). 2015 Title II dest is the vote in. This dest is the vote out.",
        "tick": "2015 Title II vote-in is not this. 2018 is not 2017.",
        "verb": "Read leftover repeal literacy",
    },
    ("2017", "yahoo3b"): {
        "weather": "Verizon / Yahoo 3 Oct 2017: 2013 breach hit all 3 billion accounts, not 1B. Dest title names 3 billion. Literacy only. No live dump.",
        "tick": "2013/2014 disclose-as-this is the trap. No live dump.",
        "verb": "Read leftover 3B literacy",
    },
    ("2017", "iphone8"): {
        "weather": "Ships 22 Sep 2017. Home button leftover. Google Year in Search #1 technology 2017. Official n=1 is Face ID / iphone/x.html. Dest trap already names Face ID as the chip on the X dest.",
        "tick": "Face ID / X is not this dest. iPhone XS 2018 is not 2017. Never write itt17-faceid.",
        "verb": "Open leftover 8",
    },
    ("2017", "pixel2"): {
        "weather": "Pixel 2 / Pixel 2 XL 4 Oct 2017. Portrait / Pixel Visual Core. Different company from official X. Pixel 3 is not 2017.",
        "tick": "iPhone X is not this dest. Pixel 3 is not 2017.",
        "verb": "Open leftover Pixel 2",
    },
    ("2019", "gplus"): {
        "weather": "Consumer Google+ sunset 2 Apr 2019. Content delete begins that morning. Dest title names the date. 2011 Hangouts is the trap. Gmail does not die. Never write Disney+ gold.",
        "tick": "2011 Hangout is not this. Gmail does not die as this. Never write itt19-disneyplus.",
        "verb": "Open leftover G+",
    },
    ("2019", "inbox"): {
        "weather": "Inbox by Gmail off 2 Apr 2019, same morning as consumer G+. Announced 12 Sep 2018 for end of March; in-app notice locked April 2. 2014 launch is the trap. Gmail stays.",
        "tick": "Gmail is not this. 2014 launch is not 2019 gold.",
        "verb": "Open leftover Inbox",
    },
    ("2019", "cnil"): {
        "weather": "CNIL €50M GDPR fine on Google 21 Jan 2019. First big-tech GDPR fine. Dest title names the date and €50M. Not an unboard of 2018 GDPR. No live fine.",
        "tick": "GDPR 25 May 2018 is not 2019 gold. No live fine.",
        "verb": "Read leftover €50M literacy",
    },
    ("2019", "fortnitewc"): {
        "weather": "Finals 26–28 Jul 2019, Arthur Ashe. $30M. Bugha wins. Today’s leftover-3× door 5 is Fortnite leftover, not the Cup. Travis Scott is 2020. Never write today’s fortnite pop key.",
        "tick": "2017 BR is not this. Travis Scott 2020 is not 2019. Never write itt19-pop-fortnite.",
        "verb": "Open leftover World Cup",
    },
    ("2019", "oculusquest"): {
        "weather": "Quest 21 May 2019, $399, no PC. CV1 is 2016. Quest 2 is 2020. Pair leftover Quest. $399 leftover weather. No live charge.",
        "tick": "CV1 2016 is not this. Quest 2 2020 is not 2019. No live charge.",
        "verb": "Pair leftover Quest",
    },
    ("2019", "libra"): {
        "weather": "Facebook Libra white paper 18 Jun 2019. Dest title names the date. Diem rename is 2020. No live coin.",
        "tick": "Diem 2020 rename is not this. No live coin.",
        "verb": "Read leftover white paper weather",
    },
    ("2019", "slack"): {
        "weather": "Slack IPO is 20 Jun 2019 leftover weather. Direct listing, ticker WORK, close ~$19.5B. 2014 launch / 2015 $2.8B are other years. Leftover-2× sl-lx may still trap IPO-as-gold; this 3× panel does not.",
        "tick": "2014 launch / 2015 $2.8B is not this. Never write itt15-pop-slack.",
        "verb": "Open leftover workspace",
    },
    ("2019", "huawei"): {
        "weather": "Commerce Department Entity List 15–16 May 2019. Google / Android services cut. 2020 ban / Harmony is the trap.",
        "tick": "2020 ban / Harmony is not this.",
        "verb": "Read leftover Entity List literacy",
    },
    ("2019", "area51"): {
        "weather": "Facebook event 27 Jun 2019. 2M+ going. 20 Sep gathering. The 2019 website people opened. In Google’s 2019 search set. Meme leftover weather. Next goes home — zoom10m is DROP.",
        "tick": "2020 is not this. Live raid is not gold. Never write a 2020 key.",
        "verb": "Open leftover event",
    },
}


def pop_block(year: str, dest: str, pop_id: str, key: str, keep: str, trap: str, next_href: str, next_label: str) -> str:
    star = STARS[year]
    key_attr = f' data-pop-key="{pop_id}"' if pop_id.startswith("pop3-") else ""
    d = DETAIL[(year, dest)]
    return f"""<!-- {MARK}:{dest}:start -->
<div class="itt-pop3x-flow" data-pop-panel="1">
<p><b>{keep}</b> · leftover 3× 2× · {star} is the chip · incomplete never writes · <code>{key}</code></p>
<p>{d["weather"]}</p>
<p>
 <button type="button" data-pop-pick="keep" data-pop-q="{keep}">{keep}</button>
 <button type="button" data-pop-pick="trap" data-pop-trap="1">{trap}</button>
</p>
<p><label>Caption <input type="text" data-pop-field placeholder="{keep}" size="28" maxlength="80"></label></p>
<label><input type="checkbox" data-pop-req> {year} leftover. {star} is the chip. Empty never writes.</label>
<label><input type="checkbox" data-pop-req> {d["tick"]}</label>
<p><button type="button" data-pop-go data-pop-id="{pop_id}"{key_attr}>{d["verb"]}</button> <span data-pop-status></span></p>
<p hidden data-next-flow data-next-when-key="{key}"><b>Next:</b> <a href="{next_href}">{next_label}</a></p>
</div>
<!-- {MARK}:{dest}:end -->
"""


def strip_html(year: str, letter: str, a: str, al: str, b: str, bl: str, c: str, cl: str) -> str:
    return (
        f'<nav data-itt-pop-2x-{letter}="{year}" class="itt-pop-2x-{letter}" '
        f'style="margin:10px auto;padding:10px;background:#e8f5e9;border:1px dashed #2e7d32;'
        f'font-family:Arial,sans-serif;font-size:12px;max-width:52em">'
        f'<b>Leftover 3× 2× · strip {letter}</b> (not the chip · not today’s nine) · '
        f'<a href="../sites/{a}/index.html">{al}</a> · '
        f'<a href="../sites/{b}/index.html">{bl}</a> · '
        f'<a href="../sites/{c}/index.html">{cl}</a>'
        f"</nav>"
    )


def unescape_js_string(s: str) -> str:
    out = []
    i = 0
    while i < len(s):
        if s[i] == "\\" and i + 1 < len(s):
            n = s[i + 1]
            out.append({"n": "\n", '"': '"', "\\": "\\"}.get(n, n))
            i += 2
            continue
        out.append(s[i])
        i += 1
    return "".join(out)


def escape_js_string(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def extract_year_string(text: str, year: str) -> tuple[int, int, str]:
    m = re.search(r'\n  "' + year + r'": "', text)
    if not m:
        raise SystemExit(f"year {year} missing in start-extra.js")
    start = m.end()
    i = start
    raw = []
    while i < len(text):
        c = text[i]
        if c == "\\" and i + 1 < len(text):
            raw.append(text[i : i + 2])
            i += 2
            continue
        if c == '"':
            return m.start() + len(f'\n  "{year}": "'), i, unescape_js_string("".join(raw))
        raw.append(c)
        i += 1
    raise SystemExit(f"unterminated {year}")


def paint_home():
    path = ROOT / "ui/year/start-extra.js"
    text = path.read_text(encoding="utf-8")
    for year, strips in HOME.items():
        abs_start, abs_end, html = extract_year_string(text, year)
        # idempotent: drop previous 2x navs
        html = re.sub(
            rf'\n?<nav data-itt-pop-2x-[abc]="{year}"[\s\S]*?</nav>',
            "",
            html,
        )
        block = "\n".join(strip_html(year, *row) for row in strips)
        needle = f'data-itt-pop-3x3="{year}"'
        idx = html.rfind(needle)
        if idx < 0:
            raise SystemExit(f"no pop-3x3 nav for {year}")
        close = html.find("</nav>", idx)
        if close < 0:
            raise SystemExit(f"no </nav> after pop-3x3 for {year}")
        insert_at = close + len("</nav>")
        html = html[:insert_at] + "\n" + block + html[insert_at:]
        # rebuild escaped year string in file
        prefix = text[: text.find(f'\n  "{year}": "') + len(f'\n  "{year}": "')]
        # re-extract bounds on current text
        start, end, _ = extract_year_string(text, year)
        text = text[:start] + escape_js_string(html) + text[end:]
    path.write_text(text, encoding="utf-8")
    print("home strips painted")


def paint_dests():
    n = 0
    for year, doors in DOORS.items():
        for dest, pop_id, key, keep, trap, nxt, nxt_l in doors:
            p = ROOT / "years" / year / "sites" / dest / "index.html"
            if not p.exists():
                raise SystemExit(f"missing dest {p}")
            html = p.read_text(encoding="utf-8")
            html = re.sub(rf"<!-- {MARK}:{dest}:start -->[\s\S]*?<!-- {MARK}:{dest}:end -->\n?", "", html)
            block = pop_block(year, dest, pop_id, key, keep, trap, nxt, nxt_l)
            m = re.search(rf'<script src="[^"]*immersion-{year}\.js"></script>', html)
            if m:
                html = html[: m.start()] + block + html[m.start() :]
            else:
                html = html.replace("</body>", block + "</body>")
            p.write_text(html, encoding="utf-8")
            n += 1
    print(f"dest writers {n}")


def paint_maps():
    for year, items in MAP_ITEMS.items():
        p = ROOT / "years" / year / "pages" / "map.html"
        html = p.read_text(encoding="utf-8")
        html = re.sub(rf"<!-- {MARK}:start -->[\s\S]*?<!-- {MARK}:end -->\n?", "", html)
        lis = []
        for href, name, why, key, nxt in items:
            lis.append(
                f' <li><a href="../sites/{href}">{name}</a> — {why} → <code>{key}</code> → {nxt}</li>'
            )
        extra = (
            f"<!-- {MARK}:start -->\n"
            f"<h2>Leftover 3× 2× — not the chip</h2>\n"
            f'<p data-itt-pop-2x-a="{year}">Pick a row → tick honesty → go. Empty / trap / 0 ticks never write. Leftover complete never writes gold.</p>\n'
            f"<ol>\n" + "\n".join(lis) + "\n</ol>\n"
            f"<!-- {MARK}:end -->\n"
        )
        # insert before leftover 3× closing of first ol after leftover heading, or before last script
        if "Leftover 3× — not the chip" in html:
            # after existing leftover ol
            pos = html.find("Leftover 3× — not the chip")
            ol = html.find("</ol>", pos)
            html = html[: ol + 5] + "\n" + extra + html[ol + 5 :]
        else:
            html = html.replace("</div>\n<script", extra + "</div>\n<script", 1)
        p.write_text(html, encoding="utf-8")
    print("maps painted")


def main():
    paint_home()
    paint_dests()
    paint_maps()
    print("CUT-3X-2X-2015-2020 painted")


if __name__ == "__main__":
    main()
