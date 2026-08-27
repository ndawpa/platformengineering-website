#!/usr/bin/env bash
set -euo pipefail
mkdir -p /work/www
echo 'serviço interno disponível' > /work/www/index.html
nohup python3 -m http.server 8080 --directory /work/www --bind 127.0.0.1 >/work/server.log 2>&1 &
echo $! > /work/server.pid
echo '127.0.0.1 api.internal' >> /etc/hosts
