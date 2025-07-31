import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create a default anonymous user if it doesn't exist
    const anonymousUser = await db.user.upsert({
      where: { id: "anonymous-user" },
      update: {},
      create: {
        id: "anonymous-user",
        name: "Anonymous User",
        email: "anonymous@example.com",
        credits: 999999,
      },
    });
    
    return NextResponse.json({
      status: "success",
      message: "Database setup completed",
      user: anonymousUser,
    });
  } catch (error) {
    console.error("Database setup error:", error);
    return NextResponse.json({
      status: "error",
      message: "Database setup failed",
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
} 