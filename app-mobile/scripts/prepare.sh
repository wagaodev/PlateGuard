#!/bin/bash
set -e

REQUIRED_MAJOR=22
CURRENT=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)

if [ "$CURRENT" != "$REQUIRED_MAJOR" ]; then
  if [ -f "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    . "$NVM_DIR/nvm.sh"
    nvm use "$REQUIRED_MAJOR" 2>/dev/null || nvm install "$REQUIRED_MAJOR"
  else
    echo "❌ nvm não encontrado. Instale Node $REQUIRED_MAJOR."
    exit 1
  fi
fi

DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$DIR"

echo "📦 Instalando dependências..."
yarn install

echo "📱 Instalando pods iOS..."
cd ios
if command -v bundle &>/dev/null; then
  bundle install
  bundle exec pod install
elif command -v pod &>/dev/null; then
  pod install
else
  echo "⚠️  CocoaPods não encontrado. Pulando pod install."
fi

echo "✅ Pronto! Rode: yarn start, yarn android ou yarn ios"
