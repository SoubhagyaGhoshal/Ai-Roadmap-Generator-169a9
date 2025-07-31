// Netlify-compatible database module
// This version doesn't require Prisma or a database connection

export const db = {
  // Mock database functions for Netlify deployment
  roadmap: {
    findFirst: async () => null,
    create: async () => ({ id: 'mock-id' }),
    update: async () => ({ id: 'mock-id' }),
    delete: async () => ({ id: 'mock-id' }),
  },
  nodeDetails: {
    findFirst: async () => null,
    create: async () => ({ id: 'mock-id' }),
    update: async () => ({ id: 'mock-id' }),
  },
  user: {
    findFirst: async () => null,
    update: async () => ({ id: 'mock-id' }),
  },
  $connect: async () => console.log('Mock database connected'),
  $disconnect: async () => console.log('Mock database disconnected'),
}; 