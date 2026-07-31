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


def test_required_year_shells() -> None:
    for y in ("1994", "1995", "1996", "1997", "1998", "1999", "2001", "2002"):
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
    if "Content-Security-Policy" not in nt:
        fail("deploy-configs", "netlify.toml missing CSP")
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
