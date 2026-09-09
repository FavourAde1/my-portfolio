#!/bin/sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$ROOT_DIR"

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/ >/dev/null 2>&1; then
  exit 0
fi

nohup npm run dev > /tmp/portfolio-startup.log 2>&1 &
