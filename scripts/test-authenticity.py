#!/usr/bin/env python3
"""
Static authenticity + regression tests (no browser).

Checks invariants from IMPROVEMENT-RESEARCH / Sprint A–C:
  - eBay 1997 logo is not multicolor modern palette
  - no bare href="#" in content (except data-* handlers)
  - museum voice not flooding content pages
  - period assets exist for Space Jam / HoTMaiL
  - Amazon cart controls are input, not button
  - Space Jam hub references planet GIFs
  - homestead + webring markup present
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
failures: list[str] = []
passes = 0


def ok(name: str) -> None:
    global passes
    passes += 1
    print(f"  OK  {name}")


def fail(name: str, detail: str) -> None:
    failures.append(f"{name}: {detail}")
    print(f"  FAIL  {name}: {detail}")


def read(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def test_ebay_css_not_multicolor() -> None:
    css = read(ROOT / "css/period-1997.css")
    # Modern multicolor palette must not be present
    bad = [
        r"\.eb-e\s*\{\s*color:\s*#e53238",
        r"\.eb-b\s*\{\s*color:\s*#0064d2",
        r"\.eb-a\s*\{\s*color:\s*#f5af02",
        r"\.eb-y\s*\{\s*color:\s*#86b817",
    ]
    for pat in bad:
        if re.search(pat, css, re.I):
            fail("ebay-css-black", f"found multicolor rule matching {pat}")
            return
    if "color: #000000" not in css and "color: #000" not in css:
        # soft: at least black assignment for .eb-logo
        if ".eb-logo" not in css:
            fail("ebay-css-black", "missing .eb-logo rules")
            return
    ok("ebay-css-black")


def test_ebay_html_wordmark() -> None:
    for p in (ROOT / "years/1997/sites/ebay").glob("*.html"):
        s = read(p)
        if 'class="eb-e"' in s or "class='eb-e'" in s:
            fail("ebay-html-wordmark", f"{p.name} still has multicolor spans")
            return
        if "eb-logo" in s and "eBay" not in s and "ebay" not in s.lower():
            fail("ebay-html-wordmark", f"{p.name} logo missing eBay text")
            return
    ok("ebay-html-wordmark")


def test_no_bare_hash_hrefs() -> None:
    """Bare href='#' without data-* is immersion-breaking."""
    bare_re = re.compile(r"<a\s+([^>]*?)>", re.I)
    href_re = re.compile(r"""href\s*=\s*["']#["']""", re.I)
    data_re = re.compile(r"\bdata-[\w-]+", re.I)
    total = 0
    offenders: list[str] = []
    for year in ("1994", "1995", "1996", "1997"):
        for p in (ROOT / "years" / year).rglob("*.html"):
            s = read(p)
            for m in bare_re.finditer(s):
                attrs = m.group(1)
                if href_re.search(attrs) and not data_re.search(attrs):
                    total += 1
                    if len(offenders) < 8:
                        offenders.append(str(p.relative_to(ROOT)))
    if total:
        fail("no-bare-hash", f"{total} bare href=# (e.g. {', '.join(offenders)})")
    else:
        ok("no-bare-hash")


def test_amazon_period_inputs() -> None:
    button_add = 0
    input_add = 0
    for p in (ROOT / "years").rglob("*.html"):
        if "/amazon/" not in str(p).replace("\\", "/"):
            continue
        s = read(p)
        button_add += len(re.findall(r"<button[^>]*data-add-cart", s, re.I))
        input_add += len(re.findall(r"<input[^>]*data-add-cart", s, re.I))
    if button_add > 0:
        fail("amazon-period-inputs", f"{button_add} <button data-add-cart> remain")
    elif input_add == 0:
        fail("amazon-period-inputs", "no data-add-cart inputs found")
    else:
        ok(f"amazon-period-inputs ({input_add} inputs)")


def test_spacejam_assets_and_hub() -> None:
    assets = ROOT / "assets/period/1996/spacejam"
    needed = [
        "planet-jam.gif",
        "planet-lineup.gif",
        "planet-press.gif",
        "planet-bball.gif",
        "planet-tunes.gif",
        "planet-jump.gif",
        "planet-junior.gif",
        "planet-souvenirs.gif",
        "planet-store.gif",
        "planet-sitemap.gif",
    ]
    missing = [n for n in needed if not (assets / n).is_file()]
    if missing:
        fail("spacejam-assets", f"missing {missing}")
        return
    hub = read(ROOT / "years/1996/sites/spacejam/index.html")
    if "border-radius" in hub and "sj-planet" in hub and "planet-jam.gif" not in hub:
        fail("spacejam-hub", "hub still CSS-circle only")
        return
    if "planet-jam.gif" not in hub:
        fail("spacejam-hub", "hub missing planet GIF refs")
        return
    # subpages exist
    for name in ("bball.htm", "tunes.htm", "jump.htm", "store.htm", "sitemap.htm"):
        if not (ROOT / "years/1996/sites/spacejam/cmp" / name).is_file():
            fail("spacejam-pages", f"missing cmp/{name}")
            return
    ok("spacejam-assets-and-hub")


def test_homestead_webring_markup() -> None:
    if not (ROOT / "years/1995/sites/geocities/homestead.html").is_file():
        fail("homestead", "missing homestead.html")
        return
    if not (ROOT / "years/1995/sites/geocities/my-homestead.html").is_file():
        fail("homestead", "missing my-homestead.html")
        return
    hs = read(ROOT / "years/1995/sites/geocities/homestead.html")
    if "data-homestead-form" not in hs:
        fail("homestead", "missing data-homestead-form")
        return
    rings = 0
    for p in (ROOT / "years/1995/sites/geocities").rglob("index.html"):
        if "data-webring" in read(p):
            rings += 1
    if rings < 4:
        fail("webring", f"only {rings} pages with data-webring")
        return
    # immersion core must implement handlers
    core = read(ROOT / "js/immersion-core.js")
    if "initHomestead" not in core or "initWebring" not in core:
        fail("immersion-handlers", "missing initHomestead/initWebring")
        return
    if "initSecureCheckoutBanner" not in core and "setSecureMode" not in core:
        fail("ssl-handlers", "missing SSL theater hooks")
        return
    ok("homestead-webring-markup")


def test_ssl_browser_api() -> None:
    core = read(ROOT / "js/browser-core.js")
    if "setSecureMode" not in core:
        fail("ssl-browser-api", "browser-core missing setSecureMode")
        return
    if "maybePhoneEvent" not in core:
        fail("phone-line", "browser-core missing maybePhoneEvent")
        return
    if "ITT.activeBrowser" not in core and "activeBrowser" not in core:
        fail("ssl-browser-api", "activeBrowser not exported")
        return
    ok("ssl-and-phone-api")


def test_hotmail_assets() -> None:
    logo = ROOT / "assets/period/1996/hotmail/logo.gif"
    if not logo.is_file():
        fail("hotmail-logo", "missing assets/period/1996/hotmail/logo.gif")
        return
    page = read(ROOT / "years/1996/sites/hotmail/index.html")
    if "data-hotmail-login" not in page:
        fail("hotmail-page", "login form missing")
        return
    ok("hotmail-assets")


def test_museum_voice_bounded() -> None:
    """Content sites should not be flooded with 'this exhibit'."""
    hits = 0
    for year in ("1994", "1995", "1996", "1997"):
        for p in (ROOT / "years" / year / "sites").rglob("*.html"):
            s = read(p).lower()
            if "this exhibit" in s or "educational reconstruction" in s:
                hits += 1
    # About pages are under pages/, not sites/ — allow a few residual site hits
    if hits > 12:
        fail("museum-voice", f"{hits} site pages still say 'this exhibit' / educational reconstruction")
    else:
        ok(f"museum-voice-bounded ({hits} residual site pages)")


def test_urlmap_new_paths() -> None:
    cfg95 = read(ROOT / "js/config/1995.js")
    cfg96 = read(ROOT / "js/config/1996.js")
    for key in ("homestead.html", "my-homestead.html"):
        if key not in cfg95:
            fail("urlmap-1995", f"missing {key}")
            return
    for key in ("bball.htm", "tunes.htm", "sitemap.htm"):
        if key not in cfg96:
            fail("urlmap-1996", f"missing {key}")
            return
    ok("urlmap-new-paths")




def test_yahoo_1996_depth() -> None:
    root = ROOT / "years/1996/sites/yahoo"
    n = len(list(root.rglob("*.html")))
    if n < 20:
        fail("yahoo-1996-depth", f"only {n} pages (want >= 20)")
    else:
        ok(f"yahoo-1996-depth ({n} pages)")


def test_pointcast_and_slashdot() -> None:
    if not (ROOT / "years/1997/sites/pointcast/index.html").is_file():
        fail("pointcast", "missing pointcast index")
        return
    story = read(ROOT / "years/1997/sites/slashdot/story.html")
    if "data-sd-comment-form" not in story:
        fail("slashdot-comments", "missing comment form")
        return
    core = read(ROOT / "js/immersion-core.js")
    if "initSlashdotComments" not in core or "initAmazonRecs" not in core:
        fail("immersion-sprint-d", "missing new init handlers")
        return
    ok("pointcast-slashdot-recs")



def test_ci_includes_authenticity() -> None:
    """Authenticity must stay in the CI gate (pipeline plan)."""
    wf = ROOT / ".github/workflows/ci.yml"
    if not wf.is_file():
        fail("auth-in-ci", "missing ci.yml")
        return
    if "test-authenticity.py" not in read(wf):
        fail("auth-in-ci", "ci.yml does not run test-authenticity.py")
        return
    ok("auth-in-ci")


def test_1997_pointcast_urlmap() -> None:
    cfg = read(ROOT / "js/config/1997.js")
    if "pointcast" not in cfg:
        fail("pointcast-urlmap", "1997 config missing pointcast")
        return
    if not (ROOT / "years/1997/sites/pointcast/index.html").is_file():
        fail("pointcast-urlmap", "missing pointcast pages")
        return
    ok("pointcast-urlmap")


def test_immersion_boot_markers() -> None:
    """Immersion loaders should set data-itt-immersion-booted for e2e guards."""
    found = False
    for p in (ROOT / "js").glob("immersion*.js"):
        t = read(p)
        if "data-itt-immersion-booted" in t or "itt-immersion-booted" in t:
            found = True
            break
    # also check core
    if "itt-immersion-booted" in read(ROOT / "js/immersion-core.js") or "immersion-booted" in read(ROOT / "js/immersion-core.js"):
        found = True
    # check thin loaders
    for y in ("1995", "1996", "1997"):
        t = read(ROOT / f"js/immersion-{y}.js")
        if "booted" in t or "Immersion.create" in t:
            found = True
    if not found:
        # e2e waits on data-itt-immersion-booted — verify attribute is set somewhere
        core = read(ROOT / "js/immersion-core.js") + read(ROOT / "js/immersion-1995.js")
        if "data-itt-immersion-booted" not in core and "itt-immersion-booted" not in core:
            # search all js
            for jp in (ROOT / "js").rglob("*.js"):
                if "data-itt-immersion-booted" in read(jp):
                    found = True
                    break
        else:
            found = True
    if not found:
        fail("immersion-boot-marker", "data-itt-immersion-booted never set")
        return
    ok("immersion-boot-marker")

def main() -> int:
    print("Authenticity static tests")
    print("=" * 40)
    tests = [
        test_ebay_css_not_multicolor,
        test_ebay_html_wordmark,
        test_no_bare_hash_hrefs,
        test_amazon_period_inputs,
        test_spacejam_assets_and_hub,
        test_homestead_webring_markup,
        test_ssl_browser_api,
        test_hotmail_assets,
        test_museum_voice_bounded,
        test_urlmap_new_paths,
        test_yahoo_1996_depth,
        test_pointcast_and_slashdot,
        test_ci_includes_authenticity,
        test_1997_pointcast_urlmap,
        test_immersion_boot_markers,
    ]
    for t in tests:
        t()
    print("=" * 40)
    print(f"{passes} passed, {len(failures)} failed")
    if failures:
        for f in failures:
            print(f"  • {f}")
        return 1
    print("ALL AUTHENTICITY CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
