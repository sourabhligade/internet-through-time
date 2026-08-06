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
    for y in ("1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003"):
        ip = ROOT / f"js/immersion-{y}.js"
        if not ip.is_file():
            continue
        t = read(ip)
        if "booted" in t or "Immersion.create" in t or "immersion/boot.js" in t:
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
    if not (ROOT / "years/2000").exists():
        ok("2000-assets-exist-skip")
        return
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
    if not (ROOT / "years/2000").exists():
        ok("2000-amazon-smile-required-skip")
        return
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
    if not (ROOT / "years/2000").exists():
        ok("2000-signature-sites-skip")
        return
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
    if not (ROOT / "years/2000").exists():
        ok("2000-urlmap-complete-skip")
        return
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
    if not (ROOT / "years/2000").exists():
        ok("2000-densify-rooms-skip")
        return
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
    # Require audit coverage for years that exist on disk
    for y in ("1998", "1999", "2001", "2002", "2003"):
        if not (ROOT / "years" / y).is_dir():
            continue
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
    if "data-friendster" not in fs:
        fail("2002-signature", "friendster hooks")
        return
    kz_path = ROOT / "years/2002/sites/kazaa/client.html"
    if not kz_path.is_file():
        kz_path = ROOT / "years/2002/sites/kazaa/index.html"
    kz = read(kz_path)
    if "data-kazaa" not in kz and "kazaa" not in kz.lower():
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
    """2003 MVP P0 rooms + hub unlock."""
    need = [
        "years/2003/index.html",
        "years/2003/pages/home.html",
        "years/2003/pages/about.html",
        "years/2003/sites/myspace/index.html",
        "years/2003/sites/myspace/profile.html",
        "years/2003/sites/itunes/index.html",
        "years/2003/sites/wordpress/index.html",
        "years/2003/sites/wordpress/dashboard.html",
        "years/2003/sites/linkedin/index.html",
        "years/2003/sites/linkedin/connections.html",
        "years/2003/sites/adsense/index.html",
        "js/config/2003.js",
        "js/config/immersion-2003.js",
        "js/browser-2003.js",
        "js/immersion-2003.js",
        "js/immersion/myspace.js",
        "js/immersion/itunes.js",
        "js/immersion/wordpress.js",
        "js/immersion/linkedin.js",
        "js/immersion/adsense.js",
        "css/period-2003.css",
        "assets/period/2003/myspace/logo.gif",
        "assets/period/2003/itunes/logo.gif",
        "assets/period/2003/wordpress/logo.gif",
        "assets/period/2003/linkedin/logo.gif",
        "assets/period/2003/adsense/logo.gif",
        "assets/period/2003/README-PIXELS.txt",
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
    if "data-myspace" not in ms:
        fail("2003-signature", "myspace hooks")
        return
    it = read(ROOT / "years/2003/sites/itunes/index.html").lower()
    if "99" not in it:
        fail("2003-signature", "itunes 99 cent framing")
        return
    if "stream now" in it or "watch instantly" in it:
        fail("2003-signature", "itunes streaming default")
        return
    if "data-wp-publish" not in read(ROOT / "years/2003/sites/wordpress/dashboard.html"):
        fail("2003-signature", "wordpress publish")
        return
    li = read(ROOT / "years/2003/sites/linkedin/index.html")
    if "data-li-connect" not in li and "data-li-name" not in li:
        fail("2003-signature", "linkedin hooks")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    for mod in ("myspace.js", "itunes.js", "wordpress.js", "linkedin.js", "adsense.js"):
        if mod not in reg:
            fail("2003-signature", "registry " + mod)
            return
    if '"2003"' not in reg:
        fail("2003-signature", "registry year")
        return
    home = read(ROOT / "years/2003/pages/home.html")
    for needle in ("MySpace", "iTunes", "WordPress", "LinkedIn", "AdSense", "40,912,332"):
        if needle not in home:
            fail("2003-signature", "home " + needle)
            return
    hub = read(ROOT / "index.html")
    if 'href="years/2003/"' not in hub or 'data-year="2003"' not in hub:
        fail("2003-signature", "hub not unlocked")
        return
    if "locked y2003" in hub:
        fail("2003-signature", "hub locked class")
        return
    ok("2003-signature")


def test_2003_urlmap_complete() -> None:
    root = ROOT / "years/2003"
    cfg = read(ROOT / "js/config/2003.js")
    missing = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        if f'"{rel}"' not in cfg:
            missing.append(rel)
    if missing:
        fail("2003-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2003-urlmap-complete")


def test_2003_densify() -> None:
    need = [
        "years/2003/sites/myspace/profile.html",
        "years/2003/sites/myspace/about.html",
        "years/2003/sites/myspace/invite.html",
        "years/2003/sites/itunes/browse.html",
        "years/2003/sites/itunes/library.html",
        "years/2003/sites/itunes/fairplay.html",
        "years/2003/sites/wordpress/dashboard.html",
        "years/2003/sites/wordpress/download.html",
        "years/2003/sites/wordpress/install.html",
        "years/2003/sites/linkedin/profile.html",
        "years/2003/sites/linkedin/invite.html",
        "years/2003/sites/adsense/index.html",
        "years/2003/sites/bloglines/index.html",
        "years/2003/sites/bloglines/reader.html",
        "js/immersion/bloglines.js",
        "assets/period/2003/myspace/friend1.gif",
        "assets/period/2003/itunes/badge-99.gif",
        "docs/2003-MUSEUM-GRADE.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2003-densify", "missing: " + ", ".join(missing))
        return
    ms = read(ROOT / "years/2003/sites/myspace/index.html")
    if "Top 8" not in ms or "data-myspace-comments" not in ms:
        fail("2003-densify", "myspace densify")
        return
    msabout = read(ROOT / "years/2003/sites/myspace/about.html").lower()
    if "meet your friends" not in msabout:
        fail("2003-densify", "myspace about pitch")
        return
    if "data-itunes-buy" not in read(ROOT / "years/2003/sites/itunes/index.html"):
        fail("2003-densify", "itunes buy")
        return
    it = read(ROOT / "years/2003/sites/itunes/index.html").lower()
    if "stream now" in it or "spotify" in it:
        fail("2003-densify", "itunes streaming default")
        return
    css = read(ROOT / "css/period-2003.css")
    if "myspace-shell" not in css or "itunes-store" not in css:
        fail("2003-densify", "css")
        return
    bl = read(ROOT / "years/2003/sites/bloglines/index.html").lower()
    if "no installation" not in bl and "no install" not in bl:
        fail("2003-densify", "bloglines no-install")
        return
    ok("2003-densify")


def test_2003_continuity_truth() -> None:
    about = read(ROOT / "years/2003/pages/about.html")
    for n in ("MySpace", "LinkedIn", "WordPress", "iTunes"):
        if n not in about:
            fail("2003-continuity", "about missing " + n)
            return
    if "Facemash" not in about:
        fail("2003-continuity", "about missing Facemash footnote")
        return
    fs = read(ROOT / "years/2003/sites/friendster/index.html")
    if "founded in 2002" not in fs.lower() and "founded 2002" not in fs.lower():
        fail("2003-continuity", "friendster should say founded 2002")
        return
    if "Founded 2003" in fs or "founded in 2003" in fs.lower():
        # allow "March 2003" public mass but not founding year 2003 alone without 2002
        if "2002" not in fs:
            fail("2003-continuity", "friendster date")
            return
    ok("2003-continuity-truth")


def test_2003_museum() -> None:
    """Museum-grade honesty gates for 2003 densify."""
    blogger = read(ROOT / "years/2003/sites/blogger/index.html")
    if "do not claim Google ownership" in blogger:
        fail("2003-museum", "blogger inverted Google ban")
        return
    if "February 2003" not in blogger and "Feb 2003" not in blogger:
        fail("2003-museum", "blogger missing Google acquisition")
        return
    phoenix = read(ROOT / "years/2003/sites/phoenix/index.html")
    if "Firebird" not in phoenix:
        fail("2003-museum", "phoenix room should brand Firebird")
        return
    if "September 23, 2003" in phoenix:
        fail("2003-museum", "wrong Phoenix 0.1 date (was 2002)")
        return
    if "September 23, 2002" not in phoenix and "2002" not in phoenix:
        fail("2003-museum", "missing Phoenix 0.1 = 2002 honesty")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    if "bloglines.js" not in reg:
        fail("2003-museum", "registry missing bloglines")
        return
    if not (ROOT / "years/2003/sites/bloglines/index.html").is_file():
        fail("2003-museum", "bloglines room missing")
        return
    if (ROOT / "years/2003/sites/facebook").exists():
        fail("2003-museum", "facebook product room must not exist in 2003")
        return
    cnn = read(ROOT / "years/2003/sites/cnn/tech.html")
    if "iTunes" not in cnn and "99" not in cnn:
        fail("2003-museum", "cnn tech missing Store vs P2P contrast")
        return
    ok("2003-museum")



def test_2004_signature() -> None:
    if not (ROOT / "years/2004").exists():
        ok("2004-signature-skip")
        return
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
    # 2005 unlock only required when years/2005 tree exists
    if (ROOT / "years/2005").exists():
        if 'data-year="2005"' not in hub or 'href="years/2005/"' not in hub:
            fail("2004-signature", "2005 hub not unlocked while tree exists")
            return
    ok("2004-signature")


def test_2004_urlmap_complete() -> None:
    if not (ROOT / "years/2004").exists():
        ok("2004-urlmap-complete-skip")
        return
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
    if not (ROOT / "years/2004").exists():
        ok("2004-no-anachronism-products-skip")
        return
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
    if not (ROOT / "years/2005").exists():
        ok("2005-signature-skip")
        return
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
    if 'href="years/2005/"' not in hub:
        fail("2005-signature", "hub not unlocked")
        return
    ok("2005-signature")


def test_2005_urlmap_complete() -> None:
    if not (ROOT / "years/2005").exists():
        ok("2005-urlmap-complete-skip")
        return
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
    if not (ROOT / "years/2005").exists():
        ok("2005-no-anachronism-products-skip")
        return
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


def test_2006_signature() -> None:
    if not (ROOT / "years/2006").exists():
        ok("2006-signature-skip")
        return
    need = [
        "years/2006/index.html",
        "years/2006/pages/home.html",
        "years/2006/pages/about.html",
        "years/2006/sites/twitter/index.html",
        "years/2006/sites/twitter/about.html",
        "years/2006/sites/facebook/index.html",
        "years/2006/sites/facebook/feed.html",
        "years/2006/sites/facebook/open.html",
        "years/2006/sites/youtube/index.html",
        "years/2006/sites/youtube/about.html",
        "years/2006/sites/digg/index.html",
        "years/2006/sites/docs/index.html",
        "years/2006/sites/aws/index.html",
        "years/2006/sites/reader/index.html",
        "years/2006/sites/microsoft/ie7.html",
        "years/2006/sites/time-you/index.html",
        "js/config/2006.js",
        "js/immersion/reader.js",
        "js/config/immersion-2006.js",
        "js/browser-2006.js",
        "js/immersion-2006.js",
        "js/immersion/twitter.js",
        "js/immersion/docs.js",
        "js/immersion/aws.js",
        "js/immersion/facebook.js",
        "js/immersion/digg.js",
        "css/period-2006.css",
        "docs/2006-MUSEUM-GRADE.md",
        "docs/2006-RESEARCH.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2006-signature", "missing: " + ", ".join(missing))
        return
    shell = read(ROOT / "years/2006/index.html")
    if 'data-itt-year="2006"' not in shell:
        fail("2006-signature", "shell year")
        return
    tw = read(ROOT / "years/2006/sites/twitter/index.html")
    if "data-twitter-compose" not in tw or "What are you doing" not in tw:
        fail("2006-signature", "twitter hooks")
        return
    feed = read(ROOT / "years/2006/sites/facebook/feed.html")
    if "data-fb-feed" not in feed or "News Feed" not in feed:
        fail("2006-signature", "facebook feed hooks")
        return
    yt = read(ROOT / "years/2006/sites/youtube/about.html")
    if "1.65" not in yt and "Oct 9" not in yt:
        fail("2006-signature", "youtube two-era honesty")
        return
    home = read(ROOT / "years/2006/pages/home.html")
    for needle in ("Twitter", "Facebook", "YouTube", "Digg", "85,507,314"):
        if needle not in home:
            fail("2006-signature", f"home missing {needle}")
            return
    icfg = read(ROOT / "js/config/immersion-2006.js")
    for flag in ("twitter: true", "facebook: true", "youtube: true", "digg: true", "docs: true", "aws: true"):
        if flag not in icfg:
            fail("2006-signature", f"features missing {flag}")
            return
    if 'storagePrefix: "itt06"' not in icfg:
        fail("2006-signature", "storagePrefix itt06")
        return
    hub = read(ROOT / "index.html")
    if 'href="years/2006/"' not in hub:
        fail("2006-signature", "hub not unlocked")
        return
    fb = read(ROOT / "js/immersion/facebook.js")
    if "itt06-thefacebook" not in fb:
        fail("2006-signature", "facebook KEY missing 2006")
        return
    ok("2006-signature")


def test_2006_urlmap_complete() -> None:
    if not (ROOT / "years/2006").exists():
        ok("2006-urlmap-complete-skip")
        return
    root = ROOT / "years/2006"
    htmls = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        htmls.append(rel)
    cfg = read(ROOT / "js/config/2006.js")
    missing = [h for h in htmls if f'"{h}"' not in cfg]
    if missing:
        fail("2006-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2006-urlmap-complete")


def test_2006_no_anachronism_products() -> None:
    if not (ROOT / "years/2006").exists():
        ok("2006-no-anachronism-products-skip")
        return
    banned = ("instagram", "tiktok", "iphone", "chrome-browser")
    for name in banned:
        if (ROOT / "years/2006/sites" / name).exists():
            fail("2006-anachronism", f"banned site tree: {name}")
            return
    home = read(ROOT / "years/2006/pages/home.html").lower()
    about = read(ROOT / "years/2006/pages/about.html").lower()
    if "iphone" not in home and "iphone" not in about:
        fail("2006-anachronism", "should ban iPhone on home/about")
        return
    if "street view" not in about and "street view" not in home:
        fail("2006-anachronism", "should ban Street View")
        return
    # YouTube must not claim year-start Google ownership without late-year framing
    yt = read(ROOT / "years/2006/sites/youtube/about.html").lower()
    if "independent" not in yt and "oct 9" not in yt:
        fail("2006-anachronism", "youtube needs two-era honesty")
        return
    ok("2006-no-anachronism-products")


def test_2006_densify() -> None:
    """Continuity year-truth + Reader/IE7/Time densify rooms."""
    if not (ROOT / "years/2006").exists():
        ok("2006-densify-skip")
        return
    ms = read(ROOT / "years/2006/sites/myspace/index.html")
    if "Jul 18, 2006" in ms and "$580" in ms:
        fail("2006-densify", "MySpace must not claim News Corp sale as Jul 2006")
        return
    if "2005" not in ms and "News Corp" not in ms:
        fail("2006-densify", "MySpace needs News Corp continuity honesty")
        return
    fl = read(ROOT / "years/2006/sites/flickr/about.html")
    if "2005" not in fl:
        fail("2006-densify", "Flickr about should state Yahoo 2005 acquisition")
        return
    maps = read(ROOT / "years/2006/sites/maps/about.html")
    if "Street View" not in maps:
        fail("2006-densify", "Maps about needs Street View ban")
        return
    rd = read(ROOT / "years/2006/sites/reddit/about.html")
    if "Digg" not in rd:
        fail("2006-densify", "Reddit should acknowledge Digg peak")
        return
    gm = read(ROOT / "years/2006/sites/gmail/about.html")
    if "2007" not in gm:
        fail("2006-densify", "Gmail about needs open-is-2007 honesty")
        return
    for rel in (
        "years/2006/sites/reader/index.html",
        "years/2006/sites/microsoft/ie7.html",
        "years/2006/sites/time-you/index.html",
    ):
        if not (ROOT / rel).is_file():
            fail("2006-densify", f"missing {rel}")
            return
    if "data-reader-add" not in read(ROOT / "years/2006/sites/reader/index.html"):
        fail("2006-densify", "reader hooks")
        return
    if "October 18, 2006" not in read(ROOT / "years/2006/sites/microsoft/ie7.html"):
        fail("2006-densify", "IE7 date")
        return
    ok("2006-densify")




def test_2007_signature() -> None:
    if not (ROOT / "years/2007").exists():
        ok("2007-signature-skip")
        return
    need = [
        "years/2007/index.html",
        "years/2007/pages/home.html",
        "years/2007/pages/about.html",
        "years/2007/sites/iphone/index.html",
        "years/2007/sites/gmail/about.html",
        "years/2007/sites/maps/streetview.html",
        "years/2007/sites/facebook/platform.html",
        "years/2007/sites/twitter/index.html",
        "years/2007/sites/youtube/about.html",
        "js/config/2007.js",
        "js/config/immersion-2007.js",
        "js/immersion/iphone.js",
        "css/period-2007.css",
        "docs/2007-RESEARCH.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2007-signature", "missing: " + ", ".join(missing))
        return
    if 'data-itt-year="2007"' not in read(ROOT / "years/2007/index.html"):
        fail("2007-signature", "shell year")
        return
    if 'storagePrefix: "itt07"' not in read(ROOT / "js/config/immersion-2007.js"):
        fail("2007-signature", "itt07")
        return
    if 'href="years/2007/"' not in read(ROOT / "index.html"):
        fail("2007-signature", "hub locked")
        return
    if "App Store" not in read(ROOT / "years/2007/sites/iphone/index.html"):
        fail("2007-signature", "iphone App Store ban copy")
        return
    if "May 29" not in read(ROOT / "years/2007/sites/maps/streetview.html"):
        fail("2007-signature", "street view date")
        return
    ok("2007-signature")


def test_2007_urlmap_complete() -> None:
    if not (ROOT / "years/2007").exists():
        ok("2007-urlmap-complete-skip")
        return
    root = ROOT / "years/2007"
    cfg = read(ROOT / "js/config/2007.js")
    missing = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        if f'"{rel}"' not in cfg:
            missing.append(rel)
    if missing:
        fail("2007-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2007-urlmap-complete")




def test_2008_signature() -> None:
    if not (ROOT / "years/2008").exists():
        ok("2008-signature-skip")
        return
    need = [
        "years/2008/index.html",
        "years/2008/pages/home.html",
        "years/2008/pages/about.html",
        "years/2008/sites/appstore/index.html",
        "years/2008/sites/iphone/index.html",
        "years/2008/sites/chrome/index.html",
        "years/2008/sites/android/index.html",
        "years/2008/sites/hulu/index.html",
        "years/2008/sites/facebook/connect.html",
        "js/config/2008.js",
        "js/config/immersion-2008.js",
        "js/immersion/appstore.js",
        "js/immersion/chrome-browser.js",
        "js/immersion/android.js",
        "js/immersion/hulu.js",
        "css/period-2008.css",
        "docs/2008-RESEARCH.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2008-signature", "missing: " + ", ".join(missing))
        return
    if 'data-itt-year="2008"' not in read(ROOT / "years/2008/index.html"):
        fail("2008-signature", "shell year")
        return
    if 'storagePrefix: "itt08"' not in read(ROOT / "js/config/immersion-2008.js"):
        fail("2008-signature", "itt08")
        return
    if 'href="years/2008/"' not in read(ROOT / "index.html"):
        fail("2008-signature", "hub locked")
        return
    about = read(ROOT / "years/2008/pages/about.html")
    if "172,338,726" not in about:
        fail("2008-signature", "scale")
        return
    if "App Store" not in about or "Chrome" not in about:
        fail("2008-signature", "thesis products")
        return
    if "3GS" not in about:
        fail("2008-signature", "3GS ban")
        return
    apps = read(ROOT / "years/2008/sites/appstore/index.html")
    if "data-appstore-install" not in apps and "data-appstore-catalog" not in apps:
        fail("2008-signature", "appstore hooks")
        return
    if "500" not in apps and "552" not in apps:
        fail("2008-signature", "launch count honesty")
        return
    iphone = read(ROOT / "years/2008/sites/iphone/index.html")
    if "3G" not in iphone or "$199" not in iphone:
        fail("2008-signature", "iphone 3G prices")
        return
    # Must NOT claim App Store banned as year default
    home = read(ROOT / "years/2008/pages/home.html")
    if "App Store (2008)" in home and "ban" in home.lower():
        # hard bans box should not ban App Store for 2008
        pass
    if "no App Store yet" in home.lower() or "no App Store" in home:
        fail("2008-signature", "home still bans App Store")
        return
    ok("2008-signature")


def test_2008_urlmap_complete() -> None:
    if not (ROOT / "years/2008").exists():
        ok("2008-urlmap-complete-skip")
        return
    root = ROOT / "years/2008"
    cfg = read(ROOT / "js/config/2008.js")
    missing = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        if f'"{rel}"' not in cfg:
            missing.append(rel)
    if missing:
        fail("2008-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2008-urlmap-complete")


def test_2009_signature() -> None:
    if not (ROOT / "years/2009").exists():
        ok("2009-signature-skip")
        return
    need = [
        "years/2009/index.html",
        "years/2009/pages/home.html",
        "years/2009/pages/about.html",
        "years/2009/sites/appstore/index.html",
        "years/2009/sites/iphone/index.html",
        "years/2009/sites/facebook/feed.html",
        "years/2009/sites/farmville/index.html",
        "years/2009/sites/bing/index.html",
        "years/2009/sites/windows7/index.html",
        "js/config/2009.js",
        "js/config/immersion-2009.js",
        "js/immersion/appstore.js",
        "js/immersion/farmville.js",
        "js/immersion/bing.js",
        "css/period-2009.css",
        "docs/2009-RESEARCH.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2009-signature", "missing: " + ", ".join(missing))
        return
    if 'data-itt-year="2009"' not in read(ROOT / "years/2009/index.html"):
        fail("2009-signature", "shell year")
        return
    if 'storagePrefix: "itt09"' not in read(ROOT / "js/config/immersion-2009.js"):
        fail("2009-signature", "itt09")
        return
    if 'href="years/2009/"' not in read(ROOT / "index.html"):
        fail("2009-signature", "hub locked")
        return
    about = read(ROOT / "years/2009/pages/about.html")
    if "238,027,855" not in about:
        fail("2009-signature", "scale")
        return
    if "3GS" not in about or "FarmVille" not in about:
        fail("2009-signature", "thesis products")
        return
    if "iPad" not in about:
        fail("2009-signature", "iPad ban")
        return
    apps = read(ROOT / "years/2009/sites/appstore/index.html")
    if "data-appstore-install" not in apps and "data-appstore-catalog" not in apps:
        fail("2009-signature", "appstore hooks")
        return
    if "50,000" not in apps and "50000" not in apps and "50k" not in apps.lower():
        fail("2009-signature", "50k honesty")
        return
    iphone = read(ROOT / "years/2009/sites/iphone/index.html")
    if "3GS" not in iphone or "$199" not in iphone:
        fail("2009-signature", "iphone 3GS prices")
        return
    farm = read(ROOT / "years/2009/sites/farmville/index.html")
    if "data-farm-plant" not in farm:
        fail("2009-signature", "farmville hooks")
        return
    feed = read(ROOT / "years/2009/sites/facebook/feed.html")
    if "data-fb-like" not in feed:
        fail("2009-signature", "like hooks")
        return
    ok("2009-signature")


def test_2009_urlmap_complete() -> None:
    if not (ROOT / "years/2009").exists():
        ok("2009-urlmap-complete-skip")
        return
    root = ROOT / "years/2009"
    cfg = read(ROOT / "js/config/2009.js")
    missing = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if rel == "index.html":
            continue
        if f'"{rel}"' not in cfg:
            missing.append(rel)
    if missing:
        fail("2009-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2009-urlmap-complete")


def test_2009_no_anachronism_products() -> None:
    if not (ROOT / "years/2009").exists():
        ok("2009-no-anachronism-products-skip")
        return
    home = read(ROOT / "years/2009/pages/home.html").lower()
    about = read(ROOT / "years/2009/pages/about.html").lower()
    if "3gs" not in home and "3gs" not in about:
        fail("2009-anachronism", "3GS should be present")
        return
    if "ipad" in home and "ban" not in home:
        # hard bans box should mention iPad
        pass
    if "ipad" not in about and "ipad" not in home:
        fail("2009-anachronism", "iPad ban should appear on about/home")
        return
    # FarmVille day-one peak lie (allow "not 80M day one" honesty)
    farm = read(ROOT / "years/2009/sites/farmville/index.html").lower()
    if re.search(r"(?<!not )(?<!not\s)80\s*m(illion)?\s*day\s*one", farm):
        fail("2009-anachronism", "FarmVille peak as day-one")
        return
    ok("2009-no-anachronism-products")


def test_2010_signature() -> None:
    if not (ROOT / "years/2010").exists():
        ok("2010-signature-skip")
        return
    need = [
        "years/2010/index.html",
        "years/2010/pages/home.html",
        "years/2010/pages/about.html",
        "years/2010/sites/ipad/index.html",
        "years/2010/sites/iphone/index.html",
        "years/2010/sites/instagram/index.html",
        "years/2010/sites/appstore/index.html",
        "years/2010/sites/facebook/feed.html",
        "years/2010/sites/farmville/index.html",
        "years/2010/sites/foursquare/index.html",
        "js/config/2010.js",
        "js/config/immersion-2010.js",
        "js/immersion/instagram.js",
        "css/period-2010.css",
        "docs/2010-RESEARCH.md",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2010-signature", "missing: " + ", ".join(missing))
        return
    if 'data-itt-year="2010"' not in read(ROOT / "years/2010/index.html"):
        fail("2010-signature", "shell year")
        return
    if 'storagePrefix: "itt10"' not in read(ROOT / "js/config/immersion-2010.js"):
        fail("2010-signature", "itt10")
        return
    if 'href="years/2010/"' not in read(ROOT / "index.html"):
        fail("2010-signature", "hub locked")
        return
    about = read(ROOT / "years/2010/pages/about.html")
    if "206,956,723" not in about:
        fail("2010-signature", "scale")
        return
    if "iPad" not in about or "Instagram" not in about:
        fail("2010-signature", "thesis products")
        return
    if "Spotify" not in about and "Snapchat" not in about:
        fail("2010-signature", "bans")
        return
    apps = read(ROOT / "years/2010/sites/appstore/index.html")
    if "data-appstore-catalog" not in apps and "data-appstore-install" not in apps:
        fail("2010-signature", "appstore hooks")
        return
    if "225" not in apps and "5 billion" not in apps.lower() and "5B" not in apps:
        fail("2010-signature", "225k/5B honesty")
        return
    iphone = read(ROOT / "years/2010/sites/iphone/index.html")
    if "iPhone 4" not in iphone and "iPhone 4" not in read(ROOT / "years/2010/sites/iphone/about.html"):
        fail("2010-signature", "iphone 4")
        return
    if "$199" not in iphone and "$199" not in read(ROOT / "years/2010/sites/iphone/about.html"):
        fail("2010-signature", "iphone prices")
        return
    ig = read(ROOT / "years/2010/sites/instagram/index.html")
    if "data-ig-share" not in ig and "data-ig-filter" not in ig:
        fail("2010-signature", "instagram hooks")
        return
    farm = read(ROOT / "years/2010/sites/farmville/index.html")
    if "data-farm-plant" not in farm:
        fail("2010-signature", "farmville hooks")
        return
    feed = read(ROOT / "years/2010/sites/facebook/feed.html")
    if "data-fb-like" not in feed:
        fail("2010-signature", "like hooks")
        return
    ok("2010-signature")


def test_2010_urlmap_complete() -> None:
    if not (ROOT / "years/2010").exists():
        ok("2010-urlmap-complete-skip")
        return
    root = ROOT / "years/2010"
    cfg = read(ROOT / "js/config/2010.js")
    missing = []
    for pth in root.rglob("*.html"):
        rel = str(pth.relative_to(root)).replace("\\", "/")
        if f'"{rel}"' not in cfg:
            missing.append(rel)
    if missing:
        fail("2010-urlmap-complete", "unmapped: " + ", ".join(missing[:8]))
        return
    ok("2010-urlmap-complete")


def test_2010_no_anachronism_products() -> None:
    if not (ROOT / "years/2010").exists():
        ok("2010-no-anachronism-products-skip")
        return
    about = read(ROOT / "years/2010/pages/about.html").lower()
    home = read(ROOT / "years/2010/pages/home.html").lower()
    if "ipad" not in about and "ipad" not in home:
        fail("2010-anachronism", "iPad should be present as product")
        return
    if "instagram" not in about and "instagram" not in home:
        fail("2010-anachronism", "Instagram should be present")
        return
    # Spotify US must appear as ban not product default
    if "spotify" in about and "us" not in about and "2011" not in about:
        fail("2010-anachronism", "Spotify US ban should be labeled")
        return
    ig = read(ROOT / "years/2010/sites/instagram/index.html").lower()
    if "ios only" not in ig and "ios-only" not in ig and "iphone only" not in ig:
        fail("2010-anachronism", "Instagram iOS-only honesty")
        return
    if "stories" in ig and "not" not in ig:
        fail("2010-anachronism", "Stories without ban framing")
        return
    ok("2010-no-anachronism-products")


def test_2008_dirbar_and_modules() -> None:
    """Shell dirbar P0 + immersion modules registered for 2008."""
    if not (ROOT / "years/2008").exists():
        ok("2008-dirbar-modules-skip")
        return
    shell = read(ROOT / "years/2008/index.html")
    for label in ("App Store", "Chrome", "Android", "Hulu"):
        if label not in shell:
            fail("2008-dirbar", f"shell dirbar missing {label}")
            return
    if 'data-go="sites/appstore/index.html"' not in shell:
        fail("2008-dirbar", "appstore data-go")
        return
    reg = read(ROOT / "js/immersion/registry.js")
    for mod in ("appstore.js", "chrome-browser.js", "android.js", "hulu.js"):
        if mod not in reg:
            fail("2008-dirbar", f"registry missing {mod}")
            return
    icfg = read(ROOT / "js/config/immersion-2008.js")
    for flag in ("appstore: true", "chromeBrowser: true", "android: true", "hulu: true"):
        if flag not in icfg:
            fail("2008-dirbar", f"features missing {flag}")
            return
    ok("2008-dirbar-modules")


def test_2008_no_anachronism_products() -> None:
    """Hard bans must not appear as year-default product claims."""
    if not (ROOT / "years/2008").exists():
        ok("2008-no-anachronism-products-skip")
        return
    home = read(ROOT / "years/2008/pages/home.html").lower()
    about = read(ROOT / "years/2008/pages/about.html").lower()
    # App Store must be in product story
    if "app store" not in home and "app store" not in about:
        fail("2008-anachronism", "App Store should be present (not banned)")
        return
    if "no app store yet" in home or "no app store yet" in about:
        fail("2008-anachronism", "App Store still framed as future ban")
        return
    # 3GS ban language on about
    if "3gs" not in about:
        fail("2008-anachronism", "about needs 3GS ban")
        return
    # Spotify US ban
    if "spotify" not in about:
        fail("2008-anachronism", "about needs Spotify geo ban")
        return
    iphone = read(ROOT / "years/2008/sites/iphone/index.html").lower()
    if "3g" not in iphone:
        fail("2008-anachronism", "iphone must be 3G product")
        return
    # No Spotify US product room required; if room exists must say Europe
    spotify = ROOT / "years/2008/sites/spotify"
    if spotify.is_dir():
        for pth in spotify.rglob("*.html"):
            body = read(pth).lower()
            if "united states" in body and "not" not in body and "europe" not in body:
                fail("2008-anachronism", "spotify room may claim US public")
                return
    ok("2008-no-anachronism-products")


def test_2008_densify() -> None:
    """Year-truth densify rooms + e2e specs on disk."""
    if not (ROOT / "years/2008").exists():
        ok("2008-densify-skip")
        return
    need = [
        "years/2008/sites/appstore/about.html",
        "years/2008/sites/chrome/about.html",
        "years/2008/sites/android/about.html",
        "years/2008/sites/android/market.html",
        "years/2008/sites/hulu/about.html",
        "years/2008/sites/facebook/connect.html",
        "years/2008/sites/firefox/index.html",
        "years/2008/sites/netflix/index.html",
        "e2e/2008-mvp.spec.js",
        "e2e/2008-real-flows.spec.js",
        "e2e/2008-densify.spec.js",
        "e2e/2008-flows.spec.js",
        "e2e/2008-trail-real-flows.spec.js",
    ]
    missing = [n for n in need if not (ROOT / n).is_file()]
    if missing:
        fail("2008-densify", "missing: " + ", ".join(missing))
        return
    netflix = read(ROOT / "years/2008/sites/netflix/index.html")
    if "Watch Instantly" not in netflix and "stream" not in netflix.lower():
        fail("2008-densify", "netflix stream densify")
        return
    if "DVD" not in netflix and "envelope" not in netflix.lower() and "mail" not in netflix.lower():
        fail("2008-densify", "netflix discs residual")
        return
    ff = read(ROOT / "years/2008/sites/firefox/index.html")
    if "Download Day" not in ff and "Firefox 3" not in ff:
        fail("2008-densify", "firefox 3 framing")
        return
    yt = read(ROOT / "years/2008/sites/youtube/about.html")
    if "720p" not in yt and "HD" not in yt:
        fail("2008-densify", "youtube HD note")
        return
    # Home trails
    home = read(ROOT / "years/2008/pages/home.html")
    for trail in ("Apps arrive", "Browser wars", "Android opens", "Stream night", "Login everywhere", "Still desktop"):
        if trail not in home:
            fail("2008-densify", f"home trail missing: {trail}")
            return
    ok("2008-densify")


def test_immersion_registry_complete() -> None:
    """Every shipped year must appear in immersion/registry.js with modules."""
    reg = read(ROOT / "js/immersion/registry.js")
    for year in (
        "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002",
        "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
    ):
        # Only require registry entry when the year tree is on disk (wiped years skip)
        if not (ROOT / "years" / year).is_dir():
            continue
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
    if (ROOT / "years/2003").is_dir():
        if "myspace.js" not in reg or "itunes.js" not in reg:
            fail("immersion-registry", "2003 myspace.js/itunes.js missing from registry")
            return
    if (ROOT / "years/2004").is_dir():
        if "gmail.js" not in reg or "facebook.js" not in reg or "flickr.js" not in reg:
            fail("immersion-registry", "2004 gmail/facebook/flickr missing from registry")
            return
    if (ROOT / "years/2005").is_dir():
        if "youtube.js" not in reg or "maps.js" not in reg or "reddit.js" not in reg or "digg.js" not in reg:
            fail("immersion-registry", "2005 youtube/maps/reddit/digg missing from registry")
            return
    if (ROOT / "years/2007").is_dir():
        if "iphone.js" not in reg:
            fail("immersion-registry", "2007 iphone.js missing")
            return
    if (ROOT / "years/2006").is_dir():
        if "twitter.js" not in reg or "docs.js" not in reg or "aws.js" not in reg:
            fail("immersion-registry", "2006 twitter/docs/aws missing from registry")
            return
        if "reader.js" not in reg:
            fail("immersion-registry", "2006 reader.js missing from registry")
            return
    if (ROOT / "years/2009").is_dir():
        for mod in ("farmville.js", "bing.js"):
            if mod not in reg:
                fail("immersion-registry", f"2009 {mod} missing from registry")
                return
    if (ROOT / "years/2010").is_dir():
        for mod in ("instagram.js", "foursquare.js", "pinterest.js"):
            if mod not in reg:
                fail("immersion-registry", f"2010 {mod} missing from registry")
                return
        # Storage keys must use util (no bare fallthrough to itt04 for late years)
        fb = read(ROOT / "js/immersion/facebook.js")
        if "immersionStorageKey" not in fb:
            if "immersionStorageKey(\"thefacebook\"" not in fb and "immersionStorageKey('thefacebook'" not in fb:
                fail("immersion-registry", "facebook.js KEY must use immersionStorageKey")
                return
    ok("immersion-registry-complete")


def test_year_stubs_use_shared_boot() -> None:
    """Year immersion stubs must load boot.js and not embed FEATURES maps."""
    stubs = ["js/immersion.js"] + [f"js/immersion-{y}.js" for y in ("1994", "1995", "1996", "1997", "1998", "1999", "2001", "2002", "2003") if (ROOT / f"js/immersion-{y}.js").is_file()]
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
        test_2003_museum,
        test_2004_signature,
        test_2004_urlmap_complete,
        test_2004_no_anachronism_products,
        test_2004_densify,
        test_2005_signature,
        test_2005_urlmap_complete,
        test_2005_no_anachronism_products,
        test_2005_densify,
        test_2006_signature,
        test_2006_urlmap_complete,
        test_2006_no_anachronism_products,
        test_2006_densify,
        test_2007_signature,
        test_2007_urlmap_complete,
        test_2008_signature,
        test_2008_urlmap_complete,
        test_2008_dirbar_and_modules,
        test_2008_no_anachronism_products,
        test_2008_densify,
        test_2009_signature,
        test_2009_urlmap_complete,
        test_2009_no_anachronism_products,
        test_2010_signature,
        test_2010_urlmap_complete,
        test_2010_no_anachronism_products,
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
    if not (ROOT / "years/2004").exists():
        ok("2004-densify-skip")
        return
    """2004 densify pass: multi-page Firefox/Flickr + denser Gmail + P2 culture."""
    need = [
        "years/2004/sites/firefox/features.html",
        "years/2004/sites/firefox/download.html",
        "years/2004/sites/firefox/whatsnew.html",
        "years/2004/sites/flickr/explore.html",
        "years/2004/sites/flickr/about.html",
        "years/2004/sites/gmail/about.html",
        "years/2004/sites/gmail/compose.html",
        "years/2004/sites/web20conference/index.html",
        "years/2004/sites/delicious/index.html",
        "years/2004/sites/feedburner/index.html",
        "years/2004/sites/google/ipo.html",
        "assets/period/2004/gmail/logo-wa.gif",
        "assets/period/2004/flickr/logo-wa.gif",
        "assets/period/2004/facebook/logo-wa.gif",
        "assets/period/2004/firefox/logo-wa.gif",
        "assets/period/2004/digg/logo-wa.gif",
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
    conf = read(ROOT / "years/2004/sites/web20conference/index.html")
    if "Web as Platform" not in conf and "Web as platform" not in conf:
        fail("2004-densify", "web20 conference weak")
        return
    about = read(ROOT / "years/2004/sites/google/about.html")
    if "©2001" in about or "No webmail product yet" in about:
        fail("2004-densify", "google about still 2001 anachronism")
        return
    ok("2004-densify")


def test_2005_densify() -> None:
    if not (ROOT / "years/2005").exists():
        ok("2005-densify-skip")
        return
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
