#!/bin/sh
set -eu

mkdir -p /app/data

if [ -n "${DATABASE_URL:-}" ]; then
  case "$DATABASE_URL" in
    file:*)
      DB_PATH="${DATABASE_URL#file:}"
      DB_PATH="${DB_PATH%%\?*}"
      DB_DIR="$(dirname "$DB_PATH")"
      mkdir -p "$DB_DIR"
      if [ ! -f "$DB_PATH" ] && [ -f "/app/prisma/dev.db" ]; then
        cp /app/prisma/dev.db "$DB_PATH"
      fi
      ;;
  esac
fi

exec npm run start
