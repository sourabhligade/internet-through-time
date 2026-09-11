# All years — duplicate links / flows audit

**Date:** 2026-09-11  
**Scope:** every year tree on disk 1994–2022. Home leftover-3× strips, official 10 trail, warehouse, leftover keys, dest folders.  
**User view:** same dest twice on Starting Point or official trail = duplicate link.

---

## Clean (measurable)

| Check | Result |
|-------|--------|
| Leftover-3× first / more / third **within-strip dups** | **0 years** |
| Leftover-3× first ∩ more ∩ third **cross-strip dest dups** | **0 years** |
| 2021 / 2022 warehouse ∩ leftover-3× / official | **0 dests** |
| 2021 / 2022 gold dest on leftover-3× first | **0** |
| 2021 leftover dest dests still mock | **0 / 88** |
| 2022 leftover dest dests still mock | **0 / 88** |
| Leftover key == official key on **2021 / 2022** | **0** |

---

## User-visible duplicate dests (same dest twice on Starting Point)

### Official dest also on leftover-3× first (17 years)

Visitor sees the dest on official 10 **and** leftover-3× first.

| Year | Dest(s) | n |
|-----:|---------|--:|
| 1994 | apple bbc cnn imdb microsoft | 5 |
| 1995 | aol apple espn ibm infoseek nyt | 6 |
| 1996 | archive askjeeves craigslist disney espn icq | 6 |
| 1997 | amazon cnn geocities netflix winamp yahoo | 6 |
| 1998 | aol excite geocities lycos winamp | 5 |
| 1999 | geocities livejournal slashdot yahoo | 4 |
| 2000 | excite geocities slashdot yahoo | 4 |
| 2001 | askjeeves blogger cnn slashdot | 4 |
| 2002 | daypop google googlenews lastfm wikipedia | 5 |
| 2003 | cnn delicious google hi5 skype wikipedia | 6 |
| 2004 | cnn livejournal myspace skype wikipedia yahoo | 6 |
| 2005 | myspace wikipedia yahoo | 3 |
| 2006 | amazon delicious digg flickr gmail google myspace reddit yahoo | 9 |
| 2007 | digg ebay flickr maps myspace reddit stumble wiki | 8 |
| 2008 | flickr gmail myspace reddit stackoverflow wikipedia | 6 |
| **2021** | **facebook** (official 10 + leftover-3× first) | **1** |
| **2022** | **twitter** (official 10 + leftover-3× first) | **1** |

2021 leftover-3× **third** also lists 8 official dests (signal copilot meta win11 flash chrome win10 playable). 2022 leftover-3× **third** lists 8 official dests (wordle sd mastodon bereal dalle2 copilotga chrome playable). That matches 2011 leftover-3× third (official dests on third strip). First-strip official dest is the one that feels like a **duplicate link** on Starting Point.

### Official 10 trail lists the same dest twice

| Year | Dest | Times in official trail |
|-----:|------|------------------------:|
| 1995 | amazon | 2 |
| 1998 | google | 2 |
| 2004 | facebook | 4 |
| 2006 | facebook | 2 |
| 2012 | facebook | 2 |
| 2013 | iphone | 2 |
| 2014 | whatsapp · iphone | 2 each |

---

## Broken dest hrefs (folder missing)

| Year | Href dest | Folder |
|-----:|-----------|--------|
| 2000 | `aim` · `maps` | missing |
| 2004 | `aim` · `mapquest` · `itunes-note.html` | missing / not a dest folder |

---

## Leftover key collisions (same leftover key on two dest folders)

Visitor leftover complete on dest A can write dest B’s leftover key.

| Year | Key | Dests |
|-----:|-----|-------|
| 1994–2000, 2004–2006, 2010, 2012 | `trail-q` | several dests share one leftover field key |
| 2003 | `firebird` | firebird · phoenix |
| 2015 | `discord-ab` | discord · discordabout |
| 2015 | `edge-lx` · `edge-ab` | edge · edgeabout |
| 2015 | `le-lx` | letsencrypt · leabout |

**2005 leftover key == official dest key** (7 dests: delicious, fb-profile, fb-invite, fb-friends, fx, …). **2006 leftover key == official dest key** (12 dests including digg, docs, facebook leftover keys). Leftover complete can write the official key on those dests.

**2021 / 2022 leftover keys do not collide with official keys** (leftover writers are `*-lx` / `*-d2` / leftover dest dest keys).

---

## start-extra warehouse vs leftover-3× / official (27 years)

`start-extra.js` lists dests already on gold / guided / leftover-3×. Warehouse uniqueness law: dests already on those strips should not be repeated.

| Years | Clash dests (approx) |
|-------|----------------------|
| 1994–2020 | **13–56 dests / year** listed again in start-extra |
| 2011 | **56** dests (worst) |
| 2018 | **13** dests |
| **2021 / 2022** | **0** (no start-extra key · warehouse on home only · no clash) |

---

## 2021 / 2022 (this arc)

| Check | 2021 | 2022 |
|-------|------|------|
| Dest folders | 98 | 98 |
| Leftover-3× first/more/third unique | **yes** | **yes** |
| Warehouse ∩ leftover-3× | **0** | **0** |
| Official dest on leftover-3× first | **facebook** | **twitter** |
| Official dest on leftover-3× third | 8 dests (2011 pattern) | 8 dests (2011 pattern) |
| Leftover key == official key | 0 | 0 |
| start-extra warehouse clash | n/a | n/a |

---

## What to fix if named (user-visible first)

1. **2021 facebook / 2022 twitter** off leftover-3× first (keep on official 10 + leftover dest dest face).  
2. Official trail dest listed twice (1995 amazon, 1998 google, 2004 facebook ×4, …).  
3. Broken hrefs 2000 `aim`/`maps` · 2004 `aim`/`mapquest`.  
4. Leftover key `trail-q` shared across dests (1994–2000, 2004–2006, 2010, 2012).  
5. 2005 / 2006 leftover key == official key.  
6. start-extra warehouse dests already on leftover-3× (1994–2020).

**Not a dest bug:** leftover dest dest faces on 2021/2022 leftover dests. Official 10 dest-true. Leftover writers 367. Leftover-3× 18+18+18 unique strips.
