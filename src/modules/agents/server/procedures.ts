import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { agentsInsertSchema } from "@/modules/agents/utils/schemas";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return agent;
    }),
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.userId,
        })
        .returning();

      return createdAgent;
    }),
});
