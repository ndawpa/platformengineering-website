#!/usr/bin/env bash
set -euo pipefail
test -x /work/check-services.sh
set +e
output=$(/work/check-services.sh /work/services 2>&1)
status=$?
set -e
test "$status" -eq 1
grep -q 'worker' <<< "$output"
cp /work/services/worker /work/services/worker.bak
echo healthy > /work/services/worker
/work/check-services.sh /work/services >/dev/null
echo 'Script, argumentos e exit codes validados.'
