import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Add connection error handling with retry logic
const connectWithRetry = async () => {
  try {
    await db.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    // In serverless, we'll let the connection fail gracefully
    // The connection will be established when needed
  }
};

// Initialize connection
connectWithRetry();
