#!/bin/bash
set -e

BACKEND_DIR="$(cd "$(dirname "$0")/../app-backend" && pwd)"
REQUIRED_MAJOR=22

# ─── Garante Node 22 ────────────────────────────────────────
ensure_node() {
  CURRENT=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)
  if [ "$CURRENT" != "$REQUIRED_MAJOR" ]; then
    if [ -f "$HOME/.nvm/nvm.sh" ]; then
      export NVM_DIR="$HOME/.nvm"
      . "$NVM_DIR/nvm.sh"
      if nvm ls "$REQUIRED_MAJOR" &>/dev/null; then
        nvm use "$REQUIRED_MAJOR"
      else
        echo "→ Instalando Node $REQUIRED_MAJOR..."
        nvm install "$REQUIRED_MAJOR"
        nvm use "$REQUIRED_MAJOR"
      fi
    else
      echo "❌ nvm não encontrado. Instale Node $REQUIRED_MAJOR."
      exit 1
    fi
  fi
}

# ─── Comandos ────────────────────────────────────────────────
cmd_prepare() {
  echo "📦 [prepare] Instalando dependências..."
  cd "$BACKEND_DIR"
  yarn install

  echo "🗄️  [prepare] Gerando Prisma Client..."
  npx prisma generate

  echo "🗄️  [prepare] Rodando migrations..."
  npx prisma migrate deploy

  echo "🌱 [prepare] Rodando seed..."
  npx prisma db seed

  echo "✅ [prepare] Pronto! Rode: yarn backend:start"
}

cmd_clean() {
  echo "🧹 [clean] Limpando caches e builds..."
  cd "$BACKEND_DIR"

  rm -rf node_modules
  rm -f yarn.lock
  rm -rf dist

  echo "✅ [clean] Tudo limpo."
}

cmd_start() {
  cd "$BACKEND_DIR"
  yarn start
}

# ─── Entrypoint ──────────────────────────────────────────────
ensure_node

case "${1:-prepare}" in
  prepare)  cmd_prepare ;;
  clean)    cmd_clean ;;
  rebuild)  cmd_clean && cmd_prepare ;;
  start)    cmd_start ;;
  *)        echo "Uso: $0 {prepare|clean|rebuild|start}" && exit 1 ;;
esac
