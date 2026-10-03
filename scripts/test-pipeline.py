#!/usr/bin/env python3
"""
Pipeline / release-gate tests (no browser).

Guards CI config, npm scripts, and lockfile so local and GitHub Actions stay aligned.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT / "scripts") not in sys.path:
    sys.path.insert(0, str(ROOT / "scripts"))
from itt_gate import SHIP_YEARS, _BOARDED, _WIPED, _YEARS  # noqa: E402
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


def test_ci_workflow_exists() -> None:
    wf = ROOT / ".github/workflows/ci.yml"
    if not wf.is_file():
        fail("ci-workflow", "missing .github/workflows/ci.yml")
        return
    s = read(wf)
    required = [
        "test-authenticity.py",
        "smoke-production.py",
        "audit-internal-links.py",
        "npm ci",
        "playwright test",
        "playwright install",
        "check-all-years.py",
        "check-5x-contract.py",
    ]
    for needle in required:
        if needle not in s:
            fail("ci-workflow", f"ci.yml missing {needle!r}")
            return
    if "npm init -y" in s:
        fail("ci-workflow", "ci.yml still uses npm init -y (use npm ci)")
        return
    if "jobs:" not in s or "static:" not in s or "e2e:" not in s:
        fail("ci-workflow", "expected static + e2e jobs")
        return
    ok("ci-workflow")


def test_no_legacy_smoke_workflow() -> None:
    legacy = ROOT / ".github/workflows/smoke.yml"
    if legacy.is_file():
        fail("no-legacy-smoke", "smoke.yml still present; use ci.yml only")
    else:
        ok("no-legacy-smoke")


def test_package_scripts() -> None:
    pkg = json.loads(read(ROOT / "package.json"))
    scripts = pkg.get("scripts") or {}
    for key in ("ci", "check", "test", "test:e2e", "test:static", "smoke", "audit:links"):
        if key not in scripts:
            fail("package-scripts", f"missing scripts.{key}")
            return
    if "scripts/ci.sh" not in scripts.get("ci", "") and "ci.sh" not in scripts.get("ci", ""):
        fail("package-scripts", "scripts.ci should invoke scripts/ci.sh")
        return
    if "test-authenticity" not in scripts.get("check", ""):
        fail("package-scripts", "scripts.check should run authenticity")
        return
    ok("package-scripts")


def test_lockfile_and_playwright_pin() -> None:
    lock = ROOT / "package-lock.json"
    if not lock.is_file():
        fail("lockfile", "missing package-lock.json (required for npm ci)")
        return
    pkg = json.loads(read(ROOT / "package.json"))
    dep = (pkg.get("devDependencies") or {}).get("@playwright/test")
    if not dep:
        fail("playwright-pin", "missing devDependency @playwright/test")
        return
    ok(f"lockfile-and-playwright ({dep})")


def test_ci_sh_executable() -> None:
    sh = ROOT / "scripts/ci.sh"
    if not sh.is_file():
        fail("ci-sh", "missing scripts/ci.sh")
        return
    mode = sh.stat().st_mode
    if not (mode & 0o111):
        fail("ci-sh", "scripts/ci.sh is not executable")
        return
    s = read(sh)
    for needle in ("smoke-production.py", "audit-internal-links.py", "test-authenticity.py", "playwright test"):
        if needle not in s:
            fail("ci-sh", f"ci.sh missing {needle!r}")
            return
    ok("ci-sh")


def test_playwright_config_ci() -> None:
    cfg = read(ROOT / "playwright.config.js")
    if "isCI" not in cfg and "process.env.CI" not in cfg:
        fail("playwright-config", "config should special-case CI")
        return
    if "retries" not in cfg:
        fail("playwright-config", "missing retries")
        return
    if "webServer" not in cfg:
        fail("playwright-config", "missing webServer for local/CI")
        return
    ok("playwright-config-ci")


# Merge CI Playwright allowlist — not npm test / not the full e2e/ tree.
CI_E2E_ALLOWLIST = (
    "e2e/hub-years.spec.js",
    "e2e/year-start-trails.spec.js",
    "e2e/visitor-door.spec.js",
    "e2e/flow-check-pipeline.spec.js",
    "e2e/one-thing-per-year.spec.js",
    "e2e/all-years-official-10-real.spec.js",
    "e2e/leftover-3x-unique.spec.js",
    "e2e/leftover-2x-unique-links.spec.js",
    "e2e/leftover-3x-unique-links.spec.js",
    "e2e/official-leftover-2x.spec.js",
    "e2e/lean-triple-leftover.spec.js",
    "e2e/year-true-packs.spec.js",
    "e2e/2016-3x-detail.spec.js",
    "e2e/2017-mvp.spec.js",
    "e2e/2008-mvp.spec.js",
    "e2e/2009-mvp.spec.js",
    "e2e/dest-top.spec.js",
    "e2e/follow-site.spec.js",
)


def test_e2e_suite_present() -> None:
    e2e = ROOT / "e2e"
    specs = list(e2e.glob("*.spec.js"))
    if len(specs) < 8:
        fail("e2e-suite", f"only {len(specs)} specs (want >= 8)")
        return
    if not (e2e / "helpers.js").is_file():
        fail("e2e-suite", "missing e2e/helpers.js")
        return
    ok(f"e2e-suite ({len(specs)} specs)")


def test_ci_e2e_allowlist() -> None:
    """CI runs a named ship-subset visitor/gold pack, not `playwright test` of all e2e/."""
    wf = read(ROOT / ".github/workflows/ci.yml")
    sh = read(ROOT / "scripts/ci.sh")
    missing = [rel for rel in CI_E2E_ALLOWLIST if rel not in wf or rel not in sh]
    if missing:
        fail("ci-e2e-allowlist", "ci.yml/ci.sh missing " + ", ".join(missing))
        return
    extra_hint = "This is a subset of e2e/; npm test runs the full tree"
    if "dest-true" not in sh.lower() and "dest-true" not in wf.lower():
        fail("ci-e2e-allowlist", "ci.sh / ci.yml should label the pack dest-true I/O")
        return
    for rel in CI_E2E_ALLOWLIST:
        if not (ROOT / rel).is_file():
            fail("ci-e2e-allowlist", f"missing {rel}")
            return
    _ = extra_hint
    ok(f"ci-e2e-allowlist ({len(CI_E2E_ALLOWLIST)} files · not full npm test)")


def test_browser_srp_parts() -> None:
    for rel in (
        "js/browser/navigate.js",
        "js/browser/connect.js",
        "js/browser/load-theater.js",
        "js/browser/chrome-ui.js",
        "js/browser/create.js",
        "js/browser/year-boot.js",
    ):
        if not (ROOT / rel).is_file():
            fail("browser-srp", f"missing {rel}")
            return
    core = read(ROOT / "js/browser-core.js")
    if "browser/chrome-ui.js" not in core:
        fail("browser-srp", "browser-core.js must load chrome-ui.js")
        return
    ok("browser-srp-parts")


def test_sitemap_ship_years() -> None:
    sm = read(ROOT / "sitemap.txt")
    for ys in sorted(_WIPED | _BOARDED):
        if f"/years/{ys}/" in sm:
            fail("sitemap-years", f"{'boarded' if ys in _BOARDED else 'wiped'} {ys} still listed")
            return
    react_doors = {y for y, r in _YEARS.items() if r.get("kind") == "react"}
    for ys in SHIP_YEARS:
        if ys in react_doors:
            if f"/app/index.html#/year/{ys}" not in sm:
                fail("sitemap-years", f"missing React door /app/index.html#/year/{ys}")
                return
            continue
        if f"/years/{ys}/" not in sm:
            fail("sitemap-years", f"missing /years/{ys}/")
            return
    if "/years/2004/pages/home.html" not in sm:
        fail("sitemap-years", "missing 2004 Starting Point")
        return
    ok("sitemap-years")


def test_required_year_shells() -> None:
    for y in ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2004"):
        p = ROOT / "years" / y / "index.html"
        if not p.is_file():
            fail("year-shells", f"missing years/{y}/index.html")
            return
        text = read(p)
        if "browser" not in text.lower() and "content" not in text:
            fail("year-shells", f"years/{y}/index.html looks incomplete")
            return
    ok("year-shells")


def test_deploy_configs() -> None:
    if not (ROOT / "netlify.toml").is_file():
        fail("deploy-configs", "missing netlify.toml")
        return
    if not (ROOT / "vercel.json").is_file():
        fail("deploy-configs", "missing vercel.json")
        return
    nt = read(ROOT / "netlify.toml")
    vj = read(ROOT / "vercel.json")
    if "Content-Security-Policy" not in nt:
        fail("deploy-configs", "netlify.toml missing CSP")
        return
    if "stale-while-revalidate" not in nt or "stale-while-revalidate" not in vj:
        fail("deploy-configs", "JS/CSS cache must allow stale-while-revalidate")
        return
    if "Permissions-Policy" not in nt:
        fail("deploy-configs", "netlify.toml missing Permissions-Policy")
        return
    ok("deploy-configs")


def test_year_card() -> None:
    """js/year-card.json is the door list. The browser copy and the hub must match it."""
    card_path = ROOT / "js" / "year-card.json"
    js_path = ROOT / "js" / "year-card.js"
    if not card_path.is_file() or not js_path.is_file():
        fail("year-card", "missing js/year-card.json or js/year-card.js")
        return
    card = json.loads(card_path.read_text(encoding="utf-8"))
    js = js_path.read_text(encoding="utf-8")
    if "ITT.YEAR_CARD = " not in js:
        fail("year-card", "year-card.js does not assign ITT.YEAR_CARD")
        return
    raw = js.split("ITT.YEAR_CARD = ", 1)[1]
    raw = raw.rsplit("\n})(", 1)[0].rstrip().rstrip(";").strip()
    try:
        embedded = json.loads(raw)
    except json.JSONDecodeError as exc:
        fail("year-card", f"year-card.js is not JSON: {exc}")
        return
    if embedded != card:
        fail("year-card", "year-card.js does not match year-card.json")
        return
    years = card.get("years") or {}
    open_years = [y for y, r in sorted(years.items()) if r.get("kind") in ("html", "react")]
    if open_years != list(SHIP_YEARS):
        fail("year-card", "SHIP_YEARS drifted from the card")
        return
    if len(open_years) != 27:
        fail("year-card", f"expected 27 open doors, got {len(open_years)}")
        return
    if years.get("2011", {}).get("kind") != "html" or years.get("2011", {}).get("star") != "itt11-gplus":
        fail("year-card", "2011 must be html with star itt11-gplus")
        return
    if years.get("2020", {}).get("kind") != "html" or years.get("2020", {}).get("star") != "itt20-zoom":
        fail("year-card", "2020 must be html with star itt20-zoom")
        return
    if years.get("2021", {}).get("kind") != "html" or years.get("2021", {}).get("star") != "itt21-att":
        fail("year-card", "2021 must be html with star itt21-att")
        return
    if years.get("2022", {}).get("kind") != "html" or years.get("2022", {}).get("star") != "itt22-chatgpt":
        fail("year-card", "2022 must be html with star itt22-chatgpt")
        return
    for wiped in ("2018", "2019", "2023", "2024", "2025"):
        if years.get(wiped, {}).get("kind") != "absent":
            fail("year-card", f"{wiped} must stay absent")
            return
    frozen = [y for y, r in years.items() if r.get("frozen")]
    if sorted(frozen) != [str(y) for y in range(1994, 2007)]:
        fail("year-card", f"frozen years {sorted(frozen)}")
        return
    lean = sorted(y for y, r in years.items() if r.get("leanBoot"))
    if lean != ["2014", "2016", "2020", "2021", "2022"]:
        fail("year-card", f"leanBoot {lean}")
        return
    if years.get("2008", {}).get("kind") != "html":
        fail("year-card", "2008 must be html")
        return
    if years.get("2008", {}).get("star") != "itt08-apps":
        fail("year-card", "2008 star must be itt08-apps")
        return
    if years.get("2009", {}).get("kind") != "html":
        fail("year-card", "2009 must be html")
        return
    if years.get("2009", {}).get("star") != "itt09-like":
        fail("year-card", "2009 star must be itt09-like")
        return
    hub = read(ROOT / "index.html")
    cards = []
    for tag in re.findall(r'<a class="year-card available\b[^>]*>', hub):
        href_m = re.search(r'href="([^"]+)"', tag)
        year_m = re.search(r'data-year="(\d{4})"', tag)
        if not href_m or not year_m:
            fail("year-card", "hub card missing href or data-year")
            return
        cards.append((year_m.group(1), href_m.group(1)))
    by_year = {year: href for year, href in cards}
    if len(by_year) != len(cards):
        fail("year-card", "duplicate hub year cards")
        return
    for year in open_years:
        href = years[year].get("href")
        if by_year.get(year) != href:
            fail("year-card", f"hub {year} href {by_year.get(year)!r} != card {href!r}")
            return
    for year, href in by_year.items():
        if year not in open_years:
            fail("year-card", f"hub card for non-open year {year}")
            return
    for rel in ("index.html", "atlas/index.html", "js/browser-core.js", "js/immersion/boot.js"):
        text = read(ROOT / rel)
        if "year-card.js" not in text:
            fail("year-card", f"{rel} does not load year-card.js")
            return
    ok("year-card")


def test_gitignore_test_artifacts() -> None:
    gi = read(ROOT / ".gitignore")
    for needle in ("node_modules", "test-results", "playwright-report"):
        if needle not in gi:
            fail("gitignore", f".gitignore missing {needle}")
            return
    ok("gitignore-artifacts")


def main() -> int:
    print("Pipeline static tests")
    print("=" * 40)
    tests = [
        test_ci_workflow_exists,
        test_no_legacy_smoke_workflow,
        test_package_scripts,
        test_lockfile_and_playwright_pin,
        test_ci_sh_executable,
        test_playwright_config_ci,
        test_e2e_suite_present,
        test_ci_e2e_allowlist,
        test_browser_srp_parts,
        test_sitemap_ship_years,
        test_required_year_shells,
        test_deploy_configs,
        test_year_card,
        test_gitignore_test_artifacts,
    ]
    for t in tests:
        t()
    print("=" * 40)
    print(f"{passes} passed, {len(failures)} failed")
    if failures:
        for f in failures:
            print(f"  • {f}")
        return 1
    print("ALL PIPELINE CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
