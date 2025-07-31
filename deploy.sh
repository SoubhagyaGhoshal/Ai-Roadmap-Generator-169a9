#!/bin/bash

echo "🚀 AI Roadmap Generator Deployment Script"
echo "========================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized"
fi

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote repository set."
    echo "Please create a GitHub repository and run:"
    echo "git remote add origin YOUR_REPOSITORY_URL"
    echo "git push -u origin main"
    echo ""
    echo "Then you can deploy to:"
    echo "1. Vercel (Recommended): https://vercel.com"
    echo "2. Railway: https://railway.app"
    echo "3. Netlify: https://netlify.com"
    echo ""
    echo "📋 Required Environment Variables:"
    echo "DATABASE_URL=your_production_database_url"
    echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key"
    echo "CLERK_SECRET_KEY=your_clerk_secret"
    echo "OPENAI_API_KEY=your_openai_key (optional)"
    echo "GEMINI_API_KEY=your_gemini_key (optional)"
    echo "GROQ_API_KEY=your_groq_key (optional)"
    echo "COHERE_API_KEY=your_cohere_key (optional)"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "✅ Git remote is configured"
    echo "🌐 Current remote: $(git remote get-url origin)"
    echo ""
    echo "Ready to deploy! Choose your platform:"
    echo "1. Vercel (Recommended): https://vercel.com"
    echo "2. Railway: https://railway.app"
    echo "3. Netlify: https://netlify.com"
fi

echo ""
echo "🎯 Quick Deploy Commands:"
echo "vercel --prod    # Deploy to Vercel"
echo "railway up       # Deploy to Railway"
echo ""
echo "📚 Full guide: DEPLOYMENT.md" 