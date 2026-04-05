#!/bin/bash

REQUIRED_MAJOR=22

CURRENT=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1)

if [ "$CURRENT" != "$REQUIRED_MAJOR" ]; then
  echo "⚠️  Node $CURRENT detectado. PlateGuard requer Node $REQUIRED_MAJOR."

  if [ -f "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    . "$NVM_DIR/nvm.sh"

    if nvm ls "$REQUIRED_MAJOR" &>/dev/null; then
      echo "→ Trocando para Node $REQUIRED_MAJOR via nvm..."
      nvm use "$REQUIRED_MAJOR"
    else
      echo "→ Instalando Node $REQUIRED_MAJOR via nvm..."
      nvm install "$REQUIRED_MAJOR"
      nvm use "$REQUIRED_MAJOR"
    fi
  else
    echo "❌ nvm não encontrado. Instale Node $REQUIRED_MAJOR manualmente."
    exit 1
  fi
fi

exec "$@"
