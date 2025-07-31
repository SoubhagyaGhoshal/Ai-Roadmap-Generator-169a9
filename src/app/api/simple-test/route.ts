import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "working",
    message: "Deployment is working",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "unknown",
    hasGroqKey: !!process.env.GROQ_API_KEY
  });
} 