import { PrismaClient } from '@prisma/client';

// const prisma = Globals.prisma || new PrismaClient();
const prisma = new PrismaClient();

// if (process.env.NODE_ENV === 'production') {
// 	// globalThis.prisma = prisma;
// }

export { prisma };
