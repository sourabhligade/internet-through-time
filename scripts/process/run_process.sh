#!/usr/bin/env bash
# Safe museum process gate — must not modify content unless env PROCESS_STAMP=1
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo "== 1. check-all-years =="
python3 scripts/check-all-years.py

echo "== 2. urlMap path integrity =="
python3 scripts/process/check_urlmap.py

echo "== 3. boot/registry integrity =="
python3 scripts/process/check_boot_registry.py

echo "== 4. residual coverage scan (report only) =="
python3 scripts/process/scan_residual.py

if [[ "${PROCESS_STAMP:-}" == "1" ]]; then
  echo "== 4b. residual stamp known (opt-in) =="
  python3 scripts/process/scan_residual.py --stamp-known
fi

echo "== 5. node syntax immersion core =="
node --check js/immersion/boot.js
node --check js/immersion/registry.js
node --check js/immersion/residual-placard.js
node --check js/immersion/year-2017-extras.js
node --check e2e/helpers.js

echo "== 6. e2e 2017 pack =="
npm run test:e2e:2017

echo "PROCESS OK"
