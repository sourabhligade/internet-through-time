# 2021 sources — 5k-class corpus + named harvest

**Date:** 2026-08-16  
**Freeze:** [`2021-READ-FIRST.md`](2021-READ-FIRST.md)  
**Method:** see harvest §0.

## A. 5k-class corpus (not a fake visit log)

| Corpus | What you get | Why it counts |
|--------|--------------|---------------|
| [HTTP Archive Almanac 2021](https://almanac.httparchive.org/en/2021/) | July 2021 crawl of the public web | Page-weight / JS / 3p measured on **millions** of origins. Museum uses p50 **1,923 KB** mobile. |
| [HA page-weight 2021](https://almanac.httparchive.org/en/2021/page-weight) | Distribution p10–p90 | Opened this pass. |
| [HA reports page-weight](https://httparchive.org/reports/page-weight) | Time series | Cited in Almanac intro (356% growth decade). |
| [Netcraft Jun 2021 row](https://www.netcraft.com/blog/june-2026-web-server-survey) | 1.213B hostnames · **199.5M active** | Active-site universe. |
| [Netcraft Dec 2021](https://www.netcraft.com/blog/december-2021-web-server-survey) | 1.169B sites | Year-end hostname class. |
| Wayback 2021 (`web.archive.org/web/2021*/`) | Period HTML for each P0 URL | Capture later · do not invent pixels. |

**About sentence:** *Scale is ITU users + Netcraft active sites + HTTP Archive 2021 medians. We do not invent a Live Stats June 2021 cell.*

## B. Named primaries (this pass — OPEN / SNIP)

Status: **OPEN** = page fetched or official text confirmed · **SNIP** = search-verified dual-cite · **BLOCK** = do not use as gold.

### Scale / users

| ID | URL | Status | Use |
|----|-----|--------|-----|
| S01 | https://www.itu.int/itu-d/reports/statistics/facts-figures-2021/ | OPEN | 4.9B / 63% |
| S02 | https://www.itu.int/en/ITU-D/Statistics/Documents/facts/FactsFigures2021.pdf | OPEN | PDF |
| S03 | https://www.itu.int/en/mediacentre/Pages/PR-2021-11-29-FactsFigures.aspx | SNIP | PR |
| S04 | https://news.un.org/en/story/2021/12/1106862 | SNIP | UN recap |
| S05 | https://datareportal.com/reports/digital-2021-global-overview-report | OPEN | 4.66B / 4.20B |
| S06 | https://wearesocial.com/uk/blog/2021/01/digital-2021-the-latest-insights-into-the-state-of-digital/ | OPEN | Jan 2021 |
| S07 | https://wearesocial.com/uk/blog/2021/10/social-media-users-pass-the-4-5-billion-mark/ | OPEN | Oct 4.55B |
| S08 | https://wearesocial-net.s3-eu-west-1.amazonaws.com/wp-content/uploads/common/reports/digital-2021/digital-2021-global.pdf | SNIP | PDF |
| S09 | https://www.internetlivestats.com/total-number-of-websites/ | SNIP | table ends 2018 |
| S10 | https://www.netcraft.com/blog/december-2021-web-server-survey | OPEN | Dec hostnames |
| S11 | https://www.netcraft.com/blog/june-2026-web-server-survey | OPEN | Apr–Jun 2021 active table |
| S12 | https://almanac.httparchive.org/en/2021/page-weight | OPEN | medians |
| S13 | https://almanac.httparchive.org/en/2021/ | SNIP | full almanac |
| S14 | https://httparchive.org/reports/page-weight | SNIP | trend |

### ATT / Apple

| ID | URL | Status | Use |
|----|-----|--------|-----|
| A01 | https://developer.apple.com/news/?id=ecvrtzt2 | OPEN | 26 Apr requirement |
| A02 | https://developer.apple.com/documentation/apptrackingtransparency | OPEN | framework |
| A03 | https://www.nytimes.com/2021/04/26/technology/personaltech/apple-app-tracking-transparency.html | OPEN | ship day |
| A04 | https://www.theguardian.com/technology/2021/apr/27/apple-ios-145-update-includes-app-tracking-transparency-feature | SNIP | |
| A05 | https://www.apple.com/newsroom/2021/09/apple-introduces-iphone-13-and-iphone-13-mini/ | OPEN | $799 / 24 Sep |
| A06 | https://developer.apple.com/app-store/review/guidelines/#5.1.2 | SNIP | 5.1.2(i) |

### WhatsApp / Signal

| ID | URL | Status | Use |
|----|-----|--------|-----|
| W01 | https://www.whatsapp.com/legal/privacy-policy | OPEN | effective 4 Jan 2021 |
| W02 | https://faq.whatsapp.com/595724415641642 | OPEN | FAQ |
| W03 | https://www.cnbc.com/2021/01/12/signal-telegram-downloads-surge-after-update-to-whatsapp-data-policy.html | OPEN | surge |
| W04 | https://timesofindia.indiatimes.com/business/india-business/whatsapps-privacy-policy-pushes-users-to-rivals/articleshow/80178485.cms | SNIP | |
| W05 | https://indianexpress.com/article/technology/social/whatsapp-privacy-policy-change-telegram-signal-saw-massive-spike-in-january-shows-data/ | SNIP | |
| W06 | https://dl.acm.org/doi/10.1145/3491102.3502032 | SNIP | CHI paper |

### Meta / outage / Haugen

| ID | URL | Status | Use |
|----|-----|--------|-----|
| M01 | https://about.fb.com/news/2021/10/facebook-company-is-now-meta/ | OPEN | 28 Oct |
| M02 | https://www.reuters.com/technology/facebooks-zuckerberg-kicks-off-its-virtual-reality-event-with-metaverse-vision-2021-10-28/ | OPEN | app still FB |
| M03 | https://www.npr.org/2021/10/28/1049813246/facebook-new-name-meta-mark-zuckerberg | SNIP | |
| M04 | https://en.wikipedia.org/wiki/2021_Facebook_outage | OPEN | 15:39 UTC |
| M05 | https://www.reuters.com/technology/facebook-instagram-down-thousands-users-downdetectorcom-2021-10-04/ | OPEN | 6 h / 10.6M reports |
| M06 | https://www.nytimes.com/2021/10/04/technology/facebook-down.html | SNIP | |
| M07 | https://www.cbsnews.com/news/facebook-whistleblower-frances-haugen-misinformation-public-60-minutes-2021-10-03/ | OPEN | 3 Oct |
| M08 | https://www.cnbc.com/2021/10/05/facebook-whistleblower-testifies-before-senate-committee.html | OPEN | 5 Oct |
| M09 | https://www.wsj.com/articles/the-facebook-files-11631713039 | SNIP | Files |
| M10 | https://en.wikipedia.org/wiki/2021_Facebook_leak | SNIP | |

### Microsoft / Win11 / Copilot

| ID | URL | Status | Use |
|----|-----|--------|-----|
| N01 | https://blogs.windows.com/windowsexperience/2021/08/31/windows-11-available-on-october-5/ | OPEN | GA date |
| N02 | https://news.microsoft.com/windows11-general-availability | OPEN | 5 Oct |
| N03 | https://en.wikipedia.org/wiki/Windows_11 | OPEN | RTM 24 Jun |
| N04 | https://www.cnbc.com/2021/08/31/windows-11-release-date-october-5.html | SNIP | |
| N05 | https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/ | OPEN | 29 Jun 2021 preview |
| N06 | https://en.wikipedia.org/wiki/GitHub_Copilot | OPEN | GA 2022 honesty |

### Infra / Flash / Fastly / Log4j

| ID | URL | Status | Use |
|----|-----|--------|-----|
| I01 | https://www.adobe.com/products/flashplayer/end-of-life-alternative.html | OPEN | brick 12 Jan |
| I02 | https://www.zdnet.com/article/adobe-to-block-flash-content-from-running-on-january-12-2021/ | SNIP | |
| I03 | https://www.fastly.com/blog/summary-of-june-8-outage | OPEN | 85% / 49 min |
| I04 | https://www.theguardian.com/technology/2021/jun/09/fastly-says-single-customer-triggered-bug-that-caused-mass-outage | SNIP | |
| I05 | https://www.cnbc.com/2021/06/08/fastly-outage-internet-what-happened.html | SNIP | |
| I06 | NVD CVE-2021-44228 | SNIP | Log4j |

### Courts / culture / game

| ID | URL | Status | Use |
|----|-----|--------|-----|
| C01 | https://en.wikipedia.org/wiki/Epic_Games_v._Apple | OPEN | 10 Sep |
| C02 | https://www.npr.org/2021/09/10/1036043886/apple-fortnite-epic-games-ruling-explained | OPEN | split |
| C03 | https://blog.x.com/en_us/topics/product/2021/goodbye-fleets | OPEN | Fleets 3 Aug |
| C04 | https://techcrunch.com/2021/07/14/twitter-is-shutting-down-fleets-on-august-3-citing-low-usage/ | SNIP | |
| C05 | https://openai.com/index/dall-e/ | OPEN | 5 Jan |
| C06 | https://en.wikipedia.org/wiki/DALL-E | OPEN | |
| C07 | https://en.wikipedia.org/wiki/Wordle | OPEN | Oct public |
| C08 | https://www.nytimes.com/2022/01/31/business/media/new-york-times-wordle.html | OPEN | **2022 wall** |
| C09 | https://www.powerlanguage.co.uk/wordle/ | SNIP | original host · do not clone pixels |

### BLOCK (do not gold)

| ID | Why |
|----|-----|
| ChatGPT launch posts | **30 Nov 2022** |
| Copilot GA 29 Jun 2022 | preview only in 2021 |
| Elon Twitter deal 2022 | wall |
| BeReal 2022 US boom | wall |
| Live IDFA / ATT SDK samples that ship trackers | legal |
| Official Apple / Meta / NYT / Fortnite art | never invent pixels |

## C. Room → source map (for implement)

| Room | Cite 1 | Cite 2 |
|------|--------|--------|
| ATT | A01 | A03 |
| Signal | W01 | W03 |
| Meta | M01 | M02 |
| Outage | M04 | M05 |
| Win11 | N01 | N03 |
| Copilot | N05 | N06 |
| Flash brick | I01 | I02 |
| Fastly | I03 | I04 |
| Epic | C01 | C02 |
| Wordle game | C07 | C08 (as 2022 wall) |
| iPhone 13 | A05 | CNBC event |
| DALL·E | C05 | C06 |
| Scale About | S01 | S11 + S12 |

## D. What to reopen before implement

1. ITU PDF page that prints 4.9B (S02) — confirm footnote.  
2. Netcraft **June 2021** original post if still live (we used the 2026 historical table).  
3. Wayback `20210426` ATT sheet + `20210104` WhatsApp policy.  
4. StatCounter 2021 browser share (not locked this pass — Chrome habit is the 2020 carry).
