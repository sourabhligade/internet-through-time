# 2000 — Mock vs real flows (research + fix log)

**Date:** 2026-07-31  
**Scope:** Year **2000** crash exhibit — which interactions were still mock/copy-only, which are live localStorage theaters, and what we upgraded.

## What “real” means here

| Real (good) | Still intentionally not real |
|-------------|------------------------------|
| Button/form **changes localStorage** | No bank, no SMTP, no P2P files, no SWF malware |
| Second page **reads** that storage | No live eBay/PayPal/Napster networks |
| e2e can assert DOM/storage mutation | Download = progress theater (`data-itt-download`) |

Prefix for 2000: **`itt00-*`**.

---

## Already real (before this pass)

| Flow | How |
|------|-----|
| Amazon cart / checkout | `data-add-cart` · `itt00-amazon-cart` · cart/checkout pages |
| eBay bid | `data-auction-id` · `data-bid-form` · `itt00-bid-<id>` + `-hist` |
| Napster search | `data-napster-search` · catalog rows · library storage |
| Google search | `data-google-search` · results from catalog |
| Yahoo / Excite modules | personalize toggles |
| Blogger post | `data-blogger-post` · view page |
| GeoCities guestbook | `data-guestbook` |
| Napster / IE / Netscape downloads | `data-itt-download` status UI |
| Slashdot comments | `data-sd-comment-form` (slashdot.js loads for 2000) |

---

## Were mock / weak → **made real 2026-07-31**

| Flow | Was | Now |
|------|-----|-----|
| **Pets.com shop** | Add buttons without solid ids; linked only to Amazon cart | Full `data-add-cart` + **`pets/cart.html`** with `data-cart-list` · shared `itt00-amazon-cart` |
| **eBay register** | GET form, “demo only”, My eBay static | Saves **`itt00-ebay-user`** · redirects · My eBay shows user |
| **My eBay** | Hard-coded “3 watching / 1 bid” | Reads registration + **`itt00-bid-*`** / `-hist` counts |
| **PayPal send** | Status line only, no visible ledger | **History table** from `itt00-paypal-sends` after each send |

---

## Still mock by design (OK)

| Flow | Why leave mock |
|------|----------------|
| RealAudio “sample tracks” on Amazon CDs | No copyrighted audio |
| Flash / Matrix intro / Skip Intro | No SWF payload |
| Modem dial-up | Web Audio synth / delay only |
| WinME / IE5.5 “download” ISO | Theater progress only |
| Y2K midnight, Homestar, culture stubs | Narrative rooms |
| eBay sell form → bid-confirm | Could store listings later (optional) |

---

## Optional next (not done)

1. eBay **sell** → persist draft listing to `itt00-ebay-listings` · show on My eBay Selling  
2. Pets **checkout** page with pets branding (today reuses Amazon checkout path)  
3. Napster library page that lists `itt00-napster-lib` downloads  
4. Hard e2e: pets cart + paypal history + ebay register  

---

## Manual QA (local server)

```
http://127.0.0.1:8080/years/2000/
```

1. Pets → Shop → Add → Cart → item appears · Remove works  
2. eBay → Register → My eBay shows User ID  
3. eBay → Laptop → bid → My eBay bid count updates  
4. PayPal → Send Money → row appears under Recent sends  

---

## Files touched

```
years/2000/sites/pets/shop.html
years/2000/sites/pets/cart.html          (new)
years/2000/sites/pets/index.html
years/2000/sites/ebay/register.html
years/2000/sites/ebay/myebay.html
years/2000/sites/paypal/send.html
js/config/2000.js                        (urlMap cart)
```
