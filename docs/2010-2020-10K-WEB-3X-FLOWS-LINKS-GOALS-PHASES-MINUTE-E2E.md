# 2010–2020 leftover 3× — 10k-web research → flows · links · implement

**Date:** 2026-08-22  
**Question:** For every live year since 2010, walk the real Web’s scale (from Gray’s **10,022** December 1994 sites to ILS’s last June cell **1,630,322,579** in 2018), pick the leftover rooms that belong on that year’s busy web, and make **three unique leftover trios** finishable — first 3×, pop-more, third 3× — without adding 10,000 dests.

**Disk law:** 2010–2013 + 2015–2020. **2014 wiped.** **2021+ not on disk.** Guided stays **6**. Stars stay locked. Lean years stay lean (~50 HTML). No google.com dest. No adult rooms. No invented brand pixels. Incomplete never writes.

| Companion | Role |
|-----------|------|
| This file | Execute bible for 2010+ leftover 3× (research · goals · phases · minute · E2E) |
| [`YEAR-WEB-RESEARCH-10K-TO-BILLION.md`](YEAR-WEB-RESEARCH-10K-TO-BILLION.md) | Scale spine · Hosting.com June series |
| [`YEAR-WEB-10K-TO-BILLION-GOALS-PHASES-MINUTE-E2E.md`](YEAR-WEB-10K-TO-BILLION-GOALS-PHASES-MINUTE-E2E.md) | Whole-museum 10k program |
| [`2020-3X-WRITE-OUT-GOALS-PHASES-FLOWS-MINUTE.md`](2020-3X-WRITE-OUT-GOALS-PHASES-FLOWS-MINUTE.md) | How a leftover 3× is written out |
| [`2016-2018-3X-FLOWS-DETAIL.md`](2016-2018-3X-FLOWS-DETAIL.md) | pick → honesty → go machine |
| Engine | `js/immersion/year-popular-3x.js` |
| JSON | `scripts/popular-3x-sites.json` · `scripts/popular-3x3-sites.json` |
| Audit | `scripts/audit-3x3-flows.js` (`SHARE_POP_MORE` = 2007 · 2009 only) |

**Opened this pass (primary pages, not 10,000 GET):**

- [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/) — June hostname table **ends 2018**. Definition: unique hostname. ~75% parked.
- [Hosting.com — most visited websites every year since 1995](https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/) — reconstructed **June** top 10 (updated 4 Dec 2025). Direction, not Alexa gospel.
- [Matthew Gray MIT web-growth](https://stuff.mit.edu/people/mkgray/net/web-growth-summary.html) — **10,022** Dec 1994. That is the “10k websites” fact. **Not a dest backlog.**
- ITU / DataReportal remain **labeled second numbers** after 2018 (no June websites cell).

---

## 0. What “10k websites” means here

It is the **size of the 1994 Web**, then the ILS June spine through 2018.

| Year | Print this | Users / other (labeled only) | Hosting.com June #1–3 (visits) |
|-----:|------------|------------------------------|--------------------------------|
| 2010 | June **206,956,723 (−13%)** | 2.05B users · 9.9 / site · ILS launched: Pinterest, Instagram | Yahoo **11.60B** · Google **11.30B** · YouTube **4.77B** |
| 2011 | June **346,004,403** | 2.28B · 6.6 / site | **Google #1 for good** **14.02B** · Yahoo 11.02B · YouTube 7.53B |
| 2012 | June **697,089,489** | 2.52B · 3.6 / site · Aug 2012 wildcard cleanup | Google 17.08B · **Facebook 11.13B passes YouTube 11.03B** |
| 2013 | June **672,985,183 (−3%)** | 2.76B · Dec class ~850M / 180M active | Google 20.00B · Facebook 16.07B · YouTube 14.84B · Twitter **#6 2.01B** |
| 2014 | **wiped** | First billion hostnames Sep (NetCraft Oct) | — |
| 2015 | June **863,105,652 (−11%)** | 3.19B · 3.7 / site | Google 29.62B · Facebook 24.27B · YouTube 22.86B · **Instagram #8 2.49B** |
| 2016 | June **1,045,534,808** | users cell **blank** · 900M Jan → 1.7B Dec · ~170M active stable | Google 40.70B · Facebook 26.99B · YouTube 25.38B · Instagram **#8 2.82B** |
| 2017 | June **1,766,926,408 (+69%)** | users cell blank · ITU ~48% | Google 54.65B · Facebook 28.01B · YouTube 26.84B · **Baidu #4 5.27B** (out of US thesis) |
| 2018 | June **1,630,322,579 (−8%) · table ends** | ITU ~51% / 3.9B class | Google 66.30B · **YouTube 27.88B passes Facebook 27.67B** |
| 2019 | **no June websites cell** | ITU **4.1B / 53.6%** | Google 73.70B · YouTube 28.29B · Facebook 27.64B · Instagram #8 3.44B · **adult #10 literacy only** |
| 2020 | **no June websites cell** | ITU +10.2% · DataReportal Oct 4.66B internet (different ruler) | Google 77.66B · YouTube 29.50B · Facebook 27.43B · adult #10 literacy only |

Drops (2010 −13%, 2013 −3%, 2015 −11%, 2018 −8%) are **not** “the Web shrank.” ILS: wildcard cleanup (example Aug 2012, 40 million hostnames on 242 IPs). Never blend June + December into one digit. Never invent a 2019/2020 June websites count.

**Museum implication:** after 2006, Google.com is the **habit**, not a dest. After 2011 it is #1 “for good.” We curate **mass leftover or honesty** + **year object (gold)** + **nine leftover doors (3×3)**. We do not reconstruct the other 206 million (2010) or 1.63 billion (2018) hostnames.

---

## 1. Goal (what “done” means)

A visitor who already did the year’s gold can walk **nine leftover websites** — three unique trios — without the chip moving and without a seventh guided item.

```
Hub → YYYY → Starting Point
        ★ gold (locked)
        guided 6 (locked)
        │
        ├─ first 3×    data-itt-pop3x     keys ittYY-pop-<id>
        ├─ second 3×   data-itt-pop-more  keys ittYY-pop-<id>  or existing leftover
        └─ third 3×    data-itt-pop-3x3   keys ittYY-pop3-<id>
```

**Done when, for every live 2010+ year:**

1. Home has three strips, **3 hrefs each**, all live, **pairwise unique**, none is the star.
2. First 3× dests: pick + honesty + field + go. Empty / no pick / no tick never writes. Next reveals the next first-3× dest.
3. Second 3× dests: a finishable leftover (existing machine **or** scoped `data-pop-panel="1"`). Next reveals the next second-3× dest.
4. Third 3× dests: already `pop3-` writers (do not reopen).
5. Map lists all three trios. About prints the ILS June digit (or “no June cell”).
6. Mass honesty names the June #1–3 (or the year’s chart story) with Hosting.com visits.

**Not done if** we add google.com, adult rooms, Discord/Netflix as new dests, restore 2014, grow guided past 6, move a gold, or invent a June 2019/2020 websites digit.

---

## 2. Locked leftover inventory (live rooms only)

| Year | Gold | First 3× | Second 3× | Third 3× | Why these nine |
|-----:|------|----------|-----------|----------|----------------|
| 2010 | IG iOS `itt10-ig` | Netflix · Tumblr · Formspring | Groupon deal · Quora wait · IG iOS leftover | Chrome · Wave funeral · Android Market | Yahoo still #1. First 3× = US culture leftovers **not** in June top 10. Second = deal / Q&A / camera-on-iPhone leftover. Third = browser habit + Wave death + Market. |
| 2011 | G+ `itt11-gplus` | iCloud · Pinterest · LinkedIn | **Airbnb · Qwikster · iPad 2** | Snapchat · Tumblr · YouTube | Google #1 for good — no google.com dest. Second trio is residual leftover (was a copy of third). |
| 2012 | IG Android `itt12-ig-android` | Medium · Path · Flipboard | **Facebook 1B · Maps flop · SOPA** | Reddit · Tinder · Windows 8 | Facebook passes YouTube for #2 (11.13B vs 11.03B). SOPA 18 Jan. Maps iOS 6. |
| 2013 | Vine 6s `itt13-vine-posts` | Ask.fm · Whisper · YouTube leftover | **Chrome habit · Snowden · Telegram** | Reddit · Facebook · Twitter | Vine never top 10 (correct gold). Twitter is #6. Stories-as-product is 2016. |
| 2015 | Periscope `itt15-periscope` | Instagram (no Stories) · Spotify · Netflix | Meerkat · Apple Music sub · Get Win10 | Discord · Echo · Snapchat | Instagram hits June **#8 / 2.49B**. Stories banned until 2016. |
| 2016 | IG Stories `itt16-ig-stories` | Reddit · Netflix · YouTube | Slack · FB Live · Moments | Musical.ly · Vine · Snapchat | Users cell blank. IG #8 **and** the gold. |
| 2017 | Face ID `itt17-faceid` | Reddit · YouTube · Amazon | Snap IPO · Bitcoin ATM · Echo Show | Fortnite · Teams · Switch | Face ID is not a website. Baidu #4 stays print-only. |
| 2018 | GDPR `itt18-gdpr` | Reddit · YouTube · Wikipedia | Discord · Apple Music · Fortnite Creative | TikTok · GitHub · HomePod | Table ends. YouTube **passes** Facebook for #2 (27.88B vs 27.67B). |
| 2019 | Disney+ `itt19-disneyplus` | YouTube · Instagram · Wikipedia | **Apple TV+ · AirPods Pro · iPhone 11** | TikTok · Stadia · Arcade | No June websites cell. Adult #10 literacy. Second trio was a copy of third. |
| 2020 | Zoom `itt20-zoom` | YouTube · Wikipedia · Facebook | Meet / Teams · Mixer · HBO Max | ACNH · Astronomical · Quibi | No June websites cell. SimilarWeb Nov is a **different ruler**. Zoom.us is #15 there — not first 3×. |

2007 / 2009 still share pop-more with the third trio. Out of this 2010+ pass.

---

## 3. Machine (every leftover 3× room)

Same engine as 2016–2018. `js/immersion/year-popular-3x.js`.

```
open leftover room
    │
    ├─ Go with 0 picks / 0 ticks / empty field
    │      → status scold
    │      → write nothing
    │
    ├─ pick a row          [data-pop-pick]
    ├─ tick every          [data-pop-req]
    ├─ type ≥2 in          [data-pop-field]
    └─ Go                  [data-pop-go]  data-pop-id="<slug>"
           → ittYY-pop-<slug>   or  data-pop-key="pop3-<slug>"
           → { real:true, multiStep:true, year:"YYYY" }
           → Next [data-next-when-key] to the next leftover dest
```

If the dest already has a leftover extras machine (`data-ab11-go`, `data-tv-watch`, `data-meet-join`…), the **second 3× trail** may use that write. Adding a scoped `data-pop-panel="1"` is required when the dest has **no** `data-pop-go`, so pop-more is finishable without colliding leftover checkboxes.

Costume: `[failed-final]` / RECON. No official glyphs.

---

## 4. Phases (do in order)

| Phase | What | Files | Done when |
|------:|------|-------|-----------|
| P0 | Research lock | This file · ILS · Hosting.com | Digits above match opened pages |
| P1 | Uniqueness | `years/YYYY/pages/home.html` · `scripts/audit-3x3-flows.js` | SHARE_POP_MORE = {2007, 2009} only |
| P2 | First 3× writers + next | `years/2010/sites/{netflix,tumblr,formspring}` · 2012 flipboard next-key | pick + req + next |
| P3 | Second 3× writers + next | 2011 airbnb/qwikster/ipad · 2012 facebook/maps/sopa · 2013 chrome/snowden/telegram · 2019 appletv/airpodspro/iphone11 | scoped pop-more panel |
| P4 | Maps list all 3 trios | `years/{2010,2015,2016,2017,2018}/pages/map.html` (+ already 2011–13, 2019–20) | second + third headings |
| P5 | Mass honesty digits | homes 2010, 2012, 2013, 2015–2018 | June visits named |
| P6 | E2E | `e2e/year-2010-plus-3x-unique.spec.js` · year-more-3x · year packs | incomplete never writes |

**Never this pass:** P12 10k scrape · 2014 · 2021+ · gold keys · guided 7 · new dest folders · Discord/Netflix dests · adult rooms.

---

## 5. Minute steps

### 5.1 First 3× — 2010 (upgrade fill-only dests)

`years/2010/sites/netflix/index.html` · `tumblr/index.html` · `formspring/index.html`

1. Add 3 `[data-pop-pick]` (one trap).  
2. Add 1 `[data-pop-req]` (not the chip / discs still mail / not ask.fm).  
3. Keep `[data-pop-field]` + `[data-pop-go][data-pop-id]`.  
4. Next: Netflix → Tumblr (`itt10-pop-netflix`) → Formspring (`itt10-pop-tumblr`) → Starting Point (`itt10-pop-formspring`).

### 5.2 First 3× — 2012 Flipboard

Add `data-next-when-key="itt12-pop-flipboard"` on the existing Next. Dest already has req + go.

### 5.3 Second 3× panels (12 dests)

Wrap in `<section data-pop-panel="1">` so leftover extras checkboxes are **out of scope**.

| Dest | `data-pop-id` | Writes | Next |
|------|---------------|--------|------|
| 2011 airbnb | `airbnb` | `itt11-pop-airbnb` | qwikster |
| 2011 qwikster | `qwikster` | `itt11-pop-qwikster` | ipad |
| 2011 ipad | `ipad` | `itt11-pop-ipad` | home |
| 2012 facebook/index | `facebook1b` | `itt12-pop-facebook1b` | maps |
| 2012 iphone/maps | `maps` | `itt12-pop-maps` | sopa |
| 2012 wikipedia/sopa | `sopa` | `itt12-pop-sopa` | home |
| 2013 chrome | `chrome` | `itt13-pop-chrome` | snowden |
| 2013 snowden | `snowden` | `itt13-pop-snowden` | telegram |
| 2013 telegram | `telegram` | `itt13-pop-telegram` | home |
| 2019 appletv | `appletv` | `itt19-pop-appletv` | airpodspro |
| 2019 airpodspro | `airpodspro` | `itt19-pop-airpodspro` | iphone11 |
| 2019 iphone/iphone11 | `iphone11` | `itt19-pop-iphone11` | home |

Use `facebook1b` not `facebook` so 2012 first/third keys stay distinct from any leftover `itt12-facebook`.

### 5.4 Maps

On 2010 / 2015 / 2016 / 2017 / 2018 `pages/map.html`, after the first leftover 3× list (or the room ul), add:

```
<h2>Second leftover 3× — unique doors</h2>  … 3 live hrefs + keys
<h2>Third leftover 3×</h2>                 … 3 live hrefs + pop3 keys
```

Update the ASCII pre on 2016–2018 to show Second + Third lines (2019–2020 already do).

### 5.5 Mass honesty (homes)

Replace the vague June line with the Hosting.com visits from §0. Keep “do not rebuild google.com” / “adult #10 is never a room” / “no June cell.”

---

## 6. E2E

```
for year in 2010 2011 2012 2013 2015 2016 2017 2018 2019 2020:
  home: guided ol == 6
  home: star href unchanged
  home: first / more / third each 3 hrefs
  home: the three sets of site paths are pairwise disjoint
  more dest: GET 200
  more dest (2011/12/13/19 new panels): Go empty never writes · pick+tick+field writes ittYY-pop-*
2010 netflix / tumblr / formspring: same incomplete / complete
audit-3x3-flows.js exit 0
```

Specs: `e2e/year-2010-plus-3x-unique.spec.js` · `e2e/year-more-3x.spec.js` (1994–2020 homes) · year packs 2011/12/13/19.

---

## 7. Visitor walk (one year)

```
Start 2011
  ★ Google+ Circles          → itt11-gplus
  first 3×  iCloud → Pinterest → LinkedIn
  second 3× Airbnb → Qwikster → iPad 2     (was Snap/Tumblr/YT — now unique)
  third 3×  Snapchat → Tumblr → YouTube
  About     346,004,403 June
  Map       all three trios listed
  Year menu → hub
```

Same shape every 2010+ year. Nine leftover doors. Zero new hostnames invented. The other 346 million (2011) stay unbuilt on purpose.
