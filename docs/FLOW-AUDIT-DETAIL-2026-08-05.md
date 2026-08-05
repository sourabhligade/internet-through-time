# Flow audit — detailed check (2026-08-05)

**Purpose:** Document a full pass over visitor flows (guided trails, multi-step REAL storage, gates, flow maps) and the fixes applied when e2e lagged multi-step UI.  
**Canonical bar:** [`MUSEUM-READY-ASSESSMENT-1994-2016.md`](MUSEUM-READY-ASSESSMENT-1994-2016.md) Layer **B** + **E**.  
**Disk health:** `python3 scripts/check-all-years.py` → **23/23 pass** (1994–2016).

---

## 1. Method

| Step | What |
|------|------|
| 1 | Disk matrix — every year home / hub / signature / map |
| 2 | Flow maps config — years 1994–2016 present in `js/config/flow-maps.js` |
| 3 | Automated packs — mvp/flows/real/trail/gates/signature/no-mock/flow-maps |
| 4 | Fix mismatch — e2e expected one-click acks; pages require multi-step REAL |
| 5 | Re-run full flow suite |

### Commands used

```bash
python3 scripts/check-all-years.py

npx playwright test \
  e2e/2013-flows.spec.js e2e/2013-real-flows.spec.js e2e/2013-trail-real-flows.spec.js \
  e2e/2014-flows.spec.js e2e/2014-real-flows.spec.js \
  e2e/2015-flows.spec.js e2e/2015-real-flows.spec.js e2e/2015-densify.spec.js \
  e2e/2016-flows.spec.js e2e/2016-real-flows.spec.js e2e/2016-connection-gates.spec.js \
  e2e/all-years-signature-real.spec.js e2e/no-mock-flows.spec.js \
  e2e/flow-maps.spec.js e2e/year-signature-flows.spec.js \
  --workers=1
```

**Result after fixes:** **232 passed** (≈1.9 min, workers=1).

---

## 2. What “a real flow” means here

| Check | Pass | Fail |
|-------|------|------|
| Multi-step | ≥2 actions or honesty checks | One-click “I saw” |
| Storage | Writes `ittNN-*` with content | Soft status only |
| Empty blocked | Incomplete → no write | Empty form “success” |
| Trail | Home/map link → product → storage | 404 / dead button |
| Isolation | Year prefix only | Cross-year key collision |

Pattern on densified pages:

```
[data-req] × N (min 2)  →  [data-itt-real-save data-storage-key="…"]  →  localStorage ittNN-…
```

Or product-specific multi-step (PoGO, Stories, Heartbleed ≥2 services, WA covers, etc.).

---

## 3. First-pass failures (before fix)

| # | Spec | Failure | Root cause |
|---|------|---------|------------|
| 1 | 2013-flows B thesis | click `data-thesis-ack` no storage | Requires `[data-thesis-req]` ×2 first |
| 2 | 2013-flows F iOS 7 | missing `data-ios7-ack` | UI uses `data-itt-real-save` + `data-req` |
| 3 | 2013-flows G Touch ID / 5s / 5c | old one-click selectors | Multi-step REAL panels only |
| 4 | 2013-flows H Win8.1 | expected `itt13-win81-tour` | Key is **`itt13-win81`** via real-save |
| 5 | 2013-flows K PS4/Xbox | click ack without honesty boxes | Share / DRM / Kinect required |
| 6 | 2013-flows L FB Home | `data-fb-home-install` no gate write | REAL save is separate panel |
| 7 | 2013-flows M Bitcoin | about `data-btc-note` missing | Live room `sites/bitcoin/` multi-step |
| 8 | 2013-flows O iPad Air | missing `data-ipadair-ack` | real-save `ipadair` |
| 9 | 2013-flows R UberX | ride button alone no key | REAL save after literacy checks |
| 10–16 | real + trail mirrors of above | same | same |
| 17 | year-signature Heartbleed | rotate without checks | Needs **≥2** `[data-hb-check]` |

**Interpretation:** Product UIs were **stricter (REAL multi-step)** than e2e. Audit found **test lag**, not dead visitor rooms — then aligned tests.

---

## 4. Late-year flow inventory (detail)

### 2013 — guided multi-step (home)

| Trail | Steps | Storage keys | e2e pack |
|-------|-------|--------------|----------|
| Vine loop | hold → post | `itt13-vine-posts` | flows C · trail short-video |
| IG Video | filter · share | `itt13-ig-video` | flows D · real |
| Snap Stories | add to My Story | `itt13-snap-story` | flows E · real |
| Flat phone | iOS 7 · Touch ID · 5s · 5c | `itt13-ios7` · `touchid` · `iphone5s` · `iphone5c` | flows F–G · trail flat phone |
| Privacy news | Snowden cards · ack | `itt13-snowden-ack` | flows J · trail |
| Public web | HealthCare.gov tries · ack | `itt13-healthcare-ack` | flows N · trail |
| Tablet | iPad Air REAL | `itt13-ipadair` | flows O · trail |
| Desktop | Chrome · Win8.1 | `itt13-chrome` · `itt13-win81` | flows H–I |
| Consoles | PS4 share · Xbox DRM/Kinect | `itt13-ps4` · `itt13-xbox` | flows K |
| Gems | Telegram · Medium · Bitcoin | `itt13-telegram` · `medium` · `btc-room` | musical/home gems · flows M |
| Continuity residual | Spotify · Netflix · Uber | `itt13-spotify*` · `netflix-stream` · `uber` | flows P–R · trail N–R |
| Thesis | About dual scale + checks | `itt13-thesis-ack` | flows B |

**Status after fix:** all 2013 flows / real / trail green.

### 2014

| Signature / trail class | Storage | Notes |
|-------------------------|---------|-------|
| WhatsApp deal / chat | `itt14-*` | P0 pack |
| iPhone 6 / Pay / Watch pre-ship | multi-step | bans mass Watch ship |
| Heartbleed | `itt14-heartbleed` | **≥2 services** then rotate (fixed e2e) |
| Ice Bucket · 1B · Chrome · Win10 TP | real keys | densify gems Secret/Yik/Ello separate |
| Connection gates | incomplete blocked | suite present |

**Status:** flows + real + Heartbleed signature green.

### 2015

| Guided flow (home) | Path | Storage |
|--------------------|------|---------|
| A Wearable | Watch face/band/ship | `itt15-watch*` |
| B Free OS | Win10 honesty → Edge | `itt15-win10` · edge |
| C Live war | Meerkat → war → Periscope → FB Live | shared live keys |
| D Dead app | Peach magic words | `itt15-peach-canvas` |
| E Privacy + photos | iOS 9 blockers · Google Photos | blockers · photos |
| F Under-known | Discover multi-step · Discord multi-step | `itt15-snap-discover` · `itt15-discord` |

**Status:** densify (incl. Discover/Discord gates) + flows + real green.

### 2016

| Guided / P0 | Multi-step | Storage |
|-------------|------------|---------|
| Instagram Stories | text required · 24h | `itt16-ig-stories` |
| Pokémon GO | loc · team · catch · battery | `itt16-pogo` |
| Facebook Reactions | pick of 6 | `itt16-reactions` |
| iPhone 7 jack | 3 literacy checks | `itt16-iphone7` |
| AirPods | Dec 13 ship honesty · pair | `itt16-airpods` |
| Vine goodbye | announce ≠ offline dual check | `itt16-vine` |
| WhatsApp E2E | 4 covers + literacy | `itt16-wa-e2e` |
| Musical.ly | not-TikTok + caption post | `itt16-musical` · `mly-posts` |
| Win10 AU · Chrome · Edge · Rift · LinkedIn | honesty multi-step | respective keys |
| Connection gates | incomplete blocked | suite green |

**Status:** flows · real · connection-gates · signature green.

---

## 5. Cross-year signature + no-mock

| Suite | Role | Result |
|-------|------|--------|
| `year-signature-flows.spec.js` | Per-year signature storage | **pass** (incl. 2014 Heartbleed, 2016 Stories) |
| `all-years-signature-real.spec.js` | Multi-year REAL sample | **pass** |
| `no-mock-flows.spec.js` | Empty/incomplete must not write | **pass** (Vine dual-date etc.) |
| `flow-maps.spec.js` | map.html smoke sample years | **pass** |
| `check-all-years.py` | Disk/hub/home/sig | **23/23 pass** |

---

## 6. Flow maps layer

| Item | Status |
|------|--------|
| Config years | **1994–2016** in `js/config/flow-maps.js` |
| Visitor page | `years/YYYY/pages/map.html` |
| Renderer | `js/immersion/flow-map.js` |
| Docs | [`FLOW-MAPS.md`](FLOW-MAPS.md) |

Maps are navigation literacy (trails + “what it does”); product REAL truth lives in room multi-step + storage.

---

## 7. Fixes applied this pass

| File | Change |
|------|--------|
| `e2e/2013-flows.spec.js` | Thesis/iOS7/5c/Win81/PS4/Xbox/FB Home/Bitcoin/iPad Air/Uber → multi-step REAL |
| `e2e/2013-real-flows.spec.js` | Same pattern for 5c · FB Home · iPad Air · Uber |
| `e2e/2013-trail-real-flows.spec.js` | iOS7 · Touch ID · thesis · iPad Air · Uber multi-step |
| `e2e/year-signature-flows.spec.js` | Heartbleed check ≥2 services before rotate |

No product wipe — **e2e brought up to densified UI**.

---

## 8. Residual risks (optional follow-up)

| Risk | Severity | Notes |
|------|----------|-------|
| Early years (1994–2002) thinner named trail packs | Low | Other deep suites exist; optional trail expand |
| One-click decorative buttons next to REAL panels | Low | e.g. FB Home “Install” theater vs Save REAL — prefer REAL for done state |
| Continuity residual (Spotify/Netflix/Uber in late years) | P2 | Year-voice vs archive badge |
| Perfect brand pixels | L4 | CAPTURE failed-final forever OK |

---

## 9. How to re-check one year in detail (playbook)

```bash
# 1) Disk
python3 scripts/check-all-years.py | grep YYYY

# 2) Year pack
npm run test:e2e:YYYY   # when defined

# 3) Manual
# open /years/YYYY/pages/home.html
# for each guided trail: complete multi-step · confirm localStorage ittNN-*
# open map.html · click 3 leaves · no 404
# try empty submit · expect error, no key

# 4) No-mock / signature
npx playwright test e2e/no-mock-flows.spec.js e2e/year-signature-flows.spec.js -g "YYYY" --workers=1
```

### Multi-step REAL helper (manual or future e2e)

1. Check all `[data-req]` (or product-specific honesty boxes).  
2. Click `[data-itt-real-save]` or product save.  
3. Assert `localStorage['itt' + YY + '-' + key]`.

---

## 10. Summary scorecard (this audit)

| Band | Flow health |
|------|-------------|
| Disk 1994–2016 | **23/23** |
| Late packs 2013–2016 after fix | **green** |
| Signature + no-mock + flow-maps | **green** |
| First-pass 2013/2014 lag | **fixed** (17 failures → 0) |
| Full re-run suite | **232 passed** |

**Bottom line:** Flows are **museum-ready multi-step REAL** on late years; the audit’s main finding was **stale one-click e2e**. After alignment, automated proof matches the densified visitor experience.

---

*End of flow audit 2026-08-05.*
