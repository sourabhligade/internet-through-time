# 2011 from scratch — goals · phases · minute steps

**Date:** 2026-08-15  
**Purpose:** Single **implement-from-this** file to remake museum year **2011 as its own lean year**.  
**Freeze:** [`2011-READ-FIRST.md`](2011-READ-FIRST.md)  
**Harvest:** [`2011-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md`](2011-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md)  
**Parent pattern:** live lean `years/2018/` or current `years/2011/` (already 46 HTML).  
**Legal:** localStorage only. No real Spotify, Netflix CDN, Apple ID, G+ accounts, Snap servers, or payments. Never invent brand pixels. **Git only if asked.**  
**Do not start S0 until the user says `implement 2011 from scratch`.**

---

## 0. How to use

Every phase: **Goal · Why · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

### Hard rules

1. Lean **~48–55 HTML**. Cap **60**. No `cp -R years/2010`. No restore of `/tmp/itt-2011-clone-backup-*`.  
2. Config + content only. No engine fork.  
3. Pages load **only** `js/immersion-2011.js` → `immersion/boot.js`.  
4. Storage **`itt11-*`**. Incomplete never writes. Isolation vs `itt10-*` / `itt12-*`.  
5. One-thing = **Airbnb request**. Not Spotify. Not Siri. Not Timeline.  
6. Guided home `<ol>` stays **6**. Continuity = chips.  
7. Dual-cite scale: Live Stats **346,004,403** (+67%) **and** Pingdom **555M**.  
8. Reverse 2010 bans carefully: Spotify **US exists**; IE **9** is shell; iPad **2**; 4S/Siri.  
9. Keep banned: IG Android · FB owns IG · IPO · UberX · iPhone 5 · Win8 · Stories · Instant Book gold.  
10. Pixel: WA / Newsroom / failed-final. Continuity 2010 logos OK if labeled.  
11. Do not scaffold 2012+ in this pass.  
12. F-2011-D Uber only if named after A–C.

### Locked gold

`sites/airbnb/{index,listing,request}.html` · `itt11-airbnb` · city → listing → request.

---

# Part 1 — Goals

## 1.1 One-line goal

Rebuild a **lean museum-grade 2011**: Win7 + IE 9, **Airbnb request** as the one-thing, residual REAL for **Spotify US · Timeline JSON · Google+ Circles/Hangouts · Siri/iCloud · iPad 2 · Qwikster literacy · Snap seed**, dual-cite scale, hard 2012 wall — **without** a 2010 forest.

## 1.2 Visitor outcome

```
Hub → 2011
  → About: 346,004,403 (June) · 555M (Dec) · 2.1–2.28B users · bans
  → ★ Airbnb search → listing → request → itt11-airbnb → Next Timeline
  → Spotify invite / $4.99 / $9.99 theater
  → Timeline JSON life story
  → Circles → Hangout
  → Ask Siri · iCloud · iPad 2 $499
  → Qwikster two-check stream
  → Snap timer (not Stories)
  → Exit
```

---

# Part 2 — Phases

## S0 — Freeze check (no HTML wipe yet)

**Goal:** Confirm lock before touching the tree.  
**Why:** Current 2011 is already playable lean. Accidental `rm -rf` is the failure mode.  
**Steps:**

1. Read READ-FIRST + this file + harvest §2–3.  
2. `find years/2011 -name '*.html' | wc -l` → expect **46**.  
3. Confirm home has **one** `data-ott-one-thing` and **six** guided `<li>`.  
4. Confirm `ITT.configs["2011"]` urlMap has Airbnb + no Amazon forest.  
5. Write a 5-line plan in the implement log: keep keys, rewrite rooms in place **or** build `years/2011-next/` then swap. Prefer **in-place rewrite**.  
6. **Stop** if HTML would exceed 60.

**Acceptance:** Written plan. No files deleted.

**Anti-patterns:** `cp -R years/2010`. Restoring the 2026-08-10 backup.

---

## S1 — Config + About honesty

**Goal:** Thesis, scale, bans match READ-FIRST.  
**Files:** `js/config/2011.js` · `years/2011/pages/about.html` · `home.html`  
**Steps:**

1. About dual-cite both website series + labeled users.  
2. Thesis sentence: streaming + Timeline + Siri; **Airbnb is the one-thing**.  
3. Bans list: IG Android · FB owns IG · IPO · UberX · iPhone 5 · Win8 · Stories.  
4. Home lede can stay “Streaming lands…” but star + guided #2 stay Airbnb.  
5. `connectMode: "broadband"` stays.

**Tests:** `e2e/2011-flows.spec.js` thesis/about if present · `hub-years` 2011.

---

## S2 — Map gold (F-2011-C)

**Goal:** Flow map names Airbnb as the one-thing.  
**Files:** `js/config/flow-maps.js` `2011`  
**Steps:**

1. Thesis weather: Spotify + Timeline + Siri **and** “Airbnb request is the one-thing.”  
2. Branch `Stay request` · leaves search / listing / request.  
3. Keep Spotify as **P1** leaf. Do not delete.  
4. Absolute hrefs stay year-relative.

**Acceptance:** `pages/map.html` shows Airbnb branch. e2e map if any.

---

## S3 — Airbnb gold ritual

**Goal:** City → listing → request writes `itt11-airbnb`.  
**Files:** `years/2011/sites/airbnb/*.html` · one-thing machine / extras  
**Steps:**

1. Index: city field + search. Empty search writes nothing.  
2. Listing: at least one 2011-honest stay (airbed / spare room / SF or NYC). No Superhost.  
3. Request: host textarea required. **Request to Book**, not Instant Book.  
4. Blob: `{ city, listing, note, multiStep:true, real:true, year:"2011", ts }`.  
5. After save: `data-next-flow` → `../facebook/timeline.html`.  
6. Reload still shows selected listing.

**Tests:** `e2e/one-thing-per-year.spec.js` 2011 · incomplete blocked · complete persist.

**Anti-patterns:** one-click Book. Stripe. Map tiles.

---

## S4 — Pixel retry (failed-final OK)

**Goal:** Honest assets or labeled RECON.  
**Files:** `assets/period/2011/**` · `docs/references/2011/CAPTURE-LOG.md`  
**Steps:** Follow harvest §7 cookbook for Airbnb, Spotify, FB, G+, Apple, Netflix, IE9.  
**Acceptance:** Each H11 row `[wa]` or `[failed-final]`. No invented logos.

---

## S5 — Spotify US residual

**Goal:** Invite + plan theater.  
**Files:** `sites/spotify/{index,about,plans,player}.html`  
**Steps:**

1. Copy Jul 14 plans exactly (invite free · $4.99 Unlimited desktop · $9.99 Premium).  
2. Note: **no Facebook integration at US launch**.  
3. Player: ad theater on free. No audio CDN.  
4. Keys `itt11-spotify-invited` / `itt11-spotify-plan`.

**Tests:** `e2e/2011-flows` / `2011-real-flows` Spotify cases.

---

## S6 — Timeline JSON

**Goal:** Life story persist.  
**Files:** `sites/facebook/timeline.html` (+ feed honesty)  
**Steps:**

1. Two-column Timeline (cover + spine).  
2. Save writes **JSON object**, never `"1"`.  
3. Top Stories / Most Recent literacy (Sep 2011).  
4. Next from Airbnb lands here.

**Ban:** Reactions · Stories · 2012 IPO room as gold.

---

## S7 — Google+ Circles → Hangouts

**Goal:** Field-trial hype, not victory.  
**Files:** `sites/googleplus/{index,about,circles,hangouts}.html`  
**Steps:**

1. About: 28 Jun field trial · Circles · Hangouts · +1.  
2. Circles: make one circle (2+ names).  
3. Hangouts: start only after a circle exists.  
4. Status never says “Facebook is dead.”

---

## S8 — 4S / Siri / iOS 5 / iCloud / iPad 2

**Goal:** Oct 4 stack + Mar iPad 2.  
**Files:** `sites/iphone/*` · `sites/ipad/*`  
**Steps:**

1. Prices $199/$299/$399 · Siri languages · iOS 5 via **iTunes 10.5**.  
2. Jobs dies Oct 5 — culture line, not a joke room.  
3. iPad 2 $499/$599/$699 · Smart Cover $39/$69.  
4. Ban iPhone 5 / Lightning.

---

## S9 — Qwikster + IE9 + Chrome

**Goal:** Netflix farce + shell honesty.  
**Files:** `sites/netflix/*` · `sites/ie9/*` · `sites/chrome/*`  
**Steps:**

1. Pricing room: Jul unbundle.  
2. Qwikster: 18 Sep announce · ~10 Oct reverse. Two literacy boxes (`data-nf-discs` · `data-nf-qwikster`) before stream write.  
3. IE9: 14 Mar HTML5 / pinned sites. Download theater.  
4. Chrome: product room, not default shell.

---

## S10 — Seeds (Snap · IG · Android · DDG · Path · turntable · Twitch)

**Goal:** Year-true leftovers, not stars.  
**Steps:**

1. Snap: Picaboo→Snapchat · timer · **not Stories**.  
2. IG: **iOS-only** banner.  
3. Android: ICS 19 Oct · Galaxy Nexus · Roboto.  
4. Twitch: 6 Jun Justin.tv spin-off · not Amazon.  
5. Path 150 · turntable DJ · DDG !bangs.

**Do not** add Uber unless named (S14).

---

## S11 — Home / playables / game

**Goal:** Visitor start matches lock.  
**Files:** `pages/home.html` · `sites/playable/*` · year game  
**Steps:**

1. Star Airbnb · guided 6 · trail chip · residual pack last.  
2. Playables: Hangout circles · Siri query · Snap timer (`itt11-playable*`).  
3. Game Letter Swap stays original (`itt11-game-letterswap`) — see `GAMES-PER-YEAR/YEAR-2011.md`.

---

## S12 — Next chips + isolation

**Goal:** Handoff after REAL saves.  
**Steps:**

1. Airbnb → Timeline. Timeline → Spotify or Siri. Spotify → player. Qwikster → About.  
2. `data-next-when-key` unhide if key already set.  
3. Grep: no `itt10` / `itt12` writes from 2011 rooms.

---

## S13 — Gates

**Goal:** Remake does not greenwash.  
**Commands:**

```bash
python3 scripts/check-all-years.py
npx playwright test e2e/one-thing-per-year.spec.js --grep "2011" --workers=1
npx playwright test e2e/2011-flows.spec.js e2e/2011-real-flows.spec.js e2e/2011-trail-real-flows.spec.js e2e/2011-mvp.spec.js e2e/mock-to-real.spec.js --grep "2011" --workers=1
npx playwright test e2e/year-signature-flows.spec.js --grep "2011" --workers=1
```

**Acceptance:** `find years/2011 -name '*.html' | wc -l` ≤ 60. Guided ol = 6. One star. check-all-years 2011 pass.

---

## S14 — Optional Uber SF (only if named)

+3 HTML `sites/uber/{index,sf,ride}.html` · `itt11-uber` · pin SF → request → “car is coming” · **no pay · no UberX**. COMPLEX chip, not a star.

---

# Part 3 — Anti-patterns (fail the remake)

| Do not | Why |
|--------|-----|
| Clone 2010 forest | Year is lean on purpose |
| Instant Book as gold | 2011 is request |
| Spotify as second star | Gold is Airbnb |
| Stories on Snap | 2013 |
| IG Android banner as “coming soon download” | Apr 2012 |
| Blend 346M and 555M into one number | Dual-cite rule |
| Invent Spotify/FB/Apple logos | failed-final or WA |
| Scaffold 2012 in this pass | Isolation |

---

**Start command (human):** `implement 2011 from scratch` → begin **S0**.
