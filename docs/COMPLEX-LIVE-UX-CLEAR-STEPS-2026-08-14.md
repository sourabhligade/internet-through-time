# Complex live UX — clear steps

**Date:** 2026-08-14  
**Do not implement until you name a year or `wave A`.**  
**List:** [`COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md`](COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md)  
**How / waves:** [`COMPLEX-LIVE-UX-HOW-TO-GET-IT-DONE-2026-08-14.md`](COMPLEX-LIVE-UX-HOW-TO-GET-IT-DONE-2026-08-14.md)

You say: `implement live ux 1995 homestead`  
or: `implement live ux wave A`

---

## Part 1 — Every year (same 12 steps)

Do these 12 steps for **one year**, then stop.

1. Read that year’s row in the research MD. Copy the product name, storage key, and bans.
2. Open `years/YYYY/pages/home.html`. Note the one-thing star. **Do not change it.**
3. Open `years/YYYY/pages/about.html`. Do not contradict the bans.
4. List the product folder: `ls years/YYYY/sites/<product>`.
5. Decide:
   - folder + persist already → only chip + e2e  
   - folder but literacy/one-click → deepen  
   - one page or two-click pack → add pages (lean years: **at most 3 new HTML**)
6. Make or reuse **three pages** with different jobs:
   - index = do the thing  
   - job = see the saved thing  
   - about = honesty (not the save)
7. Each page: `data-itt-year="YYYY"`, period CSS, only `js/immersion-YYYY.js`, `data-*` hooks, **no inline machine**.
8. Wire JS in the **existing** module if one exists (`geocities.js`, `digg.js`, `foursquare.js`, …). Incomplete click **returns before** any `localStorage` write. Complete write is JSON: `{ multiStep, real, year, ts, … }`.
9. Add `urlMap` + `titleMap` in `js/config/YYYY.js`. Add a flow-maps leaf. Register a new JS file in `registry.js` only if you created a new module.
10. On home, under the star, add **one COMPLEX chip** (not `data-ott-one-thing`). Guided list stays **6** steps.
11. Add `e2e/YYYY-<product>-live.spec.js`:
    - clear key, reload  
    - incomplete → key is null  
    - complete → key has `multiStep` / `real` / `"year":"YYYY"`  
    - reload → UI still shows the work  
    - neighbor years `itt(YY±1)-*` untouched
12. Run:
    ```bash
    python3 scripts/check-all-years.py --years YYYY
    npx playwright test e2e/YYYY-<product>-live.spec.js --workers=1
    npx playwright test e2e/one-thing-per-year.spec.js --workers=1
    ```
    If all green, mark that year done. **Do not start the next year** unless the user said a wave.

---

## Part 2 — Wave A (first five years)

Do A1 → A5 in order. After each year, run Part 1 step 12.

### A1 — 1995 GeoCities homestead

1. Open `years/1995/sites/geocities/homestead.html` and `my-homestead.html`.
2. Open `js/immersion/geocities.js`.
3. If empty title or empty about still writes `itt95-homestead`, **block the write**.
4. Make `my-homestead.html` render **from storage** (title, neighborhood, blurb), not a static demo.
5. Webring prev/next must still work.
6. On 1995 home, under the SSL star, add chip: homestead.
7. Add or extend e2e: empty submit → no key; finish → key; reload view shows the title; no `itt94-*` / `itt96-*`.
8. Do **not** edit Amazon SSL.

### A2 — 2015 Discord #general

1. Open `years/2015/sites/discord/{index,channel,server}.html`.
2. Open `bootDiscord15` in `js/immersion/one-thing-machines.js`.
3. Index: picking a server is required.
4. Channel: empty send does not write.
5. Complete send writes a typed blob (`server`, `msgs`, `multiStep`, `real`, `year: "2015"`).
6. Reload channel: messages still there.
7. 2015 home: COMPLEX chip. **Watch stays the star.**
8. Add `e2e/2015-discord-live.spec.js`.
9. Do not prune the 2015 forest. Do not star Discord.

### A3 — 2006 Digg promote / bury

1. Open `years/2006/sites/digg/{index,submit,about}.html`.
2. Open `js/immersion/digg.js`.
3. Submit: title min 8 + url required; empty never writes.
4. Promote / bury must change the index **order** and survive reload.
5. 2006 home: COMPLEX chip. **Twitter stays the star.**
6. Add `e2e/2006-digg-live.spec.js` (isolation vs `itt05` / `itt07`).

### A4 — 2009 Foursquare check-in

1. Open `years/2009/sites/foursquare/{index,about}.html`.
2. Open `js/immersion/foursquare.js`.
3. Add `venue.html` if missing (third page).
4. Empty venue never writes.
5. Check-in writes a typed row; reload shows last venue / shout / mayor residual.
6. Keep the existing year-prefixed key (`itt09-4sq` unless you migrate every spec).
7. 2009 home: COMPLEX chip. **Like stays the star.**
8. Add `e2e/2009-foursquare-live.spec.js`.

### A5 — 2013 Tinder deck

1. Open `years/2013/sites/tinder/index.html` (it is a two-click pack today).
2. Remove the pack (`data-itt-pack`) so it does not double-boot.
3. Add `matches.html` and `about.html` (lean: only these new files).
4. Frozen deck of 6 **silhouette** cards (no real-person photos).
5. Swipe at least 3 times; then a match may persist as `itt13-tinder`.
6. No swipe / incomplete never writes.
7. 2013 home: COMPLEX chip. **Vine stays the star.**
8. Count HTML: stay lean (~+2 pages).
9. Add `e2e/2013-tinder-live.spec.js`.

### After A5

1. Re-run the five live specs.
2. Re-run `one-thing-per-year` (stars 1995, 2006, 2009, 2013, 2015).
3. Stop. Show the five COMPLEX chips. Wait for `implement live ux wave B`.

---

## Part 3 — Later waves (only when named)

Do each year with **Part 1**. Do not start these until Wave A is signed off.

**Wave B — queues and shops**  
10. 2002 Netflix DVD queue  
11. 2008 App Store get → library  
12. 2003 iTunes 99¢ → library  
13. 2010 Instagram filter → grid  
14. 2017 Netflix My List  

**Wave C — maps / search / music**  
15. 1994 IUMA listen  
16. 1996 My portal  
17. 1998 Babel Fish  
18. 1999 Napster search (no files)  
19. 2000 eBay watch + bid  
20. 2007 Street View pegman  

**Wave D — social / lean**  
21. 2001 Wikipedia edit → history  
22. 2004 Flickr stream + tags  
23. 2005 Google Reader  
24. 2011 Uber SF request  
25. 2012 Pinterest board  
26. 2014 Twitch chat  

**Wave E — late**  
27. 1997 Slashdot moderate  
28. 2016 musical.ly (not TikTok)  
29. 2018 TikTok For You  
30. 2019 Apple TV+ continue  
31. 2020 Quibi 6-min then gone (do not reopen Zoom)

---

## Part 4 — Never

1. A second `data-ott-one-thing`.  
2. `implement live ux all years` in one turn.  
3. `cp -R` a fat year onto a lean year.  
4. Invent brand logos.  
5. Live APIs, map tiles, real audio, real payments.  
6. Scaffold 2021+.  
7. Soften incomplete-write rules.

---

## Part 5 — First thing to type

```
implement live ux 1995 homestead
```
