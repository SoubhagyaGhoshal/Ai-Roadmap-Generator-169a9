# 🚀 AI Roadmap Generator

> **Transform any topic into a comprehensive learning roadmap with the power of AI**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-green?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<div align="center">
  <img src="public/roadmapai.svg" alt="AI Roadmap Generator" width="200"/>
  
  ### 🎯 **Generate personalized learning roadmaps for any topic with AI**
  
  [Live Demo](https://ai-roadmap-generator.vercel.app) • [Report Bug](https://github.com/SoubhagyaGhoshal/Ai-Roadmap-Generator/issues) • [Request Feature](https://github.com/SoubhagyaGhoshal/Ai-Roadmap-Generator/issues)
</div>

---

## ✨ **Features**

### 🎨 **Modern UI/UX**
- **Glass morphism design** with backdrop blur effects
- **Smooth animations** and micro-interactions
- **Responsive layout** that works on all devices
- **Dark/light mode** support
- **Interactive roadmap visualization**

### 🤖 **AI-Powered Generation**
- **Multiple AI models** support (Groq, OpenAI, Gemini, Cohere)
- **Smart query processing** with exact term matching
- **Comprehensive learning paths** from beginner to advanced
- **Wikipedia integration** for additional resources
- **Real-time generation** with progress indicators

### 🔧 **Advanced Functionality**
- **Save & share** roadmaps with unique URLs
- **Public/private** roadmap visibility
- **User authentication** with Clerk
- **Database persistence** with PostgreSQL
- **API key management** for users

### 🎯 **Smart Features**
- **Topic-specific redirection** from homepage
- **Query verification** to prevent AI misinterpretation
- **Exact matching** to avoid "Java" → "JavaScript" issues
- **Credit system** for unlimited generations
- **Error handling** with user-friendly messages

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- Git

### **Installation**

```bash
# 1. Clone the repository
git clone https://github.com/SoubhagyaGhoshal/Ai-Roadmap-Generator.git
cd ai-roadmap-generator-main

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp env.example .env
# Edit .env with your configuration

# 4. Set up database
pnpm db:generate
pnpm db:push

# 5. Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application!

---

## ⚙️ **Configuration**

### **Environment Variables**

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

### **Getting API Keys**

| Service | Link | Recommended |
|---------|------|-------------|
| **Groq** | [console.groq.com](https://console.groq.com/) | ✅ Yes |
| **OpenAI** | [platform.openai.com](https://platform.openai.com/) | ✅ Yes |
| **Cohere** | [cohere.ai](https://cohere.ai/) | ✅ Yes |
| **Gemini** | [ai.google.dev](https://ai.google.dev/) | ✅ Yes |

---

## 🎯 **Usage**

### **1. Generate a Roadmap**
1. Enter any topic (e.g., "Python", "React", "Machine Learning")
2. Choose your preferred AI model
3. Click "Generate Roadmap"
4. Explore your personalized learning path!

### **2. Explore Topics**
- Click on moving topics on the homepage
- Each topic redirects to a pre-filled roadmap
- Discover new learning opportunities

### **3. Save & Share**
- Save roadmaps to your dashboard
- Share with unique URLs
- Set public/private visibility

---

## 🏗️ **Architecture**

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── (private)/         # Protected routes
│   └── (public)/          # Public routes
├── components/            # React components
│   ├── flow-components/   # Roadmap visualization
│   ├── landing/          # Homepage components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and configurations
└── actions/              # Server actions
```

### **Tech Stack**
- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui
- **Database:** PostgreSQL, Prisma ORM
- **Authentication:** Clerk
- **AI Models:** Groq, OpenAI, Gemini, Cohere
- **Deployment:** Vercel

---

## 🔧 **Recent Improvements**

### **🎨 UI/UX Enhancements**
- ✅ **Modern glass morphism design** with gradient backgrounds
- ✅ **Enhanced animations** and hover effects
- ✅ **Improved mobile responsiveness**
- ✅ **Better visual hierarchy** and spacing

### **🐛 Bug Fixes**
- ✅ **Fixed Java → JavaScript conversion** issue
- ✅ **Improved database search logic** with exact matching
- ✅ **Enhanced error handling** for AI responses
- ✅ **Query verification** to prevent misinterpretation

### **🚀 New Features**
- ✅ **Topic-specific redirection** from homepage
- ✅ **Removed navigation clutter** for cleaner UI
- ✅ **Enhanced mobile drawer** functionality
- ✅ **Better API key management**

---

## 🐛 **Troubleshooting**

### **Common Issues**

<details>
<summary><strong>Database Connection Errors</strong></summary>

```bash
# Regenerate Prisma client
pnpm db:generate

# Push schema changes
pnpm db:push

# Reset database (if needed)
pnpm db:reset
```
</details>

<details>
<summary><strong>API Key Errors</strong></summary>

1. Add your API key to `.env` file
2. Or provide it through the UI when generating roadmaps
3. Check API key permissions and quotas
</details>

<details>
<summary><strong>Build Errors</strong></summary>

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Restart development server
pnpm dev
```
</details>

### **Development Tips**
- The app works without API keys - users can provide their own
- Database is optional for basic functionality
- Check browser console for detailed error messages
- Use `pnpm db:studio` to inspect database data

---

## 📊 **Performance**

- **⚡ Fast loading** with Next.js 14 optimizations
- **🎯 SEO optimized** with metadata and structured data
- **📱 Mobile-first** responsive design
- **🔒 Secure** with proper authentication and validation
- **♿ Accessible** following WCAG guidelines

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Next.js team** for the amazing framework
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first CSS framework
- **Shadcn/ui** for beautiful components
- **Clerk** for authentication
- **Prisma** for database management

---

<div align="center">
  <strong>Made with ❤️ by Soubhagya Ghoshal</strong>
  
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SoubhagyaGhoshal)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/soubhagya-ghoshal)
  
  **Star this repository if you found it helpful! ⭐**
</div>
