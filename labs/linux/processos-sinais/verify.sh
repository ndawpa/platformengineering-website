#!/usr/bin/env bash
set -euo pipefail
worker=$(cat /work/worker.pid)
survivor=$(cat /work/survivor.pid)
if kill -0 "$worker" 2>/dev/null; then echo 'O worker ainda está executando.'; exit 1; fi
kill -0 "$survivor"
test -s /work/worker.log
echo 'Processo correto encerrado; processo não relacionado preservado.'
