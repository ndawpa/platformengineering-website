#!/usr/bin/env bash
set -euo pipefail
id -nG ana | tr ' ' '\n' | grep -qx platform
id -nG bruno | tr ' ' '\n' | grep -qx platform
test "$(stat -c %G /work/projeto)" = platform
test "$(stat -c %a /work/projeto)" = 2770
sudo_user_test=$(su -s /bin/bash ana -c 'test -r /work/projeto/config.txt && echo ok')
test "$sudo_user_test" = ok
echo 'Permissões, grupo e setgid validados.'
