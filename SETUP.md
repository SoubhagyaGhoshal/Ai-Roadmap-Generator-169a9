# AI Roadmap Generator Setup Guide

## Prerequisites

1. Node.js 18+ and pnpm installed
2. PostgreSQL database
3. Groq API key (optional but recommended)

## Quick Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/roadmap_db"

# Clerk Authentication (optional for development)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# AI API Keys (optional - users can provide their own)
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Set up Database
```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# (Optional) Open Prisma Studio to view data
pnpm db:studio
```

### 4. Start Development Server
```bash
pnpm dev
```

## Getting API Keys

### Groq API Key (Recommended)
1. Go to https://console.groq.com/
2. Sign up for a free account
3. Create an API key
4. Add it to your `.env` file as `GROQ_API_KEY`

### Alternative AI Providers
- **OpenAI**: Get from https://platform.openai.com/
- **Cohere**: Get from https://cohere.ai/
- **Gemini**: Get from https://ai.google.dev/

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined" errors**
   - Clear `.next` cache: `rm -rf .next`
   - Restart the development server

2. **Database connection errors**
   - Ensure PostgreSQL is running
   - Check your `DATABASE_URL` in `.env`
   - Run `pnpm db:push` to sync schema

3. **API key errors**
   - Add your API key to `.env` file
   - Or provide it through the UI when generating roadmaps

4. **Authentication errors**
   - For development, you can disable Clerk by commenting out the middleware
   - Or set up Clerk authentication properly

### Development Tips

- The app works without API keys - users can provide their own
- Database is optional for basic functionality
- Check browser console for detailed error messages
- Use `pnpm db:studio` to inspect database data

## Features

- Generate learning roadmaps for any topic
- Multiple AI providers supported
- Save and share roadmaps
- Interactive roadmap visualization
- Public roadmap exploration

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure database is properly configured
4. Try clearing cache and restarting the server 