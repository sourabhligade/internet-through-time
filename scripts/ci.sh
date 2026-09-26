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

echo "==> Static: 5× leftover contract"
python3 scripts/check-5x-contract.py

echo "==> Static: mock-flow classifier"
node scripts/audit-mock-flows.js

echo "==> Static: all-years health matrix"
python3 scripts/check-all-years.py

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
echo "==> E2E: OSS visitor gate"
node scripts/oss-visitor-gate.mjs
echo "==> E2E: dest-true I/O only (empty never writes · leftover never writes the star)"
npx playwright test \
  e2e/hub-years.spec.js \
  e2e/year-start-trails.spec.js \
  e2e/visitor-door.spec.js \
  e2e/flow-check-pipeline.spec.js \
  e2e/one-thing-per-year.spec.js \
  e2e/all-years-official-10-real.spec.js \
  e2e/leftover-3x-unique.spec.js \
  e2e/leftover-2x-unique-links.spec.js \
  e2e/leftover-3x-unique-links.spec.js \
  e2e/official-leftover-2x.spec.js \
  e2e/lean-triple-leftover.spec.js \
  e2e/year-true-packs.spec.js \
  e2e/2016-2018-3x-detail.spec.js \
  e2e/2017-mvp.spec.js \
  e2e/2019-mvp.spec.js \
  e2e/2020-mvp.spec.js \
  e2e/2021-mvp.spec.js \
  e2e/2022-mvp.spec.js \
  e2e/2022-flows.spec.js \
  --workers=2

echo "==> CI OK"
