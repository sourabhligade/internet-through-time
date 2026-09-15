# Leftover-3× · unique-flow criteria

**Date:** 2026-09-15  
**Status:** Criteria + unique leftover dests implemented 2026-09-15. Not dest-farm. Not ship law.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · `scripts/itt_gate.py` `SHIP_YEARS`.  
**Template:** [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) — 30 unique dests, 30 unique verbs, 30 unique keys.  
**I/O:** [`2016-2021-IO-CRITERIA.md`](2016-2021-IO-CRITERIA.md) I1–I14 · [`2013-IO-CRITERIA.md`](2013-IO-CRITERIA.md).  
**Mock:** `scripts/audit-mock-flows.js` — `DEST_FIELD` / `WEAK_REAL` / `HASH_CTA` fail.  
**Years:** ship years **1994–2008 + 2010–2019 + 2021–2022**. **2009 boarded.** **2020 wiped.** **2023+ wiped.**

Leftover-3× here means **first / second / third leftover dests**, not three machines on one dest. Counting `pop` + `pop2` + `pop3` on Pizza Hut is **not** unique.

Deep-research is a companion pass. This file is the pass/fail map.

---

## 1. One-line law

**Each leftover-3× flow is one dest, one verb, one key. No dest twice. Incomplete never writes. Leftover never writes the star.**

First, second, and third are **three leftover dests** (or three leftover dests per strip). They are **not** official dests. They are **not** `*-d2` / `lx` clones. They are **not** mock.

| | What leftover-3× is | What it is not |
|--|---------------------|----------------|
| First | `ittYY-pop-<id>` on its **own** leftover dest | Official dest + `?deep=1` |
| Second | `ittYY-pop2-<id>` on a **different** leftover dest | `data-pop-key=pop2-<same-slug>` stacked under first |
| Third | `ittYY-pop3-<id>` on a **different** leftover dest | `popular-3x3` sitting on official 10 |
| Face | Dest-true cream `#fff8dc` / `1px solid #333`: keep vs trap · field · 2 checks · Go | Factory `data-dest-field` plaque · hash CTA · “Go Safari” |

---

## 2. Pass / fail (every leftover-3× flow)

A leftover-3× flow **fails** if any row is N. One miss is a fail.

| # | Criterion | Pass | Fail |
|---|-----------|------|------|
| **U1** | Unique dest | One folder / one href | First + second + third on Pizza Hut / LiveJournal / Ask.fm |
| **U2** | Unique key | One `ittYY-pop*` per dest | `pop` + `pop2` + `pop3` on the same dest · `lx` + `d2` counted as flows |
| **U3** | Unique verb | Period action for **that** dest | Shared cream host + different H1 only · “Go Safari” cloned |
| **U4** | No official overlap | Leftover dest ∉ official 10 hrefs | Third strip is Yahoo / Fortnite / TikTok / GDPR |
| **U5** | Count | Official 10 + leftover dests = a **set** | 150 leftover-2× clone keys as “unique” |
| **U6** | Star | Only the year chip writes gold | Leftover-3× writes `itt13-vine-posts` / `itt18-gdpr` / `itt22-chatgpt` |
| **U7** | Incomplete | Empty / 0 ticks / no pick never writes | Any click writes leftover key |
| **U8** | Trap | Official-as-gold / neighbor year never writes leftover | Trap = save |
| **U9** | Fold | Official dest leftover-3× hidden unless `?deep=1` · leftover dest face visible without `?deep=1` · Starting Point leftover-3× not first paint | Yellow leftover-3× on GDPR first paint · leftover dest face folded |
| **U10** | No invented pixels | failed-final / capture-cite | AI brand mark |
| **U11** | Year lock | That year’s products only | 2018 TikTok US as 2017 leftover · ChatGPT dest in 2021 · Reels as 2018 gold |
| **M1** | Not `DEST_FIELD` | No factory dest-field plaque as the leftover-3× save | Period note + theater check + `data-dest-field` + Save |
| **M2** | Not `WEAK_REAL` | ≥2 required ticks · save is not “I saw / I watched” | `data-min-req` < 2 |
| **M3** | Not `HASH_CTA` | Action has a `data-*` hook | `href="#"` action word |
| **M4** | Dest-true face | keep vs trap · required field · 2 honesty checks · Go | Checkbox theater with no field · pack-only `twoClick` as unique |

`UNWIRED` / `PACK` are **warn**, not unique-flow pass. Prove dead with e2e. Do not call a PACK leftover dest a unique flow.

---

## 3. Minimum unique leftover-3×n map

Do **not** dest-farm to hit the count. Prefer dests **already on disk**. If a year cannot pass without new dests, **stop**.

| Strip | Dest count | Key shape | Catalog today |
|-------|----------:|-----------|---------------|
| First | **3** leftover dests | `ittYY-pop-<id>` | `scripts/popular-3x-sites.json` |
| Second | **3** leftover dests | `ittYY-pop2-<id>` | **No catalog.** Today = `pop2` stacked on the first dest |
| Third | **3** leftover dests | `ittYY-pop3-<id>` | `scripts/popular-3x3-sites.json` |
| **Leftover-3×n** | **9** leftover dests | 9 keys | — |
| Official 10 | **10** (already shipped) | `flow-trails.js` n=1–10 | not leftover-3× |
| **Year unique set** | **19** dests (10 + 9) | 19 keys | 2017 unique leftover-20 is a **different** map (30 total) |

2017 already has **30 unique dests** (10 official + 20 leftover). That map wins for 2017 leftover uniqueness. Leftover-3× first/third on 2017 that reuse official dests or those 20 leftover dests **fail U1 / U4**. Do not add a second leftover museum on top of the 30.

Second strip is **not named** as unique dests (`e2e/2013-2018-leftover-dest-true.spec.js`: “Second leftover-3× strip is not named”). Stacked `pop2` is workshop.

---

## 4. Disk now (2026-09-15)

Catalogs: `scripts/popular-3x-sites.json` (first) · `scripts/popular-3x3-sites.json` (third). Official 10: `js/config/flow-trails.js` n=1–10. Dest counts: folders under `years/YYYY/sites/`.

**How to read:** first∩off / third∩off / first∩third > 0 = unique **fail**. Missing dest = unique **fail**. Empty catalog = leftover-3×n map **not written**.

| Year | Dest folders | First | Second | Third | Unique leftover-3×n |
|------|-------------:|------:|-------:|------:|---------------------|
| 1994–2006 + 2008 | forest | stacked | stacked | stacked | **Workshop.** Forests stay stacked `pop`/`pop2`/`pop3`. |
| **2007** | 23 | 3 | 3 | 3 | **Pass 9** · wiki / myspace / maps · ebay / stumble / wow · flickr / reddit / digg |
| **2010** | 22 | 3 | 3 | 3 | **Pass 9** · netflix / tumblr / formspring · chrome / wave / android · reddit / google / groupon |
| **2011** | 31 | 3 | 3 | 3 | **Pass 9** · icloud / pinterest / linkedin · kindlefire / minecraft / twitch · youtube / dropbox / hulu |
| **2012** | 24 | 3 | 3 | 3 | **Pass 9** · drawsomething / googledrive / snapchat · uber / buzzfeed / youtube · reddit / surface / windows8 |
| **2013** | 54 | 3 | 3 | 3 | **Pass 9** · askfm / whisper / youtube · chrome / medium / yikyak · reddit / facebook / twitter |
| **2014** | 17 | 3 | 3 | 3 | **Pass 9** · snapchat / instagram / uber · twitter / musically14 / truecrypt · facebook / wikipedia / youtube |
| **2015** | 26 | 3 | 3 | 3 | **Pass 9** · instagram / spotify / netflix · meerkat / applemusicsub / win10get · vine / echo / youtube |
| **2016** | 21 | 3 | 3 | 3 | **Pass 9** · slack / reddit / netflix · youtube / alphago / assistant · dyn / fblive / moments |
| **2017** | 40 | — | — | — | **Not leftover-3×.** Unique leftover-20 already shipped. Do not add a second map. |
| **2018** | 13 | **3** | 0 | 0 | **First 3 only** · reddit / youtube / wikipedia. Cannot pass 9 without new dests. **Stop.** |
| **2019** | 19 | 3 | 3 | 3 | **Pass 9** · amazon / facebook / google · instagram / nyt / oculusquest · twitter / yahoo / youtube |
| **2021** | 15 | 3 | 2 | 0 | **5 leftover dests** · amazon / google / instagram · twitter / youtube. Cannot pass 9. **Stop.** |
| **2022** | 85 | 0 | 0 | 0 | **Map not written.** Do not invent the 9 dests. |

**2009 / 2020** appear in leftover-3× catalogs. **Ignore.** 2009 is boarded. 2020 is wiped. Catalog rows are not visitor flows.

---

## 5. Years that can pass on dests already on disk

Do not pick the dests in this file unless a later implement pass is named.

| Year | Can 9 unique leftover dests fit without adding folders? | Note |
|------|:--:|------|
| 2013 | **Yes — shipped 9** | first `askfm` `whisper` `youtube` · second `chrome` `medium` `yikyak` · third `reddit` `facebook` `twitter` |
| 2017 | Use the **existing 20** leftover dests. Do not add leftover-3× dests. | [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) §4.2 |
| 2018 | **No** | 13 dests = official 10 folders + first 3. Third is official. Stop. |
| 2021 | **No** | 5 leftover dest folders shipped as leftover-3× first 3 + second 2. Stop. |
| 2022 | **Capacity yes** (75 leftover dest folders). **Map no.** | Catalogs empty. Unique leftover-20 is explicitly not this pass (`2022-RESEARCH-MAP.md`). Do not invent dests. |
| Forests 1994–2006 + 2008 | Capacity yes. Unique leftover-3×n **not the forest job.** | Forests stay dense. Stacked first+second+third is workshop. Do not dest-lock forests. |
| Dest-locked lean 2007 / 2010–2012 / 2014–2016 / 2019 | **Shipped 9 unique leftover dests each** on dests already kept. | Do not add dests. Do not dest-lock 2013 / 2018 / 2022. |

---

## 6. Look (leftover dest face)

Visitor leftover dest (not official, not Starting Point):

1. Room title is the dest name.
2. One cream panel `#fff8dc` · `border: 1px solid #333` · `data-itt-lo3x` / `.itt-pop3x-flow`.
3. Line: `<dest> · incomplete never writes · <code>ittYY-pop-<id></code>`.
4. Keep button + trap button (official-as-gold / neighbor).
5. Required field.
6. Two honesty checks (year lock · empty/trap never writes).
7. Go.
8. Official 10 step list may sit **below**. It is not leftover-3×.

**Fail look:** three cream boxes on one dest (1994 Pizza Hut). Dashed leftover-2× `lx`/`d2` under leftover-3× (2013 Ask.fm) is leftover-2× warehouse, not a second leftover-3× dest.

Official dest leftover-3× stays workshop (`?deep=1`). 2018 GDPR first paint is the cookie banner, not a cream leftover-3× box.

Starting Point leftover-3× strips (`.itt-pop3x`) fold into **Also this year**. Not first paint.

---

## 7. Sequence (do in order)

Do not skip ahead to dest-farm. Do not invent dests.

| Step | Work | Done when |
|------|------|-----------|
| **0** | This file is the leftover-3× unique-flow law | **Done** |
| **1** | Treat stacked `pop`/`pop2`/`pop3` and official-dest leftover-3× as workshop | **Done** · forests stay stacked workshop |
| **2** | 2017 leftover uniqueness stays the 30 dests | **Done** · leftover-3× not a second map |
| **3** | 2013 unique leftover-3×n = 9 dests | **Done** · first `askfm` `whisper` `youtube` · second `chrome` `medium` `yikyak` · third `reddit` `facebook` `twitter` |
| **4** | 2018 first 3 stay leftover dests. Third stays official workshop. **Do not add dests** | **Done** · 13 dest folders unchanged |
| **5** | 2021 leftover dests that exist (5) · 2022 map stays **unwritten** | **Done** · no invented dests |
| **6** | Mock gate stays red on `DEST_FIELD` / `WEAK_REAL` / `HASH_CTA` | `audit-mock-flows.js` exit 1 |
| **7** | e2e unique leftover dest empty never writes · complete writes **that** leftover key · never star | **Done** · `e2e/leftover-3x-unique.spec.js` |
| **H** | Dest-lock only where already allowed | Not 2013 / 2018 / 2022 · not forests · not 2009 |

Implement leftover-3× unique dests **only when named**. Criteria is not a license to add rooms.

---

## 8. Do not

- Call stacked first+second+third on one dest “unique leftover-3×n.”
- Use `*-d2` / `lx` / leftover-2× warehouse as leftover-3× unique flows.
- Count official dest leftover-3× (`?deep=1`) as leftover dests.
- Write a 2022 unique leftover-9 / leftover-20 dest list in this file.
- Add dests to 2018 or 2021 to “make 9.”
- Dest-lock 2013 / 2018 / 2022.
- Dest-lock forests 1994–2006 + 2008.
- Restore 2009 as playable · restore 2020 / 2023+.
- Invent brand pixels.
- Let leftover-3× write the year star.
- Treat 2017 leftover-3× catalogs as a second unique map on top of the 30.

---

## 9. Related

| Doc | Role |
|-----|------|
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | Playable years · dest-lock counts |
| [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) | Only shipped unique leftover map |
| [`2016-2021-IO-CRITERIA.md`](2016-2021-IO-CRITERIA.md) | Visitor I/O I1–I14 |
| [`2013-IO-CRITERIA.md`](2013-IO-CRITERIA.md) | Vine star · unique leftover-20 not written |
| [`2022-RESEARCH-MAP.md`](2022-RESEARCH-MAP.md) | Unique leftover-20 not this pass |
| [`UNDONE.md`](UNDONE.md) | Years with no unique leftover dest map |
| [`FLOW-IMPLEMENT-CHECKLIST.md`](FLOW-IMPLEMENT-CHECKLIST.md) | Leftover dest leftover-3× dest face E1–E9 |
| `scripts/popular-3x-sites.json` | First-strip catalog (not unique-checked) |
| `scripts/popular-3x3-sites.json` | Third-strip catalog (mostly official) |
| `js/config/flow-trails.js` | Official 10 |
| `scripts/audit-mock-flows.js` | Mock classes |
