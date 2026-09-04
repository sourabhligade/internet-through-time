# Popular-links + exact-flow TODO — goals · phases · minute steps · ROI (1994–2020)

**Date:** 2026-08-15  
**Status:** **Implemented 2026-08-15** · rooms + home chips + urlMap · `e2e/popular-flows-all-years.spec.js` **135 passed** · leftover harvest MD / L4 still `[ ]` if you want source logs later  
**Research (why these names):** [`YEAR-TRUE-POPULAR-LINKS-AND-EXACT-FLOWS-1994-2020.md`](YEAR-TRUE-POPULAR-LINKS-AND-EXACT-FLOWS-1994-2020.md)  
**Not the 5× deepen bible:** [`IMPROVE-5X-TODO-GOALS-PHASES-STEPS-ROI-FLOWS-1994-2020.md`](IMPROVE-5X-TODO-GOALS-PHASES-STEPS-ROI-FLOWS-1994-2020.md) — that file deepens rooms we already have. **This file adds known-popular rooms that are missing**, plus the **exact period session** as F-flows.  
**Hub:** playable **1994–2020** · **2021+ not on disk**  
**Git only if asked.**

---

## 0. How to use

| You say | You do |
|---------|--------|
| `implement popular hygiene` | Wave 0 only (§2) |
| `research popular 1995` | That year’s **R0** only |
| `implement popular 1995` | That year R0 → F1–F5 → L → T |
| `implement popular 1995 AOL` | One named flow (F1) |
| `implement popular 2013 Twitter` | 2013 F1 only |
| `implement popular all years` | **Do not.** |

### 0.1 Every phase has

| Field | Meaning |
|-------|---------|
| **Goal** | What done looks like |
| **Why / ROI** | R5–R1 · visitor feel |
| **Disk start** | What is true now |
| **Files** | Create / edit |
| **Minute steps** | Numbered — do in order |
| **Storage** | `ittYY-*` · incomplete **never writes** |
| **Acceptance** | Pass / fail |
| **Tests** | Commands |
| **Anti** | Forbidden |

### 0.2 Marks

| Mark | Meaning |
|------|---------|
| **[ ]** | Open |
| **[x]** | True on disk (do not rebuild) |
| **[~]** | Optional / L4 — does not block |

### 0.3 ROI

| Tag | Time | Use |
|-----|------|-----|
| **R5** | 15–30 min | Continuity chip, href, title, harvest row |
| **R4** | Half day | One new known room + e2e |
| **R3** | 1 day | Year pack F1–F5 (reuse first) |
| **R2** | Multi-day | Lean year +3 HTML pack (Twitter/IG) |
| **R1** | Forever | L4 pixels · OEM chrome |

### 0.4 Hard rules (every year)

1. Config + content. **No engine fork.**  
2. Prefix **`ittYY-*` only**. Neighbor year isolation.  
3. Incomplete **never writes**.  
4. **Never invent brand pixels.** Failed-final / RECON text is legal.  
5. Star (`data-ott-one-thing`) **locked**. Popular chips go under P1 / “also” / 3× strip.  
6. Guided `<ol>` stays **exactly 6**.  
7. Lean years (**2011–14, 2016–20**): **+3 HTML max** for the whole pack. Forest years: **reuse first**.  
8. Do **not** restore pruned forests.  
9. Do **not** reopen as broken: **1995–97 SSL/PointCast, 2005 Pandora, 2017 Face ID, 2018 GDPR, 2020 Zoom**.  
10. Do **not** add adult-video ranks.  
11. Do **not** put Baidu / Yandex / VK in the English default tour (honesty chip `[~]` only).  
12. Names must be **dated** (launch or that year’s top-10). No random hrefs.

### 0.5 Shared playbook (copy every year)

#### Phase R0 — Harvest the known names · R4 · `[ ]`

**Goal:** `docs/YYYY-POPULAR-HARVEST.md` with ≥ 10 visited URLs for **that year’s F-names only**.  
**Steps:**

1. Read [`YEAR-TRUE-POPULAR-LINKS-AND-EXACT-FLOWS-1994-2020.md`](YEAR-TRUE-POPULAR-LINKS-AND-EXACT-FLOWS-1994-2020.md) § that year + `YYYY-READ-FIRST.md`.  
2. Confirm star href on `years/YYYY/pages/home.html`. **Do not change it.**  
3. `ls years/YYYY/sites/` — mark each F as **reuse** or **+HTML**.  
4. Visit, for each new name: 1 Wayback `id_` year-correct homepage · 1 launch/newsroom · 1 contemporaneous review. Log URL + date visited.  
5. Write the exact verb: what the visitor **types/clicks** · what empty does · Next dest.  
6. Stop. No product HTML in R0.

**Accept:** harvest file exists; every F-name has a source URL.  
**Anti:** invent a 2019 Live Stats digit · copy 2010 Yahoo into 2011 · SWF rips.

#### Phase L — Links (after F1–F5) · R5 · `[ ]`

For **each** completed flow, wire all five:

1. Home **Also / P1** chip `data-trail-keys="ittYY-…"` — **not** a 7th guided li.  
2. `js/config/flow-maps.js` leaf **or** `flow-maps-3x.js` extra (existing 3× pass).  
3. Product `[data-next-flow]` hidden until key exists → next F in the chain.  
4. `js/config/YYYY.js` `urlMap` + `titleMap` + one `locationHints` regex.  
5. One cross-room href (F1→F2) + 3× strip already lists existing rooms.

#### Phase T — Tests · R5 · `[ ]`

```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/one-thing-per-year.spec.js --grep YYYY --workers=1
npx playwright test e2e/YYYY-popular-live.spec.js --workers=1
```

Star still green. Isolation: `itt(YY±1)-*` untouched. Incomplete click never writes.

#### Shared F-flow minute steps

1. New room: `index.html` + `about.html` **or** reuse existing folder. Lean: count every new HTML against **+3**.  
2. Empty submit / 0 checks / missing required field → feedback · **return before setItem**.  
3. Complete → `{ multiStep:true, real:true, year:"YYYY", ts, …typed }`.  
4. Reload shows the work.  
5. `revealNext` on save **and** on reload if key exists.  
6. Boot in `year-YYYY-extras.js` / existing module — **no inline page script**.  
7. `e2e/YYYY-popular-live.spec.js`: incomplete · complete · reload · isolation · Next href exists.

---

## 1. Scoreboard (disk 2026-08-15)

| Year | Star [x] | HTML | Model | Popular pack | Wave |
|-----:|----------|-----:|--------|--------------|------|
| 1994 | CSotD | 177 | Authored | Infoseek + directory session | W3 |
| 1995 | SSL | 142 | Gold | **AOL · Prodigy · Infoseek · Compuserve** | **W1** |
| 1996 | Portal wars | 111 | Gold | **MSN.com start** · Infoseek · Prodigy | **W1** |
| 1997 | PointCast | 84 | Gold | **MSN · BBC · AOL · Excite · Lycos** | **W1** |
| 1998 | Lucky | 127 | Forest | AOL · MSN · Lycos · BBC | W2 |
| 1999 | AIM | 151 | Forest | AOL · MSN · **About.com** | W2 |
| 2000 | MapQuest | 173 | Forest | AOL · MSN · About · BBC | W2 |
| 2001 | MSN / wiki | 186 | Forest | AOL · BBC · About · **CNET** | W2 |
| 2002 | Stumble | 209 | Forest | MSN · AOL · BBC · About | W2 |
| 2003 | Photobucket | 232 | Forest | **Walmart.com** · CNET · MSN | W3 |
| 2004 | networks | 289 | Forest | **Weather.com** · Walmart · MSN | W3 |
| 2005 | Pandora | 294 | Gold | Ask.com 2005 · AOL chip | W5 |
| 2006 | Twitter 140 | 299 | Forest | MSN Live · Ask · AOL chip | W4 |
| 2007 | iPhone Safari | 315 | Forest | MSN vs Google · Ask · AOL chip | W4 |
| 2008 | GitHub | 326 | Forest | MSN · Ask · Yandex `[~]` | W4 |
| 2009 | Like | 338 | Forest | Ask · Yandex `[~]` | W4 |
| 2010 | Imgur / IG | 378 | Forest peak | Ask chip only — **do not grow** | W5 |
| 2011 | Airbnb | 49 | Lean +3 | **Twitter · Groupon · Tumblr** | **W4** |
| 2012 | SoundCloud | 47 | Lean +3 | **Twitter · Tumblr · FB IPO** | W4 |
| 2013 | Vine | 59 | Lean +3 | **Twitter** (top-10 that year) | **W4** |
| 2014 | WhatsApp | 58 | Lean +3 | Twitter · FB/YT/Google chips | W4 |
| 2015 | Watch | 95 | Lean | **Instagram 2015** | **W4** |
| 2016 | Stories | 51 | Lean +3 | Twitter · YT/Google chips | W5 |
| 2017 | Face ID | 49 | Lean A | Continuity chips only | W5 |
| 2018 | GDPR | 48 | Lean A− | Continuity chips only | W5 |
| 2019 | Disney+ | 49 | Lean | YT · IG · Twitter residuals | W5 |
| 2020 | Zoom | 52 | Lean | Google · Wiki · FB chips | W5 |

---

## 2. Wave 0 — hygiene · do before any popular F

### H0 — do not steal a star · R5 · `[ ]`

**Goal:** Every year’s `data-ott-one-thing` href unchanged after the pack.  
**Steps:**

1. Snapshot star hrefs (`grep data-ott-one-thing years/*/pages/home.html`).  
2. After any year pack, same href + `e2e/one-thing-per-year.spec.js --grep YYYY` green.  
**Anti:** retarget 1995 off SSL · 2013 off Vine · 2018 off GDPR.

### H1 — lean +3 fence · R5 · `[ ]`

**Goal:** 2011 / 2012 / 2013 / 2014 / 2016 / 2019 / 2020 HTML count ≤ start+3.  
**Steps:** `find years/YYYY -name '*.html' | wc -l` before and after. Prefer `index.html` only (no about) if at the cap.  
**Anti:** 5 new rooms on 2011.

### H2 — no adult / no Baidu-default · R5 · `[x]` in this bible

Do not create rooms from 2019–20 compiled adult ranks. Yandex/Baidu/VK = optional honesty line on About, not a tour stop.

---

## 3. Waves (execute order)

| Wave | Years | ROI | Do |
|------|-------|-----|----|
| **W0** | hygiene | R5 | H0–H2 |
| **W1** | **1995 · 1996 · 1997** | R2 | AOL / Prodigy / MSN start / BBC — mass #1–3 holes |
| **W2** | 1998–2002 | R3 | Portal start pages (AOL · MSN · About · CNET) |
| **W3** | 2003–04 | R3 | Walmart.com · Weather.com |
| **W4** | **2011–15** | R2 | Twitter on lean years · **2015 Instagram** |
| **W5** | 2005–10 · 2016–20 | R4–R5 | Chips + Ask.com · do not reopen gold/Zoom |
| **W-L4** | any | R1 | Never required |

---

# Years

Each year: **Goals · Why/ROI · Disk · R0 · F1–F5 (minute) · L · T · Anti**.  
Star is **[x]**. Do not retarget.

---

## 1994 — directory, not search · W3 · R3

**Star [x]** CSotD · `itt94-csotd`

### Goals

| ID | Goal | Done when |
|----|------|-----------|
| G1 | Harvest | `docs/1994-POPULAR-HARVEST.md` ≥ 10 URLs |
| G2 | Exact session | Visitor can **browse then search** (Yahoo vs Infoseek) |
| G3 | F1–F5 write only on complete | keys below |
| G4 | Star untouched | one-thing 1994 green |
| G5 | Isolation | no `itt95-*` |

**Why / ROI:** First-night feel is directory. Infoseek is the one famous 1994 search **not on disk**. R3. Hub +0.2.

**Disk start:** 177 HTML · 20 dirs · Yahoo · Lycos · WebCrawler · NCSA · CERN · no Infoseek.

### R0 `[ ]`

Infoseek/Architext 1994 · NCSA What’s New 1994 · akebono Yahoo · WebCrawler full-text · Netscape 1.0 Dec 15. No AOL.com-as-WWW (walled garden).

### F1 Infoseek query · `itt94-infoseek` · R4 · `[ ]`

**Files:** `years/1994/sites/infoseek/{index,results,about}.html` · extras or `media-1994.js`  
**Steps:**

1. Index: query field + 2 literacy checks (1994 launch · not Google).  
2. Empty query or 0 checks → no write.  
3. Submit → `results.html` list (3 RECON hits, no live crawl) → write `{q, real, year:"1994"}`.  
4. Next → Yahoo Computers (browse vs search).  
**Accept:** empty blocked; complete writes; reload shows last q.  
**Anti:** PageRank story · steal CSotD.

### F2 Yahoo 2-level drill · `itt94-yahoo-dir` · R5 · `[ ]`

**Files:** existing `sites/yahoo/`  
**Steps:** Visit 2 category hubs (Computers + Entertainment or News) then write. One hub only → no write. Next → WebCrawler.

### F3 WebCrawler full-text · `itt94-webcrawler` · R5 · `[ ]`

**Files:** existing `sites/webcrawler/`  
**Steps:** Query ≥ 2 chars + 1 literacy (first full-text). Next → NCSA What’s New.

### F4 NCSA What’s New item · `itt94-whatsnew` · R5 · `[ ]`

**Files:** existing `sites/ncsa/`  
**Steps:** Open one dated item → persist item id. Empty list click no write. Next → Netscape welcome.

### F5 Netscape first URL · `itt94-nn-url` · R5 · `[ ]`

**Files:** existing `sites/mcom/`  
**Steps:** Type a period URL theater (yahoo / cern / ncsa) → Go. Empty bar no write. Next → CSotD (star).

### L `[ ]` · T `[ ]`

Home P1: Infoseek chip. Map leaf. `e2e/1994-popular-live.spec.js`.  
**Anti:** AOL.com as 1994 WWW home.

---

## 1995 — Big Three open the Web · W1 · R2 · gold

**Star [x]** Amazon SSL · `itt95-ssl-checkout` · **do not reopen cart**

### Goals

G1 harvest · G2 AOL mail theater · G3 Prodigy “first WWW” literacy · G4 Infoseek + Compuserve · G5 star SSL still needs name+card+city.

**Why / ROI:** AOL is **#1** June 1995 visits. Prodigy is the first Big Three with full WWW. R2. Hub +0.4.

**Disk:** 142 HTML · 15 dirs · no AOL.com · no Prodigy · no Infoseek · no Compuserve · WebCrawler lives on 1994.

### R0 `[ ]`

AOL 1995 web exit · You’ve Got Mail · Prodigy Jan 1995 WWW + June member pages · Infoseek 1995 · Compuserve. Yahoo.com domain 1995 (already on disk).

### F1 AOL You’ve Got Mail · `itt95-aol` · R4 · `[ ]`

**Files:** `years/1995/sites/aol/{index,mail,keyword}.html`  
**Steps:**

1. Index: screen-name field + 2 checks (CD install class · garden then Web).  
2. Empty name → no write.  
3. Sign on → mail list theater (“You’ve Got Mail”) → write `{sn, mail:true}`.  
4. Keyword page: one keyword (weather / travel) does **not** write (garden browse).  
5. Next → Prodigy.  
**Accept:** empty blocked; complete writes `itt95-aol`; keyword-only no write.  
**Anti:** invent AOL triangle art · 1994-as-WWW.

### F2 Prodigy WWW first · `itt95-prodigy` · R4 · `[ ]`

**Files:** `sites/prodigy/{index,www,about}.html`  
**Steps:** 2 checks (first Big Three with full WWW · June 1995 home pages) + open WWW exit. Next → Infoseek.  
**Anti:** claim AOL was first to the Web.

### F3 Infoseek 1995 · `itt95-infoseek` · R4 · `[ ]`

**Files:** `sites/infoseek/` (new this year, not a 1994 clone unless you share copy with a year-voice line).  
**Steps:** Query + literacy. Next → Compuserve.

### F4 Compuserve forum · `itt95-compuserve` · R4 · `[ ]`

**Files:** `sites/compuserve/{index,forum}.html`  
**Steps:** Pick a forum (GO word theater) + 2 checks. Empty GO no write. Next → Yahoo.

### F5 Yahoo.com 1995 domain · `itt95-yahoo` · R5 · `[ ]`

**Files:** existing `sites/yahoo/`  
**Steps:** Open 2 hubs (reuse 1995 tree). Next → SSL star (do not rewrite checkout).

### L `[ ]` · T `[ ]`

`e2e/1995-popular-live.spec.js`. one-thing SSL still green.  
**Anti:** name AuctionWeb “eBay”.

---

## 1996 — portal is the homepage · W1 · R3 · gold

**Star [x]** portal wars · `itt96-portal-wars`

### Goals

Visitor’s **home button** can be MSN or Yahoo/Excite — not a blank page. Infoseek leftover. Prodigy residual.

**ROI:** R3. MSN.com enters top 10. Hub +0.3.

**Disk:** 111 HTML · `aolportal` exists · `excite` exists · `microsoft` ≠ MSN start · no Infoseek · no Prodigy.

### R0 `[ ]`

MSN.com 1995–96 launch · My Excite / My Yahoo · Infoseek · Hotmail Jul 1996 (on disk).

### F1 MSN.com start · `itt96-msn` · R4 · `[ ]`

**Files:** `years/1996/sites/msn/{index,channel,about}.html`  
**Steps:** Pick a channel (News / Money / Sports) + 2 checks (start page · not Bing). Empty channel no write. Next → Infoseek.  
**Anti:** steal 2001 MSN star later; this is 1996 channels.

### F2 Infoseek · `itt96-infoseek` · R4 · `[ ]`

Query + literacy. Next → Prodigy.

### F3 Prodigy residual · `itt96-prodigy` · R4 · `[ ]`

2-check (now 3rd behind AOL + Compuserve). Next → My Excite.

### F4 My Excite · `itt96-myexcite` · R5 · `[ ]`

**Files:** existing `sites/excite/`  
**Steps:** Set 2 modules (news + weather). 0–1 module no write. Next → Hotmail.

### F5 Hotmail compose · `itt96-hotmail` · R5 · `[ ]`

**Files:** existing `sites/hotmail/`  
**Steps:** To + body required (already a 1996 room — deepen if empty writes). Next → portal-wars star.

### L `[ ]` · T `[ ]`

**Anti:** home button = Google (not 1996).

---

## 1997 — push + Hotmail + BBC · W1 · R3 · gold

**Star [x]** PointCast · `itt97-pointcast` · **do not reopen**

### Goals

MSN + BBC as mass destinations. AOL mail residual. Excite + Lycos portals.

**ROI:** R3. BBC enters top 10. Hub +0.3.

**Disk:** 84 HTML · PointCast · Hotmail · eBay · AIM · no AOL.com · no MSN.com · no Excite · no Lycos · no BBC.

### R0 `[ ]`

BBC News online 1997 · MSN 1997 · AOL.com · Excite · Lycos. PointCast already gold.

### F1 MSN.com 1997 · `itt97-msn` · R4 · `[ ]`

Channels + 2 checks. Next → BBC.

### F2 BBC News one-story · `itt97-bbc` · R4 · `[ ]`

**Files:** `sites/bbc/{index,story,about}.html`  
**Steps:** Open one 1997-class headline (RECON title, dated) + 2 checks (bbc.com class · not a US cable clone). Next → AOL.  
**Anti:** invent a 2020 BBC masthead.

### F3 AOL.com residual · `itt97-aol` · R4 · `[ ]`

Mail + keyword (same contract as 1995, year-voice 1997). Next → Excite.

### F4 Excite portal · `itt97-excite` · R4 · `[ ]`

**Files:** `sites/excite/` (new this year).  
**Steps:** Search or channel. Next → Lycos.

### F5 Lycos catalog · `itt97-lycos` · R4 · `[ ]`

**Files:** `sites/lycos/`  
**Steps:** Query + catalog literacy. Next → PointCast (star).

### L `[ ]` · T `[ ]`

**Anti:** reopen PointCast machine.

---

## 1998 — portal vs Lucky · W2 · R3

**Star [x]** Lucky · `itt98-lucky`

### Goals

Visitor starts on **MSN or AOL or Lycos**, *then* tries Lucky, *then* goes back to the portal.

**ROI:** R3. Contrast is the year. Hub +0.2.

**Disk:** 127 HTML · google/lucky · excite · goto · dmoz · no AOL · no MSN · no Lycos · no BBC.

### R0 `[ ]`

MSN 1998 · AOL.com · Lycos · BBC. Lucky already the star.

### F1 MSN start · `itt98-msn` · R4 · `[ ]`

Channel + checks. Next → Lycos.

### F2 Lycos catalog · `itt98-lycos` · R4 · `[ ]`

Query. Next → AOL.

### F3 AOL.com · `itt98-aol` · R4 · `[ ]`

Mail theater. Next → BBC.

### F4 BBC News · `itt98-bbc` · R4 · `[ ]`

One story. Next → Lucky (star) with honesty line: “this is the trick, not the home button.”

### F5 Lucky still the trick · `itt98-lucky` · `[x]`

Do **not** rebuild. T only: one-thing 1998 still green.

### L `[ ]` · T `[ ]`

**Anti:** make Google the 1998 homepage.

---

## 1999 — buddy list + About.com · W2 · R3

**Star [x]** AIM · `itt99-aim`

### Goals

AIM still first. About.com is the missing top-10 human directory. AOL/MSN residuals.

**ROI:** R3. About.com #7 June 1999. Hub +0.2.

**Disk:** 151 HTML · aim · napster · blogger · geocities · no About.com · no AOL.com · no MSN.com.

### R0 `[ ]`

About.com 1999 · AOL · MSN · GeoCities Yahoo buy Jan 28 (already on disk).

### F1 About.com topic · `itt99-about` · R4 · `[ ]`

**Files:** `sites/about/{index,topic,about}.html`  
**Steps:** Pick a topic (health / money / compute) + 2 checks (human-written · not Wikipedia). Next → AOL.

### F2 AOL.com · `itt99-aol` · R4 · `[ ]`

Mail. Next → MSN.

### F3 MSN.com · `itt99-msn` · R4 · `[ ]`

Channels. Next → AIM (star) — buddy list still signs on first.

### F4 Napster file · `itt99-napster` · R5 · `[ ]`

**Files:** existing `sites/napster/`  
**Steps:** Search track → download theater (file, not stream). Empty query no write. Next → GeoCities.

### F5 GeoCities neighborhood · `itt99-geocities` · R5 · `[ ]`

**Files:** existing `sites/geocities/`  
**Steps:** Pick hood + 1 check (still a place you live · Yahoo just bought it). Next → AIM.

### L `[ ]` · T `[ ]`

**Anti:** treat GeoCities as a joke.

---

## 2000 — print MapQuest · W2 · R3

**Star [x]** MapQuest · `itt00-mapquest`

### Goals

Portal residuals + About/BBC. Do **not** rebuild MapQuest print.

**ROI:** R4. Yahoo #1 this June table. Hub +0.1.

**Disk:** 173 HTML · mapquest · yahoo · ebay · amazon · no AOL · no MSN · no About · no BBC.

### R0 `[ ]`

About.com · BBC · AOL · MSN 2000. MapQuest already the star.

### F1 About.com topic · `itt00-about` · R4 · `[ ]`

Same contract as 1999, year-voice 2000. Next → BBC.

### F2 BBC News · `itt00-bbc` · R4 · `[ ]`

One story. Next → MSN.

### F3 MSN.com · `itt00-msn` · R4 · `[ ]`

**Honesty:** 2001 owns the MSN **star**. This is a start-page residual, not `itt01-msn`. Next → AOL.

### F4 AOL.com · `itt00-aol` · R4 · `[ ]`

Mail. Next → MapQuest (star) print.

### F5 MapQuest print · `itt00-mapquest` · `[x]`

T only. A+B required. No phone-on-dash.

### L `[ ]` · T `[ ]`

**Anti:** duplicate 2001 MSN gold machine.

---

## 2001 — wiki + CNET · W2 · R3

**Star [x]** MSN / wiki (year owns both; wiki edit is the signature REAL)

### Goals

CNET download theater. BBC · About · AOL residuals. Wiki edit still REAL.

**ROI:** R3. Google enters top 10 (#9). CNET #10. Hub +0.2.

**Disk:** 186 HTML · wikipedia · msn · google · encarta · no CNET · no BBC · no About · no AOL.

### R0 `[ ]`

CNET / download.com 2001 · BBC · About · AOL. No iTunes Store (2003).

### F1 CNET download · `itt01-cnet` · R4 · `[ ]`

**Files:** `sites/cnet/{index,download,about}.html`  
**Steps:** Pick a period title (Winamp / IE / Netscape class) + 2 checks (news + download · **not a live binary**). Next → BBC.

### F2 BBC News · `itt01-bbc` · R4 · `[ ]`

One story. Next → About.

### F3 About.com · `itt01-about` · R4 · `[ ]`

Topic. Next → AOL.

### F4 AOL.com · `itt01-aol` · R4 · `[ ]`

Mail residual. Next → Wikipedia edit (star path).

### F5 Wiki edit · `itt01-wiki` · `[x]`

T only. Empty body never writes.

### L `[ ]` · T `[ ]`

**Anti:** serve a real exe.

---

## 2002 — Google News + MSN start · W2 · R3

**Star [x]** Stumble · `itt02-stumble`

### Goals

MSN.com homepage (IE6/XP). AOL · BBC · About residuals. Stumble untouched.

**ROI:** R3. Google #4. Hub +0.2.

**Disk:** 209 HTML · googlenews · stumbleupon · friendster · askjeeves · no MSN.com homepage · no AOL · no BBC · no About.

### R0 `[ ]`

MSN 2002 · Google News Sep · Friendster (on disk).

### F1 MSN.com 2002 · `itt02-msn` · R4 · `[ ]`

Start page + one pane. Next → BBC.

### F2 BBC · `itt02-bbc` · R4 · `[ ]`

Story. Next → About.

### F3 About.com · `itt02-about` · R4 · `[ ]`

Topic. Next → AOL.

### F4 AOL.com · `itt02-aol` · R4 · `[ ]`

Mail. Next → Google News (existing).

### F5 Google News scan · `itt02-gnews` · R5 · `[ ]`

**Files:** existing `sites/googlenews/`  
**Steps:** Open 2 headlines (no write until 2). Next → Stumble (star).

### L `[ ]` · T `[ ]`

**Anti:** News Feed (2006).

---

## 2003 — 99¢ + Walmart.com · W3 · R3

**Star [x]** Photobucket · `itt03-photobucket`

### Goals

Walmart.com as mass ecommerce (not Amazon). CNET. MSN/AOL chips. iTunes 99¢ deepen.

**ROI:** R3. Walmart #9 June 2003. Hub +0.3.

**Disk:** 232 HTML · itunes · myspace · photobucket · no Walmart · no CNET · no MSN.com · no AOL.

### R0 `[ ]`

Walmart.com 2003 catalog · CNET · iTunes Store Apr 28 (on disk).

### F1 Walmart.com product · `itt03-walmart` · R4 · `[ ]`

**Files:** `sites/walmart/{index,product,about}.html`  
**Steps:** Pick one SKU theater (DVD / CD class) + 2 checks (not Amazon · 2003 catalog). Add to cart field required. Next → CNET.  
**Anti:** Prime · invent logo.

### F2 CNET download · `itt03-cnet` · R4 · `[ ]`

Period title. Next → iTunes.

### F3 iTunes 99¢ · `itt03-itunes` · R5 · `[ ]`

**Files:** existing `sites/itunes/`  
**Steps:** Browse → 99¢ → FairPlay file in library. No track no write. Next → MySpace.

### F4 MySpace profile song · `itt03-myspace` · R5 · `[ ]`

**Files:** existing `sites/myspace/`  
**Steps:** Pick a song + 1 check (custom HTML). Next → Photobucket (star).

### F5 Photobucket · `itt03-photobucket` · `[x]`

T only.

### L `[ ]` · T `[ ]`

---

## 2004 — Weather.com · W3 · R3

**Star [x]** networks · `itt04-thefacebook-networks`

### Goals

Zip → forecast (the daily-check site). Walmart residual. MSN/AOL chips. Networks lock stays.

**ROI:** R3. Weather.com #10 June 2004. Hub +0.3.

**Disk:** 289 HTML · facebook · gmail · flickr · bbc · no Weather.com · no Walmart · no MSN.com · no AOL.

### R0 `[ ]`

Weather.com 2004 · Walmart · Gmail invite (on disk).

### F1 Weather.com zip · `itt04-weather` · R4 · `[ ]`

**Files:** `sites/weather/{index,forecast,about}.html`  
**Steps:** 5-digit zip + 2 checks (check before you leave · not an app). Empty zip no write. Forecast page persists zip. Next → Walmart.  
**Anti:** live API tiles · Doppler invent.

### F2 Walmart.com · `itt04-walmart` · R4 · `[ ]`

One SKU. Next → MSN.

### F3 MSN.com · `itt04-msn` · R4 · `[ ]`

Start page. Next → AOL.

### F4 AOL.com · `itt04-aol` · R4 · `[ ]`

Mail. Next → networks (star).

### F5 networks · `itt04-thefacebook-networks` · `[x]`

T only. .edu still the lock.

### L `[ ]` · T `[ ]`

---

## 2005 — Ask.com 2005 · W5 · R4 · gold

**Star [x]** Pandora · `itt05-pandora` · **do not reopen**

### Goals

Ask.com as Jeeves-fading mass search. AOL/Walmart chips. YouTube/Maps already here — deepen watch/drag only.

**ROI:** R4. Pew: **7%** of adults on social. Email + portal still win. Hub +0.1.

**Disk:** 294 HTML · youtube · maps · myspace · askjeeves (older) · no Ask.com 2005 skin · no AOL · no Walmart.

### R0 `[ ]`

Ask.com 2005 (Jeeves optional) · AOL leftover · YouTube Feb (on disk).

### F1 Ask.com 2005 · `itt05-ask` · R4 · `[ ]`

**Files:** `sites/ask/{index,results}.html` (or restyle askjeeves with 2005 voice — **one folder**).  
**Steps:** Query + 2 checks (Ask.com name · not 1998 Jeeves-only). Next → YouTube.

### F2 YouTube one clip · `itt05-youtube` · R5 · `[ ]`

**Files:** existing `sites/youtube/`  
**Steps:** Title required to “upload” theater. Next → Maps.

### F3 Maps drag · `itt05-maps` · R5 · `[ ]`

**Files:** existing `sites/maps/`  
**Steps:** Pan/search once → persist. Next → MySpace.

### F4 AOL chip · `itt05-aol` · R5 · `[ ]`

One-page residual. Next → Pandora (star).

### F5 Pandora · `itt05-pandora` · `[x]`

T only.

### L `[ ]` · T `[ ]`

**Anti:** reopen Pandora station machine.

---

## 2006 — MSN Live · W4 · R4

**Star [x]** Twitter 140 · `itt06-tweets`

### Goals

MSN/Windows Live start. Ask leftover. Feed already on Facebook disk — do not rebuild Twitter.

**ROI:** R4. Google #1 this June table. Pew social **11%**. Hub +0.1.

**Disk:** 299 HTML · twitter · facebook · youtube · wikipedia · no MSN.com · no Ask · no AOL.

### R0 `[ ]`

Windows Live / MSN 2006 · Ask · News Feed Sep (on disk).

### F1 MSN / Live 2006 · `itt06-msn` · R4 · `[ ]`

**Files:** `sites/msn/{index,live}.html`  
**Steps:** One Live pane + 2 checks (not Bing yet). Next → Ask.

### F2 Ask.com · `itt06-ask` · R4 · `[ ]`

Query. Next → Facebook feed (existing).

### F3 News Feed scan · `itt06-feed` · R5 · `[ ]`

**Files:** existing `sites/facebook/`  
**Steps:** Open feed · 2 literacy (feed comes to you · not 2004 wall-first). Next → Twitter (star).

### F4 AOL chip · `itt06-aol` · R5 · `[ ]`

One page. Next → Wikipedia (existing).

### F5 Twitter 140 · `itt06-tweets` · `[x]`

T only. Empty never writes.

### L `[ ]` · T `[ ]`

---

## 2007 — MSN vs Google · W4 · R4

**Star [x]** iPhone Safari · `itt07-iphone`

### Goals

One query on MSN **and** Google (contrast). Ask/AOL chips. No App Store (2008).

**ROI:** R4. Hub +0.1.

**Disk:** 315 HTML · iphone · hulu · tumblr · no MSN.com · no Ask · no AOL.

### R0 `[ ]`

Live Search 2007 · iPhone Safari Jun 29 (on disk).

### F1 MSN Live query · `itt07-msn` · R4 · `[ ]`

Query + 2 checks. Next → Google (existing).

### F2 Google same query · `itt07-google-q` · R5 · `[ ]`

**Files:** existing `sites/google/`  
**Steps:** Same string as F1 (session or typed again) → persist. Next → Safari star.

### F3 Ask.com · `itt07-ask` · R4 · `[ ]`

Chip. Next → AOL.

### F4 AOL chip · `itt07-aol` · R5 · `[ ]`

Next → iPhone Safari.

### F5 Safari URL · `itt07-iphone` · `[x]`

T only. Empty bar never writes. **No App Store.**

### L `[ ]` · T `[ ]`

---

## 2008 — MSN + Ask · W4 · R4

**Star [x]** GitHub · `itt08-github`

### Goals

MSN.com 2008. Ask leftover. YouTube/Facebook already top-3 — chips only. Yandex `[~]`.

**ROI:** R4. Hub +0.1.

**Disk:** 326 HTML · chrome · appstore · github · youtube · facebook · no MSN.com · no Ask.

### R0 `[ ]`

MSN 2008 · Ask · Chrome Sep 2 · App Store Jul 10 (on disk).

### F1 MSN.com 2008 · `itt08-msn` · R4 · `[ ]`

Start page. Next → Ask.

### F2 Ask.com · `itt08-ask` · R4 · `[ ]`

Query. Next → Chrome (existing).

### F3 Chrome omnibox · `itt08-chrome` · R5 · `[ ]`

**Files:** existing `sites/chrome/`  
**Steps:** One URL/query. Next → App Store Get.

### F4 App Store Get · `itt08-appstore` · R5 · `[ ]`

**Files:** existing `sites/appstore/`  
**Steps:** Get with an app selected. Next → GitHub (star).

### F5 GitHub issue · `itt08-github` · `[x]`

T only.

### L `[ ]` · T `[ ]`

Yandex `[~]` About line only.

---

## 2009 — Ask leftover · W4 · R5

**Star [x]** Like · `itt09-fb-likes`

### Goals

Ask.com vs Bing (Bing is on disk). Like untouched.

**ROI:** R5. Pew social **38%**. Hub +0.

**Disk:** 338 HTML · facebook Like · bing · no Ask.

### R0 `[ ]`

Ask 2009 · Bing Jun 1 (on disk).

### F1 Ask.com · `itt09-ask` · R4 · `[ ]`

Query. Next → Bing.

### F2 Bing query · `itt09-bing` · R5 · `[ ]`

**Files:** existing `sites/bing/`  
**Steps:** Same-string contrast optional. Next → Like (star).

### F3–F5 Like / Foursquare / SO · `[x]` / deepen `[~]`

Do not rebuild Like. Optional Foursquare check-in deepen.

### L `[ ]` · T `[ ]`

---

## 2010 — do not grow the forest · W5 · R5

**Star [x]** Instagram / Imgur (year owns both; IG filter is the late signature)

### Goals

**Ask.com chip only.** Forest is 378 HTML. Link existing Google/Yahoo/YouTube/Facebook — do not add rooms.

**ROI:** R5. Hub +0. **Anti is the point.**

**Disk:** 378 HTML · instagram · imgur · facebook · youtube · google · yahoo · no Ask.

### R0 `[ ]`

Confirm Ask is the only mass hole worth a chip.

### F1 Ask.com chip · `itt10-ask` · R5 · `[ ]`

**Files:** `sites/ask/index.html` **one file** (counts +1).  
**Steps:** Query + 1 check. Next → Instagram (star path).

### F2–F5 `[x]`

IG filter · Imgur · Facebook · YouTube already REAL. T only.

### L `[ ]` · T `[ ]`

**Anti:** any new Amazon/Yahoo clone page.

---

## 2011 — Twitter · Groupon · Tumblr · W4 · R2 · lean +3

**Star [x]** Airbnb request · `itt11-airbnb`

### Goals

Three year-true mass habits **not on the lean disk**. Continuity Google/Wiki = chips **inside** those 3 pages or About — not extra HTML if at cap.

**ROI:** R2. Twitter is the hole. Hub +0.4.

**Disk:** 49 HTML · 18 dirs · no twitter · no groupon · no tumblr · youtube/facebook/chrome exist.

### R0 `[ ]`

Twitter 2011 (140) · Groupon peak · Tumblr. Airbnb request stays the star.

### F1 Twitter 140 · `itt11-tweets` · R4 · `[ ]`

**Files:** `years/2011/sites/twitter/{index,about}.html` (2 HTML)  
**Steps:** Compose ≤140 + 2 checks (public · not Fleets). Empty no write. Next → Groupon.  
**Anti:** 280 · steal Airbnb.

### F2 Groupon deal · `itt11-groupon` · R4 · `[ ]`

**Files:** `sites/groupon/index.html` (1 HTML — at +3 cap if F1 used 2)  
**Steps:** Pick a deal + 2 checks (daily deal peak · not a 2020 app). Next → Tumblr **or** Airbnb if no third file.  
If HTML cap hit: put Tumblr as a chip on Groupon Next only.

### F3 Tumblr reblog · `itt11-tumblr` · R4 · `[ ]` · **only if ≤ start+3**

**Files:** `sites/tumblr/index.html`  
**Steps:** Reblog theater + 1 check. Next → Airbnb.

### F4 Wikipedia chip · `itt11-wiki` · R5 · `[ ]`

Prefer a paragraph + href to **2011 Wikipedia residual** on About, or one `sites/wikipedia/index.html` **only if** still under +3.

### F5 Google Search chip · `itt11-google` · R5 · `[ ]`

Same cap rule. Continuity labeled “not the 2011 one-thing.”

### L `[ ]` · T `[ ]`

`find years/2011 -name '*.html' | wc -l` ≤ 52.  
**Anti:** restore 2010 forest.

---

## 2012 — Twitter · Tumblr · IPO · W4 · R2 · lean +3

**Star [x]** SoundCloud · `itt12-soundcloud`

### Goals

Twitter + Tumblr + Facebook IPO literacy (can live under existing `facebook/`).

**ROI:** R2. Facebook #2 this June table. Hub +0.3.

**Disk:** 47 HTML · facebook · instagram · wikipedia · no twitter · no tumblr.

### R0 `[ ]`

Twitter 2012 · Tumblr · Facebook IPO May 18 · Instagram acquisition Sep.

### F1 Twitter 140 · `itt12-tweets` · R4 · `[ ]`

`sites/twitter/index.html`. Next → Tumblr.

### F2 Tumblr · `itt12-tumblr` · R4 · `[ ]`

`sites/tumblr/index.html`. Next → Facebook IPO.

### F3 Facebook IPO literacy · `itt12-fb-ipo` · R5 · `[ ]`

**Files:** existing `sites/facebook/` + `ipo.html` **or** a panel on `index.html` (prefer 0 new file).  
**Steps:** 2 checks (May 18 · not a new product). Next → SoundCloud (star).

### F4–F5 Wikipedia / Google chips · R5 · `[ ]`

Only if under +3.

### L `[ ]` · T `[ ]`

**Anti:** Instant Book · Stories.

---

## 2013 — Twitter is top-10 and missing · W4 · R2 · lean +3

**Star [x]** Vine · `itt13-vine-posts`

### Goals

**Twitter 2013** is the single highest-ROI lean add in this bible. Vine stays the star.

**ROI:** R2. Twitter #6 June 2013. Hub +0.5.

**Disk:** 59 HTML · vine · snapchat · tinder · outlook · no twitter · no google search · no wikipedia.

### R0 `[ ]`

Twitter 2013 (still 140) · Vine Jan. No Fleets.

### F1 Twitter compose · `itt13-tweets` · R4 · `[ ]`

**Files:** `sites/twitter/{index,about}.html`  
**Steps:** ≤140 + 2 checks (top-10 this year · not the star). Next → Vine (star).  
**Accept:** empty blocked; complete writes; one-thing Vine still green.

### F2 Google Search chip · `itt13-google` · R5 · `[ ]`

One `sites/google/index.html` if ≤ +3. Continuity.

### F3 Wikipedia chip · `itt13-wiki` · R5 · `[ ]`

One page if cap allows.

### F4 Vine · `itt13-vine-posts` · `[x]`

T only.

### F5 Snap persist · `itt13-snap` · R5 · `[ ]`

**Files:** existing `sites/snapchat/`  
**Steps:** Snap + timer. Next → Vine.

### L `[ ]` · T `[ ]`

**Anti:** star Twitter.

---

## 2014 — Twitter + continuity chips · W4 · R3 · lean +3

**Star [x]** WhatsApp · `itt14-wa-install`

### Goals

Twitter 2014. Facebook / YouTube / Google = **chips** (1 HTML each max, or About lines).

**ROI:** R3. Hub +0.3.

**Disk:** 58 HTML · icebucket · whatsapp · no twitter · no facebook · no youtube · no google.

### R0 `[ ]`

Twitter 2014 · Ice Bucket (on disk).

### F1 Twitter · `itt14-tweets` · R4 · `[ ]`

`sites/twitter/index.html`. Next → Ice Bucket.

### F2 Facebook residual · `itt14-fb` · R5 · `[ ]`

`sites/facebook/index.html` — 2014 voice, **not** a 2006 feed rebuild. Next → YouTube chip.

### F3 YouTube residual · `itt14-youtube` · R5 · `[ ]`

One page if ≤ +3. Else About chip.

### F4 Google chip · `itt14-google` · R5 · `[ ]`

Cap rule.

### F5 WhatsApp · `itt14-wa-install` · `[x]`

T only.

### L `[ ]` · T `[ ]`

---

## 2015 — Instagram 2015 · W4 · R2

**Star [x]** Watch · `itt15-watch`

### Goals

Instagram **enters web top 10** this year and **has no 2015 room**. Feed + ads literacy. Not Reels. Not 2016 Stories.

**ROI:** R2. Hub +0.5.

**Disk:** 95 HTML · twitter · facebook · youtube · snapchat · no instagram.

### R0 `[ ]`

Instagram 2015 (ads, more-than-squares) · hide-likes is **2019**. Watch star stays.

### F1 Instagram 2015 feed · `itt15-ig` · R4 · `[ ]`

**Files:** `sites/instagram/{index,about}.html`  
**Steps:** Open feed · like 1 residual + 2 checks (top-10 web this year · not Stories · not Reels). Next → Watch (star).  
**Anti:** Reels · 2016 Stories gold.

### F2 Google chip · `itt15-google` · R5 · `[ ]`

### F3 Wikipedia chip · `itt15-wiki` · R5 · `[ ]`

### F4 Twitter deepen · `itt15-tweets` · R5 · `[ ]`

**Files:** existing `sites/twitter/`  
**Steps:** One compose if thin. Next → Watch.

### F5 Watch · `itt15-watch` · `[x]`

T only.

### L `[ ]` · T `[ ]`

---

## 2016 — Twitter chip · W5 · R4 · lean

**Star [x]** Stories · `itt16-ig-stories` · H0 (51 vs 57) still open

### Goals

Twitter 2016 (140 until Nov 2017). YouTube/Google chips. **Do not** grow past +3. Do not reopen Stories.

**ROI:** R4. Hub +0.1.

**Disk:** 51 HTML worktree · instagram Stories · facebook · no twitter · no youtube · no google.

### R0 `[ ]`

Twitter 2016 · Stories Aug 2 (on disk). Confirm H0 tree (51, not origin 57).

### F1 Twitter 140 · `itt16-tweets` · R4 · `[ ]`

`sites/twitter/index.html` (1 HTML). Next → Stories.

### F2 YouTube chip · `itt16-youtube` · R5 · `[ ]`

1 HTML if ≤ +3.

### F3 Google chip · `itt16-google` · R5 · `[ ]`

### F4–F5 Stories · `itt16-ig-stories` · `[x]`

T only.

### L `[ ]` · T `[ ]`

**Anti:** Allo as gold · restore 57-HTML wiki.

---

## 2017 — chips only · W5 · R5 · gold A

**Star [x]** Face ID · `itt17-faceid` · **do not reopen**

### Goals

Google / Wikipedia / Amazon **continuity chips** on About or one shared `sites/continuity/index.html` (1 HTML).

**ROI:** R5. Year-true already dense. Hub +0.

**Disk:** 49 HTML · facebook · youtube · twitter · instagram.

### R0 `[ ]`

Confirm no year-true mass hole except continuity.

### F1 Google chip · `itt17-google` · R5 · `[ ]`

### F2 Wikipedia chip · `itt17-wiki` · R5 · `[ ]`

### F3 Amazon chip · `itt17-amazon` · R5 · `[ ]`

Labeled “continuity · not 1995 SSL.”

### F4–F5 Face ID · `[x]`

T only.

### L `[ ]` · T `[ ]`

**Anti:** reopen Face ID · invent iPhone X photo.

---

## 2018 — chips only · W5 · R5 · gold A−

**Star [x]** GDPR Manage · `itt18-gdpr` · **do not reopen**

### Goals

Same continuity chips. Accept All still the trap.

**ROI:** R5. YouTube #2 this June table (already on disk). Hub +0.

**Disk:** 48 HTML · gdpr · tiktok · youtube · facebook · twitter.

### F1–F3 Google / Wiki / Amazon chips · R5 · `[ ]`

### F4–F5 GDPR · `[x]`

T only. Accept All never writes.

### L `[ ]` · T `[ ]`

**Anti:** star TikTok · Reels (2020).

---

## 2019 — residuals · W5 · R4 · lean

**Star [x]** Disney+ Continue · `itt19-disneyplus` · trial never writes

### Goals

YouTube / Instagram / Twitter **one residual page each** (year-voice 2019). Wikipedia chip. Prune stays 49 + ≤3.

**ROI:** R4. Hub +0.2.

**Disk:** 49 HTML · disneyplus · tiktok · no youtube · no instagram · no twitter.

### R0 `[ ]`

IG hide-likes Jul 2019 · YouTube habit · Twitter 2019. No COVID. No adult ranks.

### F1 YouTube 2019 habit · `itt19-youtube` · R4 · `[ ]`

`sites/youtube/index.html`. Watch literacy (not a clone forest). Next → Instagram.

### F2 Instagram hide-likes · `itt19-ig` · R4 · `[ ]`

`sites/instagram/index.html`. 2 checks (test · not Reels). Next → Twitter.

### F3 Twitter 2019 · `itt19-tweets` · R4 · `[ ]`

Only if ≤ +3. Else chip on F2.

### F4 Wikipedia chip · `itt19-wiki` · R5 · `[ ]`

### F5 Disney+ · `itt19-disneyplus` · `[x]`

T only. Trial never writes.

### L `[ ]` · T `[ ]`

**Anti:** restore 526-HTML forest.

---

## 2020 — chips only · W5 · R5

**Star [x]** Zoom · `itt20-zoom` · Join ≠ save · **do not reopen**

### Goals

Google / Wikipedia / Facebook continuity chips. Reels/Quibi already here.

**ROI:** R5. Hub +0.

**Disk:** 52 HTML · zoom · youtube · twitter · instagram · tiktok.

### F1 Google chip · `itt20-google` · R5 · `[ ]`

### F2 Wikipedia chip · `itt20-wiki` · R5 · `[ ]`

### F3 Facebook 2020 residual · `itt20-fb` · R5 · `[ ]`

One page — **not** a 2006 feed rebuild. Next → Zoom.

### F4–F5 Zoom · `[x]`

T only. Join never writes.

### L `[ ]` · T `[ ]`

**Anti:** ATT · Jan 6 · Clubhouse mass as default.

---

## 4. Cross-year handoff · R5 · `[ ]` each

| ID | From | To | Honesty |
|----|------|----|---------|
| X1 `[ ]` | 1995 AOL mail | 1996 MSN start | Garden → portal home button |
| X2 `[ ]` | 1996 MSN | 1998 Lucky | Portal still wins; Lucky is the trick |
| X3 `[ ]` | 1998 Lycos | 1998 Lucky | Catalog vs I’m Feeling Lucky |
| X4 `[ ]` | 2003 Walmart | 2000 Amazon smile | Two stores, two years |
| X5 `[ ]` | 2004 Weather | 2000 MapQuest print | Forecast then print directions |
| X6 `[ ]` | 2011 Twitter | 2006 Twitter 140 | Same 140; 2011 is habit, 2006 is birth |
| X7 `[ ]` | 2015 Instagram | 2016 Stories | Feed → 24h |
| X8 `[ ]` | 2013 Twitter | 2013 Vine | Top-10 text vs 6s loop (star) |

Each: one href + “which year owns the product” line + no foreign `ittYY-*` writes.

---

## 5. Year-done gate (copy)

A year is **popular-pack done** when:

1. `docs/YYYY-POPULAR-HARVEST.md` has the F-names’ source URLs **[x]**  
2. F1–F5 keys write only on complete **[x]**  
3. Home has chips · guided ol still 6 · star unchanged **[x]**  
4. Next chain F1→…→star **[x]**  
5. urlMap + map leaf exist **[x]**  
6. `e2e/YYYY-popular-live.spec.js` green **[x]**  
7. one-thing YYYY still green **[x]**  
8. `check-all-years` + link audit **[x]**  
9. Lean years: HTML ≤ start+3 **[x]**  
10. This file’s year F-rows marked **[x]**

---

## 6. Suggested first words

```
implement popular 1995 AOL
implement popular 1996 MSN
implement popular 1997 BBC
implement popular 2013 Twitter
implement popular 2015 Instagram
```

Do not say `implement popular all years`.
