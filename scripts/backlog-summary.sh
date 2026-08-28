#!/usr/bin/env bash
# Resumen del backlog al inicio de sesión. Fail-open: nunca bloquea.
set +e
DIR="$(cd "$(dirname "$0")/.." && pwd)/backlog"
[ -d "$DIR" ] || exit 0
count=$(ls "$DIR"/B-*.md 2>/dev/null | wc -l | tr -d ' ')
[ "$count" -eq 0 ] && exit 0
echo "📋 Backlog: $count items activos"
for f in "$DIR"/B-*.md; do
  id=$(sed -n 's/^id: //p' "$f" | head -1)
  st=$(sed -n 's/^status: //p' "$f" | head -1)
  ti=$(sed -n 's/^title: //p' "$f" | head -1 | tr -d '"')
  pr=$(sed -n 's/^priority: //p' "$f" | head -1)
  echo "  $id [$st/$pr] $ti"
done | sort | head -15
exit 0
