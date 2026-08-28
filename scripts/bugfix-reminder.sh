#!/usr/bin/env bash
# PostToolUse: si el último commit menciona fix/bug, recordar el postmortem. Fail-open.
set +e
input=$(cat | tr '\n' ' ')
echo "$input" | grep -q '"command":.*git commit' || exit 0
echo "$input" | grep -qiE 'fix|bug' || exit 0
echo "🩹 Commit de fix detectado: si fue un bug real, creá el postmortem en ai_docs/bugfixes/ (skill bugfix-postmortem)."
exit 0
