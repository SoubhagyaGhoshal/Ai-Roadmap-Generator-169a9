import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Test database connection
    await db.$connect();
    
    // Test a simple query
    const result = await db.roadmap.count();
    
    return NextResponse.json({
      status: "success",
      message: "Database connection working",
      roadmapCount: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Database test error:", error);
    return NextResponse.json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
} 