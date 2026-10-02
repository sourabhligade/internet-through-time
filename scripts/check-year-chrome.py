#!/usr/bin/env python3
"""Fail when js/year-card.json chrome and ui/year/years.js disagree.

Open years (kind html or react) carry a chrome object. Absent years do not.
HTML years must match the painter fields. GIF toolbars must point at a real
btn-back.gif. Chrome-habit years do not request a GIF folder.
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CARD_PATH = ROOT / "js" / "year-card.json"
YEARS_JS = ROOT / "ui" / "year" / "years.js"

REQUIRED = (
    "os",
    "browser",
    "toolbar",
    "assetYear",
    "location",
    "maximized",
    "hasTaskbar",
)


OS_PHRASE = {
    "win95": "Win95",
    "win98": "Windows 98",
    "winxp": "Windows XP",
    "win7": "Windows 7",
    "win10": "Windows 10",
}
BROWSER_PHRASE = {
    "netscape1": "Netscape 1.0",
    "netscape2": "Netscape 2.0",
    "netscape3": "Netscape 3.0",
    "ie4": "Internet Explorer 4.0",
    "ie5": "Internet Explorer 5.0",
    "ie55": "Internet Explorer 5.5",
    "ie6": "Internet Explorer 6",
    "ie7": "Internet Explorer 7",
    "ie8": "Internet Explorer 8",
    "ie9": "Internet Explorer 9",
    "chrome-habit": "Chrome habit",
}


def year_label(year: str, chrome: dict) -> str:
    """Same sentence ui/year/shell.js yearLabelFromChrome paints."""
    os_phrase = chrome.get("osPhrase") or OS_PHRASE.get(chrome.get("os") or "", "")
    browser_phrase = chrome.get("browserPhrase") or BROWSER_PHRASE.get(chrome.get("browser") or "", "")
    parts = [str(year)]
    if os_phrase:
        parts.append(os_phrase)
    if browser_phrase:
        parts.append(browser_phrase)
    if chrome.get("roomClause"):
        parts.append(chrome["roomClause"])
    return " · ".join(parts)


def text_buttons(chrome: dict) -> bool:
    """Win7 IE8/IE9 hide the GIF and must not request the file."""
    return chrome.get("os") == "win7" and chrome.get("browser") in ("ie8", "ie9")


def body_class(year: str, chrome: dict) -> str:
    """1994–1996 stay classless. 1997 and later are year + os + browser."""
    if int(year) <= 1996:
        return ""
    parts = ["year-" + year]
    if chrome.get("os"):
        parts.append("os-" + chrome["os"])
    if chrome.get("browser"):
        parts.append("browser-" + chrome["browser"])
    return " ".join(parts)


def load_years_js() -> dict:
    script = r"""
const fs = require("fs");
const vm = require("vm");
const src = fs.readFileSync(process.argv[1], "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const years = sandbox.ITT && sandbox.ITT.YearUI && sandbox.ITT.YearUI.YEARS;
if (!years) {
  console.error("years.js did not set ITT.YearUI.YEARS");
  process.exit(2);
}
const out = {};
for (const year of Object.keys(years)) {
  const spec = years[year];
  out[year] = {
    chrome: spec.chrome == null ? null : String(spec.chrome),
    toolbar: spec.toolbar,
    family: spec.family,
    location: spec.location,
    maximized: !!spec.maximized,
    hasTaskbar: !!spec.hasTaskbar,
    bodyClass: spec.bodyClass || "",
    yearLabel: spec.yearLabel || ""
  };
}
process.stdout.write(JSON.stringify(out));
"""
    proc = subprocess.run(
        ["node", "-e", script, str(YEARS_JS)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr or proc.stdout)
        raise SystemExit(proc.returncode or 1)
    return json.loads(proc.stdout)


def main() -> int:
    card = json.loads(CARD_PATH.read_text(encoding="utf-8"))["years"]
    specs = load_years_js()
    failures: list[str] = []

    for year, rec in sorted(card.items()):
        kind = rec.get("kind")
        chrome = rec.get("chrome")
        if kind == "absent":
            if "chrome" in rec:
                failures.append(f"{year}: absent year must not carry chrome")
            continue
        if kind not in ("html", "react"):
            failures.append(f"{year}: unexpected kind {kind!r}")
            continue
        if not isinstance(chrome, dict):
            failures.append(f"{year}: open year missing chrome object")
            continue
        for key in REQUIRED:
            if key not in chrome:
                failures.append(f"{year}: chrome.{key} missing")
        toolbar = chrome.get("toolbar")
        asset = chrome.get("assetYear")
        if toolbar in ("ie", "netscape"):
            if text_buttons(chrome):
                if asset is not None:
                    failures.append(f"{year}: Win7 text buttons must not request a GIF folder")
            elif not asset:
                failures.append(f"{year}: {toolbar} toolbar needs assetYear")
            else:
                gif = ROOT / "assets" / "period" / str(asset) / "chrome" / "btn-back.gif"
                if not gif.is_file():
                    failures.append(f"{year}: missing {gif.relative_to(ROOT)}")
        elif toolbar == "chrome22":
            if asset is not None:
                failures.append(f"{year}: chrome22 assetYear must be null")
        else:
            failures.append(f"{year}: unknown toolbar {toolbar!r}")

        if kind == "react":
            if year in specs:
                failures.append(f"{year}: react year must not have a years.js row")
            continue

        spec = specs.get(year)
        if not spec:
            failures.append(f"{year}: html year missing from years.js")
            continue
        expect_class = body_class(year, chrome)
        pairs = (
            ("toolbar", spec["toolbar"], toolbar),
            ("location", spec["location"], chrome.get("location")),
            ("maximized", spec["maximized"], bool(chrome.get("maximized"))),
            ("hasTaskbar", spec["hasTaskbar"], bool(chrome.get("hasTaskbar"))),
            ("assetYear", spec["chrome"], None if asset is None else str(asset)),
            ("bodyClass", spec["bodyClass"], expect_class),
            ("yearLabel", spec["yearLabel"], year_label(year, chrome)),
        )
        for label, got, want in pairs:
            if got != want:
                failures.append(f"{year} {label}: years.js {got!r} != card {want!r}")
        family = spec["family"]
        if toolbar == "ie" and family != "ie":
            failures.append(f"{year} family: {family!r} != ie")
        elif toolbar == "chrome22" and family != "chrome":
            failures.append(f"{year} family: {family!r} != chrome")
        elif toolbar == "netscape" and family not in ("netscape", "win95"):
            failures.append(f"{year} family: {family!r} is not a netscape shell")

    extra = sorted(set(specs) - {y for y, r in card.items() if r.get("kind") == "html"})
    for year in extra:
        failures.append(f"{year}: years.js row is not an html year on the card")

    if failures:
        print(f"year chrome: {len(failures)} mismatch(es)")
        for line in failures:
            print("  " + line)
        return 1
    print(f"year chrome: {sum(1 for r in card.values() if r.get('kind') in ('html', 'react'))} open years match")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
