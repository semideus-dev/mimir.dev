import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/lib/db";
import { agents, meetings } from "@/lib/db/schema";
import {
  agentsInsertSchema,
  agentsUpdateSchema,
} from "@/modules/agents/utils/schemas";
import { pagination } from "@/lib/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [agent] = await db
        .select()
        .from(agents)
        .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.userId)));

      if (!agent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found." });
      }

      return agent;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(pagination.defaultPage),
        pageSize: z
          .number()
          .min(pagination.minPageSize)
          .max(pagination.maxPageSize)
          .default(pagination.defaultPageSize),
        search: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`COUNT(${meetings.id})`
        })
        .from(agents)
        .leftJoin(meetings, eq(agents.id, meetings.agentId))
        .where(
          and(
            eq(agents.userId, ctx.userId),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        )
        .groupBy(agents.id)
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.userId),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        );

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
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
  update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [agent] = await db
        .update(agents)
        .set(input)
        .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.userId)))
        .returning();

      if (!agent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        });
      }
      return agent;
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [agent] = await db
        .delete(agents)
        .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.userId)))
        .returning();

      if (!agent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }

      return agent;
    }),
});
