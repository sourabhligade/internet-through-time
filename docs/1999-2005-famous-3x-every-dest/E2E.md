# 1999–2005 leftover 3× — every e2e case

**Date:** 2026-09-07  
**Status:** RESEARCH. Specs listed here are **required**. Do not mark a year done until every row in that year is green.

Existing packs (`YYYY-mvp`, `YYYY-trail-real-flows`, `leftover-official.spec.js`, `YYYY-leftover-4x`, `year-3x3-all`) stay. They do **not** replace this list.

## Packs to write

| Spec | Cases | Asserts |
|------|------:|---------|
| `e2e/1999-leftover-3x.spec.js` | 27 doors × (M1+M3) + 32 YES dests × M2 spot-check | first/second ∉ official 10 · never `itt99-aim` |
| `e2e/2000-leftover-3x.spec.js` | 27 doors × (M1+M3) | Baidu/Everything2 **not** on first · never `itt00-mapquest` |
| `e2e/2001-leftover-3x.spec.js` | 18 doors × (M1+M3) | dest folders still 29 · never `itt01-wiki` |
| `e2e/2002-leftover-3x.spec.js` | 18 doors × (M1+M3) | dest folders still 26 · never `itt02-stumble` |
| `e2e/2003-leftover-3x.spec.js` | 17 doors × (M1+M3) | dest folders still 23 · JSON first = skype/delicious/hi5 · never `itt03-photobucket` |
| `e2e/2004-leftover-3x.spec.js` | 27 doors × (M1+M3) | Piczo/Tagged/yelplocal **not** on first/second · never campus gold keys |
| `e2e/2005-leftover-3x.spec.js` | 27 doors × (M1+M3) | never `itt05-yt-uploads` |
| `e2e/1999-2005-famous-3x-machines.spec.js` | **603** M1/M2/M3 on YES dests (can shard by year) | leftover key only · neighbor year empty |

CI canary: `2005-leftover-3x` **or** `1999-leftover-3x` (one year). Full 603 is nightly.

Leftover-official **3,685** keys stay on `e2e/leftover-official.spec.js` + `e2e/leftover-official.matrix.json`. Do not duplicate those 3,685 into the new leftover-3× specs.

## Per-door contract (every leftover-3× door)

For dest `D` in year `Y`, star key `STAR`:

1. Starting Point shows a leftover-3× link whose href contains `sites/D/` and whose label is dest-true leftover (not the chip).  
2. Click → dest room.  
3. **M1:** empty field / 0 ticks / `[data-lo-trap]` → `localStorage[STAR]` absent · leftover key absent.  
4. **M3:** dest-true verb + 2 honesty ticks + wait if needed + save → leftover key JSON `{real:true,leftover:true,year:Y,multiStep:true}` · `STAR` still absent · `itt(Y-1)-*` and `itt(Y+1)-*` absent.  
5. Reload still shows leftover save.

## Leftover-3× doors (161)

### 1999 — 27

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | livejournal | no | title leftover entry + Post theater |
| A1 | neopets | no | name leftover pet + Adopt theater |
| A1 | egroups | no | name leftover list + Join theater |
| A2 | theonion | no | open leftover headline + read |
| A2 | drkoop | no | query leftover symptom + article |
| A2 | sixdegrees | no | name leftover person + connect |
| A3 | blogger | **yes** (third ok) | leftover post — never `itt99-blogger` as leftover-only if official panel |
| A3 | etrade | no | quote leftover ticker + paper trade |
| A3 | paypal | **yes** (third ok) | leftover send — never official paypal key from leftover panel |
| B1 | yahoo | no | browse directory category |
| B1 | geocities | no | pick neighborhood + homestead leftover |
| B1 | slashdot | no | open story + moderate leftover |
| B2 | aol | no | keyword leftover + You've Got Mail hop |
| B2 | excite | no | query leftover + My Excite |
| B2 | icq | no | leftover UIN + add contact |
| B3 | amazon | **yes** (third ok) | leftover cart |
| B3 | ebay | **yes** (third ok) | leftover bid |
| B3 | google | **yes** (third ok) | leftover sparse query |
| C1 | msn | no | open leftover channel |
| C1 | hampsterdance | no | play leftover loop |
| C1 | webvan | no | zip leftover + grocery slot |
| C2 | altavista | no | query leftover + Babel Fish hop |
| C2 | netscape | no | Netcenter leftover + 4.7 note |
| C2 | yahoomessenger | no | ID leftover + send theater |
| C3 | napster | **yes** (third ok) | leftover search theater |
| C3 | aim | **yes** (third ok) | leftover away/IM — **never** `itt99-aim` |
| C3 | y2k | **yes** (third ok) | leftover clock honesty |

### 2000 — 27

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | half | no | name leftover used CD + Buy used |
| A1 | limewire | no | query leftover track + download theater |
| A1 | travelocity | no | from+to leftover + find |
| A2 | ivillage | no | pick leftover channel + join |
| A2 | metafilter | no | open leftover FPP + favorite |
| A2 | napsterweb | no | leftover web-client search theater |
| A3 | expedia | no | from+to leftover + fares |
| A3 | paypal | **yes** | leftover send |
| A3 | ebay | **yes** | leftover bid |
| B1 | yahoo | no | directory leftover |
| B1 | geocities | no | homestead leftover |
| B1 | slashdot | no | story leftover |
| B2 | aol | no | keyword leftover |
| B2 | microsoft | no | leftover IE note |
| B2 | blogger | no | leftover post |
| B3 | amazon | **yes** | leftover cart |
| B3 | napster | **yes** | leftover search theater |
| B3 | google | **yes** | leftover query |
| C1 | msn | no | leftover channel |
| C1 | excite | no | leftover query |
| C1 | icq | no | leftover UIN |
| C2 | altavista | no | leftover query |
| C2 | homestar | no | leftover toon |
| C2 | kottke | no | leftover post + blogroll |
| C3 | mapquest | **yes** | leftover from+to — **never** `itt00-mapquest` |
| C3 | pets | **yes** | leftover sock-puppet cart |
| C3 | cnn | **yes** | leftover headline |

### 2001 — 18 (leftover-18 · no nine C)

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | google | **yes** (shipped overlap — do not add a 19th dest) | leftover query |
| A1 | yahoo | **yes** | leftover directory |
| A1 | cnn | no | leftover headline |
| A2 | moveon | no | leftover petition + sign theater |
| A2 | grok | no | leftover Grokster download theater |
| A2 | appleimac | no | leftover color + brochure |
| A3 | ebay | no | leftover bid |
| A3 | paypal | no | leftover send |
| A3 | excite | no | leftover query |
| B1 | slashdot | no | leftover story |
| B1 | blogger | no | leftover post |
| B1 | microsoft | no | leftover IE / XP note |
| B2 | mozilla | no | leftover milestone download |
| B2 | encarta | no | leftover lookup |
| B2 | dmoz | no | leftover category |
| B3 | wikipedia | **yes** | leftover search/preview — **never** `itt01-wiki` |
| B3 | itunes | **yes** | leftover library — no Store |
| B3 | napster | **yes** | leftover shutdown-era theater |

### 2002 — 18

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | daypop | no | leftover link + Hot |
| A1 | googlenews | no | leftover topic + cluster |
| A1 | technorati | no | leftover blog + cosmos |
| A2 | fark | no | leftover tag + comment theater |
| A2 | homestar | no | leftover toon |
| A2 | blogspot | no | leftover blog + next |
| A3 | amazon | no | leftover cart |
| A3 | yahoo | no | leftover directory |
| A3 | blogger | no | leftover post |
| B1 | wikipedia | no | leftover search |
| B1 | google | no | leftover query |
| B1 | lastfm | no | leftover scrobble |
| B2 | netflix | no | leftover DVD queue |
| B2 | mtv | no | leftover clip |
| B2 | ebay | no | leftover bid |
| B3 | friendster | **yes** | leftover friend add |
| B3 | kazaa | **yes** | leftover download theater |
| B3 | wired | **yes** | leftover Oct CSS |

### 2003 — 17 (shortfall 1)

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | skype | no | leftover contact + call theater |
| A1 | delicious | no | leftover tag + save |
| A1 | hi5 | no | leftover profile + add |
| A2 | flash | no | leftover FWA + skip intro |
| A2 | phoenix | no | leftover Firebird download |
| A2 | 4chan | no | leftover board + thread |
| A3 | amazon | no | leftover cart |
| A3 | yahoo | no | leftover directory |
| A3 | blogger | **yes** | leftover post |
| B1 | wikipedia | no | leftover search |
| B1 | google | no | leftover query |
| B1 | cnn | no | leftover headline |
| B2 | kazaa | no | leftover download theater |
| B2 | firebird | no | leftover download |
| B2 | — | **BLOCKED** | no 6th non-official dest · do not invent |
| B3 | itunes | **yes** | leftover 99¢ Store |
| B3 | wordpress | **yes** | leftover dashboard post |
| B3 | myspace | **yes** | leftover Top 8 |

### 2004 — 27 (A′ famous, not Piczo)

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | myspace | no | leftover Top 8 + comment |
| A1 | wikipedia | no | leftover search |
| A1 | yahoo | no | leftover directory |
| A2 | amazon | no | leftover cart |
| A2 | ebay | no | leftover bid |
| A2 | orkut | no | leftover scrap + community |
| A3 | digg | **yes** | leftover bury |
| A3 | gmail | **yes** | leftover invite |
| A3 | delicious | **yes** | leftover tag |
| B1 | skype | no | leftover call theater |
| B1 | livejournal | no | leftover entry |
| B1 | friendster | no | leftover friend add |
| B2 | craigslist | no | leftover city + post |
| B2 | wow | no | leftover toon + realm |
| B2 | linkedin | no | leftover invite + accept |
| B3 | facebook | **yes** | leftover gated join — **never** networks gold |
| B3 | firefox | **yes** | leftover download |
| B3 | flickr | **yes** | leftover upload/tag — Yahoo does **not** own yet |
| C1 | cnn | no | leftover headline |
| C1 | bbc | no | leftover headline |
| C1 | imdb | no | leftover title search |
| C2 | wordpress | no | leftover post |
| C2 | itunes | no | leftover library |
| C2 | bloglines | no | leftover subscribe |
| C3 | web20conference | **yes** | leftover agenda / sold-out |
| C3 | gmail | **yes** (repeat official third ok) | leftover invite |
| C3 | firefox | **yes** (repeat official third ok) | leftover download |

### 2005 — 27

| Nine | Dest | Official? | M3 verb |
|------|------|-----------|---------|
| A1 | milliondollar | no | leftover pixel + buy theater |
| A1 | clubpenguin | no | leftover penguin + waddle |
| A1 | kayak | no | leftover SFO + fares |
| A2 | firefox | no | leftover 1.5 download |
| A2 | gmail | no | leftover invite |
| A2 | vimeo | no | leftover watch + upload theater |
| A3 | maps | **yes** | leftover drag — no Street View |
| A3 | reddit | **yes** | leftover boost |
| A3 | digg | **yes** | leftover bury |
| B1 | myspace | no | leftover Top 8 |
| B1 | wikipedia | no | leftover search — not millionth |
| B1 | yahoo | no | leftover directory |
| B2 | google | no | leftover query |
| B2 | amazon | no | leftover cart |
| B2 | facebook | no | leftover gated rename — no News Feed |
| B3 | youtube | **yes** | leftover **watch** — **never** `itt05-yt-uploads` |
| B3 | flickr | **yes** | leftover tag (Yahoo-owned) |
| B3 | itunes | **yes** | leftover podcast subscribe |
| C1 | dailymotion | no | leftover watch + upload theater |
| C1 | googlevideo | no | leftover search + watch |
| C1 | earth | no | leftover globe + fly |
| C2 | lastfm | no | leftover scrobble |
| C2 | reader | no | leftover subscribe |
| C2 | secondlife | no | leftover avi + teleport theater |
| C3 | pandora | **yes** | leftover station |
| C3 | housingmaps | **yes** | leftover mashup pin |
| C3 | techcrunch | **yes** | leftover first-post era |

## 603 dest-true machines (YES dests)

Every YES dest in the year bibles has M1 + M2 + M3. Counts:

| Year | YES dests | Machines |
|------|----------:|---------:|
| 1999 | 32 | 96 |
| 2000 | 28 | 84 |
| 2001 | 24 | 72 |
| 2002 | 24 | 72 |
| 2003 | 22 | 66 |
| 2004 | 29 | 87 |
| 2005 | 42 | 126 |
| **sum** | **201** | **603** |

Walk dest-by-dest in [`1999.md`](1999.md) … [`2005.md`](2005.md) — each YES dest already has the M1/M2/M3 table, leftover-official key list, pages, and trap.

Shard the 603-case spec as `e2e/1999-famous-3x-machines.spec.js` … `e2e/2005-famous-3x-machines.spec.js` if one file is too slow.

## Already-green leftover-official (do not rewrite)

`e2e/leftover-official.matrix.json` already has **3,685** keys for these seven years. `e2e/leftover-official.spec.js` walks them. The 5k files have the minute script. New leftover-3× specs only add **Starting Point door + dest-true M1/M3**. They must not invent a parallel factory suffix.
