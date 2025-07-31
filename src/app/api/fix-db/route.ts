import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    console.log("Starting database fix...");
    
    // Test database connection
    await db.$connect();
    
    // Fix the database schema by running the necessary SQL commands
    const sqlCommands = [
      // Add missing columns to Roadmap table
      `ALTER TABLE "Roadmap" ADD COLUMN IF NOT EXISTS "userId" TEXT`,
      `ALTER TABLE "Roadmap" ADD COLUMN IF NOT EXISTS "views" INTEGER DEFAULT 0`,
      `ALTER TABLE "Roadmap" ADD COLUMN IF NOT EXISTS "searchCount" INTEGER DEFAULT 0`,
      
      // Add missing columns to User table
      `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT`,
      
      // Create anonymous user for public roadmaps
      `INSERT INTO "User" ("id", "name", "email", "credits", "createdAt", "updatedAt") 
       VALUES ('anonymous-user', 'Anonymous User', 'anonymous@example.com', 999999, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT ("id") DO NOTHING`,
      
      // Create SavedRoadmap table if it doesn't exist
      `CREATE TABLE IF NOT EXISTS "SavedRoadmap" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "roadmapId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "authorId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "SavedRoadmap_pkey" PRIMARY KEY ("id")
      )`,
      
      // Create DrawerDetail table if it doesn't exist
      `CREATE TABLE IF NOT EXISTS "DrawerDetail" (
        "id" TEXT NOT NULL,
        "details" TEXT NOT NULL,
        "youtubeVideoIds" TEXT[] NOT NULL,
        "nodeName" TEXT NOT NULL,
        "roadmapId" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "DrawerDetail_pkey" PRIMARY KEY ("id")
      )`,
      
      // Add unique constraint to DrawerDetail.nodeName
      `ALTER TABLE "DrawerDetail" ADD CONSTRAINT IF NOT EXISTS "DrawerDetail_nodeName_key" UNIQUE ("nodeName")`,
      
      // Create indexes
      `CREATE INDEX IF NOT EXISTS "Roadmap_userId_idx" ON "Roadmap"("userId")`,
      `CREATE INDEX IF NOT EXISTS "SavedRoadmap_userId_idx" ON "SavedRoadmap"("userId")`,
      `CREATE INDEX IF NOT EXISTS "SavedRoadmap_authorId_idx" ON "SavedRoadmap"("authorId")`,
      `CREATE INDEX IF NOT EXISTS "DrawerDetail_roadmapId_idx" ON "DrawerDetail"("roadmapId")`,
      `CREATE INDEX IF NOT EXISTS "DrawerDetail_nodeName_idx" ON "DrawerDetail"("nodeName")`
    ];
    
    // Execute each SQL command
    for (const sql of sqlCommands) {
      try {
        await db.$executeRawUnsafe(sql);
        console.log(`Executed: ${sql.substring(0, 50)}...`);
      } catch (error) {
        console.log(`Skipped (likely already exists): ${sql.substring(0, 50)}...`);
      }
    }
    
    // Test if the fix worked by trying to create a test roadmap
    try {
      const testRoadmap = await db.roadmap.create({
        data: {
          title: "test-fix",
          content: JSON.stringify([{ name: "Test" }]),
          userId: "anonymous-user",
          visibility: "PUBLIC",
        },
      });
      
      // Clean up the test roadmap
      await db.roadmap.delete({
        where: { id: testRoadmap.id }
      });
      
      console.log("Database fix completed successfully!");
      
      return NextResponse.json({
        status: "success",
        message: "Database schema has been fixed successfully!",
        timestamp: new Date().toISOString()
      });
      
    } catch (testError) {
      console.error("Test failed:", testError);
      return NextResponse.json({
        status: "error",
        message: "Database fix completed but test failed",
        error: testError instanceof Error ? testError.message : "Unknown error"
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Database fix error:', error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fix database schema",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
} 