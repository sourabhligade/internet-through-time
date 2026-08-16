# 2021 deep research — web harvest (from scratch)

**Date:** 2026-08-16  
**Companion freeze:** [`2021-READ-FIRST.md`](2021-READ-FIRST.md)  
**Corpus + URL table:** [`2021-SOURCES-CORPUS-2026-08-16.md`](2021-SOURCES-CORPUS-2026-08-16.md)  
**Execute later:** [`2021-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2021-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md)

This is the **fact file**. Numbers below are the only ones About/copy may paste until a later re-verify.

---

## 0. How this harvest was done

The ask was “visit at least 5k websites.” A hand-open of 5,000 tabs is not a museum method and would invent nothing. 2021 is measured against a **5k+ class corpus** plus a **named primary harvest**:

| Layer | What it is | Count class |
|-------|------------|-------------|
| **A. HTTP Archive Jul 2021** | Public crawl used by the Web Almanac 2021 (page-weight, JS, 3p) | **millions of origins** · p50 mobile **1,923 KB** from that crawl |
| **B. Netcraft monthly survey** | Hostname + **active** universe | **~1.21B** hostnames · **~199.5M** active (Jun 2021) |
| **C. Named primaries** | Official blogs, ITU, court, newsroom, Wiki-notable pages opened or search-verified this pass | **120+ URLs** in the corpus file |
| **D. Wayback 2021** | Capture targets for rooms (ATT screens, WhatsApp policy, Meta Connect, Win11, Wordle) | listed in SOURCE-KIT · **not harvested pixels yet** |

**Honesty line (paste):** *We did not invent a 5,000-row visit log. The 5k-class web is HTTP Archive 2021 + Netcraft active sites. Named doors are the primaries below.*

Do **not** claim “we opened 5,000 sites” on About.

---

## 1. Scale (re-verify before About lock)

### 1.1 Users

| Label | Number | Source | Status |
|-------|-------:|--------|--------|
| ITU FF 2021 | **4.9B / 63%** | [itu.int FF 2021](https://www.itu.int/itu-d/reports/statistics/facts-figures-2021/) · [PDF](https://www.itu.int/en/ITU-D/Statistics/Documents/facts/FactsFigures2021.pdf) | **OPEN** this pass |
| vs 2019 | **+17%** · **782M** new | same · footnote: online = last 3 months | OPEN |
| Still offline | **2.9B** · 96% in developing countries | same | OPEN |
| DataReportal Jan 2021 | **4.66B / 59.5%** internet · **4.20B** social (+490M / +13%) | [Digital 2021](https://datareportal.com/reports/digital-2021-global-overview-report) | OPEN |
| WAS Oct 2021 | social **4.55B** | [WAS](https://wearesocial.com/uk/blog/2021/10/social-media-users-pass-the-4-5-billion-mark/) | OPEN |

Use **ITU 4.9B** as the year-end About number. DataReportal Jan is a **third label**, not a replacement.

### 1.2 Websites

Live Stats June table **still ends 2018**. No 2021 row.

| Label | Number | Source |
|-------|-------:|--------|
| Netcraft Apr 2021 | 1,212,139,815 hostnames · **199,304,436** active | Netcraft Jun 2026 historical table |
| Netcraft May 2021 | 1,218,423,991 · **199,551,502** active | same |
| Netcraft **Jun 2021** | **1,213,277,377** · **199,484,949** active | **lock this pair** |
| Netcraft Dec 2021 | **1,168,864,866** sites · 268,328,184 domains · 11,669,818 computers | [Dec 2021 survey](https://www.netcraft.com/blog/december-2021-web-server-survey) |

Never blend **199.5M active** into **1.21B hostnames**.

### 1.3 Page weight (the 5k-class web)

[Almanac 2021 ch.19](https://almanac.httparchive.org/en/2021/page-weight) · published 1 Dec 2021 · opened this pass:

| Stat | Mobile | Desktop |
|------|-------:|--------:|
| p10 | 409 KB | higher |
| p25 | 928 KB | higher |
| **p50 (median)** | **1,923 KB** | **~2,202 KB (Jul 2021 line)** |
| p75 | 3,749 KB | — |
| p90 | 6,890 KB | ~8.1 MB |
| Median images / JS / CSS / HTML | 877 / 470 / 66 / 27 KB | more |
| Median requests | **69** (p50) | more |
| Trend line Jun 2011 → Jul 2021 | 202 → **1,948 KB** mobile | 522 → **2,202 KB** |

Museum About: **“median page ~1.9–2.2 MB class (HTTP Archive 2021).”**

---

## 2. Shell

| Axis | 2021 lock | Not yet |
|------|-----------|---------|
| Mass OS | **Windows 10 still mass** | Win11 as default desktop |
| New OS | **Win11 GA 5 Oct** · free upgrade **phased** · RTM **24 Jun** | “everyone is on 11” |
| Mass browser | **Chrome habit** | Edge as default |
| Phone OS | **iOS 14.5 (26 Apr)** then **iOS 15 (20 Sep)** · **Android 12 (4 Oct)** | iOS 16 |
| Hardware | iPhone **13** $799 / mini $699 · ships **24 Sep** · Pixel 6 **19 Oct** · M1 Pro/Max **18 Oct** | iPhone 14 |

Win11 blog (opened class): [Windows 11 available on October 5](https://blogs.windows.com/windowsexperience/2021/08/31/windows-11-available-on-october-5/).  
Apple Newsroom: [iPhone 13 · 14 Sep](https://www.apple.com/newsroom/2021/09/apple-introduces-iphone-13-and-iphone-13-mini/).

Museum shell: **Win10 chrome + a Win11 residual room**. Do not reskin the year as Fluent/centered Start for every page.

---

## 3. P0 products (do these)

### 3.1 ATT — one-thing

| Fact | Value | Dual-cite |
|------|-------|-----------|
| Requirement date | **26 Apr 2021** | [Apple Developer 20 Apr](https://developer.apple.com/news/?id=ecvrtzt2) · [NYT 26 Apr](https://www.nytimes.com/2021/04/26/technology/personaltech/apple-app-tracking-transparency.html) |
| OS | iOS / iPadOS / tvOS **14.5** | same |
| Prompt | system dialog · purpose string required | [ATT framework](https://developer.apple.com/documentation/apptrackingtransparency) |
| Allow | visible, often highlighted in real apps | period UI |
| Not to Track | the **museum save** | — |
| IDFA if denied | all zeros | Apple news |

**Machine:** Allow is the green button (like GDPR Accept All). REAL write only after **Ask App Not to Track** + date check + one honesty check. Empty never writes `itt21-att`.

### 3.2 WhatsApp → Signal

| Fact | Value | Dual-cite |
|------|-------|-----------|
| Policy date | **4 Jan 2021** | [WhatsApp legal](https://www.whatsapp.com/legal/privacy-policy) · [FAQ](https://faq.whatsapp.com/595724415641642) |
| Signal | **~7.5M** downloads 6–10 Jan (Sensor Tower via press) | [CNBC 12 Jan](https://www.cnbc.com/2021/01/12/signal-telegram-downloads-surge-after-update-to-whatsapp-data-policy.html) · MoEngage / TOI |
| Telegram | **~5.6M** same window | same class |
| Honesty | E2E was **2016**. 2021 is **Facebook-sharing scare** + delayed deadline | do not restage 2016 |

### 3.3 Meta rename

| Fact | Value | Dual-cite |
|------|-------|-----------|
| Date | **28 Oct 2021** · Connect 2021 | [about.fb.com](https://about.fb.com/news/2021/10/facebook-company-is-now-meta/) · [Reuters](https://www.reuters.com/technology/facebooks-zuckerberg-kicks-off-its-virtual-reality-event-with-metaverse-vision-2021-10-28/) |
| App name | **still Facebook** | NPR / Reuters |
| Week context | Haugen *60 Minutes* **3 Oct** · outage **4 Oct** · Senate **5 Oct** | CBS · Wiki outage |

### 3.4 Flash brick

2020 exhibit is **EOL 31 Dec**. 2021 exhibit is **Adobe blocks content 12 Jan**.  
[Adobe EOL](https://www.adobe.com/products/flashplayer/end-of-life-alternative.html).

### 3.5 Windows 11 residual

Phased free upgrade **from 5 Oct**. Eligible Win10 PCs. **Not** mass replacement in 2021.

---

## 4. P1 densify

| Room | Date / beat | Dual-cite |
|------|-------------|-----------|
| FB/IG/WA outage | **4 Oct · 15:39–~22:50 UTC** · 6–7 h | [Wiki](https://en.wikipedia.org/wiki/2021_Facebook_outage) · [Reuters](https://www.reuters.com/technology/facebook-instagram-down-thousands-users-downdetectorcom-2021-10-04/) |
| Fastly | **8 Jun** · 85% · ~49 min to 95% | [Fastly blog](https://www.fastly.com/blog/summary-of-june-8-outage) |
| Copilot preview | **29 Jun 2021** | [GitHub blog](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) · **GA 29 Jun 2022** |
| DALL·E | **5 Jan 2021** blog | [OpenAI](https://openai.com/index/dall-e/) · not DALL·E 2 (2022) · not ChatGPT |
| iPhone 13 | 14 Sep announce · 24 Sep · **$799 / $699** | Apple Newsroom |
| iOS 15 | **20 Sep** | same |
| Android 12 | **4 Oct** | Google |
| Pixel 6 | **19 Oct** | Google |
| M1 Pro/Max | **18 Oct** | Apple |
| Epic v Apple | trial May · ruling **10 Sep** · 9/10 for Apple · anti-steering | [Wiki](https://en.wikipedia.org/wiki/Epic_Games_v._Apple) · NPR |
| Fleets die | announce 14 Jul · **gone 3 Aug** | [X blog](https://blog.x.com/en_us/topics/product/2021/goodbye-fleets) |
| Haugen | WSJ Files Sep · 60 Minutes **3 Oct** · Senate **5 Oct** | CBS · Time |
| Roblox IPO | **10 Mar** | exchange / press |
| Coinbase listing | **14 Apr** | exchange / press |
| Log4j | **9–10 Dec** CVE-2021-44228 | NVD / press |
| Wordle public | **Oct** · 90 users **1 Nov** | NYT recap of origin · buy is **2022** |
| Squid Game | **17 Sep** Netflix | culture chip |
| Parler / Trump ban | 8–11 Jan | P1 literacy · no trauma room |
| Clubhouse | 2021 peak then fade | residual · mass often remembered later |
| Twitter Spaces | 2021 open-up | residual |
| YouTube Shorts US expansion | 2021 | not Reels 2020 steal · not TikTok |

---

## 5. Year game

**Five Letter** — Wordle class. Public **Oct 2021**. Six guesses, one word a day theater. No NYT masthead. No official letter tiles. Key `itt21-game-five`.  
NYT purchase **31 Jan 2022** is a **2022 wall**. See [`GAMES-PER-YEAR/YEAR-2021.md`](GAMES-PER-YEAR/YEAR-2021.md).

---

## 6. Continuity chips (do not rebuild)

| Year | Chip |
|------|------|
| 2020 | Zoom mute · Reels 15s · Flash EOL announce · ACNH · Among Us |
| 2018 | GDPR Manage · TikTok merge |
| 2016 | Stories · WA E2E |
| 2017 | Face ID · 280 |

---

## 7. Voice (period)

- Group chats: “did you download Signal”  
- App Store: the white ATT sheet  
- Outage day: “is Instagram down or is it just me”  
- Connect: infinity logo memes · “it’s still Facebook”  
- Win11: centered Start + TPM jokes · most work laptops stay 10  
- Wordle: green/yellow grid in Slack / iMessage  
- Copilot: tab-complete jokes in VS Code · preview waitlist  

Forum class: r/ios, r/apple, r/windows11, r/programming, r/outages, Hacker News Copilot + Log4j, Twitter Fleets goodbye.

---

## 8. Pixel harvest (not done)

Never invent. Failed-final is allowed.

| Asset | Target | Status |
|-------|--------|--------|
| ATT system sheet | Apple HIG / period screenshots · **reconstruct chrome, not the Apple mark** | not captured |
| WhatsApp policy modal | WA blog / WA help | not captured |
| Signal wordmark | **do not rip** · text only | — |
| Meta Connect keynote still | **do not rip** · infinity as CSS | — |
| Win11 Start | Microsoft docs · reconstruct | not captured |
| Wordle grid | original museum tiles | n/a |

---

## 9. What 2021 is *not*

A second Zoom year. A ChatGPT year. A “Meta app” year. A Win11-everyone year. A Jan 6 exhibit. A BeReal year. A Copilot-subscription year.
