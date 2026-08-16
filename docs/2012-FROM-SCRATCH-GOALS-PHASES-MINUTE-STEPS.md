# 2012 from scratch — goals · phases · minute steps

**Date:** 2026-08-15  
**Purpose:** Single **implement-from-this** file to remake museum year **2012 as its own lean year**.  
**Freeze:** [`2012-READ-FIRST.md`](2012-READ-FIRST.md)  
**Harvest:** [`2012-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md`](2012-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md)  
**Map:** [`2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md`](2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md)  
**Parent pattern:** live lean `years/2011/` or current `years/2012/` (already 47 HTML).

**Do not start S0 until the user says `implement 2012 from scratch`.**

---

## Locked constraints

1. Lean **~48–55 HTML**. Cap **60**. No `cp -R years/2011`. No restore of `/tmp/itt-2012-clone-backup-*`.  
2. One star: **SoundCloud** play → timed comment (`itt12-soundcloud`).  
3. Pages load **only** `js/immersion-2012.js` → `immersion/boot.js`.  
4. Prefix **`itt12`**. Incomplete never writes.  
5. Guided home `<ol>` stays **exactly 6**.  
6. Dual-cite scale: Live Stats June **697,089,489** (+101%) **and** Pingdom Dec **634 million** (+51M). Label the Aug 2012 Netcraft cleanup. Users ~**2.4B** (Pingdom) / ~**2.52B** (Live Stats cell).  
7. No Stories / Reels / Reactions / TikTok / Vine-as-January / iOS 7 flat / Meta / 5s/5c / Retina mini.  
8. Win8 is **26 Oct product**, not January mass shell.  
9. YouTube **index/upload stay optional** — Gangnam culture rooms exist. Do not grow a 2005 clone forest unless named.  
10. No second one-thing star.

---

## Goal

Rebuild a **lean museum-grade 2012**: Win7 + IE9/Chrome-rising, **SoundCloud timed comment** as the one-thing, residual REAL for **IG Android · FB buy · IPO · 1B · Pinterest · iPhone 5/Maps · iPad mini · Win8 · Chrome#1 · SOPA · Gangnam · UberX · Snap Android**, dual-cite scale, hard 2013 wall — **without** a 2011 forest.

---

## Visitor walk (12 flows)

Full click scripts: [`2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md`](2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md) **F-2012-1 … F-2012-12**.

```
Hub → 2012
  F1  ★ SoundCloud play → timed comment
  F2  Instagram Android Apr 3
  F3  FB buys IG ~$1B standalone
  F4  IPO $38 · Nasdaq stuck
  F5  1B MAU Oct 4
  F6  SOPA blackout Jan 18
  F7  Obama AMA Aug 29
  F8  Gangnam first YT 1B Dec 21
  F9  iPhone 5 / Lightning / Maps
  F10 iPad mini · Win8 late · Chrome #1
  F11 Pinterest mass pin
  F12 UberX · Snap Android · Drive
  → Exit · itt12-* only
```

---

## S0 — Inventory + do not wipe **[ ]**

**Why:** Current 2012 is already playable lean. Accidental `rm -rf` is the failure mode.

1. `find years/2012 -name '*.html' | wc -l` → expect **47**.  
2. Confirm one-thing href is SoundCloud. Guided ol = 6.  
3. Confirm `ITT.configs["2012"]` urlMap has SoundCloud + IG Android + IPO. No Amazon forest.  
4. Confirm YouTube `index.html` / `upload.html` **404** — leave unless named.  
5. Write a 5-line plan: keep keys, rewrite rooms **in place**. Prefer in-place.

**Ban:** `cp -R years/2011` · restore `/tmp/itt-2012-clone-backup-*`.

---

## S1 — About + home honesty **[ ]**

**Files:** `years/2012/pages/about.html` · `home.html` · `js/config/2012.js`

1. About table: Live Stats June **697,089,489** (+101%) · users cell **2,518,453,530** labeled · Pingdom Dec **634 million** · users **2.4B**.  
2. One sentence on the **2013 −3% / Aug 2012 wildcard cleanup**.  
3. Home lede names **SoundCloud gold** then weather (IG Android · IPO · SOPA).  
4. Guided stays 6: About · SoundCloud · IG Android · IPO · SOPA/AMA · map.  
5. Dual-cite on the portal-scale line (already).

**Tests:** `e2e/2012-mvp` · `2012-densify` about/home.

---

## S2 — Map gold **[ ]**

**Files:** `js/config/flow-maps.js` `2012` · `js/config/flow-trails.js`

1. Thesis names SoundCloud timed comment as one-thing.  
2. Branch: play → comment → Next IG Android.  
3. 10-flow strip already lists SoundCloud first — keep dests HTTP 200.

---

## S3 — SoundCloud gold ritual **[ ]**

**Files:** `sites/soundcloud/{index,track,about}.html` · `one-thing-machines.js` `bootSoundcloud`

1. Incomplete (no play and/or empty text) writes nothing.  
2. Complete: JSON `{ comments:[{text, at}], multiStep, real, year:"2012" }`.  
3. Next chip → `instagram/android.html`.  
4. Honesty: Oct 2008 site · 10M Jan / 15M May 2012 class · no CDN audio.

**Tests:** `e2e/one-thing-per-year.spec.js` 2012 · `2012-real-flows` SoundCloud.

---

## S4 — Pixel harvest **[ ]**

**Files:** `assets/period/2012/**` · `docs/references/2012/CAPTURE-LOG.md`

Try `im_` on **201204–201212** captures. `file` = GIF/JPEG/PNG else `[failed-final]`.

| Brand | Seed CDX |
|-------|----------|
| SoundCloud | `web.archive.org/web/20120515000000/http://soundcloud.com/` |
| Instagram | `…/20120403000000/http://instagr.am/` |
| Facebook | `…/20120518000000/http://www.facebook.com/` |
| Pinterest | `…/20120801000000/http://pinterest.com/` |
| Apple | Newsroom Sep 12 / Oct 23 |
| Win8 | `…/20121026000000/http://windows.microsoft.com/` |

---

## S5 — Instagram Android + buy **[ ]**

**Files:** `sites/instagram/{index,android,acquired}.html`

1. Android: **3 Apr** · **>1M** day one · filter + share REAL (iOS residual OK).  
2. Acquired: **9 Apr** · ~$1B · **standalone** promise · close **6 Sep** class.  
3. No Stories · no Meta · no buried-as-FB-Photos.

**Links:** FB Newsroom 9 Apr · NYT DealBook · TC Android 3 Apr.

---

## S6 — Facebook IPO + 1B **[ ]**

**Files:** `sites/facebook/{ipo,about,feed,index}.html`

1. IPO: **18 May** · **$38** · ~421M shares · ~$16B · ~$104B · Nasdaq **~11:00→11:30**.  
2. Close ~**$38.23** · open ~**$42**. Not a victory lap.  
3. 1B: **4 Oct** · ~600M mobile. Like only.  
4. Incomplete IPO literacy writes nothing.

---

## S7 — SOPA · AMA · Gangnam **[ ]**

**Files:** `sites/wikipedia/sopa-blackout.html` · `sites/reddit/ama.html` · `sites/youtube/{gangnam,watch,about}.html`

1. SOPA: **18 Jan** · 24h · 05:00 UTC.  
2. AMA: **29 Aug** · load crisis honesty.  
3. Gangnam: **15 Jul** upload class · **21 Dec** first YT **1B**. No official stream.  
4. Do **not** add YouTube index/upload unless named.

---

## S8 — Hardware / OS **[ ]**

**Files:** `sites/iphone/*` · `sites/ipad/*` · `sites/windows8/*` · `sites/chrome/*`

1. 4S is **2011**. 2012 flagship is **iPhone 5** · Lightning · **$199/$299/$399** · Maps broken.  
2. mini: **23 Oct / 2 Nov** · **$329/$429/$529** · non-Retina.  
3. Win8: **26 Oct** · Start screen · not Jan default.  
4. Chrome: StatCounter **May** global pass · dual methodology.

---

## S9 — P1 seeds **[ ]**

UberX Jul · 35% cheaper · not every-city gig. Snap Android **29 Oct** · no Stories. Drive **24 Apr**. Lyft **22 May** Zimride. Waze **not Google-owned** (buy 2013).

---

## S10 — Next chips + isolation **[ ]**

| After REAL | Chip dest |
|------------|-----------|
| `itt12-soundcloud` | `instagram/android.html` |
| IG Android | `facebook/ipo.html` |
| IPO | `wikipedia/sopa-blackout.html` or `facebook/about.html` |
| SOPA | `reddit/ama.html` |

Grep: no `itt11-` / `itt13-` writes from 2012 rooms.

---

## S11 — Gates **[ ]**

```bash
find years/2012 -name '*.html' | wc -l    # ≤ 60
npx playwright test e2e/one-thing-per-year.spec.js --grep "2012" --workers=1
npm run test:e2e:2012
```

**Accept:** 2012 row in check-all-years · guided ol = 6 · one star · isolation grep clean.

---

## Do not

| | |
|--|--|
| Instant Book / Airbnb gold | 2011 |
| Stories / Reels / Reactions | later |
| Win8 as January shell | Oct 26 |
| Restore clone forest | lean |
| Second star | SoundCloud only |
| Scaffold 2013+ | not asked |

**Start command (human):** `implement 2012 from scratch` → begin **S0**.
