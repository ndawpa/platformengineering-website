#!/usr/bin/env bash
set -euo pipefail
nohup bash -c 'while true; do date >> /work/worker.log; sleep 2; done' >/dev/null 2>&1 &
echo $! > /work/worker.pid
nohup sleep 3600 >/dev/null 2>&1 &
echo $! > /work/survivor.pid
