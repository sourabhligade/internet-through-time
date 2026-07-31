# 2000 Museum rebuild — step-by-step phases (minute detail)

**Date:** 2026-07-27  
**Purpose:** Ordered checklist to rebuild **wiped 2000** from shipped **1999** + research packs. Same process shape as [`2003-MUSEUM-PHASES-STEP-BY-STEP.md`](2003-MUSEUM-PHASES-STEP-BY-STEP.md).  
**Rule:** Finish one phase before the next unless *parallel-ok*. Check boxes as you go.  
**Do not** trust pre-wipe “2000 densify shipped” language.

### Research bibles (read first)

| Doc | Use |
|-----|-----|
| [`2000-WEB-SURF-RESEARCH-2026-07-27.md`](2000-WEB-SURF-RESEARCH-2026-07-27.md) | Facts · quotes · harvest |
| [`2000-MUSEUM-GRADE-RESEARCH-2026-07-27.md`](2000-MUSEUM-GRADE-RESEARCH-2026-07-27.md) | Audit · room matrix |
| [`2000-DEEP-RESEARCH-2026-07-23.md`](2000-DEEP-RESEARCH-2026-07-23.md) | Full visit log |
| [`2000-RESEARCH.md`](2000-RESEARCH.md) | Sites · immersion · bans |
| [`references/2000/ARTIFACTS.md`](references/2000/ARTIFACTS.md) | Pixel/HTML kit |
| [`references/2000/CAPTURE-LOG.md`](references/2000/CAPTURE-LOG.md) | URL queue |

### Disk truth (start)

| Item | Now |
|------|-----|
| Hub 2000 | **Locked** · Rebuild |
| Tree | **`years/2000/` absent** |
| Assets | **`assets/period/2000/` absent** |
| Research | **Complete** (Jul 23 + Jul 27) |
| Scaffold from | **`years/1999/`** shipped museum-grade |

### Legal (every phase)

No real P2P files · no copyrighted audio · no real payments · localStorage only · never claim RECON is WA · no XP/IE6 chrome.

---

## Phase map

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **R** | Research pack ready | — | `[x]` | — |
| **0** | Capture prep & assets | M–L | `[ ]` | Pixels |
| **1** | Scaffold `cp 1999 → 2000` + configs | M | `[ ]` | Boots |
| **2** | Chrome IE 5.5 + Win98/ME labels | S–M | `[ ]` | Shell |
| **3** | Home / About thesis (17.1M · crash pillars) | S | `[ ]` | Thesis |
| **4** | P0 Amazon smile + tabs + cart | M | `[ ]` | Signature |
| **5** | P0 Napster densify + legal | M | `[ ]` | Signature |
| **6** | P0 Pets + crash catalog + news rails | M | `[ ]` | Signature |
| **7** | Continuity Yahoo · Google · eBay · PayPal | M | `[ ]` | Portals |
| **8** | Immersion registry + tour + modules | S–M | `[ ]` | Playable path |
| **9** | P1 Gnutella · Flash · MetaFilter · NN6 · Blogger blogroll | M | `[ ]` | Densify |
| **10** | Gates + hub unlock | S–M | `[ ]` | **MVP ship** |
| **11** | Museum densify + WA extracts + e2e expansion | L | `[ ]` | Museum bar |
| **12** | Docs honesty match disk | S | `[ ]` | Honesty |

**MVP ship** = phases **0–10** green.  
**Museum densify** = phase **11** + residual pixels.

---

# Phase 0 — Capture prep & assets

### Goal
Create `assets/period/2000/**` with continuity from 1999 + **smile** + pets + chrome placeholders; log CAPTURE-LOG.

### Steps

1. `mkdir -p assets/period/2000/{amazon,napster,yahoo,google,ebay,pets,paypal,flash,chrome,win98,netscape6,gnutella,metafilter,blogger}`  
2. Copy continuity packs from `assets/period/1999/` for shared brands (yahoo, google, ebay, napster base, chrome interim, win98).  
3. **Amazon smile:** create/harvest `logo-smile.gif` + `logo-smile-sm.gif` (PIL recon OK if WA fails — label RECON in ASSETS).  
4. Pets: logo + sock-puppet schematic — label RECON.  
5. Write `assets/period/2000/README-PIXELS.txt` (CONTINUITY / RECON / WA policy).  
6. Save any WA HTML text under `docs/references/2000/wayback-extracts/`.  
7. Update `ASSETS.md` + CAPTURE-LOG rows.

### Acceptance

- [ ] Dirs exist  
- [ ] Smile file path present (even RECON)  
- [ ] ASSETS honesty tags  
- [ ] No claim of WA without dated log  

### Time
M–L (2–6 h)

---

# Phase 1 — Scaffold year tree

### Goal
Bootable `years/2000/` from 1999 with year strings retargeted.

### Steps

```bash
cp -R years/1999 years/2000
# Carefully retarget:
# - data-itt-year="2000"
# - immersion/browser configs → 2000
# - assets/period/1999 → period/2000
# - titles / about copy for 2000 thesis
```

Create:

| File | Role |
|------|------|
| `js/config/2000.js` | urlMap · hints · bookmarks |
| `js/config/immersion-2000.js` | tour · features |
| `js/browser-2000.js` | thin `bootBrowserYear("2000")` |
| `js/immersion-2000.js` | thin immersion boot |
| `css/period-2000.css` | `@import period-1999` + deltas |

Registry: add `"2000": [ … ]` mirroring 1999 modules + napster/amazon/etc.

### Acceptance

- [ ] Shell loads on local server  
- [ ] Home iframe works  
- [ ] urlMap covers every HTML under years/2000  

### Time
M (2–4 h)

---

# Phase 2 — Chrome IE 5.5

### Goal
Shell identity = **2000 · Windows 98/ME · Internet Explorer 5.5**.

### Steps

1. Shell title / about: Internet Explorer **5.5**.  
2. Body classes: `year-2000` · `browser-ie5` · `os-win98` (ME note optional).  
3. **Ban** Luna XP start / IE6-only chrome.  
4. Dirbar links: Amazon · Napster · Pets · Google · Yahoo · eBay · PayPal · Flash · CNN.  
5. Connect mode: modem default; optional broadband tease.

### Acceptance

- [ ] No XP/IE6 default branding  
- [ ] IE 5.5 labeled  

### Time
S–M (1–2 h)

---

# Phase 3 — Home / About thesis

### Goal
Starting Point states crash + smile + Napster + Flash + scale **17,087,182**.

### Copy kit

- Scale: **17,087,182** sites · **~413M** users (Live Stats June 2000)  
- Pillars: Amazon smile · Napster war · Pets/crash · Flash · portals still huge  
- Bans chip: no Wikipedia · no XP · no streaming Napster · no iPod Store  

### Acceptance

- [ ] Numbers present  
- [ ] Tour list points at P0 rooms  
- [ ] About honesty box  

### Time
S (1 h)

---

# Phase 4 — Amazon smile (P0)

### Goal
First year smile is **correct** — tabs + Marketplace language + cart theater.

### Steps

1. Point mastheads to `logo-smile.gif` (not river-A).  
2. Multi-tab strip (books music DVD toys electronics … zShops/Marketplace).  
3. Reuse `amazon.js` cart with `itt00` / year storage prefix.  
4. Authenticity later: require smile path in 2000 Amazon HTML.  
5. About/home: “Smile logo debut year.”

### Acceptance

- [ ] Smile visible on home  
- [ ] Cart works  
- [ ] No modern Amazon black nav  

### Time
M (2–3 h)

---

# Phase 5 — Napster densify (P0)

### Goal
Monster-year culture war UI — Beta 5a marketing + client theater + legal banners.

### Copy kit (from WA + research)

- “**Napster is music at Internet speed.**”  
- Download **2.0 Beta 5a** (theater)  
- Scale beats: ~10M May · EOY ~50M claims  
- Legal: RIAA · Patel **Jul 26 2000** injunction · stay  
- Macster note  

### Steps

1. Marketing home + policy page.  
2. Client page: search · results · peer list (fake).  
3. Extend `napster.js` year copy; **never** host audio.  
4. Link CNN music / legal story.

### Acceptance

- [ ] Tagline present  
- [ ] No stream-now / Spotify CTAs  
- [ ] Download theater only  

### Time
M (2–3 h)

---

# Phase 6 — Pets + crash + news (P0)

### Goal
Dot-bomb mascot + news rails for AOL-TW / NASDAQ / Pets shutdown.

### Steps

1. `sites/pets/` — sock puppet · Super Bowl · Nov liquidation.  
2. `sites/startupfailures/` or crash catalog room.  
3. CNN densify year-correct stories (verify no 1999 leftovers).  
4. Optional stock ticker tease (fake numbers).

### Acceptance

- [ ] Pets room live  
- [ ] Crash narrative linked from home  
- [ ] News not bulk-forked wrong year  

### Time
M (2–3 h)

---

# Phase 7 — Continuity portals

### Goal
Yahoo Y2K density · sparse Google · multicolor eBay · PayPal/X.com merge story.

### Steps

1. Yahoo: retarget 1999 fork; add crash/finance anxiety modules.  
2. Google: sparse; 2000 copyright; results corpus year-appropriate.  
3. eBay: keep multicolor; densify.  
4. PayPal: March 2000 merger honesty · send-money theater.

### Acceptance

- [ ] All four playable  
- [ ] PayPal not modern redesign  

### Time
M (2–4 h)

---

# Phase 8 — Immersion + tour

### Goal
Registry loads modules; tour spine playable.

### Tour spine

1. About 2000  
2. Amazon smile  
3. Napster  
4. Pets.com  
5. Google  
6. Yahoo  

### Steps

1. `immersion-2000.js` features flags.  
2. Registry `"2000"` array.  
3. Tour config matches home list.  
4. storagePrefix `itt00` / `itt-2000-*`.

### Acceptance

- [ ] Tour completes without dead `#` links  
- [ ] Modules boot on signature rooms  

### Time
S–M (1–2 h)

---

# Phase 9 — P1 rooms

### Goal
Gnutella · Flash 5 · MetaFilter · Netscape 6 · Blogger blogroll · optional Homestar note.

### Steps

1. Gnutella educational page (Mar 14 Nullsoft story).  
2. Macromedia Flash 5 + skippable splash theater.  
3. MetaFilter / Slashdot densify from forks.  
4. Netscape 6 honesty page (Nov 14 · not default).  
5. Blogger: blogroll sidebar theater.

### Acceptance

- [ ] Each P1 has ≥1 HTML + home link  
- [ ] NN6 not presented as default browser  

### Time
M (3–5 h)

---

# Phase 10 — Gates + hub unlock (MVP ship)

### Goal
Automated confidence + hub Available.

### Steps

1. `test_2000_signature` in `scripts/test-authenticity.py`:  
   - years/2000 boots  
   - smile on Amazon  
   - Napster 99¢? no — Napster P2P framing  
   - ban XP/IE6/Wikipedia paths  
   - hub not locked  
2. `test_2000_urlmap_complete`  
3. `e2e/2000-mvp.spec.js` (hub · shell · home · smile · Napster · Pets)  
4. Hub: change locked card → `available` link `years/2000/`  
5. README + DISK-TRUTH update  

### Commands

```bash
python3 scripts/test-authenticity.py
npx playwright test e2e/2000-mvp.spec.js
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
```

### Acceptance

- [ ] Authenticity 2000 tests green  
- [ ] e2e green  
- [ ] Hub opens 2000  

### Time
M (2–4 h)

---

# Phase 11 — Museum densify (post-MVP)

### Goal
Parity with multi-page + extract density (2003 process).

### Steps

1. Multi-page densify Amazon / Napster / Pets / Yahoo.  
2. Save WA extracts for Google/Yahoo/eBay/Amazon homes.  
3. True IE 5.5 crops where possible.  
4. `test_2000_museum` + second e2e file.  
5. Promote `2000-MUSEUM-GRADE.md`.

### Residual OK

RECON logos if WA fails — log CAPTURE-LOG `[failed]`.

### Time
L (1–3 days)

---

# Phase 12 — Docs honesty

### Goal
Every 2000 doc matches disk (same recheck discipline as 2003).

### Files

```
docs/2000-MUSEUM-GRADE.md
docs/2000-IMPLEMENTATION-PHASES.md
docs/2000-RESEARCH.md
docs/DISK-TRUTH.md
docs/references/2000/{ARTIFACTS,ASSETS,CAPTURE-LOG}.md
README.md
```

### Acceptance

- [ ] No “shipped” claims if tree missing  
- [ ] Counts match `find years/2000 | wc`  

### Time
S (30–60 m)

---

## Suggested work sessions

| Session | Phases | ~Time |
|---------|--------|-------|
| 1 | 0 assets | 3 h |
| 2 | 1–2 scaffold + chrome | 4 h |
| 3 | 3–4 home + Amazon | 3 h |
| 4 | 5–6 Napster + Pets | 4 h |
| 5 | 7–8 portals + tour | 4 h |
| 6 | 9 P1 | 4 h |
| 7 | 10 gates unlock | 3 h |
| 8 | 11 museum densify | multi-day |

**MVP total ~25–30 h** focused work.

---

## Anti-patterns

| Don’t | Do |
|-------|-----|
| Scaffold from wiped 2000 ghosts | Fork **1999** |
| Ship XP/IE6 shell | IE **5.5** · Win98/ME |
| Pre-smile Amazon as final | **Smile** required |
| Wikipedia room | 2001 |
| Real MP3 / P2P | Theater only |
| Unlock hub before gates | Phase 10 last for MVP |
| Trust old “densify ship” MDs | Trust DISK-TRUTH + this file |

---

*Rebuild phases authored 2026-07-27 after wipe audit. Educational reconstruction only.*
