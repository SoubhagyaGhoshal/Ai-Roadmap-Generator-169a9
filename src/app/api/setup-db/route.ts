import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Test database connection
    await db.$connect();
    
    // Push the schema to create tables
    const { PrismaClient } = require('@prisma/client');
    const { execSync } = require('child_process');
    
    try {
      // Run prisma db push to create tables
      execSync('npx prisma db push', { 
        stdio: 'inherit',
        env: { ...process.env }
      });
      
      return NextResponse.json({
        status: "success",
        message: "Database setup completed successfully",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Database push error:', error);
      return NextResponse.json({
        status: "error",
        message: "Failed to create database tables",
        error: error instanceof Error ? error.message : "Unknown error"
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: "error",
      message: "Failed to connect to database",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
} 