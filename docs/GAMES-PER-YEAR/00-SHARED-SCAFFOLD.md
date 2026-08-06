# Shared scaffold — all year games

**Do this once** before or in parallel with the first year bible.  
Every `YEAR-*.md` assumes these paths exist.

---

## Goals

| ID | Goal |
|----|------|
| S1 | `year-game-boot.js` shared helpers (storage, fast mode, status) |
| S2 | Stub `game.html` for every year 1994–2014 (title + Coming soon or link) |
| S3 | urlMap + titleMap entries for each year config |
| S4 | `e2e/year-games.spec.js` skeleton looping years |
| S5 | Home + playable index link pattern documented |

---

## Shared files

| Path | Role |
|------|------|
| `js/games/year-game-boot.js` | `ITTGamesYear.saveBest(key, score, meta)` · `loadBest` · `isFast()` · `setStatus(el, msg)` |
| `js/games/scores.js` | Already exists — wing board |
| `css/games.css` | Add `.itt-year-game` frame rules |
| `e2e/year-games.spec.js` | Per-year smoke as games ship |
| `docs/GAMES-PER-YEAR/README.md` | Index |

---

## year-game-boot.js API (implement)

```js
ITT.YearGame = {
  year: function() { /* data-itt-year or path */ },
  key: function(id) { return "itt" + year.slice(2) + "-game-" + id; }, // 1994 → special: prefer itt94
  loadJSON: function(key, fb) {},
  saveBest: function(key, score, extra) {
    // only if score > best && score > 0
  },
  isFast: function() { return /(?:\?|&)fast=1\b/.test(location.search); },
  isTest: function() { return /(?:\?|&)test=1\b/.test(location.search); }
};
```

**1994 key note:** immersion may use `itt` or `itt94`. Prefer **`itt94-game-*`** for isolation consistency with late years; document on 1994 page.

---

## Stub game.html template

```html
<!DOCTYPE html>
<html lang="en" data-itt-year="YYYY">
<head>
  <meta charset="utf-8">
  <title>YEAR GAME — YYYY</title>
  <link rel="stylesheet" href="../../../../css/period-YYYY.css">
  <link rel="stylesheet" href="../../../../css/games.css">
</head>
<body bgcolor="#ffffff">
  <div id="itt-nav-slot" class="itt-nav-slot"></div>
  <div class="itt-year-game" data-year-game data-year="YYYY" data-game-id="SLUG">
    <h1>TITLE</h1>
    <p>Museum original · see docs/GAMES-PER-YEAR/YEAR-YYYY.md</p>
    <p data-itt-action-status>Not implemented yet — scaffold only.</p>
    <p><a href="index.html">← Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
  </div>
  <script src="../../../../js/immersion-YYYY.js" defer></script>
</body>
</html>
```

Replace when implementing that year’s phases.

---

## Phases (shared)

### Phase S0 — boot helper  
**Acceptance:** Script loads without error on a test page.

### Phase S1 — generate stubs 1994–2014  
**How:** Script or manual copy; all paths 200.  
**Acceptance:** `python3 scripts/smoke-production.py` still green if smoke checks playable — or open each manually.

### Phase S2 — urlMap each config  
**Acceptance:** Location bar maps when navigated via shell.

### Phase S3 — link from each `sites/playable/index.html`  
**Acceptance:** “Full year game” link present.

### Phase S4 — e2e skeleton  
```js
for (const year of YEARS) {
  test(`scaffold ${year} game page loads`, async ({ page }) => {
    await enterYear(page, year);
    await goImmersion(page, year, 'sites/playable/game.html');
    await expect(contentFrame(page).locator('[data-year-game]')).toBeVisible();
  });
}
```

### Phase S5 — README status tracking  

---

## Build order (reminder)

1. Shared scaffold  
2. 2005 · 2006 wire existing  
3. 2014 · 2013 · 2009 · 1999  
4. Early years  
5. Remainder  

---

## Legal (all implementers)

- No commercial SWF  
- Original names  
- Inspiration labeled  
- Year-lock honesty  
