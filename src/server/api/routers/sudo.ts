import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { eq, and, or, like } from "drizzle-orm";

import { db } from "~/server/db";

import { sudoTable } from "~/server/db/schema";

export const sudoRouter = createTRPCRouter({
  getAllSudo: publicProcedure.query(async () => {
    return await db.select().from(sudoTable);
  }),
  getSudoByName: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await db
      .select()
      .from(sudoTable)
      .where(like(sudoTable.sudoName, `%${input}%`));
  }),
  getSudoByNim: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await db
      .select()
      .from(sudoTable)
      .where(eq(sudoTable.sudoNim, input));
  }),
  getSudoByStatus: publicProcedure
    .input(z.enum(["Daemon", "Suspect", "Clear", "Unknown"]))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(sudoTable)
        .where(eq(sudoTable.sudoStatus, input));
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
      const updatedUser = await db
        .update(sudoTable)
        .set({ sudoStatus: inputStatus })
        .where(eq(sudoTable.sudoNim, inputNim))
        .returning();
      return updatedUser;
    }),
});
