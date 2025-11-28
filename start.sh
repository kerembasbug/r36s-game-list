#!/bin/sh
# Start script for Coolify deployment
# This ensures PORT is properly set for standalone mode

export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

echo "Starting Next.js standalone server on $HOSTNAME:$PORT"
echo "PORT=$PORT HOSTNAME=$HOSTNAME NODE_ENV=$NODE_ENV"

# Try standalone first, fallback to next start
if [ -f ".next/standalone/server.js" ]; then
  echo "Using standalone server..."
  PORT=$PORT HOSTNAME=$HOSTNAME node .next/standalone/server.js
else
  echo "Standalone server not found, using next start..."
  PORT=$PORT HOSTNAME=$HOSTNAME npx next start -p $PORT -H $HOSTNAME
fi

