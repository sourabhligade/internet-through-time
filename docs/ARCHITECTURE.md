# Architecture — Internet Through Time

**Purpose:** Keep the repo aligned as years grow (1994 → 2000+).  
**Rule of thumb:** *Year differences live in config + content. Shared behavior lives once in `js/`.*

---

## 1. Layer cake (do not mix)

```
┌─────────────────────────────────────────────────────────┐
│  Hub                                                    │
│  index.html · css/hub.css                               │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Year SHELL (chrome only)                               │
│  years/YYYY/index.html                                  │
│  → util · browser-core · config/YYYY.js · browser-YYYY  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Year CONTENT (museum pages)                            │
│  years/YYYY/pages/** · years/YYYY/sites/**              │
│  → each page loads js/immersion-YYYY.js (stub only)     │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Shared ENGINE (SRP modules — no year forks)            │
│  js/browser/* · js/immersion/* · js/lib/util.js         │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Year DATA (config only)                                │
│  js/config/YYYY.js · js/config/immersion-YYYY.js        │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  Year ASSETS                                            │
│  assets/period/YYYY/** · css/period-YYYY.css            │
└─────────────────────────────────────────────────────────┘
```

| Layer | May know about years? | May contain behavior? |
|-------|----------------------|------------------------|
| Content HTML | Yes (paths, copy, markup) | **No** JS logic (only `data-*` hooks + one boot script) |
| Config | Yes (urlMap, tour, catalogs, feature flags) | **No** functions beyond data |
| Immersion modules | Only via `config.features.*` flags | Yes — one module, one job |
| Browser modules | Via year browser config | Yes — chrome/nav/connect only |
| Year stub `immersion-YYYY.js` | Year id only | **Load shared boot only** |

---

## 2. How to add a year (checklist)

1. **Content:** `years/YYYY/` shell + pages + sites (copy *structure* from prior year, not engine code).  
2. **Data:** `js/config/YYYY.js` + `js/config/immersion-YYYY.js` (urlMap, titles, tour, books, flags).  
3. **Registry:** one entry in `js/immersion/registry.js` listing feature modules.  
4. **Stubs:** `js/immersion-YYYY.js` + `js/browser-YYYY.js` (copy any existing stub; change year string only).  
5. **Assets:** `assets/period/YYYY/` + `css/period-YYYY.css` (prefer deltas / `@import` prior period CSS when possible).  
6. **Hub:** unlock card in `index.html`.  
7. **Gates:** smoke urlMap, authenticity, e2e year smoke.

**Never:** copy `immersion-1997.js` loader body into 1998.  
**Never:** put Excite personalize logic inline in HTML.  
**Never:** fork `amazon.js` per year — use `config.books` / flags.

---

## 3. Immersion load path (single pipeline)

```
content page
  └─ immersion-YYYY.js          # sets ITT._immersionYear = "YYYY"
       └─ immersion/boot.js     # shared loader
            ├─ lib/util.js
            ├─ immersion/registry.js    # FEATURES_BY_YEAR
            ├─ immersion/*.js           # only that year's list
            ├─ config/immersion-YYYY.js
            └─ immersion/create.js      # orchestrator → feature.init(api)
```

| File | Responsibility |
|------|----------------|
| `immersion/registry.js` | Which modules per year |
| `immersion/boot.js` | Script loading order |
| `immersion/create.js` | Call `init` on registered features |
| `immersion/<feature>.js` | One feature (`needs` + `init`) |
| `immersion-YYYY.js` | Year id stub (~15 lines) |

---

## 4. Browser load path

```
year shell
  └─ util.js
  └─ browser-core.js → connect + load-theater + create + year-boot
  └─ config/YYYY.js
  └─ browser-YYYY.js → ITT.bootBrowserYear("YYYY")
```

---

## 5. Content organization (`years/YYYY/`)

```
years/YYYY/
  index.html           # shell only (chrome DOM)
  pages/               # starting point, about, errors
  sites/<brand>/       # reconstructed sites for THAT year only
```

**Why duplicate Amazon across years?** Intentional: each year is a frozen museum room (1995 river-A ≠ 1998 tabs).  
**Shared code** for cart/bids still lives in `js/immersion/amazon.js` — pages only expose `data-*` hooks.

**Do not** invent `years/shared/sites/amazon`. Cross-year “shared HTML” creates wrong-era bleed.

---

## 6. CSS growth rule

| File | Role |
|------|------|
| `css/win95-netscape.css` / `ie4-overrides.css` | Chrome (shell) |
| `css/period-YYYY.css` | Document styles for that year's content |

Prefer:

```css
/* period-1999.css */
@import url("period-1998.css");
/* only 1999 deltas */
```

Avoid full-file copies of period CSS when only a few rules change.

---

## 7. Naming conventions

| Kind | Pattern |
|------|---------|
| Feature module | `js/immersion/<feature>.js` — not `immersion-1998-excite.js` |
| Year-only media feature | `media-1994.js` OK if truly unusable other years |
| Config | `js/config/YYYY.js` browser · `immersion-YYYY.js` immersion data |
| Markup hooks | `data-<feature>-*` (e.g. `data-google-search`, `data-excite-mod`) |
| Storage | `config.storagePrefix` (`itt98`) — never hardcode year in modules |

---

## 8. Anti-patterns (will cause mess)

1. **Copy-paste year boot** with full FEATURES map inside each `immersion-YYYY.js`  
2. **Year-specific if (year === "1998")** sprawl inside shared modules — use feature flags  
3. **Inline `<script>`** on content pages beyond the immersion stub  
4. **Editing 1997 HTML to “fix” 1998** without a dedicated `years/1998` room  
5. **Putting urlMap in HTML** or behavior in config  
6. **New engine fork** (`browser-core-1998.js`)  

---

## 9. Related docs

| Doc | Role |
|-----|------|
| `docs/SRP-SPLIT-PLAN.md` | Module split history / browser extract backlog |
| `docs/1998-IMPLEMENTATION-PHASES.md` | Year build phases |
| `docs/1998-MUSEUM-GRADE.md` | 1998 ship bar |
| `README.md` | Tree overview |

---

## 10. Target end-state (when fully clean)

- [x] One feature registry (`immersion/registry.js`)  
- [x] One immersion boot loader (`immersion/boot.js`)  
- [x] Thin year stubs only  
- [x] Thin browser year stubs + `bootBrowserYear`  
- [ ] `browser/create.js` split into navigate + chrome-ui (SRP plan Phase 3)  
- [ ] Period CSS composition (`@import` deltas) for 1998+  
- [ ] Optional codegen script: `scripts/new-year.py 1999` scaffolding stubs + empty dirs  

When in doubt: **add data and content, not new engines.**
