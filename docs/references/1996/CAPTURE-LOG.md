# 1996 capture log

**Updated:** 2026-07-28 — TO-100 leftover implement pass  
**Plan:** `docs/TO-100-PERCENT/YEAR-1996.md`

| Artifact | Status | Dest |
|----------|--------|------|
| Space Jam planet GIFs | `[wa]` live harvest spacejam.com/1996 | `assets/period/1996/spacejam/` |
| Yahoo yellow logo | `[recon-v2]` late-1996 yellow bar wordmark | `yahoo/logo.gif` · `logo-yellow.gif` |
| HoTMaiL logo | `[recon-v2]` blue/orange wordmark | `hotmail/logo.gif` |
| Excite orange header | `[recon-v2]` | `excite/logo.gif` · `header.gif` |
| NN3 chrome toolbar | `[recon-v2]` | `chrome/btn-*.gif` |
| Win95 Start | `[recon-v2]` | `win95/start.gif` |

## Implement pass notes
- Space Jam hub planets audited · sitemap complete · dangling usemap removed  
- HoTMaiL login densified · viral footer on compose  
- Excite/CNN/GeoCities densified multi-page flows  
- Shell wired to `assets/period/1996/chrome/`  

## Residual optional
- True evolt NN3 OEM crops  
- True WA Yahoo yellow / Excite orange from CDX  

## Implement pass 2026-07-29 (residual densify + flows)

| Item | Status |
|------|--------|
| Amazon cart/checkout densify | **Done** · hooks `data-cart-*` / `data-checkout-*` · prefix `itt96` |
| AuctionWeb item densify | **Done** · bid e2e hard |
| CNN / Excite / Yahoo hubs | **Done** |
| GeoCities guestbook wrappers | **Done** · missing `data-guestbook` parents fixed |
| Hard flows e2e | **`e2e/1996-flows.spec.js` green** |

## Exact-UI harvest 2026-07-28 (sources, not RECON)

| Artifact | Source | Status | Dest |
|----------|--------|--------|------|
| HoTMaiL logo | WA `19971210171246` · `http://209.1.112.251/hotmail_logo.gif` | **[wa]** GIF 171×128 | `hotmail/logo-wa.gif` |
| HoTMaiL slogan | same capture host `slogan_bl.gif` | **[wa]** | `hotmail/slogan-wa.gif` |
| HoTMaiL Enter btn | `home_do_enter.gif` | **[wa]** | `hotmail/btn-enter-wa.gif` |
| HoTMaiL Login/Pass labels | `home_lbllogin.gif` · `home_lblpasswd.gif` | **[wa]** | `hotmail/lbl-*-wa.gif` |
| Yahoo cat banner Dec 1996 | WA `19961220160526im_/http://www.yahoo.com/images/cat3.gif` | **[wa]** GIF 447×57 | `yahoo/banner-cat3-wa.gif` |
| Yahoo cat banner 1997 | WA `19970606172906` cat3.1.gif | **[wa]** | `yahoo/banner-cat3-1997-wa.gif` |

**Primary capture page:** https://web.archive.org/web/19971210171246id_/http://hotmail.com/

### Still NOT exact (needs VM / screenshot crop)

| Need | How to get exact UI |
|------|---------------------|
| NN2/NN3 toolbar buttons | evolt.org install → Win95 VM → crop toolbar GIFs |
| Win95 Start exact | GUIdebook Win95 screenshots or shell32 extract from Win95 ISO |
| IE4/IE6 OEM toolbar | evolt IE install + screenshot crop |

Staged copies: `docs/references/harvest/found-assets/ui-exact-2026-07-28/`
