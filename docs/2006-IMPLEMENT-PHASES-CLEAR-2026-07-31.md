# 2006 — Clear implementation phases (goals · sources · steps · files · acceptance)

**Date:** 2026-07-31  
**Purpose:** Self-contained **implement bible** so 2006 can be built without hunting scattered research MDs — same shape as [`2005-IMPLEMENT-PHASES-CLEAR-2026-07-31.md`](2005-IMPLEMENT-PHASES-CLEAR-2026-07-31.md).  
**Disk truth:** `years/2006/` **ABSENT** · hub **1994–2005 only** · research freeze re-verified **2026-07-31**.  
**Fresh research:** [`2006-DEEP-RESEARCH-FRESH-2026-07-31.md`](2006-DEEP-RESEARCH-FRESH-2026-07-31.md)

| Status mark | Meaning |
|-------------|---------|
| **[x]** | Done on disk / freeze complete |
| **[ ]** | Open work |
| **[~]** | Optional forever (does not block ship) |

**Rule:** One phase at a time unless marked *parallel-ok*. Never invent brand pixels. Git only on user request. **Do not unlock hub until Phase 8.**

---

## 0. How to use this file

| Section | Meaning |
|---------|---------|
| **Goal** | What “done” means |
| **Sources** | Exact URLs + repo paths to open first |
| **Steps** | Ordered checklist |
| **Files** | Paths you will touch |
| **Acceptance** | Pass/fail before next phase |
| **Tests** | Commands / e2e |

### Bible stack (read order)

| # | Doc | Use |
|---|-----|-----|
| 1 | **This file** | Phase order · steps · acceptance |
| 2 | [`2006-DEEP-RESEARCH-FRESH-2026-07-31.md`](2006-DEEP-RESEARCH-FRESH-2026-07-31.md) | Thesis · timeline · bans · product kits |
| 3 | [`2006-RESEARCH.md`](2006-RESEARCH.md) | Canonical bans · P0 map |
| 4 | [`2006-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2006-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md) | Prior gather |
| 5 | `docs/references/2006/wayback-extracts/*` | Period copy notes |
| 6 | [`references/2006/CAPTURE-LOG.md`](references/2006/CAPTURE-LOG.md) · [`ASSETS.md`](references/2006/ASSETS.md) | Harvest honesty |
| 7 | Parent patterns | `years/2005/` · `js/immersion/*` · `itt05` → `itt06` |
| 8 | [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content · single boot |

### Visitor outcome (when phases hold — not live yet)

```
Hub → 2006 (XP · IE6 · late IE7 story)
  → About: ~85.5M sites · social breakthrough · bans
  → Twitter/Twttr: What are you doing? · 140 · timeline
  → Facebook: News Feed · open registration (Sep 26)
  → YouTube: Flash upload · Google deal Oct/Nov honesty
  → Digg peak · Google Docs · AWS S3/EC2 about
  → Continuity: MySpace · Flickr · Maps · Reddit · Yahoo · Amazon
```

### Hard rules (every phase)

1. **`storagePrefix = itt06`**  
2. Content pages load **only** `js/immersion-2006.js`  
3. Keep every `data-*` hook when densifying  
4. Period voice — no “Museum theater” lead copy  
5. Never invent brand pixels — WA / WDM / CONTINUITY / RECON only  
6. Shell = **XP + IE6** default; IE7 is product room / late story  
7. YouTube **independent** until Oct/Nov 2006 honesty  
8. Facebook **open** only after **Sep 26** as product truth  
9. **Bans:** iPhone · Chrome · Street View default · Gmail open-as-year-start · Vista retail default · modern X  
10. Gates green before next phase · Git only if asked  

### Global gates (when code exists)

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2006-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## Phase map

| Phase | Name | Est. | Blocks | Status |
|------:|------|------|--------|--------|
| **0** | Inventory freeze | S | Everything | **[x]** re-verify 2026-07-31 |
| **1** | Research lock | S | Content copy | **[x]** |
| **2** | Harvest P0 extracts + assets prep | M–L | Visual identity | **[ ]** |
| **3** | Scaffold shell + config from 2005 | M | Boots | **[ ]** hub locked |
| **4** | Home / About / tour / dirbar | S–M | Thesis | **[ ]** |
| **5** | P0 Twitter | L | Signature | **[ ]** |
| **6** | P0 Facebook Feed + open | L | Signature | **[ ]** |
| **7** | P0 YouTube two-era | L | Signature | **[ ]** |
| **8** | P0 Digg peak | M | Signature | **[ ]** |
| **9** | P0/P1 Docs + AWS | M | Platform story | **[ ]** |
| **10** | Continuity honesty densify | M | Year truth | **[ ]** |
| **11** | Immersion hooks + storage | M | Live flows | **[ ]** |
| **12** | Auth + e2e | M | Quality | **[ ]** |
| **13** | Hub unlock + docs | S | Ship label | **[ ]** |
| **14** | Optional pixels forever | M | Absolute pixels | **[~]** |

**MVP ship** = phases **0–13**.  
**Order:** 0 → 1 → 2 → 3 sequential. After Phase 3, P0 brands **5–8** can run *parallel-ok* brand-by-brand.

---

# Phase 0 — Inventory freeze

### Goal
Know exact state so work is research→scaffold, not accidental half-build.

### Sources

| Source | Path |
|--------|------|
| Live tree | `years/2006/` must be **missing** |
| Research | `docs/2006-*.md` |
| Parent | `years/2005/` · `js/config/immersion-2005.js` |

### Steps

- [x] Confirm `years/2006/` absent  
- [x] Confirm hub has no open 2006 card (locked / planned)  
- [x] Confirm research freeze docs exist  
- [x] Confirm parent 2005 museum complete  
- [x] Note `storagePrefix` target: **`itt06`**  

### Acceptance

- [x] No partial 2006 year tree  
- [x] Research companions linked  

### Tests

```bash
test ! -d years/2006 && echo "no tree OK"
ls docs/2006-RESEARCH.md docs/2006-DEEP-RESEARCH-FRESH-2026-07-31.md
```

---

# Phase 1 — Research lock

### Goal
Lock facts used in About/Home/copy so implement never invents dates.

### Locked facts (do not change without primary)

| Fact | Value |
|------|--------|
| Sites | **85,507,314** |
| Users class | **1,160,335,280** |
| Twitter first | **Mar 21 2006** *just setting up my twttr* |
| Twitter public | **Jul 15 2006** |
| Facebook Feed | **Sep 5–6 2006** |
| Facebook privacy | **Sep 8 2006** |
| Facebook open | **Sep 26 2006** · 13+ · email · regional networks |
| Google→YouTube announce | **Oct 9 2006** · **$1.65B** stock |
| YouTube close | **Nov 13 2006** |
| Docs & Spreadsheets | **Oct 10 2006** |
| Writely acquire | **Mar 9 2006** |
| S3 | **Mar 14 2006** |
| EC2 | **Aug 2006** class |
| IE7 | **Oct 18 2006** |
| Vista RTM | **Nov 8 2006** · retail **Jan 30 2007** ban |
| Shell | XP + **IE6** default |
| Prefix | **itt06** |

### Hard bans (lock)

- [x] No iPhone · Chrome · Street View default  
- [x] No Gmail open-as-year-start · Vista retail default  
- [x] No Google owns YouTube before Oct/Nov  
- [x] No modern X · Instagram · TikTok  

### Sources

- Fresh research §0–§5  
- Cybercultural · Live Stats · SEC YouTube · FB newsroom · History.com Twitter · AWS press  

### Acceptance

- [x] Thesis one-liner match  
- [x] Bans memorized  
- [x] P0 list: Twitter · Facebook · YouTube · Digg (+ Docs/AWS for platform spine)  

---

# Phase 2 — Harvest P0 extracts + assets prep

### Goal
On-disk period copy + honest pixel attempts before building UI.

### Sources

| Target | Where |
|--------|--------|
| CAPTURE-LOG | `docs/references/2006/CAPTURE-LOG.md` |
| WDM | Twitter 2006 · YouTube 2006 · IE7 |
| WA windows | twitter 2006-07–12 · facebook 2006-09–11 · youtube 2006-06 & 2006-11 · digg 2006 |
| PR | SEC YouTube · FB Sep 26 · Amazon S3 Mar 14 |

### Steps

- [ ] Create `assets/period/2006/` only after first provenanced binary  
- [ ] Save WA text extracts under `wayback-extracts/` for Twitter · FB · YT · Digg  
- [ ] Log every attempt in CAPTURE-LOG (`[wa]` / `[failed]` / `[queued]`)  
- [ ] WDM screenshot notes (Cloudflare may block — keep prior visits)  
- [ ] Update `ASSETS.md` rows — never claim RECON as WA  

### Files

```
docs/references/2006/CAPTURE-LOG.md
docs/references/2006/ASSETS.md
docs/references/2006/wayback-extracts/*
assets/period/2006/   # only with provenance
```

### Acceptance

- [ ] ≥1 extract file each for Twitter, Facebook, YouTube, Digg product UI words  
- [ ] No invented logo.gif claimed as authentic  

---

# Phase 3 — Scaffold year tree + configs from 2005

### Goal
Bootable `years/2006/` shell; hub **still locked**.

### Sources

| Source | Take |
|--------|------|
| `years/2005/` | Structure scaffold |
| `js/config/2005.js` · `immersion-2005.js` | Patterns → 2006 |
| `js/immersion/registry.js` | Add `"2006": [...]` |
| `docs/ARCHITECTURE.md` | Config over forks · single boot |
| Fresh research §6 | XP+IE6 labels |

### Steps

- [ ] `cp -R years/2005 years/2006` then year-string retarget  
- [ ] `data-itt-year="2006"` · titles IE6 / XP  
- [ ] `js/config/2006.js` · `immersion-2006.js` with **`storagePrefix: "itt06"`**  
- [ ] Thin `browser-2006.js` · `immersion-2006.js` stubs  
- [ ] Registry FEATURES_BY_YEAR 2006 (start with 2005 list + twitter · docs · aws later)  
- [ ] `css/period-2006.css` `@import period-2005.css` + deltas  
- [ ] Manual boot `/years/2006/` — **do not** unlock hub  

### Acceptance

- [ ] Shell loads · skip connect works  
- [ ] Only immersion-2006 boot on content pages  
- [ ] Hub 2006 still unavailable  

### Tests

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2006/
grep -n storagePrefix js/config/immersion-2006.js  # itt06
```

---

# Phase 4 — Home / About / tour / dirbar

### Goal
Thesis spine + navigation to P0.

### Sources

Fresh research §0–1 · Live Stats · Cybercultural · parent `years/2005/pages/*`

### Steps

- [ ] Rewrite home/about: **85,507,314** · social breakthrough · bans box  
- [ ] Tour: Twitter → Facebook Feed → YouTube → Digg → Docs → AWS  
- [ ] Dirbar: Start · Twitter · Facebook · YouTube · Digg · Docs · MySpace · Google  
- [ ] Four trails copy (microblog · social feed · video ownership · UGC/cloud)  

### Files

```
years/2006/pages/home.html
years/2006/pages/about.html
years/2006/index.html
js/config/immersion-2006.js
```

### Acceptance

- [ ] Scale number exact  
- [ ] Bans present  
- [ ] Dirbar not leftover 2005 YouTube-first without Twitter  

---

# Phase 5 — P0 Twitter / Twttr

### Goal
Sparse 2006 Twttr: compose 140 · timeline · about first tweet / Jul 15 public.

### Sources

| Source | Path / URL |
|--------|------------|
| Fresh kit | §5.1 |
| History.com | Jul 15 launch |
| Wikipedia History of Twitter | Mar 21 · Jul 15 |
| WDM Twitter 2006 | gallery |
| Extract | `wayback-extracts/twitter-*.txt` |

### Steps

- [ ] Pages: `index.html` · `update.html` or compose on index · `about.html`  
- [ ] Hooks: `data-twitter-compose` · `data-twitter-timeline` · status  
- [ ] Module: `js/immersion/twitter.js` · key **`itt06-tweets`**  
- [ ] Copy: “What are you doing?” · 140 limit enforce in UI  
- [ ] Seed: optional first-tweet lore on about only  
- [ ] Registry + features.twitter  

### Acceptance

- [ ] Compose mutates `itt06-tweets`  
- [ ] Timeline shows posts  
- [ ] No modern X chrome  

### Tests

```bash
# after implement
npx playwright test e2e/2006-twitter.spec.js --workers=1  # create with phase
```

---

# Phase 6 — P0 Facebook News Feed + open

### Goal
Feed is the product; open registration honesty after Sep 26.

### Sources

FB Expansion PR Sep 26 · Privacy controls Sep 8 · Wikipedia Feed · 2005 facebook rooms as scaffold

### Steps

- [ ] Pages: index (feed) · profile · about · networks/open  
- [ ] Evolve `facebook.js` for feed list + open framing (or year flags)  
- [ ] Keys under `itt06` (not hard-coded itt04/05 only)  
- [ ] About: Feed Sep 5–6 · privacy Sep 8 · open Sep 26 · 13+ · regional networks  
- [ ] Ban modern Facebook chrome  

### Acceptance

- [ ] Feed list persists/mutates localStorage  
- [ ] Open registration stated as **Sep 26 2006** product fact  
- [ ] Pre-Sep gated story only as history, not current default  

---

# Phase 7 — P0 YouTube two-era

### Goal
Flash upload/watch continuity + ownership flip Oct 9 / Nov 13.

### Sources

SEC dex991.htm · Wikipedia History of YouTube · 2005 youtube rooms · WDM YouTube 2006

### Steps

- [ ] Copy structure from `years/2005/sites/youtube/`  
- [ ] `itt06-yt-uploads` / views via storagePrefix  
- [ ] About: independent early year · **$1.65B** Oct 9 · close Nov 13 · brand independent  
- [ ] Do **not** put “owned by Google” as year-start default  

### Acceptance

- [ ] Upload → list → watch works  
- [ ] Ownership dates accurate  
- [ ] e2e bans: no “Google owns YouTube in early 2006” as fact  

---

# Phase 8 — P0 Digg peak

### Goal
2006 peak front page · digg/bury · power-law honesty · algorithm drama note.

### Sources

Cybercultural Digg section · WA digg 2006 · digg.js year-aware pattern

### Steps

- [ ] Rooms from 2005 digg scaffold  
- [ ] `itt06-digg-links` · comments optional  
- [ ] About: surpasses Slashdot lore · power diggers · Sep diversity update  
- [ ] Seeds: 2006-appropriate (no anachronistic 2007 phones)  

### Acceptance

- [ ] digg/bury mutates storage  
- [ ] Peak-year copy present  

---

# Phase 9 — Docs + AWS (platform spine)

### Goal
Web office + developer cloud birth — optional-depth P0/P1.

### Sources

TechCrunch Docs Oct 10 · Amazon S3 Mar 14 press · AWS blogs · Cybercultural cloud section

### Steps

- [ ] `sites/docs/` or `sites/googledocs/` — collab title/body theater `itt06-docs`  
- [ ] `sites/aws/` — S3 bucket / EC2 “launch” educational theater  
- [ ] Amazon continuity room links to AWS about  
- [ ] Honesty: developer cloud · not mass consumer “the cloud” brand  

### Acceptance

- [ ] Docs save localStorage  
- [ ] AWS about has Mar 14 S3 · Aug EC2 class dates  

---

# Phase 10 — Continuity honesty densify

### Goal
MySpace mass · Flickr Yahoo · Maps pre–Street View · Reddit under Digg · Gmail invite flavor · IE7/Firefox download rooms.

### Steps

- [ ] Year-bump 2005 continuity rooms with 2006 copy  
- [ ] Reader Sep redesign optional room  
- [ ] Time “You” on About / CNN culture beat  
- [ ] Keep all `data-*` hooks  

### Acceptance

- [ ] No Street View default  
- [ ] No Gmail “open to all” as year default  
- [ ] MySpace still mass king language  

---

# Phase 11 — Immersion hooks + storage audit

### Goal
All signature flows write/read **`itt06-*`**.

| Product | Keys |
|---------|------|
| Twitter | `itt06-tweets` |
| YouTube | `itt06-yt-uploads` · `itt06-yt-views` |
| Digg | `itt06-digg-links` |
| Docs | `itt06-docs` |
| Facebook | year-aware facebook keys |
| Maps / etc. | prefix from config |

### Acceptance

- [ ] `storagePrefix: "itt06"`  
- [ ] Manual DevTools check each P0 flow  
- [ ] Use `ITT.util.immersionStorageKey`  

---

# Phase 12 — Auth + e2e

### Goal
Automated proof of period truth + real local flows.

### Steps

- [ ] Authenticity: 2006 signature · urlMap · no anachronism · bans  
- [ ] e2e: `2006-mvp` · buttons · twitter · facebook · youtube · digg · real-flows  
- [ ] hub-years: 2006 available only after Phase 13  

### Acceptance

- [ ] authenticity green for 2006  
- [ ] e2e green  

---

# Phase 13 — Hub unlock + docs

### Goal
Lobby presents 2006 as available; DISK-TRUTH / MUSEUM-GRADE honest.

### Steps

- [ ] Unlock year card in `index.html`  
- [ ] Update `DISK-TRUTH.md` · `2006-MUSEUM-GRADE.md` · README table  
- [ ] sitemap / check-all-years  

### Acceptance

- [ ] Hub → 2006 works  
- [ ] `check-all-years` lists 2006 pass  

---

# Phase 14 — Optional pixel polish **[~]**

WDM/WA crops for Twitter bird era · FB Feed chrome · YT 2006 · Digg · IE7 icons.  
**Ship does not depend on this.**

---

## Residual vs ship

| Item | Status |
|------|--------|
| Research freeze + fresh deep pass | **[x]** |
| WA bulk harvest | **[ ]** Phase 2 |
| Year tree | **[ ]** Phase 3+ |
| Hub unlock | **[ ]** Phase 13 |

---

*Educational reconstruction only. When in doubt: open the primary, log CAPTURE, keep data-* hooks, re-run gates.*
