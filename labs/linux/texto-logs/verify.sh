#!/usr/bin/env bash
set -euo pipefail
test -f /work/report.txt
grep -qx '500 2' /work/report.txt
grep -qx '404 1' /work/report.txt
echo 'Relatório de erros validado.'
