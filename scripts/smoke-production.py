#!/usr/bin/env python3
"""
Production smoke checks for Internet Through Time.
Run from repo root. Exit 1 on any failure.

  python3 scripts/smoke-production.py
  python3 scripts/smoke-production.py --base http://127.0.0.1:8080
"""
from __future__ import annotations

import argparse
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FAILS: list[str] = []


def fail(msg: str) -> None:
    FAILS.append(msg)
    print("  FAIL:", msg)


def ok(msg: str) -> None:
    print("  OK  ", msg)


def check_files() -> None:
    print("== Required files ==")
    required = [
        "index.html",
        "favicon.gif",
        "404.html",
        "js/lib/util.js",
        "js/browser-core.js",
        "js/immersion-core.js",
        "js/immersion/create.js",
        "js/immersion/shared.js",
        "js/immersion/amazon.js",
        "years/1994/index.html",
        "years/1995/index.html",
        "years/1996/index.html",
        "years/1997/index.html",
        "years/1998/index.html",
        "years/1999/index.html",
        "years/2000/index.html",
        "years/2001/index.html",
        "years/2002/index.html",
        "years/2003/index.html",
        "js/config/1994.js",
        "js/config/1995.js",
        "js/config/1996.js",
        "js/config/1997.js",
        "js/config/1998.js",
        "js/config/1999.js",
        "js/config/2000.js",
        "js/config/2001.js",
        "js/config/2002.js",
        "js/config/2003.js",
        "js/config/immersion-2000.js",
        "js/config/immersion-2001.js",
        "js/config/immersion-2002.js",
        "js/config/immersion-2003.js",
        "js/immersion-2000.js",
        "js/immersion-2001.js",
        "js/immersion-2002.js",
        "js/immersion-2003.js",
        "js/config/immersion-1994.js",
        "js/config/immersion-1995.js",
        "js/config/immersion-1996.js",
        "js/config/immersion-1997.js",
        "js/config/immersion-1998.js",
        "js/config/immersion-1999.js",
        "js/immersion-1994.js",
        "js/immersion-1995.js",
        "js/immersion-1996.js",
        "js/immersion-1997.js",
        "js/immersion-1998.js",
        "js/immersion-1999.js",
        "js/immersion/napster.js",
        "js/immersion/blogger.js",
        "js/immersion/registry.js",
        "years/2000/sites/amazon/index.html",
        "years/2000/sites/napster/index.html",
        "years/2000/sites/pets/index.html",
        "assets/period/2000/amazon/logo-smile.gif",
        "years/2001/sites/wikipedia/index.html",
        "years/2001/sites/apple/ipod.html",
        "years/2002/sites/friendster/index.html",
        "years/2002/sites/kazaa/index.html",
        "years/2002/sites/wired/index.html",
        "years/2003/sites/myspace/index.html",
        "years/2003/sites/itunes/index.html",
        "years/2003/sites/wordpress/index.html",
        "years/2003/sites/linkedin/index.html",
        "years/2005/sites/youtube/index.html",
        "years/2005/sites/maps/index.html",
        "years/2005/sites/reddit/index.html",
        "years/2005/sites/digg/index.html",
        "years/2006/sites/twitter/index.html",
        "years/2006/sites/facebook/feed.html",
        "years/2006/sites/youtube/index.html",
        "years/2006/sites/digg/index.html",
        "years/2006/sites/docs/index.html",
        "years/2006/sites/aws/index.html",
        "years/2007/sites/iphone/index.html",
        "years/2007/sites/maps/streetview.html",
        "years/2007/sites/facebook/platform.html",
        "years/2008/index.html",
        "years/2008/sites/appstore/index.html",
        "years/2008/sites/chrome/index.html",
        "years/2008/sites/android/index.html",
        "years/2008/sites/hulu/index.html",
        "assets/period/2001/amazon/logo-smile.gif",
        "assets/period/2002/amazon/logo-smile.gif",
        "assets/period/2003/myspace/logo.gif",
        "assets/period/2003/itunes/logo.gif",
    ]
    for rel in required:
        if (ROOT / rel).exists():
            ok(rel)
        else:
            fail(f"missing {rel}")


def resolve(page: Path, href: str) -> Path | None:
    if href.startswith(("http://", "https://", "data:", "mailto:", "#", "javascript:")):
        return None
    href = href.split("?")[0].split("#")[0]
    if not href:
        return None
    parts = list(page.parent.parts) + href.split("/")
    out: list[str] = []
    for p in parts:
        if p in ("", "."):
            continue
        if p == "..":
            if out:
                out.pop()
        else:
            out.append(p)
    return Path(*out)


def check_local_refs() -> None:
    print("== Local asset references ==")
    missing = 0
    checked = 0
    for html in list((ROOT / "years").rglob("*.html")) + [ROOT / "index.html"]:
        text = html.read_text(errors="ignore")
        for m in re.finditer(r"""(?:src|href)=["']([^"']+)["']""", text, re.I):
            href = m.group(1)
            if not re.search(r"\.(css|js|gif|png|jpg|jpeg|wav|ico)(\?|$)", href, re.I):
                continue
            target = resolve(html, href)
            if target is None:
                continue
            checked += 1
            if not target.exists():
                missing += 1
                if missing <= 20:
                    fail(f"{html.relative_to(ROOT)} -> {href} (missing {target})")
    if missing == 0:
        ok(f"all {checked} css/js/img refs resolve on disk")
    else:
        fail(f"{missing} broken refs (of {checked} checked)")


def check_urlmaps() -> None:
    print("== Config urlMap paths ==")
    import json
    import subprocess

    for year in ("1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"):
        code = f"""
const fs=require("fs");const vm=require("vm");
const ctx={{window:{{}},console}};ctx.window=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync("js/config/{year}.js","utf8"),ctx);
console.log(JSON.stringify(Object.keys(ctx.ITT.configs["{year}"].urlMap)));
"""
        keys = json.loads(subprocess.check_output(["node", "-e", code], cwd=ROOT, text=True))
        miss = [k for k in keys if not (ROOT / "years" / year / k).exists()]
        if miss:
            fail(f"{year} urlMap missing {len(miss)} files: {miss[:5]}")
        else:
            ok(f"{year} urlMap {len(keys)} paths exist")


def check_http(base: str) -> None:
    print(f"== HTTP smoke ({base}) ==")
    paths = [
        "/",
        "/index.html",
        "/favicon.gif",
        "/years/1994/",
        "/years/1995/",
        "/years/1996/",
        "/years/1995/pages/home.html",
        "/years/1995/sites/amazon/index.html",
        "/years/1996/sites/hotmail/index.html",
        "/years/1997/",
        "/years/1997/pages/home.html",
        "/years/1997/sites/ebay/index.html",
        "/years/1997/sites/cnn/index.html",
        "/years/1998/",
        "/years/1998/pages/home.html",
        "/years/1998/sites/google/index.html",
        "/years/1998/sites/amazon/music.html",
        "/years/1999/",
        "/years/1999/pages/home.html",
        "/years/1999/sites/napster/index.html",
        "/years/1999/sites/google/index.html",
        "/years/1999/sites/blogger/index.html",
        "/years/2000/",
        "/years/2000/pages/home.html",
        "/years/2000/sites/amazon/index.html",
        "/years/2000/sites/napster/index.html",
        "/years/2000/sites/pets/index.html",
        "/years/2001/",
        "/years/2001/pages/home.html",
        "/years/2001/sites/wikipedia/index.html",
        "/years/2001/sites/apple/ipod.html",
        "/years/2002/",
        "/years/2002/pages/home.html",
        "/years/2002/sites/friendster/index.html",
        "/years/2002/sites/kazaa/client.html",
        "/years/2003/",
        "/years/2003/pages/home.html",
        "/years/2003/sites/myspace/index.html",
        "/years/2004/",
        "/years/2004/pages/home.html",
        "/years/2004/sites/gmail/index.html",
        "/years/2004/sites/firefox/index.html",
        "/js/browser-core.js",
        "/js/immersion-core.js",
        "/js/config/1995.js",
        "/css/hub.css",
        "/robots.txt",
        "/sitemap.txt",
        "/404.html",
        "/years/1995/sites/amazon/book-neuromancer.html",
        "/years/1996/pages/error/404.html",
        "/assets/gif/1995/cover-neuromancer.gif",
    ]
    for path in paths:
        url = base.rstrip("/") + path
        try:
            with urllib.request.urlopen(url, timeout=5) as r:
                code = r.status
                if code != 200:
                    fail(f"HTTP {code} {path}")
                else:
                    ok(f"HTTP 200 {path}")
        except urllib.error.HTTPError as e:
            fail(f"HTTP {e.code} {path}")
        except Exception as e:
            fail(f"HTTP error {path}: {e}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="", help="If set, also hit HTTP endpoints")
    args = ap.parse_args()
    print("Internet Through Time — production smoke\n")
    check_files()
    check_local_refs()
    check_urlmaps()
    if args.base:
        check_http(args.base)
    else:
        print("== HTTP smoke skipped (pass --base http://127.0.0.1:8080) ==")

    print()
    if FAILS:
        print(f"FAILED ({len(FAILS)} issues)")
        return 1
    print("ALL CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
