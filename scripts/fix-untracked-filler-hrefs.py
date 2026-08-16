#!/usr/bin/env python3
"""Retarget committed hrefs/urlMap/atlas entries that point at untracked dest-fill."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILLER = {
    "help.html",
    "faq.html",
    "legal.html",
    "press.html",
    "privacy.html",
    "terms.html",
    "support.html",
    "blog.html",
    "news.html",
    "notes.html",
    "tips.html",
    "status.html",
}
HREF_RE = re.compile(r'''(href|src|action)\s*=\s*(["'])([^"'#?]+)''', re.I)
URLMAP_RE = re.compile(
    r'''^[ \t]*"(sites/[^"]+/(?:help|faq|legal|press|privacy|terms|support|blog|news|notes|tips|status)\.html)"\s*:\s*"[^"]*",?\s*$''',
    re.M,
)


def git_set(args):
    return set(subprocess.check_output(["git", *args], cwd=ROOT, text=True).splitlines())


def resolve(src_rel: str, href: str) -> str | None:
    href = href.strip()
    if not href or href.startswith(("mailto:", "javascript:", "http://", "https://", "data:", "#")):
        return None
    if href.startswith("/years/"):
        dest = href[1:]
    elif href.startswith("/"):
        return None
    else:
        dest = str(Path(src_rel).parent / href)
    parts = []
    for p in dest.replace("\\", "/").split("/"):
        if p in ("", "."):
            continue
        if p == "..":
            if not parts:
                return None
            parts.pop()
        else:
            parts.append(p)
    dest = "/".join(parts)
    if dest.endswith(".html") and dest.startswith("years/"):
        return dest
    return None


def sibling_index(dest: str) -> str:
    return str(Path(dest).with_name("index.html")).replace("\\", "/")


def rewrite_html(rel: str, tracked: set[str], untracked: set[str]) -> int:
    path = ROOT / rel
    text = path.read_text(encoding="utf-8", errors="replace")
    n = 0

    def repl(m):
        nonlocal n
        attr, q, href = m.group(1), m.group(2), m.group(3)
        dest = resolve(rel, href)
        if not dest:
            return m.group(0)
        name = Path(dest).name.lower()
        if name not in FILLER:
            return m.group(0)
        if dest in tracked:
            return m.group(0)
        if dest not in untracked and (ROOT / dest).exists() is False:
            # missing or untracked
            pass
        elif dest in tracked:
            return m.group(0)
        idx = sibling_index(dest)
        if idx not in tracked:
            return m.group(0)
        n += 1
        # keep relative shape
        if href.startswith("/years/"):
            new = "/" + idx
        else:
            # same directory as dest relative to src
            src_dir = Path(rel).parent
            try:
                new = str(Path(idx).relative_to(src_dir)).replace("\\", "/")
            except ValueError:
                new = href.rsplit("/", 1)[0] + "/index.html" if "/" in href else "index.html"
        return f"{attr}={q}{new}"

    new = HREF_RE.sub(repl, text)
    if n and new != text:
        path.write_text(new, encoding="utf-8")
    return n


def rewrite_urlmap(rel: str, tracked: set[str]) -> int:
    path = ROOT / rel
    text = path.read_text(encoding="utf-8", errors="replace")
    year_m = re.search(r"(\d{4})\.js$", rel)
    year = year_m.group(1) if year_m else None
    n = 0
    out = []
    for line in text.splitlines(keepends=True):
        m = URLMAP_RE.match(line.rstrip("\n"))
        if m and year:
            dest = f"years/{year}/{m.group(1)}"
            if dest not in tracked:
                n += 1
                continue
        out.append(line)
    if n:
        path.write_text("".join(out), encoding="utf-8")
    return n


def rewrite_atlas(tracked: set[str]) -> int:
    path = ROOT / "js/config/flow-maps-5x-atlas.js"
    if not path.exists():
        return 0
    text = path.read_text(encoding="utf-8", errors="replace")
    n = 0

    def repl_href(m):
        nonlocal n
        href = m.group(1)
        name = href.rsplit("/", 1)[-1].split("?")[0].lower()
        if name not in FILLER:
            return m.group(0)
        n += 1
        base = href.rsplit("/", 1)[0]
        return f'"href": "{base}/index.html"'

    new = re.sub(r'"href":\s*"(sites/[^"]+)"', repl_href, text)
    if n:
        path.write_text(new, encoding="utf-8")
    return n


def main():
    tracked = git_set(["ls-files"])
    untracked = git_set(["ls-files", "--others", "--exclude-standard"])
    html_n = 0
    html_files = 0
    for rel in sorted(tracked):
        if not rel.endswith(".html"):
            continue
        if rel.startswith("docs/"):
            continue
        c = rewrite_html(rel, tracked, untracked)
        if c:
            html_files += 1
            html_n += c
    um_n = 0
    um_files = 0
    for rel in sorted(tracked):
        if not rel.startswith("js/config/") or not rel.endswith(".js"):
            continue
        if "flow-maps" in rel:
            continue
        c = rewrite_urlmap(rel, tracked)
        if c:
            um_files += 1
            um_n += c
    atlas_n = rewrite_atlas(tracked)
    print(f"html rewrites {html_n} in {html_files} files")
    print(f"urlMap stripped {um_n} in {um_files} files")
    print(f"atlas retargets {atlas_n}")


if __name__ == "__main__":
    main()
