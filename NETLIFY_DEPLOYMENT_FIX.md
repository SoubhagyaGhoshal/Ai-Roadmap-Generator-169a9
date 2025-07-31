# Netlify Deployment Fix

## Issue
The Netlify build was failing with the error: `npm error Cannot read properties of null (reading 'matches')`

## Root Cause
The project uses `pnpm` (as evidenced by `pnpm-lock.yaml`) but the Netlify configuration was trying to use `npm`, causing a package manager mismatch.

## Solutions

### Option 1: Use pnpm (Recommended)
The main `netlify.toml` has been updated to use pnpm:

```toml
[build]
  command = "chmod +x ./netlify-build.sh && ./netlify-build.sh"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "10"
  PNPM_VERSION = "8"
```

### Option 2: Use npm (Fallback)
If pnpm continues to cause issues, you can use the npm configuration:

1. Rename `netlify-npm.toml` to `netlify.toml`
2. This will use npm instead of pnpm

### Option 3: Manual Build Script
The `netlify-build.sh` script handles pnpm installation and provides better error handling.

## Files Updated

1. **`netlify.toml`** - Updated to use pnpm with build script
2. **`netlify-build.sh`** - Enhanced build script with pnpm installation
3. **`netlify-simple.toml`** - Updated to use pnpm
4. **`.npmrc`** - Added pnpm configuration
5. **`.nvmrc`** - Specified Node.js version
6. **`package.json`** - Updated netlify scripts to use pnpm
7. **`netlify-npm.toml`** - Created as npm fallback option

## Environment Variables Required

Make sure to set these environment variables in your Netlify dashboard:

- `DATABASE_URL` - Your PostgreSQL database URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication key
- `CLERK_SECRET_KEY` - Clerk secret key
- `GROQ_API_KEY` - Groq API key (optional)
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `COHERE_API_KEY` - Cohere API key (optional)
- `GEMINI_API_KEY` - Gemini API key (optional)

## Deployment Steps

1. Push the updated code to your repository
2. In Netlify dashboard, ensure the build command is: `chmod +x ./netlify-build.sh && ./netlify-build.sh`
3. Set the publish directory to: `.next`
4. Add all required environment variables
5. Deploy

## Troubleshooting

If you still encounter issues:

1. **Try the npm fallback**: Use `netlify-npm.toml` instead
2. **Check Node.js version**: Ensure you're using Node.js 18
3. **Clear cache**: Clear Netlify's build cache
4. **Check logs**: Review the detailed build logs for specific errors

## Alternative: Use Vercel

If Netlify continues to have issues, consider deploying to Vercel which has better Next.js support:

```bash
vercel --prod
``` 