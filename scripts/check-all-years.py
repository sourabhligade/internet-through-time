#!/usr/bin/env python3
"""
All-years health check for Internet Through Time.

Reports a matrix of every year directory (and known planned years) and verifies
the stack needed for that year to "work": shell, configs, immersion boot,
registry, home page, urlMap paths, signature rooms, hub card.

  python3 scripts/check-all-years.py
  python3 scripts/check-all-years.py --http http://127.0.0.1:8080
  python3 scripts/check-all-years.py --json   # machine-readable summary

Exit 1 if any shipped year fails a required check.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Years the museum ships (hub open 1994–2014 — DISK-TRUTH)
KNOWN_YEARS = [str(y) for y in range(1994, 2015)]  # 1994–2014

# Per-year signature pages that must exist when the year tree is present
SIGNATURE: dict[str, list[str]] = {
    "1994": ["pages/home.html", "sites/yahoo/index.html"],
    "1995": ["pages/home.html", "sites/amazon/index.html"],
    "1996": ["pages/home.html", "sites/hotmail/index.html", "sites/yahoo/index.html"],
    "1997": ["pages/home.html", "sites/ebay/index.html"],
    "1998": ["pages/home.html", "sites/google/index.html", "sites/amazon/index.html"],
    "1999": ["pages/home.html", "sites/napster/index.html", "sites/google/index.html", "sites/blogger/index.html"],
    "2000": ["pages/home.html", "sites/amazon/index.html", "sites/napster/index.html"],
    "2001": ["pages/home.html", "sites/wikipedia/index.html", "sites/apple/ipod.html"],
    "2002": ["pages/home.html", "sites/friendster/index.html", "sites/kazaa/index.html"],
    "2003": ["pages/home.html", "sites/myspace/index.html", "sites/itunes/index.html", "sites/wordpress/index.html"],
    "2004": ["pages/home.html", "sites/facebook/index.html", "sites/flickr/index.html", "sites/gmail/index.html"],
    "2005": [
        "pages/home.html",
        "pages/about.html",
        "sites/youtube/index.html",
        "sites/maps/index.html",
        "sites/reddit/index.html",
        "sites/digg/index.html",
    ],
    "2006": ["pages/home.html", "sites/twitter/index.html", "sites/facebook/feed.html", "sites/youtube/index.html"],
    "2007": [
        "pages/home.html",
        "sites/iphone/index.html",
        "sites/gmail/index.html",
        "sites/maps/streetview.html",
        "sites/facebook/platform.html",
    ],
    "2008": [
        "pages/home.html",
        "sites/appstore/index.html",
        "sites/chrome/index.html",
        "sites/android/index.html",
        "sites/hulu/index.html",
        "sites/dropbox/index.html",
        "sites/spotify/index.html",
        "sites/friendconnect/index.html",
    ],
    "2009": [
        "pages/home.html",
        "pages/about.html",
        "sites/appstore/index.html",
        "sites/iphone/index.html",
        "sites/facebook/feed.html",
        "sites/farmville/index.html",
        "sites/bing/index.html",
        "sites/windows7/index.html",
    ],
    "2010": [
        "pages/home.html",
        "pages/about.html",
        "sites/ipad/index.html",
        "sites/iphone/index.html",
        "sites/instagram/index.html",
        "sites/appstore/index.html",
        "sites/facebook/feed.html",
        "sites/farmville/index.html",
        "sites/foursquare/index.html",
        "sites/windows7/index.html",
    ],
    "2011": [
        "pages/home.html",
        "pages/about.html",
        "sites/spotify/index.html",
        "sites/facebook/timeline.html",
        "sites/googleplus/index.html",
        "sites/iphone/siri.html",
        "sites/ipad/index.html",
        "sites/netflix/qwikster.html",
        "sites/ie9/index.html",
    ],
    "2012": [
        "pages/home.html",
        "pages/about.html",
        "sites/instagram/index.html",
        "sites/instagram/android.html",
        "sites/instagram/acquired.html",
        "sites/facebook/ipo.html",
        "sites/pinterest/index.html",
        "sites/iphone/index.html",
        "sites/iphone/maps.html",
        "sites/ipad/index.html",
        "sites/windows8/index.html",
        "sites/chrome/index.html",
    ],
    "2013": [
        "pages/home.html",
        "pages/about.html",
        "sites/vine/index.html",
        "sites/vine/record.html",
        "sites/instagram/video.html",
        "sites/snapchat/story.html",
        "sites/iphone/index.html",
        "sites/iphone/ios7.html",
        "sites/iphone/touchid.html",
        "sites/windows81/index.html",
        "sites/chrome/index.html",
        "sites/snowden/index.html",
    ],
}

# Optional research markers (year can be "research-only" without tree)
RESEARCH_MARKERS: dict[str, list[str]] = {
    "2006": [
        "docs/2006-RESEARCH.md",
        "docs/2006-MUSEUM-GRADE.md",
        "docs/2006-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md",
    ],
}


def hub_available_years() -> set[str]:
    hub = (ROOT / "index.html").read_text(errors="ignore")
    # year-card available … data-year="2005"
    return set(re.findall(r'class="year-card available[^"]*"[^>]*data-year="(\d{4})"', hub)) | set(
        re.findall(r'data-year="(\d{4})"[^>]*class="year-card available', hub)
    )


def registry_years() -> set[str]:
    reg = (ROOT / "js/immersion/registry.js").read_text(errors="ignore")
    # "1994": [  inside IMMERSION_FEATURES_BY_YEAR
    return set(re.findall(r'"(\d{4})"\s*:\s*\[', reg))


def urlmap_keys(year: str) -> list[str] | None:
    """Return urlMap keys via node, or None if config missing / unreadable."""
    cfg = ROOT / f"js/config/{year}.js"
    if not cfg.is_file():
        return None
    code = f"""
const fs=require("fs");const vm=require("vm");
const ctx={{window:{{}},console,ITT:{{configs:{{}}}}}};
ctx.window=ctx;
try {{
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync({json.dumps(str(cfg))},"utf8"),ctx);
  const c = (ctx.ITT && ctx.ITT.configs && ctx.ITT.configs[{json.dumps(year)}]) || null;
  if (!c || !c.urlMap) {{ console.log("null"); process.exit(0); }}
  console.log(JSON.stringify(Object.keys(c.urlMap)));
}} catch (e) {{
  console.error(String(e));
  process.exit(2);
}}
"""
    try:
        out = subprocess.check_output(["node", "-e", code], cwd=ROOT, text=True, stderr=subprocess.STDOUT)
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        return None
    line = out.strip().splitlines()[-1] if out.strip() else "null"
    if line == "null":
        return None
    try:
        return json.loads(line)
    except json.JSONDecodeError:
        return None


def http_ok(base: str, path: str) -> bool:
    url = base.rstrip("/") + path
    try:
        req = urllib.request.Request(url, method="GET")
        with urllib.request.urlopen(req, timeout=8) as r:
            return 200 <= r.status < 400
    except (urllib.error.URLError, TimeoutError, ValueError):
        return False


def check_year(year: str, http_base: str | None) -> dict:
    """Return structured result for one year."""
    ydir = ROOT / "years" / year
    on_disk = ydir.is_dir() and (ydir / "index.html").is_file()
    result: dict = {
        "year": year,
        "on_disk": on_disk,
        "status": "absent",
        "checks": {},
        "errors": [],
        "warnings": [],
    }

    research = RESEARCH_MARKERS.get(year, [])
    research_ok = all((ROOT / p).is_file() for p in research) if research else False
    if research:
        result["checks"]["research_docs"] = research_ok
        if not research_ok and not on_disk:
            result["warnings"].append("research markers incomplete")

    if not on_disk:
        result["status"] = "research_only" if research_ok else "absent"
        if year in hub_available_years():
            result["errors"].append("hub marks year available but years/{y}/ missing".format(y=year))
            result["status"] = "fail"
        return result

    checks = result["checks"]
    errs = result["errors"]
    warns = result["warnings"]

    shell = ydir / "index.html"
    shell_txt = shell.read_text(errors="ignore")
    checks["shell"] = True
    if f'data-itt-year="{year}"' not in shell_txt and f"data-itt-year='{year}'" not in shell_txt:
        # some shells set year on body via JS; require either attribute or config script
        if f"browser-{year}.js" not in shell_txt and f"config/{year}.js" not in shell_txt:
            errs.append("shell missing data-itt-year and year config scripts")
        else:
            warns.append("shell lacks data-itt-year attribute (may set via JS)")
    else:
        checks["shell_year_attr"] = True

    # Config + immersion stubs
    paths = {
        "config": ROOT / f"js/config/{year}.js",
        "immersion_config": ROOT / f"js/config/immersion-{year}.js",
        "immersion_stub": ROOT / f"js/immersion-{year}.js",
        "browser_year": ROOT / f"js/browser-{year}.js",
        "home": ydir / "pages/home.html",
    }
    for name, p in paths.items():
        ok = p.is_file()
        checks[name] = ok
        if not ok and name in ("config", "immersion_config", "immersion_stub", "home"):
            errs.append(f"missing {p.relative_to(ROOT)}")

    # Registry
    reg = year in registry_years()
    checks["registry"] = reg
    if not reg:
        errs.append("missing from js/immersion/registry.js IMMERSION_FEATURES_BY_YEAR")

    # Hub available
    hub_av = year in hub_available_years()
    checks["hub_available"] = hub_av
    if not hub_av:
        warns.append("hub does not mark year-card available (locked?)")

    # Signature rooms
    sig = SIGNATURE.get(year, ["pages/home.html"])
    sig_miss = [s for s in sig if not (ydir / s).is_file()]
    checks["signature"] = len(sig_miss) == 0
    if sig_miss:
        errs.append(f"signature missing: {sig_miss[:5]}")

    # urlMap completeness
    keys = urlmap_keys(year)
    if keys is None:
        checks["urlmap"] = False
        errs.append("urlMap unreadable (config/node)")
    else:
        miss = [k for k in keys if not (ydir / k).is_file()]
        checks["urlmap"] = len(miss) == 0
        checks["urlmap_count"] = len(keys)
        if miss:
            errs.append(f"urlMap missing {len(miss)} files e.g. {miss[:3]}")

    # Immersion stub references boot/registry pattern
    stub = paths["immersion_stub"]
    if stub.is_file():
        st = stub.read_text(errors="ignore")
        checks["immersion_boot_chain"] = "immersion/boot.js" in st or "immersion-core" in st or "create.js" in st
        if not checks["immersion_boot_chain"]:
            warns.append("immersion stub may not load boot chain")

    # Dual-load smell on signature pages (feature module + year stub)
    dual = 0
    for s in sig[:8]:
        p = ydir / s
        if not p.is_file():
            continue
        t = p.read_text(errors="ignore")
        if re.search(r"immersion-\d{4}\.js", t) and re.search(r"immersion/[a-z0-9-]+\.js", t):
            dual += 1
    checks["no_dual_load_sample"] = dual == 0
    if dual:
        errs.append(f"dual-load immersion on {dual} signature page(s)")

    # Optional HTTP
    if http_base:
        paths_http = [f"/years/{year}/", f"/years/{year}/pages/home.html"]
        for s in sig[:3]:
            paths_http.append(f"/years/{year}/{s}")
        bad = [p for p in paths_http if not http_ok(http_base, p)]
        checks["http"] = len(bad) == 0
        if bad:
            errs.append(f"HTTP fail: {bad[:3]}")

    result["status"] = "pass" if not errs else "fail"
    if warns and result["status"] == "pass":
        result["status"] = "pass_warn"
    return result


def main() -> int:
    ap = argparse.ArgumentParser(description="Check all museum years work")
    ap.add_argument("--http", dest="http_base", default=None, help="Base URL for HTTP checks")
    ap.add_argument("--json", action="store_true", help="Print JSON summary")
    ap.add_argument(
        "--years",
        default=None,
        help="Comma-separated years (default: discover disk + known)",
    )
    args = ap.parse_args()

    disk_years = sorted(
        p.name
        for p in (ROOT / "years").iterdir()
        if p.is_dir() and re.fullmatch(r"\d{4}", p.name)
    )
    if args.years:
        years = [y.strip() for y in args.years.split(",") if y.strip()]
    else:
        years = sorted(set(KNOWN_YEARS) | set(disk_years), key=int)

    results = [check_year(y, args.http_base) for y in years]

    if args.json:
        print(json.dumps({"results": results}, indent=2))
    else:
        print("Internet Through Time — all-years health check")
        print(f"Root: {ROOT}")
        if args.http_base:
            print(f"HTTP: {args.http_base}")
        print()
        # Matrix header
        print(f"{'Year':<6} {'Status':<12} {'Disk':<5} {'Hub':<5} {'Reg':<5} {'Home':<5} {'Sig':<5} {'Map':<8} Notes")
        print("-" * 100)
        for r in results:
            c = r["checks"]
            def yn(k: str, true="Y", false="·") -> str:
                v = c.get(k)
                if v is True:
                    return true
                if v is False:
                    return false
                return "·"

            mapc = c.get("urlmap_count")
            map_s = f"{mapc}" if mapc is not None else ("Y" if c.get("urlmap") else "·")
            if c.get("urlmap") is False:
                map_s = "FAIL"
            notes = "; ".join(r["errors"][:2] or r["warnings"][:1] or (["ok"] if r["status"].startswith("pass") else [r["status"]]))
            print(
                f"{r['year']:<6} {r['status']:<12} "
                f"{'Y' if r['on_disk'] else '·':<5} "
                f"{yn('hub_available'):<5} "
                f"{yn('registry'):<5} "
                f"{yn('home'):<5} "
                f"{yn('signature'):<5} "
                f"{map_s:<8} "
                f"{notes[:60]}"
            )

        shipped = [r for r in results if r["on_disk"]]
        failed = [r for r in results if r["status"] == "fail"]
        research = [r for r in results if r["status"] == "research_only"]
        print()
        print(
            f"Summary: {len(shipped)} on disk · "
            f"{sum(1 for r in shipped if r['status'].startswith('pass'))} pass · "
            f"{len(failed)} fail · "
            f"{len(research)} research-only · "
            f"{sum(1 for r in results if r['status']=='absent')} absent"
        )
        if failed:
            print("\nFailures:")
            for r in failed:
                print(f"  {r['year']}:")
                for e in r["errors"]:
                    print(f"    - {e}")

    # Exit code: fail if any on-disk year failed, or hub claims available without disk
    hard_fail = any(r["status"] == "fail" for r in results)
    return 1 if hard_fail else 0


if __name__ == "__main__":
    sys.exit(main())
