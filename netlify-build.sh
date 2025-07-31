#!/bin/bash

# Netlify build script for AI Roadmap Generator

echo "🚀 Starting Netlify build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!" 