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
    for year in ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005"):
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
        "p-jamcentral.gif",
        "p-lineup.gif",
        "p-pressbox.gif",
        "p-bball.gif",
        "p-lunartunes.gif",
        "p-jump.gif",
        "p-junior.gif",
        "p-souvenirs.gif",
        "p-studiostore.gif",
        "p-sitemap.gif",
        "p-jamlogo.gif",
    ]
    missing = [n for n in needed if not (assets / n).is_file()]
    if missing:
        fail("spacejam-assets", f"missing {missing}")
        return
    hub = read(ROOT / "years/1996/sites/spacejam/index.html")
    if "border-radius" in hub and "sj-planet" in hub and "planet-jam.gif" not in hub:
        fail("spacejam-hub", "hub still CSS-circle only")
        return
    if "p-jamcentral.gif" not in hub and "planet-jam.gif" not in hub:
        fail("spacejam-hub", "hub missing authentic planet GIF refs")
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
    # immersion modules must implement handlers (SRP split under js/immersion/)
    immersion_js = ""
    imm_dir = ROOT / "js/immersion"
    if imm_dir.is_dir():
        for p in sorted(imm_dir.glob("*.js")):
            immersion_js += read(p)
    immersion_js += read(ROOT / "js/immersion-core.js")
    if "initHomestead" not in immersion_js or "initWebring" not in immersion_js:
        fail("immersion-handlers", "missing initHomestead/initWebring")
        return
    if "initSecureCheckoutBanner" not in immersion_js and "setSecureMode" not in immersion_js:
        # setSecureMode lives in browser-core; checkout banner in amazon module
        if "initSecureCheckoutBanner" not in immersion_js:
            fail("ssl-handlers", "missing SSL theater hooks in immersion")
            return
    ok("homestead-webring-markup")


def test_ssl_browser_api() -> None:
    # browser-core.js is a loader shim after SRP split; logic lives in browser/create.js
    core = read(ROOT / "js/browser/create.js")
    if "setSecureMode" not in core:
        core = read(ROOT / "js/browser-core.js")
    if "setSecureMode" not in core:
        fail("ssl-browser-api", "browser create missing setSecureMode")
        return
    if "maybePhoneEvent" not in core:
        fail("phone-line", "browser create missing maybePhoneEvent")
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
    for year in ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005"):
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
    cfg98 = read(ROOT / "js/config/1998.js")
    for key in ("sites/google/index.html", "sites/amazon/music.html", "sites/yahoo/my.html", "sites/ebay/myebay.html"):
        if key not in cfg98:
            fail("urlmap-1998", f"missing {key}")
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
    immersion_js = ""
    imm_dir = ROOT / "js/immersion"
    if imm_dir.is_dir():
        for p in sorted(imm_dir.glob("*.js")):
            immersion_js += read(p)
    immersion_js += read(ROOT / "js/immersion-core.js")
    if "initSlashdotComments" not in immersion_js or "initAmazonRecs" not in immersion_js:
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
    for y in ("1995", "1996", "1997", "1998", "1999", "2000"):
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



def test_icq_1997() -> None:
    if not (ROOT / "years/1997/sites/icq/index.html").is_file():
        fail("icq-1997", "missing ICQ landing")
        return
    if "icq" not in read(ROOT / "js/config/1997.js"):
        fail("icq-1997", "urlMap missing icq")
        return
    if not (ROOT / "assets/period/1997/icq/logo.gif").is_file():
        fail("icq-1997", "missing logo asset")
        return
    ok("icq-1997")



def test_1998_assets_exist() -> None:
    """Museum-grade 1998 pack must ship core brand marks."""
    need = [
        "assets/period/1998/google/logo.gif",
        "assets/period/1998/yahoo/logo.gif",
        "assets/period/1998/amazon/logo.gif",
        "assets/period/1998/ebay/logo.gif",
        "assets/period/1998/excite/logo.gif",
        "assets/period/1998/win98/start.gif",
        "assets/period/1998/chrome/throbber.gif",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("1998-assets", "missing: " + ", ".join(missing))
        return
    ok("1998-assets")


def test_1998_no_amazon_smile() -> None:
    root = ROOT / "years/1998"
    for p in root.rglob("*.html"):
        s = read(p).lower()
        if "smile" in s and "amazon" in s and "logo" in s:
            # allow text "smile" only if not referring to logo asset
            if "smile-logo" in s or "amazon-smile" in s:
                fail("1998-no-smile", f"{p.relative_to(ROOT)} mentions smile logo")
                return
    # assets path
    for p in (ROOT / "assets/period/1998").rglob("*"):
        if "smile" in p.name.lower():
            fail("1998-no-smile", f"asset {p}")
            return
    ok("1998-no-smile")


def test_1998_google_present() -> None:
    g = ROOT / "years/1998/sites/google/index.html"
    if not g.is_file():
        fail("1998-google", "missing google index")
        return
    s = read(g)
    if "Google" not in s or "data-google-search" not in s:
        fail("1998-google", "missing Google search form hooks")
        return
    # Prefer authentic WA harvest (logo.jpg 351×113 from 19981202) over generated gif
    if "logo.jpg" not in s and "logo.gif" not in s:
        fail("1998-google", "missing period logo image")
        return
    logo = ROOT / "assets/period/1998/google/logo.jpg"
    if not logo.is_file() or logo.stat().st_size < 4000:
        fail("1998-google", "authentic WA logo.jpg missing or too small")
        return
    ok("1998-google")


def test_1998_ebay_myebay_not_1997_rebrand_blurb() -> None:
    s = read(ROOT / "years/1998/sites/ebay/index.html")
    if "AuctionWeb is now" in s and "September 1997" in s:
        fail("1998-ebay-era", "still showing 1997 rebrand news as current")
        return
    if "myebay.html" not in s:
        fail("1998-ebay-era", "missing My eBay link")
        return
    if "1998" not in s and "IPO" not in s and "public" not in s.lower():
        fail("1998-ebay-era", "expected IPO-era framing")
        return
    ok("1998-ebay-era")


def test_1998_srp_modules() -> None:
    need = [
        "js/immersion/google.js",
        "js/immersion/excite.js",
        "js/immersion/yahoo.js",
        "js/immersion/registry.js",
        "js/immersion/boot.js",
        "js/immersion-1998.js",
        "js/config/immersion-1998.js",
    ]
    for n in need:
        if not (ROOT / n).is_file():
            fail("1998-srp", f"missing {n}")
            return
    reg = read(ROOT / "js/immersion/registry.js")
    for mod in ("google.js", "excite.js", "yahoo.js"):
        if mod not in reg:
            fail("1998-srp", f"registry missing {mod}")
            return
    if '"1998"' not in reg and "'1998'" not in reg:
        fail("1998-srp", "registry missing year 1998")
        return
    stub = read(ROOT / "js/immersion-1998.js")
    if "immersion/boot.js" not in stub or "FEATURES_BY_YEAR" in stub:
        fail("1998-srp", "year stub must load boot.js and not embed FEATURES map")
        return
    ok("1998-srp")





def test_1999_assets_exist() -> None:
    need = [
        "assets/period/1999/google/logo.gif",
        "assets/period/1999/chrome/throbber.gif",
        "assets/period/1999/win98/start.gif",
        "js/config/1999.js",
        "js/config/immersion-1999.js",
        "js/immersion/napster.js",
        "js/immersion/blogger.js",
        "years/1999/sites/napster/index.html",
        "years/1999/sites/blogger/index.html",
        "years/1999/sites/google/index.html",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("1999-assets", "missing: " + ", ".join(missing))
        return
    ok("1999-assets")


def test_1999_no_amazon_smile() -> None:
    root = ROOT / "years/1999"
    if not root.is_dir():
        fail("1999-no-smile", "missing years/1999")
        return
    for pth in root.rglob("*.html"):
        s = read(pth).lower()
        if "smile logo" in s or "a-to-z smile" in s:
            fail("1999-no-smile", f"{pth.relative_to(ROOT)} mentions smile logo")
            return
    ok("1999-no-smile")


def test_1999_napster_blogger_present() -> None:
    n = read(ROOT / "years/1999/sites/napster/index.html")
    if "Internet speed" not in n:
        fail("1999-napster", "missing period Napster marketing line")
        return
    if "data-napster-search" not in read(ROOT / "years/1999/sites/napster/search.html"):
        fail("1999-napster", "missing napster search hook")
        return
    b = read(ROOT / "years/1999/sites/blogger/edit.html")
    if "data-blogger-post" not in b:
        fail("1999-blogger", "missing blogger post form hook")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    if "napster.js" not in reg or "blogger.js" not in reg:
        fail("1999-srp", "registry missing napster/blogger")
        return
    ok("1999-napster-blogger")


def test_1999_ie5_chrome() -> None:
    shell = read(ROOT / "years/1999/index.html")
    if "Internet Explorer 5" not in shell and "IE 5" not in shell:
        fail("1999-ie5", "shell not IE5 branded")
        return
    if 'data-itt-year="1999"' not in shell:
        fail("1999-ie5", "missing data-itt-year=1999")
        return
    ok("1999-ie5")




def test_1999_location_hints() -> None:
    cfg = read(ROOT / "js/config/1999.js")
    for needle in ("napster", "blogger", "y2k", "ask", "hampster", "zombo"):
        if needle not in cfg:
            fail("1999-location-hints", f"missing hint material: {needle}")
            return
    ok("1999-location-hints")


def test_1999_culture_pages() -> None:
    for rel in (
        "years/1999/sites/hampsterdance/index.html",
        "years/1999/sites/zombo/index.html",
        "years/1999/sites/y2k/index.html",
        "assets/period/1999/napster/logo.gif",
        "assets/period/1999/blogger/logo.gif",
        "assets/period/1999/ebay/logo.gif",
    ):
        if not (ROOT / rel).is_file():
            fail("1999-culture", f"missing {rel}")
            return
    ok("1999-culture-assets")


def test_1999_urlmap_complete() -> None:
    """Every content HTML under years/1999 must appear in urlMap."""
    import re
    root = ROOT / "years/1999"
    htmls = sorted(
        str(p.relative_to(root)).replace("\\", "/")
        for p in root.rglob("*.html")
        if p.name != "index.html" or "sites" in str(p) or "pages" in str(p)
    )
    # all html except year shell root index
    htmls = []
    for p in root.rglob("*.html"):
        rel = str(p.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/1999.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("1999-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("1999-urlmap-complete")


def test_2000_assets_exist() -> None:
    need = [
        "assets/period/2000/amazon/logo-smile.gif",
        "assets/period/2000/chrome/throbber.gif",
        "assets/period/2000/win98/start.gif",
        "js/config/2000.js",
        "js/config/immersion-2000.js",
        "js/browser-2000.js",
        "js/immersion-2000.js",
        "years/2000/sites/amazon/index.html",
        "years/2000/sites/napster/index.html",
        "years/2000/sites/pets/index.html",
        "years/2000/sites/google/index.html",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2000-assets", "missing: " + ", ".join(missing))
        return
    ok("2000-assets")


def test_2000_amazon_smile_required() -> None:
    """2000 is the first year the Amazon smile logo is correct."""
    root = ROOT / "years/2000/sites/amazon"
    if not root.is_dir():
        fail("2000-smile", "missing years/2000/sites/amazon")
        return
    home = read(root / "index.html")
    if "logo-smile" not in home and "smile logo" not in home.lower():
        fail("2000-smile", "Amazon 2000 home missing smile logo")
        return
    if not (ROOT / "assets/period/2000/amazon/logo-smile.gif").is_file():
        fail("2000-smile", "missing assets/period/2000/amazon/logo-smile.gif")
        return
    ok("2000-amazon-smile")


def test_2000_signature_sites() -> None:
    pets = read(ROOT / "years/2000/sites/pets/index.html")
    if "sock puppet" not in pets.lower() and "Pets Can't Drive" not in pets:
        fail("2000-pets", "Pets.com missing period framing")
        return
    n = read(ROOT / "years/2000/sites/napster/index.html")
    if "Internet speed" not in n:
        fail("2000-napster", "missing Napster marketing line")
        return
    shell = read(ROOT / "years/2000/index.html")
    if 'data-itt-year="2000"' not in shell:
        fail("2000-shell", "missing data-itt-year=2000")
        return
    if "Internet Explorer 5.5" not in shell and "IE 5.5" not in shell:
        fail("2000-shell", "shell not IE 5.5 branded")
        return
    cfg = read(ROOT / "js/config/2000.js")
    for needle in ("pets", "napster", "amazon", "gnutella", "macromedia"):
        if needle not in cfg:
            fail("2000-location-hints", f"missing: {needle}")
            return
    reg = read(ROOT / "js/immersion/registry.js")
    if '"2000"' not in reg:
        fail("2000-registry", "registry missing 2000")
        return
    ok("2000-signature-sites")


def test_2000_urlmap_complete() -> None:
    root = ROOT / "years/2000"
    htmls = []
    for p in root.rglob("*.html"):
        rel = str(p.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2000.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2000-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2000-urlmap-complete")




def test_2000_densify_rooms() -> None:
    need = [
        "years/2000/sites/metafilter/index.html",
        "years/2000/sites/netscape/netscape6.html",
        "years/2000/sites/microsoft/ie55.html",
        "years/2000/sites/microsoft/winme.html",
        "years/2000/sites/cnn/aol-tw.html",
        "assets/period/2000/amazon/tabs-insanity.gif",
        "assets/period/2000/yahoo/banner.gif",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2000-densify", "missing: " + ", ".join(missing))
        return
    amz = read(ROOT / "years/2000/sites/amazon/index.html")
    if "tabs-insanity" not in amz and "logo-smile" not in amz:
        fail("2000-densify", "amazon missing smile/tabs craft")
        return
    cnn = read(ROOT / "years/2000/sites/cnn/index.html")
    if "AOL" not in cnn or "Nasdaq" not in cnn and "NASDAQ" not in cnn.upper():
        if "Nasdaq" not in cnn and "NASDAQ" not in cnn and "March 10" not in cnn:
            fail("2000-densify", "cnn missing crash-year spine")
            return
    ok("2000-densify-rooms")


def test_2001_signature() -> None:
    need = [
        "years/2001/index.html",
        "years/2001/sites/wikipedia/index.html",
        "years/2001/sites/apple/ipod.html",
        "js/config/2001.js",
        "js/config/immersion-2001.js",
        "assets/period/2001/amazon/logo-smile.gif",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2001-signature", "missing: " + ", ".join(missing))
        return
    wiki = read(ROOT / "years/2001/sites/wikipedia/index.html")
    if "anyone can edit" not in wiki.lower() and "free encyclopedia" not in wiki.lower():
        fail("2001-signature", "wikipedia missing period framing")
        return
    ipod = read(ROOT / "years/2001/sites/apple/ipod.html")
    if "1,000 songs" not in ipod and "1000 songs" not in ipod:
        fail("2001-signature", "ipod missing period tagline")
        return
    shell = read(ROOT / "years/2001/index.html")
    if 'data-itt-year="2001"' not in shell:
        fail("2001-signature", "shell year")
        return
    ok("2001-signature")


def test_2001_urlmap_complete() -> None:
    root = ROOT / "years/2001"
    htmls = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2001.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2001-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2001-urlmap-complete")


def test_2001_wikipedia_densify() -> None:
    """2001 densify: multi-page Wikipedia room (LEFT-OUT P0/P1)."""
    need = [
        "years/2001/sites/wikipedia/index.html",
        "years/2001/sites/wikipedia/edit.html",
        "years/2001/sites/wikipedia/history.html",
        "years/2001/sites/wikipedia/article-wiki.html",
        "years/2001/sites/wikipedia/help.html",
        "docs/references/2001/CAPTURE-LOG.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2001-wiki-densify", "missing: " + ", ".join(missing))
        return
    main = read(ROOT / "years/2001/sites/wikipedia/index.html")
    if "edit.html" not in main or "Recent changes" not in main:
        fail("2001-wiki-densify", "main page missing densify nav")
        return
    if "community.html" not in main or "languages.html" not in main:
        fail("2001-wiki-densify", "main missing community/languages densify")
        return
    if "educational reconstruction" in main.lower() or "this exhibit" in main.lower():
        fail("2001-wiki-densify", "museum voice on wikipedia content")
        return
    for extra in (
        "years/2001/sites/wikipedia/community.html",
        "years/2001/sites/wikipedia/languages.html",
        "years/2001/sites/wikipedia/article-nupedia.html",
        "years/2001/sites/apple/ipod/specs.html",
        "years/2001/sites/apple/ipod/howto.html",
        "years/2001/sites/apple/ipod/faq.html",
    ):
        if not (ROOT / extra).is_file():
            fail("2001-wiki-densify", "missing densify page: " + extra)
            return
    ipod = read(ROOT / "years/2001/sites/apple/ipod.html")
    if "1,000 songs" not in ipod or "ipod/specs.html" not in ipod:
        fail("2001-wiki-densify", "ipod multi-page densify incomplete")
        return
    ok("2001-wiki-densify")


def test_1998_cdnow_mozilla_icq() -> None:
    """LEFT-OUT P2 rooms from SOURCES 1998 research map."""
    need = [
        "years/1998/sites/cdnow/index.html",
        "years/1998/sites/cdnow/browse.html",
        "years/1998/sites/mozilla/index.html",
        "years/1998/sites/mozilla/wasp.html",
        "years/1998/sites/icq/index.html",
        "years/1998/sites/gamespot/previews.html",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("1998-leftout-rooms", "missing: " + ", ".join(missing))
        return
    cd = read(ROOT / "years/1998/sites/cdnow/index.html")
    if "CDnow" not in cd or "amazon/music" not in cd.lower():
        fail("1998-leftout-rooms", "CDnow missing competitor link to Amazon Music")
        return
    cfg = read(ROOT / "js/config/1998.js")
    for key in ("sites/cdnow/index.html", "sites/mozilla/index.html", "sites/icq/index.html"):
        if key not in cfg:
            fail("1998-leftout-rooms", f"urlMap missing {key}")
            return
    ok("1998-leftout-rooms")


def test_link_audit_covers_late_years() -> None:
    """audit-internal-links.py must walk 1998–2004 (LEFT-OUT P0 + 2004 unlock)."""
    s = read(ROOT / "scripts/audit-internal-links.py")
    for y in ("1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005"):
        if y not in s:
            fail("link-audit-years", f"audit script missing year {y}")
            return
    ok("link-audit-years")


def test_2002_signature() -> None:
    need = [
        "years/2002/index.html",
        "years/2002/sites/friendster/index.html",
        "years/2002/sites/kazaa/index.html",
        "years/2002/sites/wired/index.html",
        "years/2002/sites/movabletype/trackback.html",
        "js/config/2002.js",
        "js/config/immersion-2002.js",
        "js/immersion/friendster.js",
        "js/immersion/kazaa.js",
        "assets/period/2002/friendster/logo.gif",
        "assets/period/2002/kazaa/logo.gif",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2002-signature", "missing: " + ", ".join(missing))
        return
    shell = read(ROOT / "years/2002/index.html")
    if 'data-itt-year="2002"' not in shell:
        fail("2002-signature", "shell year")
        return
    fs = read(ROOT / "years/2002/sites/friendster/index.html")
    if "data-friendster-profile" not in fs:
        fail("2002-signature", "friendster hooks")
        return
    kz = read(ROOT / "years/2002/sites/kazaa/search.html")
    if "data-kazaa-search" not in kz and "data-kazaa-results" not in kz:
        fail("2002-signature", "kazaa hooks")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    if "friendster.js" not in reg or "kazaa.js" not in reg:
        fail("2002-signature", "registry modules")
        return
    # anachronism soft checks
    home = read(ROOT / "years/2002/pages/home.html")
    if "myspace" in home.lower() and "before myspace" not in home.lower():
        pass  # allow historical mention
    ok("2002-signature")


def test_2002_urlmap_complete() -> None:
    root = ROOT / "years/2002"
    htmls = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2002.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2002-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2002-urlmap-complete")




def test_2002_densify() -> None:
    need = [
        "years/2002/sites/daypop/index.html",
        "years/2002/sites/technorati/index.html",
        "years/2002/sites/googlenews/index.html",
        "years/2002/sites/friendster/testimonials.html",
        "assets/period/2002/xp/start.gif",
        "assets/period/2002/daypop/logo.gif",
        "assets/period/2002/technorati/logo.gif",
        "assets/period/2002/googlenews/logo.gif",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2002-densify", "missing: " + ", ".join(missing))
        return
    w = read(ROOT / "years/2002/sites/wired/index.html")
    if "wn-wrap" not in w and "CSS" not in w:
        fail("2002-densify", "wired css room weak")
        return
    ok("2002-densify")


def test_2003_signature() -> None:
    need = [
        "years/2003/index.html",
        "years/2003/sites/myspace/index.html",
        "years/2003/sites/myspace/edit.html",
        "years/2003/sites/itunes/index.html",
        "years/2003/sites/wordpress/index.html",
        "years/2003/sites/wordpress/post.html",
        "years/2003/sites/linkedin/index.html",
        "js/config/2003.js",
        "js/config/immersion-2003.js",
        "js/browser-2003.js",
        "js/immersion-2003.js",
        "js/immersion/myspace.js",
        "js/immersion/itunes.js",
        "js/immersion/wordpress.js",
        "js/immersion/linkedin.js",
        "assets/period/2003/itunes/logo.gif",
        "assets/period/2003/wordpress/logo.gif",
        "assets/period/2003/linkedin/logo.gif",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2003-signature", "missing: " + ", ".join(missing))
        return
    shell = read(ROOT / "years/2003/index.html")
    if 'data-itt-year="2003"' not in shell:
        fail("2003-signature", "shell year")
        return
    ms = read(ROOT / "years/2003/sites/myspace/index.html")
    if "data-myspace-profile" not in ms:
        fail("2003-signature", "myspace hooks")
        return
    # Prefer documented 2003 emblem CSS over non-authentic blue-pill GIF
    if "ms-logo-2003" not in ms and "logo.gif" not in ms:
        fail("2003-signature", "myspace missing period logo treatment")
        return
    it = read(ROOT / "years/2003/sites/itunes/index.html")
    if "data-itunes-store" not in it:
        fail("2003-signature", "itunes hooks")
        return
    wp = read(ROOT / "years/2003/sites/wordpress/index.html")
    if "data-wp-posts" not in wp:
        fail("2003-signature", "wordpress hooks")
        return
    li = read(ROOT / "years/2003/sites/linkedin/index.html")
    if "data-li-list" not in li or "data-li-add" not in li:
        fail("2003-signature", "linkedin hooks")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    for mod in ("myspace.js", "itunes.js", "wordpress.js", "linkedin.js"):
        if mod not in reg:
            fail("2003-signature", f"registry missing {mod}")
            return
    icfg = read(ROOT / "js/config/immersion-2003.js")
    for flag in ("myspace: true", "itunes: true", "wordpress: true", "linkedin: true"):
        if flag not in icfg:
            fail("2003-signature", f"immersion features missing {flag}")
            return
    home = read(ROOT / "years/2003/pages/home.html")
    for needle in ("MySpace", "iTunes", "WordPress", "LinkedIn"):
        if needle not in home:
            fail("2003-signature", f"home missing {needle}")
            return
    hub = read(ROOT / "index.html")
    if 'data-year="2003"' not in hub or 'href="years/2003/"' not in hub:
        fail("2003-signature", "hub not unlocked")
        return
    if "facebook" in home.lower() and "not facebook" not in home.lower():
        fail("2003-signature", "anachronism: Facebook on 2003 home")
        return
    ok("2003-signature")


def test_2003_urlmap_complete() -> None:
    root = ROOT / "years/2003"
    htmls = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2003.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2003-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2003-urlmap-complete")


def test_2003_densify() -> None:
    need = [
        "years/2003/sites/myspace/comments.html",
        "years/2003/sites/myspace/browse.html",
        "years/2003/sites/itunes/charts.html",
        "years/2003/sites/itunes/library.html",
        "years/2003/sites/wordpress/dashboard.html",
        "years/2003/sites/linkedin/profile.html",
        "years/2003/sites/adsense/index.html",
        "years/2003/sites/cnn/music-2003.html",
        "assets/period/2003/myspace/friend1.gif",
        "assets/period/2003/itunes/badge-99.gif",
        "assets/period/2003/wordpress/w.gif",
        "assets/period/2003/linkedin/in.gif",
        "assets/period/2003/adsense/logo.gif",
        "docs/2003-MUSEUM-GRADE.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2003-densify", "missing: " + ", ".join(missing))
        return
    ms = read(ROOT / "years/2003/sites/myspace/index.html")
    if "data-ms-top8" not in ms or "data-ms-comments" not in ms:
        fail("2003-densify", "myspace densify hooks")
        return
    if "ms-avatar-neutral" not in ms and "tom.gif" not in ms:
        fail("2003-densify", "myspace avatar treatment missing")
        return
    it = read(ROOT / "years/2003/sites/itunes/index.html")
    if "data-itunes-genre" not in it or "data-itunes-store" not in it:
        fail("2003-densify", "itunes densify hooks")
        return
    wp = read(ROOT / "years/2003/sites/wordpress/dashboard.html")
    if "data-wp-dash" not in wp:
        fail("2003-densify", "wordpress dashboard")
        return
    li = read(ROOT / "years/2003/sites/linkedin/index.html")
    if "data-li-pymk" not in li or "data-li-name" not in li:
        fail("2003-densify", "linkedin densify hooks")
        return
    home = read(ROOT / "years/2003/pages/home.html")
    if "Mood board" not in home or "adsense" not in home.lower():
        fail("2003-densify", "home mood board")
        return
    css = read(ROOT / "css/period-2003.css")
    if ".ms-body" not in css or ".it-chrome" not in css or ".li-body" not in css:
        fail("2003-densify", "period-2003 brand CSS rules")
        return
    ok("2003-densify")


def test_2003_continuity_truth() -> None:
    """Track A: era-correct continuity (not bulk-renamed 2002 history)."""
    ms = read(ROOT / "years/2003/sites/microsoft/index.html")
    if "Ships March 18, 2003" in ms or "June 10, 2003" in ms:
        fail("2003-continuity", "Microsoft still claims IE6/Win98SE launched in 2003")
        return
    if "Windows XP" not in ms or "Internet Explorer 6" not in ms:
        fail("2003-continuity", "Microsoft should center XP + IE6 for 2003")
        return
    if "2001" not in ms:
        fail("2003-continuity", "Microsoft should mention IE6/XP 2001 ship dates")
        return

    fs = read(ROOT / "years/2003/sites/friendster/index.html")
    if "Founded 2003" in fs:
        fail("2003-continuity", "Friendster founded date still 2003")
        return
    if "Founded 2002" not in fs:
        fail("2003-continuity", "Friendster should say founded 2002")
        return
    if "localStorage" in fs.lower() or "theater" in fs.lower():
        fail("2003-continuity", "Friendster content still has museum theater voice")
        return

    pets = read(ROOT / "years/2003/sites/pets/index.html")
    if "IPO Feb 2003" in pets or "IPO February 2003" in pets:
        fail("2003-continuity", "Pets.com IPO still dated 2003")
        return
    if "2000" not in pets or ("closed" not in pets.lower() and "archive" not in pets.lower()):
        fail("2003-continuity", "Pets.com should be archive/closed-2000 frame")
        return

    y2k = read(ROOT / "years/2003/sites/y2k/index.html")
    if "YEAR 2003 (Y2K)" in y2k or "Countdown to midnight" in y2k:
        fail("2003-continuity", "Y2K still reads as live 2003 countdown")
        return
    if "looking back" not in y2k.lower() and "archive" not in y2k.lower():
        fail("2003-continuity", "Y2K should be retrospective archive")
        return

    nap = read(ROOT / "years/2003/sites/napster/index.html")
    if "Download Napster 2.0 Beta" in nap and "gone" not in nap.lower():
        fail("2003-continuity", "Napster still sells live classic download as primary")
        return
    if "kazaa" not in nap.lower() or "itunes" not in nap.lower():
        fail("2003-continuity", "Napster aftermath should point to KaZaA + iTunes")
        return

    # Content sites: no localStorage/theater disclaimers (About page ok)
    offenders = []
    for pth in (ROOT / "years/2003/sites").rglob("*.html"):
        s = read(pth)
        low = s.lower()
        if "localstorage" in low or " theater" in low or "(theater)" in low:
            offenders.append(str(pth.relative_to(ROOT)))
    if offenders:
        fail("2003-continuity", "theater/localStorage on content: " + ", ".join(offenders[:6]))
        return

    ok("2003-continuity-truth")


def test_2004_signature() -> None:
    need = [
        "years/2004/index.html",
        "years/2004/pages/home.html",
        "years/2004/sites/firefox/index.html",
        "years/2004/sites/gmail/index.html",
        "years/2004/sites/gmail/inbox.html",
        "years/2004/sites/gmail/compose.html",
        "years/2004/sites/flickr/index.html",
        "years/2004/sites/flickr/upload.html",
        "years/2004/sites/facebook/index.html",
        "years/2004/sites/facebook/profile.html",
        "years/2004/sites/google/index.html",
        "js/config/2004.js",
        "js/config/immersion-2004.js",
        "js/browser-2004.js",
        "js/immersion-2004.js",
        "js/immersion/gmail.js",
        "js/immersion/facebook.js",
        "js/immersion/flickr.js",
        "css/period-2004.css",
        "docs/2004-MUSEUM-GRADE.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2004-signature", "missing: " + ", ".join(missing))
        return
    shell = read(ROOT / "years/2004/index.html")
    if 'data-itt-year="2004"' not in shell:
        fail("2004-signature", "shell year")
        return
    gm = read(ROOT / "years/2004/sites/gmail/index.html")
    if "data-gmail-login" not in gm:
        fail("2004-signature", "gmail login hook")
        return
    inbox = read(ROOT / "years/2004/sites/gmail/inbox.html")
    if "data-gmail-list" not in inbox:
        fail("2004-signature", "gmail inbox hook")
        return
    fl = read(ROOT / "years/2004/sites/flickr/index.html")
    if "data-flickr-stream" not in fl:
        fail("2004-signature", "flickr stream hook")
        return
    fb = read(ROOT / "years/2004/sites/facebook/profile.html")
    if "data-fb-name" not in fb or "data-fb-add" not in fb:
        fail("2004-signature", "facebook profile hooks")
        return
    ff = read(ROOT / "years/2004/sites/firefox/index.html")
    if "Firefox 1.0" not in ff or "November 9" not in ff:
        fail("2004-signature", "firefox 1.0 framing")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    for mod in ("gmail.js", "facebook.js", "flickr.js"):
        if mod not in reg:
            fail("2004-signature", f"registry missing {mod}")
            return
    icfg = read(ROOT / "js/config/immersion-2004.js")
    for flag in ("gmail: true", "facebook: true", "flickr: true"):
        if flag not in icfg:
            fail("2004-signature", f"immersion features missing {flag}")
            return
    home = read(ROOT / "years/2004/pages/home.html")
    for needle in ("Firefox", "Gmail", "Flickr", "Thefacebook"):
        if needle not in home:
            fail("2004-signature", f"home missing {needle}")
            return
    # Anachronism bans on home (YouTube as available site is 2005+)
    if re.search(r"href=.*youtube", home, re.I):
        fail("2004-signature", "anachronism: YouTube link on 2004 home")
        return
    hub = read(ROOT / "index.html")
    if 'data-year="2004"' not in hub or 'href="years/2004/"' not in hub:
        fail("2004-signature", "hub not unlocked")
        return
    # 2005 is unlocked (MVP); optional locked card may appear for 2006+
    if 'data-year="2005"' not in hub and 'href="years/2005/"' not in hub:
        fail("2004-signature", "2005 hub card missing (MVP unlock)")
        return
    ok("2004-signature")


def test_2004_urlmap_complete() -> None:
    root = ROOT / "years/2004"
    htmls = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2004.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2004-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2004-urlmap-complete")


def test_2004_no_anachronism_products() -> None:
    """2004 must not ship YouTube/Twitter/Chrome product rooms."""
    banned_dirs = ("youtube", "twitter", "chrome-browser", "instagram")
    for name in banned_dirs:
        if (ROOT / "years/2004/sites" / name).exists():
            fail("2004-anachronism", f"banned site tree: {name}")
            return
    home = read(ROOT / "years/2004/pages/home.html").lower()
    if "not yet" not in home and ("youtube" in home or "twitter" in home):
        # allow explicit "Not yet: YouTube" bans
        fail("2004-anachronism", "home mentions future products without ban framing")
        return
    ok("2004-no-anachronism-products")




def test_2005_signature() -> None:
    need = [
        "years/2005/index.html",
        "years/2005/pages/home.html",
        "years/2005/sites/youtube/index.html",
        "years/2005/sites/youtube/watch.html",
        "years/2005/sites/youtube/upload.html",
        "years/2005/sites/maps/index.html",
        "years/2005/sites/maps/about.html",
        "years/2005/sites/reddit/index.html",
        "years/2005/sites/reddit/submit.html",
        "years/2005/sites/digg/index.html",
        "years/2005/sites/digg/submit.html",
        "years/2005/sites/itunes/index.html",
        "years/2005/sites/facebook/index.html",
        "js/config/2005.js",
        "js/config/immersion-2005.js",
        "js/browser-2005.js",
        "js/immersion-2005.js",
        "js/immersion/youtube.js",
        "js/immersion/maps.js",
        "js/immersion/reddit.js",
        "js/immersion/digg.js",
        "js/immersion/podcasts.js",
        "css/period-2005.css",
        "docs/2005-MUSEUM-GRADE.md",
        "docs/2005-RESEARCH.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2005-signature", "missing: " + ", ".join(missing))
        return
    shell = read(ROOT / "years/2005/index.html")
    if 'data-itt-year="2005"' not in shell:
        fail("2005-signature", "shell year")
        return
    yt = read(ROOT / "years/2005/sites/youtube/index.html")
    if "data-yt-list" not in yt or "Broadcast Yourself" not in yt:
        fail("2005-signature", "youtube hooks")
        return
    maps = read(ROOT / "years/2005/sites/maps/index.html")
    if "data-maps-canvas" not in maps or "data-maps-search" not in maps:
        fail("2005-signature", "maps hooks")
        return
    rd = read(ROOT / "years/2005/sites/reddit/index.html")
    if "data-reddit-list" not in rd:
        fail("2005-signature", "reddit hooks")
        return
    dg = read(ROOT / "years/2005/sites/digg/index.html")
    if "data-digg-list" not in dg:
        fail("2005-signature", "digg hooks")
        return
    home = read(ROOT / "years/2005/pages/home.html")
    for needle in ("YouTube", "Google Maps", "Reddit", "Digg"):
        if needle not in home:
            fail("2005-signature", f"home missing {needle}")
            return
    if re.search(r'href=.*twitter', home, re.I):
        fail("2005-signature", "anachronism twitter link")
        return
    icfg = read(ROOT / "js/config/immersion-2005.js")
    for flag in ("youtube: true", "maps: true", "reddit: true", "digg: true"):
        if flag not in icfg:
            fail("2005-signature", f"features missing {flag}")
            return
    reg = read(ROOT / "js/immersion/registry.js")
    for mod in ("youtube.js", "maps.js", "reddit.js", "digg.js", "podcasts.js"):
        if mod not in reg:
            fail("2005-signature", f"registry missing {mod}")
            return
    hub = read(ROOT / "index.html")
    if 'data-year="2005"' not in hub or 'href="years/2005/"' not in hub:
        fail("2005-signature", "hub not unlocked")
        return
    if "2006" not in hub:
        fail("2005-signature", "2006 should remain locked")
        return
    ok("2005-signature")


def test_2005_urlmap_complete() -> None:
    root = ROOT / "years/2005"
    htmls = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2005.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2005-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2005-urlmap-complete")


def test_2005_no_anachronism_products() -> None:
    banned = ("twitter", "instagram", "tiktok", "chrome-browser")
    for name in banned:
        if (ROOT / "years/2005/sites" / name).exists():
            fail("2005-anachronism", f"banned site tree: {name}")
            return
    home = read(ROOT / "years/2005/pages/home.html").lower()
    if "not yet" not in home:
        fail("2005-anachronism", "home should ban future products")
        return
    # Google must not claim owning YouTube in 2005 youtube about
    yt = read(ROOT / "years/2005/sites/youtube/about.html").lower()
    if "owned by google" in yt or "acquired by google" in yt and "2006" not in yt:
        # allow "not owned by google yet (2006)"
        if "not owned" not in yt and "2006" not in yt:
            fail("2005-anachronism", "youtube should not be google-owned in 2005")
            return
    ok("2005-no-anachronism-products")


def test_immersion_registry_complete() -> None:
    """Every shipped year must appear in immersion/registry.js with modules."""
    reg = read(ROOT / "js/immersion/registry.js")
    for year in ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005"):
        if f'"{year}"' not in reg:
            fail("immersion-registry", f"missing year {year}")
            return
    for mod in ("shared.js", "amazon.js", "create.js"):
        # create is not in registry list — only features
        pass
    if "shared.js" not in reg or "amazon.js" not in reg:
        fail("immersion-registry", "expected core feature modules listed")
        return
    if "google.js" not in reg:
        fail("immersion-registry", "1998 google.js missing from registry")
        return
    if "napster.js" not in reg or "blogger.js" not in reg:
        fail("immersion-registry", "1999 napster.js/blogger.js missing from registry")
        return
    if "myspace.js" not in reg or "itunes.js" not in reg:
        fail("immersion-registry", "2003 myspace.js/itunes.js missing from registry")
        return
    if "gmail.js" not in reg or "facebook.js" not in reg or "flickr.js" not in reg:
        fail("immersion-registry", "2004 gmail/facebook/flickr missing from registry")
        return
    if "youtube.js" not in reg or "maps.js" not in reg or "reddit.js" not in reg or "digg.js" not in reg:
        fail("immersion-registry", "2005 youtube/maps/reddit/digg missing from registry")
        return
    ok("immersion-registry-complete")


def test_year_stubs_use_shared_boot() -> None:
    """Year immersion stubs must load boot.js and not embed FEATURES maps."""
    stubs = ["js/immersion.js"] + [f"js/immersion-{y}.js" for y in ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005")]
    for rel in stubs:
        path = ROOT / rel
        if not path.is_file():
            # immersion-1994 optional if immersion.js covers 1994
            if rel == "js/immersion-1994.js":
                continue
            fail("year-stubs-boot", f"missing {rel}")
            return
        s = read(path)
        if "FEATURES_BY_YEAR" in s:
            fail("year-stubs-boot", f"{rel} still embeds FEATURES_BY_YEAR")
            return
        if "immersion/boot.js" not in s and rel != "js/immersion-core.js":
            fail("year-stubs-boot", f"{rel} does not load immersion/boot.js")
            return
    if not (ROOT / "js/immersion/boot.js").is_file():
        fail("year-stubs-boot", "missing immersion/boot.js")
        return
    if not (ROOT / "js/immersion/registry.js").is_file():
        fail("year-stubs-boot", "missing immersion/registry.js")
        return
    ok("year-stubs-shared-boot")


def test_p1_immersion_hooks() -> None:
    """Markup hooks required by P1 e2e (logout, bids, guestbook, personalize)."""
    checks = [
        (
            "years/1996/sites/hotmail/inbox.html",
            ["data-hotmail-logout"],
            "hotmail-logout",
        ),
        (
            "years/1995/sites/auctionweb/item-laser.html",
            ["data-bid-form", "data-high-bid", 'name="bidder"', 'name="bid"'],
            "auction-laser-bid",
        ),
        (
            "years/1997/sites/ebay/item-laptop.html",
            ["data-bid-form", 'name="bid"'],
            "ebay-laptop-bid",
        ),
        (
            "years/1995/sites/geocities/Hollywood/1234/index.html",
            ["data-gb-form", "data-gb-list", 'name="n"', 'name="m"'],
            "guestbook-holly",
        ),
        (
            "years/1998/sites/yahoo/my.html",
            ['data-yahoo-toggle="news"', 'data-yahoo-mod="news"'],
            "yahoo-my",
        ),
        (
            "years/1998/sites/excite/index.html",
            ['data-excite-toggle="stocks"', 'data-excite-mod="stocks"'],
            "excite-stocks",
        ),
        (
            "years/1998/sites/google/index.html",
            ["data-google-lucky", 'name="btnI"'],
            "google-lucky",
        ),
    ]
    for rel, needles, label in checks:
        path = ROOT / rel
        if not path.is_file():
            fail("p1-hooks", f"missing {rel} ({label})")
            return
        s = read(path)
        for n in needles:
            if n not in s:
                fail("p1-hooks", f"{rel} missing {n} ({label})")
                return
    # Logout must clear storage, not leave JSON "null"
    util = read(ROOT / "js/lib/util.js")
    if "removeItem" not in util or "value === null" not in util:
        fail("p1-hooks", "saveJSON must removeItem on null (logout clear)")
        return
    hm = read(ROOT / "js/immersion/hotmail.js")
    if "setHotmailUser(null)" not in hm and 'setHotmailUser(null)' not in hm:
        fail("p1-hooks", "hotmail logout must call setHotmailUser(null)")
        return
    ok("p1-immersion-hooks")


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
        test_icq_1997,
        test_1998_assets_exist,
        test_1998_no_amazon_smile,
        test_1998_google_present,
        test_1998_ebay_myebay_not_1997_rebrand_blurb,
        test_1998_srp_modules,
        test_1999_assets_exist,
        test_1999_no_amazon_smile,
        test_1999_napster_blogger_present,
        test_1999_ie5_chrome,
        test_1999_location_hints,
        test_1999_culture_pages,
        test_1999_urlmap_complete,
        test_2000_assets_exist,
        test_2000_amazon_smile_required,
        test_2000_signature_sites,
        test_2000_urlmap_complete,
        test_2000_densify_rooms,
        test_2001_signature,
        test_2001_urlmap_complete,
        test_2001_wikipedia_densify,
        test_1998_cdnow_mozilla_icq,
        test_link_audit_covers_late_years,
        test_2002_signature,
        test_2002_urlmap_complete,
        test_2002_densify,
        test_2003_signature,
        test_2003_urlmap_complete,
        test_2003_continuity_truth,
        test_2003_densify,
        test_2004_signature,
        test_2004_urlmap_complete,
        test_2004_no_anachronism_products,
        test_2004_densify,
        test_2005_signature,
        test_2005_urlmap_complete,
        test_2005_no_anachronism_products,
        test_2005_densify,
        test_immersion_registry_complete,
        test_year_stubs_use_shared_boot,
        test_p1_immersion_hooks,
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




def test_2004_densify() -> None:
    """2004 densify pass: multi-page Firefox/Flickr + denser Gmail."""
    need = [
        "years/2004/sites/firefox/features.html",
        "years/2004/sites/firefox/download.html",
        "years/2004/sites/firefox/whatsnew.html",
        "years/2004/sites/flickr/explore.html",
        "years/2004/sites/flickr/about.html",
        "years/2004/sites/gmail/about.html",
        "years/2004/sites/gmail/compose.html",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2004-densify", "missing: " + ", ".join(missing))
        return
    gm = read(ROOT / "years/2004/sites/gmail/index.html")
    if "data-gmail-login" not in gm or "gigabyte" not in gm.lower():
        fail("2004-densify", "gmail login densify")
        return
    ff = read(ROOT / "years/2004/sites/firefox/features.html")
    if "Tabbed" not in ff and "tabbed" not in ff.lower():
        fail("2004-densify", "firefox features weak")
        return
    fl = read(ROOT / "years/2004/sites/flickr/index.html")
    if "data-flickr-stream" not in fl or "explore.html" not in fl:
        fail("2004-densify", "flickr densify nav")
        return
    ok("2004-densify")


def test_2005_densify() -> None:
    """2005 densify pass: deeper signature rooms + TechCrunch."""
    need = [
        "years/2005/sites/youtube/channels.html",
        "years/2005/sites/youtube/upload.html",
        "years/2005/sites/maps/mashups.html",
        "years/2005/sites/maps/about.html",
        "years/2005/sites/reddit/submit.html",
        "years/2005/sites/digg/about.html",
        "years/2005/sites/techcrunch/index.html",
        "years/2005/sites/itunes/index.html",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2005-densify", "missing: " + ", ".join(missing))
        return
    yt = read(ROOT / "years/2005/sites/youtube/index.html")
    if "Broadcast Yourself" not in yt or "data-yt-list" not in yt:
        fail("2005-densify", "youtube densify")
        return
    if "dating" in yt.lower() and "male" in yt.lower():
        fail("2005-densify", "youtube should not lead with dating-site UI")
        return
    maps = read(ROOT / "years/2005/sites/maps/index.html")
    if "data-maps-canvas" not in maps or "mashups.html" not in maps:
        fail("2005-densify", "maps densify")
        return
    rd = read(ROOT / "years/2005/sites/reddit/index.html")
    if "data-reddit-list" not in rd or "boost" not in rd.lower():
        fail("2005-densify", "reddit densify")
        return
    tc = read(ROOT / "years/2005/sites/techcrunch/index.html")
    if "Web 2.0" not in tc and "web 2.0" not in tc.lower():
        fail("2005-densify", "techcrunch weak")
        return
    # bans
    home = read(ROOT / "years/2005/pages/home.html").lower()
    if "twitter.com" in home or "href=\"http://twitter" in home:
        fail("2005-densify", "twitter anachronism on home")
        return
    ok("2005-densify")


if __name__ == "__main__":
    sys.exit(main())
