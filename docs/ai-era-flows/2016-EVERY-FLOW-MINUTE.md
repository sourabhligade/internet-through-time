# 2016 — every flow · minute · 3× densify

**Date:** 2026-08-24  
**Parent corpus:** [`../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md`](../2010-2023-AI-ERA-RESEARCH-CORPUS-EVERY-FLOW-MINUTE.md)  
**Status:** implement **only** when you say `implement 2016` or `densify 2016`. Git only if asked.

---

## 0. Lock

| | |
|--|--|
| Star | Instagram Stories 24h |
| Chip | ★ One-thing · Instagram Stories REAL |
| href | `sites/instagram/stories.html` |
| Key | `itt16-ig-stories` |
| Shell | Win10 + Chrome habit |
| Thesis | Snap’s 24h bar becomes Instagram’s default camera. |
| Scale | ILS June still live |
| Bans | Reels, IGTV, TikTok For You as default |
| Disk now | **33 HTML** · **17 site folders** |
| 3× target | **90–120 HTML** · **45–60 rooms** · **45–60 completable flows** |
| Guided `<ol>` | **exactly 6** |
| Prefix | `itt16-*` only |

**3× vs rest of the museum:** do **not** 3× 2008’s 345 HTML. 3× **this lean door**. Current lean ~15–20 completable flows → **45–60**. Leftover dests 9 → **27**. Dest also-stamps → **100% dests, ≥3 live exits**.

---

## 1. Align (recite before any edit)

```
hero  =  years/2016/sites/instagram/stories.html
      =  pages/home.html data-ott-one-thing="2016"
      =  flowTrails["2016"][0].href
key   =  itt16-ig-stories
```

Star dest and key **do not move**. Guided count stays 6. Neighbor prefixes `itt15-*` / `itt17-*` stay empty after every write.

---

## 2. Gold minute (the one-thing)

**URL:** `/years/2016/sites/instagram/stories.html`

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt16-ig-stories")` | — |
| Incomplete 1 | Click [data-ig-story-add] with empty [data-ig-story-text] | **no** |
| Incomplete 2 | Feed post instead of 24h story | **no** |
| Incomplete 3 | Reels costume | **no** |
| Trap | Reels / IGTV as 2016 gold | **no** |
| Complete | Type story text · [data-ig-story-add] · rail shows 24h | **`itt16-ig-stories`** |
| Payload | real:true · year:"2016" · stories24h:true | must include `real` + `year:"2016"` |
| Next | [data-next-flow] → Pokémon GO | hidden until key exists |
| Reload | key still present · Next still visible | yes |
| Neighbor | no other year prefix | — |

---

## 3. Guided 6 (count is the test)

| # | Copy | href | Pass |
|--:|------|------|------|
| 1 | About 2016 | `pages/about.html` | HTTP 200 · dual scale · bans |
| 2 | IG Stories | `sites/instagram/stories.html` | HTTP 200 · 24h |
| 3 | Pokémon GO | `sites/pokemongo/index.html` | HTTP 200 · leftover |
| 4 | Reactions | `sites/facebook/reactions.html` | HTTP 200 · leftover |
| 5 | WhatsApp E2E | `sites/whatsapp/e2e.html` | HTTP 200 · leftover |
| 6 | Year flow map | `pages/map.html` | HTTP 200 · map |

`#ott-guided-2016 ol > li` **= 6**. A 7th `<li>` fails the year. Chips / 3× / 5× sit **outside** the `<ol>`.

---

## 4. Official 10 — every stop is a writer

Each `whenKey` in `flow-trails.js` must **write**. Load-only / plaque-only is a hole. n=1 uses the **Gold minute**. Others: leftover-official panel if present, else dest-field until S8 grows a year-true verb.

| n | Name | href | whenKey | Incomplete (never writes) | Complete | Next |
|--:|------|------|---------|---------------------------|----------|------|
| 1 | Instagram Stories | `sites/instagram/stories.html` | `itt16-ig-stories` | use Gold minute — not dest-field | Gold complete | `sites/pokemongo/index.html` Pokémon GO |
| 2 | Pokémon GO | `sites/pokemongo/index.html` | `itt16-pogo` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/facebook/reactions.html` Reactions |
| 3 | Reactions | `sites/facebook/reactions.html` | `itt16-fb-react` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/whatsapp/e2e.html` WhatsApp E2E |
| 4 | WhatsApp E2E | `sites/whatsapp/e2e.html` | `itt16-wa-e2e` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/iphone/index.html` iPhone 7 |
| 5 | iPhone 7 | `sites/iphone/index.html` | `itt16-iphone7` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/vine/goodbye.html` Vine goodbye |
| 6 | Vine goodbye | `sites/vine/goodbye.html` | `itt16-vine-end` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/snapchat/spectacles.html` Spectacles |
| 7 | Spectacles | `sites/snapchat/spectacles.html` | `itt16-spectacles` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/musically/index.html` musical.ly |
| 8 | musical.ly | `sites/musically/index.html` | `itt16-musically` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/windows10/end.html` Win10 end |
| 9 | Win10 upgrade ends | `sites/windows10/end.html` | `itt16-win10-end` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/playable/game.html` Gym Rush |
| 10 | Gym Rush | `sites/playable/game.html` | `itt16-game-gymrush` | trap · 0 ticks · wrong pick · empty field | required pick + honesty + field + save → this whenKey | `sites/instagram/stories.html` Stories |

After each official write: `[data-next-flow][data-next-when-key]` visible · HTTP 200 · chip on home **still** the star.

---

## 5. Leftover layers — 9 on disk + 18 to add = 27 dests

L2∩L3∩L4 slugs must stay **empty**. L5∩L6∩L7 slugs must stay **empty**. L5–L7 do **not** exist until densify. Do not clone an L3 slug into L4.

### L2 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/reddit/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop-reddit` |
| `sites/netflix/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop-netflix` |
| `sites/youtube/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop-youtube` |

### L3 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/slack/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop-slack` |
| `sites/fblive/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop-fblive` |
| `sites/moments/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop-moments` |

### L4 — ON DISK

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/musically/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-musically` |
| `sites/vine/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop3-vine` |
| `sites/snapchat/index.html` | leftover-pop | Click [data-pop-go] with no [data-pop-pick] | Pick · tick honesty · fill field to placeholder · [data-pop-go] | [data-pop3-costume] / named trap if present | `itt16-pop3-snapchat` |

### L5 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/pokemon/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop4-pokemon` |
| `sites/superbowl/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop4-superbowl` |
| `sites/alphago/index.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop4-alphago` |

### L6 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/stories/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop5-stories` |
| `sites/reactions/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop5-reactions` |
| `sites/e2e/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop5-e2e` |

### L7 — ADD on densify · unique slugs

| href | Machine | Incomplete | Complete | Trap | Key shape |
|------|---------|------------|----------|------|-----------|
| `sites/iphone7/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop6-iphone7` |
| `sites/spectacles/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop6-spectacles` |
| `sites/win10end/about.html` | leftover-pop (new) | empty go / 0 ticks / wrong pick | pick + honesty + field + go | future-year costume | `itt16-pop6-win10end` |

L2∩L3∩L4 intersection: `∅`. L5∩L6∩L7 intersection: `∅`.

---

## 6. Popular F1–F5 (matrix)

| F | key | path | kind | field | Incomplete | Complete | Next |
|---|-----|------|------|-------|------------|----------|------|
| F1 | `itt16-tweets` | `/years/2016/sites/facebook/reactions.html` | new | tweet | empty field / 0 ticks / trap | pick + honesty + go | `../instagram/stories.html` |
| F2 | `itt16-youtube` | `/years/2016/sites/youtube/index.html` | new | — | empty field / 0 ticks / trap | pick + honesty + go | `../reddit/index.html` |
| F3 | `itt16-google` | `/years/2016/sites/reddit/index.html` | new | query | empty field / 0 ticks / trap | pick + honesty + go | `../instagram/stories.html` |
| F4 | `itt16-stories` | `/years/2016/sites/instagram/stories.html` | star | — | use Gold / official minute — do not double-write a second star path unless leftover key | pick + honesty + go | `—` |
| F5 | `itt16-pogo` | `/years/2016/sites/pokemongo/index.html` | reuse | — | empty field / 0 ticks / trap | pick + honesty + go | `../instagram/stories.html` |

Plaque-only dests that the matrix expects must grow `data-itt-popular-save` **or** a leftover-pop machine. Never run unscoped `build-popular-flows.py`.

---

## 7. Leftover-official machines (e2e matrix)

No leftover-official dests stamped for 2016. Official 10 still must write via gold / 4x / leftover-pop. Adding a `[data-lo-panel]` is allowed on densify if it does not fight the star key.

---

## 8. EVERY dest on disk (minute)

33 HTML files (error pages skipped). Each row is a flow. Thin / plaque dests are **holes** — S8.

Machine mix on disk: {'thin-door': 5, 'dest-field-4x': 10, 'leftover-pop': 9, 'year-verb': 1, 'playable': 8}

### D.01 `index.html` — Chrome habit — 2016

| | |
|--|--|
| URL | `/years/2016/index.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt16-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 20910 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.02 `pages/about.html` — About 2016 — dual scale · bans

| | |
|--|--|
| URL | `/years/2016/pages/about.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt16-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 2718 |
| Hooks | `data-itt-real-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-thesis-req` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.03 `pages/home.html` — Welcome to the World Wide Web — 2016

| | |
|--|--|
| URL | `/years/2016/pages/home.html` |
| Machine | **thin-door** |
| Keys in file | `itt16-airpods-lx`, `itt16-cab`, `itt16-dyn-lx`, `itt16-fblive`, `itt16-gym`, `itt16-ig-arch`, `itt16-iphone7-lx`, `itt16-mly`, `itt16-mly-2`, `itt16-mom-2`, `itt16-moments`, `itt16-nf`, `itt16-nf-2`, `itt16-pogo-2`, `itt16-pogo-lx`, `itt16-react`, `itt16-react-2`, `itt16-reddit`, `itt16-slack`, `itt16-slack-2`, `itt16-snap-h`, `itt16-specs`, `itt16-story`, `itt16-vine-end-lx`, `itt16-vine-h`, `itt16-w10e-2`, `itt16-wa-2`, `itt16-wa-e2e-lx`, `itt16-win10-end-lx`, `itt16-xa`, `itt16-xb`, `itt16-xc`, `itt16-xd`, `itt16-xe`, `itt16-yt`, `itt16-yt-2` |
| Primary write | `itt16-airpods-lx` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 9030 |
| Hooks | `data-itt-pop-3x3`, `data-itt-pop-more`, `data-itt-pop3x`, `data-itt-tour`, `data-itt-year`, `data-itt-year-extras` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.04 `pages/map.html` — 2016 flow map

| | |
|--|--|
| URL | `/years/2016/pages/map.html` |
| Machine | **thin-door** |
| Keys in file | `itt16-airpods-lx`, `itt16-cab`, `itt16-dyn-lx`, `itt16-fb-react`, `itt16-fblive`, `itt16-game-gymrush`, `itt16-gym`, `itt16-ig-arch`, `itt16-ig-stories`, `itt16-iphone7`, `itt16-iphone7-lx`, `itt16-mly`, `itt16-mly-2`, `itt16-mom-2`, `itt16-moments`, `itt16-musically`, `itt16-nf`, `itt16-nf-2`, `itt16-pogo`, `itt16-pogo-2`, `itt16-pogo-lx`, `itt16-pop-netflix`, `itt16-pop-reddit`, `itt16-pop-youtube`, `itt16-react`, `itt16-react-2`, `itt16-reddit`, `itt16-slack`, `itt16-slack-2`, `itt16-snap-h`, `itt16-specs`, `itt16-spectacles`, `itt16-story`, `itt16-vine-end`, `itt16-vine-end-lx`, `itt16-vine-h`, `itt16-w10e-2`, `itt16-wa-2`, `itt16-wa-e2e`, `itt16-wa-e2e-lx`, `itt16-win10-end`, `itt16-win10-end-lx`, `itt16-xa`, `itt16-xb`, `itt16-xc`, `itt16-xd`, `itt16-xe`, `itt16-yt`, `itt16-yt-2` |
| Primary write | `itt16-airpods-lx` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 11894 |
| Hooks | `data-itt-2x-map`, `data-itt-3x-also`, `data-itt-flow-map`, `data-itt-pop3x`, `data-itt-ten-flows`, `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.05 `pages/whats-new.html` — What's new — 2016

| | |
|--|--|
| URL | `/years/2016/pages/whats-new.html` |
| Machine | **thin-door** |
| Keys in file | _none harvested_ |
| Primary write | `itt16-MISSING` |
| 3×-also exits | 0 (need **≥3** live hrefs on dests) |
| Bytes | 1064 |
| Hooks | `data-itt-year` |

**Incomplete (never writes)**

1. Load the page — must not write
2. Any empty button — must not write
3. S8 required: this dest is not yet a machine

**Trap (never writes):** Do not add a dest-field checkbox and call it 3×

**Complete:** S8: invent nothing; add a year-true verb. Incomplete never writes

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.06 `sites/dyn/index.html` — Dyn — 21 Oct 2016 literacy

| | |
|--|--|
| URL | `/years/2016/sites/dyn/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-dyn`, `itt16-dyn-lx` |
| Primary write | `itt16-dyn` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3158 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-dyn-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.07 `sites/facebook/reactions.html` — Facebook Reactions — 24 Feb 2016

| | |
|--|--|
| URL | `/years/2016/sites/facebook/reactions.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-fb-react`, `itt16-react`, `itt16-react-2` |
| Primary write | `itt16-fb-react` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 5768 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-capture-cite`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-popular-field`, `data-popular-req`, `data-require-field`, `data-require-field-min` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.08 `sites/fblive/index.html` — Facebook Live — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/fblive/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-fblive`, `itt16-pop-fblive` |
| Primary write | `itt16-fblive` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3399 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.09 `sites/instagram/archive.html` — Your Story — 24h rail

| | |
|--|--|
| URL | `/years/2016/sites/instagram/archive.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-ig-arch` |
| Primary write | `itt16-ig-arch` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 2715 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.10 `sites/instagram/stories.html` — Instagram Stories — 2 Aug 2016

| | |
|--|--|
| URL | `/years/2016/sites/instagram/stories.html` |
| Machine | **year-verb** |
| Keys in file | `itt16-ig-stories`, `itt16-story` |
| Primary write | `itt16-ig-stories` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3139 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-ig-story-add] with empty [data-ig-story-text]
2. Feed post instead of 24h story
3. Reels costume

**Trap (never writes):** Reels / IGTV as 2016 gold

**Complete:** Type story text · [data-ig-story-add] · rail shows 24h

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.11 `sites/iphone/airpods.html` — AirPods — announce vs order

| | |
|--|--|
| URL | `/years/2016/sites/iphone/airpods.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-airpods`, `itt16-airpods-lx` |
| Primary write | `itt16-airpods` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3051 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-airpods-req`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.12 `sites/iphone/index.html` — iPhone 7 — no jack · 7 Sep 2016

| | |
|--|--|
| URL | `/years/2016/sites/iphone/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-iphone7`, `itt16-iphone7-lx` |
| Primary write | `itt16-iphone7` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3143 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-iphone7-save`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.13 `sites/moments/index.html` — Twitter Moments — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/moments/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-mom-2`, `itt16-moments`, `itt16-pop-moments` |
| Primary write | `itt16-mom-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4295 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.14 `sites/musically/index.html` — musical.ly — not TikTok

| | |
|--|--|
| URL | `/years/2016/sites/musically/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-mly`, `itt16-mly-2`, `itt16-musically`, `itt16-pop3-musically` |
| Primary write | `itt16-mly` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4805 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-ml-caption`, `data-ml-post`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.15 `sites/netflix/index.html` — Netflix — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/netflix/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-nf`, `itt16-nf-2`, `itt16-pop-netflix` |
| Primary write | `itt16-nf` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4883 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.16 `sites/playable/extra-a.html` — Story tap — 2016

| | |
|--|--|
| URL | `/years/2016/sites/playable/extra-a.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-storytap`, `itt16-xa` |
| Primary write | `itt16-game-storytap` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 4888 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-mx-field`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.17 `sites/playable/extra-b.html` — Gym tap — 2016

| | |
|--|--|
| URL | `/years/2016/sites/playable/extra-b.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-gymtap`, `itt16-xb` |
| Primary write | `itt16-game-gymtap` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 4812 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-mx-field`, `data-yg-goal`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.18 `sites/playable/extra-c.html` — Coil Snake — 2016

| | |
|--|--|
| URL | `/years/2016/sites/playable/extra-c.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-coilsnake` |
| Primary write | `itt16-game-coilsnake` |
| 3×-also exits | 16 (need **≥3** live hrefs on dests) |
| Bytes | 3262 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.19 `sites/playable/extra-d.html` — Tank Slice — 2016

| | |
|--|--|
| URL | `/years/2016/sites/playable/extra-d.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-tankslice` |
| Primary write | `itt16-game-tankslice` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3323 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.20 `sites/playable/extra-e.html` — Slide Expire — 2016

| | |
|--|--|
| URL | `/years/2016/sites/playable/extra-e.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-slideexpire` |
| Primary write | `itt16-game-slideexpire` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3359 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year`, `data-more-field`, `data-more-goods`, `data-more-hold-ms`, `data-more-traps`, `data-yg-next-href`, `data-yg-next-label` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.21 `sites/playable/famous.html` — Famous games — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/playable/famous.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-breakout`, `itt16-game-memory` |
| Primary write | `itt16-game-breakout` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3926 |
| Hooks | `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.22 `sites/playable/game.html` — Gym Rush — 2016

| | |
|--|--|
| URL | `/years/2016/sites/playable/game.html` |
| Machine | **playable** |
| Keys in file | `itt16-game-gymrush`, `itt16-gym` |
| Primary write | `itt16-game-gymrush` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3781 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-action-status`, `data-itt-year` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.23 `sites/playable/index.html` — 2016 playables

| | |
|--|--|
| URL | `/years/2016/sites/playable/index.html` |
| Machine | **playable** |
| Keys in file | `itt16-cab` |
| Primary write | `itt16-cab` |
| 3×-also exits | 17 (need **≥3** live hrefs on dests) |
| Bytes | 3376 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-itt-year-extras`, `data-itt-year-more` |

**Incomplete (never writes)**

1. Finish with no Start — never writes
2. Start then Finish with 0 goods / 0 acts
3. Score 0

**Trap (never writes):** Skip-intro / costume cabinet

**Complete:** Start · year acts / goods · Finish → game key

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.24 `sites/pokemongo/index.html` — Pokémon GO — 6 Jul 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/pokemongo/index.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-pogo`, `itt16-pogo-2`, `itt16-pogo-lx` |
| Primary write | `itt16-pogo` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 5265 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-popular-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.25 `sites/reddit/index.html` — reddit — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/reddit/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-pop-reddit`, `itt16-reddit` |
| Primary write | `itt16-pop-reddit` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4987 |
| Hooks | `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-field`, `data-popular-req`, `data-require-field`, `data-require-field-min` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.26 `sites/slack/index.html` — Slack — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/slack/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-pop-slack`, `itt16-slack`, `itt16-slack-2` |
| Primary write | `itt16-pop-slack` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4249 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.27 `sites/snapchat/index.html` — Snapchat leftover — 2016

| | |
|--|--|
| URL | `/years/2016/sites/snapchat/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-pop3-snapchat`, `itt16-snap-h` |
| Primary write | `itt16-pop3-snapchat` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3756 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.28 `sites/snapchat/spectacles.html` — Spectacles — Snapbot leftover

| | |
|--|--|
| URL | `/years/2016/sites/snapchat/spectacles.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-specs`, `itt16-spectacles` |
| Primary write | `itt16-specs` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3034 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-spec-req` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.29 `sites/vine/goodbye.html` — Vine — important news · 27 Oct 2016

| | |
|--|--|
| URL | `/years/2016/sites/vine/goodbye.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-vine-end`, `itt16-vine-end-lx` |
| Primary write | `itt16-vine-end` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 3236 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.30 `sites/vine/index.html` — Vine leftover — 2016

| | |
|--|--|
| URL | `/years/2016/sites/vine/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-pop3-vine`, `itt16-vine-h` |
| Primary write | `itt16-pop3-vine` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 3702 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

### D.31 `sites/whatsapp/e2e.html` — WhatsApp — default E2E · 5 Apr 2016

| | |
|--|--|
| URL | `/years/2016/sites/whatsapp/e2e.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-wa-2`, `itt16-wa-e2e`, `itt16-wa-e2e-lx` |
| Primary write | `itt16-wa-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4090 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.32 `sites/windows10/end.html` — Windows 10 — free upgrade ends · 29 Jul 2016

| | |
|--|--|
| URL | `/years/2016/sites/windows10/end.html` |
| Machine | **dest-field-4x** |
| Keys in file | `itt16-w10e-2`, `itt16-win10-end`, `itt16-win10-end-lx` |
| Primary write | `itt16-w10e-2` |
| 3×-also exits | 14 (need **≥3** live hrefs on dests) |
| Bytes | 4125 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-year` |

**Incomplete (never writes)**

1. Click [data-4x-go] with empty [data-4x-field]
2. Field shorter than [data-4x-min]
3. 0 honesty ticks if [data-4x-req] exists

**Trap (never writes):** Future-year costume on this dest

**Complete:** Fill [data-4x-field] to placeholder / min · tick req · [data-4x-go] — leftover key, not star

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

**S8 hole:** grow a year-true verb on this dest (or a second page under the same slug). Dest-field literacy may stay as a leftover note. It is **not** one of the 45–60 completable 3× flows until the verb exists.

---

### D.33 `sites/youtube/index.html` — YouTube — 2016 leftover

| | |
|--|--|
| URL | `/years/2016/sites/youtube/index.html` |
| Machine | **leftover-pop** |
| Keys in file | `itt16-pop-youtube`, `itt16-yt`, `itt16-yt-2` |
| Primary write | `itt16-pop-youtube` |
| 3×-also exits | 15 (need **≥3** live hrefs on dests) |
| Bytes | 5793 |
| Hooks | `data-4x-field`, `data-4x-go`, `data-itt-3x-also`, `data-itt-popular`, `data-itt-popular-save`, `data-itt-real-status`, `data-itt-year`, `data-min-req`, `data-pop-field`, `data-pop-go`, `data-pop-pick`, `data-pop-req`, `data-popular-req` |

**Incomplete (never writes)**

1. Click [data-pop-go] with no [data-pop-pick]
2. Pick but 0 [data-pop-req]
3. Empty [data-pop-field] then go

**Trap (never writes):** [data-pop3-costume] / named trap if present

**Complete:** Pick · tick honesty · fill field to placeholder · [data-pop-go]

**Payload:** `real:true` · `year:"2016"` · `multiStep:true` · typed fields. Reload still shows the save. Next chip hidden until this dest’s key exists.

---

## 9. Playables

| File | Role | Incomplete | Complete |
|------|------|------------|----------|
| `sites/playable/game.html` | official-10 year game | Finish no Start | Start + acts + Finish |
| `game-2.html` … `game-5.html` | extra cabinets | Finish no Start | Start + acts + Finish |
| `famous.html` | leftover famous · not a 3rd official cabinet | empty | leftover famous key |
| `extra-a.html` · `extra-b.html` | minute extras | Finish no Start | year-true extra |
| `sites/playable/extra-c.html` | extra-c **Coil Snake** `itt16-game-coilsnake` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-d.html` | extra-d **Tank Slice** `itt16-game-tankslice` | Finish no Start · `?test=1` still honest | Start + goods + Finish |
| `sites/playable/extra-e.html` | extra-e **Slide Expire** `itt16-game-slideexpire` | Finish no Start · `?test=1` still honest | Start + goods + Finish |

---

## 10. 3× densify checklist (when `densify 2016`)

1. Recite star `itt16-ig-stories` · guided 6 · bans.
2. Count HTML. Now **33**. Stop adding rooms at **120 HTML**.
3. Confirm L2/L3/L4 files exist and are **machines**, not costume doors.
4. Add L5 + L6 + L7 (9 dests) as leftover-pop machines. Unique slugs.
5. Add 9 more dest-pages (about / second URL) listed in L5–L7 about rows — or extra pages on existing rooms. Total leftover dests **27**.
6. Official 10: each whenKey writes. Replace plaque-only.
7. Every leftover dest: 3 incomplete + 1 trap + 1 complete.
8. `python3 scripts/build-3x-links.py` · dest also ≥3 · 0 marked 404s.
9. Guided still 6. Star unmoved. Neighbor prefix empty.
10. Prove: `python3 scripts/check-all-years.py` · one-thing 2016 · leftover-official · year-3x3 · 3x-links · extra-cde.

---

## 11. Shared laws (reprint)

1. Incomplete REAL never writes.
2. Prefix `itt16-*` only.
3. Never invent brand pixels. No ripped weights.
4. Guided `<ol>` exactly 6.
5. Star dest + key do not move.
6. Traps never write.
7. After new rooms: `python3 scripts/build-3x-links.py`.
8. No ILS June websites digit after 2018.
9. Lean first (~50 HTML) then 3× densify. Do not start at 120.

