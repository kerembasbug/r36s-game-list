#!/bin/sh
# Start script for Coolify deployment
# This ensures PORT is properly set for standalone mode

export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-0.0.0.0}
export NODE_ENV=${NODE_ENV:-production}

echo "Starting Next.js standalone server on $HOSTNAME:$PORT"
echo "PORT=$PORT HOSTNAME=$HOSTNAME NODE_ENV=$NODE_ENV"
echo "Current directory: $(pwd)"
echo "Listing .next directory:"
ls -la .next/ 2>/dev/null || echo ".next directory not found"

# Ensure games.json exists in standalone directory if needed
if [ -f "src/data/games.json" ] && [ -d ".next/standalone" ]; then
  mkdir -p .next/standalone/src/data
  cp src/data/games.json .next/standalone/src/data/games.json 2>/dev/null || true
  echo "✓ Copied games.json to standalone directory"
fi

# Copy static files to standalone directory (required for standalone mode)
# In standalone mode, static files must be at .next/standalone/.next/static
if [ -d ".next/standalone" ]; then
  # Copy .next/static to standalone/.next/static
  if [ -d ".next/static" ]; then
    mkdir -p .next/standalone/.next
    # Remove old static directory if exists to avoid conflicts
    rm -rf .next/standalone/.next/static 2>/dev/null || true
    # Copy with preserve attributes
    cp -r .next/static .next/standalone/.next/static 2>/dev/null || true
    echo "✓ Copied .next/static to standalone/.next/static"
    echo "  Static files count: $(find .next/standalone/.next/static -type f 2>/dev/null | wc -l || echo 0)"
  else
    echo "⚠ Warning: .next/static directory not found!"
  fi
  
  # Copy public folder if exists
  if [ -d "public" ]; then
    cp -r public .next/standalone/public 2>/dev/null || true
    echo "✓ Copied public folder to standalone directory"
  fi
  
  # Verify static files are in place
  if [ -d ".next/standalone/.next/static" ]; then
    echo "✓ Verified: .next/standalone/.next/static exists"
    ls -la .next/standalone/.next/static/chunks/ 2>/dev/null | head -5 || echo "  No chunks directory found"
  else
    echo "⚠ Error: .next/standalone/.next/static does not exist!"
  fi
fi

# Try standalone first, fallback to next start
if [ -f ".next/standalone/server.js" ]; then
  echo "Using standalone server..."
  cd .next/standalone || cd /app/.next/standalone || cd /app
  echo "Changed to directory: $(pwd)"
  echo "Listing current directory:"
  ls -la | head -10
  PORT=$PORT HOSTNAME=$HOSTNAME node server.js
else
  echo "Standalone server not found, using next start..."
  PORT=$PORT HOSTNAME=$HOSTNAME npx next start -p $PORT -H $HOSTNAME
fi

