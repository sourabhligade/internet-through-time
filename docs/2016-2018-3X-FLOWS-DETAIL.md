# 2016–2018 leftover 3× — detailed product flows

**Date:** 2026-08-18  
**What changed:** the three leftover popular rooms on **2016, 2017, 2018** are no longer one-field plaques. Each is a period-costume product leftover with pick → honesty → go.  
**Locked:** star chip · guided `<ol>` exactly 6 · official 10 dests · keys stay `ittYY-pop-<slug>`.

```
Starting Point (star unchanged · guided 6 unchanged)
        │
        └─ leftover 3× trail (below the banner)
             pick a row → tick honesty → go
             empty / no pick / no tick never writes
             Next reveals the next leftover room
```

---

## 2016 — Stories stays the chip

| # | Room | You do | Writes | Next goes to |
|---|------|--------|--------|--------------|
| 1 | `sites/reddit/index.html` | Pick r/gaming · r/videos · r/television. Tick “old reddit / redesign is 2018”. Open. | `itt16-pop-reddit` | Netflix leftover |
| 2 | `sites/netflix/index.html` | Pick Stranger Things S1 · The Crown S1 · Black Mirror S3. Tick “discs still mail”. Play. | `itt16-pop-netflix` | YouTube leftover |
| 3 | `sites/youtube/index.html` | Pick music video · vine compilation · Let’s Play. Tick “not Shorts”. Watch. | `itt16-pop-youtube` | Starting Point |

**Honesty:** no TikTok brand, no Shorts, no House of Cards as 2016 gold, no official snoo / N-mark / play-button.

---

## 2017 — Face ID stays the chip

| # | Room | You do | Writes | Next goes to |
|---|------|--------|--------|--------------|
| 1 | `sites/reddit/index.html` | Pick FortNiteBR · twitter 280 · news weather. Tick “redesign is 2018”. Open. | `itt17-pop-reddit` | YouTube leftover |
| 2 | `sites/youtube/index.html` | Pick Despacito-class · Fortnite Let’s Play · music video. Tick “YouTube TV $35 is About”. Watch. | `itt17-pop-youtube` | Amazon leftover |
| 3 | `sites/amazon/index.html` | Pick Echo Show · Whole Foods 365 · Fire TV. Tick “no real checkout”. Search. | `itt17-pop-amazon` | Starting Point |

**Honesty:** no Fortnite-on-Switch, no TikTok merge, no GDPR, no SSN, no live cart.

---

## 2018 — GDPR Manage stays the chip

| # | Room | You do | Writes | Next goes to |
|---|------|--------|--------|--------------|
| 1 | `sites/reddit/index.html` | Pick old reddit · April redesign · r/privacy. Tick “redesign is this year”. Open. | `itt18-pop-reddit` | YouTube leftover |
| 2 | `sites/youtube/index.html` | Pick music video · tiktok compilation · GDPR explained. Tick “not Shorts / not Reels”. Watch. | `itt18-pop-youtube` | Wikipedia leftover |
| 3 | `sites/wikipedia/index.html` | Pick GDPR · Cambridge Analytica · TikTok. Tick “not the 2001 edit star”. Open article. | `itt18-pop-wikipedia` | Starting Point |

**Honesty:** Accept All never writes anywhere. No Reels, no Meta, no Shorts, no live wiki edit.

---

## Engine

`js/immersion/year-popular-3x.js`

- `[data-pop-field]` still required (≥2 chars).
- If the room has `[data-pop-pick]`, one pick is required.
- If the room has `[data-pop-req]`, every honesty tick is required.
- Payload `{ real, multiStep, year, pop, q, picked, honest, ts }`.
- Reload restores the pick + reveals Next.

Earlier years (1994–2015) stay fill+go unless they grow picks later.

---

## Tests

- `e2e/2016-2018-3x-detail.spec.js` — all 9 rooms, incomplete gates, Next href, reload, guided 6 + star.
- Year packs `test:e2e:2016` / `2017` / `2018` include that file.
- `e2e/popular-3x-sites.spec.js` now ticks picks/reqs when present so 1994–2018 stay green.
