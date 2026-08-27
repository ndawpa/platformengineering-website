#!/usr/bin/env bash
set -euo pipefail
mkdir -p /work/services
printf 'healthy\n' > /work/services/api
printf 'unhealthy\n' > /work/services/worker
printf 'healthy\n' > /work/services/frontend
