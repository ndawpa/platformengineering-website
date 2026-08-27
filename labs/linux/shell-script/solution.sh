#!/usr/bin/env bash
set -euo pipefail
directory=${1:?uso: check-services.sh DIRETORIO}
failed=0
for service in "$directory"/*; do
  if [[ $(<"$service") != healthy ]]; then
    basename "$service" >&2
    failed=1
  fi
done
exit "$failed"
