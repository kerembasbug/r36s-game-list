#!/bin/sh
# Start script for Coolify deployment
# This ensures PORT is properly set for standalone mode

export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

echo "Starting Next.js standalone server on $HOSTNAME:$PORT"
echo "PORT=$PORT HOSTNAME=$HOSTNAME NODE_ENV=$NODE_ENV"
echo "Current directory: $(pwd)"
echo "Files in .next/standalone:"
ls -la .next/standalone/ 2>/dev/null || echo ".next/standalone not found"

# Ensure games.json exists in standalone directory if needed
if [ -f "src/data/games.json" ] && [ -d ".next/standalone" ]; then
  mkdir -p .next/standalone/src/data
  cp src/data/games.json .next/standalone/src/data/games.json 2>/dev/null || true
  echo "Copied games.json to standalone directory"
fi

# Try standalone first, fallback to next start
if [ -f ".next/standalone/server.js" ]; then
  echo "Using standalone server..."
  cd .next/standalone || cd /app/.next/standalone || cd /app
  PORT=$PORT HOSTNAME=$HOSTNAME node server.js
else
  echo "Standalone server not found, using next start..."
  PORT=$PORT HOSTNAME=$HOSTNAME npx next start -p $PORT -H $HOSTNAME
fi

