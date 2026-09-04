# 2003 + 2004 flow recheck — 2026-07-28

## Automated suites

```bash
npx playwright test e2e/2003-*.spec.js e2e/2004-*.spec.js e2e/hub-years.spec.js --workers=2
```

**Result: 58/58 passed** (after clean local `http.server` on `:8080`; earlier run failed only because the server died mid-suite with `ERR_EMPTY_RESPONSE`).

### Covered by e2e

| Flow | Suite |
|------|-------|
| Hub → 2003/2004 open | mvp + hub-years |
| Shell boot + content iframe | hub-years · mvp |
| MySpace profile / comment / invite | live-flows · buttons |
| MySpace dirbar + address aliases | buttons |
| iTunes 99¢ buy + library persist | live-flows · buttons · mvp |
| WordPress install steps + publish + blog | live-flows · mvp |
| LinkedIn connect + invite | live-flows · buttons · mvp |
| AdSense signup · Bloglines subscribe | live-flows · mvp |
| Friendster save · Firebird download theater | live-flows |
| Dirbar signature targets · Start Settings/Run | live-flows |
| Gmail login → inbox → compose | live-flows · mvp |
| Gmail invite | buttons |
| Flickr upload → stream | live-flows |
| Thefacebook login · add friend · multi-page | live-flows · buttons |
| Digg submit · about seed honesty | live-flows · buttons |
| Firefox framing · NYT ad | mvp · buttons |
| Google IPO page | buttons |
| Home tour P0 links | live-flows · mvp |

## Residual spot-checks (Playwright one-shot)

| Flow | Result |
|------|--------|
| MySpace `comments.html` spam densify + nav buttons | **PASS** |
| Flash Skip Intro → about | **PASS** |
| Flash Player `data-itt-download` theater | **PASS** |
| Dirbar Flash + LinkedIn (shell) | **PASS** |
| Dirbar Gmail + Firefox (2004 shell) | **PASS** |
| Firefox download → thanks | **PASS** |
| 2004 Start → Settings prefs dialog | **PASS** |
| AltaVista Babelfish `form[data-babelfish]` (`action="#"` intentional) | **PASS** (JS wired in `guestbook-search.js`) |
| Yahoo Mail `form[data-yahoo-mail]` (`action="#"` intentional) | **PASS** |
| 2003 home `sites/*` links HTTP 200 | **PASS** |

## Static audit

| Check | Result |
|-------|--------|
| Signature immersion hooks present (MySpace…Digg…Flash player) | **All OK** |
| Dirbar `data-go` targets exist on disk | **All OK** (13×2003 · 13×2004) |
| Start menu `data-start-cmd` set | programs/favorites/settings/find/help/run/shutdown |
| Dead buttons on signature rooms (no onclick / data / submit) | **0** |
| Bare `href="#"` | **None** on signature rooms |
| `action="#"` on babel/yahoo mail | **OK** — immersion intercepts |
| “placeholder” / “Coming soon” greps | **False positives** — HTML `placeholder=` attrs · period iTunes copy |

## Immersion JS coverage

Critical data attrs resolve in `js/immersion/*`: myspace · itunes · li · adsense · bloglines · friendster · gmail · flickr · fb · digg · itt-download · yahoo-mail · babelfish.

## Conclusion

**Flows are live for 2003/2004 signature + shell paths.** No mock-only signature theaters found. Long-tail continuity rooms (GeoCities “coming soon” copy, Wikipedia edit placeholder language) are period framing, not dead P0 controls.
