import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "API is working",
    groqKey: process.env.GROQ_API_KEY ? "SET" : "NOT SET",
    timestamp: new Date().toISOString()
  });
} 