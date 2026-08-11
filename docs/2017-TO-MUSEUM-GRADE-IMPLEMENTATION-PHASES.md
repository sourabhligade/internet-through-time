# 2017 → museum-grade A — leftover map

**Date:** 2026-08-11  
**Now:** Museum-ready **A−** · 35 HTML · hub 1994–2017 · `itt17-*`  
**Target:** Lean **museum-grade A** (same bar as 2016 after P2) · still **not** a 400-room forest  
**Facts:** [`2017-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md`](2017-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md)  
**Freeze:** [`2017-READ-FIRST.md`](2017-READ-FIRST.md)  
**Legal:** Config + content only. Incomplete REAL never writes. Never invent brand pixels. Git only if asked. Do **not** scaffold 2018+.

---

## What “A” means here

2017 is **already playable**. A visitor can walk Face ID → Fortnite → 280 → WannaCry → Vine gone. That is A−.

Museum-grade **A** for a lean year (copy 2016 after P2) is:

| Bar | 2017 now | To close |
|-----|----------|----------|
| Research freeze | READ-FIRST | **[x]** |
| New-source harvest | missing | **this pair of docs** |
| P0 + P1 REAL | on disk | **[x]** |
| P2 harvest rooms | 0 | **8 rooms below** |
| Calendar lists P2 | what’s-new is P0/P1 only | add dates |
| Netflix | residual chip | small My List body |
| e2e covers P2 | no | densify-real + flow-map branch |
| Docs honest | NON-DONE still says “2017+ not on disk” | sync |
| L4 official art | correctly absent | **keep absent** — failed-final is the A look |
| HTML budget | 35 | **~48** after P2 (do not pass 60) |

**A is not** “add every 2017 website.” More rooms drown Face ID.

---

## Do not touch

- One-thing = `sites/iphone/x.html` · `itt17-faceid`
- Guided 6 on home
- Storm Circle
- 2016 Stories / 2014 WhatsApp / 2015 Watch
- Restore any HEAD forest
- HomePod **as a shipped product** (announce-only if at all)
- TikTok, GDPR, Meta, Reels, Spectre, Cambridge Analytica

---

## Phase 0 — honesty / docs  `[x]`

**Goal:** Grade card and NON-DONE match disk.

- Point [`2017-MUSEUM-GRADE.md`](2017-MUSEUM-GRADE.md) leftover at this file.
- [`DISK-TRUTH.md`](DISK-TRUTH.md) already has 2017 A− — leave until P2 ships, then bump.
- [`NON-DONE.md`](NON-DONE.md) still says 2017+ not on disk — fix that sentence only.
- Do not claim A until P2 + tests are green.

---

## Phase 1 — P2 rooms (one HTML each)  `[x]`

Copy shape from `years/2017/sites/wannacry/index.html` + a `boot*` in `js/immersion/year-2017-extras.js`.  
Home: new strip **Also in 2017 (P2 harvest)** after P1, before residuals. Guided 6 unchanged.  
`js/config/2017.js` urlMap/titleMap + `flow-maps.js` new branch **P2 harvest (not the one-thing)**.

| # | Room | Path | Do this | Writes | Next-flow |
|---|------|------|---------|--------|-----------|
| 1 | Snap IPO | `sites/snapchat/ipo.html` | $17 priced · $24 open · Class A no vote | `itt17-snap-ipo` | redesign (Nov) |
| 2 | YouTube TV | `sites/youtube/tv.html` | $35 · 5 metros · not Premium 2018 | `itt17-yt-tv` | Netflix residual |
| 3 | Echo Show | `sites/echo/show.html` | May 9 / Jun 28 · $229.99 · screen | `itt17-echo-show` | home |
| 4 | NotPetya | `sites/notpetya/index.html` | Jun 27 · ≠ WannaCry · no payload | `itt17-notpetya` | WannaCry / Equifax |
| 5 | Flash EOL | `sites/flash/eol.html` | Jul 25 announce · dead **2020** | `itt17-flash-eol` | Chrome habit |
| 6 | iOS 11 | `sites/ios11/index.html` | Sep 19 · ARKit · Files · **not Face ID** | `itt17-ios11` | Face ID (still one-thing) |
| 7 | Pixel 2 | `sites/pixel/2.html` | Oct 4 event · Oct 19 US · not Pixel 3 | `itt17-pixel2` | iPhone X |
| 8 | KRACK | `sites/krack/index.html` | Oct 16 · WPA2 literacy · no exploit | `itt17-krack` | WannaCry |

**Watch Series 3** (`sites/apple/watch3.html`) — same day as X. Only if it says **not the one-thing** and next-flow goes to Face ID. Otherwise skip (wrist leftover of 2015).

**Facebook Watch** — optional 9th if Watch vs Live vs Reels is still confusing after 8.

### REAL blob (every save)

```js
{ multiStep: true, real: true, year: "2017", ts: Date.now() }
```

Empty Save writes **nothing**.

### Copy banks (paste)

- Snap: “Priced $17. Opened $24. Class A does not vote.”
- YT TV: “$35. Five cities. This is not YouTube Premium (2018 rename).”
- NotPetya: “June 27. Not Friday’s WannaCry. This room has no attack code.”
- Flash: “Adobe said July 25 the plugin dies at the end of 2020. 2017 still plays it.”
- iOS 11: “ARKit and Files. Face ID is the iPhone X, not this update.”
- Pixel 2: “Made by Google, October. Not the face-password phone.”

---

## Phase 2 — skip unless asked  `[~]`

| Room | Why parked |
|------|------------|
| HomePod | Newsroom said December · **ships Feb 9 2018** |
| Whole Foods | $13.7B / close Aug 28 — capital, not daily web |
| Cloudbleed | Feb 23 — literacy, thin visitor verb |
| Android Oreo | Aug 21 — Pixel 2 already carries Android |
| Vault 7 | CIA dump — not a product theater |
| Meltdown/Spectre | **Jan 3 2018** |
| Netflix My List as one-thing | Wrong gold |

---

## Phase 3 — Netflix densify (small)  `[x]`

`sites/netflix/index.html` is a leftover chip. A-grade = a **My List theater** that:

- adds a title locally (`itt17-nf-mylist`)
- says downloads already existed **2016**
- does **not** become the one-thing
- no official posters

Two checks + save. Next-flow → home / YouTube TV.

---

## Phase 4 — calendar + about  `[x]`

Add to `pages/whats-new.html` and `pages/about.html` only the P2 dates that shipped.  
Do not stuff Whole Foods / HomePod-ship / Spectre.

Suggested inserts:

- Mar 2 Snap IPO  
- Apr 5 YouTube TV  
- Jun 27 NotPetya (same day as FB 2B — two rooms, two verbs)  
- Jul 25 Flash EOL announce  
- Sep 19 iOS 11  
- Oct 4 / 19 Pixel 2  
- Oct 16 KRACK  

---

## Phase 5 — tests  `[x]`

Extend, do not fork the engine:

- `e2e/2017-densify-real.spec.js` — each P2: incomplete never writes · complete writes `itt17-*` JSON
- `e2e/2017-flow-link-verify.spec.js` — new hrefs
- `js/config/flow-maps.js` branch so `2014-2016-flow-map-real` walks the new rooms
- `npm run test:e2e:2017`

---

## Phase 6 — pixels  `[~]` keep failed-final

L4 official Apple/Epic/Nintendo art is **never** the closer. A-grade here is:

- Face ID room: black notch silhouette (already) + Newsroom citation
- Fortnite: no Epic art (already)
- Pixel 2: text + date, no invented Google wordmark
- Honesty strip on each new room

If someone wants “more websites” instead of these 8: **no**. That’s how A− becomes a clone forest.

---

## Fast visitor path after P2

```
home ★ Face ID
  → Fortnite → Storm Circle
  → 280
  → WannaCry → NotPetya (new) → KRACK (new)
  → Vine gone → musical.ly
home P2 strip
  → Snap IPO → redesign
  → YouTube TV → Netflix My List
  → iOS 11 → (next) Face ID still one-thing
  → Pixel 2 → Face ID
  → Flash EOL → Chrome
```

**Fail if:** Face ID is no longer the pink/purple one-thing · HomePod is in stores · Flash is “already dead” · NotPetya = WannaCry · Pixel 2 is the gold machine · YouTube TV is Premium · Snap IPO page has no $17/$24 · incomplete Save writes.

---

## Order of work

0. Docs honesty (Phase 0)  
1. NotPetya + Flash + KRACK (trust spine, pairs with existing WannaCry)  
2. iOS 11 + Pixel 2 (must point back to Face ID)  
3. Snap IPO + YouTube TV + Echo Show  
4. Netflix My List  
5. Calendar + e2e  
6. Bump grade card to **A** only when Phase 1+3+4+5 are green  

**Estimate:** 8 HTML + extras boots + calendar + tests. Same shape as 2016 P2-0–P2-13.
