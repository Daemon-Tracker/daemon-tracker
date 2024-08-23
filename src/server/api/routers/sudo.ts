import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sudoRouter = createTRPCRouter({
  getAllSudo: publicProcedure.query(async () => {
    return await prisma.sudo.findMany({
      orderBy: {
        sudoNim: "asc",
      },
    });
  }),

  getSudoByName: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.sudo.findMany({
      where: {
        sudoName: {
          contains: input,
          mode: "insensitive",
        },
      },
      orderBy: {
        sudoNim: "asc",
      },
    });
  }),

  getSudoByNim: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.sudo.findMany({
      where: {
        sudoNim: input,
      },
    });
  }),

  getSudoByStatus: publicProcedure
    .input(z.enum(["Daemon", "Suspect", "Clear", "Unknown"]))
    .query(async ({ input }) => {
      return await prisma.sudo.findMany({
        where: {
          sudoStatus: input,
        },
        orderBy: {
          sudoNim: "asc",
        },
      });
    }),

  updateSudoStatus: publicProcedure
    .input(
      z.object({
        inputNim: z.number(),
        inputStatus: z.enum(["Daemon", "Suspect", "Clear", "Unknown"]),
      }),
    )
    .mutation(async ({ input }) => {
      const { inputNim, inputStatus } = input;
      await prisma.sudo.updateMany({
        where: {
          sudoNim: inputNim,
        },
        data: {
          sudoStatus: inputStatus,
        },
      });

      const updatedRecords = await prisma.sudo.findMany({
        where: {
          sudoNim: inputNim,
        },
        orderBy: {
          sudoNim: "asc",
        },
      });

      return updatedRecords;
    }),
});
