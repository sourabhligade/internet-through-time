# SRP Split Plan — browser-core & immersion-core

**Goal:** Split fat engines into single-responsibility modules **without a bundler** (static multi-script load).  
**Non-goals:** New build step, TypeScript, npm runtime deps, behavior change.  
**Success:** Same public APIs (`ITT.Browser.create`, `ITT.Immersion.create`), same HTML script tags (or one extra stable entry), all smoke/auth/e2e green.

### Implementation status (2026-07-22)

| Phase | Status | Notes |
|-------|--------|--------|
| **Phase 1 Immersion** | **Done** | `js/immersion/{shared,guestbook-search,amazon,auction,hotmail,geocities,slashdot,media-1994,plugin,create}.js`; boots load sequentially; `immersion-core.js` is a shim |
| **Phase 2 Browser connect + load-theater** | **Partial** | `browser/connect.js` owns modem sound + sequence; `browser/load-theater.js` owns step/batch/delay math; progressive loop + chrome still in `browser/create.js` |
| **Phase 3 Navigate + chrome-ui** | **Partial** | `browser/navigate.js` required by create (no fallbacks); `create.js` owns history + iframe + chrome-ui. `registerLocal` used by digg/reddit/youtube/maps/podcasts + 2003–2005 page-boot modules (adsense, flickr, gmail, friendster, …). chrome-ui extract still open |
| **Phase 4–5 Cleanup** | **Partial** | Smoke/auth/e2e/README updated; chrome-ui extract still open |
| **1998 immersion modules** | **Done** | `google.js`, `excite.js`, `yahoo.js` registered via `immersion-1998.js` FEATURES; no inline page scripts for personalize |

---

## 0. Constraints (must honor)

| Constraint | Implication |
|------------|-------------|
| No bundler | Multiple `<script>` tags or dynamic `loadScript` (already used by immersion boots) |
| Iframe immersion | Content pages only load `immersion-199x.js`; that boot must pull feature modules |
| Year shells | Load util → browser modules → year config → thin boot |
| IE-ish simplicity | ES5-style IIFEs, no modules/`import` (match existing style) |
| Zero product regression | Cart, HoTMaiL, dial-up, progressive images, urlMap unchanged |

---

## 1. Target tree

```
js/
  lib/
    util.js                 # KEEP — pure helpers (already SRP)

  browser/
    navigate.js             # history, navigate, iframe src, urlMap display
    load-theater.js         # status phases, progressive images, images-off click
    connect.js              # dial-up overlay, modem sound, connect sequence
    chrome-ui.js            # menus, dialogs, prefs UI, bookmarks, find, source
    secure-session.js       # setSecureMode, phone-line events, coach (optional fold into chrome-ui)
    create.js               # ITT.Browser.create — wires modules, exposes API

  immersion/
    shared.js               # flash, storageKey, R(), tour, counters, injectNav
    amazon.js               # cart, search, recs, checkout, book-of-day
    auction.js              # AuctionWeb / eBay bid forms
    hotmail.js              # HoTMaiL login/inbox/compose
    geocities.js            # webring + homestead
    slashdot.js             # comments
    media-1994.js           # FishCam, CSotD, IUMA player
    plugin.js               # Shockwave/Flash skip theater
    guestbook-search.js     # guestbook, catalog search, form echo, yahoo-add
    google.js               # 1998 Google search theater (catalog results + lucky)
    excite.js               # 1998 My Excite personalize modules
    yahoo.js                # 1998 My Yahoo personalize modules
    registry.js             # FEATURES_BY_YEAR (single source of truth)
    boot.js                 # shared loader for all years
    create.js               # ITT.Immersion.create + boot() orchestrator only

  config/                   # KEEP — year data only
  browser-core.js           # COMPAT SHIM → loads browser/* then no-op create re-export
  immersion-core.js         # COMPAT SHIM → loads immersion/* then re-export
  browser-199x.js           # KEEP thin
  immersion-199x.js         # THIN stub: set year → load immersion/boot.js
```

**Naming:** All attach to `window.ITT` namespaces:

```js
ITT.util
ITT.Browser          // create()
ITT.BrowserParts     // optional: navigate, loadTheater, … for tests
ITT.Immersion        // create()
ITT.ImmersionFeatures // register({ id, init, featureFlag? })
```

---

## 2. Dependency graph

### Browser (year shell)

```
util.js
  └─ browser/navigate.js
  └─ browser/load-theater.js     → uses navigate helpers via ITT.BrowserCtx
  └─ browser/connect.js
  └─ browser/chrome-ui.js
  └─ browser/create.js           → assembles ctx + public API
config/199x.js
browser-199x.js                  → ITT.Browser.create(config)
```

**Critical pattern:** Avoid circular deps by creating a **context object** once in `create.js`:

```js
// browser/create.js (sketch)
function create(config) {
  var ctx = {
    config: config,
    year: config.year,
    prefs: null,
    // DOM refs filled after query
    iframe: null, statusEl: null, …
  };
  ITT.BrowserNavigate.init(ctx);
  ITT.BrowserLoadTheater.init(ctx);
  ITT.BrowserConnect.init(ctx);
  ITT.BrowserChrome.init(ctx);
  return ITT.BrowserNavigate.publicApi(ctx); // navigate, goBack, setSecureMode, …
}
```

Each part only mutates/uses `ctx` — **no part imports another file’s private functions**. Shared pure path logic stays in `util.js` or a tiny `browser/url.js` if needed.

### Immersion (iframe pages)

```
immersion-199x.js (boot)
  → util.js
  → immersion/shared.js
  → immersion/guestbook-search.js   # always useful
  → immersion/amazon.js             # if features.amazon (or always load; init gated)
  → immersion/auction.js
  → immersion/hotmail.js
  → immersion/geocities.js
  → immersion/slashdot.js
  → immersion/media-1994.js
  → immersion/plugin.js
  → immersion/create.js
  → config/immersion-199x.js
  → ITT.Immersion.create(cfg)
```

**Feature registration API:**

```js
// immersion/amazon.js
ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
ITT.ImmersionFeatures.push({
  id: "amazon",
  needs: function (cfg) { return cfg.features && cfg.features.amazon; },
  init: function (ctx) { /* bind data-add-cart etc. */ }
});

// immersion/create.js boot()
ITT.ImmersionFeatures.forEach(function (f) {
  if (!f.needs || f.needs(config)) f.init(ctx);
});
```

Always-on features (`shared` tour/nav/guestbook) use `needs: function () { return true; }`.

---

## 3. Load order (concrete)

### 3A. Year shell (today)

```html
<script src="../../js/lib/util.js"></script>
<script src="../../js/browser-core.js"></script>
<script src="../../js/config/1995.js"></script>
<script src="../../js/browser-1995.js"></script>
```

### 3A. Year shell (after split — preferred: one shim)

Keep HTML **unchanged** during migration:

```html
<script src="../../js/lib/util.js"></script>
<script src="../../js/browser-core.js"></script>  <!-- shim loads parts sync via document.write OR sequential -->
```

**Shim strategy (pick one):**

| Strategy | Pros | Cons |
|----------|------|------|
| **A. browser-core.js = concat build** (optional later) | One request | Reintroduces build |
| **B. browser-core.js sync script injector** | No HTML change | Fragile ordering |
| **C. Expand shell tags** (4–6 scripts) | Clear, debuggable | Touch 4 year `index.html` |
| **D. Dynamic sequential load in browser-199x.js** | HTML stays 3 tags | Async flash of chrome |

**Recommendation:** **Phase 1 = C for browser** (explicit tags, simplest mental model). **Immersion already uses dynamic load** → extend that list (D-style, already proven).

Proposed year shell after Phase 2:

```html
<script src="../../js/lib/util.js"></script>
<script src="../../js/browser/navigate.js"></script>
<script src="../../js/browser/load-theater.js"></script>
<script src="../../js/browser/connect.js"></script>
<script src="../../js/browser/chrome-ui.js"></script>
<script src="../../js/browser/create.js"></script>
<script src="../../js/config/1995.js"></script>
<script src="../../js/browser-1995.js"></script>
```

Optional: `browser-core.js` remains a **deprecated re-export** that document.writes the list for old bookmarks.

### 3B. Immersion boot (update `immersion-199x.js`)

```js
var FEATURE_SCRIPTS = [
  "immersion/shared.js",
  "immersion/guestbook-search.js",
  "immersion/amazon.js",
  "immersion/auction.js",
  "immersion/hotmail.js",
  "immersion/geocities.js",
  "immersion/slashdot.js",
  "immersion/media-1994.js",
  "immersion/plugin.js",
  "immersion/create.js"
];
// load util → Promise.all(FEATURE_SCRIPTS + config) → create
// Optional later: filter FEATURE_SCRIPTS by year features to save bytes
```

Keep **loading all feature files** at first (simpler, ~small files). Gate only at `init` time via `needs()`. Optimize selective load in a later phase.

---

## 4. Module responsibility cheat sheet

### Browser

| File | Single responsibility | Public surface on `ctx` / API |
|------|----------------------|-------------------------------|
| `navigate.js` | Path normalize, history, navigate/back/forward/home/reload/stop, iframe src, urlMap displayUrl | `navigate`, `goBack`, `goForward`, `goHome`, `currentPath`, `displayUrl` |
| `load-theater.js` | Status strings, throbber, progressive images, images-off placeholders, HEAD check timing | hooks into navigate completion + iframe `load` |
| `connect.js` | Connect overlay, sequence lines, modem WebAudio, skip/connect buttons | `runConnect`, `hideOverlay`, connected flag |
| `chrome-ui.js` | Menus, dialogs, prefs form, bookmarks UI, find, view source, page info, clipboard | event wiring only |
| `create.js` | Construct ctx, call `init` on parts, return API object, first-run coach glue | `ITT.Browser.create` |

### Immersion

| File | Single responsibility | Feature flag |
|------|----------------------|--------------|
| `shared.js` | Flash, tour, activity, hit counter, injectNav, exit | always |
| `guestbook-search.js` | Guestbook, search, form echo, Yahoo add URL | always |
| `amazon.js` | Cart through order-thanks + SSL banner call | `features.amazon` |
| `auction.js` | Bid form + localStorage high bid | `features.auction` |
| `hotmail.js` | Full mail theater | `features.hotmail` |
| `geocities.js` | Webring + homestead wizard | always init if DOM hooks present |
| `slashdot.js` | Comment form | DOM hooks |
| `media-1994.js` | FishCam, CSotD, IUMA | DOM hooks |
| `plugin.js` | Plugin skip panel | DOM hooks |
| `create.js` | Build ctx, run registered features, nothing else | — |

---

## 5. Phased migration (safe order)

### Phase 0 — Prep (½ day)

- [ ] Freeze behavior: full `npm run ci` green on `main`; note commit hash  
- [ ] Add `docs/SRP-SPLIT-PLAN.md` (this file)  
- [ ] Add `e2e` / authenticity still required after each phase  
- [ ] Optional: tag `pre-srp-split`

### Phase 1 — Immersion feature extract (lowest risk) ✅ do first

Immersion is self-loading; year shells untouched.

1. Create `js/immersion/shared.js` — move flash, tour, nav, counters  
2. Create `js/immersion/amazon.js` — move all Amazon + checkout  
3. Create `js/immersion/auction.js`  
4. Create `js/immersion/hotmail.js`  
5. Create remaining feature files  
6. Slim `immersion/create.js` to orchestrator only  
7. Update all `immersion-199x.js` + `immersion.js` load lists  
8. Keep `immersion-core.js` as **temporary bundle** that only document.writes/loads new files **or** delete and rely on boot list  
9. **Verify:** cart e2e, hotmail e2e, auction e2e, webring e2e, 1994 nav  

**Exit criteria:** `immersion-core.js` ≤ ~150 lines (shim) or deleted; feature files each ≤ ~250 lines.

### Phase 2 — Browser extract connect + load-theater (high churn)

These change often (nostalgia timing).

1. Extract `browser/connect.js` (dial-up + sound)  
2. Extract `browser/load-theater.js` (progressive images + status phases)  
3. Leave navigate + chrome in `browser-core.js` temporarily  
4. Wire `create` path  

**Exit criteria:** Timing prefs still work; connect ritual + progressive images e2e/manual feel OK.

### Phase 3 — Browser navigate + chrome-ui

1. Extract `browser/navigate.js`  
2. Extract `browser/chrome-ui.js`  
3. `browser/create.js` becomes sole `ITT.Browser.create`  
4. Year shells: either multi-script tags or shim  
5. `browser-core.js` → thin compatibility loader  

**Exit criteria:** Full shell smoke; all year boots; bookmarks/prefs/open location work.

### Phase 4 — Cleanup

- [ ] Remove `_backup_pre_refactor/` if obsolete  
- [ ] Deduplicate four immersion boots → one `immersion-boot.js?year=1995` **or** generate identical boots from a single template (optional)  
- [ ] Selective feature script load by `features` flags (perf)  
- [ ] Update README architecture diagram  
- [ ] Update `PROJECT-INVENTORY.md` / authenticity path checks if they hardcode `immersion-core.js`

### Phase 5 — Hardening

- [ ] `scripts/test-pipeline.py` asserts new paths exist  
- [ ] Grep CI: no new logic re-introduced into shims  
- [ ] Optional size budget: no single browser/immersion file > 400 lines  

---

## 6. File size targets

| Module | Soft max lines | Hard max |
|--------|---------------:|---------:|
| `util.js` | 200 | 300 |
| Each `browser/*.js` | 350 | 500 |
| Each `immersion/*.js` | 250 | 400 |
| `create.js` (either) | 120 | 200 |
| Compat shims | 40 | 80 |

---

## 7. Testing plan per phase

| Gate | Command |
|------|---------|
| Static | `npm run check` |
| Full | `npm run ci` |
| Manual feel | Connect → Yahoo → Amazon add → cart → checkout (1995); HoTMaiL login (1996); eBay bid (1997); IUMA download (1994) |

**Do not** merge a phase if authenticity or cart/hotmail e2e fails.

---

## 8. Risk register

| Risk | Mitigation |
|------|------------|
| Script order race | Sequential `loadScript` chain; no `async` without barriers |
| Circular ctx use | Only `create.js` constructs ctx; parts receive ctx in `init` |
| Double boot immersion | Keep `data-itt-immersion-booted` guard |
| Smoke hardcodes `immersion-core.js` | Update smoke/auth paths in same PR as rename |
| Large PR | One phase per PR; never mix Amazon extract + browser navigate |
| Nostalgia timing drift | Phase 2 needs human playtest of dial-up + images |

---

## 9. What not to split

| Keep together | Why |
|---------------|-----|
| Year `config/*.js` | Already SRP (data) |
| `util.js` | Already SRP |
| Individual year HTML sites | Content, not engine |
| Playwright specs by year | Fine as-is |

---

## 10. Suggested PR sequence

| PR | Title | Scope |
|----|-------|--------|
| PR1 | `refactor(immersion): extract amazon + auction modules` | Phase 1 partial |
| PR2 | `refactor(immersion): extract hotmail, geocities, media` | Phase 1 rest |
| PR3 | `refactor(immersion): create orchestrator + boot load list` | Delete fat core |
| PR4 | `refactor(browser): extract connect + load-theater` | Phase 2 |
| PR5 | `refactor(browser): extract navigate + chrome-ui` | Phase 3 |
| PR6 | `chore: remove shims, update docs/CI paths` | Phase 4–5 |

---

## 11. Sketch: immersion create after split

```js
// js/immersion/create.js
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  ITT.Immersion = {
    create: function (config) {
      if (!ITT.util) throw new Error("util required");
      var ctx = {
        config: config,
        year: String(config.year),
        prefix: config.storagePrefix || ("itt" + String(config.year).slice(2)),
        R: function (rel) { return ITT.util.joinRoot(config.year, rel); },
        storageKey: function (kind, id) {
          return ctx.prefix + "-" + kind + (id ? "-" + id : "");
        }
      };
      var features = ITT.ImmersionFeatures || [];
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        if (f.needs && !f.needs(config)) continue;
        f.init(ctx);
      }
      return { year: ctx.year, /* test hooks */ };
    }
  };
})(window);
```

```js
// js/immersion/amazon.js (sketch)
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "amazon",
    needs: function (cfg) { return cfg.features && cfg.features.amazon; },
    init: function (ctx) {
      // move initAmazonAdd, initAmazonCart, … using ctx.R, ctx.storageKey
    }
  });
})(window);
```

---

## 12. Decision log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Bundler? | **No** | Museum is static-first |
| Module system? | IIFE + `window.ITT` | Matches codebase, works in iframes |
| Immersion load all features? | **Yes initially** | Simpler; gate at init |
| Browser HTML change? | Explicit script tags in Phase 3 | Debuggable |
| First extract? | **Immersion Amazon** | Clearest boundary + strong e2e |

---

## 13. Definition of done (whole split)

- [ ] No file under `js/browser/` or `js/immersion/` > 500 lines  
- [ ] `browser-core.js` / `immersion-core.js` are shims ≤ 80 lines or removed  
- [ ] README architecture diagram updated  
- [ ] `npm run ci` green  
- [ ] Manual nostalgia path still feels like v4 dial-up (not v3 snappy regression)

---

*When ready to implement: start at Phase 1 / PR1 (Amazon extract only).*
