# 2006 — Implementation goals, phases, how-to, and period user flows

**Date:** 2026-07-31  
**Purpose:** One clear playbook: **what we’re building**, **phased steps**, **how each phase is achieved**, and **every visitor user flow that matches real 2006 internet use**.  
**Disk truth:** `years/2006/` **MVP open** (2026-07-31) · hub **1994–2006**. This file remains the implement + visitor-flow bible.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. All “apps” are **localStorage theater** (no real tweets, video CDN, map tiles, AWS APIs, accounts, or payments).

| Companion | Role |
|-----------|------|
| [`2006-RESEARCH.md`](2006-RESEARCH.md) | Thesis · timeline · bans · P0 map |
| [`2006-DEEP-RESEARCH-FRESH-2026-07-31.md`](2006-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · minute timeline · sources |
| [`2006-IMPLEMENT-PHASES-CLEAR-2026-07-31.md`](2006-IMPLEMENT-PHASES-CLEAR-2026-07-31.md) | Shorter phase checklist |
| [`references/2006/ARTIFACTS-MAP.md`](references/2006/ARTIFACTS-MAP.md) | Rooms · modules · residual R-list |
| [`references/2006/CAPTURE-LOG.md`](references/2006/CAPTURE-LOG.md) · [`wayback-extracts/`](references/2006/wayback-extracts/) | Harvest + copy banks |
| [`2006-MUSEUM-GRADE.md`](2006-MUSEUM-GRADE.md) | Ship / freeze status |
| Parent year | [`2005-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2005-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) · live `years/2005/` |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content · single boot · no engine forks |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done (research freeze / inventory) |
| **[ ]** | Open implement work |
| **[~]** | Optional forever (does not block ship) |

---

## 0. Overall goal

### 0.1 One-line goal

Build a **museum-grade 2006 Web immersion**: Windows XP + Internet Explorer 6 shell (IE7 as late-year story), period sites, and **real local interactions** that recreate how people actually used the internet in calendar year **2006**.

### 0.2 Visitor outcome (done means this)

```
Hub → open 2006
  → XP desktop + IE6 (Address bar · Favorites · broadband)
  → Starting Point / About: ~85.5M sites · social breakthrough · hard bans
  → Twitter/Twttr: “What are you doing?” · 140 chars · timeline
  → Facebook: News Feed · open registration (Sep 26) · privacy note
  → YouTube: Flash upload/watch · Google deal Oct/Nov honesty (not year-start)
  → Digg: digg it / bury · peak UGC year · power-law honesty
  → Google Docs: collaborative web office (Oct 10)
  → AWS about: S3 Mar 14 · EC2 Aug (developer cloud)
  → Continuity: MySpace mass · Flickr Yahoo · Maps (no Street View)
                 Reddit under Digg · Yahoo · Amazon smile · Wikipedia
  → Optional: Google Reader · IE7 download · Time “You” culture
```

### 0.3 Year thesis (copy must match)

**2006 is when the social web breaks through and platform power begins:**

- **Twitter / Twttr** is born (first tweet Mar 21 · public Jul 15).
- **Facebook** ships **News Feed** (Sep 5–6) and **opens to everyone** (Sep 26).
- **Google buys YouTube** for **$1.65B** (announce Oct 9 · close Nov 13) — late year only.
- **Digg** is the UGC front-page king (power diggers · algorithm drama).
- **Amazon** invents developer **cloud** (S3 Mar 14 · EC2 Aug).
- **Google** builds a **web office** (Writely Mar 9 · Docs & Spreadsheets Oct 10).
- *Time* names **“You”** Person of the Year (UGC culture).
- Still **pre-smartphone**, **XP + IE6** mass default; **IE7** Oct 18; Vista RTM Nov **not** retail mass.

Mood: platform centralization after 2005’s decentralized Web 2.0 boom — fat laptops, not phones.

### 0.4 Locked facts (do not invent)

| Fact | Value |
|------|--------|
| Websites | **85,507,314** (June 2006 · Internet Live Stats) |
| Internet users (class) | **1,160,335,280** |
| YoY site growth | **+32%** from 2005 |
| Twitter first post | **Mar 21 2006** · “just setting up my twttr” |
| Twitter public | **Jul 15 2006** |
| Facebook News Feed | **Sep 5–6 2006** |
| Facebook privacy controls | **Sep 8 2006** |
| Facebook open registration | **Sep 26 2006** · 13+ · valid email · 500+ regional networks |
| Google → YouTube announce | **Oct 9 2006** · **$1.65B** stock |
| YouTube deal close | **Nov 13 2006** |
| Writely → Google | **Mar 9 2006** |
| Docs & Spreadsheets | **Oct 10 2006** |
| Amazon S3 | **Mar 14 2006** |
| Amazon EC2 | **Aug 2006** class |
| IE 7 public | **Oct 18 2006** |
| Vista RTM | **Nov 8 2006** · retail **Jan 30 2007** (ban as default) |
| Shell default | **Windows XP + IE 6** |
| Storage prefix | **`itt06`** |

### 0.5 Hard bans (never as 2006 default)

| Ban | Why / correct era |
|-----|-------------------|
| iPhone / App Store | 2007 / 2008 |
| Chrome browser | Sep 2008 |
| Street View as Maps default | May 2007 |
| Gmail open-to-all as year-start fact | Feb 14 2007 |
| Vista as mass retail default shell | Jan 30 2007 GA |
| Google owns YouTube as **year-start** fact | Independent until Oct/Nov 2006 |
| Campus-only Facebook **after Sep 26** as product truth | Open is the product after that date |
| Modern X (For You · blue checks · long posts) | 2006 = Twttr · 140 · SMS |
| Modern Facebook (Reactions · Reels · Marketplace default) | 2006 = open + News Feed |
| Instagram / Snapchat / TikTok / Vine | Far later |
| Netflix streaming as primary product | DVD era still dominant |
| Smartphone web as primary | Desktop / fat laptop |

### 0.6 Engineering rules (every phase)

1. **Config + content over forks** — scaffold from 2005 patterns; no new browser engine.  
2. Content pages load **only** `js/immersion-2006.js`.  
3. Year-native products use **`itt06-*`** keys via `ITT.util.immersionStorageKey`.  
4. Keep every **`data-*`** hook when densifying HTML.  
5. **Period voice** — no “Museum theater” lead copy on product rooms.  
6. **Never invent brand pixels** — WA / WDM / CONTINUITY / RECON only; log CAPTURE.  
7. YouTube: **independent** early/mid year · Google ownership **late** only.  
8. Facebook: **open** after Sep 26 · Feed is the new product.  
9. Shell: **XP + IE6** default · IE7 is a download/product room.  
10. Gates green before next phase · Git only if the user asks.

### 0.7 Global gates (when code exists)

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2006/

python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2006-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## 1. Phase map

| Phase | Name | Goal (done when…) | Status |
|------:|------|-------------------|--------|
| **0** | Inventory freeze | No half-built tree; research present | **[x]** |
| **1** | Research lock | Thesis, bans, timeline frozen | **[x]** |
| **2** | Harvest P0 extracts + assets | WA/WDM copy + honest pixels logged | **[x]** extracts on disk |
| **3** | Scaffold from 2005 | Bootable shell; hub **locked** | **[x]** |
| **4** | Home / About / tour / dirbar | Thesis spine navigable | **[x]** |
| **5** | P0 Twitter | Compose + timeline real local flows | **[x]** |
| **6** | P0 Facebook Feed + open | Feed + Sep 26 honesty | **[x]** |
| **7** | P0 YouTube two-era | Upload/watch + ownership flip | **[x]** |
| **8** | P0 Digg peak | digg/bury + peak-year copy | **[x]** |
| **9** | Docs + AWS | Web office + cloud birth | **[x]** |
| **10** | Continuity densify | MySpace · Flickr · Maps · Reddit · portals | **[x]** |
| **11** | Hooks + storage audit | All P0 flows mutate `itt06` | **[x]** |
| **12** | Auth + e2e | Automated gates green | **[x]** |
| **13** | Hub unlock + docs | 2006 available on lobby | **[x]** |
| **14** | Optional pixels | WA/WDM chrome crops | **[~]** forever |
| **15** | Reader · IE7 · Time You | Optional culture rooms densify | **[x]** |

**MVP ship** = phases **0–13**.  
**Order:** 0 → 1 → 2 → 3 sequential. After Phase 3, phases **5–8** can run *parallel-ok* brand-by-brand.  
**Do not unlock hub until Phase 13.**

---

# Phase 0 — Inventory freeze

### Goal

Know exact state so work is research → harvest → scaffold, not a half-built year.

### How achieved

1. Confirm `years/2006/` **does not exist**.  
2. Confirm hub has no open 2006 immersion card.  
3. Confirm research companions exist (this file + FRESH + RESEARCH).  
4. Confirm parent `years/2005/` is museum-complete (scaffold source).  
5. Lock target prefix **`itt06`**.

### Files (read only)

- `years/` · `index.html` · `docs/2006-*.md` · `years/2005/`

### Acceptance

- [x] No partial 2006 year tree  
- [x] Research freeze docs linked  
- [x] Prefix target `itt06`  

### Tests

```bash
test ! -d years/2006 && echo "no tree OK"
ls docs/2006-RESEARCH.md docs/2006-DEEP-RESEARCH-FRESH-2026-07-31.md
```

---

# Phase 1 — Research lock

### Goal

Freeze facts used in About/Home and product About pages so densify never invents dates.

### How achieved

1. Read thesis + bans in RESEARCH + FRESH deep research.  
2. Read extracts under `docs/references/2006/wayback-extracts/`.  
3. Copy banks only from extracts + listed primaries (SEC, FB newsroom, History.com, Live Stats, AWS press).  
4. Memorize P0: **Twitter · Facebook Feed/open · YouTube two-era · Digg peak** (+ Docs/AWS spine).

### Sources

| Source | Use |
|--------|-----|
| Cybercultural Internet 2006 | Year feel · Digg · cloud · Time You |
| Live Stats | 85,507,314 sites |
| SEC Google–YouTube | $1.65B · Oct 9 · independent brand |
| FB Expansion Sep 26 | Open registration copy |
| FB privacy Sep 8 | Feed backlash |
| History.com Twitter | Jul 15 · Mar 21 |
| Amazon S3 press | Mar 14 |

### Acceptance

- [x] Thesis one-liner match  
- [x] Bans locked  
- [x] Scale number exact  

---

# Phase 2 — Harvest P0 extracts + assets prep

### Goal

On-disk period copy + honest pixel attempts **before** building HTML chrome.

### How achieved

1. Open CAPTURE-LOG; work P0 rows only first.  
2. For each brand, open dated Wayback / WDM; save text extract under `wayback-extracts/`.  
3. Attempt logo/chrome crops → `assets/period/2006/<brand>/` **only** with provenance.  
4. Tag every file: **WA** · **WDM** · **CONTINUITY** · **RECON**.  
5. Log failures honestly — never invent brand GIFs.

### Targets

| Pri | Brand | Suggested frame |
|-----|-------|-----------------|
| P0 | Twitter | WA twitter.com 2006-07 → 12 |
| P0 | Facebook | WA 2006-09 → 11 (Feed + open) |
| P0 | YouTube | WA 2006-06 (independent) + 2006-11 (post-deal) |
| P0 | Digg | WA digg.com 2006-06 · 2006-10 |
| P1 | Docs · Reader · Maps · MySpace | mid/late 2006 |

### Files

```
docs/references/2006/CAPTURE-LOG.md
docs/references/2006/ASSETS.md
docs/references/2006/wayback-extracts/*
assets/period/2006/   # only with provenance
```

### Acceptance

- [ ] ≥1 product-UI extract each for Twitter, Facebook, YouTube, Digg  
- [ ] No logo claimed as WA without harvest log  

---

# Phase 3 — Scaffold year tree + configs from 2005

### Goal

Bootable `years/2006/` shell; hub **still locked**.

### How achieved

1. Copy structure from `years/2005/` (not engine code).  
2. Retarget year strings: `2006` · `itt06` · immersion-2006 · browser-2006.  
3. Body classes: `year-2006 os-winxp browser-ie6` · `data-itt-year="2006"`.  
4. `js/config/2006.js` + `immersion-2006.js` with **`storagePrefix: "itt06"`**.  
5. Thin stubs only → shared `bootBrowserYear` / `immersion/boot.js`.  
6. Registry: `"2006": [ … ]` — start from 2005 list; add twitter · docs · aws later.  
7. `css/period-2006.css` → `@import period-2005.css` + deltas.  
8. Manual boot `/years/2006/` — **do not** unlock hub.

### Files

```
years/2006/
js/config/2006.js
js/config/immersion-2006.js
js/browser-2006.js
js/immersion-2006.js
js/immersion/registry.js
css/period-2006.css
```

### Acceptance

- [ ] Shell loads · skip connect works  
- [ ] Single immersion boot on content pages  
- [ ] Hub 2006 still unavailable  

---

# Phase 4 — Home / About / tour / dirbar

### Goal

Thesis page + navigation spine to P0 products.

### How achieved

1. Rewrite `pages/home.html` + `about.html`: scale **85,507,314** · social breakthrough · bans box.  
2. Tour steps in `immersion-2006.js`: Twitter → Facebook Feed → YouTube → Digg → Docs → AWS.  
3. Dirbar order: Start · **Twitter** · **Facebook** · **YouTube** · **Digg** · Docs · MySpace · Google.  
4. Four trails: microblog · social feed · video ownership · UGC/cloud.

### Acceptance

- [ ] Scale + bans on About  
- [ ] Dirbar year-correct (not pure 2005 YouTube-first without Twitter)  

---

# Phase 5 — P0 Twitter / Twttr

### Goal

Sparse 2006 Twttr: compose 140 · timeline · about first tweet / Jul 15 public.

### How achieved

1. Read extracts + History.com + WDM Twitter 2006.  
2. Pages: `sites/twitter/index.html` · about · optional profile.  
3. Module **`js/immersion/twitter.js`** (new) via `registerLocal`.  
4. Hooks: `data-twitter-compose` · `data-twitter-timeline` · status.  
5. Key: **`itt06-tweets`** (via storagePrefix).  
6. Enforce **140** character limit in UI.  
7. Copy: “**What are you doing?**” · twttr / Twitter early brand honesty.  
8. Ban modern X chrome.

### Acceptance

- [x] Compose mutates storage · timeline lists posts  
- [x] About has Mar 21 + Jul 15  
- [x] No For You algorithm UI  

---

# Phase 6 — P0 Facebook News Feed + open

### Goal

Feed is the product; open registration is product truth after Sep 26.

### How achieved

1. Scaffold from `years/2005/sites/facebook/`.  
2. Evolve `facebook.js` for **News Feed** list + open framing (feature flags / year).  
3. Pages: feed home · profile · about · open/networks.  
4. About timeline: Feed Sep 5–6 · privacy Sep 8 · open Sep 26 · 13+ · regional networks.  
5. Storage under **`itt06`**.  
6. Ban Reactions / Reels / modern dark UI.

### Acceptance

- [x] Feed list works (localStorage)  
- [x] Open stated as **Sep 26 2006**  
- [x] Pre-Sep gated only as history  

---

# Phase 7 — P0 YouTube two-era

### Goal

Flash upload/watch continuity + ownership flip Oct 9 / Nov 13.

### How achieved

1. Copy structure from `years/2005/sites/youtube/`.  
2. Reuse `youtube.js` with year prefix **`itt06-yt-*`**.  
3. About: independent early year · **$1.65B** Oct 9 · close Nov 13 · brand independent.  
4. Do **not** put “owned by Google” as January–September default.  
5. Keep play/list/upload hooks.

### Acceptance

- [x] Upload → list → watch works  
- [x] Ownership dates accurate  
- [x] e2e ban: no early-year Google ownership as fact  

---

# Phase 8 — P0 Digg peak

### Goal

2006 peak front page · digg/bury · power-law honesty · algorithm drama.

### How achieved

1. Scaffold from 2005 digg rooms.  
2. Year-aware digg module → **`itt06-digg-links`**.  
3. About: surpasses Slashdot lore · ~power diggers · Sep “digging diversity”.  
4. Seeds: 2006-appropriate (no iPhone).  
5. Comments optional polish.

### Acceptance

- [x] digg/bury mutates storage  
- [x] Peak-year copy present  

---

# Phase 9 — Google Docs + AWS

### Goal

Web office + developer cloud birth (platform spine).

### How achieved

1. **Docs:** collab title/body theater · `itt06-docs` · Oct 10 + Writely Mar 9.  
2. **AWS:** S3 bucket / EC2 “launch instance” educational UI · Mar 14 / Aug.  
3. Link from Amazon continuity + Google home.  
4. Honesty: developer cloud — not mass “the cloud” consumer brand.

### Acceptance

- [x] Docs save localStorage  
- [x] AWS about has S3/EC2 dates  

---

# Phase 10 — Continuity densify

### Goal

MySpace still mass · Flickr Yahoo · Maps pre–Street View · Reddit under Digg · Gmail invite flavor · IE7/Firefox rooms · Time “You”.

### How achieved

1. Year-bump 2005 continuity rooms with 2006 copy.  
2. Keep all `data-*` hooks.  
3. Reader Sep redesign optional.  
4. Culture beat on About / news.

### Acceptance

- [ ] No Street View default · no Gmail open-as-year-start  
- [ ] MySpace still mass king language  

---

# Phase 11 — Immersion hooks + storage audit

### Goal

Every signature flow writes/reads **`itt06-*`**.

| Product | Keys / hooks |
|---------|----------------|
| Twitter | `itt06-tweets` · `data-twitter-compose` · `data-twitter-timeline` |
| Facebook | feed list · open honesty · year-aware keys |
| YouTube | `itt06-yt-uploads` · `itt06-yt-views` · `data-yt-*` |
| Digg | `itt06-digg-links` · digg-up/bury |
| Docs | `itt06-docs` |
| Maps / Reddit / etc. | prefix from config |

### How achieved

1. Confirm `storagePrefix: "itt06"`.  
2. Use `ITT.util.immersionStorageKey`.  
3. Click each P0 flow; DevTools → localStorage.  
4. No dual-load of feature modules on pages.

### Acceptance

- [x] All P0 flows mutate keys above  
- [x] Content pages only load immersion-2006 stub  

---

# Phase 12 — Auth + e2e

### Goal

Automated proof of period truth + real local flows.

### How achieved

1. Authenticity: signature sites · urlMap · no anachronism · bans.  
2. e2e: mvp · buttons · twitter · facebook · youtube · digg · real-flows.  
3. hub-years: 2006 available only after Phase 13.

### Acceptance

- [x] authenticity green for 2006  
- [x] e2e green (`e2e/2006-mvp.spec.js` · `e2e/2006-real-flows.spec.js`)  

---

# Phase 13 — Hub unlock + docs

### Goal

Lobby presents 2006 as available; docs match disk.

### How achieved

1. Unlock year card in `index.html`.  
2. Update DISK-TRUTH · MUSEUM-GRADE · README · sitemap.  
3. `check-all-years` includes 2006 pass.

### Acceptance

- [x] Hub → 2006 works  
- [~] Resume `itt-last-year` works (shell default; not re-proved this pass)  

---

# Phase 14 — Optional pixel polish **[~]**

WDM/WA crops: Twitter bird era · FB Feed chrome · YT 2006 · Digg · IE7.  
**Ship does not depend on this.**

---

## 2. Period user flows (match 2006 real life)

Each flow = what a person in **2006** would do, mapped to **museum steps**, **pages**, **hooks**, and **storage**.  
“Real” = **localStorage + DOM change** — not third-party servers.

---

### Flow A — Enter the year (always first)

**2006 ritual:** Sit at a Windows XP PC, open IE6, broadband always-on when you have it.

| Step | Visitor action | System response |
|-----:|----------------|-----------------|
| 1 | Open hub → **2006** | Load `years/2006/` shell |
| 2 | Connect / Skip network overlay | Desktop + IE6 window |
| 3 | Content iframe loads Starting Point | Immersion injects nav/tour |
| 4 | Location bar shows period URL | `urlMap` theater |

**Pages:** `years/2006/index.html` · `pages/home.html`  
**Done when:** Content visible; dirbar shows Twitter / Facebook / YouTube / Digg.

---

### Flow B — Learn the year (thesis)

**2006 ritual:** Magazines talk “You” and Web 2.0; people feel social networks everywhere.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **About 2006** | Scale **~85.5M sites** · breakthrough thesis |
| 2 | Read bans box | No iPhone / Chrome / early Google-owns-YT |
| 3 | Optional tour ticks | Tour progress in localStorage |

**Pages:** `pages/about.html` · `pages/home.html`  
**Done when:** Visitor can state “social breakthrough + platforms rising.”

---

### Flow C — Twitter: post what you’re doing

**2006 ritual (from Jul 15):** SMS-sized status · “What are you doing?” · friends’ timeline.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Twitter** | Sparse Twttr home |
| 2 | Type update (≤140) | Compose form `data-twitter-compose` |
| 3 | Submit | Push into **`itt06-tweets`** |
| 4 | See timeline | `data-twitter-timeline` lists posts |
| 5 | About | Mar 21 first tweet · Jul 15 public |

**Honesty:** No real SMS gateway.  
**Ban:** Modern X “For You” home.

---

### Flow D — Facebook: open the News Feed

**2006 ritual (from Sep):** Constant stream of friends’ activity — then privacy panic.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Facebook** | Feed-oriented home |
| 2 | Scroll / refresh feed list | Local feed items |
| 3 | Optional privacy note | Sep 8 controls honesty |
| 4 | About open registration | **Sep 26** · 13+ · regional networks |
| 5 | Profile / friends continuity | Evolved from 2005 gated rooms |

**Honesty:** Pre-Sep campus gate is history; after Sep 26 open is product truth.  
**Ban:** Reactions · Reels · modern Marketplace default.

---

### Flow E — YouTube: watch and upload (two-era)

**2006 ritual:** Flash player · Broadcast Yourself · late year “Google bought them?” shock.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open YouTube | Mid-year independent product default |
| 2 | Watch a clip | Player theater · views `itt06-yt-views` |
| 3 | Upload a title | `itt06-yt-uploads` · list updates |
| 4 | Share to Digg/Reddit bridges | Cross-site handoff links |
| 5 | About ownership | Independent early · **$1.65B Oct 9** · close Nov 13 |

**Honesty:** No real video files.  
**Ban:** Google owns YouTube as **all-year** default fact.

---

### Flow F — Digg: digg it / bury (peak year)

**2006 ritual:** Digg is the geek homepage; power users dominate; algorithm fights.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Digg** | Popular list |
| 2 | **digg it** / **bury** | Scores · `itt06-digg-links` |
| 3 | Submit a story | Mine list |
| 4 | Optional comment | Comments key if implemented |
| 5 | About | Peak vs Slashdot · power diggers · Sep diversity |

**Ban:** Modern Digg redesign.

---

### Flow G — Google Docs: collaborate online

**2006 ritual (from Oct 10):** Browser word processor / spreadsheet instead of only desktop Office.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Docs room | docs.google.com theater |
| 2 | Create/edit title + body | Save **`itt06-docs`** |
| 3 | About | Writely Mar 9 · Docs & Spreadsheets Oct 10 |

**Honesty:** No multi-user realtime server.

---

### Flow H — AWS: developer cloud birth

**2006 ritual (geeks):** “Storage for the Internet” · rent compute with an API.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open AWS / Amazon cloud about | S3 · EC2 educational pages |
| 2 | Optional “create bucket” / “launch instance” | Local theater only |
| 3 | Read Bezos / risky bet lore | Nov BusinessWeek class |

**Honesty:** Developer product — not mass consumer cloud brand.

---

### Flow I — MySpace: still the mass social network

**2006 ritual:** Profiles, Top 8, music — still huge under News Corp while Facebook opens.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open MySpace | Continuity densify |
| 2 | Profile / invite / friends | Immersion hooks |
| 3 | About | Mass king + Facebook competition honesty |

---

### Flow J — Flickr after Yahoo

**2006 ritual:** Tags · photostream · groups — Yahoo-owned continuity.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Flickr | Stream / upload theater |
| 2 | Tags / explore | Continuity from 2005 |

---

### Flow K — Maps (still pre–Street View)

**2006 ritual:** Drag/zoom Ajax maps · mashups · **no** pegman Street View default.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Maps | Local Search · pan/zoom |
| 2 | Directions optional | Status + history |
| 3 | About | Continuity · Street View is **2007** ban |

---

### Flow L — Reddit under Digg’s shadow

**2006 ritual:** Sparse front page exists; Digg still wins geek traffic.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Reddit | Boost / submit |
| 2 | About | Smaller than Digg honesty |

---

### Flow M — Google / Yahoo start the day

**2006 ritual:** Many people still open Google or Yahoo first, then branch to Digg/MySpace/YouTube.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Google or Yahoo | Portal/search |
| 2 | Optional Docs / Local teaser | Links into Docs / Maps |

---

### Flow N — Gmail (still invite-flavored)

**2006 ritual:** Ajax webmail prestige; open-to-all is **not** the year-start story.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Login / inbox / compose | Continuity theater |
| 2 | About | Invite culture · open is Feb 2007 ban |

---

### Flow O — Google Reader (geek RSS)

**2006 ritual (late Sep):** Gmail-ish Reader redesign · unread counts · power users.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Reader room | Subscribe list theater |
| 2 | About | Most people still don’t know RSS (honesty) |

---

### Flow P — IE7 download (late year)

**2006 ritual (from Oct 18):** Download IE7 for XP · tabs · phishing filter.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open IE7 product page | Download theater |
| 2 | Shell stays XP+IE6 default | Educational contrast only |

---

### Flow Q — Amazon smile + AWS teaser

**2006 ritual:** Shop Amazon; geeks notice S3/EC2.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Cart / product continuity | `data-add-cart` |
| 2 | Link to AWS about | Cloud birth |

---

### Flow R — Wikipedia look something up

**2006 ritual:** Free encyclopedia habit continues.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Browse articles | Continuity densify |

---

### Flow S — Culture: Time “You”

**2006 ritual (Dec):** Person of the Year is the web-powered “You.”

| Step | Action | Result |
|-----:|--------|--------|
| 1 | About 2006 / news culture page | UGC validation beat |
| 2 | Link UGC trails | YouTube · Digg · Facebook · blogs |

---

### Flow T — Exit and resume

**2006 ritual:** Close browser; come back tomorrow.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Desktop **Exit** | Return to hub |
| 2 | `itt-last-year` saved | Continue 2006 |
| 3 | Clear site data | All tweets/uploads/votes reset |

---

## 3. Daily “life in 2006” path (recommended demo order)

Use for manual QA and guided tour:

| Order | Flow | Why it matches 2006 |
|------:|------|---------------------|
| 1 | **A** Enter year | XP + IE6 mass default |
| 2 | **B** About thesis | Social breakthrough + scale |
| 3 | **C** Twitter | Defining new product |
| 4 | **D** Facebook Feed + open | Feed rewires social |
| 5 | **E** YouTube two-era | Video + Google late |
| 6 | **F** Digg peak | UGC king |
| 7 | **G–H** Docs + AWS | Web office + cloud |
| 8 | **I–L** MySpace · Flickr · Maps · Reddit | Continuity truth |
| 9 | **M–S** Portals · Gmail · Reader · IE7 · culture | Daily web + late year |
| 10 | **T** Exit | Resume continuity |

---

## 4. File map (when implement starts)

| Need | Path |
|------|------|
| Shell | `years/2006/index.html` |
| Thesis | `years/2006/pages/home.html` · `about.html` |
| P0 rooms | `sites/{twitter,facebook,youtube,digg}/` |
| Platform | `sites/docs` or `googledocs` · `sites/aws` |
| Continuity | myspace · flickr · maps · reddit · gmail · yahoo · amazon · wikipedia |
| Config | `js/config/2006.js` · `immersion-2006.js` |
| Modules | `js/immersion/{twitter,facebook,youtube,digg,docs,aws,…}.js` |
| Registry | `js/immersion/registry.js` → `"2006"` |
| Pixels | `assets/period/2006/**` |
| Extracts | `docs/references/2006/wayback-extracts/**` |
| Tests | `e2e/2006-*.spec.js` (create in Phase 12) |

---

## 5. Immersion feature map (planned)

| Module | Role | Key pattern |
|--------|------|-------------|
| **twitter.js** (**new**) | Compose · timeline | `itt06-tweets` |
| **facebook.js** (evolve) | Feed · open honesty | `itt06-fb-*` |
| **youtube.js** (evolve) | Upload/watch · ownership | `itt06-yt-*` |
| **digg.js** (year-aware) | digg/bury · peak | `itt06-digg-links` |
| **docs.js** (optional new) | Collab body | `itt06-docs` |
| **aws.js** (optional new) | S3/EC2 theater | `itt06-s3` / `itt06-ec2` |
| maps · reddit · flickr · myspace · gmail · amazon · google · yahoo | Reuse | prefix `itt06` |

---

## 6. What stays mock forever (by design)

| Item | Why |
|------|-----|
| Real tweets / SMS | External network |
| Real video files / CDN | Copyright · bandwidth |
| Live map tiles / Street View | External · Street View 2007 |
| Real Digg/Reddit/Facebook networks | External |
| Real AWS API | Cloud account · cost |
| Real multi-user Docs OT | Server required |
| Payments | Legal |

These are **not** dead buttons if local state still updates and period honesty is clear.

---

## 7. Residual / optional checklist

| Priority | Work | Phase |
|----------|------|-------|
| P0 research | Freeze + fresh deep + this playbook | **[x]** |
| P0 harvest | WA extracts Twitter/FB/YT/Digg | 2 **[ ]** |
| P0 ship | Scaffold → P0 rooms → e2e → hub | 3–13 **[ ]** |
| P1 | Docs · AWS · Reader · IE7 densify | 9–10 **[ ]** |
| Forever | Pixel chrome crops | 14 **[~]** |

---

## 8. One-page summary

| Question | Answer |
|----------|--------|
| **Goal** | Museum-grade 2006: XP/IE6 + social breakthrough + real local flows |
| **How** | Phases 0–13: research → harvest → scaffold from 2005 → P0 modules → gates → hub |
| **Core flows** | Enter · thesis · Twitter · Facebook Feed/open · YouTube two-era · Digg peak · Docs · AWS · continuity · exit |
| **Storage** | `itt06-*` only |
| **Ship bar** | Authenticity + smoke + `e2e/2006-*.spec.js` green · hub unlock |
| **Disk now** | Research **[x]** · year tree **[ ]** · hub locked |
| **Next step** | Phase **2** harvest, then Phase **3** scaffold |

---

*Educational reconstruction only. When in doubt: open the matching primary extract, keep the `data-*` hook, enforce bans, and re-run gates.*
