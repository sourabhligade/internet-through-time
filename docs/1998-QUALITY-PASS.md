# 1998 Quality Pass — research → UX (2026-07-22)

**Goal:** Move MVP from “scaffolded” to **high-quality and user-friendly** without losing period authenticity.

## Research inputs used

| Source | UX takeaway applied |
|--------|---------------------|
| WA Google Dec 1998 | Sparse home, Google! brand, Search + I’m Feeling Lucky |
| WA Yahoo Dec 1998 | Dense service strip + My Yahoo personalization |
| WA Excite Jul 1998 | My News / Stocks / Chat modules, stickiness |
| Version Museum Amazon 1998 | Books + Music tabs, CD store callout |
| Cybercultural portals/search 1998 | Portals still dominate attention; Google is newcomer |
| 1997 room UX patterns | Tour table, activity trail, address-bar hints, clear Start-here |

## Problems found in MVP

1. **No `locationHints`** — typing `google` in Address bar did nothing  
2. Home page was a **lecture**, not a launch pad  
3. Google looked like a placeholder (plain black logo, Lucky broken)  
4. Excite modules were static (no “personalize” feedback)  
5. No **My Yahoo!** page (core 1998 portal story)  
6. Tour complete text still said Bookmarks (NN word) not Favorites  
7. Amazon Music buried — users might miss CDs  

## Fixes shipped this pass

| Fix | Where |
|-----|--------|
| locationHints + dir/commands | `js/config/1998.js` |
| Start-here 3-click path + clearer tips | `pages/home.html` |
| Multicolor Google! + Lucky → top result | `sites/google/*`, `immersion/google.js` |
| Better result list + empty-state tips | google search |
| My Yahoo! personalization page | `sites/yahoo/my.html` |
| Excite show/hide modules (localStorage) | `sites/excite/index.html` |
| Amazon music promo banner | `sites/amazon/index.html` |
| Friendlier tour hints + tourCompleteHint | `immersion-1998.js`, `shared.js` |
| About page = how to use | `pages/about.html` |
| CSS polish for Google hits / Excite modules | `period-1998.css` |

## User journey (intended)

1. Hub → 1998 → Skip dial-up (or watch it once)  
2. Yellow tour or **Start here** bar: Google → Yahoo → Amazon Music  
3. Address bar shortcuts: `google`, `yahoo`, `ebay`, `excite`…  
4. Activity panel fills as cart/tour progress  

## Still later (pixel / depth)

- Real GIF harvest into `assets/period/1998/`  
- Win98 Start button crop  
- Deeper Yahoo metros / world list  
- eBay pixel match + denser categories  
- Feeling Lucky edge cases on empty query (defaults to yahoo-rank)

## SRP follow-up (same day)

1998 interactive behavior is loaded only via year-filtered modules (no page inline logic):

| Module | Responsibility |
|--------|----------------|
| `js/immersion/google.js` | Search form, results, I’m Feeling Lucky |
| `js/immersion/excite.js` | My Excite personalize toggles |
| `js/immersion/yahoo.js` | My Yahoo personalize toggles |
| `js/immersion/amazon.js` | Cart / books+CDs (shared years) |
| `js/immersion/auction.js` | Bids + `auction-last` activity trail |
| `js/immersion/create.js` | Orchestrator only |
| `js/config/immersion-1998.js` | Data: tour, catalogs, feature flags |

Boot list: `js/immersion-1998.js` → `FEATURES_BY_YEAR["1998"]`.

## Definition of “high quality” for this pass

- First-time user finds Google, Yahoo, and a CD purchase in **under 2 minutes**  
- Address bar site names work  
- Tour progress is obvious  
- No museum-voice walls of text on content sites  
- Period story (portals vs Google) is *felt*, not only stated  
