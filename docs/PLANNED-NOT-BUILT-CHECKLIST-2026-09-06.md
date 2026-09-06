# Planned but not built — verify checklist

**Date:** 2026-09-06  
**What this is:** one list of what plan MDs + tests named, vs what disk actually has. Not a dest-farm order. Tick a row id before any implement.

**Trust:** live `years/` · `scripts/itt_gate.py` `SHIP_YEARS` · [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`2008-DOUBLE-5K-RESEARCH-FAMOUS-AMBITIOUS-2026-09-06.md`](2008-DOUBLE-5K-RESEARCH-FAMOUS-AMBITIOUS-2026-09-06.md) · `js/config/flow-trails.js`.

**Compared:** 2008 criteria / dest-minutes / leftover-4× / 5× harvest / check-every-flow / still-open checklist · 2005–2010 leftover-4× dest-minutes · 2012 FROM-SCRATCH F1–F5 · 5×-live specs vs `data-5x-*` markup · dest-minute dest slugs vs folders · `museum-progress.js` WIPED vs hub.

**Scan result (already on disk — do not rebuild):** CUT-DOUBLE named 105 rooms all exist · leftover 2× on every dest of every live year · leftover 4× on every 2008 dest · leftover-4× `*-d4` that the 2008 leftover-4× table planned (76) are on disk · official 10 / guided 6 / star `itt08-github` frozen · dest-minute spec 18 passed · CI static + CI ship e2e green locally.

**Do not tick as a rebuild:** star move · guided 7th `<li>` · official 10 rewrite · 5,000 dests · farm 12 plaques to hit ~210 · Spotify US · Bitcoin wallet · `git checkout` old forest · boarded 2013 / 2018 / 2020 / 2023–2025 trees · leftover 4×=0 on 1994–96 / 2001–04 / 2011–12 / 2015–17 / 2019 (2× is already the floor; 4× was never a named cut there) · July 2008 implement-phase `[ ]` boxes that already shipped (hub / scaffold / urlMap).

---

## A. 2008 still-open — leftover from [`2008-STILL-OPEN-VERIFY-CHECKLIST.md`](2008-STILL-OPEN-VERIFY-CHECKLIST.md)

| Id | Planned | Disk now | Pass |
|----|---------|----------|------|
| A1 | Thin cites honest | Yelp dest + N-A29 now **2008** ~15.7M / ~4.69M (2007 column labeled). GMV still not dual-cited (honest). | [x] year-column · GMV stays thin |
| A2 | LBP dates one story | `lbp/about.html` matches NA 27 Oct · EU week of 3 Nov · UK 5 Nov. | [x] |
| A3 | FriendFeed spelling + public day | Dest + builder say **Buchheit**. Public 25 Feb stays. | [x] |
| A4 | One `#ott-2x-2008` · packs visible | **Done.** Trails use `-also` / `-next` / `-remain`. | [x] |
| A5 | No decorative UNWIRED trap `<button>` on CUT-DOUBLE dests | **Done.** Outer line is `p.itt-trap-label`. | [x] |
| A6 | Dest-minutes hold matches strip | **Done.** Pack A/B/C 35+35+35 below guided. | [x] |
| A7 | Origin CI | Local static green. Origin last run still **Sep 4 red** until you push. | [ ] |
| A8 | V4 honesty · no plaque farm | **Done as honesty.** 198 dests. Do not farm 12 folders. | [x] |
| A9 | Dest-minute visitor walk + tests | Dest-minute spec **18 passed**. Full leftover-4× 105 not hand-walked. | [x] dest-minutes · [ ] hand-walk |

---

## B. 2008 machines the plans/tests named — missing on dest HTML

| Id | Plan | Disk now | Pass |
|----|------|----------|------|
| B1 | 5× F1–F5 on App Store / Chrome / G1 / Hulu / Dropbox | `data-5x-loop` + save + reqs on those dests. | [x] |
| B2 | Home `#ott-5x-2008` chips | Six chips on start-extra. Hoisted out of Also-this-year. | [x] |
| B3 | Home shows ILS June **172,338,726** | Visible on dest-minutes header below guided. | [x] |
| B4 | Official Hulu play writes `itt08-hulu` | Play is hulu.js only (no official-verb steal). | [x] |
| B5 | Facebook Connect complete status | `data-itt-year="2008"` + `data-ok-msg="Connected · itt08-fb-connect"`. | [x] |

These five are why `npm run test:e2e:2008` was **96 passed / 9 failed**. Dest-minutes were not among the 9.

---

## C. 2008 plan MD vs disk honesty (named, still wrong)

| Id | Plan | Disk now | Pass |
|----|------|----------|------|
| C1 | Leftover-4× dest-minutes freeze matches live forest | [`2008-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md`](2008-LEFTOVER-4X-DEST-MINUTES-2026-09-06.md) still says **105 dests / 353 HTML**. Disk is **198 dests / 551 year HTML**. 4× panels themselves **are** on every dest. | [ ] rewrite freeze only |
| C2 | Game name is **Goo Span** | Check-every-flow + DOUBLE-5K C19 / L-off10 say **Goo Span**. | [x] |
| C3 | 2022 is a live lean door ([`DISK-TRUTH.md`](DISK-TRUTH.md) · hub `year-card available y2022`) | `WIPED` no longer includes 2022. | [x] |
| C4 | 2005–2010 leftover-4× dest-minutes dest counts | Disk lines now label playable vs dests. 2008 freeze is 198 / 551. | [x] |

---

## D. Other years — named plan + test, not the same as 2008 leftover-4×=0

| Id | Plan | Disk now | Pass |
|----|------|----------|------|
| D1 | 2012 F1–F5 `data-5x-*` + home `#ott-5x-2012` | Panels on pin / IPO / facebook / maps / sopa. Chip on start-extra. | [x] |
| D2 | Boarded years 2013 / 2018 / 2020 / 2023–2025 FROM-SCRATCH maps | **Hub locked cards.** No `years/YYYY/` tree. That is law, not a forgotten CUT-DOUBLE. | do not tick |

---

## E. How to check (after you name a row)

```text
python3 -m http.server 8080 --bind 127.0.0.1
# A1–A3  open friendfeed / lbp/about / yelp theses
# B1     grep data-5x-save years/2008/sites/{appstore,chrome,android,hulu,dropbox}
# B2     home.html / DevTools #ott-5x-2008
# B3     home body has 172,338,726
# B4     npx playwright test e2e/2008-mvp.spec.js e2e/2008-real-flows.spec.js --grep Hulu
# B5     same file --grep Connect
# C3     WIPED in js/museum-progress.js must not list 2022
# pack   npx playwright test e2e/2008-cut-double-dest-minutes.spec.js   # 18
# year   npm run test:e2e:2008
```

**Do not implement until a row id is named.**
