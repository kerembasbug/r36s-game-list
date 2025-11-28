#!/bin/sh
# Start script for Coolify deployment
# This ensures PORT is properly set for standalone mode

export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

echo "Starting Next.js standalone server on $HOSTNAME:$PORT"
node .next/standalone/server.js

