import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function GET() {
  try {
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json({
        status: "error",
        message: "GROQ_API_KEY environment variable is not set",
        configured: false
      });
    }

    // Test the API key with a simple request
    const openai = new OpenAI({
      apiKey: groqApiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, API key is working!'"
        }
      ],
      max_tokens: 10
    });

    return NextResponse.json({
      status: "success",
      message: "API key is working",
      configured: true,
      response: response.choices[0]?.message?.content || "No response"
    });

  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: "API key test failed",
      configured: !!process.env.GROQ_API_KEY,
      error: error.message
    });
  }
} 