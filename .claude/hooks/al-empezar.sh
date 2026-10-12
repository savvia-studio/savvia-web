#!/bin/bash
# Al empezar cada sesión de Claude Code: baja lo último de GitHub y avisa de lo pendiente de subir.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0

msg=""
if git fetch --quiet origin 2>/dev/null; then
  antes=$(git rev-parse HEAD)
  if salida=$(git pull --ff-only --autostash --quiet origin main 2>&1); then
    despues=$(git rev-parse HEAD)
    if [ "$antes" != "$despues" ]; then
      n=$(git rev-list --count "$antes..$despues")
      msg="git pull: bajados $n commits nuevos de GitHub."
    else
      msg="git pull: ya estabas al día con GitHub."
    fi
  else
    msg="git pull NO se pudo hacer (hay cambios que chocan o las ramas se han separado). Revisarlo antes de trabajar: $salida"
  fi
else
  msg="git pull: sin conexión con GitHub, se trabaja con la copia local."
fi

sinsubir=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)
cambios=$(git status --porcelain | wc -l | tr -d ' ')
[ "$sinsubir" != "0" ] && msg="$msg Hay $sinsubir commits locales sin subir a GitHub."
[ "$cambios" != "0" ] && msg="$msg Hay $cambios archivos con cambios sin commit."

jq -n --arg m "$msg" '{systemMessage: $m, hookSpecificOutput: {hookEventName: "SessionStart", additionalContext: $m}}'
