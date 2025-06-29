import { z } from "zod";
import { and, count, desc, eq, ilike } from "drizzle-orm";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/lib/db";

import { meetings } from "@/lib/db/schema";
import { pagination } from "@/lib/constants";

export const meetingsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [meeting] = await db
        .select()
        .from(meetings)
        .where(and(eq(meetings.id, input.id), eq(meetings.userId, ctx.userId)));

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found.",
        });
      }

      return meeting;
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
        .select()
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.userId),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.userId),
            search ? ilike(meetings.name, `%${search}%`) : undefined,
          ),
        );

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
});
