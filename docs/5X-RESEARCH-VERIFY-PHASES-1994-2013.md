# 5× research — verify in phases (1994–2013)

**Date:** 2026-08-17  
**This file:** how to **check the research**, not how to implement. Tick `[ ]` as you confirm.  
**Findings (already written):** [`5X-FLAWS-AND-IMPROVE-SCOPE-1994-2013.md`](5X-FLAWS-AND-IMPROVE-SCOPE-1994-2013.md)  
**Raw counts:** [`references/5x-measure-1994-2013.json`](references/5x-measure-1994-2013.json)  
**URL catalog:** [`references/5x-improve-corpus-1994-2013-urls.txt`](references/5x-improve-corpus-1994-2013-urls.txt)

Do **not** implement from this file. If a number does not match, the measure is wrong — say so before any 5× build.

Commands from repo root. Hub on disk is **1994–2013**.

---

# Phase V0 — What “5×” means (5 min)

Two programs. Confirm both exist and are not the same.

| | Open | You should see |
|--|------|----------------|
| [ ] | [`5X-MEASURABLE-LINKS-FLOWS-GAMES-1994-2020.md`](5X-MEASURABLE-LINKS-FLOWS-GAMES-1994-2020.md) §0 | Games 1→5, toys 3→15, trails 10→50, map dests ×5, L1 dests ×5 |
| [ ] | Same file first line after title | “This is **not** the leftover F1–F5 program” |
| [ ] | [`5X-MEASURABLE-IMPLEMENT/README.md`](5X-MEASURABLE-IMPLEMENT/README.md) | Per-year table 1994–2020 · 2013 Vine · 2012 SoundCloud (stale — you will prove that in V4) |
| [ ] | [`5X-REAL-DEST-IMPLEMENT/README.md`](5X-REAL-DEST-IMPLEMENT/README.md) line 6 | Claims “All 27 years at dest targets” — **you will falsify this in V3** |
| [ ] | `e2e/popular-flows.matrix.json` | F1–F5 leftover loops (the *other* 5×) |

**Pass V0:** you can say out loud: leftover F1–F5 ≠ 5× measurable dests.

---

# Phase V1 — Source catalog ≥ 3k (5 min)

Museum method: stacked unique URLs, not 3k live GETs.

```bash
wc -l docs/references/5x-improve-corpus-1994-2013-urls.txt
wc -l docs/references/2013/corpus-2013-unique-urls.txt \
      docs/references/2012/corpus-2012-unique-urls.txt \
      docs/references/2011/corpus-2011-unique-urls.txt
head -5 docs/references/5x-improve-corpus-1994-2013-urls.txt
```

| | Expect | Tick |
|--|--------|------|
| [ ] | Improve corpus **≥ 3000** (disk: **141,509**) | |
| [ ] | 2013 corpus **136,705** | |
| [ ] | 2012 corpus **11,700** | |
| [ ] | 2011 corpus **10,320** | |
| [ ] | Lines look like `http…` (wikipedia / web.archive.org / techcrunch…) | |

**Pass V1:** catalog exists and is larger than 3k.

---

# Phase V2 — Re-count one lean year and one forest year (15 min)

Pick **2013** (lean) and **2005** (forest). Do not trust the JSON until you repeat the count once.

### V2a — HTML + games

```bash
echo 2013 HTML $(find years/2013 -name '*.html' | wc -l)
ls js/games/year-2013-*.js
ls years/2013/sites/playable/
echo 2005 HTML $(find years/2005 -name '*.html' | wc -l)
ls js/games/year-2005-*.js | wc -l
ls years/2005/sites/playable/
```

| | Expect | Tick |
|--|--------|------|
| [ ] | 2013 HTML **38** | |
| [ ] | 2013 games: **only** `year-2013-loopsix.js` | |
| [ ] | 2013 playable: `index.html` `game.html` `famous.html` — **no** `game-2.html` | |
| [ ] | 2005 HTML **~304** | |
| [ ] | 2005 games: **5** js files | |
| [ ] | 2005 playable includes `game-2.html` … `game-5.html` | |

### V2b — Home + map unique dests (L1)

Open `years/2013/pages/home.html` and `map.html`. Count distinct `href=` that are not `#` and not `itt-3x`.

Or:

```bash
python3 - <<'PY'
import re
from pathlib import Path
rx=re.compile(r'href=["\']([^"\'#]+)["\']')
for y in ("2013","2005"):
    s=set()
    for name in ("home.html","map.html"):
        p=Path(f"years/{y}/pages/{name}")
        if p.exists():
            s |= {h for h in rx.findall(p.read_text()) if "itt-3x" not in h}
    print(y, "L1", len(s))
PY
```

| | Expect | Tick |
|--|--------|------|
| [ ] | 2013 L1 about **34** (measure said 34; ± a few if you count differently) | |
| [ ] | 2005 L1 about **304** | |
| [ ] | Bible target 2013 L1×5 = **230** — 34 is **not** 230 | |
| [ ] | Bible target 2005 L1×5 = **320** — 304 is close | |

### V2c — Trails + flow-map keys

```bash
grep -c '"2013"' js/config/flow-trails.js js/config/flow-trails-5x.js js/config/flow-maps.js js/config/flow-maps-5x-atlas.js
grep -c '"2012"' js/config/flow-trails.js js/config/flow-trails-5x.js js/config/flow-maps.js
grep -c '"2005"' js/config/flow-trails-5x.js js/config/flow-maps-5x-atlas.js
```

| | Expect | Tick |
|--|--------|------|
| [ ] | 2013 in `flow-trails.js` (10 rows we added) | |
| [ ] | 2013 **absent** from `flow-trails-5x.js` and `flow-maps-5x-atlas.js` | |
| [ ] | 2012 **absent** from `flow-maps.js` and `flow-trails.js` (or trails 0) | |
| [ ] | 2005 **present** in both 5× trail + atlas files | |

**Pass V2:** lean 2013 is a 38-file door with 1 game; forest 2005 has the 5× game pack.

---

# Phase V3 — Full scoreboard (10 min)

Open [`references/5x-measure-1994-2013.json`](references/5x-measure-1994-2013.json). Spot-check three years against the table in the scope file §1.

| Year | HTML | Games | Map dests / tgt | Trails / 50 | L1 / tgt | You tick if JSON matches |
|-----:|-----:|------:|----------------:|------------:|---------:|--------------------------|
| 1994 | 193 | 5 | 19 / 85 | 50 | 146 / 155 | [ ] |
| 2005 | 304 | 5 | 30 / 140 | 50 | 304 / 320 | [ ] |
| 2008 | 334 | 6 | 17 / 75 | 50 | 257 / 265 | [ ] |
| 2010 | 38 | 1 | 7 / 120 | 10 | 28 / 275 | [ ] |
| 2011 | 28 | 1 | **0** / 90 | 10 | 20 / 145 | [ ] |
| 2012 | 30 | 1 | **0** / 90 | **0** | 25 / 150 | [ ] |
| 2013 | 38 | 1 | 10 / 170 | 10 | 34 / 230 | [ ] |

Also verify the claim that dest 5× is **not** shipped:

```bash
grep -n "All 27 years at dest targets" docs/5X-REAL-DEST-IMPLEMENT/README.md
```

| | Expect | Tick |
|--|--------|------|
| [ ] | That sentence exists | |
| [ ] | 2011 map dests **0** falsifies it | |
| [ ] | 2012 trails **0** falsifies it | |
| [ ] | Forest map dests 15–30 vs 65–140 also falsifies “map ×5 shipped” | |

**Pass V3:** you agree the READMEs over-claim.

---

# Phase V4 — Stale stars (10 min)

Open these three and compare.

| | File | Claims | Disk | Tick |
|--|------|--------|------|------|
| [ ] | [`5X-MEASURABLE-IMPLEMENT/YEAR-2012.md`](5X-MEASURABLE-IMPLEMENT/YEAR-2012.md) lines 4–7 | Star **SoundCloud** · 49 HTML | [`2012-READ-FIRST.md`](2012-READ-FIRST.md): star **Instagram Android** · 30 HTML | |
| [ ] | [`5X-MEASURABLE-IMPLEMENT/YEAR-2013.md`](5X-MEASURABLE-IMPLEMENT/YEAR-2013.md) lines 6–8, 58–63 | Shell **Win8.1** · game **pipehop** · 61 HTML | `years/2013/index.html` body `os-win7` · `year-2013-loopsix.js` · 38 HTML | |
| [ ] | `e2e/gold-a-leftover-pack.spec.js` 2012 row | Writer `sites/soundcloud/index.html` | Intentional leftover gold — not the lean star | |
| [ ] | `years/2013/pages/home.html` | `data-ott-one-thing="2013"` → `vine/record.html` | Matches locked Vine star | |
| [ ] | `years/2012/pages/home.html` | one-thing → `instagram/android.html` | Matches locked IG Android star | |

```bash
grep -n "SoundCloud" docs/5X-MEASURABLE-IMPLEMENT/YEAR-2012.md | head
grep -n "pipehop\|Win8.1\|61" docs/5X-MEASURABLE-IMPLEMENT/YEAR-2013.md | head
grep os-win7 years/2013/index.html
ls js/games/year-2013-*.js
```

**Pass V4:** 5× bibles for 2012/2013 are stale vs the lean door.

---

# Phase V5 — Broken leftover F-loops (10 min)

```bash
python3 - <<'PY'
import json
from pathlib import Path
m=json.loads(Path("e2e/popular-flows.matrix.json").read_text())
for row in m:
    if str(row.get("year"))!="2012":
        continue
    rel=row["path"].replace("/years/2012/","")
    p=Path("years/2012")/rel.lstrip("/")
    print(row["id"], row["path"], "OK" if p.exists() else "MISSING")
PY
```

| | Expect | Tick |
|--|--------|------|
| [ ] | 2012 F1 twitter path exists (`sites/twitter/index.html`) | |
| [ ] | At least one 2012 popular path is **MISSING** (tumblr and/or sopa-blackout) | |
| [ ] | `e2e/5x-recheck.matrix.json` `stars` has 2013 Vine and **skips 2010–2012** | |

```bash
python3 - <<'PY'
import json
from pathlib import Path
j=json.loads(Path("e2e/5x-recheck.matrix.json").read_text())
print(sorted(j["stars"]))
PY
```

**Pass V5:** leftover F1–F5 is not clean on 2012.

---

# Phase V6 — 5× e2e does not prove dest 5× (5 min)

Open `e2e/5x-measurable.spec.js`.

| | Expect | Tick |
|--|--------|------|
| [ ] | `SAMPLE = ['1994', '2005']` only | |
| [ ] | Tests: pack incomplete/complete · cabinet · atlas chips >5 | |
| [ ] | **No** assert of map dest count, trail 50, or L1×5 | |
| [ ] | `scripts/build-5x-measurable.py` line `YEARS = … range(1994, 2010)` = 1994–**2009** only | |

```bash
grep -n "YEARS\|SAMPLE" scripts/build-5x-measurable.py e2e/5x-measurable.spec.js | head
```

**Pass V6:** a year can be “5× test green” and still have 17 map dests.

---

# Phase V7 — Honest lean 5× (10 min)

Count 2013 rooms. That is the **maximum honest dest count** without a new forest.

```bash
find years/2013 -name '*.html' | wc -l
```

Open scope file §3.

| | Claim to verify | Tick |
|--|-----------------|------|
| [ ] | Lean 5× games = 5 (add game-2…5), toys = 15, trails = 50 | |
| [ ] | Lean map dests = **list every on-disk HTML** (28–38), **not** 170 | |
| [ ] | Hitting L1=230 on 38 files requires ~190 new pages → **banned** by lean cap | |
| [ ] | Locked stars: 2010 IG iOS · 2011 G+ · 2012 IG Android · 2013 Vine | |
| [ ] | Forest 1994–2009: do **not** rebuild games; only dest-close unused HTML | |

**Pass V7:** you reject 2013 L1=230 as a lean target.

---

# Phase V8 — Walk one home (5 min)

Open in a browser (any static server):

1. [ ] `/years/2005/pages/home.html` — has `data-itt-5x-atlas` chip wall  
2. [ ] `/years/2013/pages/home.html` — has `itt-5x-trails` F1–F5 · **no** `data-itt-5x-atlas`  
3. [ ] `/years/2013/` Start menu says **Windows 7**  
4. [ ] `/years/2012/` Start menu still **Windows XP** (costume leftover)

**Pass V8:** lean homes have F1–F5 chips, not the forest 5× atlas.

---

# Phase order (how to read this pack)

```
V0  two 5× meanings
V1  catalog ≥ 3k
V2  hand-count 2013 + 2005
V3  scoreboard JSON vs README claim
V4  stale stars
V5  2012 popular 404s
V6  e2e sample hole
V7  honest lean math
V8  two homes in a browser
```

If every phase passes, the research in [`5X-FLAWS-AND-IMPROVE-SCOPE-1994-2013.md`](5X-FLAWS-AND-IMPROVE-SCOPE-1994-2013.md) is verified.

Then use that file’s approve menu (`P0` · `P1 2013` · `P3` …). This verify file does **not** authorize implement.

---

# What you are not asked to re-fetch

- 141k live GETs  
- Wayback CDX again  
- Restoring `/tmp` forests to “make dest 5× true”

The catalog is the visit. The JSON is the count. These steps are the proof.
