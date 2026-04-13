#!/bin/sh
set -eu

mkdir -p /app/data

if [ -n "${DATABASE_URL:-}" ]; then
  case "$DATABASE_URL" in
    file:*)
      DB_PATH="${DATABASE_URL#file:}"
      DB_DIR="$(dirname "$DB_PATH")"
      mkdir -p "$DB_DIR"
      ;;
  esac
fi

npx prisma migrate deploy
exec npm run start
