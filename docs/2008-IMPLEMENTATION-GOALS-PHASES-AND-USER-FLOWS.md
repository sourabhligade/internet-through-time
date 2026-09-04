# 2008 — Implementation goals, phases, how-to, and period user flows

**Date:** 2026-07-31  
**Purpose:** Long-form implement bible.  
**Prefer for reading:** **[`2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md)** — goals · phases · how-to · **flows A–T**.  
**Disk truth:** **No `years/2008/` yet** · hub locked **2008+**.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. All “apps” are **localStorage theater** (no real App Store APKs, Chrome auto-update network, map tiles, SMTP, payments).

| Companion | Role |
|-----------|------|
| [`2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | **Clear master** · period flows A–T |
| [`2008-RESEARCH.md`](2008-RESEARCH.md) | Thesis · timeline · bans · scale |
| [`2008-DEEP-RESEARCH-FRESH-2026-07-31.md`](2008-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · sources |
| [`2008-IMPLEMENT-PHASES-CLEAR-2026-07-31.md`](2008-IMPLEMENT-PHASES-CLEAR-2026-07-31.md) | Short checklist |
| [`2008-CONNECTIONS-AND-TRAILS.md`](2008-CONNECTIONS-AND-TRAILS.md) | Bridges |
| Parent | [`2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) · live `years/2007/` |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content · single boot · no engine forks |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done |
| **[ ]** | Open |
| **[~]** | Optional forever |

---

## 0. Overall goal

### 0.1 One-line goal

Build a **museum-grade 2008 Web immersion**: Windows XP + IE 7 shell (Chrome as late product story), period sites, and **real local interactions** that recreate how people used the internet in **2008** — especially **App Store + iPhone 3G**, **Google Chrome**, and **Android G1** — while desktop Web 2.0 remains mass culture.

### 0.2 Visitor outcome (done means this)

```
Hub → open 2008
  → XP desktop + IE 7 (Chrome optional late)
  → Starting Point / About:
        172,338,726 sites · ~1.57B users · Dropbox birthmark
        app stores arrive · browser wars 2.0 · hard bans (3GS · modern Chrome mass · Spotify US)
  → App Store: grid · install theater · ~500 launch honesty
  → iPhone 3G: $199/$299 · 3G · GPS · OS 2.0
  → Chrome: comic · Windows beta · multi-process about
  → Android G1: T-Mobile · slide keyboard · Market
  → Firefox 3 Download Day · Hulu public · Netflix stream densify
  → Continuity: FB Connect · Twitter · YouTube · open Gmail · Street View
  → Exit: itt08-* localStorage · resume last year
```

### 0.3 Year thesis (copy must match)

**2008 is when apps and a new browser rewrite the client:**

- **App Store** + **iPhone 3G** (Jul) — native apps, not Safari-only.
- **Chrome** (Sep beta / Dec 1.0) — browser for web apps.
- **Android** reaches consumers (**G1**, Oct).
- **Firefox 3** — Download Day / geek default culture.
- **Hulu** public · Netflix streaming densifies · **Spotify** Europe seed.
- Facebook Connect / OpenSocial — identity moves across the web.
- Still **mostly PC** — gatekeepers *begin*, they do not finish.

### 0.4 Locked facts

| Fact | Value |
|------|--------|
| Websites | **172,338,726** (June · Live Stats · +41% YoY) |
| Users | **~1.57B** |
| Birthmark | **Dropbox** |
| App Store launch | **Jul 10–11, 2008** · ~500+ apps |
| iPhone 3G ship | **Jul 11, 2008** · $199 / $299 US class |
| Chrome beta | **Sep 2, 2008** Windows |
| Chrome 1.0 | **Dec 11, 2008** |
| G1 US | **Oct 22, 2008** class · $179 contract class |
| Hulu public | **Mar 12, 2008** |
| Spotify Europe | **Oct 7, 2008** class · **not US** |
| Storage | **`itt08`** |
| Shell default | **XP + IE 7** |

### 0.5 Hard bans

| Ban | Era |
|-----|-----|
| iPhone **3GS** | 2009 |
| Chrome mass default year-start | Later |
| App Store millions day one | Launch ~500 |
| Android global mass | G1 first |
| Spotify US public | 2011 |
| Instagram / modern X / Reels | Later |

### 0.6 Engineering rules

1. Config + content — clone from 2007, year-delta; no engine fork.  
2. Content loads **only** `js/immersion-2008.js`.  
3. Keys **`itt08-*`** via immersionStorageKey.  
4. Keep `data-*` hooks.  
5. Period voice — no “Museum theater” lead on products.  
6. Never invent brand pixels.  
7. App Store = install list theater, not real IPA.  
8. Chrome = Windows-first honesty.  
9. Gmail remains **open** (from 2007).  
10. Street View remains real (from 2007).  
11. Git only if asked.

### 0.7 Global gates (post-implement)

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2008-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## 1. Phase map

| Phase | Name | Done when… | Status |
|------:|------|------------|--------|
| **0** | Research freeze | Docs locked | **[x]** |
| **1** | Confirm no disk | No years/2008 | **[x]** |
| **2** | Scaffold | Tree · registry · hub unlock · itt08 | **[ ]** |
| **3** | Home / About | Scale · thesis · bans · tour | **[ ]** |
| **4** | App Store + iPhone 3G | Install apps · 3G about | **[ ]** |
| **5** | Chrome | Download · about multi-process | **[ ]** |
| **6** | Android G1 | Product room · Market theater | **[ ]** |
| **7** | Firefox 3 · Hulu · Netflix stream | Densify | **[ ]** |
| **8** | Continuity scrub | No “App Store ban as year truth” | **[ ]** |
| **9** | Trails + e2e | mvp · real · densify · flows | **[ ]** |
| **10** | Museum-grade claim | DISK-TRUTH 1994–2008 | **[ ]** |
| **11** | Optional | Spotify · Connect · OpenSocial · WA | **[~]** |

---

# Phase 0 — Research freeze **[x]**

### Goal
Thesis, scale, bans, timeline, product kits, flows drafted.

### How achieved
1. Write `2008-RESEARCH.md`  
2. Write deep research + goals + phases clear + connections  
3. Visit log in `references/2008/`  
4. Link from DISK-TRUTH · 2007 RESEARCH next-year pointer  

### Acceptance
- [x] Docs exist · no year tree yet  

---

# Phase 1 — Inventory **[x]**

### Goal
Confirm empty disk slot.

### How achieved
`test ! -d years/2008` · hub locked 2008+  

### Acceptance
- [x] No premature tree  

---

# Phase 2 — Scaffold **[ ]**

### Goal
Playable year shell from 2007 clone with year renames.

### How achieved
1. Copy `years/2007` → `years/2008` (or scripted year fork)  
2. `storagePrefix: "itt08"` · immersion-2008.js · config/2008.js  
3. Registry + hub year card unlock  
4. period-2008.css delta  
5. urlMap completeness  

### Acceptance
- [ ] Hub opens 2008 · shell boots · authenticity signature  

---

# Phase 3 — Home / About **[ ]**

### Goal
Visitor can state 2008 thesis and bans.

### How achieved
1. Scale **172,338,726** · Dropbox birthmark  
2. Tour: App Store · Chrome · G1 · Hulu  
3. Bans box: 3GS · Spotify US · modern Chrome mass  
4. Compare vs 2007 on hub later  

### Acceptance
- [ ] About/Home copy locked  

---

# Phase 4 — App Store + iPhone 3G **[ ]**

### Goal
Native apps + 3G product truth.

### How achieved
1. `sites/appstore/` grid · add/remove · `itt08-apps`  
2. `sites/iphone/` 3G about · prices · App Store CTA  
3. Residual Safari-only is **2007** — reframe  
4. e2e install app  

### Acceptance
- [ ] Storage mutates · no App Store ban copy  

---

# Phase 5 — Chrome **[ ]**

### Goal
Windows beta browser product.

### How achieved
1. `sites/chrome/` download theater · comic link · multi-process about  
2. Optional shell preference late year  
3. e2e download key  

### Acceptance
- [ ] Year-truth Windows-first  

---

# Phase 6 — Android G1 **[ ]**

### Goal
First Android phone room.

### How achieved
1. Product page · Market · keyboard  
2. Ban global mass Android  
3. e2e visit  

### Acceptance
- [ ] G1 not “every Android phone”  

---

# Phase 7 — Firefox 3 · Hulu · Netflix **[ ]**

### Goal
Browser culture + streaming densify.

### How achieved
1. Firefox 3 Download Day  
2. Hulu watch theater  
3. Netflix DVD + unlimited stream with sub honesty  

### Acceptance
- [ ] Flows green  

---

# Phase 8 — Continuity scrub **[ ]**

### Goal
No wrong-year residual from 2007 clone.

### How achieved
1. Grep “no App Store” / “Safari only as year product” / “Android announce only”  
2. Steam/iPod/iTunes year stamps  
3. YouTube HD note  

### Acceptance
- [ ] Pattern scan clean  

---

# Phase 9 — Trails + e2e **[ ]**

### Goal
Automated proof.

### How achieved
1. Home trails: Mobile apps · Chrome day · Android · Streaming  
2. `e2e/2008-mvp|real-flows|densify|flows.spec.js`  

### Acceptance
- [ ] Playwright green  

---

# Phase 10 — Museum claim **[ ]**

### Goal
DISK-TRUTH hub **1994–2008**.

### Acceptance
- [ ] Honest residual list only  

---

# Phase 11 — Optional **[~]**

Spotify Europe · Facebook Connect · OpenSocial · Dropbox · WA pixels  

---

## 2. Period user flows (detail)

### Flow A — Enter the year
Hub → 2008 → skip connect → Starting Point · dirbar App Store / Chrome / Android  

### Flow B — Thesis
About: **172,338,726** · Dropbox · bans  

### Flow C — App Store
Open store → pick free app → install theater → `itt08-apps` list  

### Flow D — iPhone 3G
About Jun/Jul · price · link App Store · residual Safari  

### Flow E — Chrome
About multi-process · download theater · Windows honesty  

### Flow F — Android G1
Product · Market · $179 class  

### Flow G — Firefox 3
Download Day · features  

### Flow H — Hulu
Public Mar 12 · episode theater  

### Flow I — Netflix
Queue + stream densify  

### Flow J — Facebook Connect
Login theater on partner page stub  

### Flow K — Continuity
Twitter · YouTube · Digg · open Gmail · Street View  

### Flow L — Exit / resume
Exit · `itt-last-year` · clear site data resets `itt08-*`  

---

## 3. Storage key sketch

| Key | Product |
|-----|---------|
| `itt08-apps` | App Store installs |
| `itt08-iphone-*` | iPhone 3G prefs |
| `itt08-chrome` | Download / set-default theater |
| `itt08-android` | G1 prefs |
| `itt08-hulu` | Watch history theater |
| `itt08-netflix-queue` | Continuity |
| `itt08-tweets` · `itt08-yt-*` · `itt08-gmail*` | Continuity renames |

---

## 4. Definition of done (MVP ship)

| Check | Pass |
|-------|------|
| Hub 2008 available | yes |
| Scale on About | 172,338,726 |
| App Store install real storage | yes |
| Chrome room | yes |
| G1 room | yes |
| No 2007 “App Store ban” as year default | yes |
| e2e mvp + densify | green |
| authenticity 2008 signature | green |

---

## 5. What not to do

| Anti-goal | Why |
|-----------|-----|
| Real IPAs / APKs | Legal |
| Invent App Store icons | CAPTURE / RECON |
| Spotify US as 2008 default | Wrong geo era |
| Chrome as only shell all year | Mass still IE |
| Skip continuity scrub | Clone from 2007 will lie |

---

## 6. One-page start (when implementing)

1. Phase 2 scaffold from 2007.  
2. Phase 3 About/Home.  
3. Phase 4 App Store.  
4. Phase 5–6 Chrome + G1.  
5. Phase 8 scrub · Phase 9 e2e.  

**Document status:** Goals · phases · flows locked for 2008 research→implement. **No code until user says implement.**
