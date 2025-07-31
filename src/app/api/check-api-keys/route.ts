import { NextResponse } from "next/server";

export async function GET() {
  const groqApiKey = process.env.GROQ_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const cohereApiKey = process.env.COHERE_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  return NextResponse.json({
    status: "checking",
    apiKeys: {
      groq: {
        configured: !!groqApiKey,
        length: groqApiKey ? groqApiKey.length : 0,
        preview: groqApiKey ? `${groqApiKey.substring(0, 8)}...` : "not set"
      },
      openai: {
        configured: !!openaiApiKey,
        length: openaiApiKey ? openaiApiKey.length : 0,
        preview: openaiApiKey ? `${openaiApiKey.substring(0, 8)}...` : "not set"
      },
      cohere: {
        configured: !!cohereApiKey,
        length: cohereApiKey ? cohereApiKey.length : 0,
        preview: cohereApiKey ? `${cohereApiKey.substring(0, 8)}...` : "not set"
      },
      gemini: {
        configured: !!geminiApiKey,
        length: geminiApiKey ? geminiApiKey.length : 0,
        preview: geminiApiKey ? `${geminiApiKey.substring(0, 8)}...` : "not set"
      }
    },
    timestamp: new Date().toISOString(),
    deployment: process.env.VERCEL_ENV || "unknown"
  });
} 