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

echo "🗄️  Gerando Prisma Client..."
npx prisma generate

echo "🗄️  Rodando migrations..."
npx prisma migrate deploy

echo "🌱 Rodando seed..."
npx prisma db seed

echo "✅ Pronto! Rode: yarn start"
