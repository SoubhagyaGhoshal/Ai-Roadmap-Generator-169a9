# 🚀 Netlify Deployment Guide

## Quick Deploy

### Option 1: Deploy Button (Easiest)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/SoubhagyaGhoshal/Ai-Roadmap-Generator)

### Option 2: Manual Deployment

1. **Fork/Clone the Repository**
   ```bash
   git clone https://github.com/SoubhagyaGhoshal/Ai-Roadmap-Generator.git
   cd Ai-Roadmap-Generator
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   COHERE_API_KEY=your_cohere_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Build Locally (Optional)**
   ```bash
   pnpm build
   ```

## Netlify Dashboard Setup

### 1. Connect to GitHub
- Go to [netlify.com](https://netlify.com)
- Sign up/Login with GitHub
- Click "New site from Git"

### 2. Repository Settings
- **Repository**: `SoubhagyaGhoshal/Ai-Roadmap-Generator`
- **Branch**: `main`
- **Base directory**: (leave empty)
- **Build command**: `pnpm build`
- **Publish directory**: `.next`

### 3. Environment Variables
Add these in Netlify Dashboard → Site settings → Environment variables:

```
GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key
COHERE_API_KEY=your_cohere_api_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

### 4. Build Settings
- **Node version**: `18`
- **NPM version**: `10`
- **Build command**: `pnpm build`
- **Publish directory**: `.next`

## API Keys Setup

### Groq API Key (Recommended)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up/Login
3. Create a new API key
4. Add to Netlify environment variables

### Alternative APIs
- **OpenAI**: Get from [platform.openai.com](https://platform.openai.com)
- **Cohere**: Get from [cohere.ai](https://cohere.ai)
- **Gemini**: Get from [makersuite.google.com](https://makersuite.google.com)

## Custom Domain (Optional)

1. Go to Netlify Dashboard → Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

## Troubleshooting

### Build Issues
- Ensure Node.js version is 18+
- Check all environment variables are set
- Verify API keys are valid

### Runtime Issues
- Check Netlify function logs
- Verify API endpoints are working
- Test with different API providers

## Features

✅ **AI-Powered Roadmap Generation**  
✅ **Multiple API Providers** (Groq, OpenAI, Cohere, Gemini)  
✅ **Visual Roadmap Tree**  
✅ **Responsive Design**  
✅ **Real-time Generation**  
✅ **Custom Domain Support**  

## Support

- **GitHub Issues**: [Create an issue](https://github.com/SoubhagyaGhoshal/Ai-Roadmap-Generator/issues)
- **Netlify Support**: [Netlify Docs](https://docs.netlify.com)
- **API Documentation**: Check respective API provider docs

## License

MIT License - See LICENSE file for details. 