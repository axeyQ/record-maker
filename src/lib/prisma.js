import { PrismaClient } from '@prisma/client';

// Add prisma to the global scope during development to prevent multiple instances
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;