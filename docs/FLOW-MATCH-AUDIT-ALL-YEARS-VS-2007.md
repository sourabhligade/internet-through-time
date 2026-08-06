# Flow match audit — every year vs 2007 standard

**Date:** 2026-08-06  
**Purpose:** Recheck **each year 1994–2013** every flow surface against what **2007 is** (the gold pack): full e2e shape, REAL `ittYY-*` storage, trails, isolation, docs.  
**Method:** Disk inventory · e2e specs · immersion configs · museum-grade MD headers · goals/flow MD presence · shared gates.  
**Not:** Re-running every year pack in this write (2007 alone = 79 green). Use tables below for implement priority.

---

## 0. What “2007 should be” means (gold bar)

| Dimension | 2007 truth (rechecked) |
|-----------|------------------------|
| **Pack shape** | `mvp` · `flows` · `real-flows` · `densify` · `trail-real-flows` (**5/5**) |
| **Flow matrix** | Explicit **Flows A–T** with REAL storage where product action exists |
| **Trails** | Home connection trails + `trail-real-flows` multi-step → `itt07-*` |
| **Isolation** | Writes `itt07-*` only; asserts sibling year keys null |
| **No mock** | Empty form blocked; multi-check literacy; content in localStorage |
| **Wayfinding** | Starting Point · flow map · playables · bans · scale |
| **Docs** | RESEARCH · MUSEUM-GRADE · GOALS/FLOWS clear · implement bible · CAPTURE |
| **e2e volume** | ~80 year-named tests · 50+ `localStorage.getItem` asserts |
| **Ship** | Museum-ready · ~99% content · L4 pixels only residual |

**2007 recheck (this session):** disk hooks OK · **79/79** e2e green · A–T + trails + perfect extras all **Implemented**.

---

## 1. Pack shape matrix (must match 2007)

Legend: **M** mvp · **F** flows · **R** real-flows · **D** densify · **T** trail

| Year | Pack | e2e tests | LS asserts | Named keys in e2e | Map | Playable | Signature e2e | Match 2007 pack? |
|-----:|:----:|----------:|-----------:|------------------:|:---:|:--------:|:-------------:|:----------------:|
| 1994 | .F... | 42 | 11 | 10 | Y | Y | Y | **No** (1/5) |
| 1995 | .F... | 24 | 22 | 8 | Y | Y | Y | **No** (1/5) |
| 1996 | .F... | 25 | 13 | 7 | Y | Y | Y | **No** (1/5) |
| 1997 | .F... | 33 | 15 | 12 | Y | Y | Y | **No** (1/5) |
| 1998 | .FR.. | 83 | 15 | 30 | Y | Y | Y | **No** (2/5) |
| 1999 | .F... | 33 | ~0–2 | ~2 | Y | Y | Y | **No** (1/5) · **weak REAL** |
| 2000 | MFRDT | 33 | 4 | 8 | Y | Y | Y | **Yes shape** · thin REAL depth |
| 2001 | MFRDT | 40 | 2 | 12 | Y | Y | Y | **Yes shape** · thin REAL depth |
| 2002 | MFRDT | 54 | 1 | 7 | Y | Y | Y | **Yes shape** · thin REAL depth |
| 2003 | MFRDT | 41 | 2 | 14 | Y | Y | Y | **Yes shape** · thin REAL depth |
| 2004 | MFRDT | 71 | 41 | 37 | Y | Y | Y | **Yes** deep REAL |
| 2005 | MFRDT | 122 | 96 | 40 | Y | Y | Y | **Yes** deepest volume |
| 2006 | MFRDT | 56 | 22 | 14 | Y | Y | Y | **Yes** |
| **2007** | **MFRDT** | **80** | **54** | **30** | **Y** | **Y** | **Y** | **Gold** |
| 2008 | MFRDT | 81 | 38 | 21 | Y | Y | Y | **Yes** · A–T letters |
| 2009 | MFRDT | 67 | 20 | 18 | Y | Y | Y | **Yes shape** |
| 2010 | MFRDT | 86 | 24 | 40 | Y | Y | Y | **Yes** lettered subflows |
| 2011 | MFRDT | 57 | 12 | 27 | Y | Y | Y | **Yes shape** |
| 2012 | MFRDT | 79 | 20 | 28 | Y | Y | Y | **Yes shape** |
| 2013 | MFRDT | 84 | 32 | 44 | Y | Y | Y | **Yes** multi-step REAL |

**Pack parity with 2007:**  
- **Full 5/5 pack:** 2000–2013 (**14 years**)  
- **Missing named mvp/real/densify/trail:** 1994–1999 (**6 years**) — compensated partly by deep specialized specs (cart, ebay, buttons, culture)

---

## 2. Flow matrix style vs 2007 A–T

| Year | Flow structure | Closest to 2007 A–T? |
|------|----------------|----------------------|
| 1994 | Named product flows (FishCam, Yahoo, guestbook…) | Product matrix, not A–T |
| 1995 | Commerce-heavy REAL (`itt95-amazon-cart`, bid, homestead) | Strong REAL · no A–T letters |
| 1996 | HoTMaiL · Space Jam · Yahoo/Amazon | Strong product · no A–T |
| 1997 | eBay · Amazon · ICQ · Slashdot | Strong product · no A–T |
| 1998 | “hard flows” aggregate + many specialized specs | High test count · no A–T |
| 1999 | hard flows · **few localStorage asserts** | **Gap:** weak REAL gate density |
| 2000–2005 | hard flows / densify packs | Pack shape OK; A–T labeling only on 2007+ style |
| 2006 | sectioned flows (enter · thesis · Twitter…) | Mid-style |
| **2007** | **Flows A–T explicit** | **Reference** |
| 2008 | Flows A–T explicit | Match |
| 2009–2012 | lettered or dense real packs | Match spirit |
| 2013 | multi-step REAL storage matrix | Match / exceeds multipage gates |

---

## 3. Year-by-year flow status (read from code + MD)

### 1994 — Museum-ready · pack **not** 2007-shaped

| Surface | Status |
|---------|--------|
| Flows | FishCam · CSotD · Yahoo · Lycos · guestbooks · IUMA · WH imagemap · shell · counter |
| REAL keys | Present in e2e (guestbook/search class) · prefix **`itt` / itt94** |
| Pack gap | No mvp / real-flows / densify / trail **named** files |
| Docs | MUSEUM-GRADE · TO-100 · RESEARCH · no separate GOALS-FLOWS clear like 2007 |
| Match 2007 | **~55%** structure · **playable museum** but suite not late-ideal |

### 1995 — Museum-ready · strong commerce REAL

| Surface | Status |
|---------|--------|
| Flows | Amazon cart/checkout · AuctionWeb bid · GeoCities homestead/webring/guestbook · AltaVista · Yahoo · e2e path |
| REAL | **`itt95-amazon-cart`** · orders · mail · homestead · bids — **strong** |
| Pack gap | 1/5 named late pack |
| Match 2007 | **~50–60%** pack · **REAL quality good** for era |

### 1996 — Museum-ready

| Surface | Status |
|---------|--------|
| Flows | HoTMaiL login · Space Jam · Yahoo/Amazon · buttons suites |
| REAL | Hotmail/session class keys |
| Pack gap | 1/5 |
| Match 2007 | **~50%** pack |

### 1997 — Museum-ready · ICQ REAL densify

| Surface | Status |
|---------|--------|
| Flows | eBay bid · Amazon · Slashdot · PointCast · **ICQ multipage REAL** · Yahoo/HotBot |
| REAL | `itt97-*` cart/orders · ICQ · isolation cases |
| Pack gap | 1/5 |
| Extra | `1997-icq-real.spec.js` elevates above bare flows |
| Match 2007 | **~55–65%** pack · ICQ is 2007-grade REAL |

### 1998 — Museum densify closed · high volume

| Surface | Status |
|---------|--------|
| Flows | hard flows + google · excite · amazon music · yahoo · buttons · many specialized |
| REAL | real-flows present · isolation patterns |
| Pack | **2/5** (F+R) · no mvp/densify/trail names |
| Match 2007 | **~65%** · lots of tests, not A–T labeled |

### 1999 — Museum densify closed · **REAL thin in e2e**

| Surface | Status |
|---------|--------|
| Flows | hard flows · napster/blogger · portals · culture |
| REAL gap | **Very few localStorage asserts** in year e2e vs 2007 |
| Pack | 1/5 |
| Match 2007 | **~45%** — **priority gap** if enforcing 2007 REAL bar globally |

### 2000 — Museum-ready · pack complete · REAL shallow

| Surface | Status |
|---------|--------|
| Pack | **5/5** |
| REAL | Some isolation · fewer LS asserts than 2007 |
| Docs | MOCK-TO-REAL flows MD exists |
| Match 2007 | **~85–90%** shape · deepen REAL optional |

### 2001–2003 — Museum-ready · pack complete · REAL shallow

| Year | Pack | Notes | Match |
|------|:----:|-------|------:|
| 2001 | 5/5 | Wiki/iPod era · low LS assert count in specs | ~85–90% |
| 2002 | 5/5 | Friendster/KaZaA · densify+trail files exist | ~85–90% |
| 2003 | 5/5 | MySpace · iTunes · WP · LinkedIn REAL in flows | ~90% |

### 2004 — Museum-ready · deep REAL

| Surface | Status |
|---------|--------|
| Pack | 5/5 · high LS asserts (41) · many keys |
| Match 2007 | **~95–100%** flow rigor |

### 2005 — Museum-ready · **highest e2e volume**

| Surface | Status |
|---------|--------|
| Pack | 5/5 · **122 tests** · **96 LS asserts** · mega/no-mock suites |
| Docs | Master bible · goals · phases · implement step-by-step |
| Match 2007 | **≥100% volume** · A–T labeling differs · **REAL gold-class** |

### 2006 — Museum-ready

| Surface | Status |
|---------|--------|
| Pack | 5/5 · Twitter/Digg signatures · isolation vs itt05 |
| Match 2007 | **~95%** |

### 2007 — Gold (this implement)

| Surface | Status |
|---------|--------|
| A–T + trails + perfect extras | **All implemented · 79 green** |
| Docs | Full implement bible + perfect map |
| Match | **100% definition of bar** |

### 2008 — Museum-ready · A–T style

| Surface | Status |
|---------|--------|
| Pack | 5/5 · A–T letters · App Store/Chrome REAL |
| Docs | Master bible · goals clear · connections |
| Match 2007 | **~100% structure** (different P0 products) |

### 2009–2012 — Museum-ready · full pack

| Year | Pack | REAL depth | Match |
|------|:----:|------------|------:|
| 2009 | 5/5 | Good keys · FarmVille/Like/Bing era | ~95% |
| 2010 | 5/5 | Lettered A–M+ · many keys · culture densify | ~98% |
| 2011 | 5/5 | Spotify/Timeline/G+ · fewer LS asserts | ~92% |
| 2012 | 5/5 | IG Android · IPO · solid | ~95% |

### 2013 — Museum-ready · multi-step REAL

| Surface | Status |
|---------|--------|
| Pack | 5/5 + shell-honesty · whatsapp-real |
| REAL | Vine · Stories · iOS7 · multi-check gates · dense keys |
| Match 2007 | **≥100% multipage REAL** (later-year style) |

---

## 4. Shared cross-year gates (all years)

| Spec | Role | Coverage |
|------|------|----------|
| `year-core-flows.spec.js` | Shell enter every year | 1994–2013 |
| `year-signature-flows.spec.js` | Signature REAL/load per year | 1994–2013 |
| `year-handoff-flows.spec.js` | N→N+1 isolation | 1994→2013 chain |
| `all-years-signature-real.spec.js` | REAL signature matrix | multi-year |
| `no-mock-flows.spec.js` | Anti-mock gate | selected |
| `hub-years.spec.js` | Hub unlock cards | all open years |
| `all-years-playable.spec.js` | Playables | all |
| `flow-maps.spec.js` | Map pages | sample years |

These **partially** backfill early years missing mvp/trail files — but do **not** equal a full 2007 A–T densify pack.

---

## 5. Scorecard vs 2007 gold (summary %)

| Band | Years | Approx match to 2007 flow bar |
|------|-------|-------------------------------|
| **Gold (≥98%)** | 2005, **2007**, 2008, 2010, 2013 | Full pack + deep REAL |
| **Strong (90–97%)** | 2004, 2006, 2009, 2011, 2012 | Full pack · REAL good |
| **Shape only (85–90%)** | 2000–2003 | MFRDT files · shallow LS asserts |
| **Era-ok / suite-thin (45–65%)** | 1994–1998 | Museum-ready content · **not** late pack shape |
| **Weak REAL gates (~45%)** | **1999** | Pack thin · e2e under-asserts storage |

**Museum-ready (A–F ship):** all **20/20** claim ready.  
**Flow-pack parity with 2007:** **14/20** have MFRDT; **6/20** early years do not.  
**A–T labeled matrix like 2007:** mainly **2007–2008** (+ lettered late years).

---

## 6. Gaps to close if “every year must match 2007”

Priority order (ROI for global parity):

| Pri | Year(s) | Work to match 2007 |
|----:|---------|-------------------|
| **P0** | **1999** | Add REAL localStorage asserts to flows · real-flows.spec · densify/trail optional |
| **P1** | **1994–1998** | Add named `mvp` · `real-flows` · `densify` · `trail` **or** document “era suite equivalent” + map each product flow → storage key table |
| **P1** | **2000–2003** | Thicken LS asserts / isolation like 2007 Flow T |
| **P2** | **2009, 2011** | Optional deepen LS assert density |
| **P3** | **2004–2008, 2010, 2012–13** | Maintain only · already at/above bar |
| **L4** | All | Perfect WA pixels never required |

### Minimum “2007-equivalent” checklist per year

1. [ ] Year prefix `ittYY` (or documented `itt` for 1994)  
2. [ ] ≥1 signature multi-step REAL with content key  
3. [ ] Isolation assert vs neighbor year  
4. [ ] Home trails or explicit flow map  
5. [ ] e2e: either **MFRDT pack** **or** published equivalent map  
6. [ ] No soft mock on P0  
7. [ ] Museum-grade MD residual honest  

---

## 7. 2007 flow list (reference — all green)

| ID | Flow | Key(s) | Status |
|----|------|--------|--------|
| A | Enter year | shell | OK |
| B | Thesis | scale/bans | OK |
| C | iPhone | `itt07-iphone-history` | OK |
| D | Gmail open | `itt07-gmail*` | OK |
| E | Street View | `itt07-streetview` | OK |
| F | FB Platform | `itt07-fb-apps` | OK |
| G | Twitter | `itt07-tweets` | OK |
| H | YouTube | `itt07-yt-uploads` | OK |
| I | Digg | `itt07-digg-links` | OK |
| J | MySpace | `itt07-myspace-profile` | OK |
| K | Docs/AWS/Reader/Flickr | four keys | OK |
| L | Maps search | `itt07-maps-state` | OK |
| M | Google search | navigation | OK |
| N | Vista | literacy | OK |
| O | Android OHA | bans | OK |
| P | Netflix queue | `itt07-netflix-queue` | OK |
| Q | Amazon cart | `itt07-amazon-cart` | OK |
| R | Wikipedia | load | OK |
| S | Beacon | about + REAL page | OK |
| T | Isolation | no itt06 | OK |
| Trails A–E | multi-product | multi keys | OK |
| Extras | Beacon/Specs/FF/OS/Tumblr/Kindle/WN | multi-check REAL | OK |

---

## 8. Docs depth vs 2007

| Year band | Typical MD stack | vs 2007 |
|-----------|------------------|---------|
| 1994–1999 | RESEARCH · MUSEUM-GRADE · TO-100 · authenticity | Thinner GOALS-FLOWS clear |
| 2000–2004 | RESEARCH · MUSEUM · phases · some MOCK-TO-REAL | Medium |
| 2005–2008 | Master bible · goals clear · connections · implement | **Near 2007** |
| 2009–2013 | Master bible · goals clear · deep harvest · READ FIRST | **Near 2007** |
| **2007** | + implement bible + perfect map + artifacts | **Deepest residual implement doc** |

---

## 9. Bottom line

1. **2007 is fully implemented and rechecked** (A–T, trails, extras, 79 e2e).  
2. **2000–2013 match 2007 pack shape** (MFRDT); **2004–2013 match REAL depth** closely.  
3. **1994–1999 are museum-ready as content** but **do not match 2007’s suite shape**; **1999** is weakest on REAL storage e2e.  
4. Shared signature/core/handoff gates cover all years for **smoke**, not full A–T parity.  
5. To make “every year = 2007,” prioritize **1999 REAL e2e**, then **early-year pack naming or documented equivalence**, then **thicken 2000–2003 storage asserts**.

---

*Audit generated from disk + e2e + MD inventory 2026-08-06. Prefer re-run `npm run test:e2e:YYYY` before claiming a year pack green after edits.*
