# 2013 — every flow · minute · 3× densify

**Date:** 2026-08-24  
**Parent corpus:** [`../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md`](../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md)  
**Status:** implement **only** when you say `implement 2013` or `densify 2013`. Git only if asked.

---

## 0. Lock

| | |
|--|--|
| Star | Vine hold 6s → post |
| Chip | ★ One-thing · Vine 6s REAL |
| href | `sites/vine/record.html` |
| Key | `itt13-vine-posts` |
| Shell | Win7/8 + Chrome habit |
| Thesis | The loop is 6 seconds. Stories and iOS 7 are leftovers. |
| Scale | ILS June ~673 million (table still live) |
| Bans | IG Stories (2016), Reels, TikTok |
| Disk now | **35 HTML** · **18 site folders** |
| 3× target | **90–120 HTML** · **45–60 rooms** · **45–60 completable flows** |
| Guided `<ol>` | **exactly 6** |
| Prefix | `itt13-*` only |

**3× vs rest of the museum:** do **not** 3× 2008’s 345 HTML. 3× **this lean door**. Current lean ~15–20 completable flows → **45–60**. Leftover dests 9 → **27**. Dest also-stamps → **100% dests, ≥3 live exits**.

---

## 1. Align (recite before any edit)

```
hero  =  years/2013/sites/vine/record.html
      =  pages/home.html data-ott-one-thing="2013"
      =  flowTrails["2013"][0].href
key   =  itt13-vine-posts
```

Star dest and key **do not move**. Guided count stays 6. Neighbor prefixes `itt12-*` / `itt14-*` stay empty after every write.

---

## 2. Gold minute (the one-thing)

**URL:** `/years/2013/sites/vine/record.html`

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt13-vine-posts")` | — |
| Incomplete 1 | Click [data-vn13-post] without holding [data-vn13-hold] to 6s | **no** |
| Incomplete 2 | Hold but skip [data-vn13-req] | **no** |
| Incomplete 3 | Empty post | **no** |
| Trap | [data-vn13-trap] · IG Stories as 2013 gold | **no** |
| Complete | Hold [data-vn13-hold] until clock 6s · tick [data-vn13-req] · [data-vn13-post] | **`itt13-vine-posts`** |
| Payload | real:true · year:"2013" · sixSeconds:true | must include `real` + `year:"2013"` |
| Next | [data-next-flow] → IG Video 15s | hidden until key exists |
| Reload | key still present · Next still visible | yes |
| Neighbor | no other year prefix | — |

---

## 3. Guided 6 (count is the test)

| # | Copy | href | Pass |
|--:|------|------|------|
| 1 | About 2013 | `pages/about.html` | HTTP 200 · dual scale · bans |
| 2 | Vine 6s | `sites/vine/record.html` | HTTP 200 · hold then post |
| 3 | IG Video | `sites/instagram/video.html` | HTTP 200 · 15s leftover |
| 4 | Stories | `sites/snapchat/story.html` | HTTP 200 · 24h leftover |
| 5 | iOS 7 | `sites/iphone/ios7.html` | HTTP 200 · flat leftover |
| 6 | Year flow map | `pages/map.html` | HTTP 200 · map |

`#ott-guided-2013 ol > li` **= 6**. A 7th `<li>` fails the year. Chips / 3× / 5× sit **outside** the `<ol>`.

---

## 4. Official 10 — every stop is a writer

Each `whenKey` in `flow-trails.js` must **write**. Load-only / plaque-only is a hole. n=1 uses the **Gold minute**. Others: leftover-official panel if present, else dest-field until S8 grows a year-true verb.

| n | Name | href | whenKey | Incomplete (never writes) | Complete | Next |
|--:|------|------|---------|---------------------------|----------|------|
| 1 | Vine 6s | `sites/vine/record.html` | `itt13-vine-posts` | use Gold minute — not dest-field | Gold complete | `sites/instagram/video.html` IG Video 15s |
| 2 | IG Video | `sites/instagram/video.html` | `itt13-ig-posts` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/snapchat/story.html` Snap Stories |
| 3 | Stories | `sites/snapchat/story.html` | `itt13-snap-story` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/iphone/ios7.html` iOS 7 |
| 4 | iOS 7 | `sites/iphone/ios7.html` | `itt13-ios7` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/iphone/touchid.html` Touch ID |
| 5 | Touch ID | `sites/iphone/touchid.html` | `itt13-touchid` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/snowden/index.html` Snowden |
| 6 | Snowden | `sites/snowden/index.html` | `itt13-snowden-ack` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/telegram/index.html` Telegram |
| 7 | Telegram | `sites/telegram/index.html` | `itt13-telegram-chat` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/medium/index.html` Medium |
| 8 | Yahoo×Tumblr | `sites/tumblr/index.html` | `itt13-tumblr-yahoo` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/vine/record.html` Vine 6s |
| 9 | Win8.1 | `sites/windows81/index.html` | `itt13-win81` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/chrome/index.html` Chrome |
| 10 | Loop Six | `sites/playable/game.html` | `itt13-game-loopsix` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/vine/record.html` Vine 6s |

After each official write: `[data-next-flow][data-next-when-key]` visible · HTTP 200 · chip on home **still** the star.

---

## 5. Leftover layers — 9 on disk + 18 to add = 27 dests

L2∩L3∩L4 slugs must stay **empty**. L5∩L6∩L7 slugs must stay **empty**. L5–L7 do **not** exist until densify. Do not clone an L3 slug into L4.

### L2 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/askfm/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-pop-askfm` |
| `sites/whisper/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-pop-whisper` |
| `sites/youtube/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-pop-youtube` |

### L3 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/chrome/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-chrome` |
| `sites/snowden/index.html` | leftover-official | Click [data-lo-trap] — never writes | Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save] | [data-lo-trap] · costume pick | `itt13-snowden-ack` |
| `sites/telegram/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-telegram-chat` |

### L4 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/reddit/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-pop3-reddit` |
| `sites/facebook/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-pop3-facebook` |
| `sites/twitter/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt13-pop3-twitter` |

### L5 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/healthcare/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop4-healthcare` |
| `sites/ouya/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop4-ouya` |
| `sites/xboxone/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop4-xboxone` |

### L6 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/vine/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop5-vine` |
| `sites/snapchat/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop5-snapchat` |
| `sites/ios7/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop5-ios7` |

### L7 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/tumblr/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop6-tumblr` |
| `sites/touchid/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop6-touchid` |
| `sites/telegram/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt13-pop6-telegram` |

L2∩L3∩L4 intersection: `∅`. L5∩L6∩L7 intersection: `∅`.

---

## 6. Popular F1–F5 (matrix)

| F | key | path | kind | field | Incomplete | Complete | Next |
|---|-----|------|------|-------|------------|----------|------|
| F1 | `itt13-tweets` | `/years/2013/sites/twitter/index.html` | new | tweet | empty field / 0 ticks / trap | pick + honesty + go | `../vine/index.html` |
| F2 | `itt13-google` | `/years/2013/sites/chrome/index.html` | new | query | empty field / 0 ticks / trap | pick + honesty + go | `../../pages/about.html` |
| F3 | `itt13-wiki` | `/years/2013/sites/youtube/index.html` | reuse | — | empty field / 0 ticks / trap | pick + honesty + go | `../vine/index.html` |
| F4 | `itt13-vine` | `/years/2013/sites/vine/index.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `—` |
| F5 | `itt13-snap` | `/years/2013/sites/snapchat/story.html` | reuse | — | empty field / 0 ticks / trap | pick + honesty + go | `../vine/index.html` |

Plaque-only dests that the matrix expects must grow `data-itt-popular-save` **or** a leftover-pop machine. Never run unscoped `build-popular-flows.py`.

---

## 7. Leftover-official machines (e2e matrix)

e2e: trap → 0 ticks → ticks only → wrong pick → empty field → complete. Neighbor year keys stay empty.

| href | key | needPick | field | placeholder | Incomplete | Complete |
|------|-----|----------|-------|-------------|------------|----------|
| `sites/iphone/ios7.html` | `itt13-ios7` | `flat` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `flat` + field + `[data-lo-save]` |
| `sites/iphone/touchid.html` | `itt13-touchid` | `hold` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `hold` + field + `[data-lo-save]` |
| `sites/snowden/index.html` | `itt13-snowden-ack` | `doc` | yes | `leftover doc` | trap / 0 ticks / wrong pick / empty field | req + pick `doc` + field + `[data-lo-save]` |
| `sites/tumblr/index.html` | `itt13-tumblr-yahoo` | `dash` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `dash` + field + `[data-lo-save]` |
| `sites/windows81/index.html` | `itt13-win81` | `start` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `start` + field + `[data-lo-save]` |
| `sites/instagram/video.html` | `itt13-ig-posts` | `sec` | no | `—` | trap / 0 ticks / wrong pick / empty field | req + pick `sec` + field + `[data-lo-save]` |

---

## 8. EVERY dest on disk (minute)

35 HTML files (error pages skipped). Each row is a flow. Thin / plaque dests are **holes** — S8.

Machine mix on disk: {'thin-door': 11, 'leftover-pop': 8, 'leftover-official': 6, 'playable': 8, 'dest-field-4x': 1, 'year-verb': 1}

### D.01 `index.html` — Win7 residual — 2013

| | |
|--|--|
| URL | `/years/2013/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt13-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 20992 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.02 `pages/about.html` — About the Web in 2013

| | |
|--|--|
| URL | `/years/2013/pages/about.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt13-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 2428 |
| Hooks | `data-itt-action-status`, `data-itt-real-save`, `data-itt-year`, `data-min-req`, `data-thesis-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.03 `pages/home.html` — Welcome to the World Wide Web — 2013

| | |
|--|--|
| URL | `/years/2013/pages/home.html` |
| Machine | **thin-door** |
| Keys in file | `itt13-ios7-lx`, `itt13-sn-lx`, `itt13-st-lx`, `itt13-tb-lx`, `itt13-tg-lx`, `itt13-vn-lx` |
| Primary write | `itt13-ios7-lx` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 5189 |
| Hooks | `data-itt-pop-3x3`, `data-itt-pop-more`, `data-itt-pop3x`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.04 `pages/map.html` — 2013 — UX flow map

| | |
|--|--|
| URL | `/years/2013/pages/map.html` |
| Machine | **thin-door** |
| Keys in file | `itt13-ios7-lx`, `itt13-sn-lx`, `itt13-st-lx`, `itt13-tb-lx`, `itt13-tg-lx`, `itt13-vn-lx` |
| Primary write | `itt13-ios7-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4194 |
| Hooks | `data-itt-2x-map`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.05 `pages/whats-new.html` — What's New — 2013

| | |
|--|--|
| URL | `/years/2013/pages/whats-new.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt13-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 1078 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.06 `sites/askfm/index.html` — Ask.fm — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/askfm/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop-askfm` |
| Primary write | `itt13-pop-askfm` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2152 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.07 `sites/chrome/index.html` — Chrome habit — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/chrome/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-chrome`, `itt13-pop-chrome` |
| Primary write | `itt13-chrome` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4730 |
| Hooks | `data-ch13-field`, `data-ch13-pick`, `data-ch13-req`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-field`, `data-popular-req`, `data-require-field`, `data-require-field-min` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.08 `sites/facebook/index.html` — Facebook leftover — 2013

| | |
|--|--|
| URL | `/years/2013/sites/facebook/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop3-facebook` |
| Primary write | `itt13-pop3-facebook` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3465 |
| Hooks | `data-fb13-trap`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.09 `sites/healthcare/index.html` — HealthCare.gov — Oct 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/healthcare/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt13-MISSING` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 2035 |
| Hooks | `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.10 `sites/healthcare/status.html` — HealthCare.gov status — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/healthcare/status.html` |
| Machine | **thin-door** |
| Keys in file | `itt13-healthcare` |
| Primary write | `itt13-healthcare` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2155 |
| Hooks | `data-hc13-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.11 `sites/instagram/video.html` — Instagram video — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/instagram/video.html` |
| Machine | **leftover-official** |
| Keys in file | `itt13-ig-posts` |
| Primary write | `itt13-ig-posts` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3103 |
| Hooks | `data-ig13-req`, `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.12 `sites/iphone/5c.html` — iPhone 5c leftover — 2013

| | |
|--|--|
| URL | `/years/2013/sites/iphone/5c.html` |
| Machine | **thin-door** |
| Keys in file | `itt13-iphone5c` |
| Primary write | `itt13-iphone5c` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 2775 |
| Hooks | `data-5c-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.13 `sites/iphone/ios7.html` — iOS 7 — 2013

| | |
|--|--|
| URL | `/years/2013/sites/iphone/ios7.html` |
| Machine | **leftover-official** |
| Keys in file | `itt13-ios7`, `itt13-ios7-lx` |
| Primary write | `itt13-ios7` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 4182 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-io13-req`, `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.14 `sites/iphone/touchid.html` — Touch ID — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/iphone/touchid.html` |
| Machine | **leftover-official** |
| Keys in file | `itt13-touchid` |
| Primary write | `itt13-touchid` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3128 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap`, `data-td13-req` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.15 `sites/medium/index.html` — Medium leftover — 2013

| | |
|--|--|
| URL | `/years/2013/sites/medium/index.html` |
| Machine | **thin-door** |
| Keys in file | `itt13-medium` |
| Primary write | `itt13-medium` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2333 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-med13-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.16 `sites/playable/extra-a.html` — Six leftover — 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/extra-a.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-six` |
| Primary write | `itt13-game-six` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 1896 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-xa-go`, `data-xa-trap` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.17 `sites/playable/extra-b.html` — Stories trap — 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/extra-b.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-stories` |
| Primary write | `itt13-game-stories` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 1913 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-xb-go`, `data-xb-trap` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.18 `sites/playable/extra-c.html` — Loop Spare — 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/extra-c.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-loopspare` |
| Primary write | `itt13-game-loopspare` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3313 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.19 `sites/playable/extra-d.html` — Story Hold — 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/extra-d.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-storyhold` |
| Primary write | `itt13-game-storyhold` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3376 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-hold-ms`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.20 `sites/playable/extra-e.html` — Flat Tap — 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/extra-e.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-flattap` |
| Primary write | `itt13-game-flattap` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3333 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.21 `sites/playable/famous.html` — Famous games · 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/famous.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-memory`, `itt13-game-snake` |
| Primary write | `itt13-game-memory` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3736 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.22 `sites/playable/game.html` — Loop Six — 2013

| | |
|--|--|
| URL | `/years/2013/sites/playable/game.html` |
| Machine | **playable** |
| Keys in file | `itt13-game-loopsix` |
| Primary write | `itt13-game-loopsix` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 2432 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-peg-trap` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.23 `sites/playable/index.html` — 2013 playable

| | |
|--|--|
| URL | `/years/2013/sites/playable/index.html` |
| Machine | **playable** |
| Keys in file | _none harvested_ |
| Primary write | `itt13-MISSING` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 2450 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-itt-year-extras`, `data-itt-year-more` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.24 `sites/reddit/index.html` — reddit — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/reddit/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop3-reddit` |
| Primary write | `itt13-pop3-reddit` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3393 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-rd13-trap` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.25 `sites/snapchat/story.html` — Snapchat Stories — 2013

| | |
|--|--|
| URL | `/years/2013/sites/snapchat/story.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt13-snap-story`, `itt13-st-lx` |
| Primary write | `itt13-snap-story` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 4278 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-popular-req`, `data-sn13-post`, `data-sn13-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.26 `sites/snowden/index.html` — Snowden — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/snowden/index.html` |
| Machine | **leftover-official** |
| Keys in file | `itt13-pop-snowden`, `itt13-sn-lx`, `itt13-snowden-ack` |
| Primary write | `itt13-pop-snowden` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5074 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-lo-field`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-sd13-req` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.27 `sites/telegram/chat.html` — Telegram chat — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/telegram/chat.html` |
| Machine | **thin-door** |
| Keys in file | `itt13-telegram-chat` |
| Primary write | `itt13-telegram-chat` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2284 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-tg13-log`, `data-tg13-req`, `data-tg13-send` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.28 `sites/telegram/index.html` — Telegram — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/telegram/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop-telegram`, `itt13-telegram-chat`, `itt13-tg-lx` |
| Primary write | `itt13-pop-telegram` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 4276 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-tg13-req`, `data-tg13-send` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.29 `sites/tumblr/index.html` — Yahoo × Tumblr — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/tumblr/index.html` |
| Machine | **leftover-official** |
| Keys in file | `itt13-tb-lx`, `itt13-tumblr-yahoo` |
| Primary write | `itt13-tb-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4018 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap`, `data-tb13-req` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.30 `sites/twitter/index.html` — Twitter leftover — 2013

| | |
|--|--|
| URL | `/years/2013/sites/twitter/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop3-twitter` |
| Primary write | `itt13-pop3-twitter` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4601 |
| Hooks | `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-field`, `data-popular-req`, `data-require-field`, `data-require-field-min`, `data-tw13-trap` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.31 `sites/vine/index.html` — Vine feed leftover — 2013

| | |
|--|--|
| URL | `/years/2013/sites/vine/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt13-MISSING` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 1936 |
| Hooks | `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.32 `sites/vine/record.html` — Vine — 2013

| | |
|--|--|
| URL | `/years/2013/sites/vine/record.html` |
| Machine | **year-verb** |
| Keys in file | `itt13-vine-posts`, `itt13-vn-lx` |
| Primary write | `itt13-vine-posts` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3273 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-vn13-hold`, `data-vn13-post`, `data-vn13-req`, `data-vn13-trap` |

**Incomplete (never writes)**

1. Click [data-vn13-post] without holding [data-vn13-hold] to 6s
2. Hold but skip [data-vn13-req]
3. Empty post

**Trap (never writes):** [data-vn13-trap] · IG Stories as 2013 gold

**Complete:** Hold [data-vn13-hold] until clock 6s · tick [data-vn13-req] · [data-vn13-post]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.33 `sites/whisper/index.html` — Whisper — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/whisper/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop-whisper` |
| Primary write | `itt13-pop-whisper` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2133 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.34 `sites/windows81/index.html` — Windows 8.1 — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/windows81/index.html` |
| Machine | **leftover-official** |
| Keys in file | `itt13-win81` |
| Primary write | `itt13-win81` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3123 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-lo-pick`, `data-lo-req`, `data-lo-save`, `data-lo-trap`, `data-w813-req` |

**Incomplete (never writes)**

1. Click [data-lo-trap] — never writes
2. Click [data-lo-save] with 0 [data-lo-req]
3. Ticks only, no required [data-lo-pick] / empty [data-lo-field]
4. Wrong [data-lo-pick] (not needPick)

**Trap (never writes):** [data-lo-trap] · costume pick

**Complete:** Tick every [data-lo-req] · required pick · field to placeholder if present · [data-lo-save]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.35 `sites/youtube/index.html` — YouTube leftover — 2013 leftover

| | |
|--|--|
| URL | `/years/2013/sites/youtube/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt13-pop-youtube` |
| Primary write | `itt13-pop-youtube` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3119 |
| Hooks | `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2013"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

## 9. Playables

| File | Role | Incomplete | Complete |
|------|------|------------|----------|
| `sites/playable/game.html` | official-10 year game | Finish no Start | Start + acts + Finish |
| `game-2.html` … `game-5.html` | extra cabinets | Finish no Start | Start + acts + Finish |
| `famous.html` | leftover famous · not a 3rd official cabinet | empty | leftover famous key |
| `extra-a.html` · `extra-b.html` | minute extras | Finish no Start | year-true extra |
| `sites/playable/extra-c.html` | extra-c **Loop Spare** `itt13-game-loopspare` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-d.html` | extra-d **Story Hold** `itt13-game-storyhold` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-e.html` | extra-e **Flat Tap** `itt13-game-flattap` | Finish no Start · `?test=1` still honest | Start + goods + Finish |

---

## 10. 3× densify checklist (when `densify 2013`)

1. Recite star `itt13-vine-posts` · guided 6 · bans.
2. Count HTML. Now **35**. Stop adding rooms at **120 HTML**.
3. Confirm L2/L3/L4 files exist and are **machines**, not costume doors.
4. Add L5 + L6 + L7 (9 dests) as leftover-pop machines. Unique slugs.
5. Add 9 more dest-pages (about / second URL) listed in L5–L7 about rows — or extra pages on existing rooms. Total leftover dests **27**.
6. Official 10: each whenKey writes. Replace plaque-only.
7. Every leftover dest: 3 incomplete + 1 trap + 1 complete.
8. `python3 scripts/build-3x-links.py` · dest also ≥3 · 0 marked 404s.
9. Guided still 6. Star unmoved. Neighbor prefix empty.
10. Prove: `python3 scripts/check-all-years.py` · one-thing 2013 · leftover-official · year-3x3 · 3x-links · extra-cde.

---

## 11. Shared laws (reprint)

1. Incomplete REAL never writes.
2. Prefix `itt13-*` only.
3. Never invent brand pixels. No ripped weights.
4. Guided `<ol>` exactly 6.
5. Star dest + key do not move.
6. Traps never write.
7. After new rooms: `python3 scripts/build-3x-links.py`.
8. No ILS June websites digit after 2018.
9. Lean first (~50 HTML) then 3× densify. Do not start at 120.

