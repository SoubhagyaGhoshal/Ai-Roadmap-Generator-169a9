# AI Roadmap Generator

A modern web application that generates personalized learning roadmaps using AI. Built with Next.js, React, and Prisma.

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd ai-roadmap-generator-main
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Set up database:**
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```

## 🔧 Recent Fixes

The following issues have been resolved:

- ✅ **Webpack compilation errors** - Fixed hardcoded IDs in Marquee component
- ✅ **Middleware configuration** - Properly configured Clerk authentication
- ✅ **Database connectivity** - Improved error handling for database operations
- ✅ **API route improvements** - Better error handling for AI API calls
- ✅ **Component stability** - Fixed undefined property access in components

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- Groq API key (optional but recommended)

## 🛠️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/roadmap_db"

# AI API Keys (optional - users can provide their own)
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Authentication (optional for development)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### Getting API Keys

1. **Groq (Recommended):** https://console.groq.com/
2. **OpenAI:** https://platform.openai.com/
3. **Cohere:** https://cohere.ai/
4. **Gemini:** https://ai.google.dev/

## 🎯 Features

- 🤖 AI-powered roadmap generation
- 📊 Interactive roadmap visualization
- 💾 Save and share roadmaps
- 🔍 Explore public roadmaps
- 🎨 Modern, responsive UI
- 🔐 User authentication (optional)

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined" errors**
   ```bash
   rm -rf .next
   pnpm dev
   ```

2. **Database connection errors**
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

3. **API key errors**
   - Add your API key to `.env` file
   - Or provide it through the UI when generating roadmaps

### Development Tips

- The app works without API keys - users can provide their own
- Database is optional for basic functionality
- Check browser console for detailed error messages
- Use `pnpm db:studio` to inspect database data

## 📚 Documentation

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
