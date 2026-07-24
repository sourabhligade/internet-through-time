#!/usr/bin/env bash
# Preflight before first GitHub push. Does not create remotes or push.
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
if [[ "$branch" != "main" && "$branch" != "master" ]]; then
  say "  note: CI triggers on main/master — consider renaming before push"
fi

if git remote get-url origin >/dev/null 2>&1; then
  ok "remote origin = $(git remote get-url origin)"
else
  say "  (no origin yet — expected before first create)"
fi

dirty="$(git status --porcelain | wc -l | tr -d ' ')"
say "  working tree changes: $dirty"
if [[ "$dirty" != "0" ]]; then
  say "  note: commit (or stash) before push so CI runs on the full museum"
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
      bad "$f is tracked — remove from git before push"
    fi
  fi
done

# --- required project files ---
say ""
say "-- project files --"
for f in README.md LICENSE package.json package-lock.json .github/workflows/ci.yml netlify.toml vercel.json playwright.config.js .gitignore .gitattributes robots.txt sitemap.txt index.html; do
  if [[ -f "$f" ]]; then ok "$f"; else bad "missing $f"; fi
done
for y in 1994 1995 1996 1997 1998 1999 2000 2001 2002 2003 2004 2005; do
  if [[ -f "years/$y/index.html" ]]; then ok "years/$y/index.html"; else bad "missing years/$y"; fi
done

# --- static gates (fast) ---
say ""
say "-- static gates (same as CI static job, no e2e) --"
python3 scripts/smoke-production.py
python3 scripts/audit-internal-links.py
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py

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
  say "PREFLIGHT FAILED — fix items above before creating the repo."
  exit 1
fi

say "PREFLIGHT PASSED"
say ""
say "Next steps (run yourself — creates a public remote):"
say ""
say "  1) Commit the museum work on main (review git status first)."
say "  2) gh auth login          # if not already"
say "  3) gh repo create internet-through-time --public --source=. --remote=origin --push"
say "     # or private:  --private"
say "  4) Open Actions tab and confirm CI green."
say "  5) Production host (pick one):"
say "       • Netlify:  connect repo → publish directory '.'  (netlify.toml)"
say "       • Vercel:   import repo → framework Other / static (vercel.json)"
say "       • GitHub Pages: Settings → Pages → GitHub Actions, or serve root via static host"
say ""
say "Suggested commit title if bundling current work:"
say "  Ship 1994–2005 museum: content densify, live flows, pixel harvests, prod ready"
exit 0
