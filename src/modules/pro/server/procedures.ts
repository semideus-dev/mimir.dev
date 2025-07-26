import { count, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { agents, meetings } from "@/lib/db/schema";

import { polarInstance } from "@/lib/polar";

import { protectedProcedure, createTRPCRouter } from "@/trpc/init";

export const proRouter = createTRPCRouter({
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarInstance.customers.getStateExternal({
      externalId: ctx.userId,
    });

    const plan = customer.activeSubscriptions[0];

    if (plan) return null;

    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(eq(meetings.userId, ctx.userId));

    const [userAgents] = await db
      .select({
        count: count(agents.id),
      })
      .from(agents)
      .where(eq(agents.userId, ctx.userId));

    return {
      meetingCount: userMeetings.count,
      agentCount: userAgents.count,
    };
  }),
});
