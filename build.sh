#!/bin/bash

echo "🚀 Starting build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!" 