# 2020 — every flow · minute · 3× densify

**Date:** 2026-08-24  
**Parent corpus:** [`../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md`](../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md)  
**Status:** implement **only** when you say `implement 2020` or `densify 2020`. Git only if asked.

---

## 0. Lock

| | |
|--|--|
| Star | Zoom mute → chat → Leave |
| Chip | ★ One-thing · Zoom mute → leave REAL |
| href | `sites/zoom/meeting.html` |
| Key | `itt20-zoom` |
| Shell | Win10 + Chrome habit |
| Thesis | Join is the trap. Participants, not users. GPT-3 is a waitlist. |
| Scale | No ILS June · ITU 4.1B / 53.6% · 10.2% look-back |
| Bans | ChatGPT as 2020 product, 300 million users copy, June ILS 2020 websites |
| Disk now | **44 HTML** · **24 site folders** |
| 3× target | **90–120 HTML** · **45–60 rooms** · **45–60 completable flows** |
| Guided `<ol>` | **exactly 6** |
| Prefix | `itt20-*` only |

**3× vs rest of the museum:** do **not** 3× 2008’s 345 HTML. 3× **this lean door**. Current lean ~15–20 completable flows → **45–60**. Leftover dests 9 → **27**. Dest also-stamps → **100% dests, ≥3 live exits**.

---

## 1. Align (recite before any edit)

```
hero  =  years/2020/sites/zoom/meeting.html
      =  pages/home.html data-ott-one-thing="2020"
      =  flowTrails["2020"][0].href
key   =  itt20-zoom
```

Star dest and key **do not move**. Guided count stays 6. Neighbor prefixes `itt19-*` / `itt21-*` stay empty after every write.

---

## 2. Gold minute (the one-thing)

**URL:** `/years/2020/sites/zoom/meeting.html`

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt20-zoom")` | — |
| Incomplete 1 | Leave with 0 [data-zoom-req] | **no** |
| Incomplete 2 | Ticks + Leave, not muted ([data-zoom-mute] aria-pressed != true) | **no** |
| Incomplete 3 | Ticks + Mute + Leave, empty [data-zoom-chat] / no Send | **no** |
| Trap | Join on sites/zoom/index.html · ChatGPT as 2020 product | **no** |
| Complete | Tick both [data-zoom-req] · Mute · type ≥2 chars · [data-zoom-send] · [data-zoom-leave] | **`itt20-zoom`** |
| Payload | real:true · year:"2020" · participantsNotUsers:true · muted:true · left:true | must include `real` + `year:"2020"` |
| Next | [data-next-flow] → Reels 15s | hidden until key exists |
| Reload | key still present · Next still visible | yes |
| Neighbor | no other year prefix | — |

---

## 3. Guided 6 (count is the test)

| # | Copy | href | Pass |
|--:|------|------|------|
| 1 | About 2020 | `pages/about.html` | HTTP 200 · participants · no ChatGPT product |
| 2 | Zoom meeting | `sites/zoom/meeting.html` | HTTP 200 · mute → chat → Leave |
| 3 | Reels 15s | `sites/reels/index.html` | HTTP 200 · leftover |
| 4 | GPT-3 waitlist | `sites/openai/index.html` | HTTP 200 · waitlist not chat |
| 5 | Flash EOL | `sites/flash/index.html` | HTTP 200 · 31 Dec leftover |
| 6 | Year flow map | `pages/map.html` | HTTP 200 · map |

`#ott-guided-2020 ol > li` **= 6**. A 7th `<li>` fails the year. Chips / 3× / 5× sit **outside** the `<ol>`.

---

## 4. Official 10 — every stop is a writer

Each `whenKey` in `flow-trails.js` must **write**. Load-only / plaque-only is a hole. n=1 uses the **Gold minute**. Others: leftover-official panel if present, else dest-field until S8 grows a year-true verb.

| n | Name | href | whenKey | Incomplete (never writes) | Complete | Next |
|--:|------|------|---------|---------------------------|----------|------|
| 1 | Zoom mute | `sites/zoom/meeting.html` | `itt20-zoom` | use Gold minute — not dest-field | Gold complete | `sites/reels/index.html` Reels 15s |
| 2 | Reels 15s | `sites/reels/index.html` | `itt20-reels` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/openai/index.html` GPT-3 waitlist |
| 3 | GPT-3 waitlist | `sites/openai/index.html` | `itt20-gpt3` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/flash/index.html` Flash EOL |
| 4 | Flash EOL | `sites/flash/index.html` | `itt20-flash` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/tiktok/index.html` TikTok EO |
| 5 | TikTok EO | `sites/tiktok/index.html` | `itt20-tiktok-eo` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/markets/wti.html` WTI |
| 6 | WTI −$37.63 | `sites/markets/wti.html` | `itt20-wti` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/edge/index.html` Edge 79 |
| 7 | Edge 79 | `sites/edge/index.html` | `itt20-edge` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/ccpa/index.html` CCPA |
| 8 | CCPA | `sites/ccpa/index.html` | `itt20-ccpa` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/chrome/index.html` Chrome habit |
| 9 | Chrome habit | `sites/chrome/index.html` | `itt20-chrome` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/playable/game.html` Sus Vote |
| 10 | Sus Vote | `sites/playable/game.html` | `itt20-game-among` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/zoom/meeting.html` Zoom |

After each official write: `[data-next-flow][data-next-when-key]` visible · HTTP 200 · chip on home **still** the star.

---

## 5. Leftover layers — 9 on disk + 18 to add = 27 dests

L2∩L3∩L4 slugs must stay **empty**. L5∩L6∩L7 slugs must stay **empty**. L5–L7 do **not** exist until densify. Do not clone an L3 slug into L4.

### L2 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/youtube/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-pop-youtube` |
| `sites/wikipedia/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-pop-wikipedia` |
| `sites/facebook/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-pop-facebook` |

### L3 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/meet/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-meet` |
| `sites/mixer/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-mixer` |
| `sites/hbomax/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-hbomax` |

### L4 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/acnh/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-pop3-acnh` |
| `sites/astro/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-pop3-astro` |
| `sites/quibi/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt20-pop3-quibi` |

### L5 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/reels/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop4-reels` |
| `sites/gpt3/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop4-gpt3` |
| `sites/flash/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop4-flash` |

### L6 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/wti/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop5-wti` |
| `sites/edge79/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop5-edge79` |
| `sites/ccpa/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop5-ccpa` |

### L7 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/amongus/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop6-amongus` |
| `sites/zoom/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop6-zoom` |
| `sites/tiktok-eo/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt20-pop6-tiktok-eo` |

L2∩L3∩L4 intersection: `∅`. L5∩L6∩L7 intersection: `∅`.

---

## 6. Popular F1–F5 (matrix)

No `popular-flows.matrix.json` rows for 2020. Do **not** invent F-keys. Official 10 + leftover 27 cover the 3× count.

---

## 7. Leftover-official machines (e2e matrix)

No leftover-official dests stamped for 2020. Official 10 still must write via gold / 4x / leftover-pop. Adding a `[data-lo-panel]` is allowed on densify if it does not fight the star key.

---

## 8. EVERY dest on disk (minute)

44 HTML files (error pages skipped). Each row is a flow. Thin / plaque dests are **holes** — S8.

Machine mix on disk: {'thin-door': 6, 'leftover-pop': 9, 'dest-field-4x': 19, 'playable': 8, 'year-verb': 2}

### D.01 `index.html` — Chrome habit — 2020

| | |
|--|--|
| URL | `/years/2020/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt20-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 20894 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.02 `pages/about.html` — About 2020 — dual scale · bans

| | |
|--|--|
| URL | `/years/2020/pages/about.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt20-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 3249 |
| Hooks | `data-itt-real-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-thesis-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.03 `pages/home.html` — Welcome to the World Wide Web — 2020

| | |
|--|--|
| URL | `/years/2020/pages/home.html` |
| Machine | **thin-door** |
| Keys in file | `itt20-acnh-2`, `itt20-astro-2`, `itt20-cab`, `itt20-ccpa-lx`, `itt20-ch-lx`, `itt20-edge-lx`, `itt20-epic-lx`, `itt20-fam-2`, `itt20-famous-lx`, `itt20-fb-lx`, `itt20-flash-eol`, `itt20-flash-lx`, `itt20-game-lx`, `itt20-gpt-lx`, `itt20-gpt-w`, `itt20-hbo-2`, `itt20-hbo-lx`, `itt20-meet-lx`, `itt20-mixer-lx`, `itt20-pk-lx`, `itt20-quibi-2`, `itt20-reels-ab`, `itt20-reels-lx`, `itt20-reels-rc`, `itt20-shy-lx`, `itt20-tt-eo`, `itt20-tt-lx`, `itt20-tw-hk`, `itt20-wiki-lx`, `itt20-wti`, `itt20-xa`, `itt20-xb`, `itt20-yt-lx`, `itt20-zm-ab`, `itt20-zm-ix`, `itt20-zm-rc` |
| Primary write | `itt20-acnh-2` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 9630 |
| Hooks | `data-itt-pop-3x3`, `data-itt-pop-more`, `data-itt-pop3x`, `data-itt-tour`, `data-itt-year`, `data-itt-year-extras` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.04 `pages/map.html` — 2020 flow map

| | |
|--|--|
| URL | `/years/2020/pages/map.html` |
| Machine | **thin-door** |
| Keys in file | `itt20-acnh-2`, `itt20-astro-2`, `itt20-cab`, `itt20-ccpa`, `itt20-ccpa-lx`, `itt20-ch-lx`, `itt20-edge`, `itt20-edge-lx`, `itt20-epic-lx`, `itt20-fam-2`, `itt20-famous-lx`, `itt20-fb-lx`, `itt20-flash`, `itt20-flash-eol`, `itt20-flash-lx`, `itt20-game-among`, `itt20-game-lx`, `itt20-gpt-lx`, `itt20-gpt-w`, `itt20-gpt3`, `itt20-hbo-2`, `itt20-hbo-lx`, `itt20-meet-lx`, `itt20-mixer-lx`, `itt20-pk-lx`, `itt20-pop-facebook`, `itt20-pop-wikipedia`, `itt20-pop-youtube`, `itt20-quibi-2`, `itt20-reels`, `itt20-reels-ab`, `itt20-reels-lx`, `itt20-reels-rc`, `itt20-shy-lx`, `itt20-tiktok-eo`, `itt20-tt-eo`, `itt20-tt-lx`, `itt20-tw-hk`, `itt20-wiki-lx`, `itt20-wti`, `itt20-xa`, `itt20-xb`, `itt20-yt-lx`, `itt20-zm-ab`, `itt20-zm-ix`, `itt20-zm-rc`, `itt20-zoom` |
| Primary write | `itt20-acnh-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 11416 |
| Hooks | `data-itt-2x-map`, `data-itt-3x-also`, `data-itt-flow-map`, `data-itt-pop3x`, `data-itt-ten-flows`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.05 `pages/whats-new.html` — What's new — 2020

| | |
|--|--|
| URL | `/years/2020/pages/whats-new.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt20-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 1340 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.06 `sites/acnh/index.html` — ACNH leftover

| | |
|--|--|
| URL | `/years/2020/sites/acnh/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-acnh-2`, `itt20-pop3-acnh` |
| Primary write | `itt20-acnh-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3607 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.07 `sites/astro/index.html` — Astronomical leftover

| | |
|--|--|
| URL | `/years/2020/sites/astro/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-astro-2`, `itt20-pop3-astro` |
| Primary write | `itt20-astro-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3597 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.08 `sites/ccpa/index.html` — CCPA Do Not Sell

| | |
|--|--|
| URL | `/years/2020/sites/ccpa/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-ccpa`, `itt20-ccpa-lx` |
| Primary write | `itt20-ccpa` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3393 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-ccpa-pick`, `data-ccpa-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.09 `sites/chrome/index.html` — Chrome habit — 2020

| | |
|--|--|
| URL | `/years/2020/sites/chrome/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-ch-lx`, `itt20-chrome` |
| Primary write | `itt20-ch-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3414 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-ch-field`, `data-ch-pick`, `data-ch-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.10 `sites/edge/index.html` — Chromium Edge 79

| | |
|--|--|
| URL | `/years/2020/sites/edge/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-edge`, `itt20-edge-lx` |
| Primary write | `itt20-edge` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3344 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-edge-pick`, `data-edge-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.11 `sites/epic/index.html` — Fortnite leaves the stores — 13 Aug 2020

| | |
|--|--|
| URL | `/years/2020/sites/epic/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-epic`, `itt20-epic-lx` |
| Primary write | `itt20-epic` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3440 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-epic-pick`, `data-epic-req`, `data-epic-save`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.12 `sites/facebook/index.html` — Facebook — 2020 leftover

| | |
|--|--|
| URL | `/years/2020/sites/facebook/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-fb-lx`, `itt20-pop-facebook` |
| Primary write | `itt20-fb-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3579 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.13 `sites/flash/eol.html` — Flash EOL leftover

| | |
|--|--|
| URL | `/years/2020/sites/flash/eol.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-flash-eol` |
| Primary write | `itt20-flash-eol` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2567 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.14 `sites/flash/index.html` — Flash Player EOL

| | |
|--|--|
| URL | `/years/2020/sites/flash/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-flash`, `itt20-flash-lx` |
| Primary write | `itt20-flash` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3569 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-flash-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.15 `sites/hbomax/index.html` — HBO Max leftover — 27 May 2020

| | |
|--|--|
| URL | `/years/2020/sites/hbomax/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-hbo-2`, `itt20-hbo-lx`, `itt20-hbomax`, `itt20-pop-hbomax` |
| Primary write | `itt20-hbo-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5304 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-hbo-pick`, `data-hbo-req`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.16 `sites/markets/wti.html` — WTI negative — 20 Apr 2020

| | |
|--|--|
| URL | `/years/2020/sites/markets/wti.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-wti` |
| Primary write | `itt20-wti` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3500 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-wti-pick`, `data-wti-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.17 `sites/meet/index.html` — Meet leftover — Zoom pair

| | |
|--|--|
| URL | `/years/2020/sites/meet/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-meet`, `itt20-meet-lx`, `itt20-pop-meet` |
| Primary write | `itt20-meet` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4306 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-meet-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.18 `sites/mixer/index.html` — Mixer leftover — 22 Jul 2020

| | |
|--|--|
| URL | `/years/2020/sites/mixer/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-mixer`, `itt20-mixer-lx`, `itt20-pop-mixer` |
| Primary write | `itt20-mixer` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4432 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-mx-pick`, `data-mx-req`, `data-mx-save`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.19 `sites/openai/index.html` — GPT-3 API waitlist

| | |
|--|--|
| URL | `/years/2020/sites/openai/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-gpt-lx`, `itt20-gpt3` |
| Primary write | `itt20-gpt-lx` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3395 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-gpt-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.20 `sites/openai/wait.html` — GPT-3 wait leftover

| | |
|--|--|
| URL | `/years/2020/sites/openai/wait.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-gpt-w` |
| Primary write | `itt20-gpt-w` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2494 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.21 `sites/peacock/index.html` — Peacock leftover — 15 Jul 2020

| | |
|--|--|
| URL | `/years/2020/sites/peacock/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-peacock`, `itt20-pk-lx` |
| Primary write | `itt20-peacock` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3320 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pk-pick`, `data-pk-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.22 `sites/playable/extra-a.html` — Mute drill — 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/extra-a.html` |
| Machine | **playable** |
| Keys in file | `itt20-extra-a`, `itt20-xa` |
| Primary write | `itt20-extra-a` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3021 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.23 `sites/playable/extra-b.html` — Participants-not-users — 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/extra-b.html` |
| Machine | **playable** |
| Keys in file | `itt20-extra-b`, `itt20-xb` |
| Primary write | `itt20-extra-b` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3034 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.24 `sites/playable/extra-c.html` — Mute Round — 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/extra-c.html` |
| Machine | **playable** |
| Keys in file | `itt20-game-muteround` |
| Primary write | `itt20-game-muteround` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3325 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.25 `sites/playable/extra-d.html` — Reel 15 — 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/extra-d.html` |
| Machine | **playable** |
| Keys in file | `itt20-game-reel15` |
| Primary write | `itt20-game-reel15` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3366 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-hold-ms`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.26 `sites/playable/extra-e.html` — Flash Brick — 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/extra-e.html` |
| Machine | **playable** |
| Keys in file | `itt20-game-flashbrick` |
| Primary write | `itt20-game-flashbrick` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3397 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.27 `sites/playable/famous.html` — Famous games · 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/famous.html` |
| Machine | **playable** |
| Keys in file | `itt20-fam-2`, `itt20-famous-lx`, `itt20-game-breakout`, `itt20-game-memory` |
| Primary write | `itt20-fam-2` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 5495 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.28 `sites/playable/game.html` — Sus Vote — 2020

| | |
|--|--|
| URL | `/years/2020/sites/playable/game.html` |
| Machine | **playable** |
| Keys in file | `itt20-game-among`, `itt20-game-lx` |
| Primary write | `itt20-game-among` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 4266 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-sus-pick`, `data-sus-req` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.29 `sites/playable/index.html` — 2020 playables

| | |
|--|--|
| URL | `/years/2020/sites/playable/index.html` |
| Machine | **playable** |
| Keys in file | `itt20-cab` |
| Primary write | `itt20-cab` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3528 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-itt-year-extras`, `data-itt-year-more` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.30 `sites/quibi/index.html` — Quibi leftover

| | |
|--|--|
| URL | `/years/2020/sites/quibi/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-pop3-quibi`, `itt20-quibi-2` |
| Primary write | `itt20-pop3-quibi` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3519 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.31 `sites/reels/about.html` — About Reels

| | |
|--|--|
| URL | `/years/2020/sites/reels/about.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-reels-ab` |
| Primary write | `itt20-reels-ab` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 2598 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.32 `sites/reels/index.html` — Instagram Reels — 15 seconds

| | |
|--|--|
| URL | `/years/2020/sites/reels/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-reels`, `itt20-reels-lx` |
| Primary write | `itt20-reels` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3582 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-reels-post`, `data-reels-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.33 `sites/reels/record.html` — Reels record leftover

| | |
|--|--|
| URL | `/years/2020/sites/reels/record.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-reels-rc` |
| Primary write | `itt20-reels-rc` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 2577 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.34 `sites/spacehey/index.html` — SpaceHey leftover — 26 Nov 2020

| | |
|--|--|
| URL | `/years/2020/sites/spacehey/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-shy-lx`, `itt20-spacehey` |
| Primary write | `itt20-shy-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3311 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-shy-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.35 `sites/tiktok/eo.html` — EO 13942 leftover

| | |
|--|--|
| URL | `/years/2020/sites/tiktok/eo.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-tt-eo` |
| Primary write | `itt20-tt-eo` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2493 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.36 `sites/tiktok/index.html` — TikTok EO leftover

| | |
|--|--|
| URL | `/years/2020/sites/tiktok/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-tiktok-eo`, `itt20-tt-lx` |
| Primary write | `itt20-tiktok-eo` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3517 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-eo-caption`, `data-eo-pick`, `data-eo-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.37 `sites/twitter/hack.html` — Twitter hack leftover — 15 Jul 2020

| | |
|--|--|
| URL | `/years/2020/sites/twitter/hack.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-tw-hack`, `itt20-tw-hk` |
| Primary write | `itt20-tw-hack` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3436 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-tw-req`, `data-tw-save`, `data-tw-send` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.38 `sites/wikipedia/index.html` — Wikipedia — 2020 leftover

| | |
|--|--|
| URL | `/years/2020/sites/wikipedia/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-pop-wikipedia`, `itt20-wiki-lx` |
| Primary write | `itt20-pop-wikipedia` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3606 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.39 `sites/windows10/index.html` — Windows 10 residual — 2020

| | |
|--|--|
| URL | `/years/2020/sites/windows10/index.html` |
| Machine | **thin-door** |
| Keys in file | `itt20-win10` |
| Primary write | `itt20-win10` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 2619 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-w10-pick`, `data-w10-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.40 `sites/youtube/index.html` — YouTube — 2020 leftover

| | |
|--|--|
| URL | `/years/2020/sites/youtube/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt20-pop-youtube`, `itt20-yt-lx` |
| Primary write | `itt20-pop-youtube` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3783 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.41 `sites/zoom/about.html` — About Zoom 2020

| | |
|--|--|
| URL | `/years/2020/sites/zoom/about.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-zm-ab` |
| Primary write | `itt20-zm-ab` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 2880 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.42 `sites/zoom/index.html` — Join Zoom — trap

| | |
|--|--|
| URL | `/years/2020/sites/zoom/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt20-code`, `itt20-zm-ix` |
| Primary write | `itt20-code` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3146 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.43 `sites/zoom/meeting.html` — Zoom meeting — mute · chat · Leave

| | |
|--|--|
| URL | `/years/2020/sites/zoom/meeting.html` |
| Machine | **year-verb** |
| Keys in file | `itt20-zoom` |
| Primary write | `itt20-zoom` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 2714 |
| Hooks | `data-itt-3x-also`, `data-itt-year`, `data-zoom-field`, `data-zoom-leave`, `data-zoom-mute`, `data-zoom-req`, `data-zoom-send` |

**Incomplete (never writes)**

1. Leave with 0 [data-zoom-req]
2. Ticks + Leave, not muted ([data-zoom-mute] aria-pressed != true)
3. Ticks + Mute + Leave, empty [data-zoom-chat] / no Send

**Trap (never writes):** Join on sites/zoom/index.html · ChatGPT as 2020 product

**Complete:** Tick both [data-zoom-req] · Mute · type ≥2 chars · [data-zoom-send] · [data-zoom-leave]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.44 `sites/zoom/recap.html` — Zoom recap

| | |
|--|--|
| URL | `/years/2020/sites/zoom/recap.html` |
| Machine | **year-verb** |
| Keys in file | `itt20-zm-rc`, `itt20-zoom` |
| Primary write | `itt20-zm-rc` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3443 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-zoom-field`, `data-zoom-leave`, `data-zoom-mute`, `data-zoom-req`, `data-zoom-send` |

**Incomplete (never writes)**

1. Leave with 0 [data-zoom-req]
2. Ticks + Leave, not muted ([data-zoom-mute] aria-pressed != true)
3. Ticks + Mute + Leave, empty [data-zoom-chat] / no Send

**Trap (never writes):** Join on sites/zoom/index.html · ChatGPT as 2020 product

**Complete:** Tick both [data-zoom-req] · Mute · type ≥2 chars · [data-zoom-send] · [data-zoom-leave]

**Payload:** `real:true` · `year:"2020"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

## 9. Playables

| File | Role | Incomplete | Complete |
|------|------|------------|----------|
| `sites/playable/game.html` | official-10 year game | Finish no Start | Start + acts + Finish |
| `game-2.html` … `game-5.html` | extra cabinets | Finish no Start | Start + acts + Finish |
| `famous.html` | leftover famous · not a 3rd official cabinet | empty | leftover famous key |
| `extra-a.html` · `extra-b.html` | minute extras | Finish no Start | year-true extra |
| `sites/playable/extra-c.html` | extra-c **Mute Round** `itt20-game-muteround` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-d.html` | extra-d **Reel 15** `itt20-game-reel15` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-e.html` | extra-e **Flash Brick** `itt20-game-flashbrick` | Finish no Start · `?test=1` still honest | Start + goods + Finish |

---

## 10. 3× densify checklist (when `densify 2020`)

1. Recite star `itt20-zoom` · guided 6 · bans.
2. Count HTML. Now **44**. Stop adding rooms at **120 HTML**.
3. Confirm L2/L3/L4 files exist and are **machines**, not costume doors.
4. Add L5 + L6 + L7 (9 dests) as leftover-pop machines. Unique slugs.
5. Add 9 more dest-pages (about / second URL) listed in L5–L7 about rows — or extra pages on existing rooms. Total leftover dests **27**.
6. Official 10: each whenKey writes. Replace plaque-only.
7. Every leftover dest: 3 incomplete + 1 trap + 1 complete.
8. `python3 scripts/build-3x-links.py` · dest also ≥3 · 0 marked 404s.
9. Guided still 6. Star unmoved. Neighbor prefix empty.
10. Prove: `python3 scripts/check-all-years.py` · one-thing 2020 · leftover-official · year-3x3 · 3x-links · extra-cde.

---

## 11. Shared laws (reprint)

1. Incomplete REAL never writes.
2. Prefix `itt20-*` only.
3. Never invent brand pixels. No ripped weights.
4. Guided `<ol>` exactly 6.
5. Star dest + key do not move.
6. Traps never write.
7. After new rooms: `python3 scripts/build-3x-links.py`.
8. No ILS June websites digit after 2018.
9. Lean first (~50 HTML) then 3× densify. Do not start at 120.

