# 2019 — Master bible: how it will be done  
## Each flow · artifact · source · structure · UI/UX (minute detail)

**Date:** 2026-08-13  
**Purpose:** Full implementation map for museum year **2019** — every flow, file, storage key, source, and UI/UX screen so an implementer can build or re-align without inventing.  
**Disk truth:** `years/2019/` may already scaffold on branch · **this freeze is authority** · prefix **`itt19`**.  
**Clone source (if rebuilding):** prior open year tree (prefer **2016** live densify) then **rewrite spine** — do not keep 2016 product copy.  
**Legal:** Educational reconstruction only. **localStorage theater only.** **Never invent brand pixels.** Git only if asked.

### Companion docs (read order)

| # | Doc | Role |
|---|-----|------|
| 0 | [`2019-READ-FIRST.md`](2019-READ-FIRST.md) | Thesis · scale · bans · calendar |
| 1 | [`2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md) | Sources visited |
| 2 | [`2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Short playbook |
| **3** | **This file** | **★ Minute map** |
| 4 | [`references/2019/ARTIFACTS-MAP.md`](references/2019/ARTIFACTS-MAP.md) | Path table |
| 5 | [`references/2019/CAPTURE-LOG.md`](references/2019/CAPTURE-LOG.md) | Pixel harvest |
| 6 | [`OPERATING-PROCESS.md`](OPERATING-PROCESS.md) | Safe pipeline |
| 7 | `js/config/flow-maps.js` → `2019` | UX tree |

---

# Part 0 — What “done” looks like for a visitor

```
Hub → open 2019
  → Shell: Win10 mass · Chrome habit · always-on broadband
  → Connect overlay: TikTok · Disney+ · Arcade · TV+ · AirPods Pro · iPhone 11 · Stadia
  → Starting Point:
        dual scale honesty: websites table ends 2018 · 1,630,322,579 · ITU ~4.1B
        trail cards T1–T6
        densify strip (Netflix residual · Chrome · etc.)
        continuity archive (2016 residual)
  → Trails complete multi-step REAL → itt19-* only
  → Exit hub · itt-last-year=2019
```

---

# Part 1 — Engineering structure

## 1.1 Architecture rule (locked)

| Rule | Detail |
|------|--------|
| Clone | Prefer copy from last L3 open year → rewrite **all** P0 rooms to 2019 spine |
| Engine | No new browser engine — shared `js/browser/*` + year config |
| Immersion entry | Content pages load **`js/immersion-2019.js`** → `immersion/boot.js` |
| Storage | **`itt19-*` only** · `storagePrefix: "itt19"` |
| REAL | Incomplete checklist / empty field **blocks** write |
| Pixels | CAPTURE or RECON placard · never invent brand art |
| CSS | `css/period-2019.css` `@import` prior period + year deltas · classes `itt19-*` |
| Flow data | `ITT.flowMaps["2019"]` |
| Extras | `js/immersion/year-2019-extras.js` priority-loaded via boot.js year-extras rule |

## 1.2 File tree (target)

```
years/2019/
  index.html
  pages/
    home.html · about.html · whats-new.html · map.html · cool.html · error/*
  sites/
    tiktok/index.html · create.html · about.html
    disneyplus/index.html · queue.html · about.html
    arcade/index.html · play.html · about.html
    appletv/index.html · watch.html · about.html
    iphone/iphone11.html
    airpodspro/index.html · pair.html
    stadia/index.html · stream.html · about.html
    facebook/ftc-fine.html          # P1
    netflix/ · chrome/ · youtube/ · instagram/ · snapchat/ · airpods/  # residual
js/
  immersion-2019.js · browser-2019.js
  config/2019.js · config/immersion-2019.js
  immersion/year-2019-extras.js
css/period-2019.css
e2e/2019-*.spec.js
assets/period/2019/{tiktok,disneyplus,arcade,apple,iphone,stadia,streaming}/
```

## 1.3 Home trails UI (Starting Point)

| Card | Kicker | Href | `data-trail-keys` |
|------|--------|------|-------------------|
| T1 | Short video mass | `../sites/tiktok/index.html` | `itt19-tiktok` |
| T2 | Streaming stack | `../sites/disneyplus/index.html` | `itt19-disneyplus` |
| T3 | Games as service | `../sites/arcade/index.html` | `itt19-arcade` |
| T4 | Autumn hardware | `../sites/iphone/iphone11.html` | `itt19-iphone11,itt19-airpods-pro` |
| T5 | Cloud try | `../sites/stadia/index.html` | `itt19-stadia` |
| T6 | Originals stack | `../sites/appletv/index.html` | `itt19-appletv` |

Done mark: when all listed keys present in localStorage → card `.is-done` + show ✓.

## 1.4 About thesis UI

- Dual-cite bullets (2018 websites · ITU users)  
- Danger banner: COVID · invent 2020 · Clubhouse · invent site count  
- REAL panel: 2× `data-req` · `data-itt-real-save` `data-storage-key="thesis-ack"`  
- Key `itt19-thesis-ack`

---

# Part 2 — Each P0 flow (minute)

## T1 · TikTok For You

**Source:** TikTok newsroom Aug 2 2018 merge · 2019 mass habit  
**Path:** `sites/tiktok/index.html` (+ `create.html`)  
**Key:** `itt19-tiktok` → array of `{caption, sound, multiStep, real, ts}`

| Step | UI | Gate |
|------|-----|------|
| 1 | Textarea `[data-tt-caption]` | length ≥ 2 |
| 2 | Optional sound chips `[data-tt-sound]` | class `.is-on` |
| 3 | 2× literacy `[data-req]` | both checked |
| 4 | Button `[data-tt-post]` | write + render `[data-tt-list]` · reveal next |

**Literacy lines (locked):** For You algorithm-fed · musical.ly merge past / TikTok brand 2019.

## T2 · Disney+

**Source:** Walt Disney Co Nov 12 2019 · CNBC $6.99  
**Keys:** `itt19-disneyplus` → `{joined, plan, queue[], …}`

### Join (`index.html`)
| Step | Control | Gate |
|------|---------|------|
| Plan | `[data-dplus-plan]` select | non-empty |
| Literacy | 2× `data-req` | Nov 12 · catalog class |
| Join | `[data-dplus-join]` | write joined |

### Watchlist (`queue.html`)
| Step | Gate |
|------|------|
| Prior join | `joined === true` else error |
| Title | `[data-dplus-title]` ≥ 2 chars |
| Checks | 2× queue reqs |
| Button | `[data-dplus-queue]` unshift title |

## T3 · Apple Arcade

**Source:** Apple NR Sep 19 · $4.99 · no ads/IAP  
**Key:** `itt19-arcade` → `{started, game, played?}`

| Page | Actions |
|------|---------|
| `index.html` | `[data-arcade-game]` · 2 checks · `[data-arcade-start]` |
| `play.html` | requires started · 2 play checks · `[data-arcade-play-save]` |

## T4 · iPhone 11 → AirPods Pro

### iPhone 11
**Source:** Apple NR Sep 10/20 · dual camera · $699 from  
**Key:** `itt19-iphone11` via `data-itt-real-save` + `data-require-field="[data-ip11-color]"`

### AirPods Pro
**Source:** Apple NR Oct 28/30 · $249 · ANC  
**Key:** `itt19-airpods-pro` → `{ordered, paired?}`  
`index`: 2 checks · `[data-airpods-pro-save]`  
`pair`: case + lit checks · requires ordered · `[data-airpods-pro-pair]`

## T5 · Stadia

**Source:** Google blog Nov 19 · Verge 14 countries  
**Key:** `itt19-stadia` → `{claimed, tier, streaming?, game?}`  
**Honesty line on page:** not invent later shutdown as day-one.

| Page | Gate |
|------|------|
| `index.html` | tier select · 2 checks · claim |
| `stream.html` | claimed · game text · 2 checks · stream |

## T6 · Apple TV+

**Source:** Apple NR Nov 1 · $4.99 · originals-first  
**Key:** `itt19-appletv` → `{watching, show, progress?}`

---

# Part 3 — P1 densify (after P0 green)

| Room | Path | Key | Source |
|------|------|-----|--------|
| FTC $5B | `sites/facebook/ftc-fine.html` | `itt19-ftc-fine` | FTC Jul 24 2019 |
| Netflix residual | `sites/netflix/index.html` | residual placard | streaming wars |
| Edge/Chrome residual | existing | residual | shell honesty |

---

# Part 4 — Shell / connect copy (locked)

Connect overlay paragraph:

> 2019 thesis: TikTok For You · Disney+ · Arcade · TV+ · AirPods Pro · iPhone 11 · Stadia.  
> Streaming stacks · short-video mass · cloud game try.

**Must not** reuse 2016 “Pokémon GO · jack · musical.ly is the product” as primary.

---

# Part 5 — CSS / UX tokens

| Class | Use |
|-------|-----|
| `.itt19-shell` | Product room shell |
| `.itt19-trail-card` | Home trails |
| `.itt19-btn-mly` | TikTok pink accent (name historical) |
| `.itt19-btn-apple` | Apple black |
| `.itt19-btn-primary` | Disney+/Stadia blue class |
| `.itt19-status.is-ok / .is-err` | REAL feedback |

Theme modifiers: `theme-mly` (TikTok dark) · `theme-apple` · dark Disney navy inline OK.

---

# Part 6 — e2e matrix (minimum)

| Pack | Asserts |
|------|---------|
| mvp | shell · home · about dual-cite · P0 200s · trails hrefs · whats-new |
| densify | bans · multipage paths · TikTok REAL · continuity |
| real-flows | empty/incomplete blocks · multipage gates · prefix isolation |
| trail-real-flows | T1–T6 storage |
| flows | enterYear · A–J product writes |
| shell-honesty | connect copy · hub card · date honesty · bans |

Command: `npm run test:e2e:2019`

---

# Part 7 — Capture / RECON policy

Until CAPTURE-LOG marks **OK**:

- Geometric UI · text wordmarks · CSS gradients  
- **No** invented official logos as “authentic assets”  
- Optional placard: `RECON · not period pixel capture`

---

# Part 8 — Re-align checklist (if scaffold pre-exists)

1. Home trails = freeze T1–T6 only as primary.  
2. About scale = 2018 table end + ITU 4.1B (not invent 2019 websites).  
3. Connect overlay = 2019 thesis.  
4. Extras boots match data-* contracts in this bible.  
5. Bookmarks / locationHints point at 2019 P0.  
6. Residual 2016 rooms either demoted or stamped `data-itt-primary-year`.  
7. Tests assert freeze facts (Nov 12 · Sep 19 · Nov 19 · Oct 30 · etc.).
