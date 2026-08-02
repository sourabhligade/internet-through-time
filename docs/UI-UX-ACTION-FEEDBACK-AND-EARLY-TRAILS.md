# UX ship note — action feedback kit + early-year trails

**Date:** 2026-08-02  
**Purpose:** Document the two visitor-product improvements: **visible action feedback** and **early-year connection trails**.

---

## Codebase assessment (summary)

| Area | Finding | Implication |
|------|---------|-------------|
| Feedback | `showFlash` exists in `shared.js` but many late modules only set tiny status text (or nothing) | Users click Like/pin/share and feel nothing |
| Modules | Amazon/HoTMaiL/Slashdot use flash; Instagram/Pinterest/FB Like often did not | Uneven “did it stick?” |
| Early homes | 1994–2001: destination lists strong; **life trails** thin vs 2007–2012 | First-timers wander without a story path |
| Architecture | Correct: keep feedback in **shared api**, trails in **content HTML** | No engine fork |

**Rule preserved:** config + content over forks · localStorage theater · no invent brand pixels.

---

## 1. Action feedback kit

### API (`js/immersion/shared.js`)

| Method | Role |
|--------|------|
| `api.actionFeedback(message, opts)` | Flash + status node + aria-live + `ITT.lastActionFeedback` |
| `api.showFlash` | Period-styled flash (unchanged, still used alone when needed) |
| `api.resolveStatusNode` | Finds `[data-*-status]` / cart flash |

**opts:** `status` · `statusSelector` · `flash` (default true) · `ms` · `doc` · `kind`

### Wired modules (full residual pass)

| Module | Action | Feedback |
|--------|--------|----------|
| `amazon.js` | Add to cart | actionFeedback |
| `facebook.js` | Like | actionFeedback |
| `instagram.js` | Share | actionFeedback (after render) |
| `pinterest.js` | Pin | actionFeedback |
| `snapchat.js` | Send snap | actionFeedback |
| `chrome-browser.js` | Download / prefer | actionFeedback |
| `reddit.js` | Boost / bury / submit | actionFeedback |
| `digg.js` | Digg / bury | actionFeedback |
| `gmail.js` | Login · send · draft · invite | actionFeedback |
| `maps.js` | Local search | actionFeedback |
| `twitter.js` | Post | actionFeedback |
| `youtube.js` | Like / rate | actionFeedback |
| `farmville.js` | Plant · harvest · neighbor | actionFeedback |
| `spotify.js` | Invite · plan · add track | actionFeedback |
| `netflix.js` | Queue DVD | actionFeedback |
| `friendster.js` | Save profile | actionFeedback |
| `myspace.js` | Profile · invite · contact Tom | actionFeedback |
| `years/2012/sites/uber` | UberX / black request | actionFeedback (page-local) |

### CSS

`period-1995.css` (cascades): `.itt-status-pulse` green pulse on status lines.

### e2e

`e2e/action-feedback.spec.js` — Amazon cart · Pinterest pin · Instagram share.

---

## 2. Early-year connection trails

**Homes updated:** **1994–2004** (each **4 life trails** + nav honesty).

| Year | Trail themes (examples) |
|------|-------------------------|
| 1994 | Directory · builders (CERN/Mosaic) · cool sites · personal pages |
| 1995 | Shop · find · GeoCities · news |
| 1996 | HoTMaiL · portals · Space Jam · homestead |
| 1997 | eBay · Amazon IPO · Slashdot · browser war |
| 1998 | Google · Yahoo · buy a CD · eBay |
| 1999 | Napster · Google · Blogger · Y2K/commerce |
| 2000 | Smile · Napster war · Pets.com · markets |
| 2001 | Wikipedia/Wayback · iPod · IE6/XP · blogs/crash |
| 2002 | Friendster · blogosphere · KaZaA · Google/Wired |
| 2003 | Friendster/MySpace · iTunes Store · WordPress · LinkedIn/AdSense |
| 2004 | Firefox · Gmail invite · Flickr/Thefacebook · Google IPO/MySpace |

### e2e

`e2e/early-year-trails.spec.js` — 1994–2004 homes contain “Connection trails” + signature copy.

---

## Gates

```bash
npx playwright test e2e/action-feedback.spec.js e2e/early-year-trails.spec.js --workers=1
python3 scripts/check-all-years.py
npm run test:e2e:2012   # still green after module wires
```

---

## Residual status (shipped this pass)

| Item | Status |
|------|--------|
| Core signature feedback (cart/like/pin/share) | **[x]** |
| Residual modules (reddit · digg · gmail · maps · twitter · yt · farm · spotify · netflix · friendster · myspace · uber) | **[x]** |
| Trails 1994–2001 | **[x]** |
| Trails 2002–2004 | **[x]** |
| Optional forever | More modules (blogger post, linkedin invite, …) only if silent-click reports |

First-run coach + shell Navigate strip already explain Starting Point vs Year menu.
