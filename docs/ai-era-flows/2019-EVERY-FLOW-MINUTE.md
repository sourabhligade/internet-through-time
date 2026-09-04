# 2019 — every flow · minute · 3× densify

**Date:** 2026-08-24  
**Parent corpus:** [`../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md`](../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md)  
**Status:** implement **only** when you say `implement 2019` or `densify 2019`. Git only if asked.

---

## 0. Lock

| | |
|--|--|
| Star | Disney+ Who’s watching → Continue |
| Chip | ★ One-thing · Disney+ Who’s watching REAL |
| href | `sites/disneyplus/home.html` |
| Key | `itt19-disneyplus` |
| Shell | Win10 + Chrome habit |
| Thesis | Who’s watching is the save. Continue row, not a play button. |
| Scale | No ILS June websites digit · Netcraft January + ITU |
| Bans | HBO Max as Disney+, no June ILS 2019 websites digit, ChatGPT |
| Disk now | **29 HTML** · **15 site folders** |
| 3× target | **90–120 HTML** · **45–60 rooms** · **45–60 completable flows** |
| Guided `<ol>` | **exactly 6** |
| Prefix | `itt19-*` only |

**3× vs rest of the museum:** do **not** 3× 2008’s 345 HTML. 3× **this lean door**. Current lean ~15–20 completable flows → **45–60**. Leftover dests 9 → **27**. Dest also-stamps → **100% dests, ≥3 live exits**.

---

## 1. Align (recite before any edit)

```
hero  =  years/2019/sites/disneyplus/home.html
      =  pages/home.html data-ott-one-thing="2019"
      =  flowTrails["2019"][0].href
key   =  itt19-disneyplus
```

Star dest and key **do not move**. Guided count stays 6. Neighbor prefixes `itt18-*` / `itt20-*` stay empty after every write.

---

## 2. Gold minute (the one-thing)

**URL:** `/years/2019/sites/disneyplus/home.html`

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt19-disneyplus")` | — |
| Incomplete 1 | Click [data-dplus-continue] with no [data-dplus-profile] | **no** |
| Incomplete 2 | Kids profile as the save | **no** |
| Incomplete 3 | Play instead of Continue | **no** |
| Trap | HBO Max / Netflix as Disney+ · [data-dplus-trial] as gold | **no** |
| Complete | Pick [data-dplus-profile] · tick [data-dplus-req] (not Max) · [data-dplus-continue] | **`itt19-disneyplus`** |
| Payload | real:true · year:"2019" · whosWatching:true · continue:true | must include `real` + `year:"2019"` |
| Next | [data-next-flow] → TikTok For You leftover | hidden until key exists |
| Reload | key still present · Next still visible | yes |
| Neighbor | no other year prefix | — |

---

## 3. Guided 6 (count is the test)

| # | Copy | href | Pass |
|--:|------|------|------|
| 1 | About 2019 | `pages/about.html` | HTTP 200 · no June ILS digit |
| 2 | Disney+ | `sites/disneyplus/home.html` | HTTP 200 · Who’s watching → Continue |
| 3 | TikTok | `sites/tiktok/index.html` | HTTP 200 · US mass leftover |
| 4 | Apple Arcade | `sites/arcade/index.html` | HTTP 200 · leftover |
| 5 | Apple TV+ | `sites/appletv/index.html` | HTTP 200 · leftover |
| 6 | Year flow map | `pages/map.html` | HTTP 200 · map |

`#ott-guided-2019 ol > li` **= 6**. A 7th `<li>` fails the year. Chips / 3× / 5× sit **outside** the `<ol>`.

---

## 4. Official 10 — every stop is a writer

Each `whenKey` in `flow-trails.js` must **write**. Load-only / plaque-only is a hole. n=1 uses the **Gold minute**. Others: leftover-official panel if present, else dest-field until S8 grows a year-true verb.

| n | Name | href | whenKey | Incomplete (never writes) | Complete | Next |
|--:|------|------|---------|---------------------------|----------|------|
| 1 | Disney+ Who’s watching | `sites/disneyplus/home.html` | `itt19-disneyplus` | use Gold minute — not dest-field | Gold complete | `sites/tiktok/index.html` TikTok For You |
| 2 | TikTok For You | `sites/tiktok/index.html` | `itt19-tiktok` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/arcade/index.html` Apple Arcade |
| 3 | Apple Arcade | `sites/arcade/index.html` | `itt19-arcade` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/appletv/index.html` Apple TV+ |
| 4 | Apple TV+ | `sites/appletv/index.html` | `itt19-appletv` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/stadia/index.html` Stadia |
| 5 | Stadia | `sites/stadia/index.html` | `itt19-stadia` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/iphone/iphone11.html` iPhone 11 |
| 6 | iPhone 11 | `sites/iphone/iphone11.html` | `itt19-iphone11` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/airpodspro/index.html` AirPods Pro |
| 7 | AirPods Pro | `sites/airpodspro/index.html` | `itt19-airpods-pro` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/chrome/index.html` Chrome habit |
| 8 | Chrome habit | `sites/chrome/index.html` | `itt19-chrome` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/windows10/index.html` Windows 10 |
| 9 | Windows 10 residual | `sites/windows10/index.html` | `itt19-win10` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/playable/game.html` Continue Row |
| 10 | Continue Row | `sites/playable/game.html` | `itt19-game-continuerow` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/disneyplus/home.html` Disney+ |

After each official write: `[data-next-flow][data-next-when-key]` visible · HTTP 200 · chip on home **still** the star.

---

## 5. Leftover layers — 9 on disk + 18 to add = 27 dests

L2∩L3∩L4 slugs must stay **empty**. L5∩L6∩L7 slugs must stay **empty**. L5–L7 do **not** exist until densify. Do not clone an L3 slug into L4.

### L2 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/youtube/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-pop-youtube` |
| `sites/instagram/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-pop-instagram` |
| `sites/wikipedia/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-pop-wikipedia` |

### L3 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/appletv/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-appletv` |
| `sites/airpodspro/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-airpods-pro` |
| `sites/iphone/iphone11.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-iphone11` |

### L4 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/tiktok/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-tiktok` |
| `sites/stadia/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-stadia` |
| `sites/arcade/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt19-arcade` |

### L5 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/disneyplus/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop4-disneyplus` |
| `sites/marshmello/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop4-marshmello` |
| `sites/win10/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop4-win10` |

### L6 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/chrome/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop5-chrome` |
| `sites/fortnite/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop5-fortnite` |
| `sites/tiktok/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop5-tiktok` |

### L7 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/airpods/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop6-airpods` |
| `sites/stadia/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop6-stadia` |
| `sites/arcade/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt19-pop6-arcade` |

L2∩L3∩L4 intersection: `∅`. L5∩L6∩L7 intersection: `∅`.

---

## 6. Popular F1–F5 (matrix)

| F | key | path | kind | field | Incomplete | Complete | Next |
|---|-----|------|------|-------|------------|----------|------|
| F1 | `itt19-youtube` | `/years/2019/sites/youtube/index.html` | new | — | empty field / 0 ticks / trap | pick + honesty + go | `../instagram/index.html` |
| F2 | `itt19-ig` | `/years/2019/sites/instagram/index.html` | new | — | empty field / 0 ticks / trap | pick + honesty + go | `../wikipedia/index.html` |
| F3 | `itt19-tweets` | `/years/2019/sites/tiktok/index.html` | new | tweet | empty field / 0 ticks / trap | pick + honesty + go | `../disneyplus/home.html` |
| F4 | `itt19-wiki` | `/years/2019/sites/wikipedia/index.html` | reuse | — | empty field / 0 ticks / trap | pick + honesty + go | `../disneyplus/home.html` |
| F5 | `itt19-disneyplus` | `/years/2019/sites/disneyplus/home.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `—` |

Plaque-only dests that the matrix expects must grow `data-itt-popular-save` **or** a leftover-pop machine. Never run unscoped `build-popular-flows.py`.

---

## 7. Leftover-official machines (e2e matrix)

e2e: trap → 0 ticks → ticks only → wrong pick → empty field → complete. Neighbor year keys stay empty.

| href | key | needPick | field | placeholder | Incomplete | Complete |
|------|-----|----------|-------|-------------|------------|----------|
| `sites/chrome/index.html` | `itt19-chrome` | `habit` | yes | `youtube.com` | trap / 0 ticks / wrong pick / empty field | req + pick `habit` + field + `[data-lo-save]` |
| `sites/windows10/index.html` | `itt19-win10` | `stay` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `stay` + field + `[data-lo-save]` |
| `sites/fortnite/marshmello.html` | `itt19-marshmello` | `ingame` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `ingame` + field + `[data-lo-save]` |

---

## 8. EVERY dest on disk (minute)

29 HTML files (error pages skipped). Each row is a flow. Thin / plaque dests are **holes** — S8.

Machine mix on disk: {'thin-door': 5, 'leftover-pop': 9, 'leftover-official': 3, 'dest-field-4x': 3, 'year-verb': 1, 'playable': 8}

### D.01 `index.html` — Chrome habit — 2019

| | |
|--|--|
| URL | `/years/2019/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt19-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 20930 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.02 `pages/about.html` — About 2019 — dual scale · bans

| | |
|--|--|
| URL | `/years/2019/pages/about.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt19-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 2541 |
| Hooks | `data-itt-real-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-thesis-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.03 `pages/home.html` — Welcome to the World Wide Web — 2019

| | |
|--|--|
| URL | `/years/2019/pages/home.html` |
| Machine | **thin-door** |
| Keys in file | `itt19-11-2`, `itt19-11-lx`, `itt19-app-2`, `itt19-app-lx`, `itt19-arcade-2`, `itt19-arcade-lx`, `itt19-cab-2`, `itt19-cab-lx`, `itt19-ch-2`, `itt19-ch-lx`, `itt19-dplus-ab`, `itt19-dplus-ix`, `itt19-edge-2`, `itt19-edge-lx`, `itt19-fam-2`, `itt19-famous-lx`, `itt19-game-lx`, `itt19-ig-2`, `itt19-ig-fn`, `itt19-ig-lx`, `itt19-marsh`, `itt19-stadia-2`, `itt19-stadia-lx`, `itt19-tt-2`, `itt19-tt-lx`, `itt19-tv-2`, `itt19-tv-lx`, `itt19-w10-2`, `itt19-w10-lx`, `itt19-wiki-2`, `itt19-wiki-lx`, `itt19-xa-2`, `itt19-xa-lx`, `itt19-xb-lx`, `itt19-yt-2`, `itt19-yt-lx` |
| Primary write | `itt19-11-2` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 9133 |
| Hooks | `data-itt-pop-3x3`, `data-itt-pop-more`, `data-itt-pop3x`, `data-itt-tour`, `data-itt-year`, `data-itt-year-extras` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.04 `pages/map.html` — 2019 flow map

| | |
|--|--|
| URL | `/years/2019/pages/map.html` |
| Machine | **thin-door** |
| Keys in file | `itt19-11-2`, `itt19-11-lx`, `itt19-airpods-pro`, `itt19-app-2`, `itt19-app-lx`, `itt19-appletv`, `itt19-arcade`, `itt19-arcade-2`, `itt19-arcade-lx`, `itt19-cab-2`, `itt19-cab-lx`, `itt19-ch-2`, `itt19-ch-lx`, `itt19-disneyplus`, `itt19-dplus-ab`, `itt19-dplus-ix`, `itt19-edge-2`, `itt19-edge-lx`, `itt19-fam-2`, `itt19-famous-lx`, `itt19-game-continuerow`, `itt19-game-lx`, `itt19-ig-2`, `itt19-ig-fn`, `itt19-ig-lx`, `itt19-iphone11`, `itt19-marsh`, `itt19-pop-instagram`, `itt19-pop-wikipedia`, `itt19-pop-youtube`, `itt19-stadia`, `itt19-stadia-2`, `itt19-stadia-lx`, `itt19-tiktok`, `itt19-tt-2`, `itt19-tt-lx`, `itt19-tv-2`, `itt19-tv-lx`, `itt19-w10-2`, `itt19-w10-lx`, `itt19-wiki-2`, `itt19-wiki-lx`, `itt19-xa-2`, `itt19-xa-lx`, `itt19-xb-lx`, `itt19-yt-2`, `itt19-yt-lx` |
| Primary write | `itt19-11-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 11883 |
| Hooks | `data-itt-2x-map`, `data-itt-3x-also`, `data-itt-flow-map`, `data-itt-pop3x`, `data-itt-ten-flows`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.05 `pages/whats-new.html` — What's new — 2019

| | |
|--|--|
| URL | `/years/2019/pages/whats-new.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt19-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 1201 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.06 `sites/airpodspro/index.html` — AirPods Pro — 2019

| | |
|--|--|
| URL | `/years/2019/sites/airpodspro/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-airpods-pro`, `itt19-app-2`, `itt19-app-lx`, `itt19-pop-airpodspro` |
| Primary write | `itt19-airpods-pro` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5113 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-app-req`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.07 `sites/appletv/index.html` — Apple TV+ — 2019

| | |
|--|--|
| URL | `/years/2019/sites/appletv/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-appletv`, `itt19-pop-appletv`, `itt19-tv-2`, `itt19-tv-lx` |
| Primary write | `itt19-appletv` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5220 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-tv-pick`, `data-tv-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.08 `sites/arcade/index.html` — Apple Arcade — 2019

| | |
|--|--|
| URL | `/years/2019/sites/arcade/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-arcade`, `itt19-arcade-2`, `itt19-arcade-lx`, `itt19-pop3-arcade` |
| Primary write | `itt19-arcade` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5199 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-arc-pick`, `data-arc-req`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.09 `sites/chrome/index.html` — Chrome habit — 2019 residual

| | |
|--|--|
| URL | `/years/2019/sites/chrome/index.html` |
| Machine | **leftover-official** |
| Keys in file | `itt19-ch-2`, `itt19-ch-lx`, `itt19-chrome` |
| Primary write | `itt19-ch-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5164 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-ch-req`, `data-itt-3x-also`, `data-itt-year`, `data-lo-field`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.10 `sites/disneyplus/about.html` — About Disney+ — 2019 literacy

| | |
|--|--|
| URL | `/years/2019/sites/disneyplus/about.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt19-dplus-ab` |
| Primary write | `itt19-dplus-ab` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 2987 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.11 `sites/disneyplus/home.html` — Who’s watching — Disney+ 2019

| | |
|--|--|
| URL | `/years/2019/sites/disneyplus/home.html` |
| Machine | **year-verb** |
| Keys in file | `itt19-disneyplus` |
| Primary write | `itt19-disneyplus` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3572 |
| Hooks | `data-dplus-continue`, `data-dplus-profile`, `data-dplus-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-dplus-continue] with no [data-dplus-profile]
2. Kids profile as the save
3. Play instead of Continue

**Trap (never writes):** HBO Max / Netflix as Disney+ · [data-dplus-trial] as gold

**Complete:** Pick [data-dplus-profile] · tick [data-dplus-req] (not Max) · [data-dplus-continue]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.12 `sites/disneyplus/index.html` — Disney+ join — 2019

| | |
|--|--|
| URL | `/years/2019/sites/disneyplus/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt19-dplus-ix` |
| Primary write | `itt19-dplus-ix` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3313 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.13 `sites/edge/index.html` — Chromium Edge preview — 2019 leftover

| | |
|--|--|
| URL | `/years/2019/sites/edge/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt19-edge-2`, `itt19-edge-lx`, `itt19-edge-preview` |
| Primary write | `itt19-edge-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4357 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-ed19-pick`, `data-ed19-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.14 `sites/fortnite/marshmello.html` — Marshmello — 2019 leftover

| | |
|--|--|
| URL | `/years/2019/sites/fortnite/marshmello.html` |
| Machine | **leftover-official** |
| Keys in file | `itt19-marsh`, `itt19-marshmello` |
| Primary write | `itt19-marsh` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4077 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap`, `data-mm-req` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.15 `sites/instagram/index.html` — Instagram hide likes — 2019 leftover

| | |
|--|--|
| URL | `/years/2019/sites/instagram/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-ig-2`, `itt19-ig-fn`, `itt19-ig-lx`, `itt19-pop-instagram` |
| Primary write | `itt19-ig-2` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 6394 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.16 `sites/iphone/iphone11.html` — iPhone 11 — 2019

| | |
|--|--|
| URL | `/years/2019/sites/iphone/iphone11.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-11-2`, `itt19-11-lx`, `itt19-iphone11`, `itt19-pop-iphone11` |
| Primary write | `itt19-11-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5319 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-ip11-pick`, `data-ip11-req`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.17 `sites/playable/extra-a.html` — Who’s watch — 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/extra-a.html` |
| Machine | **playable** |
| Keys in file | `itt19-game-whoswatch`, `itt19-xa-2`, `itt19-xa-lx` |
| Primary write | `itt19-game-whoswatch` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 5457 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-mx-field`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.18 `sites/playable/extra-b.html` — Trial trap — 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/extra-b.html` |
| Machine | **playable** |
| Keys in file | `itt19-game-trialtrap`, `itt19-xb-lx` |
| Primary write | `itt19-game-trialtrap` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 4535 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-mx-field`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.19 `sites/playable/extra-c.html` — Row Extra — 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/extra-c.html` |
| Machine | **playable** |
| Keys in file | `itt19-game-rowextra` |
| Primary write | `itt19-game-rowextra` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3325 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.20 `sites/playable/extra-d.html` — Stadia Wait — 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/extra-d.html` |
| Machine | **playable** |
| Keys in file | `itt19-game-stadiawait` |
| Primary write | `itt19-game-stadiawait` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3378 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-hold-ms`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.21 `sites/playable/extra-e.html` — Arcade Card — 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/extra-e.html` |
| Machine | **playable** |
| Keys in file | `itt19-game-arcadecard` |
| Primary write | `itt19-game-arcadecard` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3389 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.22 `sites/playable/famous.html` — Famous games · 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/famous.html` |
| Machine | **playable** |
| Keys in file | `itt19-fam-2`, `itt19-famous-lx`, `itt19-game-breakout`, `itt19-game-snake` |
| Primary write | `itt19-fam-2` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 5512 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.23 `sites/playable/game.html` — Continue Row — 2019

| | |
|--|--|
| URL | `/years/2019/sites/playable/game.html` |
| Machine | **playable** |
| Keys in file | `itt19-game-continuerow`, `itt19-game-lx` |
| Primary write | `itt19-game-continuerow` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 4460 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-cr-continue`, `data-cr-profile`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.24 `sites/playable/index.html` — 2019 playables

| | |
|--|--|
| URL | `/years/2019/sites/playable/index.html` |
| Machine | **playable** |
| Keys in file | `itt19-cab-2`, `itt19-cab-lx` |
| Primary write | `itt19-cab-2` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 4445 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-itt-year-extras`, `data-itt-year-more` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.25 `sites/stadia/index.html` — Stadia — 2019

| | |
|--|--|
| URL | `/years/2019/sites/stadia/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-pop3-stadia`, `itt19-stadia`, `itt19-stadia-2`, `itt19-stadia-lx` |
| Primary write | `itt19-pop3-stadia` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5272 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-stadia-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.26 `sites/tiktok/index.html` — TikTok For You — 2019 leftover

| | |
|--|--|
| URL | `/years/2019/sites/tiktok/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-pop3-tiktok`, `itt19-tiktok`, `itt19-tt-2`, `itt19-tt-lx` |
| Primary write | `itt19-pop3-tiktok` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 6554 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-field`, `data-popular-req`, `data-require-field`, `data-require-field-min`, `data-tt-caption`, `data-tt-post` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.27 `sites/wikipedia/index.html` — Wikipedia — 2019 leftover

| | |
|--|--|
| URL | `/years/2019/sites/wikipedia/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-pop-wikipedia`, `itt19-wiki-2`, `itt19-wiki-lx` |
| Primary write | `itt19-pop-wikipedia` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 5417 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.28 `sites/windows10/index.html` — Windows 10 residual — 2019

| | |
|--|--|
| URL | `/years/2019/sites/windows10/index.html` |
| Machine | **leftover-official** |
| Keys in file | `itt19-w10-2`, `itt19-w10-lx`, `itt19-win10` |
| Primary write | `itt19-w10-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5098 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap`, `data-w10-req` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.29 `sites/youtube/index.html` — YouTube — 2019 leftover

| | |
|--|--|
| URL | `/years/2019/sites/youtube/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt19-pop-youtube`, `itt19-yt-2`, `itt19-yt-lx` |
| Primary write | `itt19-pop-youtube` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 5571 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2019"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

## 9. Playables

| File | Role | Incomplete | Complete |
|------|------|------------|----------|
| `sites/playable/game.html` | official-10 year game | Finish no Start | Start + acts + Finish |
| `game-2.html` … `game-5.html` | extra cabinets | Finish no Start | Start + acts + Finish |
| `famous.html` | leftover famous · not a 3rd official cabinet | empty | leftover famous key |
| `extra-a.html` · `extra-b.html` | minute extras | Finish no Start | year-true extra |
| `sites/playable/extra-c.html` | extra-c **Row Extra** `itt19-game-rowextra` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-d.html` | extra-d **Stadia Wait** `itt19-game-stadiawait` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-e.html` | extra-e **Arcade Card** `itt19-game-arcadecard` | Finish no Start · `?test=1` still honest | Start + goods + Finish |

---

## 10. 3× densify checklist (when `densify 2019`)

1. Recite star `itt19-disneyplus` · guided 6 · bans.
2. Count HTML. Now **29**. Stop adding rooms at **120 HTML**.
3. Confirm L2/L3/L4 files exist and are **machines**, not costume doors.
4. Add L5 + L6 + L7 (9 dests) as leftover-pop machines. Unique slugs.
5. Add 9 more dest-pages (about / second URL) listed in L5–L7 about rows — or extra pages on existing rooms. Total leftover dests **27**.
6. Official 10: each whenKey writes. Replace plaque-only.
7. Every leftover dest: 3 incomplete + 1 trap + 1 complete.
8. `python3 scripts/build-3x-links.py` · dest also ≥3 · 0 marked 404s.
9. Guided still 6. Star unmoved. Neighbor prefix empty.
10. Prove: `python3 scripts/check-all-years.py` · one-thing 2019 · leftover-official · year-3x3 · 3x-links · extra-cde.

---

## 11. Shared laws (reprint)

1. Incomplete REAL never writes.
2. Prefix `itt19-*` only.
3. Never invent brand pixels. No ripped weights.
4. Guided `<ol>` exactly 6.
5. Star dest + key do not move.
6. Traps never write.
7. After new rooms: `python3 scripts/build-3x-links.py`.
8. No ILS June websites digit after 2018.
9. Lean first (~50 HTML) then 3× densify. Do not start at 120.

