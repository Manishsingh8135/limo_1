import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma Client instance.
// This prevents multiple instances from being created during hot reloading in development.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Instantiate PrismaClient. If 'prisma' already exists globally (in development),
// reuse it; otherwise, create a new instance.
export const prisma = global.prisma || new PrismaClient();

// In development, assign the created PrismaClient instance to the global variable.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Export the PrismaClient instance for use throughout the application.
export default prisma;
