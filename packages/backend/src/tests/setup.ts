import { prisma } from "../lib/prisma.js";

beforeEach(async () => {
  // Clean tables before every test
  await prisma.$transaction([
    prisma.gameSession.deleteMany(),
    prisma.coordinate.deleteMany()
  ]);
});

afterAll(async () => {
  // Close Prisma connection so Jest exits cleanly
  await prisma.$disconnect();
});
