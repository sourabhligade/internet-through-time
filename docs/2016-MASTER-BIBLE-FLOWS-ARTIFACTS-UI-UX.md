# 2016 — Master bible: how it will be done  
## Each flow · artifact · source · structure · UI/UX (minute detail)

**Date:** 2026-08-13  
**Purpose:** Full implementation map for museum year **2016** — not code yet; **every flow, file, storage key, source, and UI/UX screen** described so an implementer can build without inventing.  
**Disk truth now:** Hub **1994–2015** playable · **2016 research freeze only** · **no `years/2016/`** · planned prefix **`itt16`**.  
**Clone source:** live **`years/2015/`** (not 2014).  
**Legal:** Educational reconstruction only. **localStorage theater only.** **Never invent brand pixels.** Git only if asked.

### Companion docs (read order)

| # | Doc | Role |
|---|-----|------|
| 0 | [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | Thesis · scale · bans · calendar |
| 1 | [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md) | Sources visited |
| 2 | [`2016-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2016-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Short playbook |
| **3** | **This file** | **★ Minute map: how / structure / UI / each flow** |
| 4 | [`references/2016/ARTIFACTS-MAP.md`](references/2016/ARTIFACTS-MAP.md) | Path table |
| 5 | [`references/2016/CAPTURE-LOG.md`](references/2016/CAPTURE-LOG.md) | Pixel harvest |
| 6 | [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) · [`ARCHITECTURE.md`](ARCHITECTURE.md) | Engine rules |
| 7 | `js/config/flow-maps.js` → `2016` | UX tree seed (already in repo) |

---

# Part 0 — What “done” looks like for a visitor

```
Hub → open 2016 (after unlock)
  → Shell: Win10-rising / Win7 residual · Chrome habit · Edge Spartan residual
  → Connect overlay: Stories · GO · Reactions · jack · Vine · WA E2E
  → Starting Point:
        dual scale: 1,045,534,808 (+21%) · users 3,424,971,237
        trail cards T1–T6
        densify gems strip
        continuity archive (2015 P0)
  → Trails complete multi-step REAL → itt16-* only
  → Exit hub · itt-last-year=2016
```

---

# Part 1 — Engineering structure (how the year is built)

## 1.1 Architecture rule (locked)

| Rule | Detail |
|------|--------|
| Clone | `years/2015/` → `years/2016/` (whole tree) then **rewrite spine** |
| Engine | **No new browser engine** — shared `js/browser/*` + year config |
| Immersion entry | Every content page loads **`js/immersion-2016.js`** → `immersion/boot.js` |
| Storage | **`itt16-*` only** · `storagePrefix: "itt16"` in immersion config |
| REAL | Incomplete checklist / empty field **blocks** `localStorage` write |
| Pixels | CAPTURE or RECON placard · **never invent** brand art |
| CSS | `css/period-2016.css` `@import` period-2015 + year deltas |
| Flow data | Extend `ITT.flowMaps["2016"]` (already seeded) |

## 1.2 File tree (after scaffold — target)

```
years/2016/
  index.html                 # shell body.year-2016 data-itt-year="2016"
  pages/
    home.html                # Starting Point · trail cards · archive
    about.html               # dual-cite · bans · thesis REAL
    whats-new.html           # minute calendar
    map.html                 # flow-maps tree
    cool.html · error/*
  sites/
    instagram/stories.html   # P0 Stories
    snapchat/story.html · spectacles.html · discover.html
    pokemongo/index.html · team.html · catch.html · battery.html
    facebook/reactions.html
    iphone/jack.html
    airpods/index.html · pair.html
    vine/goodbye.html
    musically/index.html · create.html
    whatsapp/security.html
    allo/index.html
    oculus/rift.html
    linkedin/deal.html
    windows10/index.html · about.html
    edge/index.html
    nintendo/switch.html
    # + cloned continuity forest (amazon, gmail, …) scrubbed later

js/config/2016.js            # year config · dirbar · locationHints · bookmarks
js/config/immersion-2016.js  # features · storagePrefix itt16
js/immersion-2016.js         # stub → boot.js
js/immersion/year-2016-extras.js   # Stories · GO · Reactions · jack · AirPods · Vine
css/period-2016.css          # buttons/shell tokens (itt16-*)
e2e/2016-mvp.spec.js
e2e/2016-densify.spec.js
e2e/2016-flows.spec.js
e2e/2016-real-flows.spec.js
e2e/2016-trail-real-flows.spec.js
e2e/2016-shell-honesty.spec.js
assets/period/2016/{instagram,pokemongo,facebook,apple,airpods,vine,whatsapp,windows10,oculus,snap}/
```

## 1.3 Config touch points (minute)

| File | What to set |
|------|-------------|
| `js/config/2016.js` | `year: "2016"` · keys `itt-2016-*` · `immersionScript: "js/immersion-2016.js"` · `defaultBookmarks` 2016 P0 · `dirSiteKeys` Stories/GO/Reactions-first · `locationHints` re for stories, pokemon, reactions, airpods, vine goodbye, musically, allo |
| `js/config/immersion-2016.js` | `storagePrefix: "itt16"` · `features.year2016extras: true` · thesis comment 2016 |
| `js/immersion/registry.js` | Register `immersion/year-2016-extras.js` |
| `package.json` | `"test:e2e:2016": "playwright test e2e/2016-*.spec.js --workers=1"` |
| `index.html` hub | Unlock year card 2016 · meta range **1994–2016** |
| `scripts/check-all-years.py` | Include 2016 when tree exists |
| `js/config/flow-maps.js` | Already has 2016 — align HTML hrefs exactly |

## 1.4 Scaffold phases (order of work)

| Phase | Name | How (steps) | Acceptance |
|------:|------|-------------|------------|
| **0** | Freeze accept | Human reads READ-FIRST + this bible | Dual-cite + bans agreed |
| **1** | Clone tree | `cp -R years/2015 years/2016` · mass replace year strings carefully | Tree exists |
| **2** | Engine wire | config 2016 · immersion stub · registry · period CSS · hub card | `/years/2016/` boots `data-itt-year=2016` |
| **3** | Spine scrub | home · about · whats-new · connect overlay · dirbar/bookmarks | No 2015 Watch/Win10-free as primary thesis |
| **4** | P0 rooms | Build each P0 HTML + extras JS REAL | mvp + real e2e green |
| **5** | e2e pack | densify · flows · trail · shell | `npm run test:e2e:2016` ≥40 |
| **6** | P1 densify | musical.ly · Allo · Rift · LinkedIn · Win10 end · Spectacles · Switch | densify asserts |
| **7** | CAPTURE | H16 folders · wire or failed-final | CAPTURE-LOG rows closed |
| **8** | Promote L3 | grade card · DISK-TRUTH residual L4 only | Museum-ready L3 |

---

# Part 2 — Global UI/UX system (shared chrome)

## 2.1 Design principles

| Principle | Application |
|-----------|-------------|
| **Museum 2016 voice** | Product rooms speak period marketing tone; About speaks honesty labels |
| **REAL is visible** | Numbered steps · check panels · status green/red · incomplete never silent-succeeds |
| **Trail continuity** | Every P0 ends with **Next →** CTA to next trail room |
| **No brand invention** | Colored CSS shells + text placeholders until CAPTURE OK |
| **Mobile-honest, desktop-rendered** | Rooms max-width ~420–540px phone-card on desktop iframe (same as 2015) |
| **Button system** | Port `itt15-*` patterns → **`itt16-*`** in `period-2016.css` |

## 2.2 Shared CSS tokens (`css/period-2016.css`)

```
@import period-2015.css;

.itt16-shell          card container
.itt16-crumb          breadcrumb
.itt16-title · .itt16-lead
.itt16-banner · .info · .warn · .danger
.itt16-steps li .n    numbered chips
.itt16-panel · .itt16-check
.itt16-field · .itt16-input
.itt16-btn · -primary · -secondary · -ghost · -block · -lg
.itt16-btn-ig         Instagram gradient class (purple/orange CSS only · no logo invent)
.itt16-btn-pogo       Pokémon GO teal/blue
.itt16-btn-fb         Facebook blue #3b5998
.itt16-btn-apple      near-black #111
.itt16-btn-airpods    white on dark
.itt16-btn-vine       Vine green
.itt16-btn-musically  pink/teal musical.ly class
.itt16-btn-wa         WhatsApp green
.itt16-status.is-ok · .is-err
.itt16-next           dashed trail CTA box
.itt16-trail-card     home grid cards
```

### Theme shells (top accent only — no fake logos)

| Theme class | Accent | Used on |
|-------------|--------|---------|
| `theme-ig` | #c13584 / gradient bar | Stories |
| `theme-pogo` | #1a73e8 | Pokémon GO |
| `theme-fb` | #3b5998 | Reactions |
| `theme-apple` | #111 | jack · AirPods |
| `theme-vine` | #00bf8f | Vine goodbye |
| `theme-mly` | #ff006e | musical.ly |
| `theme-wa` | #25d366 | WA security |
| `theme-ms` | #0078d7 | Win10 / LinkedIn deal |
| `theme-allo` | #4285f4 | Allo |
| `theme-rift` | #1c1e21 | Oculus |

## 2.3 Shared room layout (every P0 page)

```
┌─────────────────────────────────────┐
│ crumb: Start · siblings · about     │
│ [banner honesty if needed]          │
│ H1 title                            │
│ lead paragraph (1–2 lines)          │
│ ○ steps chips 1·2·3                 │
│ ┌ panel literacy / form ─────────┐  │
│ │ check rows / inputs            │  │
│ └────────────────────────────────┘  │
│ [ primary button ] [ secondary ]    │
│ status box (ok/err)                 │
│ list / feed (if product)            │
│ ┌ next trail CTA ────────────────┐  │
│ │ Next · Room →                  │  │
│ └────────────────────────────────┘  │
│ hint: key itt16-…                   │
└─────────────────────────────────────┘
```

## 2.4 Shell chrome (year `index.html`)

| Element | 2016 copy |
|---------|-----------|
| `body` | `class="year-2016 os-win7"` or `os-win10` residual honesty · `data-itt-year="2016"` |
| Connect overlay title | Network Connections |
| Connect body | **2016 thesis:** Stories · Pokémon GO · Reactions · jack · Vine · WhatsApp E2E |
| Connect button | Connect (always-on broadband) |
| Window title suffix | Chrome / IE class residual |

## 2.5 Home (`pages/home.html`) structure

1. **H1** Starting Point — 2016  
2. **Scale line** Live Stats June **1,045,534,808** (+21%) · users **3,424,971,237**  
3. **Thesis banner** Stories · outdoor AR · Reactions · jack · Vine end · E2E  
4. **Tour CTA** → About  
5. **Trail card grid** (2 columns desktop / 1 mobile):

| Card | Kicker | Title | Meta | href |
|------|--------|-------|------|------|
| T1 | Stories war | Instagram Stories | 24h slide · Snap residual | `sites/instagram/stories.html` |
| T2 | Outdoor AR | Pokémon GO | Location · team · catch · battery | `sites/pokemongo/index.html` |
| T3 | Feed emotion | Facebook Reactions | Beyond Like · Feb 24 | `sites/facebook/reactions.html` |
| T4 | Phone autumn | iPhone 7 → AirPods | Jack death · wireless buds | `sites/iphone/jack.html` |
| T5 | Six-second end | Vine → musical.ly | Goodbye · lip-sync (not TikTok) | `sites/vine/goodbye.html` |
| T6 | Messaging trust | WhatsApp E2E | Default encryption Apr | `sites/whatsapp/security.html` |

6. **P1 densify buttons** Allo · Rift · LinkedIn deal · Win10 free end · Spectacles · Switch announce  
7. **Continuity archive** (2015): Watch · Win10 free residual · Periscope · Music · Photos · blockers  
8. **Hard bans banner** TikTok brand · Meta · Reels · Chromium Edge · Face ID  

## 2.6 Interaction feedback (global)

| Event | UI |
|-------|-----|
| Incomplete click | Status `.is-err` · red panel · **no** localStorage write |
| Success click | Status `.is-ok` · green panel · key written · `[data-itt16-next]` unhidden |
| Toast | `ITT._immersionApi.actionFeedback` flash 3–4s |
| List render | Product list grows under status (Stories slides · GO catches · musical.ly posts) |

---

# Part 3 — Scale + About (flow B)

## 3.1 Artifact

| Field | Value |
|-------|--------|
| Path | `pages/about.html` |
| Storage | `itt16-thesis-ack` |
| Sources | Live Stats websites + users tables · harvest §1 |

## 3.2 UI screen (minute)

1. Crumb → Start  
2. H1 About the Web in 2016  
3. Thesis paragraph (one-line from READ-FIRST)  
4. **Scale list**  
   - Live Stats June 2016 websites: **1,045,534,808** (**+21%**)  
   - Live Stats 2016 users: **3,424,971,237**  
   - Honesty: 1B restabilized **Mar 2016** · Jan~900M→Dec~1.7B hostnames · active **~170M**  
5. **Bans danger banner** TikTok brand · Meta · Reels · Chromium Edge · Face ID / iPhone X  
6. REAL panel: 2× `data-req` checks · button `data-itt-real-save data-storage-key="thesis-ack"`  
7. Next CTA → Instagram Stories  

## 3.3 REAL rules

| Incomplete | Behavior |
|------------|----------|
| <2 checks | Block · err status |
| ≥2 + click | Write JSON `{ multiStep, real, year:2016, ts }` |

---

# Part 4 — Each flow in full (A–T + trails)

Legend for every flow block:

- **Visitor journey** — what they do  
- **UI/UX** — layout · colors · components  
- **Artifacts** — files · DOM hooks · storage  
- **Sources** — why dates/copy  
- **Build how** — JS wiring  

---

## Flow A — Enter year (shell boot)

| | |
|--|--|
| **Path** | `/years/2016/` → `pages/home.html` |
| **Storage** | none required · optional `itt-last-year=2016` on exit |
| **Sources** | ARCHITECTURE · 2015 shell pattern |

**Visitor journey**

1. Hub card **2016** available  
2. Click → connect overlay  
3. Connect or Skip  
4. iframe loads Starting Point  

**UI/UX**

- Connect box max-width ~280px period dialog  
- Body text 2016 thesis only (not 2015 Watch/free Win10 spine)  
- Window chrome Win7 residual or Win10 class per config honesty  

**Build how**

- `years/2016/index.html` from 2015 shell  
- `body.year-2016` · load `js/config/2016.js` via browser create  
- e2e: `data-itt-year=2016` · `#content` visible  

---

## Flow B — Thesis About (see Part 3)

---

## Flow C — Instagram Stories (P0 · T1 start)

### Visitor journey (minute)

1. Open `sites/instagram/stories.html`  
2. Read honesty: **Aug 2 2016** · 24h · Snapchat-class · **not Reels**  
3. See step chips: 1 Write · 2 Add · 3 See list  
4. Type slide text (≥2 chars)  
5. Optional: pick sticker/mood chip (text only: “at the beach”, “coffee”)  
6. Check literacy: “Disappears in 24h theater” · “Not Instagram Reels”  
7. Click **Add to Story**  
8. Empty text → **blocked** red status  
9. Success → list shows “Your story · now” · `itt16-ig-stories` written  
10. Next CTA → Snap residual **or** Pokémon GO  

### UI/UX (minute)

| Region | Spec |
|--------|------|
| Shell | `itt16-shell theme-ig` · max-width 400px · white card · top gradient bar pink→orange **CSS only** |
| Header | Word “Stories” · not official logo SVG invent |
| Camera area | Tall rounded rect gray placeholder “camera theater” · no photo upload required |
| Input | Full-width textarea 2 rows · placeholder “Share a moment…” |
| Stickers | Horizontal chip row (optional · data-ig-sticker) |
| Primary btn | Full width · `itt16-btn-ig` · “Add to Story” |
| List | Rings-as-circles CSS (gradient ring · gray fill · initials) · timestamp “just now” |
| Status | Under button · ok/err |

### Artifacts

| Kind | Value |
|------|--------|
| Path | `years/2016/sites/instagram/stories.html` |
| Optional multipage | `about.html` “Why Stories 2016” |
| Hooks | `[data-ig-story-text]` · `[data-ig-story-add]` · `[data-ig-story-list]` · `[data-req]` |
| Storage | `itt16-ig-stories` = array of `{ text, sticker?, multiStep, real, ts }` max 30 |
| JS | `year-2016-extras.js` → `bootIgStories(doc)` |
| CAPTURE | H16-01 |

### Sources

- TechCrunch 2016-08-02 Instagram Stories  
- Wikipedia Timeline of Instagram  

### REAL gate

| Condition | Result |
|-----------|--------|
| text length < 2 | block error · no write |
| literacy checks < min (if used) | block |
| ok | unshift list · saveJSON |

---

## Flow D — Snapchat Story residual (T1 end)

### Visitor journey

1. From Stories Next → `sites/snapchat/story.html`  
2. Honesty: Snapchat **still competes** · Stories invented 2013 · IG copied 2016  
3. Optional soft residual ack or existing 2015 story compose if cloned  
4. Next → Pokémon GO  

### UI/UX

- Yellow `#fffc00` page bg residual  
- Black primary buttons  
- Banner: “Not dead · IG Stories war”  

### Artifacts

| Path | `sites/snapchat/story.html` (clone densify) |
| Storage | optional residual · not required for T1 pass |
| Sources | Continuity from 2013/2015 Snap Stories rooms |

---

## Flow E–F — Pokémon GO (P0 · T2)

### Multipage structure

| Page | Role |
|------|------|
| `sites/pokemongo/index.html` | Location honesty + start |
| `sites/pokemongo/team.html` | Pick Instinct / Mystic / Valor |
| `sites/pokemongo/catch.html` | Throw theater · catch list |
| `sites/pokemongo/battery.html` | Battery drain literacy · final save |

### Visitor journey (minute)

1. **index** — map placeholder (grid + “GPS theater”) · check “I understand: location used for game literacy · no real GPS” · check “server strain / battery lore 2016” · Continue  
2. **team** — three big team cards (yellow / blue / red **CSS colors only** · no invent official art) · pick one required · Continue  
3. **catch** — species name input or pick from 3 text options (Pidgey / Rattata / Zubat class) · “Throw Poké Ball” button · empty blocked · list grows  
4. **battery** — check “Battery drain was real culture 2016” · **Save adventure** → writes full `itt16-pogo`  
5. Incomplete any step without checks → no final key (intermediate keys optional)  

### UI/UX (minute)

| Screen | Spec |
|--------|------|
| Overall | `theme-pogo` · blue sky gradient header bar · white card |
| Map theater | 160px height · light green/gray CSS tiles · pin emoji or CSS circle “you” |
| Team cards | 3 equal columns · big letter I/M/V · name · selected border 3px |
| Catch | Center circle “AR view theater” · input · primary teal button |
| Battery | Orange warn banner · checklist · full-width save |
| Next | → Facebook Reactions |

### Artifacts

| Kind | Value |
|------|--------|
| Paths | index · team · catch · battery |
| Hooks | `[data-pogo-loc]` checks · `[data-pogo-team="mystic"]` · `[data-pogo-catch]` · `[data-pogo-species]` · `[data-pogo-save]` · `[data-pogo-status]` · `[data-pogo-list]` |
| Storage | `itt16-pogo` = `{ locationOk, team, catches:[], batteryOk, multiStep, real, shipped:"2016-07-06", ts }` |
| Intermediate optional | `itt16-pogo-team` · `itt16-pogo-catches` |
| JS | `bootPogo(doc)` multipage-aware |
| CAPTURE | H16-02 |
| Sources | TechCrunch Jul 6 2016 · Wikipedia release table AU/NZ/US |

### REAL gates

| Step | Block if |
|------|----------|
| index | location checks incomplete |
| team | no team selected |
| catch | empty species |
| battery/save | battery check off OR missing team/catches |

---

## Flow G — Facebook Reactions (P0 · T3)

### Visitor journey

1. Open `sites/facebook/reactions.html`  
2. See fake feed post (museum text: “Friend shared a photo from 2016”)  
3. Steps: 1 Open post · 2 Long-press theater · 3 Pick reaction  
4. Buttons row: Like · Love · Haha · Wow · Sad · Angry  
5. No pick + Save → blocked  
6. Pick + confirm → `itt16-reactions` · show “You reacted: Love”  
7. Next → iPhone jack  

### UI/UX

| Region | Spec |
|--------|------|
| Shell | `theme-fb` · FB blue top · Helvetica |
| Post card | Avatar circle gray · name · timestamp · body text · gray image placeholder |
| Reaction bar | 6 circular emoji-text buttons (Unicode 👍 ❤️ 😆 😮 😢 😡) · hover scale 1.1 |
| Active | Ring blue around selected |
| Primary | “Post reaction (REAL)” after pick |
| Honesty | “Feb 24 2016 global · not Meta branding · not invent Care (later)” |

### Artifacts

| Path | `sites/facebook/reactions.html` |
| Hooks | `[data-fb-react="love"]` etc · `[data-fb-react-save]` · `[data-fb-react-status]` |
| Storage | `itt16-reactions` = `{ reaction:"love", multiStep, real, ts }` |
| Sources | Meta newsroom Feb 24 2016 · Forbes · BI |
| CAPTURE | H16-03 |

---

## Flow H — iPhone 7 jack literacy (P0 · T4 start)

### Visitor journey

1. Open `sites/iphone/jack.html`  
2. Banner: **Sep 7 2016** · no 3.5mm jack · Lightning EarPods / dongle culture  
3. Steps: 1 Read · 2 Checks · 3 Save  
4. Three literacy checks required:  
   - Jack removed on iPhone 7 class  
   - Dongle / Lightning audio residual real  
   - Not invent Face ID / iPhone X (2017)  
5. Save → `itt16-iphone7-jack`  
6. Next → AirPods  

### UI/UX

| Spec | Detail |
|------|--------|
| Shell | `theme-apple` · white · SF-ish Helvetica · thin H1 |
| Hero | CSS side-view phone silhouette with **X** over jack hole (drawn CSS · no invent product photo) |
| Checks | `itt16-check` rows |
| Button | black `itt16-btn-apple` “Save jack literacy” |
| Sources | Apple event press · ABC · AirPods newsroom same day |

### Artifacts

| Path | `sites/iphone/jack.html` |
| Hooks | `[data-req]` ×3 · `data-itt-real-save data-storage-key="iphone7-jack"` or custom `data-jack-save` |
| Storage | `itt16-iphone7-jack` |
| CAPTURE | H16-04 |

---

## Flow I — AirPods (P0 · T4 end)

### Visitor journey

1. Open `sites/airpods/index.html`  
2. Honesty split: **Announced Sep 7** · **orders Dec 13** · stores Dec 20 class  
3. Checks: announce≠instant mass ship · no invent AirPods Pro  
4. Optional pair page `pair.html` — “open case near iPhone theater”  
5. Save → `itt16-airpods` `{ ordered, paired?, multiStep, real, ts }`  
6. Next → Vine goodbye  

### UI/UX

| Spec | Detail |
|------|--------|
| Shell | dark `#111` card · white text · product-minimal |
| Visual | Two white CSS ellipses “bud theater” · no invent product render |
| Buttons | white outline “Order theater” · solid “Save” |
| Sources | Apple Newsroom Sep 7 · Wikipedia orders Dec 13 |
| CAPTURE | H16-05 |

---

## Flow J — Vine goodbye (P0 · T5 start)

### Visitor journey

1. Open `sites/vine/goodbye.html`  
2. Epitaph: **Oct 27 2016** · mobile app discontinued in coming months · website archive intent  
3. Checks: announce day literacy · 6-second loop culture · not invent TikTok-as-Vine  
4. Acknowledge → `itt16-vine-end`  
5. Next → musical.ly  

### UI/UX

| Spec | Detail |
|------|--------|
| Shell | `theme-vine` · dark bg · green accents |
| Banner | danger/epitaph “Coming months · not offline today” |
| Loop theater | CSS looping border animation optional subtle |
| Button | “Acknowledge Vine wind-down” |
| Sources | TechCrunch · Guardian · Vine Medium post |
| CAPTURE | H16-06 |

---

## Flow K — musical.ly (P0/P1 · T5 end)

### Visitor journey

1. Open `sites/musically/index.html`  
2. Honesty: **musical.ly** 2016 teen lip-sync · **not TikTok brand** (merge 2018)  
3. Create page: pick song title text · “record” theater 15s class · post  
4. Empty song blocked  
5. Save list → `itt16-musically`  
6. Next → WhatsApp E2E  

### UI/UX

| Spec | Detail |
|------|--------|
| Shell | `theme-mly` · dark vertical phone · pink accent |
| Feed | Vertical cards “muser · song title · ♡ count theater” |
| Create | Song input · record button pulse CSS · post |
| Never | Word **TikTok** as product name in H1 (may appear only in bans “not TikTok”) |
| Sources | Wikipedia musical.ly · TikTok newsroom 2018 merge for ban proof |

### Artifacts

| Paths | `index.html` · `create.html` |
| Hooks | `[data-mly-song]` · `[data-mly-post]` · `[data-mly-list]` · checks not TikTok |
| Storage | `itt16-musically` array |

---

## Flow L — WhatsApp E2E (P0 · T6 start)

### Visitor journey

1. Open `sites/whatsapp/security.html`  
2. Banner: **April 2016** default E2E for messages/calls/media/groups · ~1B users class  
3. Show lock icon CSS + “Your chats are private theater”  
4. Checks: default on · not invent 2014-as-E2E-default · no real crypto  
5. Save → `itt16-wa-e2e`  
6. Next → Allo (P1) or home  

### UI/UX

| Spec | Detail |
|------|--------|
| Shell | WA green header `#075e54` · chat green `#25d366` accents (continuity from 2014 WA rooms) |
| Center | Large lock + short literacy copy |
| Button | “Confirm E2E literacy” |
| Sources | WhatsApp blog Apr 5 · EFF Apr 7 · BBC |
| CAPTURE | H16-07 |

---

## Flow M — Google Allo (P1)

### Visitor journey

1. `sites/allo/index.html`  
2. Sep 21 2016 · smart reply chips · Assistant literacy · **no real Assistant**  
3. Type message · pick smart-reply chip · save `itt16-allo`  
4. Empty message blocked if require-field  

### UI/UX

| Spec | Google blue · smart reply gray chips under composer · “Incognito” note optional honesty |

### Sources

- Google blog Allo · Wikipedia Allo  

---

## Flow N — Oculus Rift CV1 (P1)

### Visitor journey

1. `sites/oculus/rift.html`  
2. Mar 28 2016 ship · **$599** · PC tethered · not Quest  
3. Checks + save `itt16-rift`  

### UI/UX

| Dark VR card · price big · “ships to door theater” · no invent Quest UI |

### Sources

- Wikipedia Oculus Rift CV1 · Oculus pre-order blog class  

---

## Flow O — Microsoft × LinkedIn (P1)

### Visitor journey

1. `sites/linkedin/deal.html`  
2. **Jun 13 2016** · **$26.2B** · $196/share · brand independence note  
3. Literacy + save `itt16-linkedin-deal`  

### UI/UX

| MS blue + LinkedIn blue split header · deal fact table |

### Sources

- Microsoft newsroom · Reuters · NYT  

---

## Flow P — Windows 10 free upgrade ends (P1)

### Visitor journey

1. `sites/windows10/index.html` rewrite from 2015 free-upgrade spine  
2. Honesty: free offer **ended Jul 29 2016** · Anniversary Update class  
3. Checks: not free forever · Win7 residual still real  
4. Save `itt16-win10-end`  

### UI/UX

| MS blue · banner “Offer ended” · contrast with 2015 free CTA residual archive link |

### Sources

- ZDNet Jul 30 2016 · MS Anniversary posts  

---

## Flow Q — Edge residual

### Visitor journey

1. Prefer Edge theater residual (Spartan)  
2. Explicit **not Chromium Edge**  
3. Optional residual key  

### UI/UX

| Same as 2015 Edge room · densify about page |

---

## Flow R — Snap Spectacles (P1)

### Visitor journey

1. `sites/snapchat/spectacles.html`  
2. Sep 24 announce · Nov 10 Snapbot · circular video · $129 class  
3. “Find Snapbot” map theater · save `itt16-spectacles`  

### UI/UX

| Yellow page · yellow vending machine CSS box · circular video placeholder |

### Sources

- Wired · Verge · Wikipedia Spectacles  

---

## Flow S — Nintendo Switch announce (P1)

### Visitor journey

1. `sites/nintendo/switch.html`  
2. **Oct 20 2016** reveal · **ships 2017** honesty  
3. Ack only `itt16-switch-announce`  

### UI/UX

| Red/white Nintendo-ish · trailer placeholder · big “ships 2017” banner |

### Sources

- Nintendo news Oct 2016  

---

## Flow T — Platform literacy (optional careful)

### Visitor journey

1. Optional room only after human OK  
2. Teach: ranking · share · ads · “fake news” as **2016 phrase**  
3. **No** candidate pages · no harassment content  
4. Ack `itt16-platform-literacy`  

### UI/UX

| Neutral museum gray · three literacy checks · ban partisan dump |

### Sources

- NPR · Guardian Nov 2016 social media discourse (context only)  

---

# Part 5 — Trail packs (multi-hop e2e)

| Trail | Steps (ordered) | Keys required |
|-------|-----------------|---------------|
| **T1 Stories war** | IG Stories success → Snap residual page load | `itt16-ig-stories` |
| **T2 Outdoor AR** | GO index checks → team → catch ≥1 → battery save | `itt16-pogo` |
| **T3 Feed emotion** | Pick reaction → save | `itt16-reactions` |
| **T4 Phone autumn** | Jack save → AirPods save | `itt16-iphone7-jack` · `itt16-airpods` |
| **T5 Six-second end** | Vine end → musical.ly post | `itt16-vine-end` · `itt16-musically` |
| **T6 Trust** | WA E2E → Allo optional | `itt16-wa-e2e` (+ optional allo) |

**e2e file:** `e2e/2016-trail-real-flows.spec.js`  
**Pattern:** clear keys → step → `expect` key truthy → next URL  

---

# Part 6 — Artifact master table (all storage)

| Key | Written by | Shape (JSON) |
|-----|------------|--------------|
| `itt16-thesis-ack` | about REAL | `{ multiStep, real, checks, year, ts }` |
| `itt16-ig-stories` | Stories add | `[{ text, sticker?, multiStep, real, ts }, …]` |
| `itt16-pogo` | GO final save | `{ locationOk, team, catches[], batteryOk, multiStep, real, ts }` |
| `itt16-reactions` | Reactions | `{ reaction, multiStep, real, ts }` |
| `itt16-iphone7-jack` | jack save | `{ multiStep, real, ts }` |
| `itt16-airpods` | AirPods | `{ ordered, paired?, multiStep, real, ts }` |
| `itt16-vine-end` | Vine goodbye | `{ multiStep, real, ts }` |
| `itt16-musically` | musical.ly | `[{ song, multiStep, real, ts }, …]` |
| `itt16-wa-e2e` | WA security | `{ multiStep, real, defaultE2E:true, ts }` |
| `itt16-allo` | Allo | `{ reply?, multiStep, real, ts }` |
| `itt16-rift` | Rift | `{ multiStep, real, price:599, ts }` |
| `itt16-linkedin-deal` | LinkedIn | `{ multiStep, real, amount:"26.2B", ts }` |
| `itt16-win10-end` | Win10 | `{ freeEnded:true, multiStep, real, ts }` |
| `itt16-spectacles` | Spectacles | `{ multiStep, real, ts }` |
| `itt16-switch-announce` | Switch | `{ multiStep, real, ships:2017, ts }` |

**Isolation rule:** 2016 pages never write `itt15-*` or `itt14-*`.

---

# Part 7 — Source → product map (implementer cheat sheet)

| Product | Primary sources | Date lock |
|---------|-----------------|-----------|
| Scale sites | internetlivestats.com/total-number-of-websites | June 2016 = 1,045,534,808 |
| Scale users | internetlivestats.com/internet-users | 2016 = 3,424,971,237 |
| Reactions | about.fb.com Reactions global · Forbes · BI | Feb 24 2016 |
| WA E2E | blog.whatsapp.com/end-to-end-encryption · EFF · BBC | Apr 5–7 2016 |
| Pokémon GO | techcrunch.com 2016-07-06 · Wikipedia | Jul 6 2016 |
| IG Stories | techcrunch.com 2016-08-02 · Wiki timeline | Aug 2 2016 |
| iPhone 7 / AirPods | apple.com/newsroom AirPods · ABC jack · Wiki AirPods | Sep 7 / Dec 13 |
| Vine | techcrunch 2016-10-27 · Guardian · Medium @vine | Oct 27 2016 |
| LinkedIn deal | news.microsoft.com 2016-06-13 | Jun 13 · $26.2B |
| Win10 free end | zdnet free upgrades after Jul 29 | Jul 29 2016 |
| Rift CV1 | Wikipedia Oculus Rift CV1 | Mar 28 2016 · $599 |
| Allo | blog.google Allo | Sep 21 2016 |
| Spectacles | Wired · Verge · Wiki | Sep 24 / Nov 10 |
| Switch | Nintendo news | Oct 20 2016 announce |
| musical.ly | Wikipedia · TikTok newsroom 2018 (ban proof) | 2016 mass · not TikTok |

Full visit log: [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md).

---

# Part 8 — JS module design (`year-2016-extras.js`)

```
bootAll(doc):
  bootIgStories(doc)
  bootPogo(doc)
  bootReactions(doc)
  bootJack(doc)        // or rely on data-itt-real-save
  bootAirPods(doc)
  bootVineEnd(doc)     // or real-save
  bootMusically(doc)
  bootWaE2e(doc)       // or real-save
  bootAllo(doc)
  // revealNext on success for [data-itt16-next]
```

| Helper | Behavior |
|--------|----------|
| `prefix()` | `itt16` |
| `key(suffix)` | immersionStorageKey |
| `feedback(msg, st, {error})` | text + `.is-ok` / `.is-err` |
| `revealNext(doc)` | unhide `[data-itt16-next]` |
| `saveJSON` | localStorage setItem JSON |

Register feature id `year2016extras` like 2015.

---

# Part 9 — e2e pack structure

| File | Asserts |
|------|---------|
| `2016-mvp.spec.js` | shell year · home thesis · about dual-cite · P0 paths 200 |
| `2016-densify.spec.js` | bans · multipage · gems · musical.ly not TikTok H1 |
| `2016-flows.spec.js` | A–T storage-hard groups |
| `2016-real-flows.spec.js` | incomplete blocked then success each P0 |
| `2016-trail-real-flows.spec.js` | T1–T6 |
| `2016-shell-honesty.spec.js` | free upgrade **ended** · Stories allowed · not Chromium Edge · connect thesis 2016 |

---

# Part 10 — Continuity scrub checklist (post-clone)

| Item | Action |
|------|--------|
| home primary trails | 2016 P0 only |
| 2015 Watch/Win10-free/Edge-as-new | Archive section only |
| dirSiteKeys | stories · pokemongo · reactions · airpods · vine · musically · whatsapp first |
| defaultBookmarks | 2016 titles |
| connect overlay | 2016 thesis |
| Snap Discover | residual gem · not primary over Stories |
| Instagram main | must not claim Stories-absent; Stories is P0 |
| Facebook feed residual | may link to reactions room |
| Bans on about | TikTok brand · Meta · Reels · Chromium Edge · Face ID |

---

# Part 11 — CAPTURE + empty states + errors

## CAPTURE

Follow [`references/2016/CAPTURE-LOG.md`](references/2016/CAPTURE-LOG.md) H16-01…10.

| Result | UI |
|--------|-----|
| OK | `<img src="../../../../assets/period/2016/...">` |
| failed-final | RECON placard “period still unavailable · text theater” |

## Empty / error states (every REAL room)

| State | UI |
|-------|-----|
| First visit | Empty list “No stories yet” / “No catches yet” |
| Incomplete action | Red status · list unchanged · storage unchanged |
| Success | Green status · list item · Next CTA appears |
| Reload | Re-render list from localStorage |

---

# Part 12 — What will NOT be built (explicit)

| Out of scope | Why |
|--------------|-----|
| Real GPS / Niantic servers | Theater only |
| Real Instagram/FB Graph | No APIs |
| Real video encode | Text slides / CSS only |
| TikTok-branded room as default | musical.ly only |
| Candidate campaign pages | Optional literacy only |
| Chromium Edge | Wrong era |
| Face ID / iPhone X | 2017 |
| Fortnite free BR | 2017 |
| Invent brand SVG logos | CAPTURE or text |

---

# Part 13 — Acceptance gates (when claiming done)

```bash
python3 scripts/check-all-years.py          # 2016 pass
npm run test:e2e:2016                       # all packs green
```

| Bar | Definition |
|-----|------------|
| **MVP** | Shell + About + all P0 rooms REAL + mvp/real e2e |
| **L3 densify** | Full e2e pack · multipage GO · P1 gems · continuity scrub · grade card L3 |
| **L4** | Perfect pixels · full forest voice · optional platform literacy |

---

# Part 14 — Implementer day-by-day (suggested)

| Day | Work |
|----:|------|
| 1 | Accept freeze · clone tree · wire config/registry/hub · shell boots |
| 2 | Home · about · whats-new · period CSS buttons · connect copy |
| 3 | Stories + Reactions REAL + e2e real |
| 4 | Pokémon GO multipage REAL + trail T2 |
| 5 | Jack · AirPods · Vine · WA E2E |
| 6 | musical.ly · trails T1 T4 T5 T6 · flows pack |
| 7 | P1 Allo · Rift · LinkedIn · Win10 end · Spectacles · Switch |
| 8 | densify + shell-honesty + CAPTURE folders · promote L3 docs |

---

# Part 15 — One-page UI mock (Stories room example)

```
┌──────── itt16-shell theme-ig ───────────┐
│ Start · Snap residual · About Stories   │
│ ┌ honesty ────────────────────────────┐ │
│ │ Aug 2 2016 · 24h · not Reels        │ │
│ └─────────────────────────────────────┘ │
│ Stories                                 │
│ Share moments that disappear (theater). │
│ (1) Write  (2) Add  (3) List            │
│ ┌ camera placeholder 160px ───────────┐ │
│ └─────────────────────────────────────┘ │
│ [ Share a moment…____________________ ] │
│ ☑ 24h literacy  ☑ Not Reels             │
│ [====== Add to Story (full width) ====] │
│ status: Saved · itt16-ig-stories        │
│ • Your story · coffee · just now        │
│ ┌ Next trail ─────────────────────────┐ │
│ │ Outdoor AR · Pokémon GO →           │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

**Status:** This bible is the **minute implement plan**. Scaffold starts only after freeze accept.  
**Next human command:** “scaffold 2016” or “implement phase 1”.  
