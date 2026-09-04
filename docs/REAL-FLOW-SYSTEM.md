# REAL-flow system — all years (no soft mocks)

**Date:** 2026-08-06  
**Purpose:** One **full-fledged** system so every year 1994–2013 uses the same no-mock contracts, shared wiring, and e2e gates.

---

## 1. Rules (non-negotiable)

| Pass | Fail (mock) |
|------|-------------|
| Multi-step or required field before write | One-click “I saw” / bare visit success |
| Writes **year-prefixed** `itt` / `itt95`…`itt13` with **content** | Soft status only |
| Incomplete → **no** `localStorage` write | Empty form “success” |
| Reload still shows saved state | State evaporates |
| Isolation: neighbor year keys untouched | Cross-year key pollution |

---

## 2. Architecture

```
content page
  └─ immersion-YYYY.js
       └─ boot.js
            ├─ shared.js
            ├─ real-flow.js     ← UNIVERSAL (all years)
            ├─ flow-map.js · year-playable · product modules…
            └─ create.js
```

| File | Role |
|------|------|
| `js/immersion/real-flow.js` | Wires `[data-itt-real-save]` + `form[data-itt-real-form]` |
| `js/immersion/registry.js` | Loads `real-flow.js` **after** `shared.js` for **every** year |
| `js/config/real-flow-matrix.js` | Inventory of signature flows (docs + tooling) |
| `years/YYYY/pages/about.html` | Thesis REAL literacy panel (both checks required) |
| `e2e/all-years-real-system.spec.js` | System gate: every year incomplete/complete thesis |
| Product modules | Cart, bid, digg, youtube, etc. keep domain REAL gates |

Year extras (`year-2007-extras`, `year-2010-extras`, `year-2013-extras`) stay for **product-specific** multi-step; generic literacy uses **real-flow.js**.

---

## 3. Markup contracts

### 3.1 Multi-check literacy (any page)

```html
<label><input type="checkbox" data-req data-req-id="a"> Fact A</label>
<label><input type="checkbox" data-req data-req-id="b"> Fact B</label>
<button type="button"
  data-itt-real-save
  data-storage-key="my-ack"
  data-min-req="2"
  data-requires="[data-req]">Save</button>
<p data-itt-action-status></p>
```

Writes: `{prefix}-my-ack` JSON `{ multiStep, real, checks, year, ts }`.

### 3.2 Optional REAL form

```html
<form data-itt-real-form data-storage-key="note" data-require-name="title">
  <input name="title">
  <button type="submit">Save</button>
  <p data-itt-action-status></p>
</form>
```

### 3.3 Product modules (existing)

Keep domain hooks (`data-add-cart`, `data-yt-upload`, …). They must:

- Block empty required fields  
- Use `immersionStorageKey` / year prefix  
- Never invent fake success payloads  

---

## 4. Storage prefixes

| Year | Prefix |
|------|--------|
| 1994 | `itt` (legacy) → keys `itt-thesis-ack` |
| 1995–2013 | `itt` + last two digits (`itt95`…`itt13`) |

---

## 5. e2e commands

```bash
# Universal system (all 20 years × thesis REAL + samples)
npx playwright test e2e/all-years-real-system.spec.js --workers=1

# Existing no-mock packs
npm run test:e2e:no-mock
npm run test:e2e:densify-real-vs-mock

# Full REAL system alias
npm run test:e2e:real-system
```

### What `all-years-real-system` proves

For **each** year 1994–2013:

1. About page loads REAL panel  
2. 0 checks → no write  
3. 1 check → no write  
4. 2 checks → `*-thesis-ack` with multiStep/real content  
5. Module flag / bind present  

Plus product samples: 1995 cart · 2005 YT · 2007 Beacon · 2013 Xbox incomplete.

---

## 6. How to convert a mock page

1. Replace one-click “I saw” with **≥2** `data-req` checks **or** required form fields.  
2. Use `data-itt-real-save` + `data-storage-key="short-id"`.  
3. Show status via `[data-itt-action-status]`.  
4. Add e2e: incomplete null · complete key content · isolation.  
5. Document key in year ARTIFACTS / museum-grade residual.

---

## 7. Migration status

| Layer | Status |
|-------|--------|
| Universal `real-flow.js` in all year registries | **Done** (20/20 years) |
| Thesis REAL on every `pages/about.html` | **Done** (20/20) |
| Cross-year system e2e | **Done** — **44 passed** (`all-years-real-system.spec.js`) |
| npm scripts | `test:e2e:real-system` · included in `test:e2e:no-mock` |
| Product modules empty-block | Partial (strong on cart/YT/digg/2007+; thicken early packs over time) |
| Every product room multipage REAL | Ongoing densify — system markup works without new JS per page |

---

## 8. Anti-patterns (ban)

- `localStorage.setItem(key, '1')` on bare click  
- “Saved!” without setItem  
- Writing `itt06-*` from year 2007 pages  
- Claiming success when checkboxes unchecked  
- Inventing brand pixels for “done” screens  

---

*Educational reconstruction · localStorage theater only.*
