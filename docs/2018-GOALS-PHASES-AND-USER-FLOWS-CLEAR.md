# 2018 — Clear goals, phases, and **detailed UI user flows**

**Date:** 2026-08-06 (expanded deep-research + full UI maps)  
**Purpose:** Readable playbook for building museum year **2018** — goals, phases, and **every multi-step flow mapped for UI**.

1. **Goals** — what “done” means  
2. **Phases** — ordered build steps  
3. **Flows A–T** — period life → museum UI  
4. **UX tree map** — trails · rooms · steps  
5. **Per-room UI wireframes** — screen layout · controls · states · storage  
6. **Click-by-click state machines** — implement gate  
7. **Storage · anti-goals · done**

> **Start here:** [`2018-READ-FIRST.md`](2018-READ-FIRST.md)  
> **★ Research phases (minute detail R0–R14):** [`2018-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2018-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md)  
> **★ Implement:** [`2018-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2018-IMPLEMENTATION-PHASES-STEP-BY-STEP.md)  
> **Master bible:** [`2018-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2018-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md)  
> **Deep harvest (multi-source):** [`2018-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md`](2018-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md)

**Disk truth:** Hub **1994–2018** · **2018 MVP live** · prefix **`itt18`**.  
**Legal:** localStorage only · never invent brand pixels · no real tracking · careful CA framing.

---

# Part 1 — Goals

## 1.1 One-line goal

Museum-grade **2018**: Win10 + Chrome shell, REAL theater for **GDPR consent · platform trust (CA/Zuck careful) · TikTok mass brand · IGTV · post-boom scale −8%**, plus densified **complex modern product rooms** (Netflix · Spotify · Discord · YouTube · Twitter).

## 1.2 Visitor outcome

```
Hub → 2018
  → Win10 mass · Chrome · Face ID residual · iOS 12 late
  → About: 1,630,322,579 (−8%) · ITU ~3.9B / 51.2% · bans
  → GDPR cookie/consent multi-step (theater)
  → Platform trust literacy (CA · Congress · careful)
  → TikTok (Musical.ly merge Aug 2) short-video
  → IGTV vertical long-form (Jun 20 · ≤1 hour)
  → Modern: Netflix · Spotify · Discord · YouTube · Twitter 280 residual
  → P1: XS/XR · Google+ dual · Fortnite residual · crypto winter
  → Exit · itt18-* only · itt-last-year=2018
```

## 1.3 Thesis themes

Consent as UI · platform accountability · short-video industrialization · hostname cooldown · vertical video chase · residual free Battle Royale · still pre-Meta / pre-Reels / pre-COVID.

### Period voice

> Accept cookies · manage preferences · who has my data · Zuck is in Congress · Musical.ly is suddenly TikTok · IGTV vertical hour · Fortnite still free · Face ID residual · crypto winter · still not Meta · still not Reels.

---

# Part 2 — Phases (R · 0–13)

| Phase | Name | Status |
|------:|------|--------|
| **R** | Research freeze | **[x]** 2026-08-06 |
| **0** | Capture dirs | **[x]** |
| **1** | Inventory parent 2017 | **[x]** |
| **2** | Scaffold from 2017 · `itt18` | **[x]** |
| **3** | Shell labels | **[x]** |
| **4** | Home / About / map / tour | **[x]** |
| **5a** | GDPR consent REAL | **[x]** |
| **5b** | Platform trust / CA careful REAL | **[x]** |
| **5c** | TikTok merge REAL | **[x]** |
| **5d** | IGTV REAL | **[x]** |
| **5e–5i** | Complex modern densify | **[x]** |
| **6** | Chrome / Win10 residual | **[~]** |
| **7** | Continuity scrub (reverse TikTok ban) | **[x]** |
| **8** | Immersion REAL wiring | **[x]** |
| **9** | P1 densify | **[x]** XS · G+ |
| **10** | Trails · flow map | **[x]** |
| **11** | e2e packs | **[x]** `test:e2e:2018` 6 passed |
| **12** | Pixels | **[~]** silhouette / CSS |
| **13** | Hub unlock | **[x]** |

**Order:** R→0→1→2→3→4 → (5a–5i) → 6→7→8→9→10→11→13.  
**Clone:** `years/2017/` · prefix `itt17` → **`itt18`**.

### Scaffold cheat sheet

| Item | Source |
|------|--------|
| Clone | `years/2017/` |
| Prefix | `itt17` → **`itt18`** |
| Configs | `js/config/2018.js` · `immersion-2018.js` · `browser-2018.js` · `config/immersion-2018.js` · `immersion/year-2018-extras.js` |
| CSS | `period-2018.css` `@import period-2017.css` |
| Engine | **Do not fork** `browser/create.js` |
| Flow UX | `js/config/flow-maps.js` → `ITT.flowMaps["2018"]` |
| Assets | `assets/period/2018/{gdpr,trust,tiktok,igtv,netflix,spotify,discord,youtube,twitter,iphone,googleplus,fortnite,crypto,windows10,chrome}` |

---

# Part 3 — Flows A–T (summary)

| ID | Life (2018) | Museum room | Proof key |
|----|-------------|-------------|-----------|
| **A** | Enter year | Shell boots · Starting Point | `itt-last-year=2018` |
| **B** | State of the net | About dual scale −8% + ITU users + bans | `itt18-thesis-ack` |
| **C** | Cookie wall everywhere | GDPR consent multi-step | `itt18-gdpr` |
| **D** | “Who has my data?” | Platform trust literacy | `itt18-ca` |
| **E** | Short video is TikTok | TikTok merge room | `itt18-tiktok` |
| **F** | Vertical hour-long video | IGTV | `itt18-igtv` |
| **G** | Binge queue | Netflix modern | `itt18-netflix` |
| **H** | Free music residual | Spotify modern | `itt18-spotify` |
| **I** | Game chat + Nitro residual | Discord modern | `itt18-discord` |
| **J** | Watch + related | YouTube modern | `itt18-youtube` |
| **K** | 280 residual composer | Twitter | `itt18-twitter` |
| **L** | Free BR densify | Fortnite residual | densify P1 |
| **M** | Phone autumn | XS / XR residual | `itt18-iphonexs` |
| **N** | Social orphan ends | Google+ dual-date | `itt18-gplus` |
| **O** | Crypto winter | Literacy not advice | densify P1 |
| **P–R** | Continuity | Stories · Face ID residual · WA E2E | residual |
| **S** | Desktop residual | Win10 · Chrome | residual |
| **T** | Exit / resume | Year menu · Continue | hub · no foreign keys |

**Rule:** Incomplete multi-step → **no** `itt18-*` write.

---

# Part 4 — UX tree map (visitor-facing)

Maps to `ITT.flowMaps["2018"]` and future `years/2018/pages/map.html`.

```
2018  ·  GDPR · platform trust · TikTok mass · IGTV · hostname −8%
│  Shell: Windows 10 mass · Chrome habit · Edge residual · iOS 12 autumn
│
├─ Enter
│  ├─ Starting Point ………… chips · trails · kit
│  ├─ About 2018 …………… 1.63B · −8% · ITU ~3.9B · bans
│  └─ Year flow map ………… this tree
│
├─ Consent as UI
│  └─ GDPR theater ……… May 25 · multi-step consent
│     steps: Banner → Preferences → Rights literacy → Save
│
├─ Platform accountability
│  └─ Trust / CA literacy … Mar–Apr careful educational
│     steps: Timeline → 3 literacy → Careful ack → Save
│
├─ Short video industrial
│  ├─ TikTok ……………… Aug 2 merge · not Musical.ly brand
│  │  steps: Merge honesty → Open For You theater → Save
│  └─ IGTV ………………… Jun 20 vertical long-form ≤1h
│     steps: Open channel → Watch segment → Date check → Save
│
├─ Modern websites 2018 (complex REAL)
│  ├─ Modern lobby ……… cards
│  ├─ Netflix …………… Browse → detail → My List → Save
│  ├─ Spotify …………… Search → free play residual → Save
│  ├─ YouTube …………… Search → watch → related → Save
│  ├─ Discord …………… Channel → message → Nitro residual → Save
│  └─ Twitter …………… Composer 280 residual → Save
│
├─ Phone autumn residual
│  └─ iPhone XS / XR …… densify Face ID · $749 / $999 / $1099
│
├─ Social orphan
│  └─ Google+ sunset …… announce Oct 8 · offline Apr 2 2019 dual
│
└─ Desktop residual
   ├─ Windows 10
   └─ Chrome habit
```

### Guided chips (home — planned)

| Chip | Trail | Storage |
|------|-------|---------|
| Cookie wall | GDPR | `itt18-gdpr` |
| Who has my data? | Trust literacy | `itt18-ca` |
| It’s TikTok now | TikTok merge | `itt18-tiktok` |
| Vertical hour | IGTV | `itt18-igtv` |
| Modern web | Netflix/Discord pack | multi-key |
| Scale −8% | About | `itt18-thesis-ack` |

### Status line pattern (all REAL rooms)

```
[ status: idle | step N of M · incomplete · no save yet ]
[ status: complete · saved itt18-* ]
[ status: abandon mid-flow · keys untouched ]
```

---

# Part 5 — Per-room UI wireframes (implement this)

Each room: **period voice · multi-step · incomplete no write · status line**.

---

### 5.0 · Shell + Starting Point (`pages/home.html`)

**Screen layout**
```
[ Win10 title bar residual · Chrome tabs residual ]
[ Year banner: 2018 · GDPR · TikTok · trust ]
[ Chips row (wrap): Cookie wall | Who has my data? | It’s TikTok now | Vertical hour | Modern web | Scale −8% ]
[ Kit cards: Consent · Accountability · Short video · Modern products ]
[ Continue / passport stamp residual ]
[ Footer: Museum · localStorage only · not legal advice ]
```

**On enter:** write `itt-last-year=2018` only (shared shell pattern from 2017).

---

### 5.0b · About (`pages/about.html`)

**Screen layout**
```
[ H1: About the internet in 2018 ]
[ Big number: 1,630,322,579 ]
[ Sub: Live Stats · June 2018 · −8% vs 2017 (1,766,926,408 +69%) ]
[ Users: ITU ~3.9 billion · 51.2% of world (end-2018 class) ]
[ Thesis paragraph ]
[ Hard bans list with reasons ]
[ ☐ I understand the museum thesis and bans ]
[ Save / Acknowledge ] → itt18-thesis-ack
```

---

### 5a · GDPR consent (`sites/gdpr/index.html`)

**Sources locked:** EUR-Lex applies **25 May 2018** · consent must be clear affirmative action class.

**Screen layout**
```
[ Sticky fake site header: “NewsSite.eu · May 2018” ]
[ Fake article body (blurred/dim while banner open) ]

[ Full-width cookie banner — bottom sticky OR modal ]
  Title: We use cookies & process data under the GDPR
  Body: Necessary · Analytics · Marketing (summary)
  [ Manage preferences ]  [ Accept all ]  [ Reject non-essential ]

[ Preference panel (hidden until Manage) ]
  ☑ Necessary (locked on · always required)
  ☐ Analytics
  ☐ Marketing
  ☐ I understand data-subject rights class (access · erasure · portability · withdraw) — literacy
  Footer: Not legal advice · museum theater · applies 25 May 2018
  [ Save choices ]

[ After save: banner dismiss · “Your choices saved (museum only)” · status complete ]
```

**Steps (REAL — preferred Manage path)**
1. Open page → banner visible · **no storage**  
2. Click **Manage preferences** → panel opens  
3. Necessary stays on · toggle at least one optional category OR explicitly leave off · check **Rights literacy**  
4. **Save choices** → `itt18-gdpr`  
5. Incomplete: close tab / leave without Save → **no write**

**Alt path (period truth):** Accept all → optional short literacy toast → still prefer requiring one literacy checkbox before write (museum bar).

**Visual language:** EU blue/gray · dense legal-ish text · show Accept-all (period mass) **and** Manage (literacy). No real network calls.

**CSS hooks (planned):** `.itt18-cookie-banner` · `.itt18-cmp-panel` · `.itt18-cookie-dim`

---

### 5b · Platform trust / CA (`sites/trust/index.html`)

**Sources locked:** Guardian+NYT **17 Mar 2018** · ~50M→~87M · Congress **10–11 Apr 2018**.

**Screen layout**
```
[ Careful header banner ]
  Educational reconstruction · not a simulation of harm
  No political targeting tools · no party persuasion UI

[ Timeline strip (horizontal cards) ]
  Mar 16–17 · Facebook suspends CA · Guardian/NYT expose (~50M)
  Late Mar · Zuck “breach of trust” / apology class
  Apr 10–11 · Congress testimony (Senate + House)
  Later honesty · scale class ~87M

[ Literacy panel — 3 required checks ]
  ☐ This was about third-party app access / friends-data API class —
     not “Facebook got hacked” as the only framing
  ☐ Platforms were forced into public accountability theater (Congress)
  ☐ Users gained pressure for app review / permission literacy
     (“Apps and Websites” class controls)

[ ☐ Careful framing ack: I will not use this room as political advice ]
[ Explicit ban callout: no CA brand exploit · no psychographic tool theater ]

[ Save literacy ] → only when all 3 + careful ack
```

**Steps**
1. Read timeline (visit — scroll/open cards)  
2. Check all **3** literacy boxes  
3. Check careful-framing ack  
4. Save → `itt18-ca`  

**Tone:** Same careful bar as #MeToo 2017 — **no jokes · no trauma spectacle · no political side-taking UI**.

**CSS hooks:** `.itt18-trust-timeline` · `.itt18-literacy-checks` · `.itt18-careful-banner`

---

### 5c · TikTok (`sites/tiktok/index.html`)

**Sources locked:** [TikTok Newsroom Aug 2 2018](https://newsroom.tiktok.com/en-us/musical-ly-and) · Variety / THR secondary.

**Screen layout**
```
[ Vertical phone frame theater — black chrome · generic silhouette UI ]
[ Top banner: Aug 2 2018 · musical.ly + TikTok unite (newsroom class) ]
[ Merge honesty ]
  ☐ Musical.ly brand ends as default · TikTok is the global name
  ☐ Accounts / content / fans migrate class (theater honesty)
  ☐ For You feed is personalized recommendations class (not a real algo)

[ For You residual feed — 3 silhouette cards (no official logo invent) ]
  Clip 1 · Clip 2 · Clip 3  (generic shapes · muted captions)

[ On clip open: full-screen vertical theater · progress bar · ♥ like residual ]
[ [ Save session ] after merge checks + at least one clip opened ]
```

**Steps**
1. Complete **2–3** merge honesty checks  
2. Tap a silhouette clip (play theater ≥1s)  
3. Optional like  
4. Save → `itt18-tiktok`  

**Ban:** Official TikTok/Musical.ly brand logo pixels invent · sound rips · full For You algorithm as real recommendation engine.

**CSS hooks:** `.itt18-phone-frame` · `.itt18-fyp-card` · `.itt18-merge-banner`

---

### 5d · IGTV (`sites/instagram/igtv.html`)

**Sources locked:** TechCrunch **20 Jun 2018** · up to 1 hour · standalone app + TV button above Stories.

**Screen layout**
```
[ Instagram residual chrome · generic · NO invent Meta/IG logo ]
[ Entry literacy strip ]
  ☐ Launched Jun 20 2018
  ☐ Long-form vertical · up to ~1 hour · separate app + in-app TV button class
  ☐ Not Reels (2020) · not YouTube Shorts

[ Channel list · creator residual names (generic: “Creator A/B/C”) ]
[ Player: vertical 9:16 box · progress · title ]
[ Watch  →  Save session ]
```

**Steps**
1. Pick channel  
2. Play segment (theater progress moves)  
3. Date / format honesty checks  
4. Save → `itt18-igtv`  

**CSS hooks:** `.itt18-igtv-player` · `.itt18-channel-list` · `.itt18-vertical-9x16`

---

### 5e · Netflix modern (complex) (`sites/netflix/modern.html`)

**Screen layout**
```
[ Dark theme residual · top nav: Home · TV · Movies · My List ]
[ Hero residual strip ]
[ Row: Trending · Continue Watching · Museum Picks ]
  [ tile ] [ tile ] [ tile ]  ← generic titles only
[ Detail panel (slide-in) ]
  Title · synopsis residual · [ + My List ] [ Play theater ]
[ My List tray (session) ]
[ Save queue → itt18-netflix ]
```

| Step | UI control | Write? |
|------|------------|--------|
| 1 | Row of title tiles | no |
| 2 | Click tile → detail panel | no |
| 3 | **+ My List** | list only (session) |
| 4 | **Save queue** | `itt18-netflix` |

Incomplete: abandon before Save → no final key.

---

### 5f · Spotify modern (complex) (`sites/spotify/modern.html`)

**Screen layout**
```
[ Dark green residual · Search ]
[ Results list · residual track names ]
[ Player bar: play/pause · free-tier ad honesty strip ]
  ☐ Free tier residual · ads class · not premium invent
[ Save → itt18-spotify ]
```

| Step | UI | Write? |
|------|-----|--------|
| 1 | Search box | no |
| 2 | Play free-tier residual | session only |
| 3 | Free-tier honesty checkbox | no |
| 4 | Save | `itt18-spotify` |

---

### 5g · Discord modern (complex) (`sites/discord/modern.html`)

**Screen layout**
```
[ Blurple residual · server rail · channel list ]
[ #general message pane ]
[ Composer: type + Send ]
[ Nitro residual card ]
  ☐ Custom emoji / larger upload / animated avatar class (Nitro residual)
  ☐ Early Supporter badge class before Oct 10 2018 (literacy optional)
[ Save → itt18-discord ]
```

| Step | UI | Write? |
|------|-----|--------|
| 1 | Channel select | no |
| 2 | Type + Send message | chat log only |
| 3 | Nitro residual literacy check | no |
| 4 | Save | `itt18-discord` |

---

### 5h · YouTube modern (complex) (`sites/youtube/modern.html`)

**Screen layout**
```
[ Search bar ]
[ Results residual ]
[ Watch stage · progress ]
[ Related rail (optional) ]
[ Save → itt18-youtube ]
```

| Step | UI | Write? |
|------|-----|--------|
| 1 | Search | no |
| 2 | Watch stage | no |
| 3 | Related rail optional | no |
| 4 | Save | `itt18-youtube` |

---

### 5i · Twitter 280 residual (`sites/twitter/composer.html`)

**Screen layout**
```
[ Composer · counter 0/280 ]
[ Placeholder: What’s happening? ]
[ Literacy: 280 global residual · CJK 140 residual honesty ☐ ]
[ Tweet theater button ]
```

| Step | UI | Write? |
|------|-----|--------|
| 1 | Composer counter (280) | no |
| 2 | Type past 140 (counter updates) | no |
| 3 | CJK 140 honesty residual check | no |
| 4 | Tweet theater | `itt18-twitter` |

---

### P1 · Google+ sunset (`sites/googleplus/sunset.html`)

```
[ Dual timeline ]
  ☐ Announce Oct 8 2018 (consumer sunset)
  ☐ Consumer offline Apr 2 2019 (accelerated from Aug 2019 plan)
[ Download/takeout literacy residual (theater) ]
[ Save → itt18-gplus ] only both checks
```

### P1 · iPhone XS / XR (`sites/iphone/xs.html`)

```
[ Three tiers cards ]
  XR · ~$749 start
  XS · ~$999 start
  XS Max · ~$1,099 start
[ ☐ Face ID residual (not “new in 2018”) ]
[ ☐ Notch residual densify ]
[ Save → itt18-iphonexs ]
```

### P1 · Fortnite residual / crypto winter

Fortnite: free BR densify silhouette (from 2017 room clone).  
Crypto: winter literacy · not advice · post-2017 peak.

### Residual · Win10 / Chrome

Clone 2017 residual pages · rebrand year labels · no new REAL required for MVP.

---

# Part 6 — Click-by-click state machines (implement gate)

Use these as acceptance criteria for REAL writers in `year-2018-extras.js`.

### GDPR state machine

```
IDLE → BANNER_VISIBLE
  manage → PREFS_OPEN
    toggle* → PREFS_DIRTY
    rights_check → PREFS_LITERATE
    save (Necessary on + literate) → COMPLETE (write itt18-gdpr)
    leave → IDLE (no write)
  accept_all → (optional) LITERACY_TOAST → COMPLETE or stay incomplete per bar
  reject_nonessential → PREFS_DIRTY (marketing/analytics off) → save path
```

### Trust / CA state machine

```
IDLE → TIMELINE_READ (scroll or open ≥1 card)
  check1+check2+check3 → LITERATE
  careful_ack → READY
  save → COMPLETE (itt18-ca)
  leave early → no write
```

### TikTok state machine

```
IDLE → MERGE_CHECKS (2–3)
  open_clip → CLIP_OPEN
  like? → CLIP_OPEN
  save (checks + clip) → COMPLETE (itt18-tiktok)
```

### IGTV state machine

```
IDLE → CHANNEL_PICK
  play → WATCHING
  honesty_checks → READY
  save → COMPLETE (itt18-igtv)
```

### Modern complex (shared pattern)

```
IDLE → STEP1 → STEP2 → STEP3 → SAVE → COMPLETE
abandon at any STEP* → no write
```

---

# Part 7 — Storage · anti-goals · done

## Storage
Prefix **`itt18` only**. Incomplete → no write. Passport stamp on REAL complete via shared `markTourUsed`.

| Key | When |
|-----|------|
| `itt-last-year=2018` | enter year |
| `itt18-thesis-ack` | About |
| `itt18-gdpr` | GDPR Save |
| `itt18-ca` | Trust Save |
| `itt18-tiktok` | TikTok Save |
| `itt18-igtv` | IGTV Save |
| `itt18-netflix` … `itt18-twitter` | complex Saves |
| `itt18-iphonexs` · `itt18-gplus` | P1 |

## Anti-goals
- No Meta · Reels · COVID · ChatGPT as 2018 defaults  
- No real consent/tracking  
- No CA political tool  
- No invent brand pixels  
- No scaffold before user says implement  

## Done when (MVP)
Hub unlocks 2018 · GDPR + trust + TikTok + IGTV REAL green · scale −8% dual-cite · complex rooms multi-step · e2e smoke · `itt18` only.

---

**Start implement:** [`2018-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2018-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) Phase 0.  
**Until then:** research pack is the map — do not invent rooms on disk.
