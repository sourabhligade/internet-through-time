# 2015 — every flow · minute · 3× densify

**Date:** 2026-08-24  
**Parent corpus:** [`../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md`](../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md)  
**Status:** implement **only** when you say `implement 2015` or `densify 2015`. Git only if asked.

---

## 0. Lock

| | |
|--|--|
| Star | Periscope Go LIVE |
| Chip | ★ One-thing · Periscope Go LIVE REAL |
| href | `sites/periscope/index.html` |
| Key | `itt15-periscope` |
| Shell | Win10 leftover + Chrome habit |
| Thesis | Live from the phone. Photos locker and Win10 are leftovers. |
| Scale | ILS June still live · ITU people-online labeled |
| Bans | IG Stories, TikTok, Reels |
| Disk now | **40 HTML** · **20 site folders** |
| 3× target | **90–120 HTML** · **45–60 rooms** · **45–60 completable flows** |
| Guided `<ol>` | **exactly 6** |
| Prefix | `itt15-*` only |

**3× vs rest of the museum:** do **not** 3× 2008’s 345 HTML. 3× **this lean door**. Current lean ~15–20 completable flows → **45–60**. Leftover dests 9 → **27**. Dest also-stamps → **100% dests, ≥3 live exits**.

---

## 1. Align (recite before any edit)

```
hero  =  years/2015/sites/periscope/index.html
      =  pages/home.html data-ott-one-thing="2015"
      =  flowTrails["2015"][0].href
key   =  itt15-periscope
```

Star dest and key **do not move**. Guided count stays 6. Neighbor prefixes `itt14-*` / `itt16-*` stay empty after every write.

---

## 2. Gold minute (the one-thing)

**URL:** `/years/2015/sites/periscope/index.html`

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt15-periscope")` | — |
| Incomplete 1 | Click [data-peri-live] with empty [data-peri-title] | **no** |
| Incomplete 2 | Title only, no Go LIVE | **no** |
| Incomplete 3 | Meerkat costume as gold | **no** |
| Trap | IG Live as 2015 gold · TikTok | **no** |
| Complete | Name the broadcast in [data-peri-title] · [data-peri-live] | **`itt15-periscope`** |
| Payload | real:true · year:"2015" · live:true | must include `real` + `year:"2015"` |
| Next | [data-next-flow] → Google Photos | hidden until key exists |
| Reload | key still present · Next still visible | yes |
| Neighbor | no other year prefix | — |

---

## 3. Guided 6 (count is the test)

| # | Copy | href | Pass |
|--:|------|------|------|
| 1 | About 2015 | `pages/about.html` | HTTP 200 · dual scale · bans |
| 2 | Periscope | `sites/periscope/index.html` | HTTP 200 · Go LIVE |
| 3 | Google Photos | `sites/googlephotos/index.html` | HTTP 200 · locker leftover |
| 4 | Windows 10 | `sites/windows10/index.html` | HTTP 200 · upgrade leftover |
| 5 | Apple Music | `sites/applemusic/index.html` | HTTP 200 · leftover |
| 6 | Year flow map | `pages/map.html` | HTTP 200 · map |

`#ott-guided-2015 ol > li` **= 6**. A 7th `<li>` fails the year. Chips / 3× / 5× sit **outside** the `<ol>`.

---

## 4. Official 10 — every stop is a writer

Each `whenKey` in `flow-trails.js` must **write**. Load-only / plaque-only is a hole. n=1 uses the **Gold minute**. Others: leftover-official panel if present, else dest-field until S8 grows a year-true verb.

| n | Name | href | whenKey | Incomplete (never writes) | Complete | Next |
|--:|------|------|---------|---------------------------|----------|------|
| 1 | Periscope Go LIVE | `sites/periscope/index.html` | `itt15-periscope` | use Gold minute — not dest-field | Gold complete | `sites/googlephotos/index.html` Google Photos |
| 2 | Google Photos | `sites/googlephotos/index.html` | `itt15-googlephotos` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/windows10/index.html` Windows 10 |
| 3 | Windows 10 | `sites/windows10/index.html` | `itt15-win10` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/applemusic/index.html` Apple Music |
| 4 | Apple Music | `sites/applemusic/index.html` | `itt15-applemusic` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/edge/index.html` Edge |
| 5 | Edge Spartan | `sites/edge/index.html` | `itt15-edge` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/apple/watch.html` Watch leftover |
| 6 | Watch leftover | `sites/apple/watch.html` | `itt15-watch` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/snapchat/discover.html` Discover |
| 7 | Snap Discover | `sites/snapchat/discover.html` | `itt15-snap-discover` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/discord/index.html` Discord |
| 8 | Discord | `sites/discord/index.html` | `itt15-discord` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/letsencrypt/index.html` Let's Encrypt |
| 9 | Let's Encrypt | `sites/letsencrypt/index.html` | `itt15-le` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/playable/game.html` Blob Rush |
| 10 | Blob Rush | `sites/playable/game.html` | `itt15-game-blobrush` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/periscope/index.html` Periscope |

After each official write: `[data-next-flow][data-next-when-key]` visible · HTTP 200 · chip on home **still** the star.

---

## 5. Leftover layers — 9 on disk + 18 to add = 27 dests

L2∩L3∩L4 slugs must stay **empty**. L5∩L6∩L7 slugs must stay **empty**. L5–L7 do **not** exist until densify. Do not clone an L3 slug into L4.

### L2 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/instagram/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-ig` |
| `sites/spotify/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-spot` |
| `sites/netflix/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-nf` |

### L3 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/meerkatlive/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-pop-meerkatlive` |
| `sites/applemusicsub/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-pop-applemusicsub` |
| `sites/win10get/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-pop-win10get` |

### L4 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/discord/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-dc` |
| `sites/echo/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-echo-lx` |
| `sites/snapchat/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt15-pop3-snapchat` |

### L5 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/letsencrypt/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop4-letsencrypt` |
| `sites/amp/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop4-amp` |
| `sites/adblock/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop4-adblock` |

### L6 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/periscope/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop5-periscope` |
| `sites/photos/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop5-photos` |
| `sites/watch/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop5-watch` |

### L7 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/edge/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop6-edge` |
| `sites/discover/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop6-discover` |
| `sites/discord/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt15-pop6-discord` |

L2∩L3∩L4 intersection: `∅`. L5∩L6∩L7 intersection: `∅`.

---

## 6. Popular F1–F5 (matrix)

| F | key | path | kind | field | Incomplete | Complete | Next |
|---|-----|------|------|-------|------------|----------|------|
| F1 | `itt15-googlephotos` | `/years/2015/sites/googlephotos/index.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `../windows10/index.html` |
| F2 | `itt15-win10` | `/years/2015/sites/windows10/index.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `../applemusic/index.html` |
| F3 | `itt15-applemusic` | `/years/2015/sites/applemusic/index.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `../edge/index.html` |
| F4 | `itt15-watch` | `/years/2015/sites/apple/watch.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `../snapchat/discover.html` |
| F5 | `itt15-periscope` | `/years/2015/sites/periscope/index.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `—` |

Plaque-only dests that the matrix expects must grow `data-itt-popular-save` **or** a leftover-pop machine. Never run unscoped `build-popular-flows.py`.

---

## 7. Leftover-official machines (e2e matrix)

No leftover-official dests stamped for 2015. Official 10 still must write via gold / 4x / leftover-pop. Adding a `[data-lo-panel]` is allowed on densify if it does not fight the star key.

---

## 8. EVERY dest on disk (minute)

40 HTML files (error pages skipped). Each row is a flow. Thin / plaque dests are **holes** — S8.

Machine mix on disk: {'thin-door': 5, 'dest-field-4x': 16, 'leftover-pop': 9, 'year-verb': 1, 'playable': 9}

### D.01 `index.html` — Chrome habit — 2015

| | |
|--|--|
| URL | `/years/2015/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt15-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 20926 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.02 `pages/about.html` — About 2015 — dual scale · bans

| | |
|--|--|
| URL | `/years/2015/pages/about.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt15-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 2891 |
| Hooks | `data-itt-real-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-thesis-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.03 `pages/home.html` — Welcome to the World Wide Web — 2015

| | |
|--|--|
| URL | `/years/2015/pages/home.html` |
| Machine | **thin-door** |
| Keys in file | `itt15-am`, `itt15-am-sub`, `itt15-beats1`, `itt15-block`, `itt15-block-2`, `itt15-cab`, `itt15-dc`, `itt15-discover`, `itt15-echo-lx`, `itt15-edge-lx`, `itt15-faces`, `itt15-fam-2`, `itt15-fblive`, `itt15-g2`, `itt15-gp`, `itt15-gp-lib`, `itt15-gw10`, `itt15-ig`, `itt15-le-2`, `itt15-le-lx`, `itt15-meerkat`, `itt15-meerkat-live`, `itt15-nf`, `itt15-pair`, `itt15-peri-title`, `itt15-peri-w`, `itt15-snap-h`, `itt15-spot`, `itt15-w10-up`, `itt15-watch-lx`, `itt15-win10-lx`, `itt15-xa`, `itt15-xb`, `itt15-xc`, `itt15-xd`, `itt15-xe` |
| Primary write | `itt15-am` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 10262 |
| Hooks | `data-itt-5x-atlas`, `data-itt-pop-3x3`, `data-itt-pop-more`, `data-itt-pop3x`, `data-itt-tour`, `data-itt-year`, `data-itt-year-extras` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.04 `pages/map.html` — 2015 flow map

| | |
|--|--|
| URL | `/years/2015/pages/map.html` |
| Machine | **thin-door** |
| Keys in file | `itt15-am`, `itt15-am-sub`, `itt15-beats1`, `itt15-block`, `itt15-block-2`, `itt15-cab`, `itt15-dc`, `itt15-discover`, `itt15-echo-lx`, `itt15-edge-lx`, `itt15-faces`, `itt15-fam-2`, `itt15-fblive`, `itt15-g2`, `itt15-gp`, `itt15-gp-lib`, `itt15-gw10`, `itt15-ig`, `itt15-le-2`, `itt15-le-lx`, `itt15-meerkat`, `itt15-meerkat-live`, `itt15-nf`, `itt15-pair`, `itt15-peri-title`, `itt15-peri-w`, `itt15-snap-h`, `itt15-spot`, `itt15-w10-up`, `itt15-watch-lx`, `itt15-win10-lx`, `itt15-xa`, `itt15-xb`, `itt15-xc`, `itt15-xd`, `itt15-xe` |
| Primary write | `itt15-am` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 10460 |
| Hooks | `data-itt-2x-map`, `data-itt-3x-also`, `data-itt-flow-map`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.05 `pages/whats-new.html` — What's New — 2015

| | |
|--|--|
| URL | `/years/2015/pages/whats-new.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt15-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 912 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.06 `sites/apple/faces.html` — Watch faces

| | |
|--|--|
| URL | `/years/2015/sites/apple/faces.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-faces` |
| Primary write | `itt15-faces` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 2622 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.07 `sites/apple/pair.html` — Watch pair

| | |
|--|--|
| URL | `/years/2015/sites/apple/pair.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-pair` |
| Primary write | `itt15-pair` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 2580 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.08 `sites/apple/watch.html` — Apple Watch — leftover, not the star

| | |
|--|--|
| URL | `/years/2015/sites/apple/watch.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-watch`, `itt15-watch-lx` |
| Primary write | `itt15-watch` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3674 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-watch-req`, `data-watch-save`, `data-watch15-save` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.09 `sites/applemusic/beats1.html` — Beats 1 — same station everywhere

| | |
|--|--|
| URL | `/years/2015/sites/applemusic/beats1.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-beats1` |
| Primary write | `itt15-beats1` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2939 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.10 `sites/applemusic/index.html` — Apple Music — three free months

| | |
|--|--|
| URL | `/years/2015/sites/applemusic/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-am`, `itt15-applemusic` |
| Primary write | `itt15-am` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3399 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.11 `sites/applemusicsub/index.html` — Apple Music leftover — 2015

| | |
|--|--|
| URL | `/years/2015/sites/applemusicsub/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-am-sub`, `itt15-pop-applemusicsub` |
| Primary write | `itt15-am-sub` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3401 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.12 `sites/discord/index.html` — Discord — May 2015 seed

| | |
|--|--|
| URL | `/years/2015/sites/discord/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-dc`, `itt15-discord`, `itt15-pop3-discord` |
| Primary write | `itt15-dc` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3965 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.13 `sites/echo/index.html` — Amazon Echo — $179.99

| | |
|--|--|
| URL | `/years/2015/sites/echo/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-echo-lx`, `itt15-pop3-echo` |
| Primary write | `itt15-echo-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3742 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-echo-req`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.14 `sites/edge/index.html` — Microsoft Edge — Spartan

| | |
|--|--|
| URL | `/years/2015/sites/edge/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-edge`, `itt15-edge-lx` |
| Primary write | `itt15-edge` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3242 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-edge-req`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.15 `sites/fblive/index.html` — Facebook Live — celebs only

| | |
|--|--|
| URL | `/years/2015/sites/fblive/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-fblive` |
| Primary write | `itt15-fblive` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2619 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.16 `sites/googlephotos/index.html` — Google Photos — unlimited high quality

| | |
|--|--|
| URL | `/years/2015/sites/googlephotos/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-googlephotos`, `itt15-gp` |
| Primary write | `itt15-googlephotos` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3761 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-photo-pick` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.17 `sites/googlephotos/library.html` — Google Photos — library

| | |
|--|--|
| URL | `/years/2015/sites/googlephotos/library.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-gp-lib` |
| Primary write | `itt15-gp-lib` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3006 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.18 `sites/instagram/index.html` — Instagram — 2015 leftover

| | |
|--|--|
| URL | `/years/2015/sites/instagram/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-ig` |
| Primary write | `itt15-ig` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3064 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-pop-field`, `data-pop-go` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.19 `sites/ios9/blockers.html` — iOS 9 · Content Blockers

| | |
|--|--|
| URL | `/years/2015/sites/ios9/blockers.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-block`, `itt15-block-2` |
| Primary write | `itt15-block` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3688 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-block-req`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.20 `sites/letsencrypt/index.html` — Let's Encrypt — public beta

| | |
|--|--|
| URL | `/years/2015/sites/letsencrypt/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-le`, `itt15-le-2`, `itt15-le-lx` |
| Primary write | `itt15-le` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3885 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-le-request` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.21 `sites/meerkat/index.html` — Meerkat — SXSW context

| | |
|--|--|
| URL | `/years/2015/sites/meerkat/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-meerkat` |
| Primary write | `itt15-meerkat` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2613 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.22 `sites/meerkatlive/index.html` — Meerkat leftover — 2015

| | |
|--|--|
| URL | `/years/2015/sites/meerkatlive/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-meerkat-live`, `itt15-pop-meerkatlive` |
| Primary write | `itt15-meerkat-live` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3468 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.23 `sites/netflix/index.html` — Netflix — 2015 leftover

| | |
|--|--|
| URL | `/years/2015/sites/netflix/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-nf` |
| Primary write | `itt15-nf` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3042 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-pop-field`, `data-pop-go` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.24 `sites/periscope/index.html` — Periscope — Go LIVE

| | |
|--|--|
| URL | `/years/2015/sites/periscope/index.html` |
| Machine | **year-verb** |
| Keys in file | `itt15-peri-title`, `itt15-periscope` |
| Primary write | `itt15-peri-title` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 4029 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-peri-live`, `data-peri-live-title`, `data-peri-live-well` |

**Incomplete (never writes)**

1. Click [data-peri-live] with empty [data-peri-title]
2. Title only, no Go LIVE
3. Meerkat costume as gold

**Trap (never writes):** IG Live as 2015 gold · TikTok

**Complete:** Name the broadcast in [data-peri-title] · [data-peri-live]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.25 `sites/periscope/watch.html` — Periscope — someone else's eyes

| | |
|--|--|
| URL | `/years/2015/sites/periscope/watch.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-peri-w` |
| Primary write | `itt15-peri-w` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3129 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.26 `sites/playable/extra-a.html` — Periscope tap — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/extra-a.html` |
| Machine | **playable** |
| Keys in file | `itt15-game-peritap`, `itt15-xa` |
| Primary write | `itt15-game-peritap` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 4949 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-mx-field`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.27 `sites/playable/extra-b.html` — Photos locker — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/extra-b.html` |
| Machine | **playable** |
| Keys in file | `itt15-game-lockertap`, `itt15-xb` |
| Primary write | `itt15-game-lockertap` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 4907 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-mx-field`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.28 `sites/playable/extra-c.html` — Split Drill — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/extra-c.html` |
| Machine | **playable** |
| Keys in file | `itt15-game-splitdrill` |
| Primary write | `itt15-game-splitdrill` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3334 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.29 `sites/playable/extra-d.html` — Heart Hold — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/extra-d.html` |
| Machine | **playable** |
| Keys in file | `itt15-game-hearthold` |
| Primary write | `itt15-game-hearthold` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3335 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-hold-ms`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.30 `sites/playable/extra-e.html` — Tray Whack — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/extra-e.html` |
| Machine | **playable** |
| Keys in file | `itt15-game-traywhack` |
| Primary write | `itt15-game-traywhack` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3374 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.31 `sites/playable/famous.html` — Famous games — 2015 leftover

| | |
|--|--|
| URL | `/years/2015/sites/playable/famous.html` |
| Machine | **playable** |
| Keys in file | `itt15-fam-2`, `itt15-game-pong`, `itt15-game-snake` |
| Primary write | `itt15-fam-2` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 4740 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.32 `sites/playable/game-2.html` — Watch face — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/game-2.html` |
| Machine | **playable** |
| Keys in file | `itt15-g2`, `itt15-game-watchface` |
| Primary write | `itt15-g2` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 4590 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.33 `sites/playable/game.html` — Blob Rush — 2015

| | |
|--|--|
| URL | `/years/2015/sites/playable/game.html` |
| Machine | **playable** |
| Keys in file | `itt15-game-blobrush` |
| Primary write | `itt15-game-blobrush` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 2912 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.34 `sites/playable/index.html` — 2015 playables

| | |
|--|--|
| URL | `/years/2015/sites/playable/index.html` |
| Machine | **playable** |
| Keys in file | `itt15-cab` |
| Primary write | `itt15-cab` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3423 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-itt-year-extras`, `data-itt-year-more` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.35 `sites/snapchat/discover.html` — Snapchat Discover

| | |
|--|--|
| URL | `/years/2015/sites/snapchat/discover.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-discover`, `itt15-snap-discover` |
| Primary write | `itt15-discover` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3036 |
| Hooks | `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.36 `sites/snapchat/index.html` — Snapchat leftover — 2015

| | |
|--|--|
| URL | `/years/2015/sites/snapchat/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-pop3-snapchat`, `itt15-snap-h` |
| Primary write | `itt15-pop3-snapchat` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3796 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.37 `sites/spotify/index.html` — Spotify — 2015 leftover

| | |
|--|--|
| URL | `/years/2015/sites/spotify/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-spot` |
| Primary write | `itt15-spot` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3047 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-pop-field`, `data-pop-go` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.38 `sites/win10get/index.html` — Get Windows 10 leftover — 2015

| | |
|--|--|
| URL | `/years/2015/sites/win10get/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt15-gw10`, `itt15-pop-win10get` |
| Primary write | `itt15-gw10` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3358 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.39 `sites/windows10/index.html` — Get Windows 10

| | |
|--|--|
| URL | `/years/2015/sites/windows10/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-win10`, `itt15-win10-lx` |
| Primary write | `itt15-win10` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3748 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-win10-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.40 `sites/windows10/upgrade.html` — Windows 10 — upgrade honesty

| | |
|--|--|
| URL | `/years/2015/sites/windows10/upgrade.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt15-w10-up` |
| Primary write | `itt15-w10-up` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2907 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2015"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

## 9. Playables

| File | Role | Incomplete | Complete |
|------|------|------------|----------|
| `sites/playable/game.html` | official-10 year game | Finish no Start | Start + acts + Finish |
| `game-2.html` … `game-5.html` | extra cabinets | Finish no Start | Start + acts + Finish |
| `famous.html` | leftover famous · not a 3rd official cabinet | empty | leftover famous key |
| `extra-a.html` · `extra-b.html` | minute extras | Finish no Start | year-true extra |
| `sites/playable/extra-c.html` | extra-c **Split Drill** `itt15-game-splitdrill` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-d.html` | extra-d **Heart Hold** `itt15-game-hearthold` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-e.html` | extra-e **Tray Whack** `itt15-game-traywhack` | Finish no Start · `?test=1` still honest | Start + goods + Finish |

---

## 10. 3× densify checklist (when `densify 2015`)

1. Recite star `itt15-periscope` · guided 6 · bans.
2. Count HTML. Now **40**. Stop adding rooms at **120 HTML**.
3. Confirm L2/L3/L4 files exist and are **machines**, not costume doors.
4. Add L5 + L6 + L7 (9 dests) as leftover-pop machines. Unique slugs.
5. Add 9 more dest-pages (about / second URL) listed in L5–L7 about rows — or extra pages on existing rooms. Total leftover dests **27**.
6. Official 10: each whenKey writes. Replace plaque-only.
7. Every leftover dest: 3 incomplete + 1 trap + 1 complete.
8. `python3 scripts/build-3x-links.py` · dest also ≥3 · 0 marked 404s.
9. Guided still 6. Star unmoved. Neighbor prefix empty.
10. Prove: `python3 scripts/check-all-years.py` · one-thing 2015 · leftover-official · year-3x3 · 3x-links · extra-cde.

---

## 11. Shared laws (reprint)

1. Incomplete REAL never writes.
2. Prefix `itt15-*` only.
3. Never invent brand pixels. No ripped weights.
4. Guided `<ol>` exactly 6.
5. Star dest + key do not move.
6. Traps never write.
7. After new rooms: `python3 scripts/build-3x-links.py`.
8. No ILS June websites digit after 2018.
9. Lean first (~50 HTML) then 3× densify. Do not start at 120.

