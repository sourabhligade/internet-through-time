# Agent browsers × this museum — Claude specifically, run not guessed

**Date:** 2026-08-09  
**Status:** research only. Nothing product-shipped from this doc.  
**Machine facts:** local `python3 -m http.server 8080`, Playwright 1.49.0, Claude Code CLI present, Docker 29.6.0 present, `ANTHROPIC_API_KEY` **unset**, Claude in Chrome extension **not installed**.

This is not a vendor bake-off fantasy. It maps **this** static museum (1994–2020, iframe year shells, `ittYY-*` REAL localStorage, 2,585 Playwright tests) onto the 2026 agent-browser stack, with Claude called out because that is the product you asked about.

Numbers marked **measured** were run here today. Numbers from vendor docs are cited as **docs**, not re-benchmarked.

---

## 0. What I actually ran vs what I did not

| Action | Result |
|--------|--------|
| Start museum on `127.0.0.1:8080` | Hub / 1994 / 1995 about / 2020 all **HTTP 200** |
| Playwright visitor probe (`/tmp/itt-agent-browser-probe.mjs`) | Hub + years 1994, 1995, 1999, 2005, 2013, 2018, 2020 + 1995 REAL + 2018 Consent Dash + 1994 FishCam. Screenshots in `/tmp/itt-agent-shots/` |
| Parent vs iframe accessibility | **Measured:** year-shell parent tree ≠ 1994 page |
| 2018 “Accept all” click | **Measured:** no `itt18-game-consentdash` write |
| `npx playwright test e2e/all-years-real-system.spec.js --grep 1995` | **3 passed / 1.7 s** (wall `time -p real 2.56`) |
| `claude mcp list` | Drive / Gmail / Calendar only. **No browser MCP** |
| `claude --chrome -p …` | **`CHROME_NOT_CONNECTED`** — extension not installed / not same account |
| Find Chrome ext `fcoeoabgfenejglbffodgkkbkcdhcgfn` | **Not present** under Chrome profiles |
| Claude Computer Use API loop | **Not run** — no `ANTHROPIC_API_KEY`. Docker exists; reference impl would need a key + VM |
| Browser Use / ChatGPT Agent against this museum | **Not run** — not installed / not a local CI tool |

If someone later claims “Claude can CI this museum,” they must first get a key (Computer Use) or install Claude in Chrome (live session). Neither is true on this machine today.

---

## 1. The museum use cases (what we would actually want an agent for)

From `docs/REAL-FLOW-SYSTEM.md`, `e2e/helpers.js`, and the live pages:

| # | Use case | Pass looks like | Fail looks like |
|---|----------|-----------------|-----------------|
| **U1 CI / REAL gates** | Incomplete never writes; complete writes year-prefixed JSON `{multiStep, real, …}`; neighbor years untouched | `itt95-thesis-ack` after 2 checks; 0/1 checks → `null` | Soft “I saw it” / screenshot that *looks* saved |
| **U2 Visitor tour** | Enter year, skip dial-up, use Starting Point / chrome / iframe links like a person | Reaches FishCam, Yahoo 1994, GDPR Manage path | Stuck on connect overlay, clicks fake Netscape chrome forever |
| **U3 Visual authenticity** | Period chrome + GIF + `#C0C0C0` Mosaic gray + no modern “retro” skin | Human/vision says “this is 1994 Netscape 1.0” | A11y tree is fine but pixels are wrong |
| **U4 Source research** | Operator (human or agent) on archive.org / WDM / live refs | Capture log + pixels with provenance | Prompt-injected live page; invented brand pixels |
| **U5 Coding-agent loop** | Claude Code / Cursor clicks the local museum while editing | Generate/fix e2e against live iframe + `waitKey` | MCP snapshots the shell, never the iframe |

U1 is already Playwright. U3 is the gap Playwright **cannot** close. U2/U5 are where agent browsers look tempting. U4 is Claude-in-Chrome / Computer Use on the *live web*, not on CI.

---

## 2. What this museum actually looks like to an agent (measured)

### 2.1 Hub — Playwright MCP would be fine

Hub a11y (`interestingOnly: true`):

- **371 nodes / 27,154 JSON bytes**
- 64 links, 6 buttons, 27 listitems, **0 unnamed interactive**
- **0 iframes, 0 GIFs, 0 canvas**
- Screenshot ~**105 KB** (1280×800)

A DOM/a11y agent can tour the lobby. A vision agent can too, but wastes image tokens for no gain.

### 2.2 Year shell — this is the trap

`/years/1994/` after skip-connect:

| Layer | Measured |
|-------|----------|
| Parent a11y | **50 nodes / ~2.4 KB**. Roles: 36 **buttons**, 1 menubar, 1 textbox, 1 **Iframe**, 3 links |
| Parent interactive names | Fake Netscape: File/Edit/View/Go/Bookmarks, Back/Forward/Home/Reload/Images/Open/Find/Stop, Yahoo!, FishCam, Location bar `http://home.nerf.edu/web1994/` |
| Iframe `#content` | 884×545 at (198, 218). `src=/years/1994/pages/home.html` |
| Inside iframe | **55 links**, **9 GIFs** (www.gif 64×64, NEW! 48×18, counter digits **16×22**, under-construction 100×40), 2 tables, bg `rgb(192,192,192)`, Times |
| Parent a11y includes those 55 links? | **No.** One `Iframe` role. |
| Hit-test at iframe content | `elementFromPoint` → **`IFRAME#content`** |
| Toolbar button boxes | Back/Home/Stop **52×40**; Reload **60×40** |
| Overlays still in DOM | `connect-overlay` present, hidden, `pointer-events: none`; `dlg-alert` present, not visible, **`pointer-events: auto`** |
| Enter-year time (Playwright wait-for-iframe-body) | **70–193 ms** across 7 years |

Screenshots of the 1994 shell show the full Windows 3.1 desktop + Netscape 1.0 chrome + Mosaic page. That is **U3 gold** and **U1 poison**: a screenshot agent is looking at theater chrome; CI must not assert “Netscape looks right” as a REAL gate.

### 2.3 REAL literacy — DOM + storage, not pixels

`/years/1995/pages/about.html` (direct page, no year-shell iframe):

| Step | `itt95-thesis-ack` |
|------|--------------------|
| 0 checks → Save | `null` |
| 1 check → Save | `null` |
| 2 checks → Save | `{"multiStep":true,"real":true,"checks":2,"year":"1995","ts":…}` |

Elapsed **252 ms**. Matching e2e: 3 tests **1.7 s**.

A vision agent *can* see the green banner “Saved in this browser · itt95-thesis-ack”. It **cannot** prove JSON shape, year prefix, or isolation without `page.evaluate` / DevTools. Official Computer Use is screenshot + mouse/keyboard, not `localStorage.getItem`.

### 2.4 2018 Consent Dash — human-like click fails the museum

On `/years/2018/sites/playable/game.html`:

- Copy on screen: **“Accept all is period-true but does not earn the REAL badge — use Manage.”**
- **Accept all** and **Manage preferences** both visible.
- I clicked **Accept all**. After: **no** `itt18-game-consentdash`. Other leftover 2018 keys (`itt18-thefacebook`, `itt18-maps-state`) unchanged.
- CI already encodes this: `e2e/ux-pack.spec.js` expects the key falsy on incomplete; `year-games-a11y-flows.spec.js` uses `[data-cd-manage]`.

A Claude “visit like a 2018 user” run will click **Accept all**. That is period-true **and** a failed REAL gate. Do not put that agent on CI. Do use it as a **U2/U3** smell test: if the agent never notices the yellow warning, the UX failed humans too.

### 2.5 Games / FishCam

- 1994 FishCam: 1 GIF, Mosaic gray, 49 a11y nodes, ~86 KB shot. Vision matters (the fish). A11y only has `image` + alt.
- 2018 Consent Dash: **canvas count 0** on this load; it is a DOM cookie-wall, not a WebGL game. `window.YearGame` was **undefined** at 800 ms on the direct `game.html` URL (boot is shell/`year-game-boot.js` in other paths). Agents that assume a global will hang — same class of bug we already fixed in `waitYearGame`.

---

## 3. The 2026 agent-browser map (docs + this machine)

There are **four different products** people collapse into “Claude browser.”

### 3.1 Claude Computer Use (API, `computer_20251124`)

Official: [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool).

- **What it is:** screenshot → model → `left_click`/`type`/`key`/`scroll`/`zoom` on a **virtual desktop** (Xvfb + Firefox in Docker in the reference impl). Beta header `computer-use-2025-11-24`. Current models on that page: Opus 4.5–5, Sonnet 4.6/5.
- **Not a browser API.** It cannot `querySelector`, wait for `itt95-thesis-ack`, or snapshot an iframe’s a11y tree unless it opens DevTools as a human would.
- **Official limitations still on the page (2026 docs, not 2024 nostalgia):**
  - Latency “too slow compared to regular human-directed computer actions”
  - Coordinate / click mistakes; scroll unreliability; dropdowns hard
  - Prompt injection: “instructions on webpages or contained in images might override your instructions”; classifiers may **pause for a human** — bad for headless CI
  - Small UI needs `enable_zoom: true`; 16×22 GIF digits and 52×40 toolbar icons are exactly the miss-click case
  - Screenshots must match `display_width_px` or clicks systematically offset; Retina 2× is a documented footgun
  - Image long-edge limits 1568 (older) / 2576 (Opus 5 / Sonnet 5). 1280×800 museum shots fit; 4K full-page would downscale and wreck Netscape chrome clicks
- **Cost (docs):** +466–499 system tokens, +735 tool-def tokens on Claude 4.x, **plus every screenshot as a vision image**, every step of the agent loop. One year enter in Playwright is **~100 ms**. One Computer Use step is a full vision round-trip.
- **2024 OSWorld** (Anthropic launch post): 14.9% screenshot-only / 22% with more steps. **I did not re-run OSWorld in 2026.** Newer Sonnet/Opus are better; the 2026 tool page still calls the feature **beta** and lists the same failure modes. Do not treat 14.9% as today’s number, and do not invent a new one.
- **This machine:** cannot run it. No API key.

### 3.2 Claude in Chrome (extension + Cowork + `claude --chrome`)

Official: [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome).

- Paid plans only (Pro/Max/Team/Enterprise). GA in Cowork/Claude Code; **beta in the Chrome side panel**.
- **Chrome/Edge only. Not headless. Not CI.** Needs your live browser, debugger permission, tab control.
- Can read **console + DOM + network** (docs: “Claude can read errors, network requests, and DOM state directly”) — unlike Computer Use.
- Designed for **build → open URL → verify**, Figma-vs-built, scheduled tasks, recorded workflows, 1Password login (beta).
- Safety: Anthropic’s own page says it is “still risky”; prompt injection on live sites; Team admins can allowlist hosts.
- **This machine:** `claude --chrome` → **CHROME_NOT_CONNECTED**. Extension not installed.

### 3.3 Playwright MCP (Microsoft, a11y tree)

Official: [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp). Vision mode optional: `--caps=vision`.

- Default: **accessibility snapshot**, not pixels. Fast, deterministic tool args, works headless, fits GitHub Actions.
- **This museum:** parent snapshot of `/years/1994/` is **fake Netscape chrome** (36 buttons). The 55 real links live in iframe `#content`. An MCP agent that only `browser_snapshot`s the page **will not see WebCrawler / CSotD / FishCam content** unless it knows to enter the frame (or you enable vision).
- Hub and about-pages (no iframe) are MCP-friendly (371 / 77 nodes).
- Already matches our runner policy: wait for conditions, not clocks; one CI retry; static facts stay hard (`docs/E2E-RUNNER-SPEED-ACCURACY-PHASES.md`).
- **This machine:** `npx @playwright/mcp@latest --help` works. **Not wired** into Claude MCP (`claude mcp list` has no playwright).

### 3.4 Everyone else (context, not a pick)

| Product | Status (docs) | Fit here |
|---------|---------------|----------|
| **ChatGPT Operator** | Folded into **ChatGPT agent** 2025-07-17; standalone site sunset (OpenAI). Wikipedia: shut down 2025-08-31 | Not a local/CI tool. Do not plan on Operator. |
| **ChatGPT agent / Atlas** | Consumer cloud browser + agent mode | Cannot gate `ittYY-*` on 127.0.0.1 in GH Actions |
| **Browser Use** | OSS; claimed **89.1% WebVoyager** (their 2024/25 report, 586 tasks). 2026 commentary: that bench is saturated | Fine for a Python visitor demo. Same nondeterminism as Computer Use. Not a 2,585-test replacement. |
| **Chrome DevTools MCP** | CDP/console/perf | Complements Playwright for debug, not REAL storage gates |

---

## 4. Claude specifically — pros and cons **for this repo**

Split by product. “Claude” is not one switch.

### 4.1 Claude Computer Use

**Pros (real for U3 / maybe U2)**

- Sees what a visitor sees: Windows desktop, Netscape 1.0 toolbar, Mosaic gray, under-construction GIF, “Transferring inline images…”. Playwright a11y **does not**.
- Can wander without selectors. Useful when a year page is table soup + image map + GIF counter.
- Zoom action (`computer_20251124` + `enable_zoom`) is aimed at the exact failure mode of 16×22 digit GIFs and cramped 1994 toolbars.
- Official rec viewport **1280×720** matches how we already screenshot (probe used 1280×800).
- Sandbox/Docker matches “don’t give the model the host.” Museum is static; allowlist `127.0.0.1` is easy.

**Cons (fatal for U1; expensive for U2 at scale)**

- **Cannot replace Playwright.** No `localStorage` assertion, no year-prefix isolation, no `waitKey`, no shard in `ci.yml`.
- Official: click/scroll/latency/beta. Our 1994 chrome is *designed* to look like 1994 — small icon buttons, status bar text, nested iframe. That is the documented miss-click set.
- Prompt injection is not theoretical here. Pages *intentionally* say “Accept all”, “REAL”, “Save”, period marketing. Classifiers that “ask a human” break CI.
- Cost: every step is a screenshot. 27 years × multi-step REAL × retries would dwarf the current e2e bill (which is $0 model + CPU).
- **Not runnable here** until an API key exists. I will not claim a success rate I did not measure on this museum.

### 4.2 Claude in Chrome (`--chrome` / side panel / Cowork)

**Pros (best Claude product for U3 + U5 + U4)**

- Live Chrome: CSS, GIFs, dial-up overlay, actual fonts. Same pixels a visitor gets.
- Docs: can read **console, network, DOM** — so it *can* check `localStorage` if asked, unlike Computer Use.
- Claude Code loop: edit year CSS → open `http://127.0.0.1:8080/years/1994/` → “does the chrome still look like Netscape 1.0?” That is the authenticity hole CI does not cover.
- Recorded workflows fit “skip dial-up → Starting Point → one-thing REAL” as a **human-watched** tour, not a gate.
- Multi-tab fits hub + year + about + Wayback research.

**Cons**

- **Not CI.** Paid plan, extension, logged-in Chrome, not headless, not GitHub Actions.
- Full access to **your** Chrome session (debugger, tabs, downloads). Museum is local, but one “also check archive.org” and you are on the live web with prompt-injection risk Anthropic documents.
- **This laptop: not connected.** Installing the extension is a human step.
- Chrome-only. Museum Playwright also covers Firefox/WebKit in principle; we currently run Chromium, but CI must not become “whatever Claude’s Chrome did.”
- Side-panel / Cowork will consume subscription usage; 2,585 tests through it would be malpractice.

### 4.3 Claude Code + Playwright MCP (not “Claude browser,” but the coding-agent fit)

**Pros**

- Same engine as CI. Deterministic clicks, iframe-aware if prompted, `waitForFunction` for `ittYY-*`.
- Hub + about pages: a11y snapshots are small and complete (77 nodes / 3.8 KB on 1995 about).
- Free server (`npx @playwright/mcp`). Model tokens only.
- Matches existing helpers: `enterYear`, `goInFrame`, `waitKey`, `waitYearGame`.

**Cons**

- Default snapshot **misses iframe content**. Without a skill/doc that says “always snapshot `#content` / child frame,” Claude will drive Netscape chrome and report the year empty.
- No visual authenticity. A11y cannot see `#C0C0C0` vs white, GIF animation, or a wrong wordmark.
- Token cost of dumping 371-node hub trees repeatedly (Playwright MCP critiques in 2026 blogs are about this). Prefer our existing specs over “agent, explore the whole hub every PR.”

---

## 5. Decision matrix for *this* museum

| Job | Winner | Claude? | Do not |
|-----|--------|---------|--------|
| PR/CI REAL, urlMap, links, thesis, isolation | **Playwright + Python static** (already) | Only as the author of tests, not the runner | Computer Use / Chrome ext / Browser Use in `ci.yml` |
| “Does 1994 still look like Netscape 1.0?” | **Human + screenshot**, optional Claude in Chrome or Computer Use in Docker | **Yes — this is Claude’s actual job** | Assert pixels in Playwright without brand-pixel policy |
| Generate / debug e2e while coding | **Claude Code + Playwright MCP** (after wiring) + existing helpers | Yes, as IDE | Trust MCP parent snapshot on year shells |
| Visitor-like tour / find dead-end UX | Claude in Chrome **watched**, or a one-off Computer Use demo | Optional | Fail the suite because the agent clicked Accept all |
| Wayback / WDM / capture research | Claude in Chrome + human confirm | Yes, U4 | Unsupervised live-web Computer Use writing into `docs/references/` |
| Replace Operator | N/A — Operator is gone | — | Any plan that says “we’ll use Operator” |

---

## 6. If we ever integrate (not done)

Only after you say implement. Order by ROI, no CI replacement:

1. **Skill / helper note for agents:** year content is `#content` iframe; skip `#skip-connect`; REAL = localStorage JSON not banner text; 2018 Accept all is a trap.
2. **Optional:** `claude mcp add` Playwright MCP for local Claude Code. Still run `npm run test:e2e:gate` as truth.
3. **Optional:** Claude in Chrome on `http://127.0.0.1:8080` for visual authenticity reviews of 1994 / 1999 / 2005 chrome. Human watches. Never on Actions.
4. **Optional later:** Computer Use Docker demo “tour 1994 then stop” as a museum exhibit or research tool. Separate from CI. Needs API key + allowlist.
5. **Never:** screenshot-diff gates on brand pixels; agent loop as fail-fast CI; sending live-web Computer Use at archive.org unsupervised.

---

## 7. ROI (honest)

| Move | Time to do | What it buys | What it does not buy |
|------|------------|--------------|----------------------|
| Wire Playwright MCP + iframe skill | ~1–2 h | Faster test authoring in Claude Code | Zero new visitor confidence |
| Claude in Chrome visual pass on 3 years | install + 30 min watch | Catches “chrome looks like 2016” bugs a11y misses | Not repeatable in CI |
| Computer Use API harness | Docker + key + a day | A true visitor-shaped agent for demos | Flaky, slow, paid; not 2,585 tests |
| Put any of the above in `ci.yml` | — | **Negative ROI** | Breaks the runner policy we just fixed |

The expensive problem this week is still **Playwright wall-clock / GHA shards**, not “we lack an agent browser.” Agent browsers do not make 2,585 tests faster. They add a second, nondeterministic, token-metered path that cannot see `itt95-thesis-ack`.

---

## 8. Bottom line

- **Claude Computer Use** = eyes + mouse on a VM. Right for **looking** at 1994. Wrong for **proving** REAL. Beta, slow, injection-sensitive, not runnable here without a key.
- **Claude in Chrome** = best Claude product for **this** museum’s authenticity + coding loop. Not installed on this machine. Not CI.
- **Claude + Playwright MCP** = right coding-agent attach, **if** we teach it the iframe. Missing from `claude mcp list` today.
- **Playwright e2e** remains the only thing that, today, entered 1994 in 193 ms, proved 1995 thesis incomplete/complete in 252 ms / 1.7 s, and showed 2018 Accept all does not write `itt18-game-consentdash`.

I did not implement wiring. Say if you want (a) Playwright MCP + iframe skill, (b) a Computer Use Docker demo once a key exists, or (c) a Claude-in-Chrome visual checklist — in that order.
