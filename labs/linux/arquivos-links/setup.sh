#!/usr/bin/env bash
set -euo pipefail
mkdir -p /work/source/config /work/backup
echo production > /work/source/config/environment
echo important > /work/source/data.txt
