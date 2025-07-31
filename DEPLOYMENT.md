# 🚀 Deployment Guide

## Option 1: Vercel (Recommended)

### Step 1: Prepare Your Repository
1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure environment variables (see below)
6. Click "Deploy"

### Step 3: Environment Variables
Add these to your Vercel project settings:

```
# Database
DATABASE_URL=your_production_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# API Keys (optional)
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key
COHERE_API_KEY=your_cohere_key

# YouTube API (optional)
YOUTUBE_API_KEY=your_youtube_key

# Knowledge Graph API (optional)
KNOWLEDGE_GRAPH_SEARCH_KEY=your_kg_key

# Webhook Secret
WEBHOOK_SECRET=your_webhook_secret

# Crisp Chat (optional)
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_id
```

## Option 2: Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Deploy
```bash
railway login
railway init
railway up
```

## Option 3: Netlify

### Step 1: Build Configuration
Create `netlify.toml`:
```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Configure build settings
4. Add environment variables
5. Deploy

## Option 4: DigitalOcean App Platform

### Step 1: Prepare
1. Create a DigitalOcean account
2. Go to App Platform
3. Connect your GitHub repository
4. Configure build settings

### Step 2: Environment Variables
Add all environment variables in the App Platform dashboard

## Database Setup

### Option 1: Vercel Postgres
1. In Vercel dashboard, go to Storage
2. Create a new Postgres database
3. Copy the connection string to your environment variables

### Option 2: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database URL
4. Add to environment variables

### Option 3: Railway Database
1. In Railway dashboard, create a new database
2. Copy the connection string
3. Add to environment variables

## Post-Deployment Steps

1. **Run Database Migrations**:
```bash
pnpm db:push
```

2. **Verify Environment Variables**:
   - Check all required variables are set
   - Test authentication
   - Test API endpoints

3. **Monitor Performance**:
   - Check Vercel Analytics
   - Monitor error logs
   - Test all features

## Custom Domain (Optional)

1. **Vercel**: Go to Settings → Domains
2. **Add your domain**
3. **Configure DNS records**
4. **Enable HTTPS**

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node.js version compatibility
2. **Database Connection**: Verify DATABASE_URL is correct
3. **Authentication**: Ensure Clerk keys are properly set
4. **API Errors**: Check API key permissions

### Debug Commands:
```bash
# Check build locally
pnpm build

# Test production build
pnpm start

# Check environment variables
echo $DATABASE_URL
```

## Security Checklist

- [ ] Environment variables are set
- [ ] Database is properly secured
- [ ] API keys are valid
- [ ] Authentication is working
- [ ] HTTPS is enabled
- [ ] Error monitoring is set up

## Performance Optimization

1. **Enable Vercel Analytics**
2. **Configure CDN caching**
3. **Optimize images**
4. **Enable compression**
5. **Monitor Core Web Vitals** 