# 2008 — Clear goals, step-by-step phases, how-to, and period user flows

**Date:** 2026-07-31  
**Purpose:** One **readable** playbook for building and verifying the **2008** museum year:

1. **Goals** — what “done” means  
2. **Phases** — ordered steps and **how each phase is achieved**  
3. **User flows A–T** — each matches how people used the internet **in 2008**  
4. **Trails · storage · definition of done**

**Disk truth today:** **MVP on disk** · `years/2008/` · hub **1994–2008** · `itt08`.  
**Legal:** Educational reconstruction only. Trademarks belong to their owners. Interactions are **localStorage theater** (no real App Store binaries, Android APKs, Chrome network installers as malware, map tiles, SMTP, payments). **Never invent brand pixels.**

| Companion docs | Role |
|----------------|------|
| [`2008-RESEARCH.md`](2008-RESEARCH.md) | Thesis · timeline · bans · scale |
| [`2008-DEEP-RESEARCH-FRESH-2026-07-31.md`](2008-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · primary sources |
| [`2008-CONNECTIONS-AND-TRAILS.md`](2008-CONNECTIONS-AND-TRAILS.md) | Product bridges |
| [`2008-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2008-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) | Long-form implement bible |
| [`2008-IMPLEMENT-PHASES-CLEAR-2026-07-31.md`](2008-IMPLEMENT-PHASES-CLEAR-2026-07-31.md) | Short checklist |
| [`2008-MUSEUM-GRADE.md`](2008-MUSEUM-GRADE.md) | Ship / research status |
| Parent live year | `years/2007/` · `itt07` (clone source) |
| Planned live year | `years/2008/` · **`itt08`** |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done (research / inventory) |
| **[ ]** | Open implement work |
| **[~]** | Optional forever (does not block MVP ship) |

---

# Part 1 — Overall goals

## 1.1 One-line goal

Build a **museum-grade 2008 Web immersion**: Windows XP + Internet Explorer 7 shell (Chrome as a late-year **product story**, not forced sole shell), period sites, and **real local interactions** that recreate how people used the internet in calendar year **2008** — especially **App Store + iPhone 3G**, **Google Chrome**, and **Android G1** — while the **desktop Web 2.0 stack** remains how most people still live online.

## 1.2 Visitor outcome (done = visitor can do this)

```
Hub → open 2008
  → XP desktop + IE 7 (Chrome optional late product / not only shell)
  → Starting Point / About:
        172,338,726 sites · ~1.57B users · Dropbox birthmark
        thesis: apps + browser reinvention · still mostly PC
        hard bans: iPhone 3GS · Spotify US · Chrome as year-start mass default
  → App Store: ~500 launch honesty · install / remove theater · itt08-apps
  → iPhone 3G: Jul 11 ship · $199/$299 US · 3G · GPS · OS 2.0 · App Store
  → Chrome: Sep 2 Windows beta · comic · multi-process · Dec 1.0
  → Android G1: Oct US · T-Mobile · slide keyboard · Market
  → Firefox 3 Download Day · Hulu public · Netflix stream densify
  → Continuity: open Gmail · Street View · Facebook Connect · Twitter · YouTube
  → Exit → hub resume · all state under itt08-* localStorage
```

## 1.3 Year thesis (copy must match)

**2008 is when the phone becomes a platform and the browser is reinvented again:**

| Theme | Period truth |
|-------|----------------|
| Mobile apps | **App Store** Jul 10–11 · **~500–552** apps at launch · 10M+ downloads first weekend |
| Phone hardware | **iPhone 3G** Jul 11 · 3G · GPS · **$199 / $299** US class · iPhone OS 2.0 |
| Android | **T-Mobile G1 / HTC Dream** · unveil Sep · US retail **Oct** · **first** consumer Android |
| Browser | **Chrome** Sep 2 Windows beta · Dec 1.0 · built for **web apps** |
| Indie browser | **Firefox 3** Jun · Download Day culture |
| Streaming | **Hulu** public Mar 12 · Netflix streaming densifies · **Spotify** Europe Oct (not US) |
| Social identity | Facebook Connect · Google Friend Connect · OpenSocial push |
| Desktop | Still **mass default** — apps *add* gatekeepers, do not erase the PC |

Mood: **gatekeepers begin** (App Store · Market) + **Chrome comic week** + **still fat laptops** for most of the world.

## 1.4 Locked facts (do not invent)

| Fact | Value |
|------|------:|
| Websites (June class) | **172,338,726** (+41% from 2007) |
| Internet users | **~1.57B** (Live Stats class) |
| Live Stats birthmark | **Dropbox** |
| App Store live | **Jul 10, 2008** (iTunes) · on device **Jul 11** |
| Launch app count | **~500–552** class · ~¼ free |
| iPhone 3G ship | **Jul 11, 2008** |
| US 3G price class | **$199** 8GB · **$299** 16GB · 2-year AT&T class |
| Chrome public beta | **Sep 2, 2008** · Windows XP+ |
| Chrome 1.0 stable | **Dec 11, 2008** · Windows |
| G1 unveil | **Sep 23, 2008** class |
| G1 US retail | **Oct 22, 2008** class · **$179** + 2-year T-Mobile class |
| Hulu public | **Mar 12, 2008** US |
| Spotify Europe | **Oct 7, 2008** class · **not US public** |
| Storage prefix | **`itt08`** |
| Shell default | **Windows XP + IE 7** |

Source class: Internet Live Stats · Apple Newsroom · Google Blog · Cybercultural Internet 2008 · T-Mobile / HTC Dream histories.

## 1.5 Hard bans (never 2008 default product)

| Ban | Correct era |
|-----|-------------|
| **iPhone 3GS** as “the” 2008 phone | Jun 2009 |
| **Chrome** as global mass default **year-start** | Share rise later; 2008 = Windows beta first |
| App Store with **millions** of apps on day one | Launch ~500 · end-year ~10k+ class |
| **Android** as already-global mass (2012 Samsung energy) | G1 is first · limited markets |
| **Spotify US** public | 2011 class |
| Instagram · Snapchat · TikTok | Later |
| Modern Material Chrome · modern App Library · Reels / Stories | Later |
| Beacon as “just launched 2008” | Launched 2007 · shutdown **2009** |

## 1.6 Engineering rules (every phase)

1. **Config + content** — scaffold from `years/2007/`, year-delta only; no new browser engine.  
2. Content pages load **only** `js/immersion-2008.js`.  
3. Year-native storage: **`itt08-*`** via `ITT.util.immersionStorageKey`.  
4. Keep every **`data-*`** hook when densifying HTML.  
5. **Period voice** — no “Museum theater” lead copy on product rooms.  
6. **Never invent brand pixels** — WA / RECON / CONTINUITY only; log CAPTURE.  
7. App Store = **install list theater**, not real IPA/APK binaries.  
8. Chrome = **Windows-first** honesty (Mac/Linux later).  
9. Gmail stays **open** (from Feb 2007). Street View stays **real** (from May 2007).  
10. Gates green before calling a phase done. **Git only if the user asks.**

## 1.7 Global gates (after implement)

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2008/

python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

npx playwright test e2e/2008-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

# Part 2 — Phase map (step by step)

| Phase | Name | Done when… | Status |
|------:|------|------------|--------|
| **0** | Research freeze | Thesis · scale · bans · kits · flows documented | **[x]** |
| **1** | Inventory | Confirm no accidental `years/2008/` | **[x]** |
| **2** | Scaffold | Tree · `itt08` · hub unlock · registry · shell boots | **[x]** |
| **3** | Home / About / tour | Scale 172M · thesis · bans · dirbar P0 | **[x]** |
| **4** | App Store + iPhone 3G | Install/remove apps · 3G about · prices | **[x]** |
| **5** | Chrome | Download theater · multi-process · Windows beta | **[x]** |
| **6** | Android G1 | Product · Market · keyboard honesty | **[x]** |
| **7** | Firefox 3 · Hulu · Netflix stream | Download Day · watch · stream densify | **[x]** |
| **8** | Continuity year-truth scrub | No 2007 “App Store ban” as 2008 default | **[x]** |
| **9** | Social identity densify | Facebook Connect · optional OpenSocial | **[x]** |
| **10** | Trails + e2e | Home trails · mvp · real · densify · flows A–T | **[x]** |
| **11** | Docs + museum-grade claim | DISK-TRUTH hub **1994–2008** | **[x]** |
| **12** | Optional P2 | Spotify Europe · Dropbox · WA pixels · Friend Connect | **[~]** |

**MVP ship** = Phases **0–11** (through e2e + claim).  
**Optional forever** = **12**.

**Order:** 2 → 3 sequential; **4–7** product rooms; **8** before claiming year-truth; **9–10** after hooks stable; **11** claim; **12** optional.

### Phase → flow map (what each phase unlocks)

| Phase | Unlocks flows | 2008 life moment |
|------:|---------------|------------------|
| 2 Scaffold | **A** enter year | Sit at XP · open IE 7 |
| 3 Home / About | **B** thesis · **T** exit path | Magazines: App Store lines · Chrome comic · Android open |
| 4 App Store + 3G | **C** · **D** | Jul 10–11: install apps · upgrade phone |
| 5 Chrome | **E** | Sep 2: try the Windows beta |
| 6 Android G1 | **F** | Oct: first Android in your hand (T-Mobile) |
| 7 FF3 · Hulu · Netflix | **G** · **H** · **I** | Jun Download Day · Mar free TV · discs + stream |
| 8 Scrub | All honesty | Clone no longer claims “no App Store this year” |
| 9 Social | **J** · **S** · continuity **K–O** | “Log in with Facebook” begins |
| 10 e2e | **A–T** automated | Proof rituals work offline |
| 11 Claim | Ship docs | Hub **1994–2008** honest residual |
| 12 Optional | **P** · **Q** | Spotify Europe · Dropbox birthmark |

### Scaffold visual grammar (until 2008 CAPTURE)

**No `assets/period/2008/` yet.** Phase 2 clones chrome from **2007** (`assets/period/2007/chrome/`, `xp/`) — same XP + IE look is correct for **mass 2008**. New product rooms (App Store, Chrome, G1) start **RECON / text-first**; harvest WA pixels only via CAPTURE log — **never invent brand logos**.

| Asset class (scaffold) | Path |
|------------------------|------|
| XP Start / taskbar | `assets/period/2007/xp/start.gif` · `taskbar.gif` |
| IE chrome buttons | `assets/period/2007/chrome/btn-*.gif` · `throbber.gif` |
| Continuity logos (Google, FB, YT, …) | `assets/period/2007/<product>/` until year-stamped harvest |

---

# Part 3 — Each phase: goal · how achieved · acceptance

## Phase 0 — Research freeze **[x]**

### Goal
Everyone building 2008 shares one thesis, scale, ban list, and flow map.

### How achieved
1. Write/read [`2008-RESEARCH.md`](2008-RESEARCH.md).  
2. Write deep research + connections + museum-grade stub.  
3. Visit log: `docs/references/2008/notes/`.  
4. Link from DISK-TRUTH and 2007 RESEARCH “next year.”  

### Acceptance
- [x] Docs exist · sources cited · no year tree required yet  

---

## Phase 1 — Inventory **[x]**

### Goal
No half-built 2008 tree confuses hub or tests.

### How achieved
1. Confirm `years/2008` absent.  
2. Confirm hub still lists 2008+ locked.  
3. Note clone source = `years/2007/`.  

### Acceptance
- [x] Inventory matches DISK-TRUTH  

---

## Phase 2 — Scaffold year tree **[x]**

### Goal
A playable empty-ish year: shell boots, storage prefix correct, hub card opens 2008.

### How achieved
1. Fork `years/2007/` → `years/2008/` (scripted or careful copy).  
2. Rename immersion boot: `js/immersion-2008.js` · `js/config/2008.js` · `js/config/immersion-2008.js`.  
3. Set `storagePrefix: "itt08"` · `data-itt-year="2008"`.  
4. Register year in immersion registry + hub `index.html` year card **available**.  
5. Add `css/period-2008.css` (delta from 2007).  
6. Complete urlMap for every HTML under the year.  
7. Smoke: hub → 2008 → skip connect → content iframe.  

### Acceptance
- [ ] Hub 2008 available  
- [ ] Shell boots with `#content`  
- [ ] Authenticity signature + urlMap tests pass  

---

## Phase 3 — Home / About / tour **[x]**

### Goal
Visitor can state 2008 thesis, scale, and bans without leaving Starting Point.

### How achieved
1. `pages/home.html` — thesis strip · tour · **6+ connection trails**.  
2. `pages/about.html` — scale **172,338,726** · Dropbox · timeline table · bans.  
3. `pages/whats-new.html` / `cool.html` — App Store · Chrome · G1 · Hulu.  
4. Shell dirbar: **App Store · iPhone · Chrome · Android · Hulu** (or equivalent).  
5. e2e Flow B asserts.  

### Acceptance
- [ ] Body contains scale + App Store + Chrome + ban language  
- [ ] No “App Store is 2008 ban” residual from 2007 clone  

---

## Phase 4 — App Store + iPhone 3G **[x]**

### Goal
Recreate Jul 2008: phone is a **platform**, not Safari-only.

### How achieved
1. `sites/appstore/index.html` — grid of free/paid class apps · **install** / **remove**.  
2. Storage **`itt08-apps`** (list of installed app ids/names).  
3. Launch honesty: **~500 apps**, not millions.  
4. `sites/iphone/` — reframe from 2007: **3G** · **Jul 11** · prices · GPS · App Store CTA.  
5. Keep Safari residual as secondary (“still a real browser”) not the only product.  
6. e2e: install app → list → remove.  

### Acceptance
- [ ] `itt08-apps` mutates  
- [ ] Copy never says “no App Store this year” as product default  

### Period feel
Lines for 3G · $199 with contract · “there’s an app for that” seed culture · free games + utilities.

---

## Phase 5 — Google Chrome **[x]**

### Goal
Sep–Dec 2008: a browser built for web apps, Windows first.

### How achieved
1. `sites/chrome/index.html` — sparse Google chrome · download theater.  
2. `about.html` — multi-process · omnibox · comic book explainer link.  
3. Dates: **Sep 2 beta** · **Dec 11 1.0**.  
4. Optional: “set as default browser” local preference (does not replace shell forced).  
5. Storage **`itt08-chrome`** (downloaded / preferred flags).  

### Acceptance
- [ ] Windows-first honesty  
- [ ] Not forced as only museum shell for entire year  

### Period feel
Comic leak · “try the beta” · speed demos · still minority share.

---

## Phase 6 — Android G1 **[x]**

### Goal
First consumer Android phone — open rival to App Store garden.

### How achieved
1. `sites/android/` or `sites/g1/` — product page · slide keyboard · trackball lore.  
2. Market / apps theater (thin list · `itt08-android-apps` optional).  
3. Dates: unveil **Sep** · US retail **Oct** · **$179** contract class.  
4. Ban: “Android is already every phone in every country.”  

### Acceptance
- [ ] G1 framed as **first**, not mass global  

### Period feel
T-Mobile · hardware keyboard · “with Google” · Market still tiny vs App Store.

---

## Phase 7 — Firefox 3 · Hulu · Netflix stream **[x]**

### Goal
Desktop indie browser peak + streaming becomes cultural.

### How achieved
1. **Firefox 3** — Download Day · features · “not Microsoft.”  
2. **Hulu** — public **Mar 12** · episode watch theater · ad-supported honesty.  
3. **Netflix** — DVD queue continuity + **unlimited streaming** for disc subscribers (Jan class densify).  
4. Keys: `itt08-hulu` · `itt08-netflix-queue`.  

### Acceptance
- [ ] Three rooms year-stamped 2008  
- [ ] Netflix not “streaming-only, no discs”  

---

## Phase 8 — Continuity year-truth scrub **[x]**

### Goal
2007 clone does not lie about 2008.

### How achieved
1. Grep tree for: `no App Store` · `Safari only` as year product · `Android announce only` · `Chrome ban` · `Hulu private beta` as year default.  
2. Fix Steam / iPod / iTunes / WordPress year stamps (same class of bug fixed on 2006/2007).  
3. YouTube: HD late-2008 note optional.  
4. Gmail remains **open**. Street View remains **on**.  

### Acceptance
- [ ] Pattern scan clean for 2007 residual bans  

---

## Phase 9 — Social identity densify **[x]**

### Goal
“Log in with Facebook” begins.

### How achieved
1. Facebook **Connect** stub on a partner page (blog or Hulu-class).  
2. Optional Google Friend Connect / OpenSocial about.  
3. Platform apps continuity from 2007.  
4. Beacon: residual privacy lore (not “new this year”; shutdown is **2009**).  

### Acceptance
- [ ] Connect theater mutates a local flag or session stub  

---

## Phase 10 — Trails + e2e **[x]**

### Goal
Automated proof of period flows.

### How achieved
1. Home trails (see Part 5).  
2. Specs: `2008-mvp` · `2008-real-flows` · `2008-densify` · `2008-flows` (A–T) · optional trail.  
3. Authenticity: `test_2008_signature` · `test_2008_urlmap_complete`.  

### Acceptance
- [ ] Playwright + authenticity green  

---

## Phase 11 — Museum-grade claim **[x]**

### Goal
Honest status: what ships vs residual.

### How achieved
1. Update `2008-MUSEUM-GRADE.md` · DISK-TRUTH hub **1994–2008**.  
2. Residual only optional (Spotify depth · WA pixels).  

### Acceptance
- [ ] Docs match disk  

---

## Phase 12 — Optional P2 **[~]**

| Item | Note |
|------|------|
| Spotify Europe | Invite / freemium · **not US** |
| Dropbox | Live Stats birthmark room |
| OpenSocial / Friend Connect depth | Widget / login lore |
| WA pixel harvest | CAPTURE log only |

---

# Part 4 — Period user flows (match 2008 real life)

Each flow = **2008 ritual** → museum steps → pages → hooks → storage.  
**Real** = DOM and/or **`itt08-*` localStorage** change.

---

### Flow A — Enter the year (always first)

**2008 ritual:** Sit at a Windows XP PC, open **IE 7** (or Firefox if you’re a blogger), broadband always-on.

| Step | Visitor action | System response |
|-----:|----------------|-----------------|
| 1 | Hub → **2008** | Load `years/2008/` shell |
| 2 | Connect / Skip | Desktop + IE window |
| 3 | Starting Point loads | Tour + trails |
| 4 | Dirbar shows P0 | App Store · iPhone · Chrome · Android · Hulu |

**Pages:** `years/2008/index.html` · `pages/home.html`  
**Done when:** Content visible; year attribute `2008`.

---

### Flow B — Learn the year (thesis)

**2008 ritual:** Magazines and blogs talk App Store lines, Chrome comic, Android “open,” Hulu free TV.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **About 2008** | Scale **172,338,726** · ~1.57B users · Dropbox |
| 2 | Read signature list | App Store · 3G · Chrome · G1 · Hulu |
| 3 | Read bans | No 3GS · no Spotify US · no Chrome-as-only-shell year-start |
| 4 | What’s New / Cool | Period ranking energy |

**Done when:** Visitor can say “apps + Chrome + first Android; still mostly PC.”

---

### Flow C — App Store: “there’s an app for that” (seed)

**2008 ritual (from Jul 10–11):** Open App Store on iPhone or via iTunes · browse free apps · install · play a game offline-ish.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **App Store** | Grid · ~500 launch honesty |
| 2 | Tap free app · Install | List updates |
| 3 | Storage | **`itt08-apps`** |
| 4 | Remove app | List shrinks |

**Hooks:** `data-appstore-install` · `data-appstore-apps` · `data-appstore-remove`  
**Honesty:** No real IPA · no Apple ID server.  
**Ban:** Millions of apps day one · modern Today tab.

---

### Flow D — iPhone 3G: faster data + platform

**2008 ritual:** Upgrade from original iPhone · 3G speed · GPS · still AT&T exclusive US class · App Store is the headline.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **iPhone** | 3G product |
| 2 | About | Jun 9 announce · Jul 11 ship · $199/$299 |
| 3 | Jump to App Store | Flow C |
| 4 | Optional Safari | Desktop sites · residual from 2007 |

**Ban:** iPhone 3GS as default · modern Dynamic Island chrome.

---

### Flow E — Chrome: try the beta

**2008 ritual (from Sep 2):** Download Chrome on Windows · comic book · “it’s a browser for apps.”

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **Chrome** | Sparse Google UI |
| 2 | About | Multi-process · omnibox · comic |
| 3 | Download theater | **`itt08-chrome`** flag |
| 4 | Optional “make default” | Local preference only |

**Honesty:** Windows first · Mac/Linux later.  
**Ban:** Chrome as only mass browser for all of 2008.

---

### Flow F — Android G1: the open phone

**2008 ritual (late year):** If you’re on T-Mobile, the **G1** is the first Android in your hand · slide keyboard · Market apps.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **G1 / Android** | Product room |
| 2 | About | Sep unveil · Oct retail · $179 class |
| 3 | Market theater | Optional install list |
| 4 | Contrast | App Store closed garden vs open stack lore |

**Ban:** Treating Android as already global mass.

---

### Flow G — Firefox 3 Download Day

**2008 ritual (Jun):** Bloggers push Firefox 3 · world record download day lore · “safe, extensible, not IE.”

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Firefox room | 3.0 features |
| 2 | Download theater | Status key optional |
| 3 | Link from About bans / compare | IE still mass |

---

### Flow H — Hulu: free TV online

**2008 ritual (from Mar 12):** Watch last night’s network show legally in the browser (US) · ads · full episodes.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **Hulu** | Public launch honesty |
| 2 | Pick a show · play theater | **`itt08-hulu`** history |
| 3 | Connect to YouTube contrast | Pro TV vs UGC |

---

### Flow I — Netflix: discs + streaming densify

**2008 ritual:** Red envelope still real · streaming becomes “included” for subscribers (not yet streaming-only identity).

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Add to queue | **`itt08-netflix-queue`** |
| 2 | Stream theater / Watch Instantly seed | Honesty line |
| 3 | Ban | Netflix as disc-free-only product |

---

### Flow J — Facebook Connect

**2008 ritual:** “Log in with Facebook” on a third-party site · graph follows you.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Partner stub page | Connect button |
| 2 | Approve theater | Session flag `itt08-fb-connect` |
| 3 | Optional return to Feed | Continuity |

---

### Flow K — Twitter growth

**2008 ritual:** Still 140 · more mainstream · Fail Whale lore · not yet “news backbone” peak.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Compose | **`itt08-tweets`** |
| 2 | About growth | Continuity from 2007 SXSW |

---

### Flow L — YouTube (Google + HD late)

**2008 ritual:** Flash watch/upload · late year **720p** class · still Broadcast Yourself.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Watch / upload | `itt08-yt-*` |
| 2 | About | Google-owned · HD note |

---

### Flow M — Open Gmail + Google family

**2008 ritual:** Gmail open (since 2007) · Docs · Maps/Street View · Reader.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Gmail compose | `itt08-gmail*` |
| 2 | Maps / Street View | Continuity + expansion honesty |
| 3 | Docs | Continuity |

---

### Flow N — Digg / Reddit residual

**2008 ritual:** Digg still huge early; Reddit rising; front-page culture continues.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Digg / bury | `itt08-digg-*` |
| 2 | Reddit boost | Continuity |

---

### Flow O — MySpace residual mass

**2008 ritual:** MySpace still enormous for many users while Facebook growth accelerates.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Profile / invite | `itt08-myspace-*` |
| 2 | About honesty | Mass under pressure from FB + apps |

---

### Flow P — Spotify Europe (optional / geo)

**2008 ritual (Oct+):** If you’re in supported Europe, invite-only / freemium music streaming seed.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | About Spotify | Europe only · **not US** |
| 2 | Optional play theater | Thin |

**Ban:** US Spotify as 2008 default product.

---

### Flow Q — Dropbox birthmark (optional)

**2008 ritual:** Early Dropbox “get stuff on all your computers” — Live Stats birthmark.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | About / install theater | Optional P2 |

---

### Flow R — Wikipedia / Amazon / eBay day

**2008 ritual:** Still the default encyclopedia and commerce spine.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Wiki browse | Continuity |
| 2 | Amazon cart | `itt08` cart keys |

---

### Flow S — Privacy / platform power culture

**2008 ritual:** Connect is cool · Beacon lawsuit energy still in air · OpenSocial vs Facebook.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | FB about Connect + Beacon residual | Honesty |
| 2 | OpenSocial about optional | MySpace side |

---

### Flow T — Exit and resume

**2008 ritual:** Close browser · come back tomorrow with the same apps list and queue.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Desktop **Exit** | Hub |
| 2 | Resume | `itt-last-year` = 2008 |
| 3 | Clear site data | All `itt08-*` reset |

---

# Part 5 — Recommended demo order (life in 2008)

| Order | Flow | Why it matches 2008 |
|------:|------|---------------------|
| 1 | **A** Enter year | XP + IE 7 still mass |
| 2 | **B** Thesis | Scale + apps + Chrome + bans |
| 3 | **C–D** App Store + iPhone 3G | Defining mid-year product |
| 4 | **E** Chrome | Sep browser story |
| 5 | **F** Android G1 | Late-year open phone |
| 6 | **G–I** Firefox · Hulu · Netflix | Desktop + streaming culture |
| 7 | **J–O** Social / continuity | Still most of daily life |
| 8 | **T** Exit | Resume storage |

### Six product trails (Home should list these)

| Trail | Steps | Assert keys |
|-------|-------|-------------|
| **1. Apps arrive** | iPhone 3G about → App Store install | `itt08-apps` |
| **2. Browser wars 2.0** | Firefox 3 → Chrome download | `itt08-chrome` |
| **3. Android opens** | G1 → Market theater | `itt08-android*` |
| **4. Stream night** | Hulu → Netflix → YouTube | hulu · netflix · yt |
| **5. Login everywhere** | Connect stub → FB | `itt08-fb-connect` |
| **6. Still desktop** | Gmail → Maps → Digg | continuity keys |

---

# Part 6 — Storage key quick reference

| Key | Product |
|-----|---------|
| `itt08-apps` | App Store installs |
| `itt08-iphone-history` / prefs | iPhone 3G |
| `itt08-chrome` | Chrome download / preference |
| `itt08-android` · `itt08-android-apps` | G1 / Market |
| `itt08-hulu` | Hulu watch theater |
| `itt08-netflix-queue` | Netflix |
| `itt08-tweets` | Twitter |
| `itt08-yt-uploads` · `itt08-yt-views` | YouTube |
| `itt08-gmail*` | Gmail open |
| `itt08-fb-apps` · `itt08-fb-connect` | Facebook |
| `itt08-digg-*` · `itt08-myspace-*` | Continuity |

Never write `itt07-*` from a 2008 page (except one-time migrate if module supports it).

---

# Part 7 — Definition of done

### MVP ship

| Check | Pass criteria | Status |
|-------|---------------|--------|
| Hub | 2008 available card | **[ ]** |
| Scale | About shows **172,338,726** | **[ ]** |
| App Store | Install mutates `itt08-apps` | **[ ]** |
| Chrome | Room + Windows-first copy | **[ ]** |
| G1 | Product room first-phone honesty | **[ ]** |
| Scrub | No 2007 App Store **ban** as year default | **[ ]** |
| e2e | mvp · densify · flows green | **[ ]** |
| authenticity | 2008 signature + urlMap | **[ ]** |
| Docs | MUSEUM-GRADE honest residual | **[ ]** |

### Research freeze (now)

| Check | Status |
|-------|--------|
| RESEARCH + DEEP + this CLEAR playbook | **[x]** |
| Goals long bible + phases clear + connections | **[x]** |
| Visit log / CAPTURE / ARTIFACTS map | **[x]** |

---

# Part 8 — What not to do

| Anti-goal | Why |
|-----------|-----|
| Real IPAs / APKs / Chrome silent enterprise install | Legal + offline museum |
| Invent App Store icons or G1 photos | CAPTURE / RECON only |
| Spotify US as 2008 default | Wrong market era |
| Chrome as only shell all year | IE still mass |
| iPhone 3GS framing | 2009 |
| Skip continuity scrub after clone | 2007 copy will claim App Store banned |
| Soft mock Install buttons | Soft = bug |

---

# Part 9 — One-page “start here”

### Research (done)
1. Read this file + [`2008-RESEARCH.md`](2008-RESEARCH.md).  
2. Open primary sources in deep research §6.  

### Implement (when user says implement)
1. **Phase 2** — scaffold from 2007 · hub unlock · `itt08`.  
2. **Phase 3** — Home/About scale + bans.  
3. **Phase 4** — App Store + iPhone 3G (P0).  
4. **Phase 5–6** — Chrome + G1.  
5. **Phase 7–8** — streaming + scrub.  
6. **Phase 10** — e2e A–T.  
7. **Phase 11** — claim ship.  

---

**Document status:** Clear goals · phased how-to · period flows A–T locked for **2008**.  
**Implements with (future):** `years/2008/` · `itt08` · `e2e/2008-*.spec.js`.  
**Parent on disk:** `years/2007/` · do not unlock hub 2008 until Phase 2–3 green.
