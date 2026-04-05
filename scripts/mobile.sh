#!/bin/bash
set -e

MOBILE_DIR="$(cd "$(dirname "$0")/../app-mobile" && pwd)"
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
  cd "$MOBILE_DIR"
  yarn install

  echo "📱 [prepare] Instalando pods iOS..."
  if [ -d "ios" ]; then
    cd ios
    if command -v bundle &>/dev/null; then
      bundle install
      bundle exec pod install
    elif command -v pod &>/dev/null; then
      pod install
    else
      echo "⚠️  CocoaPods não encontrado. Pulando pod install."
    fi
    cd ..
  fi

  echo "✅ [prepare] Pronto! Rode: yarn mobile:android ou yarn mobile:ios"
}

cmd_clean() {
  echo "🧹 [clean] Limpando caches e builds..."
  cd "$MOBILE_DIR"

  rm -rf node_modules
  rm -f yarn.lock
  rm -rf ios/Pods ios/build ios/DerivedData
  rm -rf android/.gradle android/app/build android/build
  rm -rf /tmp/metro-*
  rm -rf /tmp/haste-map-*

  # Limpa cache do watchman se disponível
  command -v watchman &>/dev/null && watchman watch-del-all 2>/dev/null || true

  echo "✅ [clean] Tudo limpo."
}

cmd_start() {
  cd "$MOBILE_DIR"
  yarn start
}

cmd_android() {
  cd "$MOBILE_DIR"
  yarn android
}

cmd_ios() {
  cd "$MOBILE_DIR"
  yarn ios
}

# ─── Entrypoint ──────────────────────────────────────────────
ensure_node

case "${1:-prepare}" in
  prepare)  cmd_prepare ;;
  clean)    cmd_clean ;;
  rebuild)  cmd_clean && cmd_prepare ;;
  start)    cmd_start ;;
  android)  cmd_android ;;
  ios)      cmd_ios ;;
  *)        echo "Uso: $0 {prepare|clean|rebuild|start|android|ios}" && exit 1 ;;
esac
