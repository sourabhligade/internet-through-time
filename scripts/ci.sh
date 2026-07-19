#!/usr/bin/env bash
# Local CI mirror — same gates as GitHub Actions (static + e2e).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Static: smoke (filesystem)"
python3 scripts/smoke-production.py

echo "==> Static: link audit"
python3 scripts/audit-internal-links.py

echo "==> Static: authenticity"
python3 scripts/test-authenticity.py

echo "==> Static: pipeline"
python3 scripts/test-pipeline.py

echo "==> Static: HTTP smoke (ephemeral server)"
python3 -m http.server 8080 --bind 127.0.0.1 >/tmp/itt-ci-http.log 2>&1 &
SERVER_PID=$!
cleanup() { kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT
for i in $(seq 1 20); do
  if curl -sf -o /dev/null http://127.0.0.1:8080/; then
    break
  fi
  sleep 0.25
done
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
cleanup
trap - EXIT

echo "==> E2E: Playwright"
if [[ ! -d node_modules/@playwright/test ]]; then
  npm ci
  npx playwright install chromium
fi
# Playwright starts its own webServer when BASE_URL is unset
unset BASE_URL || true
export CI="${CI:-1}"
npx playwright test

echo "==> CI OK"
