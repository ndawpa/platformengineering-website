#!/usr/bin/env bash
set -euo pipefail
test -L /work/source/current-config
test "$(readlink /work/source/current-config)" = config/environment
test /work/source/data.txt -ef /work/source/data.hardlink
tar -tzf /work/backup/source.tar.gz | grep -q 'source/config/environment'
echo 'Links e archive validados.'
