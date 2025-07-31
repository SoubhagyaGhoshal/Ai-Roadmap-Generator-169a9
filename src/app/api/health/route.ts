import { NextResponse } from "next/server";

export async function GET() {
  const hasGroqApiKey = !!process.env.GROQ_API_KEY;
  const hasOpenaiApiKey = !!process.env.OPENAI_API_KEY;
  const hasCohereApiKey = !!process.env.COHERE_API_KEY;
  const hasGeminiApiKey = !!process.env.GEMINI_API_KEY;

  return NextResponse.json({
    status: "healthy",
    environment: {
      groq: hasGroqApiKey ? "configured" : "not configured",
      openai: hasOpenaiApiKey ? "configured" : "not configured", 
      cohere: hasCohereApiKey ? "configured" : "not configured",
      gemini: hasGeminiApiKey ? "configured" : "not configured",
    },
    timestamp: new Date().toISOString(),
  });
}
