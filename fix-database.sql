-- Fix database schema to match Prisma schema

-- Add missing columns to Roadmap table
ALTER TABLE "Roadmap" ADD COLUMN IF NOT EXISTS "userId" TEXT;
ALTER TABLE "Roadmap" ADD COLUMN IF NOT EXISTS "views" INTEGER DEFAULT 0;
ALTER TABLE "Roadmap" ADD COLUMN IF NOT EXISTS "searchCount" INTEGER DEFAULT 0;

-- Add missing columns to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

-- Create anonymous user for public roadmaps
INSERT INTO "User" ("id", "name", "email", "credits", "createdAt", "updatedAt") 
VALUES ('anonymous-user', 'Anonymous User', 'anonymous@example.com', 999999, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Create SavedRoadmap table if it doesn't exist
CREATE TABLE IF NOT EXISTS "SavedRoadmap" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedRoadmap_pkey" PRIMARY KEY ("id")
);

-- Create DrawerDetail table if it doesn't exist
CREATE TABLE IF NOT EXISTS "DrawerDetail" (
    "id" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "youtubeVideoIds" TEXT[] NOT NULL,
    "nodeName" TEXT NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DrawerDetail_pkey" PRIMARY KEY ("id")
);

-- Add unique constraint to DrawerDetail.nodeName
ALTER TABLE "DrawerDetail" ADD CONSTRAINT IF NOT EXISTS "DrawerDetail_nodeName_key" UNIQUE ("nodeName");

-- Add foreign key constraints
ALTER TABLE "Roadmap" ADD CONSTRAINT IF NOT EXISTS "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SavedRoadmap" ADD CONSTRAINT IF NOT EXISTS "SavedRoadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SavedRoadmap" ADD CONSTRAINT IF NOT EXISTS "SavedRoadmap_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DrawerDetail" ADD CONSTRAINT IF NOT EXISTS "DrawerDetail_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS "Roadmap_userId_idx" ON "Roadmap"("userId");
CREATE INDEX IF NOT EXISTS "SavedRoadmap_userId_idx" ON "SavedRoadmap"("userId");
CREATE INDEX IF NOT EXISTS "SavedRoadmap_authorId_idx" ON "SavedRoadmap"("authorId");
CREATE INDEX IF NOT EXISTS "DrawerDetail_roadmapId_idx" ON "DrawerDetail"("roadmapId");
CREATE INDEX IF NOT EXISTS "DrawerDetail_nodeName_idx" ON "DrawerDetail"("nodeName"); 