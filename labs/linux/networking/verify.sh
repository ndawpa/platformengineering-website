#!/usr/bin/env bash
set -euo pipefail
getent hosts api.internal | grep -q 127.0.0.1
curl --fail --silent http://api.internal:8080 | grep -q 'serviço interno disponível'
ss -lnt | grep -q ':8080'
test -f /work/diagnostico.txt
grep -q 'api.internal' /work/diagnostico.txt
echo 'Resolução, socket e HTTP validados.'
