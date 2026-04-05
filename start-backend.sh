#!/bin/bash

# Garante Node 22 antes de rodar qualquer comando no app-backend
REQUIRED_MAJOR=22
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
    echo "❌ nvm não encontrado. Rode: nvm use 22"
    exit 1
  fi
fi

cd app-backend && yarn "${@:-start}"
