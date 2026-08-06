# 2004 Implementation — step-by-step phases (goal detail)

**Date:** 2026-07-27  
**Purpose:** Ordered checklist for **2004** (from **2003**). Goal · files · steps · acceptance per phase.  
**Rule:** Finish one phase before the next unless *parallel-ok*.  
**Status:** MVP **0–11** + museum **M1–M6** + Phase **9** WA **done** 2026-07-27.

### Research bibles (read first)

| Doc | Use |
|-----|-----|
| [`2004-RESEARCH.md`](2004-RESEARCH.md) | Thesis · bans · P0 map |
| [`2004-WEB-SURF-RESEARCH-2026-07-27.md`](2004-WEB-SURF-RESEARCH-2026-07-27.md) | Facts · quotes · harvest URLs |
| [`2004-DEEP-RESEARCH-2026-07-27.md`](2004-DEEP-RESEARCH-2026-07-27.md) | Timeline · room kits · gates |
| [`2003-TO-2004-HANDOFF-DEEP-RESEARCH-2026-07-27.md`](2003-TO-2004-HANDOFF-DEEP-RESEARCH-2026-07-27.md) | Scaffold deltas from 2003 |
| [`2004-IMPLEMENTATION-PHASES.md`](2004-IMPLEMENTATION-PHASES.md) | Checkbox status card |
| Capture | [`references/2004/CAPTURE-LOG.md`](references/2004/CAPTURE-LOG.md) · [`ASSETS.md`](references/2004/ASSETS.md) · [`ARTIFACTS.md`](references/2004/ARTIFACTS.md) |
| Bar (prior year) | [`2003-MUSEUM-GRADE.md`](2003-MUSEUM-GRADE.md) |

### Disk truth (recheck 2026-07-27)

| Item | Now |
|------|-----|
| Hub 2004 | **Unlocked · Available** |
| Tree | **`years/2004/` live** · **231** HTML |
| Assets | **`assets/period/2004/` live** · **147** files |
| Configs | `js/config/2004.js` · `period-2004.css` · immersion modules |
| Research | **Complete** · MVP **shipped** |
| Scaffold from | **`years/2003/`** museum densify shipped |
| Residual | Optional P2 (Web 2.0 Conference · thin stubs) |

### Legal (every phase)

No real email · no real photo uploads · no real accounts/payments · no copyrighted media payloads · localStorage only · trademarks for reconstruction only · never claim RECON is WA · no YouTube/Twitter/Chrome-default/open-Facebook.

---

## Phase map (MVP 0–11 + museum densify)

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **R** | Research pack ready | — | `[x]` | — |
| **0** | Capture prep & assets | M | `[x]` | Pixels base |
| **1** | Scaffold `cp 2003 → 2004` + configs | M | `[x]` | Boots |
| **2** | Chrome XP + IE6 + year shell labels | S | `[x]` | Shell |
| **3** | Home / About thesis (51.6M · Web 2.0 hinge) | S–M | `[x]` | Thesis |
| **4a** | P0 Gmail multi-page + theater | M | `[x]` | Signature |
| **4b** | P0 Flickr multi-page + theater | M | `[x]` | Signature |
| **4c** | P0 Thefacebook multi-page + theater | M | `[x]` | Signature |
| **4d** | P0 Firefox 1.0 product room | M | `[x]` | Signature |
| **5** | Continuity densify MySpace mass · Google IPO · Blogger | M | `[x]` | Year feel |
| **6** | Immersion modules + tour + registry | S–M | `[x]` | Playable path |
| **7** | P1 Digg seed · Bloglines densify · news wire | M | `[x]` | P1 |
| **8** | Gates + hub unlock | S–M | `[x]` | **MVP ship** |
| **9** | Pixel harvest WA crops | M–L | `[x]` 2026-07-27 | Authenticity |
| **10** | Docs honesty match disk | S | `[x]` | Honesty |
| **11** | Research re-verify vs disk | S | `[x]` | Close MVP loop |
| **M1** | Museum multi-page densify P0 | M–L | `[x]` | Museum bar |
| **M2** | Continuity museum pass | M | `[x]` | Museum bar |
| **M3** | P1 museum densify | M | `[x]` | Museum bar |
| **M4** | Pixel residual / failed logs | M | `[x]` | Pixels |
| **M5** | e2e expansion | M | `[x]` | Gates |
| **M6** | Promote museum status | S | `[x]` | Done |

**Order:** R → 0 → 1 → 2 → 3 → (4a–4d *parallel-ok*) → 5 → 6 → 7 → 8 → 10 → 11.  
**Phase 9** anytime after Phase 0 (ideal after 4).  
**Museum M1–M6** after MVP ship (Phase 8).

**MVP ship** = phases **0–8 + 10–11** green (Phase 9 may still be residual RECON).  
**Museum** = M1–M6 green + Phase 9 harvested **or** failed-harvest logged honestly.

---

# Phase R — Research (done)

### Goal
Source-backed thesis, bans, handoff, harvest queue — no invent.

### Status
`[x]` Complete 2026-07-27.

### Acceptance
- [x] RESEARCH · DEEP · WEB-SURF · HANDOFF · CAPTURE/ASSETS/ARTIFACTS · DISK-TRUTH updated  
- [x] This step-by-step exists  

### Time
— (already done)

---

# Phase 0 — Capture prep & assets

### Goal
Create `assets/period/2004/**` with **continuity from 2003** + **RECON signature folders** for Gmail · Flickr · Thefacebook · Firefox. Log honesty tags. Do **not** claim WA until Phase 9.

### Disk start
`assets/period/2004/` absent.

### Files / dirs

```
assets/period/2004/
  README-PIXELS.txt
  gmail/          # logo-recon.gif (+ later logo-wa.gif)
  flickr/
  facebook/       # Thefacebook era
  firefox/
  # + continuity: amazon, google, yahoo, myspace, chrome, xp, …
docs/references/2004/ASSETS.md
docs/references/2004/CAPTURE-LOG.md
```

### Steps

1. Copy continuity tree:
   ```bash
   mkdir -p assets/period/2004
   # Prefer rsync of useful brands; or:
   cp -R assets/period/2003/* assets/period/2004/
   ```
2. Create signature dirs if missing: `gmail` `flickr` `facebook` `firefox`.  
3. Drop **RECON** placeholders:
   - `gmail/logo-recon.gif` · `flickr/logo-recon.gif` · `facebook/logo-recon.gif` · `firefox/logo-recon.gif`  
   - Optionally copy to `logo.gif` until WA.  
4. Write `assets/period/2004/README-PIXELS.txt`:
   - CONTINUITY brands list  
   - RECON signatures  
   - “Do not claim RECON as WA”  
5. Per-brand `README-AUTHENTICITY.txt` for gmail/flickr/facebook/firefox.  
6. Update `ASSETS.md` counts + provenance table (RECON).  
7. CAPTURE-LOG: note Phase 0 RECON installed; harvest still open.  
8. Optional *parallel-ok*: start Phase 9 CDX downloads into `docs/references/harvest/found-assets/2004-m5/`.

### Acceptance
- [ ] `assets/period/2004/` exists with chrome/xp continuity  
- [ ] Four signature brand folders + RECON logos  
- [ ] README-PIXELS honesty  
- [ ] No file claimed WA without CAPTURE-LOG row  

### Anti-patterns
- Inventing modern Gmail/Facebook logos as “2004 authentic”  
- Copying YouTube/Chrome assets into period/2004  
- Skipping authenticity READMEs  

### Time
M (1–3 h)

---

# Phase 1 — Scaffold year tree + configs

### Goal
Bootable `years/2004/` forked from **2003**, with year strings and configs retargeted so the shell loads (even if rooms still say 2003 until later phases).

### Disk start
`years/2004/` absent.

### Steps

1. Scaffold:
   ```bash
   cp -R years/2003 years/2004
   ```
2. Bulk retarget carefully (prefer search-replace with review):
   - `data-itt-year="2004"` on shell  
   - `year-2004` / `os-winxp` / `browser-ie6` body classes  
   - Paths `period/2003` → `period/2004`  
   - Titles “2003” → “2004” where year-specific  
   - `immersion-2003` / `browser-2003` / `config/2003` script tags → `2004`  
3. Create year stubs:

| File | Role |
|------|------|
| `js/config/2004.js` | urlMap · bookmarks · connect · year labels |
| `js/config/immersion-2004.js` | features · tour spine (fill in Phase 6) |
| `js/browser-2004.js` | `bootBrowserYear("2004")` thin stub |
| `js/immersion-2004.js` | immersion boot thin stub |
| `css/period-2004.css` | `@import url("period-2003.css");` + deltas |

4. Build **complete urlMap** for every HTML under `years/2004/` (script or manual).  
5. Register year in hub only as locked still (unlock = Phase 8).  
6. Smoke local: open `years/2004/index.html` via static server — shell paints, home iframe loads.

### Acceptance
- [ ] `years/2004/index.html` boots  
- [ ] `data-itt-year="2004"`  
- [ ] Config/CSS/JS stubs load without 404  
- [ ] urlMap covers every content HTML (or plan Phase 8 complete)  
- [ ] No accidental unlock of hub card yet  

### Anti-patterns
- Leaving `years/2003` paths in 2004 HTML  
- Deleting continuity rooms before P0 exists  
- Unlocking hub before authenticity green  

### Time
M (2–4 h)

---

# Phase 2 — Chrome XP + IE6 + shell labels

### Goal
Shell is **honest 2004 mass market**: Windows XP + **IE6** default chrome. Firefox is a **product room**, not the default shell (unless optional later alt-chrome).

### Files
```
years/2004/index.html
js/browser-2004.js
js/config/2004.js
assets/period/2004/xp/*
assets/period/2004/chrome/*
```

### Steps

1. Confirm body: `class="year-2004 os-winxp browser-ie6" data-itt-year="2004"`.  
2. Start menu / taskbar assets point at `assets/period/2004/xp/`.  
3. IE toolbar GIFs from `assets/period/2004/chrome/`.  
4. Connect mode: **broadband** default (continuity from 2003).  
5. Status bar / title strings say 2004 immersion, not 2003.  
6. Optional: Start menu entry “Firefox 1.0” → product room (story), default browser still IE chrome.

### Acceptance
- [ ] XP + IE6 shell classes  
- [ ] No Firefox-as-default-shell claim on mass desktop  
- [ ] Period assets resolve (no broken start/taskbar)  

### Anti-patterns
- Shipping Chrome browser chrome  
- “Everyone uses Firefox in 2004” as shell default  

### Time
S (30–90 min)

---

# Phase 3 — Home / About thesis

### Goal
Visitor lands on a **2004 Web 2.0 hinge** home: scale **51.6M** sites · **~910M** users · four pillars · bans listed on About.

### Files
```
years/2004/pages/home.html
years/2004/pages/about.html
years/2004/pages/whats-new.html   # optional
css/period-2004.css               # home polish
```

### Four pillars (must appear)
1. **Thefacebook** — campus social seed (not open web)  
2. **Flickr** — photo + tags  
3. **Gmail** — invite webmail app · 1 GB  
4. **Firefox 1.0** + **Google IPO** — browser challenge · search goes public  

### Steps

1. Rewrite home hero: `2004 · Windows XP · Internet Explorer 6 · ~51.6 million sites`.  
2. Link grid to P0 rooms (even if rooms still stub until Phase 4).  
3. Continuity links: MySpace · iTunes · WordPress · Google · Amazon.  
4. About page:
   - Thesis paragraph  
   - Scale Live Stats numbers  
   - **Bans:** YouTube · Twitter · open Facebook · Chrome browser · Yahoo-owned Flickr · streaming default  
   - Facemash = footnote only (2003), not product  
5. Remove leftover 2003 “MySpace seed / Friendster mass” as the *only* thesis (keep as continuity, not sole spine).

### Acceptance
- [ ] 51,611,646 or “~51.6 million” on home or about  
- [ ] Four pillars linked  
- [ ] Ban list on About  
- [ ] No YouTube/Twitter links  

### Time
S–M (1–2 h)

---

# Phase 4a — P0 Gmail

### Goal
Playable **Gmail Apr 2004** theater: invite lore · 1 GB pitch · login · inbox · compose. localStorage only.

### Files
```
years/2004/sites/gmail/index.html      # login / invite
years/2004/sites/gmail/inbox.html
years/2004/sites/gmail/compose.html
years/2004/sites/gmail/about.html      # optional densify
js/immersion/gmail.js
assets/period/2004/gmail/logo.gif
```

### Hooks (authenticity expects)
- `data-gmail-login` on login form  
- `data-gmail-list` on inbox  
- Compose form writes localStorage only  

### Steps

1. Create gmail directory + three pages minimum.  
2. **index:** April Fools honesty · invite-only · 1 GB vs MB competitors · login form `data-gmail-login`.  
3. **inbox:** multi-column recon (labels sidebar + message list `data-gmail-list`) · no real network.  
4. **compose:** send → localStorage “sent” folder theater.  
5. Implement `js/immersion/gmail.js` (login gate · list render · compose).  
6. Link from home + tour.  
7. urlMap entries for all gmail HTML.

### Copy kit
“Search, don’t sort.” · 1 GB free · invitation required · conversation view optional densify · not 2020 Material Gmail.

### Acceptance
- [ ] Login → inbox path works without network  
- [ ] Compose persists in localStorage  
- [ ] Hooks present for `test_2004_signature`  
- [ ] No real SMTP  

### Anti-patterns
- Claiming open signup for all in 2004  
- Modern side-rail Gmail UI as “authentic pixels” without WA  

### Time
M (2–4 h)

---

# Phase 4b — P0 Flickr

### Goal
Playable **Flickr 2004** Ludicorp-era room: photostream · upload theater · tags copy. Not Yahoo-owned product.

### Files
```
years/2004/sites/flickr/index.html
years/2004/sites/flickr/upload.html
years/2004/sites/flickr/explore.html   # optional
years/2004/sites/flickr/about.html     # optional
js/immersion/flickr.js
assets/period/2004/flickr/logo.gif
css/period-2004.css                    # pink/blue recon helpers
```

### Hooks
- `data-flickr-stream` on home/stream  

### Steps

1. Home: logo · “Share your photos” · stream grid `data-flickr-stream` (placeholder thumbs OK).  
2. Upload: form stores metadata in localStorage (no real binary photo required — optional demo GIFs).  
3. Tags / folksonomy honesty (May 2004 tags culture).  
4. Yellow note: **Yahoo acquisition = March 2005** — not yet.  
5. `flickr.js`: render stream · upload append.  
6. WDM layout-ref for pink/blue grammar (CSS), not modern redesign.

### Acceptance
- [ ] Stream hook present  
- [ ] Upload theater works offline  
- [ ] No “owned by Yahoo” as 2004 fact  

### Time
M (2–4 h)

---

# Phase 4c — P0 Thefacebook

### Goal
Playable **Thefacebook** campus product: Harvard/college gate · profile · friends. Brand **Thefacebook**, not modern Facebook.

### Files
```
years/2004/sites/facebook/index.html     # login / network gate
years/2004/sites/facebook/profile.html
years/2004/sites/facebook/friends.html   # optional densify
js/immersion/facebook.js
assets/period/2004/facebook/logo.gif
```

### Hooks (authenticity)
- Profile hooks on `profile.html` (as required by `test_2004_signature`)  

### Steps

1. **index:** “Thefacebook” · college network · `.edu` vibe · login/register theater.  
2. **profile:** name · status · school · friends count · poke optional.  
3. Honesty: Harvard **Feb 4, 2004** · expands to other schools later 2004 · **not** open internet.  
4. `facebook.js`: localStorage profile + friends list.  
5. Do **not** add News Feed · Timeline · Messenger.  
6. Link from home as **Thefacebook** not “Facebook App”.

### Acceptance
- [ ] Campus-gated copy explicit  
- [ ] Profile theater live  
- [ ] No open-to-everyone 2006 framing  
- [ ] Module registered later in Phase 6  

### Anti-patterns
- Modern blue FB chrome as default “authentic” without WA  
- Claiming MySpace-scale users for Thefacebook in 2004  

### Time
M (2–4 h)

---

# Phase 4d — P0 Firefox 1.0

### Goal
Product room for **Firefox 1.0 (Nov 9, 2004)**: features · download theater · vs IE6 honesty. Shell remains IE6.

### Files
```
years/2004/sites/firefox/index.html
years/2004/sites/firefox/features.html
years/2004/sites/firefox/download.html
years/2004/sites/firefox/whatsnew.html   # optional
assets/period/2004/firefox/logo.gif
```

### Steps

1. index: “Firefox 1.0” · Nov 9 2004 · take back the web.  
2. features: **tabs** · **popup blocking** · phishing/fraud protection · open source.  
3. download: fake download button → thank-you / “museum — no binary” theater.  
4. Culture strip: Dec 15 2004 NYT community ad (text OK).  
5. Explicit: **IE6 still dominates installs**; Firefox is the rising choice.  
6. Retarget any leftover **Firebird-only** pages to point at Firefox 1.0 for 2004 (keep Firebird as history link optional).

### Acceptance
- [ ] “1.0” framing on product page (authenticity)  
- [ ] Multi-page product room  
- [ ] No claim Firefox is already default OS browser  

### Time
M (1.5–3 h)

---

# Phase 5 — Continuity densify

### Goal
2003 rooms feel like **2004**, not a stale fork: MySpace mass · Google IPO · Blogger still Google · scale labels.

### Files (touch as needed)
```
years/2004/sites/myspace/*
years/2004/sites/google/*
years/2004/sites/blogger/*
years/2004/sites/friendster/*
years/2004/sites/cnn/*          # optional IPO wire
years/2004/pages/about.html
```

### Steps

1. **MySpace:** honesty ~**1M users mid-2004** (Cybercultural) · still mass social vs campus Thefacebook.  
2. **Google:** IPO **Aug 19, 2004** strip on home or news; search UI continuity.  
3. **Blogger:** still Google-owned (from Feb 2003) — no regression to Pyra-only.  
4. **Friendster:** still exists; losing cool to MySpace — short honesty.  
5. **iTunes / WP / LinkedIn / AdSense / Bloglines:** keep working; year labels 2004.  
6. Remove any Facemash **product** room if scaffolded; About footnote only.

### Acceptance
- [ ] MySpace mass vs Thefacebook seed clear  
- [ ] Google IPO mentioned somewhere visitor-visible  
- [ ] No 2003-only thesis left as home spine  

### Time
M (2–3 h)

---

# Phase 6 — Immersion modules + tour + registry

### Goal
Tour and modules make P0 **playable as a path**, not isolated HTML.

### Files
```
js/config/immersion-2004.js
js/immersion-2004.js
js/immersion/registry.js
js/immersion/gmail.js
js/immersion/facebook.js
js/immersion/flickr.js
```

### Tour spine (canonical)
**Firefox → Gmail → Flickr → Thefacebook → Google → MySpace**

### Steps

1. `immersion-2004.js` features:
   ```js
   gmail: true,
   facebook: true,
   flickr: true,
   // continuity flags as needed
   ```
2. Tour stops match spine URLs under `years/2004/sites/…`.  
3. Registry: year `"2004"` loads gmail · facebook · flickr modules.  
4. Manual click-through tour once.  
5. Ensure Start menu / favorites can reach P0.

### Acceptance
- [ ] Flags match authenticity (`gmail: true`, `facebook: true`, `flickr: true`)  
- [ ] Registry includes three modules  
- [ ] Tour completes without dead ends  

### Time
S–M (1–2 h)

---

# Phase 7 — P1 densify

### Goal
Secondary 2004 flavor without blocking MVP: Digg seed · Bloglines web-app love · optional news IPO.

### Steps

1. **Digg seed** (`years/2004/sites/digg/` thin OK):
   - Dec 2004 public · “seed year — rise is 2005” honesty  
   - Submit/dig theater localStorage optional  
2. **Bloglines:** densify continuity room (browser RSS, no install) — Cybercultural Jul 2004 RWW spirit.  
3. **CNN or Yahoo news:** one wire on Google IPO / Web 2.0 conference optional.  
4. urlMap + home “also in 2004” links.

### Acceptance
- [ ] Digg not presented as 2005 peak  
- [ ] Bloglines still works  
- [ ] No YouTube “related” creep  

### Time
M (1–3 h)

---

# Phase 8 — Gates + hub unlock

### Goal
**MVP ship:** authenticity green · smoke green · e2e green · hub **Available**.

### Files
```
index.html                          # unlock 2004 card
e2e/2004-mvp.spec.js                # write if missing
scripts/test-authenticity.py        # already has test_2004_*
scripts/smoke-production.py
docs/DISK-TRUTH.md
docs/2004-MUSEUM-GRADE.md
```

### Steps

1. Complete urlMap for **every** HTML under `years/2004/`.  
2. Run:
   ```bash
   python3 scripts/test-authenticity.py
   python3 scripts/smoke-production.py
   npx playwright test e2e/2004-mvp.spec.js
   ```
3. Fix failures (hooks, registry, bans).  
4. Anachronism grep: no youtube.com product room, twitter, chrome browser default.  
5. Unlock hub card:
   - Remove `locked` / `aria-disabled` on y2004  
   - Link to `years/2004/index.html`  
   - Chip **Available**  
6. Update DISK-TRUTH: 2004 live · hub open through 2004.  
7. MUSEUM-GRADE status → **MVP shipped** (not yet museum densify).

### Acceptance
- [ ] `test_2004_signature` OK (not skip)  
- [ ] smoke paths include 2004  
- [ ] e2e mvp green  
- [ ] Hub unlocks 2004  
- [ ] DISK-TRUTH honest  

### Anti-patterns
- Unlocking with red authenticity  
- Shipping with empty urlMap  

### Time
S–M (1–3 h + fix loops)

---

# Phase 9 — Pixel harvest (WA) *parallel-ok after Phase 0/4*

### Goal
Replace RECON signatures with dated **Wayback** crops where possible; log successes and honest failures.

### CDX anchors (from CAPTURE-LOG)

| Brand | Timestamp | id_ URL seed |
|-------|-----------|--------------|
| Flickr | `20040226214842` | flickr.com |
| Gmail | `20040401041817` | gmail.google.com |
| Thefacebook | `20040212031928` | thefacebook.com |
| Firefox | `20041101020136` | mozilla.org/products/firefox |

### Steps

1. `mkdir -p docs/references/harvest/found-assets/2004-m5`  
2. Fetch WA HTML `id_` → extract image URLs.  
3. Download GIFs/PNG via `web.archive.org/web/{ts}id_/{orig}`.  
4. `file(1)` must say GIF/JPEG/PNG — delete HTML error bodies.  
5. Install as `logo-wa.gif` · promote to `logo.gif`; keep `logo-recon.gif`.  
6. Wire HTML heights to real dimensions.  
7. CAPTURE-LOG + ASSETS + README-PIXELS update.  
8. Failed harvests: leave RECON + write failed row (never invent).

### Acceptance
- [ ] At least attempt all four P0 brands  
- [ ] Every WA file has capture timestamp in CAPTURE-LOG  
- [ ] RECON residual listed honestly  

### Time
M–L (3 h+)

---

# Phase 10 — Docs honesty match disk

### Goal
Every status doc matches **playable disk** after MVP.

### Files
```
docs/DISK-TRUTH.md
docs/2004-MUSEUM-GRADE.md
docs/2004-IMPLEMENTATION-PHASES.md
docs/references/2004/ARTIFACTS.md
docs/references/2004/ASSETS.md
docs/references/2004/CAPTURE-LOG.md
README.md                          # if hub years listed
```

### Steps

1. Count HTML / assets; write numbers in ARTIFACTS + MUSEUM-GRADE.  
2. CAPTURE-LOG: live MVP, not wipe.  
3. Phase checkboxes in IMPLEMENTATION-PHASES flip to `[x]` for 0–8, 10–11.  
4. Kill any remaining “years/2004 wiped” in active status cards (keep historical notes labeled archive).  
5. Link this step-by-step from IMPLEMENTATION-PHASES.

### Acceptance
- [ ] No active doc claims wipe while tree exists  
- [ ] Counts match disk  

### Time
S (30–60 min)

---

# Phase 11 — Research re-verify vs disk

### Goal
Spot-check research claims against what shipped; close MVP research loop.

### Steps

1. Walk P0 rooms vs WEB-SURF copy kits.  
2. Confirm bans not violated.  
3. Confirm scale numbers still 51.6M / 910M.  
4. Note residuals (pixels, museum densify) in MUSEUM-GRADE.  
5. Optional: one live browser pass Start menu → tour spine.

### Acceptance
- [ ] No known wrong-year fact on home/P0  
- [ ] Residual list explicit  

### Time
S (30–60 min)

---

# Museum densify (after MVP)

## Phase M1 — Multi-page densify P0

### Goal
Gmail · Flickr · Thefacebook · Firefox match **2003-style multi-page densify** (not thin stubs).

### Steps
1. Gmail: about · labels UX · more inbox chrome.  
2. Flickr: explore · about · groups note.  
3. Thefacebook: friends · networks · invite.  
4. Firefox: whatsnew · deeper features · ad culture.  
5. Expand e2e selectors accordingly.

### Acceptance
- [ ] Each P0 has ≥3 meaningful pages  
- [ ] Tour still green  

### Time
M–L

---

## Phase M2 — Continuity museum pass

### Goal
MySpace · Google IPO · portals feel dense and year-correct.

### Steps
1. MySpace multi-page continuity polish.  
2. Google IPO news densify.  
3. Amazon/Yahoo rails year labels.  

### Acceptance
- [ ] Continuity rooms not “2003 paste with year flip only”  

### Time
M

---

## Phase M3 — P1 museum densify

### Goal
Digg seed · Bloglines · optional del.icio.us/Feedburner culture notes.

### Acceptance
- [ ] P1 rooms multi-page or richly single-page  
- [ ] Digg honesty (seed not peak)  

### Time
M

---

## Phase M4 — Pixel residual

### Goal
Finish WA harvests or log permanent RECON failures.

### Acceptance
- [ ] CAPTURE-LOG harvest queue checked or failed  
- [ ] ASSETS provenance accurate  

### Time
M

---

## Phase M5 — e2e expansion

### Goal
Buttons + live-flows parity with 2003 (`2003-buttons` / live-flows style).

### Files
```
e2e/2004-mvp.spec.js
e2e/2004-buttons.spec.js      # new
e2e/2004-live-flows.spec.js   # new
```

### Acceptance
- [ ] ≥12–16 green tests class (match project bar)  
- [ ] CI/local playwright green  

### Time
M

---

## Phase M6 — Promote museum status

### Goal
Mark 2004 **museum densify complete** only when M1–M5 (and M4 honest) green.

### Steps
1. MUSEUM-GRADE status → museum complete.  
2. DISK-TRUTH residual only optional.  
3. IMPLEMENTATION-PHASES museum checkboxes `[x]`.  
4. Final authenticity + e2e run.

### Acceptance
- [ ] Status card honest  
- [ ] Gates green  

### Time
S

---

# Quick reference — implement day order

```text
Day plan (example)
0  Phase 0 assets
1  Phase 1 scaffold + Phase 2 shell
2  Phase 3 home + start 4a Gmail
3  4b Flickr + 4c Thefacebook
4  4d Firefox + Phase 5 continuity
5  Phase 6 immersion + Phase 7 P1
6  Phase 8 gates unlock + Phase 10–11 docs
// anytime: Phase 9 WA harvest
// later: M1–M6 museum densify
```

---

# Anti-patterns (global)

| Don’t | Do instead |
|-------|------------|
| Unlock hub early | Phase 8 only |
| Modern FB/Gmail UI as “period authentic” | RECON labeled or WA dated |
| YouTube / Twitter rooms | Ban until 2005/2006 |
| Yahoo owns Flickr in 2004 | 2005 acquisition note |
| Firefox as only browser shell | IE6 default + Firefox product |
| Real email/photos | localStorage theater |
| Claim RECON is WA | CAPTURE-LOG honesty |

---

*Step-by-step authored 2026-07-27 for Internet Through Time. Educational reconstruction only.*
