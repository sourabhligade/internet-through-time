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
    "e2e/atlas.spec.js",
    "e2e/3x-links.spec.js",
    "e2e/all-years-smoke.spec.js",
    "e2e/gold-a-leftover-pack.spec.js",
    "e2e/popular-3x-sites.spec.js",
    "e2e/one-thing-per-year.spec.js",
    "e2e/2016-2018-3x-detail.spec.js",
    "e2e/2016-2018-trail-chain.spec.js",
    "e2e/2017-2019-deepen-theater.spec.js",
    "e2e/2021-2022-deepen-theater.spec.js",
    "e2e/2021-2022-ytl-theater.spec.js",
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
    if "ship pack" not in sh.lower() and "ship e2e" not in wf.lower():
        fail("ci-e2e-allowlist", "ci.sh / ci.yml should label the pack as a ship subset")
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
    wiped = {"2003", "2025"}
    for y in range(1994, 2025):
        ys = str(y)
        if ys in wiped:
            if f"/years/{ys}/" in sm:
                fail("sitemap-years", f"wiped {ys} still listed")
                return
            continue
        if f"/years/{ys}/" not in sm:
            fail("sitemap-years", f"missing /years/{ys}/")
            return
    if "/years/2005/pages/home.html" not in sm:
        fail("sitemap-years", "missing 2005 Starting Point")
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
