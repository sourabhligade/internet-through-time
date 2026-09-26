#!/usr/bin/env python3
"""Fast check of every year trail. No browser. React years 2017, 2019–2021 have no HTML."""
import os
import re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REACT_YEARS = {"2014", "2017", "2019", "2020", "2021"}


def react_keys():
    found = defaultdict(set)
    for year in ("2014", "2017", "2019", "2020", "2021"):
        path = os.path.join(ROOT, "react", "src", "year%s.js" % year)
        text = open(path, encoding="utf-8").read()
        for key in re.findall(r'"(itt\d{2}-[^"]+)"', text):
            found[year].add(key)
    return found


def trail_stops():
    text = open(os.path.join(ROOT, "js", "config", "flow-trails.js"), encoding="utf-8").read()
    years = list(re.finditer(r'\n    "(\d{4})": \[', text))
    stops = []
    for i, match in enumerate(years):
        year = match.group(1)
        end = years[i + 1].start() if i + 1 < len(years) else text.find("\n  };", match.end())
        block = text[match.end() : end]
        for row in re.finditer(
            r'\{"n":\s*(\d+),\s*"name":\s*"([^"]*)",\s*"href":\s*"([^"]+)",\s*"match":\s*"[^"]*",\s*"whenKey":\s*"([^"]+)"',
            block,
        ):
            stops.append(
                {
                    "year": year,
                    "n": int(row.group(1)),
                    "name": row.group(2),
                    "href": row.group(3),
                    "whenKey": row.group(4),
                }
            )
    return stops


def main():
    keys = react_keys()
    stops = trail_stops()
    by_year = defaultdict(list)
    missing = []
    for stop in stops:
        by_year[stop["year"]].append(stop)
        path = os.path.join(ROOT, "years", stop["year"], stop["href"])
        on_disk = os.path.isfile(path)
        on_react = stop["whenKey"] in keys.get(stop["year"], ())
        if on_disk or on_react:
            continue
        missing.append(stop)

    print("years %d  stops %d  missing %d" % (len(by_year), len(stops), len(missing)))
    for year in sorted(by_year):
        rows = by_year[year]
        disk = sum(1 for s in rows if os.path.isfile(os.path.join(ROOT, "years", year, s["href"])))
        react = sum(1 for s in rows if s["whenKey"] in keys.get(year, ()))
        ns = [s["n"] for s in rows]
        gap = [i for i in range(1, max(ns) + 1) if i not in ns]
        print(
            "%s  stops %3d  on disk %3d  on react %3d  n %d-%d  gaps %s"
            % (year, len(rows), disk, react, min(ns), max(ns), ",".join(map(str, gap)) or "-")
        )
    if missing:
        print("MISSING")
        for stop in missing:
            print("  %s n=%s %s %s" % (stop["year"], stop["n"], stop["whenKey"], stop["href"]))
        raise SystemExit(1)
    # React doors must cover every trail key for the years whose HTML was removed.
    for year in ("2017", "2019", "2020", "2021"):
        trail = {s["whenKey"] for s in by_year[year]}
        absent = sorted(trail - keys[year])
        if absent:
            print(year, "trail keys not in React", absent)
            raise SystemExit(1)
        print("%s react keys %d  trail covered" % (year, len(keys[year])))


if __name__ == "__main__":
    main()
