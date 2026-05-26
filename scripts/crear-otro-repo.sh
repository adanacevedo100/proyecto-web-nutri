#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Uso: $0 <url-del-nuevo-repo> <rama-principal-opcional>"
  echo "Ejemplo: $0 git@github.com:usuario/proyecto-web-nutri-v2.git main"
  exit 1
fi

NUEVA_URL="$1"
RAMA_PRINCIPAL="${2:-main}"

# Asegurar que estamos en un repositorio git.
git rev-parse --is-inside-work-tree >/dev/null 2>&1

# Guardar rama actual para restaurar luego.
RAMA_ACTUAL="$(git rev-parse --abbrev-ref HEAD)"

# Quitar remote previo y agregar el nuevo.
if git remote get-url origin >/dev/null 2>&1; then
  git remote remove origin
fi

git remote add origin "$NUEVA_URL"

git branch -M "$RAMA_PRINCIPAL"
git push -u origin "$RAMA_PRINCIPAL"

echo "✅ Nuevo repositorio configurado y publicado en: $NUEVA_URL"
echo "Rama publicada: $RAMA_PRINCIPAL"
echo "Si lo necesitas, tu rama local anterior era: $RAMA_ACTUAL"
