# OSS agent-browser options — best fit for this museum

**Date:** 2026-08-09  
**Status:** research only. Nothing added to `package.json` / CI.  
**Companion:** [`AGENT-BROWSER-CLAUDE-RESEARCH.md`](AGENT-BROWSER-CLAUDE-RESEARCH.md) (Claude Computer Use / Claude in Chrome — closed or paid).  
**Constraint from last pass:** do not replace 2,585 Playwright tests; iframe `#content` + `ittYY-*` REAL + overlay kill are the museum’s real surfaces.

This pass asks: **which open-source tools actually fit those surfaces?** Licenses were read from GitHub. Stars/versions were fetched live. Playwright CLI was **run against this museum**, not imagined.

---

## 0. Fit criteria (from measured museum, not a generic agent blog)

| Code | Must do | Why (measured) |
|------|---------|----------------|
| **C1** | Read/write **year-prefixed localStorage** | 1995 thesis: 0/1 checks → `null`; 2 checks → `{"multiStep":true,"real":true,…}` |
| **C2** | See + click **inside `#content` iframe** | 1994 home: 55 links / 9 GIFs live in the iframe, not the shell |
| **C3** | Survive **overlays** | `#dlg-alert` and `#modal-backdrop` intercept Playwright clicks until dismissed/`killOverlays` |
| **C4** | Stay **headless + CI-safe** | Existing runner policy: wait for conditions, one retry, no screenshot-as-truth |
| **C5** | License **MIT / Apache-2.0** | Museum is MIT static site; AGPL/SSPL is a product footgun if we ever host a “tour agent” |
| **C6** | Optional: **see pixels** (Netscape chrome, Mosaic `#C0C0C0`, GIF digits 16×22) | A11y cannot judge authenticity; that is the only gap Playwright tests do not close |

Closed/paid (Claude Computer Use, Claude in Chrome, ChatGPT agent) are out of scope here.

---

## 1. What I ran vs what I only inspected

| Action | Result |
|--------|--------|
| `npm view` live versions | `@playwright/mcp@0.0.79` Apache-2.0 · `chrome-devtools-mcp@1.6.0` Apache-2.0 · `@playwright/cli@0.1.18` Apache-2.0 · `@browserbasehq/stagehand@3.7.1` MIT · `@midscene/web@1.10.9` MIT |
| PyPI | `browser-use==0.13.7` · `skyvern==1.0.48` |
| GitHub API stars / SPDX (2026-08-08) | browser-use **108,337** MIT · playwright **94,207** Apache-2.0 · chrome-devtools-mcp **48,758** Apache-2.0 · playwright-mcp **35,914** Apache-2.0 · stagehand **23,771** MIT · skyvern **22,710** **AGPL-3.0** · midscene **14,516** MIT |
| LICENSE files fetched | browser-use MIT · stagehand MIT · midscene MIT · skyvern **AGPL-3.0** (full AGPLv3 text) |
| **`playwright-cli -s=ittoss` on 127.0.0.1:8080** | See §3 |
| Full Browser Use / Stagehand / Midscene / Skyvern agent loop | **Not run** — no LLM API key; would be a paid token loop, not an OSS capability test |
| `npx chrome-devtools-mcp@1.6.0 --help` | Help printed; `--headless`, `--slim` (nav+eval+screenshot), `--experimentalVision`, `localStorage` not a first-class command |

---

## 2. Landscape (OSS only, 2026)

Three buckets. Only the first two belong near this repo.

| Bucket | Tools | Job |
|--------|-------|-----|
| **A. Coding-agent attach** (same engine as CI) | Playwright (already here), **Playwright CLI + skills**, Playwright MCP, Chrome DevTools MCP | Write/debug e2e, inspect iframe + storage |
| **B. Hybrid NL / vision on Playwright or CDP** | **Stagehand** (MIT, TS), **Midscene** (MIT, vision+Playwright), **Browser Use** (MIT, Python) | Visitor tour, visual authenticity |
| **C. Platforms / copyleft** | **Skyvern** AGPL-3.0, **Notte** SSPL | Skip for this museum |

Microsoft’s own Playwright MCP README (updated Aug 2026) now tells **coding agents to prefer CLI + SKILLS** over MCP: MCP dumps large a11y trees; CLI is token-cheap. MCP stays for long-lived exploratory loops.

---

## 3. Measured: Playwright CLI on this museum

`npx @playwright/cli@0.1.18 -s=ittoss` against local 8080.

### 3.1 Iframe: CLI snapshot **does** see 1994 content

Correction to the previous Claude doc: `page.accessibility.snapshot()` on the year shell was **50 parent nodes** and one `Iframe` role. That is the **old AOM API**.

Playwright CLI `snapshot` / `find` uses Playwright’s YAML aria snapshot and **descends into `#content`**:

- Snapshot file **17,717 bytes**
- `find "WebCrawler"` → `iframe [ref=e102]` → `link "WebCrawler" [ref=f1e5]`
- `eval` on parent: `{iframe:true, links:55, gifs:9, title:"Welcome to the World Wide Web — 1994"}`

So C2 is **solved for Playwright CLI/MCP snapshots**, not for naive `accessibility.snapshot()`.

### 3.2 Overlays: naive click **fails** (C3)

| Click | Interceptor (CLI timeout log) |
|-------|-------------------------------|
| `Skip dial-up` `e8` | `<div role="dialog" id="dlg-alert">` intercepts pointer events |
| iframe `WebCrawler` `f1e5` | `<div id="modal-backdrop">` intercepts pointer events |

Same overlays `e2e/helpers.js` already kills. After `eval` killOverlays (hide `#modal-backdrop`, `#connect-overlay`, `.dialog`):

```
click f1e5  →  iframe src=/years/1994/sites/webcrawler/index.html
title: WebCrawler · 1994
text includes "Apr 20, 1994"
```

**Without a 10-line museum skill, every OSS agent will timeout on 1994.** That is not a vendor ranking issue; it is ours.

### 3.3 REAL storage: CLI has first-class commands (C1)

On `/years/1995/pages/about.html`:

| Step | CLI result |
|------|------------|
| `localstorage-get itt95-thesis-ack` | `not found` |
| `eval` click Save with 0 checks | `{"clicked":true,"key":null}` |
| `eval` check both + Save | `{"checks":2,"key":"{\"multiStep\":true,\"real\":true,\"checks\":2,\"year\":\"1995\",…}"}` |
| `localstorage-get itt95-thesis-ack` | **exact JSON** |

Also first-class: `localstorage-list/set/delete`, `console`, `requests`, `run-code` (full Playwright snippet), Firefox/WebKit via `open --browser=`.

This is the only OSS tool I **ran** that both (a) saw the iframe tree and (b) proved REAL the same way CI does.

---

## 4. Per-tool score for *this* museum

Scale: **fit 0–5**. LLM loops not executed; score from license + API + this machine’s run / official docs.

### 4.1 Playwright Test (already in repo) — CI truth

- **License:** Apache-2.0 · **v in repo:** 1.49.0 · **stars:** 94k
- C1–C4: already how 2,585 tests work (`enterYear`, `goInFrame`, `waitKey`, `killOverlays`)
- C6: screenshot compare exists; we **must not** pixel-gate brand marks without a policy
- **Fit: 5 for U1 CI.** Not an “agent,” but it is the OSS bar everything else is scored against.

### 4.2 Playwright CLI + skills — **best OSS attach**

- **License:** Apache-2.0 · **npm:** `@playwright/cli@0.1.18`
- Official skill: `localstorage-*`, `eval`, `find`, `snapshot`, `run-code`, iframe refs (`f1e*`)
- Microsoft’s 2026 rec for coding agents (vs MCP)
- **Ran here:** 1994 iframe navigate + 1995 REAL get/set
- Cons: separate package from repo’s Playwright 1.49 (CLI rolls its own browser); still needs overlay skill; not a CI replacement
- **Fit: 5 for U5 coding-agent. 4 for U1 inspection. 2 for U3 pixels** (`screenshot` exists, no visual judge)

### 4.3 Playwright MCP

- **License:** Apache-2.0 · **npm:** `@playwright/mcp@0.0.79` · **35.9k★**
- Same snapshot engine as CLI; `--caps=vision` optional
- Cons: token-heavy a11y dumps (Microsoft says so); `claude mcp list` here has **no** playwright; still needs overlay skill
- **Fit: 4 for exploratory loops. 3 for daily coding** (CLI wins on tokens)

### 4.4 Chrome DevTools MCP

- **License:** Apache-2.0 · **npm:** `chrome-devtools-mcp@1.6.0` · **48.8k★**
- Job: **debug**, not drive tests. Console, network, Lighthouse, `--slim` = navigate + **eval** + screenshot. `--experimentalVision` for `click_at`
- Default **not headless**; Chrome/Edge only; usage stats on unless `CI=`
- Cons: not Playwright; no first-class `localstorage-get`; iframe still eval-manual
- **Fit: 3 as a complement** (immersion boot console / 404s). **1 as the only browser tool**

### 4.5 Stagehand (Browserbase) — best OSS *NL* TS layer

- **License:** MIT (file read) · **npm:** `@browserbasehq/stagehand@3.7.1` · **23.8k★** · Node `^20.19 \|\| >=22.12` (this machine is 20.20.1 — OK)
- Docs (v3): `act` / `extract` / `observe` / `agent`; **iframe + shadow DOM traversal out of the box**; local Chromium; Browserbase cloud optional
- v3 is **CDP-native** (left Playwright wrapper; ~44% faster on nested iframes — vendor claim, not re-timed here)
- Cons: every `act`/`observe` is an LLM call (1–3 s class in 2026 writeups); not our test runner; overlays will still eat clicks unless we wrap `killOverlays`; cloud path is vendor lock if we get lazy
- **Fit: 4 for U2 visitor scripts in TypeScript. 2 for CI. 3 for U3** (vision fallback exists, not the product’s center)

### 4.6 Browser Use — biggest OSS agent, wrong default stack

- **License:** MIT · **PyPI:** 0.13.7 · **108k★** · Python ≥3.11
- CLI 3.0 (Jul 2026): agent writes **Python against the browser** (can `localStorage` if the model thinks to). Migrated off Playwright to CDP (early 2026)
- Published **89.1% WebVoyager** (their report; bench is saturated in 2026 commentary — do not treat as “beats Playwright on 1995 thesis”)
- Cons: Python next to a JS museum; extra browser stack; nondeterministic; no overlay knowledge; needs an LLM key (unset here)
- **Fit: 3 for a one-off Python visitor demo. 1 for CI / coding loop**

### 4.7 Midscene.js — best OSS *visual* layer

- **License:** MIT (Bytedance) · **npm:** `@midscene/web@1.10.9` · **14.5k★**
- Playwright fixture: `PlaywrightAiFixture` from `@midscene/web/playwright` → `aiAssert` / `aiAct` / `aiQuery`
- Docs: screenshot-first; **cross-origin iframes + `<canvas>`**; assert colors/layout a human sees
- Cons: every assert is an LLM; flaky vs `waitKey`; **must not** become a brand-pixel CI gate; needs API key
- **Fit: 4 for U3 authenticity reviews (opt-in, not fail-fast). 1 for REAL JSON**

### 4.8 Skyvern — do not pick

- **License: AGPL-3.0** (full text fetched). Vision + forms; 85.85% WebVoyager (vendor); Docker platform
- AGPL is fine for private experiments; **bad** if the museum ever ships a hosted “agent tour.” Not worth the license tax vs Midscene/Stagehand
- **Fit: 1**

### 4.9 Notte / others

- Notte: **SSPL** (Mongo-style). Out.
- Playwright built-in `toHaveScreenshot()`: OSS, already available, still a **pixel policy** problem (brand marks, GIF animation, dial-up text). Not an agent.

---

## 5. Decision: best OSS fit is a **stack**, not one repo

```
U1 CI REAL / urlMap / isolation
  └── Playwright Test (already)          ← do not replace

U5 coding agent (write/fix e2e, poke live year)
  └── Playwright CLI + museum skill      ← best OSS attach
       optional: Playwright MCP for long explore
       optional: Chrome DevTools MCP for console/network

U2 visitor-like tour (watched, not CI)
  └── Stagehand local  OR  Browser Use CLI
       + same overlay/iframe skill

U3 visual authenticity (“is this still Netscape 1.0?”)
  └── Midscene aiAssert on 3–5 shells   ← opt-in, human-reviewed
       not fail-fast, not brand-pixel diffs

U4 live-web capture (archive.org)
  └── not OSS-first; still human + allowlist
```

**If forced to name one new OSS dependency:** `@playwright/cli`.

Why it wins C1–C5 on *this* site:

1. Same family as the 2,585 tests (locators, frames, `run-code` can call our helpers).
2. First-class `localstorage-get` — Computer Use and most “agent browsers” do not have this.
3. Snapshot **includes iframe refs** (`f1e5` WebCrawler) — I watched it navigate to WebCrawler after overlay kill.
4. Apache-2.0, no cloud, headless, Firefox/WebKit if we ever care.
5. Microsoft is steering coding agents here in 2026; we are not betting on a random wrapper.

Stagehand is the runner-up if the next ask is “NL visitor scripts,” not “help me write e2e.” Midscene is the runner-up if the next ask is “does 1994 still *look* right.” Browser Use is popular and MIT, but it is a second automation stack we would have to teach overlays from scratch.

---

## 6. Required museum skill (any OSS agent)

Without this, CLI/MCP/Stagehand/Browser Use will all die on `#dlg-alert` / `#modal-backdrop` the way CLI did until `eval` killed them.

```
1. Open /years/YYYY/
2. If #skip-connect visible → click it
3. killOverlays: hide #modal-backdrop, #connect-overlay, .dialog (pointer-events:none)
4. Content is iframe#content — snapshot/find inside it; do not only drive Netscape chrome
5. REAL success = localStorage key ittYY-… JSON {multiStep, real, …}
   Banner text / Accept all is not success (2018 Consent Dash)
6. Never assert brand pixels as CI
```

That skill is ~the existing `e2e/helpers.js`. The OSS win is teaching the agent to **call it**, not reinventing Computer Use.

---

## 7. What not to do

| Temptation | Why not |
|------------|---------|
| Put Browser Use / Stagehand / Midscene in `ci.yml` | Nondeterministic + LLM $ + slower than `waitKey` |
| Skyvern “because vision” | AGPL + platform weight |
| Playwright MCP only, no skill | Token dump + overlay timeouts |
| Pixel snapshot gates on Netscape wordmark | Policy: no invented/fragile brand pixels |
| Install Stagehand *and* Browser Use *and* Midscene | Three stacks to teach the same overlay |

---

## 8. ROI if we implement later (you say when)

| Move | Effort | Pays |
|------|--------|------|
| Add `@playwright/cli` as a **dev** tool + `playwright-cli install --skills` + 20-line ITT skill (iframe + killOverlays + `localstorage-get`) | 1–2 h | Coding agents stop guessing selectors; can prove REAL |
| Optional `claude mcp add playwright` **or** chrome-devtools-mcp | 15 min | Explore / console |
| Midscene fixture on **one** year shell (1994) as `test:visual:optin` | half day + LLM key | U3 authenticity without replacing CI |
| Stagehand local script `tour-1994.ts` | half day + LLM key | Demo visitor agent |
| Browser Use | skip unless we want Python | Duplicate stack |

---

## 9. Bottom line

- **Best OSS fit for this museum: Playwright CLI (+ a tiny overlay/iframe/REAL skill).** It is the only OSS agent-browser I ran that both clicked into the 1994 iframe (WebCrawler, Apr 20 1994) and read `itt95-thesis-ack` as JSON.
- **Best OSS NL visitor layer:** Stagehand (MIT, iframe-aware, TypeScript). Second: Browser Use (MIT, huge, Python).
- **Best OSS visual layer:** Midscene on Playwright (MIT). Keep it opt-in.
- **Do not pick:** Skyvern (AGPL), Notte (SSPL), any of the above as a CI replacement.
- Claude Computer Use / Claude in Chrome remain the **closed** options from the previous doc; they still do not beat CLI on C1.

I did not add dependencies. Say implement if you want the CLI + ITT skill next.
