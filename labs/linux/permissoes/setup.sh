#!/usr/bin/env bash
set -euo pipefail
groupadd platform
useradd -m ana
useradd -m bruno
mkdir -p /work/projeto
printf 'configuração interna\n' > /work/projeto/config.txt
chown -R root:root /work/projeto
chmod 700 /work/projeto
