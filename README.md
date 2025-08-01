# AI Roadmap Generator

An AI-powered learning roadmap generator that creates personalized learning paths for any topic.

## Features

- 🤖 **AI-Powered Generation**: Uses advanced AI models to create comprehensive learning roadmaps
- 🎯 **Manual Input**: Type any topic manually to generate custom learning paths
- 🔄 **Auto-Generation**: Automatically generates roadmaps from URL parameters
- 📊 **Interactive Visualizations**: Beautiful, interactive roadmap displays
- 💾 **Save & Share**: Save roadmaps to your dashboard and share with others
- 🔐 **Multiple AI Models**: Support for OpenAI, Groq, Cohere, and Gemini
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## Manual Roadmap Generation

The application supports manual roadmap generation where you can type any topic and generate a personalized learning path.

### How to Use Manual Generation:

1. **Navigate to the Roadmap Page**: Go to `/roadmap` in your application
2. **Enter a Topic**: Type any learning topic in the input field (e.g., "JavaScript", "Machine Learning", "DevOps")
3. **Generate Roadmap**: Click the "Generate" button or press Enter
4. **View Results**: The AI will create a comprehensive learning roadmap with chapters and modules

### Supported Topics:

The application can generate roadmaps for virtually any learning topic, including:
- Programming Languages (JavaScript, Python, Java, C++, Go, Rust, etc.)
- Frameworks & Libraries (React, Angular, Vue.js, Django, Spring Boot, etc.)
- Technologies (Docker, Kubernetes, AWS, Machine Learning, Blockchain, etc.)
- Concepts (Algorithms, Data Structures, Design Patterns, etc.)
- And much more!

## API Key Setup

To use manual generation, you need to set up API keys for the AI models:

### Option 1: Environment Variables (Recommended)

Add your API keys to your environment variables:

```bash
# For Vercel deployment, add these in your Vercel dashboard
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Option 2: User-Provided API Keys

Users can provide their own API keys through the application interface.

### Getting API Keys:

- **Groq**: Get a free API key from [console.groq.com](https://console.groq.com/)
- **OpenAI**: Get an API key from [platform.openai.com](https://platform.openai.com/)
- **Cohere**: Get an API key from [cohere.ai](https://cohere.ai/)
- **Gemini**: Get an API key from [makersuite.google.com](https://makersuite.google.com/)

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai-roadmap-generator.git
   cd ai-roadmap-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

6. **Test manual generation** by going to `/roadmap` and typing a topic like "JavaScript" or "Machine Learning"

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Troubleshooting Manual Generation

### Common Issues:

1. **"No API key provided" error**:
   - Add your API key to environment variables
   - Or provide your API key through the application interface

2. **"Generation failed" error**:
   - Check your API key is valid
   - Try a different topic
   - Check your internet connection

3. **"Request timed out" error**:
   - Try again with a simpler topic
   - Check your API key has sufficient credits

### Getting Help:

- Check the console for detailed error messages
- Ensure your API keys are properly configured
- Try different topics if one fails
- Contact support if issues persist

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
