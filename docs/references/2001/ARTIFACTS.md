# 2001 artifacts — build kit

**Status:** Deep research **complete** · **MVP on disk** · **Phase 11 re-verify complete** (2026-07-26). Residual = **Phase 9 pixels** only (+ optional densify).  
**Companions:** [`2001-RESEARCH.md`](../../2001-RESEARCH.md) · [`2001-DEEP-RESEARCH-2026-07-26.md`](../../2001-DEEP-RESEARCH-2026-07-26.md) · **[`2001-IMPLEMENTATION-PHASES.md`](../../2001-IMPLEMENTATION-PHASES.md)** (phases · steps · goals) · CAPTURE-LOG · wayback-extracts/*

## Scaffold note

```bash
# If git history still holds interim pack:
git checkout HEAD -- assets/period/2001/ 2>/dev/null || mkdir -p assets/period/2001/{amazon,google,chrome,xp,apple,blogger,wikipedia,yahoo,ebay,cnn}
# Prefer re-harvest WA logos over silent RECON
```

## P0 artifact checklist

| Artifact | Source | Extract | Disk target | Status |
|----------|--------|---------|-------------|--------|
| XP Luna Start / taskbar | GUIdebook WinXP | deep research §4 | `xp/` | `[queued]` RECON only |
| IE6 toolbar + throbber | evolt VM | — | `chrome/` | `[queued]` |
| Wikipedia UseMod grammar | WA Jul 2001 | `wikipedia-2001-07-wa-notes` | HTML/CSS | **shipped** |
| Wikipedia late densify | WA Dec wikipedia.com | `wikipedia-2001-12-com-wa-notes` | HTML | extract **done** |
| iPod hero + slogan | WA Nov ipod | `apple-ipod-2001-11` | HTML (no apple/ GIF pack) | **shipped** HTML; stills open |
| iTunes 2 library features | WA Nov itunes | `itunes-2001-11` + launch notes | HTML | **shipped** |
| Google sparse logo | WA Nov google | `google-2001-11` | `google/logo-wa.gif` | **shipped** WA logo |
| Amazon smile + tabs | VM + WA Oct | `amazon-2001-10` | `amazon/` | **shipped** smile-wa |
| Yahoo 2001 rails | WA Nov | `yahoo-2001-11` | HTML | **shipped** (news re-yearfixed) |
| CNN Nov 2001 | WA Nov | `cnn-2001-11` | HTML | **shipped** (re-yearfixed) |
| Blogger Pyra | WA Dec | `blogger-2001-12` | `blogger/` | extract **done** |
| Movable Type 1.2 | WA Dec | `movabletype-2001-11` | HTML | **shipped** lean |
| Blogdex top links | WA Nov 30 | `blogdex-2001-11` | HTML | **shipped** lean |
| eBay marketplace | WA pages.ebay | `ebay-2001-10` | HTML | extract **done NEW** |
| Mozilla 0.9.4 honesty | WA Sep | `mozilla-2001-09` | HTML | extract **done NEW** |
| Wayback / IA meta | WA + Cybercultural | archive + wayback-launch notes | HTML | **shipped** theater |

## Banned

iTunes Store · Friendster mass UI · modern Vector wiki · XP-as-universal-in-January without care · IE7 · Firefox brand · Blogger-by-Google

## Harvest order at Phase 0

1. Google logo.gif from WA `im_`  
2. iPod stills from Akamai paths in ipod extract  
3. XP/IE6 chrome crops (GUIdebook/evolt)  
4. Amazon smile production confirm  
5. Wire HTML only after visual check  

## Extract count

**23** files under `wayback-extracts/` after 2026-07-26 pass.
