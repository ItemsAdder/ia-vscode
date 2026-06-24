#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${1:-publish}"

case "$MODE" in
  dry-run|package|publish)
    ;;
  *)
    echo "Usage: scripts/publish-vscode.sh [dry-run|package|publish]"
    exit 2
    ;;
esac

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found."
  exit 1
fi

if [ ! -d node_modules ]; then
  npm install
fi

npm run compile
npm run lint
npm test

case "$MODE" in
  dry-run)
    npx vsce package --no-dependencies
    ;;
  package)
    npx vsce package
    ;;
  publish)
    if [ -n "${VSCE_PAT:-}" ]; then
      npx vsce publish --pat "$VSCE_PAT"
    else
      npx vsce publish
    fi
    ;;
esac
