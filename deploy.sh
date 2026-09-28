#!/bin/bash

# Inalabs Indonesia - Hostinger VPS Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment on Hostinger VPS..."

# 1. Pull latest code (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest git commits..."
    git pull origin main
fi

# 2. Install dependencies
echo "📦 Installing npm dependencies..."
npm install --production=false

# 3. Build Next.js application
echo "🔨 Building production bundle..."
npm run build

# 4. Restart PM2 process
echo "🔄 Reloading PM2 process..."
if pm2 describe inalabs-web > /dev/null 2>&1; then
    pm2 reload ecosystem.config.js
else
    pm2 start ecosystem.config.js
fi

# 5. Save PM2 state
pm2 save

echo "✅ Deployment completed successfully!"
