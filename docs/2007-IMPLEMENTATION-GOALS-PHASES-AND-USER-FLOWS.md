# 2007 — Implementation goals, phases, how-to, and period user flows

**Date:** 2026-07-31  
**Purpose:** Long-form densify + visitor-flow bible (detail).  
**Prefer for reading:** **[`2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md)** — goals · phases · how-to · flows A–T · **period images**.  
**Disk truth:** `years/2007/` densify + flows live · hub **1994–2007**.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. All “apps” are **localStorage theater** (no real cellular data, App Store binaries, map tiles, SMTP, payments, or third-party APIs).

| Companion | Role |
|-----------|------|
| [`2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | **Clear master** · images · current status |
| [`2007-RESEARCH.md`](2007-RESEARCH.md) | Thesis · timeline · bans · scale lock |
| [`2007-DEEP-RESEARCH-FRESH-2026-07-31.md`](2007-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · primaries · residual R-list |
| [`2007-MUSEUM-GRADE.md`](2007-MUSEUM-GRADE.md) | Ship / densify status |
| [`references/2007/ARTIFACTS-MAP.md`](references/2007/ARTIFACTS-MAP.md) | Rooms · modules · keys |
| [`references/2007/CAPTURE-LOG.md`](references/2007/CAPTURE-LOG.md) | Pixel harvest queue |
| Parent year | [`2006-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2006-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) · live `years/2006/` |
| Flow audit | [`FLOW-IMPROVEMENTS-DEEP-RESEARCH-1994-2007.md`](FLOW-IMPROVEMENTS-DEEP-RESEARCH-1994-2007.md) §2007 |
| Connections | [`2007-CONNECTIONS-AND-TRAILS.md`](2007-CONNECTIONS-AND-TRAILS.md) · product bridges · trail packs |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content · single boot · no engine forks |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk |
| **[ ]** | Open work |
| **[~]** | Optional forever (does not block densify ship) |

---

## 0. Overall goal

### 0.1 One-line goal

Build a **museum-grade 2007 Web immersion**: Windows XP + IE shell, period sites, and **real local interactions** that recreate how people used the internet in calendar year **2007** — especially the **iPhone as Safari-on-glass** (no App Store), **open Gmail**, **Street View**, **Facebook Platform**, and **Twitter’s SXSW breakout** — while most of the world still lives on the **desktop** Web 2.0 stack.

### 0.2 Visitor outcome (done means this)

```
Hub → open 2007
  → XP desktop + IE (IE7 more common than early 2006)
  → Starting Point / About:
        121,892,559 sites · 1,373,327,790 users · Tumblr birthmark
        mobile web arrives · hard bans (Chrome · App Store · Android phones)
  → iPhone: Jan 9 announce · Jun 29 ship · multi-touch Safari · history theater
  → Gmail: open to everyone Feb 14 (invite scarcity ends as default story)
  → Street View: May 29 · SF / NYC / Vegas / Miami / Denver
  → Facebook Platform: May 24 · add SuperPoke-class apps · Beacon honesty late year
  → Twitter: SXSW breakout · still 140 · “What are you doing?”
  → YouTube: Google-owned ALL year (Flash still)
  → Continuity: MySpace still huge · Digg · Flickr Yahoo · Docs · AWS · Reader
  → Optional: Vista retail product · Android OHA note (no mass phones) · Kindle · Tumblr
  → Exit: localStorage itt07-* resumes next visit
```

### 0.3 Year thesis (copy must match)

**2007 is when the phone becomes a real web browser you carry — and more of the web opens to everyone:**

- **iPhone** announced **Jan 9**, ships US **Jun 29** — phone + iPod + internet device; **Safari only**; **no App Store**.
- **Gmail opens worldwide Feb 14** — “no more waiting for an invite.”
- **Street View** debuts (**May 29** museum lock) in five US cities.
- **Facebook Platform** (**May 24**) turns the social graph into a developer platform.
- **Twitter** breaks out at **SXSW March 2007** (product born 2006).
- **YouTube** is **Google-owned all year** (deal closed Nov 13, 2006).
- **Vista** is **retail** (Jan 30); **XP + IE** remain mass default.
- **Android / OHA** announced **Nov 5** — platform promise, **not** mass phones yet.
- Late year: **Beacon** privacy backlash · **Kindle** · streaming *seeds* (Netflix Watch Now / Hulu beta).

Mood: mobile *promise* + platform *power* + privacy panic — fat laptops for most of the world.

### 0.4 Locked facts (do not invent)

| Fact | Value |
|------|-------|
| Websites | **121,892,559** (June class · Internet Live Stats · **+43%** from 2006) |
| Internet users | **1,373,327,790** |
| Users per site | **~11.3** |
| Live Stats birthmark | **Tumblr** |
| iPhone announce | **Jan 9, 2007** · Macworld SF |
| iPhone ship | **Jun 29, 2007** · US · Cingular exclusive class |
| iPhone price class | **$499** 4GB · **$599** 8GB (announce) |
| Gmail open | **Feb 14, 2007** |
| Facebook Platform | **May 24, 2007** |
| Street View | **May 29, 2007** museum · cities **SF · NYC · Las Vegas · Miami · Denver** |
| Vista retail GA | **Jan 30, 2007** |
| Android OHA | **Nov 5, 2007** |
| Facebook Beacon | **Nov 6, 2007** |
| Kindle | **Nov 19, 2007** · $399 class |
| Storage prefix | **`itt07`** |
| Shell default | **Windows XP + IE 6/7** |

### 0.5 Hard bans (never as 2007 default)

| Ban | Why / correct era |
|-----|-------------------|
| **Chrome** browser | Sep 2008 |
| **App Store** / third-party native app grid | Jul 2008 |
| **iPhone 3G** framing | 2008 |
| **Android consumer phones** mass product | late 2008+ (G1 class) |
| Campus-only Facebook | Ended Sep 26, 2006 |
| Gmail **invite-only as year product default** | Open Feb 14, 2007 |
| Modern iOS home / App Store grid | 2008+ |
| Modern X (For You · long posts · blue checks) | 2007 = 140 · status |
| Modern Facebook (Reactions · Reels · Marketplace default) | 2007 = blue/white · Platform apps |
| Netflix **streaming-first** as primary product | DVD mail still dominant |
| Instagram / Snapchat / TikTok | Far later |

### 0.6 Engineering rules (every phase)

1. **Config + content over forks** — densify inside existing 2007 tree; no new browser engine.  
2. Content pages load **only** `js/immersion-2007.js`.  
3. Year-native products use **`itt07-*`** keys via `ITT.util.immersionStorageKey`.  
4. Keep every **`data-*`** hook when densifying HTML.  
5. **Period voice** — no “Museum theater” lead copy on product rooms.  
6. **Never invent brand pixels** — WA / WDM / CONTINUITY / RECON only; log CAPTURE.  
7. iPhone: **Safari web only** · **no App Store**.  
8. Gmail: **open signup is product truth** after Feb 14; invites = legacy side note.  
9. Maps: Street View is a **2007 feature** (was a 2006 ban).  
10. YouTube: Google ownership OK **year-start**.  
11. Shell: **XP + IE** default · Vista = product room, not forced shell.  
12. Gates green before calling densify done · Git only if the user asks.

### 0.7 Global gates

```bash
# Serve
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2007/

# Static
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

# 2007 e2e
npx playwright test e2e/2007-*.spec.js e2e/hub-years.spec.js --workers=1

# Cross-year real flows (includes 2007)
npx playwright test e2e/cross-year-real-flows.spec.js e2e/scenario-real-flows.spec.js --workers=1
```

---

## 1. Phase map

| Phase | Name | Goal (done when…) | Status |
|------:|------|-------------------|--------|
| **0** | Inventory freeze | Exact disk + research state known | **[x]** |
| **1** | Research lock | Thesis, bans, scale, timeline frozen | **[x]** |
| **2** | Home / About scale truth | Live Stats numbers on Starting Point + About | **[x]** scale fix |
| **3** | Gmail open copy honesty | Compose/inbox/invite = open-default story | **[ ]** |
| **4** | iPhone densify | History list · presets · announce→ship multipage | **[ ]** |
| **5** | Street View densify | Full state · Maps → Street View handoff | **[ ]** |
| **6** | Facebook Platform densify | Remove app · Beacon honesty | **[ ]** |
| **7** | Twitter SXSW densify | About depth · profile ← timeline | **[ ]** |
| **8** | YouTube + continuity year-truth | Google-owned · MySpace/Digg/Flickr/Netflix honesty | **[ ]** |
| **9** | Vista + Android note | Product room + About OHA (no phone shop) | **[ ]** |
| **10** | Trail wiring | Query/handoff links between P0 rooms | **[ ]** |
| **11** | Hooks + storage audit | All signature flows mutate `itt07` only | **[ ]** |
| **12** | Hard e2e densify + trails | `2007-densify` · `2007-trail-real-flows` green | **[ ]** |
| **13** | Docs + museum-grade claim | MUSEUM-GRADE densify complete | **[ ]** |
| **14** | Optional pixels | WA/WDM iPhone · pegman · Platform chrome | **[~]** |
| **15** | Optional P2 rooms | Tumblr · Kindle · Netflix Watch Now seed · FriendFeed | **[~]** |

**MVP already shipped** = Phases **0–1** + prior scaffold (iPhone/Gmail/SV/Platform modules live).  
**Densify ship** = Phases **2–13**.  
**Order:** 2 → 3 sequential; then **4–9** brand-by-brand; **10–12** after hooks stable; **13** claim; **14–15** optional.

---

# Phase 0 — Inventory freeze **[x]**

### Goal

Know what already exists so work is **densify / verify**, not accidental full rebuild.

### How achieved

1. Count HTML and rooms:  
   `find years/2007 -name '*.html' | wc -l` · `ls years/2007/sites`  
2. Count period assets:  
   `find assets/period/2007 -type f | wc -l`  
3. Confirm hub: year-card **2007 available**.  
4. Confirm `storagePrefix: "itt07"` in `js/config/immersion-2007.js`.  
5. List e2e: `ls e2e/2007-*.spec.js`.  
6. Confirm P0 folders: iphone · gmail · maps/streetview · facebook/platform · twitter · youtube.  
7. Grep bans under signature rooms.

### Acceptance

- [x] Tree present (~292 HTML · 84 sites)  
- [x] Hub unlocked  
- [x] Prefix `itt07` confirmed  
- [x] MVP real-flows green  

---

# Phase 1 — Research lock **[x]**

### Goal

Freeze facts used in Home/About and product About pages.

### How achieved

1. Read [`2007-RESEARCH.md`](2007-RESEARCH.md) + [`2007-DEEP-RESEARCH-FRESH-2026-07-31.md`](2007-DEEP-RESEARCH-FRESH-2026-07-31.md).  
2. Lock scale **121,892,559** / **1,373,327,790**.  
3. Lock bans and timeline tables.  
4. Bookmark primaries (Apple · Gmail open · Street View · Vista · OHA · Cybercultural).

### Acceptance

- [x] Deep research doc shipped  
- [x] Scale corrected on About/Home (Phase 2 partial)  
- [x] Primaries listed  

---

# Phase 2 — Home / About scale truth **[x]** (verify)

### Goal

Visitor sees **Live Stats** numbers and hard bans immediately.

### How achieved

1. `pages/about.html` — scale box with exact counts + Tumblr birthmark.  
2. `pages/home.html` — subtitle / thesis strip matches.  
3. Bans box: Chrome · App Store · Android mass phones · modern iOS/X.  
4. Tour steps in `immersion-2007.js` match flows A–G below.

### Files

```
years/2007/pages/home.html
years/2007/pages/about.html
js/config/immersion-2007.js
```

### Acceptance

- [x] About contains `121,892,559`  
- [x] About contains bans  
- [ ] Tour list complete after densify (optional refresh)

### Tests

```bash
grep -n '121,892,559' years/2007/pages/about.html
npx playwright test e2e/2007-mvp.spec.js --workers=1
```

---

# Phase 3 — Gmail open copy honesty **[ ]**

### Goal

**Feb 14 open signup** is the default product story. Invite scarcity is **legacy**, not the main CTA voice.

### How achieved

1. Rewrite `sites/gmail/compose.html` default subject/body (no “Need an invite?” as default).  
2. Rewrite `inbox.html` — drop “invite-era beta” as primary framing.  
3. Rewrite `invite.html` — “legacy invites / share Gmail” after open era.  
4. Keep `index.html` / `about.html` open truth (already good).  
5. Flows: login → compose → draft → send → inbox still mutate `itt07-gmail*`.

### Files

```
years/2007/sites/gmail/compose.html
years/2007/sites/gmail/inbox.html
years/2007/sites/gmail/invite.html
js/immersion/gmail.js   # only if draft/open UX needs hooks
```

### Acceptance

- [ ] Compose does not claim invite-only as current product  
- [ ] About still says Feb 14 open  
- [ ] e2e compose + draft still green  

### Tests

```bash
grep -ni 'invite' years/2007/sites/gmail/*.html   # residual OK only as legacy
npx playwright test e2e/scenario-real-flows.spec.js -g 'gmail 2007' --workers=1
```

---

# Phase 4 — iPhone densify **[ ]**

### Goal

Visitor can **announce → ship → browse Safari** with durable history that feels like 2007 multi-touch web (broken desktop sites, no apps).

### How achieved

1. Densify `sites/iphone/about.html` — Jan 9 Jobs pitch · three products · prices · Cingular · June ship.  
2. Densify `sites/iphone/index.html` — clear **no App Store** banner.  
3. Extend `iphone.js`:  
   - render **history list** from `itt07-iphone-history`  
   - optional **bookmark presets** (Google · Maps · YouTube · Wikipedia)  
   - screen theater text for “desktop site awkward on 3.5″”  
4. Optional third page `safari.html` only if it clarifies product (keep SRP).

### Files

```
years/2007/sites/iphone/*
js/immersion/iphone.js
```

### Acceptance

- [ ] History list visible after Go  
- [ ] About has Jan 9 + Jun 29 + no App Store  
- [ ] Storage key only `itt07-iphone-history`  

### Tests

```bash
npx playwright test e2e/2007-real-flows.spec.js -g 'iPhone' --workers=1
```

---

# Phase 5 — Street View densify **[ ]**

### Goal

Maps year story: Ajax Maps continuity + **pegman-class Street View** for the five launch cities.

### How achieved

1. Keep five city buttons (already correct).  
2. Persist richer state in `itt07-streetview` (city + optional heading note).  
3. Link from `sites/maps/index.html` → streetview with clear “new in May 2007” copy.  
4. About/Maps honesty: privacy debates begin (no modern Live View).

### Files

```
years/2007/sites/maps/streetview.html
years/2007/sites/maps/index.html
js/immersion/maps.js
```

### Acceptance

- [ ] All five cities work  
- [ ] Status + localStorage  
- [ ] Handoff link from Maps home  

### Tests

```bash
npx playwright test e2e/2007-real-flows.spec.js -g 'Street View' --workers=1
```

---

# Phase 6 — Facebook Platform densify **[ ]**

### Goal

**May 24 Platform** is playable: add app · see list · remove app · late-year **Beacon** honesty.

### How achieved

1. Densify `platform.html` copy (developers · social graph · SuperPoke-class).  
2. `facebook.js`: **remove** application from `itt07-fb-apps`.  
3. Facebook about page: Platform date + **Beacon Nov 6** privacy backlash (not a full Beacon simulator required).  
4. Optional: feed room still works with `itt07-thefacebook` / feed keys.

### Files

```
years/2007/sites/facebook/platform.html
years/2007/sites/facebook/about.html   # or create if thin
js/immersion/facebook.js
```

### Acceptance

- [ ] Add + remove app mutates list + storage  
- [ ] Beacon mentioned as late-2007 privacy event  
- [ ] No modern Graph API / Instant Games voice  

### Tests

```bash
npx playwright test e2e/2007-real-flows.spec.js -g 'Platform' --workers=1
```

---

# Phase 7 — Twitter SXSW densify **[ ]**

### Goal

2007 is the **breakout** year (not birth year): SXSW screens · 140 · status culture.

### How achieved

1. Expand `sites/twitter/about.html` — born 2006 · SXSW Mar 2007 · hallway LCDs · still 140.  
2. `profile.html` renders tweets from `itt07-tweets`.  
3. Index honesty banner already partial — keep “What are you doing?”  

### Files

```
years/2007/sites/twitter/*
js/immersion/twitter.js
```

### Acceptance

- [ ] About mentions SXSW 2007 breakout  
- [ ] Profile shows stored tweets  
- [ ] Ban modern For You  

### Tests

```bash
npx playwright test e2e/2007-real-flows.spec.js -g 'Twitter' --workers=1
```

---

# Phase 8 — YouTube + continuity year-truth **[ ]**

### Goal

Continuity products tell **2007** truths, not pasted 2006 mid-year facts.

### How achieved

1. YouTube about — Google-owned **all year** (already OK; verify mid-year pages).  
2. MySpace about — still mass; Facebook rising hard after Platform.  
3. Digg — still strong UGC front page.  
4. Flickr — Yahoo-owned continuity.  
5. Netflix — **DVD-by-mail primary** + one line: limited electronic delivery / Watch Now *seed* (not streaming-first).  
6. Gmail open already Phase 3.  
7. Docs / AWS / Reader — year keys `itt07-*` already; spot-check copy dates.

### Files

```
years/2007/sites/youtube/about.html
years/2007/sites/myspace/about.html   # if exists
years/2007/sites/netflix/index.html
years/2007/sites/digg/about.html      # if exists
# spot-check other about.html under sites/
```

### Acceptance

- [ ] No “Google buys YouTube this year” as 2007 news  
- [ ] No “Street View is future ban” on Maps  
- [ ] Netflix not streaming-primary  

---

# Phase 9 — Vista + Android note **[ ]**

### Goal

OS honesty: Vista retail exists; XP remains mass; Android is **announced**, not a phone aisle.

### How achieved

1. Densify `sites/microsoft/vista.html` — Jan 30 GA · Aero/UAC lore · “many stay on XP.”  
2. About 2007 already lists Nov 5 OHA — keep **no mass phones**.  
3. Do **not** add Android phone storefront as P0.

### Acceptance

- [ ] Vista page has Jan 30 2007  
- [ ] About bans Android mass phones  

---

# Phase 10 — Trail wiring **[ ]**

### Goal

Multi-step journeys with in-museum handoffs (copy 2005 trail pattern).  
**Full connection graph:** [`2007-CONNECTIONS-AND-TRAILS.md`](2007-CONNECTIONS-AND-TRAILS.md).

### How achieved

1. Wire **trail packs A–F** from connections doc (mobile · Google day · Maps/SV · platforms · video→Digg · blogosphere).  
2. After iPhone Go → presets for Maps / Gmail / YouTube (desktop URLs + in-museum room links).  
3. After Gmail send → Docs / Maps / Twitter family links.  
4. Maps home → **primary** Street View CTA + HousingMaps `?city=`.  
5. YouTube upload → Digg/Reddit prefill (verify module under 2007 paths).  
6. Platform page → Feed / profile; reverse links from Twitter ↔ Feed.  
7. Fix **Google Video** ownership copy (YouTube Google-owned all year).  
8. Expand Home “trails” list to packs A–G.

### Acceptance

- [ ] Trail packs A–E each have clickable handoffs  
- [ ] Google Video does not claim YouTube independent  
- [ ] At least one query prefill trail e2e green  

---

# Phase 11 — Hooks + storage audit **[ ]**

### Goal

Every signature control mutates **`itt07-*` only** (no soft flash, no itt06 bleed).

### How achieved

1. Manual matrix: Flow C–I below → DevTools Application → localStorage.  
2. Fix any missing remove/list render.  
3. Confirm registry includes `iphone.js` + continuity modules.  
4. Grep soft patterns: `data-itt-theater`, `onclick="return false"`, invite-default Gmail.

### Acceptance

- [ ] No soft CTAs on P0 rooms  
- [ ] Isolation: actions never require `itt06-*`  

### Tests

```bash
npx playwright test e2e/2007-real-flows.spec.js e2e/cross-year-real-flows.spec.js --workers=1
```

---

# Phase 12 — Hard e2e densify + trails **[ ]**

### Goal

Automate densify bar and multi-step trails.

### How achieved

1. Create `e2e/2007-densify.spec.js`:  
   - About has `121,892,559`  
   - Bans present  
   - iPhone App Store ban copy  
   - Gmail open Feb 14  
   - Street View May 29 + five cities  
   - Platform May 24  
   - No Chrome / App Store as product defaults  
2. Create `e2e/2007-trail-real-flows.spec.js`:  
   - Trail 1 Mobile: iPhone browse → history  
   - Trail 2 Open mail: Gmail compose → msgs key  
   - Trail 3 Maps: Street View city  
   - Trail 4 Platforms: FB app + Twitter tweet  
3. Expand `2007-real-flows` if needed (Docs/AWS/Reader samples).

### Files

```
e2e/2007-densify.spec.js          # create
e2e/2007-trail-real-flows.spec.js # create
e2e/2007-real-flows.spec.js       # expand
scripts/test-authenticity.py      # optional densify asserts
```

### Acceptance

- [ ] densify + trail + real-flows + mvp all green  
- [ ] authenticity 63+ still green  

### Tests

```bash
npx playwright test e2e/2007-*.spec.js --workers=1
python3 scripts/test-authenticity.py
```

---

# Phase 13 — Docs + museum-grade densify claim **[ ]**

### Goal

Docs match disk; densify labeled complete when Phases 2–12 pass.

### How achieved

1. Update `2007-MUSEUM-GRADE.md` — densify complete checklist.  
2. Update `DISK-TRUTH.md` residual line.  
3. Tick phases in this file.  
4. CAPTURE-LOG remaining items marked optional if not harvested.

### Acceptance

- [ ] MUSEUM-GRADE says densify complete (not only MVP)  
- [ ] This phase map matches reality  

---

# Phase 14 — Optional pixel polish **[~]**

WDM/WA crops: iPhone marketing still · Street View chrome · FB Platform directory · Twitter 2007 sparse UI.  
**Densify ship does not depend on perfect brand GIFs.** Log RECON honestly.

---

# Phase 15 — Optional P2 rooms **[~]**

| Room | Period fact | Implement only if time |
|------|-------------|------------------------|
| Tumblr | Launch 2007 · Live Stats birthmark | Microblog contrast to Twitter |
| Kindle | Nov 19 · $399 · sold out hours | Amazon densify |
| Netflix Watch Now | Limited electronic delivery seed | Honesty line + optional UI |
| FriendFeed | Oct geek aggregator | Optional |
| Hulu | Private beta late year | Note only |

---

## 2. Period user flows (match 2007 real life)

Each flow = what a person in **2007** would do, mapped to **museum steps**, **pages**, **hooks**, and **storage**.  
“Real” = **localStorage + DOM change** — not third-party servers.

---

### Flow A — Enter the year (always first)

**2007 ritual:** Sit at a Windows XP PC, open IE (often IE7 late year), broadband always-on.

| Step | Visitor action | System response |
|-----:|----------------|-----------------|
| 1 | Open hub → **2007** | Load `years/2007/` shell |
| 2 | Connect / Skip network overlay | Desktop + IE window |
| 3 | Content loads Starting Point | Immersion injects nav/tour |
| 4 | Location bar shows period URL | `urlMap` theater |

**Pages:** `years/2007/index.html` · `pages/home.html`  
**Done when:** Content visible; dirbar shows **iPhone · Gmail · Maps · Facebook · Twitter · YouTube**.

---

### Flow B — Learn the year (thesis)

**2007 ritual:** Magazines and blogs talk iPhone lines, open Gmail, Facebook apps, Twitter at conferences.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **About 2007** | Scale **121,892,559** sites · **1,373,327,790** users |
| 2 | Read signature list | iPhone · open Gmail · Street View · Platform · Twitter · YouTube |
| 3 | Read bans box | No Chrome · App Store · Android mass phones |
| 4 | Optional tour ticks | Tour progress |

**Pages:** `pages/about.html` · `pages/home.html`  
**Done when:** Visitor can state “phone becomes a browser; desktop still mass; open web accounts.”

---

### Flow C — iPhone: announce, ship, browse the web

**2007 ritual:** Jan 9 shock keynote → June lines at Apple/Cingular → use **Safari** on multi-touch glass (many desktop sites broken). **No App Store.**

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **iPhone** or tour | Product room |
| 2 | Read **About** | Jan 9 · three products · prices · Jun 29 ship · no App Store |
| 3 | Type a URL · **Go** | Screen theater + status |
| 4 | History list shows prior opens | **`itt07-iphone-history`** |
| 5 | Optional preset (Maps / Google) | Same key |

**Hooks:** `data-iphone-browse` · `data-iphone-screen` · `data-iphone-status` · history list  
**Honesty:** No real cellular network · no App Store binaries.  
**Ban:** App Store home grid · iPhone 3G as default.

---

### Flow D — Gmail: open to everyone

**2007 ritual (from Feb 14):** Create an account without begging friends for invites; search mail; chat hearts lore.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **Gmail** | Open-signup framing on index |
| 2 | About | **Feb 14, 2007** open worldwide |
| 3 | Sign in theater → inbox | `itt07-gmail` user |
| 4 | Compose → Send | **`itt07-gmail-msgs`** · inbox list |
| 5 | Optional **Save Draft** | **`itt07-gmail-drafts`** |
| 6 | Invites page (legacy) | Optional share lore — not the main product story |

**Hooks:** `data-gmail-login` · `data-gmail-compose` · `data-gmail-draft` · `data-gmail-invite`  
**Honesty:** No real SMTP.  
**Ban:** Invite-only as **year default** story.

---

### Flow E — Street View: walk the city from Maps

**2007 ritual (from May):** Drop into panoramic streets in a few US cities; privacy debates start.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **Maps** | Ajax Maps continuity |
| 2 | Open **Street View** | May 29 honesty + five cities |
| 3 | Click **San Francisco** (or NYC / Vegas / Miami / Denver) | Viewer status updates |
| 4 | Persist last city | **`itt07-streetview`** |

**Hooks:** `data-sv-city` · `data-sv-status` · `data-sv-viewer`  
**Honesty:** No live Google tiles.  
**Cities lock:** SF · New York · Las Vegas · Miami · Denver only as launch set.

---

### Flow F — Facebook Platform: add an app

**2007 ritual (from May 24):** Developers ship apps inside Facebook; friends spam SuperPoke-class notifications; MySpace still often larger outside US elite.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **Facebook Platform** | May 24 developer platform copy |
| 2 | Select **SuperPoke!** (or other) · Add | List updates |
| 3 | Storage | **`itt07-fb-apps`** |
| 4 | Optional remove app | List shrinks |
| 5 | About / Beacon note (late year) | Nov 6 privacy backlash honesty |
| 6 | Optional profile / feed continuity | `itt07-thefacebook` · feed keys |

**Hooks:** `data-fb-app-add` · `data-fb-apps` · profile hooks  
**Ban:** Modern Reactions · Reels · Instant Games framing.

---

### Flow G — Twitter: SXSW breakout year

**2007 ritual:** Still 140 characters; SXSW hallway screens; “What are you doing?”; third-party clients rising.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Twitter** | Sparse home |
| 2 | Type status ≤140 · update | Timeline shows post |
| 3 | Storage | **`itt07-tweets`** |
| 4 | About | Born 2006 · **SXSW 2007 breakout** |
| 5 | Profile | Own tweets from storage |

**Hooks:** `data-twitter-compose` · `data-twitter-timeline` · count  
**Ban:** For You algorithm · long posts · blue checks.

---

### Flow H — YouTube: Google-owned all year

**2007 ritual:** Flash “Broadcast Yourself”; Google owns YouTube after late-2006 deal.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open YouTube | Mid-2000s player chrome |
| 2 | Watch / upload title | `itt07-yt-views` · `itt07-yt-uploads` |
| 3 | About | Google-owned **all year** (close Nov 13, 2006) |

**Honesty:** No real video CDN.  
**Ban:** “Google just bought YouTube this year” as 2007 news.

---

### Flow I — Digg: still the geek front page

**2007 ritual:** Digg remains huge for link popularity; Reddit still smaller for many.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Digg | Popular list |
| 2 | digg it / bury | **`itt07-digg-links`** |
| 3 | Optional submit | Mine list |

---

### Flow J — MySpace: still mass social

**2007 ritual:** Profiles, Top 8, music — still enormous; Facebook Platform accelerates competition.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open MySpace | Continuity densify |
| 2 | Profile / comment / invite | `itt07-myspace-*` |
| 3 | About honesty | Mass king under pressure from Facebook |

---

### Flow K — Continuity: Flickr · Docs · AWS · Reader

**2007 ritual:** Yahoo Flickr; Google Docs collaboration; AWS for developers; Reader for RSS geeks.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Flickr upload | `itt07-flickr-stream` |
| 2 | Docs edit/save | `itt07-docs` |
| 3 | AWS bucket theater | `itt07-aws-buckets` |
| 4 | Reader subscribe | `itt07-reader-subs` |

---

### Flow L — Maps Local Search (pre- or with Street View)

**2007 ritual:** Drag/zoom Ajax maps; Local Search; late year try Street View.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Maps search / zoom | `itt07-maps-state` |
| 2 | Jump to Street View | Flow E |

---

### Flow M — Google / Yahoo start the day

**2007 ritual:** Many still open Google or Yahoo first, then branch to social/video.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Google search form | Catalog results |
| 2 | Optional teaser links | Maps · Gmail · YouTube |

---

### Flow N — Vista retail (optional product)

**2007 ritual:** Some buy Vista Jan 30; many keep XP; UAC jokes begin.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Microsoft Vista page | Retail GA honesty |
| 2 | Shell stays XP default | Educational contrast |

**Ban:** Vista as *only* museum shell.

---

### Flow O — Android / OHA note (not a phone shop)

**2007 ritual (Nov 5):** Tech blogs say “Android platform” and “not a Gphone”; consumer phones arrive **2008**.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Read About 2007 timeline | Nov 5 OHA |
| 2 | No “buy Android phone” P0 room | Ban mass phones |

---

### Flow P — Netflix DVD mail (+ streaming seed honesty)

**2007 ritual:** Red envelopes still primary; limited “Watch Now” / electronic delivery exists as seed.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Add title to queue | **`itt07-netflix-queue`** |
| 2 | About / copy | DVD primary · streaming seed only |

**Ban:** Netflix as streaming-first product of 2007.

---

### Flow Q — Amazon smile + optional Kindle

**2007 ritual:** Shop Amazon; late year Kindle $399 sells out in hours (optional densify).

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Add to cart | `itt07` / prefix cart keys |
| 2 | Optional Kindle about | Nov 19 · optional P2 |

---

### Flow R — Wikipedia look something up

**2007 ritual:** Free encyclopedia habit continues (often via Google).

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Browse / edit theater | Continuity wiki rooms |

---

### Flow S — Culture: privacy + ads boom

**2007 ritual:** DoubleClick/aQuantive deals; late year **Beacon** freakout; “conversational marketing.”

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Facebook about Beacon note | Nov 6 honesty |
| 2 | Optional adsense continuity | `itt07-adsense` |

---

### Flow T — Exit and resume

**2007 ritual:** Close browser; come back tomorrow with the same Gmail drafts and tweets.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Desktop **Exit** | Return to hub |
| 2 | Last year saved | Continue 2007 |
| 3 | Clear site data | All `itt07-*` reset |

---

## 3. Daily “life in 2007” path (recommended demo order)

Use for manual QA and guided tour:

| Order | Flow | Why it matches 2007 |
|------:|------|---------------------|
| 1 | **A** Enter year | XP + IE still mass |
| 2 | **B** Thesis | Scale + bans + mobile thesis |
| 3 | **C** iPhone | Defining product of the year |
| 4 | **D** Gmail open | Feb 14 unlock |
| 5 | **E** Street View | May Maps moment |
| 6 | **F** Facebook Platform | May developer platform |
| 7 | **G** Twitter SXSW | Breakout culture |
| 8 | **H** YouTube | Google-owned video |
| 9 | **I–K** Digg / MySpace / continuity | Desktop Web 2.0 still daily life |
| 10 | **N–O** Vista / Android note | OS + future phone honesty |
| 11 | **T** Exit | Resume storage |

**Four product trails (Home already sketches these):**

| Trail | Steps | Assert keys |
|-------|-------|-------------|
| **1. Mobile web** | iPhone about → browse → history | `itt07-iphone-history` |
| **2. Open accounts** | Gmail about open → compose → inbox | `itt07-gmail-msgs` |
| **3. Maps on the street** | Maps → Street View → city | `itt07-streetview` |
| **4. Platforms** | FB Platform add app → Twitter update → YouTube | `itt07-fb-apps` · `itt07-tweets` · `itt07-yt-uploads` |

---

## 4. Storage key quick reference (`itt07`)

| Key | Product |
|-----|---------|
| `itt07-iphone-history` | iPhone Safari |
| `itt07-gmail` · `itt07-gmail-msgs` · `itt07-gmail-drafts` · `itt07-gmail-invites` | Gmail |
| `itt07-streetview` | Street View |
| `itt07-maps-state` | Maps base |
| `itt07-fb-apps` · `itt07-thefacebook` · `itt07-fb-feed` | Facebook |
| `itt07-tweets` | Twitter |
| `itt07-yt-uploads` · `itt07-yt-views` | YouTube |
| `itt07-digg-links` | Digg |
| `itt07-myspace-*` | MySpace |
| `itt07-docs` · `itt07-aws-buckets` · `itt07-reader-subs` | Docs / AWS / Reader |
| `itt07-netflix-queue` | Netflix DVD queue |
| `itt07-flickr-stream` · `itt07-reddit-links` · … | Continuity |

Never write `itt06-*` from a 2007 page (except one-time migrate if module supports it).

---

## 5. Definition of done (densify ship)

| Check | Pass criteria |
|-------|---------------|
| Thesis | About/Home match locked scale + bans |
| P0 flows C–H | Each mutates `itt07` + DOM |
| Gmail copy | Open-default, not invite-default |
| iPhone | No App Store · history UI |
| Street View | Five cities + storage |
| Platform | Add (and ideally remove) app |
| e2e | mvp · real-flows · densify · trails green |
| authenticity | `test_2007_*` green |
| Docs | MUSEUM-GRADE densify claim honest |

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2007-mvp.spec.js e2e/2007-real-flows.spec.js \
  e2e/2007-densify.spec.js e2e/2007-trail-real-flows.spec.js \
  e2e/hub-years.spec.js --workers=1
```

---

## 6. What not to do

| Anti-goal | Why |
|-----------|-----|
| Real map tiles / cellular / App Store | Legal + offline museum |
| Invent brand GIFs | CAPTURE / RECON only |
| Chrome or App Store as 2007 defaults | Hard bans |
| Android phone retail as P0 | Announce-only year |
| Gmail invite-only year story | Open Feb 14 |
| Replace XP shell with Vista-only | XP still mass |
| Skip trail e2e | 2005 proved trails are the stickiness layer |

---

## 7. One-page start here (next coding session)

1. **Phase 3** — Gmail open copy (compose/inbox/invite).  
2. **Phase 4** — iPhone history list UI.  
3. **Phase 12** — write `2007-densify.spec.js` + `2007-trail-real-flows.spec.js`.  
4. **Phase 6–7** — Platform remove + Beacon · Twitter profile.  
5. **Phase 8** — continuity year-truth pass.  
6. **Phase 13** — claim densify complete when green.

---

**Document status:** Goals · phases · how-to · period user flows A–T locked for 2007 densify. Implement in phase order; git only if asked.
