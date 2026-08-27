#!/usr/bin/env bash
set -euo pipefail
cat > /work/access.log <<'EOF'
10.0.0.1 GET /health 200 12
10.0.0.2 GET /api/orders 500 842
10.0.0.3 POST /api/orders 201 120
10.0.0.2 GET /api/orders 500 901
10.0.0.4 GET /missing 404 32
EOF
