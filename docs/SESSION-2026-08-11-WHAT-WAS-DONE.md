# Session report — what was done (2026-08-11)

**Date:** 2026-08-11  
**Repo:** Internet Through Time (static museum · `years/YYYY` · prefix `ittYY`)  
**Branch context:** `museum/1994-2008-mvp-and-ci-fixes` (plus later years already on disk)  
**Git:** not committed this session unless you asked later.

This file is the whole-session dump. **Year-by-year from 2010** (what you asked for): [`SESSION-2010-2019-BY-YEAR.md`](SESSION-2010-2019-BY-YEAR.md).  
For 2016 facts use [`2016-READ-FIRST.md`](2016-READ-FIRST.md). For leftover phases use [`LEFTOVER-FLOWS-IMPLEMENTATION-PHASES-2000-2018.md`](LEFTOVER-FLOWS-IMPLEMENTATION-PHASES-2000-2018.md).

---

## 0. One-screen summary

| Area | Result |
|------|--------|
| Year extras SRP | Shared kit `ITT.YearExtras.forYear` · sequential load so extras do not abort |
| Flow breakers | CNN Like, UberX, Vine hold, 2017 location, 2013 forest tests, Gym Rush aliases |
| Real-not-mock | Multi-step / required field before write · year prefix isolation |
| OSS visitor thread | SourceForge 1999 REAL + chips + `oss-visitor-gate.mjs` |
| 2016 research | Detail freeze · scale re-verified · leftover rooms mapped **not built** |
| 2016 grade | **A− → A** by turning Stories into a 3-page machine |
| 2016 guided trails | All **six** home flows are product machines |
| 2000–2018 links | **0 broken** hrefs (38k+) |
| Leftover quality queue | P1–P9 shipped (Timeline, Slack, Airbnb, Imgur→Reddit, SO, SoundCloud, Discord, Stumble, Photobucket) |
| Tests this session | **499 passed** on touched-year e2e · static check 73/74 (pre-existing `museum-voice`) |

**Hard rules kept:** incomplete never writes · no invented brand pixels · lean 2016 (no 2015 clone forest) · Stories stays 2016 one-thing · WhatsApp stays 2014 one-thing · git only if asked.

---

## 1. How the session unfolded

Visitor asks, in order:

1. Improve each-year SRP  
2. How to integrate COMPLEX flows  
3. Test all flows, find breakers, fix them  
4. Real not mock  
5. Explain simply  
6. Audit before/after  
7. What’s left  
8. Map leftover  
9. “I want some OSS in this”  
10. Start 2016 research in detail → **cont**  
11. Is 2016 museum grade?  
12. Map leftover 2016 rooms  
13. Map what’s left and work on it (promote to A)  
14. Implement each 2016 flow in detail  
15. Scan every flow/link 2000–2018  
16. Write clear phases and implement  
17. Run tests  
18. LGTM  
19. **This file** — detailed session doc  

---

## 2. Engine / SRP (carried from the first half)

**Problem:** every year extras file copied `prefix` / `key` / `saveJSON` / `bootChecks`. Kit load raced: extras aborted if `ITT.YearExtras` was missing.

**Shipped**

| File | What |
|------|------|
| `js/immersion/year-extras-kit.js` | `ITT.YearExtras.forYear(year)` — prefix, key, feedback, save/load JSON, markUsed, showNext, checked, val, `bootChecks` |
| `js/immersion/boot.js` | Peel KIT first · load kit **then** `loadAll` · media-1994 hints · cnn→facebook.js · wave · sourceforge |
| `js/immersion/registry.js` | Kit after real-flow, all years · 2019 list · sourceforge on 1999 |
| Year extras 2007, 2010, 2013–2019 | Bind `YX` · 2017/2018 dropped local `bootTwo` |

**COMPLEX (explained, not rebuilt as a 20-year program):** gold = product machine (≥3 pages, reload persist, typed blob), not a checkbox plaque.

---

## 3. Flow breakers that were fixed

| Breaker | Cause | Fix |
|---------|--------|-----|
| CNN Like | `facebook.js` deferred | Hint + wait for boot |
| UberX | Test skipped honesty box | Check first |
| 2017 location | Regex vs `iphone/x.html` | Regex `/iphone\/x\|face.?id/` |
| Vine hold | `pointerleave` zero-time | Ready only if secs ≥ 0.3 |
| Residual 2013 amazon/yahoo | Lean year stripped forest | Tests use 2008/2010 rooms + 2013 home chip |
| Games 2017/2018 | Called `__ittGymRushEnd` after rename | Aliases on stormcircle / consentdash / continuerow |

Playwright `ERR_EMPTY_RESPONSE` once: leftover Python `:8080` from a killed run. Port cleaned.

---

## 4. Real-not-mock pass

Rule: no write on bare click. Need a required field or checks. Reload must show state. Year prefix isolation (`itt16` must not touch `itt15`).

Examples from this session family:

- Wave invite requires `data-wave-io` + `data-wave-not-email`  
- SourceForge catalog click **no write**; download requires `data-sf-not-github` → `itt99-sourceforge`  
- 2010 Wave funeral writes `itt10-wave-funeral`, not the invite key  
- 2011 IE9 download is JSON, not `"1"`  
- **2011 Timeline** later in this session: same rule (see §8)

---

## 5. OSS visitor thread

Visitor-facing open source, not a new year.

| Stop | Year | What |
|------|-----:|------|
| SourceForge | 1999 | Catalog → project Download after honesty · `itt99-sourceforge` |
| Firefox 1.0 | 2004 | Trail chip on existing room |
| GitHub | 2008 | Trail chip on existing machine |
| Swift | 2015 | Trail chip on existing literacy |

**Tests / gate:** `e2e/oss-trail-real.spec.js` (4) · `npm run test:oss:gate` · `scripts/oss-visitor-gate.mjs` (hub + every year + REAL samples).

---

## 6. 2016 research (detail freeze)

**Not a rebuild.** 2016 was already lean museum-ready A− (~52 HTML). This pass inventoried disk, re-opened Live Stats, locked the spine, and named leftover rooms **without scaffolding them**.

**Docs written / updated**

| Doc | Role |
|-----|------|
| [`2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md`](2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md) | ★ Freeze: inventory · live scale · leftover kits · do-not-rebuild |
| [`2016-LEFTOVER-IMPLEMENTATION-PHASES.md`](2016-LEFTOVER-IMPLEMENTATION-PHASES.md) | Optional rooms L0–L6 (Workplace, iOS 10, Nougat, Note 7, Mario Run) — **not executed** |
| [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | Hub honesty 1994–2019 · pointer to freeze |
| [`2016-MUSEUM-GRADE.md`](2016-MUSEUM-GRADE.md) | Grade card |
| [`references/2016/CAPTURE-LOG.md`](references/2016/CAPTURE-LOG.md) | H16-45…53 |
| [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md) | 2016 dual-cite re-verified |

**Scale (live 2026-08-11, unchanged)**

- Websites June: **1,045,534,808 (+21%)** · users cell **blank**  
- Users table: **3,424,971,237 (46.1%)** · +7.5% vs 2015  
- 1B hostnames restabilized **March 2016** · ~170M active all year (do not blend)

**Optional rooms still not on disk (by design):** Workplace · iOS 10 · Nougat · Note 7 · Mario Run. PSVR/Daydream = copy chips only.

---

## 7. 2016: A− → A (Stories machine)

**Why not A before:** Stories was the right one-thing but one phone-frame page with checks. A requires a **product** (several pages, reload persist), leftover only L4 pixels.

**Shipped**

| Page | Job | Key |
|------|-----|-----|
| `years/2016/sites/instagram/index.html` | Feed · empty/filled ring · tray from list | reads `itt16-ig-stories-list` |
| `years/2016/sites/instagram/stories.html` | Add caption + 24h + not Reels | `itt16-ig-stories` |
| `years/2016/sites/instagram/watch.html` **new** | Watch last story · 24h disappear | `itt16-ig-stories-watch` (needs a story) |
| `snapchat/story.html` | Coda | Echoes caption if you added one |

★ chip still points at **stories.html** (e2e). Guided trail names feed → add → watch.

**Doc:** [`2016-TO-A-LEFTOVER-MAP.md`](2016-TO-A-LEFTOVER-MAP.md)  
**Grade now:** museum-grade **A** · 58 HTML · lean.

---

## 8. 2016: all six guided flows as machines

**Doc:** [`2016-FLOWS-DETAIL-IMPLEMENT.md`](2016-FLOWS-DETAIL-IMPLEMENT.md)

| # | Trail | Pages | New / deepened | Keys |
|---|-------|-------|----------------|------|
| 1 | Add to Story | feed → add → watch → Snap | watch.html | `itt16-ig-stories` · list · watch |
| 2 | Go outside | literacy → **map** → Gym Rush | `pogo/map.html` | `itt16-pogo` · `itt16-pogo-stop` |
| 3 | Feel the post | feed → **hike post** → pick six | `facebook/post.html` | `itt16-reactions` echoes on feed/post |
| 4 | Lock the chat | Web residual → E2E → **send** | `whatsapp/chat.html` | `itt16-wa-e2e` · `itt16-wa-chat` |
| 5 | No jack | iPhone 7 → **$9 dongle** → AirPods | `iphone/dongle.html` | `itt16-iphone7` · `itt16-dongle` · `itt16-airpods` |
| 6 | Vine is dying | still looping → **post 6s** → Oct 27 | `vine/loop.html` | `itt16-vine-clip` · goodbye **disables** new loops |

Home guided `<ol>` stayed **exactly 6**. Later pages require the earlier key. Incomplete never writes.

**Extras:** `bootStoriesTray` · `bootStoriesWatch` · `bootPogoMap` · `bootReactionsEcho` · `bootWaChat` · `bootDongle` · `bootVineClip`.

---

## 9. Scan: every flow and link 2000–2018

**Doc:** [`FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md`](FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md)

| Check | Result |
|-------|--------|
| `scripts/audit-internal-links.py` | 38,044+ checked · **0 broken** |
| Flow-map targets 2000–2018 | **0 missing files** |
| Home guided hrefs | **0 broken** |

Leftover was **quality**, not 404s: one-clicks, plaques, unwired dual-rooms. Lean 2011–2013 is intentional (do not restore the forest).

---

## 10. Leftover queue — phases written and implemented

**Doc:** [`LEFTOVER-FLOWS-IMPLEMENTATION-PHASES-2000-2018.md`](LEFTOVER-FLOWS-IMPLEMENTATION-PHASES-2000-2018.md)

| Phase | Year | What shipped |
|------:|-----:|----------------|
| **P1** | 2011 | Timeline: F8 + not-Stories checks · JSON `{real, multiStep, year:"2011"}` · **not** `"1"` · e2e updated |
| **P2** | 2014 | Slack `index` + `channel.html` + `about.html` · `#general` msgs `itt14-slack-msgs` · WhatsApp remains one-thing |
| **P3** | 2011 | Airbnb pick writes immediately · listing + request recap · confirm still no pay |
| **P4** | 2010 | Reddit submit prefills last Imgur album URL (query **or** `itt10-imgur-album`) |
| **P5** | 2009 | SO accept already existed · also writes `itt09-so-accepted` |
| **P6** | 2012 | SoundCloud **track.html** got play + timed comment (same as index) |
| **P7** | 2015 | Discord `channel.html` · empty send blocked · `itt15-discord-msgs` |
| **P8** | 2002 | Stumble thumb **up** + thumb **down** |
| **P9** | 2003 | Photobucket → MySpace Apply hotlink **already on disk** — left it |
| **P10** | — | Targeted e2e **118 then 499** green |

**Skipped:** 2017 Face ID / Fortnite plaques (optional A, not this queue).  
**Not built:** 2016 leftover rooms (Workplace, iOS 10, Nougat, Note 7, Mario Run).

---

## 11. Tests run at the end of the session

```
npm run check
# smoke + links OK · authenticity 73 passed / 1 failed (museum-voice, pre-existing)

npx playwright test \
  e2e/2002-stumble-real.spec.js \
  e2e/2009-mvp.spec.js e2e/2009-real-flows.spec.js e2e/2009-so-accept.spec.js \
  e2e/2010-imgur-real.spec.js \
  e2e/2011-mvp.spec.js e2e/2011-real-flows.spec.js e2e/2011-densify.spec.js \
  e2e/2011-flows.spec.js e2e/2011-trail-real-flows.spec.js e2e/2011-airbnb-listing.spec.js \
  e2e/2012-soundcloud-scrub.spec.js \
  e2e/2014-mvp.spec.js e2e/2014-real-flows.spec.js e2e/2014-flow-link-verify.spec.js \
  e2e/2015-mvp.spec.js e2e/2015-real-flows.spec.js e2e/2015-flow-link-verify.spec.js \
  e2e/2016-mvp.spec.js e2e/2016-real-flows.spec.js e2e/2016-trail-real-flows.spec.js \
  e2e/2016-flow-link-verify.spec.js \
  --workers=1
# 499 passed (1.8 min)
```

Full `npm test` (entire Playwright tree) was **not** run.

---

## 12. Files that matter (this session)

### New docs
- `docs/2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md`
- `docs/2016-LEFTOVER-IMPLEMENTATION-PHASES.md`
- `docs/2016-TO-A-LEFTOVER-MAP.md`
- `docs/2016-FLOWS-DETAIL-IMPLEMENT.md`
- `docs/FLOWS-LINKS-AUDIT-2000-2018-2026-08-11.md`
- `docs/LEFTOVER-FLOWS-IMPLEMENTATION-PHASES-2000-2018.md`
- `docs/SESSION-2026-08-11-WHAT-WAS-DONE.md` (this file)

### New 2016 rooms
- `years/2016/sites/instagram/watch.html`
- `years/2016/sites/pogo/map.html`
- `years/2016/sites/facebook/post.html`
- `years/2016/sites/whatsapp/chat.html`
- `years/2016/sites/iphone/dongle.html`
- `years/2016/sites/vine/loop.html`

### New leftover-queue rooms
- `years/2014/sites/slack/channel.html` · `about.html`
- `years/2015/sites/discord/channel.html`

### Core code
- `js/immersion/year-extras-kit.js` · `boot.js` · `registry.js`
- `js/immersion/year-2016-extras.js` (Stories/PoGO/WA/dongle/Vine machines)
- `js/immersion/year-2014-extras.js` (`bootSlackChannel`)
- `js/immersion/year-2015-extras.js` (`bootDiscordChannel`)
- `js/immersion/facebook.js` (Timeline JSON)
- `js/immersion/one-thing-machines.js` (Airbnb pick, SO accepted, Stumble thumbs)
- `js/immersion/reddit.js` (Imgur album prefill)
- `js/immersion/sourceforge.js` + 1999 SourceForge rooms (OSS half)

### Config / e2e
- `js/config/2011.js` (unchanged keys; Timeline e2e updated)
- `js/config/2014.js` · `2015.js` · `2016.js` · `flow-maps.js`
- e2e: 2011 mvp/flows/trail · 2014-real Slack · 2015-real Discord · 2016-real/trail/flow-link · 2009-so-accept

---

## 13. What is still not done (honest leftover)

| Item | Why it waits |
|------|----------------|
| 2016 L0–L5 rooms | Optional densify · does not change Stories / grade |
| 2017 Face ID or Fortnite as a machine | Year is A− plaques · only if you want 2017 = A |
| `museum-voice` static fail | 14 pages still say “this exhibit” — pre-existing authenticity lint |
| Full `npm test` | Entire Playwright tree not re-run this session |
| Git commit | You did not ask |
| 2020+ | Hub locked |

---

## 14. How to continue

| You say | What that means |
|---------|-----------------|
| `implement leftover 2016` | Workplace / iOS 10 / Nougat / Note 7 / Mario Run |
| `implement 2017 Face ID machine` | Promote 2017 toward A |
| `fix museum-voice` | Rewrite 14 “this exhibit” strings |
| `commit` | Git commit this session (only if you ask) |

*End of session report.*
