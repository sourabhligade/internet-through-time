# Museum operating process (safe path)

**Purpose:** One non-breaking process for health, honesty labels, tests, and year work.  
**Law for ship claims:** [`DISK-TRUTH.md`](DISK-TRUTH.md) + each year `YYYY-READ-FIRST.md`.  
**Do not** invent brand pixels · **do not** ship exploit PoCs · storage year-prefix only.

---

## 0. Principles (will not break the museum)

1. **Additive first** — new helpers, opt-in placards, checks. No mass delete of year forests.  
2. **Incomplete REAL writes nothing** — never soften gates.  
3. **Clone forest stays** until an explicit shared-residual architecture pass.  
4. **Stamp only known maps** — residual primary years come from a conservative table.  
5. **Tests use shared helpers** — `e2e/helpers.js` (start with 2017 pack).  
6. **Git only if asked.**

---

## 1. Commands (copy/paste)

### Full safe gate (recommended before claiming year work done)

```bash
npm run process:check
```

Runs:

1. `python3 scripts/check-all-years.py`  
2. `python3 scripts/process/check_urlmap.py`  
3. `python3 scripts/process/check_boot_registry.py`  
4. residual **scan** (report only)  
5. `node --check` on core immersion + helpers  
6. `npm run test:e2e:2017
npm run test:e2e:2019`

### Smoke only (faster)

```bash
npm run process:smoke
```

### Residual scan / optional stamp

```bash
npm run process:residual-scan
# ONLY when you intend to write data-itt-primary-year on known rooms:
PROCESS_STAMP=1 npm run process:residual-stamp
# or:
python3 scripts/process/scan_residual.py --year 2017 --stamp-known
```

### Year pack tests

```bash
npm run test:e2e:2017
npm run test:e2e:2019
npm run test:e2e:2014
# etc.
```

---

## 2. Code map (what was added)

| Path | Role | Break risk |
|------|------|------------|
| `e2e/helpers.js` | Shared Playwright helpers | Low — opt-in per spec |
| `e2e/2017-*.spec.js` | Use helpers | Low — same assertions |
| `js/immersion/residual-placard.js` | Caption when `data-itt-primary-year` &lt; shell year | **None** without attribute |
| `js/immersion/registry.js` | Loads residual-placard after shared | Low — no-op without attrs |
| `js/immersion/boot.js` | Priority hints for 2017/2014 signature rooms | Low — only if module already in year list |
| `scripts/process/*` | Checks + residual scan/stamp | Read-only unless stamp flag |
| `docs/OPERATING-PROCESS.md` | This file | — |

---

## 3. Residual placard contract (non-breaking)

**HTML (opt-in):**

```html
<body data-itt-primary-year="2014" ...>
```

**Runtime:** if shell year is 2017 and primary is 2014, inject `.itt-residual-chip` once.  
**If attribute absent:** module does nothing.  
**If chip already in HTML:** skips duplicate.

---

## 4. New year pipeline (safe order)

```
0  Owner: freeze year N
1  Docs: READ-FIRST · freeze · sources · room kits · left phases
2  Scaffold from prior open year (copy tree) · ittNN prefix only
3  Author P0 multipage REAL · year-NNNN-extras.js · registry entry
4  Boot hints for new site slugs (boot.js) if extras must priority-load
5  Stamp known residuals: process:residual-stamp for that year
6  e2e pack using e2e/helpers.js
7  process:check green
8  Hub unlock · DISK-TRUTH · SCALE-LEDGER
```

**Never** unlock hub mid-scaffold.  
**Never** load exploit samples or wallet buy UI.

---

## 5. What this process deliberately does NOT do yet

- Delete or merge continuity forests into a shared wing  
- Shrink registry module lists by year tier (needs product QA)  
- Auto-rewrite all urlMaps (check only; generation can be a later PR)  
- Replace all years’ e2e helpers (2017 is the template)

Those are larger renos — run only with explicit owner OK and full year packs green.

---

## 6. Failure policy

| Gate fails | Action |
|------------|--------|
| check-all-years | Fix year register / home / hub before anything else |
| urlMap missing path | Fix config or restore file — do not ignore |
| boot/registry | Restore residual-placard path or extras file |
| e2e 2017 | Fix product or test; do not weaken incomplete-empty rules |
| residual scan “missing” | Informational until you choose `--stamp-known` |

---

## 7. Verify after any process change

```bash
npm run process:check
```


---

## 8. Deep research gate (artifact-driven — from 2017 harvest)

Run **after** MVP scaffold and **before** claiming museum-ready.

### 8.1 Required outputs

| Output | Example |
|--------|---------|
| Deep harvest MD | `docs/YYYY-DEEP-RESEARCH-WEB-HARVEST-*.md` |
| VISIT-LOG ticks | primaries re-opened with notes |
| CAPTURE-LOG | research cites + L4 pixel queue ordered by tour |
| ARTIFACTS-MAP | room → on-disk → storage → primary |
| SCALE-LEDGER | blank cells called out |

### 8.2 Rules learned from 2017 artifacts (P-A*)

| ID | Rule |
|----|------|
| **P-A1** | If Live Stats **users** cell is blank → museum uses **class only** · never invent integer |
| **P-A2** | Product free/price pivots → dual-cite **announce primary** + **confirm primary** when dates differ |
| **P-A3** | Character limits → encode **language exceptions** when primary states them (e.g. Twitter CJK 140) |
| **P-A4** | Shutdown rooms → name **leftover functions** if primary does (e.g. Vine Camera) |
| **P-A5** | Security rooms → patch/kill-switch literacy only · CAPTURE **never** stores malware |
| **P-A6** | Undisclosed M&A → press **range** only · no fake SEC exacts |
| **P-A7** | **No empty** `assets/period/YYYY/*` dirs — create-at-fill after CAPTURE OK |
| **P-A8** | Prefer official press image zips / Wayback over invent |
| **P-A9** | MVP without deep harvest ≠ museum-ready |
| **P-A10** | `process:check` stays automated; deep research is human visit ticks |

### 8.3 Commands

```bash
# after deep harvest edits:
npm run process:check

# residual coverage report:
npm run process:residual-scan
```

### 8.4 2017 reference pack

- [`2017-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2017-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md)
- [`2017-PHASE-BY-PHASE-FULL-MAP.md`](2017-PHASE-BY-PHASE-FULL-MAP.md)
- [`references/2017/`](references/2017/)
