import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";

import { sudoTable } from "~/server/db/schema";

export const sudoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(sudoTable);
  }),
});
