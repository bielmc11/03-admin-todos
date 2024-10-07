import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

//Los errores son por el ESLINT NO DE TS

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;