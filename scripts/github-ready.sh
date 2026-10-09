#!/usr/bin/env bash
# Local safety checks. Does not create remotes.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
fail=0

say() { printf '%s\n' "$*"; }
ok() { printf '  OK  %s\n' "$*"; }
bad() { printf '  FAIL  %s\n' "$*"; fail=1; }

say "==> GitHub readiness preflight"
say "    root: $ROOT"
say ""

# --- git basics ---
say "-- git --"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  bad "not a git repository"
else
  ok "git repository"
fi

branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
say "  branch: $branch"
if [[ "$branch" != "main" && "$branch" != "master" && "$branch" != museum/* ]]; then
  say "  note: CI triggers on main / master / museum/*"
else
  ok "branch $branch is a CI trigger"
fi

if git remote get-url origin >/dev/null 2>&1; then
  ok "remote origin = $(git remote get-url origin)"
else
  say "  (no origin yet — expected before first create)"
fi

dirty="$(git status --porcelain | wc -l | tr -d ' ')"
say "  working tree changes: $dirty"
if [[ "$dirty" != "0" ]]; then
  say "  note: working tree has uncommitted changes"
fi

# --- must not publish ---
say ""
say "-- publish safety --"
if [[ -f .gitignore ]]; then
  ok ".gitignore present"
else
  bad "missing .gitignore"
fi

# secret-ish patterns in tracked + untracked (exclude node_modules/.git)
if git grep -I -n -E 'ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|BEGIN (RSA |OPENSSH )?PRIVATE KEY' -- . ':(exclude)node_modules' 2>/dev/null | head -5 | grep -q .; then
  bad "possible secrets in git-tracked files (see git grep output)"
else
  ok "no obvious API tokens / private keys in tracked content"
fi

for f in .env .env.local credentials.json; do
  if [[ -f "$f" ]]; then
    if git check-ignore -q "$f" 2>/dev/null || ! git ls-files --error-unmatch "$f" >/dev/null 2>&1; then
      ok "$f exists but is not tracked"
    else
      bad "$f is tracked — remove it from git"
    fi
  fi
done

# --- required project files ---
say ""
say "-- project files --"
for f in README.md LICENSE package.json package-lock.json .github/workflows/ci.yml netlify.toml vercel.json playwright.config.js .gitignore .gitattributes robots.txt sitemap.txt index.html; do
  if [[ -f "$f" ]]; then ok "$f"; else bad "missing $f"; fi
done
# Hub-open years on disk. Keep in sync with scripts/itt_gate.py.
# Absent years must have no index. Boarded years must redirect. Open years must have an index.
eval "$(python3 -c 'import sys; sys.path.insert(0,"scripts"); from itt_gate import _BOARDED, _WIPED, _YEARS
print("BOARDED=\"" + " ".join(sorted(_BOARDED)) + "\"")
print("WIPED=\"" + " ".join(sorted(_WIPED)) + "\"")
print("REACT=\"" + " ".join(sorted(y for y, r in _YEARS.items() if r.get("kind") == "react")) + "\"")')"
for y in $(seq 1994 2025); do
  if [[ " $WIPED " == *" $y "* ]]; then
    if [[ -f "years/$y/index.html" ]]; then bad "wiped years/$y still on disk"; else ok "years/$y wiped"; fi
    continue
  fi
  if [[ " $BOARDED " == *" $y "* ]]; then
    if [[ ! -f "years/$y/index.html" ]]; then bad "boarded years/$y missing index"; continue; fi
    if grep -q 'boarded\|location.replace' "years/$y/index.html"; then
      ok "years/$y boarded (redirect)"
    else
      bad "years/$y index does not redirect"
    fi
    continue
  fi
  if [[ " $REACT " == *" $y "* ]]; then
    if [[ -f "years/$y/index.html" ]]; then bad "react years/$y must have no HTML tree"; else ok "years/$y react door (no HTML tree)"; fi
    if [[ -f "app/index.html" ]]; then ok "app/index.html react hall"; else bad "missing app/index.html"; fi
    continue
  fi
  if [[ -f "years/$y/index.html" ]]; then ok "years/$y/index.html"; else bad "missing years/$y"; fi
done

# --- static gates (fast) ---
say ""
say "-- static gates (same as CI static job, no e2e) --"
python3 scripts/smoke-production.py
python3 scripts/audit-internal-links.py
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py
python3 scripts/check-5x-contract.py
node scripts/audit-mock-flows.js
python3 scripts/check-all-years.py

# --- gh tooling ---
say ""
say "-- GitHub CLI --"
if command -v gh >/dev/null 2>&1; then
  ok "gh installed ($(gh --version | head -1))"
  if gh auth status >/dev/null 2>&1; then
    ok "gh authenticated"
    gh auth status 2>&1 | sed 's/^/    /' | head -8
  else
    say "  gh not authenticated — run:  gh auth login"
  fi
else
  bad "gh not installed (brew install gh)"
fi

say ""
if [[ "$fail" -ne 0 ]]; then
  say "PREFLIGHT FAILED — fix the items above."
  exit 1
fi

say "PREFLIGHT PASSED"
exit 0
