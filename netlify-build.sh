#!/bin/bash

# Netlify build script for AI Roadmap Generator

echo "🚀 Starting Netlify build..."

# Check if pnpm is available, if not install it
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm prisma generate

# Build the application
echo "🏗️ Building application..."
pnpm run build

echo "✅ Build completed successfully!" 